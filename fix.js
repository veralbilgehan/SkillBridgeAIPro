const fs = require('fs');

let content = fs.readFileSync('dist/app.js', 'utf8');

const mapping = {
    'A,A': 'ı',
    'A,?o': '–', // or -
    'AA': 'ü',
    'A.,': 'ş',
    'A?': 'Ç',
    'A,A': 'ı', // wait duplicate
    'A"': 'Ü',
    'A,AnA.,a': 'İnşa', // A,AnA.,a ? A,A is usually ı. But maybe it's İnşa.
    'A,A': 'i', // wait...
    'AA ': 'ö',
    'A,,': 'ğ',
    'AAA.,AAn': 'düşün', // DAAA.,AAnme -> Düşünme => DAA = Dü, A., = ş, AA = ü. So AA = ü.
    'DAA': 'Dü',
    'AA': 'ü',
    'A.,': 'ş',
    'A?': 'Ç',
    'A,A': 'ı',
    'A,,': 'ğ',
    'AA ': 'ö',
    'AA ': 'Ö', // Need context
};

// Let's print out some snippets to map correctly
const snippets = content.substring(0, 3000);
console.log(snippets);
