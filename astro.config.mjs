// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// GitHub Pages: https://yeltakom.github.io/studionoframe
export default defineConfig({
  site: 'https://yeltakom.github.io',
  base: '/studionoframe',
  // React islands exist only for the Arc UI design experiments under
  // /designs/kartothek and /designs/kabinett; the rest of the site stays
  // plain Astro.
  // Only the .tsx files: a glob wide enough to catch the CSS modules beside
  // them hands those to the JSX transform too, and the build fails on `:root`.
  integrations: [react({ include: ['**/arc/**/*.tsx', '**/islands/**/*.tsx'] })],
});
