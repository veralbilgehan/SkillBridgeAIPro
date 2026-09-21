const fs = require('fs');

const patchCode14 = `
// ==========================================
// PATCH 14: DATABANK AND MULTI-SELECT
// ==========================================
(function() {
    window.DATABANK = {
        "Teknoloji & Bilişim": {
            "Yazılım Geliştirme": {
                departments: ["Ar-Ge", "Mühendislik", "Ürün Geliştirme"],
                expertises: ["Frontend", "Backend", "Full Stack", "Mobil Geliştirme", "DevOps"],
                positions: ["Junior Uzman", "Mid-Level Uzman", "Senior Uzman", "Takım Lideri", "Yazılım Mimarı", "CTO"],
                certificates: ["AWS Certified Developer", "Microsoft Certified Azure", "Oracle Certified Professional"]
            },
            "Siber Güvenlik": {
                departments: ["Siber Güvenlik Merkezi", "Bilgi Teknolojileri", "Risk Yönetimi"],
                expertises: ["Sızma Testi", "Ağ Güvenliği", "Adli Bilişim", "Bulut Güvenliği"],
                positions: ["Güvenlik Analisti", "Güvenlik Mühendisi", "Kıdemli Sızma Testi Uzmanı", "CISO"],
                certificates: ["CEH", "CISSP", "CISM", "CompTIA Security+"]
            },
            "Veri & Yapay Zeka": {
                departments: ["Veri Bilimi", "Analitik İş Zekası", "Ar-Ge"],
                expertises: ["Makine Öğrenmesi", "Veri Analizi", "Veri Mühendisliği", "Büyük Veri"],
                positions: ["Veri Analisti", "Veri Bilimci", "Veri Mühendisi", "AI Araştırmacısı"],
                certificates: ["Google Professional Data Engineer", "AWS Certified Data Analytics", "NVIDIA Deep Learning"]
            }
        },
        "Finans & Bankacılık": {
            "Kurumsal Finans": {
                departments: ["Finansal Raporlama", "Bütçe ve Planlama", "Hazine"],
                expertises: ["Risk Analizi", "Yatırım Değerleme", "Vergi Yönetimi", "Nakit Akışı"],
                positions: ["Finansal Analist", "Finans Uzmanı", "Finans Müdürü", "CFO"],
                certificates: ["CFA", "CPA", "SMMM", "SPK İleri Düzey"]
            },
            "Bireysel Bankacılık": {
                departments: ["Bireysel Pazarlama", "Kredi Tahsis", "Şube Ağı Yönetimi"],
                expertises: ["Müşteri İlişkileri", "Kredi Risk", "Portföy Yönetimi"],
                positions: ["Gişe Asistanı", "Müşteri Temsilcisi", "Portföy Yöneticisi", "Şube Müdürü"],
                certificates: ["SPK Düzey 1", "SEGEM"]
            }
        },
        "İnsan Kaynakları": {
            "İşe Alım & Yetenek": {
                departments: ["İşe Alım", "Yetenek Yönetimi", "İşveren Markası"],
                expertises: ["Mülakat Teknikleri", "Headhunting", "Yetenek Testleri"],
                positions: ["İşe Alım Uzmanı", "Kıdemli IT Recruiter", "İşe Alım Müdürü"],
                certificates: ["SHRM-CP", "PHR", "Değerlendirme Merkezi Uzmanı"]
            },
            "Eğitim & Gelişim": {
                departments: ["Akademi", "Öğrenme ve Gelişim", "Kültür"],
                expertises: ["Eğitim Tasarımı", "Koçluk", "Liderlik Gelişimi"],
                positions: ["Eğitim Uzmanı", "Eğitmen", "Eğitim Teknolojileri Uzmanı", "Akademi Müdürü"],
                certificates: ["ICF Profesyonel Koç", "Eğitici Eğitimi (ToT)"]
            }
        },
        "Satış & Pazarlama": {
            "Dijital Pazarlama": {
                departments: ["Pazarlama", "E-Ticaret", "Performans Pazarlama"],
                expertises: ["SEO/SEM", "İçerik Pazarlaması", "Sosyal Medya Yönetimi", "CRM"],
                positions: ["Dijital Pazarlama Uzmanı", "Performans Yöneticisi", "CMO"],
                certificates: ["Google Ads Certification", "HubSpot Content Marketing", "Meta Blueprint"]
            },
            "Kurumsal Satış (B2B)": {
                departments: ["Satış", "İş Geliştirme", "Müşteri Yönetimi"],
                expertises: ["B2B Satış", "Müzakere Teknikleri", "Büyük Müşteri (KAM) Yönetimi"],
                positions: ["Satış Temsilcisi", "Key Account Manager", "Satış Direktörü"],
                certificates: ["SPIN Selling", "İleri Düzey Müzakere Teknikleri"]
            }
        }
    };

    // Helper to extract multiple values from <select multiple>
    window.pvMulti = function(id) {
        const el = document.getElementById(id);
        if(!el) return '';
        const selected = Array.from(el.selectedOptions).map(o => o.value);
        return selected.join(', ');
    };

    // Override the page HTML
    window.promptBuilderPage = function() {
        return layout(\`<section class="prompt-page">
            <div class="prompt-head">
                <div>
                    <span class="eyebrow">AJAN 8 · FORMDAN VAKA</span>
                    <h2>Veri Bankası İle Vaka Üret</h2>
                    <p>Önceden tanımlı dev veri kütüphanesini kullanarak sektör seçin. Birden fazla departman, uzmanlık ve sertifikayı (CTRL/CMD tuşlarına basarak) aynı anda seçip kompleks vakalar üretebilirsiniz.</p>
                </div>
                <button class="secondary" onclick="go('documents')">← Belgeden Vaka</button>
            </div>
            <div class="prompt-card">
                <div class="prompt-grid">
                    <label><span>Sektör</span><select id="pb-sector" onchange="updateDbChain('sector')"></select></label>
                    <label><span>Alt Sektör</span><select id="pb-subsector" onchange="updateDbChain('subsector')" disabled></select></label>
                    <label><span>Pozisyon / Seviye</span><select id="pb-position" onchange="updateDbPrompt()" disabled></select></label>
                    
                    <label><span>Departman (Çoklu Seçim)</span>
                        <select id="pb-department" multiple size="4" onchange="updateDbPrompt()" disabled style="height:90px;"></select>
                    </label>
                    <label><span>Uzmanlık / Fonksiyon (Çoklu Seçim)</span>
                        <select id="pb-expertise" multiple size="4" onchange="updateDbPrompt()" disabled style="height:90px;"></select>
                    </label>
                    <label><span>Sertifikalar (Çoklu Seçim)</span>
                        <select id="pb-certificate" multiple size="4" onchange="updateDbPrompt()" disabled style="height:90px;"></select>
                    </label>
                    
                    <label><span>Vaka Konusu / Teması</span><input id="pb-topic" type="text" placeholder="Örn: Kriz yönetimi, bütçe kısıntısı" oninput="updateDbPrompt()"></label>
                    <label><span>Zorluk Seviyesi</span>
                        <select id="pb-difficulty" onchange="updateDbPrompt()">
                            <option>Başlangıç (Junior)</option>
                            <option selected>Orta (Mid-Level)</option>
                            <option>İleri (Senior)</option>
                            <option>Uzman (Expert/Executive)</option>
                        </select>
                    </label>
                    <label><span>Vaka Çözüm Süresi</span><select id="pb-duration" onchange="updateDbPrompt()"><option>15 Dk</option><option>30 Dk</option><option selected>60 Dk</option><option>90 Dk</option></select></label>
                </div>
                
                <div style="margin-top:20px; padding-top:20px; border-top:1px solid var(--border);">
                    <h3>Özel Beceriler ve Yetkinlikler (Manuel Ekle)</h3>
                    <p class="muted">Listede olmayan spesifik yetkinlikleri aşağıya yazabilirsiniz.</p>
                    <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:10px;">
                        <input type="text" id="pb-custom-skills" placeholder="Örn: ISO 27001, Python, Agile..." style="flex:1; padding:10px; border-radius:6px; border:1px solid #ccc;">
                    </div>
                </div>

                <div class="prompt-output" style="margin-top:30px;">
                    <div class="prompt-output-head">
                        <h3>Oluşan Vaka Şablonu Özeti</h3>
                        <button class="primary" onclick="generateDbCase()">⚡ Sistemi Çalıştır & Vaka Üret</button>
                    </div>
                    <textarea id="generated-prompt" readonly style="height:120px; font-family:monospace; background:#f8fafc; font-size:12px;"></textarea>
                </div>
            </div>
            
            <div id="generated-case-card" class="card" hidden style="margin-top:20px;"></div>
        </section>\`, 'Formdan Vaka Yarat');
    };

    window.updateDbChain = function(level) {
        const sectorEl = document.getElementById('pb-sector');
        const subEl = document.getElementById('pb-subsector');
        const posEl = document.getElementById('pb-position');
        const depEl = document.getElementById('pb-department');
        const expEl = document.getElementById('pb-expertise');
        const certEl = document.getElementById('pb-certificate');
        
        const sector = sectorEl.value;
        const subsector = subEl.value;

        if(level === 'init') {
            sectorEl.innerHTML = '<option value="">Ana Sektör Seçiniz</option>' + Object.keys(DATABANK).map(s => \`<option value="\${s}">\${s}</option>\`).join('');
            subEl.disabled = true; posEl.disabled = true; depEl.disabled = true; expEl.disabled = true; certEl.disabled = true;
        }

        if(level === 'sector' && sector) {
            const subs = Object.keys(DATABANK[sector] || {});
            subEl.innerHTML = '<option value="">Alt Sektör Seçiniz</option>' + subs.map(s => \`<option value="\${s}">\${s}</option>\`).join('');
            subEl.disabled = false;
            posEl.disabled = true; depEl.disabled = true; expEl.disabled = true; certEl.disabled = true;
        }

        if(level === 'subsector' && sector && subsector) {
            const data = DATABANK[sector][subsector];
            posEl.innerHTML = '<option value="">Pozisyon Seçiniz</option>' + data.positions.map(s => \`<option value="\${s}">\${s}</option>\`).join('');
            depEl.innerHTML = data.departments.map(s => \`<option value="\${s}">\${s}</option>\`).join('');
            expEl.innerHTML = data.expertises.map(s => \`<option value="\${s}">\${s}</option>\`).join('');
            certEl.innerHTML = data.certificates.map(s => \`<option value="\${s}">\${s}</option>\`).join('');
            
            posEl.disabled = false; depEl.disabled = false; expEl.disabled = false; certEl.disabled = false;
        }
        
        updateDbPrompt();
    };

    window.updateDbPrompt = function() {
        const out = document.getElementById('generated-prompt');
        if(!out) return;
        
        const sector = document.getElementById('pb-sector')?.value || '{SEKTÖR}';
        const sub = document.getElementById('pb-subsector')?.value || '{ALT_SEKTÖR}';
        const position = document.getElementById('pb-position')?.value || '{POZISYON}';
        const departments = pvMulti('pb-department') || '{DEPARTMANLAR}';
        const expertises = pvMulti('pb-expertise') || '{UZMANLIKLAR}';
        const certs = pvMulti('pb-certificate') || '{SERTİFİKALAR}';
        const topic = document.getElementById('pb-topic')?.value || '{KONU}';
        const customSkills = document.getElementById('pb-custom-skills')?.value || '';

        out.value = \`SEKTÖR: \${sector} > \${sub}\\nPOZİSYON: \${position}\\nDEPARTMANLAR: \${departments}\\nUZMANLIKLAR: \${expertises}\\nSERTİFİKALAR: \${certs}\\nKONU: \${topic}\\nEK BİLGİ: \${customSkills}\`;
    };

    window.generateDbCase = async function() {
        const sector = document.getElementById('pb-sector')?.value;
        const sub = document.getElementById('pb-subsector')?.value;
        const position = document.getElementById('pb-position')?.value;
        const topic = document.getElementById('pb-topic')?.value;
        const diff = document.getElementById('pb-difficulty')?.value;
        
        if(!sector || !sub || !position || !topic) return toast('Lütfen Sektör, Alt Sektör, Pozisyon ve Tema/Konu giriniz.');
        
        const button = document.querySelector('.prompt-output-head .primary');
        const departments = pvMulti('pb-department');
        const expertises = pvMulti('pb-expertise');
        const certs = pvMulti('pb-certificate');
        const customSkills = document.getElementById('pb-custom-skills')?.value;

        const prompt = \`Türkçe, oldukça kısa, net ve yüksek teknik derinliğe sahip bir iş vakası üret. 
Sektör: \${sector} (\${sub})
Pozisyon: \${position}
Departmanlar: \${departments}
Gereken Uzmanlıklar: \${expertises}
Sahip Olunan Sertifikalar: \${certs}
Ek Yetkinlikler: \${customSkills}
Vaka Teması: \${topic}
Zorluk Seviyesi: \${diff}

Bu vaka, birden fazla uzmanlık alanını ve sertifika bilgisini aynı anda gerektiren karmaşık, teknik detaylarla dolu bir vaka olmalıdır. Çıktı sadece vaka metni (düz metin) olmalıdır.\`;

        aiBusy(button, true);
        try {
            const resultText = await aiCall(prompt);
            
            const card = document.getElementById('generated-case-card');
            card.hidden = false;
            card.innerHTML = \`<div class="case-card-head">
                <div><span class="eyebrow">AJAN 8 · VERİ BANKASI VAKASI</span><h2>\${position} · \${topic}</h2><p>\${sector} · \${sub} · \${diff}</p></div>
                <button class="icon-button" onclick="copyToClipboard(this)" title="Kopyala">📋</button>
            </div>
            <textarea style="width:100%; height:300px; padding:20px; border:none; background:transparent; font-size:1.1rem; line-height:1.6; resize:vertical; outline:none;" id="db-case-text">\${resultText.replace(/\\n/g, '\\n')}</textarea>
            <div class="case-card-actions">
                <button class="secondary" onclick="exportDoc('db-case-text')">Word İndir</button>
                <div style="flex:1"></div>
                <button class="primary" onclick="window.currentCaseSource = document.getElementById('db-case-text').value; go('questions')">Soru Üret & Test Hazırla →</button>
            </div>\`;
            
            window.currentCaseSource = resultText;
        } catch(e) {
            toast('Hata: ' + e.message);
        } finally {
            aiBusy(button, false);
        }
    };

    // Auto-init on Formdan Vaka Yarat page
    const oldRender14 = window.render;
    window.render = function() {
        oldRender14();
        if(state.page === 'prompt') {
            updateDbChain('init');
        }
    };
    
    // If currently on it
    if(state.page === 'prompt') {
        updateDbChain('init');
    }
})();
`;

let app = fs.readFileSync('dist/app.js', 'utf8');
if (!app.includes('PATCH 14: DATABANK')) {
    fs.writeFileSync('dist/patch14.js', patchCode14, 'utf8');
    app += '\n' + patchCode14;
    fs.writeFileSync('dist/app.js', app, 'utf8');
    console.log('Patch 14 injected successfully!');
}
