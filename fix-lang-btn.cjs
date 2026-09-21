const fs = require('fs');
let app = fs.readFileSync('dist/app.js', 'utf8');

const newCustomTranslate = `
window.customTranslate = function(lang) {
  if (lang === 'tr') {
    // Delete all possible googtrans cookies
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + window.location.hostname;
    window.location.reload();
  } else {
    // Set to EN
    document.cookie = 'googtrans=/tr/en; path=/;';
    document.cookie = 'googtrans=/tr/en; path=/; domain=' + window.location.hostname;
    document.cookie = 'googtrans=/tr/en; path=/; domain=.' + window.location.hostname;
    window.location.reload();
  }
};

// Check cookie for UI
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
}, 100);
`;

// Replace the old customTranslate block
app = app.replace(/window\.customTranslate = function[\s\S]*?\}, 300\);\n/g, newCustomTranslate);

fs.writeFileSync('dist/app.js', app, 'utf8');
console.log('Fixed customTranslate.');
