const fs = require('fs');
let c = fs.readFileSync('dist/patch8.js', 'utf8');

// The buggy line is:
// html += '<button onclick="go(\\'results\\')" ...
// Let's replace the whole string.
c = c.replace(
  "html += '<button onclick=\\"go(\\\\'results\\\\')\\\" style=\\"background: transparent; border: none; color: white; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;\\">';",
  "html += '<button onclick=\"go(`results`)\" style=\"background: transparent; border: none; color: white; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;\">';"
);
// wait, the easiest way is to just find the line index and replace it
const lines = c.split('\\n');
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('onclick="go(')) {
        lines[i] = "        html += '<button onclick=\"go(`results`)\" style=\"background: transparent; border: none; color: white; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;\">';";
    }
}
fs.writeFileSync('dist/patch8.js', lines.join('\\n'));
