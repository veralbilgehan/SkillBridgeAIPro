const fs = require('fs');

let c = fs.readFileSync('worker/index.js', 'utf8');
c = c.replace("import * as db from '../db.js';", "import * as db from '../../db.js';");
fs.writeFileSync('worker/index.js', c);

console.log('Fixed import path');
