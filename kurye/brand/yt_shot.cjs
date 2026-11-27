const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:2560,height:2200}});
p.on('pageerror',e=>console.log('ERR',e.message));await p.goto('file://'+process.argv[2]);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
await (await p.$('#banner')).screenshot({path:process.argv[3]+'/mikro-dunya-youtube-banner.png'});
await (await p.$('#thumb')).screenshot({path:process.argv[3]+'/gizemli-kurye-youtube-kucuk-resim.png'});await b.close();})();
