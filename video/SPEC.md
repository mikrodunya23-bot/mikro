# SPEC — Topun Peşinde

GOAL:    Çocuk izleyici iki çocuğun tek bir top sayesinde arkadaş olduğunu görür ve gülümseyerek el sallar.
OUTPUT:  HyperFrames, 1080 x 1920 (9:16), 30 fps
TIME:    30 s x 30 fps = 900 frames. Müzik yok (HeyGen girişi yok); ses = top/atış efektleri.
LOOK:    Three.js kil-oyuncak dünya. Gökyüzü #7cc8f2 → #fff4dc ufuk; çim #86c95f; patika #e9d3a6.
         Ela: sarı elbise #ffc93c, kahverengi saç #6b3e26, iki at kuyruğu, kırmızı top #e8443a.
         Can: mavi tişört #3d8bd9, lacivert şort #2b3e6b, koyu kıvırcık saç #2e2018.
         Malzeme: MeshStandard roughness 0.8 + 2% kil bump gürültüsü. Sıcak key ışık #ffe2b8 sol üstten,
         soğuk rim #bfe0ff arkadan, yumuşak gölge (PCFSoft, 2048).
         Yazı: Nunito 900, konuşma balonu 66 px, final başlık 132 px; mürekkep #3b2416, balon #fffaf0, 6 px kenar.
         Vurgu rengi (top kırmızısı) yalnız top ve final başlığın "arkadaş!" kelimesinde.
OBJECTS: Top: kırmızı, beyaz şeritli, yere değince sıkışır. Salıncak: iki A ayak + üst boru + ip + oturak.
         Ağaçlar (gövde + 3 küre yaprak), çalılar, çiçekler, bulutlar.
MOTION:  Karakter: kafa önce, kollar 0.1–0.2 s sonra; zıplamalar 0.38 s sin yay; balonlar back.out(2.2) 0.35 s;
         kamera smooth in-out, kesme yok (tek plan).
SHOTS:   0–2.9   Yakın plan: Ela gülerek top sektiriyor (top kadrajın ~%25'i) · pop'lar
         2.9–7.0 Ela topa vurur, top seke seke kaçar, Ela şaşırır ve koşar; kamera geri çekilip takip eder · whoosh
         7.0–8.6 Top yalnız duran Can'ın ayağında durur; Can eğilip alır
         8.6–12.4 İkisi utangaç: başlar öne, Ela elleri arkada, göz kaçamakları; kamera yavaşça yaklaşır
         12.4–14.6 Can gülümser, topu atar; Ela yakalar, sevinçle zıplar · whoosh
         14.6–21 Pas oyunu (4 atış), gülüşler, kamera hafif yay çizer · whoosh'lar
         21–26.2 Ela topu bırakır; balon "Merhaba, ben Ela!" (21.6–24.2), "Ben de Can!" (24.2–26.6) · pop
         26.2–30 İkisi el sallar, kamera yükselir, başlık "Yeni bir / arkadaş!" iner ve tutar · sparkle
BANNED:  koyu boşluk zemin, glow/particle, mor-mavi gradyan, her şeyin fade+slide up girmesi,
         köşeye yapıştırılmış logo, hareket ederken okunan yazı, aynı anda aynı eğriyle hareket eden kollar.
QA:      0.0 (thumbnail: top + Ela yüzü), 3.4 (kaçan top), 7.4 (Can), 10.5 (utangaç an),
         13.8 (yakalama), 17.2, 22.5 (balon), 25 (balon), 29 (final kart).
