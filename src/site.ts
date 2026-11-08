/** Site-wide settings.
 *  The production address lives in astro.config.mjs (`site` + `base`); every
 *  canonical, sitemap entry and share image is built from it, so moving to
 *  noframe.studio is a two-line change there and nothing else. */
export const SITE = {
  name: 'Studio No Frame',
  tagline: 'Exhibition architecture and design. Berlin.',
  description:
    'Exhibition architecture and design studio in Berlin, led by Yelta Köm. Projects with HKW, Pera Museum, Museum Ludwig and the Venice Biennale.',
  email: 'contact@noframe.studio',
  instagram: 'https://www.instagram.com/studio.no.frame/',
  founder: 'Yelta Köm',
  city: 'Berlin',
  country: 'DE',
  /** Paste the GA4 measurement id here, e.g. 'G-XXXXXXXXXX'. Empty = no tracking. */
  GA_MEASUREMENT_ID: '',
};
