/**
 * Çoklu CV Karşılaştırma — AI prompt'ları
 *
 * İki aşamalı akış:
 *   1) profilCikarmaPrompt  — tek bir CV metninden yapılandırılmış profil (JSON) çıkarır
 *   2) karsilastirmaPrompt  — tüm profilleri kriter bazında puanlar, farkları gösterir, en iyi adayı seçer
 */

// Varsayılan kriterler — ağırlıkların toplamı 100
const VARSAYILAN_KRITERLER = [
  { kod: 'egitim',          ad: 'Eğitim Durumu',          agirlik: 15, aciklama: 'Derece seviyesi, bölümün pozisyonla ilgisi, okul, akademik başarı' },
  { kod: 'deneyim',         ad: 'Çalışma Tecrübesi',      agirlik: 20, aciklama: 'Rollerin pozisyonla ilgisi, sorumluluk düzeyi, sektör uyumu, kariyer ilerlemesi' },
  { kod: 'deneyim_suresi',  ad: 'Çalışma Yıl Süresi',     agirlik: 10, aciklama: 'Toplam ve ilgili alandaki yıl; aranan kıdemle uyum (fazlası her zaman daha iyi değildir)' },
  { kod: 'sertifikalar',    ad: 'Sertifikalar',           agirlik: 10, aciklama: 'Pozisyonla ilgili, tanınmış ve güncel sertifikalar' },
  { kod: 'projeler',        ad: 'Ürettiği Projeler',      agirlik: 15, aciklama: 'Projelerin kapsamı, karmaşıklığı, adayın projedeki rolü' },
  { kod: 'proje_sonuclari', ad: 'Proje Sonuçları',        agirlik: 15, aciklama: 'Ölçülebilir çıktılar (%, ₺, süre, kullanıcı sayısı vb.), somut etki' },
  { kod: 'yayinlar',        ad: 'Yayın / Bildiri (Referat)', agirlik: 5, aciklama: 'Makale, bildiri, referat, patent, konferans sunumu' },
  { kod: 'referanslar',     ad: 'Referanslar',            agirlik: 5,  aciklama: 'Referans sayısı, kıdemi, adayla ilişkisinin doğrudanlığı' },
  { kod: 'pozisyon_uyumu',  ad: 'Pozisyona Genel Uyum',   agirlik: 5,  aciklama: 'Aranan niteliklerin bütüncül karşılanma düzeyi' },
];

const ETIK_KURALLAR = `ETİK VE ADİL DEĞERLENDİRME KURALLARI:
- Yaş, cinsiyet, medeni durum, din, etnik köken, uyruk, fotoğraf, engellilik, askerlik dışı kişisel bilgileri DEĞERLENDİRMEYE KATMA.
- Sadece CV'de yazılı olan bilgiyi kullan; bilgi yoksa uydurma, "belirtilmemiş" kabul et.
- Okul/şirket "ünü" tek başına belirleyici olmasın; içerik, rol ve sonuç önemlidir.
- Her puan, CV'den alınmış somut bir kanıta dayansın.`;

/**
 * 1. AŞAMA: CV Metninden Yapılandırılmış JSON Profil Çıkarma Prompt'u
 */
function profilCikarmaPrompt(cvMetni, dosyaAdi) {
  const bugun = new Date().toISOString().slice(0, 7);
  return `Sen deneyimli bir İK analisti ve CV ayrıştırma uzmanısın. Aşağıdaki CV metnini okuyup bilgileri yapılandırılmış JSON'a dönüştür.

${ETIK_KURALLAR}

KURALLAR:
- Yalnızca CV'de açıkça geçen bilgiyi yaz. Tahmin etme, uydurma. Bilinmeyen alanlar için "" veya [] ya da null kullan.
- Tarihleri "YYYY-MM" (ay bilinmiyorsa "YYYY") biçiminde yaz. Devam eden işler için bitis = "devam". Bugünün tarihi: ${bugun}.
- toplam_deneyim_yil: çakışan dönemleri bir kez sayarak toplam profesyonel deneyim (staj hariç), 1 ondalık sayı olarak hesapla.
- Proje sonuçlarında sayısal/ölçülebilir bir çıktı varsa (%, ₺, $, süre, adet, kullanıcı sayısı, tasarruf) olculebilir_sonuc_var_mi = true yap.
- "Referat", bildiri, makale, kitap, patent, konferans sunumu gibi akademik/teknik çalışmalar → yayinlar listesine ekle.
- Referansların telefon/e-posta bilgisini KOPYALAMA (KVKK gereği), sadece iletisim_var_mi alanını işaretle.
- eksik_bilgiler: Bir işe alım kararı veya teknik kıyaslama için CV'de eksik olan önemli bilgileri listele.
- Çıktıyı SADECE geçerli bir JSON nesnesi olarak ver (markdown blokları veya ekstra açıklama olmadan).

DOSYA ADI: ${dosyaAdi || 'Belirtilmemiş'}

BEKLENEN JSON ŞEMASI:
{
  "aday_ad_soyad": "Ad Soyad",
  "unvan": "Mevcut veya Hedeflenen Ünvan",
  "iletisim": {
    "email": "ornek@email.com veya boş",
    "sehir": "Şehir / Ülke",
    "linkedin": "Profil URL veya boş",
    "telefon_var_mi": true
  },
  "toplam_deneyim_yil": 5.5,
  "egitim": [
    {
      "derece": "Lisans / Yüksek Lisans / Doktora",
      "bolum": "Bölüm Adı",
      "universite": "Üniversite Adı",
      "baslangic": "YYYY-MM",
      "bitis": "YYYY-MM",
      "not_ortalamasi": "3.40 / 4.00 veya boş"
    }
  ],
  "deneyimler": [
    {
      "sirket": "Şirket Adı",
      "rol": "Pozisyon / Ünvan",
      "baslangic": "YYYY-MM",
      "bitis": "devam veya YYYY-MM",
      "aciklama": "Üstlenilen görev ve sorumluluklar",
      "kullanilan_teknolojiler": ["Teknoloji1", "Teknoloji2"]
    }
  ],
  "sertifikalar": [
    {
      "ad": "Sertifika Adı",
      "kurum": "Veren Kurum",
      "yil": "YYYY"
    }
  ],
  "projeler": [
    {
      "ad": "Proje Adı",
      "rol": "Projedeki Rolü",
      "kapsam": "Projenin kapsamı ve mimarisi",
      "sonuc": "Elde edilen somut çıktı veya metrik",
      "olculebilir_sonuc_var_mi": true
    }
  ],
  "yayinlar": [
    {
      "tur": "Makale / Bildiri / Referat / Patent / Sunum",
      "baslik": "Yayın Başlığı",
      "mecra": "Konferans / Dergi Adı",
      "yil": "YYYY"
    }
  ],
  "referanslar": [
    {
      "ad_soyad": "Referans Ad Soyad",
      "unvan": "Pozisyon",
      "sirket": "Şirket",
      "iletisim_var_mi": true
    }
  ],
  "yetenekler": ["Yetenek1", "Yetenek2"],
  "diller": [
    { "dil": "İngilizce", "seviye": "İleri / C1" }
  ],
  "eksik_bilgiler": ["Örn: Projelerde somut metrik belirtilmemiş", "Eğitim mezuniyet yılı yazılmamış"]
}

─── CV METNİ ───
${cvMetni}
`;
}

/**
 * 2. AŞAMA: Çıkarılan Profilleri Kriter Bazında Karşılaştırma & Sıralama Prompt'u
 */
function karsilastirmaPrompt(profiller, gorevTanimi, kriterler = VARSAYILAN_KRITERLER) {
  const kriterlerMetni = kriterler.map((k, i) => 
    `${i + 1}. [${k.kod}] ${k.ad} (Ağırlık: %${k.agirlik}): ${k.aciklama}`
  ).join('\n');

  return `Sen tarafsız, analitik ve derinlemesine değerlendirme yapan kıdemli bir İK Değerlendirme Komitesi Başkanısın.
Aşağıda verilen yapılandırılmış aday profillerini, hedeflenen GÖREV TANIMI ve belirlenen AĞIRLIKLI KRİTERLER doğrultusunda objektif olarak kıyasla.

${ETIK_KURALLAR}

─── DEĞERLENDİRME KRİTERLERİ VE AĞIRLIKLARI (TOPLAM %100) ───
${kriterlerMetni}

─── HEDEF GÖREV TANIMI VE POZİSYON BEKLENTİLERİ ───
${gorevTanimi}

─── KARŞILAŞTIRILACAK ADAY PROFİLLERİ ───
${JSON.stringify(profiller, null, 2)}

TALİMATLAR:
1. Her adaya her kriter için 0-100 arasında bir puan ver ve bu puanın somut gerekçesini (CV'deki kanıtı) belirt.
2. Ağırlıklı Genel Skoru hesapla: Toplam = Σ (Kriter Puanı * Kriter Ağırlığı / 100).
3. Adayları genel puana göre 1. sıradan başlayarak sırala (Podium Rank).
4. Her aday için pozisyona özel en az 2 Güçlü Yön ve en az 2 Risk / Dikkat Edilmesi Gereken Nokta (Watchout) belirle.
5. Sonuçta Komite Kararı ve En İyi Aday Tavsiyesi ile mülakat soruları öner.
6. Yanıtı SADECE aşağıdaki JSON formatında üret.

BEKLENEN JSON ŞEMASI:
{
  "karar_ozeti": {
    "en_iyi_aday": "Adayın Adı Soyadı",
    "genel_gerekce": "Seçim gerekçesi ve komite kararı özeti",
    "pozisyon": "Hedef Pozisyon Adı",
    "karsilastirilan_aday_sayisi": 0
  },
  "aday_siralamasi": [
    {
      "sira": 1,
      "ad_soyad": "Aday Adı Soyadı",
      "genel_uyum_skoru": 88.5,
      "tavsiye_derecesi": "Şiddetle Tavsiye Edilir | Mülakata Uygun | İkinci Tercih | Riskli",
      "rozet_rengi": "#16a34a | #2563eb | #d97706 | #dc2626",
      "kriter_puanlari": {
        "egitim": { "puan": 85, "kanit": "Bilgisayar Mühendisliği lisans derecesi ve yüksek lisans" },
        "deneyim": { "puan": 90, "kanit": "Doğrudan ilgili sektörde 6 yıl benzer kıdemde çalışma" },
        "deneyim_suresi": { "puan": 85, "kanit": "Aranan 5+ yıl şartını tam karşılıyor" },
        "sertifikalar": { "puan": 80, "kanit": "AWS Certified Solutions Architect ve PMP sertifikası mevcut" },
        "projeler": { "puan": 92, "kanit": "Mikroservis dönüşümü ve yüksek trafikli sistem projeleri" },
        "proje_sonuclari": { "puan": 88, "kanit": "%40 performans artışı ve 1.2M aktif kullanıcı ölçeği somut kanıtlanmış" },
        "yayinlar": { "puan": 70, "kanit": "1 adet konferans bildirisi ve teknik blog referatı" },
        "referanslar": { "puan": 75, "kanit": "Önceki CTO ve direktör düzeyinde referans kaydı" },
        "pozisyon_uyumu": { "puan": 90, "kanit": "İlan metnindeki teknoloji ve yönetsel beklentilerin %90'ı örtüşüyor" }
      },
      "guclu_yonler": [
        "Metrik ve veri odaklı proje sonuçları sunabilmesi",
        "Aranan teknoloji yığını ile tam örtüşen derin mimari tecrübe"
      ],
      "riskler": [
        "Eğitim sonrasında sertifikasyon güncelleme aralığı 2 yıldır açık",
        "Yüksek talep gören profil nedeniyle maaş ve teklif rekabeti riski"
      ],
      "mulakat_soru_onerileri": [
        "Projelerinizde belirttiğiniz %40 performans artışını hangi metriklerle ve nasıl ölçümlediniz?",
        "Kriz ve sistem kesintisi anında aldığınız en kritik mimari kararı anlatır mısınız?"
      ]
    }
  ],
  "karsilastirma_matrisi": {
    "kriterler": ["Eğitim", "Deneyim", "Deneyim Süresi", "Sertifikalar", "Projeler", "Proje Sonuçları", "Yayınlar", "Referanslar", "Genel Uyum"],
    "aday_skorlari": {
      "Aday 1": [85, 90, 85, 80, 92, 88, 70, 75, 90],
      "Aday 2": [75, 82, 80, 70, 78, 65, 50, 80, 78]
    }
  },
  "ik_aksiyon_plani": "1. Sırada yer alan aday ile ivedilikle teknik mülakat planlanması, 2. adayın yedek havuzda tutulması tavsiye olunur."
}
`;
}

// Ortam desteği (Browser window + CommonJS / Node.js export)
if (typeof window !== 'undefined') {
  window.VARSAYILAN_KRITERLER = VARSAYILAN_KRITERLER;
  window.ETIK_KURALLAR = ETIK_KURALLAR;
  window.profilCikarmaPrompt = profilCikarmaPrompt;
  window.karsilastirmaPrompt = karsilastirmaPrompt;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    VARSAYILAN_KRITERLER,
    ETIK_KURALLAR,
    profilCikarmaPrompt,
    karsilastirmaPrompt
  };
}
