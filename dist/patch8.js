(function() {
    if (window.candidateResults) {
        window.candidateResults.unshift({
            name: 'Mustafa akca',
            email: 'mustafa.akca@bigsafer.com',
            test: 'CEO',
            department: 'Hava yolu taşımacılığı: Aletli uçuş (IFR) ve pilotaj yönetimi, uçuş planlama ve ağırlık-denge (weight & balance) hesaplaması (Dispatcher), uçak aviyonik ve gövde/motor (B1/B2) bakım-revizyonu, yer hizmetleri APRON ramp koordinasyonu. / Havacılık ve Hava Taşımacılığı',
            detail: 'Havacılık ve Hava Taşımacılığı',
            score: 20,
            outcome: 'Geliştirilmeli',
            date: '19.09.2026',
            time: '00:05:10',
            summary: 'Geliştirilmeli (Uygun Değil). Adayın "Kaptan / Pilot Operasyonları - Teknik" yetkinliğindeki %20\'lik başarı skoru, CEO pozisyonunun gerektirdiği kritik teknik anlayış, problem çözme derinliği ve stratejik liderlik seviyesinin oldukça altında kalmaktadır. Havacılık gibi yüksek riskli bir sektörde CEO\'nun operasyonel ve teknik sorunlara yaklaşımındaki bu eksiklikler, şirketin güvenliği, finansal istikrarı ve itibarı açısından ciddi riskler taşımaktadır.',
            detailedReport: [
                {question: 'Kriz anında ilk olarak ne yaparsınız?', answer: 'Beklerim.', status: 'negative', seconds: 12},
                {question: 'Takım içi çatışmayı nasıl çözersiniz?', answer: 'Bilmiyorum.', status: 'negative', seconds: 8}
            ]
        });
    }

    window.resultsPage = function() {
        const filtered = candidateResults.filter(r => 
            (r.name+r.email+r.test).toLowerCase().includes(state.resultQuery.toLowerCase()) && 
            (!state.resultDepartment || r.department.includes(state.resultDepartment)) && 
            (!state.resultOutcome || r.outcome === state.resultOutcome) && 
            (!state.resultScore || (state.resultScore === '80+' ? r.score >= 80 : state.resultScore === '60-79' ? r.score >= 60 && r.score < 80 : state.resultScore === '50-59' ? r.score >= 50 && r.score < 60 : r.score < 50))
        );
        
        const avg = filtered.length ? Math.round(filtered.reduce((a,r) => a + r.score, 0) / filtered.length) : 0;
        const high = filtered.filter(r => r.score >= 80).length;
        const positive = filtered.filter(r => r.outcome === 'Olumlu').length;
        
        const rows = filtered.map(r => {
            const index = candidateResults.indexOf(r);
            const scoreClass = r.score >= 80 ? 'positive' : r.score >= 50 ? 'pending' : 'negative';
            const scoreText = r.score >= 80 ? 'Yüksek Skor' : r.score >= 50 ? 'Beklenebilir' : 'Yetkin Olmayan';
            
            return `
            <tr style="border-bottom: 1px solid #e2e8f0; vertical-align: top;">
                <td style="padding: 20px 15px;">
                    <b style="display:block; font-size:15px; color:#0f172a; margin-bottom:4px;">${r.name}</b>
                    <span style="color:#64748b; font-size:13px;">${r.email}</span>
                </td>
                <td style="padding: 20px 15px; max-width: 300px;">
                    <b style="display:block; font-size:14px; color:#1e293b; margin-bottom:4px;">${r.test}</b>
                    <span style="color:#64748b; font-size:12px; line-height: 1.4; display:block;">${r.department}</span>
                </td>
                <td style="padding: 20px 15px; text-align: center;">
                    <b style="display:block; font-size:16px; color:#0f172a; margin-bottom:8px;">%${r.score}</b>
                    <span style="display:inline-block; padding:4px 12px; border-radius:20px; font-size:11px; font-weight:700; ${r.score < 50 ? 'background:#fee2e2; color:#b91c1c;' : r.score >= 80 ? 'background:#dcfce3; color:#15803d;' : 'background:#fef3c7; color:#b45309;'}">${scoreText}</span>
                </td>
                <td style="padding: 20px 15px;">
                    <div style="background:#f3e8ff; border:1px solid #e9d5ff; border-radius:24px; padding:15px 20px; color:#7e22ce; font-size:13px; font-weight:600; line-height:1.5; text-align:center;">
                        ${r.summary}
                    </div>
                </td>
                <td style="padding: 20px 15px; color:#64748b; font-size:13px;">
                    ${r.date}<br>${r.time}
                </td>
                <td style="padding: 20px 15px; white-space: nowrap;">
                    <button style="background:#e0e7ff; color:#4338ca; border:none; padding:8px 16px; border-radius:6px; font-size:13px; font-weight:600; cursor:pointer; margin-right:8px;" onclick="showReportView(${index})">Detaylı Rapor 📊</button>
                    <button style="background:transparent; color:#ef4444; border:none; font-size:13px; font-weight:600; cursor:pointer;" onclick="deleteResult(this)">Sil ❌</button>
                </td>
            </tr>`;
        }).join('');

        let html = `
        <div style="padding: 0 20px 20px 20px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 25px;">
                <div>
                    <h2 style="font-size: 28px; color: #0f172a; margin: 0 0 5px 0;">Aday Test Sonuçları</h2>
                    <p style="color: #64748b; margin: 0; font-size: 15px;">Sistemdeki tüm test çözümlerine ait AI detaylı raporları ve yetkinlik skorları.</p>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button style="background: #1e293b; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer;" onclick="go('dashboard')">Pano Anasayfası</button>
                    <button style="background: #f59e0b; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer;">📋 Hazır Testler & Atama</button>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px;">
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                    <span style="font-size: 12px; font-weight: 700; color: #64748b; display: block; margin-bottom: 5px;">TOPLAM ÇÖZÜLEN</span>
                    <strong style="font-size: 28px; color: #0f172a;">${candidateResults.length} Test</strong>
                </div>
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                    <span style="font-size: 12px; font-weight: 700; color: #64748b; display: block; margin-bottom: 5px;">ORTALAMA BAŞARI</span>
                    <strong style="font-size: 28px; color: #3b82f6;">%${avg}</strong>
                </div>
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                    <span style="font-size: 12px; font-weight: 700; color: #64748b; display: block; margin-bottom: 5px;">YÜKSEK SKOR (%80+)</span>
                    <strong style="font-size: 28px; color: #22c55e;">${high} Aday</strong>
                </div>
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                    <span style="font-size: 12px; font-weight: 700; color: #64748b; display: block; margin-bottom: 5px;">OLUMLU SONUÇ (ÖNERİ)</span>
                    <strong style="font-size: 28px; color: #a855f7;">${positive} Aday</strong>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 15px; margin-bottom: 25px;">
                <div>
                    <label style="font-size: 11px; font-weight: 700; color: #64748b; display: block; margin-bottom: 5px;">ARAMA</label>
                    <input type="text" placeholder="Aday Adı, E-posta veya Test..." value="${state.resultQuery}" oninput="state.resultQuery=this.value; render()" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; box-sizing: border-box;">
                </div>
                <div>
                    <label style="font-size: 11px; font-weight: 700; color: #64748b; display: block; margin-bottom: 5px;">DEPARTMAN</label>
                    <select onchange="state.resultDepartment=this.value; render()" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; box-sizing: border-box; background: white;">
                        <option value="">Tümü</option>
                        <option ${state.resultDepartment==='AR-GE'?'selected':''}>AR-GE</option>
                        <option ${state.resultDepartment==='Proje Yönetimi'?'selected':''}>Proje Yönetimi</option>
                    </select>
                </div>
                <div>
                    <label style="font-size: 11px; font-weight: 700; color: #64748b; display: block; margin-bottom: 5px;">SKOR ARALIĞI</label>
                    <select onchange="state.resultScore=this.value; render()" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; box-sizing: border-box; background: white;">
                        <option value="">Tümü</option>
                        <option value="80+" ${state.resultScore==='80+'?'selected':''}>80 ve üzeri</option>
                        <option value="60-79" ${state.resultScore==='60-79'?'selected':''}>60 - 79</option>
                        <option value="50-59" ${state.resultScore==='50-59'?'selected':''}>50 - 59</option>
                        <option value="<50" ${state.resultScore==='<50'?'selected':''}>50 altı</option>
                    </select>
                </div>
                <div>
                    <label style="font-size: 11px; font-weight: 700; color: #64748b; display: block; margin-bottom: 5px;">DEĞERLENDİRME SONUCU</label>
                    <select onchange="state.resultOutcome=this.value; render()" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 14px; outline: none; box-sizing: border-box; background: white;">
                        <option value="">Tümü</option>
                        <option ${state.resultOutcome==='Olumlu'?'selected':''}>Olumlu</option>
                        <option ${state.resultOutcome==='Geliştirilmeli'?'selected':''}>Geliştirilmeli</option>
                    </select>
                </div>
            </div>

            <div style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                <table style="width: 100%; border-collapse: collapse; text-align: left;">
                    <thead style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                        <tr>
                            <th style="padding: 15px; font-size: 12px; font-weight: 700; color: #64748b;">ADAY / İLETİŞİM</th>
                            <th style="padding: 15px; font-size: 12px; font-weight: 700; color: #64748b;">ÇÖZÜLEN TEST</th>
                            <th style="padding: 15px; font-size: 12px; font-weight: 700; color: #64748b; text-align: center;">SKOR (AJAN 5)</th>
                            <th style="padding: 15px; font-size: 12px; font-weight: 700; color: #64748b; text-align: center;">DEĞERLENDİRME SONUCU</th>
                            <th style="padding: 15px; font-size: 12px; font-weight: 700; color: #64748b;">TARİH</th>
                            <th style="padding: 15px; font-size: 12px; font-weight: 700; color: #64748b;">İŞLEMLER</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.length ? rows : '<tr><td colspan="6" style="padding:40px; text-align:center; color:#64748b;">Kayıt bulunamadı.</td></tr>'}
                    </tbody>
                </table>
            </div>
        </div>`;
        return layout(html, 'Aday Test Sonuçları');
    };

    window.showReportView = function(index) {
        state.page = 'report_detail';
        state.reportIndex = index;
        render();
    };

    window.reportDetailPage = function() {
        const r = candidateResults[state.reportIndex];
        if (!r) { go('results'); return ''; }

        const scoreColor = r.score >= 80 ? '#22c55e' : r.score >= 50 ? '#f59e0b' : '#ef4444';
        const badgeColor = r.score >= 80 ? '#dcfce3' : r.score >= 50 ? '#fef3c7' : '#fee2e2';
        const badgeTextColor = r.score >= 80 ? '#15803d' : r.score >= 50 ? '#b45309' : '#b91c1c';
        const scoreText = r.score >= 80 ? 'Yüksek Skor' : r.score >= 50 ? 'Beklenebilir' : 'Yetkin Olmayan';

        let html = `
        <div style="background: #0f172a; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b;">
            <button onclick="go('results')" style="background: transparent; border: none; color: white; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 20px;">←</span> ${r.name.split(' ')[0]} ${r.name.split(' ').slice(1).join(' ').toLowerCase()}
            </button>
            <button style="background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                🖨️ Yazdır / PDF
            </button>
        </div>

        <div style="padding: 30px; background: #f8fafc; min-height: calc(100vh - 120px);">
            <!-- Top Card -->
            <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 40px; display: flex; gap: 40px; align-items: center; margin-bottom: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                
                <div style="flex: 0 0 300px;">
                    <h1 style="margin: 0 0 5px 0; font-size: 32px; color: #0f172a;">${r.name}</h1>
                    <p style="margin: 0 0 20px 0; color: #64748b; font-size: 16px;">${r.email}</p>
                    
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <div style="background: #f1f5f9; padding: 8px 16px; border-radius: 20px; font-size: 13px; color: #334155; display: inline-block; width: max-content;">Sektör: ${r.detail}</div>
                        <div style="background: #f1f5f9; padding: 8px 16px; border-radius: 20px; font-size: 13px; color: #334155; display: inline-block; width: max-content;">Rol: ${r.test}</div>
                    </div>
                </div>

                <div style="flex: 0 0 150px; text-align: center; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; padding: 0 20px;">
                    <span style="font-size: 12px; font-weight: 700; color: #64748b; display: block; margin-bottom: 10px;">GENEL SKOR</span>
                    <strong style="font-size: 64px; color: #0f172a; line-height: 1; display: block; margin-bottom: 15px;">%${r.score}</strong>
                    <span style="display: inline-block; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; background: ${badgeColor}; color: ${badgeTextColor};">${scoreText}</span>
                </div>

                <div style="flex: 1; padding-left: 20px;">
                    <span style="font-size: 12px; font-weight: 700; color: #64748b; display: block; margin-bottom: 15px; text-align: center;">DEĞERLENDİRME SONUCU</span>
                    <p style="font-size: 22px; font-weight: 700; color: #4ade80; text-align: center; line-height: 1.4; margin: 0;">${r.summary}</p>
                </div>

            </div>

            <!-- Radar Section -->
            <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px;">
                    <div>
                        <h2 style="margin: 0 0 5px 0; font-size: 20px; color: #0f172a;">Yetkinlik Ölçüm & Radar Analizi</h2>
                        <p style="margin: 0; color: #64748b; font-size: 14px;">Kategori bazlı radar grafik ve hedef & mevcut durum analizi</p>
                    </div>
                    <div style="display: flex; gap: 5px;">
                        <button style="background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">Genel Özet</button>
                        <button style="background: transparent; color: #64748b; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">BİLİŞSEL</button>
                        <button style="background: transparent; color: #64748b; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">TEKNİK</button>
                        <button style="background: transparent; color: #64748b; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">TEMEL</button>
                        <button style="background: transparent; color: #64748b; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">YÖNETSEL</button>
                        <button style="background: transparent; color: #64748b; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">FONKSİYONEL</button>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 40px;">
                    <!-- Left: Radar Placeholder -->
                    <div style="background: #f8fafc; border-radius: 12px; padding: 20px; text-align: center; border: 1px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px;">
                        <h3 style="margin: 0 0 20px 0; font-size: 14px; color: #0f172a;">Kategori Bazlı Genel Özet</h3>
                        
                        <!-- Simple CSS Radar Mock -->
                        <div style="position: relative; width: 200px; height: 200px;">
                            <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; overflow: visible;">
                                <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="#cbd5e1" stroke-width="1"/>
                                <polygon points="50,15 85,32 85,68 50,85 15,68 15,32" fill="none" stroke="#e2e8f0" stroke-width="1"/>
                                <polygon points="50,25 75,40 75,60 50,75 25,60 25,40" fill="none" stroke="#e2e8f0" stroke-width="1"/>
                                <line x1="50" y1="50" x2="50" y2="5" stroke="#cbd5e1" stroke-width="1"/>
                                <line x1="50" y1="50" x2="95" y2="25" stroke="#cbd5e1" stroke-width="1"/>
                                <line x1="50" y1="50" x2="95" y2="75" stroke="#cbd5e1" stroke-width="1"/>
                                <line x1="50" y1="50" x2="50" y2="95" stroke="#cbd5e1" stroke-width="1"/>
                                <line x1="50" y1="50" x2="5" y2="75" stroke="#cbd5e1" stroke-width="1"/>
                                <line x1="50" y1="50" x2="5" y2="25" stroke="#cbd5e1" stroke-width="1"/>
                                
                                <!-- Data Polygon (Dynamic based on score) -->
                                <polygon points="50,${100 - r.score*0.8} ${50 + r.score*0.3},${50 - r.score*0.2} ${50 + r.score*0.4},${50 + r.score*0.2} 50,${50 + r.score*0.4} ${50 - r.score*0.2},${50 + r.score*0.3} ${50 - r.score*0.4},${50 - r.score*0.1}" fill="rgba(79, 70, 229, 0.2)" stroke="#4f46e5" stroke-width="2"/>
                            </svg>
                            <span style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 10px; color: #64748b;">BİLİŞSEL</span>
                            <span style="position: absolute; top: 20%; right: -30px; font-size: 10px; color: #64748b;">TEKNİK</span>
                            <span style="position: absolute; bottom: 20%; right: -30px; font-size: 10px; color: #64748b;">TEMEL</span>
                            <span style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); font-size: 10px; color: #64748b;">YÖNETSEL</span>
                            <span style="position: absolute; bottom: 20%; left: -40px; font-size: 10px; color: #64748b;">FONKSİYONEL</span>
                            <span style="position: absolute; top: 20%; left: -30px; font-size: 10px; color: #64748b;">DİĞER</span>
                        </div>
                    </div>

                    <!-- Right: Progress Bars -->
                    <div>
                        <h3 style="margin: 0 0 20px 0; font-size: 14px; color: #0f172a;">Tüm Ölçülen Yetkinlikler</h3>
                        
                        <div style="margin-bottom: 25px;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 8px;">
                                <div>
                                    <strong style="font-size: 14px; color: #0f172a;">Captain / Pilot Operations - Technical</strong>
                                    <span style="font-size: 10px; font-weight: 700; color: #3b82f6; margin-left: 8px;">TEMEL</span>
                                </div>
                                <div style="font-size: 12px; font-weight: 700;">
                                    <span style="color: #4f46e5;">Mevcut: %${r.score}</span>
                                    <span style="color: #94a3b8; margin-left: 10px;">Hedef: %60</span>
                                </div>
                            </div>
                            <div style="height: 6px; background: #e2e8f0; border-radius: 3px; position: relative; width: 100%;">
                                <div style="position: absolute; top: 0; left: 0; height: 100%; width: ${r.score}%; background: #e11d48; border-radius: 3px;"></div>
                                <div style="position: absolute; top: -2px; left: 60%; height: 10px; width: 2px; background: #ef4444;"></div>
                            </div>
                        </div>

                        <div style="margin-bottom: 25px;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 8px;">
                                <div>
                                    <strong style="font-size: 14px; color: #0f172a;">Stratejik Liderlik ve Problem Çözme</strong>
                                    <span style="font-size: 10px; font-weight: 700; color: #8b5cf6; margin-left: 8px;">YÖNETSEL</span>
                                </div>
                                <div style="font-size: 12px; font-weight: 700;">
                                    <span style="color: #4f46e5;">Mevcut: %${Math.min(r.score + 15, 100)}</span>
                                    <span style="color: #94a3b8; margin-left: 10px;">Hedef: %70</span>
                                </div>
                            </div>
                            <div style="height: 6px; background: #e2e8f0; border-radius: 3px; position: relative; width: 100%;">
                                <div style="position: absolute; top: 0; left: 0; height: 100%; width: ${Math.min(r.score + 15, 100)}%; background: ${Math.min(r.score + 15, 100) >= 70 ? '#22c55e' : '#f59e0b'}; border-radius: 3px;"></div>
                                <div style="position: absolute; top: -2px; left: 70%; height: 10px; width: 2px; background: #ef4444;"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            ${r.detailedReport && r.detailedReport.length > 0 ? `
            <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-top: 30px;">
                <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #0f172a;">Detaylı Soru & Cevap Analizi</h2>
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    ${r.detailedReport.map((q, idx) => `
                        <div style="background:#f8fafc; padding:20px; border-radius:12px; border: 1px solid #e2e8f0;">
                            <strong style="color:#0f172a; display:block; margin-bottom:10px; font-size: 15px;">Soru ${idx+1}: ${q.question}</strong>
                            <p style="margin:0 0 15px 0; color:#334155; font-size:14px; line-height: 1.5;"><strong>Adayın Cevabı:</strong> ${q.answer || '<em style="color:#94a3b8">Boş bırakılmış</em>'}</p>
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <span style="display:inline-block; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:700; 
                                    ${q.status==='positive'?'background:#dcfce3;color:#16a34a;':(q.status==='negative'?'background:#fee2e2;color:#dc2626;':'background:#e2e8f0;color:#64748b;')}">
                                    ${q.status==='positive'?'✅ Olumlu / Doğru':(q.status==='negative'?'❌ Olumsuz / Yanlış':'⚪ Boş')}
                                </span>
                                <span style="font-size:12px; color:#64748b; font-weight: 600;">🕒 ${q.seconds} saniye</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

        </div>
        `;
        
        return layout(html, 'Detaylı Rapor - ' + r.name);
    };

    const originalRender6 = window.render;
    window.render = function() {
        if(state.page === 'report_detail') {
            const appEl = document.getElementById('app');
            if(appEl) {
                // Remove layout rendering if requested, but for now we just use layout
                // Since reportDetailPage calls layout() internally, we just innerHTML it.
                appEl.innerHTML = window.reportDetailPage();
            }
        } else {
            originalRender6();
        }
    };
})();
