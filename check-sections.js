const puppeteer = require('puppeteer');
const path = require('path');

async function checkSections() {
  const htmlPath = path.resolve('projects/family-quiz/index.html');

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.setViewport({ width: 375, height: 812 });
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Wait for content
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1000));

  // Get all sections info
  const sectionsInfo = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('section, footer'));
    return sections.map((section, index) => {
      const rect = section.getBoundingClientRect();
      const classes = Array.from(section.classList).join(' ');
      return {
        index: index + 1,
        type: section.tagName,
        classes: classes || 'no-class',
        top: Math.round(rect.top + window.scrollY),
        height: Math.round(rect.height),
        bottom: Math.round(rect.top + window.scrollY + rect.height)
      };
    });
  });

  console.log('\n=== ALL SECTIONS ===');
  sectionsInfo.forEach(info => {
    console.log(`${info.index}. ${info.type}.${info.classes}`);
    console.log(`   Position: ${info.top}px - ${info.bottom}px (height: ${info.height}px)`);
  });

  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`\nTotal page height: ${totalHeight}px`);

  await browser.close();
}

checkSections();
