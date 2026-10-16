import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ARTIFACT_DIR = 'C:\\Users\\Hugoi\\.gemini\\antigravity\\brain\\c1a68cbb-85af-451f-a52c-5610b81656e9';
const LOCAL_DIR = 'e:\\Mark_1\\screenshots';

async function run() {
  if (!fs.existsSync(ARTIFACT_DIR)) fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  if (!fs.existsSync(LOCAL_DIR)) fs.mkdirSync(LOCAL_DIR, { recursive: true });

  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1920,1080'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  console.log('Cargando aplicación Mark 1 en http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 35000 });
  await new Promise((r) => setTimeout(r, 3000));

  // --- PRUEBA 1: CORTE TOMOGRÁFICO AXIAL DINÁMICO (Z = +14 mm) ---
  console.log('Activando Corte Tomográfico Axial con slider milimétrico MNI...');
  await page.evaluate(() => {
    const store = window.__NEURO_STORE__;
    if (store) {
      store.getState().setClippingPlane('axial');
      store.getState().setClippingOffset(14);
    }
  });
  await new Promise((r) => setTimeout(r, 1500));

  const fpsTomography = await page.evaluate(() => window.__NEURO_STORE__?.getState().fps || 0);
  console.log(`FPS con corte tomográfico activo: ${fpsTomography}`);

  const shot1 = path.join(LOCAL_DIR, 'capture_corte_tomografico_dinamico.png');
  const art1 = path.join(ARTIFACT_DIR, 'capture_corte_tomografico_dinamico.png');
  await page.screenshot({ path: shot1 });
  fs.copyFileSync(shot1, art1);
  console.log(`Guardada Captura 1 (Corte Tomográfico): ${art1}`);

  // --- PRUEBA 2: NÚCLEOS SEGMENTADOS DE TÁLAMO, SUBTÁLAMO Y BULBO (CON HOVER CIAN) ---
  console.log('Configurando vista subcortical y tronco encefálico para revelar tálamo y bulbo...');
  await page.evaluate(() => {
    const store = window.__NEURO_STORE__;
    if (store) {
      // Desactivar corte tomográfico
      store.getState().setClippingPlane('none');
      // Profundidad 5: expone directamente tálamo, subtálamo y tronco encefálico
      store.getState().setDissectionDepth(5);
      // Seleccionar el Núcleo Ventral Posterolateral del Tálamo (VPL)
      store.getState().setSelectedStructureId('Thal_VPL_L');
      // Hover cian quirúrgico sobre VPL
      store.getState().setHoveredDissectable({
        id: 'Thal_VPL_L',
        name: 'Tálamo: Núcleo Ventral Posterolateral (VPL) (Izq)',
      });
    }
  });

  // Mover el ratón al centro para activar el tooltip flotante
  await page.mouse.move(720, 460);
  await new Promise((r) => setTimeout(r, 2000));

  const shot2 = path.join(LOCAL_DIR, 'capture_talamo_subtalamo_bulbo_segmentado.png');
  const art2 = path.join(ARTIFACT_DIR, 'capture_talamo_subtalamo_bulbo_segmentado.png');
  await page.screenshot({ path: shot2 });
  fs.copyFileSync(shot2, art2);
  console.log(`Guardada Captura 2 (Tálamo, Subtálamo y Bulbo Segmentados): ${art2}`);

  await browser.close();
  console.log('¡VERIFICACIÓN COMPLETADA CON ÉXITO!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
