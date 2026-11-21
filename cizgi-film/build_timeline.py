import json, subprocess, numpy as np
FPS = 30
s = json.load(open("script.json"))
extra_after = {2: 1.6, 7: 0.8, 8: 2.4, 11: 1.0, 12: 0.5}
extra_before = {0: 1.6, 3: 0.4, 5: 1.2}
END_CARD = 5.0
t = 0.0; lines = []
for i, l in enumerate(s["lines"]):
    pcm = subprocess.run(["ffmpeg","-v","error","-i",f"audio/line{i:02d}.mp3","-ac","1","-ar","16000","-f","s16le","-"],capture_output=True).stdout
    a = np.frombuffer(pcm, np.int16).astype(np.float32)/32768
    dur = len(a)/16000
    t += extra_before.get(i, 0)
    hop = 16000//FPS
    env = [float(np.sqrt(np.mean(a[k:k+hop]**2))) for k in range(0, len(a), hop)]
    m = max(env) or 1
    env = [round(min(1, e/m*1.6), 3) for e in env]
    lines.append({**l, "start": round(t,3), "dur": round(dur,3), "env": env, "i": i})
    t += dur + 0.45 + extra_after.get(i, 0)
total = t + END_CARD
# scene ranges: boundaries halfway between scenes
scenes = []
for l in lines:
    if not scenes or scenes[-1]["name"] != l["scene"]:
        scenes.append({"name": l["scene"], "first": l["start"]})
    scenes[-1]["last_end"] = l["start"] + l["dur"]
for k, sc in enumerate(scenes):
    sc["start"] = 0 if k == 0 else round((scenes[k-1]["last_end"] + sc["first"]) / 2, 3)
for k, sc in enumerate(scenes):
    sc["end"] = round(scenes[k+1]["start"], 3) if k+1 < len(scenes) else round(total, 3)
json.dump({"fps": FPS, "total": round(total,3), "lines": lines, "scenes": scenes}, open("timeline.json","w"), ensure_ascii=False)
print("total", round(total,2))
for sc in scenes: print(sc["name"], sc["start"], sc["end"])
