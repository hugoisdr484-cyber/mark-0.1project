import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useNeuroStore } from '../../store/useNeuroStore';
import { useDissectable } from '../../hooks/useDissectable';
import { HOVER_EMISSIVE, HOVER_EMISSIVE_INTENSITY } from '../../utils/hoverTint';

export interface ArterialSegmentDef {
  id: string;
  name: string;
  territoryKey: string;
  points: [number, number, number][];
  startRadius: number;
  endRadius: number;
  color?: string;
}

/**
 * Generador anatómico de geometrías tubulares para vasos arteriales con conicidad suave.
 */
function createTaperedVesselGeometry(
  points: [number, number, number][],
  startRadius: number,
  endRadius: number
): THREE.BufferGeometry {
  const v3Points = points.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
  const curve = new THREE.CatmullRomCurve3(v3Points, false, 'catmullrom', 0.35);
  const tubularSegments = Math.max(16, points.length * 10);
  const radialSegments = 10;

  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];
  const frames = curve.computeFrenetFrames(tubularSegments, false);

  for (let i = 0; i <= tubularSegments; i++) {
    const u = i / tubularSegments;
    const center = curve.getPointAt(u);
    const N = frames.normals[i];
    const B = frames.binormals[i];

    // Conicidad fisiológica
    const r = Math.max(0.006, startRadius * (1 - u) + endRadius * u);

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

export const ARTERIAL_SEGMENTS: ArterialSegmentDef[] = [
  // ==========================================
  // 1. SISTEMA ANTERIOR / CAROTÍDEO (ACI)
  // ==========================================
  {
    id: 'ICA_L',
    name: 'Arteria Carótida Interna Izquierda (Segmento Supraclinoideo C4-C7)',
    territoryKey: 'ICA',
    points: [
      [-0.38, -1.35, -0.05],
      [-0.36, -0.85, 0.12],
      [-0.35, -0.35, 0.22],
      [-0.34, -0.16, 0.28],
    ],
    startRadius: 0.040,
    endRadius: 0.032,
  },
  {
    id: 'ICA_R',
    name: 'Arteria Carótida Interna Derecha (Segmento Supraclinoideo C4-C7)',
    territoryKey: 'ICA',
    points: [
      [0.38, -1.35, -0.05],
      [0.36, -0.85, 0.12],
      [0.35, -0.35, 0.22],
      [0.34, -0.16, 0.28],
    ],
    startRadius: 0.040,
    endRadius: 0.032,
  },

  // ---------------- Arteria Cerebral Anterior (ACA) ----------------
  {
    id: 'ACA_A1_L',
    name: 'Arteria Cerebral Anterior Izquierda (Segmento A1 Precomunicante)',
    territoryKey: 'ACA',
    points: [
      [-0.34, -0.16, 0.28],
      [-0.18, -0.05, 0.42],
      [-0.04, 0.08, 0.52],
    ],
    startRadius: 0.026,
    endRadius: 0.022,
  },
  {
    id: 'ACA_A1_R',
    name: 'Arteria Cerebral Anterior Derecha (Segmento A1 Precomunicante)',
    territoryKey: 'ACA',
    points: [
      [0.34, -0.16, 0.28],
      [0.18, -0.05, 0.42],
      [0.04, 0.08, 0.52],
    ],
    startRadius: 0.026,
    endRadius: 0.022,
  },
  {
    id: 'ACOA',
    name: 'Arteria Comunicante Anterior (ACoA)',
    territoryKey: 'ACOA',
    points: [
      [-0.04, 0.08, 0.52],
      [0.0, 0.09, 0.53],
      [0.04, 0.08, 0.52],
    ],
    startRadius: 0.020,
    endRadius: 0.020,
  },
  {
    id: 'ACA_PERICALLOSAL_L',
    name: 'ACA Izquierda: Arteria Pericallosa y Callosomarginal (A2–A4)',
    territoryKey: 'ACA',
    points: [
      [-0.03, 0.08, 0.52],
      [-0.05, 0.45, 0.86],
      [-0.08, 0.85, 0.46],
      [-0.10, 0.78, -0.32],
      [-0.14, 0.54, -1.02],
    ],
    startRadius: 0.024,
    endRadius: 0.013,
  },
  {
    id: 'ACA_PERICALLOSAL_R',
    name: 'ACA Derecha: Arteria Pericallosa y Callosomarginal (A2–A4)',
    territoryKey: 'ACA',
    points: [
      [0.03, 0.08, 0.52],
      [0.05, 0.45, 0.86],
      [0.08, 0.85, 0.46],
      [0.10, 0.78, -0.32],
      [0.14, 0.54, -1.02],
    ],
    startRadius: 0.024,
    endRadius: 0.013,
  },

  // ---------------- Arteria Cerebral Media (ACM) ----------------
  {
    id: 'MCA_M1_L',
    name: 'Arteria Cerebral Media Izquierda (Tronco M1 Esfenoidal)',
    territoryKey: 'MCA',
    points: [
      [-0.34, -0.16, 0.28],
      [-0.65, -0.22, 0.38],
      [-0.95, -0.26, 0.48],
      [-1.15, -0.30, 0.58],
    ],
    startRadius: 0.036,
    endRadius: 0.028,
  },
  {
    id: 'MCA_M1_R',
    name: 'Arteria Cerebral Media Derecha (Tronco M1 Esfenoidal)',
    territoryKey: 'MCA',
    points: [
      [0.34, -0.16, 0.28],
      [0.65, -0.22, 0.38],
      [0.95, -0.26, 0.48],
      [1.15, -0.30, 0.58],
    ],
    startRadius: 0.036,
    endRadius: 0.028,
  },
  {
    id: 'MCA_M2_SUPERIOR_L',
    name: 'ACM Izquierda: División M2 Insular Superior',
    territoryKey: 'MCA',
    points: [
      [-1.15, -0.30, 0.58],
      [-1.42, 0.05, 0.62],
      [-1.68, 0.38, 0.48],
      [-1.85, 0.65, 0.35],
    ],
    startRadius: 0.024,
    endRadius: 0.016,
  },
  {
    id: 'MCA_M2_SUPERIOR_R',
    name: 'ACM Derecha: División M2 Insular Superior',
    territoryKey: 'MCA',
    points: [
      [1.15, -0.30, 0.58],
      [1.42, 0.05, 0.62],
      [1.68, 0.38, 0.48],
      [1.85, 0.65, 0.35],
    ],
    startRadius: 0.024,
    endRadius: 0.016,
  },
  {
    id: 'MCA_M2_INFERIOR_L',
    name: 'ACM Izquierda: División M2 Insular Inferior',
    territoryKey: 'MCA',
    points: [
      [-1.15, -0.30, 0.58],
      [-1.38, -0.48, 0.52],
      [-1.65, -0.55, 0.22],
      [-1.88, -0.58, -0.18],
    ],
    startRadius: 0.024,
    endRadius: 0.016,
  },
  {
    id: 'MCA_M2_INFERIOR_R',
    name: 'ACM Derecha: División M2 Insular Inferior',
    territoryKey: 'MCA',
    points: [
      [1.15, -0.30, 0.58],
      [1.38, -0.48, 0.52],
      [1.65, -0.55, 0.22],
      [1.88, -0.58, -0.18],
    ],
    startRadius: 0.024,
    endRadius: 0.016,
  },
  {
    id: 'MCA_M4_CORTICAL_L',
    name: 'ACM Izquierda: Ramas M3/M4 Corticales (Frontal, Precentral, Broca, Parietal)',
    territoryKey: 'MCA',
    points: [
      [-1.68, 0.38, 0.48],
      [-1.92, 0.62, 0.65],
      [-2.10, 0.85, 0.52],
      [-2.15, 1.15, 0.35],
    ],
    startRadius: 0.016,
    endRadius: 0.009,
  },
  {
    id: 'MCA_M4_CORTICAL_R',
    name: 'ACM Derecha: Ramas M3/M4 Corticales (Frontal, Precentral, Parietal)',
    territoryKey: 'MCA',
    points: [
      [1.68, 0.38, 0.48],
      [1.92, 0.62, 0.65],
      [2.10, 0.85, 0.52],
      [2.15, 1.15, 0.35],
    ],
    startRadius: 0.016,
    endRadius: 0.009,
  },
  {
    id: 'Lenticulostriate_L',
    name: 'Arterias Lenticuloestriadas Anterolaterales Izquierdas (Perforantes M1)',
    territoryKey: 'Lenticulostriate',
    points: [
      [-0.65, -0.22, 0.38],
      [-0.68, 0.02, 0.45],
      [-0.72, 0.18, 0.55],
      [-0.75, 0.35, 0.62],
    ],
    startRadius: 0.016,
    endRadius: 0.008,
  },
  {
    id: 'Lenticulostriate_R',
    name: 'Arterias Lenticuloestriadas Anterolaterales Derechas (Perforantes M1)',
    territoryKey: 'Lenticulostriate',
    points: [
      [0.65, -0.22, 0.38],
      [0.68, 0.02, 0.45],
      [0.72, 0.18, 0.55],
      [0.75, 0.35, 0.62],
    ],
    startRadius: 0.016,
    endRadius: 0.008,
  },

  // ---------------- Arterias Comunicantes Posteriores (PCoA) ----------------
  {
    id: 'PCOMA_L',
    name: 'Arteria Comunicante Posterior Izquierda (PCoA)',
    territoryKey: 'PCOMA',
    points: [
      [-0.34, -0.16, 0.28],
      [-0.30, -0.38, 0.08],
      [-0.24, -0.58, -0.15],
    ],
    startRadius: 0.020,
    endRadius: 0.018,
  },
  {
    id: 'PCOMA_R',
    name: 'Arteria Comunicante Posterior Derecha (PCoA)',
    territoryKey: 'PCOMA',
    points: [
      [0.34, -0.16, 0.28],
      [0.30, -0.38, 0.08],
      [0.24, -0.58, -0.15],
    ],
    startRadius: 0.020,
    endRadius: 0.018,
  },

  // ==========================================
  // 2. SISTEMA POSTERIOR / VERTEBROBASILAR
  // ==========================================
  {
    id: 'VA_L',
    name: 'Arteria Vertebral Izquierda (Segmento V4 Intracraneal)',
    territoryKey: 'VA',
    points: [
      [-0.24, -1.95, -0.85],
      [-0.16, -1.68, -0.78],
      [-0.04, -1.45, -0.72],
    ],
    startRadius: 0.034,
    endRadius: 0.028,
  },
  {
    id: 'VA_R',
    name: 'Arteria Vertebral Derecha (Segmento V4 Intracraneal)',
    territoryKey: 'VA',
    points: [
      [0.24, -1.95, -0.85],
      [0.16, -1.68, -0.78],
      [0.04, -1.45, -0.72],
    ],
    startRadius: 0.034,
    endRadius: 0.028,
  },
  {
    id: 'SPINAL_ANT',
    name: 'Arteria Espinal Anterior (Convergencia bulbar ventral)',
    territoryKey: 'Medulla',
    points: [
      [0.0, -1.55, -0.72],
      [0.0, -1.82, -0.75],
      [0.0, -2.15, -0.78],
    ],
    startRadius: 0.016,
    endRadius: 0.012,
  },
  {
    id: 'PICA_L',
    name: 'Arteria Cerebelosa Posteroinferior Izquierda (PICA)',
    territoryKey: 'PICA',
    points: [
      [-0.16, -1.68, -0.78],
      [-0.38, -1.62, -0.96],
      [-0.58, -1.52, -1.28],
      [-0.75, -1.35, -1.68],
    ],
    startRadius: 0.024,
    endRadius: 0.013,
  },
  {
    id: 'PICA_R',
    name: 'Arteria Cerebelosa Posteroinferior Derecha (PICA)',
    territoryKey: 'PICA',
    points: [
      [0.16, -1.68, -0.78],
      [0.38, -1.62, -0.96],
      [0.58, -1.52, -1.28],
      [0.75, -1.35, -1.68],
    ],
    startRadius: 0.024,
    endRadius: 0.013,
  },
  {
    id: 'BASILAR',
    name: 'Arteria Basilar (Tronco Pontino Ventral en Surco Basilar)',
    territoryKey: 'BASILAR',
    points: [
      [0.0, -1.45, -0.72],
      [0.0, -1.18, -0.66],
      [0.0, -0.85, -0.58],
      [0.0, -0.62, -0.50],
    ],
    startRadius: 0.040,
    endRadius: 0.034,
  },
  {
    id: 'AICA_L',
    name: 'Arteria Cerebelosa Anteroinferior Izquierda (AICA)',
    territoryKey: 'AICA',
    points: [
      [0.0, -1.25, -0.68],
      [-0.24, -1.28, -0.76],
      [-0.46, -1.32, -0.92],
      [-0.65, -1.36, -1.15],
    ],
    startRadius: 0.020,
    endRadius: 0.012,
  },
  {
    id: 'AICA_R',
    name: 'Arteria Cerebelosa Anteroinferior Derecha (AICA)',
    territoryKey: 'AICA',
    points: [
      [0.0, -1.25, -0.68],
      [0.24, -1.28, -0.76],
      [0.46, -1.32, -0.92],
      [0.65, -1.36, -1.15],
    ],
    startRadius: 0.020,
    endRadius: 0.012,
  },
  {
    id: 'SCA_L',
    name: 'Arteria Cerebelosa Superior Izquierda (SCA)',
    territoryKey: 'SCA',
    points: [
      [0.0, -0.68, -0.52],
      [-0.28, -0.72, -0.62],
      [-0.56, -0.78, -0.85],
      [-0.78, -0.82, -1.18],
    ],
    startRadius: 0.024,
    endRadius: 0.014,
  },
  {
    id: 'SCA_R',
    name: 'Arteria Cerebelosa Superior Derecha (SCA)',
    territoryKey: 'SCA',
    points: [
      [0.0, -0.68, -0.52],
      [0.28, -0.72, -0.62],
      [0.56, -0.78, -0.85],
      [0.78, -0.82, -1.18],
    ],
    startRadius: 0.024,
    endRadius: 0.014,
  },

  // ---------------- Arterias Cerebrales Posteriores (ACP) ----------------
  {
    id: 'PCA_P1_P2_L',
    name: 'Arteria Cerebral Posterior Izquierda (Segmentos P1–P2 Mesencefálicos)',
    territoryKey: 'PCA',
    points: [
      [0.0, -0.62, -0.50],
      [-0.24, -0.58, -0.15],
      [-0.52, -0.52, 0.05],
      [-0.85, -0.45, -0.15],
      [-1.15, -0.42, -0.48],
    ],
    startRadius: 0.030,
    endRadius: 0.020,
  },
  {
    id: 'PCA_P1_P2_R',
    name: 'Arteria Cerebral Posterior Derecha (Segmentos P1–P2 Mesencefálicos)',
    territoryKey: 'PCA',
    points: [
      [0.0, -0.62, -0.50],
      [0.24, -0.58, -0.15],
      [0.52, -0.52, 0.05],
      [0.85, -0.45, -0.15],
      [1.15, -0.42, -0.48],
    ],
    startRadius: 0.030,
    endRadius: 0.020,
  },
  {
    id: 'PCA_CALCARINE_L',
    name: 'ACP Izquierda: Rama Calcarina y Parietooccipital (P3–P4 Corteza Visual V1)',
    territoryKey: 'PCA',
    points: [
      [-1.15, -0.42, -0.48],
      [-0.95, -0.32, -0.92],
      [-0.65, -0.22, -1.35],
      [-0.35, -0.12, -1.68],
    ],
    startRadius: 0.020,
    endRadius: 0.010,
  },
  {
    id: 'PCA_CALCARINE_R',
    name: 'ACP Derecha: Rama Calcarina y Parietooccipital (P3–P4 Corteza Visual V1)',
    territoryKey: 'PCA',
    points: [
      [1.15, -0.42, -0.48],
      [0.95, -0.32, -0.92],
      [0.65, -0.22, -1.35],
      [0.35, -0.12, -1.68],
    ],
    startRadius: 0.020,
    endRadius: 0.010,
  },
];

interface DissectableVesselMeshProps {
  segment: ArterialSegmentDef;
  geometry: THREE.BufferGeometry;
}

const DissectableVesselMesh: React.FC<DissectableVesselMeshProps> = ({ segment, geometry }) => {
  const { isVisible, isTransparent, isHovered, handleClick, handlePointerOver, handlePointerOut } =
    useDissectable(segment.id, segment.name);
  const setSelectedStructureId = useNeuroStore((state) => state.setSelectedStructureId);

  if (!isVisible) return null;

  const baseColor = segment.color || '#c62828';
  const emissiveColor = isHovered ? HOVER_EMISSIVE : '#2a0505';
  const emissiveIntensity = isHovered ? HOVER_EMISSIVE_INTENSITY : 0.22;
  const opacity = isTransparent ? 0.22 : 1.0;

  return (
    <mesh
      geometry={geometry}
      userData={{
        dissectable: true,
        pieceId: segment.id,
        pieceName: segment.name,
      }}
      onClick={(e) => {
        if (handleClick(e)) return;
        e.stopPropagation();
        setSelectedStructureId(segment.territoryKey);
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <meshStandardMaterial
        color={isHovered ? '#00e5ff' : baseColor}
        roughness={0.35}
        metalness={0.10}
        emissive={emissiveColor}
        emissiveIntensity={emissiveIntensity}
        transparent={isTransparent}
        opacity={opacity}
      />
    </mesh>
  );
};

export const ArterialCircle3D: React.FC = () => {
  const showVasculature = useNeuroStore((state) => state.showVasculature);
  const visibleStructures = useNeuroStore((state) => state.visibleStructures);

  // Precompute tubular geometries once
  const geometries = useMemo(() => {
    return ARTERIAL_SEGMENTS.map((s) => ({
      segment: s,
      geom: createTaperedVesselGeometry(s.points, s.startRadius, s.endRadius),
    }));
  }, []);

  const isLayerVisible = showVasculature || visibleStructures.vasculature;
  if (!isLayerVisible) return null;

  return (
    <group name="arterial-circle-willis-3d">
      {geometries.map(({ segment, geom }) => (
        <DissectableVesselMesh key={segment.id} segment={segment} geometry={geom} />
      ))}
    </group>
  );
};

export default ArterialCircle3D;
