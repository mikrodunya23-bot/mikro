// Core: scene timing, timeline, captions, sfx cues, svg helpers, transitions.
gsap.registerPlugin(MotionPathPlugin);
const W = 1920, H = 1080;
const SCENE = new URLSearchParams(location.search).get('scene');
const TM = window.TIMING.scenes[SCENE];
const LINES = {}; TM.lines.forEach(l => LINES[l.id] = l);
const tl = gsap.timeline({paused: true});
const SFX = [];
const SEEKERS = [];
const svgRoot = document.getElementById('svg');

// ---- timing ----
const T = id => LINES[id].t;                 // line start (scene-local seconds)
const D = id => LINES[id].d;                 // line duration
const E = id => LINES[id].t + LINES[id].d;   // line end
const lowerTr = s => s.replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase().replace(/[^a-zçğıöşü0-9]/g, '');
// time of the first spoken word starting with `prefix` in line `id` (nth match), falls back to fraction of the line
function Wt(id, prefix, nth = 0, frac = 0.5) {
  const ws = (window.TIMING.words || {})[id] || [];
  const p = lowerTr(prefix);
  let k = 0;
  for (const [w, t] of ws) { if (lowerTr(w).startsWith(p)) { if (k === nth) return T(id) + t; k++; } }
  return T(id) + D(id) * frac;
}
const DUR = TM.dur;

// ---- sfx cues (collected by the renderer, mixed in python) ----
const sfx = (name, t, vol = 1, extra = {}) => SFX.push(Object.assign({name, t: +t.toFixed(3), vol}, extra));

// ---- svg helpers ----
const NS = 'http://www.w3.org/2000/svg';
function add(markup, parent = svgRoot) { const g = document.createElementNS(NS, 'g'); g.innerHTML = markup; while (g.firstChild) parent.appendChild(g.firstChild); return parent.lastChild; }
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296 } }
const R = rng(1234);
const heartD = "M0,-6 C-3,-16 -18,-16 -18,-3 C-18,8 -6,15 0,22 C6,15 18,8 18,-3 C18,-16 3,-16 0,-6Z";
const heart = (x, y, s, fill, a = '') => `<path ${a} transform="translate(${x},${y}) scale(${s})" d="${heartD}" fill="${fill}"/>`;
const star = (x, y, r, fill, a = '', n = 4) => { let p = []; for (let i = 0; i < n * 2; i++) { const rr = i % 2 ? r * .42 : r, an = Math.PI / n * i - Math.PI / 2; p.push((x + rr * Math.cos(an)).toFixed(1) + ',' + (y + rr * Math.sin(an)).toFixed(1)) } return `<polygon ${a} points="${p.join(' ')}" fill="${fill}"/>` };
function pill(id, x, y, text, bg, fg = '#fff', fs = 60) { const w = text.length * fs * .66 + 80; return `<g id="${id}" opacity="0"><rect x="${x - w / 2}" y="${y - fs * .85}" width="${w}" height="${fs * 1.5}" rx="${fs * .75}" fill="${bg}"/><text class="lbl" x="${x}" y="${y + fs * .22}" text-anchor="middle" font-size="${fs}" fill="${fg}" letter-spacing="3">${text}</text></g>`; }
// label with leader line: tag at (tx,ty) pointing to (px,py)
function tag(id, px, py, tx, ty, text, bg, fg = '#fff', fs = 34) { const w = text.length * fs * .64 + 50; return `<g id="${id}" opacity="0"><path d="M${px},${py} L${tx},${ty}" stroke="${bg}" stroke-width="4"/><circle cx="${px}" cy="${py}" r="7" fill="${bg}"/><rect x="${tx - w / 2}" y="${ty - fs * .9}" width="${w}" height="${fs * 1.6}" rx="${fs * .8}" fill="${bg}"/><text class="lbl" x="${tx}" y="${ty + fs * .25}" text-anchor="middle" font-size="${fs}" fill="${fg}" letter-spacing="1">${text}</text></g>`; }
function rays(cx, cy, n, color, op = .5, rot = 0) { let s = ''; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2 + rot, b = a + Math.PI / n * .55; s += `<path d="M${cx},${cy} L${cx + Math.cos(a) * 2400},${cy + Math.sin(a) * 2400} L${cx + Math.cos(b) * 2400},${cy + Math.sin(b) * 2400}Z" fill="${color}" opacity="${op}"/>`; } return s; }
const defs = add(`<defs>
 <radialGradient id="gY"><stop offset="0" stop-color="#FFE45C"/><stop offset="1" stop-color="#FFE45C" stop-opacity="0"/></radialGradient>
 <radialGradient id="gP"><stop offset="0" stop-color="#FF7FB0" stop-opacity=".95"/><stop offset="1" stop-color="#FF7FB0" stop-opacity="0"/></radialGradient>
 <radialGradient id="gR"><stop offset="0" stop-color="#FF3B3B"/><stop offset="1" stop-color="#FF3B3B" stop-opacity="0"/></radialGradient>
 <radialGradient id="gB"><stop offset="0" stop-color="#7FD8FF"/><stop offset="1" stop-color="#7FD8FF" stop-opacity="0"/></radialGradient>
 <radialGradient id="gO"><stop offset="0" stop-color="#FF9D2E"/><stop offset="1" stop-color="#FF9D2E" stop-opacity="0"/></radialGradient>
 <radialGradient id="gW"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".9"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient>
 <radialGradient id="gVig" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
 <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
 <filter id="glowBig" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="16" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
 <filter id="blur8"><feGaussianBlur stdDeviation="8"/></filter>
 <filter id="blur3"><feGaussianBlur stdDeviation="3"/></filter>
</defs>`);
const root = add(`<g id="root"></g>`);           // all scene content goes here
const overlay = add(`<g id="overlay"></g>`);     // flashes, wipes, vignette
const A = (m, p = root) => add(m, p);             // add into scene content

// ---- generic animation helpers ----
const show = (sel, t, d = 0) => d ? tl.to(sel, {opacity: 1, duration: d}, t) : tl.set(sel, {opacity: 1}, t);
const hide = (sel, t, d = 0) => d ? tl.to(sel, {opacity: 0, duration: d}, t) : tl.set(sel, {opacity: 0}, t);
function pop(sel, t, ox, oy, s0 = .3, d = .4) { tl.set(sel, {opacity: 1}, t); tl.fromTo(sel, {scale: s0, svgOrigin: `${ox} ${oy}`}, {scale: 1, duration: d, ease: 'back.out(2.6)', immediateRender: false}, t); }
function popOut(sel, t, ox, oy, d = .25) { tl.to(sel, {scale: .2, opacity: 0, svgOrigin: `${ox} ${oy}`, duration: d, ease: 'back.in(2)'}, t); }
function flash(t, op = .7, color = '#fff', d = .3) { const id = 'fl' + Math.round(t * 1000); add(`<rect id="${id}" width="${W}" height="${H}" fill="${color}" opacity="0"/>`, overlay); tl.set('#' + id, {opacity: op}, t); tl.to('#' + id, {opacity: 0, duration: d}, t + .01); }
function shake(sel, t, amp = 12, d = .45) { const n = Math.round(d / .05); tl.to(sel, {x: `+=${amp}`, duration: .05, repeat: n, yoyo: true, ease: 'none'}, t); tl.set(sel, {x: 0}, t + .05 * (n + 1)); }
// particle burst: n circles from (x,y) to random targets in ellipse (rx,ry) around (tx,ty)
function burst(parent, n, x, y, tx, ty, rx, ry, t, opt = {}) {
  const col = opt.colors || ['#FFE45C', '#FFFFFF'], dur = opt.dur || 1.1, spread = opt.spread || .9, r0 = opt.r || 7;
  let html = ''; for (let i = 0; i < n; i++) html += `<circle cx="${x}" cy="${y}" r="${(r0 * (.7 + R() * .8)).toFixed(1)}" fill="${col[i % col.length]}" opacity="0"${opt.glow ? ' filter="url(#glow)"' : ''}/>`;
  const g = add(`<g>${html}</g>`, parent);
  Array.from(g.children).forEach((c, i) => {
    const a = R() * Math.PI * 2, rr = Math.sqrt(R()), t0 = t + R() * spread;
    tl.set(c, {opacity: 1}, t0);
    tl.to(c, {attr: {cx: tx + Math.cos(a) * rx * rr, cy: ty + Math.sin(a) * ry * rr}, duration: dur, ease: 'power2.out'}, t0);
    tl.to(c, {opacity: 0, duration: .5}, t0 + dur + (opt.hold || 0));
  });
  return g;
}
// particles flowing along an svg path (id of a <path>), n particles, between t0 and t1
function flow(parent, pathSel, n, t0, t1, opt = {}) {
  const col = opt.colors || ['#FFE45C'], dur = opt.dur || 1.2, r0 = opt.r || 8;
  let html = ''; for (let i = 0; i < n; i++) html += `<circle cx="0" cy="0" r="${(r0 * (.7 + R() * .6)).toFixed(1)}" fill="${col[i % col.length]}" opacity="0"${opt.glow ? ' filter="url(#glow)"' : ''}/>`;
  const g = add(`<g>${html}</g>`, parent);
  Array.from(g.children).forEach((c, i) => {
    const st = t0 + (t1 - t0) * (i / Math.max(1, n - 1));
    const jit = opt.jitter || 0;
    tl.set(c, {opacity: 1, x: (R() - .5) * jit, y: (R() - .5) * jit}, st);
    tl.to(c, {motionPath: {path: pathSel, align: pathSel, alignOrigin: [.5, .5]}, duration: dur, ease: opt.ease || 'power1.inOut', immediateRender: false}, st);
    tl.to(c, {opacity: 0, duration: .25}, st + dur - .2);
  });
  return g;
}
// draw a path progressively (stroke dash)
function drawPath(sel, t, d = .8, ease = 'power1.inOut') { $$(sel).forEach(p => { const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; tl.to(p, {strokeDashoffset: 0, duration: d, ease}, t); }); }
// camera: keeps point (x,y) at screen centre with zoom s; zoom is interpolated in log space so the target stays fixed
const CAMS = {};
function camState(sel) {
  if (!CAMS[sel]) { const st = CAMS[sel] = {x: W / 2, y: H / 2, ls: 0}; SEEKERS.unshift(() => { const s = Math.exp(st.ls); const el = $(sel); if (el) el.setAttribute('transform', `translate(${(W / 2 - st.x * s).toFixed(2)},${(H / 2 - st.y * s).toFixed(2)}) scale(${s.toFixed(5)})`); }); }
  return CAMS[sel];
}
function cam(sel, t, x, y, s, d = 1, ease = 'power2.inOut') { const st = camState(sel); tl.to(st, {x, y, ls: Math.log(s), duration: d, ease}, t); }
function camSet(sel, t, x, y, s) { const st = camState(sel); tl.set(st, {x, y, ls: Math.log(s)}, t); }
// big text card: words appear one by one
function textCard(parent, id, lines, x, y, fs, color, t, step = .08, weight = 'lbl') {
  let s = `<g id="${id}">`; lines.forEach((ln, i) => { s += `<text class="${weight}" x="${x}" y="${y + i * fs * 1.15}" text-anchor="middle" font-size="${fs}" fill="${color}">${ln.split(' ').map((w, j) => `<tspan class="${id}w" opacity="0">${w} </tspan>`).join('')}</text>`; }); s += `</g>`;
  add(s, parent);
  tl.to(`.${id}w`, {opacity: 1, duration: .15, stagger: step}, t);
  return $('#' + id);
}
// a number counter updated on seek
function counter(sel, t0, t1, v0, v1, fmt = v => v) { SEEKERS.push(t => { const k = Math.max(0, Math.min(1, (t - t0) / (t1 - t0))); const v = Math.round(v0 + (v1 - v0) * k); const el = $(sel); if (el) el.textContent = fmt(v); }); }

// ---- scene transitions ----
function fadeIn(d = .5, color = '#000') { add(`<rect id="fin" width="${W}" height="${H}" fill="${color}"/>`, overlay); tl.to('#fin', {opacity: 0, duration: d}, 0); }
function fadeOut(d = .5, color = '#000') { add(`<rect id="fout" width="${W}" height="${H}" fill="${color}" opacity="0"/>`, overlay); tl.to('#fout', {opacity: 1, duration: d}, DUR - d); }
// colored band wipe: covers the screen at the end (out) or uncovers at the start (in)
function wipeIn(color = '#120E3A', d = .55) { add(`<rect id="win" x="0" width="${W + 200}" height="${H}" fill="${color}"/>`, overlay); tl.to('#win', {x: W + 200, duration: d, ease: 'power2.inOut'}, 0); }
function wipeOut(color = '#120E3A', d = .55) { add(`<rect id="wout" x="${-W - 200}" width="${W + 200}" height="${H}" fill="${color}"/>`, overlay); tl.to('#wout', {x: 0, duration: d, ease: 'power2.inOut'}, DUR - d); }
function irisIn(cx = W / 2, cy = H / 2, d = .6, color = '#000') { add(`<path id="iin" fill="${color}" fill-rule="evenodd" d=""/>`, overlay); const o = {r: 0}; SEEKERS.push(t => { const k = Math.min(1, Math.max(0, t / d)); const r = 1 + k * k * 2300; $('#iin').setAttribute('d', `M0,0H${W}V${H}H0Z M${cx - r},${cy} a${r},${r} 0 1,0 ${2 * r},0 a${r},${r} 0 1,0 ${-2 * r},0Z`); }); }
function irisOut(cx = W / 2, cy = H / 2, d = .6, color = '#000') { add(`<path id="iout" fill="${color}" fill-rule="evenodd" d=""/>`, overlay); SEEKERS.push(t => { const k = Math.min(1, Math.max(0, (DUR - t) / d)); const r = 1 + k * k * 2300; $('#iout').setAttribute('d', `M0,0H${W}V${H}H0Z M${cx - r},${cy} a${r},${r} 0 1,0 ${2 * r},0 a${r},${r} 0 1,0 ${-2 * r},0Z`); }); }

// ---- captions ----
const capEl = document.getElementById('cap');
const CAPS = [];
(function buildCaps() {
  TM.lines.forEach(l => {
    // split into chunks at sentence ends / long clauses, timed by character share
    let parts = l.text.replace(/\s+/g, ' ').match(/[^.!?…:]+[.!?…:]*["”]?\s*/g) || [l.text];
    const chunks = []; let cur = '';
    parts.forEach(p => { if ((cur + p).length > 82 && cur) { chunks.push(cur.trim()); cur = p; } else cur += p; });
    if (cur.trim()) chunks.push(cur.trim());
    const total = chunks.reduce((a, c) => a + c.length, 0); let acc = 0;
    chunks.forEach(c => { const t0 = l.t + l.d * acc / total; acc += c.length; CAPS.push({t0, t1: l.t + l.d * acc / total + .25, text: wrap(c)}); });
  });
  function wrap(s) { if (s.length <= 48) return s; const mid = s.length / 2; let best = -1; for (let i = 0; i < s.length; i++) if (s[i] === ' ' && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i; return s.slice(0, best) + '\n' + s.slice(best + 1); }
})();
let capsOn = true;
function captionAt(t) { let s = ''; if (capsOn) for (const c of CAPS) if (t >= c.t0 && t < c.t1) s = c.text; if (capEl.textContent !== s) capEl.textContent = s; }

// ---- finish: expose seek for the renderer ----
function finish() {
  add(`<rect width="${W}" height="${H}" fill="url(#gVig)" pointer-events="none"/>`, overlay);
  window.DURATION = DUR; window.SFX = SFX;
  window.seek = t => { tl.seek(t, false); SEEKERS.forEach(f => f(t)); captionAt(t); };
  window.seek(0);
}
