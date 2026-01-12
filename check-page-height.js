const puppeteer = require('puppeteer');
const path = require('path');

async function checkPageHeight() {
  const htmlPath = path.resolve('projects/family-quiz/index.html');

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.setViewport({ width: 375, height: 812 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Wait for fonts and content
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1000));

  // Get page dimensions
  const dimensions = await page.evaluate(() => {
    return {
      scrollHeight: document.documentElement.scrollHeight,
      clientHeight: document.documentElement.clientHeight,
      bodyScrollHeight: document.body.scrollHeight,
      hasFooter: !!document.querySelector('.footer'),
      hasLegalFooter: !!document.querySelector('.legal-footer'),
      sectionsCount: document.querySelectorAll('section, footer').length
    };
  });

  console.log('Page dimensions:', dimensions);
  console.log('Has footer:', dimensions.hasFooter);
  console.log('Has legal-footer:', dimensions.hasLegalFooter);
  console.log('Total sections:', dimensions.sectionsCount);

  await browser.close();
}

checkPageHeight();
