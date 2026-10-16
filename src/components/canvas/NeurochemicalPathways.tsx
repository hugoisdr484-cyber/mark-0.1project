import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useNeuroStore } from '../../store/useNeuroStore';
import { NEUROCHEMICAL_PATHWAYS, PHARMACOLOGICAL_AGENTS } from '../../data/neurotransmittersDB';
import type { NeurochemicalPathway } from '../../data/neurotransmittersDB';

interface PathwayRenderData {
  pathway: NeurochemicalPathway;
  curve: THREE.CatmullRomCurve3;
  lineGeometry: THREE.BufferGeometry;
  particleCount: number;
}

export const NeurochemicalPathways: React.FC = () => {
  const showNeurochemistry = useNeuroStore((state) => state.showNeurochemistry);
  const activeDrugId = useNeuroStore((state) => state.activeDrugId);
  const activeNeuroSystem = useNeuroStore((state) => state.activeNeuroSystem);
  const isPlaying = useNeuroStore((state) => state.isPlaying);

  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Find active pharmacological agent
  const activeDrug = useMemo(() => {
    return PHARMACOLOGICAL_AGENTS.find((d) => d.id === activeDrugId) || PHARMACOLOGICAL_AGENTS[0];
  }, [activeDrugId]);

  // Pre-calculate curves, line geometry, and particle allocations
  const pathwaysData: PathwayRenderData[] = useMemo(() => {
    return NEUROCHEMICAL_PATHWAYS.map((p) => {
      const pts = p.controlPoints.map((pt) => new THREE.Vector3(pt[0], pt[1], pt[2]));
      const curve = new THREE.CatmullRomCurve3(pts, false, 'centripetal', 0.5);
      const curvePoints = curve.getPoints(50);
      const linePositions: number[] = [];
      for (let i = 0; i < curvePoints.length - 1; i++) {
        linePositions.push(curvePoints[i].x, curvePoints[i].y, curvePoints[i].z);
        linePositions.push(curvePoints[i + 1].x, curvePoints[i + 1].y, curvePoints[i + 1].z);
      }
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

      return {
        pathway: p,
        curve,
        lineGeometry,
        particleCount: 8, // 8 animated vesicles per pathway
      };
    });
  }, []);

  const totalParticles = pathwaysData.reduce((acc, curr) => acc + curr.particleCount, 0);

  // Assign instance colors based on neurotransmitter pathway
  React.useEffect(() => {
    const mesh = instancedMeshRef.current;
    if (!mesh) return;

    let idx = 0;
    pathwaysData.forEach((item) => {
      const isDrugTarget = activeDrug.primarySystem !== 'NONE' && item.pathway.system === activeDrug.primarySystem;
      const pColor = new THREE.Color(item.pathway.color);
      if (isDrugTarget) {
        pColor.offsetHSL(0, 0, 0.15); // brighter
      }
      for (let i = 0; i < item.particleCount; i++) {
        mesh.setColorAt(idx, pColor);
        idx++;
      }
    });
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  }, [pathwaysData, activeDrug, showNeurochemistry]);

  // 60-120 FPS dynamic particle animation along neurochemical axonal projections
  useFrame(({ clock }) => {
    if (!showNeurochemistry) return;
    const mesh = instancedMeshRef.current;
    if (!mesh || !isPlaying) return;

    const t = clock.getElapsedTime();
    let instanceIndex = 0;

    pathwaysData.forEach((item) => {
      const isSystemMatch = activeNeuroSystem === 'TODOS' || item.pathway.system === activeNeuroSystem;
      const isDrugTarget = activeDrug.primarySystem !== 'NONE' && item.pathway.system === activeDrug.primarySystem;
      
      const speedMult = isDrugTarget
        ? activeDrug.pathwaySpeedMultiplier
        : activeDrug.primarySystem !== 'NONE'
        ? 0.75
        : 1.0;

      const effectiveSpeed = item.pathway.particleSpeed * speedMult * 0.35;

      for (let i = 0; i < item.particleCount; i++) {
        if (!isSystemMatch) {
          dummy.position.set(0, -999, 0);
          dummy.scale.set(0, 0, 0);
          dummy.updateMatrix();
          mesh.setMatrixAt(instanceIndex, dummy.matrix);
        } else {
          const progress = (t * effectiveSpeed + (i / item.particleCount)) % 1;
          const pos = item.curve.getPointAt(progress);
          dummy.position.copy(pos);

          const scale = isDrugTarget ? 1.45 : 1.0;
          dummy.scale.set(scale, scale, scale);
          dummy.updateMatrix();
          mesh.setMatrixAt(instanceIndex, dummy.matrix);
        }
        instanceIndex++;
      }
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  if (!showNeurochemistry) return null;

  return (
    <group name="neurochemical-pathways-and-vesicles">
      {/* 1. CONTINUOUS PROJECTION CHANNELS (LineSegments) */}
      {pathwaysData.map((item) => {
        const isSystemMatch = activeNeuroSystem === 'TODOS' || item.pathway.system === activeNeuroSystem;
        const isDrugTarget = activeDrug.primarySystem !== 'NONE' && item.pathway.system === activeDrug.primarySystem;
        const baseColor = new THREE.Color(item.pathway.color);

        const opacity = !isSystemMatch
          ? 0.05
          : isDrugTarget
          ? 0.95
          : activeDrug.primarySystem !== 'NONE'
          ? 0.25
          : 0.7;

        return (
          <group key={item.pathway.id}>
            {/* Outer Soft Pathway Glow */}
            <lineSegments geometry={item.lineGeometry}>
              <lineBasicMaterial
                color={baseColor}
                transparent={true}
                opacity={opacity}
                linewidth={isDrugTarget ? 2 : 1}
                depthWrite={false}
              />
            </lineSegments>

            {/* Origin Nucleus Seed (Soma cluster) */}
            <mesh position={item.pathway.controlPoints[0]}>
              <sphereGeometry args={[isDrugTarget ? 0.034 : 0.022, 16, 16]} />
              <meshBasicMaterial color={baseColor} transparent opacity={0.90} />
            </mesh>
          </group>
        );
      })}

      {/* 2. INSTANCED MESH FOR SYNAPTIC VESICLES / PARTICLES */}
      <instancedMesh
        ref={instancedMeshRef}
        args={[undefined, undefined, totalParticles]}
      >
        <sphereGeometry args={[0.009, 12, 12]} />
        <meshBasicMaterial toneMapped={false} transparent={true} opacity={0.88} />
      </instancedMesh>
    </group>
  );
};
