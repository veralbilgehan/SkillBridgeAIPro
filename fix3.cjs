const fs = require('fs');
let c = fs.readFileSync('dist/patch8.js', 'utf8');

c = c.split(`onclick="go(\\'results\\')"`).join(`onclick="go('results')"`);

fs.writeFileSync('dist/patch8.js', c);
