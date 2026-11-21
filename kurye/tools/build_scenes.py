#!/usr/bin/env python3
"""Writes compositions/*.html for "Kapıdaki Kurye" from the scene table below.
Edit text, timing or positions here, then run:  python3 tools/build_scenes.py
Times inside a scene are local (seconds from the scene's start)."""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# camera: (prop dict from, prop dict to, ease)
PUSH = ({"scale": 1.0}, {"scale": 1.08}, "sine.inOut")

# ---------------------------------------------------------------------------
# Layout: every panel lasts lead + its voice lines (+ gaps) + tail, so timing
# follows the real voice durations in tools/durations.tsv.
# text kinds: nar (yellow narration box), bl (speech balloon), shout.
DUR = {}
with open(os.path.join(ROOT, "tools", "durations.tsv")) as fh:
    for ln in fh:
        k, *rest = ln.split()
        DUR[k] = float(rest[-1])

PUSH = ({"scale": 1.0}, {"scale": 1.08}, "sine.inOut")
LAYOUT = [
    ("gece", [
        dict(id="p1", art="tower", lead=0.3, tail=0.25, cam=({"scale": 1.15, "y": 150}, {"scale": 1.15, "y": -30}, "sine.inOut"),
             lines=[("v01", dict(kind="nar", x=150, y=330, text="BU BİNAYI BEN KURDUM."))]),
        dict(id="p2", art="visor", lead=0.15, tail=0.3, cam=({"scale": 1.0}, {"scale": 1.14}, "sine.inOut"),
             lines=[("v02", dict(kind="nar", x=150, y=320, text="KIRK İKİ KAT. ÜÇ BİN ÇALIŞAN.", split=3.6,
                                 text2="AMA HİÇBİRİ YÜZÜMÜ BİLMİYOR.", x2=220))]),
        dict(id="p3", art="walk", lead=0.15, tail=0.4, cam=({"scale": 1.02, "y": 40}, {"scale": 1.12, "y": -30}, "sine.inOut"),
             lines=[("v03", dict(kind="nar", x=150, y=300, w=720, text="BU GECE, ONLARI GERÇEK HALLERİYLE GÖRECEĞİM."))]),
    ]),
    ("lobi", [
        dict(id="p4", art="reception", lead=0.3, tail=0.25, cam=({"scale": 1.08}, {"scale": 1.0}, "sine.out"),
             lines=[("v04", dict(kind="bl", x=150, y=310, w=780, tail=470, text="KURYE GİRİŞİ ARKADA! BURASI YÖNETİCİLER İÇİN."))]),
        dict(id="p5", art="denizDesk", lead=0.1, tail=0.3, cam=PUSH,
             lines=[("v05", dict(kind="bl", x=140, y=300, w=760, tail=400, text="PAKET KIRK İKİNCİ KATA. İMZA GEREKİYOR."))]),
        dict(id="p6", art="footprints", lead=0.1, tail=0.25, cam=({"scale": 1.0, "rotation": 0}, {"scale": 1.1, "rotation": -2}, "sine.inOut"),
             lines=[("v06", dict(kind="bl", x=130, y=300, w=780, tail=430, text="ISLAK AYAKKABILARINLA MERMERİ KİRLETİYORSUN. ÇIK DIŞARI!"))]),
        dict(id="p7", art="guard", lead=0.2, tail=0.45, cam=({"scale": 1.0}, {"scale": 1.16}, "power2.out"), shake=(0.2, 0.35, 14),
             lines=[("v07", dict(kind="shout", x=170, y=300, w=700, tail=380, text="DUYMADIN MI? DIŞARI!"))]),
        dict(id="p8", art="bam", fixed=2.0, cam=({"scale": 1.25}, {"scale": 1.0}, "expo.out"), shake=(0.15, 0.5, 30), lines=[]),
    ]),
    ("asansor", [
        dict(id="p9", art="eceHelp", lead=0.4, tail=0.35, cam=PUSH,
             lines=[("v08", dict(kind="bl", x=140, y=300, w=780, tail=360, text="DUR, BEN YARDIM EDERİM. SIRILSIKLAM OLMUŞSUN."))]),
        dict(id="p10", art="elevatorWater", lead=0.25, tail=0.2, cam=({"scale": 1.0, "x": 20}, {"scale": 1.07, "x": -20}, "sine.inOut"),
             lines=[("v09", dict(kind="bl", x=130, y=290, w=780, tail=430, text="AL, BİRAZ SU İÇ. BEN DE İLK GÜNÜMDE BÖYLE KARŞILANMIŞTIM."))]),
        dict(id="p11", art="badge", lead=0.2, tail=0.45, cam=({"scale": 0.94}, {"scale": 1.08}, "sine.inOut"),
             lines=[("v10", dict(kind="nar", x=160, y=300, text="KARTINDA, STAJYER YAZIYORDU."))]),
        dict(id="p12", art="elevatorTwo", lead=0.3, gap=0.3, tail=1.0, cam=({"scale": 1.0}, {"scale": 1.06}, "sine.inOut"), floor=True,
             lines=[("v11", dict(kind="bl", x=150, y=560, w=360, tail=120, text="ADIN NE?")),
                    ("v12", dict(kind="bl", x=470, y=600, w=410, tail=300, text="ECE. SENİNKİ?")),
                    ("v13", dict(kind="bl", x=130, y=560, w=560, tail=150, text="YAKINDA ÖĞRENİRSİN."))]),
    ]),
    ("toplanti", [
        dict(id="p13", art="boardroom", lead=0.4, tail=0.5, cam=({"scale": 1.0, "x": -20}, {"scale": 1.05, "x": 20}, "sine.inOut"),
             lines=[("v14", dict(kind="bl", x=330, y=640, w=560, tail=400, text="BEYLER, YENİ CEO'MUZ GELDİ."))]),
        dict(id="p14", art="door", fixed=3.6, cam=({"scale": 1.0}, {"scale": 1.14}, "power1.inOut"), flash=0.0, lines=[]),
        dict(id="p15", art="shock", lead=0.2, tail=0.45, cam=({"scale": 1.12}, {"scale": 1.0}, "expo.out"), shake=(0.1, 0.3, 10),
             lines=[("v15", dict(kind="bl", x=150, y=300, w=760, tail=390, text="OLAMAZ... KURYE, PATRON MUYMUŞ?!"))]),
    ]),
    ("final", [
        dict(id="p16", art="eyes", lead=0.3, tail=0.35, cam=({"scale": 1.0}, {"scale": 1.1}, "sine.inOut"),
             lines=[("v16", dict(kind="nar", x=180, y=300, text="ŞİMDİ, ASIL OYUN BAŞLIYOR."))]),
        dict(id="p17", art="title", fixed=5.2, cam=({"scale": 1.04}, {"scale": 1.0}, "sine.out"), lines=[], title=True),
    ]),
]

SCENES, VO, MARK = [], [], {}
t_abs = 0.0
for sid, panels in LAYOUT:
    sc = {"id": sid, "start": round(t_abs, 3), "panels": [], "texts": []}
    t = 0.0  # scene-local
    for p in panels:
        a = t
        pp = {"id": p["id"], "art": p["art"], "a": round(a, 3), "cam": p["cam"]}
        if p.get("fixed"):
            t += p["fixed"]
        else:
            t += p["lead"]
            for i, (vid, tx) in enumerate(p["lines"]):
                if i:
                    t += p.get("gap", 0.3)
                d = DUR[vid]
                VO.append((vid, round(sc["start"] + t, 3), d))
                if tx.get("split"):
                    sp = tx["split"]
                    sc["texts"].append(dict(tx, id="n" + vid[1:] + "a", a=round(t, 3), b=round(t + sp, 3)))
                    sc["texts"].append(dict(tx, id="n" + vid[1:] + "b", a=round(t + sp, 3), b=round(t + d + p["tail"] * 0.8, 3), text=tx["text2"], x=tx.get("x2", tx["x"])))
                else:
                    last = i == len(p["lines"]) - 1
                    end = t + d + (p["tail"] * 0.8 if last else 0.2)
                    sc["texts"].append(dict(tx, id=("n" if tx["kind"] == "nar" else "b") + vid[1:], a=round(t, 3), b=round(end, 3)))
                t += d
            t += p["tail"]
        pp["b"] = round(t, 3)
        if "shake" in p:
            pp["shake"] = [round(a + p["shake"][0], 3), p["shake"][1], p["shake"][2]]
        if "flash" in p:
            pp["flash"] = round(a + p["flash"], 3)
        if p.get("floor"):
            pp["floor"] = [("41", round(a, 3), round(t - 1.0, 3)), ("42", round(t - 1.0, 3), round(t, 3))]
        if p.get("title"):
            sc["title_at"] = round(a, 3)
        MARK[p["id"]] = (round(sc["start"] + a, 3), round(sc["start"] + t, 3))
        sc["panels"].append(pp)
    sc["dur"] = round(t, 3)
    t_abs += t
    SCENES.append(sc)
TOTAL = round(t_abs, 3)

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
    if "title_at" in sc:
        T = sc["title_at"]
        html.append(f'''    <div id="final-title" class="clip" data-start="{round(T + 0.05, 3)}" data-duration="{round(sc["dur"] - T - 0.05, 3)}" data-track-index="1">
      <span id="final-k1" class="tw">KAPIDAKİ</span><br /><span id="final-k2" class="tw">KURYE</span><br /><span id="final-ep">BÖLÜM 1</span>
    </div>
    <div id="final-next" class="clip" data-start="{round(T + 1.6, 3)}" data-duration="{round(sc["dur"] - T - 1.6, 3)}" data-track-index="2"><span id="final-next-in">DEVAMI BÖLÜM 2'DE...</span></div>''')
        js += [
            f'tl.fromTo("#final-k1", {{scale: 3, opacity: 0, rotation: -10}}, {{scale: 1, opacity: 1, rotation: -3, duration: 0.3, ease: "power4.in"}}, {round(T + 0.05, 3)});',
            f'tl.fromTo("#final-k2", {{scale: 3, opacity: 0, rotation: 8}}, {{scale: 1, opacity: 1, rotation: 2, duration: 0.3, ease: "power4.in"}}, {round(T + 0.3, 3)});',
            f'tl.fromTo("#final-ep", {{scaleX: 0}}, {{scaleX: 1, duration: 0.22, ease: "power3.out"}}, {round(T + 0.8, 3)});',
            f'tl.fromTo("#final-next-in", {{y: 60, opacity: 0}}, {{y: 0, opacity: 1, duration: 0.3, ease: "back.out(2)"}}, {round(T + 1.6, 3)});',
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


# ---------------------------------------------------------------------------
# index.html: scene hosts, voice clips and sound effects, all from the layout.
def sfx_dur(f):
    import subprocess
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", os.path.join(ROOT, f)]))

M = MARK
SFX = [  # id, file, abs start, volume, lane, extra attrs
    ("sfx-cut-walk", "assets/sfx/whoosh-short.mp3", M["p3"][0] - 0.08, 0.35, 3, ""),
    ("sfx-cut-lobby", "assets/sfx/whoosh.mp3", M["p4"][0] - 0.1, 0.3, 3, ""),
    ("sfx-grab", "assets/sfx/whoosh-short.mp3", M["p7"][0] + 0.05, 0.45, 3, ""),
    ("sfx-bam", "assets/sfx/impact-bass-1.mp3", M["p8"][0] + 0.15, 0.6, 3, ""),
    ("sfx-ding", "assets/sfx/ping.mp3", M["p12"][1] - 1.0, 0.35, 3, ""),
    ("sfx-riser", "assets/sfx/riser.mp3", M["p14"][0] - 1.6, 0.4, 3, 'data-media-start="1.9"', 1.6),
    ("sfx-door", "assets/sfx/impact-bass-2.mp3", M["p14"][0], 0.6, 4, ""),
    ("sfx-cut-shock", "assets/sfx/whoosh.mp3", M["p15"][0] - 0.05, 0.35, 3, ""),
    ("sfx-title", "assets/sfx/impact-bass-1.mp3", M["p17"][0] + 0.3, 0.6, 3, ""),
]
hosts = "\n".join(
    f'      <div id="{s["id"]}" data-composition-id="{s["id"]}" data-composition-src="compositions/{s["id"]}.html" data-start="{s["start"]}" data-duration="{s["dur"]}" data-track-index="0" data-track-kind="graphics" data-width="1080" data-height="1920"></div>'
    for s in SCENES)
vos = "\n".join(
    f'      <audio id="vo-{vid[1:]}" class="clip" src="assets/vo/{vid}.mp3" data-start="{st}" data-duration="{d - 0.02:.2f}" data-track-index="1" data-volume="1"></audio>'
    for vid, st, d in VO)
sfx = []
for row in SFX:
    sid, f, st, vol, lane, extra = row[:6]
    d = row[6] if len(row) > 6 else sfx_dur(f) - 0.02
    sfx.append(f'      <audio id="{sid}" class="clip" src="{f}" data-start="{round(st, 3)}" data-duration="{d:.2f}" {extra} data-track-index="{lane}" data-volume="{vol}"></audio>'.replace("  data", " data"))
INDEX = f'''<!doctype html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <script src="assets/comic.js"></script>
    <style>
      * {{ margin: 0; padding: 0; box-sizing: border-box; }}
      html, body {{ margin: 0; width: 1080px; height: 1920px; overflow: hidden; background: #0d1430; }}
      #root {{ width: 100%; height: 100%; position: relative; }}
    </style>
  </head>
  <body>
    <!-- Generated by tools/build_scenes.py: edit the layout there, not here. -->
    <div id="root" data-composition-id="main" data-start="0" data-duration="{TOTAL}" data-width="1080" data-height="1920">
{hosts}

      <!-- Voice: ElevenLabs eleven_v3 (Callum, Lily, Harry, Sarah, Matilda) -->
{vos}

      <!-- Sound effects -->
{chr(10).join(sfx)}
    </div>
    <script>
      window.__timelines = window.__timelines || {{}};
      window.__timelines["main"] = gsap.timeline({{ paused: true }});
    </script>
  </body>
</html>
'''
with open(os.path.join(ROOT, "index.html"), "w") as fh:
    fh.write(INDEX)
print("index.html written, total", TOTAL, "s")
