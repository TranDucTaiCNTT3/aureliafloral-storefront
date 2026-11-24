import { readdir, mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const sourceDir = path.join(root, '..', 'images');
const outputDir = path.join(root, '..', 'dist', 'images');
const dataPath = path.join(root, '..', 'data', 'products.json');
const outputDataPath = path.join(root, '..', 'dist', 'data', 'products.json');

if (!existsSync(sourceDir)) {
  console.log('Không có thư mục images/, bỏ qua tối ưu ảnh.');
  process.exit(0);
}

await mkdir(outputDir, { recursive: true });
await mkdir(path.dirname(outputDataPath), { recursive: true });
const entries = await readdir(sourceDir, { withFileTypes: true });
const sourceImages = entries.filter((entry) => entry.isFile() && /\.(jpe?g|png)$/i.test(entry.name));

for (const entry of sourceImages) {
  const input = path.join(sourceDir, entry.name);
  const base = entry.name.replace(/\.(jpe?g|png)$/i, '');
  await sharp(input).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82, effort: 4 }).toFile(path.join(outputDir, `${base}.webp`));
  await sharp(input).rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).avif({ quality: 58, effort: 4 }).toFile(path.join(outputDir, `${base}.avif`));
}

if (existsSync(dataPath) && existsSync(path.dirname(outputDataPath))) {
  const products = JSON.parse(await readFile(dataPath, 'utf8'));
  const optimized = products.map((product) => ({
    ...product,
    image: String(product.image || '').replace(/\.(jpe?g|png)$/i, '.webp')
  }));
  await writeFile(outputDataPath, JSON.stringify(optimized, null, 2) + '\n');
}

console.log(`Đã tối ưu ${sourceImages.length} ảnh sản phẩm sang WebP/AVIF.`);
