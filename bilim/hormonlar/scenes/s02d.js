// S02d — Why can't we forget: serotonin drops (like obsessive thinking), the brain makes it an obsession.
(function () {
  wipeIn('#140F3A', .55);
  let orbit = `<clipPath id="chead"><rect x="80" y="86" width="240" height="268" rx="110"/></clipPath>`;
  for (let i = 0; i < 7; i++) orbit += `<g class="mini" transform="translate(${760 + Math.cos(i / 7 * Math.PI * 2) * 360 - 200 * .4},${400 + Math.sin(i / 7 * Math.PI * 2) * 230 - 220 * .4}) scale(.4)"><g class="minii"><g clip-path="url(#chead)">${char('mh' + i, MERYEM)}</g></g></g>`;
  A(darkBg('#1A1550', '#28216E') + `<g id="all">` + person('ah', AHMET, 570, 200, .95) + `<g id="orbit">${orbit}</g></g>` +
    `<g id="bars"><rect x="1380" y="240" width="110" height="560" rx="40" fill="#1E1B4A"/><rect id="bD" x="1394" y="254" width="82" height="532" rx="32" fill="#FFE45C"/><text class="lbl" x="1435" y="850" text-anchor="middle" font-size="34" fill="#FFE45C">DOPAMİN</text>` +
    `<rect x="1580" y="240" width="110" height="560" rx="40" fill="#1E1B4A"/><rect id="bS" x="1594" y="254" width="82" height="532" rx="32" fill="#3FD4C0"/><text class="lbl" x="1635" y="850" text-anchor="middle" font-size="34" fill="#3FD4C0">SEROTONİN</text>` +
    `<text id="arD" class="lbl" x="1435" y="225" text-anchor="middle" font-size="70" fill="#FFE45C" opacity="0">↑</text><text id="arS" class="lbl" x="1635" y="225" text-anchor="middle" font-size="70" fill="#3FD4C0" opacity="0">↓</text></g>` +
    `<g id="okb" opacity="0"><rect x="1280" y="90" width="520" height="80" rx="40" fill="#3FD4C0"/><text class="lbl" x="1540" y="144" text-anchor="middle" font-size="36" fill="#0B2A26">saplantılı düşünceye benzer</text></g>` +
    `<g id="book" opacity="0"><rect x="430" y="610" width="300" height="200" rx="16" fill="#E0E6FF"/><rect x="580" y="610" width="10" height="200" fill="#9AA3D0"/><path d="M460,660 h100 M460,690 h100 M460,720 h80 M610,660 h100 M610,690 h100 M610,720 h80" stroke="#9AA3D0" stroke-width="8" stroke-linecap="round"/></g>` +
    `<text id="tak" class="lbl" x="760" y="160" text-anchor="middle" font-size="120" fill="#FF4F92" opacity="0" letter-spacing="12">TAKINTI</text>`);
  for (let i = 0; i < 7; i++) face('mh' + i, {e: 'happy', m: 'smile'}, 0);
  face('ah', {e: 'happy', m: 'smile', blush: 1}, 0);
  tl.fromTo('.mini', {opacity: 0}, {opacity: 1, duration: .3, stagger: .15, immediateRender: false}, .3);
  tl.to('#orbit', {rotation: 120, svgOrigin: '760 400', duration: DUR, ease: 'none'}, 0);
  const lv = {d: .45, s: .8};
  SEEKERS.push(() => { [['#bD', lv.d], ['#bS', lv.s]].forEach(([sel, v]) => { const h = 532 * v, e = $(sel); e.setAttribute('y', 254 + 532 - h); e.setAttribute('height', Math.max(20, h)); }); });
  tl.set(lv, {d: .45, s: .8}, 0);
  const tSe = Wt('s2_13', 'serotonin', 0, .35);
  tl.to(lv, {d: .9, duration: 1.2}, tSe - .5); show('#arD', tSe - .5, .3);
  tl.to(lv, {s: .25, duration: 1.6, ease: 'power2.inOut'}, tSe); show('#arS', tSe + .3, .3); sfx('down', tSe, .45);
  const tOk = Wt('s2_13', 'saplantılı', 0, .65); pop('#okb', tOk, 1540, 130);
  // tries to read, can't
  const t2 = T('s2_14') - .1;
  show('#book', t2, .3); armSet('ah', 'L', -10, t2); face('ah', {e: 'dot', m: 'flat', blush: 0}, t2);
  tl.to('.minii', {scale: 1.25, transformOrigin: '50% 50%', duration: .2, yoyo: true, repeat: 1, stagger: .12}, t2 + .5);
  face('ah', {e: 'side', m: 'wavy'}, t2 + 1.2); hide('#book', t2 + 2.2, .3); face('ah', {e: 'heart', m: 'grin', blush: 1}, t2 + 2.4);
  sfx('pop_hearts', t2 + .5, .35);
  // slow push in + whisper word
  const t3 = T('s2_15') - .1;
  hide('#bars,#okb', t3, .4);
  tl.to('#all', {scale: 1.35, svgOrigin: '760 420', duration: D('s2_15') + 1.2, ease: 'power1.inOut'}, t3);
  const tT = Wt('s2_15', 'takıntı', 0, .6) - .1;
  show('#tak', tT, .6); tl.to('#tak', {opacity: .85, letterSpacing: 4, duration: 1.2}, tT);
  sfx('heart_soft', tT, .5);
  fadeOut(.6, '#05040F');
})();
