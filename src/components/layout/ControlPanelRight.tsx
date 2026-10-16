import React from 'react';
import { Sliders, Play, Pause, RotateCcw, Zap, Shield, Eye, Scissors, Layers, Droplet, FlaskConical } from 'lucide-react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { VASCULAR_TERRITORIES } from '../../data/vascularTerritoriesDB';
import { PHARMACOLOGICAL_AGENTS } from '../../data/neurotransmittersDB';
import { DissectionLayerControl } from './DissectionLayerControl';

export const ControlPanelRight: React.FC = () => {
  const corticalOpacity = useNeuroStore((state) => state.corticalOpacity);
  const setCorticalOpacity = useNeuroStore((state) => state.setCorticalOpacity);
  const tractDensity = useNeuroStore((state) => state.tractDensity);
  const setTractDensity = useNeuroStore((state) => state.setTractDensity);
  const axonalSpeed = useNeuroStore((state) => state.axonalSpeed);
  const setAxonalSpeed = useNeuroStore((state) => state.setAxonalSpeed);
  const setIschemiaSeverity = useNeuroStore((state) => state.setIschemiaSeverity);
  const isPlaying = useNeuroStore((state) => state.isPlaying);
  const togglePlayPause = useNeuroStore((state) => state.togglePlayPause);
  const resetSimulation = useNeuroStore((state) => state.resetSimulation);
  const setSelectedNodeId = useNeuroStore((state) => state.setSelectedNodeId);

  const corticalInflation = useNeuroStore((state) => state.corticalInflation);
  const setCorticalInflation = useNeuroStore((state) => state.setCorticalInflation);
  const clippingPlane = useNeuroStore((state) => state.clippingPlane);
  const setClippingPlane = useNeuroStore((state) => state.setClippingPlane);
  const clippingOffset = useNeuroStore((state) => state.clippingOffset);
  const setClippingOffset = useNeuroStore((state) => state.setClippingOffset);
  const activeStrokeId = useNeuroStore((state) => state.activeStrokeId);
  const setActiveStrokeId = useNeuroStore((state) => state.setActiveStrokeId);
  const setShowVasculature = useNeuroStore((state) => state.setShowVasculature);

  const setShowNeurochemistry = useNeuroStore((state) => state.setShowNeurochemistry);
  const activeDrugId = useNeuroStore((state) => state.activeDrugId);
  const setActiveDrugId = useNeuroStore((state) => state.setActiveDrugId);
  const activeNeuroSystem = useNeuroStore((state) => state.activeNeuroSystem);
  const setActiveNeuroSystem = useNeuroStore((state) => state.setActiveNeuroSystem);

  const activeDrug = PHARMACOLOGICAL_AGENTS.find((d) => d.id === activeDrugId) || PHARMACOLOGICAL_AGENTS[0];

  const activeStrokeTerritory = activeStrokeId
    ? Object.values(VASCULAR_TERRITORIES).find((t) => t.strokeProfile.id === activeStrokeId)
    : null;

  // Clinical scenario presets
  const applyPreset = (preset: 'healthy' | 'acm_stroke' | 'demyelinating' | 'callosal_disconnect') => {
    switch (preset) {
      case 'healthy':
        setCorticalOpacity(65);
        setTractDensity(90);
        setAxonalSpeed(75);
        setIschemiaSeverity(0);
        setSelectedNodeId('GLASSER_44');
        break;
      case 'acm_stroke':
        setCorticalOpacity(40);
        setTractDensity(80);
        setAxonalSpeed(35);
        setIschemiaSeverity(85);
        setSelectedNodeId('GLASSER_44');
        break;
      case 'demyelinating':
        setCorticalOpacity(20);
        setTractDensity(60);
        setAxonalSpeed(20);
        setIschemiaSeverity(40);
        setSelectedNodeId('GLASSER_4');
        break;
      case 'callosal_disconnect':
        setCorticalOpacity(50);
        setTractDensity(95);
        setAxonalSpeed(50);
        setIschemiaSeverity(60);
        setSelectedNodeId('GLASSER_V1');
        break;
    }
  };

  return (
    <div className="w-80 md:w-96 glass-panel rounded-xl p-4 border border-cyan-500/25 flex flex-col gap-3.5 shadow-2xl pointer-events-auto">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-200">
            SIMULATION PARAMETERS & CONTROLS
          </h2>
        </div>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
          REAL-TIME
        </span>
      </div>

      {/* Preset Clinical Scenarios */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
          ESCENARIOS CLÍNICOS PREDEFINIDOS
        </span>
        <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
          <button
            onClick={() => applyPreset('healthy')}
            className="px-2 py-1.5 rounded bg-[#070d16]/70 hover:bg-emerald-950/40 border border-slate-700/60 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-300 text-left transition-all"
          >
            ● Connectoma Fisiológico
          </button>
          <button
            onClick={() => applyPreset('acm_stroke')}
            className="px-2 py-1.5 rounded bg-[#070d16]/70 hover:bg-rose-950/40 border border-slate-700/60 hover:border-rose-500/50 text-slate-300 hover:text-rose-300 text-left transition-all"
          >
            ▲ Ictus ACM Isquémico
          </button>
          <button
            onClick={() => applyPreset('demyelinating')}
            className="px-2 py-1.5 rounded bg-[#070d16]/70 hover:bg-amber-950/40 border border-slate-700/60 hover:border-amber-500/50 text-slate-300 hover:text-amber-300 text-left transition-all"
          >
            ■ Desmielinización Focal
          </button>
          <button
            onClick={() => applyPreset('callosal_disconnect')}
            className="px-2 py-1.5 rounded bg-[#070d16]/70 hover:bg-purple-950/40 border border-slate-700/60 hover:border-purple-500/50 text-slate-300 hover:text-purple-300 text-left transition-all"
          >
            ◆ Desconexión Callosa
          </button>
        </div>
      </div>

      {/* Interactive Sliders */}
      <div className="flex flex-col gap-3 mt-1">
        {/* 1. Cortical Opacity */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              Opacidad Cortical (Sustancia Gris)
            </span>
            <span className="text-cyan-400 font-bold">{corticalOpacity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={corticalOpacity}
            onChange={(e) => setCorticalOpacity(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[9px] font-mono text-slate-500">
            <span>0% (Fascículos Expuestos)</span>
            <span>100% (Corteza Sólida)</span>
          </div>
        </div>

        {/* 2. Cortical Inflation Slider (Morphing GPU) */}
        <div className="flex flex-col gap-1 p-2 rounded bg-cyan-950/20 border border-cyan-500/25">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-cyan-200 flex items-center gap-1.5 font-bold">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Inflado Cortical / Apertura de Silvio
            </span>
            <span className="text-cyan-300 font-bold">{corticalInflation}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={corticalInflation}
            onChange={(e) => setCorticalInflation(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[9px] font-mono text-cyan-400/70">
            <span>0% (Pial Plegado)</span>
            <span>100% (Ínsula & Heschl Expuestos)</span>
          </div>
        </div>

        {/* 2b. Layered Dissection & Structure Explorer */}
        <DissectionLayerControl />

        {/* 3. Stereotaxic Clipping Planes (Planos Tomográficos) */}
        <div className="flex flex-col gap-1.5 p-2 rounded bg-slate-950/60 border border-slate-700/60">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5 text-amber-400" />
              Planos de Corte Tomográfico (MNI)
            </span>
            <span className="text-amber-300 uppercase text-[10px] font-bold">
              {clippingPlane}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1 text-[9px] font-mono">
            {(['none', 'axial', 'coronal', 'sagittal'] as const).map((plane) => (
              <button
                key={plane}
                onClick={() => {
                  setClippingPlane(plane);
                  if (plane === 'axial') setClippingOffset(14);
                  else if (plane === 'coronal') setClippingOffset(-18);
                  else if (plane === 'sagittal') setClippingOffset(0);
                  else setClippingOffset(0);
                }}
                className={`py-1 rounded border text-center uppercase transition-all ${
                  clippingPlane === plane
                    ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-bold shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                    : 'bg-slate-900 border-slate-700/70 text-slate-400 hover:text-white'
                }`}
              >
                {plane === 'none' ? 'OFF' : plane}
              </button>
            ))}
          </div>
          {clippingPlane !== 'none' && (() => {
            const min = clippingPlane === 'axial' ? -60 : clippingPlane === 'coronal' ? -100 : -80;
            const max = clippingPlane === 'axial' ? 80 : clippingPlane === 'coronal' ? 70 : 80;
            const axis = clippingPlane === 'axial' ? 'Z' : clippingPlane === 'coronal' ? 'Y' : 'X';
            const val = Math.round(clippingOffset);
            return (
              <div className="flex flex-col gap-1 mt-1 bg-slate-900/60 p-1.5 rounded border border-amber-500/20">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-300">
                  <span className="text-amber-400 font-bold uppercase">Corte {clippingPlane}:</span>
                  <span className="text-amber-300 font-bold font-mono px-1.5 py-0.2 rounded bg-amber-950/70 border border-amber-500/40">
                    {axis} = {val > 0 ? '+' : ''}{val} mm {clippingPlane === 'sagittal' && val === 0 ? '(Línea Media)' : ''}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-mono text-slate-500">{min} mm</span>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={1}
                    value={val}
                    onChange={(e) => setClippingOffset(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded appearance-none cursor-pointer accent-amber-400"
                  />
                  <span className="text-[8px] font-mono text-slate-500">+{max} mm</span>
                </div>
              </div>
            );
          })()}
        </div>

        {/* 4. Acute Stroke Vascular Territory Simulator */}
        <div className="flex flex-col gap-1.5 p-2 rounded bg-rose-950/25 border border-rose-500/30">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-rose-200 flex items-center gap-1.5 font-bold">
              <Droplet className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              Simulador de Oclusión Arterial Aguda
            </span>
            <span className="text-[9px] font-mono text-rose-300 uppercase">
              {activeStrokeId ? 'ICTUS ACTIVO' : 'NOMINAL'}
            </span>
          </div>
          <select
            value={activeStrokeId || 'none'}
            onChange={(e) => {
              const val = e.target.value === 'none' ? null : e.target.value;
              setActiveStrokeId(val);
              if (val) {
                setShowVasculature(true);
                setIschemiaSeverity(80);
                if (val === 'STROKE_MCA_SUPERIOR') setSelectedNodeId('GLASSER_44');
                if (val === 'STROKE_MCA_INFERIOR') setSelectedNodeId('GLASSER_PSL');
                if (val === 'STROKE_LENTICULOSTRIATE') setSelectedNodeId('SUBCORTICAL_STRIATUM');
                if (val === 'STROKE_ACA') setSelectedNodeId('GLASSER_6D_SMA');
                if (val === 'STROKE_PCA_CALCARINE') setSelectedNodeId('GLASSER_V1');
                if (val === 'STROKE_WALLENBERG') setSelectedNodeId('SUBCORTICAL_BRAINSTEM_NUC');
              } else {
                setIschemiaSeverity(0);
              }
            }}
            className="w-full bg-[#081220] border border-rose-500/40 rounded p-1.5 text-[10px] font-mono text-rose-200 focus:outline-none focus:border-rose-400"
          >
            <option value="none">● Flujo Cerebral Fisiológico (Sin Oclusión)</option>
            <option value="STROKE_MCA_SUPERIOR">▲ Oclusión ACM División Sup (Broca + M1)</option>
            <option value="STROKE_MCA_INFERIOR">▲ Oclusión ACM División Inf (Wernicke + Meyer)</option>
            <option value="STROKE_LENTICULOSTRIATE">■ Infarto Lacunar Lenticuloestriado (Cápsula)</option>
            <option value="STROKE_ACA">● Oclusión ACA A2 (Cíngulo + Pierna Motora)</option>
            <option value="STROKE_PCA_CALCARINE">◆ Oclusión ACP P3 (Alexia sin Agrafia + V1)</option>
            <option value="STROKE_WALLENBERG">▼ Síndrome de Wallenberg (PICA / Bulbo Lateral)</option>
          </select>
          {activeStrokeTerritory && (
            <p className="text-[9px] font-sans text-rose-200/90 leading-tight italic border-t border-rose-500/20 pt-1">
              {activeStrokeTerritory.strokeProfile.clinicalSummary}
            </p>
          )}
        </div>

        {/* 5. Neuropharmacology & Chemical Pathways Simulator */}
        <div className="flex flex-col gap-1.5 p-2 rounded bg-amber-950/20 border border-amber-500/35">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-amber-200 flex items-center gap-1.5 font-bold">
              <FlaskConical className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              Simulador Neurofarmacológico
            </span>
            <span className="text-[9px] font-mono text-amber-300 uppercase">
              {activeDrug.id !== 'DRUG_PHYSIOLOGICAL' ? activeDrug.primarySystem : 'BASAL'}
            </span>
          </div>

          {/* Drug selector */}
          <select
            value={activeDrugId || 'DRUG_PHYSIOLOGICAL'}
            onChange={(e) => {
              const drugId = e.target.value;
              setActiveDrugId(drugId);
              setShowNeurochemistry(true);
              const drug = PHARMACOLOGICAL_AGENTS.find(d => d.id === drugId);
              if (drug && drug.primarySystem !== 'NONE') {
                setActiveNeuroSystem(drug.primarySystem as any);
              }
            }}
            className="w-full bg-[#0d1624] border border-amber-500/40 rounded p-1.5 text-[10px] font-mono text-amber-200 focus:outline-none focus:border-amber-400"
          >
            {PHARMACOLOGICAL_AGENTS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.class})
              </option>
            ))}
          </select>

          {/* System filter buttons */}
          <div className="grid grid-cols-6 gap-0.5 text-[9px] font-mono pt-0.5">
            {[
              { id: 'TODOS', label: 'ALL' },
              { id: 'DA', label: 'DA' },
              { id: '5HT', label: '5-HT' },
              { id: 'NE', label: 'NE' },
              { id: 'ACH', label: 'ACh' },
              { id: 'GABA_GLU', label: 'G/G' },
            ].map((sys) => (
              <button
                key={sys.id}
                onClick={() => {
                  setActiveNeuroSystem(sys.id as any);
                  setShowNeurochemistry(true);
                }}
                className={`py-0.5 rounded border transition-all text-center ${
                  activeNeuroSystem === sys.id
                    ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-bold'
                    : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-white'
                }`}
              >
                {sys.label}
              </button>
            ))}
          </div>

          {/* Compact Drug Card */}
          {activeDrug.id !== 'DRUG_PHYSIOLOGICAL' && (
            <div className="flex flex-col gap-1 border-t border-amber-500/20 pt-1 text-[9px]">
              <div className="flex items-center justify-between text-slate-300">
                <span className="font-semibold text-amber-300">EFECTO Vm:</span>
                <span className={`font-mono font-bold ${activeDrug.membraneEffect === 'EPSP' ? 'text-emerald-400' : activeDrug.membraneEffect === 'IPSP' ? 'text-indigo-400' : 'text-cyan-300'}`}>
                  {activeDrug.membraneEffect} ({activeDrug.membraneDeltaMv > 0 ? `+${activeDrug.membraneDeltaMv}` : activeDrug.membraneDeltaMv} mV)
                </span>
              </div>
              <p className="text-slate-300 leading-snug line-clamp-2">
                {activeDrug.mechanismOfAction}
              </p>
            </div>
          )}
        </div>

        {/* 6. Tract Density */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-teal-400" />
              Densidad de Tractografía (Sust. Blanca)
            </span>
            <span className="text-teal-400 font-bold">{tractDensity}%</span>
          </div>
          <input
            type="range"
            min="10"
            max="100"
            value={tractDensity}
            onChange={(e) => setTractDensity(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
          />
        </div>

        {/* 6. Axonal Conduction Speed */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Velocidad Conducción Axonal (Mielina)
            </span>
            <span className="text-amber-400 font-bold">{axonalSpeed}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="100"
            value={axonalSpeed}
            onChange={(e) => setAxonalSpeed(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
          />
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="grid grid-cols-2 gap-2 mt-1 pt-2 border-t border-cyan-500/20">
        <button
          onClick={togglePlayPause}
          className={`flex items-center justify-center gap-2 py-2 rounded text-xs font-mono font-bold tracking-wider transition-all border ${
            isPlaying
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 hover:bg-amber-500/30'
              : 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
          }`}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isPlaying ? 'PAUSAR' : 'SIMULAR'}</span>
        </button>

        <button
          onClick={resetSimulation}
          className="flex items-center justify-center gap-2 py-2 rounded bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-mono font-bold tracking-wider transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>REINICIAR</span>
        </button>
      </div>
    </div>
  );
};
