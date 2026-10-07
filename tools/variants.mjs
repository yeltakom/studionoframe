// Smaller copies of every photograph, for phones and small windows.
// Runs before `astro build`; writes …-800w and …-1200w next to each original
// and public/images/sizes.json with the originals' widths. Nothing is committed.
import { readdirSync, statSync, existsSync, writeFileSync } from 'node:fs';
import { join, extname, basename, dirname } from 'node:path';
import sharp from 'sharp';

const ROOT = join(dirname(new URL(import.meta.url).pathname), '..', 'public', 'images', 'projects');
const WIDTHS = [800, 1200];
const sizes = {};
let made = 0;

const walk = (dir) => readdirSync(dir).flatMap((n) => { const p = join(dir, n); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = existsSync(ROOT) ? walk(ROOT).filter((p) => /\.(jpe?g|png|webp)$/i.test(p) && !/-\d+w\.\w+$/.test(p)) : [];

for (const file of files) {
  const ext = extname(file), stem = file.slice(0, -ext.length);
  const web = '/images/projects' + file.slice(ROOT.length);
  try {
    const meta = await sharp(file).metadata();
    sizes[web] = meta.width;
    for (const w of WIDTHS) {
      const out = `${stem}-${w}w${ext}`;
      if (meta.width <= w) continue;
      if (existsSync(out) && statSync(out).mtimeMs >= statSync(file).mtimeMs) continue;
      const img = sharp(file).rotate().resize({ width: w });
      await (ext.toLowerCase() === '.webp' ? img.webp({ quality: 80 }) : ext.toLowerCase() === '.png' ? img.png() : img.jpeg({ quality: 80, mozjpeg: true })).toFile(out);
      made++;
    }
  } catch (e) { console.warn(`  ! ${web}: ${e.message}`); }
}
writeFileSync(join(ROOT, '..', 'sizes.json'), JSON.stringify(sizes));
console.log(`variants: ${files.length} photographs, ${made} new copies`);
