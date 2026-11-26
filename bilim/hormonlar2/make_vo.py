#!/usr/bin/env python3
"""Voices lines.tsv with ElevenLabs eleven_v3. Narrator + characters; tone -> v3 tag, tempo, level.
Usage: python3 make_vo.py [ids...]   (SEED env to change take)   -> vo/<id>.wav, durations.json, env.json (mouth envelopes)"""
import csv, json, os, subprocess, sys, time, urllib.request, urllib.error
import numpy as np
D = os.path.dirname(os.path.abspath(__file__))
VOICE = {"nar": os.environ.get("NAR", "5W74Dom7jqg8P63rrFqK"),   # Özgür Öztürk (hyped)
         "mirac": "xROJDAAwVXltxzeQxuFL",   # Ali - young, anxious
         "yasemin": "XjxV2uE0ZjxxzwMtx4Zx", # Ezgi - young, warm
         "dopa": "pDx8Z50wrzWlatwIixrm"}    # Zuu - playful, high
TAGS = {"upbeat": "[energetic]", "excited": "[excited]", "curious": "[curious]", "tense": "[suspenseful, low voice]",
        "whisper": "[whispers]", "playful": "[playful, amused]", "sports": "[excited sports commentator, fast]", "calm": "[warmly]"}
CHAR_TAG = {"mirac": {"line": "[nervous, excited]", "think": "[thinking to himself]"}, "yasemin": {"line": "[cheerful]"}, "dopa": {"line": "[squeaky, overexcited, shouting]"}}
TEMPO = {"upbeat": 1.1, "excited": 1.08, "curious": 1.06, "tense": 1.02, "whisper": 1.02, "playful": 1.08, "sports": 1.12, "calm": 1.06, "line": 1.04, "think": 1.04}
LOUD = {"upbeat": -15, "excited": -14, "curious": -15.5, "tense": -17, "whisper": -19.5, "playful": -15, "sports": -14, "calm": -16, "line": -15, "think": -16}
THINK_FX = "highpass=f=110,lowpass=f=7000,aecho=0.8:0.6:40|80:0.25|0.12,"
only = set(sys.argv[1:])
for d in ("vo_raw", "vo"): os.makedirs(f"{D}/{d}", exist_ok=True)
rows = [r for r in csv.DictReader(open(f"{D}/lines.tsv"), delimiter="\t") if r["who"] != "ege"]
dp, ep = f"{D}/durations.json", f"{D}/env.json"
durs = json.load(open(dp)) if os.path.exists(dp) else {}
envs = json.load(open(ep)) if os.path.exists(ep) else {}
def tts(voice, text):
    body = json.dumps({"text": text, "model_id": "eleven_v3", "language_code": "tr", "seed": int(os.environ.get("SEED", 7)),
                       "voice_settings": {"stability": 0.5, "similarity_boost": 0.8}}).encode()
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{voice}?output_format=mp3_44100_128"
    for a in range(4):
        try:
            req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json", "xi-api-key": "proxy-injected"})
            with urllib.request.urlopen(req, timeout=180) as r: return r.read()
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503) and a < 3: time.sleep(5 * (a + 1)); continue
            raise RuntimeError(f"{e.code} {e.read()[:300]}")
def finish(r):
    raw, dst = f"{D}/vo_raw/{r['id']}.mp3", f"{D}/vo/{r['id']}.wav"
    tone = r["tone"]; fx = THINK_FX if tone == "think" else ""
    af = (fx + "silenceremove=start_periods=1:start_threshold=-50dB,areverse,silenceremove=start_periods=1:start_threshold=-50dB,"
          f"areverse,atempo={TEMPO[tone]},apad=pad_dur=0.05,loudnorm=I={LOUD[tone]}:TP=-1.5")
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", raw, "-af", af, "-ar", "48000", "-ac", "1", dst], check=True)
    a = np.frombuffer(subprocess.check_output(["ffmpeg", "-v", "error", "-i", dst, "-f", "f32le", "-ac", "1", "-ar", "48000", "-"]), dtype=np.float32)
    hop = 1600; fr = a[: len(a) // hop * hop].reshape(-1, hop); e = np.sqrt((fr ** 2).mean(1)); e = e / (e.max() + 1e-9)
    envs[r["id"]] = [round(float(x), 2) for x in e]   # 30 per second
    return round(len(a) / 48000, 2)
for r in rows:
    if only and r["id"] not in only: continue
    if not only and r["id"] in durs: continue
    tag = TAGS[r["tone"]] if r["who"] == "nar" else CHAR_TAG[r["who"]][r["tone"]]
    open(f"{D}/vo_raw/{r['id']}.mp3", "wb").write(tts(VOICE[r["who"]], f"{tag} {r['text']}"))
    durs[r["id"]] = finish(r); print(r["id"], r["who"], r["tone"], durs[r["id"]], flush=True)
    json.dump(durs, open(dp, "w"), indent=1); json.dump(envs, open(ep, "w"))
