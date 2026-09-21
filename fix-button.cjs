const fs = require('fs');
let txt = fs.readFileSync('dist/app.js', 'utf8');

txt = txt.replace(/Detaylı Rapor ðŸ“Š/g, 'Detaylı Rapor 📊');
// Also maybe there is 'ðŸ“Š' elsewhere?
txt = txt.replace(/ðŸ“Š/g, '📊');

fs.writeFileSync('dist/app.js', txt, 'utf8');
console.log('Mojibake fixed.');
