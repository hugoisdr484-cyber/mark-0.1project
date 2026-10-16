import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\Hugoi\\.gemini\\antigravity\\brain\\524ebcf3-7d8b-4805-8515-a1614c4753fd';
const LOCAL_DIR = 'e:\\Mark_1\\screenshots';

async function run() {
  fs.mkdirSync(LOCAL_DIR, { recursive: true });
  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

  console.log('Launching browser for Buckner Cerebellum verification...');
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
  await new Promise((r) => setTimeout(r, 3500));

  // 1. Capture Overview: Cerebellum Integrated in 3D View (Hemispheric Mode)
  const file1 = path.join(LOCAL_DIR, 'capture_buckner_cerebellum_3d_integrated.png');
  const art1 = path.join(ARTIFACT_DIR, 'capture_buckner_cerebellum_3d_integrated.png');
  await page.screenshot({ path: file1 });
  fs.copyFileSync(file1, art1);
  console.log('Saved 1: capture_buckner_cerebellum_3d_integrated.png');

  // 2. Switch to Sagittal View for profile view of Cerebellum and Brainstem
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const sagBtn = buttons.find((b) => b.textContent && b.textContent.includes('SAGITAL'));
    if (sagBtn) sagBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1800));

  const file2 = path.join(LOCAL_DIR, 'capture_buckner_cerebellum_sagittal.png');
  const art2 = path.join(ARTIFACT_DIR, 'capture_buckner_cerebellum_sagittal.png');
  await page.screenshot({ path: file2 });
  fs.copyFileSync(file2, art2);
  console.log('Saved 2: capture_buckner_cerebellum_sagittal.png');

  // 3. Switch to Lobular mode ("CEREBELO: LOBULILLOS")
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const lobBtn = buttons.find((b) => b.textContent && b.textContent.includes('CEREBELO:'));
    if (lobBtn) lobBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1800));

  const file3 = path.join(LOCAL_DIR, 'capture_buckner_cerebellum_lobules.png');
  const art3 = path.join(ARTIFACT_DIR, 'capture_buckner_cerebellum_lobules.png');
  await page.screenshot({ path: file3 });
  fs.copyFileSync(file3, art3);
  console.log('Saved 3: capture_buckner_cerebellum_lobules.png');

  // 4. Activate Scalpel Mode ("MODO BISTURÍ")
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const scalpelBtn = buttons.find((b) => b.textContent && b.textContent.includes('BISTURÍ'));
    if (scalpelBtn) scalpelBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  const file4 = path.join(LOCAL_DIR, 'capture_buckner_cerebellum_scalpel_mode.png');
  const art4 = path.join(ARTIFACT_DIR, 'capture_buckner_cerebellum_scalpel_mode.png');
  await page.screenshot({ path: file4 });
  fs.copyFileSync(file4, art4);
  console.log('Saved 4: capture_buckner_cerebellum_scalpel_mode.png');

  await browser.close();
  console.log('SUCCESS: All Buckner Cerebellum captures saved successfully!');
}

run().catch(console.error);
