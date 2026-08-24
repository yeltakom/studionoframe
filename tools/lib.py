"""Shared helpers for the studio content tools."""
from pathlib import Path
import csv, re, subprocess, sys, unicodedata

ROOT = Path(__file__).resolve().parent.parent
CSV_PATH = ROOT / 'studio' / 'projects.csv'
PHOTOS_DIR = ROOT / 'studio' / 'photos'
CONTENT_DIR = ROOT / 'src' / 'content' / 'projects'
CONTENT_DE_DIR = ROOT / 'src' / 'content' / 'projects-de'
IMAGES_DIR = ROOT / 'public' / 'images' / 'projects'

COLUMNS = ['order', 'slug', 'title', 'venue', 'year', 'role', 'summary', 'description',
           'role_de', 'summary_de', 'description_de']

TR = str.maketrans('çğıöşüÇĞİÖŞÜåÅäÄéÉèÈüÜñÑ', 'cgiosucgiosuaAaAeEeEuUnN')


def slugify(text: str) -> str:
    text = unicodedata.normalize('NFC', text).translate(TR)
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode()
    text = re.sub(r'[^a-zA-Z0-9]+', '-', text).strip('-').lower()
    return re.sub(r'-{2,}', '-', text)


def read_csv() -> list[dict]:
    if not CSV_PATH.exists():
        sys.exit(f'Tablo bulunamadı: {CSV_PATH}\nÖnce `npm run export` çalıştır.')
    with CSV_PATH.open(encoding='utf-8-sig', newline='') as f:
        rows = [r for r in csv.DictReader(f) if (r.get('slug') or '').strip()]
    missing = [c for c in COLUMNS if rows and c not in rows[0]]
    if missing:
        sys.exit(f'Tabloda şu sütunlar eksik: {", ".join(missing)}')
    return rows


def write_csv(rows: list[dict]) -> None:
    CSV_PATH.parent.mkdir(parents=True, exist_ok=True)
    with CSV_PATH.open('w', encoding='utf-8-sig', newline='') as f:
        w = csv.DictWriter(f, fieldnames=COLUMNS, quoting=csv.QUOTE_ALL)
        w.writeheader()
        for r in rows:
            w.writerow({c: r.get(c, '') for c in COLUMNS})


def yaml_str(value: str) -> str:
    """JSON quoting is valid YAML and survives quotes, colons and Turkish text."""
    import json
    return json.dumps(unicodedata.normalize('NFC', str(value)), ensure_ascii=False)


def run(cmd: list[str]) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, capture_output=True, text=True)
