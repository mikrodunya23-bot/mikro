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

# ---------------- ambience per scene ----------------
a, b = SC["acilis"]; d = ID["drain"]
span(amb, birds(d - a + 2, 3.5), a, d + 1.2, 1.0); span(amb, breeze(b - a), a, b, .8)
span(amb, drone(b - d + 1), d, b + 1, 1.0, 2.0); put(amb, WH, d + .3, 1.2); put(amb, thunder(), d + 2.5, .7)
put(amb, TW, SC["baslik"][0] + .3, .9)
a, b = SC["cayir"]; span(amb, birds(b - a, .4), a, b, .7); span(amb, breeze(b - a), a, b, 1.0)
put(amb, TW, ID["iz"], .6)
a, b = SC["harita"]; span(amb, breeze(b - a), a, b, .5)
a, b = SC["orman"]; g = ID["yesil_doner"]
span(amb, leaves(b - a), a, b, 1.0); span(amb, birds(g - a, .15), a, g, .6); span(amb, birds(b - g, 4), g, b, 1.0)
put(amb, crack(), ID["dal"] + .1, 1.0); put(amb, woodpecker(), g + 3, .5); put(amb, woodpecker(), b - 8, .4)
dk = ID["diken_aksiyon"]
for k in range(6): put(amb, WH, dk + .5 + k * 1.2, .5)
put(amb, TW, ID["yesil_aldi"] - .2, .9); put(amb, RISE, g, .8)
a, b = SC["nehir"]; m = ID["mavi_doner"]
span(amb, river(b - a), a, b, 1.0); span(amb, birds(b - m, 2.5), m, b, .7); span(amb, breeze(b - a), a, b, .5)
for tt in np.arange(a + 3, b, 9): put(amb, frog(), tt + R.uniform(0, 4), .5)
s0 = ID["sal_basla"]
for k in range(7): put(amb, splash(), s0 + .8 + k * 1.6 + R.uniform(0, .5), .6)
put(amb, TW, ID["mavi_aldi"] - .1, .9); put(amb, RISE, m, .8)
a, b = SC["dag"]
span(amb, wind_howl(b - a, 1.0), a, b, 1.0)
for key, gain in (("homur_gelir", .9), ("firtina", 1.0), ("homur_kacar", .7)): put(amb, thunder(), ID[key] - .3, gain)
span(amb, wind_howl(5, 1.4), ID["firtina_aksiyon"] - 1, ID["firtina_aksiyon"] + 4, 1.0)
put(amb, TW, ID["flas"], 1.2); put(amb, RISE, ID["flas"] - .2, .6); put(amb, WH, ID["homur_gelir"] - .6, 1.0); put(amb, FALL, ID["homur_gitti"] - 1, .5)
a, b = SC["kamp"]
span(amb, crickets(b - a), a, b, 1.0); span(amb, campfire(b - a), a + 2, b, .8)
for tt in (a + 6, a + 30, b - 9): put(amb, owl(), tt, .6, -.5)
a, b = SC["kale"]; rd = ID["renkler_doner"]
span(amb, rain(rd - a + 3, 1.0), a, rd + 3, 1.0, 2.5); span(amb, wind_howl(rd - a, .5), a, rd + 2, .6)
for tt in (a + 1.5, a + 9, ID["homur_kapi"] - .2, ID["sessizlik"] - 2): put(amb, thunder(), tt, .7)
for k in range(3): put(amb, crack() * .0 + filt(noise(T(.25)), "bandpass", [80, 400]).astype(np.float32) * env_ad(T(.25), .003, .05) * 3, ID["kapi"] + .2 + k * .35, .6, 0)  # knocks
span(amb, birds(b - rd, 3), rd + 2, b, .8); put(amb, RISE, rd + .2, 1.0); put(amb, TW, rd + 1.5, 1.0); put(amb, TW, rd + 4, .8)
a, b = SC["final"]
span(amb, birds(b - a, 3), a, b, .8); span(amb, breeze(b - a), a, b, .6); put(amb, TW, ID["gokkusagi"], .9)
put(amb, WH, ID["yaris_aksiyon"] + .2, .9); put(amb, WH, ID["yaris_aksiyon"] + 4, .7); put(amb, TW, ID["son"] + 1, .7)
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
}
cues = [(0, "happy"), (ID["drain"] - .5, "ominous"), (SC["baslik"][0], "fanfare"), (SC["cayir"][0], "sad"), (ID["iz"], "hopeful"),
        (SC["harita"][0], "adventure"), (SC["orman"][0], "mystery"), (ID["cevik"], "adventure"), (ID["yesil_doner"], "happy"),
        (SC["nehir"][0], "happy"), (ID["homur_adi"], "mystery"), (ID["sal"], "adventure"), (ID["mavi_doner"], "happy"), (ID["tosbi_ogut"], "hopeful"),
        (SC["dag"][0], "mystery"), (ID["homur_gelir"], "tense"), (ID["homur_gitti"], "sad"),
        (SC["kamp"][0], "lullaby"), (SC["kale"][0], "mystery"), (ID["homur_kapi"], "tense"), (ID["sessizlik"], "silence"), (ID["itiraf"], "sad"),
        (ID["teklif"], "hopeful"), (ID["renkler_doner"], "triumph"), (SC["final"][0], "happy"), (ID["dans"], "dance"), (ID["kapanis"], "lullaby"),
        (ID["son"], "fanfare")]
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
                addm(bell(m, dd * B, .12 if "soft" not in fl else .09), mt)
                if "sparkle" in fl: addm(bell(m + 12, dd * B, .035), mt)
                mt += dd * B
        if "sparkle" in fl:
            for e in range(8): addm(bell(ch[1 + e % 3] + 24, B / 2, .025), t + e * B / 2 + .02)
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
    pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", f"audio/line{l['i']:03d}.mp3", "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True).stdout
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
