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

  // Select V3A and activate Neuroquimica
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const v3aBtn = buttons.find(b => b.textContent && b.textContent.trim() === 'V3A');
    if (v3aBtn) v3aBtn.click();

    const neuroBtn = buttons.find(b => b.textContent && b.textContent.includes('NEUROQUÍMICA'));
    if (neuroBtn) neuroBtn.click();
  });

  await new Promise((r) => setTimeout(r, 2000));

  const localFile = path.join(LOCAL_DIR, 'verify_fix_v3a_posterior.png');
  const artifactFile = path.join(ARTIFACT_DIR, 'verify_fix_v3a_posterior.png');

  await page.screenshot({ path: localFile });
  fs.copyFileSync(localFile, artifactFile);
  console.log('Capture successfully saved to:', localFile);

  await browser.close();
}

run().catch(console.error);
