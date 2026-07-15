import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    year: z.number(),
    category: z.string(),
    cover: z.string(),
    images: z.array(z.string()).default([]),
    description: z.string(),
  }),
});

export const collections = { projects };
