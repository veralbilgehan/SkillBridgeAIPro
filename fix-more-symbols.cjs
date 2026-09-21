const fs = require('fs');
let c = fs.readFileSync('dist/app.js', 'utf8');

const replacements = {
  'â€¦': '…',
  'EĞž': 'EĞ',
  'Eğž': 'Eğ',
  'eğž': 'eğ',
  'DEĞž': 'DEĞ',
  'â€”': '—',
  'â€¢': '•',
  'EÄž': 'EĞ',
  'DEÄž': 'DEĞ',
  'AÄž': 'AĞ',
  'aÄž': 'ağ'
};

for (const [bad, good] of Object.entries(replacements)) {
  c = c.split(bad).join(good);
}

fs.writeFileSync('dist/app.js', c, 'utf8');
console.log('Fixed more symbols and G chars');
