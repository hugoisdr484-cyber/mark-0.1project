import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { useNeuroStore } from '../../store/useNeuroStore';
import { useDissectable } from '../../hooks/useDissectable';
import { HOVER_EMISSIVE, HOVER_EMISSIVE_INTENSITY, hoverTintColor } from '../../utils/hoverTint';

export interface CerebellarPieceProps {
  id: string;
  name: string;
  modelPath?: string;
  defaultColor: string;
  isProcedural?: boolean;
}

/**
 * Procedural anatomical 3D geometry of the Cerebellar Arbor Vitae (Árbol de la Vida / Medullary White Matter Center):
 * Radiates from the cerebellar peduncles deep into both cerebellar hemispheres and vermian folia.
 */
function createArborVitaeGeometry(): THREE.BufferGeometry {
  const branches: [number, number, number][][] = [
    // Central Trunk (peduncles to central vermian core)
    [ [0, -1.55, -1.30], [0, -1.48, -1.42], [0, -1.40, -1.52], [0, -1.30, -1.62] ],
    // Culmen / Lingula upward branches
    [ [0, -1.40, -1.52], [0, -1.22, -1.55], [0, -1.05, -1.60], [0, -0.95, -1.58] ],
    [ [0, -1.22, -1.55], [-0.15, -1.12, -1.58], [-0.25, -1.02, -1.56] ],
    [ [0, -1.22, -1.55], [0.15, -1.12, -1.58], [0.25, -1.02, -1.56] ],
    // Declive / Folium posterior branches
    [ [0, -1.30, -1.62], [0, -1.28, -1.78], [0, -1.32, -1.94], [0, -1.40, -2.06] ],
    [ [0, -1.28, -1.78], [-0.22, -1.24, -1.86], [-0.38, -1.22, -1.94] ],
    [ [0, -1.28, -1.78], [0.22, -1.24, -1.86], [0.38, -1.22, -1.94] ],
    // Uvula / Pyramis downward vermian branches
    [ [0, -1.48, -1.42], [0, -1.65, -1.58], [0, -1.82, -1.72], [0, -1.98, -1.80] ],
    [ [0, -1.65, -1.58], [-0.18, -1.75, -1.68], [-0.32, -1.85, -1.74] ],
    [ [0, -1.65, -1.58], [0.18, -1.75, -1.68], [0.32, -1.85, -1.74] ],
    // Left Hemispheric Main Radiation (Corpus Medullare Sinister)
    [ [0, -1.48, -1.42], [-0.35, -1.46, -1.50], [-0.70, -1.44, -1.58], [-1.05, -1.42, -1.66] ],
    // Left Anterior Lateral Branches
    [ [-0.70, -1.44, -1.58], [-0.85, -1.25, -1.62], [-1.10, -1.15, -1.60], [-1.30, -1.08, -1.55] ],
    [ [-0.85, -1.25, -1.62], [-0.75, -1.10, -1.68], [-0.90, -0.98, -1.64] ],
    // Left Posterior Inferior Branches
    [ [-0.70, -1.44, -1.58], [-0.90, -1.65, -1.68], [-1.15, -1.82, -1.75], [-1.35, -1.95, -1.78] ],
    [ [-0.90, -1.65, -1.68], [-0.75, -1.85, -1.72], [-0.88, -2.02, -1.76] ],
    // Left Crus Lateral Radiations
    [ [-1.05, -1.42, -1.66], [-1.30, -1.40, -1.72], [-1.55, -1.38, -1.75], [-1.75, -1.36, -1.72] ],
    // Right Hemispheric Main Radiation (Corpus Medullare Dexter)
    [ [0, -1.48, -1.42], [0.35, -1.46, -1.50], [0.70, -1.44, -1.58], [1.05, -1.42, -1.66] ],
    // Right Anterior Lateral Branches
    [ [0.70, -1.44, -1.58], [0.85, -1.25, -1.62], [1.10, -1.15, -1.60], [1.30, -1.08, -1.55] ],
    [ [0.85, -1.25, -1.62], [0.75, -1.10, -1.68], [0.90, -0.98, -1.64] ],
    // Right Posterior Inferior Branches
    [ [0.70, -1.44, -1.58], [0.90, -1.65, -1.68], [1.15, -1.82, -1.75], [1.35, -1.95, -1.78] ],
    [ [0.90, -1.65, -1.68], [0.75, -1.85, -1.72], [0.88, -2.02, -1.76] ],
    // Right Crus Lateral Radiations
    [ [1.05, -1.42, -1.66], [1.30, -1.40, -1.72], [1.55, -1.38, -1.75], [1.75, -1.36, -1.72] ]
  ];

  const tubeGeometries: THREE.BufferGeometry[] = [];
  branches.forEach((b, idx) => {
    const pts = b.map((p) => new THREE.Vector3(...p));
    const curve = new THREE.CatmullRomCurve3(pts);
    const radius = idx === 0 ? 0.032 : idx === 10 || idx === 16 ? 0.026 : 0.016;
    const geom = new THREE.TubeGeometry(curve, 16, radius, 8, false);
    tubeGeometries.push(geom);
  });

  const merged = mergeGeometries(tubeGeometries, false);
  merged.computeVertexNormals();
  merged.computeBoundingSphere();
  return merged;
}

export const PIECES_HEMISPHERIC: CerebellarPieceProps[] = [
  {
    id: 'cerebellum_hemisphere_left',
    name: 'Hemisferio Cerebeloso Izquierdo',
    modelPath: '/models/cerebellum/cerebellum_hemisphere_left.glb',
    defaultColor: '#2dd4bf',
  },
  {
    id: 'cerebellum_hemisphere_right',
    name: 'Hemisferio Cerebeloso Derecho',
    modelPath: '/models/cerebellum/cerebellum_hemisphere_right.glb',
    defaultColor: '#0ea5e9',
  },
  {
    id: 'cerebellum_vermis',
    name: 'Vermis Cerebeloso',
    modelPath: '/models/cerebellum/cerebellum_vermis.glb',
    defaultColor: '#f59e0b',
  },
  {
    id: 'cerebellum_flocculonodular',
    name: 'Lóbulo Floculonodular / Amígdala Cerebelosa',
    modelPath: '/models/cerebellum/cerebellum_flocculonodular.glb',
    defaultColor: '#06b6d4',
  },
  {
    id: 'cerebellum_arbor_vitae',
    name: 'Sustancia Blanca Interna (Árbol de la Vida)',
    defaultColor: '#f8fafc',
    isProcedural: true,
  },
  {
    id: 'cerebellum_deep_nuclei',
    name: 'Núcleo Dentado y Núcleos Profundos',
    modelPath: '/models/cerebellum/cerebellum_deep_nuclei.glb',
    defaultColor: '#facc15',
  },
  {
    id: 'brainstem_peduncles',
    name: 'Pedúnculos Cerebelosos (Sup, Med, Inf)',
    modelPath: '/models/cerebellum/brainstem_peduncles.glb',
    defaultColor: '#f43f5e',
  },
];

export const PIECES_LOBULAR: CerebellarPieceProps[] = [
  {
    id: 'cerebellum_lobules_anterior',
    name: 'Lobulillos Anteriores (I - V)',
    modelPath: '/models/cerebellum/cerebellum_lobules_anterior.glb',
    defaultColor: '#34d399',
  },
  {
    id: 'cerebellum_crus_lobules',
    name: 'Lobulillos Crus I y Crus II',
    modelPath: '/models/cerebellum/cerebellum_crus_lobules.glb',
    defaultColor: '#a78bfa',
  },
  {
    id: 'cerebellum_lobules_posterior_inf',
    name: 'Lobulillos Posteriores Inferiores (VIIb - IX)',
    modelPath: '/models/cerebellum/cerebellum_lobules_posterior_inf.glb',
    defaultColor: '#fb7185',
  },
  {
    id: 'cerebellum_flocculonodular',
    name: 'Lóbulo Floculonodular (Lobulillo X)',
    modelPath: '/models/cerebellum/cerebellum_flocculonodular.glb',
    defaultColor: '#06b6d4',
  },
  {
    id: 'cerebellum_vermis',
    name: 'Vermis Cerebeloso',
    modelPath: '/models/cerebellum/cerebellum_vermis.glb',
    defaultColor: '#f59e0b',
  },
  {
    id: 'cerebellum_arbor_vitae',
    name: 'Sustancia Blanca Interna (Árbol de la Vida)',
    defaultColor: '#f8fafc',
    isProcedural: true,
  },
  {
    id: 'cerebellum_deep_nuclei',
    name: 'Núcleos Cerebelosos Profundos',
    modelPath: '/models/cerebellum/cerebellum_deep_nuclei.glb',
    defaultColor: '#facc15',
  },
  {
    id: 'brainstem_peduncles',
    name: 'Pedúnculos Cerebelosos y Tronco',
    modelPath: '/models/cerebellum/brainstem_peduncles.glb',
    defaultColor: '#f43f5e',
  },
];

const CerebellumGLTFItem: React.FC<{ piece: CerebellarPieceProps }> = ({ piece }) => {
  const gltf = useGLTF(piece.modelPath!) as any;

  // Fully connected interactive dissection hook
  const {
    isVisible: isDissectVisible,
    isTransparent,
    isHovered,
    handleClick,
    handlePointerOver,
    handlePointerOut,
  } = useDissectable(piece.id, `Cerebelo: ${piece.name}`);

  const visibleStructures = useNeuroStore((state) => state.visibleStructures);
  const selectedStructureId = useNeuroStore((state) => state.selectedStructureId);
  const setSelectedStructureId = useNeuroStore((state) => state.setSelectedStructureId);
  const isolatedStructureId = useNeuroStore((state) => state.isolatedStructureId);
  const ghostModeActive = useNeuroStore((state) => state.ghostModeActive);

  // Extract geometry and tag mesh userData as dissectable
  const geometry = useMemo(() => {
    let geom: THREE.BufferGeometry | null = null;
    if (gltf?.scene) {
      gltf.scene.traverse((child: any) => {
        if (child.isMesh && child.geometry && !geom) {
          child.name = `Cerebelo: ${piece.name}`;
          child.userData.dissectable = true;
          const g = child.geometry as THREE.BufferGeometry;
          if (!g.boundingSphere) {
            g.computeBoundingSphere();
          }
          geom = g;
        }
      });
    }
    return geom;
  }, [gltf, piece.name]);

  const isLayerVisible = visibleStructures[piece.id] !== false && visibleStructures['Cerebellum'] !== false;
  const isLayerIsolated = isolatedStructureId === piece.id;
  const isAnotherIsolated = isolatedStructureId !== null && !isLayerIsolated;

  // Do not render if dissected or hidden in layer control
  if (!geometry || !isDissectVisible || (!isLayerVisible && !isLayerIsolated)) {
    return null;
  }

  // Material settings: Rayos X, Isolation, Hover, Selection
  let opacity = 1.0;
  let transparent = false;
  let depthWrite = true;
  let emissiveColor = new THREE.Color('#000000');
  let emissiveIntensity = 0.0;

  if (isAnotherIsolated) {
    if (ghostModeActive) {
      opacity = 0.12;
      transparent = true;
      depthWrite = false;
    } else {
      return null;
    }
  }

  if (isTransparent) {
    opacity = 0.20;
    transparent = true;
    depthWrite = false;
  }

  if (isHovered) {
    emissiveColor = new THREE.Color(HOVER_EMISSIVE);
    emissiveIntensity = HOVER_EMISSIVE_INTENSITY;
  } else if (selectedStructureId === piece.id) {
    emissiveColor = new THREE.Color('#00f0ff');
    emissiveIntensity = 0.55;
  }

  return (
    <mesh
      geometry={geometry}
      name={`Cerebelo: ${piece.name}`}
      userData={{ dissectable: true, id: piece.id }}
      onClick={(e) => {
        if (handleClick(e)) return;
        e.stopPropagation();
        setSelectedStructureId(piece.id);
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      raycast={isDissectVisible ? undefined : () => null}
    >
      <meshStandardMaterial
        vertexColors={true}
        color={isHovered ? hoverTintColor(piece.defaultColor) : piece.defaultColor}
        emissive={emissiveColor}
        emissiveIntensity={emissiveIntensity}
        roughness={0.38}
        metalness={0.06}
        transparent={transparent}
        opacity={opacity}
        depthTest={true}
        depthWrite={depthWrite}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const CerebellumProceduralItem: React.FC<{ piece: CerebellarPieceProps }> = ({ piece }) => {
  const geometry = useMemo(() => createArborVitaeGeometry(), []);

  const {
    isVisible: isDissectVisible,
    isTransparent,
    isHovered,
    handleClick,
    handlePointerOver,
    handlePointerOut,
  } = useDissectable(piece.id, `Cerebelo: ${piece.name}`);

  const visibleStructures = useNeuroStore((state) => state.visibleStructures);
  const selectedStructureId = useNeuroStore((state) => state.selectedStructureId);
  const setSelectedStructureId = useNeuroStore((state) => state.setSelectedStructureId);
  const isolatedStructureId = useNeuroStore((state) => state.isolatedStructureId);
  const ghostModeActive = useNeuroStore((state) => state.ghostModeActive);

  const isLayerVisible = visibleStructures[piece.id] !== false && visibleStructures['Cerebellum'] !== false;
  const isLayerIsolated = isolatedStructureId === piece.id;
  const isAnotherIsolated = isolatedStructureId !== null && !isLayerIsolated;

  if (!isDissectVisible || (!isLayerVisible && !isLayerIsolated)) {
    return null;
  }

  let opacity = 1.0;
  let transparent = false;
  let depthWrite = true;
  let emissiveColor = new THREE.Color('#222233');
  let emissiveIntensity = 0.2;

  if (isAnotherIsolated) {
    if (ghostModeActive) {
      opacity = 0.12;
      transparent = true;
      depthWrite = false;
    } else {
      return null;
    }
  }

  if (isTransparent) {
    opacity = 0.20;
    transparent = true;
    depthWrite = false;
  }

  if (isHovered) {
    emissiveColor = new THREE.Color(HOVER_EMISSIVE);
    emissiveIntensity = HOVER_EMISSIVE_INTENSITY;
  } else if (selectedStructureId === piece.id) {
    emissiveColor = new THREE.Color('#00f0ff');
    emissiveIntensity = 0.7;
  }

  return (
    <mesh
      geometry={geometry}
      name={`Cerebelo: ${piece.name}`}
      userData={{ dissectable: true, id: piece.id }}
      onClick={(e) => {
        if (handleClick(e)) return;
        e.stopPropagation();
        setSelectedStructureId(piece.id);
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      raycast={isDissectVisible ? undefined : () => null}
    >
      <meshStandardMaterial
        color={isHovered ? hoverTintColor(piece.defaultColor) : piece.defaultColor}
        emissive={emissiveColor}
        emissiveIntensity={emissiveIntensity}
        roughness={0.22}
        metalness={0.08}
        transparent={transparent}
        opacity={opacity}
        depthTest={true}
        depthWrite={depthWrite}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export const CerebellumBucknerParcels: React.FC = () => {
  const cerebellarViewMode = useNeuroStore((state) => state.cerebellarViewMode);
  const isCerebellumVisible = useNeuroStore((state) => state.visibleStructures['Cerebellum'] !== false);
  const isolatedStructureId = useNeuroStore((state) => state.isolatedStructureId);

  const activePieces = cerebellarViewMode === 'lobular' ? PIECES_LOBULAR : PIECES_HEMISPHERIC;

  // Master visibility check
  if (!isCerebellumVisible && !isolatedStructureId?.startsWith('cerebellum') && isolatedStructureId !== 'brainstem_peduncles') {
    return null;
  }

  return (
    <group name="buckner-cerebellum-atlas">
      {activePieces.map((piece) =>
        piece.isProcedural ? (
          <CerebellumProceduralItem key={piece.id} piece={piece} />
        ) : (
          <CerebellumGLTFItem key={piece.id} piece={piece} />
        )
      )}
    </group>
  );
};

// Preload all GLTF Cerebellar models
PIECES_LOBULAR.filter((p) => !p.isProcedural && p.modelPath).forEach((p) => {
  useGLTF.preload(p.modelPath!);
});
PIECES_HEMISPHERIC.filter((p) => !p.isProcedural && p.modelPath).forEach((p) => {
  useGLTF.preload(p.modelPath!);
});
