"""Write the folders in studio/sergiler/ from what is on the site.

Needed once, to start the folders from the existing projects, and again
whenever a project was edited in the browser panel (/admin/) instead of
in its folder. Photographs are not touched.
"""
import json, re, sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from lib import CONTENT_DIR, CONTENT_DE_DIR, STUDIO_DIR, INFO_NAME, render_info, empty_info

# where the first nineteen belong; a project's own `thread:` line wins
LEGACY_THREAD = {
    'arazi-x-topological-istanbul': 'displacement', 'topological-atlas-berlin': 'displacement', 'silent-university-istanbul': 'displacement',
    'occupy-gezi-architecture': 'archives', 'disobedience-archive': 'archives', 'tirailleurs': 'archives',
    'once-upon-a-time': 'monographs', 'fusun-onur-ludwig': 'monographs', 'marcel-dzama-istanbul': 'monographs',
    'vera-molnar-tribute': 'monographs', 'gulsun-karamustafa': 'monographs', 'a-verse': 'monographs',
    'gelecek-hatiralari': 'collections', 'feelings-in-common': 'collections', 'vera-molnar': 'collections',
    'secret-ingredient': 'commons', 'vardiya': 'commons', 'istanbul-modern-culture': 'commons', 'tomas-saraceno-aerocene': 'commons',
}
LEGACY_HOME = {'tirailleurs', 'topological-atlas-berlin', 'fusun-onur-ludwig', 'gelecek-hatiralari', 'tomas-saraceno-aerocene'}


def field(front: str, name: str) -> str:
    m = re.search(rf'^{name}:\s*(.*)$', front, re.M)
    if not m:
        return ''
    value = m.group(1).strip()
    return json.loads(value) if value.startswith('"') and value.endswith('"') else value


def parts(path: Path):
    _, front, body = path.read_text().split('---', 2)
    return front, body.strip()


n = 0
for path in sorted(CONTENT_DIR.glob('*.md')):
    front, body = parts(path)
    info = empty_info()
    info.update(title=field(front, 'title'), venue=field(front, 'venue'), year=field(front, 'year'),
                role=field(front, 'role'), summary=field(front, 'summary'), description=body,
                thread=field(front, 'thread') or LEGACY_THREAD.get(path.stem, ''),
                home=(field(front, 'home') == 'true') or path.stem in LEGACY_HOME)
    de = CONTENT_DE_DIR / path.name
    if de.exists():
        de_front, de_body = parts(de)
        info.update(role_de=field(de_front, 'role'), summary_de=field(de_front, 'summary'), description_de=de_body)
    folder = STUDIO_DIR / path.stem
    folder.mkdir(parents=True, exist_ok=True)
    (folder / INFO_NAME).write_text(render_info(info))
    n += 1

print(f'{n} proje klasörlere yazıldı → studio/sergiler/')
