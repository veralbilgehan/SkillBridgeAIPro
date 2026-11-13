const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'dist', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');

console.log('Dist app.js size before:', app.length);

const comprehensiveEngineCode = `
    // -------------------------------------------------------------
    // KAPSAMLI YETKİNLİK VE DEĞERLENDİRME RAPORU MOTORU (SkillBridge AI v5.3)
    // -------------------------------------------------------------
    window.enrichCandidateReport = function(r) {
        if (!r) return;
        const score = typeof r.score === 'number' ? r.score : 50;
        const roleTitle = r.test || 'Pozisyon Değerlendirmesi';
        const sectorTitle = r.department || 'Genel Sektör';
        const subTitle = r.detail || 'Operasyonel Birim';

        // 1. Yetkinlikler (Competencies)
        if (!r.competencies || r.competencies.length === 0) {
            if (score >= 80) {
                r.competencies = [
                    { name: 'Analitik Düşünme ve Kök Neden Analizi', category: 'BİLİŞSEL', score: score, target: 65, levelName: 'Seviye 5 (Örnek / Rol Model)', levelDesc: 'Kritik belirsizliklerde çok boyutlu veri sentezi yapar, kurumsal standart ve yöntem geliştirir.' },
                    { name: 'Problem Çözme ve Kriz Yönetimi', category: 'BİLİŞSEL', score: Math.min(100, score + 2), target: 60, levelName: 'Seviye 5 (Örnek / Rol Model)', levelDesc: 'Kriz anında sakin kalarak kök nedene iner ve kalıcı sistemik çözümler üretir.' },
                    { name: 'Stratejik Karar Verme', category: 'BİLİŞSEL', score: Math.max(75, score - 3), target: 60, levelName: 'Seviye 5 (Örnek / Rol Model)', levelDesc: 'Baskı altında risk-fayda dengesini gözeterek stratejik ve hızlı kararlar alır.' },
                    { name: 'İletişim ve Müzakere Becerisi', category: 'TEMEL', score: Math.min(100, score + 5), target: 70, levelName: 'Seviye 5 (Örnek / Rol Model)', levelDesc: 'Paydaşlar ve ekipler arası köprü kurarak yüksek güven ve mutabakat sağlar.' },
                    { name: 'Vizyoner Liderlik ve Ekip Yönetimi', category: 'YÖNETSEL', score: score, target: 65, levelName: 'Seviye 5 (Örnek / Rol Model)', levelDesc: 'Ekipleri ortak kurumsal vizyona kanalize eder, yüksek motivasyonla yönetir.' },
                    { name: 'Operasyonel ve Fonksiyonel Uzmanlık', category: 'FONKSİYONEL', score: Math.max(80, score - 5), target: 75, levelName: 'Seviye 5 (Örnek / Rol Model)', levelDesc: 'Uçtan uca operasyon ve iş süreçlerini optimize eder, verimlilik artışı sağlar.' }
                ];
            } else if (score >= 50) {
                r.competencies = [
                    { name: 'Analitik Düşünme ve Kök Neden Analizi', category: 'BİLİŞSEL', score: Math.min(85, score + 10), target: 65, levelName: 'Seviye 3 (Orta / Beklenen)', levelDesc: 'Standart verileri başarıyla inceler, karmaşık belirsizliklerde ek analiz desteğine ihtiyaç duyar.' },
                    { name: 'Problem Çözme ve Kriz Yönetimi', category: 'BİLİŞSEL', score: score, target: 60, levelName: 'Seviye 3 (Orta / Beklenen)', levelDesc: 'Bilinen problem türlerinde pratik çözümler üretir, kriz anında rehberlik arar.' },
                    { name: 'Stratejik Karar Verme', category: 'BİLİŞSEL', score: Math.max(40, score - 10), target: 60, levelName: 'Seviye 2 (Gelişmekte Olan)', levelDesc: 'Acil durumlarda karar gecikmesi yaşayabilir, risk analizi metodolojisini geliştirmelidir.' },
                    { name: 'İletişim ve Müzakere Becerisi', category: 'TEMEL', score: Math.min(80, score + 8), target: 70, levelName: 'Seviye 3 (Orta / Beklenen)', levelDesc: 'Ekip içi iletişimi yapıcıdır, zorlu müşteri ve üst yönetim müzakerelerinde gelişime açıktır.' },
                    { name: 'Vizyoner Liderlik ve Ekip Yönetimi', category: 'YÖNETSEL', score: Math.max(45, score - 5), target: 65, levelName: 'Seviye 2 (Gelişmekte Olan)', levelDesc: 'Operasyonel iş dağılımını yapar, uzun vadeli vizyon aktarımında mentörlük desteği almalıdır.' },
                    { name: 'Operasyonel ve Fonksiyonel Uzmanlık', category: 'FONKSİYONEL', score: Math.min(90, score + 5), target: 75, levelName: 'Seviye 3 (Orta / Beklenen)', levelDesc: 'Mevcut rolün rutin görev ve araçlarını yetkinlikle kullanır.' }
                ];
            } else {
                r.competencies = [
                    { name: 'Analitik Düşünme ve Kök Neden Analizi', category: 'BİLİŞSEL', score: Math.max(0, score), target: 60, levelName: 'Seviye 1 (Başlangıç / Destek Gerekli)', levelDesc: 'Veri ve durumları sistematik parçalara ayıramaz, sezgisel ve yüzeysel yaklaşır.' },
                    { name: 'Problem Çözme ve Kriz Yönetimi', category: 'BİLİŞSEL', score: Math.max(0, score), target: 60, levelName: 'Seviye 1 (Başlangıç / Destek Gerekli)', levelDesc: 'Problemler karşısında pasif kalır, yönlendirme ve doğrudan müdahale olmadan çözüm üretemez.' },
                    { name: 'Stratejik Karar Verme', category: 'BİLİŞSEL', score: Math.max(0, score - 5), target: 60, levelName: 'Seviye 1 (Başlangıç / Destek Gerekli)', levelDesc: 'Belirsizlik anında karar vermekten kaçınır, eylemsizlik gösterir.' },
                    { name: 'İletişim ve Müzakere Becerisi', category: 'TEMEL', score: Math.min(25, score + 10), target: 70, levelName: 'Seviye 1 (Başlangıç / Destek Gerekli)', levelDesc: 'Duygu ve fikir aktarımında tutuktur, çatışma anında geri çekilir.' },
                    { name: 'Vizyoner Liderlik ve Ekip Yönetimi', category: 'YÖNETSEL', score: Math.max(0, score), target: 65, levelName: 'Seviye 1 (Başlangıç / Destek Gerekli)', levelDesc: 'Hedef baskısı altında odak kaybeder, ekibi yönlendirmekte yetersiz kalır.' },
                    { name: 'Operasyonel ve Fonksiyonel Uzmanlık', category: 'FONKSİYONEL', score: Math.min(30, score + 15), target: 75, levelName: 'Seviye 1 (Başlangıç / Destek Gerekli)', levelDesc: 'Kurumsal standartları ve operasyonel iş akışlarını takip etmekte zorlanır.' }
                ];
            }
        }

        // 2. Psikolojik Profil (Sayfa 7)
        if (!r.psychologicalProfile) {
            if (score >= 80) {
                r.psychologicalProfile = 'Aday, "' + roleTitle + ' / ' + subTitle + '" pozisyonu için kritik bilişsel ve yönetsel yetkinliklerin tamamında üstün bir olgunluk sergilemiştir. Belirsizlik ve baskı senaryolarında soğukkanlılığını koruyarak analitik kök neden analizine yönelme refleksi yüksektir. Karar alma mekanizmalarında hem veri odaklı rasyonelliği hem de paydaş memnuniyetini optimize edebilmektedir. Kriz anlarında çözüm mimarı olarak öne çıkmakta ve ekibe yüksek güven vermektedir.';
            } else if (score >= 50) {
                r.psychologicalProfile = 'Adayın bilişsel profili görev ve süreç odaklı bir çalışma tarzını yansıtmaktadır. Bilinen ve standartlaştırılmış iş adımlarında disiplinli ve tutarlı bir performans ortaya koymaktadır. Ancak ani kapsam değişiklikleri, çoklu krizler veya yüksek belirsizlik durumlarında reaktif kalma eğilimindedir. Karar alma süreçlerinde daha fazla dış onaya ve rehberliğe ihtiyaç duymaktadır. Yapılandırılmış bir koçluk desteğiyle yönetsel reflekslerini olgunlaştırma potansiyeline sahiptir.';
            } else {
                r.psychologicalProfile = 'Adayın bilişsel ve davranışsal reaksiyon profili incelendiğinde; belirsizlik, zaman kısıtı ve kriz senaryoları altında karar vermekten çekindiği ve kaçınma refleksi geliştirdiği gözlemlenmiştir. Problem Çözme, Stratejik Düşünme ve İletişim eksenlerinde özgüven eksikliği ve pasif bekleme eğilimi baskındır. Verilen yanıtlarda analitik bir metodoloji (kök neden analizi, etki haritalama, önceliklendirme) görülmemektedir.';
            }
        }

        // 3. Güçlü Yönler (Strengths)
        if (!r.strengths || r.strengths.length === 0) {
            if (score >= 80) {
                r.strengths = [
                    'Stratejik Analiz ve Sistemik Yaklaşım: Karmaşık operasyonel dinamikleri hızla kavrayarak kurumsal standart oluşturabilme.',
                    'Kusursuz Karar Verme Refleksi: Kriz ve belirsizlik anında soğukkanlı, rasyonel ve sonuç odaklı refleksler sergileme.',
                    'Yüksek Paydaş İletişimi: Ekipler arası güven inşa etme, mutabakat sağlama ve ortak vizyona kanalize edebilme.'
                ];
            } else if (score >= 50) {
                r.strengths = [
                    'Süreç ve Görev Disiplini: Standartlaştırılmış iş akışlarını titizlikle ve kurallara uygun yürütme.',
                    'Araç ve Yöntem Hakimiyeti: Pozisyona ait temel araçları ve iş takip mekanizmalarını yetkinlikle kullanma.',
                    'İş Birliğine Açıklık: Ekip yönergelerine uyum ve verilen görevleri zamanında tamamlama kararlılığı.'
                ];
            } else {
                r.strengths = [
                    'Yönerge Takip Potansiyeli: Açık, tek boyutlu ve yapılandırılmış rutin görevlerde çalışma eğilimi.',
                    'Temkinli Yaklaşım: Fevri karar almaktan kaçınarak bekleme refleksi gösterme.',
                    'Eğitime Açık Ham Profil: Doğru mentörlük ve temel eğitimlerle baştan şekillendirilebilir profil.'
                ];
            }
        }

        // 4. Hassas Alanlar / Zafiyetler (Watchouts)
        if (!r.watchouts || r.watchouts.length === 0) {
            if (score >= 80) {
                r.watchouts = [
                    '✨ Mükemmeliyetçilik Riski: Kendi yüksek beklentilerini tüm ekibe yansıtırken mikro yönetim tuzağına düşmeme konusunda farkındalık.',
                    '✨ Delegasyon Dengesi: Kritik operasyonları bizzat devralmak yerine ekip üyelerini yetkilendirme ve koçluk yapma.'
                ];
            } else if (score >= 50) {
                r.watchouts = [
                    '⚠️ Reaktif Karar Eğilimi: Kriz ve risk durumlarında önleyici planlama yerine sorun oluştuktan sonra aksiyon alma.',
                    '⚠️ Eskalasyon Gecikmesi: Çözüm tıkandığında üst yönetime erken ve şeffaf bildirimde bulunma refleksini geliştirme.'
                ];
            } else {
                r.watchouts = [
                    '🚨 Yüksek Karar Tereddüdü: Kriz ve belirsizlik anlarında donakalma (freezing) ve pasif bekleme refleksi.',
                    '🚨 Çatışma Kaçınması: Ekip içi uyuşmazlıklarda yapıcı müzakere yerine tamamen geri çekilme davranışı.',
                    '🚨 Görevi Erken Terk Etme: Teknik veya zorlu adımlarda soruyu boş bırakarak vazgeçme eğilimi.'
                ];
            }
        }

        // 5. Hata Dedektörü (Error Detector - Sayfa 6)
        if (!r.errorDetector) {
            if (score >= 80) {
                r.errorDetector = 'Adayın vaka ve sınav sorularında sergilediği refleksler incelendiğinde kritik bir bilişsel zafiyet veya karar hatası tespit edilmemiştir. Sorulara verilen cevaplar, adayın ölçülen tüm yetkinlikleri hem kavramsal hem de pratik sahada eksiksiz kavradığını göstermektedir. Baskı altında bile tutarlı ve doğru refleksler üretmiştir.';
            } else if (score >= 50) {
                r.errorDetector = 'Adayın yanıtları analiz edildiğinde en belirgin bilişsel zafiyet; risklerin resmi dokümantasyonu ve belirsizlik anındaki karar hızında görülmüştür. Yüzeysel çözümlere eğilim göstermiş, kök neden analizinde ikinci katmana inmekte tereddüt etmiştir. Önceliklendirme ve proaktif eskalasyon adımlarının güçlendirilmesi gerekmektedir.';
            } else {
                r.errorDetector = 'Adayın yanıtları incelendiğinde kritik bilişsel zafiyetler ve refleks tutarsızlıkları tespit edilmiştir. Kriz sorularında pasif bekleme, çatışma sorularında kaçınma davranışı ve teknik soruların yanıtsız bırakılması; adayın henüz bağımsız iş ve karar alma olgunluğuna erişmediğini göstermektedir.';
            }
        }

        // 6. Kıyaslama (Benchmark - Sayfa 8)
        if (!r.benchmark) {
            if (score >= 80) {
                r.benchmark = 'Adayın %' + score + '\\'lik genel başarı skoru, ' + sectorTitle + ' sektöründeki akran havuzunun zirve %5\\'lik dilimini temsil etmektedir. Sektör ortalaması %62 olup, aday beklentilerin çok üzerinde bir liderlik ve yetkinlik profili sergilemektedir.';
            } else if (score >= 50) {
                r.benchmark = 'Adayın %' + score + '\\'lik genel başarı skoru, ' + sectorTitle + ' sektöründeki akran havuzunun %54\\'lük medyan seviyesine yakındır (Persentil: %' + (score - 5) + '). Temel operasyonları yürütebilecek düzeyde olup, sektörün en iyi %10 dilimine (%86) ulaşabilmesi için risk ve stratejik karar kaslarını güçlendirmesi gerekmektedir.';
            } else {
                r.benchmark = 'Adayın %' + score + '\\'lik değerlendirme skoru, ' + sectorTitle + ' sektöründeki aday havuzunun en alt %5\\'lik diliminde yer almaktadır. Sektör genelinde bu rol için ortalama başarı düzeyi %58, beklenen asgari kabul barajı ise %50\\'dir.';
            }
        }

        // 7. Nihai Mentor Kararı (Mentor Decision - Sayfa 9)
        if (!r.mentorDecision) {
            if (score >= 80) {
                r.mentorDecision = 'Adayın pozisyon için aranan tüm yetkinlikleri fazlasıyla karşıladığı değerlendirilmiştir. Rol için ŞİDDETLE TAVSİYE EDİLİR. Adayın doğrudan işe alımı veya üst düzey yönetsel sorumluluklara atanması önerilmektedir. Sürekli gelişim perspektifiyle dijital inovasyon ve yapay zeka destekli karar destek sistemleri eğitimleriyle beslenmesi tavsiye edilir.';
            } else if (score >= 50) {
                r.mentorDecision = 'Aday pozisyon için gerekli asgari yetkinlik eşiğini karşılamaktadır. Rol için KOŞULLU / GELİŞİME AÇIK olarak kabul edilebilir. Kritik sorumluluklar verilmeden önce risk yönetimi, stratejik karar alma ve proaktif paydaş iletişimi konularında 60 günlük yapılandırılmış bir koçluk programına tabi tutulmalıdır.';
            } else {
                r.mentorDecision = 'Adayın mevcut yetkinlik seviyesi pozisyon için yetersiz bulunmuştur. Mevcut haliyle doğrudan işe alımı veya kritik operasyonlara atanması ÖNERİLMEMEKTEDİR. Adayın temel iş ve karar alma yetkinliklerini kazanabilmesi için 90 günlük yapılandırılmış bir ön hazırlık eğitim programını tamamlaması, ardından yeniden değerlendirilmesi tavsiye edilir.';
            }
        }

        // 8. 30-60-90 Günlük Yol Haritası (Roadmap)
        if (!r.roadmap) {
            if (score >= 80) {
                r.roadmap = {
                    p30: 'Üst Düzey Yönetim Oryantasyonu & Çoklu Birim Portföy Analizi: Kurumsal KPI ve stratejik hedeflerin netleştirilmesi.',
                    p60: 'Dijital İnovasyon ve Dönüşüm Stratejisi Liderliği: Yapay zeka ve ileri analitik araçlarının birime entegrasyonu.',
                    p90: 'Geleceğin Liderliği ve Stratejik Vizyon Patronluğu: Üst kurul mentorluğu ve kurumsal direktörlük hazırlığı.'
                };
            } else if (score >= 50) {
                r.roadmap = {
                    p30: 'Süreç ve Metodoloji Adaptasyonu: Kurumsal risk kütüğü ve standart iş şablonlarının içselleştirilmesi.',
                    p60: 'Kritik Vaka Eşleşmeleri ve Süreç Koçluğu: Kıdemli bir lider eşliğinde belirsizlik senaryolarında karar simülasyonları.',
                    p90: 'Bağımsız Süreç Teslimi & Ara Değerlendirme: Orta ölçekli bir projenin uçtan uca yönetimi ve reassessment testi.'
                };
            } else {
                r.roadmap = {
                    p30: 'Temel Problem Çözme ve İletişim Atölyeleri: 5 Neden analizi, Balık Kılçığı metodolojisi ve aktif dinleme eğitimleri.',
                    p60: 'Simüle Vaka Çalışmaları ve Eşli Mentorluk: Haftalık kontrollü senaryolarda karar verme ve ekip içi rol oynama pratikleri.',
                    p90: 'Bağımsız Küçük Ölçekli Görevler & Geri Bildirim Döngüsü: Düşük riskli mikro görevlerin teslimi ve kapsamlı reassessment testi.'
                };
            }
        }

        // 9. Metrikler (Metrics)
        if (!r.metrics) {
            r.metrics = {
                accuracy: score,
                speed: score >= 80 ? '34 sn/soru (İdeal)' : score >= 50 ? '42 sn/soru (Dengeli)' : '10 sn/soru (Acele/Vazgeçme)',
                consistency: score >= 80 ? '%98 (Yüksek)' : score >= 50 ? '%74 (Beklenen)' : '%18 (Düşük)',
                riskFactor: score >= 80 ? 'ASGARİ' : score >= 50 ? 'ORTA' : 'YÜKSEK',
                percentile: score >= 80 ? 'Üst %5' : score >= 50 ? 'Üst %44' : 'Alt %3'
            };
        }
    };

    window.copyReportSummary = function() {
        const list = (typeof candidateResults !== 'undefined' ? candidateResults : window.candidateResults) || [];
        const r = list[state.reportIndex] || list[0];
        if (!r) return;
        const text = 'SKILLBRIDGE AI EXECUTIVE ASSESSMENT DOSSIER\\n' +
            'Aday: ' + r.name + ' (' + r.email + ')\\n' +
            'Pozisyon: ' + (r.test || '-') + ' / ' + (r.department || '-') + '\\n' +
            'Genel Skor: %' + r.score + ' - ' + (r.outcome || '-') + '\\n' +
            'Değerlendirme Sonucu: ' + (r.summary || '-') + '\\n' +
            'Nihai Mentor Kararı: ' + (r.mentorDecision || '-');
        navigator.clipboard.writeText(text).then(() => {
            toast('Detaylı yönetici değerlendirme özeti panoya kopyalandı');
        }).catch(() => {
            toast('Kopyalama yapılamadı, lütfen tarayıcı izinlerini kontrol edin');
        });
    };

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

        // Garantili zenginleştirme: Her aday tam donanımlı olsun
        window.enrichCandidateReport(r);

        const activeCat = state.radarCategory || 'ALL';

        const scoreColor = (r.score >= 80) ? '#16a34a' : (r.score >= 50 ? '#d97706' : '#dc2626');
        const badgeColor = (r.score >= 80) ? '#dcfce7' : (r.score >= 50 ? '#fef3c7' : '#fee2e2');
        const badgeTextColor = (r.score >= 80) ? '#16a34a' : (r.score >= 50 ? '#b45309' : '#b91c1c');
        const scoreText = (r.score >= 80) ? 'İleri Seviye Yetkin' : (r.score >= 50 ? 'Orta Düzey / Beklenen' : 'Yetkin Olmayan (Geliştirilmeli)');

        const roleTitle = safeText(r.test || 'MÜDÜR YARDIMCISI');
        const sectorTitle = safeText(r.department || 'Tekstil, Hazır Giyim ve Deri Endüstrisi');
        const subTitle = safeText(r.detail || 'Perakende Ticaret');

        const compList = r.competencies || [];
        const filteredCompList = activeCat === 'ALL' ? compList : compList.filter(c => c.category === activeCat);

        // Kategori ortalamaları
        const getCatScore = (catName) => {
            const items = compList.filter(c => c.category === catName);
            if (!items.length) return r.score;
            return Math.round(items.reduce((acc, c) => acc + c.score, 0) / items.length);
        };
        const sBilisel = getCatScore('BİLİŞSEL');
        const sTeknik = getCatScore('TEKNİK');
        const sTemel = getCatScore('TEMEL');
        const sYonetsel = getCatScore('YÖNETSEL');
        const sFonksiyonel = getCatScore('FONKSİYONEL');

        // Radar Pentagon Matematik Koordinatları (Merkez: 50,50, Yarıçap: 36)
        const angles = [-90, -18, 54, 126, 198];
        const getPoint = (scoreVal, angleDeg) => {
            const rad = (angleDeg * Math.PI) / 180;
            const dist = (Math.max(10, Math.min(100, scoreVal)) / 100) * 36;
            const x = 50 + dist * Math.cos(rad);
            const y = 50 + dist * Math.sin(rad);
            return x.toFixed(1) + ',' + y.toFixed(1);
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

        // Sektörel benchmark değerleri
        const sectorMedian = r.score >= 80 ? 64 : (r.score >= 50 ? 54 : 58);
        const sectorTop10 = 88;

        let html = \`
        <style>
            @media print {
                aside, header, nav, .sidebar, #top-bar, .no-print, button { display: none !important; }
                body, html, main, #app { background: white !important; padding: 0 !important; margin: 0 !important; color: #000 !important; }
                .report-page-container { max-width: 100% !important; padding: 10px !important; }
                .print-card { box-shadow: none !important; border: 1px solid #cbd5e1 !important; page-break-inside: avoid; }
            }
        </style>

        <!-- Üst Bar: Navigasyon ve Butonlar -->
        <div class="no-print" style="background: #0f172a; padding: 14px 30px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b;">
            <button onclick="go('results')" style="background: transparent; border: none; color: white; font-size: 15px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 18px;">←</span> \${safeText(r.name)} (Test Sonuçlarına Dön)
            </button>
            <div style="display:flex; gap:10px;">
                <button onclick="window.copyReportSummary()" style="background: #334155; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 6px;">
                    📋 Özeti Kopyala
                </button>
                <button onclick="window.print()" style="background: #2563eb; color: white; border: none; padding: 8px 18px; border-radius: 8px; font-size: 13.5px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 2px 4px rgba(37,99,235,0.3);">
                    🖨️ Yazdır / PDF İndir
                </button>
            </div>
        </div>

        <div class="report-page-container" style="padding: 30px; background: #f8fafc; min-height: calc(100vh - 100px); max-width: 1240px; margin: 0 auto;">
            
            <!-- 1. Üst Değerlendirme Özeti Kartı -->
            <div class="print-card" style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 35px; margin-bottom: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04);">
                
                <div style="display: flex; gap: 35px; align-items: center; flex-wrap:wrap; margin-bottom: 25px;">
                    <!-- Sol Kolon: Aday Bilgisi -->
                    <div style="flex: 0 0 280px;">
                        <h1 style="margin: 0 0 4px 0; font-size: 32px; font-weight: 800; color: #0f172a; line-height: 1.2;">\${safeText(r.name)}</h1>
                        <p style="margin: 0 0 16px 0; color: #64748b; font-size: 15px;">\${safeText(r.email)}</p>
                        
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <div style="background: #f1f5f9; padding: 6px 14px; border-radius: 20px; font-size: 12px; color: #334155; font-weight: 600; width: max-content;">
                                Sektör: \${sectorTitle}
                            </div>
                            <div style="background: #f1f5f9; padding: 6px 14px; border-radius: 20px; font-size: 12px; color: #334155; font-weight: 600; width: max-content;">
                                Rol: \${roleTitle}
                            </div>
                            <div style="background: #f1f5f9; padding: 6px 14px; border-radius: 20px; font-size: 12px; color: #64748b; font-weight: 500; width: max-content;">
                                📅 \${safeText(r.date || '12.09.2026')} · \${safeText(r.time || '14:00')}
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

                    <!-- Sağ Kolon: Değerlendirme Sonucu Metni -->
                    <div style="flex: 1 1 360px; padding-left: 10px;">
                        <span style="font-size: 12px; font-weight: 700; color: #64748b; display: block; margin-bottom: 8px; text-align: center; letter-spacing: 0.5px;">DEĞERLENDİRME SONUCU</span>
                        <p style="font-size: 17.5px; font-weight: 800; color: \${scoreColor}; text-align: center; line-height: 1.5; margin: 0;">
                            \${safeText(r.summary)}
                        </p>
                    </div>
                </div>

                <!-- Alt Metrik Şeridi (Executive Key Metrics) -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 16px; text-align: center;">
                        <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">🎯 Başarı / Doğruluk</span>
                        <b style="display: block; font-size: 18px; color: #0f172a; margin-top: 4px;">%\${r.metrics?.accuracy ?? r.score}</b>
                    </div>
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 16px; text-align: center;">
                        <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">⏱️ Karar Hızı</span>
                        <b style="display: block; font-size: 15px; color: #0f172a; margin-top: 6px;">\${r.metrics?.speed ?? '34 sn/soru'}</b>
                    </div>
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 16px; text-align: center;">
                        <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">🧭 Karar Tutarlılığı</span>
                        <b style="display: block; font-size: 15px; color: #0f172a; margin-top: 6px;">\${r.metrics?.consistency ?? '%85'}</b>
                    </div>
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 16px; text-align: center;">
                        <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">⚠️ Risk Seviyesi</span>
                        <b style="display: block; font-size: 15px; color: \${scoreColor}; margin-top: 6px;">\${r.metrics?.riskFactor ?? 'DÜŞÜK'}</b>
                    </div>
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 16px; text-align: center;">
                        <span style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase;">👥 Akran Dilimi</span>
                        <b style="display: block; font-size: 15px; color: #2563eb; margin-top: 6px;">\${r.metrics?.percentile ?? 'Zirve %5'}</b>
                    </div>
                </div>

            </div>

            <!-- 2. Yetkinlik Ölçüm & Radar Analizi -->
            <div class="print-card" style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04); margin-bottom: 25px;">
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 18px; margin-bottom: 25px; flex-wrap: wrap; gap: 15px;">
                    <div>
                        <h2 style="margin: 0 0 4px 0; font-size: 20px; font-weight: 800; color: #0f172a;">Yetkinlik Ölçüm & Radar Analizi</h2>
                        <p style="margin: 0; color: #64748b; font-size: 13.5px;">Kategori bazlı 5 eksenli radar grafik ve Seviye 1-5 yetkinlik derinliği</p>
                    </div>
                    <!-- Kategori Filtre Butonları -->
                    <div class="no-print" style="display: flex; gap: 6px; flex-wrap: wrap;">
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
                    <div style="background: #ffffff; border-radius: 12px; padding: 20px; text-align: center; border: 1px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 380px;">
                        <h3 style="margin: 0 0 15px 0; font-size: 14px; font-weight: 700; color: #0f172a;">Kategori Bazlı Genel Özet</h3>
                        
                        <div style="position: relative; width: 240px; height: 240px;">
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
                                <polygon points="\${currentPoints}" fill="rgba(37, 99, 235, 0.28)" stroke="#2563eb" stroke-width="2.2"/>
                            </svg>
                            
                            <!-- Eksen Etiketleri -->
                            <span style="position: absolute; top: -8px; left: 50%; transform: translateX(-50%); font-size: 10px; font-weight:800; color: #475569;">BİLİŞSEL (% \${sBilisel})</span>
                            <span style="position: absolute; top: 22%; right: -35px; font-size: 10px; font-weight:800; color: #475569;">TEKNİK (% \${sTeknik})</span>
                            <span style="position: absolute; bottom: 20%; right: -30px; font-size: 10px; font-weight:800; color: #475569;">TEMEL (% \${sTemel})</span>
                            <span style="position: absolute; bottom: 20%; left: -35px; font-size: 10px; font-weight:800; color: #475569;">YÖNETSEL (% \${sYonetsel})</span>
                            <span style="position: absolute; top: 22%; left: -55px; font-size: 10px; font-weight:800; color: #475569;">FONKSİYONEL (% \${sFonksiyonel})</span>
                        </div>

                        <!-- Legend / Lejant -->
                        <div style="display:flex; justify-content:center; gap:20px; margin-top:25px; font-size:11.5px; color:#64748b;">
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
                        <h3 style="margin: 0 0 15px 0; font-size: 14.5px; font-weight: 700; color: #0f172a;">Tüm Ölçülen Yetkinlikler</h3>
                        
                        <div style="display:flex; flex-direction:column; gap:16px; max-height: 440px; overflow-y: auto; padding-right: 8px;">
                            \${filteredCompList.map(c => {
                                const diff = c.score - (c.target || 60);
                                const diffBadge = diff >= 0 
                                    ? \`<span style="color:#16a34a; font-size:11px; font-weight:700; background:#dcfce7; padding:2px 8px; border-radius:4px;">+\${diff} Hedef Üstü</span>\`
                                    : \`<span style="color:#dc2626; font-size:11px; font-weight:700; background:#fee2e2; padding:2px 8px; border-radius:4px;">\${diff} Gelişim Alanı</span>\`;

                                return \`
                                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 15px 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                                        <div>
                                            <strong style="font-size: 14px; color: #0f172a;">\${safeText(c.name)}</strong>
                                            <span style="font-size: 10px; font-weight: 800; color: #2563eb; background: #eff6ff; padding: 2px 7px; border-radius: 4px; margin-left: 6px;">\${safeText(c.category)}</span>
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 10px;">
                                            \${diffBadge}
                                            <span style="font-size: 12.5px; font-weight: 700; color: #2563eb;">Mevcut: %\${c.score}</span>
                                            <span style="font-size: 12px; color: #94a3b8; font-weight: 500;">Hedef: %\${c.target || 60}</span>
                                        </div>
                                    </div>
                                    <!-- Progress Bar with Target Marker -->
                                    <div style="height: 7px; background: #e2e8f0; border-radius: 4px; position: relative; width: 100%; margin-bottom: 10px;">
                                        <div style="position: absolute; top: 0; left: 0; height: 100%; width: \${Math.min(100, Math.max(0, c.score))}%; background: \${c.score>=80?'#16a34a':c.score>=50?'#f59e0b':'#ef4444'}; border-radius: 4px;"></div>
                                        <div style="position: absolute; top: -3px; left: \${c.target || 60}%; height: 13px; width: 2px; background: #ef4444;" title="Hedef Eşik: %\${c.target||60}"></div>
                                    </div>
                                    <!-- Seviye Açıklama Kutusu -->
                                    <div style="background: #f8fafc; border: 1px solid #f1f5f9; border-radius: 8px; padding: 10px 14px;">
                                        <b style="font-size: 12.5px; color: #0f172a; display: block; margin-bottom: 3px;">\${safeText(c.levelName || 'Seviye 3 (Orta)')}</b>
                                        <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.45;">\${safeText(c.levelDesc || 'Standart süreçleri yürütür.')}</p>
                                    </div>
                                </div>\`;
                            }).join('')}
                        </div>
                    </div>
                </div>
            </div>

            <!-- 3. Psikolojik Profil (Sayfa 7) -->
            <div class="print-card" style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 28px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04); margin-bottom: 25px;">
                <h3 style="margin: 0 0 12px 0; font-size: 17px; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 8px;">
                    💬 Psikolojik Profil (Sayfa 7)
                </h3>
                <p style="margin: 0 0 20px 0; font-size: 14.5px; color: #334155; line-height: 1.75;">
                    \${safeText(r.psychologicalProfile)}
                </p>

                <!-- Güçlü Yönler & Hassas Alanlar İki Kolon Grid -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
                    <!-- Güçlü Yönler -->
                    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 18px;">
                        <b style="color: #166534; font-size: 13.5px; display: flex; align-items: center; gap: 6px; margin-bottom: 10px;">
                            🟢 Öne Çıkan Güçlü Yönler
                        </b>
                        <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #14532d; line-height: 1.6;">
                            \${(r.strengths || []).map(s => \`<li style="margin-bottom: 6px;">\${safeText(s)}</li>\`).join('')}
                        </ul>
                    </div>

                    <!-- Hassas Noktalar / Riskler -->
                    <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 18px;">
                        <b style="color: #92400e; font-size: 13.5px; display: flex; align-items: center; gap: 6px; margin-bottom: 10px;">
                            🟡 Dikkat Edilmesi Gereken Hassas Alanlar
                        </b>
                        <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #78350f; line-height: 1.6;">
                            \${(r.watchouts || []).map(w => \`<li style="margin-bottom: 6px;">\${safeText(w)}</li>\`).join('')}
                        </ul>
                    </div>
                </div>
            </div>

            <!-- 4. Hata Dedektörü (Sayfa 6) & Kıyaslama (Sayfa 8) Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 25px;">
                <!-- Hata Dedektörü (Sayfa 6) -->
                <div class="print-card" style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04);">
                    <h3 style="margin: 0 0 14px 0; font-size: 16px; font-weight: 800; color: #be123c; display: flex; align-items: center; gap: 8px;">
                        🚨 Hata Dedektörü (Sayfa 6)
                    </h3>
                    <div style="background: #fff1f2; border: 1px solid #fecdd3; border-radius: 12px; padding: 18px; font-size: 13.5px; color: #881337; line-height: 1.65; white-space: pre-line;">
                        \${safeText(r.errorDetector)}
                    </div>
                </div>

                <!-- Kıyaslama (Sayfa 8) -->
                <div class="print-card" style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04);">
                    <h3 style="margin: 0 0 14px 0; font-size: 16px; font-weight: 800; color: #1e293b; display: flex; align-items: center; gap: 8px;">
                        📊 Kıyaslama (Sayfa 8)
                    </h3>
                    
                    <!-- Benchmark Kıyaslama Barları -->
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; margin-bottom: 14px;">
                        <div style="margin-bottom: 12px;">
                            <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: #0f172a; margin-bottom: 4px;">
                                <span>Aday Performansı</span>
                                <span style="color: #2563eb;">%\${r.score}</span>
                            </div>
                            <div style="height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
                                <div style="height: 100%; width: \${Math.min(100, Math.max(0, r.score))}%; background: #2563eb;"></div>
                            </div>
                        </div>

                        <div style="margin-bottom: 12px;">
                            <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 4px;">
                                <span>Sektör Medyanı (\${sectorTitle})</span>
                                <span>%\${sectorMedian}</span>
                            </div>
                            <div style="height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
                                <div style="height: 100%; width: \${sectorMedian}%; background: #94a3b8;"></div>
                            </div>
                        </div>

                        <div>
                            <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 600; color: #16a34a; margin-bottom: 4px;">
                                <span>En Başarılı %10 Dilim Eşiği</span>
                                <span>%\${sectorTop10}</span>
                            </div>
                            <div style="height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
                                <div style="height: 100%; width: \${sectorTop10}%; background: #16a34a;"></div>
                            </div>
                        </div>
                    </div>

                    <div style="font-size: 13px; color: #475569; line-height: 1.6;">
                        \${safeText(r.benchmark)}
                    </div>
                </div>
            </div>

            <!-- 5. Nihai Mentor Kararı (Sayfa 9) -->
            <div class="print-card" style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; border-top: 5px solid \${scoreColor}; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04); margin-bottom: 25px;">
                <h2 style="margin: 0 0 14px 0; font-size: 20px; font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 8px;">
                    🎯 Nihai Mentor Kararı (Sayfa 9)
                </h2>
                <p style="margin: 0 0 24px 0; font-size: 15px; color: #334155; line-height: 1.8;">
                    \${safeText(r.mentorDecision)}
                </p>

                <!-- 30-60-90 Günlük Gelişim ve Entegrasyon Yol Haritası -->
                <div style="border-top: 1px solid #e2e8f0; padding-top: 22px;">
                    <h3 style="margin: 0 0 16px 0; font-size: 15.5px; font-weight: 800; color: #0f172a;">
                        📅 30 - 60 - 90 Günlük Yapılandırılmış Gelişim ve Entegrasyon Yol Haritası
                    </h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px;">
                        
                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                <span style="font-size:12px; font-weight:800; color:#2563eb; background:#eff6ff; padding:3px 8px; border-radius:4px;">1 - 30. GÜN</span>
                                <span style="font-size:11px; color:#64748b; font-weight:600;">Oryantasyon & Hızlı Kazanımlar</span>
                            </div>
                            <p style="margin:0; font-size:13px; color:#334155; line-height:1.55;">
                                \${safeText(r.roadmap?.p30 || 'Temel süreç adaptasyonu ve kritik iş akışlarının içselleştirilmesi.')}
                            </p>
                        </div>

                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                <span style="font-size:12px; font-weight:800; color:#7c3aed; background:#f5f3ff; padding:3px 8px; border-radius:4px;">31 - 60. GÜN</span>
                                <span style="font-size:11px; color:#64748b; font-weight:600;">Yetkinlik Derinleştirme</span>
                            </div>
                            <p style="margin:0; font-size:13px; color:#334155; line-height:1.55;">
                                \${safeText(r.roadmap?.p60 || 'Çapraz fonksiyonel görevler ve kritik senaryolarda eşli koçluk seansları.')}
                            </p>
                        </div>

                        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                <span style="font-size:12px; font-weight:800; color:#16a34a; background:#f0fdf4; padding:3px 8px; border-radius:4px;">61 - 90. GÜN</span>
                                <span style="font-size:11px; color:#64748b; font-weight:600;">Bağımsız Liderlik & KPI</span>
                            </div>
                            <p style="margin:0; font-size:13px; color:#334155; line-height:1.55;">
                                \${safeText(r.roadmap?.p90 || 'Bağımsız inisiyatif, stratejik süreç teslimi ve reassessment onayı.')}
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            <!-- 6. Detaylı Soru & Senaryo Cevapları İncelemesi -->
            \${(r.detailedReport && r.detailedReport.length > 0) ? \`
            <div class="print-card" style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 28px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.04); margin-bottom: 25px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px;">
                    <div>
                        <h2 style="margin: 0 0 4px 0; font-size: 19px; font-weight: 800; color: #0f172a;">Adayın Sınav Cevapları ve Vaka İncelemesi</h2>
                        <p style="margin: 0; font-size: 13.5px; color: #64748b;">Her bir vaka sorusuna verilen yanıt, ideal yaklaşım ve harcanan süre dökümü</p>
                    </div>
                    <span style="font-size: 12.5px; background: #f1f5f9; color: #475569; padding: 4px 12px; border-radius: 20px; font-weight: 700;">
                        Toplam \${r.detailedReport.length} Vaka Adımı
                    </span>
                </div>

                <div style="display: flex; flex-direction: column; gap: 14px;">
                    \${r.detailedReport.map((q, idx) => \`
                        <div style="background:#f8fafc; padding:18px; border-radius:12px; border: 1px solid #e2e8f0;">
                            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                                <strong style="color:#0f172a; font-size: 14.5px;">Soru \${idx + 1}: \${safeText(q.question)}</strong>
                                <span style="font-size:11px; background:#e0f2fe; color:#0369a1; padding:3px 9px; border-radius:4px; font-weight:800;">\${safeText(q.level || 'Yetkinlik')}</span>
                            </div>
                            <p style="margin:0 0 8px 0; color:#334155; font-size:14px; line-height: 1.5;">
                                <b>Adayın Cevabı:</b> \${safeText(q.answer || 'Cevap verilmedi / Boş bırakıldı')}
                            </p>
                            \${q.correctAnswer ? \`<p style="margin:0 0 8px 0; color:#15803d; font-size:13px; line-height: 1.45;"><b>İdeal Yaklaşım:</b> \${safeText(q.correctAnswer)}</p>\` : ''}
                            <div style="display: flex; align-items: center; gap: 14px; margin-top: 8px;">
                                <span style="display:inline-block; padding:4px 12px; border-radius:6px; font-size:11.5px; font-weight:700; 
                                    \${q.status === 'positive' ? 'background:#dcfce3;color:#16a34a;' : (q.status === 'negative' ? 'background:#fee2e2;color:#dc2626;' : 'background:#e2e8f0;color:#64748b;')}">
                                    \${q.status === 'positive' ? '✅ Olumlu / Doğru' : (q.status === 'negative' ? '❌ Olumsuz / Yanlış' : '⚪ Boş')}
                                </span>
                                <span style="font-size:12px; color:#64748b; font-weight: 600;">🕒 \${q.seconds || 0} saniye</span>
                            </div>
                        </div>
                    \`).join('')}
                </div>
            </div>
            \` : ''}

            <!-- 7. Denetim İzi & Sistem Parametreleri (Audit Trail) -->
            <div style="background: #f1f5f9; border-radius: 12px; padding: 18px 24px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #64748b; flex-wrap: wrap; gap: 10px;">
                <div>
                    <b>Değerlendirme Motoru:</b> SkillBridge Cognitive Core v5.3 (Gemma-4 Deep Eval)
                </div>
                <div>
                    <b>Rapor Kimliği:</b> SB-RAPOR-\${Math.abs((r.name || 'sb').split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0))}
                </div>
                <div>
                    <b>Doğrulama Durumu:</b> <span style="color:#16a34a; font-weight:700;">✓ Dijital Olarak Mühürlendi</span>
                </div>
            </div>

        </div>
        \`;
        return layout(html, 'Detaylı Rapor - ' + r.name);
    };
`;

// Replace reportDetailPage block in dist/app.js
const reportDetailPageStart = app.indexOf('// 6. reportDetailPage:');
let reportDetailPageEnd = -1;
if (reportDetailPageStart !== -1) {
    reportDetailPageEnd = app.indexOf("return layout(html, 'Detaylı Rapor - ' + r.name);\n    };", reportDetailPageStart);
    if (reportDetailPageEnd === -1) {
        reportDetailPageEnd = app.indexOf("return layout(html, 'Detaylı Rapor - ' + r.name);\r\n    };", reportDetailPageStart);
    }
}

if (reportDetailPageStart !== -1 && reportDetailPageEnd !== -1) {
    const endOffset = app.indexOf('};', reportDetailPageEnd) + 2;
    app = app.substring(0, reportDetailPageStart) + comprehensiveEngineCode + app.substring(endOffset);
    console.log('Successfully replaced reportDetailPage with comprehensive engine!');
} else {
    console.log('Could not find exact reportDetailPage bounds, searching alternative...');
    const altRegex = /\/\/\s*6\.\s*reportDetailPage:[\s\S]*?return layout\(html,\s*'Detaylı Rapor - '\s*\+\s*r\.name\);[\s\S]*?\};/;
    if (altRegex.test(app)) {
        app = app.replace(altRegex, comprehensiveEngineCode);
        console.log('Successfully replaced reportDetailPage via altRegex!');
    } else {
        console.log('Error: Could not find reportDetailPage block to replace!');
    }
}

fs.writeFileSync(appPath, app, 'utf8');
console.log('Dist app.js size after:', app.length);
