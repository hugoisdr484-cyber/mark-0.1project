import React from 'react';
import { Layers, Eye, EyeOff, Target, RotateCcw } from 'lucide-react';
import { useNeuroStore } from '../../store/useNeuroStore';

interface DissectionLayerDef {
  depth: number;
  name: string;
  desc: string;
  color: string;
  structures: { id: string; name: string }[];
}

export const DISSECTION_LAYERS: DissectionLayerDef[] = [
  {
    depth: 1,
    name: 'Capa 1: Corteza Cerebral',
    desc: 'Sustancia gris superficial (Corteza fsaverage6)',
    color: '#cbd5e1',
    structures: [
      { id: 'Hemisphere_Left', name: 'Corteza Izquierda' },
      { id: 'Hemisphere_Right', name: 'Corteza Derecha' },
    ],
  },
  {
    depth: 2,
    name: 'Capa 2: Vías de Sustancia Blanca',
    desc: 'Fascículos y tractografía asociativa/de proyección',
    color: '#38bdf8',
    structures: [{ id: 'tracts', name: 'Fascículos Axonales' }],
  },
  {
    depth: 3,
    name: 'Capa 3: Comisuras & Ventrículos',
    desc: 'Cuerpo Calloso y Cavidades Ventriculares',
    color: '#6fa8dc',
    structures: [
      { id: 'Corpus_Callosum', name: 'Cuerpo Calloso' },
      { id: 'Ventricles', name: 'Ventrículos Laterales' },
    ],
  },
  {
    depth: 4,
    name: 'Capa 4: Ganglios Basales & Límbico',
    desc: 'Estriado y Complejo Hipocampo-Amigdalino',
    color: '#8e7cc3',
    structures: [
      { id: 'Caudate_Putamen', name: 'Estriado (Caudado / Putamen)' },
      { id: 'Hippocampus_Fornix', name: 'Hipocampo, Fórnix & Amígdala' },
    ],
  },
  {
    depth: 5,
    name: 'Capa 5: Diencéfalo (Tálamo)',
    desc: 'Núcleos de relevo talámico y masa intermedia',
    color: '#e06666',
    structures: [{ id: 'Thalamus', name: 'Tálamo Bilateral' }],
  },
  {
    depth: 6,
    name: 'Capa 6: Tronco Encefálico y Cerebelo',
    desc: 'Estructuras infratentoriales, vermis, hemisferios y pedúnculos',
    color: '#2dd4bf',
    structures: [
      { id: 'cerebellum_hemisphere_left', name: 'Hemisferio Cerebeloso Izquierdo' },
      { id: 'cerebellum_hemisphere_right', name: 'Hemisferio Cerebeloso Derecho' },
      { id: 'cerebellum_vermis', name: 'Vermis y Tronco Encefálico' },
      { id: 'cerebellum_deep_nuclei', name: 'Núcleos Profundos y Pedúnculos' },
      { id: 'cerebellum_arbor_vitae', name: 'Árbol de la Vida (Sustancia Blanca)' },
      { id: 'cerebellum_flocculonodular', name: 'Lóbulo Floculonodular / Amígdala' },
    ],
  },
];

export const DissectionLayerControl: React.FC = () => {
  const dissectionDepth = useNeuroStore((state) => state.dissectionDepth);
  const setDissectionDepth = useNeuroStore((state) => state.setDissectionDepth);
  const visibleStructures = useNeuroStore((state) => state.visibleStructures);
  const toggleStructureVisibility = useNeuroStore((state) => state.toggleStructureVisibility);
  const isolatedStructureId = useNeuroStore((state) => state.isolatedStructureId);
  const setIsolatedStructureId = useNeuroStore((state) => state.setIsolatedStructureId);
  const restoreAllStructures = useNeuroStore((state) => state.restoreAllStructures);

  React.useEffect(() => {
    const el = document.getElementById(`layer-card-${dissectionDepth}`);
    if (el) {
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [dissectionDepth]);

  return (
    <div className="flex flex-col gap-2 p-2.5 rounded-lg bg-slate-950/70 border border-cyan-500/30 text-xs font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-1.5">
        <div className="flex items-center gap-1.5 text-cyan-300 font-bold uppercase tracking-wider text-[11px]">
          <Layers className="w-3.5 h-3.5 text-cyan-400" />
          <span>DISECCIÓN POR CAPAS ANATÓMICAS</span>
        </div>
        <button
          onClick={restoreAllStructures}
          className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 hover:bg-amber-950/50 border border-slate-700 hover:border-amber-400 text-[10px] text-amber-300 transition-colors"
          title="Restablecer todas las capas"
        >
          <RotateCcw className="w-2.5 h-2.5" />
          <span>RESET</span>
        </button>
      </div>

      {/* Master Depth Slider (Layers 1 to 6) */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-slate-300">Profundidad Quirúrgica:</span>
          <span className="text-cyan-400 font-bold">
            Capa {dissectionDepth} / 6: {DISSECTION_LAYERS[dissectionDepth - 1]?.name.split(':')[1]}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="6"
          step="1"
          value={dissectionDepth}
          onChange={(e) => setDissectionDepth(Number(e.target.value))}
          className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-cyan-400"
        />
        <div className="flex justify-between text-[8px] text-slate-500">
          <span>Superficie (Corteza)</span>
          <span>Profundo (Tronco)</span>
        </div>
      </div>

      {/* Independent Layer List with Eye & Isolate Controls */}
      <div className="flex flex-col gap-1 max-h-72 overflow-y-auto pr-0.5 custom-scrollbar">
        {DISSECTION_LAYERS.map((layer) => {
          const isCurrentDepth = layer.depth === dissectionDepth;
          return (
            <div
              key={layer.depth}
              id={`layer-card-${layer.depth}`}
              className={`p-1.5 rounded border transition-all ${
                isCurrentDepth
                  ? 'bg-cyan-950/40 border-cyan-500/50'
                  : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Layer Title Row */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: layer.color }}
                  />
                  <span className="font-semibold text-slate-200 text-[10px]">{layer.name}</span>
                </div>
                <button
                  onClick={() => setDissectionDepth(layer.depth)}
                  className={`text-[9px] px-1 py-0.2 rounded border ${
                    isCurrentDepth
                      ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 font-bold'
                      : 'border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  Ir a Capa
                </button>
              </div>

              {/* Individual Structures Inside Layer */}
              <div className="flex flex-col gap-0.5 pl-3 border-l border-slate-800">
                {layer.structures.map((st) => {
                  const isVis = visibleStructures[st.id] !== false;
                  const isIso = isolatedStructureId === st.id;

                  return (
                    <div
                      key={st.id}
                      className="flex items-center justify-between py-0.5 text-[9px] text-slate-300"
                    >
                      <span className="truncate pr-1">{st.name}</span>
                      <div className="flex items-center gap-1">
                        {/* Eye Visibility Toggle */}
                        <button
                          onClick={() => toggleStructureVisibility(st.id)}
                          className={`p-0.5 rounded transition-colors ${
                            isVis
                              ? 'text-cyan-400 hover:text-white'
                              : 'text-slate-600 hover:text-slate-400'
                          }`}
                          title={isVis ? 'Ocultar pieza' : 'Mostrar pieza'}
                        >
                          {isVis ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        </button>

                        {/* Isolate Toggle */}
                        <button
                          onClick={() => setIsolatedStructureId(isIso ? null : st.id)}
                          className={`p-0.5 rounded transition-colors ${
                            isIso
                              ? 'text-cyan-300 bg-cyan-900/60'
                              : 'text-slate-500 hover:text-cyan-400'
                          }`}
                          title="Aislar esta estructura"
                        >
                          <Target className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
