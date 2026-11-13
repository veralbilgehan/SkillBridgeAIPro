const fs = require('fs');
const p = require('path').join(__dirname, 'dist', 'styles.css');
let css = fs.readFileSync(p, 'utf8');
const marker = '/* Sidebar beyaz tema */';
if (!css.includes(marker)) {
  css += `
${marker}
.sidebar { background: #ffffff !important; border-right: 1px solid #e2e8f0; }
.sidebar, .sidebar *, .nav button, .profile strong, .profile span, .profile small, .delivery-menu summary, .delivery-menu>div button, .side-footer button { color: #0f172a !important; }
.profile small, .profile span { color: #475569 !important; }
.profile { background: #f1f5f9 !important; border-color: #e2e8f0 !important; }
.nav button.active, .nav button:hover, .delivery-menu summary:hover { background: #eef2f7 !important; box-shadow: inset 3px 0 #14b8a6 !important; }
.delivery-menu>div { border-left-color: #cbd5e1 !important; }
.side-footer { border-top-color: #e2e8f0 !important; }
.side-footer button { background: #f1f5f9 !important; }
.side-footer button:hover { background: #fee2e2 !important; }
`;
  fs.writeFileSync(p, css, 'utf8');
}
const ip = require('path').join(__dirname, 'dist', 'index.html');
let h = fs.readFileSync(ip, 'utf8');
h = h.replace(/styles\.css\?v=(\d+)/, (m, v) => 'styles.css?v=' + (parseInt(v, 10) + 1));
fs.writeFileSync(ip, h, 'utf8');
console.log('done');
