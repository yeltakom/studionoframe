# Studio No Frame

Portfolio site for Studio No Frame — exhibition architecture, production and
curation. A static [Astro](https://astro.build) site, deployed to GitHub Pages
by GitHub Actions on every push to `main`. No CMS server, no database, no
monthly fee: the site is plain HTML once built.

**Preview:** https://yeltakom.github.io/studionoframe

## Editing content in the browser

Go to https://yeltakom.github.io/studionoframe/admin/ and choose **Sign In with
Token**, using a GitHub personal access token with read/write access to this
repo. Saving commits to `main`, which rebuilds and redeploys the site in about
a minute. Nothing else needs to run.

## Editing content in files

Each exhibition is one markdown file in `src/content/projects/`. The filename
is the URL (`vardiya.md` → `/projects/vardiya`).

```markdown
---
title: "Vardiya / The Shift"
venue: "Pavilion of Turkey, 16th Venice Architecture Biennale"
year: "2018"
role: "Associate Curator"
order: 13              # position on the work grid, 1 comes first
accent: "#0a78b9"      # colour sampled from the installation photos
summary: "One sentence, used for link previews."
cover: "/images/projects/vardiya/vardiya-01.jpg"
images:
  - "/images/projects/vardiya/vardiya-01.jpg"
---

The description shown on the project page. Markdown, so *emphasis* works.
```

Photos live in `public/images/projects/<slug>/` and are referenced with a
root-relative path.

## Design

The studio takes the colour of the show it builds: the ground stays
gallery-neutral and every project carries an `accent` sampled from its own
installation photographs. Those accents make the spectrum strip under the
header — the whole practice in one line, and a link to every exhibition.

## Local development

Requires Node.js 22.12+.

```sh
npm install
npm run dev      # local dev server
npm run build    # static build to dist/
npm run preview  # serve the built site
```

## Analytics

Paste a GA4 measurement id into `GA_MEASUREMENT_ID` in `src/site.ts` to switch
Google Analytics on. Left empty, no tracking script is emitted.

## Structure

- `src/pages/` — `/`, `/about`, `/contact`, `/internships`, `/impressum`,
  `/datenschutz`, `/projects/[slug]`
- `src/layouts/BaseLayout.astro` — head, header, spectrum, footer
- `src/content/projects/` — one markdown file per exhibition
- `src/styles/global.css` — all styling
- `src/site.ts` — studio name, contact address, analytics id
- `public/admin/` — browser CMS
- `.github/workflows/deploy.yml` — build and deploy
