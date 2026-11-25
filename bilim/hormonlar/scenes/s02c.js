// S02c — EXAMPLE: "typing..." at night. Uncertainty drives dopamine. Slot machines and notifications.
(function () {
  fadeIn(.6, '#0B0820');
  const AX = 300, AY = 170, AS = .95;
  A(`<g id="room">${bedroomNight()}` +
    `<g id="clock"><rect x="640" y="150" width="300" height="120" rx="20" fill="#0B1036"/><text id="clk" class="lbl" x="790" y="235" text-anchor="middle" font-size="72" fill="#FF5A7A">02:47</text></g>` +
    person('ah', AHMET, AX, AY, AS, {rightHand: phoneProp(286, 590)}) +
    `<rect x="250" y="640" width="1000" height="260" rx="50" fill="#3F55B5"/><path d="M250,700 Q750,640 1250,700" stroke="#5A70D0" stroke-width="12" fill="none"/>` +
    `<circle id="phGlow" cx="${AX + 250 * AS}" cy="${AY + 520 * AS}" r="260" fill="url(#gB)" opacity=".35"/></g>`);
  armSet('ah', 'R', 42, 0); armSet('ah', 'L', 30, 0); face('ah', {e: 'side', m: 'flat'}, 0);
  // phone UI (big inset)
  const PX = 1060, PY = 150;
  A(`<g id="ui"><rect x="${PX}" y="${PY}" width="460" height="800" rx="56" fill="#15132E"/><rect x="${PX + 20}" y="${PY + 20}" width="420" height="760" rx="40" fill="#F2F4FF"/>` +
    `<rect x="${PX + 20}" y="${PY + 20}" width="420" height="120" rx="40" fill="#5B5BD6"/><rect x="${PX + 20}" y="${PY + 100}" width="420" height="40" fill="#5B5BD6"/>` +
    `<g transform="translate(${PX + 40},${PY + 30}) scale(.3)"><clipPath id="cl2"><circle cx="200" cy="240" r="140"/></clipPath><g clip-path="url(#cl2)">${char('mav', MERYEM)}</g></g>` +
    `<text class="lbl" x="${PX + 150}" y="${PY + 92}" font-size="40" fill="#fff">Meryem</text>` +
    `<g><rect x="${PX + 110}" y="${PY + 200}" width="310" height="80" rx="30" fill="#5B5BD6"/><text class="txt" x="${PX + 265}" y="${PY + 252}" text-anchor="middle" font-size="30" fill="#fff">Bugün çok güzeldi 🙂</text></g>` +
    `<text class="txt" x="${PX + 400}" y="${PY + 310}" text-anchor="end" font-size="22" fill="#8A8FB5">Görüldü 02:31</text>` +
    `<g id="typing" opacity="0"><rect x="${PX + 40}" y="${PY + 360}" width="150" height="70" rx="30" fill="#DDE1F5"/>${[0, 1, 2].map(i => `<circle class="td" cx="${PX + 80 + i * 35}" cy="${PY + 395}" r="11" fill="#7A7FA8"/>`).join('')}</g>` +
    `<text id="yaz" class="txt" x="${PX + 150}" y="${PY + 128}" font-size="22" fill="#E0E0FF" opacity="0">yazıyor…</text></g>`);
  // dopamine meter + brain mini
  A(`<g id="meter"><rect x="1600" y="230" width="90" height="560" rx="45" fill="#1E1B4A"/><rect id="mfill" x="1612" y="242" width="66" height="536" rx="33" fill="#FFE45C"/><text class="lbl" x="1645" y="850" text-anchor="middle" font-size="34" fill="#FFE45C">DOPAMİN</text></g>`);
  const mf = $('#mfill'); const lev = {v: .2};
  SEEKERS.push(() => { const h = 536 * lev.v; mf.setAttribute('y', 242 + 536 - h); mf.setAttribute('height', Math.max(20, h)); });
  tl.set(lev, {v: .2}, 0);
  // the blinking "typing..." cycles, meter follows
  const cycles = [[T('s2_10') + 1.8, 1.4], [T('s2_10') + 4.0, 1.0], [T('s2_10') + 6.0, .8], [T('s2_11') + 1.6, 1.6]];
  cycles.forEach(([t, d], i) => {
    show('#typing,#yaz', t, .1); hide('#typing,#yaz', t + d, .1);
    tl.to('.td', {y: -10, duration: .18, stagger: .1, yoyo: true, repeat: Math.round(d / .36)}, t);
    tl.to(lev, {v: .55 + i * .12, duration: .35}, t); tl.to(lev, {v: .3 + i * .05, duration: .6}, t + d);
    tl.to('#phGlow', {opacity: .7, duration: .2, yoyo: true, repeat: 1}, t); sfx('typing', t, .25, {dur: d});
    face('ah', {e: 'big', m: 'o'}, t); face('ah', {e: 'side', m: 'flat'}, t + d);
  });
  const tPeak = Wt('s2_11', 'belki', 0, .45);
  tl.to(lev, {v: 1, duration: .4, ease: 'back.out(2)'}, tPeak); tl.to('#mfill', {fill: '#FFF7A0', duration: .15, yoyo: true, repeat: 5}, tPeak); sfx('swell', tPeak - .2, .5);
  add(`<text id="maybe" class="lbl" x="1645" y="190" text-anchor="middle" font-size="56" fill="#FFE45C" opacity="0">BELKİ?!</text>`, root); pop('#maybe', tPeak, 1645, 175);
  tl.to(lev, {v: .5, duration: .8}, E('s2_11'));
  // tense open: clock pulse
  tl.to('#clk', {opacity: .4, duration: .5, yoyo: true, repeat: 5}, .5);
  sfx('clock_tick', .2, .3, {dur: E('s2_10')});
  // slot machine + notification bell
  const t4 = T('s2_12') - .1;
  A(`<g id="slot" opacity="0"><rect x="300" y="200" width="420" height="420" rx="40" fill="#C2185B"/><rect x="340" y="260" width="340" height="180" rx="20" fill="#fff"/>` +
    `${[0, 1, 2].map(i => `<text class="lbl slotx" x="${400 + i * 110}" y="380" text-anchor="middle" font-size="90" fill="#C2185B">${['7', '♥', '7'][i]}</text>`).join('')}` +
    `<rect x="720" y="260" width="24" height="200" rx="12" fill="#9A1048"/><circle cx="732" cy="250" r="30" fill="#FFE45C"/><text class="lbl" x="510" y="560" text-anchor="middle" font-size="46" fill="#fff">KUMAR</text></g>` +
    `<g id="bell" opacity="0"><path d="M1260,300 q0,-90 90,-90 q90,0 90,90 v110 l30,40 h-240 l30,-40Z" fill="#FFD54F"/><circle cx="1350" cy="470" r="26" fill="#FFD54F"/><circle cx="1440" cy="230" r="44" fill="#FF3B5C"/><text class="lbl" x="1440" y="248" text-anchor="middle" font-size="48" fill="#fff">9</text><text class="lbl" x="1350" y="560" text-anchor="middle" font-size="46" fill="#fff">BİLDİRİM</text></g>` +
    `<rect id="dim" width="${W}" height="${H}" fill="#0B0820" opacity="0"/>`);
  // order: dim behind slot/bell
  root.insertBefore($('#dim'), $('#slot'));
  show('#dim', t4, .4); tl.to('#dim', {opacity: .82, duration: .4}, t4);
  hide('#ui,#meter,#maybe', t4, .3);
  const tSl = Wt('s2_12', 'kuma', 0, .1); pop('#slot', tSl, 510, 410); sfx('slot', tSl, .45);
  tl.to('.slotx', {y: 30, opacity: .3, duration: .08, yoyo: true, repeat: 9, stagger: .05}, tSl + .3);
  const tBe = Wt('s2_12', 'bildirimlerini', 0, .45); pop('#bell', tBe, 1350, 380); sfx('notif', tBe, .5);
  tl.to('#bell', {rotation: 12, svgOrigin: '1350 220', duration: .1, yoyo: true, repeat: 9}, tBe + .3);
  wipeOut('#140F3A', .5);
})();
