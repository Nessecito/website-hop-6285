from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

root = Path(__file__).parent / 'packages/web/public/brand'
scale = 2
im = Image.new('RGB', (1200 * scale, 630 * scale), '#F3EFE5')
draw = ImageDraw.Draw(im)

def font(name, size):
    value = ImageFont.truetype(str(root / 'assets' / name), size * scale)
    if name.startswith('Cormorant'):
        value.set_variation_by_axes([500])
    return value

def text(pos, value, face, color):
    draw.text((pos[0] * scale, pos[1] * scale), value, font=face, fill=color)

def spaced(pos, value, face, color, gap=3):
    x, y = pos[0] * scale, pos[1] * scale
    for character in value:
        draw.text((x, y), character, font=face, fill=color)
        x += draw.textlength(character, font=face) + gap * scale

serif = font('CormorantGaramond-Variable.ttf', 78)
body = font('Inter-Variable.ttf', 20)
label = font('Inter-Variable.ttf', 15)
draw.rectangle((800 * scale, 0, 1200 * scale, 630 * scale), fill='#343D30')
spaced((72, 70), 'HOUSE OF PULIDO', label, '#292721')
draw.line((72 * scale, 126 * scale, 724 * scale, 126 * scale), fill='#A58B58', width=2)
text((72, 193), 'Everyday clothing,', serif, '#292721')
text((72, 279), 'considered closely.', serif, '#292721')
text((74, 429), 'A family name. A new chapter, made together.', body, '#625E54')
text((74, 506), 'From Fort Worth, with Vanessa & Ryan.', body, '#292721')
mark = Image.open(root / 'assets/monogram-ivory.png').convert('RGBA')
mark = mark.crop(mark.getbbox())
mark.thumbnail((220 * scale, 220 * scale), Image.Resampling.LANCZOS)
im.paste(mark, (1000 * scale - mark.width // 2, 184 * scale), mark)
draw.line((858 * scale, 464 * scale, 1142 * scale, 464 * scale), fill='#A58B58', width=2)
face = font('Inter-Variable.ttf', 13)
caption = 'COME ALONG FOR THE MAKING.'
width = draw.textlength(caption, font=face)
draw.text((1000 * scale - width / 2, 496 * scale), caption, font=face, fill='#F3EFE5')
im.resize((1200, 630), Image.Resampling.LANCZOS).save(root / 'house-of-pulido-og-v1.png', optimize=True)