#!/bin/bash
# Renders every scene (or the ones given) to out/<scene>.mp4 (video only), 3 at a time.
cd "$(dirname "$0")"; mkdir -p out cues
FR=${FRAMES:-/tmp/claude-0/-home-user-mikro/9cfc9a99-59c4-5158-b9e2-db015da2c2f3/scratchpad/frames_h2}
SCENES=${@:-$(python3 -c "import json;print(' '.join(json.load(open('timing.json'))['order']))")}
run() { s=$1; rm -rf "$FR/$s"; node render.cjs $s "$FR/$s" cues/$s.json && ffmpeg -nostdin -v error -y -framerate 30 -i "$FR/$s/f%05d.jpg" -c:v libx264 -preset medium -crf 20 -pix_fmt yuv420p out/$s.mp4 && rm -rf "$FR/$s" && echo "done $s"; }
export -f run; export FR
printf "%s\n" $SCENES | xargs -P 3 -I{} bash -c 'run {}'
