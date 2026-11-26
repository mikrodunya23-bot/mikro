// V4 — 21:15 Night: Yasemin's trash bag, Miraç's joke, Ege bursts out, Yasemin jumps into Miraç's arms, freeze;
//      brain race with a sports commentator: long road vs shortcut, amygdala wins, alarm.
(function () {
  const S = ['street', 'brain'].map(n => A(`<g id="sh_${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  wipeIn('#0B1440', .45); hudClock('21:15', .1);
  const MX = 480, YX = 820, NY = 160, NS = .92, BINX = 1380, BINY = 960;
  const yEye = at(YX - 230, NY - 140 * NS, NS, 236, 242);
  add(`<g id="camN">${nightStreet('ns')}` + shadow(BINX, BINY + 6, 150, .25) +
    `<g transform="translate(${BINX + 30},${BINY - 160})"><g id="catJW" opacity="0">${catJump('catJ')}</g></g>` +
    `<g transform="translate(${BINX},${BINY})">${binSvg('bin')}</g><g transform="translate(${BINX},${BINY - 262})"><g id="lidW">${lidSvg('lid')}</g></g>` +
    `<g id="eyesB" opacity="0"><ellipse cx="${BINX - 30}" cy="${BINY - 240}" rx="12" ry="8" fill="#FFE45C"/><ellipse cx="${BINX + 20}" cy="${BINY - 240}" rx="12" ry="8" fill="#FFE45C"/></g>` +
    person('mi', AHMET, MX, NY, NS) + person('ya', MERYEM, YX, NY, NS) + `<g transform="translate(${YX + 290 * NS},${NY + 640 * NS})"><g id="bagW">${bagProp(0, 0)}</g></g>` +
    `<g id="fzT" opacity="0"><rect x="660" y="60" width="600" height="130" rx="40" fill="#0B0820" opacity=".8"/><text class="lbl" x="960" y="150" text-anchor="middle" font-size="76" fill="#BFD4FF" letter-spacing="6">0,1 SANİYE</text></g>` +
    `<rect id="freezeTint" x="-200" y="-200" width="${W + 400}" height="${H + 400}" fill="#3A6FFF" opacity="0"/></g>`, S[0]);
  cut(0, 0); sfx('night', 0, .3, {dur: 16});
  tl.set('#miW,#yaW', {x: -500}, 0); tl.set('#bagW', {x: -500 * NS}, 0);
  walk('mi', 0, 1.5, 500, .26); walk('ya', 0, 1.5, 500, .26, false); tl.to('#bagW', {x: 0, duration: 1.5, ease: 'none'}, 0);
  face('mi', {e: 'dot', m: 'smile'}, 0); face('ya', {e: 'dot', m: 'smile'}, 0);
  talk('ya', 'h2_01', 'o', 'smile'); talk('mi', 'h2_02', 'grin', 'grin'); headTilt('mi', -5, T('h2_02'));
  tl.to('#mi-armR', {rotation: -60, svgOrigin: '286 400', duration: .3}, T('h2_02')); tl.to('#mi-armR', {rotation: 0, duration: .3}, E('h2_02'));
  // Yasemin walks to the bin
  walk('ya', E('h2_01') - .2, 1.2, 330, .26, false); tl.to('#bagW', {x: 330 * NS, duration: 1.2, ease: 'none'}, E('h2_01') - .2);
  const tT = T('h2_03'); show('#eyesB', Wt('h2_03', 'kovanın', 0, .4), .3); sfx('rattle', Wt('h2_03', 'keyfi', 0, .8), .5);
  tl.to('#lidW', {rotation: 5, y: -6, svgOrigin: '0 0', duration: .07, repeat: 9, yoyo: true}, Wt('h2_03', 'keyfi', 0, .8));
  arm('ya', 'R', -60, E('h2_03') - .3, .4); tl.to('#bagW', {x: 330 * NS + 60, y: -150, duration: .4}, E('h2_03') - .3);
  // BURST
  const tB = T('h2_04') - .05; hide('#eyesB', tB);
  tl.to('#lidW', {x: 380, y: -420, rotation: 200, svgOrigin: '0 0', duration: .7, ease: 'power2.out'}, tB);
  show('#catJW', tB); tl.fromTo('#catJW', {y: 200, scale: .5, svgOrigin: '0 0'}, {y: -260, x: -150, scale: 1.25, duration: .45, ease: 'back.out(1.6)', immediateRender: false}, tB);
  flash(tB, .8); shake('#camN', tB, 16, .45); sfx('cat', tB, .9); sfx('sting', tB, .8); sfx('lid_clang', tB + .1, .5);
  face('ya', {m: 'scream', e: 'big', brow: -22}, tB); face('mi', {m: 'scream', e: 'big', brow: -22}, tB);
  // Yasemin jumps into Miraç's arms
  tl.to('#yaW', {x: -230, y: -140, rotation: -12, svgOrigin: '200 880', duration: .35, ease: 'power2.out'}, tB + .05);
  tl.to('#bagW', {y: 120, rotation: 40, duration: .4, ease: 'power2.in'}, tB + .05);
  arm('ya', 'L', 150, tB + .05, .2); arm('ya', 'R', -150, tB + .05, .2); arm('mi', 'L', 80, tB + .2, .2); arm('mi', 'R', -80, tB + .2, .2);
  // freeze
  const tFz = tB + .5;
  show('#freezeTint', tFz, .2); tl.to('#freezeTint', {opacity: .28, duration: .2}, tFz); pop('#fzT', tFz + .1, 960, 125); sfx('freeze', tFz, .65);
  cam('#camN', tFz + .2, yEye[0], yEye[1], 1.7, T('h2_05') - tFz - 1.0);
  cam('#camN', T('h2_05') - .85, yEye[0], yEye[1], 24, .8, 'power3.in'); sfx('whoosh_long', T('h2_05') - .85, .55);
  flash(T('h2_05') - .1, .85, '#fff', .3);
  hudPulse([[0, 76], [tB, 76], [tB + .4, 165], [DUR, 168]]);
  // ---------- BRAIN RACE ----------
  const B = [960 - 520 * 1.0, 590 - 340 * 1.0, 1.0];
  add(darkBg('#0E0B2A', '#1A1546', 18, .5) + `<g id="camB">${brainSide('br', B[0], B[1], B[2], {head: true, headOp: .38, window: .5, marks: .45, skin: '#F9C3B8', skinD: '#E89A97', hair: '#F7D27A'})}</g>` +
    raceBoard('rb') + `<g id="micG" opacity="0">${mic(150, 900)}<text class="lbl" x="150" y="1030" text-anchor="middle" font-size="28" fill="#FFE45C">CANLI</text></g>` +
    `<g id="goalA" opacity="0"><text class="lbl" x="1500" y="360" text-anchor="middle" font-size="140" fill="#FF3B3B" filter="url(#glow)">ALARM!</text></g>` +
    `<rect id="redTint" width="${W}" height="${H}" fill="#FF1E3C" opacity="0"/>`, S[1]);
  const tR = T('h2_05') - .05;
  cut(1, tR); camSet('#camB', tR, 960, 560, 1.5); cam('#camB', tR, 960, 560, 1, .9, 'power2.out'); show('#micG', tR + .3, .2);
  add(`<path id="br-p-e2t" d="M872,362 C760,384 600,362 500,335" fill="none" stroke="#7FD8FF" stroke-width="9" stroke-linecap="round" opacity="0"/><path id="br-p-long" d="M500,335 C400,305 300,322 235,330" fill="none" stroke="#7FD8FF" stroke-width="9" stroke-dasharray="4 16" stroke-linecap="round" opacity="0"/>`, $('#br-brain'));
  const tGo = Wt('h2_05', 'başlıyor', 0, .15); pop('#rb', tGo, 960, 120); sfx('title_hit', tGo, .5);
  brPath('br', 'e2t', tGo + .3, .6, '#7FD8FF'); brFlow('br', 'e2t', 8, tGo + .3, tGo + 1.3, ['#7FD8FF', '#fff'], {dur: .6});
  const tTh = Wt('h2_05', 'talamusa', 0, .55); rglow('br', 'thal', tTh, 'gB', 70, {pulse: 4}); sfx('ding', tTh, .4);
  add(tag('tgTh', ...brPt(...B, 'thal'), brPt(...B, 'thal')[0] - 120, brPt(...B, 'thal')[1] - 300, 'TALAMUS · santral', '#4FA8FF', '#fff', 30), $('#camB')); show('#tgTh', tTh, .2);
  const tFk = Wt('h2_05', 'ikiye', 0, .85); brPath('br', 'long', tFk, .4, '#7FD8FF'); brPath('br', 'low', tFk + .1, .3, '#FF5A5A'); sfx('split', tFk, .45); hide('#tgTh', tFk + .5, .2);
  const race = {l: 0, s: 0}; tl.set(race, {l: 0, s: 0}, 0);
  SEEKERS.push(() => { $('#rbL').setAttribute('width', Math.max(1, 800 * race.l)); $('#rbS').setAttribute('width', Math.max(1, 800 * race.s)); });
  const tL = T('h2_06');
  tl.to(race, {l: .3, duration: D('h2_06'), ease: 'none'}, tL); brFlow('br', 'long', 6, tL + .2, tL + 3, ['#7FD8FF', '#fff'], {dur: 2.4, ease: 'none'});
  add(tag('tgL', ...brPt(...B, 'vis'), brPt(...B, 'vis')[0] + 60, brPt(...B, 'vis')[1] - 200, '🔍 görme korteksi', '#4FA8FF', '#fff', 32), $('#camB')); show('#tgL', tL + .4, .2);
  add(`<g id="q3" opacity="0">${['kedi?', 'poşet?', 'kaplan?!'].map((w, i) => `<text class="lbl q3w" x="${200 + i * 30}" y="${640 + i * 70}" font-size="46" fill="#BFE6FF" opacity="0">${w}</text>`).join('')}</g>`, S[1]); show('#q3', tL);
  [['kedi', 0], ['poşet', 1], ['kaplan', 2]].forEach(([w, i]) => { const t = Wt('h2_06', w, 0, .55 + i * .1) - .1; tl.to(`.q3w:nth-child(${i + 1})`, {opacity: 1, duration: .15}, t); sfx('pop', t, .35); });
  const tS = T('h2_07'); hide('#tgL,#q3', tS, .2);
  add(tag('tgA', ...brPt(...B, 'amyg'), brPt(...B, 'amyg')[0] + 260, brPt(...B, 'amyg')[1] + 180, '🚀 AMİGDALA', '#E53935', '#fff', 34), $('#camB')); show('#tgA', Wt('h2_07', 'amigdala', 0, .3), .2);
  const tGas = Wt('h2_07', 'gaz', 0, .85) - .1;
  brFlow('br', 'low', 12, tGas - .3, tGas + .8, ['#FF5A5A', '#FFD0D0'], {dur: .4, ease: 'power2.in'}); tl.to(race, {s: 1, duration: .9, ease: 'power2.in'}, tGas - .3); sfx('zip', tGas - .3, .6);
  tl.to(race, {l: .45, duration: 2, ease: 'none'}, tGas);
  const tW = Wt('h2_08', 'önde', 0, .45); flash(tW, .3, '#FF3B3B', .2);
  const tAl = Wt('h2_08', 'alarmı', 0, .7) - .1; rglow('br', 'amyg', tAl, 'gR', 90, {pulse: 8}); pop('#goalA', tAl, 1500, 320); sfx('alarm_hit', tAl, .6); sfx('alarm', tAl + .2, .35, {dur: 1.6});
  tl.to('#redTint', {opacity: .25, duration: .15, yoyo: true, repeat: 5}, tAl);
  cam('#camB', tAl, ...brPt(...B, 'amyg'), 1.6, .8);
})();
