# REVIEW — Topun Peşinde

- **Yaratıcı kararlar:** A senaryosu (tek plan, top taşıyıcı). Karakterler Three.js ilkel şekillerinden kil görünümüyle yapıldı; konuşma balonları Türkçe, final kart "Yeni bir arkadaş!". B (Yeni Komşu) ve C (İki Uzaylı Çocuk) yapılmadı, `STORYLINES.md`'de duruyor.
- **Ölçülen:** `check` hatasız (lint, layout, contrast). QA kareleri 0 / 3.4 / 7.4 / 10.5 / 13.8 / 17.2 / 22.5 / 25 / 29 sn incelendi.
- **İlk geçişte düzeltilen:** renk yönetimi kapalıydı → her şey soluktu (ColorManagement açıldı); 3.4 sn'de Ela kadraj dışındaydı; Can balonu başına biniyordu; açılış fazla yakındı.
- **Ses:** müzik yok (HeyGen girişi yok); top sekmeleri, atışlar, balonlar ve final için paketli efektler. Ses duyulmadı, yalnız yerleşimi kontrol edildi.
- **Bilinçli tutulan uyarı:** `dead_stretch` — kontrol aracı canvas'taki 3D hareketi göremiyor; sahne sürekli hareketli.
- **En zayıf yer:** alt %25'teki boş çim alanı ve el sallama pozunun kolu başın arkasında kalması. Daha fazla zamanla: kamerayı alçaltıp öne çiçek/çim detayı eklemek, el sallamayı kameraya doğru açmak, gerçek müzik eklemek.
