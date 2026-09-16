// Generates all PNG icon sizes from public/favicon.svg.
// Run with: node scripts/generate-icons.mjs
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const svg = await readFile(path.join(root, 'public/favicon.svg'));

const outputs = [
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'favicon-32.png', size: 32 },
];

for (const { file, size } of outputs) {
  await sharp(svg, { density: 300 }).resize(size, size).png().toFile(path.join(root, 'public', file));
  console.log(`created public/${file} (${size}x${size})`);
}

// Maskable icon: art scaled into the safe zone (80%) on a full-bleed backdrop.
const inner = String(svg).replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
const maskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#0e1020"/>
  <g transform="translate(51.2,51.2) scale(0.8)">${inner}</g>
</svg>`;
await writeFile(path.join(root, 'public/icon-maskable.svg'), maskable);
await sharp(Buffer.from(maskable), { density: 300 }).resize(512, 512).png().toFile(path.join(root, 'public/icon-512-maskable.png'));
console.log('created public/icon-maskable.svg and public/icon-512-maskable.png (512x512)');
