// S03a — Tension: our ancestors survived by spotting danger first; the body has an alarm system.
(function () {
  fadeIn(.8, '#05040F');
  const S = [0, 1].map(n => A(`<g id="sh${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  // --- 0: dusk savanna, silhouettes by a fire, eyes in the grass
  let grass = ''; for (let i = 0; i < 40; i++) { const x = i * 50 - 10, h = 60 + R() * 80; grass += `<path class="gr" d="M${x},1080 Q${x + 10},${960 - h} ${x + 24},${900 - h} Q${x + 18},${960 - h} ${x + 40},1080Z" fill="#1F1438"/>`; }
  const sil = (x, s) => `<g transform="translate(${x},${800 - 520 * s}) scale(${s})"><circle cx="0" cy="60" r="60" fill="#120B24"/><path d="M-70,130 Q0,100 70,130 L90,420 L-90,420Z" fill="#120B24"/><rect x="-60" y="400" width="45" height="200" rx="20" fill="#120B24"/><rect x="15" y="400" width="45" height="200" rx="20" fill="#120B24"/></g>`;
  add(`<linearGradient id="gDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A1650"/><stop offset=".6" stop-color="#A2416B"/><stop offset="1" stop-color="#F08A5D"/></linearGradient>` +
    `<rect width="${W}" height="${H}" fill="url(#gDusk)"/><circle cx="1500" cy="640" r="160" fill="#FFB36B" opacity=".8"/>` +
    `<path d="M0,800 Q400,720 900,790 Q1400,860 1920,760 L1920,1080 L0,1080Z" fill="#3A2246"/>` +
    `<path d="M1180,800 l-30,-460 l40,0 l-6,200 q120,-140 200,-60 q-110,10 -190,110 l-10,210Z" fill="#2A1638"/><circle cx="1240" cy="330" r="140" fill="#2A1638"/>` +
    `<g id="fire"><circle cx="760" cy="780" r="120" fill="url(#gO)" opacity=".8"/><path d="M720,800 Q730,720 760,690 Q790,720 800,800Z" fill="#FFB347"/><path d="M740,800 Q748,750 760,730 Q772,750 780,800Z" fill="#FFE45C"/></g>` +
    sil(560, .9) + sil(960, .8) + `<g id="grass">${grass}</g>` +
    `<g id="eyes" opacity="0"><ellipse cx="1520" cy="930" rx="18" ry="12" fill="#FFE45C"/><ellipse cx="1580" cy="930" rx="18" ry="12" fill="#FFE45C"/><ellipse cx="1520" cy="930" rx="5" ry="10" fill="#120B24"/><ellipse cx="1580" cy="930" rx="5" ry="10" fill="#120B24"/></g>` +
    `<text class="txt" x="80" y="120" font-size="40" fill="#FFD9C2" opacity=".8" id="yrs">— milyonlarca yıl önce —</text>`, S[0]);
  cut(0, 0); sfx('rumble', 0, .45, {dur: 6});
  tl.to('#fire', {scaleY: 1.08, svgOrigin: '760 800', duration: .3, yoyo: true, repeat: 30}, 0);
  tl.to('.gr', {skewX: 6, transformOrigin: '50% 100%', duration: 1.2, yoyo: true, repeat: 8, stagger: .02, ease: 'sine.inOut'}, 0);
  const tD = Wt('s3_02', 'tehlikeyi', 0, .6);
  tl.to('.gr', {x: 6, duration: .06, yoyo: true, repeat: 9}, tD - .4); sfx('rustle', tD - .5, .55);
  show('#eyes', tD, .3); tl.to('#eyes', {scaleY: .1, svgOrigin: '1550 930', duration: .08, yoyo: true, repeat: 1}, tD + 1.0); sfx('growl', tD + .1, .5);
  // --- 1: the alarm system
  const t1 = T('s3_03') - .1;
  add(gridBg('#0A0A22', '#FF3B3B') + bodyX('bx', 960 - 200 * 1.0, 80, 1.0, '#3A4AA8') +
    `<g id="siren"><rect x="890" y="70" width="140" height="40" rx="12" fill="#3A3A5A"/><path d="M900,70 Q960,-30 1020,70Z" fill="#FF3B3B" id="sirL"/><circle id="sirG" cx="960" cy="40" r="200" fill="url(#gR)" opacity="0"/></g>` +
    pill('alm', 960, 990, 'ALARM SİSTEMİ', '#E53935', '#fff', 56), S[1]);
  cut(1, t1); sfx('whoosh', t1 - .1, .45);
  const tA = Wt('s3_03', 'alarm', 0, .6);
  tl.to('#sirG', {opacity: 1, duration: .25, yoyo: true, repeat: 7}, tA); sfx('alarm', tA, .35, {dur: 2});
  tl.fromTo('#siren', {y: -200}, {y: 0, duration: .4, ease: 'back.out(2)', immediateRender: false}, t1 + .1);
  pop('#alm', tA, 960, 990);
  wipeOut('#0B1440', .5);
})();
