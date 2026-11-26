// V7 — 21:17 From fear to love: Miraç misreads his racing heart; the shaky-bridge experiment; date tip: amusement park.
(function () {
  const S = ['lol', 'brain', 'bridge', 'coaster'].map(n => A(`<g id="sh_${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  wipeIn('#FF7FB0', .4); hudClock('21:17', 0); hudPulse([[0, 128], [DUR, 118]]);
  // laughing together, hearts still racing; Miraç's inner voice
  const MX = 560, YX = 900, NY = 160, NS = .92;
  add(nightStreet('ns') + person('mi', AHMET, MX, NY, NS) + person('ya', MERYEM, YX, NY, NS) +
    `<g id="h1">${heart(MX + 200 * NS, NY + 450 * NS, 2.2, '#FF3B5C', 'filter="url(#glow)"')}</g><g id="h2">${heart(YX + 200 * NS, NY + 450 * NS, 2.2, '#FF3B5C', 'filter="url(#glow)"')}</g>` +
    `<g id="thB" opacity="0"><ellipse cx="${MX + 120}" cy="150" rx="320" ry="110" fill="#fff"/><circle cx="${MX + 160}" cy="290" r="26" fill="#fff"/><circle cx="${MX + 180}" cy="330" r="14" fill="#fff"/><text class="lbl" x="${MX + 120}" y="168" text-anchor="middle" font-size="44" fill="#C2185B">Galiba âşığım?!</text></g>`, S[0]);
  cut(0, 0); face('mi', {e: 'happy', m: 'grin'}, 0); face('ya', {e: 'happy', m: 'grin'}, 0);
  tl.to('#miW,#yaW', {y: -8, duration: .15, yoyo: true, repeat: 9}, .1); sfx('laugh', .1, .0);
  for (let k = 0; k < 22; k++) tl.to('#h1,#h2', {scale: 1.25, transformOrigin: '50% 50%', duration: .09, yoyo: true, repeat: 1}, .2 + k * .38);
  face('mi', {e: 'side', m: 'o'}, T('h3_01')); headTilt('mi', 6, T('h3_01'));
  const tGa = Wt('h3_01', 'galiba', 0, .5) - .1; pop('#thB', tGa, MX + 120, 180); face('mi', {e: 'heart', m: 'grin', blush: 1}, tGa + .3); sfx('sparkle', tGa, .4);
  // brain: red signal hits "?" -> turns into a heart
  const t1 = T('h3_02') - .15, B = [760 - 520 * .95, 540 - 340 * .95, .95];
  add(darkBg('#1A1446', '#28206A') + brainSide('br', B[0], B[1], B[2], {head: true, headOp: .45, window: .5, marks: .35}) +
    `<g id="hr3">${heart(1500, 560, 6, '#FF3B5C', 'filter="url(#glow)"')}</g><path id="h2b" d="M1420,520 C1300,460 1150,420 ${brPt(...B, 'insula')[0] + 40},${brPt(...B, 'insula')[1]}" stroke="#FF5A5A" stroke-width="8" fill="none" stroke-dasharray="16 12" opacity="0"/>` +
    `<g id="qm" opacity="0"><text class="lbl" x="${brPt(...B, 'caud')[0]}" y="${brPt(...B, 'caud')[1] - 140}" text-anchor="middle" font-size="160" fill="#FF5A5A">?</text></g>` +
    `<g id="hm" opacity="0">${heart(brPt(...B, 'caud')[0], brPt(...B, 'caud')[1] - 200, 3.5, '#FFE45C', 'filter="url(#glow)"')}</g>` +
    `<g id="half" opacity="0"><rect x="1240" y="120" width="560" height="100" rx="50" fill="#FF3B3B"/><text class="lbl" x="1520" y="188" text-anchor="middle" font-size="44" fill="#fff">%50 KEDİ, %50 AŞK</text></g>`, S[1]);
  cut(1, t1); sfx('whoosh', t1 - .1, .4);
  for (let k = 0; k < 14; k++) tl.to('#hr3', {scale: 1.14, svgOrigin: '1500 650', duration: .1, yoyo: true, repeat: 1}, t1 + .1 + k * .36);
  pop('#half', Wt('h3_02', 'yarısı', 0, .6) - .1, 1520, 170); sfx('pop', Wt('h3_02', 'yarısı', 0, .6), .45);
  show('#h2b', T('h3_03') - .2, .1); drawPath('#h2b', T('h3_03') - .2, .5);
  pop('#qm', T('h3_03') + .2, brPt(...B, 'caud')[0], brPt(...B, 'caud')[1] - 200);
  const tHm = Wt('h3_03', 'karıştırır', 0, .7) - .1;
  tl.to('#qm', {rotation: 360, scale: .2, opacity: 0, svgOrigin: `${brPt(...B, 'caud')[0]} ${brPt(...B, 'caud')[1] - 200}`, duration: .4}, tHm);
  pop('#hm', tHm + .3, brPt(...B, 'caud')[0], brPt(...B, 'caud')[1] - 200); sfx('sparkle', tHm + .3, .45);
  // bridge experiment: bridge then split with phone calls
  const t2 = T('h3_04') - .15;
  const phone = (x, y, cls) => `<g class="${cls}" opacity="0"><circle cx="${x}" cy="${y}" r="44" fill="#3FD47A"/><path d="M${x - 18},${y - 20} q-6,26 18,42 q10,6 18,-4 l-8,-10 q-8,6 -14,-2 q-10,-12 -4,-20 l-10,-10Z" fill="#fff"/></g>`;
  let ph = ''; for (let i = 0; i < 6; i++) ph += phone(170 + (i % 3) * 120, 300 + Math.floor(i / 3) * 120, 'phL');
  add(`<g id="brg">${valleyBridge()}<g transform="translate(560,${495 - 860 * .42}) scale(.42)"><g id="paW">${char('pa', AHMET)}</g></g><g transform="translate(1020,${510 - 860 * .42}) scale(.42)"><g>${char('re', MERYEM)}</g></g></g>` +
    `<g id="spl" opacity="0"><rect width="${W}" height="${H}" fill="#CFEFFF"/><rect x="0" y="0" width="958" height="${H}" fill="#8FD0FF"/><path d="M0,1080 L0,520 L200,500 L260,1080Z M958,1080 L958,520 L760,500 L700,1080Z" fill="#7A5A8C"/><path d="M200,500 Q479,720 760,500" stroke="#8A5C3E" stroke-width="12" fill="none"/>` +
    `<text class="lbl" x="479" y="210" text-anchor="middle" font-size="56" fill="#3A2246">SALLANAN KÖPRÜ</text><rect x="962" y="700" width="958" height="380" fill="#6CC084"/><rect x="1240" y="770" width="400" height="30" rx="10" fill="#B5734F"/><text class="lbl" x="1440" y="210" text-anchor="middle" font-size="56" fill="#1E5A3A">SAĞLAM KÖPRÜ</text>` +
    ph + phone(1440, 360, 'phR') + `<rect x="956" y="0" width="8" height="${H}" fill="#fff"/></g>`, S[2]);
  cut(2, t2); sfx('wind', t2, .35, {dur: 5}); sfx('creak', t2 + .3, .5);
  tl.to('#bridge', {y: 12, rotation: .8, svgOrigin: '960 330', duration: .4, yoyo: true, repeat: 9, ease: 'sine.inOut'}, t2);
  face('pa', {e: 'big', m: 'wavy', sweat: 1}, t2); face('re', {m: 'smile'}, t2);
  const tMt = Wt('h3_04', 'tanışan', 0, .3); face('pa', {e: 'heart', m: 'grin', blush: 1, sweat: 0}, tMt); sfx('heart_soft', tMt, .5);
  const tSp = Wt('h3_04', 'sonradan', 0, .45) - .2; show('#spl', tSp, .15); sfx('whoosh', tSp, .4);
  tl.to('.phL', {opacity: 1, duration: .1, stagger: .12}, tSp + .3); tl.to('.phL', {rotation: 10, transformOrigin: '50% 50%', duration: .07, yoyo: true, repeat: 11, stagger: .08}, tSp + .4); tl.to('.phR', {opacity: 1, duration: .15}, tSp + .9); sfx('ring', tSp + .3, .45, {dur: 1.8});
  // amusement park tip
  const t3 = T('h3_05') - .1;
  add(`<rect width="${W}" height="${H}" fill="#FFD9E8"/>${rays(960, 900, 18, '#FFC2D9', .8)}` +
    `<path id="track" d="M-100,300 C300,260 500,280 700,420 C900,560 1000,900 1200,900 C1400,900 1500,500 1700,420 C1800,380 1900,380 2050,380" stroke="#C2185B" stroke-width="22" fill="none"/>` +
    `<g id="cart"><g transform="translate(-150,-300) scale(.36)">${char('ca', AHMET)}</g><g transform="translate(-10,-300) scale(.36)">${char('cm', MERYEM)}</g><rect x="-170" y="-80" width="320" height="110" rx="30" fill="#3A6FFF"/><circle cx="-110" cy="40" r="26" fill="#1E2A60"/><circle cx="90" cy="40" r="26" fill="#1E2A60"/></g>` +
    `<g id="rest"><rect x="1460" y="120" width="380" height="240" rx="30" fill="#fff"/><rect x="1560" y="220" width="180" height="90" rx="10" fill="#C99A6B"/><rect x="1640" y="170" width="16" height="50" fill="#FFF3C4"/><circle cx="1648" cy="160" r="12" fill="#FFB347"/><path id="restX" d="M1480,140 L1820,340 M1820,140 L1480,340" stroke="#FF3B3B" stroke-width="16" stroke-linecap="round" opacity="0"/></g>` +
    `<g id="lp" opacity="0"><rect x="160" y="110" width="520" height="130" rx="65" fill="#C2185B"/><text class="lbl" x="420" y="198" text-anchor="middle" font-size="76" fill="#fff">LUNAPARK!</text></g>`, S[3]);
  cut(3, t3); sfx('whoosh', t3 - .1, .4);
  ['ca', 'cm'].forEach(id => { face(id, {e: 'big', m: 'scream'}, t3); armSet(id, 'L', 150, t3); armSet(id, 'R', -150, t3); });
  tl.to('#cart', {motionPath: {path: '#track', align: '#track', alignOrigin: [.5, .9], start: .22, end: .78}, duration: D('h3_05') + .9, ease: 'power1.in', immediateRender: false}, t3);
  sfx('coaster', t3 + .3, .5); sfx('scream_fun', t3 + 1, .4);
  const tLp = Wt('h3_05', 'luna', 0, .45) - .1; pop('#lp', tLp, 420, 175); sfx('title_hit', tLp, .5); ['ca', 'cm'].forEach(id => face(id, {e: 'happy', m: 'grin', blush: 1}, tLp + .3));
  const tRs = Wt('h3_05', 'restoran', 0, .8); show('#restX', tRs, .1); drawPath('#restX', tRs, .25); sfx('buzz', tRs, .4);
  wipeOut('#3A1446', .4);
})();
