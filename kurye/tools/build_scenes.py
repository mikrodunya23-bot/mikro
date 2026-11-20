#!/usr/bin/env python3
"""Writes compositions/*.html for "Kapıdaki Kurye" from the scene table below.
Edit text, timing or positions here, then run:  python3 tools/build_scenes.py
Times inside a scene are local (seconds from the scene's start)."""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# camera: (prop dict from, prop dict to, ease)
PUSH = ({"scale": 1.0}, {"scale": 1.08}, "sine.inOut")

SCENES = [
    {
        "id": "gece", "start": 0.0, "dur": 10.2,
        "panels": [
            {"id": "p1", "art": "tower", "a": 0.0, "b": 2.2, "cam": ({"scale": 1.15, "y": 150}, {"scale": 1.15, "y": -30}, "sine.inOut")},
            {"id": "p2", "art": "visor", "a": 2.2, "b": 7.0, "cam": ({"scale": 1.0}, {"scale": 1.14}, "sine.inOut")},
            {"id": "p3", "art": "walk", "a": 7.0, "b": 10.2, "cam": ({"scale": 1.02, "y": 40}, {"scale": 1.12, "y": -30}, "sine.inOut")},
        ],
        "texts": [
            {"kind": "nar", "id": "n1", "a": 0.15, "b": 2.2, "x": 150, "y": 330, "text": "BU BİNAYI BEN KURDUM."},
            {"kind": "nar", "id": "n2a", "a": 2.35, "b": 4.45, "x": 150, "y": 320, "text": "KIRK İKİ KAT. ÜÇ BİN ÇALIŞAN."},
            {"kind": "nar", "id": "n2b", "a": 4.45, "b": 7.0, "x": 220, "y": 320, "text": "AMA HİÇBİRİ YÜZÜMÜ BİLMİYOR."},
            {"kind": "nar", "id": "n3", "a": 7.15, "b": 10.2, "x": 150, "y": 300, "w": 720, "text": "BU GECE, ONLARI GERÇEK HALLERİYLE GÖRECEĞİM."},
        ],
    },
    {
        "id": "lobi", "start": 10.2, "dur": 15.8,
        "panels": [
            {"id": "p4", "art": "reception", "a": 0.0, "b": 3.6, "cam": ({"scale": 1.08}, {"scale": 1.0}, "sine.out")},
            {"id": "p5", "art": "denizDesk", "a": 3.6, "b": 7.2, "cam": PUSH},
            {"id": "p6", "art": "footprints", "a": 7.2, "b": 11.4, "cam": ({"scale": 1.0, "rotation": 0}, {"scale": 1.1, "rotation": -2}, "sine.inOut")},
            {"id": "p7", "art": "guard", "a": 11.4, "b": 13.8, "cam": ({"scale": 1.0}, {"scale": 1.16}, "power2.out"), "shake": [11.6, 0.35, 14]},
            {"id": "p8", "art": "bam", "a": 13.8, "b": 15.8, "cam": ({"scale": 1.25}, {"scale": 1.0}, "expo.out"), "shake": [13.95, 0.5, 30]},
        ],
        "texts": [
            {"kind": "bl", "id": "b4", "a": 0.3, "b": 3.4, "x": 150, "y": 310, "w": 780, "tail": 470, "text": "KURYE GİRİŞİ ARKADA! BURASI YÖNETİCİLER İÇİN."},
            {"kind": "bl", "id": "b5", "a": 3.7, "b": 7.1, "x": 140, "y": 300, "w": 760, "tail": 400, "text": "PAKET KIRK İKİNCİ KATA. İMZA GEREKİYOR."},
            {"kind": "bl", "id": "b6", "a": 7.3, "b": 11.3, "x": 130, "y": 300, "w": 780, "tail": 430, "text": "ISLAK AYAKKABILARINLA MERMERİ KİRLETİYORSUN. ÇIK DIŞARI!"},
            {"kind": "shout", "id": "b7", "a": 11.6, "b": 13.7, "x": 170, "y": 300, "w": 700, "tail": 380, "text": "DUYMADIN MI? DIŞARI!"},
        ],
    },
    {
        "id": "asansor", "start": 26.0, "dur": 16.4,
        "panels": [
            {"id": "p9", "art": "eceHelp", "a": 0.0, "b": 4.0, "cam": PUSH},
            {"id": "p10", "art": "elevatorWater", "a": 4.0, "b": 8.2, "cam": ({"scale": 1.0, "x": 20}, {"scale": 1.07, "x": -20}, "sine.inOut")},
            {"id": "p11", "art": "badge", "a": 8.2, "b": 11.0, "cam": ({"scale": 0.94}, {"scale": 1.08}, "sine.inOut")},
            {"id": "p12", "art": "elevatorTwo", "a": 11.0, "b": 16.4, "cam": ({"scale": 1.0}, {"scale": 1.06}, "sine.inOut"),
             "floor": [("41", 11.0, 15.4), ("42", 15.4, 16.4)]},
        ],
        "texts": [
            {"kind": "bl", "id": "b8", "a": 0.4, "b": 3.6, "x": 140, "y": 300, "w": 780, "tail": 360, "text": "DUR, BEN YARDIM EDERİM. SIRILSIKLAM OLMUŞSUN."},
            {"kind": "bl", "id": "b9", "a": 4.3, "b": 8.1, "x": 130, "y": 290, "w": 780, "tail": 430, "text": "AL, BİRAZ SU İÇ. BEN DE İLK GÜNÜMDE BÖYLE KARŞILANMIŞTIM."},
            {"kind": "nar", "id": "n10", "a": 8.4, "b": 11.0, "x": 160, "y": 300, "text": "KARTINDA, STAJYER YAZIYORDU."},
            {"kind": "bl", "id": "b11", "a": 11.3, "b": 12.3, "x": 150, "y": 560, "w": 360, "tail": 120, "text": "ADIN NE?"},
            {"kind": "bl", "id": "b12", "a": 12.4, "b": 13.9, "x": 470, "y": 600, "w": 410, "tail": 300, "text": "ECE. SENİNKİ?"},
            {"kind": "bl", "id": "b13", "a": 14.1, "b": 15.7, "x": 130, "y": 560, "w": 560, "tail": 150, "text": "YAKINDA ÖĞRENİRSİN."},
        ],
    },
    {
        "id": "toplanti", "start": 42.4, "dur": 10.8,
        "panels": [
            {"id": "p13", "art": "boardroom", "a": 0.0, "b": 3.8, "cam": ({"scale": 1.0, "x": -20}, {"scale": 1.05, "x": 20}, "sine.inOut")},
            {"id": "p14", "art": "door", "a": 3.8, "b": 7.6, "cam": ({"scale": 1.0}, {"scale": 1.14}, "power1.inOut"), "flash": 3.8},
            {"id": "p15", "art": "shock", "a": 7.6, "b": 10.8, "cam": ({"scale": 1.12}, {"scale": 1.0}, "expo.out"), "shake": [7.7, 0.3, 10]},
        ],
        "texts": [
            {"kind": "bl", "id": "b14", "a": 0.4, "b": 3.3, "x": 330, "y": 640, "w": 560, "tail": 400, "text": "BEYLER, YENİ CEO'MUZ GELDİ."},
            {"kind": "bl", "id": "b15", "a": 7.8, "b": 10.6, "x": 150, "y": 300, "w": 760, "tail": 390, "text": "OLAMAZ... KURYE, PATRON MUYMUŞ?!"},
        ],
    },
    {
        "id": "final", "start": 53.2, "dur": 7.8,
        "panels": [
            {"id": "p16", "art": "eyes", "a": 0.0, "b": 3.4, "cam": ({"scale": 1.0}, {"scale": 1.1}, "sine.inOut")},
            {"id": "p17", "art": "title", "a": 3.4, "b": 7.8, "cam": ({"scale": 1.04}, {"scale": 1.0}, "sine.out")},
        ],
        "texts": [
            {"kind": "nar", "id": "n16", "a": 0.3, "b": 3.4, "x": 180, "y": 300, "text": "ŞİMDİ, ASIL OYUN BAŞLIYOR."},
        ],
        "title": True,
    },
]

CSS = """
    @font-face { font-family: "Bangers"; src: url("assets/fonts/bangers-latin.woff2") format("woff2"); }
    @font-face { font-family: "Bangers"; src: url("assets/fonts/bangers-latin-ext.woff2") format("woff2"); unicode-range: U+0100-024F; }
    #root { position: absolute; inset: 0; overflow: hidden; background: #0d1430; font-family: "Bangers", sans-serif; }
    .panel { position: absolute; inset: 0; overflow: hidden; }
    .cam { position: absolute; inset: 0; transform-origin: 50% 50%; }
    .cam svg { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    .txt { position: absolute; z-index: 10; }
    .nar-in { background: #ffd84a; color: #16121c; border: 6px solid #16121c; box-shadow: 10px 10px 0 #16121c;
              padding: 18px 30px 14px; font-size: 56px; line-height: 1.05; letter-spacing: 2px; transform-origin: 0% 0%; }
    .bl-in { position: relative; background: #ffffff; color: #16121c; border: 7px solid #16121c; border-radius: 70px;
             padding: 26px 44px 22px; font-size: 62px; line-height: 1.04; letter-spacing: 2px; text-align: center;
             transform-origin: var(--tx) 120%; }
    .bl-in::before { content: ""; position: absolute; left: calc(var(--tx) - 30px); bottom: -62px; border-left: 30px solid transparent;
             border-right: 30px solid transparent; border-top: 62px solid #16121c; }
    .bl-in::after { content: ""; position: absolute; left: calc(var(--tx) - 20px); bottom: -46px; border-left: 20px solid transparent;
             border-right: 20px solid transparent; border-top: 48px solid #ffffff; }
    .shout .bl-in { background: #ffe14a; border-radius: 18px; font-size: 84px; transform: rotate(-3deg); }
    .shout .bl-in::after { border-top-color: #ffe14a; }
    .flash { position: absolute; inset: 0; background: #fffbe8; z-index: 20; }
    .floor { position: absolute; left: 380px; top: 170px; width: 320px; height: 150px; display: flex; align-items: center;
             justify-content: center; color: #ff8a2a; font-size: 120px; letter-spacing: 8px; }
    #final-title { position: absolute; left: 120px; top: 330px; width: 660px; text-align: center; z-index: 12; }
    .tw { display: inline-block; color: #ff7a1a; font-size: 200px; line-height: 0.92; -webkit-text-stroke: 12px #16121c; paint-order: stroke fill;
          text-shadow: 14px 14px 0 #16121c; letter-spacing: 6px; }
    #final-k2 { color: #ffd84a; font-size: 240px; }
    #final-ep { display: inline-block; margin-top: 30px; background: #16121c; color: #ffd84a; font-size: 64px; padding: 10px 30px; letter-spacing: 6px; }
    #final-next { position: absolute; left: 120px; top: 1010px; width: 768px; text-align: center; z-index: 12; }
    #final-next-in { display: inline-block; background: #ffd84a; color: #16121c; border: 6px solid #16121c; box-shadow: 10px 10px 0 #16121c;
          font-size: 60px; padding: 14px 34px 10px; letter-spacing: 3px; transform: rotate(-2deg); }
"""


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;")


def build(sc):
    sid = sc["id"]
    html, js = [], []
    for i, p in enumerate(sc["panels"]):
        pid = f"{sid}-{p['id']}"
        extra = ""
        if "floor" in p:
            for k, (num, a, b) in enumerate(p["floor"]):
                extra += f'\n        <div id="{pid}-floor{k}" class="floor clip" data-start="{a}" data-duration="{round(b - a, 3)}" data-layout-ignore>{num}</div>'
        html.append(f'''    <div id="{pid}" class="panel clip" data-start="{p['a']}" data-duration="{round(p['b'] - p['a'], 3)}" data-track-index="0">
      <div id="{pid}-cam" class="cam"><svg data-art="{p['art']}" data-layout-ignore></svg>{extra}</div>
    </div>''')
        f, t, ease = p["cam"]
        js.append(f'tl.fromTo("#{pid}-cam", {json.dumps(f)}, {json.dumps(dict(t, duration=round(p["b"] - p["a"], 3), ease=ease))}, {p["a"]});')
        if "shake" in p:
            at, d, amp = p["shake"]
            n = 8
            js.append(f'tl.fromTo("#{pid}", {{x: 0, y: 0}}, {{keyframes: {json.dumps([{"x": round(amp * ((-1) ** k) * (1 - k / n), 1), "y": round(amp * 0.6 * ((-1) ** (k + 1)) * (1 - k / n), 1)} for k in range(n)] + [{"x": 0, "y": 0}])}, duration: {d}, ease: "none"}}, {at});')
        if "flash" in p:
            html.append(f'    <div id="{pid}-flash" class="flash clip" data-start="{p["flash"]}" data-duration="0.6" data-track-index="2" data-layout-ignore><div id="{pid}-flash-in" style="position:absolute;inset:0;background:#fffbe8"></div></div>')
            js.append(f'tl.fromTo("#{pid}-flash-in", {{opacity: 1}}, {{opacity: 0, duration: 0.55, ease: "power2.out"}}, {p["flash"]});')
    for t in sc["texts"]:
        tid = f"{sid}-{t['id']}"
        w = f"width:{t['w']}px;" if "w" in t else ""
        if t["kind"] == "nar":
            html.append(f'    <div id="{tid}" class="txt clip" data-start="{t["a"]}" data-duration="{round(t["b"] - t["a"], 3)}" data-track-index="1" style="left:{t["x"]}px;top:{t["y"]}px;{w}"><div id="{tid}-in" class="nar-in">{esc(t["text"])}</div></div>')
            js.append(f'tl.fromTo("#{tid}-in", {{scaleX: 0}}, {{scaleX: 1, duration: 0.2, ease: "power3.out"}}, {t["a"]});')
        else:
            cls = "txt clip shout" if t["kind"] == "shout" else "txt clip"
            html.append(f'    <div id="{tid}" class="{cls}" data-start="{t["a"]}" data-duration="{round(t["b"] - t["a"], 3)}" data-track-index="1" style="left:{t["x"]}px;top:{t["y"]}px;{w}"><div id="{tid}-in" class="bl-in" style="--tx:{t["tail"]}px">{esc(t["text"])}</div></div>')
            rot = -3 if t["kind"] == "shout" else 0
            js.append(f'tl.fromTo("#{tid}-in", {{scale: 0, rotation: {rot - 6}}}, {{scale: 1, rotation: {rot}, duration: 0.24, ease: "back.out(2)"}}, {t["a"]});')
            js.append(f'tl.to("#{tid}-in", {{scale: 0.9, opacity: 0, duration: 0.12, ease: "power2.in"}}, {round(t["b"] - 0.12, 3)});')
    if sc.get("title"):
        html.append('''    <div id="final-title" class="clip" data-start="3.45" data-duration="4.35" data-track-index="1">
      <span id="final-k1" class="tw">KAPIDAKİ</span><br /><span id="final-k2" class="tw">KURYE</span><br /><span id="final-ep">BÖLÜM 1</span>
    </div>
    <div id="final-next" class="clip" data-start="5.0" data-duration="2.8" data-track-index="2"><span id="final-next-in">DEVAMI BÖLÜM 2'DE...</span></div>''')
        js += [
            'tl.fromTo("#final-k1", {scale: 3, opacity: 0, rotation: -10}, {scale: 1, opacity: 1, rotation: -3, duration: 0.3, ease: "power4.in"}, 3.45);',
            'tl.fromTo("#final-k2", {scale: 3, opacity: 0, rotation: 8}, {scale: 1, opacity: 1, rotation: 2, duration: 0.3, ease: "power4.in"}, 3.7);',
            'tl.fromTo("#final-ep", {scaleX: 0}, {scaleX: 1, duration: 0.22, ease: "power3.out"}, 4.2);',
            'tl.fromTo("#final-next-in", {y: 60, opacity: 0}, {y: 0, opacity: 1, duration: 0.3, ease: "back.out(2)"}, 5.0);',
        ]
    body = "\n".join(html)
    script = "\n      ".join(js)
    return f'''<template>
  <style>{CSS}  </style>
  <div id="root" data-composition-id="{sid}" data-width="1080" data-height="1920">
{body}
  </div>
  <script>
    (function () {{
      Comic.drawAll(document.querySelector('[data-composition-id="{sid}"]'));
      const tl = gsap.timeline({{ paused: true }});
      {script}
      tl.set({{}}, {{}}, {sc["dur"]});
      window.__timelines["{sid}"] = tl;
    }})();
  </script>
</template>
'''


for sc in SCENES:
    with open(os.path.join(ROOT, "compositions", sc["id"] + ".html"), "w") as fh:
        fh.write(build(sc))
print("scenes:", ", ".join(f'{s["id"]}@{s["start"]}+{s["dur"]}' for s in SCENES), "end", SCENES[-1]["start"] + SCENES[-1]["dur"])
