import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\Hugoi\\.gemini\\antigravity\\brain\\c1a68cbb-85af-451f-a52c-5610b81656e9';
const LOCAL_DIR = 'e:\\Mark_1\\screenshots';

if (!fs.existsSync(LOCAL_DIR)) {
  fs.mkdirSync(LOCAL_DIR, { recursive: true });
}

async function run() {
  console.log('Iniciando captura de Fidelidad Médica 3D...');
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

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 4500));

  async function saveScreenshot(filename, description) {
    const localPath = path.join(LOCAL_DIR, filename);
    const artifactPath = path.join(ARTIFACT_DIR, filename);
    await page.screenshot({ path: localPath });
    fs.copyFileSync(localPath, artifactPath);
    console.log(`[OK] ${description} -> ${artifactPath}`);
  }

  // 1. Captura 1: Visor 3D Despejado y Corteza Continua (Sin confeti de esferas, iluminación quirúrgica)
  console.log('Capturando 1: Visor 3D despejado, corteza orgánica limpia...');
  await saveScreenshot('capture_fase7_clean_cortex.png', 'Visor 3D Despejado - Corteza Orgánica Continua sin Confeti');

  // 2. Captura 2: Módulo de Pares Craneales y Tronco Encefálico Esculpido Anatómico
  console.log('Activando Modo Pares Craneales...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent && b.textContent.includes('PARES CRANEALES'));
    if (btn) btn.click();
  });
  await new Promise((r) => setTimeout(r, 2000));

  // Seleccionar Par V Trigémino para apreciar la raíz ramificada en el puente
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btnV = buttons.find(b => b.textContent && b.textContent.trim() === 'V');
    if (btnV) btnV.click();
  });
  await new Promise((r) => setTimeout(r, 2000));
  await saveScreenshot('capture_fase7_anatomical_brainstem_nerves.png', 'Tronco Encefálico Esculpido y Pares Craneales como Fibras Orgánicas');

  // 3. Captura 3: Haces de Fibras Finas DTI y Árbol Arterial Orgánico con Diámetro Decreciente
  console.log('Activando Corteza Glasser y Vasculatura...');
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btnCortex = buttons.find(b => b.textContent && b.textContent.includes('CORTEZA GLASSER'));
    if (btnCortex) btnCortex.click();
  });
  await new Promise((r) => setTimeout(r, 1000));

  // Activar Vasculatura (Polígono de Willis) desde los controles
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btnVasc = buttons.find(b => b.textContent && (b.textContent.includes('VASCULAR') || b.textContent.includes('WILLIS') || b.textContent.includes('ARTERIAS')));
    if (btnVasc) btnVasc.click();
  });
  await new Promise((r) => setTimeout(r, 2500));

  await saveScreenshot('capture_fase7_fibers_and_vasculature.png', 'Tractografía DTI Deshilachada y Arterias Orgánicas Tapered');

  console.log('Capturas completadas con éxito.');
  await browser.close();
}

run().catch((err) => {
  console.error('Error en captura:', err);
  process.exit(1);
});
