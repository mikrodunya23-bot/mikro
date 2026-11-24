const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
p.on('pageerror',e=>console.log('ERR',e.message));await p.goto('file://'+process.argv[2]);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
await p.screenshot({path:process.argv[3]});await b.close();})();
