#!/usr/bin/env python3
"""Sound effects (ElevenLabs sound-generation) and music beds (ElevenLabs music). Key is proxy-injected.
Usage: python3 make_audio.py [sfx|music] [names...]"""
import json, os, sys, time, urllib.request, urllib.error
D = os.path.dirname(os.path.abspath(__file__))
SFX = {
 "alarm": ("alarm siren, pulsing electronic alert, tense", 2.5), "birds": ("morning birds chirping, gentle, peaceful", 6),
 "bonk": ("cartoon bonk, hitting arm on table, short", .8), "brake": ("soft cartoon brake squeak then stop", 1.2),
 "breath": ("one deep calm human breath in and out", 2.5), "bubbles": ("soft magical bubbles rising, gentle fizz", 2.5),
 "button": ("big arcade button press, satisfying click with chime", 1.2), "buzz": ("cartoon wrong answer buzzer, short", 1),
 "calm": ("soft calming warm pad swell, relaxing", 3), "card": ("quick card flip whoosh pop, ui", .7),
 "chime": ("warm magical chime, gentle bell, positive", 1.8), "click": ("satisfying ui click pop", .6),
 "clock_tick": ("clock ticking at night, quiet room", 8), "coaster": ("roller coaster rattling down a drop, wind rush", 5),
 "crack": ("glass heart cracking, sharp crack, emotional", 1.2), "creak": ("old wooden rope bridge creaking", 3),
 "ding": ("bright soft ding notification, science", .9), "down": ("descending sad synth tone, falling", 1.5),
 "dun": ("comedic dun dun sting, mischievous", 1.5), "fire": ("electric spark burst ignition, energetic sparkle zap", 1.5),
 "freeze": ("time freeze effect, reverse whoosh into deep bass hit, slow motion", 1.8), "growl": ("distant predator low growl in grass", 2),
 "grr": ("cartoon jealous grumble, comedic", 1.2), "heart_slow": ("slow calm heartbeat, relaxed", 10),
 "kick": ("kicking a soccer ball, thump", .8), "laugh": ("young man laughing happily, short", 2),
 "lid_clang": ("metal trash can lid clanging on the ground", 1.5), "meow": ("cute calm cat meow", 1.2),
 "mri_hum": ("MRI scanner humming and knocking, medical machine", 8), "mystery": ("mysterious soft synth rise, curiosity, teaser", 5),
 "night": ("quiet city night ambience, distant traffic, crickets", 12), "notif": ("phone notification ping, modern", .8),
 "pop": ("cartoon bubble pop, light", .5), "pump": ("bioluminescent liquid pump surge, whoosh with bass pulse", 1.5),
 "rain": ("steady rain on a city street at night", 12), "rattle": ("trash can lid rattling, something inside moving", 1.5),
 "release": ("tiny sparkling particles released, fizzy magical burst", 2), "ring": ("several phones ringing, retro ringtones overlapping", 2.5),
 "rumble": ("low ominous rumble, prehistoric dusk ambience, wind", 7), "rustle": ("grass rustling, something moving in bushes", 1.5),
 "scan": ("sci-fi scan sweep, digital medical scanner", 1.5), "scream_fun": ("people screaming happily on a roller coaster", 3),
 "slot": ("slot machine spinning reels and jingle", 2.5), "slowmo": ("slow motion whoosh, deep and dreamy", 2),
 "split": ("electric signal splitting in two, zap forking", 1.2), "spray": ("perfume spray mist, two quick sprays", 1),
 "steps_run": ("running footsteps on pavement, short", 1.5), "swell": ("magical whoosh swell rising, glowing", 2),
 "thud": ("deep impact thud, dramatic", .8), "thunder": ("distant thunder rumble, rain", 4),
 "title_hit": ("cinematic logo hit, deep boom with shimmer", 2), "tremble": ("nervous trembling, subtle shaky tremolo", 3),
 "tunnel": ("rushing through a blood vessel, whooshing liquid flow, heartbeat pulse underneath", 10),
 "typing": ("phone typing bubble sound, soft", 1.5), "whisper_fx": ("soft airy whisper swoosh", 1.2),
 "whoosh_long": ("long cinematic whoosh zoom in, accelerating", 1.5), "wind": ("high windy cliff, gusts", 7),
 "zap": ("electric nerve signal zap, quick sci-fi", .7), "zip": ("super fast zip whoosh, speed", .8),
 "boing": ("cartoon boing bounce, cheerful", .8),
}
MUSIC = {
 "m_hook": ("mysterious curious cinematic underscore, soft pulsing synths and plucked arpeggio, building intrigue, science documentary, no vocals", 50),
 "m_curious": ("light curious playful electronic underscore, marimba plucks, soft pads, educational science documentary, steady gentle beat, no vocals", 90),
 "m_love": ("warm romantic dreamy underscore, soft piano and gentle synth pads, light heartbeat-like pulse, tender, no vocals", 80),
 "m_tense": ("tense suspenseful thriller underscore, low pulsing strings and synth drones, ticking percussion, building, no vocals", 110),
 "m_playful": ("quirky playful comedic underscore, pizzicato strings and light percussion, fun, no vocals", 38),
 "m_warm": ("warm tender heartfelt underscore, soft acoustic guitar and piano, gentle strings, comforting, no vocals", 106),
 "m_sad": ("sad melancholic piano underscore, rain mood, slow, gentle strings, no vocals", 55),
 "m_hope": ("hopeful uplifting underscore, piano and strings rising, sunrise feeling, no vocals", 25),
 "m_outro": ("upbeat uplifting optimistic electronic underscore, inspiring, bright plucks and soft drums, positive ending, no vocals", 55),
}
def post(url, body):
    for a in range(4):
        try:
            req = urllib.request.Request(url, data=json.dumps(body).encode(), headers={"Content-Type": "application/json", "xi-api-key": "proxy-injected"})
            with urllib.request.urlopen(req, timeout=600) as r: return r.read()
        except urllib.error.HTTPError as e:
            msg = e.read()[:300]
            if e.code in (429, 500, 502, 503) and a < 3: time.sleep(6 * (a + 1)); continue
            raise RuntimeError(f"{e.code} {msg}")
kind = sys.argv[1]; only = set(sys.argv[2:])
if kind == "sfx":
    for k, (p, d) in SFX.items():
        out = f"{D}/sfx/{k}.mp3"
        if (only and k not in only) or (not only and os.path.exists(out)): continue
        open(out, "wb").write(post("https://api.elevenlabs.io/v1/sound-generation", {"text": p, "duration_seconds": max(.5, min(22, d)), "prompt_influence": .5})); print("sfx", k, flush=True)
else:
    for k, (p, d) in MUSIC.items():
        out = f"{D}/music/{k}.mp3"
        if (only and k not in only) or (not only and os.path.exists(out)): continue
        open(out, "wb").write(post("https://api.elevenlabs.io/v1/music", {"prompt": p, "music_length_ms": int(d * 1000)})); print("music", k, flush=True)
