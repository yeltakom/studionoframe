import { getProjects, type Project } from './projects';

/** What a curator actually filters by: the kind of institution the room was
 *  built inside. Classified from the venue, not invented. */
const TYPE: Record<string, string> = {
  tirailleurs: 'Museum',
  'a-verse': 'Museum',
  'feelings-in-common': 'Museum',
  'gelecek-hatiralari': 'Museum',
  'marcel-dzama-istanbul': 'Museum',
  'vera-molnar': 'Museum',
  'vera-molnar-tribute': 'Museum',
  'istanbul-modern-culture': 'Museum',
  'fusun-onur-ludwig': 'Museum',
  'secret-ingredient': 'Biennial',
  'silent-university-istanbul': 'Biennial',
  'arazi-x-topological-istanbul': 'Biennial',
  'once-upon-a-time': 'Pavilion',
  vardiya: 'Pavilion',
  'gulsun-karamustafa': 'Pavilion',
  'disobedience-archive': 'Project space',
  'occupy-gezi-architecture': 'Project space',
  'topological-atlas-berlin': 'Project space',
  'tomas-saraceno-aerocene': 'Studio',
};

const CITY: Record<string, string> = {
  tirailleurs: 'Berlin',
  'a-verse': 'Istanbul',
  'feelings-in-common': 'Istanbul',
  'gelecek-hatiralari': 'Istanbul',
  'marcel-dzama-istanbul': 'Istanbul',
  'vera-molnar': 'Istanbul',
  'vera-molnar-tribute': 'Istanbul',
  'istanbul-modern-culture': 'Istanbul',
  'silent-university-istanbul': 'Istanbul',
  'arazi-x-topological-istanbul': 'Istanbul',
  'disobedience-archive': 'Istanbul',
  'occupy-gezi-architecture': 'Istanbul',
  'fusun-onur-ludwig': 'Cologne',
  'secret-ingredient': 'Chicago',
  'once-upon-a-time': 'Venice',
  vardiya: 'Venice',
  'gulsun-karamustafa': 'Venice',
  'topological-atlas-berlin': 'Berlin',
  'tomas-saraceno-aerocene': 'Miami · Paris · New York',
};

export type Entry = Project & {
  /** Permanent, chronological. Once given, it never changes. */
  nr: string;
  year: number;
  city: string;
  type: string;
};

/** The register: every exhibition, numbered from the first one built. */
export async function getRegister(): Promise<Entry[]> {
  const projects = await getProjects('en');

  return projects
    .map((p) => ({
      ...p,
      year: Number((p.data.year.match(/\d{4}/) ?? ['0'])[0]),
      city: CITY[p.id] ?? '—',
      type: TYPE[p.id] ?? 'Exhibition',
      nr: '',
    }))
    .sort((a, b) => a.year - b.year || a.data.order - b.data.order)
    .map((p, i) => ({ ...p, nr: String(i + 1).padStart(3, '0') }));
}

export function facets(entries: Entry[]) {
  const count = (key: 'type' | 'city') => {
    const map = new Map<string, number>();
    for (const e of entries) map.set(e[key], (map.get(e[key]) ?? 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  };
  return { types: count('type'), cities: count('city') };
}
