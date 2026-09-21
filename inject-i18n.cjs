const fs = require('fs');
let html = fs.readFileSync('dist/index.html', 'utf8');

const translateHtml = `
  <style>
    /* Google Translate Widget Styling */
    #google_translate_element {
      position: fixed;
      bottom: 20px;
      left: 20px;
      z-index: 99999;
      background: white;
      padding: 10px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      font-family: sans-serif;
      border: 1px solid #e2e8f0;
    }
    /* Hide the Google Translate top banner */
    .skiptranslate iframe {
      display: none !important;
    }
    body {
      top: 0px !important;
    }
    /* Style the select dropdown */
    .goog-te-combo {
      padding: 8px;
      border-radius: 6px;
      border: 1px solid #cbd5e1;
      font-size: 14px;
      outline: none;
      cursor: pointer;
    }
  </style>
  <div id="google_translate_element"></div>
  <script type="text/javascript">
    function googleTranslateElementInit() {
      new google.translate.TranslateElement({
        pageLanguage: 'tr',
        includedLanguages: 'tr,en,fr,es,de,ar',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
    }
  </script>
  <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
`;

if (!html.includes('google_translate_element')) {
    html = html.replace('</body>', translateHtml + '\n</body>');
    fs.writeFileSync('dist/index.html', html, 'utf8');
    console.log('Injected Google Translate into index.html');
} else {
    console.log('Already injected.');
}
