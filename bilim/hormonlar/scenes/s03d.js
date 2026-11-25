// S03d — Fear and love: the suspension-bridge experiment; the brain misreads a racing heart; the amusement-park tip.
(function () {
  const S = ['card', 'bridge', 'split', 'brain', 'coaster'].map(n => A(`<g id="sh_${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  wipeIn('#2A1F66', .55);
  // --- callback card
  add(darkBg('#24164F', '#33226E') + `<g id="cb"><rect x="560" y="400" width="800" height="200" rx="50" fill="#C2185B"/><text class="lbl" x="960" y="530" text-anchor="middle" font-size="84" fill="#fff">KORKU FİLMİ = BAĞ?</text></g>` +
    `<text class="txt" x="960" y="330" text-anchor="middle" font-size="40" fill="#BDB6EA" id="geri" opacity="0">baştaki sorulardan biri…</text>`, S[0]);
  cut(0, 0); show('#geri', .4, .4); pop('#cb', Wt('s3_18', 'korku', 0, .4) - .1, 960, 500); sfx('pop', Wt('s3_18', 'korku', 0, .4) - .1, .45);
  tl.to('#cb', {rotation: 3, svgOrigin: '960 500', duration: .25, yoyo: true, repeat: 5}, Wt('s3_18', 'bağlanırsın', 0, .9) - .4);
  // --- the bridge experiment
  const t1 = T('s3_19') - .1;
  add(`<g id="vb">${valleyBridge()}</g>` + `<g transform="translate(1020,${510 - 860 * .42}) scale(.42)"><g id="reW">${char('re', MERYEM, {leftHand: `<rect x="70" y="560" width="90" height="110" rx="10" fill="#8A6A4E"/><rect x="80" y="572" width="70" height="86" rx="6" fill="#fff"/>`})}</g></g>` +
    `<g transform="translate(560,${495 - 860 * .42}) scale(.42)"><g id="paW">${char('pa', AHMET)}</g></g>` +
    pill('dn', 960, 110, 'SALLANAN KÖPRÜ DENEYİ', '#7A4FB5', '#fff', 54), S[1]);
  cut(1, t1); sfx('wind', t1, .4, {dur: 7}); sfx('creak', t1 + .5, .5);
  pop('#dn', t1 + .3, 960, 110);
  tl.to('#bridge', {y: 10, rotation: .6, svgOrigin: '960 330', duration: .5, yoyo: true, repeat: 13, ease: 'sine.inOut'}, t1);
  tl.to('#paW,#reW', {y: 22, duration: .5, yoyo: true, repeat: 13, ease: 'sine.inOut'}, t1);
  face('pa', {e: 'big', m: 'wavy', sweat: 1}, t1); face('re', {m: 'smile', e: 'dot'}, t1);
  walk('pa', t1 + .2, 2.4, 420, .3);
  const tMeet = Wt('s3_19', 'araştırmacıyla', 0, .4); face('pa', {e: 'heart', m: 'grin', blush: 1, sweat: 0}, tMeet + .3); sfx('heart_soft', tMeet + .3, .5);
  // --- split: shaky vs solid bridge, phone calls
  const t2 = Wt('s3_19', 'köprüden', 1, .5) - .15;
  const phone = (x, y, id) => `<g class="${id}" opacity="0"><circle cx="${x}" cy="${y}" r="44" fill="#3FD47A"/><path d="M${x - 18},${y - 20} q-6,26 18,42 q10,6 18,-4 l-8,-10 q-8,6 -14,-2 q-10,-12 -4,-20 l-10,-10Z" fill="#fff"/></g>`;
  let ph = ''; for (let i = 0; i < 6; i++) ph += phone(160 + (i % 3) * 120, 300 + Math.floor(i / 3) * 120, 'phL');
  add(`<rect width="${W}" height="${H}" fill="#CFEFFF"/><rect x="0" y="0" width="958" height="${H}" fill="#8FD0FF"/>` +
    `<path d="M0,1080 L0,520 L200,500 L260,1080Z M958,1080 L958,520 L760,500 L700,1080Z" fill="#7A5A8C"/><path d="M200,500 Q479,720 760,500" stroke="#8A5C3E" stroke-width="12" fill="none"/>` +
    `<text class="lbl" x="479" y="140" text-anchor="middle" font-size="58" fill="#3A2246">YÜKSEK, SALLANAN</text>` +
    `<rect x="962" y="700" width="958" height="380" fill="#6CC084"/><path d="M962,840 Q1440,800 1920,850 L1920,900 Q1440,860 962,900Z" fill="#4BA0D8"/><rect x="1240" y="770" width="400" height="30" rx="10" fill="#B5734F"/>` +
    `<text class="lbl" x="1440" y="140" text-anchor="middle" font-size="58" fill="#1E5A3A">ALÇAK, SAĞLAM</text>` +
    ph + phone(1440, 360, 'phR') + `<rect x="956" y="0" width="8" height="${H}" fill="#fff"/>` +
    `<g id="cntL" opacity="0"><text class="lbl" x="479" y="600" text-anchor="middle" font-size="64" fill="#fff">çok daha sık arama</text></g>`, S[2]);
  cut(2, t2); sfx('whoosh', t2 - .1, .4);
  const tAr = Wt('s3_19', 'aramış', 0, .9) - 1.2;
  tl.to('.phL', {opacity: 1, duration: .15, stagger: .15}, tAr); tl.to('.phL', {rotation: 10, transformOrigin: '50% 50%', duration: .08, yoyo: true, repeat: 9, stagger: .1}, tAr + .2);
  tl.to('.phR', {opacity: 1, duration: .2}, tAr + .5); show('#cntL', tAr + .9, .3); sfx('ring', tAr, .4, {dur: 1.6});
  // --- the brain misreads the racing heart
  const t3 = T('s3_20') - .1;
  const B = [760 - 520 * .95, 540 - 340 * .95, .95];
  add(darkBg('#1A1446', '#28206A') + brainSide('br', B[0], B[1], B[2], {head: true, headOp: .45, window: .5, marks: .35}) +
    `<g id="hr3">${heart(1500, 560, 6, '#FF3B5C', 'filter="url(#glow)"')}</g><path id="h2b" d="M1420,520 C1300,460 1150,420 ${brPt(...B, 'insula')[0] + 40},${brPt(...B, 'insula')[1]}" stroke="#FF5A5A" stroke-width="8" fill="none" stroke-dasharray="16 12" opacity="0"/>` +
    `<g id="qm" opacity="0"><text class="lbl" x="${brPt(...B, 'caud')[0]}" y="${brPt(...B, 'caud')[1] - 140}" text-anchor="middle" font-size="160" fill="#FF5A5A">?</text></g>` +
    `<g id="hm" opacity="0">${heart(brPt(...B, 'caud')[0], brPt(...B, 'caud')[1] - 200, 3.5, '#FFE45C', 'filter="url(#glow)"')}</g>` +
    `<g id="th3" opacity="0"><path d="M1060,140 h700 a36,36 0 0 1 36,36 v120 a36,36 0 0 1 -36,36 h-560 l-60,50 l10,-50 h-90 a36,36 0 0 1 -36,-36 v-120 a36,36 0 0 1 36,-36Z" fill="#fff"/><text class="lbl" x="1410" y="215" text-anchor="middle" font-size="40" fill="#1A1446">“Kalbim deli gibi atıyor…</text><text class="lbl" x="1410" y="275" text-anchor="middle" font-size="40" fill="#C2185B">herhalde ondan etkilendim!”</text></g>`, S[3]);
  cut(3, t3); sfx('whoosh', t3 - .1, .4);
  for (let k = 0; k < 18; k++) tl.to('#hr3', {scale: 1.14, svgOrigin: '1500 650', duration: .1, yoyo: true, repeat: 1}, t3 + .1 + k * .4);
  show('#h2b', t3 + .4, .1); drawPath('#h2b', t3 + .4, .6);
  pop('#qm', Wt('s3_20', 'karıştırır', 0, .4) - .2, brPt(...B, 'caud')[0], brPt(...B, 'caud')[1] - 200);
  const tHm = Wt('s3_20', 'kalbim', 0, .6) - .1;
  tl.to('#qm', {rotation: 360, scale: .2, opacity: 0, svgOrigin: `${brPt(...B, 'caud')[0]} ${brPt(...B, 'caud')[1] - 200}`, duration: .5}, tHm);
  pop('#hm', tHm + .4, brPt(...B, 'caud')[0], brPt(...B, 'caud')[1] - 200); sfx('sparkle', tHm + .4, .45);
  pop('#th3', tHm, 1410, 250);
  // --- the tip: amusement park, not a candle-lit restaurant
  const t4 = T('s3_21') - .1;
  add(`<rect width="${W}" height="${H}" fill="#FFD9E8"/>${rays(960, 900, 18, '#FFC2D9', .8)}` +
    `<path id="track" d="M-100,300 C300,260 500,280 700,420 C900,560 1000,900 1200,900 C1400,900 1500,500 1700,420 C1800,380 1900,380 2050,380" stroke="#C2185B" stroke-width="22" fill="none"/>` +
    `<path d="M-100,300 C300,260 500,280 700,420 C900,560 1000,900 1200,900 C1400,900 1500,500 1700,420 C1800,380 1900,380 2050,380" stroke="#FF7FB0" stroke-width="8" stroke-dasharray="10 30" fill="none"/>` +
    `<g id="cart"><g transform="translate(-150,-300) scale(.36)">${char('ca', AHMET)}</g><g transform="translate(-10,-300) scale(.36)">${char('cm', MERYEM)}</g><rect x="-170" y="-80" width="320" height="110" rx="30" fill="#3A6FFF"/><circle cx="-110" cy="40" r="26" fill="#1E2A60"/><circle cx="90" cy="40" r="26" fill="#1E2A60"/></g>` +
    `<g id="rest"><rect x="1460" y="120" width="380" height="240" rx="30" fill="#fff"/><rect x="1560" y="220" width="180" height="90" rx="10" fill="#C99A6B"/><rect x="1640" y="170" width="16" height="50" fill="#FFF3C4"/><circle cx="1648" cy="160" r="12" fill="#FFB347"/><text class="txt" x="1650" y="345" text-anchor="middle" font-size="28" fill="#7A5A6A">romantik restoran</text><path id="restX" d="M1480,140 L1820,340 M1820,140 L1480,340" stroke="#FF3B3B" stroke-width="16" stroke-linecap="round" opacity="0"/></g>` +
    `<g id="lp" opacity="0"><rect x="160" y="110" width="520" height="130" rx="65" fill="#C2185B"/><text class="lbl" x="420" y="198" text-anchor="middle" font-size="76" fill="#fff">LUNAPARK!</text></g>`, S[4]);
  cut(4, t4); sfx('whoosh', t4 - .1, .4);
  ['ca', 'cm'].forEach(id => face(id, {e: 'big', m: 'scream'}, t4));

  tl.to('#cart', {motionPath: {path: '#track', align: '#track', alignOrigin: [.5, .9], autoRotate: false, start: .05, end: .7}, duration: D('s3_21') + .4, ease: 'power1.in', immediateRender: false}, t4);
  sfx('coaster', t4 + .5, .5); sfx('scream_fun', t4 + 1.4, .35);
  const tLp = Wt('s3_21', 'luna', 0, .5) - .1; pop('#lp', tLp, 420, 175); sfx('title_hit', tLp, .5);
  ['ca', 'cm'].forEach(id => face(id, {e: 'happy', m: 'grin', blush: 1}, tLp + .4));
  const tRs = Wt('s3_21', 'restoran', 0, .7); show('#restX', tRs, .1); drawPath('#restX', tRs, .3); sfx('buzz', tRs, .4);
  fadeOut(.6, '#05040F');
})();
