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
  await new Promise((r) => setTimeout(r, 2000));

  // Click "Ir a Capa" on Capa 4 (Ganglios Basales & Límbico)
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const irACapaBtns = buttons.filter(b => b.textContent && b.textContent.includes('Ir a Capa'));
    // Index 3 corresponds to Layer 4
    if (irACapaBtns[3]) {
      irACapaBtns[3].click();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));

  const file1 = path.join(LOCAL_DIR, 'capture_fase8_layer4_basal_ganglia_taubin.png');
  const art1 = path.join(ARTIFACT_DIR, 'capture_fase8_layer4_basal_ganglia_taubin.png');
  await page.screenshot({ path: file1 });
  fs.copyFileSync(file1, art1);
  console.log('Saved: Layer 4 Basal Ganglia Taubin');

  // Now click Isolate on Thalamus (Diencéfalo)
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const irACapaBtns = buttons.filter(b => b.textContent && b.textContent.includes('Ir a Capa'));
    // Index 4 corresponds to Layer 5: Thalamus
    if (irACapaBtns[4]) {
      irACapaBtns[4].click();
    }
  });

  await new Promise((r) => setTimeout(r, 1500));

  const file2 = path.join(LOCAL_DIR, 'capture_fase8_layer5_thalamus_diencephalon.png');
  const art2 = path.join(ARTIFACT_DIR, 'capture_fase8_layer5_thalamus_diencephalon.png');
  await page.screenshot({ path: file2 });
  fs.copyFileSync(file2, art2);
  console.log('Saved: Layer 5 Thalamus');

  await browser.close();
}

run().catch(console.error);
