import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useNeuroStore } from '../../store/useNeuroStore';
import { clippingMmToScene } from '../../hooks/useDissectable';

/**
 * Visualizador 3D interactivo del Plano de Corte Tomográfico (Estilo TC / Anatomy Learning).
 * Renderiza:
 * 1. Grilla estereotáxica semitransparente en la altura MNI exacta.
 * 2. Borde luminoso perimétrico en cian quirúrgico brillante (#00e5ff) con glow.
 * 3. Indicador MNI en vivo con insignia milimétrica estereotáxica.
 * 4. Tapa anatómica (corte limpio de sustancia blanca/gris sin huecos).
 */
export const CuttingPlaneVisualizer: React.FC = () => {
  const clippingPlane = useNeuroStore((state) => state.clippingPlane);
  const clippingOffset = useNeuroStore((state) => state.clippingOffset);
  const isInteracting = useNeuroStore((state) => state.isInteracting);

  const { transform, labelPos, badgeText, width, height } = useMemo(() => {
    if (clippingPlane === 'none') {
      return { transform: { pos: [0, 0, 0] as [number, number, number], rot: [0, 0, 0] as [number, number, number] }, labelPos: [0, 0, 0] as [number, number, number], badgeText: '', width: 5.5, height: 5.5 };
    }

    const sceneOffset = clippingMmToScene(clippingPlane, clippingOffset);

    if (clippingPlane === 'axial') {
      return {
        transform: {
          pos: [0, sceneOffset, 0] as [number, number, number],
          rot: [-Math.PI / 2, 0, 0] as [number, number, number],
        },
        labelPos: [2.5, sceneOffset, 2.4] as [number, number, number],
        badgeText: `AXIAL: Z = ${clippingOffset > 0 ? '+' : ''}${Math.round(clippingOffset)} mm`,
        width: 5.8,
        height: 6.2,
      };
    }

    if (clippingPlane === 'coronal') {
      return {
        transform: {
          pos: [0, 0, sceneOffset] as [number, number, number],
          rot: [0, 0, 0] as [number, number, number],
        },
        labelPos: [2.5, 2.2, sceneOffset] as [number, number, number],
        badgeText: `CORONAL: Y = ${clippingOffset > 0 ? '+' : ''}${Math.round(clippingOffset)} mm`,
        width: 5.8,
        height: 5.2,
      };
    }

    // sagittal
    return {
      transform: {
        pos: [sceneOffset, 0, 0] as [number, number, number],
        rot: [0, Math.PI / 2, 0] as [number, number, number],
      },
      labelPos: [sceneOffset, 2.2, 2.4] as [number, number, number],
      badgeText: `SAGITAL: X = ${clippingOffset > 0 ? '+' : ''}${Math.round(clippingOffset)} mm ${clippingOffset === 0 ? '(Línea Media)' : ''}`,
      width: 6.2,
      height: 5.2,
    };
  }, [clippingPlane, clippingOffset]);

  // Borde perimétrico rectangular del plano
  const borderGeom = useMemo(() => {
    const hw = width / 2;
    const hh = height / 2;
    const pts = [
      new THREE.Vector3(-hw, -hh, 0),
      new THREE.Vector3(hw, -hh, 0),
      new THREE.Vector3(hw, hh, 0),
      new THREE.Vector3(-hw, hh, 0),
      new THREE.Vector3(-hw, -hh, 0),
    ];
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [width, height]);

  // Grilla interna de división milimétrica estereotáxica
  const gridGeom = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const step = 0.5;
    const hw = width / 2;
    const hh = height / 2;
    for (let x = -hw + step; x < hw; x += step) {
      pts.push(new THREE.Vector3(x, -hh, 0), new THREE.Vector3(x, hh, 0));
    }
    for (let y = -hh + step; y < hh; y += step) {
      pts.push(new THREE.Vector3(-hw, y, 0), new THREE.Vector3(hw, y, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [width, height]);

  if (clippingPlane === 'none') return null;

  return (
    <group name="tomographic-cutting-plane-visualizer">
      {/* 1. Marco Estereotáxico en posición de corte */}
      <group position={transform.pos} rotation={transform.rot}>
        {/* Grilla translúcida */}
        <lineSegments geometry={gridGeom}>
          <lineBasicMaterial color="#00e5ff" transparent opacity={0.18} depthWrite={false} />
        </lineSegments>

        {/* Borde perimétrico luminoso */}
        <line geometry={borderGeom}>
          <lineBasicMaterial color="#00e5ff" linewidth={2.5} transparent opacity={0.85} depthWrite={false} />
        </line>

        {/* Superficie translúcida del plano de corte */}
        <mesh position={[0, 0, -0.002]}>
          <planeGeometry args={[width, height]} />
          <meshBasicMaterial
            color="#002b3d"
            transparent
            opacity={0.12}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* 2. Insignia flotante con lectura MNI en vivo en el borde del plano */}
      {!isInteracting && (
        <group position={labelPos}>
          <Html position={[0, 0, 0]} center occlude={false}>
            <div className="pointer-events-none select-none px-2.5 py-1 rounded bg-[#071322]/95 border border-cyan-400/80 shadow-[0_0_15px_rgba(0,229,255,0.45)] text-[10px] font-mono text-cyan-200 font-bold whitespace-nowrap flex items-center gap-1.5 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00e5ff]" />
              <span>{badgeText}</span>
            </div>
          </Html>
        </group>
      )}
    </group>
  );
};
