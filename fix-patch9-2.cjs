const fs = require('fs');
let c = fs.readFileSync('dist/patch9.js', 'utf8');
c = c.split('\\\\`').join('`');
c = c.split('\\\\$').join('$');
fs.writeFileSync('dist/patch9.js', c);
