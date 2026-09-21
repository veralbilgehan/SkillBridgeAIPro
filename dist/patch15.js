
// ==========================================
// PATCH 15: SIDEBAR REORGANIZATION
// ==========================================
(function() {
    const oldLayout15 = window.layout;
    window.layout = function(content, title) {
        let html = oldLayout15(content, title);
        
        const navStart = html.indexOf('<nav class="nav"');
        const navEnd = html.indexOf('</nav>', navStart);
        
        if (navStart !== -1 && navEnd !== -1) {
            const isTestGroup = ['tests', 'evaluation', 'results', 'test-platform'].includes(state.page);
            const isCaseGroup = ['archive', 'documents', 'prompt', 'meetings', 'questions', 'comparison'].includes(state.page);
            const isSettings = ['personal-data','data-banking','hr-specialist','agents','server','user-credits'].includes(state.page);
            
            const newNav = `<nav class="nav" aria-label="Ana menü">
    <button class="nav-violet ${state.page==='dashboard'?'active':''}" onclick="go('dashboard')"><span class="nav-dot"></span><span>Genel Bakış</span></button>
    
    <div class="delivery-menu">
        <details ${isTestGroup ? 'open' : ''}>
            <summary><span class="nav-dot" style="background:#0ea5e9"></span><span>Test İşlemleri</span></summary>
            <div>
                <button class="${state.page==='tests'?'active':''}" onclick="go('tests')">Test Yönetimi</button>
                <button class="${state.page==='evaluation'?'active':''}" onclick="go('evaluation')">Test Değerlendirme</button>
                <button class="${state.page==='results'?'active':''}" onclick="go('results')">Test Sonuçları</button>
                <button class="${state.page==='test-platform'?'active':''}" onclick="go('test-platform')">Test Platformu</button>
            </div>
        </details>
    </div>

    <div class="delivery-menu">
        <details ${isCaseGroup ? 'open' : ''}>
            <summary><span class="nav-dot" style="background:#f59e0b"></span><span>Vaka İşlemleri</span></summary>
            <div>
                <button class="${state.page==='archive'?'active':''}" onclick="go('archive')">Evrak Kutusu</button>
                <button class="${state.page==='documents'?'active':''}" onclick="go('documents')">Belgeden Vaka Yarat</button>
                <button class="${state.page==='prompt'?'active':''}" onclick="go('prompt')">Formdan Vaka Yarat</button>
                <button class="${state.page==='meetings'?'active':''}" onclick="go('meetings')">Meet & Teams Vaka</button>
                <button class="${state.page==='questions'?'active':''}" onclick="go('questions')">Açık Uçlu Vaka Testi</button>
                <button class="${state.page==='comparison'?'active':''}" onclick="go('comparison')">Karşılaştırma</button>
            </div>
        </details>
    </div>

    <div class="delivery-menu">
        <details ${isSettings ? 'open' : ''}>
            <summary><span class="nav-dot" style="background:#94a3b8"></span><span>Ayarlar</span></summary>
            <div>
                <button class="${state.page==='user-credits'?'active':''}" onclick="go('user-credits')">Kullanıcı & Kontör Log</button>
                <button class="${state.page==='personal-data'?'active':''}" onclick="go('personal-data')">Sayfa 14</button>
                <button class="${state.page==='data-banking'?'active':''}" onclick="go('data-banking')">Sayfa 15</button>
                <button class="${state.page==='hr-specialist'?'active':''}" onclick="go('hr-specialist')">Soru & Vaka Üretimi</button>
                <button class="${state.page==='agents'?'active':''}" onclick="go('agents')">Ajan Yönetimi</button>
                <button class="${state.page==='server'?'active':''}" onclick="go('server')">Sunucu Ayarları</button>
            </div>
        </details>
    </div>
    
    <button class="${state.page==='subscription'?'active':''}" onclick="go('subscription')" style="margin-top:10px;">
        <span>💳</span> Abonelik & Kontör
    </button>
</nav>`;
            
            html = html.substring(0, navStart) + newNav + html.substring(navEnd + 6);
        }
        
        return html;
    };
})();
