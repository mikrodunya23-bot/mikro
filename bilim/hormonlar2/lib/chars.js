// Characters (original flat-vector design): Ahmet, Meryem, x-ray body, cat.
// Local character space: 400 x 900, feet at y≈890, head centre (200,240).
const MERYEM = {kind: 'f', skin: '#F9C3B8', skinD: '#E89A97', nose: '#F2909A', hair: '#F7D27A', hairD: '#E3B356', brow: '#E9B95A',
  shirt: '#36C2C9', shirtD: '#249EA6', coat: '#F6F3FB', coatD: '#DCD6EC', pants: '#5C4A8E', pantsD: '#4C3C7A', shoes: '#2C2350', mouth: '#9B2F66'};
const AHMET = {kind: 'm', skin: '#E9B48C', skinD: '#C98C68', nose: '#D98A72', hair: '#3A2621', hairD: '#2A1A16', brow: '#2E1D19',
  shirt: '#F3A53A', shirtD: '#D9882A', pants: '#2F4A7E', pantsD: '#263D6A', shoes: '#1D2340', mouth: '#7A2E3A'};
const NUMAN = {kind: 'm', skin: '#C98E6A', skinD: '#A8704E', nose: '#B87A5C', hair: '#1E1412', hairD: '#140D0B', brow: '#1E1412',
  shirt: '#4CB572', shirtD: '#3A9A5C', pants: '#3A3A4E', pantsD: '#2E2E40', shoes: '#1D1D2A', mouth: '#6A2A30'};
const GHOST = {kind: 'm', skin: '#8E8AA8', skinD: '#77738F', nose: '#77738F', hair: '#5E5A78', hairD: '#5E5A78', brow: '#5E5A78',
  shirt: '#6E6A88', shirtD: '#5E5A78', pants: '#55516E', pantsD: '#4A4662', shoes: '#3A3650', mouth: '#4A4662'};
function xrayPal(c = '#2D6BFF') { return {kind: 'f', skin: c, skinD: c, nose: c, hair: c, hairD: c, brow: c, shirt: c, shirtD: c, coat: c, coatD: c, pants: c, pantsD: c, shoes: c, mouth: c, xray: true}; }

function char(id, P, o = {}) {
  const f = P.kind === 'f', sleeve = P.coat || P.shirt, sleeveD = P.coatD || P.shirtD;
  let s = `<g id="${id}">`;
  if (f) s += `<g id="${id}-hairBack"><rect x="94" y="108" width="212" height="334" rx="96" fill="${P.hair}"/><rect x="250" y="210" width="56" height="228" rx="28" fill="${P.hairD}"/></g>`;
  s += `<g id="${id}-legs"><g id="${id}-legL"><rect x="148" y="598" width="46" height="272" rx="22" fill="${P.pants}"/><ellipse cx="163" cy="878" rx="40" ry="20" fill="${P.shoes}"/></g>`;
  s += `<g id="${id}-legR"><rect x="206" y="598" width="46" height="272" rx="22" fill="${P.pantsD}"/><ellipse cx="237" cy="878" rx="40" ry="20" fill="${P.shoes}"/></g></g>`;
  s += `<g id="${id}-armR"><rect x="264" y="392" width="44" height="214" rx="22" fill="${sleeveD}"/><circle cx="286" cy="610" r="24" fill="${P.skin}"/>${o.rightHand || ''}</g>`;
  s += `<g id="${id}-body"><path d="M122,428 Q122,378 168,374 L232,374 Q278,378 278,428 L272,642 L128,642 Z" fill="${P.shirt}"/>`;
  if (P.coat) {
    s += `<path d="M118,428 Q118,378 168,374 L186,374 L201,478 L197,654 L122,654 Z" fill="${P.coat}"/>` +
      `<path d="M282,428 Q282,378 232,374 L214,374 L199,478 L203,654 L278,654 Z" fill="${P.coatD}"/>` +
      `<path d="M168,376 L186,376 L196,450 L160,410 Z" fill="${P.coatD}"/><path d="M232,376 L214,376 L204,450 L240,410 Z" fill="${P.coat}"/>` +
      `<rect x="142" y="560" width="40" height="10" rx="5" fill="${P.coatD}"/>`;
  } else {
    s += `<path d="M160,376 Q200,420 240,376 Z" fill="${P.shirtD}"/><rect x="150" y="548" width="100" height="56" rx="20" fill="${P.shirtD}"/>` +
      (P.xray ? '' : `<rect x="182" y="392" width="7" height="60" rx="3.5" fill="#fff" opacity=".85"/><rect x="211" y="392" width="7" height="60" rx="3.5" fill="#fff" opacity=".85"/>`);
  }
  s += `</g><rect x="178" y="318" width="44" height="66" rx="14" fill="${P.skinD}"/>`;
  s += `<g id="${id}-armL"><rect x="92" y="392" width="44" height="214" rx="22" fill="${sleeve}"/><circle cx="114" cy="610" r="24" fill="${P.skin}"/>${o.leftHand || ''}</g>`;
  s += o.organs || '';
  s += `<g id="${id}-head">`;
  s += `<circle cx="116" cy="250" r="22" fill="${P.skin}"/><circle cx="117" cy="252" r="10" fill="${P.skinD}"/><circle cx="284" cy="250" r="22" fill="${P.skin}"/><circle cx="283" cy="252" r="10" fill="${P.skinD}"/>`;
  s += `<rect x="118" y="138" width="164" height="202" rx="74" fill="${P.skin}"/>`;
  if (!P.xray) s += `<path d="M282,230 Q284,318 230,338 Q262,300 266,232Z" fill="${P.skinD}" opacity=".45"/>`;
  if (f) s += `<path d="M108,252 Q98,102 200,100 Q304,102 294,252 L282,214 Q262,160 196,158 Q150,160 128,202 Q118,224 118,252 Z" fill="${P.hair}"/>` +
    `<rect x="268" y="190" width="32" height="236" rx="16" fill="${P.hair}"/><rect x="102" y="192" width="30" height="206" rx="15" fill="${P.hair}"/>` +
    (P.xray ? '' : `<path d="M150,128 Q182,112 226,116 Q190,124 160,146Z" fill="#FFF0B8" opacity=".8"/>`);
  else s += `<path d="M110,236 Q102,118 196,108 Q264,100 294,150 Q304,192 290,236 L280,198 Q248,170 196,174 Q150,176 124,208 Z" fill="${P.hair}"/>` +
    `<path d="M140,134 Q196,64 270,112 Q236,100 206,124 Q178,112 140,134Z" fill="${P.hair}"/><rect x="113" y="200" width="16" height="50" rx="8" fill="${P.hair}"/><rect x="271" y="200" width="16" height="50" rx="8" fill="${P.hair}"/>` +
    (P.xray ? '' : `<path d="M220,120 Q250,112 272,132 Q248,124 226,130Z" fill="#6A4A40"/>`);
  if (!P.xray) {
    const K = '#3B2C4A', M = P.mouth;
    s += `<g id="${id}-browL"><rect x="140" y="200" width="48" height="16" rx="8" fill="${P.brow}"/></g><g id="${id}-browR"><rect x="212" y="200" width="48" height="16" rx="8" fill="${P.brow}"/></g>`;
    s += `<g id="${id}-e-dot"><circle cx="164" cy="242" r="9.5" fill="${K}"/><circle cx="236" cy="242" r="9.5" fill="${K}"/></g>`;
    s += `<g id="${id}-e-big" opacity="0"><circle cx="164" cy="240" r="20" fill="#fff"/><circle cx="164" cy="242" r="7" fill="${K}"/><circle cx="236" cy="240" r="20" fill="#fff"/><circle cx="236" cy="242" r="7" fill="${K}"/></g>`;
    s += `<g id="${id}-e-heart" opacity="0">${heart(164, 240, 1.25, '#FF3D7F')}${heart(236, 240, 1.25, '#FF3D7F')}</g>`;
    s += `<g id="${id}-e-half" opacity="0"><rect x="148" y="238" width="34" height="9" rx="4.5" fill="${K}"/><rect x="218" y="238" width="34" height="9" rx="4.5" fill="${K}"/></g>`;
    s += `<g id="${id}-e-happy" opacity="0"><path d="M150,246 Q164,228 178,246" stroke="${K}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M222,246 Q236,228 250,246" stroke="${K}" stroke-width="8" fill="none" stroke-linecap="round"/></g>`;
    s += `<g id="${id}-e-sad" opacity="0"><path d="M150,238 Q164,252 178,238" stroke="${K}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M222,238 Q236,252 250,238" stroke="${K}" stroke-width="8" fill="none" stroke-linecap="round"/></g>`;
    s += `<g id="${id}-e-side" opacity="0"><circle cx="172" cy="242" r="9.5" fill="${K}"/><circle cx="244" cy="242" r="9.5" fill="${K}"/></g>`;
    s += `<ellipse cx="200" cy="278" rx="17" ry="12" fill="${P.nose}"/>`;
    s += `<g id="${id}-blush" opacity="0"><ellipse cx="148" cy="290" rx="21" ry="11" fill="#FF5C8D" opacity=".5"/><ellipse cx="252" cy="290" rx="21" ry="11" fill="#FF5C8D" opacity=".5"/></g>`;
    s += `<g id="${id}-tears" opacity="0"><path d="M160,258 Q152,280 160,300 Q168,280 160,258Z" fill="#7FD8FF"/><path d="M240,258 Q232,284 240,306 Q248,284 240,258Z" fill="#7FD8FF"/></g>`;
    s += `<g id="${id}-sweat" opacity="0"><path d="M276,170 Q264,196 276,210 Q290,196 276,170Z" fill="#9FE3FF"/></g>`;
    s += `<g id="${id}-m-neutral"><rect x="184" y="308" width="32" height="8" rx="4" fill="${M}"/></g>`;
    s += `<g id="${id}-m-smile" opacity="0"><path d="M172,302 Q200,334 228,302 Q200,316 172,302Z" fill="${M}"/></g>`;
    s += `<g id="${id}-m-grin" opacity="0"><path d="M166,300 Q200,348 234,300 Z" fill="${M}"/><path d="M182,318 Q200,334 218,318 Q200,322 182,318Z" fill="#FF8FB0"/></g>`;
    s += `<g id="${id}-m-o" opacity="0"><ellipse cx="200" cy="314" rx="12" ry="16" fill="${M}"/></g>`;
    s += `<g id="${id}-m-scream" opacity="0"><path d="M158,334 Q156,290 200,290 Q244,290 242,334 Q222,318 200,320 Q178,318 158,334Z" fill="${M}"/><path d="M178,326 Q200,312 222,326 Q200,322 178,326Z" fill="#FF7FA6"/></g>`;
    s += `<g id="${id}-m-flat" opacity="0"><path d="M180,314 Q200,309 220,314" stroke="${M}" stroke-width="8" fill="none" stroke-linecap="round"/></g>`;
    s += `<g id="${id}-m-sad" opacity="0"><path d="M178,320 Q200,302 222,320" stroke="${M}" stroke-width="8" fill="none" stroke-linecap="round"/></g>`;
    s += `<g id="${id}-m-wavy" opacity="0"><path d="M174,314 q7,-8 13,0 t13,0 t13,0 t13,0" stroke="${M}" stroke-width="7" fill="none" stroke-linecap="round"/></g>`;
  }
  s += `</g></g>`;
  return s;
}
const MOUTHS = ['neutral', 'smile', 'grin', 'o', 'scream', 'flat', 'sad', 'wavy'], EYES = ['dot', 'big', 'heart', 'half', 'happy', 'sad', 'side'];
function face(id, o, t) {
  if (o.m) MOUTHS.forEach(m => tl.set(`#${id}-m-${m}`, {opacity: m === o.m ? 1 : 0}, t));
  if (o.e) EYES.forEach(e => tl.set(`#${id}-e-${e}`, {opacity: e === o.e ? 1 : 0}, t));
  if (o.blush !== undefined) tl.to(`#${id}-blush`, {opacity: o.blush ? 1 : 0, duration: .3}, t);
  if (o.tears !== undefined) tl.to(`#${id}-tears`, {opacity: o.tears ? 1 : 0, duration: .3}, t);
  if (o.sweat !== undefined) tl.to(`#${id}-sweat`, {opacity: o.sweat ? 1 : 0, duration: .2}, t);
  if (o.brow !== undefined) { tl.to(`#${id}-browL`, {y: o.brow, rotation: o.browRot || 0, svgOrigin: '164 208', duration: .2}, t); tl.to(`#${id}-browR`, {y: o.brow, rotation: -(o.browRot || 0), svgOrigin: '236 208', duration: .2}, t); }
}
// placed character: outer static transform + inner animatable wrapper (#<id>W)
function person(id, P, x, y, s = .95, o = {}) { return `<g transform="translate(${x},${y}) scale(${s})"><g id="${id}W">${char(id, P, o)}</g></g>`; }
// screen position of a point given in character-local coords for a placed person
const at = (x, y, s, lx, ly) => [x + lx * s, y + ly * s];
// limb helpers (rotation around shoulder / hip)
const arm = (id, side, rot, t, d = .3, ease = 'power2.out') => tl.to(`#${id}-arm${side}`, {rotation: rot, svgOrigin: side === 'L' ? '114 400' : '286 400', duration: d, ease}, t);
const armSet = (id, side, rot, t) => tl.set(`#${id}-arm${side}`, {rotation: rot, svgOrigin: side === 'L' ? '114 400' : '286 400'}, t);
const headTilt = (id, rot, t, d = .4) => tl.to(`#${id}-head`, {rotation: rot, svgOrigin: '200 330', duration: d}, t);
function walk(id, t, d, dx, step = .26, armsToo = true) {
  const n = Math.max(1, Math.round(d / step) - 1);
  tl.to(`#${id}W`, {x: `+=${dx}`, duration: d, ease: 'none'}, t);
  tl.to(`#${id}-legL`, {rotation: 15, svgOrigin: '171 600', duration: step, repeat: n, yoyo: true, ease: 'sine.inOut'}, t);
  tl.to(`#${id}-legR`, {rotation: -15, svgOrigin: '229 600', duration: step, repeat: n, yoyo: true, ease: 'sine.inOut'}, t);
  if (armsToo) { tl.to(`#${id}-armL`, {rotation: -11, svgOrigin: '114 400', duration: step, repeat: n, yoyo: true}, t); tl.to(`#${id}-armR`, {rotation: 11, svgOrigin: '286 400', duration: step, repeat: n, yoyo: true}, t); }
  tl.to(`#${id}W`, {y: -9, duration: step / 2, repeat: n * 2 + 1, yoyo: true}, t);
  tl.set(`#${id}-legL,#${id}-legR`, {rotation: 0}, t + d); if (armsToo) tl.set(`#${id}-armL,#${id}-armR`, {rotation: 0}, t + d); tl.set(`#${id}W`, {y: 0}, t + d);
}
// seated look: legs foreshortened (front view on a bench)
function sit(id, t) { tl.set(`#${id}-legs`, {scaleY: .42, svgOrigin: '200 600'}, t); tl.set(`#${id}W`, {y: 155}, t); }
function breathe(id, t, d, amt = 1.015) { tl.to(`#${id}-body`, {scaleY: amt, svgOrigin: '200 640', duration: 1.6, repeat: Math.max(0, Math.round(d / 1.6) - 1), yoyo: true, ease: 'sine.inOut'}, t); }

// ---- props held in hand (drawn around the hand at local (286,610) / (114,610)) ----
const phoneProp = (cx, cy, glow = true) => `<g><rect x="${cx - 26}" y="${cy - 48}" width="52" height="92" rx="10" fill="#1E1B3A"/><rect x="${cx - 21}" y="${cy - 40}" width="42" height="72" rx="6" fill="${glow ? '#8FD6FF' : '#3A3660'}"/></g>`;
const bagProp = (cx, cy) => `<g><path d="M${cx - 40},${cy} Q${cx - 62},${cy + 90} ${cx},${cy + 104} Q${cx + 62},${cy + 90} ${cx + 40},${cy} Q${cx},${cy - 18} ${cx - 40},${cy}Z" fill="#33405E"/><path d="M${cx - 14},${cy - 6} L${cx - 24},${cy - 34} L${cx},${cy - 18} L${cx + 24},${cy - 34} L${cx + 14},${cy - 6}Z" fill="#33405E"/></g>`;

// ---- cat ----
const CAT = {o: '#F28C38', d: '#D2681C', b: '#FFE0B5', n: '#FF7FA6', k: '#3B2C4A'};
function catJump(id) {
  const C = CAT;
  return `<g id="${id}"><path d="M-150,-10 L-200,-120 L-170,-112 L-196,-190 L-160,-150 L-150,-215 L-128,-140 Z" fill="${C.d}"/>` +
    `<path d="M-160,20 Q-170,-90 -40,-100 Q90,-110 110,-20 Q120,40 40,60 Q-130,80 -160,20Z" fill="${C.o}"/>` +
    `<path d="M-150,0 L-170,-30 L-140,-20 L-150,-60 L-120,-34 L-110,-80 L-90,-40 L-70,-96 L-50,-50 L-20,-104 L0,-56 L30,-100 L40,-50 L70,-90 L70,-40" fill="${C.o}"/>` +
    `<rect x="-150" y="30" width="34" height="120" rx="17" fill="${C.d}" transform="rotate(25 -133 30)"/><rect x="-60" y="40" width="34" height="120" rx="17" fill="${C.o}" transform="rotate(-10 -43 40)"/>` +
    `<rect x="40" y="30" width="34" height="120" rx="17" fill="${C.o}" transform="rotate(-35 57 30)"/><rect x="80" y="0" width="34" height="110" rx="17" fill="${C.d}" transform="rotate(-60 97 0)"/>` +
    `<g transform="translate(120,-60)"><path d="M-70,-40 L-60,-120 L-20,-70Z" fill="${C.o}"/><path d="M70,-40 L60,-120 L20,-70Z" fill="${C.o}"/><path d="M-56,-56 L-52,-100 L-30,-72Z" fill="${C.n}"/><path d="M56,-56 L52,-100 L30,-72Z" fill="${C.n}"/>` +
    `<circle r="82" fill="${C.o}"/><ellipse cx="0" cy="34" rx="50" ry="36" fill="${C.b}"/>` +
    `<circle cx="-32" cy="-14" r="22" fill="#FFF7C2"/><circle cx="32" cy="-14" r="22" fill="#FFF7C2"/><ellipse cx="-32" cy="-14" rx="5" ry="17" fill="${C.k}"/><ellipse cx="32" cy="-14" rx="5" ry="17" fill="${C.k}"/>` +
    `<path d="M-30,-48 L-6,-36 M30,-48 L6,-36" stroke="${C.k}" stroke-width="8" stroke-linecap="round"/>` +
    `<path d="M-30,30 Q0,10 30,30 Q30,62 0,64 Q-30,62 -30,30Z" fill="${C.k}"/><path d="M-22,28 L-16,44 L-10,30Z M22,28 L16,44 L10,30Z" fill="#fff"/><ellipse cx="0" cy="16" rx="10" ry="7" fill="${C.n}"/>` +
    `<path d="M-50,22 L-110,10 M-50,32 L-112,38 M50,22 L110,10 M50,32 L112,38" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".9"/></g></g>`;
}
function catSit(id) {
  const C = CAT;
  return `<g id="${id}"><path d="M70,90 Q160,90 150,20 Q144,-20 120,-10 Q136,30 110,60 Q90,74 60,70Z" fill="${C.d}"/>` +
    `<path d="M-80,100 Q-100,-40 0,-50 Q100,-40 80,100Z" fill="${C.o}"/><ellipse cx="0" cy="40" rx="44" ry="56" fill="${C.b}"/>` +
    `<rect x="-50" y="60" width="34" height="44" rx="17" fill="${C.o}"/>` +
    `<g transform="translate(0,-90)"><path d="M-62,-30 L-54,-104 L-16,-58Z" fill="${C.o}"/><path d="M62,-30 L54,-104 L16,-58Z" fill="${C.o}"/><path d="M-50,-44 L-47,-86 L-26,-60Z" fill="${C.n}"/><path d="M50,-44 L47,-86 L26,-60Z" fill="${C.n}"/>` +
    `<circle r="74" fill="${C.o}"/><ellipse cx="0" cy="28" rx="44" ry="32" fill="${C.b}"/>` +
    `<g id="${id}-eyesC"><path d="M-46,-8 Q-30,4 -14,-8 M14,-8 Q30,4 46,-8" stroke="${C.k}" stroke-width="7" fill="none" stroke-linecap="round"/></g>` +
    `<g id="${id}-eyesO" opacity="0"><circle cx="-30" cy="-8" r="16" fill="#FFF7C2"/><circle cx="30" cy="-8" r="16" fill="#FFF7C2"/><ellipse cx="-30" cy="-8" rx="6" ry="12" fill="${C.k}"/><ellipse cx="30" cy="-8" rx="6" ry="12" fill="${C.k}"/></g>` +
    `<ellipse cx="0" cy="14" rx="9" ry="6" fill="${C.n}"/><path d="M-12,26 Q0,34 0,24 Q0,34 12,26" stroke="${C.k}" stroke-width="4" fill="none" stroke-linecap="round"/>` +
    `<ellipse id="${id}-tongue" cx="18" cy="38" rx="7" ry="9" fill="${C.n}" opacity="0"/>` +
    `<path d="M-44,20 L-100,12 M-44,30 L-100,36 M44,20 L100,12 M44,30 L100,36" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".9"/></g>` +
    `<g id="${id}-paw"><rect x="16" y="-10" width="34" height="96" rx="17" fill="${C.o}"/></g></g>`;
}
const binSvg = (id) => `<g id="${id}"><path d="M-110,0 L-92,-250 L92,-250 L110,0Z" fill="#3E9B6E"/><path d="M40,-250 L92,-250 L110,0 L56,0Z" fill="#2F7E58"/>` +
  `<rect x="-60" y="-210" width="16" height="180" rx="8" fill="#2F7E58"/><rect x="-8" y="-210" width="16" height="180" rx="8" fill="#2F7E58"/><rect x="-104" y="-262" width="208" height="24" rx="12" fill="#56B886"/></g>`;
const lidSvg = (id) => `<g id="${id}"><ellipse cx="0" cy="0" rx="118" ry="26" fill="#56B886"/><ellipse cx="0" cy="-6" rx="96" ry="18" fill="#6CCB98"/><rect x="-26" y="-34" width="52" height="20" rx="10" fill="#2F7E58"/></g>`;

// lip-flap from the line's loudness envelope (30 values per second); closed/open mouth names
function talk(id, lineId, open = 'o', closed = 'smile', from = null) {
  const env = (window.TIMING.env || {})[lineId] || []; const t0 = T(lineId), t1 = E(lineId);
  SEEKERS.push(t => {
    if (t < t0 || t > t1 + .2) return;
    const v = t > t1 ? 0 : (env[Math.floor((t - t0) * 30)] || 0);
    const m = v > .32 ? open : v > .12 ? (open === 'scream' ? 'o' : 'smile') : closed;
    MOUTHS.forEach(k => { const e = document.getElementById(`${id}-m-${k}`); if (e) e.style.opacity = k === m ? 1 : 0; });
  });
}
