// V6 — Finish line: the long road arrives with "CAT", Ege licks his paw, Yasemin "wasn't scared", adrenaline lingers, cortisol.
(function () {
  const S = ['finish', 'street', 'graph'].map(n => A(`<g id="sh_${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  wipeIn('#0B1440', .4); hudClock('21:15', 0); hudPulse([[0, 168], [T('h2_16'), 150], [DUR, 120]]);
  // finish line card
  add(darkBg('#0E0B2A', '#1A1546', 18, .5) + `<rect x="1300" y="0" width="40" height="${H}" fill="#fff"/>${[...Array(14)].map((_, i) => `<rect x="${1300 + (i % 2) * 20}" y="${i * 80}" width="20" height="40" fill="#111"/>`).join('')}` +
    `<g id="runner"><circle cx="300" cy="560" r="60" fill="#7FD8FF" filter="url(#glow)"/><rect x="380" y="470" width="300" height="180" rx="20" fill="#fff"/><text class="lbl" x="530" y="585" text-anchor="middle" font-size="80" fill="#22357E">KEDİ</text></g>`, S[0]);
  cut(0, 0); tl.fromTo('#runner', {x: -400}, {x: 820, duration: .9, ease: 'power2.out', immediateRender: false}, .1); sfx('ding', .9, .55); sfx('pop', 1.0, .4);
  // street: calm Ege, Yasemin climbs down
  const MX = 480, YX = 820, NY = 160, NS = .92, BINX = 1380, BINY = 960;
  add(`<g id="camN">${nightStreet('ns')}` + `<g transform="translate(${BINX},${BINY})">${binSvg('bin')}</g><g transform="translate(${BINX},${BINY - 250})"><g id="catSW">${catSit('cs')}</g></g>` +
    `<g transform="translate(${BINX + 300},${BINY - 10})">${lidSvg('lid2')}</g>` + person('mi', AHMET, MX, NY, NS) + person('ya', MERYEM, YX, NY, NS) +
    `<g id="miyav" opacity="0"><path d="M${BINX - 60},${BINY - 520} h230 a34,34 0 0 1 34,34 v52 a34,34 0 0 1 -34,34 h-110 l-50,40 l10,-40 h-80 a34,34 0 0 1 -34,-34 v-52 a34,34 0 0 1 34,-34Z" fill="#fff"/><text class="lbl" x="${BINX + 60}" y="${BINY - 460}" text-anchor="middle" font-size="44" fill="#22357E">miyav.</text></g></g>`, S[1]);
  const t1 = T('h2_14') - .3;
  cut(1, t1); sfx('whoosh', t1 - .1, .4);
  tl.set('#yaW', {x: -230, y: -140, rotation: -12, svgOrigin: '200 880'}, 0); armSet('ya', 'L', 150, 0); armSet('ya', 'R', -150, 0); armSet('mi', 'L', 80, 0); armSet('mi', 'R', -80, 0);
  face('ya', {m: 'scream', e: 'big'}, 0); face('mi', {m: 'scream', e: 'big'}, 0);
  tl.to('#cs-paw', {rotation: -130, svgOrigin: '33 -6', duration: .3}, t1 + .2); show('#cs-tongue', t1 + .4); tl.to('#cs', {rotation: -4, svgOrigin: '0 100', duration: .25, repeat: 9, yoyo: true}, t1 + .4);
  pop('#miyav', T('h2_14'), BINX + 40, BINY - 400); sfx('meow', T('h2_14'), .7); hide('#miyav', E('h2_14') + .6, .2);
  face('ya', {m: 'flat', e: 'half'}, E('h2_14')); face('mi', {m: 'flat', e: 'half'}, E('h2_14'));
  // Yasemin climbs down, red: "I wasn't scared"
  const tY = T('h2_15') - .3;
  tl.to('#yaW', {x: 0, y: 0, rotation: 0, duration: .45, ease: 'power2.inOut'}, tY); arm('ya', 'L', 0, tY, .3); arm('ya', 'R', 0, tY, .3); arm('mi', 'L', 0, tY, .3); arm('mi', 'R', 0, tY, .3);
  face('ya', {e: 'side', blush: 1}, tY); talk('ya', 'h2_15', 'o', 'flat'); headTilt('ya', 8, tY);
  face('mi', {e: 'happy', m: 'grin'}, E('h2_15'));
  const tH = Wt('h2_16', 'ellerin', 0, .4) - .2; const hand = at(YX, NY, NS, 200, 600);
  cam('#camN', tH, hand[0], hand[1] - 60, 1.9, .7); tl.to('#ya-armL,#ya-armR', {x: 4, duration: .05, yoyo: true, repeat: 40, ease: 'none'}, tH + .3); face('ya', {sweat: 1, m: 'wavy'}, tH + .3); sfx('tremble', tH + .3, .35, {dur: 2});
  // graph
  const t3 = T('h2_17') - .1, gx = 300, gy = 820, gw = 1320, gh = 560, ax = k => gx + k * gw, ay = v => gy - v * gh;
  let adrP = '', corP = ''; for (let i = 0; i <= 120; i++) { const k = i / 120, a = (k < .05 ? k / .05 : Math.exp(-(k - .05) * 3.2)), c = .62 * (k < .12 ? 0 : (1 - Math.exp(-(k - .12) * 5)) * Math.exp(-(k - .12) * .9)); adrP += (i ? 'L' : 'M') + ax(k).toFixed(1) + ',' + ay(a * .95).toFixed(1); corP += (i ? 'L' : 'M') + ax(k).toFixed(1) + ',' + ay(c).toFixed(1); }
  add(`<rect width="${W}" height="${H}" fill="#120E2E"/><path d="M${gx},${gy - gh - 30} V${gy} H${gx + gw + 30}" stroke="#8C87C0" stroke-width="6" fill="none"/><text class="txt" x="${gx + gw}" y="${gy + 60}" text-anchor="end" font-size="34" fill="#8C87C0">saniyeler → dakikalar</text>` +
    `<path id="gA" d="${adrP}" stroke="#FF3B3B" stroke-width="12" fill="none" stroke-linecap="round"/><path id="gC" d="${corP}" stroke="#FF9D2E" stroke-width="12" fill="none" stroke-linecap="round"/>` +
    `<g id="lA" opacity="0"><rect x="${ax(.08)}" y="${ay(.98) - 30}" width="300" height="70" rx="35" fill="#FF3B3B"/><text class="lbl" x="${ax(.08) + 150}" y="${ay(.98) + 16}" text-anchor="middle" font-size="38" fill="#fff">ADRENALİN</text></g>` +
    `<g id="lC" opacity="0"><rect x="${ax(.42)}" y="${ay(.5) - 120}" width="280" height="70" rx="35" fill="#FF9D2E"/><text class="lbl" x="${ax(.42) + 140}" y="${ay(.5) - 74}" text-anchor="middle" font-size="38" fill="#2A1400">KORTİZOL</text></g>` +
    `<g id="bb" opacity="0">${brainSide('bq', 500 - 520 * .3, 230 - 300 * .3, .3, {head: false, window: 0, marks: 0})}<rect x="620" y="140" width="420" height="90" rx="45" fill="#fff"/><text class="lbl" x="830" y="200" text-anchor="middle" font-size="40" fill="#1A1446">“Yanlış alarm!”</text></g>` +
    `<g id="hb" opacity="0">${heart(1250, 600, 4, '#FF3B5C')}<rect x="1340" y="480" width="380" height="90" rx="45" fill="#fff"/><text class="lbl" x="1530" y="540" text-anchor="middle" font-size="40" fill="#C2185B">“Emin misin?!”</text></g>`, S[2]);
  cut(2, t3); sfx('whoosh', t3 - .1, .4);
  drawPath('#gA', Wt('h2_17', 'adrenin', 0, .05) - .2, 2.4, 'power1.out'); show('#lA', Wt('h2_17', 'adrenin', 0, .05), .2);
  const tCo = Wt('h2_17', 'kortuz', 0, .6) - .3; drawPath('#gC', tCo - .3, 2.2, 'power1.out'); show('#lC', tCo, .2); sfx('ding', tCo, .4);
  const tB = T('h2_18'); tl.to('#gA,#gC,#lA,#lC', {opacity: .2, duration: .3}, tB);
  pop('#bb', Wt('h2_18', 'beyin', 0, .05), 830, 190); sfx('pop', tB, .4);
  pop('#hb', Wt('h2_18', 'vücut', 0, .5), 1400, 520); sfx('pop', Wt('h2_18', 'vücut', 0, .5), .45);
  for (let k = 0; k < 8; k++) tl.to('#hb', {scale: 1.06, svgOrigin: '1250 680', duration: .1, yoyo: true, repeat: 1}, Wt('h2_18', 'vücut', 0, .5) + .2 + k * .32);
  wipeOut('#FF7FB0', .4);
})();
