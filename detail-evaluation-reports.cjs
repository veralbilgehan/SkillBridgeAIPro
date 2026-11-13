const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'dist', 'app.js');
let app = fs.readFileSync(appPath, 'utf8');

console.log('Original dist/app.js length:', app.length);

// 1. Prepare rich candidate data for the 3 core sample candidates
const richSenemYigit = `{name:'Senem Yiğit',email:'senem.yigit@gmail.com',test:'Çalışan Adayı',department:'AR-GE',detail:'Hizmet, Sağlık ve Eğitim',score:0,outcome:'Geliştirilmeli (Yetersiz)',date:'13.09.2026',time:'18:46:43',
  summary:'Yetenek ve Yetkinlik Değerlendirme Sonucu: Geliştirilmeli (Yetersiz). Adayın tüm ölçülen bilişsel ve temel yetkinliklerde sergilediği performans, AR-GE ve Sağlık / Eğitim alanındaki Çalışan Adayı pozisyonu için beklenen asgari seviyenin oldukça altında kalmıştır. Adayın kriz anlarında karar alma reflekslerinde pasif kaldığı, belirsizlik karşısında inisiyatif alamadığı ve teknik soruları yanıtsız bıraktığı saptanmıştır.',
  psychologicalProfile:'Adayın bilişsel ve davranışsal reaksiyon profili incelendiğinde; belirsizlik, zaman kısıtı ve kriz senaryoları altında karar vermekten çekindiği ve kaçınma refleksi geliştirdiği gözlemlenmiştir. Problem Çözme, Stratejik Düşünme ve İletişim eksenlerinde özgüven eksikliği ve pasif bekleme eğilimi baskındır. Verilen yanıtlarda analitik bir metodoloji (kök neden analizi, etki haritalama, önceliklendirme) görülmemektedir. Adayın ekip içi çatışma ve ani gelişen krizlerde proaktif çözüm üretmek yerine sorumluluğu dışsallaştırdığı ve çekimser kaldığı tespit edilmiştir.',
  strengths:[
    'Yönerge Takip Uyumu: Yüksek oranda yapılandırılmış, net talimatlı ve düşük belirsizlikli rutin iş ortamlarında çalışma potansiyeli.',
    'Gözlem ve Dinleme Eğilimi: Hızlı fevri kararlar almaktan kaçınarak bekleme refleksi göstermesi.',
    'Gelişime Açıklık: Temel eğitim ve mentorluk desteğiyle baştan şekillendirilebilir ham yetkinlik profili.'
  ],
  watchouts:[
    '🚨 Yüksek Karar Tereddüdü: Kriz ve belirsizlik anlarında donakalma (freezing) ve pasif bekleme refleksi.',
    '🚨 Çatışma Kaçınması: Ekip içi uyuşmazlıklarda yapıcı müzakere yerine tamamen geri çekilme davranışı.',
    '🚨 Görevi Erken Terk Etme: Teknik veya zorlu adımlarda soruyu boş bırakarak vazgeçme eğilimi.'
  ],
  errorDetector:'Adayın simülasyon ve vaka testindeki yanıtları analiz edildiğinde 3 kritik bilişsel zafiyet tespit edilmiştir:\\n1. Kriz Refleksi Zafiyeti: \\'Kriz anında ilk olarak ne yaparsınız?\\' sorusuna verilen \\'Beklerim\\' yanıtı, kriz yönetiminde kabul edilemez bir atalet ve inisiyatif yoksunluğunu temsil etmektedir.\\n2. İletişim ve Çözüm Blokajı: \\'Takım içi çatışmayı nasıl çözersiniz?\\' sorusuna verilen \\'Bilmiyorum\\' cevabı, temel çatışma çözme ve müzakere reflekslerinin henüz oluşmadığını ortaya koymaktadır.\\n3. Süreçten Kopma: Teknik öğrenme sorusunun tamamen boş bırakılması, stres toleransının düşüklüğünü ve bilişsel direnç eksikliğini göstermektedir.',
  benchmark:'Adayın %0\\'lık değerlendirme skoru, Hizmet, Sağlık ve Eğitim Ar-Ge sektöründeki aday havuzunun %1\\'lik en alt diliminde yer almaktadır. Sektör genelinde bu rol için ortalama başarı düzeyi %58, beklenen asgari kabul barajı ise %50\\'dir. Aday, sektörün medyan performansının 58 puan gerisindedir ve mevcut yetkinlik seviyesiyle bağımsız bir iş sürecini yürütmeye hazır değildir.',
  mentorDecision:'Adayın mevcut yetkinlik seviyesi \\'Çalışan Adayı\\' pozisyonu için yetersiz bulunmuştur. Mevcut haliyle doğrudan işe alımı veya kritik operasyonlara atanması önerilmemektedir. Adayın temel iş yetkinliklerini kazanabilmesi için 90 günlük yapılandırılmış bir ön hazırlık ve temel eğitim programını tamamlaması, ardından yeniden değerlendirmeye tabi tutulması tavsiye edilir.',
  roadmap:{
    p30:'Temel Problem Çözme ve İletişim Atölyeleri: 5 Neden analizi, Balık Kılçığı metodolojisi ve aktif dinleme eğitimleri.',
    p60:'Simüle Vaka Çalışmaları ve Eşli Mentorluk: Haftalık kontrollü senaryolarda karar verme ve ekip içi rol oynama pratikleri.',
    p90:'Bağımsız Küçük Ölçekli Görevler & Geri Bildirim Döngüsü: Düşük riskli mikro görevlerin teslimi ve kapsamlı reassessment testi.'
  },
  metrics:{ accuracy: 0, speed: '6.7 sn/soru (Aşırı acele/vazgeçme)', consistency: '%12 (Düşük)', riskFactor: 'YÜKSEK', percentile: 'Alt %1' },
  competencies:[
    {name:'Problem Çözme',category:'BİLİŞSEL',score:0,target:60,levelName:'Seviye 1 (Başlangıç / Destek Gerekli)',levelDesc:'Problemler karşısında pasif kalır, yönlendirme ve doğrudan müdahale olmadan çözüm üretemez.'},
    {name:'Analitik Düşünme',category:'BİLİŞSEL',score:0,target:60,levelName:'Seviye 1 (Başlangıç / Destek Gerekli)',levelDesc:'Veri ve durumları sistematik parçalara ayıramaz, sezgisel ve yüzeysel yaklaşır.'},
    {name:'Karar Verme',category:'BİLİŞSEL',score:0,target:60,levelName:'Seviye 1 (Başlangıç / Destek Gerekli)',levelDesc:'Belirsizlik anında karar vermekten kaçınır, eylemsizlik gösterir.'},
    {name:'İletişim ve İş Birliği',category:'TEMEL',score:10,target:70,levelName:'Seviye 1 (Başlangıç / Destek Gerekli)',levelDesc:'Duygu ve fikir aktarımında tutuktur, çatışma anında geri çekilir.'},
    {name:'Sonuç Odaklılık',category:'YÖNETSEL',score:0,target:65,levelName:'Seviye 1 (Başlangıç / Destek Gerekli)',levelDesc:'Hedef baskısı altında odak kaybeder, engeller karşısında süreci durdurur.'},
    {name:'Süreç ve Kalite Disiplini',category:'FONKSİYONEL',score:15,target:75,levelName:'Seviye 1 (Başlangıç / Destek Gerekli)',levelDesc:'Kurumsal standartları ve iş akışlarını takip etmekte zorlanır.'}
  ],
  detailedReport: [
     {question: 'Kriz anında ilk olarak ne yaparsınız?', answer: 'Beklerim.', status: 'negative', seconds: 12, level:'Bilişsel', correctAnswer:'Durum tespiti yapar, riskleri önceliklendirir ve paydaşları bilgilendirerek acil eylem planını devreye alırım.'},
     {question: 'Takım içi çatışmayı nasıl çözersiniz?', answer: 'Bilmiyorum.', status: 'negative', seconds: 8, level:'Davranışsal', correctAnswer:'Tarafları ayrı ayrı ve birlikte dinler, ortak hedefe odaklayarak yapıcı uzlaşma protokolü oluştururum.'},
     {question: 'Yeni bir yazılım dilini veya aracı ne kadar sürede öğrenirsiniz?', answer: '', status: 'blank', seconds: 0, level:'Teknik', correctAnswer:'Dokümantasyon ve pratik projelerle 2-3 haftada temel işlevleri, 2 ayda ileri seviye mimariyi çözerim.'}
  ]}`;

const richAday003 = `{name:'Aday 003',email:'aday003@skillbridge.com.tr',test:'Proje Yönetimi Yetkinlik Testi',department:'Proje Yönetimi',detail:'Denizcilik ve Gemi İnşa',score:61,outcome:'Olumlu (Koşullu / Gelişime Açık)',date:'11.09.2026',time:'11:24:08',
  summary:'Yetenek ve Yetkinlik Değerlendirme Sonucu: Olumlu (Koşullu / Gelişime Açık). Aday temel proje yönetimi bilgi ve araç hakimiyetini kanıtlamış olup, Denizcilik ve Gemi İnşa projelerinde beklenen orta düzey yetkinlik eşiğini (%60) aşmıştır. Planlama ve değişiklik yönetimi refleksleri güçlü olmakla birlikte; risk belgeleme, proaktif paydaş iletişimi ve kriz önleme mekanizmalarında yapılandırılmış gelişim alanları mevcuttur.',
  psychologicalProfile:'Adayın yönetsel ve bilişsel profili; görev odaklı, metodolojik araçları (Jira, MS Project) kullanmaya yatkın ve standart iş süreçlerini başarıyla yürüten bir yapıyı işaret etmektedir. Talep değişikliklerinde analitik etki değerlendirmesi yapabilme refleksi pozitiftir. Ancak belirsizlik ve risk yönetimi söz konusu olduğunda reaktif kalma eğilimindedir. Riskleri sistematik bir Risk Kütüğü (Risk Register) ve etki-olasılık matrisiyle takip etmek yerine gayriresmi kanallarla (e-posta) yönetmeye çalışması, yüksek bütçeli gemi inşa projelerinde bilgi kaybına ve operasyonel kırılganlığa yol açabilir. Mentorluk eşliğinde ileri seviye risk liderliğine evrilebilecek yüksek bir potansiyel barındırmaktadır.',
  strengths:[
    'Planlama Araçları Yetkinliği: Jira ve MS Project üzerinde iş kırılım yapısı (WBS) kurma becerisi.',
    'Kapsam Değişikliği Disiplini: Müşteri taleplerini resmi form ve bütçe/zaman analiziyle karşılama refleksi.',
    'Süreç Uyumu: Standart proje döngülerini disiplinli takip edebilme.'
  ],
  watchouts:[
    '⚠️ Reaktif Risk Yönetimi: Riskleri kurumsal risk siciline kaydetmek yerine gayriresmi bildirimle geçiştirme eğilimi.',
    '⚠️ Paydaş Şeffaflığı: Kriz anlarında çok paydaşlı eskalasyon mekanizmalarını yeterince işletememe.',
    '⚠️ Detaycı Bütçe İzleme: Beklenmedik maliyet sapmalarında kök neden analizine geç kalma riski.'
  ],
  errorDetector:'Adayın testteki refleksleri detaylandırıldığında en belirgin yanılgı \\'Risk Yönetimi\\' alanında görülmüştür:\\n- Refleks Zafiyeti: \\'Riskleri nasıl belgelersiniz?\\' sorusuna verilen \\'Sadece mail atarım\\' yanıtı, Denizcilik ve Gemi İnşa gibi yüksek maliyetli ve regülasyona tabi sektörlerde kritik bir denetim ve kurumsallık açığıdır. Risklerin olasılık, etki, bütçe ve karşı önlem planıyla resmi Risk Kütüğüne (Risk Register / FMEA) işlenmemesi, olası hukuki ve teknik uyuşmazlıklarda projeyi savunmasız bırakır.\\n- Pozitif Refleks: Kapsam değişikliğinde anında \\'Değişiklik Talep Formu (CRF)\\' işletmesi ise olgun bir proje yönetimi refleksidir.',
  benchmark:'Adayın %61\\'lik skoru, Denizcilik ve Gemi İnşa Proje Yönetimi alanındaki akran havuzunun %54\\'lük medyan seviyesinin üzerinde, %58\\'lik persentil dilimindedir. Sektörün en iyi %10 dilimindeki proje yöneticileri ortalama %84 skor alırken, aday çekirdek operasyonları yönetebilecek sağlam bir orta kademe proje lideri profili çizmektedir.',
  mentorDecision:'Aday, Denizcilik ve Gemi İnşa projelerinde \\'Yardımcı Proje Yöneticisi\\' veya orta ölçekli retrofit/modernizasyon projelerinde \\'Proje Yöneticisi\\' olarak istihdam edilmeye UYGUNDUR. Kritik ve yeni inşa (new-build) projelerine geçişi öncesinde, PMP / PMI standartlarında risk yönetimi ve sözleşme yönetimi koçluğu alması şart koşulmalıdır.',
  roadmap:{
    p30:'Tersane Süreçleri ve Kurumsal PMO Standartları: Kurumsal Risk Kütüğü (Risk Matrix) şablonlarının içselleştirilmesi ve saha denetimi.',
    p60:'Tedarikçi ve Klas Kuruluşu (Loyd) Koordinasyonu: Gemi inşa sözleşmeleri, ceza klozları ve hak talebi (claim) yönetimi mentorluğu.',
    p90:'Tam Kapsamlı Proje Simülasyonu: Bütçe, tedarik gecikmesi ve tersane grevi senaryolarında kriz tatbikatı ve PMP yetkinlik onayı.'
  },
  metrics:{ accuracy: 67, speed: '35 sn/soru (Dengeli)', consistency: '%72 (Beklenen)', riskFactor: 'ORTA', percentile: 'Üst %42' },
  competencies:[
    {name:'Proje Planlama ve Araç Hakimiyeti',category:'BİLİŞSEL',score:80,target:65,levelName:'Seviye 4 (İleri)',levelDesc:'MS Project, Jira ve Gantt araçlarını ustalıkla kullanarak iş paketlerini planlar.'},
    {name:'Değişiklik Yönetimi',category:'FONKSİYONEL',score:75,target:65,levelName:'Seviye 4 (İleri)',levelDesc:'Kapsam sapmalarını tespit eder, etki analizini çıkarır ve onay mekanizmasını işletir.'},
    {name:'Risk ve Kriz Yönetimi',category:'TEKNİK',score:40,target:70,levelName:'Seviye 2 (Gelişmekte Olan)',levelDesc:'Riskleri fark eder ancak kurumsal risk araçları yerine reaktif bildirimlerle yönetir.'},
    {name:'Paydaş İletişimi ve Müzakere',category:'TEMEL',score:55,target:70,levelName:'Seviye 3 (Orta / Beklenen)',levelDesc:'Müşteri ve alt yüklenicilerle standart iletişimi sürdürür, krizde üst yönetime başvurur.'},
    {name:'Bütçe ve Maliyet Kontrolü',category:'FONKSİYONEL',score:60,target:65,levelName:'Seviye 3 (Orta / Beklenen)',levelDesc:'Hakediş ve kaynak harcamalarını belirlenen bütçe limitleri dahilinde takip eder.'},
    {name:'Liderlik ve Saha Koordinasyonu',category:'YÖNETSEL',score:56,target:60,levelName:'Seviye 3 (Orta / Beklenen)',levelDesc:'Teknik ekip ve taşeronlar arasındaki günlük operasyonel koordinasyonu sağlar.'}
  ],
  detailedReport: [
     {question: 'Projeyi zamanında teslim etmek için hangi aracı kullanırsınız?', answer: 'Jira ve MS Project kullanıyorum.', status: 'positive', seconds: 32, level:'Teknik', correctAnswer:'Kritik yol (CPM) analizi ve EVM metrikleriyle MS Project/Jira entegrasyonu kullanırım.'},
     {question: 'Müşteri aniden kapsamı değiştirirse nasıl tepki verirsiniz?', answer: 'Değişiklik talebi formu oluştururum ve bütçe/zaman etkisini analiz ederim.', status: 'positive', seconds: 55, level:'Yönetsel', correctAnswer:'Değişiklik Talep Prosedürünü (CR) başlatır, maliyet/süre etkisini çıkarır ve sponsor onayına sunarım.'},
     {question: 'Riskleri nasıl belgelersiniz?', answer: 'Sadece mail atarım.', status: 'negative', seconds: 18, level:'Bilişsel', correctAnswer:'Kurumsal Risk Kütüğüne (Risk Register) etki-olasılık skorlarıyla kaydeder ve aksiyon sahiplerini atarım.'}
  ]}`;

const richSuperYonetici = `{name:'Süper Yönetici',email:'bilgehanveral@gmail.com',test:'MÜDÜR YARDIMCISI',department:'Tekstil, Hazır Giyim ve Deri Endüstrisi',detail:'Perakende Ticaret',score:100,outcome:'Şiddetle Tavsiye Edilir',date:'12.09.2026',time:'14:05:42',
  summary:'Yetenek ve Yetkinlik Değerlendirme Sonucu: Şiddetle Tavsiye Edilir. Adayın tüm ölçülen yetkinliklerde sergilediği kusursuz performans, "MÜDÜR YARDIMCISI / Perakende Ticaret" pozisyonu için aranan tüm niteliklere fazlasıyla sahip olduğunu kanıtlamaktadır. Kendisi, karmaşık perakende ortamında anında değer katabilecek, stratejik düşünebilen ve sonuç odaklı bir profesyoneldir.',
  psychologicalProfile:'Aday, "MÜDÜR YARDIMCISI / Perakende Ticaret" pozisyonu için kritik öneme sahip Analitik Düşünme, Problem Çözme, Karar Verme, İletişim, Sonuç Odaklılık, İnisiyatif Alma, Süreç Odaklılık, Stratejik Düşünme, Vizyoner Liderlik ve İlişki Yönetimi yetkinliklerinin tamamında %100 başarı göstererek olağanüstü bir performans sergilemiştir. Özellikle müşteri geri bildirimlerini analiz etme, kişiselleştirilmiş çözümler sunma ve kurumsal standartlar geliştirme konularındaki yetkinliği dikkat çekicidir. Bu sonuçlar, adayın perakende sektöründeki karmaşık durumları anlama, etkili çözümler üretme ve stratejik kararlar alma konusundaki üstün kapasitesini net bir şekilde ortaya koymaktadır.',
  strengths:[
    'Stratejik Vizyon ve Sistemik Düşünme: Perakende dinamiklerini çok boyutlu analiz edebilme ve kurumsal standart koyma.',
    'Kusursuz Karar Verme Refleksi: Kriz ve belirsizlik anında sakin, hızlı ve kök nedene dayalı çözümler üretme.',
    'Yüksek Duygusal Zeka & Paydaş Müzakeresi: Müşteri memnuniyetini maksimize ederken kurum hedeflerini tavizsiz koruma.'
  ],
  watchouts:[
    '✨ Aşırı Mükemmeliyetçilik Riski: Kendi yüksek standartlarını tüm ekibe empoze ederken mikro yönetim tuzağına düşmeme konusunda farkındalık.',
    '✨ Delegasyon Dengesi: Kritik süreçleri bizzat üstlenme isteği yerine ekibi yetkilendirmeye odaklanması önerilir.'
  ],
  errorDetector:'Adayın sınavdaki tüm sorulara doğru yanıt vermesi nedeniyle herhangi bir refleks zafiyeti veya hata tespit edilmemiştir. Her bir soruya verilen cevaplar, adayın ölçülen yetkinlikleri kavramsal ve pratik düzeyde eksiksiz anladığını göstermektedir. Bu durum, adayın baskı altında bile tutarlı ve doğru kararlar verebilme yeteneğini ve analitik düşünme süreçlerindeki sağlamlığını ortaya koymaktadır.',
  benchmark:'Adayın %100\\'lük genel başarı skoru, pozisyon için belirlenen ideal profilin çok üzerinde bir performansı temsil etmektedir. Bu sonuç, adayın sadece beklentileri karşılamakla kalmadığını, aynı zamanda perakende sektöründeki bir Müdür Yardımcısından beklenen tüm yetkinlikleri en üst düzeyde içselleştirdiğini ve uygulayabildiğini göstermektedir. Sektördeki benzer pozisyonlar için benchmark analizlerinde, adayın bu seviyedeki tutarlı başarısı onu potansiyel lider adayları arasında zirveye yerleştirmektedir.',
  mentorDecision:'Adayın bu değerlendirmede tüm yetkinliklerde %100 başarı göstermesi nedeniyle doğrudan bir gelişim alanı belirlenmemiştir. Ancak sürekli öğrenme ve gelişim perspektifiyle, adayın mevcut üstün yetkinliklerini daha da derinleştirmesi önerilir. Özellikle, perakende sektöründeki dijital dönüşüm ve yapay zeka destekli müşteri analitiği konularında ileri düzey eğitimler alarak bilgi birikimini artırabilir. Ayrıca, mağaza dışı kurumsal ağlarda liderlik rolü üstlenebileceği çapraz fonksiyonlu projelere katılım sağlamak, stratejik vizyonunu genişletmesine yardımcı olacaktır. Gelecekteki üst düzey yöneticilik pozisyonları için mentörlük programlarına dahil olması ve uluslararası perakende trendlerini takip etmesi tavsiye edilir.',
  roadmap:{
    p30:'Üst Düzey Yönetim Oryantasyonu & Çoklu Mağaza Portföy Analizi: Bölgesel KPI hedeflerinin belirlenmesi.',
    p60:'Omnichannel & Dijital Perakende İnovasyon Stratejisi Liderliği: Yapay zeka destekli stok ve müşteri analitiği entegrasyonu.',
    p90:'Yurt Dışı Pazarlar & Geleceğin Perakendesi Dönüşüm Programı Patronluğu: Kurumsal mentörlük ve direktörlük hazırlığı.'
  },
  metrics:{ accuracy: 100, speed: '34 sn/soru (İdeal)', consistency: '%100 (Kusursuz)', riskFactor: 'ASGARİ', percentile: 'Zirve %0.1' },
  competencies:[
    {name:'Analitik Düşünme',category:'BİLİŞSEL',score:100,target:60,levelName:'Seviye 5 (Örnek)',levelDesc:'Kritik problemlerde örnek düzeydedir, kurumsal standart geliştirir.'},
    {name:'Problem Çözme',category:'BİLİŞSEL',score:100,target:60,levelName:'Seviye 5 (Örnek)',levelDesc:'Kritik işlerde yöntem geliştirir, kuruma yaygınlaştırır.'},
    {name:'Karar Verme',category:'BİLİŞSEL',score:100,target:60,levelName:'Seviye 5 (Örnek)',levelDesc:'Çok boyutlu belirsizlikte stratejik ve hızlı kararlar alır.'},
    {name:'İletişim ve Müzakere',category:'TEMEL',score:100,target:70,levelName:'Seviye 5 (Örnek)',levelDesc:'Paydaşlar ve ekipler arası köprü kurarak mutabakat sağlar.'},
    {name:'Vizyoner Liderlik',category:'YÖNETSEL',score:100,target:65,levelName:'Seviye 5 (Örnek)',levelDesc:'Ekipleri ortak amaca yönlendirir, yüksek motivasyonla yönetir.'},
    {name:'Süreç ve Perakende Operasyonu',category:'FONKSİYONEL',score:100,target:75,levelName:'Seviye 5 (Örnek)',levelDesc:'Uçtan uca mağaza ve tedarik süreçlerini optimize eder.'}
  ],
  detailedReport: [
      {question: 'Müşteri memnuniyetsizliği ve iade krizinde ilk refleksiniz ne olur?', answer: 'Müşteriyi aktif dinler, anında telafi sunar ve kök neden analiziyle sistemik önlem alırım.', status: 'positive', seconds: 28, level:'Davranışsal', correctAnswer:'Müşteriyi empatik dinleyerek memnuniyeti anında geri kazanır, hatanın kök nedenini sistemde kalıcı olarak gideririm.'},
      {question: 'Mağaza içi stok tutarsızlığı tespit edildiğinde süreci nasıl yönetirsiniz?', answer: 'ERP ve sayım eşleştirmesi yapar, barkod/sevkiyat izleme mekanizmasını güncellerim.', status: 'positive', seconds: 34, level:'Fonksiyonel', correctAnswer:'ERP ve fiziki sayım çapraz kontrolünü yapar, RFID/barkod izlenebilirlik sürecini anında denetlerim.'},
      {question: 'Hedef baskısı altında ekip motivasyonunu nasıl sağlarsınız?', answer: 'Şeffaf KPI hedefleri koyar, başarıyı takdir eder ve mikro-engelleri kaldırırım.', status: 'positive', seconds: 40, level:'Yönetsel', correctAnswer:'Şeffaf KPI hedefleri, mikro-engellerin kaldırılması ve başarıyı ödüllendiren koçluk modeliyle ekibi motive ederim.'}
  ]}`;

const newCandidateResultsCode = `const candidateResults=[
` + richSenemYigit + `,
` + richSuperYonetici + `,
` + richAday003 + `
];`;

// Replace initial candidateResults array in app
const candRegex = /const candidateResults=\[\s*\{name:'Senem Yiğit'[\s\S]*?\}\s*\];/;
if (candRegex.test(app)) {
    app = app.replace(candRegex, newCandidateResultsCode);
    console.log('Static candidateResults updated with rich data for all candidates!');
} else {
    console.log('candRegex did not match directly, trying broader match...');
    const candRegex2 = /const candidateResults=\[[\s\S]*?\];\s*window\.candidateResults = candidateResults;/;
    if (candRegex2.test(app)) {
        app = app.replace(candRegex2, newCandidateResultsCode + `\nwindow.candidateResults = candidateResults;`);
        console.log('candidateResults updated via fallback regex!');
    }
}

// 2. Replace modal showCandidateReport with page navigation
const oldModalShow = `    window.showCandidateReport = function(index) {
        const r = candidateResults[index];
        const modal = document.createElement('div');
        modal.className = 'modal candidate-modal';`;

const fixedModalShow = `    window.showCandidateReport = function(index) {
        state.page = 'report_detail';
        state.reportIndex = index;
        render();
        return;
        const r = candidateResults[index];
        const modal = document.createElement('div');
        modal.className = 'modal candidate-modal';`;

if (app.includes(oldModalShow)) {
    app = app.replace(oldModalShow, fixedModalShow);
    console.log('Overriding modal showCandidateReport with full page navigation!');
}

// 3. Update transferEvaluationResult to include full detailedReport
const oldTransfer = `candidateResults.unshift({name:'Yeni Değerlendirilen Aday',email:'aday@skillbridge.com.tr',test:'Açık Uçlu Vaka Testi',department:'Değerlendirme Merkezi',detail:'Gemma 4 cevap değerlendirmesi',score:stats.rate,outcome:stats.rate>=60?'Olumlu':'Geliştirilmeli',date:new Date().toLocaleDateString('tr-TR'),time:new Date().toLocaleTimeString('tr-TR'),summary:stats.positive+' olumlu, '+stats.negative+' olumsuz ve '+stats.blank+' boş cevap değerlendirildi. Ortalama cevap süresi '+stats.avg+' saniyedir.'});`;

const newTransfer = `candidateResults.unshift({name:'Yeni Değerlendirilen Aday',email:'aday@skillbridge.com.tr',test:'Açık Uçlu Vaka Testi',department:'Değerlendirme Merkezi',detail:'Gemma 4 cevap değerlendirmesi',score:stats.rate,outcome:stats.rate>=60?'Olumlu':'Geliştirilmeli',date:new Date().toLocaleDateString('tr-TR'),time:new Date().toLocaleTimeString('tr-TR'),summary:stats.positive+' olumlu, '+stats.negative+' olumsuz ve '+stats.blank+' boş cevap değerlendirildi. Ortalama cevap süresi '+stats.avg+' saniyedir.',detailedReport:JSON.parse(JSON.stringify(evaluationAnswers))});`;

if (app.includes(oldTransfer)) {
    app = app.replace(oldTransfer, newTransfer);
    console.log('transferEvaluationResult updated to attach detailedReport!');
}

fs.writeFileSync(appPath, app, 'utf8');
console.log('dist/app.js updated successfully! Length:', app.length);
