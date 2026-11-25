// node snap.cjs out_dir t1 t2 ...  -> PNG frames for review
const {chromium}=require('playwright');const path=require('path');
(async()=>{const [out,...ts]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>console.log('LOG',m.text()));
await p.goto('file://'+path.resolve(__dirname,'index.html'));await p.evaluate(()=>document.fonts.ready);
for(const t of ts){await p.evaluate(t=>window.seek(t),+t);await p.screenshot({path:`${out}/s_${t}.png`});}
await b.close();})();
