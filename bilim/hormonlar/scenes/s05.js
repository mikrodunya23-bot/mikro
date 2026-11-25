// S05 — Breakup: reward system still wants (withdrawal), rejection lights pain regions, "broken heart syndrome", then hope.
(function () {
  const S = ['rain', 'scan', 'brain', 'split', 'heart', 'hope'].map(n => A(`<g id="sh_${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  fadeIn(.8, '#05040F');
  // --- rain, alone
  add(`<g id="camR">${rainBench('rn')}` + person('ah', AHMET, 790, 175, .9, {rightHand: phoneProp(286, 600, true)}) + `</g>` +
    `<g id="msgs" opacity="0"><rect x="1180" y="200" width="420" height="300" rx="30" fill="#F2F4FF"/>${[0, 1, 2].map(i => `<g><rect x="1280" y="${230 + i * 85}" width="300" height="64" rx="24" fill="#5B5BD6"/><text class="txt" x="1430" y="${272 + i * 85}" text-anchor="middle" font-size="26" fill="#fff">${['Konuşabilir miyiz?', 'Lütfen…', 'İyi misin?'][i]}</text></g>`).join('')}<text class="txt" x="1580" y="490" text-anchor="end" font-size="22" fill="#8A8FB5">✓ iletildi</text></g>`, S[0]);
  cut(0, 0); sit('ah', 0); armSet('ah', 'R', 38, 0); face('ah', {e: 'sad', m: 'sad'}, 0);
  rainRun('rn', 0, DUR); sfx('rain', 0, .4, {dur: T('s5_02') + .5}); sfx('thunder', 1.0, .4);
  const tGo = Wt('s5_01', 'gitmişse', 0, .8) - .3; show('#msgs', tGo - .6, .4); face('ah', {tears: 1}, tGo);
  // --- the scan
  const t1 = T('s5_02') - .1, B1 = [960 - 520 * .95, 560 - 330 * .95, .95];
  add(gridBg('#05070F', '#3A6FB0') + brainSide('bs', B1[0], B1[1], B1[2], {head: true, skin: '#2B3142', skinD: '#232838', hair: '#2B3142', window: 0, pal: BR_GRAY, marks: .4, eye: false}) +
    `<text class="txt" x="80" y="110" font-size="34" fill="#7FA9D9" opacity=".8">beyin taraması · ayrılık yaşayanlar</text>`, S[1]);
  cut(1, t1); flash(t1, .3, '#BFD9FF'); sfx('scan', t1, .45);
  const tSs = Wt('s5_02', 'şaşırtıcı', 0, .6); rglow('bs', 'vta', tSs, 'gY', 70, {pulse: 4}); rglow('bs', 'nacc', tSs + .2, 'gY', 70, {pulse: 4}); sfx('ding', tSs, .35);
  // --- reward still wants: the wall
  const t2 = T('s5_03') - .1, B = [960 - 520 * 1.02, 540 - 340 * 1.02, 1.02];
  add(darkBg('#141432', '#1E1E48', 18, .5) + brainSide('br', B[0], B[1], B[2], {head: true, headOp: .38, window: .5, marks: .45}) +
    `<g id="wall" opacity="0">${[0, 1, 2, 3].map(r => [0, 1].map(c => `<rect x="${brPt(...B, 'nacc')[0] + 26 + c * 34 + (r % 2) * 17}" y="${brPt(...B, 'nacc')[1] - 70 + r * 34}" width="32" height="32" rx="4" fill="#B5523B" stroke="#7A3424" stroke-width="3"/>`).join('')).join('')}</g>` +
    `<g id="yok" opacity="0"><rect x="1280" y="820" width="540" height="100" rx="50" fill="#F5B800"/><text class="lbl" x="1550" y="886" text-anchor="middle" font-size="44" fill="#2A1A00">bağımlılık · yoksunluk</text></g>`, S[2]);
  cut(2, t2); sfx('whoosh', t2 - .1, .4);
  add(`<path id="br-p-mw" d="M528,410 C580,392 612,372 640,352" fill="none" stroke="#FFE45C" stroke-width="9" stroke-linecap="round" opacity="0"/>`, $('#br-brain'));
  brPath('br', 'mw', t2 + .2, .6, '#FFE45C'); rglow('br', 'vta', t2 + .2, 'gY', 70, {pulse: 10});
  show('#wall', t2 + .6, .3);
  for (let k = 0; k < 7; k++) { const t = t2 + .8 + k * .9, c = add(`<circle cx="${BR.vta[0]}" cy="${BR.vta[1]}" r="10" fill="#FFE45C" opacity="0" filter="url(#glow)"/>`, $('#br-fx'));
    tl.set(c, {opacity: 1, attr: {cx: BR.vta[0], cy: BR.vta[1]}}, t); tl.to(c, {attr: {cx: 628, cy: 360}, duration: .45, ease: 'power1.in'}, t); tl.to(c, {attr: {cx: 600, cy: 410}, opacity: 0, duration: .4, ease: 'power1.out'}, t + .45); }
  add(tag('tgWant', ...brPt(...B, 'nacc'), brPt(...B, 'nacc')[0] + 300, brPt(...B, 'nacc')[1] - 250, 'hâlâ istiyor… ödül yok', '#F5B800', '#2A1A00', 32), S[2]); show('#tgWant', Wt('s5_03', 'istiyor', 0, .4), .3);
  pop('#yok', Wt('s5_03', 'yoksunluk', 0, .8) - .1, 1550, 870); sfx('thud', Wt('s5_03', 'yoksunluk', 0, .8), .4);
  // --- pain regions: split screen
  const t3 = T('s5_04') - .1;
  const mini = (id, x) => brainSide(id, x - 520 * .6, 430 - 330 * .6, .6, {head: false, window: 0, marks: .3});
  add(`<rect width="${W}" height="${H}" fill="#191636"/><rect x="0" y="0" width="958" height="${H}" fill="#221E48"/>` + mini('bl', 480) + mini('bR', 1440) +
    `<g transform="translate(120,650) scale(.42)">${char('ak', AHMET)}</g><rect x="250" y="905" width="260" height="30" rx="10" fill="#8A5C3E"/><g id="ouch" opacity="0">${star(300, 830, 40, '#FFE45C', '', 6)}</g>` +
    `<g transform="translate(1080,650) scale(.42)">${char('ar', AHMET)}</g>` +
    `<text class="lbl" x="480" y="140" text-anchor="middle" font-size="50" fill="#FFB36B">FİZİKSEL ACI</text><text class="lbl" x="1440" y="140" text-anchor="middle" font-size="50" fill="#B39DFF">REDDEDİLME</text><rect x="956" y="0" width="8" height="${H}" fill="#fff" opacity=".6"/>`, S[3]);
  cut(3, t3); sfx('whoosh', t3 - .1, .4);
  face('ak', {e: 'big', m: 'scream'}, 0); face('ar', {e: 'sad', m: 'sad', tears: 1}, 0);
  arm('ak', 'R', -40, t3 + .4, .2); pop('#ouch', t3 + .6, 300, 830); sfx('bonk', t3 + .6, .5);
  const tPn = Wt('s5_04', 'fiziksel', 0, .4);
  ['bl', 'bR'].forEach((id, i) => { rglow(id, 'acc', tPn + i * .2, 'gR', 80, {pulse: 6}); rglow(id, 'insula', tPn + .3 + i * .2, 'gR', 70, {pulse: 6}); });
  sfx('ding', tPn, .35); sfx('ding', tPn + .3, .35, {rate: 1.1});
  add(`<g id="sameT" opacity="0"><rect x="660" y="900" width="600" height="80" rx="40" fill="#E53935"/><text class="lbl" x="960" y="953" text-anchor="middle" font-size="38" fill="#fff">benzer bölgeler yanıyor</text></g>`, S[3]);
  pop('#sameT', tPn + .8, 960, 940);
  const tCa = T('s5_05');
  add(`<g id="canim" opacity="0"><rect x="560" y="440" width="800" height="150" rx="75" fill="#fff"/><text class="lbl" x="960" y="538" text-anchor="middle" font-size="68" fill="#C2185B">“Canım yanıyor.”</text></g><g id="mecaz" opacity="0"><text class="lbl" x="960" y="700" text-anchor="middle" font-size="56" fill="#FFE45C">mecaz değil — gerçek bir acı</text></g>`, S[3]);
  pop('#canim', tCa + .1, 960, 515); show('#mecaz', Wt('s5_05', 'beynin', 0, .55) - .1, .3); hide('#sameT', tCa, .2);
  // --- broken heart syndrome
  const t4 = T('s5_06') - .1;
  add(`<rect width="${W}" height="${H}" fill="#12091E"/>${rays(960, 540, 16, '#1E0E2E', .6)}` +
    `<g id="hrt"><path id="hp" d="M960,380 C920,300 760,300 760,430 C760,540 880,620 960,700 C1040,620 1160,540 1160,430 C1160,300 1000,300 960,380Z" fill="#E53950"/>` +
    `<path d="M880,380 C880,350 920,340 940,360" stroke="#FFB0BC" stroke-width="14" fill="none" stroke-linecap="round"/></g><g id="hfx"></g>` +
    `<g id="tako" opacity="0"><rect x="560" y="800" width="800" height="110" rx="55" fill="#E53935"/><text class="lbl" x="960" y="872" text-anchor="middle" font-size="52" fill="#fff">KIRIK KALP SENDROMU</text></g>` +
    `<text id="tako2" class="txt" x="960" y="960" text-anchor="middle" font-size="32" fill="#FFB0BC" opacity="0">(Takotsubo · çoğunlukla geçicidir)</text>`, S[4]);
  cut(4, t4); sfx('whoosh', t4 - .1, .4); sfx('heart_slow', t4, .45, {dur: 12});
  for (let k = 0; k < 16; k++) tl.to('#hrt', {scale: 1.06, svgOrigin: '960 520', duration: .14, yoyo: true, repeat: 1}, t4 + .3 + k * .75);
  const tSt = Wt('s5_06', 'stres', 0, .4) - .1;
  for (let i = 0; i < 30; i++) { const a = R() * Math.PI * 2, c = add(`<circle cx="${960 + Math.cos(a) * 520}" cy="${520 + Math.sin(a) * 420}" r="${7 + R() * 5}" fill="#FF3B3B" opacity="0" filter="url(#glow)"/>`, $('#hfx'));
    tl.set(c, {opacity: 1}, tSt + i * .05); tl.to(c, {attr: {cx: 960 + Math.cos(a) * 150, cy: 520 + Math.sin(a) * 150}, duration: 1, ease: 'power1.in'}, tSt + i * .05); tl.to(c, {opacity: 0, duration: .3}, tSt + i * .05 + 1); }
  const tZy = Wt('s5_06', 'zayıf', 0, .6) - .2;
  tl.to('#hp', {attr: {d: 'M960,380 C920,300 780,320 790,450 C800,600 860,700 960,740 C1060,700 1120,600 1130,450 C1140,320 1000,300 960,380Z'}, fill: '#B53A4E', duration: 1}, tZy);
  sfx('down', tZy, .4);
  pop('#tako', Wt('s5_06', 'kırık', 0, .85) - .15, 960, 855); show('#tako2', Wt('s5_06', 'sendromu', 0, .9), .3);
  // whisper: love lives in the brain, the heart may pay
  const t5 = T('s5_07') - .1;
  add(`<g id="bh" opacity="0">${brainSide('bw', 560 - 520 * .5, 520 - 300 * .5, .5, {head: false, window: 0, marks: 0})}<path id="thread" d="M760,480 C900,380 1020,600 1180,500" stroke="#FFC2DA" stroke-width="8" fill="none" stroke-dasharray="6 12"/></g>`, S[4]);
  show('#bh', t5, .5); tl.to('#hrt', {scale: .55, x: 360, y: -20, svgOrigin: '960 520', duration: .8}, t5); hide('#tako,#tako2', t5, .3);
  drawPath('#thread', t5 + .4, 1.4);
  // --- hope
  const t6 = T('s5_08') - .1;
  add(`<g id="sky"><rect width="${W}" height="${H}" fill="url(#gDay)"/><circle id="sun" cx="1600" cy="300" r="120" fill="#FFE07A"/></g><rect x="0" y="820" width="${W}" height="260" fill="#6CC084"/>` +
    person('hr', AHMET, 380, 160, .9) +
    `<g id="ball" opacity="0"><circle cx="700" cy="860" r="44" fill="#fff"/><path d="M670,840 l30,20 l30,-20 M700,860 v40" stroke="#333" stroke-width="6" fill="none"/></g>` +
    `<g id="lol" opacity="0">${[0, 1, 2].map(i => `<text class="lbl" x="${780 + i * 120}" y="${300 - i * 40}" font-size="64" fill="#FF9D2E">ha</text>`).join('')}</g>` +
    `<g id="flag" opacity="0"><rect x="1300" y="520" width="12" height="320" fill="#5A4470"/><path d="M1312,520 L1460,560 L1312,600Z" fill="#FF4F92"/><text class="lbl" x="1380" y="900" text-anchor="middle" font-size="40" fill="#1E5A3A">yeni hedefler</text></g>` +
    `<g id="bri">${brainSide('bn', 1600 - 520 * .38, 820 - 330 * .38 - 60, .38, {head: false, window: 0, marks: .25})}</g>`, S[5]);
  cut(5, t6); flash(t6, .5, '#FFF4C8', .5); sfx('birds', t6, .4, {dur: 6}); sfx('swell', t6, .4);
  tl.fromTo('#sun', {attr: {cy: 700}}, {attr: {cy: 300}, duration: 2.5, ease: 'power2.out', immediateRender: false}, t6);
  face('hr', {e: 'dot', m: 'smile'}, t6);
  ['vta', 'nacc', 'pfc', 'hypo', 'amyg'].forEach((r, i) => rglow('bn', r, t6 + 2 + i * 1.3, i % 2 ? 'gP' : 'gY', 70));
  ['meso', 'oxyA', 'oxyN'].forEach((p, i) => { brPath('bn', p, t6 + 2.5 + i * 2, 1, i ? '#FF7FB0' : '#FFE45C'); });
  const tSp = Wt('s5_08', 'spor', 0, .5) - .1;
  show('#ball', tSp, .2); tl.to('#ball', {y: -220, duration: .35, yoyo: true, repeat: 3, ease: 'power1.out'}, tSp); arm('hr', 'R', -120, tSp, .2); arm('hr', 'R', 0, tSp + .5, .2); sfx('kick', tSp, .45);
  const tLo = Wt('s5_08', 'arkadaşlarla', 0, .6) - .1; face('hr', {e: 'happy', m: 'grin'}, tLo); show('#lol', tLo, .2); tl.fromTo('#lol text', {y: 20, opacity: 0}, {y: 0, opacity: 1, duration: .25, stagger: .15, immediateRender: false}, tLo); sfx('laugh', tLo, .35);
  hide('#lol', tLo + 1.6, .3);
  const tHd = Wt('s5_08', 'hedefler', 0, .7) - .1; pop('#flag', tHd, 1380, 700); sfx('ding', tHd, .4);
  walk('hr', tHd, 1.6, 700, .26);
  wipeOut('#140F3A', .5);
})();
