"""Pull every project on the site back into studio/projects.csv.

Run this before editing the table, so the table matches what is live.
"""
import re, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from lib import CONTENT_DIR, COLUMNS, write_csv, CSV_PATH


def field(front: str, name: str) -> str:
    m = re.search(rf'^{name}:\s*(.*)$', front, re.M)
    if not m:
        return ''
    value = m.group(1).strip()
    if value.startswith('"') and value.endswith('"'):
        import json
        return json.loads(value)
    return value


rows = []
for path in CONTENT_DIR.glob('*.md'):
    text = path.read_text()
    _, front, body = text.split('---', 2)
    rows.append({
        'order': field(front, 'order'),
        'slug': path.stem,
        'title': field(front, 'title'),
        'venue': field(front, 'venue'),
        'year': field(front, 'year'),
        'role': field(front, 'role'),
        'summary': field(front, 'summary'),
        'description': body.strip(),
    })

rows.sort(key=lambda r: int(r['order'] or 999))
write_csv(rows)
print(f'{len(rows)} proje tabloya yazıldı → {CSV_PATH.relative_to(CSV_PATH.parent.parent)}')
