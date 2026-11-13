
// ==========================================
// PATCH 13: DOĞRUDAN KONTÖR YÜKLEME (ÖDEME YÖNLENDİRMESİ DEVRE DIŞI)
// ==========================================
(function() {
    window.simulatePurchase = function(amount) {
        const numAmount = parseInt(amount) || 100;
        const user = state.currentUser || 'demo@sirket.com';
        addCredits(user, numAmount);
        toast(`✅ Başarılı! Hesabınıza ${numAmount} kontör yüklendi. (Mevcut Bakiye: ${getUserCredits(user)} Kontör)`, 4000);
        render();
    };

    window.loadCredits = function(amount) {
        window.simulatePurchase(amount);
    };
})();
