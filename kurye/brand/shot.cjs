const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1080}});
await p.goto('file://'+process.argv[2]);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
for(const id of ['A','B','C']){const el=await p.$('#'+id);await el.screenshot({path:process.argv[3]+'/mikro-dunya-profil-'+id+'.png'});}
// circle preview sheet
await p.setViewportSize({width:1500,height:560});
await p.setContent(`<html><body style="margin:0;background:#f2f2f2;display:flex;gap:40px;padding:40px;font-family:sans-serif">${['A','B','C'].map(id=>`<div style="text-align:center"><img src="file://${process.argv[3]}/mikro-dunya-profil-${id}.png" style="width:420px;height:420px;border-radius:50%;box-shadow:0 2px 8px #0004"><div style="margin-top:10px;font-size:28px">${id}</div><img src="file://${process.argv[3]}/mikro-dunya-profil-${id}.png" style="width:56px;height:56px;border-radius:50%"></div>`).join('')}</body></html>`);
await p.waitForTimeout(300);await p.screenshot({path:process.argv[3]+'/onizleme-yuvarlak.png'});await b.close();})();
