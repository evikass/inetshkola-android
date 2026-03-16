import { chromium, devices } from 'playwright';
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://evikass.github.io/school-curriculum-app/';

async function generateScreenshots() {
  const outputDir = '/home/z/my-project/app-store-builds/store-assets/screenshots';

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  console.log('🚀 Запуск браузера для создания скриншотов...');

  const browser = await chromium.launch({
    headless: true
  });

  // ===== PHONE SCREENSHOTS (1080x1920) =====
  console.log('\\n📱 Создание скриншотов для телефона...');

  const phoneContext = await browser.newContext({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const phonePage = await phoneContext.newPage();

  // Screenshot 1: Main screen with grade selection
  console.log('  📷 Главный экран...');
  await phonePage.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await phonePage.waitForTimeout(3000);
  await phonePage.screenshot({
    path: join(outputDir, 'phone-1-home.png'),
    fullPage: false
  });
  console.log('  ✅ phone-1-home.png');

  // Screenshot 2: Try to click on a grade
  try {
    console.log('  📷 Выбор класса...');
    const grade5Button = phonePage.locator('button:has-text("5"), [class*="grade"]:has-text("5"), text=5 класс').first();
    await grade5Button.click({ timeout: 5000 });
    await phonePage.waitForTimeout(3000);
    await phonePage.screenshot({
      path: join(outputDir, 'phone-2-grade.png'),
      fullPage: false
    });
    console.log('  ✅ phone-2-grade.png');
  } catch (e) {
    console.log('  ⚠️ Не удалось выбрать класс, используем альтернативный метод');

    // Take a screenshot of scrolled page
    await phonePage.evaluate(() => window.scrollBy(0, 500));
    await phonePage.waitForTimeout(1000);
    await phonePage.screenshot({
      path: join(outputDir, 'phone-2-grade.png'),
      fullPage: false
    });
    console.log('  ✅ phone-2-grade.png (альтернатива)');
  }

  // Screenshot 3: Full page scroll
  await phonePage.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await phonePage.waitForTimeout(2000);
  await phonePage.screenshot({
    path: join(outputDir, 'phone-3-content.png'),
    fullPage: true
  });
  console.log('  ✅ phone-3-content.png (full page)');

  await phoneContext.close();

  // ===== TABLET SCREENSHOTS (2048x1536) =====
  console.log('\\n📱 Создание скриншотов для планшета...');

  const tabletContext = await browser.newContext({
    viewport: { width: 2048, height: 1536 },
    deviceScaleFactor: 2,
    isMobile: false,
    hasTouch: true
  });
  const tabletPage = await tabletContext.newPage();

  await tabletPage.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await tabletPage.waitForTimeout(3000);
  await tabletPage.screenshot({
    path: join(outputDir, 'tablet-1-home.png'),
    fullPage: false
  });
  console.log('  ✅ tablet-1-home.png');

  await tabletContext.close();

  // ===== GOOGLE PLAY FEATURE GRAPHIC (1024x500) =====
  console.log('\\n🎨 Создание Feature Graphic для Google Play...');

  // Create feature graphic using a simple HTML page
  const featureGraphicContext = await browser.newContext({
    viewport: { width: 1024, height: 500 },
    deviceScaleFactor: 1
  });
  const featurePage = await featureGraphicContext.newPage();

  // Create custom HTML for feature graphic
  const featureHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          width: 1024px;
          height: 500px;
          background: linear-gradient(135deg, #7c3aed 0%, #1e1b4b 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: Arial, sans-serif;
          color: white;
          text-align: center;
        }
        .title {
          font-size: 72px;
          font-weight: bold;
          margin-bottom: 20px;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .subtitle {
          font-size: 28px;
          opacity: 0.9;
          margin-bottom: 30px;
        }
        .features {
          font-size: 20px;
          opacity: 0.7;
        }
        .icon {
          width: 100px;
          height: 100px;
          background: rgba(255,255,255,0.2);
          border-radius: 24px;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
        }
      </style>
    </head>
    <body>
      <div class="icon">📚</div>
      <div class="title">ИНЕТШКОЛА</div>
      <div class="subtitle">Интерактивная школьная программа</div>
      <div class="features">0-11 классы • 50+ игр • Бесплатно</div>
    </body>
    </html>
  `;

  await featurePage.setContent(featureHtml);
  await featurePage.waitForTimeout(500);
  await featurePage.screenshot({
    path: join(outputDir, 'feature-graphic.png')
  });
  console.log('  ✅ feature-graphic.png (1024x500)');

  await featureGraphicContext.close();

  // ===== CREATE 16:9 PHONE SCREENSHOTS FOR STORES =====
  console.log('\\n📱 Создание скриншотов 16:9 для магазинов...');

  const store169Context = await browser.newContext({
    viewport: { width: 1080, height: 1920 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const storePage = await store169Context.newPage();

  // Navigate and take main screenshot
  await storePage.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });
  await storePage.waitForTimeout(3000);

  // Hide any scrollbars and take clean screenshot
  await storePage.addStyleTag({ content: '::-webkit-scrollbar { display: none; }' });
  await storePage.screenshot({
    path: join(outputDir, 'store-phone-1.png'),
    clip: { x: 0, y: 0, width: 1080, height: 1920 }
  });
  console.log('  ✅ store-phone-1.png (1080x1920)');

  // Scroll down and take another screenshot
  await storePage.evaluate(() => window.scrollBy(0, 600));
  await storePage.waitForTimeout(1000);
  await storePage.screenshot({
    path: join(outputDir, 'store-phone-2.png'),
    clip: { x: 0, y: 0, width: 1080, height: 1920 }
  });
  console.log('  ✅ store-phone-2.png (1080x1920)');

  await store169Context.close();

  await browser.close();

  console.log('\\n🎉 Все скриншоты успешно созданы!');
  console.log(`📁 Папка: ${outputDir}`);

  // List all generated files
  const fs = await import('fs');
  const files = fs.readdirSync(outputDir);
  console.log('\\n📋 Созданные файлы:');
  files.forEach(f => {
    const stats = fs.statSync(join(outputDir, f));
    const sizeKB = Math.round(stats.size / 1024);
    console.log(`   • ${f} (${sizeKB} KB)`);
  });
}

generateScreenshots().catch(console.error);
