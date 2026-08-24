"""Build the site's content from studio/projects.csv and studio/photos/.

For every row in the table:
  · photos in studio/photos/<slug>/ are resized into the site and numbered
  · a content file is written to src/content/projects/<slug>.md

A project with no folder in studio/photos/ keeps the photos it already has,
so you only drop in photos for the projects you are actually changing.
"""
import re, sys, shutil
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from lib import (CONTENT_DIR, CONTENT_DE_DIR, IMAGES_DIR, PHOTOS_DIR, read_csv, yaml_str, run)

OG_DIR = IMAGES_DIR.parent / 'og'

MAX_EDGE = 1800
QUALITY = 82
OG_SIZE = (1200, 630)          # what Google, WhatsApp and LinkedIn show for a link
SOURCE_TYPES = {'.jpg', '.jpeg', '.png', '.tif', '.tiff', '.webp', '.heic', '.heif', '.avif'}

def convert(src: Path, dst: Path) -> bool:
    """Resize a photo into the site.

    sips ships with macOS and reads what a camera or phone produces, HEIC
    included, so it goes first. Pillow covers anything sips refuses.
    """
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
                 '--resampleHeightWidthMax', str(max(OG_SIZE)),
                 str(cover), '--out', str(dst)])
        if r.returncode == 0 and dst.exists():
            run(['sips', '--cropToHeightWidth', str(OG_SIZE[1]), str(OG_SIZE[0]), str(dst)])
            return True
    try:
        from PIL import Image, ImageOps
        with Image.open(cover) as im:
            ImageOps.fit(im.convert('RGB'), OG_SIZE, Image.LANCZOS).save(
                dst, 'JPEG', quality=78, optimize=True)
        return True
    except Exception:
        return False


def first_sentence(text: str) -> str:
    """A meta description is plain text, so tags go and one sentence stays."""
    plain = re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', text)).strip()
    head = re.split(r'(?<=[.!?])\s', plain)[0].strip()
    return head if head.endswith(('.', '!', '?')) else head + '.'


def sync_photos(slug: str) -> list[str]:
    folder = PHOTOS_DIR / slug
    out_dir = IMAGES_DIR / slug
    if not folder.is_dir():
        existing = sorted(p.name for p in out_dir.glob('*.jpg')) if out_dir.is_dir() else []
        return existing

    sources = sorted(
        (p for p in folder.iterdir() if p.suffix.lower() in SOURCE_TYPES and not p.name.startswith('.')),
        key=lambda p: p.name.lower(),
    )
    if not sources:
        print(f'  ! studio/photos/{slug}/ boş — fotoğraf eklenmedi')
        return sorted(p.name for p in out_dir.glob('*.jpg')) if out_dir.is_dir() else []

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


def main() -> None:
    rows = read_csv()
    seen, changed = set(), 0

    for row in rows:
        slug = row['slug'].strip()
        if slug in seen:
            sys.exit(f'Aynı slug iki kez var: {slug}')
        seen.add(slug)

        for required in ('title', 'venue', 'year', 'role'):
            if not row.get(required, '').strip():
                sys.exit(f'{slug}: "{required}" boş bırakılamaz')

        print(f'{row["order"] or "?":>3}  {slug}')
        images = sync_photos(slug)
        if not images:
            print(f'  ! {slug} için hiç fotoğraf yok — studio/photos/{slug}/ içine koy')

        if images:
            made = make_share_image(IMAGES_DIR / slug / images[0], OG_DIR / f'{slug}.jpg')
            if made and int(row['order'] or 999) == 1:
                shutil.copyfile(OG_DIR / f'{slug}.jpg', OG_DIR / 'default.jpg')

        description = row.get('description', '').strip()
        summary = row.get('summary', '').strip() or first_sentence(description)
        web = [f'/images/projects/{slug}/{n}' for n in images]

        def page(role_text: str, summary_text: str, body_text: str) -> str:
            return '\n'.join([
                '---',
                f'title: {yaml_str(row["title"].strip())}',
                f'venue: {yaml_str(row["venue"].strip())}',
                f'year: {yaml_str(row["year"].strip())}',
                f'role: {yaml_str(role_text)}',
                f'order: {int(row["order"] or 999)}',
                f'summary: {yaml_str(summary_text)}',
                f'cover: {yaml_str(web[0] if web else "")}',
                'images:',
                *[f'  - {yaml_str(u)}' for u in web],
                '---',
                '',
                body_text,
                '',
            ])

        def put(path, text):
            nonlocal_changed = not path.exists() or path.read_text() != text
            if nonlocal_changed:
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(text)
            return nonlocal_changed

        changed += put(CONTENT_DIR / f'{slug}.md', page(row['role'].strip(), summary, description))

        de_body = row.get('description_de', '').strip()
        de_target = CONTENT_DE_DIR / f'{slug}.md'
        if de_body:
            de_role = row.get('role_de', '').strip() or row['role'].strip()
            de_summary = row.get('summary_de', '').strip() or first_sentence(de_body)
            changed += put(de_target, page(de_role, de_summary, de_body))
        elif de_target.exists():
            de_target.unlink()
            changed += 1

    orphans = sorted(p.stem for p in CONTENT_DIR.glob('*.md') if p.stem not in seen)
    if orphans:
        print('\nTabloda olmayan projeler sitede duruyor: ' + ', '.join(orphans))
        print('Silmek istersen o dosyaları src/content/projects/ içinden kaldır.')

    print(f'\nBitti. {len(rows)} proje, {changed} içerik dosyası güncellendi.')
    print('Yayınlamak için: npm run publish')


main()
