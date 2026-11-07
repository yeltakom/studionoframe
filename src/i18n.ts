/** Everything the interface says, in both languages — one word for one thing.
 *  The list is the Index. An entry is a Project. A group is a Category. Facts are nouns. Exhibition titles, venues and years are proper
 *  names and stay as they are. */

export const LANGS = ['en', 'de'] as const;
export type Lang = (typeof LANGS)[number];

export const UI = {
  en: {
    htmlLang: 'en',
    label: 'English',
    switchTo: 'Deutsch',
    short: 'DE',
    nav: { selected: 'Selected', index: 'Index', studio: 'Profile', services: 'Practice', contact: 'Contact' },
    home: {
      title: 'Exhibitions as research.',
      led: 'Led by Yelta Köm',
      line: 'A research-based practice of spatial and visual experience, working across spatial design, scenography and exhibition architecture. Office in Berlin.',
      note: 'This site is still being built, so texts and images may be incomplete. Please bear with us.',
      selected: 'Selected Projects', all: 'All', allProjects: 'All projects →', filter: 'Filter by category', photo: 'Photograph',
    },
    services: { title: 'Practice', line: 'Spatial design, scenography and exhibition architecture, developed through research with artists and institutions.' },
    index: {
      label: 'Index',
      title: 'Exhibitions for museums, biennials and artists.',
      line: (n: number, from: number, to: number) => `${n} projects, ${from}–${to}.`,
    },
    categories: 'Categories',
    columns: { no: '№', project: 'Project', venue: 'Venue', type: 'Type', year: 'Year' },
    facts: { venue: 'Venue', dates: 'Dates', year: 'Year', role: 'Role', curator: 'Curator', client: 'Commissioner', team: 'Team', photo: 'Photography', category: 'Category', no: 'Catalogue' },
    view: 'Installation view',
    related: 'Also in',
    prev: 'Previous',
    next: 'Next',
    now: 'On view',
    studio: { label: 'Studio', title: 'Exhibitions as research.' },
    contact: { label: 'Contact' },
    internships: { label: 'Internships' },
    footer: { internships: 'Internships', imprint: 'Impressum', privacy: 'Datenschutz' },
    siteTitle: 'Studio No Frame — Spatial design, scenography, exhibition architecture, Berlin',
    description:
      'Studio No Frame is a research-based practice of spatial and visual experience in Berlin, working across spatial design, scenography and exhibition architecture. Led by Yelta Köm.',
  },
  de: {
    htmlLang: 'de',
    label: 'Deutsch',
    switchTo: 'English',
    short: 'EN',
    nav: { selected: 'Auswahl', index: 'Index', studio: 'Profil', services: 'Praxis', contact: 'Kontakt' },
    home: {
      title: 'Ausstellungen als Forschung.',
      led: 'Geleitet von Yelta Köm',
      line: 'Eine forschungsbasierte Praxis räumlicher und visueller Erfahrung, zwischen Raumgestaltung, Szenografie und Ausstellungsarchitektur. Büro in Berlin.',
      note: 'Diese Website befindet sich noch im Aufbau, Texte und Bilder können daher unvollständig sein. Wir bitten um Nachsicht.',
      selected: 'Ausgewählte Projekte', all: 'Alle', allProjects: 'Alle Projekte →', filter: 'Nach Kategorie filtern', photo: 'Fotografie',
    },
    services: { title: 'Praxis', line: 'Raumgestaltung, Szenografie und Ausstellungsarchitektur, entwickelt in der Forschung mit Künstler:innen und Institutionen.' },
    index: {
      label: 'Index',
      title: 'Ausstellungen für Museen, Biennalen und Künstler:innen.',
      line: (n: number, from: number, to: number) => `${n} Projekte, ${from}–${to}.`,
    },
    categories: 'Kategorien',
    columns: { no: '№', project: 'Projekt', venue: 'Ort', type: 'Art', year: 'Jahr' },
    facts: { venue: 'Ort', dates: 'Laufzeit', year: 'Jahr', role: 'Rolle', curator: 'Kuration', client: 'Auftrag', team: 'Team', photo: 'Fotografie', category: 'Kategorie', no: 'Katalog' },
    view: 'Ausstellungsansicht',
    related: 'Ebenfalls in',
    prev: 'Zurück',
    next: 'Weiter',
    now: 'Aktuell',
    studio: { label: 'Studio', title: 'Ausstellungen als Forschung.' },
    contact: { label: 'Kontakt' },
    internships: { label: 'Praktika' },
    footer: { internships: 'Praktika', imprint: 'Impressum', privacy: 'Datenschutz' },
    siteTitle: 'Studio No Frame — Raumgestaltung, Szenografie, Ausstellungsarchitektur, Berlin',
    description:
      'Studio No Frame ist eine forschungsbasierte Praxis räumlicher und visueller Erfahrung in Berlin, zwischen Raumgestaltung, Szenografie und Ausstellungsarchitektur. Geleitet von Yelta Köm.',
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
