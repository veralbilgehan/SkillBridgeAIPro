const fs = require('fs');
let c = fs.readFileSync('scripts/local-server.mjs', 'utf8');
c = c.replace("server.listen(port,'127.0.0.1'", "server.listen(port,'0.0.0.0'");
fs.writeFileSync('scripts/local-server.mjs', c);
console.log('Fixed bind address in local-server.mjs');
