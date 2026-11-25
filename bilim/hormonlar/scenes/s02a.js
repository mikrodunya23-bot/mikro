// S02a — What is dopamine: VTA -> reward centre / prefrontal; not "happiness", "wanting".
(function () {
  const S = [0, 1, 2].map(n => A(`<g id="sh${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  wipeIn('#140F3A', .55);

  // --- 0: dopamine pathway in the brain
  const B = [960 - 520 * 1.05, 560 - 330 * 1.05, 1.05];
  add(darkBg('#140F3A', '#221B5C') + `<g id="cam0">${brainSide('br', B[0], B[1], B[2], {head: true, headOp: .35, window: .35, marks: .45})}</g>` +
    pill('ttl0', 960, 100, 'DOPAMİN', '#F5B800', '#2A1A00', 62), S[0]);
  cut(0, 0); pop('#ttl0', .5, 960, 100);
  const tV = Wt('s2_01', 'derinindeki', 0, .15);
  cam('#cam0', tV - .3, ...brPt(...B, 'vta'), 1.5, 1.2);
  rglow('br', 'vta', tV, 'gY', 70, {pulse: 8}); sfx('sparkle', tV, .4);
  add(`<g id="cam0tags"></g>`, S[0]);
  rtag($('#cam0'), 'tgV', ...B, 'vta', -260, 170, 'VTA: dopamin fabrikası', '#F5B800', '#2A1A00', 30); show('#tgV', tV + .3, .3);
  const tY = Wt('s2_01', 'yolları', 0, .5);
  cam('#cam0', tY - .5, 960, 540, 1, 1.0);
  hide('#tgV', tY - .5, .3);
  brPath('br', 'meso', tY, 1.2, '#FFE45C'); brPath('br', 'meso2', tY + .2, .9, '#FFE45C');
  brFlow('br', 'meso', 16, tY + .4, tY + 4.5, ['#FFE45C', '#FFFFFF'], {dur: 1.2});
  brFlow('br', 'meso2', 8, tY + .6, tY + 4.5, ['#FFE45C'], {dur: .9});
  const tO = Wt('s2_01', 'ödül', 0, .6); rglow('br', 'nacc', tO, 'gY', 80, {pulse: 6});
  rtag(S[0], 'tgN', ...B, 'nacc', 330, 160, 'Ödül merkezi (Nucleus Accumbens)', '#F5B800', '#2A1A00', 30); show('#tgN', tO, .3);
  const tK = Wt('s2_01', 'karar', 0, .8); rglow('br', 'pfc', tK, 'gY', 130, {pulse: 4});
  rtag(S[0], 'tgP', ...B, 'pfc', 120, -230, 'Karar bölgesi (Prefrontal Korteks)', '#F5B800', '#2A1A00', 30); show('#tgP', tK, .3);
  sfx('zap', tY, .3); sfx('ding', tO, .35); sfx('ding', tK, .35, {rate: 1.2});

  // --- 1: "happiness hormone"? no: "wanting"
  const t1 = T('s2_02') - .15;
  add(darkBg('#1E1650', '#2C2272') + `<g transform="translate(960,470)"><g id="dm">${mol('dmi', 'dopa')}</g></g>` +
    `<g id="happy" opacity="0"><rect x="560" y="130" width="800" height="120" rx="60" fill="#FFD54F"/><text class="lbl" x="960" y="212" text-anchor="middle" font-size="62" fill="#3A2A00">“MUTLULUK HORMONU”</text></g>` +
    `<g id="xx" opacity="0"><path d="M600,120 L1320,260 M1320,120 L600,260" stroke="#FF3B3B" stroke-width="22" stroke-linecap="round"/></g>` +
    `<g id="mutlu" opacity="0"><text class="lbl" x="560" y="800" text-anchor="middle" font-size="86" fill="#9C96C8">Mutluyum</text><path d="M330,775 L790,775" stroke="#FF3B3B" stroke-width="14" stroke-linecap="round" id="mutLine"/></g>` +
    `<g id="iste" opacity="0"><text class="lbl" x="1360" y="810" text-anchor="middle" font-size="120" fill="#FFE45C" filter="url(#glow)">İSTİYORUM!</text></g>`, S[1]);
  cut(1, t1); sfx('whoosh', t1 - .1, .45);
  tl.fromTo('#dm', {scale: .3, opacity: 0, svgOrigin: '0 0'}, {scale: 1.2, opacity: 1, duration: .5, ease: 'back.out(2)', immediateRender: false}, t1);
  const tH = Wt('s2_02', 'mutluluk', 0, .3) - .1; pop('#happy', tH, 960, 190); sfx('pop', tH, .4);
  const tX = Wt('s2_02', 'değil', 0, .9) - .1; show('#xx', tX); drawPath('#xx path', tX, .3); sfx('buzz', tX, .5); shake('#happy', tX, 8, .3);
  const tM = Wt('s2_03', 'mutluyum', 0, .2); pop('#mutlu', tM, 560, 770); drawPath('#mutLine', tM + .5, .3); sfx('buzz', tM + .5, .35);
  const tI = Wt('s2_03', 'istiyorum', 0, .7) - .1; pop('#iste', tI, 1360, 770, .2, .5); sfx('title_hit', tI, .6);
  tl.to('#dm', {y: -40, duration: .25, yoyo: true, repeat: 5, ease: 'power1.out'}, tI);

  // --- 2: chasing — "come on, one more!"
  const t2 = T('s2_04') - .15;
  let scroll = ''; for (let i = 0; i < 8; i++) scroll += tree(i * 420, 820, .9 + (i % 3) * .1);
  add(`<rect width="${W}" height="${H}" fill="#9ED8FF"/><g id="scroll">${scroll}${scroll.replace(/translate\((\d+)/g, (m, x) => `translate(${+x + 3360}`)}</g><rect y="900" width="${W}" height="180" fill="#6CC084"/>` +
    person('run', AHMET, 520, 140, .9) + `<g id="goal"><circle cx="1500" cy="420" r="110" fill="url(#gY)"/>${star(1500, 420, 64, '#FFE45C', '', 5)}</g>` +
    `<g transform="translate(910,330) scale(.42)"><g id="dsh">${mol('dshi', 'dopa')}</g></g>` +
    `<g id="psst" opacity="0"><path d="M1000,170 h360 a36,36 0 0 1 36,36 v70 a36,36 0 0 1 -36,36 h-300 l-50,44 l10,-44 h-20 a36,36 0 0 1 -36,-36 v-70 a36,36 0 0 1 36,-36Z" fill="#fff"/><text class="lbl" x="1180" y="262" text-anchor="middle" font-size="46" fill="#7A5A00">“Hadi, bir daha!”</text></g>`, S[2]);
  cut(2, t2); sfx('whoosh', t2 - .1, .45);
  face('run', {e: 'dot', m: 'grin'}, t2); tl.to('#scroll', {x: -3360, duration: 9, ease: 'none'}, t2);
  const step = .18, n = Math.round((DUR - t2) / step);
  tl.to('#run-legL', {rotation: 28, svgOrigin: '171 600', duration: step, repeat: n, yoyo: true}, t2); tl.to('#run-legR', {rotation: -28, svgOrigin: '229 600', duration: step, repeat: n, yoyo: true}, t2);
  tl.to('#run-armL', {rotation: -30, svgOrigin: '114 400', duration: step, repeat: n, yoyo: true}, t2); tl.to('#run-armR', {rotation: 30, svgOrigin: '286 400', duration: step, repeat: n, yoyo: true}, t2);
  tl.to('#runW', {y: -16, duration: step / 2, repeat: n * 2, yoyo: true}, t2);
  tl.to('#goal', {x: 30, duration: .6, yoyo: true, repeat: 8, ease: 'sine.inOut'}, t2);
  const tP = Wt('s2_04', 'hadi', 0, .55) - .1; pop('#psst', tP, 1060, 340); sfx('whisper_fx', tP, .3);
  tl.to('#dsh', {y: -20, duration: .25, yoyo: true, repeat: 9}, t2);
  wipeOut('#0B0820', .5);
})();
