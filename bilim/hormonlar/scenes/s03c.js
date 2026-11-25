// S03c — The long road arrives: "...just a cat". Hands still shaking: adrenaline lingers, cortisol follows.
(function () {
  const S = ['brain', 'street', 'graph', 'split'].map(n => A(`<g id="sh_${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  wipeIn('#0B0820', .55);
  // --- brain: long road arrives
  const B = [960 - 520 * 1.0, 540 - 340 * 1.0, 1.0];
  add(darkBg('#0E0B2A', '#1A1546', 18, .5) + brainSide('br', B[0], B[1], B[2], {head: true, headOp: .38, window: .5, marks: .45, skin: '#F9C3B8', skinD: '#E89A97', hair: '#F7D27A'}) +
    `<g id="bulb" opacity="0"><circle cx="${brPt(...B, 'vis')[0]}" cy="${brPt(...B, 'vis')[1] - 250}" r="120" fill="url(#gY)"/><circle cx="${brPt(...B, 'vis')[0]}" cy="${brPt(...B, 'vis')[1] - 260}" r="55" fill="#FFE45C"/><rect x="${brPt(...B, 'vis')[0] - 26}" y="${brPt(...B, 'vis')[1] - 212}" width="52" height="34" rx="8" fill="#B9B9C9"/></g>` +
    `<text id="kedi" class="lbl" x="1460" y="300" text-anchor="middle" font-size="120" fill="#fff" opacity="0">…kedi.</text>`, S[0]);
  cut(0, 0);
  add(`<path id="br-p-long" d="M500,335 C400,305 300,322 235,330" fill="none" stroke="#7FD8FF" stroke-width="9" stroke-dasharray="4 16" stroke-linecap="round" opacity="0"/>`, $('#br-brain'));
  brPath('br', 'long', .2, .01, '#7FD8FF');
  brFlow('br', 'long', 8, .4, Wt('s3_14', 'varır', 0, .4), ['#7FD8FF', '#fff'], {dur: 1.4, ease: 'none'});
  const tV = Wt('s3_14', 'varır', 0, .4); rglow('br', 'vis', tV, 'gB', 100, {pulse: 2}); sfx('ding', tV, .45);
  const tK = Wt('s3_14', 'karar', 0, .6); pop('#bulb', tK, brPt(...B, 'vis')[0], brPt(...B, 'vis')[1] - 250); sfx('pop', tK, .45);
  const tC = Wt('s3_14', 'kedi', 0, .9) - .5; pop('#kedi', tC - .4, 1460, 260);
  // --- street: the calm cat
  const NX = 640, NY = 160, NS = .92, BINX = 1270, BINY = 960;
  add(`<g id="camN">${nightStreet('ns')}` + shadow(BINX, BINY + 6, 150, .25) +
    `<g transform="translate(${BINX},${BINY})">${binSvg('bin')}</g><g transform="translate(${BINX},${BINY - 250})"><g id="catSW">${catSit('cs')}</g></g>` +
    `<g transform="translate(${BINX + 300},${BINY - 10})">${lidSvg('lid2')}</g>` + person('me', MERYEM, NX, NY, NS) +
    `<g id="miyav" opacity="0"><path d="M${BINX + 90},${BINY - 520} h230 a34,34 0 0 1 34,34 v52 a34,34 0 0 1 -34,34 h-170 l-50,40 l10,-40 h-20 a34,34 0 0 1 -34,-34 v-52 a34,34 0 0 1 34,-34Z" fill="#fff"/><text class="lbl" x="${BINX + 222}" y="${BINY - 460}" text-anchor="middle" font-size="44" fill="#22357E">miyav~</text></g></g>`, S[1]);
  const t1 = E('s3_14') - .5;
  cut(1, t1); sfx('whoosh', t1 - .1, .4);
  armSet('me', 'L', 150, 0); armSet('me', 'R', -150, 0); face('me', {m: 'scream', e: 'big'}, 0);
  tl.to('#cs-paw', {rotation: -130, svgOrigin: '33 -6', duration: .35}, t1 + .2); show('#cs-tongue', t1 + .5);
  tl.to('#cs', {rotation: -4, svgOrigin: '0 100', duration: .3, repeat: 7, yoyo: true}, t1 + .5);
  pop('#miyav', t1 + .5, BINX + 120, BINY - 400); sfx('meow', t1 + .5, .5); hide('#miyav', t1 + 2.4, .3);
  face('me', {m: 'flat', e: 'half', brow: 6}, t1 + 1.2); arm('me', 'L', 15, t1 + 1.2, .5); arm('me', 'R', -15, t1 + 1.2, .5);
  // shaking hands close-up
  const t2 = T('s3_15') - .1;
  const hand = at(NX, NY, NS, 200, 600);
  cam('#camN', t2, hand[0], hand[1] - 40, 2.0, 1.0);
  tl.to('#me-armL,#me-armR', {x: 4, duration: .05, yoyo: true, repeat: 70, ease: 'none'}, t2 + .4); face('me', {sweat: 1, m: 'wavy'}, t2 + .4);
  sfx('tremble', t2 + .4, .35, {dur: 3});
  // --- graph: adrenaline spike & slow decay, cortisol follows
  const t3 = T('s3_16') - .1, gx = 300, gy = 820, gw = 1320, gh = 560;
  const ax = k => gx + k * gw, ay = v => gy - v * gh;
  let adrP = '', corP = '';
  for (let i = 0; i <= 120; i++) { const k = i / 120, a = (k < .05 ? k / .05 : Math.exp(-(k - .05) * 3.2)), c = .62 * (k < .12 ? 0 : (1 - Math.exp(-(k - .12) * 5)) * Math.exp(-(k - .12) * .9)); adrP += (i ? 'L' : 'M') + ax(k).toFixed(1) + ',' + ay(a * .95).toFixed(1); corP += (i ? 'L' : 'M') + ax(k).toFixed(1) + ',' + ay(c).toFixed(1); }
  add(`<rect width="${W}" height="${H}" fill="#120E2E"/><path d="M${gx},${gy - gh - 30} V${gy} H${gx + gw + 30}" stroke="#8C87C0" stroke-width="6" fill="none"/>` +
    `<text class="txt" x="${gx + gw}" y="${gy + 60}" text-anchor="end" font-size="34" fill="#8C87C0">zaman: saniyeler → dakikalar</text>` +
    `<text class="txt" x="${gx - 20}" y="${gy - gh - 50}" font-size="34" fill="#8C87C0">kandaki seviye</text>` +
    `<path id="gA" d="${adrP}" stroke="#FF3B3B" stroke-width="10" fill="none" stroke-linecap="round"/><path id="gC" d="${corP}" stroke="#FF9D2E" stroke-width="10" fill="none" stroke-linecap="round"/>` +
    `<g id="lA" opacity="0"><rect x="${ax(.08)}" y="${ay(.98) - 30}" width="300" height="70" rx="35" fill="#FF3B3B"/><text class="lbl" x="${ax(.08) + 150}" y="${ay(.98) + 16}" text-anchor="middle" font-size="38" fill="#fff">ADRENALİN</text></g>` +
    `<g id="lC" opacity="0"><rect x="${ax(.42)}" y="${ay(.5) - 120}" width="280" height="70" rx="35" fill="#FF9D2E"/><text class="lbl" x="${ax(.42) + 140}" y="${ay(.5) - 74}" text-anchor="middle" font-size="38" fill="#2A1400">KORTİZOL</text></g>` +
    `<g id="lCalm" opacity="0"><rect x="${ax(.66)}" y="${ay(.22) - 40}" width="420" height="70" rx="35" fill="#3FD4C0"/><text class="lbl" x="${ax(.66) + 210}" y="${ay(.22) + 6}" text-anchor="middle" font-size="34" fill="#0B2A26">sakinleşme: birkaç dakika</text></g>`, S[2]);
  cut(2, t3); sfx('whoosh', t3 - .1, .4);
  drawPath('#gA', Wt('s3_16', 'adrenalin', 0, .1) - .2, 3.0, 'power1.out'); show('#lA', Wt('s3_16', 'adrenalin', 0, .1), .3);
  const tCo = Wt('s3_16', 'kortizol', 0, .6) - .3; drawPath('#gC', tCo - .4, 2.6, 'power1.out'); show('#lC', tCo, .3); sfx('ding', tCo, .35);
  const tCa = Wt('s3_16', 'sakinleşmesi', 0, .8); show('#lCalm', tCa, .3);
  // --- split: brain says "false alarm", body doesn't believe it
  const t4 = T('s3_17') - .1;
  add(darkBg('#1A1446', '#28206A') + `<g>${brainSide('br4', 520 - 520 * .55, 520 - 300 * .55, .55, {head: false, window: 0, marks: 0})}</g>` +
    `<g id="b4b" opacity="0"><path d="M300,180 h420 a36,36 0 0 1 36,36 v70 a36,36 0 0 1 -36,36 h-300 l-50,44 l10,-44 h-80 a36,36 0 0 1 -36,-36 v-70 a36,36 0 0 1 36,-36Z" fill="#fff"/><text class="lbl" x="510" y="270" text-anchor="middle" font-size="46" fill="#1A1446">“Yanlış alarm!”</text></g>` +
    `<g id="hb4">${heart(1400, 470, 8, '#FF3B5C', 'filter="url(#glow)"')}</g>` +
    `<g id="h4b" opacity="0"><path d="M1200,180 h420 a36,36 0 0 1 36,36 v70 a36,36 0 0 1 -36,36 h-80 l10,44 l-50,-44 h-300 a36,36 0 0 1 -36,-36 v-70 a36,36 0 0 1 36,-36Z" fill="#fff"/><text class="lbl" x="1410" y="270" text-anchor="middle" font-size="46" fill="#C2185B">“Emin misin?!”</text></g>`, S[3]);
  cut(3, t4); sfx('whoosh', t4 - .1, .4);
  pop('#b4b', Wt('s3_17', 'yanlış', 0, .2), 510, 300);
  for (let k = 0; k < 14; k++) tl.to('#hb4', {scale: 1.12, svgOrigin: '1400 560', duration: .1, yoyo: true, repeat: 1}, t4 + .2 + k * .38);
  pop('#h4b', Wt('s3_17', 'inanmaz', 0, .8) - .4, 1410, 300); sfx('heart_fast', t4, .35, {dur: D('s3_17') + .5});
  wipeOut('#2A1F66', .5);
})();
