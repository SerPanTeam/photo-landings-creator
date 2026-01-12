const puppeteer = require('puppeteer');
const path = require('path');

async function screenshotLastSections() {
  const htmlPath = path.resolve('projects/family-quiz/index.html');
  const outputPath = path.resolve('mobile-last-2000px.png');

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.setViewport({ width: 375, height: 2000 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Wait for content
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1000));

  // Get page height
  const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`Page height: ${scrollHeight}px`);

  // Scroll to show last 2000px
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight - 2000);
  });

  await new Promise(r => setTimeout(r, 500));

  // Take screenshot
  await page.screenshot({
    path: outputPath,
    fullPage: false
  });

  console.log(`✅ Screenshot saved: ${outputPath}`);

  await browser.close();
}

screenshotLastSections();
