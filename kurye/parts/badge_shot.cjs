const {chromium}=require('playwright');(async()=>{const parts=JSON.parse(process.argv[2]);const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1080,height:1920}});await p.goto('file://'+process.argv[3]);await p.evaluate(()=>document.fonts.ready);
for(const x of parts){await p.evaluate(x=>{document.getElementById('big').textContent=x.big;const r=document.getElementById('rec');r.textContent=x.rec||'';r.style.display=x.rec?'inline-block':'none';},x);
await p.waitForTimeout(150);await p.screenshot({path:x.out,omitBackground:true});}await b.close();})();