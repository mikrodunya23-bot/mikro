/* Comic art library for "Kapıdaki Kurye".
 * Every panel is drawn once at load into an <svg data-art="name"> (viewBox 1080x1920).
 * Pure and deterministic: seeded random only. Characters are built from shared parts
 * (head, torso, hands) so every panel draws the same people.
 */
(function () {
  const INK = "#16121c";
  let uid = 0;
  const nid = (p) => p + "_" + ++uid;
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  let P = {}; // current svg's pattern ids
  const G = (t, inner) => `<g transform="${t}">${inner}</g>`;
  const pth = (d, fill, sw = 6, extra = "") =>
    `<path d="${d}" fill="${fill}" stroke="${INK}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round" ${extra}/>`;
  const line = (d, sw = 5, col = INK, extra = "") =>
    `<path d="${d}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
  const rect = (x, y, w, h, fill, sw = 0, extra = "") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${sw ? `stroke="${INK}" stroke-width="${sw}"` : ""} ${extra}/>`;
  const dots = (x, y, w, h, op = 0.22, light = false) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${light ? P.dotsW : P.dots})" opacity="${op}"/>`;

  function defs() {
    P = { dots: nid("dots"), dotsW: nid("dotsw"), dotsBig: nid("dotsb"), rain: nid("rain") };
    return `<defs>
      <pattern id="${P.dots}" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="8" cy="8" r="3.4" fill="${INK}"/></pattern>
      <pattern id="${P.dotsW}" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="8" cy="8" r="3" fill="#ffffff"/></pattern>
      <pattern id="${P.dotsBig}" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="15" cy="15" r="7" fill="${INK}"/></pattern>
      <pattern id="${P.rain}" width="90" height="160" patternUnits="userSpaceOnUse" patternTransform="rotate(14)">
        <line x1="10" y1="0" x2="10" y2="70" stroke="#b9d3ff" stroke-width="3" opacity="0.55"/>
        <line x1="55" y1="80" x2="55" y2="130" stroke="#b9d3ff" stroke-width="2.5" opacity="0.4"/>
        <line x1="78" y1="20" x2="78" y2="60" stroke="#ffffff" stroke-width="2" opacity="0.35"/>
      </pattern>
    </defs>`;
  }
  function lin(id, stops, x2 = 0, y2 = 1) {
    return `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops
      .map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`)
      .join("")}</linearGradient>`;
  }
  function rad(id, stops) {
    return `<radialGradient id="${id}">${stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join("")}</radialGradient>`;
  }

  // ---------------- characters ----------------
  const CH = {
    deniz: { skin: "#e8b088", shade: "#c4855f", hair: "#1e1a24", hl: "#4b4660", iris: "#5a3a22", style: "swept" },
    resepsiyon: { skin: "#f4c9a6", shade: "#d79f7c", hair: "#f0c548", brow: "#8a5a1a", hl: "#fff1b0", iris: "#3f6e8c", lips: "#cf2438", female: true, style: "bun" },
    guvenlik: { skin: "#c88a60", shade: "#9e6542", hair: null, iris: "#2b1d14", jaw: "wide", style: "cap", mustache: "#2a1f1a" },
    ece: { skin: "#f1c39d", shade: "#d39a74", hair: "#6e4126", hl: "#a8714a", iris: "#5d3a1e", female: true, style: "wavy", glasses: true, freckles: true },
    asistan: { skin: "#e4b08a", shade: "#c08560", hair: "#17131c", hl: "#4a4258", iris: "#2b1d14", female: true, style: "bob", lips: "#a8323e" },
    exec1: { skin: "#e0a983", shade: "#b98058", hair: "#a3a3ab", hl: "#e0e0e6", iris: "#333", style: "swept" },
    exec2: { skin: "#b97a52", shade: "#8f5a38", hair: "#222", hl: "#555", iris: "#222", style: "short", jaw: "wide" },
    exec3: { skin: "#f0c6a4", shade: "#cf9c7a", hair: "#8d8d96", hl: "#cfcfd6", iris: "#335", female: true, style: "bob", lips: "#9a3340" },
  };
  const EXPR = {
    neutral: { lid: 0.15, bi: 0, bo: 0, mouth: "neutral" },
    determined: { lid: 0.42, bi: 9, bo: -3, mouth: "flat" },
    smirk: { lid: 0.38, bi: 4, bo: -2, braise: 1, mouth: "smirk" },
    sneer: { lid: 0.5, bi: 6, bo: -4, braise: 1, mouth: "sneer", look: [10, 2] },
    angry: { lid: 0.3, bi: 16, bo: -10, mouth: "shout" },
    shocked: { round: true, bi: -24, bo: -18, mouth: "O" },
    kind: { lid: 0.18, bi: -9, bo: 3, mouth: "kind" },
    smile: { lid: 0.22, bi: -3, bo: 0, mouth: "smile" },
    talk: { lid: 0.2, bi: -2, bo: 0, mouth: "talk" },
  };

  function eye(x, c, e, side) {
    const sz = 1, w = 31 * sz, h = 15 * sz;
    const look = e.look || [0, 0];
    let s = "";
    if (e.round) {
      s += `<ellipse cx="${x}" cy="-4" rx="27" ry="31" fill="#fff" stroke="${INK}" stroke-width="5"/>`;
      s += `<circle cx="${x + look[0]}" cy="${-2 + look[1]}" r="8" fill="${INK}"/>`;
      return s;
    }
    const d = `M ${x - w},0 Q ${x},${-h * 1.7} ${x + w},0 Q ${x},${h * 0.95} ${x - w},0 Z`;
    const cid = nid("ec");
    s += `<clipPath id="${cid}"><path d="${d}"/></clipPath><path d="${d}" fill="#fff"/>`;
    s += `<g clip-path="url(#${cid})"><circle cx="${x + look[0]}" cy="${-3 + look[1]}" r="14" fill="${c.iris}"/>
      <circle cx="${x + look[0]}" cy="${-3 + look[1]}" r="6.5" fill="${INK}"/><circle cx="${x + look[0] + 5}" cy="${-8 + look[1]}" r="3.2" fill="#fff"/>`;
    const lid = e.lid || 0;
    const top = -h * 1.7 - 6, hh = (h * 1.7 + 6) * lid * 1.1;
    if (lid > 0) s += rect(x - w - 6, top, 2 * w + 12, hh + 6, c.skin);
    s += `</g>`;
    const yl = lid > 0.05 ? top + hh + 6 : null;
    s += yl !== null ? line(`M ${x - w - 3},${yl + 4} Q ${x},${yl - 3} ${x + w + 3},${yl + 4}`, 6) : line(`M ${x - w},0 Q ${x},${-h * 1.7} ${x + w},0`, 6);
    if (c.female) s += line(`M ${x + side * w},${-2} l ${side * 14},${-12}`, 5);
    return s;
  }

  function mouth(kind, c) {
    const lip = c.lips;
    switch (kind) {
      case "flat": return line("M -34,96 Q 0,92 34,96", 6, lip || INK);
      case "smirk": return line("M -28,99 Q 8,103 40,84", 6, lip || INK) + line("M 38,80 Q 46,86 42,93", 4);
      case "smile": return line("M -40,86 Q 0,116 40,86", 6, lip || INK);
      case "sneer": return line("M -40,95 Q -10,86 34,99", 7, lip || INK) + line("M 30,92 Q 40,96 36,104", 4);
      case "talk": return pth("M -30,90 Q 0,84 30,90 Q 24,116 0,118 Q -24,116 -30,90 Z", "#6b1f2a", 5) + rect(-22, 89, 44, 9, "#fff");
      case "kind": return pth("M -44,84 Q 0,92 44,84 Q 30,128 0,130 Q -30,128 -44,84 Z", "#6b1f2a", 5) + `<path d="M -40,87 Q 0,95 40,87 L 35,99 Q 0,105 -35,99 Z" fill="#fff"/>`;
      case "shout": return pth("M -46,112 Q -40,76 0,74 Q 40,76 46,112 Q 0,100 -46,112 Z", "#5a1622", 6) + `<path d="M -36,86 Q 0,72 36,86 L 34,94 Q 0,84 -34,94 Z" fill="#fff"/>` + line("M -52,116 L -40,108", 5) + line("M 52,116 L 40,108", 5);
      case "O": return pth("M 0,84 C 26,84 28,136 0,136 C -28,136 -26,84 0,84 Z", "#4a1420", 5);
      default: return line("M -32,95 Q 0,99 32,95", 6, lip || INK);
    }
  }

  function hairBack(c) {
    if (c.style === "wavy") return pth("M -152,-60 C -200,60 -185,200 -150,260 C -120,300 -60,292 -40,250 L 40,250 C 60,292 120,300 150,260 C 185,200 200,60 152,-60 C 120,-200 -120,-200 -152,-60 Z", c.hair);
    if (c.style === "bob") return pth("M -146,-50 C -170,60 -160,150 -132,182 L 132,182 C 160,150 170,60 146,-50 C 122,-190 -122,-190 -146,-50 Z", c.hair);
    return "";
  }
  function hairFront(c) {
    switch (c.style) {
      case "swept":
        return pth("M -132,-24 C -156,-150 -46,-222 52,-206 C 136,-194 168,-112 134,-22 C 124,-70 104,-98 74,-108 C 46,-82 -16,-86 -58,-114 C -80,-80 -112,-58 -132,-24 Z", c.hair) +
          line("M -70,-160 Q -10,-190 60,-170", 5, c.hl) + line("M -96,-120 Q -60,-150 -20,-152", 4, c.hl);
      case "short":
        return pth("M -134,-40 C -146,-160 146,-160 134,-40 C 120,-100 70,-118 0,-116 C -70,-118 -120,-100 -134,-40 Z", c.hair);
      case "bun":
        return pth("M 0,-250 C 70,-250 84,-160 30,-150 C -24,-142 -70,-250 0,-250 Z", c.hair) +
          pth("M -130,-20 C -150,-200 150,-200 130,-20 C 114,-96 50,-112 10,-108 C -56,-110 -112,-92 -130,-20 Z", c.hair) +
          line("M -80,-130 Q -20,-150 60,-140", 4, c.hl) + line("M 10,-215 Q 40,-222 62,-196", 4, c.hl);
      case "wavy":
        return pth("M -130,-14 C -146,-166 132,-176 130,-30 C 112,-92 72,-114 30,-116 C -14,-66 -86,-56 -130,-14 Z", c.hair) + line("M -60,-140 Q 0,-160 70,-130", 4, c.hl);
      case "bob":
        return pth("M -134,-20 C -148,-168 138,-172 132,-20 L 120,-58 L -122,-58 Z", c.hair) + line("M -80,-130 Q 0,-150 80,-128", 4, c.hl);
      case "cap":
        return pth("M -138,-58 C -140,-196 140,-196 138,-58 Z", "#1a1d2b") + rect(-138, -82, 276, 24, "#2a2f44", 5) +
          pth("M -146,-60 Q 0,-26 156,-60 Q 20,-6 -146,-60 Z", "#0d0f18", 5) +
          pth("M 0,-152 L 13,-128 L 40,-126 L 19,-110 L 26,-84 L 0,-98 L -26,-84 L -19,-110 L -40,-126 L -13,-128 Z", "#e5b54a", 4);
      default:
        return "";
    }
  }

  function head(who, expr = "neutral", o = {}) {
    const c = CH[who], e = Object.assign({}, EXPR[expr], o.e || {});
    const hp = c.female
      ? "M -118,-40 C -122,-150 122,-150 118,-40 C 116,40 92,112 50,148 Q 0,178 -50,148 C -92,112 -116,40 -118,-40 Z"
      : c.jaw === "wide"
        ? "M -134,-40 C -138,-156 138,-156 134,-40 C 134,52 116,122 70,154 Q 0,184 -70,154 C -116,122 -134,52 -134,-40 Z"
        : "M -124,-40 C -128,-152 128,-152 124,-40 C 122,46 104,120 58,154 Q 0,186 -58,154 C -104,120 -122,46 -124,-40 Z";
    const cid = nid("hc");
    let s = hairBack(c);
    s += pth("M -50,110 L -56,262 L 56,262 L 50,110 Z", c.skin, 6) + `<path d="M -52,128 L 52,128 L 52,182 Q 0,206 -52,182 Z" fill="${c.shade}"/>`;
    s += pth("M -118,-22 C -152,-32 -154,32 -116,42 Z", c.skin, 5) + pth("M 118,-22 C 152,-32 154,32 116,42 Z", c.skin, 5);
    s += `<clipPath id="${cid}"><path d="${hp}"/></clipPath>` + pth(hp, c.skin, 7);
    const lightSide = o.light === "left" ? -1 : 1; // shadow on the side away from the key
    s += `<g clip-path="url(#${cid})"><path d="M ${60 * lightSide},-220 C ${36 * lightSide},-60 ${92 * lightSide},60 ${34 * lightSide},220 L ${240 * lightSide},220 L ${240 * lightSide},-220 Z" fill="${c.shade}"/>
          <path d="M ${60 * lightSide},-220 C ${36 * lightSide},-60 ${92 * lightSide},60 ${34 * lightSide},220 L ${240 * lightSide},220 L ${240 * lightSide},-220 Z" fill="url(#${P.dots})" opacity="0.18"/></g>`;
    if (o.wet) s += `<g clip-path="url(#${cid})">${line("M -90,-60 L -96,10", 3, "#9ec3ff", 'opacity="0.8"')}${line("M 70,-40 L 66,20", 3, "#9ec3ff", 'opacity="0.8"')}</g>`;
    if (c.freckles) for (const [fx, fy] of [[-70, 40], [-56, 50], [-82, 52], [70, 40], [56, 50], [82, 52]]) s += `<circle cx="${fx}" cy="${fy}" r="3.5" fill="#b8744f"/>`;
    s += `<ellipse cx="-72" cy="56" rx="22" ry="12" fill="#ff8f8f" opacity="${c.female ? 0.45 : 0.2}"/><ellipse cx="72" cy="56" rx="22" ry="12" fill="#ff8f8f" opacity="${c.female ? 0.45 : 0.2}"/>`;
    s += eye(-50, c, e, -1) + eye(50, c, e, 1);
    // brows
    const bw = c.female ? 7 : 10, by = -50;
    for (const side of [-1, 1]) {
      let bi = e.bi, bo = e.bo;
      if (e.braise && side === 1) { bi -= 14; bo -= 12; }
      s += line(`M ${side * 20},${by + bi} Q ${side * 52},${by - 10 + (bi + bo) / 2} ${side * 82},${by + bo}`, bw, c.brow || (c.hair && c.style !== "cap" ? c.hair : "#2a1f1a"));
    }
    s += line("M 6,8 Q -6,40 -16,54 Q -2,62 14,56", 4.5);
    if (c.old) s += line("M -60,-92 Q 0,-100 60,-92", 3.5, c.shade) + line("M -50,-80 Q 0,-86 50,-80", 3, c.shade) + line("M -44,70 Q -54,96 -40,118", 3.5, c.shade) + line("M 44,70 Q 54,96 40,118", 3.5, c.shade);
    if (c.beard) s += `<path d="M -118,10 C -112,90 -70,170 0,178 C 70,170 112,90 118,10 C 100,70 70,96 40,100 Q 0,112 -40,100 C -70,96 -100,70 -118,10 Z" fill="${c.beard}" opacity="${c.beardOp || 0.55}"/>`;
    if (c.mustache) s += pth("M -62,72 Q -30,52 0,66 Q 30,52 62,72 Q 52,90 0,80 Q -52,90 -62,72 Z", c.mustache, 4);
    s += mouth(e.mouth, c);
    if (c.glasses && !o.noGlasses) s += `<circle cx="-50" cy="-4" r="40" fill="#fff" fill-opacity="0.12" stroke="${INK}" stroke-width="6"/><circle cx="50" cy="-4" r="40" fill="#fff" fill-opacity="0.12" stroke="${INK}" stroke-width="6"/>` + line("M -12,-8 Q 0,-16 12,-8", 5) + line("M -60,-26 L -42,-34", 4, "#fff", 'opacity="0.8"');
    if (c.lips && c.style === "bun") s += `<circle cx="-120" cy="58" r="11" fill="#e5b54a" stroke="${INK}" stroke-width="4"/><circle cx="120" cy="58" r="11" fill="#e5b54a" stroke="${INK}" stroke-width="4"/>`;
    s += hairFront(c);
    if (c.style === "cap") s += line("M -24,-44 L -86,-62", 12, "#2a1f1a") + line("M 24,-44 L 86,-62", 12, "#2a1f1a");
    if (c.style === "cap" && !o.noCap) {} // cap is the hair
    if (!c.hair && c.style !== "cap") s += `<ellipse cx="-40" cy="-112" rx="34" ry="12" fill="#fff" opacity="0.35" transform="rotate(-18 -40 -112)"/>`;
    return G(o.t || "", s);
  }

  // extra outfits: kind -> [fill, shade, style]; style decides the details drawn
  const TORSO = {
    brown: ["#6b4a35", "#4a3223", "suit", "#2b4a7a"], navysuit: ["#1f2b45", "#121a2c", "suit", "#1d3d6e"],
    white: ["#f4efe6", "#d8cfbf", "blazer"], sweater: ["#2f4f46", "#1f3630", "plain"], coat: ["#c9a77a", "#a5835a", "coat"],
    gown: ["#bcd9e8", "#93b8cc", "plain"], black: ["#1b1a20", "#0c0b10", "suit", "#0c0b10"], green: ["#2e9d55", "#1f7a3e", "courier"],
    sec: ["#3b3f4c", "#272a33", "blazer"],
  };
  // torso, neck base at y=232, centred on x=0
  function torso(kind) {
    const base = "M -250,980 L -242,380 C -236,300 -172,252 -60,232 L 60,232 C 172,252 236,300 242,380 L 250,980 Z";
    const cid = nid("tc");
    const T = TORSO[kind] || {
      courier: ["#ff7a1a", "#cf5508"],
      suit: ["#22314f", "#141f36"],
      guard: ["#1c1f2b", "#0e1018"],
      red: ["#8e1f35", "#5e1222"],
      blue: ["#8fc3e8", "#5f97c2"],
      grey: ["#5d6474", "#3e4452"],
    }[kind];
    let s = `<clipPath id="${cid}"><path d="${base}"/></clipPath>` + pth(base, T[0], 7);
    s += `<g clip-path="url(#${cid})"><path d="M 90,240 C 120,420 100,700 130,980 L 300,980 L 300,240 Z" fill="${T[1]}"/><path d="M 90,240 C 120,420 100,700 130,980 L 300,980 L 300,240 Z" fill="url(#${P.dots})" opacity="0.18"/>`;
    const X = TORSO[kind];
    if (X) {
      if (X[2] === "courier") {
        s += rect(-260, 500, 520, 46, "#dfe3ea", 5) + line("M 0,250 L 0,980", 5) + `</g>` + pth("M -92,232 L -108,318 L 0,292 L 108,318 L 92,232 Z", X[1], 6);
        return s;
      }
      if (X[2] === "suit") {
        s += `</g>` + pth("M -62,232 L 0,420 L 62,232 Z", "#f6f3ee", 5) + pth("M -15,250 L 15,250 L 24,400 L 0,432 L -24,400 Z", X[3], 5);
        return s + line("M -62,232 L -120,470 L 0,420", 6) + line("M 62,232 L 120,470 L 0,420", 6);
      }
      if (X[2] === "blazer") {
        s += `</g>` + pth("M -62,232 L 0,380 L 62,232 Z", kind === "white" ? "#9b1c31" : "#f6f3ee", 5) + line("M -62,232 L -110,460 L 0,380", 6) + line("M 62,232 L 110,460 L 0,380", 6);
        return s + `<circle cx="0" cy="520" r="12" fill="#e5b54a" stroke="${INK}" stroke-width="4"/><circle cx="0" cy="600" r="12" fill="#e5b54a" stroke="${INK}" stroke-width="4"/>`;
      }
      if (X[2] === "coat") {
        s += `</g>` + pth("M -90,232 L -40,330 L 0,250 L 40,330 L 90,232 Z", X[1], 5) + line("M 0,250 L 0,980", 5) + line("M -150,560 L -60,560", 5) + line("M 150,560 L 60,560", 5);
        return s;
      }
      return s + `</g>` + pth("M -70,232 Q 0,300 70,232", "none", 5);
    }
    if (kind === "courier") {
      s += rect(-260, 500, 520, 46, "#dfe3ea", 5) + rect(-260, 512, 520, 10, "#ffffff") + line("M 0,250 L 0,980", 5);
      s += `</g>` + pth("M -92,232 L -108,318 L 0,292 L 108,318 L 92,232 Z", "#e8650c", 6) + line("M -150,640 L -150,760", 4) + line("M 150,640 L 150,760", 4);
      return s;
    }
    if (kind === "suit" || kind === "red" || kind === "grey") {
      s += `</g>` + pth("M -62,232 L 0,420 L 62,232 Z", "#f6f3ee", 5);
      if (kind === "suit") s += pth("M -15,250 L 15,250 L 24,400 L 0,432 L -24,400 Z", "#b3202e", 5);
      s += line("M -62,232 L -120,470 L 0,420", 6) + line("M 62,232 L 120,470 L 0,420", 6);
      return s;
    }
    if (kind === "guard") {
      s += `</g>` + pth("M -70,232 L 0,330 L 70,232 Z", "#2c3247", 5) + line("M 0,330 L 0,980", 5) +
        pth("M 130,380 L 142,404 L 168,406 L 148,422 L 154,448 L 130,434 L 106,448 L 112,422 L 92,406 L 118,404 Z", "#e5b54a", 4) +
        rect(-210, 300, 70, 40, "#2c3247", 4);
      return s;
    }
    if (kind === "blue") {
      s += `</g>` + pth("M -70,232 L -40,310 L 0,262 L 40,310 L 70,232 Z", "#ffffff", 5) + line("M -46,262 L 40,560", 6, "#2f5fa8") + line("M 46,262 L 60,560", 6, "#2f5fa8");
      return s;
    }
    return s + `</g>`;
  }

  function hand(kind, skin, shade) {
    switch (kind) {
      case "point": // index finger to the left (-x)
        return pth("M 0,-40 C 40,-44 70,-20 70,10 C 70,44 40,56 10,52 L -20,46 C -34,42 -34,26 -20,22 L -100,14 C -122,12 -122,-14 -100,-16 L -10,-24 Z", skin, 6) + line("M 10,8 L 50,6", 4) + line("M 10,30 L 46,30", 4);
      case "pointDown":
        return pth("M -40,0 C -44,-40 -20,-70 10,-70 C 44,-70 56,-40 52,-10 L 46,20 C 42,34 26,34 22,20 L 14,100 C 12,122 -14,122 -16,100 L -24,10 Z", skin, 6) + line("M 8,-10 L 6,-50", 4) + line("M 30,-10 L 30,-46", 4);
      case "grab":
        return pth("M -70,-30 C -60,-70 40,-74 70,-40 L 90,10 C 96,40 70,60 40,56 L -50,50 C -80,46 -86,0 -70,-30 Z", skin, 6) +
          line("M -40,-34 Q -30,10 -36,46", 4) + line("M -6,-40 Q 4,10 -2,52", 4) + line("M 28,-40 Q 38,10 32,54", 4);
      case "open":
      default:
        return pth("M -40,-50 C -30,-80 30,-80 40,-50 L 48,30 C 50,60 -50,60 -48,30 Z", skin, 6) + line("M -14,-60 L -16,-10", 4) + line("M 14,-60 L 14,-10", 4);
    }
  }

  function box(o = {}) {
    // isometric parcel, front-facing; ~260 wide
    return pth("M -130,-40 L 0,-90 L 130,-40 L 0,10 Z", "#e2b177", 6) + pth("M -130,-40 L 0,10 L 0,150 L -130,100 Z", "#c8925a", 6) +
      pth("M 130,-40 L 0,10 L 0,150 L 130,100 Z", "#a87442", 6) + pth("M -66,-65 L 64,-15 L 64,-2 L -66,-52 Z", "#d9c7a0", 3) +
      pth("M -100,28 L -36,52 L -36,96 L -100,72 Z", "#ffffff", 4) + line("M -90,50 L -48,66", 3) + line("M -90,64 L -56,77", 3) +
      (o.label ? `<text x="-68" y="64" font-family="Bangers" font-size="18" fill="${INK}" transform="skewY(20)">42</text>` : "");
  }

  function bust(who, kind, expr, o = {}) {
    const c = CH[who];
    return G(o.t || "", torso(kind) + head(who, expr, Object.assign({}, o, { t: "" })));
  }

  // ---------------- backgrounds ----------------
  function skyNight(id) {
    return `<defs>${lin(id, [[0, "#0b1129"], [0.6, "#1d2c52"], [1, "#2d4272"]])}</defs>${rect(0, 0, 1080, 1920, `url(#${id})`)}`;
  }
  function rainOver(op = 1) {
    return rect(0, 0, 1080, 1920, `url(#${P.rain})`, 0, `opacity="${op}"`);
  }
  function tower(rand, x0, x1, top, bottom, lean = 120) {
    // low-angle tower: wide at bottom, narrow at top
    const tl = x0 + lean, tr = x1 - lean;
    let s = pth(`M ${x0},${bottom} L ${tl},${top} L ${tr},${top} L ${x1},${bottom} Z`, "#26355e", 8);
    s += `<path d="M ${(x0 + x1) / 2},${bottom} L ${(tl + tr) / 2},${top} L ${tr},${top} L ${x1},${bottom} Z" fill="#1a2546"/>`;
    const rows = 26, cols = 9;
    for (let r = 0; r < rows; r++) {
      const v = r / rows, v2 = (r + 0.6) / rows;
      const y = top + (bottom - top) * v, y2 = top + (bottom - top) * v2;
      const lx = tl + (x0 - tl) * v, rx = tr + (x1 - tr) * v;
      const lx2 = tl + (x0 - tl) * v2, rx2 = tr + (x1 - tr) * v2;
      for (let k = 0; k < cols; k++) {
        const a = (k + 0.18) / cols, b = (k + 0.82) / cols;
        const lit = rand() < 0.28;
        const col = lit ? (rand() < 0.3 ? "#ffb35c" : "#ffe08a") : "#334773";
        s += `<path d="M ${lx + (rx - lx) * a},${y} L ${lx + (rx - lx) * b},${y} L ${lx2 + (rx2 - lx2) * b},${y2} L ${lx2 + (rx2 - lx2) * a},${y2} Z" fill="${col}"/>`;
      }
    }
    return s;
  }
  function marble(rand, x, y, w, h) {
    let s = rect(x, y, w, h, "#efe3cf");
    for (let i = 0; i < 14; i++) {
      const sx = x + rand() * w, sy = y + rand() * h;
      s += line(`M ${sx},${sy} q ${60 + rand() * 80},${30 + rand() * 60} ${120 + rand() * 120},${-10 + rand() * 80} t ${120 + rand() * 100},${20 + rand() * 60}`, 2.5, "#c9b9a0", 'opacity="0.7"');
    }
    return s + dots(x, y, w, h, 0.06);
  }
  function speedLines(rand, cx, cy, col = INK, n = 70) {
    let s = "";
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + rand() * 0.05;
      const r0 = 380 + rand() * 260, r1 = 1600;
      const w = 6 + rand() * 18;
      const ax = Math.cos(a), ay = Math.sin(a), px = -ay, py = ax;
      s += `<path d="M ${cx + ax * r0},${cy + ay * r0} L ${cx + ax * r1 + px * w},${cy + ay * r1 + py * w} L ${cx + ax * r1 - px * w},${cy + ay * r1 - py * w} Z" fill="${col}"/>`;
    }
    return s;
  }
  function burst(cx, cy, r0, r1, n, fill, sw = 8) {
    let d = "";
    for (let i = 0; i < n * 2; i++) {
      const a = (i / (n * 2)) * Math.PI * 2;
      const r = i % 2 ? r0 : r1 * (0.85 + 0.15 * ((i * 7) % 3) / 2);
      d += (i ? " L " : "M ") + (cx + Math.cos(a) * r).toFixed(1) + "," + (cy + Math.sin(a) * r).toFixed(1);
    }
    return pth(d + " Z", fill, sw);
  }
  function city(rand, y, h, col = "#1b2748") {
    let s = "", x = -20;
    while (x < 1100) {
      const w = 60 + rand() * 120, bh = h * (0.35 + rand() * 0.65);
      s += rect(x, y + h - bh, w, bh, col);
      for (let wy = y + h - bh + 18; wy < y + h - 14; wy += 30)
        for (let wx = x + 12; wx < x + w - 14; wx += 24) if (rand() < 0.35) s += rect(wx, wy, 10, 14, rand() < 0.5 ? "#ffd27a" : "#ffeab0");
      x += w + 6;
    }
    return s;
  }

  // ---------------- panels ----------------
  const PANELS = {
    tower(rand) {
      const sky = nid("sky");
      let s = skyNight(sky);
      s += `<circle cx="820" cy="300" r="70" fill="#f3efd8" opacity="0.9"/>` + dots(0, 0, 1080, 1920, 0.08, true);
      s += tower(rand, 120, 960, 40, 2400, 170);
      // sign
      s += rect(330, 120, 420, 120, "#0e1530", 6) + `<text x="540" y="205" text-anchor="middle" font-family="Bangers" font-size="84" letter-spacing="4" fill="#ffd27a" stroke="${INK}" stroke-width="3">ARAL HOLDİNG</text>`;
      s += rect(0, 1600, 1080, 320, "#10172e") + city(rand, 1480, 260, "#121b36");
      s += rainOver(1);
      return s;
    },
    visor(rand) {
      let s = rect(0, 0, 1080, 1920, "#0d1124");
      const vg = nid("vg"), cid = nid("vc");
      s += `<defs>${lin(vg, [[0, "#3a4a7a"], [0.45, "#141b35"], [1, "#05070f"]])}</defs>`;
      // helmet shell
      s += pth("M -80,120 C 80,-80 1000,-80 1160,120 L 1180,1900 L -100,1900 Z", "#1c1c22", 10);
      s += line("M 40,140 C 300,40 780,40 1040,140", 6, "#5a5a6a");
      const vd = "M 40,520 C 240,380 840,380 1040,520 C 1060,760 1040,1060 980,1300 C 700,1380 380,1380 100,1300 C 40,1060 20,760 40,520 Z";
      s += `<clipPath id="${cid}"><path d="${vd}"/></clipPath>` + pth(vd, `url(#${vg})`, 10);
      // eyes behind visor: determined
      s += `<g clip-path="url(#${cid})">${G("translate(540 930) scale(2.3)", head("deniz", "determined", { light: "left" }))}
        <path d="${vd}" fill="#0a0f22" opacity="0.55"/>
        ${G("translate(720 640) scale(0.32) rotate(-8)", tower(rand, 120, 960, 40, 1400, 170))}
        <path d="M 120,560 C 400,470 700,470 960,560 L 960,640 C 700,560 400,560 120,640 Z" fill="#ffffff" opacity="0.18"/>
        ${rainOver(0.7)}</g>`;
      s += line("M 90,600 C 300,500 780,500 990,600", 5, "#8fa3d9", 'opacity="0.6"');
      return s;
    },
    walk(rand) {
      const sky = nid("sky"), lg = nid("lg");
      let s = skyNight(sky);
      s += `<defs>${lin(lg, [[0, "#ffd99a"], [1, "#ff9a3c"]])}</defs>`;
      // building base with glowing revolving door
      s += rect(0, 0, 1080, 1250, "#1b2546") + dots(0, 0, 1080, 1250, 0.15);
      for (let i = 0; i < 6; i++) s += rect(20 + i * 180, 80, 140, 900, "#22305a", 4);
      s += rect(300, 420, 480, 830, `url(#${lg})`, 8) + line("M 540,420 L 540,1250", 8) + line("M 300,800 L 780,800", 6) + rect(330, 450, 420, 40, "#fff3d0");
      s += `<text x="540" y="380" text-anchor="middle" font-family="Bangers" font-size="70" fill="#ffd27a" stroke="${INK}" stroke-width="3">ARAL HOLDİNG</text>`;
      // wet street with reflections
      s += rect(0, 1250, 1080, 670, "#0f1630") + `<path d="M 300,1250 L 780,1250 L 980,1920 L 100,1920 Z" fill="#ffb15a" opacity="0.28"/>` + line("M 0,1250 L 1080,1250", 8);
      for (let i = 0; i < 10; i++) { const y = 1320 + i * 60; s += line(`M ${220 + rand() * 200},${y} l ${120 + rand() * 200},0`, 4, "#ffd99a", 'opacity="0.4"'); }
      // Deniz from behind, silhouette with orange jacket, box under arm
      s += G("translate(540 1500)", `
        ${pth("M -60,-30 L -80,330 L -20,330 L -4,60 L 14,60 L 30,330 L 90,330 L 70,-30 Z", "#141824", 7)}
        ${pth("M -150,-380 C -150,-470 150,-470 150,-380 L 140,0 L -140,0 Z", "#ff7a1a", 8)}
        ${rect(-146, -230, 292, 36, "#dfe3ea", 5)}
        ${pth("M -60,-520 C -60,-600 60,-600 60,-520 C 60,-470 -60,-470 -60,-520 Z", "#1e1a24", 7)}
        ${G("translate(185 -170) scale(0.62) rotate(8)", box())}
        ${pth("M -210,-150 C -250,-150 -260,-60 -220,-40 C -180,-30 -160,-80 -170,-120 Z", "#1c1c22", 6)}
      `);
      s += rainOver(1);
      return s;
    },
    reception(rand) {
      let s = marble(rand, 0, 0, 1080, 1920);
      s += rect(0, 0, 1080, 260, "#d9caa9") + line("M 0,260 L 1080,260", 6);
      s += `<text x="540" y="400" text-anchor="middle" font-family="Bangers" font-size="120" letter-spacing="14" fill="#d9a441" stroke="${INK}" stroke-width="4">ARAL</text>`;
      s += bust("resepsiyon", "red", "sneer", { t: "translate(560 900) scale(1.25)" });
      // pointing arm to the left
      s += pth("M 360,1220 C 280,1180 220,1150 160,1130 L 150,1210 C 220,1240 290,1270 340,1300 Z", "#8e1f35", 6) + G("translate(130 1170) scale(1.1)", hand("point", CH.resepsiyon.skin));
      // desk
      s += pth("M -20,1380 L 1100,1380 L 1100,1940 L -20,1940 Z", "#3a2a24", 8) + rect(-20, 1380, 1120, 40, "#d9a441", 6) + dots(0, 1420, 1080, 520, 0.2);
      s += G("translate(860 1340)", pth("M -60,0 L -40,-70 L 40,-70 L 60,0 Z", "#2a2f3a", 5) + rect(-80, -10, 160, 20, "#1c1f28", 4));
      return s;
    },
    denizDesk(rand) {
      let s = marble(rand, 0, 0, 1080, 1920);
      s += rect(0, 0, 1080, 1920, "#0f1630", 0, 'opacity="0.18"');
      s += bust("deniz", "courier", "neutral", { t: "translate(540 880) scale(1.3)", wet: true });
      // hands holding the box
      s += G("translate(540 1520) scale(1.25)", box({ label: true })) + G("translate(330 1530) scale(1.1)", hand("open", CH.deniz.skin)) + G("translate(750 1530) scale(1.1)", hand("open", CH.deniz.skin));
      for (let i = 0; i < 9; i++) s += pth(`M ${200 + rand() * 680},${560 + rand() * 300} q 8,18 0,26 q -8,-8 0,-26 Z`, "#bcd6ff", 3);
      return s;
    },
    footprints(rand) {
      let s = marble(rand, 0, 0, 1080, 1920);
      s += speedLines(rand, 540, 820, "#d9caa9", 50);
      s += bust("resepsiyon", "red", "angry", { t: "translate(560 960) scale(1.45)" });
      s += pth("M 700,1320 C 680,1400 650,1480 620,1540 L 700,1570 C 730,1500 760,1420 780,1340 Z", "#8e1f35", 6) + G("translate(650 1590) scale(1.2)", hand("pointDown", CH.resepsiyon.skin));
      // floor with wet footprints
      s += pth("M -20,1600 L 1100,1600 L 1100,1940 L -20,1940 Z", "#e6d7bd", 8);
      for (let i = 0; i < 4; i++) {
        const x = 160 + i * 220, y = 1700 + (i % 2) * 90;
        s += `<ellipse cx="${x}" cy="${y}" rx="44" ry="26" fill="#6f8bb5" opacity="0.6" transform="rotate(-12 ${x} ${y})"/><ellipse cx="${x + 54}" cy="${y - 6}" rx="22" ry="20" fill="#6f8bb5" opacity="0.6"/>`;
      }
      return s;
    },
    guard(rand) {
      let s = rect(0, 0, 1080, 1920, "#f2d8a8");
      s += speedLines(rand, 540, 820, INK, 64);
      s += bust("guvenlik", "guard", "angry", { t: "translate(560 860) scale(1.55)" });
      // big hand grabbing Deniz's orange sleeve in the foreground
      s += pth("M -40,1400 C 200,1360 520,1420 760,1520 L 700,1760 C 480,1700 200,1660 -40,1680 Z", "#ff7a1a", 8) + rect(-40, 1520, 760, 34, "#dfe3ea", 5, 'transform="rotate(8 360 1540)"');
      s += G("translate(640 1540) scale(2.1) rotate(-12)", hand("grab", CH.guvenlik.skin));
      return s;
    },
    bam(rand) {
      let s = rect(0, 0, 1080, 1920, "#ffd84a") + rect(0, 0, 1080, 1920, `url(#${P.dotsBig})`, 0, 'opacity="0.18"');
      s += burst(540, 820, 300, 560, 14, "#e83b2e", 10) + burst(540, 820, 200, 380, 12, "#fff3c4", 8);
      s += `<text x="540" y="900" text-anchor="middle" font-family="Bangers" font-size="300" fill="#ffd84a" stroke="${INK}" stroke-width="14" paint-order="stroke" transform="rotate(-8 540 820)">BAM!</text>`;
      s += pth("M -20,1500 L 1100,1440 L 1100,1940 L -20,1940 Z", "#e6d7bd", 8);
      s += G("translate(560 1420) scale(1.5) rotate(24)", box({ label: true }));
      s += line("M 300,1300 l -80,-40", 8) + line("M 330,1250 l -60,-70", 8) + line("M 800,1300 l 80,-40", 8);
      return s;
    },
    eceHelp(rand) {
      let s = marble(rand, 0, 0, 1080, 1920);
      s += rect(0, 0, 1080, 1920, "#fff3d6", 0, 'opacity="0.35"');
      s += rect(760, 200, 260, 1300, "#c9b48a", 6) + rect(790, 240, 200, 600, "#e8d8b4", 4);
      s += bust("ece", "blue", "kind", { t: "translate(500 900) scale(1.4) rotate(-6)" });
      s += G("translate(470 1560) scale(1.35) rotate(-8)", box({ label: true })) + G("translate(260 1600) scale(1.2)", hand("open", CH.ece.skin)) + G("translate(690 1560) scale(1.2)", hand("open", CH.ece.skin));
      // badge
      s += G("translate(600 1260) rotate(4)", rect(-60, -40, 120, 160, "#ffffff", 5) + rect(-60, -40, 120, 34, "#2f5fa8", 5));
      return s;
    },
    elevatorWater(rand) {
      let s = rect(0, 0, 1080, 1920, "#9aa3ad");
      for (let i = 0; i < 6; i++) s += rect(i * 180, 0, 180, 1920, i % 2 ? "#a7b0ba" : "#949da8", 4) + line(`M ${i * 180 + 40},0 L ${i * 180 + 60},1920`, 6, "#ffffff", 'opacity="0.25"');
      s += rect(0, 0, 1080, 130, "#fff4d8", 6) + rect(0, 1180, 1080, 30, "#c9ced6", 5);
      s += bust("ece", "blue", "smile", { t: "translate(560 900) scale(1.35)" });
      // hand offering bottle toward camera
      s += G("translate(360 1460) rotate(-10)", pth("M -60,-170 L 60,-170 L 70,-120 L 70,200 C 70,230 -70,230 -70,200 L -70,-120 Z", "#bfe3ff", 7) + rect(-34, -230, 68, 64, "#2f7fd0", 6) + rect(-70, -40, 140, 90, "#ffffff", 5) + line("M -40,-130 L -40,180", 6, "#ffffff", 'opacity="0.7"') + G("translate(0 110) scale(1.5)", hand("open", CH.ece.skin)));
      return s;
    },
    badge(rand) {
      let s = rect(0, 0, 1080, 1920, "#8fc3e8") + dots(0, 0, 1080, 1920, 0.12);
      s += line("M 300,-20 L 470,520", 18, "#2f5fa8") + line("M 780,-20 L 610,520", 18, "#2f5fa8");
      s += G("translate(540 960) rotate(-4)", `
        ${rect(-330, -420, 660, 860, "#ffffff", 9, 'rx="30"')}
        ${rect(-330, -420, 660, 170, "#2f5fa8", 9, 'rx="30"')}
        <text x="0" y="-300" text-anchor="middle" font-family="Bangers" font-size="84" letter-spacing="6" fill="#ffffff">ARAL HOLDİNG</text>
        ${rect(-150, -220, 300, 330, "#e8eef5", 6)}
        ${G("translate(0 -90) scale(0.62)", head("ece", "smile"))}
        <text x="0" y="200" text-anchor="middle" font-family="Bangers" font-size="76" fill="${INK}">ECE YILMAZ</text>
        ${rect(-230, 250, 460, 110, "#ff7a1a", 7)}
        <text x="0" y="335" text-anchor="middle" font-family="Bangers" font-size="92" letter-spacing="8" fill="${INK}">STAJYER</text>
      `);
      return s;
    },
    elevatorTwo(rand) {
      let s = rect(0, 0, 1080, 1920, "#9aa3ad");
      for (let i = 0; i < 6; i++) s += rect(i * 180, 0, 180, 1920, i % 2 ? "#a7b0ba" : "#949da8", 4);
      s += rect(0, 0, 1080, 130, "#fff4d8", 6) + rect(380, 170, 320, 150, "#141824", 7);
      s += bust("deniz", "courier", "smirk", { t: "translate(300 1050) scale(1.05)", light: "left" });
      s += bust("ece", "blue", "talk", { t: "translate(800 1080) scale(1.0)" });
      return s;
    },
    boardroom(rand) {
      let s = rect(0, 0, 1080, 1920, "#0d1430");
      s += city(rand, 200, 700, "#1b2748") + rect(0, 0, 1080, 960, "#0d1430", 0, 'opacity="0.25"');
      for (let i = 0; i <= 4; i++) s += line(`M ${i * 270},0 L ${i * 270},960`, 10, "#0a0f22");
      s += rect(0, 960, 1080, 960, "#3b2a22") + dots(0, 960, 1080, 960, 0.2);
      // executives behind table
      s += bust("exec1", "suit", "neutral", { t: "translate(150 1010) scale(0.55)" }) + bust("exec2", "suit", "neutral", { t: "translate(340 990) scale(0.55)" });
      s += bust("exec3", "grey", "neutral", { t: "translate(530 1000) scale(0.55)" });
      s += pth("M -40,1260 L 1120,1260 L 1120,1940 L -40,1940 Z", "#5a3c2c", 8) + line("M -40,1290 L 1120,1290", 5, "#7a5640") + dots(0, 1300, 1080, 640, 0.2);
      for (const x of [150, 340, 530]) s += rect(x - 70, 1330, 140, 90, "#f4f1ea", 4);
      // assistant in foreground right
      s += bust("asistan", "grey", "talk", { t: "translate(800 1200) scale(1.1)", light: "left" });
      return s;
    },
    door(rand) {
      const rg = nid("rg");
      let s = rect(0, 0, 1080, 1920, "#2a1f1c") + `<defs>${rad(rg, [[0, "#fffbe8"], [0.5, "#ffe2a0"], [1, "#ffb35a"]])}</defs>`;
      // open doorway with blinding light, Deniz silhouette
      s += rect(240, 300, 600, 1300, `url(#${rg})`, 10);
      s += pth("M 240,300 L 60,200 L 60,1700 L 240,1600 Z", "#5a3c2c", 8) + pth("M 840,300 L 1020,200 L 1020,1700 L 840,1600 Z", "#5a3c2c", 8);
      s += `<path d="M 240,1600 L 840,1600 L 1080,1920 L 0,1920 Z" fill="#ffd27a" opacity="0.45"/>`;
      s += G("translate(540 1600)", `
        ${pth("M -70,-40 L -90,0 L -20,0 L -4,-20 L 14,-20 L 30,0 L 100,0 L 80,-40 Z", INK, 4)}
        ${pth("M -60,-460 L -86,-40 L -20,-40 L -2,-300 L 14,-300 L 30,-40 L 96,-40 L 70,-460 Z", INK, 4)}
        ${pth("M -170,-900 C -170,-990 170,-990 170,-900 L 150,-440 L -150,-440 Z", INK, 4)}
        ${line("M -166,-880 L -150,-450", 10, "#ff7a1a")}${line("M 166,-880 L 150,-450", 10, "#ff7a1a")}
        ${rect(-150, -700, 300, 26, "#dfe3ea")}
        ${pth("M -78,-1000 C -78,-1150 78,-1150 78,-1000 C 78,-930 -78,-930 -78,-1000 Z", INK, 4)}
      `);
      // foreground executive heads turned
      s += G("translate(150 1780) scale(1.25)", pth("M -130,-40 C -136,-156 136,-156 130,-40 C 130,80 -130,80 -130,-40 Z", "#1a1416", 6) + torso("suit"));
      s += G("translate(940 1800) scale(1.15)", pth("M -130,-40 C -136,-156 136,-156 130,-40 C 130,80 -130,80 -130,-40 Z", "#262024", 6) + torso("grey"));
      return s;
    },
    shock(rand) {
      let s = rect(0, 0, 1080, 1920, "#ffe1e1") + speedLines(rand, 540, 860, "#e8443a", 60);
      s += bust("resepsiyon", "red", "shocked", { t: "translate(540 900) scale(1.45)" });
      // phone falling
      s += G("translate(800 1560) rotate(28)", rect(-70, -130, 140, 260, "#1c1f28", 7, 'rx="20"') + rect(-56, -110, 112, 210, "#6fb6ff", 4, 'rx="8"'));
      s += line("M 700,1390 l -30,-60", 6) + line("M 760,1370 l -10,-70", 6) + line("M 820,1380 l 14,-64", 6);
      return s;
    },
    eyes(rand) {
      let s = rect(0, 0, 1080, 1920, "#0d1430");
      s += G("translate(540 1020) scale(3.4)", head("deniz", "smirk", { light: "left" }));
      // split light: cool left, orange right
      s += `<rect x="0" y="0" width="540" height="1920" fill="#3a6bd8" opacity="0.18"/><rect x="540" y="0" width="540" height="1920" fill="#ff7a1a" opacity="0.2"/>`;
      s += rect(0, 0, 1080, 420, "#0d1430") + rect(0, 1560, 1080, 360, "#0d1430") + line("M 0,420 L 1080,420", 10) + line("M 0,1560 L 1080,1560", 10);
      return s;
    },
    title(rand) {
      let s = rect(0, 0, 1080, 1920, "#0d1430") + speedLines(rand, 540, 800, "#1f2d55", 60) + dots(0, 0, 1080, 1920, 0.12, true);
      s += rect(0, 1160, 1080, 760, "#ff7a1a") + dots(0, 1160, 1080, 760, 0.18) + line("M 0,1160 L 1080,1160", 10);
      s += G("translate(540 1640) scale(1.05)", bust("deniz", "courier", "smirk", {}) );
      return s;
    },
  };

  function draw(svg) {
    const name = svg.getAttribute("data-art");
    const fn = PANELS[name];
    if (!fn) return;
    const seed = Array.from(name).reduce((a, ch) => a * 31 + ch.charCodeAt(0), 7) >>> 0;
    const d = defs();
    svg.setAttribute("viewBox", "0 0 1080 1920");
    svg.setAttribute("preserveAspectRatio", "xMidYMid slice");
    svg.innerHTML = d + fn(mulberry32(seed));
  }
  window.Comic = {
    draw, drawAll: (root) => (root || document).querySelectorAll("svg[data-art]").forEach(draw),
    // building blocks for extension files (assets/comic_ep.js)
    lib: { INK, nid, G, pth, line, rect, dots, lin, rad, CH, EXPR, PANELS, head, torso, hand, box, bust, skyNight, rainOver, tower, marble,
           speedLines, burst, city, TORSO, P: () => P },
  };
})();
