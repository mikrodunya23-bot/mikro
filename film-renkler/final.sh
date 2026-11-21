#!/bin/bash
# Görüntü + ses birleştirme (YouTube standardı -14 LUFS)
set -e
cd "$(dirname "$0")"
ffmpeg -y -v error -i out/video_noaudio.mp4 -i out/mix.wav -map 0:v -map 1:a -c:v copy \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:a aac -b:a 192k -ar 44100 -shortest -movflags +faststart \
  out/Pofi_ve_Calinan_Renkler.mp4
ffprobe -v error -show_entries format=duration,size -of default=nw=1 out/Pofi_ve_Calinan_Renkler.mp4
