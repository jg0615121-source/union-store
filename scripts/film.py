"""Film finish for editorial photos (lookbook, journal): fine grain and slightly lifted blacks, so they read less like clean AI renders.

Usage: python3 -I scripts/film.py <in.jpg|png> <out.jpg>
"""
import sys
import numpy as np
from PIL import Image

im = Image.open(sys.argv[1]).convert('RGB')
im.thumbnail((1800, 1800))
a = np.asarray(im).astype(np.float32)
a = 12 + a * (238 / 255)                                  # lift blacks, soften whites
a = a * 0.94 + a.mean(axis=2, keepdims=True) * 0.06       # a touch less saturation
rng = np.random.default_rng(7)
a += rng.normal(0, 5.5, a.shape[:2])[..., None]           # monochrome grain
Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).save(sys.argv[2], quality=86)
