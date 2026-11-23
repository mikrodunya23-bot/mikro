// Shorts için kare sahne çizimleri (sonra PIL ile dikey kapağa dönüştürülür)
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
(async () => {
  const tl = JSON.parse(fs.readFileSync(path.join(__dirname, 'timeline.json')));
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('file://' + path.join(__dirname, 'film.html')); await p.evaluate(tl => window.setup(tl), tl);
  const c = await p.$('canvas');
  const scenes = {
    '6_buzbasin_sirri': () => { NOW = 300; const t = 300;
      blizzardBg(t, 0); snowFx(t, 2.5, 3, .8);
      glow(960, 560, 520, '255,230,150', .3);
      buzbas(960, 760, 2.6, t, { sad: true, look: [0, .4], mouth: 0, closed: false });
      for (const sx of [-1, 1]) { ctx.fillStyle = 'rgba(140,200,255,.9)'; ell(960 + sx * 48, 660, 10, 16); ctx.fill(); }
      ctx.fillStyle = 'rgba(255,255,255,.95)'; [[0, 0, 80], [-70, 18, 56], [70, 18, 58], [-35, -40, 56], [40, -40, 54]].forEach(([dx, dy, r]) => { circ(1290 + dx, 300 + dy, r); ctx.fill(); });
      for (const [k, r] of [[.4, 20], [.7, 12]]) { circ(lerp(1230, 1080, k), lerp(380, 470, k), r); ctx.fill(); }
      bigText('?', 1290, 300, 120, '#5a4ad8', '#ffffff', 1, 1);
      fistik(560, 900, 1.0, t, { winter: true, look: [1, -.3], mouth: 0, scared: true });
      pofi(1420, 760, .75, t, { worried: true, look: [-1, 0], mouth: 0 }); },
    '7_kardan_adam_kizak': () => { NOW = 560; const t = 560;
      snowValley(t, {}); snowFx(t, .8, .2);
      snowman(960, 1000, 1.25, t, 1, true);
      homur(1330, 330, .9, t, { mood: 'surprised', colorful: 1, look: [-1, .5], mouth: .7 });
      fistik(620, 900, 1.05, t, { winter: true, armsUp: true, look: [1, -.3], mouth: .8, teeth: true });
      bigText('?!', 1450, 170, 110, '#ffe066', '#c0213a', 1, 1, .1); },
  };
  for (const [name, fn] of Object.entries(scenes)) {
    await p.evaluate(`(${fn.toString()})()`);
    await c.screenshot({ path: path.join(__dirname, 'out', 'shorts_kapak', name + '_sahne.png') });
  }
  await b.close();
})();
