#!/usr/bin/env python3
"""Splits the rendered episode into TikTok / Instagram parts.
1) writes parts/cards/ (a HyperFrames project with the 7 end cards back to back) and renders it,
2) renders the opening badges as transparent PNGs,
3) cuts each part from the full render, overlays its badge, appends its end card.
Usage (from kurye/):  python3 parts/build.py [--skip-cards]"""
import os, shutil, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
EP = os.path.join(ROOT, "ep")
sys.path.insert(0, HERE)
from parts import PARTS, CARD  # noqa: E402

SRC = os.path.join(EP, "renders", "gizemli-kurye-s1-tam.mp4")
CARDS = os.path.join(HERE, "cards")
OUT = os.path.join(HERE, "out")
HF = ["node", "/root/.claude/skills/hyperframes/scripts/plugin-cli.mjs"]
os.makedirs(os.path.join(CARDS, "assets", "fonts"), exist_ok=True)
os.makedirs(OUT, exist_ok=True)


def dur(f):
    return float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]))


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;")


# ------------------------------------------------------------------ 1) end cards project
for f in ("comic.js", "comic_ep.js", "fonts/bangers-latin.woff2", "fonts/bangers-latin-ext.woff2"):
    shutil.copyfile(os.path.join(EP, "assets", f), os.path.join(CARDS, "assets", f))
for f in ("hyperframes.json", "meta.json"):
    shutil.copyfile(os.path.join(EP, f), os.path.join(CARDS, f))
os.makedirs(os.path.join(CARDS, "audio"), exist_ok=True)
for p in PARTS:
    shutil.copyfile(os.path.join(EP, "vo", p["cta"] + ".mp3"), os.path.join(CARDS, "audio", p["cta"] + ".mp3"))
shutil.copyfile(os.path.join(EP, "music", "mystery.mp3"), os.path.join(CARDS, "audio", "music.mp3"))
shutil.copyfile(os.path.join(EP, "sfx", "elevator_ding.mp3"), os.path.join(CARDS, "audio", "ding.mp3"))

CSS = open(os.path.join(EP, "scene.css")).read() + """
    .ct { position: absolute; left: 120px; width: 768px; text-align: center; z-index: 12; }
    .brand { color: #ffd84a; font-size: 64px; letter-spacing: 8px; }
    .next { display: inline-block; white-space: nowrap; color: #ff7a1a; font-size: 128px; line-height: 1.2; -webkit-text-stroke: 10px #16121c; paint-order: stroke fill; text-shadow: 12px 12px 0 #16121c; }
    .q { display: inline-block; background: #fff; color: #16121c; border: 7px solid #16121c; border-radius: 50px; padding: 26px 34px 20px; font-size: 54px; line-height: 1.05; letter-spacing: 2px; box-shadow: 10px 10px 0 #ff7a1a; }
    .row { position: absolute; left: 130px; width: 650px; display: flex; justify-content: space-between; z-index: 12; }
    .btn { display: inline-block; background: #ffd84a; color: #16121c; border: 6px solid #16121c; padding: 16px 18px 10px; font-size: 50px; letter-spacing: 2px; transform: rotate(-3deg); box-shadow: 8px 8px 0 #16121c; }
    .btn.b2 { background: #ff7a1a; transform: rotate(2deg); }
    .btn.b3 { background: #ffffff; transform: rotate(-1deg); }
"""
scenes, audio = [], []
for i, p in enumerate(PARTS):
    sid, t0 = f"card{p['n']}", round(i * CARD, 3)
    nxt = "2. SEZON<br/>ÇOK YAKINDA" if p.get("final") else f"DEVAMI<br/>BÖLÜM {p['n'] + 1}'DE"
    top = "1. SEZONUN SONU" if p.get("final") else f"GİZEMLİ KURYE · BÖLÜM {p['n']}"
    html = f'''<template>
  <style>{CSS}</style>
  <div id="root" data-composition-id="{sid}" data-width="1080" data-height="1920">
    <div id="{sid}-bg" class="panel clip" data-start="0" data-duration="{CARD}" data-track-index="0"><div id="{sid}-cam" class="cam"><svg data-art="titleEnd" data-layout-ignore></svg></div></div>
    <div id="{sid}-brand" class="ct brand clip" data-start="0.1" data-duration="{CARD - 0.1}" data-track-index="1" style="top:320px">{esc(top)}</div>
    <div id="{sid}-next" class="ct clip" data-start="0.25" data-duration="{CARD - 0.25}" data-track-index="1" style="top:410px"><span id="{sid}-next-in" class="next">{nxt}</span></div>
    <div id="{sid}-q" class="ct clip" data-start="1.2" data-duration="{CARD - 1.2}" data-track-index="2" style="top:740px"><span id="{sid}-q-in" class="q">{esc(p["q"])}</span></div>
    <div id="{sid}-row" class="row clip" data-start="2.0" data-duration="{CARD - 2.0}" data-track-index="3" style="top:1060px">
      <span id="{sid}-b1" class="btn">TAKİP ET</span><span id="{sid}-b2" class="btn b2">BEĞEN</span><span id="{sid}-b3" class="btn b3">YORUM YAP</span>
    </div>
  </div>
  <script>
    (function () {{
      Comic.drawAll(document.querySelector('[data-composition-id="{sid}"]'));
      const tl = gsap.timeline({{ paused: true }});
      tl.fromTo("#{sid}-cam", {{scale: 1.0}}, {{scale: 1.06, duration: {CARD}, ease: "sine.inOut"}}, 0);
      tl.fromTo("#{sid}-next-in", {{scale: 2.6, opacity: 0}}, {{scale: 1, opacity: 1, duration: 0.35, ease: "power4.in"}}, 0.25);
      tl.fromTo("#{sid}-q-in", {{scale: 0, rotation: -6}}, {{scale: 1, rotation: 0, duration: 0.3, ease: "back.out(2)"}}, 1.2);
      tl.fromTo("#{sid}-b1", {{y: 80, opacity: 0}}, {{y: 0, opacity: 1, duration: 0.25, ease: "back.out(2.4)"}}, 2.0);
      tl.fromTo("#{sid}-b2", {{y: 80, opacity: 0}}, {{y: 0, opacity: 1, duration: 0.25, ease: "back.out(2.4)"}}, 2.25);
      tl.fromTo("#{sid}-b3", {{y: 80, opacity: 0}}, {{y: 0, opacity: 1, duration: 0.25, ease: "back.out(2.4)"}}, 2.5);
      tl.set({{}}, {{}}, {CARD});
      window.__timelines["{sid}"] = tl;
    }})();
  </script>
</template>
'''
    os.makedirs(os.path.join(CARDS, "compositions"), exist_ok=True)
    open(os.path.join(CARDS, "compositions", sid + ".html"), "w").write(html)
    scenes.append(f'      <div id="{sid}" data-composition-id="{sid}" data-composition-src="compositions/{sid}.html" data-start="{t0}" data-duration="{CARD}" data-track-index="0" data-track-kind="graphics" data-width="1080" data-height="1920"></div>')
    cd = dur(os.path.join(CARDS, "audio", p["cta"] + ".mp3"))
    audio.append(f'      <audio id="cta-{p["n"]}" class="clip" src="audio/{p["cta"]}.mp3" data-start="{round(t0 + 0.6, 3)}" data-duration="{cd - 0.02:.2f}" data-track-index="1" data-volume="1"></audio>')
    audio.append(f'      <audio id="music-{p["n"]}" class="clip" src="audio/music.mp3" data-start="{t0}" data-duration="{CARD - 0.05}" data-media-start="{(i * 5) % 30}" data-track-index="2" data-volume="0.22" data-fade-in="0.3" data-fade-out="0.8"></audio>')
    audio.append(f'      <audio id="ding-{p["n"]}" class="clip" src="audio/ding.mp3" data-start="{round(t0 + 2.0, 3)}" data-duration="1.5" data-track-index="3" data-volume="0.35"></audio>')
TOTAL = round(len(PARTS) * CARD, 3)
open(os.path.join(CARDS, "index.html"), "w").write(f'''<!doctype html>
<html lang="tr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1080, height=1920" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <script src="assets/comic.js"></script>
    <script src="assets/comic_ep.js"></script>
    <style>* {{ margin: 0; padding: 0; box-sizing: border-box; }} html, body {{ width: 1080px; height: 1920px; overflow: hidden; background: #0d1430; }} #root {{ width: 100%; height: 100%; position: relative; }}</style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="{TOTAL}" data-width="1080" data-height="1920">
{chr(10).join(scenes)}
{chr(10).join(audio)}
    </div>
    <script>window.__timelines = window.__timelines || {{}}; window.__timelines["main"] = gsap.timeline({{ paused: true }});</script>
  </body>
</html>
''')
CARDS_MP4 = os.path.join(CARDS, "renders", "cards.mp4")
if "--write-only" in sys.argv:
    sys.exit(0)
if "--skip-cards" not in sys.argv or not os.path.exists(CARDS_MP4):
    subprocess.run(HF + ["render", "--output", "renders/cards.mp4"], cwd=CARDS, check=True)

# ------------------------------------------------------------------ 2) opening badges (transparent PNG)
badge_html = os.path.join(HERE, "badge.html")
open(badge_html, "w").write(f'''<!doctype html><html><head><meta charset="utf-8"><style>
@font-face {{ font-family: "Bangers"; src: url("file://{CARDS}/assets/fonts/bangers-latin.woff2"); }}
@font-face {{ font-family: "Bangers"; src: url("file://{CARDS}/assets/fonts/bangers-latin-ext.woff2"); unicode-range: U+0100-024F; }}
html, body {{ margin: 0; width: 1080px; height: 1920px; background: transparent; font-family: "Bangers"; }}
.b {{ position: absolute; left: 120px; top: 1010px; width: 768px; text-align: center; }}
.t {{ display: inline-block; background: #16121c; color: #ffd84a; border: 6px solid #ffd84a; box-shadow: 10px 10px 0 #ff7a1a; padding: 14px 34px 8px; transform: rotate(-2deg); }}
.t small {{ display: block; font-size: 40px; letter-spacing: 6px; color: #fff; }}
.t big {{ display: block; font-size: 110px; letter-spacing: 6px; line-height: 1; }}
.r {{ display: inline-block; margin-top: 22px; background: #ffd84a; color: #16121c; border: 5px solid #16121c; padding: 10px 20px 6px; font-size: 34px; letter-spacing: 2px; max-width: 740px; }}
</style></head><body><div class="b"><div class="t"><small>GİZEMLİ KURYE</small><big id="big"></big></div><br/><div class="r" id="rec"></div></div></body></html>''')
shot = os.path.join(HERE, "badge_shot.cjs")
open(shot, "w").write('''const {chromium}=require('playwright');(async()=>{const parts=JSON.parse(process.argv[2]);const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1080,height:1920}});await p.goto('file://'+process.argv[3]);await p.evaluate(()=>document.fonts.ready);
for(const x of parts){await p.evaluate(x=>{document.getElementById('big').textContent=x.big;const r=document.getElementById('rec');r.textContent=x.rec||'';r.style.display=x.rec?'inline-block':'none';},x);
await p.waitForTimeout(150);await p.screenshot({path:x.out,omitBackground:true});}await b.close();})();''')
import json  # noqa: E402
spec = [{"big": ("SEZON FİNALİ · BÖLÜM 7" if p.get("final") else f"BÖLÜM {p['n']}"), "rec": p["recap"], "out": os.path.join(HERE, f"badge{p['n']}.png")} for p in PARTS]
subprocess.run(["node", shot, json.dumps(spec), badge_html], check=True, cwd="/tmp")

# ------------------------------------------------------------------ 3) assemble parts
for i, p in enumerate(PARTS):
    a, b = p["a"], p["b"]
    L = b - a
    seg = os.path.join(OUT, f"_seg{p['n']}.mp4")
    card = os.path.join(OUT, f"_card{p['n']}.mp4")
    out = os.path.join(OUT, f"gizemli-kurye-bolum-{p['n']}.mp4")
    vf = (f"[0:v]setpts=PTS-STARTPTS[v];[1:v]format=rgba,fade=t=in:st=0.3:d=0.3:alpha=1,fade=t=out:st=3.4:d=0.4:alpha=1[bd];"
          f"[v][bd]overlay=0:0:enable='between(t,0.3,3.8)'[vo]")
    af = f"[0:a]asetpts=PTS-STARTPTS,afade=t=in:d=0.25,afade=t=out:st={L - 0.6:.3f}:d=0.6[ao]"
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-ss", f"{a:.3f}", "-t", f"{L:.3f}", "-i", SRC, "-loop", "1", "-t", f"{L:.3f}", "-i", spec[i]["out"],
                    "-filter_complex", vf + ";" + af, "-map", "[vo]", "-map", "[ao]", "-r", "30", "-c:v", "libx264", "-preset", "medium", "-crf", "21",
                    "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2", seg], check=True)
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-ss", f"{i * CARD:.3f}", "-t", f"{CARD:.3f}", "-i", CARDS_MP4, "-r", "30", "-c:v", "libx264",
                    "-preset", "medium", "-crf", "21", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2", card], check=True)
    lst = os.path.join(OUT, f"_list{p['n']}.txt")
    open(lst, "w").write(f"file '{seg}'\nfile '{card}'\n")
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-c", "copy", "-movflags", "+faststart", out], check=True)
    for f in (seg, card, lst):
        os.remove(f)
    print(f"BÖLÜM {p['n']}: {dur(out):.1f}s -> {out}", flush=True)
