import http from 'node:http';
import {readFile} from 'node:fs/promises';

async function loadEnv(){
  try{
    const text=await readFile(new URL('../.env',import.meta.url),'utf8');
    for(const line of text.split(/\r?\n/)){
      const clean=line.trim();
      if(!clean||clean.startsWith('#')||!clean.includes('='))continue;
      const index=clean.indexOf('=');
      const key=clean.slice(0,index).trim();
      const value=clean.slice(index+1).trim().replace(/^['"]|['"]$/g,'');
      if(key&&!process.env[key])process.env[key]=value;
    }
  }catch{
    if(process.env.GEMINI_API_KEY)return;
    console.error('HATA: .env dosyası bulunamadı. .env.example dosyasını .env olarak kopyalayın.');
    process.exit(1);
  }
}

await loadEnv();
const worker=(await import('../dist/server/index.js?local='+Date.now())).default;
const port=Number(process.env.PORT||8787);

const server=http.createServer(async(req,res)=>{
  try{
    const chunks=[];
    for await(const chunk of req)chunks.push(chunk);
    const headers=new Headers();
    for(const [key,value] of Object.entries(req.headers))if(value)headers.set(key,Array.isArray(value)?value.join(', '):value);
    headers.set('oai-authenticated-user-id','local-admin');
    const method=req.method||'GET';
    const request=new Request(`http://localhost:${port}${req.url||'/'}`,{method,headers,body:['GET','HEAD'].includes(method)?undefined:Buffer.concat(chunks)});
    const response=await worker.fetch(request,process.env,{});
    res.statusCode=response.status;
    for(const [key,value] of response.headers)res.setHeader(key,value);
    res.end(Buffer.from(await response.arrayBuffer()));
  }catch(error){
    res.statusCode=500;
    res.setHeader('content-type','application/json; charset=utf-8');
    res.end(JSON.stringify({error:error.message}));
  }
});

server.listen(port,'0.0.0.0',()=>{
  console.log('');
  console.log('SkillBridgeAIPro yerel sunucusu çalışıyor:');
  console.log(`http://localhost:${port}`);
  console.log('');
  console.log('Kapatmak için bu pencerede Ctrl+C tuşlarına basın.');
});
