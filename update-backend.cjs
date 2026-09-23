const fs = require('fs');
let c = fs.readFileSync('worker/index.js', 'utf8');

const dbLogic = `
import * as db from '../db.js';

async function handleDbApi(req, url) {
    const path = url.pathname.replace('/api/', '');
    const method = req.method;
    
    try {
        if (method === 'GET') {
            const table = path; // e.g. /api/users -> users
            // Extremely simple ORM logic for prototype
            const rows = await db.query(\`SELECT * FROM \${table} LIMIT 100\`);
            return new Response(JSON.stringify(rows), { headers: { 'content-type': 'application/json' } });
        }
        if (method === 'POST') {
            const table = path;
            const data = await req.json();
            const keys = Object.keys(data);
            const values = Object.values(data);
            const placeholders = keys.map(() => '?').join(',');
            
            await db.run(\`INSERT INTO \${table} (\${keys.join(',')}) VALUES (\${placeholders})\`, values);
            return new Response(JSON.stringify({ success: true }), { headers: { 'content-type': 'application/json' } });
        }
    } catch(e) {
        return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'content-type': 'application/json' } });
    }
}
`;

// Insert the import at the top
c = dbLogic + '\n' + c;

// Add router interception
c = c.replace(/if\(url\.pathname==='\/api\/generate'\)\{/, `
    if(url.pathname.startsWith('/api/companies') || 
       url.pathname.startsWith('/api/users') || 
       url.pathname.startsWith('/api/cases') || 
       url.pathname.startsWith('/api/test_sessions') || 
       url.pathname.startsWith('/api/answers') || 
       url.pathname.startsWith('/api/results')) {
        return await handleDbApi(request, url);
    }
    
    if(url.pathname==='/api/generate'){`);

fs.writeFileSync('worker/index.js', c);
console.log('Worker updated with database REST API');
