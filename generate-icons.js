
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const svgContent = fs.readFileSync(path.join(__dirname, 'public', 'pwa-icon.svg'), 'utf-8');

const sizes = [192, 512];

async function generateIcons() {
  console.log('Generating PWA icons...');
  
  for (const size of sizes) {
    await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png()
      .toFile(path.join(__dirname, 'public', `pwa-${size}x${size}.png`));
    console.log(`Generated pwa-${size}x${size}.png`);
  }
  
  console.log('Icons generated successfully!');
}

generateIcons().catch(console.error);
