import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\Hugoi\\.gemini\\antigravity\\brain\\524ebcf3-7d8b-4805-8515-a1614c4753fd';
const LOCAL_DIR = 'e:\\Mark_1\\screenshots';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--use-gl=angle',
      '--use-angle=default',
      '--enable-webgl',
      '--ignore-gpu-blocklist',
      '--window-size=1920,1080',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2500));

  // Find and click "Ir a Capa" for Capa 6 (Tronco & Cerebelo)
  await page.evaluate(() => {
    const layerButtons = Array.from(document.querySelectorAll('button')).filter(
      (b) => b.textContent && b.textContent.includes('Ir a Capa')
    );
    if (layerButtons.length >= 6) {
      // 6th button is Capa 6
      layerButtons[5].click();
    }
  });
  await new Promise((r) => setTimeout(r, 1500));

  // Also switch to Lobular Cerebellum Mode
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const lobBtn = buttons.find((b) => b.textContent && b.textContent.includes('CEREBELO:'));
    if (lobBtn) lobBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  const file = path.join(LOCAL_DIR, 'capture_buckner_cerebellum_deep_dissection_layer6.png');
  const art = path.join(ARTIFACT_DIR, 'capture_buckner_cerebellum_deep_dissection_layer6.png');
  await page.screenshot({ path: file });
  fs.copyFileSync(file, art);
  console.log('Saved: capture_buckner_cerebellum_deep_dissection_layer6.png');

  await browser.close();
  console.log('SUCCESS!');
}

run().catch(console.error);
