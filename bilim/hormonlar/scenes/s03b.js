// S03b — EXAMPLE: the cat in the bin. Freeze -> eye -> thalamus fork (long road vs shortcut) -> amygdala alarm
//         -> hypothalamus -> spinal cord -> adrenal glands -> adrenaline in the blood -> organ effects -> fight or flight.
(function () {
  const S = ['street', 'brain', 'body', 'tube'].map(n => A(`<g id="sh_${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  wipeIn('#0B1440', .55);

  // ---------- STREET ----------
  const NX = 640, NY = 160, NS = .92, BINX = 1270, BINY = 960;
  const mEye = at(NX, NY - 90 * NS, NS, 236, 242);
  add(`<g id="camN">${nightStreet('ns')}` + shadow(BINX, BINY + 6, 150, .25) +
    `<g transform="translate(${BINX + 30},${BINY - 160})"><g id="catJW" opacity="0">${catJump('catJ')}</g></g>` +
    `<g transform="translate(${BINX},${BINY})">${binSvg('bin')}</g><g transform="translate(${BINX},${BINY - 262})"><g id="lidW">${lidSvg('lid')}</g></g>` +
    person('me', MERYEM, NX, NY, NS) + `<g transform="translate(${NX + 290 * NS},${NY + 640 * NS})"><g id="bagW">${bagProp(0, 0)}</g></g>` +
    `<g id="excl" opacity="0"><text class="lbl" x="${NX + 20}" y="${NY - 10}" font-size="140" fill="#FFE45C" transform="rotate(-14 ${NX + 20} ${NY})">!</text><text class="lbl" x="${NX + 330}" y="${NY - 30}" font-size="120" fill="#FFE45C" transform="rotate(12 ${NX + 330} ${NY})">!</text></g>` +
    `<rect id="freezeTint" x="-200" y="-200" width="${W + 400}" height="${H + 400}" fill="#3A6FFF" opacity="0"/></g>`, S[0]);
  cut(0, 0);
  tl.set('#meW', {x: -700}, 0); tl.set('#bagW', {x: -700 * NS}, 0);
  walk('me', 0, 2.4, 700, .26, false); tl.to('#bagW', {x: 0, duration: 2.4, ease: 'none'}, 0);
  face('me', {m: 'smile', e: 'dot'}, 0); sfx('night', 0, .35, {dur: T('s3_05') + 1});
  const tTam = Wt('s3_04', 'tam', 0, .6);
  arm('me', 'R', -60, Wt('s3_04', 'kovaya', 0, .3), .5); tl.to('#bagW', {x: 60, y: -150, duration: .5}, Wt('s3_04', 'kovaya', 0, .3));
  tl.to('#lidW', {rotation: 5, y: -6, svgOrigin: '0 0', duration: .07, repeat: 9, yoyo: true}, tTam); sfx('rattle', tTam, .5);
  face('me', {m: 'o'}, tTam + .3);
  // cat burst
  const tCat = T('s3_05') - 1.65;
  tl.to('#lidW', {x: 380, y: -420, rotation: 200, svgOrigin: '0 0', duration: .7, ease: 'power2.out'}, tCat);
  show('#catJW', tCat); tl.fromTo('#catJW', {y: 200, scale: .5, svgOrigin: '0 0'}, {y: -260, x: -170, scale: 1.25, duration: .5, ease: 'back.out(1.6)', immediateRender: false}, tCat);
  flash(tCat + .02, .75); shake('#camN', tCat + .02, 14, .45);
  sfx('cat', tCat, .9); sfx('sting', tCat, .75); sfx('lid_clang', tCat + .05, .6);
  face('me', {m: 'scream', e: 'big', brow: -22}, tCat + .05);
  tl.to('#meW', {y: -90, duration: .25, ease: 'power2.out'}, tCat + .05);
  arm('me', 'L', 150, tCat + .05, .2); arm('me', 'R', -150, tCat + .05, .2);
  tl.to('#bagW', {y: 120, rotation: 30, duration: .4, ease: 'power2.in'}, tCat + .05);
  pop('#excl', tCat + .12, NX + 200, NY);
  // freeze
  const tFz = tCat + .55;
  show('#freezeTint', tFz, .3); tl.to('#freezeTint', {opacity: .28, duration: .3}, tFz);
  sfx('freeze', tFz, .6);
  add(`<g id="fzT" opacity="0"><text class="lbl" x="1700" y="140" text-anchor="end" font-size="44" fill="#BFD4FF" letter-spacing="6">⏸ 0,1 SANİYE</text></g>`, S[0]); show('#fzT', tFz + .2, .3);
  cam('#camN', tFz + .2, mEye[0], mEye[1] - 60, 1.8, D('s3_05') + 1, 'power1.inOut');
  const tDive = T('s3_06') - .95;
  cam('#camN', tDive, mEye[0], mEye[1], 26, .9, 'power3.in'); sfx('whoosh_long', tDive, .55);
  flash(T('s3_06') - .1, .85, '#fff', .3);

  // ---------- BRAIN (Meryem profile) ----------
  const B = [960 - 520 * 1.0, 540 - 340 * 1.0, 1.0];
  add(darkBg('#0E0B2A', '#1A1546', 18, .5) + `<g id="camB">${brainSide('br', B[0], B[1], B[2], {head: true, headOp: .38, window: .5, marks: .45, skin: '#F9C3B8', skinD: '#E89A97', hair: '#F7D27A'})}</g>` +
    `<g id="race" opacity="0"><rect x="360" y="40" width="1200" height="150" rx="30" fill="#14113A" opacity=".9"/>` +
    `<text class="lbl" x="400" y="98" font-size="32" fill="#7FD8FF">UZUN YOL</text><rect x="640" y="72" width="860" height="30" rx="15" fill="#2A2660"/><rect id="rLong" x="640" y="72" width="1" height="30" rx="15" fill="#7FD8FF"/>` +
    `<text class="lbl" x="400" y="160" font-size="32" fill="#FF5A5A">KESTİRME</text><rect x="640" y="134" width="860" height="30" rx="15" fill="#2A2660"/><rect id="rShort" x="640" y="134" width="1" height="30" rx="15" fill="#FF5A5A"/></g>` +
    `<rect id="redTint" width="${W}" height="${H}" fill="#FF1E3C" opacity="0"/>`, S[1]);
  const tB = T('s3_06') - .05;
  cut(1, tB); camSet('#camB', tB, 960, 540, 1.6); cam('#camB', tB, 960, 540, 1, 1, 'power2.out');
  // eye -> thalamus
  const thalP = 'M872,362 C760,384 600,362 500,335';
  add(`<path id="br-p-e2t" d="${thalP}" fill="none" stroke="#7FD8FF" stroke-width="9" stroke-linecap="round" opacity="0"/>`, $('#br-brain'));
  brPath('br', 'e2t', tB + .3, .7, '#7FD8FF'); brFlow('br', 'e2t', 8, tB + .3, tB + 1.3, ['#7FD8FF', '#fff'], {dur: .6});
  const tTh = Wt('s3_06', 'santraline', 0, .4);
  rglow('br', 'thal', tTh, 'gB', 70, {pulse: 4}); sfx('ding', tTh, .4);
  add(tag('tgTh', ...brPt(...B, 'thal'), brPt(...B, 'thal')[0] - 120, brPt(...B, 'thal')[1] - 300, 'TALAMUS · beynin santrali', '#4FA8FF', '#fff', 30), $('#camB')); show('#tgTh', tTh, .3);
  const tFk = Wt('s3_06', 'ikiye', 0, .8);
  add(`<path id="br-p-long" d="M500,335 C400,305 300,322 235,330" fill="none" stroke="#7FD8FF" stroke-width="9" stroke-dasharray="4 16" stroke-linecap="round" opacity="0"/>`, $('#br-brain'));
  brPath('br', 'long', tFk, .5, '#7FD8FF'); brPath('br', 'low', tFk + .1, .4, '#FF5A5A'); sfx('split', tFk, .45);
  hide('#tgTh', tFk + .6, .3);
  // long road
  const tL = T('s3_07') - .05;
  show('#race', tL, .3);
  brFlow('br', 'long', 6, tL + .3, tL + 3.2, ['#7FD8FF', '#fff'], {dur: 2.4, ease: 'none'});
  add(tag('tgLong', ...brPt(...B, 'vis'), brPt(...B, 'vis')[0] + 40, brPt(...B, 'vis')[1] - 200, 'UZUN YOL · görme korteksi: “Bu ne?”', '#4FA8FF', '#fff', 30), $('#camB')); show('#tgLong', tL + .5, .3);
  rglow('br', 'vis', tL + 2.4, 'gB', 90);
  const rl = $('#rLong'), rs = $('#rShort'); const race = {l: 0, s: 0};
  SEEKERS.push(() => { rl.setAttribute('width', Math.max(1, 860 * race.l)); rs.setAttribute('width', Math.max(1, 860 * race.s)); });
  tl.set(race, {l: 0, s: 0}, 0);
  tl.to(race, {l: .35, duration: 5, ease: 'none'}, tL + .3);
  // shortcut
  const tS = T('s3_08') - .05;
  hide('#tgLong', tS, .3);
  brFlow('br', 'low', 12, tS + .4, tS + 1.6, ['#FF5A5A', '#FFD0D0'], {dur: .45, ease: 'power2.in'});
  tl.to(race, {s: 1, duration: 1.1, ease: 'power2.in'}, tS + .4); sfx('zip', tS + .4, .55);
  tl.to(race, {l: .55, duration: 3, ease: 'none'}, tS + 5);
  const tAm = Wt('s3_08', 'amigdalaya', 0, .8) - .1;
  rglow('br', 'amyg', tAm, 'gR', 80, {pulse: 10}); sfx('alarm', tAm, .4, {dur: 2.2});
  add(tag('tgAm', ...brPt(...B, 'amyg'), brPt(...B, 'amyg')[0] + 260, brPt(...B, 'amyg')[1] + 200, 'AMİGDALA · alarm merkezi', '#E53935', '#fff', 32), $('#camB')); show('#tgAm', tAm, .3);
  // amygdala doesn't think
  const tN = T('s3_09') - .05;
  hide('#race', tN, .3); hide('#tgAm', tN + .2, .2);
  cam('#camB', tN, ...brPt(...B, 'amyg'), 2.6, 1.2);
  add(`<g id="noThink"></g>`, S[1]);
  [['düşünmez', 'DÜŞÜNMEZ'], ['sormaz', 'SORMAZ'], ['alarmı', 'ALARM!']].forEach(([w, txt], i) => {
    const t = Wt('s3_09', w, 0, .2 + i * .35) - .05, y = 220 + i * 170 + (i === 2 ? 50 : 0), c = i === 2 ? '#FF3B3B' : '#FFFFFF';
    add(`<text id="nt${i}" class="lbl" x="${i === 2 ? 1500 : 1500}" y="${y}" text-anchor="middle" font-size="${i === 2 ? 110 : 76}" fill="${c}" opacity="0">${txt}</text>`, $('#noThink'));
    pop('#nt' + i, t, 1500, y - 30); sfx(i === 2 ? 'alarm_hit' : 'thud', t, .5);
  });
  const tAl = Wt('s3_09', 'alarmı', 0, .7);
  tl.to('#redTint', {opacity: .25, duration: .15, yoyo: true, repeat: 7}, tAl);
  // -> hypothalamus -> spinal cord
  const tH = T('s3_10') - .1;
  hide('#noThink', tH, .3); cam('#camB', tH, 960, 600, 1.0, .8);
  add(`<path id="br-p-a2h" d="M655,412 C630,400 605,392 585,388" fill="none" stroke="#FF5A5A" stroke-width="9" stroke-linecap="round" opacity="0"/>`, $('#br-brain'));
  brPath('br', 'a2h', tH + .3, .3, '#FF5A5A'); rglow('br', 'hypo', tH + .5, 'gR', 60);
  brPath('br', 'down', tH + .6, 1.0, '#7FD8FF'); brFlow('br', 'down', 14, tH + .6, tH + 2.2, ['#7FD8FF', '#fff'], {dur: .7, ease: 'power2.in'});
  sfx('zap', tH + .6, .55);
  add(tag('tgSp', ...brPt(...B, 'spine'), brPt(...B, 'spine')[0] - 420, brPt(...B, 'spine')[1] - 40, 'omurilik ↓', '#4FA8FF', '#fff', 32), S[1]); show('#tgSp', tH + .9, .3);

  // ---------- BODY: down the spine to the adrenal glands ----------
  const bx = 960 - 200 * 1.0, by = 70, bs = 1.0;
  add(gridBg() + `<g id="camX">${bodyX('bx', bx, by, bs, '#2D6BFF')}</g>` + pill('adrLbl', 960, 110, 'ADRENALİN', '#E53935', '#fff', 62), S[2]);
  const tX = Wt('s3_10', 'iner', 0, .3) - .1;
  cut(2, tX); armSet('bx', 'L', 150, 0); armSet('bx', 'R', -150, 0);
  const fx = $('#bx-orgfx');
  add(`<path id="spineP" d="M200,250 L200,540 Q190,556 168,566" fill="none" stroke="#7FD8FF" stroke-width="6" opacity="0"/><path id="spineP2" d="M200,540 Q210,556 232,566" fill="none" stroke="#7FD8FF" stroke-width="6" opacity="0"/>`, fx);
  show('#spineP,#spineP2', tX, .1); drawPath('#spineP', tX, .9); drawPath('#spineP2', tX + .6, .3);
  flow(fx, '#spineP', 10, tX, tX + .9, {colors: ['#7FD8FF', '#fff'], r: 6, dur: .7, glow: true, ease: 'power2.in'});
  const kp = orgPt(bx, by, bs, 'adrL');
  cam('#camX', tX + .4, (kp[0] + orgPt(bx, by, bs, 'adrR')[0]) / 2, kp[1], 3.2, 1.2);
  const tG = Wt('s3_10', 'böbreküstü', 0, .6);
  add(tag('tgAd', 858, 520, 520, 300, 'böbreküstü bezleri', '#FFB547', '#2A1400', 40), S[2]); show('#tgAd', tG - .9, .3);
  tl.to('#bx-adrLO,#bx-adrRO', {fill: '#FF3B3B', duration: .3}, tG);
  add(`<circle id="gl1" cx="168" cy="566" r="30" fill="url(#gR)" opacity="0"/><circle id="gl2" cx="232" cy="566" r="30" fill="url(#gR)" opacity="0"/>`, fx);
  show('#gl1,#gl2', tG, .3); tl.to('#gl1,#gl2', {scale: 1.6, transformOrigin: '50% 50%', duration: .22, yoyo: true, repeat: 9}, tG + .3);
  const tAd = Wt('s3_10', 'adrenalin', 0, .8) - .1;
  hide('#tgAd', tAd - .3, .2);
  cam('#camX', tAd - .2, 960, 540, 1, 1.0);
  pop('#adrLbl', tAd, 960, 110); sfx('pump', tAd, .6);
  const tg = [[214, 452], [200, 205], [164, 242], [168, 525], [114, 420], [286, 420], [170, 800], [230, 800], [160, 445], [240, 445]];
  for (let i = 0; i < 48; i++) {
    const src = i % 2 ? [168, 566] : [232, 566], d = tg[i % tg.length], t0 = tAd + i * .045;
    const c = add(`<circle cx="${src[0]}" cy="${src[1]}" r="${4 + R() * 3}" fill="${i % 3 ? '#FF3B3B' : '#FFB0B0'}" opacity="0" filter="url(#glow)"/>`, fx);
    tl.set(c, {opacity: 1}, t0); tl.to(c, {attr: {cx: d[0] + (R() - .5) * 30, cy: d[1] + (R() - .5) * 30}, duration: .9, ease: 'power1.inOut'}, t0); tl.to(c, {opacity: 0, duration: .3}, t0 + .9);
  }
  sfx('whoosh', E('s3_10') + .1, .5);

  // ---------- INSIDE THE BLOOD VESSEL: organ effect cards ----------
  const tT = T('s3_11') - .45;
  add(tunnel('tb'), S[3]);
  cut(3, tT); tunnelRun('tb', tT, E('s3_11') + .4, 1.2); sfx('tunnel', tT, .45, {dur: D('s3_11') + .8});
  const card = (id, title, inner, color) => `<g id="${id}" opacity="0"><rect x="480" y="200" width="960" height="620" rx="50" fill="#1A0A20" opacity=".92"/><rect x="480" y="200" width="960" height="620" rx="50" fill="none" stroke="${color}" stroke-width="6"/>${inner}<text class="lbl" x="960" y="780" text-anchor="middle" font-size="${title.length > 18 ? 48 : 58}" fill="${color}" letter-spacing="3">${title}</text></g>`;
  let ecg = 'M0,60'; for (let i = 0; i < 14; i++) { const b = i * 50; ecg += ` L${b + 16},60 L${b + 22},16 L${b + 30},104 L${b + 36},60 L${b + 50},60`; }
  add(card('cH', 'KALP HIZLANIR', `<g id="cHh">${heart(960, 430, 7, '#FF4D6D')}</g><g transform="translate(700,580)"><clipPath id="ecgC"><rect width="520" height="120"/></clipPath><g clip-path="url(#ecgC)"><path id="ecg" d="${ecg}" stroke="#FF8FA3" stroke-width="7" fill="none"/></g></g><text id="bpm" class="lbl" x="1300" y="280" text-anchor="end" font-size="54" fill="#fff">70</text>`, '#FF6B81') +
    card('cL', 'NEFES DERİNLEŞİR', `<g id="lungs"><ellipse cx="880" cy="470" rx="90" ry="170" fill="#8FD6FF"/><ellipse cx="1040" cy="470" rx="90" ry="170" fill="#8FD6FF"/><rect x="950" y="260" width="20" height="120" rx="10" fill="#BFE6FF"/></g>`, '#8FD6FF') +
    card('cE', 'GÖZ BEBEKLERİ BÜYÜR', `<path d="M720,470 Q960,290 1200,470 Q960,650 720,470Z" fill="#fff"/><circle cx="960" cy="470" r="110" fill="#3FA7FF"/><circle id="pup" cx="960" cy="470" r="34" fill="#141433"/><circle cx="925" cy="430" r="16" fill="#fff"/>`, '#7FC4FF') +
    card('cV', 'KARACİĞER ŞEKER BOŞALTIR', `<path d="M760,420 Q900,330 1100,380 Q1180,420 1120,520 Q980,600 820,560 Q740,520 760,420Z" fill="#B5523B"/><g id="sugar">${[0, 1, 2, 3, 4, 5].map(i => `<rect class="sg" x="${900 + i * 30}" y="470" width="34" height="34" rx="6" fill="#fff"/>`).join('')}</g>`, '#E58A6B') +
    card('cM', 'KASLAR YAKITINI ALIR', `<g id="flex"><path d="M780,560 Q760,420 880,380 Q980,350 1010,440 Q1100,420 1120,330 L1180,350 Q1170,480 1040,520 Q980,600 860,600Z" fill="#E9B48C"/><ellipse id="bic" cx="960" cy="440" rx="70" ry="50" fill="#FF6B6B" opacity="0"/></g>${star(1200, 300, 40, '#FFE45C', '', 5)}`, '#FFB36B'), S[3]);
  const seq = [['cH', 'kalp'], ['cL', 'nefes'], ['cE', 'göz'], ['cV', 'karaciğer'], ['cM', 'kaslar']];
  seq.forEach(([id, w], i) => {
    const t = Wt('s3_11', w, 0, i / 5) - .15, tn = i < 4 ? Wt('s3_11', seq[i + 1][1], 0, (i + 1) / 5) - .2 : E('s3_11') + .3;
    pop('#' + id, t, 960, 510, .5, .35); tl.to('#' + id, {opacity: 0, duration: .15}, tn);
    sfx('card', t, .35);
  });
  const tHc = Wt('s3_11', 'kalp', 0, 0);
  tl.to('#cHh', {scale: 1.15, svgOrigin: '960 520', duration: .13, yoyo: true, repeat: 9}, tHc); tl.fromTo('#ecg', {x: 0}, {x: -200, duration: 1.5, ease: 'none', immediateRender: false}, tHc);
  counter('#bpm', tHc, tHc + 1.2, 70, 160, v => v + ' nabız');
  sfx('heart_fast', tHc, .5, {dur: 9});
  const tLu = Wt('s3_11', 'nefes', 0, .2); tl.to('#lungs', {scale: 1.18, svgOrigin: '960 470', duration: .6, yoyo: true, repeat: 1}, tLu); sfx('breath', tLu, .5);
  const tEy = Wt('s3_11', 'göz', 0, .4); tl.fromTo('#pup', {attr: {r: 30}}, {attr: {r: 80}, duration: .6, immediateRender: false}, tEy + .2);
  const tLv = Wt('s3_11', 'karaciğer', 0, .6); tl.to('.sg', {y: 220, x: (i) => (i - 2.5) * 60, opacity: 0, duration: 1, stagger: .1, ease: 'power1.in'}, tLv + .3);
  const tMu = Wt('s3_11', 'kaslar', 0, .85); tl.to('#bic', {opacity: .9, scale: 1.3, svgOrigin: '960 440', duration: .25, yoyo: true, repeat: 3}, tMu + .1); sfx('zap', tMu + .1, .4);

  // ---------- BODY again: digestion waits, blood to the legs ----------
  const tD = T('s3_12') - .15;
  cut(2, tD); hide('#adrLbl', tD); camSet('#camX', tD, 960, 540, 1);
  tl.to('#bx-stomachO', {fill: '#6A6F8A', duration: .4}, tD + .3);
  add(tag('tgSt', ...orgPt(bx, by, bs, 'stomach'), 1400, 480, 'sindirim: beklemede ⏸', '#6A6F8A', '#fff', 30) +
    `<g id="legGlow" opacity="0"><rect x="${bx + 148 * bs}" y="${by + 600 * bs}" width="${46 * bs}" height="${270 * bs}" rx="22" fill="#FF3B3B" opacity=".5" filter="url(#glow)"/><rect x="${bx + 206 * bs}" y="${by + 600 * bs}" width="${46 * bs}" height="${270 * bs}" rx="22" fill="#FF3B3B" opacity=".5" filter="url(#glow)"/></g>`, S[2]);
  show('#tgSt', tD + .4, .3);
  add(`<path id="toLegL" d="M236,528 Q200,600 171,800" fill="none"/><path id="toLegR" d="M236,528 Q230,600 229,800" fill="none"/>`, fx);
  const tLg = Wt('s3_12', 'bacaklara', 0, .7) - .3;
  flow(fx, '#toLegL', 10, tLg - .6, tLg + .6, {colors: ['#FF3B3B'], r: 6, dur: .7, glow: true}); flow(fx, '#toLegR', 10, tLg - .5, tLg + .7, {colors: ['#FF3B3B'], r: 6, dur: .7, glow: true});
  show('#legGlow', tLg, .4);

  // ---------- STREET: fight or flight ----------
  const tF = T('s3_13') - .1;
  cut(0, tF); camSet('#camN', tF, 960, 540, 1); hide('#fzT', tF);
  tl.set('#freezeTint', {opacity: .28}, tF);
  add(`<g id="sv" opacity="0"><text class="lbl" x="420" y="300" text-anchor="middle" font-size="150" fill="#FF3B3B" filter="url(#glow)">SAVAŞ</text></g><g id="ya" opacity="0"><text class="lbl" x="960" y="300" text-anchor="middle" font-size="70" fill="#fff">ya da</text></g><g id="kc" opacity="0"><text class="lbl" x="1500" y="300" text-anchor="middle" font-size="150" fill="#FFE45C" filter="url(#glow)">KAÇ!</text></g>`, S[0]);
  const tSv = Wt('s3_13', 'savaş', 0, .55), tYa = Wt('s3_13', 'ya', 0, .7), tKc = Wt('s3_13', 'kaç', 0, .9);
  pop('#sv', tSv, 420, 260); sfx('title_hit', tSv, .6); pop('#ya', tYa, 960, 280); pop('#kc', tKc, 1500, 260); sfx('title_hit', tKc, .7, {rate: 1.15});
  hide('#freezeTint', tKc + .1, .3);
  tl.to('#meW', {y: 0, duration: .3, ease: 'bounce.out'}, tKc + .2); tl.to('#catJW', {x: 600, y: -100, duration: .6}, tKc + .2);
  wipeOut('#0B0820', .5);
})();
