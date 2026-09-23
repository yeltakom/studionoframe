"""Start a new exhibition: opens its folder with a sergi.txt to fill in.

    npm run new -- "Feelings in Common"
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from lib import STUDIO_DIR, INFO_NAME, slugify, render_info, empty_info

title = ' '.join(sys.argv[1:]).strip()
if not title:
    sys.exit('Serginin adını yaz: npm run new -- "Serginin Adı"')

slug = slugify(title)
folder = STUDIO_DIR / slug
if folder.exists():
    sys.exit(f'Bu klasör zaten var: studio/sergiler/{slug}/')
folder.mkdir(parents=True)
info = empty_info()
info['title'] = title
(folder / INFO_NAME).write_text(render_info(info))

print(f'Açıldı: studio/sergiler/{slug}/')
print(f'  1. Fotoğrafları bu klasöre at (ilk fotoğraf ya da "kapak.jpg" kapak olur)')
print(f'  2. {INFO_NAME} dosyasını doldur')
print( '  3. Yayınla: studio/Yayınla.command (ya da npm run publish)')
