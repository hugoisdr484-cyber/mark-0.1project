import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\Hugoi\\.gemini\\antigravity\\brain\\524ebcf3-7d8b-4805-8515-a1614c4753fd';
const SCREENSHOT_DIR = 'e:\\Mark_1\\screenshots';

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1920,1080'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 35000 });
  await new Promise((r) => setTimeout(r, 4000));

  // 1. Initial State: Standard 3D view with tracts and labels
  const shot1Artifact = path.join(ARTIFACT_DIR, 'capture_tracts_intra_cerebral_aligned.png');
  const shot1Local = path.join(SCREENSHOT_DIR, 'capture_tracts_intra_cerebral_aligned.png');
  await page.screenshot({ path: shot1Artifact });
  await page.screenshot({ path: shot1Local });
  console.log('Saved 1:', shot1Artifact);

  // 2. Select Area 44 (GLASSER_44) or GLASSER_R_44 to inspect leader line
  console.log('Selecting GLASSER_44 to trigger Area 44 and Area 44 Der (Prosodia)...');
  await page.evaluate(() => {
    // Access zustand store directly if exposed, or click node
    const store = window.__NEURO_STORE__?.getState();
    if (store) {
      store.setSelectedNodeId('GLASSER_44');
    }
  });
  await new Promise((r) => setTimeout(r, 1500));

  const shot2Artifact = path.join(ARTIFACT_DIR, 'capture_area44_prosodia_clean_leader.png');
  const shot2Local = path.join(SCREENSHOT_DIR, 'capture_area44_prosodia_clean_leader.png');
  await page.screenshot({ path: shot2Artifact });
  await page.screenshot({ path: shot2Local });
  console.log('Saved 2:', shot2Artifact);

  // 3. Switch to Mid-Sagittal Cut to verify Hemispheric Dissection Synchronization
  console.log('Triggering Mid-Sagittal Cut...');
  await page.evaluate(() => {
    const store = window.__NEURO_STORE__?.getState();
    if (store) {
      store.toggleMidSagittalCut();
    }
  });
  await new Promise((r) => setTimeout(r, 2000));

  const shot3Artifact = path.join(ARTIFACT_DIR, 'capture_tracts_sagittal_cut_sync.png');
  const shot3Local = path.join(SCREENSHOT_DIR, 'capture_tracts_sagittal_cut_sync.png');
  await page.screenshot({ path: shot3Artifact });
  await page.screenshot({ path: shot3Local });
  console.log('Saved 3:', shot3Artifact);

  await browser.close();
  console.log('All verification captures completed successfully!');
}

run().catch((e) => {
  console.error('Error running verification:', e);
  process.exit(1);
});
