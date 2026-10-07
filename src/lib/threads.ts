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
    text: "Three exhibitions in 2022 — two at the 17th Istanbul Biennial, one at TOP e.V. in Berlin — came out of long research into forced migration: communities displaced in the Tigris basin, undocumented routes along the Pakistan–Iran and Iran–Turkey borders, the right to education for people on the move. The rooms treat displacement as something to be read rather than looked at: layered, archival, built from documents, maps and testimonies.",
    textDe: "Drei Ausstellungen aus dem Jahr 2022 — zwei auf der 17. Istanbul Biennale, eine bei TOP e.V. in Berlin — gingen aus langer Forschung zu Zwangsmigration hervor: vertriebene Gemeinschaften im Tigris-Becken, undokumentierte Routen entlang der Grenzen Pakistan–Iran und Iran–Türkei, das Recht auf Bildung für Menschen auf der Flucht. Die Räume behandeln Vertreibung als etwas, das gelesen wird, nicht nur betrachtet: geschichtet, archivarisch, aus Dokumenten, Karten und Zeugnissen gebaut.",
    ids: ['arazi-x-topological-istanbul', 'topological-atlas-berlin', 'silent-university-istanbul'],
  },
  {
    key: 'archives', face: 'tirailleurs',
    title: 'Archives of resistance',
    de: 'Archive des Widerstands',
    line: 'Documenting protest and marginalised histories so they can be seen, cited and built on.',
    lineDe: 'Protest und verdrängte Geschichten so dokumentieren, dass sie gesehen, zitiert und weitergedacht werden können.',
    text: "It began in 2014 at SALT Beyoğlu, months after Gezi: #OccupyGezi Architecture documented the spatial practices of the protest, and Disobedience Archive mapped a wider network of social conflict. Twelve years later, at HKW in Berlin, Tirailleurs reframes the marginalised histories of colonial soldiers through contemporary works, archival and thematic sections. Each time the architecture makes an archive walkable — a common space for seeing, citing and, at HKW, for celebration and listening.",
    textDe: "Es begann 2014 im SALT Beyoğlu, wenige Monate nach Gezi: #OccupyGezi Architecture dokumentierte die räumlichen Praktiken des Protests, Disobedience Archive kartierte ein weiteres Netz sozialer Konflikte. Zwölf Jahre später, im HKW Berlin, liest Tirailleurs die verdrängten Geschichten kolonialer Soldaten neu — mit zeitgenössischen Arbeiten, Archiv- und Themenräumen. Jedes Mal macht die Architektur ein Archiv begehbar: ein gemeinsamer Raum zum Sehen, Zitieren und, im HKW, zum Feiern und Zuhören.",
    ids: ['occupy-gezi-architecture', 'disobedience-archive', 'tirailleurs'],
  },
  {
    key: 'monographs', face: 'fusun-onur-ludwig',
    title: 'Monographs',
    de: 'Monografien',
    line: 'A single artist’s work given a room of its own, from a Venice pavilion to a museum retrospective.',
    lineDe: 'Das Werk einer einzelnen Künstlerin oder eines Künstlers bekommt einen eigenen Raum — vom Pavillon in Venedig bis zur Retrospektive.',
    text: "A single artist’s work given a room of its own: Füsun Onur’s Once upon a time… in the Pavilion of Turkey in Venice and again at Museum Ludwig, Gülsün Karamustafa in the Türkiye Pavilion, and at Pera Museum the first solo exhibitions in Turkey of Marcel Dzama and Åsa Jungnelius and a tribute to Vera Molnár. The task is the same each time — to build the space from the logic of the work, not around it — and the answer is different each time.",
    textDe: "Das Werk einer einzelnen Künstlerin oder eines Künstlers bekommt einen eigenen Raum: Füsun Onurs Once upon a time… im Pavillon der Türkei in Venedig und erneut im Museum Ludwig, Gülsün Karamustafa im Türkiye-Pavillon, im Pera Museum die ersten Einzelausstellungen von Marcel Dzama und Åsa Jungnelius in der Türkei sowie eine Hommage an Vera Molnár. Die Aufgabe ist jedes Mal dieselbe — den Raum aus der Logik des Werks zu bauen, nicht um es herum — und die Antwort jedes Mal eine andere.",
    ids: ['once-upon-a-time', 'fusun-onur-ludwig', 'marcel-dzama-istanbul', 'vera-molnar-tribute', 'gulsun-karamustafa', 'a-verse'],
  },
  {
    key: 'collections', face: 'gelecek-hatiralari',
    title: 'Collections',
    de: 'Sammlungen',
    line: 'Historical and institutional collections re-read through contemporary works and new display strategies.',
    lineDe: 'Historische und institutionelle Sammlungen, neu gelesen durch zeitgenössische Arbeiten und neue Displaystrategien.',
    text: "Three exhibitions at Pera Museum that re-read a collection: the Kütahya tiles and ceramics of the Suna and İnan Kıraç Foundation set beside contemporary works, three pioneers of algorithmic art from the Hungarian National Bank Collection, and works from the British Council Collection arranged in three chapters. A collection is a given order; the design proposes another one and lets the visitor compare the two.",
    textDe: "Drei Ausstellungen im Pera Museum, die eine Sammlung neu lesen: die Kütahya-Fliesen und -Keramiken der Suna-und-İnan-Kıraç-Stiftung neben zeitgenössischen Arbeiten, drei Pionierinnen der algorithmischen Kunst aus der Sammlung der Ungarischen Nationalbank, Werke der British Council Collection in drei Kapiteln. Eine Sammlung ist eine gegebene Ordnung; der Entwurf schlägt eine andere vor und lässt die Besucher:innen beide vergleichen.",
    ids: ['gelecek-hatiralari', 'feelings-in-common', 'vera-molnar'],
  },
  {
    key: 'commons', face: 'tomas-saraceno-aerocene',
    title: 'Commons',
    de: 'Gemeingüter',
    line: 'Participatory production, shared tables and shared air — exhibitions made with their publics rather than for them.',
    lineDe: 'Partizipative Produktion, geteilte Tische und geteilte Luft — Ausstellungen, die mit ihren Öffentlichkeiten entstehen, nicht für sie.',
    text: "Exhibitions made with their publics rather than for them: Vardiya turned the Pavilion of Turkey in Venice into a workshop for 122 architecture students in rotating shifts; Secret Ingredient brought a closed school in Bronzeville back to its neighbourhood around long picnic tables; the Aerocene projects with Studio Tomás Saraceno worked towards an ethical collaboration with the atmosphere; and Istanbul Modern’s exhibition on architectural culture was scattered through the building as stations rather than one argument.",
    textDe: "Ausstellungen, die mit ihren Öffentlichkeiten entstehen, nicht für sie: Vardiya machte den Pavillon der Türkei in Venedig zur Werkstatt für 122 Architekturstudierende in wechselnden Schichten; Secret Ingredient holte eine geschlossene Schule in Bronzeville an langen Picknicktischen zurück in ihr Viertel; die Aerocene-Projekte mit dem Studio Tomás Saraceno arbeiteten an einer ethischen Zusammenarbeit mit der Atmosphäre; und die Ausstellung zur Architekturkultur im Istanbul Modern verteilte sich als Stationen im Haus statt als ein einziges Argument.",
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
