// S06 — Wrap-up: the three buttons, last question, comments + subscribe, next-time teaser, end card.
(function () {
  const S = ['cards', 'all', 'buttons', 'sub', 'next', 'end'].map(n => A(`<g id="sh_${n}" opacity="0"></g>`));
  const cut = (n, t) => S.forEach((g, i) => tl.set(g, {opacity: i === n ? 1 : 0}, t));
  wipeIn('#140F3A', .55);
  // --- three cards
  const card = (id, x, kind, title, quote, c, scene) => `<g id="${id}" opacity="0"><rect x="${x - 270}" y="140" width="540" height="780" rx="50" fill="#1E1850"/><rect x="${x - 270}" y="140" width="540" height="780" rx="50" fill="none" stroke="${c}" stroke-width="6"/>` +
    `<g transform="translate(${x},300) scale(.8)">${mol(id + 'm', kind)}</g><text class="lbl" x="${x}" y="500" text-anchor="middle" font-size="62" fill="${c}">${title}</text><text class="txt" x="${x}" y="565" text-anchor="middle" font-size="42" fill="#fff">${quote}</text>${scene}</g>`;
  add(darkBg('#140F3A', '#221B5C', 18, .55) +
    card('cD', 380, 'dopa', 'DOPAMİN', '“İstiyorum!”', '#FFE45C', `<g transform="translate(300,610) scale(.3)">${char('d1', AHMET)}</g>${star(500, 700, 36, '#FFE45C', '', 5)}`) +
    card('cA', 960, 'adr', 'ADRENALİN', '“Hazır ol!”', '#FF5A5A', `<g transform="translate(880,600) scale(.3)">${char('a1', MERYEM)}</g><g transform="translate(1080,800) scale(.35)">${catJump('cj')}</g>`) +
    card('cO', 1540, 'oxy', 'OKSİTOSİN', '“Güvendesin.”', '#FF8FC2', `<g transform="translate(1420,610) scale(.3)">${char('o1', AHMET)}</g><g transform="translate(1520,610) scale(.3)">${char('o2', MERYEM)}</g>${heart(1540, 640, 1.6, '#FF4F92')}`), S[0]);
  cut(0, 0); face('d1', {e: 'dot', m: 'grin'}, 0); face('a1', {e: 'big', m: 'scream'}, 0); armSet('a1', 'L', 150, 0); armSet('a1', 'R', -150, 0);
  face('o1', {e: 'happy', m: 'smile', blush: 1}, 0); face('o2', {e: 'happy', m: 'smile', blush: 1}, 0);
  [['cD', 's6_02', 380], ['cA', 's6_03', 960], ['cO', 's6_04', 1540]].forEach(([id, l, x], i) => {
    const t = T(l) - .15; tl.fromTo('#' + id, {opacity: 0, y: 80}, {opacity: 1, y: 0, duration: .45, ease: 'back.out(1.8)', immediateRender: false}, t); sfx(['boing', 'zap', 'chime'][i], t, .5);
    tl.to('#' + id, {scale: 1.04, svgOrigin: `${x} 530`, duration: .3, yoyo: true, repeat: 1}, t + .5);
  });
  tl.to('#cAm', {x: 6, duration: .05, yoyo: true, repeat: 16}, T('s6_03') + .3);
  const tMx = Wt('s6_03', 'aşkla', 0, .85) - .1;
  add(`<g id="mix" opacity="0">${heart(1210, 230, 1.6, '#FFE45C')}<text class="lbl" x="1210" y="300" text-anchor="middle" font-size="30" fill="#FFE45C">+ aşk</text></g>`, S[0]); pop('#mix', tMx, 1210, 240);
  // --- all together, around one brain
  const t1 = T('s6_05') - .1, BB = [960 - 520 * .7, 470 - 300 * .7, .7];
  add(darkBg('#140F3A', '#221B5C', 18, .55) + brainSide('bz', BB[0], BB[1], BB[2], {head: false, window: 0, marks: .3}) +
    `<g id="orb">${['dopa', 'adr', 'oxy'].map((k, i) => { const a = i / 3 * Math.PI * 2 - Math.PI / 2; return `<g transform="translate(${960 + Math.cos(a) * 420},${430 + Math.sin(a) * 300}) scale(.6)"><g class="om">${mol('om' + i, k)}</g></g>`; }).join('')}</g>` +
    person('za', AHMET, 680, 560, .5) + person('zm', MERYEM, 1060, 560, .5) +
    `<g id="kimya" opacity="0"><text class="lbl" x="960" y="120" text-anchor="middle" font-size="70" fill="#fff" letter-spacing="4">MUHTEŞEM BİR KİMYA</text></g>`, S[1]);
  cut(1, t1); sfx('whoosh', t1 - .1, .4);
  face('za', {e: 'happy', m: 'smile'}, 0); face('zm', {e: 'happy', m: 'smile'}, 0);
  tl.to('#orb', {rotation: 120, svgOrigin: '960 430', duration: D('s6_05') + 1, ease: 'none'}, t1);
  tl.to('.om', {rotation: -120, transformOrigin: '50% 50%', duration: D('s6_05') + 1, ease: 'none'}, t1);
  ['vta', 'amyg', 'hypo'].forEach((r, i) => rglow('bz', r, t1 + .6 + i * .6, ['gY', 'gR', 'gP'][i], 80));
  show('#kimya', Wt('s6_05', 'muhteşem', 0, .75) - .1, .4); sfx('swell', Wt('s6_05', 'muhteşem', 0, .75) - .3, .45);
  // --- last question: three buttons pressed at once
  const t2 = T('s6_06') - .1;
  const btn = (id, x, c, cd) => `<g id="${id}"><ellipse cx="${x}" cy="700" rx="170" ry="60" fill="#2A2650"/><g id="${id}t"><ellipse cx="${x}" cy="680" rx="150" ry="52" fill="${cd}"/><ellipse cx="${x}" cy="660" rx="150" ry="52" fill="${c}"/></g><circle id="${id}g" cx="${x}" cy="650" r="200" fill="url(#${c === '#FFE45C' ? 'gY' : c === '#FF5A5A' ? 'gR' : 'gP'})" opacity="0"/></g>`;
  add(darkBg('#120E33', '#1E1850', 18, .55) + btn('b1', 520, '#FFE45C', '#C9A600') + btn('b2', 960, '#FF5A5A', '#B32A2A') + btn('b3', 1400, '#FF8FC2', '#C2508A') +
    `<g id="bigH">${heart(960, 280, 5, '#FF3B5C', 'filter="url(#glow)"')}</g>`, S[2]);
  cut(2, t2); sfx('whoosh', t2 - .1, .4);
  tl.set('#bigH', {opacity: .25}, 0);
  const tPr = Wt('s6_06', 'düğmesine', 0, .7) - .2;
  tl.to('#b1t,#b2t,#b3t', {y: 18, duration: .12, ease: 'power2.in'}, tPr); tl.to('#b1t,#b2t,#b3t', {y: 0, duration: .25}, tPr + .5);
  show('#b1g,#b2g,#b3g', tPr + .05, .15); sfx('button', tPr, .55);
  tl.to('#bigH', {opacity: 1, duration: .3}, tPr + .1); for (let k = 0; k < 8; k++) tl.to('#bigH', {scale: 1.1, svgOrigin: '960 370', duration: .1, yoyo: true, repeat: 1}, tPr + .2 + k * .36);
  // --- comments + subscribe
  const t3 = T('s6_07') - .1;
  add(`<rect width="${W}" height="${H}" fill="#FFE3EC"/>${rays(960, 540, 18, '#FFD0DF', .8)}` +
    `<g id="cmt"><path d="M520,250 h400 a50,50 0 0 1 50,50 v160 a50,50 0 0 1 -50,50 h-280 l-80,70 l14,-70 h-54 a50,50 0 0 1 -50,-50 v-160 a50,50 0 0 1 50,-50Z" fill="#fff"/><rect x="540" y="310" width="300" height="24" rx="12" fill="#D9D3EA"/><rect x="540" y="360" width="380" height="24" rx="12" fill="#D9D3EA"/><rect x="540" y="410" width="240" height="24" rx="12" fill="#D9D3EA"/></g>` +
    `<g id="sub"><rect id="subR" x="1060" y="320" width="460" height="130" rx="65" fill="#E53935"/><text id="subT" class="lbl" x="1290" y="405" text-anchor="middle" font-size="56" fill="#fff">ABONE OL</text></g>` +
    `<g id="bell2" opacity="0"><path d="M1600,340 q0,-60 60,-60 q60,0 60,60 v70 l20,28 h-160 l20,-28Z" fill="#FFC93C"/><circle cx="1660" cy="455" r="18" fill="#FFC93C"/></g>` +
    `<text class="lbl" x="960" y="760" text-anchor="middle" font-size="96" fill="#C2185B" letter-spacing="6">MİKRO DÜNYA</text>`, S[3]);
  cut(3, t3); sfx('whoosh', t3 - .1, .4);
  pop('#cmt', t3 + .1, 720, 380); sfx('pop', t3 + .1, .45);
  const tAb = Wt('s6_07', 'abone', 0, .7) - .1;
  pop('#sub', tAb - .4, 1290, 385); tl.to('#sub', {scale: .92, svgOrigin: '1290 385', duration: .1, yoyo: true, repeat: 1}, tAb + .3);
  tl.set('#subR', {fill: '#8A8FA3'}, tAb + .4); sfx('click', tAb + .3, .5);
  const subT = $('#subT'); SEEKERS.push(t => { subT.textContent = t >= tAb + .4 ? 'ABONE OLUNDU ✓' : 'ABONE OL'; subT.setAttribute('font-size', t >= tAb + .4 ? 40 : 56); });
  pop('#bell2', tAb + .6, 1660, 380); tl.to('#bell2', {rotation: 14, svgOrigin: '1660 290', duration: .1, yoyo: true, repeat: 7}, tAb + .9); sfx('notif', tAb + .7, .4);
  // --- next time teaser
  const t4 = T('s6_08') - .1;
  add(`<rect width="${W}" height="${H}" fill="#07051A"/>` +
    `<g opacity=".9"><g transform="translate(600,500) scale(1.1)"><circle r="150" fill="url(#gB)" opacity=".5"/><polygon points="${hexPts(62, Math.PI / 6)}" fill="none" stroke="#3FD4C0" stroke-width="18"/><text class="lbl" x="0" y="26" text-anchor="middle" font-size="80" fill="#3FD4C0">?</text></g>` +
    `<g transform="translate(1320,500) scale(1.1)"><circle r="150" fill="url(#gO)" opacity=".5"/><polygon points="${hexPts(62, 0)}" fill="none" stroke="#FF9D2E" stroke-width="18"/><text class="lbl" x="0" y="26" text-anchor="middle" font-size="80" fill="#FF9D2E">?</text></g></g>` +
    `<text id="nx" class="lbl" x="960" y="200" text-anchor="middle" font-size="58" fill="#BDB6EA" opacity="0" letter-spacing="4">BİR SONRAKİ VİDEODA…</text>`, S[4]);
  cut(4, t4); sfx('mystery', t4, .45);
  show('#nx', t4 + .3, .6); tl.fromTo('#sh_next', {scale: 1}, {scale: 1.08, svgOrigin: '960 540', duration: D('s6_08') + 1, ease: 'none', immediateRender: false}, t4);
  // --- end card
  const t5 = E('s6_08') + .5;
  add(`<rect width="${W}" height="${H}" fill="#0E0A2E"/>${rays(960, 540, 18, '#16113F', .7)}<text class="lbl" x="960" y="500" text-anchor="middle" font-size="120" fill="#fff" letter-spacing="8">MİKRO DÜNYA</text>` +
    `<text class="txt" x="960" y="580" text-anchor="middle" font-size="44" letter-spacing="3"><tspan fill="#FFE45C">dopamin</tspan><tspan fill="#9a95c8"> · </tspan><tspan fill="#FF5A5A">adrenalin</tspan><tspan fill="#9a95c8"> · </tspan><tspan fill="#FF8FC2">oksitosin</tspan></text>` +
    `<g transform="translate(1600,${930})"><g id="endCat">${catSit('ec')}</g></g><g id="mv" opacity="0"><path d="M1300,600 h200 a30,30 0 0 1 30,30 v50 a30,30 0 0 1 -30,30 h-60 l40,36 l-70,-36 h-110 a30,30 0 0 1 -30,-30 v-50 a30,30 0 0 1 30,-30Z" fill="#fff"/><text class="lbl" x="1400" y="668" text-anchor="middle" font-size="40" fill="#22357E">miyav~</text></g>`, S[5]);
  cut(5, t5); tl.fromTo('#sh_end', {opacity: 0}, {opacity: 1, duration: .6, immediateRender: false}, t5);
  show('#ec-eyesO', t5 + 1.2); hide('#ec-eyesC', t5 + 1.2); pop('#mv', t5 + 1.4, 1450, 680); sfx('meow', t5 + 1.4, .45); sfx('title_hit', t5 + .2, .5);
  capsOn = true;
  fadeOut(.8, '#000');
})();
