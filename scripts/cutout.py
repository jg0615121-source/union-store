"""Cut garments out of product photos and save them as transparent 4:5 WebP for the site.

Usage: python3 -I scripts/cutout.py <folder with .png/.jpg> src/assets/photos
Needs: pip install "rembg[cpu]" (downloads the isnet-general-use model on first run).
"""
import glob, os, sys
from PIL import Image
from rembg import remove, new_session

src, out = sys.argv[1], sys.argv[2]
session = new_session('isnet-general-use')
for f in sorted(glob.glob(os.path.join(src, '*.png')) + glob.glob(os.path.join(src, '*.jpg'))):
    im = remove(Image.open(f).convert('RGB'), session=session, post_process_mask=True)
    im = im.crop(im.getbbox())
    # Same framing for every product: the garment fills about 86% of a 4:5 canvas.
    w, h = im.size
    H = int(max(h / 0.86, w * 1.25 / 0.86)); W = int(H * 0.8)
    canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    canvas.paste(im, ((W - w) // 2, (H - h) // 2), im)
    name = os.path.splitext(os.path.basename(f))[0]
    canvas.resize((1200, 1500)).save(os.path.join(out, name + '.webp'), 'WEBP', quality=88, method=6)
    print(name)
