// node render.cjs <frames_dir>  -> 30 fps JPEG frames of index.html
const {chromium}=require('playwright');const path=require('path');
(async()=>{const out=process.argv[2];const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+path.resolve(__dirname,'index.html'));await p.evaluate(()=>document.fonts.ready);
const D=await p.evaluate(()=>window.DURATION), N=Math.round(D*30);
for(let i=0;i<N;i++){await p.evaluate(t=>window.seek(t),i/30);await p.screenshot({path:`${out}/f${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:92});
 if(i%150===0)console.log(i,'/',N);}
await b.close();})();
