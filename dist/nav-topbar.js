// ==========================================
// SOL MENÜYÜ KALDIR → ÖĞELERİ ÜST NAVBAR'A TAŞI
// Üst menü her render'da sol menüden (nav.nav) birebir üretilir;
// böylece sol menüde ne varsa üstte de o olur.
// ==========================================
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .shell .sidebar{display:none!important}
    .shell,.sidebar-collapsed .shell{grid-template-columns:1fr!important}
    .shell .workspace{grid-column:1!important}
    .topbar .mobile-toggle,.topbar .desktop-collapse{display:none!important}
    #btn-nav-management,#btn-nav-gift{display:none!important}
    .topbar{grid-template-columns:1fr auto!important;grid-template-rows:auto auto;row-gap:6px!important;padding-top:12px!important;padding-bottom:10px!important}
    .topbar .top-nav{grid-column:1/-1!important;display:flex!important;flex-wrap:wrap;gap:6px;width:100%}
    .top-nav>button,.top-nav summary{display:inline-flex;align-items:center;gap:6px;transition:background .15s,color .15s}
    .top-nav .top-delivery{left:0;right:auto;z-index:50;animation:sbNavDrop .14s ease}
    .top-nav .top-delivery button.active{background:#eef2ff;color:#4338ca}
    .top-nav .top-delivery .sb-nav-sep{height:1px;background:var(--line,#e2e8f0);margin:4px 6px}
    .top-nav summary.active{background:#eef2ff;color:#4338ca}
    @keyframes sbNavDrop{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
    @media(max-width:1050px){.topbar .top-nav{flex-wrap:nowrap;overflow-x:auto}}
    .sb-logo{display:inline-flex;align-items:flex-end;gap:0;cursor:pointer;text-decoration:none;user-select:none;margin-right:18px;font-family:'Fraunces',Georgia,serif;font-weight:900;font-variation-settings:'SOFT' 100,'WONK' 1;font-size:30px;line-height:1;letter-spacing:-.035em;color:#3db36b;transition:transform .2s ease,filter .2s ease;flex-shrink:0}
    .sb-logo:hover{transform:translateY(-1px);filter:drop-shadow(0 4px 10px rgba(61,179,107,.28))}
    .sb-logo .sb-b{position:relative;color:#06c160;font-size:1.12em;margin:0 .01em}
    .sb-logo .sb-b::after{content:'';position:absolute;left:.04em;bottom:-.3em;width:.11em;height:.11em;background:#06c160;box-shadow:.17em -.1em 0 #06c160}
    .topbar-left{gap:14px!important}
    .topbar-left h1{font-size:1rem!important;color:#64748b;font-weight:600!important;padding-left:14px;border-left:1px solid var(--line,#e2e8f0)}
    @media(max-width:620px){.sb-logo{font-size:24px}.topbar-left h1{display:none}}
  `;
  document.head.appendChild(style);
  if (!document.querySelector('link[data-sb-fraunces]')) {
    const f = document.createElement('link');
    f.rel = 'stylesheet'; f.dataset.sbFraunces = '1';
    f.href = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght,SOFT,WONK@9..144,900,100,1&display=swap';
    document.head.appendChild(f);
  }

  const addLogo = () => {
    const left = document.querySelector('.topbar .topbar-left');
    if (!left || left.querySelector('.sb-logo')) return;
    const a = document.createElement('a');
    a.className = 'sb-logo';
    a.id = 'sb-logo-home';
    a.setAttribute('role', 'link');
    a.setAttribute('aria-label', 'SkillBridge — Genel Bakış');
    a.title = 'SkillBridge — Genel Bakış';
    a.innerHTML = '<span>Skill</span><span class="sb-b">B</span><span>ridge</span>';
    a.addEventListener('click', () => { if (typeof window.go === 'function') window.go('dashboard'); });
    left.insertBefore(a, left.firstChild);
  };

  const cleanLabel = (el) => {
    const c = el.cloneNode(true);
    c.querySelectorAll('.nav-dot').forEach((d) => d.remove());
    return c.innerHTML.trim();
  };
  const closeJs = "this.closest('details').removeAttribute('open');";

  const build = () => {
    addLogo();
    const side = document.querySelector('.sidebar nav.nav');
    const top = document.querySelector('.topbar .top-nav') || document.querySelector('nav.top-nav');
    if (!side || !top || top.dataset.sbBuilt === '1') return;

    const frag = document.createDocumentFragment();
    Array.from(side.children).forEach((item) => {
      if (item.tagName === 'BUTTON') {
        const b = document.createElement('button');
        b.type = 'button';
        b.innerHTML = cleanLabel(item);
        if (item.classList.contains('active')) b.classList.add('active');
        const oc = item.getAttribute('onclick'); if (oc) b.setAttribute('onclick', oc);
        frag.appendChild(b);
        return;
      }
      const det = item.matches('details') ? item : item.querySelector('details');
      let summaryHtml, subs, summaryText;
      if (det) {
        const summary = det.querySelector('summary');
        if (!summary) return;
        summaryHtml = cleanLabel(summary);
        summaryText = summary.textContent;
        subs = Array.from(det.querySelectorAll(':scope > div button, :scope > button'));
      } else {
        // Başlıksız grup (ör. vaka sayfaları listesi)
        subs = Array.from(item.querySelectorAll('button'));
        if (!subs.length) return;
        const isCase = subs.some((b) => /go\('(documents|prompt|meetings|questions)'\)/.test(b.getAttribute('onclick') || ''));
        summaryText = isCase ? 'Vaka İşlemleri' : 'Diğer';
        summaryHtml = summaryText;
      }
      if (!subs.length) return;
      const d = document.createElement('details');
      d.className = 'top-nav-dropdown';
      const s = document.createElement('summary');
      s.innerHTML = summaryHtml + ' ▾';
      const box = document.createElement('div');
      box.className = 'top-delivery';
      let anyActive = false;
      subs.forEach((sb) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.innerHTML = cleanLabel(sb);
        if (sb.classList.contains('active')) { b.classList.add('active'); anyActive = true; }
        b.setAttribute('onclick', closeJs + (sb.getAttribute('onclick') || ''));
        box.appendChild(b);
      });
      // Sol menüdeki "Çıkış Yap" kaybolmasın: Ayarlar altına ekle
      if (/Ayarlar/i.test(summaryText) && typeof window.logout === 'function') {
        const sep = document.createElement('div'); sep.className = 'sb-nav-sep'; box.appendChild(sep);
        const out = document.createElement('button'); out.type = 'button'; out.textContent = '↩ Çıkış Yap';
        out.setAttribute('onclick', closeJs + 'logout()');
        box.appendChild(out);
      }
      if (anyActive) { s.classList.add('active'); d.dataset.active = 'true'; }
      d.appendChild(s); d.appendChild(box);
      frag.appendChild(d);
    });

    top.innerHTML = '';
    top.appendChild(frag);
    top.dataset.sbBuilt = '1';
    top.setAttribute('aria-label', 'Ana menü');
  };

  let scheduled = false;
  const schedule = () => { if (scheduled) return; scheduled = true; requestAnimationFrame(() => { scheduled = false; build(); }); };

  const prevRender = window.render;
  if (typeof prevRender === 'function') {
    window.render = function () { const r = prevRender.apply(this, arguments); build(); return r; };
  }
  const start = () => {
    build();
    const app = document.getElementById('app') || document.body;
    new MutationObserver(schedule).observe(app, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
