const fs = require('fs');

const patchCode13 = `
// ==========================================
// PATCH 13: PAYNKOLAY FRONTEND INTEGRATION
// ==========================================
(function() {
    window.simulatePurchase = async function(amount) {
        // Show loading toast
        toast('Güvenli ödeme sayfasına yönlendiriliyorsunuz...', 2000);
        
        try {
            // Initiate payment session with our backend
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: amount, user: state.currentUser })
            });
            
            if(!response.ok) throw new Error('Ödeme sistemi başlatılamadı.');
            
            // The backend returns an HTML form that redirects to PaynKolay
            const html = await response.text();
            
            // Create an invisible iframe or document to submit the form
            const newDoc = document.open("text/html", "replace");
            newDoc.write(html);
            newDoc.close();
            
        } catch(e) {
            toast('Hata: ' + e.message);
        }
    };

    // Listen for the redirect back from PaynKolay callback
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('payment_status') === 'success') {
        const amount = parseInt(urlParams.get('amount') || '0');
        const user = urlParams.get('user');
        if(amount > 0 && user) {
            // Update ledger
            const ledger = getLedger();
            if(!(user in ledger)) ledger[user] = 0;
            ledger[user] += amount;
            saveLedger(ledger);
            
            // Clean up URL parameters without refreshing
            window.history.replaceState({}, document.title, window.location.pathname + "?p=subscription");
            
            setTimeout(() => {
                toast(\`Ödeme işleminiz başarılıdır! Hesabınıza \${amount} kontör eklendi.\`, 5000);
                render();
            }, 1000);
        }
    } else if(urlParams.get('payment_status') === 'failed') {
        window.history.replaceState({}, document.title, window.location.pathname + "?p=subscription");
        setTimeout(() => toast('Ödeme işlemi başarısız oldu.', 5000), 1000);
    }
})();
`;

let app = fs.readFileSync('dist/app.js', 'utf8');
if (!app.includes('PATCH 13: PAYNKOLAY FRONTEND')) {
    fs.writeFileSync('dist/patch13.js', patchCode13, 'utf8');
    app += '\n' + patchCode13;
    fs.writeFileSync('dist/app.js', app, 'utf8');
    console.log('Patch 13 injected successfully!');
}
