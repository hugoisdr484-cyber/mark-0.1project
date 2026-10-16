import React from 'react';
import { Scissors, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Crosshair } from 'lucide-react';
import { useNeuroStore } from '../../store/useNeuroStore';

export const TomographicSliceHUD: React.FC = () => {
  const clippingPlane = useNeuroStore((state) => state.clippingPlane);
  const setClippingPlane = useNeuroStore((state) => state.setClippingPlane);
  const clippingOffset = useNeuroStore((state) => state.clippingOffset);
  const setClippingOffset = useNeuroStore((state) => state.setClippingOffset);

  if (clippingPlane === 'none') return null;

  const config = {
    axial: {
      min: -60,
      max: 80,
      step: 1,
      axis: 'Z',
      name: 'Corte Axial Tomográfico (Z)',
      desc: 'Base bulbar / Fosa posterior (-60 mm) ➔ Vértice parietal (+80 mm)',
      nominalMid: 12,
    },
    coronal: {
      min: -100,
      max: 70,
      step: 1,
      axis: 'Y',
      name: 'Corte Coronal Tomográfico (Y)',
      desc: 'Polo occipital (-100 mm) ➔ Polo frontal (+70 mm)',
      nominalMid: -18,
    },
    sagittal: {
      min: -80,
      max: 80,
      step: 1,
      axis: 'X',
      name: 'Corte Sagital Tomográfico (X)',
      desc: 'Hemisferio izquierdo (-80 mm) ➔ Línea media (0 mm) ➔ Hemisferio derecho (+80 mm)',
      nominalMid: 0,
    },
  }[clippingPlane];

  const currentVal = Math.round(clippingOffset);
  const formattedVal = `${currentVal > 0 ? '+' : ''}${currentVal} mm`;
  const isMidline = clippingPlane === 'sagittal' && currentVal === 0;

  const stepBy = (delta: number) => {
    const next = Math.max(config.min, Math.min(config.max, currentVal + delta));
    setClippingOffset(next);
  };

  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-auto select-none flex flex-col items-center gap-1.5 p-2 rounded-xl bg-[#060e1a]/95 backdrop-blur-md border border-cyan-400/50 shadow-[0_0_25px_rgba(0,229,255,0.25)] min-w-[340px] max-w-[95vw] animate-in fade-in slide-in-from-bottom-2">
      {/* Header bar */}
      <div className="flex items-center justify-between w-full px-1 border-b border-cyan-500/20 pb-1.5 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Scissors className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-bold text-cyan-200 tracking-wider text-[11px] uppercase">
            {config.name}
          </span>
          <div className="flex items-center gap-1 ml-2">
            {(['axial', 'coronal', 'sagittal'] as const).map((plane) => (
              <button
                key={plane}
                onClick={() => setClippingPlane(plane)}
                className={`px-1.5 py-0.5 rounded text-[9px] font-mono border transition-all ${
                  clippingPlane === plane
                    ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 font-bold shadow-[0_0_8px_rgba(0,229,255,0.3)]'
                    : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                {plane.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-mono shadow-[0_0_8px_rgba(0,229,255,0.3)]">
            {config.axis} = {formattedVal} {isMidline && '(Línea Media)'}
          </span>
          <button
            onClick={() => setClippingPlane('none')}
            className="p-1 rounded hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors"
            title="Cerrar plano de corte"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Description subtitle */}
      <span className="text-[9px] font-mono text-slate-400 self-start px-1">
        {config.desc}
      </span>

      {/* Range Slider */}
      <div className="w-full flex items-center gap-3 px-1 my-0.5">
        <span className="text-[9px] font-mono text-slate-500 w-10 text-right">
          {config.min} mm
        </span>
        <input
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={currentVal}
          onChange={(e) => setClippingOffset(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
        <span className="text-[9px] font-mono text-slate-500 w-10 text-left">
          +{config.max} mm
        </span>
      </div>

      {/* Quick step micro-controls */}
      <div className="flex items-center justify-between w-full gap-1 pt-1 border-t border-slate-800/80 text-[10px] font-mono">
        <div className="flex items-center gap-1">
          <button
            onClick={() => stepBy(-5)}
            className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-200 transition-all flex items-center gap-0.5"
            title="Retroceder 5 mm"
          >
            <ChevronsLeft className="w-3 h-3 text-cyan-400" />
            <span>-5 mm</span>
          </button>
          <button
            onClick={() => stepBy(-1)}
            className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-200 transition-all flex items-center gap-0.5"
            title="Retroceder 1 mm"
          >
            <ChevronLeft className="w-3 h-3 text-cyan-400" />
            <span>-1 mm</span>
          </button>
        </div>

        <button
          onClick={() => setClippingOffset(config.nominalMid)}
          className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/50 hover:bg-cyan-500/30 text-cyan-300 transition-all flex items-center gap-1 font-bold"
          title="Centrar en altura nominal"
        >
          <Crosshair className="w-3 h-3 text-cyan-400" />
          <span>{clippingPlane === 'sagittal' ? 'Línea Media (0)' : 'Centro'}</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => stepBy(1)}
            className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-200 transition-all flex items-center gap-0.5"
            title="Avanzar 1 mm"
          >
            <span>+1 mm</span>
            <ChevronRight className="w-3 h-3 text-cyan-400" />
          </button>
          <button
            onClick={() => stepBy(5)}
            className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-200 transition-all flex items-center gap-0.5"
            title="Avanzar 5 mm"
          >
            <span>+5 mm</span>
            <ChevronsRight className="w-3 h-3 text-cyan-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
