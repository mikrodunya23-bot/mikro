// ================= EPISODE 3: ink outlines =================
const inkCanvas = document.createElement('canvas'), ictx = inkCanvas.getContext('2d');
(() => {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('width', 0); svg.setAttribute('height', 0); svg.style.position = 'absolute';
  svg.innerHTML = `<filter id="ink" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
    <feComponentTransfer in="SourceAlpha" result="a"><feFuncA type="discrete" tableValues="0 0 0 0 0 0 1 1 1 1"/></feComponentTransfer>
    <feMorphology in="a" operator="dilate" radius="7" result="d"/>
    <feFlood flood-color="#241a3d" result="c"/><feComposite in="c" in2="d" operator="in"/></filter>`;
  document.body.appendChild(svg);
})();
let INK = true;
function inked(drawFn, x, y, R) {
  if (!INK) { drawFn(); return; }
  const m = ctx.getTransform(), p = m.transformPoint(new DOMPoint(x, y)), sc = Math.hypot(m.a, m.b), r = Math.ceil(R * sc) + 12;
  if (p.x < -r || p.x > W + r || p.y < -r || p.y > H + r) { drawFn(); return; }
  if (inkCanvas.width !== 2 * r || inkCanvas.height !== 2 * r) { inkCanvas.width = 2 * r; inkCanvas.height = 2 * r; } else { ictx.setTransform(1, 0, 0, 1, 0, 0); ictx.clearRect(0, 0, 2 * r, 2 * r); }
  ictx.setTransform(m.a, m.b, m.c, m.d, m.e - p.x + r, m.f - p.y + r);
  const saved = ctx, g = glow, sp = sparkle; ctx = ictx; glow = () => {}; sparkle = () => {};
  try { drawFn(); } finally { ctx = saved; glow = g; sparkle = sp; }
  ictx.setTransform(1, 0, 0, 1, 0, 0); ictx.globalCompositeOperation = 'source-in'; ictx.fillStyle = '#241a3d'; ictx.fillRect(0, 0, 2 * r, 2 * r); ictx.globalCompositeOperation = 'source-over';
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
  for (let k = 0; k < 12; k++) { const a = k / 12 * 6.2832; ctx.drawImage(inkCanvas, Math.round(p.x - r + Math.cos(a) * 6.5), Math.round(p.y - r + Math.sin(a) * 6.5)); }
  ctx.restore();
  drawFn();
}

// ================= EPISODE 3: new / upgraded characters =================
function tilkos(x, y, s, t, o = {}) {
  y += talkBob('tilkos', t);
  const mood = o.mood || 'sly';
  ctx.save(); ctx.translate(x, y); reg('tilkos', 0, -110 * s, s); ctx.rotate(o.rot || 0); ctx.scale(s * (o.flip ? -1 : 1), s);
  const wag = Math.sin(t * 4) * .12;
  // tail
  ctx.save(); ctx.translate(-40, 30); ctx.rotate(-.4 + wag);
  ctx.fillStyle = '#e8702a'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-90, 10, -170, -60, -150, -140); ctx.bezierCurveTo(-110, -110, -60, -60, 10, -20); ctx.fill();
  ctx.fillStyle = '#fff4e6'; ctx.beginPath(); ctx.moveTo(-120, -95); ctx.bezierCurveTo(-140, -110, -160, -120, -150, -140); ctx.bezierCurveTo(-130, -125, -115, -112, -100, -100); ctx.fill();
  ctx.restore();
  // legs/boots
  ctx.fillStyle = '#2b1d16'; rrect(-38, 50, 30, 36, 8); ctx.fill(); rrect(10, 50, 30, 36, 8); ctx.fill();
  // coat body
  ctx.fillStyle = '#b0213a'; ctx.beginPath(); ctx.moveTo(-55, -40); ctx.quadraticCurveTo(-70, 40, -50, 62); ctx.lineTo(55, 62); ctx.quadraticCurveTo(72, 40, 55, -40); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#fff4e6'; ctx.beginPath(); ctx.moveTo(-20, -40); ctx.lineTo(20, -40); ctx.lineTo(10, 40); ctx.lineTo(-10, 40); ctx.fill();
  ctx.fillStyle = '#f2c14e'; for (const yy of [-10, 15, 40]) { circ(-30, yy, 5); ctx.fill(); circ(30, yy, 5); ctx.fill(); }
  ctx.fillStyle = '#2b1d16'; rrect(-56, 22, 112, 12, 4); ctx.fill(); ctx.fillStyle = '#f2c14e'; rrect(-10, 20, 20, 16, 3); ctx.fill();
  // arms
  const gest = talking('tilkos', t) ? Math.sin(t * 7) * .4 : 0, up = o.armsUp ? -2.3 : 0;
  for (const sx of [-1, 1]) { ctx.save(); ctx.translate(sx * 52, -30); ctx.rotate(sx * (.5 + gest * (sx > 0 ? 1 : 0)) + sx * up * .5 * (o.armsUp ? 1 : 0) + (o.armsUp ? (sx > 0 ? -2.3 : 2.3) : 0) * 0); ctx.rotate(o.armsUp ? -sx * 2.4 : 0); ctx.fillStyle = '#b0213a'; ell(0, 28, 14, 32); ctx.fill(); ctx.fillStyle = '#e8702a'; circ(0, 60, 12); ctx.fill(); ctx.restore(); }
  if (o.hold === 'map') { ctx.save(); ctx.translate(60, -10); ctx.rotate(-.2); glow(0, 0, 120, '255,220,120', .5); ctx.fillStyle = '#f3e2b5'; ctx.beginPath(); ctx.moveTo(-40, -30); ctx.lineTo(35, -34); ctx.lineTo(42, 30); ctx.lineTo(-5, 22); ctx.lineTo(-38, 30); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#a0402a'; ctx.lineWidth = 3; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.moveTo(-28, 15); ctx.quadraticCurveTo(0, -25, 25, 5); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); }
  // head
  ctx.translate(0, -105);
  ctx.fillStyle = '#e8702a';
  for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * 18, -40); ctx.lineTo(sx * 60, -105); ctx.lineTo(sx * 66, -20); ctx.fill(); }
  ctx.fillStyle = '#3a2418'; for (const sx of [-1, 1]) { ctx.beginPath(); ctx.moveTo(sx * 32, -48); ctx.lineTo(sx * 57, -90); ctx.lineTo(sx * 60, -38); ctx.fill(); }
  ctx.fillStyle = '#e8702a'; ctx.beginPath(); ctx.moveTo(-72, -10); ctx.quadraticCurveTo(-70, -70, 0, -72); ctx.quadraticCurveTo(70, -70, 72, -10); ctx.quadraticCurveTo(60, 30, 0, 62); ctx.quadraticCurveTo(-60, 30, -72, -10); ctx.fill();
  ctx.fillStyle = '#fff4e6'; ctx.beginPath(); ctx.moveTo(-60, 0); ctx.quadraticCurveTo(-30, 10, 0, 6); ctx.quadraticCurveTo(30, 10, 60, 0); ctx.quadraticCurveTo(40, 40, 0, 62); ctx.quadraticCurveTo(-40, 40, -60, 0); ctx.fill();
  ctx.fillStyle = '#241a3d'; ell(0, 26, 12, 8); ctx.fill();
  const lk = o.look ?? lookAt('tilkos'), bl = blink(t, 8);
  // eye (right one), patch on left
  ctx.save(); ctx.translate(26 + lk[0] * 4, -18 + lk[1] * 3);
  if (mood === 'sly') { ctx.fillStyle = '#fff'; ell(0, 0, 15, 12); ctx.fill(); ctx.fillStyle = '#2a8a3a'; circ(lk[0] * 3, 2, 8); ctx.fill(); ctx.fillStyle = '#111'; circ(lk[0] * 3, 2, 4); ctx.fill(); ctx.fillStyle = '#e8702a'; ctx.fillRect(-18, -16, 36, 11); }
  else { ctx.scale(1, Math.max(.1, 1 - bl)); ctx.fillStyle = '#fff'; ell(0, 0, 15, mood === 'scared' ? 18 : 15); ctx.fill(); ctx.fillStyle = '#2a8a3a'; circ(lk[0] * 3, 2, 9); ctx.fill(); ctx.fillStyle = '#111'; circ(lk[0] * 3, 2, 5); ctx.fill(); ctx.fillStyle = '#fff'; circ(lk[0] * 3 - 3, -2, 3); ctx.fill(); }
  ctx.restore();
  ctx.fillStyle = '#1a1220'; ell(-26, -18, 20, 16); ctx.fill(); ctx.strokeStyle = '#1a1220'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-62, -40); ctx.lineTo(-8, -26); ctx.lineTo(62, -36); ctx.stroke();
  if (mood === 'sad') brows(26, -40, 0, 26, .5, '#5a2a10', 5); else if (mood === 'sly' || mood === 'angry') { ctx.strokeStyle = '#5a2a10'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(10, -36); ctx.lineTo(44, -42); ctx.stroke(); }
  // mouth
  const m = o.mouth ?? mouth('tilkos', t);
  if (m > .06) { ctx.fillStyle = '#5a1020'; ctx.beginPath(); ctx.moveTo(-26, 38); ctx.quadraticCurveTo(0, 44, 26, 38); ctx.quadraticCurveTo(0, 44 + m * 34, -26, 38); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(-14, 40); ctx.lineTo(-9, 48); ctx.lineTo(-4, 40); ctx.moveTo(4, 40); ctx.lineTo(9, 48); ctx.lineTo(14, 40); ctx.fill(); }
  else if (mood === 'sly') { ctx.strokeStyle = '#241a3d'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-22, 36); ctx.quadraticCurveTo(5, 46, 30, 30); ctx.stroke(); }
  else mouthShape(0, 38, 34, 0, mood === 'sad' || mood === 'scared' ? -1 : 1, '#5a1020');
  // pirate hat
  ctx.fillStyle = '#1e1a2e'; ctx.beginPath(); ctx.moveTo(-95, -62); ctx.quadraticCurveTo(0, -40, 95, -62); ctx.quadraticCurveTo(70, -150, 0, -140); ctx.quadraticCurveTo(-70, -150, -95, -62); ctx.fill();
  ctx.strokeStyle = '#f2c14e'; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(-90, -64); ctx.quadraticCurveTo(0, -44, 90, -64); ctx.stroke();
  ctx.fillStyle = '#f2c14e'; circ(0, -95, 16); ctx.fill(); ctx.fillStyle = '#1e1a2e'; starPath(0, -95, 10, 4.5); ctx.fill();
  ctx.fillStyle = '#d64545'; ctx.save(); ctx.translate(60, -110); ctx.rotate(.6 + Math.sin(t * 3) * .1); ell(0, -30, 10, 40); ctx.fill(); ctx.restore();
  ctx.restore();
}
function pofiArms(x, y, s, t, o) {
  const yy = y + talkBob('pofi', t) + (o.still ? 0 : Math.sin(t * 2.2) * 8);
  const tk = talking('pofi', t), up = o.armsUp;
  for (const sx of [-1, 1]) {
    const a = up ? -1.1 + Math.sin(t * 8 + sx) * .25 : (tk ? -.2 + Math.sin(t * 6 + sx * 1.5) * .45 : .5 + Math.sin(t * 2 + sx) * .1);
    ctx.save(); ctx.translate(x + sx * 118 * s, yy + 25 * s); ctx.rotate(sx * a);
    ctx.fillStyle = '#ffffff'; circ(sx * 20 * s, 0, 30 * s); ctx.fill(); circ(sx * 48 * s, -6 * s, 22 * s); ctx.fill();
    ctx.restore();
  }
}
function pofiBandana(x, y, s, t, o) {
  const yy = y + talkBob('pofi', t) + (o.still ? 0 : Math.sin(t * 2.2) * 8);
  ctx.save(); ctx.translate(x, yy); ctx.scale(s, s);
  ctx.fillStyle = '#e8344a'; ctx.beginPath(); ctx.moveTo(-88, -62); ctx.quadraticCurveTo(-60, -150, 20, -138); ctx.quadraticCurveTo(95, -125, 100, -58); ctx.quadraticCurveTo(10, -92, -88, -62); ctx.fill();
  ctx.save(); ctx.translate(98, -64); ctx.rotate(Math.sin(t * 5) * .15); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(55, 20); ctx.lineTo(40, -14); ctx.closePath(); ctx.fill(); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(48, 42); ctx.lineTo(18, 30); ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.fillStyle = '#fff'; for (const [dx, dy] of [[-55, -88], [-20, -112], [20, -118], [55, -104], [-5, -88], [35, -86]]) { circ(dx, dy, 7); ctx.fill(); }
  ctx.restore();
}
function explorerHat(x, y, s, t, o) { // on Fıstık's head
  const yy = y + talkBob('fistik', t);
  ctx.save(); ctx.translate(x, yy); ctx.rotate(o.rot || 0); ctx.scale(s * (o.flip ? -1 : 1), s); ctx.translate(0, -95);
  ctx.fillStyle = '#c9a66b'; ell(0, -40, 80, 16); ctx.fill(); ctx.beginPath(); ctx.ellipse(0, -46, 52, 42, 0, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#6a8a3a'; rrect(-52, -56, 104, 12, 4); ctx.fill();
  ctx.restore();
}
// wrap characters: ink outline + ep3 accessories
const _pofi = pofi, _fistik = fistik, _piril = piril, _homur = homur, _buzbas = buzbas, _tilkos = tilkos;
pofi = (x, y, s, t, o = {}) => inked(() => { if (o.arms !== false) pofiArms(x, y, s, t, o); _pofi(x, y, s, t, o); if (o.bandana !== false) pofiBandana(x, y, s, t, o); }, x, y, 230 * s * (o.stretch || 1));
fistik = (x, y, s, t, o = {}) => inked(() => { _fistik(x, y, s, t, o); if (o.explorer !== false && !o.winter) explorerHat(x, y, s, t, o); }, x, y - 110 * s, 300 * s);
piril = (x, y, s, t, o = {}) => inked(() => _piril(x, y, s, t, o), x, y, 125 * s);
homur = (x, y, s, t, o = {}) => inked(() => _homur(x, y, s, t, o), x, y, 330 * s);
buzbas = (x, y, s, t, o = {}) => inked(() => _buzbas(x, y, s, t, o), x, y - 20 * s, 175 * s);
tilkos = (x, y, s, t, o = {}) => inked(() => _tilkos(x, y, s, t, o), x, y - 110 * s, 300 * s);

// ================= EPISODE 3: effects & camera =================
function cam(fx, fy, z) { z = Math.max(1, z); const hw = W / (2 * z), hh = H / (2 * z); fx = clamp(fx, hw, W - hw); fy = clamp(fy, hh, H - hh); ctx.translate(W / 2, H / 2); ctx.scale(z, z); ctx.translate(-fx, -fy); }
function letterbox(a) { if (a <= 0) return; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, 90 * a); ctx.fillRect(0, H - 90 * a, W, 90 * a); }
function burst(x, y, txt, p, col = '#ffe066', col2 = '#e8344a') {
  if (p <= 0 || p >= 1) return;
  const s = easeBack(clamp(p * 4)) * (1 - easeIn(prog(p, .7, 1)) * .2), a = 1 - prog(p, .75, 1);
  ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.rotate(-.12); ctx.scale(s, s);
  ctx.fillStyle = col2; ctx.beginPath(); for (let i = 0; i < 24; i++) { const r = i % 2 ? 120 : 190, an = i / 24 * 6.283; ctx.lineTo(Math.cos(an) * r * 1.4, Math.sin(an) * r * .9); } ctx.closePath(); ctx.fill();
  ctx.fillStyle = col; ctx.beginPath(); for (let i = 0; i < 24; i++) { const r = i % 2 ? 95 : 150, an = i / 24 * 6.283 + .13; ctx.lineTo(Math.cos(an) * r * 1.4, Math.sin(an) * r * .9); } ctx.closePath(); ctx.fill();
  ctx.restore();
  bigText(txt, x, y, 110, '#ffffff', '#241a3d', a, s, -.12);
}
function speedLines(t, cx, cy, a = .5) { ctx.save(); ctx.strokeStyle = `rgba(255,255,255,${a})`; ctx.lineWidth = 6; const r = rng(Math.floor(t * 12)); for (let i = 0; i < 40; i++) { const an = r() * 6.283, r1 = 500 + r() * 200; ctx.beginPath(); ctx.moveTo(cx + Math.cos(an) * r1, cy + Math.sin(an) * r1); ctx.lineTo(cx + Math.cos(an) * 1400, cy + Math.sin(an) * 1400); ctx.stroke(); } ctx.restore(); }
const LEAVES = (() => { const r = rng(5), a = []; for (let i = 0; i < 60; i++) a.push({ x: r() * W, y: r() * H, s: 8 + r() * 10, sp: 40 + r() * 60, ph: r() * 6.28, c: ['#e8702a', '#f2a03a', '#c9402a', '#f2c14e'][i % 4] }); return a; })();
function leavesFx(t, n = 40) { for (let i = 0; i < n; i++) { const f = LEAVES[i]; const x = ((f.x + t * 30 + Math.sin(t + f.ph) * 60) % W + W) % W, y = ((f.y + t * f.sp) % (H + 40) + H + 40) % (H + 40) - 20; ctx.save(); ctx.translate(x, y); ctx.rotate(t * 2 + f.ph); ctx.fillStyle = f.c; ell(0, 0, f.s, f.s * .5); ctx.fill(); ctx.restore(); } }

// ================= EPISODE 3: environments =================
function seaWaves(t, y0, col1, col2, amp = 30, speed = 1, layers = 3) {
  for (let l = 0; l < layers; l++) {
    const yy = y0 + l * 70, a = amp * (1 + l * .3);
    ctx.fillStyle = l < layers / 2 ? col1 : col2;
    ctx.beginPath(); ctx.moveTo(-50, H + 50);
    for (let x = -50; x <= W + 50; x += 30) ctx.lineTo(x, yy + Math.sin(x * .006 + t * speed * (1.2 + l * .3) + l) * a + Math.sin(x * .013 - t * speed * 1.7) * a * .4);
    ctx.lineTo(W + 50, H + 50); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.lineWidth = 4; ctx.beginPath();
    for (let x = -50; x <= W + 50; x += 30) { const yv = yy + Math.sin(x * .006 + t * speed * (1.2 + l * .3) + l) * a + Math.sin(x * .013 - t * speed * 1.7) * a * .4; x === -50 ? ctx.moveTo(x, yv) : ctx.lineTo(x, yv); } ctx.stroke();
  }
}
function pirateShip(x, y, s, t, rock = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 1.2) * .06 * (1 + rock)); ctx.scale(s, s);
  ctx.fillStyle = '#e8e0cc'; ctx.beginPath(); ctx.moveTo(-10, -560); ctx.quadraticCurveTo(170 + Math.sin(t * 2) * 15, -420, -10, -260); ctx.fill(); ctx.beginPath(); ctx.moveTo(-10, -240); ctx.quadraticCurveTo(220 + Math.sin(t * 2) * 15, -120, -10, -40); ctx.fill();
  ctx.fillStyle = '#c0213a'; ctx.beginPath(); ctx.moveTo(-10, -600); ctx.lineTo(80, -585); ctx.lineTo(-10, -565); ctx.fill();
  ctx.fillStyle = '#f2c14e'; circ(70, -400, 34); ctx.fill(); ctx.fillStyle = '#1e1a2e'; starPath(70, -400, 20, 9); ctx.fill();
  ctx.fillStyle = '#5a3420'; ctx.fillRect(-18, -610, 16, 610);
  ctx.fillStyle = '#6a3a1e'; ctx.beginPath(); ctx.moveTo(-380, -60); ctx.lineTo(380, -60); ctx.lineTo(300, 90); ctx.lineTo(-300, 90); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#4a2814'; ctx.fillRect(-380, -80, 760, 26); for (let k = -3; k <= 3; k++) { ctx.fillStyle = '#2a1608'; circ(k * 90, 15, 16); ctx.fill(); }
  ctx.fillStyle = '#f2c14e'; ctx.fillRect(-300, 50, 600, 8);
  glow(330, -110, 120, '255,200,90', .6 + .1 * Math.sin(t * 9)); ctx.fillStyle = '#ffd36b'; rrect(318, -130, 24, 34, 6); ctx.fill();
  ctx.restore();
}
function autumnValley(t, o = {}) {
  skyGrad('#7fc4f0', '#ffd8a8', '#ffe9cc');
  glow(1560, 180, 260, '255,220,150', .55); ctx.fillStyle = '#ffe9a8'; circ(1560, 180, 62); ctx.fill();
  for (let i = 0; i < 4; i++) cloudSmall(((i * 560 + t * 10) % 2500) - 250, 110 + (i % 2) * 70, 1);
  if (o.rainbowTree) rainbow(960, 900, 820, 1, .25 * o.rainbowTree);
  const hills = [['#e5b25a', 640, .2], ['#d99a3e', 730, .45], ['#c98a32', 830, .7]];
  hills.forEach(([c, y0], l) => { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(-50, H); for (let x = -50; x <= W + 50; x += 40) ctx.lineTo(x, y0 + Math.sin(x * .003 + l * 2) * 55); ctx.lineTo(W + 50, H); ctx.fill();
    if (l < 2) for (let i = 0; i < 7; i++) { const x = ((i * 330 + l * 160) % 2300) - 100; roundTree(x, y0 + 60 + l * 10, .65 + l * .2, ['#e8702a', '#d9502a', '#f2a03a'][(i + l) % 3], ['#f2a03a', '#f2c14e', '#e8702a'][(i + l) % 3]); } });
  ctx.fillStyle = '#8fbf5a'; ctx.fillRect(-50, 900, W + 100, 200); ctx.fillStyle = '#a3cf6a'; ctx.beginPath(); ctx.moveTo(-50, 900); ctx.quadraticCurveTo(W / 2, 860, W + 50, 900); ctx.lineTo(W + 50, 930); ctx.lineTo(-50, 930); ctx.fill();
  const r = rng(30); for (let i = 0; i < 30; i++) { ctx.fillStyle = ['#e8702a', '#c9402a', '#f2c14e'][i % 3]; ell(r() * W, 930 + r() * 140, 10, 5, r() * 3); ctx.fill(); }
}
function tent(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.fillStyle = '#3a6a9a'; ctx.beginPath(); ctx.moveTo(-160, 0); ctx.lineTo(0, -200); ctx.lineTo(160, 0); ctx.fill(); ctx.fillStyle = '#1a2a40'; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(0, -120); ctx.lineTo(40, 0); ctx.fill(); ctx.restore(); }
function seaScene(t, storm = 0) {
  const top = storm > 0 ? '#2a3050' : '#7cc8f5', bot = storm > 0 ? '#5a6080' : '#d7f1ff';
  skyGrad(top, '#a9dcf7', bot); if (storm > 0) { ctx.fillStyle = `rgba(30,30,55,${storm * .85})`; ctx.fillRect(0, 0, W, H); }
  if (storm < .5) { glow(1580, 170, 240, '255,240,180', .6 * (1 - storm * 2)); ctx.fillStyle = `rgba(255,240,170,${1 - storm * 2})`; circ(1580, 170, 60); ctx.fill(); }
  for (let i = 0; i < 4; i++) cloudSmall(((i * 560 + t * 15) % 2500) - 250, 120 + (i % 2) * 60, 1.2, storm > 0 ? .5 : .9);
  seaWaves(t, 560 - storm * 60, storm > 0 ? '#3a5a8a' : '#4fb3e8', storm > 0 ? '#1a3060' : '#1f7fc0', 22 + storm * 50, 1 + storm * 1.5, 4);
}
function raft(x, y, rot, s = 1) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = '#8a5a2b'; for (let k = -3; k <= 3; k++) { rrect(k * 62 - 30, -20, 58, 44, 18); ctx.fill(); } ctx.fillStyle = '#5a3a18'; ctx.fillRect(-210, -6, 420, 10); ctx.fillStyle = '#5a3420'; ctx.fillRect(-8, -330, 16, 320); ctx.restore(); }
function whaleChar(x, y, s, t, smile = 1, wink = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#3a6fb8'; ctx.beginPath(); ctx.moveTo(-520, 0); ctx.quadraticCurveTo(-520, -230, -100, -240); ctx.quadraticCurveTo(380, -250, 480, -60); ctx.quadraticCurveTo(560, -170 + Math.sin(t * 2) * 30, 640, -200 + Math.sin(t * 2) * 40); ctx.quadraticCurveTo(600, -60, 520, 0); ctx.quadraticCurveTo(0, 120, -520, 0); ctx.fill();
  ctx.fillStyle = '#9fd0f0'; ctx.beginPath(); ctx.moveTo(-500, 10); ctx.quadraticCurveTo(-200, 100, 300, 30); ctx.quadraticCurveTo(-100, 140, -500, 10); ctx.fill();
  ctx.fillStyle = '#fff'; circ(-330, -90, 34); ctx.fill();
  if (wink > .5) { ctx.strokeStyle = '#1a2a4a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(-330, -90, 24, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); }
  else { ctx.fillStyle = '#1a2a4a'; circ(-325, -88, 20); ctx.fill(); ctx.fillStyle = '#fff'; circ(-332, -96, 7); ctx.fill(); }
  ctx.fillStyle = 'rgba(255,130,160,.55)'; ell(-280, -40, 30, 14); ctx.fill();
  ctx.strokeStyle = '#1a2a4a'; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-500, -10); ctx.quadraticCurveTo(-420, 30 * smile, -330, 0); ctx.stroke();
  ctx.restore();
}
function spout(x, y, t, a = 1) { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = 'rgba(220,240,255,.9)'; for (let i = 0; i < 14; i++) { const ph = (t * 1.5 + i / 14) % 1, an = -Math.PI / 2 + (i % 2 ? .4 : -.4) * ph; circ(x + Math.cos(an) * ph * 220, y + Math.sin(an) * ph * 260 + ph * ph * 120, 18 * (1 - ph) + 6); ctx.fill(); } ctx.restore(); }
function palm(x, base, s, t) {
  ctx.save(); ctx.translate(x, base); ctx.scale(s, s);
  ctx.strokeStyle = '#8a6a3a'; ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(40, -200, 10, -380); ctx.stroke();
  ctx.fillStyle = '#2f9a4a'; for (let k = 0; k < 6; k++) { ctx.save(); ctx.translate(10, -380); ctx.rotate(-2.6 + k * .9 + Math.sin(t * 1.5 + k) * .05); ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(110, -50, 200, 20); ctx.quadraticCurveTo(110, -10, 0, 0); ctx.fill(); ctx.restore(); }
  ctx.fillStyle = '#6a4a2a'; circ(0, -370, 16); ctx.fill(); circ(25, -365, 14); ctx.fill();
  ctx.restore();
}
function beach(t) {
  skyGrad('#5ec2ff', '#a9e6ff', '#e6fbff'); glow(1600, 160, 260, '255,245,200', .6); ctx.fillStyle = '#fff6cf'; circ(1600, 160, 60); ctx.fill();
  for (let i = 0; i < 3; i++) cloudSmall(((i * 700 + t * 10) % 2500) - 250, 130 + i * 40, 1.1);
  ctx.fillStyle = '#2f8a4a'; ctx.beginPath(); ctx.moveTo(500, 620); ctx.quadraticCurveTo(900, 300, 1300, 420); ctx.quadraticCurveTo(1600, 380, 2000, 600); ctx.lineTo(2000, 700); ctx.lineTo(500, 700); ctx.fill();
  seaWaves(t, 600, '#3fd0e0', '#1fa0c8', 12, .6, 2);
  ctx.fillStyle = '#f5dfa0'; ctx.beginPath(); ctx.moveTo(-50, 760); ctx.quadraticCurveTo(700, 700, 1300, 780); ctx.quadraticCurveTo(1700, 820, W + 50, 760); ctx.lineTo(W + 50, H); ctx.lineTo(-50, H); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 8; ctx.beginPath(); for (let x = -50; x <= W + 50; x += 30) { const yv = 760 + Math.sin(x * .004 + t * 1.5) * 12 - (x < 1300 ? (1 - (x + 50) / 1350) * 40 : 0) * 0; x === -50 ? ctx.moveTo(x, yv) : ctx.lineTo(x, yv); } ctx.stroke();
  palm(200, 860, 1.1, t); palm(1720, 880, 1.2, t); palm(1500, 820, .8, t);
  ctx.fillStyle = 'rgba(160,120,60,.4)'; for (let k = 0; k < 12; k++) { ell(500 + k * 100, 930 - (k % 2) * 30, 14, 9); ctx.fill(); }
}
function jungle(t, camX = 0, chasm = false) {
  skyGrad('#7fd0a0', '#b8e8c0', '#e0f8e0');
  for (let l = 0; l < 3; l++) { const par = .3 + l * .3; ctx.fillStyle = ['#3f8a5a', '#2f7a4a', '#1f6a3a'][l]; ctx.beginPath(); ctx.moveTo(-50, H); for (let x = -50; x <= W + 50; x += 40) ctx.lineTo(x, 300 + l * 120 + Math.sin((x + camX * par) * .01 + l) * 40 + Math.sin((x + camX * par) * .023) * 20); ctx.lineTo(W + 50, H); ctx.fill(); }
  ctx.strokeStyle = '#2a5a2a'; ctx.lineWidth = 8; for (let i = 0; i < 12; i++) { const x = ((i * 190 - camX * .9) % 2300 + 2300) % 2300 - 200; ctx.beginPath(); ctx.moveTo(x, -10); ctx.quadraticCurveTo(x + 20 + Math.sin(t + i) * 10, 250, x + Math.sin(t * .8 + i) * 15, 380 + (i % 3) * 60); ctx.stroke(); ctx.fillStyle = '#4caa5a'; for (let k = 0; k < 4; k++) { ell(x + 10, 80 + k * 80, 18, 9, .5); ctx.fill(); } }
  if (chasm) { ctx.fillStyle = '#5a4a2a'; ctx.fillRect(-50, 860, 640, 300); ctx.fillRect(1330, 860, 700, 300); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(590, 860, 740, 300); ctx.fillStyle = '#2a1a10'; for (let k = 0; k < 6; k++) { ctx.fillRect(590 + k * 120, 900 + (k % 2) * 20, 80, 200); } ctx.fillStyle = '#4caa4a'; ctx.fillRect(-50, 850, 640, 24); ctx.fillRect(1330, 850, 700, 24); }
  else { ctx.fillStyle = '#4a7a3a'; ctx.fillRect(-50, 870, W + 100, 220); }
  ctx.fillStyle = '#2a7a3a'; for (let i = 0; i < 9; i++) { const x = ((i * 250 - camX * 1.2) % 2300 + 2300) % 2300 - 200; for (let k = 0; k < 5; k++) { ctx.save(); ctx.translate(x, 1000); ctx.rotate(-1.2 + k * .6 + Math.sin(t + i) * .05); ell(0, -70, 30, 90); ctx.fill(); ctx.restore(); } }
}
function templeExterior(t, doorOpen = 0, stones = [0, 0, 0, 0]) {
  jungle(t, 0, false);
  ctx.fillStyle = '#9a9070'; ctx.beginPath(); ctx.moveTo(460, 870); ctx.lineTo(560, 520); ctx.lineTo(760, 360); ctx.lineTo(1160, 360); ctx.lineTo(1360, 520); ctx.lineTo(1460, 870); ctx.fill();
  ctx.fillStyle = '#857b5c'; for (let k = 0; k < 5; k++) ctx.fillRect(500 + k * 20, 820 - k * 90, 920 - k * 40, 14);
  ctx.fillStyle = '#6a6248'; ctx.fillRect(760, 320, 400, 50); ctx.fillStyle = '#4caa5a'; for (let k = 0; k < 8; k++) { ell(560 + k * 110, 520 + Math.sin(k) * 40, 30, 14, k); ctx.fill(); }
  ctx.fillStyle = '#2a2418'; ctx.fillRect(840, 560, 240, 310);
  ctx.fillStyle = '#7d7356'; ctx.fillRect(840, 560 - doorOpen * 300, 240, 310); ctx.strokeStyle = '#5a5240'; ctx.lineWidth = 6; ctx.strokeRect(860, 580 - doorOpen * 300, 200, 270);
  if (doorOpen < .99) { ctx.save(); ctx.beginPath(); ctx.rect(840, 560 - doorOpen * 300, 240, 310); ctx.clip(); ctx.fillStyle = '#5a5240'; ctx.font = `800 70px ${FONT}`; ctx.textAlign = 'center'; ctx.fillText('◈', 960, 740 - doorOpen * 300); ctx.restore(); }
  if (doorOpen > 0) glow(960, 720, 300, '255,220,140', doorOpen * .7);
  stones.forEach((v, i) => { const x = 620 + i * 226 + (i > 1 ? 0 : 0), y = 470; const xx = [620, 740, 1180, 1300][i]; glow(xx, y, 70, '120,230,255', v * .9); ctx.fillStyle = v > .5 ? '#9ff0ff' : '#b0a888'; rrect(xx - 34, y - 34, 68, 68, 12); ctx.fill(); ctx.strokeStyle = '#5a5240'; ctx.lineWidth = 5; ctx.strokeRect(xx - 34, y - 34, 68, 68); });
  ctx.fillStyle = '#e8d8a8'; ctx.font = `800 34px ${FONT}`; ctx.textAlign = 'center'; ctx.fillText('TEK EL AÇAMAZ · DÖRT EL AÇAR', 960, 410);
}
function templeInterior(t, scroll = 0, pit = false) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#2a2018'); g.addColorStop(1, '#4a3a28'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  for (let r = 0; r < 9; r++) for (let c = -1; c < 12; c++) { const x = ((c * 200 + (r % 2) * 100 - scroll) % 2400 + 2400) % 2400 - 200, y = r * 120; ctx.fillStyle = (r + c) % 3 ? '#5a4a34' : '#635238'; ctx.fillRect(x + 4, y + 4, 192, 112); }
  ctx.fillStyle = 'rgba(200,170,90,.35)'; ctx.font = `800 60px ${FONT}`; ctx.textAlign = 'center'; const glyphs = ['☀', '◈', '♒', '✦', '☾', '◉'];
  for (let i = 0; i < 10; i++) { const x = ((i * 260 - scroll * .9) % 2600 + 2600) % 2600 - 200; ctx.fillText(glyphs[i % 6], x, 300 + (i % 2) * 140); }
  for (let i = 0; i < 6; i++) { const x = ((i * 400 + 150 - scroll) % 2400 + 2400) % 2400 - 200, y = 380; glow(x, y - 40, 260, '255,170,70', .45 + .08 * Math.sin(t * 11 + i)); ctx.fillStyle = '#3a2a1a'; ctx.fillRect(x - 10, y, 20, 80); for (const [c, sc] of [['#ff6a2a', 1], ['#ffd36b', .6]]) { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(x - 22 * sc, y); ctx.quadraticCurveTo(x - 10, y - 70 * sc * (1 + .15 * Math.sin(t * 13 + i)), x, y - 90 * sc); ctx.quadraticCurveTo(x + 10, y - 60 * sc, x + 22 * sc, y); ctx.fill(); } }
  ctx.fillStyle = '#3a2c1c'; ctx.fillRect(0, 880, W, 200);
  if (pit) { ctx.fillStyle = '#0a0604'; ctx.beginPath(); ctx.ellipse(1250, 900, 300, 60, 0, 0, 6.283); ctx.fill(); ctx.fillStyle = '#1a120a'; ctx.fillRect(950, 900, 600, 200); ctx.fillStyle = '#0a0604'; ctx.fillRect(960, 900, 580, 200); }
}
function treasureRoom(t, chestOpen = 0, collapse = 0) {
  templeInterior(t, 0, false);
  ctx.fillStyle = 'rgba(255,200,80,.08)'; ctx.fillRect(0, 0, W, H);
  for (let k = 0; k < 7; k++) { ctx.save(); ctx.globalAlpha = .18; ctx.fillStyle = '#ffe9a0'; ctx.beginPath(); ctx.moveTo(960, 640); const a = -Math.PI / 2 + (k - 3) * .25 + Math.sin(t * .5) * .05; ctx.lineTo(960 + Math.cos(a - .06) * 1400, 640 + Math.sin(a - .06) * 1400); ctx.lineTo(960 + Math.cos(a + .06) * 1400, 640 + Math.sin(a + .06) * 1400); ctx.fill(); ctx.restore(); }
  ctx.fillStyle = '#7d7356'; ctx.fillRect(820, 760, 280, 120); ctx.fillStyle = '#9a9070'; ctx.fillRect(800, 740, 320, 30);
  for (let i = 0; i < 30; i++) { const r = rng(i + 3); ctx.fillStyle = '#f2c14e'; ell(700 + r() * 520, 870 + r() * 20, 14, 6); ctx.fill(); }
}
function chest(x, y, s, t, open = 0, glowA = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  glow(0, -60, 300, '255,215,100', .6 * glowA);
  ctx.fillStyle = '#8a4a1e'; rrect(-120, -80, 240, 110, 12); ctx.fill(); ctx.fillStyle = '#f2c14e'; ctx.fillRect(-120, -40, 240, 14); ctx.fillRect(-10, -80, 20, 110);
  if (open > 0) { glow(0, -100, 260, '255,240,160', open); for (let i = 0; i < 8; i++) { const a = -Math.PI / 2 + (i - 3.5) * .3; sparkle(Math.cos(a) * 140 * open, -100 + Math.sin(a) * 140 * open, 18, open); } }
  ctx.save(); ctx.translate(0, -80); ctx.rotate(-open * 1.6); ctx.fillStyle = '#9a5a26'; ctx.beginPath(); ctx.moveTo(-120, 0); ctx.quadraticCurveTo(0, -80, 120, 0); ctx.fill(); ctx.fillStyle = '#f2c14e'; ctx.fillRect(-10, -40, 20, 40); ctx.restore();
  ctx.fillStyle = '#f2c14e'; circ(0, -30, 14); ctx.fill(); ctx.fillStyle = '#5a3a18'; rrect(-4, -34, 8, 14, 2); ctx.fill();
  ctx.restore();
}
function rainbowTree(x, y, grow, t) {
  if (grow <= 0) return;
  ctx.save(); ctx.translate(x, y);
  const h = 520 * easeOut(grow), cw = 520 * easeBack(prog(grow, .35, 1));
  ctx.fillStyle = '#7a4a2a'; ctx.beginPath(); ctx.moveTo(-50, 0); ctx.quadraticCurveTo(-30, -h * .5, -24, -h); ctx.lineTo(24, -h); ctx.quadraticCurveTo(30, -h * .5, 50, 0); ctx.fill();
  if (cw > 0) {
    const cols = ['#ff6b7a', '#ffb05a', '#ffe36b', '#7fe08a', '#6ac0ff', '#b08aff'];
    [[-240, -h + 40, 170], [240, -h + 40, 170], [-130, -h - 90, 190], [130, -h - 90, 190], [0, -h - 170, 200], [0, -h - 20, 210]].forEach(([dx, dy, r], i) => { ctx.fillStyle = ['#4caa5a', '#5fbf6a', '#3f9a4a'][i % 3]; circ(dx * cw / 520, dy, r * cw / 520); ctx.fill(); });
    const r = rng(14); for (let i = 0; i < 26; i++) { const fx = (r() - .5) * 760 * cw / 520, fy = -h - 140 + (r() - .5) * 320 * cw / 520; glow(fx, fy, 40, '255,255,200', .3); ctx.fillStyle = cols[i % 6]; circ(fx, fy + Math.sin(t * 2 + i) * 3, 20 * cw / 520); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.7)'; circ(fx - 6, fy - 6, 6 * cw / 520); ctx.fill(); }
  }
  ctx.restore();
}
function mapPiece(x, y, s, t, half = 'L', glowA = 1) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); glow(0, 0, 220, '255,220,120', .6 * glowA);
  ctx.fillStyle = '#f3e2b5'; ctx.beginPath(); if (half === 'L') { ctx.moveTo(-150, -110); ctx.lineTo(10, -110); ctx.lineTo(-10, -60); ctx.lineTo(15, -10); ctx.lineTo(-5, 40); ctx.lineTo(10, 110); ctx.lineTo(-150, 110); } else { ctx.moveTo(-150, -110); ctx.lineTo(150, -110); ctx.lineTo(150, 110); ctx.lineTo(-150, 110); } ctx.closePath(); ctx.fill();
  ctx.strokeStyle = '#a0402a'; ctx.lineWidth = 6; ctx.setLineDash([12, 10]); ctx.beginPath(); ctx.moveTo(-120, 70); ctx.quadraticCurveTo(-60, -60, 0, 0); ctx.stroke(); ctx.setLineDash([]);
  ctx.fillStyle = '#3a8a4a'; ell(-90, -40, 40, 25); ctx.fill(); ctx.strokeStyle = '#c0213a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-15, -15); ctx.lineTo(15, 15); ctx.moveTo(15, -15); ctx.lineTo(-15, 15); ctx.stroke();
  ctx.restore();
}
function bottle(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.fillStyle = 'rgba(120,200,180,.75)'; rrect(-30, -70, 60, 110, 20); ctx.fill(); ctx.fillRect(-12, -100, 24, 34); ctx.fillStyle = '#8a5a2b'; ctx.fillRect(-14, -112, 28, 16); ctx.fillStyle = '#f3e2b5'; ctx.fillRect(-16, -50, 32, 70); ctx.restore(); }
function boulderObj(x, y, r, rot) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.fillStyle = '#7d7366'; circ(0, 0, r); ctx.fill(); ctx.fillStyle = '#6a6052'; for (const [dx, dy, rr] of [[-.4, -.3, .2], [.3, .2, .25], [.1, -.5, .12], [-.2, .45, .15]]) { circ(dx * r, dy * r, rr * r); ctx.fill(); } ctx.strokeStyle = '#241a3d'; ctx.lineWidth = 8; circ(0, 0, r); ctx.stroke(); ctx.restore(); }

// ================= EPISODE 3: scenes =================
const S = {
  acilis(t, lt, D) {
    const ti = I('tilkos_ilk'), tg = I('tilkos_gul');
    const z = 1 + .35 * ease(prog(t, ti - 1, ti + .5)) + .25 * ease(prog(t, tg, tg + 1.2));
    ctx.save(); cam(lerp(960, 1180, ease(prog(t, ti - 1, ti + .5))), lerp(540, 520, ease(prog(t, ti - 1, ti + .5))), z);
    skyGrad('#0a0f2a', '#1a2245', '#2a3560'); ctx.fillStyle = 'rgba(0,0,0,.2)'; ctx.fillRect(-500, -500, W + 1000, H + 1000);
    for (let i = 0; i < 4; i++) cloudSmall(((i * 600 + t * 40) % 2600) - 300, 100 + i * 50, 1.8, .25);
    seaWaves(t, 700, '#24406a', '#0e1e3a', 50, 1.8, 3);
    const rockY = Math.sin(t * 1.2) * 20;
    pirateShip(1050, 760 + rockY, 1, t, 1);
    tilkos(1180, 670 + rockY, .9, t, { mood: talking('tilkos', t) ? 'happy' : 'sly', hold: 'map', look: [-.5, 0] });
    seaWaves(t + 3, 900, '#1e3a62', '#0a1830', 40, 2.2, 2);
    rainFx(t, 1);
    ctx.restore();
    const sim = I('simsek'); const fl = ((t - sim) > 0 && (t - sim) < .25) || ((t - tg - 3) > 0 && (t - tg - 3) < .2) || (lt > 2 && lt < 2.15);
    if (fl) { ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.fillRect(0, 0, W, H); lightning(400, 0, 600, 3); }
    letterbox(1 - prog(lt, D - 1, D));
  },
  baslik(t, lt, D) {
    seaScene(t, 0);
    const word = 'POFİ', cols = ['#ffe066', '#ff8a3c', '#ffe066', '#ff8a3c'];
    for (let i = 0; i < 4; i++) { const p = easeBack(prog(lt, .2 + i * .15, .7 + i * .15)); bigText(word[i], 660 + i * 200, 210 + Math.sin(t * 3 + i) * 10, 220, cols[i], '#5a2a10', 1, p); }
    bigText('ve', 960, 380, 72, '#ffffff', '#5a2a10', prog(lt, 1, 1.4), easeBack(prog(lt, 1, 1.4)));
    mapPiece(960, 640, 1.3 * easeBack(prog(lt, .8, 1.6)), t, 'F');
    bigText('KAYIP HAZİNE HARİTASI', 960, 880, 120, '#ffe066', '#5a2a10', prog(lt, 1.4, 2), easeBack(prog(lt, 1.4, 2)));
    bigText('3. BÖLÜM', 960, 990, 50, '#ffffff', '#5a2a10', prog(lt, 2.2, 2.8));
    tilkos(1650, 1000 - easeOut(prog(lt, 3, 4)) * 220, .8, t, { mood: 'sly', look: [-1, -.3], mouth: 0 });
    const fo = prog(lt, D - .8, D); if (fo > 0) { ctx.fillStyle = `rgba(0,0,0,${fo})`; ctx.fillRect(0, 0, W, H); }
  },
  vadi(t, lt, D) {
    const si = I('sise'), sc = I('sise_cikar'), hp = I('harita_parla'), bg = I('buzbas_gelir'), tb = I('tilkos_belir'), tt = I('tilkos_tanis');
    const zMap = ease(prog(t, hp - .3, hp + .8)) * (1 - ease(prog(t, I('harita') + 3, I('harita') + 4)));
    const zT = ease(prog(t, tt - .2, tt + .6)) * (1 - ease(prog(t, I('birlestir'), I('birlestir') + 1)));
    const susp = [...TL.lines].find(l => l.inner && l.who === 'pofi' && l.start > tt); const zP = susp ? ease(prog(t, susp.start - .3, susp.start + .4)) * (1 - ease(prog(t, susp.start + susp.dur, susp.start + susp.dur + .6))) : 0;
    ctx.save();
    if (zMap > 0) cam(lerp(960, 900, zMap), lerp(540, 700, zMap), 1 + .5 * zMap);
    else if (zT > 0) cam(lerp(960, 1500, zT), lerp(540, 600, zT), 1 + .45 * zT);
    else if (zP > 0) cam(lerp(960, 560, zP), lerp(540, 420, zP), 1 + .5 * zP);
    autumnValley(t, {});
    const dig = t > si - 5 && t < sc + 1, bottleUp = easeOut(prog(t, sc, sc + 1.2));
    ctx.fillStyle = '#6a4a2a'; ell(900, 930, 90, 22); ctx.fill();
    if (dig) { const r = rng(Math.floor(t * 8)); for (let i = 0; i < 4; i++) { ctx.fillStyle = '#7a5a3a'; circ(900 + (r() - .5) * 200, 860 - r() * 120, 10 + r() * 8); ctx.fill(); } }
    const fOpen = t > sc + 1.2;
    fistik(780, 900, .9, t, { look: dig ? [1, .6] : undefined, armsUp: (dig && Math.sin(t * 12) > 0) || (t > I('homur_hazine') + 2 && t < I('homur_hazine') + 6), hold: t < si - 1 ? 'nut' : null });
    if (t > sc) { if (t < hp) bottle(lerp(900, 960, bottleUp), lerp(940, 700, bottleUp), 1.1, Math.sin(t * 3) * .2); }
    if (t > hp - .2) mapPiece(960, lerp(700, 600, easeOut(prog(t, hp, hp + 1))), .9 * easeBack(prog(t, hp - .2, hp + .5)), t, 'L');
    pofi(lerp(-300, 520, easeOut(prog(t, si + 1, si + 3))), 430, .78, t, { worried: zP > .3, look: zP > .3 ? [1, .2] : undefined });
    piril(lerp(2100, 1300, easeOut(prog(t, I('ac'), I('ac') + 2))), 380, .42, t, {});
    homur(lerp(2300, 1500, easeOut(prog(t, bg - 3, bg - 1))), 240, .7, t, { mood: 'happy', colorful: 1 });
    buzbas(lerp(2200, 1180, easeOut(prog(t, bg - 1.5, bg))), 900, .8, t, { proud: t > bg && t < bg + 6 });
    if (t > tb - .3) tilkos(lerp(2300, 1550, easeOut(prog(t, tb - .3, tb + 1.2))), 900, .85, t, { mood: talking('tilkos', t) ? 'happy' : 'sly', hold: t > I('birlestir') ? 'map' : null, look: [-1, 0] });
    ctx.restore();
    leavesFx(t, 30);
  },
  gece(t, lt, D) {
    const sn = I('sinsi'), ca = I('calma'), uy = I('uyanma'), kc = I('kacis'), el = I('elveda');
    nightSky(t, '#0b1446', '#232a78', '#3f3a86'); ctx.fillStyle = '#f6eecf'; circ(300, 170, 55); ctx.fill();
    ctx.fillStyle = '#1e2a52'; ctx.beginPath(); ctx.moveTo(0, 720); ctx.quadraticCurveTo(900, 620, W, 700); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
    ctx.fillStyle = '#16244a'; for (let i = 0; i < 8; i++) roundTree(100 + i * 260, 740, .6, '#1a2a50', '#22325a');
    ctx.fillStyle = '#26345e'; ctx.fillRect(0, 880, W, 200);
    tent(1400, 880, 1);
    campfire(960, 900, t);
    const asleep = t < uy;
    pofi(560, 760, .7, t, { closed: asleep, surprised: !asleep && t < kc + 4 ? 1 : 0 });
    fistik(780, 900, .75, t, { closed: asleep, scared: !asleep && t < el + 2, sad: t > I('gitti') - .5 && t < I('kopya') });
    homur(260, 560, .6, t, { mood: asleep ? 'happy' : 'surprised', colorful: 1, closed: asleep });
    piril(1160, 600, .38, t, { closed: t < ca + 1 });
    buzbas(1180, 900, .7, t, { closed: asleep, proud: t > I('kopya') });
    if (t > I('kopya') + .5 && t < I('kopya') + 6) { ctx.save(); ctx.translate(1180, 760); ctx.rotate(-.1); ctx.fillStyle = '#c9a66b'; rrect(-60, -40, 120, 80, 8); ctx.fill(); ctx.fillStyle = '#f3e2b5'; rrect(-52, -34, 104, 68, 6); ctx.fill(); ctx.strokeStyle = '#a0402a'; ctx.lineWidth = 3; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(-40, 20); ctx.quadraticCurveTo(0, -30, 35, 10); ctx.stroke(); ctx.setLineDash([]); ctx.restore(); burst(1180, 600, 'KOPYA!', prog(t, I('kopya') + .5, I('kopya') + 2.5), '#7fe08a', '#2a8a4a'); }
    // tilkos sneaking
    let tx = -300, ty = 900, flip = false;
    if (t > sn - 1) { tx = lerp(-300, 900, ease(prog(t, sn - 1, ca + 1))); }
    if (t > ca + 2) tx = 900;
    if (t > uy) { tx = lerp(900, 2400, easeIn(prog(t, uy + .5, kc + 3))); flip = false; }
    if (t > sn - 1 && t < kc + 4) tilkos(tx, ty - Math.abs(Math.sin(t * (t > uy ? 14 : 5))) * (t > uy ? 30 : 8), .8, t, { mood: t > uy ? 'happy' : 'sly', hold: t > ca + 1 ? 'map' : null, flip, look: [1, 0] });
    if (t > sn && t < uy) { ctx.fillStyle = 'rgba(5,5,30,.35)'; ctx.fillRect(0, 0, W, H); }
    if (t > uy && t < uy + 1.5) burst(1100, 420, 'HEY!', prog(t, uy, uy + 1.5), '#ffe066', '#c0213a');
    if (t > el - 1 && t < el + 4) { const p = prog(t, el - 1, el + 4); pirateShip(lerp(1700, 2500, p), 760, .35, t); }
  },
  deniz(t, lt, D) {
    const fr = I('firtina'), fa = I('firtina_aksiyon'), dd = I('dev_dalga'), bc = I('balina_cikar'), by = I('balina_yuzer'), ky = I('kiyida');
    const storm = clamp(prog(t, fr - .5, fr + 2) - prog(t, by + 2, ky + 2));
    const shakeA = (t > fa && t < bc + 1) ? 6 * storm : 0;
    ctx.save(); if (shakeA) shake(shakeA, t);
    const zWhale = ease(prog(t, bc, bc + 1.2)) * (1 - ease(prog(t, by, by + 2)));
    cam(960, 540, 1);
    seaScene(t, storm);
    const whaleUp = easeOut(prog(t, bc - .5, bc + 2)), riding = t > bc + 1;
    const wx = lerp(960, 960, 1) + (t > by ? lerp(0, 0, 1) : 0), wy = lerp(1300, 760, whaleUp) + Math.sin(t * 1.3) * 12;
    if (t > bc - .5) { whaleChar(wx, wy, 1, t, 1, (t > I('goz_kirp') && t < I('goz_kirp') + .6) ? 1 : 0); spout(wx - 120, wy - 240, t, prog(t, bc + .5, bc + 1.5) * (1 - prog(t, ky, ky + 2))); }
    const raftBroken = t > dd + .8;
    const rx = 960 + Math.sin(t * .7) * 60 * (1 - storm), ry = 620 + Math.sin(t * 1.6) * (14 + storm * 40), rrot = Math.sin(t * 1.3) * (.05 + storm * .2);
    const yBase = riding ? wy - 260 : ry;
    if (!raftBroken) raft(rx, ry, rrot, 1);
    else if (!riding) { const r = rng(7); for (let k = 0; k < 6; k++) { ctx.save(); ctx.translate(rx + (r() - .5) * 600 * prog(t, dd + .8, dd + 3), ry + r() * 80); ctx.rotate(t * (r() - .5) * 3); ctx.fillStyle = '#8a5a2b'; rrect(-30, -20, 58, 44, 18); ctx.fill(); ctx.restore(); } }
    const cx = riding ? wx : rx;
    homur(cx, (riding ? wy - 420 : ry - 320), .75, t, { mood: storm > .5 && !riding ? 'surprised' : 'happy', colorful: 1, look: [1, 0] });
    const bob = (k) => riding ? 0 : Math.sin(t * 3 + k) * 6;
    fistik(cx - 120, yBase - 30 + bob(1), .65, t, { scared: storm > .5 && !riding, armsUp: (t > I('denizci') && t < I('denizci') + 3) || (riding && t > I('tesekkur')), rot: rrot });
    buzbas(cx + 130, yBase - 20 + bob(2), .6, t, { flap: storm > .5, rot: rrot });
    pofi(cx - 300, yBase - 180 + bob(3), .62, t, { surprised: storm > .5 && !riding ? 1 : 0, armsUp: t > I('dayanin') && t < bc });
    piril(cx + 300, yBase - 210 + bob(4), .34, t, {});
    if (storm > 0) { rainFx(t, storm); if (storm > .5 && (t * .8) % 1 < .06) lightning(300 + (Math.floor(t * .8) % 4) * 400, 0, 500, Math.floor(t)); }
    if (t > dd && t < dd + 2.5) { const p = prog(t, dd, dd + 2); ctx.fillStyle = '#1a3060'; ctx.beginPath(); ctx.moveTo(-50, H); ctx.lineTo(-50, lerp(H, 200, Math.sin(p * Math.PI))); ctx.quadraticCurveTo(700, lerp(H, -100, Math.sin(p * Math.PI)), 1400, lerp(H, 300, Math.sin(p * Math.PI))); ctx.lineTo(1400, H); ctx.fill(); }
    ctx.restore();
    if (t > bc && t < bc + 1.6) burst(960, 300, 'ŞLAAAP!', prog(t, bc, bc + 1.6), '#9fd8ff', '#1f6fc0');
    if (storm > 0) { ctx.fillStyle = `rgba(10,10,35,${storm * .2})`; ctx.fillRect(0, 0, W, H); }
    chapter('1. DURAK', 'ENGİN DENİZ', lt, '#1f7fc0');
  },
  ada(t, lt, D) {
    const oj = I('orman_gir'), uc = I('ucurum'), sm = I('sarmasik'), tg = I('tapinak_gor'), kp = I('kapi'), ka = I('kapi_acilir');
    if (t < oj + 1) {
      beach(t);
      const wi = easeOut(prog(lt, .5, 4));
      const off = t > oj ? easeIn(prog(t, oj, oj + 1)) * 1400 : 0;
      pofi(lerp(-300, 520, wi) + off, 430, .75, t, { worried: t > I('izler') });
      fistik(lerp(-200, 760, wi) + off, 900, .85, t, { look: t > I('izler') ? [.6, .5] : undefined });
      buzbas(lerp(-200, 1000, wi) + off, 900, .8, t, { proud: t > I('ada') && t < I('izler') });
      homur(lerp(-400, 1350, wi) + off, 260, .65, t, { mood: 'happy', colorful: 1 });
      piril(lerp(-100, 1600, wi) + off, 520, .4, t, {});
      const fo = prog(t, oj + .5, oj + 1); if (fo > 0) { ctx.fillStyle = `rgba(0,0,0,${fo})`; ctx.fillRect(0, 0, W, H); }
    } else if (t < tg - .2) {
      const swinging = t > sm && t < sm + 9 + 2;
      jungle(t, swinging ? (t - sm) * 60 : 0, true);
      const sp = prog(t, sm + .3, sm + 8.5);
      const swing = (k) => { const q = clamp(sp * 1.15 - k * .05); const x = lerp(400 - k * 60, 1550 - k * 60, q), y = 620 + Math.sin(q * Math.PI) * -120 + Math.sin(q * Math.PI * 3) * 40; return [x, y, Math.sin(q * Math.PI * 3) * .4]; };
      if (t < sm) {
        pofi(380, 430, .7, t, { worried: true, armsUp: t > I('atla') }); fistik(470, 860, .8, t, { confident: t > uc + 2, armsUp: t > I('atla') }); buzbas(260, 860, .75, t, { sad: t < uc + 3 }); homur(200, 250, .6, t, { mood: 'happy', colorful: 1 }); piril(560, 560, .38, t, {});
      } else {
        ['fistik', 'pofi', 'buzbas', 'piril'].forEach((n, k) => {
          const [x, y, r] = swing(k);
          ctx.strokeStyle = '#2a5a2a'; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(x + Math.sin(r) * -400, -20); ctx.lineTo(x, y - 120); ctx.stroke();
          if (n === 'fistik') fistik(x, y + 60, .7, t, { armsUp: true, rot: r, mouth: talking('fistik', t) ? undefined : .5 });
          if (n === 'pofi') pofi(x, y - 60, .6, t, { armsUp: true, rot: r * .5 });
          if (n === 'buzbas') { const fall = prog(t, I('buzbas_dus'), I('yakala') + 1); buzbas(x, y + 40 + Math.sin(fall * Math.PI) * 200, .65, t, { flap: true, rot: r + fall * 3, mouth: talking('buzbas', t) ? undefined : .3 }); }
          if (n === 'piril') piril(x, y - 40, .34, t, { rot: t * 3 });
        });
        const [hx] = swing(0); homur(hx - 200, 220, .6, t, { mood: 'happy', colorful: 1 });
        if (t > I('yakala') && t < I('yakala') + 1.5) burst(1200, 520, 'HOP!', prog(t, I('yakala'), I('yakala') + 1.5));
      }
    } else {
      const stones = [0, 1, 2, 3].map(i => prog(t, ka + i * .35, ka + i * .35 + .3));
      templeExterior(t, easeOut(prog(t, ka + 1.8, ka + 4.5)), stones);
      const wi = easeOut(prog(t, tg - .2, tg + 2.5));
      const press = t > I('birlikte') + 1;
      const tp = (i) => [[620, 470], [740, 470], [1180, 470], [1300, 470]][i];
      if (!press) { pofi(lerp(-200, 560, wi), 300, .6, t, {}); fistik(lerp(-100, 700, wi), 950, .75, t, {}); buzbas(lerp(-150, 1250, wi), 950, .7, t, {}); homur(lerp(-300, 1500, wi), 220, .55, t, { mood: 'happy', colorful: 1 }); piril(lerp(-100, 380, wi), 560, .36, t, {}); }
      else {
        const go = easeOut(prog(t, I('birlikte') + 1, ka));
        pofi(lerp(560, tp(0)[0] - 40, go), lerp(300, tp(0)[1] - 120, go), .5, t, { armsUp: true }); fistik(lerp(700, tp(1)[0], go), lerp(950, tp(1)[1] + 160, go), .6, t, { armsUp: true });
        buzbas(lerp(1250, tp(2)[0], go), lerp(950, tp(2)[1] + 140, go), .55, t, { flap: true }); homur(lerp(1500, tp(3)[0] + 60, go), lerp(220, tp(3)[1] - 170, go), .45, t, { mood: 'happy', colorful: 1 }); piril(lerp(380, 960, go), lerp(560, 260, go), .34, t, {});
      }
      if (t > ka + 1.5 && t < ka + 3.5) burst(960, 200, 'GRRRAK!', prog(t, ka + 1.5, ka + 3.5), '#e8d8a8', '#7d7356');
    }
    if (t < oj + 1) chapter('2. DURAK', 'GÖKKUŞAĞI ADASI', lt, '#2f9a4a');
  },
  tapinak(t, lt, D) {
    const im = I('imdat'), tz = I('tuzak'), yd = I('yardim'), kr = I('kurtar'), ku = I('kurtarma'), ts = I('tilkos_sok');
    const zT = ease(prog(t, tz - .5, tz + .8)) * (1 - ease(prog(t, I('ohsun'), I('ohsun') + 1)));
    const pin = [...TL.lines].find(l => l.inner && l.who === 'pofi' && l.start > tz); const zP = pin ? ease(prog(t, pin.start - .3, pin.start + .5)) * (1 - ease(prog(t, pin.start + pin.dur, pin.start + pin.dur + .7))) : 0;
    const tin = [...TL.lines].find(l => l.inner && l.who === 'tilkos' && l.start > ts); const zT2 = tin ? ease(prog(t, tin.start - .3, tin.start + .5)) * (1 - ease(prog(t, tin.start + tin.dur, tin.start + tin.dur + .7))) : 0;
    ctx.save();
    if (zT > 0) cam(lerp(960, 1250, zT), lerp(540, 560, zT), 1 + .5 * zT); else if (zP > 0) cam(lerp(960, 520, zP), lerp(540, 450, zP), 1 + .5 * zP); else if (zT2 > 0) cam(lerp(960, 1100, zT2), lerp(540, 600, zT2), 1 + .45 * zT2);
    const wi = easeOut(prog(lt, .5, 4.5));
    templeInterior(t, (1 - wi) * 600, true);
    const pulled = easeOut(prog(t, ku + .5, ku + 4.5));
    const hangY = 640 + Math.sin(t * 3) * 25;
    const tX = lerp(1250, 1050, pulled), tY = lerp(hangY, 880, pulled) - Math.sin(pulled * Math.PI) * 140;
    if (pulled < .95) { ctx.strokeStyle = '#6a8a3a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(1250, -10); ctx.lineTo(tX, tY - 290); ctx.stroke(); }
    if (t > im - 1) tilkos(tX, tY, .8, t, { mood: t < ts - .5 ? 'scared' : (t < I('birlikte2') ? 'sad' : 'happy'), armsUp: pulled < .5, look: [-1, 0] });
    const hold = t > kr && t < ku + 4.5;
    fistik(lerp(-200, hold ? 960 : 720, wi) + (hold ? 0 : 0), 900, .85, t, { scared: t > im && t < tz + 2, armsUp: hold, sad: false, confident: false, look: hold ? [1, -.5] : undefined, flip: false });
    pofi(lerp(-300, 520, wi), 430, .75, t, { worried: t > tz && t < yd + 1 });
    buzbas(lerp(-200, 360, wi), 900, .8, t, { sad: t > tz && t < tz + 3 });
    homur(lerp(-400, hold ? 900 : 300, wi), hold ? 420 : 240, .65, t, { mood: 'happy', colorful: 1 });
    piril(lerp(-100, 700, wi), 560, .4, t, { glow: 1.4 });
    if (hold) { ctx.strokeStyle = '#e8702a'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(900, 760); ctx.quadraticCurveTo(1000, 700, tX - 40, tY - 120); ctx.stroke(); }
    ctx.restore();
    if (t > im && t < im + 1.4) burst(1250, 300, 'İMDAT!', prog(t, im, im + 1.4), '#ffe066', '#c0213a');
    chapter('3. DURAK', 'GİZEMLİ TAPINAK', lt, '#8a6a3a');
  },
  hazine(t, lt, D) {
    const sn = I('sandik'), ag = I('agir'), gu = I('gurultu'), tu = I('tutun'), k1 = I('kos1'), ky = I('kaya'), kk = I('kaya_kovalamaca'), at = I('atlayin'), ci = I('cikis');
    const running = t > k1;
    const collapse = prog(t, gu, gu + 1);
    ctx.save(); if (t > gu) shake(t > ci + 1 ? 0 : 7, t);
    if (!running) {
      const zC = ease(prog(t, sn, sn + 1.5)) * (1 - ease(prog(t, ag, ag + 1)));
      cam(960, lerp(540, 620, zC), 1 + .35 * zC);
      treasureRoom(t, 0, collapse);
      const lift = t > ag && t < gu ? Math.abs(Math.sin(t * 8)) * 10 : 0;
      chest(960, 760 - lift, 1, t, 0, 1);
      tilkos(lerp(1300, 1120, prog(t, ag - 1, ag)), 900, .85, t, { mood: t > ag ? 'scared' : 'happy', armsUp: t > ag - .5 && t < gu, look: [-1, 0] });
      fistik(700, 900, .85, t, { armsUp: t > sn + 2 && t < ag, scared: t > gu });
      pofi(520, 420, .75, t, { surprised: t > gu ? 1 : 0, armsUp: t > tu });
      buzbas(380, 900, .8, t, { flap: t > gu });
      homur(1450, 260, .65, t, { mood: t > gu ? 'surprised' : 'happy', colorful: 1 });
      piril(1300, 520, .4, t, {});
      if (t > gu) { const r = rng(Math.floor(t * 6)); for (let i = 0; i < 6; i++) { ctx.fillStyle = '#7d7366'; const x = r() * W, y = ((t - gu) * 600 + r() * 900) % 1000; rrect(x, y, 30 + r() * 30, 24 + r() * 20, 6); ctx.fill(); } }
    } else {
      const scroll = (t - k1) * 900;
      templeInterior(t, scroll, false);
      const exitP = prog(t, at, ci + .5);
      if (t > at - 1) { glow(lerp(2600, 1700, prog(t, at - 1, ci)), 600, 600, '255,250,220', .8); ctx.fillStyle = `rgba(255,250,225,${prog(t, at - 1, ci)})`; ctx.fillRect(lerp(2400, 1550, prog(t, at - 1, ci)), 200, 600, 700); }
      const bob = (k) => Math.abs(Math.sin(t * 12 + k)) * 18;
      const jump = t > ci - 1 ? Math.sin(prog(t, ci - 1, ci + .8) * Math.PI) * 220 : 0;
      const gx = 1000 + Math.sin(t * .7) * 40 + exitP * 900;
      chest(gx, 760 - bob(0) - jump, .7, t, 0, .7);
      fistik(gx - 230, 900 - bob(1) - jump, .7, t, { armsUp: true, walk: true, scared: true });
      tilkos(gx + 230, 900 - bob(2) - jump, .7, t, { mood: 'scared', armsUp: true });
      buzbas(gx + 400, 900 - bob(3) - jump, .65, t, { flap: true });
      pofi(gx - 80, 560 - bob(4) * .5 - jump, .6, t, { armsUp: true, effort: true });
      homur(gx + 120, 420 - jump, .55, t, { mood: 'surprised', colorful: 1 });
      piril(gx - 420, 600 - bob(5) - jump, .34, t, { glow: 1.3 });
      if (t > ky - .5) { const bx = lerp(-500, 250, easeOut(prog(t, ky - .5, ky + 1.5))) + Math.sin(t * 2) * 60 + exitP * 300; boulderObj(bx, 700, 280, t * 6); ctx.fillStyle = 'rgba(160,140,110,.5)'; for (let i = 0; i < 6; i++) { circ(bx - 200 - i * 50, 960 - Math.abs(Math.sin(t * 9 + i)) * 40, 30 - i * 4); ctx.fill(); } }
      if (t > ky && t < ci) speedLines(t, gx, 600, .35);
    }
    ctx.restore();
    if (t > ci + .5 && t < ci + 2.2) { ctx.fillStyle = `rgba(255,250,230,${1 - prog(t, ci + .5, ci + 1.5)})`; ctx.fillRect(0, 0, W, H); }
    if (t > ci + 1) { const p = prog(t, ci + 1, ci + 3); burst(960, 400, 'GÜÜÜM!', p, '#ffe066', '#c0213a'); }
    if (t > gu && t < gu + 1.5) burst(960, 220, 'GÜRÜM!', prog(t, gu, gu + 1.5), '#e8d8a8', '#7d7356');
    if (t > ci + 2) { autumnValley(t, {}); const p = easeOut(prog(t, ci + 2, ci + 3)); chest(960, 860, .8, t, 0, .6); fistik(700, 900, .85, t, { armsUp: true }); tilkos(1250, 900, .8, t, { mood: 'happy' }); pofi(520, 430, .72, t, { armsUp: true }); buzbas(1450, 900, .75, t, {}); homur(1500, 260, .62, t, { mood: 'happy', colorful: 1 }); piril(380, 560, .4, t, {}); ctx.fillStyle = `rgba(255,250,230,${1 - p})`; ctx.fillRect(0, 0, W, H); }
    chapter('4. DURAK', 'HAZİNE ODASI', lt, '#c98a20');
  },
  final(t, lt, D) {
    const ac = I('acilis_sandik'), ag = I('agac_buyur'), ku = I('kutlama'), son = I('son');
    const grow = prog(t, ag + .5, ag + 9);
    autumnValley(t, { rainbowTree: grow });
    if (t > ag && t < ag + 1.2) { ctx.fillStyle = '#6a4a2a'; ell(960, 930, 80, 20); ctx.fill(); }
    rainbowTree(960, 930, grow, t);
    const open = easeOut(prog(t, ac, ac + 1.5));
    if (grow < .2) chest(1300, 900, .75, t, open, 1);
    else chest(1650, 920, .5, t, 1, .5);
    if (t > ac + 1.2 && t < ag + 1) { for (let i = 0; i < 6; i++) { const a = t * 2 + i; glow(1300 + Math.cos(a) * 40, 700 + Math.sin(a) * 20, 30, ['255,107,122', '255,176,90', '255,227,107', '127,224,138', '106,192,255', '176,138,255'][i], .9); } }
    if (t > ag - 1 && t < ag + 1) { const p = prog(t, ag - 1, ag + .5); for (let i = 0; i < 6; i++) { glow(lerp(1300, 960, p), lerp(700, 930, p) - Math.sin(p * Math.PI) * 200, 26, '255,240,180', 1 - p * .5); } }
    const dancing = t > ku && t < I('kapanis'), beat = 60 / 132, bp = dancing ? ((t - ku) / beat) % 1 : 0, bounce = dancing ? Math.abs(Math.sin(bp * Math.PI)) * 50 : 0;
    const left = grow > .3;
    pofi(left ? 380 : 520, 430 - bounce, .72, t, { armsUp: dancing || (t > ag + 3 && t < ag + 8), squash: dancing ? Math.sin(bp * 6.28) * .05 : 0 });
    fistik(left ? 560 : 760, 900 - bounce, .85, t, { armsUp: dancing || t > I('findik'), hold: t > I('findik') && t < I('ders') ? 'nut' : null, rot: dancing ? Math.sin((t - ku) * Math.PI / beat) * .2 : 0 });
    piril(left ? 220 : 1100, 560 - bounce * .8, .4, t, { rot: dancing ? (t - ku) * 2 : 0 });
    buzbas(left ? 1380 : 1500, 900 - bounce, .78, t, { flap: dancing });
    tilkos(left ? 1220 : 1100, 900 - bounce, .82, t, { mood: 'happy', armsUp: dancing || t > I('hosgeldin'), look: [-1, -.2], hold: null });
    homur(left ? 1560 : 1450, 260 - bounce * .5, .62, t, { mood: 'happy', colorful: 1 });
    if (dancing) { notes(t, 960, 640); confetti(t, ku, 90); }
    if (t > son) {
      const e = prog(t, son, son + .8);
      ctx.fillStyle = `rgba(30,15,10,${e * .62})`; ctx.fillRect(0, 0, W, H);
      bigText('SON', 960, 200, 170, '#ffe066', '#5a2a10', e, easeBack(e));
      bigText('Sıradaki macera:', 960, 380, 60, '#ffffff', '#5a2a10', prog(t, son + .6, son + 1.2), easeBack(prog(t, son + .6, son + 1.2)));
      bigText('Pofi ve Uzay Yolculuğu', 960, 470, 90, '#9fd8ff', '#1d3b7a', prog(t, son + 1, son + 1.6), easeBack(prog(t, son + 1, son + 1.6)));
      const b = easeBack(prog(t, son + 1.8, son + 2.4)), pulse = 1 + Math.sin(t * 6) * .04;
      if (b > 0) {
        ctx.save(); ctx.translate(960, 680); ctx.scale(b * pulse, b * pulse);
        ctx.fillStyle = '#ff2d4a'; rrect(-330, -70, 660, 140, 70); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(-250, -36); ctx.lineTo(-190, 0); ctx.lineTo(-250, 36); ctx.fill();
        ctx.font = `800 70px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ABONE OL', 40, 6);
        ctx.restore();
        bigText('Beğenmeyi ve arkadaşlarınla paylaşmayı unutma!', 960, 840, 52, '#ffffff', '#5a2a10', prog(t, son + 2.6, son + 3.2));
      }
    }
  },
};

function renderFrame(t) {
  NOW = t;
  const sc = TL.scenes.find(s => t >= s.start && t < s.end) || TL.scenes[TL.scenes.length - 1];
  const lt = t - sc.start, D = sc.end - sc.start;
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H);
  for (const k in POS) delete POS[k];
  S[sc.name](t, lt, D);
  ctx.restore();
  thoughtBubble(t);
  subtitle(t);
  const idx = TL.scenes.indexOf(sc);
  const fin = idx === 0 ? 1 - prog(lt, 0, 1.2) : 1 - prog(lt, 0, .4);
  const fout = idx === TL.scenes.length - 1 ? prog(lt, D - 2.5, D) : prog(lt, D - .4, D);
  const f = Math.max(fin, fout);
  if (f > 0) { ctx.fillStyle = `rgba(5,3,25,${f})`; ctx.fillRect(0, 0, W, H); }
}
window.renderThumb = () => {
  NOW = 2; const t = 2;
  seaScene(t, .6); rainFx(t, .5);
  ctx.save(); ctx.globalAlpha = .9; pirateShip(1500, 900, .7, t); ctx.restore();
  glow(960, 560, 500, '255,220,120', .6);
  mapPiece(960, 600, 1.6, t, 'F');
  tilkos(1500, 1000, 1.4, t, { mood: 'sly', look: [-1, 0], mouth: 0 });
  pofi(420, 560, 1.15, t, { surprised: 1, mouth: .8, look: [1, 0], armsUp: true });
  fistik(330, 1060, .85, t, { scared: true, mouth: .6, look: [1, -.3], big: 1.2 });
  bigText('HAZİNE', 960, 140, 170, '#ffe066', '#5a2a10', 1, 1, -.03);
  bigText('ÇALINDI!', 1000, 960, 130, '#ffffff', '#c0213a', 1, 1, -.04);
};
window.setup = async (tl) => { TL = tl; ID = tl.ids; await document.fonts.load(`800 50px "Baloo 2"`).catch(() => {}); await document.fonts.load(`italic 800 50px "Baloo 2"`).catch(() => {}); await document.fonts.ready; return document.fonts.check(`800 50px "Baloo 2"`); };
window.renderFrame = renderFrame;
</script></body></html>
