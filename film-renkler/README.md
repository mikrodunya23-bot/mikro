# 🌈 Pofi ve Çalınan Renkler (Animasyon Film, ~10,5 dk)

Bir sabah Renk Vadisi'nin bütün renkleri kaybolur! Minik bulut **Pofi**, sincap **Fıstık** ve yıldız **Pırıl**,
dört durakta renkleri geri toplar ve sonunda renkleri çalan yalnız kara bulut **Homur**'un sırrını öğrenir.

- 🎬 Film: `out/Pofi_ve_Calinan_Renkler.mp4` (1920×1080, 30 fps, ~10 dk 22 sn)
- 🖼️ Kapak: [`out/kapak_thumbnail.jpg`](out/kapak_thumbnail.jpg)

**Öne çıkanlar:** 6 seslendirilmiş karakter, düşünce balonlu **iç sesler** (yankılı "kafanın içinden" ses efekti),
her mekâna özel **dış mekân sesleri** (kuşlar, yapraklar, ağaçkakan, nehir, kurbağalar, dağ rüzgârı, gök gürültüsü,
kamp ateşi, cırcır böcekleri, baykuş, yağmur), sahnenin duygusuna göre değişen özgün müzik, renk sayacı ve bölüm kartları.

## YouTube yükleme bilgileri

**Başlık:** Pofi ve Çalınan Renkler 🌈 Renkler Kayboldu! | Çocuklar İçin Animasyon Film | Türkçe Masal

**Açıklama:**
> Bir sabah Renk Vadisi uyandığında bütün renkler kaybolmuştu! 😱
> Minik bulut Pofi, cesur sincap Fıstık ve parlak yıldız Pırıl renkleri geri getirmek için büyük bir maceraya atılıyor:
> Fısıldayan Orman 🌳, Coşkun Nehir 🌊, Rüzgârlı Dağ ⛰️ ve kimsenin geri dönmediği Fırtına Kalesi ⛈️!
> Renkleri kim çaldı? Ve neden? Sonunu izleyince çok şaşıracaksın! 💜
>
> Bu film çocuklara arkadaşlığı, cesareti ve yalnız hissedenlere el uzatmayı anlatıyor.
> 👉 Yeni bölümler için ABONE OL ve 🔔 bildirimleri aç!
>
> ⏱️ Bölümler:
> 0:00 Açılış: Renk Vadisi
> 0:39 Renkler kayboldu!
> 1:26 Macera haritası
> 1:44 1. Durak: Fısıldayan Orman
> 3:08 2. Durak: Coşkun Nehir
> 4:49 3. Durak: Rüzgârlı Dağ
> 6:09 Kamp ateşi
> 7:12 4. Durak: Fırtına Kalesi
> 8:54 Gökkuşağı ve büyük kutlama

**Etiketler:** çizgi film, animasyon, çocuk filmi, türkçe çizgi film, masal, uyku masalı, çocuklar için, renkler, gökkuşağı, eğitici çizgi film, okul öncesi, arkadaşlık, pofi

**Önemli ayarlar:**
- "Çocuklara özel: **Evet**" (zorunlu — YouTube Kids politikası)
- Açıklamadaki bölüm zaman damgaları otomatik "chapter" (bölüm) oluşturur → izleyici tutma artar
- Son 20 saniyeye "Bitiş ekranı" ile abone ol düğmesi + bir sonraki video ekleyin

## Büyüme ipuçları
1. **Shorts:** Komik anları (Fıstık'ın "gri fındık" sahnesi, sal sahnesi, dans) 30 sn'lik dikey Shorts olarak paylaş — ana filme trafik getirir.
2. **Seri:** "Pofi ve Dev Kar Tanesi" bitiş kartında duyuruldu — aynı karakterlerle 2–3 haftada bir yeni film.
3. **Oynatma listesi:** "Pofi'nin Maceraları" listesi aç; 1. film "Pofi ve Kayıp Yıldız" ile birlikte koy.

## Yeniden üretme
```bash
python3 make_script.py      # senaryo -> script.json
python3 gen_audio.py        # ElevenLabs v3 Türkçe seslendirme
python3 build_timeline.py   # zamanlama + dudak senkronu
python3 audio_mix.py        # ambiyans + efekt + müzik + ses miksajı -> out/mix.wav
node render.js video 4      # animasyon (4 paralel işçi) -> out/video_noaudio.mp4
./final.sh                  # birleştir -> out/Pofi_ve_Calinan_Renkler.mp4
node render.js thumb        # kapak görseli
```
