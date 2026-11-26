// V9 — Next day: "Who's that?!" (Numan) -> oxytocin's dark side; unanswered messages -> breakup pain science; twist: dead phone, cousin.
(function () {
  const S = ['cafe', 'rain', 'brain', 'split', 'heart', 'door'].map(n => A(`<g id="sh_${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  wipeIn('#E8536B', .4); hudClock('10:30', 0, T('h5_03') - .2);
  // --- café: Yasemin hugs Numan, Miraç sees
  add(cafeFront() + `<g id="green" opacity="0"><circle cx="350" cy="260" r="230" fill="#5BD15B" opacity=".4" filter="url(#blur8)"/></g>` + person('ya', MERYEM, 1060, 160, .9) + person('nu', NUMAN, 1300, 160, .9) + person('mi', AHMET, 160, 170, .95) +
    `<g id="ring"><ellipse cx="760" cy="960" rx="700" ry="70" fill="none" stroke="#FF7FB0" stroke-width="12" opacity=".0"/></g>` +
    `<g id="who" opacity="0"><ellipse cx="560" cy="150" rx="230" ry="80" fill="#fff"/><text class="lbl" x="560" y="168" text-anchor="middle" font-size="50" fill="#2E7D32">O da kim?!</text></g>` +
    `<g id="dark" opacity="0"><rect x="560" y="900" width="800" height="100" rx="50" fill="#5B2A86"/><text class="lbl" x="960" y="968" text-anchor="middle" font-size="44" fill="#fff">oksitosinin karanlık tarafı</text></g>`, S[0]);
  cut(0, 0); face('ya', {e: 'happy', m: 'grin'}, 0); face('nu', {e: 'happy', m: 'grin'}, 0); arm('ya', 'R', -96, .2, .3); arm('nu', 'L', 96, .2, .3);
  face('mi', {e: 'big', m: 'o'}, .9); sfx('dun', .9, .5);
  talk('mi', 'h5_01', 'o', 'flat'); show('#who', T('h5_01'), .1); show('#green', T('h5_01'), .4);
  face('mi', {e: 'half', m: 'flat', brow: 10, browRot: 14}, E('h5_01')); sfx('grr', E('h5_01'), .45);
  pop('#dark', Wt('h5_02', 'karanlık', 0, .1), 960, 950); sfx('dun', Wt('h5_02', 'karanlık', 0, .1), .4);
  tl.to('#miW', {x: 40, duration: .3}, Wt('h5_02', 'kıskanç', 0, .9));
  // --- rain + unanswered messages
  const t1 = T('h5_03') - .2;
  add(rainBench('rn') + person('ar', AHMET, 790, 175, .9, {rightHand: phoneProp(286, 600, true)}) +
    `<g id="msgs"><rect x="1180" y="200" width="460" height="330" rx="30" fill="#F2F4FF"/>${[0, 1, 2].map(i => `<g class="mg" opacity="0"><rect x="1280" y="${230 + i * 90}" width="330" height="66" rx="24" fill="#5B5BD6"/><text class="txt" x="1445" y="${272 + i * 90}" text-anchor="middle" font-size="26" fill="#fff">${['Neredesin?', 'Yasemin?', 'Cevap ver lütfen…'][i]}</text></g>`).join('')}<text class="txt" x="1620" y="515" text-anchor="end" font-size="22" fill="#8A8FB5">✓ iletildi</text></g>`, S[1]);
  cut(1, t1); sit('ar', 0); armSet('ar', 'R', 38, 0); face('ar', {e: 'sad', m: 'sad'}, 0); rainRun('rn', t1, t1 + 4); sfx('rain', t1, .4, {dur: 4}); sfx('thunder', t1 + .3, .4);
  tl.to('.mg', {opacity: 1, duration: .1, stagger: .5}, t1 + .2); face('ar', {tears: 1}, t1 + 1.6);
  const t2 = Wt('h5_03', 'reddedildiğini', 0, .3) - .1, B = [960 - 520 * 1.02, 540 - 340 * 1.02, 1.02];
  add(darkBg('#141432', '#1E1E48', 18, .5) + brainSide('br', B[0], B[1], B[2], {head: true, headOp: .38, window: .5, marks: .45}) +
    `<g id="wall" opacity="0">${[0, 1, 2, 3].map(r => [0, 1].map(c => `<rect x="${brPt(...B, 'nacc')[0] + 26 + c * 34 + (r % 2) * 17}" y="${brPt(...B, 'nacc')[1] - 70 + r * 34}" width="32" height="32" rx="4" fill="#B5523B" stroke="#7A3424" stroke-width="3"/>`).join('')).join('')}</g>` +
    `<g id="yok" opacity="0"><rect x="1240" y="820" width="600" height="100" rx="50" fill="#F5B800"/><text class="lbl" x="1540" y="886" text-anchor="middle" font-size="44" fill="#2A1A00">bağımlılık · yoksunluk</text></g>`, S[2]);
  cut(2, t2); sfx('whoosh', t2 - .1, .4);
  add(`<path id="br-p-mw" d="M528,410 C580,392 612,372 640,352" fill="none" stroke="#FFE45C" stroke-width="9" stroke-linecap="round" opacity="0"/>`, $('#br-brain'));
  brPath('br', 'mw', t2 + .1, .4, '#FFE45C'); rglow('br', 'vta', t2 + .1, 'gY', 70, {pulse: 8}); show('#wall', t2 + .4, .2);
  for (let k = 0; k < 6; k++) { const t = t2 + .5 + k * .7, c = add(`<circle cx="${BR.vta[0]}" cy="${BR.vta[1]}" r="10" fill="#FFE45C" opacity="0" filter="url(#glow)"/>`, $('#br-fx'));
    tl.set(c, {opacity: 1, attr: {cx: BR.vta[0], cy: BR.vta[1]}}, t); tl.to(c, {attr: {cx: 628, cy: 360}, duration: .35, ease: 'power1.in'}, t); tl.to(c, {attr: {cx: 600, cy: 410}, opacity: 0, duration: .3}, t + .35); sfx('thud', t + .35, .25); }
  pop('#yok', Wt('h5_03', 'yoksunluk', 0, .85) - .1, 1540, 870);
  // --- split: physical pain vs rejection
  const t3 = T('h5_04') - .1;
  const mini = (id, x) => brainSide(id, x - 520 * .6, 430 - 330 * .6, .6, {head: false, window: 0, marks: .3});
  add(`<rect width="${W}" height="${H}" fill="#191636"/><rect x="0" y="0" width="958" height="${H}" fill="#221E48"/>` + mini('bl', 480) + mini('bR', 1440) +
    `<g transform="translate(120,650) scale(.42)">${char('ak', AHMET)}</g><rect x="250" y="905" width="260" height="30" rx="10" fill="#8A5C3E"/><g id="ouch" opacity="0">${star(300, 830, 40, '#FFE45C', '', 6)}</g>` +
    `<g transform="translate(1080,650) scale(.42)">${char('ak2', AHMET, {rightHand: phoneProp(286, 600)})}</g>` +
    `<text class="lbl" x="480" y="130" text-anchor="middle" font-size="50" fill="#FFB36B">FİZİKSEL ACI</text><text class="lbl" x="1440" y="130" text-anchor="middle" font-size="50" fill="#B39DFF">REDDEDİLME</text><rect x="956" y="0" width="8" height="${H}" fill="#fff" opacity=".6"/>` +
    `<g id="canim" opacity="0"><rect x="560" y="900" width="800" height="110" rx="55" fill="#fff"/><text class="lbl" x="960" y="975" text-anchor="middle" font-size="54" fill="#C2185B">“Canım yanıyor” = GERÇEK!</text></g>`, S[3]);
  cut(3, t3); sfx('whoosh', t3 - .1, .4); face('ak', {e: 'big', m: 'scream'}, 0); face('ak2', {e: 'sad', m: 'sad', tears: 1}, 0); armSet('ak2', 'R', 38, 0);
  arm('ak', 'R', -40, t3 + .3, .15); pop('#ouch', t3 + .4, 300, 830); sfx('bonk', t3 + .4, .55);
  const tPn = Wt('h5_04', 'fiziksel', 0, .25); ['bl', 'bR'].forEach((id, i) => { rglow(id, 'acc', tPn + i * .15, 'gR', 80, {pulse: 5}); rglow(id, 'insula', tPn + .25 + i * .15, 'gR', 70, {pulse: 5}); }); sfx('ding', tPn, .4);
  pop('#canim', Wt('h5_04', 'canım', 0, .7) - .1, 960, 955); sfx('title_hit', Wt('h5_04', 'canım', 0, .7), .45);
  // --- broken heart syndrome
  const t4 = T('h5_05') - .1;
  add(`<rect width="${W}" height="${H}" fill="#12091E"/>${rays(960, 540, 16, '#1E0E2E', .6)}<g id="hrt"><path id="hp" d="M960,380 C920,300 760,300 760,430 C760,540 880,620 960,700 C1040,620 1160,540 1160,430 C1160,300 1000,300 960,380Z" fill="#E53950"/></g><g id="hfx"></g>` +
    `<g id="tako" opacity="0"><rect x="560" y="780" width="800" height="110" rx="55" fill="#E53935"/><text class="lbl" x="960" y="852" text-anchor="middle" font-size="52" fill="#fff">KIRIK KALP SENDROMU</text></g><text id="tako2" class="txt" x="960" y="940" text-anchor="middle" font-size="32" fill="#FFB0BC" opacity="0">(Takotsubo · çoğunlukla geçicidir)</text>`, S[4]);
  cut(4, t4); sfx('heart_slow', t4, .45, {dur: D('h5_05') + .5});
  for (let k = 0; k < 10; k++) tl.to('#hrt', {scale: 1.06, svgOrigin: '960 520', duration: .14, yoyo: true, repeat: 1}, t4 + .2 + k * .75);
  const tSt = Wt('h5_05', 'stre', 0, .25) - .1;
  for (let i = 0; i < 24; i++) { const a = R() * Math.PI * 2, c = add(`<circle cx="${960 + Math.cos(a) * 520}" cy="${520 + Math.sin(a) * 420}" r="${7 + R() * 5}" fill="#FF3B3B" opacity="0" filter="url(#glow)"/>`, $('#hfx'));
    tl.set(c, {opacity: 1}, tSt + i * .04); tl.to(c, {attr: {cx: 960 + Math.cos(a) * 150, cy: 520 + Math.sin(a) * 150}, duration: .9, ease: 'power1.in'}, tSt + i * .04); tl.to(c, {opacity: 0, duration: .3}, tSt + i * .04 + .9); }
  tl.to('#hp', {attr: {d: 'M960,380 C920,300 780,320 790,450 C800,600 860,700 960,740 C1060,700 1120,600 1130,450 C1140,320 1000,300 960,380Z'}, fill: '#B53A4E', duration: .9}, Wt('h5_05', 'zayıflatabilir', 0, .5) - .2);
  pop('#tako', Wt('h5_05', 'kırık', 0, .85) - .15, 960, 835); show('#tako2', Wt('h5_05', 'kırık', 0, .85) + .5, .3);
  // --- twist at the door
  const t5 = T('h5_06') - 1.3;
  add(aptDoor() + `<g id="sun" opacity="0"><circle cx="490" cy="420" r="320" fill="url(#gY)"/></g>` + person('mi2', AHMET, 300, 170, .95) + `<g id="doorL"><rect x="1210" y="190" width="460" height="690" rx="8" fill="#8A5C3E"/><circle cx="1290" cy="540" r="14" fill="#FFD54F"/></g>` +
    `<g id="duo" opacity="0">${person('ya2', MERYEM, 1180, 170, .92)}${person('nu2', NUMAN, 1420, 170, .92, {rightHand: ''})}</g>` +
    `<g id="ph0" opacity="0"><rect x="1100" y="560" width="70" height="120" rx="12" fill="#1E1B3A"/><rect x="1108" y="572" width="54" height="96" rx="8" fill="#000"/><text x="1135" y="640" text-anchor="middle" font-size="40">🪫</text></g>` +
    `<g id="kz" opacity="0"><rect x="700" y="100" width="520" height="120" rx="60" fill="#3FD47A"/><text class="lbl" x="960" y="180" text-anchor="middle" font-size="64" fill="#fff">KUZEN! 🎉</text></g>`, S[5]);
  cut(5, t5); face('mi2', {e: 'sad', m: 'sad'}, t5); sfx('thud', t5 + .2, .6); sfx('thud', t5 + .45, .6);
  tl.to('#doorL', {scaleX: .08, svgOrigin: '1670 500', duration: .45, ease: 'power2.out'}, t5 + .8); show('#duo', t5 + .9, .2); sfx('creak', t5 + .8, .3);
  face('ya2', {e: 'happy', m: 'smile'}, 0); face('nu2', {e: 'happy', m: 'grin'}, 0); arm('nu2', 'R', -150, t5 + 1.1, .25); tl.to('#nu2-armR', {rotation: -125, svgOrigin: '286 400', duration: .18, yoyo: true, repeat: 7}, t5 + 1.4);
  talk('ya2', 'h5_06', 'o', 'smile'); pop('#ph0', T('h5_06') + .2, 1135, 620); arm('ya2', 'L', 70, T('h5_06') + .1, .3);
  const tKz = T('h5_07'); talk('mi2', 'h5_07', 'grin', 'grin'); face('mi2', {e: 'happy', tears: 0}, tKz - .1); show('#sun', tKz - .1, .3); pop('#kz', tKz + .2, 960, 160); sfx('title_hit', tKz, .5);
  tl.to('#mi2W', {y: -40, duration: .18, yoyo: true, repeat: 7, ease: 'power1.out'}, tKz + .2);
  // all lights again
  const t6 = T('h5_08') - .1, B6 = [960 - 520 * .8, 520 - 300 * .8, .8];
  add(`<g id="fin" opacity="0"><rect width="${W}" height="${H}" fill="#140F3A"/>${rays(960, 540, 18, '#221B5C', .6)}${brainSide('bz', B6[0], B6[1], B6[2], {head: false, window: 0, marks: .3})}</g>`, S[5]);
  show('#fin', t6, .25); ['vta', 'nacc', 'pfc', 'hypo', 'amyg', 'caud'].forEach((r, i) => rglow('bz', r, t6 + .3 + i * .18, i % 2 ? 'gP' : 'gY', 80, {pulse: 4}));
  sfx('swell', t6, .5); sfx('sparkle', t6 + .4, .45);
  wipeOut('#140F3A', .4);
})();
