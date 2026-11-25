// S01 — Is love in the heart or the brain? MRI study, brain commands / heart obeys, three messengers.
(function () {
  const S = [0, 1, 2, 3, 4, 5, 6, 7].map(n => A(`<g id="sh${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));

  // --- 0: valentine collage
  let col = `<rect width="${W}" height="${H}" fill="#FFE3EC"/>${rays(960, 540, 20, '#FFC9DA', .7)}`;
  const items = [];
  for (let i = 0; i < 14; i++) { const x = 160 + (i % 7) * 265 + (i > 6 ? 130 : 0), y = 260 + Math.floor(i / 7) * 330 + (R() - .5) * 60, s = 2.2 + R() * 1.6; items.push([x, y]);
    col += `<g class="vc" id="vc${i}">${i % 3 === 0 ? `<rect x="${x - 70}" y="${y - 52}" width="140" height="104" rx="14" fill="#fff" transform="rotate(${(R() - .5) * 20} ${x} ${y})"/>${heart(x, y - 8, 2, '#FF4F7E')}` : heart(x, y, s, i % 2 ? '#FF4F7E' : '#FF86A8')}${i % 4 === 1 ? `<path d="M${x - 90},${y + 40} L${x + 90},${y - 50}" stroke="#7A4630" stroke-width="9"/><path d="M${x + 90},${y - 50} l-26,0 l14,20Z" fill="#7A4630"/>` : ''}</g>`; }
  const phr = [['Kalbim çarpıyor', 600, 230], ['Kalbim kırıldı', 1320, 470], ['Kalbimi çaldın', 760, 800]];
  phr.forEach(([t, x, y], i) => col += `<g id="ph${i}" opacity="0"><rect x="${x - 250}" y="${y - 58}" width="500" height="96" rx="48" fill="#C2185B"/><text class="lbl" x="${x}" y="${y + 14}" text-anchor="middle" font-size="48" fill="#fff">${t}</text></g>`);
  add(col, S[0]); cut(0, 0); fadeIn(.4);
  tl.fromTo('.vc', {scale: 0, opacity: 0, transformOrigin: '50% 50%'}, {scale: 1, opacity: 1, duration: .35, stagger: .07, ease: 'back.out(2.5)', immediateRender: false}, .2);
  sfx('pop_hearts', .3, .45);
  [['çarpıyor', 0], ['kırıldı', 1], ['çaldın', 2]].forEach(([w, i]) => { const t = Wt('s1_01', w, 0, .5 + i * .15) - .15; pop('#ph' + i, t, phr[i][1], phr[i][2]); sfx('pop', t, .5); });
  tl.to('.vc', {scale: 1.08, transformOrigin: '50% 50%', duration: .3, yoyo: true, repeat: 7, stagger: .05}, 2);

  // --- 1: heart or brain?
  const t1 = T('s1_02') - .2;
  add(darkBg('#1B1446', '#2A1F66') + `<g id="hk">${heart(560, 470, 8, '#FF3B5C', 'filter="url(#glow)"')}<text class="lbl" x="560" y="800" text-anchor="middle" font-size="64" fill="#FF8FA3">KALP?</text></g>` +
    `<text class="lbl" x="960" y="520" text-anchor="middle" font-size="90" fill="#fff" id="vs1" opacity="0">mi</text>` +
    `<g id="bk">${brainSide('br1', 1360 - 520 * .62, 420 - 300 * .62, .62, {head: false, window: 0, marks: 0})}<text class="lbl" x="1360" y="800" text-anchor="middle" font-size="64" fill="#FFB3D1">BEYİN?</text></g>`, S[1]);
  cut(1, t1); sfx('whoosh', t1 - .1, .5);
  tl.fromTo('#hk', {x: -600}, {x: 0, duration: .5, ease: 'back.out(1.4)', immediateRender: false}, t1);
  tl.fromTo('#bk', {x: 600}, {x: 0, duration: .5, ease: 'back.out(1.4)', immediateRender: false}, t1 + .15);
  pop('#vs1', t1 + .5, 960, 500);
  for (let k = 0; k < 4; k++) tl.to('#hk', {scale: 1.06, svgOrigin: '560 560', duration: .12, yoyo: true, repeat: 1}, t1 + .7 + k * .7);

  // --- 2: MRI study
  const t2 = T('s1_03') - .2;
  let mon = `<clipPath id="monClip"><rect x="1400" y="200" width="340" height="220" rx="14"/></clipPath><g clip-path="url(#monClip)"><g id="monPic" opacity="0"><rect x="1400" y="200" width="340" height="220" fill="#FFD9E6"/><g transform="translate(1490,150) scale(.62)">${char('mm', MERYEM)}</g>${heart(1700, 245, 1.4, '#FF4F92')}</g></g>`;
  add(mriRoom() + mon + `<g transform="translate(900,700) rotate(-90) scale(.6)"><g id="lyW">${char('ly', AHMET)}</g></g>` +
    `<circle cx="720" cy="560" r="330" fill="none" stroke="#B9C9DD" stroke-width="16"/><path d="M390,560 A330,330 0 0 1 1050,560" fill="none" stroke="#F7FAFF" stroke-width="60" opacity=".0"/>` +
    `<g id="mriWaves" opacity="0">${[0, 1, 2].map(i => `<circle class="mw" cx="720" cy="560" r="${180 + i * 40}" fill="none" stroke="#7FD8FF" stroke-width="6"/>`).join('')}</g>`, S[2]);
  face('ly', {e: 'dot', m: 'neutral'}, 0); face('mm', {e: 'happy', m: 'smile'}, 0);
  cut(2, t2); sfx('whoosh', t2 - .1, .5);
  const tIn = Wt('s1_03', 'tarayıcısına', 0, .35);
  tl.to('#lyW', {y: -540, duration: 1.8, ease: 'power1.inOut'}, tIn - .3);
  sfx('mri_hum', tIn, .35, {dur: E('s1_03') - tIn + 1.5});
  show('#mriWaves', tIn + 1.2, .3); tl.to('.mw', {scale: 1.25, svgOrigin: '720 560', opacity: 0, duration: 1, stagger: .3, repeat: 3}, tIn + 1.2);
  const tPic = Wt('s1_03', 'fotoğrafı', 0, .8);
  show('#monPic', tPic - .2, .3); sfx('ding', tPic - .2, .35);

  // --- 3: scan lights up
  const t3 = T('s1_04') - .1;
  const B3 = [960 - 520 * 1.0, 560 - 330 * 1.0, 1.0];
  add(`<rect width="${W}" height="${H}" fill="#05070F"/>` + gridBg('#05070F', '#3A6FB0') + brainSide('br3', B3[0], B3[1], B3[2], {head: true, skin: '#2B3142', skinD: '#232838', hair: '#2B3142', window: .0, pal: BR_GRAY, marks: .4, eye: false}) +
    `<text class="txt" x="80" y="110" font-size="34" fill="#7FA9D9" opacity=".8">fMRI · beyin taraması</text>`, S[3]);
  cut(3, t3); flash(t3, .35, '#BFD9FF'); sfx('scan', t3, .5);
  const tLit = Wt('s1_04', 'parlamış', 0, .8) - .25;
  rglow('br3', 'vta', tLit, 'gY', 80, {pulse: 6}); rglow('br3', 'caud', tLit + .25, 'gY', 85, {pulse: 6});
  sfx('sparkle', tLit, .45);
  rtag(S[3], 'tg31', ...B3, 'vta', 260, 240, 'Ventral Tegmental Alan', '#F5B800', '#2A1A00', 36); show('#tg31', tLit + .3, .3);
  rtag(S[3], 'tg32', ...B3, 'caud', 300, -230, 'Kaudat Çekirdek', '#F5B800', '#2A1A00', 36); show('#tg32', tLit + .6, .3);

  // --- 4: reward system: food, success, addiction
  const t4 = T('s1_05') - .1;
  const B4 = [960 - 520 * .8, 560 - 330 * .8, .8];
  const icon = (id, x, y, inner, lab) => `<g id="${id}" opacity="0"><circle cx="${x}" cy="${y}" r="110" fill="#2A1F66"/>${inner}<text class="lbl" x="${x}" y="${y + 160}" text-anchor="middle" font-size="38" fill="#fff">${lab}</text></g>`;
  add(darkBg('#140F3A', '#221B5C') + brainSide('br4', B4[0], B4[1], B4[2], {head: false, window: 0, marks: .4}) +
    pill('ods', 960, 110, 'ÖDÜL SİSTEMİ', '#F5B800', '#2A1A00', 60) +
    icon('ic0', 260, 360, `<circle cx="260" cy="350" r="70" fill="#FF9D7A"/><circle cx="260" cy="350" r="70" fill="none" stroke="#fff" stroke-width="10" stroke-dasharray="20 14"/><rect x="236" y="250" width="48" height="40" rx="10" fill="#FF4F7E"/>`, 'Lezzetli yemek') +
    icon('ic1', 1660, 360, `<path d="M1610,300 h100 v40 q0,60 -50,70 q-50,-10 -50,-70Z" fill="#FFC93C"/><rect x="1645" y="410" width="30" height="30" fill="#FFC93C"/><rect x="1620" y="438" width="80" height="18" rx="6" fill="#FFC93C"/>`, 'Başarı') +
    icon('ic2', 1660, 760, `<rect x="1600" y="735" width="120" height="50" rx="25" fill="#fff"/><rect x="1660" y="735" width="60" height="50" rx="25" fill="#FF5A5A"/>`, 'Bağımlılık') +
    `<path id="ar0" d="M380,380 C560,420 700,480 850,560" stroke="#FFE45C" stroke-width="8" fill="none" stroke-dasharray="18 14" opacity="0"/><path id="ar1" d="M1540,380 C1300,420 1120,480 1000,560" stroke="#FFE45C" stroke-width="8" fill="none" stroke-dasharray="18 14" opacity="0"/><path id="ar2" d="M1540,760 C1300,720 1120,650 1000,600" stroke="#FFE45C" stroke-width="8" fill="none" stroke-dasharray="18 14" opacity="0"/>`, S[4]);
  cut(4, t4); sfx('whoosh', t4 - .1, .45);
  pop('#ods', t4 + .2, 960, 110);
  rglow('br4', 'nacc', t4 + .4, 'gY', 90, {pulse: 12}); rglow('br4', 'vta', t4 + .4, 'gY', 70);
  [['yemek', 0], ['başarı', 1], ['bağımlılık', 2]].forEach(([w, i]) => { const t = Wt('s1_05', w, 0, .4 + i * .18) - .2; pop('#ic' + i, t, i ? 1660 : 260, i === 2 ? 760 : 360); show('#ar' + i, t + .2, .2); drawPath('#ar' + i, t + .2, .5); sfx('pop', t, .45); });

  // --- 5: brain commands, heart obeys
  const t5 = T('s1_06') - .1;
  add(darkBg('#1B1446', '#2A1F66') +
    `<g id="cmdB">${brainSide('br5', 560 - 520 * .6, 520 - 300 * .6, .6, {head: false, window: 0, marks: 0})}<g id="brCap"><path d="M372,420 Q560,300 748,420 L728,446 Q560,360 392,446Z" fill="#2E5E3E"/><rect x="520" y="348" width="80" height="36" rx="10" fill="#FFD54F"/></g></g>` +
    `<g id="cmdBub" opacity="0"><path d="M780,180 h360 a36,36 0 0 1 36,36 v80 a36,36 0 0 1 -36,36 h-280 l-60,50 l12,-50 h-32 a36,36 0 0 1 -36,-36 v-80 a36,36 0 0 1 36,-36Z" fill="#fff"/><text class="lbl" x="960" y="282" text-anchor="middle" font-size="54" fill="#1B1446">HIZLAN!</text></g>` +
    `<g id="sold">${heart(1400, 520, 9, '#FF3B5C')}<path d="M1240,420 Q1400,300 1560,420 L1540,450 Q1400,380 1260,450Z" fill="#2E5E3E"/><circle cx="1350" cy="560" r="12" fill="#3B2C4A"/><circle cx="1450" cy="560" r="12" fill="#3B2C4A"/><path d="M1370,620 Q1400,640 1430,620" stroke="#3B2C4A" stroke-width="8" fill="none" stroke-linecap="round"/>` +
    `<g id="salute"><rect x="1530" y="440" width="34" height="140" rx="17" fill="#FF3B5C" transform="rotate(-40 1547 580)"/></g></g>`, S[5]);
  cut(5, t5); sfx('whoosh', t5 - .1, .45);
  const tEm = Wt('s1_06', 'emri', 0, .2); pop('#cmdBub', tEm, 800, 360); sfx('pop', tEm, .4);
  const tSa = Wt('s1_06', 'asker', 0, .8) - .3;
  tl.fromTo('#salute', {rotation: 0}, {rotation: -55, svgOrigin: '1547 580', duration: .3, ease: 'back.out(3)', immediateRender: false}, tSa); sfx('pop', tSa, .4);
  for (let k = 0; k < 6; k++) tl.to('#sold', {scale: 1.06, svgOrigin: '1400 600', duration: .1, yoyo: true, repeat: 1}, tEm + .4 + k * .45);

  // --- 6: x-ray body: signals to heart, face, stomach
  const t6 = T('s1_07') - .1, bx = 960 - 200 * 1.05, by = 60, bs = 1.05;
  add(gridBg() + bodyX('bx6', bx, by, bs), S[6]);
  const fx6 = $('#bx6-orgfx');
  add(`<path id="nv_h" d="M200,250 L200,420 Q205,440 214,452" fill="none" stroke="#9FE3FF" stroke-width="5" opacity="0"/><path id="nv_f" d="M200,215 Q180,250 150,290" fill="none" stroke="#9FE3FF" stroke-width="5" opacity="0"/><path id="nv_s" d="M200,250 L200,500 Q215,520 236,528" fill="none" stroke="#9FE3FF" stroke-width="5" opacity="0"/>` +
    `<ellipse id="blush6" cx="150" cy="290" rx="26" ry="14" fill="#FF5C8D" opacity="0"/><ellipse id="blush6b" cx="250" cy="290" rx="26" ry="14" fill="#FF5C8D" opacity="0"/>`, fx6);
  cut(6, t6); sfx('whoosh', t6 - .1, .45);
  tl.to('#bx6-brainO', {fill: '#FFD1E4', duration: .2, yoyo: true, repeat: 5}, t6 + .2);
  const tw = [['hızlanması', 'nv_h'], ['kızarması', 'nv_f'], ['kıpırtı', 'nv_s']];
  tw.forEach(([w, p], i) => { const t = Wt('s1_07', w, 0, .2 + i * .25) - .35; show('#' + p, t, .1); drawPath('#' + p, t, .35); flow(fx6, '#' + p, 6, t, t + .6, {colors: ['#9FE3FF', '#FFFFFF'], r: 5, dur: .5, glow: true}); sfx('zap', t, .35); });
  const tH6 = Wt('s1_07', 'hızlanması', 0, .2) + .1;
  tl.to('#bx6-heartO', {scale: 1.35, svgOrigin: '214 455', duration: .14, yoyo: true, repeat: 15}, tH6);
  const tF6 = Wt('s1_07', 'kızarması', 0, .45); show('#blush6,#blush6b', tF6, .3);
  const tS6 = Wt('s1_07', 'kıpırtı', 0, .7); tl.to('#bx6-stomachO', {scaleX: 1.15, scaleY: .88, svgOrigin: '238 528', duration: .12, yoyo: true, repeat: 9}, tS6);
  add(tag('tg6', ...orgPt(bx, by, bs, 'brain'), 1300, 200, 'BEYİN: emir', '#7A5CFF', '#fff', 34), S[6]); show('#tg6', t6 + .3, .3);

  // --- 7: how does the brain send orders? -> three messengers
  const t7 = T('s1_08') - .1;
  const B7 = [960 - 520 * .75, 520 - 300 * .75, .75];
  add(darkBg('#140F3A', '#221B5C') + `<g id="b7">${brainSide('br7', B7[0], B7[1], B7[2], {head: false, window: 0, marks: .3})}</g>` +
    `<text id="qm7" class="lbl" x="1500" y="380" font-size="220" fill="#7A5CFF" opacity="0">?</text>` +
    `<g id="mols" opacity="0"><g transform="translate(420,560)"><g id="mD">${mol('mDi', 'dopa')}</g></g><g transform="translate(960,560)"><g id="mA">${mol('mAi', 'adr')}</g></g><g transform="translate(1500,560)"><g id="mO">${mol('mOi', 'oxy')}</g></g>` +
    `<g id="mlD" opacity="0"><text class="lbl" x="420" y="790" text-anchor="middle" font-size="64" fill="#FFE45C">DOPAMİN</text><text class="txt" x="420" y="850" text-anchor="middle" font-size="40" fill="#fff">“İstiyorum!”</text></g>` +
    `<g id="mlA" opacity="0"><text class="lbl" x="960" y="790" text-anchor="middle" font-size="64" fill="#FF5A5A">ADRENALİN</text><text class="txt" x="960" y="850" text-anchor="middle" font-size="40" fill="#fff">“Hazır ol!”</text></g>` +
    `<g id="mlO" opacity="0"><text class="lbl" x="1500" y="790" text-anchor="middle" font-size="64" fill="#FF8FC2">OKSİTOSİN</text><text class="txt" x="1500" y="850" text-anchor="middle" font-size="40" fill="#fff">“Güvendesin.”</text></g></g>`, S[7]);
  cut(7, t7); sfx('whoosh', t7 - .1, .45);
  pop('#qm7', t7 + .3, 1560, 300);
  tl.to('#qm7', {rotation: 12, svgOrigin: '1560 300', duration: .3, yoyo: true, repeat: 5}, t7 + .7);
  burst(S[7], 26, 960, 480, 960, 480, 520, 300, T('s1_09') + .2, {colors: ['#FFE45C', '#FF5A5A', '#FF8FC2'], r: 9, glow: true, spread: 1.2});
  const tM = E('s1_09') - .6;
  tl.to('#b7', {opacity: 0, duration: .4}, tM - .3); hide('#qm7', tM - .3, .3);
  show('#mols', tM);
  [['D', 0], ['A', 1], ['O', 2]].forEach(([k, i]) => { const t = tM + i * .9, x = [420, 960, 1500][i];
    tl.set('#m' + k, {opacity: 0}, 0);
    tl.fromTo('#m' + k, {opacity: 0, scale: .2, y: 120}, {opacity: 1, scale: 1, y: 0, duration: .5, ease: 'back.out(2)', immediateRender: false}, t);
    show('#ml' + k, t + .2, .3); sfx(['boing', 'zap', 'chime'][i], t, .55); });
  tl.to('#mD', {y: -30, duration: .3, yoyo: true, repeat: 5, ease: 'power1.out'}, tM + .6);
  tl.to('#mA', {x: 8, duration: .05, yoyo: true, repeat: 20}, tM + 1.4);
  tl.to('#mO', {y: -16, rotation: 8, duration: .8, yoyo: true, repeat: 2, ease: 'sine.inOut'}, tM + 2.2);
  wipeOut('#140F3A', .5);
})();
