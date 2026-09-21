const fs = require('fs');
let c = fs.readFileSync('dist/app.js', 'utf8');

c = c.replace(/\\\\'evaluation\\\\'/g, "\\'evaluation\\'");
c = c.replace(/\\\\'secure-exam\\\\'/g, "\\'secure-exam\\'");
c = c.replace(/\\\\'\.modal\\\\'/g, "\\'\.modal\\'");

fs.writeFileSync('dist/app.js', c);
console.log('Fixed syntax again');
