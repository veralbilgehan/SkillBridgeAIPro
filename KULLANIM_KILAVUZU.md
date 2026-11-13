# 🚀 SkillBridgeAIPro Kullanım ve Tanıtım Kılavuzu

SkillBridgeAIPro, kurumların işe alım, terfi ve yetenek gelişimi süreçlerini **Üretken Yapay Zeka (GenAI)** ve **Çoklu Ajan (Multi-Agent)** mimarisiyle baştan aşağı yeniden tanımlayan yeni nesil bir ölçme-değerlendirme platformudur.

---

## 🌟 Öne Çıkan Özellikler

- **Çoklu Ajan (Multi-Agent) Mimarisi:** 17 farklı yapay zeka ajanı, görev tanımlarına göre (Kapsam Kilitli) eşzamanlı çalışarak kusursuz bir operasyon yürütür.
- **Otomatik Vaka (Case Study) Üretimi:** Kendi kurum belgelerinizden, belirlediğiniz form kriterlerinden veya toplantı dökümlerinden saniyeler içinde sektöre ve pozisyona özel iş vakaları oluşturur.
- **AI Tabanlı Değerlendirme Merkezi:** Adayların açık uçlu veya çoktan seçmeli cevaplarını insan yanlılığından uzak, %100 objektif ve derinlemesine teknik analizle saniyeler içinde puanlar.
- **Detaylı Raporlama ve Radar Analizi:** Her aday için güçlü/zayıf yönleri gösteren radar grafikleri, kıyaslamalar ve mentor kararlarını içeren kapsamlı raporlar sunar.

---

## 🛠️ Modüller ve Kullanım Adımları

### 1. Vaka Üretim Modülleri (Sınav Hazırlığı)

Sınav oluşturmadan önce adayın çözeceği iş senaryosunu (vakayı) oluşturmanız gerekir. Sistem size 3 farklı yöntem sunar:

*   **📄 Belgeden Vaka Yarat:** Kurumunuza ait prosedür, eğitim veya teknik belgeleri (PDF, Word vb.) sisteme yükleyin. Yapay zeka, bu belgedeki bilgileri okuyarak seçtiğiniz sektör, departman ve pozisyona uygun gerçekçi bir kriz/vaka senaryosuna dönüştürür.
*   **📋 Formdan Vaka Yarat:** Herhangi bir belge olmadan; sektör, yetkinlik, zorluk derecesi ve süreyi form üzerinden seçin. Ajanlar, belirlediğiniz parametrelere uygun ve teknik derinliği yüksek yepyeni bir iş vakası üretir.
*   **📋 Metin Yapıştır Vaka:** Toplantı notu, e-posta, rapor veya herhangi bir metni kopyalayıp yapıştırın. **Vaka Hazırla** butonu metinden adayların çözmesi gereken bir karar verme vakası üretir; **Test Hazırla** butonu seçilen soru sayısıyla (10/25/50/100) doğrudan çoktan seçmeli test hazırlar.

### 2. Test Formatına Dönüştürme

Oluşturduğunuz vakayı test haline getirmek için iki seçeneğiniz bulunur:
*   **Çoktan Seçmeli (MCQ):** Vakaya bağlı, seçenekleri (A, B, C, D) dengeli dağıtılmış spesifik test soruları üretilir.
*   **Açık Uçlu (Aday Simülasyonu):** Adaya vaka okutulur ve sorunu kendi kelimeleriyle, bir yönetici veya uzman gibi detaylı bir analiz yazarak çözmesi istenir.

### 3. Test Yönetimi ve Adayın Sınava Girmesi

*   **Test Platformu:** Hazırlanan testler, **Test Yönetimi** ekranında listelenir. Adaya özel benzersiz bir oturum (Test ID) oluşturularak sınav başlatılır.
*   **Aday Deneyimi:** Aday, sisteme adını ve Test ID'sini girerek vakayı okur, kısıtlı süre içerisinde kendi çözümünü yazar veya şıkları işaretler ve sınavı tamamlar.
*   **👥 Toplu Test (QR):** Aynı vakayı 1000 kişiye kadar bir grubun çözmesi için kullanılır.
    1. Vakadan çoktan seçmeli test üretin ve **Toplu Test Olarak Yayınla (QR)** butonuna basın. Test adı, katılımcı kapasitesi (en çok 1000) ve süreyi belirleyin.
    2. Oluşan QR kodunu ekrana yansıtın, yazdırın veya bağlantıyı paylaşın. Katılımcılar QR'ı telefonlarıyla okutup **Ad Soyad** ve **Sicil / Personel No** ile testi kendi cihazlarında çözer. Aynı sicil numarasıyla ikinci kez giriş yapılamaz.
    3. **Test Yönetimi → Toplu Test (QR)** sayfasında sonuçlar 10 saniyede bir yenilenir: katılım, ortalama, medyan, en yüksek/en düşük skor ve her katılımcının ortalamaya göre farkıyla sıralama.
    4. **Test Sonuçlarına Aktar** ile katılımcılar diğer test sonuçları gibi detaylı raporlarıyla listeye eklenir; **Excel (CSV)** ile sıralama indirilir.
    5. **Testi Kapat** ile yeni katılım durdurulur; kullanılmayan kontenjanın BIGakçe'si iade edilir.
    *   Ücret: soru üretimi (11 BIGakçe/soru) + katılımcı kapasitesi × 1 BIGakçe (peşin). Doğru cevaplar katılımcı cihazına gönderilmez, puanlama sunucuda yapılır. Testin yönetici anahtarı onu yayınlayan tarayıcıda saklanır; sonuçlar yalnızca o tarayıcıdan görüntülenebilir.

### 4. AI Değerlendirmesi ve Detaylı Raporlar 📊

Aday testi bitirdiğinde, veriler anında Yapay Zeka (Gemini) değerlendirme motoruna gönderilir.
**Test Sonuçları** sekmesinden ilgili adayın **"Detaylı Rapor"** butonuna tıkladığınızda şu verilere ulaşırsınız:

*   **🎯 Radar Analizi:** Adayın Bilişsel, Teknik, Temel ve Yönetsel yetkinliklerinin kurum hedefleriyle eşleşme oranı grafiksel olarak sunulur.
*   **🚨 Hata Dedektörü (Sayfa 6):** Adayın verdiği cevaplardaki mantıksal hataları, refleks zafiyetlerini ve stres altında aldığı yanlış kararları doğrudan tespit edip vurgular.
*   **📊 Kıyaslama (Sayfa 8):** Adayın mevcut profilini, sektördeki ideal profesyonel profili ile karşılaştırır ve boşluk analizini yapar.
*   **✅ Nihai Mentor Kararı (Sayfa 9):** Adayın eksiklerini kapatması için yapay zeka tarafından hazırlanan 30 günlük gelişim yol haritası (eğitim ve aksiyon önerileri) sunulur.
*   **Detaylı Soru Analizi:** Her bir soruya verilen cevap satır satır incelenerek "Olumlu", "Olumsuz" veya "Boş" olarak etiketlenir ve zaman damgasıyla raporlanır.

---

## ⚙️ Sistem Gereksinimleri ve Başlatma

Platform, yerel makinenizde tamamen bağımsız bir sunucu (Node.js) altyapısı ile çalışmaktadır.

1.  Uygulamayı başlatmak için proje klasöründe terminali açıp `node scripts/local-server.mjs` komutunu çalıştırmanız yeterlidir.
2.  Tarayıcınızdan `http://localhost:8787` adresine giderek yönetim paneline erişebilirsiniz.
3.  Uygulamayı kapatmak için terminalde `Ctrl + C` tuşlarına basabilirsiniz.

> **💡 İpucu:** Sistemi uzak bir sunucuya (Cloud) veya kurumsal intranete taşımak için bilgisayarınızdaki `SkillBridgeAIPro-Final-v54.zip` dosyasını kullanabilirsiniz. Modern mimarisi sayesinde her türlü VDS veya Cloud hizmetinde (AWS, Azure, DigitalOcean) hızlıca çalıştırılabilir.
