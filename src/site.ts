/** Site-wide settings.
 *  The production address lives in astro.config.mjs (`site` + `base`); every
 *  canonical, sitemap entry and share image is built from it, so moving to
 *  noframe.studio is a two-line change there and nothing else. */
export const SITE = {
  name: 'Studio No Frame',
  tagline: 'Spatial design, scenography, exhibition architecture. Berlin.',
  description:
    'Studio No Frame is a research-based practice of spatial and visual experience in Berlin, working across spatial design, scenography and exhibition architecture. Led by Yelta Köm.',
  email: 'contact@noframe.studio',
  instagram: 'https://www.instagram.com/studio.no.frame/',
  founder: 'Yelta Köm',
  city: 'Berlin',
  country: 'DE',
  /** Paste the GA4 measurement id here, e.g. 'G-XXXXXXXXXX'. Empty = no tracking. */
  GA_MEASUREMENT_ID: '',
};
