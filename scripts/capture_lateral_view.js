import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\Hugoi\\.gemini\\antigravity\\brain\\524ebcf3-7d8b-4805-8515-a1614c4753fd';
const SCREENSHOT_DIR = 'e:\\Mark_1\\screenshots';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1920,1080'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 35000 });
  await new Promise((r) => setTimeout(r, 3000));

  // Switch to Sagittal view to view lateral profile
  console.log('Switching to Sagittal View...');
  await page.evaluate(() => {
    const store = window.__NEURO_STORE__?.getState();
    if (store) {
      store.setCameraView('sagittal');
    }
  });
  await new Promise((r) => setTimeout(r, 2000));

  const shotLateralArtifact = path.join(ARTIFACT_DIR, 'capture_tracts_lateral_sagittal_view.png');
  const shotLateralLocal = path.join(SCREENSHOT_DIR, 'capture_tracts_lateral_sagittal_view.png');
  await page.screenshot({ path: shotLateralArtifact });
  await page.screenshot({ path: shotLateralLocal });
  console.log('Saved lateral view:', shotLateralArtifact);

  // Switch to X-Ray / semi-transparent cortex to see tracts strictly nested within gray/white matter boundary
  console.log('Lowering cortical opacity to 45% (X-ray inspection)...');
  await page.evaluate(() => {
    const store = window.__NEURO_STORE__?.getState();
    if (store) {
      store.setCorticalOpacity(45);
    }
  });
  await new Promise((r) => setTimeout(r, 2000));

  const shotXrayArtifact = path.join(ARTIFACT_DIR, 'capture_tracts_xray_internal_confinement.png');
  const shotXrayLocal = path.join(SCREENSHOT_DIR, 'capture_tracts_xray_internal_confinement.png');
  await page.screenshot({ path: shotXrayArtifact });
  await page.screenshot({ path: shotXrayLocal });
  console.log('Saved X-ray confinement:', shotXrayArtifact);

  await browser.close();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
