const fs = require('fs');

const content = fs.readFileSync('dist/app.js', 'utf8');

// Regex for any mojibake: ð, Ÿ, Â, â, etc.
const matches = [];
const lines = content.split('\n');

lines.forEach((line, lineNo) => {
    // Check if line contains ð or Ÿ or \uFFFD or unescaped non-standard sequences
    if (/[ðŸ\uFFFD]/.test(line) || /â[€\x80-\xBF]/.test(line)) {
        matches.push({ lineNo: lineNo + 1, text: line.trim() });
    }
});

console.log('Total mojibake lines found:', matches.length);
matches.forEach(m => console.log(`L${m.lineNo}: ${m.text.slice(0, 120)}`));
