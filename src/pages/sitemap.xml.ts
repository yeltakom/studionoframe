import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ site, url }) => {
  const origin = (site ?? new URL(url.origin)).href.replace(/\/+$/, '');
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const projects = await getCollection('projects');

  const pages: { path: string; priority: string }[] = [
    { path: '/', priority: '1.0' },
    { path: '/about', priority: '0.8' },
    { path: '/contact', priority: '0.7' },
    { path: '/internships', priority: '0.5' },
    { path: '/impressum', priority: '0.2' },
    { path: '/datenschutz', priority: '0.2' },
    ...projects
      .sort((a, b) => a.data.order - b.data.order)
      .map((p) => ({ path: `/projects/${p.id}`, priority: '0.9' })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    ({ path, priority }) =>
      `  <url><loc>${origin}${base}${path}</loc><priority>${priority}</priority></url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
