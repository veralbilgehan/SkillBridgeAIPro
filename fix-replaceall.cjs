const fs = require('fs');
let app = fs.readFileSync('dist/app.js', 'utf8');
app = app.replace(
    /replaceAll\('\\\\n','<br>'\)/g,
    `replaceAll('\\n','<br>')`
);
fs.writeFileSync('dist/app.js', app, 'utf8');
console.log('Fixed replaceAll');
