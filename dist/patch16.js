
// ==========================================
// PATCH 16: KONTOR ISLEMLERI DROPDOWN
// ==========================================
(function() {
    const oldLayout16 = window.layout;
    window.layout = function(content, title) {
        let html = oldLayout16(content, title);
        
        // Remove the top-right button since we're moving it to sidebar
        html = html.replace(/<button onclick="openTransferModal()"[^>]*>.*?<\/button>/, '');
        
        // Find the "Abonelik & Kontör" standalone button in the sidebar and replace it with a dropdown
        const subButtonRegex = /<button class="[^"]*" onclick="go\('subscription'\)"[^>]*>[\s\S]*?<\/button>/;
        
        const kontorDropdown = `
    <div class="delivery-menu">
        <details ${['subscription'].includes(state.page) ? 'open' : ''}>
            <summary><span class="nav-dot" style="background:#10b981"></span><span>Kontör İşlemleri</span></summary>
            <div>
                <button class="${state.page==='subscription'?'active':''}" onclick="go('subscription')">Abonelik & Kontör Al</button>
                <button onclick="openTransferModal()">🎁 Hediye Kontör Gönder</button>
            </div>
        </details>
    </div>
        `;
        
        if (html.match(subButtonRegex)) {
            html = html.replace(subButtonRegex, kontorDropdown);
        }
        
        return html;
    };
})();
