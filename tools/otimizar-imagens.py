#!/usr/bin/env python3
"""Gera as versoes leves das paginas do cardapio.

Para cada imagem em assets/ cria:
  assets/web/<nome>.webp     (1600 px de largura, para mostrar no tablet)
  assets/thumbs/<nome>.webp  (360 px, para o indice)
As imagens originais ficam como estao e sao usadas ao ampliar.

Uso:  pip install pillow   (uma vez)
      python3 tools/otimizar-imagens.py
"""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"
SIZES = {"web": (1600, 82), "thumbs": (360, 72)}


def main():
    sources = sorted(p for p in ASSETS.iterdir() if p.suffix.lower() in {".jpg", ".jpeg", ".png"})
    for folder in SIZES:
        (ASSETS / folder).mkdir(exist_ok=True)

    for source in sources:
        image = Image.open(source).convert("RGB")
        for folder, (width, quality) in SIZES.items():
            target = ASSETS / folder / f"{source.stem}.webp"
            if target.exists() and target.stat().st_mtime >= source.stat().st_mtime:
                continue
            height = round(image.height * width / image.width)
            image.resize((width, height), Image.LANCZOS).save(target, "WEBP", quality=quality, method=6)
            print(f"{target.relative_to(ROOT)}  {target.stat().st_size // 1024} KB")

    icons = ASSETS / "icons"
    icons.mkdir(exist_ok=True)
    cover = Image.open(ASSETS / "inicio-20260824.jpg").convert("RGB")
    # Recorte quadrado a volta do logotipo da pagina inicial.
    side = round(cover.width * 0.44)
    left = (cover.width - side) // 2
    top = round(cover.height * 0.045)
    square = cover.crop((left, top, left + side, top + side))
    for size in (192, 512):
        square.resize((size, size), Image.LANCZOS).save(icons / f"icon-{size}.png", optimize=True)


if __name__ == "__main__":
    main()
