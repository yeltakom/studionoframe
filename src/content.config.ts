import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const shared = {
  title: z.string(),
  venue: z.string(),
  year: z.string(),
  role: z.string(),
  order: z.number(),
  thread: z.string().default(''),
  home: z.boolean().default(false),
  summary: z.string(),
  cover: z.string().optional(),
  images: z.array(z.string()).default([]),
  /* the facts — all optional, shown when filled */
  curator: z.string().default(''),
  client: z.string().default(''),
  team: z.string().default(''),
  photo: z.string().default(''),
  dates: z.string().default(''),
  current: z.boolean().default(false),
  /* a caption for any photograph that deserves one */
  captions: z.array(z.object({ image: z.string(), text: z.string().default(''), credit: z.string().default('') })).default([]),
};
/* the cover is the first photograph unless one is named */
const withCover = z.object(shared).transform((d) => ({ ...d, cover: d.cover || d.images[0] || '' }));

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: withCover,
});

/** German texts. Same slugs; a project without one falls back to English. */
const projectsDe = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects-de' }),
  schema: withCover,
});

export const collections = { projects, projectsDe };
