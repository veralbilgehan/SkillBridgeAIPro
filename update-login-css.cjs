const fs = require('fs');
let css = fs.readFileSync('dist/styles.css', 'utf8');

// Replace large widths and paddings
css = css.replace(/width:min\(846px,100%\)/g, 'width:min(480px,100%)');
css = css.replace(/padding:70px 74px 78px/g, 'padding:40px 40px 45px');
css = css.replace(/padding:38px 22px;border-radius:22px/g, 'padding:24px 20px;border-radius:18px');

// Replace font sizes and paddings of inputs/buttons
css = css.replace(/font-size:36pt/g, 'font-size:28pt');
css = css.replace(/font-size:1.35rem/g, 'font-size:1.1rem');
css = css.replace(/padding:26px 24px/g, 'padding:16px 20px');
css = css.replace(/padding:24px;font-size:1.35rem/g, 'padding:16px;font-size:1.1rem');

// Some other possible styles
css = css.replace(/margin:68px 0 12px/g, 'margin:30px 0 10px');
css = css.replace(/margin:34px 0 12px/g, 'margin:20px 0 10px');
css = css.replace(/margin-bottom:40px/g, 'margin-bottom:25px');

fs.writeFileSync('dist/styles.css', css, 'utf8');
console.log('Updated styles.css for smaller login screen');
