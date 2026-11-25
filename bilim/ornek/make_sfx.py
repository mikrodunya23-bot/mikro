#!/usr/bin/env python3
"""Sound effects via ElevenLabs sound-generation. Usage: python3 make_sfx.py [names...]"""
import json, os, sys, urllib.request, subprocess
D = os.path.dirname(os.path.abspath(__file__))
SFX = {
 "heart_soft": ("two slow soft romantic heartbeats, warm, cartoon", 2.0),
 "sparkle": ("magical twinkling sparkle chime, bright, short, cartoon", 1.5),
 "pop_hearts": ("gentle bubbly pops, cute cartoon, soft", 1.5),
 "night_amb": ("quiet city night ambience, distant traffic, crickets, calm", 10.0),
 "bag": ("plastic trash bag rustle then metal trash can lid opening", 1.6),
 "cat": ("angry cat hiss and screech jumping out of metal trash can, lid clang", 1.8),
 "sting": ("sharp orchestral scare stinger hit, cartoon", 1.2),
 "heart_fast": ("fast pounding heartbeat, tense, loud", 4.0),
 "whoosh": ("quick soft whoosh transition", 0.8),
 "music": ("gentle curious ambient electronic music, soft synth pads and light plucks, educational documentary, calm", 22.0),
}
only = set(sys.argv[1:])
for k, (p, dur) in SFX.items():
    out = f"{D}/sfx/{k}.mp3"
    if (only and k not in only) or (not only and os.path.exists(out)): continue
    body = json.dumps({"text": p, "duration_seconds": dur, "prompt_influence": 0.5}).encode()
    req = urllib.request.Request("https://api.elevenlabs.io/v1/sound-generation", data=body,
                                 headers={"Content-Type": "application/json", "xi-api-key": "proxy-injected"})
    open(out, "wb").write(urllib.request.urlopen(req, timeout=180).read()); print("ok", k, flush=True)
