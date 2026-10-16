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
  await new Promise((r) => setTimeout(r, 3000));

  // 1. Isolate the Left Cerebellar Hemisphere to inspect its fine anatomy
  await page.evaluate(() => {
    // Open layer 6 or set isolated structure via store directly if accessible, or click layer button
    const buttons = Array.from(document.querySelectorAll('button'));
    const lobBtn = buttons.find((b) => b.textContent && b.textContent.includes('CEREBELO:'));
    if (lobBtn) lobBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1000));

  // Switch to Capa 6 (Profundo: Tronco y Cerebelo)
  await page.evaluate(() => {
    const slider = document.querySelector('input[type="range"]');
    if (slider) {
      slider.value = '6';
      slider.dispatchEvent(new Event('change', { bubbles: true }));
      slider.dispatchEvent(new Event('input', { bubbles: true }));
    }
  });
  await new Promise((r) => setTimeout(r, 1500));

  const file1 = path.join(LOCAL_DIR, 'capture_buckner_cerebellum_layer6_isolated.png');
  const art1 = path.join(ARTIFACT_DIR, 'capture_buckner_cerebellum_layer6_isolated.png');
  await page.screenshot({ path: file1 });
  fs.copyFileSync(file1, art1);
  console.log('Saved: capture_buckner_cerebellum_layer6_isolated.png');

  // 2. Click Sagittal View and Mid-Sagittal cut
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const sagBtn = buttons.find((b) => b.textContent && b.textContent.includes('SAGITAL'));
    if (sagBtn) sagBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  const file2 = path.join(LOCAL_DIR, 'capture_buckner_cerebellum_fossa_posterior.png');
  const art2 = path.join(ARTIFACT_DIR, 'capture_buckner_cerebellum_fossa_posterior.png');
  await page.screenshot({ path: file2 });
  fs.copyFileSync(file2, art2);
  console.log('Saved: capture_buckner_cerebellum_fossa_posterior.png');

  await browser.close();
  console.log('Verification completed!');
}

run().catch(console.error);
