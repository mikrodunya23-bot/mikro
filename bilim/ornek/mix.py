#!/usr/bin/env python3
"""Mixes narration, sfx, music bed and ambience into mix.wav (timings match index.html)."""
import json, os, subprocess
D = os.path.dirname(os.path.abspath(__file__))
L = {"n1":0.4,"n2":5.8,"n3":11.5,"n4":18.0,"n5":21.4,"n6":27.5,"n7":32.3}
END = 36.3
cues = [(f"vo/{k}.wav", t, 1.0) for k, t in L.items()]
cues += [("sfx/heart_soft.mp3",1.7,.55),("sfx/sparkle.mp3",4.4,.45),("sfx/whoosh.mp3",5.5,.5),("sfx/sparkle.mp3",6.65,.35),
         ("sfx/pop_hearts.mp3",10.0,.4),("sfx/whoosh.mp3",11.2,.5),("sfx/pop_hearts.mp3",12.7,.45),("sfx/whoosh.mp3",17.2,.6),
         ("sfx/bag.mp3",21.3,.6),("sfx/cat.mp3",22.05,.85),("sfx/sting.mp3",22.1,.6),("sfx/whoosh.mp3",22.95,.4),
         ("sfx/heart_fast.mp3",25.6,.5),("sfx/heart_fast.mp3",29.3,.45)]
inp, flt = [], []
for i, (f, t, v) in enumerate(cues):
    inp += ["-i", f"{D}/{f}"]
    flt.append(f"[{i}:a]aresample=48000,aformat=channel_layouts=stereo,volume={v},adelay={int(t*1000)}|{int(t*1000)}[a{i}]")
n = len(cues)
inp += ["-i", f"{D}/sfx/music.mp3", "-stream_loop", "3", "-i", f"{D}/sfx/night_amb.mp3"]
flt.append(f"[{n}:a]aresample=48000,aformat=channel_layouts=stereo,volume=0.16,afade=t=in:d=1,afade=t=out:st=16.2:d=1.8[mus]")
flt.append(f"[{n+1}:a]aresample=48000,aformat=channel_layouts=stereo,volume=0.3,afade=t=in:d=0.8,adelay=17600|17600[amb]")
flt.append("".join(f"[a{i}]" for i in range(n)) + f"[mus][amb]amix=inputs={n+2}:normalize=0:duration=longest,atrim=0:{END},afade=t=out:st={END-0.9}:d=0.9,alimiter=limit=0.95[out]")
subprocess.run(["ffmpeg","-nostdin","-v","error","-y",*inp,"-filter_complex",";".join(flt),"-map","[out]","-ar","48000",f"{D}/mix.wav"],check=True)
print("mix.wav ok")
