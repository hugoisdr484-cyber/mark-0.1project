import React, { useEffect, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid
} from 'recharts';
import { Activity, Zap, Network, Radio, Scan } from 'lucide-react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { MriSliceViewer } from './MriSliceViewer';

// Circular Connectogram Component (Irimia / Van Horn Style 2D Structural Matrix)
const CircularConnectogram: React.FC = () => {
  const selectedNodeId = useNeuroStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useNeuroStore((state) => state.setSelectedNodeId);
  const selectedTractId = useNeuroStore((state) => state.selectedTractId);
  const setSelectedTractId = useNeuroStore((state) => state.setSelectedTractId);

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const hubNodes = [
    { id: 'GLASSER_44', name: 'Broca 44', color: '#00f0ff', angle: 0 },
    { id: 'GLASSER_45', name: 'Broca 45', color: '#06b6d4', angle: 36 },
    { id: 'GLASSER_PSL', name: 'Wernicke', color: '#38bdf8', angle: 72 },
    { id: 'GLASSER_A1', name: 'Heschl A1', color: '#22d3ee', angle: 108 },
    { id: 'GLASSER_4', name: 'M1 Motor', color: '#10b981', angle: 144 },
    { id: 'GLASSER_3B_1', name: 'S1 Sensorial', color: '#14b8a6', angle: 180 },
    { id: 'GLASSER_V1', name: 'V1 Calcarina', color: '#a855f7', angle: 216 },
    { id: 'GLASSER_FFC', name: 'FFC Facial', color: '#d946ef', angle: 252 },
    { id: 'GLASSER_DLPFC', name: 'DLPFC', color: '#f43f5e', angle: 288 },
    { id: 'SUBCORTICAL_THALAMUS', name: 'Tálamo', color: '#f59e0b', angle: 324 }
  ];

  const chords = [
    { source: 'GLASSER_44', target: 'GLASSER_PSL', tractId: 'TRACT_ARCUATE', color: '#10b981', name: 'Fascículo Arqueado' },
    { source: 'GLASSER_44', target: 'GLASSER_45', tractId: 'TRACT_ARCUATE', color: '#06b6d4', name: 'Vía Opercular' },
    { source: 'GLASSER_4', target: 'GLASSER_3B_1', tractId: 'TRACT_SLF', color: '#22c55e', name: 'Asa Sensoriomotora' },
    { source: 'GLASSER_4', target: 'SUBCORTICAL_THALAMUS', tractId: 'TRACT_CORTICOSPINAL', color: '#0284c7', name: 'Tracto Corticoespinal' },
    { source: 'GLASSER_V1', target: 'GLASSER_FFC', tractId: 'TRACT_ILF', color: '#14b8a6', name: 'Fascículo Longitudinal Inf' },
    { source: 'GLASSER_V1', target: 'SUBCORTICAL_THALAMUS', tractId: 'TRACT_OPTIC_RADIATION', color: '#3b82f6', name: 'Radiación Óptica' },
    { source: 'GLASSER_DLPFC', target: 'GLASSER_3B_1', tractId: 'TRACT_SLF', color: '#22c55e', name: 'Red Frontoparietal SLF' },
    { source: 'GLASSER_44', target: 'GLASSER_DLPFC', tractId: 'TRACT_SLF', color: '#f43f5e', name: 'Conexión Frontal Ejecutiva' },
    { source: 'GLASSER_A1', target: 'SUBCORTICAL_THALAMUS', tractId: 'TRACT_THALAMIC_RADIATION', color: '#2563eb', name: 'Radiación Auditiva' }
  ];

  const R = 80;

  return (
    <div className="flex flex-col items-center gap-1.5 py-1">
      <div className="flex items-center justify-between w-full text-[10px] font-mono px-1">
        <span className="text-slate-300">GRAFO CONECTÓMICO STRUCTURAL (2D)</span>
        <span className="text-teal-400 font-bold">10 HUBS / 9 TRACTOS</span>
      </div>

      <div className="relative w-full h-56 bg-[#040810]/90 rounded-xl border border-teal-500/20 p-2 flex items-center justify-center shadow-inner">
        <svg viewBox="-115 -100 230 200" className="w-full h-full overflow-visible">
          {/* Central Structural Chords */}
          {chords.map((chord, idx) => {
            const srcNode = hubNodes.find((n) => n.id === chord.source)!;
            const tgtNode = hubNodes.find((n) => n.id === chord.target)!;

            const rad1 = (srcNode.angle * Math.PI) / 180;
            const x1 = Math.cos(rad1) * R;
            const y1 = Math.sin(rad1) * R;

            const rad2 = (tgtNode.angle * Math.PI) / 180;
            const x2 = Math.cos(rad2) * R;
            const y2 = Math.sin(rad2) * R;

            const isTractSelected = selectedTractId === chord.tractId;
            const isNodeRelated = selectedNodeId === chord.source || selectedNodeId === chord.target ||
                                  hoveredNode === chord.source || hoveredNode === chord.target;

            return (
              <path
                key={idx}
                d={`M ${x1} ${y1} Q 0 0 ${x2} ${y2}`}
                fill="none"
                stroke={isTractSelected ? '#00f0ff' : chord.color}
                strokeWidth={isTractSelected ? 3 : isNodeRelated ? 2 : 1}
                strokeOpacity={isTractSelected ? 1.0 : isNodeRelated ? 0.9 : 0.25}
                className="cursor-pointer transition-all duration-200 hover:stroke-white hover:stroke-width-3"
                onClick={() => {
                  setSelectedTractId(chord.tractId);
                  setSelectedNodeId(chord.source);
                }}
              >
                <title>{`${chord.name} (${srcNode.name} ↔ ${tgtNode.name})`}</title>
              </path>
            );
          })}

          {/* Peripheral Hub Nodes */}
          {hubNodes.map((node) => {
            const rad = (node.angle * Math.PI) / 180;
            const x = Math.cos(rad) * R;
            const y = Math.sin(rad) * R;

            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredNode === node.id;

            // Offset text outwards
            const textX = Math.cos(rad) * (R + 15);
            const textY = Math.sin(rad) * (R + 15);

            return (
              <g
                key={node.id}
                className="cursor-pointer group"
                onClick={() => setSelectedNodeId(node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Node Ring Halo */}
                {isSelected && (
                  <circle cx={x} cy={y} r={9} fill="none" stroke="#00f0ff" strokeWidth={1.5} className="animate-ping" />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 6 : isHovered ? 5.5 : 4}
                  fill={isSelected ? '#ffffff' : node.color}
                  stroke={isSelected ? '#00f0ff' : '#040810'}
                  strokeWidth={1.5}
                />
                <text
                  x={textX}
                  y={textY + 3}
                  textAnchor="middle"
                  className={`text-[7px] font-mono select-none ${
                    isSelected ? 'fill-cyan-200 font-bold' : 'fill-slate-400 group-hover:fill-white'
                  }`}
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex items-center justify-between w-full text-[9px] font-mono text-slate-400 px-1 pt-0.5">
        <span>Click en un arco para enfocar en 3D</span>
        <span className="text-cyan-400 flex items-center gap-1">
          <Radio className="w-2.5 h-2.5 animate-pulse" />
          SINCRONIZADO
        </span>
      </div>
    </div>
  );
};

export const TelemetryPanelRight: React.FC = () => {
  const telemetryHistory = useNeuroStore((state) => state.telemetryHistory);
  const ischemiaSeverity = useNeuroStore((state) => state.ischemiaSeverity);
  const isPlaying = useNeuroStore((state) => state.isPlaying);
  const tickTelemetry = useNeuroStore((state) => state.tickTelemetry);
  const getActiveNode = useNeuroStore((state) => state.getActiveNode);
  const telemetryTab = useNeuroStore((state) => state.telemetryTab);
  const setTelemetryTab = useNeuroStore((state) => state.setTelemetryTab);

  const activeNode = getActiveNode();

  // Decoupled telemetry ticker: updates at ~160ms interval, completely isolated from 3D R3F loop!
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      tickTelemetry();
    }, 160);
    return () => clearInterval(interval);
  }, [isPlaying, tickTelemetry]);

  // Current values
  const currentPoint = telemetryHistory[telemetryHistory.length - 1] || {
    boldSignal: 100,
    membranePotential: -70,
  };

  const isIschemicAlarm = ischemiaSeverity > 50;

  return (
    <div className="w-80 md:w-96 glass-panel rounded-xl p-3.5 border border-cyan-500/25 flex flex-col gap-2.5 shadow-2xl pointer-events-auto">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-200">
            TELEMETRÍA & CONECTOMA
          </h2>
        </div>
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
          60 FPS ISOLATED
        </span>
      </div>

      {/* Tab Switcher: Electrophysiology vs Circular Connectogram vs MRI Slice */}
      <div className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[9px] font-mono">
        <button
          onClick={() => setTelemetryTab('electrophysiology')}
          className={`py-1 rounded flex items-center justify-center gap-1 transition-all ${
            telemetryTab === 'electrophysiology'
              ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-200 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-2.5 h-2.5 text-cyan-400" />
          <span>BOLD / EEG</span>
        </button>
        <button
          onClick={() => setTelemetryTab('connectome')}
          className={`py-1 rounded flex items-center justify-center gap-1 transition-all ${
            telemetryTab === 'connectome'
              ? 'bg-teal-500/25 border border-teal-400 text-teal-200 font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Network className="w-2.5 h-2.5 text-teal-400" />
          <span>CONECTOMA 2D</span>
        </button>
        <button
          onClick={() => setTelemetryTab('mri')}
          className={`py-1 rounded flex items-center justify-center gap-1 transition-all ${
            telemetryTab === 'mri'
              ? 'bg-purple-500/25 border border-purple-400 text-purple-200 font-bold shadow-[0_0_8px_rgba(168,85,247,0.3)]'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Scan className="w-2.5 h-2.5 text-purple-400" />
          <span>CORTE RMN</span>
        </button>
      </div>

      {telemetryTab === 'connectome' ? (
        <CircularConnectogram />
      ) : telemetryTab === 'mri' ? (
        <MriSliceViewer />
      ) : (
        <>
          {/* Graph 1: Synaptic Activity / BOLD Signal */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-slate-300 flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                SEÑAL BOLD // ACTIVACIÓN HEMODINÁMICA (%)
              </span>
              <span className={`font-bold ${isIschemicAlarm ? 'text-rose-400' : 'text-cyan-300'}`}>
                {currentPoint.boldSignal}%
              </span>
            </div>

            <div className="h-24 w-full bg-[#050b14]/80 rounded border border-cyan-500/15 p-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={telemetryHistory} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 2" stroke="rgba(56, 189, 248, 0.08)" />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 8, fill: '#64748b', fontFamily: 'monospace' }}
                    interval={6}
                    axisLine={{ stroke: '#1e293b' }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[30, 130]}
                    tick={{ fontSize: 8, fill: '#64748b', fontFamily: 'monospace' }}
                    axisLine={{ stroke: '#1e293b' }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#09111c',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontFamily: 'monospace',
                      color: '#e2e8f0',
                    }}
                  />
                  <ReferenceLine
                    y={75}
                    stroke="#f43f5e"
                    strokeDasharray="3 3"
                    label={{
                      value: 'Umbral Penumbra (75%)',
                      fill: '#f43f5e',
                      fontSize: 8,
                      position: 'insideBottomRight',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="boldSignal"
                    stroke={isIschemicAlarm ? '#f43f5e' : '#38bdf8'}
                    strokeWidth={2}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Graph 2: Membrane Potential (Action Potentials) */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-slate-300 flex items-center gap-1.5 font-semibold">
                <Zap className="w-3 h-3 text-amber-400" />
                POTENCIAL DE MEMBRANA NEURONAL [Vm]
              </span>
              <span className="font-bold text-amber-300 font-mono">
                {currentPoint.membranePotential} mV
              </span>
            </div>

            <div className="h-24 w-full bg-[#050b14]/80 rounded border border-cyan-500/15 p-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={telemetryHistory} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="2 2" stroke="rgba(56, 189, 248, 0.08)" />
                  <XAxis
                    dataKey="time"
                    tick={{ fontSize: 8, fill: '#64748b', fontFamily: 'monospace' }}
                    interval={6}
                    axisLine={{ stroke: '#1e293b' }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[-85, 45]}
                    tick={{ fontSize: 8, fill: '#64748b', fontFamily: 'monospace' }}
                    axisLine={{ stroke: '#1e293b' }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#09111c',
                      border: '1px solid rgba(245, 158, 11, 0.4)',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontFamily: 'monospace',
                      color: '#e2e8f0',
                    }}
                  />
                  <ReferenceLine
                    y={-55}
                    stroke="#eab308"
                    strokeDasharray="2 2"
                    label={{
                      value: 'Disparo (-55mV)',
                      fill: '#eab308',
                      fontSize: 8,
                      position: 'insideTopLeft',
                    }}
                  />
                  <Line
                    type="linear"
                    dataKey="membranePotential"
                    stroke="#10b981"
                    strokeWidth={1.8}
                    dot={false}
                    isAnimationActive={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* Bio-Signal Diagnostic Footer */}
      <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 pt-1 border-t border-slate-800">
        <span>ELECTRODO VIRTUAL: {activeNode?.shortName}</span>
        <span className="text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          IMPEDANCIA: 12.4 kΩ
        </span>
      </div>
    </div>
  );
};
