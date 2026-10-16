import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useNeuroStore } from '../../store/useNeuroStore';
import { useDissectable } from '../../hooks/useDissectable';
import { CRANIAL_NERVES_DB } from '../../data/cranialNervesDB';
import type { CranialNerve } from '../../data/cranialNervesDB';

/**
 * Creates an anatomically accurate sculpted continuous mesh of the human brainstem:
 * - Mesencephalon: diverging cerebral peduncles (crura cerebri) & interpeduncular fossa
 * - Pons: prominent anterior pontine belly, basilar sulcus, middle cerebellar peduncles
 * - Medulla Oblongata: anterior median fissure, medullary pyramids, olives, pre/retro-olivary sulci, and decussation
 */
export function createAnatomicalBrainstemGeometry(): THREE.BufferGeometry {
  const slicesY = 56;
  const slicesTheta = 40;
  const positions: number[] = [];
  const indices: number[] = [];
  const colors: number[] = [];

  const yMin = -0.72;
  const yMax = -2.10;

  for (let j = 0; j <= slicesY; j++) {
    const v = j / slicesY;
    const y = yMin + (yMax - yMin) * v;

    for (let i = 0; i <= slicesTheta; i++) {
      const u = i / slicesTheta;
      const theta = u * Math.PI * 2;
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);

      let rx = 0.24;
      let rz = 0.24;
      let centerZ = -0.52;
      let sulcalDepth = 0.0;

      if (y > -0.98) {
        // ==========================================
        // 1. MESENCÉFALO (Midbrain) - Pedúnculos cerebrales
        // ==========================================
        const mesenT = (y - (-0.98)) / (-0.72 - (-0.98));
        rx = 0.22 + mesenT * 0.08;
        rz = 0.22 + mesenT * 0.06;
        centerZ = -0.50 + mesenT * 0.04;

        // Fosa interpeduncular anterior (V-groove in front between crus cerebri)
        if (sinT > 0.4 && Math.abs(cosT) < 0.35) {
          sulcalDepth = -0.06 * (1.0 - Math.abs(cosT) / 0.35);
        }
        // Lateral peduncular outward bulge
        if (sinT > 0.1 && Math.abs(cosT) > 0.45) {
          rx += 0.04 * (Math.abs(cosT) - 0.45);
        }
      } else if (y >= -1.44) {
        // ==========================================
        // 2. PUENTE / PROTUBERANCIA (Pons) - Vientre pontino
        // ==========================================
        const ponsT = Math.sin(((y - (-1.44)) / (-0.98 - (-1.44))) * Math.PI);
        rx = 0.26 + ponsT * 0.12; // Transverse widening into middle cerebellar peduncles
        rz = 0.24 + ponsT * 0.14; // Prominent anterior convex belly
        centerZ = -0.52 + ponsT * 0.08; // Pushes anteriorly

        // Surco basilar en la línea media anterior (anterior median groove for basilar artery)
        if (sinT > 0.65 && Math.abs(cosT) < 0.22) {
          sulcalDepth = -0.045 * (1.0 - Math.abs(cosT) / 0.22);
        }
        // Fine horizontal pontine transverse striations
        sulcalDepth += Math.sin(y * 85.0) * 0.003;
      } else {
        // ==========================================
        // 3. BULBO RAQUÍDEO (Medulla Oblongata) - Pirámides y Olivas
        // ==========================================
        const medT = (y - (-2.10)) / (-1.44 - (-2.10)); // 1 at pons, 0 at cord
        rx = 0.16 + medT * 0.09;
        rz = 0.18 + medT * 0.07;
        centerZ = -0.54 - (1 - medT) * 0.06;

        // Fisura media anterior
        if (sinT > 0.65 && Math.abs(cosT) < 0.14) {
          sulcalDepth = -0.035 * (1.0 - Math.abs(cosT) / 0.14) * medT;
        }

        // Pirámides bulbares anteriores (bilateral cord-like ridges)
        if (sinT > 0.55 && Math.abs(cosT) >= 0.10 && Math.abs(cosT) <= 0.42) {
          sulcalDepth += 0.038 * Math.sin(((Math.abs(cosT) - 0.10) / 0.32) * Math.PI);
        }

        // Olivas bulbares (prominencias ovoides anterolaterales en Y: -1.55 a -1.82)
        if (y < -1.52 && y > -1.84) {
          const oliveVertProfile = Math.sin(((y - (-1.84)) / (-1.52 - (-1.84))) * Math.PI);
          if (sinT > 0.15 && Math.abs(cosT) >= 0.44 && Math.abs(cosT) <= 0.85) {
            const oliveLatProfile = Math.sin(((Math.abs(cosT) - 0.44) / 0.41) * Math.PI);
            sulcalDepth += 0.048 * oliveVertProfile * oliveLatProfile;
          }
          // Surco preolivar (groove between pyramid and olive for CN XII)
          if (sinT > 0.35 && Math.abs(cosT) > 0.38 && Math.abs(cosT) < 0.46) {
            sulcalDepth -= 0.025;
          }
          // Surco retroolivar (groove behind olive for CN IX, X, XI)
          if (sinT < 0.25 && sinT > -0.2 && Math.abs(cosT) > 0.75) {
            sulcalDepth -= 0.022;
          }
        }
      }

      const totalRadiusX = Math.max(0.08, rx + sulcalDepth);
      const totalRadiusZ = Math.max(0.08, rz + sulcalDepth);

      const posX = cosT * totalRadiusX;
      const posY = y;
      const posZ = centerZ + sinT * totalRadiusZ;

      positions.push(posX, posY, posZ);

      // Shading based on height and sulcal depth (natural ambient occlusion in grooves)
      const baseTone = 0.82 + (sulcalDepth * 1.8);
      colors.push(
        baseTone * 0.94, // R (warm ivory-beige)
        baseTone * 0.91, // G
        baseTone * 0.85  // B
      );
    }
  }

  // Generate triangle indices
  for (let j = 0; j < slicesY; j++) {
    for (let i = 0; i < slicesTheta; i++) {
      const a = j * (slicesTheta + 1) + i;
      const b = (j + 1) * (slicesTheta + 1) + i;
      const c = (j + 1) * (slicesTheta + 1) + (i + 1);
      const d = j * (slicesTheta + 1) + (i + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

/**
 * Creates an anatomically sculpted continuous mesh of the human cerebellum:
 * - Bilateral cerebellar hemispheres situated in the posterior cranial fossa
 * - Midline vermis bridging the hemispheres with a distinct posterior notch (vallecula)
 * - Dense horizontal folia (transverse fissures of the cerebellar cortex)
 * - Anterior flattening where it forms the roof of the 4th ventricle behind the brainstem
 */
export function createAnatomicalCerebellumGeometry(): THREE.BufferGeometry {
  const slicesY = 48;
  const slicesTheta = 44;
  const positions: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  const yTop = -0.92;
  const yBottom = -1.86;

  for (let j = 0; j <= slicesY; j++) {
    const v = j / slicesY;
    const y = yTop + (yBottom - yTop) * v;

    const vertProfile = Math.sin(v * Math.PI);
    const rx = 0.35 + Math.pow(vertProfile, 0.70) * 0.90;
    const rz = 0.26 + Math.pow(vertProfile, 0.85) * 0.62;

    for (let i = 0; i <= slicesTheta; i++) {
      const u = i / slicesTheta;
      const theta = u * Math.PI * 2;
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);

      let midlineNotch = 0.0;
      if (Math.abs(cosT) < 0.28) {
        const notchFactor = 1.0 - Math.abs(cosT) / 0.28;
        if (sinT < 0.25) {
          midlineNotch = notchFactor * 0.28 * vertProfile;
        }
      }

      const foliaFreq = 58.0;
      const foliaWave = Math.sin(y * foliaFreq) * 0.012 * vertProfile;

      let antFlattening = 0.0;
      if (sinT > 0.30) {
        antFlattening = (sinT - 0.30) * 0.24 * vertProfile;
      }

      const totalRadiusX = Math.max(0.08, rx - midlineNotch);
      const totalRadiusZ = Math.max(0.08, rz - antFlattening);

      const posX = cosT * totalRadiusX;
      const posY = y + foliaWave;
      const posZ = -1.48 + sinT * totalRadiusZ - foliaWave * 0.35;

      positions.push(posX, posY, posZ);

      const foliaShade = (Math.sin(y * foliaFreq) * 0.5 + 0.5) * 0.16;
      const notchShade = midlineNotch * 0.30;
      const baseTone = 0.78 - foliaShade - notchShade;

      colors.push(
        baseTone * 0.94,
        baseTone * 0.96,
        baseTone * 1.00
      );
    }
  }

  for (let j = 0; j < slicesY; j++) {
    for (let i = 0; i < slicesTheta; i++) {
      const a = j * (slicesTheta + 1) + i;
      const b = (j + 1) * (slicesTheta + 1) + i;
      const c = (j + 1) * (slicesTheta + 1) + (i + 1);
      const d = j * (slicesTheta + 1) + (i + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

interface OrganicNerveItem {
  nerve: CranialNerve;
  leftGeo: THREE.BufferGeometry;
  rightGeo: THREE.BufferGeometry;
  rootletGeos: THREE.BufferGeometry[];
  labelPos: THREE.Vector3;
}

/**
 * Builds organic nerve fiber bundles with realistic micro-rootlets for a cranial nerve pair.
 */
function createOrganicNerveItem(nerve: CranialNerve): OrganicNerveItem {
  const leftVecs = nerve.leftPoints.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
  const rightVecs = nerve.rightPoints.map((p) => new THREE.Vector3(p[0], p[1], p[2]));

  const leftCurve = new THREE.CatmullRomCurve3(leftVecs, false, 'centripetal', 0.5);
  const rightCurve = new THREE.CatmullRomCurve3(rightVecs, false, 'centripetal', 0.5);

  // Scaled anatomical thicknesses (realistic fine diameters)
  let trunkRadius = 0.010;
  if (nerve.id === 'cn2') trunkRadius = 0.016;       // Optic nerve (robust)
  else if (nerve.id === 'cn4') trunkRadius = 0.005;  // Trochlear (thinnest)
  else if (nerve.id === 'cn5') trunkRadius = 0.016;  // Trigeminal (thickest)
  else if (nerve.id === 'cn8') trunkRadius = 0.013;  // Vestibulocochlear
  else if (nerve.id === 'cn12') trunkRadius = 0.009; // Hypoglossal

  const leftGeo = new THREE.TubeGeometry(leftCurve, 32, trunkRadius, 10, false);
  const rightGeo = new THREE.TubeGeometry(rightCurve, 32, trunkRadius, 10, false);

  // Micro-rootlets at apparent origin
  const rootletGeos: THREE.BufferGeometry[] = [];
  const originLeft = leftVecs[0];
  const originRight = rightVecs[0];

  // Rootlet count based on anatomical emerging pattern
  let rootletCount = 0;
  if (['cn3', 'cn6', 'cn12'].includes(nerve.id)) rootletCount = 2;
  else if (['cn9', 'cn10', 'cn11'].includes(nerve.id)) rootletCount = 3;
  else if (nerve.id === 'cn5') rootletCount = 2; // Sensory portio major + motor portio minor

  if (rootletCount > 0) {
    for (let r = 1; r <= rootletCount; r++) {
      const spreadY = (r - (rootletCount / 2)) * 0.024;
      const spreadX = (r % 2 === 0 ? 0.015 : -0.015);

      // Left rootlet
      const rLeftPts = [
        new THREE.Vector3(originLeft.x + spreadX, originLeft.y + spreadY, originLeft.z - 0.03),
        new THREE.Vector3(originLeft.x + spreadX * 0.5, originLeft.y + spreadY * 0.5, originLeft.z - 0.01),
        leftCurve.getPointAt(0.28)
      ];
      const rLeftCurve = new THREE.CatmullRomCurve3(rLeftPts, false, 'centripetal', 0.5);
      rootletGeos.push(new THREE.TubeGeometry(rLeftCurve, 16, trunkRadius * 0.55, 6, false));

      // Right rootlet
      const rRightPts = [
        new THREE.Vector3(originRight.x - spreadX, originRight.y + spreadY, originRight.z - 0.03),
        new THREE.Vector3(originRight.x - spreadX * 0.5, originRight.y + spreadY * 0.5, originRight.z - 0.01),
        rightCurve.getPointAt(0.28)
      ];
      const rRightCurve = new THREE.CatmullRomCurve3(rRightPts, false, 'centripetal', 0.5);
      rootletGeos.push(new THREE.TubeGeometry(rRightCurve, 16, trunkRadius * 0.55, 6, false));
    }
  }

  const labelPos = leftCurve.getPointAt(0.45);

  leftGeo.computeBoundingSphere();
  rightGeo.computeBoundingSphere();
  rootletGeos.forEach((g) => g.computeBoundingSphere());

  return {
    nerve,
    leftGeo,
    rightGeo,
    rootletGeos,
    labelPos
  };
}

interface DissectableNerveGroupProps {
  item: OrganicNerveItem;
  isSelected: boolean;
  setSelectedCranialNerveId: (id: string) => void;
}

const DissectableNerveGroup: React.FC<DissectableNerveGroupProps> = ({
  item,
  isSelected,
  setSelectedCranialNerveId,
}) => {
  const { isVisible, isTransparent, isHovered, handleClick, handlePointerOver, handlePointerOut } = useDissectable(item.nerve.id, item.nerve.name);
  const isInteracting = useNeuroStore((s) => s.isInteracting);
  if (!isVisible) return null;

  const baseNerveColor = isSelected ? new THREE.Color('#38bdf8') : new THREE.Color('#f6f0df');
  const emissiveColor = isSelected
    ? new THREE.Color('#00f0ff')
    : new THREE.Color('#221d12');
  const emissiveIntensity = isSelected ? 1.6 : 0.2;

  const nerveColor = isHovered ? '#00e5ff' : baseNerveColor;
  const finalEmissiveColor = isHovered ? '#00e5ff' : emissiveColor;
  const finalEmissiveIntensity = isHovered ? 1.8 : emissiveIntensity;
  const opacity = isTransparent ? 0.20 : 0.95;

  return (
    <group
      onClick={(e) => {
        if (handleClick(e)) return;
        e.stopPropagation();
        setSelectedCranialNerveId(item.nerve.id);
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Left Primary Trunk */}
      <mesh geometry={item.leftGeo}>
        <meshPhysicalMaterial
          color={nerveColor}
          emissive={finalEmissiveColor}
          emissiveIntensity={finalEmissiveIntensity}
          roughness={0.30}
          metalness={0.12}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          transparent={isTransparent}
          opacity={opacity}
        />
      </mesh>

      {/* Right Primary Trunk */}
      <mesh geometry={item.rightGeo}>
        <meshPhysicalMaterial
          color={nerveColor}
          emissive={finalEmissiveColor}
          emissiveIntensity={finalEmissiveIntensity}
          roughness={0.30}
          metalness={0.12}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          transparent={isTransparent}
          opacity={opacity}
        />
      </mesh>

      {/* Fine Anatomic Rootlets at Sulcal Emerging Points */}
      {item.rootletGeos.map((rGeo: any, rIdx: number) => (
        <mesh key={`rootlet-${item.nerve.id}-${rIdx}`} geometry={rGeo}>
          <meshPhysicalMaterial
            color={nerveColor}
            emissive={finalEmissiveColor}
            emissiveIntensity={finalEmissiveIntensity * 0.9}
            roughness={0.35}
            metalness={0.10}
            clearcoat={0.7}
            transparent={isTransparent}
            opacity={opacity}
          />
        </mesh>
      ))}

      {/* Deep Origin Nucleus Seed */}
      <mesh position={item.nerve.nucleusCenter}>
        <sphereGeometry args={[isSelected || isHovered ? 0.024 : 0.014, 16, 16]} />
        <meshBasicMaterial color={isHovered ? '#00e5ff' : (isSelected ? '#00f0ff' : '#fbbf24')} />
      </mesh>
      <mesh
        position={[
          -item.nerve.nucleusCenter[0],
          item.nerve.nucleusCenter[1],
          item.nerve.nucleusCenter[2],
        ]}
      >
        <sphereGeometry args={[isSelected || isHovered ? 0.024 : 0.014, 16, 16]} />
        <meshBasicMaterial color={isHovered ? '#00e5ff' : (isSelected ? '#00f0ff' : '#fbbf24')} />
      </mesh>

      {/* Selected Nerve 3D HUD Callout Badge */}
      {isSelected && !isInteracting && (
        <Html
          position={[item.labelPos.x - 0.22, item.labelPos.y + 0.10, item.labelPos.z + 0.12]}
          center
          distanceFactor={8}
          occlude={false}
          zIndexRange={[50, 0]}
        >
          <div
            className="px-2.5 py-1 rounded text-[10px] font-mono tracking-wider font-bold shadow-2xl border pointer-events-none whitespace-nowrap flex items-center gap-2 backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(5, 12, 22, 0.92)',
              borderColor: '#38bdf8',
              color: '#e0f2fe',
              boxShadow: '0 0 16px rgba(56, 189, 248, 0.45)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
            <span>PAR {item.nerve.romanNumeral} • {item.nerve.name.toUpperCase()}</span>
            <span className="text-[8px] text-cyan-300 font-normal">({item.nerve.latinName})</span>
          </div>
        </Html>
      )}
    </group>
  );
};

export const CranialNerves3D: React.FC = () => {
  const showCranialNerves = useNeuroStore((state) => state.showCranialNerves);
  const selectedCranialNerveId = useNeuroStore((state) => state.selectedCranialNerveId);
  const setSelectedCranialNerveId = useNeuroStore((state) => state.setSelectedCranialNerveId);

  // Precompute organic nerve fibers and rootlets
  const nervesRenderData: OrganicNerveItem[] = useMemo(() => {
    return CRANIAL_NERVES_DB.map((n) => createOrganicNerveItem(n));
  }, []);

  if (!showCranialNerves) return null;

  return (
    <group name="anatomical-cranial-nerves-group">
      {/* ========================================================================= */}
      {/* 1. THE 12 CRANIAL NERVES AS MEDICAL ORGANIC FIBER BUNDLES (I to XII)      */}
      {/* ========================================================================= */}
      {nervesRenderData.map((item) => {
        const isSelected = selectedCranialNerveId === item.nerve.id;
        return (
          <DissectableNerveGroup
            key={item.nerve.id}
            item={item}
            isSelected={isSelected}
            setSelectedCranialNerveId={setSelectedCranialNerveId}
          />
        );
      })}
    </group>
  );
};
