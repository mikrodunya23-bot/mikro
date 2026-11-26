// V0 — Cold open (≈20 s): Miraç, three heart attacks in three flashes, Ege interrupts, "the culprit is here", title.
(function () {
  const S = ['intro', 'f1', 'f2', 'f3', 'cat', 'xray'].map(n => A(`<g id="sh_${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  fadeIn(.3);
  // intro: Miraç waves, name tag
  add(darkBg('#2A1F66', '#3A2C88', 18, .6) + person('mi', AHMET, 760, 150, .95) +
    `<g id="tagM" opacity="0"><rect x="1150" y="260" width="360" height="110" rx="55" fill="#FFE45C"/><text class="lbl" x="1330" y="336" text-anchor="middle" font-size="64" fill="#2A1A00">MİRAÇ</text><path d="M1150,315 L1010,330" stroke="#FFE45C" stroke-width="10" stroke-linecap="round"/></g>` +
    `<g id="hx3" opacity="0"><text class="lbl" x="1330" y="500" text-anchor="middle" font-size="90" fill="#FF4F92" letter-spacing="10">3 KRİZ!</text></g>`, S[0]);
  cut(0, 0); face('mi', {e: 'dot', m: 'grin'}, 0);
  arm('mi', 'R', -150, .3, .3); tl.to('#mi-armR', {rotation: -125, svgOrigin: '286 400', duration: .2, yoyo: true, repeat: 5}, .6);
  pop('#tagM', .5, 1330, 315); sfx('pop', .5, .5);
  const tU = Wt('h0_01', 'üç', 0, .7); pop("#hx3", tU, 1330, 470); sfx('title_hit', tU, .45);
  hudPulse([[0, 72], [T('h0_02'), 72], [Wt('h0_02', 'aşktan', 0, .15) + .3, 130], [Wt('h0_02', 'korkudan', 0, .5), 132], [Wt('h0_02', 'korkudan', 0, .5) + .3, 165], [Wt('h0_02', 'de', 1, .9), 160], [Wt('h0_02', 'de', 1, .9) + 1, 70]]);
  // flash 1: love — heart jumps out of the chest
  const tA = Wt('h0_02', 'aşktan', 0, .15) - .15;
  add(parkBg() + person('a1', AHMET, 420, 150, .95) + person('y1', MERYEM, 1150, 150, .95) +
    `<g id="pop1"><g transform="translate(${420 + 200 * .95},${150 + 470 * .95})"><g id="ht1">${heart(0, 0, 4.2, '#FF3B5C', 'filter="url(#glow)"')}</g></g></g>`, S[1]);
  cut(1, tA); flash(tA, .4); sfx('whoosh', tA - .05, .5);
  face('a1', {e: 'heart', m: 'grin', blush: 1}, tA); face('y1', {e: 'happy', m: 'smile'}, tA);
  tl.fromTo('#ht1', {x: 0, scale: .6}, {x: 120, scale: 1.6, duration: .18, yoyo: true, repeat: 3, ease: 'power2.out', immediateRender: false}, tA + .1);
  sfx('heart_soft', tA + .1, .7); sfx('boing', tA + .15, .5);
  // flash 2: fear — cat, scream, grab
  const tF = Wt('h0_02', 'korkudan', 0, .5) - .15;
  add(nightStreet('n2') + `<g transform="translate(1320,960)">${binSvg('bn2')}</g><g transform="translate(1330,700)"><g id="cj2">${catJump('cj')}</g></g>` +
    person('a2', AHMET, 520, 150, .95) + person('y2', MERYEM, 820, 150, .95), S[2]);
  cut(2, tF); flash(tF, .7); shake('#sh_f2', tF, 14, .4); sfx('cat', tF, .7); sfx('sting', tF, .7);
  face('a2', {e: 'big', m: 'scream', brow: -20}, tF); face('y2', {e: 'big', m: 'scream', brow: -20}, tF);
  arm('a2', 'L', 150, tF, .15); arm('a2', 'R', -150, tF, .15); arm('y2', 'L', 150, tF, .15); arm('y2', 'R', -150, tF, .15);
  tl.to('#a2W,#y2W', {y: -70, duration: .2, ease: 'power2.out'}, tF);
  tl.fromTo('#cj2', {y: 200, scale: .5, svgOrigin: '0 0'}, {y: -80, scale: 1.1, duration: .35, ease: 'back.out(2)', immediateRender: false}, tF);
  // flash 3: the hug — calm pink
  const tH = Wt('h0_02', 'de', 1, .85) - .25;
  add(`<rect width="${W}" height="${H}" fill="#3A1446"/>${rays(960, 540, 18, '#4E1C5E', .7)}<circle cx="960" cy="560" r="460" fill="url(#gP)" opacity=".8"/>` +
    person('a3', AHMET, 600, 150, .95) + person('y3', MERYEM, 820, 150, .95), S[3]);
  cut(3, tH); sfx('chime', tH, .45);
  arm('a3', 'R', -96, tH, .01); face('a3', {e: 'happy', m: 'smile', blush: 1}, tH); face('y3', {e: 'happy', m: 'smile', blush: 1}, tH); headTilt('y3', -6, tH);
  // Ege interrupts
  const tC = T('h0_03') - .1;
  add(`<rect width="${W}" height="${H}" fill="#FFD54F"/>${rays(960, 700, 20, '#FFC93C', .8)}<g transform="translate(960,760) scale(1.8)"><g id="egeC">${catSit('ec')}</g></g>` +
    `<g id="mvB" opacity="0"><path d="M1180,180 h330 a40,40 0 0 1 40,40 v80 a40,40 0 0 1 -40,40 h-230 l-80,60 l20,-60 h-40 a40,40 0 0 1 -40,-40 v-80 a40,40 0 0 1 40,-40Z" fill="#fff"/><text class="lbl" x="1360" y="285" text-anchor="middle" font-size="72" fill="#C2185B">MİYAV!</text></g>` +
    `<text class="lbl" x="420" y="220" text-anchor="middle" font-size="60" fill="#7A4A00" id="egeN" opacity="0">EGE</text>`, S[4]);
  cut(4, tC); show('#ec-eyesO', tC); hide('#ec-eyesC', tC);
  tl.fromTo('#egeC', {y: 400}, {y: 0, duration: .25, ease: 'back.out(2)', immediateRender: false}, tC);
  pop('#mvB', tC + .1, 1300, 380); show('#egeN', tC + .2, .2); sfx('meow', tC + .05, .8);
  // whisper + x-ray reveal
  const tW = T('h0_04') - .1, B = [960 - 520 * 1.0, 560 - 340 * 1.0, 1.0];
  add(darkBg('#0E0B2A', '#1A1546', 18, .5) + `<g id="camX">${brainSide('bx', B[0], B[1], B[2], {head: true, headOp: 1, window: 0, marks: .35})}</g>` +
    `<g id="ttl" opacity="0"><rect x="360" y="820" width="1200" height="200" rx="40" fill="#0B0820" opacity=".85"/><text class="lbl" x="960" y="915" text-anchor="middle" font-size="84" fill="#fff" letter-spacing="3">AYNI GÜN, ÜÇ KALP KRİZİ!</text>` +
    `<text class="txt" x="960" y="985" text-anchor="middle" font-size="44" letter-spacing="3"><tspan fill="#FFE45C">dopamin</tspan><tspan fill="#9a95c8"> · </tspan><tspan fill="#FF5A5A">adrenalin</tspan><tspan fill="#9a95c8"> · </tspan><tspan fill="#FF8FC2">oksitosin</tspan></text></g>`, S[5]);
  cut(5, tW); sfx('whoosh', tW - .05, .4);
  tl.set('#bx-brain', {opacity: 0}, 0);
  camSet('#camX', tW, 960, 470, 1.25); cam('#camX', tW, 960, 470, 1.1, D('h0_04') + .4, 'none');
  const tR = T('h0_05') + .05;
  tl.to('#bx-head', {opacity: .35, duration: .4}, tR); tl.to('#bx-brain', {opacity: 1, duration: .4}, tR); flash(tR, .5, '#fff', .3); sfx('title_hit', tR, .7);
  [['vta', 'gY'], ['amyg', 'gR'], ['hypo', 'gP']].forEach(([r, g], i) => { rglow('bx', r, tR + .3 + i * .2, g, 90, {pulse: 6}); sfx('ding', tR + .3 + i * .2, .4, {rate: 1 + i * .12}); });
  const tT = E('h0_05') + .3; cam('#camX', tT - .2, 960, 600, 1, .6); pop('#ttl', tT, 960, 920); sfx('swell', tT - .2, .5);
  wipeOut('#FFB347', .45);
})();
