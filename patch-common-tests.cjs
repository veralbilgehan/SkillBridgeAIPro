// Ders Dinleme / Eğitim modülünü kaldırır, yerine "Toplu Ortak Testler" modülünü ekler.
const fs = require('fs');
const path = require('path');
const appPath = path.join(__dirname, 'dist', 'app.js');
const modulePath = process.argv[2];
let src = fs.readFileSync(appPath, 'utf8');
const mod = fs.readFileSync(modulePath, 'utf8');

const startMarker = '    // DERS DİNLEME / EĞİTİM MODÜLÜ (TRAINING AUDIO PAGE)';
const s = src.indexOf(startMarker);
const titleIdx = src.indexOf("'Ders Dinleme / Eğitim Modülü');", s);
const closeIdx = titleIdx === -1 ? -1 : src.indexOf('};', titleIdx);
if (s === -1 || closeIdx === -1) { console.error('Markers not found', s, titleIdx, closeIdx); process.exit(1); }
const eol = src.includes('\r\n') ? '\r\n' : '\n';
const lineEnd = src.indexOf('\n', closeIdx) + 1;
src = src.slice(0, s) + mod.replace(/\r?\n/g, eol) + src.slice(lineEnd);

// Sidebar menü öğesi
const oldNav = `<button class="nav-violet \${(state.page==='training'||state.page==='lessons')?'active':''}" onclick="go('training')"><span class="nav-dot" style="background:#8b5cf6"></span><span>Ders Dinleme / Eğitim</span></button>`;
const newNav = `<button class="nav-violet \${(state.page==='common-tests'||state.page==='training'||state.page==='lessons')?'active':''}" onclick="go('common-tests')"><span class="nav-dot" style="background:#0e7490"></span><span>Toplu Ortak Testler</span></button>`;
if (!src.includes(oldNav)) { console.error('Nav button not found'); process.exit(1); }
src = src.replace(oldNav, newNav);

// Render hook
const hookRe = /\} else if \(state\.page === 'training' \|\| state\.page === 'lessons'\) \{(\s*)document\.getElementById\('app'\)\.innerHTML = trainingPage\(\);/;
if (!hookRe.test(src)) { console.error('Render hook not found'); process.exit(1); }
src = src.replace(hookRe, "} else if (state.page === 'common-tests' || state.page === 'training' || state.page === 'lessons') {$1document.getElementById('app').innerHTML = commonTestsPage();");

fs.writeFileSync(appPath, src, 'utf8');
console.log('OK');
