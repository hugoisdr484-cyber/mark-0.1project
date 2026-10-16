import React from 'react';
import { ChevronRight, ChevronLeft, Sliders, Activity } from 'lucide-react';
import { BrainViewport } from './components/canvas/BrainViewport';
import { HeaderBar } from './components/layout/HeaderBar';
import { StatePanelLeft } from './components/layout/StatePanelLeft';
import { LegendPanelLeft } from './components/layout/LegendPanelLeft';
import { ControlPanelRight } from './components/layout/ControlPanelRight';
import { TelemetryPanelRight } from './components/layout/TelemetryPanelRight';
import { FooterStats } from './components/layout/FooterStats';
import { ClinicalQuizModal } from './components/modals/ClinicalQuizModal';
import { useNeuroStore } from './store/useNeuroStore';

// Feature flag for Mark 0.1 release: hides right lateral panel (controls & telemetry)
const SHOW_RIGHT_PANEL = false;

export const App: React.FC = () => {
  const isRightPanelOpen = useNeuroStore((state) => state.isRightPanelOpen);
  const toggleRightPanel = useNeuroStore((state) => state.toggleRightPanel);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#05080f] select-none">
      {/* 3D WebGL Neuro-Connectome Viewport (Always full screen) */}
      <div className="absolute inset-0 z-0">
        <BrainViewport />
      </div>

      {/* Floating Clinical UI Layer (Glassmorphism HUD) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between">
        {/* Top Header Bar */}
        <HeaderBar />

        {/* Central Workspace: Left & Right Floating HUD Paneles */}
        <div className="relative flex-1 flex justify-between px-4 pt-16 pb-10 overflow-hidden">
          {/* Left Column HUD: State Panel + Legend */}
          <div className="flex flex-col gap-3.5 max-h-full overflow-y-auto pr-1 scrollbar-none z-20">
            <StatePanelLeft />
            <LegendPanelLeft />
          </div>

          {/* Right Column HUD Container (Gated for Advanced Versions) */}
          {SHOW_RIGHT_PANEL && (
            <div className="relative flex items-start z-20 h-full">
              {/* Sliding Panel Body */}
              <div
                className={`
                  flex flex-col gap-3.5 max-h-full overflow-y-auto pl-1 scrollbar-none
                  transition-all duration-300 ease-in-out transform
                  ${isRightPanelOpen
                    ? 'translate-x-0 opacity-100 pointer-events-auto'
                    : 'translate-x-[calc(100%+36px)] opacity-0 pointer-events-none'
                  }
                `}
              >
                {/* Header Tab Bar to collapse sidebar */}
                <div className="flex items-center justify-between pb-0.5">
                  <button
                    onClick={toggleRightPanel}
                    title="Ocultar paneles laterales derechos"
                    className="px-2.5 py-1 text-[10px] font-mono rounded bg-[#09111c]/90 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 flex items-center gap-1 shadow-lg transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>OCULTAR PANEL LATERAL [›]</span>
                  </button>
                </div>

                <ControlPanelRight />
                <TelemetryPanelRight />
              </div>

              {/* Pestaña de pliegue/despliegue en el borde derecho cuando el panel está colapsado */}
              {!isRightPanelOpen && (
                <button
                  onClick={toggleRightPanel}
                  title="Desplegar Controles y Telemetría [‹]"
                  className="
                    pointer-events-auto absolute right-[-16px] top-4 flex items-center gap-2 px-2.5 py-4
                    glass-panel rounded-l-xl border-l border-y border-cyan-400/50 hover:border-cyan-300
                    bg-[#09111c]/92 hover:bg-[#0c1626] text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.25)]
                    transition-all duration-300 cursor-pointer group animate-pulse hover:animate-none
                  "
                >
                  <ChevronLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-0.5 transition-transform" />
                  <div className="flex flex-col items-center gap-1 text-[10px] font-mono tracking-widest uppercase">
                    <div className="flex items-center gap-1">
                      <Sliders className="w-3 h-3 text-cyan-400" />
                      <Activity className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="[writing-mode:vertical-rl] font-bold text-slate-200 group-hover:text-cyan-200 tracking-wider">
                      CONTROLES // TELEMETRÍA
                    </span>
                  </div>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Technical Footer Status Bar */}
        <FooterStats />
      </div>

      {/* Clinical Case / Topographic Diagnosis Interactive Modal */}
      <ClinicalQuizModal />
    </div>
  );
};

export default App;
