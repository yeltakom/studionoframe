"""Build the site's content from the folders in studio/sergiler/.

For every folder:
  · sergi.txt gives the facts and the texts
  · the photographs are resized into the site and numbered; the first one
    (or one named kapak…/cover…) is the cover
  · content files are written to src/content/projects/ (and projects-de/)

A folder without photographs keeps the photographs the site already has,
so you only put photos in the folders you are actually changing.
"""
import re, sys, shutil
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from lib import (CONTENT_DIR, CONTENT_DE_DIR, IMAGES_DIR, STUDIO_DIR, INFO_NAME, THREADS,
                 parse_info, render_info, slugify, yaml_str, run)

OG_DIR = IMAGES_DIR.parent / 'og'
MAX_EDGE = 1800
QUALITY = 82
OG_SIZE = (1200, 630)          # what Google, WhatsApp and LinkedIn show for a link
SOURCE_TYPES = {'.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp', '.heic', '.heif', '.avif'}


def convert(src: Path, dst: Path) -> bool:
    """sips ships with macOS and reads what a camera or phone produces, HEIC
    included, so it goes first. Pillow covers anything sips refuses."""
    if shutil.which('sips'):
        r = run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', str(QUALITY),
                 '-Z', str(MAX_EDGE), str(src), '--out', str(dst)])
        if r.returncode == 0 and dst.exists():
            return True
    try:
        from PIL import Image, ImageOps
        with Image.open(src) as im:
            im = ImageOps.exif_transpose(im).convert('RGB')
            im.thumbnail((MAX_EDGE, MAX_EDGE), Image.LANCZOS)
            im.save(dst, 'JPEG', quality=QUALITY, optimize=True, progressive=True)
        return True
    except Exception:
        return False


def make_share_image(cover: Path, dst: Path) -> bool:
    """Crop a 1200x630 card from the cover, so a shared link shows the work."""
    dst.parent.mkdir(parents=True, exist_ok=True)
    if shutil.which('sips'):
        r = run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '78',
                 '--resampleHeightWidthMax', str(max(OG_SIZE)), str(cover), '--out', str(dst)])
        if r.returncode == 0 and dst.exists():
            run(['sips', '--cropToHeightWidth', str(OG_SIZE[1]), str(OG_SIZE[0]), str(dst)])
            return True
    try:
        from PIL import Image, ImageOps
        with Image.open(cover) as im:
            ImageOps.fit(im.convert('RGB'), OG_SIZE, Image.LANCZOS).save(dst, 'JPEG', quality=78, optimize=True)
        return True
    except Exception:
        return False


def first_sentence(text: str) -> str:
    plain = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', text)).strip()
    head = re.split(r'(?<=[.!?])\s', plain)[0].strip()
    return head if head.endswith(('.', '!', '?')) else head + '.'


def sync_photos(folder: Path, slug: str) -> list[str]:
    out_dir = IMAGES_DIR / slug
    existing = sorted(p.name for p in out_dir.glob('*.jpg')) if out_dir.is_dir() else []
    sources = [p for p in folder.iterdir() if p.suffix.lower() in SOURCE_TYPES and not p.name.startswith('.')]
    if not sources:
        return existing
    # the cover first — a file called kapak… or cover… — then by name
    sources.sort(key=lambda p: (0 if p.stem.lower().startswith(('kapak', 'cover')) else 1, p.name.lower()))
    if out_dir.is_dir():
        shutil.rmtree(out_dir)
    out_dir.mkdir(parents=True)
    names = []
    for i, src in enumerate(sources, 1):
        dst = out_dir / f'{slug}-{i:02d}.jpg'
        if convert(src, dst):
            names.append(dst.name)
        else:
            print(f'  ! açılamadı, atlandı: {src.name}')
    print(f'  {len(names)} fotoğraf işlendi')
    return names


def page(info: dict, role: str, summary: str, body: str, web: list[str], order: int) -> str:
    return '\n'.join([
        '---',
        f'title: {yaml_str(info["title"])}',
        f'venue: {yaml_str(info["venue"])}',
        f'year: {yaml_str(info["year"])}',
        f'role: {yaml_str(role)}',
        f'order: {order}',
        f'thread: {yaml_str(info["thread"])}',
        f'home: {"true" if info["home"] else "false"}',
        f'summary: {yaml_str(summary)}',
        f'cover: {yaml_str(web[0] if web else "")}',
        'images:',
        *[f'  - {yaml_str(u)}' for u in web],
        '---',
        '',
        body,
        '',
    ])


def put(path: Path, text: str) -> int:
    if path.exists() and path.read_text() == text:
        return 0
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text)
    return 1


def main() -> None:
    if not STUDIO_DIR.is_dir():
        sys.exit(f'Klasör yok: {STUDIO_DIR}')
    folders = sorted(p for p in STUDIO_DIR.iterdir() if p.is_dir() and not p.name.startswith('.'))
    seen: dict[str, str] = {}
    projects, skipped, changed = [], [], 0

    for folder in folders:
        slug = slugify(folder.name)
        if not slug:
            continue
        if slug in seen:
            sys.exit(f'İki klasör aynı adrese çıkıyor: "{seen[slug]}" ve "{folder.name}" → {slug}')
        seen[slug] = folder.name

        info_path = folder / INFO_NAME
        if not info_path.exists():
            info = {'title': folder.name}
            info_path.write_text(render_info({**{'thread': '', 'home': False}, **info}))
            print(f'  ! {folder.name}: {INFO_NAME} yoktu, boş bir tane açtım — doldurup tekrar yayınla')
            skipped.append(folder.name)
            continue
        info = parse_info(info_path.read_text())
        missing = [k for k in ('title', 'venue', 'year', 'role') if not info[k].strip()]
        if missing:
            print(f'  ! {folder.name}: {INFO_NAME} içinde eksik: {", ".join(missing)} — atlandı')
            skipped.append(folder.name)
            continue
        if info['thread'] and info['thread'] not in THREADS:
            print(f'  ! {folder.name}: Hat tanınmadı ("{info["thread"]}") — şunlardan biri olmalı: {", ".join(THREADS)}')
            info['thread'] = ''

        print(f'{slug}')
        images = sync_photos(folder, slug)
        if not images:
            print(f'  ! hiç fotoğraf yok — studio/sergiler/{folder.name}/ içine koy')
        projects.append((slug, info, images))

    def year_of(info):
        m = re.search(r'\d{4}', info['year'])
        return int(m.group()) if m else 0

    projects.sort(key=lambda t: -year_of(t[1]))            # newest first: order 1
    for order, (slug, info, images) in enumerate(projects, 1):
        web = [f'/images/projects/{slug}/{n}' for n in images]
        if images:
            make_share_image(IMAGES_DIR / slug / images[0], OG_DIR / f'{slug}.jpg')
        summary = info['summary'] or first_sentence(info['description'])
        changed += put(CONTENT_DIR / f'{slug}.md', page(info, info['role'], summary, info['description'], web, order))
        de_target = CONTENT_DE_DIR / f'{slug}.md'
        if info['description_de']:
            de_role = info['role_de'] or info['role']
            de_summary = info['summary_de'] or first_sentence(info['description_de'])
            changed += put(de_target, page(info, de_role, de_summary, info['description_de'], web, order))
        elif de_target.exists():
            de_target.unlink()
            changed += 1

    # the share image for the site itself: the first room on the home page
    home = [p for p in projects if p[1]['home'] and p[2]] or [p for p in projects if p[2]]
    if home:
        shutil.copyfile(OG_DIR / f'{home[0][0]}.jpg', OG_DIR / 'default.jpg')

    orphans = sorted(p.stem for p in CONTENT_DIR.glob('*.md') if p.stem not in seen)
    if orphans:
        print('\nKlasörü olmayan projeler sitede duruyor: ' + ', '.join(orphans))
        print('Silmek istersen: src/content/projects/ içinden o dosyayı kaldır.')
    if skipped:
        print('\nAtlananlar: ' + ', '.join(skipped))

    print(f'\nBitti. {len(projects)} proje, {changed} içerik dosyası güncellendi.')


main()
