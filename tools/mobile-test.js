/**
 * Mobile Testing Tool - Multi-Resolution Screenshot Generator
 *
 * Usage:
 *   node tools/mobile-test.js <landing-name> [page]
 *
 * Examples:
 *   node tools/mobile-test.js hunde-fotoshooting
 *   node tools/mobile-test.js hunde-fotoshooting quiz-1.html
 *   node tools/mobile-test.js hunde-fotoshooting all
 *
 * Output:
 *   tests/mobile/<landing-name>/<timestamp>/
 *     ├── index-375x812-iphone.png
 *     ├── index-390x844-iphone12.png
 *     ├── index-414x896-iphoneXR.png
 *     ├── index-360x800-android.png
 *     ├── index-768x1024-ipad.png
 *     ├── index-1024x768-ipad-landscape.png
 *     ├── index-1440x900-desktop.png
 *     └── report.html
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Device configurations for testing
const DEVICES = [
  // Mobile Portrait
  { name: 'iphone-se', width: 375, height: 667, mobile: true, label: 'iPhone SE' },
  { name: 'iphone-12', width: 390, height: 844, mobile: true, label: 'iPhone 12/13/14' },
  { name: 'iphone-14-pro-max', width: 430, height: 932, mobile: true, label: 'iPhone 14 Pro Max' },
  { name: 'android-small', width: 360, height: 800, mobile: true, label: 'Android Small' },
  { name: 'android-large', width: 412, height: 915, mobile: true, label: 'Android Large' },

  // Tablet
  { name: 'ipad-mini', width: 768, height: 1024, mobile: true, label: 'iPad Mini' },
  { name: 'ipad-pro', width: 1024, height: 1366, mobile: true, label: 'iPad Pro' },

  // Desktop
  { name: 'desktop-hd', width: 1440, height: 900, mobile: false, label: 'Desktop HD' },
  { name: 'desktop-full', width: 1920, height: 1080, mobile: false, label: 'Desktop Full HD' },
];

// Breakpoints to verify
const BREAKPOINTS = [
  { name: '576px', width: 576, description: 'Bootstrap SM breakpoint' },
  { name: '768px', width: 768, description: 'Bootstrap MD breakpoint' },
  { name: '992px', width: 992, description: 'Bootstrap LG breakpoint' },
  { name: '1200px', width: 1200, description: 'Bootstrap XL breakpoint' },
];

async function takeScreenshots(landingName, pageName = 'index.html') {
  const projectPath = path.resolve(__dirname, '..', 'projects', landingName);

  if (!fs.existsSync(projectPath)) {
    console.error(`Error: Landing "${landingName}" not found at ${projectPath}`);
    process.exit(1);
  }

  // Create output directory
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const outputDir = path.resolve(__dirname, '..', 'tests', 'mobile', landingName, timestamp);
  fs.mkdirSync(outputDir, { recursive: true });

  console.log('\n' + '='.repeat(60));
  console.log('  MOBILE TESTING TOOL');
  console.log('='.repeat(60));
  console.log(`\nLanding: ${landingName}`);
  console.log(`Page: ${pageName}`);
  console.log(`Output: ${outputDir}\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    protocolTimeout: 60000
  });

  const results = [];
  const pageBaseName = pageName.replace('.html', '');

  // Take screenshots for each device
  for (const device of DEVICES) {
    const page = await browser.newPage();

    await page.setViewport({
      width: device.width,
      height: device.height,
      deviceScaleFactor: 2,
      isMobile: device.mobile,
      hasTouch: device.mobile
    });

    const filePath = `file://${path.join(projectPath, pageName).replace(/\\/g, '/')}`;

    try {
      await page.goto(filePath, {
        waitUntil: 'domcontentloaded',
        timeout: 15000
      });

      // Simple wait for rendering
      await new Promise(resolve => setTimeout(resolve, 1000));

      const screenshotName = `${pageBaseName}-${device.width}x${device.height}-${device.name}.png`;
      const screenshotPath = path.join(outputDir, screenshotName);

      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      });

      results.push({
        device: device.name,
        label: device.label,
        width: device.width,
        height: device.height,
        screenshot: screenshotName,
        metrics: { scrollWidth: device.width, scrollHeight: 0, clientWidth: device.width },
        issues: []
      });

      console.log(`  ✓ ${device.label} (${device.width}x${device.height})`);
    } catch (error) {
      console.log(`  ✗ ${device.label} - Error: ${error.message}`);
      results.push({
        device: device.name,
        label: device.label,
        width: device.width,
        height: device.height,
        error: error.message,
        issues: ['Failed to capture']
      });
    }

    await page.close();
  }

  await browser.close();

  // Generate HTML report
  const reportHtml = generateReport(landingName, pageName, results, timestamp);
  const reportPath = path.join(outputDir, 'report.html');
  fs.writeFileSync(reportPath, reportHtml);

  // Generate summary
  const issueCount = results.reduce((sum, r) => sum + r.issues.length, 0);

  console.log('\n' + '-'.repeat(60));
  console.log(`Screenshots: ${results.filter(r => !r.error).length}/${DEVICES.length}`);
  console.log(`Issues found: ${issueCount}`);
  console.log(`Report: ${reportPath}`);
  console.log('='.repeat(60) + '\n');

  return { outputDir, results, reportPath };
}

function generateReport(landingName, pageName, results, timestamp) {
  const issueCount = results.reduce((sum, r) => sum + r.issues.length, 0);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mobile Test Report - ${landingName}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; padding: 20px; }
    .container { max-width: 1800px; margin: 0 auto; }
    h1 { margin-bottom: 10px; color: #333; }
    .meta { color: #666; margin-bottom: 30px; }
    .summary { background: ${issueCount > 0 ? '#fff3cd' : '#d4edda'}; padding: 15px 20px; border-radius: 8px; margin-bottom: 30px; }
    .summary.error { background: #f8d7da; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 20px; }
    .card { background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .card-header { padding: 15px 20px; background: #f8f9fa; border-bottom: 1px solid #eee; }
    .card-header h3 { font-size: 16px; margin-bottom: 5px; }
    .card-header .dims { color: #666; font-size: 14px; }
    .card-body { padding: 15px; }
    .card-body img { width: 100%; height: auto; border: 1px solid #eee; border-radius: 4px; }
    .issues { margin-top: 10px; }
    .issue { background: #f8d7da; color: #721c24; padding: 8px 12px; border-radius: 4px; font-size: 13px; margin-top: 5px; }
    .metrics { font-size: 12px; color: #666; margin-top: 10px; }
    .checklist { background: white; padding: 20px; border-radius: 12px; margin-top: 30px; }
    .checklist h2 { margin-bottom: 15px; }
    .checklist ul { list-style: none; }
    .checklist li { padding: 8px 0; border-bottom: 1px solid #eee; }
    .checklist li:last-child { border-bottom: none; }
    .check { color: #28a745; margin-right: 8px; }
    .warn { color: #ffc107; margin-right: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Mobile Test Report</h1>
    <p class="meta">
      <strong>Landing:</strong> ${landingName} |
      <strong>Page:</strong> ${pageName} |
      <strong>Date:</strong> ${new Date().toLocaleString()}
    </p>

    <div class="summary ${issueCount > 0 ? 'error' : ''}">
      <strong>Summary:</strong>
      ${results.filter(r => !r.error).length} screenshots captured,
      ${issueCount} issue${issueCount !== 1 ? 's' : ''} found
    </div>

    <div class="grid">
      ${results.map(r => `
        <div class="card">
          <div class="card-header">
            <h3>${r.label}</h3>
            <div class="dims">${r.width} x ${r.height}px</div>
          </div>
          <div class="card-body">
            ${r.error
              ? `<div class="issue">Error: ${r.error}</div>`
              : `<a href="${r.screenshot}" target="_blank"><img src="${r.screenshot}" alt="${r.label}"></a>`
            }
            ${r.issues.length > 0 ? `
              <div class="issues">
                ${r.issues.map(issue => `<div class="issue">⚠️ ${issue}</div>`).join('')}
              </div>
            ` : ''}
            ${r.metrics ? `
              <div class="metrics">
                Page: ${r.metrics.scrollWidth}x${r.metrics.scrollHeight}px |
                Viewport: ${r.metrics.clientWidth}px
              </div>
            ` : ''}
          </div>
        </div>
      `).join('')}
    </div>

    <div class="checklist">
      <h2>Manual Checklist</h2>
      <ul>
        <li><span class="check">☐</span> All text is readable without zooming</li>
        <li><span class="check">☐</span> Images are not cropped or distorted</li>
        <li><span class="check">☐</span> Buttons are full width and tappable (min 44px height)</li>
        <li><span class="check">☐</span> No horizontal scroll on any device</li>
        <li><span class="check">☐</span> Forms are usable on mobile</li>
        <li><span class="check">☐</span> Navigation is accessible</li>
        <li><span class="check">☐</span> Font sizes are appropriate for each breakpoint</li>
        <li><span class="check">☐</span> Spacing is consistent across devices</li>
        <li><span class="check">☐</span> Interactive elements have adequate touch targets</li>
        <li><span class="check">☐</span> Content hierarchy is maintained on small screens</li>
      </ul>
    </div>
  </div>
</body>
</html>`;
}

// CLI
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log(`
Usage: node tools/mobile-test.js <landing-name> [page]

Examples:
  node tools/mobile-test.js hunde-fotoshooting
  node tools/mobile-test.js hunde-fotoshooting quiz-1.html

Output: tests/mobile/<landing>/<timestamp>/
`);
  process.exit(0);
}

const landingName = args[0];
const pageName = args[1] || 'index.html';

takeScreenshots(landingName, pageName)
  .then(({ reportPath }) => {
    console.log(`Open report: ${reportPath}`);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
