
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
