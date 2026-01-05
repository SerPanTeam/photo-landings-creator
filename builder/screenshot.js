/**
 * Screenshot Tool for Landing Pages
 * Takes screenshots of HTML pages at different viewport sizes
 *
 * Usage:
 *   node builder/screenshot.js <html-path> <output-path> [width]
 *
 * Examples:
 *   node builder/screenshot.js projects/christmas-free/index.html screenshots/desktop.png
 *   node builder/screenshot.js projects/christmas-free/index.html screenshots/mobile.png 375
 *   node builder/screenshot.js projects/christmas-free/index.html screenshots/tablet.png 768
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const VIEWPORT_PRESETS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 812 }
};

async function screenshot(htmlPath, outputPath, width = 1440, fullPage = true) {
  // Resolve paths
  const absoluteHtmlPath = path.resolve(htmlPath);
  const absoluteOutputPath = path.resolve(outputPath);

  // Ensure output directory exists
  const outputDir = path.dirname(absoluteOutputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Check if HTML file exists
  if (!fs.existsSync(absoluteHtmlPath)) {
    console.error(`Error: HTML file not found: ${absoluteHtmlPath}`);
    process.exit(1);
  }

  console.log(`\nTaking screenshot...`);
  console.log(`  Input:  ${absoluteHtmlPath}`);
  console.log(`  Output: ${absoluteOutputPath}`);
  console.log(`  Width:  ${width}px`);

  const browser = await puppeteer.launch({
    headless: 'new'
  });

  try {
    const page = await browser.newPage();

    // Set viewport
    await page.setViewport({
      width: parseInt(width),
      height: 900,
      deviceScaleFactor: 1
    });

    // Navigate to the file
    await page.goto(`file://${absoluteHtmlPath}`, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);

    // Small delay for any animations
    await new Promise(r => setTimeout(r, 500));

    // Take screenshot
    await page.screenshot({
      path: absoluteOutputPath,
      fullPage: fullPage
    });

    console.log(`\n✅ Screenshot saved: ${absoluteOutputPath}`);

  } finally {
    await browser.close();
  }
}

// CLI
const args = process.argv.slice(2);

if (args.length < 2) {
  console.log(`
Screenshot Tool for Landing Pages

Usage:
  node builder/screenshot.js <html-path> <output-path> [width]

Arguments:
  html-path   Path to HTML file (relative or absolute)
  output-path Path for output PNG file
  width       Viewport width in pixels (default: 1440)

Preset widths:
  1440  Desktop
  768   Tablet
  375   Mobile (iPhone)

Examples:
  node builder/screenshot.js projects/christmas-free/index.html screenshots/desktop.png
  node builder/screenshot.js projects/christmas-free/index.html screenshots/mobile.png 375
`);
  process.exit(0);
}

const [htmlPath, outputPath, width, fullPageArg] = args;
const fullPage = fullPageArg !== 'viewport';
screenshot(htmlPath, outputPath, parseInt(width) || 1440, fullPage);
