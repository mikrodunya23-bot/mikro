# Aşk, Korku, Heyecan — yapım dosyaları

Mikro Dünya bilim videosu: dopamin, adrenalin ve oksitosin (~9,7 dk, 1920x1080, 30 fps).
Senaryo: `../SENARYO.md`.

## Akış

| Adım | Komut | Çıktı |
|---|---|---|
| Satırlar | (senaryodan çıkarıldı) | `lines.tsv` — id, ton, metin |
| Seslendirme | `python3 make_vo.py [id...]` | `vo/*.wav`, `durations.json` (ElevenLabs v3, Celil sesi, tona göre etiket/tempo/seviye) |
| Kelime zamanları | whisper (small) | `words.json` |
| Zamanlama | `python3 build_timing.py` | `timing.js/json` — sahne listesi, satır başlangıçları, süreler |
| Ses efekti, müzik | `python3 make_audio.py sfx` / `music` | `sfx/*.mp3`, `music/*.mp3` |
| Sahne önizleme | `node snap.cjs <sahne> <klasör> t1 t2 …` | PNG kareler |
| Render | `./render_all.sh [sahne…]` | `out/<sahne>.mp4`, `cues/<sahne>.json` |
| Miks | `python3 mix.py` | `mix.wav` |
| Birleştirme | `./final.sh` | `hormonlar.mp4` |

## Yapı

- `player.html?scene=<id>` bir sahneyi yükler; `window.seek(t)` ile kare kare çizilir.
- `lib/core.js` zamanlama (`T`, `E`, `Wt` = kelime zamanı), kamera, geçişler, altyazı, efekt listesi.
- `lib/chars.js` Ahmet, Meryem, kedi; `lib/anat.js` beyin (yandan), sinaps, röntgen gövde, damar tüneli, moleküller; `lib/sets.js` mekânlar.
- `scenes/s00.js … s06.js` her bölümün animasyonu.
- Renk kodu: dopamin sarı, adrenalin kırmızı, oksitosin pembe, kortizol turuncu, sinir sinyali açık mavi.
