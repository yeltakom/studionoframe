"""Pull every project on the site back into studio/projects.csv.

Run this before editing the table, so the table matches what is live.
"""
import re, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from lib import CONTENT_DIR, CONTENT_DE_DIR, COLUMNS, write_csv, CSV_PATH


def field(front: str, name: str) -> str:
    m = re.search(rf'^{name}:\s*(.*)$', front, re.M)
    if not m:
        return ''
    value = m.group(1).strip()
    if value.startswith('"') and value.endswith('"'):
        import json
        return json.loads(value)
    return value


def parts(path):
    _, front, body = path.read_text().split('---', 2)
    return front, body.strip()


rows = []
for path in CONTENT_DIR.glob('*.md'):
    front, body = parts(path)
    row = {
        'order': field(front, 'order'),
        'slug': path.stem,
        'title': field(front, 'title'),
        'venue': field(front, 'venue'),
        'year': field(front, 'year'),
        'role': field(front, 'role'),
        'summary': field(front, 'summary'),
        'description': body,
        'role_de': '', 'summary_de': '', 'description_de': '',
    }
    de = CONTENT_DE_DIR / path.name
    if de.exists():
        de_front, de_body = parts(de)
        row['role_de'] = field(de_front, 'role')
        row['summary_de'] = field(de_front, 'summary')
        row['description_de'] = de_body
    rows.append(row)

rows.sort(key=lambda r: int(r['order'] or 999))
write_csv(rows)
print(f'{len(rows)} proje tabloya yazıldı → {CSV_PATH.relative_to(CSV_PATH.parent.parent)}')
