import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\Hugoi\\.gemini\\antigravity\\brain\\c1a68cbb-85af-451f-a52c-5610b81656e9';
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

  // Set Cortical Opacity to 100% for 100% solid opaque pial cortex
  await page.evaluate(() => {
    // Dispatch store update directly or set slider
    const slider = document.querySelector('input[type="range"]');
    if (slider) {
      slider.value = '100';
      slider.dispatchEvent(new Event('input', { bubbles: true }));
      slider.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  await new Promise((r) => setTimeout(r, 1500));

  // 1. Capture 100% Solid Opaque fsaverage6 cortex with acute gyri & #1e1412 sulci
  const file1 = path.join(LOCAL_DIR, 'capture_fsaverage6_100_solid_cortex.png');
  const art1 = path.join(ARTIFACT_DIR, 'capture_fsaverage6_100_solid_cortex.png');
  await page.screenshot({ path: file1 });
  fs.copyFileSync(file1, art1);
  console.log('Saved 1:', file1);

  // 2. Click "CORTE SAGITAL MEDIO" to expose the 3D Slicer / Harvard subcortical anatomy
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const cutBtn = buttons.find(b => b.textContent && b.textContent.includes('CORTE SAGITAL MEDIO'));
    if (cutBtn) cutBtn.click();
  });

  await new Promise((r) => setTimeout(r, 1500));

  const file2 = path.join(LOCAL_DIR, 'capture_harvard_slicer_subcortical_anatomy.png');
  const art2 = path.join(ARTIFACT_DIR, 'capture_harvard_slicer_subcortical_anatomy.png');
  await page.screenshot({ path: file2 });
  fs.copyFileSync(file2, art2);
  console.log('Saved 2:', file2);

  await browser.close();
}

run().catch(console.error);
