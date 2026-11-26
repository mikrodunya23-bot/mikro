// V8 — 21:18 The hug: Ege photobombs; skin receptors -> hypothalamus -> pituitary -> oxytocin silences the alarm; "You're safe";
//      why her? smell's shortcut, immune genes "chemistry", voice & eye contact.
(function () {
  const S = ['hug', 'skin', 'brain', 'smell', 'genes'].map(n => A(`<g id="sh_${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  wipeIn('#3A1446', .4); hudClock('21:18', 0); hudPulse([[0, 140], [T('h4_03') + 4, 140], [E('h4_03'), 75], [DUR, 72]]);
  // --- hug (Ege tries to squeeze in)
  const MX = 700, YX = 900, NY = 160, NS = .92, BINX = 1500, BINY = 960;
  add(`<g id="camH">${nightStreet('ns')}<circle id="pinkG" cx="1010" cy="560" r="440" fill="url(#gP)" opacity="0"/>` +
    person('mi', AHMET, MX, NY, NS) + person('ya', MERYEM, YX, NY, NS) + `<g transform="translate(1020,${BINY - 30}) scale(.7)"><g id="egeW">${catSit('ec')}</g></g>` +
    `<g id="safe" opacity="0"><text class="lbl" x="1000" y="200" text-anchor="middle" font-size="100" fill="#FFC2DA" filter="url(#glow)">Güvendesin.</text></g></g>`, S[0]);
  cut(0, 0); arm('mi', 'R', -96, .2, .4); face('mi', {e: 'happy', m: 'smile'}, .2); face('ya', {e: 'happy', m: 'smile', blush: 1}, .2); headTilt('ya', -6, .3);
  tl.fromTo('#egeW', {x: 500}, {x: 0, duration: .8, ease: 'power2.out', immediateRender: false}, .2); show('#ec-eyesO', .2); hide('#ec-eyesC', .2);
  tl.to('#egeW', {y: -60, duration: .2, yoyo: true, repeat: 3}, 1.0); sfx('meow', 1.0, .5); sfx('pop_hearts', T('h4_01'), .45);
  // dive to the touch point
  const touch = [1080, 520], tDv = E('h4_01') + .1;
  cam('#camH', tDv - .2, touch[0], touch[1], 2.2, .5); cam('#camH', tDv + .3, touch[0], touch[1], 16, .6, 'power3.in'); sfx('whoosh_long', tDv + .3, .5);
  // --- skin
  const tSk = T('h4_02') - .1;
  let skin = `<rect width="${W}" height="${H}" fill="#3A0E22"/><rect y="0" width="${W}" height="180" fill="#F3A53A"/><text class="txt" x="80" y="110" font-size="34" fill="#7A4A00">Miraç'ın eli</text>` +
    `<path d="M0,180 Q480,150 960,180 T1920,180 V330 H0Z" fill="#F7B8B0"/><path d="M0,330 H1920 V780 H0Z" fill="#E98E8E"/><path d="M0,780 H1920 V1080 H0Z" fill="#F5D7A8"/>`;
  const rx = [360, 760, 1160, 1560];
  rx.forEach((x, i) => skin += `<g><ellipse cx="${x}" cy="420" rx="46" ry="70" fill="#FFD3E2"/><ellipse cx="${x}" cy="420" rx="30" ry="50" fill="#FFB3CC"/><circle id="rg${i}" cx="${x}" cy="420" r="90" fill="url(#gP)" opacity="0"/></g><path id="nf${i}" d="M${x},490 C${x},640 ${x + 80},760 ${x + 200},1100" stroke="#FFE7A8" stroke-width="12" fill="none"/>`);
  add(skin + tag('tgRc', 760, 360, 1100, 250, 'minik algılayıcılar', '#EC407A', '#fff', 34) + `<g id="skfx"></g>`, S[1]);
  cut(1, tSk); tl.fromTo('#sh_skin', {scale: 1.3, svgOrigin: '960 400'}, {scale: 1, duration: .7, ease: 'power2.out', immediateRender: false}, tSk);
  const tAl = Wt('h4_02', 'minik', 0, .1) - .1; show('#tgRc', tAl, .2);
  rx.forEach((x, i) => { show('#rg' + i, tAl + i * .08, .15); flow($('#skfx'), '#nf' + i, 5, tAl + .3 + i * .08, tAl + 1.3, {colors: ['#FFB3CC', '#fff'], r: 9, dur: .6, glow: true}); }); sfx('zap', tAl + .3, .45);
  // --- brain: hypothalamus, pituitary, amygdala calms
  const tBr = Wt('h4_02', 'hipotalamus', 0, .45) - .5, B = [960 - 520 * 1.0, 540 - 340 * 1.0, 1.0];
  add(darkBg('#1E0E36', '#2C1650', 18, .5) + `<g id="camB">${brainSide('br', B[0], B[1], B[2], {head: true, headOp: .38, window: .5, marks: .45, skin: '#F9C3B8', skinD: '#E89A97', hair: '#F7D27A'})}</g>` +
    `<g id="knob" opacity="0"><circle cx="1560" cy="300" r="90" fill="#2A2050"/><circle cx="1560" cy="300" r="70" fill="#4A3A80"/><rect id="kn" x="1554" y="236" width="12" height="50" rx="6" fill="#FFC2DA"/><text class="lbl" x="1560" y="440" text-anchor="middle" font-size="36" fill="#FFC2DA">🔉 SES KISILIYOR</text></g>` +
    `<g id="brake" opacity="0"><rect x="260" y="200" width="420" height="120" rx="40" fill="#EC407A"/><text class="lbl" x="470" y="278" text-anchor="middle" font-size="48" fill="#fff">STRES: FREN!</text></g>`, S[2]);
  cut(2, tBr); sfx('whoosh', tBr - .1, .4);
  brPath('br', 'up', tBr, .5, '#FFB3CC'); brFlow('br', 'up', 8, tBr, tBr + .6, ['#FFB3CC'], {dur: .5});
  const tHy = Wt('h4_02', 'hipotalamus', 0, .45); rglow('br', 'hypo', tHy, 'gP', 70, {pulse: 4});
  add(tag('tgHy', ...brPt(...B, 'hypo'), brPt(...B, 'hypo')[0] - 320, brPt(...B, 'hypo')[1] + 260, 'hipotalamus', '#EC407A', '#fff', 34), S[2]); show('#tgHy', tHy, .2);
  const tOx = Wt('h4_02', 'oksitosin', 0, .85) - .2; brPath('br', 'hp', tOx - .3, .2, '#FF7FB0'); rglow('br', 'pit', tOx, 'gP', 50, {pulse: 3});
  burst($('#br-fx'), 30, BR.pit[0], BR.pit[1], BR.pit[0], BR.pit[1] + 60, 220, 150, tOx, {colors: ['#FF7FB0', '#FFC2DA'], r: 8, glow: true, spread: .5, dur: 1.2}); sfx('bubbles', tOx, .5);
  const tQ = T('h4_03'); hide('#tgHy', tQ, .2);
  cam('#camB', tQ, ...brPt(...B, 'amyg'), 2.2, .8); const gA = rglow('br', 'amyg', tQ, 'gR', 80, {pulse: 6}); sfx('alarm', tQ, .25, {dur: 2});
  const tC = Wt('h4_03', 'sesini', 0, .45) - .3;
  brPath('br', 'oxyA', tC - .6, .3, '#FF7FB0'); brFlow('br', 'oxyA', 14, tC - .6, tC + 1.6, ['#FF7FB0', '#FFC2DA'], {dur: .6});
  tl.to(gA, {opacity: 0, duration: .8}, tC); rglow('br', 'amyg', tC + .2, 'gP', 80); sfx('calm', tC, .5);
  cam('#camB', tC + .3, 960, 560, 1, .6); show('#knob', tC, .2); tl.fromTo('#kn', {rotation: 90}, {rotation: -120, svgOrigin: '1560 300', duration: 1, immediateRender: false}, tC);
  const tFr = Wt('h4_03', 'stres', 0, .65) - .1; pop('#brake', tFr, 470, 260); sfx('brake', tFr, .45);
  // back to the hug: "You're safe"
  const tS = T('h4_04') - .2;
  cut(0, tS); camSet('#camH', tS, 1000, 560, 1.15); cam('#camH', tS, 1000, 520, 1.3, D('h4_04') + 1);
  face('ya', {e: 'happy', m: 'smile', blush: 1}, tS); show('#pinkG', tS, .6);
  const tG = Wt('h4_04', 'güvendesin', 0, .7) - .1; show('#safe', tG, .5); sfx('chime', tG, .45);
  // --- why her? smell's shortcut
  const t2 = T('h4_05') - .1, B2 = [960 - 520 * .98, 540 - 340 * .98, .98];
  const olf = [B2[0] + 790 * B2[2], B2[1] + 430 * B2[2]], nose = [B2[0] + 950 * B2[2], B2[1] + 452 * B2[2]];
  add(darkBg('#1E0E36', '#2C1650', 18, .5) + brainSide('bn', B2[0], B2[1], B2[2], {head: true, headOp: .4, window: .5, marks: .45}) +
    `<ellipse cx="${olf[0]}" cy="${olf[1]}" rx="40" ry="16" fill="#C59BFF"/><path id="olfP" d="M${nose[0] + 140},${nose[1] - 20} C${nose[0]},${nose[1] - 10} ${olf[0] + 60},${olf[1] + 10} ${olf[0]},${olf[1]} C${olf[0] - 60},${olf[1] - 10} ${brPt(...B2, 'amyg')[0] + 30},${brPt(...B2, 'amyg')[1]} ${brPt(...B2, 'amyg')[0]},${brPt(...B2, 'amyg')[1]}" stroke="#C59BFF" stroke-width="10" fill="none" opacity="0"/>` +
    `<g id="whyQ" opacity="0"><text class="lbl" x="1500" y="260" text-anchor="middle" font-size="72" fill="#fff">NEDEN O?</text></g>` +
    tag('tgEm', ...brPt(...B2, 'amyg'), brPt(...B2, 'amyg')[0] - 430, brPt(...B2, 'amyg')[1] + 250, 'duygu + hafıza: kestirme!', '#EC407A', '#fff', 32) + `<g id="olffx"></g>`, S[3]);
  cut(3, t2); sfx('whoosh', t2 - .1, .4); pop('#whyQ', t2 + .2, 1500, 230);
  const tK = Wt('h4_06', 'koku', 0, .1); show('#olfP', tK, .1); drawPath('#olfP', tK, .8); flow($('#olffx'), '#olfP', 14, tK, tK + 2.6, {colors: ['#C59BFF', '#FFE1FF'], r: 9, dur: .9, glow: true}); sfx('spray', tK, .45);
  const tEm = Wt('h4_06', 'duygu', 0, .25); rglow('bn', 'amyg', tEm, 'gP', 80, {pulse: 4}); show('#tgEm', tEm, .2); sfx('sparkle', tEm, .4);
  // genes + gaze
  const t3 = Wt('h4_06', 'bağışıklık', 0, .55) - .4;
  const helix = (x, c1, c2, id) => { let s = `<g id="${id}">`; for (let i = 0; i < 9; i++) { const y = i * 26, dx = Math.sin(i * .8) * 40; s += `<circle cx="${x + dx}" cy="${40 + y}" r="11" fill="${c1}"/><circle cx="${x - dx}" cy="${40 + y}" r="11" fill="${c2}"/><path d="M${x + dx},${40 + y} L${x - dx},${40 + y}" stroke="#fff" stroke-width="4" opacity=".6"/>`; } return s + `</g>`; };
  add(`<rect width="${W}" height="${H}" fill="#FFEAF3"/>${rays(960, 600, 18, '#FFD6E7', .8)}` + person('a2', AHMET, 330, 220, .85) + person('m2', MERYEM, 1250, 220, .85) + helix(500, '#3FA7FF', '#7A5CFF', 'hxA') + helix(1420, '#FF9D2E', '#FF4F92', 'hxM') +
    `<g id="pzL"><path d="M760,520 h140 v40 a30,30 0 1 1 0,60 v40 h-140Z" fill="#3FA7FF"/></g><g id="pzR"><path d="M1160,520 h-140 v40 a30,30 0 1 0 0,60 v40 h140Z" fill="#FF9D2E" transform="translate(-120,0)"/></g>` +
    `<g id="kim" opacity="0"><rect x="560" y="760" width="800" height="120" rx="60" fill="#C2185B"/><text class="lbl" x="960" y="840" text-anchor="middle" font-size="60" fill="#fff">KİMYAMIZ TUTTU!</text></g>` +
    `<path id="gz" d="M${1250 + 236 * .85 - 60},${220 + 242 * .85} L${330 + 236 * .85},${220 + 242 * .85}" stroke="#FF7FB0" stroke-width="16" stroke-linecap="round" opacity="0" filter="url(#glow)"/><g id="oxfx"></g>`, S[4]);
  cut(4, t3); sfx('whoosh', t3 - .1, .4); face('a2', {m: 'smile'}, 0); face('m2', {m: 'smile'}, 0);
  tl.set('#pzL', {x: -300}, 0); tl.set('#pzR', {x: 300}, 0);
  tl.fromTo('#hxA,#hxM', {opacity: 0, y: 40}, {opacity: 1, y: 0, duration: .4, immediateRender: false}, t3 + .2);
  const tPz = Wt('h4_06', 'çekici', 0, .85) - .3; tl.to('#pzL,#pzR', {x: 0, duration: .6, ease: 'back.out(1.4)'}, tPz); sfx('click', tPz + .5, .5);
  face('a2', {e: 'heart', blush: 1}, tPz + .5); face('m2', {e: 'happy', blush: 1}, tPz + .5);
  const tKm = Wt('h4_07', 'kimyamız', 0, .1) - .1; pop('#kim', tKm, 960, 820); sfx('title_hit', tKm, .5);
  const tGz = Wt('h4_07', 'göz', 0, .7) - .2; hide('#kim', tGz - .3, .2); show('#gz', tGz, .2); drawPath('#gz', tGz, .4); sfx('chime', tGz, .4);
  burst($('#oxfx'), 22, 860, 420, 860, 340, 260, 140, tGz + .4, {colors: ['#FF7FB0', '#FFC2DA'], r: 10, glow: true, spread: .8});
  wipeOut('#E8536B', .4);
})();
