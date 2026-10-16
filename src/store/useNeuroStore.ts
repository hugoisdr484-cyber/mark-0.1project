import { create } from 'zustand';
import { GLASSER_NODES, WHITE_MATTER_TRACTS } from '../data/mockGlasserData';
import type { GlasserNode, WhiteMatterTract, FunctionalSystem } from '../data/mockGlasserData';
import { PHARMACOLOGICAL_AGENTS } from '../data/neurotransmittersDB';

export type CameraViewMode = 'free' | 'sagittal' | 'coronal' | 'axial';

export interface TelemetryPoint {
  time: string;
  boldSignal: number;      // % signal change
  threshold: number;       // baseline / ischemic penumbra cutoff
  membranePotential: number; // mV (-70 to +40 mV)
  actionPotentialSpike: number; // marker for spike raster
}

interface NeuroState {
  // Selection
  selectedNodeId: string | null;
  selectedTractId: string | null;
  hoveredNodeId: string | null;
  activeSystem: FunctionalSystem;
  
  // Surgical & Camera Views
  cameraView: CameraViewMode;
  isMidSagittalCut: boolean; // Hide/cut left hemisphere to inspect medial wall
  isRightPanelOpen: boolean; // Toggle right sidebar panel

  // Medical & Vascular Simulation Modes
  showVasculature: boolean;   // Toggle 3D cerebral vasculature / Circle of Willis
  activeStrokeId: string | null; // Active acute arterial occlusion syndrome
  corticalInflation: number;  // 0 - 100% (Inflation morphing)
  clippingPlane: 'none' | 'axial' | 'coronal' | 'sagittal';
  clippingOffset: number;     // MNI-152 position of the plane in mm (axial Z, coronal Y, sagittal X)
  telemetryTab: 'electrophysiology' | 'connectome' | 'mri';
  mriSequence: 'T1' | 'FLAIR' | 'DTI';
  mriPlane: 'axial' | 'coronal' | 'sagittal';
  isClinicalQuizOpen: boolean;
  selectedTractIndex: number;

  // 12 Cranial Nerves Module
  showCranialNerves: boolean;
  selectedCranialNerveId: string | null;

  // Meninges Layer Module (Duramadre, Hoz del Cerebro y Tienda)
  showMeninges: boolean;
  meningesMode: 'ghost' | 'opaque';
  toggleMeninges: () => void;
  setShowMeninges: (show: boolean) => void;
  setMeningesMode: (mode: 'ghost' | 'opaque') => void;

  // Neurochemistry & Pharmacology Module
  showNeurochemistry: boolean;
  activeDrugId: string | null;
  activeNeuroSystem: 'TODOS' | 'DA' | '5HT' | 'NE' | 'ACH' | 'GABA_GLU';

  // Sliders
  corticalOpacity: number;    // 0 - 100%
  tractDensity: number;       // 0 - 100%
  axonalSpeed: number;        // 0 - 100%
  ischemiaSeverity: number;   // 0 - 100%
  
  // Simulation control
  isPlaying: boolean;
  simulationTime: number;     // seconds
  fps: number;
  showCallouts: boolean;
  viewDividerPosition: number; // Split-view slider (0-100%, default 50%)
  isInteracting: boolean; // Flag active when user is dragging/orbiting the camera
  setIsInteracting: (val: boolean) => void;

  // Cortical View Modes (Anatomical Tissue vs Brodmann Cytoarchitecture)
  cortexColorMode: 'tissue' | 'brodmann';
  setCortexColorMode: (mode: 'tissue' | 'brodmann') => void;
  showCorticalBorders: boolean;
  setShowCorticalBorders: (show: boolean) => void;
  toggleCorticalBorders: () => void;

  // Anatomy Learning Interactive Dissection System
  isDissectionMode: boolean;
  dissectionTool: 'remove' | 'transparent' | 'isolate';
  hoveredDissectable: { id: string; name: string } | null;
  dissectedPieces: string[]; // stack of removed piece IDs for undo
  transparentPieces: string[]; // set of pieces rendered at 20% opacity
  isolatedPieceId: string | null; // if set, only this piece is visible

  setDissectionMode: (active: boolean) => void;
  toggleDissectionMode: () => void;
  setDissectionTool: (tool: 'remove' | 'transparent' | 'isolate') => void;
  setHoveredDissectable: (val: { id: string; name: string } | null) => void;
  dissectPiece: (id: string, name?: string) => void;
  togglePieceTransparent: (id: string) => void;
  isolatePiece: (id: string) => void;
  undoDissection: () => void;
  restoreAllDissected: () => void;

  // Layered Dissection & Structure Explorer System
  dissectionDepth: number; // 1 to 6
  setDissectionDepth: (depth: number) => void;
  isScalpelMode: boolean; // Interactive scalpel mode (click to dissect/hide)
  setIsScalpelMode: (active: boolean) => void;
  toggleScalpelMode: () => void;
  cerebellarViewMode: 'hemispheric' | 'lobular';
  setCerebellarViewMode: (mode: 'hemispheric' | 'lobular') => void;
  visibleStructures: Record<string, boolean>;
  toggleStructureVisibility: (id: string) => void;
  setStructureVisibility: (id: string, visible: boolean) => void;
  selectedStructureId: string | null;
  setSelectedStructureId: (id: string | null) => void;
  isolatedStructureId: string | null;
  setIsolatedStructureId: (id: string | null) => void;
  ghostModeActive: boolean;
  setGhostModeActive: (active: boolean) => void;
  toggleGhostMode: () => void;
  restoreAllStructures: () => void;

  // Telemetry buffer for Recharts
  telemetryHistory: TelemetryPoint[];

  // Actions
  setSelectedNodeId: (id: string | null) => void;
  setSelectedTractId: (id: string | null) => void;
  setHoveredNodeId: (id: string | null) => void;
  setActiveSystem: (system: FunctionalSystem) => void;
  setCameraView: (view: CameraViewMode) => void;
  toggleMidSagittalCut: () => void;
  toggleRightPanel: () => void;
  setIsRightPanelOpen: (open: boolean) => void;
  toggleVasculature: () => void;
  setShowVasculature: (show: boolean) => void;
  setActiveStrokeId: (strokeId: string | null) => void;
  setCorticalInflation: (val: number) => void;
  setClippingPlane: (plane: 'none' | 'axial' | 'coronal' | 'sagittal') => void;
  setClippingOffset: (val: number) => void;
  setTelemetryTab: (tab: 'electrophysiology' | 'connectome' | 'mri') => void;
  setMriSequence: (seq: 'T1' | 'FLAIR' | 'DTI') => void;
  setMriPlane: (plane: 'axial' | 'coronal' | 'sagittal') => void;
  setIsClinicalQuizOpen: (open: boolean) => void;
  cycleNextTractForActiveNode: () => void;
  toggleCranialNerves: () => void;
  setShowCranialNerves: (show: boolean) => void;
  setSelectedCranialNerveId: (id: string | null) => void;
  toggleNeurochemistry: () => void;
  setShowNeurochemistry: (show: boolean) => void;
  setActiveDrugId: (id: string | null) => void;
  setActiveNeuroSystem: (sys: 'TODOS' | 'DA' | '5HT' | 'NE' | 'ACH' | 'GABA_GLU') => void;
  setCorticalOpacity: (val: number) => void;
  setTractDensity: (val: number) => void;
  setAxonalSpeed: (val: number) => void;
  setIschemiaSeverity: (val: number) => void;
  togglePlayPause: () => void;
  resetSimulation: () => void;
  setFps: (fps: number) => void;
  toggleCallouts: () => void;
  setViewDividerPosition: (pos: number) => void;
  tickTelemetry: () => void;
  incrementSimulationTime: (deltaSeconds: number) => void;

  // Computed getters
  getActiveNode: () => GlasserNode | undefined;
  getActiveTract: () => WhiteMatterTract | undefined;
}

const INITIAL_TELEMETRY: TelemetryPoint[] = Array.from({ length: 28 }, (_, i) => {
  const t = (i * 0.25).toFixed(1);
  return {
    time: `${t}s`,
    boldSignal: 100 + Math.sin(i * 0.45) * 8 + (Math.random() * 2 - 1),
    threshold: 75,
    membranePotential: -70 + (i % 5 === 0 ? 95 : Math.sin(i * 0.5) * 4),
    actionPotentialSpike: i % 5 === 0 ? 30 : -70,
  };
});

export const useNeuroStore = create<NeuroState>((set, get) => ({
  selectedNodeId: 'GLASSER_44',
  selectedTractId: 'TRACT_ARCUATE',
  hoveredNodeId: null,
  activeSystem: 'TODOS',
  
  cameraView: 'free',
  isMidSagittalCut: false,
  isRightPanelOpen: true,

  showVasculature: false,
  activeStrokeId: null,
  corticalInflation: 0,
  clippingPlane: 'none',
  clippingOffset: 0,
  telemetryTab: 'electrophysiology',
  mriSequence: 'T1',
  mriPlane: 'axial',
  isClinicalQuizOpen: false,
  selectedTractIndex: 0,

  showCranialNerves: false,
  selectedCranialNerveId: 'cn3',

  showMeninges: false,
  meningesMode: 'ghost',
  toggleMeninges: () => set((state) => ({ showMeninges: !state.showMeninges })),
  setShowMeninges: (show) => set({ showMeninges: show }),
  setMeningesMode: (mode) => set({ meningesMode: mode }),

  showNeurochemistry: false,
  activeDrugId: 'DRUG_PHYSIOLOGICAL',
  activeNeuroSystem: 'TODOS',

  corticalOpacity: 100,
  tractDensity: 85,
  axonalSpeed: 70,
  ischemiaSeverity: 35,
  
  isPlaying: true,
  simulationTime: 0,
  fps: 60,
  showCallouts: true,
  viewDividerPosition: 50,

  // Cortical View Modes
  cortexColorMode: 'tissue',
  setCortexColorMode: (mode) => set({ cortexColorMode: mode }),
  showCorticalBorders: false,
  setShowCorticalBorders: (show) => set({ showCorticalBorders: show }),
  toggleCorticalBorders: () => set((state) => ({ showCorticalBorders: !state.showCorticalBorders })),

  // Layered Dissection & Structure Explorer
  dissectionDepth: 1,
  setDissectionDepth: (depth) => {
    // Progressive depth peeling:
    // Depth 1: all visible
    // Depth 2: Layer 1 (Cortex) hidden
    // Depth 3: Layer 1 & 2 (Cortex & Tracts) hidden
    // Depth 4: Layer 1, 2 & 3 (Cortex, Tracts, Ventricles/CC) hidden
    // Depth 5: Layers 1-4 hidden (Basal Ganglia off, Thalamus exposed)
    // Depth 6: Layers 1-5 hidden (Brainstem & Cerebellum isolated)
    set((state) => {
      const updated = { ...state.visibleStructures };
      updated.Hemisphere_Left = depth < 2;
      updated.Hemisphere_Right = depth < 2;
      updated.tracts = depth < 3;
      updated.Corpus_Callosum = depth < 4;
      updated.Ventricles = depth < 4;
      updated.Caudate_Putamen = depth < 5;
      updated.Hippocampus_Fornix = depth < 5;
      updated.Thalamus = depth < 6;
      updated.Brainstem = true;
      updated.Cerebellum = true;
      updated.cerebellum_hemisphere_left = true;
      updated.cerebellum_hemisphere_right = true;
      updated.cerebellum_vermis = true;
      updated.cerebellum_lobules_anterior = true;
      updated.cerebellum_crus_lobules = true;
      updated.cerebellum_lobules_posterior_inf = true;
      updated.cerebellum_flocculonodular = true;
      updated.cerebellum_arbor_vitae = true;
      updated.cerebellum_deep_nuclei = true;
      updated.brainstem_peduncles = true;
      return { dissectionDepth: depth, visibleStructures: updated };
    });
  },

  // Camera Interaction Flag (OrbitControls drag)
  isInteracting: false,
  setIsInteracting: (val) => set({ isInteracting: val }),

  // Anatomy Learning Interactive Dissection System
  isDissectionMode: false,
  dissectionTool: 'remove',
  hoveredDissectable: null,
  dissectedPieces: [],
  transparentPieces: [],
  isolatedPieceId: null,

  setDissectionMode: (active) => set({ isDissectionMode: active, hoveredDissectable: null }),
  toggleDissectionMode: () => set((s) => ({ isDissectionMode: !s.isDissectionMode, hoveredDissectable: null })),
  setDissectionTool: (tool) => set({ dissectionTool: tool }),
  setHoveredDissectable: (val) => set({ hoveredDissectable: val }),

  dissectPiece: (id, _name) =>
    set((state) => {
      if (state.dissectedPieces.includes(id)) return state;
      return {
        dissectedPieces: [...state.dissectedPieces, id],
        transparentPieces: state.transparentPieces.filter((p) => p !== id),
        hoveredDissectable: null,
      };
    }),

  togglePieceTransparent: (id) =>
    set((state) => {
      const exists = state.transparentPieces.includes(id);
      return {
        transparentPieces: exists
          ? state.transparentPieces.filter((p) => p !== id)
          : [...state.transparentPieces, id],
      };
    }),

  isolatePiece: (id) =>
    set((state) => ({
      isolatedPieceId: state.isolatedPieceId === id ? null : id,
    })),

  undoDissection: () =>
    set((state) => {
      if (state.dissectedPieces.length === 0) return state;
      const next = [...state.dissectedPieces];
      next.pop();
      return { dissectedPieces: next };
    }),

  restoreAllDissected: () =>
    set({
      dissectedPieces: [],
      transparentPieces: [],
      isolatedPieceId: null,
      hoveredDissectable: null,
    }),

  isScalpelMode: false,
  setIsScalpelMode: (active) => set({ isScalpelMode: active }),
  toggleScalpelMode: () => set((state) => ({ isScalpelMode: !state.isScalpelMode })),
  cerebellarViewMode: 'hemispheric',
  setCerebellarViewMode: (mode) => set({ cerebellarViewMode: mode }),

  visibleStructures: {
    Hemisphere_Left: true,
    Hemisphere_Right: true,
    tracts: true,
    Corpus_Callosum: true,
    Ventricles: true,
    Caudate_Putamen: true,
    Hippocampus_Fornix: true,
    Thalamus: true,
    Brainstem: true,
    Cerebellum: true,
    cerebellum_hemisphere_left: true,
    cerebellum_hemisphere_right: true,
    cerebellum_vermis: true,
    cerebellum_lobules_anterior: true,
    cerebellum_crus_lobules: true,
    cerebellum_lobules_posterior_inf: true,
    cerebellum_flocculonodular: true,
    cerebellum_arbor_vitae: true,
    cerebellum_deep_nuclei: true,
    brainstem_peduncles: true,
    vasculature: true,
    cranialNerves: true,
    meninges: true,
    falx_cerebri: true,
    tentorium_cerebelli: true,
    dural_sinuses: true,
  },

  toggleStructureVisibility: (id) =>
    set((state) => {
      const nextVal = !state.visibleStructures[id];
      const updated = {
        ...state.visibleStructures,
        [id]: nextVal,
      };
      if (id === 'cerebellum_vermis') {
        updated.Brainstem = nextVal;
      }
      if (id === 'cerebellum_deep_nuclei') {
        updated.brainstem_peduncles = nextVal;
      }
      return { visibleStructures: updated };
    }),

  setStructureVisibility: (id, visible) =>
    set((state) => ({
      visibleStructures: {
        ...state.visibleStructures,
        [id]: visible,
      },
    })),

  selectedStructureId: null,
  setSelectedStructureId: (id) => set({ selectedStructureId: id }),

  isolatedStructureId: null,
  setIsolatedStructureId: (id) => set({ isolatedStructureId: id }),

  ghostModeActive: false,
  setGhostModeActive: (active) => set({ ghostModeActive: active }),
  toggleGhostMode: () => set((state) => ({ ghostModeActive: !state.ghostModeActive })),

  restoreAllStructures: () =>
    set({
      dissectionDepth: 1,
      isolatedStructureId: null,
      selectedStructureId: null,
      ghostModeActive: false,
      dissectedPieces: [],
      transparentPieces: [],
      isolatedPieceId: null,
      hoveredDissectable: null,
      visibleStructures: {
        Hemisphere_Left: true,
        Hemisphere_Right: true,
        tracts: true,
        Corpus_Callosum: true,
        Ventricles: true,
        Caudate_Putamen: true,
        Hippocampus_Fornix: true,
        Thalamus: true,
        Brainstem: true,
        Cerebellum: true,
        cerebellum_hemisphere_left: true,
        cerebellum_hemisphere_right: true,
        cerebellum_vermis: true,
        cerebellum_lobules_anterior: true,
        cerebellum_crus_lobules: true,
        cerebellum_lobules_posterior_inf: true,
        cerebellum_flocculonodular: true,
        cerebellum_deep_nuclei: true,
        brainstem_peduncles: true,
        vasculature: true,
        cranialNerves: true,
      },
    }),

  telemetryHistory: INITIAL_TELEMETRY,

  setSelectedNodeId: (id) => {
    if (!id) {
      set({ selectedNodeId: null });
      return;
    }
    const node = GLASSER_NODES.find(n => n.id === id);
    const directTract = WHITE_MATTER_TRACTS.find(t => t.sourceId === id || t.targetId === id);
    const systemTract = node ? WHITE_MATTER_TRACTS.find(t => t.system === node.system) : null;
    const finalTract = directTract || systemTract || WHITE_MATTER_TRACTS[0];

    set({
      selectedNodeId: id,
      selectedTractId: finalTract ? finalTract.id : get().selectedTractId,
      selectedTractIndex: 0
    });
  },

  setSelectedTractId: (id) => set({ selectedTractId: id }),
  setHoveredNodeId: (id) => set({ hoveredNodeId: id }),
  
  setActiveSystem: (system) => {
    const matchingNode = system === 'TODOS'
      ? GLASSER_NODES[0]
      : GLASSER_NODES.find(n => n.system === system) || GLASSER_NODES[0];
    
    const associatedTract = WHITE_MATTER_TRACTS.find(t =>
      (system === 'TODOS' || t.system === system) && (t.sourceId === matchingNode.id || t.targetId === matchingNode.id)
    ) || (system === 'TODOS' ? WHITE_MATTER_TRACTS[0] : WHITE_MATTER_TRACTS.find(t => t.system === system));

    set({
      activeSystem: system,
      selectedNodeId: matchingNode ? matchingNode.id : get().selectedNodeId,
      selectedTractId: associatedTract ? associatedTract.id : get().selectedTractId,
      selectedTractIndex: 0
    });
  },

  setCameraView: (view) => set({ cameraView: view }),
  toggleMidSagittalCut: () => set((state) => ({ isMidSagittalCut: !state.isMidSagittalCut })),
  toggleRightPanel: () => set((state) => ({ isRightPanelOpen: !state.isRightPanelOpen })),
  setIsRightPanelOpen: (open) => set({ isRightPanelOpen: open }),

  toggleVasculature: () => set((state) => ({ showVasculature: !state.showVasculature })),
  setShowVasculature: (show) => set({ showVasculature: show }),
  setActiveStrokeId: (strokeId) => set({ activeStrokeId: strokeId }),
  setCorticalInflation: (val) => set({ corticalInflation: val }),
  setClippingPlane: (plane) => set({ clippingPlane: plane, clippingOffset: 0 }),
  setClippingOffset: (val) => set({ clippingOffset: val }),
  setTelemetryTab: (tab) => set({ telemetryTab: tab }),
  setMriSequence: (seq) => set({ mriSequence: seq }),
  setMriPlane: (plane) => set({ mriPlane: plane }),
  setIsClinicalQuizOpen: (open) => set({ isClinicalQuizOpen: open }),

  toggleCranialNerves: () => set((state) => ({ showCranialNerves: !state.showCranialNerves })),
  setShowCranialNerves: (show) => set({ showCranialNerves: show }),
  setSelectedCranialNerveId: (id) => set({ selectedCranialNerveId: id }),

  cycleNextTractForActiveNode: () => {
    const activeNode = get().getActiveNode();
    if (!activeNode || !activeNode.associatedTracts || activeNode.associatedTracts.length <= 1) return;
    const nextIdx = (get().selectedTractIndex + 1) % activeNode.associatedTracts.length;
    const nextTractRef = activeNode.associatedTracts[nextIdx];
    if (nextTractRef && nextTractRef.tractId) {
      set({
        selectedTractIndex: nextIdx,
        selectedTractId: nextTractRef.tractId
      });
    }
  },

  toggleNeurochemistry: () => set((state) => ({ showNeurochemistry: !state.showNeurochemistry })),
  setShowNeurochemistry: (show) => set({ showNeurochemistry: show }),
  setActiveDrugId: (id) => set({ activeDrugId: id }),
  setActiveNeuroSystem: (sys) => set({ activeNeuroSystem: sys }),

  setCorticalOpacity: (val) => set({ corticalOpacity: val }),
  setTractDensity: (val) => set({ tractDensity: val }),
  setAxonalSpeed: (val) => set({ axonalSpeed: val }),
  setIschemiaSeverity: (val) => set({ ischemiaSeverity: val }),
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
  
  resetSimulation: () => set({
    selectedNodeId: 'GLASSER_44',
    selectedTractId: 'TRACT_ARCUATE',
    hoveredNodeId: null,
    activeSystem: 'TODOS',
    cameraView: 'free',
    isMidSagittalCut: false,
    isRightPanelOpen: true,
    showNeurochemistry: false,
    activeDrugId: 'DRUG_PHYSIOLOGICAL',
    activeNeuroSystem: 'TODOS',
    corticalOpacity: 55,
    tractDensity: 85,
    axonalSpeed: 70,
    ischemiaSeverity: 35,
    isPlaying: true,
    simulationTime: 0,
    telemetryHistory: INITIAL_TELEMETRY
  }),

  setFps: (fps) => set({ fps }),
  toggleCallouts: () => set((state) => ({ showCallouts: !state.showCallouts })),
  setViewDividerPosition: (pos) => set({ viewDividerPosition: pos }),

  incrementSimulationTime: (deltaSeconds) => {
    if (!get().isPlaying) return;
    set((state) => ({ simulationTime: state.simulationTime + deltaSeconds }));
  },

  tickTelemetry: () => {
    const { isPlaying, simulationTime, ischemiaSeverity, telemetryHistory, selectedNodeId, activeDrugId } = get();
    if (!isPlaying) return;

    const activeNode = GLASSER_NODES.find(n => n.id === selectedNodeId) || GLASSER_NODES[0];
    const baseHz = activeNode.baseFiringRate;

    const activeDrug = PHARMACOLOGICAL_AGENTS.find(d => d.id === activeDrugId) || PHARMACOLOGICAL_AGENTS[0];
    const effectiveHz = baseHz * (activeDrug.firingRateMultiplier || 1.0);
    
    const ischemicFactor = 1 - (ischemiaSeverity / 100) * 0.78;
    const noise = (Math.random() - 0.5) * 4;
    const bold = Math.max(20, Math.min(130, (100 * ischemicFactor) + Math.sin(simulationTime * 1.8) * 12 * ischemicFactor + noise));
    
    const isSpike = Math.random() < (0.28 * (effectiveHz / 50) * ischemicFactor);
    let vm = -70 + (1 - ischemicFactor) * 25 + (activeDrug.membraneDeltaMv || 0) + Math.sin(simulationTime * 6) * 3;
    if (isSpike) {
      vm = 35 - (ischemiaSeverity / 100) * 20 + (activeDrug.membraneDeltaMv > 0 ? 5 : -5);
    }

    const newPoint: TelemetryPoint = {
      time: `${simulationTime.toFixed(1)}s`,
      boldSignal: parseFloat(bold.toFixed(1)),
      threshold: 75,
      membranePotential: parseFloat(vm.toFixed(1)),
      actionPotentialSpike: isSpike ? parseFloat(vm.toFixed(1)) : -70,
    };

    set({
      telemetryHistory: [...telemetryHistory.slice(1), newPoint],
    });
  },

  getActiveNode: () => {
    const { selectedNodeId } = get();
    return GLASSER_NODES.find((node) => node.id === selectedNodeId);
  },

  getActiveTract: () => {
    const { selectedTractId } = get();
    return WHITE_MATTER_TRACTS.find((tract) => tract.id === selectedTractId);
  },
}));

if (typeof window !== 'undefined') {
  (window as any).__NEURO_STORE__ = useNeuroStore;
}
