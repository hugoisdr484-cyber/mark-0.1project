import React from 'react';
import { useNeuroStore } from '../../store/useNeuroStore';

export const FooterStats: React.FC = () => {
  const fps = useNeuroStore((state) => state.fps);
  const simulationTime = useNeuroStore((state) => state.simulationTime);

  // Format seconds into HH:MM:SS
  const formatTime = (seconds: number) => {
    const totalSecs = Math.floor(seconds);
    const hrs = Math.floor(totalSecs / 3600).toString().padStart(2, '0');
    const mins = Math.floor((totalSecs % 3600) / 60).toString().padStart(2, '0');
    const secs = (totalSecs % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <footer className="absolute bottom-0 left-0 right-0 h-8 z-30 px-4 glass-panel border-t border-cyan-500/20 flex items-center justify-between pointer-events-auto text-[11px] font-mono select-none">
      {/* Left Pipeline Details */}
      <div className="hidden md:flex items-center gap-3 text-slate-400">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>PIPELINE:</span>
          <span className="text-slate-200">Three.js r186 / R3F</span>
        </span>
        <span className="text-slate-700">|</span>
        <span>SHADERS: <span className="text-slate-200">GLSL ES 3.0</span></span>
      </div>

      {/* Main Required Centered Text */}
      <div className="flex-1 text-center font-bold tracking-wider text-cyan-300">
        Rendering: WebGL 2.0 | Atlas: HCP-MMP1.0 (Glasser) | FPS: {fps} | Simulation Time: {formatTime(simulationTime)}
      </div>

      {/* Right Hardware / Precision Info */}
      <div className="hidden md:flex items-center gap-3 text-slate-400">
        <span>COORDINATES: <span className="text-slate-200">MNI-152</span></span>
        <span className="text-slate-700">|</span>
        <span>PARCELS: <span className="text-cyan-400">360 (Bilateral)</span></span>
      </div>
    </footer>
  );
};
