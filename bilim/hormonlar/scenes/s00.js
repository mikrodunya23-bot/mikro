// S00 — Hook: rapid questions, heart -> brain with three lights, title.
(function () {
  const sh = n => A(`<g id="sh${n}" opacity="0"></g>`);
  const S = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(sh);
  const cut = (n, t) => { S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t)); };
  const title = (parent, id, text, color, t, y = 120, fs = 76) => {
    const w = text.length * fs * .64 + 90;
    add(`<g id="${id}" opacity="0"><rect x="${960 - w / 2}" y="${y - fs * .9}" width="${w}" height="${fs * 1.5}" rx="${fs * .4}" fill="${color}"/><text class="lbl" x="960" y="${y + fs * .25}" text-anchor="middle" font-size="${fs}" fill="#fff" letter-spacing="3">${text}</text></g>`, parent);
    pop('#' + id, t, 960, y, .4, .35);
  };

  // --- shot 0: beating heart in the dark
  add(`<rect width="${W}" height="${H}" fill="#0B0820"/><g id="h0">${heart(960, 520, 7, '#FF3B5C')}</g><circle id="h0g" cx="960" cy="560" r="300" fill="url(#gR)" opacity=".0"/>`, S[0]);
  cut(0, 0);
  for (let k = 0; k < 6; k++) { const t = .2 + k * .85; tl.to('#h0', {scale: 1.12, svgOrigin: '960 560', duration: .12, yoyo: true, repeat: 1}, t); tl.to('#h0g', {opacity: .5, duration: .12, yoyo: true, repeat: 1}, t); sfx('heart_soft', t, .6); }

  // --- shot 1: two people, one heart
  const t1 = T('s0_02') - .15;
  add(darkBg('#24164F', '#33226E') + `<circle id="m1glow" cx="420" cy="520" r="360" fill="url(#gP)" opacity="0"/>` +
    person('m1', MERYEM, 230, 170, .88) + person('a1', AHMET, 760, 170, .88) + person('g1', GHOST, 1290, 170, .88) +
    `<g id="dots1" opacity="0"><path d="M1060,250 h150 a30,30 0 0 1 30,30 v40 a30,30 0 0 1 -30,30 h-110 l-30,30 l6,-30 h-16 a30,30 0 0 1 -30,-30 v-40 a30,30 0 0 1 30,-30Z" fill="#fff"/><text class="lbl" x="1135" y="318" text-anchor="middle" font-size="60" fill="#33226E">…</text></g>` +
    `<g id="hearts1"></g>`, S[1]);
  cut(1, t1); sfx('whoosh', t1 - .1, .5);
  title(S[1], 'q1', 'NEDEN O?', '#FF4F92', t1 + .2);
  face('a1', {e: 'dot', m: 'neutral'}, 0); face('g1', {m: 'neutral'}, 0);
  const tA = Wt('s0_02', 'âşık', 0, .3);
  show('#m1glow', tA, .4); face('a1', {e: 'heart', m: 'grin', blush: 1}, tA); headTilt('a1', -6, tA); face('m1', {m: 'smile', e: 'happy'}, tA);
  burst(S[1].querySelector('#hearts1'), 10, 600, 380, 520, 300, 220, 120, tA, {colors: ['#FF5C9A', '#FFB3D1'], r: 10});
  sfx('sparkle', tA, .4);
  const tB = Wt('s0_02', 'başka', 0, .65);
  headTilt('a1', 6, tB); face('a1', {e: 'half', m: 'flat', blush: 0}, tB); pop('#dots1', tB + .1, 1110, 330);
  tl.to('#g1W', {opacity: .55, duration: .4}, tB);

  // --- shot 2: can't forget
  const t2 = T('s0_03') - .12;
  let orbit = `<clipPath id="chead"><rect x="80" y="86" width="240" height="268" rx="110"/></clipPath>`;
  for (let i = 0; i < 6; i++) orbit += `<g class="mini" transform="translate(${960 + Math.cos(i / 6 * Math.PI * 2) * 330 - 200 * .42},${380 + Math.sin(i / 6 * Math.PI * 2) * 200 - 220 * .42}) scale(.42)"><g clip-path="url(#chead)">${char('mh' + i, MERYEM)}</g></g>`;
  add(darkBg('#1E1A55', '#2C2675') + person('a2', AHMET, 770, 200, .95) + `<g id="orbit">${orbit}</g>`, S[2]);
  cut(2, t2); sfx('whoosh', t2 - .1, .5);
  title(S[2], 'q2', 'NEDEN UNUTAMIYORUZ?', '#7A5CFF', t2 + .2);
  face('a2', {e: 'happy', m: 'smile', blush: 1}, t2);
  for (let i = 0; i < 6; i++) face('mh' + i, {e: 'happy', m: 'smile'}, 0);
  tl.fromTo('.mini', {opacity: 0}, {opacity: 1, duration: .3, stagger: .12, immediateRender: false}, t2 + .2);
  tl.to('#orbit', {rotation: 40, svgOrigin: '960 380', duration: D('s0_03') + 1, ease: 'none'}, t2);

  // --- shot 3: breakup pain
  const t3 = T('s0_04') - .12;
  add(rainBench('rn3') + person('a3', AHMET, 790, 175, .9) +
    `<g id="ch3" transform="translate(0,190) scale(1)"><path id="chL" d="M970,560 C960,530 920,530 920,566 C920,600 950,616 970,640 L978,600 L962,585 L976,570Z" fill="#FF3B5C" filter="url(#glow)"/><path id="chR" d="M970,560 C980,530 1020,530 1020,566 C1020,600 990,616 970,640 L978,600 L962,585 L976,570Z" fill="#FF3B5C" filter="url(#glow)"/></g>`, S[3]);
  sit('a3', 0); face('a3', {e: 'sad', m: 'sad'}, 0); rainRun('rn3', t3, T('s0_05'));
  tl.set('#ch3', {opacity: 0}, 0);
  cut(3, t3); sfx('whoosh', t3 - .1, .5); sfx('rain', t3, .35, {dur: D('s0_04') + .4});
  title(S[3], 'q3', 'AYRILIK NEDEN ACITIR?', '#5A6FB0', t3 + .2);
  show('#ch3', t3 + .4, .3);
  const tk = Wt('s0_04', 'kırılmış', 0, .5);
  tl.to('#chL', {x: -22, rotation: -14, svgOrigin: '970 640', duration: .25, ease: 'power3.out'}, tk); tl.to('#chR', {x: 22, rotation: 14, svgOrigin: '970 640', duration: .25, ease: 'power3.out'}, tk);
  flash(tk, .25, '#FF3B5C'); sfx('crack', tk, .7); face('a3', {tears: 1}, tk);

  // --- shot 4: smell, voice, gaze
  const t4 = T('s0_05') - .12;
  add(parkBg() + person('a4', AHMET, 330, 160, .92) + person('m4', MERYEM, 1180, 160, .92) +
    `<path id="scent" d="M1350,420 C1200,320 1100,520 950,420 C820,340 720,470 560,400" stroke="#C59BFF" stroke-width="22" fill="none" stroke-linecap="round" opacity=".85"/>` +
    `<g id="waves4">${[0, 1, 2].map(i => `<path class="wv" d="M1300,${440} q-30,40 0,80" transform="translate(${-i * 40},0)" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" opacity="0"/>`).join('')}</g>` +
    `<path id="gaze" d="M1335,383 L515,383" stroke="#FF7FB0" stroke-width="10" stroke-dasharray="26 18" fill="none" opacity="0"/>`, S[4]);
  cut(4, t4); sfx('whoosh', t4 - .1, .5);
  title(S[4], 'q4', 'KOKU · SES · BAKIŞ', '#B06BFF', t4 + .2);
  face('m4', {m: 'smile'}, 0);
  const tK = Wt('s0_05', 'kokusu', 0, .2), tS = Wt('s0_05', 'sesi', 0, .45), tG = Wt('s0_05', 'bakışı', 0, .7);
  drawPath('#scent', tK, .9); face('a4', {e: 'happy', m: 'smile'}, tK + .6); sfx('sparkle', tK, .35);
  tl.to('.wv', {opacity: 1, duration: .1, stagger: .12}, tS); tl.to('.wv', {x: '-=480', opacity: 0, duration: 1, stagger: .12, ease: 'power1.in'}, tS + .1); face('m4', {m: 'o'}, tS); face('m4', {m: 'smile'}, tS + .6);
  show('#gaze', tG, .2); drawPath('#gaze', tG, .45); face('a4', {e: 'heart', m: 'grin', blush: 1}, tG + .3); face('m4', {e: 'happy', blush: 1}, tG + .3);

  // --- shot 5: horror movie
  const t5 = T('s0_06') - .12;
  add(cinema() + `<g id="monster" opacity="0"><path d="M820,430 L840,180 Q960,60 1080,180 L1100,430Z" fill="#1A1030"/><circle cx="920" cy="220" r="18" fill="#FF2E4D"/><circle cx="1000" cy="220" r="18" fill="#FF2E4D"/><path d="M900,300 L920,280 L940,300 L960,280 L980,300 L1000,280 L1020,300" stroke="#fff" stroke-width="8" fill="none"/></g>` +
    person('a5', AHMET, 560, 300, .9) + person('m5', MERYEM, 1000, 300, .9) +
    `<rect x="300" y="830" width="1320" height="260" rx="60" fill="#3A0F2E"/>${[0, 1, 2, 3].map(i => `<rect x="${300 + i * 335}" y="800" width="310" height="120" rx="50" fill="#4A1438"/>`).join('')}` +
    `<g id="hearts5"></g>`, S[5]);
  cut(5, t5); sfx('whoosh', t5 - .1, .5);
  title(S[5], 'q5', 'KORKU FİLMİ = BAĞ?', '#C2185B', t5 + .2);
  face('a5', {e: 'dot', m: 'neutral'}, 0); face('m5', {e: 'dot', m: 'neutral'}, 0);
  tl.to('#cinScreen', {fill: '#6E7FAF', duration: .3}, t5);
  const tH = Wt('s0_06', 'korku', 0, .25);
  show('#monster', tH); tl.set('#cinScreen', {fill: '#FFFFFF'}, tH); tl.to('#cinScreen', {fill: '#8E1E3A', duration: .4}, tH + .05); flash(tH, .6);
  sfx('sting', tH, .7); face('a5', {e: 'big', m: 'scream'}, tH); face('m5', {e: 'big', m: 'scream'}, tH);
  arm('m5', 'L', 60, tH, .2); tl.to('#m5W', {x: -90, duration: .25}, tH); tl.to('#a5W', {x: 40, duration: .25}, tH); shake('#sh5', tH, 10, .4);
  const tBg = Wt('s0_06', 'bağlanırsın', 0, .8);
  face('a5', {e: 'happy', m: 'smile', blush: 1}, tBg); face('m5', {e: 'happy', m: 'smile', blush: 1}, tBg);
  burst(S[5].querySelector('#hearts5'), 12, 920, 380, 920, 280, 200, 120, tBg, {colors: ['#FF5C9A', '#FFB3D1'], r: 10});

  // --- shot 6: which is more interesting?
  const t6 = T('s0_07') - .25;
  const cards = [['NEDEN O?', '#FF4F92'], ['UNUTAMAMAK', '#7A5CFF'], ['AYRILIK', '#5A6FB0'], ['KOKU · SES', '#B06BFF'], ['KORKU = BAĞ?', '#C2185B']];
  let cs = darkBg('#120E33', '#1E1850', 18, .6);
  cards.forEach(([txt, c], i) => { const x = 230 + i * 365, y = 600; cs += `<g class="qc" id="qc${i}"><rect x="${x - 160}" y="${y - 70}" width="320" height="140" rx="30" fill="${c}"/><text class="lbl" x="${x}" y="${y + 14}" text-anchor="middle" font-size="38" fill="#fff">${txt}</text></g>`; });
  cs += `<g id="cmt"><path d="M900,170 h120 a40,40 0 0 1 40,40 v60 a40,40 0 0 1 -40,40 h-60 l-40,36 l6,-36 h-26 a40,40 0 0 1 -40,-40 v-60 a40,40 0 0 1 40,-40Z" fill="#fff"/><circle cx="925" cy="240" r="9" fill="#120E33"/><circle cx="960" cy="240" r="9" fill="#120E33"/><circle cx="995" cy="240" r="9" fill="#120E33"/></g>`;
  add(cs, S[6]);
  cut(6, t6); sfx('whoosh', t6 - .1, .4);
  tl.fromTo('.qc', {y: 80, opacity: 0}, {y: 0, opacity: 1, duration: .35, stagger: .08, ease: 'back.out(2)', immediateRender: false}, t6);
  pop('#cmt', T('s0_07') + .1, 960, 260);
  tl.to('#cmt', {scale: 1.08, svgOrigin: '960 260', duration: .3, yoyo: true, repeat: 5}, T('s0_07') + .6);
  textCard(S[6], 'tc6', ['Sence hangisi daha ilginç?'], 960, 450, 64, '#fff', T('s0_07') + .1, .07);

  // --- shot 7: heart -> brain with three lights; title
  const t7 = T('s0_08') - .1;
  add(darkBg('#140F3A', '#221B5C', 18, .55) + `<g id="h7">${heart(960, 470, 9, '#FF3B5C', 'filter="url(#glow)"')}</g>` +
    `<g id="br7wrap" opacity="0">${brainSide('br7', 960 - 520 * .95, 540 - 330 * .95 - 40, .95, {head: false, window: 0, marks: .35})}</g>` +
    `<g id="ttl" opacity="0"><text class="lbl" x="960" y="900" text-anchor="middle" font-size="96" fill="#fff" letter-spacing="6">AŞK · KORKU · HEYECAN</text>` +
    `<text class="txt" x="960" y="975" text-anchor="middle" font-size="44" letter-spacing="4"><tspan fill="#FFE45C">dopamin</tspan><tspan fill="#9a95c8"> · </tspan><tspan fill="#FF5A5A">adrenalin</tspan><tspan fill="#9a95c8"> · </tspan><tspan fill="#FF8FC2">oksitosin</tspan></text></g>`, S[7]);
  cut(7, t7); sfx('whoosh', t7 - .1, .5);
  tl.fromTo('#h7', {scale: .3, svgOrigin: '960 560'}, {scale: 1, duration: .6, ease: 'back.out(1.8)', immediateRender: false}, t7);
  for (let k = 0; k < 4; k++) tl.to('#h7', {scale: 1.08, svgOrigin: '960 560', duration: .12, yoyo: true, repeat: 1}, t7 + .8 + k * .8);
  const tM = T('s0_09') + .2;
  tl.to('#h7', {scale: 0, opacity: 0, svgOrigin: '960 560', duration: .5, ease: 'back.in(2)'}, tM);
  show('#br7wrap', tM + .3); tl.fromTo('#br7wrap', {scale: .4, svgOrigin: '960 500'}, {scale: 1, duration: .6, ease: 'back.out(1.6)', immediateRender: false}, tM + .3);
  sfx('whoosh', tM + .25, .5);
  const tU = Wt('s0_09', 'üç', 0, .7);
  const B7 = [960 - 520 * .95, 540 - 330 * .95 - 40, .95];
  [['nacc', 'gY', 'dopamin', '#E0A800', '#2A1A00', 300, -170], ['amyg', 'gR', 'adrenalin', '#E53935', '#fff', 330, 90], ['hypo', 'gP', 'oksitosin', '#EC407A', '#fff', -380, 200]].forEach(([r, g, txt, c, fg, dx, dy], i) => {
    rglow('br7', r, tU + i * .35, g, 85, {pulse: 3}); sfx('ding', tU + i * .35, .45, {rate: 1 + i * .12});
    rtag($('#br7wrap'), 'tg7' + i, B7[0], B7[1], B7[2], r, dx, dy, txt, c, fg, 36); show('#tg7' + i, tU + i * .35 + .1, .25);
  });
  const tT = E('s0_09') + .2;
  tl.to('#br7wrap', {y: -90, scale: .8, svgOrigin: '960 400', duration: .6}, tT - .2); hide('#tg70,#tg71,#tg72', tT - .2, .3);
  show('#ttl', tT); tl.fromTo('#ttl', {scale: .7, svgOrigin: '960 920'}, {scale: 1, duration: .5, ease: 'back.out(2)', immediateRender: false}, tT);
  sfx('title_hit', tT, .8);
  fadeIn(.6); wipeOut('#140F3A', .5);
})();
