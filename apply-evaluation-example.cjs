const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'dist', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');

console.log('Dist app.js size:', app.length);

// 1. Update candidateResults array: update or add Süper Yönetici sample
const oldCandidateRegex = /{\s*name:\s*'Süper Yönetici'[\s\S]*?detailedReport:\s*\[[\s\S]*?\]\s*}/;

const newSuperAdminCandidate = `{name:'Süper Yönetici',email:'bilgehanveral@gmail.com',test:'MÜDÜR YARDIMCISI',department:'Tekstil, Hazır Giyim ve Deri Endüstrisi',detail:'Perakende Ticaret',score:100,outcome:'Şiddetle Tavsiye Edilir',date:'12.09.2026',time:'14:05:42',
  summary:'Yetenek ve Yetkinlik Değerlendirme Sonucu: Şiddetle Tavsiye Edilir. Adayın tüm ölçülen yetkinliklerde sergilediği kusursuz performans, "MÜDÜR YARDIMCISI / Perakende Ticaret" pozisyonu için aranan tüm niteliklere fazlasıyla sahip olduğunu kanıtlamaktadır. Kendisi, karmaşık perakende ortamında anında değer katabilecek, stratejik düşünebilen ve sonuç odaklı bir profesyoneldir.',
  psychologicalProfile:'Aday, "MÜDÜR YARDIMCISI / Perakende Ticaret" pozisyonu için kritik öneme sahip Analitik Düşünme, Problem Çözme, Karar Verme, İletişim, Sonuç Odaklılık, İnisiyatif Alma, Süreç Odaklılık, Stratejik Düşünme, Vizyoner Liderlik ve İlişki Yönetimi yetkinliklerinin tamamında %100 başarı göstererek olağanüstü bir performans sergilemiştir. Özellikle müşteri geri bildirimlerini analiz etme, kişiselleştirilmiş çözümler sunma ve kurumsal standartlar geliştirme konularındaki yetkinliği dikkat çekicidir. Bu sonuçlar, adayın perakende sektöründeki karmaşık durumları anlama, etkili çözümler üretme ve stratejik kararlar alma konusundaki üstün kapasitesini net bir şekilde ortaya koymaktadır.',
  errorDetector:'Adayın sınavdaki tüm sorulara doğru yanıt vermesi nedeniyle herhangi bir refleks zafiyeti veya hata tespit edilmemiştir. Her bir soruya verilen cevaplar, adayın ölçülen yetkinlikleri kavramsal ve pratik düzeyde eksiksiz anladığını göstermektedir. Bu durum, adayın baskı altında bile tutarlı ve doğru kararlar verebilme yeteneğini ve analitik düşünme süreçlerindeki sağlamlığını ortaya koymaktadır.',
  benchmark:'Adayın %100\\'lük genel başarı skoru, pozisyon için belirlenen ideal profilin çok üzerinde bir performansı temsil etmektedir. Bu sonuç, adayın sadece beklentileri karşılamakla kalmadığını, aynı zamanda perakende sektöründeki bir Müdür Yardımcısından beklenen tüm yetkinlikleri en üst düzeyde içselleştirdiğini ve uygulayabildiğini göstermektedir. Sektördeki benzer pozisyonlar için benchmark analizlerinde, adayın bu seviyedeki tutarlı başarısı onu potansiyel lider adayları arasında zirveye yerleştirmektedir.',
  mentorDecision:'Adayın bu değerlendirmede tüm yetkinliklerde %100 başarı göstermesi nedeniyle doğrudan bir gelişim alanı belirlenmemiştir. Ancak sürekli öğrenme ve gelişim perspektifiyle, adayın mevcut üstün yetkinliklerini daha da derinleştirmesi önerilir. Özellikle, perakende sektöründeki dijital dönüşüm ve yapay zeka destekli müşteri analitiği konularında ileri düzey eğitimler alarak bilgi birikimini artırabilir. Ayrıca, mağaza dışı kurumsal ağlarda liderlik rolü üstlenebileceği çapraz fonksiyonlu projelere katılım sağlamak, stratejik vizyonunu genişletmesine yardımcı olacaktır. Gelecekteki üst düzey yöneticilik pozisyonları için mentörlük programlarına dahil olması ve uluslararası perakende trendlerini takip etmesi tavsiye edilir.',
  competencies:[
    {name:'Analitik Düşünme',category:'BİLİŞSEL',score:100,target:60,levelName:'Seviye 5 (Örnek)',levelDesc:'Kritik problemlerde örnek düzeydedir, kurumsal standart geliştirir.'},
    {name:'Problem Çözme',category:'BİLİŞSEL',score:100,target:60,levelName:'Seviye 5 (Örnek)',levelDesc:'Kritik işlerde yöntem geliştirir, kuruma yaygınlaştırır.'},
    {name:'Karar Verme',category:'BİLİŞSEL',score:100,target:60,levelName:'Seviye 5 (Örnek)',levelDesc:'Çok boyutlu belirsizlikte stratejik ve hızlı kararlar alır.'},
    {name:'İletişim ve Müzakere',category:'TEMEL',score:100,target:70,levelName:'Seviye 5 (Örnek)',levelDesc:'Paydaşlar ve ekipler arası köprü kurarak mutabakat sağlar.'},
    {name:'Vizyoner Liderlik',category:'YÖNETSEL',score:100,target:65,levelName:'Seviye 5 (Örnek)',levelDesc:'Ekipleri ortak amaca yönlendirir, yüksek motivasyonla yönetir.'},
    {name:'Süreç ve Perakende Operasyonu',category:'FONKSİYONEL',score:100,target:75,levelName:'Seviye 5 (Örnek)',levelDesc:'Uçtan uca mağaza ve tedarik süreçlerini optimize eder.'}
  ],
  detailedReport: [
      {question: 'Müşteri memnuniyetsizliği ve iade krizinde ilk refleksiniz ne olur?', answer: 'Müşteriyi aktif dinler, anında telafi sunar ve kök neden analiziyle sistemik önlem alırım.', status: 'positive', seconds: 28},
      {question: 'Mağaza içi stok tutarsızlığı tespit edildiğinde süreci nasıl yönetirsiniz?', answer: 'ERP ve sayım eşleştirmesi yapar, barkod/sevkiyat izleme mekanizmasını güncellerim.', status: 'positive', seconds: 34},
      {question: 'Hedef baskısı altında ekip motivasyonunu nasıl sağlarsınız?', answer: 'Şeffaf KPI hedefleri koyar, başarıyı takdir eder ve mikro-engelleri kaldırırım.', status: 'positive', seconds: 40}
  ]}`;

if (oldCandidateRegex.test(app)) {
    app = app.replace(oldCandidateRegex, newSuperAdminCandidate);
    console.log('Süper Yönetici candidate data updated successfully!');
} else {
    console.log('oldCandidateRegex did not match, checking why...');
}

// 2. Update window.showCandidateReport to route to reportDetailPage
const oldShowCandidateReport = `function showCandidateReport(index){const r=candidateResults[index];const modal=document.createElement('div');modal.className='modal';modal.innerHTML=\`<div class="modal-card report-modal"><div class="modal-head"><div><span class="eyebrow">AI DETAYLI RAPOR</span><h2>\${r.name}</h2><p class="sub">\${r.test} · \${r.department}</p></div><button onclick="this.closest(\\\'.modal\\\').remove()">×</button></div><div class="report-score"><b>%\${r.score}</b><span>\${r.outcome}</span></div><div id="report-content-\${index}" style="white-space: pre-wrap; max-height: 400px; overflow-y: auto; padding-right:10px;">\${r.summary}</div><div class="report-actions"><button class="secondary" onclick="window.printReport('report-content-\${index}', '\${r.name}')">PDF İndir</button><button class="primary" onclick="this.closest(\\\'.modal\\\').remove()">Kapat</button></div></div>\`;document.body.append(modal)}`;

const newShowCandidateReport = `window.showCandidateReport = function(index) {
    state.page = 'report_detail';
    state.reportIndex = index;
    render();
};
function showCandidateReport(index) {
    window.showCandidateReport(index);
}`;

if (app.includes(oldShowCandidateReport)) {
    app = app.replace(oldShowCandidateReport, newShowCandidateReport);
    console.log('showCandidateReport updated to open report_detail view!');
}

// 3. Update reportDetailPage in PATCH 19 to match the screenshot exactly
const newReportDetailPageCode = `    // 6. reportDetailPage: Tamamen zengin, profesyonel değerlendirme örneği tasarımı
    window.setRadarCategory = function(cat) {
        state.radarCategory = cat;
        const appEl = document.getElementById('app');
        if (appEl && state.page === 'report_detail') {
            appEl.innerHTML = window.reportDetailPage();
        }
    };

    window.reportDetailPage = function() {
        const list = (typeof candidateResults !== 'undefined' ? candidateResults : window.candidateResults) || [];
        const r = list[state.reportIndex] || list[0];
        if (!r) { go('results'); return ''; }

        const activeCat = state.radarCategory || 'ALL';

        const scoreColor = (r.score >= 80) ? '#16a34a' : (r.score >= 50 ? '#d97706' : '#dc2626');
        const badgeColor = (r.score >= 80) ? '#dcfce7' : (r.score >= 50 ? '#fef3c7' : '#fee2e2');
        const badgeTextColor = (r.score >= 80) ? '#16a34a' : (r.score >= 50 ? '#b45309' : '#b91c1c');
        const scoreText = (r.score >= 80) ? 'İleri Seviye Yetkin' : (r.score >= 50 ? 'Gelişime Açık / Beklenen' : 'Yetkin Olmayan');

        const roleTitle = safeText(r.test || 'MÜDÜR YARDIMCISI');
        const sectorTitle = safeText(r.department || 'Tekstil, Hazır Giyim ve Deri Endüstrisi');
        const subTitle = safeText(r.detail || 'Perakende Ticaret');

        // Yetkinlik listesi (adayda tanımlıysa oradan, değilse dinamik)
        const defaultCompetencies = [
            { name: 'Analitik Düşünme', category: 'BİLİŞSEL', score: r.score >= 80 ? 100 : r.score, target: 60, levelName: r.score >= 80 ? 'Seviye 5 (Örnek)' : 'Seviye 3 (Orta)', levelDesc: 'Kritik problemlerde örnek düzeydedir, kurumsal standart geliştirir.' },
            { name: 'Problem Çözme', category: 'BİLİŞSEL', score: r.score >= 80 ? 100 : Math.min(100, r.score + 5), target: 60, levelName: r.score >= 80 ? 'Seviye 5 (Örnek)' : 'Seviye 3 (Orta)', levelDesc: 'Kritik işlerde yöntem geliştirir, kuruma yaygınlaştırır.' },
            { name: 'Karar Verme', category: 'BİLİŞSEL', score: r.score >= 80 ? 100 : Math.max(20, r.score - 5), target: 60, levelName: r.score >= 80 ? 'Seviye 5 (Örnek)' : 'Seviye 3 (Orta)', levelDesc: 'Çok boyutlu belirsizlikte stratejik ve hızlı kararlar alır.' },
            { name: 'İletişim ve Müzakere', category: 'TEMEL', score: r.score >= 80 ? 100 : Math.min(100, r.score + 10), target: 70, levelName: r.score >= 80 ? 'Seviye 5 (Örnek)' : 'Seviye 4 (İleri)', levelDesc: 'Paydaşlar ve ekipler arası köprü kurarak mutabakat sağlar.' },
            { name: 'Vizyoner Liderlik', category: 'YÖNETSEL', score: r.score >= 80 ? 100 : r.score, target: 65, levelName: r.score >= 80 ? 'Seviye 5 (Örnek)' : 'Seviye 3 (Orta)', levelDesc: 'Ekipleri ortak amaca yönlendirir, yüksek motivasyonla yönetir.' },
            { name: 'Süreç ve Perakende Operasyonu', category: 'FONKSİYONEL', score: r.score >= 80 ? 100 : Math.max(30, r.score - 10), target: 75, levelName: r.score >= 80 ? 'Seviye 5 (Örnek)' : 'Seviye 3 (Orta)', levelDesc: 'Uçtan uca mağaza ve tedarik süreçlerini optimize eder.' }
        ];

        const compList = (r.competencies && r.competencies.length > 0) ? r.competencies : defaultCompetencies;
        const filteredCompList = activeCat === 'ALL' ? compList : compList.filter(c => c.category === activeCat);

        // Kategori skorları hesaplama
        const getCatScore = (catName) => {
            const items = compList.filter(c => c.category === catName);
            if (!items.length) return r.score;
            return Math.round(items.reduce((acc, c) => acc + c.score, 0) / items.length);
        };
        const sBilisel = getCatScore('BİLİŞSEL');
        const sTeknik = getCatScore('TEKNİK') || getCatScore('FONKSİYONEL');
        const sTemel = getCatScore('TEMEL');
        const sYonetsel = getCatScore('YÖNETSEL');
        const sFonksiyonel = getCatScore('FONKSİYONEL');

        // Radar poligon noktaları (Pentagon tabanlı matematiksel koordinatlar, 50,50 merkez, R=38)
        // 5 tepe: 0: Yukarı (BİLİŞSEL), 1: Sağ Üst (TEKNİK), 2: Sağ Alt (TEMEL), 3: Sol Alt (YÖNETSEL), 4: Sol Üst (FONKSİYONEL)
        const angles = [-90, -18, 54, 126, 198]; // derece
        const getPoint = (score, angleDeg) => {
            const rad = (angleDeg * Math.PI) / 180;
            const dist = (score / 100) * 36;
            const x = 50 + dist * Math.cos(rad);
            const y = 50 + dist * Math.sin(rad);
            return \`\${x.toFixed(1)},\${y.toFixed(1)}\`;
        };
        const currentPoints = [
            getPoint(sBilisel, angles[0]),
            getPoint(sTeknik, angles[1]),
            getPoint(sTemel, angles[2]),
            getPoint(sYonetsel, angles[3]),
            getPoint(sFonksiyonel, angles[4])
        ].join(' ');

        const targetPoints = [
            getPoint(60, angles[0]),
            getPoint(65, angles[1]),
            getPoint(70, angles[2]),
            getPoint(65, angles[3]),
            getPoint(75, angles[4])
        ].join(' ');

        // Metinler
        const evaluationHeadline = r.summary || \`Yetenek ve Yetkinlik Değerlendirme Sonucu: \${r.outcome || 'Olumlu'}. Adayın tüm ölçülen yetkinliklerde sergilediği performans, "\${roleTitle} / \${subTitle}" pozisyonu için aranan nitelikleri karşılamaktadır.\`;
        
        const psychProfileText = r.psychologicalProfile || \`Aday, "\${roleTitle} / \${subTitle}" pozisyonu için kritik öneme sahip Analitik Düşünme, Problem Çözme, Karar Verme, İletişim, Sonuç Odaklılık, İnisiyatif Alma, Süreç Odaklılık, Stratejik Düşünme, Vizyoner Liderlik ve İlişki Yönetimi yetkinliklerinin tamamında %\${r.score} başarı göstererek kapsamlı bir performans sergilemiştir. Özellikle müşteri geri bildirimlerini analiz etme, kişiselleştirilmiş çözümler sunma ve kurumsal standartlar geliştirme konularındaki yetkinliği dikkat çekicidir. Bu sonuçlar, adayın karmaşık durumları anlama, etkili çözümler üretme ve stratejik kararlar alma konusundaki üstün kapasitesini net bir şekilde ortaya koymaktadır.\`;

        const errorDetectorText = r.errorDetector || (r.score >= 80 
            ? 'Adayın sınavdaki tüm sorulara doğru yanıt vermesi nedeniyle herhangi bir refleks zafiyeti veya hata tespit edilmemiştir. Her bir soruya verilen cevaplar, adayın ölçülen yetkinlikleri kavramsal ve pratik düzeyde eksiksiz anladığını göstermektedir. Bu durum, adayın baskı altında bile tutarlı ve doğru kararlar verebilme yeteneğini ve analitik düşünme süreçlerindeki sağlamlığını ortaya koymaktadır.'
            : \`Adayın yanlış yanıt verdiği sorular incelendiğinde; \${roleTitle} pozisyonuna ilişkin kritik karar anlarında yüzeysel çözümlere yönelme ve kök neden analizine yeterince inememe refleksleri gözlemlenmiştir. Kriz anında sakin ve metodik ilerleme mekanizmalarının geliştirilmesi önerilmektedir.\`);

        const benchmarkText = r.benchmark || \`Adayın %\${r.score}'lük genel başarı skoru, pozisyon için belirlenen ideal profilin üzerinde bir performansı temsil etmektedir. Bu sonuç, adayın sadece beklentileri karşılamakla kalmadığını, aynı zamanda \${subTitle} alanındaki bir \${roleTitle} pozisyonundan beklenen tüm yetkinlikleri en üst düzeyde içselleştirdiğini ve uygulayabildiğini göstermektedir. Sektördeki benzer pozisyonlar için benchmark analizlerinde, adayın bu seviyedeki tutarlı başarısı onu potansiyel lider adayları arasında zirveye yerleştirmektedir.\`;

        const mentorDecisionText = r.mentorDecision || \`Adayın bu değerlendirmede sergilediği %\${r.score} başarı göz önüne alındığında, sürekli öğrenme ve gelişim perspektifiyle mevcut üstün yetkinliklerini daha da derinleştirmesi önerilir. Özellikle, perakende ve teknoloji sektöründeki dijital dönüşüm ve yapay zeka destekli müşteri analitiği konularında ileri düzey eğitimler alarak bilgi birikimini artırabilir. Ayrıca, kurum dışı ve çapraz fonksiyonlu projelere katılım sağlamak, stratejik vizyonunu genişletmesine yardımcı olacaktır. Gelecekteki üst düzey yöneticilik pozisyonları için mentörlük programlarına dahil olması tavsiye edilir.\`;

        let html = \`
        <!-- Üst Bar: Navigasyon ve Yazdır Butonu -->
        <div style="background: #0f172a; padding: 14px 30px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b;">
            <button onclick="go('results')" style="background: transparent; border: none; color: white; font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 18px;">←</span> \${safeText(r.name)}
            </button>
            <div style="display:flex; gap:10px;">
                <button onclick="window.print()" style="background: #2563eb; color: white; border: none; padding: 8px 18px; border-radius: 8px; font-size: 13.5px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 2px 4px rgba(37,99,235,0.3);">
                    🖨️ Yazdır / PDF İndir
                </button>
            </div>
        </div>

        <div style="padding: 30px; background: #f8fafc; min-height: calc(100vh - 100px); max-width: 1200px; margin: 0 auto;">
            
            <!-- 1. Üst Değerlendirme Özeti Kartı -->
            <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 35px; display: flex; gap: 35px; align-items: center; margin-bottom: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04); flex-wrap:wrap;">
                
                <!-- Sol Kolon: Aday Bilgisi -->
                <div style="flex: 0 0 280px;">
                    <h1 style="margin: 0 0 4px 0; font-size: 32px; font-weight: 800; color: #0f172a; line-height: 1.2;">\${safeText(r.name)}</h1>
                    <p style="margin: 0 0 16px 0; color: #64748b; font-size: 15px;">\${safeText(r.email)}</p>
                    
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <div style="background: #f1f5f9; padding: 6px 14px; border-radius: 20px; font-size: 12.5px; color: #334155; font-weight: 500; width: max-content;">
                            Sektör: \${sectorTitle}
                        </div>
                        <div style="background: #f1f5f9; padding: 6px 14px; border-radius: 20px; font-size: 12.5px; color: #334155; font-weight: 500; width: max-content;">
                            Rol: \${roleTitle}
                        </div>
                    </div>
                </div>

                <!-- Orta Kolon: Genel Skor -->
                <div style="flex: 0 0 170px; text-align: center; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; padding: 0 20px;">
                    <span style="font-size: 12px; font-weight: 700; color: #64748b; display: block; margin-bottom: 6px; letter-spacing: 0.5px;">GENEL SKOR</span>
                    <strong style="font-size: 56px; font-weight: 800; color: #0f172a; line-height: 1; display: block; margin-bottom: 10px;">%\${r.score}</strong>
                    <span style="display: inline-block; padding: 5px 14px; border-radius: 20px; font-size: 12px; font-weight: 700; background: \${badgeColor}; color: \${badgeTextColor};">
                        \${scoreText}
                    </span>
                </div>

                <!-- Sağ Kolon: Değerlendirme Sonucu Metni (Yeşil Başlık) -->
                <div style="flex: 1 1 360px; padding-left: 10px;">
                    <span style="font-size: 12px; font-weight: 700; color: #64748b; display: block; margin-bottom: 8px; text-align: center; letter-spacing: 0.5px;">DEĞERLENDİRME SONUCU</span>
                    <p style="font-size: 18px; font-weight: 800; color: \${scoreColor}; text-align: center; line-height: 1.45; margin: 0;">
                        \${evaluationHeadline}
                    </p>
                </div>
            </div>

            <!-- 2. Yetkinlik Ölçüm & Radar Analizi -->
            <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04); margin-bottom: 25px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 18px; margin-bottom: 25px; flex-wrap: wrap; gap: 15px;">
                    <div>
                        <h2 style="margin: 0 0 4px 0; font-size: 20px; font-weight: 700; color: #0f172a;">Yetkinlik Ölçüm & Radar Analizi</h2>
                        <p style="margin: 0; color: #64748b; font-size: 13.5px;">Kategori bazlı radar grafik ve hedef & mevcut durum analizi</p>
                    </div>
                    <!-- Kategori Filtre Butonları -->
                    <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                        <button onclick="setRadarCategory('ALL')" style="border: none; padding: 6px 16px; border-radius: 20px; font-size: 12.5px; font-weight: 700; cursor: pointer; \${activeCat==='ALL'?'background:#2563eb; color:white;':'background:#f1f5f9; color:#64748b;'}">Genel Özet</button>
                        <button onclick="setRadarCategory('BİLİŞSEL')" style="border: none; padding: 6px 14px; border-radius: 20px; font-size: 12.5px; font-weight: 700; cursor: pointer; \${activeCat==='BİLİŞSEL'?'background:#2563eb; color:white;':'background:#f1f5f9; color:#64748b;'}">BİLİŞSEL</button>
                        <button onclick="setRadarCategory('TEKNİK')" style="border: none; padding: 6px 14px; border-radius: 20px; font-size: 12.5px; font-weight: 700; cursor: pointer; \${activeCat==='TEKNİK'?'background:#2563eb; color:white;':'background:#f1f5f9; color:#64748b;'}">TEKNİK</button>
                        <button onclick="setRadarCategory('TEMEL')" style="border: none; padding: 6px 14px; border-radius: 20px; font-size: 12.5px; font-weight: 700; cursor: pointer; \${activeCat==='TEMEL'?'background:#2563eb; color:white;':'background:#f1f5f9; color:#64748b;'}">TEMEL</button>
                        <button onclick="setRadarCategory('YÖNETSEL')" style="border: none; padding: 6px 14px; border-radius: 20px; font-size: 12.5px; font-weight: 700; cursor: pointer; \${activeCat==='YÖNETSEL'?'background:#2563eb; color:white;':'background:#f1f5f9; color:#64748b;'}">YÖNETSEL</button>
                        <button onclick="setRadarCategory('FONKSİYONEL')" style="border: none; padding: 6px 14px; border-radius: 20px; font-size: 12.5px; font-weight: 700; cursor: pointer; \${activeCat==='FONKSİYONEL'?'background:#2563eb; color:white;':'background:#f1f5f9; color:#64748b;'}">FONKSİYONEL</button>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1.6fr; gap: 35px; align-items: start;">
                    <!-- Sol Kolon: Radar Grafik Kartı -->
                    <div style="background: #ffffff; border-radius: 12px; padding: 20px; text-align: center; border: 1px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 350px;">
                        <h3 style="margin: 0 0 15px 0; font-size: 13.5px; font-weight: 700; color: #0f172a;">Kategori Bazlı Genel Özet</h3>
                        
                        <div style="position: relative; width: 230px; height: 230px;">
                            <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; overflow: visible;">
                                <!-- Pentagon Grid Halkaları (Dıştan İçe) -->
                                <polygon points="50,14 84,26 71,67 29,67 16,26" fill="none" stroke="#cbd5e1" stroke-width="0.8"/>
                                <polygon points="50,23 75,32 66,63 34,63 25,32" fill="none" stroke="#e2e8f0" stroke-width="0.8"/>
                                <polygon points="50,32 67,39 60,60 40,60 33,39" fill="none" stroke="#e2e8f0" stroke-width="0.8"/>
                                <polygon points="50,41 58,45 55,56 45,56 42,45" fill="none" stroke="#f1f5f9" stroke-width="0.8"/>
                                
                                <!-- Eksen Çizgileri -->
                                <line x1="50" y1="50" x2="50" y2="14" stroke="#cbd5e1" stroke-width="0.8"/>
                                <line x1="50" y1="50" x2="84" y2="26" stroke="#cbd5e1" stroke-width="0.8"/>
                                <line x1="50" y1="50" x2="71" y2="67" stroke="#cbd5e1" stroke-width="0.8"/>
                                <line x1="50" y1="50" x2="29" y2="67" stroke="#cbd5e1" stroke-width="0.8"/>
                                <line x1="50" y1="50" x2="16" y2="26" stroke="#cbd5e1" stroke-width="0.8"/>
                                
                                <!-- Hedeflenen Seviye Poligonu (Gri Kesikli Çizgi) -->
                                <polygon points="\${targetPoints}" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="2,2"/>
                                
                                <!-- Adayın Mevcut Durum Poligonu (Mavi Dolgulu) -->
                                <polygon points="\${currentPoints}" fill="rgba(37, 99, 235, 0.3)" stroke="#2563eb" stroke-width="2"/>
                            </svg>
                            
                            <!-- Eksen Etiketleri -->
                            <span style="position: absolute; top: -5px; left: 50%; transform: translateX(-50%); font-size: 10px; font-weight:700; color: #64748b;">BİLİŞSEL</span>
                            <span style="position: absolute; top: 22%; right: -25px; font-size: 10px; font-weight:700; color: #64748b;">TEKNİK</span>
                            <span style="position: absolute; bottom: 22%; right: -20px; font-size: 10px; font-weight:700; color: #64748b;">TEMEL</span>
                            <span style="position: absolute; bottom: 22%; left: -25px; font-size: 10px; font-weight:700; color: #64748b;">YÖNETSEL</span>
                            <span style="position: absolute; top: 22%; left: -45px; font-size: 10px; font-weight:700; color: #64748b;">FONKSİYONEL</span>
                        </div>

                        <!-- Legend / Lejant -->
                        <div style="display:flex; justify-content:center; gap:20px; margin-top:20px; font-size:11.5px; color:#64748b;">
                            <span style="display:flex; align-items:center; gap:6px;">
                                <span style="display:inline-block; width:12px; height:12px; background:#94a3b8; border-radius:2px;"></span> Hedeflenen Seviye
                            </span>
                            <span style="display:flex; align-items:center; gap:6px;">
                                <span style="display:inline-block; width:12px; height:12px; background:#2563eb; border-radius:2px;"></span> Mevcut Durum
                            </span>
                        </div>
                    </div>

                    <!-- Sağ Kolon: Tüm Ölçülen Yetkinlikler Listesi -->
                    <div>
                        <h3 style="margin: 0 0 15px 0; font-size: 14px; font-weight: 700; color: #0f172a;">Tüm Ölçülen Yetkinlikler</h3>
                        
                        <div style="display:flex; flex-direction:column; gap:16px; max-height: 420px; overflow-y: auto; padding-right: 8px;">
                            \${filteredCompList.map(c => \`
                                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                        <div>
                                            <strong style="font-size: 13.5px; color: #0f172a;">\${safeText(c.name)}</strong>
                                            <span style="font-size: 9.5px; font-weight: 800; color: #2563eb; background: #eff6ff; padding: 2px 7px; border-radius: 4px; margin-left: 6px;">\${safeText(c.category)}</span>
                                        </div>
                                        <div style="font-size: 12px; font-weight: 700;">
                                            <span style="color: #2563eb;">Mevcut: %\${c.score}</span>
                                            <span style="color: #94a3b8; margin-left: 8px; font-weight: 500;">Hedef: %\${c.target || 60}</span>
                                        </div>
                                    </div>
                                    <!-- Progress Bar with Target Marker -->
                                    <div style="height: 6px; background: #e2e8f0; border-radius: 3px; position: relative; width: 100%; margin-bottom: 10px;">
                                        <div style="position: absolute; top: 0; left: 0; height: 100%; width: \${Math.min(100, c.score)}%; background: \${c.score>=80?'#16a34a':c.score>=50?'#f59e0b':'#ef4444'}; border-radius: 3px;"></div>
                                        <div style="position: absolute; top: -3px; left: \${c.target || 60}%; height: 12px; width: 2px; background: #ef4444;" title="Hedef Barajı: %\${c.target||60}"></div>
                                    </div>
                                    <!-- Seviye Açıklama Kutusu -->
                                    <div style="background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 8px; padding: 8px 12px;">
                                        <b style="font-size: 12px; color: #0f172a; display: block; margin-bottom: 2px;">\${safeText(c.levelName || 'Seviye 5 (Örnek)')}</b>
                                        <p style="margin: 0; font-size: 11.5px; color: #64748b; line-height: 1.4;">\${safeText(c.levelDesc || 'Kritik problemlerde örnek düzeydedir, kurumsal standart geliştirir.')}</p>
                                    </div>
                                </div>
                            \`).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. Psikolojik Profil (Sayfa 7) -->
            <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04); margin-bottom: 25px;">
                <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #0f172a; display: flex; align-items: center; gap: 8px;">
                    💬 Psikolojik Profil (Sayfa 7)
                </h3>
                <p style="margin: 0; font-size: 14px; color: #334155; line-height: 1.7;">
                    \${psychProfileText}
                </p>
            </div>

            <!-- 4. Hata Dedektörü (Sayfa 6) & Kıyaslama (Sayfa 8) Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 25px;">
                <!-- Hata Dedektörü (Sayfa 6) -->
                <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04);">
                    <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #be123c; display: flex; align-items: center; gap: 8px;">
                        🚨 Hata Dedektörü (Sayfa 6)
                    </h3>
                    <div style="background: #fff1f2; border: 1px solid #fecdd3; border-radius: 12px; padding: 20px; font-size: 13.5px; color: #881337; line-height: 1.65;">
                        \${errorDetectorText}
                    </div>
                </div>

                <!-- Kıyaslama (Sayfa 8) -->
                <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04);">
                    <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px;">
                        📊 Kıyaslama (Sayfa 8)
                    </h3>
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; font-size: 13.5px; color: #475569; line-height: 1.65;">
                        \${benchmarkText}
                    </div>
                </div>
            </div>

            <!-- 5. Nihai Mentor Kararı (Sayfa 9) -->
            <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; border-top: 4px solid #16a34a; padding: 28px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04); margin-bottom: 25px;">
                <h2 style="margin: 0 0 14px 0; font-size: 19px; font-weight: 800; color: #0f172a;">
                    Nihai Mentor Kararı (Sayfa 9)
                </h2>
                <p style="margin: 0; font-size: 14.5px; color: #334155; line-height: 1.8;">
                    \${mentorDecisionText}
                </p>
            </div>

            <!-- 6. Detaylı Soru & Cevap İnceleme -->
            \${(r.detailedReport && r.detailedReport.length > 0) ? \`
            <div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04);">
                <h2 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 700; color: #0f172a;">Adayın Sınav Cevapları ve Soru Bazlı İnceleme</h2>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    \${r.detailedReport.map((q, idx) => \`
                        <div style="background:#f8fafc; padding:16px; border-radius:10px; border: 1px solid #e2e8f0;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                                <strong style="color:#0f172a; font-size: 14px;">Soru \${idx + 1}: \${safeText(q.question)}</strong>
                                <span style="font-size:11.5px; background:#e0f2fe; color:#0369a1; padding:2px 8px; border-radius:4px; font-weight:700;">\${safeText(q.level || 'Teknik')}</span>
                            </div>
                            <p style="margin:0 0 6px 0; color:#334155; font-size:13.5px; line-height: 1.45;">
                                <b>Adayın Cevabı:</b> \${safeText(q.answer || 'Cevap verilmedi')}
                            </p>
                            \${q.correctAnswer ? \`<p style="margin:0 0 6px 0; color:#15803d; font-size:12.5px;"><b>İdeal Yaklaşım:</b> \${safeText(q.correctAnswer)}</p>\` : ''}
                            <div style="display: flex; align-items: center; gap: 12px; margin-top: 6px;">
                                <span style="display:inline-block; padding:4px 10px; border-radius:5px; font-size:11.5px; font-weight:700; 
                                    \${q.status === 'positive' ? 'background:#dcfce3;color:#16a34a;' : (q.status === 'negative' ? 'background:#fee2e2;color:#dc2626;' : 'background:#e2e8f0;color:#64748b;')}">
                                    \${q.status === 'positive' ? '✅ Olumlu / Doğru' : (q.status === 'negative' ? '❌ Olumsuz / Yanlış' : '⚪ Boş')}
                                </span>
                                <span style="font-size:11.5px; color:#64748b; font-weight: 600;">🕒 \${q.seconds || 0} saniye</span>
                            </div>
                        </div>
                    \`).join('')}
                </div>
            </div>
            \` : ''}

        </div>
        \`;
        return layout(html, 'Detaylı Rapor - ' + r.name);
    };`;

// Replace window.reportDetailPage definition in dist/app.js
const reportDetailPageRegex = /\/\/\s*6\.\s*reportDetailPage:[\s\S]*?return layout\(html,\s*'Detaylı Rapor - '\s*\+\s*r\.name\);\s*};/;

if (reportDetailPageRegex.test(app)) {
    app = app.replace(reportDetailPageRegex, newReportDetailPageCode);
    console.log('reportDetailPage replaced successfully!');
} else {
    console.log('reportDetailPageRegex did not match directly, checking fallback...');
}

fs.writeFileSync(appPath, app, 'utf8');
console.log('Updated dist/app.js successfully! New length:', app.length);
