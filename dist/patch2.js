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
                    <button type="button" onclick="this.closest('.modal').remove()" style="background:none; border:none; color:#4b5563; font-weight:bold; cursor:pointer; font-size:14px;">İptal</button>
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
                        🏢 Organizasyon Şeması (Şirketler & Çalışanlar) 
                        <span style="background:#f1f5f9; padding:2px 8px; border-radius:20px; font-size:12px; color:#475569;">${window.authDB.companies.length} Şirket</span>
                    </h3>
                    <div style="margin-top:15px; display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:20px;">
                        ${window.authDB.companies.length === 0 ? '<div style="color:#94a3b8; padding:20px; grid-column:1/-1; text-align:center;">Henüz kayıtlı şirket yok. Önce bir şirket ekleyin.</div>' : ''}
                        
                        ${window.authDB.companies.slice().reverse().map(comp => {
                            const compAdmins = window.authDB.admins.filter(a => a.companyName === comp.name);
                            const compUsers = window.authDB.users.filter(u => u.companyName === comp.name);
                            
                            let adminHtml = compAdmins.map(a => `<div style="padding:8px 12px; background:#fff7ed; color:#c2410c; border:1px solid #fdba74; border-radius:8px; font-size:13px; margin-bottom:8px; font-weight:500;">👔 ${a.name} <span style="float:right; font-size:11px; opacity:0.8; font-weight:bold;">Yönetici</span></div>`).join('');
                            let userHtml = compUsers.map(u => `<div style="padding:8px 12px; background:#f0fdf4; color:#15803d; border:1px solid #bbf7d0; border-radius:8px; font-size:13px; margin-bottom:8px; font-weight:500;">👤 ${u.name} <span style="float:right; font-size:11px; opacity:0.8;">Kullanıcı</span></div>`).join('');
                            
                            if(!adminHtml && !userHtml) {
                                userHtml = '<div style="font-size:12px; color:#94a3b8; padding:10px; background:#f8fafc; border-radius:6px; border:1px dashed #cbd5e1; text-align:center;">Henüz kullanıcı veya yönetici atanmamış.</div>';
                            }
                            
                            return `
                            <div style="border:1px solid #cbd5e1; border-radius:12px; padding:15px; background:#f8fafc; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; border-bottom:1px solid #e2e8f0; padding-bottom:10px;">
                                    <b style="font-size:16px; color:#0f172a;">🏢 ${comp.name}</b>
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
                    <h3 style="border-bottom:2px solid #e2e8f0; padding-bottom:12px; margin-top:0; color:#0f172a; display:flex; justify-content:space-between;">👔 Tüm Şirket Adminleri <span style="background:#f1f5f9; padding:2px 8px; border-radius:20px; font-size:12px; color:#475569;">${window.authDB.admins.length}</span></h3>
                    <ul style="list-style:none; padding:0; margin-top:15px; max-height:400px; overflow-y:auto;">
                        ${window.authDB.admins.slice().reverse().map(c => `
                            <li style="padding:12px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center;">
                                <div><b style="color:#0f172a;">${c.name}</b><br><span style="font-size:12px; color:#0284c7; background:#e0f2fe; padding:2px 6px; border-radius:4px; margin-top:4px; display:inline-block; font-weight:bold;">🏢 ${c.companyName || 'Bağımsız'}</span></div>
                                <small style="color:#94a3b8; text-align:right;">${c.date}</small>
                            </li>`).join('')}
                        ${window.authDB.admins.length === 0 ? '<li style="color:#94a3b8; text-align:center; padding:20px;">Kayıtlı yönetici yok.</li>' : ''}
                    </ul>
                </div>
                
                <!-- Tüm Kullanıcılar Liste -->
                <div style="background:#fff; padding:20px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
                    <h3 style="border-bottom:2px solid #e2e8f0; padding-bottom:12px; margin-top:0; color:#0f172a; display:flex; justify-content:space-between;">👤 Tüm Kullanıcılar <span style="background:#f1f5f9; padding:2px 8px; border-radius:20px; font-size:12px; color:#475569;">${window.authDB.users.length}</span></h3>
                    <ul style="list-style:none; padding:0; margin-top:15px; max-height:400px; overflow-y:auto;">
                        ${window.authDB.users.slice().reverse().map(c => `
                            <li style="padding:12px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center;">
                                <div><b style="color:#0f172a;">${c.name}</b><br><span style="font-size:12px; color:#16a34a; background:#dcfce3; padding:2px 6px; border-radius:4px; margin-top:4px; display:inline-block; font-weight:bold;">🏢 ${c.companyName || 'Bağımsız'}</span></div>
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
