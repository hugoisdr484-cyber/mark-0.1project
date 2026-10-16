import React from 'react';
import { Target, EyeOff, Ghost, RotateCcw, X } from 'lucide-react';
import { useNeuroStore } from '../../store/useNeuroStore';

export const STRUCTURE_NAMES: Record<string, string> = {
  Hemisphere_Left: 'Corteza Hemisferio Izquierdo',
  Hemisphere_Right: 'Corteza Hemisferio Derecho',
  tracts: 'Vías y Tractos de Sustancia Blanca',
  Corpus_Callosum: 'Cuerpo Calloso',
  Thalamus: 'Tálamo (Diencéfalo)',
  Caudate_Putamen: 'Estriado (Núcleo Caudado y Putamen)',
  Hippocampus_Fornix: 'Hipocampo, Fórnix y Amígdala',
  Brainstem: 'Tronco Encefálico',
  Cerebellum: 'Cerebelo (Atlas Completo)',
  Ventricles: 'Ventrículos Laterales',
  cerebellum_hemisphere_left: 'Hemisferio Cerebeloso Izquierdo (Buckner)',
  cerebellum_hemisphere_right: 'Hemisferio Cerebeloso Derecho (Buckner)',
  cerebellum_vermis: 'Vermis Cerebeloso (Medial)',
  cerebellum_lobules_anterior: 'Lobulillos Anteriores I - V (Espinocerebelo)',
  cerebellum_crus_lobules: 'Lobulillos Crus I y Crus II (Red Frontoparietal)',
  cerebellum_lobules_posterior_inf: 'Lobulillos Posteriores Inferiores VIIb - IX',
  cerebellum_flocculonodular: 'Lóbulo Floculonodular X (Arquicerebelo)',
  cerebellum_arbor_vitae: 'Sustancia Blanca Interna (Árbol de la Vida)',
  cerebellum_deep_nuclei: 'Núcleos Profundos (Dentado, Interpósito, Fastigio)',
  brainstem_peduncles: 'Pedúnculos Cerebelosos y Conexión de Tronco',
};

export const DissectionActionDock: React.FC = () => {
  const selectedStructureId = useNeuroStore((state) => state.selectedStructureId);
  const setSelectedStructureId = useNeuroStore((state) => state.setSelectedStructureId);
  const isolatedStructureId = useNeuroStore((state) => state.isolatedStructureId);
  const setIsolatedStructureId = useNeuroStore((state) => state.setIsolatedStructureId);
  const setStructureVisibility = useNeuroStore((state) => state.setStructureVisibility);
  const ghostModeActive = useNeuroStore((state) => state.ghostModeActive);
  const toggleGhostMode = useNeuroStore((state) => state.toggleGhostMode);
  const restoreAllStructures = useNeuroStore((state) => state.restoreAllStructures);

  if (!selectedStructureId && !isolatedStructureId) return null;

  const currentId = selectedStructureId || isolatedStructureId;
  const structName = currentId ? (STRUCTURE_NAMES[currentId] || currentId) : '';
  const isIsolated = isolatedStructureId === currentId;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/90 backdrop-blur-md border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.25)] text-xs font-mono">
        {/* Selected Structure Badge */}
        <div className="flex items-center gap-2 pr-2 border-r border-slate-700/80">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          <div className="flex flex-col">
            <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-semibold">ESTRUCTURA ACTIVA</span>
            <span className="text-white font-bold">{structName}</span>
          </div>
        </div>

        {/* Action Buttons */}
        {/* 1. Isolate Structure */}
        <button
          onClick={() => {
            if (currentId) {
              setIsolatedStructureId(isIsolated ? null : currentId);
            }
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all ${
            isIsolated
              ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 font-bold shadow-[0_0_12px_rgba(34,211,238,0.4)]'
              : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500/50'
          }`}
          title="Oculta o atenúa las demás estructuras para estudiar solo esta pieza"
        >
          <Target className="w-3.5 h-3.5 text-cyan-400" />
          <span>{isIsolated ? 'DESAISLAR' : 'AISLAR ESTRUCTURA'}</span>
        </button>

        {/* 2. Hide / Dissect Piece */}
        <button
          onClick={() => {
            if (currentId) {
              setStructureVisibility(currentId, false);
              setSelectedStructureId(null);
              if (isolatedStructureId === currentId) {
                setIsolatedStructureId(null);
              }
            }
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 text-rose-300 hover:text-rose-100 hover:border-rose-500/50 hover:bg-rose-950/40 transition-all"
          title="Oculta esta pieza anatómica para exponer las estructuras profundas"
        >
          <EyeOff className="w-3.5 h-3.5 text-rose-400" />
          <span>OCULTAR / DISECCIONAR</span>
        </button>

        {/* 3. Ghost / Semitransparent Mode */}
        <button
          onClick={toggleGhostMode}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all ${
            ghostModeActive
              ? 'bg-purple-500/30 border-purple-400 text-purple-200 font-bold shadow-[0_0_12px_rgba(168,85,247,0.4)]'
              : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:text-purple-300 hover:border-purple-500/50'
          }`}
          title="Convierte las estructuras no aisladas en fantasmas semitransparentes (10% opacidad)"
        >
          <Ghost className="w-3.5 h-3.5 text-purple-400" />
          <span>{ghostModeActive ? 'FANTASMA ACTIVO (10%)' : 'MODO FANTASMA'}</span>
        </button>

        {/* 4. Restore All */}
        <button
          onClick={restoreAllStructures}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900/80 text-amber-300 hover:text-amber-100 hover:border-amber-500/50 hover:bg-amber-950/40 transition-all"
          title="Restaura todas las piezas anatómicas a su estado visible y opaco"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>RESTAURAR TODO</span>
        </button>

        {/* Close Button */}
        <button
          onClick={() => setSelectedStructureId(null)}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
          title="Cerrar panel de acción"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
