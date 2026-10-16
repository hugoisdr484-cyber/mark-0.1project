import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { useNeuroStore } from '../../store/useNeuroStore';
import { GLASSER_NODES, WHITE_MATTER_TRACTS } from '../../data/mockGlasserData';
import type { GlasserNode } from '../../data/mockGlasserData';

export const CalloutLabels: React.FC = () => {
  const selectedNodeId = useNeuroStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useNeuroStore((state) => state.setSelectedNodeId);
  const hoveredNodeId = useNeuroStore((state) => state.hoveredNodeId);
  const showCallouts = useNeuroStore((state) => state.showCallouts);
  const activeSystem = useNeuroStore((state) => state.activeSystem);
  const ischemiaSeverity = useNeuroStore((state) => state.ischemiaSeverity);
  const isInteracting = useNeuroStore((state) => state.isInteracting);
  const visibleStructures = useNeuroStore((state) => state.visibleStructures);
  const isMidSagittalCut = useNeuroStore((state) => state.isMidSagittalCut);

  // Compute set of directly connected node IDs to selectedNodeId via active white matter tracts
  const connectedNodeIds = useMemo(() => {
    if (!selectedNodeId) return new Set<string>();
    const connectedTracts = WHITE_MATTER_TRACTS.filter(
      (t) => t.sourceId === selectedNodeId || t.targetId === selectedNodeId
    );
    const ids = new Set<string>();
    connectedTracts.forEach((t) => {
      ids.add(t.sourceId);
      ids.add(t.targetId);
    });
    return ids;
  }, [selectedNodeId]);

  // Keep candidate list stable to prevent React 19 unmount race conditions
  const calloutCandidates = useMemo(() => GLASSER_NODES.filter((n) => !!n.calloutTag), []);

  // Isolate labels during camera rotation: freeze/hide during isInteracting for 120+ FPS
  if (isInteracting) return null;

  const isLeftHemisphereHidden = isMidSagittalCut || visibleStructures.Hemisphere_Left === false;
  const isRightHemisphereHidden = visibleStructures.Hemisphere_Right === false;

  return (
    <group name="anatomical-callout-labels">
      {calloutCandidates.map((node: GlasserNode) => {
        // Dissection sync: Hide labels belonging to removed hemispheres
        if (node.hemisphere === 'left' && isLeftHemisphereHidden) return null;
        if (node.hemisphere === 'right' && isRightHemisphereHidden) return null;

        const isSelected = selectedNodeId === node.id;
        const isHovered = hoveredNodeId === node.id;
        const isConnected = connectedNodeIds.has(node.id);
        const isSystemActive = activeSystem === 'TODOS' || node.system === activeSystem;
        
        // Intelligent Active Focus visibility
        const isVisible = showCallouts && isSystemActive && (isSelected || isHovered || isConnected);
        if (!isVisible) return null;

        const isCritical = node.calloutVariant === 'critical' || (isSelected && ischemiaSeverity > 50);

        const nodeWorld = new THREE.Vector3(...node.position);

        // Outward surface normal projection:
        // Projects directly away from cortical surface without traversing tissue
        const normal = node.surfaceNormal
          ? new THREE.Vector3(...node.surfaceNormal).normalize()
          : new THREE.Vector3(nodeWorld.x >= 0 ? 0.9 : -0.9, 0.15, 0.4).normalize();

        const projDist = isSelected ? 0.58 : 0.46;
        const badgeOffset = normal.clone().multiplyScalar(projDist);

        // Ensure badge clears brain silhouette laterally (away from midline)
        if (nodeWorld.x >= 0 && badgeOffset.x < 0.22) {
          badgeOffset.x = Math.max(0.25, badgeOffset.x + 0.18);
        } else if (nodeWorld.x < 0 && badgeOffset.x > -0.22) {
          badgeOffset.x = Math.min(-0.25, badgeOffset.x - 0.18);
        }

        const targetWorld = nodeWorld.clone().add(badgeOffset);
        // Clamp top boundary to prevent overlapping the top navigation HUD
        if (targetWorld.y > 0.65) {
          targetWorld.y = 0.65;
          badgeOffset.y = targetWorld.y - nodeWorld.y;
        }

        const lineEnd = [badgeOffset.x, badgeOffset.y, badgeOffset.z];

        return (
          <group key={`callout-${node.id}`} position={node.position} visible={isVisible}>
            {/* Fine white/cyan leader connector line extending cleanly along surface normal */}
            <line>
              <bufferGeometry
                attach="geometry"
                onUpdate={(self) => {
                  const points = new Float32Array([
                    0, 0, 0,
                    lineEnd[0] * 0.5, lineEnd[1] * 0.5, lineEnd[2] * 0.5,
                    lineEnd[0], lineEnd[1], lineEnd[2]
                  ]);
                  self.setAttribute('position', new THREE.BufferAttribute(points, 3));
                }}
              />
              <lineBasicMaterial
                attach="material"
                color={isSelected ? '#00f0ff' : isConnected ? '#38bdf8' : '#94a3b8'}
                transparent={true}
                opacity={isSelected ? 0.95 : isConnected ? 0.85 : 0.45}
                linewidth={isSelected ? 2 : 1}
              />
            </line>

            {/* Fine anchor pin point on cortical surface */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[isSelected ? 0.024 : 0.016, 16, 16]} />
              <meshBasicMaterial color={isCritical ? '#f43f5e' : isSelected ? '#00f0ff' : '#38bdf8'} />
            </mesh>

            {/* Outward Radial Floating Badge with occlude={false} and elevated zIndex */}
            <Html
              position={[badgeOffset.x, badgeOffset.y, badgeOffset.z]}
              center
              distanceFactor={8}
              occlude={false}
              zIndexRange={[50, 0]}
              style={{
                pointerEvents: isVisible ? 'auto' : 'none',
                opacity: isVisible ? 1 : 0,
                display: isVisible ? 'block' : 'none',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNodeId(node.id);
                }}
                className={`
                  cursor-pointer group flex flex-col select-none transition-all duration-200
                  ${isSelected ? 'scale-110 z-50' : 'hover:scale-105 opacity-95'}
                `}
              >
                {/* Reference Dark Container with luminous border */}
                <div
                  className={`
                    px-2.5 py-1.5 rounded flex items-center gap-2 text-[11px] font-mono tracking-wider font-semibold uppercase
                    backdrop-blur-md shadow-2xl border
                    ${isCritical
                      ? 'bg-[#180a11]/92 border-rose-500/80 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                      : isSelected
                      ? 'bg-[#061524]/92 border-cyan-400 text-cyan-200 shadow-[0_0_16px_rgba(0,240,255,0.45)]'
                      : isHovered
                      ? 'bg-[#091728]/92 border-cyan-400/80 text-white shadow-[0_0_12px_rgba(56,189,248,0.35)]'
                      : 'bg-[#09111c]/88 border-teal-500/40 text-slate-300'
                    }
                  `}
                >
                  {/* Colored status pip */}
                  <span
                    className={`w-2 h-2 rounded-full inline-block ${
                      isCritical
                        ? 'bg-rose-500 shadow-[0_0_8px_#f43f5e] animate-pulse'
                        : isSelected
                        ? 'bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse'
                        : 'bg-emerald-400'
                    }`}
                  />

                  {/* Primary Anatomical Tag */}
                  <span className={isSelected ? 'text-cyan-300 font-bold' : ''}>
                    {node.calloutTag}
                  </span>

                  {/* Territorial / Sub-branch Badge Pill */}
                  {node.calloutBadge && (
                    <span
                      className={`
                        text-[9px] px-1.5 py-0.5 rounded border font-mono tracking-tight font-bold
                        ${isCritical
                          ? 'bg-rose-950/70 border-rose-500/60 text-rose-300'
                          : isSelected
                          ? 'bg-cyan-950/70 border-cyan-400/60 text-cyan-300'
                          : 'bg-slate-900 border-slate-700 text-slate-400'
                        }
                      `}
                    >
                      {node.calloutBadge}
                    </span>
                  )}
                </div>

                {/* Subtitle / Functional indicator on selection */}
                {isSelected && (
                  <div className="mt-1 px-2 py-0.5 bg-[#030914]/90 rounded border border-cyan-500/30 text-[9px] text-cyan-300/90 font-mono tracking-tight self-start shadow-lg">
                    {node.shortName} • {node.baseFiringRate} Hz
                  </div>
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
