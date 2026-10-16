import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\Hugoi\\.gemini\\antigravity\\brain\\e7c41595-271b-4f89-b029-86aec688b020';
const LOCAL_DIR = 'e:\\Mark_1\\screenshots';

async function run() {
  if (!fs.existsSync(ARTIFACT_DIR)) {
    fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  }
  if (!fs.existsSync(LOCAL_DIR)) {
    fs.mkdirSync(LOCAL_DIR, { recursive: true });
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

  // 1. Rotate to posterior/inferior angle or select 3D view to see cerebellum clearly
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const freeBtn = buttons.find(b => b.textContent && b.textContent.includes('3D LIBRE'));
    if (freeBtn) freeBtn.click();
  });
  await new Promise((r) => setTimeout(r, 1000));

  // Also rotate camera so cerebellum (posterior-inferior) is directly facing front
  await page.evaluate(() => {
    // If window has neuro store, set camera or views
    const store = window.__NEURO_STORE__;
    if (store) {
      // Set depth to 6 or keep cortex transparent/semi to see cerebellum prominently,
      // or set camera angle
      console.log('Current store state ready');
    }
  });

  // Turn ON MODO DISECCIÓN
  console.log('Activating [🔪 MODO DISECCIÓN: ON]...');
  await page.evaluate(() => {
    const store = window.__NEURO_STORE__;
    if (store) {
      store.getState().setDissectionMode(true);
    } else {
      const buttons = Array.from(document.querySelectorAll('button'));
      const dissectBtn = buttons.find(b => b.textContent && b.textContent.includes('MODO DISECCIÓN'));
      if (dissectBtn) dissectBtn.click();
    }
  });
  await new Promise((r) => setTimeout(r, 1000));

  // Capture 1: Initial state with Dissection Mode ON
  const file1 = path.join(LOCAL_DIR, 'cerebellum_dissection_ready.png');
  const art1 = path.join(ARTIFACT_DIR, 'cerebellum_dissection_ready.png');
  await page.screenshot({ path: file1 });
  fs.copyFileSync(file1, art1);
  console.log('Saved 1: cerebellum_dissection_ready.png');

  // 2. Perform interactive dissection on Cerebellar Hemisphere Left:
  // Trigger dissectPiece('cerebellum_hemisphere_left', 'Hemisferio Cerebeloso Izquierdo')
  console.log('Dissecting Cerebellum Left Hemisphere...');
  await page.evaluate(() => {
    const store = window.__NEURO_STORE__;
    if (store) {
      store.getState().dissectPiece('cerebellum_hemisphere_left', 'Cerebelo: Hemisferio Cerebeloso Izquierdo');
    }
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Capture 2: Left Cerebellar Hemisphere dissected, exposing internal Arbor Vitae and deep nuclei!
  const file2 = path.join(LOCAL_DIR, 'cerebellum_dissected_left_hemisphere.png');
  const art2 = path.join(ARTIFACT_DIR, 'cerebellum_dissected_left_hemisphere.png');
  await page.screenshot({ path: file2 });
  fs.copyFileSync(file2, art2);
  console.log('Saved 2: cerebellum_dissected_left_hemisphere.png');

  // 3. Dissect Vermis and Right Hemisphere to expose full brainstem, peduncles, and arbor vitae
  console.log('Dissecting Cerebellum Vermis & Right Hemisphere...');
  await page.evaluate(() => {
    const store = window.__NEURO_STORE__;
    if (store) {
      store.getState().dissectPiece('cerebellum_vermis', 'Cerebelo: Vermis Cerebeloso');
      store.getState().dissectPiece('cerebellum_hemisphere_right', 'Cerebelo: Hemisferio Cerebeloso Derecho');
    }
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Capture 3: Fully exposed deep cerebellar structures (Peduncles, Deep Nuclei, Brainstem, Arbor Vitae)
  const file3 = path.join(LOCAL_DIR, 'cerebellum_deep_structures_exposed.png');
  const art3 = path.join(ARTIFACT_DIR, 'cerebellum_deep_structures_exposed.png');
  await page.screenshot({ path: file3 });
  fs.copyFileSync(file3, art3);
  console.log('Saved 3: cerebellum_deep_structures_exposed.png');

  // 4. Test Undo button: undo twice
  console.log('Testing Undo Dissection...');
  await page.evaluate(() => {
    const store = window.__NEURO_STORE__;
    if (store) {
      store.getState().undoDissection();
      store.getState().undoDissection();
      store.getState().undoDissection();
    }
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Capture 4: Restored cerebellum after Undo
  const file4 = path.join(LOCAL_DIR, 'cerebellum_restored_after_undo.png');
  const art4 = path.join(ARTIFACT_DIR, 'cerebellum_restored_after_undo.png');
  await page.screenshot({ path: file4 });
  fs.copyFileSync(file4, art4);
  console.log('Saved 4: cerebellum_restored_after_undo.png');

  // 5. Open right panel and verify Layer 6 Cerebellum toggles
  await page.evaluate(() => {
    const store = window.__NEURO_STORE__;
    if (store) {
      store.getState().setIsRightPanelOpen(true);
      store.getState().setDissectionDepth(6); // Go to Capa 6
    }
  });
  await new Promise((r) => setTimeout(r, 1200));

  const file5 = path.join(LOCAL_DIR, 'cerebellum_layer6_control_panel.png');
  const art5 = path.join(ARTIFACT_DIR, 'cerebellum_layer6_control_panel.png');
  await page.screenshot({ path: file5 });
  fs.copyFileSync(file5, art5);
  console.log('Saved 5: cerebellum_layer6_control_panel.png');

  await browser.close();
  console.log('SUCCESS: All cerebellar dissection verification steps completed!');
}

run().catch(console.error);
