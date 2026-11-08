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
      line: 'Studio No Frame designs exhibition architecture in Berlin. We work with curators, artists and institutions on exhibitions of contemporary art, architecture and research, from the first spatial concept to installation.',
      note: 'This site is still being built, so texts and images may be incomplete. Please bear with us.',
      selected: 'Selected Projects', all: 'All', allProjects: 'All projects →', filter: 'Filter by category', photo: 'Photograph',
    },
    services: { title: 'Practice', line: 'Exhibition architecture, production, artist collaborations, spatial research and curation, for museums, biennials and artists.' },
    index: {
      label: 'Index',
      title: 'Exhibitions for museums, biennials and artists.',
      line: (n: number, from: number, to: number) => `${n} projects, ${from}–${to}.`,
    },
    categories: 'Categories',
    columns: { no: '№', project: 'Project', venue: 'Place', type: 'Type', year: 'Year' },
    facts: { venue: 'Place', dates: 'Dates', year: 'Year', role: 'Role', curator: 'Curator', artists: 'Artists', graphic: 'Graphic design', client: 'Commissioner', team: 'Team', photo: 'Photography', category: 'Category', no: 'Catalogue' },
    view: 'Installation view',
    related: 'Also in',
    prev: 'Previous',
    next: 'Next',
    now: 'On view',
    studio: { label: 'Studio', title: 'Exhibitions as research.' },
    contact: { label: 'Contact' },
    internships: { label: 'Internships' },
    footer: { internships: 'Internships', imprint: 'Impressum', privacy: 'Datenschutz' },
    siteTitle: 'Exhibition Architecture and Design, Berlin | Studio No Frame',
    description:
      'Exhibition architecture and design studio in Berlin, led by Yelta Köm. Projects with HKW, Pera Museum, Museum Ludwig and the Venice Biennale.',
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
      line: 'Studio No Frame ist ein Büro für Ausstellungsarchitektur in Berlin. Wir arbeiten mit Kurator:innen, Künstler:innen und Institutionen an Ausstellungen zu zeitgenössischer Kunst, Architektur und Forschung, vom ersten räumlichen Konzept bis zum Aufbau.',
      note: 'Diese Website befindet sich noch im Aufbau, Texte und Bilder können daher unvollständig sein. Wir bitten um Nachsicht.',
      selected: 'Ausgewählte Projekte', all: 'Alle', allProjects: 'Alle Projekte →', filter: 'Nach Kategorie filtern', photo: 'Fotografie',
    },
    services: { title: 'Praxis', line: 'Ausstellungsarchitektur, Produktion, Zusammenarbeit mit Künstler:innen, räumliche Forschung und Kuration, für Museen, Biennalen und Künstler:innen.' },
    index: {
      label: 'Index',
      title: 'Ausstellungen für Museen, Biennalen und Künstler:innen.',
      line: (n: number, from: number, to: number) => `${n} Projekte, ${from}–${to}.`,
    },
    categories: 'Kategorien',
    columns: { no: '№', project: 'Projekt', venue: 'Ort', type: 'Art', year: 'Jahr' },
    facts: { venue: 'Ort', dates: 'Laufzeit', year: 'Jahr', role: 'Rolle', curator: 'Kuration', artists: 'Künstler:innen', graphic: 'Grafikdesign', client: 'Auftrag', team: 'Team', photo: 'Fotografie', category: 'Kategorie', no: 'Katalog' },
    view: 'Ausstellungsansicht',
    related: 'Ebenfalls in',
    prev: 'Zurück',
    next: 'Weiter',
    now: 'Aktuell',
    studio: { label: 'Studio', title: 'Ausstellungen als Forschung.' },
    contact: { label: 'Kontakt' },
    internships: { label: 'Praktika' },
    footer: { internships: 'Praktika', imprint: 'Impressum', privacy: 'Datenschutz' },
    siteTitle: 'Ausstellungsarchitektur Berlin | Studio No Frame',
    description:
      'Büro für Ausstellungsarchitektur in Berlin unter der Leitung von Yelta Köm. Projekte mit HKW, Pera Museum, Museum Ludwig und der Biennale Venedig.',
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
