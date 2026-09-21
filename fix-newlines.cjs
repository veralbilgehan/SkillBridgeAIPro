const fs = require('fs');
let app = fs.readFileSync('dist/app.js', 'utf8');
app = app.replace(
    `'\\\\nKONU: '+topic+'\\\\nKAYNAK DOSYA: '+selectedDocumentFile.name+'\\\\nSEKTÖR: '+sector+'\\\\nALT SEKTÖR: '+subsector+'\\\\nFONKSİYON: '+func+'\\\\nPOZİSYON: '+position+'\\\\n\\\\nVAKA\\\\n'`,
    `'\\nKONU: '+topic+'\\nKAYNAK DOSYA: '+selectedDocumentFile.name+'\\nSEKTÖR: '+sector+'\\nALT SEKTÖR: '+subsector+'\\nFONKSİYON: '+func+'\\nPOZİSYON: '+position+'\\n\\nVAKA\\n'`
);
app = app.replace(
    `'VAKA BAŞLIĞI: '+title+'\\\\nKONU: '`,
    `'VAKA BAŞLIĞI: '+title+'\\nKONU: '`
);
app = app.replace(
    `sona erer.\\\\n\\\\nVAKA BAĞLAMI\\\\n'+context`,
    `sona erer.\\n\\nVAKA BAĞLAMI\\n'+context`
);
fs.writeFileSync('dist/app.js', app, 'utf8');
console.log('Fixed literal newlines in generateDocumentCase');
