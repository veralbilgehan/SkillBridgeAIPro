const fs = require('fs');
let c = fs.readFileSync('dist/app.js', 'utf8');

c = c.replace(/\\`/g, "`");
c = c.replace(/\\\$\{/g, "${");

fs.writeFileSync('dist/app.js', c);
console.log('Fixed backticks');
