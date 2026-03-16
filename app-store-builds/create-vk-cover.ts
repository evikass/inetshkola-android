import sharp from 'sharp';
import { join } from 'path';

async function createVKCover() {
  const outputDir = '/home/z/my-project/public/store-assets';

  // Create SVG for the cover
  const svg = `
    <svg width="1920" height="768" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#7c3aed"/>
          <stop offset="50%" style="stop-color:#5b21b6"/>
          <stop offset="100%" style="stop-color:#1e1b4b"/>
        </linearGradient>

        <linearGradient id="iconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#a78bfa"/>
          <stop offset="100%" style="stop-color:#7c3aed"/>
        </linearGradient>

        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="10" stdDeviation="20" flood-color="#000" flood-opacity="0.3"/>
        </filter>

        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="100%" height="100%" fill="url(#bgGrad)"/>

      <!-- Decorative circles -->
      <circle cx="100" cy="100" r="300" fill="#7c3aed" opacity="0.3"/>
      <circle cx="1800" cy="650" r="250" fill="#a78bfa" opacity="0.2"/>
      <circle cx="1600" cy="150" r="150" fill="#5b21b6" opacity="0.3"/>

      <!-- Small decorative elements -->
      <circle cx="1700" cy="200" r="20" fill="#fff" opacity="0.2"/>
      <circle cx="1750" cy="350" r="15" fill="#fff" opacity="0.15"/>
      <circle cx="1800" cy="500" r="25" fill="#fff" opacity="0.1"/>
      <circle cx="200" cy="600" r="18" fill="#fff" opacity="0.15"/>
      <circle cx="300" cy="700" r="12" fill="#fff" opacity="0.2"/>

      <!-- Book icon background circle -->
      <circle cx="350" cy="384" r="140" fill="#fff" opacity="0.1" filter="url(#shadow)"/>

      <!-- Book icon -->
      <g transform="translate(350, 384)" filter="url(#shadow)">
        <!-- Book base -->
        <rect x="-60" y="-40" width="120" height="80" rx="8" fill="#fff"/>
        <rect x="-55" y="-35" width="50" height="70" rx="4" fill="#f3f4f6"/>
        <rect x="5" y="-35" width="50" height="70" rx="4" fill="#f9fafb"/>

        <!-- Book spine -->
        <rect x="-2" y="-40" width="4" height="80" fill="#e5e7eb"/>

        <!-- Lines on pages -->
        <rect x="-45" y="-20" width="30" height="3" rx="1" fill="#d1d5db"/>
        <rect x="-45" y="-10" width="25" height="3" rx="1" fill="#d1d5db"/>
        <rect x="-45" y="0" width="30" height="3" rx="1" fill="#d1d5db"/>
        <rect x="-45" y="10" width="20" height="3" rx="1" fill="#d1d5db"/>
        <rect x="-45" y="20" width="25" height="3" rx="1" fill="#d1d5db"/>

        <rect x="15" y="-20" width="30" height="3" rx="1" fill="#d1d5db"/>
        <rect x="15" y="-10" width="25" height="3" rx="1" fill="#d1d5db"/>
        <rect x="15" y="0" width="30" height="3" rx="1" fill="#d1d5db"/>
        <rect x="15" y="10" width="20" height="3" rx="1" fill="#d1d5db"/>

        <!-- Graduation cap -->
        <g transform="translate(0, -70)">
          <polygon points="0,-25 -40,0 0,10 40,0" fill="#fff"/>
          <rect x="-5" y="0" width="10" height="25" fill="#e5e7eb"/>
          <rect x="-8" y="20" width="16" height="5" rx="2" fill="#fff"/>
        </g>
      </g>

      <!-- Title -->
      <text x="580" y="320" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="#fff" filter="url(#glow)">ИНЕТШКОЛА</text>

      <!-- Subtitle -->
      <text x="580" y="420" font-family="Arial, sans-serif" font-size="36" fill="#fff" opacity="0.9">Интерактивная образовательная платформа</text>

      <!-- Features -->
      <g transform="translate(580, 500)">
        <!-- Feature 1 -->
        <circle cx="0" cy="0" r="8" fill="#a78bfa"/>
        <text x="25" y="8" font-family="Arial, sans-serif" font-size="24" fill="#fff" opacity="0.85">0-11 классы</text>

        <!-- Feature 2 -->
        <circle cx="200" cy="0" r="8" fill="#a78bfa"/>
        <text x="225" y="8" font-family="Arial, sans-serif" font-size="24" fill="#fff" opacity="0.85">50+ игр</text>

        <!-- Feature 3 -->
        <circle cx="380" cy="0" r="8" fill="#a78bfa"/>
        <text x="405" y="8" font-family="Arial, sans-serif" font-size="24" fill="#fff" opacity="0.85">Бесплатно</text>

        <!-- Feature 4 -->
        <circle cx="550" cy="0" r="8" fill="#a78bfa"/>
        <text x="575" y="8" font-family="Arial, sans-serif" font-size="24" fill="#fff" opacity="0.85">Без рекламы</text>
      </g>

      <!-- VK App badge -->
      <g transform="translate(1550, 600)">
        <rect x="0" y="0" width="280" height="60" rx="30" fill="#fff" opacity="0.15"/>
        <text x="140" y="40" font-family="Arial, sans-serif" font-size="22" fill="#fff" text-anchor="middle">vk.com/app54475974</text>
      </g>

      <!-- Decorative books at bottom -->
      <g transform="translate(100, 680)" opacity="0.3">
        <rect x="0" y="0" width="40" height="50" rx="4" fill="#fff" transform="rotate(-10)"/>
        <rect x="50" y="5" width="35" height="45" rx="4" fill="#fff" transform="rotate(5)"/>
        <rect x="95" y="0" width="40" height="50" rx="4" fill="#fff" transform="rotate(-5)"/>
      </g>

      <!-- Stars/sparkles -->
      <g fill="#fff" opacity="0.4">
        <polygon transform="translate(1500, 100) scale(0.5)" points="0,-20 5,-5 20,-5 8,5 13,20 0,12 -13,20 -8,5 -20,-5 -5,-5"/>
        <polygon transform="translate(1650, 250) scale(0.3)" points="0,-20 5,-5 20,-5 8,5 13,20 0,12 -13,20 -8,5 -20,-5 -5,-5"/>
        <polygon transform="translate(1800, 400) scale(0.4)" points="0,-20 5,-5 20,-5 8,5 13,20 0,12 -13,20 -8,5 -20,-5 -5,-5"/>
        <polygon transform="translate(100, 300) scale(0.35)" points="0,-20 5,-5 20,-5 8,5 13,20 0,12 -13,20 -8,5 -20,-5 -5,-5"/>
      </g>
    </svg>
  `;

  // Convert SVG to PNG
  await sharp(Buffer.from(svg))
    .png()
    .toFile(join(outputDir, 'vk-cover.png'));

  console.log('✅ VK Cover created: /public/store-assets/vk-cover.png');
  console.log('📐 Size: 1920x768 px');
}

createVKCover().catch(console.error);
