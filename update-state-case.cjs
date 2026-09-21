const fs = require('fs');

let app = fs.readFileSync('dist/app.js', 'utf8');

// Replace window.currentCaseSource with state.pendingCase
app = app.replace(/window\.currentCaseSource = resultText;/g, "state.pendingCase = resultText;");
app = app.replace(/window\.currentCaseSource = document\.getElementById\('db-case-text'\)\.value;/g, "state.pendingCase = document.getElementById('db-case-text').value;");

fs.writeFileSync('dist/app.js', app, 'utf8');
console.log('Fixed case passing state');
