const fs = require('fs');
let c = fs.readFileSync('dist/app.js', 'utf8');

const replacements = {
  'âŸ³': '⟶',
  'âœ‰': '✉',
  'âœ•': '✕',
  'â†\x90': '←',
  'âœ“': '✓'
};

for (const [bad, good] of Object.entries(replacements)) {
  c = c.split(bad).join(good);
}

fs.writeFileSync('dist/app.js', c, 'utf8');
console.log('Fixed final icons');
