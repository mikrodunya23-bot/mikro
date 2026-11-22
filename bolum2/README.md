# ❄️ Pofi ve Dev Kar Tanesi (2. Bölüm, ~10 dk)

Renk Vadisi'ne ilk kar yağarken gökyüzünden dev bir kar tanesi düşer: **Kristal**! Güneş doğmadan evine,
Buz Dağı'nın zirvesine dönemezse eriyecektir. Pofi, Fıstık, Pırıl, Homur ve kendini büyük kaşif sanan penguen
**Buzbaş** zamana karşı yarışır.

- 🎬 Film: `out/Pofi_ve_Dev_Kar_Tanesi.mp4` (1920×1080, 30 fps)
- 🖼️ Kapak: [`out/youtube_kapak_1280x720.jpg`](out/youtube_kapak_1280x720.jpg)
- 📱 Shorts: `out/shorts/` (5 dikey klip)

**Yenilikler:** Ana dili Türkçe seslendirmenler (ElevenLabs Türkçe ses kütüphanesi), Kristal'in güç sayacı (zamana karşı yarış),
iç sesler, kış ambiyansları (kar çıtırtısı, buz pateni, çatlayan buz, tipi, mağara damlaları ve yankı), kızak çanlı müzik.

## YouTube

**Başlık:** Pofi ve Dev Kar Tanesi ❄️ Güneş Doğmadan Eve Dönebilecek mi? | Çocuklar İçin Animasyon | Türkçe Çizgi Film

**Açıklama:**
```
Renk Vadisi'ne ilk kar yağıyor! ❄️ Ama gökyüzünden dev bir kar tanesi düşüyor: Kristal!

Kristal, güneş doğmadan Buz Dağı'nın zirvesindeki evine dönemezse eriyip yok olacak! 😱 Pofi, Fıstık, Pırıl ve Homur, kendini büyük kaşif sanan komik penguen Buzbaş'la birlikte zamana karşı yarışıyor: Donmuş Göl 🧊, Karlı Orman 🌲, Buz Mağarası 💎 ve Buz Dağı Zirvesi 🏔️!

Kristal'i zamanında eve götürebilecekler mi? Sonunda öyle bir sürpriz var ki... 💜

Bu bölüm çocuklara arkadaşlığı, dürüstlüğü ve asla pes etmemeyi anlatıyor. Okul öncesi ve ilkokul çağındaki çocuklar için uygundur.

👉 Pofi'nin yeni maceralarını kaçırmamak için ABONE OL!
📺 1. bölüm "Pofi ve Çalınan Renkler" kanalımızda!

⏱️ BÖLÜMLER
0:00 Önceki bölümde
0:19 İlk kar ve kartopu savaşı
2:16 Gökyüzü yolculuğu
2:53 1. Durak: Donmuş Göl
4:23 2. Durak: Karlı Orman
5:44 3. Durak: Buz Mağarası
6:50 4. Durak: Buz Dağı Zirvesi
8:36 Kardan adam ve kızak partisi

🎭 KARAKTERLER
☁️ Pofi – Minik ama cesur bulut
🐿️ Fıstık – Fındık meraklısı komik sincap
⭐ Pırıl – Parlak yıldız
🌈 Homur – Artık rengârenk olan kocaman bulut
❄️ Kristal – Kar Bulutları'nın en küçük kızı
🐧 Buzbaş – Kendini büyük kaşif sanan penguen

✨ Sıradaki macera: Pofi ve Kayıp Hazine Haritası – Çok yakında!

#çizgifilm #çocukmasalları #animasyon
```

**Etiketler:**
```
çizgi film, animasyon, çocuk filmi, türkçe çizgi film, kar tanesi, kış masalı, penguen, kardan adam, masal, uyku masalı, çocuk masalları, çocuklar için, okul öncesi, eğitici çizgi film, arkadaşlık, pofi, pofi ve dev kar tanesi, minik dünya, kış çizgi filmi, kar
```

**Ayarlar:** Çocuklara özel: Evet · Oynatma listesi: "Pofi'nin Maceraları" (1. bölümle birlikte)

## Shorts başlıkları
1. Kartopu savaşında gökyüzünden dev kar tanesi düştü! ❄️ #shorts #çizgifilm
2. Dünyanın en büyük kaşifi geldi... kafa üstü! 🐧😂 #shorts
3. Buz çatlıyor! Fıstık kurtulabilecek mi? 😱 #shorts #çizgifilm
4. Mağarada "Fındııık!" diye bağırınca... 🐿️ #shorts
5. İki bulut birleşince dev kar bulutu oldu! ☁️❄️ #shorts #masal

## Yeniden üretme
```bash
python3 make_script.py && python3 gen_audio.py && python3 build_timeline.py
python3 audio_mix.py            # -> out/mix.wav
node render.js video 4          # -> out/video_noaudio.mp4
ffmpeg ... (bkz. final adımı)   # birleştir
python3 make_shorts.py          # Shorts
```
