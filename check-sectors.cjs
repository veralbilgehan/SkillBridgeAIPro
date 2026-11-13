const fs = require('fs');

const md = fs.readFileSync('dist/matrix-data.js', 'utf8');
const fn = new Function('window', md + '; return window.skillBridgeMatrix;');
const matrixData = fn({}) || {};

const appJs = fs.readFileSync('dist/app.js', 'utf8');

function unique(a){ return Array.from(new Set(a)); }

// Check window.DATABANK
const databankMatch = appJs.match(/window\.DATABANK = \{([\s\S]*?)\n    \};/);
let DATABANK = {};
if (databankMatch) {
    DATABANK = (new Function('return ({' + databankMatch[1] + '})'))();
}

console.log('DATABANK keys:', Object.keys(DATABANK).length);
console.log('matrixData hierarchy rows:', matrixData.hierarchy ? matrixData.hierarchy.length : 0);

const allSectors = unique([
    ...Object.keys(DATABANK),
    ...(matrixData.hierarchy ? matrixData.hierarchy.map(h => h[0]) : [])
]).filter(Boolean).sort((a,b) => a.localeCompare(b, 'tr'));

console.log('Total allSectors:', allSectors.length);

const empty = [];
for (const s of allSectors) {
    const subs = unique([
        ...(DATABANK[s] ? Object.keys(DATABANK[s]) : []),
        ...(matrixData.hierarchy ? matrixData.hierarchy.filter(h => h[0] === s).map(h => h[1]) : [])
    ]).filter(Boolean);
    if (subs.length === 0) empty.push(s);
}
console.log('Empty subsector sectors:', empty.length, empty);
