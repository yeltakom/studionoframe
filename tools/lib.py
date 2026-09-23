"""Shared helpers for the studio content tools.

The studio keeps one folder per exhibition in studio/sergiler/<ad>/ —
the photographs plus a small text file, sergi.txt — and the tools turn
those folders into the site.
"""
from pathlib import Path
import json, re, subprocess, unicodedata

ROOT = Path(__file__).resolve().parent.parent
STUDIO_DIR = ROOT / 'studio' / 'sergiler'
CONTENT_DIR = ROOT / 'src' / 'content' / 'projects'
CONTENT_DE_DIR = ROOT / 'src' / 'content' / 'projects-de'
IMAGES_DIR = ROOT / 'public' / 'images' / 'projects'
INFO_NAME = 'sergi.txt'

THREADS = ['displacement', 'archives', 'monographs', 'collections', 'commons']
THREAD_ALIASES = {
    'yerinden edilme': 'displacement', 'vertreibung': 'displacement',
    'arşiv': 'archives', 'arsiv': 'archives', 'archive': 'archives', 'direniş arşivleri': 'archives',
    'monografi': 'monographs', 'monograph': 'monographs', 'monografien': 'monographs',
    'koleksiyon': 'collections', 'collection': 'collections', 'sammlungen': 'collections',
    'müşterek': 'commons', 'musterek': 'commons', 'müşterekler': 'commons', 'common': 'commons', 'gemeingüter': 'commons',
}

# what may stand left of the colon in sergi.txt → field
KEYS = {
    'başlık': 'title', 'baslik': 'title', 'title': 'title', 'ad': 'title',
    'mekân': 'venue', 'mekan': 'venue', 'venue': 'venue', 'ort': 'venue',
    'yıl': 'year', 'yil': 'year', 'year': 'year', 'jahr': 'year',
    'rol': 'role', 'role': 'role', 'rolle': 'role',
    'hat': 'thread', 'thread': 'thread', 'linie': 'thread',
    'ana sayfa': 'home', 'anasayfa': 'home', 'home': 'home',
    'özet': 'summary', 'ozet': 'summary', 'summary': 'summary',
}
SECTION = re.compile(r'^\s*-{3,}\s*(.+?)\s*-{3,}\s*$')
SECTIONS = {
    'açıklama': 'en', 'aciklama': 'en', 'metin': 'en', 'description': 'en', 'english': 'en', 'ingilizce': 'en', 'i̇ngilizce': 'en',
    'almanca': 'de', 'deutsch': 'de', 'german': 'de', 'beschreibung': 'de',
}
FIELDS = ['title', 'venue', 'year', 'role', 'thread', 'home', 'summary', 'description', 'role_de', 'summary_de', 'description_de']

TR = str.maketrans('çğıöşüÇĞİÖŞÜåÅäÄéÉèÈüÜñÑ', 'cgiosucgiosuaAaAeEeEuUnN')


def slugify(text: str) -> str:
    text = unicodedata.normalize('NFC', text).translate(TR)
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode()
    text = re.sub(r'[^a-zA-Z0-9]+', '-', text).strip('-').lower()
    return re.sub(r'-{2,}', '-', text)


def yaml_str(value: str) -> str:
    """JSON quoting is valid YAML and survives quotes, colons and Turkish text."""
    return json.dumps(unicodedata.normalize('NFC', str(value)), ensure_ascii=False)


def run(cmd: list[str]) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, capture_output=True, text=True)


def empty_info() -> dict:
    info = {k: '' for k in FIELDS}
    info['home'] = False
    return info


def parse_info(text: str) -> dict:
    """Read sergi.txt. Lines like `Mekân: HKW, Berlin` at the top are facts;
    everything after `--- Açıklama ---` is the English text and everything
    after `--- Almanca ---` the German one (its own Rol/Özet lines first)."""
    info = empty_info()
    section = 'head'
    en, de = [], []
    for raw in text.splitlines():
        line = raw.rstrip()
        m = SECTION.match(line)
        if m:
            section = SECTIONS.get(m.group(1).strip().lower(), section)
            continue
        meta_zone = section == 'head' or (section == 'de' and not any(l.strip() for l in de))
        if meta_zone and ':' in line:
            key, _, value = line.partition(':')
            k = KEYS.get(key.strip().lower())
            if k:
                value = value.strip()
                if section == 'de' and k in ('role', 'summary'):
                    info[k + '_de'] = value
                elif k == 'home':
                    info['home'] = value.lower() in ('evet', 'x', 'yes', 'ja', 'true', '1')
                elif k == 'thread':
                    v = value.strip().lower()
                    info['thread'] = THREAD_ALIASES.get(v, v)
                else:
                    info[k] = value
                continue
        if section == 'head':
            if not line.strip():
                continue
            section = 'en'          # text without a marker: it is the description
        (en if section == 'en' else de).append(line)
    info['description'] = '\n'.join(en).strip()
    info['description_de'] = '\n'.join(de).strip()
    return info


def render_info(info: dict) -> str:
    """Write sergi.txt the way the studio reads it."""
    head = [
        f'Başlık: {info.get("title", "")}',
        f'Mekân: {info.get("venue", "")}',
        f'Yıl: {info.get("year", "")}',
        f'Rol: {info.get("role", "")}',
        f'Hat: {info.get("thread", "")}',
        f'Ana sayfa: {"evet" if info.get("home") else "hayır"}',
        f'Özet: {info.get("summary", "")}',
        '',
        '--- Açıklama ---',
        info.get('description', ''),
        '',
        '--- Almanca ---',
        f'Rol: {info.get("role_de", "")}',
        f'Özet: {info.get("summary_de", "")}',
        '',
        info.get('description_de', ''),
        '',
    ]
    return '\n'.join(head)
