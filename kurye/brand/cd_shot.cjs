const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));
for(const [w,out] of [['','gizemli-kurye-gerisayim-bu-aksam.png'],['<b>YARIN</b> 20:00','gizemli-kurye-gerisayim-yarin.png']]){
await p.goto('file://'+process.argv[2]+(w?'?when='+encodeURIComponent(w):''));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
await p.screenshot({path:process.argv[3]+'/'+out});}
// preview with a mock sticker to check placement (not delivered as the cover)
await p.goto('file://'+process.argv[2]);await p.evaluate(()=>document.fonts.ready);
await p.evaluate(()=>{const d=document.createElement('div');d.style.cssText='position:absolute;left:190px;top:960px;width:700px;height:300px;background:#fff;border-radius:40px;box-shadow:0 6px 30px #0006;display:flex;align-items:center;justify-content:center;font:bold 40px sans-serif;color:#999';d.textContent='GERİ SAYIM ÇIKARTMASI';document.body.appendChild(d);});
await p.waitForTimeout(200);await p.screenshot({path:process.argv[3]+'/_onizleme-cikartmali.png'});await b.close();})();
