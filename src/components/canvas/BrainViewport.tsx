import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Scissors, Compass, Rotate3d, SquareDashed, Layers, ScanLine } from 'lucide-react';
import { CorticalParcels } from './CorticalParcels';
import { CerebellumBucknerParcels } from './CerebellumBucknerParcels';
import { WhiteMatterTracts } from './WhiteMatterTracts';
import { CalloutLabels } from './CalloutLabels';
import { CerebralVasculature } from './CerebralVasculature';
import { NeurochemicalPathways } from './NeurochemicalPathways';
import { CranialNerves3D } from './CranialNerves3D';
import { BrodmannBadges3D } from './BrodmannBadges3D';
import { DissectionActionDock } from './DissectionActionDock';
import { DissectionToolbar } from '../ui/DissectionToolbar';
import { CuttingPlaneVisualizer } from './CuttingPlaneVisualizer';
import { TomographicSliceHUD } from '../ui/TomographicSliceHUD';
import { AnatomicalHoverTooltip } from '../ui/AnatomicalHoverTooltip';
import { clippingMmToScene } from '../../hooks/useDissectable';
import { useNeuroStore } from '../../store/useNeuroStore';
import type { CameraViewMode } from '../../store/useNeuroStore';

// Real-time GPU Clipping Plane Manager for Axial, Coronal, and Sagittal tomography
const ClippingPlaneManager: React.FC = () => {
  const { gl } = useThree();
  const clippingPlane = useNeuroStore((state) => state.clippingPlane);
  const clippingOffset = useNeuroStore((state) => state.clippingOffset);

  const activePlane = useMemo(() => {
    if (clippingPlane === 'none') return null;
    const sceneOffset = clippingMmToScene(clippingPlane, clippingOffset);
    if (clippingPlane === 'axial') {
      return new THREE.Plane(new THREE.Vector3(0, -1, 0), sceneOffset);
    }
    if (clippingPlane === 'coronal') {
      return new THREE.Plane(new THREE.Vector3(0, 0, -1), sceneOffset);
    }
    if (clippingPlane === 'sagittal') {
      return new THREE.Plane(new THREE.Vector3(-1, 0, 0), sceneOffset);
    }
    return null;
  }, [clippingPlane, clippingOffset]);

  useEffect(() => {
    gl.localClippingEnabled = true;
    gl.clippingPlanes = activePlane ? [activePlane] : [];
  }, [gl, activePlane]);

  return null;
};

// Central Hemispheric Split Divider Plane (Glasser Atlas Left | Deep Tractography Right)
const HemisphericDivider: React.FC = () => {
  const lineRef = useRef<THREE.LineSegments>(null);
  const isMidSagittalCut = useNeuroStore((state) => state.isMidSagittalCut);

  useFrame(({ clock }) => {
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.35 + Math.sin(clock.getElapsedTime() * 2) * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Sagittal Axis Divider Line */}
      <lineSegments ref={lineRef}>
        <edgesGeometry args={[new THREE.PlaneGeometry(0.01, 5.5)]} />
        <lineBasicMaterial
          color={isMidSagittalCut ? '#f59e0b' : '#38bdf8'}
          transparent
          opacity={0.35}
          linewidth={2}
        />
      </lineSegments>

      {/* Sagittal Grid */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[0, 0.2, 0]}>
        <planeGeometry args={[6.5, 4.5]} />
        <meshBasicMaterial
          color={isMidSagittalCut ? '#f59e0b' : '#0284c7'}
          wireframe
          transparent
          opacity={isMidSagittalCut ? 0.08 : 0.04}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

// Smooth Camera Animator with lerp for Neuro-Surgical Views
const CameraAnimator: React.FC = () => {
  const cameraView = useNeuroStore((state) => state.cameraView);
  const controls = useThree((state) => state.controls) as any;

  useFrame(({ camera }) => {
    if (cameraView === 'free') return;

    const targetPos = new THREE.Vector3();
    const targetLookAt = new THREE.Vector3(0, 0.05, -0.15);

    if (cameraView === 'sagittal') {
      targetPos.set(-11.8, 0.25, -0.15); // Lateral projection with full margin
    } else if (cameraView === 'coronal') {
      targetPos.set(0.0, 0.35, 11.8);    // Frontal projection with full margin
    } else if (cameraView === 'axial') {
      targetPos.set(0.0, 12.5, -0.15);   // Superior bird's-eye view
    }

    camera.position.lerp(targetPos, 0.075);
    if (controls && controls.target) {
      controls.target.lerp(targetLookAt, 0.075);
      controls.update();
    }
  });

  return null;
};

// Isolated Frame Rate Monitor
const FrameMonitor: React.FC = () => {
  const setFps = useNeuroStore((state) => state.setFps);
  const incrementSimulationTime = useNeuroStore((state) => state.incrementSimulationTime);
  const frameCountRef = useRef(0);
  const fpsTimerRef = useRef(performance.now());

  useFrame((_, delta) => {
    incrementSimulationTime(delta);
    frameCountRef.current++;
    const now = performance.now();
    if (now - fpsTimerRef.current >= 1000) {
      const currentFps = Math.round((frameCountRef.current * 1000) / (now - fpsTimerRef.current));
      setFps(currentFps);
      frameCountRef.current = 0;
      fpsTimerRef.current = now;
    }
  });

  return null;
};

// Disables Raycasting calculations during camera dragging/orbiting (120 FPS stability)
const RaycasterGovernor: React.FC = () => {
  const isInteracting = useNeuroStore((state) => state.isInteracting);
  const { raycaster } = useThree();

  useEffect(() => {
    (raycaster as any).enabled = !isInteracting;
  }, [isInteracting, raycaster]);

  return null;
};

// Manages OrbitControls interaction state and safety window listeners
const OrbitControlsGovernor: React.FC = () => {
  const setIsInteracting = useNeuroStore((state) => state.setIsInteracting);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    const ctrl = controlsRef.current;
    if (!ctrl) return;

    const onStart = () => setIsInteracting(true);
    const onEnd = () => setIsInteracting(false);

    ctrl.addEventListener('start', onStart);
    ctrl.addEventListener('end', onEnd);

    const onGlobalUp = () => setIsInteracting(false);
    window.addEventListener('pointerup', onGlobalUp);
    window.addEventListener('mouseup', onGlobalUp);

    return () => {
      ctrl.removeEventListener('start', onStart);
      ctrl.removeEventListener('end', onEnd);
      window.removeEventListener('pointerup', onGlobalUp);
      window.removeEventListener('mouseup', onGlobalUp);
    };
  }, [setIsInteracting]);

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      rotateSpeed={0.8}
      zoomSpeed={0.9}
      panSpeed={0.8}
      minDistance={3.5}
      maxDistance={22}
      maxPolarAngle={Math.PI / 1.65}
      onStart={() => setIsInteracting(true)}
      onEnd={() => setIsInteracting(false)}
    />
  );
};

export const BrainViewport: React.FC = () => {
  const cameraView = useNeuroStore((state) => state.cameraView);
  const setCameraView = useNeuroStore((state) => state.setCameraView);
  const isMidSagittalCut = useNeuroStore((state) => state.isMidSagittalCut);
  const toggleMidSagittalCut = useNeuroStore((state) => state.toggleMidSagittalCut);
  const cortexColorMode = useNeuroStore((state) => state.cortexColorMode);
  const setCortexColorMode = useNeuroStore((state) => state.setCortexColorMode);
  const showCorticalBorders = useNeuroStore((state) => state.showCorticalBorders);
  const toggleCorticalBorders = useNeuroStore((state) => state.toggleCorticalBorders);
  const cerebellarViewMode = useNeuroStore((state) => state.cerebellarViewMode);
  const setCerebellarViewMode = useNeuroStore((state) => state.setCerebellarViewMode);
  const isDissectionMode = useNeuroStore((state) => state.isDissectionMode);
  const clippingPlane = useNeuroStore((state) => state.clippingPlane);
  const setClippingPlane = useNeuroStore((state) => state.setClippingPlane);

  const viewButtons: { label: string; mode: CameraViewMode; desc: string }[] = [
    { label: 'SAGITAL', mode: 'sagittal', desc: 'Vista Lateral' },
    { label: 'CORONAL', mode: 'coronal', desc: 'Vista Frontal' },
    { label: 'AXIAL', mode: 'axial', desc: 'Vista Superior' },
    { label: '3D LIBRE', mode: 'free', desc: 'Rotación Libre' },
  ];

  return (
    <div className={`relative w-full h-full bg-[#05080f] overflow-hidden ${isDissectionMode ? 'cursor-crosshair' : ''}`}>
      {/* Central Division UI Header & Neuro-Surgical Toolbar */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none select-none">
        {/* Master Dissection Toolbar (Anatomy Learning Peel & Hide System) */}
        <DissectionToolbar />

        {/* Selector de Dos Vistas Corticales (Tejido Puro vs Brodmann Delimitado) + Bordes / Líneas Delimitadoras */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-lg bg-[#070e18]/90 backdrop-blur-md border border-cyan-500/35 shadow-2xl text-[10px] font-mono">
          <button
            onClick={() => setCortexColorMode('tissue')}
            className={`px-3 py-1.5 rounded transition-all flex items-center gap-2 border font-bold ${
              cortexColorMode === 'tissue'
                ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.35)]'
                : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-white'
            }`}
            title="Vista de tejido anatómico puro con giros en relieve y surcos oscuros (#1e1412)"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            <span>1. ANATÓMICA PURA (TEJIDO)</span>
          </button>

          <button
            onClick={() => setCortexColorMode('brodmann')}
            className={`px-3 py-1.5 rounded transition-all flex items-center gap-2 border font-bold ${
              cortexColorMode === 'brodmann'
                ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 shadow-[0_0_14px_rgba(56,189,248,0.4)]'
                : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-white'
            }`}
            title="Mapa citoarquitectónico clásico de Brodmann / Glasser con áreas funcionales delimitadas por color y pines 3D"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            <span>2. MAPA DE BRODMANN / GLASSER</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-700/80 mx-1" />

          {/* Botón Rápido: Bordes / Líneas Delimitadoras */}
          <button
            onClick={toggleCorticalBorders}
            className={`px-2.5 py-1.5 rounded transition-all flex items-center gap-2 border font-bold ${
              showCorticalBorders
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-white'
            }`}
            title="Alternar Líneas Delimitadoras de Frontera entre Parcelas Corticales y Surcos Anatómicos Clave"
          >
            <SquareDashed className={`w-3.5 h-3.5 ${showCorticalBorders ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
            <span>[ Bordes / Líneas Delimitadoras ]</span>
            <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${showCorticalBorders ? 'bg-cyan-500/30 text-cyan-300 font-extrabold' : 'bg-slate-800 text-slate-500'}`}>
              {showCorticalBorders ? 'ON' : 'OFF'}
            </span>
          </button>

          <div className="h-4 w-[1px] bg-slate-700/80 mx-1" />

          {/* Toggle de Sub-Disección de Cerebelo Buckner */}
          <button
            onClick={() => setCerebellarViewMode(cerebellarViewMode === 'hemispheric' ? 'lobular' : 'hemispheric')}
            className={`px-2.5 py-1.5 rounded transition-all flex items-center gap-1.5 border font-bold ${
              cerebellarViewMode === 'lobular'
                ? 'bg-purple-500/25 border-purple-400 text-purple-200 shadow-[0_0_12px_rgba(168,85,247,0.35)]'
                : 'bg-teal-500/25 border-teal-400 text-teal-200 shadow-[0_0_12px_rgba(45,212,191,0.35)]'
            }`}
            title="Alternar modo de disección cerebelosa: Hemisferios + Vermis vs Lobulillos de Buckner / Diedrichsen"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>{cerebellarViewMode === 'lobular' ? 'CEREBELO: LOBULILLOS' : 'CEREBELO: HEMISFERIOS'}</span>
          </button>
        </div>

        {/* Requerimiento: Botonera de Cámara, Corte Sagital Medio e Interruptor Bisturí de Disección */}
        <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-lg bg-[#070e18]/90 backdrop-blur-md border border-cyan-500/25 shadow-xl text-[10px] font-mono">
          <div className="flex items-center gap-1 px-2 py-0.5 text-slate-400">
            <Compass className="w-3 h-3 text-cyan-400" />
            <span>VISTAS:</span>
          </div>

          {viewButtons.map((btn) => (
            <button
              key={btn.mode}
              onClick={() => setCameraView(btn.mode)}
              title={btn.desc}
              className={`px-2 py-1 rounded transition-all flex items-center gap-1 border ${
                cameraView === btn.mode
                  ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 font-bold shadow-[0_0_8px_rgba(56,189,248,0.3)]'
                  : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-white'
              }`}
            >
              <Rotate3d className="w-3 h-3 text-cyan-400/80" />
              <span>{btn.label}</span>
            </button>
          ))}

          <div className="h-4 w-[1px] bg-slate-700 mx-0.5" />

          {/* Toggle Corte Sagital */}
          <button
            onClick={toggleMidSagittalCut}
            title="Recorta el hemisferio izquierdo para exponer la cara medial (Cuerpo Calloso, Cíngulo, Tálamo)"
            className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 border font-semibold ${
              isMidSagittalCut
                ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.35)]'
                : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:text-amber-300'
            }`}
          >
            <Scissors className={`w-3 h-3 ${isMidSagittalCut ? 'text-amber-400' : 'text-slate-400'}`} />
            <span>{isMidSagittalCut ? 'RESTABLECER' : 'CORTE SAGITAL'}</span>
          </button>

          <div className="h-4 w-[1px] bg-cyan-700/60 mx-0.5" />

          {/* Selector de Planos de Corte Tomográfico (TC) */}
          <div className="flex items-center gap-1 pl-1">
            <span className="text-cyan-400 font-bold flex items-center gap-1">
              <ScanLine className="w-3 h-3 text-cyan-400" />
              <span>CORTES TC:</span>
            </span>
            <button
              onClick={() => setClippingPlane(clippingPlane === 'axial' ? 'none' : 'axial')}
              className={`px-2 py-1 rounded transition-all flex items-center gap-1 border font-bold ${
                clippingPlane === 'axial'
                  ? 'bg-cyan-500/35 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                  : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-white'
              }`}
              title="Plano de corte tomográfico Axial (Z) con slider milimétrico MNI"
            >
              <span>AXIAL (Z)</span>
            </button>
            <button
              onClick={() => setClippingPlane(clippingPlane === 'coronal' ? 'none' : 'coronal')}
              className={`px-2 py-1 rounded transition-all flex items-center gap-1 border font-bold ${
                clippingPlane === 'coronal'
                  ? 'bg-cyan-500/35 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                  : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-white'
              }`}
              title="Plano de corte tomográfico Coronal (Y) con slider milimétrico MNI"
            >
              <span>CORONAL (Y)</span>
            </button>
            <button
              onClick={() => setClippingPlane(clippingPlane === 'sagittal' ? 'none' : 'sagittal')}
              className={`px-2 py-1 rounded transition-all flex items-center gap-1 border font-bold ${
                clippingPlane === 'sagittal'
                  ? 'bg-cyan-500/35 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(0,229,255,0.4)]'
                  : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-white'
              }`}
              title="Plano de corte tomográfico Sagital (X) con slider milimétrico MNI"
            >
              <span>SAGITAL (X)</span>
            </button>
            {clippingPlane !== 'none' && (
              <button
                onClick={() => setClippingPlane('none')}
                className="px-1.5 py-1 rounded bg-rose-500/20 border border-rose-500/50 hover:bg-rose-500/40 text-rose-300 transition-all font-mono"
                title="Desactivar plano de corte tomográfico"
              >
                ✕ OFF
              </button>
            )}
          </div>
        </div>
      </div>

      {/* R3F Canvas */}
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: true,
          depth: true,
          localClippingEnabled: true,
        }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#05080f']} />
        
        <PerspectiveCamera makeDefault position={[0, 1.8, 11.8]} fov={40} />
        
        <OrbitControlsGovernor />
        <RaycasterGovernor />

        {/* Surgical Grade Balanced Soft Lighting (Warm Anatomical Tissue Preservation) */}
        <ambientLight intensity={0.72} color="#f8fafc" />
        {/* Overhead Operative Illuminator */}
        <directionalLight position={[0, 8, 6]} intensity={1.0} color="#ffffff" />
        {/* Symmetrical Left and Right Balanced Fill Lights */}
        <directionalLight position={[-6, 4, 3]} intensity={0.65} color="#ffffff" />
        <directionalLight position={[6, 4, 3]} intensity={0.65} color="#ffffff" />
        {/* Anterior Soft Fill */}
        <directionalLight position={[0, 1, 7]} intensity={0.5} color="#ffffff" />
        {/* Posterior Cyan Rim */}
        <directionalLight position={[0, -2, -7]} intensity={0.4} color="#38bdf8" />
        {/* Ventral Cranial Base Fill */}
        <pointLight position={[0, -3.5, 2.0]} intensity={0.4} color="#cbd5e1" />

        {/* Unified MNI-152 Coordinate System (Shared Root Transform) */}
        <group name="BrainRoot" position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]}>
          <CorticalParcels />
          <CerebellumBucknerParcels />
          <WhiteMatterTracts />
          <CerebralVasculature />
          <NeurochemicalPathways />
          <CranialNerves3D />
          <BrodmannBadges3D />
          <CalloutLabels />
          <HemisphericDivider />
        </group>

        <ClippingPlaneManager />
        <CuttingPlaneVisualizer />

        {/* Spatial Floor Grid */}
        <Grid
          position={[0, -2.6, 0]}
          args={[14, 14]}
          cellSize={0.6}
          cellThickness={0.8}
          cellColor="#0e2338"
          sectionSize={2.4}
          sectionThickness={1.2}
          sectionColor="#1e3a5f"
          fadeDistance={12}
          fadeStrength={1.5}
        />

        {/* Optimized Medical Grade Optical Postprocessing */}
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.92}
            luminanceSmoothing={0.2}
            intensity={0.3}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.25} darkness={0.75} />
        </EffectComposer>

        <CameraAnimator />
        <FrameMonitor />
      </Canvas>

      {/* Floating HUD Action Dock for Isolated/Dissected Structures */}
      <DissectionActionDock />

      {/* Dynamic Tomographic Slice Range Slider (TC style) */}
      <TomographicSliceHUD />

      {/* Immediate Real-Time Cyan Surgical Hover Tooltip */}
      <AnatomicalHoverTooltip />
    </div>
  );
};
