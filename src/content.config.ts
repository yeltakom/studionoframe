import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const shared = {
  title: z.string(),
  venue: z.string(),
  year: z.string(),
  role: z.string(),
  order: z.number(),
  summary: z.string(),
  cover: z.string(),
  images: z.array(z.string()).default([]),
};

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object(shared),
});

/** German texts. Same slugs; a project without one falls back to English. */
const projectsDe = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects-de' }),
  schema: z.object(shared),
});

export const collections = { projects, projectsDe };
