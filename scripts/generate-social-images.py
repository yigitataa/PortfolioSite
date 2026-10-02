"""Generate social preview images from the existing project screenshots."""
import json
from pathlib import Path
from textwrap import wrap
from PIL import Image, ImageDraw, ImageFont, ImageOps

root = Path(__file__).resolve().parents[1]
public = root / 'public'
entries = json.loads((root / 'src/data/projectEntries.json').read_text())
font_path = '/System/Library/Fonts/Supplemental/Arial.ttf'
heading = ImageFont.truetype(font_path, 62)
body = ImageFont.truetype(font_path, 28)
small = ImageFont.truetype(font_path, 23)
items = [{'slug':'portfolio', 'title':'Yiğit Ata', 'subtitle':'Bilgisayar Mühendisliği Öğrencisi', 'cover':{'src':'/images/hero-dark.jpeg'}}] + entries
(public / 'social').mkdir(exist_ok=True)
for item in items:
    canvas = Image.new('RGB', (1200,630), '#171c27')
    draw = ImageDraw.Draw(canvas)
    with Image.open(public / item['cover']['src'].lstrip('/')) as img:
        preview = ImageOps.contain(ImageOps.exif_transpose(img).convert('RGB'), (610,490))
        canvas.paste(preview, (560+(610-preview.width)//2, 70+(490-preview.height)//2))
    draw.text((55,70), 'YİĞİT ATA / PORTFÖY', font=small, fill='#b8dbf5')
    y=180
    for line in wrap(item['title'], 15):
        draw.text((55,y),line,font=heading,fill='#f5f7fa'); y+=76
    y+=20
    for line in wrap(item['subtitle'], 28):
        draw.text((55,y),line,font=body,fill='#b7c0ce'); y+=38
    draw.text((55,550), 'React · API · Veri', font=small, fill='#b8dbf5')
    canvas.save(public / 'social' / (item['slug']+'.png'), optimize=True)
print(f'Generated {len(items)} social previews.')
