const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));
for(const [q,out] of [['','gizemli-kurye-instagram-bolum2-yayinda.png'],['?p=tiktok','gizemli-kurye-tiktok-bolum2-yayinda.png']]){
await p.goto('file://'+process.argv[2]+q);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);await p.screenshot({path:process.argv[3]+'/'+out});}
await b.close();})();
