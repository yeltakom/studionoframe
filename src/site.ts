/** Site-wide settings.
 *  The production address lives in astro.config.mjs (`site` + `base`); every
 *  canonical, sitemap entry and share image is built from it, so moving to
 *  noframe.studio is a two-line change there and nothing else. */
export const SITE = {
  name: 'Studio No Frame',
  tagline: 'Exhibition architecture, production and curation. Berlin.',
  description:
    'Studio No Frame is a Berlin studio for exhibition architecture, art production and curation, working with museums, biennials and artists. Led by Yelta Köm.',
  email: 'contact@noframe.studio',
  founder: 'Yelta Köm',
  city: 'Berlin',
  country: 'DE',
  /** Paste the GA4 measurement id here, e.g. 'G-XXXXXXXXXX'. Empty = no tracking. */
  GA_MEASUREMENT_ID: '',
};
