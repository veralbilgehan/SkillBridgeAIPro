const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, 'dist', 'styles.css');
let css = fs.readFileSync(p, 'utf8');
const marker = '/* Hamburger: sidebar tamamen gizle */';
if (!css.includes(marker)) {
  css += `
${marker}
.sidebar-collapsed .shell{grid-template-columns:1fr !important}
.sidebar-collapsed .sidebar{display:none !important}
.sidebar-collapsed .workspace{grid-column:1 !important}
`;
  fs.writeFileSync(p, css, 'utf8');
}
const ip = path.join(__dirname, 'dist', 'index.html');
let h = fs.readFileSync(ip, 'utf8');
h = h.replace(/styles\.css\?v=(\d+)/, (m, v) => 'styles.css?v=' + (parseInt(v, 10) + 1));
fs.writeFileSync(ip, h, 'utf8');
console.log('done');
