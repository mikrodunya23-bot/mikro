const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
p.on('pageerror',e=>console.log('ERR',e.message));
for(let n=1;n<=7;n++){await p.goto('file://'+process.argv[2]+'?ep='+n);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
await p.screenshot({path:`${process.argv[3]}/gizemli-kurye-bolum-${n}-kapak.png`});}await b.close();})();
