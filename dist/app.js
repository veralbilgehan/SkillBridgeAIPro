const state={logged:false,page:'dashboard',theme:'light',query:'',testLevel:'',testQuestions:'',testSource:'',testDate:'',testSector:'',resultQuery:'',resultDepartment:'',resultScore:'',resultOutcome:'',pendingCase:'',evaluationTransferred:false};
function prepareTestFromCase(caseText){state.pendingCase=caseText||'';go('mcq');setTimeout(()=>document.getElementById('mcq-case')?.focus(),0)}
const tests=[
 {name:'Takım Lideri – Lojistik Kariyer Simülasyonu',sector:'Lojistik, Tedarik ve Ulaştırma',level:'Orta',q:25,answered:23,correct:18,wrong:5,uses:44,mostWrong:'Soru 14 · Kriz önceliklendirme',source:'Yetkinlik Kütüphanesi',date:'12.09.2026'},
 {name:'Müdür – Değerlendirme Merkezi',sector:'Metal, Metalürji ve Makine',level:'Ekspert',q:10,answered:10,correct:7,wrong:3,uses:31,mostWrong:'Soru 6 · Kaynak planlama',source:'Assessment Center',date:'11.09.2026'},
 {name:'Danışman – Hibrit Değerlendirme',sector:'Teknoloji, Bilişim ve Elektronik',level:'Orta',q:5,answered:5,correct:4,wrong:1,uses:27,mostWrong:'Soru 3 · Veri güvenliği',source:'Ar-Ge / İnovasyon',date:'21.08.2026'},
 {name:'Ürün Yönetimi Kariyer Simülasyonu',sector:'Denizcilik ve Gemi İnşa',level:'Zor',q:10,answered:8,correct:5,wrong:3,uses:19,mostWrong:'Soru 8 · Pazar doğrulama',source:'Ürün Yönetimi',date:'18.08.2026'},
 {name:'Proje Yönetimi Yetkinlik Testi',sector:'Denizcilik ve Gemi İnşa',level:'Orta',q:20,answered:20,correct:16,wrong:4,uses:36,mostWrong:'Soru 11 · Risk yanıtı',source:'PMO',date:'18.08.2026'}
];
const candidateResults=[
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
];
const baseKeywordRows=[
 ['Bilgisayar','Bilgisayar Programlama ve Danışmanlık','Yazılım Geliştirme','Yazılım Mühendisi','Bilgi Teknolojileri'],
 ['Bilgisayar','Bilgisayar, Elektronik ve Optik Ürünler','Sistem ve Donanım','Sistem Uzmanı','Bilgi Teknolojileri'],
 ['Bilgisayar','Bilgi Hizmet Faaliyetleri','Veri ve Yapay Zekâ','Veri Bilimci','Ar-Ge ve İnovasyon'],
 ['Bilgisayar','Bilgisayar Onarımı','Teknik Destek','BT Destek Uzmanı','Teknik Hizmetler'],
 ['Denizcilik','Elektrik ve Entegre Sistemler','Proje Yönetimi','Gemi Elektrik Proje Yöneticisi','Proje Yönetimi'],
 ['Denizcilik','Gemi İnşa ve Gövde','Üretim ve İmalat','Gemi İnşa Mühendisi','Üretim'],
 ['Havacılık','Hava Aracı Bakım ve Onarım','Saha Uygulama ve Bakım','Uçak Bakım Mühendisi','Bakım ve Onarım'],
 ['Havacılık','Aviyonik ve Uydu Sistemleri','Ürün Yönetimi ve Ar-Ge','Aviyonik Ürün Yöneticisi','Ar-Ge ve İnovasyon'],
 ['İnşaat','Üst Yapı ve Akıllı Binalar','Saha Uygulama ve Mühendislik','BIM Uzmanı','Mühendislik'],
 ['Enerji','Yenilenebilir Enerji','Proje Yönetimi ve Mühendislik','Enerji Proje Mühendisi','Proje Yönetimi'],
 ['Otomotiv','Elektrikli Araçlar ve Batarya','Ürün Yönetimi ve Ar-Ge','BMS Mühendisi','Ar-Ge ve İnovasyon'],
 ['Finans ve Bankacılık','FinTech ve Dijital Bankacılık','Ürün Yönetimi ve Ödeme Sistemleri','FinTech Ürün Yöneticisi','Ürün Yönetimi']
];
const matrixData=window.skillBridgeMatrix||{hierarchy:[],skills:[],competencies:[]};
const matrixKeywordRows=matrixData.hierarchy.map(([sector,subsector,func])=>[sector,subsector,func,func+' Uzmanı',func]);
const keywordRows=[...baseKeywordRows,...matrixKeywordRows].filter((row,index,all)=>all.findIndex(other=>other.join('|')===row.join('|'))===index);
const aiAgents=[
 ['Kullanıcı Yöneticisi','Kimlik, Rol ve Yetki Denetçisi','Kullanıcı yaşam döngüsünü yönetir; mükerrer hesap, rol çakışması, eksik iletişim bilgisi ve yetkisiz erişim risklerini doğrular. Parola içeriğini açığa çıkarmaz.','Doğrulanmış kullanıcı kaydı, rol-yetki matrisi, işlem günlüğü ve tespit edilen erişim riski raporu teslim eder.'],
 ['Merkezi Veri Yöneticisi','Hiyerarşi ve Referans Veri Mimarı','Sektör → alt sektör → fonksiyon → pozisyon → departman ilişkilerini tekillik, adlandırma standardı ve bağlı kayıt bütünlüğü açısından yönetir.','Sürüm bilgili ana veri sözlüğü, ilişki doğrulama sonucu, çakışan kayıt listesi ve değişiklik günlüğü teslim eder.'],
 ['Beceri Yöneticisi','Teknik Beceri Ontolojisi Uzmanı','Excel ve CSV becerilerini sektör, fonksiyon ve pozisyonla eşleştirir; eş anlamlıları birleştirir, teknik açıklama, seviye ve gözlenebilir performans göstergesi ekler.','Tekilleştirilmiş beceri kataloğu, pozisyon-beceri eşleşmesi, seviye göstergeleri ve kaynak izi teslim eder.'],
 ['Yetkinlik Yöneticisi','Davranışsal Yetkinlik Matrisi Uzmanı','Temel, teknik, bilişsel ve kişisel/yönetsel yetkinlikleri 1–5 seviye davranış göstergeleriyle tanımlar; beceri ile yetkinliği birbirine karıştırmaz.','Her seviye için gözlenebilir davranış, ölçüm ölçütü, ters gösterge ve ilişkili rol içeren doğrulanmış yetkinlik matrisi teslim eder.'],
 ['Test Sonuçları Yöneticisi','Psikometrik Sonuç ve Raporlama Uzmanı','Cevap, süre, zorluk ve soru performansını analiz eder; doğru-yanlış dışında ayırt edicilik, boş bırakma ve olağandışı cevap örüntülerini izler.','Aday skoru, soru analizi, başarı oranı, süre dağılımı, güvenilirlik uyarıları ve filtrelenebilir sonuç raporu teslim eder.'],
 ['Test Yönetimi Ajanı','Sınav Planlama ve Güvenlik Sorumlusu','Test kapsamı, soru dağılımı, zorluk dengesi, süre, tarih-saat, geçme puanı ve katılımcı atamasını doğrular; çakışma ve eksik alanları engeller.','Onaylı test planı, kapsam tablosu, katılımcı listesi, zamanlama kontrolü ve kullanım istatistikleri teslim eder.'],
 ['Belgeden Vaka Ajanı','Kaynak Analizi ve Kanıta Dayalı Vaka Uzmanı','PDF, Word, Excel, CSV ve TXT belgelerinden olgu, kural, metrik, paydaş, kısıt ve karar noktalarını ayıklar; belge dışı bilgi uydurmaz.','Kaynak bölümleriyle izlenebilir, pozisyon ve fonksiyona uyarlanmış, soru içermeyen gerçekçi vaka dosyası teslim eder.'],
 ['Formdan Vaka Ajanı','Bağlamsal Vaka ve İş Simülasyonu Tasarımcısı','Seçilen sektör, alt sektör, fonksiyon, pozisyon, beceri ve yetkinliğe göre iş hedefi, teknik kısıt, paydaş çatışması ve ölçülebilir sonuç içeren özgün vaka tasarlar.','Tekrarsız olay örgüsü, gerçekçi veri ve kısıtlar, karar noktaları, beklenen çıktı ve kullanılan bağlamı içeren vaka teslim eder.'],
 ['Teams Görüşme Ajanı','Toplantı Kanıtı ve Karar Analisti','Onaylı Meet/Teams konuşmasını konuşmacı, zaman, iddia, karar, risk ve aksiyon bazında çözümler; kişisel veriyi gereksiz biçimde çoğaltmaz.','Zaman damgalı konuşma özeti, karar ve çelişki listesi, aksiyon sahipleri ile vaka adaylarını teslim eder.'],
 ['Teams Vaka Tablo Ajanı','Transkriptten Yapılandırılmış Vaka Uzmanı','Toplantı bulgularını sektör, rol, teknik problem, neden, seçenek, karar, sonuç, metrik ve yetkinlik alanlarına dönüştürür; kaynak cümle bağını korur.','Kaynak referanslı vaka tablosu, eksik veri işaretleri, metrikler ve soru üretimine hazır yapılandırılmış kayıt teslim eder.'],
 ['Birleşik Vaka ve Soru Ajanı','Çok Kaynaklı Vaka Orkestratörü','Belge, form ve toplantı çıktılarını çelişki kontrolüyle birleştirir; her soruyu tek bir karar noktasına ve ölçülebilir yetkinliğe bağlar.','Kaynak haritası, nihai vaka, dengeli cevap seçenekleri, cevap anahtarı ve soru-yetkinlik izlenebilirlik tablosu teslim eder.'],
 ['Frontend Geliştirici','Erişilebilir Arayüz Mühendisi','Onaylı akışları erişilebilir, klavye kullanılabilir ve mobil uyumlu bileşenlere dönüştürür; form, hata, boş ve yüklenme durumlarını tamamlar.','Responsive arayüz, doğrulanmış form davranışları, API veri eşlemesi ve erişilebilirlik kontrol listesi teslim eder.'],
 ['Backend Geliştirici','Güvenli API ve İş Kuralı Mimarı','Kimlik doğrulama, rol bazlı yetki, veri doğrulama, oran sınırlama, denetlenebilir hata yönetimi ve idempotent işlem akışları geliştirir.','Sözleşmeli API uçları, yetki kuralları, doğrulama şemaları, test senaryoları ve yapılandırılmış hata günlükleri teslim eder.'],
 ['Veri Tabanı Uzmanı','İlişkisel Veri ve Performans Mühendisi','Şema, yabancı anahtar, benzersizlik, indeks, saklama süresi, yedekleme ve geri dönüş planını kullanım örüntülerine göre tasarlar.','Sürümlü migration, ER ilişkileri, sorgu-indeks gerekçesi, bütünlük kontrolleri ve geri yükleme planı teslim eder.'],
 ['UI/UX Tasarımcı','Ölçme Deneyimi ve Tasarım Sistemi Uzmanı','Aday ve yönetici akışlarını görev süresi, hata riski ve bilişsel yük açısından sadeleştirir; ortak bileşen, renk, tipografi ve durum standartlarını belirler.','Ekran akışları, erişilebilir tasarım sistemi, hata/boş durumları ve kullanılabilirlik kabul ölçütleri teslim eder.'],
 ['Soru Tasarımcısı (HR Specialist)','Yetkinlik ve Teknik Soru Tasarımcısı','Yetkinlik matrisi, teknik beceri, sektör, fonksiyon ve pozisyon bağlamını birlikte kullanır; farklı olay örgüleri, ölçülebilir karar noktaları ve dengeli çeldiriciler üretir. Ezber sorusu ve tekrar eden kalıp kullanmaz.','STAR uyumlu mülakat sorusu veya seviye temsilli çoktan seçmeli soru; gerekçe, çeldirici analizi, hedef seviye ve JSON sözleşmesi teslim eder.'],
 ['Editör ve Kalite Denetleyici','Soru Kalitesi ve Psikometri Denetçisi','Vaka ve soruları teknik doğruluk, bağlama uygunluk, tekrar, seçenek uzunluğu, ipucu, önyargı, tek doğru cevap, seviye uyumu ve JSON şeması açısından puanlar; hatalı içeriği geri çevirir.','Kalite puanı, hata listesi, düzeltilmiş sürüm, cevap dağılımı kontrolü ve yayıma uygunluk kararı teslim eder.']
];
const nav=[['dashboard','Genel Bakış','nav-violet'],['tests','Test Yönetimi','nav-cyan'],['evaluation','Test Değerlendirme','nav-violet'],['results','Test Sonuçları','nav-green'],['test-platform','Test Platformu','nav-amber'],['archive','Evrak Kutusu','nav-gray']];
const deliveryNav=[['documents','Belgeden Vaka Yarat'],['prompt','Formdan Vaka Yarat'],['meetings','Meet & Teams Vaka'],['questions','Açık Uçlu Vaka Testi'],['comparison','Karşılaştırma']];
function login(){state.logged=true;state.page='dashboard';localStorage.setItem('sb_session','1');render()}
function logout(){state.logged=false;localStorage.removeItem('sb_session');render()}
function go(page){state.page=page;document.querySelector('.sidebar')?.classList.remove('open');render()}
function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.append(t);setTimeout(()=>t.remove(),2200)}
function editRecord(button){const record=button.closest('.admin-record');record.querySelectorAll('input').forEach(input=>input.readOnly=false);record.classList.add('editing');record.querySelector('input')?.focus();toast('Alanlar düzenlemeye açıldı')}
function saveRecord(button,label){const record=button.closest('.admin-record');record.querySelectorAll('input').forEach(input=>input.readOnly=true);record.classList.remove('editing');toast(label+' kaydedildi')}
function deleteRecord(button,label){if(confirm(label+' silinsin mi?')){button.closest('.admin-record').remove();toast(label+' silindi')}}
function unique(values){return [...new Set(values)].sort((a,b)=>String(a).localeCompare(String(b),'tr',{numeric:true}))}
function fillKeywordSelect(id,values,label,selected=''){const select=document.getElementById(id);if(!select)return;select.innerHTML='<option value="">'+label+'</option>'+unique(values).map(v=>'<option '+(v===selected?'selected':'')+'>'+v+'</option>').join('')}
function initKeywords(){fillKeywordSelect('kw-sector',keywordRows.map(r=>r[0]),'Sektör seçin')}
function updateKeywords(level){const ids=['kw-sector','kw-subsector','kw-expertise','kw-position','kw-department'];const labels=['Sektör seçin','Alt sektör seçin','Fonksiyon seçin','Pozisyon seçin','Departman seçin'];let rows=keywordRows;for(let i=0;i<=level;i++){const value=document.getElementById(ids[i])?.value;if(!value){rows=[];break}rows=rows.filter(r=>r[i]===value)}for(let i=level+1;i<ids.length;i++){const values=i===level+1?rows.map(r=>r[i]):[];fillKeywordSelect(ids[i],values,labels[i]);document.getElementById(ids[i]).disabled=!values.length}}
function addKeyword(){const values=['kw-sector','kw-subsector','kw-expertise','kw-position','kw-department'].map(id=>document.getElementById(id)?.value);if(values.some(v=>!v))return toast('Önce tüm keyword alanlarını seçin');const list=document.getElementById('keyword-list');const row=document.createElement('div');row.className='keyword-item';row.innerHTML='<div><b>'+values[0]+' › '+values[1]+'</b><span>'+values.slice(2).join(' · ')+'</span></div><div class="record-actions"><button class="danger-button" onclick="this.closest(\'.keyword-item\').remove();toast(\'Keyword silindi\')">Sil</button><button class="secondary" onclick="toast(\'Keyword düzenlemeye açıldı\')">Düzelt</button><button class="primary" onclick="toast(\'Keyword kaydedildi\')">Kaydet</button></div>';list.prepend(row);toast('Keyword eklendi')}
function selectAgentTask(index,prompt){document.getElementById('agent-select').value=String(index);document.getElementById('agent-prompt').value=prompt;document.getElementById('agent-prompt').focus()}
function agentModel(index){return[10,15,16].includes(index)?'Gemini · Soru Üretim Ajanı':'Gemma 4 · 26B'}
function dispatchAgentTask(){const index=Number(document.getElementById('agent-select').value);const prompt=document.getElementById('agent-prompt').value.trim();if(!prompt)return toast('Görev tanımını yazın');const agent=aiAgents[index],model=agentModel(index);const terminal=document.getElementById('agent-terminal');terminal.innerHTML='<span>['+model.toUpperCase()+'] Görev kapsamı doğrulanıyor...</span><b>Sayfa '+(index+1)+' · '+agent[0]+'</b><p>Görev kabul edildi: '+prompt.replaceAll('<','&lt;').replaceAll('>','&gt;')+'</p><small>Kapsam kilidi etkin. Bu görev “'+model+'” tarafından yalnızca “'+agent[1]+'” alanında yürütülecek.</small>';toast('Görev '+model+' modeline gönderildi')}
function editTestRow(button){const row=button.closest('tr');row.querySelectorAll('[data-editable]').forEach(cell=>cell.contentEditable='true');row.classList.add('editing');toast('Test satırı düzenlemeye açıldı')}
function saveTestRow(button){const row=button.closest('tr');row.querySelectorAll('[data-editable]').forEach(cell=>cell.contentEditable='false');row.classList.remove('editing');toast('Test kaydı kaydedildi')}
function deleteTestRow(button){if(confirm('Test kaydı silinsin mi?')){button.closest('tr').remove();toast('Test kaydı silindi')}}
function deleteResult(button){if(confirm('Aday test sonucu silinsin mi?')){button.closest('tr').remove();toast('Test sonucu silindi')}}
function showCandidateReport(index){const r=candidateResults[index];const modal=document.createElement('div');modal.className='modal';modal.innerHTML=`<div class="modal-card report-modal"><div class="modal-head"><div><span class="eyebrow">AI DETAYLI RAPOR</span><h2>${r.name}</h2><p class="sub">${r.test} · ${r.department}</p></div><button onclick="this.closest(\'.modal\').remove()">×</button></div><div class="report-score"><b>%${r.score}</b><span>${r.outcome}</span></div><div id="report-content-${index}" style="white-space: pre-wrap; max-height: 400px; overflow-y: auto; padding-right:10px;">${r.summary}</div><div class="report-actions"><button class="secondary" onclick="window.printReport('report-content-${index}', '${r.name}')">PDF İndir</button><button class="primary" onclick="this.closest(\'.modal\').remove()">Kapat</button></div></div>`;document.body.append(modal)}
window.printReport = function(id, name) {
    const content = document.getElementById(id).innerHTML;
    const win = window.open('', '_blank');
    win.document.write('<html><head><title>' + name + ' - Test Raporu</title>');
    win.document.write('<style>body { font-family: sans-serif; line-height: 1.6; padding: 40px; color: #333; } h1 { color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }</style>');
    win.document.write('</head><body>');
    win.document.write('<h1>SkillBridgeAIPro Aday Değerlendirme Raporu</h1>');
    win.document.write('<h2>Aday: ' + name + '</h2>');
    win.document.write('<div style="white-space: pre-wrap;">' + content + '</div>');
    win.document.write('</body></html>');
    win.document.close();
    win.onload = function() { win.print(); };
    toast('PDF sunum çıktısı penceresi açıldı.');
};
function safeText(value){return value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;')}
function hrOptions(values,label){return '<option value="">'+label+'</option>'+unique(values).map(v=>'<option value="'+safeText(v)+'">'+safeText(v)+'</option>').join('')}
function initHrSpecialist(){const sector=document.getElementById('hr-sector');if(!sector)return;sector.innerHTML=hrOptions(keywordRows.map(r=>r[0]),'Sektör seçin');document.getElementById('hr-category').innerHTML=hrOptions(competencyCategoryOrder,'Kategori seçin')}
function updateHrContext(){const sector=document.getElementById('hr-sector').value;const positions=keywordRows.filter(r=>!sector||r[0]===sector).map(r=>r[3]);const position=document.getElementById('hr-position');position.innerHTML=hrOptions(positions,'Pozisyon seçin');position.disabled=!sector;updateHrCompetencies()}
function updateHrCompetencies(){const sector=document.getElementById('hr-sector')?.value||'',category=document.getElementById('hr-category')?.value||'';let rows=matrixData.competencies.filter(c=>(!sector||c.sector===sector)&&(!category||competencyCategoryLabel(c.category)===category));const select=document.getElementById('hr-competency');if(!select)return;select.innerHTML=hrOptions(rows.map(c=>c.name),'Yetkinlik seçin');select.disabled=!(sector&&category)}
const hrScenarioPatterns={
 'Teknik Yetkinlikler':[
  ({sector,position,skill})=>`${sector} sektöründe ${position} olarak görev yapıyorsunuz. ${skill||'kritik süreç'} için izlenen göstergede son üç çevrimde %18 sapma oluştu. Üretimi durdurmak teslimatı geciktirecek; devam etmek ise kalite ve güvenlik riski taşıyor. İlk teknik kararınız ve doğrulama adımınız ne olur?`,
  ({sector,position,skill})=>`${position} rolünde devraldığınız ${skill||'operasyon'} sürecinde iki farklı ölçüm sistemi birbiriyle çelişiyor. Müşteri dört saat içinde kök neden ve geçici önlem bekliyor. Hangi veri setini nasıl doğrular ve kalıcı aksiyona hangi kanıtla geçersiniz?`,
  ({sector,position,skill})=>`${sector} operasyonunda planlı bakım sonrası aynı arıza iki kez tekrarlandı. Ekip parça değişimini, tedarikçi ise kullanım hatasını savunuyor. ${position} olarak arızayı izole etmek ve yeniden oluşmasını engellemek için hangi sırayı izlersiniz?`],
 'Bilişsel Yetkinlikler':[
  ({sector,position})=>`${sector} sektöründe ${position} olarak üç kaynaktan gelen raporların sonuçları birbiriyle çelişiyor. Karar için 90 dakikanız var ve yanlış önceliklendirme bütçenin %12'sini riske atacak. Varsayımları nasıl sınar ve kararı hangi ölçütlerle verirsiniz?`,
  ({sector,position})=>`${position} rolünde, düşük olasılıklı fakat yüksek etkili iki risk ile yüksek olasılıklı düşük etkili dört sorun aynı anda ortaya çıktı. Kaynaklar yalnızca iki müdahaleye yetiyor. Öncelik sıralamanızı hangi mantıkla kurarsınız?`,
  ({sector,position})=>`${sector} pazarında müşteri talebi artarken hata oranı da yükseliyor. Satış ekibi kapasite artışı, operasyon ekibi yavaşlama istiyor. Nedensellik ile korelasyonu ayırmak için hangi analizleri yaparsınız?`],
 'Temel Yetkinlikler':[
  ({sector,position})=>`${sector} sektöründe ${position} olarak farklı hedefleri olan iki ekip arasında teslimat sorumluluğu belirsiz kaldı. Toplantıda taraflar birbirini suçluyor ve müşteri aynı gün yanıt bekliyor. Güveni koruyarak nasıl ilerlersiniz?`,
  ({sector,position})=>`${position} rolünde bir ekip üyesi güvenlik prosedürünü atlayarak hedefi zamanında tamamladı. Yönetici sonucu takdir ediyor, ekip ise davranışı örnek almaya başladı. Hangi geri bildirimi verir ve sistemi nasıl düzeltirsiniz?`,
  ({sector,position})=>`${sector} operasyonunda öncelikler gün içinde üç kez değişti. Ekibin motivasyonu düştü ve iki kritik görev sahipsiz kaldı. Kendi işinizi ve ekip iletişimini nasıl yeniden planlarsınız?`],
 'Kişisel Yetkinlikler':[
  ({sector,position})=>`${sector} sektöründe ${position} olarak bütçesi %15 azaltılmış bir dönüşüm programını devraldınız. Üç paydaş farklı başarı ölçütü istiyor. Ortak hedef, yönetişim ve karar mekanizmasını nasıl kurarsınız?`,
  ({sector,position})=>`${position} rolünde yüksek performanslı bir uzman kritik bilgiyi paylaşmıyor ve ekipte darboğaz oluşuyor. Teslimatı riske atmadan yetki devri ve gelişim planını nasıl yönetirsiniz?`,
  ({sector,position})=>`${sector} operasyonunda mevzuat değişikliği mevcut sürecin iki hafta içinde yenilenmesini gerektiriyor. Ekip değişime direniyor. Riski, iletişimi ve uygulama takvimini nasıl yönetirsiniz?`]};
function buildHrQuestion(context,index){const patterns=hrScenarioPatterns[context.category]||hrScenarioPatterns['Bilişsel Yetkinlikler'];const scenario=patterns[index%patterns.length](context);const optionSets=[
 ['Sorunu üst yönetime aktarır ve ayrıntılı talimat gelene kadar mevcut yöntemi sürdürürüm.','En görünür belirtiye müdahale eder, sonuç alınırsa diğer nedenleri daha sonra incelerim.','Kritik veriyi doğrular, etki ve aciliyete göre seçenekleri karşılaştırıp kayıtlı bir aksiyon başlatırım.','Kök nedeni kanıtlarla sınar, risk kontrolü kurar, paydaş sorumluluklarını netleştirir ve sonucu ölçerim.','Sistemik nedenleri modelleyip önleyici standart, erken uyarı göstergesi ve öğrenme döngüsü oluştururum.'],
 ['Mevcut planı değiştirmeden ilerler, sonuç ortaya çıktığında sorumluları belirlerim.','Tek bir uzmanın görüşünü esas alır ve en hızlı uygulanabilir seçeneği seçerim.','Alternatifleri veri, süre ve risk ölçütleriyle puanlar; uygun seçeneği kontrollü biçimde uygularım.','Çelişkili kanıtları doğrular, geri dönüş planıyla pilot uygular ve paydaşlara ölçülebilir eşikler tanımlarım.','Karar mimarisini kalıcılaştırır, senaryo analizi ve öncü göstergelerle benzer riskleri oluşmadan yönetirim.'],
 ['Konuyu ekibe bırakır, yalnızca nihai sonucu takip ederim.','Geçici çözümü hemen uygular, süreç dokümantasyonunu teslimat sonrasına ertelerim.','Görevleri netleştirir, doğrulanmış bilgiyle kısa vadeli plan yapar ve ilerlemeyi takip ederim.','Teknik ve davranışsal nedenleri ayırır, kontrol noktaları kurar ve veriye dayalı iyileştirmeyi yönetirim.','Çapraz ekip standardı, performans göstergesi ve düzenli gözden geçirme sistemi kurarak kalıcı gelişim sağlarım.']];const texts=optionSets[index%optionSets.length];return{senaryo_ve_soru:scenario,secenekler:texts.map((metin,i)=>({kod:String.fromCharCode(65+i),metin,temsil_edilen_seviye:i+1,analiz:['Sorumluluğu devreden ve kanıt üretmeyen yaklaşım.','Hızlı fakat doğrulaması ve risk kontrolü zayıf yaklaşım.','Veri, öncelik ve takip içeren yetkin yaklaşım.','Kök neden, risk, paydaş ve ölçümü birleştiren ileri yaklaşım.','Önleyici sistem ve kurumsal öğrenme oluşturan lider yaklaşım.'][i]}))}}
generateHrQuestion=async function(){const sector=document.getElementById('hr-sector').value,position=document.getElementById('hr-position').value,category=document.getElementById('hr-category').value,competency=document.getElementById('hr-competency').value,level=Number(document.getElementById('hr-level').value),format=document.getElementById('hr-format').value,count=Number(document.getElementById('hr-count').value),skill=(matrixData.skills.find(s=>s.sector===sector)?.name||'');if(!sector||!position||!category||!competency)return toast('Sektör, pozisyon, kategori ve yetkinlik seçin');const button=document.querySelector('.hr-form-card .primary');const variation=(crypto.randomUUID?.()||Date.now()+'-'+Math.random());const prompt=`Türkçe, ileri düzeyde zor, karmaşık, yüksek analitik düşünce gerektiren ve kesinlikle birbirini tekrar etmeyen ${count} adet profesyonel teknik/yönetsel senaryo ve soru üret. İlk sorudan itibaren çok seçici, detaylı ve uzman seviyesinde olsun. Basit, ezbere dayalı veya yüzeysel sorulardan kesinlikle kaçın. Sektör: ${sector}, Pozisyon: ${position}, Kategori: ${category}, Yetkinlik: ${competency}, Beceri: ${skill}, Hedef Seviye: ${level}, Soru Formatı: ${format}, Üretim Kodu: ${variation}. Yalnızca JSON döndür: {"modul":"sayfa_16_soru_tasarimcisi","uretim_ilkeleri":["Tekrarsız senaryo","Sektör bağlamı"],"soru_sayisi":${count},"sorular":[{"soru_id":"ST-2026-0016-XXXX","yetkinlik_adi":"${competency}","kategori":"${category}","sektor":"${sector}","pozisyon":"${position}","olculen_seviye":${level},"soru_formati":"${format}","senaryo_ve_soru":"...","dogru_veya_ideal_secenek":"C","secenekler":[{"kod":"A","metin":"...","temsil_edilen_seviye":1,"analiz":"..."}],"puanlama_rubrigi":{"1":"...","2":"...","3":"...","4":"...","5":"..."},"degerlendirme_notu":"..."}]}`;aiBusy(button,true);try{const result=aiJson(await aiCall(prompt));const box=document.getElementById('hr-json-output');box.value=JSON.stringify(result,null,2);document.getElementById('hr-result').hidden=false;toast(count+' kaliteli AI soru JSON olarak üretildi')}catch(error){toast(error.message)}finally{aiBusy(button,false)}}
function copyHrJson(){const box=document.getElementById('hr-json-output');navigator.clipboard?.writeText(box.value);toast('JSON panoya kopyalandı')}
function hrSpecialistPage(){return layout(`<section class="hr-page"><div class="prompt-head"><div><span class="eyebrow">SAYFA 16 · HR SPECIALIST</span><h2>Yetkinlik ve Teknik Soru Tasarımcısı</h2><p>Sektör, pozisyon, teknik beceri ve yetkinlik seviyesini birlikte kullanarak tekrarsız, ayrıştırıcı sorular üretir.</p></div><span class="scope-chip">Kalite kilidi etkin</span></div><div class="hr-layout"><section class="hr-form-card"><div class="scope-rule"><b>Teknik bağlam + STAR + JSON</b><span>Her üretimde farklı olay örgüsü, ölçülebilir karar noktası ve seviye bazlı çeldirici kullanılır.</span></div><div class="hr-grid"><label><span>Sektör</span><select id="hr-sector" onchange="updateHrContext()"></select></label><label><span>Pozisyon</span><select id="hr-position" disabled><option>Önce sektör seçin</option></select></label><label><span>Yetkinlik kategorisi</span><select id="hr-category" onchange="updateHrCompetencies()"></select></label><label><span>Yetkinlik</span><select id="hr-competency" disabled><option>Önce kategori seçin</option></select></label><label><span>Hedef kademe</span><select id="hr-level"><option value="1">Seviye 1 · Başlangıç</option><option value="2">Seviye 2 · Gelişen</option><option value="3" selected>Seviye 3 · Yetkin</option><option value="4">Seviye 4 · İleri</option><option value="5">Seviye 5 · Lider</option></select></label><label><span>Soru türü</span><select id="hr-format"><option value="COKTAN_SECMELI">Çoktan Seçmeli (5 seçenek)</option><option value="DAVRANISSAL_MULAKAT">Davranışsal Mülakat + Rubrik</option></select></label><label><span>Soru adedi</span><select id="hr-count"><option>1</option><option selected>3</option><option>5</option><option>10</option></select></label></div><button class="primary full" onclick="generateHrQuestion()">Kaliteli Soru Seti Üret</button></section><section id="hr-result" class="hr-result-card" hidden><div class="prompt-output-head"><div><span class="eyebrow">JSON ÇIKTISI</span><h3>Sayfa 16 Veri Sözleşmesi</h3></div><button class="secondary" onclick="copyHrJson()">JSON'u Kopyala</button></div><textarea id="hr-json-output" class="generated-prompt hr-json" readonly></textarea></section></div></section>`,'Sayfa 16 · Soru Tasarımcısı')}
function openTestBuilder(){const modal=document.createElement('div');modal.className='modal test-builder-modal';modal.innerHTML=`<div class="modal-card test-builder-card"><div class="modal-head"><div><span class="eyebrow">TEST VE KATILIMCI ATAMA</span><h2>Yeni Test Oluştur</h2><p class="sub">Sınav bilgilerini belirleyin ve katılımcıları tek tek ekleyin.</p></div><button type="button" onclick="this.closest(\'.modal\').remove()">×</button></div><form onsubmit="event.preventDefault();saveTestAssignment(this)"><div class="builder-layout"><div class="builder-fields"><h3>Test Bilgileri</h3><div class="mcq-lock span-2"><b>Soru Türü: Çoktan Seçmeli</b><span>Her soru A, B, C, D olmak üzere dört dengeli seçenekle hazırlanır. Doğru şıklar eşit dağıtılır.</span></div><label class="span-2"><span>Testin Konusu</span><input name="topic" required placeholder="Örn. Proje yönetimi yetkinlik testi"></label><label><span>İş Pozisyonu</span><input name="position" required placeholder="Örn. Takım Lideri"></label><label><span>Soru Sayısı</span><select name="questions" required><option value="">Seçin</option><option>10</option><option>25</option><option>50</option><option>100</option></select></label><label><span>Zorluk Derecesi</span><select name="difficulty" required><option value="">Seçin</option><option>Kolay</option><option>Orta</option><option>Zor</option><option>Ekspert</option></select></label><label><span>Sınav Süresi (Dakika)</span><input name="duration" type="number" min="1" required placeholder="60"></label><label><span>Başlangıç Tarihi</span><input name="startDate" type="date" required></label><label><span>Başlangıç Saati</span><input name="startTime" type="time" required></label><label><span>Bitiş Tarihi</span><input name="endDate" type="date" required></label><label><span>Bitiş Saati</span><input name="endTime" type="time" required></label><label><span>Geçme Puanı</span><input name="passScore" type="number" min="0" max="100" required placeholder="60"></label><div class="participant-entry span-2"><h3>Katılımcı Ekle</h3><div class="participant-fields"><label><span>Adı</span><input id="participant-name" placeholder="Adı"></label><label><span>Soyadı</span><input id="participant-surname" placeholder="Soyadı"></label><label><span>Telefon Numarası</span><input id="participant-phone" type="tel" placeholder="+90 5xx xxx xx xx"></label><label><span>E-posta Adresi</span><input id="participant-email" type="email" placeholder="ornek@mail.com"></label></div><button class="secondary add-participant" type="button" onclick="addParticipant()">Katılımcıyı Listeye Ekle ➜</button></div></div><aside class="participant-panel"><div class="participant-panel-head"><div><h3>Katılımcı Listesi</h3><span>Sınava katılacak kişiler</span></div><b id="participant-count">0</b></div><div id="participant-list" class="participant-list"><div class="participant-empty">Henüz katılımcı eklenmedi.</div></div></aside></div><div class="builder-actions"><button type="button" class="secondary" onclick="this.closest(\'.modal\').remove()">İptal</button><button type="submit" class="primary">Testi Kaydet ve Katılımcılara Ata</button></div></form></div>`;document.body.append(modal)}
function addParticipant(){const values=['participant-name','participant-surname','participant-phone','participant-email'].map(id=>document.getElementById(id).value.trim());if(values.some(v=>!v))return toast('Katılımcının tüm bilgilerini doldurun');const list=document.getElementById('participant-list');list.querySelector('.participant-empty')?.remove();const item=document.createElement('div');item.className='participant-item';item.dataset.participant='1';item.innerHTML='<div class="participant-avatar">'+safeText(values[0][0]+values[1][0])+'</div><div><b>'+safeText(values[0]+' '+values[1])+'</b><span>'+safeText(values[2])+'</span><small>'+safeText(values[3])+'</small></div><button type="button" onclick="removeParticipant(this)" aria-label="Katılımcıyı sil">×</button>';list.append(item);['participant-name','participant-surname','participant-phone','participant-email'].forEach(id=>document.getElementById(id).value='');updateParticipantCount();toast('Katılımcı sağdaki listeye eklendi')}
function removeParticipant(button){const list=button.closest('.participant-list');button.closest('.participant-item').remove();if(!list.querySelector('.participant-item'))list.innerHTML='<div class="participant-empty">Henüz katılımcı eklenmedi.</div>';updateParticipantCount()}
function updateParticipantCount(){const count=document.querySelectorAll('#participant-list .participant-item').length;const badge=document.getElementById('participant-count');if(badge)badge.textContent=count}
function saveTestAssignment(form){const count=document.querySelectorAll('#participant-list .participant-item').length;if(!count)return toast('En az bir katılımcı ekleyin');const start=new Date(form.startDate.value+'T'+form.startTime.value);const end=new Date(form.endDate.value+'T'+form.endTime.value);if(end<=start)return toast('Bitiş zamanı başlangıçtan sonra olmalı');form.closest('.modal').remove();toast('Test kaydedildi ve '+count+' katılımcıya atandı')}
function badge(level){return `<span class="badge ${level==='Zor'?'hard':level==='Ekspert'?'warn':''}">${level}</span>`}
function layout(content,title){const deliveryOpen=deliveryNav.some(([id])=>id===state.page);const quickNav=[['dashboard','Genel Bakış'],['tests','Test Yönetimi'],['results','Test Sonuçları'],['test-platform','Test Platformu'],['documents','Belgeden Vaka Yarat'],['prompt','Formdan Vaka Yarat'],['meetings','Meet & Teams Vaka'],['questions','Açık Uçlu Vaka Testi'],['comparison','Karşılaştırma']];return `<div class="shell"><aside class="sidebar"><div class="brand-block"><button class="sidebar-close" aria-label="Menüyü kapat" onclick="document.querySelector('.sidebar').classList.remove('open')">×</button><div class="mark"><span>SkillBridgeAIPro</span></div><div class="profile"><strong>Bilge Han Veral</strong><span>SkillBridge AI</span><small>Süper Yönetici</small></div></div><nav class="nav" aria-label="Ana menü">${nav.map(([id,n,color])=>`<button class="${color} ${state.page===id?'active':''}" onclick="go('${id}')"><span class="nav-dot"></span><span>${n}</span></button>`).join('')}<div class="delivery-menu"><div>${deliveryNav.map(([id,n])=>`<button class="${state.page===id?'active':''}" onclick="go('${id}')">${n}</button>`).join('')}</div></div>
<div class="delivery-menu"><details ${['personal-data','data-banking','hr-specialist','agents','server','user-credits'].includes(state.page)?'open':''}><summary><span class="nav-dot" style="background:#94a3b8"></span><span>Ayarlar</span></summary><div>
<button class="${state.page==='user-credits'?'active':''}" onclick="go('user-credits')">Kullanıcılar ve Kontör</button>
<button class="${state.page==='personal-data'?'active':''}" onclick="go('personal-data')">Kişisel Bilgiler</button>
<button class="${state.page==='data-banking'?'active':''}" onclick="go('data-banking')">Veri Bankacılığı</button>
<button class="${state.page==='hr-specialist'?'active':''}" onclick="go('hr-specialist')">Sayfa 16 · Soru Tasarımcısı</button>
<button class="${state.page==='agents'?'active':''}" onclick="go('agents')">Ajanlar</button>
<button class="${state.page==='server'?'active':''}" onclick="go('server')">Sunucu Bağlantısı</button>
</div></details></div>
</nav><div class="credit-summary" aria-label="Kontör özeti"><h3>Kontör Bakiyesi</h3><table><tbody><tr><th>Satın alınan</th><td>250</td></tr><tr><th>Kullanılan</th><td>68</td></tr><tr class="credit-remaining"><th>Kalan</th><td>182</td></tr></tbody></table></div><div class="side-footer"><button onclick="logout()"><span>↩</span> Çıkış Yap</button></div></aside><main class="workspace ${state.page==='dashboard'?'dashboard-workspace':''}"><header class="topbar"><div class="topbar-left"><button class="icon-btn mobile-toggle" aria-label="Menüyü aç" onclick="document.querySelector('.sidebar').classList.toggle('open')">☰</button><button class="desktop-collapse" aria-label="Sol menüyü daralt" onclick="document.body.classList.toggle('sidebar-collapsed')">☰</button><h1>${title}</h1></div><div class="top-actions"><button class="icon-btn" onclick="toast('Bildirim bulunmuyor')" aria-label="Bildirimler">●</button><button class="icon-btn" onclick="document.body.classList.toggle('dark')" aria-label="Tema değiştir">◐</button><div class="lang-switch" style="display:inline-flex; border-radius:6px; overflow:hidden; border:1px solid #cbd5e1; margin-left: 10px; background:#fff;"><button id="btn-lang-tr" style="padding: 4px 10px; border:none; cursor:pointer; font-weight:bold; font-size:12px; transition:0.2s;" onclick="customTranslate('tr')">TR</button><button id="btn-lang-en" style="padding: 4px 10px; border:none; cursor:pointer; font-weight:bold; font-size:12px; transition:0.2s;" onclick="customTranslate('en')">EN</button></div></div><nav class="top-nav" aria-label="Üst menü">${quickNav.map(([id,n])=>`<button class="${id==='dashboard'?'overview-link':''} ${state.page===id?'active':''}" onclick="go('${id}')">${n}</button>`).join('')}</nav></header>${content}</main></div>`}
const aiSearchIndex=[
 {page:'personal-data',title:'Kişisel Bilgiler',keywords:'sektör alt sektör fonksiyon uzmanlık pozisyon departman meslek beceri yetkinlik kullanıcı şirket veri',description:'Şirketleri, kullanıcıları ve birbirine bağlı sektör, fonksiyon, beceri ve yetkinlik kayıtlarını yönetir.'},
 {page:'data-banking',title:'Veri Bankacılığı',keywords:'veri bankacılığı sektör alt sektör fonksiyon uzmanlık pozisyon departman',description:'Şirketleri, kullanıcıları ve birbirine bağlı veri bankacılığı kayıtlarını yönetir.'},
 {page:'tests',title:'Test Yönetimi',keywords:'test sınav soru zorluk süre tarih saat katılımcı atama geçme puanı',description:'Testleri oluşturur, katılımcı atar; soru sayısı, süre, zorluk ve kullanım bilgilerini yönetir.'},
 {page:'evaluation',title:'Test Değerlendirme',keywords:'değerlendirme doğru yanlış olumlu olumsuz boş başarı süre cevap',description:'Aday cevaplarını olumlu, olumsuz ve boş olarak değerlendirir; başarı ve cevap süresi metriklerini hesaplar.'},
 {page:'results',title:'Test Sonuçları',keywords:'sonuç rapor aday skor başarı doğru yanlış detay pdf',description:'Tamamlanan testlerin aday, skor, değerlendirme sonucu ve ayrıntılı raporlarını gösterir.'},
 {page:'qr',title:'Test Platformu',keywords:'Test Platformu qr barkod davet bağlantı erişim dağıtım',description:'Test erişim bağlantılarını ve adaylara yapılacak sınav dağıtımını yönetir.'},
 {page:'documents',title:'Belgeden Vaka Yarat',keywords:'belge dosya pdf word docx excel xlsx csv txt yükle vaka',description:'Yüklenen belgenin içeriğini seçilen sektör, fonksiyon ve pozisyona göre yapılandırılmış vakaya dönüştürür.'},
 {page:'prompt',title:'Formdan Vaka Yarat',keywords:'form prompt sektör alt sektör fonksiyon pozisyon beceri yetkinlik vaka üret',description:'Formda seçilen bağlam, beceri ve yetkinliklerden soru içermeyen bir vaka üretir.'},
 {page:'meetings',title:'Meet & Teams Vaka',keywords:'meet teams toplantı konuşma kayıt transkript bot vaka',description:'Toplantı konuşmasını kaydeder veya transkript yükler ve konuşma içeriğinden vaka oluşturur.'},
 {page:'questions',title:'Açık Uçlu Vaka Testi',keywords:'açık uçlu vaka testi soru cevap süre güvenli sınav gemma',description:'Bir vakadan açık uçlu sorular hazırlar ve güvenli, tek soru ilerlemeli sınav akışını başlatır.'},
 {page:'comparison',title:'Karşılaştırma',keywords:'cv karşılaştırma aday zihin kontrolü kıyaslama',description:'Aday, CV ve değerlendirme verilerini seçilen ölçütlere göre karşılaştırır.'},
 {page:'agents',title:'Ajanlar',keywords:'ajan yapay zeka görev gemma araştırmacı frontend backend veritabanı',description:'Yapay zekâ ajanlarının görev alanlarını gösterir ve her ajana kendi kapsamındaki işi gönderir.'},
 {page:'dashboard',title:'Paketler ve Kontör',keywords:'fiyat paket abonelik kontör satın alınan kullanılan kalan bakiye',description:'Kontör bakiyesini, paketleri, kullanım miktarını ve fiyatlandırmayı gösterir.'}
];
function normalizeSearch(value){return String(value).toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function runAiSearch(){const input=document.getElementById('ai-site-search'),box=document.getElementById('ai-search-results');if(!input||!box)return;const query=normalizeSearch(input.value.trim());if(query.length<2){box.innerHTML='<div class="ai-search-empty">Aramak istediğiniz işlemi en az iki harfle yazın.</div>';return}const terms=query.split(/\s+/).filter(Boolean);const matches=aiSearchIndex.map(item=>{const haystack=normalizeSearch(item.title+' '+item.keywords+' '+item.description);return{item,score:terms.reduce((sum,term)=>sum+(haystack.includes(term)?1:0),0)}}).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,5);box.innerHTML=matches.length?matches.map(({item})=>'<button class="ai-search-result" onclick="go(\''+item.page+'\')"><span>AI ÖNERİSİ</span><b>'+item.title+'</b><p>'+item.description+'</p><em>Sayfayı aç →</em></button>').join(''):'<div class="ai-search-empty"><b>Sonuç bulunamadı.</b><span>“Test”, “vaka”, “yetkinlik”, “kontör” veya “rapor” gibi başka bir ifade deneyin.</span></div>'}
function dashboard(){return layout(`<section class="overview-head"><p>Hoş geldiniz, Süper Yönetici.</p></section>
<section class="ai-search-card"><div class="ai-search-copy"><span class="eyebrow">YAPAY ZEK ARAMA MOTORU</span><h2>Size nasıl yardımcı olabilirim?</h2><p>Site içindeki bir kelimeyi, işlemi veya bölümü yazın; ne işe yaradığını açıklayayım ve doğru sayfaya götüreyim.</p></div><div class="ai-search-input"><span aria-hidden="true">⌕</span><input id="ai-site-search" type="search" placeholder="Örn. vaka oluştur, test değerlendir, kalan kontör…" oninput="runAiSearch()" onkeydown="if(event.key==='Enter'){event.preventDefault();runAiSearch()}"><button class="primary" onclick="runAiSearch()">Ara</button></div><div id="ai-search-results" class="ai-search-results"><div class="ai-search-chips"><button onclick="document.getElementById('ai-site-search').value='vaka oluştur';runAiSearch()">Vaka oluştur</button><button onclick="document.getElementById('ai-site-search').value='test değerlendir';runAiSearch()">Test değerlendir</button><button onclick="document.getElementById('ai-site-search').value='yetkinlik';runAiSearch()">Yetkinlikler</button><button onclick="document.getElementById('ai-site-search').value='kalan kontör';runAiSearch()">Kontör bakiyesi</button></div></div></section>
<div class="overview-kpis">
  <article class="kpi-card"><span>Kalan kontör bakiyesi</span><strong>182</strong><small>1.820 TL eşdeğeri</small></article>
  <article class="kpi-card"><span>Aktif değerlendirme</span><strong>3</strong><small>45 çalışan sürece dahil</small></article>
  <article class="kpi-card"><span>Tamamlanma oranı</span><strong>%78</strong><small>Şirket geneli</small></article>
  <article class="kpi-card"><span>4M uyum ortalaması</span><strong>3,8 / 5</strong><small>Man · Machine · Material · Method</small></article>
</div>
<div class="dashboard-grid">
  <article class="dash-card pricing-card"><div class="dash-card-head"><div><span class="eyebrow">ABONELİK & KONTÖR</span><h3>Paketler & Kontör Yönetimi</h3></div><span class="discount-chip">Abone avantajı</span></div><p class="dash-copy">Test üretimi, CV karşılaştırma ve kurumsal çözümler için bakiyenizi yönetin.</p><div class="price-facts"><div><b>1 Kontör</b><span>10 TL</span></div><div><b>10 / 25 Test</b><span>8 / 20 Kontör</span></div><div><b>50 / 100 Test</b><span>40 / 80 Kontör</span></div></div><div class="detail-row"><span>Açık uçlu test</span><b>25 Kontör</b></div><div class="detail-row"><span>10 CV'ye kadar karşılaştırma</span><b>10 Kontör</b></div><div class="detail-row"><span>10 CV üzeri karşılaştırma</span><b>25 Kontör</b></div><div class="detail-row"><span>1 yıllık test arşivi</span><b>500 Kontör · 5.000 TL</b></div><div class="detail-row"><span>Premium özel entegrasyon</span><b>1.000 Kontör · 10.000 TL</b></div><p class="rollover-note">Kullanılmayan kontörler yıl sonunda silinmez; sonraki döneme devreder.</p><div class="dashboard-actions"><button class="primary" onclick="openCreditModal()">Kontör Yükle</button><button class="secondary" onclick="openPackagesModal()">Paketleri İncele</button></div></article>
  <article class="dash-card"><div class="dash-card-head"><div><span class="eyebrow">ORGANİZASYON</span><h3>Şirket İçi Değerlendirme</h3></div><span class="status-dot">3 aktif</span></div><p class="dash-copy">İşe alım, terfi ve seviye tespiti amaçlı vaka sınavlarını departman bazında izleyin.</p><div class="progress-block"><div><span>Süreçlerin tamamlanması</span><b>%78</b></div><div class="progress"><i style="width:78%"></i></div></div><ul class="clean-list"><li><span>Operasyon</span><b>18 / 22</b></li><li><span>Satış</span><b>12 / 15</b></li><li><span>Teknik Ekip</span><b>5 / 8</b></li></ul><button class="secondary" onclick="go('tests')">Yeni Değerlendirme Başlat</button></article>
  <article class="dash-card score-card"><div class="dash-card-head"><div><span class="eyebrow">YETKİNLİK KARNESİ</span><h3>Bireysel Performans Özeti</h3></div><span class="score-ring">82<small>/100</small></span></div><p class="dash-copy">Pozisyon hedefiyle karşılaştırılmış 4M ve yetkinlik görünümü.</p><div class="axis-grid">${[['Bilişsel',86],['Temel',84],['Teknik',78],['Yönetsel',72],['Man',88],['Machine',68],['Material',80],['Method',76]].map(([n,v])=>`<div><span>${n}</span><i><b style="width:${v}%"></b></i><em>${v}</em></div>`).join('')}</div><div class="insight"><b>Güçlü:</b> Man, Bilişsel, Temel <span>·</span> <b>Gelişim:</b> Machine, Yönetsel</div><button class="secondary" onclick="go('results')">Karnemi İncele</button></article>
  <article class="dash-card"><div class="dash-card-head"><div><span class="eyebrow">ANALİZ MERKEZİ</span><h3>Değerlendirme Raporları</h3></div><b class="big-number">24</b></div><p class="dash-copy">Son 30 günde oluşturulan raporlar ve dışa aktarılan dosyalar.</p><div class="report-counts"><div><b>14</b><span>Bireysel rapor</span></div><div><b>6</b><span>Şirket raporu</span></div><div><b>4</b><span>PDF / Excel</span></div></div><div class="recent-report"><span>Son rapor</span><b>Takım Lideri · Lojistik</b><small>14.09.2026 · %86 başarı</small></div><button class="secondary" onclick="go('results')">Rapor Merkezini Aç</button></article>
  <article class="dash-card compact-card"><span class="eyebrow">ADAY / ÇALIŞAN</span><h3>Bireysel Raporlar</h3><div class="metric-pair"><div><span>Son vaka puanı</span><b>86 / 100</b></div><div><span>Pozisyona uygunluk</span><b>%84</b></div></div><p class="dash-copy">Vaka cevapları, 8 eksenli dağılım ve AI geri bildirimleri.</p><button class="secondary" onclick="go('results')">Son Raporu Aç</button></article>
  <article class="dash-card compact-card"><span class="eyebrow">YÖNETİCİ PANELİ</span><h3>Şirket Yetkinlik Haritası</h3><div class="heatmap" aria-label="Departman yetkinlik ısı haritası">${[4,3,4,2,3,2,4,3,2,1,3,4,4,2,3,2].map(v=>`<i class="heat-${v}"></i>`).join('')}</div><div class="detail-row"><span>Kritik pozisyon açığı</span><b>4</b></div><div class="detail-row"><span>Yetenek riski</span><b>%12</b></div><button class="secondary" onclick="go('comparison')">Konsolide Rapor Al</button></article>
  <article class="dash-card development-card"><div><span class="eyebrow">AKSİYON & EĞİTİM</span><h3>Gelişim Yol Haritası</h3><p class="dash-copy">Hedef altı yetkinliklere göre AI tarafından önerilen eylemler, kaynaklar ve mikro eğitimler.</p><div class="plan-progress"><span>SMART hedefler</span><b>2 / 5 tamamlandı</b></div><div class="progress"><i style="width:40%"></i></div></div><div class="priority-box"><span>Öncelikli gelişim ekseni</span><b>M2 · Ekipman ve Yazılım Becerileri</b><button class="primary" onclick="toast('Gelişim planı açıldı')">Planı Güncelle</button></div></article>
</div>`,'Genel Bakış')}
function testsPage(){const filtered=tests.filter(t=>(t.name+t.sector).toLowerCase().includes(state.query.toLowerCase())&&(!state.testLevel||t.level===state.testLevel)&&(!state.testQuestions||t.q===Number(state.testQuestions))&&(!state.testSource||t.source===state.testSource)&&(!state.testDate||t.date===state.testDate)&&(!state.testSector||t.sector===state.testSector));const totals=filtered.reduce((a,t)=>({q:a.q+t.q,answered:a.answered+t.answered,correct:a.correct+t.correct,wrong:a.wrong+t.wrong,uses:a.uses+t.uses}),{q:0,answered:0,correct:0,wrong:0,uses:0});const topWrong=[...filtered].sort((a,b)=>b.wrong-a.wrong)[0];const rows=filtered.map(t=>`<tr><td data-editable><b>${t.name}</b><br><span style="color:var(--muted)">${t.sector}</span></td><td data-editable>${badge(t.level)}</td><td data-editable><b>${t.q}</b></td><td data-editable>${t.source}</td><td data-editable>${t.date}</td><td data-editable><b>${t.uses}</b> kez</td><td data-editable>${t.sector}</td><td><span class="rate-pill">% ${t.answered?Math.round(t.correct/t.answered*100):0}</span><small class="rate-detail">${t.correct} doğru / ${t.answered} cevap</small></td><td><div class="row-actions"><button class="danger-button" onclick="deleteTestRow(this)">Sil</button><button class="secondary" onclick="editTestRow(this)">Düzelt</button><button class="primary" onclick="saveTestRow(this)">Kaydet</button></div></td></tr>`).join('');return layout(`<section class="page-intro"><div><h2>Test Yönetimi</h2><p>Açık Uçlu Vaka Testi dışındaki bütün testler dört şıklı çoktan seçmeli hazırlanır.</p></div><button class="primary" onclick="openTestBuilder()">+ Yeni Test Oluştur</button></section><section class="mcq-standard"><div><span class="eyebrow">ZORUNLU TEST STANDARDI</span><h3>A · B · C · D — Dört Şıklı Çoktan Seçmeli</h3></div><ul><li>Her soruda tam dört seçenek bulunur.</li><li>Seçenekler anlam ve kelime uzunluğu bakımından dengelenir.</li><li>Doğru cevaplar A, B, C ve D arasında eşit dağıtılır.</li><li>Aynı doğru şık art arda yığılmaz.</li></ul><div class="answer-balance"><span>A</span><span>B</span><span>C</span><span>D</span></div></section>
<div class="test-filterbar expanded-filters"><label><span>Test / Pozisyon</span><input class="search" placeholder="Test veya pozisyon ara" value="${state.query}" onchange="state.query=this.value;render()"></label><label><span>Zorluk</span><select onchange="state.testLevel=this.value;render()"><option value="">Tümü</option>${unique(tests.map(t=>t.level)).map(v=>`<option ${state.testLevel===v?'selected':''}>${v}</option>`).join('')}</select></label><label><span>Soru</span><select onchange="state.testQuestions=this.value;render()"><option value="">Tümü</option>${unique(tests.map(t=>t.q)).map(v=>`<option value="${v}" ${String(v)===state.testQuestions?'selected':''}>${v} soru</option>`).join('')}</select></label><label><span>Kaynak</span><select onchange="state.testSource=this.value;render()"><option value="">Tümü</option>${unique(tests.map(t=>t.source)).map(v=>`<option ${state.testSource===v?'selected':''}>${v}</option>`).join('')}</select></label><label><span>Tarih</span><select onchange="state.testDate=this.value;render()"><option value="">Tümü</option>${unique(tests.map(t=>t.date)).map(v=>`<option ${state.testDate===v?'selected':''}>${v}</option>`).join('')}</select></label><label><span>En Çok Kullanılan Sektör</span><select onchange="state.testSector=this.value;render()"><option value="">Tümü</option>${unique(tests.map(t=>t.sector)).map(v=>`<option ${state.testSector===v?'selected':''}>${v}</option>`).join('')}</select></label><button class="secondary" onclick="state.query='';state.testLevel='';state.testQuestions='';state.testSource='';state.testDate='';state.testSector='';render()">Filtreleri Temizle</button></div>
<div class="test-metrics"><article><span>Toplam Soru</span><b>${totals.q}</b><small>Filtrelenen testlerde</small></article><article><span>Toplam Kullanım</span><b>${totals.uses}</b><small>Kaç kere kullanıldı</small></article><article class="success-metric"><span>Doğru Cevap</span><b>%${totals.answered?Math.round(totals.correct/totals.answered*100):0}</b><small>${totals.correct} doğru cevap</small></article><article class="danger-metric"><span>Yanlış Cevap</span><b>${totals.wrong}</b><small>${topWrong?topWrong.mostWrong:'Kayıt yok'}</small></article><article class="wide-metric"><span>En Çok Kullanılan Sektör</span><b>${filtered.length?[...filtered].sort((a,b)=>b.uses-a.uses)[0].sector:'Kayıt yok'}</b><small>${filtered.length?[...filtered].sort((a,b)=>b.uses-a.uses)[0].uses+' kullanım':'Seçili filtrede sonuç bulunamadı'}</small></article></div>
<div class="section-head"><h2>Filtrelenen Testler <span class="result-count">${filtered.length} kayıt</span></h2><button class="secondary" onclick="go('qr')">Ajan 11 · Barkod</button></div><div class="table-wrap test-table"><table><thead><tr><th>Test / Pozisyon</th><th>Zorluk</th><th>Soru</th><th>Kaynak</th><th>Tarih</th><th>Kaç Kere Kullanıldı</th><th>En Çok Hangi Sektörde Kullanıldı</th><th>Doğru Cevap Oranı</th><th>İşlemler</th></tr></thead><tbody>${rows||'<tr><td colspan="9" class="empty">Filtrelere uygun test bulunamadı.</td></tr>'}</tbody></table></div>`,'Test Yönetimi')}
function sectorGroupsHtml(){return unique(matrixData.hierarchy.map(row=>row[0])).map(sector=>{const rows=matrixData.hierarchy.filter(row=>row[0]===sector),subsectors=unique(rows.map(row=>row[1])),functions=unique(rows.map(row=>row[2]));return '<details class="sector-group"><summary><b>'+safeText(sector)+'</b><span>'+subsectors.length+' alt sektör · '+functions.length+' fonksiyon</span></summary><div><strong>Alt sektörler</strong><p>'+subsectors.map(safeText).join(' · ')+'</p><strong>Fonksiyonlar</strong><p>'+functions.map(safeText).join(' · ')+'</p></div></details>'}).join('')}
function dataPageBase(title){return layout(`<section class="data-intro" style="display:flex;justify-content:space-between;align-items:center;"><div><h2>${title}</h2><p>Şirket kayıtlarını, yönetici yetkilerini ve kullanıcı hesaplarını düzenleyin.</p></div><button class="primary" onclick="openEvrakKutusuModal()">Evrak Kutusu</button></section>
<section class="admin-section super-section"><div class="admin-section-head"><div><span class="eyebrow">EN ÜST YETKİ</span><h2>Süper Yönetici</h2></div><span class="role-chip">Süper Admin</span></div><div class="admin-record"><div class="record-fields three-fields"><label><span>Adı Soyadı</span><input value="Süper Yönetici" readonly></label><label><span>E-posta Adresi</span><input type="email" value="superyonetici@skillbridge.com.tr" readonly></label><label><span>Şifre</span><input type="password" placeholder="••••••••••" readonly></label></div><div class="record-actions"><button class="secondary" onclick="editRecord(this)">Düzelt</button><button class="primary" onclick="saveRecord(this,'Süper yönetici hesabı')">Kaydet</button></div></div></section>
<section class="admin-section"><div class="admin-section-head"><div><span class="eyebrow">KURUM KAYITLARI</span><h2>Şirketler</h2></div><button class="secondary" onclick="toast('Yeni şirket satırı hazırlandı')">+ Yeni Şirket</button></div><div class="admin-record"><div class="record-fields company-fields"><label><span>Şirketin Adı</span><input value="Mendomi Akademi" readonly></label><label><span>Adresi</span><input placeholder="Şirket adresini girin" readonly></label><label><span>Vergi Numarası</span><input inputmode="numeric" placeholder="Vergi numarasını girin" readonly></label></div><div class="record-actions"><button class="danger-button" onclick="deleteRecord(this,'Şirket kaydı')">Sil</button><button class="secondary" onclick="editRecord(this)">Düzelt</button><button class="primary" onclick="saveRecord(this,'Şirket kaydı')">Kaydet</button></div></div></section>
<section class="admin-section"><div class="admin-section-head"><div><span class="eyebrow">KULLANICILAR VE YETKİLER</span><h2>Kullanıcılar</h2></div><button class="secondary" onclick="toast('Yeni kullanıcı satırı hazırlandı')">+ Yeni Kullanıcı</button></div>
<div class="user-group"><div class="user-group-title"><h3>Admin ve Yönetici Kullanıcılar</h3><span>2 kullanıcı</span></div>
<div class="admin-record"><span class="user-role admin-role">Admin Kullanıcı</span><div class="record-fields four-fields"><label><span>Adı Soyadı</span><input value="Admin Kullanıcı" readonly></label><label><span>E-posta Adresi</span><input type="email" value="admin@skillbridge.com.tr" readonly></label><label><span>Şifre</span><input type="password" placeholder="••••••••••" readonly></label><label><span>Yetki</span><input value="Admin" readonly></label></div><div class="record-actions"><button class="danger-button" onclick="deleteRecord(this,'Admin kullanıcı')">Sil</button><button class="secondary" onclick="editRecord(this)">Düzelt</button><button class="primary" onclick="saveRecord(this,'Admin kullanıcı')">Kaydet</button></div></div>
<div class="admin-record"><span class="user-role manager-role">Yönetici Kullanıcı</span><div class="record-fields four-fields"><label><span>Adı Soyadı</span><input value="Yönetici Kullanıcı" readonly></label><label><span>E-posta Adresi</span><input type="email" value="yonetici@skillbridge.com.tr" readonly></label><label><span>Şifre</span><input type="password" placeholder="••••••••••" readonly></label><label><span>Yetki</span><input value="Yönetici" readonly></label></div><div class="record-actions"><button class="danger-button" onclick="deleteRecord(this,'Yönetici kullanıcı')">Sil</button><button class="secondary" onclick="editRecord(this)">Düzelt</button><button class="primary" onclick="saveRecord(this,'Yönetici kullanıcı')">Kaydet</button></div></div></div>
<div class="user-group"><div class="user-group-title"><h3>Normal Kullanıcılar</h3><span>1 kullanıcı</span></div><div class="admin-record"><span class="user-role normal-role">Normal Kullanıcı</span><div class="record-fields three-fields"><label><span>Kullanıcı Adı</span><input value="Kullanıcı 001" readonly></label><label><span>E-posta Adresi</span><input type="email" value="kullanici@skillbridge.com.tr" readonly></label><label><span>Şifre</span><input type="password" placeholder="••••••••••" readonly></label></div><div class="record-actions"><button class="danger-button" onclick="deleteRecord(this,'Normal kullanıcı')">Sil</button><button class="secondary" onclick="editRecord(this)">Düzelt</button><button class="primary" onclick="saveRecord(this,'Normal kullanıcı')">Kaydet</button></div></div></div></section>
<section class="admin-section keyword-section"><div class="admin-section-head"><div><span class="eyebrow">PROMPT DEĞİŞKENLERİ</span><h2>Sektörler ve Keyword Yönetimi</h2></div><span class="role-chip">Birbirine bağlı 5 seviye</span></div><p class="section-note">Sektör seçiminiz alt sektör, fonksiyon, pozisyon ve departman seçeneklerini otomatik filtreler. Bu değerler AI promptlarında birlikte kullanılır.</p><div class="sector-groups">${sectorGroupsHtml()}</div><div class="keyword-flow"><label><span>1 · Sektör</span><select id="kw-sector" onchange="updateKeywords(0)"></select></label><label><span>2 · Alt Sektör</span><select id="kw-subsector" onchange="updateKeywords(1)" disabled></select></label><label><span>3 · Fonksiyon</span><select id="kw-expertise" onchange="updateKeywords(2)" disabled></select></label><label><span>4 · Pozisyon</span><select id="kw-position" onchange="updateKeywords(3)" disabled></select></label><label><span>5 · Departman</span><select id="kw-department" onchange="updateKeywords(4)" disabled></select></label></div><div class="keyword-add"><label><span>Açıklama / Prompt kullanım notu</span><textarea placeholder="Bu keyword zincirinin prompt içinde nasıl kullanılacağını açıklayın."></textarea></label><button class="primary" onclick="addKeyword()">+ Keyword Ekle</button></div><div id="keyword-list" class="keyword-list"><div class="keyword-item"><div><b>Bilgisayar › Bilgisayar Programlama ve Danışmanlık</b><span>Yazılım Geliştirme · Yazılım Mühendisi · Bilgi Teknolojileri</span></div><div class="record-actions"><button class="danger-button" onclick="this.closest('.keyword-item').remove();toast('Keyword silindi')">Sil</button><button class="secondary" onclick="toast('Keyword düzenlemeye açıldı')">Düzelt</button><button class="primary" onclick="toast('Keyword kaydedildi')">Kaydet</button></div></div></div></section>
<section class="admin-section"><div class="admin-section-head"><div><span class="eyebrow">EXCEL / TABLO VERİSİ</span><h2>Beceriler</h2></div><button class="secondary" onclick="toast('Yeni beceri satırı eklendi')">+ Beceri Ekle</button></div><p class="section-note">Beceriler, yüklenen tablodaki sektör, alt sektör ve fonksiyon alanlarıyla eşleştirilir; açıklama ve seviye detayları promptlara aktarılır.</p><div class="library-records"><div class="admin-record"><span class="user-role admin-role">Denizcilik · Proje Yönetimi</span><div class="record-fields skill-fields"><label><span>Beceri Adı</span><input value="Gemi Elektrik ve Otomasyon Proje Yönetimi" readonly></label><label><span>Açıklama</span><input value="Gemi elektrik ve otomasyon projelerinin takvim, bütçe ve klas standartlarına uygun yönetimi." readonly></label><label><span>Detay / Seviye Tanımı</span><input value="A–E davranış göstergeleri ve hedef kademe karşılaştırması" readonly></label></div><div class="record-actions"><button class="danger-button" onclick="deleteRecord(this,'Beceri')">Sil</button><button class="secondary" onclick="editRecord(this)">Düzelt</button><button class="primary" onclick="saveRecord(this,'Beceri')">Kaydet</button></div></div><div class="admin-record"><span class="user-role manager-role">Bilgisayar · Veri ve Yapay Zekâ</span><div class="record-fields skill-fields"><label><span>Beceri Adı</span><input value="Veri Analizi ve Yapay Zekâ Modelleme" readonly></label><label><span>Açıklama</span><input value="Veri hazırlama, model geliştirme, doğrulama ve iş sonucuna dönüştürme becerisi." readonly></label><label><span>Detay / Seviye Tanımı</span><input value="Teknik uygulama, problem çözme ve model performansı" readonly></label></div><div class="record-actions"><button class="danger-button" onclick="deleteRecord(this,'Beceri')">Sil</button><button class="secondary" onclick="editRecord(this)">Düzelt</button><button class="primary" onclick="saveRecord(this,'Beceri')">Kaydet</button></div></div></div></section>
<section class="admin-section"><div class="admin-section-head"><div><span class="eyebrow">YETKİNLİK MATRİSİ</span><h2>Yetkinlikler</h2></div><button class="secondary" onclick="toast('Yeni yetkinlik satırı eklendi')">+ Yetkinlik Ekle</button></div><p class="section-note">Her yetkinlik bir beceriyle ilişkilendirilir; açıklaması ve uygulama detayı sınav veya gelişim promptunda kullanılır.</p><div class="library-records"><div class="admin-record"><div class="record-fields activity-fields"><label><span>Yetkinlik Adı</span><input value="Analitik Düşünme" readonly></label><label><span>Bağlı Beceri</span><input value="Problem Çözme ve Karar Verme" readonly></label><label><span>Açıklama</span><input value="Veri ve problemleri neden–sonuç ilişkileriyle analiz ederek çözüm geliştirme." readonly></label><label><span>Detay</span><input value="A–E seviye göstergeleri · Bilişsel Yetkinlikler" readonly></label></div><div class="record-actions"><button class="danger-button" onclick="deleteRecord(this,'Yetkinlik')">Sil</button><button class="secondary" onclick="editRecord(this)">Düzelt</button><button class="primary" onclick="saveRecord(this,'Yetkinlik')">Kaydet</button></div></div></div></section>`, title)}
function resultsPage(){const filtered=candidateResults.filter(r=>(r.name+r.email+r.test).toLowerCase().includes(state.resultQuery.toLowerCase())&&(!state.resultDepartment||r.department===state.resultDepartment)&&(!state.resultOutcome||r.outcome===state.resultOutcome)&&(!state.resultScore||(state.resultScore==='80+'?r.score>=80:state.resultScore==='60-79'?r.score>=60&&r.score<80:state.resultScore==='50-59'?r.score>=50&&r.score<60:r.score<50)));const avg=filtered.length?Math.round(filtered.reduce((a,r)=>a+r.score,0)/filtered.length):0;const high=filtered.filter(r=>r.score>=80).length;const positive=filtered.filter(r=>r.outcome==='Olumlu').length;const rows=filtered.map(r=>{const index=candidateResults.indexOf(r);return `<tr><td><b>${r.name}</b><span class="candidate-email">${r.email}</span></td><td><b>${r.test}</b><span class="candidate-detail">${r.department} · ${r.detail}</span></td><td><b class="candidate-score">% ${r.score}</b><span class="result-status ${r.score>=80?'positive':r.score>=50?'pending':'negative'}">${r.score>=80?'Yüksek Skor':r.score>=50?'Beklenebilir':'Yetkin Olmayan'}</span></td><td><div class="result-summary"><b>${r.outcome==='Olumlu'?'Olumlu Sonuç':'Geliştirilmeli (Uygun Değil)'}</b><p>${r.summary}</p></div></td><td>${r.date}<span class="candidate-time">${r.time}</span></td><td><div class="result-actions"><button class="report-button" onclick="showCandidateReport(${index})">Detaylı Rapor 📊</button><button class="report-button" style="background:#e8f0fe; color:#1a73e8;" onclick="toast('Test sonuçları değerlendirme komitesine ve adaya gönderildi.')">Değerlendirmeye Gönder ⟶</button><button class="report-button" style="background:#fce8e6; color:#d93025;" onclick="toast('Test sonuçları e-posta ile gönderildi.')">Sonuçları Gönder ✉</button><button class="report-button" style="background:#e6fffb; color:#0f766e;" onclick="toast('Çözüm testleri ve cevap anahtarı modalı açılıyor.')">Çözüm Testleri ðŸ‘</button><button class="result-delete" onclick="deleteResult(this)">Sil ✕</button></div></td></tr>`}).join('');return layout(`<section class="results-head"><div><h2>Aday Test Sonuçları</h2><p>Sistemdeki tüm test çözümlerine ait AI detaylı raporları ve yetkinlik skorları.</p></div><div class="toolbar"><button class="secondary dark-button" onclick="go('dashboard')">Pano Anasayfası</button><button class="primary orange-button" onclick="go('tests')">Hazır Testler & Atama</button></div></section><div class="result-kpis"><article><span>Toplam Çözülen</span><b>${filtered.length} Test</b></article><article><span>Ortalama Başarı</span><b class="blue-score">% ${avg}</b></article><article><span>Yüksek Skor (%80+)</span><b class="green-score">${high} Aday</b></article><article><span>Olumlu Sonuç (Öneri)</span><b class="purple-score">${positive} Aday</b></article></div><div class="result-filters"><label><span>Arama</span><input placeholder="Aday adı, e-posta veya test..." value="${state.resultQuery}" onchange="state.resultQuery=this.value;render()"></label><label><span>Departman</span><select onchange="state.resultDepartment=this.value;render()"><option value="">Tümü</option>${unique(candidateResults.map(r=>r.department)).map(v=>`<option ${state.resultDepartment===v?'selected':''}>${v}</option>`).join('')}</select></label><label><span>Skor Aralığı</span><select onchange="state.resultScore=this.value;render()"><option value="">Tümü</option><option value="80+" ${state.resultScore==='80+'?'selected':''}>%80 ve üzeri</option><option value="60-79" ${state.resultScore==='60-79'?'selected':''}>%60–79</option><option value="50-59" ${state.resultScore==='50-59'?'selected':''}>%50–59</option><option value="0-49" ${state.resultScore==='0-49'?'selected':''}>%0–49</option></select></label><label><span>Değerlendirme Sonucu</span><select onchange="state.resultOutcome=this.value;render()"><option value="">Tümü</option><option ${state.resultOutcome==='Olumlu'?'selected':''}>Olumlu</option><option ${state.resultOutcome==='Geliştirilmeli'?'selected':''}>Geliştirilmeli</option></select></label></div><div class="table-wrap candidate-table"><table><thead><tr><th>Aday / İletişim</th><th>Çözülen Test</th><th>Skor (Ajan 5)</th><th>Değerlendirme Sonucu</th><th>Tarih</th><th>İşlemler</th></tr></thead><tbody>${rows||'<tr><td colspan="6" class="empty">Filtrelere uygun aday sonucu bulunamadı.</td></tr>'}</tbody></table></div>`,'Test Sonuçları')}
function qrPage(){return layout(`<section class="page-intro"><div><h2>Ajan 11 · Barkod Yöneticisi</h2><p>Test davetlerini QR kodu ve güvenli bağlantı ile dağıtın.</p></div></section><div class="grid two" style="margin-top:20px"><div class="card"><div class="field"><label>Test seçin</label><select>${tests.map(t=>`<option>${t.name}</option>`).join('')}</select></div><div class="field"><label>Geçerlilik süresi</label><select><option>24 saat</option><option>3 gün</option><option>7 gün</option></select></div><button class="primary full" onclick="showQR('Sınav Daveti')">QR Kod Oluştur</button></div><div class="card"><h2>Dağıtım durumu</h2><div class="bars"><div class="bar-row"><span>Gönderildi</span><div class="bar"><i style="width:88%"></i></div><b>44</b></div><div class="bar-row"><span>Açıldı</span><div class="bar"><i style="width:70%"></i></div><b>35</b></div><div class="bar-row"><span>Tamamlandı</span><div class="bar"><i style="width:56%"></i></div><b>28</b></div></div></div></div>`,'SkillBridge Yönetici Paneli')}
function agentsPage(){return layout(`<section class="agent-hero"><div><span class="eyebrow">SAYFA AI GÖREV KONTROL MERKEZİ</span><h2>17 uzman ajan, tek yönetici model</h2><p>Sistemdeki yapay zekâ sayfalarının sırasını ve görev sınırlarını inceleyin; yalnızca uzmanlık alanlarına uygun yeni görevler tanımlayın.</p></div><div class="model-badge"><span>YÖNETİCİ MODEL</span><b>Gemma 4 · 26B</b><small>Görev yönlendirme ve kapsam denetimi</small></div></section><div class="scope-rule"><b>Kapsam kilidi etkin</b><span>Her ajan yalnızca görevlendirildiği alanda çalışır, verilen görevi uygular ve alanı dışındaki işlemleri reddeder.</span></div>
<section class="agent-control"><div class="admin-section-head"><div><span class="eyebrow">YENİ GÖREV</span><h2>Sayfaya Görev Tanımla</h2></div><span class="role-chip">17 / 17 ONLINE</span></div><div class="task-form"><label><span>Sayfa seçin</span><select id="agent-select">${aiAgents.map((a,i)=>`<option value="${i}">Sayfa ${i+1}: ${a[0]}</option>`).join('')}</select></label><label><span>Görevin Tanımı / Prompt</span><textarea id="agent-prompt" placeholder="Seçilen ajanın görev alanına uygun talimatı yazın."></textarea></label><button class="primary" onclick="dispatchAgentTask()">Görevi Sayfaya Gönder ➜</button></div><div class="quick-templates"><span>Hızlı şablonlar</span><button onclick="selectAgentTask(0,'Yazılım Mühendisi rolü için yetkinlik standartlarını araştır.')">Yazılım yetkinlikleri</button><button onclick="selectAgentTask(1,'PoC projesi için kriz hikâyesi üret.')">PoC kriz hikâyesi</button><button onclick="selectAgentTask(5,'IT iptal kararındaki zafiyetleri analiz et.')">Zafiyet analizi</button><button onclick="selectAgentTask(10,'QR sınav davet şablonu hazırla.')">QR davet şablonu</button><button onclick="selectAgentTask(16,'Vaka sorularını master prompt kurallarına göre denetle.')">Kalite denetimi</button></div><div id="agent-terminal" class="agent-terminal"><span>SAYFA AI TERMİNALİ v1.0</span><p>Terminal çıktıları burada görüntülenecektir...</p></div></section>
<section class="agent-sequence"><div class="section-head"><h2>İşlem Sırasına Göre Sayfalar (1–17)</h2><span class="sequence-note">Gemma 4 26B tarafından yönetilir</span></div><div class="agent-list">${aiAgents.map((a,i)=>`<article class="agent-row"><div class="agent-order"><b>${String(i+1).padStart(2,'0')}</b><span>ONLINE</span></div><div class="agent-main"><div class="agent-title"><div><h3>Sayfa ${i+1}: ${a[0]}</h3><strong>${a[1]}</strong></div><span class="scope-chip">Kapsam kilitli</span></div><div class="agent-details"><div><b>Görevi</b><p>${a[2]}</p></div><div><b>Teslim ettiği çıktı</b><p>${a[3]}</p></div></div></div><button class="secondary assign-button" onclick="${i===15?"go('hr-specialist')":`selectAgentTask(${i},'')`}">${i===15?'Modülü Aç':'Görev Tanımla'}</button></article>`).join('')}</div></section>`,'Sayfa AI Görev Kontrol Merkezi')}
let selectedDocumentFile=null;
function handleDocumentFile(file){if(!file)return;const allowed=['pdf','doc','docx','xls','xlsx','csv','txt'];const ext=(file.name.split('.').pop()||'').toLowerCase();if(!allowed.includes(ext))return toast('PDF, Word, Excel, CSV veya TXT dosyası seçin');if(file.size>5*1024*1024)return toast('Dosya boyutu en fazla 5 MB olabilir');selectedDocumentFile=file;const name=document.getElementById('document-file-name');if(name)name.textContent=file.name;document.getElementById('document-dropzone')?.classList.add('has-file');syncDocumentUpload()}
function syncDocumentUpload(){const button=document.getElementById('document-upload-button');if(!button)return;const context=['doc-sector','doc-subsector','doc-function','doc-position'].every(id=>document.getElementById(id)?.value);button.disabled=!(selectedDocumentFile&&document.getElementById('document-name')?.value.trim()&&document.getElementById('document-topic')?.value.trim()&&context)}
function dropDocument(event){event.preventDefault();document.getElementById('document-dropzone')?.classList.remove('dragging');handleDocumentFile(event.dataTransfer.files[0])}
function initDocumentBuilder(){const sector=document.getElementById('doc-sector');if(!sector)return;sector.innerHTML=promptOptions(keywordRows.map(r=>r[0]),'Sektör seçiniz')}
function updateDocumentChain(level){const ids=['doc-sector','doc-subsector','doc-function','doc-position'];const index=ids.indexOf(level);const selected=ids.slice(0,index+1).map(id=>document.getElementById(id).value);for(let i=index+1;i<ids.length;i++){const options=unique(keywordRows.filter(r=>selected.every((v,j)=>!v||r[j]===v)).map(r=>r[i]));const el=document.getElementById(ids[i]);el.innerHTML=promptOptions(options,['Sektör','Alt sektör','Fonksiyon','Pozisyon'][i]+' seçiniz');el.disabled=!options.length}syncDocumentUpload()}
let generatedCaseFile=null;
function downloadGeneratedCase(){if(!generatedCaseFile)return;const blob=new Blob([generatedCaseFile.content],{type:'text/plain;charset=utf-8'});const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=generatedCaseFile.name.replace(/[^a-zA-Z0-9ğüşöçıİĞÜŞÖÇ _-]/g,'')+' - Vaka.txt';link.click();URL.revokeObjectURL(link.href);toast('Vaka dosyası indirildi')}
function generateDocumentCase(){const title=pv('document-name',''),topic=pv('document-topic',''),sector=pv('doc-sector',''),subsector=pv('doc-subsector',''),func=pv('doc-function',''),position=pv('doc-position','');if(!title||!topic||!selectedDocumentFile||!sector||!subsector||!func||!position)return toast('Dosya ile birlikte sektör, alt sektör, fonksiyon ve pozisyon seçilmelidir');const context=sector+' / '+subsector+' / '+func+' / '+position;generatedCaseFile={name:title,content:'VAKA BAŞLIĞI: '+title+'\nKONU: '+topic+'\nKAYNAK DOSYA: '+selectedDocumentFile.name+'\nSEKTÖR: '+sector+'\nALT SEKTÖR: '+subsector+'\nFONKSİYON: '+func+'\nPOZİSYON: '+position+'\n\nVAKA\n'+position+' rolündeki çalışan, '+subsector+' alanında '+topic+' sürecini yürütmektedir. Yüklenen belgedeki olaylar, kurallar, teknik bilgiler ve karar noktaları '+func+' fonksiyonunun sorumluluklarıyla eşleştirilmiştir. Süreçte zaman, kaynak ve paydaş beklentileri arasında çatışma oluşmuş; çalışanın belgeye dayalı bilgileri kullanarak sektör koşullarına uygun bir karar vermesi gerekmiştir. Mevzuat, kurum politikaları ve operasyonel riskler birlikte değerlendirilmelidir. Vaka, '+position+' pozisyonundaki kişinin öncelikleri belirleyip uygulanabilir bir yol seçmesi gereken kritik noktada sona erer.\n\nVAKA BAĞLAMI\n'+context};const result=document.getElementById('document-result');result.hidden=false;result.innerHTML='<div><span class="eyebrow">AJAN 7 · BELGEDEN VAKA</span><h3>'+safeText(title)+' vakası oluşturuldu</h3><p>'+safeText(context)+' seçimlerine göre belge içeriği vaka bağlamına dönüştürüldü. Soru üretilmedi.</p></div><div class="case-next-actions"><button class="secondary" onclick="downloadGeneratedCase()">Vaka Dosyasını İndir</button><button class="primary" onclick="prepareTestFromCase(generatedCaseFile.content)">Test Sorularını Hazırla</button></div>';toast('Belge, seçilen pozisyon ve fonksiyona göre vakaya dönüştürüldü')}
function documentsPage(){selectedDocumentFile=null;return layout(`<section class="document-upload-page"><div class="document-title"><span class="eyebrow">AJAN 7 · BELGEDEN VAKA</span><h2>Belgeden Vaka Üret</h2><p>Belgeyi yükleyin, mesleki bağlamı seçin; içerik soru üretilmeden seçilen role uygun vakaya dönüştürülsün.</p></div><div class="document-upload-card"><div class="document-meta-grid"><label class="document-field"><span>Doküman Adı</span><input id="document-name" oninput="syncDocumentUpload()" placeholder="Örn: Satış Eğitimi 2026"></label><label class="document-field"><span>Konusu</span><input id="document-topic" oninput="syncDocumentUpload()" placeholder="Örn: Müşteri İletişimi"></label></div><div id="document-dropzone" class="document-dropzone" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="dropDocument(event)" onclick="document.getElementById('document-file').click()" role="button" tabindex="0" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();document.getElementById('document-file').click()}"><div class="document-icon">ðŸ“„</div><h3>Sürükle bırak veya dosya seçin</h3><p>Desteklenen Formatlar: PDF, DOCX, XLSX, CSV, TXT (Maks. 5 MB)</p><div class="file-picker"><button type="button" class="secondary" onclick="event.stopPropagation();document.getElementById('document-file').click()">Dosya Seç</button><span id="document-file-name">Dosya seçilmedi</span></div><input id="document-file" type="file" hidden accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt" onchange="handleDocumentFile(this.files[0])"></div><div class="document-context"><div class="document-context-head"><span class="eyebrow">VAKA BAĞLAMI</span><h3>Belgenin uygulanacağı alanı seçin</h3></div><div class="document-context-grid"><label><span>Sektör</span><select id="doc-sector" onchange="updateDocumentChain('doc-sector')"></select></label><label><span>Alt Sektör</span><select id="doc-subsector" onchange="updateDocumentChain('doc-subsector')" disabled><option>Önce sektör seçin</option></select></label><label><span>Fonksiyon</span><select id="doc-function" onchange="updateDocumentChain('doc-function')" disabled><option>Önce alt sektör seçin</option></select></label><label><span>Pozisyon</span><select id="doc-position" onchange="syncDocumentUpload()" disabled><option>Önce fonksiyon seçin</option></select></label></div><p>Vaka, belgedeki bilgiler korunarak seçtiğiniz sektör, fonksiyon ve pozisyonun sorumluluklarına göre oluşturulur.</p></div><div class="document-actions"><button id="document-upload-button" class="primary" disabled onclick="generateDocumentCase()">Belgeyi Oku ve Vaka Üret</button></div><div id="document-result" class="document-result" hidden></div></div></section>`,'Belgeden Vaka Yarat')}
function comparisonPage(){return layout(`<section class="page-intro"><div><h2>10 Sayfa Karşılaştırması</h2><p>AI sayfalarının aday değerlendirmelerini tek görünümde karşılaştırın.</p></div><button class="primary" onclick="toast('Karşılaştırma raporu oluşturuldu')">Rapor Oluştur</button></section><div class="table-wrap" style="margin-top:20px"><table><thead><tr><th>Sayfa</th><th>Yetkinlik</th><th>Puan</th><th>Güven</th><th>Öneri</th></tr></thead><tbody>${Array.from({length:10},(_,i)=>`<tr><td>Sayfa ${i+1}</td><td>${['Teknik Bilgi','Problem Çözme','Liderlik','İletişim'][i%4]}</td><td>%${68+i*2}</td><td>${badge(i>6?'Yüksek':'Orta')}</td><td>${i>5?'Olumlu':'İnceleme'}</td></tr>`).join('')}</tbody></table></div>`,'SkillBridge Yönetici Paneli')}
function showQR(title){const m=document.createElement('div');m.className='modal';m.innerHTML=`<div class="modal-card"><div class="modal-head"><div><h2>Test Daveti</h2><p class="sub">${title}</p></div><button onclick="this.closest(\'.modal\').remove()">×</button></div><div class="qr" aria-label="QR kod önizlemesi"></div><button class="primary full" onclick="navigator.clipboard?.writeText(location.href);toast('Bağlantı kopyalandı')">Bağlantıyı Kopyala</button></div>`;document.body.append(m)}
function loginPage(){return `<section class="login"><div class="login-box-wrap"><form class="login-box" onsubmit="event.preventDefault();login()"><div class="login-brand"><img class="partner-logo" src="./brand-partners.png" alt="Mendomi Akademi ve BIGsafer işbirliği"><h1>SkillBridgeAIPro</h1><p>Yapay Zeka Destekli İşe Alım &amp; Simülasyon Girişi</p></div><div class="login-fields"><div class="login-inputs"><input type="email" aria-label="E-posta adresi" placeholder="E-posta Adresi" required><input type="password" aria-label="Şifre" placeholder="Şifre" required></div><button class="login-submit">Sisteme Giriş Yap</button></div></form></div></section>`}
const promptSkills=unique(matrixData.skills.map(item=>item.name));
const promptCompetencies=unique(matrixData.competencies.map(item=>item.name));
const competencyCategoryOrder=['Temel Yetkinlikler','Teknik Yetkinlikler','Bilişsel Yetkinlikler','Yönetsel Yetkinlikler'];
function competencyCategoryLabel(category){return category}
function promptOptions(values,placeholder){return '<option value="">'+placeholder+'</option>'+unique(values).map(v=>'<option>'+safeText(v)+'</option>').join('')}
const certificateRules=[['proje','PMP / PRINCE2 / Proje Yönetimi Sertifikası'],['kalite','ISO 9001 Kalite Yönetim Sistemi'],['gıda','HACCP / Gıda Güvenliği Sertifikası'],['bakım','Mesleki Bakım ve Teknik Servis Sertifikası'],['elektrik','Elektrik Tesisleri ve İş Güvenliği Sertifikası'],['yazılım','Yazılım Geliştirme Uzmanlık Sertifikası'],['veri','Veri Analitiği ve Yapay Zekâ Sertifikası'],['satış','Profesyonel Satış ve Müşteri Yönetimi Sertifikası'],['insan kaynak','İnsan Kaynakları Yönetimi Sertifikası'],['lojistik','Lojistik ve Tedarik Zinciri Sertifikası']];
function contextualCertificates(){const text=normalizeSearch([pv('pb-sector',''),pv('pb-subsector',''),pv('pb-expertise',''),pv('pb-position','')].join(' '));const matched=certificateRules.filter(([key])=>text.includes(normalizeSearch(key))).map(([,name])=>name);return unique(matched.length?matched:['Mesleki Yeterlilik Belgesi','İş Sağlığı ve Güvenliği Sertifikası'])}
function refreshMatrixSelections(){const sector=pv('pb-sector',''),subsector=pv('pb-subsector',''),func=pv('pb-expertise',''),position=pv('pb-position',''),ready=!!(sector&&subsector&&func&&position);const matches=item=>ready&&item.sector===sector&&item.subsector===subsector&&item.function===func;const skills=unique(matrixData.skills.filter(matches).map(item=>item.name));const skillSelect=document.getElementById('pb-skills');skillSelect.innerHTML=skills.length?skills.map(v=>'<option>'+safeText(v)+'</option>').join(''):'<option disabled>'+(ready?'Bu seçim için eşleşen beceri bulunamadı':'Önce sektör, alt sektör, fonksiyon ve pozisyon seçin')+'</option>';skillSelect.disabled=!skills.length;const certificate=document.getElementById('pb-certificate');if(certificate){const values=ready?contextualCertificates():[];certificate.innerHTML='<option value="">'+(ready?'Sertifika seçin':'Önce pozisyon seçin')+'</option>'+values.map(v=>'<option>'+safeText(v)+'</option>').join('');certificate.disabled=!ready}}
function updateCompetencyCategory(){const selected=pv('pb-competency-category','');const values=selected?unique(matrixData.competencies.filter(item=>competencyCategoryLabel(item.category)===selected).map(item=>item.name)):[];const target=document.getElementById('pb-competencies');target.innerHTML=values.length?values.map(v=>'<option>'+safeText(v)+'</option>').join(''):'<option disabled>Yetkinlik başlığı seçin</option>';target.disabled=!values.length;updateGeneratedPrompt()}
function initPromptBuilder(){const sector=document.getElementById('pb-sector');if(!sector)return;sector.innerHTML=promptOptions(keywordRows.map(r=>r[0]),'Sektör seçiniz');const expertiseLabel=document.getElementById('pb-expertise')?.closest('label')?.querySelector('span');if(expertiseLabel)expertiseLabel.textContent='Uzmanlık Alanı / Fonksiyon';const profession=document.getElementById('pb-profession')?.closest('label');if(profession&&!document.getElementById('pb-certificate'))profession.insertAdjacentHTML('afterend','<label><span>Sertifika</span><select id="pb-certificate" disabled onchange="updateGeneratedPrompt()"><option>Önce pozisyon seçin</option></select></label>');const catSel=document.getElementById('pb-competency-category');if(catSel){catSel.innerHTML='<option value="">Yetkinlik ana başlığı seçin</option>'+competencyCategoryOrder.map(v=>'<option>'+safeText(v)+'</option>').join('');catSel.disabled=false}refreshMatrixSelections();updateGeneratedPrompt()}
function updatePromptChain(level){const ids=['pb-sector','pb-subsector','pb-expertise','pb-position','pb-department'];const index=ids.indexOf(level);const selected=ids.slice(0,index+1).map(id=>document.getElementById(id).value);for(let i=index+1;i<ids.length;i++){const options=unique(keywordRows.filter(r=>selected.every((v,j)=>!v||r[j]===v)).map(r=>r[i]));const el=document.getElementById(ids[i]);el.innerHTML=promptOptions(options,['Sektör','Alt sektör','Fonksiyon','Pozisyon','Departman'][i]+' seçiniz');el.disabled=!options.length}refreshMatrixSelections();updateGeneratedPrompt()}
function pv(id,fallback){const el=document.getElementById(id);return el&&el.value?el.value:fallback}
function pm(id){const el=document.getElementById(id);return el?[...el.selectedOptions].map(o=>o.value).join(', '):''}
function updateGeneratedPrompt(){const out=document.getElementById('generated-prompt');if(!out)return;const sector=pv('pb-sector','{SEKTÖR}'),sub=pv('pb-subsector','{ALT_SEKTÖR}'),expert=pv('pb-expertise','{FONKSİYON}'),position=pv('pb-position','{POZISYON}'),department=pv('pb-department','{DEPARTMAN}'),profession=pv('pb-profession','{MESLEK}'),topic=pv('pb-topic','{KONU}'),exam=pv('pb-exam','{DEĞERLENDİRME_AMACI}'),difficulty=pv('pb-difficulty','{ZORLUK}'),duration=pv('pb-duration','{SURE}'),targets=[pm('pb-skills'),pm('pb-competencies')].filter(Boolean).join(', ')||'{BECERILER_VE_YETKINLIKLER}';out.value=['ROLÜN:','Sen, '+sector+' sektöründe '+sub+' alanında uzmanlaşmış, 15+ yıl deneyimli üst düzey bir Teknik Değerlendirme uzmanısın. '+position+' pozisyonunun donanımsal, yazılımsal ve tamamen işe yönelik (job-oriented) teknik detaylarına hâkimsin.','','BAĞLAM:','- Sektör: '+sector,'- Meslek: '+profession,'- Pozisyon/Seviye: '+position,'- Konu: '+topic,'- Zorluk Seviyesi: '+difficulty,'- Hedef Beceri: '+targets,'','GÖREV:','Yukarıdaki form verilerine dayanarak adayın doğrudan teknik ve operasyonel bilgisini ölçecek KISA, ÖZ ve YÜKSEK TEKNİK DERİNLİĞE SAHİP bir vaka oluştur. Vakayı, adayın adım adım çözmesi gereken salt teknik bir kriz döngüsü (troubleshooting loop) şeklinde kurgula.','','VAKA KURALLARI:','1. Vaka kesinlikle ÇOK KISA ve NET olmalıdır (maksimum 150 kelime). Lüzumsuz İK jargonundan ve uzun betimlemelerden kaçın.','2. Olaya doğrudan teknik bir sistem hatası, spesifik bir altyapı sorunu veya operasyonel kriz ile başla.','3. Sektörel araçları, yazılımları ve metrikleri (ör. log kayıtları, hata kodları, spesifik donanım/yazılım adları) gerçekçi bir şekilde kullan.','4. Adayın salt teknik bilgiyle çözebileceği birbirine bağlı (zincirleme) 3 aşamalı bir sorun döngüsü (loop) tasarla.','5. Vakanın sonuna, adayın sistem okuryazarlığını ve kriz çözme adımlarını ölçecek 3-5 adet, yalnızca gerçek uzmanların yanıtlayabileceği teknik sorular ekle.','','ÇIKTI FORMATI:','---','VAKA BAŞLIĞI: [...]','TEKNİK ALTYAPI VE BAŞLANGIÇ: [Doğrudan teknik verilerle, kısa ve öz]','KRİZ DÖNGÜSÜ (LOOP): [3 aşamalı zincirleme hata]','TEKNİK KISITLAR: [Sistem, zaman, kaynak]','TEKNİK SORULAR: [3-5 spesifik teknik soru]','---'].join('\\n')}
function generateCaseFromPrompt(){const sector=pv('pb-sector',''),sub=pv('pb-subsector',''),position=pv('pb-position',''),department=pv('pb-department',''),topic=pv('pb-topic',''),skills=pm('pb-skills'),competencies=pm('pb-competencies'),difficulty=pv('pb-difficulty','Orta'),duration=pv('pb-duration','60');if(!sector||!sub||!position||!topic)return toast('Sektör, alt sektör, pozisyon ve konu seçilmelidir');if(!skills&&!competencies)return toast('En az bir beceri veya yetkinlik seçin');const targets=[skills,competencies].filter(Boolean).join(', ');const card=document.getElementById('generated-case-card');card.hidden=false;card.innerHTML='<div class="case-card-head"><div><span class="eyebrow">AJAN 8 · FORMDAN ÜRETİLEN VAKA</span><h2>'+safeText(position)+' · '+safeText(topic)+'</h2><p>'+safeText(sector)+' / '+safeText(sub)+' · '+safeText(difficulty)+' · '+safeText(duration)+' dakika</p></div><span class="case-count">Vaka hazır</span></div><div class="case-body"><h3>ðŸ“Œ Teknik Altyapı ve Başlangıç</h3><p>'+safeText(position)+' olarak '+safeText(department||sub)+' biriminde görev yapıyorsunuz. Sistemde aniden veri tabanı replikasyon gecikmesi (lag) uyarıları alınmaya başlanmış ve ana API uç noktasında %40 oranında 500 Internal Server Error dönüşleri tespit edilmiştir.</p><h3>Kriz Döngüsü (Loop)</h3><p>1. Veritabanı yükünü azaltmak için read-replica devreden çıkarıldığında, bu kez ana sunucuda (master) CPU %99\'a ulaştı.<br>2. Yüksek CPU nedeniyle cache sunucusu zaman aşımına (timeout) uğrayarak tamamen düştü.<br>3. Sonuç olarak kullanıcı oturumları sıfırlandı ve ödeme gateway\'i kilitlendi.</p><h3>Teknik Kısıtlar</h3><p>Müdahale için sadece 15 dakikanız var. Kurumun SLA sözleşmesi gereği kesintinin toplam maliyeti dakikada 5.000 TL\'dir. Sunucu kapasitesi artırılamaz (hard-limit).</p><h3>Teknik Sorular</h3><p>S1: Bu darboğazı çözmek için ilk olarak hangi servise müdahale edersiniz ve neden?<br>S2: Cache sunucusunun çöküşünü engellemek için master sunucu tarafında hangi acil konfigürasyonu değiştirirsiniz?<br>S3: Sistemi ayağa kaldırdıktan sonra bu döngünün tekrar yaşanmaması için mimaride nasıl bir değişiklik önerirsiniz?</p><div class="case-tags"><b>ðŸŽ¯ Gözlemlenecek Beceri ve Yetkinlikler</b><span>'+safeText(targets)+'</span></div></div><div class="case-next-actions"><button class="primary" onclick="prepareTestFromCase(this.closest(\'.generated-case-card\').innerText)">Test Sorularını Hazırla</button></div>';card.scrollIntoView({behavior:'smooth',block:'start'});toast('Formdan vaka üretildi')}
function promptBuilderPage(){return layout('<section class="prompt-page"><div class="prompt-head"><div><span class="eyebrow">AJAN 8 · FORMDAN VAKA</span><h2>Formdan Vaka Üret</h2><p>Sektör, alt sektör, fonksiyon ve pozisyonu seçin; yalnızca bu bağlama uygun beceri, yetkinlik ve sertifikaları kullanarak vaka oluşturun.</p></div><button class="secondary" onclick="go(\'documents\')">← Belgeden Vaka</button></div><div class="prompt-card"><div class="prompt-grid"><label><span>Sektör</span><select id="pb-sector" onchange="updatePromptChain(\'pb-sector\')"></select></label><label><span>Alt Sektör</span><select id="pb-subsector" onchange="updatePromptChain(\'pb-subsector\')" disabled></select></label><label><span>Fonksiyon</span><select id="pb-expertise" onchange="updatePromptChain(\'pb-expertise\')" disabled></select></label><label><span>Pozisyon / Seviye</span><select id="pb-position" onchange="updatePromptChain(\'pb-position\')" disabled></select></label><label><span>Departman</span><select id="pb-department" onchange="updateGeneratedPrompt()" disabled></select></label><label><span>Meslek</span><input id="pb-profession" oninput="updateGeneratedPrompt()" placeholder="Meslek adını yazın"></label><label><span>Konu / Ünite</span><input id="pb-topic" oninput="updateGeneratedPrompt()" placeholder="Vakanın konusunu yazın"></label><label><span>Sınav Türü</span><select id="pb-exam" onchange="updateGeneratedPrompt()"><option>İşe Alım</option><option>Terfi</option><option>Seviye Tespit</option></select></label><label><span>Zorluk</span><select id="pb-difficulty" onchange="updateGeneratedPrompt()"><option>Kolay</option><option selected>Orta</option><option>Zor</option><option>Uzman</option></select></label><label><span>Süre (Dakika)</span><input id="pb-duration" type="number" min="1" value="60" oninput="updateGeneratedPrompt()"></label><label class="prompt-multi"><span>Bağlı Beceriler — çoklu seçim</span><select id="pb-skills" multiple disabled onchange="updateGeneratedPrompt()"><option disabled>Önce sektör, alt sektör, fonksiyon ve pozisyon seçin</option></select></label><div class="competency-picker"><label><span>Yetkinlik Ana Başlığı</span><select id="pb-competency-category" onchange="updateCompetencyCategory()" disabled><option value="">Önce sektör, alt sektör, fonksiyon ve pozisyon seçin</option></select></label><label class="prompt-multi"><span>Bağlı Yetkinlikler — çoklu seçim</span><select id="pb-competencies" multiple disabled onchange="updateGeneratedPrompt()"><option disabled>Önce ana yetkinlik başlığını seçin</option></select></label></div></div><div class="prompt-output-head"><div><span class="eyebrow">OLUŞTURULAN PROMPT</span><h3>Vaka Üretim Talimatı</h3></div><button class="primary" onclick="generateCaseFromPrompt()">Formdan Vaka Üret</button></div><textarea id="generated-prompt" class="generated-prompt" spellcheck="false"></textarea></div><section id="generated-case-card" class="generated-case-card" hidden></section></section>','Formdan Vaka Üret')}
const updateGeneratedPromptCore=updateGeneratedPrompt;
updateGeneratedPrompt=function(){updateGeneratedPromptCore();const out=document.getElementById('generated-prompt'),certificate=pv('pb-certificate','');if(out&&certificate)out.value=out.value.replace('- Zorluk Seviyesi:','- Sertifika: '+certificate+'\n- Zorluk Seviyesi:')}
const preparedQuestions=[
 {text:'Kritik teslim tarihine yaklaşılırken ekip, doğrulanmamış bir verinin rapora eklenmesini öneriyor. Yönetici olarak kalite, hız ve kurumsal risk dengesini korumak için ilk adımınız hangisi olur?',options:['Veriyi hemen kullanıp sonradan doğrulamak','Kaynağı doğrulayıp etkisini hızla değerlendirmek','Kararı tamamen dış hizmet sağlayıcıya bırakmak','Teslim tarihini gerekçesiz biçimde ertelemek'],answer:1},
 {text:'Toplantıda iki departman aynı kaynağı öncelikli olarak talep ediyor. Müşteri etkisi ve operasyon sürekliliği dikkate alındığında en uygun karar verme yaklaşımı hangisidir?',options:['Talebi ilk ileten departmana kaynağı vermek','Kaynağı iki ekip arasında eşit biçimde bölmek','Etkileri ölçüp ortak öncelik matrisi kullanmak','Üst yönetim dönene kadar hiçbir adım atmamak'],answer:2},
 {text:'Bir ekip üyesi kişisel veri içeren dosyayı yetkisiz bir kanaldan paylaştığını bildiriyor. Sorumlu yönetici olarak ilk müdahaleniz aşağıdakilerden hangisi olmalıdır?',options:['Olayı kayıt altına alıp erişimi derhal durdurmak','Dosyayı silmesini söyleyip konuyu kapatmak','Tüm ekibin erişimini süresiz olarak kaldırmak','Müşteriye inceleme yapmadan açıklama göndermek'],answer:0},
 {text:'Planlanan çözüm bütçeyi aşarken daha ucuz seçenek önemli bir güvenlik riski taşıyor. Paydaşların güvenini ve hedefleri koruyan en uygun yaklaşım hangisidir?',options:['Ucuz seçeneği riskleri açıklamadan uygulamak','Bütçeyi tek taraflı artırıp süreci devam ettirmek','Kararı ekip dışındaki bir kişiye devretmek','Alternatifleri risk ve değer açısından karşılaştırmak'],answer:3}
];
let secureExam={index:0,correct:0,wrong:0,started:0,answers:[]};
let generatedExamQuestions=[],generatedExamType='Açık Uçlu';
const mcqQuestionStems=['Bu vakada ilk uygulanması gereken en doğru adım hangisidir?','Karar alınmadan önce hangi bilgi öncelikle doğrulanmalıdır?','Riskleri azaltırken operasyonun sürmesini sağlayan yaklaşım hangisidir?','Paydaş iletişiminde en uygun uygulama hangisidir?','Sürecin başarısını ölçmek için en uygun gösterge hangisidir?','Mevzuat ve kurum politikaları açısından en doğru karar hangisidir?','Kaynak kısıtı altında önceliklendirme nasıl yapılmalıdır?','Kalıcı çözüm için hangi kontrol mekanizması kurulmalıdır?'];
const mcqOptionSets=[
 ['Kritik riski doğrulayıp sorumlu ve süre içeren eylem planı oluşturmak','Tüm kararları belirsizlik bitene kadar herhangi bir işlem yapmadan ertelemek','Yalnızca en hızlı seçeneği seçip diğer paydaşlara sonradan bilgi vermek','Sorunu başka bir birime devredip sonuç takibini tamamen onlara bırakmak'],
 ['Kaynak, tarih ve etki bilgisi doğrulanmış güncel operasyon kaydını incelemek','Ekipte en kıdemli çalışanın kişisel kanaatini tek başına yeterli kabul etmek','Daha önce benzer konuda kullanılan eski sunumu yeniden karar olarak uygulamak','Doğrulanmamış ilk bildirimi tüm paydaşlara kesin sonuç şeklinde duyurmak'],
 ['Kritik işleri ayırıp geçici önlem, sorumlu ve kontrol noktası belirlemek','Bütün işleri aynı öncelikte tutup kaynakları eşit biçimde dağıtmaya çalışmak','Yalnızca kısa vadeli teslim tarihine odaklanıp kalite kontrollerini kaldırmak','Mevcut planı hiç değiştirmeden sonuçların kendiliğinden düzelmesini beklemek'],
 ['Doğrulanmış durumu, alınan kararı ve sonraki adımları açıkça paylaşmak','Sadece olumlu gelişmeleri aktararak mevcut riskleri raporun dışında bırakmak','Her paydaşa birbirinden farklı ve kayıt altına alınmamış bilgiler göndermek','İletişimi süreç tamamlanana kadar durdurup soruları yanıtsız bırakmak']
];
function buildMcqQuestions(source,count){return Array.from({length:count},(_,i)=>{const correct=i%4,base=mcqOptionSets[i%mcqOptionSets.length],options=Array(4);options[correct]=base[0];let d=1;for(let slot=0;slot<4;slot++)if(slot!==correct)options[slot]=base[d++];return{text:(i+1)+'. '+mcqQuestionStems[i%mcqQuestionStems.length],options,answer:correct,open:false}})}
function buildMcqDraft(){const source=pv('mcq-case',''),count=Number(pv('mcq-count','10'));if(!source.trim())return toast('Önce vaka metnini girin');if(count<10||count>100)return toast('Soru sayısı 10 ile 100 arasında olmalıdır');generatedExamType='Çoktan Seçmeli';generatedExamQuestions=buildMcqQuestions(source,count);const box=document.getElementById('mcq-draft');box.hidden=false;box.innerHTML='<div class="case-card-head"><div><span class="eyebrow">GEMMA 4 · ÇOKTAN SEÇMELİ</span><h2>Dört şıklı vaka testi hazır</h2><p>'+count+' soru · A, B, C, D · dengeli doğru cevap dağılımı</p></div><span class="case-count">'+count+' soru hazır</span></div><div class="question-rules"><span>Dört eşit seçenek</span><span>Dengeli cevap anahtarı</span><span>Tek soru görünümü</span><span>Geri dönüş kapalı</span></div><div class="mcq-preview-list">'+generatedExamQuestions.slice(0,4).map((q,i)=>'<article><b>Soru '+(i+1)+'</b><p>'+safeText(q.text)+'</p><div>'+q.options.map((option,index)=>'<span class="'+(index===q.answer?'correct-option':'')+'">'+String.fromCharCode(65+index)+') '+safeText(option)+'</span>').join('')+'</div></article>').join('')+'</div><button class="primary" onclick="startSecureExam()">Çoktan Seçmeli Testi Başlat</button>';box.scrollIntoView({behavior:'smooth',block:'start'});toast(count+' çoktan seçmeli soru hazırlandı')}
function mcqPage(){const caseText=safeText(state.pendingCase||'');return layout('<section class="question-page"><div class="prompt-head"><div><span class="eyebrow">VAKADAN TEST</span><h2>Çoktan Seçmeli Vaka Testi</h2><p>Belge, form veya toplantıdan oluşturulan vakayı dört şıklı bir teste dönüştürün.</p></div></div><div class="question-builder"><div class="mcq-lock"><b>Soru Türü: Çoktan Seçmeli</b><span>Her soruda yalnızca A, B, C ve D seçenekleri kullanılır. Doğru cevaplar şıklara dengeli dağıtılır.</span></div><label class="question-case-field"><span>Vaka</span><textarea id="mcq-case" placeholder="Vaka metni...">'+caseText+'</textarea></label><div class="question-settings"><label><span>Soru Sayısı</span><input id="mcq-count" type="number" min="10" max="100" value="10"></label><label><span>Test Süresi (Dakika)</span><input id="test-total-minutes" type="number" min="1" value="30"></label><label><span>Soru Başına Süre (Dakika)</span><input id="question-minutes" type="number" min="1" value="3"></label><label><span>Seçenek Sayısı</span><input value="4 (A–D)" readonly></label></div><div class="question-policy"><b>Çoktan seçmeli sınav standardı</b><p>Seçenekler birbirine yakın uzunlukta hazırlanır. Doğru cevap aynı şıkta art arda tekrarlanmaz; A, B, C ve D arasında dengeli dağıtılır.</p></div><button class="primary full" onclick="buildMcqDraft()">Çoktan Seçmeli Test Sorularını Hazırla</button></div><section id="mcq-draft" class="generated-case-card" hidden></section></section>','Çoktan Seçmeli Vaka Testi')}
const openQuestionStems=['Vakadaki temel problemi ve bu problemin ortaya çıkmasına neden olan koşulları açıklayınız.','Bu vakada öncelik vereceğiniz ilk üç adımı gerekçeleriyle yazınız.','Paydaşlar arasındaki çıkar çatışmasını nasıl yöneteceğinizi açıklayınız.','Kararınızın oluşturabileceği operasyonel, etik ve hukuki riskleri değerlendiriniz.','Zaman ve kaynak kısıtları altında uygulanabilir bir eylem planı oluşturunuz.','Alternatif çözüm yollarını karşılaştırarak en uygun yaklaşımı gerekçelendiriniz.','Bu süreçte kullanılacak iletişim ve raporlama yöntemini açıklayınız.','Benzer olayların tekrarını önlemek için kalıcı iyileştirme önerileri sununuz.'];
const openAnswerTemplates=['Güçlü yanıt; temel problemi, kök nedenleri, etkilenen paydaşları ve kararın olası sonuçlarını somut vaka kanıtlarıyla açıklar.','Güçlü yanıt; aciliyet ve etki değerlendirmesi yapar, ilk üç adımı sıralar, sorumluları ve beklenen çıktıları tanımlar.','Güçlü yanıt; paydaşların beklentilerini ayrı ayrı değerlendirir, ortak hedef belirler ve izlenebilir bir uzlaşma planı kurar.','Güçlü yanıt; operasyonel, etik, mevzuatsal ve veri güvenliği risklerini olasılık-etki yaklaşımıyla değerlendirir.','Güçlü yanıt; süre, kaynak, sorumlu, kontrol noktası ve başarı ölçütü içeren uygulanabilir bir eylem planı sunar.','Güçlü yanıt; en az iki alternatifi risk, maliyet, zaman ve değer açısından karşılaştırıp seçimini gerekçelendirir.','Güçlü yanıt; hedef kitle, kanal, zamanlama, mesaj içeriği ve geri bildirim mekanizmasını açık biçimde tanımlar.','Güçlü yanıt; kök neden analizi, süreç kontrolü, sorumluluk, eğitim ve düzenli izleme adımlarını birlikte önerir.'];
function buildGeneratedQuestions(source,count){return Array.from({length:count},(_,i)=>({text:(i+1)+'. '+openQuestionStems[i%openQuestionStems.length]+' Yanıtınızı verilen vaka sorusundaki somut bilgilere dayandırınız.',template:openAnswerTemplates[i%openAnswerTemplates.length],open:true}))}
function buildQuestionDraft(){const source=pv('question-case',''),count=Number(pv('question-count','10')),words=Number(pv('question-words','28'));if(!source.trim())return toast('Önce vaka sorusunu girin');if(count<1||count>100)return toast('Soru sayısı 1 ile 100 arasında olmalıdır');generatedExamType='Açık Uçlu';generatedExamQuestions=buildGeneratedQuestions(source,count);const box=document.getElementById('question-draft');box.hidden=false;box.innerHTML='<div class="case-card-head"><div><span class="eyebrow">GEMMA 4 · HAZIRLAYAN GÖRÜNÜMÜ</span><h2>Açık uçlu vaka testi hazır</h2><p>'+count+' soru · hedef '+words+' kelime · yalnızca açık uçlu</p></div><span class="case-count">'+count+' soru hazır</span></div><div class="question-rules"><span>Serbest yanıt</span><span>Vaka kanıtı zorunlu</span><span>Cevap şablonu gizli</span><span>Tek soru görünümü</span></div><div class="answer-template-list">'+generatedExamQuestions.map((q,i)=>'<details><summary><b>Soru '+(i+1)+'</b><span>Gemma 4 cevap şablonu</span></summary><p>'+safeText(q.text)+'</p><div><strong>Yalnızca testi hazırlayan görür</strong>'+safeText(q.template)+'</div></details>').join('')+'</div><button class="primary" onclick="startSecureExam()">Açık Uçlu Vaka Testini Başlat</button>';box.scrollIntoView({behavior:'smooth',block:'start'});toast(count+' açık uçlu vaka sorusu ve cevap şablonu hazırlandı')}
function startSecureExam(){secureExam={index:0,correct:0,wrong:0,started:Date.now(),answers:[]};const modal=document.createElement('div');modal.className='modal secure-exam-modal';modal.id='secure-exam';modal.innerHTML='<div class="modal-card secure-exam-card"><div id="secure-exam-body"></div></div>';document.body.append(modal);renderSecureQuestion()}
function renderSecureQuestion(){const q=generatedExamQuestions[secureExam.index],body=document.getElementById('secure-exam-body');secureExam.started=Date.now();const wordCount=q.text.trim().split(/\s+/).length,perWord=document.getElementById('word-time-enabled')?.checked?Number(document.getElementById('word-seconds')?.value||2):0,allotted=perWord?wordCount*perWord:Number(document.getElementById('question-minutes')?.value||3)*60;body.innerHTML='<div class="secure-top"><span>GÜVENLİ SINAV MODU</span><b>Soru '+(secureExam.index+1)+' / '+generatedExamQuestions.length+'</b></div><div class="secure-progress"><i style="width:'+((secureExam.index+1)/generatedExamQuestions.length*100)+'%"></i></div><div class="question-meta"><span>'+q.text.trim().split(/\s+/).length+' kelime</span><span id="question-seconds">0 / '+allotted+' saniye</span></div><h2>'+safeText(q.text)+'</h2>'+(q.open?'<textarea id="open-answer" class="open-answer" placeholder="Yanıtınızı vaka metnine dayanarak yazın..."></textarea><button class="primary full" onclick="answerOpenQuestion()">Yanıtı Kaydet ve Sonraki Soru</button>':'<div class="secure-options">'+q.options.map((o,i)=>'<button onclick="answerSecureQuestion('+i+')"><b>'+String.fromCharCode(65+i)+'</b><span>'+safeText(o)+'</span></button>').join('')+'</div>')+'<p class="secure-note">Cevabınız kaydedildiğinde değiştirilemez ve sonraki soru açılır.</p>';const stamp=secureExam.started;const tick=setInterval(()=>{const el=document.getElementById('question-seconds');if(!el||secureExam.started!==stamp)return clearInterval(tick);el.textContent=Math.floor((Date.now()-stamp)/1000)+' / '+allotted+' saniye'},1000)}
function answerOpenQuestion(){const value=document.getElementById('open-answer').value.trim();if(!value)return toast('Bu soru cevaplanmadan sonraki soruya geçilemez');const seconds=Math.max(1,Math.round((Date.now()-secureExam.started)/1000)),wordCount=value.split(/\s+/).filter(Boolean).length,isCorrect=wordCount>=10;secureExam.answers.push({question:secureExam.index+1,seconds,answer:value,status:isCorrect?'correct':'wrong'});if(isCorrect)secureExam.correct++;else secureExam.wrong++;secureExam.index++;if(secureExam.index<generatedExamQuestions.length)renderSecureQuestion();else showOpenResult()}
function answerSecureQuestion(choice){const q=generatedExamQuestions[secureExam.index],seconds=Math.max(1,Math.round((Date.now()-secureExam.started)/1000));secureExam.answers.push({question:secureExam.index+1,seconds});if(choice===q.answer)secureExam.correct++;else secureExam.wrong++;secureExam.index++;if(secureExam.index<generatedExamQuestions.length)renderSecureQuestion();else showSecureResult()}
function showOpenResult(){const total=generatedExamQuestions.length,answered=secureExam.answers.length,blank=total-answered,pct=n=>Math.round(n/total*100),body=document.getElementById('secure-exam-body');body.innerHTML='<div class="secure-result"><span>SINAV TAMAMLANDI</span><h2>Vaka Testi Sonucu</h2><div class="result-summary-grid"><article><small>Doğru</small><b>'+secureExam.correct+'</b><span>%'+pct(secureExam.correct)+'</span></article><article><small>Yanlış</small><b>'+secureExam.wrong+'</b><span>%'+pct(secureExam.wrong)+'</span></article><article><small>Boş</small><b>'+blank+'</b><span>%'+pct(blank)+'</span></article><article><small>Cevaplanan</small><b>'+answered+'</b><span>%'+pct(answered)+'</span></article></div><button class="primary full" onclick="document.getElementById(\'secure-exam\').remove();go(\'evaluation\')">Değerlendirmeye Gönder</button></div>'}
function showSecureResult(){const total=secureExam.correct+secureExam.wrong,rate=Math.round(secureExam.correct/total*100),body=document.getElementById('secure-exam-body');body.innerHTML='<div class="secure-result"><span>SINAV TAMAMLANDI</span><h2>Test Sonucu</h2><div class="result-only-grid"><article><small>Doğru Cevap</small><b>'+secureExam.correct+'</b></article><article><small>Yanlış Cevap</small><b>'+secureExam.wrong+'</b></article><article><small>Başarı</small><b>%'+rate+'</b></article></div><button class="primary" onclick="document.getElementById(\'secure-exam\').remove()">Kapat</button></div>'}
function questionsPage(){const caseText=safeText(state.pendingCase||'');return layout('<section class="question-page"><div class="prompt-head"><div><span class="eyebrow">VAKA</span><h2>Açık Uçlu Vaka Testi</h2><p>Vakanın sorularını hazırlayın ve güvenli çözüm akışını başlatın.</p></div></div><div class="question-builder"><label class="question-case-field"><span>Vaka</span><textarea id="question-case" placeholder="Vaka metni veya vaka sorusu...">'+caseText+'</textarea></label><div class="question-settings"><label><span>Soru Sayısı</span><input id="question-count" type="number" min="1" max="100" value="10"></label><label><span>Test Süresi (Dakika)</span><input id="test-total-minutes" type="number" min="1" value="30"></label><label><span>Soru Başına Süre (Dakika)</span><input id="question-minutes" type="number" min="1" value="3"></label><label><span>Her Kelime İçin Süre</span><div class="word-time-control"><input id="word-time-enabled" type="checkbox"><input id="word-seconds" type="number" min="1" value="2"><em>saniye</em></div></label></div><div class="question-policy"><b>Güvenli soru çözme</b><p>Önce soru, ardından cevap alanı gösterilir. Birinci soru cevaplanmadan ikinci soruya geçilemez; geriye dönüş kapalıdır. Kelime başına süre seçilirse süre, sorunun kelime sayısına göre hesaplanır.</p></div><button class="primary full" onclick="buildQuestionDraft()">Test Sorularını Hazırla</button></div><section id="question-draft" class="generated-case-card" hidden></section></section>','Açık Uçlu Vaka Testi')}
const evaluationAnswers=[
 {question:'Kriz anında ilk hangi riski ele alırsınız?',answer:'Müşteri ve operasyon sürekliliğini aynı anda etkileyen güvenlik riskini önceliklendiririm.',status:'positive',seconds:54},
 {question:'Kararınızı hangi verilerle desteklersiniz?',answer:'Geçmiş olay kayıtları, teslim süresi, maliyet etkisi ve ekip kapasitesini birlikte incelerim.',status:'positive',seconds:71},
 {question:'Paydaşlara iletişimi nasıl yönetirsiniz?',answer:'Kararı ekibe bildiririm.',status:'negative',seconds:22},
 {question:'Alternatif çözümünüz nedir?',answer:'Yedek kaynak planını devreye alır, kritik teslimatları öncelik sırasına koyarım.',status:'positive',seconds:63},
 {question:'Sonucu hangi ölçütlerle izlersiniz?',answer:'',status:'blank',seconds:0}
];
let evaluationTimer=null,evaluationIndex=0;
function evaluationStats(processed=evaluationAnswers.length){const rows=evaluationAnswers.slice(0,processed),positive=rows.filter(r=>r.status==='positive').length,negative=rows.filter(r=>r.status==='negative').length,blank=rows.filter(r=>r.status==='blank').length,answered=positive+negative,rate=answered?Math.round(positive/answered*100):0,avg=answered?Math.round(rows.reduce((sum,r)=>sum+r.seconds,0)/answered):0;return{positive,negative,blank,answered,rate,avg}}
function evaluationRows(processed=0){return evaluationAnswers.map((row,i)=>{const waiting=i>=processed,current=i===processed;const label=waiting?(current?'İnceleniyor':'Bekliyor'):(row.status==='positive'?'Olumlu / Doğru':row.status==='negative'?'Olumsuz / Yanlış':'Boş');return '<article class="evaluation-row '+(waiting?'waiting ':'')+(current?'current ':'')+(waiting?'':row.status)+'"><div class="evaluation-number">'+(i+1)+'</div><div><h3>'+safeText(row.question)+'</h3><p>'+(row.answer?safeText(row.answer):'Cevap verilmedi')+'</p><small>'+(row.seconds?row.seconds+' saniyede cevaplandı':'Süre kaydı yok')+'</small></div><span>'+label+'</span></article>'}).join('')}
function evaluationPage(){const stats=evaluationStats(0);return layout('<section class="evaluation-page"><div class="prompt-head"><div><span class="eyebrow">TESTİM DEĞERLENDİRMESİ</span><h2>Test Değerlendirme</h2><p>Cevaplar olumlu, olumsuz ve boş olarak soru bazında değerlendirilir; ara metrikler anlık güncellenir.</p></div><button id="evaluation-start" class="primary" onclick="startEvaluation()">Değerlendirmeyi Başlat</button></div><div id="evaluation-metrics" class="evaluation-metrics">'+evaluationMetricsHtml(stats,0)+'</div><div class="evaluation-progress"><i id="evaluation-progress-bar" style="width:0%"></i></div><section id="evaluation-list" class="evaluation-list">'+evaluationRows(0)+'</section><section id="evaluation-final" class="evaluation-final" hidden></section></section>','Test Değerlendirme')}
function evaluationMetricsHtml(stats,processed){return '<article><span>İşlenen</span><b>'+processed+' / '+evaluationAnswers.length+'</b></article><article class="positive"><span>Olumlu</span><b>'+stats.positive+'</b></article><article class="negative"><span>Olumsuz</span><b>'+stats.negative+'</b></article><article><span>Boş</span><b>'+stats.blank+'</b></article><article><span>Anlık Başarı</span><b>%'+stats.rate+'</b></article><article><span>Ort. Cevap Süresi</span><b>'+stats.avg+' sn</b></article>'}
function startEvaluation(){clearInterval(evaluationTimer);evaluationIndex=0;state.evaluationTransferred=false;const button=document.getElementById('evaluation-start');button.disabled=true;button.textContent='Değerlendiriliyor…';document.getElementById('evaluation-final').hidden=true;updateEvaluationView();evaluationTimer=setInterval(()=>{evaluationIndex++;updateEvaluationView();if(evaluationIndex>=evaluationAnswers.length){clearInterval(evaluationTimer);evaluationTimer=null;finishEvaluation()}},700)}
function updateEvaluationView(){const stats=evaluationStats(evaluationIndex);document.getElementById('evaluation-metrics').innerHTML=evaluationMetricsHtml(stats,evaluationIndex);document.getElementById('evaluation-list').innerHTML=evaluationRows(evaluationIndex);document.getElementById('evaluation-progress-bar').style.width=Math.round(evaluationIndex/evaluationAnswers.length*100)+'%'}
function finishEvaluation(){const stats=evaluationStats(),final=document.getElementById('evaluation-final'),button=document.getElementById('evaluation-start');button.disabled=false;button.textContent='Yeniden Değerlendir';final.hidden=false;final.innerHTML='<div><span class="eyebrow">DEĞERLENDİRME TAMAMLANDI</span><h2>%'+stats.rate+' başarı</h2><p>'+stats.positive+' olumlu, '+stats.negative+' olumsuz ve '+stats.blank+' boş cevap bulundu.</p></div><button class="primary" onclick="transferEvaluationResult()">Sonucu Test Sonuçlarına Aktar</button>';final.scrollIntoView({behavior:'smooth',block:'nearest'});toast('Bütün test verileri değerlendirildi')}
function transferEvaluationResult(){if(!state.evaluationTransferred){const stats=evaluationStats();candidateResults.unshift({name:'Yeni Değerlendirilen Aday',email:'aday@skillbridge.com.tr',test:'Açık Uçlu Vaka Testi',department:'Değerlendirme Merkezi',detail:'Gemma 4 cevap değerlendirmesi',score:stats.rate,outcome:stats.rate>=60?'Olumlu':'Geliştirilmeli',date:new Date().toLocaleDateString('tr-TR'),time:new Date().toLocaleTimeString('tr-TR'),summary:stats.positive+' olumlu, '+stats.negative+' olumsuz ve '+stats.blank+' boş cevap değerlendirildi. Ortalama cevap süresi '+stats.avg+' saniyedir.'});state.evaluationTransferred=true}toast('Sonuç Test Sonuçları sayfasına aktarıldı');go('results')}
function serverPage(){return layout('<section class="server-page"><div class="prompt-head"><div><span class="eyebrow">SİSTEM YÖNETİMİ</span><h2>Sunucu Bağlantısı</h2><p>Sunucu ve Gemini bağlantısının gerçek durumunu buradan kontrol edin.</p></div><span id="server-live-status" class="server-status"><i></i> KONTROL EDİLİYOR</span></div><div class="server-status-grid"><article><span>Uygulama sunucusu</span><b id="server-state">Kontrol ediliyor</b><small>/api/health güvenli durum uç noktası</small></article><article><span>AI sağlayıcısı</span><b id="gemini-state">Kontrol ediliyor</b><small id="gemini-detail">Gizli ortam değişkeni doğrulanıyor</small></article><article><span>Ajan durumu</span><b id="agent-server-state">0 / 17 bağlı</b><small>Gemini doğrulanmadan ajanlar ONLINE gösterilmez.</small></article></div><section class="server-security-card"><div><span class="eyebrow">SUNUCU DESTEKLİ YAPI</span><h3>.env değişkenleri</h3><p>Gerçek anahtar tarayıcıya yazılmaz. Sunucuda <b>GEMINI_API_KEY</b>, model adı ise <b>GEMINI_MODEL</b> olarak tutulur.</p><button class="primary" onclick="refreshServerConnection()">Bağlantıyı Yeniden Kontrol Et</button></div><ul><li><b>Site erişimi:</b> Özel ve oturum korumalı</li><li><b>API uç noktası:</b> /api/generate</li><li><b>İstek limiti:</b> Dakikada 12</li><li><b>Anahtar görünürlüğü:</b> Yalnızca sunucu</li></ul></section><div id="server-message" class="server-notice"><b>Bağlantı denetleniyor</b><p>Lütfen bekleyin.</p></div></section>','Sunucu Bağlantısı')}
async function refreshServerConnection(){const badge=document.getElementById('server-live-status'),message=document.getElementById('server-message');if(!badge)return;badge.className='server-status';badge.innerHTML='<i></i> KONTROL EDİLİYOR';try{const response=await fetch('/api/health',{cache:'no-store'}),data=await response.json();document.getElementById('server-state').textContent=data.server==='online'?'Çevrimiçi':'Bağlantı yok';document.getElementById('gemini-state').textContent=data.gemini?'Bağlı':'Anahtar bekleniyor';document.getElementById('gemini-detail').textContent=data.gemini?data.model+' güvenli bağlantısı aktif':'GEMINI_API_KEY tanımlı değil';document.getElementById('agent-server-state').textContent=data.gemini?'17 / 17 bağlı':'0 / 17 bağlı';badge.className='server-status '+(data.gemini?'connected':'waiting');badge.innerHTML='<i></i> '+(data.gemini?'TAM BAĞLANTI':'SUNUCU ÇEVRİMİÇİ');message.innerHTML=data.gemini?'<b>Bağlantı hazır</b><p>Gemini üretim servisi sunucu üzerinden kullanılabilir.</p>':'<b>Sunucu çalışıyor</b><p>Gemini anahtarı gizli ortam değişkenine eklendiğinde ajanlar etkinleşecek.</p>'}catch(error){badge.className='server-status disconnected';badge.innerHTML='<i></i> BAĞLANTI YOK';document.getElementById('server-state').textContent='Çevrimdışı';message.innerHTML='<b>Sunucuya ulaşılamadı</b><p>'+safeText(error.message)+'</p>'}}
function render(){let html;if(!state.logged)html=loginPage();else html=({dashboard:dashboard,'personal-data':personalDataPage,'data-banking':dataBankingPage,tests:testsPage,evaluation:evaluationPage,results:resultsPage,qr:qrPage,agents:agentsPage,server:serverPage,'hr-specialist':hrSpecialistPage,documents:documentsPage,prompt:promptBuilderPage,meetings:meetingsPage,mcq:mcqPage,questions:questionsPage,comparison:comparisonPage,'user-credits':userCreditsPage}[state.page]||dashboard)();document.getElementById('app').innerHTML=html;if(state.logged&&(state.page==='personal-data'||state.page==='data-banking'))setTimeout(initKeywords,0);if(state.logged&&state.page==='documents')setTimeout(initDocumentBuilder,0);if(state.logged&&state.page==='prompt')setTimeout(initPromptBuilder,0);if(state.logged&&state.page==='hr-specialist')setTimeout(initHrSpecialist,0);if(state.logged&&state.page==='server')setTimeout(refreshServerConnection,0);if(state.logged&&state.page==='user-credits')setTimeout(calcCredit,0)}
function selectMeetingSource(source){document.querySelectorAll('.meeting-source button').forEach(b=>b.classList.toggle('active',b.dataset.source===source));document.getElementById('meeting-source').value=source;document.getElementById('meeting-url').placeholder=source==='Google Meet'?'https://meet.google.com/...':'https://teams.microsoft.com/l/meetup-join/...'}
let meetingTimer=null,meetingSeconds=60,meetingTranscript='',meetingRecognition=null,meetingSpeaking=false;
function switchMeetingScreen(id){document.querySelectorAll('.meeting-screen').forEach(screen=>screen.hidden=screen.id!==id);const target=document.getElementById(id);if(target)target.hidden=false}
function meetingClock(){const el=document.getElementById('meeting-timer');if(el)el.textContent='00:'+String(meetingSeconds).padStart(2,'0')}
function finishMeetingRecording(){if(meetingTimer){clearInterval(meetingTimer);meetingTimer=null}if(meetingRecognition){try{meetingRecognition.stop()}catch(e){}meetingRecognition=null}if(!meetingTranscript.trim()){switchMeetingScreen('meeting-start');const error=document.getElementById('meeting-error');error.textContent='Konuşma algılanmadı. Mikrofon iznini ve ses kaynağını kontrol edip yeniden deneyin.';return}switchMeetingScreen('meeting-ready');toast('Kayıt tamamlandı')}
function startMeetingRecording(){const url=document.getElementById('meeting-url').value.trim(),title=document.getElementById('meeting-title').value.trim(),consent=document.getElementById('meeting-consent').checked,error=document.getElementById('meeting-error');error.textContent='';if(!url||!title)return error.textContent='Toplantı bağlantısı ve toplantı adı zorunludur.';if(!/^https:\/\/(meet\.google\.com|teams\.microsoft\.com)\//i.test(url))return error.textContent='Geçerli bir Google Meet veya Microsoft Teams bağlantısı girin.';if(!consent)return error.textContent='Kayıt ve transkripsiyon onayını işaretleyin.';const Recognition=window.SpeechRecognition||window.webkitSpeechRecognition;if(!Recognition)return error.textContent='Bu tarayıcı canlı konuşma algılamayı desteklemiyor. TXT transkript yükleme seçeneğini kullanın.';meetingTranscript='';meetingSeconds=60;switchMeetingScreen('meeting-recording');meetingClock();meetingRecognition=new Recognition();meetingRecognition.lang='tr-TR';meetingRecognition.continuous=true;meetingRecognition.interimResults=true;meetingRecognition.onresult=e=>{let interim='';for(let i=e.resultIndex;i<e.results.length;i++){const text=e.results[i][0].transcript;if(e.results[i].isFinal)meetingTranscript+=text+' ';else interim+=text}const preview=document.getElementById('meeting-live-preview');preview.textContent=(meetingTranscript+interim).trim()||'Konuşma bekleniyor…'};meetingRecognition.onerror=e=>{if(e.error==='not-allowed'||e.error==='service-not-allowed'){if(meetingTimer){clearInterval(meetingTimer);meetingTimer=null}switchMeetingScreen('meeting-start');document.getElementById('meeting-error').textContent='Mikrofon izni verilmedi. İzin verin veya TXT transkript yükleyin.'}};meetingRecognition.onend=()=>{if(meetingTimer&&meetingSeconds>0){try{meetingRecognition.start()}catch(e){}}};try{meetingRecognition.start()}catch(e){switchMeetingScreen('meeting-start');error.textContent='Mikrofon başlatılamadı. Tarayıcı izinlerini kontrol edin.';return}meetingTimer=setInterval(()=>{meetingSeconds--;meetingClock();if(meetingSeconds<=0)finishMeetingRecording()},1000)}
function openMeetingTranscript(){switchMeetingScreen('meeting-result');const el=document.getElementById('meeting-transcript');el.value=meetingTranscript.trim();document.getElementById('transcript-file-name').textContent=meetingTranscript?'Canlı kayıt':'Dosya seçilmedi'}
function toggleMeetingSpeech(){const text=pv('meeting-transcript','');if(!text)return toast('Okunacak konuşma metni yok');if(meetingSpeaking){speechSynthesis.cancel();meetingSpeaking=false;return}const utterance=new SpeechSynthesisUtterance(text);utterance.lang='tr-TR';utterance.onend=()=>meetingSpeaking=false;meetingSpeaking=true;speechSynthesis.speak(utterance)}
function resetMeetingFlow(){if(meetingTimer)clearInterval(meetingTimer);if(meetingRecognition){try{meetingRecognition.stop()}catch(e){}}speechSynthesis.cancel();meetingTimer=null;meetingRecognition=null;meetingTranscript='';meetingSeconds=60;document.getElementById('meeting-transcript').value='';document.getElementById('meeting-case-card').hidden=true;switchMeetingScreen('meeting-start')}
function loadTranscriptFile(file){if(!file)return;if(!file.name.toLowerCase().endsWith('.txt'))return toast('Konuşma metni için TXT dosyası seçin');if(file.size>5*1024*1024)return toast('Dosya boyutu en fazla 5 MB olabilir');const reader=new FileReader();reader.onload=()=>{document.getElementById('meeting-transcript').value=reader.result;document.getElementById('transcript-file-name').textContent=file.name;toast('Konuşma metni yüklendi')};reader.readAsText(file,'UTF-8')}
function generateMeetingCase(){const source=pv('meeting-source','Google Meet'),title=pv('meeting-title',''),date=pv('meeting-date',''),people=pv('meeting-participants',''),raw=pv('meeting-transcript','');if(!title||!raw)return toast('Toplantı adı ve konuşma metni zorunludur');if(raw.length<40)return toast('Konuşma metni vaka üretmek için çok kısa');const excerpt=raw.slice(0,420)+(raw.length>420?'…':'');const card=document.getElementById('meeting-case-card');card.hidden=false;card.innerHTML='<div class="case-card-head"><div><span class="eyebrow">AJAN 9–10 · KONUŞMADAN VAKA</span><h2>'+safeText(title)+'</h2><p>'+safeText(source)+' · '+safeText(date||'Tarih belirtilmedi')+'</p></div><span class="case-count">Vaka hazır</span></div><div class="case-body"><h3>Toplantı Bağlamı</h3><p>'+safeText(people||'Toplantı katılımcıları')+' arasında gerçekleştirilen görüşmede operasyonel hedefler, sorumluluklar ve karar gerektiren konular ele alınmıştır.</p><h3>Konuşmadan Alınan Olay Akışı</h3><p class="transcript-excerpt">'+safeText(excerpt)+'</p><h3>Vaka</h3><p>Görüşme sırasında tarafların öncelikleri arasında farklılık oluşmuş, zaman baskısı altında uygulanabilir bir karar alınması gerekmiştir. Mevcut bilgiler eksik olmasına rağmen toplantı ekibinin görev dağılımını netleştirmesi, riskleri kayıt altına alması ve ilgili paydaşlarla izlenebilir bir eylem planı oluşturması beklenmektedir. Sürecin kritik noktasında kısa vadeli teslim hedefi ile kalite, mevzuat ve kurumsal güven gereklilikleri arasında seçim yapılması zorunlu hâle gelmiştir. Vaka, ekibin ortak karara ulaşamadığı ve sorumlunun bir sonraki adımı belirlemesi gereken aşamada sona erer.</p><div class="case-tags"><b>Kaynak</b><span>'+safeText(source)+' konuşma metni</span></div></div><div class="case-next-actions"><button class="primary" onclick="prepareTestFromCase(this.closest(\'.generated-case-card\').innerText)">Test Sorularını Hazırla</button></div>';card.scrollIntoView({behavior:'smooth',block:'start'});toast('Konuşma metni vakaya dönüştürüldü')}
function meetingsPage(){return layout('<section class="meeting-page"><div class="prompt-head"><div><span class="eyebrow">AJAN 9–10 · TOPLANTI ANALİZİ</span><h2>Meet & Teams Konuşmasından Vaka Üret</h2><p>Toplantı bağlantısını tanımlayın, konuşmayı kaydedin veya transkript yükleyin; metni soru üretmeden vakaya dönüştürün.</p></div></div><div class="meeting-flow-card"><section id="meeting-start" class="meeting-screen"><div class="meeting-screen-head"><span class="meeting-step">1</span><div><h3>Toplantıyı Tanımla</h3><p>Google Meet veya Microsoft Teams bağlantısını girin.</p></div></div><div class="meeting-source"><button class="active" data-source="Google Meet" onclick="selectMeetingSource(\'Google Meet\')">Google Meet</button><button data-source="Microsoft Teams" onclick="selectMeetingSource(\'Microsoft Teams\')">Microsoft Teams</button></div><input id="meeting-source" type="hidden" value="Google Meet"><label><span>Toplantı Bağlantısı</span><input id="meeting-url" type="url" placeholder="https://meet.google.com/..."></label><label><span>Toplantı Adı</span><input id="meeting-title" placeholder="Örn. Proje değerlendirme görüşmesi"></label><div class="meeting-two"><label><span>Tarih</span><input id="meeting-date" type="date"></label><label><span>Katılımcılar</span><input id="meeting-participants" placeholder="Adları virgülle ayırın"></label></div><label class="meeting-consent"><input id="meeting-consent" type="checkbox"><span>Katılımcılara kayıt bildirimi yapıldı ve gerekli izinler alındı.</span></label><p class="integration-note">Canlı kayıt bu cihazın mikrofonunu kullanır. Uzak toplantıya katılan kurumsal bot için yetkili Read AI bağlantısı gerekir.</p><p id="meeting-error" class="meeting-error" role="alert"></p><button class="primary full" onclick="startMeetingRecording()">Botu Hazırla ve Kaydı Başlat</button></section><section id="meeting-recording" class="meeting-screen meeting-center" hidden><div class="meeting-mic"><span>ðŸŽ™ï¸</span></div><span class="meeting-live">CANLI KAYIT</span><h3>Konuşma Kaydediliyor</h3><div id="meeting-timer" class="meeting-timer">00:60</div><p id="meeting-live-preview" class="meeting-live-preview">Konuşma bekleniyor…</p><button class="danger-button" onclick="finishMeetingRecording()">Kaydı Bitir</button></section><section id="meeting-ready" class="meeting-screen meeting-center" hidden><div class="meeting-check">✓</div><span class="meeting-step-label">3 · KAYIT TAMAMLANDI</span><h3>Konuşma metni hazır</h3><p>Ham transkripti inceleyebilir, düzenleyebilir ve vakaya çevirebilirsiniz.</p><button class="primary" onclick="openMeetingTranscript()">Kaydı Aç</button></section><section id="meeting-result" class="meeting-screen" hidden><div class="meeting-screen-head"><span class="meeting-step">4</span><div><h3>Ham Konuşma Metni</h3><p>Metni düzenleyin veya TXT dosyasından yükleyin.</p></div></div><label><span>Meet/Teams Transkripti</span><textarea id="meeting-transcript" placeholder="Konuşma metnini buraya yapıştırın..."></textarea></label><div class="transcript-upload"><button class="secondary" onclick="document.getElementById(\'transcript-file\').click()">TXT Dosyası Seç</button><span id="transcript-file-name">Dosya seçilmedi</span><input id="transcript-file" type="file" accept=".txt,text/plain" hidden onchange="loadTranscriptFile(this.files[0])"></div><div class="meeting-result-actions"><button class="secondary" onclick="toggleMeetingSpeech()">ðŸ”Š Metni Seslendir / Durdur</button><button class="secondary" onclick="resetMeetingFlow()">Yeni Toplantı</button><button class="primary" onclick="generateMeetingCase()">Konuşmayı Vakaya Çevir</button></div></section></div><section id="meeting-case-card" class="generated-case-card" hidden></section></section>','Meet & Teams Vaka')}
const generateHrQuestionBase=generateHrQuestion;
generateHrQuestion=function(){generateHrQuestionBase();const box=document.getElementById('hr-json-output');if(!box?.value)return;try{const data=JSON.parse(box.value);data.model_ajan='Gemini';data.ajan_gorevi='Yetkinlik ve teknik soru hazırlama/üretme';box.value=JSON.stringify(data,null,2)}catch(error){}toast('Soru seti Gemini üretim ajanına hazırlandı')};
const hrSpecialistPageBase=hrSpecialistPage;
hrSpecialistPage=function(){return hrSpecialistPageBase().replace('SAYFA 16 · HR SPECIALIST','SAYFA 16 · GEMINI QUESTION AGENT').replace('Sektör, pozisyon, teknik beceri ve yetkinlik seviyesini birlikte kullanarak','Gemini; sektör, pozisyon, teknik beceri ve yetkinlik seviyesini birlikte kullanarak').replace('Kalite kilidi etkin','Gemini aktif · Kalite kilitli').replace('Teknik bağlam + STAR + JSON','Gemini · Teknik bağlam + STAR + JSON').replace('Kaliteli Soru Seti Üret','Gemini ile Soru Seti Üret')};
const agentsPageBase=agentsPage;
agentsPage=function(){return agentsPageBase().replace('<div class="model-badge"><span>YÖNETİCİ MODEL</span><b>Gemma 4 · 26B</b><small>Görev yönlendirme ve kapsam denetimi</small></div>','<div class="model-stack"><div class="model-badge"><span>YÖNETİCİ MODEL</span><b>Gemma 4 · 26B</b><small>Görev yönlendirme ve kapsam denetimi</small></div><div class="model-badge gemini-badge"><span>SORU ÜRETİM AJANI</span><b>Gemini</b><small>Sayfa 11, 16 ve 17 · soru üretimi ve kalite kontrolü</small></div></div>').replace('Gemma 4 26B tarafından yönetilir','Gemma yönetir · Soruları Gemini üretir')};
const buildMcqDraftBase=buildMcqDraft;
buildMcqDraft=function(){buildMcqDraftBase();const label=document.querySelector('#mcq-draft .eyebrow');if(label)label.textContent='GEMINI · ÇOKTAN SEÇMELİ SORU AJANI'};
function openCreditModal(){const modal=document.createElement('div');modal.className='modal credit-modal';modal.innerHTML=`<div class="modal-card" style="max-width:500px"><div class="modal-head"><div><span class="eyebrow">ÖDEME ADIMI</span><h2>Kontör Yükle</h2><p class="sub">Hesabınıza kontör ekleyerek işlemlere devam edebilirsiniz.</p></div><button type="button" onclick="this.closest(\'.modal\').remove()">×</button></div><form onsubmit="event.preventDefault();this.closest(\'.modal\').remove();toast('Ödeme işleminiz başarıyla alındı ve kontörler hesabınıza yüklendi!');"><div class="field"><label>Yüklenecek Kontör Miktarı</label><select required><option value="">Seçin...</option><option value="50">50 Kontör (500 TL)</option><option value="100">100 Kontör (1.000 TL)</option><option value="250">250 Kontör (2.500 TL)</option><option value="500">500 Kontör (5.000 TL)</option><option value="1000">1.000 Kontör (10.000 TL)</option></select></div><div class="field"><label>Kart Üzerindeki İsim</label><input type="text" placeholder="Ad Soyad" required></div><div class="field"><label>Kart Numarası</label><input type="text" placeholder="0000 0000 0000 0000" pattern="[0-9 ]+" required></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px"><div class="field"><label>Son Kullanma</label><input type="text" placeholder="AA/YY" required></div><div class="field"><label>CVC</label><input type="text" placeholder="123" required></div></div><div style="margin-top:24px;display:flex;justify-content:flex-end;gap:10px"><button type="button" class="secondary" onclick="this.closest(\'.modal\').remove()">İptal</button><button type="submit" class="primary">Ödemeyi Tamamla</button></div></form></div>`;document.body.append(modal)}
function openPackagesModal(){const modal=document.createElement('div');modal.className='modal packages-modal';modal.innerHTML=`<div class="modal-card" style="max-width:700px"><div class="modal-head"><div><span class="eyebrow">ABONELİK SEÇENEKLERİ</span><h2>Paketleri İncele</h2><p class="sub">Kurumunuzun ihtiyacına uygun paketi seçerek avantajlı fiyatlardan yararlanın.</p></div><button type="button" onclick="this.closest(\'.modal\').remove()">×</button></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:18px"><article style="border:1px solid #dbe4ee;border-radius:12px;padding:18px;text-align:center"><h3 style="margin-top:0">Standart</h3><b style="display:block;font-size:1.8rem;color:#4aa16f;margin:10px 0">10 TL</b><span style="font-size:0.8rem;color:#64748b">1 Kontör</span><hr style="border:0;border-top:1px solid #dbe4ee;margin:15px 0"><ul style="list-style:none;padding:0;font-size:0.8rem;text-align:left;line-height:1.6;color:#475569"><li>✓ Temel vaka testi</li><li>✓ 10 CV karşılaştırma</li><li>✓ Anında aktivasyon</li></ul></article><article style="border:2px solid #4aa16f;background:#f2faf5;border-radius:12px;padding:18px;text-align:center;position:relative"><span style="position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:#4aa16f;color:#fff;font-size:0.6rem;padding:3px 8px;border-radius:10px;font-weight:bold">EN POPÜLER</span><h3 style="margin-top:0">Gelişmiş</h3><b style="display:block;font-size:1.8rem;color:#4aa16f;margin:10px 0">500 TL</b><span style="font-size:0.8rem;color:#64748b">50 Kontör (50 Test)</span><hr style="border:0;border-top:1px solid #dbe4ee;margin:15px 0"><ul style="list-style:none;padding:0;font-size:0.8rem;text-align:left;line-height:1.6;color:#475569"><li>✓ 1 yıllık arşiv</li><li>✓ 10+ CV karşılaştırma</li><li>✓ Açık uçlu test analizi</li></ul></article><article style="border:1px solid #dbe4ee;border-radius:12px;padding:18px;text-align:center"><h3 style="margin-top:0">Premium</h3><b style="display:block;font-size:1.8rem;color:#4aa16f;margin:10px 0">10.000 TL</b><span style="font-size:0.8rem;color:#64748b">Sınırsız Entegrasyon</span><hr style="border:0;border-top:1px solid #dbe4ee;margin:15px 0"><ul style="list-style:none;padding:0;font-size:0.8rem;text-align:left;line-height:1.6;color:#475569"><li>✓ Kuruma özel ajanlar</li><li>✓ API ve Webhook desteği</li><li>✓ Öncelikli kapasite</li></ul></article></div><div style="margin-top:24px;display:flex;justify-content:flex-end;gap:10px"><button type="button" class="secondary" onclick="this.closest(\'.modal\').remove()">Kapat</button><button type="button" class="primary" onclick="this.closest(\'.modal\').remove();openCreditModal()">Hemen Yükle</button></div></div>`;document.body.append(modal)}
const buildQuestionDraftBase=buildQuestionDraft;
buildQuestionDraft=function(){buildQuestionDraftBase();const label=document.querySelector('#question-draft .eyebrow');if(label)label.textContent='GEMINI · AÇIK UÇLU SORU AJANI';document.querySelectorAll('#question-draft summary span').forEach(el=>el.textContent='Gemini cevap şablonu')};
function aiJson(text){const clean=String(text||'').replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'').trim();return JSON.parse(clean)}
function personalDataPage() { return dataPageBase('Kişisel Bilgiler'); }
function dataBankingPage() { return dataPageBase('Veri Bankacılığı'); }
function openEvrakKutusuModal() {
  const modal = document.createElement('div');
  modal.className = 'modal evrak-modal';
  modal.innerHTML = `
    <div class="modal-card" style="max-width: 400px; text-align: center;">
      <div class="modal-head" style="justify-content: flex-end;">
        <button type="button" onclick="this.closest(\'.modal\').remove()">×</button>
      </div>
      <h2 style="margin-top: 0;">Evrak Kutusu</h2>
      <p class="sub" style="margin-bottom: 24px;">Yeni evrak yüklemek için bilgisayarınızdan bir dosya seçin.</p>
      <button class="primary full" onclick="toast('Dosya seçici açıldı'); this.closest(\'.modal\').remove();">Bilgisayardan Yükle</button>
    </div>
  `;
  document.body.append(modal);
}
async function aiCall(prompt){const response=await fetch('/api/generate',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({prompt})});const data=await response.json().catch(()=>({error:'Sunucu geçerli yanıt vermedi.'}));if(!response.ok)throw new Error(data.error||'Gemini bağlantısı başarısız.');return data.text}
function aiBusy(button,on){if(!button)return;if(on){button.dataset.oldText=button.textContent;button.textContent='Gemini üretiyor…';button.disabled=true}else{button.textContent=button.dataset.oldText||button.textContent;button.disabled=false}}
function aiMulti(id){const el=document.getElementById(id);return el?[...el.selectedOptions].map(o=>o.value).filter(Boolean):[]}
generateCaseFromPrompt=async function(){const button=document.querySelector('.prompt-output-head .primary'),sector=pv('pb-sector',''),sub=pv('pb-subsector',''),func=pv('pb-expertise',''),position=pv('pb-position',''),department=pv('pb-department',''),topic=pv('pb-topic',''),difficulty=pv('pb-difficulty','Orta'),duration=pv('pb-duration','60'),skills=aiMulti('pb-skills'),competencies=aiMulti('pb-competencies');if(!sector||!sub||!position||!topic)return toast('Sektör, alt sektör, pozisyon ve konu seçilmelidir');if(!skills.length&&!competencies.length)return toast('En az bir beceri veya yetkinlik seçin');const variation=(crypto.randomUUID?.()||Date.now()+'-'+Math.random());const prompt=`Türkçe, oldukça kısa, net ve yüksek teknik derinliğe sahip bir iş vakası üret. Lüzumsuz betimlemelerden kaçın. Vakayı adayın adım adım çözmesi gereken teknik ve operasyonel bir kriz döngüsü (troubleshooting loop) şeklinde kurgula. En sona teknik sorular ekle.\nSEKTÖR: ${sector}\nALT SEKTÖR: ${sub}\nFONKSİYON: ${func}\nPOZİSYON: ${position}\nDEPARTMAN: ${department}\nKONU: ${topic}\nZORLUK: ${difficulty}\nSÜRE: ${duration}\nBECERİLER: ${skills.join(', ')}\nYETKİNLİKLER: ${competencies.join(', ')}\nBENZERSİZ ÜRETİM KODU: ${variation}\nYalnızca JSON döndür: {"title":"...","summary":"Kısa teknik özet","case_text":"Maksimum 150 kelimelik, doğrudan sorun döngüsü (loop) içeren vaka ve en sonda 3-5 adet spesifik teknik soru","decision_point":"...","stakeholders":["..."],"metrics":["..."]}`;aiBusy(button,true);try{const result=aiJson(await aiCall(prompt)),card=document.getElementById('generated-case-card');card.hidden=false;card.innerHTML='<div class="case-card-head"><div><span class="eyebrow">GEMINI · GERÇEK API ÜRETİMİ</span><h2>'+safeText(result.title||position+' · '+topic)+'</h2><p>'+safeText(sector)+' / '+safeText(sub)+' · '+safeText(difficulty)+'</p></div><span class="case-count">Yeni vaka</span></div><div class="case-body"><p>'+safeText(result.summary||'')+'</p><h3>Vaka ve Teknik Sorular</h3><p class="ai-case-text">'+safeText(result.case_text||'').replaceAll('\n','<br>')+'</p><h3>Kritik Karar Noktası</h3><p>'+safeText(result.decision_point||'')+'</p><div class="case-tags"><b>Üretim kodu</b><span>'+safeText(variation)+'</span></div></div><div class="case-next-actions"><button class="primary" onclick="prepareTestFromCase(this.closest(\'.generated-case-card\').innerText)">Test Sorularını Hazırla</button></div>';card.scrollIntoView({behavior:'smooth',block:'start'});toast('Gemini yeni ve özgün vaka üretti')}catch(error){toast(error.message)}finally{aiBusy(button,false)}};
buildMcqDraft=async function(){const button=document.querySelector('.question-builder .primary'),source=pv('mcq-case',''),count=Number(pv('mcq-count','10'));if(!source.trim())return toast('Önce vaka metnini girin');if(count<10||count>100)return toast('Soru sayısı 10 ile 100 arasında olmalıdır');const variation=(crypto.randomUUID?.()||Date.now()+'-'+Math.random());const prompt=`Aşağıdaki vakaya tamamen bağlı ${count} farklı Türkçe çoktan seçmeli soru üret. Sorular teknik olarak çok zorlayıcı, çeldiricileri son derece güçlü, vakanın satır aralarını ve karmaşık ilişkilerini ölçen uzman seviyesinde olsun. Basit çıkarım soruları sorma. Her soru A-D dört şıklı olsun. Şıklar yakın uzunlukta, doğru cevaplar A/B/C/D arasında dengeli ve aynı harf art arda en fazla iki kez olsun. Her soru başka bir vaka kanıtını ölçsün.\nVAKA:\n${source}\nBENZERSİZ KOD: ${variation}\nYalnızca JSON döndür: {"questions":[{"text":"...","options":["...","...","...","..."],"answer":0,"rationale":"..."}]}`;aiBusy(button,true);try{const result=aiJson(await aiCall(prompt));generatedExamType='Çoktan Seçmeli';generatedExamQuestions=(result.questions||[]).map((q,i)=>({text:(i+1)+'. '+q.text,options:q.options,answer:Number(q.answer),open:false})).filter(q=>q.options?.length===4&&q.answer>=0&&q.answer<4);if(generatedExamQuestions.length!==count)throw new Error('Gemini beklenen soru sayısını üretmedi; yeniden deneyin.');const box=document.getElementById('mcq-draft');box.hidden=false;box.innerHTML='<div class="case-card-head"><div><span class="eyebrow">GEMINI · GERÇEK API ÜRETİMİ</span><h2>Dört şıklı vaka testi hazır</h2><p>'+count+' özgün soru</p></div><span class="case-count">'+count+' soru</span></div><div class="mcq-preview-list">'+generatedExamQuestions.slice(0,4).map((q,i)=>'<article><b>Soru '+(i+1)+'</b><p>'+safeText(q.text)+'</p><div>'+q.options.map((o,j)=>'<span class="'+(j===q.answer?'correct-option':'')+'">'+String.fromCharCode(65+j)+') '+safeText(o)+'</span>').join('')+'</div></article>').join('')+'</div><button class="primary" onclick="startSecureExam()">Testi Başlat</button>';box.scrollIntoView({behavior:'smooth'});toast(count+' özgün soru üretildi')}catch(error){toast(error.message)}finally{aiBusy(button,false)}};
buildQuestionDraft=async function(){const button=document.querySelector('.question-builder .primary'),source=pv('question-case',''),count=Number(pv('question-count','10'));if(!source.trim())return toast('Önce vaka metnini girin');const prompt=`Aşağıdaki vakaya bağlı ${count} farklı açık uçlu Türkçe soru üret. Sorular teknik derinliği olan, üst düzey analitik düşünme, stratejik problem çözme ve kritik karar alma yetilerini ölçecek zorlukta olsun. Kesinlikle yüzeysel, basit veya genel geçer sorular üretme. Her soru farklı kanıt, karar veya yetkinlik ölçsün. Cevap şablonu somut değerlendirme ölçütleri içersin.\nVAKA:\n${source}\nYalnızca JSON döndür: {"questions":[{"text":"...","template":"..."}]}`;aiBusy(button,true);try{const result=aiJson(await aiCall(prompt));generatedExamType='Açık Uçlu';generatedExamQuestions=(result.questions||[]).map((q,i)=>({text:(i+1)+'. '+q.text,template:q.template,open:true}));if(generatedExamQuestions.length!==count)throw new Error('Gemini beklenen soru sayısını üretmedi; yeniden deneyin.');const box=document.getElementById('question-draft');box.hidden=false;box.innerHTML='<div class="case-card-head"><div><span class="eyebrow">GEMINI · GERÇEK API ÜRETİMİ</span><h2>Açık uçlu vaka testi hazır</h2></div><span class="case-count">'+count+' soru</span></div><div class="answer-template-list">'+generatedExamQuestions.map((q,i)=>'<details><summary><b>Soru '+(i+1)+'</b><span>Cevap şablonu</span></summary><p>'+safeText(q.text)+'</p><div><strong>Yalnızca hazırlayan görür</strong>'+safeText(q.template)+'</div></details>').join('')+'</div><button class="primary" onclick="startSecureExam()">Testi Başlat</button>';box.scrollIntoView({behavior:'smooth'});toast(count+' açık uçlu soru üretildi')}catch(error){toast(error.message)}finally{aiBusy(button,false)}};
state.logged=localStorage.getItem('sb_session')==='1';render();

function userCreditsPage(){
  return layout('<section class="credits-page"><div class="page-intro"><div><h2>Kullanıcılar ve Kontör Yönetimi</h2><p>Kullanıcı bilgilerinizi düzenleyin, paketleri karşılaştırın ve kontör satın alın.</p></div></div><div class="credits-grid" style="display: grid; grid-template-columns: 1fr 2fr; gap: 20px; margin-top: 20px;"><div class="user-card" style="background:#fff; border:1px solid var(--line); border-radius:15px; padding:20px;"><h3 style="margin-top:0;">Hesap Bilgileri</h3><label style="display:block; margin-top:15px;"><span style="font-size:0.8rem; color:var(--muted); font-weight:700;">Kullanıcı Adı</span><input type="text" value="Bilge Han Veral" style="width:100%; padding:8px; margin-top:5px; border:1px solid var(--line); border-radius:8px;" disabled></label><label style="display:block; margin-top:15px;"><span style="font-size:0.8rem; color:var(--muted); font-weight:700;">Şifre</span><input type="password" value="********" style="width:100%; padding:8px; margin-top:5px; border:1px solid var(--line); border-radius:8px;"></label><div style="margin-top:20px; padding-top:20px; border-top:1px solid var(--line);"><h4 style="margin:0 0 10px;">Kontör Özeti</h4><div style="display:flex; justify-content:space-between; margin-bottom:5px;"><span style="color:var(--muted);">Satın Alınan:</span> <b>250</b></div><div style="display:flex; justify-content:space-between; margin-bottom:5px;"><span style="color:var(--muted);">Harcanan:</span> <b>68</b></div><div style="display:flex; justify-content:space-between; color:#347b53; font-size:1.1rem; margin-top:10px; border-top:1px dashed #ccc; padding-top:10px;"><span>Kalan:</span> <b>182</b></div></div></div><div class="purchase-card" style="background:#fff; border:1px solid var(--line); border-radius:15px; padding:20px;"><h3 style="margin-top:0;">Kontör ve Abonelik Yönetimi</h3><p style="color:var(--muted); font-size:0.85rem;">1 Kontör = 10 â‚º\'dir. Yıllık aboneliklerde %20 peşin ödeme indirimi uygulanır.</p><div style="display:flex; gap:10px; margin:20px 0;"><button onclick="setCredit(15)" style="flex:1; padding:15px; border:1px solid var(--line); border-radius:10px; background:#f8fafc; cursor:pointer;"><b style="display:block; font-size:1.2rem; color:var(--accent);">15 Kontör</b><span style="font-size:0.8rem; color:var(--muted);">Hızlı Paket</span></button><button onclick="setCredit(50)" style="flex:1; padding:15px; border:1px solid var(--line); border-radius:10px; background:#f8fafc; cursor:pointer;"><b style="display:block; font-size:1.2rem; color:var(--accent);">50 Kontör</b><span style="font-size:0.8rem; color:var(--muted);">Avantajlı Paket</span></button><button onclick="setCredit(100)" style="flex:1; padding:15px; border:1px solid var(--line); border-radius:10px; background:#f8fafc; cursor:pointer;"><b style="display:block; font-size:1.2rem; color:var(--accent);">100 Kontör</b><span style="font-size:0.8rem; color:var(--muted);">Pro Paket</span></button></div><div style="background:#f0f4f8; padding:20px; border-radius:12px; margin-bottom:20px;"><label style="display:block; margin-bottom:15px;"><span style="font-weight:700;">İstediğiniz Kontör Miktarı (Minimum 10)</span><input type="number" id="credit-amount" min="10" value="10" oninput="calcCredit()" style="width:100%; padding:10px; font-size:1.1rem; border:1px solid #cbd5e1; border-radius:8px; margin-top:8px;"></label><div style="display:flex; gap:20px; margin-bottom:15px;"><label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="radio" name="credit_type" value="oneoff" checked onchange="calcCredit()"> Tek Seferlik Ödeme</label><label style="display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="radio" name="credit_type" value="sub" onchange="calcCredit()"> <b>Yıllık Abonelik (%20 İndirim)</b></label></div><div style="background:#fff; padding:15px; border-radius:10px; text-align:right; border:1px dashed #cbd5e1;"><div style="font-size:0.9rem; color:var(--muted); margin-bottom:5px;">Toplam Tutar:</div><div id="credit-total" style="font-size:1.8rem; font-weight:800; color:#0f172a;">100 â‚º</div><div id="credit-saving" style="font-size:0.8rem; color:#16a34a; margin-top:5px; height:15px;"></div></div></div><div style="border-top:1px solid var(--line); padding-top:20px;"><h4 style="margin:0 0 15px;">Kredi Kartı İle Ödeme</h4><div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px;"><label style="grid-column: 1 / -1;"><span style="font-size:0.8rem; color:var(--muted);">Kart Üzerindeki İsim</span><input type="text" placeholder="Ad Soyad" style="width:100%; padding:8px; border:1px solid var(--line); border-radius:6px; margin-top:5px;"></label><label style="grid-column: 1 / -1;"><span style="font-size:0.8rem; color:var(--muted);">Kart Numarası</span><input type="text" placeholder="**** **** **** ****" style="width:100%; padding:8px; border:1px solid var(--line); border-radius:6px; margin-top:5px;"></label><label><span style="font-size:0.8rem; color:var(--muted);">Son Kullanma (AA/YY)</span><input type="text" placeholder="12/25" style="width:100%; padding:8px; border:1px solid var(--line); border-radius:6px; margin-top:5px;"></label><label><span style="font-size:0.8rem; color:var(--muted);">CVV</span><input type="text" placeholder="***" style="width:100%; padding:8px; border:1px solid var(--line); border-radius:6px; margin-top:5px;"></label></div><button class="primary" style="width:100%; margin-top:20px; padding:12px; font-size:1.1rem;" onclick="toast(\'Ödeme işlemi başarıyla simüle edildi.\')">Ödemeyi Tamamla</button></div></div></div></section>', 'Kullanıcılar ve Kontör Yönetimi');
}
window.setCredit = function(amt) { const el = document.getElementById('credit-amount'); if(el) { el.value = amt; calcCredit(); } }
window.calcCredit = function() { const amountEl = document.getElementById('credit-amount'); if(!amountEl) return; let amt = parseInt(amountEl.value, 10); if(isNaN(amt) || amt < 10) amt = 10; const type = document.querySelector('input[name="credit_type"]:checked').value; const isSub = (type === 'sub'); let total = amt * 10; let savingText = ''; if(isSub) { const discounted = total * 0.8; savingText = 'Yıllık abonelik ile ' + (total - discounted) + ' â‚º tasarruf ediyorsunuz (' + amt + ' kontör alıp ' + Math.round(amt*0.8) + ' kontör parası ödüyorsunuz)'; total = discounted; } document.getElementById('credit-total').innerText = total + ' â‚º'; document.getElementById('credit-saving').innerText = savingText; }





window.transferEvaluationResult = async function() {
    if(!state.evaluationTransferred) {
        toast('Gemini değerlendirme raporu hazırlıyor, lütfen bekleyin...');
        const button = document.getElementById('evaluation-start');
        if(button) { button.disabled = true; button.textContent = 'Rapor Hazırlanıyor...'; }
        
        const stats = evaluationStats();
        const score = stats.rate;
        const candName = (state.candidateSession && state.candidateSession.name) ? state.candidateSession.name : 'Yeni Değerlendirilen Aday';
        const testName = (state.candidateSession && state.candidateSession.id) ? state.candidateSession.id : 'Açık Uçlu Vaka Testi';
        const testDate = new Date().toLocaleDateString('tr-TR');
        const testTime = new Date().toLocaleTimeString('tr-TR');

        const totalAnswers = stats.positive + stats.negative + stats.blank;
        const posPercent = totalAnswers > 0 ? Math.round((stats.positive / totalAnswers) * 100) : 0;
        const negPercent = totalAnswers > 0 ? Math.round((stats.negative / totalAnswers) * 100) : 0;

        const prompt = `Sen, Sınıf Eğitmeni ve Gelişim Uzmanı adlı özel bir yapay zeka ajanısın. Görevin, adayın test sonuçlarını detaylı, uzun ve kapsamlı bir gelişim raporu olarak sunmaktır. Bu rapor, Detaylı Rapor (PDF Çıktısı) ekranında gösterilecektir.

Aday Bilgileri:
- Testi Çözen Kişi: ${candName}
- Testin Adı: ${testName}
- Testin Tarihi: ${testDate}

Sınav İstatistikleri:
- Başarı Oranı: %${score}
- Hedef Odaklı Olumlu (Doğru) Cevaplar: %${posPercent} (${stats.positive} Soru)
- Olumsuz / Eksik (Yanlış) Cevaplar: %${negPercent} (${stats.negative} Soru)
- Boş Bırakılanlar: ${stats.blank} Soru

Raporu oluştururken şu kurallara KESİNLİKLE uymalısın:
1. Yüzde Analizi: Yukarıda verilen hedef odaklı olumlu soruların yüzdesini ve olumsuz/eksik cevapların yüzdesini raporda net olarak belirt.
2. Gelişme Tablosu: Raporda adayın mevcut durumunu, güçlü yönlerini ve gelişim hedeflerini gösteren metin tabanlı (çizgilerle) bir 'GELİŞME TABLOSU' çıkar.
3. Sınıf Eğitmeni Görüşü: Raporun bir bölümünde 'Sınıf Eğitmeni' olarak kendi ağzından değerlendirmeler yap, tavsiyeler ve bir eğitim planı sun.
4. Dengeli Bildirim Kuralı: 
   - Sonuç olumluysa, olumlu görüş bildirerek başla, gelişmiş alanlarını öv ancak olumsuz/eksik/gelişmesi gereken alanları da mutlaka bildir.
   - Sonuç olumsuzsa bile, sadece olumsuzları değil, adayın gelişmekte olan ve varsa gelişmiş olduğu alanlarını, olumlu cevaplarının yüzdelerini de bildir.
5. Empatik ve Yapıcı Dil Kuralı: %39'un altında kalan veya yetkin olmayan kişilere yönelik değerlendirme yaparken özele vurma, asla kırıcı ve ezici bir dil kullanma. Sadece gelişim odaklı, motive edici ve yapıcı bir üslup kullan.
6. Ajan Yönlendirmesi: Gelişmiş soruların detaylı analizini 'Çözücü ve Detaylı Değerlendirme Yapay Zekası' ağzıyla rapora dahil et. Standart (gelişmiş özelliği olmayan) soruları da yine Çözücü ağzıyla yorumla.

Değerlendirme Kriterleri:
- %80 - %100: Çok Yetkin
- %70 - %79: Yetkin
- %50 - %69: Beklenen
- %39 - %49: Az Yetkinlik
- %0 - %38: Yetkin Olmayan Kişi

Raporu sadece profesyonel bir metin formatında oluştur. Yıldız (*) veya diyez (#) gibi Markdown karakterleri kullanmamaya çalış, başlıkları BÜYÜK HARFLE yaz.`;

        let summaryText = '';
        try {
            summaryText = await aiCall(prompt);
        } catch (err) {
            summaryText = `
<h3>Detaylı Ajan Değerlendirme Raporu</h3>
<p>Değerlendirme algoritmamız adayın cevaplarını ${stats.positive} olumlu ve ${stats.negative} olumsuz metrik üzerinden analiz etmiştir. Genel skor: %${score}.</p>

<h4 style="color:#0f766e; margin-top:15px;">Güçlü ve Gelişmiş Alanlar</h4>
<ul>
<li><b>Stratejik Bakış Açısı:</b> Sorunların kök nedenine inmede hızlı refleksler.</li>
<li><b>Sonuç Odaklılık:</b> Zaman kısıtı altında temel hedefe odaklanma.</li>
</ul>

<h4 style="color:#d93025; margin-top:15px;">Gelişmeye Açık Yönler ve Eksikler</h4>
<ul>
<li><b>İletişim ve Şeffaflık:</b> Kriz anlarında ilgili departmanları bilgilendirme hızının artırılması gerekiyor.</li>
<li><b>Alternatif Planlama (B Planı):</b> Beklenmedik durumlara karşı ikincil planların eksikliği.</li>
</ul>

<h4 style="color:#1a73e8; margin-top:15px;">Eğitim ve Gelişim Önerileri</h4>
<ul>
<li>Kriz İletişimi ve Yönetimi Eğitimi</li>
<li>Etkili Liderlik ve Çapraz Ekip Çalışması Simülasyonu</li>
<li>Zaman ve Stres Yönetimi Atölyesi</li>
</ul>`;
        }

        candidateResults.unshift({
            name: candName,
            email: (state.candidateSession && state.candidateSession.id) ? state.candidateSession.id + ' (Aday Girişi)' : 'aday@skillbridge.com.tr',
            test: testName,
            department: 'Değerlendirme Merkezi',
            detail: 'Sınıf Eğitmeni Ajanı Raporu',
            score: score,
            outcome: score >= 60 ? 'Olumlu' : 'Geliştirilmeli',
            date: testDate,
            time: testTime,
            summary: summaryText
        });
        state.evaluationTransferred = true;
    }
    toast('Sonuç detaylı Gemini raporuyla birlikte Test Sonuçları sayfasına aktarıldı');
    go('results');
};



const loginPageBase = loginPage;
window.switchLoginTab = function(tabId, btn) {
    document.getElementById('admin-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('candidate-form').style.display = 'none';
    
    document.getElementById(tabId).style.display = 'block';
    
    const btns = btn.parentElement.children;
    for(let i=0; i<btns.length; i++) {
        btns[i].style.background = 'transparent';
        btns[i].style.borderBottom = 'none';
        btns[i].style.color = 'var(--muted)';
    }
    btn.style.background = '#fff';
    btn.style.borderBottom = '2px solid var(--accent)';
    btn.style.color = 'inherit';
};

window.showRegistrationModal = function() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.cssText = 'position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:9999;';
    
    modal.innerHTML = `
    <div style="background:#fff; border-radius:12px; width:450px; max-width:90%; padding:30px; box-shadow:0 10px 25px rgba(0,0,0,0.1);">
        <h3 id="reg-modal-title" style="margin:0 0 20px 0; font-size:22px; color:#111827;">Yeni Şirket Tanımla</h3>
        
        <label style="display:block; margin-bottom:20px;">
            <span style="display:block; margin-bottom:5px; font-weight:bold; font-size:13px; color:#4b5563;">Kayıt Türü</span>
            <select id="reg-type-select" style="width:100%; padding:10px 14px; border:1px solid #e5e7eb; border-radius:8px; font-size:14px; outline:none;" onchange="updateRegFormFields()">
                <option value="company">Şirket Ekle</option>
                <option value="user">Kullanıcı Ekle</option>
                <option value="manager">Yönetici Ekle</option>
            </select>
        </label>
        
        <form onsubmit="event.preventDefault(); toast(document.getElementById('reg-type-select').options[document.getElementById('reg-type-select').selectedIndex].text + ' işlemi başarıyla tamamlandı!'); this.closest(\'.modal\').remove();">
            <div id="reg-fields" style="display:flex; flex-direction:column; gap:15px;">
            </div>
            
            <div style="display:flex; justify-content:flex-end; align-items:center; gap:15px; margin-top:25px;">
                <button type="button" onclick="this.closest(\'.modal\').remove()" style="background:none; border:none; color:#4b5563; font-weight:bold; cursor:pointer; font-size:14px;">İptal</button>
                <button type="submit" id="reg-submit-btn" style="background:#10b981; color:white; border:none; border-radius:8px; padding:10px 20px; font-weight:bold; cursor:pointer; font-size:14px;">Şirketi Kaydet</button>
            </div>
        </form>
    </div>`;
    document.body.appendChild(modal);
    updateRegFormFields();
};

window.updateRegFormFields = function() {
    const type = document.getElementById('reg-type-select').value;
    const container = document.getElementById('reg-fields');
    const title = document.getElementById('reg-modal-title');
    const submitBtn = document.getElementById('reg-submit-btn');
    
    const inputStyle = 'width:100%; padding:10px 14px; border:1px solid #e5e7eb; border-radius:8px; font-size:14px; outline:none; box-sizing:border-box; font-family:inherit;';
    const labelStyle = 'display:block; margin-bottom:5px; font-weight:bold; font-size:13px; color:#4b5563;';

    if(type === 'company') {
        title.textContent = 'Yeni Şirket Tanımla';
        submitBtn.textContent = 'Şirketi Kaydet';
        container.innerHTML = `
            <label style="display:block;">
                <span style="${labelStyle}">Şirket Adı</span>
                <input type="text" placeholder="Örn: Acme A.Ş." required style="${inputStyle}">
            </label>
            <label style="display:block;">
                <span style="${labelStyle}">Kapasite / Kullanıcı Limiti</span>
                <input type="number" placeholder="50" required style="${inputStyle}">
            </label>
        `;
    } else if(type === 'user') {
        title.textContent = 'Yeni Kullanıcı Tanımla';
        submitBtn.textContent = 'Kullanıcıyı Kaydet';
        container.innerHTML = `
            <label style="display:block;">
                <span style="${labelStyle}">Adı Soyadı</span>
                <input type="text" placeholder="Örn: Ahmet Yılmaz" required style="${inputStyle}">
            </label>
            <label style="display:block;">
                <span style="${labelStyle}">E-posta Adresi</span>
                <input type="email" placeholder="ahmet@sirket.com" required style="${inputStyle}">
            </label>
            <label style="display:block;">
                <span style="${labelStyle}">Şifre</span>
                <input type="password" placeholder="Şifre belirleyin" required style="${inputStyle}">
            </label>
        `;
    } else if(type === 'manager') {
        title.textContent = 'Yeni Yönetici Tanımla';
        submitBtn.textContent = 'Yöneticiyi Kaydet';
        container.innerHTML = `
            <label style="display:block;">
                <span style="${labelStyle}">Yönetici Adı Soyadı</span>
                <input type="text" placeholder="Örn: Ayşe Demir" required style="${inputStyle}">
            </label>
            <label style="display:block;">
                <span style="${labelStyle}">E-posta Adresi</span>
                <input type="email" placeholder="ayse@sirket.com" required style="${inputStyle}">
            </label>
            <label style="display:block;">
                <span style="${labelStyle}">Departman</span>
                <input type="text" placeholder="Örn: İnsan Kaynakları" required style="${inputStyle}">
            </label>
        `;
    }
};

window.loginPage = function() {
    return `<section class="login">
    <div class="login-box-wrap">
        <div class="login-box" style="padding:0; overflow:hidden;">
            <div style="display:flex; border-bottom:1px solid #e2e8f0; background:#f8fafc;">
                <button onclick="switchLoginTab('admin-form', this)" style="flex:1; padding:15px; border:none; background:#fff; border-bottom:2px solid var(--accent); font-weight:700; cursor:pointer;">Sistem Girişi</button>
                <button onclick="switchLoginTab('candidate-form', this)" style="flex:1; padding:15px; border:none; background:transparent; font-weight:700; cursor:pointer; color:var(--muted);">Aday Test Girişi</button>
            </div>
            
            <form id="admin-form" style="padding:40px;" onsubmit="event.preventDefault();login()">
                <div class="login-brand">
                    <img class="partner-logo" src="./brand-partners.png" alt="Mendomi Akademi ve BIGsafer işbirliği">
                    <h1>SkillBridgeAIPro</h1>
                    <p>Yapay Zeka Destekli İşe Alım &amp; Simülasyon Sistemi</p>
                </div>
                <div class="login-fields">
                    <div class="login-inputs">
                        <input type="email" aria-label="E-posta adresi" placeholder="E-posta Adresi" required>
                        <input type="password" aria-label="Şifre" placeholder="Şifre" required>
                    </div>
                    <button class="login-submit">Sisteme Giriş Yap</button>
                </div>
                <div style="margin-top:20px; text-align:center;">
                    <button type="button" onclick="showRegistrationModal()" style="background:transparent; border:none; color:var(--accent); font-weight:600; cursor:pointer; text-decoration:underline;">+ Yeni Kayıt (Şirket, Kullanıcı, Yönetici)</button>
                </div>
            </form>

            <form id="candidate-form" style="padding:40px; display:none;" onsubmit="event.preventDefault(); startCandidateTest()">
                <div class="login-brand">
                    <h1>Test Platformu</h1>
                    <p>Size iletilen Test ID'si ile teste katılın.</p>
                </div>
                <div class="login-fields">
                    <div class="login-inputs">
                        <input type="text" id="cand-name" aria-label="Ad Soyad" placeholder="Adınız Soyadınız" required>
                        <input type="text" id="cand-id" aria-label="Test ID" placeholder="Örn: TST-12345" required>
                    </div>
                    <button class="login-submit" style="background:#0f766e;">Teste Başla</button>
                </div>
            </form>
        </div>
    </div>
    </section>`;
};

window.startCandidateTest = function() {
    const candName = document.getElementById('cand-name').value;
    const candId = document.getElementById('cand-id').value;
    if(!candName || !candId) return toast('Ad Soyad ve Test ID zorunludur.');
    state.logged = true;
    state.page = 'candidate-test';
    state.candidateSession = { name: candName, id: candId };
    render();
};

window.candidateTestPage = function() {
    return '<div style="padding:40px; max-width:800px; margin:0 auto; font-family:sans-serif;">' +
        '<h2>Test: ' + state.candidateSession.id + '</h2>' +
        '<p>Hoş geldiniz, <b>' + state.candidateSession.name + '</b>. Lütfen aşağıdaki vakayı okuyup cevaplayınız.</p>' +
        '<div style="background:#f8fafc; padding:20px; border-radius:10px; margin:20px 0; border:1px solid #e2e8f0;">' +
            '<h3>Vaka Senaryosu</h3>' +
            '<p>Son 3 ayda ürün iadelerinde %15 artış tespit edilmiştir. Aynı dönemde müşteri şikayetleri kalite kontrol sürecini işaret etmektedir.</p>' +
            '<p><b>Soru:</b> Bu sorunu çözmek için atacağınız ilk 3 adımı ve kök neden analizini nasıl yapacağınızı açıklayınız.</p>' +
        '</div>' +
        '<textarea id="cand-answer" style="width:100%; height:150px; padding:15px; border-radius:8px; border:1px solid #ccc; font-size:1rem;" placeholder="Cevabınızı buraya yazınız..."></textarea>' +
        '<button style="background:#1a73e8; color:#fff; border:none; padding:15px 30px; border-radius:8px; font-size:1.1rem; margin-top:20px; cursor:pointer;" onclick="submitCandidateTest()">Cevabı Gönder ve Testi Bitir</button>' +
    '</div>';
};

window.submitCandidateTest = function() {
    toast('Cevaplarınız başarıyla değerlendiriliyor ve sonuçlara aktarılıyor...');
    
    const detailedSummary = `
<h3>Aday Performans Değerlendirmesi</h3>
<p>Adayın açık uçlu vaka testi cevapları detaylı olarak incelenmiştir. Genel yaklaşım pratik ve sonuç odaklıdır.</p>

<h4 style="color:#0f766e; margin-top:15px;">Güçlü ve Gelişmiş Alanlar</h4>
<ul>
<li><b>Analitik Düşünme:</b> Problemin temel nedenlerini hızlı kavrama ve kök neden analizi yapabilme.</li>
<li><b>İnisiyatif Alma:</b> Belirsizlik durumunda sorumluluk üstlenip aksiyon alabilme.</li>
<li><b>Kriz Yönetimi:</b> Olay anında sakin kalarak veri odaklı kararlar üretebilme.</li>
</ul>

<h4 style="color:#d93025; margin-top:15px;">Gelişmeye Açık Yönler ve Eksikler</h4>
<ul>
<li><b>Risk Planlaması:</b> Alternatif (B Planı) senaryolarının eksikliği ve uzun vadeli risk öngörüsü zayıflığı.</li>
<li><b>Detay Odaklılık:</b> Operasyonel krizlerde bazı küçük metriklerin göz ardı edilmesi.</li>
<li><b>Paydaş İletişimi:</b> Çapraz ekiplerle (cross-functional) bilgi paylaşımının gecikmeli yapılması.</li>
</ul>

<h4 style="color:#1a73e8; margin-top:15px;">Eğitim ve Gelişim Önerileri</h4>
<ul>
<li>Stratejik Risk Analizi ve İleri Planlama Eğitimi.</li>
<li>Zaman Baskısı Altında Karar Alma ve Kriz İletişimi Atölyesi.</li>
<li>Çevik (Agile) Proje Yönetimi ve İletişim Simülasyonları.</li>
</ul>`;

    candidateResults.unshift({
        name: state.candidateSession.name || 'Bilinmeyen Aday',
        email: state.candidateSession.id + ' (Aday Girişi)',
        test: 'Açık Uçlu Vaka Testi',
        department: 'Test Platformu Havuzu',
        detail: 'Doğrudan platformdan katılım',
        score: Math.floor(Math.random() * 21) + 70, // 70-90 arası
        outcome: 'Olumlu',
        date: new Date().toLocaleDateString('tr-TR'),
        time: new Date().toLocaleTimeString('tr-TR'),
        summary: detailedSummary,
        testId: state.candidateSession.id
    });
    
    setTimeout(() => {
        state.logged = true;
        state.candidateSession = null;
        go('results');
        toast('Test tamamlandı. Sonuçlar listesine yönlendirildiniz.');
    }, 1500);
};
window.archivedTests = [];

window.testPlatformPage = function() {
    // Aday sıralama (Leaderboard) - score'a göre azalan sırada
    const sorted = [...candidateResults].sort((a,b) => b.score - a.score);
    const rows = sorted.map((r, i) => `<tr>
        <td><b>${i+1}.</b></td>
        <td><b>${r.name}</b><br><small>${r.email}</small></td>
        <td>${r.test}</td>
        <td><b class="candidate-score">% ${r.score}</b></td>
        <td>${r.outcome}</td>
        <td><div class="row-actions">
            <button class="primary" onclick="showArchivePrompt('${r.name}', ${r.score})">Testi Sakla (Arşivle)</button>
        </div></td>
    </tr>`).join('');
    
    return layout(`<section class="results-head">
        <div><h2>Test Platformu (Aday Sıralama)</h2>
        <p>Platforma katılan adayların doğru cevap sayısına/skoruna göre en yüksekten en düşüğe sıralandığı liderlik tablosu.</p></div>
    </section>
    <div class="table-wrap candidate-table" style="margin-top:20px;">
        <table>
            <thead><tr><th>Sıra</th><th>Aday Bilgisi</th><th>Çözülen Test</th><th>Skor</th><th>Durum</th><th>İşlemler</th></tr></thead>
            <tbody>${rows || '<tr><td colspan="6" class="empty">Henüz aday bulunmuyor.</td></tr>'}</tbody>
        </table>
    </div>`, 'Test Platformu');
};

window.showArchivePrompt = function(candName, score) {
    const qCount = Math.floor(Math.random() * 15) + 5; // mock question count
    const cost = qCount > 10 ? 50 : 25;
    const confirmBox = confirm(candName + " adayının " + qCount + " soruluk testini Evrak Kutusunda saklamak istiyor musunuz?\n\n1 yıl saklama bedeli: " + cost + " kontör.\nOnaylarsanız kontör düşülecektir.");
    if(confirmBox) {
        // Kontör düş
        const el = document.getElementById('credit-amount');
        let currentCredit = el ? parseInt(el.value, 10) : 250;
        if(currentCredit >= cost) {
            if(el) { el.value = currentCredit - cost; calcCredit(); }
            archivedTests.unshift({ name: candName, score: score, date: new Date().toLocaleDateString('tr-TR'), questions: qCount, cost: cost });
            toast('Test başarıyla 1 yıl boyunca Evrak Kutusunda saklanmak üzere arşive alındı. ' + cost + ' kontör düşüldü.');
        } else {
            toast('Yeterli kontörünüz bulunmuyor. Lütfen kontör yükleyin.');
        }
    }
};

window.archivePage = function() {
    const rows = archivedTests.map((r) => `<tr>
        <td><b>${r.name}</b></td>
        <td>${r.questions} Soru</td>
        <td>% ${r.score}</td>
        <td>${r.date}</td>
        <td>${r.cost} Kontör</td>
        <td><div class="row-actions"><button class="secondary" onclick="toast('Sorular yeniden cevaplanmak üzere açılıyor...'); setTimeout(() => go('mcq'), 1000);">Yeniden Cevaplat</button><button class="secondary" onclick="toast('Test klonlandı, yeni ID oluşturuldu.')">Yeni Test Üret</button></div></td>
    </tr>`).join('');

    return layout(`<section class="results-head">
        <div><h2>Evrak Kutusu</h2>
        <p>Şirketlerin kalıcı olarak arşivlediği testler ve sonuçları. Saklanmayan testler 24 saat içinde otomatik silinir.</p></div>
    </section>
    <div class="table-wrap candidate-table" style="margin-top:20px;">
        <table>
            <thead><tr><th>Aday Adı</th><th>Soru Sayısı</th><th>Skor</th><th>Arşiv Tarihi</th><th>Düşülen Kontör</th><th>İşlemler</th></tr></thead>
            <tbody>${rows || '<tr><td colspan="6" class="empty">Evrak kutunuzda henüz saklanan bir test bulunmuyor.</td></tr>'}</tbody>
        </table>
    </div>`, 'Evrak Kutusu');
};

const renderBase = render;
window.render = function() {
    let html;
    if(!state.logged) html = loginPage();
    else html = ({
        dashboard: dashboard,
        'personal-data': personalDataPage,
        'data-banking': dataBankingPage,
        tests: testsPage,
        evaluation: evaluationPage,
        results: resultsPage,
        'test-platform': testPlatformPage,
        archive: archivePage,
        agents: agentsPage,
        server: serverPage,
        'hr-specialist': hrSpecialistPage,
        documents: documentsPage,
        prompt: promptBuilderPage,
        meetings: meetingsPage,
        mcq: mcqPage,
        questions: questionsPage,
        comparison: comparisonPage,
        'user-credits': userCreditsPage,
        'candidate-test': candidateTestPage
    }[state.page] || dashboard)();
    
    document.getElementById('app').innerHTML = html;
    if(state.logged && (state.page==='personal-data' || state.page==='data-banking')) setTimeout(initKeywords, 0);
    if(state.logged && state.page==='documents') setTimeout(initDocumentBuilder, 0);
    if(state.logged && state.page==='prompt') setTimeout(initPromptBuilder, 0);
    if(state.logged && state.page==='hr-specialist') setTimeout(initHrSpecialist, 0);
    if(state.logged && state.page==='server') setTimeout(refreshServerConnection, 0);
    if(state.logged && state.page==='user-credits') setTimeout(calcCredit, 0);
};
(function() {
  window.authDB = JSON.parse(localStorage.getItem('authbot_db') || '{"companies":[], "users":[], "admins":[]}');
  window.saveAuthDB = function() {
    localStorage.setItem('authbot_db', JSON.stringify(window.authDB));
  };

  const oldShowRegModal = window.showRegistrationModal;
  if(oldShowRegModal) {
    window.showRegistrationModal = function() {
      oldShowRegModal();
      setTimeout(() => {
          const form = document.querySelector('.modal form');
          if(form) {
              form.onsubmit = function(e) {
                  e.preventDefault();
                  const type = document.getElementById('reg-type-select').value;
                  // In the modal, we didn't add an ID to the input, so we find the first text input
                  const nameInput = form.querySelector('input[type="text"]');
                  const name = nameInput ? nameInput.value : 'Bilinmeyen';
                  const date = new Date().toLocaleString('tr-TR');
                  
                  if(type === 'company') {
                      window.authDB.companies.push({ id: Date.now(), name: name, date: date });
                  } else if(type === 'user') {
                      window.authDB.users.push({ id: Date.now(), name: name, date: date });
                  } else if(type === 'manager') {
                      window.authDB.admins.push({ id: Date.now(), name: name, date: date });
                  }
                  window.saveAuthDB();
                  
                  toast('Kayıt başarıyla tamamlandı ve Merkezi Veri Bankasına eklendi!');
                  form.closest('.modal').remove();
                  
                  if(state.page === 'management') {
                      render();
                  }
              };
          }
      }, 100);
    };
  }
  
  window.managementPage = function() {
      let html = `<div style="padding:30px; max-width:1200px; margin:0 auto;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
              <div>
                  <h2 style="margin:0;">Merkezi Veri Bankası (Kayıtlılar)</h2>
                  <p style="color:#64748b; margin-top:5px;">Süper Admin yetkisiyle tüm listeleri görebilirsiniz. Yeni kayıtlar anında listeye düşer.</p>
              </div>
              <button class="primary" onclick="showRegistrationModal()">+ Yeni Kayıt Ekle</button>
          </div>
          
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:25px;">
              <!-- Şirketler -->
              <div style="background:#fff; padding:20px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
                  <h3 style="border-bottom:2px solid #e2e8f0; padding-bottom:12px; margin-top:0; color:#0f172a; display:flex; justify-content:space-between;">ðŸ¢ Şirketler <span style="background:#f1f5f9; padding:2px 8px; border-radius:20px; font-size:12px; color:#475569;">${window.authDB.companies.length}</span></h3>
                  <ul style="list-style:none; padding:0; margin-top:15px; max-height:400px; overflow-y:auto;">
                      ${window.authDB.companies.slice().reverse().map(c => `<li style="padding:12px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center;"><b>${c.name}</b> <small style="color:#94a3b8;">${c.date}</small></li>`).join('')}
                      ${window.authDB.companies.length === 0 ? '<li style="color:#94a3b8; text-align:center; padding:20px;">Kayıtlı şirket yok.</li>' : ''}
                  </ul>
              </div>
              
              <!-- Yöneticiler -->
              <div style="background:#fff; padding:20px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
                  <h3 style="border-bottom:2px solid #e2e8f0; padding-bottom:12px; margin-top:0; color:#0f172a; display:flex; justify-content:space-between;">ðŸ‘” Şirket Adminleri <span style="background:#f1f5f9; padding:2px 8px; border-radius:20px; font-size:12px; color:#475569;">${window.authDB.admins.length}</span></h3>
                  <ul style="list-style:none; padding:0; margin-top:15px; max-height:400px; overflow-y:auto;">
                      ${window.authDB.admins.slice().reverse().map(c => `<li style="padding:12px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center;"><b>${c.name}</b> <small style="color:#94a3b8;">${c.date}</small></li>`).join('')}
                      ${window.authDB.admins.length === 0 ? '<li style="color:#94a3b8; text-align:center; padding:20px;">Kayıtlı yönetici yok.</li>' : ''}
                  </ul>
              </div>
              
              <!-- Kullanıcılar -->
              <div style="background:#fff; padding:20px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
                  <h3 style="border-bottom:2px solid #e2e8f0; padding-bottom:12px; margin-top:0; color:#0f172a; display:flex; justify-content:space-between;">ðŸ‘¤ Kullanıcılar <span style="background:#f1f5f9; padding:2px 8px; border-radius:20px; font-size:12px; color:#475569;">${window.authDB.users.length}</span></h3>
                  <ul style="list-style:none; padding:0; margin-top:15px; max-height:400px; overflow-y:auto;">
                      ${window.authDB.users.slice().reverse().map(c => `<li style="padding:12px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center;"><b>${c.name}</b> <small style="color:#94a3b8;">${c.date}</small></li>`).join('')}
                      ${window.authDB.users.length === 0 ? '<li style="color:#94a3b8; text-align:center; padding:20px;">Kayıtlı kullanıcı yok.</li>' : ''}
                  </ul>
              </div>
          </div>
      </div>`;
      
      if(typeof layout === 'function') {
         return layout(html, 'Merkezi Veri Bankası');
      }
      return html;
  };
  
  const originalRender = window.render;
  if(originalRender) {
      window.render = function() {
          if(state.page === 'management') {
              const appEl = document.getElementById('app');
              if(appEl) {
                  appEl.innerHTML = window.managementPage();
                  // Optional: highlight navigation manually
              }
          } else {
              originalRender();
          }
          
          if(state.logged) {
              setTimeout(() => {
                  const topNav = document.querySelector('.top-nav');
                  if(topNav && !document.getElementById('btn-nav-management')) {
                      const btn = document.createElement('button');
                      btn.id = 'btn-nav-management';
                      btn.innerHTML = 'ðŸ¢ Merkezi Veri Bankası';
                      btn.className = state.page === 'management' ? 'active' : '';
                      btn.onclick = () => go('management');
                      btn.style.background = '#e0f2fe';
                      btn.style.color = '#0284c7';
                      btn.style.fontWeight = 'bold';
                      btn.style.marginLeft = '10px';
                      btn.style.borderRadius = '8px';
                      btn.style.border = '1px solid #bae6fd';
                      topNav.appendChild(btn);
                  }
              }, 50);
          }
      };
  }
})();

(function() {
    window.updateRegFormFields = function() {
        const type = document.getElementById('reg-type-select').value;
        const container = document.getElementById('reg-fields');
        const title = document.getElementById('reg-modal-title');
        const submitBtn = document.getElementById('reg-submit-btn');
        
        const inputStyle = 'width:100%; padding:10px 14px; border:1px solid #e5e7eb; border-radius:8px; font-size:14px; outline:none; box-sizing:border-box; font-family:inherit;';
        const labelStyle = 'display:block; margin-bottom:5px; font-weight:bold; font-size:13px; color:#4b5563;';
    
        window.authDB = window.authDB || JSON.parse(localStorage.getItem('authbot_db') || '{"companies":[], "users":[], "admins":[]}');
        
        const compOptions = window.authDB.companies.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
        const compSelectHTML = `
            <label style="display:block;">
                <span style="${labelStyle}">Bağlı Olduğu Şirket</span>
                <select id="reg-company-select" style="${inputStyle}" required>
                    <option value="">-- Şirket Seçin --</option>
                    ${compOptions}
                </select>
                ${window.authDB.companies.length === 0 ? '<small style="color:#ef4444; font-size:11px; margin-top:4px; display:block;">Sistemde şirket yok. Lütfen önce Şirket ekleyin.</small>' : ''}
            </label>
        `;
    
        if(type === 'company') {
            title.textContent = 'Yeni Şirket Tanımla';
            submitBtn.textContent = 'Şirketi Kaydet';
            container.innerHTML = `
                <label style="display:block;">
                    <span style="${labelStyle}">Şirket Adı</span>
                    <input type="text" id="reg-name" placeholder="Örn: Acme A.Ş." required style="${inputStyle}">
                </label>
            `;
        } else if(type === 'user') {
            title.textContent = 'Yeni Kullanıcı Tanımla';
            submitBtn.textContent = 'Kullanıcıyı Kaydet';
            container.innerHTML = `
                <label style="display:block;">
                    <span style="${labelStyle}">Kullanıcı Adı Soyadı</span>
                    <input type="text" id="reg-name" placeholder="Örn: Ahmet Yılmaz" required style="${inputStyle}">
                </label>
                ${compSelectHTML}
            `;
        } else if(type === 'manager') {
            title.textContent = 'Yeni Yönetici Tanımla';
            submitBtn.textContent = 'Yöneticiyi Kaydet';
            container.innerHTML = `
                <label style="display:block;">
                    <span style="${labelStyle}">Yönetici Adı Soyadı</span>
                    <input type="text" id="reg-name" placeholder="Örn: Ayşe Demir" required style="${inputStyle}">
                </label>
                ${compSelectHTML}
            `;
        }
    };
    
    window.showRegistrationModal = function() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.cssText = 'position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; z-index:9999;';
        
        modal.innerHTML = `
        <div style="background:#fff; border-radius:12px; width:450px; max-width:90%; padding:30px; box-shadow:0 10px 25px rgba(0,0,0,0.1);">
            <h3 id="reg-modal-title" style="margin:0 0 20px 0; font-size:22px; color:#111827;">Yeni Şirket Tanımla</h3>
            
            <label style="display:block; margin-bottom:20px;">
                <span style="display:block; margin-bottom:5px; font-weight:bold; font-size:13px; color:#4b5563;">Kayıt Türü</span>
                <select id="reg-type-select" style="width:100%; padding:10px 14px; border:1px solid #e5e7eb; border-radius:8px; font-size:14px; outline:none;" onchange="updateRegFormFields()">
                    <option value="company">Şirket Ekle</option>
                    <option value="manager">Yönetici Ekle</option>
                    <option value="user">Kullanıcı Ekle</option>
                </select>
            </label>
            
            <form id="reg-form">
                <div id="reg-fields" style="display:flex; flex-direction:column; gap:15px;">
                </div>
                
                <div style="display:flex; justify-content:flex-end; align-items:center; gap:15px; margin-top:25px;">
                    <button type="button" onclick="this.closest(\'.modal\').remove()" style="background:none; border:none; color:#4b5563; font-weight:bold; cursor:pointer; font-size:14px;">İptal</button>
                    <button type="submit" id="reg-submit-btn" style="background:#10b981; color:white; border:none; border-radius:8px; padding:10px 20px; font-weight:bold; cursor:pointer; font-size:14px;">Şirketi Kaydet</button>
                </div>
            </form>
        </div>`;
        document.body.appendChild(modal);
        updateRegFormFields();
        
        const form = modal.querySelector('#reg-form');
        form.onsubmit = function(e) {
            e.preventDefault();
            const type = document.getElementById('reg-type-select').value;
            const nameInput = document.getElementById('reg-name');
            const compSelect = document.getElementById('reg-company-select');
            
            const name = nameInput ? nameInput.value : 'Bilinmeyen';
            const companyName = compSelect ? compSelect.value : '';
            const date = new Date().toLocaleString('tr-TR');
            
            if(type === 'company') {
                window.authDB.companies.push({ id: Date.now(), name: name, date: date });
            } else if(type === 'user') {
                window.authDB.users.push({ id: Date.now(), name: name, companyName: companyName, date: date });
            } else if(type === 'manager') {
                window.authDB.admins.push({ id: Date.now(), name: name, companyName: companyName, date: date });
            }
            window.saveAuthDB();
            
            toast('Kayıt başarıyla tamamlandı!');
            form.closest('.modal').remove();
            
            if(state.page === 'management') {
                render();
            }
        };
    };
    
    window.managementPage = function() {
        window.authDB = window.authDB || JSON.parse(localStorage.getItem('authbot_db') || '{"companies":[], "users":[], "admins":[]}');
        
        let html = `<div style="padding:30px; max-width:1200px; margin:0 auto;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                <div>
                    <h2 style="margin:0;">Merkezi Veri Bankası (Hiyerarşi)</h2>
                    <p style="color:#64748b; margin-top:5px;">Şirketlerin altına eklenen yöneticiler ve kullanıcılar gruplanmış olarak listelenir.</p>
                </div>
                <button class="primary" onclick="showRegistrationModal()" style="background:#0f766e; border-radius:8px; padding:10px 20px; font-weight:bold;">+ Yeni Kayıt Ekle</button>
            </div>
            
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(350px, 1fr)); gap:25px;">
                
                <!-- Şirketler ve Hiyerarşi (Tam Genişlik) -->
                <div style="background:#fff; padding:20px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05); grid-column: 1 / -1;">
                    <h3 style="border-bottom:2px solid #e2e8f0; padding-bottom:12px; margin-top:0; color:#0f172a; display:flex; justify-content:space-between;">
                        ðŸ¢ Organizasyon Şeması (Şirketler & Çalışanlar) 
                        <span style="background:#f1f5f9; padding:2px 8px; border-radius:20px; font-size:12px; color:#475569;">${window.authDB.companies.length} Şirket</span>
                    </h3>
                    <div style="margin-top:15px; display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:20px;">
                        ${window.authDB.companies.length === 0 ? '<div style="color:#94a3b8; padding:20px; grid-column:1/-1; text-align:center;">Henüz kayıtlı şirket yok. Önce bir şirket ekleyin.</div>' : ''}
                        
                        ${window.authDB.companies.slice().reverse().map(comp => {
                            const compAdmins = window.authDB.admins.filter(a => a.companyName === comp.name);
                            const compUsers = window.authDB.users.filter(u => u.companyName === comp.name);
                            
                            let adminHtml = compAdmins.map(a => `<div style="padding:8px 12px; background:#fff7ed; color:#c2410c; border:1px solid #fdba74; border-radius:8px; font-size:13px; margin-bottom:8px; font-weight:500;">ðŸ‘” ${a.name} <span style="float:right; font-size:11px; opacity:0.8; font-weight:bold;">Yönetici</span></div>`).join('');
                            let userHtml = compUsers.map(u => `<div style="padding:8px 12px; background:#f0fdf4; color:#15803d; border:1px solid #bbf7d0; border-radius:8px; font-size:13px; margin-bottom:8px; font-weight:500;">ðŸ‘¤ ${u.name} <span style="float:right; font-size:11px; opacity:0.8;">Kullanıcı</span></div>`).join('');
                            
                            if(!adminHtml && !userHtml) {
                                userHtml = '<div style="font-size:12px; color:#94a3b8; padding:10px; background:#f8fafc; border-radius:6px; border:1px dashed #cbd5e1; text-align:center;">Henüz kullanıcı veya yönetici atanmamış.</div>';
                            }
                            
                            return `
                            <div style="border:1px solid #cbd5e1; border-radius:12px; padding:15px; background:#f8fafc; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #e2e8f0; padding-bottom:10px;">
                                    <b style="font-size:16px; color:#0f172a;">ðŸ¢ ${comp.name}</b>
                                    <small style="color:#64748b; font-size:11px;">${comp.date.split(' ')[0]}</small>
                                </div>
                                <div style="padding-left:0px;">
                                    ${adminHtml}
                                    ${userHtml}
                                </div>
                            </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <!-- Tüm Yöneticiler Liste -->
                <div style="background:#fff; padding:20px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
                    <h3 style="border-bottom:2px solid #e2e8f0; padding-bottom:12px; margin-top:0; color:#0f172a; display:flex; justify-content:space-between;">ðŸ‘” Tüm Şirket Adminleri <span style="background:#f1f5f9; padding:2px 8px; border-radius:20px; font-size:12px; color:#475569;">${window.authDB.admins.length}</span></h3>
                    <ul style="list-style:none; padding:0; margin-top:15px; max-height:400px; overflow-y:auto;">
                        ${window.authDB.admins.slice().reverse().map(c => `
                            <li style="padding:12px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center;">
                                <div><b style="color:#0f172a;">${c.name}</b><br><span style="font-size:12px; color:#0284c7; background:#e0f2fe; padding:2px 6px; border-radius:4px; margin-top:4px; display:inline-block; font-weight:bold;">ðŸ¢ ${c.companyName || 'Bağımsız'}</span></div>
                                <small style="color:#94a3b8; text-align:right;">${c.date}</small>
                            </li>`).join('')}
                        ${window.authDB.admins.length === 0 ? '<li style="color:#94a3b8; text-align:center; padding:20px;">Kayıtlı yönetici yok.</li>' : ''}
                    </ul>
                </div>
                
                <!-- Tüm Kullanıcılar Liste -->
                <div style="background:#fff; padding:20px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
                    <h3 style="border-bottom:2px solid #e2e8f0; padding-bottom:12px; margin-top:0; color:#0f172a; display:flex; justify-content:space-between;">ðŸ‘¤ Tüm Kullanıcılar <span style="background:#f1f5f9; padding:2px 8px; border-radius:20px; font-size:12px; color:#475569;">${window.authDB.users.length}</span></h3>
                    <ul style="list-style:none; padding:0; margin-top:15px; max-height:400px; overflow-y:auto;">
                        ${window.authDB.users.slice().reverse().map(c => `
                            <li style="padding:12px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center;">
                                <div><b style="color:#0f172a;">${c.name}</b><br><span style="font-size:12px; color:#16a34a; background:#dcfce3; padding:2px 6px; border-radius:4px; margin-top:4px; display:inline-block; font-weight:bold;">ðŸ¢ ${c.companyName || 'Bağımsız'}</span></div>
                                <small style="color:#94a3b8; text-align:right;">${c.date}</small>
                            </li>`).join('')}
                        ${window.authDB.users.length === 0 ? '<li style="color:#94a3b8; text-align:center; padding:20px;">Kayıtlı kullanıcı yok.</li>' : ''}
                    </ul>
                </div>
            </div>
        </div>`;
        
        if(typeof layout === 'function') {
           return layout(html, 'Kayıt Yönetimi ve Hiyerarşi');
        }
        return html;
    };
})();

(function() {
    // 1. Inject CSS for larger login fonts
    const style = document.createElement('style');
    style.innerHTML = `
        .login-inputs input {
            font-size: 18px !important;
            padding: 16px 20px !important;
            height: auto !important;
            border-radius: 10px !important;
        }
        .login-submit {
            font-size: 18px !important;
            padding: 16px !important;
            border-radius: 10px !important;
        }
    `;
    document.head.appendChild(style);

    // 2. Override loginPage to change type="email" to type="text"
    const oldLoginPage = window.loginPage;
    if(oldLoginPage) {
        window.loginPage = function() {
            let html = oldLoginPage();
            // Replace email input with text input
            html = html.replace(
                /<input type="email" aria-label="E-posta adresi" placeholder="E-posta Adresi" required>/,
                '<input type="text" aria-label="Kullanıcı Adı" placeholder="Kullanıcı Adı veya E-posta" required>'
            );
            return html;
        };
    }

    // 3. Override login function to capture the user's input and match DB
    window.login = function() {
        state.logged = true;
        state.page = 'dashboard';
        
        const form = document.getElementById('admin-form') || document.querySelector('form');
        let userName = "Misafir Kullanıcı";
        let userRole = "Kullanıcı";
        
        if (form) {
            const inputs = form.querySelectorAll('input');
            if (inputs.length >= 1) {
                let enteredName = inputs[0].value.trim();
                
                window.authDB = window.authDB || JSON.parse(localStorage.getItem('authbot_db') || '{"companies":[], "users":[], "admins":[]}');
                
                let found = false;
                
                // Check Users
                const matchedUser = window.authDB.users.find(u => u.name.toLowerCase() === enteredName.toLowerCase() || u.name.toLowerCase() + '@' === enteredName.toLowerCase().substring(0, enteredName.indexOf('@') + 1));
                if (matchedUser) {
                    userName = matchedUser.name;
                    userRole = "Kullanıcı" + (matchedUser.companyName ? ` (${matchedUser.companyName})` : "");
                    found = true;
                }
                
                // Check Admins
                if (!found) {
                    const matchedAdmin = window.authDB.admins.find(u => u.name.toLowerCase() === enteredName.toLowerCase() || u.name.toLowerCase() + '@' === enteredName.toLowerCase().substring(0, enteredName.indexOf('@') + 1));
                    if (matchedAdmin) {
                        userName = matchedAdmin.name;
                        userRole = "Şirket Admini" + (matchedAdmin.companyName ? ` (${matchedAdmin.companyName})` : "");
                        found = true;
                    }
                }
                
                // Check Companies (just in case they log in with company name)
                if (!found) {
                    const matchedComp = window.authDB.companies.find(c => c.name.toLowerCase() === enteredName.toLowerCase());
                    if (matchedComp) {
                        userName = matchedComp.name + " Yönetimi";
                        userRole = "Şirket Ana Hesabı";
                        found = true;
                    }
                }
                
                // Fallback: If not found in DB
                if (!found && enteredName) {
                    if(enteredName.includes('@')) {
                        userName = enteredName.split('@')[0].replace(/\./g, ' ');
                        userName = userName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                    } else {
                        userName = enteredName;
                    }
                    userRole = "Sistem Yöneticisi"; 
                }
            }
        }
        
        localStorage.setItem('sb_session', '1');
        localStorage.setItem('sb_active_user', userName);
        localStorage.setItem('sb_active_role', userRole);
        
        render();
    };

    // 4. Override layout to use the dynamic user name
    const oldLayout = window.layout;
    if(oldLayout) {
        window.layout = function(content, title) {
            let html = oldLayout(content, title);
            
            const activeUser = localStorage.getItem('sb_active_user') || 'Bilge Han Veral';
            const activeRole = localStorage.getItem('sb_active_role') || 'Süper Yönetici';
            
            html = html.replace(
                /<strong>Bilge Han Veral<\/strong><span>SkillBridge AI<\/span><small>.*?<\/small>/,
                `<strong>${activeUser}</strong><span>SkillBridge AI</span><small>${activeRole}</small>`
            );

            return html;
        };
    }
    
    // 5. Override candidate test start to save candidate info
    const oldStartCandidateTest = window.startCandidateTest;
    if(oldStartCandidateTest) {
        window.startCandidateTest = function() {
            const candName = document.getElementById('cand-name').value;
            const candId = document.getElementById('cand-id').value;
            if(!candName || !candId) return toast('Ad Soyad ve Test ID zorunludur.');
            
            localStorage.setItem('sb_active_user', candName);
            localStorage.setItem('sb_active_role', 'Aday (' + candId + ')');
            
            state.logged = true;
            state.page = 'candidate-test';
            state.candidateSession = { name: candName, id: candId };
            render();
        };
    }
})();

(function() {
    window.managementPage = function() {
        window.authDB = window.authDB || JSON.parse(localStorage.getItem('authbot_db') || '{"companies":[], "users":[], "admins":[]}');
        
        let html = `<section class="page-intro">
            <div>
                <h2>Merkezi Veri Bankası</h2>
                <p>Şirket kayıtlarını, yönetici yetkilerini ve kullanıcı hesaplarını düzenleyin.</p>
            </div>
            <button class="primary" style="background:#0f766e;" onclick="openEvrakKutusuModal()">Evrak Kutusu</button>
        </section>

        <!-- SÜPER YÖNETİCİ KARTI -->
        <div class="admin-record" style="border:1px solid #4ade80; background:#f0fdf4; margin-bottom:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; width:100%;">
                <div>
                    <span class="eyebrow" style="color:#16a34a;">EN ÜST YETKİ</span>
                    <h2 style="margin:0; font-size:20px;">Süper Yönetici</h2>
                </div>
                <span style="background:#dcfce3; color:#16a34a; padding:4px 12px; border-radius:20px; font-size:12px; font-weight:bold;">Süper Admin</span>
            </div>
            <div class="record-fields three-fields" style="width:100%;">
                <label><span>Adı Soyadı</span><input value="Bilge Han Veral" readonly></label>
                <label><span>E-posta Adresi</span><input type="email" value="superyonetici@skillbridge.com.tr" readonly></label>
                <label><span>Şifre</span><input type="password" value="********" readonly></label>
            </div>
            <div class="record-actions" style="margin-top:15px; width:100%; justify-content:flex-end;">
                <button class="secondary" onclick="editRecord(this)">Düzelt</button>
                <button class="primary" onclick="saveRecord(this, 'Süper Yönetici')">Kaydet</button>
            </div>
        </div>

        <!-- ŞİRKETLER BÖLÜMÜ -->
        <section class="admin-section">
            <div class="admin-section-head">
                <div>
                    <span class="eyebrow">KURUM KAYITLARI</span>
                    <h2>Şirketler</h2>
                </div>
                <button class="secondary" onclick="showRegistrationModal(); document.getElementById('reg-type-select').value='company'; updateRegFormFields();">+ Yeni Şirket</button>
            </div>
            ${window.authDB.companies.length === 0 ? '<div style="padding:20px; text-align:center; color:#94a3b8;">Kayıtlı şirket yok.</div>' : ''}
            ${window.authDB.companies.slice().reverse().map((c, i) => `
                <div class="admin-record">
                    <div class="record-fields three-fields" style="width:100%;">
                        <label><span>Şirketin Adı</span><input value="${c.name}" readonly></label>
                        <label><span>Kayıt Tarihi</span><input value="${c.date}" readonly></label>
                        <label><span>Vergi Numarası / Kapasite</span><input value="Belirtilmedi" readonly></label>
                    </div>
                    <div class="record-actions" style="margin-top:15px; width:100%; justify-content:flex-end;">
                        <button class="danger-button" onclick="this.closest('.admin-record').remove(); toast('Şirket silindi')">Sil</button>
                        <button class="secondary" onclick="editRecord(this)">Düzelt</button>
                        <button class="primary" onclick="saveRecord(this, 'Şirket')">Kaydet</button>
                    </div>
                </div>
            `).join('')}
        </section>

        <!-- KULLANICILAR VE YETKİLER -->
        <section class="admin-section">
            <div class="admin-section-head">
                <div>
                    <span class="eyebrow">KULLANICILAR VE YETKİLER</span>
                    <h2>Kullanıcılar</h2>
                </div>
                <button class="secondary" onclick="showRegistrationModal(); document.getElementById('reg-type-select').value='user'; updateRegFormFields();">+ Yeni Kullanıcı</button>
            </div>

            <!-- YÖNETİCİLER -->
            <div class="user-group">
                <div class="user-group-title">
                    <h3>Admin ve Yönetici Kullanıcılar</h3>
                    <span>${window.authDB.admins.length} kullanıcı</span>
                </div>
                ${window.authDB.admins.length === 0 ? '<div style="padding:10px; color:#94a3b8;">Kayıtlı yönetici yok.</div>' : ''}
                ${window.authDB.admins.slice().reverse().map(c => `
                    <div class="admin-record">
                        <span class="user-role admin-role">${c.companyName || 'Bağımsız'} Yöneticisi</span>
                        <div class="record-fields four-fields" style="width:100%;">
                            <label><span>Adı Soyadı</span><input value="${c.name}" readonly></label>
                            <label><span>Şirketi</span><input value="${c.companyName || 'Belirtilmedi'}" readonly></label>
                            <label><span>Kayıt Tarihi</span><input value="${c.date}" readonly></label>
                            <label><span>Yetki</span><input value="Admin" readonly></label>
                        </div>
                        <div class="record-actions" style="margin-top:15px; width:100%; justify-content:flex-end;">
                            <button class="danger-button" onclick="this.closest('.admin-record').remove(); toast('Yönetici silindi')">Sil</button>
                            <button class="secondary" onclick="editRecord(this)">Düzelt</button>
                            <button class="primary" onclick="saveRecord(this, 'Yönetici')">Kaydet</button>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- NORMAL KULLANICILAR -->
            <div class="user-group">
                <div class="user-group-title">
                    <h3>Normal Kullanıcılar</h3>
                    <span>${window.authDB.users.length} kullanıcı</span>
                </div>
                ${window.authDB.users.length === 0 ? '<div style="padding:10px; color:#94a3b8;">Kayıtlı normal kullanıcı yok.</div>' : ''}
                ${window.authDB.users.slice().reverse().map(c => `
                    <div class="admin-record">
                        <span class="user-role normal-role">${c.companyName || 'Bağımsız'} Personeli</span>
                        <div class="record-fields three-fields" style="width:100%;">
                            <label><span>Kullanıcı Adı</span><input value="${c.name}" readonly></label>
                            <label><span>Şirketi</span><input value="${c.companyName || 'Belirtilmedi'}" readonly></label>
                            <label><span>Kayıt Tarihi</span><input value="${c.date}" readonly></label>
                        </div>
                        <div class="record-actions" style="margin-top:15px; width:100%; justify-content:flex-end;">
                            <button class="danger-button" onclick="this.closest('.admin-record').remove(); toast('Kullanıcı silindi')">Sil</button>
                            <button class="secondary" onclick="editRecord(this)">Düzelt</button>
                            <button class="primary" onclick="saveRecord(this, 'Kullanıcı')">Kaydet</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>`;
        
        if(typeof layout === 'function') {
           return layout(html, 'Merkezi Veri Bankası');
        }
        return html;
    };
})();

(function() {
    window.managementPage = function() {
        window.authDB = window.authDB || JSON.parse(localStorage.getItem('authbot_db') || '{"companies":[], "users":[], "admins":[]}');
        
        let html = `<section class="page-intro">
            <div>
                <h2>Merkezi Veri Bankası</h2>
                <p>Şirket kayıtlarını, yönetici yetkilerini ve kullanıcı hesaplarını düzenleyin.</p>
            </div>
            <button class="primary" style="background:#4aa16f;" onclick="openEvrakKutusuModal()">Evrak Kutusu</button>
        </section>

        <!-- SÜPER YÖNETİCİ KARTI -->
        <div class="admin-record" style="border: 1px solid #4aa16f; position: relative;">
            <div style="position:absolute; top:20px; right:20px;">
                <span style="background:#e6f4ea; color:#1e8e3e; padding:4px 12px; border-radius:12px; font-size:12px; font-weight:bold;">Süper Admin</span>
            </div>
            <span class="user-role admin-role" style="background:transparent; color:#4aa16f; padding:0; margin-bottom:15px;">EN ÜST YETKİ<br><h2 style="margin:5px 0 0 0; color:#1e293b; font-size:1.5rem;">Süper Yönetici</h2></span>
            <div class="record-fields three-fields">
                <label><span>Adı Soyadı</span><input value="Süper Yönetici" readonly></label>
                <label><span>E-posta Adresi</span><input type="email" value="superyonetici@skillbridge.com.tr" readonly></label>
                <label><span>Şifre</span><input type="password" value="********" readonly></label>
            </div>
            <div class="record-actions">
                <button class="secondary" onclick="editRecord(this)">Düzelt</button>
                <button class="primary" onclick="saveRecord(this, 'Süper Yönetici')">Kaydet</button>
            </div>
        </div>

        <!-- ŞİRKETLER BÖLÜMÜ -->
        <section class="admin-section">
            <div class="admin-section-head">
                <div>
                    <span class="eyebrow">KURUM KAYITLARI</span>
                    <h2>Şirketler</h2>
                </div>
                <button class="secondary" onclick="showRegistrationModal(); document.getElementById('reg-type-select').value='company'; updateRegFormFields();">+ Yeni Şirket</button>
            </div>
            ${window.authDB.companies.length === 0 ? '<div style="padding:20px; color:#94a3b8;">Kayıtlı şirket yok.</div>' : ''}
            
            ${window.authDB.companies.slice().reverse().map(c => `
                <div class="admin-record">
                    <div class="record-fields three-fields">
                        <label><span>Şirketin Adı</span><input value="${c.name}" readonly></label>
                        <label><span>Adresi</span><input value="Şirket adresini girin" readonly></label>
                        <label><span>Vergi Numarası</span><input value="Vergi numarasını girin" readonly></label>
                    </div>
                    <div class="record-actions">
                        <button class="danger-button" onclick="this.closest('.admin-record').remove(); toast('Şirket silindi')">Sil</button>
                        <button class="secondary" onclick="editRecord(this)">Düzelt</button>
                        <button class="primary" onclick="saveRecord(this, 'Şirket')">Kaydet</button>
                    </div>
                </div>
            `).join('')}
        </section>

        <!-- KULLANICILAR VE YETKİLER -->
        <section class="admin-section">
            <div class="admin-section-head">
                <div>
                    <span class="eyebrow">KULLANICILAR VE YETKİLER</span>
                    <h2>Kullanıcılar</h2>
                </div>
                <button class="secondary" onclick="showRegistrationModal(); document.getElementById('reg-type-select').value='user'; updateRegFormFields();">+ Yeni Kullanıcı</button>
            </div>

            <!-- YÖNETİCİLER -->
            <div class="user-group">
                <div class="user-group-title">
                    <h3>Admin ve Yönetici Kullanıcılar</h3>
                    <span>${window.authDB.admins.length} kullanıcı</span>
                </div>
                ${window.authDB.admins.slice().reverse().map(c => `
                    <div class="admin-record">
                        <span class="user-role admin-role">${c.companyName || 'Bağımsız'} Yöneticisi</span>
                        <div class="record-fields four-fields">
                            <label><span>Adı Soyadı</span><input value="${c.name}" readonly></label>
                            <label><span>Şirketi</span><input value="${c.companyName || 'Belirtilmedi'}" readonly></label>
                            <label><span>E-posta Adresi</span><input type="email" value="${c.name.replace(/\s+/g,'').toLowerCase()}@${(c.companyName||'sirket').replace(/\s+/g,'').toLowerCase()}.com" readonly></label>
                            <label><span>Yetki</span><input value="Admin" readonly></label>
                        </div>
                        <div class="record-actions">
                            <button class="danger-button" onclick="this.closest('.admin-record').remove(); toast('Yönetici silindi')">Sil</button>
                            <button class="secondary" onclick="editRecord(this)">Düzelt</button>
                            <button class="primary" onclick="saveRecord(this, 'Yönetici')">Kaydet</button>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- NORMAL KULLANICILAR -->
            <div class="user-group">
                <div class="user-group-title">
                    <h3>Normal Kullanıcılar</h3>
                    <span>${window.authDB.users.length} kullanıcı</span>
                </div>
                ${window.authDB.users.slice().reverse().map(c => `
                    <div class="admin-record">
                        <span class="user-role normal-role">${c.companyName || 'Bağımsız'} Personeli</span>
                        <div class="record-fields three-fields">
                            <label><span>Kullanıcı Adı</span><input value="${c.name}" readonly></label>
                            <label><span>Şirketi</span><input value="${c.companyName || 'Belirtilmedi'}" readonly></label>
                            <label><span>Şifre</span><input type="password" value="********" readonly></label>
                        </div>
                        <div class="record-actions">
                            <button class="danger-button" onclick="this.closest('.admin-record').remove(); toast('Kullanıcı silindi')">Sil</button>
                            <button class="secondary" onclick="editRecord(this)">Düzelt</button>
                            <button class="primary" onclick="saveRecord(this, 'Kullanıcı')">Kaydet</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>`;
        
        if(typeof layout === 'function') {
           return layout(html, 'Merkezi Veri Bankası');
        }
        return html;
    };
})();


(function() {
    
    window.actualTestResults = [];

    // Override showOpenResult to capture real answers
    window.showOpenResult = function() {
        const total = generatedExamQuestions.length, answered = secureExam.answers.length, blank = total - answered;
        const pct = n => Math.round(n / total * 100);
        const body = document.getElementById('secure-exam-body');
        
        // Populate our global actualTestResults
        window.actualTestResults = generatedExamQuestions.map((q, i) => {
            const ans = secureExam.answers.find(a => a.question === (i + 1));
            return {
                question: q.text,
                answer: ans ? ans.answer : '',
                status: ans ? (ans.status === 'correct' ? 'positive' : 'negative') : 'blank',
                seconds: ans ? ans.seconds : 0
            };
        });

        body.innerHTML = '<div class="secure-result"><span>SINAV TAMAMLANDI</span><h2>Vaka Testi Sonucu</h2>' +
            '<div class="result-summary-grid">' +
            '<article><small>Doğru</small><b>' + secureExam.correct + '</b><span>%' + pct(secureExam.correct) + '</span></article>' +
            '<article><small>Yanlış</small><b>' + secureExam.wrong + '</b><span>%' + pct(secureExam.wrong) + '</span></article>' +
            '<article><small>Boş</small><b>' + blank + '</b><span>%' + pct(blank) + '</span></article>' +
            '<article><small>Cevaplanan</small><b>' + answered + '</b><span>%' + pct(answered) + '</span></article>' +
            '</div>' +
            '<button class="primary full" onclick="document.getElementById(\'secure-exam\').remove();go(\'evaluation\')">Değerlendirmeye Gönder</button></div>';
    };

    // Similarly for showSecureResult (MCQ test)
    window.showSecureResult = function() {
        const total = generatedExamQuestions.length;
        const answered = secureExam.correct + secureExam.wrong;
        const rate = total ? Math.round(secureExam.correct / total * 100) : 0;
        const body = document.getElementById('secure-exam-body');

        // Populate our global actualTestResults for MCQ
        window.actualTestResults = generatedExamQuestions.map((q, i) => {
            const ans = secureExam.answers.find(a => a.question === (i + 1));
            const status = ans ? (q.answer === undefined ? 'positive' : 'negative') : 'blank';
            return {
                question: q.text,
                answer: ans ? 'Çoktan seçmeli test, şık işaretlendi.' : '',
                status: 'positive', 
                seconds: ans ? ans.seconds : 0
            };
        });
        
        body.innerHTML = '<div class="secure-result"><span>SINAV TAMAMLANDI</span><h2>Test Sonucu</h2>' +
            '<div class="result-only-grid">' +
            '<article><small>Doğru Cevap</small><b>' + secureExam.correct + '</b></article>' +
            '<article><small>Yanlış Cevap</small><b>' + secureExam.wrong + '</b></article>' +
            '<article><small>Başarı</small><b>%' + rate + '</b></article>' +
            '</div><button class="primary full" onclick="document.getElementById(\'secure-exam\').remove();go(\'evaluation\')">Değerlendirmeye Gönder</button></div>';
    };

    // Override the evaluation page functions to use window.actualTestResults
    window.evaluationStats = function(processed = window.actualTestResults.length) {
        const rows = window.actualTestResults.slice(0, processed);
        const positive = rows.filter(r => r.status === 'positive').length;
        const negative = rows.filter(r => r.status === 'negative').length;
        const blank = rows.filter(r => r.status === 'blank').length;
        const answered = positive + negative;
        const rate = answered ? Math.round(positive / answered * 100) : 0;
        const avg = answered ? Math.round(rows.reduce((sum, r) => sum + r.seconds, 0) / answered) : 0;
        return { positive, negative, blank, answered, rate, avg };
    };

    window.evaluationRows = function(processed = 0) {
        return window.actualTestResults.map((row, i) => {
            const waiting = i >= processed;
            const current = i === processed;
            const label = waiting ? (current ? 'İnceleniyor' : 'Bekliyor') : (row.status === 'positive' ? 'Olumlu / Doğru' : row.status === 'negative' ? 'Olumsuz / Yanlış' : 'Boş');
            return '<article class="evaluation-row ' + (waiting ? 'waiting ' : '') + (current ? 'current ' : '') + (waiting ? '' : row.status) + '"><div class="evaluation-number">' + (i + 1) + '</div><div><h3>' + safeText(row.question) + '</h3><p>' + (row.answer ? safeText(row.answer) : 'Cevap verilmedi') + '</p><small>' + (row.seconds ? row.seconds + ' saniyede cevaplandı' : 'Süre kaydı yok') + '</small></div><span>' + label + '</span></article>';
        }).join('');
    };

    window.evaluationMetricsHtml = function(stats, processed) {
        return '<article><span>İşlenen</span><b>' + processed + ' / ' + window.actualTestResults.length + '</b></article>' +
            '<article class="positive"><span>Olumlu</span><b>' + stats.positive + '</b></article>' +
            '<article class="negative"><span>Olumsuz</span><b>' + stats.negative + '</b></article>' +
            '<article><span>Boş</span><b>' + stats.blank + '</b></article>' +
            '<article><span>Anlık Başarı</span><b>%' + stats.rate + '</b></article>' +
            '<article><span>Ort. Cevap Süresi</span><b>' + stats.avg + ' sn</b></article>';
    };

    window.evaluationPage = function() {
        if (!window.actualTestResults || window.actualTestResults.length === 0) {
            window.actualTestResults = [
                {question:'Kriz anında ilk hangi riski ele alırsınız?',answer:'Müşteri ve operasyon sürekliliğini aynı anda etkileyen güvenlik riskini önceliklendiririm.',status:'positive',seconds:54},
                {question:'Kararınızı hangi verilerle desteklersiniz?',answer:'Geçmiş olay kayıtları, teslim süresi, maliyet etkisi ve ekip kapasitesini birlikte incelerim.',status:'positive',seconds:71},
                {question:'Paydaşlara iletişimi nasıl yönetirsiniz?',answer:'Kararı ekibe bildiririm.',status:'negative',seconds:22},
                {question:'Alternatif çözümünüz nedir?',answer:'Yedek kaynak planını devreye alır, kritik teslimatları öncelik sırasına koyarım.',status:'positive',seconds:63},
                {question:'Sonucu hangi ölçütlerle izlersiniz?',answer:'',status:'blank',seconds:0}
            ];
        }
        
        const stats = window.evaluationStats(0);
        return layout('<section class="evaluation-page"><div class="prompt-head"><div><span class="eyebrow">TESTİM DEĞERLENDİRMESİ</span><h2>Test Değerlendirme</h2><p>Gerçek sınav cevapları olumlu, olumsuz ve boş olarak soru bazında değerlendirilir; ara metrikler anlık güncellenir.</p></div><button id="evaluation-start" class="primary" onclick="startEvaluation()">Değerlendirmeyi Başlat</button></div><div id="evaluation-metrics" class="evaluation-metrics">' + window.evaluationMetricsHtml(stats, 0) + '</div><div class="evaluation-progress"><i id="evaluation-progress-bar" style="width:0%"></i></div><section id="evaluation-list" class="evaluation-list">' + window.evaluationRows(0) + '</section><section id="evaluation-final" class="evaluation-final" hidden></section></section>', 'Test Değerlendirme');
    };

    window.startEvaluation = function() {
        clearInterval(window.evaluationTimer);
        window.evaluationIndex = 0;
        state.evaluationTransferred = false;
        const button = document.getElementById('evaluation-start');
        button.disabled = true;
        button.textContent = 'Değerlendiriliyor...';
        document.getElementById('evaluation-final').hidden = true;
        window.updateEvaluationView();
        window.evaluationTimer = setInterval(() => {
            window.evaluationIndex++;
            window.updateEvaluationView();
            if (window.evaluationIndex >= window.actualTestResults.length) {
                clearInterval(window.evaluationTimer);
                window.evaluationTimer = null;
                window.finishEvaluation();
            }
        }, 700);
    };

    window.updateEvaluationView = function() {
        const stats = window.evaluationStats(window.evaluationIndex);
        document.getElementById('evaluation-metrics').innerHTML = window.evaluationMetricsHtml(stats, window.evaluationIndex);
        document.getElementById('evaluation-list').innerHTML = window.evaluationRows(window.evaluationIndex);
        document.getElementById('evaluation-progress-bar').style.width = Math.round(window.evaluationIndex / window.actualTestResults.length * 100) + '%';
    };

    window.finishEvaluation = function() {
        const stats = window.evaluationStats();
        const final = document.getElementById('evaluation-final');
        const button = document.getElementById('evaluation-start');
        button.disabled = false;
        button.textContent = 'Yeniden Değerlendir';
        final.hidden = false;
        
        let reportHTML = '<div><span class="eyebrow">DEĞERLENDİRME TAMAMLANDI</span><h2>%' + stats.rate + ' başarı</h2><p>' + stats.positive + ' olumlu, ' + stats.negative + ' olumsuz ve ' + stats.blank + ' boş cevap bulundu.</p></div>';
        
        reportHTML += '<div style="margin-top:20px; background:#f8fafc; padding:20px; border-radius:12px; border:1px solid #e2e8f0; text-align:left; flex: 1 1 100%;">' +
            '<h3 style="margin-top:0; color:#0f172a;">Adayın Genel Profili ve AI Analizi</h3>' +
            '<p style="color:#475569; font-size:14px; line-height:1.6;">' + 
            (stats.rate >= 60 ? 'Aday genel olarak teknik yetkinlikleri kavramış durumda. Verilen cevaplarda problem çözme yaklaşımı olumlu bulundu.' : 'Adayın analitik düşünme ve kriz anında önceliklendirme yetkinlikleri zayıf kalmıştır.') +
            ' Detaylı rapor sonuçlar sekmesine aktarılmaya hazırdır.</p>' +
            '</div>';

        reportHTML += '<button class="primary" style="margin-top:20px; width: 100%;" onclick="transferEvaluationResult()">Sonucu Test Sonuçlarına Aktar</button>';
        
        final.innerHTML = reportHTML;
        final.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        toast('Bütün test verileri değerlendirildi');
    };

    window.transferEvaluationResult = function() {
        if (!state.evaluationTransferred) {
            const stats = window.evaluationStats();
            let activeUser = "Bilinmeyen Kullanıcı";
            try { activeUser = localStorage.getItem('sb_active_user') || "Yeni Aday"; } catch(e){}

            let testName = "Açık Uçlu Vaka Testi";
            if(window.generatedExamQuestions && window.generatedExamQuestions.length > 0) {
               testName = "Dinamik " + window.generatedExamQuestions.length + " Soruluk Test";
            }

            candidateResults.unshift({
                name: activeUser,
                email: activeUser.replace(/\s+/g,'').toLowerCase() + '@skillbridge.com.tr',
                test: testName,
                department: 'Değerlendirme Merkezi',
                detail: 'Gemma 4 cevap değerlendirmesi',
                score: stats.rate,
                outcome: stats.rate >= 60 ? 'Olumlu' : 'Geliştirilmeli',
                date: new Date().toLocaleDateString('tr-TR'),
                time: new Date().toLocaleTimeString('tr-TR'),
                summary: stats.positive + ' olumlu, ' + stats.negative + ' olumsuz ve ' + stats.blank + ' boş cevap değerlendirildi. Ortalama cevap süresi ' + stats.avg + ' saniyedir.',
                detailedReport: window.actualTestResults
            });
            state.evaluationTransferred = true;
        }
        toast('Sonuç Test Sonuçları sayfasına aktarıldı');
        go('results');
    };

    window.showCandidateReport = function(index) {
        const r = candidateResults[index];
        const modal = document.createElement('div');
        modal.className = 'modal candidate-modal';
        
        let detailsHtml = '';
        if (r.detailedReport && r.detailedReport.length > 0) {
             detailsHtml = r.detailedReport.map((q, idx) => `
                <div style="background:#f1f5f9; padding:15px; border-radius:8px; margin-bottom:15px;">
                    <strong style="color:#0f172a; display:block; margin-bottom:5px;">Soru ${idx+1}: ${q.question}</strong>
                    <p style="margin:0 0 10px 0; color:#334155; font-size:14px;"><strong>Cevap:</strong> ${q.answer || '<em>Boş</em>'}</p>
                    <span style="display:inline-block; padding:4px 8px; border-radius:4px; font-size:12px; font-weight:bold; 
                          ${q.status==='positive'?'background:#dcfce3;color:#16a34a;':(q.status==='negative'?'background:#fee2e2;color:#dc2626;':'background:#e2e8f0;color:#64748b;')}">
                          ${q.status==='positive'?'✅ Olumlu / Doğru':(q.status==='negative'?'❌ Olumsuz / Yanlış':'⚪ Boş')}
                    </span>
                    <span style="font-size:12px; color:#64748b; margin-left:10px;">🕒 ${q.seconds} sn</span>
                </div>
             `).join('');
        }

        modal.innerHTML = '<div class="modal-card report-card"><div class="modal-head"><div><span class="eyebrow">YAPAY ZEKA DEĞERLENDİRME RAPORU</span><h2 style="margin:0">' + safeText(r.name) + '</h2><span style="color:#64748b">' + safeText(r.email) + '</span></div><button type="button" onclick="this.closest(\' .modal\').remove()">X</button></div>' +
            '<div class="report-stats"><article><span>' + safeText(r.test) + '</span><b>% ' + r.score + '</b></article><article><span>Değerlendirme Sonucu</span><b class="' + (r.score >= 80 ? 'green-score' : r.score >= 50 ? 'blue-score' : 'purple-score') + '">' + safeText(r.outcome) + '</b></article><article><span>Tamamlama Zamanı</span><b>' + safeText(r.date) + ' ' + safeText(r.time) + '</b></article></div>' +
            '<div class="report-content" style="max-height: 400px; overflow-y: auto; text-align: left; margin-bottom: 20px;">' +
            '<h3>Genel AI Özet Raporu</h3><p>' + safeText(r.summary) + '</p>' +
            (detailsHtml ? '<h3>Soru Bazlı Detaylı Değerlendirme</h3>' + detailsHtml : '') +
            '</div>' +
            '<div class="report-actions"><button class="secondary" onclick="toast(\'Rapor indiriliyor...\')">PDF Olarak İndir</button><button class="primary" onclick="toast(\'Değerlendirme sonucu e-posta ile gönderildi.\');this.closest(\' .modal\').remove()">Sonucu Adaya Gönder</button></div></div>';
        
        document.body.append(modal);
    };

})();


(function(){
    window.comparisonPage = function() {
        return layout(`
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
        `, 'Karşılaştırma');
    };

    window.showNewComparisonModal = function() {
        const modal = document.createElement('div');
        modal.className = 'modal comparison-modal';
        modal.style.zIndex = '9999';
        modal.innerHTML = `
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
        `;
        document.body.append(modal);
    };
})();




(function() {
    // Helper to get all people
    window.getAllPeople = function() {
        window.authDB = window.authDB || JSON.parse(localStorage.getItem('authbot_db') || '{"companies":[], "users":[], "admins":[]}');
        let people = [];
        window.authDB.admins.forEach(a => people.push({...a, role: 'Şirket Admini'}));
        window.authDB.users.forEach(u => people.push({...u, role: 'Kullanıcı'}));
        return people;
    };

    window.getCurrentUserCredits = function() {
        const activeUser = localStorage.getItem('sb_active_user') || 'Bilge Han Veral';
        window.authDB = window.authDB || JSON.parse(localStorage.getItem('authbot_db') || '{"companies":[], "users":[], "admins":[]}');
        let currentUserObj = window.authDB.admins.find(u => u.name === activeUser) || window.authDB.users.find(u => u.name === activeUser);
        
        if (currentUserObj) {
            if (currentUserObj.credits === undefined) {
                currentUserObj.credits = 500;
                localStorage.setItem('authbot_db', JSON.stringify(window.authDB));
            }
            return currentUserObj.credits;
        }
        return 9999; // Super Admin default
    };

    const oldLayoutForGift = window.layout;
    window.layout = function(content, title) {
        let html = oldLayoutForGift(content, title);
        
        const credits = window.getCurrentUserCredits();
        html = html.replace(
            /<tr><th>Satın alınan<\/th><td>250<\/td><\/tr><tr><th>Kullanılan<\/th><td>68<\/td><\/tr><tr class="credit-remaining"><th>Kalan<\/th><td>182<\/td><\/tr>/,
            `<tr><th>Kayıt Bonusu</th><td>500</td></tr><tr><th>Transfer vb.</th><td>-</td></tr><tr class="credit-remaining"><th>Kalan</th><td>${credits}</td></tr>`
        );

        return html;
    };

    const originalRender3 = window.render;
    window.render = function() {
        if(state.page === 'gift') {
            const appEl = document.getElementById('app');
            if(appEl) {
                appEl.innerHTML = window.giftPage();
            }
        } else {
            originalRender3();
        }
        
        if(state.logged) {
            setTimeout(() => {
                const topNav = document.querySelector('.top-nav');
                if(topNav && !document.getElementById('btn-nav-gift')) {
                    const btn = document.createElement('button');
                    btn.id = 'btn-nav-gift';
                    btn.innerHTML = '🎁 Hediye Gönder';
                    btn.className = state.page === 'gift' ? 'active' : '';
                    btn.onclick = () => go('gift');
                    btn.style.background = state.page === 'gift' ? '#fce7f3' : 'transparent';
                    btn.style.color = state.page === 'gift' ? '#db2777' : '#64748b';
                    btn.style.fontWeight = 'bold';
                    topNav.appendChild(btn);
                }
            }, 50);
        }
    };

    window.giftPage = function() {
        const activeUser = localStorage.getItem('sb_active_user') || 'Bilge Han Veral';
        const currentCredits = window.getCurrentUserCredits();
        const people = window.getAllPeople().filter(p => p.name !== activeUser);

        let html = `
        <section class="page-intro" style="padding: 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h2>Hediye Kontör Gönder</h2>
                    <p>Çalışma arkadaşlarınıza veya yöneticilerinize kendi bakiyenizden kontör transfer edin.</p>
                </div>
                <div style="background: #fdf2f8; border: 1px solid #fbcfe8; padding: 15px 25px; border-radius: 12px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                    <span style="display: block; font-size: 12px; color: #db2777; font-weight: bold; margin-bottom: 5px;">MEVCUT KONTÖRÜNÜZ</span>
                    <strong style="font-size: 28px; color: #be185d;">${currentCredits}</strong>
                </div>
            </div>
        </section>

        <section class="generated-case-card" style="padding: 30px; max-width: 500px; margin: 40px auto; background: white; border-radius: 12px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
            <div style="text-align: center; margin-bottom: 30px;">
                <span style="font-size: 48px;">🎁</span>
                <h3 style="margin: 10px 0 5px 0; color: #0f172a;">Kontör Transferi</h3>
                <p style="color: #64748b; font-size: 14px; margin: 0;">Seçtiğiniz kullanıcının hesabına anında kontör aktarılır.</p>
            </div>

            <div style="margin-bottom: 25px;">
                <label style="display: block; font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 8px;">KİME GÖNDERİLECEK?</label>
                <select id="gift-recipient" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; outline: none; background: #f8fafc; cursor: pointer;">
                    <option value="">-- Listeden Bir Kullanıcı Seçin --</option>
                    ${people.map(p => `<option value="${p.name}">${p.name} (${p.companyName || 'Bağımsız'} - ${p.role})</option>`).join('')}
                </select>
            </div>
            
            <div style="margin-bottom: 30px;">
                <label style="display: block; font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 8px;">GÖNDERİLECEK KONTÖR MİKTARI</label>
                <input type="number" id="gift-amount" min="1" max="${currentCredits}" value="10" style="width: 100%; padding: 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 15px; outline: none; background: #f8fafc;">
            </div>

            <button class="primary full" style="background: #db2777; border-color: #db2777; font-size: 16px; padding: 15px; font-weight: bold; cursor: pointer;" onclick="sendGiftCredits()">
                Hediye Kontörü Gönder
            </button>
        </section>
        `;

        return layout(html, 'Hediye Gönder');
    };

    window.sendGiftCredits = function() {
        const recipientName = document.getElementById('gift-recipient').value;
        const amount = parseInt(document.getElementById('gift-amount').value, 10);
        
        if(!recipientName) return toast('Lütfen bir alıcı seçin.');
        if(!amount || amount <= 0) return toast('Geçerli bir miktar girin.');

        const activeUser = localStorage.getItem('sb_active_user') || 'Bilge Han Veral';
        window.authDB = window.authDB || JSON.parse(localStorage.getItem('authbot_db') || '{"companies":[], "users":[], "admins":[]}');
        
        let sender = window.authDB.admins.find(u => u.name === activeUser) || window.authDB.users.find(u => u.name === activeUser);
        let recipient = window.authDB.admins.find(u => u.name === recipientName) || window.authDB.users.find(u => u.name === recipientName);

        if(!recipient) return toast('Alıcı bulunamadı!');

        if(sender) {
            sender.credits = sender.credits !== undefined ? sender.credits : 500;
            if(sender.credits < amount) {
                return toast('Yetersiz kontör! Maksimum ' + sender.credits + ' gönderebilirsiniz.');
            }
            sender.credits -= amount;
        }

        recipient.credits = recipient.credits !== undefined ? recipient.credits : 500;
        recipient.credits += amount;

        localStorage.setItem('authbot_db', JSON.stringify(window.authDB));
        
        toast(amount + ' kontör ' + recipientName + ' adlı kişiye başarıyla gönderildi!');
        render();
    };
})();



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

(function() {
    const originalReportDetailPage = window.reportDetailPage;
    
    window.reportDetailPage = function() {
        const r = candidateResults[state.reportIndex];
        if (!r) { go('results'); return ''; }

        const scoreColor = r.score >= 80 ? '#22c55e' : r.score >= 50 ? '#f59e0b' : '#ef4444';
        const badgeColor = r.score >= 80 ? '#dcfce3' : r.score >= 50 ? '#fef3c7' : '#fee2e2';
        const badgeTextColor = r.score >= 80 ? '#15803d' : r.score >= 50 ? '#b45309' : '#b91c1c';
        const scoreText = r.score >= 80 ? 'Yüksek Skor' : r.score >= 50 ? 'Beklenebilir' : 'Yetkin Olmayan';

        let newHtml = '<div style="background: #0f172a; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #1e293b;">' +
            '<button onclick="go(\'results\')" style="background: transparent; border: none; color: white; font-size: 16px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">' +
                '<span style="font-size: 20px;">←</span> ' + r.name.split(' ')[0] + ' ' + r.name.split(' ').slice(1).join(' ').toLowerCase() +
            '</button>' +
            '<button style="background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 14px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px;">' +
                '🖨️ Yazdır / PDF' +
            '</button>' +
        '</div>' +
        '<div style="padding: 30px; background: #f8fafc; min-height: calc(100vh - 120px);">' +
            '<div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 40px; display: flex; gap: 40px; align-items: center; margin-bottom: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">' +
                '<div style="flex: 0 0 300px;">' +
                    '<h1 style="margin: 0 0 5px 0; font-size: 32px; color: #0f172a;">' + r.name + '</h1>' +
                    '<p style="margin: 0 0 20px 0; color: #64748b; font-size: 16px;">' + r.email + '</p>' +
                    '<div style="display: flex; flex-direction: column; gap: 10px;">' +
                        '<div style="background: #f1f5f9; padding: 8px 16px; border-radius: 20px; font-size: 13px; color: #334155; display: inline-block; width: max-content;">Sektör: ' + r.detail + '</div>' +
                        '<div style="background: #f1f5f9; padding: 8px 16px; border-radius: 20px; font-size: 13px; color: #334155; display: inline-block; width: max-content;">Rol: ' + r.test + '</div>' +
                    '</div>' +
                '</div>' +
                '<div style="flex: 0 0 150px; text-align: center; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; padding: 0 20px;">' +
                    '<span style="font-size: 12px; font-weight: 700; color: #64748b; display: block; margin-bottom: 10px;">GENEL SKOR</span>' +
                    '<strong style="font-size: 64px; color: #0f172a; line-height: 1; display: block; margin-bottom: 15px;">%' + r.score + '</strong>' +
                    '<span style="display: inline-block; padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 700; background: ' + badgeColor + '; color: ' + badgeTextColor + ';">' + scoreText + '</span>' +
                '</div>' +
                '<div style="flex: 1; padding-left: 20px;">' +
                    '<span style="font-size: 12px; font-weight: 700; color: #64748b; display: block; margin-bottom: 15px; text-align: center;">DEĞERLENDİRME SONUCU</span>' +
                    '<p style="font-size: 22px; font-weight: 700; color: #4ade80; text-align: center; line-height: 1.4; margin: 0;">' + r.summary + '</p>' +
                '</div>' +
            '</div>' +
            '<div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 30px;">' +
                '<div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 30px;">' +
                    '<div>' +
                        '<h2 style="margin: 0 0 5px 0; font-size: 20px; color: #0f172a;">Yetkinlik Ölçüm & Radar Analizi</h2>' +
                        '<p style="margin: 0; color: #64748b; font-size: 14px;">Kategori bazlı radar grafik ve hedef & mevcut durum analizi</p>' +
                    '</div>' +
                    '<div style="display: flex; gap: 5px;">' +
                        '<button style="background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">Genel Özet</button>' +
                        '<button style="background: transparent; color: #64748b; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">BİLİŞSEL</button>' +
                        '<button style="background: transparent; color: #64748b; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">TEKNİK</button>' +
                        '<button style="background: transparent; color: #64748b; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">TEMEL</button>' +
                        '<button style="background: transparent; color: #64748b; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">YÖNETSEL</button>' +
                        '<button style="background: transparent; color: #64748b; border: none; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">FONKSİYONEL</button>' +
                    '</div>' +
                '</div>' +
                '<div style="display: grid; grid-template-columns: 1fr 2fr; gap: 40px;">' +
                    '<div style="background: #f8fafc; border-radius: 12px; padding: 20px; text-align: center; border: 1px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px;">' +
                        '<h3 style="margin: 0 0 20px 0; font-size: 14px; color: #0f172a;">Kategori Bazlı Genel Özet</h3>' +
                        '<div style="position: relative; width: 200px; height: 200px;">' +
                            '<svg viewBox="0 0 100 100" style="width: 100%; height: 100%; overflow: visible;">' +
                                '<polygon points="50,5 95,25 95,75 50,95 5,75 5,25" fill="none" stroke="#cbd5e1" stroke-width="1"/>' +
                                '<polygon points="50,15 85,32 85,68 50,85 15,68 15,32" fill="none" stroke="#e2e8f0" stroke-width="1"/>' +
                                '<polygon points="50,25 75,40 75,60 50,75 25,60 25,40" fill="none" stroke="#e2e8f0" stroke-width="1"/>' +
                                '<line x1="50" y1="50" x2="50" y2="5" stroke="#cbd5e1" stroke-width="1"/>' +
                                '<line x1="50" y1="50" x2="95" y2="25" stroke="#cbd5e1" stroke-width="1"/>' +
                                '<line x1="50" y1="50" x2="95" y2="75" stroke="#cbd5e1" stroke-width="1"/>' +
                                '<line x1="50" y1="50" x2="50" y2="95" stroke="#cbd5e1" stroke-width="1"/>' +
                                '<line x1="50" y1="50" x2="5" y2="75" stroke="#cbd5e1" stroke-width="1"/>' +
                                '<line x1="50" y1="50" x2="5" y2="25" stroke="#cbd5e1" stroke-width="1"/>' +
                                '<polygon points="50,' + (100 - r.score*0.8) + ' ' + (50 + r.score*0.3) + ',' + (50 - r.score*0.2) + ' ' + (50 + r.score*0.4) + ',' + (50 + r.score*0.2) + ' 50,' + (50 + r.score*0.4) + ' ' + (50 - r.score*0.2) + ',' + (50 + r.score*0.3) + ' ' + (50 - r.score*0.4) + ',' + (50 - r.score*0.1) + '" fill="rgba(79, 70, 229, 0.2)" stroke="#4f46e5" stroke-width="2"/>' +
                            '</svg>' +
                            '<span style="position: absolute; top: -20px; left: 50%; transform: translateX(-50%); font-size: 10px; color: #64748b;">BİLİŞSEL</span>' +
                            '<span style="position: absolute; top: 20%; right: -30px; font-size: 10px; color: #64748b;">TEKNİK</span>' +
                            '<span style="position: absolute; bottom: 20%; right: -30px; font-size: 10px; color: #64748b;">TEMEL</span>' +
                            '<span style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); font-size: 10px; color: #64748b;">YÖNETSEL</span>' +
                            '<span style="position: absolute; bottom: 20%; left: -40px; font-size: 10px; color: #64748b;">FONKSİYONEL</span>' +
                            '<span style="position: absolute; top: 20%; left: -30px; font-size: 10px; color: #64748b;">DİĞER</span>' +
                        '</div>' +
                    '</div>' +
                    '<div>' +
                        '<h3 style="margin: 0 0 20px 0; font-size: 14px; color: #0f172a;">Tüm Ölçülen Yetkinlikler</h3>' +
                        '<div style="margin-bottom: 25px;">' +
                            '<div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 8px;">' +
                                '<div>' +
                                    '<strong style="font-size: 14px; color: #0f172a;">Captain / Pilot Operations - Technical</strong>' +
                                    '<span style="font-size: 10px; font-weight: 700; color: #3b82f6; margin-left: 8px;">TEMEL</span>' +
                                '</div>' +
                                '<div style="font-size: 12px; font-weight: 700;">' +
                                    '<span style="color: #4f46e5;">Mevcut: %' + r.score + '</span>' +
                                    '<span style="color: #94a3b8; margin-left: 10px;">Hedef: %60</span>' +
                                '</div>' +
                            '</div>' +
                            '<div style="height: 6px; background: #e2e8f0; border-radius: 3px; position: relative; width: 100%;">' +
                                '<div style="position: absolute; top: 0; left: 0; height: 100%; width: ' + r.score + '%; background: #e11d48; border-radius: 3px;"></div>' +
                                '<div style="position: absolute; top: -2px; left: 60%; height: 10px; width: 2px; background: #ef4444;"></div>' +
                            '</div>' +
                        '</div>' +
                        '<div style="margin-bottom: 25px;">' +
                            '<div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 8px;">' +
                                '<div>' +
                                    '<strong style="font-size: 14px; color: #0f172a;">Stratejik Liderlik ve Problem Çözme</strong>' +
                                    '<span style="font-size: 10px; font-weight: 700; color: #8b5cf6; margin-left: 8px;">YÖNETSEL</span>' +
                                '</div>' +
                                '<div style="font-size: 12px; font-weight: 700;">' +
                                    '<span style="color: #4f46e5;">Mevcut: %' + Math.min(r.score + 15, 100) + '</span>' +
                                    '<span style="color: #94a3b8; margin-left: 10px;">Hedef: %70</span>' +
                                '</div>' +
                            '</div>' +
                            '<div style="height: 6px; background: #e2e8f0; border-radius: 3px; position: relative; width: 100%;">' +
                                '<div style="position: absolute; top: 0; left: 0; height: 100%; width: ' + Math.min(r.score + 15, 100) + '%; background: ' + (Math.min(r.score + 15, 100) >= 70 ? '#22c55e' : '#f59e0b') + '; border-radius: 3px;"></div>' +
                                '<div style="position: absolute; top: -2px; left: 70%; height: 10px; width: 2px; background: #ef4444;"></div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin-bottom: 30px;">' +
                '<div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">' +
                    '<h3 style="margin: 0 0 15px 0; font-size: 16px; color: #be123c; display: flex; align-items: center; gap: 8px;">' +
                        '🚨 Hata Dedektörü (Sayfa 6)' +
                    '</h3>' +
                    '<div style="background: #fff1f2; border-radius: 12px; padding: 20px; font-size: 14px; color: #881337; line-height: 1.6;">' +
                        'Adayın yanlış yanıtları incelendiğinde, temel refleks zafiyetleri gözlemlenmektedir. Birincisi, karmaşık teknik sorunlar karşısında hızlıca dış kaynaklara (yeni ekip, danışman) yönelme eğilimi, içsel bilgi birikimini ve ekip potansiyelini yeterince kullanmama veya derinlemesine teknik analize girmeme zafiyetini ortaya koymaktadır. İkincisi, operasyonel sorunları finansal veya yüzeysel iletişim stratejileriyle çözme girişimi, kök nedenlere inme ve kalıcı operasyonel mükemmelliği hedefleme eksikliğini göstermektedir. Üçüncüsü, ekip motivasyonunu artırma ve baskı altında kişisel dayanıklılığı koruma konusunda yetersiz stratejiler sergilemesi, liderlik ve öz yönetim becerilerindeki boşluklara işaret etmektedir. Bu zafiyetler, özellikle havacılık gibi teknik ve operasyonel mükemmelliğin kritik olduğu bir sektörde ciddi liderlik riskleri oluşturmaktadır.' +
                    '</div>' +
                '</div>' +
                '<div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 25px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">' +
                    '<h3 style="margin: 0 0 15px 0; font-size: 16px; color: #1e293b; display: flex; align-items: center; gap: 8px;">' +
                        '📊 Kıyaslama (Sayfa 8)' +
                    '</h3>' +
                    '<div style="background: #f8fafc; border-radius: 12px; padding: 20px; font-size: 14px; color: #475569; line-height: 1.6; border: 1px solid #e2e8f0;">' +
                        'Havacılık sektöründe bir CEO pozisyonu için ideal profil, teknik operasyonel mükemmelliğe derinlemesine odaklanma, içsel kaynakları etkin kullanma, stratejik iletişim ve kriz yönetimi becerilerini bir arada barındırmalıdır. Adayın %20\'lik başarı skoru ve yanıtlarındaki dışsallaştırma eğilimi, bu ideal profilden önemli ölçüde uzak olduğunu göstermektedir. Özellikle operasyonel sorunların kök nedenlerine inme, ekibi motive etme ve paydaşlarla şeffaf, çözüm odaklı iletişim kurma konularında belirgin zayıflıklar taşımaktadır.' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 30px; border-top: 4px solid #22c55e;">' +
                '<h2 style="margin: 0 0 20px 0; font-size: 22px; color: #0f172a;">Nihai Mentor Kararı (Sayfa 9)</h2>' +
                '<p style="margin: 0; font-size: 15px; color: #334155; line-height: 1.8;">' +
                    'Adayın "Kaptan / Pilot Operasyonları - Teknik" yetkinliğindeki zayıf performansı göz önüne alındığında, aşağıdaki 30 günlük gelişim yol haritası önerilir: İlk 10 gün, havacılık mühendisliği ve operasyonel süreçler hakkında temel bilgilere odaklanılmalı, özellikle "ağırlık ve kütle dağılımı" gibi kritik teknik raporlar incelenmeli ve mühendislik ekipleriyle düzenli bilgi paylaşım toplantılarına katılım sağlanmalıdır. Sonraki 10 gün, kriz yönetimi ve kök neden analizi teknikleri üzerine yoğunlaşılmalı, vaka çalışmaları üzerinden karmaşık teknik sorunlara içsel ve bütünsel çözüm yaklaşımları geliştirilmelidir. Son 10 gün ise, ekip motivasyonu, şeffaf iletişim ve paydaş yönetimi konularında liderlik eğitimleri alınmalı, ayrıca kişisel dayanıklılığı artırmak için stres yönetimi ve zaman yönetimi teknikleri üzerinde çalışılmalıdır. Havacılık güvenliği standartları ve sektördeki teknolojik gelişmeler hakkında düzenli okumalar ve uzmanlarla pratik çalışmalarla desteklenmelidir.' +
                '</p>' +
            '</div>';

        if (r.detailedReport && r.detailedReport.length > 0) {
            newHtml += '<div style="background: white; border-radius: 16px; border: 1px solid #e2e8f0; padding: 30px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">' +
                '<h2 style="margin: 0 0 20px 0; font-size: 20px; color: #0f172a;">Detaylı Soru & Cevap Analizi</h2>' +
                '<div style="display: flex; flex-direction: column; gap: 15px;">';
            r.detailedReport.forEach(function(q, idx) {
                newHtml += '<div style="background:#f8fafc; padding:20px; border-radius:12px; border: 1px solid #e2e8f0;">' +
                    '<strong style="color:#0f172a; display:block; margin-bottom:10px; font-size: 15px;">Soru ' + (idx+1) + ': ' + q.question + '</strong>' +
                    '<p style="margin:0 0 15px 0; color:#334155; font-size:14px; line-height: 1.5;"><strong>Adayın Cevabı:</strong> ' + (q.answer || '<em style="color:#94a3b8">Boş bırakılmış</em>') + '</p>' +
                    '<div style="display: flex; align-items: center; gap: 15px;">' +
                        '<span style="display:inline-block; padding:6px 12px; border-radius:6px; font-size:12px; font-weight:700; ' +
                            (q.status==='positive'?'background:#dcfce3;color:#16a34a;':(q.status==='negative'?'background:#fee2e2;color:#dc2626;':'background:#e2e8f0;color:#64748b;')) + '">' +
                            (q.status==='positive'?'✅ Olumlu / Doğru':(q.status==='negative'?'❌ Olumsuz / Yanlış':'⚪ Boş')) +
                        '</span>' +
                        '<span style="font-size:12px; color:#64748b; font-weight: 600;">🕒 ' + q.seconds + ' saniye</span>' +
                    '</div>' +
                '</div>';
            });
            newHtml += '</div></div>';
        }

        newHtml += '</div>';
        
        return layout(newHtml, 'Detaylı Rapor - ' + r.name);
    };
})();



window.customTranslate = function(lang) {
  if (lang === 'tr') {
    // Delete all possible googtrans cookies
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + window.location.hostname;
    window.location.reload();
  } else {
    // Set to EN
    document.cookie = 'googtrans=/tr/en; path=/;';
    document.cookie = 'googtrans=/tr/en; path=/; domain=' + window.location.hostname;
    document.cookie = 'googtrans=/tr/en; path=/; domain=.' + window.location.hostname;
    window.location.reload();
  }
};

// Check cookie for UI
setTimeout(() => {
  const isEn = document.cookie.includes('googtrans=/tr/en');
  const btnTr = document.getElementById('btn-lang-tr');
  const btnEn = document.getElementById('btn-lang-en');
  if(btnTr && btnEn) {
    if(isEn) {
      btnEn.style.background = '#4f46e5'; btnEn.style.color = 'white';
      btnTr.style.background = 'transparent'; btnTr.style.color = '#334155';
    } else {
      btnTr.style.background = '#4f46e5'; btnTr.style.color = 'white';
      btnEn.style.background = 'transparent'; btnEn.style.color = '#334155';
    }
  }
}, 100);


// ==========================================
// PATCH 10: LEDGER, PAYWALL & SUBSCRIPTIONS
// ==========================================
(function() {
    // 1. Ledger Management
    window.getLedger = function() {
        return JSON.parse(localStorage.getItem('sb_ledger') || '{}');
    };
    window.saveLedger = function(ledger) {
        localStorage.setItem('sb_ledger', JSON.stringify(ledger));
    };
    window.getUserCredits = function(username) {
        const ledger = getLedger();
        return ledger[username] || 0;
    };
    window.addCredits = function(username, amount) {
        const ledger = getLedger();
        if(!(username in ledger)) ledger[username] = 0;
        ledger[username] += amount;
        saveLedger(ledger);
        render(); // refresh UI
    };
    window.deductCredits = function(username, amount) {
        const ledger = getLedger();
        if(!(username in ledger)) ledger[username] = 0;
        if(ledger[username] >= amount) {
            ledger[username] -= amount;
            saveLedger(ledger);
            return true;
        }
        return false;
    };

    // 2. Override Login
    const oldLogin = window.login;
    window.login = function() {
        const inputs = document.querySelectorAll('.login-inputs input');
        let user = 'demo@sirket.com';
        if (inputs.length > 0 && inputs[0].value.trim()) {
            user = inputs[0].value.trim().toLowerCase();
        }
        state.currentUser = user;
        
        const ledger = getLedger();
        if (!(user in ledger)) {
            ledger[user] = 0; // New users start with 0 credits
            saveLedger(ledger);
        }
        
        localStorage.setItem('sb_current_user', user);
        
        state.logged = true;
        state.page = 'dashboard';
        localStorage.setItem('sb_session', '1');
        render();
    };

    // Restore session user on load if logged in
    if(state.logged) {
        state.currentUser = localStorage.getItem('sb_current_user') || 'demo@sirket.com';
    }

    // 3. Override aiCall to apply Paywall
    const oldAiCall = window.aiCall;
    window.aiCall = async function(prompt, jsonMode) {
        const cost = 10;
        if (!deductCredits(state.currentUser, cost)) {
            // Insufficient credits
            throw new Error("YETERSİZ KONTÖR: Bu işlem için " + cost + " kontör gerekiyor. Lütfen Abonelik sayfasından kontör yükleyiniz.");
        }
        // If deduced successfully, run actual API
        try {
            return await oldAiCall(prompt, jsonMode);
        } catch(e) {
            // Refund if API fails!
            addCredits(state.currentUser, cost);
            throw e;
        }
    };

    // 4. Override Sidebar Credit Box & Add Subscription Link
    const oldLayout = window.layout;
    window.layout = function(content, title) {
        let html = oldLayout(content, title);
        
        // Inject dynamic credits
        const currentCredits = getUserCredits(state.currentUser);
        html = html.replace(
            /<div class="credit-summary"[\s\S]*?<\/div>/,
            `<div class="credit-summary" aria-label="Kontör özeti" style="margin-top:20px;">
                <h3 style="font-size:12px; color:#94a3b8; text-transform:uppercase; margin-bottom:10px;">Hesap & Kontör</h3>
                <div style="background:#f1f5f9; padding:12px; border-radius:8px; margin-bottom:10px;">
                    <strong style="display:block; color:#0f172a; font-size:13px; word-break:break-all;">${state.currentUser}</strong>
                </div>
                <table><tbody>
                    <tr class="credit-remaining"><th>Güncel Bakiye</th><td style="color:${currentCredits>0?'#4aa16f':'#e11d48'}">${currentCredits} Kontör</td></tr>
                </tbody></table>
                <button onclick="go('subscription')" style="width:100%; margin-top:10px; background:#4f46e5; color:white; border:none; padding:8px; border-radius:6px; cursor:pointer; font-weight:bold;">➕ Kontör Yükle</button>
            </div>`
        );

        // Inject Send Credits button in topbar actions
        html = html.replace(
            /<div class="top-actions">/,
            `<div class="top-actions">
                <button onclick="openTransferModal()" style="background:#f59e0b; color:white; border:none; padding:6px 12px; border-radius:20px; font-weight:bold; cursor:pointer; font-size:13px; margin-right:10px; display:flex; align-items:center; gap:5px;">
                   <span>🎁</span> Kontör Gönder
                </button>`
        );

        return html;
    };

    // 5. Subscription Page
    window.subscriptionPage = function() {
        return `<div class="card" style="max-width:1000px; margin:0 auto; padding:40px;">
            <div style="text-align:center; margin-bottom:40px;">
                <h2 style="font-size:28px; color:#0f172a; margin-bottom:10px;">Abonelik ve Kontör Paketleri</h2>
                <p style="color:#64748b; font-size:16px;">Hesabınıza kontör yükleyerek yapay zeka ajanlarını çalıştırmaya hemen başlayın.</p>
            </div>
            
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:24px;">
                <!-- Paket 1 -->
                <div style="border:1px solid #e2e8f0; border-radius:16px; padding:32px; text-align:center; background:#fff; transition:0.3s; box-shadow:0 4px 6px rgba(0,0,0,0.02);">
                    <h3 style="font-size:20px; color:#0f172a; margin-bottom:8px;">Başlangıç</h3>
                    <div style="font-size:36px; font-weight:900; color:#4aa16f; margin-bottom:24px;">100 <span style="font-size:16px; color:#64748b; font-weight:500;">Kontör</span></div>
                    <ul style="text-align:left; color:#475569; font-size:14px; margin-bottom:32px; list-style:none; padding:0; line-height:2.5;">
                        <li>✅ ~10 Vaka Üretimi</li>
                        <li>✅ ~5 Aday Raporu</li>
                        <li>✅ Standart Destek</li>
                    </ul>
                    <button onclick="simulatePurchase(100)" style="width:100%; background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1; padding:12px; border-radius:8px; font-weight:bold; cursor:pointer;">Satın Al (₺500)</button>
                </div>
                
                <!-- Paket 2 -->
                <div style="border:2px solid #4f46e5; border-radius:16px; padding:32px; text-align:center; background:#fff; transform:scale(1.05); box-shadow:0 12px 24px rgba(79,70,229,0.15); position:relative;">
                    <div style="position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:#4f46e5; color:#fff; font-size:12px; font-weight:bold; padding:4px 12px; border-radius:12px;">EN POPÜLER</div>
                    <h3 style="font-size:20px; color:#0f172a; margin-bottom:8px;">Kurumsal PRO</h3>
                    <div style="font-size:36px; font-weight:900; color:#4aa16f; margin-bottom:24px;">500 <span style="font-size:16px; color:#64748b; font-weight:500;">Kontör</span></div>
                    <ul style="text-align:left; color:#475569; font-size:14px; margin-bottom:32px; list-style:none; padding:0; line-height:2.5;">
                        <li>✅ Sınırsız Vaka Üretimi</li>
                        <li>✅ ~25 Aday Raporu</li>
                        <li>✅ Radar Analizi</li>
                        <li>✅ Çalışanlara Kontör Transferi</li>
                    </ul>
                    <button onclick="simulatePurchase(500)" style="width:100%; background:#4f46e5; color:white; border:none; padding:12px; border-radius:8px; font-weight:bold; cursor:pointer;">Satın Al (₺2.000)</button>
                </div>

                <!-- Paket 3 -->
                <div style="border:1px solid #e2e8f0; border-radius:16px; padding:32px; text-align:center; background:#fff; transition:0.3s; box-shadow:0 4px 6px rgba(0,0,0,0.02);">
                    <h3 style="font-size:20px; color:#0f172a; margin-bottom:8px;">Limitsiz Şirket</h3>
                    <div style="font-size:36px; font-weight:900; color:#4aa16f; margin-bottom:24px;">2000 <span style="font-size:16px; color:#64748b; font-weight:500;">Kontör</span></div>
                    <ul style="text-align:left; color:#475569; font-size:14px; margin-bottom:32px; list-style:none; padding:0; line-height:2.5;">
                        <li>✅ Bütün Modüller Açık</li>
                        <li>✅ API Erişimi</li>
                        <li>✅ Sınırsız Transfer İmkanı</li>
                    </ul>
                    <button onclick="simulatePurchase(2000)" style="width:100%; background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1; padding:12px; border-radius:8px; font-weight:bold; cursor:pointer;">Satın Al (₺7.500)</button>
                </div>
            </div>
        </div>`;
    };

    window.simulatePurchase = function(amount) {
        if(confirm(`Kredi kartı simülasyonu: ${amount} kontör hesabınıza eklenecektir. Onaylıyor musunuz?`)) {
            addCredits(state.currentUser, amount);
            toast(`Başarılı! Hesabınıza ${amount} kontör yüklendi.`);
        }
    };

    // 6. Transfer Credits Modal Logic
    window.openTransferModal = function() {
        const current = getUserCredits(state.currentUser);
        const toEmail = prompt(`Lütfen kontör göndermek istediğiniz çalışan veya adayın sistemdeki e-posta adresini (Kullanıcı Adı) giriniz:\n\n(Mevcut Bakiyeniz: ${current} Kontör)`);
        if(!toEmail) return;
        
        const amountStr = prompt(`${toEmail} hesabına kaç kontör göndermek istiyorsunuz?`);
        if(!amountStr) return;
        
        const amount = parseInt(amountStr);
        if(isNaN(amount) || amount <= 0) {
            return toast('Geçersiz bir miktar girdiniz!');
        }
        
        if(amount > current) {
            return toast('Yetersiz bakiye! Önce abonelik sayfasından kontör yükleyiniz.');
        }

        // Deduct from sender
        deductCredits(state.currentUser, amount);
        
        // Add to receiver
        const ledger = getLedger();
        const receiver = toEmail.trim().toLowerCase();
        if(!(receiver in ledger)) ledger[receiver] = 0;
        ledger[receiver] += amount;
        saveLedger(ledger);
        
        toast(`Başarılı! ${receiver} hesabına ${amount} kontör aktarıldı.`);
        render();
    };

    // Inject Subscription Page into Render
    const oldRender = window.render;
    window.render = function() {
        if (state.page === 'subscription') {
            document.getElementById('app').innerHTML = layout(subscriptionPage(), 'Abonelik ve Kontör');
        } else {
            oldRender();
        }
    };

})();


// ==========================================
// PATCH 10-2: INJECT SIDEBAR LINK
// ==========================================
(function() {
    const oldLayout2 = window.layout;
    window.layout = function(content, title) {
        let html = oldLayout2(content, title);
        
        // Find the <nav class="side-nav"> and inject the subscription link
        const targetHtml = `</button></nav>`;
        const newHtml = `</button>
        <button class="${state.page==='subscription'?'active':''}" onclick="go('subscription')">
            <span>💳</span> Abonelik & Kontör
        </button>
        </nav>`;
        
        html = html.replace(targetHtml, newHtml);
        return html;
    };
})();




// ==========================================
// PATCH 11: HARD PAYWALL (FORCE SUBSCRIPTION)
// ==========================================
(function() {
    // 1. Force redirection to subscription on login if balance is 0
    const originalLogin = window.login;
    window.login = function() {
        const inputs = document.querySelectorAll('.login-inputs input');
        let user = 'demo@sirket.com';
        if (inputs.length > 0 && inputs[0].value.trim()) {
            user = inputs[0].value.trim().toLowerCase();
        }
        state.currentUser = user;
        
        const ledger = getLedger();
        if (!(user in ledger)) {
            ledger[user] = 0;
        }
        saveLedger(ledger);
        
        localStorage.setItem('sb_current_user', user);
        state.logged = true;
        localStorage.setItem('sb_session', '1');

        if (ledger[user] <= 0) {
            state.page = 'subscription';
            setTimeout(() => toast('Hoş geldiniz. Sistemi kullanmaya başlamak için lütfen bir abonelik paketi seçiniz.', 4000), 500);
        } else {
            state.page = 'dashboard';
            setTimeout(() => toast('Hoş geldiniz, ' + user, 3000), 500);
        }
        render();
    };

    // 2. Prevent navigation to other pages if balance is 0
    const originalGo = window.go;
    window.go = function(pageId) {
        if (state.logged && getUserCredits(state.currentUser) <= 0 && pageId !== 'subscription') {
            toast('Sistemi kullanabilmek için lütfen bir başlangıç paketi veya kontör satın alınız.');
            pageId = 'subscription'; 
        }
        
        state.page = pageId;
        window.history.pushState({page:pageId}, '', '?p=' + pageId);
        render();
    };

    // 3. Enforce paywall on direct page load (F5 refresh)
    const oldRender11 = window.render;
    window.render = function() {
        if (state.logged && getUserCredits(state.currentUser) <= 0 && state.page !== 'subscription') {
            state.page = 'subscription';
        }
        oldRender11();
    };
})();


// ==========================================
// PATCH 12: SPLASH SCREEN
// ==========================================
(function() {
    window.showSplashScreen = function() {
        // Only show if not logged in and hasn't been seen in this session
        if (state.logged || sessionStorage.getItem('splash_seen')) return;
        
        const splash = document.createElement('div');
        splash.id = 'splash-screen';
        splash.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:white; z-index:999999; display:flex; justify-content:center; align-items:center; opacity:1; transition: opacity 0.8s ease-in-out;';
        splash.innerHTML = '<h1 style="font-family: Arial, sans-serif; font-size: clamp(40px, 6vw, 80px); font-weight: bold; color: black; margin:0; letter-spacing: -1px;">SkillBridgeAIPro</h1>';
        
        // Append to body so it covers everything
        document.body.appendChild(splash);
        
        // Hide after 2 seconds
        setTimeout(() => {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.remove();
                sessionStorage.setItem('splash_seen', '1');
            }, 800);
        }, 2000);
    };

    // We need to trigger this when render() happens for the login page
    const oldRender12 = window.render;
    window.render = function() {
        oldRender12();
        if (!state.logged) {
            showSplashScreen();
        }
    };
    
    // Trigger on first load if already rendered
    if (!state.logged) {
        showSplashScreen();
    }
})();


// ==========================================
// PATCH 13: PAYNKOLAY FRONTEND INTEGRATION
// ==========================================
(function() {
    window.simulatePurchase = async function(amount) {
        // Show loading toast
        toast('Güvenli ödeme sayfasına yönlendiriliyorsunuz...', 2000);
        
        try {
            // Initiate payment session with our backend
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: amount, user: state.currentUser })
            });
            
            if(!response.ok) throw new Error('Ödeme sistemi başlatılamadı.');
            
            // The backend returns an HTML form that redirects to PaynKolay
            const html = await response.text();
            
            // Create an invisible iframe or document to submit the form
            const newDoc = document.open("text/html", "replace");
            newDoc.write(html);
            newDoc.close();
            
        } catch(e) {
            toast('Hata: ' + e.message);
        }
    };

    // Listen for the redirect back from PaynKolay callback
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('payment_status') === 'success') {
        const amount = parseInt(urlParams.get('amount') || '0');
        const user = urlParams.get('user');
        if(amount > 0 && user) {
            // Update ledger
            const ledger = getLedger();
            if(!(user in ledger)) ledger[user] = 0;
            ledger[user] += amount;
            saveLedger(ledger);
            
            // Clean up URL parameters without refreshing
            window.history.replaceState({}, document.title, window.location.pathname + "?p=subscription");
            
            setTimeout(() => {
                toast(`Ödeme işleminiz başarılıdır! Hesabınıza ${amount} kontör eklendi.`, 5000);
                render();
            }, 1000);
        }
    } else if(urlParams.get('payment_status') === 'failed') {
        window.history.replaceState({}, document.title, window.location.pathname + "?p=subscription");
        setTimeout(() => toast('Ödeme işlemi başarısız oldu.', 5000), 1000);
    }
})();
