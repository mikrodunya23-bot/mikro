"""Filmden dikey YouTube Shorts klipleri üretir (1080x1920, <60 sn)."""
import json, subprocess, os
c = json.load(open("shorts.json"))
c["4_homurun_sirri"][1] = round(c["4_homurun_sirri"][0] + 59.5, 2)
TITLES = {
 "1_renkler_kayboldu": "BÜTÜN RENKLER\nKAYBOLDU!",
 "2_dikenli_cali": "FISTIK DİKENLERE\nDALDI!",
 "3_sal_macerasi": "YAPRAKTAN SALLA\nNEHRİ GEÇTİLER!",
 "4_homurun_sirri": "RENKLERİ\nNEDEN ÇALDI?",
 "5_dans_partisi": "GÖKKUŞAĞI\nPARTİSİ!",
}
FONT = os.path.abspath("fonts/Baloo2-ExtraBold.ttf")
os.makedirs("out/shorts", exist_ok=True)
for name, (a, b) in c.items():
    d = b - a
    tf = f"out/shorts/{name}.txt"; l1, l2 = TITLES[name].split("\n"); open(tf + "1", "w").write(l1); open(tf + "2", "w").write(l2)
    bf = "out/shorts/alt.txt"; open(bf, "w").write("Tam filmi kanalımızda izle!")
    vf = (
        "[0:v]split=2[a][b];"
        "[a]scale=-2:1920,crop=1080:1920,boxblur=30:3,eq=brightness=-0.18:saturation=1.2[bg];"
        "[b]crop=1680:1080,scale=1080:-2[fg];"
        "[bg][fg]overlay=0:(H-h)/2+40[v];"
        f"[v]drawtext=fontfile={FONT}:textfile={tf}1:fontsize=118:fontcolor=#ffe066:borderw=14:bordercolor=#3b1d7a:x=(w-text_w)/2:y=220,"
        f"drawtext=fontfile={FONT}:textfile={tf}2:fontsize=118:fontcolor=#ffe066:borderw=14:bordercolor=#3b1d7a:x=(w-text_w)/2:y=360,"
        f"drawtext=fontfile={FONT}:text='POFİ ve ÇALINAN RENKLER':fontsize=54:fontcolor=white:borderw=8:bordercolor=#3b1d7a:x=(w-text_w)/2:y=110,"
        f"drawtext=fontfile={FONT}:textfile={bf}:fontsize=66:fontcolor=white:box=1:boxcolor=#ff2d4a@0.95:boxborderw=28:x=(w-text_w)/2:y=1400,"
        f"fade=t=in:st=0:d=0.4,fade=t=out:st={d-0.6:.2f}:d=0.6[out]"
    )
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", str(a), "-t", f"{d:.2f}", "-i", "out/Pofi_ve_Calinan_Renkler.mp4",
        "-filter_complex", vf, "-map", "[out]", "-map", "0:a",
        "-af", f"afade=t=in:st=0:d=0.3,afade=t=out:st={d-0.8:.2f}:d=0.8",
        "-c:v", "libx264", "-preset", "medium", "-crf", "21", "-pix_fmt", "yuv420p", "-r", "30",
        "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", f"out/shorts/{name}.mp4"], check=True)
    print(name, f"{d:.1f}s")
for f in os.listdir("out/shorts"):
    if ".txt" in f: os.remove(os.path.join("out/shorts", f))
