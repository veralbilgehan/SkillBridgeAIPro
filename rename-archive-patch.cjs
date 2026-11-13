const fs = require('fs');
const path = require('path');
const appPath = path.join(__dirname, 'dist', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');

// 1. Menüden Vaka İşlemleri altındaki Evrak Kutusu butonunu kaldır
const oldBtn = /\s*<button class="\$\{state\.page==='archive'\?'active':''\}" onclick="go\('archive'\)">Evrak Kutusu<\/button>/;
app = app.replace(oldBtn, '');

// 2. Test Yönetimi grubuna Test Arşivi ekle (Test Platformu'ndan sonra)
const platBtn = `<button class="\${state.page==='test-platform'?'active':''}" onclick="go('test-platform')">Test Platformu</button>`;
const archBtn = `\n                <button class="\${state.page==='archive'?'active':''}" onclick="go('archive')">Test Arşivi</button>`;
if (!app.includes(`onclick="go('archive')">Test Arşivi`)) {
  app = app.replace(platBtn, platBtn + archBtn);
}

// 3. Grup açık kalma koşulu: archive artık Test grubunda
app = app.replace(
  "const isTestGroup = ['tests', 'evaluation', 'results', 'test-platform'].includes(state.page);",
  "const isTestGroup = ['tests', 'evaluation', 'results', 'test-platform', 'archive'].includes(state.page);"
);
app = app.replace(
  "const isCaseGroup = ['archive', 'documents',",
  "const isCaseGroup = ['documents',"
);

// 4. İsim değişiklikleri
app = app.replace("<h2 style=\"margin-top: 0;\">Evrak Kutusu</h2>", "<h2 style=\"margin-top: 0;\">Test Arşivi</h2>");
app = app.replace("<div><h2>Evrak Kutusu</h2>", "<div><h2>Test Arşivi</h2>");
app = app.replace("`, 'Evrak Kutusu');", "`, 'Test Arşivi');");
app = app.replace(/>Evrak Kutusu<\/button>/g, '>Test Arşivi</button>');
app = app.replace("Evrak Kutusunda saklamak", "Test Arşivinde saklamak");
app = app.replace("Evrak Kutusunda saklanmak", "Test Arşivinde saklanmak");
app = app.replace("evrak kutusundaki vakaları", "test arşivindeki vakaları");
app = app.replace("Evrak Kutusu", "Test Arşivi"); // kalan ilk örnek (nav sabiti)

fs.writeFileSync(appPath, app, 'utf8');

// patch15 kaynakları
for (const f of ['patch15.cjs', 'dist/patch15.js']) {
  const p = path.join(__dirname, f);
  if (!fs.existsSync(p)) continue;
  let s = fs.readFileSync(p, 'utf8');
  s = s.replace('>Evrak Kutusu</button>', '>Test Arşivi</button>');
  fs.writeFileSync(p, s, 'utf8');
}

// index.html sürüm
const ip = path.join(__dirname, 'dist', 'index.html');
let h = fs.readFileSync(ip, 'utf8');
h = h.replace(/app\.js\?v=(\d+)/, (m, v) => 'app.js?v=' + (parseInt(v, 10) + 1));
fs.writeFileSync(ip, h, 'utf8');
console.log('done');
