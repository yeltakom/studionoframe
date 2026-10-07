import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/** Smaller copies of every photograph are made at build time by
 *  tools/variants.mjs (…-800w.jpg, …-1200w.jpg). Where they exist, the
 *  browser gets to choose; where they do not, the original is served. */
const PUBLIC = join(process.cwd(), 'public');
export const WIDTHS = [800, 1200];
let sizes: Record<string, number> = {};
try { sizes = JSON.parse(readFileSync(`${PUBLIC}/images/sizes.json`, 'utf8')); } catch { /* not generated yet */ }

export function srcset(base: string, src: string): string | undefined {
  const m = src.match(/^(.*)\.(jpe?g|png|webp)$/i);
  if (!m) return undefined;
  const parts = WIDTHS.filter((w) => existsSync(`${PUBLIC}${m[1]}-${w}w.${m[2]}`)).map((w) => `${base}${m[1]}-${w}w.${m[2]} ${w}w`);
  if (!parts.length) return undefined;
  return [...parts, `${base}${src} ${sizes[src] ?? 1800}w`].join(', ');
}
export const SIZES = {
  full: '(min-width: 1200px) 1100px, calc(100vw - 2.2rem)',
  half: '(min-width: 820px) 50vw, calc(100vw - 2.2rem)',
  side: '(min-width: 760px) 38vw, 100vw',
};
