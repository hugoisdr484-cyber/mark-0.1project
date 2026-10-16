import React, { useEffect } from 'react';
import { Scissors, Undo2, RotateCcw, Ghost, Target } from 'lucide-react';
import { useNeuroStore } from '../../store/useNeuroStore';

export const DissectionToolbar: React.FC = () => {
  const isDissectionMode = useNeuroStore((s) => s.isDissectionMode);
  const toggleDissectionMode = useNeuroStore((s) => s.toggleDissectionMode);
  const dissectionTool = useNeuroStore((s) => s.dissectionTool);
  const setDissectionTool = useNeuroStore((s) => s.setDissectionTool);
  const dissectedPieces = useNeuroStore((s) => s.dissectedPieces);
  const transparentPieces = useNeuroStore((s) => s.transparentPieces);
  const isolatedPieceId = useNeuroStore((s) => s.isolatedPieceId);
  const undoDissection = useNeuroStore((s) => s.undoDissection);
  const restoreAllDissected = useNeuroStore((s) => s.restoreAllDissected);
  const hoveredDissectable = useNeuroStore((s) => s.hoveredDissectable);

  // Global Ctrl+Z keyboard shortcut for Undo Dissection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (dissectedPieces.length > 0) {
          e.preventDefault();
          undoDissection();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undoDissection, dissectedPieces.length]);

  const totalHidden = dissectedPieces.length;

  return (
    <div className="flex flex-col items-center gap-1.5 pointer-events-auto select-none font-mono">
      {/* Main Dissection Header Row */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#070e18]/95 backdrop-blur-md border border-red-500/30 shadow-[0_4px_25px_rgba(0,0,0,0.6)] text-xs">
        {/* MASTER SWITCH: [🔪 MODO DISECCIÓN: OFF / ON] */}
        <button
          onClick={toggleDissectionMode}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-black transition-all border ${
            isDissectionMode
              ? 'bg-red-500/30 border-red-500 text-red-200 shadow-[0_0_18px_rgba(239,68,68,0.5)] animate-pulse'
              : 'bg-slate-900/80 border-slate-700/80 text-slate-400 hover:text-white hover:border-slate-500'
          }`}
          title="Activar/Desactivar Modo Disección Quirúrgica Interactiva (Anatomy Learning)"
        >
          <Scissors className={`w-4 h-4 ${isDissectionMode ? 'text-red-400' : 'text-slate-500'}`} />
          <span>🔪 MODO DISECCIÓN:</span>
          <span
            className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
              isDissectionMode
                ? 'bg-red-500 text-white shadow-[0_0_10px_#ef4444]'
                : 'bg-slate-800 text-slate-500'
            }`}
          >
            {isDissectionMode ? 'ON' : 'OFF'}
          </span>
        </button>

        {/* SUB-TOOLS (When Dissection is Active or always accessible) */}
        <div className="flex items-center gap-1 bg-black/40 p-0.5 rounded-lg border border-slate-800 text-[11px]">
          {/* Tool 1: Quitar Pieza */}
          <button
            onClick={() => setDissectionTool('remove')}
            disabled={!isDissectionMode}
            className={`flex items-center gap-1 px-2 py-1 rounded transition-all font-bold ${
              !isDissectionMode
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : dissectionTool === 'remove'
                ? 'bg-red-600/40 border border-red-400 text-red-200 shadow-[0_0_10px_rgba(239,68,68,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Quitar / Ocultar pieza al hacer clic"
          >
            <Scissors className="w-3.5 h-3.5 text-red-400" />
            <span>Quitar</span>
          </button>

          {/* Tool 2: Transparentar Pieza */}
          <button
            onClick={() => setDissectionTool('transparent')}
            disabled={!isDissectionMode}
            className={`flex items-center gap-1 px-2 py-1 rounded transition-all font-bold ${
              !isDissectionMode
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : dissectionTool === 'transparent'
                ? 'bg-cyan-600/40 border border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Volver semitransparente al 20% al hacer clic (Rayos X)"
          >
            <Ghost className="w-3.5 h-3.5 text-cyan-400" />
            <span>Rayos X</span>
          </button>

          {/* Tool 3: Aislar Pieza */}
          <button
            onClick={() => setDissectionTool('isolate')}
            disabled={!isDissectionMode}
            className={`flex items-center gap-1 px-2 py-1 rounded transition-all font-bold ${
              !isDissectionMode
                ? 'opacity-40 cursor-not-allowed text-slate-500'
                : dissectionTool === 'isolate'
                ? 'bg-amber-600/40 border border-amber-400 text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Aislar pieza al hacer clic (oculta todo lo demás)"
          >
            <Target className="w-3.5 h-3.5 text-amber-400" />
            <span>Aislar</span>
          </button>
        </div>

        <div className="h-4 w-[1px] bg-slate-700/80 mx-0.5" />

        {/* Counter of Removed Pieces */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/50 border border-slate-800 text-[11px] text-slate-300">
          <span>Retiradas:</span>
          <span className="font-bold text-amber-400">{totalHidden}</span>
          {transparentPieces.length > 0 && (
            <span className="text-[10px] text-cyan-400">({transparentPieces.length} transl.)</span>
          )}
          {isolatedPieceId && (
            <span className="text-[10px] text-amber-300 font-bold">(1 aislada)</span>
          )}
        </div>

        {/* UNDO BUTTON [↩️ Deshacer (Ctrl+Z)] */}
        <button
          onClick={undoDissection}
          disabled={totalHidden === 0}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-all text-[11px] font-bold ${
            totalHidden > 0
              ? 'bg-amber-500/20 border-amber-500/60 text-amber-200 hover:bg-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.25)]'
              : 'opacity-40 cursor-not-allowed border-slate-800 text-slate-600'
          }`}
          title="Deshacer última pieza retirada (Ctrl+Z)"
        >
          <Undo2 className="w-3.5 h-3.5 text-amber-400" />
          <span>Deshacer</span>
          <span className="text-[9px] text-slate-400 font-normal hidden sm:inline">(Ctrl+Z)</span>
        </button>

        {/* RESTORE ALL BUTTON [🔄 Restaurar Todo] */}
        <button
          onClick={restoreAllDissected}
          disabled={totalHidden === 0 && transparentPieces.length === 0 && !isolatedPieceId}
          className={`flex items-center gap-1 px-2 py-1 rounded border transition-all text-[11px] font-bold ${
            totalHidden > 0 || transparentPieces.length > 0 || isolatedPieceId
              ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-200 hover:bg-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.25)]'
              : 'opacity-40 cursor-not-allowed border-slate-800 text-slate-600'
          }`}
          title="Restaurar todas las piezas al 100%"
        >
          <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
          <span>Restaurar</span>
        </button>
      </div>

      {/* Dynamic Hover Dissection Badge Tooltip */}
      {isDissectionMode && hoveredDissectable && (
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/90 border border-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.5)] text-xs text-red-100 font-sans animate-in fade-in zoom-in-95 duration-100">
          {dissectionTool === 'remove' && <Scissors className="w-3.5 h-3.5 text-red-400 animate-bounce" />}
          {dissectionTool === 'transparent' && <Ghost className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />}
          {dissectionTool === 'isolate' && <Target className="w-3.5 h-3.5 text-amber-400 animate-spin" />}
          <span className="font-black text-red-300">
            {dissectionTool === 'remove' ? '🔪 RETIRAR:' : dissectionTool === 'transparent' ? '👻 RAYOS X:' : '🎯 AISLAR:'}
          </span>
          <span className="font-semibold text-white">{hoveredDissectable.name}</span>
          <span className="text-[10px] text-red-400/80 font-mono">[Clic para ejecutar]</span>
        </div>
      )}
    </div>
  );
};
