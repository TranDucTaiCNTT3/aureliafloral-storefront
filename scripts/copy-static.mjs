import { cp, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, '..', 'dist');

await cp(path.join(root, '..', 'index.html'), path.join(dist, 'index.html'));
await cp(path.join(root, '..', 'data'), path.join(dist, 'data'), { recursive: true });

for (const name of ['images', 'assets']) {
  const source = path.join(root, '..', name);
  if (existsSync(source)) await cp(source, path.join(dist, name), { recursive: true, force: true });
}

for (const name of ['robots.txt', 'sitemap.xml', 'manus-routes.json']) {
  const source = path.join(root, '..', name);
  if (existsSync(source)) await cp(source, path.join(dist, name));
}

await mkdir(path.join(dist, 'assets'), { recursive: true });
