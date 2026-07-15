# Studio No Frame

Portfolio website for Studio No Frame. Built with [Astro](https://astro.build),
deployed to GitHub Pages via GitHub Actions on every push to `main`.

**Live site:** https://yeltakom.github.io/studionoframe

## Development

Requires Node.js 22+.

```sh
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Adding a project

Create a markdown file in `src/content/projects/` — the filename becomes the
URL slug (`my-project.md` → `/projects/my-project`). Put images in
`public/images/` and reference them with a root-relative path:

```markdown
---
title: Project Title
year: 2026
category: Identity
cover: /images/my-project-cover.jpg
images:
  - /images/my-project-1.jpg
  - /images/my-project-2.jpg
description: One-sentence summary shown on the project page.
---

Optional longer write-up in markdown, rendered below the image gallery.
```

## Structure

- `src/layouts/BaseLayout.astro` — shared head, nav, footer
- `src/pages/` — `/` (work grid), `/about`, `/contact`, `/projects/[slug]`
- `src/content/projects/` — one markdown file per project
- `src/styles/global.css` — all styling (deliberately minimal for now)
- `.github/workflows/deploy.yml` — build & deploy to GitHub Pages
