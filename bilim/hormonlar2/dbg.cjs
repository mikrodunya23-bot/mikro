const {chromium}=require('playwright');const path=require('path');
(async()=>{const [scene,t,...sels]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+path.resolve(__dirname,'player.html')+'?scene='+scene);
await p.evaluate(t=>window.seek(t),+t);
for(const s of sels){console.log(s, await p.evaluate(s=>{const e=document.querySelector(s);if(!e)return 'none';const cs=getComputedStyle(e);return JSON.stringify({op:cs.opacity,vis:cs.visibility,tr:e.getAttribute('transform'),st:e.getAttribute('style')})},s));}
await b.close();})();
