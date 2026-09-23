/** Everything the interface says, in both languages.
 *  Exhibition titles, venues and years are proper names and stay as they are. */

export const LANGS = ['en', 'de'] as const;
export type Lang = (typeof LANGS)[number];

export const UI = {
  en: {
    htmlLang: 'en',
    label: 'English',
    switchTo: 'Deutsch',
    nav: { work: 'Works', about: 'Studio', contact: 'Contact' },
    columns: { no: '№', year: 'Year', exhibition: 'Exhibition', venue: 'Venue', role: 'Role', thread: 'Thread' },
    statement: 'Studio No Frame builds exhibitions for museums, biennials and artists.',
    statementMore:
      'Each one starts as a question — about displacement, about what an archive can hold, about how a collection is read — and ends as a room people walk through. The work is arranged by those questions.',
    threads: 'Research threads',
    worksCount: (n: number) => `${n} ${n === 1 ? 'work' : 'works'}`,
    allWorks: 'All nineteen works',
    worksTitle: 'Works',
    worksSub: (n: number, from: number, to: number) => `${n} exhibitions, ${from}–${to}, in five research threads`,
    filterAll: 'All',
    filterLabel: 'Filter by thread',
    cue: 'Works',
    thesis: 'Exhibitions as research.',
    thesisMore: 'Nineteen works in five threads, 2014–2026. Touch a name to see its room.',
    view: 'Installation view',
    prev: 'Previous',
    next: 'Next',
    lead: 'Exhibition architecture, production and curation, from Berlin.',
    leadDetail: (count: number, from: number) =>
      `${count} shows built with museums, biennials and artists since ${from}.`,
    footer: { internships: 'Internships', imprint: 'Impressum', privacy: 'Datenschutz' },
    installationView: (n: number) => `installation view ${n}`,
    siteTitle: 'Studio No Frame — Exhibition architecture, Berlin',
    description:
      'Studio No Frame is a Berlin studio for exhibition architecture, art production and curation, working with museums, biennials and artists. Led by Yelta Köm.',
  },
  de: {
    htmlLang: 'de',
    label: 'Deutsch',
    switchTo: 'English',
    nav: { work: 'Arbeiten', about: 'Studio', contact: 'Kontakt' },
    columns: { no: '№', year: 'Jahr', exhibition: 'Ausstellung', venue: 'Ort', role: 'Rolle', thread: 'Linie' },
    statement: 'Studio No Frame baut Ausstellungen für Museen, Biennalen und Künstler:innen.',
    statementMore:
      'Jede beginnt mit einer Frage — nach Vertreibung, nach dem, was ein Archiv fassen kann, nach der Lesart einer Sammlung — und endet als Raum, durch den Menschen gehen. Die Arbeiten sind nach diesen Fragen geordnet.',
    threads: 'Forschungslinien',
    worksCount: (n: number) => `${n} ${n === 1 ? 'Arbeit' : 'Arbeiten'}`,
    allWorks: 'Alle neunzehn Arbeiten',
    worksTitle: 'Arbeiten',
    worksSub: (n: number, from: number, to: number) => `${n} Ausstellungen, ${from}–${to}, in fünf Forschungslinien`,
    filterAll: 'Alle',
    filterLabel: 'Nach Linie filtern',
    cue: 'Arbeiten',
    thesis: 'Ausstellungen als Forschung.',
    thesisMore: 'Neunzehn Arbeiten in fünf Linien, 2014–2026. Einen Namen berühren, um den Raum zu sehen.',
    view: 'Ausstellungsansicht',
    prev: 'Zurück',
    next: 'Weiter',
    lead: 'Ausstellungsarchitektur, Produktion und Kuratierung, aus Berlin.',
    leadDetail: (count: number, from: number) =>
      `${count} Ausstellungen mit Museen, Biennalen und Künstler:innen seit ${from}.`,
    footer: { internships: 'Praktika', imprint: 'Impressum', privacy: 'Datenschutz' },
    installationView: (n: number) => `Ausstellungsansicht ${n}`,
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
