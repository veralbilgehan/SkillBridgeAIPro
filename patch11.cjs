const fs = require('fs');

const patchCode11 = `
// ==========================================
// PATCH 11: HARD PAYWALL (FORCE SUBSCRIPTION)
// ==========================================
(function() {
    // 1. Force redirection to subscription on login if balance is 0
    const originalLogin = window.login;
    window.login = function() {
        const inputs = document.querySelectorAll('.login-inputs input');
        let user = 'demo@sirket.com';
        if (inputs.length > 0 && inputs[0].value.trim()) {
            user = inputs[0].value.trim().toLowerCase();
        }
        state.currentUser = user;
        
        const ledger = getLedger();
        if (!(user in ledger)) {
            ledger[user] = 0;
        }
        saveLedger(ledger);
        
        localStorage.setItem('sb_current_user', user);
        state.logged = true;
        localStorage.setItem('sb_session', '1');

        if (ledger[user] <= 0) {
            state.page = 'subscription';
            setTimeout(() => toast('Hoş geldiniz. Sistemi kullanmaya başlamak için lütfen bir abonelik paketi seçiniz.', 4000), 500);
        } else {
            state.page = 'dashboard';
            setTimeout(() => toast('Hoş geldiniz, ' + user, 3000), 500);
        }
        render();
    };

    // 2. Prevent navigation to other pages if balance is 0
    const originalGo = window.go;
    window.go = function(pageId) {
        if (state.logged && getUserCredits(state.currentUser) <= 0 && pageId !== 'subscription') {
            toast('Sistemi kullanabilmek için lütfen bir başlangıç paketi veya kontör satın alınız.');
            pageId = 'subscription'; 
        }
        
        state.page = pageId;
        window.history.pushState({page:pageId}, '', '?p=' + pageId);
        render();
    };

    // 3. Enforce paywall on direct page load (F5 refresh)
    const oldRender11 = window.render;
    window.render = function() {
        if (state.logged && getUserCredits(state.currentUser) <= 0 && state.page !== 'subscription') {
            state.page = 'subscription';
        }
        oldRender11();
    };
})();
`;

let app = fs.readFileSync('dist/app.js', 'utf8');
app = app.replace(/\/\/ PATCH 11: HARD PAYWALL[\s\S]*?\n\)\(\);\n/, ''); // Remove old patch11 if exists
if (!app.includes('PATCH 11: HARD PAYWALL')) {
    fs.writeFileSync('dist/patch11.js', patchCode11, 'utf8');
    app += '\n' + patchCode11;
    fs.writeFileSync('dist/app.js', app, 'utf8');
    console.log('Patch 11 injected successfully!');
}
