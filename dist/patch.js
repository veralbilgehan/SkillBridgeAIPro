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
                  <h3 style="border-bottom:2px solid #e2e8f0; padding-bottom:12px; margin-top:0; color:#0f172a; display:flex; justify-content:space-between;">🏢 Şirketler <span style="background:#f1f5f9; padding:2px 8px; border-radius:20px; font-size:12px; color:#475569;">${window.authDB.companies.length}</span></h3>
                  <ul style="list-style:none; padding:0; margin-top:15px; max-height:400px; overflow-y:auto;">
                      ${window.authDB.companies.slice().reverse().map(c => `<li style="padding:12px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center;"><b>${c.name}</b> <small style="color:#94a3b8;">${c.date}</small></li>`).join('')}
                      ${window.authDB.companies.length === 0 ? '<li style="color:#94a3b8; text-align:center; padding:20px;">Kayıtlı şirket yok.</li>' : ''}
                  </ul>
              </div>
              
              <!-- Yöneticiler -->
              <div style="background:#fff; padding:20px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
                  <h3 style="border-bottom:2px solid #e2e8f0; padding-bottom:12px; margin-top:0; color:#0f172a; display:flex; justify-content:space-between;">👔 Şirket Adminleri <span style="background:#f1f5f9; padding:2px 8px; border-radius:20px; font-size:12px; color:#475569;">${window.authDB.admins.length}</span></h3>
                  <ul style="list-style:none; padding:0; margin-top:15px; max-height:400px; overflow-y:auto;">
                      ${window.authDB.admins.slice().reverse().map(c => `<li style="padding:12px; border-bottom:1px solid #f1f5f9; display:flex; justify-content:space-between; align-items:center;"><b>${c.name}</b> <small style="color:#94a3b8;">${c.date}</small></li>`).join('')}
                      ${window.authDB.admins.length === 0 ? '<li style="color:#94a3b8; text-align:center; padding:20px;">Kayıtlı yönetici yok.</li>' : ''}
                  </ul>
              </div>
              
              <!-- Kullanıcılar -->
              <div style="background:#fff; padding:20px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 4px 6px -1px rgba(0,0,0,0.05);">
                  <h3 style="border-bottom:2px solid #e2e8f0; padding-bottom:12px; margin-top:0; color:#0f172a; display:flex; justify-content:space-between;">👤 Kullanıcılar <span style="background:#f1f5f9; padding:2px 8px; border-radius:20px; font-size:12px; color:#475569;">${window.authDB.users.length}</span></h3>
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
                      btn.innerHTML = '🏢 Merkezi Veri Bankası';
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
