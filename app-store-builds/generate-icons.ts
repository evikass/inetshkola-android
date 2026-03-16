import ZAI from 'z-ai-web-dev-sdk';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

async function generateIcons() {
  const outputDir = '/home/z/my-project/app-store-builds/store-assets/icons';

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  try {
    const zai = await ZAI.create();

    console.log('🎨 Generating app icon...');

    const response = await zai.images.generations.create({
      prompt: 'App icon for educational app called INETSHKOLA (Russian school). Modern flat design. Purple gradient background (#7c3aed to #1e1b4b). White book icon with graduation cap on top. Clean minimalist style. No text. Suitable for mobile app icon. Rounded corners. Professional app store quality.',
      size: '1024x1024'
    });

    const imageBase64 = response.data[0].base64;
    if (imageBase64) {
      const buffer = Buffer.from(imageBase64, 'base64');
      writeFileSync(join(outputDir, 'icon-base.png'), buffer);
      console.log('✅ Icon generated successfully!');
    }

  } catch (error: any) {
    console.error('❌ Error:', error.message);
  }
}

generateIcons();
