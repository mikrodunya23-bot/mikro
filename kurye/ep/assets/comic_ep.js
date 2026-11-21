/* Panels and characters for the 15-minute episode of "Kapıdaki Kurye".
 * Extends assets/comic.js (load after it). Deterministic: seeded random only. */
(function () {
  const L = window.Comic.lib;
  const { INK, nid, G, pth, line, rect, dots, lin, rad, CH, PANELS, head, torso, hand, box, bust, skyNight, rainOver, tower, marble, speedLines, burst, city } = L;
  const P = () => L.P();

  // ---------------- characters ----------------
  CH.cem = Object.assign({}, CH.deniz);
  CH.denizBey = { skin: "#e6ad86", shade: "#c08561", hair: "#cfcfd6", hl: "#ffffff", iris: "#5a3a22", style: "swept", old: true, mustache: "#bdbdc4" };
  CH.murat = { skin: "#e3ad85", shade: "#bd8762", hair: "#b9b9c1", hl: "#eeeef2", iris: "#4a3a2a", style: "short", jaw: "wide", mustache: "#9c9ca4", old: true };
  CH.hasan = { skin: "#c98e64", shade: "#a06a45", hair: "#2a221d", hl: "#5a4a3d", iris: "#2b1d14", style: "short", beard: "#2a221d", beardOp: 0.6 };
  CH.kaan = { skin: "#e2b08c", shade: "#bd8866", hair: "#3a2a20", hl: "#6d5444", iris: "#3a2a1a", style: "swept", jaw: "wide" };
  CH.selin = { skin: "#f2c8a6", shade: "#d39f7d", hair: "#8a3b22", hl: "#c46a48", iris: "#3a5a3a", female: true, style: "bob", lips: "#b8323f" };
  CH.sec1 = { skin: "#e8b894", shade: "#c79470", hair: "#1c171f", hl: "#4a4258", iris: "#2b1d14", female: true, style: "bob", lips: "#a8323e" };
  CH.sec2 = { skin: "#f3cdb0", shade: "#d6a88a", hair: "#5a3a26", hl: "#8a6a50", iris: "#3a2a1a", female: true, style: "wavy", lips: "#b04050" };
  CH.staff1 = { skin: "#d9a07a", shade: "#b37a56", hair: "#2a2a2a", hl: "#555", iris: "#222", style: "short" };
  CH.staff2 = { skin: "#f0c8a8", shade: "#d0a080", hair: "#a0522d", hl: "#c87850", iris: "#335", female: true, style: "bob", lips: "#c04050" };

  // ---------------- props & backgrounds ----------------
  const simit = (x, y, s = 1) => G(`translate(${x} ${y}) scale(${s})`,
    `<ellipse cx="0" cy="0" rx="70" ry="52" fill="#c98a3c" stroke="${INK}" stroke-width="6"/><ellipse cx="0" cy="0" rx="28" ry="18" fill="none" stroke="${INK}" stroke-width="5"/>` +
    [[-40, -20], [-10, -36], [25, -30], [48, -6], [40, 24], [8, 36], [-30, 30], [-52, 4]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="4" ry="2.5" fill="#f6e7c4"/>`).join(""));
  const phone = (x, y, r = 0, s = 1) => G(`translate(${x} ${y}) rotate(${r}) scale(${s})`, rect(-45, -85, 90, 170, "#1c1f28", 6, 'rx="14"') + rect(-35, -70, 70, 135, "#7cc2ff", 3, 'rx="6"') + `<circle cx="22" cy="-58" r="6" fill="#ff4b4b"/>`);
  const phoneHand = (x, y, r = 0, s = 1, skin = "#e0a983") => G(`translate(${x} ${y}) rotate(${r}) scale(${s})`, phone(0, -40) + hand("open", skin));
  const teaGlass = (x, y, s = 1) => G(`translate(${x} ${y}) scale(${s})`, pth("M -22,-50 C -30,-20 -14,-10 -20,20 L 20,20 C 14,-10 30,-20 22,-50 Z", "#b8452a", 4) + rect(-30, 20, 60, 10, "#e8e8ee", 4) + rect(-24, -54, 48, 8, "#fff", 0, 'opacity="0.5"'));
  const umbrella = (x, y, s = 1, col = "#141218") => G(`translate(${x} ${y}) scale(${s})`, pth("M -150,0 Q 0,-150 150,0 Q 112,-18 75,0 Q 37,-18 0,0 Q -37,-18 -75,0 Q -112,-18 -150,0 Z", col, 6) + line("M 0,-70 L 0,140 q 0,24 -22,24", 6));
  const scooter = (x, y, s = 1, col = "#ff7a1a") => G(`translate(${x} ${y}) scale(${s})`,
    `<circle cx="-150" cy="60" r="62" fill="#1c1c22" stroke="${INK}" stroke-width="6"/><circle cx="-150" cy="60" r="24" fill="#8a8a95"/><circle cx="170" cy="60" r="62" fill="#1c1c22" stroke="${INK}" stroke-width="6"/><circle cx="170" cy="60" r="24" fill="#8a8a95"/>` +
    pth("M -210,40 C -200,-40 -60,-60 10,-40 L 120,-40 L 170,-160 L 200,-160 L 150,0 L 120,40 Z", col, 6) + rect(-30, -120, 160, 80, "#e5e5ea", 6, 'rx="10"') + line("M 170,-160 L 230,-175", 8));
  function lobbyBg(rand, opt = {}) {
    let s = marble(rand, 0, 0, 1080, 1920) + rect(0, 0, 1080, 230, "#d9caa9") + line("M 0,230 L 1080,230", 6);
    for (const x of [60, 1020]) s += rect(x - 40, 230, 80, 1300, "#e3d5b8", 5) + rect(x - 52, 230, 104, 40, "#d9a441", 5);
    for (let i = 0; i < 4; i++) s += `<ellipse cx="${180 + i * 240}" cy="120" rx="70" ry="24" fill="#fff6d8" stroke="${INK}" stroke-width="4"/>`;
    s += pth("M -20,1500 L 1100,1500 L 1100,1940 L -20,1940 Z", "#e6d7bd", 7) + dots(0, 1500, 1080, 440, 0.08);
    if (opt.banner) {
      s += rect(140, 270, 800, 150, "#9b1c31", 7) + `<text x="540" y="372" text-anchor="middle" font-family="Bangers" font-size="74" letter-spacing="3" fill="#ffd84a">HOŞ GELDİNİZ CEM BEY</text>`;
      for (const [bx, by, c] of [[90, 470, "#e8443a"], [160, 430, "#ffd84a"], [990, 470, "#3d8bd9"], [920, 430, "#e8443a"]]) s += `<ellipse cx="${bx}" cy="${by}" rx="44" ry="54" fill="${c}" stroke="${INK}" stroke-width="5"/>` + line(`M ${bx},${by + 54} q 10,60 -6,140`, 3);
    }
    return s;
  }
  function officeBg(rand, night = false) {
    let s = rect(0, 0, 1080, 1920, night ? "#121a33" : "#cfe2f2") + city(rand, 280, 640, night ? "#1b2748" : "#7d97b5");
    for (let i = 0; i <= 4; i++) s += line(`M ${i * 270},0 L ${i * 270},980`, 12, "#3a3f4c");
    s += rect(0, 960, 1080, 960, "#6b5a4a") + dots(0, 960, 1080, 960, 0.12);
    return s;
  }
  const card = (rand) => rect(0, 0, 1080, 1920, "#0d1430") + speedLines(rand, 540, 960, "#18244a", 50) + dots(0, 0, 1080, 1920, 0.1, true);
  const laughingCrowd = (rand, y, s = 0.42) => bust("staff1", "suit", "kind", { t: `translate(120 ${y}) scale(${s})` }) + bust("staff2", "grey", "kind", { t: `translate(960 ${y + 20}) scale(${s})` }) +
    phoneHand(250, y + 200, -12, 0.7, CH.staff1.skin) + phoneHand(840, y + 210, 12, 0.7, CH.staff2.skin);
  function lyingCem(x, y, r = -72, s = 1) { // courier lying on the floor
    return G(`translate(${x} ${y}) rotate(${r}) scale(${s})`, torso("courier") + head("cem", "determined", { wet: true }));
  }
  const helmet = (x, y, s = 1, r = 0) => G(`translate(${x} ${y}) rotate(${r}) scale(${s})`, pth("M -120,40 C -130,-120 130,-120 120,40 L 100,80 L -100,80 Z", "#1c1c22", 7) + pth("M -96,-10 C -60,-50 60,-50 96,-10 L 90,40 L -90,40 Z", "#2c3a66", 5) + line("M -70,-20 C -30,-38 30,-38 70,-20", 5, "#8fa3d9"));


  // full-body figure: feet at local y=1380, head centre at 0
  const PANTS = { courier: "#141824", suit: "#22314f", navysuit: "#1f2b45", guard: "#1c1f2b", red: "#2a2230", blue: "#2b3e6b", grey: "#3e4452", green: "#1c2a20", sweater: "#2b2f3a", brown: "#4a3223", sec: "#272a33", white: "#e8e2d6", coat: "#3a3240" };
  function standing(who, kind, expr, o = {}) {
    const c = CH[who], cid = nid("st"), pc = PANTS[kind] || "#2b2f3a", skin = c.skin;
    let s = "";
    s += pth("M -120,720 L -150,1330 L -40,1330 L -10,820 L 10,820 L 40,1330 L 150,1330 L 120,720 Z", pc, 7);
    s += `<ellipse cx="-95" cy="1352" rx="78" ry="34" fill="${o.shoes || "#1a1a1f"}" stroke="${INK}" stroke-width="6"/><ellipse cx="95" cy="1352" rx="78" ry="34" fill="${o.shoes || "#1a1a1f"}" stroke="${INK}" stroke-width="6"/>`;
    const arm = (side, mode) => {
      const x = side * 225, col = (L.TORSO[kind] || [{ courier: "#ff7a1a", suit: "#22314f", guard: "#1c1f2b", red: "#8e1f35", blue: "#8fc3e8", grey: "#5d6474" }[kind]])[0];
      if (mode === "phone") return pth(`M ${x - 40},330 L ${x + 40},330 L ${x + side * 30},560 L ${side * 90},380 L ${side * 40},330 Z`, col, 6) + phone(side * 70, 300, side * -10, 1.0) + G(`translate(${side * 70} 380)`, hand("open", skin));
      if (mode === "up") return pth(`M ${x - 40},330 L ${x + 40},330 L ${x + side * 80},60 L ${x + side * 10},40 Z`, col, 6) + G(`translate(${x + side * 50} 20) rotate(${side * 20})`, hand("open", skin));
      return pth(`M ${x - 45},330 C ${x - 50},520 ${x - 40},640 ${x - 30},740 L ${x + 40},740 C ${x + 50},640 ${x + 50},520 ${x + 45},330 Z`, col, 6) + G(`translate(${x + 5} 790)`, hand("open", skin));
    };
    s += arm(-1, o.armR || "down") + arm(1, o.armL || "down");
    s += `<clipPath id="${cid}"><rect x="-320" y="150" width="640" height="610"/></clipPath><g clip-path="url(#${cid})">${torso(kind)}</g>` + line("M -242,760 L 242,760", 7);
    s += head(who, expr, Object.assign({}, o, { t: "" }));
    return G(o.t || "", s);
  }

  Object.assign(PANELS, {
    card,
    fallen(rand) {
      let s = lobbyBg(rand) + rect(0, 0, 1080, 1920, "#0d1430", 0, 'opacity="0.10"');
      s += standing("staff1", "suit", "kind", { t: "translate(150 860) scale(0.42)", armL: "phone" }) + standing("staff2", "grey", "kind", { t: "translate(930 880) scale(0.42)", armR: "phone", shoes: "#8e1f35" });
      s += standing("kaan", "suit", "smirk", { t: "translate(780 840) scale(0.36)", armR: "phone" });
      s += `<ellipse cx="520" cy="1745" rx="430" ry="40" fill="#000" opacity="0.15"/>`;
      s += standing("cem", "courier", "shocked", { t: "translate(150 1600) rotate(-90) scale(0.6)", wet: true, armL: "up", shoes: "#1a1a1f" });
      s += helmet(930, 1720, 0.62, 35) + line("M 820,1730 l 50,0 M 820,1760 l 30,0", 6);
      s += line("M 360,1440 l -20,-50 M 420,1420 l 0,-56 M 480,1440 l 20,-50", 7);
      return s;
    },
    hospital(rand) {
      let s = rect(0, 0, 1080, 1920, "#9cc7c2") + dots(0, 0, 1080, 1920, 0.08) + rect(620, 260, 360, 420, "#16223f", 7) + line("M 800,260 L 800,680 M 620,470 L 980,470", 6) + `<circle cx="900" cy="340" r="34" fill="#f3efd8"/>`;
      s += rect(110, 300, 300, 200, "#1c1f28", 7, 'rx="16"') + line("M 130,410 L 190,410 L 210,350 L 235,470 L 255,400 L 390,400", 5, "#5dff8a");
      s += pth("M 40,1500 L 1040,1500 L 1040,1920 L 40,1920 Z", "#f4f4f6", 7) + pth("M 40,1380 L 600,1380 L 640,1520 L 40,1520 Z", "#ffffff", 7);
      s += G("translate(300 1300) rotate(-12) scale(0.95)", torso("gown") + head("denizBey", "kind", { e: { lid: 0.65, mouth: "smile" } }));
      s += pth("M 40,1480 C 300,1440 700,1460 1040,1500 L 1040,1920 L 40,1920 Z", "#d7e7f2", 7) + dots(40, 1480, 1000, 440, 0.1);
      s += bust("cem", "sweater", "sneer", { t: "translate(820 1420) scale(0.52)", e: { lid: 0.2, mouth: "flat", bi: -14, bo: 6, look: [-10, 4] } });
      return s;
    },
    funeral(rand) {
      let s = rect(0, 0, 1080, 1920, "#6d7585") + dots(0, 0, 1080, 1920, 0.12) + rect(0, 1300, 1080, 620, "#3f5a3a") + dots(0, 1300, 1080, 620, 0.15);
      s += pth("M 430,1000 L 650,1000 L 650,1360 L 430,1360 Z", "#9a9aa4", 7) + pth("M 430,1000 Q 540,920 650,1000 Z", "#9a9aa4", 7) + `<text x="540" y="1150" text-anchor="middle" font-family="Bangers" font-size="54" fill="${INK}">DENİZ ARAL</text>`;
      const mourner = (x, y, s2) => G(`translate(${x} ${y}) scale(${s2})`, `<circle cx="0" cy="40" r="34" fill="#0d0c10"/>` + pth("M -48,80 L -70,330 L 70,330 L 48,80 Z", "#0d0c10", 4) + pth("M -60,330 L -50,420 L -10,420 L 0,340 L 10,420 L 50,420 L 60,330 Z", "#0d0c10", 3));
      for (let i = 0; i < 7; i++) { const x = 100 + i * 150, y = 820 + (i % 2) * 70; s += mourner(x, y - 10, 0.9) + umbrella(x, y, 0.9); }
      s += G("translate(930 740) scale(0.8)", pth("M -150,10 L 150,10 L 110,-40 L -110,-40 Z", "#0a090c", 5) + pth("M -80,-40 C -80,-130 80,-130 80,-40 Z", "#0a090c", 5) + pth("M -90,20 L -120,380 L 120,380 L 90,20 Z", "#0a090c", 5));
      s += bust("cem", "black", "sneer", { t: "translate(420 1500) scale(0.62)", e: { lid: 0.3, mouth: "flat", bi: -14, bo: 6 } }) + umbrella(420, 1260, 0.7, "#1d1b22");
      s += rainOver(1);
      return s;
    },
    screens(rand) {
      let s = rect(0, 0, 1080, 1920, "#141b2e") + rect(60, 220, 960, 520, "#1f2a44", 7) + rainOver(0.5);
      s += `<text x="120" y="300" font-family="Bangers" font-size="44" fill="#6f8bb5">LONDRA</text>`;
      for (let i = 0; i < 3; i++) {
        const x = 70 + i * 320;
        s += rect(x, 780, 300, 210, "#0b0f1a", 7, 'rx="10"') + rect(x + 14, 794, 272, 160, "#1d3d6e", 0);
        if (i === 1) for (let k = 0; k < 4; k++) s += rect(x + 22 + (k % 2) * 134, 802 + Math.floor(k / 2) * 76, 124, 68, ["#3a6bd8", "#2f9d55", "#e8443a", "#ffd84a"][k], 2);
        else { let d = `M ${x + 20},${930}`; for (let k = 1; k <= 8; k++) d += ` L ${x + 20 + k * 32},${930 - rand() * 110 - k * 6}`; s += line(d, 5, i ? "#5dff8a" : "#ffd84a"); }
      }
      s += bust("cem", "sweater", "determined", { t: "translate(540 1320) scale(1.05)", light: "left" });
      s += pth("M -20,1500 L 1100,1500 L 1100,1940 L -20,1940 Z", "#2a2420", 7);
      return s;
    },
    signature(rand) {
      let s = rect(0, 0, 1080, 1920, "#3a2a22") + dots(0, 0, 1080, 1920, 0.15);
      s += G("translate(540 1080) rotate(-6)", rect(-380, -520, 760, 1040, "#fbf8f0", 8) + `<text x="0" y="-410" text-anchor="middle" font-family="Bangers" font-size="58" fill="${INK}">ARAL HOLDİNG</text>` +
        Array.from({ length: 12 }, (_, i) => rect(-300, -330 + i * 44, 600 - (i % 3) * 90, 14, "#c9c2b0")).join("") +
        `<text x="120" y="330" text-anchor="middle" font-family="cursive" font-style="italic" font-size="92" fill="#1d3d6e">E. Demirel</text>` + line("M -60,350 L 300,350", 4, "#1d3d6e") +
        `<circle cx="-200" cy="330" r="80" fill="none" stroke="#c0392b" stroke-width="8" opacity="0.7"/><text x="-200" y="342" text-anchor="middle" font-family="Bangers" font-size="30" fill="#c0392b" opacity="0.8">ORTAK</text>`);
      return s;
    },
    plane(rand) {
      const sky = nid("sk");
      let s = `<defs>${lin(sky, [[0, "#2d3f72"], [0.55, "#e9866a"], [1, "#ffd28a"]])}</defs>` + rect(0, 0, 1080, 1920, `url(#${sky})`);
      s += `<circle cx="540" cy="1150" r="160" fill="#ffe7a6" opacity="0.9"/>` + rect(0, 1260, 1080, 660, "#1b2a4a") + dots(0, 1260, 1080, 660, 0.12, true);
      s += pth("M -20,1230 L 1100,1230 L 1100,1280 L -20,1280 Z", "#141a30", 4);
      for (const x of [220, 860]) s += rect(x - 18, 900, 36, 380, "#141a30") + line(`M ${x},900 Q ${x < 540 ? x + 160 : x - 160},1180 ${540},1230`, 4, "#141a30") + line(`M ${x},900 Q ${x < 540 ? x - 120 : x + 120},1120 ${x < 540 ? -20 : 1100},1230`, 4, "#141a30");
      s += city(rand, 1150, 110, "#141a30");
      s += G("translate(560 620) rotate(-8) scale(1.3)", pth("M -260,0 C -200,-30 200,-36 270,-10 C 290,0 280,16 260,18 L -250,26 Z", "#f4f4f8", 7) + pth("M -40,0 L -150,-160 L -90,-160 L 60,0 Z", "#dfe3ea", 6) + pth("M -20,12 L -110,150 L -50,150 L 70,14 Z", "#dfe3ea", 6) + pth("M -230,-6 L -280,-110 L -240,-110 L -180,-10 Z", "#e8443a", 6) + Array.from({ length: 9 }, (_, i) => `<circle cx="${-150 + i * 40}" cy="-4" r="7" fill="#2c3a66"/>`).join(""));
      return s;
    },
    phoneSplit(rand) {
      let s = rect(0, 0, 1080, 1920, "#1b2546") + city(rand, 500, 500, "#26355e") + rainOver(0.6);
      s += `<path d="M 600,0 L 1080,0 L 1080,1920 L 420,1920 Z" fill="#e9dcc2"/>` + `<path d="M 600,0 L 1080,0 L 1080,1920 L 420,1920 Z" fill="url(#${P().dots})" opacity="0.08"/>` + line("M 600,0 L 420,1920", 14);
      s += bust("cem", "sweater", "talk", { t: "translate(300 1150) scale(0.85)", light: "left" }) + phone(430, 1120, 14, 0.9);
      s += bust("murat", "brown", "kind", { t: "translate(800 1250) scale(0.85)" }) + phone(670, 1220, -14, 0.9);
      return s;
    },
    lobbyPrep(rand) {
      let s = lobbyBg(rand, { banner: true });
      s += bust("resepsiyon", "red", "talk", { t: "translate(540 1080) scale(1.15)" }) + phone(380, 1050, -18, 0.95);
      s += G("translate(140 1500) scale(0.5)", torso("grey") + head("staff2", "sneer", { e: { mouth: "flat", lid: 0.5 } })) + line("M 260,1400 L 200,1900", 10, "#8a6a4a") + `<ellipse cx="190" cy="1890" rx="60" ry="20" fill="#9ac0e0"/>`;
      return s;
    },
    guardProud(rand) {
      let s = lobbyBg(rand, { banner: true });
      s += bust("guvenlik", "guard", "smirk", { t: "translate(560 1050) scale(1.3)" }) + G("translate(760 1500) scale(1.3)", hand("open", CH.guvenlik.skin));
      return s;
    },
    teaGarden(rand) {
      const sky = nid("sk");
      let s = `<defs>${lin(sky, [[0, "#f6b26b"], [1, "#ffe0b0"]])}</defs>` + rect(0, 0, 1080, 1920, `url(#${sky})`) + rect(0, 760, 1080, 400, "#3d6f9c") + dots(0, 760, 1080, 400, 0.12, true);
      s += city(rand, 600, 170, "#5a6a8a") + line("M -20,700 Q 540,560 1100,700", 8, "#2a3550") + Array.from({ length: 12 }, (_, i) => line(`M ${i * 95},${700 - Math.sin(i / 11 * Math.PI) * 130 + 20} L ${i * 95},770`, 3, "#2a3550")).join("");
      s += pth("M 700,900 l 80,-30 l 60,30 l -140,0 Z", "#ffffff", 4) + line("M 760,870 L 760,840", 4);
      s += bust("cem", "sweater", "neutral", { t: "translate(290 1230) scale(0.9)", light: "left" }) + bust("murat", "brown", "neutral", { t: "translate(800 1250) scale(0.9)" });
      s += pth("M -20,1600 L 1100,1600 L 1100,1940 L -20,1940 Z", "#7a4a2a", 7) + teaGlass(420, 1560, 1.2) + teaGlass(660, 1565, 1.2);
      return s;
    },
    street(rand) {
      let s = rect(0, 0, 1080, 1920, "#9fb4c8") + city(rand, 300, 700, "#5d6e86") + rect(0, 1000, 1080, 920, "#55606e") + dots(0, 1000, 1080, 920, 0.12);
      for (let i = 0; i < 6; i++) s += rect(60 + i * 180, 1400, 100, 18, "#f2f2f2");
      s += scooter(250, 1150, 0.55, "#2e9d55") + scooter(820, 1230, 0.6, "#e8443a") + line("M 60,1120 l -80,0 M 80,1160 l -100,0", 6, "#fff");
      s += bust("cem", "sweater", "neutral", { t: "translate(540 1350) scale(1.0)", e: { look: [-12, 0] } });
      return s;
    },
    hasan(rand) {
      let s = rect(0, 0, 1080, 1920, "#a9bccd") + city(rand, 320, 640, "#6b7c93") + rect(0, 1100, 1080, 820, "#5d6774");
      s += scooter(760, 1500, 0.9, "#2e9d55");
      s += bust("cem", "sweater", "talk", { t: "translate(260 1180) scale(0.9)", light: "left" });
      s += bust("hasan", "green", "kind", { t: "translate(760 1130) scale(0.9)" }) + simit(600, 1460, 0.8) + G("translate(560 1500) scale(0.9)", hand("open", CH.hasan.skin));
      return s;
    },
    parcelMake(rand) {
      let s = rect(0, 0, 1080, 1920, "#e9d9bb") + dots(0, 0, 1080, 1920, 0.08) + rect(0, 0, 1080, 700, "#cdb994");
      for (let i = 0; i < 5; i++) s += rect(60 + i * 200, 180, 160, 400, ["#e8443a", "#3d8bd9", "#ffd84a", "#2e9d55", "#ff7a1a"][i], 5);
      s += pth("M -20,1200 L 1100,1200 L 1100,1940 L -20,1940 Z", "#8a5a3a", 7);
      s += G("translate(540 1300) scale(1.8)", box());
      s += G("translate(540 1110) rotate(-4)", rect(-200, -60, 400, 120, "#fff", 6) + `<text x="0" y="-8" text-anchor="middle" font-family="Bangers" font-size="40" fill="${INK}">ARAL HOLDİNG · KAT 42</text><text x="0" y="40" text-anchor="middle" font-family="Bangers" font-size="44" fill="#e8443a">ACİL</text>`);
      s += G("translate(250 1500) scale(1.4)", hand("open", CH.cem.skin)) + G("translate(830 1500) scale(1.4)", hand("open", CH.cem.skin));
      return s;
    },
    lobbyBanner(rand) {
      let s = lobbyBg(rand, { banner: true });
      s += G("translate(540 1560) scale(0.95)", pth("M -150,-380 C -150,-470 150,-470 150,-380 L 140,0 L -140,0 Z", "#ff7a1a", 8) + rect(-146, -230, 292, 36, "#dfe3ea", 5) + helmet(0, -540, 0.85) +
        pth("M -60,-30 L -80,330 L -20,330 L -4,60 L 14,60 L 30,330 L 90,330 L 70,-30 Z", "#141824", 7) + G("translate(190 -170) scale(0.6)", box()));
      for (let i = 0; i < 6; i++) s += pth(`M ${470 + i * 30},${1920} q 6,-14 0,-22 q -6,8 0,22 Z`, "#7aa6d9", 2);
      return s;
    },
    trash(rand) {
      let s = marble(rand, 0, 0, 1080, 1920) + speedLines(rand, 540, 1100, "#d9caa9", 40);
      s += pth("M 330,1150 L 750,1150 L 700,1800 L 380,1800 Z", "#5a5f6a", 8) + rect(310, 1110, 460, 60, "#6d7380", 7) + line("M 450,1250 L 470,1700 M 540,1250 L 540,1700 M 630,1250 L 610,1700", 5, "#3e434d");
      s += G("translate(540 980) rotate(-22) scale(1.2)", box({ label: true }));
      s += pth("M 980,560 C 860,620 760,680 700,760 L 760,820 C 820,740 900,700 1000,660 Z", "#8e1f35", 6) + G("translate(690 810) scale(1.3) rotate(40)", hand("open", CH.resepsiyon.skin));
      s += line("M 470,880 l -30,-50 M 610,860 l 20,-56", 6);
      return s;
    },
    eceHand(rand) {
      let s = marble(rand, 0, 0, 1080, 1920) + rect(0, 0, 1080, 1920, "#fff3d6", 0, 'opacity="0.35"');
      for (let i = 0; i < 4; i++) s += `<ellipse cx="${200 + i * 230}" cy="230" rx="80" ry="26" fill="#fff6d8" stroke="${INK}" stroke-width="4"/>`;
      s += bust("ece", "blue", "kind", { t: "translate(560 1000) scale(1.35) rotate(-10)", e: { mouth: "talk" } });
      s += pth("M 360,1350 C 300,1450 260,1560 230,1660 L 340,1700 C 380,1600 420,1500 470,1420 Z", "#8fc3e8", 6) + G("translate(260 1720) scale(1.9) rotate(180)", hand("open", CH.ece.skin));
      return s;
    },
    eceAylin(rand) {
      let s = lobbyBg(rand);
      s += bust("resepsiyon", "red", "angry", { t: "translate(300 1080) scale(1.0)", light: "left" }) + pth("M 470,1360 C 560,1330 640,1320 700,1320 L 700,1380 C 640,1385 570,1400 480,1430 Z", "#8e1f35", 6) + G("translate(740 1350) scale(1.1) rotate(180)", hand("point", CH.resepsiyon.skin));
      s += bust("ece", "blue", "sneer", { t: "translate(820 1180) scale(0.85)", e: { mouth: "flat", bi: -10, bo: 4, look: [-10, 0] } });
      return s;
    },
    managers(rand) {
      let s = lobbyBg(rand) + speedLines(rand, 540, 1000, "#e3d5b8", 30);
      s += bust("selin", "grey", "sneer", { t: "translate(330 1080) scale(1.0)", light: "left" }) + G("translate(180 1500)", pth("M -40,-60 L 40,-60 L 32,60 L -32,60 Z", "#ffffff", 5) + rect(-42, -20, 84, 30, "#7a4a2a"));
      s += bust("kaan", "suit", "smirk", { t: "translate(790 1050) scale(1.0)" }) + G("translate(930 1480)", pth("M -40,-60 L 40,-60 L 32,60 L -32,60 Z", "#ffffff", 5) + rect(-42, -20, 84, 30, "#7a4a2a"));
      return s;
    },
    cemHelmet(rand) {
      let s = rect(0, 0, 1080, 1920, "#1b2546") + speedLines(rand, 540, 1000, "#24345f", 50);
      s += G("translate(540 1100) scale(1.9)", torso("courier") + head("cem", "determined", { wet: true, light: "left" }) + pth("M -150,-30 C -170,-220 170,-220 150,-30 L 140,10 C 120,-120 -120,-120 -140,10 Z", "#1c1c22", 7) + pth("M -130,-110 C -60,-190 60,-190 130,-110 L 120,-150 C 60,-210 -60,-210 -120,-150 Z", "#2c3a66", 5));
      return s;
    },
    backDoor(rand) {
      const lg = nid("lg");
      let s = rect(0, 0, 1080, 1920, "#141a2e") + `<defs>${rad(lg, [[0, "#ffe2a0", 0.9], [1, "#ffe2a0", 0]])}</defs>`;
      for (let y = 0; y < 1400; y += 70) for (let x = (y / 70) % 2 ? -50 : 0; x < 1080; x += 140) s += rect(x, y, 136, 66, "#2a3150", 3);
      s += rect(380, 500, 320, 900, "#3a3f4c", 7) + rect(400, 520, 280, 860, "#252a36", 4) + `<text x="540" y="470" text-anchor="middle" font-family="Bangers" font-size="44" fill="#ffd84a">SERVİS ÇIKIŞI</text>`;
      s += `<ellipse cx="540" cy="420" rx="420" ry="420" fill="url(#${lg})"/>` + rect(0, 1400, 1080, 520, "#0f1426") + `<ellipse cx="540" cy="1520" rx="300" ry="40" fill="#ffd27a" opacity="0.25"/>`;
      s += bust("cem", "courier", "neutral", { t: "translate(280 1180) scale(0.9)", light: "left" }) + bust("ece", "coat", "smile", { t: "translate(800 1210) scale(0.85)" });
      return s;
    },
    rainWait(rand) {
      let s = rect(0, 0, 1080, 1920, "#1b2546") + rect(0, 0, 1080, 1300, "#2a3a5c") + dots(0, 0, 1080, 1300, 0.15);
      s += rect(560, 200, 480, 1100, "#9fb7d1", 8) + rect(580, 220, 440, 1060, "#c8dcef") + `<text x="300" y="300" text-anchor="middle" font-family="Bangers" font-size="70" fill="#ffd84a" stroke="${INK}" stroke-width="3">MAL KABUL</text>`;
      s += bust("guvenlik", "guard", "angry", { t: "translate(800 760) scale(0.75)" }) + rect(560, 200, 480, 1100, "#ffffff", 0, 'opacity="0.18"');
      s += bust("cem", "courier", "sneer", { t: "translate(280 1300) scale(0.95)", wet: true, e: { lid: 0.4, mouth: "flat", bi: -12, bo: 6 } }) + rect(0, 1600, 1080, 320, "#101628");
      s += rainOver(1);
      return s;
    },
    papers(rand) {
      let s = lobbyBg(rand);
      s += bust("staff1", "suit", "kind", { t: "translate(140 1000) scale(0.5)" }) + phone(250, 1060, -12, 0.8) + bust("staff2", "grey", "kind", { t: "translate(950 1010) scale(0.5)" }) + phone(830, 1070, 12, 0.8);
      s += bust("kaan", "suit", "smirk", { t: "translate(820 760) scale(0.38)" }) + phone(720, 800, 10, 0.6);
      s += bust("resepsiyon", "red", "angry", { t: "translate(540 980) scale(1.0)" });
      for (let i = 0; i < 14; i++) s += G(`translate(${120 + rand() * 840} ${1560 + rand() * 300}) rotate(${-40 + rand() * 80})`, rect(-60, -80, 120, 160, "#fbf8f0", 4) + rect(-40, -50, 80, 8, "#c9c2b0") + rect(-40, -30, 70, 8, "#c9c2b0"));
      return s;
    },
    coffee(rand) {
      let s = officeBg(rand) + speedLines(rand, 640, 1100, "#00000018", 40);
      s += standing("cem", "courier", "shocked", { t: "translate(690 760) scale(0.72)", wet: true });
      s += bust("kaan", "suit", "smirk", { t: "translate(230 1020) scale(0.72)", light: "left" });
      s += pth("M 380,1260 C 440,1230 480,1210 520,1190 L 540,1240 C 500,1260 460,1280 400,1310 Z", "#22314f", 6) + G("translate(560 1180) rotate(-60)", pth("M -40,-60 L 40,-60 L 32,60 L -32,60 Z", "#ffffff", 6) + rect(-42, -20, 84, 30, "#7a4a2a"));
      s += pth("M 590,1150 C 620,1100 660,1080 700,1100 C 680,1130 650,1160 610,1180 Z", "#6b3f1f", 4);
      s += pth("M 600,1170 C 650,1120 700,1110 740,1140 C 760,1180 720,1230 700,1300 C 690,1360 650,1380 640,1330 C 650,1280 620,1240 600,1170 Z", "#6b3f1f", 5);
      for (const [x, y, r] of [[760, 1120, 14], [790, 1170, 10], [740, 1080, 9], [680, 1400, 12], [720, 1440, 8], [610, 1420, 9]]) s += `<circle cx="${x}" cy="${y}" r="${r}" fill="#6b3f1f" stroke="${INK}" stroke-width="3"/>`;
      s += `<text x="860" y="1060" text-anchor="middle" font-family="Bangers" font-size="96" fill="#ffd84a" stroke="${INK}" stroke-width="6" paint-order="stroke" transform="rotate(10 860 1060)">ŞLAP!</text>`;
      return s;
    },
    boxes(rand) {
      let s = officeBg(rand) + bust("selin", "grey", "smirk", { t: "translate(300 1050) scale(0.95)", light: "left" }) + pth("M 450,1330 L 600,1300 L 600,1360 L 460,1400 Z", "#5d6474", 6) + G("translate(640 1330) scale(1.0) rotate(180)", hand("point", CH.selin.skin));
      for (let i = 0; i < 5; i++) s += G(`translate(${800 + (i % 2) * 40} ${1780 - i * 170}) scale(0.9)`, box());
      return s;
    },
    elevatorBlock(rand) {
      let s = lobbyBg(rand) + rect(260, 400, 560, 1100, "#c9a64a", 8) + rect(280, 420, 250, 1060, "#d9b85e", 4) + rect(550, 420, 250, 1060, "#d9b85e", 4) + `<text x="540" y="380" text-anchor="middle" font-family="Bangers" font-size="54" fill="${INK}">YÖNETİCİ ASANSÖRÜ</text>`;
      s += bust("guvenlik", "guard", "smirk", { t: "translate(560 1180) scale(1.0)" }) + pth("M 720,1400 L 1040,1360 L 1040,1440 L 730,1480 Z", "#1c1f2b", 7) + G("translate(1000 1400) scale(1.1) rotate(-90)", hand("open", CH.guvenlik.skin));
      return s;
    },
    stairs(rand) {
      let s = rect(0, 0, 1080, 1920, "#b7bcc4") + dots(0, 0, 1080, 1920, 0.1);
      for (let i = 0; i < 9; i++) s += pth(`M 0,${1920 - i * 120} L 1080,${1840 - i * 120} L 1080,${1880 - i * 120} L 0,${1960 - i * 120} Z`, i % 2 ? "#9aa0aa" : "#a6acb6", 4);
      s += rect(40, 260, 180, 140, "#ffd84a", 7) + `<text x="130" y="365" text-anchor="middle" font-family="Bangers" font-size="100" fill="${INK}">31</text>` + line("M 0,820 L 1080,700", 10, "#e8443a");
      s += bust("cem", "courier", "smile", { t: "translate(330 1150) scale(0.85)", wet: true, light: "left" }) + G("translate(330 1640) scale(0.95)", box());
      s += bust("ece", "blue", "O", { t: "translate(800 1100) scale(0.8)", e: { mouth: "talk", bi: -16, bo: -6 } }) + G("translate(700 1560) scale(0.75) rotate(-8)", box());
      return s;
    },
    rooftop(rand) {
      const sky = nid("sk");
      let s = `<defs>${lin(sky, [[0, "#3a4d88"], [0.5, "#f19a6b"], [1, "#ffd59a"]])}</defs>` + rect(0, 0, 1080, 1920, `url(#${sky})`);
      s += `<circle cx="780" cy="700" r="110" fill="#ffe7a6"/>` + city(rand, 640, 420, "#3a3352");
      for (const [x, y] of [[180, 520], [260, 470], [880, 560]]) s += line(`M ${x - 26},${y} q 13,-14 26,0 q 13,-14 26,0`, 5);
      // rooftop: water tank, AC units, antenna, railing
      s += G("translate(150 900)", rect(-80, -120, 160, 150, "#9aa0aa", 6, 'rx="20"') + line("M -60,30 L -70,120 M 60,30 L 70,120", 8));
      s += rect(840, 880, 180, 120, "#c9ced6", 6) + `<circle cx="930" cy="940" r="42" fill="#9aa0aa" stroke="${INK}" stroke-width="5"/>` + line("M 960,880 L 960,700 M 930,740 L 990,740 M 940,780 L 980,780", 6);
      s += rect(0, 1040, 1080, 880, "#6a6470") + dots(0, 1040, 1080, 880, 0.12) + line("M 0,1040 L 1080,1040", 10);
      for (let x = 20; x < 1080; x += 90) s += line(`M ${x},1040 L ${x},900`, 8, "#3a3540");
      s += line("M 0,900 L 1080,900", 10, "#3a3540") + line("M 0,960 L 1080,960", 6, "#3a3540");
      // sitting on the ledge, simit in hand (bitten), tea and a paper bag
      s += bust("cem", "courier", "smile", { t: "translate(320 1240) scale(0.85)", light: "left" });
      s += bust("ece", "blue", "kind", { t: "translate(770 1250) scale(0.8)" });
      s += simit(470, 1610, 0.85) + G("translate(480 1680) scale(0.95)", hand("open", CH.cem.skin));
      s += simit(630, 1630, 0.8) + G("translate(630 1700) scale(0.9)", hand("open", CH.ece.skin));
      s += G("translate(540 1820)", pth("M -90,-80 L 90,-80 L 80,70 L -80,70 Z", "#e8d4a8", 6) + `<text x="0" y="10" text-anchor="middle" font-family="Bangers" font-size="44" fill="#9b1c31">SİMİT</text>`);
      return s;
    },
    muratOffice(rand) {
      let s = officeBg(rand) + rect(560, 1200, 520, 260, "#5a3c2c", 7) + rect(620, 1140, 160, 70, "#1c1f28", 5);
      s += bust("cem", "courier", "determined", { t: "translate(290 1150) scale(0.9)", light: "left" }) + bust("murat", "brown", "O", { t: "translate(800 1100) scale(0.88)", e: { bi: -18, bo: -10, mouth: "talk" } });
      return s;
    },
    eavesdrop(rand) {
      const lg = nid("lg");
      let s = rect(0, 0, 1080, 1920, "#3a3540") + `<defs>${lin(lg, [[0, "#fff1c4"], [1, "#ffc46a"]], 1, 0)}</defs>`;
      s += rect(620, 0, 460, 1920, `url(#${lg})`) + pth("M 620,0 L 760,60 L 760,1860 L 620,1920 Z", "#5a3c2c", 7) + `<text x="900" y="300" text-anchor="middle" font-family="Bangers" font-size="44" fill="${INK}">MÜDÜR</text>`;
      s += bust("ece", "blue", "shocked", { t: "translate(360 1080) scale(1.2)", light: "right" });
      s += G("translate(360 1600)", rect(-200, -20, 400, 30, "#c9c2b0", 6) + teaGlass(-80, -40, 1.0) + teaGlass(80, -40, 1.0));
      return s;
    },
    suitEntrance(rand) {
      const lg = nid("lg");
      let s = lobbyBg(rand, { banner: true }) + `<defs>${rad(lg, [[0, "#ffffff", 0.95], [1, "#fff3d0", 0]])}</defs>` + `<ellipse cx="540" cy="900" rx="520" ry="700" fill="url(#${lg})"/>`;
      s += bust("cem", "navysuit", "smirk", { t: "translate(560 1050) scale(1.25)" }) + bust("murat", "brown", "smile", { t: "translate(910 1250) scale(0.7)" });
      s += bust("staff1", "suit", "shocked", { t: "translate(150 1450) scale(0.5)" });
      return s;
    },
    aylinFace(rand) {
      let s = lobbyBg(rand) + speedLines(rand, 760, 1000, "#e8c0c0", 40);
      s += bust("cem", "navysuit", "smirk", { t: "translate(270 1130) scale(1.0)", light: "left" }) + bust("resepsiyon", "red", "shocked", { t: "translate(800 1150) scale(0.95)" });
      return s;
    },
    boardroom2(rand) {
      let s = officeBg(rand, true) + rect(240, 330, 600, 360, "#0b0f1a", 8) + rect(256, 346, 568, 328, "#e6d7bd");
      const sc = nid("scr");
      s += `<clipPath id="${sc}"><rect x="256" y="346" width="568" height="328"/></clipPath><g clip-path="url(#${sc})">` + G("translate(540 560) scale(0.3)", lyingCem(0, 0, -78, 1) + helmet(380, 140, 0.8, 30)) + `</g><circle cx="300" cy="380" r="14" fill="#e8443a"/><text x="324" y="392" font-family="Bangers" font-size="30" fill="#e8443a">REC</text>`;
      s += pth("M -40,1300 L 1120,1300 L 1120,1940 L -40,1940 Z", "#4a3226", 8) + dots(0, 1300, 1080, 640, 0.18);
      s += bust("cem", "navysuit", "determined", { t: "translate(540 1120) scale(0.95)" });
      return s;
    },
    firing(rand) {
      let s = rect(0, 0, 1080, 1920, "#16121c");
      const cells = [["resepsiyon", "red", 30, 260], ["guvenlik", "guard", 550, 260], ["kaan", "suit", 30, 1090], ["selin", "grey", 550, 1090]];
      const colors = ["#ffe1e1", "#e1ecff", "#fff3c4", "#e8ffe1"];
      cells.forEach(([who, kind, x, y], i) => {
        const cid = nid("fc");
        s += `<clipPath id="${cid}"><rect x="${x}" y="${y}" width="500" height="800"/></clipPath><g clip-path="url(#${cid})">${rect(x, y, 500, 800, colors[i])}${speedLines(rand, x + 250, y + 380, "#00000022", 26)}${bust(who, kind, "shocked", { t: `translate(${x + 250} ${y + 450}) scale(0.95)` })}</g>` + rect(x, y, 500, 800, "none", 10);
      });
      return s;
    },
    eceEntrance(rand) {
      const lg = nid("lg");
      let s = rect(0, 0, 1080, 1920, "#2a1f1c") + `<defs>${rad(lg, [[0, "#fffbe8"], [0.6, "#ffe2a0"], [1, "#ffb35a"]])}</defs>`;
      s += rect(200, 260, 680, 1400, `url(#${lg})`, 10) + pth("M 200,260 L 40,180 L 40,1760 L 200,1660 Z", "#5a3c2c", 8) + pth("M 880,260 L 1040,180 L 1040,1760 L 880,1660 Z", "#5a3c2c", 8);
      s += bust("sec1", "sec", "neutral", { t: "translate(260 1340) scale(0.62)" }) + bust("sec2", "sec", "neutral", { t: "translate(830 1340) scale(0.62)" });
      s += bust("ece", "white", "smirk", { t: "translate(540 1080) scale(1.15)", noGlasses: true });
      return s;
    },
    cemSmile(rand) {
      let s = rect(0, 0, 1080, 1920, "#0d1430") + speedLines(rand, 540, 1000, "#1c2a55", 50);
      s += bust("cem", "navysuit", "smile", { t: "translate(540 1150) scale(1.5)", light: "left" });
      return s;
    },
    finalTwo(rand) {
      const sky = nid("sk");
      let s = `<defs>${lin(sky, [[0, "#22305e"], [0.6, "#d8806a"], [1, "#ffcf8a"]])}</defs>` + rect(0, 0, 1080, 1920, `url(#${sky})`) + city(rand, 560, 520, "#2a2846");
      for (let i = 0; i <= 3; i++) s += line(`M ${i * 360},0 L ${i * 360},1100`, 14, "#1a1626");
      s += rect(0, 1080, 1080, 840, "#3a2a24") + dots(0, 1080, 1080, 840, 0.15);
      s += bust("cem", "navysuit", "smile", { t: "translate(330 1180) scale(0.95)", light: "left" }) + bust("ece", "white", "kind", { t: "translate(770 1200) scale(0.9)", noGlasses: true });
      return s;
    },
    rival(rand) {
      let s = rect(0, 0, 1080, 1920, "#141a2e") + tower(rand, 200, 880, -200, 1400, 120) + rect(0, 1300, 1080, 620, "#0f1426") + rainOver(0.8);
      s += bust("resepsiyon", "red", "smirk", { t: "translate(300 1250) scale(0.85)", light: "left" }) + phone(450, 1230, 14, 0.85) + G("translate(370 1700) scale(0.9)", box());
      s += G("translate(800 1180) scale(0.9)", pth("M -150,-30 C -170,-260 170,-260 150,-30 L 250,600 L -250,600 Z", "#07080d", 6) + line("M -60,-120 L -20,-120 M 20,-120 L 60,-120", 6, "#e8443a"));
      return s;
    },
    titleEnd(rand) {
      let s = rect(0, 0, 1080, 1920, "#0d1430") + speedLines(rand, 540, 800, "#1f2d55", 60) + dots(0, 0, 1080, 1920, 0.12, true);
      s += rect(0, 1160, 1080, 760, "#ff7a1a") + dots(0, 1160, 1080, 760, 0.18) + line("M 0,1160 L 1080,1160", 10);
      s += bust("cem", "navysuit", "smirk", { t: "translate(330 1620) scale(0.95)", light: "left" }) + bust("ece", "white", "smirk", { t: "translate(760 1640) scale(0.9)", noGlasses: true });
      return s;
    },
    money(rand) {
      let s = rect(0, 0, 1080, 1920, "#a9bccd") + speedLines(rand, 540, 1100, "#ffffff40", 40);
      s += bust("hasan", "green", "O", { t: "translate(780 760) scale(0.75)", e: { round: true, bi: -24, bo: -18, mouth: "O" } });
      s += pth("M -40,1280 C 120,1250 260,1240 380,1250 L 380,1360 C 260,1360 120,1380 -40,1400 Z", "#2f4f46", 7);
      const note = (x, y, r, col, val) => G(`translate(${x} ${y}) rotate(${r})`, rect(-150, -70, 300, 140, col, 6, 'rx="8"') + `<circle cx="-80" cy="0" r="38" fill="#ffffff" opacity="0.5"/>` + `<text x="60" y="22" text-anchor="middle" font-family="Bangers" font-size="62" fill="${INK}">${val} ₺</text>`);
      s += note(520, 1250, -18, "#c7a4d6", 200) + note(560, 1220, -6, "#9bc7e8", 200) + note(600, 1200, 8, "#c7a4d6", 200);
      s += G("translate(420 1320) scale(1.6)", hand("open", CH.cem.skin));
      s += pth("M 1120,1180 C 980,1190 860,1200 780,1220 L 790,1320 C 880,1300 1000,1290 1120,1290 Z", "#2e9d55", 7) + G("translate(760 1260) scale(1.5) rotate(-90)", hand("open", CH.hasan.skin));
      return s;
    },
    taxi(rand) {
      let s = rect(0, 0, 1080, 1920, "#141a2e") + city(rand, 260, 620, "#24345f") + rainOver(0.6);
      for (let i = 0; i < 6; i++) s += line(`M ${80 + i * 170},${330 + (i % 3) * 120} l -120,0`, 5, "#ffd27a", 'opacity="0.5"');
      // car body: roof, pillars, door frame
      s += pth("M -20,-20 L 1100,-20 L 1100,170 L -20,170 Z", "#1c1c22", 0) + pth("M 0,170 C 300,150 780,150 1080,170 L 1080,230 C 780,210 300,210 0,230 Z", "#2a2a33", 6);
      s += pth("M -20,170 L 90,170 L 40,980 L -20,980 Z", "#1c1c22", 6) + pth("M 1100,170 L 990,170 L 1040,980 L 1100,980 Z", "#1c1c22", 6);
      s += rect(440, 200, 200, 60, "#2a2a33", 5, 'rx="12"') + line("M 540,260 L 540,320", 4) + pth("M 520,320 L 560,320 L 548,380 L 532,380 Z", "#2e9d55", 3);
      // dashboard, steering wheel, driver silhouette, taximeter
      s += pth("M -20,980 C 300,940 780,940 1100,980 L 1100,1920 L -20,1920 Z", "#26262e", 7) + dots(0, 980, 1080, 940, 0.18);
      s += G("translate(860 1000)", `<circle cx="0" cy="40" r="150" fill="none" stroke="${INK}" stroke-width="26"/><circle cx="0" cy="40" r="150" fill="none" stroke="#3a3a44" stroke-width="16"/>` + line("M -140,40 L 140,40 M 0,40 L 0,180", 16, "#3a3a44"));
      s += G("translate(960 760)", `<circle cx="0" cy="0" r="80" fill="#0d0c10"/>` + pth("M -110,80 L -150,300 L 150,300 L 110,80 Z", "#0d0c10", 4));
      s += G("translate(470 1000)", rect(-90, -46, 180, 92, "#0d0c10", 6, 'rx="10"') + `<text x="0" y="16" text-anchor="middle" font-family="Bangers" font-size="44" fill="#ff5a3a">₺ 186</text>`);
      s += bust("cem", "sweater", "neutral", { t: "translate(330 1330) scale(0.95)", light: "left", e: { lid: 0.35, look: [-14, -2] } });
      s += G("translate(540 120)", rect(-120, -50, 240, 90, "#ffd84a", 6, 'rx="12"') + `<text x="0" y="22" text-anchor="middle" font-family="Bangers" font-size="62" fill="${INK}">TAKSİ</text>`);
      return s;
    },
    gossip(rand) {
      let s = officeBg(rand) + rect(40, 1250, 1000, 60, "#e8e2d6", 6) + rect(150, 1110, 220, 140, "#1c1f28", 5) + rect(710, 1110, 220, 140, "#1c1f28", 5);
      s += bust("kaan", "suit", "smirk", { t: "translate(300 1000) scale(0.85)", light: "left" }) + bust("selin", "grey", "talk", { t: "translate(780 1020) scale(0.8)" });
      return s;
    },
    copier(rand) {
      let s = officeBg(rand) + rect(640, 1050, 380, 560, "#d8dbe2", 7) + rect(680, 1090, 300, 60, "#9aa0aa", 4) + rect(700, 1300, 260, 20, "#7a808a");
      s += bust("resepsiyon", "red", "sneer", { t: "translate(300 1000) scale(0.95)", light: "left" }) + pth("M 440,1320 L 600,1300 L 600,1360 L 450,1390 Z", "#8e1f35", 6) + G("translate(640 1330) rotate(180)", hand("point", CH.resepsiyon.skin));
      s += bust("ece", "blue", "neutral", { t: "translate(820 1130) scale(0.7)", e: { lid: 0.35, look: [-10, 2] } });
      return s;
    },
    mop(rand) {
      let s = lobbyBg(rand) + bust("guvenlik", "guard", "smirk", { t: "translate(780 960) scale(0.85)" });
      s += bust("cem", "courier", "determined", { t: "translate(330 1230) scale(0.85)", wet: true, light: "left" }) + line("M 520,1250 L 640,1880", 14, "#8a6a4a") + `<ellipse cx="650" cy="1880" rx="90" ry="26" fill="#9ac0e0" stroke="${INK}" stroke-width="5"/>`;
      for (let i = 0; i < 4; i++) s += `<ellipse cx="${180 + i * 150}" cy="${1700 + (i % 2) * 60}" rx="40" ry="20" fill="#6a5a44" opacity="0.6"/>`;
      s += phoneHand(140, 1100, -12, 0.8, CH.selin.skin);
      return s;
    },
    conspire(rand) {
      let s = officeBg(rand, true) + rect(0, 0, 1080, 1920, "#000", 0, 'opacity="0.25"');
      s += bust("resepsiyon", "red", "smirk", { t: "translate(330 1080) scale(0.9)", light: "left" }) + bust("kaan", "suit", "sneer", { t: "translate(780 1060) scale(0.9)" });
      return s;
    },
    eceNight(rand) {
      let s = rect(0, 0, 1080, 1920, "#1a1530") + rect(560, 220, 460, 620, "#0d1430", 7) + city(rand, 520, 320, "#24345f") + rect(560, 220, 460, 620, "none", 7) + line("M 790,220 L 790,840", 6);
      s += `<circle cx="200" cy="420" r="120" fill="#ffd27a" opacity="0.35"/>` + rect(160, 420, 80, 300, "#c9a77a", 5);
      s += bust("ece", "white", "smirk", { t: "translate(500 1150) scale(1.0)", noGlasses: true, light: "left" }) + phone(330, 1130, -14, 0.95);
      return s;
    },
    hotelMirror(rand) {
      let s = rect(0, 0, 1080, 1920, "#e9dcc6") + dots(0, 0, 1080, 1920, 0.08) + rect(120, 200, 840, 1200, "#a9c2cf", 12) + rect(150, 230, 780, 1140, "#c6dbe5");
      s += bust("cem", "navysuit", "determined", { t: "translate(540 1030) scale(1.05)", light: "left" }) + line("M 200,300 L 380,260 M 220,360 L 320,340", 8, "#ffffff", 'opacity="0.6"');
      s += rect(0, 1400, 1080, 520, "#8a6a4a") + bust("murat", "brown", "smile", { t: "translate(920 1560) scale(0.55)" });
      return s;
    },
    hasanUniform(rand) {
      let s = lobbyBg(rand) + bust("hasan", "green", "kind", { t: "translate(330 1080) scale(0.95)", light: "left" }) + G("translate(330 1500)", rect(-70, -30, 140, 60, "#ffd84a", 4) + `<text x="0" y="12" text-anchor="middle" font-family="Bangers" font-size="30" fill="${INK}">ŞEF</text>`);
      s += bust("cem", "navysuit", "smile", { t: "translate(790 1100) scale(0.9)" });
      return s;
    },
  });
})();
