import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site, url }) => {
  const origin = (site ?? new URL(url.origin)).href.replace(/\/+$/, '');
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);

  const paths: { path: string; priority: string }[] = [
    { path: '/', priority: '1.0' },
    { path: '/about', priority: '0.8' },
    { path: '/contact', priority: '0.7' },
    { path: '/internships', priority: '0.5' },
    ...projects.map((p) => ({ path: `/projects/${p.id}`, priority: '0.9' })),
  ];

  /** Each page exists twice; the pair points at each other so Google serves
   *  the right language instead of treating them as duplicates. */
  const entry = ({ path, priority }: { path: string; priority: string }) => {
    const en = `${origin}${base}${path}`;
    const de = `${origin}${base}/de${path === '/' ? '' : path}`;
    const links = [
      `<xhtml:link rel="alternate" hreflang="en" href="${en}"/>`,
      `<xhtml:link rel="alternate" hreflang="de" href="${de}"/>`,
      `<xhtml:link rel="alternate" hreflang="x-default" href="${en}"/>`,
    ].join('');
    return [
      `  <url><loc>${en}</loc><priority>${priority}</priority>${links}</url>`,
      `  <url><loc>${de}</loc><priority>${priority}</priority>${links}</url>`,
    ].join('\n');
  };

  const legal = ['/impressum', '/datenschutz']
    .map((path) => `  <url><loc>${origin}${base}${path}</loc><priority>0.2</priority></url>`)
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${paths.map(entry).join('\n')}
${legal}
</urlset>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
