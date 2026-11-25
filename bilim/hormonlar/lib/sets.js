// Sets / backgrounds (screen space 1920x1080). Each returns markup.
add(`<defs>
 <linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FF9E7D"/><stop offset=".6" stop-color="#FFC99A"/><stop offset="1" stop-color="#FFE2B0"/></linearGradient>
 <linearGradient id="gNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1440"/><stop offset="1" stop-color="#22357E"/></linearGradient>
 <linearGradient id="gRain" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A2F4F"/><stop offset="1" stop-color="#4A5070"/></linearGradient>
 <linearGradient id="gDay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7FC8FF"/><stop offset="1" stop-color="#CFEFFF"/></linearGradient>
 <radialGradient id="gLamp"><stop offset="0" stop-color="#FFE9A8" stop-opacity=".55"/><stop offset="1" stop-color="#FFE9A8" stop-opacity="0"/></radialGradient>
 <radialGradient id="gScreen" cx=".5" cy="0" r="1"><stop offset="0" stop-color="#BFD9FF" stop-opacity=".55"/><stop offset="1" stop-color="#BFD9FF" stop-opacity="0"/></radialGradient>
</defs>`, defs);

function tree(x, y, s, c1 = '#5FBF7F', c2 = '#4BA86C') { return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-14" y="-40" width="28" height="160" rx="12" fill="#9A6A4E"/><circle cx="0" cy="-110" r="110" fill="${c1}"/><circle cx="50" cy="-90" r="80" fill="${c2}"/><circle cx="-60" cy="-70" r="60" fill="${c1}"/></g>`; }
const bench = (x, y, c1 = '#B5734F', c2 = '#A0603F', c3 = '#7A4630') => `<g transform="translate(${x},${y})"><rect x="0" y="-70" width="340" height="26" rx="13" fill="${c1}"/><rect x="0" y="-26" width="340" height="24" rx="12" fill="${c2}"/><rect x="24" y="-6" width="20" height="70" rx="8" fill="${c3}"/><rect x="296" y="-6" width="20" height="70" rx="8" fill="${c3}"/></g>`;
const shadow = (x, y, rx = 140, op = .14) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="22" fill="#000" opacity="${op}"/>`;

function parkBg() {
  return `<rect width="${W}" height="${H}" fill="url(#gSky)"/><circle cx="1500" cy="330" r="150" fill="#FFF1C9" opacity=".9"/>` +
    `<path d="M0,720 Q300,560 640,690 Q980,800 1300,640 Q1600,520 1920,660 L1920,1080 L0,1080Z" fill="#F4A08E"/>` +
    `<path d="M0,800 Q480,700 960,790 Q1440,870 1920,760 L1920,1080 L0,1080Z" fill="#8AD39A"/><rect x="0" y="930" width="${W}" height="150" fill="#6CC084"/>` +
    tree(160, 820, 1.1) + tree(1780, 840, 1.2) + tree(1010, 760, .7, '#74CC8E', '#5FBF7F');
}
function nightStreet(id = 'ns') {
  let wins = ''; for (let b = 0; b < 6; b++) { const bx = b * 330 - 40, bh = 360 + ((b * 137) % 260); wins += `<rect x="${bx}" y="${820 - bh}" width="290" height="${bh}" fill="#16245E"/>`; for (let r = 0; r < Math.floor(bh / 90) - 1; r++) for (let c = 0; c < 3; c++) if ((b + r + c) % 3) wins += `<rect x="${bx + 30 + c * 85}" y="${820 - bh + 40 + r * 90}" width="50" height="50" rx="6" fill="${(b * r + c) % 4 ? '#22337A' : '#FFD66B'}"/>`; }
  return `<rect width="${W}" height="${H}" fill="url(#gNight)"/><circle cx="1650" cy="170" r="70" fill="#FFF4D0"/>${wins}` +
    `<rect x="0" y="820" width="${W}" height="260" fill="#2B3A7C"/><rect x="0" y="820" width="${W}" height="22" fill="#3A4C95"/>` +
    `<circle id="${id}-lampGlow" cx="1560" cy="420" r="380" fill="url(#gLamp)"/><rect x="1550" y="300" width="20" height="660" rx="10" fill="#1A2560"/><path d="M1520,300 h80 l-14,-40 h-52Z" fill="#1A2560"/><ellipse cx="1560" cy="306" rx="34" ry="12" fill="#FFE9A8"/>`;
}
function bedroomNight() {
  return `<rect width="${W}" height="${H}" fill="#141A44"/><rect x="0" y="780" width="${W}" height="300" fill="#1C2458"/>` +
    `<rect x="1240" y="150" width="440" height="380" rx="20" fill="#0B1036"/><rect x="1260" y="170" width="400" height="340" rx="12" fill="#1E2E78"/><circle cx="1560" cy="260" r="54" fill="#FFF4D0"/>` +
    `<rect x="1452" y="170" width="16" height="340" fill="#0B1036"/><rect x="1260" y="332" width="400" height="16" fill="#0B1036"/>` +
    `${star(1330, 220, 10, '#fff')}${star(1400, 290, 7, '#fff')}${star(1610, 420, 8, '#fff')}` +
    `<rect x="260" y="560" width="1000" height="300" rx="40" fill="#2A3B8C"/><rect x="260" y="520" width="1000" height="90" rx="40" fill="#3F55B5"/>` +
    `<rect x="240" y="440" width="70" height="440" rx="30" fill="#22307A"/><rect x="1210" y="500" width="70" height="380" rx="30" fill="#22307A"/>` +
    `<rect x="300" y="470" width="240" height="110" rx="50" fill="#E6E9FF"/>`;
}
function cinema() {
  let s = `<rect width="${W}" height="${H}" fill="#0A0820"/><path d="M260,40 H1660 L1600,430 H320Z" fill="#CFE2FF" id="cinScreen"/>` +
    `<path d="M320,430 H1600 L1920,1080 H0Z" fill="url(#gScreen)"/>`;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 9; c++) { const x = 40 + c * 215 + (r % 2) * 60, y = 640 + r * 150; s += `<rect x="${x}" y="${y}" width="180" height="150" rx="40" fill="${r === 2 ? '#3A0F2E' : '#2A0B24'}"/>`; }
  return s;
}
function mriRoom() {
  return `<rect width="${W}" height="${H}" fill="#E8F1FA"/><rect x="0" y="800" width="${W}" height="280" fill="#C9D9EA"/>` +
    `<rect x="1380" y="180" width="380" height="260" rx="24" fill="#2A3A5C"/><rect x="1400" y="200" width="340" height="220" rx="14" fill="#0E1630" id="mriMon"/>` +
    `<circle cx="720" cy="560" r="330" fill="#F7FAFF"/><circle cx="720" cy="560" r="330" fill="none" stroke="#B9C9DD" stroke-width="16"/><circle cx="720" cy="560" r="170" fill="#33405E"/><circle cx="720" cy="560" r="140" fill="#1E2840"/>` +
    `<rect x="560" y="640" width="900" height="70" rx="30" fill="#DDE6F2"/><rect x="620" y="710" width="60" height="120" fill="#B9C9DD"/><rect x="1340" y="710" width="60" height="120" fill="#B9C9DD"/>`;
}
function valleyBridge() {
  let s = `<rect width="${W}" height="${H}" fill="url(#gDay)"/><circle cx="1600" cy="180" r="90" fill="#FFF6C8"/>` +
    `<path d="M0,1080 L0,360 L300,330 L420,1080Z" fill="#7A5A8C"/><path d="M1920,1080 L1920,340 L1620,320 L1500,1080Z" fill="#7A5A8C"/>` +
    `<path d="M0,360 L300,330 L330,380 L0,410Z" fill="#6CC084"/><path d="M1920,340 L1620,320 L1590,370 L1920,390Z" fill="#6CC084"/>` +
    `<path d="M420,1080 Q960,860 1500,1080Z" fill="#5A4470"/><path d="M700,1080 Q960,980 1220,1080Z" fill="#4BA0D8"/>`;
  s += `<g id="bridge"><path d="M300,330 Q960,560 1620,320" stroke="#6A4630" stroke-width="10" fill="none"/><path d="M300,250 Q960,470 1620,240" stroke="#8A5C3E" stroke-width="8" fill="none"/>`;
  for (let i = 0; i <= 26; i++) { const k = i / 26, x = 300 + k * 1320, y = 330 + Math.sin(k * Math.PI) * 228 - k * 10, y2 = 250 + Math.sin(k * Math.PI) * 222 - k * 10; s += `<path d="M${x},${y2} L${x},${y}" stroke="#8A5C3E" stroke-width="4"/><rect x="${x - 22}" y="${y - 6}" width="44" height="14" rx="4" fill="#B5734F"/>`; }
  return s + `</g>`;
}
function rainBench(id = 'rn') {
  let s = `<rect width="${W}" height="${H}" fill="url(#gRain)"/>`;
  for (let b = 0; b < 6; b++) { const bx = b * 330 - 40, bh = 300 + ((b * 151) % 240); s += `<rect x="${bx}" y="${820 - bh}" width="290" height="${bh}" fill="#353A5C"/>`; }
  s += `<rect x="0" y="820" width="${W}" height="260" fill="#3E4466"/><circle cx="1500" cy="420" r="340" fill="url(#gLamp)" opacity=".6"/><rect x="1490" y="300" width="20" height="660" rx="10" fill="#22263F"/><ellipse cx="1500" cy="306" rx="34" ry="12" fill="#FFE9A8"/>`;
  s += bench(760, 900, '#5A4A5A', '#4A3B4A', '#3A2B3A');
  s += `<g id="${id}-rain">`; for (let i = 0; i < 90; i++) s += `<rect class="${id}-drop" x="${(R() * 2100 - 90).toFixed(0)}" y="${(R() * 1080).toFixed(0)}" width="4" height="${(40 + R() * 40).toFixed(0)}" rx="2" fill="#AFC3FF" opacity=".45" transform="rotate(12)"/>`;
  return s + `</g>`;
}
// rain animation (seek-safe, computed)
function rainRun(id, t0, t1) { const drops = $$(`.${id}-drop`).map(d => [d, +d.getAttribute('y')]); SEEKERS.push(t => { const k = t < t0 || t > t1 ? 0 : (t - t0); drops.forEach(([d, y0], i) => d.setAttribute('y', ((y0 + k * (900 + (i % 5) * 80)) % 1200 - 100).toFixed(0))); }); }
function darkBg(c1 = '#1B1446', c2 = '#2A1F66', n = 16, op = .5) { return `<rect width="${W}" height="${H}" fill="${c1}"/>${rays(960, 540, n, c2, op)}`; }
function gridBg(bg = '#06122F', c = '#2D6BFF') { let g = `<rect width="${W}" height="${H}" fill="${bg}"/>`; for (let x = 0; x <= W; x += 80) g += `<path d="M${x},0 V${H}" stroke="${c}" stroke-opacity=".12"/>`; for (let y = 0; y <= H; y += 80) g += `<path d="M0,${y} H${W}" stroke="${c}" stroke-opacity=".12"/>`; return g; }
