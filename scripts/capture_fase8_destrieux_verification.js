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

  // Ensure Mode 1 is active (ANATÓMICA PURA)
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const pureBtn = buttons.find(b => b.textContent && b.textContent.includes('ANATÓMICA PURA'));
    if (pureBtn) pureBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  // 1. Capture Mode 1: ANATÓMICA PURA (TEJIDO)
  const file1 = path.join(LOCAL_DIR, 'capture_fase8_anatomyka_pure_tissue.png');
  const art1 = path.join(ARTIFACT_DIR, 'capture_fase8_anatomyka_pure_tissue.png');
  await page.screenshot({ path: file1 });
  fs.copyFileSync(file1, art1);
  console.log('Saved 1: capture_fase8_anatomyka_pure_tissue.png');

  // 2. Click "2. MAPA DE BRODMANN / GLASSER"
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const brodmannBtn = buttons.find(b => b.textContent && b.textContent.includes('MAPA DE BRODMANN'));
    if (brodmannBtn) brodmannBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  // 2. Capture Mode 2: MAPA DE BRODMANN / GLASSER (Destrieux real gyral parcellation)
  const file2 = path.join(LOCAL_DIR, 'capture_fase8_destrieux_brodmann_map.png');
  const art2 = path.join(ARTIFACT_DIR, 'capture_fase8_destrieux_brodmann_map.png');
  await page.screenshot({ path: file2 });
  fs.copyFileSync(file2, art2);
  console.log('Saved 2: capture_fase8_destrieux_brodmann_map.png');

  await browser.close();
  console.log('SUCCESS: All verification screenshots saved!');
}

run().catch(console.error);
