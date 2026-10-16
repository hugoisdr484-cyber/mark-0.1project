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

  // 1. Capture Pure Anatomical Tissue Mode (Both hemispheres identical warm tissue, deep #1e1412 sulci)
  const file1 = path.join(LOCAL_DIR, 'capture_fase8_pure_tissue_anatomy.png');
  const art1 = path.join(ARTIFACT_DIR, 'capture_fase8_pure_tissue_anatomy.png');
  await page.screenshot({ path: file1 });
  fs.copyFileSync(file1, art1);
  console.log('Saved 1: Pure Tissue Anatomy');

  // 2. Click "2. MAPA DE BRODMANN / GLASSER"
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const brodmannBtn = buttons.find(b => b.textContent && b.textContent.includes('MAPA DE BRODMANN'));
    if (brodmannBtn) brodmannBtn.click();
  });
  await new Promise((r) => setTimeout(r, 2000));

  const file2 = path.join(LOCAL_DIR, 'capture_fase8_brodmann_plate_segmented.png');
  const art2 = path.join(ARTIFACT_DIR, 'capture_fase8_brodmann_plate_segmented.png');
  await page.screenshot({ path: file2 });
  fs.copyFileSync(file2, art2);
  console.log('Saved 2: Brodmann Segmented Plate');

  // 3. Click "CORTE SAGITAL MEDIO" (Left hemisphere completely hidden, Right solid tissue with medial face)
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const cutBtn = buttons.find(b => b.textContent && b.textContent.includes('CORTE SAGITAL MEDIO'));
    if (cutBtn) cutBtn.click();
  });
  await new Promise((r) => setTimeout(r, 2000));

  const file3 = path.join(LOCAL_DIR, 'capture_fase8_clean_sagittal_cut.png');
  const art3 = path.join(ARTIFACT_DIR, 'capture_fase8_clean_sagittal_cut.png');
  await page.screenshot({ path: file3 });
  fs.copyFileSync(file3, art3);
  console.log('Saved 3: Clean Sagittal Cut (Zero Inert Gray)');

  // 4. Restore hemisphere and trigger Layered Dissection (Depth 4: Basal Ganglia & Limbic)
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const restoreCutBtn = buttons.find(b => b.textContent && b.textContent.includes('RESTABLECER HEMISFERIO'));
    if (restoreCutBtn) restoreCutBtn.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  // Change dissection depth slider to 4 to expose smoothed subcorticals
  await page.evaluate(() => {
    const sliders = Array.from(document.querySelectorAll('input[type="range"]'));
    // Look for dissection slider (min="1" max="6")
    const depthSlider = sliders.find(s => s.min === '1' && s.max === '6');
    if (depthSlider) {
      depthSlider.value = '4';
      depthSlider.dispatchEvent(new Event('input', { bubbles: true }));
      depthSlider.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  await new Promise((r) => setTimeout(r, 1500));

  // Also click on Thalamus or Caudate to trigger HUD Action Dock
  await page.evaluate(() => {
    // We can isolate Thalamus via button or trigger selection
    const buttons = Array.from(document.querySelectorAll('button'));
    const isoBtns = buttons.filter(b => b.title && b.title.includes('Aislar'));
    if (isoBtns.length > 2) {
      isoBtns[2].click(); // Isolate subcortical
    }
  });
  await new Promise((r) => setTimeout(r, 1500));

  const file4 = path.join(LOCAL_DIR, 'capture_fase8_layered_dissection_and_hud.png');
  const art4 = path.join(ARTIFACT_DIR, 'capture_fase8_layered_dissection_and_hud.png');
  await page.screenshot({ path: file4 });
  fs.copyFileSync(file4, art4);
  console.log('Saved 4: Layered Dissection & Taubin-smoothed Anatomy');

  await browser.close();
  console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY!');
}

run().catch(console.error);
