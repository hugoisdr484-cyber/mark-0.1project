import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\Hugoi\\.gemini\\antigravity\\brain\\c1a68cbb-85af-451f-a52c-5610b81656e9';
const LOCAL_DIR = 'e:\\Mark_1\\screenshots';

async function run() {
  console.log('Iniciando captura de Fase 6 con Edge Chromium...');
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

  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 4500));

  async function saveScreenshot(filename, description) {
    const localPath = path.join(LOCAL_DIR, filename);
    const artifactPath = path.join(ARTIFACT_DIR, filename);
    await page.screenshot({ path: localPath });
    fs.copyFileSync(localPath, artifactPath);
    console.log(`[OK] ${description} -> ${artifactPath}`);
  }

  // 1. Captura: Corteza lisa con normales mezcladas al 45% (sin manchas triangulares oscuras)
  console.log('Tomando captura 1: Corteza suave y etiquetas...');
  await saveScreenshot('capture_fase6_smooth_cortex.png', 'Corteza Suave sin Artefactos y Partículas Refinadas');

  // 2. Captura: Módulo de los 12 Pares Craneales y Síndromes de Tronco
  console.log('Activando Modo Pares Craneales (I-XII)...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent && b.textContent.includes('PARES CRANEALES'));
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 2000));

  // Seleccionar Par III Oculomotor si no está activo
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btnIII = buttons.find(b => b.textContent && b.textContent.trim() === 'PAR III');
    if (btnIII) btnIII.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  await saveScreenshot('capture_fase6_cranial_nerves.png', 'Visualización 3D Pares Craneales (I-XII) y Síndromes de Tronco');

  // 3. Captura: Visor de Neuroimagen RMN en TelemetryPanelRight
  console.log('Cambiando a pestaña CORTE RMN en panel de telemetría...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btnRMN = buttons.find(b => b.textContent && b.textContent.includes('CORTE RMN'));
    if (btnRMN) btnRMN.click();
  });
  await new Promise((r) => setTimeout(r, 1500));

  // Activar secuencia FLAIR
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btnFLAIR = buttons.find(b => b.textContent && b.textContent.includes('FLAIR'));
    if (btnFLAIR) btnFLAIR.click();
  });
  // Scroll right column down so Telemetry and MRI Viewer is fully in view
  await page.evaluate(() => {
    const rmnCanvas = document.querySelector('canvas[width="300"]');
    if (rmnCanvas) {
      rmnCanvas.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
    const scrollables = document.querySelectorAll('.overflow-y-auto');
    if (scrollables.length > 1) {
      scrollables[1].scrollTop = 450;
    }
  });
  await new Promise((r) => setTimeout(r, 1200));

  await saveScreenshot('capture_fase6_mri_viewer.png', 'Visor de Neuroimagen RMN 2D (T2/FLAIR con Isquemia y Crosshair MNI)');

  await browser.close();
  console.log('¡Todas las capturas de la Fase 6 completadas exitosamente!');
}

run().catch((err) => {
  console.error('Error durante la captura:', err);
  process.exit(1);
});
