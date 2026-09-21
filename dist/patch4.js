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
                <button class="secondary" onclick="document.getElementById('reg-type-select').value='company'; showRegistrationModal()">+ Yeni Şirket</button>
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
                <button class="secondary" onclick="document.getElementById('reg-type-select').value='user'; showRegistrationModal()">+ Yeni Kullanıcı</button>
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
