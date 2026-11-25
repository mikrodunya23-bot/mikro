// S04d — Oxytocin's other face: binds us to "ours", can make us wary of outsiders, even jealous.
(function () {
  wipeIn('#3A1446', .55);
  A(`<rect width="${W}" height="${H}" fill="#3A1446"/>${rays(960, 540, 18, '#4A1C56', .6)}` +
    `<g transform="translate(960,420)"><g id="ox">${mol('oxi', 'oxy')}<g id="halo"><ellipse cx="0" cy="-200" rx="90" ry="22" fill="none" stroke="#FFE45C" stroke-width="12"/></g>` +
    `<g id="horns" opacity="0"><path d="M-90,-120 L-120,-210 L-50,-150Z M90,-120 L120,-210 L50,-150Z" fill="#FF3B3B"/></g></g></g>` +
    `<g id="ring" opacity="0"><ellipse cx="800" cy="900" rx="430" ry="90" fill="none" stroke="#FF7FB0" stroke-width="14"/></g>` +
    `<g id="pair" opacity="0">` + person('a', AHMET, 560, 210, .78) + person('m', MERYEM, 820, 210, .78) + `</g>` +
    `<g id="strW" opacity="0">` + person('g', GHOST, 1450, 210, .78) + `</g>` +
    `<g id="biz" opacity="0"><rect x="600" y="120" width="400" height="100" rx="50" fill="#FF7FB0"/><text class="lbl" x="800" y="190" text-anchor="middle" font-size="56" fill="#3A1446">“BİZ”</text></g>` +
    `<g id="yab" opacity="0"><rect x="1360" y="120" width="380" height="100" rx="50" fill="#6E6A88"/><text class="lbl" x="1550" y="190" text-anchor="middle" font-size="50" fill="#fff">yabancı</text></g>`);
  const t0 = .3;
  tl.fromTo('#ox', {scale: .3, opacity: 0, svgOrigin: '0 0'}, {scale: 1.2, opacity: 1, duration: .6, ease: 'back.out(2)', immediateRender: false}, t0);
  tl.to('#halo', {y: -10, duration: .6, yoyo: true, repeat: 3, ease: 'sine.inOut'}, t0 + .6);
  const tDg = Wt('s4_16', 'değil', 0, .9) - .2;
  tl.to('#halo', {opacity: 0, y: -60, duration: .3}, tDg); show('#horns', tDg, .2); sfx('dun', tDg, .5);
  const t1 = T('s4_17') - .1;
  tl.to('#ox', {scale: .45, x: -760, y: -260, duration: .6}, t1);
  show('#pair', t1 + .1, .4); show('#ring', t1 + .3, .4); pop('#biz', Wt('s4_17', 'bizim', 0, .05), 800, 170);
  face('a', {e: 'happy', m: 'smile', blush: 1}, t1); face('m', {e: 'happy', m: 'smile', blush: 1}, t1); face('g', {m: 'neutral'}, 0);
  const tYb = Wt('s4_17', 'yabancılara', 0, .4) - .1;
  show('#strW', tYb, .4); tl.fromTo('#gW', {x: 300}, {x: 0, duration: 1, immediateRender: false}, tYb); pop('#yab', tYb + .4, 1550, 170);
  face('a', {e: 'side', m: 'flat', blush: 0}, tYb + .6); face('m', {e: 'side', m: 'neutral', blush: 0}, tYb + .6);
  const tKs = Wt('s4_17', 'kıskanç', 0, .75) - .1;
  face('a', {e: 'half', m: 'flat', brow: 10, browRot: 14}, tKs); tl.to('#ring ellipse', {stroke: '#FF3B3B', duration: .4}, tKs); sfx('grr', tKs, .4);
  tl.to('#aW', {x: 30, duration: .3}, tKs);
  fadeOut(.6, '#05040F');
})();
