const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'dist', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');

console.log('Original dist/app.js length:', app.length);

// 1. In navigation, combine "Testler" and "Test Sonuçları" under "Test Yönetimi" into "Test Yönetimi & Sonuçları"
// Look at the current navigation block in dist/app.js
const currentNavRegex = /<summary><span class="nav-dot" style="background:#0ea5e9"><\/span><span>Test Yönetimi<\/span><\/summary>\s*<div>[\s\S]*?<\/details>/;

const unifiedNavBlock = `<summary><span class="nav-dot" style="background:#0ea5e9"></span><span>Test Yönetimi</span></summary>
            <div>
                <button class="\${(state.page==='tests'||state.page==='results')?'active':''}" onclick="go('tests')">Test Yönetimi & Sonuçları</button>
                <button class="\${state.page==='evaluation'?'active':''}" onclick="go('evaluation')">Test Değerlendirme</button>
                <button class="\${state.page==='test-platform'?'active':''}" onclick="go('test-platform')">Test Platformu</button>
            </div>
        </details>`;

if (app.match(currentNavRegex)) {
    app = app.replace(currentNavRegex, unifiedNavBlock);
    console.log('Navigation successfully updated to unified "Test Yönetimi & Sonuçları"!');
} else {
    console.log('Warning: currentNavRegex did not match directly, trying fallback replace');
    app = app.replace(
        /<summary><span class="nav-dot" style="background:#0ea5e9"><\/span><span>Test Yönetimi<\/span><\/summary>[\s\S]*?<\/div>\s*<\/details>/,
        unifiedNavBlock
    );
}

// 2. Also update patch15.cjs and dist/patch15.js for consistency
const patch15Path = path.join(__dirname, 'patch15.cjs');
if (fs.existsSync(patch15Path)) {
    let p15 = fs.readFileSync(patch15Path, 'utf8');
    p15 = p15.replace(
        /<summary><span class="nav-dot" style="background:#0ea5e9"><\/span><span>Test Yönetimi<\/span><\/summary>[\s\S]*?<\/div>\s*<\/details>/,
        unifiedNavBlock
    );
    fs.writeFileSync(patch15Path, p15, 'utf8');
    console.log('patch15.cjs updated.');
}

const distPatch15Path = path.join(__dirname, 'dist', 'patch15.js');
if (fs.existsSync(distPatch15Path)) {
    let dp15 = fs.readFileSync(distPatch15Path, 'utf8');
    dp15 = dp15.replace(
        /<summary><span class="nav-dot" style="background:#0ea5e9"><\/span><span>Test Yönetimi<\/span><\/summary>[\s\S]*?<\/div>\s*<\/details>/,
        unifiedNavBlock
    );
    fs.writeFileSync(distPatch15Path, dp15, 'utf8');
    console.log('dist/patch15.js updated.');
}

// 3. Append or replace PATCH 21: UNIFIED TEST YÖNETİMİ & SONUÇLARI
const patchCode21 = `
// ==========================================
// PATCH 21: BİRLEŞTİRİLMİŞ TEST YÖNETİMİ VE TEST SONUÇLARI SİSTEMİ
// ==========================================
(function() {
    // Paylaşılan filtre durumları
    state.resultQuery = state.resultQuery || '';
    state.resultDepartment = state.resultDepartment || '';
    state.resultScore = state.resultScore || '';
    state.resultOutcome = state.resultOutcome || '';
    state.unifiedTab = state.unifiedTab || 'results'; // 'results', 'metrics', 'logs', 'leaderboard', 'mcq'

    // Birebir senkronizasyonu sağla
    if (typeof window.syncTestPlatformWithManagement === 'function') {
        window.syncTestPlatformWithManagement();
    }

    // Birleştirilmiş Test Yönetimi & Sonuçları Sayfası
    window.unifiedTestManagementAndResultsPage = function() {
        if (typeof window.syncTestPlatformWithManagement === 'function') {
            window.syncTestPlatformWithManagement();
        }

        const activeTab = state.unifiedTab || 'results';

        // Filtreleme (candidateResults üzerinden)
        const filtered = candidateResults.filter(r => {
            const query = (state.resultQuery || '').toLowerCase();
            const matchesQuery = !query || 
                (r.name || '').toLowerCase().includes(query) ||
                (r.email || '').toLowerCase().includes(query) ||
                (r.test || '').toLowerCase().includes(query) ||
                (r.testId || '').toLowerCase().includes(query) ||
                (r.department || '').toLowerCase().includes(query);

            const matchesDept = !state.resultDepartment || (r.department && r.department.includes(state.resultDepartment));
            const matchesOutcome = !state.resultOutcome || r.outcome === state.resultOutcome;
            const matchesScore = !state.resultScore || (
                state.resultScore === '80+' ? r.score >= 80 :
                state.resultScore === '60-79' ? (r.score >= 60 && r.score < 80) :
                state.resultScore === '50-59' ? (r.score >= 50 && r.score < 60) :
                r.score < 50
            );

            return matchesQuery && matchesDept && matchesOutcome && matchesScore;
        });

        // Konsolide KPI İstatistikleri
        const totalCount = filtered.length;
        const avgScore = totalCount ? Math.round(filtered.reduce((a, r) => a + r.score, 0) / totalCount) : 0;
        const highScoreCount = filtered.filter(r => r.score >= 80).length;
        const positiveCount = filtered.filter(r => r.outcome === 'Olumlu').length;
        const totalStepsCount = filtered.reduce((acc, r) => acc + (r.testSteps ? r.testSteps.length : 0), 0);

        // Departman listesi
        const deptList = unique(candidateResults.map(r => r.department).filter(Boolean));

        // 1. Tab: Aday Test Sonuçları & Koşumlar Tablosu
        const rowsHtml = filtered.map((r, i) => {
            const globalIndex = candidateResults.indexOf(r);
            const scoreClass = r.score >= 80 ? 'positive' : r.score >= 50 ? 'pending' : 'negative';
            const scoreText = r.score >= 80 ? 'Yüksek Skor' : r.score >= 50 ? 'Beklenebilir' : 'Yetkin Olmayan';
            const posSteps = (r.testSteps || []).filter(s => s.status === 'positive').length;
            const totalSteps = (r.testSteps || []).length;

            return \`
            <tr style="border-bottom: 1px solid #e2e8f0; vertical-align: top;">
                <td style="padding: 16px 12px;">
                    <b style="display:block; font-size:15px; color:#0f172a; margin-bottom:3px;">\${safeText(r.name)}</b>
                    <span style="color:#64748b; font-size:12px;">\${safeText(r.email)}</span>
                    <br><code style="font-size:11px; color:#0284c7; background:#e0f2fe; padding:2px 6px; border-radius:4px;">\${r.testId || ('TST-' + (84900+globalIndex))}</code>
                </td>
                <td style="padding: 16px 12px; max-width: 250px;">
                    <b style="display:block; font-size:14px; color:#1e293b; margin-bottom:3px;">\${safeText(r.test)}</b>
                    <span style="color:#64748b; font-size:12px; line-height: 1.4; display:block;">\${safeText(r.department)}</span>
                    <small style="color:#94a3b8;">\${safeText(r.detail || '')}</small>
                </td>
                <td style="padding: 16px 12px; text-align: center;">
                    <b style="display:block; font-size:16px; color:#0f172a; margin-bottom:4px;">%\${r.score}</b>
                    <span style="display:inline-block; padding:3px 10px; border-radius:14px; font-size:11px; font-weight:700; \${r.score < 50 ? 'background:#fee2e2; color:#b91c1c;' : r.score >= 80 ? 'background:#dcfce3; color:#15803d;' : 'background:#fef3c7; color:#b45309;'}">\${scoreText}</span>
                    <br><small style="color:#64748b; font-size:11px;">\${posSteps}/\${totalSteps} Doğru Adım</small>
                </td>
                <td style="padding: 16px 12px; max-width: 320px;">
                    <div style="background:\${r.outcome==='Olumlu'?'#f0fdf4':'#fef2f2'}; border:1px solid \${r.outcome==='Olumlu'?'#bbf7d0':'#fecaca'}; border-radius:10px; padding:10px 14px; font-size:12px; line-height:1.5;">
                        <b style="color:\${r.outcome==='Olumlu'?'#166534':'#991b1b'}; display:block; margin-bottom:4px;">
                            \${r.outcome === 'Olumlu' ? '✅ Olumlu Sonuç' : '⚠️ Geliştirilmeli (Eğitim Önerilir)'}
                        </b>
                        <p style="margin:0; color:#334155; font-size:11.5px;">\${safeText(r.summary)}</p>
                    </div>
                </td>
                <td style="padding: 16px 12px; color:#64748b; font-size:12px; white-space:nowrap;">
                    <b>\${r.date}</b><br><span style="color:#94a3b8;">\${r.time}</span>
                </td>
                <td style="padding: 16px 12px;">
                    <div class="row-actions" style="display:flex; flex-direction:column; gap:5px; min-width:140px;">
                        <button class="primary" style="padding:6px 12px; font-size:12px; font-weight:700;" onclick="showCandidateReport(\${globalIndex})">📊 Detaylı Rapor</button>
                        <button class="secondary" style="padding:5px 10px; font-size:12px;" onclick="openTestStepInspectionModal(\${globalIndex})" title="Adımları ve Parametreleri İncele">📋 Adımları İncele</button>
                        <div style="display:flex; gap:4px;">
                            <button class="secondary" style="padding:4px 8px; font-size:11px; flex:1;" onclick="showArchivePrompt('\${safeText(r.name)}', \${r.score})">📦 Sakla</button>
                            <button class="secondary" style="padding:4px 8px; font-size:11px; flex:1;" onclick="toast('Test sonuçları e-posta ile gönderildi.')">✉ İlet</button>
                            <button class="danger-button" style="padding:4px 8px; font-size:11px;" onclick="deleteResult(this)" title="Kaydı Sil">✕</button>
                        </div>
                    </div>
                </td>
            </tr>\`;
        }).join('');

        // 2. Tab: Süreç Metrikleri & Analiz Paneli
        const metricsHtml = \`
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:20px; margin-top:20px;">
            <div class="card" style="padding:22px; border-radius:14px; background:white; border:1px solid #e2e8f0;">
                <h3 style="margin:0 0 8px; color:#0f172a; font-size:16px;">📊 Başarı Skoru Dağılımı</h3>
                <p style="color:#64748b; font-size:13px; margin:0 0 16px;">Platformda tamamlanan \${candidateResults.length} testin yetkinlik aralıkları.</p>
                <div style="display:flex; flex-direction:column; gap:12px;">
                    <div>
                        <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px;">
                            <span>%80 ve üzeri (Üst Düzey Yetkin)</span>
                            <b style="color:#10b981;">\${candidateResults.filter(r => r.score >= 80).length} Aday</b>
                        </div>
                        <div style="height:8px; background:#e2e8f0; border-radius:4px; overflow:hidden;"><div style="width:\${candidateResults.length ? (candidateResults.filter(r=>r.score>=80).length/candidateResults.length*100) : 0}%; height:100%; background:#10b981;"></div></div>
                    </div>
                    <div>
                        <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px;">
                            <span>%50 - %79 (Operasyonel Yeterli)</span>
                            <b style="color:#f59e0b;">\${candidateResults.filter(r => r.score >= 50 && r.score < 80).length} Aday</b>
                        </div>
                        <div style="height:8px; background:#e2e8f0; border-radius:4px; overflow:hidden;"><div style="width:\${candidateResults.length ? (candidateResults.filter(r=>r.score>=50&&r.score<80).length/candidateResults.length*100) : 0}%; height:100%; background:#f59e0b;"></div></div>
                    </div>
                    <div>
                        <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:4px;">
                            <span>%50 altı (Eğitim & Mentörlük)</span>
                            <b style="color:#ef4444;">\${candidateResults.filter(r => r.score < 50).length} Aday</b>
                        </div>
                        <div style="height:8px; background:#e2e8f0; border-radius:4px; overflow:hidden;"><div style="width:\${candidateResults.length ? (candidateResults.filter(r=>r.score<50).length/candidateResults.length*100) : 0}%; height:100%; background:#ef4444;"></div></div>
                    </div>
                </div>
            </div>

            <div class="card" style="padding:22px; border-radius:14px; background:white; border:1px solid #e2e8f0;">
                <h3 style="margin:0 0 8px; color:#0f172a; font-size:16px;">⚡ Soru Hızı ve Refleks Analizi</h3>
                <p style="color:#64748b; font-size:13px; margin:0 0 16px;">Adayların vaka kriz adımlarında harcadığı ortalama analitik süre.</p>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; text-align:center;">
                    <div style="background:#f8fafc; padding:15px; border-radius:10px; border:1px solid #e2e8f0;">
                        <span style="font-size:12px; color:#64748b;">Ortalama Adım Süresi</span>
                        <h2 style="margin:5px 0 0; color:#0284c7; font-size:24px;">35 sn</h2>
                    </div>
                    <div style="background:#f8fafc; padding:15px; border-radius:10px; border:1px solid #e2e8f0;">
                        <span style="font-size:12px; color:#64748b;">Tamamlanma Oranı</span>
                        <h2 style="margin:5px 0 0; color:#10b981; font-size:24px;">%100</h2>
                    </div>
                </div>
                <p style="margin-top:15px; font-size:12.5px; color:#475569; line-height:1.5;">
                    💡 <b>AI Değerlendirmesi:</b> Adayların karar süreleri ve kök neden refleksleri endüstri kıyaslamasıyla tam uyumludur.
                </p>
            </div>
        </div>
        \`;

        // 3. Tab: Sistem & Oturum Logları (Audit Logs)
        const allLogs = [];
        candidateResults.forEach(r => {
            (r.logs || []).forEach(l => {
                allLogs.push({ ...l, testId: r.testId, candidate: r.name });
            });
        });
        const logsHtml = \`
        <div style="background:#0f172a; color:#f8fafc; border-radius:14px; padding:20px; font-family:monospace; font-size:12.5px; line-height:1.8; margin-top:20px; max-height:500px; overflow-y:auto;">
            \${allLogs.map(l => \`
                <div style="border-bottom:1px solid #1e293b; padding:8px 0; display:flex; justify-content:space-between; gap:15px; flex-wrap:wrap;">
                    <span><span style="color:#38bdf8;">[\${l.timestamp}]</span> <b style="color:#a855f7;">[\${l.testId}]</b> <b style="color:#e2e8f0;">\${l.event}:</b> \${l.details}</span>
                    <span style="color:#94a3b8;">\${l.candidate} (\${l.actor})</span>
                </div>
            \`).join('') || '<div style="color:#94a3b8;">Kayıtlı sistem logu bulunamadı.</div>'}
        </div>
        \`;

        // 4. Tab: Aday Sıralaması (Leaderboard)
        const sorted = [...candidateResults].sort((a,b) => b.score - a.score);
        const leaderboardRows = sorted.map((r, i) => \`<tr>
            <td><b style="font-size:16px;">\${i+1}.</b></td>
            <td><code>\${r.testId}</code></td>
            <td><b>\${safeText(r.name)}</b><br><small style="color:var(--text-muted);">\${safeText(r.email)}</small></td>
            <td>\${safeText(r.test)}</td>
            <td><b class="candidate-score" style="color:\${r.score>=60?'#16a34a':'#dc2626'}">%\${r.score}</b></td>
            <td>\${r.outcome}</td>
            <td><div class="row-actions">
                <button class="primary" onclick="showArchivePrompt('\${safeText(r.name)}', \${r.score})">Testi Sakla (Arşivle)</button>
            </div></td>
        </tr>\`).join('');
        const leaderboardHtml = \`
        <div class="table-wrap candidate-table" style="margin-top:20px;">
            <table>
                <thead><tr><th>Sıra</th><th>Test ID</th><th>Aday Bilgisi</th><th>Çözülen Test</th><th>Skor</th><th>Durum</th><th>İşlemler</th></tr></thead>
                <tbody>\${leaderboardRows || '<tr><td colspan="7" class="empty">Henüz aday bulunmuyor.</td></tr>'}</tbody>
            </table>
        </div>
        \`;

        // 5. Tab: Standart MCQ Kütüphanesi
        const mcqRows = tests.map(t => \`<tr>
            <td data-editable><b>\${t.name}</b><br><span style="color:var(--muted)">\${t.sector}</span></td>
            <td data-editable>\${badge(t.level)}</td>
            <td data-editable><b>\${t.q}</b></td>
            <td data-editable>\${t.source}</td>
            <td data-editable>\${t.date}</td>
            <td data-editable><b>\${t.uses}</b> kez</td>
            <td><span class="rate-pill">%\${t.answered ? Math.round(t.correct / t.answered * 100) : 0}</span></td>
            <td>
                <div class="row-actions">
                    <button class="primary" onclick="state.pendingCase='\${t.name}'; prepareMcqFromCase(10);">Testi Başlat</button>
                </div>
            </td>
        </tr>\`).join('');
        const mcqHtml = \`
        <div class="table-wrap test-table" style="margin-top:20px;">
            <table>
                <thead><tr><th>Test / Pozisyon</th><th>Zorluk</th><th>Soru</th><th>Kaynak</th><th>Tarih</th><th>Kullanım</th><th>Başarı</th><th>İşlem</th></tr></thead>
                <tbody>\${mcqRows}</tbody>
            </table>
        </div>
        \`;

        // Ana HTML Şablonu
        return layout(\`
        <section class="results-head" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:15px; margin-bottom:15px;">
            <div>
                <span class="eyebrow" style="background:#e0f2fe; color:#0369a1; padding:4px 10px; border-radius:6px; font-weight:700; font-size:12px;">BİRLEŞİK TEST KONSOLU</span>
                <h2 style="margin:6px 0 2px 0; font-size:26px; color:#0f172a;">Test Yönetimi & Sonuçları</h2>
                <p style="margin:0; color:var(--text-muted); font-size:14px;">Aday test sonuçları, AI detaylı raporları, test senaryoları, adım analizleri ve metriklerin birleşik yönetim merkezi.</p>
            </div>
            <div style="display:flex; gap:10px; align-items:center;">
                <span style="background:#ecfdf5; color:#059669; border:1px solid #a7f3d0; padding:8px 16px; border-radius:20px; font-size:13px; font-weight:700; display:flex; align-items:center; gap:8px;">
                    <span style="display:inline-block; width:9px; height:9px; border-radius:50%; background:#10b981;"></span>
                    Test Platformu ile Birebir Senkronize
                </span>
                <button class="primary" onclick="openTestBuilder()">+ Yeni Test Oluştur</button>
                <button class="secondary dark-button" onclick="go('dashboard')">Pano</button>
            </div>
        </section>

        <!-- Konsolide KPI Kartları -->
        <div class="result-kpis" style="margin-top:15px;">
            <article>
                <span>Toplam Çözülen Test</span>
                <b style="color:#0f172a;">\${totalCount} Aday</b>
                <small>Platformdan aktarılan</small>
            </article>
            <article>
                <span>Ortalama Başarı</span>
                <b class="blue-score" style="color:#0284c7;">%\${avgScore}</b>
                <small>Genel başarı ortalaması</small>
            </article>
            <article>
                <span>Yüksek Skor (%80+)</span>
                <b class="green-score" style="color:#10b981;">\${highScoreCount} Aday</b>
                <small>Üstün yetkinlik</small>
            </article>
            <article>
                <span>Olumlu Sonuç (Öneri)</span>
                <b class="purple-score" style="color:#7c3aed;">\${positiveCount} Aday</b>
                <small>Pozisyona uygun</small>
            </article>
        </div>

        <!-- Sekmeler (Tabs) -->
        <div style="display:flex; gap:8px; border-bottom:2px solid #e2e8f0; margin-top:25px; padding-bottom:1px; overflow-x:auto;">
            <button onclick="state.unifiedTab='results'; render();" style="padding:10px 18px; border:none; background:transparent; font-weight:700; cursor:pointer; font-size:14px; border-bottom:3px solid \${activeTab==='results'?'#0ea5e9':'transparent'}; color:\${activeTab==='results'?'#0ea5e9':'var(--text-muted)'};">
                📊 Aday Test Sonuçları & Koşumlar (\${filtered.length})
            </button>
            <button onclick="state.unifiedTab='metrics'; render();" style="padding:10px 18px; border:none; background:transparent; font-weight:700; cursor:pointer; font-size:14px; border-bottom:3px solid \${activeTab==='metrics'?'#0ea5e9':'transparent'}; color:\${activeTab==='metrics'?'#0ea5e9':'var(--text-muted)'};">
                📈 Süreç Metrikleri & Analiz
            </button>
            <button onclick="state.unifiedTab='logs'; render();" style="padding:10px 18px; border:none; background:transparent; font-weight:700; cursor:pointer; font-size:14px; border-bottom:3px solid \${activeTab==='logs'?'#0ea5e9':'transparent'}; color:\${activeTab==='logs'?'#0ea5e9':'var(--text-muted)'};">
                📜 İşlem & Oturum Logları
            </button>
            <button onclick="state.unifiedTab='leaderboard'; render();" style="padding:10px 18px; border:none; background:transparent; font-weight:700; cursor:pointer; font-size:14px; border-bottom:3px solid \${activeTab==='leaderboard'?'#0ea5e9':'transparent'}; color:\${activeTab==='leaderboard'?'#0ea5e9':'var(--text-muted)'};">
                🏆 Aday Sıralaması
            </button>
            <button onclick="state.unifiedTab='mcq'; render();" style="padding:10px 18px; border:none; background:transparent; font-weight:700; cursor:pointer; font-size:14px; border-bottom:3px solid \${activeTab==='mcq'?'#0ea5e9':'transparent'}; color:\${activeTab==='mcq'?'#0ea5e9':'var(--text-muted)'};">
                🧩 MCQ Test Şablonları (\${tests.length})
            </button>
        </div>

        \${activeTab === 'results' ? \`
            <!-- Arama & Filtre Çubuğu -->
            <div class="result-filters" style="margin-top:20px; display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
                <label style="flex:2; min-width:200px;">
                    <span>Arama</span>
                    <input class="search" placeholder="Test ID, aday adı, e-posta veya test..." value="\${state.resultQuery}" oninput="state.resultQuery=this.value; render();">
                </label>
                <label style="flex:1; min-width:140px;">
                    <span>Departman</span>
                    <select onchange="state.resultDepartment=this.value; render();">
                        <option value="">Tümü</option>
                        \${deptList.map(v => \`<option \${state.resultDepartment===v?'selected':''}>\${v}</option>\`).join('')}
                    </select>
                </label>
                <label style="flex:1; min-width:140px;">
                    <span>Skor Aralığı</span>
                    <select onchange="state.resultScore=this.value; render();">
                        <option value="">Tümü</option>
                        <option value="80+" \${state.resultScore==='80+'?'selected':''}>%80 ve üzeri</option>
                        <option value="60-79" \${state.resultScore==='60-79'?'selected':''}>%60–79</option>
                        <option value="50-59" \${state.resultScore==='50-59'?'selected':''}>%50–59</option>
                        <option value="0-49" \${state.resultScore==='0-49'?'selected':''}>%0–49</option>
                    </select>
                </label>
                <label style="flex:1; min-width:140px;">
                    <span>Değerlendirme</span>
                    <select onchange="state.resultOutcome=this.value; render();">
                        <option value="">Tümü</option>
                        <option value="Olumlu" \${state.resultOutcome==='Olumlu'?'selected':''}>Olumlu</option>
                        <option value="Geliştirilmeli" \${state.resultOutcome==='Geliştirilmeli'?'selected':''}>Geliştirilmeli</option>
                    </select>
                </label>
                <button class="secondary" style="height:42px; margin-top:18px;" onclick="state.resultQuery=''; state.resultDepartment=''; state.resultScore=''; state.resultOutcome=''; render();">Filtreleri Temizle</button>
            </div>

            <!-- Tablo -->
            <div class="table-wrap candidate-table" style="margin-top:20px;">
                <table>
                    <thead>
                        <tr>
                            <th>Aday Bilgisi & ID</th>
                            <th>Çözülen Test & Rol</th>
                            <th>Skor & Adımlar</th>
                            <th>Değerlendirme Özeti</th>
                            <th>Tarih</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        \${rowsHtml || '<tr><td colspan="6" class="empty">Filtrelere uygun aday veya test sonucu bulunamadı.</td></tr>'}
                    </tbody>
                </table>
            </div>
        \` : activeTab === 'metrics' ? metricsHtml : activeTab === 'logs' ? logsHtml : activeTab === 'leaderboard' ? leaderboardHtml : mcqHtml}
        \`, 'Test Yönetimi & Sonuçları');
    };

    // Hem testsPage hem resultsPage artık bu birleştirilmiş konsola bağlanır
    window.testsPage = window.unifiedTestManagementAndResultsPage;
    window.resultsPage = window.unifiedTestManagementAndResultsPage;

    console.log('PATCH 21: Test Yönetimi ve Test Sonuçları başarıyla birleştirildi.');
})();
`;

// Inject PATCH 21
if (!app.includes('PATCH 21: BİRLEŞTİRİLMİŞ TEST YÖNETİMİ VE TEST SONUÇLARI SİSTEMİ')) {
    app += '\n' + patchCode21;
    fs.writeFileSync(appPath, app, 'utf8');
    console.log('PATCH 21 appended to dist/app.js!');
} else {
    const p21Start = app.indexOf('// PATCH 21: BİRLEŞTİRİLMİŞ TEST YÖNETİMİ VE TEST SONUÇLARI SİSTEMİ');
    if (p21Start !== -1) {
        app = app.substring(0, p21Start) + patchCode21;
        fs.writeFileSync(appPath, app, 'utf8');
        console.log('PATCH 21 updated in dist/app.js!');
    }
}

// 4. Update index.html version
const indexPath = path.join(__dirname, 'dist', 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');
const vMatch = indexHtml.match(/app\.js\?v=(\d+)/);
if (vMatch) {
    const nextV = parseInt(vMatch[1], 10) + 1;
    indexHtml = indexHtml.replace(/app\.js\?v=\d+/, 'app.js?v=' + nextV);
    fs.writeFileSync(indexPath, indexHtml, 'utf8');
    console.log('index.html updated with version v=' + nextV);
}

console.log('UNIFICATION PATCH COMPLETE!');
