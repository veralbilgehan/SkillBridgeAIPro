const fs = require('fs');
let txt = fs.readFileSync('dist/app.js', 'utf8');

// The problematic function
const oldFunc = `window.candidateTestPage = function() {
    return \`<div style="padding:40px; max-width:800px; margin:0 auto; font-family:sans-serif;">
        <h2>Test: \${state.candidateSession.id}</h2>
        <p>Hoş geldiniz, <b>\${state.candidateSession.name}</b>. Lütfen aşağıdaki vakayı okuyup cevaplayınız.</p>
        <div style="background:#f8fafc; padding:20px; border-radius:10px; margin:20px 0; border:1px solid #e2e8f0;">
            <h3>Vaka Senaryosu</h3>
            <p>Son 3 ayda ürün iadelerinde %15 artış tespit edilmiştir. Aynı dönemde müşteri şikayetleri kalite kontrol sürecini işaret etmektedir.</p>
            <p><b>Soru:</b> Bu sorunu çözmek için atacağınız ilk 3 adımı ve kök neden analizini nasıl yapacağınızı açıklayınız.</p>
        </div>
        <textarea id="cand-answer" style="width:100%; height:150px; padding:15px; border-radius:8px; border:1px solid #ccc; font-size:1rem;" placeholder="Cevabınızı buraya yazınız..."></textarea>
        <button style="background:#1a73e8; color:#fff; border:none; padding:15px 30px; border-radius:8px; font-size:1.1rem; margin-top:20px; cursor:pointer;" onclick="submitCandidateTest()">Cevabı Gönder ve Testi Bitir</button>
    </div>\`;
};`;

const newFunc = `window.candidateTestPage = function() {
    return '<div style="padding:40px; max-width:800px; margin:0 auto; font-family:sans-serif;">' +
        '<h2>Test: ' + state.candidateSession.id + '</h2>' +
        '<p>Hoş geldiniz, <b>' + state.candidateSession.name + '</b>. Lütfen aşağıdaki vakayı okuyup cevaplayınız.</p>' +
        '<div style="background:#f8fafc; padding:20px; border-radius:10px; margin:20px 0; border:1px solid #e2e8f0;">' +
            '<h3>Vaka Senaryosu</h3>' +
            '<p>Son 3 ayda ürün iadelerinde %15 artış tespit edilmiştir. Aynı dönemde müşteri şikayetleri kalite kontrol sürecini işaret etmektedir.</p>' +
            '<p><b>Soru:</b> Bu sorunu çözmek için atacağınız ilk 3 adımı ve kök neden analizini nasıl yapacağınızı açıklayınız.</p>' +
        '</div>' +
        '<textarea id="cand-answer" style="width:100%; height:150px; padding:15px; border-radius:8px; border:1px solid #ccc; font-size:1rem;" placeholder="Cevabınızı buraya yazınız..."></textarea>' +
        '<button style="background:#1a73e8; color:#fff; border:none; padding:15px 30px; border-radius:8px; font-size:1.1rem; margin-top:20px; cursor:pointer;" onclick="submitCandidateTest()">Cevabı Gönder ve Testi Bitir</button>' +
    '</div>';
};`;

txt = txt.replace(oldFunc, newFunc);
fs.writeFileSync('dist/app.js', txt);
console.log('Replaced function');
