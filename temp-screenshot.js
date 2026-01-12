const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    isMobile: true
  });
  
  const filePath = 'file://' + path.resolve('projects/hunde-fotoshooting/index.html').replace(/\\/g, '/');
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  
  // Full page screenshot with higher quality
  await page.screenshot({
    path: 'mobile-full.png',
    fullPage: true
  });
  
  console.log('Screenshot saved');
  await browser.close();
})();
