import json, subprocess
tl = json.load(open("timeline.json")); sc = {s["name"]: s["start"] for s in tl["scenes"]}
inputs, filters, vlabels, slabels = [], [], [], []
def inp(f): inputs.extend(["-i", f]); return len(inputs)//2 - 1
for l in tl["lines"]:
    k = inp(f"audio/line{l['i']:02d}.mp3"); ms = int(l["start"]*1000)
    filters.append(f"[{k}:a]aresample=44100,aformat=channel_layouts=stereo,adelay={ms}|{ms},volume=1.6[v{k}]"); vlabels.append(f"[v{k}]")
sfx = [("sfx_twinkle", 0.3, .8), ("sfx_fall", sc["dusus"]+0.4, .9), ("sfx_cricket", sc["orman"], .35), ("sfx_whoosh", sc["inis"]+0.2, .8),
       ("sfx_rise", sc["yukselis"], .7), ("sfx_twinkle", sc["evde"]+1.0, .8), ("sfx_twinkle", sc["son"]+1.8, .6)]
for name, at, vol in sfx:
    k = inp(f"audio/{name}.mp3"); ms = int(at*1000)
    filters.append(f"[{k}:a]aresample=44100,aformat=channel_layouts=stereo,adelay={ms}|{ms},volume={vol}[s{k}]"); slabels.append(f"[s{k}]")
m = inp("audio/music.wav")
v = inp("out/video_noaudio.mp4")
filters.append(f"{''.join(vlabels)}amix=inputs={len(vlabels)}:normalize=0,apad,asplit=2[voice][sc]")
filters.append(f"[{m}:a]aformat=channel_layouts=stereo,volume=0.55[mus]")
filters.append("[mus][sc]sidechaincompress=threshold=0.03:ratio=6:attack=40:release=500[duck]")
filters.append(f"[voice][duck]{''.join(slabels)}amix=inputs={2+len(slabels)}:normalize=0,alimiter=limit=0.95,loudnorm=I=-14:TP=-1.5:LRA=11[aout]")
cmd = ["ffmpeg","-y","-v","error",*inputs,"-filter_complex",";".join(filters),"-map",f"{v}:v","-map","[aout]","-c:v","copy","-c:a","aac","-b:a","192k","-ar","44100","-t",str(tl["total"]),"-movflags","+faststart","out/Pofi_ve_Kayip_Yildiz.mp4"]
subprocess.run(cmd, check=True); print("done")
