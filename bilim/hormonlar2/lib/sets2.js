// Extra sets/props for v2: café front, coffee cup, apartment door, race board, commentator mic.
function cafeFront() {
  return `<rect width="${W}" height="${H}" fill="#9ED8FF"/><circle cx="1650" cy="160" r="80" fill="#FFF1C9"/>` +
    `<rect x="0" y="120" width="${W}" height="720" fill="#F3D9B8"/><rect x="0" y="120" width="${W}" height="40" fill="#E2C29A"/>` +
    `<g>${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<path d="M${i * 220},180 h220 l-20,90 h-180Z" fill="${i % 2 ? '#FFFFFF' : '#E8536B'}"/>`).join('')}</g>` +
    `<rect x="140" y="320" width="560" height="380" rx="14" fill="#5FB7C9"/><rect x="160" y="340" width="520" height="340" rx="10" fill="#8ED3E0"/><path d="M200,360 L330,360 L220,520Z" fill="#fff" opacity=".35"/>` +
    `<text class="lbl" x="420" y="460" text-anchor="middle" font-size="64" fill="#fff" opacity=".9">KAFE</text><text class="lbl" x="420" y="540" text-anchor="middle" font-size="40" fill="#fff" opacity=".9">☕ taze kahve</text>` +
    `<rect x="1180" y="320" width="560" height="380" rx="14" fill="#5FB7C9"/><rect x="1200" y="340" width="520" height="340" rx="10" fill="#8ED3E0"/>` +
    `<rect x="830" y="300" width="230" height="540" rx="12" fill="#7A4630"/><circle cx="1030" cy="580" r="12" fill="#FFD54F"/>` +
    `<rect x="0" y="840" width="${W}" height="240" fill="#C9C3BA"/><rect x="0" y="840" width="${W}" height="16" fill="#B5AEA3"/>` +
    `${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${i * 340 + 40}" y="930" width="260" height="10" rx="5" fill="#B5AEA3"/>`).join('')}`;
}
const coffeeCup = (id) => `<g id="${id}"><path d="M-30,-40 L30,-40 L22,40 L-22,40Z" fill="#FFFFFF"/><rect x="-34" y="-52" width="68" height="16" rx="6" fill="#8A5A3E"/><rect x="-28" y="-6" width="56" height="20" fill="#C9A77A"/></g>`;
function aptDoor() {
  return `<rect width="${W}" height="${H}" fill="#E9D9C4"/><rect x="0" y="860" width="${W}" height="220" fill="#B89A7A"/>` +
    `<rect x="1180" y="160" width="520" height="720" rx="10" fill="#6E4A33"/><rect x="1210" y="190" width="460" height="690" rx="8" fill="#8A5C3E"/>` +
    `<rect x="1250" y="240" width="380" height="260" rx="10" fill="#7A4E34"/><rect x="1250" y="560" width="380" height="260" rx="10" fill="#7A4E34"/><circle cx="1290" cy="540" r="14" fill="#FFD54F"/>` +
    `<rect x="300" y="200" width="420" height="320" rx="16" fill="#A8D8F0"/><rect x="320" y="220" width="380" height="280" rx="10" fill="#CFEFFF"/><rect x="505" y="220" width="10" height="280" fill="#A8D8F0"/>` +
    `<rect x="160" y="620" width="560" height="240" rx="40" fill="#5B6EA8"/><rect x="160" y="580" width="560" height="90" rx="40" fill="#6E83C2"/>`;
}
function raceBoard(id) {
  return `<g id="${id}" opacity="0"><rect x="360" y="34" width="1200" height="170" rx="30" fill="#14113A" opacity=".92"/><rect x="360" y="34" width="1200" height="170" rx="30" fill="none" stroke="#FFE45C" stroke-width="5"/>` +
    `<text class="lbl" x="400" y="98" font-size="34" fill="#7FD8FF">🔍 UZUN YOL</text><rect x="700" y="72" width="800" height="32" rx="16" fill="#2A2660"/><rect id="${id}L" x="700" y="72" width="1" height="32" rx="16" fill="#7FD8FF"/>` +
    `<text class="lbl" x="400" y="170" font-size="34" fill="#FF5A5A">🚀 KESTİRME</text><rect x="700" y="144" width="800" height="32" rx="16" fill="#2A2660"/><rect id="${id}S" x="700" y="144" width="1" height="32" rx="16" fill="#FF5A5A"/>` +
    `<path d="M1500,60 v130" stroke="#fff" stroke-width="6" stroke-dasharray="10 8"/></g>`;
}
const mic = (x, y) => `<g transform="translate(${x},${y})"><rect x="-22" y="-60" width="44" height="80" rx="22" fill="#3A3A5A"/><rect x="-16" y="-54" width="32" height="40" rx="16" fill="#6E6E9A"/><rect x="-4" y="20" width="8" height="50" fill="#3A3A5A"/><rect x="-30" y="66" width="60" height="10" rx="5" fill="#3A3A5A"/></g>`;
