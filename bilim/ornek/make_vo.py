#!/usr/bin/env python3
"""Narration for the sample with ElevenLabs eleven_v3 (voice: Celil). Key is proxy-injected.
Usage: python3 make_vo.py [ids...] -> vo/<id>.mp3 + durations.json"""
import csv, json, os, subprocess, sys, time, urllib.request, urllib.error
VOICE = "WkCXzRSQ4rftSQwOculG"  # Celil Turk - Warm, Clear, Confident
D = os.path.dirname(os.path.abspath(__file__))
os.makedirs(f"{D}/vo_raw", exist_ok=True); os.makedirs(f"{D}/vo", exist_ok=True)
only = set(sys.argv[1:])
rows = list(csv.DictReader(open(f"{D}/lines.tsv"), delimiter="\t"))
dp = f"{D}/durations.json"
durs = json.load(open(dp)) if os.path.exists(dp) else {}
def tts(text):
    body = json.dumps({"text": text, "model_id": "eleven_v3", "language_code": "tr", "seed": 7,
                       "voice_settings": {"stability": 0.5, "similarity_boost": 0.8}}).encode()
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE}?output_format=mp3_44100_128"
    for a in range(4):
        try:
            req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json", "xi-api-key": "proxy-injected"})
            with urllib.request.urlopen(req, timeout=180) as r: return r.read()
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503) and a < 3: time.sleep(5 * (a + 1)); continue
            raise RuntimeError(f"{e.code} {e.read()[:300]}")
for r in rows:
    if only and r["id"] not in only: continue
    if not only and r["id"] in durs: continue
    raw, dst = f"{D}/vo_raw/{r['id']}.mp3", f"{D}/vo/{r['id']}.wav"
    open(raw, "wb").write(tts(r["text"]))
    af = ("silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,"
          "areverse,atempo=1.1,apad=pad_dur=0.05,loudnorm=I=-16:TP=-1.5")
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", raw, "-af", af, "-ar", "48000", "-ac", "1", dst], check=True)
    d = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", dst]))
    durs[r["id"]] = round(d, 2); print(r["id"], round(d, 2), flush=True)
    json.dump(durs, open(dp, "w"), indent=1)
