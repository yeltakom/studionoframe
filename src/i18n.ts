/** Everything the interface says, in both languages.
 *  Exhibition titles, venues and years are proper names and stay as they are. */

export const LANGS = ['en', 'de'] as const;
export type Lang = (typeof LANGS)[number];

export const UI = {
  en: {
    htmlLang: 'en',
    label: 'English',
    switchTo: 'Deutsch',
    nav: { work: 'Work', about: 'About', contact: 'Contact' },
    columns: { year: 'Year', exhibition: 'Exhibition', venue: 'Venue', role: 'Role' },
    lead: 'Exhibition architecture, production and curation, from Berlin.',
    leadDetail: (count: number, from: number) =>
      `${count} shows built with museums, biennials and artists since ${from}. Hover a line to see the room it became.`,
    prev: 'Previous',
    next: 'Next',
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
    columns: { year: 'Jahr', exhibition: 'Ausstellung', venue: 'Ort', role: 'Rolle' },
    lead: 'Ausstellungsarchitektur, Produktion und Kuratierung, aus Berlin.',
    leadDetail: (count: number, from: number) =>
      `${count} Ausstellungen mit Museen, Biennalen und Künstler:innen seit ${from}. Fahren Sie über eine Zeile, um den Raum zu sehen.`,
    prev: 'Zurück',
    next: 'Weiter',
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
