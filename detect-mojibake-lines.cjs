const fs = require('fs');

function checkFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    console.log('--- Checking:', filePath, '---');
    lines.forEach((line, idx) => {
        if (/ðŸ|ð|Ÿ/.test(line)) {
            console.log(`Line ${idx + 1}: ${line.trim().slice(0, 100)}`);
        }
    });
}

checkFile('dist/app.js');
checkFile('dist/index.html');
checkFile('dist/styles.css');
