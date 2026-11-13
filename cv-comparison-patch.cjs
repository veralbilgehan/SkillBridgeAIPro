const fs = require('fs');
const path = require('path');
const appPath = path.join(__dirname, 'dist', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');

// 1. Vaka İşlemleri altından Karşılaştırma butonunu kaldır
app = app.replace(/\s*<button class="\$\{state\.page==='comparison'\?'active':''\}" onclick="go\('comparison'\)">Karşılaştırma<\/button>/, '');

// 2. Ana başlık olarak "CV Karşılaştırma" ekle (Genel Bakış'tan hemen sonra)
const dash = `<span>Genel Bakış</span></button>`;
const cvBtn = `\n    <button class="nav-cyan \${state.page==='comparison'?'active':''}" onclick="go('comparison')"><span class="nav-dot"></span><span>CV Karşılaştırma</span></button>`;
if (!app.includes('<span>CV Karşılaştırma</span>')) {
  const i = app.indexOf(dash, app.indexOf('PATCH 15: SIDEBAR REORGANIZATION'));
  if (i !== -1) app = app.slice(0, i + dash.length) + cvBtn + app.slice(i + dash.length);
}

// 3. Vaka grubu açık kalma koşulundan çıkar
app = app.replace("'questions', 'comparison'].includes(state.page);", "'questions'].includes(state.page);");

// 4. Sayfa başlığını yeniden adlandır
app = app.replace('<h2>10 Sayfa Karşılaştırması</h2>', '<h2>CV Karşılaştırma</h2>');
app = app.replace("['comparison','Karşılaştırma']", "['comparison','CV Karşılaştırma']");

fs.writeFileSync(appPath, app, 'utf8');

for (const f of ['patch15.cjs', 'dist/patch15.js']) {
  const p = path.join(__dirname, f);
  if (!fs.existsSync(p)) continue;
  let s = fs.readFileSync(p, 'utf8');
  s = s.replace(/\s*<button class="\\?\$\{state\.page==='comparison'\?'active':''\}" onclick="go\('comparison'\)">Karşılaştırma<\/button>/, '');
  fs.writeFileSync(p, s, 'utf8');
}

const ip = path.join(__dirname, 'dist', 'index.html');
let h = fs.readFileSync(ip, 'utf8');
h = h.replace(/app\.js\?v=(\d+)/, (m, v) => 'app.js?v=' + (parseInt(v, 10) + 1));
fs.writeFileSync(ip, h, 'utf8');
console.log('done');
