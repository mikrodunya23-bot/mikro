#!/usr/bin/env python3
"""Final audio mix -> mix.wav (48 kHz stereo).
Voice: narration lines at their scene times. SFX: cue lists written by the renderer (cues/<scene>.json).
Music: one bed per section, looped/trimmed, faded, kept low and ducked under the narration."""
import json, os, subprocess, numpy as np
D = os.path.dirname(os.path.abspath(__file__))
SR = 48000
TM = json.load(open(f"{D}/timing.json"))
TOTAL = TM["total"]
N = int(round(TOTAL * SR)) + SR

def load(path, mono=False):
    raw = subprocess.check_output(["ffmpeg", "-v", "error", "-i", path, "-f", "f32le", "-ac", "1" if mono else "2", "-ar", str(SR), "-"])
    a = np.frombuffer(raw, dtype=np.float32)
    return a if mono else a.reshape(-1, 2)

def place(buf, a, t, gain=1.0):
    i = int(round(t * SR))
    if i >= len(buf): return
    j = min(len(buf), i + len(a))
    buf[i:j] += a[: j - i] * gain

voice = np.zeros(N, dtype=np.float32)
sfx = np.zeros((N, 2), dtype=np.float32)
music = np.zeros((N, 2), dtype=np.float32)
cache = {}
for sid in TM["order"]:
    sc = TM["scenes"][sid]; t0 = sc["start"]
    for l in sc["lines"]:
        place(voice, load(f"{D}/vo/{l['id']}.wav", mono=True), t0 + l["t"])
    cues = json.load(open(f"{D}/cues/{sid}.json")) if os.path.exists(f"{D}/cues/{sid}.json") else []
    for c in cues:
        p = f"{D}/sfx/{c['name']}.mp3"
        if not os.path.exists(p): print("missing sfx", c["name"]); continue
        key = (c["name"], c.get("rate", 1))
        if key not in cache:
            a = load(p)
            if c.get("rate", 1) != 1:
                idx = np.arange(0, len(a) - 1, c["rate"]); a = np.stack([np.interp(idx, np.arange(len(a)), a[:, k]) for k in (0, 1)], 1).astype(np.float32)
            cache[key] = a
        a = cache[key]
        if "dur" in c:
            n = int(c["dur"] * SR)
            if len(a) < n: a = np.tile(a, (n // len(a) + 1, 1))
            a = a[:n].copy(); f = min(len(a), int(.6 * SR)); a[-f:] *= np.linspace(1, 0, f)[:, None]
        place(sfx, a, t0 + c["t"], c.get("vol", 1) * .8)

# music beds per section
S = TM["scenes"]
def span(a, b): return S[a]["start"], S[b]["start"] + S[b]["dur"]
hope_t = S["s05"]["start"] + [l for l in S["s05"]["lines"] if l["id"] == "s5_08"][0]["t"] - .8
BEDS = [("m_hook", *span("s00", "s00")), ("m_curious", *span("s01", "s02a")), ("m_love", *span("s02b", "s02d")),
        ("m_tense", *span("s03a", "s03c")), ("m_playful", *span("s03d", "s03d")), ("m_warm", *span("s04a", "s04d")),
        ("m_sad", S["s05"]["start"], hope_t + 1.5), ("m_hope", hope_t, S["s05"]["start"] + S["s05"]["dur"]), ("m_outro", *span("s06", "s06"))]
for name, a0, a1 in BEDS:
    p = f"{D}/music/{name}.mp3"
    if not os.path.exists(p): print("missing music", name); continue
    a = load(p); n = int((a1 - a0) * SR)
    if len(a) < n:  # loop with a short crossfade
        x = int(1.5 * SR); out = a.copy()
        while len(out) < n:
            fade = np.linspace(0, 1, x)[:, None]
            out = np.concatenate([out[:-x], out[-x:] * (1 - fade) + a[:x] * fade, a[x:]])
        a = out
    a = a[:n].copy()
    fi, fo = int(1.2 * SR), int(1.8 * SR)
    a[:fi] *= np.linspace(0, 1, fi)[:, None]; a[-fo:] *= np.linspace(1, 0, fo)[:, None]
    place(music, a, a0, 1.0)

# ducking: smoothed voice envelope pulls the music down while the narrator speaks
env = np.sqrt(np.convolve(voice ** 2, np.ones(int(.05 * SR)) / int(.05 * SR), mode="same"))
act = (env > .02).astype(np.float32)
k = int(.35 * SR); act = np.convolve(act, np.ones(k) / k, mode="same")
mgain = (.2 * (1 - .5 * np.clip(act, 0, 1))).astype(np.float32)   # ~-14 dB bed, ~-20 dB under speech
mix = voice[:, None] * 1.0 + sfx + music * mgain[:, None]
peak = np.abs(mix).max(); print("peak before limit", round(float(peak), 3))
mix = np.tanh(mix * 1.1) / np.tanh(1.1)                            # soft limiter
mix = mix[: int(TOTAL * SR)]
tmp = f"{D}/mix_raw.f32"; mix.astype(np.float32).tofile(tmp)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", tmp, "-af", "loudnorm=I=-15:TP=-1.5:LRA=11", "-ar", str(SR), f"{D}/mix.wav"], check=True)
os.remove(tmp); print("mix.wav", round(TOTAL, 2), "s")
