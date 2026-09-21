const fs = require('fs');
let txt = fs.readFileSync('dist/app.js', 'utf8');

const replacement = `const candidateResults=[
 {name:'Senem Yiğit',email:'senem.yigit@gmail.com',test:'Çalışan Adayı',department:'AR-GE',detail:'Hizmet, Sağlık ve Eğitim',score:0,outcome:'Geliştirilmeli',date:'13.09.2026',time:'18:46:43',summary:'Aday; Problem Çözme, Stratejik Düşünme ve Risk Önleyici Düşünme yetkinliklerinde hedef seviyenin altında kalmıştır.', detailedReport: [
     {question: 'Kriz anında ilk olarak ne yaparsınız?', answer: 'Beklerim.', status: 'negative', seconds: 12},
     {question: 'Takım içi çatışmayı nasıl çözersiniz?', answer: 'Bilmiyorum.', status: 'negative', seconds: 8},
     {question: 'Yeni bir yazılım dilini ne kadar sürede öğrenirsiniz?', answer: '', status: 'blank', seconds: 0}
 ]},
 {name:'Süper Yönetici',email:'bilgehanveral@gmail.com',test:'Takım Lideri (Team Lead)',department:'Ulaştırma ve Depolama',detail:'Uluslararası forwarder, navlun fiyatlama ve intermodal taşımacılık',score:42,outcome:'Geliştirilmeli',date:'12.09.2026',time:'14:05:42',summary:'Yaratıcı Düşünme, Takım Çalışması ve operasyonel liderlik alanlarında gelişim önerilmektedir.', detailedReport: [
     {question: 'Ekibiniz motivasyon kaybı yaşıyor, ne yaparsınız?', answer: 'Toplantı yapıp hedefleri tekrar hatırlatırım.', status: 'positive', seconds: 45},
     {question: 'Operasyonel bir hata oluştuğunda kime raporlarsınız?', answer: 'Kimseye raporlamam, kendim çözerim.', status: 'negative', seconds: 20},
     {question: 'Bütçe kısıntısı durumunda takım motivasyonunu nasıl korursunuz?', answer: 'Zor olur.', status: 'negative', seconds: 15}
 ]},
 {name:'Aday 003',email:'aday003@skillbridge.com.tr',test:'Proje Yönetimi Yetkinlik Testi',department:'Proje Yönetimi',detail:'Denizcilik ve Gemi İnşa',score:61,outcome:'Olumlu',date:'11.09.2026',time:'11:24:08',summary:'Aday temel gereksinimleri karşılamış, risk yönetimi ve paydaş iletişiminde gelişim alanları göstermiştir.', detailedReport: [
     {question: 'Projeyi zamanında teslim etmek için hangi aracı kullanırsınız?', answer: 'Jira ve MS Project kullanıyorum.', status: 'positive', seconds: 32},
     {question: 'Müşteri aniden kapsamı değiştirirse nasıl tepki verirsiniz?', answer: 'Değişiklik talebi formu oluştururum ve bütçe/zaman etkisini analiz ederim.', status: 'positive', seconds: 55},
     {question: 'Riskleri nasıl belgelersiniz?', answer: 'Sadece mail atarım.', status: 'negative', seconds: 18}
 ]}
];`;

const startIdx = txt.indexOf('const candidateResults=[');
if (startIdx > -1) {
    const endIdx = txt.indexOf('];', startIdx) + 2;
    txt = txt.substring(0, startIdx) + replacement + txt.substring(endIdx);
    fs.writeFileSync('dist/app.js', txt, 'utf8');
    console.log('Updated mock detailed reports.');
} else {
    console.log('Could not find candidateResults');
}
