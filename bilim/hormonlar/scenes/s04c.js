// S04c — Smell, voice, gaze: smell's direct line to emotion & memory; immune genes; voice and eye contact.
(function () {
  const S = ['q', 'nose', 'genes', 'gaze'].map(n => A(`<g id="sh_${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  fadeIn(.5, '#1E0E36');
  // --- question: nose / ear / eye
  const ico = (id, x, inner, lab, c) => `<g id="${id}" opacity="0"><circle cx="${x}" cy="480" r="150" fill="${c}"/>${inner}<text class="lbl" x="${x}" y="720" text-anchor="middle" font-size="56" fill="#fff">${lab}</text></g>`;
  add(darkBg('#2A1040', '#3A1854') +
    ico('iN', 480, `<path d="M480,380 Q440,480 420,540 Q460,580 520,560 Q540,540 520,520" stroke="#fff" stroke-width="18" fill="none" stroke-linecap="round"/>`, 'KOKU', '#B06BFF') +
    ico('iS', 960, `<path d="M930,400 Q1020,380 1030,470 Q1030,540 970,560 Q950,600 920,580" stroke="#fff" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M1060,420 q30,60 0,120 M1090,390 q50,90 0,180" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/>`, 'SES', '#5B8CFF') +
    ico('iE', 1440, `<path d="M1340,480 Q1440,390 1540,480 Q1440,570 1340,480Z" fill="#fff"/><circle cx="1440" cy="480" r="40" fill="#2A1040"/>`, 'BAKIŞ', '#EC407A'), S[0]);
  cut(0, 0);
  [['kokusu', 'iN', 480], ['sesi', 'iS', 960], ['bakışı', 'iE', 1440]].forEach(([w, id, x]) => { const t = Wt('s4_12', w, 0, .3) - .1; pop('#' + id, t, x, 480); sfx('pop', t, .4); });
  // --- smell: the direct line
  const t1 = T('s4_13') - .1, B = [960 - 520 * .98, 540 - 340 * .98, .98];
  const olf = [B[0] + 790 * B[2], B[1] + 430 * B[2]], nose = [B[0] + 950 * B[2], B[1] + 452 * B[2]];
  add(darkBg('#1E0E36', '#2C1650', 18, .5) + brainSide('br', B[0], B[1], B[2], {head: true, headOp: .4, window: .5, marks: .45}) +
    `<ellipse cx="${olf[0]}" cy="${olf[1]}" rx="40" ry="16" fill="#C59BFF"/>` +
    `<path id="olfP" d="M${nose[0] + 80},${nose[1]} C${nose[0]},${nose[1] - 10} ${olf[0] + 60},${olf[1] + 10} ${olf[0]},${olf[1]} C${olf[0] - 60},${olf[1] - 10} ${brPt(...B, 'amyg')[0] + 30},${brPt(...B, 'amyg')[1]} ${brPt(...B, 'amyg')[0]},${brPt(...B, 'amyg')[1]}" stroke="#C59BFF" stroke-width="10" fill="none" opacity="0"/>` +
    `<path id="othP" d="M${brPt(...B, 'eye')[0]},${brPt(...B, 'eye')[1]} C${brPt(...B, 'eye')[0] - 150},${brPt(...B, 'eye')[1] + 30} ${brPt(...B, 'thal')[0] + 150},${brPt(...B, 'thal')[1]} ${brPt(...B, 'thal')[0]},${brPt(...B, 'thal')[1]}" stroke="#7FD8FF" stroke-width="7" stroke-dasharray="6 14" fill="none" opacity="0"/>` +
    tag('tgOl', olf[0], olf[1], olf[0] + 200, olf[1] + 230, 'koku soğancığı', '#B06BFF', '#fff', 30) +
    tag('tgEm', ...brPt(...B, 'amyg'), brPt(...B, 'amyg')[0] - 430, brPt(...B, 'amyg')[1] + 250, 'duygu + hafıza merkezleri', '#EC407A', '#fff', 30) +
    tag('tgOt', ...brPt(...B, 'thal'), brPt(...B, 'thal')[0] - 160, brPt(...B, 'thal')[1] - 300, 'diğer duyular: önce santrale', '#4FA8FF', '#fff', 28) +
    `<g id="perf" opacity="0"><rect x="1490" y="560" width="120" height="170" rx="30" fill="#C59BFF"/><rect x="1525" y="520" width="50" height="50" rx="10" fill="#8A5ACF"/><circle cx="1550" cy="505" r="22" fill="#FFB3D1"/></g>` +
    `<g id="memo" opacity="0"><rect x="1300" y="140" width="420" height="320" rx="16" fill="#F3E3C8" transform="rotate(-5 1510 300)"/><rect x="1330" y="170" width="360" height="230" fill="#C9A77A" transform="rotate(-5 1510 300)"/><circle cx="1440" cy="280" r="40" fill="#F3E3C8" opacity=".7"/><circle cx="1560" cy="300" r="40" fill="#F3E3C8" opacity=".7"/><text class="txt" x="1510" y="440" text-anchor="middle" font-size="30" fill="#7A5A3A" transform="rotate(-5 1510 300)">yıllar önce…</text></g>` +
    `<g id="olffx"></g>`, S[1]);
  cut(1, t1); sfx('whoosh', t1 - .1, .4);
  show('#olfP', t1 + .2, .1); drawPath('#olfP', t1 + .2, 1.0); flow($('#olffx'), '#olfP', 14, t1 + .3, t1 + 3, {colors: ['#C59BFF', '#FFE1FF'], r: 9, dur: 1, glow: true});
  show('#tgOl', t1 + .6, .3);
  const tEm = Wt('s4_13', 'duygu', 0, .2); rglow('br', 'amyg', tEm, 'gP', 80, {pulse: 4}); show('#tgEm', tEm, .3); sfx('sparkle', tEm, .4);
  const tDo = Wt('s4_13', 'doğrudan', 0, .4); show('#othP', tDo, .2); drawPath('#othP', tDo, .8); show('#tgOt', tDo + .3, .3);
  const tPf = Wt('s4_13', 'parfüm', 0, .7) - .2;
  hide('#tgOl,#tgOt', tPf - .2, .2); pop('#perf', tPf, 1550, 640); sfx('spray', tPf + .2, .5);
  burst(S[1], 16, 1550, 500, 1300, 470, 200, 80, tPf + .2, {colors: ['#E1C4FF', '#FFE1FF'], r: 8, spread: .5});
  pop('#memo', Wt('s4_13', 'yıllar', 0, .85) - .1, 1510, 300); sfx('chime', Wt('s4_13', 'yıllar', 0, .85), .35);
  // --- immune genes: different is attractive
  const t2 = T('s4_14') - .1;
  const helix = (x, c1, c2, id) => { let s = `<g id="${id}">`; for (let i = 0; i < 9; i++) { const y = i * 26, dx = Math.sin(i * .8) * 40; s += `<circle cx="${x + dx}" cy="${40 + y}" r="11" fill="${c1}"/><circle cx="${x - dx}" cy="${40 + y}" r="11" fill="${c2}"/><path d="M${x + dx},${40 + y} L${x - dx},${40 + y}" stroke="#fff" stroke-width="4" opacity=".6"/>`; } return s + `</g>`; };
  add(`<rect width="${W}" height="${H}" fill="#FFEAF3"/>${rays(960, 600, 18, '#FFD6E7', .8)}` + person('a2', AHMET, 330, 220, .85) + person('m2', MERYEM, 1250, 220, .85) +
    helix(500, '#3FA7FF', '#7A5CFF', 'hxA') + helix(1420, '#FF9D2E', '#FF4F92', 'hxM') +
    `<g id="pz"><g id="pzL"><path d="M760,520 h140 v40 a30,30 0 1 1 0,60 v40 h-140Z" fill="#3FA7FF"/></g><g id="pzR"><path d="M1160,520 h-140 v40 a30,30 0 1 0 0,60 v40 h140Z" fill="#FF9D2E" transform="translate(-120,0)"/></g></g>` +
    `<g id="kim" opacity="0"><rect x="660" y="800" width="600" height="110" rx="55" fill="#C2185B"/><text class="lbl" x="960" y="874" text-anchor="middle" font-size="56" fill="#fff">“Kimyamız tuttu!”</text></g>` +
    `<text id="farkli" class="lbl" x="960" y="330" text-anchor="middle" font-size="60" fill="#7A2A5A" opacity="0">farklı bağışıklık genleri</text>`, S[2]);
  cut(2, t2); sfx('whoosh', t2 - .1, .4);
  face('a2', {m: 'smile'}, 0); face('m2', {m: 'smile'}, 0);
  tl.set('#pzL', {x: -300}, 0); tl.set('#pzR', {x: 300}, 0);
  const tGn = Wt('s4_14', 'bağışıklık', 0, .2); tl.fromTo('#hxA,#hxM', {opacity: 0, y: 40}, {opacity: 1, y: 0, duration: .5, immediateRender: false}, tGn);
  tl.to('#hxA,#hxM', {rotation: 6, transformOrigin: '50% 50%', duration: .8, yoyo: true, repeat: 6}, tGn + .5);
  show('#farkli', Wt('s4_14', 'farklı', 0, .35), .3);
  const tPz = Wt('s4_14', 'çekici', 0, .5);
  tl.to('#pzL', {x: 0, duration: .8, ease: 'back.out(1.4)'}, tPz - .4); tl.to('#pzR', {x: 0, duration: .8, ease: 'back.out(1.4)'}, tPz - .4); sfx('click', tPz + .4, .5);
  face('a2', {e: 'heart', blush: 1}, tPz + .4); face('m2', {e: 'happy', blush: 1}, tPz + .4);
  const tKm = Wt('s4_14', 'kimyamız', 0, .75) - .1; pop('#kim', tKm, 960, 855); sfx('pop', tKm, .45);
  // --- voice & eye contact
  const t3 = T('s4_15') - .1;
  add(parkBg() + person('a3', AHMET, 430, 160, .92) + person('m3', MERYEM, 1100, 160, .92) +
    `<g id="sw">${[0, 1, 2, 3].map(i => `<path class="sw" d="M1250,${420} q-30,40 0,80" transform="translate(${-i * 50},0)" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" opacity="0"/>`).join('')}</g>` +
    `<path id="gz" d="M${1100 + 236 * .92 - 160},${160 + 242 * .92} L${430 + 236 * .92},${160 + 242 * .92}" stroke="#FF7FB0" stroke-width="16" stroke-linecap="round" opacity="0" filter="url(#glow)"/><g id="oxfx"></g>`, S[3]);
  cut(3, t3); sfx('whoosh', t3 - .1, .4);
  face('a3', {e: 'dot', m: 'smile'}, 0); face('m3', {e: 'dot', m: 'smile'}, 0);
  const tSe = Wt('s4_15', 'sesi', 0, .15); face('m3', {m: 'o'}, tSe); face('m3', {m: 'smile'}, tSe + .8);
  tl.to('.sw', {opacity: 1, duration: .1, stagger: .12}, tSe); tl.to('.sw', {x: '-=520', opacity: 0, duration: 1.2, stagger: .12, ease: 'power1.in'}, tSe + .1);
  const tGz = Wt('s4_15', 'göz', 0, .5) - .2; show('#gz', tGz, .3); drawPath('#gz', tGz, .5); sfx('chime', tGz, .4);
  face('a3', {e: 'heart', m: 'grin', blush: 1}, tGz + .4); face('m3', {e: 'happy', blush: 1}, tGz + .4);
  burst($('#oxfx'), 22, 780, 380, 780, 300, 260, 140, Wt('s4_15', 'oksitosin', 0, .7) - .2, {colors: ['#FF7FB0', '#FFC2DA'], r: 10, glow: true, spread: 1});
  wipeOut('#3A1446', .5);
})();
