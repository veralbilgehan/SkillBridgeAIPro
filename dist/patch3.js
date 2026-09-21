(function() {
    // 1. Inject CSS for larger login fonts
    const style = document.createElement('style');
    style.innerHTML = `
        .login-inputs input {
            font-size: 18px !important;
            padding: 16px 20px !important;
            height: auto !important;
            border-radius: 10px !important;
        }
        .login-submit {
            font-size: 18px !important;
            padding: 16px !important;
            border-radius: 10px !important;
        }
    `;
    document.head.appendChild(style);

    // 2. Override loginPage to change type="email" to type="text"
    const oldLoginPage = window.loginPage;
    if(oldLoginPage) {
        window.loginPage = function() {
            let html = oldLoginPage();
            // Replace email input with text input
            html = html.replace(
                /<input type="email" aria-label="E-posta adresi" placeholder="E-posta Adresi" required>/,
                '<input type="text" aria-label="Kullanıcı Adı" placeholder="Kullanıcı Adı veya E-posta" required>'
            );
            return html;
        };
    }

    // 3. Override login function to capture the user's input and match DB
    window.login = function() {
        state.logged = true;
        state.page = 'dashboard';
        
        const form = document.getElementById('admin-form') || document.querySelector('form');
        let userName = "Misafir Kullanıcı";
        let userRole = "Kullanıcı";
        
        if (form) {
            const inputs = form.querySelectorAll('input');
            if (inputs.length >= 1) {
                let enteredName = inputs[0].value.trim();
                
                window.authDB = window.authDB || JSON.parse(localStorage.getItem('authbot_db') || '{"companies":[], "users":[], "admins":[]}');
                
                let found = false;
                
                // Check Users
                const matchedUser = window.authDB.users.find(u => u.name.toLowerCase() === enteredName.toLowerCase() || u.name.toLowerCase() + '@' === enteredName.toLowerCase().substring(0, enteredName.indexOf('@') + 1));
                if (matchedUser) {
                    userName = matchedUser.name;
                    userRole = "Kullanıcı" + (matchedUser.companyName ? ` (${matchedUser.companyName})` : "");
                    found = true;
                }
                
                // Check Admins
                if (!found) {
                    const matchedAdmin = window.authDB.admins.find(u => u.name.toLowerCase() === enteredName.toLowerCase() || u.name.toLowerCase() + '@' === enteredName.toLowerCase().substring(0, enteredName.indexOf('@') + 1));
                    if (matchedAdmin) {
                        userName = matchedAdmin.name;
                        userRole = "Şirket Admini" + (matchedAdmin.companyName ? ` (${matchedAdmin.companyName})` : "");
                        found = true;
                    }
                }
                
                // Check Companies (just in case they log in with company name)
                if (!found) {
                    const matchedComp = window.authDB.companies.find(c => c.name.toLowerCase() === enteredName.toLowerCase());
                    if (matchedComp) {
                        userName = matchedComp.name + " Yönetimi";
                        userRole = "Şirket Ana Hesabı";
                        found = true;
                    }
                }
                
                // Fallback: If not found in DB
                if (!found && enteredName) {
                    if(enteredName.includes('@')) {
                        userName = enteredName.split('@')[0].replace(/\./g, ' ');
                        userName = userName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                    } else {
                        userName = enteredName;
                    }
                    userRole = "Sistem Yöneticisi"; 
                }
            }
        }
        
        localStorage.setItem('sb_session', '1');
        localStorage.setItem('sb_active_user', userName);
        localStorage.setItem('sb_active_role', userRole);
        
        render();
    };

    // 4. Override layout to use the dynamic user name
    const oldLayout = window.layout;
    if(oldLayout) {
        window.layout = function(content, title) {
            let html = oldLayout(content, title);
            
            const activeUser = localStorage.getItem('sb_active_user') || 'Bilge Han Veral';
            const activeRole = localStorage.getItem('sb_active_role') || 'Süper Yönetici';
            
            html = html.replace(
                /<strong>Bilge Han Veral<\/strong><span>SkillBridge AI<\/span><small>.*?<\/small>/,
                `<strong>${activeUser}</strong><span>SkillBridge AI</span><small>${activeRole}</small>`
            );

            return html;
        };
    }
    
    // 5. Override candidate test start to save candidate info
    const oldStartCandidateTest = window.startCandidateTest;
    if(oldStartCandidateTest) {
        window.startCandidateTest = function() {
            const candName = document.getElementById('cand-name').value;
            const candId = document.getElementById('cand-id').value;
            if(!candName || !candId) return toast('Ad Soyad ve Test ID zorunludur.');
            
            localStorage.setItem('sb_active_user', candName);
            localStorage.setItem('sb_active_role', 'Aday (' + candId + ')');
            
            state.logged = true;
            state.page = 'candidate-test';
            state.candidateSession = { name: candName, id: candId };
            render();
        };
    }
})();
