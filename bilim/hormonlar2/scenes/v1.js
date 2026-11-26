// V1 — 09:47 Café: coffee collision, Yasemin catches the cup, Miraç stammers; "let's go inside".
(function () {
  wipeIn('#FFB347', .45); hudClock('09:47', .2);
  const MX = 980, YX = 600, Y0 = 150, S0 = .95, DX = 650;
  const mEye = at(MX, Y0, S0, 236, 242), hand = at(MX, Y0, S0, 114, 610);
  A(`<g id="cam">${cafeFront()}` + shadow(1000, 1000, 160, .15) +
    person('ya', MERYEM, YX, Y0, S0) + person('mi', AHMET, MX, Y0, S0, {rightHand: phoneProp(286, 600)}) +
    `<g transform="translate(${hand[0]},${hand[1]})"><g id="cupW">${coffeeCup('cup')}</g></g>` +
    `<g id="splash">${[0, 1, 2, 3, 4].map(i => `<circle class="sp" cx="${hand[0]}" cy="${hand[1] - 60}" r="${9 + i * 2}" fill="#8A5A3E" opacity="0"/>`).join('')}</g>` +
    `<g id="hearts1"></g></g>`);
  face('ya', {m: 'smile', e: 'dot'}, 0); face('mi', {m: 'neutral', e: 'side'}, 0); armSet('mi', 'R', 38, 0); armSet('mi', 'L', 20, 0);
  tl.set('#yaW', {x: -DX}, 0); tl.set('#miW', {x: DX}, 0); tl.set('#cupW', {x: DX * S0}, 0);
  walk('ya', 0, 1.9, DX, .26); walk('mi', 0, 1.9, -DX, .26, false);
  tl.to('#cupW', {x: 0, duration: 1.9, ease: 'none'}, 0);
  const tC = 1.95;
  sfx('steps_run', 0, .25, {dur: 1.9}); sfx('thud', tC, .7); sfx('whoosh', tC, .5); shake('#cam', tC, 10, .3);
  face('mi', {e: 'big', m: 'o', brow: -16}, tC); face('ya', {e: 'big', m: 'o'}, tC);
  tl.to('#miW', {rotation: 4, svgOrigin: '200 880', duration: .15}, tC); tl.to('#miW', {rotation: 0, duration: .3}, tC + .15);
  // slow-motion cup flight, Yasemin catches it
  tl.to('#cupW', {motionPath: {path: [{x: 0, y: 0}, {x: -150, y: -470}, {x: -90, y: -345}]}, rotation: 520, duration: 1.1, ease: 'power1.out'}, tC);
  sfx('slowmo', tC, .5);
  $$('.sp').forEach((c, i) => { tl.set(c, {opacity: 1}, tC + .15); tl.to(c, {attr: {cx: hand[0] - 60 + i * 35, cy: hand[1] - 200 - i * 25}, opacity: 0, duration: .8}, tC + .15); });
  arm('ya', 'R', -140, tC + .7, .25); sfx('pop', tC + 1.1, .5);
  // eye contact — time stops
  const tE = tC + 1.25;
  face('ya', {e: 'happy', m: 'smile', blush: 1}, tE); face('mi', {e: 'heart', m: 'grin', blush: 1, brow: 0}, tE);
  sfx('chime', tE, .6); burst($('#hearts1'), 12, 960, 360, 960, 280, 260, 120, tE, {colors: ['#FF5C9A', '#FFB3D1'], r: 10, spread: .5});
  hudPulse([[0, 72], [tC, 72], [tE, 130], [E('h1_03'), 128]]);
  // dialogue
  talk('ya', 'h1_01', 'o', 'smile'); arm('ya', 'R', -40, T('h1_01') + .2, .4);
  talk('mi', 'h1_02', 'grin', 'wavy'); face('mi', {e: 'big', sweat: 1}, T('h1_02')); face('mi', {e: 'heart'}, E('h1_02') - .5);
  tl.to('#miW', {y: -8, duration: .1, yoyo: true, repeat: Math.round(D('h1_02') / .2)}, T('h1_02'));
  const tM = Wt('h1_02', 'merhaba', 0, .85) - .1; tl.to('#mi-armR', {rotation: -150, svgOrigin: '286 400', duration: .2}, tM); sfx('pop', tM, .45);
  // narrator: dive into Miraç's eye
  const tN = T('h1_03');
  cam('#cam', tN + .2, mEye[0], mEye[1], 1.6, D('h1_03') - .9);
  cam('#cam', E('h1_03') - .5, mEye[0], mEye[1], 24, 1.0, 'power3.in'); sfx('whoosh_long', E('h1_03') - .5, .6);
  flash(DUR - .15, .9, '#fff', .2);
})();
