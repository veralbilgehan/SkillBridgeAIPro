const fs = require('fs');
let c = fs.readFileSync('dist/app.js', 'utf8');

const replacements = {
  'â†’': '→',
  'â€º': '›',
  'Ã—': '×',
  'âžœ': '➜',
  'â†ª': '↩',
  'â˜°': '☰',
  'â—\x8F': '●',
  'â—\x90': '◐',
  'ZEKÃ‚': 'ZEKÂ',
  'âŒ•': '⌕',
  'Â·': '·'
};

for (const [bad, good] of Object.entries(replacements)) {
  c = c.split(bad).join(good);
}

// Let's also check if there are other Â sequences
c = c.replace(/Â/g, ''); // Often Â is just a leftover from converting non-breaking space or similar, but wait, Â· is already replaced.

fs.writeFileSync('dist/app.js', c, 'utf8');
console.log('Fixed remaining mojibake symbols');
