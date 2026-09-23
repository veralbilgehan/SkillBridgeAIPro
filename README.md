# SkillBridgeAIPro 🚀

SkillBridgeAIPro, kurumların işe alım, terfi ve yetenek gelişimi süreçlerini **Üretken Yapay Zeka (GenAI)** ve **Çoklu Ajan (Multi-Agent)** mimarisiyle baştan aşağı yeniden tanımlayan, Google Cloud Run ve Node.js altyapısında çalışan yeni nesil bir ölçme ve değerlendirme platformudur.

[www.mendomiakademi.com](https://www.mendomiakademi.com) ve [www.bigsafer.com](https://www.bigsafer.com) işbirliğiyle üretilmiştir.

---

## 🌟 Öne Çıkan Özellikler

- 🤖 **Çoklu Ajan (Multi-Agent) Mimarisi:** 17 farklı yapay zeka ajanı, görev tanımlarına göre eşzamanlı çalışarak kusursuz bir operasyon yürütür (Soru üretimi, vaka analizi, hata tespiti, radar haritalama vb.)
- 📝 **Otomatik Vaka (Case Study) Üretimi:** 
  - **Veri Bankası:** Çoklu seçim (Multi-select) özellikli dev veri bankası sayesinde spesifik sektör, departman ve sertifika yetkinliklerini harmanlayan hibrit vakalar oluşturma.
  - **Belgeden Üretim:** Şirket içi PDF/Word belgelerini analiz ederek kurgusal senaryo yaratma.
  - **Toplantı Analizi (Meet & Teams):** Konuşma dökümlerindeki kriz veya fikir ayrılıklarından vaka üretme.
- 🎯 **AI Tabanlı Değerlendirme Merkezi:** Adayların açık uçlu cevaplarını %100 objektif, bias (yanlılık) olmadan saniyeler içinde analiz eder. Bilişsel, Teknik, Yönetsel radar grafikleri çıkarır, adayın mantıksal hatalarını (Hata Dedektörü) tespit eder ve 30 günlük "Nihai Mentor Kararı" yol haritası sunar.
- 💳 **Paywall ve Kredi (Kontör) Yönetimi:**
  - **Sanal POS (PaynKolay) Entegrasyonu** ile 3D Secure abonelik paketleri alımı.
  - Yöneticilerin çalışanlarına / e-posta adreslerine "Hediye Kontör" transferi yapabilmesi.
- 🌍 **Çoklu Dil Desteği:** Tek tıkla Türkçe ve İngilizce (Google Çeviri altyapılı) geçiş imkanı.
- 🗄️ **REST API ve Relational Database:** Arka uçta Node.js, SQLite (Cloud SQL uyumlu) ve güvenli REST mimarisiyle Şirketler, Kullanıcılar, Sınav Oturumları, Ödemeler ve Değerlendirmeler tablo bazında kayıt altında tutulur.

## 🛠️ Teknoloji Yığını (Tech Stack)

- **Backend:** Node.js, Cloudflare Workers API standartları, REST API.
- **Frontend:** Vanilla JS, HTML5, CSS3, Esbuild (Custom Server Rendering)
- **Veritabanı:** SQLite3 (Geliştirme) / Google Cloud SQL PostgreSQL (Canlı Yayın)
- **AI Model:** Google Gemini 2.5 Flash / Pro (REST API)
- **Deployment:** Google Cloud Run (Buildpacks)
- **Ödeme Altyapısı:** PaynKolay Sanal POS Webhook

## ⚙️ Kurulum ve Çalıştırma (Yerel Geliştirme)

Sistemi kendi makinenizde (localhost) çalıştırmak için aşağıdaki adımları izleyin:

### 1. Gereksinimler
- [Node.js](https://nodejs.org/en/) (v20 veya üzeri)
- Google Cloud Gemini API Anahtarı
- PaynKolay API Anahtarları (Ödeme altyapısı testi için)

### 2. Projeyi Klonlayın ve Başlatın
\`\`\`bash
# 1. Gerekli kütüphaneleri (SQLite vb.) yükleyin
npm install

# 2. Ortam Değişkenlerini (Environment Variables) ayarlayın
# Ana dizindeki .env.example dosyasının adını .env olarak değiştirin ve içini doldurun:
# GEMINI_API_KEY=AIzaSy...
# PAYNKOLAY_MERCHANT_ID=...
# PAYNKOLAY_API_KEY=...
# PAYNKOLAY_SECRET=...

# 3. Veritabanını Başlatın (Sadece ilk kurulumda)
node scripts/db-init.mjs

# 4. Uygulamayı Derleyin (Build) ve Sunucuyu Başlatın
npm run start
# Veya manuel olarak:
# node scripts/build-worker.mjs
# node scripts/local-server.mjs
\`\`\`

Terminalde \`http://localhost:8787\` adresini gördüğünüzde tarayıcınızdan uygulamaya giriş yapabilirsiniz.

## ☁️ Google Cloud Run Dağıtımı (Deployment)

Uygulamayı canlıya almak için Google Cloud CLI (\`gcloud\`) sisteminizde kurulu olmalıdır.

\`\`\`bash
# Buluta otomatik deploy etmek için özel yazılmış betiği çalıştırın:
node deploy.cjs

# Veya manuel gcloud komutu ile:
gcloud run deploy skillbridge-pro \
  --source . \
  --region europe-west1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY="ANAHTARINIZ"
\`\`\`
*Not: Cloud Run üzerinde veritabanı kalıcılığı sağlamak için SQLite yerine Google Cloud SQL servisine geçiş yapılması tavsiye edilir.*

## 🔒 Gizlilik ve Güvenlik
- **Uçtan Uca Şifreleme:** Adayların ve kurumların yüklediği tüm dokümanlar bellek üzerinde şifrelenir.
- **Zero-Retention:** Üretken AI (Gemini) modellerine gönderilen veriler, Google'ın API gizlilik kuralları gereği public AI eğitiminde KULLANILMAZ.
- **PaynKolay 3D Secure:** Kullanıcı kredi kartı bilgileri sistemde saklanmaz; tüm işlemler PCI-DSS standartlarına sahip BigSafer sunucuları üzerinden tokenization (tokenize) edilerek işlenir.

---
*Kurucular: Recep Yiğit, Av. Bilge Han Veral, Mustafa Akça*  
*Entegrasyon ve Altyapı: Antigravity AI*
