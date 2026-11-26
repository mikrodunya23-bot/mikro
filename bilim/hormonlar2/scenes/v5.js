// V5 — Spinal cord -> adrenal glands -> ADRENALINE! -> blood-vessel roller coaster with organ stops -> FIGHT OR FLIGHT?!
(function () {
  const S = ['body', 'tube', 'ff'].map(n => A(`<g id="sh_${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  hudClock('21:15', 0); hudPulse([[0, 168], [T('h2_11'), 168], [T('h2_11') + 1, 175], [DUR, 172]]);
  // --- body: down the spine to the adrenals
  const bx = 960 - 200 * 1.0, by = 70, bs = 1.0;
  add(gridBg() + `<g id="camX">${bodyX('bx', bx, by, bs, '#2D6BFF')}</g>` + pill('adrLbl', 960, 120, 'ADRENALİN!', '#E53935', '#fff', 80), S[0]);
  cut(0, 0); flash(0, .5, '#FF3B3B', .25); armSet('bx', 'L', 150, 0); armSet('bx', 'R', -150, 0);
  const fx = $('#bx-orgfx');
  add(`<path id="spP" d="M200,250 L200,540 Q190,556 168,566" fill="none" stroke="#7FD8FF" stroke-width="6" opacity="0"/><path id="spP2" d="M200,540 Q210,556 232,566" fill="none" stroke="#7FD8FF" stroke-width="6" opacity="0"/>`, fx);
  show('#spP,#spP2', .2, .1); drawPath('#spP', .2, .9); drawPath('#spP2', .8, .3); flow(fx, '#spP', 12, .2, 1.1, {colors: ['#7FD8FF', '#fff'], r: 6, dur: .6, glow: true, ease: 'power2.in'}); sfx('zap', .2, .6);
  const kp = orgPt(bx, by, bs, 'adrL'), kp2 = orgPt(bx, by, bs, 'adrR');
  cam('#camX', .6, (kp[0] + kp2[0]) / 2, kp[1], 3.4, 1.1);
  add(tag('tgAd', 850, 520, 520, 300, 'böbreküstü bezleri', '#FFB547', '#2A1400', 40), S[0]); show('#tgAd', Wt('h2_09', 'böbreklerin', 0, .5), .2);
  const tA = T('h2_10') - .05;
  tl.to('#bx-adrLO,#bx-adrRO', {fill: '#FF3B3B', duration: .1}, tA); flash(tA, .6, '#FF3B3B', .3); shake('#sh_body', tA, 14, .4); hide('#tgAd', tA);
  pop('#adrLbl', tA, 960, 120, .2, .3); sfx('title_hit', tA, .8); sfx('pump', tA, .6);
  cam('#camX', tA + .1, 960, 540, 1, .7, 'power2.out');
  const tg = [[214, 452], [200, 205], [164, 242], [168, 525], [114, 420], [286, 420], [170, 800], [230, 800], [160, 445], [240, 445]];
  for (let i = 0; i < 50; i++) { const src = i % 2 ? [168, 566] : [232, 566], d = tg[i % tg.length], t0 = tA + .1 + i * .03; const c = add(`<circle cx="${src[0]}" cy="${src[1]}" r="${4 + R() * 3}" fill="${i % 3 ? '#FF3B3B' : '#FFB0B0'}" opacity="0" filter="url(#glow)"/>`, fx);
    tl.set(c, {opacity: 1}, t0); tl.to(c, {attr: {cx: d[0] + (R() - .5) * 30, cy: d[1] + (R() - .5) * 30}, duration: .8, ease: 'power1.inOut'}, t0); tl.to(c, {opacity: 0, duration: .3}, t0 + .8); }
  // --- roller coaster inside the vessel
  const tT = T('h2_11') - .35;
  add(tunnel('tb'), S[1]);
  add(`<g id="cart"><rect x="760" y="820" width="400" height="120" rx="40" fill="#3A6FFF"/><g transform="translate(790,560) scale(.34)">${char('c1', AHMET)}</g><g transform="translate(960,560) scale(.34)">${char('c2', MERYEM)}</g><rect x="760" y="860" width="400" height="80" rx="30" fill="#2A55D8"/></g>`, S[1]);
  cut(1, tT); tunnelRun('tb', tT, E('h2_12') + .3, 1.4); sfx('coaster', tT, .5); sfx('tunnel', tT, .4, {dur: D('h2_11') + D('h2_12') + .8});
  ['c1', 'c2'].forEach(id => { face(id, {e: 'big', m: 'scream'}, tT); armSet(id, 'L', 150, tT); armSet(id, 'R', -150, tT); });
  tl.to('#cart', {y: -14, rotation: 2, svgOrigin: '960 900', duration: .18, yoyo: true, repeat: Math.round((D('h2_11') + D('h2_12')) / .18), ease: 'sine.inOut'}, tT);
  const card = (id, title, inner, color, x) => `<g id="${id}" opacity="0"><rect x="${x - 300}" y="150" width="600" height="440" rx="40" fill="#1A0A20" opacity=".92"/><rect x="${x - 300}" y="150" width="600" height="440" rx="40" fill="none" stroke="${color}" stroke-width="6"/>${inner}<text class="lbl" x="${x}" y="555" text-anchor="middle" font-size="${title.length > 14 ? 40 : 50}" fill="${color}">${title}</text></g>`;
  const X = 960;
  add(card('cH', 'KALP GAZA BASIYOR', `<g id="cHh">${heart(X, 330, 5, '#FF4D6D')}</g>`, '#FF6B81', X) +
    card('cL', 'NEFES DERİNLEŞİYOR', `<g id="lu"><ellipse cx="${X - 75}" cy="350" rx="65" ry="120" fill="#8FD6FF"/><ellipse cx="${X + 75}" cy="350" rx="65" ry="120" fill="#8FD6FF"/></g>`, '#8FD6FF', X) +
    card('cE', 'GÖZ BEBEKLERİ BÜYÜYOR', `<path d="M${X - 170},350 Q${X},220 ${X + 170},350 Q${X},480 ${X - 170},350Z" fill="#fff"/><circle cx="${X}" cy="350" r="80" fill="#3FA7FF"/><circle id="pup" cx="${X}" cy="350" r="26" fill="#141433"/>`, '#7FC4FF', X) +
    card('cV', 'KARACİĞER: ŞEKER!', `<path d="M${X - 170},320 Q${X - 40},250 ${X + 140},290 Q${X + 200},330 ${X + 150},410 Q${X},470 ${X - 130},440 Q${X - 200},400 ${X - 170},320Z" fill="#B5523B"/>${[0, 1, 2, 3, 4].map(i => `<rect class="sg" x="${X - 70 + i * 30}" y="360" width="28" height="28" rx="6" fill="#fff"/>`).join('')}`, '#E58A6B', X) +
    card('cM', 'KASLAR: YAKIT!', `<g id="flex"><path d="M${X - 160},450 Q${X - 180},330 ${X - 70},300 Q${X + 20},270 ${X + 50},350 Q${X + 130},330 ${X + 150},250 L${X + 200},270 Q${X + 190},380 ${X + 80},420 Q${X + 20},490 ${X - 100},490Z" fill="#E9B48C"/></g>`, '#FFB36B', X) +
    card('cS', 'MİDE: SONRA BAKARIZ', `<ellipse cx="${X}" cy="350" rx="130" ry="100" fill="#8A8FA3"/><rect x="${X - 130}" y="300" width="260" height="90" rx="14" fill="#E53935" transform="rotate(-8 ${X} 345)"/><text class="lbl" x="${X}" y="365" text-anchor="middle" font-size="54" fill="#fff" transform="rotate(-8 ${X} 345)">KAPALI</text>`, '#B9BDCB', X) +
    card('cB', 'KAN BACAKLARA!', `<rect x="${X - 90}" y="230" width="70" height="260" rx="34" fill="#E9B48C"/><rect x="${X + 20}" y="230" width="70" height="260" rx="34" fill="#E9B48C"/><rect x="${X - 90}" y="230" width="70" height="260" rx="34" fill="#FF3B3B" opacity=".55" id="lgG"/><rect x="${X + 20}" y="230" width="70" height="260" rx="34" fill="#FF3B3B" opacity=".55"/>`, '#FF6B6B', X), S[1]);
  const seq = [['cH', 'h2_11', 'kalp'], ['cL', 'h2_11', 'nefes'], ['cE', 'h2_11', 'göz'], ['cV', 'h2_11', 'kara'], ['cM', 'h2_11', 'kaslar'], ['cS', 'h2_12', 'mide'], ['cB', 'h2_12', 'kan']];
  seq.forEach(([id, l, w], i) => { const t = Wt(l, w, 0, .1 + i * .12) - .1, tn = i < seq.length - 1 ? Wt(seq[i + 1][1], seq[i + 1][2], 0, .2 + (i + 1) * .12) - .15 : E('h2_12') + .25;
    pop('#' + id, t, 960, 370, .4, .25); tl.to('#' + id, {opacity: 0, duration: .1}, tn); sfx('card', t, .4); });
  tl.to('#cHh', {scale: 1.18, svgOrigin: '960 400', duration: .1, yoyo: true, repeat: 9}, Wt('h2_11', 'kalp', 0, .1)); sfx('heart_fast', Wt('h2_11', 'kalp', 0, .1), .45, {dur: 3});
  tl.to('#lu', {scale: 1.2, svgOrigin: '960 350', duration: .35, yoyo: true, repeat: 1}, Wt('h2_11', 'nefes', 0, .2)); sfx('breath', Wt('h2_11', 'nefes', 0, .2), .45);
  tl.fromTo('#pup', {attr: {r: 24}}, {attr: {r: 64}, duration: .4, immediateRender: false}, Wt('h2_11', 'göz', 0, .35) + .1);
  tl.to('.sg', {y: 160, opacity: 0, duration: .7, stagger: .08, ease: 'power1.in'}, Wt('h2_11', 'kara', 0, .55) + .2);
  tl.to('#flex', {scale: 1.08, svgOrigin: '960 400', duration: .12, yoyo: true, repeat: 5}, Wt('h2_11', 'kaslar', 0, .8)); sfx('zap', Wt('h2_11', 'kaslar', 0, .8), .4);
  sfx('buzz', Wt('h2_12', 'mide', 0, .1), .35);
  // --- FIGHT OR FLIGHT
  const tF = T('h2_13') - .1;
  add(`<rect width="${W}" height="${H}" fill="#120618"/><rect x="0" y="0" width="958" height="${H}" fill="#3A0A14"/><rect x="962" y="0" width="958" height="${H}" fill="#3A2A06"/>` +
    `<g id="sv" opacity="0"><text class="lbl" x="479" y="560" text-anchor="middle" font-size="180" fill="#FF3B3B" filter="url(#glow)">SAVAŞ</text><text x="479" y="760" text-anchor="middle" font-size="160">🥊</text></g>` +
    `<g id="kc" opacity="0"><text class="lbl" x="1440" y="560" text-anchor="middle" font-size="180" fill="#FFE45C" filter="url(#glow)">KAÇ!</text><text x="1440" y="760" text-anchor="middle" font-size="160">🏃</text></g>` +
    `<text id="tq" class="lbl" x="960" y="200" text-anchor="middle" font-size="64" fill="#fff" opacity="0">TEK SORU:</text>`, S[2]);
  cut(2, tF); show("#tq", tF, .1);
  const tSv = Wt('h2_13', 'savaş', 0, .55), tKc = Wt('h2_13', 'kaç', 0, .85);
  pop('#sv', tSv, 479, 520); sfx('title_hit', tSv, .7); pop('#kc', tKc, 1440, 520); sfx('title_hit', tKc, .7, {rate: 1.15}); shake('#sh_ff', tKc, 10, .3);
  wipeOut('#0B1440', .4);
})();
