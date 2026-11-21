#!/usr/bin/env python3
"""Loops assets/bgm/seed.wav (MusicGen) into assets/bgm/bed.mp3 covering the film,
with 2 s crossfades, a short fade-in, a fade-out on the end card and -20 LUFS.
Run after tools/make_music.py and before tools/build_scenes.py:
    python3 tools/make_bed.py <film seconds>"""
import math, os, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
total = float(sys.argv[1])
seed = os.path.join(ROOT, "assets", "bgm", "seed.wav")
out = os.path.join(ROOT, "assets", "bgm", "bed.mp3")
sd = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", seed]))
xf = 2.0
n = max(1, math.ceil((total + xf) / (sd - xf)))
inputs, chain = [], ""
for i in range(n):
    inputs += ["-i", seed]
label = "[0:a]"
for i in range(1, n):
    chain += f"{label}[{i}:a]acrossfade=d={xf}:c1=tri:c2=tri[x{i}];"
    label = f"[x{i}]"
chain += f"{label}atrim=0:{total:.3f},afade=t=in:d=1.2,afade=t=out:st={total - 2.5:.3f}:d=2.5,loudnorm=I=-20:TP=-2[out]"
subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", *inputs, "-filter_complex", chain, "-map", "[out]",
                "-ar", "48000", "-ac", "2", "-b:a", "192k", out], check=True)
print(out, total, "s from", n, "copies of", round(sd, 2), "s")
