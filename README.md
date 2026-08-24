# Studio No Frame

Portfolio site for Studio No Frame — exhibition architecture, production and
curation. A static [Astro](https://astro.build) site, deployed to GitHub Pages
by GitHub Actions on every push to `main`. No CMS server, no database, no
monthly fee: the site is plain HTML once built.

**Preview:** https://yeltakom.github.io/studionoframe

## Adding and editing exhibitions

Content lives in a table and a photo folder — see **[studio/README.md](studio/README.md)**
for the full walkthrough (in Turkish).

```sh
npm run new -- "Exhibition Title"   # adds a row and a photo folder
# drop photos into studio/photos/<slug>/, fill the row in studio/projects.csv
npm run publish                     # table + photos -> site -> live
```

`npm run sync` does the same without publishing, and `npm run export` writes
the live content back into the table — run it after editing through the browser
CMS at `/admin/`, so the table does not overwrite those edits.

Under the hood each exhibition is one markdown file in `src/content/projects/`.
The filename is the URL (`vardiya.md` → `/projects/vardiya`).

```markdown
---
title: "Vardiya / The Shift"
venue: "Pavilion of Turkey, 16th Venice Architecture Biennale"
year: "2018"
role: "Associate Curator"
order: 13              # position in the checklist, 1 comes first
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

The index is an exhibition checklist — year, title, venue, role — with each
show's photograph summoned at the cursor. Project pages do the opposite: the
work large, opening on a full-width lead image. One typeface throughout,
Helvetica falling back to Arial, with no webfonts loaded.

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
- `studio/` — the content table and photo drop folders
- `tools/` — sync, export and publish scripts
- `public/admin/` — browser CMS
- `.github/workflows/deploy.yml` — build and deploy
