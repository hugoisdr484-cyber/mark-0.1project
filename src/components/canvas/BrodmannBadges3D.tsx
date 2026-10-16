import React, { useEffect, useState } from 'react';
import { Html } from '@react-three/drei';
import { useNeuroStore } from '../../store/useNeuroStore';

interface BrodmannLandmark {
  id: string;
  number: string;
  name: string;
  destrieux_label: string;
  color: string;
  position: [number, number, number];
  normal: [number, number, number];
}

// Map Glasser Mock Node IDs to Brodmann Landmark IDs
const GLASSER_TO_BADGE_ID: Record<string, string> = {
  GLASSER_4: 'BA_4',
  GLASSER_3B_1: 'BA_312',
  GLASSER_44: 'BA_44',
  GLASSER_45: 'BA_45',
  GLASSER_6D_SMA: 'BA_6',
  GLASSER_FEF: 'BA_6',
  GLASSER_DLPFC: 'BA_9_46',
  GLASSER_10R_PP: 'BA_10',
  GLASSER_V1: 'BA_17',
  GLASSER_V2_V3: 'BA_18',
  GLASSER_A1: 'BA_41',
  GLASSER_STV: 'BA_22',
  GLASSER_PG_IPL: 'BA_39',
  GLASSER_PSL: 'BA_40',
  GLASSER_5M_7AL: 'BA_5_7',
  GLASSER_7M: 'BA_5_7',
  GLASSER_TE1P: 'BA_21',
  GLASSER_FFC: 'BA_37',
};

export const BrodmannBadges3D: React.FC = () => {
  const cortexColorMode = useNeuroStore((state) => state.cortexColorMode);
  const isMidSagittalCut = useNeuroStore((state) => state.isMidSagittalCut);
  const visibleStructures = useNeuroStore((state) => state.visibleStructures);
  const selectedNodeId = useNeuroStore((state) => state.selectedNodeId);
  const hoveredNodeId = useNeuroStore((state) => state.hoveredNodeId);
  const isInteracting = useNeuroStore((state) => state.isInteracting);
  const [landmarks, setLandmarks] = useState<BrodmannLandmark[]>([]);

  useEffect(() => {
    fetch('/models/brodmann_landmarks.json')
      .then((res) => res.json())
      .then((data) => setLandmarks(data))
      .catch((err) => console.warn('Could not load brodmann landmarks:', err));
  }, []);

  // Only show when in Brodmann mode and left cortex is active/visible
  if (cortexColorMode !== 'brodmann') return null;
  if (isMidSagittalCut || visibleStructures.Hemisphere_Left === false) return null;
  // Isolate during camera rotation to prevent DOM projection lag
  if (isInteracting) return null;

  // STRICT REQUIREMENT 3: Only display badge for the active hovered or selected region!
  // No permanent column of 20 clustered badges.
  const activeNodeId = hoveredNodeId || selectedNodeId;
  const targetBadgeId = activeNodeId ? (GLASSER_TO_BADGE_ID[activeNodeId] || 'BA_44') : null;
  const activeLandmark = landmarks.find((l) => l.id === targetBadgeId);

  if (!activeLandmark) return null;

  return (
    <group name="active-brodmann-badge" position={activeLandmark.position}>
      {/* Discreet Anchor Pin */}
      <mesh>
        <sphereGeometry args={[0.024, 16, 16]} />
        <meshStandardMaterial
          color={activeLandmark.color}
          emissive={activeLandmark.color}
          emissiveIntensity={1.5}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      <Html
        center
        distanceFactor={12}
        occlude={false}
        zIndexRange={[40, 0]}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/90 backdrop-blur-md border border-white/60 shadow-[0_0_15px_rgba(255,255,255,0.35)] text-xs font-mono whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
          <span
            className="flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-black text-slate-950 font-sans shadow"
            style={{ backgroundColor: activeLandmark.color }}
          >
            {activeLandmark.number}
          </span>
          <span className="font-bold text-white text-[11px]">
            {activeLandmark.name}
          </span>
        </div>
      </Html>
    </group>
  );
};
