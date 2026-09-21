const fs = require('fs');
let c = fs.readFileSync('dist/patch8.js', 'utf8');
c = c.replace("go(\\'results\\')", "go(`results`)");
fs.writeFileSync('dist/patch8.js', c);
