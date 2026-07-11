#!/usr/bin/env python3
"""Optimize a photo into a NOVA CAFE menu thumbnail.

Usage:
    python3 tools/optimize-menu-photo.py <source-photo> "<Item Name>"

Example:
    python3 tools/optimize-menu-photo.py ~/Desktop/spanish.jpg "Spanish Latte"
    -> writes images/menu/spanish-latte.webp (600x800 WebP, ~15-35 KB)

The output filename is the kebab-case item name, which is exactly what
menu.js expects (img: "images/menu/<kebab-name>.webp"). If you are
replacing an existing photo, keep the same item name and no code change
is needed at all. Originals are never committed - keep them wherever
they are; only the .webp output belongs in git.
"""
import re
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is required: python3 -m pip install Pillow")

TARGET_W, TARGET_H = 600, 800   # portrait; the card crops to 4:3 via CSS
QUALITY = 74                     # WebP quality (site convention: 72-75)
SIZE_BUDGET_KB = 35              # warn above this


def main() -> None:
    if len(sys.argv) != 3:
        sys.exit(__doc__)

    src = Path(sys.argv[1]).expanduser()
    if not src.exists():
        sys.exit(f"Source not found: {src}")

    slug = re.sub(r"[^a-z0-9]+", "-", sys.argv[2].lower()).strip("-")
    repo = Path(__file__).resolve().parent.parent
    dest = repo / "images" / "menu" / f"{slug}.webp"

    im = Image.open(src).convert("RGB")

    # Cover-crop to 3:4 around the center, then resize to 600x800.
    scale = max(TARGET_W / im.width, TARGET_H / im.height)
    im = im.resize((round(im.width * scale), round(im.height * scale)), Image.LANCZOS)
    x = (im.width - TARGET_W) // 2
    y = (im.height - TARGET_H) // 2
    im = im.crop((x, y, x + TARGET_W, y + TARGET_H))

    existed = dest.exists()
    im.save(dest, "WEBP", quality=QUALITY, method=6)

    kb = dest.stat().st_size // 1024
    action = "Replaced" if existed else "Created"
    print(f"{action}: {dest.relative_to(repo)}  ({TARGET_W}x{TARGET_H}, {kb} KB)")
    if kb > SIZE_BUDGET_KB:
        print(f"  note: {kb} KB is above the {SIZE_BUDGET_KB} KB budget - busy photo; acceptable if it looks good.")
    if not existed:
        print(f'  next: point the item in menu.js at  img: "images/menu/{slug}.webp"')
    print("  then: git add + commit + push origin main (push = deploy, ~1 min)")


if __name__ == "__main__":
    main()
