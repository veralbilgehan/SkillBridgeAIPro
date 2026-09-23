
import * as db from '../../db.js';

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

const ASSETS = __ASSET_MAP__;
const JSON_HEADERS={"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff"};
const MIME={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".png":"image/png"};
const buckets=new Map();
function json(body,status=200){return new Response(JSON.stringify(body),{status,headers:JSON_HEADERS})}
function ext(path){const i=path.lastIndexOf('.');return i<0?'.html':path.slice(i)}
function bytes(base64){const raw=atob(base64),out=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)out[i]=raw.charCodeAt(i);return out}
function userId(request){return request.headers.get('oai-authenticated-user-id')||''}
function rateAllowed(id){const now=Date.now(),item=buckets.get(id);if(!item||now-item.started>60000){buckets.set(id,{started:now,count:1});return true}item.count++;return item.count<=12}
function securityHeaders(headers){headers.set('x-content-type-options','nosniff');headers.set('referrer-policy','strict-origin-when-cross-origin');headers.set('permissions-policy','camera=(), geolocation=(), payment=()');headers.set('content-security-policy',"default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self' 'unsafe-inline'; connect-src 'self'; font-src 'self' data: https://fonts.gstatic.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'");return headers}
function serve(path){const suffix=ext(path),key=path==='/'?'/index.html':path,asset=ASSETS[key]||(suffix==='.html'?ASSETS['/index.html']:null);if(!asset)return new Response('Not found',{status:404});const headers=securityHeaders(new Headers({'content-type':MIME[ext(key)]||'application/octet-stream','cache-control':key==='/index.html'?'no-cache':'public, max-age=3600'}));return new Response(asset.binary?bytes(asset.data):asset.data,{status:200,headers})}
async function body(request){const size=Number(request.headers.get('content-length')||0);if(size>120000)throw Object.assign(new Error('İstek çok büyük.'),{status:413});const text=await request.text();if(text.length>120000)throw Object.assign(new Error('İstek çok büyük.'),{status:413});return JSON.parse(text||'{}')}
function clean(value,max=30000){return String(value??'').replace(/[\u0000-\u001f]/g,' ').trim().slice(0,max)}
async function generate(request,env){if(!userId(request))return json({error:'Oturum doğrulanamadı.'},401);if(!rateAllowed(userId(request)))return json({error:'Çok fazla istek. Bir dakika sonra yeniden deneyin.'},429);if(!env.GEMINI_API_KEY)return json({error:'GEMINI_API_KEY sunucuda tanımlı değil.'},503);const input=await body(request),prompt=clean(input.prompt);if(prompt.length<20)return json({error:'Üretim talimatı çok kısa.'},400);const model=env.GEMINI_MODEL||'gemini-2.5-flash';const response=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,{method:'POST',headers:{'content-type':'application/json','x-goog-api-key':env.GEMINI_API_KEY},body:JSON.stringify({contents:[{role:'user',parts:[{text:prompt}]}],generationConfig:{temperature:.9,topP:.95}})});const data=await response.json().catch(()=>({}));if(!response.ok)return json({error:data?.error?.message||'Gemini bağlantısı başarısız.'},502);const text=data?.candidates?.[0]?.content?.parts?.map(p=>p.text||'').join('')||'';return json({text,model})}
export default{async fetch(request,env){const url=new URL(request.url);try{if(url.pathname==='/api/health')return json({server:'online',authenticated:Boolean(userId(request)),gemini:Boolean(env.GEMINI_API_KEY),model:env.GEMINI_MODEL||'gemini-2.5-flash'});
    if(url.pathname.startsWith('/api/companies') || 
       url.pathname.startsWith('/api/users') || 
       url.pathname.startsWith('/api/cases') || 
       url.pathname.startsWith('/api/test_sessions') || 
       url.pathname.startsWith('/api/answers') || 
       url.pathname.startsWith('/api/results')) {
        return await handleDbApi(request, url);
    }
    
    if(url.pathname==='/api/generate'){if(request.method!=='POST')return json({error:'Yönteme izin verilmiyor.'},405);return await generate(request,env)}return serve(url.pathname)}catch(error){return json({error:clean(error?.message||'Sunucu hatası',500)},Number(error?.status)||500)}}};
