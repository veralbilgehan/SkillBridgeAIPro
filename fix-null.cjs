const fs = require('fs');
let app = fs.readFileSync('dist/app.js', 'utf8');

app = app.replace(
    /window\.updateDbChain = function\(level\) \{/g,
    "window.updateDbChain = function(level) {\n        const _chk = document.getElementById('pb-sector');\n        if (!_chk) return;\n"
);

fs.writeFileSync('dist/app.js', app, 'utf8');
console.log('Fixed TypeError correctly');
