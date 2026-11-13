import {readFile,mkdir,writeFile} from 'node:fs/promises';
const files=['index.html','app.js','databank-extra.js','databank-custom.js','bigakce-brand.js','nav-topbar.js','styles.css','matrix-data.js','brand-partners.png','group.html','group.js'];
const assets={};
for(const file of files){const binary=file.endsWith('.png'),data=await readFile(new URL(`../dist/${file}`,import.meta.url));assets[`/${file}`]={binary,data:binary?data.toString('base64'):data.toString('utf8')}}
// QR kütüphanesi (MIT) dış servise gitmeden tarayıcıda QR üretir; CSP img-src dış adreslere kapalı
assets['/qrcode.js']={binary:false,data:(await readFile(new URL('../node_modules/qrcode-generator/dist/qrcode.js',import.meta.url))).toString('utf8')};
const source=await readFile(new URL('../worker/index.js',import.meta.url),'utf8');
await mkdir(new URL('../dist/server/',import.meta.url),{recursive:true});
await writeFile(new URL('../dist/server/index.js',import.meta.url),source.replace('__ASSET_MAP__',()=>JSON.stringify(assets)));
console.log('dist/server/index.js hazır');

