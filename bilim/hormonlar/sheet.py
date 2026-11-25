import sys, glob
from PIL import Image
fs = sorted(glob.glob(sys.argv[1] + '/*.png')); cols = int(sys.argv[3]) if len(sys.argv) > 3 else 3
w = 1920 // cols * 1; h = w * 9 // 16
rows = (len(fs) + cols - 1) // cols
sh = Image.new('RGB', (w * cols, h * rows))
for i, f in enumerate(fs): sh.paste(Image.open(f).resize((w, h)), ((i % cols) * w, (i // cols) * h))
sh.save(sys.argv[2], quality=85); print(len(fs), 'frames')
