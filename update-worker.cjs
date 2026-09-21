const fs = require('fs');

let c = fs.readFileSync('worker/index.js', 'utf8');

const paymentLogic = `
  // --- PAYNKOLAY VIRTUAL POS INTEGRATION ---
  if(req.url === '/api/payment' && req.method === 'POST') {
    try {
      const data = await req.json();
      const amount = data.amount || 100;
      const user = data.user || 'demo@sirket.com';
      const orderId = 'ORD-' + Date.now();
      
      const PAYNKOLAY_MERCHANT_ID = env.PAYNKOLAY_MERCHANT_ID || 'TEST_MERCHANT';
      const PAYNKOLAY_API_KEY = env.PAYNKOLAY_API_KEY || 'TEST_KEY';
      const PAYNKOLAY_SECRET = env.PAYNKOLAY_SECRET || 'TEST_SECRET';
      
      // In a real scenario, you generate HMAC SHA256 hash here.
      // const hash = btoa(crypto.subtle.sign(...));
      const hash = 'MOCK_HASH_12345';
      
      const successUrl = \`\${new URL(req.url).origin}/api/payment/callback\`;
      const failUrl = \`\${new URL(req.url).origin}/api/payment/callback\`;

      // Simulating a PaynKolay payment HTML form redirection
      // Replace action with actual PaynKolay endpoint
      const html = \`
      <html>
      <body onload="document.forms[0].submit()">
        <form action="\${successUrl}" method="POST">
           <input type="hidden" name="merchant_id" value="\${PAYNKOLAY_MERCHANT_ID}">
           <input type="hidden" name="order_id" value="\${orderId}">
           <input type="hidden" name="amount" value="\${amount}">
           <input type="hidden" name="user_email" value="\${user}">
           <input type="hidden" name="hash" value="\${hash}">
           <input type="hidden" name="status" value="success">
           <noscript><input type="submit" value="Ödeme Sayfasına Git"></noscript>
        </form>
      </body>
      </html>\`;

      return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
    } catch(e) {
      return new Response(JSON.stringify({error: e.message}), { status: 500 });
    }
  }

  // --- PAYNKOLAY CALLBACK (WEBHOOK) ---
  if(req.url.includes('/api/payment/callback') && req.method === 'POST') {
    try {
      const formData = await req.formData();
      const status = formData.get('status');
      const amount = parseInt(formData.get('amount'));
      const user = formData.get('user_email');
      const orderId = formData.get('order_id');
      
      if(status === 'success') {
        // Render an HTML page that communicates with localStorage in the parent frame or redirects
        // Since localStorage is domain-specific, sending a redirect back to the app with a success param
        const redirectUrl = \`/?p=subscription&payment_status=success&amount=\${amount}&user=\${encodeURIComponent(user)}\`;
        
        return new Response(null, {
          status: 302,
          headers: { 'Location': redirectUrl }
        });
      } else {
        return new Response(null, {
          status: 302,
          headers: { 'Location': '/?p=subscription&payment_status=failed' }
        });
      }
    } catch(e) {
      return new Response(JSON.stringify({error: e.message}), { status: 500 });
    }
  }
`;

// Insert the payment logic right before the `if(req.url==='/api/generate'`
c = c.replace(/if\(req\.url==='\/api\/generate'/g, paymentLogic + '\n  if(req.url===\'/api/generate\'');

fs.writeFileSync('worker/index.js', c);
console.log('Updated worker/index.js with payment logic');
