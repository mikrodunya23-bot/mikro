# REVIEW — Kapıdaki Kurye · Bölüm 1

- **Yaratıcı kararlar:** Senaryo 1, panelden panele çizgi roman; 17 panel, 61 sn, ortalama 3.6 sn'de bir kesme. Tüm çizimler kodla (`assets/comic.js`), karakterler ortak parçalardan. Yanlış Masa ve Dedemin Saati yapılmadı (`STORYLINES.md`).
- **Seslendirme (v2):** ElevenLabs `eleven_v3`, duygu etiketli (`tools/lines_eleven.tsv`). Deniz = Callum (iç ses + hafif yankı), resepsiyon = Lily, güvenlik = Harry, Ece = Sarah, asistan = Matilda. Ücretsiz plan: yalnız hazır (İngilizce kökenli) sesler; Türkçe kütüphane sesleri ücretli plan ister. Whisper 16 repliğin hepsini doğru çözdü; aksan kulakla kontrol edilmedi. Sahne süreleri artık ses sürelerinden hesaplanıyor (`tools/build_scenes.py`), toplam 68.5 sn. Eski Piper sürümü: `tools/make_vo.sh`.
- **Ölçülen:** `check` hatasız. QA kareleri 0–59 sn arası 17 nokta incelendi.
- **Düzeltilenler:** büstlerde kafa çift dönüşümle kadraj dışındaydı; resepsiyonist saçı kel görünüyordu; güvenlik kaşları kep altında kalıyordu; kızgın yüzler gülüyor gibiydi; açılışta tabela kadraj dışındaydı; riser efektinin sessiz kısmı çalıyordu.
- **Bilinçli tutulanlar:** `timeline_track_too_dense` (sahne başına 5–12 klip, okunur durumda).
- **En zayıf yer:** kadın karakter sesleri (perde kaydırma) ve kapıdaki silüet/ön plandaki kafaların basitliği. Müzik yok. Daha fazla zamanla: HeyGen ile doğal kadın sesleri, gerilim müziği, karakterlere el/kol hareketi.
- **Değiştirmek için:** metin/zaman/konum → `tools/build_scenes.py` (sonra `python3 tools/build_scenes.py`); replikler → `tools/lines.tsv` + `bash tools/make_vo.sh`; çizimler → `assets/comic.js`.
