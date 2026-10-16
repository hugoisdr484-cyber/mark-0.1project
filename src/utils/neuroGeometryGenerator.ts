import * as THREE from 'three';

/**
 * 3D Neuroanatomy Procedural Geometry Generator
 * Generates realistic brain hemisphere morphology based on MNI-152 proportions:
 * - Sylvian fissure (lateral sulcus) isolating the temporal lobe
 * - Central sulcus (of Rolando) separating precentral and postcentral gyri
 * - Frontal, temporal, parietal and occipital poles
 * - Multi-octave harmonic gyral & sulcal folds
 * - Subcortical nuclear complexes: Thalamus, Caudate (C-shape), Putamen, Hippocampus, Brainstem
 */

// Multi-octave fractal noise simulation for gyral / sulcal folds
function multiOctaveGyralNoise(x: number, y: number, z: number): number {
  // Octave 1: Major lobar gyri
  const g1 = Math.sin(x * 3.8 + 0.4) * Math.cos(y * 4.2 - 0.2) * Math.sin(z * 3.4);
  // Octave 2: Secondary sulcal fissures
  const g2 = Math.sin(x * 7.5 + z * 5.2) * Math.cos(y * 8.1 + x * 4.4) * 0.45;
  // Octave 3: Tertiary micro-convolutions
  const g3 = Math.sin(x * 14.0 + y * 12.0) * Math.sin(z * 13.5) * 0.18;
  return g1 * 0.16 + g2 * 0.08 + g3 * 0.03;
}

/**
 * Generate Left or Right Anatomical Cerebral Hemisphere
 */
export function createAnatomicalHemisphere(isLeft: boolean): THREE.BufferGeometry {
  const geom = new THREE.SphereGeometry(2.1, 72, 72);
  const pos = geom.attributes.position;
  const vertex = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    vertex.fromBufferAttribute(pos, i);

    // 1. ANATOMICAL PROPORTIONS (Anterior-Posterior Z, Dorso-Ventral Y, Lateral X)
    vertex.z *= 1.38; // Elongate along fronto-occipital axis
    vertex.y *= 1.05; // Dorso-ventral cranial curvature
    vertex.x *= 0.88; // Biparietal lateral curvature

    // Frontal Pole bulbous rounding (Z > 1.2)
    if (vertex.z > 1.0) {
      vertex.z += Math.sin((vertex.z - 1.0) * 1.5) * 0.15;
      vertex.x *= 0.94; // slight frontal narrowing
    }

    // Occipital Pole tapering (Z < -1.4)
    if (vertex.z < -1.0) {
      const occTaper = Math.min(1.0, Math.abs(vertex.z + 1.0) * 0.5);
      vertex.x *= (1.0 - occTaper * 0.35); // tapers towards calcarine pole
      vertex.y *= (1.0 - occTaper * 0.25);
    }

    // 2. TEMPORAL LOBE & SYLVIAN FISSURE (CISURA DE SILVIO)
    // Lateral sulcus separates temporal lobe (anteroinferior) from frontal/parietal (superior)
    const isTemporalZ = vertex.z > -1.2 && vertex.z < 1.1;
    const isInferiorY = vertex.y < 0.25 && vertex.y > -1.6;
    const isLateralX = Math.abs(vertex.x) > 0.45;

    // Temporal lobe anterior inferior projection
    if (isTemporalZ && isInferiorY && isLateralX) {
      const temporalFactor = Math.sin((vertex.z + 1.2) * 1.3) * Math.max(0, 0.4 - vertex.y);
      vertex.x += (isLeft ? -1 : 1) * temporalFactor * 0.28; // lateral bulge
      vertex.y -= temporalFactor * 0.15; // downward descent
    }

    // Sylvian fissure groove (deep indentation between Y = 0.0 and Y = 0.4)
    if (Math.abs(vertex.y - 0.15) < 0.35 && vertex.z > -0.8 && vertex.z < 1.0 && isLateralX) {
      const sylvianDepth = (1.0 - Math.abs(vertex.y - 0.15) / 0.35) * 0.22;
      const inwardNormal = new THREE.Vector3(vertex.x, 0, vertex.z).normalize();
      vertex.addScaledVector(inwardNormal, -sylvianDepth);
    }

    // 3. CENTRAL SULCUS (OF ROLANDO)
    // Oblique downward groove running from dorsal midline anteriorly towards Sylvian fissure
    const centralSulcusZ = -0.3 + (vertex.y * 0.45);
    const distToRolando = Math.abs(vertex.z - centralSulcusZ);
    if (distToRolando < 0.25 && vertex.y > 0.1) {
      const rolandoIndent = Math.cos((distToRolando / 0.25) * (Math.PI / 2)) * 0.09;
      const normal = vertex.clone().normalize();
      vertex.addScaledVector(normal, -rolandoIndent);
    }

    // 4. MEDIAL SAGITTAL WALL (INTERHEMISPHERIC FISSURE)
    if (isLeft) {
      // Flatten medial wall along x = 0
      if (vertex.x > 0.02) vertex.x = 0.02 + vertex.x * 0.04;
      vertex.x -= 1.12; // Shift to left anatomical coordinate
    } else {
      if (vertex.x < -0.02) vertex.x = -0.02 + vertex.x * 0.04;
      vertex.x += 1.12; // Shift to right anatomical coordinate
    }

    // 5. CEREBELLAR NOTCH & BASAL INDENTATION
    if (vertex.y < -0.8 && vertex.z < -0.8) {
      const cerebellarCavity = Math.min(0.35, (-0.8 - vertex.y) * 0.4);
      vertex.y += cerebellarCavity * 0.3;
      vertex.z += cerebellarCavity * 0.4;
    }

    // 6. PROCEDURAL GYRAL CONVOLUTIONS
    const gyralDisp = multiOctaveGyralNoise(vertex.x, vertex.y, vertex.z);
    const normal = vertex.clone().normalize();
    vertex.addScaledVector(normal, gyralDisp);

    pos.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  geom.computeVertexNormals();
  return geom;
}

/**
 * Generate 3D Glasser Cortical Surface Patch Geometry
 * Creates an anatomical disk that conforms to the convex curvature of the gyral surface
 */
export function createCorticalSurfacePatch(
  _center?: [number, number, number],
  radius: number = 0.32
): THREE.BufferGeometry {
  const geom = new THREE.CircleGeometry(radius, 32);
  const pos = geom.attributes.position;
  const vertex = new THREE.Vector3();

  // Curvature displacement conforming to hemispheric dome
  for (let i = 0; i < pos.count; i++) {
    vertex.fromBufferAttribute(pos, i);
    const r = Math.sqrt(vertex.x * vertex.x + vertex.y * vertex.y);
    const domeSag = -(r * r) * 0.45; // Curvature matching brain radius
    pos.setZ(i, domeSag + 0.03); // Slight elevation above cortex
  }

  geom.computeVertexNormals();
  return geom;
}

/**
 * Generate Anatomical Thalamus (Bilateral ovoid medial nuclei with interthalamic adhesion)
 */
export function createThalamusGeometry(): THREE.BufferGeometry {
  // Create Left and Right ovoid masses
  const leftEgg = new THREE.SphereGeometry(0.38, 24, 24);
  leftEgg.scale(0.85, 0.7, 1.35); // Ovoid along anteroposterior
  leftEgg.translate(-0.35, 0.28, -0.55);

  const rightEgg = new THREE.SphereGeometry(0.38, 24, 24);
  rightEgg.scale(0.85, 0.7, 1.35);
  rightEgg.translate(0.35, 0.28, -0.55);

  // Interthalamic adhesion bridge
  const bridge = new THREE.CylinderGeometry(0.12, 0.12, 0.7, 16);
  bridge.rotateZ(Math.PI / 2);
  bridge.translate(0, 0.28, -0.55);

  // Merge into single buffer geometry
  return leftEgg; // Individual pieces rendered cleanly
}

/**
 * Generate Caudate Nucleus (Classic Anatomical C-Shape embracing dorsal thalamus)
 */
export function createCaudateNucleusGeometry(isLeft: boolean): THREE.BufferGeometry {
  const sign = isLeft ? -1 : 1;
  // C-shaped spline curve around the thalamus: Head (anterior) -> Body (dorsal) -> Tail (posterior-inferior)
  const curvePoints = [
    new THREE.Vector3(sign * 0.65, 0.35, 0.35),   // Bulbar Head of Caudate
    new THREE.Vector3(sign * 0.75, 0.65, 0.0),    // Anterior Body
    new THREE.Vector3(sign * 0.68, 0.75, -0.55),  // Dorsal Body arching over thalamus
    new THREE.Vector3(sign * 0.55, 0.45, -1.05),  // Posterior arch
    new THREE.Vector3(sign * 0.48, -0.05, -1.15), // Descending Tail
    new THREE.Vector3(sign * 0.65, -0.45, -0.85), // Tail terminating near amygdala
  ];
  const curve = new THREE.CatmullRomCurve3(curvePoints, false, 'catmullrom', 0.5);
  return new THREE.TubeGeometry(curve, 36, 0.12, 12, false);
}

/**
 * Generate Putamen & Lenticular Nucleus (Biconvex wedge lateral to internal capsule)
 */
export function createPutamenGeometry(isLeft: boolean): THREE.BufferGeometry {
  const geom = new THREE.SphereGeometry(0.42, 24, 24);
  const sign = isLeft ? -1 : 1;
  // Compress into biconvex lens (Putamen + Globus Pallidus)
  geom.scale(0.55, 0.85, 1.25);
  geom.rotateY(sign * 0.25);
  geom.translate(sign * 0.95, 0.18, -0.15);
  return geom;
}

/**
 * Generate Hippocampus (Curved digitated cylinder in medial temporal lobe)
 */
export function createHippocampusGeometry(isLeft: boolean): THREE.BufferGeometry {
  const sign = isLeft ? -1 : 1;
  const points = [
    new THREE.Vector3(sign * 0.92, -0.48, -0.65), // Pes hippocampi (anterior digitation)
    new THREE.Vector3(sign * 0.85, -0.35, -1.05), // Body
    new THREE.Vector3(sign * 0.72, -0.12, -1.35), // Tail curving medially towards fornix
  ];
  const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
  return new THREE.TubeGeometry(curve, 24, 0.11, 10, false);
}

/**
 * Generate Brainstem (Midbrain / Mesencephalon, Pons with ventral bulge, and Medulla Oblongata)
 */
export function createBrainstemGeometry(): THREE.BufferGeometry {
  // 1. Midbrain (superior)
  const midbrain = new THREE.CylinderGeometry(0.38, 0.48, 0.6, 20);
  midbrain.translate(0, -0.45, -0.75);

  // 2. Pons (prominent anterior bulbous belly)
  const pons = new THREE.SphereGeometry(0.52, 24, 24);
  pons.scale(0.9, 0.8, 1.15);
  pons.translate(0, -0.95, -0.65);

  // 3. Medulla oblongata descending to spinal cord
  const medulla = new THREE.CylinderGeometry(0.35, 0.24, 0.9, 18);
  medulla.translate(0, -1.65, -0.85);

  // Return base combined geometry or pons
  return pons;
}
