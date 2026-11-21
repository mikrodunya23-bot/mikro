#!/usr/bin/env python3
"""Ambience loops and action sound effects with ElevenLabs sound generation.
Usage (from kurye/): python3 ep/make_amb.py [names...]  -> ep/amb/<name>.mp3, ep/sfx/<name>.mp3"""
import json, os, subprocess, sys, tempfile, time, urllib.request, urllib.error

EP = os.path.dirname(os.path.abspath(__file__))
AMB = {  # name: (prompt, seconds) — looped quietly under scenes
    "rain_city": ("steady night rain on city pavement, distant traffic hiss, no music, ambience loop", 20),
    "hospital": ("quiet hospital room at night, soft slow heart monitor beeps, air conditioning hum, ambience", 20),
    "funeral_rain": ("rain falling on black umbrellas outdoors, soft wind, sombre quiet crowd, ambience", 20),
    "office_london": ("quiet office at night, rain on window glass, soft keyboard typing, computer hum, ambience", 20),
    "airport": ("airport terminal ambience, distant announcements murmur, rolling suitcases, crowd murmur", 20),
    "lobby": ("large marble corporate lobby, people murmuring, footsteps echoing, distant phone ringing, ambience", 20),
    "tea_garden": ("seaside tea garden by the Bosphorus, seagulls, gentle waves, tea glasses clinking, distant ferry horn", 20),
    "street": ("busy Istanbul street, motor scooters passing, car horns in distance, pedestrians, ambience", 20),
    "shop": ("small quiet stationery shop, tape being pulled, paper rustling, street muffled outside", 15),
    "stairwell": ("empty concrete stairwell, echoing footsteps and heavy breathing, ventilation hum", 15),
    "rooftop": ("rooftop at sunset, gentle wind, distant city traffic far below, birds, ambience", 20),
    "office": ("modern office floor, air conditioning hum, quiet typing, muffled conversations, ambience", 20),
    "alley_night": ("night alley behind a building, water dripping after rain, distant city, a far dog bark", 20),
    "boardroom": ("quiet executive boardroom, soft air conditioning hum, chairs creaking, tense silence", 20),
}
SFX = {
    "flatline": ("hospital heart monitor flatline long beep", 4),
    "phone_ring": ("modern smartphone ringing twice", 3),
    "scooter": ("small motorbike engine starting and driving away", 4),
    "crowd_laugh": ("small group of office people laughing mockingly", 3),
    "papers": ("papers scattering and falling on a marble floor", 2.5),
    "coffee": ("coffee splashing onto a jacket", 1.5),
    "gasp": ("small crowd gasping in shock", 2),
    "door_open": ("heavy double doors of a boardroom swinging open", 2.5),
    "body_fall": ("a person falling hard on a marble floor with a helmet rolling", 2.5),
    "elevator_ding": ("elevator arrival ding and doors sliding open", 2.5),
    "heels": ("confident high heels walking on marble floor", 3),
}
only = set(sys.argv[1:])


def gen(prompt, secs):
    body = json.dumps({"text": prompt, "duration_seconds": secs, "prompt_influence": 0.45}).encode()
    for attempt in range(4):
        try:
            req = urllib.request.Request("https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128", data=body,
                                         headers={"Content-Type": "application/json", "xi-api-key": "proxy-injected"})
            with urllib.request.urlopen(req, timeout=180) as r:
                return r.read(), r.headers.get("character-cost")
        except urllib.error.HTTPError as e:
            if e.code in (429, 500, 502, 503) and attempt < 3:
                time.sleep(5 * (attempt + 1)); continue
            raise RuntimeError(f"{e.code} {e.read()[:300]}")


for group, table, norm in (("amb", AMB, "loudnorm=I=-24:TP=-3"), ("sfx", SFX, "loudnorm=I=-18:TP=-2")):
    os.makedirs(os.path.join(EP, group), exist_ok=True)
    for name, (prompt, secs) in table.items():
        dst = os.path.join(EP, group, name + ".mp3")
        if (only and name not in only) or (not only and os.path.exists(dst)):
            continue
        data, cost = gen(prompt, secs)
        with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as tmp:
            tmp.write(data)
        subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-i", tmp.name, "-af", norm, "-ar", "48000", "-ac", "2", "-b:a", "160k", dst], check=True)
        os.unlink(tmp.name)
        print(group, name, secs, "s cost", cost, flush=True)
