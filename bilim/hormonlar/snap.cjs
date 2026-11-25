// node snap.cjs <scene> <out_dir> t1 t2 ...  -> PNG frames + contact sheet input (times may be "line:frac" e.g. s0_02:.5)
const {chromium}=require('playwright');const path=require('path');
(async()=>{const [scene,out,...ts]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
let errs=0;p.on('pageerror',e=>{errs++;console.log('ERR',e.message)});p.on('console',m=>{if(m.type()==='error'||m.type()==='warning')console.log('LOG',m.text())});
await p.goto('file://'+path.resolve(__dirname,'player.html')+'?scene='+scene);await p.evaluate(()=>document.fonts.ready);
const dur=await p.evaluate(()=>window.DURATION);console.log('dur',dur);
for(const t of ts){await p.evaluate(t=>window.seek(t),+t);await p.screenshot({path:`${out}/${scene}_${(+t).toFixed(2).padStart(7,'0')}.png`});}
await b.close();})();
