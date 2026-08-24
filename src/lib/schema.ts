import { SITE } from '../site';
import { UI, type Lang } from '../i18n';

const homeUrl = (lang: Lang, site: string, base: string) =>
  `${site}${base}${lang === 'de' ? '/de' : ''}/`;

export function studioSchema(lang: Lang, site: string, base: string, projects: any[]) {
  const url = homeUrl(lang, site, base);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${site}${base}/#studio`,
      name: SITE.name,
      url,
      description: UI[lang].description,
      email: SITE.email,
      founder: { '@type': 'Person', name: SITE.founder, jobTitle: 'Architect and artist' },
      address: { '@type': 'PostalAddress', addressLocality: SITE.city, addressCountry: SITE.country },
      knowsAbout:
        lang === 'de'
          ? ['Ausstellungsarchitektur', 'Ausstellungsgestaltung', 'Kunstproduktion', 'Kuratierung', 'Szenografie']
          : ['Exhibition architecture', 'Exhibition design', 'Art production', 'Curation', 'Scenography'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${SITE.name} — ${lang === 'de' ? 'ausgewählte Ausstellungen' : 'selected exhibitions'}`,
      url,
      inLanguage: lang,
      hasPart: projects.map((p) => ({
        '@type': 'CreativeWork',
        name: p.data.title,
        url: `${url}projects/${p.id}`,
        dateCreated: (p.data.year.match(/\d{4}/) ?? [''])[0],
        locationCreated: { '@type': 'Place', name: p.data.venue },
      })),
    },
  ];
}

export function projectSchema(lang: Lang, site: string, base: string, id: string, data: any) {
  const url = `${homeUrl(lang, site, base)}projects/${id}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: data.title,
      headline: data.title,
      description: data.summary,
      url,
      image: data.images.map((i: string) => `${site}${base}${i}`),
      dateCreated: (data.year.match(/\d{4}/) ?? [''])[0],
      locationCreated: { '@type': 'Place', name: data.venue },
      creator: { '@type': 'Organization', name: SITE.name, url: homeUrl(lang, site, base) },
      creditText: `${data.role} — ${SITE.name}`,
      inLanguage: lang,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: UI[lang].nav.work, item: homeUrl(lang, site, base) },
        { '@type': 'ListItem', position: 2, name: data.title, item: url },
      ],
    },
  ];
}
