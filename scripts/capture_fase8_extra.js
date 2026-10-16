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

  // 1. Switch to Sagittal Lateral View in Brodmann Mode
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const brodmannBtn = buttons.find(b => b.textContent && b.textContent.includes('MAPA DE BRODMANN'));
    if (brodmannBtn) brodmannBtn.click();
    const sagitalBtn = buttons.find(b => b.textContent && b.textContent.includes('SAGITAL'));
    if (sagitalBtn) sagitalBtn.click();
  });
  await new Promise((r) => setTimeout(r, 2000));

  const file1 = path.join(LOCAL_DIR, 'capture_fase8_lateral_brodmann_pins.png');
  const art1 = path.join(ARTIFACT_DIR, 'capture_fase8_lateral_brodmann_pins.png');
  await page.screenshot({ path: file1 });
  fs.copyFileSync(file1, art1);
  console.log('Saved: Lateral Brodmann Pins');

  // 2. Hide Cortex to display Taubin-smoothed subcortical anatomy in close-up
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const freeBtn = buttons.find(b => b.textContent && b.textContent.includes('3D LIBRE'));
    if (freeBtn) freeBtn.click();

    // Peal cortex by setting dissection depth to 3
    const sliders = Array.from(document.querySelectorAll('input[type="range"]'));
    const depthSlider = sliders.find(s => s.min === '1' && s.max === '6');
    if (depthSlider) {
      depthSlider.value = '3';
      depthSlider.dispatchEvent(new Event('input', { bubbles: true }));
      depthSlider.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await new Promise((r) => setTimeout(r, 2000));

  const file2 = path.join(LOCAL_DIR, 'capture_fase8_taubin_smoothed_subcorticals.png');
  const art2 = path.join(ARTIFACT_DIR, 'capture_fase8_taubin_smoothed_subcorticals.png');
  await page.screenshot({ path: file2 });
  fs.copyFileSync(file2, art2);
  console.log('Saved: Taubin Smoothed Subcorticals');

  await browser.close();
}

run().catch(console.error);
