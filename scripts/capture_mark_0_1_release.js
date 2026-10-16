import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\Hugoi\\.gemini\\antigravity\\brain\\c1a68cbb-85af-451f-a52c-5610b81656e9';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1920,1080', '--use-gl=angle', '--use-angle=default'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Navigating to Mark 0.1 at http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 3500));

  const out1 = path.join(ARTIFACT_DIR, 'capture_mark_0_1_release_clean.png');
  await page.screenshot({ path: out1 });
  console.log('Saved clean Mark 0.1 screenshot to:', out1);

  // Click on "AXIAL (Z)" button in TC buttons
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('AXIAL (Z)')) {
      console.log('Found AXIAL (Z) button, clicking it...');
      await btn.click();
      break;
    }
  }

  await new Promise((r) => setTimeout(r, 2000));

  const out2 = path.join(ARTIFACT_DIR, 'capture_mark_0_1_tomografia_axial.png');
  await page.screenshot({ path: out2 });
  console.log('Saved axial tomography screenshot to:', out2);

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
