import json, os, urllib.request, time, hashlib
def key(l): return f"{l['who']}_{hashlib.md5((l['tag'] + '|' + l['text']).encode()).hexdigest()[:10]}"
s = json.load(open("script.json"))
for i, l in enumerate(s["lines"]):
    if "text" not in l: continue
    out = f"audio/k/{key(l)}.mp3"
    if os.path.exists(out): continue
    body = json.dumps({"text": (l["tag"] + " " + l["text"]).strip(), "model_id": s["model"], "language_code": "tr",
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.8, "style": 0.5, "use_speaker_boost": True}}).encode()
    req = urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{s['voices'][l['who']]['id']}?output_format=mp3_44100_128",
        data=body, headers={"xi-api-key": "dummy", "Content-Type": "application/json"})
    for attempt in range(4):
        try: data = urllib.request.urlopen(req, timeout=120).read(); break
        except urllib.error.HTTPError as e:
            msg = e.read(); print(i, e.code, msg[:200])
            if e.code in (429, 500, 502, 503): time.sleep(5 * (attempt + 1)); continue
            raise
    open(out, "wb").write(data); print("ok", i, l["who"], len(data))
