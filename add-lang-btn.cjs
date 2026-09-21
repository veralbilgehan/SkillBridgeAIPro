const fs = require('fs');

let app = fs.readFileSync('dist/app.js', 'utf8');

const targetStr = `aria-label="Tema değiştir">◐</button></div>`;
const replacement = `aria-label="Tema değiştir">◐</button>` +
    `<div class="lang-switch" style="display:inline-flex; border-radius:6px; overflow:hidden; border:1px solid #cbd5e1; margin-left: 10px; background:#fff;">` +
    `<button id="btn-lang-tr" style="padding: 4px 10px; border:none; cursor:pointer; font-weight:bold; font-size:12px; transition:0.2s;" onclick="customTranslate('tr')">TR</button>` +
    `<button id="btn-lang-en" style="padding: 4px 10px; border:none; cursor:pointer; font-weight:bold; font-size:12px; transition:0.2s;" onclick="customTranslate('en')">EN</button>` +
    `</div></div>`;

if(app.includes(targetStr)) {
    app = app.replace(targetStr, replacement);
}

const customTranslateFunc = `
window.customTranslate = function(lang) {
  // Try using the hidden combo box if it exists
  const combo = document.querySelector('.goog-te-combo');
  if (combo) {
    if (lang === 'tr') {
       // Reset translation
       const restoreBtn = document.querySelector('.goog-te-banner-frame')?.contentWindow?.document.querySelector('.goog-te-button button');
       if(restoreBtn) { restoreBtn.click(); }
       else {
           combo.value = 'tr';
           combo.dispatchEvent(new Event('change'));
       }
    } else {
       combo.value = lang;
       combo.dispatchEvent(new Event('change'));
    }
  }
  
  // Set cookie for persistence and reload to ensure clean translation state
  document.cookie = 'googtrans=/tr/' + (lang === 'tr' ? 'tr' : lang) + '; path=/';
  document.cookie = 'googtrans=/tr/' + (lang === 'tr' ? 'tr' : lang) + '; path=/; domain=' + window.location.hostname;
  
  setTimeout(() => window.location.reload(), 200);
};

// Auto style the active language button based on cookie
setTimeout(() => {
  const isEn = document.cookie.includes('googtrans=/tr/en');
  const btnTr = document.getElementById('btn-lang-tr');
  const btnEn = document.getElementById('btn-lang-en');
  if(btnTr && btnEn) {
    if(isEn) {
      btnEn.style.background = '#4f46e5'; btnEn.style.color = 'white';
      btnTr.style.background = 'transparent'; btnTr.style.color = '#334155';
    } else {
      btnTr.style.background = '#4f46e5'; btnTr.style.color = 'white';
      btnEn.style.background = 'transparent'; btnEn.style.color = '#334155';
    }
  }
}, 300);
`;

if(!app.includes('window.customTranslate')) {
    app += '\n' + customTranslateFunc;
}

fs.writeFileSync('dist/app.js', app, 'utf8');
console.log('Appended top-nav language switch and customTranslate.');
