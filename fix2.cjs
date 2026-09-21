const fs = require('fs');
let c = fs.readFileSync('dist/patch8.js', 'utf8');

c = c.replace(/onclick="go\\(\\\\'results\\\\'\\)"/, "onclick=\\"go('results')\\"");

fs.writeFileSync('dist/patch8.js', c);
