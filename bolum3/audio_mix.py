"""Film sesini üretir: dış mekan ambiyansları + efektler + duyguya göre değişen müzik + seslendirme (iç sesler yankılı).
Çıktı: out/mix.wav (stereo 44.1 kHz)"""
import json, subprocess, wave, os
import numpy as np
from scipy import signal

SR = 44100
tl = json.load(open("timeline.json"))
TOTAL = tl["total"]; N = int(SR * (TOTAL + 1))
ID = tl["ids"]; SC = {s["name"]: (s["start"], s["end"]) for s in tl["scenes"]}
R = np.random.default_rng(1)

def T(n): return int(n * SR)
def sos(kind, f, order=2): return signal.butter(order, f, btype=kind, fs=SR, output="sos")
def filt(x, kind, f, order=2): return signal.sosfilt(sos(kind, f, order), x)
def noise(n): return R.standard_normal(n).astype(np.float32)
def brown(n):
    b = np.cumsum(noise(n)); b = filt(b, "highpass", 20); return b / (np.abs(b).max() + 1e-9)
def smooth_rand(n, rate_hz, lo=0.0, hi=1.0):
    k = max(2, int(n / SR * rate_hz) + 2); pts = R.uniform(lo, hi, k)
    return np.interp(np.linspace(0, k - 1, n), np.arange(k), pts).astype(np.float32)
def env_ad(n, a, d):
    t = np.arange(n) / SR; return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)
def norm(x, peak=1.0): return x * (peak / (np.abs(x).max() + 1e-9))
def stereo(x, pan=0.0):
    l = np.cos((pan + 1) * np.pi / 4); r = np.sin((pan + 1) * np.pi / 4)
    return np.stack([x * l * 1.414, x * r * 1.414], 1)

amb = np.zeros((N, 2), np.float32)
def put(buf, x, at, gain=1.0, pan=None):
    if x.ndim == 1: x = stereo(x, R.uniform(-.6, .6) if pan is None else pan)
    i = T(at); j = min(len(buf), i + len(x))
    if j > i: buf[i:j] += x[: j - i] * gain
def span(buf, x, a, b, gain=1.0, fade=1.5):
    """put a continuous bed between a and b with fades"""
    n = T(b) - T(a)
    if n <= 0: return
    x = x[:n] if x.ndim == 2 else stereo(x[:n], 0)
    n = len(x)
    f = min(T(fade), n // 2); e = np.ones(n, np.float32); e[:f] = np.linspace(0, 1, f); e[-f:] = np.linspace(1, 0, f)
    put(buf, x * e[:, None], a, gain)

# ---------------- sound sources ----------------
def bird_call():
    kind = R.integers(0, 4); out = []
    nsyl = R.integers(2, 7); f0 = R.uniform(2300, 4800)
    for s in range(nsyl):
        d = R.uniform(.04, .13); n = T(d); t = np.arange(n) / SR
        if kind == 0: f = f0 * (1 + .35 * t / d)            # rising
        elif kind == 1: f = f0 * (1.3 - .5 * t / d)         # falling
        elif kind == 2: f = f0 * (1 + .15 * np.sin(2 * np.pi * 40 * t))  # trill
        else: f = f0 * (1 + .6 * np.sin(np.pi * t / d))     # arch
        ph = 2 * np.pi * np.cumsum(f) / SR
        out.append(np.sin(ph) * np.sin(np.pi * t / d) ** 2 * R.uniform(.6, 1))
        out.append(np.zeros(T(R.uniform(.03, .1))))
    return np.concatenate(out).astype(np.float32)
def birds(dur, density):
    n = T(dur); x = np.zeros((n, 2), np.float32); t = 0.0
    while t < dur:
        t += R.exponential(1 / density)
        c = bird_call(); put(x, c, t, R.uniform(.15, .45), R.uniform(-.9, .9))
    return x
def leaves(dur, amount=1.0):
    n = T(dur); x = filt(noise(n), "bandpass", [1200, 7000]) * smooth_rand(n, .5, .1, 1) ** 2
    return stereo(norm(x) * .25 * amount, 0)
def breeze(dur):
    n = T(dur); x = filt(noise(n), "bandpass", [150, 900]) * smooth_rand(n, .25, .2, 1)
    return stereo(norm(x) * .25, 0)
def woodpecker():
    out = np.zeros(T(1.2))
    for k in range(R.integers(10, 16)):
        n = T(.03); t = np.arange(n) / SR; ping = np.sin(2 * np.pi * 1300 * t) * np.exp(-t * 160) + filt(noise(n), "bandpass", [800, 3000]) * np.exp(-t * 300) * .5
        i = T(k / 16); out[i:i + n] += ping
    return norm(out.astype(np.float32), .6)
def river(dur):
    n = T(dur)
    flow = filt(noise(n), "bandpass", [300, 2500]) * (0.6 + 0.4 * smooth_rand(n, 3)) + filt(brown(n), "lowpass", 500) * 3
    x = stereo(norm(flow) * .35, 0)
    x[:, 1] = np.roll(x[:, 1], 900)  # decorrelate
    t = 0.0
    while t < dur:  # bubbles
        t += R.exponential(1 / 14); m = T(R.uniform(.015, .04)); tt = np.arange(m) / SR
        f = R.uniform(350, 1100) * (1 + tt / tt[-1] * .8)
        b = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt * 90)
        put(x, b.astype(np.float32), t, R.uniform(.05, .15))
    return x
def frog():
    n = T(.32); t = np.arange(n) / SR
    puls = (np.sin(2 * np.pi * 28 * t) > .3).astype(float)
    x = filt(puls * noise(n) + np.sin(2 * np.pi * 180 * t) * puls, "bandpass", [200, 900]) * np.sin(np.pi * t / t[-1])
    return norm(np.concatenate([x, np.zeros(T(.12)), x * .8]).astype(np.float32), .5)
def splash():
    n = T(.7); return norm(filt(noise(n), "bandpass", [400, 5000]) * env_ad(n, .01, .18), .8).astype(np.float32)
def crack():
    n = T(.25); x = np.zeros(n)
    for k in range(5):
        i = T(R.uniform(0, .12)); m = T(.01); x[i:i + m] += noise(m) * np.exp(-np.arange(m) / SR * 500)
    return norm(filt(x, "bandpass", [600, 6000]), .9).astype(np.float32)
def wind_howl(dur, strength=1.0):
    n = T(dur); x = np.zeros(n)
    w = noise(n)
    for fc in (280, 420, 600, 850):
        g = smooth_rand(n, .4, 0, 1) ** 3
        x += signal.sosfilt(signal.butter(2, [fc * .9, fc * 1.1], "bandpass", fs=SR, output="sos"), w) * g * 3
    x += filt(w, "bandpass", [100, 1500]) * smooth_rand(n, .3, .2, 1) * .6
    x = norm(x) * .45 * strength
    s = stereo(x, 0); s[:, 1] = np.roll(s[:, 1], 2000); return s
def thunder():
    n = T(5); t = np.arange(n) / SR
    rumble = filt(brown(n), "lowpass", 180) * np.exp(-t / 1.6) * (0.5 + smooth_rand(n, 6))
    crack_ = filt(noise(T(.25)), "highpass", 1500) * env_ad(T(.25), .002, .05)
    x = rumble * 1.0; x[:len(crack_)] += crack_ * .6
    return norm(x.astype(np.float32), 1.0)
def rain(dur, amount=1.0):
    n = T(dur); x = filt(noise(n), "bandpass", [900, 9000]) * (0.8 + 0.2 * smooth_rand(n, 2))
    s = stereo(norm(x) * .3 * amount, 0); s[:, 1] = np.roll(s[:, 1], 1500)
    t = 0.0
    while t < dur:
        t += R.exponential(1 / 40); m = T(.006); d = filt(noise(m), "highpass", 2000) * np.exp(-np.arange(m) / SR * 600)
        put(s, d.astype(np.float32), t, R.uniform(.05, .2) * amount)
    return s
def crickets(dur):
    n = T(dur); x = np.zeros((n, 2), np.float32)
    for c in range(4):
        f = R.uniform(4200, 5200); per = R.uniform(.45, .9); pan = R.uniform(-.8, .8); t0 = R.uniform(0, per)
        m = T(.022); tt = np.arange(m) / SR; pulse = np.sin(2 * np.pi * f * tt) * np.sin(np.pi * tt / tt[-1])
        chirp = np.concatenate([np.concatenate([pulse, np.zeros(T(.012))]) for _ in range(3)]).astype(np.float32)
        t = t0
        while t < dur:
            put(x, chirp, t, .07, pan); t += per * R.uniform(.95, 1.05)
    return x
def campfire(dur):
    n = T(dur); roar = filt(brown(n), "lowpass", 350) * .25
    s = stereo(roar.astype(np.float32), 0); t = 0.0
    while t < dur:
        t += R.exponential(1 / 9); m = T(R.uniform(.002, .012)); c = filt(noise(m + 64), "bandpass", [1000, 6000])[:m] * np.exp(-np.arange(m) / SR * 400)
        put(s, c.astype(np.float32), t, R.uniform(.1, .5), R.uniform(-.2, .2))
    return s
def owl():
    def hoo(d, f):
        m = T(d); t = np.arange(m) / SR; return np.sin(2 * np.pi * f * (1 + .02 * np.sin(2 * np.pi * 5 * t)) * t) * np.sin(np.pi * t / t[-1]) ** 1.5
    x = np.concatenate([hoo(.35, 390), np.zeros(T(.15)), hoo(.18, 370), np.zeros(T(.08)), hoo(.5, 360)])
    return norm(filt(x, "lowpass", 1200), .5).astype(np.float32)
def sfx_file(name):
    p = os.path.join("..", "cizgi-film", "audio", name + ".mp3")
    pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout
    return np.frombuffer(pcm, np.float32).reshape(-1, 2).copy()
TW, WH, RISE, FALL = sfx_file("sfx_twinkle"), sfx_file("sfx_whoosh"), sfx_file("sfx_rise"), sfx_file("sfx_fall")
def drone(dur):
    n = T(dur); t = np.arange(n) / SR
    x = sum(np.sin(2 * np.pi * f * t) for f in (55, 55.4, 82.4, 110.3)) * smooth_rand(n, .3, .6, 1)
    return stereo(norm(filt(x, "lowpass", 400)).astype(np.float32) * .3, 0)


# ---------------- winter sound sources ----------------
def crunch():
    n = T(.16); x = np.zeros(n)
    for k in range(R.integers(8, 16)):
        i = R.integers(0, n - T(.01)); m = T(R.uniform(.002, .008)); x[i:i + m] += noise(m) * R.uniform(.3, 1)
    x = filt(x, "bandpass", [700, 6000]) * np.sin(np.pi * np.arange(n) / n)
    return norm(x.astype(np.float32), .7)
def footsteps(dur, rate=2.4, gain=.35):
    s = np.zeros((T(dur), 2), np.float32); t = 0.0; side = 1
    while t < dur - .2: put(s, crunch(), t, gain * R.uniform(.7, 1), side * .2); side = -side; t += 1 / rate * R.uniform(.9, 1.1)
    return s
def skate(dur):
    s = np.zeros((T(dur), 2), np.float32); t = 0.0; side = 1
    while t < dur - .8:
        n = T(.7); x = filt(noise(n), "bandpass", [2500, 9000]) * np.sin(np.pi * np.arange(n) / n) ** 2
        put(s, norm(x.astype(np.float32), .5), t, .5, side * .5); side = -side; t += .75
    return s
def ice_crack():
    n = T(1.6); t = np.arange(n) / SR; x = np.zeros(n)
    for k in range(12):
        i = T(R.uniform(0, .6)); m = T(.006); x[i:i + m] += noise(m) * R.uniform(.5, 1)
    x = filt(x, "highpass", 1500) * 1.5
    boom = filt(brown(n), "lowpass", 160) * np.exp(-t / .5) * 1.2
    f = 2600 * np.exp(-t * 2.5) + 500; creak = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3) * .25
    return norm((x + boom + creak).astype(np.float32), 1)
def ice_groan():
    n = T(2.5); t = np.arange(n) / SR; f = 90 + 30 * np.sin(2 * np.pi * .7 * t)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / t[-1]) * (.6 + .4 * smooth_rand(n, 8))
    return norm(filt(x, "bandpass", [60, 500]).astype(np.float32), .5)
def drip():
    n = T(.18); t = np.arange(n) / SR; f = R.uniform(1400, 2400) * np.exp(-t * 8)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 30)
    y = np.zeros(T(1.6)); y[:n] += x
    for dl, g in ((.21, .5), (.43, .3), (.71, .18), (1.05, .1)): i = T(dl); y[i:i + n] += x * g
    return norm(y.astype(np.float32), .5)
def splat():
    n = T(.25); t = np.arange(n) / SR
    x = filt(noise(n), "lowpass", 1800) * np.exp(-t * 25) + filt(noise(n), "bandpass", [2000, 7000]) * np.exp(-t * 40) * .4
    return norm(x.astype(np.float32), .8)
def throw():
    n = T(.35); t = np.arange(n) / SR
    x = filt(noise(n), "bandpass", [400, 2500]) * np.sin(np.pi * t / t[-1]) ** 2
    return norm(x.astype(np.float32), .5)
def jingle(dur=.6, v=.5):
    n = T(dur) + T(.25); x = np.zeros(n)
    for k in range(10):
        i = T(R.uniform(0, dur * .5)); m = T(.25); tt = np.arange(m) / SR
        x[i:i + m] += sum(np.sin(2 * np.pi * f * tt) for f in R.uniform(4500, 8500, 3)) * np.exp(-tt * 18)
    return norm(x.astype(np.float32), v)
def snow_air(dur, amount=1.0):
    n = T(dur); x = filt(noise(n), "bandpass", [3000, 10000]) * (.5 + .5 * smooth_rand(n, .3))
    s = stereo(norm(x) * .08 * amount, 0); s[:, 1] = np.roll(s[:, 1], 700); return s
def winter_birds(dur, density=.3):
    s = np.zeros((T(dur), 2), np.float32); t = 0.0
    while t < dur:
        t += R.exponential(1 / density); c = bird_call(); put(s, c, t, R.uniform(.1, .25), R.uniform(-.9, .9))
    return s
def magic(dur=4):
    n = T(dur); t = np.arange(n) / SR
    x = sum(np.sin(2 * np.pi * f * t + np.sin(2 * np.pi * .3 * t) * 2) for f in (220, 330, 440, 660)) * np.sin(np.pi * t / t[-1])
    return stereo(norm(x.astype(np.float32), .35), 0)

# ---------------- pirate / island sound sources ----------------
def waves(dur, strength=1.0):
    n = T(dur); t = np.arange(n) / SR
    swell = (.5 + .5 * np.sin(2 * np.pi * t / 6.5 + 1)) ** 2 * .8 + .2 * smooth_rand(n, .5)
    x = filt(noise(n), "bandpass", [150, 3500]) * swell + filt(brown(n), "lowpass", 300) * 2 * swell
    s = stereo(norm(x) * .4 * strength, 0); s[:, 1] = np.roll(s[:, 1], 2500); return s
def creak():
    n = T(R.uniform(.6, 1.2)); t = np.arange(n) / SR; f = R.uniform(180, 320) * (1 + .3 * np.sin(2 * np.pi * R.uniform(1, 3) * t))
    puls = (np.sin(2 * np.pi * 40 * t) > .6).astype(float)
    x = filt(np.sin(2 * np.pi * np.cumsum(f) / SR) * puls + noise(n) * .2 * puls, "bandpass", [150, 1500]) * np.sin(np.pi * t / t[-1])
    return norm(x.astype(np.float32), .5)
def gull():
    out = []
    for k in range(R.integers(2, 4)):
        n = T(R.uniform(.18, .32)); t = np.arange(n) / SR; f = R.uniform(1400, 2000) * np.exp(-t * 3)
        out.append(np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * .3 * np.sin(np.pi * t / t[-1]) ** 2); out.append(np.zeros(T(.08)))
    return norm(filt(np.concatenate(out), "bandpass", [900, 4500]).astype(np.float32), .4)
def whale():
    n = T(3.5); t = np.arange(n) / SR; f = 180 + 120 * np.sin(np.pi * t / t[-1]) - 60 * t / t[-1]
    x = (np.sin(2 * np.pi * np.cumsum(f) / SR) + .3 * np.sin(4 * np.pi * np.cumsum(f) / SR)) * np.sin(np.pi * t / t[-1]) ** 1.5
    y = x.copy()
    for dl, g in ((.3, .4), (.7, .25), (1.2, .15)): i = T(dl); y[i:] += x[:-i] * g
    return norm(y.astype(np.float32), .7)
def insects(dur):
    n = T(dur); t = np.arange(n) / SR
    x = np.sin(2 * np.pi * 6200 * t) * (np.sin(2 * np.pi * 28 * t) > .2) * (.5 + .5 * smooth_rand(n, .4))
    x += np.sin(2 * np.pi * 3900 * t) * (np.sin(2 * np.pi * 9 * t) > .5) * .5 * smooth_rand(n, .3)
    return stereo((x * .025).astype(np.float32), .3)
def tropical_birds(dur, density=2.0):
    s = birds(dur, density)
    t0 = 0.0
    while t0 < dur:  # parrot-ish squawks
        t0 += R.exponential(6); m = T(.25); tt = np.arange(m) / SR
        sq = filt(np.sign(np.sin(2 * np.pi * (900 + 600 * np.sin(np.pi * tt / tt[-1])) * tt)) * np.sin(np.pi * tt / tt[-1]), "bandpass", [700, 3500])
        put(s, norm(sq.astype(np.float32), .25), t0, .6)
    return s
def stone_grind(dur=3):
    n = T(dur); t = np.arange(n) / SR
    x = filt(brown(n), "lowpass", 400) * (.6 + .4 * smooth_rand(n, 12)) + filt(noise(n), "bandpass", [300, 2000]) * .3 * smooth_rand(n, 20)
    return norm((x * np.minimum(1, t / .3) * np.minimum(1, (dur - t) / .5)).astype(np.float32), .8)
def rumble(dur, strength=1.0):
    n = T(dur); x = filt(brown(n), "lowpass", 140) * (.6 + .4 * smooth_rand(n, 4))
    s = stereo(norm(x.astype(np.float32)) * .8 * strength, 0); t0 = 0.0
    while t0 < dur: t0 += R.exponential(.25); put(s, crunch(), t0, R.uniform(.2, .6) * strength, R.uniform(-.8, .8))
    return s
def boulder(dur):
    n = T(dur); t = np.arange(n) / SR
    x = filt(brown(n), "lowpass", 90) * (1 + .5 * np.sin(2 * np.pi * 3 * t)) + filt(noise(n), "bandpass", [80, 600]) * .4 * (np.sin(2 * np.pi * 3 * t) > .7)
    return stereo(norm(x.astype(np.float32), .9), 0)
def chest_open():
    n = T(1.2); t = np.arange(n) / SR; f = 300 + 500 * t
    x = filt(np.sin(2 * np.pi * np.cumsum(f) / SR) * (np.sin(2 * np.pi * 30 * t) > .5) + noise(n) * .2, "bandpass", [200, 2500]) * np.sin(np.pi * t / t[-1])
    return norm(x.astype(np.float32), .6)
def impact():
    n = T(1.2); t = np.arange(n) / SR
    x = filt(brown(n), "lowpass", 120) * np.exp(-t * 4) * 1.5 + filt(noise(n), "bandpass", [500, 4000]) * np.exp(-t * 18) * .6
    return norm(x.astype(np.float32), 1)
def accordion(m, dur, v):
    n = T(dur); t = np.arange(n) / SR; f = mtof(m) * (1 + .004 * np.sin(2 * np.pi * 5.5 * t))
    ph = 2 * np.pi * np.cumsum(f) / SR
    w = sum(np.sin(k * ph) / k ** 1.3 for k in range(1, 8)) + sum(np.sin(k * ph * 1.003) / k ** 1.3 for k in range(1, 5)) * .6
    e = np.minimum(1, t / .03) * np.minimum(1, np.maximum(0, (dur - t)) / .05)
    return (v * w * e * .35).astype(np.float32)
# ---------------- ambience per scene ----------------
a, b = SC["acilis"]
span(amb, waves(b - a, 1.4), a, b, 1.0); span(amb, rain(b - a, .8), a, b, .8); span(amb, wind_howl(b - a, .8), a, b, .7)
for tt in np.arange(a + 1, b, 3.5): put(amb, creak(), tt + R.uniform(0, 1.5), .6)
for tt in (ID["simsek"], ID["tilkos_gul"] + 3, a + 2): put(amb, thunder(), tt, .9)
put(amb, TW, SC["baslik"][0] + .3, .9); put(amb, impact(), SC["baslik"][0] + .2, .6)
a, b = SC["vadi"]
span(amb, birds(b - a, 1.2), a, b, .7); span(amb, breeze(b - a), a, b, .8); span(amb, leaves(b - a, .6), a, b, .6)
for k in range(10): put(amb, crunch(), ID["sise"] - 4 + k * .35, .5)
put(amb, TW, ID["harita_parla"], 1.0); put(amb, RISE, ID["harita_parla"] - .3, .6)
span(amb, footsteps(2, 3), ID["buzbas_gelir"] - 2, ID["buzbas_gelir"], 1)
put(amb, WH, ID["tilkos_belir"], .9)
a, b = SC["gece"]
span(amb, crickets(b - a), a, b, 1); span(amb, campfire(b - a), a, b, .5)
span(amb, footsteps(4, 1.6, .2), ID["sinsi"], ID["sinsi"] + 4, 1); put(amb, owl(), a + 3, .5)
put(amb, crack(), ID["uyanma"], .7); span(amb, footsteps(4, 5, .4), ID["kacis"], ID["kacis"] + 4, 1)
put(amb, waves(6, .6), ID["elveda"] - 1, .5)
a, b = SC["deniz"]; fr = ID["firtina"]; bc = ID["balina_cikar"]
span(amb, waves(b - a, 1.0), a, b, 1.0)
for tt in np.arange(a + 2, fr, 5): put(amb, gull(), tt + R.uniform(0, 2), .7, R.uniform(-.8, .8))
span(amb, wind_howl(bc - fr + 2, 1.2), fr, bc + 2, 1.0); span(amb, rain(bc - fr, .9), fr + 1, bc + 1, .9)
for tt in (fr + 2, ID["parcalan"], ID["dev_dalga"] + .5): put(amb, thunder(), tt, .8)
for k in range(6): put(amb, splash(), ID["firtina_aksiyon"] + k * .9, .7)
put(amb, impact(), ID["dev_dalga"] + .8, .8); put(amb, splash(), ID["dev_dalga"] + 1, 1.0)
put(amb, whale(), bc + .3, 1.0); put(amb, splash(), bc + .2, 1.0); put(amb, whale(), ID["balina_yuzer"] + 3, .7)
put(amb, WH, ID["goz_kirp"] - .2, .4); put(amb, TW, ID["goz_kirp"] + .1, .7)
a, b = SC["ada"]
span(amb, waves(ID["orman_gir"] - a + 2, .6), a, ID["orman_gir"] + 2, .8); span(amb, tropical_birds(b - a, 2.5), a, b, .8); span(amb, insects(b - a), a, b, 1)
span(amb, footsteps(4, 2.8, .3), ID["orman_gir"], ID["orman_gir"] + 4, 1)
for k in range(7): put(amb, WH, ID["sarmasik"] + k * 1.2, .7, (-1) ** k * .5)
put(amb, splat(), ID["yakala"] + .6, .8)
put(amb, stone_grind(4), ID["kapi_acilir"] + .5, 1.0); put(amb, TW, ID["kapi_acilir"] + 4, .7)
for k in range(4): put(amb, (filt(noise(T(.15)), "lowpass", 600) * env_ad(T(.15), .002, .04) * 3).astype(np.float32), ID["kapi_acilir"] - .2 + k * .2, .7, 0)
a, b = SC["tapinak"]
span(amb, drone(b - a), a, b, .7); span(amb, campfire(b - a), a, b, .35)
for tt in np.arange(a + 1, b, 3): put(amb, drip(), tt + R.uniform(0, 2), .3, R.uniform(-.7, .7))
put(amb, impact(), ID["tuzak_gor"] + .1, .6)
for k in range(6): put(amb, creak(), ID["kurtarma"] + k * .8, .5)
put(amb, WH, ID["kurtarma"] + 4, .8)
a, b = SC["hazine"]; gu = ID["gurultu"]
span(amb, drone(b - a), a, b, .6); put(amb, TW, ID["sandik"] + .5, 1.0); put(amb, RISE, ID["sandik"], .6)
span(amb, rumble(ID["cikis"] - gu + 1, 1.0), gu, ID["cikis"] + 1, 1.0, .5)
span(amb, boulder(ID["cikis"] - ID["kaya"] + .5), ID["kaya"] - .5, ID["cikis"], 1.0, .5)
span(amb, footsteps(ID["cikis"] - ID["kos1"], 5, .4), ID["kos1"], ID["cikis"], 1)
put(amb, impact(), ID["cikis"] + 1.2, 1.0); put(amb, impact(), ID["cikis"] + 2, .7)
a, b = SC["final"]
span(amb, birds(b - a, 2.5), a, b, .8); span(amb, breeze(b - a), a, b, .6)
put(amb, chest_open(), ID["acilis_sandik"] + .3, 1.0); put(amb, TW, ID["acilis_sandik"] + 1.5, 1.0)
ag = ID["agac_buyur"]; span(amb, magic(10), ag, ag + 10, 1.0, .5); put(amb, RISE, ag + .5, 1.0); put(amb, TW, ag + 5, 1.0); put(amb, TW, ag + 8.5, 1.0)
put(amb, TW, ID["hosgeldin"] + 1.5, .8); put(amb, TW, ID["son"] + 1, .7)
print("ambiyans tamam")

# ---------------- music (mood-driven) ----------------
mus = np.zeros(N, np.float32)
def mtof(m): return 440 * 2 ** ((m - 69) / 12)
def addm(sig, at, g=1.0):
    i = T(at); j = min(N, i + len(sig))
    if j > i: mus[i:j] += sig[: j - i] * g
def bell(m, dur, v):
    n = T(min(dur * 2.5, 3)); t = np.arange(n) / SR; f = mtof(m)
    w = np.sin(2 * np.pi * f * t) + .35 * np.sin(4 * np.pi * f * t) * np.exp(-t * 4) + .1 * np.sin(2 * np.pi * 3.01 * f * t) * np.exp(-t * 7)
    return (v * w * np.exp(-t * 2.2) * np.minimum(1, t / .004)).astype(np.float32)
def pad(ms, dur, v):
    n = T(dur); t = np.arange(n) / SR; w = np.zeros(n)
    for m in ms:
        for dd in (-.15, 0, .15): w += np.sin(2 * np.pi * mtof(m) * (1 + dd / 100) * t)
    e = np.minimum(1, t / .5) * np.minimum(1, (dur - t) / .5)
    return (v * w * e / len(ms) / 3).astype(np.float32)
def pluck(m, v, dec=7):
    n = T(.6); t = np.arange(n) / SR; f = mtof(m)
    return (v * (np.sin(2 * np.pi * f * t) + .3 * np.sin(4 * np.pi * f * t)) * np.exp(-t * dec) * np.minimum(1, t / .003)).astype(np.float32)
def kick(v):
    n = T(.3); t = np.arange(n) / SR; f = 120 * np.exp(-t * 18) + 45
    return (v * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9)).astype(np.float32)
def hat(v):
    n = T(.06); return (v * filt(noise(n), "highpass", 7000) * np.exp(-np.arange(n) / SR * 70)).astype(np.float32)
C, Am, F, G, Dm, E = [48, 55, 60, 64], [45, 52, 57, 60], [41, 48, 53, 57], [43, 50, 55, 59], [38, 50, 53, 57], [40, 47, 52, 56]
MOODS = {
 # tempo, chords, melody(per bar list of (midi,beats)), level, flags
 "happy":    (96, [C, Am, F, G], [[(72,1),(76,1),(79,1),(76,1)],[(81,1.5),(79,.5),(76,2)],[(77,1),(81,1),(84,1),(81,1)],[(79,2),(74,1),(76,1)]], 1.0, "sparkle"),
 "ominous":  (70, [Am, F, Dm, E], None, .9, "low"),
 "fanfare":  (110, [C, F, G, C], [[(72,.5),(76,.5),(79,1),(84,2)],[(81,1),(77,1),(81,2)],[(79,1),(83,1),(86,2)],[(84,4)]], 1.2, "sparkle drums"),
 "sad":      (72, [Am, F, C, E], [[(76,2),(72,1),(71,1)],[(72,2),(69,2)],[(67,1),(72,1),(76,1),(74,1)],[(71,3),(68,1)]], .8, ""),
 "hopeful":  (88, [F, G, C, Am], [[(69,1),(72,1),(77,2)],[(74,1),(79,1),(83,2)],[(84,2),(79,2)],[(76,4)]], .9, "sparkle"),
 "adventure":(120, [Am, F, C, G], [[(69,.5),(72,.5),(76,1),(76,.5),(74,.5),(72,1)],[(77,1),(76,.5),(74,.5),(72,2)],[(72,.5),(76,.5),(79,1),(79,.5),(77,.5),(76,1)],[(74,1),(71,1),(74,2)]], 1.0, "drums"),
 "mystery":  (76, [Am, Dm, Am, E], [[(76,3),(77,1)],[(76,2),(74,2)],[(72,3),(71,1)],[(68,4)]], .65, "low"),
 "tense":    (104, [Am, Am, F, E], [[(69,.5),(69,.5),(70,1),(69,2)],[(69,.5),(69,.5),(72,1),(71,2)],[(65,1),(69,1),(72,2)],[(71,2),(68,2)]], .95, "low drums"),
 "lullaby":  (66, [C, Am, F, G], [[(76,2),(74,1),(72,1)],[(72,2),(69,2)],[(69,1),(72,1),(77,2)],[(74,4)]], .6, "soft"),
 "triumph":  (100, [F, G, C, C], [[(72,1),(77,1),(81,2)],[(79,1),(83,1),(86,2)],[(84,2),(88,2)],[(84,4)]], 1.25, "sparkle drums"),
 "dance":    (124, [C, Am, F, G], [[(72,.5),(72,.5),(76,.5),(79,.5),(84,1),(79,1)],[(81,.5),(81,.5),(79,.5),(76,.5),(72,2)],[(77,.5),(77,.5),(81,.5),(84,.5),(86,1),(84,1)],[(83,1),(79,1),(74,1),(79,1)]], 1.2, "sparkle drums four"),
 "silence":  (90, [C], None, 0, ""),
 "pirate":   (132, [Am, G, F, E], [[(69,.75),(72,.25),(76,1),(76,.5),(77,.5),(76,1)],[(74,.75),(71,.25),(67,1),(71,1),(74,1)],[(72,.75),(74,.25),(76,1),(77,.5),(76,.5),(74,1)],[(71,1.5),(68,.5),(69,2)]], 1.1, "drums accordion"),
 "sneaky":   (92, [Am, Am, Dm, E], [[(69,.5),(0,.5),(71,.5),(0,.5),(72,.5),(0,.5),(71,1)],[(69,.5),(0,.5),(68,.5),(0,.5),(69,2)],[(74,.5),(0,.5),(72,.5),(0,.5),(70,.5),(0,.5),(69,1)],[(68,1),(71,1),(68,2)]], .8, "low"),
 "chase":    (148, [Am, F, G, E], [[(81,.5),(81,.5),(79,.5),(77,.5),(76,1),(72,1)],[(77,.5),(77,.5),(76,.5),(74,.5),(72,2)],[(79,.5),(79,.5),(77,.5),(76,.5),(74,1),(71,1)],[(76,.5),(75,.5),(76,.5),(80,.5),(81,2)]], 1.2, "drums four low"),
}
cues = [(0, "tense"), (ID["tilkos_ilk"], "mystery"), (ID["tilkos_gul"], "tense"), (SC["baslik"][0], "pirate"), (SC["vadi"][0], "happy"),
        (ID["harita_parla"], "mystery"), (ID["buzbas_gelir"], "adventure"), (ID["bilmece"], "mystery"), (ID["tilkos_belir"], "sneaky"),
        (SC["gece"][0], "lullaby"), (ID["sinsi"], "sneaky"), (ID["caldi"], "tense"), (ID["gitti"], "sad"), (ID["kopya"], "hopeful"), (ID["yola"], "pirate"),
        (SC["deniz"][0], "pirate"), (ID["firtina"], "tense"), (ID["balina_cikar"], "triumph"), (ID["kiyida"], "hopeful"),
        (SC["ada"][0], "adventure"), (ID["izler"], "mystery"), (ID["atla"], "adventure"), (ID["dort_tas"], "mystery"), (ID["kapi_acilir"], "triumph"),
        (SC["tapinak"][0], "mystery"), (ID["imdat"], "tense"), (ID["yardim"] - 6, "sad"), (ID["yardim"], "hopeful"), (ID["tilkos_sok"], "sad"), (ID["birlikte2"], "hopeful"),
        (SC["hazine"][0], "mystery"), (ID["gurultu"], "tense"), (ID["kos1"], "chase"), (ID["kurtulduk"], "triumph"),
        (SC["final"][0], "happy"), (ID["acilis_sandik"], "mystery"), (ID["agac_buyur"], "triumph"), (ID["findik"], "happy"), (ID["kutlama"], "pirate"),
        (ID["kapanis"], "lullaby"), (ID["son"], "fanfare")]
gain_env = np.zeros(N, np.float32)
for k, (st, md) in enumerate(cues):
    en = cues[k + 1][0] if k + 1 < len(cues) else TOTAL
    bpm, chords, mel, lvl, fl = MOODS[md]; B = 60 / bpm; bar = 4 * B; t = st; j = 0
    gain_env[T(st):T(en)] = lvl
    if lvl == 0: continue
    while t < en - .05:
        ch = chords[j % len(chords)]
        addm(pad([c + 12 for c in ch[1:]], bar + .5, .09 if "soft" not in fl else .06), t)
        if "low" in fl:
            for bt in range(4): addm(pluck(ch[0] - 12, .2, 4), t + bt * B)
        elif "soft" not in fl:
            for bt in range(4): addm(pluck(ch[0] - 12 + (7 if bt % 2 else 0), .15), t + bt * B)
        else:
            addm(pluck(ch[0] - 12, .1, 3), t)
        if mel:
            mt = t
            for (m, dd) in mel[j % len(mel)]:
                if m == 0: mt += dd * B; continue
                if "accordion" in fl: addm(accordion(m - 12, dd * B * .95, .16), mt)
                addm(bell(m, dd * B, .12 if "soft" not in fl else .09), mt)
                if "sparkle" in fl: addm(bell(m + 12, dd * B, .035), mt)
                mt += dd * B
        if "sparkle" in fl:
            for e in range(8): addm(bell(ch[1 + e % 3] + 24, B / 2, .025), t + e * B / 2 + .02)
            for e in (1, 3): addm(jingle(.4, .05), t + e * B)
        if "drums" in fl:
            for bt in range(4):
                if "four" in fl or bt % 2 == 0: addm(kick(.35), t + bt * B)
                addm(hat(.05), t + bt * B + B / 2)
        t += bar; j += 1
# smooth crossfade transitions between cues
win = T(.6); ge = np.convolve(gain_env, np.ones(win) / win, mode="same")
mus *= np.clip(ge, 0, 1.3)
for (st, md) in cues[1:]:  # short dip at each cue change to hide cuts
    i = T(st); w = T(.35); lo, hi = max(0, i - w), min(N, i + w)
    mus[lo:hi] *= np.abs(np.linspace(-1, 1, hi - lo)) ** .5
rev = mus.copy()
for dl, g in ((.031, .35), (.047, .3), (.083, .22), (.127, .15), (.19, .1)):
    n = T(dl); rev[n:] += mus[:-n] * g
mus = norm(rev, .5)
print("müzik tamam")

# ---------------- voices ----------------
vox = np.zeros((N, 2), np.float32)
inner_mask = np.zeros(N, np.float32)
for l in tl["lines"]:
    pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", l["file"], "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout
    x = np.frombuffer(pcm, np.float32).copy()
    x = x[int(l["trim"] * SR): int((l["trim"] + l["dur"]) * SR)]
    f = min(T(.03), len(x) // 4); x[:f] *= np.linspace(0, 1, f); x[-f:] *= np.linspace(1, 0, f)
    if l["inner"]:  # iç ses: yumuşak, yankılı, "kafanın içinden" gelen ses
        x = filt(x, "bandpass", [180, 6500]) * .9
        y = np.concatenate([x, np.zeros(T(1.0))]).astype(np.float32)
        for dl, g in ((.06, .45), (.11, .3), (.17, .2), (.26, .12)):
            n = T(dl); y[n:n + len(x)] += x * g
        s = stereo(y, 0); s[:, 1] = np.roll(s[:, 1], T(.012)); put(vox, s, l["start"], 1.0)
        inner_mask[T(l["start"]):T(l["start"] + l["dur"])] = 1
    else:
        put(vox, stereo(x, 0), l["start"], 1.0)
        if l.get("id") in ("merhaba", "findik"):  # mağara yankısı
            e = filt(x, "lowpass", 3000).astype(np.float32)
            for dl, g in ((.45, .5), (.9, .32), (1.35, .2), (1.8, .12)): put(vox, stereo(e, (-1) ** int(dl * 3) * .4), l["start"] + dl, g)
vox = norm(vox, .9)
print("seslendirme tamam")

# ---------------- mix with ducking ----------------
venv = np.abs(vox).max(1)
win = T(.25); venv = np.convolve(venv, np.ones(win) / win, mode="same")
duck = 1 - np.clip(venv * 6, 0, .6)          # music/ambience drop up to 60% under speech
duck_amb = 1 - np.clip(venv * 4, 0, .45)
mix = vox * 1.0 + stereo(mus, 0) * (duck * .55)[:, None] + amb * (duck_amb * 1.25)[:, None]
mix = mix[: T(TOTAL)]
fo = T(3); mix[-fo:] *= np.linspace(1, 0, fo)[:, None]
mix = np.tanh(mix * 1.1) / np.tanh(1.1)
os.makedirs("out", exist_ok=True)
w = wave.open("out/mix.wav", "wb"); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((np.clip(mix, -1, 1) * 32000).astype(np.int16).tobytes()); w.close()
print("mix.wav yazıldı", round(len(mix) / SR, 1), "sn")
