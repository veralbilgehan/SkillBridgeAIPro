const fs = require('fs');
const txt = fs.readFileSync('dist/app.js', 'utf8');

const weirdChars = txt.match(/[^\x00-\x7FğüşöçİĞÜŞÖÇıâîûÂÎÛ]/g);
if (weirdChars) {
  const unique = [...new Set(weirdChars)];
  console.log('Found weird chars:', unique);
  
  // Let's also print context around them
  for(const c of unique.slice(0, 5)) {
    const idx = txt.indexOf(c);
    console.log(`Context for ${c}:`, txt.substring(Math.max(0, idx-20), Math.min(txt.length, idx+20)));
  }
} else {
  console.log('No weird characters found!');
}
