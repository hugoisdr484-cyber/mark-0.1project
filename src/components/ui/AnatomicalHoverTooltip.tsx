import React, { useEffect, useState } from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { GLASSER_NODES } from '../../data/mockGlasserData';

export const AnatomicalHoverTooltip: React.FC = () => {
  const hoveredDissectable = useNeuroStore((s) => s.hoveredDissectable);
  const hoveredNodeId = useNeuroStore((s) => s.hoveredNodeId);
  const isInteracting = useNeuroStore((s) => s.isInteracting);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  if (isInteracting || !pos) return null;

  // Resolve display name: dissectable piece has priority; otherwise check hoveredNodeId
  let displayName: string | null = null;
  let tag: string = 'ANATOMÍA';

  if (hoveredDissectable) {
    displayName = hoveredDissectable.name;
    if (displayName.includes('Tálamo')) tag = 'TÁLAMO (DIENCÉFALO)';
    else if (displayName.includes('Subtálamo') || displayName.includes('STN') || displayName.includes('Zona Incierta')) tag = 'SUBTÁLAMO';
    else if (displayName.includes('Bulbo') || displayName.includes('Pirámide') || displayName.includes('Oliva')) tag = 'BULBO RAQUÍDEO';
    else if (displayName.includes('Puente') || displayName.includes('Protuberancia')) tag = 'PROTUBERANCIA';
    else if (displayName.includes('Mesencéfalo') || displayName.includes('Colículo')) tag = 'MESENCÉFALO';
    else if (displayName.includes('Cerebelo')) tag = 'CEREBELO';
    else if (displayName.includes('Giro') || displayName.includes('Corteza') || displayName.includes('Área')) tag = 'CORTEZA CEREBRAL';
    else if (displayName.includes('Arteria')) tag = 'VASCULATURA';
    else if (displayName.includes('Fascículo') || displayName.includes('Tracto')) tag = 'SUSTANCIA BLANCA';
  } else if (hoveredNodeId) {
    const node = GLASSER_NODES.find((n) => n.id === hoveredNodeId);
    if (node) {
      displayName = `${node.name} [${node.atlasId}]`;
      tag = node.lobe.toUpperCase();
    }
  }

  if (!displayName) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-3 px-3 py-1.5 rounded-lg bg-[#05111d]/95 backdrop-blur-md border border-cyan-400/80 shadow-[0_0_20px_rgba(0,229,255,0.4)] text-xs font-mono text-cyan-200 flex flex-col gap-0.5 min-w-[160px] max-w-[340px] animate-in fade-in zoom-in-95 duration-100"
      style={{
        left: Math.max(120, Math.min(window.innerWidth - 120, pos.x)),
        top: Math.max(60, pos.y - 14),
      }}
    >
      <div className="flex items-center justify-between gap-2 border-b border-cyan-500/30 pb-0.5">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff] animate-ping" />
          <span className="text-[9px] uppercase tracking-wider text-cyan-300/80 font-bold">
            {tag}
          </span>
        </div>
        <span className="text-[8px] px-1 rounded bg-cyan-950/80 text-cyan-300 font-mono border border-cyan-500/40">
          HOVER QUIRÚRGICO
        </span>
      </div>
      <span className="font-bold text-white tracking-tight leading-snug mt-0.5">
        {displayName}
      </span>
    </div>
  );
};
