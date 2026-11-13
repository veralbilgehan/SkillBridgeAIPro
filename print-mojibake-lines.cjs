const fs = require('fs');

const content = fs.readFileSync('dist/app.js', 'utf8');
const lines = content.split('\n');

const lineNumbers = [291, 305, 323, 386, 941, 950, 959, 993, 1143, 1153, 1154, 1163, 1178, 1182, 1191, 1195];

lineNumbers.forEach(n => {
    const l = lines[n - 1];
    console.log(`Line ${n}:`);
    console.log(l);
    console.log('---');
});
