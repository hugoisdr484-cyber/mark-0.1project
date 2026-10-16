import React from 'react';
import { MousePointer, Move, ZoomIn, Info } from 'lucide-react';
import { useNeuroStore } from '../../store/useNeuroStore';

export const LegendPanelLeft: React.FC = () => {
  const selectedTractId = useNeuroStore((state) => state.selectedTractId);
  const setSelectedTractId = useNeuroStore((state) => state.setSelectedTractId);

  const legendItems = [
    {
      label: 'Sustancia Gris (HCP-MMP1.0)',
      color: '#38bdf8',
      type: '12+ Parches Corticales MNI-152',
      tag: 'Corteza',
    },
    {
      label: 'Fascículo Arqueado (Lenguaje)',
      color: '#00f0ff',
      type: '20 Streamlines (Wernicke-Broca)',
      tractId: 'TRACT_ARCUATE',
      tag: 'Asociación',
    },
    {
      label: 'Fascículo Longitudinal Sup. (SLF)',
      color: '#f43f5e',
      type: '18 Streamlines (Parietofrontal)',
      tractId: 'TRACT_SLF',
      tag: 'Asociación',
    },
    {
      label: 'Fascículo Uncinado & Cíngulo',
      color: '#14b8a6',
      type: '16 Streamlines (Límbico / Memoria)',
      tractId: 'TRACT_UNCINATE',
      tag: 'Límbico',
    },
    {
      label: 'Tracto Corticoespinal (CST)',
      color: '#10b981',
      type: '24 Streamlines (Corona Radiada)',
      tractId: 'TRACT_CORTICOSPINAL',
      tag: 'Proyección',
    },
    {
      label: 'Radiaciones Ópticas (V1)',
      color: '#a855f7',
      type: '22 Streamlines (Asa de Meyer)',
      tractId: 'TRACT_OPTIC_RADIATION',
      tag: 'Proyección',
    },
    {
      label: 'Cuerpo Calloso (Comisuras)',
      color: '#00f0ff',
      type: 'Fórceps Menor, Mayor y Tronco',
      tractId: 'TRACT_CORPUS_CALLOSUM_FRONTAL',
      tag: 'Comisural',
    },
  ];

  return (
    <div className="w-80 md:w-96 glass-panel rounded-xl p-3.5 border border-cyan-500/25 flex flex-col gap-3 shadow-2xl pointer-events-auto">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-200">
            LEGEND & TRACTOGRAPHY TAXONOMY
          </h2>
        </div>
        <span className="text-[10px] font-mono text-slate-400">MULTI-FIBER</span>
      </div>

      {/* Mouse Interaction Guide */}
      <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
        <div className="bg-[#070d16]/70 rounded p-1.5 border border-cyan-500/15 flex flex-col items-center text-center gap-0.5">
          <MousePointer className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-bold text-slate-200">ROTAR</span>
          <span className="text-[9px] text-slate-400">Clic Izq</span>
        </div>

        <div className="bg-[#070d16]/70 rounded p-1.5 border border-cyan-500/15 flex flex-col items-center text-center gap-0.5">
          <ZoomIn className="w-3.5 h-3.5 text-teal-400" />
          <span className="font-bold text-slate-200">ZOOM</span>
          <span className="text-[9px] text-slate-400">Rueda</span>
        </div>

        <div className="bg-[#070d16]/70 rounded p-1.5 border border-cyan-500/15 flex flex-col items-center text-center gap-0.5">
          <Move className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-bold text-slate-200">PANEO</span>
          <span className="text-[9px] text-slate-400">Clic Der</span>
        </div>
      </div>

      {/* Anatomical Color Legend */}
      <div className="flex flex-col gap-1.5 mt-0.5">
        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider">
          ESTRUCTURAS NEUROANATÓMICAS // CLASIFICACIÓN
        </span>
        <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-1 scrollbar-none">
          {legendItems.map((item, idx) => {
            const isTractActive = item.tractId && selectedTractId === item.tractId;
            return (
              <div
                key={idx}
                onClick={() => {
                  if (item.tractId) {
                    setSelectedTractId(item.tractId);
                  }
                }}
                className={`flex items-center justify-between p-1.5 rounded transition-all cursor-pointer border ${
                  isTractActive
                    ? 'bg-cyan-500/20 border-cyan-400/50 shadow-[0_0_8px_rgba(56,189,248,0.2)]'
                    : 'bg-[#070d16]/50 border-slate-800/80 hover:border-cyan-500/30 hover:bg-[#070d16]/80'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `0 0 8px ${item.color}80`,
                    }}
                  />
                  <div>
                    <span className="text-[11px] font-mono font-medium text-slate-200 block leading-tight">
                      {item.label}
                    </span>
                    <span className="text-[9px] font-sans text-slate-400 block">
                      {item.type}
                    </span>
                  </div>
                </div>

                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400">
                  {item.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
