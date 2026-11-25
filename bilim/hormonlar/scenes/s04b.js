// S04b — EXAMPLE: the hug. Skin touch receptors -> spinal cord -> hypothalamus -> pituitary -> oxytocin calms the amygdala,
//         brakes stress hormones; heart slows, breathing settles. "You're safe."
(function () {
  const S = ['street', 'skin', 'brain', 'calm'].map(n => A(`<g id="sh_${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  wipeIn('#0B1440', .55);
  // ---------- STREET: Ahmet runs in, hugs ----------
  const MX = 860, NY = 160, NS = .92, BINX = 1420, BINY = 960;
  add(`<g id="camN">${nightStreet('ns')}` + `<g transform="translate(${BINX},${BINY})">${binSvg('bin')}</g><g transform="translate(${BINX},${BINY - 250})"><g>${catSit('cs')}</g></g>` +
    `<circle id="pinkG" cx="${MX + 120}" cy="560" r="420" fill="url(#gP)" opacity="0"/>` +
    person('ah', AHMET, MX - 900, NY, NS) + person('me', MERYEM, MX, NY, NS) +
    `<g id="iyi" opacity="0"><path d="M${MX - 420},170 h300 a34,34 0 0 1 34,34 v60 a34,34 0 0 1 -34,34 h-200 l-40,40 l8,-40 h-68 a34,34 0 0 1 -34,-34 v-60 a34,34 0 0 1 34,-34Z" fill="#fff"/><text class="lbl" x="${MX - 270}" y="248" text-anchor="middle" font-size="46" fill="#22357E">İyi misin?</text></g>` +
    `<g id="safe" opacity="0"><text class="lbl" x="${MX + 150}" y="200" text-anchor="middle" font-size="96" fill="#FFC2DA" filter="url(#glow)">Güvendesin.</text></g></g>`, S[0]);
  cut(0, 0); face('me', {e: 'big', m: 'wavy', sweat: 1, brow: -10}, 0); face('ah', {e: 'big', m: 'o'}, 0);
  tl.to('#me-armL,#me-armR', {x: 3, duration: .05, yoyo: true, repeat: 40, ease: 'none'}, 0);
  walk('ah', .1, 1.4, 710, .16); pop('#iyi', .5, MX - 300, 300); sfx('steps_run', .1, .45, {dur: 1.4}); hide('#iyi', 1.9, .2);
  const tHug = 1.6;
  arm('ah', 'R', -96, tHug, .4); face('ah', {e: 'sad', m: 'smile'}, tHug); headTilt('ah', 8, tHug); headTilt('me', -6, tHug + .2);
  // dive into the touch point
  const touch = [1060, 530];
  const tDv = T('s4_06') + .5;
  cam('#camN', tDv - 1.2, touch[0], touch[1], 2, 1.0);
  cam('#camN', tDv, touch[0], touch[1], 16, .9, 'power3.in'); sfx('whoosh_long', tDv, .5);
  // ---------- SKIN cross-section ----------
  const tSk = tDv + .85;
  let skin = `<rect width="${W}" height="${H}" fill="#3A0E22"/><rect y="0" width="${W}" height="180" fill="#F6F3FB"/><text class="txt" x="80" y="110" font-size="34" fill="#9A93B8">Ahmet'in eli (ceket)</text>` +
    `<path d="M0,180 Q480,150 960,180 T1920,180 V330 H0Z" fill="#F7B8B0"/><path d="M0,330 H1920 V780 H0Z" fill="#E98E8E"/><path d="M0,780 H1920 V1080 H0Z" fill="#F5D7A8"/>` +
    `<text class="txt" x="1880" y="290" text-anchor="end" font-size="30" fill="#7A2A3A">üst deri</text><text class="txt" x="1880" y="740" text-anchor="end" font-size="30" fill="#7A2A3A">alt deri</text>`;
  const recX = [360, 760, 1160, 1560];
  recX.forEach((x, i) => { skin += `<g id="rc${i}"><ellipse cx="${x}" cy="420" rx="46" ry="70" fill="#FFD3E2"/><ellipse cx="${x}" cy="420" rx="30" ry="50" fill="#FFB3CC"/><ellipse cx="${x}" cy="420" rx="14" ry="26" fill="#FF8AB3"/><circle id="rg${i}" cx="${x}" cy="420" r="90" fill="url(#gP)" opacity="0"/></g><path id="nf${i}" d="M${x},490 C${x},640 ${x + 80},760 ${x + 200},1100" stroke="#FFE7A8" stroke-width="12" fill="none"/>`; });
  skin += `<path id="pressD" d="M760,140 L760,250" stroke="#fff" stroke-width="10" marker-end="none" opacity="0"/>`;
  add(skin + tag('tgRc', 760, 360, 1100, 250, 'dokunma algılayıcıları', '#EC407A', '#fff', 32) + tag('tgNf', 900, 900, 1300, 960, 'sinir lifi → omurilik → beyin', '#C9A24A', '#2A1A00', 30) + `<g id="skfx"></g>`, S[1]);
  cut(1, tSk); tl.fromTo('#sh_skin', {scale: 1.3, svgOrigin: '960 400'}, {scale: 1, duration: 1, ease: 'power2.out', immediateRender: false}, tSk);
  tl.to('#rc1,#rc2', {scaleY: .85, svgOrigin: '960 420', duration: .3, yoyo: true, repeat: 3}, tSk + .2);
  const tAl = Wt('s4_06', 'algılayıcılar', 0, .65) - .3;
  show('#tgRc', tAl, .3);
  recX.forEach((x, i) => { show('#rg' + i, tAl + i * .1, .2); flow($('#skfx'), '#nf' + i, 5, tAl + .4 + i * .1, tAl + 1.6, {colors: ['#FFB3CC', '#fff'], r: 9, dur: .8, glow: true}); });
  show('#tgNf', tAl + .8, .3); sfx('zap', tAl + .4, .4); sfx('sparkle', tAl, .35);
  // ---------- BRAIN: up the spine, hypothalamus, pituitary, amygdala calms ----------
  const tBr = T('s4_07') - .15, B = [960 - 520 * 1.0, 540 - 340 * 1.0, 1.0];
  add(darkBg('#1E0E36', '#2C1650', 18, .5) + `<g id="camB">${brainSide('br', B[0], B[1], B[2], {head: true, headOp: .38, window: .5, marks: .45, skin: '#F9C3B8', skinD: '#E89A97', hair: '#F7D27A'})}</g>` +
    `<g id="knob" opacity="0"><circle cx="1500" cy="300" r="90" fill="#2A2050"/><circle cx="1500" cy="300" r="70" fill="#4A3A80"/><rect id="kn" x="1494" y="236" width="12" height="50" rx="6" fill="#FFC2DA"/><text class="lbl" x="1500" y="440" text-anchor="middle" font-size="36" fill="#FFC2DA">sesi kısılıyor</text></g>` +
    `<g id="brake" opacity="0"><rect x="300" y="200" width="380" height="140" rx="40" fill="#EC407A"/><text class="lbl" x="490" y="290" text-anchor="middle" font-size="52" fill="#fff">STRES ⛔ FREN</text></g>`, S[2]);
  cut(2, tBr); sfx('whoosh', tBr - .1, .4);
  brPath('br', 'up', tBr, .9, '#FFB3CC'); brFlow('br', 'up', 10, tBr, tBr + 1, ['#FFB3CC', '#fff'], {dur: .7});
  const tHy = Wt('s4_07', 'hipotalamus', 0, .1) + .5;
  rglow('br', 'hypo', tHy, 'gP', 70, {pulse: 4});
  add(tag('tgHy', ...brPt(...B, 'hypo'), brPt(...B, 'hypo')[0] - 300, brPt(...B, 'hypo')[1] + 260, 'hipotalamus', '#EC407A', '#fff', 32), S[2]); show('#tgHy', tHy, .3);
  const tOx = Wt('s4_07', 'oksitosin', 0, .6) - .1;
  brPath('br', 'hp', tOx - .3, .3, '#FF7FB0'); rglow('br', 'pit', tOx, 'gP', 50, {pulse: 3});
  burst($('#br-fx'), 28, BR.pit[0], BR.pit[1], BR.pit[0], BR.pit[1] + 60, 200, 140, tOx, {colors: ['#FF7FB0', '#FFC2DA'], r: 8, glow: true, spread: .6, dur: 1.4});
  sfx('bubbles', tOx, .45);
  // alarm callback
  const tQ = T('s4_08') - .1;
  hide('#tgHy', tQ, .2);
  cam('#camB', tQ, ...brPt(...B, 'amyg'), 2.4, 1.0);
  const gA = rglow('br', 'amyg', tQ + .3, 'gR', 80, {pulse: 8}); sfx('alarm', tQ + .3, .3, {dur: 2.4});
  // calms
  const tC = T('s4_09');
  brPath('br', 'oxyA', tC - .2, .4, '#FF7FB0'); brFlow('br', 'oxyA', 14, tC - .2, tC + 2.6, ['#FF7FB0', '#FFC2DA'], {dur: .7});
  tl.to(gA, {opacity: 0, duration: 1.2}, tC + .3); rglow('br', 'amyg', tC + .5, 'gP', 80);
  sfx('calm', tC, .5);
  const tKn = Wt('s4_09', 'sesini', 0, .5) - .2;
  cam('#camB', tKn - .3, 960, 560, 1, .8);
  show('#knob', tKn, .3); tl.fromTo('#kn', {rotation: 90}, {rotation: -120, svgOrigin: '1500 300', duration: 1.2, ease: 'power2.inOut', immediateRender: false}, tKn);
  const tFr = Wt('s4_09', 'stres', 0, .75) - .1; pop('#brake', tFr, 490, 270); sfx('brake', tFr, .45);
  // ---------- heart slows, breathing settles ----------
  const tH = T('s4_10') - .1;
  let ecg = 'M0,60'; for (let i = 0; i < 14; i++) { const b = i * 70; ecg += ` L${b + 26},60 L${b + 32},20 L${b + 40},100 L${b + 46},60 L${b + 70},60`; }
  add(`<rect width="${W}" height="${H}" fill="#2A1040"/>${rays(960, 540, 18, '#3A1854', .5)}` +
    `<g><rect x="200" y="200" width="700" height="640" rx="48" fill="#3A1854"/><g id="h4">${heart(550, 440, 7, '#FF6B8A')}</g><g transform="translate(300,640)"><clipPath id="ecgC2"><rect width="500" height="120"/></clipPath><g clip-path="url(#ecgC2)"><path id="ecg2" d="${ecg}" stroke="#FFB3C6" stroke-width="7" fill="none"/></g></g><text id="bpm2" class="lbl" x="840" y="280" text-anchor="end" font-size="54" fill="#fff">150</text><text class="lbl" x="550" y="810" text-anchor="middle" font-size="52" fill="#FFB3C6">KALP YAVAŞLAR</text></g>` +
    `<g><rect x="1020" y="200" width="700" height="640" rx="48" fill="#3A1854"/><g id="lu4"><ellipse cx="1290" cy="470" rx="90" ry="170" fill="#8FD6FF"/><ellipse cx="1450" cy="470" rx="90" ry="170" fill="#8FD6FF"/><rect x="1360" y="260" width="20" height="120" rx="10" fill="#BFE6FF"/></g><text class="lbl" x="1370" y="810" text-anchor="middle" font-size="52" fill="#8FD6FF">NEFES DÜZELİR</text></g>`, S[3]);
  cut(3, tH); sfx('whoosh', tH - .1, .4);
  counter('#bpm2', tH + .2, tH + 2.4, 150, 75, v => v + ' nabız');
  for (let k = 0; k < 9; k++) { const t = tH + .2 + k * (0.3 + k * .06); tl.to('#h4', {scale: 1.1, svgOrigin: '550 530', duration: .12, yoyo: true, repeat: 1}, t); }
  tl.fromTo('#ecg2', {x: 0}, {x: -420, duration: D('s4_10') + .8, ease: 'power1.out', immediateRender: false}, tH);
  tl.to('#lu4', {scale: 1.12, svgOrigin: '1370 470', duration: 1.2, yoyo: true, repeat: 3, ease: 'sine.inOut'}, Wt('s4_10', 'nefes', 0, .5) - .2);
  sfx('heart_slow', tH, .45, {dur: D('s4_10') + .6}); sfx('breath', Wt('s4_10', 'nefes', 0, .5), .4);
  // ---------- back to the hug: "You're safe" ----------
  const tS = T('s4_11') - .2;
  cut(0, tS); camSet('#camN', tS, MX, 560, 1.15); cam('#camN', tS, MX + 40, 520, 1.3, D('s4_11') + 1.2, 'power1.inOut');
  tl.set('#me-armL,#me-armR', {x: 0}, tS);
  face('me', {e: 'happy', m: 'smile', sweat: 0, brow: 0, blush: 1}, tS); face('ah', {e: 'happy', m: 'smile'}, tS);
  show('#pinkG', tS, .8);
  const tG = Wt('s4_11', 'güvendesin', 0, .75) - .1; show('#safe', tG, .8); sfx('chime', tG, .45);
  fadeOut(.6, '#1E0E36');
})();
