import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicAssetsDir = path.join(__dirname, '..', 'public', 'assets');

if (!fs.existsSync(publicAssetsDir)) {
  fs.mkdirSync(publicAssetsDir, { recursive: true });
}

const assets = [
  'door-without-seal-Cf0oMNfE.webp',
  'door-opener-DJNfHF4K.webp',
  'beige-door-seal-u9U35zcr.webp',
  'beige-door-BRHnHfUz.webp',
  'beige-flowers-BZ4-wrW3.webp',
  'background-red-transparent-iSRlZ9M0.png',
  'arabic-background-DBU534Xs.png',
  'background-C6pNkJtI.png',
  'background-sircle-transparent-DZPBmiv7.png',
  'lokatsiya-cutout-C5i7Qws-.png',
  'yor-yor-BtPjvRN1.mp3',
  'andasia-2HtZKfpH.ttf',
  'great-vibes-latin-400-normal-q5-78SH_.woff2'
];

async function downloadAll() {
  for (const asset of assets) {
    const url = `https://taklifnomaa.pages.dev/assets/${asset}`;
    const dest = path.join(publicAssetsDir, asset);
    try {
      console.log(`Downloading: ${asset}...`);
      const res = await fetch(url);
      if (!res.ok) {
        console.warn(`Failed ${asset}: ${res.status}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`Saved: ${asset} (${buffer.length} bytes)`);
    } catch (e) {
      console.error(`Error ${asset}:`, e.message);
    }
  }
}

downloadAll();
