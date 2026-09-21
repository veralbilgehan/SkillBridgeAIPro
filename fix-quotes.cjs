const fs = require('fs');
let c = fs.readFileSync('dist/app.js', 'utf8');

c = c.replace(/document\.getElementById\('secure-exam'\)/g, "document.getElementById(\\'secure-exam\\')"); // Wait, replacing with `\'` is still wrong if I don't use `\\\\`. Let's use backticks!
c = c.replace(/document\.getElementById\('secure-exam'\)/g, "document.getElementById(\\\\'secure-exam\\\\')");
c = c.replace(/go\('evaluation'\)/g, "go(\\\\'evaluation\\\\')");
c = c.replace(/this\.closest\('\\.modal'\)/g, "this.closest(\\\\'\.modal\\\\')");
c = c.replace(/this\.closest\('\.modal'\)/g, "this.closest(\\\\'\.modal\\\\')");
c = c.replace(/toast\('Rapor indiriliyor\.\.\.'\)/g, "toast(\\\\'Rapor indiriliyor...\\\\')");
c = c.replace(/toast\('De(.*?)erlendirme sonucu e-posta ile g(.*?)nderildi\.'\)/g, "toast(\\\\'Değerlendirme sonucu e-posta ile gönderildi.\\\\')");

fs.writeFileSync('dist/app.js', c);
console.log('Fixed quotes in app.js');
