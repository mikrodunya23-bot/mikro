# REVIEW — Kapıdaki Kurye · Bölüm 1

- **Yaratıcı kararlar:** Senaryo 1, panelden panele çizgi roman; 17 panel, 61 sn, ortalama 3.6 sn'de bir kesme. Tüm çizimler kodla (`assets/comic.js`), karakterler ortak parçalardan. Yanlış Masa ve Dedemin Saati yapılmadı (`STORYLINES.md`).
- **Seslendirme:** Piper `tr_TR-dfki-medium` (tek erkek ses). Karakter sesleri perde kaydırma ile: Deniz iç ses 0.94 + hafif yankı, Deniz 0.97, güvenlik 0.86, resepsiyon 1.30, Ece 1.50, asistan 1.28. Whisper ile kontrol edildi: erkek sesler net; kadın sesler anlaşılır ama yapay tınlı. "CEO" Türkçe okunuşla yazdırıldı (Si Ey Oo). Ses kulakla dinlenmedi.
- **Ölçülen:** `check` hatasız. QA kareleri 0–59 sn arası 17 nokta incelendi.
- **Düzeltilenler:** büstlerde kafa çift dönüşümle kadraj dışındaydı; resepsiyonist saçı kel görünüyordu; güvenlik kaşları kep altında kalıyordu; kızgın yüzler gülüyor gibiydi; açılışta tabela kadraj dışındaydı; riser efektinin sessiz kısmı çalıyordu.
- **Bilinçli tutulanlar:** `timeline_track_too_dense` (sahne başına 5–12 klip, okunur durumda).
- **En zayıf yer:** kadın karakter sesleri (perde kaydırma) ve kapıdaki silüet/ön plandaki kafaların basitliği. Müzik yok. Daha fazla zamanla: HeyGen ile doğal kadın sesleri, gerilim müziği, karakterlere el/kol hareketi.
- **Değiştirmek için:** metin/zaman/konum → `tools/build_scenes.py` (sonra `python3 tools/build_scenes.py`); replikler → `tools/lines.tsv` + `bash tools/make_vo.sh`; çizimler → `assets/comic.js`.
