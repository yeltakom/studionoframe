import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site, url }) => {
  const origin = (site ?? new URL(url.origin)).href.replace(/\/+$/, '');
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${origin}${base}/sitemap.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
};
