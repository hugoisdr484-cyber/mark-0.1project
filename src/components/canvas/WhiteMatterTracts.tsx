import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useNeuroStore } from '../../store/useNeuroStore';
import { WHITE_MATTER_TRACTS } from '../../data/mockGlasserData';
import { useDissectable } from '../../hooks/useDissectable';

// Generate multi-streamline line geometry for a bundle with authentic clinical DTI fanning & directional colors
function createStreamlineBundleGeometry(
  controlPoints: [number, number, number][],
  streamlineCount: number,
  spreadRadius: number,
  baseHexColor: string
): THREE.BufferGeometry {
  const linePositions: number[] = [];
  const lineColors: number[] = [];
  const samplesPerLine = 56;

  const basePoints = controlPoints.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
  const baseCol = new THREE.Color(baseHexColor);

  let seed = 42;
  const pseudoRandom = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  // Dense, delicate microscopic axonal look
  const actualCount = Math.max(streamlineCount, 28);

  for (let s = 0; s < actualCount; s++) {
    const angle = (s / actualCount) * Math.PI * 2 + (pseudoRandom() - 0.5) * 0.8;
    const radDist = Math.pow(pseudoRandom(), 0.6) * spreadRadius;
    const baseOffsetX = Math.cos(angle) * radDist;
    const baseOffsetY = Math.sin(angle) * radDist;
    const baseOffsetZ = (pseudoRandom() - 0.5) * spreadRadius * 0.9;

    // Disperse points: compact deep white matter core, subtle cortical arborization (max 0.85)
    const numPts = basePoints.length;
    const dispersedPoints = basePoints.map((p, idx) => {
      const u = idx / (numPts - 1); // 0 at origin, 1 at destination
      // U-curve: tight in the middle (0.45), controlled fanning at ends (max 0.85)
      const distFromCenter = Math.abs(u - 0.5) * 2; // 0 at center, 1 at ends
      const fanning = 0.45 + Math.pow(distFromCenter, 2.0) * 0.40;

      // Small subtle micro-curl
      const microCurlX = Math.sin(u * 12.0 + s) * 0.005;
      const microCurlY = Math.cos(u * 12.0 + s) * 0.005;

      let px = p.x + (baseOffsetX + microCurlX) * fanning;
      let py = p.y + (baseOffsetY + microCurlY) * fanning;
      let pz = p.z + baseOffsetZ * fanning;

      // Strict intra-cerebral envelope clamping:
      // Streamlines can NEVER breach the cortical surface into empty space
      if (p.x < -0.3) {
        px = Math.max(-1.26, Math.min(-0.02, px));
      } else if (p.x > 0.3) {
        px = Math.min(1.26, Math.max(0.02, px));
      }

      return new THREE.Vector3(px, py, pz);
    });

    const streamlineCurve = new THREE.CatmullRomCurve3(dispersedPoints, false, 'centripetal', 0.5);
    const sampledPoints = streamlineCurve.getPoints(samplesPerLine);

    // Build line segments with authentic DTI directional RGB coloring
    // (Red = X Left-Right, Green = Y Anteroposterior, Blue = Z Craniocaudal)
    for (let i = 0; i < sampledPoints.length - 1; i++) {
      const p1 = sampledPoints[i];
      const p2 = sampledPoints[i + 1];

      linePositions.push(p1.x, p1.y, p1.z);
      linePositions.push(p2.x, p2.y, p2.z);

      // Local tangent direction
      const dx = Math.abs(p2.x - p1.x);
      const dy = Math.abs(p2.y - p1.y);
      const dz = Math.abs(p2.z - p1.z);
      const len = Math.max(0.0001, Math.sqrt(dx * dx + dy * dy + dz * dz));

      const dtiR = dx / len;
      const dtiG = dy / len;
      const dtiB = dz / len;

      // Blend 65% DTI directional tensor color with 35% tract identity color
      const finalR = dtiR * 0.65 + baseCol.r * 0.35;
      const finalG = dtiG * 0.65 + baseCol.g * 0.35;
      const finalB = dtiB * 0.65 + baseCol.b * 0.35;

      lineColors.push(finalR, finalG, finalB);
      lineColors.push(finalR, finalG, finalB);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
  geometry.computeBoundingSphere();
  return geometry;
}

interface DissectableTractGroupProps {
  tract: any;
  opacity: number;
  isSelected: boolean;
  selectedNodeId: string | null;
  isConnectedToSelectedNode: boolean;
  isCallosum: boolean;
  setSelectedTractId: (id: string) => void;
  setSelectedStructureId: (id: string) => void;
}

const DissectableTractGroup: React.FC<DissectableTractGroupProps> = ({
  tract,
  opacity,
  isSelected,
  selectedNodeId,
  isConnectedToSelectedNode,
  isCallosum,
  setSelectedTractId,
  setSelectedStructureId,
}) => {
  const { isVisible, isTransparent, isHovered, handleClick, handlePointerOver, handlePointerOut } = useDissectable(tract.id, tract.name);
  if (!isVisible) return null;

  let finalOpacity = isTransparent ? 0.20 : opacity;
  if (isHovered) finalOpacity = 1.0;

  return (
    <group
      onClick={(e) => {
        if (handleClick(e)) return;
        e.stopPropagation();
        setSelectedTractId(tract.id);
        setSelectedStructureId('tracts');
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Streamlines with authentic DTI directional tensor colors & fanned terminations */}
      <lineSegments geometry={tract.bundleGeometry}>
        <lineBasicMaterial
          vertexColors={!isHovered}
          color={isHovered ? '#00e5ff' : '#ffffff'}
          transparent={true}
          opacity={finalOpacity}
          linewidth={isHovered ? 2 : 1}
          depthWrite={false}
        />
      </lineSegments>

      {/* Micro-fiber core highlight when connected or selected */}
      {((isSelected || (selectedNodeId && isConnectedToSelectedNode)) && !isCallosum) || isHovered ? (
        <lineSegments geometry={tract.bundleGeometry}>
          <lineBasicMaterial
            color={isHovered ? '#00e5ff' : '#ffffff'}
            transparent={true}
            opacity={isHovered ? 0.85 : 0.25}
            linewidth={1}
            depthWrite={false}
          />
        </lineSegments>
      ) : null}
    </group>
  );
};

export const WhiteMatterTracts: React.FC = () => {
  const tractDensity = useNeuroStore((state) => state.tractDensity);
  const axonalSpeed = useNeuroStore((state) => state.axonalSpeed);
  const ischemiaSeverity = useNeuroStore((state) => state.ischemiaSeverity);
  const selectedNodeId = useNeuroStore((state) => state.selectedNodeId);
  const selectedTractId = useNeuroStore((state) => state.selectedTractId);
  const setSelectedTractId = useNeuroStore((state) => state.setSelectedTractId);
  const activeSystem = useNeuroStore((state) => state.activeSystem);
  const isPlaying = useNeuroStore((state) => state.isPlaying);
  const visibleStructures = useNeuroStore((state) => state.visibleStructures);
  const isolatedStructureId = useNeuroStore((state) => state.isolatedStructureId);
  const ghostModeActive = useNeuroStore((state) => state.ghostModeActive);
  const setSelectedStructureId = useNeuroStore((state) => state.setSelectedStructureId);
  const isMidSagittalCut = useNeuroStore((state) => state.isMidSagittalCut);

  const instancedMeshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Compute central curves and streamline geometries once
  const tractData = useMemo(() => {
    return WHITE_MATTER_TRACTS.map((tract) => {
      const points = tract.controlPoints.map(p => new THREE.Vector3(p[0], p[1], p[2]));
      const centralCurve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5);
      const bundleGeometry = createStreamlineBundleGeometry(
        tract.controlPoints,
        tract.streamlineCount,
        tract.spreadRadius,
        tract.color
      );
      return {
        ...tract,
        centralCurve,
        bundleGeometry,
      };
    });
  }, []);

  const totalInstances = WHITE_MATTER_TRACTS.length * 4; // 4 pulses per tract for rich visual activity
  const densityFactor = tractDensity / 100;
  const speedFactor = axonalSpeed / 100;
  const ischemiaFactor = ischemiaSeverity / 100;

  // 60 FPS Action Potential pulse animation via InstancedMesh (Elongated optical micro-sparks)
  useFrame(({ clock }) => {
    const mesh = instancedMeshRef.current;
    if (!mesh || !isPlaying) return;

    const t = clock.getElapsedTime();
    let instanceIdx = 0;
    const isLeftHemisphereHidden = isMidSagittalCut || visibleStructures.Hemisphere_Left === false;

    tractData.forEach((tract) => {
      const isPureLeftTract = ['TRACT_ARCUATE', 'TRACT_SLF', 'TRACT_FAT'].includes(tract.id);
      const isTractHiddenByDissection = isLeftHemisphereHidden && isPureLeftTract && selectedTractId !== tract.id && isolatedStructureId !== tract.id && isolatedStructureId !== 'tracts';

      const isSystemActive = activeSystem === 'TODOS' || tract.system === activeSystem;
      const isConnected = selectedNodeId
        ? tract.sourceId === selectedNodeId || tract.targetId === selectedNodeId
        : true;
      const isSelected = selectedTractId === tract.id || isConnected;
      const effectiveSpeed = (speedFactor * 0.45 + 0.15) * (1 - ischemiaFactor * 0.45);

      for (let p = 0; p < 4; p++) {
        // If not connected and node is selected, or hidden by dissection, hide pulses
        if (!isSystemActive || densityFactor < 0.2 || (selectedNodeId && !isConnected) || isTractHiddenByDissection) {
          dummy.position.set(0, -999, 0);
          dummy.scale.set(0, 0, 0);
          dummy.updateMatrix();
          mesh.setMatrixAt(instanceIdx, dummy.matrix);
        } else {
          const progress = (t * effectiveSpeed + (p * 0.25)) % 1;
          const pos = tract.centralCurve.getPointAt(progress);
          const tangent = tract.centralCurve.getTangentAt(progress);
          dummy.position.copy(pos);

          // Align pulse along tangent of axonal trajectory
          dummy.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);
          const pulseScale = isSelected ? 1.4 : 0.9;
          dummy.scale.set(pulseScale * 0.65, pulseScale * 0.65, pulseScale * 1.8);
          dummy.updateMatrix();
          mesh.setMatrixAt(instanceIdx, dummy.matrix);
        }
        instanceIdx++;
      }
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  const isTractsVisible = visibleStructures.tracts !== false;
  const isTractsIsolated = isolatedStructureId === 'tracts';
  const isTractsGhost = isolatedStructureId && !isTractsIsolated && ghostModeActive;
  const isLeftHemisphereHidden = isMidSagittalCut || visibleStructures.Hemisphere_Left === false;

  if (!isTractsVisible && !isTractsIsolated) return null;
  if (isolatedStructureId && !isTractsIsolated && !ghostModeActive) return null;

  return (
    <group
      name="white-matter-tractography-bundles"
      onClick={(e) => {
        e.stopPropagation();
        setSelectedStructureId('tracts');
      }}
    >
      {/* 1. DTI DIRECTIONAL STREAMLINE BUNDLES */}
      {tractData.map((tract) => {
        // Pure left association tracts hide automatically when left hemisphere is cut or hidden
        const isPureLeftTract = ['TRACT_ARCUATE', 'TRACT_SLF', 'TRACT_FAT'].includes(tract.id);
        if (isLeftHemisphereHidden && isPureLeftTract && selectedTractId !== tract.id && isolatedStructureId !== tract.id && isolatedStructureId !== 'tracts') {
          return null;
        }

        const isSelected = selectedTractId === tract.id;
        const isSystemActive = activeSystem === 'TODOS' || tract.system === activeSystem;
        
        // Intelligent attenuation: When a region is selected, attenuate unrelated tracts to 15% opacity!
        const isConnectedToSelectedNode = selectedNodeId
          ? tract.sourceId === selectedNodeId || tract.targetId === selectedNodeId
          : true;

        const isCallosum = tract.id === 'TRACT_CORPUS_CALLOSUM';

        // 100% for connected, 15% for unrelated; 65% for callosum fan
        let opacity = isCallosum
          ? 0.65
          : !isSystemActive
          ? 0.05
          : selectedNodeId
          ? isConnectedToSelectedNode
            ? 0.95 // 95% fully illuminated
            : 0.12 // 12% attenuated
          : isSelected
          ? 0.95
          : Math.min(0.85, densityFactor * 0.9);

        if (isTractsGhost) {
          opacity = 0.08;
        }

        return (
          <DissectableTractGroup
            key={tract.id}
            tract={tract}
            opacity={opacity}
            isSelected={isSelected}
            selectedNodeId={selectedNodeId}
            isConnectedToSelectedNode={isConnectedToSelectedNode}
            isCallosum={isCallosum}
            setSelectedTractId={setSelectedTractId}
            setSelectedStructureId={setSelectedStructureId}
          />
        );
      })}

      {/* 2. INSTANCED MESH FOR ACTION POTENTIAL PULSES (Slender optical sparks) */}
      <instancedMesh
        ref={instancedMeshRef}
        args={[undefined, undefined, totalInstances]}
      >
        <sphereGeometry args={[0.024, 12, 12]} />
      </instancedMesh>
    </group>
  );
};
