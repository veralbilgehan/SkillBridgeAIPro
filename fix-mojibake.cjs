const fs = require('fs');

let content = fs.readFileSync('dist/app.js', 'utf8');

const replacements = {
    'Ä±': 'ı',
    'Ã¼': 'ü',
    'ÅŸ': 'ş',
    'Åž': 'Ş',
    'Ã§': 'ç',
    'Ã‡': 'Ç',
    'Ã–': 'Ö',
    'Ã¶': 'ö',
    'ÄŸ': 'ğ',
    'Ä°': 'İ',
    'Ä': 'Ğ', // Sometimes Ä is Ğ if followed by something else, let's be careful. ÄŸ is ğ, Äž is Ğ
    'Äž': 'Ğ',
    'Ãœ': 'Ü',
    'Ã¢': 'â',
    'â€“': '–',
    'Â·': '·',
    'â€œ': '“',
    'â€': '”',
    'â€™': '’',
    'Ã›': 'Û' // Example
};

// Apply replacements
for (const [bad, good] of Object.entries(replacements)) {
    content = content.split(bad).join(good);
}

// But wait! Is there any double-encoded ones? Like `ÃƒÂ¼` ?
// Also, my patches had standard utf-8 characters. If I append using `Add-Content` without specifying encoding, PowerShell defaults to ANSI or Windows-1252.
// Let's do the replacement and save.
fs.writeFileSync('dist/app.js', content, 'utf8');
console.log('Fixed mojibake in dist/app.js');
