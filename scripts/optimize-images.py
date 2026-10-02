"""Regenerate responsive portfolio images with Pillow (python3 + Pillow)."""
import json
from pathlib import Path
from PIL import Image, ImageOps

root = Path(__file__).resolve().parents[1]
public = root / 'public'
manifest = {}
sources = sorted((public / 'projects').glob('*/*'))
sources += [public / 'images' / 'hero-light.jpeg', public / 'images' / 'hero-dark.jpeg']
for source in sources:
    if source.suffix.lower() not in {'.png', '.jpeg', '.jpg'}:
        continue
    relative = source.relative_to(public)
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        widths = sorted({min(image.width, w) for w in [320, 640, 960, 1600, image.width]})
        variants = []
        for width in widths:
            target = public / 'media' / relative.parent / f'{source.stem}-{width}.webp'
            target.parent.mkdir(parents=True, exist_ok=True)
            height = round(image.height * width / image.width)
            image.resize((width, height), Image.Resampling.LANCZOS).save(target, 'WEBP', quality=88, method=6)
            variants.append({'src': '/' + str(target.relative_to(public)), 'width': width})
        manifest['/' + str(relative)] = {'width': image.width, 'height': image.height, 'sources': variants}
(root / 'src/data/imageManifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(f'Prepared {len(manifest)} images with responsive WebP sources.')
