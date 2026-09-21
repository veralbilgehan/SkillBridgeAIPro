const fs = require('fs');
const lines = fs.readFileSync('dist/app.js', 'utf8').split('\\n');
const index = lines.findIndex(l => l.includes('`'));
console.log('First backtick is at line: ' + (index + 1));
console.log(lines[index]);
