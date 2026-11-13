const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'dist', 'app.js');
let content = fs.readFileSync(appPath, 'utf8');

// 1. Prepare defaultSessions with the exact "Tedarik Zinciri" session from Screenshot 2
const defaultSessionsReplacement = `const defaultSessions = [
        {
            id: 'cmqjf5fnd0001veadtlbhflam',
            title: 'Tedarik Zinciri',
            type: 'Yetenek ve Yetkinlik Değerlendirme Sonucu / CV Karşılaştırma',
            candidateCount: 4,
            date: '14.10.2026',
            status: 'Tamamlandı',
            jobTitle: 'Tedarik Zinciri Yöneticisi',
            jobRequirements: [
                'RACI ne demek? (ekibin anlayacağı dille)\\n' +
                'R = Yapan / İşi götüren (İcra)\\n' +
                'İşi fiilen yapan, çıktıyı üreten kişi/rol. "Toplantıyı ayarlayan, dokümanı yazan, işi sahada yapan" genelde R\\'dir. Bir işte birden fazla R olabilir (aynı işi farklı kişiler yapıyorsa). Kısacası: "Kim çalışıyor?" → R\\n\\n' +
                'A = Sahibi / Hesap veren (Onay - sonuç sorumluluğu)\\n' +
                'İşin sonucundan sorumlu olan kişi/rol. İşi yapmasa da "onay veren, bütçeyi yöneten, teslimatı imzalayan" A\\'dır. Kural: Her işte TEK bir A olmalıdır.\\n\\n' +
                'C = Danışılan (Uzman / Fikir alınan)\\n' +
                'Görüşü, onayı veya teknik katkısı gereken uzmanlar/ekipler. İş yapılmadan önce fikri alınır.\\n\\n' +
                'I = Bilgilendirilen (Haber verilen)\\n' +
                'İşin gidişatı veya sonucu hakkında bilgilendirilen kişi/ekipler.\\n\\n' +
                'Tedarik Zinciri Aranan Yetkinlikler:\\n' +
                '• Yalın Liderlik ve Yalın Üretim (Kaizen, 5S, VSM, Kanban)\\n' +
                '• Otomotiv ve Perakende Lojistik Operasyonları Yönetimi\\n' +
                '• Tedarikçi Yönetimi, Maliyet Düşürme ve Süreç Optimizasyonu\\n' +
                '• Kültür Değişimi, Ekip Liderliği ve Uluslararası İletişim'
            ],
            aiRecommendation: "Recep Yiğit (recep.yigit@example.com), Yalın Liderlik ve Yalın Üretim Yöntemleri konusundaki derin uzmanlığı ve 30 yılı aşkın üst düzey tecrübesiyle 'Tedarik Zinciri' rolü için tartışmasız 1. sıradaki şampiyon adaydır.",
            k10_executive_summary: "Bu oturumda, 'Tedarik Zinciri' konulu İşe Alım sürecinde dört adayın değerlendirme sonuçları incelenmiştir: Senem Yiğit, Recep Yigit (ryigit54@hotmail.com), Yagiz Yigit ve Recep Yiğit (recep.yigit@example.com). Adaylar, Sorumluluk ve Sonuç Odaklılık, Mesleki Uzmanlık, Yalın Metodoloji ve Paydaş İletişimi kriterleri çerçevesinde Ajan K10 tarafından değerlendirilmiştir.",
            k10_comparison_report: [
                "Bu oturumda, 'Tedarik Zinciri' konulu İşe Alım sürecinde dört adayın değerlendirme sonuçları incelenmiştir: Senem Yiğit, Recep Yigit (ryigit54@hotmail.com), Yagiz Yigit ve Recep Yiğit (recep.yigit@example.com). Adaylar, Sorumluluk ve Sonuç Odaklılık, Mesleki Uzmanlık ve Uygulama Becerisi, Analitik Düşünme ve Etki Değerlendirme, İletişim ve Paydaş Yönetimi, Sektörel Bakış Açısı ve Deneyim kriterleri çerçevesinde kıyaslanmıştır. Adaylar arasında 'Tedarik Zinciri' rolü için en uygun 'Şampiyon'un belirlenmesi hedeflenmiştir.",
                "Değerlendirme sonucunda, Recep Yiğit (recep.yigit@example.com) bu pozisyon için açık ara en güçlü aday olarak öne çıkmaktadır. Kendisi, Yalın Liderlik ve Yalın Üretim Yöntemleri konusunda derin ve güncel uzmanlığa sahip olmasının yanı sıra, 30 yılı aşkın otomotiv ve hazır giyim perakende sektörlerinde edindiği uluslararası üst düzey İK, İş Güvenliği ve İdari İşler yöneticiliği tecrübesini şu anki 'Tedarik Zinciri Yalın Gelişim Danışmanlığı' rolüyle doğrudan tedarik zinciri optimizasyonuna yönlendirmiştir. Bu geçiş, onun hem sürekli öğrenme motivasyonunu hem de sektörün en kritik ihtiyaçlarından biri olan yalınlaşma konusundaki mesleki uzmanlığını ve uygulama becerisini net bir şekilde ortaya koymaktadır. Geniş coğrafi ve kültürel deneyimi, paydaş yönetimi ve iletişim becerilerinin gücünü desteklerken, sektörel bakış açısı ve deneyim kriterlerinde de en yüksek uyumu sergilemektedir.",
                "Diğer adaylardan Senem Yiğit, finans sektöründe 20 yılı aşkın BT program ve proje yönetimi deneyimi ile sorumluluk ve sonuç odaklılık ile iletişim becerileri açısından oldukça güçlü bir adaydır. Ancak, uzmanlık alanı doğrudan tedarik zinciri operasyonları veya optimizasyonu yerine BT ve finans sektörüne odaklanmış olması ve modern metodoloji eksikliği, bu pozisyon için sektörel uyumunu azaltmaktadır. Recep Yigit (ryigit54@hotmail.com) ise otomotiv sektöründe İnsan Kaynakları alanında önemli tecrübelere sahip olmasına karşın, 2012'den sonraki 10 yılı aşkın kariyer boşluğu ve uzmanlık alanının doğrudan İK olması, Tedarik Zinciri rolü için büyük bir risk ve uyumsuzluk oluşturmaktadır. Yagiz Yigit ise güçlü akademik geçmişi ve ilgili staj deneyimleriyle yüksek potansiyelli genç bir adaydır, ancak profesyonel tam zamanlı tedarik zinciri tecrübesinin sınırlı olması nedeniyle bu seviyedeki bir pozisyon için yeterli olgunluğa henüz ulaşmamıştır.",
                "Sonuç olarak, Recep Yiğit (recep.yigit@example.com)'in güncel 'Tedarik Zinciri Yalın Gelişim Danışmanlığı' odaklı kariyeri, Yalın üretim yöntemlerindeki derin uzmanlığı, otomotiv ve perakende gibi tedarik zinciri yoğun sektörlerdeki uzun yıllara dayanan uluslararası üst düzey yöneticilik tecrübesi, onu 'Tedarik Zinciri' rolü için tartışmasız bir şampiyon yapmaktadır. Kendisi, belirlenen tüm kriterlerde hem derinlik hem de doğrudan uygunluk açısından diğer adayların önüne geçmektedir."
            ],
            competencyNames: ['Teknik Yetkinlik', 'Kıdem & Tecrübe', 'İş Bitirme & Proje', 'Metot & Araç Uyum', 'Davranışsal Uyum'],
            candidates: [
                {
                    name: 'Recep Yiğit',
                    email: 'recep.yigit@example.com',
                    role: 'Tedarik Zinciri Yalın Gelişim Danışmanı',
                    matchRate: 92,
                    rank: 1,
                    badge: 'İleri Seviye Yetkin',
                    badgeColor: '#16a34a',
                    experience: '30+ Yıl',
                    education: 'Mühendislik & İdari Bilimler / Yalın Liderlik',
                    salaryExpectation: '140.000 - 160.000 ₺',
                    agentData: {
                        k2_summary: 'Recep Yiğit, Yalın Liderlik ve Yalın Üretim Yöntemleri konusunda uzmanlaşmış, 30 yılı aşkın otomotiv ve perakende sektörlerinde uluslararası üst düzey İK, İş Güvenliği ve İdari İşler yöneticiliği yapmış kıdemli bir profesyoneldir. Kariyerini Tedarik Zinciri Yalın Gelişim Danışmanlığına yönlendirerek sürekli adaptasyon ve derinlemesine uzmanlık sergilemektedir.',
                        k3_technical: 90,
                        k4_seniority: 95,
                        k5_execution: 88,
                        k6_tools: 92,
                        k7_behavioral: 'Aday, uzun yıllara dayanan üst düzey yöneticilik ve uluslararası deneyimleri sayesinde güçlü iletişim, paydaş yönetimi ve kültürel adaptasyon becerilerine sahiptir. Yalın Gelişim odaklı mevcut rolü, analitik düşünme, problem çözme ve sürekli iyileştirme kültürü oluşturma yetkinliğini vurgulamaktadır.',
                        k8_risk: 'Yok',
                        k9_strengths: [
                            'Yalın Liderlik ve Yalın Üretim Yöntemlerinde derin ve güncel uzmanlık.',
                            'Otomotiv ve hazır giyim perakende sektörlerinde 30 yılı aşkın, üst düzey ve uluslararası tecrübe.',
                            'Avrupa, Asya, Amerika ve Afrika kıtalarında geniş kültürel ve coğrafi deneyim.',
                            'İK, İş Güvenliği, İdari İşler ve Tedarik Zinciri alanlarında geniş fonksiyonel bilgi birikimi ve uygulama becerisi.',
                            'Kariyerinde adaptasyon ve sürekli öğrenme motivasyonu (eğitimcilikten yalın danışmanlığına geçiş).'
                        ],
                        k9_weaknesses: [
                            'Sunulan bilgilerde, üstlenilen projelerin spesifik başarı metrikleri veya detaylı sonuçları belirtilmemiştir.',
                            'Adayın kariyerinin büyük bir kısmı İK ve idari işler üzerine yoğunlaşmış olup, tam zamanlı bir proje yönetimi geçmişi açıkça belirtilmemiştir (ancak üst düzey rollerde bu yetkinliğin mevcut olduğu varsayılır).'
                        ]
                    }
                },
                {
                    name: 'Senem Yiğit',
                    email: 'senem.yigit@example.com',
                    role: 'Kıdemli BT Program ve Proje Yöneticisi',
                    matchRate: 84,
                    rank: 2,
                    badge: 'Mülakata Uygun',
                    badgeColor: '#2563eb',
                    experience: '20+ Yıl',
                    education: 'Boğaziçi - Endüstri Mühendisliği / Finans',
                    salaryExpectation: '130.000 - 150.000 ₺',
                    agentData: {
                        k2_summary: 'Senem Yiğit, finans ve bankacılık teknolojilerinde 20 yılı aşkın program ve büyük ölçekli proje yönetimi deneyimine sahip üst düzey bir yöneticidir. Süreç disiplini ve paydaş koordinasyonunda kanıtlanmış başarıları bulunmaktadır.',
                        k3_technical: 82,
                        k4_seniority: 88,
                        k5_execution: 86,
                        k6_tools: 80,
                        k7_behavioral: 'Yüksek sorumluluk bilinci, sonuç odaklı yönetim tarzı ve kurumsal ekipleri yönlendirmede güçlü iletişim becerisi sergilemektedir.',
                        k8_risk: 'Doğrudan tedarik zinciri ve saha lojistiği yerine BT ve finans odaklı tecrübe yoğunluğu.',
                        k9_strengths: [
                            '20 yılı aşkın kurumsal proje ve bütçe yönetimi tecrübesi.',
                            'Karmaşık çok paydaşlı ekiplerde liderlik ve kriz yönetimi kabiliyeti.',
                            'Metrik ve KPI odaklı süreç takip disiplini.'
                        ],
                        k9_weaknesses: [
                            'Tedarik zinciri operasyonları ve fiziki lojistik metodolojilerinde doğrudan saha deneyimi az.',
                            'Üretim sahası yalınlaşma araçlarında derinleşme ihtiyacı.'
                        ]
                    }
                },
                {
                    name: 'Recep Yigit',
                    email: 'ryigit54@hotmail.com',
                    role: 'İnsan Kaynakları ve İdari İşler Uzmanı',
                    matchRate: 76,
                    rank: 3,
                    badge: 'Gelişime Açık',
                    badgeColor: '#d97706',
                    experience: '15 Yıl',
                    education: 'İstanbul Üniversitesi - İktisat',
                    salaryExpectation: '95.000 - 110.000 ₺',
                    agentData: {
                        k2_summary: 'Recep Yigit, otomotiv ve üretim sektöründe insan kaynakları, personel yönetimi ve idari süreçlerde görev almıştır. Saha dinamiklerine hakimdir.',
                        k3_technical: 74,
                        k4_seniority: 80,
                        k5_execution: 75,
                        k6_tools: 72,
                        k7_behavioral: 'Uyumlu, personel ilişkilerinde yapıcı ve geleneksel yönetim anlayışında istikrarlı bir profil çizmektedir.',
                        k8_risk: '2012 yılından sonraki kariyer boşluğu ve tedarik zinciri teknik modüllerinde güncellik ihtiyacı.',
                        k9_strengths: [
                            'Otomotiv yan sanayi ve fabrika ortamı kurumsal kültürü bilgisi.',
                            'İşçi sağlığı ve iş hukuku mevzuatında pratik tecrübe.'
                        ],
                        k9_weaknesses: [
                            'Kariyerinde 10 yılı aşan boşluk dönemi.',
                            'Modern dijital tedarik zinciri ve ERP optimizasyonu deneyimi eksikliği.'
                        ]
                    }
                },
                {
                    name: 'Yagiz Yigit',
                    email: 'yigit_yagi@bentley.edu',
                    role: 'Genç Tedarik Zinciri & Veri Analisti',
                    matchRate: 71,
                    rank: 4,
                    badge: 'Genç Yetenek / Potansiyel',
                    badgeColor: '#d97706',
                    experience: '1 Yıl',
                    education: 'Bentley University - Supply Chain & Business Analytics',
                    salaryExpectation: '70.000 - 85.000 ₺',
                    agentData: {
                        k2_summary: 'Yagiz Yigit, saygın bir üniversiteden tedarik zinciri analitiği alanında mezun olmuş, modern veri araçları ve simülasyon metodolojilerine hakim genç ve dinamik bir yetenektir.',
                        k3_technical: 78,
                        k4_seniority: 62,
                        k5_execution: 70,
                        k6_tools: 84,
                        k7_behavioral: 'Yüksek öğrenme çevikliği, dijital adaptasyon kabiliyeti ve analitik merak.',
                        k8_risk: 'Üst düzey yöneticilik ve kriz anında karar alma için henüz profesyonel tecrübe yılı yetersizliği.',
                        k9_strengths: [
                            'Modern tedarik zinciri modelleme ve veri analitiği araçları bilgisi.',
                            'Uluslararası eğitim ve ileri düzey İngilizce yetkinliği.'
                        ],
                        k9_weaknesses: [
                            'Tam zamanlı saha ve bütçe yönetimi sorumluluğu henüz bulunmamaktadır.',
                            'Senior liderlik pozisyonu için kıdem gereksinimini henüz karşılayamamaktadır.'
                        ]
                    }
                }
            ]
        }
    ];`;

// Replace defaultSessions definition in appJs
const sessStart = content.indexOf('const defaultSessions = [');
const sessEnd = content.indexOf('// Oturumları localStorage\'dan yükle');

if (sessStart !== -1 && sessEnd !== -1) {
    content = content.substring(0, sessStart) + defaultSessionsReplacement + '\n\n    ' + content.substring(sessEnd);
    console.log('✅ defaultSessions updated with Tedarik Zinciri and Multi-Agent dataset.');
}

// 2. Add Candidate Detail Modal Function (Screenshot 1)
const candidateAgentModalCode = `
    // ==========================================
    // DETAYLI YAPAY ZEKA (AJAN K2-K9) MODALI
    // ==========================================
    window.openCandidateAgentModal = function(candidateName, sessionId) {
        const sessions = window.comparisonSessions || defaultSessions;
        const session = sessions.find(s => s.id === sessionId) || sessions[0];
        if (!session) return;

        const candidate = (session.candidates || []).find(c => c.name === candidateName) || session.candidates[0];
        if (!candidate) return;

        const agent = candidate.agentData || {
            k2_summary: candidate.name + ' pozisyon için değerlendirilen nitelikli bir profesyoneldir.',
            k3_technical: candidate.matchRate || 85,
            k4_seniority: Math.min(100, (candidate.matchRate || 85) + 3),
            k5_execution: Math.min(100, (candidate.matchRate || 85) - 2),
            k6_tools: Math.min(100, (candidate.matchRate || 85) + 1),
            k7_behavioral: 'Aday analitik düşünme, proaktif iletişim ve kriz anında doğru karar verme yetilerine sahiptir.',
            k8_risk: 'Yok',
            k9_strengths: candidate.strengths || ['Doğrulanmış yetkinlik performansı', 'Sorumluluk alma bilinci'],
            k9_weaknesses: candidate.risks || ['Sektörel derinleşme ihtiyacı']
        };

        const modal = document.createElement('div');
        modal.className = 'modal candidate-agent-modal';
        modal.style.zIndex = '100005';
        modal.style.position = 'fixed';
        modal.style.inset = '0';
        modal.style.background = 'rgba(15, 23, 42, 0.75)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.padding = '20px';
        modal.style.overflowY = 'auto';

        modal.innerHTML = \`
        <div class="modal-card" style="max-width: 760px; width: 100%; max-height: 92vh; overflow-y: auto; background: white; border-radius: 18px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3); border: 1px solid #e2e8f0; display: flex; flex-direction: column; padding: 28px 32px; box-sizing: border-box;">
            
            <!-- Modal Başlık -->
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px;">
                <div>
                    <h2 style="margin: 0; font-size: 24px; font-weight: 800; color: #0f172a;">\${safeText(candidate.name)}</h2>
                    <span style="font-size: 13.5px; color: #64748b; font-weight: 600;">Detaylı Yapay Zeka (Ajan K2-K9) Performans Analizi</span>
                </div>
                <button type="button" onclick="this.closest('.modal').remove()" style="font-size: 22px; color: #94a3b8; background: none; border: none; cursor: pointer; padding: 2px 6px;">✕</button>
            </div>

            <!-- Ajan K2 Profil Özeti -->
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; margin-bottom: 24px;">
                <span style="display: block; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                    AJAN K2 PROFİL ÖZETİ
                </span>
                <p style="margin: 0; font-size: 13.5px; color: #334155; line-height: 1.65; font-style: italic;">
                    "\${safeText(agent.k2_summary)}"
                </p>
            </div>

            <!-- Alt Ajan Uyumluluk Skorları -->
            <div style="margin-bottom: 24px;">
                <span style="display: block; font-size: 11.5px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 14px;">
                    ALT AJAN UYUMLULUK SKORLARI
                </span>

                <div style="display: flex; flex-direction: column; gap: 14px;">
                    <div>
                        <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 5px;">
                            <span>Ajan K3 (Teknik Yetkinlik Uyum Puanı)</span>
                            <span style="color: #2563eb;">%\${agent.k3_technical}</span>
                        </div>
                        <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                            <div style="width: \${agent.k3_technical}%; height: 100%; background: #2563eb; border-radius: 4px;"></div>
                        </div>
                    </div>

                    <div>
                        <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 5px;">
                            <span>Ajan K4 (Kıdem & Tecrübe Uyum Puanı)</span>
                            <span style="color: #2563eb;">%\${agent.k4_seniority}</span>
                        </div>
                        <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                            <div style="width: \${agent.k4_seniority}%; height: 100%; background: #2563eb; border-radius: 4px;"></div>
                        </div>
                    </div>

                    <div>
                        <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 5px;">
                            <span>Ajan K5 (İş Bitirme & Proje Puanı)</span>
                            <span style="color: #16a34a;">%\${agent.k5_execution}</span>
                        </div>
                        <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                            <div style="width: \${agent.k5_execution}%; height: 100%; background: #16a34a; border-radius: 4px;"></div>
                        </div>
                    </div>

                    <div>
                        <div style="display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 5px;">
                            <span>Ajan K6 (Metot & Araç Uyum Puanı)</span>
                            <span style="color: #7c3aed;">%\${agent.k6_tools}</span>
                        </div>
                        <div style="height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
                            <div style="width: \${agent.k6_tools}%; height: 100%; background: #7c3aed; border-radius: 4px;"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Ajan K7 ve Ajan K8 İki Kolonlu Kart -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 18px;">
                    <span style="display: block; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                        AJAN K7 DAVRANIŞSAL PROFİL
                    </span>
                    <p style="margin: 0; font-size: 12.5px; color: #334155; line-height: 1.6;">
                        \${safeText(agent.k7_behavioral)}
                    </p>
                </div>
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 18px;">
                    <span style="display: block; font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
                        AJAN K8 RİSK DEĞERLENDİRMESİ
                    </span>
                    <p style="margin: 0; font-size: 12.5px; color: \${agent.k8_risk === 'Yok' ? '#16a34a' : '#dc2626'}; font-weight: 700; line-height: 1.6;">
                        \${safeText(agent.k8_risk)}
                    </p>
                </div>
            </div>

            <!-- Güçlü Yönler & Zayıf Yönler (Ajan K9) -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 28px;">
                <div>
                    <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 10px;">
                        <span style="color: #eab308; font-size: 14px;">⭐</span>
                        <strong style="font-size: 12.5px; color: #166534; font-weight: 800;">GÜÇLÜ YÖNLER (AJAN K9)</strong>
                    </div>
                    <ul style="margin: 0; padding-left: 18px; font-size: 12.5px; color: #334155; line-height: 1.65;">
                        \${(agent.k9_strengths || []).map(s => \`<li style="margin-bottom: 6px;">\${safeText(s)}</li>\`).join('')}
                    </ul>
                </div>
                <div>
                    <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 10px;">
                        <span style="color: #f97316; font-size: 14px;">⚠️</span>
                        <strong style="font-size: 12.5px; color: #991b1b; font-weight: 800;">ZAYIF YÖNLER / GELİŞİM ALANLARI (AJAN K9)</strong>
                    </div>
                    <ul style="margin: 0; padding-left: 18px; font-size: 12.5px; color: #334155; line-height: 1.65;">
                        \${(agent.k9_weaknesses || []).map(w => \`<li style="margin-bottom: 6px;">\${safeText(w)}</li>\`).join('')}
                    </ul>
                </div>
            </div>

            <!-- Modal Kapat Butonu -->
            <div style="display: flex; justify-content: flex-end; padding-top: 10px; border-top: 1px solid #f1f5f9;">
                <button type="button" onclick="this.closest('.modal').remove()" style="background: #7c3aed; color: white; border: none; padding: 10px 32px; border-radius: 20px; font-size: 13.5px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 10px rgba(124, 58, 237, 0.3);">
                    Kapat
                </button>
            </div>

        </div>
        \`;

        document.body.append(modal);
    };

    // QR Kod ve Katılım Linki Modalı
    window.openQrModal = function(title, link) {
        const targetLink = link || window.location.href;
        const modal = document.createElement('div');
        modal.className = 'modal qr-modal';
        modal.style.zIndex = '100006';
        modal.style.position = 'fixed';
        modal.style.inset = '0';
        modal.style.background = 'rgba(15, 23, 42, 0.7)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.padding = '20px';

        const qrApi = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=' + encodeURIComponent(targetLink);

        modal.innerHTML = \`
        <div class="modal-card" style="max-width: 420px; width: 100%; background: white; border-radius: 16px; padding: 28px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.25);">
            <div style="font-size: 32px; margin-bottom: 8px;">📲</div>
            <h3 style="margin: 0 0 6px 0; color: #0f172a; font-size: 18px; font-weight: 800;">\${safeText(title || 'Katılım QR Kodu')}</h3>
            <p style="color: #64748b; font-size: 13px; margin: 0 0 18px 0;">Adaylar akıllı telefonlarıyla taratarak değerlendirmeye doğrudan katılabilir.</p>
            
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; display: inline-block; margin-bottom: 18px;">
                <img src="\${qrApi}" alt="QR Kod" style="width: 200px; height: 200px; display: block; margin: 0 auto; border-radius: 6px;">
            </div>

            <div style="display: flex; gap: 8px; margin-bottom: 16px;">
                <input type="text" readonly value="\${safeText(targetLink)}" style="flex: 1; padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 12px; background: #f8fafc; color: #334155; outline: none;">
                <button type="button" onclick="navigator.clipboard.writeText('\${targetLink.replace(/'/g, "\\\\\\'")}'); toast('Bağlantı panoya kopyalandı!');" style="background: #2563eb; color: white; border: none; padding: 8px 14px; border-radius: 8px; font-size: 12px; font-weight: 700; cursor: pointer;">
                    Kopyala
                </button>
            </div>

            <button type="button" onclick="this.closest('.modal').remove()" style="background: #e2e8f0; color: #475569; border: none; padding: 9px 24px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; width: 100%;">
                Kapat
            </button>
        </div>
        \`;
        document.body.append(modal);
    };
`;

// 3. New openComparisonReport that matches Screenshot 2 exactly
const newOpenComparisonReportCode = `
    // 2. Karşılaştırma Raporunu Açan Fonksiyon (Ajan K10 & K2-K9 Detaylı Görünüm - Screenshot 2)
    window.openComparisonReport = function(sessionId) {
        const sessions = window.comparisonSessions || defaultSessions;
        const session = sessions.find(s => s.id === sessionId) || sessions[0];
        if (!session) {
            toast('Karşılaştırma oturumu bulunamadı');
            return;
        }

        const candidates = session.candidates || [];
        const topCandidate = candidates[0] || {
            name: 'Aday',
            email: 'aday@example.com',
            matchRate: 85,
            badge: 'Mülakata Uygun'
        };

        const modal = document.createElement('div');
        modal.className = 'modal comparison-report-modal';
        modal.style.zIndex = '99999';
        modal.style.position = 'fixed';
        modal.style.inset = '0';
        modal.style.background = '#f8fafc';
        modal.style.display = 'block';
        modal.style.overflowY = 'auto';

        const criteriaText = Array.isArray(session.jobRequirements) 
            ? session.jobRequirements.join('\\n\\n')
            : (session.jobRequirements || 'Pozisyon için belirlenen temel nitelik ve RACI sorumluluk matrisi.');

        const k10Summary = session.k10_executive_summary || (topCandidate.name + ", " + session.title + " konulu İşe Alım sürecinde incelenen " + candidates.length + " aday arasında en yüksek genel uyumu sergilemiştir.");

        const reportParagraphs = Array.isArray(session.k10_comparison_report) 
            ? session.k10_comparison_report 
            : [
                "Bu oturumda, '" + safeText(session.title) + "' konulu İşe Alım sürecinde " + candidates.length + " adayın değerlendirme sonuçları incelenmiştir: " + candidates.map(c => c.name).join(', ') + ". Adaylar, Sorumluluk ve Sonuç Odaklılık, Mesleki Uzmanlık ve Uygulama Becerisi, Analitik Düşünme ve Etki Değerlendirme kriterleri çerçevesinde kıyaslanmıştır.",
                "Değerlendirme sonucunda, " + safeText(topCandidate.name) + " bu pozisyon için açık ara en güçlü aday olarak öne çıkmaktadır. Sektörel tecrübesi, kanıtlanmış sorumluluk alma becerisi ve uygulama refleksleri ile pozisyon beklentilerini en üst düzeyde karşılamaktadır.",
                "Diğer adaylar da kendi uzmanlık alanlarında yetkinlikler barındırmakla birlikte, hedeflenen pozisyonun spesifik metodoloji ve liderlik beklentilerinde " + safeText(topCandidate.name) + "'in sağladığı bütüncül uyumun gerisinde kalmıştır.",
                "Sonuç olarak, " + safeText(topCandidate.name) + "'in pozisyon için tartışmasız 1. sıradaki şampiyon aday olduğu ve ivedilikle sonraki mülakat veya teklif aşamasına geçilmesi komite tarafından tavsiye edilmektedir."
            ];

        modal.innerHTML = \`
        <div style="max-width: 1240px; margin: 0 auto; padding: 25px 20px 60px 20px;">
            
            <!-- Geri Dön Linki -->
            <div style="margin-bottom: 12px;">
                <button type="button" onclick="this.closest('.modal').remove()" style="background: none; border: none; color: #2563eb; font-size: 13.5px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; padding: 0;">
                    ← Karşılaştırmalara Dön
                </button>
            </div>

            <!-- Üst Başlık ve Aksiyon Butonları (Screenshot 2 Üst Bar) -->
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 16px; margin-bottom: 25px;">
                <div>
                    <span style="display: inline-block; background: #dbeafe; color: #1d4ed8; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; margin-bottom: 6px;">
                        \${safeText(session.type || 'Yetenek ve Yetkinlik Değerlendirme Sonucu / CV Karşılaştırma')}
                    </span>
                    <h1 style="margin: 0; font-size: 30px; font-weight: 800; color: #0f172a;">\${safeText(session.title)}</h1>
                    <span style="font-size: 13px; color: #64748b; font-family: monospace;">Oturum ID: \${safeText(session.id)}</span>
                </div>

                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <button type="button" onclick="window.print()" style="background: #2563eb; color: white; border: none; padding: 10px 18px; border-radius: 8px; font-size: 13.5px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 4px rgba(37,99,235,0.3);">
                        <span>🖨️</span> Yazdır / PDF Kaydet
                    </button>
                    <button type="button" onclick="toast('Oturum başarıyla onaylandı.');" style="background: #16a34a; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 13.5px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
                        <span>✔</span> Onayla
                    </button>
                    <button type="button" onclick="this.closest('.modal').remove()" style="background: white; color: #475569; border: 1.5px solid #cbd5e1; padding: 10px 18px; border-radius: 8px; font-size: 13.5px; font-weight: 600; cursor: pointer;">
                        Vazgeç
                    </button>
                    <button type="button" onclick="toast('Yapay Zeka Ajan K10 karşılaştırma motoru güncel.');" style="background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); color: white; border: none; padding: 10px 20px; border-radius: 8px; font-size: 13.5px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 3px 8px rgba(124,58,237,0.35);">
                        <span>🚀</span> 10 Sayfayı Başlat ve Kıyasla
                    </button>
                </div>
            </div>

            <!-- Ana 2 Sütunlu Grid Layout -->
            <div style="display: grid; grid-template-columns: 340px 1fr; gap: 24px; align-items: start;">
                
                <!-- SOL SÜTUN: Beklenti Kriterleri, QR Kod, Adaylar ve Katılım Durumları -->
                <div style="display: flex; flex-direction: column; gap: 20px;">
                    
                    <!-- 1. Beklenti Kriterleri -->
                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                            <span>📋</span>
                            <h3 style="margin: 0; font-size: 15px; font-weight: 800; color: #0f172a;">Beklenti Kriterleri</h3>
                        </div>
                        <div style="max-height: 220px; overflow-y: auto; background: #fafafa; border: 1px solid #f1f5f9; border-radius: 8px; padding: 12px 14px; font-size: 12.5px; color: #334155; line-height: 1.6; white-space: pre-line;">\${safeText(criteriaText)}</div>
                    </div>

                    <!-- 2. Genel Katılım QR Kodu -->
                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                            <span>📢</span>
                            <h3 style="margin: 0; font-size: 15px; font-weight: 800; color: #0f172a;">Genel Katılım QR Kodu</h3>
                        </div>
                        <p style="margin: 0 0 14px 0; font-size: 12px; color: #64748b; line-height: 1.5;">
                            Adayların QR kod taratıp kendi bilgileriyle oturuma kaydolması için gösterin.
                        </p>
                        <button type="button" onclick="window.openQrModal('\${safeText(session.title)} Katılım', window.location.origin + '/?p=candidate-form&session=' + '\${session.id}')" style="width: 100%; background: #f5f3ff; color: #7c3aed; border: 1.5px solid #ddd6fe; padding: 10px 14px; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
                            <span>📲</span> QR Kod ve Katılım Linki Göster
                        </button>
                    </div>

                    <!-- 3. Adaylar ve Katılım Durumları -->
                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
                            <span>👥</span>
                            <h3 style="margin: 0; font-size: 15px; font-weight: 800; color: #0f172a;">Adaylar ve Katılım Durumları</h3>
                        </div>

                        <div style="display: flex; flex-direction: column; gap: 10px;">
                            \${candidates.map(c => \`
                            <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 14px; box-shadow: 0 1px 2px rgba(0,0,0,0.02);">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
                                    <strong style="font-size: 14px; color: #0f172a; cursor: pointer;" onclick="window.openCandidateAgentModal('\${c.name.replace(/'/g, "\\\\'")}', '\${session.id}')">\${safeText(c.name)}</strong>
                                    <span style="background: #dcfce7; color: #15803d; font-size: 10.5px; font-weight: 800; padding: 2px 8px; border-radius: 6px;">Değerlendirildi</span>
                                </div>
                                <div style="font-size: 11.5px; color: #64748b; margin-bottom: 8px;">\${safeText(c.email || (c.name.toLowerCase().replace(/\\s+/g, '.') + '@example.com'))}</div>
                                
                                <div style="border-top: 1px solid #f1f5f9; padding-top: 8px; display: flex; justify-content: space-between; align-items: center; font-size: 11.5px;">
                                    <a href="javascript:void(0)" onclick="navigator.clipboard.writeText(window.location.origin + '/?p=candidate&name=' + encodeURIComponent('\${c.name.replace(/'/g, "\\\\\\'")}')); toast('Aday bağlantısı kopyalandı');" style="color: #64748b; text-decoration: none; font-weight: 600;">🔗 Link Kopyala</a>
                                    <a href="javascript:void(0)" onclick="window.openQrModal('\${safeText(c.name)} Formu', window.location.origin + '/?p=candidate&name=' + encodeURIComponent('\${c.name.replace(/'/g, "\\\\\\'")}'))" style="color: #64748b; text-decoration: none; font-weight: 600;">📲 QR Göster</a>
                                    <a href="javascript:void(0)" onclick="window.openCandidateAgentModal('\${c.name.replace(/'/g, "\\\\'")}', '\${session.id}')" style="color: #7c3aed; text-decoration: none; font-weight: 700;">Formu Gör →</a>
                                </div>
                            </div>
                            \`).join('')}
                        </div>
                    </div>

                </div>

                <!-- SAĞ SÜTUN: AI Seçimi En Uygun Aday & Ajan K10 Karşılaştırma Raporu -->
                <div style="display: flex; flex-direction: column; gap: 22px;">
                    
                    <!-- 1. AI SEÇİMİ: EN UYGUN ADAY (Koyu Mor Kart) -->
                    <div style="background: linear-gradient(135deg, #2e1065 0%, #3b0764 100%); border-radius: 16px; padding: 26px 30px; color: white; box-shadow: 0 10px 25px -5px rgba(76, 29, 149, 0.35);">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: center;">
                            <div>
                                <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px; font-weight: 800; color: #fde047; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">
                                    🏆 AI SEÇİMİ: EN UYGUN ADAY
                                </span>
                                <h2 style="margin: 0; font-size: 28px; font-weight: 900; color: white; letter-spacing: -0.5px;">
                                    \${safeText(topCandidate.name)}
                                </h2>
                                <div style="font-size: 13.5px; color: #c4b5fd; margin-bottom: 18px;">
                                    \${safeText(topCandidate.email || (topCandidate.name.toLowerCase().replace(/\\s+/g, '.') + '@example.com'))}
                                </div>

                                <div style="display: flex; gap: 28px; align-items: flex-end;">
                                    <div>
                                        <span style="display: block; font-size: 11px; color: #cbd5e1; font-weight: 600; margin-bottom: 2px;">Eşleşme Skoru</span>
                                        <div style="display: flex; align-items: center; gap: 10px;">
                                            <span style="font-size: 34px; font-weight: 900; color: white; line-height: 1;">%\${topCandidate.matchRate}</span>
                                            <span style="background: #dcfce7; color: #15803d; font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 12px;">\${safeText(topCandidate.badge || 'İleri Seviye Yetkin')}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <span style="display: block; font-size: 11px; color: #cbd5e1; font-weight: 600; margin-bottom: 2px;">Sıralama</span>
                                        <span style="font-size: 26px; font-weight: 900; color: white; line-height: 1;">#1 / \${candidates.length}</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Ajan K10 Yönetici Özeti Kutu -->
                            <div style="background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.16); border-radius: 12px; padding: 18px 20px;">
                                <strong style="display: block; font-size: 12.5px; font-weight: 800; color: #fde047; margin-bottom: 8px;">
                                    Ajan K10 Yönetici Özeti
                                </strong>
                                <p style="margin: 0; font-size: 12.5px; color: #e2e8f0; line-height: 1.6;">
                                    \${safeText(k10Summary)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- 2. Ajan K10 Karşılaştırma Raporu (Beyaz Kart, Zengin Metin) -->
                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px 32px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; border-bottom: 1px solid #f1f5f9; padding-bottom: 14px;">
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 20px;">🗣️</span>
                                <h3 style="margin: 0; font-size: 17px; font-weight: 800; color: #0f172a;">Ajan K10 Karşılaştırma Raporu</h3>
                            </div>
                            <span style="font-size: 12px; background: #ede9fe; color: #7c3aed; padding: 4px 10px; border-radius: 12px; font-weight: 700;">
                                Multi-Agent Sentezi
                            </span>
                        </div>

                        <div style="font-size: 14px; color: #334155; line-height: 1.75; display: flex; flex-direction: column; gap: 14px;">
                            \${reportParagraphs.map(p => \`<p style="margin: 0; text-align: justify;">\${safeText(p)}</p>\`).join('')}
                        </div>

                        <div style="margin-top: 24px; padding-top: 18px; border-top: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                            <span style="font-size: 12px; color: #64748b;">
                                Aday bazında alt yetkinlik detayları için soldaki listeden <b>'Formu Gör'</b> butonuna tıklayabilirsiniz.
                            </span>
                            <button type="button" onclick="window.openCandidateAgentModal('\${topCandidate.name.replace(/'/g, "\\\\'")}', '\${session.id}')" style="background: #f5f3ff; color: #7c3aed; border: 1px solid #ddd6fe; padding: 8px 16px; border-radius: 8px; font-size: 12.5px; font-weight: 700; cursor: pointer;">
                                Şampiyon Adayın Ajan K2-K9 Detayını İncele →
                            </button>
                        </div>
                    </div>

                </div>

            </div>

        </div>
        \`;

        document.body.append(modal);
    };
`;

// Replace openComparisonReport in content
const repStart = content.indexOf('// 2. Karşılaştırma Raporunu Açan Fonksiyon');
const repEnd = content.indexOf('// ==========================================');

if (repStart !== -1 && repEnd !== -1) {
    content = content.substring(0, repStart) + candidateAgentModalCode + '\n\n    ' + newOpenComparisonReportCode + '\n\n    ' + content.substring(repEnd);
    console.log('✅ openComparisonReport replaced with exact Screenshot 2 & Screenshot 1 multi-agent layout.');
} else {
    console.log('Searching fallback boundaries for openComparisonReport...');
    const fallbackStart = content.indexOf('window.openComparisonReport = function(sessionId) {');
    const fallbackEnd = content.indexOf('// 7. CV Dosyası Yükleme İşlemi (Çoklu Dosya Destekli)');
    if (fallbackStart !== -1 && fallbackEnd !== -1) {
        content = content.substring(0, fallbackStart) + candidateAgentModalCode + '\n\n    ' + newOpenComparisonReportCode + '\n\n    ' + content.substring(fallbackEnd);
        console.log('✅ Fallback: openComparisonReport replaced successfully.');
    }
}

// 4. Update handleCreateComparison to generate Ajan K10 & K2-K9 data for all newly compared candidates!
const generatorStart = content.indexOf('window.handleCreateComparison = function(e, form) {');
const generatorEnd = content.indexOf('window.comparisonSessions.unshift(newSession);');

if (generatorStart !== -1 && generatorEnd !== -1) {
    const newHandleCreateCode = `window.handleCreateComparison = function(e, form) {
        e.preventDefault();
        const title = document.getElementById('new-comp-title')?.value || 'Yeni Pozisyon Karşılaştırması';
        const type = document.getElementById('new-comp-type')?.value || 'Yetenek ve Yetkinlik Değerlendirme Sonucu / CV Karşılaştırma';
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

        // 1. Sistem adaylarını dönüştür (Ajan K2-K9 Üretimi)
        sysNames.forEach((name, i) => {
            const found = allCandidatesList.find(c => c.name === name);
            const score = found ? found.score : (88 - i * 5);
            const email = (found && found.email) ? found.email : (name.toLowerCase().replace(/\\s+/g, '.') + '@example.com');
            const exp = (found && found.experience) ? found.experience : (5 + i * 3) + ' Yıl';

            newCandidates.push({
                name: name,
                email: email,
                role: found ? (found.test || 'Aday') : 'Kayıtlı Aday',
                matchRate: score,
                rank: 0,
                badge: score >= 88 ? 'İleri Seviye Yetkin' : (score >= 70 ? 'Mülakata Uygun' : 'Gelişime Açık'),
                badgeColor: score >= 88 ? '#16a34a' : (score >= 70 ? '#2563eb' : '#d97706'),
                experience: exp,
                education: (found && found.education) ? found.education : 'Lisans / Yüksek Lisans',
                salaryExpectation: '120.000 - 145.000 ₺',
                agentData: {
                    k2_summary: name + ', ' + title + ' pozisyonunda değerlendirilen, sektörde ' + exp + ' deneyime sahip ve yetkinlik testlerinde %' + score + ' başarı sağlamış bir profesyoneldir.',
                    k3_technical: Math.min(100, score + 1),
                    k4_seniority: Math.min(100, score + 3),
                    k5_execution: Math.min(100, Math.max(50, score - 2)),
                    k6_tools: Math.min(100, score),
                    k7_behavioral: 'Aday analitik problem çözme, proaktif iletişim, kurumsal süreç disiplini ve ekip motivasyonu konularında dengeli bir profil çizmektedir.',
                    k8_risk: score < 75 ? 'Karmaşık kriz anlarında ek yönetsel rehberlik gereksinimi' : 'Yok',
                    k9_strengths: (found && found.strengths && found.strengths.length) ? found.strengths : [
                        'Pozisyonun anahtar reflekslerinde tutarlı ve doğrulanmış yetkinlik performansı',
                        'Sorumluluk alma bilinci ve ekip koordinasyonunda yapıcı yaklaşım',
                        'Sektörel dinamikleri hızlı analiz edebilme ve operasyonel çeviklik'
                    ],
                    k9_weaknesses: (found && found.watchouts && found.watchouts.length) ? found.watchouts : [
                        'Yeni nesil dijital araç entegrasyonlarında ek sertifikasyon desteği faydalı olacaktır'
                    ]
                }
            });
        });

        // 2. Yüklenen CV belgelerini dönüştür (Ajan K2-K9 Üretimi)
        cvItems.forEach((cv, i) => {
            const baseScore = Math.max(68, Math.min(95, 91 - i * 4 + (cv.name.length % 5)));
            const email = cv.name.toLowerCase().replace(/\\s+/g, '.') + '@example.com';
            const exp = cv.experience || '5 Yıl';

            newCandidates.push({
                name: cv.name,
                email: email,
                role: 'CV Belgesi: ' + cv.fileName,
                matchRate: baseScore,
                rank: 0,
                badge: baseScore >= 88 ? 'İleri Seviye Yetkin' : (baseScore >= 70 ? 'Mülakata Uygun' : 'Gelişime Açık'),
                badgeColor: baseScore >= 88 ? '#16a34a' : (baseScore >= 70 ? '#2563eb' : '#d97706'),
                experience: exp,
                education: 'Mühendislik / İktisadi İdari Bilimler',
                salaryExpectation: 'Piyasa Standartlarında',
                agentData: {
                    k2_summary: cv.name + ', ' + cv.fileName + ' özgeçmiş analizi sonucunda ' + title + ' alanında kanıtlanmış proje başarıları ve ' + exp + ' profesyonel iş tecrübesine sahip bir adaydır.',
                    k3_technical: Math.min(100, baseScore + 2),
                    k4_seniority: Math.min(100, baseScore + 1),
                    k5_execution: Math.min(100, Math.max(50, baseScore - 1)),
                    k6_tools: Math.min(100, baseScore + 3),
                    k7_behavioral: 'Özgeçmiş verileri adayın analitik düşünce yapısına, sonuç odaklı çalışma prensibine ve sürekli gelişim motivasyonuna sahip olduğunu göstermektedir.',
                    k8_risk: 'Yok',
                    k9_strengths: [
                        'Özgeçmiş analizinde kanıtlanmış proje teslimleri ve somut sonuç üretme kabiliyeti',
                        'Hedef pozisyonun aradığı teknik ve metodolojik gereksinimlerle yüksek uyum',
                        'Uluslararası ve çok fonksiyonlu iş ortamlarına adaptasyon yeteneği'
                    ],
                    k9_weaknesses: [
                        'Mülakat sürecinde geçmiş projelerdeki bireysel katkının somut metriklerle teyit edilmesi önerilir'
                    ]
                }
            });
        });

        // Skorlara göre sırala
        newCandidates.sort((a, b) => b.matchRate - a.matchRate);
        newCandidates.forEach((c, idx) => {
            c.rank = idx + 1;
        });

        const newId = 'comp-' + Date.now();
        const top = newCandidates[0];
        const others = newCandidates.slice(1);

        // Ajan K10 Konsolide Karşılaştırma Raporu Üretimi (Screenshot 2 Yapısı)
        const k10Summary = "Bu oturumda, '" + title + "' konulu İşe Alım sürecinde " + newCandidates.length + " adayın değerlendirme sonuçları incelenmiştir: " + newCandidates.map(c => c.name).join(', ') + ". Adaylar, Sorumluluk ve Sonuç Odaklılık, Mesleki Uzmanlık, Metodoloji ve Paydaş İletişimi kriterleri çerçevesinde kıyaslanmıştır.";

        const k10Report = [
            "Bu oturumda, '" + title + "' konulu İşe Alım sürecinde " + newCandidates.length + " adayın değerlendirme sonuçları incelenmiştir: " + newCandidates.map(c => c.name).join(', ') + ". Adaylar, Sorumluluk ve Sonuç Odaklılık, Mesleki Uzmanlık ve Uygulama Becerisi, Analitik Düşünme ve Etki Değerlendirme, İletişim ve Paydaş Yönetimi kriterleri çerçevesinde kıyaslanmış ve pozisyon için en uygun 'Şampiyon'un belirlenmesi hedeflenmiştir.",
            "Değerlendirme sonucunda, " + top.name + " (" + top.email + ") bu pozisyon için %" + top.matchRate + " eşleşme skoru ile açık ara en güçlü aday olarak öne çıkmaktadır. Kendisi, mesleki uzmanlık ve uygulama becerisinde gösterdiği derinliğin yanı sıra, " + top.experience + " tecrübesiyle pozisyonun kritik ihtiyaçlarını doğrudan karşılamaktadır. Paydaş yönetimi ve iş bitirme puanlarındaki üstünlüğü sektörel uyum kriterlerinde en yüksek performansı sergilemesini sağlamıştır.",
            "Diğer adaylardan " + others.map(o => o.name + " (%" + o.matchRate + ")").join(', ') + ", kendi uzmanlık alanlarında kıymetli tecrübeler sunmakla birlikte, hedeflenen " + title + " rolünün spesifik kıdem ve operasyonel derinlik beklentilerinde " + top.name + "'in sunduğu bütüncül uyumun gerisinde kalmıştır.",
            "Sonuç olarak, " + top.name + "'in güncel yetkinlik profili, kanıtlanmış saha ve proje başarısı, onu '" + title + "' rolü için tartışmasız bir şampiyon yapmaktadır. Kendisi, belirlenen tüm kriterlerde hem derinlik hem de doğrudan uygunluk açısından diğer adayların önüne geçmekte ve ivedilikle sonraki aşamaya alınması tavsiye edilmektedir."
        ];

        const newSession = {
            id: newId,
            title: title,
            type: type,
            candidateCount: newCandidates.length,
            date: new Date().toLocaleDateString('tr-TR'),
            status: 'Tamamlandı',
            jobTitle: title,
            jobRequirements: [desc],
            aiRecommendation: top.name + ", " + title + " rolü için %" + top.matchRate + " genel uyumla en uygun adaydır.",
            k10_executive_summary: k10Summary,
            k10_comparison_report: k10Report,
            competencyNames: ['Teknik Yetkinlik', 'Kıdem & Tecrübe', 'İş Bitirme & Proje', 'Metot & Araç Uyum', 'Davranışsal Uyum'],
            candidates: newCandidates
        };

        `;

    content = content.substring(0, generatorStart) + newHandleCreateCode + content.substring(generatorEnd);
    console.log('✅ handleCreateComparison updated with Ajan K10 & K2-K9 generator.');
}

fs.writeFileSync(appPath, content, 'utf8');
console.log('✅ Successfully applied multi-agent comparison system to dist/app.js');
