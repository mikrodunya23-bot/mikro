import json, subprocess, hashlib, numpy as np
def key(l): return f"{l['who']}_{hashlib.md5((l['tag'] + '|' + l['text']).encode()).hexdigest()[:10]}"
FPS = 30
s = json.load(open("script.json"))
t = 0.0; items = []
for i, l in enumerate(s["lines"]):
    if "hold" in l:
        items.append({**l, "i": i, "start": round(t, 3), "dur": l["hold"]}); t += l["hold"]; continue
    pcm = subprocess.run(["ffmpeg","-v","error","-i",f"audio/k/{key(l)}.mp3","-ac","1","-ar","16000","-f","s16le","-"],capture_output=True).stdout
    a = np.frombuffer(pcm, np.int16).astype(np.float32)/32768
    # trim leading/trailing silence for tighter pacing
    nz = np.where(np.abs(a) > 0.01)[0]; lead = max(0, nz[0] - 1600) if len(nz) else 0; tail = min(len(a), nz[-1] + 3200) if len(nz) else len(a)
    a = a[lead:tail]; dur = len(a)/16000
    hop = 16000//FPS
    env = [float(np.sqrt(np.mean(a[k:k+hop]**2))) for k in range(0, len(a), hop)]
    m = np.percentile(env, 95) or 1
    env = [round(min(1, e/m), 3) for e in env]
    gap_before = 0.35 if l["inner"] else 0.0
    t += gap_before
    items.append({**l, "i": i, "file": f"audio/k/{key(l)}.mp3", "start": round(t, 3), "dur": round(dur, 3), "trim": round(lead/16000, 3), "env": env})
    t += dur + (0.55 if l["inner"] else 0.4)
total = round(t, 3)
scenes = []
for it in items:
    if not scenes or scenes[-1]["name"] != it["scene"]: scenes.append({"name": it["scene"], "first": it["start"]})
    scenes[-1]["last_end"] = it["start"] + it["dur"]
for k, sc in enumerate(scenes):
    sc["start"] = 0 if k == 0 else round((scenes[k-1]["last_end"] + sc["first"]) / 2, 3)
for k, sc in enumerate(scenes):
    sc["end"] = round(scenes[k+1]["start"], 3) if k+1 < len(scenes) else total
ids = {it["id"]: it["start"] for it in items if it.get("id")}
json.dump({"fps": FPS, "total": total, "lines": [x for x in items if "text" in x], "holds": [x for x in items if "hold" in x], "scenes": scenes, "ids": ids}, open("timeline.json","w"), ensure_ascii=False)
print("TOPLAM", total, "sn =", round(total/60, 2), "dk")
for sc in scenes: print(f'{sc["name"]:8s} {sc["start"]:7.1f} {sc["end"]:7.1f}  ({sc["end"]-sc["start"]:.0f}s)')
