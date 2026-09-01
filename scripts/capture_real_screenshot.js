const puppeteer = require('puppeteer');
const path = require('path');

async function capture() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 2 });

  console.log('Navigating to live website...');
  await page.goto('https://maeen-app-five.vercel.app', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  // Give 1 second for animations and fonts to settle
  await new Promise(r => setTimeout(r, 1500));

  const outPath = path.join(__dirname, '..', 'public', 'og-image.png');
  await page.screenshot({
    path: outPath,
    type: 'png'
  });

  console.log('Screenshot saved successfully to:', outPath);
  await browser.close();
}

capture().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
