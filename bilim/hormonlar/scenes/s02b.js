// S02b — EXAMPLE: Ahmet sees Meryem. Camera dives: eye -> retina -> optic nerve -> brain -> VTA -> synapse -> dopamine flood -> back out.
(function () {
  const S = ['park', 'eye', 'brain', 'syn'].map(n => A(`<g id="sh_${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  add(`<filter id="fblur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur id="fblurG" stdDeviation="0"/></filter>`, defs);
  wipeIn('#0B0820', .55);

  // ---------- PARK ----------
  const AX = 560, AY = 150, AS = .95, MX = 1180;
  const ahHead = at(AX, AY + 155 * AS, AS, 200, 240), ahEye = at(AX, AY + 155 * AS, AS, 236, 242);
  add(`<rect width="${W}" height="${H}" fill="#F4B08E"/><g id="cam"><g id="bgP" filter="url(#fblur)">${parkBg()}${bench(540, 905)}</g>` +
    `<circle id="mGlow" cx="${MX + 190}" cy="560" r="380" fill="url(#gP)" opacity="0"/>` +
    person('ah', AHMET, AX, AY, AS, {rightHand: phoneProp(286, 600)}) + person('me', MERYEM, MX, AY, AS) +
    `<g id="tunnelV" opacity="0"><path fill="#0B0820" fill-rule="evenodd" d="M-400,-400H2320V1480H-400Z M${MX + 190},560 m-520,0 a520,560 0 1,0 1040,0 a520,560 0 1,0 -1040,0Z" opacity=".55"/></g></g>`, S[0]);
  cut(0, 0); sit('ah', 0); face('ah', {e: 'side', m: 'neutral'}, 0); armSet('ah', 'R', 38, 0); headTilt('ah', 8, 0, .01);
  tl.set('#meW', {x: 900}, 0); walk('me', 0, 2.6, -900);
  face('me', {m: 'smile'}, 0);
  // slow motion: hair floats, ahmet looks up
  const tLook = Wt('s2_05', 'bak', 0, .2);
  headTilt('ah', -4, tLook, .5); face('ah', {e: 'big', m: 'o'}, tLook); armSet('ah', 'R', 0, tLook + .3);
  tl.to('#me-hairBack', {scaleX: 1.06, skewX: 4, svgOrigin: '200 110', duration: 1.4, yoyo: true, repeat: 3, ease: 'sine.inOut'}, tLook);
  sfx('heart_soft', tLook + .2, .7); sfx('heart_soft', tLook + 1.6, .6); sfx('slowmo', tLook, .5);
  const tStorm = Wt('s2_05', 'fırtınanın', 0, .6);
  cam('#cam', tLook + .4, ahHead[0] + 120, ahHead[1] + 40, 1.5, 3.5, 'power1.inOut');
  // dive into the eye
  const tDive = T('s2_06') - 1.35;
  cam('#cam', tDive, ahEye[0], ahEye[1], 22, 1.2, 'power3.in');
  sfx('whoosh_long', tDive, .6);
  flash(T('s2_06') - .15, .9, '#fff', .35);

  // ---------- EYE INTERIOR ----------
  let eye = `<radialGradient id="gEye" cx=".45" cy=".5" r=".7"><stop offset="0" stop-color="#7A1A2E"/><stop offset="1" stop-color="#1A0410"/></radialGradient>` +
    `<rect width="${W}" height="${H}" fill="url(#gEye)"/>` +
    `<path d="M0,0 H260 Q180,540 260,1080 H0Z" fill="#2B5D8A"/><path d="M260,0 Q180,540 260,1080" stroke="#4FA8FF" stroke-width="14" fill="none"/>` +
    `<ellipse cx="430" cy="540" rx="62" ry="180" fill="#BFE6FF" opacity=".7"/>` +
    `<path id="rayA" d="M0,330 L430,420 L1480,560 L430,660 L0,750Z" fill="#FFF3C4" opacity="0"/>` +
    `<path d="M1520,140 Q1660,540 1520,940" stroke="#FF8A5C" stroke-width="60" fill="none" stroke-linecap="round"/>` +
    `<path d="M1520,140 Q1660,540 1520,940" stroke="#FFB38A" stroke-width="18" fill="none" stroke-dasharray="6 18"/>` +
    `<g id="retImg" opacity="0" transform="translate(1585,640) rotate(180) scale(.32)">${char('mi', MERYEM)}</g>` +
    `<path id="optic" d="M1600,560 C1720,560 1800,600 1980,640" stroke="#F3E3C8" stroke-width="70" fill="none" stroke-linecap="round"/>` +
    `<path id="opticC" d="M1600,560 C1720,560 1800,600 1980,640" stroke="none" fill="none"/>`;
  add(eye + tag('tgL', 430, 400, 560, 200, 'göz merceği', '#4FA8FF', '#fff', 30) + tag('tgR', 1560, 300, 1300, 170, 'retina', '#FF8A5C', '#fff', 30) + tag('tgO', 1760, 590, 1640, 860, 'görme siniri', '#E0C9A0', '#3B2C1A', 30) + `<g id="eyefx"></g>`, S[1]);
  const tE = T('s2_06') - .1;
  cut(1, tE); tl.fromTo('#sh_eye', {scale: 1.25, svgOrigin: '960 540'}, {scale: 1, duration: 1.2, ease: 'power2.out', immediateRender: false}, tE);
  show('#rayA', tE + .15, .4); tl.to('#rayA', {opacity: .55, duration: .2}, tE + .55);
  show('#retImg', Wt('s2_06', 'meryem', 0, .1), .3);
  show('#tgL', tE + .4, .25); show('#tgR', tE + .8, .25); show('#tgO', tE + 1.2, .25);
  const tSig = Wt('s2_06', 'sinyal', 0, .2);
  tl.to('#retImg', {opacity: 0, duration: .4}, tSig + .2);
  add(`<g id="retGlow" opacity="0"><path d="M1520,140 Q1660,540 1520,940" stroke="#7FD8FF" stroke-width="40" fill="none" filter="url(#glow)"/></g>`, S[1]);
  show('#retGlow', tSig, .15); tl.to('#retGlow', {opacity: 0, duration: .5}, tSig + .3);
  flow($('#eyefx'), '#opticC', 14, tSig + .1, tSig + 1.1, {colors: ['#7FD8FF', '#FFFFFF'], r: 16, dur: .6, glow: true, ease: 'power2.in'});
  sfx('zap', tSig, .55);

  // ---------- BRAIN ----------
  const B = [960 - 520 * 1.02, 560 - 340 * 1.02, 1.02];
  add(darkBg('#120B33', '#1E1550', 18, .5) + `<g id="camB">${brainSide('br', B[0], B[1], B[2], {head: true, headOp: .4, window: .5, marks: .45})}` +
    `<circle id="flood" cx="${brPt(...B, 'vta')[0]}" cy="${brPt(...B, 'vta')[1]}" r="60" fill="url(#gY)" opacity="0"/></g>`, S[2]);
  const tB = Wt('s2_06', 'beyne', 0, .35) - .25;
  cut(2, tB); flash(tB, .4, '#7FD8FF', .25);
  brPath('br', 'vis', tB, .45, '#7FD8FF'); brFlow('br', 'vis', 10, tB, tB + .8, ['#7FD8FF', '#fff'], {dur: .5});
  rglow('br', 'thal', tB + .2, 'gB', 60); rglow('br', 'vis', tB + .5, 'gB', 90);
  brPath('br', 'v2r', tB + .7, .4, '#7FD8FF'); brFlow('br', 'v2r', 8, tB + .7, tB + 1.2, ['#7FD8FF', '#fff'], {dur: .45});
  add(tag('tgVis', ...brPt(...B, 'vis'), brPt(...B, 'vis')[0] - 40, brPt(...B, 'vis')[1] - 260, 'görme merkezi', '#4FA8FF', '#fff', 30), $('#camB'));
  show('#tgVis', tB + .5, .2);
  const tF = Wt('s2_06', 'ödül', 0, .5);
  hide('#tgVis', tF - .2, .2);
  rglow('br', 'vta', tF, 'gY', 90, {pulse: 6}); rglow('br', 'nacc', tF + .3, 'gY', 90, {pulse: 6});
  burst($('#br-fx'), 30, BR.vta[0], BR.vta[1], BR.vta[0], BR.vta[1], 160, 110, tF, {colors: ['#FFE45C', '#FFFFFF'], r: 7, glow: true, spread: .5});
  sfx('fire', tF, .6);
  add(tag('tgVta', ...brPt(...B, 'vta'), brPt(...B, 'vta')[0] + 260, brPt(...B, 'vta')[1] + 230, 'ödül merkezi ateşlendi!', '#F5B800', '#2A1A00', 32), $('#camB'));
  show('#tgVta', tF + .2, .2);
  const tZ = Wt('s2_06', 'ateşlenir', 0, .6);
  hide('#tgVta', tZ + .3, .2);
  cam('#camB', tZ, ...brPt(...B, 'vta'), 5, 1.0, 'power3.in');

  // ---------- SYNAPSE ----------
  const tS = Wt('s2_06', 'sinir', 0, .75) - .1;
  add(synapse('syn', '#FFE45C') +
    tag('tgPre', 1180, 140, 1540, 120, 'gönderen sinir hücresi', '#8B6BFF', '#fff', 30) +
    tag('tgGap', 1300, 500, 1620, 470, 'sinaps boşluğu', '#3A2F80', '#fff', 30) +
    tag('tgRec', 760, 580, 420, 700, 'reseptörler (kilitler)', '#2E6FD8', '#fff', 30) +
    `<g id="msg1" opacity="0"><rect x="560" y="640" width="800" height="110" rx="55" fill="#FFE45C"/><text class="lbl" x="960" y="716" text-anchor="middle" font-size="62" fill="#2A1A00">BU ÖNEMLİ.</text></g>` +
    `<g id="msg2" opacity="0"><rect x="360" y="770" width="1200" height="110" rx="55" fill="#FF4F92"/><text class="lbl" x="960" y="846" text-anchor="middle" font-size="62" fill="#fff">BUNU YİNE İSTİYORUM!</text></g>`, S[3]);
  cut(3, tS); flash(tS, .5, '#FFE45C', .3); sfx('whoosh', tS - .1, .5);
  tl.fromTo('#sh_syn', {scale: .6, svgOrigin: '960 500'}, {scale: 1, duration: .8, ease: 'power2.out', immediateRender: false}, tS);
  show('#tgPre', tS + .4, .2); show('#tgGap', tS + .7, .2); show('#tgRec', tS + 1.0, .2);
  const tR = Wt('s2_06', 'dopamin', 0, .85) - .55;
  synRelease('syn', tR, '#FFE45C', 60); sfx('release', tR + .4, .6); sfx('sparkle', tR + 1, .45);
  const tM1 = Wt('s2_07', 'önemli', 0, .4) - .1, tM2 = Wt('s2_07', 'bunu', 0, .65) - .1;
  hide('#tgPre,#tgGap,#tgRec', tM1 - .3, .3);
  capsOn = true;
  pop('#msg1', tM1, 960, 695); pop('#msg2', tM2, 960, 825); sfx('pop', tM1, .45); sfx('pop', tM2, .5);

  // ---------- BACK: yellow flood, out to the park ----------
  const tBack = E('s2_07') + .25;
  tl.set('#sh_brain', {opacity: 1}, tBack); tl.set('#sh_syn', {opacity: 0}, tBack); tl.set('#sh_eye,#sh_park', {opacity: 0}, tBack);
  camSet('#camB', tBack, ...brPt(...B, 'vta'), 3);
  cam('#camB', tBack, 960, 540, 1, .8, 'power2.out');
  tl.set('#flood', {opacity: .95}, tBack); tl.to('#flood', {attr: {r: 520}, duration: 1.1, ease: 'power2.out'}, tBack);
  sfx('swell', tBack, .5);
  const tOut = T('s2_08') - .2;
  cut(0, tOut); flash(tOut, .35, '#FFE45C', .3);
  camSet('#cam', tOut, ahHead[0], ahHead[1], 2.2); cam('#cam', tOut, 960, 540, 1, .9, 'power2.out');
  face('ah', {e: 'heart', m: 'grin', blush: 1}, tOut); headTilt('ah', -6, tOut);
  tl.to('#ah-e-heart', {scale: 1.15, svgOrigin: '200 241', duration: .25, yoyo: true, repeat: 20}, tOut + .3);
  face('me', {m: 'smile', e: 'happy'}, tOut);
  const tBl = Wt('s2_08', 'bulanıklaşır', 0, .4) - .4;
  tl.to('#fblurG', {attr: {stdDeviation: 9}, duration: 1.2}, Wt('s2_08', 'daralır', 0, .15)); show('#tunnelV', Wt('s2_08', 'daralır', 0, .15), 1.2);
  show('#mGlow', tBl, .8);
  const tOne = Wt('s2_08', 'tek', 0, .85) - .2;
  cam('#cam', tOne - .6, MX + 190, 520, 1.25, 1.6, 'power1.inOut');
  for (let k = 0; k < 3; k++) sfx('heart_soft', tOne - .6 + k * .9, .5);
  fadeOut(.6, '#0B0820');
})();
