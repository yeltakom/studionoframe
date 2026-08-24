import { getCollection } from 'astro:content';
import type { Lang } from '../i18n';

export type Project = {
  id: string;
  data: Record<string, any>;
  /** The entry whose markdown body should be rendered for this language. */
  entry: any;
};

/** Projects in portfolio order. German texts overlay the English ones;
 *  anything not translated yet stays in English rather than disappearing. */
export async function getProjects(lang: Lang): Promise<Project[]> {
  const en = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
  if (lang === 'en') return en.map((p) => ({ id: p.id, data: p.data, entry: p }));

  const de = new Map((await getCollection('projectsDe')).map((p) => [p.id, p]));
  return en.map((p) => {
    const t = de.get(p.id);
    return { id: p.id, data: { ...p.data, ...(t?.data ?? {}) }, entry: t ?? p };
  });
}
