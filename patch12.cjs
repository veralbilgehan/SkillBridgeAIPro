const fs = require('fs');

const patchCode12 = `
// ==========================================
// PATCH 12: SPLASH SCREEN
// ==========================================
(function() {
    window.showSplashScreen = function() {
        // Only show if not logged in and hasn't been seen in this session
        if (state.logged || sessionStorage.getItem('splash_seen')) return;
        
        const splash = document.createElement('div');
        splash.id = 'splash-screen';
        splash.style.cssText = 'position:fixed; top:0; left:0; width:100vw; height:100vh; background:white; z-index:999999; display:flex; justify-content:center; align-items:center; opacity:1; transition: opacity 0.8s ease-in-out;';
        splash.innerHTML = '<h1 style="font-family: Arial, sans-serif; font-size: clamp(40px, 6vw, 80px); font-weight: bold; color: black; margin:0; letter-spacing: -1px;">SkillBridgeAIPro</h1>';
        
        // Append to body so it covers everything
        document.body.appendChild(splash);
        
        // Hide after 2 seconds
        setTimeout(() => {
            splash.style.opacity = '0';
            setTimeout(() => {
                splash.remove();
                sessionStorage.setItem('splash_seen', '1');
            }, 800);
        }, 2000);
    };

    // We need to trigger this when render() happens for the login page
    const oldRender12 = window.render;
    window.render = function() {
        oldRender12();
        if (!state.logged) {
            showSplashScreen();
        }
    };
    
    // Trigger on first load if already rendered
    if (!state.logged) {
        showSplashScreen();
    }
})();
`;

let app = fs.readFileSync('dist/app.js', 'utf8');
if (!app.includes('PATCH 12: SPLASH SCREEN')) {
    fs.writeFileSync('dist/patch12.js', patchCode12, 'utf8');
    app += '\n' + patchCode12;
    fs.writeFileSync('dist/app.js', app, 'utf8');
    console.log('Patch 12 injected successfully!');
} else {
    console.log('Patch 12 already injected.');
}
