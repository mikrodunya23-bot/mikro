#!/usr/bin/env python3
"""Narration with ElevenLabs eleven_v3 (voice: Celil), tone -> v3 audio tag + tempo.
Usage: python3 make_vo.py [ids...]   -> vo/<id>.wav, durations.json   (key is proxy-injected)
       python3 make_vo.py --stab 0.0 ids...  to override stability."""
import csv, json, os, subprocess, sys, time, urllib.request, urllib.error
VOICE = "WkCXzRSQ4rftSQwOculG"  # Celil Turk - Warm, Clear, Confident
TAGS = {"calm": "[warmly]", "curious": "[curious]", "upbeat": "[energetic]", "excited": "[excited]",
        "tense": "[tense, low voice]", "whisper": "[whispers]"}
LOUD = {"calm": -16, "curious": -16, "upbeat": -15.5, "excited": -14.5, "tense": -18, "whisper": -20.5}
TEMPO = {"calm": 1.1, "curious": 1.08, "upbeat": 1.15, "excited": 1.13, "tense": 1.04, "whisper": 1.04}
D = os.path.dirname(os.path.abspath(__file__))
args = sys.argv[1:]; stab = 0.5
if args[:1] == ["--stab"]: stab = float(args[1]); args = args[2:]
only = set(args)
for d in ("vo_raw", "vo"): os.makedirs(f"{D}/{d}", exist_ok=True)
rows = list(csv.DictReader(open(f"{D}/lines.tsv"), delimiter="\t"))
dp = f"{D}/durations.json"; durs = json.load(open(dp)) if os.path.exists(dp) else {}
def tts(text):
    body = json.dumps({"text": text, "model_id": "eleven_v3", "language_code": "tr", "seed": int(os.environ.get("SEED", 7)),
                       "voice_settings": {"stability": stab, "similarity_boost": 0.8}}).encode()
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE}?output_format=mp3_44100_128"
    for a in range(4):
        try:
            req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json", "xi-api-key": "proxy-injected"})
            with urllib.request.urlopen(req, timeout=180) as r: return r.read()
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503) and a < 3: time.sleep(5 * (a + 1)); continue
            raise RuntimeError(f"{e.code} {e.read()[:300]}")
def finish(r):
    raw, dst = f"{D}/vo_raw/{r['id']}.mp3", f"{D}/vo/{r['id']}.wav"
    af = ("silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,"
          f"areverse,atempo={TEMPO[r['tone']]},apad=pad_dur=0.05,loudnorm=I={LOUD[r['tone']]}:TP=-1.5")
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", raw, "-af", af, "-ar", "48000", "-ac", "1", dst], check=True)
    return round(float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", dst])), 2)
for r in rows:
    if only and r["id"] not in only: continue
    if not only and r["id"] in durs: continue
    open(f"{D}/vo_raw/{r['id']}.mp3", "wb").write(tts(f"{TAGS[r['tone']]} {r['text']}"))
    durs[r["id"]] = finish(r); print(r["id"], r["tone"], durs[r["id"]], flush=True)
    json.dump(durs, open(dp, "w"), indent=1)
