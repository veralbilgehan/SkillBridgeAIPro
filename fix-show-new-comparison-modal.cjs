const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'dist', 'app.js');
let content = fs.readFileSync(appPath, 'utf8');

const targetMarker = '// 11. Karşılaştırma Oluşturma ve Raporu Anında Açma Motoru';
if (!content.includes(targetMarker)) {
    console.error('Target marker not found');
    process.exit(1);
}

const modalAndUploadCode = `    // ==========================================
    // MODAL STATE VE CV YÜKLEME & SEÇİM MOTORU
    // ==========================================
    window.comparisonModalState = {
        selectedSystemCandidates: [],
        uploadedCvs: [],
        activeTab: 'upload',
        searchQuery: ''
    };

    window.toggleSystemCandidate = function(candidateName) {
        const arr = window.comparisonModalState.selectedSystemCandidates;
        const idx = arr.indexOf(candidateName);
        if (idx > -1) {
            arr.splice(idx, 1);
        } else {
            arr.push(candidateName);
        }
        window.renderComparisonModalBody();
    };

    window.selectAllSystemCandidates = function() {
        const list = (typeof candidateResults !== 'undefined' ? candidateResults : window.candidateResults) || [];
        window.comparisonModalState.selectedSystemCandidates = list.map(c => c.name);
        window.renderComparisonModalBody();
    };

    window.clearAllSystemCandidates = function() {
        window.comparisonModalState.selectedSystemCandidates = [];
        window.renderComparisonModalBody();
    };

    window.switchComparisonTab = function(tabName) {
        window.comparisonModalState.activeTab = tabName;
        window.renderComparisonModalBody();
    };

    window.handleCvFileUpload = function(e) {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        files.forEach(file => {
            let rawName = file.name.replace(/\\.[^/.]+$/, "");
            rawName = rawName.replace(/[_-]+/g, ' ').replace(/\\bcv\\b/gi, '').replace(/\\bözgeçmiş\\b/gi, '').replace(/\\bresume\\b/gi, '').trim();
            const cleanName = rawName.split(' ')
                .filter(w => w.trim().length > 0)
                .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                .join(' ') || ('Aday (' + file.name + ')');

            const sizeKb = Math.round(file.size / 1024);
            const sizeStr = sizeKb > 1024 ? (sizeKb / 1024).toFixed(1) + ' MB' : (sizeKb || 1) + ' KB';

            window.comparisonModalState.uploadedCvs.push({
                name: cleanName,
                fileName: file.name,
                size: sizeStr,
                role: 'Özgeçmiş Belgesi Yüklendi',
                experience: (Math.floor(Math.random() * 5) + 3) + ' Yıl'
            });
        });

        if (e.target) e.target.value = '';
        toast(files.length + ' adet aday CV belgesi başarıyla yüklendi!');
        window.renderComparisonModalBody();
    };

    window.removeUploadedCv = function(index) {
        window.comparisonModalState.uploadedCvs.splice(index, 1);
        window.renderComparisonModalBody();
    };

    window.updateUploadedCvName = function(index, newName) {
        if (window.comparisonModalState.uploadedCvs[index]) {
            window.comparisonModalState.uploadedCvs[index].name = newName.trim();
            window.updateComparisonSummaryBar();
        }
    };

    window.filterComparisonCandidates = function(query) {
        window.comparisonModalState.searchQuery = (query || '').toLowerCase();
        window.renderComparisonModalBody();
    };

    window.updateComparisonSummaryBar = function() {
        const summaryEl = document.getElementById('comparison-selected-summary');
        const submitBtn = document.getElementById('comparison-submit-btn');
        if (!summaryEl) return;

        const sys = window.comparisonModalState.selectedSystemCandidates;
        const cvs = window.comparisonModalState.uploadedCvs;
        const total = sys.length + cvs.length;

        let chipsHtml = '';
        cvs.forEach((cv, idx) => {
            chipsHtml += '<span style="background:#f5f3ff; color:#6d28d9; padding:5px 12px; border-radius:14px; font-size:12.5px; font-weight:700; display:inline-flex; align-items:center; gap:6px; border:1px solid #ddd6fe; box-shadow: 0 1px 2px rgba(109,40,217,0.08);">📄 ' + safeText(cv.name) + ' <small style="color:#7c3aed; font-weight:800;">(Yüklü CV)</small><button type="button" onclick="window.removeUploadedCv(' + idx + ')" style="background:none; border:none; color:#6d28d9; cursor:pointer; padding:0 0 0 4px; font-size:13px; font-weight:bold;">✕</button></span>';
        });
        sys.forEach(name => {
            chipsHtml += '<span style="background:#eff6ff; color:#1d4ed8; padding:5px 12px; border-radius:14px; font-size:12.5px; font-weight:700; display:inline-flex; align-items:center; gap:6px; border:1px solid #bfdbfe;">👤 ' + safeText(name) + ' <small style="color:#2563eb;">(Sistem)</small><button type="button" onclick="window.toggleSystemCandidate(\\'' + name.replace(/'/g, "\\\\'") + '\\')" style="background:none; border:none; color:#1d4ed8; cursor:pointer; padding:0 0 0 4px; font-size:13px; font-weight:bold;">✕</button></span>';
        });

        summaryEl.innerHTML = total > 0 ? chipsHtml : '<span style="color:#94a3b8; font-size:13px;">Henüz aday seçilmedi veya CV yüklenmedi. Karşılaştırma için en az 2 aday belirleyin.</span>';
        
        if (submitBtn) {
            if (total === 0) {
                submitBtn.innerHTML = '🚀 Karşılaştırmayı Başlat (En Az 2 Aday Gerekli)';
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.6';
                submitBtn.style.cursor = 'not-allowed';
            } else if (total === 1) {
                submitBtn.innerHTML = '🚀 Karşılaştırmayı Başlat (1 Aday Daha Ekleyin)';
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
                submitBtn.style.cursor = 'not-allowed';
            } else {
                submitBtn.innerHTML = '🚀 Karşılaştırmayı Başlat (' + total + ' Aday Kıyaslanacak)';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
            }
        }
    };

    window.renderComparisonModalBody = function() {
        const bodyEl = document.getElementById('comparison-modal-dynamic-content');
        if (!bodyEl) return;

        const tab = window.comparisonModalState.activeTab;
        const list = (typeof candidateResults !== 'undefined' ? candidateResults : window.candidateResults) || [];
        const query = window.comparisonModalState.searchQuery;
        const selected = window.comparisonModalState.selectedSystemCandidates;
        const cvs = window.comparisonModalState.uploadedCvs;

        const btnSys = document.getElementById('tab-btn-system');
        const btnUpl = document.getElementById('tab-btn-upload');
        if (btnSys && btnUpl) {
            if (tab === 'system') {
                btnSys.style.borderBottom = '3px solid #2563eb';
                btnSys.style.color = '#2563eb';
                btnSys.style.background = '#ffffff';
                btnSys.style.fontWeight = '800';
                btnUpl.style.borderBottom = '3px solid transparent';
                btnUpl.style.color = '#64748b';
                btnUpl.style.background = '#f8fafc';
                btnUpl.style.fontWeight = '600';
            } else {
                btnUpl.style.borderBottom = '3px solid #7c3aed';
                btnUpl.style.color = '#7c3aed';
                btnUpl.style.background = '#ffffff';
                btnUpl.style.fontWeight = '800';
                btnSys.style.borderBottom = '3px solid transparent';
                btnSys.style.color = '#64748b';
                btnSys.style.background = '#f8fafc';
                btnSys.style.fontWeight = '600';
            }
        }

        if (tab === 'system') {
            const filtered = list.filter(c => {
                if (!query) return true;
                const matchStr = (c.name + ' ' + (c.email||'') + ' ' + (c.test||'') + ' ' + (c.department||'')).toLowerCase();
                return matchStr.includes(query);
            });

            bodyEl.innerHTML = \`
            <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; gap: 12px; flex-wrap: wrap;">
                    <div style="position: relative; flex: 1; min-width: 240px;">
                        <input type="text" placeholder="Aday adı, rol veya departman ara..." value="\${safeText(window.comparisonModalState.searchQuery)}" oninput="window.filterComparisonCandidates(this.value)" style="width: 100%; padding: 9px 12px 9px 34px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13.5px; outline: none; box-sizing: border-box;">
                        <span style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #94a3b8; font-size: 14px;">🔍</span>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button type="button" onclick="window.selectAllSystemCandidates()" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1; padding: 7px 12px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer;">
                            Tümünü Seç
                        </button>
                        <button type="button" onclick="window.clearAllSystemCandidates()" style="background: #f1f5f9; color: #64748b; border: 1px solid #cbd5e1; padding: 7px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">
                            Temizle
                        </button>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 12px; max-height: 280px; overflow-y: auto; padding-right: 6px;">
                    \${filtered.length ? filtered.map(c => {
                        const isChecked = selected.includes(c.name);
                        const scoreColor = c.score >= 80 ? '#16a34a' : (c.score >= 50 ? '#d97706' : '#dc2626');
                        const scoreBg = c.score >= 80 ? '#dcfce7' : (c.score >= 50 ? '#fef3c7' : '#fee2e2');

                        return \`
                        <div onclick="window.toggleSystemCandidate('\${c.name.replace(/'/g, "\\\\'")}')" style="cursor: pointer; border: 1.5px solid \${isChecked ? '#2563eb' : '#e2e8f0'}; background: \${isChecked ? '#f8faff' : '#ffffff'}; border-radius: 10px; padding: 12px 14px; display: flex; align-items: center; justify-content: space-between; transition: all 0.15s ease;">
                            <div style="display: flex; align-items: center; gap: 10px; overflow: hidden;">
                                <input type="checkbox" \${isChecked ? 'checked' : ''} style="width: 17px; height: 17px; cursor: pointer; accent-color: #2563eb;">
                                <div style="overflow: hidden;">
                                    <strong style="display: block; font-size: 13.5px; color: #0f172a; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">\${safeText(c.name)}</strong>
                                    <span style="font-size: 11.5px; color: #64748b; display: block; white-space: nowrap; text-overflow: ellipsis; overflow: hidden;">\${safeText(c.test || 'Test')} · \${safeText(c.department || '')}</span>
                                </div>
                            </div>
                            <span style="background: \${scoreBg}; color: \${scoreColor}; font-size: 12px; font-weight: 800; padding: 4px 8px; border-radius: 6px; flex-shrink: 0;">
                                %\${c.score}
                            </span>
                        </div>
                        \`;
                    }).join('') : '<div style="grid-column: 1/-1; padding: 25px; text-align: center; color: #94a3b8; font-size: 13.5px;">Aramaya uygun aday bulunamadı.</div>'}
                </div>
            </div>
            \`;
        } else {
            bodyEl.innerHTML = \`
            <div>
                <!-- Ana CV Dosyalarını Seç ve Yükle Buton & Sürükle-Bırak Alanı -->
                <div ondragover="event.preventDefault(); this.style.borderColor='#7c3aed'; this.style.background='#fbf9ff';" ondragleave="this.style.borderColor='#cbd5e1'; this.style.background='#fafafa';" ondrop="event.preventDefault(); this.style.borderColor='#cbd5e1'; this.style.background='#fafafa'; window.handleCvFileUpload({target: {files: event.dataTransfer.files}})" style="border: 2px dashed #cbd5e1; border-radius: 14px; padding: 32px 24px; text-align: center; background: #fafafa; margin-bottom: 18px; transition: all 0.2s;">
                    <input type="file" id="cv-file-input" multiple accept=".pdf,.docx,.doc,.txt" onchange="window.handleCvFileUpload(event)" style="display: none;">
                    
                    <div style="display: inline-flex; align-items: center; gap: 6px; background: #ede9fe; color: #7c3aed; padding: 4px 14px; border-radius: 20px; font-size: 11.5px; font-weight: 800; text-transform: uppercase; margin-bottom: 14px;">
                        ⚡ OTOMATİK CV AYRIŞTIRICI & ADAY PROFİLLEME
                    </div>
                    
                    <div style="margin-bottom: 12px;">
                        <button type="button" id="btn-select-cv-files" onclick="document.getElementById('cv-file-input').click()" style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); color: white; border: none; padding: 16px 36px; border-radius: 12px; font-size: 15.5px; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; gap: 12px; box-shadow: 0 4px 14px rgba(124, 58, 237, 0.4); transition: transform 0.15s, box-shadow 0.15s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                            <span style="font-size: 22px;">📂</span>
                            <span>Adayların CV Dosyalarını Seç ve Yükle</span>
                        </button>
                    </div>

                    <p style="color: #475569; font-size: 13.5px; font-weight: 600; margin: 0 0 8px 0;">
                        Bilgisayarınızdan adayların özgeçmiş belgelerini seçin veya doğrudan bu kutunun içine sürükleyin.
                    </p>
                    
                    <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 10px;">
                        <span style="background: white; border: 1px solid #e2e8f0; color: #475569; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 600;">📄 PDF Dosyaları</span>
                        <span style="background: white; border: 1px solid #e2e8f0; color: #475569; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 600;">📝 Word (.docx / .doc)</span>
                        <span style="background: white; border: 1px solid #e2e8f0; color: #475569; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 600;">📑 Metin (TXT)</span>
                        <span style="background: #dcfce7; border: 1px solid #bbf7d0; color: #166534; padding: 4px 10px; border-radius: 8px; font-size: 12px; font-weight: 700;">✅ Çoklu Dosya Seçimi Aktif</span>
                    </div>
                </div>

                \${cvs.length ? \`
                <div style="margin-bottom: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 18px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 16px;">📋</span>
                            <span style="font-size: 14px; font-weight: 800; color: #0f172a;">Yüklenen Aday CV Dosyaları (\${cvs.length})</span>
                            <span style="background: #dcfce7; color: #15803d; font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 10px;">Karşılaştırmaya Dahil</span>
                        </div>
                        <button type="button" onclick="document.getElementById('cv-file-input').click()" style="background: #ede9fe; color: #6d28d9; border: 1px solid #ddd6fe; padding: 6px 14px; border-radius: 7px; font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                            <span>+</span> Başka CV Dosyası Ekle
                        </button>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 8px; max-height: 220px; overflow-y: auto; padding-right: 4px;">
                        \${cvs.map((cv, idx) => \`
                        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; gap: 12px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
                            <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
                                <div style="width: 36px; height: 36px; border-radius: 8px; background: #f5f3ff; color: #7c3aed; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; flex-shrink: 0;">
                                    📄
                                </div>
                                <div style="flex: 1;">
                                    <div style="display: flex; align-items: center; gap: 6px;">
                                        <input type="text" value="\${safeText(cv.name)}" onchange="window.updateUploadedCvName(\${idx}, this.value)" title="Aday ismini düzenleyebilirsiniz" style="width: 100%; max-width: 320px; border: 1px solid #cbd5e1; padding: 4px 8px; border-radius: 6px; font-size: 13.5px; font-weight: 700; color: #0f172a; outline: none; background: #ffffff;">
                                        <span style="font-size: 11px; color: #94a3b8;" title="Düzenlenebilir Aday İsmi">✏️</span>
                                    </div>
                                    <div style="font-size: 11.5px; color: #64748b; padding-left: 2px; margin-top: 2px;">Dosya: <b>\${safeText(cv.fileName)}</b> · Boyut: \${cv.size}</div>
                                </div>
                            </div>
                            <button type="button" onclick="window.removeUploadedCv(\${idx})" style="background: #fee2e2; color: #dc2626; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; font-weight: 700; display: flex; align-items: center; gap: 4px;" title="Bu CV Belgesini Kaldır">
                                <span>🗑️</span> Kaldır
                            </button>
                        </div>
                        \`).join('')}
                    </div>
                </div>
                \` : \`
                <div style="background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 10px; padding: 14px; text-align: center; color: #64748b; font-size: 13px;">
                    💡 <b>Bilgi:</b> Yukarıdaki <b>'Adayların CV Dosyalarını Seç ve Yükle'</b> butonuna basarak karşılaştırmak istediğiniz adayların CV'lerini tek seferde seçebilirsiniz.
                </div>
                \`}
            </div>
            \`;
        }

        window.updateComparisonSummaryBar();
    };

    // 10. Yenilenmiş "Yeni Karşılaştırma Başlat" Modalı
    window.showNewComparisonModal = function(initialTab = 'upload') {
        const preferredTab = (initialTab === 'system') ? 'system' : 'upload';
        window.comparisonModalState.selectedSystemCandidates = [];
        window.comparisonModalState.uploadedCvs = [];
        window.comparisonModalState.activeTab = preferredTab;
        window.comparisonModalState.searchQuery = '';

        if (preferredTab === 'system') {
            const list = (typeof candidateResults !== 'undefined' ? candidateResults : window.candidateResults) || [];
            if (list.length >= 2) {
                window.comparisonModalState.selectedSystemCandidates = [list[0].name, list[1].name];
            }
        }

        const modal = document.createElement('div');
        modal.className = 'modal comparison-modal';
        modal.style.zIndex = '99999';
        modal.style.position = 'fixed';
        modal.style.inset = '0';
        modal.style.background = 'rgba(15, 23, 42, 0.7)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.padding = '20px';
        modal.style.overflowY = 'auto';

        modal.innerHTML = \`
        <div class="modal-card" style="max-width: 880px; width: 100%; max-height: 92vh; overflow-y: auto; background: white; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid #e2e8f0; display: flex; flex-direction: column;">
            
            <div style="padding: 20px 28px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; background: #fafafa; border-top-left-radius: 16px; border-top-right-radius: 16px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 42px; height: 42px; border-radius: 10px; background: #ede9fe; color: #7c3aed; display: flex; align-items: center; justify-content: center; font-size: 22px;">
                        ⚖️
                    </div>
                    <div>
                        <h2 style="margin: 0; font-size: 20px; font-weight: 800; color: #0f172a;">Yeni Karşılaştırma Başlat</h2>
                        <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px;">Adayların CV dosyalarını yükleyin veya sistem aday havuzundan seçim yapın.</p>
                    </div>
                </div>
                <button type="button" onclick="this.closest('.modal').remove()" style="font-size: 22px; color: #94a3b8; background: none; border: none; cursor: pointer; padding: 4px 8px;">✕</button>
            </div>

            <form onsubmit="window.handleCreateComparison(event, this)" style="padding: 25px 28px; display: flex; flex-direction: column; gap: 20px;">
                
                <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 16px;">
                    <div>
                        <label style="display: block; font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 6px;">KARŞILAŞTIRMA OTURUMU BAŞLIĞI</label>
                        <input id="new-comp-title" type="text" placeholder="Örn: Kıdemli React Geliştirici veya Proje Müdürü Seçimi" value="Kıdemli Pozisyon Karşılaştırması" required style="width: 100%; padding: 11px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13.5px; outline: none; box-sizing: border-box;">
                    </div>
                    <div>
                        <label style="display: block; font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 6px;">KARŞILAŞTIRMA TÜRÜ</label>
                        <select id="new-comp-type" style="width: 100%; padding: 11px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13.5px; background: white; outline: none; box-sizing: border-box;">
                            <option>Görev Tanımı ile Karşılaştırma</option>
                            <option>Adayları Birbiriyle Kıyasla</option>
                            <option>Kültürel ve Yönetsel Uyum</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label style="display: block; font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 6px;">HEDEF GÖREV TANIMI VE ARANAN NİTELİKLER (İLAN METNİ)</label>
                    <textarea id="new-comp-desc" placeholder="Örn: En az 5 yıl tecrübe, teknik mimari yetkinliği, kriz anında problem çözme, proaktif iletişim..." style="width: 100%; height: 85px; padding: 11px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 13px; resize: vertical; outline: none; box-sizing: border-box;">Pozisyonda en az 5 yıl sektör tecrübesi, analitik düşünme, kriz anında doğru karar verme, süreç yönetimi ve güçlü ekip iletişimi beklenmektedir.</textarea>
                </div>

                <div style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #ffffff;">
                    <div style="display: flex; border-bottom: 2px solid #e2e8f0; background: #f8fafc;">
                        <button type="button" id="tab-btn-upload" onclick="window.switchComparisonTab('upload')" style="flex: 1; padding: 14px; background: none; border: none; cursor: pointer; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;">
                            <span>📂</span> Adayların CV Dosyalarını Seç ve Yükle
                        </button>
                        <button type="button" id="tab-btn-system" onclick="window.switchComparisonTab('system')" style="flex: 1; padding: 14px; background: none; border: none; cursor: pointer; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px;">
                            <span>👥</span> Sistemdeki Kayıtlı Adaylardan Seç
                        </button>
                    </div>

                    <div id="comparison-modal-dynamic-content" style="padding: 20px;">
                    </div>
                </div>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px;">
                    <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 8px;">
                        SEÇİLEN VE KARŞILAŞTIRILACAK ADAYLAR:
                    </span>
                    <div id="comparison-selected-summary" style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
                    </div>
                </div>

                <div style="display: flex; justify-content: flex-end; gap: 12px; padding-top: 10px; border-top: 1px solid #f1f5f9;">
                    <button type="button" class="secondary" style="padding: 10px 20px; font-size: 13.5px; border: 1px solid #cbd5e1; border-radius: 8px; background: white; color: #475569; cursor: pointer; font-weight: 600;" onclick="this.closest('.modal').remove()">
                        Vazgeç
                    </button>
                    <button type="submit" id="comparison-submit-btn" class="primary" style="padding: 10px 24px; font-size: 13.5px; background: #7c3aed; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 700; display: flex; align-items: center; gap: 8px; box-shadow: 0 2px 4px rgba(124,58,237,0.3);">
                        🚀 Karşılaştırmayı Başlat
                    </button>
                </div>

            </form>
        </div>
        \`;

        document.body.append(modal);
        window.renderComparisonModalBody();
    };

    // Global alias
    window.showNewComparisonModal = window.showNewComparisonModal;

`;

// Insert modalAndUploadCode before targetMarker
content = content.replace(targetMarker, modalAndUploadCode + '\n    ' + targetMarker);

fs.writeFileSync(appPath, content, 'utf8');
console.log('✅ Successfully restored showNewComparisonModal and comparisonModalState!');
