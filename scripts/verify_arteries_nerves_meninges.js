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

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2500));

  async function clickButtonText(str) {
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.includes(str)) {
        await btn.click();
        await new Promise(r => setTimeout(r, 500));
        return true;
      }
    }
    return false;
  }

  // 1. Turn ON Arteries and Cranial Nerves
  await clickButtonText('ARTERIAS (WILLIS)');
  await clickButtonText('PARES CRANEALES (I-XII)');

  // 2. Click SAGITAL or 3D LIBRE then tilt camera to look at the cranial base from below
  const canvas = await page.$('canvas');
  if (canvas) {
    const box = await canvas.boundingBox();
    const cx = box.x + box.width / 2 + 100;
    const cy = box.y + box.height / 2;

    // Pitch upwards to expose the inferior / ventral aspect of the brain (base of skull view)
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx, cy - 380, { steps: 35 });
    await page.mouse.up();
    await new Promise(r => setTimeout(r, 800));

    // Slight yaw to see depth
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx - 140, cy, { steps: 20 });
    await page.mouse.up();
    await new Promise(r => setTimeout(r, 1200));
  }

  const out1 = path.join(ARTIFACT_DIR, 'capture_willis_and_cranial_nerves_base.png');
  await page.screenshot({ path: out1 });
  console.log('Saved:', out1);

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
