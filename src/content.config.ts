import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    venue: z.string(),
    year: z.string(),
    role: z.string(),
    order: z.number(),
    summary: z.string(),
    cover: z.string(),
    images: z.array(z.string()).default([]),
  }),
});

export const collections = { projects };
