// V10 — Finale: three superhero molecules, recap, question, Ege's "subscribe or I'll jump out of the bin", logo.
(function () {
  wipeIn('#140F3A', .4);
  const card = (id, x, kind, title, quote, c, scene) => `<g id="${id}" opacity="0"><rect x="${x - 270}" y="140" width="540" height="780" rx="50" fill="#1E1850"/><rect x="${x - 270}" y="140" width="540" height="780" rx="50" fill="none" stroke="${c}" stroke-width="6"/>` +
    `<g transform="translate(${x},300) scale(.85)">${mol(id + 'm', kind)}</g><text class="lbl" x="${x}" y="510" text-anchor="middle" font-size="62" fill="${c}">${title}</text><text class="txt" x="${x}" y="575" text-anchor="middle" font-size="42" fill="#fff">${quote}</text>${scene}</g>`;
  A(darkBg('#140F3A', '#221B5C', 18, .55) +
    card('cD', 380, 'dopa', 'DOPAMİN', '“İstiyorum!”', '#FFE45C', `<g transform="translate(300,610) scale(.3)">${char('d1', AHMET)}</g><g transform="translate(470,760)">${coffeeCup('cp')}</g>`) +
    card('cA', 960, 'adr', 'ADRENALİN', '“Hazır ol!”', '#FF5A5A', `<g transform="translate(870,600) scale(.3)">${char('a1', MERYEM)}</g><g transform="translate(1080,800) scale(.35)">${catJump('cj')}</g>`) +
    card('cO', 1540, 'oxy', 'OKSİTOSİN', '“Güvendesin.”', '#FF8FC2', `<g transform="translate(1420,610) scale(.3)">${char('o1', AHMET)}</g><g transform="translate(1520,610) scale(.3)">${char('o2', MERYEM)}</g>${heart(1540, 640, 1.6, '#FF4F92')}`) +
    `<g id="mix" opacity="0">${heart(1210, 230, 1.6, '#FFE45C')}<text class="lbl" x="1210" y="300" text-anchor="middle" font-size="30" fill="#FFE45C">+ aşk</text></g>` +
    `<g id="kimya" opacity="0"><rect x="0" y="0" width="${W}" height="${H}" fill="#140F3A" opacity=".85"/><text class="lbl" x="960" y="470" text-anchor="middle" font-size="96" fill="#fff" letter-spacing="4">KALPTE DEĞİL,</text><text class="lbl" x="960" y="590" text-anchor="middle" font-size="96" fill="#FFE45C" letter-spacing="4">BEYİNDE!</text></g>`);
  face('d1', {e: 'heart', m: 'grin'}, 0); face('a1', {e: 'big', m: 'scream'}, 0); armSet('a1', 'L', 150, 0); armSet('a1', 'R', -150, 0); face('o1', {e: 'happy', m: 'smile', blush: 1}, 0); face('o2', {e: 'happy', m: 'smile', blush: 1}, 0);
  [['cD', 'h6_02', 380], ['cA', 'h6_03', 960], ['cO', 'h6_04', 1540]].forEach(([id, l, x], i) => { const t = T(l) - .15; tl.fromTo('#' + id, {opacity: 0, y: 100}, {opacity: 1, y: 0, duration: .35, ease: 'back.out(2)', immediateRender: false}, t); sfx(['boing', 'zap', 'chime'][i], t, .55); tl.to('#' + id, {scale: 1.05, svgOrigin: `${x} 530`, duration: .25, yoyo: true, repeat: 1}, t + .4); });
  pop('#mix', Wt('h6_03', 'aşkla', 0, .85) - .1, 1210, 240);
  const tK = Wt('h6_05', 'kalpte', 0, .45) - .2; show('#kimya', tK, .25); sfx('title_hit', tK, .6); hide('#kimya', E('h6_05') + .1, .2);
  // question + Ege
  const tQ = T('h6_06') - .1;
  A(`<g id="qq" opacity="0"><rect width="${W}" height="${H}" fill="#FFE3EC"/>${rays(960, 540, 18, '#FFD0DF', .8)}` +
    `${['#FFE45C', '#FF5A5A', '#FF8FC2'].map((c, i) => `<g><ellipse cx="${560 + i * 400}" cy="560" rx="150" ry="52" fill="#2A2650"/><ellipse class="btn" cx="${560 + i * 400}" cy="535" rx="130" ry="46" fill="${c}"/></g>`).join('')}` +
    `<g id="cmt"><path d="M760,140 h400 a50,50 0 0 1 50,50 v120 a50,50 0 0 1 -50,50 h-280 l-80,60 l14,-60 h-54 a50,50 0 0 1 -50,-50 v-120 a50,50 0 0 1 50,-50Z" fill="#fff"/><text class="lbl" x="960" y="268" text-anchor="middle" font-size="52" fill="#C2185B">Yorumlara yaz!</text></g></g>` +
    `<g id="eg" opacity="0"><rect width="${W}" height="${H}" fill="#FFD54F"/>${rays(960, 760, 20, '#FFC93C', .8)}<g transform="translate(960,860) scale(2.2)"><g id="egeB">${catSit('ee')}</g></g>` +
    `<g id="egT" opacity="0"><rect x="420" y="90" width="1080" height="130" rx="65" fill="#fff"/><text class="lbl" x="960" y="175" text-anchor="middle" font-size="52" fill="#7A3A00">“Abone ol, yoksa kovadan fırlarım!”</text></g>` +
    `<g id="sub" opacity="0"><rect id="subR" x="1380" y="420" width="420" height="120" rx="60" fill="#E53935"/><text id="subT" class="lbl" x="1590" y="500" text-anchor="middle" font-size="50" fill="#fff">ABONE OL</text></g></g>` +
    `<g id="end" opacity="0"><rect width="${W}" height="${H}" fill="#0E0A2E"/>${rays(960, 540, 18, '#16113F', .7)}<text class="lbl" x="960" y="520" text-anchor="middle" font-size="130" fill="#fff" letter-spacing="8">MİKRO DÜNYA</text><text class="txt" x="960" y="600" text-anchor="middle" font-size="44" letter-spacing="3"><tspan fill="#FFE45C">dopamin</tspan><tspan fill="#9a95c8"> · </tspan><tspan fill="#FF5A5A">adrenalin</tspan><tspan fill="#9a95c8"> · </tspan><tspan fill="#FF8FC2">oksitosin</tspan></text></g>`);
  show('#qq', tQ, .2); sfx('whoosh', tQ - .1, .4);
  const tU = Wt('h6_06', '3üne', 0, .5) - .1; tl.to('.btn', {attr: {cy: 552}, duration: .1, stagger: .08}, tU); tl.to('.btn', {attr: {cy: 535}, duration: .2, stagger: .08}, tU + .3); sfx('button', tU, .5);
  tl.to('#cmt', {scale: 1.08, svgOrigin: '960 250', duration: .2, yoyo: true, repeat: 3}, Wt('h6_06', 'yorumlara', 0, .8)); sfx('pop', Wt('h6_06', 'yorumlara', 0, .8), .45);
  const tE = T('h6_07') - .3;
  show('#eg', tE, .15); tl.fromTo('#egeB', {y: 300}, {y: 0, duration: .3, ease: 'back.out(2)', immediateRender: false}, tE); show('#ee-eyesO', tE); hide('#ee-eyesC', tE);
  sfx('meow', T('h6_07'), .8); pop('#egT', T('h6_07') + .1, 960, 155);
  pop('#sub', T('h6_08'), 1590, 480); const tS = Wt('h6_08', 'abone', 0, .55);
  tl.to('#sub', {scale: .9, svgOrigin: '1590 480', duration: .1, yoyo: true, repeat: 1}, tS + .2); tl.set('#subR', {fill: '#8A8FA3'}, tS + .4); sfx('click', tS + .3, .5);
  const st = $('#subT'); SEEKERS.push(t => { st.textContent = t >= tS + .4 ? 'ABONE OLUNDU ✓' : 'ABONE OL'; st.setAttribute('font-size', t >= tS + .4 ? 38 : 50); });
  const tEnd = E('h6_08') + .6; show('#end', tEnd, .5); sfx('title_hit', tEnd, .6);
  fadeOut(.8, '#000');
})();
