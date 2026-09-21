const fs = require('fs');
let c = fs.readFileSync('dist/patch9.js', 'utf8');
c = c.replace(/\\\\`/g, '`');
c = c.replace(/\\\\\\$/g, '$');
fs.writeFileSync('dist/patch9.js', c);
