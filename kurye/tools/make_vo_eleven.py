#!/usr/bin/env python3
"""Voices every line in tools/lines_eleven.tsv with ElevenLabs eleven_v3 (Turkish).
The API key is injected by the session's network proxy; set ELEVEN_KEY only when
running elsewhere. Usage (from the project root):
    python3 tools/make_vo_eleven.py            # all lines
    python3 tools/make_vo_eleven.py v06 v15    # only these ids (re-takes)
"""
import csv, json, os, subprocess, sys, tempfile, urllib.request

VOICES = {
    "deniz": "N2lVS1w4EtoT3dr4eOWO",      # Callum
    "deniz_vo": "N2lVS1w4EtoT3dr4eOWO",   # Callum, inner voice (+ room below)
    "resepsiyon": "pFZP5JQG7iQjIQuC4Bku", # Lily
    "guvenlik": "SOYHLrjzK2X1ezoPC6cr",   # Harry
    "ece": "EXAVITQu4vr4xnSDxMaL",        # Sarah
    "asistan": "XrExE9yKIg1WjnnlVkGX",    # Matilda
}
FX = {
    "deniz_vo": "highpass=f=90,aecho=0.8:0.55:35|70:0.18|0.10,",
}
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets", "vo")
only = set(sys.argv[1:])

with open(os.path.join(ROOT, "tools", "lines_eleven.tsv"), newline="") as fh:
    rows = list(csv.DictReader(fh, delimiter="\t"))

for r in rows:
    if only and r["id"] not in only:
        continue
    body = json.dumps({
        "text": r["text"], "model_id": "eleven_v3", "language_code": "tr", "seed": 7,
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.8},
    }).encode()
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{VOICES[r['voice']]}?output_format=mp3_44100_128",
        data=body, headers={"Content-Type": "application/json", "xi-api-key": os.environ.get("ELEVEN_KEY", "proxy-injected")})
    with urllib.request.urlopen(req, timeout=120) as resp, tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as tmp:
        tmp.write(resp.read())
    dst = os.path.join(OUT, r["id"] + ".mp3")
    af = FX.get(r["voice"], "") + ("silenceremove=start_periods=1:start_threshold=-50dB,areverse,"
          "silenceremove=start_periods=1:start_threshold=-50dB,areverse,apad=pad_dur=0.05,loudnorm=I=-16:TP=-1.5")
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", tmp.name, "-af", af, "-ar", "48000", "-ac", "1", "-b:a", "192k", dst], check=True)
    os.unlink(tmp.name)
    d = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", dst]))
    print(f"{r['id']}\t{r['voice']}\t{d:.2f}", flush=True)
