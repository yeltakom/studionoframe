/**
 * Arc UI (uiarc.dev) registry fetcher.
 *
 * The shadcn CLI expects a Next/React app layout, so we pull the registry
 * items ourselves. Each item carries its files with a `target` of the form
 * `@components/arc/...`, which maps straight onto `src/components/arc/...`.
 * registryDependencies are resolved recursively.
 *
 *   node tools/arc-fetch.mjs carousel card-stack image-compare
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const REGISTRY = 'https://uiarc.dev/r';

const seen = new Set();
const written = [];
const npmDeps = new Set();

function urlFor(ref) {
  return ref.startsWith('http') ? ref : `${REGISTRY}/${ref}.json`;
}

function pathFor(file) {
  const target = file.target ?? file.path;
  if (target.startsWith('@components/')) {
    return join(ROOT, 'src/components', target.slice('@components/'.length));
  }
  // Fall back to stripping the registry prefix.
  return join(ROOT, 'src/components/arc', target.replace(/^registry\//, ''));
}

async function add(ref) {
  const url = urlFor(ref);
  if (seen.has(url)) return;
  seen.add(url);

  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  const item = await res.json();

  for (const dep of item.registryDependencies ?? []) await add(dep);
  for (const dep of item.dependencies ?? []) npmDeps.add(dep);

  for (const file of item.files ?? []) {
    const out = pathFor(file);
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, file.content, 'utf8');
    written.push(out.slice(ROOT.length + 1));
  }
  console.log(`· ${item.name}`);
}

const names = process.argv.slice(2);
if (!names.length) {
  console.error('usage: node tools/arc-fetch.mjs <item> [...]');
  process.exit(1);
}

for (const name of names) await add(name);

console.log(`\n${written.length} files:`);
for (const f of written.sort()) console.log(`  ${f}`);
console.log(`\nnpm deps needed: ${[...npmDeps].sort().join(', ') || '(none)'}`);
