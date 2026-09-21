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
