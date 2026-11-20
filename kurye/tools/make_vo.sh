#!/usr/bin/env bash
# Generates every voice line with Piper (tr_TR-dfki-medium) and derives the
# character voices by pitch-shifting. Run from the project root:
#   bash tools/make_vo.sh
set -euo pipefail
MODEL="${PIPER_MODEL:-/root/piper/tr_TR-dfki-medium.onnx}"
OUT=assets/vo
TMP=$(mktemp -d)
mkdir -p "$OUT"
tail -n +2 tools/lines.tsv | while IFS=$'\t' read -r id voice text; do
  case "$voice" in
    deniz_vo)   ls=1.12; af="rubberband=pitch=0.94,aecho=0.6:0.5:40:0.12" ;;  # inner voice: lower, slower, slight room
    deniz)      ls=1.05; af="rubberband=pitch=0.97" ;;
    guvenlik)   ls=1.0; af="rubberband=pitch=0.86,volume=1.2" ;;
    resepsiyon) ls=1.05; af="rubberband=pitch=1.30" ;;
    ece)        ls=1.02; af="rubberband=pitch=1.50" ;;
    asistan)    ls=1.05; af="rubberband=pitch=1.28" ;;
  esac
  echo "$text" | python3 -m piper -m "$MODEL" --length-scale "$ls" -f "$TMP/$id.wav" >/dev/null 2>&1
  ffmpeg -nostdin -v error -y -i "$TMP/$id.wav" -af "$af,silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,loudnorm=I=-16:TP=-1.5" -ar 48000 -ac 1 -b:a 160k "$OUT/$id.mp3"
  printf "%s\t%s\t%.2f\n" "$id" "$voice" "$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$OUT/$id.mp3")"
done
rm -rf "$TMP"
