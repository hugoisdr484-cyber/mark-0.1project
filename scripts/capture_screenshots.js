import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\Hugoi\\.gemini\\antigravity\\brain\\c1a68cbb-85af-451f-a52c-5610b81656e9';
const LOCAL_DIR = 'e:\\Mark_1\\screenshots';

async function run() {
  console.log('Iniciando captura de Fase 5 con Edge Chromium...');
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

  // 1. Captura: Etiquetas 3D centradas (sin corte) + Corteza lisa sin artefactos + Calloso delicado
  await saveScreenshot('capture_fase5_cortex_labels.png', 'Vista General con Etiquetas 3D Centradas y Malla Lisa');

  // 2. Captura: Activar Módulo de Neuroquímica & Farmacología
  console.log('Activando Modo Neuroquímica / Fármacos...');
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('NEUROQUÍMICA')) {
      await btn.click();
      console.log('Botón NEUROQUÍMICA pulsado');
      break;
    }
  }

  // Seleccionar Levodopa / Carbidopa en el selector farmacológico
  console.log('Seleccionando Levodopa en el Simulador...');
  await page.evaluate(() => {
    const selects = Array.from(document.querySelectorAll('select'));
    const drugSelect = selects.find(s => s.innerHTML.includes('DRUG_LEVODOPA'));
    if (drugSelect) {
      drugSelect.value = 'DRUG_LEVODOPA';
      drugSelect.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });

  await new Promise((r) => setTimeout(r, 2000));
  await saveScreenshot('capture_fase5_neurochemistry.png', 'Módulo de Neuroquímica y Simulador Farmacológico Activo');

  await browser.close();
  console.log('Capturas de Fase 5 completadas con éxito.');
}

run().catch((err) => {
  console.error('Error durante la captura:', err);
  process.exit(1);
});
