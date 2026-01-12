const puppeteer = require('puppeteer');
const path = require('path');

async function screenshotFooterArea() {
  const htmlPath = path.resolve('projects/family-quiz/index.html');
  const outputPath = path.resolve('mobile-footer-and-legal.png');

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // Set viewport to show ~800px (About bottom + Footer + Legal)
  await page.setViewport({ width: 375, height: 800 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Wait for content
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1500));

  // Scroll to position 9850 (to show Footer map + Legal)
  await page.evaluate(() => {
    window.scrollTo(0, 9850);
  });

  await new Promise(r => setTimeout(r, 2000));

  // Take screenshot
  await page.screenshot({
    path: outputPath,
    fullPage: false
  });

  console.log(`✅ Screenshot saved: ${outputPath}`);
  console.log(`   Showing area from ~9300px to ~10100px`);

  await browser.close();
}

screenshotFooterArea();
