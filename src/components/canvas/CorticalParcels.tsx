import React, { useMemo, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useNeuroStore } from '../../store/useNeuroStore';
import { GLASSER_NODES, WHITE_MATTER_TRACTS } from '../../data/mockGlasserData';
import type { GlasserNode } from '../../data/mockGlasserData';
import { useDissectable, isPointClipped } from '../../hooks/useDissectable';
import { HOVER_EMISSIVE, HOVER_EMISSIVE_INTENSITY, hoverTintColor } from '../../utils/hoverTint';
import { DeepNucleiParcels } from './DeepNucleiParcels';

// Complete Catalogue of 19 Dissectable Gyri per Hemisphere
export const DISSECTABLE_GYRI = [
  { id: 'Cortex_Precentral', name: 'Giro Precentral (Corteza Motora Primaria - M1)', color: '#f28b82', category: 'Corteza Motora' },
  { id: 'Cortex_Postcentral', name: 'Giro Postcentral (Corteza Somatosensorial - S1)', color: '#8ab4f8', category: 'Corteza Somatosensorial' },
  { id: 'Cortex_Frontal_Sup', name: 'Giro Frontal Superior (Área Motora Suplementaria)', color: '#e9d5ff', category: 'Lóbulo Frontal' },
  { id: 'Cortex_Frontal_Mid', name: 'Giro Frontal Medio (Corteza Prefrontal DLPFC)', color: '#fed7aa', category: 'Lóbulo Frontal' },
  { id: 'Cortex_Broca', name: 'Área de Broca (Giro Frontal Inferior)', color: '#81c995', category: 'Lóbulo Frontal / Lenguaje' },
  { id: 'Cortex_Orbitofrontal', name: 'Corteza Orbitofrontal (Toma de Decisiones)', color: '#fef08a', category: 'Lóbulo Frontal' },
  { id: 'Cortex_Frontopolar', name: 'Polo Frontal (Corteza Frontopolar BA 10)', color: '#fbcfe8', category: 'Lóbulo Frontal' },
  { id: 'Cortex_Parietal_Sup', name: 'Lóbulo Parietal Superior y Precúneo (BA 5/7)', color: '#c084fc', category: 'Lóbulo Parietal' },
  { id: 'Cortex_Supramarginal', name: 'Giro Supramarginal (Fonología BA 40)', color: '#fcad70', category: 'Lóbulo Parietal' },
  { id: 'Cortex_Angular', name: 'Giro Angular (Integración Semántica BA 39)', color: '#d7aefb', category: 'Lóbulo Parietal' },
  { id: 'Cortex_Temporal_Sup', name: 'Giro Temporal Superior (Wernicke y Heschl)', color: '#78d9ec', category: 'Lóbulo Temporal / Auditivo' },
  { id: 'Cortex_Temporal_Mid', name: 'Giro Temporal Medio (Memoria Semántica BA 21)', color: '#fde047', category: 'Lóbulo Temporal' },
  { id: 'Cortex_Temporal_Inf', name: 'Giro Temporal Inferior (Vía Visual Ventral BA 20)', color: '#f59e0b', category: 'Lóbulo Temporal' },
  { id: 'Cortex_Temporal_Pole', name: 'Polo Temporal (Procesamiento Emocional BA 38)', color: '#f472b6', category: 'Lóbulo Temporal' },
  { id: 'Cortex_Occipital', name: 'Corteza Visual Occipital (V1 Calcarina, V2, V3)', color: '#ff8bcb', category: 'Lóbulo Occipital' },
  { id: 'Cortex_Fusiform', name: 'Giro Fusiforme (Reconocimiento Facial BA 37)', color: '#93c5fd', category: 'Corteza Occipitotemporal' },
  { id: 'Cortex_Cingulate', name: 'Corteza Cingulada Anterior y Posterior', color: '#fda4af', category: 'Sistema Límbico' },
  { id: 'Cortex_Insula', name: 'Corteza Insular (Interocepción y Dolor)', color: '#5eead4', category: 'Ínsula de Reil' },
  { id: 'Cortex_Medial', name: 'Corteza Medial y Parahipocámpica', color: '#fdba74', category: 'Cara Medial' },
];

// Complete Catalogue of 22 Dissectable Subcortical Structures
export const DISSECTABLE_SUBCORTICALS = [
  { id: 'Corpus_Callosum', name: 'Cuerpo Calloso (Comisura Interhemisférica)', color: '#6fa8dc', category: 'Comisura' },
  { id: 'Fornix', name: 'Fórnix (Trígono Cerebral)', color: '#f6b26b', category: 'Sistema Límbico' },
  { id: 'Thalamus_L', name: 'Tálamo Izquierdo', color: '#e06666', category: 'Diencéfalo' },
  { id: 'Thalamus_R', name: 'Tálamo Derecho', color: '#e06666', category: 'Diencéfalo' },
  { id: 'Caudate_L', name: 'Núcleo Caudado Izquierdo', color: '#9999e6', category: 'Ganglios Basales' },
  { id: 'Caudate_R', name: 'Núcleo Caudado Derecho', color: '#9999e6', category: 'Ganglios Basales' },
  { id: 'Putamen_L', name: 'Putamen Izquierdo', color: '#8e7cc3', category: 'Ganglios Basales' },
  { id: 'Putamen_R', name: 'Putamen Derecho', color: '#8e7cc3', category: 'Ganglios Basales' },
  { id: 'Pallidum_L', name: 'Globo Pálido Izquierdo', color: '#d5a6bd', category: 'Ganglios Basales' },
  { id: 'Pallidum_R', name: 'Globo Pálido Derecho', color: '#d5a6bd', category: 'Ganglios Basales' },
  { id: 'Hippocampus_L', name: 'Hipocampo Izquierdo', color: '#ffd966', category: 'Sistema Límbico' },
  { id: 'Hippocampus_R', name: 'Hipocampo Derecho', color: '#ffd966', category: 'Sistema Límbico' },
  { id: 'Amygdala_L', name: 'Amígdala Izquierda', color: '#f9cb9c', category: 'Sistema Límbico' },
  { id: 'Amygdala_R', name: 'Amígdala Derecha', color: '#f9cb9c', category: 'Sistema Límbico' },
  { id: 'Midbrain', name: 'Mesencéfalo (Pedúnculos y Colículos)', color: '#d5a6bd', category: 'Tronco Encefálico' },
  { id: 'Pons', name: 'Puente de Varolio (Protuberancia)', color: '#ea9999', category: 'Tronco Encefálico' },
  { id: 'Medulla', name: 'Bulbo Raquídeo (Médula Oblongada)', color: '#c5a5cf', category: 'Tronco Encefálico' },
  { id: 'Ventricles_L', name: 'Ventrículo Lateral Izquierdo', color: '#a4c2f4', category: 'Sistema Ventricular', transparent: true, opacity: 0.65 },
  { id: 'Ventricles_R', name: 'Ventrículo Lateral Derecho', color: '#a4c2f4', category: 'Sistema Ventricular', transparent: true, opacity: 0.65 },
];

// Mapping of Glasser Node IDs to the corresponding Gyrus Submesh IDs
const GLASSER_TO_STRUCTURE_ID: Record<string, string> = {
  GLASSER_4: 'Cortex_Precentral_L',
  GLASSER_55B: 'Cortex_Precentral_L',
  GLASSER_3B_1: 'Cortex_Postcentral_L',
  GLASSER_44: 'Cortex_Broca_L',
  GLASSER_45: 'Cortex_Broca_L',
  GLASSER_6D_SMA: 'Cortex_Frontal_Sup_L',
  GLASSER_FEF: 'Cortex_Frontal_Mid_L',
  GLASSER_DLPFC: 'Cortex_Frontal_Mid_L',
  GLASSER_10R_PP: 'Cortex_Frontopolar_L',
  GLASSER_47L_OFC: 'Cortex_Orbitofrontal_L',
  GLASSER_5M_7AL: 'Cortex_Parietal_Sup_L',
  GLASSER_7M: 'Cortex_Parietal_Sup_L',
  GLASSER_PSL: 'Cortex_Supramarginal_L',
  GLASSER_PG_IPL: 'Cortex_Angular_L',
  GLASSER_STV: 'Cortex_Temporal_Sup_L',
  GLASSER_A1: 'Cortex_Temporal_Sup_L',
  GLASSER_PBELT: 'Cortex_Temporal_Sup_L',
  GLASSER_TE1P: 'Cortex_Temporal_Mid_L',
  GLASSER_FFC: 'Cortex_Fusiform_L',
  GLASSER_V1: 'Cortex_Occipital_L',
  GLASSER_V2_V3: 'Cortex_Occipital_L',
  GLASSER_V4: 'Cortex_Occipital_L',
  GLASSER_MT_V5: 'Cortex_Occipital_L',
  GLASSER_AVI: 'Cortex_Insula_L',
  GLASSER_POI1: 'Cortex_Insula_L',
  GLASSER_24_DACC: 'Cortex_Cingulate_L',
  GLASSER_31_PCC: 'Cortex_Cingulate_L',
};

// Fast spatial centroid lookup for 180 Glasser nodes (sub-millisecond CPU distance squared)
function findNearestGlasserNode(point: THREE.Vector3): string | null {
  let closestId: string | null = null;
  let minDistanceSq = Infinity;
  for (let i = 0; i < GLASSER_NODES.length; i++) {
    const node = GLASSER_NODES[i];
    const dx = node.position[0] - point.x;
    const dy = node.position[1] - point.y;
    const dz = node.position[2] - point.z;
    const distSq = dx * dx + dy * dy + dz * dz;
    if (distSq < minDistanceSq) {
      minDistanceSq = distSq;
      closestId = node.id;
    }
  }
  return closestId;
}

// Global WeakMap cache for on-demand active contour outlines (0 ms CPU on frame renders)
const boundaryCache = new WeakMap<THREE.BufferGeometry, THREE.BufferGeometry>();

function getOrComputeGyrusBoundary(geometry: THREE.BufferGeometry): THREE.BufferGeometry | null {
  if (boundaryCache.has(geometry)) {
    return boundaryCache.get(geometry)!;
  }
  const pos = geometry.attributes.position;
  const index = geometry.index;
  if (!pos) return null;

  const edgeCount = new Map<string, { u: number; v: number; count: number }>();
  const getEdgeKey = (a: number, b: number) => (a < b ? `${a}_${b}` : `${b}_${a}`);
  const addEdge = (a: number, b: number) => {
    const key = getEdgeKey(a, b);
    const ex = edgeCount.get(key);
    if (ex) ex.count++;
    else edgeCount.set(key, { u: a, v: b, count: 1 });
  };

  if (index) {
    for (let i = 0; i < index.count; i += 3) {
      addEdge(index.getX(i), index.getX(i + 1));
      addEdge(index.getX(i + 1), index.getX(i + 2));
      addEdge(index.getX(i + 2), index.getX(i));
    }
  } else {
    for (let i = 0; i < pos.count; i += 3) {
      addEdge(i, i + 1);
      addEdge(i + 1, i + 2);
      addEdge(i + 2, i);
    }
  }

  const bIndices: number[] = [];
  for (const { u, v, count } of edgeCount.values()) {
    if (count === 1) bIndices.push(u, v);
  }

  const lineGeom = new THREE.BufferGeometry();
  lineGeom.setAttribute('position', pos);
  lineGeom.setIndex(bIndices);
  lineGeom.computeBoundingSphere();
  boundaryCache.set(geometry, lineGeom);
  return lineGeom;
}

// Discrete Gyrus Submesh Component with Parcellation Borders and Active Contour Highlight
const DissectableGyrusMesh: React.FC<{
  id: string;
  name: string;
  hemi: 'left' | 'right';
  geometry: THREE.BufferGeometry;
  baseColor: string;
  cortexColorMode: 'tissue' | 'brodmann';
  corticalInflation: number;
  isMidSagittalCut: boolean;
  effectiveIschemia: number;
  activeStrokeId: string | null;
}> = ({
  id,
  name,
  hemi,
  geometry,
  baseColor,
  cortexColorMode,
  corticalInflation,
  isMidSagittalCut,
  effectiveIschemia,
  activeStrokeId,
}) => {
  const { isVisible, isTransparent, isHovered, handleClick, handlePointerOver, handlePointerOut } = useDissectable(id, name);
  const setSelectedStructureId = useNeuroStore((s) => s.setSelectedStructureId);
  const setSelectedNodeId = useNeuroStore((s) => s.setSelectedNodeId);
  const isSelected = useNeuroStore((s) => s.selectedStructureId === id);
  const selectedNodeId = useNeuroStore((s) => s.selectedNodeId);
  const hoveredNodeId = useNeuroStore((s) => s.hoveredNodeId);
  const selectedStructureId = useNeuroStore((s) => s.selectedStructureId);
  const hoveredDissectable = useNeuroStore((s) => s.hoveredDissectable);

  // Check if this gyrus corresponds to the active Glasser / Brodmann node
  const isNodeActive =
    (selectedNodeId && GLASSER_TO_STRUCTURE_ID[selectedNodeId] === id) ||
    (hoveredNodeId && GLASSER_TO_STRUCTURE_ID[hoveredNodeId] === id);
  const isActive = isHovered || isSelected || !!isNodeActive;

  const isAnyActive =
    (hoveredDissectable !== null && hoveredDissectable !== undefined) ||
    (selectedStructureId !== null && selectedStructureId !== undefined) ||
    (hoveredNodeId !== null && hoveredNodeId !== undefined) ||
    (selectedNodeId !== null && selectedNodeId !== undefined);

  // Active contour geometry is lazily retrieved ONLY for the 1 currently active/hovered gyrus
  const activeBoundaryGeom = useMemo(() => {
    if (!isActive || !geometry) return null;
    return getOrComputeGyrusBoundary(geometry);
  }, [isActive, geometry]);

  // Active Contour Material (Cian #00f0ff al hover, Dorado #fbbf24 a la selección)
  const isHoverState = isHovered || (hoveredNodeId && GLASSER_TO_STRUCTURE_ID[hoveredNodeId] === id);
  const activeContourColor = isHoverState ? '#00f0ff' : '#fbbf24';

  const activeContourMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: activeContourColor,
        transparent: true,
        opacity: 1.0,
        depthTest: true,
        depthWrite: false,
      }),
    [activeContourColor]
  );

  const isHemiVisible = useNeuroStore((s) => hemi === 'left' ? s.visibleStructures.Hemisphere_Left !== false : s.visibleStructures.Hemisphere_Right !== false);
  if (!isHemiVisible) return null;

  // Sagittal cut hides all left hemisphere gyri cleanly
  if (hemi === 'left' && isMidSagittalCut) return null;
  // Dissection hides piece cleanly
  if (!isVisible) return null;

  const opacity = isTransparent ? 0.20 : 1.0;
  const transparent = isTransparent;
  const depthWrite = !isTransparent;

  // Requirement 2: 15% subtle attenuation (0.85x) of neighbor areas so active area immediately pops out!
  let matColor: THREE.ColorRepresentation = cortexColorMode === 'brodmann' ? baseColor : '#ffffff';
  if (cortexColorMode === 'brodmann' && isAnyActive && !isActive) {
    const c = new THREE.Color(baseColor);
    matColor = `#${c.multiplyScalar(0.85).getHexString()}`;
  }
  // Tinte azul cian quirúrgico on-hover: mix(baseColor, #00d2ff, 0.55) + emisión #00e5ff
  if (isHovered) matColor = hoverTintColor(matColor, 0.55);

  const emissiveColor = isHovered
    ? HOVER_EMISSIVE
    : isSelected
    ? new THREE.Color(baseColor).multiplyScalar(0.4)
    : activeStrokeId && hemi === 'left'
    ? new THREE.Color(0.25, 0.02, 0.02).multiplyScalar(effectiveIschemia * 0.6)
    : '#000000';
  const emissiveIntensity = isHovered ? HOVER_EMISSIVE_INTENSITY : 1.0;

  return (
    <group>
      <mesh
        geometry={geometry}
        morphTargetInfluences={[corticalInflation / 100]}
        onClick={(e) => {
          if (isPointClipped(e.point)) return;
          if (handleClick(e)) return;
          e.stopPropagation();
          setSelectedStructureId(id);
          // Fast sub-millisecond centroid lookup for Glasser 180 parcels
          if (e.point) {
            const nearestNodeId = findNearestGlasserNode(e.point);
            if (nearestNodeId) {
              setSelectedNodeId(nearestNodeId);
            }
          }
        }}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        raycast={isVisible ? undefined : () => null}
      >
        <meshStandardMaterial
          vertexColors={cortexColorMode === 'tissue'}
          color={matColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          roughness={0.55}
          metalness={0.0}
          transparent={transparent}
          opacity={opacity}
          depthWrite={depthWrite}
          side={THREE.DoubleSide}
          polygonOffset={true}
          polygonOffsetFactor={1.5}
          polygonOffsetUnits={1.5}
        />
      </mesh>

      {/* ACTIVE CONTOUR HIGHLIGHT (Only rendered on the single active/hovered piece) */}
      {activeBoundaryGeom && isActive && (
        <lineSegments
          geometry={activeBoundaryGeom}
          material={activeContourMaterial}
          morphTargetInfluences={[corticalInflation / 100]}
          renderOrder={10}
        />
      )}
    </group>
  );
};

// Consolidated Static Cortical Borders (Consumes 0 ms CPU on frames)
const ConsolidatedCorticalBorders: React.FC = () => {
  const showCorticalBorders = useNeuroStore((s) => s.showCorticalBorders);
  const isMidSagittalCut = useNeuroStore((s) => s.isMidSagittalCut);
  const corticalInflation = useNeuroStore((s) => s.corticalInflation);
  const [borderGeoms, setBorderGeoms] = useState<{
    left: THREE.BufferGeometry;
    right: THREE.BufferGeometry;
  } | null>(null);

  useEffect(() => {
    fetch('/models/cortical_borders.json')
      .then((r) => r.json())
      .then((data) => {
        // Left hemisphere static border geometry
        const posL = new Float32Array(data.pial_offset_l.flat());
        const geomL = new THREE.BufferGeometry();
        geomL.setAttribute('position', new THREE.BufferAttribute(posL, 3));
        if (data.infl_offset_l) {
          const inflL = new Float32Array(data.infl_offset_l.flat());
          geomL.morphAttributes.position = [new THREE.BufferAttribute(inflL, 3)];
        }
        geomL.setIndex(data.border_indices_l);
        geomL.computeBoundingSphere();

        // Right hemisphere static border geometry
        const posR = new Float32Array(data.pial_offset_r.flat());
        const geomR = new THREE.BufferGeometry();
        geomR.setAttribute('position', new THREE.BufferAttribute(posR, 3));
        if (data.infl_offset_r) {
          const inflR = new Float32Array(data.infl_offset_r.flat());
          geomR.morphAttributes.position = [new THREE.BufferAttribute(inflR, 3)];
        }
        geomR.setIndex(data.border_indices_r);
        geomR.computeBoundingSphere();

        setBorderGeoms({ left: geomL, right: geomR });
      })
      .catch((err) => console.warn('Could not load cortical borders:', err));
  }, []);

  const borderMaterial = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: '#1a1a24',
        transparent: true,
        opacity: 0.85,
        depthTest: true,
        depthWrite: false,
      }),
    []
  );

  if (!showCorticalBorders || !borderGeoms) return null;

  return (
    <group name="consolidated-static-cortical-borders">
      {!isMidSagittalCut && (
        <lineSegments
          geometry={borderGeoms.left}
          material={borderMaterial}
          morphTargetInfluences={[corticalInflation / 100]}
          renderOrder={5}
        />
      )}
      <lineSegments
        geometry={borderGeoms.right}
        material={borderMaterial}
        morphTargetInfluences={[corticalInflation / 100]}
        renderOrder={5}
      />
    </group>
  );
};

// Discrete Subcortical Mesh Component with Anatomy Learning Dissection
const DissectableSubcorticalMesh: React.FC<{
  id: string;
  name: string;
  geometry: THREE.BufferGeometry;
  baseColor: string;
  defaultTransparent?: boolean;
  defaultOpacity?: number;
}> = ({
  id,
  name,
  geometry,
  baseColor,
  defaultTransparent = false,
  defaultOpacity = 1.0,
}) => {
  const { isVisible, isTransparent, isHovered, handleClick, handlePointerOver, handlePointerOut } = useDissectable(id, name);
  const setSelectedStructureId = useNeuroStore((s) => s.setSelectedStructureId);
  const isolatedStructureId = useNeuroStore((s) => s.isolatedStructureId);
  const isSelected = useNeuroStore((s) => s.selectedStructureId === id);

  if (!isVisible) return null;

  const opacity = isTransparent ? 0.20 : (isolatedStructureId && isolatedStructureId !== id ? 0.10 : defaultOpacity);
  const transparent = isTransparent || defaultTransparent || (isolatedStructureId !== null && isolatedStructureId !== id);
  const depthWrite = !transparent;

  const emissiveColor = isHovered
    ? HOVER_EMISSIVE
    : isSelected
    ? new THREE.Color(baseColor).multiplyScalar(0.4)
    : '#000000';
  const emissiveIntensity = isHovered ? HOVER_EMISSIVE_INTENSITY : 1.0;
  const meshColor = isHovered ? hoverTintColor(baseColor, 0.55) : isSelected ? new THREE.Color('#38bdf8') : new THREE.Color(baseColor);

  return (
    <mesh
      geometry={geometry}
      onClick={(e) => {
        if (isPointClipped(e.point)) return;
        if (handleClick(e)) return;
        e.stopPropagation();
        setSelectedStructureId(id);
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      raycast={isVisible ? undefined : () => null}
    >
      <meshStandardMaterial
        vertexColors={false}
        color={meshColor}
        emissive={emissiveColor}
        emissiveIntensity={emissiveIntensity}
        roughness={0.38}
        metalness={0.05}
        transparent={transparent}
        opacity={opacity}
        depthWrite={depthWrite}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Discreet Cortical Anchor for Selected Node and Active Connected Nodes Only
const DiscreetCorticalAnchor: React.FC<{
  node: GlasserNode;
  isSelected: boolean;
  isConnected: boolean;
  ischemiaSeverity: number;
  onSelect: (id: string) => void;
}> = ({ node, isSelected, isConnected, ischemiaSeverity, onSelect }) => {
  if (!isSelected && !isConnected) return null;

  const orientation = useMemo(() => {
    const normal = new THREE.Vector3(...node.position).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    return new THREE.Quaternion().setFromUnitVectors(up, normal);
  }, [node.position]);

  const isCritical = node.calloutVariant === 'critical' || (isSelected && ischemiaSeverity > 50);
  const anchorColor = isCritical
    ? new THREE.Color('#f43f5e')
    : isSelected
    ? new THREE.Color('#00f0ff')
    : new THREE.Color(node.color);

  return (
    <group
      position={node.position}
      quaternion={orientation}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id);
      }}
    >
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry
          args={[
            isSelected ? 0.035 : 0.022,
            isSelected ? 0.046 : 0.029,
            32
          ]}
        />
        <meshBasicMaterial
          color={anchorColor}
          side={THREE.DoubleSide}
          transparent={true}
          opacity={isSelected ? 0.95 : 0.75}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0, 0.008, 0]}>
        <sphereGeometry args={[isSelected ? 0.022 : 0.015, 16, 16]} />
        <meshStandardMaterial
          color={anchorColor}
          emissive={anchorColor}
          emissiveIntensity={isSelected ? 1.8 : 0.8}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
    </group>
  );
};

export const CorticalParcels: React.FC = () => {
  const selectedNodeId = useNeuroStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useNeuroStore((state) => state.setSelectedNodeId);
  const ischemiaSeverity = useNeuroStore((state) => state.ischemiaSeverity);
  const isMidSagittalCut = useNeuroStore((state) => state.isMidSagittalCut);
  const corticalInflation = useNeuroStore((state) => state.corticalInflation);
  const activeStrokeId = useNeuroStore((state) => state.activeStrokeId);
  const cortexColorMode = useNeuroStore((state) => state.cortexColorMode);

  // Load real high-res 3D Slicer / Harvard Medical School Brain Atlas (with 68 distinct dissectable meshes)
  const { nodes } = useGLTF('/models/brain_mni152.glb') as any;

  // Compute set of directly connected node IDs to selectedNodeId via active tracts
  const connectedNodeIds = useMemo(() => {
    if (!selectedNodeId) return new Set<string>();
    const ids = new Set<string>();
    WHITE_MATTER_TRACTS.forEach((t) => {
      if (t.sourceId === selectedNodeId || t.targetId === selectedNodeId) {
        ids.add(t.sourceId);
        ids.add(t.targetId);
      }
    });
    return ids;
  }, [selectedNodeId]);

  const visibleAnchors = useMemo(() => {
    if (!selectedNodeId) return [];
    return GLASSER_NODES.filter(
      (n) => n.id === selectedNodeId || connectedNodeIds.has(n.id)
    );
  }, [selectedNodeId, connectedNodeIds]);

  // Precompute bounding spheres for all meshes once upon loading
  useEffect(() => {
    if (!nodes) return;
    Object.values(nodes).forEach((n: any) => {
      if (n?.geometry && !n.geometry.boundingSphere) {
        n.geometry.computeBoundingSphere();
      }
    });
  }, [nodes]);

  const effectiveIschemia = activeStrokeId ? Math.max(0.85, ischemiaSeverity / 100) : (ischemiaSeverity / 100);

  return (
    <group name="anatomical-dissectable-cortical-and-subcortical-group">
      {/* 1. DISSECTABLE CORTICAL GYRI: LEFT HEMISPHERE (19 Individual Pieces) */}
      <group name="cortex-gyri-left">
        {DISSECTABLE_GYRI.map((gyrus) => {
          const pieceId = `${gyrus.id}_L`;
          const geom = nodes?.[pieceId]?.geometry;
          if (!geom) return null;

          return (
            <DissectableGyrusMesh
              key={pieceId}
              id={pieceId}
              name={`${gyrus.name} (Izq)`}
              hemi="left"
              geometry={geom}
              baseColor={gyrus.color}
              cortexColorMode={cortexColorMode}
              corticalInflation={corticalInflation}
              isMidSagittalCut={isMidSagittalCut}
              effectiveIschemia={effectiveIschemia}
              activeStrokeId={activeStrokeId}
            />
          );
        })}
      </group>

      {/* 2. DISSECTABLE CORTICAL GYRI: RIGHT HEMISPHERE (19 Individual Pieces) */}
      <group name="cortex-gyri-right">
        {DISSECTABLE_GYRI.map((gyrus) => {
          const pieceId = `${gyrus.id}_R`;
          const geom = nodes?.[pieceId]?.geometry;
          if (!geom) return null;

          return (
            <DissectableGyrusMesh
              key={pieceId}
              id={pieceId}
              name={`${gyrus.name} (Der)`}
              hemi="right"
              geometry={geom}
              baseColor={gyrus.color}
              cortexColorMode={cortexColorMode}
              corticalInflation={corticalInflation}
              isMidSagittalCut={false}
              effectiveIschemia={0}
              activeStrokeId={null}
            />
          );
        })}
      </group>

      {/* Consolidated Static Parcellation Borders (0 ms CPU on frame renders) */}
      <ConsolidatedCorticalBorders />

      {/* 3. DISSECTABLE SUBCORTICAL & INFRATENTORIAL STRUCTURES (22 Individual Pieces) */}
      <group name="subcortical-dissectable-structures">
        {DISSECTABLE_SUBCORTICALS.map((sub) => {
          // El tálamo monolítico se sustituye por sus 9 núcleos por hemisferio (DeepNucleiParcels)
          if (sub.id === 'Thalamus_L' || sub.id === 'Thalamus_R') return null;
          const geom = nodes?.[sub.id]?.geometry;
          if (!geom) return null;

          return (
            <DissectableSubcorticalMesh
              key={sub.id}
              id={sub.id}
              name={sub.name}
              geometry={geom}
              baseColor={sub.color}
              defaultTransparent={sub.transparent}
              defaultOpacity={sub.opacity}
            />
          );
        })}
      </group>

      {/* 3b. TÁLAMO SEGMENTADO, SUBTÁLAMO Y TRONCO ENCEFÁLICO DETALLADO */}
      <React.Suspense fallback={null}>
        <DeepNucleiParcels />
      </React.Suspense>

      {/* 4. DISCREET CORTICAL ANCHORS */}
      <group name="discreet-cortical-anchors">
        {visibleAnchors.map((node: GlasserNode) => {
          const isSelected = selectedNodeId === node.id;
          const isConnected = connectedNodeIds.has(node.id);

          return (
            <DiscreetCorticalAnchor
              key={node.id}
              node={node}
              isSelected={isSelected}
              isConnected={isConnected}
              ischemiaSeverity={ischemiaSeverity}
              onSelect={setSelectedNodeId}
            />
          );
        })}
      </group>
    </group>
  );
};

useGLTF.preload('/models/brain_mni152.glb');
