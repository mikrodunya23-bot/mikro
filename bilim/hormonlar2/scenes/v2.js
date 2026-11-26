// V2 — Inside Miraç's head: the dopamine party (VTA factory, disco), synapse release, molecule shouts, not "happiness", MRI box.
(function () {
  const S = ['brain', 'syn', 'mol', 'mri'].map(n => A(`<g id="sh_${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  hudClock('09:47', 0);
  // --- brain party
  const B = [960 - 520 * 1.05, 560 - 340 * 1.05, 1.05];
  let disco = ''; for (let i = 0; i < 6; i++) disco += `<path class="beam" d="M960,-40 L${700 + i * 110},1120 L${760 + i * 110},1120Z" fill="${['#FFE45C', '#FF7FB0', '#7FD8FF'][i % 3]}" opacity=".12"/>`;
  add(darkBg('#1A0F44', '#2A1A66', 18, .55) + `<g id="cam">${brainSide('br', B[0], B[1], B[2], {head: true, headOp: .35, window: .45, marks: .45})}</g>` +
    `<g id="disco" opacity="0">${disco}<circle cx="960" cy="40" r="60" fill="#E0E0FF"/><circle cx="960" cy="40" r="60" fill="none" stroke="#9A9AC8" stroke-width="6" stroke-dasharray="10 10"/></g>` +
    `<g id="fab" opacity="0"><rect x="150" y="180" width="660" height="110" rx="55" fill="#F5B800"/><text class="lbl" x="480" y="255" text-anchor="middle" font-size="50" fill="#2A1A00">🏭 DOPAMİN FABRİKASI</text></g>` +
    `<g id="shift" opacity="0"><rect x="1240" y="180" width="460" height="110" rx="55" fill="#FF4F92"/><text class="lbl" x="1470" y="255" text-anchor="middle" font-size="50" fill="#fff">VARDİYA BAŞLADI!</text></g>`, S[0]);
  cut(0, 0); camSet('#cam', 0, ...brPt(...B, 'eye'), 2.2); cam('#cam', 0, 960, 560, 1, 1.0, 'power2.out');
  brPath('br', 'vis', .2, .5, '#7FD8FF'); brFlow('br', 'vis', 10, .2, 1.0, ['#7FD8FF', '#fff'], {dur: .5}); brPath('br', 'v2r', .7, .4, '#7FD8FF');
  const tV = Wt('h1_04', 'vta', 0, .1) - .1;
  rglow('br', 'vta', tV, 'gY', 90, {pulse: 14}); pop('#fab', tV + .2, 480, 235); sfx('fire', tV, .6);
  add(tag('tgV', ...brPt(...B, 'vta'), brPt(...B, 'vta')[0] - 60, brPt(...B, 'vta')[1] + 250, 'VTA', '#F5B800', '#2A1A00', 40), S[0]); show('#tgV', tV + .3, .2);
  burst($('#br-fx'), 40, BR.vta[0], BR.vta[1], BR.vta[0] + 40, BR.vta[1] - 60, 260, 170, tV + .2, {colors: ['#FFE45C', '#FF7FB0', '#7FD8FF', '#fff'], r: 8, spread: 2.4, glow: true});
  const tS = Wt('h1_04', 'saniye', 0, .7) - .2; pop('#shift', tS, 1470, 235); show('#disco', tS, .2);
  tl.to('.beam', {rotation: 24, svgOrigin: '960 -40', duration: .8, yoyo: true, repeat: 5, stagger: .1, ease: 'sine.inOut'}, tS); sfx('title_hit', tS, .45);
  // --- synapse
  const t1 = T('h1_05') - .15;
  add(synapse('syn', '#FFE45C') + tag('tgG', 1300, 500, 1620, 470, 'boşluk (sinaps)', '#3A2F80', '#fff', 32) + tag('tgR', 760, 580, 430, 700, 'kilitler (reseptör)', '#2E6FD8', '#fff', 32), S[1]);
  cut(1, t1); flash(t1, .5, '#FFE45C', .25); sfx('whoosh', t1 - .1, .5);
  tl.fromTo('#sh_syn', {scale: .6, svgOrigin: '960 500'}, {scale: 1, duration: .6, ease: 'power2.out', immediateRender: false}, t1);
  const tF = Wt('h1_05', 'fırlıyor', 0, .35) - .5; synRelease('syn', tF, '#FFE45C', 64); sfx('release', tF + .4, .6); sfx('click', tF + 1.1, .4);
  show('#tgG', tF + .3, .2); show('#tgR', tF + .9, .2);
  // --- the molecule shouts
  const t2 = T('h1_06') - .25;
  add(`<rect width="${W}" height="${H}" fill="#FFD54F"/>${rays(960, 520, 22, '#FFC93C', .8)}<g transform="translate(960,470) scale(1.6)"><g id="dm">${mol('dmi', 'dopa')}</g></g>` +
    `<g id="sh1" opacity="0"><text class="lbl" x="960" y="900" text-anchor="middle" font-size="110" fill="#7A3A00" letter-spacing="4">BUNU YİNE İSTİYORUM!</text></g>`, S[2]);
  cut(2, t2); sfx('boing', t2, .5);
  tl.fromTo('#dm', {scale: .3}, {scale: 1, duration: .3, ease: 'back.out(3)', immediateRender: false}, t2);
  const envD = (window.TIMING.env || {})['h1_06'] || []; SEEKERS.push(t => { const k = t - T('h1_06'); const v = k >= 0 && k < D('h1_06') ? (envD[Math.floor(k * 30)] || 0) : 0; $('#dm').parentNode.setAttribute('transform', `translate(960,${470 - v * 40}) scale(${1.6 + v * .35})`); });
  pop('#sh1', T('h1_06'), 960, 870);
  // --- not happiness: motivation
  const t3 = T('h1_07') - .15;
  add(darkBg('#1E1650', '#2C2272') + `<g id="happy"><rect x="560" y="140" width="800" height="120" rx="60" fill="#FFD54F"/><text class="lbl" x="960" y="222" text-anchor="middle" font-size="60" fill="#3A2A00">“MUTLULUK HORMONU”</text></g>` +
    `<path id="xx" d="M600,130 L1320,270 M1320,130 L600,270" stroke="#FF3B3B" stroke-width="22" stroke-linecap="round" opacity="0"/>` +
    `<g id="moti" opacity="0"><rect x="560" y="320" width="800" height="120" rx="60" fill="#FF4F92"/><text class="lbl" x="960" y="402" text-anchor="middle" font-size="60" fill="#fff">MOTİVASYON MOLEKÜLÜ</text></g>` +
    `<g id="runner">${person('ru', AHMET, 250, 470, .62)}</g><g id="goal">${star(1500, 760, 70, '#FFE45C', '', 5)}<text class="lbl" x="1500" y="900" text-anchor="middle" font-size="52" fill="#FFE45C">PEŞİNDEN GİT!</text></g>`, S[3]);
  cut(3, t3); sfx('whoosh', t3 - .1, .4);
  const tX = Wt('h1_07', 'değil', 0, .35) - .05; show('#xx', tX); drawPath('#xx', tX, .25); sfx('buzz', tX, .5); shake('#happy', tX, 8, .3);
  pop('#moti', Wt('h1_07', 'motivasyon', 0, .5) - .1, 960, 380); sfx('pop', Wt('h1_07', 'motivasyon', 0, .5), .45);
  face('ru', {e: 'heart', m: 'grin'}, t3);
  const tP = Wt('h1_07', 'peşinden', 0, .8) - .4; walk('ru', tP, 1.4, 900, .14); sfx('steps_run', tP, .35, {dur: 1.4});
  // --- MRI box (fast montage)
  const t4 = T('h1_08') - .15, B4 = [560 - 520 * .62, 560 - 330 * .62, .62];
  add(`<rect width="${W}" height="${H}" fill="#05070F"/>` + gridBg('#05070F', '#3A6FB0') +
    `<g id="mri"><circle cx="1400" cy="470" r="230" fill="#F7FAFF"/><circle cx="1400" cy="470" r="120" fill="#1E2840"/><rect x="1260" y="560" width="520" height="40" rx="18" fill="#DDE6F2"/>` +
    `<g transform="translate(1250,575) rotate(-90) scale(.36)">${char('lm', AHMET)}</g></g>` +
    brainSide('bs', B4[0], B4[1], B4[2], {head: true, skin: '#2B3142', skinD: '#232838', hair: '#2B3142', window: 0, pal: BR_GRAY, marks: .4, eye: false}) +
    `<g id="pic" opacity="0"><rect x="1250" y="120" width="300" height="200" rx="14" fill="#FFD9E6"/><g transform="translate(1320,90) scale(.5)">${char('pm', MERYEM)}</g></g>` +
    `<g id="icons">${[['🍫', 1180, 830], ['⚽', 1400, 830], ['🎲', 1620, 830]].map(([e, x, y], i) => `<g id="ic${i}" opacity="0"><circle cx="${x}" cy="${y}" r="80" fill="#2A1F66"/><text x="${x}" y="${y + 30}" text-anchor="middle" font-size="84">${e}</text></g>`).join('')}</g>`, add(`<g id="sh_mri2" opacity="0"></g>`, root));
  const SM = $('#sh_mri2'); S.forEach(g => tl.set(g, {opacity: 0}, t4)); tl.set(SM, {opacity: 1}, t4);
  sfx('mri_hum', t4, .3, {dur: 3}); face('pm', {e: 'happy', m: 'smile'}, 0);
  const tPh = Wt('h1_08', 'fotoğrafını', 0, .3) - .2; pop('#pic', tPh, 1400, 220); sfx('ding', tPh, .4);
  const tLt = Wt('h1_08', 'parlamış', 0, .4); rglow('bs', 'vta', tLt, 'gY', 70, {pulse: 6}); rglow('bs', 'caud', tLt + .2, 'gY', 80, {pulse: 6}); sfx('sparkle', tLt, .45);
  const tK = Wt('h1_08', 'kalp', 0, .45); add(`<g id="noH" opacity="0">${heart(560, 180, 3, '#FF3B5C')}<path d="M480,120 L640,260 M640,120 L480,260" stroke="#fff" stroke-width="16" stroke-linecap="round"/></g>`, SM); pop('#noH', tK, 560, 190); sfx('buzz', tK, .4);
  [['yemekte', 0], ['golde', 1], ['bağımlılık', 2]].forEach(([w, i]) => { const t = Wt('h1_08', w, 0, .65 + i * .1) - .1; pop('#ic' + i, t, [1180, 1400, 1620][i], 830); sfx('pop', t, .4); });
  wipeOut('#1E1A55', .4);
})();
