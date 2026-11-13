
import * as db from '../../db.js';
import { getStore, publicView, newToken, hashToken, GroupError } from '../../group-store.js';

async function handleDbApi(req, url) {
    const path = url.pathname.replace('/api/', '');
    const method = req.method;
    
    try {
        if (method === 'GET') {
            const table = path; // e.g. /api/users -> users
            // Extremely simple ORM logic for prototype
            const rows = await db.query(`SELECT * FROM ${table} LIMIT 100`);
            return new Response(JSON.stringify(rows), { headers: { 'content-type': 'application/json' } });
        }
        if (method === 'POST') {
            const table = path;
            const data = await req.json();
            const keys = Object.keys(data);
            const values = Object.values(data);
            const placeholders = keys.map(() => '?').join(',');
            
            await db.run(`INSERT INTO ${table} (${keys.join(',')}) VALUES (${placeholders})`, values);
            return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json' } });
        }
    } catch(e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'content-type': 'application/json' } });
    }
}

// ---------------------------------------------------------------
// TOPLU TEST (QR) API
// POST /api/group-tests                 → test yayınla (yönetici anahtarı döner)
// GET  /api/group-tests/:id             → katılımcı görünümü (doğru cevaplar yok)
// POST /api/group-tests/:id/join        → ad + sicil ile giriş (sicil başına tek giriş)
// POST /api/group-tests/:id/submit      → cevapları gönder, sunucu puanlar
// GET  /api/group-tests/:id/results     → x-admin-token: sonuçlar, ortalama, sıralama
// POST /api/group-tests/:id/status      → x-admin-token: open / closed
// ---------------------------------------------------------------
async function groupTestsApi(request, url, env) {
    const store = await getStore(env);
    const [, , , id, action] = url.pathname.split('/');
    const method = request.method;
    try {
        if (!id && method === 'POST') return json(await createGroupTest(store, await body(request, 1000000)), 201);
        if (!id || !/^[A-Za-z0-9_-]{6,40}$/.test(id)) return json({ error: 'Geçersiz test.' }, 404);

        if (!action && method === 'GET') {
            const test = await store.getTest(id);
            if (!test) return json({ error: 'Test bulunamadı.' }, 404);
            return json(publicView(test, await store.joinedCount(id)));
        }
        if (action === 'join' && method === 'POST') {
            const input = await body(request);
            const name = clean(input.name, 100), sicil = clean(input.sicil, 40);
            if (name.length < 3 || !sicil) return json({ error: 'Ad soyad ve sicil numarası zorunludur.' }, 400);
            const result = await store.join(id, { name, sicil, resumeToken: clean(input.resumeToken, 100) });
            return json({ ok: true, resume: result.resume, token: result.token || null, name: result.participant.name, startedAt: result.participant.startedAt });
        }
        if (action === 'submit' && method === 'POST') {
            const input = await body(request);
            const answers = Array.isArray(input.answers) ? input.answers.slice(0, 100).map(a => (Number.isInteger(a) && a >= 0 && a < 4) ? a : null) : [];
            await store.submit(id, clean(input.sicil, 40), { token: clean(input.token, 100), answers, durations: input.durations });
            // Puan katılımcıya gösterilmez; sonuçlar yalnızca test yöneticisine gider
            return json({ ok: true });
        }

        // Yönetici işlemleri
        const test = await store.getTest(id);
        if (!test) return json({ error: 'Test bulunamadı.' }, 404);
        if (hashToken(request.headers.get('x-admin-token') || '') !== test.adminTokenHash) return json({ error: 'Yetkisiz.' }, 403);

        if (action === 'results' && method === 'GET') {
            const people = (await store.participants(id)).map(({ tokenHash, ...p }) => p);
            const done = people.filter(p => p.status === 'submitted').sort((a, b) => b.score - a.score || a.seconds - b.seconds);
            const scores = done.map(p => p.score);
            const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
            const sorted = [...scores].sort((a, b) => a - b);
            const median = sorted.length ? (sorted.length % 2 ? sorted[(sorted.length - 1) / 2] : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2) : 0;
            const { adminTokenHash, ...meta } = test;
            return json({
                test: meta,
                stats: {
                    joined: people.length, submitted: done.length, inProgress: people.length - done.length,
                    average: Math.round(avg * 10) / 10, median,
                    max: scores.length ? sorted[sorted.length - 1] : 0, min: scores.length ? sorted[0] : 0
                },
                ranking: done.map((p, i) => ({ ...p, rank: i + 1, diffFromAverage: Math.round((p.score - avg) * 10) / 10 })),
                inProgress: people.filter(p => p.status !== 'submitted').map(p => ({ name: p.name, sicil: p.sicil, startedAt: p.startedAt }))
            });
        }
        if (action === 'status' && method === 'POST') {
            const status = (await body(request)).status === 'closed' ? 'closed' : 'open';
            await store.setStatus(id, status);
            return json({ ok: true, status });
        }
        return json({ error: 'Bulunamadı.' }, 404);
    } catch (e) {
        if (e instanceof GroupError) return json({ error: e.message }, e.status);
        throw e;
    }
}

async function createGroupTest(store, input) {
    const questions = Array.isArray(input.questions) ? input.questions : [];
    if (questions.length < 1 || questions.length > 100) throw new GroupError(400, 'Testte 1 ile 100 arasında soru olmalıdır.');
    const clean4 = questions.map((q, i) => {
        const options = Array.isArray(q.options) ? q.options.map(o => clean(o, 1000)) : [];
        const answer = Number(q.answer);
        if (!clean(q.text, 2000) || options.length !== 4 || options.some(o => !o) || !Number.isInteger(answer) || answer < 0 || answer > 3) {
            throw new GroupError(400, (i + 1) + '. soru geçersiz: 4 seçenek ve doğru cevap gereklidir.');
        }
        return { text: clean(q.text, 2000), options, answer, level: clean(q.level, 40), rationale: clean(q.rationale, 2000) };
    });
    const capacity = Math.round(Number(input.capacity));
    if (!(capacity >= 1 && capacity <= 1000)) throw new GroupError(400, 'Kapasite 1 ile 1000 arasında olmalıdır.');
    const adminToken = newToken();
    const test = {
        id: newToken().replace(/[-_]/g, '').slice(0, 10),
        title: clean(input.title, 200) || 'Toplu Test',
        // clean() satır sonlarını da siler; vaka metninde paragraflar korunur
        caseText: String(input.caseText ?? '').replace(/[\u0000-\u0008\u000b-\u001f]/g, ' ').trim().slice(0, 20000),
        questions: clean4,
        capacity,
        timeLimitMinutes: Math.min(300, Math.max(1, Math.round(Number(input.timeLimitMinutes) || questions.length * 2))),
        status: 'open',
        owner: clean(input.owner, 200),
        createdAt: Date.now(),
        adminTokenHash: hashToken(adminToken)
    };
    await store.createTest(test);
    return { id: test.id, adminToken, title: test.title, capacity, timeLimitMinutes: test.timeLimitMinutes, createdAt: test.createdAt };
}

const ASSETS = __ASSET_MAP__;
const JSON_HEADERS={"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff"};
const MIME={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".png":"image/png"};
const buckets=new Map();
function json(body,status=200){return new Response(JSON.stringify(body),{status,headers:JSON_HEADERS})}
function ext(path){const i=path.lastIndexOf('.');return i<0?'.html':path.slice(i)}
function bytes(base64){const raw=atob(base64),out=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)out[i]=raw.charCodeAt(i);return out}
function userId(request){return request.headers.get('oai-authenticated-user-id')||''}
function rateAllowed(id){const now=Date.now(),item=buckets.get(id);if(!item||now-item.started>60000){buckets.set(id,{started:now,count:1});return true}item.count++;return item.count<=60}
function securityHeaders(headers){headers.set('x-content-type-options','nosniff');headers.set('referrer-policy','strict-origin-when-cross-origin');headers.set('permissions-policy','camera=(), geolocation=(), payment=()');headers.set('content-security-policy',"default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' 'unsafe-inline'; connect-src 'self'; font-src 'self' data: https://fonts.gstatic.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'");return headers}
function serve(path){const suffix=ext(path),key=path==='/'?'/index.html':path,asset=ASSETS[key]||(suffix==='.html'?ASSETS['/index.html']:null);if(!asset)return new Response('Not found',{status:404});const headers=securityHeaders(new Headers({'content-type':MIME[ext(key)]||'application/octet-stream','cache-control':'no-cache, no-store, must-revalidate'}));return new Response(asset.binary?bytes(asset.data):asset.data,{status:200,headers})}
async function body(request,max=120000){const size=Number(request.headers.get('content-length')||0);if(size>max)throw Object.assign(new Error('İstek çok büyük.'),{status:413});const text=await request.text();if(text.length>max)throw Object.assign(new Error('İstek çok büyük.'),{status:413});return JSON.parse(text||'{}')}
function clean(value,max=30000){return String(value??'').replace(/[\u0000-\u001f]/g,' ').trim().slice(0,max)}
async function generate(request,env){if(!userId(request))return json({error:'Oturum doğrulanamadı.'},401);if(!rateAllowed(userId(request)))return json({error:'Çok fazla istek. Bir dakika sonra yeniden deneyin.'},429);if(!env.GEMINI_API_KEY)return json({error:'GEMINI_API_KEY sunucuda tanımlı değil.'},503);const input=await body(request),prompt=clean(input.prompt);if(prompt.length<20)return json({error:'Üretim talimatı çok kısa.'},400);const model=env.GEMINI_MODEL||'gemini-2.5-flash';const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{method:'POST',headers:{'content-type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({contents:[{role:'user',parts:[{text:prompt}]}],generationConfig:{temperature:.9,topP:.95}})});const data=await response.json().catch(()=>({}));if(!response.ok){const raw=data?.error?.message||'';let msg=raw||'Gemini bağlantısı başarısız.';if(/spending cap/i.test(raw))msg='AI servisi aylık harcama limitine ulaştı. Yönetici ai.studio/spend adresinden limiti artırmalı veya yeni bir API anahtarı tanımlamalı.';else if(response.status===429||/quota|rate limit|resource.?exhausted/i.test(raw))msg='AI servisi kota sınırına ulaştı. Lütfen biraz sonra tekrar deneyin.';else if(/api key not valid|API_KEY_INVALID|permission/i.test(raw))msg='Gemini API anahtarı geçersiz veya yetkisiz. Sunucudaki GEMINI_API_KEY değerini kontrol edin.';return json({error:msg},502)}const text=data?.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('')||'';return json({text,model})}
export default{async fetch(request,env){const url=new URL(request.url);try{if(url.pathname==='/api/health')return json({server:'online',authenticated:Boolean(userId(request)),gemini:Boolean(env.GEMINI_API_KEY),model:env.GEMINI_MODEL||'gemini-2.5-flash'});
    if(url.pathname.startsWith('/api/group-tests'))return await groupTestsApi(request,url,env);

    if(url.pathname.startsWith('/api/companies') || 
       url.pathname.startsWith('/api/users') || 
       url.pathname.startsWith('/api/cases') || 
       url.pathname.startsWith('/api/test_sessions') || 
       url.pathname.startsWith('/api/answers') || 
       url.pathname.startsWith('/api/results')) {
        return await handleDbApi(request, url);
    }
    
    if(url.pathname === '/api/payment' && request.method === 'POST') {
        try {
            const data = await body(request);
            const amount = data.amount || 100;
            const user = data.user || 'demo@sirket.com';
            const orderId = 'ORD-' + Date.now();
            const PAYNKOLAY_MERCHANT_ID = env.PAYNKOLAY_MERCHANT_ID || 'TEST_MERCHANT';
            const hash = 'MOCK_HASH_12345';
            const callbackUrl = `${url.origin}/api/payment/callback`;

            const formHtml = `<!doctype html>
<html>
<head><meta charset="utf-8"><title>Ödeme Yönlendiriliyor...</title></head>
<body onload="document.forms[0].submit()">
  <p style="font-family:sans-serif;text-align:center;margin-top:50px;">Güvenli ödeme sayfasına yönlendiriliyorsunuz...</p>
  <form action="${callbackUrl}" method="POST">
     <input type="hidden" name="merchant_id" value="${PAYNKOLAY_MERCHANT_ID}">
     <input type="hidden" name="order_id" value="${orderId}">
     <input type="hidden" name="amount" value="${amount}">
     <input type="hidden" name="user_email" value="${user}">
     <input type="hidden" name="hash" value="${hash}">
     <input type="hidden" name="status" value="success">
     <noscript><input type="submit" value="Ödemeyi Tamamla"></noscript>
  </form>
</body>
</html>`;
            return new Response(formHtml, { headers: { 'content-type': 'text/html; charset=utf-8' } });
        } catch(e) {
            return json({error: e.message}, 500);
        }
    }

    if(url.pathname.includes('/api/payment/callback') && request.method === 'POST') {
        try {
            const formData = await request.formData();
            const status = formData.get('status');
            const amount = parseInt(formData.get('amount') || '0');
            const user = formData.get('user_email') || '';
            if(status === 'success') {
                const redirectUrl = `/?p=subscription&payment_status=success&amount=${amount}&user=${encodeURIComponent(user)}`;
                return new Response(null, { status: 302, headers: { 'Location': redirectUrl } });
            } else {
                return new Response(null, { status: 302, headers: { 'Location': '/?p=subscription&payment_status=failed' } });
            }
        } catch(e) {
            return json({error: e.message}, 500);
        }
    }

    if(url.pathname==='/api/generate'){if(request.method!=='POST')return json({error:'Yönteme izin verilmiyor.'},405);return await generate(request,env)}
    if(url.pathname.startsWith('/api/')) return json({error:'Bulunamadı'}, 404);
    return serve(url.pathname)}catch(error){return json({error:clean(error?.message||'Sunucu hatası',500)},Number(error?.status)||500)}}};
