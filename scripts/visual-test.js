const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

(async ()=>{
  const outDir = path.join(__dirname, '..', 'tests');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const baseline = path.join(outDir, 'baseline.png');
  const latest = path.join(outDir, 'latest.png');
  const diff = path.join(outDir, 'diff.png');

  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 900, deviceScaleFactor: 1 });
  const url = 'file://' + path.join(process.cwd(), 'index.html');
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.waitForTimeout(300);
  await page.screenshot({ path: latest, fullPage: true });
  await browser.close();

  if (!fs.existsSync(baseline)){
    fs.copyFileSync(latest, baseline);
    console.log('Created baseline image at', baseline);
    process.exit(0);
  }

  const img1 = PNG.sync.read(fs.readFileSync(baseline));
  const img2 = PNG.sync.read(fs.readFileSync(latest));
  const {width, height} = img1;
  if (width !== img2.width || height !== img2.height){
    console.error('Image size mismatch between baseline and latest');
    process.exit(2);
  }
  const diffImg = new PNG({width, height});
  const diffPixels = pixelmatch(img1.data, img2.data, diffImg.data, width, height, {threshold: 0.12});
  fs.writeFileSync(diff, PNG.sync.write(diffImg));
  if (diffPixels > 0){
    console.error(`Visual test failed — ${diffPixels} pixels differ. See ${diff}`);
    process.exit(1);
  }
  console.log('Visual test passed — no visual differences detected.');
  process.exit(0);
})();
