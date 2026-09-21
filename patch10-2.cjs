const fs = require('fs');

const patchCode2 = `
// ==========================================
// PATCH 10-2: INJECT SIDEBAR LINK
// ==========================================
(function() {
    const oldLayout2 = window.layout;
    window.layout = function(content, title) {
        let html = oldLayout2(content, title);
        
        // Find the <nav class="side-nav"> and inject the subscription link
        const targetHtml = \`</button></nav>\`;
        const newHtml = \`</button>
        <button class="\${state.page==='subscription'?'active':''}" onclick="go('subscription')">
            <span>💳</span> Abonelik & Kontör
        </button>
        </nav>\`;
        
        html = html.replace(targetHtml, newHtml);
        return html;
    };
})();
`;

let app = fs.readFileSync('dist/app.js', 'utf8');
if (!app.includes('PATCH 10-2')) {
    app += '\n' + patchCode2;
    fs.writeFileSync('dist/app.js', app, 'utf8');
    console.log('Patch 10-2 injected successfully!');
}
