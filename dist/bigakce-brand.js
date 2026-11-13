// ==========================================
// BIGakçe MARKA YAZISI (logo wordmark)
// Sayfadaki tüm "BIGakçe" metinlerini logo stiline çevirir:
// BI (koyu) + G (yeşil noktalı halftone) + akçe (yeşil)
// 1 BIGakçe = 10 TL
// ==========================================
(function () {
  const WORD = 'BIGakçe';
  const SKIP = new Set(['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT', 'OPTION', 'SELECT', 'TITLE', 'NOSCRIPT', 'CODE', 'PRE']);

  const style = document.createElement('style');
  style.textContent = `
    .bigakce{display:inline-flex;align-items:baseline;font-family:'Poppins','Outfit','Inter',system-ui,sans-serif;font-weight:800;letter-spacing:-.02em;white-space:nowrap;line-height:1}
    .bigakce .bk-bi{color:#161616}
    .bigakce .bk-g{color:#161616;background-image:radial-gradient(circle at center,#5cc23a 0 42%,transparent 46%),linear-gradient(#161616,#161616);background-size:.16em .16em,100% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
    .bigakce .bk-akce{color:#4ca62b;font-weight:800;margin-left:.02em}
    .bigakce.bk-on-dark .bk-bi{color:#fff}
    .bigakce.bk-on-dark .bk-g{background-image:radial-gradient(circle at center,#7ee05a 0 42%,transparent 46%),linear-gradient(#fff,#fff)}
    .bigakce.bk-on-dark .bk-akce{color:#9be77c}
    .bigakce.bk-on-green .bk-bi,.bigakce.bk-on-green .bk-akce{color:#fff}
    .bigakce.bk-on-green .bk-g{background-image:radial-gradient(circle at center,#d9ffcc 0 42%,transparent 46%),linear-gradient(#fff,#fff)}
    html.dark .bigakce:not(.bk-on-green) .bk-bi,body.dark .bigakce:not(.bk-on-green) .bk-bi{color:#f1f5f9}
    @supports not ((-webkit-background-clip:text) or (background-clip:text)){.bigakce .bk-g{-webkit-text-fill-color:#4ca62b;color:#4ca62b}}
  `;
  document.head.appendChild(style);

  // Arka plan rengine göre kontrast varyantı seç
  const parseRGB = (c) => { const m = c && c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(',').map((x) => parseFloat(x)); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const bgOf = (el) => {
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== 'none' && /gradient/.test(cs.backgroundImage)) {
        const m = cs.backgroundImage.match(/rgba?\([^)]+\)/); if (m) return parseRGB(m[0]);
      }
      const c = parseRGB(cs.backgroundColor);
      if (c && c.a > 0.5) return c;
    }
    return { r: 255, g: 255, b: 255, a: 1 };
  };
  const variant = (el) => {
    const c = bgOf(el);
    const lum = (0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b) / 255;
    if (lum < 0.45) return 'bk-on-dark';
    const greenish = c.g > c.r + 25 && c.g > c.b + 5 && lum < 0.8;
    const saturated = Math.max(c.r, c.g, c.b) - Math.min(c.r, c.g, c.b) > 60 && lum < 0.75;
    if (greenish || saturated) return 'bk-on-green';
    return '';
  };

  const make = (parentEl) => {
    const span = document.createElement('span');
    span.className = 'bigakce';
    span.setAttribute('aria-label', 'BIGakçe');
    span.title = '1 BIGakçe = 10 TL';
    span.innerHTML = '<span class="bk-bi">BI</span><span class="bk-g">G</span><span class="bk-akce">akçe</span>';
    const v = variant(parentEl);
    if (v) span.classList.add(v);
    return span;
  };

  const processNode = (root) => {
    if (!root || !document.body.contains(root)) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(t) {
        if (!t.nodeValue || t.nodeValue.indexOf(WORD) === -1) return NodeFilter.FILTER_REJECT;
        for (let p = t.parentElement; p; p = p.parentElement) {
          if (SKIP.has(p.tagName) || p.isContentEditable || p.classList.contains('bigakce') || p.classList.contains('notranslate-skip')) return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((t) => {
      const parts = t.nodeValue.split(WORD);
      const frag = document.createDocumentFragment();
      parts.forEach((part, i) => {
        if (part) frag.appendChild(document.createTextNode(part));
        if (i < parts.length - 1) frag.appendChild(make(t.parentElement));
      });
      t.parentNode.replaceChild(frag, t);
    });
  };

  let queued = new Set(), scheduled = false;
  const flush = () => { scheduled = false; const list = Array.from(queued); queued.clear(); list.forEach(processNode); };
  const queue = (n) => { queued.add(n); if (!scheduled) { scheduled = true; requestAnimationFrame(flush); } };

  const observer = new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === 'characterData') { if (m.target.parentElement) queue(m.target.parentElement); continue; }
      m.addedNodes.forEach((n) => {
        if (n.nodeType === 1 && !n.classList.contains('bigakce')) queue(n);
        else if (n.nodeType === 3 && n.parentElement) queue(n.parentElement);
      });
    }
  });

  const start = () => {
    processNode(document.body);
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();

  window.BIGAKCE_TL_RATE = 10;
})();
