import json, subprocess, urllib.request, os
s = json.load(open("script.json"))
for i, l in enumerate(s["lines"]):
    out = f"audio/line{i:02d}.mp3"
    if os.path.exists(out): continue
    v = s["voices"][l["who"]]
    body = json.dumps({"text": (l.get("tag", "") + " " + l["text"]).strip(), "model_id": s.get("model", "eleven_multilingual_v2"), "language_code": "tr",
        "voice_settings": {"stability": v["stability"], "similarity_boost": 0.8, "style": v["style"], "use_speaker_boost": True}}).encode()
    req = urllib.request.Request(f"https://api.elevenlabs.io/v1/text-to-speech/{v['id']}?output_format=mp3_44100_128",
        data=body, headers={"xi-api-key": "dummy", "Content-Type": "application/json"})
    try:
        data = urllib.request.urlopen(req).read()
    except urllib.error.HTTPError as e:
        if e.code == 400:  # language_code may be unsupported for this model
            b = json.loads(body); b.pop("language_code"); req = urllib.request.Request(req.full_url, data=json.dumps(b).encode(), headers=req.headers)
            data = urllib.request.urlopen(req).read()
        else:
            print(e.read()); raise
    open(out, "wb").write(data); print("ok", out, len(data))
