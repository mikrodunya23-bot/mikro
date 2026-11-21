#!/usr/bin/env python3
"""Builds the 15-minute episode from ep/episode.py + ep/lines.tsv + ep/durations.tsv.
Writes ep/compositions/*.html, ep/index.html and the ambience/music beds (ep/beds/*.mp3).
Usage (from kurye/):  python3 ep/build.py [--no-beds]"""
import csv, json, os, re, subprocess, sys

EP = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, EP)
from episode import EPISODE  # noqa: E402

LINES = {r["id"]: r for r in csv.DictReader(open(os.path.join(EP, "lines.tsv"), newline=""), delimiter="\t")}
DUR = {k: float(v) for k, v in (ln.split() for ln in open(os.path.join(EP, "durations.tsv")))}
NAMES = {"cem": "CEM", "deniz": "DENİZ BEY", "murat": "MURAT BEY", "aylin": "AYLİN", "ercument": "ERCÜMENT", "ece": "ECE",
         "kaan": "KAAN BEY", "selin": "SELİN HANIM", "hasan": "HASAN ABİ", "tarik": "TARIK KARACA"}
FOCUS = {"l": 90, "c": 0, "r": -90}  # with scale 1.18 the frame never shows its edge
TAIL = {"l": 150, "c": 380, "r": 610}
WHO2CH = {"cem": ["cem", "deniz"], "deniz": ["denizBey"], "murat": ["murat"], "aylin": ["resepsiyon"], "ercument": ["guvenlik"], "ece": ["ece"],
          "kaan": ["kaan"], "selin": ["selin"], "hasan": ["hasan"], "tarik": []}
GAP = 0.65
PACE = 1.35  # stretch for leads/tails: room for ambience and music between lines


def tr_upper(s):
    return s.replace("i", "İ").replace("ı", "I").upper()


def display(text):
    return tr_upper(re.sub(r"\[[^\]]*\]\s*", "", text).strip())


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


# ------------------------------------------------------------------ layout
SCENES, VO, SFX, SEGS = [], [], [], []
t_abs = 0.0
for sc in EPISODE:
    s = {"id": sc["id"], "start": round(t_abs, 3), "panels": [], "amb": sc.get("amb"), "mus": sc.get("mus")}
    t = 0.0
    for k, p in enumerate(sc["panels"]):
        a = t
        pp = dict(p, pid=f"{sc['id']}-p{k + 1}", a=round(a, 3), items=[])
        if p.get("fixed"):
            t += p["fixed"]
        else:
            t += max(p.get("lead", 0.8) * PACE, 3.0 if p.get("intro") else 0)
            prev_need = None
            for i, lid in enumerate(p["lines"]):
                if i:
                    t = max(t + GAP, prev_need)
                d = DUR[lid]
                words = len(display(LINES[lid]["text"]).split())
                prev_need = t + max(d + 0.3, 0.8 + 0.36 * (words + 1))
                pp["items"].append((lid, round(t, 3), d))
                VO.append((lid, round(s["start"] + t, 3), d))
                t += d
            t = max(t + p.get("tail", 0.8) * PACE, (prev_need or t) + 0.1)
        pp["b"] = round(t, 3)
        for name, off, vol in p.get("sfx", []):
            if isinstance(off, str):
                m = re.match(r"(end|line(\d+))([+-][\d.]+)?$", off)
                base = pp["b"] if m.group(1) == "end" else pp["items"][int(m.group(2)) - 1][1]
                off = base - a + float(m.group(3) or 0)
            SFX.append((name, round(s["start"] + a + off, 3), vol))
        s["panels"].append(pp)
    s["dur"] = round(t, 3)
    SEGS.append((s["start"], s["start"] + s["dur"], s["amb"], s["mus"]))
    t_abs += t
    SCENES.append(s)
TOTAL = round(t_abs, 3)

# ------------------------------------------------------------------ scene html
CSS = open(os.path.join(EP, "scene.css")).read()


def text_item(pid, n, lid, st, en, pos):
    r = LINES[lid]
    who, kind, txt = r["who"], r["kind"], display(r["text"])
    side = pos.get(who, "c")
    fs = 62 if len(txt) <= 30 else 54 if len(txt) <= 70 else 48 if len(txt) <= 110 else 44
    tid = f"{pid}-t{n}"
    attrs = f'id="{tid}" class="txt clip" data-start="{st}" data-duration="{round(en - st, 3)}" data-track-index="1"'
    if kind == "think" and who == "cem":
        inner = f'<div id="{tid}-in" class="nar-in" style="font-size:{fs - 4}px"><span class="tag">CEM · İÇ SES</span>{esc(txt)}</div>'
        js = f'tl.fromTo("#{tid}-in", {{scaleX: 0}}, {{scaleX: 1, duration: 0.2, ease: "power3.out"}}, {st});'
    else:
        cls = "th-in" if kind == "think" else "bl-in"
        tag = NAMES[who] + (" · İÇİNDEN" if kind == "think" else "")
        inner = f'<div id="{tid}-in" class="{cls}" style="--tx:{TAIL[side]}px;font-size:{fs}px"><span class="tag">{esc(tag)}</span>{esc(txt)}</div>'
        js = f'tl.fromTo("#{tid}-in", {{scale: 0}}, {{scale: 1, duration: 0.24, ease: "back.out(2)"}}, {st});'
    js += f'\n      tl.to("#{tid}-in", {{opacity: 0, duration: 0.12, ease: "power2.in"}}, {round(en - 0.12, 3)});'
    return f'    <div {attrs}>{inner}</div>', js


def build_scene(s):
    html, js = [], []
    for p in s["panels"]:
        pid, a, b = p["pid"], p["a"], p["b"]
        html.append(f'''    <div id="{pid}" class="panel clip" data-start="{a}" data-duration="{round(b - a, 3)}" data-track-index="0">
      <div id="{pid}-cam" class="cam"><svg data-art="{p['art']}" data-layout-ignore></svg></div>
    </div>''')
        pos = p.get("pos", {})
        speakers = {LINES[l]["who"] for l, _, _ in p["items"]}
        multi = len({pos.get(w, "c") for w in speakers if w in pos}) > 1
        if multi:
            first = pos.get(LINES[p["items"][0][0]]["who"], "c")
            js.append(f'tl.fromTo("#{pid}-cam", {{scale: 1.04, x: 0}}, {{scale: 1.18, x: {FOCUS[first]}, duration: 0.6, ease: "power2.inOut"}}, {a});')
            prev = first
            for lid, st, d in p["items"][1:]:
                side = pos.get(LINES[lid]["who"], prev)
                if side != prev:
                    js.append(f'tl.to("#{pid}-cam", {{x: {FOCUS[side]}, duration: 0.5, ease: "power2.inOut"}}, {round(st - 0.25, 3)});')
                    prev = side
        else:
            js.append(f'tl.fromTo("#{pid}-cam", {{scale: 1.0}}, {{scale: 1.09, duration: {round(b - a, 3)}, ease: "sine.inOut"}}, {a});')
        if "shake" in p:
            at = round(a + p["shake"] + (0.15 if p.get("lines") else 0), 3)
            kf = [{"x": round(16 * (-1) ** k * (1 - k / 8), 1), "y": round(10 * (-1) ** (k + 1) * (1 - k / 8), 1)} for k in range(8)] + [{"x": 0, "y": 0}]
            js.append(f'tl.fromTo("#{pid}", {{x: 0, y: 0}}, {{keyframes: {json.dumps(kf)}, duration: 0.45, ease: "none"}}, {at});')
        if "flash" in p:
            fa = round(a + p["flash"], 3)
            html.append(f'    <div id="{pid}-fl" class="clip" data-start="{fa}" data-duration="0.6" data-track-index="2" data-layout-ignore style="position:absolute;inset:0;z-index:20"><div id="{pid}-fl-in" style="position:absolute;inset:0;background:#fffbe8"></div></div>')
            js.append(f'tl.fromTo("#{pid}-fl-in", {{opacity: 1}}, {{opacity: 0, duration: 0.55, ease: "power2.out"}}, {fa});')
        if p.get("card"):
            html.append(f'    <div id="{pid}-card" class="card-t clip" data-start="{round(a + 0.2, 3)}" data-duration="{round(b - a - 0.3, 3)}" data-track-index="1"><span id="{pid}-card-in">{esc(p["card"])}</span></div>')
            js.append(f'tl.fromTo("#{pid}-card-in", {{scale: 2.4, opacity: 0}}, {{scale: 1, opacity: 1, duration: 0.35, ease: "power4.in"}}, {round(a + 0.2, 3)});')
        if p.get("title"):
            T = a
            html.append(f'''    <div id="{pid}-title" class="final-title clip" data-start="{round(T + 0.1, 3)}" data-duration="{round(b - T - 0.1, 3)}" data-track-index="1">
      <span id="{pid}-k1" class="tw">GİZEMLİ</span><br /><span id="{pid}-k2" class="tw tw2">KURYE</span><br /><span id="{pid}-ep" class="ep-tag">1. SEZON</span>
    </div>
    <div id="{pid}-next" class="final-next clip" data-start="{round(T + 1.6, 3)}" data-duration="{round(b - T - 1.6, 3)}" data-track-index="2"><span id="{pid}-next-in">DEVAMI BÖLÜM 2'DE...</span></div>''')
            js += [f'tl.fromTo("#{pid}-k1", {{scale: 3, opacity: 0, rotation: -10}}, {{scale: 1, opacity: 1, rotation: -3, duration: 0.3, ease: "power4.in"}}, {round(T + 0.1, 3)});',
                   f'tl.fromTo("#{pid}-k2", {{scale: 3, opacity: 0, rotation: 8}}, {{scale: 1, opacity: 1, rotation: 2, duration: 0.3, ease: "power4.in"}}, {round(T + 0.35, 3)});',
                   f'tl.fromTo("#{pid}-ep", {{scaleX: 0}}, {{scaleX: 1, duration: 0.22, ease: "power3.out"}}, {round(T + 0.9, 3)});',
                   f'tl.fromTo("#{pid}-next-in", {{y: 60, opacity: 0}}, {{y: 0, opacity: 1, duration: 0.3, ease: "back.out(2)"}}, {round(T + 1.6, 3)});']
        if p.get("intro"):
            end_i = round((p["items"][0][1] if p["items"] else b) - 0.15, 3)
            for k, (nm, role, side) in enumerate(p["intro"]):
                iid = f"{pid}-intro{k}"
                align = {"l": "left", "c": "center", "r": "right"}[side]
                top = 330 + k * 170
                html.append(f'    <div id="{iid}" class="intro clip" data-start="{round(a + 0.25, 3)}" data-duration="{round(end_i - a - 0.25, 3)}" data-track-index="2" style="top:{top}px;text-align:{align}"><div id="{iid}-in" class="intro-in"><b>{esc(nm)}</b><i>{esc(tr_upper(role))}</i></div></div>')
                js.append(f'tl.fromTo("#{iid}-in", {{x: {-80 if side != "r" else 80}, opacity: 0}}, {{x: 0, opacity: 1, duration: 0.3, ease: "power3.out"}}, {round(a + 0.25 + k * 0.2, 3)});')
        based = set()
        for lid, st, d in p["items"]:
            r = LINES[lid]
            if r["kind"] != "say":
                continue
            for key in WHO2CH.get(r["who"], []):
                sel = f'#{pid} .lip[data-who="{key}"]'
                n = max(1, int(d / 0.13))
                base = "" if sel in based else f"tl.set('{sel}', {{opacity: 0}}, {a}); "
                based.add(sel)
                js.append(f"if (document.querySelector('{sel}')) {{ {base}tl.to('{sel}', {{opacity: 1, duration: 0.13, ease: 'steps(1)', repeat: {n - 1}, yoyo: true}}, {st}); tl.set('{sel}', {{opacity: 0}}, {round(st + d, 3)}); }}")
        items = p["items"]
        for n, (lid, st, d) in enumerate(items):
            nxt = items[n + 1][1] if n + 1 < len(items) else b
            words = len(display(LINES[lid]["text"]).split())
            en = round(min(max(st + d + 0.35, st + 0.8 + 0.36 * (words + 1)), nxt - 0.05, b - 0.02), 3)
            h, j = text_item(pid, n + 1, lid, st, en, pos)
            html.append(h)
            js.append(j)
    body, script = "\n".join(html), "\n      ".join(js)
    return f'''<template>
  <style>{CSS}</style>
  <div id="root" data-composition-id="{s['id']}" data-width="1080" data-height="1920">
{body}
  </div>
  <script>
    (function () {{
      Comic.drawAll(document.querySelector('[data-composition-id="{s['id']}"]'));
      const tl = gsap.timeline({{ paused: true }});
      {script}
      tl.set({{}}, {{}}, {s['dur']});
      window.__timelines["{s['id']}"] = tl;
    }})();
  </script>
</template>
'''


import shutil  # noqa: E402
os.makedirs(os.path.join(EP, "assets", "fonts"), exist_ok=True)
for f in ("comic.js", "comic_ep.js", "fonts/bangers-latin.woff2", "fonts/bangers-latin-ext.woff2"):
    shutil.copyfile(os.path.join(EP, "..", "assets", f), os.path.join(EP, "assets", f))
for f in ("hyperframes.json", "meta.json"):
    if not os.path.exists(os.path.join(EP, f)):
        shutil.copyfile(os.path.join(EP, "..", f), os.path.join(EP, f))
os.makedirs(os.path.join(EP, "compositions"), exist_ok=True)
for s in SCENES:
    open(os.path.join(EP, "compositions", s["id"] + ".html"), "w").write(build_scene(s))


# ------------------------------------------------------------------ audio beds
def dur(f):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]))


def bed(kind, folder, fade, out):
    """Concatenate scene-range segments (merging neighbours with the same key) into one track."""
    segs = []
    for a, b, amb, mus in SEGS:
        key = amb if kind == "amb" else mus
        if segs and segs[-1][2] == key:
            segs[-1][1] = b
        else:
            segs.append([a, b, key])
    inputs, filt, labels = [], [], []
    for i, (a, b, key) in enumerate(s for s in segs if s[2]):
        src = os.path.join(EP, folder, key + ".mp3")
        if not os.path.exists(src):
            print("missing", src)
            continue
        n = len(labels)
        inputs += ["-stream_loop", "-1", "-i", src]
        L = (b - a) + fade
        st = max(0, a - fade / 2)
        filt.append(f"[{n}:a]atrim=0:{L:.3f},asetpts=PTS-STARTPTS,afade=t=in:d={fade},afade=t=out:st={L - fade:.3f}:d={fade},adelay={int(st * 1000)}|{int(st * 1000)}[s{n}]")
        labels.append(f"[s{n}]")
    if not labels:
        return False
    filt.append(f"{''.join(labels)}amix=inputs={len(labels)}:normalize=0,atrim=0:{TOTAL:.3f},apad=whole_dur={TOTAL:.3f}[out]")
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", *inputs, "-filter_complex", ";".join(filt), "-map", "[out]",
                    "-ar", "48000", "-ac", "2", "-b:a", "160k", out], check=True)
    return True


os.makedirs(os.path.join(EP, "beds"), exist_ok=True)
have_amb = have_mus = False
if "--no-beds" not in sys.argv:
    have_amb = bed("amb", "amb", 1.2, os.path.join(EP, "beds", "amb.mp3"))
    have_mus = any(os.path.exists(os.path.join(EP, "music", m + ".mp3")) for _, _, _, m in SEGS if m) and bed("mus", "music", 2.5, os.path.join(EP, "beds", "music.mp3"))
else:
    have_amb = os.path.exists(os.path.join(EP, "beds", "amb.mp3"))
    have_mus = os.path.exists(os.path.join(EP, "beds", "music.mp3"))

# ------------------------------------------------------------------ index.html
hosts = "\n".join(
    f'      <div id="{s["id"]}" data-composition-id="{s["id"]}" data-composition-src="compositions/{s["id"]}.html" data-start="{s["start"]}" data-duration="{s["dur"]}" data-track-index="0" data-track-kind="graphics" data-width="1080" data-height="1920"></div>'
    for s in SCENES)
vos = "\n".join(f'      <audio id="vo-{lid}" class="clip" src="vo/{lid}.mp3" data-start="{st}" data-duration="{d - 0.02:.2f}" data-track-index="1" data-volume="1"></audio>' for lid, st, d in VO)
sfx, lane_end = [], {}
for i, (name, st, vol) in enumerate(sorted(SFX, key=lambda x: x[1])):
    d = dur(os.path.join(EP, "sfx", name + ".mp3")) - 0.02
    lane = 3
    while lane_end.get(lane, -1) > st:
        lane += 1
    lane_end[lane] = st + d
    sfx.append(f'      <audio id="sfx-{i:02d}-{name.replace("_", "-")}" class="clip" src="sfx/{name}.mp3" data-start="{st}" data-duration="{d:.2f}" data-track-index="{lane}" data-volume="{vol}"></audio>')
beds = []
if have_amb:
    beds.append(f'      <audio id="amb-bed" class="clip" src="beds/amb.mp3" data-start="0" data-duration="{TOTAL - 0.05:.2f}" data-track-index="8" data-volume="0.55"></audio>')
if have_mus:
    pts, low = [{"t": 0, "v": 1}], 0.4
    for i, (lid, st, d) in enumerate(VO):
        end, nxt = st + d, (VO[i + 1][1] if i + 1 < len(VO) else None)
        if pts[-1]["v"] != low:
            pts += [{"t": round(max(0, st - 0.3), 3), "v": 1}, {"t": round(st, 3), "v": low}]
        if nxt is None or nxt - end > 1.2:
            pts += [{"t": round(end + 0.15, 3), "v": low}, {"t": round(end + 0.6, 3), "v": 1}]
    lane = json.dumps({"version": 1, "lanes": [{"target": "volume", "points": pts[:512]}]}).replace('"', "&quot;")
    beds.append(f'      <audio id="music-bed" class="clip" src="beds/music.mp3" data-start="0" data-duration="{TOTAL - 0.05:.2f}" data-track-index="9" data-volume="0.42" data-automation="{lane}"></audio>')

INDEX = f'''<!doctype html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <script src="assets/comic.js"></script>
    <script src="assets/comic_ep.js"></script>
    <style>
      * {{ margin: 0; padding: 0; box-sizing: border-box; }}
      html, body {{ margin: 0; width: 1080px; height: 1920px; overflow: hidden; background: #0d1430; }}
      #root {{ width: 100%; height: 100%; position: relative; }}
    </style>
  </head>
  <body>
    <!-- Generated by ep/build.py from ep/episode.py: edit there, not here. -->
    <div id="root" data-composition-id="main" data-start="0" data-duration="{TOTAL}" data-width="1080" data-height="1920">
{hosts}

      <!-- Voice: ElevenLabs eleven_v3, Turkish library voices -->
{vos}

      <!-- Sound effects: ElevenLabs sound generation -->
{chr(10).join(sfx)}

      <!-- Beds: ambience (ElevenLabs) and music, ducked under the voice -->
{chr(10).join(beds)}
    </div>
    <script>
      window.__timelines = window.__timelines || {{}};
      window.__timelines["main"] = gsap.timeline({{ paused: true }});
    </script>
  </body>
</html>
'''
open(os.path.join(EP, "index.html"), "w").write(INDEX)
print(f"{len(SCENES)} scenes, {sum(len(s['panels']) for s in SCENES)} panels, {len(VO)} lines, {len(SFX)} sfx, total {TOTAL:.1f}s ({TOTAL / 60:.1f} min), amb={have_amb} music={have_mus}")
json.dump([{"scene": s["id"], "art": p["art"], "start": round(s["start"] + p["a"], 2), "end": round(s["start"] + p["b"], 2),
            "lines": [[l, round(s["start"] + t0, 2)] for l, t0, _ in p["items"]]} for s in SCENES for p in s["panels"]],
          open(os.path.join(EP, "timing.json"), "w"), ensure_ascii=False, indent=1)
