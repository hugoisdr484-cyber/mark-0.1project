import React, { useRef, useEffect, useState } from 'react';
import { Layers, ZoomIn, ZoomOut, AlertCircle, Crosshair, Sliders } from 'lucide-react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { GLASSER_NODES } from '../../data/mockGlasserData';

export const MriSliceViewer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const selectedNodeId = useNeuroStore((state) => state.selectedNodeId);
  const getActiveNode = useNeuroStore((state) => state.getActiveNode);
  const mriSequence = useNeuroStore((state) => state.mriSequence);
  const setMriSequence = useNeuroStore((state) => state.setMriSequence);
  const mriPlane = useNeuroStore((state) => state.mriPlane);
  const setMriPlane = useNeuroStore((state) => state.setMriPlane);
  const ischemiaSeverity = useNeuroStore((state) => state.ischemiaSeverity);
  const activeStrokeId = useNeuroStore((state) => state.activeStrokeId);

  const [windowLevel, setWindowLevel] = useState<number>(50); // 0 to 100 brightness/contrast
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);

  const activeNode = getActiveNode() || GLASSER_NODES[0];
  const [mniX, mniY, mniZ] = activeNode.mniCoordinates;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;

    // Clear background
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, width, height);

    ctx.save();
    // Apply Zoom centered
    ctx.translate(cx, cy);
    ctx.scale(zoomLevel, zoomLevel);
    ctx.translate(-cx, -cy);

    // Dynamic contrast factors based on windowLevel
    const contrastFactor = 0.6 + (windowLevel / 100) * 0.8;

    // 1. Draw Outer Cranial Skull Halo
    ctx.beginPath();
    ctx.ellipse(cx, cy, 76, 88, 0, 0, Math.PI * 2);
    ctx.strokeStyle = mriSequence === 'T1' ? 'rgba(180,180,190,0.35)' : 'rgba(100,110,130,0.25)';
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // 2. Draw Subcutaneous Fat / Scalp
    ctx.beginPath();
    ctx.ellipse(cx, cy, 79, 91, 0, 0, Math.PI * 2);
    ctx.strokeStyle = mriSequence === 'T1' ? 'rgba(230,230,240,0.6)' : 'rgba(80,90,100,0.2)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // 3. Draw Brain Parenchyma Surface (Cerebral Cortex Outer Border)
    ctx.beginPath();
    // Morph shape slightly depending on plane
    if (mriPlane === 'axial') {
      ctx.ellipse(cx, cy, 68, 78, 0, 0, Math.PI * 2);
    } else if (mriPlane === 'coronal') {
      ctx.ellipse(cx, cy - 3, 70, 72, 0, 0, Math.PI * 2);
    } else {
      // Sagittal
      ctx.ellipse(cx, cy, 80, 68, 0, 0, Math.PI * 2);
    }

    if (mriSequence === 'T1') {
      // T1: Cortex is intermediate grey
      ctx.fillStyle = `rgba(${Math.floor(75 * contrastFactor)}, ${Math.floor(80 * contrastFactor)}, ${Math.floor(88 * contrastFactor)}, 0.95)`;
    } else if (mriSequence === 'FLAIR') {
      // FLAIR: Brain is muted dark-grey, CSF suppressed
      ctx.fillStyle = `rgba(${Math.floor(45 * contrastFactor)}, ${Math.floor(48 * contrastFactor)}, ${Math.floor(54 * contrastFactor)}, 0.95)`;
    } else {
      // DTI Color: Directional Color tensor background
      ctx.fillStyle = '#060c18';
    }
    ctx.fill();

    // 4. Draw Subcortical White Matter Core
    ctx.beginPath();
    if (mriPlane === 'axial') {
      ctx.ellipse(cx, cy, 52, 62, 0, 0, Math.PI * 2);
    } else if (mriPlane === 'coronal') {
      ctx.ellipse(cx, cy - 2, 54, 56, 0, 0, Math.PI * 2);
    } else {
      ctx.ellipse(cx, cy, 64, 52, 0, 0, Math.PI * 2);
    }

    if (mriSequence === 'T1') {
      // T1: White matter is brighter than cortex
      ctx.fillStyle = `rgba(${Math.floor(130 * contrastFactor)}, ${Math.floor(135 * contrastFactor)}, ${Math.floor(142 * contrastFactor)}, 0.95)`;
      ctx.fill();
    } else if (mriSequence === 'FLAIR') {
      ctx.fillStyle = `rgba(${Math.floor(52 * contrastFactor)}, ${Math.floor(55 * contrastFactor)}, ${Math.floor(62 * contrastFactor)}, 0.95)`;
      ctx.fill();
    } else {
      // DTI Color Encoding:
      // Red: Transverse Commissural (Corpus Callosum)
      // Green: Anteroposterior Association (SLF, Cingulum)
      // Blue: Craniocaudal Projection (Corticospinal)
      const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, 60);
      grad.addColorStop(0, '#ef4444'); // Red core (Corpus callosum)
      grad.addColorStop(0.35, '#3b82f6'); // Blue internal capsule
      grad.addColorStop(0.7, '#22c55e'); // Green longitudinal tracts
      grad.addColorStop(1, '#a855f7'); // Peripheral mixture
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // 5. Draw Ventricles (CSF)
    // In T1 & FLAIR, CSF is dark/hypointense. In standard T2 it's hyperintense, but in FLAIR it is fully suppressed.
    ctx.fillStyle = '#03050a'; // Pitch black CSF in FLAIR and T1
    // Left Lateral Ventricle (Frontal Horn & Body)
    ctx.beginPath();
    ctx.ellipse(cx - 11, cy - 6, 6, 20, -0.15, 0, Math.PI * 2);
    ctx.fill();
    // Right Lateral Ventricle
    ctx.beginPath();
    ctx.ellipse(cx + 11, cy - 6, 6, 20, 0.15, 0, Math.PI * 2);
    ctx.fill();
    // Third Ventricle (Slit)
    ctx.beginPath();
    ctx.ellipse(cx, cy + 3, 2.5, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // 6. Draw Interhemispheric Fissure
    ctx.strokeStyle = '#020408';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 80);
    ctx.lineTo(cx, cy + 80);
    ctx.stroke();

    // 7. PATHOLOGICAL ACUTE ISCHEMIC HYPERINTENSITY (FLAIR / DWI Restricción)
    // If ischemia is active or stroke syndrome selected, draw glowing ischemic hyperintensity
    if (ischemiaSeverity > 10 || activeStrokeId) {
      const strokeRadius = 18 + (ischemiaSeverity / 100) * 22;
      // Map active node to screen coordinate
      const ischemX = cx + (mniX / 75) * 65;
      const ischemY = cy - (mniY / 90) * 65;

      const strokeGrad = ctx.createRadialGradient(
        ischemX,
        ischemY,
        2,
        ischemX,
        ischemY,
        strokeRadius
      );

      if (mriSequence === 'FLAIR') {
        // Striking bright white/pale hyperintensity on FLAIR
        strokeGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        strokeGrad.addColorStop(0.4, 'rgba(226, 232, 240, 0.85)');
        strokeGrad.addColorStop(0.75, 'rgba(56, 189, 248, 0.45)');
        strokeGrad.addColorStop(1, 'rgba(56, 189, 248, 0.0)');
        ctx.fillStyle = strokeGrad;
        ctx.beginPath();
        ctx.arc(ischemX, ischemY, strokeRadius, 0, Math.PI * 2);
        ctx.fill();
      } else if (mriSequence === 'T1') {
        // Hypointense in T1 (edema)
        ctx.fillStyle = 'rgba(20, 22, 28, 0.65)';
        ctx.beginPath();
        ctx.arc(ischemX, ischemY, strokeRadius * 0.85, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // DTI: Anisotropic diffusion breakdown (darkening / loss of tract direction)
        ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
        ctx.beginPath();
        ctx.arc(ischemX, ischemY, strokeRadius * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 8. STEREOTAXIC CROSSHAIR RETICLE (Centered on selected node)
    let screenTargetX = cx;
    let screenTargetY = cy;

    if (mriPlane === 'axial') {
      // Axial: X is Left-Right (-X=Left, +X=Right), Y is Anterior-Posterior (+Y=Ant, -Y=Post)
      screenTargetX = cx + (mniX / 75) * 65;
      screenTargetY = cy - (mniY / 90) * 75;
    } else if (mriPlane === 'coronal') {
      // Coronal: X is Left-Right, Z is Superior-Inferior
      screenTargetX = cx + (mniX / 75) * 65;
      screenTargetY = cy - (mniZ / 75) * 65;
    } else {
      // Sagittal: Y is Anterior-Posterior, Z is Superior-Inferior
      screenTargetX = cx + (mniY / 90) * 75;
      screenTargetY = cy - (mniZ / 75) * 65;
    }

    // Clamping to parenchyma
    screenTargetX = Math.max(cx - 75, Math.min(cx + 75, screenTargetX));
    screenTargetY = Math.max(cy - 85, Math.min(cy + 85, screenTargetY));

    // Reticle crosshair lines
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);

    // Horizontal crosshair line
    ctx.beginPath();
    ctx.moveTo(cx - 88, screenTargetY);
    ctx.lineTo(cx + 88, screenTargetY);
    ctx.stroke();

    // Vertical crosshair line
    ctx.beginPath();
    ctx.moveTo(screenTargetX, cy - 98);
    ctx.lineTo(screenTargetX, cy + 98);
    ctx.stroke();

    ctx.setLineDash([]); // Reset dash

    // Center targeting circle
    ctx.beginPath();
    ctx.arc(screenTargetX, screenTargetY, 6, 0, Math.PI * 2);
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(screenTargetX, screenTargetY, 2, 0, Math.PI * 2);
    ctx.fillStyle = activeNode.color || '#00f0ff';
    ctx.fill();

    ctx.restore(); // Restore zoom transform

    // 9. Standard Radiological Orientation Markers
    ctx.fillStyle = 'rgba(56, 189, 248, 0.7)';
    ctx.font = '10px monospace';
    ctx.textAlign = 'center';

    if (mriPlane === 'axial') {
      ctx.fillText('A (Anterior)', cx, 15);
      ctx.fillText('P (Posterior)', cx, height - 8);
      ctx.fillText('R', 14, cy + 4);
      ctx.fillText('L', width - 14, cy + 4);
    } else if (mriPlane === 'coronal') {
      ctx.fillText('S (Superior)', cx, 15);
      ctx.fillText('I (Inferior)', cx, height - 8);
      ctx.fillText('R', 14, cy + 4);
      ctx.fillText('L', width - 14, cy + 4);
    } else {
      ctx.fillText('S (Superior)', cx, 15);
      ctx.fillText('I (Inferior)', cx, height - 8);
      ctx.fillText('A (Ant)', 22, cy + 4);
      ctx.fillText('P (Post)', width - 24, cy + 4);
    }

    // Coordinates Stamp Box in top-left
    ctx.textAlign = 'left';
    ctx.fillStyle = '#38bdf8';
    ctx.font = '9px monospace';
    ctx.fillText(`MNI: [${mniX}, ${mniY}, ${mniZ}] mm`, 10, 28);
    ctx.fillText(`SEC: ${mriSequence} | W/L: ${windowLevel}`, 10, 40);
  }, [
    selectedNodeId,
    mriSequence,
    mriPlane,
    windowLevel,
    zoomLevel,
    ischemiaSeverity,
    activeStrokeId,
    mniX,
    mniY,
    mniZ,
    activeNode.color,
  ]);

  return (
    <div className="flex flex-col gap-2 py-1">
      {/* Sequence & Plane Selectors */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-[10px] font-mono px-0.5">
          <span className="text-slate-300 font-semibold flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-cyan-400" />
            SECUENCIA RMN
          </span>
          <span className="text-cyan-400 font-bold">CORRELACIÓN 2D EN VIVO</span>
        </div>

        {/* MRI Sequence Buttons */}
        <div className="grid grid-cols-3 gap-1 p-0.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] font-mono">
          <button
            onClick={() => setMriSequence('T1')}
            className={`py-1 rounded font-bold transition-all ${
              mriSequence === 'T1'
                ? 'bg-slate-700/60 border border-slate-400 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            T1 (ANATOMÍA)
          </button>
          <button
            onClick={() => setMriSequence('FLAIR')}
            className={`py-1 rounded font-bold transition-all ${
              mriSequence === 'FLAIR'
                ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-200 shadow-[0_0_8px_rgba(56,189,248,0.25)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            T2 / FLAIR
          </button>
          <button
            onClick={() => setMriSequence('DTI')}
            className={`py-1 rounded font-bold transition-all ${
              mriSequence === 'DTI'
                ? 'bg-gradient-to-r from-rose-900/40 via-emerald-900/40 to-blue-900/40 border border-cyan-400 text-cyan-200'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            DTI COLOR
          </button>
        </div>

        {/* Orthogonal Plane Buttons */}
        <div className="grid grid-cols-3 gap-1 text-[9px] font-mono">
          {(['axial', 'coronal', 'sagittal'] as const).map((plane) => (
            <button
              key={plane}
              onClick={() => setMriPlane(plane)}
              className={`py-0.5 rounded border transition-all uppercase ${
                mriPlane === plane
                  ? 'bg-teal-500/25 border-teal-400 text-teal-200 font-bold'
                  : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              PLANO {plane}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive 2D Canvas */}
      <div className="relative w-full h-48 md:h-52 bg-[#030712] rounded-xl border border-cyan-500/25 flex items-center justify-center overflow-hidden shadow-2xl">
        <canvas
          ref={canvasRef}
          width={300}
          height={210}
          className="w-full h-full object-contain"
        />

        {/* Overlay Controls */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-slate-950/85 px-2 py-1 rounded border border-slate-800 text-[10px] font-mono">
          <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
            <Sliders className="w-2.5 h-2.5 text-cyan-400" />
            <span>W/L:</span>
            <input
              type="range"
              min={20}
              max={100}
              value={windowLevel}
              onChange={(e) => setWindowLevel(Number(e.target.value))}
              className="w-16 h-1 accent-cyan-400 cursor-pointer"
              title="Ajuste de Ventana / Nivel (Contraste)"
            />
            <span className="text-cyan-300 font-bold">{windowLevel}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, parseFloat((z - 0.2).toFixed(1))))}
              title="Alejar corte"
              className="p-1 hover:bg-slate-800 rounded text-slate-300"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="text-[9px] text-cyan-300 px-1">{zoomLevel.toFixed(1)}x</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.8, parseFloat((z + 0.2).toFixed(1))))}
              title="Acercar corte"
              className="p-1 hover:bg-slate-800 rounded text-slate-300"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Target Node MNI & Radiologic Summary */}
      <div className="p-2 rounded bg-slate-950/70 border border-cyan-500/20 flex items-center justify-between text-[10px] font-mono">
        <div className="flex items-center gap-1.5">
          <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-white font-bold">{activeNode.shortName}</span>
          <span className="text-slate-400">({activeNode.atlasId})</span>
        </div>
        <div className="flex items-center gap-2">
          {ischemiaSeverity > 10 && (
            <span className="px-1.5 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-500/40 text-[9px] font-bold flex items-center gap-1">
              <AlertCircle className="w-2.5 h-2.5" />
              HIPERINTENSO DWI
            </span>
          )}
          <span className="text-cyan-300">Z = {mniZ > 0 ? `+${mniZ}` : mniZ}mm</span>
        </div>
      </div>
    </div>
  );
};
