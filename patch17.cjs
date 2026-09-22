const fs = require('fs');

const patchCode17 = `
// ==========================================
// PATCH 17: HAKKIMIZDA PAGE
// ==========================================
(function() {
    window.aboutPage = function() {
        return layout(\`
        <section class="page-container" style="padding: 40px; max-width: 900px; margin: 0 auto; color: var(--text-main); font-family: sans-serif; line-height: 1.6; padding-bottom: 100px;">
            
            <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="font-size: 2.5rem; margin-bottom: 10px; color: var(--primary);">Hakkımızda</h1>
                <p style="font-size: 1.1rem; color: var(--text-muted); background: #f0fdf4; padding: 15px; border-radius: 8px; border: 1px solid #bbf7d0; display: inline-block;">
                    Bu platform <strong><a href="https://www.mendomiakademi.com" target="_blank" style="color:#16a34a; text-decoration:none;">www.mendomiakademi.com</a></strong> ve <strong><a href="https://www.bigsafer.com" target="_blank" style="color:#16a34a; text-decoration:none;">www.bigsafer.com</a></strong> işbirliğiyle üretilmiştir.
                </p>
            </div>

            <div class="card" style="margin-bottom: 30px; padding: 30px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
                <h2 style="border-bottom: 2px solid var(--border); padding-bottom: 10px; margin-bottom: 20px;">Kurucularımız</h2>
                <ul style="font-size: 1.2rem; list-style-type: none; padding-left: 0; display: flex; gap: 20px; flex-wrap: wrap;">
                    <li style="background: var(--bg-alt); padding: 15px 25px; border-radius: 8px; border: 1px solid var(--border);">👤 <strong>Recep Yiğit</strong></li>
                    <li style="background: var(--bg-alt); padding: 15px 25px; border-radius: 8px; border: 1px solid var(--border);">⚖️ <strong>Av. Bilge Han Veral</strong></li>
                    <li style="background: var(--bg-alt); padding: 15px 25px; border-radius: 8px; border: 1px solid var(--border);">👤 <strong>Mustafa Akça</strong></li>
                </ul>
            </div>

            <div class="card" style="margin-bottom: 30px; padding: 30px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
                <h2 style="border-bottom: 2px solid var(--border); padding-bottom: 10px; margin-bottom: 20px;">SkillBridgeAIPro Kullanım Kılavuzu ve S.S.S (FAQ)</h2>
                <p style="font-size: 1.1rem;">SkillBridgeAIPro, kurumların işe alım, terfi ve yetenek gelişimi süreçlerini Üretken Yapay Zeka (GenAI) ve Çoklu Ajan (Multi-Agent) mimarisiyle baştan aşağı yeniden tanımlayan yeni nesil bir ölçme-değerlendirme platformudur.</p>
                
                <h3 style="margin-top: 30px; color: var(--primary);">🌟 Öne Çıkan Özellikler ve Yenilikler</h3>
                <ul style="margin-top: 15px; padding-left: 20px;">
                    <li style="margin-bottom: 10px;"><strong>Çoklu Ajan (Multi-Agent) Mimarisi:</strong> 17 farklı yapay zeka ajanı, görev tanımlarına göre eşzamanlı çalışarak kusursuz bir operasyon yürütür.</li>
                    <li style="margin-bottom: 10px;"><strong>Otomatik Vaka (Case Study) Üretimi:</strong> Kendi kurum belgelerinizden, toplantı dökümlerinden veya yerleşik dev Veri Bankasından (Data Bank) saniyeler içinde sektöre ve pozisyona özel iş vakaları oluşturur.</li>
                    <li style="margin-bottom: 10px;"><strong>AI Tabanlı Değerlendirme Merkezi:</strong> Adayların açık uçlu veya çoktan seçmeli cevaplarını insan yanlılığından uzak, %100 objektif ve derinlemesine analizle saniyeler içinde puanlar.</li>
                    <li style="margin-bottom: 10px;"><strong>Abonelik ve Kontör Yönetimi (Paywall):</strong> Sistem, kontör/kredi mantığı ile çalışır. Firmalar hesaplarına kontör yükler ve yöneticiler çalışanlarına hediye kontör transfer edebilir.</li>
                </ul>

                <h3 style="margin-top: 30px; color: var(--primary);">🗂️ Modüller ve Kullanım Adımları</h3>
                <p>Sistem, sol menüde (Sidebar) çok daha kolay kullanım için gruplandırılmıştır:</p>

                <h4 style="margin-top: 20px; font-size: 1.1rem;">1. 💳 Kontör İşlemleri (Abonelik ve Transfer)</h4>
                <p>Platformda yapay zeka destekli işlemler yapabilmek için kontör (kredi) gerekmektedir. Yeni kayıt olan kullanıcılar 0 bakiye ile başlar.</p>
                <ul style="padding-left: 20px;">
                    <li><strong>Abonelik & Kontör Al:</strong> Sanal POS (PaynKolay) entegrasyonuyla güvenli 3D Secure sayfasından Başlangıç, Kurumsal veya Limitsiz paket satın alabilirsiniz.</li>
                    <li><strong>Hediye Kontör Gönder:</strong> Hesabınızdaki kontörleri, sistemdeki diğer çalışanlarınıza (e-posta adresleri üzerinden) anında transfer edebilirsiniz.</li>
                </ul>

                <h4 style="margin-top: 20px; font-size: 1.1rem;">2. 📝 Vaka İşlemleri (Sınav Hazırlığı)</h4>
                <p>Sınav oluşturmadan önce adayın çözeceği iş senaryosunu (vakayı) oluşturmanız gerekir:</p>
                <ul style="padding-left: 20px;">
                    <li><strong>Veri Bankası ile Formdan Vaka Yarat:</strong> Sistemdeki dev veri kütüphanesi sayesinde sektörünüzü seçin. CTRL/CMD tuşuna basılı tutarak birden fazla departman, uzmanlık ve sertifikayı aynı anda seçerek Ajan 8'in çok zorlu, derin teknik kurgular üretmesini sağlayın.</li>
                    <li><strong>Belgeden Vaka Yarat:</strong> Kurumunuza ait prosedür belgelerini (PDF, Word) sisteme yükleyin, ajanlar bu belgelerdeki bilgileri vaka senaryosuna dönüştürsün.</li>
                    <li><strong>Meet & Teams Vaka:</strong> Toplantı dökümünüzü sisteme kopyalayın, yapay zeka toplantıdaki fikir ayrılıklarından bir kriz/karar senaryosu hazırlasın.</li>
                    <li><strong>Açık Uçlu / Karşılaştırma:</strong> Üretilen vakaları açık uçlu teste dönüştürebilir veya evrak kutusundaki vakaları birbiriyle kıyaslayabilirsiniz.</li>
                </ul>

                <h4 style="margin-top: 20px; font-size: 1.1rem;">3. 📊 Test İşlemleri (Uygulama ve Raporlama)</h4>
                <ul style="padding-left: 20px;">
                    <li><strong>Test Platformu:</strong> Hazırlanan testleri, adayların girebilmesi için benzersiz bir "Test ID" ile yayına alabilirsiniz. Adaylar açılış (Splash) ekranını geçtikten sonra Aday Test formundan sınavlarını tamamlarlar.</li>
                    <li><strong>Test Sonuçları & Detaylı Rapor:</strong> Aday sınavı bitirdiğinde AI değerlendirme motoru çalışır. Adayın "Detaylı Rapor" butonuna tıkladığınızda şu verilere ulaşırsınız:
                        <ul>
                            <li><strong>Radar Analizi:</strong> Adayın Bilişsel, Teknik, Temel ve Yönetsel yetkinliklerinin kurum hedefleriyle eşleşme oranı grafiksel olarak sunulur.</li>
                            <li><strong>Hata Dedektörü:</strong> Adayın verdiği cevaplardaki mantıksal hataları, refleks zafiyetlerini dobralıkla tespit eder.</li>
                            <li><strong>Kıyaslama ve Nihai Mentor Kararı:</strong> Adayın ideal sektör profiliyle boşluk analizini yapar ve yapay zeka tarafından 30 günlük gelişim yol haritası sunulur.</li>
                        </ul>
                    </li>
                </ul>

                <h3 style="margin-top: 30px; color: var(--primary);">❓ Sıkça Sorulan Sorular (FAQ)</h3>
                
                <div style="background: var(--bg-alt); padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                    <strong>S: Sisteme girdiğimde diğer menülere tıklayamıyorum, ne yapmalıyım?</strong><br>
                    C: SkillBridgeAIPro, paywall (ödeme duvarı) sistemiyle korunmaktadır. Eğer bakiyeniz 0 ise diğer sayfalara erişiminiz engellenir. Lütfen sol menüden "Abonelik & Kontör Al" sayfasına giderek hesabınıza bakiye yükleyin veya bir şirket yetkilisinden hediye kontör isteyin.
                </div>

                <div style="background: var(--bg-alt); padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                    <strong>S: Aynı anda hem Siber Güvenlik Uzmanı hem de Yazılımcı yetkinliklerini test eden bir vaka üretebilir miyim?</strong><br>
                    C: Kesinlikle! "Formdan Vaka Yarat" sayfasındaki yeni Çoklu Seçim (Multi-Select) özelliği sayesinde, CTRL (Windows) veya CMD (Mac) tuşuna basılı tutarak listeden birden fazla Uzmanlık, Departman ve Sertifika seçebilirsiniz. Yapay Zeka tüm seçimlerinizi tek bir zorlu vakada harmanlayacaktır.
                </div>

                <div style="background: var(--bg-alt); padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                    <strong>S: Yapay zekanın ürettiği sorular bana çok basit geliyor, ne yapmalıyım?</strong><br>
                    C: Sistem komutları, adayları zorlamak üzere "Uzman/Senior" seviyesinde ileri derecede teknik ve analitik düşünce gerektirecek şekilde (Satır aralarını okuyan) güncellenmiştir. Eğer hala basit geliyorsa, "Formdan Vaka Yarat" kısmındaki "Zorluk Seviyesi" açılır menüsünden seviyeyi "Uzman (Executive)" olarak değiştirdiğinizden emin olun.
                </div>

                <div style="background: var(--bg-alt); padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                    <strong>S: PaynKolay ödeme altyapısı nasıl devreye girer?</strong><br>
                    C: Arka plandaki tüm şifreleme ve webhook entegrasyonu kodlanmıştır. Ticari hesabınızın para almaya başlaması için Google Cloud üzerindeki projenize girip "Variables & Secrets" alanına PAYNKOLAY_API_KEY ve PAYNKOLAY_SECRET anahtarlarınızı kaydetmeniz yeterlidir.
                </div>

                <div style="background: var(--bg-alt); padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                    <strong>S: Sistemim (Sunucu) veya arka plandaki komut ekranı yanlışlıkla kapandı, nasıl geri açarım?</strong><br>
                    C: Eğer platformu kendi bilgisayarınızda (localhost) çalıştırıyorsanız, klasör içindeyken bir komut satırı (Terminal/PowerShell) açın ve <code>node scripts/local-server.mjs</code> yazıp Enter'a basın. Sunucu tekrar ayağa kalkacaktır. Bulutta (Cloud Run) ise sistem 7/24 kesintisiz çalışır.
                </div>

                <div style="background: var(--bg-alt); padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                    <strong>S: Dil seçeneği çalışmıyor, nasıl düzeltebilirim?</strong><br>
                    C: Sağ üst köşedeki (TR / EN) butonları yerleşik Google Çeviri altyapısı ile çalışmaktadır. Sistemin bu modüle bağlanabilmesi için aktif bir internet bağlantınız olması ve tarayıcınızın çerezlere (Cookies) izin veriyor olması gerekir. Tıkladığınızda sayfa otomatik yenilenir ve dil değişir.
                </div>
                
                <p style="text-align: right; margin-top: 20px; font-style: italic; color: var(--text-muted);">Hazırlayan: Antigravity AI - SkillBridgeAIPro Entegrasyon Ekibi</p>
            </div>

            <div class="card" style="padding: 30px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
                <h2 style="border-bottom: 2px solid var(--border); padding-bottom: 10px; margin-bottom: 20px;">Kullanım Koşulları, Gizlilik ve Güvenlik</h2>
                
                <h3 style="margin-top: 20px; font-size: 1.1rem; color: var(--primary);">1. Gizlilik ve Veri Güvenliği</h3>
                <p>SkillBridgeAIPro platformuna yüklenen tüm dokümanlar, aday verileri ve şirket içi bilgiler uçtan uca şifreleme yöntemleriyle korunmaktadır. Sisteme yüklenen veriler hiçbir şekilde üçüncü şahıs kurum veya kuruluşlarla paylaşılmaz ve yapay zeka modellerinin genel eğitiminde (training data) kullanılmaz.</p>
                
                <h3 style="margin-top: 20px; font-size: 1.1rem; color: var(--primary);">2. Kullanım Koşulları</h3>
                <p>Bu platform, kurumların kendi iç işleyişlerindeki yetenek ölçümü ve işe alım süreçlerini desteklemek amacıyla tasarlanmıştır. Platformdan elde edilen "Nihai Mentor Kararı" ve AI analizleri birer tavsiye niteliğindedir; nihai işe alım veya terfi kararları tamamen kurumun inisiyatifindedir.</p>

                <h3 style="margin-top: 20px; font-size: 1.1rem; color: var(--primary);">3. Ödeme ve Kontör Güvenliği</h3>
                <p>Kontör alımları sırasında girilen kredi kartı bilgileri sistemimizde saklanmaz. Tüm ödeme işlemleri PCI-DSS sertifikalı PaynKolay (BigSafer) altyapısı üzerinden 3D Secure güvencesiyle doğrudan bankalara iletilir.</p>
            </div>

        </section>
        \`, 'Hakkımızda');
    };

    // Hook render to show aboutPage
    const oldRender17 = window.render;
    window.render = function() {
        if(state.page === 'about') {
            document.getElementById('app').innerHTML = aboutPage();
        } else {
            oldRender17();
        }
    };

    // Add Hakkımızda button to layout
    const oldLayout17 = window.layout;
    window.layout = function(content, title) {
        let html = oldLayout17(content, title);
        
        const aboutBtn = \`
        <button class="\${state.page==='about'?'active':''}" onclick="go('about')" style="margin-top: 5px;">
            <span>ℹ️</span> Hakkımızda & Kılavuz
        </button>
        </nav>\`;

        // Inject right before </nav>
        html = html.replace(/<\\/nav>/, aboutBtn);
        return html;
    };
})();
`;

let app = fs.readFileSync('dist/app.js', 'utf8');
if (!app.includes('PATCH 17: HAKKIMIZDA PAGE')) {
    fs.writeFileSync('dist/patch17.js', patchCode17, 'utf8');
    app += '\n' + patchCode17;
    fs.writeFileSync('dist/app.js', app, 'utf8');
    console.log('Patch 17 injected successfully!');
}
