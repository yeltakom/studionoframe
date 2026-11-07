// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Two builds from one source: the working copy on GitHub Pages
// (https://yeltakom.github.io/studionoframe) and, with SITE_TARGET=noframe,
// the public site on https://noframe.studio.
const live = process.env.SITE_TARGET === 'noframe';

export default defineConfig({
  site: live ? 'https://noframe.studio' : 'https://yeltakom.github.io',
  base: live ? '/' : '/studionoframe',
  // React islands exist only for the Arc UI design experiments under
  // /designs/kartothek and /designs/kabinett; the rest of the site stays
  // plain Astro.
  // Only the .tsx files: a glob wide enough to catch the CSS modules beside
  // them hands those to the JSX transform too, and the build fails on `:root`.
  integrations: [react({ include: ['**/arc/**/*.tsx', '**/islands/**/*.tsx'] })],
});
