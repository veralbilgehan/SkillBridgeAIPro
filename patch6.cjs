const fs = require('fs');
let c = fs.readFileSync('dist/app.js', 'utf8');

// Replace nav text
c = c.replace(/Karşılaştırma ve Zihin Kontrolü/gi, 'Karşılaştırma');
c = c.replace(/Karşılaştırma ve zihin kontrolü/gi, 'Karşılaştırma');

const patchCode = `
(function(){
    window.comparisonPage = function() {
        return layout(\`
        <section class="comparison-page" style="padding: 20px;">
            <div class="prompt-head" style="margin-bottom: 30px;">
                <div>
                    <span class="eyebrow">YAPAY ZEKA İLE</span>
                    <h2>Karşılaştırma</h2>
                    <p>Adayların CV'lerini, mülakat performanslarını veya test sonuçlarını birbiriyle veya bir belgeyle (görev tanımı vb.) kıyaslayın.</p>
                </div>
                <button class="primary" onclick="showNewComparisonModal()">Yeni Karşılaştırma Başlat</button>
            </div>

            <section class="generated-case-card" style="padding: 0;">
                <div style="padding: 20px; border-bottom: 1px solid #e2e8f0;">
                    <h3 style="margin: 0; color: #0f172a; font-size: 16px;">Karşılaştırma Oturumları</h3>
                </div>
                <div class="table-wrap">
                    <table style="width: 100%; text-align: left; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                                <th style="padding: 12px 20px; color: #64748b; font-size: 12px; font-weight: 600;">OTURUM BAŞLIĞI</th>
                                <th style="padding: 12px 20px; color: #64748b; font-size: 12px; font-weight: 600;">TÜRÜ</th>
                                <th style="padding: 12px 20px; color: #64748b; font-size: 12px; font-weight: 600;">ADAY SAYISI</th>
                                <th style="padding: 12px 20px; color: #64748b; font-size: 12px; font-weight: 600;">TARİH</th>
                                <th style="padding: 12px 20px; color: #64748b; font-size: 12px; font-weight: 600;">DURUM</th>
                                <th style="padding: 12px 20px;"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid #e2e8f0;">
                                <td style="padding: 16px 20px; font-weight: 500; color: #0f172a;">Kıdemli React Geliştirici Seçimi</td>
                                <td style="padding: 16px 20px; color: #475569;">Görev Tanımı ile Karşılaştırma</td>
                                <td style="padding: 16px 20px; color: #475569;">4 Aday</td>
                                <td style="padding: 16px 20px; color: #475569;">12.09.2026</td>
                                <td style="padding: 16px 20px;"><span style="display:inline-block; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold; background:#dcfce3; color:#16a34a;">Tamamlandı</span></td>
                                <td style="padding: 16px 20px; text-align: right;"><button class="secondary" style="padding: 6px 12px; font-size: 12px;" onclick="toast('Rapor yükleniyor...')">Raporu Gör</button></td>
                            </tr>
                            <tr>
                                <td style="padding: 16px 20px; font-weight: 500; color: #0f172a;">Finans Müdürü Terfisi</td>
                                <td style="padding: 16px 20px; color: #475569;">Adayları Birbiriyle Kıyasla</td>
                                <td style="padding: 16px 20px; color: #475569;">2 Aday</td>
                                <td style="padding: 16px 20px; color: #475569;">15.09.2026</td>
                                <td style="padding: 16px 20px;"><span style="display:inline-block; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold; background:#fef08a; color:#a16207;">İnceleniyor</span></td>
                                <td style="padding: 16px 20px; text-align: right;"><button class="secondary" style="padding: 6px 12px; font-size: 12px; opacity: 0.5;" disabled>Raporu Gör</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </section>
        \`, 'Karşılaştırma');
    };

    window.showNewComparisonModal = function() {
        const modal = document.createElement('div');
        modal.className = 'modal comparison-modal';
        modal.style.zIndex = '9999';
        modal.innerHTML = \`
        <div class="modal-card" style="max-width: 800px; padding: 0; overflow: hidden; background: white; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
            <div class="modal-head" style="padding: 20px 30px; border-bottom: 0;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span style="background: #e0e7ff; color: #4f46e5; padding: 8px; border-radius: 8px; display: flex;">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
                    </span>
                    <h2 style="margin: 0; font-size: 22px; font-weight: 700; color: #0f172a;">Yeni Karşılaştırma Başlat</h2>
                </div>
                <button type="button" onclick="this.closest('.modal').remove()" style="font-size: 24px; color: #94a3b8; background: none; border: none; cursor: pointer; padding: 0;">✕</button>
            </div>
            
            <div class="tabs" style="display: flex; border-bottom: 2px solid #e2e8f0; margin: 0 30px 25px 30px;">
                <button style="flex: 1; padding: 15px; background: none; border: none; border-bottom: 2px solid transparent; color: #64748b; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 15px;" onclick="toast('Davetiye modu yakında eklenecek')">
                    <span>✉️</span> Davetiye ile Karşılaştır
                </button>
                <button style="flex: 1; padding: 15px; background: none; border: none; border-bottom: 2px solid #9333ea; color: #9333ea; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 15px;">
                    <span>📁</span> Belgelerle Doğrudan Karşılaştır
                </button>
            </div>

            <div style="padding: 0 30px;">
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 25px;">
                    <div>
                        <label style="display: block; font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 8px;">KARŞILAŞTIRMA OTURUMU BAŞLIĞI</label>
                        <input type="text" placeholder="Örn: Kıdemli React Geliştirici Seçimi veya Finans Müdürü Terfisi" style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; outline: none; box-sizing: border-box;">
                    </div>
                    <div>
                        <label style="display: block; font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 8px;">KARŞILAŞTIRMA TÜRÜ</label>
                        <select style="width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; background: white; outline: none; box-sizing: border-box;">
                            <option>Yetenek ve Yetkinlik Değer...</option>
                            <option>Sadece Kültürel Uyum</option>
                        </select>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                    <div>
                        <label style="display: block; font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 8px;">1. GÖREV TANIMI VE ARANAN NİTELİKLER (METİN)</label>
                        <textarea placeholder="Örn:&#10;- En az 5 yıl React ve TypeScript tecrübesi olan..." style="width: 100%; height: 160px; padding: 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; resize: none; outline: none; box-sizing: border-box;"></textarea>
                    </div>
                    <div>
                        <label style="display: block; font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 8px;">1. VEYA GÖREV TANIMI BELGESİ YÜKLEYİN</label>
                        <div style="border: 2px dashed #e2e8f0; border-radius: 8px; height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; cursor: pointer; background: #fafafa; box-sizing: border-box;" onclick="toast('Dosya yükleme penceresi açılıyor')">
                            <span style="font-size: 28px; margin-bottom: 10px;">📥</span>
                            <strong style="color: #475569; display: block; margin-bottom: 5px; font-size: 14px;">Dosya Sürükleyin veya Seçin</strong>
                            <span style="color: #94a3b8; font-size: 12px;">PDF, DOCX, TXT (Maks 10MB)</span>
                        </div>
                    </div>
                </div>

                <div style="margin-bottom: 30px;">
                    <label style="display: block; font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 8px;">2. ADAY CV BELGELERİNİ YÜKLEYİN</label>
                    <div style="border: 2px dashed #e2e8f0; border-radius: 8px; padding: 30px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; cursor: pointer; background: #fafafa; box-sizing: border-box;" onclick="toast('Çoklu dosya yükleme penceresi açılıyor')">
                        <span style="font-size: 36px; margin-bottom: 15px;">🗂️</span>
                        <strong style="color: #475569; display: block; margin-bottom: 8px; font-size: 15px;">Çoklu Aday Belgelerini Sürükleyin veya Seçin</strong>
                        <span style="color: #94a3b8; font-size: 13px;">Birden fazla PDF, DOCX, TXT seçebilirsiniz</span>
                    </div>
                </div>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 15px; padding: 20px 30px; border-top: 1px solid #e2e8f0; background: white; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px;">
                <button class="secondary" style="padding: 10px 20px; font-size: 14px; border: 1px solid #e2e8f0; border-radius: 6px; background: white; color: #475569; cursor: pointer; font-weight: 600;" onclick="this.closest('.modal').remove()">Vazgeç</button>
                <button class="primary" style="padding: 10px 20px; font-size: 14px; background: #9333ea; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;" onclick="toast('Karşılaştırma başlatılıyor...'); this.closest('.modal').remove()">Yükle ve Doğrudan Karşılaştır 🚀</button>
            </div>
        </div>
        \`;
        document.body.append(modal);
    };
})();
`;

c += '\n' + patchCode + '\n';
fs.writeFileSync('dist/app.js', c, 'utf8');
console.log('Applied patch6 for comparison page.');
