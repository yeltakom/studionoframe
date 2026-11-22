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

/** Pixel size of a photograph in public/, read from the file header at build
 *  time, so the page can lay photographs out at their own proportions. */
const dimCache = new Map<string, { w: number; h: number }>();
export function dims(src: string): { w: number; h: number } {
  if (dimCache.has(src)) return dimCache.get(src)!;
  let out = { w: 3, h: 2 };
  try {
    const b = readFileSync(`${PUBLIC}${src}`);
    if (b[0] === 0x89 && b[1] === 0x50) out = { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
    else if (b[0] === 0xff && b[1] === 0xd8) {
      let i = 2;
      while (i < b.length) {
        if (b[i] !== 0xff) { i++; continue; }
        const m = b[i + 1];
        if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) { out = { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) }; break; }
        i += 2 + b.readUInt16BE(i + 2);
      }
    }
  } catch { /* missing file: keep 3:2 */ }
  dimCache.set(src, out);
  return out;
}
