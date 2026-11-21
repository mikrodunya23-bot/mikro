import numpy as np, json, wave
SR = 44100
tl = json.load(open("timeline.json")); TOTAL = tl["total"]
BPM = 92; B = 60/BPM
out = np.zeros(int(SR*(TOTAL+2)))
def mtof(m): return 440*2**((m-69)/12)
def bell(m, dur, vol):
    n = int(SR*min(dur*2.5, 3)); t = np.arange(n)/SR; f = mtof(m)
    w = np.sin(2*np.pi*f*t) + 0.35*np.sin(2*np.pi*2*f*t)*np.exp(-t*4) + 0.12*np.sin(2*np.pi*3.01*f*t)*np.exp(-t*7) + 0.08*np.sin(2*np.pi*4.2*f*t)*np.exp(-t*9)
    return vol * w * np.exp(-t*2.2) * np.minimum(1, t/0.004)
def pad(ms, dur, vol):
    n = int(SR*dur); t = np.arange(n)/SR; w = np.zeros(n)
    for m in ms:
        f = mtof(m)
        for d in (-0.15, 0, 0.15): w += np.sin(2*np.pi*f*(1+d/100)*t) + 0.2*np.sin(2*np.pi*2*f*(1+d/100)*t)
    env = np.minimum(1, t/0.6) * np.minimum(1, (dur-t)/0.6)
    return vol*w*env/len(ms)/3
def pluck(m, vol):
    n = int(SR*0.6); t = np.arange(n)/SR; f = mtof(m)
    return vol*(np.sin(2*np.pi*f*t)+0.3*np.sin(2*np.pi*2*f*t))*np.exp(-t*7)*np.minimum(1,t/0.003)
def add(sig, at):
    i = int(at*SR); j = min(len(out), i+len(sig))
    if j > i: out[i:j] += sig[:j-i]
# chords per bar (C, Am, F, G) and sad (Am, F, C, E)
happy = [[48,55,60,64],[45,52,57,60],[41,48,53,57],[43,50,55,59]]
sad   = [[45,52,57,60],[41,48,53,57],[48,55,60,64],[40,47,52,56]]
mel_h = [[(72,1),(76,1),(79,1),(76,1)],[(81,1.5),(79,.5),(76,2)],[(77,1),(81,1),(84,1),(81,1)],[(79,2),(74,1),(76,1)]]
mel_s = [[(76,2),(72,1),(71,1)],[(72,2),(69,2)],[(67,1),(72,1),(76,1),(74,1)],[(71,3),(68,1)]]
def mood(t):
    for sc in tl["scenes"]:
        if sc["start"] <= t < sc["end"]: return sc["name"]
    return "son"
bar = 4*B; t = 0.0; k = 0
while t < TOTAL:
    md = mood(t); is_sad = md in ("orman",)
    big = md in ("yukselis","evde","son")
    ch = (sad if is_sad else happy)[k % 4]; mel = (mel_s if is_sad else mel_h)[k % 4]
    add(pad([c+12 for c in ch[1:]], bar+0.6, 0.10 if not big else 0.13), t)
    for b in range(4):
        add(pluck(ch[0] - 12 + (7 if b % 2 else 0), 0.16), t + b*B)
    mt = t
    for (m, d) in mel:
        add(bell(m, d*B, 0.13 if not big else 0.16), mt)
        if big: add(bell(m+12, d*B, 0.05), mt)
        mt += d*B
    if md in ("baslik","gece","son","evde"):  # sparkle arpeggio
        for e in range(8): add(bell(ch[1+e%3]+24, B/2, 0.035), t + e*B/2 + 0.02)
    t += bar; k += 1
out = out[:int(SR*TOTAL)]
# fade in/out
fi = int(SR*1.0); out[:fi] *= np.linspace(0,1,fi); fo = int(SR*3.5); out[-fo:] *= np.linspace(1,0,fo)
# simple reverb (feedback delays)
rev = out.copy()
for d, g in ((0.031,0.35),(0.047,0.3),(0.083,0.22),(0.127,0.15)):
    n = int(d*SR); r = np.zeros_like(out); r[n:] = out[:-n]*g; rev += r
rev /= np.max(np.abs(rev))*1.12
wv = wave.open("audio/music.wav","wb"); wv.setnchannels(1); wv.setsampwidth(2); wv.setframerate(SR)
wv.writeframes((rev*32767).astype(np.int16).tobytes()); wv.close(); print("music ok", len(rev)/SR)
