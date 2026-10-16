import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useNeuroStore } from '../../store/useNeuroStore';
import { useDissectable, isPointClipped } from '../../hooks/useDissectable';
import { HOVER_EMISSIVE, HOVER_EMISSIVE_INTENSITY, hoverTintColor } from '../../utils/hoverTint';
import deepCatalog from '../../data/deepNucleiCatalog.json';

interface DeepEntry {
  id: string;
  name: string;
  category: string;
  color: string;
  group: 'thalamus' | 'subthalamus' | 'medulla' | 'pons' | 'midbrain';
}

export const DEEP_NUCLEI_CATALOG = deepCatalog as DeepEntry[];

const DeepPiece: React.FC<{ entry: DeepEntry; geometry: THREE.BufferGeometry }> = ({ entry, geometry }) => {
  const { isVisible, isTransparent, isHovered, handleClick, handlePointerOver, handlePointerOut } = useDissectable(
    entry.id,
    entry.name
  );
  const setSelectedStructureId = useNeuroStore((s) => s.setSelectedStructureId);
  const isSelected = useNeuroStore((s) => s.selectedStructureId === entry.id);
  const isolatedStructureId = useNeuroStore((s) => s.isolatedStructureId);
  const layerVisible = useNeuroStore((s) =>
    entry.group === 'thalamus' || entry.group === 'subthalamus'
      ? s.visibleStructures.Thalamus !== false
      : s.visibleStructures.Brainstem !== false
  );

  if (!isVisible || !layerVisible) return null;

  const dimmed = isolatedStructureId !== null && isolatedStructureId !== entry.id;
  const transparent = isTransparent || dimmed;
  const opacity = isTransparent ? 0.2 : dimmed ? 0.1 : 1;

  const color = isHovered ? hoverTintColor(entry.color, 0.55) : new THREE.Color(entry.color);
  const emissive = isHovered
    ? new THREE.Color(HOVER_EMISSIVE)
    : isSelected
    ? new THREE.Color('#00f0ff')
    : new THREE.Color('#000000');
  const emissiveIntensity = isHovered ? HOVER_EMISSIVE_INTENSITY : isSelected ? 0.35 : 0;

  return (
    <mesh
      geometry={geometry}
      name={entry.name}
      userData={{ dissectable: true, id: entry.id }}
      onClick={(e) => {
        if (isPointClipped(e.point)) return;
        if (handleClick(e)) return;
        e.stopPropagation();
        setSelectedStructureId(entry.id);
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        roughness={0.42}
        metalness={0.04}
        transparent={transparent}
        opacity={opacity}
        depthWrite={!transparent}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

/**
 * Núcleos talámicos, subtálamo (STN, ZI, SN) y detalle del tronco encefálico
 * (bulbo, protuberancia, mesencéfalo) como submallas disecables independientes.
 * Generados por scripts/build_deep_nuclei.py.
 */
export const DeepNucleiParcels: React.FC = () => {
  const { nodes } = useGLTF('/models/deep_nuclei.glb') as any;

  useEffect(() => {
    Object.values(nodes || {}).forEach((n: any) => {
      if (n?.geometry && !n.geometry.boundingSphere) n.geometry.computeBoundingSphere();
    });
  }, [nodes]);

  return (
    <group name="deep-nuclei-thalamus-subthalamus-brainstem">
      {DEEP_NUCLEI_CATALOG.map((entry) => {
        const geometry = nodes?.[entry.id]?.geometry as THREE.BufferGeometry | undefined;
        if (!geometry) return null;
        return <DeepPiece key={entry.id} entry={entry} geometry={geometry} />;
      })}
    </group>
  );
};

useGLTF.preload('/models/deep_nuclei.glb');
