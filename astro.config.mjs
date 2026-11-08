// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Two builds from one source: the working copy on GitHub Pages
// (https://yeltakom.github.io/studionoframe) and, with SITE_TARGET=noframe,
// the public site on https://noframe.studio.
const live = process.env.SITE_TARGET === 'noframe';

// Old Cargo addresses (studionoframe.cargo.site, served at noframe.studio until
// November 2026) point to the new pages, so links and search results keep working.
// Static hosting cannot send a real 301; Astro writes a small page with a refresh
// and a canonical link, which Google follows.
const P = (slug) => `/projects/${slug}`;
const OLD = {
  'calculations-and-coincidences': P('vera-molnar'),
  'in-search-of-vera-molnár': P('vera-molnar-tribute'),
  'marcel-dzama-dancing-with-the-moon': P('marcel-dzama-istanbul'),
  'marcel-dzama-pera-museum': P('marcel-dzama-istanbul'),
  'marcel-dzama-pera-museum-5': P('marcel-dzama-istanbul'),
  'souvenirs-of-the-future': P('gelecek-hatiralari'),
  'füsun-onur-retrospective': P('fusun-onur-ludwig'),
  'füsun-onur-once-upon-a-time-': P('once-upon-a-time'),
  'gülsün-karamustafa': P('gulsun-karamustafa'),
  'state-of-displacement-entangled-topographies': P('arazi-x-topological-istanbul'),
  'the-silent-university-orientation-program': P('silent-university-istanbul'),
  'partial-weaves-unfinished-stories-of-displacement': P('topological-atlas-berlin'),
  'secret-ingredient': P('secret-ingredient'),
  'vardiya-the-shift': P('vardiya'),
  'caution!-slippery-ground': P('istanbul-modern-culture'),
  'disobedience-archive-park': P('disobedience-archive'),
  'selected-work': '/',
  'main': '/',
  'right-—-cv': '/about',
  'left-—-profile': '/about',
  'contact-form': '/contact',
};
const redirects = {};
for (const [from, to] of Object.entries(OLD)) {
  redirects[`/${from}`] = to;
  // Cargo also served each project's info panel at its own address
  if (to.startsWith('/projects/')) redirects[`/${from.replace(/-$/, '')}-_-info`] = to;
}
// "/Internships" (capital I) only on Linux, where the build runs: on a Mac's
// case-insensitive disk it would overwrite /internships/.
redirects['/gülsün-karamustafa_-info'] = P('gulsun-karamustafa'); // Cargo spelt this one without the dash
if (process.platform === 'linux') redirects['/Internships'] = '/internships';

export default defineConfig({
  site: live ? 'https://noframe.studio' : 'https://yeltakom.github.io',
  base: live ? '/' : '/studionoframe',
  // React islands exist only for the Arc UI design experiments under
  // /designs/kartothek and /designs/kabinett; the rest of the site stays
  // plain Astro.
  // Only the .tsx files: a glob wide enough to catch the CSS modules beside
  // them hands those to the JSX transform too, and the build fails on `:root`.
  redirects: live ? redirects : {},
  integrations: [react({ include: ['**/arc/**/*.tsx', '**/islands/**/*.tsx'] })],
});
