import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\Hugoi\\.gemini\\antigravity\\brain\\e7c41595-271b-4f89-b029-86aec688b020';
const LOCAL_DIR = 'e:\\Mark_1\\screenshots';

async function run() {
  if (!fs.existsSync(ARTIFACT_DIR)) {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  }

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

  console.log('Loading Mark 1 at http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2500));

  // 1. Switch to "2. MAPA DE BRODMANN / GLASSER"
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const brodmannBtn = buttons.find(b => b.textContent && b.textContent.includes('MAPA DE BRODMANN'));
    if (brodmannBtn) brodmannBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1200));

  // 2. Select Lateral / Sagittal view to clearly see Precentral Gyrus (Rolando), Postcentral Gyrus, and Sylvian Fissure
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const sagitalBtn = buttons.find(b => b.textContent && b.textContent.includes('SAGITAL'));
    if (sagitalBtn) sagitalBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  // 3. Select Área 4 (Giro Precentral / Motor M1)
  await page.evaluate(() => {
    // Select via useNeuroStore window or button if available, or simulate selection
    const store = window.__NEURO_STORE__;
    if (store) {
      store.getState().setSelectedNodeId('GLASSER_4');
    }
  });

  // Let's also click directly near the precentral area on the canvas or trigger selection
  await page.evaluate(() => {
    // Dispatch click on the canvas around the precentral gyrus lateral position
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const clickEvent = new MouseEvent('click', {
        clientX: rect.left + rect.width * 0.48,
        clientY: rect.top + rect.height * 0.42,
        bubbles: true,
      });
      canvas.dispatchEvent(clickEvent);
    }
  });
  await new Promise((r) => setTimeout(r, 1500));

  // Capture 1: Lateral View with Parcellation Borders and Active Region Selected
  const file1 = path.join(LOCAL_DIR, 'capture_borders_and_active_contour_lateral.png');
  const art1 = path.join(ARTIFACT_DIR, 'capture_borders_and_active_contour_lateral.png');
  await page.screenshot({ path: file1 });
  fs.copyFileSync(file1, art1);
  console.log('Saved 1: capture_borders_and_active_contour_lateral.png');

  // 4. Switch to 3D LIBRE (Angled perspective)
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const freeBtn = buttons.find(b => b.textContent && b.textContent.includes('3D LIBRE'));
    if (freeBtn) freeBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  // Capture 2: Free 3D Angled View with Borders and Selected Area
  const file2 = path.join(LOCAL_DIR, 'capture_borders_and_active_contour_3d.png');
  const art2 = path.join(ARTIFACT_DIR, 'capture_borders_and_active_contour_3d.png');
  await page.screenshot({ path: file2 });
  fs.copyFileSync(file2, art2);
  console.log('Saved 2: capture_borders_and_active_contour_3d.png');

  // 5. Test toggling borders OFF to verify the toggle button
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const toggleBtn = buttons.find(b => b.textContent && b.textContent.toLowerCase().includes('líneas delimitadoras'));
    if (toggleBtn) toggleBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1000));

  const file3 = path.join(LOCAL_DIR, 'capture_borders_toggled_off.png');
  const art3 = path.join(ARTIFACT_DIR, 'capture_borders_toggled_off.png');
  await page.screenshot({ path: file3 });
  fs.copyFileSync(file3, art3);
  console.log('Saved 3: capture_borders_toggled_off.png');

  // Re-enable borders
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const toggleBtn = buttons.find(b => b.textContent && b.textContent.toLowerCase().includes('líneas delimitadoras'));
    if (toggleBtn) toggleBtn.click();
  });
  await new Promise((r) => setTimeout(r, 800));

  await browser.close();
  console.log('SUCCESS: All border verification screenshots captured and copied!');
}

run().catch(console.error);
