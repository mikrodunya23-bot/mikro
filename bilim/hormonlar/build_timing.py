#!/usr/bin/env python3
"""Builds timing.js / timing.json: scene list, line start times (scene-local), scene durations, word times."""
import csv, json, os
D = os.path.dirname(os.path.abspath(__file__))
FPS = 30
rows = {r['id']: r for r in csv.DictReader(open(f"{D}/lines.tsv"), delimiter="\t")}
dur = json.load(open(f"{D}/durations.json"))
words = json.load(open(f"{D}/words.json")) if os.path.exists(f"{D}/words.json") else {}
# scene id, line range (prefix, first, last), lead, tail, extra pre-gaps {line: seconds}
SCENES = [
 ("s00", "s0", 1, 9, 1.2, 2.8, {"s0_07": .5, "s0_08": .4}),
 ("s01", "s1", 1, 9, .5, 3.4, {"s1_04": .3, "s1_06": .3}),
 ("s02a", "s2", 1, 4, .6, .5, {}),
 ("s02b", "s2", 5, 8, 2.6, 1.0, {"s2_06": 1.4, "s2_07": .8, "s2_08": .4}),
 ("s02c", "s2", 9, 12, 1.6, .6, {"s2_11": .4}),
 ("s02d", "s2", 13, 15, .5, 1.0, {}),
 ("s03a", "s3", 1, 3, 1.2, .5, {}),
 ("s03b", "s3", 4, 13, 2.0, .8, {"s3_05": 1.8, "s3_06": .8, "s3_10": .3, "s3_11": .5, "s3_13": .3}),
 ("s03c", "s3", 14, 17, .8, .6, {}),
 ("s03d", "s3", 18, 21, .5, 1.0, {"s3_20": .4}),
 ("s04a", "s4", 1, 5, .8, .8, {"s4_05": .8}),
 ("s04b", "s4", 6, 11, 2.2, 1.2, {"s4_08": .4, "s4_10": .3, "s4_11": .5}),
 ("s04c", "s4", 12, 15, .4, .5, {}),
 ("s04d", "s4", 16, 17, .3, .8, {}),
 ("s05", "s5", 1, 8, 1.5, 1.0, {"s5_04": .3, "s5_06": .5, "s5_07": .6, "s5_08": .8}),
 ("s06", "s6", 1, 8, .6, 4.0, {"s6_05": .4, "s6_06": .3}),
]
GAP = .3
out = {"scenes": {}, "order": [], "words": words}
g0 = 0.0
for sid, pre, a, b, lead, tail, extra in SCENES:
    t = lead; lines = []; prev = None
    for n in range(a, b + 1):
        lid = f"{pre}_{n:02d}"
        if prev is not None:
            g = GAP
            if rows[prev]['text'].rstrip().endswith('?'): g += .18
            if rows[prev]['tone'] != rows[lid]['tone']: g += .08
            t += g
        t += extra.get(lid, 0)
        lines.append({"id": lid, "t": round(t, 3), "d": dur[lid], "text": rows[lid]['text'], "tone": rows[lid]['tone']})
        t += dur[lid]; prev = lid
    total = round(round((t + tail) * FPS) / FPS, 4)
    out["scenes"][sid] = {"dur": total, "start": round(g0, 4), "lines": lines}
    out["order"].append(sid); g0 += total
out["total"] = round(g0, 3)
json.dump(out, open(f"{D}/timing.json", "w"), ensure_ascii=False, indent=1)
open(f"{D}/timing.js", "w").write("window.TIMING = " + json.dumps(out, ensure_ascii=False) + ";\n")
print("total", round(g0, 1), "s =", f"{int(g0//60)}:{g0%60:04.1f}")
for s in out["order"]: print(s, out["scenes"][s]["dur"])
