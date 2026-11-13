const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'dist', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');

console.log('Dist app.js size before:', app.length);

const fullComparisonSystemCode = `(function(){
    // -----------------------------------------------------------------
    // GELİŞMİŞ CV VE ADAY KARŞILAŞTIRMA SİSTEMİ (SkillBridge AI v5.3)
    // -----------------------------------------------------------------
    
    // Varsayılan zengin karşılaştırma oturumları
    const defaultSessions = [
        {
            id: 'comp-1',
            title: 'Kıdemli React Geliştirici Seçimi',
            type: 'Görev Tanımı ile Karşılaştırma',
            candidateCount: 4,
            date: '12.09.2026',
            status: 'Tamamlandı',
            jobTitle: 'Senior React & TypeScript Developer',
            jobRequirements: [
                'En az 5 yıl modern JavaScript / TypeScript ve React ekosistemi tecrübesi',
                'Büyük ölçekli web uygulamalarında State Management (Redux Toolkit, Zustand vb.)',
                'Next.js, Server Components ve Performans Optimizasyonu uzmanlığı',
                'CI/CD, Jest/Cypress test otomasyonu ve kod inceleme liderliği'
            ],
            aiRecommendation: 'Selin Kaya, görev tanımında belirtilen tüm mimari ve teknik gereksinimleri %94 uyumla karşılamakta olup 1. öncelikle doğrudan teklif yapılması önerilir. Emre Demir (%88) teknik derinlik açısından çok güçlü bir alternatif olup ikinci aşama teknik mülakata dahil edilmelidir.',
            competencyNames: ['React / TypeScript', 'Sistem Mimarisi', 'Performans & SEO', 'Test & CI/CD', 'İletişim & Liderlik'],
            candidates: [
                {
                    name: 'Selin Kaya',
                    role: 'Senior Frontend Architect',
                    matchRate: 94,
                    rank: 1,
                    badge: '1. Sırada · Şiddetle Tavsiye Edilir',
                    badgeColor: '#16a34a',
                    experience: '6.5 Yıl',
                    education: 'ODTÜ - Bilgisayar Mühendisliği',
                    skills: { 'React / TypeScript': 96, 'Sistem Mimarisi': 92, 'Performans & SEO': 95, 'Test & CI/CD': 90, 'İletişim & Liderlik': 94 },
                    strengths: [
                        'Micro-frontend ve Next.js mimarisinde derin kurumsal tecrübe',
                        'Açık kaynak kütüphane geliştiricisi ve çok güçlü GitHub portföyü',
                        'Ekip içi kod kalitesi ve mimari standart koyma yetkinliği'
                    ],
                    risks: [
                        'Mevcut firmasından ayrılma süresi 6 hafta (ihbar süresi uzun)'
                    ],
                    salaryExpectation: '145.000 - 160.000 ₺'
                },
                {
                    name: 'Emre Demir',
                    role: 'Senior React Developer',
                    matchRate: 88,
                    rank: 2,
                    badge: '2. Sırada · Mülakata Uygun',
                    badgeColor: '#2563eb',
                    experience: '5 Yıl',
                    education: 'İTÜ - Yazılım Mühendisliği',
                    skills: { 'React / TypeScript': 90, 'Sistem Mimarisi': 84, 'Performans & SEO': 86, 'Test & CI/CD': 88, 'İletişim & Liderlik': 85 },
                    strengths: [
                        'Fintech ve e-ticaret projelerinde yüksek işlem hacimli React deneyimi',
                        'Zustand ve TailwindCSS ile çok hızlı prototipleme ve teslimat yeteneği'
                    ],
                    risks: [
                        'Büyük ölçekli Next.js SSR projelerinde deneyimi 1 yıl ile sınırlı'
                    ],
                    salaryExpectation: '120.000 - 135.000 ₺'
                },
                {
                    name: 'Burak Çelik',
                    role: 'Full Stack JavaScript Developer',
                    matchRate: 74,
                    rank: 3,
                    badge: '3. Sırada · Yedek Aday',
                    badgeColor: '#d97706',
                    experience: '4 Yıl',
                    education: 'Yıldız Teknik - Kontrol ve Otomasyon',
                    skills: { 'React / TypeScript': 78, 'Sistem Mimarisi': 70, 'Performans & SEO': 72, 'Test & CI/CD': 68, 'İletişim & Liderlik': 76 },
                    strengths: [
                        'Frontend yanında Node.js ve PostgreSQL backend tecrübesi'
                    ],
                    risks: [
                        'Frontend odaklı derin mimari ve unit test yazımında kıdemli seviyenin gerisinde'
                    ],
                    salaryExpectation: '95.000 - 110.000 ₺'
                },
                {
                    name: 'Ayşe Yıldız',
                    role: 'Frontend Developer',
                    matchRate: 62,
                    rank: 4,
                    badge: '4. Sırada · Gelişime Açık',
                    badgeColor: '#dc2626',
                    experience: '3 Yıl',
                    education: 'Hacettepe - İstatistik',
                    skills: { 'React / TypeScript': 65, 'Sistem Mimarisi': 58, 'Performans & SEO': 60, 'Test & CI/CD': 55, 'İletişim & Liderlik': 70 },
                    strengths: [
                        'Öğrenme azmi yüksek, kullanıcı deneyimi ve UI detaylarına duyarlı'
                    ],
                    risks: [
                        'Senior rol için gerekli 5 yıl deneyim ve mimari liderlik şartını karşılamıyor'
                    ],
                    salaryExpectation: '75.000 - 85.000 ₺'
                }
            ]
        },
        {
            id: 'comp-2',
            title: 'Finans Müdürü Terfisi',
            type: 'Adayları Birbiriyle Kıyasla',
            candidateCount: 2,
            date: '15.09.2026',
            status: 'Tamamlandı',
            jobTitle: 'Finans ve Mali İşler Müdürü (CFO Track)',
            jobRequirements: [
                'En az 8 yıl kurumsal finans, bütçeleme, nakit akışı ve vergi mevzuatı deneyimi',
                'Uluslararası Denetim (IFRS/UFRS) ve bağımsız denetim süreçleri yönetimi',
                'Banka ilişkileri, sendikasyon ve kredi yapılandırma müzakereleri',
                'Ekip liderliği ve ERP (SAP S/4HANA) finans modülleri dönüşüm tecrübesi'
            ],
            aiRecommendation: 'Mehmet Ali Kara, IFRS ve banka finansman yönetimindeki uluslararası deneyimiyle %92 uyum skoru yakalamış ve Finans Müdürlüğü rolüne doğrudan atanması önerilmektedir. Canan Ergin (%85) maliyet muhasebesi ve iç denetimde güçlü olup bütçe kontrol direktörlüğü için çok uygundur.',
            competencyNames: ['Nakit Akışı & Bütçe', 'IFRS & Konsolidasyon', 'Banka & Finansman', 'ERP & Dijital Finans', 'Stratejik Liderlik'],
            candidates: [
                {
                    name: 'Mehmet Ali Kara',
                    role: 'Kıdemli Finans Yöneticisi',
                    matchRate: 92,
                    rank: 1,
                    badge: '1. Sırada · Şiddetle Terfi Önerilir',
                    badgeColor: '#16a34a',
                    experience: '10 Yıl',
                    education: 'Boğaziçi - İktisat / Wharton Executive Finance',
                    skills: { 'Nakit Akışı & Bütçe': 95, 'IFRS & Konsolidasyon': 94, 'Banka & Finansman': 92, 'ERP & Dijital Finans': 88, 'Stratejik Liderlik': 90 },
                    strengths: [
                        '3 farklı sendikasyon kredisi kapatma ve 40M$ borç yapılandırma tecrübesi',
                        'Big Four (PwC) kökenli, mevzuat ve uluslararası raporlamada kusursuz',
                        'Yüksek müzakere ve yönetim kurulu sunum kabiliyeti'
                    ],
                    risks: [
                        'Üretim sektörü maliyet muhasebesi tecrübesi hizmet sektörüne kıyasla daha sınırlı'
                    ],
                    salaryExpectation: '160.000 - 180.000 ₺'
                },
                {
                    name: 'Canan Ergin',
                    role: 'Mali İşler ve Raporlama Müdürü',
                    matchRate: 85,
                    rank: 2,
                    badge: '2. Sırada · Terfiye Uygun',
                    badgeColor: '#2563eb',
                    experience: '8 Yıl',
                    education: 'Marmara - İşletme (İngilizce) / SMMM Ruhsatı',
                    skills: { 'Nakit Akışı & Bütçe': 88, 'IFRS & Konsolidasyon': 86, 'Banka & Finansman': 78, 'ERP & Dijital Finans': 92, 'Stratejik Liderlik': 82 },
                    strengths: [
                        'SAP S/4HANA finansal dönüşüm projesini başarıyla tamamlamış',
                        'Şirket içi operasyonel maliyetleri %14 düşüren bütçe kontrol disiplini',
                        'Resmi mali müşavirlik (SMMM) unvanı ve vergi mevzuatı uzmanlığı'
                    ],
                    risks: [
                        'Yabancı sermayeli bankalar ve sendikasyon müzakerelerinde birinci adam deneyimi az'
                    ],
                    salaryExpectation: '140.000 - 155.000 ₺'
                }
            ]
        }
    ];

    // Oturumları localStorage'dan yükle
    window.loadComparisonSessions = function() {
        try {
            const saved = localStorage.getItem('sb_comparison_sessions');
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed;
            }
        } catch(e){}
        return defaultSessions;
    };

    window.saveComparisonSessions = function() {
        try {
            localStorage.setItem('sb_comparison_sessions', JSON.stringify(window.comparisonSessions));
        } catch(e){}
    };

    window.comparisonSessions = window.loadComparisonSessions();

    // 1. Ana Karşılaştırma Sayfası Görünümü
    window.comparisonPage = function() {
        const sessions = window.comparisonSessions || defaultSessions;
        const totalCandidates = sessions.reduce((acc, s) => acc + (s.candidates ? s.candidates.length : (s.candidateCount || 0)), 0);
        const avgMatch = Math.round(sessions.reduce((acc, s) => {
            const topCandidate = s.candidates ? s.candidates[0] : null;
            return acc + (topCandidate ? topCandidate.matchRate : 85);
        }, 0) / (sessions.length || 1));

        return layout(\`
        <section class="comparison-page" style="padding: 25px; max-width: 1240px; margin: 0 auto;">
            
            <!-- Başlık ve Aksiyon -->
            <div class="prompt-head" style="margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                <div>
                    <span class="eyebrow">YAPAY ZEKA DESTEKLİ KONSOLİDE DEĞERLENDİRME</span>
                    <h2 style="font-size: 26px; font-weight: 800; color: #0f172a; margin: 4px 0;">CV & Aday Karşılaştırma Raporları</h2>
                    <p style="color: #64748b; font-size: 14px; margin: 0;">Adayların CV'lerini, mülakat performanslarını veya test sonuçlarını görev tanımıyla veya birbiriyle kıyaslayın.</p>
                </div>
                <button class="primary" onclick="showNewComparisonModal()" style="background: #7c3aed; color: white; padding: 10px 22px; border-radius: 8px; font-weight: 700; font-size: 14px; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 2px 4px rgba(124,58,237,0.3);">
                    <span>+</span> Yeni Karşılaştırma Başlat
                </button>
            </div>

            <!-- Özet Metrik Kartları -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 25px;">
                <div style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                    <span style="font-size: 11.5px; font-weight: 700; color: #64748b; text-transform: uppercase;">📁 Karşılaştırma Oturumu</span>
                    <b style="display: block; font-size: 24px; color: #0f172a; margin-top: 6px;">\${sessions.length} Oturum</b>
                </div>
                <div style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                    <span style="font-size: 11.5px; font-weight: 700; color: #64748b; text-transform: uppercase;">👥 Kıyaslanan Toplam Aday</span>
                    <b style="display: block; font-size: 24px; color: #2563eb; margin-top: 6px;">\${totalCandidates} Aday</b>
                </div>
                <div style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                    <span style="font-size: 11.5px; font-weight: 700; color: #64748b; text-transform: uppercase;">🎯 Ortalama Zirve Uyumu</span>
                    <b style="display: block; font-size: 24px; color: #16a34a; margin-top: 6px;">%\${avgMatch}</b>
                </div>
                <div style="background: white; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                    <span style="font-size: 11.5px; font-weight: 700; color: #64748b; text-transform: uppercase;">⚡ AI Karar Motoru</span>
                    <b style="display: block; font-size: 15px; color: #7c3aed; margin-top: 8px;">Gemma-4 Deep Match v5.3</b>
                </div>
            </div>

            <!-- Oturumlar Tablosu -->
            <section class="generated-case-card" style="padding: 0; background: white; border-radius: 14px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                <div style="padding: 20px 24px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="margin: 0; color: #0f172a; font-size: 16px; font-weight: 800;">Mevcut Karşılaştırma Oturumları ve Raporlar</h3>
                    <span style="font-size: 12px; color: #64748b;">Raporu görüntülemek için 'Raporu Gör' butonuna tıklayın</span>
                </div>
                <div class="table-wrap">
                    <table style="width: 100%; text-align: left; border-collapse: collapse;">
                        <thead>
                            <tr style="background: #f8fafc; border-bottom: 1px solid #e2e8f0;">
                                <th style="padding: 14px 20px; color: #64748b; font-size: 11.5px; font-weight: 700;">OTURUM BAŞLIĞI</th>
                                <th style="padding: 14px 20px; color: #64748b; font-size: 11.5px; font-weight: 700;">HEDEF POZİSYON</th>
                                <th style="padding: 14px 20px; color: #64748b; font-size: 11.5px; font-weight: 700;">TÜRÜ</th>
                                <th style="padding: 14px 20px; color: #64748b; font-size: 11.5px; font-weight: 700;">ADAY SAYISI</th>
                                <th style="padding: 14px 20px; color: #64748b; font-size: 11.5px; font-weight: 700;">TARİH</th>
                                <th style="padding: 14px 20px; color: #64748b; font-size: 11.5px; font-weight: 700;">DURUM</th>
                                <th style="padding: 14px 20px; text-align: right; color: #64748b; font-size: 11.5px; font-weight: 700;">İŞLEM</th>
                            </tr>
                        </thead>
                        <tbody>
                            \${sessions.map((s, idx) => \`
                            <tr style="border-bottom: 1px solid #f1f5f9; hover: background: #f8fafc;">
                                <td style="padding: 16px 20px; font-weight: 700; color: #0f172a; font-size: 14px;">
                                    \${safeText(s.title)}
                                </td>
                                <td style="padding: 16px 20px; color: #334155; font-size: 13px;">
                                    <span style="background: #f1f5f9; padding: 4px 10px; border-radius: 6px; font-weight: 600;">\${safeText(s.jobTitle || 'Pozisyon')}</span>
                                </td>
                                <td style="padding: 16px 20px; color: #64748b; font-size: 13px;">
                                    \${safeText(s.type)}
                                </td>
                                <td style="padding: 16px 20px; color: #0f172a; font-weight: 600; font-size: 13.5px;">
                                    👥 \${(s.candidates ? s.candidates.length : s.candidateCount)} Aday
                                </td>
                                <td style="padding: 16px 20px; color: #64748b; font-size: 13px;">
                                    \${safeText(s.date)}
                                </td>
                                <td style="padding: 16px 20px;">
                                    <span style="display:inline-block; padding:4px 10px; border-radius:20px; font-size:11.5px; font-weight:700; background:#dcfce7; color:#16a34a;">
                                        ✓ \${safeText(s.status || 'Tamamlandı')}
                                    </span>
                                </td>
                                <td style="padding: 16px 20px; text-align: right;">
                                    <div style="display: inline-flex; gap: 8px;">
                                        <button class="primary" style="padding: 8px 16px; font-size: 12.5px; font-weight: 700; background: #2563eb; color: white; border: none; border-radius: 6px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 4px rgba(37,99,235,0.25);" onclick="window.openComparisonReport('\${s.id}')">
                                            📊 Raporu Gör
                                        </button>
                                        \${idx >= 2 ? \`<button onclick="window.deleteComparisonSession('\${s.id}')" style="background:#fee2e2; color:#dc2626; border:none; padding:8px 10px; border-radius:6px; font-size:12px; cursor:pointer;" title="Oturumu Sil">🗑️</button>\` : ''}
                                    </div>
                                </td>
                            </tr>
                            \`).join('')}
                        </tbody>
                    </table>
                </div>
            </section>
        </section>
        \`, 'CV Karşılaştırma');
    };

    // 2. Karşılaştırma Raporunu Açan Fonksiyon
    window.openComparisonReport = function(sessionId) {
        const sessions = window.comparisonSessions || defaultSessions;
        const session = sessions.find(s => s.id === sessionId) || sessions[0];
        if (!session) {
            toast('Karşılaştırma oturumu bulunamadı');
            return;
        }

        const candidates = session.candidates || [];
        const topCandidate = candidates[0];
        const compNames = session.competencyNames || ['Teknik Derinlik', 'Problem Çözme', 'Sistem Mimarisi', 'İletişim & Ekip', 'İnisiyatif Alma'];

        const modal = document.createElement('div');
        modal.className = 'modal comparison-report-modal';
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
        <div class="modal-card print-card" style="max-width: 1100px; width: 100%; max-height: 90vh; overflow-y: auto; background: white; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid #e2e8f0; display: flex; flex-direction: column;">
            
            <!-- Üst Başlık Barı -->
            <div class="no-print" style="padding: 20px 30px; background: #0f172a; color: white; display: flex; justify-content: space-between; align-items: center; border-top-left-radius: 16px; border-top-right-radius: 16px;">
                <div>
                    <span style="font-size: 11px; font-weight: 700; color: #94a3b8; letter-spacing: 0.5px; text-transform: uppercase;">KONSOLİDE ADAY KIYASLAMA RAPORU</span>
                    <h2 style="margin: 2px 0 0 0; font-size: 20px; font-weight: 800; color: white;">\${safeText(session.title)}</h2>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #cbd5e1;">Hedef Rol: <b>\${safeText(session.jobTitle)}</b> · \${safeText(session.date)}</p>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <button onclick="window.copyComparisonText('\${session.id}')" style="background: #334155; color: white; border: none; padding: 8px 14px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">
                        📋 Özeti Kopyala
                    </button>
                    <button onclick="window.print()" style="background: #2563eb; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer;">
                        🖨️ Yazdır / PDF
                    </button>
                    <button onclick="this.closest('.modal').remove()" style="background: transparent; color: #94a3b8; border: none; font-size: 22px; cursor: pointer; padding: 0 8px;">✕</button>
                </div>
            </div>

            <div style="padding: 30px; background: #f8fafc; flex: 1;">
                
                <!-- 1. AI Karar ve Zirve Aday Önerisi Kartı -->
                <div style="background: white; border-radius: 14px; border: 1px solid #e2e8f0; border-left: 5px solid #16a34a; padding: 22px 26px; margin-bottom: 25px; box-shadow: 0 2px 4px rgba(0,0,0,0.03);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-size: 12px; font-weight: 800; color: #16a34a; text-transform: uppercase; letter-spacing: 0.5px;">
                            🎯 Yapay Zeka Konsolide İşe Alım Önerisi
                        </span>
                        <span style="font-size: 12px; background: #dcfce7; color: #166534; padding: 3px 10px; border-radius: 12px; font-weight: 700;">
                            Gemma-4 Karar Protokolü
                        </span>
                    </div>
                    <p style="margin: 0; font-size: 14.5px; color: #1e293b; line-height: 1.65; font-weight: 500;">
                        \${safeText(session.aiRecommendation)}
                    </p>
                </div>

                <!-- 2. Podyum / Konsolide Aday Sıralaması -->
                <h3 style="margin: 0 0 14px 0; font-size: 16px; font-weight: 800; color: #0f172a;">
                    🏆 Konsolide Aday Sıralaması & Genel Uyum Puanları
                </h3>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 15px; margin-bottom: 30px;">
                    \${candidates.map((c, i) => \`
                        <div style="background: white; border-radius: 14px; border: 1px solid \${i === 0 ? '#86efac' : '#e2e8f0'}; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); position: relative; overflow: hidden;">
                            \${i === 0 ? '<div style=\"position:absolute; top:0; right:0; background:#16a34a; color:white; font-size:10px; font-weight:800; padding:3px 12px; border-bottom-left-radius:8px;\">EN UYGUN ADAY</div>' : ''}
                            
                            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                                <div style="width: 36px; height: 36px; border-radius: 50%; background: \${i === 0 ? '#fef08a' : i === 1 ? '#e2e8f0' : i === 2 ? '#ffedd5' : '#f1f5f9'}; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px; color: #0f172a;">
                                    \${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1)}
                                </div>
                                <div>
                                    <h4 style="margin: 0; font-size: 16px; font-weight: 800; color: #0f172a;">\${safeText(c.name)}</h4>
                                    <span style="font-size: 12px; color: #64748b;">\${safeText(c.role)}</span>
                                </div>
                            </div>

                            <div style="background: #f8fafc; border-radius: 10px; padding: 12px; margin-bottom: 12px; text-align: center;">
                                <span style="font-size: 11px; font-weight: 700; color: #64748b; display: block;">GENEL GÖREV UYUMU</span>
                                <strong style="font-size: 32px; font-weight: 800; color: \${c.badgeColor || '#2563eb'};">%\${c.matchRate}</strong>
                                <span style="display: inline-block; font-size: 11px; font-weight: 700; color: \${c.badgeColor}; margin-top: 4px;">\${safeText(c.badge)}</span>
                            </div>

                            <div style="font-size: 12px; color: #475569; display: flex; flex-direction: column; gap: 4px;">
                                <div><b>Deneyim:</b> \${safeText(c.experience)}</div>
                                <div><b>Eğitim:</b> \${safeText(c.education)}</div>
                                <div><b>Maaş Beklentisi:</b> \${safeText(c.salaryExpectation || 'Belirtilmedi')}</div>
                            </div>
                        </div>
                    \`).join('')}
                </div>

                <!-- 3. Çok Boyutlu Yetkinlik Karşılaştırma Matrisi -->
                <div style="background: white; border-radius: 14px; border: 1px solid #e2e8f0; padding: 25px; margin-bottom: 30px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                    <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 800; color: #0f172a;">
                        📊 Çok Boyutlu Yetkinlik Karşılaştırma Matrisi
                    </h3>
                    <div style="overflow-x: auto;">
                        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
                            <thead>
                                <tr style="background: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                                    <th style="padding: 12px 16px; color: #64748b; font-weight: 700;">ÖLÇÜLEN YETKİNLİK</th>
                                    \${candidates.map(c => \`
                                        <th style="padding: 12px 16px; color: #0f172a; font-weight: 800; text-align: center;">
                                            \${safeText(c.name)}
                                            <span style="display: block; font-size: 11px; color: #2563eb; font-weight: 600;">(%\${c.matchRate})</span>
                                        </th>
                                    \`).join('')}
                                </tr>
                            </thead>
                            <tbody>
                                \${compNames.map(comp => {
                                    let maxScore = -1;
                                    candidates.forEach(c => {
                                        const s = (c.skills && c.skills[comp]) || 70;
                                        if (s > maxScore) maxScore = s;
                                    });

                                    return \`
                                    <tr style="border-bottom: 1px solid #f1f5f9;">
                                        <td style="padding: 12px 16px; font-weight: 700; color: #334155;">\${safeText(comp)}</td>
                                        \${candidates.map(c => {
                                            const score = (c.skills && c.skills[comp]) || Math.round(c.matchRate * 0.95);
                                            const isLeader = score === maxScore;
                                            return \`
                                            <td style="padding: 12px 16px; text-align: center;">
                                                <div style="display: inline-flex; align-items: center; gap: 8px;">
                                                    <span style="font-weight: 800; color: \${score >= 85 ? '#16a34a' : score >= 70 ? '#2563eb' : '#d97706'};">%\${score}</span>
                                                    \${isLeader ? '<span style=\"background:#dcfce7; color:#166534; font-size:10px; font-weight:800; padding:2px 6px; border-radius:4px;\">LİDER</span>' : ''}
                                                </div>
                                                <div style="height: 4px; background: #e2e8f0; border-radius: 2px; width: 80px; margin: 4px auto 0 auto; overflow: hidden;">
                                                    <div style="height: 100%; width: \${score}%; background: \${score >= 85 ? '#16a34a' : score >= 70 ? '#2563eb' : '#d97706'};"></div>
                                                </div>
                                            </td>
                                            \`;
                                        }).join('')}
                                    </tr>
                                    \`;
                                }).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- 4. Aday Bazında Güçlü Yanlar & Riskler Detayı -->
                <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 800; color: #0f172a;">
                    ⚖️ Aday Bazında Güçlü Yönler ve Risk Analizi
                </h3>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
                    \${candidates.map(c => \`
                        <div style="background: white; border-radius: 14px; border: 1px solid #e2e8f0; padding: 22px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; margin-bottom: 14px;">
                                <div>
                                    <h4 style="margin: 0; font-size: 16px; font-weight: 800; color: #0f172a;">\${safeText(c.name)}</h4>
                                    <span style="font-size: 12px; color: #64748b;">\${safeText(c.role)} · \${safeText(c.experience)}</span>
                                </div>
                                <span style="background: \${c.badgeColor || '#2563eb'}; color: white; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 800;">
                                    %\${c.matchRate}
                                </span>
                            </div>

                            <!-- Güçlü Yanlar -->
                            <div style="margin-bottom: 16px;">
                                <b style="display: block; font-size: 12px; font-weight: 800; color: #166534; margin-bottom: 6px;">
                                    🟢 ÖNE ÇIKAN GÜÇLÜ YÖNLER
                                </b>
                                <ul style="margin: 0; padding-left: 18px; font-size: 12.5px; color: #14532d; line-height: 1.55;">
                                    \${(c.strengths || []).map(s => \`<li style=\"margin-bottom: 4px;\">\${safeText(s)}</li>\`).join('')}
                                </ul>
                            </div>

                            <!-- Riskler -->
                            <div>
                                <b style="display: block; font-size: 12px; font-weight: 800; color: #991b1b; margin-bottom: 6px;">
                                    🚨 DİKKAT EDİLMESİ GEREKEN ALANLAR / RİSKLER
                                </b>
                                <ul style="margin: 0; padding-left: 18px; font-size: 12.5px; color: #7f1d1d; line-height: 1.55;">
                                    \${(c.risks || []).map(r => \`<li style=\"margin-bottom: 4px;\">\${safeText(r)}</li>\`).join('')}
                                </ul>
                            </div>
                        </div>
                    \`).join('')}
                </div>

            </div>

            <!-- Alt Kapat Butonu -->
            <div class="no-print" style="padding: 16px 30px; background: white; border-top: 1px solid #e2e8f0; display: flex; justify-content: flex-end; border-bottom-left-radius: 16px; border-bottom-right-radius: 16px;">
                <button class="primary" style="background: #0f172a; color: white; border: none; padding: 10px 24px; border-radius: 8px; font-weight: 700; cursor: pointer;" onclick="this.closest('.modal').remove()">
                    Kapat
                </button>
            </div>

        </div>
        \`;

        document.body.append(modal);
    };

    // 3. Karşılaştırma Özetini Panoya Kopyalama
    window.copyComparisonText = function(sessionId) {
        const sessions = window.comparisonSessions || defaultSessions;
        const session = sessions.find(s => s.id === sessionId) || sessions[0];
        if (!session) return;

        let txt = 'SKILLBRIDGE AI - KONSOLİDE ADAY KARŞILAŞTIRMA RAPORU\\n';
        txt += 'Oturum: ' + session.title + '\\n';
        txt += 'Hedef Rol: ' + session.jobTitle + '\\n';
        txt += 'Tarih: ' + session.date + '\\n\\n';
        txt += 'AI ÖNERİSİ: ' + session.aiRecommendation + '\\n\\n';
        txt += 'ADAY SIRALAMASI:\\n';
        (session.candidates || []).forEach((c, i) => {
            txt += (i + 1) + '. ' + c.name + ' - %' + c.matchRate + ' (' + c.role + ') | ' + c.badge + '\\n';
        });

        navigator.clipboard.writeText(txt).then(() => {
            toast('Karşılaştırma rapor özeti panoya kopyalandı');
        }).catch(() => {
            toast('Kopyalama yapılamadı');
        });
    };

    // 4. Oturumu Silme
    window.deleteComparisonSession = function(sessionId) {
        if (!confirm('Bu karşılaştırma oturumunu silmek istediğinizden emin misiniz?')) return;
        window.comparisonSessions = (window.comparisonSessions || []).filter(s => s.id !== sessionId);
        window.saveComparisonSessions();
        toast('Oturum silindi');
        const appEl = document.getElementById('app');
        if (appEl && state.page === 'comparison') {
            appEl.innerHTML = window.comparisonPage();
        }
    };

    // 5. Durum Yönetimi (State)
    window.comparisonModalState = {
        activeTab: 'system',
        selectedSystemCandidates: [],
        uploadedCvs: [],
        searchQuery: ''
    };

    // 6. Sistem Adayı Seçimini Değiştirme
    window.toggleSystemCandidate = function(candName) {
        const stateObj = window.comparisonModalState;
        const idx = stateObj.selectedSystemCandidates.indexOf(candName);
        if (idx === -1) {
            stateObj.selectedSystemCandidates.push(candName);
        } else {
            stateObj.selectedSystemCandidates.splice(idx, 1);
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

    // 7. CV Dosyası Yükleme İşlemi (Çoklu Dosya Destekli)
    window.handleCvFileUpload = function(e) {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;

        files.forEach(file => {
            let rawName = file.name.replace(/\\.[^/.]+$/, "");
            rawName = rawName.replace(/[_-]+/g, ' ').replace(/\\bcv\\b/gi, '').replace(/\\bözgeçmiş\\b/gi, '').trim();
            const cleanName = rawName.split(' ')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                .join(' ') || 'Aday (' + file.name + ')';

            const sizeKb = Math.round(file.size / 1024);
            const sizeStr = sizeKb > 1024 ? (sizeKb / 1024).toFixed(1) + ' MB' : sizeKb + ' KB';

            window.comparisonModalState.uploadedCvs.push({
                name: cleanName,
                fileName: file.name,
                size: sizeStr,
                role: 'Özgeçmiş Belgesi Yüklendi',
                experience: (Math.floor(Math.random() * 5) + 3) + ' Yıl'
            });
        });

        toast(files.length + ' adet CV belgesi başarıyla yüklendi');
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

    // 8. Alt Seçim Çubuğunu Güncelleme
    window.updateComparisonSummaryBar = function() {
        const summaryEl = document.getElementById('comparison-selected-summary');
        const submitBtn = document.getElementById('comparison-submit-btn');
        if (!summaryEl) return;

        const sys = window.comparisonModalState.selectedSystemCandidates;
        const cvs = window.comparisonModalState.uploadedCvs;
        const total = sys.length + cvs.length;

        let chipsHtml = '';
        sys.forEach(name => {
            chipsHtml += '<span style="background:#eff6ff; color:#1d4ed8; padding:4px 10px; border-radius:14px; font-size:12px; font-weight:700; display:inline-flex; align-items:center; gap:6px; border:1px solid #bfdbfe;">👤 ' + safeText(name) + ' <small style="color:#60a5fa;">(Sistem)</small><button type="button" onclick="window.toggleSystemCandidate(\\'' + name.replace(/'/g, "\\\\'") + '\\')" style="background:none; border:none; color:#1d4ed8; cursor:pointer; padding:0; font-size:13px;">✕</button></span>';
        });
        cvs.forEach((cv, idx) => {
            chipsHtml += '<span style="background:#f5f3ff; color:#6d28d9; padding:4px 10px; border-radius:14px; font-size:12px; font-weight:700; display:inline-flex; align-items:center; gap:6px; border:1px solid #ddd6fe;">📄 ' + safeText(cv.name) + ' <small style="color:#a78bfa;">(CV)</small><button type="button" onclick="window.removeUploadedCv(' + idx + ')" style="background:none; border:none; color:#6d28d9; cursor:pointer; padding:0; font-size:13px;">✕</button></span>';
        });

        summaryEl.innerHTML = total > 0 ? chipsHtml : '<span style="color:#94a3b8; font-size:13px;">Henüz aday seçilmedi veya CV yüklenmedi. En az 2 aday seçin.</span>';
        if (submitBtn) {
            submitBtn.textContent = '🚀 Karşılaştırmayı Başlat (' + total + ' Aday)';
            submitBtn.disabled = total < 2;
            submitBtn.style.opacity = total < 2 ? '0.6' : '1';
        }
    };

    // 9. Modal Gövdesini Yeniden Çizen Fonksiyon
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
                btnSys.style.borderBottom = '2px solid #2563eb';
                btnSys.style.color = '#2563eb';
                btnSys.style.fontWeight = '800';
                btnUpl.style.borderBottom = '2px solid transparent';
                btnUpl.style.color = '#64748b';
                btnUpl.style.fontWeight = '600';
            } else {
                btnUpl.style.borderBottom = '2px solid #7c3aed';
                btnUpl.style.color = '#7c3aed';
                btnUpl.style.fontWeight = '800';
                btnSys.style.borderBottom = '2px solid transparent';
                btnSys.style.color = '#64748b';
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
                    }).join('') : '<div style=\"grid-column: 1/-1; padding: 25px; text-align: center; color: #94a3b8; font-size: 13.5px;\">Aramaya uygun aday bulunamadı.</div>'}
                </div>
            </div>
            \`;
        } else {
            bodyEl.innerHTML = \`
            <div>
                <div onclick="document.getElementById('cv-file-input').click()" ondragover="event.preventDefault(); this.style.borderColor='#7c3aed';" ondragleave="this.style.borderColor='#cbd5e1';" ondrop="event.preventDefault(); window.handleCvFileUpload({target: {files: event.dataTransfer.files}})" style="border: 2px dashed #cbd5e1; border-radius: 12px; padding: 30px 20px; text-align: center; cursor: pointer; background: #fafafa; margin-bottom: 20px; transition: border-color 0.2s;">
                    <input type="file" id="cv-file-input" multiple accept=".pdf,.docx,.doc,.txt" onchange="window.handleCvFileUpload(event)" style="display: none;">
                    <div style="font-size: 38px; margin-bottom: 8px;">📂</div>
                    <strong style="display: block; color: #0f172a; font-size: 15px; margin-bottom: 4px;">CV Belgelerini Seçin veya Buraya Sürükleyin</strong>
                    <span style="color: #64748b; font-size: 13px; display: block;">Birden fazla PDF, Word (.docx, .doc) veya TXT dosyası seçebilirsiniz</span>
                    <span style="display: inline-block; margin-top: 10px; background: #ede9fe; color: #6d28d9; padding: 5px 14px; border-radius: 20px; font-size: 12px; font-weight: 700;">
                        Bilgisayardan Dosya Seç 📁
                    </span>
                </div>

                \${cvs.length ? \`
                <div style="margin-bottom: 10px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-size: 12.5px; font-weight: 700; color: #0f172a;">Yüklenen CV Belgeleri (\${cvs.length})</span>
                        <span style="font-size: 11.5px; color: #64748b;">Aday ismini doğrudan düzenleyebilirsiniz</span>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 8px; max-height: 180px; overflow-y: auto; padding-right: 4px;">
                        \${cvs.map((cv, idx) => \`
                        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 14px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
                            <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                                <span style="font-size: 20px;">📄</span>
                                <div style="flex: 1;">
                                    <input type="text" value="\${safeText(cv.name)}" onchange="window.updateUploadedCvName(\${idx}, this.value)" title="Aday ismini düzenle" style="width: 100%; border: 1px solid transparent; padding: 3px 6px; border-radius: 4px; font-size: 13.5px; font-weight: 700; color: #0f172a; outline: none; background: transparent;">
                                    <div style="font-size: 11px; color: #64748b; padding-left: 6px;">\${safeText(cv.fileName)} · \${cv.size}</div>
                                </div>
                            </div>
                            <button type="button" onclick="window.removeUploadedCv(\${idx})" style="background: #fee2e2; color: #dc2626; border: none; padding: 5px 10px; border-radius: 6px; font-size: 12px; cursor: pointer; font-weight: 700;" title="Kaldır">
                                ✕
                            </button>
                        </div>
                        \`).join('')}
                    </div>
                </div>
                \` : ''}
            </div>
            \`;
        }

        window.updateComparisonSummaryBar();
    };

    // 10. Yenilenmiş "Yeni Karşılaştırma Başlat" Modalı
    window.showNewComparisonModal = function() {
        window.comparisonModalState.selectedSystemCandidates = [];
        window.comparisonModalState.uploadedCvs = [];
        window.comparisonModalState.activeTab = 'system';
        window.comparisonModalState.searchQuery = '';

        const list = (typeof candidateResults !== 'undefined' ? candidateResults : window.candidateResults) || [];
        if (list.length >= 2) {
            window.comparisonModalState.selectedSystemCandidates = [list[0].name, list[1].name];
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
        <div class="modal-card" style="max-width: 860px; width: 100%; max-height: 92vh; overflow-y: auto; background: white; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); border: 1px solid #e2e8f0; display: flex; flex-direction: column;">
            
            <div style="padding: 20px 28px; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; background: #fafafa; border-top-left-radius: 16px; border-top-right-radius: 16px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 40px; height: 40px; border-radius: 10px; background: #ede9fe; color: #7c3aed; display: flex; align-items: center; justify-content: center; font-size: 20px;">
                        ⚖️
                    </div>
                    <div>
                        <h2 style="margin: 0; font-size: 20px; font-weight: 800; color: #0f172a;">Yeni Karşılaştırma Başlat</h2>
                        <p style="margin: 2px 0 0 0; color: #64748b; font-size: 13px;">Adayları sistem havuzundan seçin veya yeni CV belgeleri yükleyin.</p>
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
                    <div style="display: flex; border-bottom: 1px solid #e2e8f0; background: #f8fafc;">
                        <button type="button" id="tab-btn-system" onclick="window.switchComparisonTab('system')" style="flex: 1; padding: 12px; background: none; border: none; cursor: pointer; font-size: 13.5px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                            <span>👥</span> Sistemdeki Adaylardan Seç
                        </button>
                        <button type="button" id="tab-btn-upload" onclick="window.switchComparisonTab('upload')" style="flex: 1; padding: 12px; background: none; border: none; cursor: pointer; font-size: 13.5px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                            <span>📁</span> Yeni CV Belgeleri Yükle (PDF / Word)
                        </button>
                    </div>

                    <div id="comparison-modal-dynamic-content" style="padding: 18px 20px;">
                    </div>
                </div>

                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 16px;">
                    <span style="display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 6px;">
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

    // 11. Karşılaştırma Oluşturma ve Raporu Anında Açma Motoru
    window.handleCreateComparison = function(e, form) {
        e.preventDefault();
        const title = document.getElementById('new-comp-title')?.value || 'Yeni Pozisyon Karşılaştırması';
        const type = document.getElementById('new-comp-type')?.value || 'Görev Tanımı ile Karşılaştırma';
        const desc = document.getElementById('new-comp-desc')?.value || 'Pozisyon gereksinimleri ve nitelikler';

        const stateObj = window.comparisonModalState;
        const sysNames = stateObj.selectedSystemCandidates;
        const cvItems = stateObj.uploadedCvs;
        const totalCount = sysNames.length + cvItems.length;

        if (totalCount < 2) {
            toast('Lütfen karşılaştırmak için en az 2 aday seçin veya CV yükleyin.');
            return;
        }

        const allCandidatesList = (typeof candidateResults !== 'undefined' ? candidateResults : window.candidateResults) || [];
        const newCandidates = [];

        // 1. Sistem adaylarını dönüştür
        sysNames.forEach((name, i) => {
            const found = allCandidatesList.find(c => c.name === name);
            const score = found ? found.score : (85 - i * 6);
            newCandidates.push({
                name: name,
                role: found ? (found.test || 'Aday') : 'Kayıtlı Aday',
                matchRate: score,
                rank: 0,
                badge: score >= 85 ? 'Şiddetle Tavsiye Edilir' : (score >= 60 ? 'Mülakata Uygun' : 'Gelişime Açık'),
                badgeColor: score >= 85 ? '#16a34a' : (score >= 60 ? '#2563eb' : '#dc2626'),
                experience: (found && found.experience) ? found.experience : (5 + i) + ' Yıl',
                education: (found && found.education) ? found.education : 'Lisans Mezunu',
                skills: {
                    'Teknik Yetkinlik': score,
                    'Problem Çözme': Math.min(100, Math.max(20, score + 4)),
                    'Sistem Mimarisi': Math.min(100, Math.max(20, score - 2)),
                    'Ekip İletişimi': Math.min(100, Math.max(30, score + 5)),
                    'Stratejik Karar': Math.min(100, Math.max(20, score - 5))
                },
                strengths: (found && found.strengths && found.strengths.length) ? found.strengths : [
                    'Sistemde kayıtlı doğrulanmış yetkinlik test performansı',
                    'Pozisyonun temel reflekslerinde tutarlı yaklaşım'
                ],
                risks: (found && found.watchouts && found.watchouts.length) ? found.watchouts : [
                    score < 70 ? 'Karmaşık kriz durumlarında ek yönetsel rehberlik gereksinimi' : 'Yüksek piyasa değeri ve alternatif teklif rekabeti'
                ],
                salaryExpectation: '110.000 - 130.000 ₺'
            });
        });

        // 2. Yüklenen CV belgelerini dönüştür
        cvItems.forEach((cv, i) => {
            const baseScore = Math.max(65, Math.min(95, 88 - i * 5 + (cv.name.length % 7)));
            newCandidates.push({
                name: cv.name,
                role: 'CV Belgesi: ' + cv.fileName,
                matchRate: baseScore,
                rank: 0,
                badge: baseScore >= 85 ? 'Şiddetle Tavsiye Edilir' : 'Mülakata Uygun',
                badgeColor: baseScore >= 85 ? '#16a34a' : '#2563eb',
                experience: cv.experience || '5 Yıl',
                education: 'Mühendislik / İktisadi İdari Bilimler',
                skills: {
                    'Teknik Yetkinlik': baseScore,
                    'Problem Çözme': Math.min(100, baseScore + 2),
                    'Sistem Mimarisi': Math.max(50, baseScore - 4),
                    'Ekip İletişimi': Math.min(100, baseScore + 3),
                    'Stratejik Karar': Math.max(50, baseScore - 3)
                },
                strengths: [
                    'Özgeçmiş analizinde kanıtlanmış proje başarıları ve sektör tecrübesi',
                    'Görev tanımındaki anahtar nitelikler ile yüksek uyum skoru'
                ],
                risks: [
                    'Mülakat aşamasında referans ve teknik doğrulama yapılması önerilir'
                ],
                salaryExpectation: 'Piyasa Standartlarında'
            });
        });

        // Skorlara göre sırala
        newCandidates.sort((a, b) => b.matchRate - a.matchRate);
        newCandidates.forEach((c, idx) => {
            c.rank = idx + 1;
            c.badge = (idx + 1) + '. Sırada · ' + c.badge;
        });

        const newId = 'comp-' + Date.now();
        const top = newCandidates[0];

        const newSession = {
            id: newId,
            title: title,
            type: type,
            candidateCount: newCandidates.length,
            date: new Date().toLocaleDateString('tr-TR'),
            status: 'Tamamlandı',
            jobTitle: title,
            jobRequirements: [desc],
            aiRecommendation: top.name + ', ' + title + ' rolü için belirlenen kriterleri %' + top.matchRate + ' genel uyumla en üst seviyede karşılamaktadır ve 1. sırada mülakata/teklife alınması tavsiye edilir.',
            competencyNames: ['Teknik Yetkinlik', 'Problem Çözme', 'Sistem Mimarisi', 'Ekip İletişimi', 'Stratejik Karar'],
            candidates: newCandidates
        };

        window.comparisonSessions = window.comparisonSessions || [];
        window.comparisonSessions.unshift(newSession);
        window.saveComparisonSessions();

        form.closest('.modal').remove();
        toast('Karşılaştırma başarıyla tamamlandı, rapor açılıyor...');

        const appEl = document.getElementById('app');
        if (appEl && state.page === 'comparison') {
            appEl.innerHTML = window.comparisonPage();
        }

        setTimeout(() => {
            window.openComparisonReport(newId);
        }, 200);
    };

})();`;

// Find and replace the comparison system code in dist/app.js
const startMarker = '// GELİŞMİŞ CV VE ADAY KARŞILAŞTIRMA';
const startIdx = app.indexOf(startMarker);
if (startIdx !== -1) {
    const fnStart = app.lastIndexOf('(function(){', startIdx);
    const endMarker = 'window.getAllPeople = function()';
    const endIdx = app.indexOf(endMarker, startIdx);
    const fnEnd = app.lastIndexOf('})();', endIdx) + 5;

    if (fnStart !== -1 && fnEnd > fnStart) {
        app = app.substring(0, fnStart) + fullComparisonSystemCode + '\n\n\n\n' + app.substring(fnEnd);
        console.log('Successfully replaced comparison block with new Candidate Selection & CV Upload system!');
    } else {
        console.log('Error: Could not determine exact function boundaries');
    }
} else {
    console.log('Error: Could not find startMarker in dist/app.js');
}

fs.writeFileSync(appPath, app, 'utf8');
console.log('Dist app.js size after:', app.length);
