#!/usr/bin/env python3
"""timing.js / timing.json for v2: scenes, line starts (scene-local), durations, word times, mouth envelopes."""
import csv, json, os
D = os.path.dirname(os.path.abspath(__file__)); FPS = 30
rows = {r['id']: r for r in csv.DictReader(open(f"{D}/lines.tsv"), delimiter="\t")}
order = list(rows)
dur = json.load(open(f"{D}/durations.json"))
EGE = {"Miyav!": .9, "Miyav.": .9, "HHHHSSSS!": 1.1}
for k, r in rows.items():
    if r['who'] == 'ege': dur[k] = EGE.get(r['text'], 1.0)
words = json.load(open(f"{D}/words.json")) if os.path.exists(f"{D}/words.json") else {}
env = json.load(open(f"{D}/env.json")) if os.path.exists(f"{D}/env.json") else {}
# scene, first line, last line, lead, tail, extra pre-gaps
SCENES = [
 ("v0", "h0_01", "h0_05", 1.6, 2.6, {"h0_04": .3}),
 ("v1", "h1_01", "h1_03", 2.8, .6, {"h1_01": 0}),
 ("v2", "h1_04", "h1_08", 1.2, .6, {"h1_06": .2}),
 ("v3", "h1_09", "h1_12", 1.4, .8, {"h1_12": .9}),
 ("v4", "h2_01", "h2_08", 1.6, .4, {"h2_03": .2, "h2_04": .9, "h2_05": 1.2}),
 ("v5", "h2_09", "h2_13", .5, .9, {"h2_10": .2, "h2_11": .3}),
 ("v6", "h2_14", "h2_18", .6, .9, {"h2_14": .3}),
 ("v7", "h3_01", "h3_05", 1.2, 1.0, {"h3_04": .3}),
 ("v8", "h4_01", "h4_07", 1.2, .8, {"h4_02": .6, "h4_04": .3, "h4_05": .8}),
 ("v9", "h5_01", "h5_08", 1.6, .8, {"h5_03": .6, "h5_06": 1.4}),
 ("v10", "h6_01", "h6_08", .6, 3.6, {"h6_07": .3}),
]
GAP = .2
out = {"scenes": {}, "order": [], "words": words, "env": env}; g0 = 0.0
for sid, a, b, lead, tail, extra in SCENES:
    ids = order[order.index(a): order.index(b) + 1]
    t = lead; lines = []; prev = None
    for lid in ids:
        if prev is not None:
            g = GAP + (.12 if rows[prev]['text'].rstrip().endswith('?') else 0) + (.12 if rows[prev]['who'] != rows[lid]['who'] else 0)
            t += g
        t += extra.get(lid, 0)
        lines.append({"id": lid, "t": round(t, 3), "d": dur[lid], "who": rows[lid]['who'], "tone": rows[lid]['tone'], "text": rows[lid]['text']})
        t += dur[lid]; prev = lid
    total = round(round((t + tail) * FPS) / FPS, 4)
    out["scenes"][sid] = {"dur": total, "start": round(g0, 4), "lines": lines}; out["order"].append(sid); g0 += total
out["total"] = round(g0, 3)
json.dump(out, open(f"{D}/timing.json", "w"), ensure_ascii=False, indent=1)
open(f"{D}/timing.js", "w").write("window.TIMING = " + json.dumps(out, ensure_ascii=False) + ";\n")
print("total", round(g0, 1), f"= {int(g0 // 60)}:{g0 % 60:04.1f}")
for s in out["order"]: print(s, out["scenes"][s]["dur"])
