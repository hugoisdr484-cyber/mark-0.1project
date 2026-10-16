import { Activity, Brain, Eye, EyeOff, RotateCcw, ShieldAlert, Cpu, PanelRightClose, PanelRightOpen, Droplet, Stethoscope, FlaskConical, Layers } from 'lucide-react';
import { useNeuroStore } from '../../store/useNeuroStore';

// Version release feature flag: Set to false for Mark 0.1 public release
const SHOW_ADVANCED_MODULES = false;

export const HeaderBar: React.FC = () => {
  const showCallouts = useNeuroStore((state) => state.showCallouts);
  const toggleCallouts = useNeuroStore((state) => state.toggleCallouts);
  const resetSimulation = useNeuroStore((state) => state.resetSimulation);
  const ischemiaSeverity = useNeuroStore((state) => state.ischemiaSeverity);
  const isPlaying = useNeuroStore((state) => state.isPlaying);
  const togglePlayPause = useNeuroStore((state) => state.togglePlayPause);
  const isRightPanelOpen = useNeuroStore((state) => state.isRightPanelOpen);
  const toggleRightPanel = useNeuroStore((state) => state.toggleRightPanel);
  const showVasculature = useNeuroStore((state) => state.showVasculature);
  const toggleVasculature = useNeuroStore((state) => state.toggleVasculature);
  const showNeurochemistry = useNeuroStore((state) => state.showNeurochemistry);
  const toggleNeurochemistry = useNeuroStore((state) => state.toggleNeurochemistry);
  const showCranialNerves = useNeuroStore((state) => state.showCranialNerves);
  const toggleCranialNerves = useNeuroStore((state) => state.toggleCranialNerves);
  const setIsClinicalQuizOpen = useNeuroStore((state) => state.setIsClinicalQuizOpen);

  return (
    <header className="absolute top-0 left-0 right-0 h-14 z-30 px-5 flex items-center justify-between glass-panel border-b border-cyan-500/20 pointer-events-auto">
      {/* Brand & Project Identity */}
      <div className="flex items-center gap-3.5">
        <div className="relative p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.25)]">
          <Brain className="w-5 h-5 animate-pulse text-cyan-300" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold tracking-wider uppercase font-mono text-white flex items-center gap-2">
              MARK 0.1 <span className="text-cyan-400 font-extrabold">//</span> NEURO-VIEWER
            </h1>
            <span className="text-[10px] uppercase font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-1.5 py-0.5 rounded">
              v0.1 Public Release
            </span>
          </div>
          <p className="text-[10px] font-mono text-slate-400 tracking-tight">
            Atlas Anatómico 3D de Alta Resolución & Cortes Tomográficos MNI-152
          </p>
        </div>
      </div>

      {/* Center Status Indicators (Gated for Advanced Versions) */}
      {SHOW_ADVANCED_MODULES && (
        <div className="hidden lg:flex items-center gap-6 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-400">ENGINE:</span>
            <span className="text-emerald-300 font-semibold">SYNAPTIC PULSE ACTIVE</span>
          </div>

          <div className="h-4 w-[1px] bg-slate-700" />

          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-slate-400">PARCELATION:</span>
            <span className="text-cyan-300 font-semibold">180 AREAS / HEMI</span>
          </div>

          <div className="h-4 w-[1px] bg-slate-700" />

          <div className="flex items-center gap-2">
            <ShieldAlert className={`w-3.5 h-3.5 ${ischemiaSeverity > 50 ? 'text-rose-400 animate-bounce' : 'text-amber-400'}`} />
            <span className="text-slate-400">ISCHEMIC BURDEN:</span>
            <span className={`font-semibold ${ischemiaSeverity > 50 ? 'text-rose-400' : 'text-amber-300'}`}>
              {ischemiaSeverity}%
            </span>
          </div>
        </div>
      )}

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        {SHOW_ADVANCED_MODULES && (
          <>
            {/* Toggle Cerebral Vasculature / Circle of Willis */}
            <button
              onClick={toggleVasculature}
              title="Alternar Árbol Arterial Cerebral 3D y Polígono de Willis"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border transition-all duration-200 ${
                showVasculature
                   ? 'bg-rose-500/25 border-rose-400 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.3)] font-bold'
                   : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:text-rose-300'
              }`}
            >
              <Droplet className={`w-3.5 h-3.5 ${showVasculature ? 'text-rose-400 animate-pulse' : 'text-slate-400'}`} />
              <span>ÁRBOL ARTERIAL</span>
            </button>

            {/* Toggle Neurochemistry & Pharmacology Module */}
            <button
              onClick={toggleNeurochemistry}
              title="Alternar Proyecciones Neuroquímicas (DA, 5-HT, NE, ACh, GABA/Glu) y Farmacología"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border transition-all duration-200 ${
                showNeurochemistry
                  ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.35)] font-bold'
                  : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:text-amber-300'
              }`}
            >
              <FlaskConical className={`w-3.5 h-3.5 ${showNeurochemistry ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
              <span>NEUROQUÍMICA / FÁRMACOS</span>
            </button>

            {/* Toggle Cranial Nerves I-XII */}
            <button
              onClick={toggleCranialNerves}
              title="Alternar Pares Craneales (I-XII), Núcleos de Tronco y Síndromes Isquémicos"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border transition-all duration-200 ${
                showCranialNerves
                  ? 'bg-purple-500/25 border-purple-400 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.35)] font-bold'
                  : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:text-purple-300'
              }`}
            >
              <Layers className={`w-3.5 h-3.5 ${showCranialNerves ? 'text-purple-400 animate-pulse' : 'text-slate-400'}`} />
              <span>PARES CRANEALES (I-XII)</span>
            </button>

            {/* Clinical Quiz / Topographic Cases Modal Toggle */}
            <button
              onClick={() => setIsClinicalQuizOpen(true)}
              title="Abrir Simulador de Casos Clínicos y Diagnóstico Topográfico"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border bg-gradient-to-r from-cyan-950/70 to-teal-950/70 border-cyan-400/50 hover:border-cyan-300 text-cyan-200 hover:text-white shadow-[0_0_12px_rgba(56,189,248,0.2)] font-semibold transition-all group"
            >
              <Stethoscope className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>CASOS CLÍNICOS</span>
            </button>

            <button
              onClick={toggleCallouts}
              title="Alternar etiquetas 3D"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border transition-all duration-200 ${
                showCallouts
                  ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-200 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                  : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {showCallouts ? <Eye className="w-3.5 h-3.5 text-cyan-400" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>ETIQUETAS 3D</span>
            </button>

            <button
              onClick={togglePlayPause}
              title={isPlaying ? 'Pausar simulación' : 'Reanudar simulación'}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border transition-all duration-200 ${
                isPlaying
                  ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200'
                  : 'bg-amber-500/20 border-amber-400/60 text-amber-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{isPlaying ? 'EN EJECUCIÓN' : 'PAUSADO'}</span>
            </button>

            <button
              onClick={toggleRightPanel}
              title={isRightPanelOpen ? 'Ocultar panel lateral derecho' : 'Mostrar panel lateral derecho'}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded border transition-all duration-200 ${
                isRightPanelOpen
                  ? 'bg-cyan-500/20 border-cyan-400/60 text-cyan-200 shadow-[0_0_10px_rgba(56,189,248,0.2)]'
                  : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {isRightPanelOpen ? <PanelRightClose className="w-3.5 h-3.5 text-cyan-400" /> : <PanelRightOpen className="w-3.5 h-3.5" />}
              <span>PANEL LATERAL</span>
            </button>
          </>
        )}

        {/* Minimalist Reset Button */}
        <button
          onClick={resetSimulation}
          title="Reiniciar simulación y vistas a valores predeterminados"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 hover:text-white transition-all shadow-[0_0_10px_rgba(56,189,248,0.15)]"
        >
          <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
          <span>RESET</span>
        </button>
      </div>
    </header>
  );
};
