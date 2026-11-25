// Anatomy components: brain (side view), synapse close-up, x-ray body organs, blood-vessel tunnel, molecule mascots.

// ---------- BRAIN, side view (local 0..1000 x 0..820, face to the right) ----------
const BR = { // region centres (local)
  pfc: [745, 235], acc: [610, 255], caud: [560, 300], thal: [500, 335], hypo: [585, 388], pit: [602, 438],
  amyg: [655, 412], nacc: [640, 352], vta: [528, 410], vis: [235, 330], insula: [425, 395], eye: [872, 362],
  cer: [330, 522], stem: [535, 560], spine: [532, 800]
};
const BR_PATH = {
  vis: 'M872,362 C760,384 600,362 500,335 C400,305 300,322 235,330',
  low: 'M500,335 C560,352 612,382 655,412',
  meso: 'M528,410 C580,392 612,372 640,352 C700,312 728,272 745,235',
  meso2: 'M528,410 C560,360 552,322 560,300',
  down: 'M585,388 C560,432 532,482 532,560 L532,820',
  up: 'M532,820 L532,560 C532,480 505,400 500,335',
  hp: 'M585,388 L602,438',
  oxyA: 'M602,438 C630,440 645,430 655,412',
  oxyN: 'M602,438 C640,420 640,380 640,352',
  v2r: 'M235,330 C300,430 430,450 528,410',
};
const BR_PINK = {stem: '#E57AA3', cer: '#F48AB4', cerL: '#D9689A', cb: '#FFA3C7', gy: '#E7799F', cc: '#F7C6DA', mk: '#E86598'};
const BR_GRAY = {stem: '#8A8FA3', cer: '#9CA1B5', cerL: '#7D8296', cb: '#B9BDCB', gy: '#9599AC', cc: '#D3D6E0', mk: '#8E93A7'};
function brainSide(id, x, y, s, o = {}) {
  const skin = o.skin || '#E9B48C', skinD = o.skinD || '#C98C68', C = o.pal || BR_PINK;
  let g = `<g id="${id}" transform="translate(${x},${y}) scale(${s})">`;
  if (o.head !== false) g += `<path id="${id}-head" d="M300,80 C520,0 820,40 880,230 C900,290 905,330 900,360 L955,452 L906,472 C916,500 906,520 896,532 C906,560 892,590 870,602 C852,660 792,682 722,672 L704,820 L430,820 C420,720 300,690 230,640 C110,560 90,300 170,170 C210,120 250,95 300,80Z" fill="${skin}" opacity="${o.headOp ?? 1}"/>` +
    (o.hair === false ? '' : `<path d="M170,170 C250,60 520,-10 760,60 C840,90 880,160 890,215 C800,150 600,110 420,140 C300,160 220,230 190,330 C160,280 150,220 170,170Z" fill="${o.hair || '#3A2621'}" opacity="${o.headOp ?? 1}"/>`) +
    `<path d="M906,472 L955,452 L900,360 C905,400 912,440 906,472Z" fill="${skinD}" opacity="${(o.headOp ?? 1) * .6}"/>`;
  g += `<g id="${id}-brain"><ellipse cx="520" cy="300" rx="380" ry="260" fill="#1A1240" opacity="${o.window ?? .55}"/>` +
    `<path d="M510,430 C495,520 505,610 512,700 L556,700 C558,610 566,520 580,440Z" fill="${C.stem}"/><rect x="514" y="690" width="38" height="140" rx="16" fill="${C.stem}"/>` +
    `<ellipse cx="330" cy="522" rx="108" ry="64" fill="${C.cer}"/><path d="M240,505 Q330,480 420,505 M236,530 Q330,505 426,530 M250,555 Q330,532 410,555" stroke="${C.cerL}" stroke-width="7" fill="none" stroke-linecap="round"/>` +
    `<path d="M200,360 C170,200 330,92 520,95 C700,100 832,170 842,300 C850,382 792,424 720,432 C662,472 600,472 560,442 C520,472 400,482 330,472 C250,462 210,422 200,360Z" fill="${C.cb}"/>` +
    `<path d="M280,210 Q340,170 400,200 M450,150 Q520,120 560,170 M620,150 Q700,160 730,210 M300,300 Q350,260 420,290 M640,300 Q720,280 790,320 M260,400 Q320,380 380,420 M700,380 Q760,360 800,390 M480,200 Q520,240 600,220" stroke="${C.gy}" stroke-width="10" fill="none" stroke-linecap="round"/>` +
    `<path d="M380,300 C450,252 600,242 690,292" stroke="${C.cc}" stroke-width="22" fill="none" stroke-linecap="round"/>`;
  // landmarks (faint)
  g += `<g id="${id}-marks" opacity="${o.marks ?? .55}">` +
    `<ellipse cx="610" cy="255" rx="72" ry="20" fill="${C.mk}" transform="rotate(-8 610 255)"/>` +
    `<ellipse cx="560" cy="300" rx="48" ry="20" fill="${C.mk}" transform="rotate(-15 560 300)"/>` +
    `<circle cx="500" cy="335" r="34" fill="${C.mk}"/><circle cx="585" cy="388" r="22" fill="${C.mk}"/>` +
    `<path d="M585,400 L598,428" stroke="${C.mk}" stroke-width="9"/><circle cx="602" cy="440" r="15" fill="${C.mk}"/>` +
    `<ellipse cx="655" cy="412" rx="26" ry="17" fill="${C.mk}" transform="rotate(-20 655 412)"/><circle cx="640" cy="352" r="20" fill="${C.mk}"/>` +
    `<circle cx="528" cy="410" r="18" fill="${C.mk}"/><ellipse cx="425" cy="395" rx="52" ry="24" fill="${C.mk}"/></g>`;
  // pathways (hidden until drawn)
  for (const k in BR_PATH) g += `<path id="${id}-p-${k}" d="${BR_PATH[k]}" fill="none" stroke="${o.pathColor || '#9FE3FF'}" stroke-width="9" stroke-linecap="round" opacity="0"/>`;
  g += `</g>`;
  if (o.eye !== false && o.head !== false) g += `<g id="${id}-eye"><ellipse cx="872" cy="362" rx="24" ry="17" fill="#fff"/><circle cx="884" cy="362" r="10" fill="#3B2C4A"/></g>`;
  g += `<g id="${id}-fx"></g></g>`;
  return g;
}
// screen coords of a brain region for a brain placed at (x,y,s)
const brPt = (x, y, s, name) => [x + BR[name][0] * s, y + BR[name][1] * s];
// glow a region: adds a gradient circle into <id>-fx and animates it
function rglow(id, name, t, grad = 'gY', r = 70, opt = {}) {
  const gid = `${id}-g-${name}-${grad}`;
  if (!$('#' + gid)) add(`<circle id="${gid}" cx="${BR[name][0]}" cy="${BR[name][1]}" r="${r}" fill="url(#${grad})" opacity="0"/>`, $('#' + id + '-fx'));
  tl.to('#' + gid, {opacity: opt.op ?? 1, duration: opt.d ?? .35}, t);
  if (opt.pulse) tl.to('#' + gid, {scale: 1.35, svgOrigin: `${BR[name][0]} ${BR[name][1]}`, duration: .28, repeat: opt.pulse, yoyo: true}, t + .3);
  if (opt.off) tl.to('#' + gid, {opacity: 0, duration: .5}, opt.off);
  return '#' + gid;
}
// labelled tag for a region, in screen space
function rtag(parent, id, bx, by, bs, name, dx, dy, text, color, fg = '#fff', fs = 32) {
  const [px, py] = brPt(bx, by, bs, name);
  add(tag(id, px, py, px + dx, py + dy, text, color, fg, fs), parent);
  return '#' + id;
}
// draw + flow along a brain pathway; returns path selector
function brPath(id, name, t, d = .7, color) {
  const sel = `#${id}-p-${name}`;
  if (color) tl.set(sel, {attr: {stroke: color}}, 0);
  tl.set(sel, {opacity: .9}, t); drawPath(sel, t, d);
  return sel;
}
function brFlow(id, name, n, t0, t1, colors, opt = {}) { return flow($('#' + id + '-fx'), `#${id}-p-${name}`, n, t0, t1, Object.assign({colors, glow: true, r: 9}, opt)); }

// ---------- SYNAPSE close-up (screen space) ----------
const SYN_REC = [[760, 588], [860, 568], [960, 562], [1060, 568], [1160, 588]];
function synapse(id, col = '#FFE45C', o = {}) {
  let s = `<g id="${id}"><rect width="${W}" height="${H}" fill="${o.bg || '#170F3A'}"/>${rays(960, 500, 16, '#2A1F66', .45)}`;
  s += `<path d="M520,-40 C520,250 640,428 960,432 C1280,428 1400,250 1400,-40Z" fill="${o.pre || '#8B6BFF'}"/><path d="M560,-40 C560,240 660,400 960,404 C1260,400 1360,240 1360,-40" fill="none" stroke="#B9A4FF" stroke-width="10" opacity=".7"/>`;
  s += `<path d="M380,1120 C380,720 600,560 960,560 C1320,560 1540,720 1540,1120Z" fill="${o.post || '#4FA8FF'}"/><path d="M420,1120 C420,740 620,590 960,590 C1300,590 1500,740 1500,1120" fill="none" stroke="#9FD3FF" stroke-width="10" opacity=".7"/>`;
  SYN_REC.forEach(([x, y], i) => s += `<g id="${id}-rec${i}"><path d="M${x - 26},${y + 4} L${x - 26},${y - 22} L${x - 12},${y - 22} L${x - 12},${y - 6} L${x + 12},${y - 6} L${x + 12},${y - 22} L${x + 26},${y - 22} L${x + 26},${y + 4}Z" fill="#2E6FD8"/><circle id="${id}-recg${i}" cx="${x}" cy="${y - 10}" r="40" fill="url(#${o.grad || 'gY'})" opacity="0"/></g>`);
  const V = [[760, 250], [900, 180], [1050, 260], [1180, 160], [840, 330], [1010, 340], [700, 120], [1220, 280]];
  V.forEach(([x, y], i) => { s += `<g id="${id}-v${i}"><circle cx="${x}" cy="${y}" r="44" fill="#C9B8FF" opacity=".9"/><circle cx="${x}" cy="${y}" r="38" fill="#6A4FE0"/>`; for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; s += `<circle cx="${(x + Math.cos(a) * 18).toFixed(1)}" cy="${(y + Math.sin(a) * 18).toFixed(1)}" r="8" fill="${col}"/>`; } s += `</g>`; });
  s += `<rect id="${id}-wave" x="380" y="600" width="1160" height="60" fill="url(#${o.grad || 'gY'})" opacity="0"/>`;
  s += `<g id="${id}-fx"></g></g>`;
  return s;
}
// vesicles fuse and release `col` particles into receptors, starting at t
function synRelease(id, t, col = '#FFE45C', n = 46) {
  const fx = $('#' + id + '-fx');
  [0, 1, 2, 3, 4, 5].forEach((i, k) => { const t0 = t + k * .18; tl.to(`#${id}-v${i}`, {y: 395 - [250, 180, 260, 160, 330, 340][i], duration: .45, ease: 'power2.in'}, t0); tl.to(`#${id}-v${i}`, {scale: 0, opacity: 0, svgOrigin: `${[760, 900, 1050, 1180, 840, 1010][i]} ${[250, 180, 260, 160, 330, 340][i]}`, duration: .2}, t0 + .45); });
  let html = ''; for (let i = 0; i < n; i++) html += `<circle cx="0" cy="0" r="${7 + R() * 5}" fill="${col}" opacity="0" filter="url(#glow)"/>`;
  const g = add(`<g>${html}</g>`, fx);
  Array.from(g.children).forEach((c, i) => {
    const sx = 820 + R() * 280, rec = SYN_REC[i % SYN_REC.length], t0 = t + .5 + R() * 1.4;
    const mx = sx + (R() - .5) * 160, my = 470 + R() * 60;
    tl.set(c, {opacity: 1, attr: {cx: sx, cy: 430}}, t0);
    tl.to(c, {attr: {cx: mx, cy: my}, duration: .45, ease: 'power1.out'}, t0);
    if (i % 3 === 0) tl.to(c, {attr: {cx: rec[0] + (R() - .5) * 12, cy: rec[1] - 14}, duration: .4, ease: 'power1.in'}, t0 + .45);
    else tl.to(c, {attr: {cx: mx + (R() - .5) * 120, cy: my + (R() - .5) * 40}, duration: 1.2, ease: 'sine.inOut'}, t0 + .45);
    tl.to(c, {opacity: 0, duration: .4}, t0 + (i % 3 === 0 ? .85 : 1.5));
  });
  SYN_REC.forEach((_, i) => { tl.to(`#${id}-recg${i}`, {opacity: 1, duration: .25}, t + 1 + i * .12); tl.to(`#${id}-rec${i}`, {y: -6, duration: .15, yoyo: true, repeat: 3}, t + 1 + i * .12); });
  tl.set(`#${id}-wave`, {opacity: 0, y: 0}, t + 1.3); tl.to(`#${id}-wave`, {opacity: 1, duration: .2}, t + 1.4); tl.to(`#${id}-wave`, {y: 420, opacity: 0, duration: 1.4, ease: 'power1.in'}, t + 1.6);
}

// ---------- X-RAY BODY organs (character-local coords) ----------
const ORG = {brain: [200, 205], heart: [214, 452], lungL: [162, 445], lungR: [238, 445], liver: [168, 525], stomach: [236, 528],
  kidL: [168, 590], kidR: [232, 590], adrL: [168, 566], adrR: [232, 566], spine: [200, 500], eyeL: [164, 242], eyeR: [236, 242], skin: [116, 470]};
function organs(id) {
  return `<g id="${id}-org">` +
    `<path id="${id}-brainO" d="M140,215 C130,160 170,140 200,142 C240,140 272,165 262,215 C258,248 230,252 200,250 C170,252 144,248 140,215Z" fill="#FF9EC6" opacity=".95"/>` +
    `<rect id="${id}-spineO" x="194" y="330" width="12" height="300" rx="6" fill="#BFD4FF" opacity=".8"/>` +
    `<ellipse id="${id}-lungLO" cx="162" cy="445" rx="30" ry="56" fill="#8FD6FF" opacity=".85"/><ellipse id="${id}-lungRO" cx="238" cy="445" rx="30" ry="56" fill="#8FD6FF" opacity=".85"/>` +
    `<path id="${id}-heartO" d="M214,438 C210,426 192,426 192,442 C192,458 206,466 214,476 C222,466 236,458 236,442 C236,426 218,426 214,438Z" fill="#FF4D6D"/>` +
    `<path id="${id}-liverO" d="M132,512 Q170,496 206,510 Q200,540 168,546 Q136,544 132,512Z" fill="#B5523B"/>` +
    `<ellipse id="${id}-stomachO" cx="238" cy="528" rx="28" ry="22" fill="#FF9D7A"/>` +
    `<path d="M152,578 Q140,592 148,612 Q160,628 176,620 Q184,608 178,596 Q174,586 182,578 Q172,568 152,578Z" fill="#B45BFF"/><path d="M248,578 Q260,592 252,612 Q240,628 224,620 Q216,608 222,596 Q226,586 218,578 Q228,568 248,578Z" fill="#B45BFF"/>` +
    `<path id="${id}-adrLO" d="M150,576 Q160,552 184,570 Q170,580 150,576Z" fill="#FFB547"/><path id="${id}-adrRO" d="M250,576 Q240,552 216,570 Q230,580 250,576Z" fill="#FFB547"/>` +
    `<g id="${id}-orgfx"></g></g>`;
}
function bodyX(id, x, y, s, color = '#2D6BFF') {
  return `<g transform="translate(${x},${y}) scale(${s})"><g id="${id}W"><g filter="url(#glow)" opacity=".5">${char(id, xrayPal(color))}</g>${organs(id)}</g></g>`;
}
const orgPt = (x, y, s, name) => [x + ORG[name][0] * s, y + ORG[name][1] * s];

// ---------- BLOOD VESSEL TUNNEL (screen space) ----------
function tunnel(id, o = {}) {
  let s = `<g id="${id}"><rect width="${W}" height="${H}" fill="${o.bg || '#4A0718'}"/><circle cx="960" cy="540" r="900" fill="url(#gR)" opacity=".35"/>`;
  for (let i = 0; i < 12; i++) s += `<ellipse class="${id}-ring" cx="960" cy="540" rx="200" ry="120" fill="none" stroke="${i % 2 ? '#B3203F' : '#8E1530'}" stroke-width="40" opacity="0"/>`;
  for (let i = 0; i < 26; i++) { const a = R() * Math.PI * 2; s += `<g class="${id}-cell" data-a="${a.toFixed(3)}" opacity="0"><ellipse cx="0" cy="0" rx="34" ry="30" fill="#E8344F"/><ellipse cx="0" cy="0" rx="15" ry="12" fill="#B81C38"/></g>`; }
  s += `<g id="${id}-fx"></g></g>`;
  return s;
}
function tunnelRun(id, t0, t1, speed = 1) {
  const rings = $$(`.${id}-ring`), cells = $$(`.${id}-cell`), per = 1.6 / speed;
  rings.forEach((r, i) => { const off = (i / rings.length) * per; tl.set(r, {opacity: 1}, t0); tl.fromTo(r, {scale: .05, svgOrigin: '960 540', opacity: .2}, {scale: 9, opacity: 1, duration: per, ease: 'power2.in', repeat: Math.ceil((t1 - t0) / per), immediateRender: false}, t0 + off); });
  cells.forEach((c, i) => {
    const a = +c.dataset.a, off = R() * per * 1.4, rr = 520 + R() * 500;
    tl.fromTo(c, {x: 960 + Math.cos(a) * 30, y: 540 + Math.sin(a) * 18, scale: .1, opacity: 1}, {x: 960 + Math.cos(a) * rr, y: 540 + Math.sin(a) * rr * .65, scale: 2.4, rotation: R() * 180, duration: per * 1.4, ease: 'power2.in', repeat: Math.ceil((t1 - t0) / (per * 1.4)), immediateRender: false}, t0 + off);
  });
  tl.set(`.${id}-ring, .${id}-cell`, {opacity: 0}, t1);
}

// ---------- MOLECULE MASCOTS (local centred at 0,0, ~200px) ----------
function hexPts(r, rot = 0) { let p = []; for (let i = 0; i < 6; i++) { const a = Math.PI / 3 * i + rot; p.push(`${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`); } return p.join(' '); }
function mol(id, kind) {
  if (kind === 'dopa') return `<g id="${id}"><circle r="150" fill="url(#gY)" opacity=".55"/><polygon points="${hexPts(62, Math.PI / 6)}" fill="none" stroke="#FFE45C" stroke-width="18" stroke-linejoin="round"/>` +
    `<path d="M54,-30 L110,-62 L160,-34" stroke="#FFE45C" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="160" cy="-34" r="20" fill="#FFF7B0"/>` +
    `<path d="M-54,-30 L-96,-56" stroke="#FFE45C" stroke-width="16" stroke-linecap="round"/><circle cx="-100" cy="-58" r="18" fill="#FFF7B0"/><path d="M-54,30 L-96,56" stroke="#FFE45C" stroke-width="16" stroke-linecap="round"/><circle cx="-100" cy="58" r="18" fill="#FFF7B0"/>` +
    `<circle r="30" fill="#FFF3A0"/></g>`;
  if (kind === 'adr') return `<g id="${id}"><circle r="150" fill="url(#gR)" opacity=".6"/><polygon points="${hexPts(62, Math.PI / 6)}" fill="none" stroke="#FF4B4B" stroke-width="18" stroke-linejoin="round"/>` +
    `<path d="M54,-30 L96,-70 L80,-20 L130,-50 L118,-4" stroke="#FFB0B0" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="118" cy="-4" r="18" fill="#FFD0D0"/>` +
    `<path d="M-54,-30 L-96,-56" stroke="#FF4B4B" stroke-width="16" stroke-linecap="round"/><circle cx="-100" cy="-58" r="18" fill="#FFD0D0"/><path d="M-54,30 L-96,56" stroke="#FF4B4B" stroke-width="16" stroke-linecap="round"/><circle cx="-100" cy="58" r="18" fill="#FFD0D0"/>` +
    `<path d="M-14,-26 L10,-4 L-6,4 L14,28" stroke="#FFE0E0" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  // oxytocin: ring of beads (peptide) with a heart
  let s = `<g id="${id}"><circle r="160" fill="url(#gP)" opacity=".55"/>`;
  for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2 - Math.PI / 2; s += `<circle cx="${(Math.cos(a) * 82).toFixed(1)}" cy="${(Math.sin(a) * 82).toFixed(1)}" r="26" fill="${i % 2 ? '#FF7FB0' : '#FFB3D1'}"/>`; }
  return s + `${heart(0, -4, 2.2, '#FF4F92')}</g>`;
}
