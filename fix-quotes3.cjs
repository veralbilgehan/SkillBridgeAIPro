const fs = require('fs');
let c = fs.readFileSync('dist/app.js', 'utf8');

// Change single quotes inside the string to be extremely safe: 
// Replace: onclick="document.getElementById(\'secure-exam\').remove();go(\'evaluation\')"
// with:    onclick=\"document.getElementById('secure-exam').remove();go('evaluation')\"
// Wait, if it's already properly escaped, why did it fail on their browser?
// Because in my `patch5.js` I appended `\'secure-exam\'` directly to the string, but `patch5.js` was executed... wait, no, `patch5.js` was appended to `app.js` using `Add-Content`! So `app.js` literally contained the text of `patch5.js`. 
// So `app.js` has `document.getElementById(\\'secure-exam\\')` exactly as I wrote it!
// Let me look at line 1487 AGAIN. 

c = c.replace(/getElementById\(\\'secure-exam\\'\)/g, "getElementById('secure-exam')");
c = c.replace(/go\(\\'evaluation\\'\)/g, "go('evaluation')");

fs.writeFileSync('dist/app.js', c);
