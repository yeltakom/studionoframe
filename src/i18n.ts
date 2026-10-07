/** Everything the interface says, in both languages — one word for one thing.
 *  The list of works is the Index. A work is an Exhibition. A group is a
 *  Thread. Facts are nouns. Exhibition titles, venues and years are proper
 *  names and stay as they are. */

export const LANGS = ['en', 'de'] as const;
export type Lang = (typeof LANGS)[number];

export const UI = {
  en: {
    htmlLang: 'en',
    label: 'English',
    switchTo: 'Deutsch',
    short: 'DE',
    nav: { index: 'Index', studio: 'Studio', contact: 'Contact' },
    index: {
      label: 'Index',
      title: 'Exhibitions for museums, biennials and artists.',
      line: (n: number, from: number, to: number) => `${n} works, ${from}–${to}, in five research threads.`,
    },
    threads: 'Threads',
    all: 'All',
    threadOf: (i: number, n: number) => `Thread ${i} of ${n}`,
    columns: { no: '№', exhibition: 'Exhibition', venue: 'Venue', thread: 'Thread', year: 'Year' },
    facts: { venue: 'Venue', dates: 'Dates', year: 'Year', role: 'Role', curator: 'Curator', client: 'Commissioner', team: 'Team', photo: 'Photography', thread: 'Thread', no: 'Catalogue' },
    view: 'Installation view',
    related: 'Also in',
    prev: 'Previous',
    next: 'Next',
    now: 'On view',
    studio: { label: 'Studio', title: 'Exhibitions as research.' },
    contact: { label: 'Contact' },
    internships: { label: 'Internships' },
    footer: { internships: 'Internships', imprint: 'Impressum', privacy: 'Datenschutz' },
    siteTitle: 'Studio No Frame — Exhibition architecture, Berlin',
    description:
      'Studio No Frame is a Berlin studio for exhibition architecture, art production and curation, working with museums, biennials and artists. Led by Yelta Köm.',
  },
  de: {
    htmlLang: 'de',
    label: 'Deutsch',
    switchTo: 'English',
    short: 'EN',
    nav: { index: 'Index', studio: 'Studio', contact: 'Kontakt' },
    index: {
      label: 'Index',
      title: 'Ausstellungen für Museen, Biennalen und Künstler:innen.',
      line: (n: number, from: number, to: number) => `${n} Arbeiten, ${from}–${to}, in fünf Forschungslinien.`,
    },
    threads: 'Linien',
    all: 'Alle',
    threadOf: (i: number, n: number) => `Linie ${i} von ${n}`,
    columns: { no: '№', exhibition: 'Ausstellung', venue: 'Ort', thread: 'Linie', year: 'Jahr' },
    facts: { venue: 'Ort', dates: 'Laufzeit', year: 'Jahr', role: 'Rolle', curator: 'Kuration', client: 'Auftrag', team: 'Team', photo: 'Fotografie', thread: 'Linie', no: 'Katalog' },
    view: 'Ausstellungsansicht',
    related: 'Ebenfalls in',
    prev: 'Zurück',
    next: 'Weiter',
    now: 'Aktuell',
    studio: { label: 'Studio', title: 'Ausstellungen als Forschung.' },
    contact: { label: 'Kontakt' },
    internships: { label: 'Praktika' },
    footer: { internships: 'Praktika', imprint: 'Impressum', privacy: 'Datenschutz' },
    siteTitle: 'Studio No Frame — Ausstellungsarchitektur, Berlin',
    description:
      'Studio No Frame ist ein Berliner Studio für Ausstellungsarchitektur, Kunstproduktion und Kuratierung — für Museen, Biennalen und Künstler:innen. Geleitet von Yelta Köm.',
  },
} as const;

/** The same page in the other language. */
export function altPath(pathname: string, base: string): string {
  const clean = pathname.replace(/\/+$/, '') || '/';
  const root = base || '';
  const inner = clean.startsWith(root) ? clean.slice(root.length) || '/' : clean;
  return inner.startsWith('/de')
    ? `${root}${inner.slice(3) || '/'}`
    : `${root}/de${inner === '/' ? '' : inner}`;
}
