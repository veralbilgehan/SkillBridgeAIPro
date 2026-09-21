const fs = require('fs');
let app = fs.readFileSync('dist/app.js', 'utf8');

// Replace HR prompt
app = app.replace(
    /Türkçe, gerçekçi ve birbirini tekrar etmeyen \$\{count\} adet senaryo ve soru üret\./,
    "Türkçe, ileri düzeyde zor, karmaşık, yüksek analitik düşünce gerektiren ve kesinlikle birbirini tekrar etmeyen ${count} adet profesyonel teknik/yönetsel senaryo ve soru üret. İlk sorudan itibaren çok seçici, detaylı ve uzman seviyesinde olsun. Basit, ezbere dayalı veya yüzeysel sorulardan kesinlikle kaçın."
);

// Replace MCQ prompt
app = app.replace(
    /Aşağıdaki vakaya tamamen bağlı \$\{count\} farklı Türkçe çoktan seçmeli soru üret\. Her soru A-D dört şıklı olsun\./,
    "Aşağıdaki vakaya tamamen bağlı ${count} farklı Türkçe çoktan seçmeli soru üret. Sorular teknik olarak çok zorlayıcı, çeldiricileri son derece güçlü, vakanın satır aralarını ve karmaşık ilişkilerini ölçen uzman seviyesinde olsun. Basit çıkarım soruları sorma. Her soru A-D dört şıklı olsun."
);

// Replace QDraft prompt
app = app.replace(
    /Aşağıdaki vakaya bağlı \$\{count\} farklı açık uçlu Türkçe soru üret\./,
    "Aşağıdaki vakaya bağlı ${count} farklı açık uçlu Türkçe soru üret. Sorular teknik derinliği olan, üst düzey analitik düşünme, stratejik problem çözme ve kritik karar alma yetilerini ölçecek zorlukta olsun. Kesinlikle yüzeysel, basit veya genel geçer sorular üretme."
);

fs.writeFileSync('dist/app.js', app, 'utf8');
console.log('Prompts updated for higher difficulty.');
