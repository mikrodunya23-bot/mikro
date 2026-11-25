// node render.cjs <scene> <frames_dir> <sfx_json>  -> 30fps JPEG frames + the scene's sfx cue list
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
(async()=>{const [scene,out,sj]=process.argv.slice(2);fs.mkdirSync(out,{recursive:true});
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
p.on('pageerror',e=>console.log('ERR',scene,e.message));
await p.goto('file://'+path.resolve(__dirname,'player.html')+'?scene='+scene);await p.evaluate(()=>document.fonts.ready);
const D=await p.evaluate(()=>window.DURATION), N=Math.round(D*30);
fs.writeFileSync(sj, JSON.stringify(await p.evaluate(()=>window.SFX)));
for(let i=0;i<N;i++){await p.evaluate(t=>window.seek(t),i/30);await p.screenshot({path:`${out}/f${String(i).padStart(5,'0')}.jpg`,type:'jpeg',quality:90});}
console.log(scene,'frames',N);await b.close();})();
