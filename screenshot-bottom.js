const puppeteer = require('puppeteer');
const path = require('path');

async function screenshotBottom() {
  const htmlPath = path.resolve('projects/family-quiz/index.html');
  const outputPath = path.resolve('mobile-footer-check.png');

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.setViewport({ width: 375, height: 812 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Wait for content
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1000));

  // Get page height and scroll to absolute bottom
  const scrollHeight = await page.evaluate(() => {
    return document.body.scrollHeight;
  });

  console.log(`Page height: ${scrollHeight}px`);

  // Scroll to absolute bottom
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight - window.innerHeight);
  });

  await new Promise(r => setTimeout(r, 500));

  // Take screenshot of viewport (showing footer area)
  await page.screenshot({
    path: outputPath,
    fullPage: false,
    clip: null
  });

  console.log(`✅ Screenshot saved: ${outputPath}`);

  await browser.close();
}

screenshotBottom();
