#!/bin/bash
# Concatenates the scene videos in order and muxes the final mix.
cd "$(dirname "$0")"
python3 -c "import json;[print(f\"file 'out/{s}.mp4'\") for s in json.load(open('timing.json'))['order']]" > concat.txt
ffmpeg -nostdin -v error -y -f concat -safe 0 -i concat.txt -i mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart hormonlar2.mp4
ffprobe -v error -show_entries format=duration,size -of csv=p=0 hormonlar2.mp4
