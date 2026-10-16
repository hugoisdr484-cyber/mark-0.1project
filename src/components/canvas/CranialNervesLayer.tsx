import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useNeuroStore } from '../../store/useNeuroStore';
import { useDissectable } from '../../hooks/useDissectable';
import { HOVER_EMISSIVE, HOVER_EMISSIVE_INTENSITY } from '../../utils/hoverTint';

export interface CranialNerveItemDef {
  id: string;
  romanNumeral: string;
  name: string;
  latinName: string;
  originName: string;
  leftPoints: [number, number, number][];
  rightPoints: [number, number, number][];
  radius: number;
  labelOffset: [number, number, number];
  ganglionPoints?: [number, number, number][];
  rootletsLeft?: [number, number, number][][];
  rootletsRight?: [number, number, number][][];
}

export const CRANIAL_NERVES_12: CranialNerveItemDef[] = [
  // ========================================================
  // I. NERVIO OLFATORIO (Bulbos y Cintillas en Surco Olfatorio Frontal)
  // ========================================================
  {
    id: 'cn1',
    romanNumeral: 'I',
    name: 'Nervio Olfatorio',
    latinName: 'Nervus olfactorius',
    originName: 'Cara basal frontal (Surco olfatorio)',
    leftPoints: [
      [-0.16, 0.45, -0.18],
      [-0.16, 0.85, -0.22],
      [-0.16, 1.25, -0.22],
      [-0.16, 1.55, -0.19], // Bulbo olfatorio anterior
    ],
    rightPoints: [
      [0.16, 0.45, -0.18],
      [0.16, 0.85, -0.22],
      [0.16, 1.25, -0.22],
      [0.16, 1.55, -0.19],
    ],
    radius: 0.018,
    labelOffset: [-0.22, 1.35, -0.15],
  },

  // ========================================================
  // II. NERVIO ÓPTICO (Nervios, Quiasma y Tractos Ópticos)
  // ========================================================
  {
    id: 'cn2',
    romanNumeral: 'II',
    name: 'Nervio Óptico',
    latinName: 'Nervus opticus',
    originName: 'Quiasma óptico y diencéfalo anterior',
    leftPoints: [
      [-0.32, 0.42, 0.08], // Canal óptico
      [-0.18, 0.22, 0.14],
      [-0.04, 0.02, 0.18], // Quiasma óptico
      [-0.18, -0.22, 0.12], // Tracto óptico divergente
      [-0.42, -0.45, 0.05], // Hacia CGL
    ],
    rightPoints: [
      [0.32, 0.42, 0.08],
      [0.18, 0.22, 0.14],
      [0.04, 0.02, 0.18],
      [0.18, -0.22, 0.12],
      [0.42, -0.45, 0.05],
    ],
    radius: 0.034,
    labelOffset: [-0.38, 0.25, 0.15],
  },

  // ========================================================
  // III. NERVIO OCULOMOTOR (Fosa Interpeduncular del Mesencéfalo)
  // ========================================================
  {
    id: 'cn3',
    romanNumeral: 'III',
    name: 'Nervio Oculomotor',
    latinName: 'Nervus oculomotorius',
    originName: 'Fosa interpeduncular (Mesencéfalo ventral)',
    leftPoints: [
      [-0.08, -0.82, -0.45], // Origen fosa interpeduncular
      [-0.12, -0.65, -0.32],
      [-0.18, -0.42, -0.12],
      [-0.24, -0.18, 0.08],
    ],
    rightPoints: [
      [0.08, -0.82, -0.45],
      [0.12, -0.65, -0.32],
      [0.18, -0.42, -0.12],
      [0.24, -0.18, 0.08],
    ],
    radius: 0.020,
    labelOffset: [-0.22, -0.58, -0.22],
  },

  // ========================================================
  // IV. NERVIO TROCLEAR (Cara Posterior del Mesencéfalo)
  // ========================================================
  {
    id: 'cn4',
    romanNumeral: 'IV',
    name: 'Nervio Troclear (Patético)',
    latinName: 'Nervus trochlearis',
    originName: 'Cara dorsal del mesencéfalo (Bajo colículos)',
    leftPoints: [
      [-0.05, -0.92, -0.74], // Origen dorsal
      [-0.24, -0.96, -0.68], // Contornea pedúnculo
      [-0.34, -0.92, -0.52],
      [-0.36, -0.72, -0.35],
      [-0.32, -0.45, -0.15],
    ],
    rightPoints: [
      [0.05, -0.92, -0.74],
      [0.24, -0.96, -0.68],
      [0.34, -0.92, -0.52],
      [0.36, -0.72, -0.35],
      [0.32, -0.45, -0.15],
    ],
    radius: 0.012,
    labelOffset: [-0.42, -0.85, -0.48],
  },

  // ========================================================
  // V. NERVIO TRIGÉMINO (Cara Anterolateral del Puente & Ganglio de Gasser)
  // ========================================================
  {
    id: 'cn5',
    romanNumeral: 'V',
    name: 'Nervio Trigémino',
    latinName: 'Nervus trigeminus',
    originName: 'Cara anterolateral del puente (Raíz sensitiva y motora)',
    leftPoints: [
      [-0.38, -1.22, -0.46], // Origen aparente pontino
      [-0.48, -1.18, -0.38],
      [-0.56, -1.12, -0.28], // Cavum de Meckel (Ganglio de Gasser)
      [-0.66, -1.02, -0.18], // V1 / V2 / V3
    ],
    rightPoints: [
      [0.38, -1.22, -0.46],
      [0.48, -1.18, -0.38],
      [0.56, -1.12, -0.28],
      [0.66, -1.02, -0.18],
    ],
    radius: 0.034, // Tronco grueso
    labelOffset: [-0.64, -1.15, -0.28],
  },

  // ========================================================
  // VI. NERVIO ABDUCENS (Surco Bulbopontino sobre Pirámides)
  // ========================================================
  {
    id: 'cn6',
    romanNumeral: 'VI',
    name: 'Nervio Abducens (Motor Ocular Externo)',
    latinName: 'Nervus abducens',
    originName: 'Surco bulbopontino (Sobre pirámides)',
    leftPoints: [
      [-0.11, -1.45, -0.56], // Origen surco bulbopontino
      [-0.14, -1.25, -0.48],
      [-0.18, -1.05, -0.38],
      [-0.22, -0.82, -0.22],
    ],
    rightPoints: [
      [0.11, -1.45, -0.56],
      [0.14, -1.25, -0.48],
      [0.18, -1.05, -0.38],
      [0.22, -0.82, -0.22],
    ],
    radius: 0.016,
    labelOffset: [-0.22, -1.35, -0.48],
  },

  // ========================================================
  // VII. NERVIO FACIAL (Ángulo Pontocerebeloso Medial)
  // ========================================================
  {
    id: 'cn7',
    romanNumeral: 'VII',
    name: 'Nervio Facial',
    latinName: 'Nervus facialis',
    originName: 'Ángulo pontocerebeloso (Medial al VIII par)',
    leftPoints: [
      [-0.38, -1.48, -0.64], // Fosita supraolivar
      [-0.48, -1.42, -0.58],
      [-0.60, -1.34, -0.50], // Hacia conducto auditivo interno
    ],
    rightPoints: [
      [0.38, -1.48, -0.64],
      [0.48, -1.42, -0.58],
      [0.60, -1.34, -0.50],
    ],
    radius: 0.018,
    labelOffset: [-0.55, -1.48, -0.58],
  },

  // ========================================================
  // VIII. NERVIO VESTIBULOCOCLEAR (Ángulo Pontocerebeloso Lateral)
  // ========================================================
  {
    id: 'cn8',
    romanNumeral: 'VIII',
    name: 'Nervio Vestibulococlear (Auditivo)',
    latinName: 'Nervus vestibulocochlearis',
    originName: 'Ángulo pontocerebeloso (Lateral al VII par)',
    leftPoints: [
      [-0.46, -1.49, -0.66], // Ángulo pontocerebeloso lateral
      [-0.56, -1.44, -0.60],
      [-0.68, -1.36, -0.52], // Conducto auditivo interno
    ],
    rightPoints: [
      [0.46, -1.49, -0.66],
      [0.56, -1.44, -0.60],
      [0.68, -1.36, -0.52],
    ],
    radius: 0.026,
    labelOffset: [-0.68, -1.45, -0.62],
  },

  // ========================================================
  // IX. NERVIO GLOSOFARÍNGEO (Surco Retroolivar Superior)
  // ========================================================
  {
    id: 'cn9',
    romanNumeral: 'IX',
    name: 'Nervio Glosofaríngeo',
    latinName: 'Nervus glossopharyngeus',
    originName: 'Surco retroolivar (Bulbo raquídeo superior)',
    leftPoints: [
      [-0.28, -1.58, -0.66],
      [-0.38, -1.56, -0.60],
      [-0.52, -1.52, -0.52],
    ],
    rightPoints: [
      [0.28, -1.58, -0.66],
      [0.38, -1.56, -0.60],
      [0.52, -1.52, -0.52],
    ],
    radius: 0.016,
    labelOffset: [-0.46, -1.58, -0.60],
  },

  // ========================================================
  // X. NERVIO VAGO (Surco Retroolivar Medio)
  // ========================================================
  {
    id: 'cn10',
    romanNumeral: 'X',
    name: 'Nervio Vago (Neumogástrico)',
    latinName: 'Nervus vagus',
    originName: 'Surco retroolivar (Bulbo raquídeo medio)',
    leftPoints: [
      [-0.27, -1.68, -0.66],
      [-0.37, -1.68, -0.60],
      [-0.50, -1.66, -0.52],
    ],
    rightPoints: [
      [0.27, -1.68, -0.66],
      [0.37, -1.68, -0.60],
      [0.50, -1.66, -0.52],
    ],
    radius: 0.018,
    labelOffset: [-0.45, -1.72, -0.60],
  },

  // ========================================================
  // XI. NERVIO ACCESORIO (Surco Retroolivar Inferior & Raíz Espinal)
  // ========================================================
  {
    id: 'cn11',
    romanNumeral: 'XI',
    name: 'Nervio Accesorio (Espinal)',
    latinName: 'Nervus accessorius',
    originName: 'Surco retroolivar inferior y cordón cervical',
    leftPoints: [
      [-0.24, -2.10, -0.72], // Raíz cervical ascendente
      [-0.25, -1.92, -0.68],
      [-0.26, -1.80, -0.66], // Raíz bulbar
      [-0.42, -1.78, -0.58],
      [-0.52, -1.75, -0.50],
    ],
    rightPoints: [
      [0.24, -2.10, -0.72],
      [0.25, -1.92, -0.68],
      [0.26, -1.80, -0.66],
      [0.42, -1.78, -0.58],
      [0.52, -1.75, -0.50],
    ],
    radius: 0.014,
    labelOffset: [-0.42, -1.92, -0.65],
  },

  // ========================================================
  // XII. NERVIO HIPOGLOSO (Surco Preolivar entre Pirámide y Oliva)
  // ========================================================
  {
    id: 'cn12',
    romanNumeral: 'XII',
    name: 'Nervio Hipogloso',
    latinName: 'Nervus hypoglossus',
    originName: 'Surco preolivar (Entre pirámide y oliva)',
    leftPoints: [
      [-0.16, -1.58, -0.56], // Raicilla superior
      [-0.22, -1.58, -0.48],
      [-0.32, -1.56, -0.36],
      [-0.44, -1.52, -0.24],
    ],
    rightPoints: [
      [0.16, -1.58, -0.56],
      [0.22, -1.58, -0.48],
      [0.32, -1.56, -0.36],
      [0.44, -1.52, -0.24],
    ],
    radius: 0.018,
    labelOffset: [-0.28, -1.58, -0.42],
  },
];

function createNerveTubeGeometry(points: [number, number, number][], radius: number): THREE.BufferGeometry {
  const v3Points = points.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
  const curve = new THREE.CatmullRomCurve3(v3Points, false, 'catmullrom', 0.4);
  return new THREE.TubeGeometry(curve, 28, radius, 8, false);
}

interface DissectableNerveMeshProps {
  nerve: CranialNerveItemDef;
  leftGeo: THREE.BufferGeometry;
  rightGeo: THREE.BufferGeometry;
}

const DissectableNerveMesh: React.FC<DissectableNerveMeshProps> = ({ nerve, leftGeo, rightGeo }) => {
  const { isVisible, isTransparent, isHovered, handleClick, handlePointerOver, handlePointerOut } =
    useDissectable(nerve.id, nerve.name);
  const selectedCranialNerveId = useNeuroStore((state) => state.selectedCranialNerveId);
  const setSelectedCranialNerveId = useNeuroStore((state) => state.setSelectedCranialNerveId);
  const setSelectedStructureId = useNeuroStore((state) => state.setSelectedStructureId);
  const isInteracting = useNeuroStore((state) => state.isInteracting);

  if (!isVisible) return null;

  const isSelected = selectedCranialNerveId === nerve.id;
  const baseColor = isSelected ? '#38bdf8' : '#fff9c4'; // Color marfil/amarillento anatómico
  const emissiveColor = isHovered ? HOVER_EMISSIVE : (isSelected ? '#0284c7' : '#1e1c10');
  const emissiveIntensity = isHovered ? HOVER_EMISSIVE_INTENSITY : (isSelected ? 0.8 : 0.15);
  const opacity = isTransparent ? 0.22 : 1.0;

  return (
    <group
      name={`cranial-nerve-${nerve.id}`}
      onClick={(e) => {
        if (handleClick(e)) return;
        e.stopPropagation();
        setSelectedCranialNerveId(nerve.id);
        setSelectedStructureId(nerve.id);
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Left Trunk */}
      <mesh geometry={leftGeo}>
        <meshStandardMaterial
          color={isHovered ? '#00e5ff' : baseColor}
          roughness={0.58}
          metalness={0.06}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent={isTransparent}
          opacity={opacity}
        />
      </mesh>

      {/* Right Trunk */}
      <mesh geometry={rightGeo}>
        <meshStandardMaterial
          color={isHovered ? '#00e5ff' : baseColor}
          roughness={0.58}
          metalness={0.06}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent={isTransparent}
          opacity={opacity}
        />
      </mesh>

      {/* 3D Roman Numeral Badge (Visible on hover or when selected) */}
      {(isHovered || isSelected) && !isInteracting && (
        <Html position={nerve.labelOffset} center distanceFactor={8} zIndexRange={[60, 0]}>
          <div className="pointer-events-none select-none px-2 py-0.5 rounded bg-[#091524]/95 border border-amber-300/80 shadow-[0_0_14px_rgba(251,191,36,0.4)] text-[10px] font-mono text-amber-200 font-bold whitespace-nowrap flex items-center gap-1.5 animate-in fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="font-extrabold text-white">[{nerve.romanNumeral}]</span>
            <span>{nerve.name}</span>
          </div>
        </Html>
      )}
    </group>
  );
};

export const CranialNervesLayer: React.FC = () => {
  const showCranialNerves = useNeuroStore((state) => state.showCranialNerves);
  const visibleStructures = useNeuroStore((state) => state.visibleStructures);

  // Precompute geometries once
  const geometries = useMemo(() => {
    return CRANIAL_NERVES_12.map((n) => ({
      nerve: n,
      leftGeo: createNerveTubeGeometry(n.leftPoints, n.radius),
      rightGeo: createNerveTubeGeometry(n.rightPoints, n.radius),
    }));
  }, []);

  const isLayerVisible = showCranialNerves || visibleStructures.cranialNerves;
  if (!isLayerVisible) return null;

  return (
    <group name="cranial-nerves-12-layer">
      {geometries.map(({ nerve, leftGeo, rightGeo }) => (
        <DissectableNerveMesh key={nerve.id} nerve={nerve} leftGeo={leftGeo} rightGeo={rightGeo} />
      ))}
    </group>
  );
};

export default CranialNervesLayer;
