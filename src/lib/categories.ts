import { getProjects, type Project } from './projects';

/** What kind of work each project was, read off its role. A project's own
 *  `category:` line decides. Catalogue numbers are category.sequence,
 *  chronological within the category: 2.3 is the third artist collaboration. */
export const CATEGORIES = [
  {
    key: 'exhibition-design',
    title: 'Exhibition Design',
    de: 'Ausstellungsgestaltung',
    line: 'Exhibition architecture for museums, biennials and institutions, from the spatial concept to the installation.',
    lineDe: 'Ausstellungsarchitektur für Museen, Biennalen und Institutionen, vom Raumkonzept bis zum Aufbau.',
  },
  {
    key: 'artist-collaborations',
    title: 'Artist Collaborations',
    de: 'Künstlerische Zusammenarbeit',
    line: 'Working inside an artist’s practice: on the space, the production and the setting of the work.',
    lineDe: 'Arbeit innerhalb einer künstlerischen Praxis: am Raum, an der Produktion und an der Setzung des Werks.',
  },
  {
    key: 'production',
    title: 'Production Support',
    de: 'Produktion',
    line: 'Coordination, production design and installation on site, for artists and their teams.',
    lineDe: 'Koordination, Produktionsdesign und Aufbau vor Ort, für Künstler:innen und ihre Teams.',
  },
  {
    key: 'research',
    title: 'Spatial Research',
    de: 'Räumliche Forschung',
    line: 'Research-led projects: archives, atlases and participatory spaces.',
    lineDe: 'Forschungsbasierte Projekte: Archive, Atlanten und partizipative Räume.',
  },
  {
    key: 'curation',
    title: 'Curation',
    de: 'Kuratierung',
    line: 'Curatorial work on exhibitions and pavilions.',
    lineDe: 'Kuratorische Arbeit an Ausstellungen und Pavillons.',
  },
] as const;

export type Category = (typeof CATEGORIES)[number];
export type Entry = Project & { cat: Category; no: string; year: number; ci: number };

const yearOf = (p: Project) => Number((p.data.year.match(/\d{4}/) ?? ['0'])[0]);

function categoryOf(p: Project): Category {
  const own = (p.data.category ?? '').trim().toLowerCase();
  const found = CATEGORIES.find((c) => c.key === own);
  if (!found) console.warn(`[categories] ${p.id}: category "${p.data.category}" not recognised — shown under ${CATEGORIES[0].title}`);
  return found ?? CATEGORIES[0];
}

/** Every project with its category and catalogue number, in index order. */
export async function getCatalogue(lang: 'en' | 'de' = 'en'): Promise<Entry[]> {
  const all = await getProjects(lang);
  const out: Entry[] = [];
  CATEGORIES.forEach((cat, ci) => {
    all
      .filter((p) => categoryOf(p) === cat)
      .sort((a, b) => yearOf(a) - yearOf(b) || a.data.order - b.data.order)
      .forEach((p, i) => out.push({ ...p, cat, ci: ci + 1, no: `${ci + 1}.${i + 1}`, year: yearOf(p) }));
  });
  return out;
}

export const catTitle = (c: Category, lang: 'en' | 'de') => (lang === 'de' ? c.de : c.title);
export const catLine = (c: Category, lang: 'en' | 'de') => (lang === 'de' ? c.lineDe : c.line);
