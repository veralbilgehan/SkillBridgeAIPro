const fs = require('fs');

const md = fs.readFileSync('dist/matrix-data.js', 'utf8');
const fn = new Function('window', md + '; return window.skillBridgeMatrix;');
const matrixData = fn({}) || {};

const appJs = fs.readFileSync('dist/app.js', 'utf8');

const databankMatch = appJs.match(/window\.DATABANK = \{([\s\S]*?)\n    \};/);
const DATABANK = (new Function('return ({' + databankMatch[1] + '})'))();

function unique(a){ return Array.from(new Set(a)); }
function safeText(v){ return String(v||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

const allSectors = unique([
    ...Object.keys(DATABANK),
    ...(matrixData.hierarchy ? matrixData.hierarchy.map(h => h[0]) : [])
]).filter(Boolean).sort((a,b) => a.localeCompare(b, 'tr'));

console.log('Total sectors:', allSectors.length);

const testSectors = [
    'Teknoloji & Bilişim',
    'Denizcilik',
    'Havacılık',
    'Ağaç İşleri & Mobilya',
    'Sağlık & İlaç'
];

for (const sectorName of testSectors) {
    const sector = sectorName;
    const subs = unique([
        ...(DATABANK[sector] ? Object.keys(DATABANK[sector]) : []),
        ...(matrixData.hierarchy ? matrixData.hierarchy.filter(h => h[0] === sector).map(h => h[1]) : [])
    ]).filter(Boolean).sort((a,b) => a.localeCompare(b, 'tr'));
    
    console.log('Sector "' + sectorName + '": found ' + subs.length + ' subsectors.');
    if (subs.length === 0) {
        console.log('   FAIL: 0 subsectors for ' + sectorName);
    } else {
        console.log('   Sample subs:', subs.slice(0, 3));
    }
}
