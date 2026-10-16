import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\Hugoi\\.gemini\\antigravity\\brain\\c1a68cbb-85af-451f-a52c-5610b81656e9';
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
      '--window-size=1920,1080',
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });

  console.log('Loading Mark 1 at http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 3000));

  // 1. Set Sagittal / Lateral view to see the lateral surface clearly
  await page.evaluate(() => {
    const store = window.__NEURO_STORE__;
    if (store) {
      store.getState().setCameraView('sagittal');
    }
  });
  await new Promise((r) => setTimeout(r, 1500));

  // 2. Turn ON Dissection Mode via master button or store
  console.log('Activating Dissection Mode...');
  await page.evaluate(() => {
    const store = window.__NEURO_STORE__;
    if (store) {
      store.getState().setDissectionMode(true);
      store.getState().setDissectionTool('remove');
    }
  });
  await new Promise((r) => setTimeout(r, 800));

  // 3. Dissect / Peel lateral cortical gyri (Precentral, Broca, Superior Temporal, Postcentral)
  console.log('Dissecting Cortical Gyri (Peel effect like Anatomy Learning)...');
  await page.evaluate(() => {
    const store = window.__NEURO_STORE__;
    if (store) {
      // Dissect Precentral gyrus (Motor strip M1)
      store.getState().dissectPiece('Cortex_Precentral_L');
      // Dissect Broca's Area (Frontal Operculum)
      store.getState().dissectPiece('Cortex_Broca_L');
      // Dissect Superior Temporal Gyrus (Auditory / Wernicke)
      store.getState().dissectPiece('Cortex_Temporal_Sup_L');
      // Dissect Postcentral Gyrus (Somatosensory S1)
      store.getState().dissectPiece('Cortex_Postcentral_L');
      // Set hovered piece to demonstrate hover feedback
      store.getState().setHoveredDissectable({
        id: 'Putamen_L',
        name: 'Putamen Izquierdo (Ganglio Basal)',
        type: 'subcortical',
      });
    }
  });
  await new Promise((r) => setTimeout(r, 1500));

  // Capture Screenshot 1: Peel dissection revealing deep structures
  const peelPathLocal = path.join(LOCAL_DIR, 'capture_fase8_anatomy_learning_peel.png');
  const peelPathArtifact = path.join(ARTIFACT_DIR, 'capture_fase8_anatomy_learning_peel.png');
  await page.screenshot({ path: peelPathLocal, fullPage: false });
  fs.copyFileSync(peelPathLocal, peelPathArtifact);
  console.log(`Saved Peel Dissection: ${peelPathArtifact}`);

  // 4. Test Rayos X / Transparent Mode
  console.log('Testing Transparent / Rayos X mode...');
  await page.evaluate(() => {
    const store = window.__NEURO_STORE__;
    if (store) {
      store.getState().setDissectionTool('transparent');
      // Make Superior Parietal gyrus transparent (ghosted at 20% opacity)
      store.getState().togglePieceTransparent('Cortex_Parietal_Sup_L');
      // Make Middle Frontal gyrus transparent
      store.getState().togglePieceTransparent('Cortex_Frontal_Mid_L');
      store.getState().setHoveredDissectable({
        id: 'Cortex_Parietal_Inf_L',
        name: 'Giro Parietal Inferior (Área de Wernicke / Angular)',
        type: 'cortex',
      });
    }
  });
  await new Promise((r) => setTimeout(r, 1500));

  // Capture Screenshot 2: Transparent / Rayos X Mode
  const transPathLocal = path.join(LOCAL_DIR, 'capture_fase8_anatomy_learning_transparent.png');
  const transPathArtifact = path.join(ARTIFACT_DIR, 'capture_fase8_anatomy_learning_transparent.png');
  await page.screenshot({ path: transPathLocal, fullPage: false });
  fs.copyFileSync(transPathLocal, transPathArtifact);
  console.log(`Saved Transparent Mode: ${transPathArtifact}`);

  // 5. Test Undo (Ctrl+Z)
  console.log('Testing Undo...');
  const piecesBefore = await page.evaluate(() => window.__NEURO_STORE__.getState().dissectedPieces.length);
  await page.evaluate(() => {
    window.__NEURO_STORE__.getState().undoDissection();
  });
  const piecesAfterUndo = await page.evaluate(() => window.__NEURO_STORE__.getState().dissectedPieces.length);
  console.log(`Undo test: pieces before = ${piecesBefore}, after = ${piecesAfterUndo}`);

  // 6. Test Restore All
  console.log('Testing Restore All...');
  await page.evaluate(() => {
    window.__NEURO_STORE__.getState().restoreAllDissected();
  });
  const piecesAfterRestore = await page.evaluate(() => window.__NEURO_STORE__.getState().dissectedPieces.length);
  const transAfterRestore = await page.evaluate(() => window.__NEURO_STORE__.getState().transparentPieces.length);
  console.log(`Restore All test: pieces = ${piecesAfterRestore}, transparent = ${transAfterRestore}`);

  await browser.close();
  console.log('Test completed successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
