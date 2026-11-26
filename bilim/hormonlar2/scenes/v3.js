// V3 — 12:03 "Typing…": Miraç checks the phone 47 times; uncertainty drives dopamine; message arrives; serotonin bonus.
(function () {
  wipeIn('#1E1A55', .4); hudClock('12:03', .1);
  const AX = 260, AY = 170, AS = .95;
  A(`<rect width="${W}" height="${H}" fill="#F6E3C8"/><rect y="760" width="${W}" height="320" fill="#D9B98F"/><rect x="900" y="160" width="300" height="220" rx="16" fill="#9ED8FF"/><rect x="1045" y="160" width="10" height="220" fill="#F6E3C8"/>` +
    `<g id="sofa"><rect x="120" y="600" width="900" height="260" rx="60" fill="#E8536B"/><rect x="120" y="520" width="900" height="140" rx="60" fill="#F06A80"/></g>` +
    `<g id="mW0">${person('mi', AHMET, AX, AY, AS, {rightHand: phoneProp(286, 590)})}</g><rect x="120" y="700" width="900" height="160" rx="50" fill="#E8536B"/>`);
  armSet('mi', 'R', 42, 0); face('mi', {e: 'side', m: 'flat'}, 0);
  // phone UI
  const PX = 1180, PY = 120;
  A(`<g id="ui"><rect x="${PX}" y="${PY}" width="460" height="820" rx="56" fill="#15132E"/><rect x="${PX + 20}" y="${PY + 20}" width="420" height="780" rx="40" fill="#F2F4FF"/>` +
    `<rect x="${PX + 20}" y="${PY + 20}" width="420" height="130" rx="40" fill="#5B5BD6"/><rect x="${PX + 20}" y="${PY + 110}" width="420" height="40" fill="#5B5BD6"/>` +
    `<g transform="translate(${PX + 40},${PY + 34}) scale(.3)"><clipPath id="cl2"><circle cx="200" cy="240" r="140"/></clipPath><g clip-path="url(#cl2)">${char('yav', MERYEM)}</g></g>` +
    `<text class="lbl" x="${PX + 150}" y="${PY + 90}" font-size="40" fill="#fff">Yasemin</text><text id="yaz" class="txt" x="${PX + 150}" y="${PY + 130}" font-size="24" fill="#E0E0FF" opacity="0">yazıyor…</text>` +
    `<g><rect x="${PX + 40}" y="${PY + 200}" width="380" height="80" rx="30" fill="#5B5BD6"/><text class="txt" x="${PX + 230}" y="${PY + 250}" text-anchor="middle" font-size="26" fill="#fff">Kahve için tekrar sağ ol 😅</text></g>` +
    `<g id="typing" opacity="0"><rect x="${PX + 40}" y="${PY + 320}" width="150" height="70" rx="30" fill="#DDE1F5"/>${[0, 1, 2].map(i => `<circle class="td" cx="${PX + 80 + i * 35}" cy="${PY + 355}" r="11" fill="#7A7FA8"/>`).join('')}</g>` +
    `<g id="msg" opacity="0"><rect x="${PX + 40}" y="${PY + 320}" width="380" height="110" rx="30" fill="#DDE1F5"/><text class="txt" x="${PX + 230}" y="${PY + 365}" text-anchor="middle" font-size="28" fill="#2A2A4A">Akşam yürüyüşe</text><text class="txt" x="${PX + 230}" y="${PY + 405}" text-anchor="middle" font-size="28" fill="#2A2A4A">çıkalım mı? 🙂</text></g></g>` +
    `<g id="cnt"><rect x="560" y="60" width="500" height="100" rx="50" fill="#0B0820" opacity=".8"/><text id="cntT" class="lbl" x="810" y="128" text-anchor="middle" font-size="44" fill="#FFE45C">telefona bakma: 1</text></g>` +
    `<g id="mini">${brainSide('bm', 1030 - 520 * .3, 430 - 300 * .3, .3, {head: false, window: 0, marks: .25})}</g>`);
  const cyc = [[T('h1_09') + .0, 1.6], [T('h1_09') + 3.1, 1.2], [T('h1_11') + 2.4, 1.4], [T('h1_11') + 5.0, 1.0]];
  cyc.forEach(([t, d], i) => {
    show('#typing,#yaz', t, .05); hide('#typing,#yaz', t + d, .05); tl.to('.td', {y: -10, duration: .16, stagger: .08, yoyo: true, repeat: Math.round(d / .32)}, t);
    rglow('bm', 'vta', t, 'gY', 90, {d: .15, off: t + d}); rglow('bm', 'nacc', t, 'gY', 80, {d: .15, off: t + d});
    face('mi', {e: 'big', m: 'grin'}, t); face('mi', {e: 'side', m: 'flat'}, t + d); tl.to('#mW0', {y: -40, duration: .15, yoyo: true, repeat: 1}, t); sfx('typing', t, .3, {dur: d});
  });
  counter('#cntT', T('h1_09'), E('h1_11'), 1, 47, v => 'telefona bakma: ' + v);
  talk('mi', 'h1_09', 'grin', 'flat');
  const tB = Wt('h1_11', 'belki', 0, .5); add(`<text id="bk" class="lbl" x="640" y="560" text-anchor="middle" font-size="90" fill="#FF4F92" opacity="0">BELKİ?!</text>`, root); pop('#bk', tB, 640, 530); sfx('swell', tB - .2, .4); hide('#bk', tB + 1.4, .2);
  // message arrives: falls off the sofa
  const tM = E('h1_11') + .1;
  show('#msg', tM); sfx('notif', tM, .6); face('mi', {e: 'heart', m: 'grin', blush: 1}, tM);
  tl.to('#mW0', {y: -120, rotation: -12, svgOrigin: '500 900', duration: .25, ease: 'power2.out'}, tM + .2); tl.to('#mW0', {y: 260, rotation: 25, duration: .35, ease: 'power2.in'}, tM + .45); sfx('thud', tM + .8, .6);
  // serotonin bonus: bars
  const t2 = T('h1_12') - .1;
  A(`<g id="bon" opacity="0"><rect x="300" y="180" width="760" height="560" rx="40" fill="#1E1B4A" opacity=".95"/><text class="lbl" x="680" y="260" text-anchor="middle" font-size="48" fill="#FFE45C">⭐ BONUS BİLGİ</text>` +
    `<rect x="420" y="320" width="120" height="340" rx="40" fill="#2A2660"/><rect id="bS" x="434" y="334" width="92" height="312" rx="32" fill="#3FD4C0"/><text class="lbl" x="480" y="710" text-anchor="middle" font-size="32" fill="#3FD4C0">SEROTONİN</text>` +
    `<text id="arS" class="lbl" x="620" y="520" font-size="120" fill="#3FD4C0" opacity="0">↓</text><text id="obs" class="lbl" x="840" y="470" text-anchor="middle" font-size="40" fill="#fff" opacity="0">saplantılı</text><text id="obs2" class="lbl" x="840" y="520" text-anchor="middle" font-size="40" fill="#fff" opacity="0">düşünceye benzer</text></g>`);
  pop('#bon', t2, 680, 460); hide('#ui', t2, .2); hide('#cnt', t2, .2);
  const lv = {s: 1}; tl.set(lv, {s: 1}, 0); SEEKERS.push(() => { const h = 312 * lv.s, e = $('#bS'); e.setAttribute('y', 334 + 312 - h); e.setAttribute('height', Math.max(20, h)); });
  const tSe = Wt('h1_12', 'serotonin', 0, .3); tl.to(lv, {s: .3, duration: 1.2}, tSe); show('#arS', tSe + .2, .2); sfx('down', tSe, .45);
  show('#obs,#obs2', Wt('h1_12', 'saplantılı', 0, .5), .3);
  const tN = Wt('h1_12', 'normal', 0, .9) - .4;
  add(`<g id="nrm" opacity="0"><rect x="1220" y="440" width="560" height="120" rx="60" fill="#3FD47A"/><text class="lbl" x="1500" y="520" text-anchor="middle" font-size="52" fill="#fff">✔ BİLİMSEL OLARAK NORMAL</text></g>`, root); pop('#nrm', tN, 1500, 500); sfx('ding', tN, .5);
  wipeOut('#0B1440', .45);
})();
