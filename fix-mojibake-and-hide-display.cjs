const fs = require('fs');
const path = require('path');

// 1. Update dist/styles.css to add display: none !important to .document-icon
const cssPath = path.join(__dirname, 'dist', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace('.document-icon{font-size:2.5rem}', '.document-icon{display:none!important;font-size:2.5rem}');
if (!css.includes('.document-icon{display:none!important;')) {
    css += '\n.document-icon { display: none !important; }\n';
}
fs.writeFileSync(cssPath, css, 'utf8');
console.log('✅ dist/styles.css updated with display: none for .document-icon.');

// 2. Update dist/app.js
const appPath = path.join(__dirname, 'dist', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');

// Replace corrupted document icon and hide it
app = app.replace(/<div class="document-icon">[\s\S]*?<\/div>/g, '<div class="document-icon" style="display: none;"></div>');

// Replace all other mojibake in dist/app.js
app = app.replace(/Çözüm Testleri ðŸ‘\s*/g, 'Çözüm Testleri');
app = app.replace(/<h3>ðŸ“Œ\s*/g, '<h3>📌 ');
app = app.replace(/<b>ðŸŽ¯\s*/g, '<b>🎯 ');
app = app.replace(/<div class="meeting-mic"><span>[\s\S]*?<\/span><\/div>/g, '<div class="meeting-mic" style="display: none;"></div>');
app = app.replace(/ðŸ”Š\s*/g, '🔊 ');
app = app.replace(/ðŸ ¢\s*/g, '🏢 ');
app = app.replace(/ðŸ‘”\s*/g, '👔 ');
app = app.replace(/ðŸ‘¤\s*/g, '👤 ');

// Clean any remaining ðŸ pattern
app = app.replace(/ðŸ[^\s<>"'`]+/g, '');

fs.writeFileSync(appPath, app, 'utf8');
console.log('✅ dist/app.js updated and mojibake completely cleaned.');
