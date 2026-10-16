import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useNeuroStore } from '../../store/useNeuroStore';
import { useDissectable } from '../../hooks/useDissectable';
import { HOVER_EMISSIVE, HOVER_EMISSIVE_INTENSITY, hoverTintColor } from '../../utils/hoverTint';

interface VesselSegment {
  id: string;
  name: string;
  territoryKey: string;
  points: [number, number, number][];
  startRadius: number;
  endRadius: number;
  baseColor: string;
}

/**
 * Real-time anatomical vessel generator with organic diameter tapering and natural hemodynamic undulations.
 */
function createTaperedOrganicVesselGeometry(
  points: [number, number, number][],
  startRadius: number,
  endRadius: number
): THREE.BufferGeometry {
  const v3Points = points.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
  const curve = new THREE.CatmullRomCurve3(v3Points, false, 'catmullrom', 0.4);
  const tubularSegments = 40;
  const radialSegments = 12;

  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];

  const frames = curve.computeFrenetFrames(tubularSegments, false);

  for (let i = 0; i <= tubularSegments; i++) {
    const u = i / tubularSegments;
    const center = curve.getPointAt(u);
    const N = frames.normals[i];
    const B = frames.binormals[i];

    // Smooth anatomical tapering + natural micro-undulation of living vessel wall
    const rBase = startRadius * (1 - u) + endRadius * u;
    const microWave = Math.sin(u * 14.0) * 0.0012;
    const r = Math.max(0.004, rBase + microWave);

    for (let j = 0; j <= radialSegments; j++) {
      const theta = (j / radialSegments) * Math.PI * 2;
      const cosT = Math.cos(theta);
      const sinT = Math.sin(theta);

      const normalX = cosT * N.x + sinT * B.x;
      const normalY = cosT * N.y + sinT * B.y;
      const normalZ = cosT * N.z + sinT * B.z;

      positions.push(
        center.x + r * normalX,
        center.y + r * normalY,
        center.z + r * normalZ
      );
      normals.push(normalX, normalY, normalZ);
    }
  }

  for (let i = 0; i < tubularSegments; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * (radialSegments + 1) + j;
      const b = (i + 1) * (radialSegments + 1) + j;
      const c = (i + 1) * (radialSegments + 1) + (j + 1);
      const d = i * (radialSegments + 1) + (j + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geom.setIndex(indices);
  geom.computeBoundingSphere();
  return geom;
}

const ARTERIAL_TREE: VesselSegment[] = [
  // 1. CARÓTIDAS INTERNAS (ICA) - Troncos proximales gruesos
  {
    id: 'ICA_LEFT',
    name: 'Arteria Carótida Interna Izquierda (Segmentos C4-C7)',
    territoryKey: 'MCA_SUPERIOR',
    points: [
      [-0.38, -1.35, -0.05],
      [-0.36, -0.85, 0.12],
      [-0.35, -0.35, 0.22],
      [-0.35, -0.18, 0.28]
    ],
    startRadius: 0.038,
    endRadius: 0.030,
    baseColor: '#b91c1c'
  },
  {
    id: 'ICA_RIGHT',
    name: 'Arteria Carótida Interna Derecha (Segmentos C4-C7)',
    territoryKey: 'MCA_SUPERIOR',
    points: [
      [0.38, -1.35, -0.05],
      [0.36, -0.85, 0.12],
      [0.35, -0.35, 0.22],
      [0.35, -0.18, 0.28]
    ],
    startRadius: 0.038,
    endRadius: 0.030,
    baseColor: '#b91c1c'
  },

  // 2. SISTEMA VERTEBROBASILAR
  {
    id: 'VA_LEFT',
    name: 'Arteria Vertebral Izquierda (Segmento V4 Intracraneal)',
    territoryKey: 'BASILAR_PICA',
    points: [
      [-0.22, -1.85, -0.82],
      [-0.14, -1.62, -0.76],
      [-0.04, -1.45, -0.72]
    ],
    startRadius: 0.032,
    endRadius: 0.028,
    baseColor: '#991b1b'
  },
  {
    id: 'VA_RIGHT',
    name: 'Arteria Vertebral Derecha (Segmento V4 Intracraneal)',
    territoryKey: 'BASILAR_PICA',
    points: [
      [0.22, -1.85, -0.82],
      [0.14, -1.62, -0.76],
      [0.04, -1.45, -0.72]
    ],
    startRadius: 0.032,
    endRadius: 0.028,
    baseColor: '#991b1b'
  },
  {
    id: 'BASILAR',
    name: 'Arteria Basilar (Tronco Pontino Principal)',
    territoryKey: 'BASILAR_PICA',
    points: [
      [0.0, -1.45, -0.72],
      [0.0, -1.15, -0.66],
      [0.0, -0.82, -0.58],
      [0.0, -0.65, -0.52]
    ],
    startRadius: 0.038,
    endRadius: 0.032,
    baseColor: '#b91c1c'
  },
  {
    id: 'PICA_LEFT',
    name: 'Arteria Cerebelosa Posteroinferior (PICA Izquierda)',
    territoryKey: 'BASILAR_PICA',
    points: [
      [-0.14, -1.68, -0.78],
      [-0.35, -1.62, -0.95],
      [-0.55, -1.52, -1.25],
      [-0.72, -1.35, -1.65]
    ],
    startRadius: 0.024,
    endRadius: 0.012,
    baseColor: '#dc2626'
  },

  // 3. ARTERIAS CEREBRALES ANTERIORES (ACA) & POLÍGONO
  {
    id: 'ACA_A1_LEFT',
    name: 'ACA Izquierda (Segmento A1 Pre-comunicante)',
    territoryKey: 'ACA_A2_A3',
    points: [
      [-0.35, -0.18, 0.28],
      [-0.18, -0.05, 0.42],
      [-0.04, 0.08, 0.52]
    ],
    startRadius: 0.028,
    endRadius: 0.022,
    baseColor: '#dc2626'
  },
  {
    id: 'ACA_A1_RIGHT',
    name: 'ACA Derecha (Segmento A1 Pre-comunicante)',
    territoryKey: 'ACA_A2_A3',
    points: [
      [0.35, -0.18, 0.28],
      [0.18, -0.05, 0.42],
      [0.04, 0.08, 0.52]
    ],
    startRadius: 0.028,
    endRadius: 0.022,
    baseColor: '#dc2626'
  },
  {
    id: 'ACOA',
    name: 'Arteria Comunicante Anterior (ACoA)',
    territoryKey: 'ACA_A2_A3',
    points: [
      [-0.04, 0.08, 0.52],
      [0.04, 0.08, 0.52]
    ],
    startRadius: 0.020,
    endRadius: 0.020,
    baseColor: '#dc2626'
  },
  {
    id: 'ACA_A2_PERICALLOSAL',
    name: 'Arteria Pericallosa y Callosomarginal (ACA A2-A4)',
    territoryKey: 'ACA_A2_A3',
    points: [
      [0.0, 0.08, 0.52],
      [-0.05, 0.45, 0.85],
      [-0.08, 0.82, 0.45],
      [-0.12, 0.75, -0.35],
      [-0.15, 0.52, -1.05]
    ],
    startRadius: 0.025,
    endRadius: 0.012,
    baseColor: '#ef4444'
  },

  // 4. ARTERIAS CEREBRALES MEDIAS (ACM M1, M2 Sup, M2 Inf, Lenticuloestriadas)
  {
    id: 'MCA_M1_LEFT',
    name: 'Arteria Cerebral Media Izquierda (Tronco M1 Esfenoidal)',
    territoryKey: 'MCA_SUPERIOR',
    points: [
      [-0.35, -0.18, 0.28],
      [-0.65, -0.22, 0.38],
      [-0.95, -0.26, 0.48],
      [-1.15, -0.30, 0.58]
    ],
    startRadius: 0.038,
    endRadius: 0.028,
    baseColor: '#b91c1c'
  },
  {
    id: 'MCA_LENTICULOSTRIATE_LEFT',
    name: 'Arterias Lenticuloestriadas Anterolaterales (Perforantes M1)',
    territoryKey: 'MCA_LENTICULOSTRIATE',
    points: [
      [-0.65, -0.22, 0.38],
      [-0.68, 0.02, 0.45],
      [-0.72, 0.18, 0.55],
      [-0.75, 0.32, 0.65]
    ],
    startRadius: 0.016,
    endRadius: 0.007,
    baseColor: '#e11d48'
  },
  {
    id: 'MCA_M2_SUPERIOR_LEFT',
    name: 'División Superior de la ACM Izquierda (Frontorrolándica M2/M4)',
    territoryKey: 'MCA_SUPERIOR',
    points: [
      [-1.15, -0.30, 0.58],
      [-1.38, -0.15, 0.85],
      [-1.65, 0.08, 1.12],
      [-1.846, -0.123, 1.279] // Candelabro hacia Broca (44)
    ],
    startRadius: 0.028,
    endRadius: 0.010,
    baseColor: '#dc2626'
  },
  {
    id: 'MCA_M2_INFERIOR_LEFT',
    name: 'División Inferior de la ACM Izquierda (Temporoparietal M2/M4)',
    territoryKey: 'MCA_INFERIOR',
    points: [
      [-1.15, -0.30, 0.58],
      [-1.42, -0.22, 0.15],
      [-1.68, -0.12, -0.35],
      [-1.976, 0.064, -0.718] // Hacia Wernicke (PSL)
    ],
    startRadius: 0.028,
    endRadius: 0.010,
    baseColor: '#dc2626'
  },
  {
    id: 'MCA_M1_RIGHT',
    name: 'Arteria Cerebral Media Derecha (Tronco M1)',
    territoryKey: 'MCA_SUPERIOR',
    points: [
      [0.35, -0.18, 0.28],
      [0.65, -0.22, 0.38],
      [0.95, -0.26, 0.48],
      [1.15, -0.30, 0.58]
    ],
    startRadius: 0.038,
    endRadius: 0.028,
    baseColor: '#b91c1c'
  },
  {
    id: 'MCA_M2_RIGHT',
    name: 'Ramas Corticales ACM Derechas (M2/M4)',
    territoryKey: 'MCA_SUPERIOR',
    points: [
      [1.15, -0.30, 0.58],
      [1.42, -0.12, 0.85],
      [1.792, -0.135, 1.261]
    ],
    startRadius: 0.028,
    endRadius: 0.010,
    baseColor: '#dc2626'
  },

  // 5. COMUNICANTES POSTERIORES (PCoA) & ARTERIAS CEREBRALES POSTERIORES (PCA)
  {
    id: 'PCOA_LEFT',
    name: 'Arteria Comunicante Posterior Izquierda (PCoA)',
    territoryKey: 'PCA_P1_P2',
    points: [
      [-0.35, -0.18, 0.28],
      [-0.32, -0.35, 0.05],
      [-0.28, -0.52, -0.25],
      [-0.22, -0.65, -0.52]
    ],
    startRadius: 0.020,
    endRadius: 0.016,
    baseColor: '#dc2626'
  },
  {
    id: 'PCOA_RIGHT',
    name: 'Arteria Comunicante Posterior Derecha (PCoA)',
    territoryKey: 'PCA_P1_P2',
    points: [
      [0.35, -0.18, 0.28],
      [0.32, -0.35, 0.05],
      [0.28, -0.52, -0.25],
      [0.22, -0.65, -0.52]
    ],
    startRadius: 0.020,
    endRadius: 0.016,
    baseColor: '#dc2626'
  },
  {
    id: 'PCA_P1_P3_LEFT',
    name: 'Arteria Cerebral Posterior Izquierda & Calcarina (P1-P3)',
    territoryKey: 'PCA_P3',
    points: [
      [0.0, -0.65, -0.52],
      [-0.25, -0.62, -0.65],
      [-0.55, -0.55, -1.15],
      [-0.62, -0.48, -1.85],
      [-0.379, -0.458, -2.491] // Hacia V1 Cisura Calcarina
    ],
    startRadius: 0.028,
    endRadius: 0.011,
    baseColor: '#b91c1c'
  },
  {
    id: 'PCA_P1_P3_RIGHT',
    name: 'Arteria Cerebral Posterior Derecha & Calcarina (P1-P3)',
    territoryKey: 'PCA_P3',
    points: [
      [0.0, -0.65, -0.52],
      [0.25, -0.62, -0.65],
      [0.55, -0.55, -1.15],
      [0.62, -0.48, -1.85],
      [0.369, -0.409, -2.468] // Hacia R V1
    ],
    startRadius: 0.028,
    endRadius: 0.011,
    baseColor: '#b91c1c'
  }
];

interface DissectableArteryMeshProps {
  vessel: any;
  isCulprit: boolean | string | null;
  ischemiaSeverity: number;
}

const DissectableArteryMesh: React.FC<DissectableArteryMeshProps> = ({
  vessel,
  isCulprit,
  ischemiaSeverity,
}) => {
  const { isVisible, isTransparent, isHovered, handleClick, handlePointerOver, handlePointerOut } = useDissectable(vessel.id, vessel.name);
  if (!isVisible) return null;

  const vesselColor = isHovered
    ? hoverTintColor(vessel.baseColor, 0.6)
    : isCulprit
    ? new THREE.Color('#450a0a').lerp(new THREE.Color('#881337'), (ischemiaSeverity / 100) * 0.8)
    : new THREE.Color(vessel.baseColor);

  const emissiveColor = isHovered
    ? new THREE.Color(HOVER_EMISSIVE)
    : isCulprit
    ? new THREE.Color('#ff0033')
    : new THREE.Color('#450a0a');

  const opacity = isTransparent ? 0.20 : (isCulprit ? 0.98 : 0.92);

  return (
    <mesh
      geometry={vessel.geom}
      onClick={(e) => {
        if (handleClick(e)) return;
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <meshPhysicalMaterial
        color={vesselColor}
        emissive={emissiveColor}
        emissiveIntensity={isHovered ? HOVER_EMISSIVE_INTENSITY : (isCulprit ? 2.4 : 0.35)}
        roughness={0.18}
        metalness={0.15}
        clearcoat={0.95}
        clearcoatRoughness={0.12}
        transparent={true}
        opacity={opacity}
      />
    </mesh>
  );
};

export const CerebralVasculature: React.FC = () => {
  const showVasculature = useNeuroStore((state) => state.showVasculature);
  const activeStrokeId = useNeuroStore((state) => state.activeStrokeId);
  const ischemiaSeverity = useNeuroStore((state) => state.ischemiaSeverity);

  const clotRef = useRef<THREE.Mesh>(null);
  const arterialGroupRef = useRef<THREE.Group>(null);

  // Build organic tapered geometries for each vessel segment
  const vesselTubes = useMemo(() => {
    return ARTERIAL_TREE.map((vessel) => {
      const geom = createTaperedOrganicVesselGeometry(
        vessel.points,
        vessel.startRadius,
        vessel.endRadius
      );
      return {
        ...vessel,
        geom
      };
    });
  }, []);

  // Determine culprit clot location if acute stroke is active
  const clotInfo = useMemo(() => {
    if (!activeStrokeId) return null;
    if (activeStrokeId === 'STROKE_MCA_SUPERIOR') {
      return {
        position: [-1.15, -0.30, 0.58],
        label: 'Trombo Oclusivo: Bifurcación ACM M1/M2 Superior',
        color: '#f43f5e'
      };
    }
    if (activeStrokeId === 'STROKE_MCA_INFERIOR') {
      return {
        position: [-1.22, -0.28, 0.42],
        label: 'Trombo Oclusivo: ACM División Inferior',
        color: '#f43f5e'
      };
    }
    if (activeStrokeId === 'STROKE_LENTICULOSTRIATE') {
      return {
        position: [-0.65, -0.22, 0.38],
        label: 'Microateroma Oclusivo: Arteria Lenticuloestriada',
        color: '#e11d48'
      };
    }
    if (activeStrokeId === 'STROKE_ACA') {
      return {
        position: [0.0, 0.08, 0.52],
        label: 'Oclusión Embolígena: Tronco ACA A2',
        color: '#f43f5e'
      };
    }
    if (activeStrokeId === 'STROKE_PCA_CALCARINE') {
      return {
        position: [-0.35, -0.58, -0.95],
        label: 'Embolia Cardiogénica: ACP P2/P3 Calcarina',
        color: '#f43f5e'
      };
    }
    if (activeStrokeId === 'STROKE_WALLENBERG') {
      return {
        position: [-0.14, -1.68, -0.78],
        label: 'Oclusión Trombótica: Origen de la PICA Izquierda',
        color: '#dc2626'
      };
    }
    return null;
  }, [activeStrokeId]);

  // Subtle systolic arterial pulse animation (72 bpm physiological hemodynamic cycle)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (clotRef.current && clotInfo) {
      const s = 1.0 + Math.sin(t * 6.0) * 0.25;
      clotRef.current.scale.set(s, s, s);
    }

    if (arterialGroupRef.current) {
      // Subtle organic radial pulse (+1.8%)
      const pulse = 1.0 + Math.sin(t * 4.8) * 0.018;
      arterialGroupRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  if (!showVasculature) return null;

  return (
    <group ref={arterialGroupRef} name="cerebral-vasculature-circle-of-willis">
      {vesselTubes.map((vessel) => {
        const isCulprit = activeStrokeId && (
          (activeStrokeId === 'STROKE_MCA_SUPERIOR' && vessel.id.includes('MCA_M2_SUPERIOR')) ||
          (activeStrokeId === 'STROKE_MCA_INFERIOR' && vessel.id.includes('MCA_M2_INFERIOR')) ||
          (activeStrokeId === 'STROKE_LENTICULOSTRIATE' && vessel.id.includes('LENTICULOSTRIATE')) ||
          (activeStrokeId === 'STROKE_ACA' && vessel.id.includes('ACA_A2')) ||
          (activeStrokeId === 'STROKE_PCA_CALCARINE' && vessel.id.includes('PCA_P1_P3_LEFT')) ||
          (activeStrokeId === 'STROKE_WALLENBERG' && vessel.id.includes('PICA_LEFT'))
        );

        return (
          <DissectableArteryMesh
            key={vessel.id}
            vessel={vessel}
            isCulprit={isCulprit}
            ischemiaSeverity={ischemiaSeverity}
          />
        );
      })}

      {/* Occlusion Thrombus Clot Marker */}
      {clotInfo && (
        <group position={clotInfo.position as [number, number, number]}>
          <mesh ref={clotRef}>
            <sphereGeometry args={[0.055, 16, 16]} />
            <meshStandardMaterial
              color="#ff0055"
              emissive="#ff0033"
              emissiveIntensity={2.8}
              roughness={0.15}
            />
          </mesh>
          <mesh>
            <ringGeometry args={[0.07, 0.10, 24]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.8} />
          </mesh>
        </group>
      )}
    </group>
  );
};
