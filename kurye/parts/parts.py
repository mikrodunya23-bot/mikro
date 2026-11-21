"""Part plan for TikTok / Instagram: cut points (seconds in the full episode), recap and comment question."""
PARTS = [
    dict(n=1, a=0.0, b=154.4, recap=None, q="SENCE CEM NEDEN KILIK DEĞİŞTİRECEK?", cta="c1"),
    dict(n=2, a=154.4, b=280.0, recap="ÖNCEKİ BÖLÜMDE: CEM 20 YIL SONRA İSTANBUL'A DÖNDÜ.", q="KURYE KILIĞI İYİ BİR FİKİR Mİ?", cta="c2"),
    dict(n=3, a=280.0, b=382.1, recap="ÖNCEKİ BÖLÜMDE: CEM KURYE KILIĞINA GİRDİ.", q="ERCÜMENT'E NE CEZA VERİLMELİ?", cta="c3"),
    dict(n=4, a=382.1, b=479.1, recap="ÖNCEKİ BÖLÜMDE: CEM LOBİDE YERE İTİLDİ, ECE YARDIM ETTİ.", q="ECE'NİN BİR SIRRI MI VAR? TAHMİNİNİ YAZ!", cta="c4"),
    dict(n=5, a=479.1, b=606.2, recap="ÖNCEKİ BÖLÜMDE: CEM YAĞMURDA KAPIDA BEKLETİLDİ.", q="CEM İLE ECE BİRBİRİNE AŞIK MI OLUYOR?", cta="c5"),
    dict(n=6, a=606.2, b=714.2, recap="ÖNCEKİ BÖLÜMDE: CEM VE ECE ÇATIDA SİMİT PAYLAŞTI.", q="SENCE CEM KİMLERİ KOVACAK?", cta="c6"),
    dict(n=7, a=714.2, b=855.4, recap="ÖNCEKİ BÖLÜMDE: CEM TAKIM ELBİSEYLE GERİ DÖNDÜ.", q="2. SEZONDA NE OLSUN? YORUMLARA YAZ!", cta="c7", final=True),
]
CARD = 6.5  # seconds per end card
