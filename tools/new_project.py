"""Start a new project: adds a row to the table and opens a photo folder for it.

    npm run new -- "Feelings in Common"
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from lib import PHOTOS_DIR, read_csv, write_csv, slugify, CSV_PATH

title = ' '.join(sys.argv[1:]).strip()
if not title:
    sys.exit('Serginin adını yaz: npm run new -- "Serginin Adı"')

rows = read_csv()
slug = slugify(title)
if any(r['slug'] == slug for r in rows):
    sys.exit(f'Bu isimde bir proje zaten var: {slug}')

rows.insert(0, {
    'order': '0', 'slug': slug, 'title': title,
    'venue': '', 'year': '', 'role': '', 'summary': '', 'description': '',
})
for i, row in enumerate(rows, 1):
    row['order'] = str(i)
write_csv(rows)

folder = PHOTOS_DIR / slug
folder.mkdir(parents=True, exist_ok=True)

print(f'Eklendi: {title}')
print(f'  1. Fotoğrafları buraya at:  studio/photos/{slug}/')
print(f'  2. Tabloyu doldur:          {CSV_PATH.name} (en üstteki satır)')
print( '  3. Sonra:                   npm run publish')
