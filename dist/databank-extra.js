// ==========================================
// DATABANK GENİŞLETME — Formdan Vaka Yarat tanımları
// Sektör > Alt Sektör > { functions, departments, expertises, positions, certificates }
// ==========================================
(function () {
  if (!window.DATABANK) return;
  const S = (functions, departments, expertises, positions, certificates) =>
    ({ functions, departments, expertises, positions, certificates });

  const EXTRA = {
    "Teknoloji & Bilişim": {
      "Yazılım Geliştirme": S(["Uygulama Geliştirme", "Kalite Güvence & Test", "Mimari & Altyapı"], ["Platform Ekibi", "QA"], ["Mikroservis Mimarisi", "Test Otomasyonu", "API Tasarımı"], ["QA Mühendisi", "Engineering Manager"], ["ISTQB Foundation", "Certified Kubernetes Application Developer (CKAD)"]),
      "Siber Güvenlik": S(["Güvenlik Operasyonları (SOC)", "Uyum & Denetim", "Olay Müdahale"], ["SOC", "Bilgi Güvenliği Uyum"], ["Tehdit İstihbaratı", "SIEM Yönetimi", "KVKK / GDPR Uyum"], ["SOC Analisti", "Olay Müdahale Uzmanı"], ["ISO 27001 Lead Auditor", "OSCP"]),
      "Veri & Yapay Zeka": S(["Veri Analitiği", "Makine Öğrenmesi", "Veri Yönetişimi"], ["MLOps"], ["Doğal Dil İşleme", "Bilgisayarlı Görü", "MLOps", "Üretken Yapay Zeka"], ["ML Mühendisi", "Veri Yönetişimi Uzmanı"], ["Microsoft Azure AI Engineer", "TensorFlow Developer Certificate"]),
      "Bulut & Altyapı": S(["Bulut Mimarisi", "Sistem Yönetimi", "Ağ Yönetimi"], ["BT Altyapı", "Bulut Operasyonları", "Ağ ve Sistem"], ["AWS / Azure / GCP", "Kubernetes", "Altyapı Kod Olarak (IaC)", "Ağ Tasarımı"], ["Sistem Yöneticisi", "Bulut Mühendisi", "Ağ Mühendisi", "Site Reliability Engineer", "BT Altyapı Müdürü"], ["AWS Solutions Architect", "CCNA", "CCNP", "Certified Kubernetes Administrator (CKA)", "Red Hat RHCE"]),
      "Ürün Yönetimi": S(["Ürün Stratejisi", "Kullanıcı Deneyimi", "Ürün Analitiği"], ["Ürün Yönetimi", "UX/UI Tasarım"], ["Ürün Yol Haritası", "Kullanıcı Araştırması", "A/B Testi", "UX/UI Tasarım"], ["Ürün Sahibi", "Ürün Yöneticisi", "UX Tasarımcısı", "Ürün Direktörü"], ["Certified Scrum Product Owner (CSPO)", "Pragmatic Institute PMC", "Google UX Design"]),
      "BT Hizmet Yönetimi": S(["Teknik Destek", "Hizmet Yönetimi", "BT Proje Yönetimi"], ["Yardım Masası", "BT Hizmetleri", "PMO"], ["ITIL Süreçleri", "SLA Yönetimi", "Varlık Yönetimi"], ["Yardım Masası Uzmanı", "BT Destek Uzmanı", "BT Proje Yöneticisi", "BT Müdürü"], ["ITIL 4 Foundation", "PMP", "CompTIA A+"])
    },
    "Finans & Bankacılık": {
      "Kurumsal Finans": S(["Finansal Planlama & Analiz", "Hazine", "Muhasebe"], ["Muhasebe", "Vergi"], ["Konsolidasyon", "IFRS Raporlama", "Maliyet Muhasebesi"], ["Muhasebe Uzmanı", "Mali İşler Müdürü"], ["ACCA", "IFRS Sertifikası"]),
      "Bireysel Bankacılık": S(["Şube Operasyonları", "Satış & Portföy", "Kredi"], ["Dijital Bankacılık"], ["Çapraz Satış", "Kredi Kartı Ürünleri", "Mevduat Ürünleri"], ["Operasyon Yetkilisi", "Bireysel Krediler Uzmanı"], ["Bankacılık Uzmanlık Sertifikası"]),
      "Kurumsal & Ticari Bankacılık": S(["Kurumsal Kredi", "Dış Ticaret Finansmanı", "Nakit Yönetimi"], ["Kurumsal Bankacılık", "Ticari Krediler", "Dış Ticaret Operasyonları"], ["Finansal Analiz", "Proje Finansmanı", "Akreditif & Teminat Mektubu"], ["Kurumsal Müşteri Temsilcisi", "Kredi Analisti", "Ticari Şube Müdürü", "Kurumsal Bankacılık Direktörü"], ["SPK Düzey 3", "CDCS (Akreditif Uzmanlığı)"]),
      "Yatırım & Sermaye Piyasaları": S(["Portföy Yönetimi", "Kurumsal Finansman (M&A)", "Araştırma"], ["Yatırım Bankacılığı", "Hazine ve Piyasalar", "Araştırma"], ["Değerleme", "Birleşme & Satın Alma", "Türev Ürünler", "Hisse Analizi"], ["Yatırım Analisti", "Portföy Yöneticisi", "M&A Uzmanı", "Hazine Müdürü"], ["CFA", "FRM", "SPK Türev Araçlar", "SPK Kurumsal Yönetim Derecelendirme"]),
      "Sigortacılık": S(["Hasar Yönetimi", "Aktüerya", "Underwriting (Risk Kabul)"], ["Hasar", "Teknik Departman", "Acente Yönetimi"], ["Hayat Dışı Sigorta", "Hayat & Emeklilik", "Risk Kabul", "Reasürans"], ["Hasar Uzmanı", "Aktüer", "Underwriter", "Acente Satış Müdürü"], ["SEGEM Teknik Personel", "Aktüerya Sertifikası", "CII Diploma"]),
      "Denetim & Risk": S(["İç Denetim", "Risk Yönetimi", "Uyum (Compliance)"], ["İç Denetim", "Risk Yönetimi", "Uyum"], ["Kredi Riski", "Operasyonel Risk", "AML / Suç Gelirlerinin Aklanması", "Basel Düzenlemeleri"], ["İç Denetçi", "Risk Analisti", "Uyum Uzmanı", "Teftiş Kurulu Başkanı"], ["CIA", "CISA", "CAMS", "Bağımsız Denetçi (KGK)"])
    },
    "İnsan Kaynakları": {
      "İşe Alım & Yetenek": S(["İşe Alım", "Yetenek Yönetimi", "İşveren Markası"], ["Yetenek Kazanımı"], ["Yetkinlik Bazlı Mülakat", "Değerlendirme Merkezi", "Yedekleme Planlama"], ["Yetenek Yönetimi Uzmanı", "İK İş Ortağı"], ["Değerlendirme Merkezi Sertifikası", "LinkedIn Certified Recruiter"]),
      "Eğitim & Gelişim": S(["Eğitim Planlama", "Liderlik Gelişimi", "Dijital Öğrenme"], ["Organizasyonel Gelişim"], ["E-Öğrenme Tasarımı", "Eğitim Etki Ölçümü (Kirkpatrick)"], ["Öğrenme ve Gelişim Müdürü"], ["ATD CPTD", "Kirkpatrick Sertifikası"]),
      "Ücret & Yan Haklar": S(["Ücret Yönetimi", "Bordro", "Performans Yönetimi"], ["Ücret ve Yan Haklar", "Bordro", "Performans"], ["Ücret Araştırması", "Kademe Yapılandırma", "Bordro Mevzuatı", "Performans Sistemleri"], ["Bordro Uzmanı", "Ücret Yönetimi Uzmanı", "Performans Yönetimi Uzmanı", "Toplam Ödüllendirme Müdürü"], ["WorldatWork CCP", "Bordro Uzmanlığı Sertifikası"]),
      "Çalışan İlişkileri & İK Operasyonları": S(["Çalışan İlişkileri", "İK Operasyonları", "İş Hukuku Uygulamaları"], ["Çalışan Deneyimi", "İK Operasyon", "Endüstriyel İlişkiler"], ["İş Hukuku", "Toplu Sözleşme", "Çalışan Bağlılığı", "İK Analitiği"], ["İK Uzmanı", "Endüstriyel İlişkiler Uzmanı", "İK Müdürü", "İK Direktörü (CHRO)"], ["SHRM-SCP", "SPHR", "People Analytics Sertifikası"])
    },
    "Satış & Pazarlama": {
      "Dijital Pazarlama": S(["Performans Pazarlama", "İçerik & Sosyal Medya", "Pazarlama Analitiği"], ["Büyüme (Growth)"], ["Pazarlama Otomasyonu", "Web Analitiği", "Growth Hacking"], ["SEO Uzmanı", "Sosyal Medya Uzmanı", "Growth Manager"], ["Google Analytics Certification", "Semrush SEO"]),
      "Kurumsal Satış (B2B)": S(["Saha Satışı", "İş Geliştirme", "Satış Operasyonları"], ["Satış Operasyonları"], ["Satış Hunisi Yönetimi", "CRM (Salesforce)", "İhale Yönetimi"], ["İş Geliştirme Uzmanı", "Bölge Satış Müdürü"], ["Salesforce Certified Administrator", "Miller Heiman"]),
      "Marka Yönetimi": S(["Marka Stratejisi", "Ürün Pazarlama", "Pazar Araştırması"], ["Marka Yönetimi", "Ürün Pazarlama", "Tüketici İçgörü"], ["Marka Konumlandırma", "Lansman Yönetimi", "Tüketici Araştırması", "Trade Marketing"], ["Marka Uzmanı", "Marka Müdürü", "Ürün Pazarlama Müdürü", "Pazarlama Direktörü"], ["CIM Professional Diploma", "Nielsen Analitik Sertifikası"]),
      "Müşteri Deneyimi & Çağrı Merkezi": S(["Müşteri Hizmetleri", "Müşteri Deneyimi (CX)", "Kalite İzleme"], ["Çağrı Merkezi", "Müşteri Deneyimi", "Şikâyet Yönetimi"], ["NPS / CSAT Yönetimi", "Müşteri Yolculuğu Haritalama", "Şikâyet Yönetimi"], ["Müşteri Temsilcisi", "Takım Lideri", "CX Uzmanı", "Müşteri Deneyimi Müdürü"], ["COPC Sertifikası", "CCXP"])
    },
    "Üretim & Sanayi": {
      "Üretim Yönetimi": S(["Üretim Planlama", "Vardiya Yönetimi", "Yalın Üretim"], ["Üretim", "Üretim Planlama", "Sürekli İyileştirme"], ["Yalın Üretim", "OEE İyileştirme", "Kapasite Planlama", "5S / Kaizen"], ["Üretim Mühendisi", "Vardiya Amiri", "Üretim Şefi", "Fabrika Müdürü"], ["Lean Six Sigma Green Belt", "Lean Six Sigma Black Belt", "APICS CPIM"]),
      "Kalite Yönetimi": S(["Kalite Güvence", "Kalite Kontrol", "Tedarikçi Kalitesi"], ["Kalite Güvence", "Kalite Kontrol", "Laboratuvar"], ["Kök Neden Analizi (8D)", "FMEA", "İstatistiksel Proses Kontrol (SPC)", "Ölçüm Sistemleri Analizi"], ["Kalite Kontrol Teknisyeni", "Kalite Mühendisi", "Tedarikçi Kalite Mühendisi", "Kalite Müdürü"], ["ISO 9001 Baş Denetçi", "IATF 16949", "ASQ CQE"]),
      "Bakım & Onarım": S(["Planlı Bakım", "Arıza Müdahale", "Kestirimci Bakım"], ["Bakım", "Teknik Hizmetler", "Enerji Yönetimi"], ["TPM (Toplam Verimli Bakım)", "Titreşim Analizi", "PLC / Otomasyon", "Hidrolik & Pnömatik"], ["Bakım Teknisyeni", "Bakım Mühendisi", "Otomasyon Mühendisi", "Bakım Müdürü"], ["TPM Sertifikası", "Siemens PLC Sertifikası", "Titreşim Analisti Kategori II"]),
      "İş Sağlığı & Çevre": S(["İSG Yönetimi", "Çevre Yönetimi", "Acil Durum Yönetimi"], ["İSG", "Çevre", "Sürdürülebilirlik"], ["Risk Değerlendirmesi", "Kaza Araştırma", "Atık Yönetimi", "Karbon Ayak İzi"], ["İSG Uzmanı", "Çevre Mühendisi", "Sürdürülebilirlik Uzmanı", "SEÇ (HSE) Müdürü"], ["A Sınıfı İş Güvenliği Uzmanlığı", "ISO 45001", "ISO 14001", "NEBOSH IGC"])
    },
    "Lojistik & Tedarik Zinciri": {
      "Depo & Dağıtım": S(["Depo Operasyonları", "Stok Yönetimi", "Dağıtım Planlama"], ["Depo", "Sevkiyat", "Stok Kontrol"], ["WMS Kullanımı", "Stok Optimizasyonu", "Rota Optimizasyonu", "Cross-Docking"], ["Depo Sorumlusu", "Sevkiyat Uzmanı", "Depo Şefi", "Dağıtım Müdürü"], ["Forklift Operatör Belgesi", "SRC Belgesi", "APICS CLTD"]),
      "Satın Alma & Tedarik": S(["Stratejik Satın Alma", "Tedarikçi Yönetimi", "Talep Planlama"], ["Satın Alma", "Tedarik Zinciri Planlama"], ["Tedarikçi Değerlendirme", "Müzakere", "Talep Tahminleme", "S&OP"], ["Satın Alma Uzmanı", "Talep Planlama Uzmanı", "Satın Alma Müdürü", "Tedarik Zinciri Direktörü"], ["CIPS", "APICS CSCP", "CPSM"]),
      "Dış Ticaret & Gümrük": S(["İthalat", "İhracat", "Gümrük Operasyonları"], ["Dış Ticaret", "Gümrük", "Uluslararası Taşımacılık"], ["Incoterms", "Gümrük Mevzuatı", "Akreditifli İşlemler", "Navlun Yönetimi"], ["Dış Ticaret Uzmanı", "Gümrük Müşaviri Yardımcısı", "Operasyon Uzmanı", "Dış Ticaret Müdürü"], ["Gümrük Müşavirliği Belgesi", "FIATA Diploma", "Yetkilendirilmiş Yükümlü (AEO)"]),
      "Taşımacılık & Filo": S(["Filo Yönetimi", "Kara Taşımacılığı", "Soğuk Zincir"], ["Filo", "Operasyon", "Planlama"], ["Araç Takip Sistemleri", "Yakıt Verimliliği", "ADR Tehlikeli Madde", "Soğuk Zincir Yönetimi"], ["Filo Sorumlusu", "Operasyon Planlama Uzmanı", "Filo Müdürü"], ["ADR Belgesi", "K Yetki Belgesi", "SRC 3-4"])
    },
    "Sağlık Hizmetleri": {
      "Hastane Yönetimi": S(["Hasta Hizmetleri", "Sağlık Bilgi Sistemleri", "Akreditasyon & Kalite"], ["Hasta Hakları", "Tıbbi Kayıt", "Sağlıkta Kalite"], ["Sağlıkta Kalite Standartları (SKS)", "JCI Akreditasyonu", "Hasta Güvenliği", "HBYS"], ["Hasta Hizmetleri Uzmanı", "Sağlık Kalite Yöneticisi", "Başhekim Yardımcısı", "Hastane Müdürü"], ["JCI Sertifikası", "Sağlık Kurumları Yöneticiliği", "Lean Healthcare"]),
      "Klinik Hizmetler": S(["Hemşirelik", "Acil Servis", "Yoğun Bakım"], ["Hemşirelik Hizmetleri", "Acil Servis", "Yoğun Bakım"], ["Triyaj", "Enfeksiyon Kontrolü", "İlaç Güvenliği", "Temel / İleri Yaşam Desteği"], ["Hemşire", "Sorumlu Hemşire", "Acil Tıp Teknisyeni", "Başhemşire"], ["İleri Kardiyak Yaşam Desteği (ACLS)", "Yoğun Bakım Hemşireliği Sertifikası", "Enfeksiyon Kontrol Hemşireliği"]),
      "Tıbbi Cihaz & Biyomedikal": S(["Biyomedikal Mühendislik", "Klinik Destek", "Satış & Uygulama"], ["Biyomedikal", "Teknik Servis", "Uygulama"], ["Kalibrasyon", "MDR Mevzuatı", "Cihaz Bakım Yönetimi"], ["Biyomedikal Mühendisi", "Uygulama Uzmanı", "Teknik Servis Müdürü"], ["ISO 13485", "MDR Sertifikası"])
    },
    "İlaç & Biyoteknoloji": {
      "Ar-Ge & Klinik Araştırma": S(["Formülasyon Geliştirme", "Klinik Araştırma", "Biyoteknoloji Ar-Ge"], ["Ar-Ge", "Klinik Araştırmalar", "Biyoanalitik"], ["Klinik Araştırma Yönetimi (GCP)", "Biyobenzer Geliştirme", "Analitik Metot Validasyonu"], ["Ar-Ge Uzmanı", "Klinik Araştırma Uzmanı (CRA)", "Klinik Proje Yöneticisi", "Ar-Ge Direktörü"], ["ICH-GCP", "ACRP CCRA"]),
      "Üretim & Kalite (GMP)": S(["Steril Üretim", "Kalite Kontrol", "Validasyon"], ["Üretim", "Kalite Kontrol", "Kalite Güvence", "Validasyon"], ["GMP", "Temizlik Validasyonu", "Sapma & CAPA Yönetimi", "Veri Bütünlüğü"], ["Üretim Sorumlusu", "QC Analisti", "Validasyon Uzmanı", "Mesul Müdür"], ["GMP Sertifikası", "ISPE Sertifikası", "Qualified Person (QP)"]),
      "Ruhsatlandırma & Farmakovijilans": S(["Ruhsatlandırma", "Farmakovijilans", "Medikal İşler"], ["Regülasyon", "Farmakovijilans", "Medikal"], ["TİTCK Mevzuatı", "CTD Dosyalama", "Advers Etki Raporlama"], ["Ruhsatlandırma Uzmanı", "Farmakovijilans Sorumlusu", "Medikal Müdür"], ["RAPS RAC", "Farmakovijilans Eğitimi Sertifikası"]),
      "Satış & Pazarlama (İlaç)": S(["Tıbbi Tanıtım", "Ürün Yönetimi", "Pazar Erişimi"], ["Satış", "Pazarlama", "Pazar Erişimi"], ["Tıbbi Tanıtım", "Ürün Konumlandırma", "Geri Ödeme Süreçleri"], ["Tıbbi Mümessil", "Bölge Müdürü", "Ürün Müdürü", "İş Birimi Direktörü"], ["Tıbbi Tanıtım Temsilcisi Belgesi (TİTCK)"])
    },
    "Enerji & Altyapı": {
      "Elektrik Üretim & Dağıtım": S(["Santral İşletme", "Şebeke Yönetimi", "Enerji Ticareti"], ["İşletme", "Şebeke Operasyon", "Enerji Ticareti"], ["SCADA", "Koruma & Röle", "Yük Tevzi", "Enerji Piyasası (EPİAŞ)"], ["Elektrik Mühendisi", "Santral Operatörü", "Enerji Ticaret Uzmanı", "İşletme Müdürü"], ["EKAT Belgesi", "Elektrik Yüksek Gerilim İşletme Sorumluluğu", "SMM Belgesi"]),
      "Yenilenebilir Enerji": S(["Proje Geliştirme", "Saha İşletme", "Performans Analizi"], ["Proje Geliştirme", "O&M", "Mühendislik"], ["GES / RES Tasarımı", "Enerji Verimi Analizi", "Lisanslama", "Batarya Depolama"], ["Proje Mühendisi", "O&M Teknisyeni", "Saha Müdürü", "Proje Geliştirme Direktörü"], ["GES Kurulum Sertifikası", "GWO Temel Güvenlik", "LEED AP"]),
      "Petrol & Doğalgaz": S(["Arama & Üretim", "Rafineri İşletme", "Boru Hattı & Dağıtım"], ["Proses", "Bakım", "HSE"], ["Proses Güvenliği (PSM)", "Boru Hattı Bütünlüğü", "Rafineri Optimizasyonu"], ["Proses Mühendisi", "Saha Operatörü", "HSE Uzmanı", "Rafineri Müdürü"], ["API 510 / 570", "IWCF", "NEBOSH Oil & Gas"]),
      "Enerji Verimliliği": S(["Enerji Etüdü", "Enerji Yönetimi", "Danışmanlık"], ["Enerji Yönetimi", "Teknik Hizmetler"], ["Enerji Etüdü", "ISO 50001", "Isı Geri Kazanımı"], ["Enerji Yöneticisi", "Enerji Verimliliği Uzmanı", "EVD Proje Müdürü"], ["Enerji Yöneticisi Sertifikası", "EVD Etüt Proje Sertifikası", "CEM (AEE)"])
    },
    "İnşaat & Gayrimenkul": {
      "Proje & Saha Yönetimi": S(["Saha Yönetimi", "Planlama & Maliyet", "Hakediş & Sözleşme"], ["Şantiye", "Planlama", "Teknik Ofis"], ["Primavera P6", "Hakediş Hazırlama", "Metraj & Keşif", "FIDIC Sözleşmeleri"], ["Saha Mühendisi", "Teknik Ofis Mühendisi", "Şantiye Şefi", "Proje Müdürü"], ["PMP", "Primavera P6 Sertifikası", "Şantiye Şefliği Belgesi"]),
      "Tasarım & Mühendislik": S(["Mimari Tasarım", "Statik Proje", "MEP Tasarım"], ["Mimari", "Statik", "Mekanik-Elektrik"], ["BIM (Revit)", "Deprem Yönetmeliği", "Yapısal Analiz", "MEP Koordinasyon"], ["Mimar", "İnşaat Mühendisi", "BIM Uzmanı", "Tasarım Müdürü"], ["Autodesk Revit Certified", "BIM Yönetici Sertifikası"]),
      "Gayrimenkul Geliştirme & Yönetimi": S(["Proje Geliştirme", "Satış & Kiralama", "Tesis Yönetimi"], ["Gayrimenkul Geliştirme", "Satış", "Tesis Yönetimi"], ["Fizibilite", "Gayrimenkul Değerleme", "Kiracı Yönetimi", "Tesis Yönetimi"], ["Gayrimenkul Danışmanı", "Değerleme Uzmanı", "Tesis Müdürü", "Gayrimenkul Geliştirme Direktörü"], ["SPK Gayrimenkul Değerleme Lisansı", "Taşınmaz Ticareti Yetki Belgesi", "IFMA FMP"])
    },
    "Perakende & E-Ticaret": {
      "Mağazacılık": S(["Mağaza Operasyonları", "Görsel Düzenleme", "Bölge Yönetimi"], ["Mağaza Operasyon", "Görsel Mağazacılık", "Bölge Yönetimi"], ["Satış Noktası Yönetimi", "Stok Devir Hızı", "Görsel Düzenleme", "Kayıp-Kaçak Yönetimi"], ["Satış Danışmanı", "Mağaza Müdür Yardımcısı", "Mağaza Müdürü", "Bölge Müdürü"], ["Perakende Yönetimi Sertifikası"]),
      "Kategori & Merchandising": S(["Kategori Yönetimi", "Planlama & Allocation", "Fiyatlandırma"], ["Kategori Yönetimi", "Merchandising", "Fiyatlandırma"], ["Kategori Analizi", "Planogram", "Fiyat Optimizasyonu", "Tedarikçi Müzakeresi"], ["Kategori Uzmanı", "Merchandise Planner", "Kategori Müdürü", "Ticaret Direktörü"], ["Category Management Association CPCM"]),
      "E-Ticaret": S(["Pazaryeri Yönetimi", "E-Ticaret Operasyonları", "Dijital Ürün"], ["E-Ticaret", "Pazaryeri", "Müşteri Hizmetleri"], ["Pazaryeri Yönetimi", "Dönüşüm Oranı Optimizasyonu", "Son Mil Teslimat", "İade Yönetimi"], ["E-Ticaret Uzmanı", "Pazaryeri Yöneticisi", "E-Ticaret Müdürü"], ["Google Ads Shopping", "Amazon Seller Sertifikası"])
    },
    "Otomotiv Sanayii": {
      "Araç Üretimi": S(["Montaj Hattı", "Kaynak & Boya", "Endüstri Mühendisliği"], ["Montaj", "Boyahane", "Kaynakhane", "Endüstri Mühendisliği"], ["Hat Dengeleme", "Robotik Kaynak", "Ergonomi", "Poka-Yoke"], ["Montaj Operatörü", "Proses Mühendisi", "Hat Lideri", "Üretim Müdürü"], ["IATF 16949", "Lean Six Sigma", "VDA 6.3"]),
      "Ar-Ge & Tasarım": S(["Ürün Geliştirme", "Test & Validasyon", "Elektrikli Araç Teknolojileri"], ["Ar-Ge", "Test", "Elektrik-Elektronik"], ["CAD (CATIA)", "Batarya Sistemleri", "Fonksiyonel Güvenlik (ISO 26262)", "ADAS"], ["Tasarım Mühendisi", "Test Mühendisi", "Batarya Mühendisi", "Ar-Ge Müdürü"], ["CATIA Sertifikası", "ISO 26262 Functional Safety Engineer", "Automotive SPICE"]),
      "Satış Sonrası & Servis": S(["Yetkili Servis", "Yedek Parça", "Garanti Yönetimi"], ["Servis", "Yedek Parça", "Garanti"], ["Arıza Teşhis", "Garanti Süreçleri", "Müşteri Memnuniyeti"], ["Servis Danışmanı", "Otomotiv Teknisyeni", "Servis Müdürü", "Satış Sonrası Direktörü"], ["MYK Otomotiv Mekatronik", "Hibrit/Elektrikli Araç Güvenliği Sertifikası"])
    },
    "Gıda & İçecek Sanayii": {
      "Gıda Üretimi": S(["Proses Yönetimi", "Ürün Geliştirme", "Ambalajlama"], ["Üretim", "Ar-Ge", "Ambalaj"], ["Gıda Prosesleri", "Raf Ömrü Çalışmaları", "Reçete Geliştirme"], ["Gıda Mühendisi", "Ar-Ge Uzmanı", "Üretim Şefi", "Fabrika Müdürü"], ["ISO 22000", "FSSC 22000"]),
      "Gıda Güvenliği & Kalite": S(["Gıda Güvenliği", "Laboratuvar", "Hijyen"], ["Kalite", "Laboratuvar", "Gıda Güvenliği"], ["HACCP", "Alerjen Yönetimi", "Mikrobiyolojik Analiz", "İzlenebilirlik"], ["Kalite Kontrol Uzmanı", "Gıda Güvenliği Uzmanı", "Kalite Müdürü"], ["HACCP Sertifikası", "BRCGS", "IFS Food"])
    },
    "Turizm & Konaklama": {
      "Otel İşletmeciliği": S(["Ön Büro", "Kat Hizmetleri", "Yiyecek & İçecek"], ["Ön Büro", "Housekeeping", "F&B", "Satış & Rezervasyon"], ["Gelir Yönetimi", "Misafir İlişkileri", "PMS (Opera)", "Ziyafet Yönetimi"], ["Resepsiyonist", "Misafir İlişkileri Müdürü", "F&B Müdürü", "Genel Müdür"], ["Opera PMS Sertifikası", "CHA (AHLEI)", "Revenue Management Sertifikası"]),
      "Seyahat & Tur Operatörlüğü": S(["Tur Operasyonu", "Satış & Rezervasyon", "Transfer"], ["Operasyon", "Rezervasyon", "Ürün"], ["Destinasyon Yönetimi", "GDS (Amadeus)", "Paket Tur Tasarımı"], ["Rezervasyon Uzmanı", "Tur Operasyon Uzmanı", "Ürün Müdürü"], ["Amadeus Sertifikası", "TÜRSAB Belgesi", "Profesyonel Turist Rehberliği"])
    },
    "Eğitim": {
      "Okul Öncesi & K-12": S(["Öğretim", "Rehberlik", "Okul Yönetimi"], ["Akademik Birim", "Rehberlik", "Okul Yönetimi"], ["Müfredat Geliştirme", "Sınıf Yönetimi", "Ölçme & Değerlendirme", "Özel Eğitim"], ["Öğretmen", "Rehber Öğretmen", "Bölüm Başkanı", "Okul Müdürü"], ["Pedagojik Formasyon", "IB Öğretmen Sertifikası", "Cambridge CELTA"]),
      "Yükseköğretim": S(["Akademik", "Öğrenci İşleri", "Araştırma Yönetimi"], ["Fakülte", "Öğrenci İşleri", "Proje Ofisi"], ["Akreditasyon", "Proje Yazımı (TÜBİTAK/AB)", "Öğrenci Deneyimi"], ["Araştırma Görevlisi", "Öğretim Üyesi", "Proje Ofisi Uzmanı", "Genel Sekreter"], ["Horizon Europe Proje Yönetimi"]),
      "EdTech & Kurumsal Eğitim": S(["İçerik Üretimi", "Öğretim Tasarımı", "Platform Yönetimi"], ["İçerik", "Öğretim Tasarımı", "Ürün"], ["Öğretim Tasarımı (ADDIE)", "LMS Yönetimi", "Mikro Öğrenme"], ["Öğretim Tasarımcısı", "İçerik Uzmanı", "Eğitim Programları Müdürü"], ["Articulate Storyline Sertifikası", "ATD Instructional Design"])
    },
    "Kamu Yönetimi": {
      "Merkezi & Yerel Yönetim": S(["İdari İşler", "Strateji Geliştirme", "Mali Hizmetler"], ["Strateji Geliştirme", "Mali Hizmetler", "İnsan Kaynakları", "Yazı İşleri"], ["Kamu İhale Mevzuatı", "Stratejik Planlama", "Kamu Mali Yönetimi", "E-Devlet Süreçleri"], ["Memur", "Uzman Yardımcısı", "Şube Müdürü", "Daire Başkanı"], ["Kamu İhale Uzmanlığı", "İç Kontrol Sertifikası"]),
      "Kamu Denetimi": S(["İç Denetim", "Teftiş", "Performans Denetimi"], ["İç Denetim Birimi", "Teftiş Kurulu"], ["Kamu İç Denetim Standartları", "Risk Bazlı Denetim"], ["İç Denetçi", "Müfettiş", "Başmüfettiş"], ["Kamu İç Denetçi Sertifikası", "CGAP"])
    },
    "Telekomünikasyon": {
      "Şebeke & Altyapı": S(["Radyo Şebeke", "Çekirdek Şebeke", "Fiber Altyapı"], ["Şebeke Planlama", "Şebeke Operasyon Merkezi (NOC)", "Saha Operasyon"], ["5G / LTE", "RF Optimizasyon", "Fiber Optik", "IP/MPLS"], ["RF Mühendisi", "NOC Mühendisi", "Saha Teknisyeni", "Şebeke Direktörü"], ["CCNP Service Provider", "Huawei HCIP", "Nokia SRA"]),
      "Telekom Ticari Operasyonlar": S(["Bireysel Satış", "Kurumsal Çözümler", "Tarife & Kampanya"], ["Bireysel Pazarlama", "Kurumsal Satış", "Gelir Güvencesi"], ["Abone Kayıp Analizi (Churn)", "Tarife Yönetimi", "Gelir Güvencesi"], ["Kampanya Uzmanı", "Kurumsal Satış Yöneticisi", "Gelir Güvencesi Uzmanı"], ["TM Forum Sertifikası"])
    },
    "Hukuk": {
      "Kurumsal Hukuk": S(["Şirketler Hukuku", "Sözleşme Yönetimi", "Uyum"], ["Hukuk Müşavirliği", "Sözleşmeler", "Uyum"], ["Sözleşme Müzakeresi", "Birleşme & Devralma", "KVKK", "Rekabet Hukuku"], ["Avukat", "Kıdemli Avukat", "Hukuk Müşaviri", "Hukuk Direktörü"], ["Avukatlık Ruhsatı", "Arabuluculuk Sertifikası", "KVKK Uzmanlığı"]),
      "Dava & Uyuşmazlık": S(["Dava Takibi", "Tahkim", "İcra & Tahsilat"], ["Dava", "İcra", "Tahkim"], ["Ticari Dava", "İş Hukuku Davaları", "Tahkim Süreçleri", "İcra İflas Hukuku"], ["Stajyer Avukat", "Avukat", "Ortak Avukat"], ["Uluslararası Tahkim Sertifikası (CIArb)", "Arabuluculuk Sertifikası"])
    },
    "Medya & İletişim": {
      "Kurumsal İletişim & PR": S(["Halkla İlişkiler", "Kriz İletişimi", "İç İletişim"], ["Kurumsal İletişim", "Halkla İlişkiler", "İç İletişim"], ["Medya İlişkileri", "Kriz İletişimi", "Kurumsal İtibar Yönetimi", "Sponsorluk"], ["PR Uzmanı", "Kurumsal İletişim Müdürü", "İletişim Direktörü"], ["CIPR Diploma", "Kriz İletişimi Sertifikası"]),
      "Yayıncılık & İçerik": S(["Haber & Editörlük", "Prodüksiyon", "Dijital Yayın"], ["Haber Merkezi", "Prodüksiyon", "Dijital Medya"], ["Editörlük", "Video Prodüksiyon", "Podcast Yapımı"], ["Muhabir", "Editör", "Yapımcı", "Yayın Yönetmeni"], ["Adobe Premiere Certified"])
    },
    "Tarım & Hayvancılık": {
      "Bitkisel Üretim": S(["Tarla Tarımı", "Seracılık", "Tarımsal Danışmanlık"], ["Üretim", "Ar-Ge", "Teknik Danışmanlık"], ["Akıllı Tarım", "Sulama Sistemleri", "Bitki Koruma", "İyi Tarım Uygulamaları"], ["Ziraat Mühendisi", "Sera Sorumlusu", "Tarım Danışmanı", "Çiftlik Müdürü"], ["GLOBALG.A.P.", "İyi Tarım Uygulamaları Sertifikası"]),
      "Hayvancılık": S(["Sürü Yönetimi", "Yem & Besleme", "Veteriner Hizmetler"], ["Üretim", "Veteriner", "Yem"], ["Sürü Sağlığı", "Rasyon Hazırlama", "Biyogüvenlik"], ["Zootekni Uzmanı", "Veteriner Hekim", "İşletme Müdürü"], ["Hayvan Refahı Sertifikası"])
    },
    "Havacılık & Savunma": {
      "Havacılık Operasyonları": S(["Uçuş Operasyonları", "Yer Hizmetleri", "Uçak Bakım"], ["Uçuş Operasyon", "Yer Hizmetleri", "Bakım (MRO)"], ["Uçuş Planlama", "Havacılık Emniyeti (SMS)", "Uçak Bakım Mevzuatı (Part-145)"], ["Uçuş Harekat Uzmanı", "Uçak Bakım Teknisyeni (B1/B2)", "Yer Hizmetleri Şefi", "Operasyon Direktörü"], ["SHY-66 Lisansı", "IATA Diploma", "EASA Part-66"]),
      "Savunma Sanayii": S(["Sistem Mühendisliği", "Gömülü Yazılım", "Proje Yönetimi"], ["Sistem Mühendisliği", "Yazılım", "Program Yönetimi"], ["Sistem Mühendisliği (V-Model)", "Gömülü Yazılım", "DO-178C", "Konfigürasyon Yönetimi"], ["Sistem Mühendisi", "Gömülü Yazılım Mühendisi", "Program Yöneticisi"], ["INCOSE CSEP", "AQAP 2110", "PMP"])
    },
    "Danışmanlık": {
      "Yönetim Danışmanlığı": S(["Strateji", "Operasyonel Mükemmellik", "Dijital Dönüşüm"], ["Strateji", "Operasyon", "Dijital"], ["Problem Yapılandırma", "Süreç Tasarımı", "Değişim Yönetimi", "İş Modeli Analizi"], ["Analist", "Danışman", "Kıdemli Danışman", "Ortak (Partner)"], ["Prosci Change Management", "CMC", "PMP"]),
      "Bağımsız Denetim & Vergi": S(["Bağımsız Denetim", "Vergi Danışmanlığı", "Transfer Fiyatlandırması"], ["Denetim", "Vergi", "Risk Danışmanlığı"], ["Finansal Tablo Denetimi", "Vergi Planlaması", "Transfer Fiyatlandırması"], ["Denetçi Yardımcısı", "Kıdemli Denetçi", "Vergi Müdürü", "Denetim Ortağı"], ["SMMM", "YMM", "Bağımsız Denetçi (KGK)", "ACCA"])
    },
    "Kimya & Petrokimya": {
      "Kimyasal Üretim": S(["Proses İşletme", "Ar-Ge", "Teknik Satış"], ["Proses", "Ar-Ge Laboratuvarı", "Teknik Hizmet"], ["Proses Kontrol", "Polimer Teknolojisi", "Kimyasal Güvenlik (SDS)", "REACH / KKDİK"], ["Kimya Mühendisi", "Laboratuvar Analisti", "Proses Şefi", "Tesis Müdürü"], ["KKDİK Değerlendirici Sertifikası", "ISO 14001", "HAZOP Lideri"])
    },
    "Tekstil & Hazır Giyim": {
      "Tekstil Üretimi": S(["İplik & Dokuma", "Boyahane & Terbiye", "Konfeksiyon"], ["Üretim", "Planlama", "Kalite"], ["Kumaş Teknolojisi", "Renk Yönetimi", "Kesim & Dikim Planlama"], ["Tekstil Mühendisi", "Üretim Planlama Uzmanı", "Konfeksiyon Şefi", "Fabrika Müdürü"], ["OEKO-TEX", "GOTS", "Sedex / SMETA"]),
      "Moda & Ürün Geliştirme": S(["Tasarım", "Ürün Geliştirme", "Sourcing"], ["Tasarım", "Ürün Geliştirme", "Tedarik"], ["Trend Analizi", "Teknik Föy Hazırlama", "Sürdürülebilir Moda"], ["Moda Tasarımcısı", "Ürün Geliştirme Uzmanı", "Sourcing Müdürü"], ["Sürdürülebilir Moda Sertifikası"])
    },
    "Denizcilik & Liman": {
      "Liman İşletmeciliği": S(["Liman Operasyonları", "Gemi Acenteliği", "Konteyner Yönetimi"], ["Operasyon", "Planlama", "Acentelik"], ["Terminal Planlama", "ISPS Kod", "Gemi Acenteliği"], ["Operasyon Uzmanı", "Gemi Planlamacısı", "Liman Müdürü"], ["ISPS Liman Tesisi Güvenlik Görevlisi", "Gemi Acenteliği Belgesi"]),
      "Deniz Taşımacılığı": S(["Gemi Operasyonu", "Charter (Kiralama)", "Teknik Yönetim"], ["Operasyon", "Chartering", "Teknik"], ["Charter Party", "ISM Kod", "Gemi Bakım Planlama"], ["Gemi Operatörü", "Chartering Uzmanı", "Süperintendent", "Kaptan"], ["STCW", "ICS Diploma", "Uzakyol Kaptanlığı"])
    }
  };

  const mergeInto = (target, source) => {
    Object.keys(source || {}).forEach((sector) => {
      target[sector] = target[sector] || {};
      Object.keys(source[sector] || {}).forEach((sub) => {
        const t = (target[sector][sub] = target[sector][sub] || {});
        const s = source[sector][sub] || {};
        Object.keys(s).forEach((key) => {
          t[key] = Array.from(new Set([...(t[key] || []), ...(s[key] || [])].filter(Boolean)));
        });
      });
    });
    return target;
  };

  window.sbMergeDatabank = mergeInto;
  mergeInto(window.DATABANK, EXTRA);
})();
