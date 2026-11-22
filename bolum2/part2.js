// ================= EPISODE 2: new characters =================
function kristalPower(t) {
  const k = [[0, 1], [I('sorun'), 1], [I('ucus_est'), .92], [I('kucuk'), .78], [I('orman_est'), .66], [I('magara_est'), .55], [I('sonuk'), .42], [I('zirve_est'), .35], [I('aile'), .24], [I('kar_yagar') + 2, .24], [I('buyuyor') + 2.5, 1]];
  for (let i = 1; i < k.length; i++) if (t < k[i][0]) { const [t0, v0] = k[i - 1], [t1, v1] = k[i]; return lerp(v0, v1, ease(prog(t, t0, t1))); }
  return 1;
}
function kristal(x, y, s, t, o = {}) {
  y += talkBob('kristal', t);
  const p = o.power ?? kristalPower(t), sc = s * (.55 + .45 * p);
  ctx.save(); ctx.translate(x, y); reg('kristal', 0, 0, sc); ctx.scale(sc, sc);
  glow(0, 0, 260, '170,225,255', .25 + .5 * p);
  ctx.save(); ctx.rotate((o.spin ?? t * .25));
  for (let k = 0; k < 6; k++) {
    ctx.save(); ctx.rotate(k * Math.PI / 3);
    for (const [col, lw] of [['#8fd0ff', 30], ['#eefaff', 18]]) {
      ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(0, -60); ctx.lineTo(0, -160);
      for (const [d, l] of [[-95, 42], [-128, 30]]) { ctx.moveTo(0, d); ctx.lineTo(-l, d - l); ctx.moveTo(0, d); ctx.lineTo(l, d - l); }
      ctx.stroke();
    }
    ctx.fillStyle = '#fff'; circ(0, -165, 12); ctx.fill();
    if (p < .6) { const ph = (t * .8 + k * .37) % 1; ctx.fillStyle = `rgba(150,210,255,${(1 - ph) * (1 - p)})`; ell(0, -165 + ph * 120, 6, 9); ctx.fill(); }
    ctx.restore();
  }
  ctx.restore();
  // face hexagon
  ctx.beginPath(); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3 + Math.PI / 6; ctx.lineTo(Math.cos(a) * 78, Math.sin(a) * 78); } ctx.closePath();
  const g = ctx.createRadialGradient(-20, -25, 5, 0, 0, 90); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#bfe6ff');
  ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = '#8fd0ff'; ctx.lineWidth = 6; ctx.stroke();
  const bl = Math.max(blink(t, 6), p < .4 ? .45 : 0, o.dizzy ? .3 : 0);
  if (o.dizzy) { ctx.strokeStyle = '#2a3a6a'; ctx.lineWidth = 4; for (const sx of [-1, 1]) { ctx.beginPath(); for (let a = 0; a < 12; a += .3) ctx.lineTo(sx * 26 + Math.cos(a + t * 6) * a * 1.1, -6 + Math.sin(a + t * 6) * a * 1.1); ctx.stroke(); } }
  else eyes(0, -6, 26, 10, 14, bl, o.look ?? lookAt('kristal'), 1, o.closed);
  if (o.worried || p < .45) brows(0, -32, 26, 18, .5, '#2a3a6a', 4);
  ctx.fillStyle = 'rgba(255,140,180,.55)'; ell(-44, 16, 11, 7); ctx.fill(); ell(44, 16, 11, 7); ctx.fill();
  mouthShape(0, 24, 24, o.mouth ?? mouth('kristal', t), (o.sad || p < .45) ? -1 : 1, '#3a4a8a');
  if (o.tears) for (const sx of [-1, 1]) { const ph = (t * 1.2 + (sx > 0 ? .5 : 0)) % 1; ctx.fillStyle = `rgba(140,200,255,${1 - ph})`; ell(sx * 26, 10 + ph * 50, 5, 8); ctx.fill(); }
  ctx.restore();
  if (o.dizzy) for (let i = 0; i < 4; i++) { const a = t * 4 + i * 1.57; sparkle(x + Math.cos(a) * 110 * sc, y - 120 * sc + Math.sin(a) * 30 * sc, 16, .9); }
}
function buzbas(x, y, s, t, o = {}) {
  y += talkBob('buzbas', t);
  ctx.save(); ctx.translate(x, y); reg('buzbas', 0, -60 * s, s); ctx.rotate(o.rot || 0); ctx.scale(s * (o.flip ? -1 : 1), s);
  const flap = o.flap ? Math.sin(t * 16) * .6 : (talking('buzbas', t) ? Math.sin(t * 8) * .25 : 0);
  ctx.fillStyle = '#f29a1f'; ell(-24, 78, 26, 11); ctx.fill(); ell(24, 78, 26, 11); ctx.fill();
  ctx.fillStyle = '#1f2433';
  ctx.save(); ctx.translate(-56, -5); ctx.rotate(.35 + flap); ell(0, 30, 14, 42); ctx.fill(); ctx.restore();
  ctx.save(); ctx.translate(56, -5); ctx.rotate(-.35 - flap); ell(0, 30, 14, 42); ctx.fill(); ctx.restore();
  ctx.fillStyle = '#262c3f'; ell(0, 0, 64, 84); ctx.fill();
  ctx.fillStyle = '#f7f9ff'; ell(0, 18, 44, 62); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-40, -50); ctx.quadraticCurveTo(-20, -15, 0, -40); ctx.quadraticCurveTo(20, -15, 40, -50); ctx.quadraticCurveTo(46, -10, 0, 0); ctx.quadraticCurveTo(-46, -10, -40, -50); ctx.fill();
  ctx.fillStyle = '#d63a3a'; rrect(-48, -14, 96, 18, 9); ctx.fill(); ctx.save(); ctx.translate(-28, 0); ctx.rotate(.2 + Math.sin(t * 5) * .15); rrect(-9, 0, 18, 44, 6); ctx.fill(); ctx.restore();
  const lk = o.look ?? lookAt('buzbas');
  eyes(0, -44, 18, 8, 11, Math.max(blink(t, 7), o.sleepy || 0), o.flip ? [-lk[0], lk[1]] : lk, o.big || 1, o.closed);
  if (o.sad) brows(0, -62, 18, 14, .5, '#1f2433', 4);
  if (o.proud) brows(0, -62, 18, 14, -.3, '#1f2433', 4);
  const m = o.mouth ?? mouth('buzbas', t);
  ctx.fillStyle = '#f29a1f'; ctx.beginPath(); ctx.moveTo(-14, -30); ctx.lineTo(14, -30); ctx.lineTo(0, -16 + 2); ctx.fill();
  ctx.fillStyle = '#d97a10'; ctx.beginPath(); ctx.moveTo(-11, -28 + m * 4); ctx.lineTo(11, -28 + m * 4); ctx.lineTo(0, -12 + m * 14); ctx.fill();
  if (o.stars) for (let i = 0; i < 4; i++) { const a = t * 5 + i * 1.57; sparkle(Math.cos(a) * 70, -140 + Math.sin(a) * 18, 14, .95); }
  // explorer hat
  ctx.fillStyle = '#c9a66b'; ell(0, -76, 70, 14); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, -80, 46, 40, 0, Math.PI, 0); ctx.fill();
  ctx.fillStyle = '#7a5a2a'; rrect(-46, -88, 92, 10, 4); ctx.fill();
  ctx.restore();
}
function bigCloud(x, y, s, t, o = {}) { // merged Pofi+Homur snow cloud
  ctx.save(); ctx.translate(x, y + Math.sin(t * 1.5) * 8); reg('pofi', -120 * s, 0, s); ctx.scale(s, s);
  glow(0, 0, 700, '255,255,255', .25);
  const puffs = [[-380, 40, 150], [-250, -60, 190], [-80, -120, 220], [100, -110, 220], [270, -50, 190], [400, 40, 150], [-200, 70, 170], [0, 60, 200], [200, 70, 170]];
  ctx.fillStyle = '#b9c7ff'; for (const p of puffs) { circ(p[0], p[1] + 14, p[2] + 14); ctx.fill(); }
  const g = ctx.createLinearGradient(0, -330, 0, 260); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#dfe6ff');
  ctx.fillStyle = g; for (const p of puffs) { circ(p[0], p[1], p[2]); ctx.fill(); }
  ctx.globalAlpha = .35; ['#ff8a96', '#ffbf7a', '#fff08a', '#8fe7a0', '#8fcaff', '#c9a3ff'].forEach((c, i) => { ctx.fillStyle = c; circ(140 + (i - 2.5) * 70, -40 + Math.abs(i - 2.5) * 20, 70); ctx.fill(); }); ctx.globalAlpha = 1;
  eyes(-180, -10, 48, 18, 24, blink(t, 1), [0, .3], 1); ctx.fillStyle = 'rgba(255,130,160,.55)'; ell(-270, 40, 30, 16); ctx.fill(); ell(-90, 40, 30, 16); ctx.fill(); mouthShape(-180, 50, 60, o.mouth ?? 0, 1);
  eyes(180, -10, 52, 18, 24, blink(t, 3), [0, .3], 1); brows(180, -55, 52, 40, .15, '#4a2a6a', 8); ell(90, 40, 30, 16); ctx.fill(); ell(270, 40, 30, 16); ctx.fill(); mouthShape(180, 52, 64, o.mouth2 ?? 0, 1, '#1a0f24');
  ctx.restore();
}

// ================= EPISODE 2: environments =================
const FLAKES = (() => { const r = rng(99), a = []; for (let i = 0; i < 420; i++) a.push({ x: r() * W, y: r() * H, s: 1.5 + r() * 4.5, sp: 40 + r() * 90, ph: r() * 6.28, d: r() }); return a; })();
function snowFx(t, density = 1, wind = 0, alpha = .9) {
  const n = Math.floor(FLAKES.length * clamp(density / 3, 0, 1));
  ctx.fillStyle = `rgba(255,255,255,${alpha})`;
  for (let i = 0; i < n; i++) {
    const f = FLAKES[i], sp = f.sp * (1 + density * .3);
    const x = (((f.x + t * wind * (60 + f.s * 40) + Math.sin(t * 1.3 + f.ph) * 25) % W) + W) % W;
    const y = (((f.y + t * sp) % (H + 20)) + H + 20) % (H + 20) - 10;
    if (wind > 2) { ctx.save(); ctx.globalAlpha = alpha * .8; ctx.strokeStyle = '#fff'; ctx.lineWidth = f.s * .8; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - wind * 6, y - 3); ctx.stroke(); ctx.restore(); }
    else { circ(x, y, f.s); ctx.fill(); }
  }
}
function snowPine(x, base, w, h, snow = 1) {
  ctx.fillStyle = '#4a3326'; ctx.fillRect(x - w * .07, base - h * .2, w * .14, h * .22);
  for (let k = 0; k < 3; k++) {
    const yy = base - h * .15 - k * h * .26, ww = w * (1 - k * .25);
    ctx.fillStyle = ['#1f5e4a', '#256b53', '#2c785d'][k]; ctx.beginPath(); ctx.moveTo(x - ww / 2, yy); ctx.lineTo(x, yy - h * .45); ctx.lineTo(x + ww / 2, yy); ctx.closePath(); ctx.fill();
    if (snow) { ctx.fillStyle = '#f4f9ff'; ctx.beginPath(); ctx.moveTo(x - ww * .3, yy - h * .2); ctx.lineTo(x, yy - h * .45); ctx.lineTo(x + ww * .3, yy - h * .2); ctx.quadraticCurveTo(x + ww * .15, yy - h * .14, x, yy - h * .2); ctx.quadraticCurveTo(x - ww * .15, yy - h * .14, x - ww * .3, yy - h * .2); ctx.fill(); }
  }
}
function cottage(x, y, s, t) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.fillStyle = '#c96a3c'; ctx.fillRect(-90, -100, 180, 100);
  ctx.fillStyle = '#7a3a2a'; ctx.fillRect(40, -200, 30, 70);
  for (let i = 0; i < 4; i++) { const ph = (t * .35 + i / 4) % 1; ctx.fillStyle = `rgba(240,240,250,${.5 * (1 - ph)})`; circ(55 + Math.sin(ph * 6 + i) * 18, -210 - ph * 160, 18 + ph * 26); ctx.fill(); }
  ctx.fillStyle = '#f4f9ff'; ctx.beginPath(); ctx.moveTo(-115, -95); ctx.lineTo(0, -185); ctx.lineTo(115, -95); ctx.quadraticCurveTo(0, -80, -115, -95); ctx.fill();
  ctx.fillStyle = '#ffd36b'; glow(-40, -55, 70, '255,210,110', .5); rrect(-60, -75, 40, 40, 6); ctx.fill(); ctx.fillStyle = '#5a3020'; rrect(25, -70, 38, 70, 8); ctx.fill();
  ctx.restore();
}
function snowValley(t, o = {}) {
  const mode = o.mode || 'day';
  if (mode === 'day') skyGrad('#8fd3ff', '#cdeeff', '#f2fbff');
  else if (mode === 'sunset') skyGrad('#3b3f8f', '#c07aa8', '#ffc58a');
  else skyGrad('#0e1a4a', '#2a3a80', '#5a6ab0');
  if (mode === 'day') { glow(1600, 170, 260, '255,245,200', .6); ctx.fillStyle = '#fff6cf'; circ(1600, 170, 60); ctx.fill(); }
  for (let i = 0; i < 4; i++) cloudSmall(((i * 560 + t * 8) % 2500) - 250, 110 + (i % 2) * 70, 1, mode === 'day' ? .9 : .5);
  const hills = [['#dbe8f8', 610, .2], ['#e8f1fb', 700, .45], ['#f4f8ff', 800, .7]];
  hills.forEach(([c, y0, par], l) => {
    ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(-50, H); for (let x = -50; x <= W + 50; x += 40) ctx.lineTo(x, y0 + Math.sin(x * .003 + l * 2) * 55); ctx.lineTo(W + 50, H); ctx.fill();
    if (l === 0) for (let i = 0; i < 12; i++) snowPine(i * 170 + 40, 650 + Math.sin(i) * 30, 90, 180);
    if (l === 1) { cottage(380, 760, .8, t); cottage(1560, 770, .7, t); for (let i = 0; i < 6; i++) snowPine(150 + i * 330, 770, 130, 260); }
  });
  ctx.fillStyle = '#ffffff'; ctx.beginPath(); ctx.moveTo(-50, 880); ctx.quadraticCurveTo(W / 2, 830, W + 50, 880); ctx.lineTo(W + 50, H); ctx.lineTo(-50, H); ctx.fill();
  const r = rng(12); for (let i = 0; i < 40; i++) sparkle(r() * W, 840 + r() * 230, 4 + 3 * Math.sin(t * 3 + i), .6, '200,230,255');
}
function flightSky(t, storm) {
  skyGrad('#2b2f78', '#a8649c', '#ffb37a');
  if (storm > 0) { ctx.fillStyle = `rgba(20,20,45,${storm * .8})`; ctx.fillRect(0, 0, W, H); }
  glow(1500, 820, 300, '255,180,100', .6 * (1 - storm)); ctx.fillStyle = `rgba(255,200,120,${1 - storm})`; circ(1500, 860, 90); ctx.fill();
  for (let l = 0; l < 3; l++) for (let i = 0; i < 6; i++) { const sp = 120 + l * 160, x = W + 300 - ((i * 420 + t * sp) % (W + 600)); cloudSmall(x, 700 + l * 120 + (i % 2) * 30, 1.6 + l * .6, .55 + l * .15); }
}
function lakeBg(t, crack = 0, cx = 1250, cy = 840) {
  nightSky(t, '#0b1446', '#1f2e78', '#3d4c98');
  ctx.fillStyle = '#f6eecf'; glow(1550, 170, 200, '255,245,210', .4); circ(1550, 170, 55); ctx.fill();
  ctx.fillStyle = '#c9d6f0'; ctx.beginPath(); ctx.moveTo(0, 600); for (let x = 0; x <= W; x += 60) ctx.lineTo(x, 590 + Math.sin(x * .005) * 30); ctx.lineTo(W, 700); ctx.lineTo(0, 700); ctx.fill();
  for (let i = 0; i < 14; i++) snowPine(40 + i * 140, 640, 90, 190);
  const g = ctx.createLinearGradient(0, 640, 0, H); g.addColorStop(0, '#a9d4f2'); g.addColorStop(1, '#6aa8dc');
  ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(W / 2, 860, 1150, 250, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,.45)'; ctx.lineWidth = 4; const r = rng(4);
  for (let i = 0; i < 26; i++) { const x = r() * W, y = 700 + r() * 330, l = 60 + r() * 140; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + l, y + (r() - .5) * 10); ctx.stroke(); }
  glow(1550, 900, 300, '255,250,220', .25);
  ctx.fillStyle = '#eef4ff'; ctx.beginPath(); ctx.moveTo(0, 680); ctx.quadraticCurveTo(300, 690, 420, 760); ctx.quadraticCurveTo(300, 1000, 0, H); ctx.fill();
  if (crack > 0) {
    ctx.save(); ctx.strokeStyle = '#1d3d66'; ctx.lineWidth = 5; ctx.lineCap = 'round'; const cr = rng(21);
    for (let k = 0; k < 7; k++) { const a = k / 7 * 6.28 + cr(), len = (120 + cr() * 180) * clamp(crack * 1.4); ctx.beginPath(); ctx.moveTo(cx, cy); let px = cx, py = cy; for (let j = 1; j <= 5; j++) { px = cx + Math.cos(a + (cr() - .5) * .6) * len * j / 5; py = cy + Math.sin(a + (cr() - .5) * .6) * len * j / 5 * .4; ctx.lineTo(px, py); } ctx.stroke(); }
    if (crack > .6) { ctx.fillStyle = `rgba(20,50,90,${(crack - .6) * 2.2})`; ell(cx, cy + 10, 150 * (crack - .5), 40 * (crack - .5)); ctx.fill(); }
    ctx.restore();
  }
}
function blizzardBg(t, star = 0) {
  skyGrad('#16224f', '#2f417e', '#5a6aa0');
  if (star > 0) { glow(1500, 170, 380, '220,235,255', .55 * star); sparkle(1500, 170, 60 * star, star, '255,255,255'); ctx.strokeStyle = `rgba(255,255,255,${.6 * star})`; ctx.lineWidth = 3; for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4 + t * .2; ctx.beginPath(); ctx.moveTo(1500 + Math.cos(a) * 60, 170 + Math.sin(a) * 60); ctx.lineTo(1500 + Math.cos(a) * (130 + 20 * Math.sin(t * 3)), 170 + Math.sin(a) * (130 + 20 * Math.sin(t * 3))); ctx.stroke(); } }
  for (let l = 0; l < 3; l++) for (let i = 0; i < 10; i++) { const x = ((i * 230 + l * 90) % 2300) - 100; snowPine(x, 700 + l * 110, 150 + l * 60, 330 + l * 120); }
  ctx.fillStyle = '#e4ecfa'; ctx.fillRect(0, 880, W, 200);
  ctx.fillStyle = 'rgba(220,230,250,.28)'; ctx.fillRect(0, 0, W, H);
}
function caveBg(t, scroll = 0) {
  const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#081830'); g.addColorStop(1, '#14406a'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const r = rng(61);
  for (let i = 0; i < 26; i++) {
    const x = ((r() * 2600 - scroll * (.5 + r() * .5)) % 2600 + 2600) % 2600 - 300, y = r() < .5 ? 80 + r() * 150 : 650 + r() * 250, s = 40 + r() * 70, col = r() < .6 ? '120,220,255' : '190,150,255';
    glow(x, y, s * 2.4, col, .35 + .15 * Math.sin(t * 2 + i));
    ctx.fillStyle = `rgba(${col},.85)`; ctx.beginPath(); ctx.moveTo(x, y - s); ctx.lineTo(x + s * .4, y); ctx.lineTo(x, y + s * .5); ctx.lineTo(x - s * .4, y); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.5)'; ctx.beginPath(); ctx.moveTo(x, y - s); ctx.lineTo(x + s * .15, y - s * .2); ctx.lineTo(x - s * .1, y); ctx.fill();
  }
  ctx.fillStyle = '#cfefff';
  for (let i = 0; i < 30; i++) { const x = ((i * 77 - scroll * .9) % 2400 + 2400) % 2400 - 200, h = 40 + (i * 37 % 110); ctx.beginPath(); ctx.moveTo(x - 18, 0); ctx.lineTo(x + 18, 0); ctx.lineTo(x, h); ctx.fill(); }
  ctx.fillStyle = '#9fd4f5'; ctx.beginPath(); ctx.moveTo(0, 900); ctx.quadraticCurveTo(W / 2, 860, W, 900); ctx.lineTo(W, H); ctx.lineTo(0, H); ctx.fill();
}
function summitBg(t, dawn, cover = 0) {
  const top = `rgb(${lerp(14, 90, dawn)},${lerp(26, 110, dawn)},${lerp(74, 190, dawn)})`, mid = `rgb(${lerp(42, 240, dawn)},${lerp(58, 150, dawn)},${lerp(128, 160, dawn)})`, bot = `rgb(${lerp(90, 255, dawn)},${lerp(106, 200, dawn)},${lerp(176, 140, dawn)})`;
  skyGrad(top, mid, bot);
  if (dawn < .7) { ctx.save(); ctx.globalAlpha = 1 - dawn / .7; const r = rng(7); for (let i = 0; i < 150; i++) { ctx.fillStyle = '#fff'; circ(r() * W, r() * H * .6, r() * 2 + .5); ctx.fill(); } ctx.restore(); }
  const sunY = lerp(1000, 640, dawn); glow(1500, sunY, 420, '255,200,110', .8 * dawn * (1 - cover)); ctx.fillStyle = `rgba(255,214,110,${dawn * (1 - cover * .85)})`; circ(1500, sunY, 110); ctx.fill();
  ctx.fillStyle = '#cdd8ee'; ctx.beginPath(); ctx.moveTo(-100, H); ctx.lineTo(200, 640); ctx.lineTo(500, 760); ctx.lineTo(1300, 700); ctx.lineTo(2100, 820); ctx.lineTo(2100, H); ctx.fill();
  ctx.fillStyle = '#f4f8ff'; ctx.beginPath(); ctx.moveTo(-100, H); ctx.lineTo(-100, 860); ctx.quadraticCurveTo(700, 760, 1200, 830); ctx.quadraticCurveTo(1600, 880, 2100, 840); ctx.lineTo(2100, H); ctx.fill();
}
function familyCloud(x, y, s, t, happy) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 1.2 + x) * 8); ctx.scale(s, s);
  ctx.fillStyle = '#ffffff'; for (const [dx, dy, r] of [[-90, 20, 60], [-40, -30, 75], [40, -30, 75], [95, 15, 60], [0, 30, 70]]) { circ(dx, dy, r); ctx.fill(); }
  eyes(0, -5, 30, 11, 14, blink(t, x), [0, .8], 1); ctx.fillStyle = 'rgba(255,140,180,.5)'; ell(-55, 20, 14, 8); ctx.fill(); ell(55, 20, 14, 8); ctx.fill();
  mouthShape(0, 26, 30, 0, happy ? 1 : -1);
  ctx.restore();
}
function snowman(x, y, s, t, stage, nut) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const b1 = clamp(stage * 3), b2 = clamp(stage * 3 - 1), b3 = clamp(stage * 3 - 2);
  ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#c8d8ee'; ctx.lineWidth = 6;
  if (b1 > 0) { circ(0, -110 * b1, 115 * b1); ctx.fill(); ctx.stroke(); }
  if (b2 > 0) { circ(0, -290, 85 * easeBack(b2)); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#333'; for (let k = 0; k < 3; k++) { circ(0, -320 + k * 32, 8 * b2); ctx.fill(); } ctx.fillStyle = '#fff'; }
  if (b3 > 0) { // cloud-shaped head with grumpy brows (looks like Homur!)
    ctx.save(); ctx.translate(0, -440); ctx.scale(easeBack(b3), easeBack(b3));
    for (const [dx, dy, r] of [[-60, 10, 50], [-20, -30, 60], [35, -25, 58], [70, 15, 48], [0, 25, 60]]) { circ(dx, dy, r); ctx.fill(); }
    ctx.fillStyle = '#222'; circ(-25, -5, 9); ctx.fill(); circ(25, -5, 9); ctx.fill();
    brows(0, -30, 26, 26, -.3, '#5a4a6a', 7);
    ctx.strokeStyle = '#222'; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(0, 25, 20, .2, Math.PI - .2); ctx.stroke();
    if (nut) { ctx.fillStyle = '#8a5a2b'; ell(0, 10, 13, 16); ctx.fill(); ctx.fillStyle = '#5e3a18'; ell(0, -2, 14, 6); ctx.fill(); }
    ctx.restore();
  }
  if (b2 > .5) { ctx.strokeStyle = '#6a4a2a'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(-80, -300); ctx.lineTo(-170, -360); ctx.moveTo(80, -300); ctx.lineTo(170, -370 + Math.sin(t * 4) * 10); ctx.stroke(); }
  ctx.restore();
}
function snowball(x, y, r = 22) { ctx.fillStyle = '#ffffff'; circ(x, y, r); ctx.fill(); ctx.fillStyle = 'rgba(160,190,230,.6)'; circ(x + r * .25, y + r * .25, r * .6); ctx.fill(); ctx.fillStyle = '#fff'; circ(x - r * .1, y - r * .1, r * .7); ctx.fill(); }
function splatFx(x, y, p) { if (p <= 0 || p >= 1) return; for (let k = 0; k < 10; k++) { const a = k / 10 * 6.28, d = easeOut(p) * 70; ctx.fillStyle = `rgba(255,255,255,${1 - p})`; circ(x + Math.cos(a) * d, y + Math.sin(a) * d * .7, 10 * (1 - p) + 3); ctx.fill(); } }
function echoText(txt, x, y, t0, t) { for (let k = 0; k < 4; k++) { const tt = t - t0 - k * .45; if (tt < 0 || tt > 1.6) continue; const a = (1 - tt / 1.6) * (1 - k * .2); bigText(txt, x + k * 120, y - k * 40, 70 - k * 12, '#cfefff', 'rgba(20,60,110,.7)', a, 1 + tt * .3); } }
function kristalHud(t) {
  const st = I('sorun'), en = I('buyuyor') + 4; if (t < st || t > en + 1) return;
  const a = Math.min(prog(t, st, st + .8), 1 - prog(t, en, en + 1)), p = kristalPower(t);
  ctx.save(); ctx.globalAlpha = a;
  ctx.fillStyle = 'rgba(10,15,45,.6)'; rrect(W - 520, 28, 490, 92, 46); ctx.fill();
  ctx.save(); ctx.translate(W - 470, 74); ctx.rotate(t * .6); ctx.strokeStyle = '#bfeaff'; ctx.lineWidth = 6; ctx.lineCap = 'round'; for (let k = 0; k < 6; k++) { ctx.rotate(Math.PI / 3); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -28); ctx.stroke(); } ctx.restore();
  ctx.font = `800 26px ${FONT}`; ctx.fillStyle = '#fff'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText("Kristal'in gücü", W - 425, 56);
  ctx.fillStyle = 'rgba(255,255,255,.2)'; rrect(W - 425, 76, 360, 26, 13); ctx.fill();
  const col = p > .6 ? '#7fd8ff' : p > .35 ? '#ffd166' : '#ff5a6e'; const pulse = p < .35 ? .6 + .4 * Math.abs(Math.sin(t * 5)) : 1;
  ctx.globalAlpha = a * pulse; ctx.fillStyle = col; rrect(W - 425, 76, 360 * p, 26, 13); ctx.fill();
  ctx.restore();
}

// ================= EPISODE 2: scenes =================
const S = {
  onceki(t, lt, D) {
    meadow(t, lt * 20, { rainbow: 1, rainbowA: .9 });
    const beat = Math.abs(Math.sin(t * 3.2)) * 30;
    homur(1350, 320 - beat * .5, .75, t, { mood: 'happy', colorful: 1, mouth: 0 });
    pofi(600, 400 - beat, .8, t, { mouth: 0 }); fistik(980, 880 - beat, .85, t, { armsUp: true, mouth: 0 }); piril(1580, 640 - beat, .45, t, { rot: t * 2, mouth: 0 });
    confetti(t, 0, 60);
    ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(0, 0, W, 70); ctx.fillRect(0, H - 70, W, 70);
    const a = easeBack(prog(lt, .2, .8));
    ctx.save(); ctx.translate(60 - (1 - a) * 600, 110); ctx.fillStyle = '#ff4d6d'; rrect(0, 0, 560, 90, 45); ctx.fill(); ctx.restore();
    bigText('ÖNCEKİ BÖLÜMDE', 340 - (1 - a) * 600, 157, 54, '#ffffff', 'rgba(0,0,0,.3)', 1, 1);
  },
  baslik(t, lt, D) {
    snowValley(t, { mode: 'night' }); ctx.fillStyle = 'rgba(10,15,50,.45)'; ctx.fillRect(0, 0, W, H); snowFx(t, 2);
    kristal(960, 560, 1.6, t, { power: 1, mouth: 0, look: [0, 0], spin: t * .5 });
    const word = 'POFİ';
    for (let i = 0; i < 4; i++) { const p = easeBack(prog(lt, .2 + i * .15, .7 + i * .15)); bigText(word[i], 660 + i * 200, 220 + Math.sin(t * 3 + i) * 10, 220, ['#bfeaff', '#ffffff', '#9fd4ff', '#ffffff'][i], '#1d3b7a', 1, p); }
    bigText('ve', 960, 400, 72, '#ffffff', '#1d3b7a', prog(lt, 1, 1.4), easeBack(prog(lt, 1, 1.4)));
    bigText('DEV KAR TANESİ', 960, 860, 140, '#ffffff', '#1d3b7a', prog(lt, 1.4, 2), easeBack(prog(lt, 1.4, 2)));
    bigText('2. BÖLÜM', 960, 980, 50, '#bfeaff', '#1d3b7a', prog(lt, 2.2, 2.8));
    const fo = prog(lt, D - .8, D); if (fo > 0) { ctx.fillStyle = `rgba(0,0,0,${fo})`; ctx.fillRect(0, 0, W, H); }
  },
  kar(t, lt, D) {
    snowValley(t, {}); snowFx(t, 1.2, .3);
    const pu = I('pofi_uyanir'), fg = I('fistik_gelir'), sv = I('savas'), k1 = I('kartopu'), hg = I('homur_gelir'), k2 = I('kartopu2'), bk = I('bakin'), ds = I('dusus'), yl = I('yola');
    const looking = t > bk && t < ds + 4;
    const pIn = easeOut(prog(t, pu - 2, pu));
    let pofiX = lerp(-300, 560, pIn), pofiY = 420, fX = lerp(2200, 1250, easeOut(prog(t, fg - 2.5, fg - .2))), fY = 870, homX = lerp(2300, 1500, easeOut(prog(t, hg - 1.5, hg))), homY = 300;
    const ride = easeOut(prog(t, yl, yl + 2.5));
    // snowball fight
    const fight = (t > sv + 1 && t < bk);
    let hitF = false, hitH = t > hg - .45 && t < hg + .8;
    if (fight) {
      const period = 1.1, ph = ((t - sv) % period) / period, idx = Math.floor((t - sv) / period), dir = idx % 2 ? -1 : 1;
      const [x0, y0, x1, y1] = dir > 0 ? [fX - 60, fY - 140, pofiX + 40, pofiY + 20] : [pofiX + 80, pofiY + 40, fX, fY - 150];
      if (ph < .6) snowball(lerp(x0, x1, ph / .6), lerp(y0, y1, ph / .6) - Math.sin(ph / .6 * Math.PI) * 220, 20);
      else { splatFx(x1, y1, (ph - .6) / .4); if (dir < 0) hitF = true; }
      if (t > k2 && t < k2 + 6) { const q = prog(t, k2 + .5, k2 + 1.6); if (q > 0 && q < 1) snowball(lerp(homX - 100, fX, q), lerp(homY + 80, fY - 150, q) - Math.sin(q * Math.PI) * 150, 44); }
    }
    const buried = t > k2 + 1.6 && t < k2 + 4.5;
    if (hitH) splatFx(homX - 60, homY - 20, prog(t, hg - .45, hg + .3));
    if (t > hg - 1.5 && t < yl + 4) homur(homX, lerp(homY, 760, ride), lerp(.8, 1.1, ride), t, { mood: 'happy', colorful: 1, look: looking ? [0, -1] : undefined });
    const riderY = lerp(0, -180, ride);
    if (t > pu - 2) pofi(lerp(pofiX, homX - 170, ride), lerp(pofiY, 560 + riderY, ride), .8, t, { surprised: (t > pu && t < pu + 1) || looking ? 1 : 0, closed: t < pu - .5, look: looking ? [0, -1] : undefined, squash: fight ? Math.sin(t * 8) * .04 : 0 });
    if (t > fg - 2.5) {
      if (buried) { ctx.fillStyle = '#fff'; for (const [dx, dy, r] of [[-60, -40, 70], [40, -60, 80], [0, -130, 70], [70, 0, 60], [-70, 10, 60]]) { circ(fX + dx, fY + dy, r); ctx.fill(); } ctx.fillStyle = '#1b1530'; circ(fX - 20, fY - 120, 9); ctx.fill(); circ(fX + 20, fY - 120, 9); ctx.fill(); }
      else fistik(lerp(fX, homX + 40, ride), lerp(fY, 600 + riderY, ride), .9, t, { winter: true, walk: t < fg, scared: t > fg - 2.5 && t < fg - 1 && Math.sin(t * 40) > 0, snowFace: hitF && fight, armsUp: fight || (t > yl + 1), look: looking ? [0, -1] : undefined, rot: t < fg - .2 ? 0 : 0 });
    }
    piril(lerp(1500, homX + 160, ride), lerp(380, 520 + riderY, ride) + Math.sin(t * 2) * 8, .42, t, { look: looking ? [0, -1] : undefined });
    // Kristal falling
    if (t > ds - .2) {
      const p = prog(t, ds, ds + 3.5), kx = lerp(1700, 960, easeIn(p)), ky = lerp(-150, 740, easeIn(p));
      if (p < 1) { for (let k = 1; k < 18; k++) { const q = Math.max(0, p - k * .015); sparkle(lerp(1700, 960, easeIn(q)), lerp(-150, 740, easeIn(q)), 26 * (1 - k / 18), 1 - k / 18, '200,235,255'); } kristal(kx, ky, .9, t, { spin: t * 6, mouth: .5, power: 1 }); }
      else {
        const land = prog(t, ds + 3.5, ds + 4.5); if (land < 1) { ctx.fillStyle = `rgba(255,255,255,${1 - land})`; for (let k = 0; k < 16; k++) { const a = k / 16 * 6.28; circ(960 + Math.cos(a) * land * 300, 760 + Math.sin(a) * land * 90 - land * 60, 30 * (1 - land)); ctx.fill(); } }
        const kx2 = lerp(960, homX - 10, ride), ky2 = lerp(740, 470 + riderY, ride);
        kristal(kx2, ky2, lerp(1.0, .55, ride), t, { dizzy: t < I('kristal_tanis') + 2.5, worried: t > I('sorun') - 1 && t < I('homur_teklif') });
        const fl = prog(t, ds + 3.4, ds + 3.55) * (1 - prog(t, ds + 3.55, ds + 4.2)); if (fl > 0) { ctx.fillStyle = `rgba(230,245,255,${fl * .85})`; ctx.fillRect(0, 0, W, H); }
      }
    }
  },
  ucus(t, lt, D) {
    const fb = I('firtina_basla'), dm = I('dusme'), storm = prog(t, fb - .5, fb + 1.5);
    ctx.save(); if (storm > .5) shake(5 * storm, t);
    flightSky(t, storm);
    if (t > I('ruzgar')) { ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 5; ctx.lineCap = 'round'; const r = rng(3); for (let i = 0; i < 10 + storm * 20; i++) { const y = r() * H, x = W + 200 - ((r() * (W + 400) + t * (900 + storm * 800)) % (W + 400)); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 160, y + 6); ctx.stroke(); } }
    if (storm > .3 && (t * .9) % 1 < .07) { lightning(400 + (Math.floor(t * .9) % 3) * 500, 0, 450, Math.floor(t)); }
    const fall = easeIn(prog(t, dm + .5, dm + 4)), spin = fall * 6;
    const cx = 960 + Math.sin(t * .8) * 80 * (1 - storm) + Math.sin(t * 7) * 30 * storm, cy = 520 + Math.sin(t * 1.3) * 30 + fall * 1100;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(Math.sin(spin) * .4 * fall + Math.sin(t * 9) * .06 * storm); ctx.translate(-cx, -cy);
    homur(cx, cy, 1.1, t, { mood: storm > .5 ? 'surprised' : 'happy', colorful: 1 });
    pofi(cx - 260, cy - 60 + Math.sin(t * 2) * 15, .7, t, { surprised: storm > .5 ? 1 : 0, look: [1, 0] });
    fistik(cx - 40, cy - 190, .55, t, { winter: true, armsUp: t < I('ruzgar') || storm > .5, scared: storm > .5, look: [0, -.5] });
    piril(cx + 120, cy - 230, .3, t, {});
    kristal(cx + 60, cy - 150, .35, t, { worried: t > I('ruzgar') });
    ctx.restore(); ctx.restore();
    if (storm > 0) { ctx.fillStyle = `rgba(15,15,40,${storm * .25})`; ctx.fillRect(0, 0, W, H); }
  },
  gol(t, lt, D) {
    const ct = I('catirti'), cl = I('catlak'), tu = I('tut'), ku = I('kurtarma'), kv = I('kurtuldu');
    const crack = clamp(prog(t, ct, ct + 1) * .55 + prog(t, cl, cl + 1.5) * .45) * (1 - prog(t, kv + 3, kv + 6));
    const fk = I('fistik_kayar'), crackX = 1250;
    lakeBg(t, crack, crackX, 840); snowFx(t, .8, .4);
    const land = easeOut(prog(lt, 0, 1.5));
    const pa = I('paten'), skating = t > pa && t < fk;
    const kb = I('buzbas_gelir'), cp = I('carpisma'), bt = I('buzbas_tanis');
    // pofi, piril, kristal, homur
    pofi(520 + (skating ? Math.sin((t - pa) * 1.2) * 400 : 0), lerp(-200, 420, land) + (skating ? Math.cos((t - pa) * 1.5) * 40 : 0), .75, t, { surprised: t > kb && t < cp + 1 ? 1 : 0, worried: crack > .1 && t < kv });
    piril(380 + (skating ? Math.cos((t - pa) * 1.3) * 300 : 0), lerp(-100, 600, land), .4, t, { sad: crack > .3 && t < kv });
    kristal(1000 + (skating ? Math.sin((t - pa) * .9) * 200 : 0), lerp(-200, 640, land), .7, t, {});
    // fistik
    let fX = 760, fY = 860, frot = 0;
    if (skating) { const q = t - pa; fX = 760 + Math.sin(q * 1.6) * 420; fY = 860 + Math.sin(q * 3.2) * 40; frot = Math.sin(q * 6) * .3 + (q > 5 && q < 7 ? (q - 5) * Math.PI : 0); }
    if (t > fk) { const q = prog(t, fk, ct); fX = lerp(760, crackX, easeOut(q)); fY = 860; frot = Math.sin(t * 14) * .25; }
    const lifted = easeOut(prog(t, ku, ku + 2.5));
    if (t > ct) { fX = crackX; fY = 860 - Math.abs(Math.sin(t * 10)) * 8 * (1 - lifted); frot = Math.sin(t * 12) * .15; }
    // homur rescue
    let hX = 1500, hY = 300;
    if (t > tu - .5) { const r = easeOut(prog(t, tu - .5, tu + 1)); hX = lerp(1500, crackX + 40, r); hY = lerp(300, 560, r); }
    if (t > ku) { hX = lerp(crackX + 40, 900, lifted); hY = lerp(560, 450, lifted); fX = lerp(crackX, 900, lifted); fY = lerp(860, 860, lifted) - Math.sin(lifted * Math.PI) * 260; }
    if (t > kv + 3) { const r = easeOut(prog(t, kv + 3, kv + 5)); hX = lerp(900, 1500, r); hY = lerp(450, 300, r); }
    homur(hX, lerp(-300, hY, land), .8, t, { mood: crack > .2 && t < kv ? 'surprised' : 'happy', colorful: 1 });
    fistik(fX, lerp(-300, fY, easeOut(prog(lt, .3, 1.8))), .85, t, { winter: true, rot: frot, scared: (t > fk && t < kv + .5) || (t > kb && t < cp + .5), armsUp: (t > fk && t < kv) || skating, sad: t > kv + 1 && t < kv + 5 });
    // buzbas
    if (t > kb - 1.5) {
      let bX, bY = 870, brot = -Math.PI / 2 + .2, st = false;
      if (t < cp + .2) { const q = prog(t, kb - 1.5, cp + .2); bX = lerp(2200, 1000, q); bY = 880; }
      else if (t < bt - .3) { bX = 1000; bY = 860; brot = -1.2 + prog(t, cp + .2, cp + 1) * .5; st = true; }
      else { bX = 1140; brot = 0; }
      if (skating) { bX = 1140 + Math.cos((t - pa) * 1.1) * 450; bY = 880; brot = -Math.PI / 2 + .2; }
      if (t > fk) { bX = 600; brot = 0; }
      buzbas(bX, bY, .85, t, { rot: brot, stars: st, proud: t > bt && t < pa, flap: t > kb - 1 && t < cp, sad: t > I('buzbas_duygu') - .2 && t < I('buzbas_duygu') + 2, flip: t > fk });
    }
    if (t > cp && t < cp + 1) splatFx(1000, 820, prog(t, cp, cp + 1));
    chapter('1. DURAK', 'DONMUŞ GÖL', lt, '#3a7fc1');
  },
  orman(t, lt, D) {
    const ku = I('kuzey'), star = prog(t, ku - .5, ku + 1.5), yr = I('yuruyus');
    blizzardBg(t, star);
    const walkIn = easeOut(prog(lt, .5, 5)), march = prog(t, yr, yr + 9);
    const off = lerp(-700, 0, walkIn) + march * 1400, bob = (k) => Math.abs(Math.sin(t * 5 + k)) * 12 * (walkIn < 1 || march > 0 ? 1 : .2);
    glow(off + 820, 600, 420, '255,230,150', .35);
    const kb = I('kayboldu'), lookAround = t > kb && t < kb + 4;
    buzbas(off + 1120 - bob(0), 870 - bob(0), .8, t, { flip: lookAround && Math.sin(t * 3) > 0, sad: t > I('itiraf') - 6 && t < I('itiraf') + 6 });
    fistik(off + 900, 870 - bob(1), .8, t, { winter: true, walk: walkIn < 1 || march > 0, scared: lt > 3 && lt < 18, look: t > ku && t < ku + 6 ? [.6, -1] : undefined });
    pofi(off + 520, 480 + bob(2), .7, t, { worried: t < ku, look: t > ku && t < ku + 6 ? [1, -1] : undefined });
    homur(off + 260, 330 + bob(3), .7, t, { mood: 'happy', colorful: 1, look: t > ku && t < ku + 6 ? [1, -1] : undefined });
    piril(off + 820, 600 + bob(4) * .5, .45, t, { glow: 1.6, glowSize: 1.4, look: t > ku && t < ku + 6 ? [1, -1] : undefined });
    kristal(off + 660, 720, .55, t, { look: t > ku && t < ku + 6 ? [1, -1] : undefined });
    snowFx(t, 3, 4, .85);
    ctx.fillStyle = 'rgba(230,238,255,.15)'; ctx.fillRect(0, 0, W, H);
    chapter('2. DURAK', 'KARLI ORMAN', lt, '#2c785d');
  },
  magara(t, lt, D) {
    const ks = I('kayis'), slide = prog(t, ks, ks + 11), sliding = t > ks && t < ks + 11;
    const scroll = sliding ? (t - ks) * 1600 : 0;
    ctx.save(); if (sliding) { ctx.translate(W / 2, H / 2); ctx.rotate(Math.sin(t * 2) * .12); ctx.translate(-W / 2, -H / 2); }
    caveBg(t, scroll);
    if (sliding) { ctx.strokeStyle = 'rgba(200,240,255,.6)'; ctx.lineWidth = 6; const r = rng(8); for (let i = 0; i < 26; i++) { const y = r() * H, x = W + 300 - ((r() * (W + 600) + t * 2600) % (W + 600)); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + 220, y); ctx.stroke(); } }
    const walkIn = easeOut(prog(lt, .5, 5)), off = lerp(-800, 0, walkIn);
    const sn = I('sonuk');
    if (!sliding) {
      homur(off + 300, 300, .7, t, { mood: 'happy', colorful: 1 });
      pofi(off + 560, 470, .7, t, { worried: t > sn && t < ks });
      kristal(off + 760, 690, .55, t, {});
      piril(off + 940, 560, .42, t, { sad: t > sn && t < ks });
      fistik(off + 1150, 880, .85, t, { winter: true, armsUp: t > I('merhaba') && t < I('yanki2') + 2, walk: walkIn < 1 });
      buzbas(off + 1450, 880, .8, t, { proud: t > I('kaydirak') - .2 });
    } else {
      const xs = [1500, 1250, 1000, 750, 500, 280];
      const y = (k) => 720 + Math.sin(t * 4 + k) * 60;
      buzbas(xs[0], y(0) + 80, .7, t, { rot: -Math.PI / 2 + .3, flap: true, mouth: .5 });
      fistik(xs[1], y(1) + 60, .75, t, { winter: true, armsUp: true, rot: -.3, mouth: .6 });
      kristal(xs[2], y(2) - 60, .5, t, { mouth: .5, look: [1, 0] });
      piril(xs[3], y(3) - 100, .38, t, { rot: t * 4, mouth: .5 });
      pofi(xs[4], y(4) - 200, .65, t, { mouth: .7, stretch: 1.15, look: [1, 0] });
      homur(xs[5], y(5) - 260, .6, t, { mood: 'happy', colorful: 1, mouth: .6, look: [1, 0] });
      const out = prog(t, ks + 9.5, ks + 11); if (out > 0) { ctx.fillStyle = `rgba(255,240,220,${out})`; ctx.fillRect(0, 0, W, H); }
    }
    ctx.restore();
    if (t > I('merhaba')) echoText('Merhabaaa!', 900, 300, I('merhaba') + 1.4, t);
    if (t > I('findik')) echoText('Fındııık!', 900, 300, I('findik') + .9, t);
    chapter('3. DURAK', 'BUZ MAĞARASI', lt, '#5a5ac8');
  },
  zirve(t, lt, D) {
    const bl = I('birlesme'), ky = I('kar_yagar'), by = I('buyuyor'), uc = I('ucar'), kv = I('kavusma');
    const dawn = clamp(.25 + prog(t, t - lt, I('birles')) * .6);
    const merge = prog(t, bl, bl + 7), cover = easeOut(prog(t, bl + 5, bl + 9)), split = prog(t, uc + 3, uc + 4.5);
    summitBg(t, dawn, cover * (1 - split * .0));
    const familyY = lerp(120, 230, easeOut(prog(t, kv - 2, kv)));
    familyCloud(1080, familyY + 30, .8, t, t > kv); familyCloud(1340, familyY + 10, .9, t, t > kv);
    if (t > I('aile') && t < kv) { ctx.strokeStyle = 'rgba(255,255,255,.5)'; ctx.setLineDash([12, 14]); ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(960, 640); ctx.lineTo(1210, familyY + 80); ctx.stroke(); ctx.setLineDash([]); }
    // characters on ground
    const kX = lerp(960, 1210, easeOut(prog(t, uc, kv))), kY = lerp(720, familyY + 150, easeOut(prog(t, uc, kv)));
    fistik(640, 880, .85, t, { winter: true, sad: t > I('aile') && t < I('fikir'), armsUp: t > by, look: t > uc ? [1, -1] : undefined });
    buzbas(1500, 880, .8, t, { sad: t > I('aile') && t < I('fikir'), proud: t > I('buzbas_ovgu') + 3, look: t > uc ? [-.3, -1] : undefined });
    piril(380, 640, .42, t, { sad: t > I('aile') && t < I('fikir') });
    // pofi + homur merge
    if (merge < 1 || split >= 1) {
      const sp = split >= 1 ? 1 - easeOut(prog(t, uc + 3, uc + 6)) : merge;
      const a = sp * 10, r = (1 - sp) * 260 + 40;
      const pX = split >= 1 ? lerp(960, 560, easeOut(prog(t, uc + 4.5, uc + 6))) : 960 - Math.cos(a) * r, pY = split >= 1 ? lerp(300, 420, easeOut(prog(t, uc + 4.5, uc + 6))) : lerp(420, 300, sp) + Math.sin(a) * r * .3;
      const hX = split >= 1 ? lerp(960, 1300, easeOut(prog(t, uc + 4.5, uc + 6))) : 960 + Math.cos(a) * r, hY = split >= 1 ? lerp(300, 330, easeOut(prog(t, uc + 4.5, uc + 6))) : lerp(330, 300, sp) - Math.sin(a) * r * .3;
      if (t > bl && split < 1) glow(960, 320, 300 + sp * 400, '255,255,255', sp * .8);
      homur(hX, hY, .75, t, { mood: t > I('fikir') ? 'happy' : 'sad', colorful: 1 });
      pofi(pX, pY, .75, t, { worried: t > I('aile') && t < I('fikir') });
      if (t > I('fikir') && t < I('fikir') + 1.5) bigText('!', 960, 160, 130, '#ffe066', '#3b1d7a', 1 - prog(t, I('fikir') + 1, I('fikir') + 1.5), easeBack(prog(t, I('fikir'), I('fikir') + .3)));
    }
    if (merge >= 1 && split < 1) {
      const s = lerp(.4, 1.1, easeOut(prog(t, bl + 6.5, bl + 9)));
      bigCloud(960, 260, s, t, { mouth: t > by && t < by + 2 ? .5 : 0, mouth2: t > by && t < by + 2 ? .5 : 0 });
    }
    const flash = prog(t, bl + 6.6, bl + 6.8) * (1 - prog(t, bl + 6.8, bl + 7.6));
    kristal(kX, kY, .75, t, { tears: t > kv && t < kv + 4, look: t > I('aile') && t < uc ? [1, -1] : undefined });
    if (t > ky - 1 && t < uc + 6) snowFx(t, 2.5 * (1 - prog(t, uc + 4, uc + 6)), .2);
    if (t > kv && t < kv + 3) { const p = prog(t, kv, kv + 3); for (let i = 0; i < 16; i++) { const a = i / 16 * 6.28; sparkle(1210 + Math.cos(a) * p * 300, familyY + 90 + Math.sin(a) * p * 200, 22 * (1 - p), 1 - p, '200,235,255'); } }
    if (flash > 0) { ctx.fillStyle = `rgba(255,255,255,${flash})`; ctx.fillRect(0, 0, W, H); }
    chapter('4. DURAK', 'BUZ DAĞI ZİRVESİ', lt, '#c9688a');
  },
  final(t, lt, D) {
    snowValley(t, {}); snowFx(t, .7, .2);
    const fa = I('final_anlat'), kd = I('kardanadam'), kz = I('kizak_hold'), son = I('son');
    if (t > fa && t < fa + 8) { const p = prog(t, fa, fa + 7); kristal(lerp(1300, 1100, p), lerp(-100, 300, p), .3, t, { mouth: 0, power: 1 }); }
    const stage = prog(t, kd, kd + 9), nut = t > I('kizak') - 5.5;
    snowman(1350, 890, .9, t, stage, nut);
    const sledding = t > kz && t < kz + 16;
    if (!sledding) {
      fistik(1050, 880, .85, t, { winter: true, armsUp: t > kd && t < kd + 10 });
      buzbas(1650, 880, .75, t, {});
      pofi(560, 430, .75, t, {}); homur(980, 300, .7, t, { mood: 'happy', colorful: 1 });
      piril(320, 620, .42, t, {});
      kristal(1700, 480, .35, t, { power: 1 });
    } else {
      const q = (t - kz) / 3.2, ph = q % 1, dir = Math.floor(q) % 2 ? -1 : 1;
      const x = dir > 0 ? lerp(-500, 2400, ph) : lerp(2400, -500, ph), y = 820 + Math.sin(ph * Math.PI * 2) * 30;
      ctx.save(); ctx.translate(x, y); ctx.scale(dir, 1);
      ctx.fillStyle = '#c0392b'; rrect(-300, 0, 600, 40, 20); ctx.fill(); ctx.strokeStyle = '#8a5a2a'; ctx.lineWidth = 10; ctx.beginPath(); ctx.moveTo(-300, 60); ctx.lineTo(320, 60); ctx.quadraticCurveTo(360, 60, 360, 20); ctx.stroke();
      ctx.restore();
      buzbas(x + dir * 220, y - 50, .55, t, { flap: true, mouth: .5, flip: dir < 0 });
      fistik(x + dir * 60, y - 60, .6, t, { winter: true, armsUp: true, mouth: .6, flip: dir < 0 });
      piril(x - dir * 80, y - 110, .3, t, { mouth: .5 });
      pofi(x - dir * 200, y - 160, .5, t, { mouth: .6 });
      homur(x - dir * 380, y - 230, .45, t, { mood: 'happy', colorful: 1, mouth: .5 });
      for (let k = 0; k < 12; k++) { ctx.fillStyle = 'rgba(255,255,255,.8)'; circ(x - dir * (320 + k * 25), y + 40 - Math.abs(Math.sin(t * 20 + k)) * 40, 10 - k * .6); ctx.fill(); }
    }
    if (t > son) {
      const e = prog(t, son, son + .8);
      ctx.fillStyle = `rgba(10,15,50,${e * .62})`; ctx.fillRect(0, 0, W, H);
      bigText('SON', 960, 200, 170, '#ffffff', '#1d3b7a', e, easeBack(e));
      bigText('Sıradaki macera:', 960, 380, 60, '#ffffff', '#1d3b7a', prog(t, son + .6, son + 1.2), easeBack(prog(t, son + .6, son + 1.2)));
      bigText('Pofi ve Kayıp Hazine Haritası', 960, 470, 84, '#ffe066', '#1d3b7a', prog(t, son + 1, son + 1.6), easeBack(prog(t, son + 1, son + 1.6)));
      const b = easeBack(prog(t, son + 1.8, son + 2.4)), pulse = 1 + Math.sin(t * 6) * .04;
      if (b > 0) {
        ctx.save(); ctx.translate(960, 680); ctx.scale(b * pulse, b * pulse);
        ctx.fillStyle = '#ff2d4a'; rrect(-330, -70, 660, 140, 70); ctx.fill();
        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(-250, -36); ctx.lineTo(-190, 0); ctx.lineTo(-250, 36); ctx.fill();
        ctx.font = `800 70px ${FONT}`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('ABONE OL', 40, 6);
        ctx.restore();
        bigText('Beğenmeyi ve arkadaşlarınla paylaşmayı unutma!', 960, 840, 52, '#ffffff', '#1d3b7a', prog(t, son + 2.6, son + 3.2));
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
  kristalHud(t);
  subtitle(t);
  const idx = TL.scenes.indexOf(sc);
  const fin = idx === 0 ? 1 - prog(lt, 0, 1.2) : 1 - prog(lt, 0, .4);
  const fout = idx === TL.scenes.length - 1 ? prog(lt, D - 2.5, D) : prog(lt, D - .4, D);
  const f = Math.max(fin, fout);
  if (f > 0) { ctx.fillStyle = `rgba(5,3,25,${f})`; ctx.fillRect(0, 0, W, H); }
}
window.renderThumb = () => {
  NOW = 2; const t = 2; TL.ids = ID;
  snowValley(t, { mode: 'sunset' }); snowFx(t, 1.5);
  kristal(1350, 470, 1.7, t, { power: 1, mouth: .6, look: [-1, 0], spin: .3 });
  pofi(470, 520, 1.25, t, { surprised: 1, mouth: .8, look: [1, 0] });
  fistik(330, 1010, .85, t, { winter: true, scared: true, mouth: .6, look: [1, -.3], big: 1.2 });
  buzbas(1720, 1000, .8, t, { mouth: .6, look: [-1, -.3], flap: true });
  bigText('DEV KAR TANESİ!', 960, 140, 150, '#ffffff', '#1d6fd8', 1, 1, -.03);
  bigText('ERİYECEK Mİ?', 1350, 880, 110, '#ffe066', '#c0213a', 1, 1, -.04);
};
window.setup = async (tl) => { TL = tl; ID = tl.ids; await document.fonts.load(`800 50px "Baloo 2"`).catch(() => {}); await document.fonts.load(`italic 800 50px "Baloo 2"`).catch(() => {}); await document.fonts.ready; return document.fonts.check(`800 50px "Baloo 2"`); };
window.renderFrame = renderFrame;
</script></body></html>
