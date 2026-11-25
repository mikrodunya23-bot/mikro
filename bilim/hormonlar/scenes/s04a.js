// S04a — Oxytocin: made in the hypothalamus, released from the pituitary; the bonding glue; the easiest trigger: touch.
(function () {
  fadeIn(.7, '#05040F');
  const S = [0, 1, 2, 3].map(n => A(`<g id="sh${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  // --- 0: mascot intro (warm)
  add(`<rect width="${W}" height="${H}" fill="#3A1446"/>${rays(960, 520, 18, '#4E1C5E', .7)}<g transform="translate(960,470)"><g id="ox">${mol('oxi', 'oxy')}</g></g>` + pill('oxT', 960, 820, 'OKSİTOSİN', '#EC407A', '#fff', 80), S[0]);
  cut(0, 0); sfx('chime', .5, .5);
  tl.fromTo('#ox', {scale: .2, opacity: 0, svgOrigin: '0 0'}, {scale: 1.4, opacity: 1, duration: .8, ease: 'back.out(1.6)', immediateRender: false}, .4);
  tl.to('#ox', {rotation: 360, svgOrigin: '0 0', duration: 8, ease: 'none'}, 1.2);
  pop('#oxT', Wt('s4_01', 'oksitosin', 0, .6), 960, 800); sfx('title_hit', Wt('s4_01', 'oksitosin', 0, .6), .5);
  // --- 1: where it is made and released
  const t1 = T('s4_02') - .1, B = [960 - 520 * 1.05, 540 - 330 * 1.05, 1.05];
  add(darkBg('#2A1040', '#3A1854', 18, .55) + `<g id="cam1">${brainSide('br', B[0], B[1], B[2], {head: true, headOp: .35, window: .45, marks: .45})}` +
    `<path id="toBlood" d="M${brPt(...B, 'pit')[0]},${brPt(...B, 'pit')[1]} C${brPt(...B, 'pit')[0] + 40},${brPt(...B, 'pit')[1] + 120} ${brPt(...B, 'pit')[0] + 20},${brPt(...B, 'pit')[1] + 260} ${brPt(...B, 'pit')[0] - 30},1100" stroke="#C2185B" stroke-width="26" fill="none" opacity=".0"/></g>`, S[1]);
  cut(1, t1); sfx('whoosh', t1 - .1, .4);
  const tHy = Wt('s4_02', 'derinlerinde', 0, .2); cam('#cam1', tHy - .2, ...brPt(...B, 'hypo'), 2.2, 1.0);
  rglow('br', 'hypo', tHy, 'gP', 60, {pulse: 6});
  add(tag('tgHy', ...brPt(...B, 'hypo'), brPt(...B, 'hypo')[0] - 140, brPt(...B, 'hypo')[1] - 140, 'HİPOTALAMUS', '#EC407A', '#fff', 18), $('#cam1')); show('#tgHy', tHy + .2, .3);
  const tPi = Wt('s4_02', 'hipofiz', 0, .3) - .1;
  brPath('br', 'hp', tPi, .3, '#FF7FB0'); rglow('br', 'pit', tPi + .2, 'gP', 40, {pulse: 4});
  add(tag('tgPi', ...brPt(...B, 'pit'), brPt(...B, 'pit')[0] + 150, brPt(...B, 'pit')[1] + 90, 'HİPOFİZ BEZİ', '#EC407A', '#fff', 18), $('#cam1')); show('#tgPi', tPi + .2, .3);
  const tKa = Wt('s4_02', 'kana', 0, .45);
  cam('#cam1', tKa - .2, 960, 600, 1, .9);
  hide('#tgHy,#tgPi', tKa - .2, .2);
  tl.to('#toBlood', {opacity: .8, duration: .3}, tKa); flow($('#cam1'), '#toBlood', 18, tKa, tKa + 2.4, {colors: ['#FF7FB0', '#FFC2DA'], r: 10, dur: 1, glow: true});
  add(tag('tgKa', 1210, 900, 1500, 900, 'kana', '#C2185B', '#fff', 34), S[1]); show('#tgKa', tKa + .4, .3);
  const tBr = Wt('s4_02', 'doğrudan', 0, .7);
  brPath('br', 'oxyA', tBr, .4, '#FF7FB0'); brPath('br', 'oxyN', tBr + .1, .4, '#FF7FB0');
  brFlow('br', 'oxyA', 6, tBr, tBr + 1.4, ['#FF7FB0'], {dur: .6}); brFlow('br', 'oxyN', 6, tBr + .1, tBr + 1.5, ['#FF7FB0'], {dur: .6});
  add(tag('tgIc', ...brPt(...B, 'nacc'), brPt(...B, 'nacc')[0] + 300, brPt(...B, 'nacc')[1] - 220, 'beynin içinde de çalışır', '#EC407A', '#fff', 30), S[1]); show('#tgIc', tBr + .3, .3);
  sfx('bubbles', tKa, .4); sfx('sparkle', tBr, .35);
  // --- 2: the bonding glue
  const t2 = T('s4_03') - .1;
  const pan = (id, x, inner, lab) => `<g id="${id}" opacity="0"><rect x="${x - 270}" y="300" width="540" height="560" rx="44" fill="#FFF0F6"/>${inner}<text class="lbl" x="${x}" y="820" text-anchor="middle" font-size="44" fill="#C2185B">${lab}</text></g>`;
  const baby = `<g><ellipse cx="0" cy="0" rx="70" ry="52" fill="#FFE0EC"/><circle cx="-32" cy="-6" r="34" fill="#F9C3B8"/><circle cx="-42" cy="-10" r="4" fill="#3B2C4A"/><circle cx="-24" cy="-10" r="4" fill="#3B2C4A"/></g>`;
  add(`<rect width="${W}" height="${H}" fill="#FFD9E8"/>${rays(960, 540, 18, '#FFC9DD', .8)}` +
    `<g id="chips"><g id="c1" opacity="0"><rect x="420" y="90" width="500" height="100" rx="50" fill="#EC407A"/><text class="lbl" x="670" y="157" text-anchor="middle" font-size="50" fill="#fff">sarılma hormonu</text></g>` +
    `<g id="c2" opacity="0"><rect x="1000" y="90" width="500" height="100" rx="50" fill="#AD1457"/><text class="lbl" x="1250" y="157" text-anchor="middle" font-size="50" fill="#fff">bağlanma hormonu</text></g></g>` +
    pan('p1', 400, `<g transform="translate(300,330) scale(.44)">${char('m1', MERYEM)}</g><g transform="translate(450,610)">${baby}</g>`, 'anne · bebek') +
    pan('p2', 960, `<g transform="translate(790,330) scale(.44)">${char('a2', AHMET)}</g><g transform="translate(950,330) scale(.44)">${char('m2', MERYEM)}</g>`, 'arkadaşlar') +
    pan('p3', 1520, `<g transform="translate(1350,330) scale(.44)">${char('a3', AHMET)}</g><g transform="translate(1510,330) scale(.44)">${char('m3', MERYEM)}</g>${heart(1520, 360, 2.2, '#FF4F92')}`, 'sevgililer') +
    `<path id="glue" d="M400,560 C600,480 760,640 960,560 C1160,480 1320,640 1520,560" stroke="#FF4F92" stroke-width="14" fill="none" stroke-dasharray="2 22" stroke-linecap="round" opacity="0"/>`, S[2]);
  cut(2, t2); sfx('whoosh', t2 - .1, .4);
  ['m1', 'a2', 'm2', 'a3', 'm3'].forEach(id => face(id, {e: 'happy', m: 'smile'}, 0));
  face('a3', {blush: 1}, 0); face('m3', {blush: 1}, 0);
  arm('m1', 'R', 40, 0, .01); arm('a2', 'R', -150, 0, .01); arm('m2', 'L', 150, 0, .01);
  pop('#c1', Wt('s4_03', 'sarılma', 0, .1), 670, 140); pop('#c2', Wt('s4_03', 'bağlanma', 0, .25), 1250, 140); sfx('pop', Wt('s4_03', 'sarılma', 0, .1), .4);
  [['anne', 'p1', 400], ['arkadaşları', 'p2', 960], ['sevgilileri', 'p3', 1520]].forEach(([w, id, x]) => { const t = Wt('s4_03', w, 0, .5) - .1; pop('#' + id, t, x, 580); sfx('pop', t, .4); });
  const tG = Wt('s4_03', 'yapıştırıcılardan', 0, .85) - .3; show('#glue', tG, .2); drawPath('#glue', tG, .8); sfx('sparkle', tG, .4);
  // --- 3: the easiest way? touch.
  const t3 = T('s4_04') - .1;
  const handL = `<g id="hL"><path d="M-60,40 L180,40 Q230,40 230,0 Q230,-40 180,-40 L-60,-40Z" fill="#E9B48C"/><rect x="40" y="-62" width="150" height="34" rx="17" fill="#E9B48C"/><rect x="-400" y="-50" width="360" height="100" rx="40" fill="#F3A53A"/></g>`;
  const handR = `<g id="hR"><path d="M60,40 L-180,40 Q-230,40 -230,0 Q-230,-40 -180,-40 L60,-40Z" fill="#F9C3B8"/><rect x="-190" y="-62" width="150" height="34" rx="17" fill="#F9C3B8"/><rect x="40" y="-50" width="360" height="100" rx="40" fill="#F6F3FB"/></g>`;
  add(`<rect width="${W}" height="${H}" fill="#2A1040"/>${rays(960, 540, 18, '#3A1854', .6)}<text id="q3" class="lbl" x="960" y="380" text-anchor="middle" font-size="220" fill="#FF7FB0" opacity="0">?</text>` +
    `<g transform="translate(300,620)"><g id="hLw">${handL}</g></g><g transform="translate(1620,620)"><g id="hRw">${handR}</g></g><circle id="spark" cx="960" cy="610" r="200" fill="url(#gP)" opacity="0"/>` +
    `<text id="dok" class="lbl" x="960" y="900" text-anchor="middle" font-size="110" fill="#fff" opacity="0" letter-spacing="10">DOKUNMAK</text>`, S[3]);
  cut(3, t3); sfx('whoosh', t3 - .1, .4);
  pop('#q3', t3 + .3, 960, 300);
  const tD = T('s4_05') - .5;
  hide('#q3', tD - .3, .3);
  tl.fromTo('#hLw', {x: -400}, {x: 200, duration: 1.1, ease: 'power2.out', immediateRender: false}, tD - .6); tl.fromTo('#hRw', {x: 400}, {x: -200, duration: 1.1, ease: 'power2.out', immediateRender: false}, tD - .6);
  tl.set('#hLw', {x: -400}, 0); tl.set('#hRw', {x: 400}, 0);
  show('#spark', tD + .5, .2); tl.to('#spark', {scale: 1.6, svgOrigin: '960 610', duration: .8, yoyo: true, repeat: 1}, tD + .5);
  pop('#dok', T('s4_05'), 960, 860, .5, .5); sfx('chime', tD + .5, .55);
  burst(S[3], 20, 960, 610, 960, 560, 400, 260, tD + .55, {colors: ['#FF7FB0', '#FFC2DA', '#fff'], r: 9, glow: true, spread: .4});
  wipeOut('#0B1440', .5);
})();
