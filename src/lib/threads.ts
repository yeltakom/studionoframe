import { getProjects, type Project } from './projects';

/** The research threads the work actually follows. Read off the exhibitions
 *  themselves — what each one set out to examine — not invented for the site.
 *  Numbers are catalogue numbers: thread, then order within the thread. */
export const THREADS = [
  {
    key: 'displacement', face: 'topological-atlas-berlin',
    title: 'Displacement',
    de: 'Vertreibung',
    line: 'Forced migration, dispossession and the routes people are made to take — from the Tigris basin to the Iran–Turkey border.',
    lineDe: 'Zwangsmigration, Enteignung und die Wege, die Menschen nehmen müssen — vom Tigris-Becken bis zur iranisch-türkischen Grenze.',
    ids: ['arazi-x-topological-istanbul', 'topological-atlas-berlin', 'silent-university-istanbul'],
  },
  {
    key: 'archives', face: 'tirailleurs',
    title: 'Archives of resistance',
    de: 'Archive des Widerstands',
    line: 'Documenting protest and marginalised histories so they can be seen, cited and built on.',
    lineDe: 'Protest und verdrängte Geschichten so dokumentieren, dass sie gesehen, zitiert und weitergedacht werden können.',
    ids: ['occupy-gezi-architecture', 'disobedience-archive', 'tirailleurs'],
  },
  {
    key: 'monographs', face: 'fusun-onur-ludwig',
    title: 'Monographs',
    de: 'Monografien',
    line: 'A single artist’s work given a room of its own, from a Venice pavilion to a museum retrospective.',
    lineDe: 'Das Werk einer einzelnen Künstlerin oder eines Künstlers bekommt einen eigenen Raum — vom Pavillon in Venedig bis zur Retrospektive.',
    ids: ['once-upon-a-time', 'fusun-onur-ludwig', 'marcel-dzama-istanbul', 'vera-molnar-tribute', 'gulsun-karamustafa', 'a-verse'],
  },
  {
    key: 'collections', face: 'gelecek-hatiralari',
    title: 'Collections',
    de: 'Sammlungen',
    line: 'Historical and institutional collections re-read through contemporary works and new display strategies.',
    lineDe: 'Historische und institutionelle Sammlungen, neu gelesen durch zeitgenössische Arbeiten und neue Displaystrategien.',
    ids: ['gelecek-hatiralari', 'feelings-in-common', 'vera-molnar'],
  },
  {
    key: 'commons', face: 'tomas-saraceno-aerocene',
    title: 'Commons',
    de: 'Gemeingüter',
    line: 'Participatory production, shared tables and shared air — exhibitions made with their publics rather than for them.',
    lineDe: 'Partizipative Produktion, geteilte Tische und geteilte Luft — Ausstellungen, die mit ihren Öffentlichkeiten entstehen, nicht für sie.',
    ids: ['secret-ingredient', 'vardiya', 'istanbul-modern-culture', 'tomas-saraceno-aerocene'],
  },
] as const;

export type Threaded = Project & { thread: (typeof THREADS)[number]; no: string; year: number; ti: number };

const yearOf = (p: Project) => Number((p.data.year.match(/\d{4}/) ?? ['0'])[0]);

/** Which thread a project belongs to: its own `thread:` line in sergi.txt
 *  first, then the list above for the first nineteen, else the last thread
 *  with a note in the build log. */
function threadOf(p: Project) {
  const own = (p.data.thread ?? '').trim().toLowerCase();
  const byLine = THREADS.find((t) => t.key === own);
  if (byLine) return byLine;
  const byList = THREADS.find((t) => (t.ids as readonly string[]).includes(p.id));
  if (byList) return byList;
  console.warn(`[threads] ${p.id}: "Hat" boş ya da tanınmadı ("${p.data.thread}") — "${THREADS[THREADS.length - 1].title}" sayıldı`);
  return THREADS[THREADS.length - 1];
}

/** Every project with its thread and catalogue number, e.g. 3.4 — chronological within the thread. */
export async function getThreaded(lang: 'en' | 'de' = 'en'): Promise<Threaded[]> {
  const all = await getProjects(lang);
  const out: Threaded[] = [];
  THREADS.forEach((thread, ti) => {
    all
      .filter((p) => threadOf(p) === thread)
      .sort((a, b) => yearOf(a) - yearOf(b) || a.data.order - b.data.order)
      .forEach((p, i) => out.push({ ...p, thread, ti: ti + 1, no: `${ti + 1}.${i + 1}`, year: yearOf(p) }));
  });
  return out;
}

export async function getThread(key: string, lang: 'en' | 'de' = 'en') {
  return (await getThreaded(lang)).filter((p) => p.thread.key === key);
}

/** The rooms on the home page: projects marked `Ana sayfa: evet`, in thread
 *  order with the archives first; if none is marked, one per thread. */
export async function getHomeReel(lang: 'en' | 'de' = 'en'): Promise<Threaded[]> {
  const all = await getThreaded(lang);
  const rank = (p: Threaded) => (p.thread.key === 'archives' ? -1 : p.ti);
  const marked = all.filter((p) => p.data.home).sort((a, b) => rank(a) - rank(b) || b.year - a.year);
  if (marked.length) return marked;
  return THREADS.map((t) => all.find((p) => p.id === t.face) ?? all.find((p) => p.thread === t)).filter(Boolean) as Threaded[];
}
