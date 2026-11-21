# 🌟 Pofi ve Kayıp Yıldız — Özgün Çizgi Film

Minik bulut **Pofi**, sincap **Fıstık** ve gökyüzünden düşen yıldız **Pırıl**'ın dostluk hikâyesi.
Süre: ~68 sn · 1920×1080 · 30 fps · Türkçe seslendirme + altyazı + özgün müzik.

- 🎬 Video: [`out/Pofi_ve_Kayip_Yildiz.mp4`](out/Pofi_ve_Kayip_Yildiz.mp4)
- 🖼️ Kapak (thumbnail): [`out/kapak_thumbnail.jpg`](out/kapak_thumbnail.jpg)

## YouTube yükleme önerisi

**Başlık:** Pofi ve Kayıp Yıldız ⭐ | Çocuklar İçin Uyku Öncesi Masal | Türkçe Çizgi Film

**Açıklama:**
> Gökyüzünün en minik bulutu Pofi, bir gece yıldızları sayarken bir yıldızın eksik olduğunu fark eder!
> Pırıl adındaki minik yıldız ormana düşmüştür. Pofi ve cesur sincap Fıstık, Pırıl'ı evine götürebilecek mi? 🌙
> Bu masal çocuklara yardımlaşmayı ve "küçük olabiliriz ama birlikte kocamanız" mesajını anlatıyor.
> 👉 Yeni bölümler için abone olmayı unutma!

**Etiketler:** çizgi film, çocuk masalları, uyku masalı, türkçe çizgi film, çocuklar için, masal dinle, bulut, yıldız, sincap, eğitici çizgi film, okul öncesi

**Ayarlar:** "Çocuklara özel: Evet" olarak işaretleyin (YouTube Kids politikası gereği zorunlu).

## Büyüme ipuçları
1. **Seri yapın:** Aynı karakterlerle haftada 1–2 bölüm — çocuk kanalları tekrar izlenmeyle büyür.
2. **Uzun derleme:** 10 bölüm birikince 10–15 dk'lık "Tüm Bölümler" videosu yükleyin (izlenme süresi çok artar).
3. **Shorts:** En komik/tatlı 15 saniyeyi dikey kesip Shorts olarak paylaşın.
4. **Kapak:** Büyük yüz + parlak renk + 2–3 kelime (hazır kapak bu kurala uygun).

## Yeniden üretme
```bash
python3 gen_audio.py        # ElevenLabs ile seslendirme (script.json)
python3 build_timeline.py   # zamanlama + dudak senkronu
python3 make_music.py       # özgün müzik kutusu müziği
node render.js video        # animasyon kareleri -> out/video_noaudio.mp4
python3 mix.py              # ses + müzik + efekt karışımı -> final mp4
node render.js thumb        # kapak görseli
```
Hikâyeyi değiştirmek için `script.json`'u, çizimleri değiştirmek için `render.html`'i düzenleyin.
