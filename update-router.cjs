const fs = require('fs');
let c = fs.readFileSync('scripts/local-server.mjs', 'utf8');

// Change `if(url.pathname==='/api/generate'){` to `if(url.pathname.startsWith('/api/')){`
c = c.replace(/if\(url\.pathname==='\/api\/generate'\)\{/, "if(url.pathname.startsWith('/api/')){");

fs.writeFileSync('scripts/local-server.mjs', c);
console.log('Fixed local-server.mjs routing');
