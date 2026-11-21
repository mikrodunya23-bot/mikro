#!/usr/bin/env python3
"""Voices ep/lines.tsv with ElevenLabs eleven_v3 (Turkish library voices).
Inner voices (kind=think) get a close, slightly echoing treatment.
Usage (from kurye/):  python3 ep/make_vo.py [ids...]   -> ep/vo/<id>.mp3, ep/durations.tsv
The API key is injected by the session's network proxy."""
import csv, json, os, subprocess, sys, tempfile, time, urllib.request, urllib.error

VOICES = {
    "cem": "rSuyucEH95GpZEfLV0AM",       # Can Seçkin
    "deniz": "0DihkedLJYKoWg7H1u4d",     # Ergun Kalbak
    "murat": "QAABwpMjK3YR9pYW5FDO",     # Recep Sağlık
    "aylin": "uvU9jrgGLWNPeNA4NgNT",     # İrem
    "ercument": "J17lijyP1BHYcM7ld0Rg",  # Adam
    "ece": "rtnDjO8siSxeTEeTVczO",       # Gözde
    "kaan": "y6X1mFgtBqHFtQwrOezf",      # Orhan
    "selin": "mBUB5zYuPwfVE6DTcEjf",     # Eda Atlas
    "hasan": "5W74Dom7jqg8P63rrFqK",     # Özgür Öztürk
    "tarik": "MuOq11XzQTthwLhmGZ2V",     # Nihat
}
THINK_FX = "highpass=f=110,lowpass=f=7500,aecho=0.8:0.6:45|90:0.22|0.12,volume=0.9,"
# Cem's inner voice: lower, closer, darker and roomier than his spoken voice, so the two never sound alike
CEM_THINK_FX = "rubberband=pitch=0.94,highpass=f=90,lowpass=f=4200,aecho=0.85:0.75:70|140|210:0.32|0.22|0.12,volume=0.85,"

EP = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(EP, "vo")
RAW = os.path.join(EP, "vo_raw")
os.makedirs(RAW, exist_ok=True)
os.makedirs(OUT, exist_ok=True)
only = set(sys.argv[1:])
rows = list(csv.DictReader(open(os.path.join(EP, "lines.tsv"), newline=""), delimiter="\t"))


def tts(voice, text):
    body = json.dumps({"text": text, "model_id": "eleven_v3", "language_code": "tr", "seed": 11,
                       "voice_settings": {"stability": 0.5, "similarity_boost": 0.8}}).encode()
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice}?output_format=mp3_44100_128"
    for attempt in range(4):
        try:
            req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json", "xi-api-key": "proxy-injected"})
            with urllib.request.urlopen(req, timeout=180) as r:
                return r.read(), r.headers.get("character-cost")
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503) and attempt < 3:
                time.sleep(5 * (attempt + 1)); continue
            raise RuntimeError(f"{e.code} {e.read()[:200]}")


durs = {}
dpath = os.path.join(EP, "durations.tsv")
if os.path.exists(dpath):
    for ln in open(dpath):
        k, v = ln.split()
        durs[k] = v
for r in rows:
    if only and r["id"] not in only:
        continue
    dst = os.path.join(OUT, r["id"] + ".mp3")
    if not only and os.path.exists(dst):
        continue
    data, cost = tts(VOICES[r["who"]], r["text"])
    raw = os.path.join(RAW, r["id"] + ".mp3")
    with open(raw, "wb") as fh:
        fh.write(data)
    fx = (CEM_THINK_FX if r["who"] == "cem" else THINK_FX) if r["kind"] == "think" else ""
    af = fx + ("silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,"
               "areverse,apad=pad_dur=0.06,loudnorm=I=-16:TP=-1.5")
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", raw, "-af", af, "-ar", "48000", "-ac", "1", "-b:a", "192k", dst], check=True)
    d = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", dst]))
    durs[r["id"]] = f"{d:.2f}"
    print(f"{r['id']}\t{r['who']}\t{d:.2f}\tcost={cost}", flush=True)
    with open(dpath, "w") as fh:
        fh.write("".join(f"{k}\t{v}\n" for k, v in sorted(durs.items())))
