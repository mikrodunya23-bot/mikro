#!/usr/bin/env python3
"""Generates the music bed locally with MusicGen (facebook/musicgen-small, CPU).
One ~30 s seed clip per prompt; the build step loops it to the film length.
Usage: python3 tools/make_music.py [seconds]"""
import os, sys
import numpy as np, soundfile as sf, torch
from transformers import AutoProcessor, MusicgenForConditionalGeneration

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECS = float(sys.argv[1]) if len(sys.argv) > 1 else 28
PROMPT = ("dark suspenseful cinematic underscore for a mystery drama, pulsing low strings, "
          "soft melancholic piano motif, subtle ticking percussion, steady 90 bpm, no vocals")
torch.manual_seed(23)
proc = AutoProcessor.from_pretrained("facebook/musicgen-small")
model = MusicgenForConditionalGeneration.from_pretrained("facebook/musicgen-small")
inputs = proc(text=[PROMPT], padding=True, return_tensors="pt")
tokens = int(SECS * model.config.audio_encoder.frame_rate)
with torch.no_grad():
    audio = model.generate(**inputs, do_sample=True, guidance_scale=3.0, max_new_tokens=tokens)
sr = model.config.audio_encoder.sampling_rate
wav = audio[0, 0].cpu().numpy().astype(np.float32)
os.makedirs(os.path.join(ROOT, "assets", "bgm"), exist_ok=True)
out = os.path.join(ROOT, "assets", "bgm", "seed.wav")
sf.write(out, wav, sr)
print(out, len(wav) / sr, "s @", sr)
