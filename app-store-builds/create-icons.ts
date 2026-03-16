import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const sizes = [36, 48, 72, 96, 144, 192, 512];

async function createIcons() {
  const outputDir = '/home/z/my-project/app-store-builds/store-assets/icons';

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const baseIconPath = '/home/z/my-project/public/icon-512.png';

  // Create purple gradient SVG
  const gradientSvg = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#7c3aed"/>
          <stop offset="100%" style="stop-color:#1e1b4b"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
    </svg>
  `;

  for (const size of sizes) {
    // Resize the icon
    await sharp(baseIconPath)
      .resize(size, size)
      .png()
      .toFile(join(outputDir, `icon-${size}.png`));

    console.log(`✅ Created icon-${size}.png`);
  }

  // Create adaptive icon foreground (centered with padding)
  const foregroundSize = 512;
  const iconSize = Math.round(foregroundSize * 0.72);
  const offset = Math.round((foregroundSize - iconSize) / 2);

  // Create foreground with transparent background
  await sharp(baseIconPath)
    .resize(iconSize, iconSize)
    .extend({
      top: offset,
      bottom: offset,
      left: offset,
      right: offset,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile(join(outputDir, 'icon-foreground.png'));

  console.log('✅ Created icon-foreground.png for adaptive icon');

  // Create background gradient
  await sharp(Buffer.from(gradientSvg))
    .resize(512, 512)
    .png()
    .toFile(join(outputDir, 'icon-background.png'));

  console.log('✅ Created icon-background.png for adaptive icon');

  // Create play store feature graphic (1024x500)
  const featureGraphic = `
    <svg width="1024" height="500" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#7c3aed"/>
          <stop offset="100%" style="stop-color:#1e1b4b"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <text x="512" y="200" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">ИНЕТШКОЛА</text>
      <text x="512" y="300" font-family="Arial, sans-serif" font-size="32" fill="white" text-anchor="middle" opacity="0.9">Интерактивная школьная программа</text>
      <text x="512" y="380" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" opacity="0.7">0-11 классы • 50+ игр • Бесплатно</text>
    </svg>
  `;

  await sharp(Buffer.from(featureGraphic))
    .png()
    .toFile(join(outputDir, 'feature-graphic.png'));

  console.log('✅ Created feature-graphic.png for Google Play');

  console.log('\\n🎉 All icons created successfully!');
}

createIcons().catch(console.error);
