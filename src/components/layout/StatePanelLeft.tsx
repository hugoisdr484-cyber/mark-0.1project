import React, { useState, useMemo } from 'react';
import { Activity, Layers, Network, Zap, Droplet, Stethoscope, Search, Compass, RefreshCw, Download, Check, FlaskConical, Send, Grid, FolderTree, ChevronDown, ChevronRight, X } from 'lucide-react';
import { useNeuroStore } from '../../store/useNeuroStore';
import { GLASSER_NODES, GLASSER_MODULES_22 } from '../../data/mockGlasserData';
import type { FunctionalSystem } from '../../data/mockGlasserData';
import { PHARMACOLOGICAL_AGENTS } from '../../data/neurotransmittersDB';
import { CRANIAL_NERVES_DB, BRAINSTEM_SYNDROMES } from '../../data/cranialNervesDB';
import { getStructureInfo, mniForSide, glasserBrodmannLabel } from '../../data/structureInfoDB';
import deepCatalog from '../../data/deepNucleiCatalog.json';
import { DISSECTABLE_SUBCORTICALS, DISSECTABLE_GYRI } from '../canvas/CorticalParcels';

export const StatePanelLeft: React.FC = () => {
  const selectedNodeId = useNeuroStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useNeuroStore((state) => state.setSelectedNodeId);
  const activeSystem = useNeuroStore((state) => state.activeSystem);
  const setActiveSystem = useNeuroStore((state) => state.setActiveSystem);
  const getActiveNode = useNeuroStore((state) => state.getActiveNode);
  const ischemiaSeverity = useNeuroStore((state) => state.ischemiaSeverity);
  const showNeurochemistry = useNeuroStore((state) => state.showNeurochemistry);
  const activeDrugId = useNeuroStore((state) => state.activeDrugId);
  const showCranialNerves = useNeuroStore((state) => state.showCranialNerves);
  const setShowCranialNerves = useNeuroStore((state) => state.setShowCranialNerves);
  const selectedCranialNerveId = useNeuroStore((state) => state.selectedCranialNerveId);
  const setSelectedCranialNerveId = useNeuroStore((state) => state.setSelectedCranialNerveId);

  const [searchQuery, setSearchQuery] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [ankiStatus, setAnkiStatus] = useState<string | null>(null);
  const [browserViewMode, setBrowserViewMode] = useState<'grid' | 'modules'>('grid');
  const [expandedModuleNum, setExpandedModuleNum] = useState<number | null>(null);

  const selectedStructureId = useNeuroStore((state) => state.selectedStructureId);
  const activeNode = getActiveNode() || GLASSER_NODES[0];
  const selectedTractIndex = useNeuroStore((state) => state.selectedTractIndex);
  const cycleNextTractForActiveNode = useNeuroStore((state) => state.cycleNextTractForActiveNode);

  // Compute unified structure representation (supports Glasser, Subcortical, Thalamic Nuclei, and Brainstem)
  const structureData = useMemo(() => {
    if (selectedStructureId) {
      const match = getStructureInfo(selectedStructureId);
      const deep = (deepCatalog as any[]).find((d) => d.id === selectedStructureId);
      const sub = DISSECTABLE_SUBCORTICALS.find((s) => s.id === selectedStructureId);
      const gyrus = DISSECTABLE_GYRI.find((g) => `${g.id}_L` === selectedStructureId || `${g.id}_R` === selectedStructureId);

      const name = deep?.name || sub?.name || (gyrus ? `${gyrus.name} (${selectedStructureId.endsWith('_L') ? 'Izq' : 'Der'})` : selectedStructureId);
      const color = deep?.color || sub?.color || gyrus?.color || '#00e5ff';

      if (match) {
        const { info, side } = match;
        const mni = mniForSide(info, side);
        return {
          isCustomStructure: true,
          atlasId: selectedStructureId,
          name,
          lobe: info.lobe,
          mniCoordinates: mni,
          brodmann: info.brodmann !== '—' ? info.brodmann : 'Sin equivalente cortical directo',
          bloodSupply: info.artery,
          cognitiveFunction: info.func,
          clinicalCorrelation: info.clinical,
          color,
        };
      }

      return {
        isCustomStructure: true,
        atlasId: selectedStructureId,
        name,
        lobe: deep?.category || sub?.category || gyrus?.category || 'Subcortical',
        mniCoordinates: [0, 0, 0] as [number, number, number],
        brodmann: 'Estructura Subcortical / Tronco',
        bloodSupply: 'Ramas nutricias perforantes / Vertebrobasilar',
        cognitiveFunction: name,
        clinicalCorrelation: 'Compromiso vascular o degenerativo focal.',
        color,
      };
    }

    return {
      isCustomStructure: false,
      atlasId: activeNode.atlasId,
      name: activeNode.name,
      lobe: activeNode.lobe,
      mniCoordinates: activeNode.mniCoordinates,
      brodmann: glasserBrodmannLabel(activeNode.atlasId, activeNode.name),
      bloodSupply: activeNode.bloodSupply,
      cognitiveFunction: activeNode.cognitiveFunction,
      clinicalCorrelation: activeNode.clinicalCorrelation,
      color: activeNode.color,
    };
  }, [selectedStructureId, activeNode]);

  const activeCranialNerve = useMemo(() => {
    return CRANIAL_NERVES_DB.find((n) => n.id === selectedCranialNerveId) || CRANIAL_NERVES_DB[2];
  }, [selectedCranialNerveId]);

  const associatedSyndromes = useMemo(() => {
    return BRAINSTEM_SYNDROMES.filter((s) => activeCranialNerve.associatedSyndromes.includes(s.id));
  }, [activeCranialNerve]);

  const activeDrug = useMemo(() => {
    return PHARMACOLOGICAL_AGENTS.find((d) => d.id === activeDrugId) || PHARMACOLOGICAL_AGENTS[0];
  }, [activeDrugId]);

  const tractList = activeNode.associatedTracts || [activeNode.associatedTract];
  const currentTract = tractList[selectedTractIndex % tractList.length] || activeNode.associatedTract;

  const handleExportAnki = () => {
    if (showCranialNerves) {
      const clozeFront = `{{c1::${activeCranialNerve.name}}} (Par {{c2::${activeCranialNerve.romanNumeral}}}) con origen real en {{c3::${activeCranialNerve.realOrigin}}} y salida por {{c4::${activeCranialNerve.skullForamen}}}.`;
      const clozeBack = `<b>Exploración / Reflejos:</b> ${activeCranialNerve.clinicalExploration}<br><br><b>Déficit Clínico:</b> ${activeCranialNerve.clinicalDeficit}<br><br><b>Componentes:</b> ${activeCranialNerve.functionalComponents.join(', ')}`;
      const tsvContent = `"${clozeFront}"\t"${clozeBack}"\t"Neuro-Connectome::Mark1::Pares_Craneales"\n`;
      const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Anki_ParCraneal_${activeCranialNerve.romanNumeral}.tsv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      return;
    }

    const clozeFront = `{{c1::${activeNode.name}}} (Atlas ID: {{c2::${activeNode.atlasId}}}) en lóbulo {{c3::${activeNode.lobe}}} irrigada por {{c4::${activeNode.bloodSupply}}} cuya función es {{c5::${activeNode.cognitiveFunction}}}.`;
    const clozeBack = `<b>Fascículo Asociado:</b> ${currentTract.name} (${currentTract.category}, ${currentTract.fibersCount} fibras, ${currentTract.conductionVelocity} m/s).<br><br><b>Correlación Clínica:</b> ${activeNode.clinicalCorrelation}<br><br><b>Desconexión:</b> ${currentTract.clinicalDisconnectionSummary}`;
    const tsvContent = `"${clozeFront}"\t"${clozeBack}"\t"Neuro-Connectome::Mark1::${activeNode.system}"\n`;
    
    const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Anki_Flashcard_${activeNode.id}.tsv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSendAnkiConnect = async () => {
    if (showCranialNerves) {
      const clozeText = `{{c1::${activeCranialNerve.name}}} (Par {{c2::${activeCranialNerve.romanNumeral}}}) emerge por {{c3::${activeCranialNerve.skullForamen}}}.<br><br><b>Origen Real:</b> {{c4::${activeCranialNerve.realOrigin}}}.<br><br><b>Déficit Lesional:</b> {{c5::${activeCranialNerve.clinicalDeficit}}}.`;
      const extraInfo = `<b>Semiología & Reflejos:</b> ${activeCranialNerve.clinicalExploration}<br><b>Categoría:</b> ${activeCranialNerve.functionalCategory.join(', ')}<br><b>Componentes:</b> ${activeCranialNerve.functionalComponents.join(', ')}<br><b>Síndromes Asociados:</b> ${activeCranialNerve.associatedSyndromes.join(', ') || 'Ninguno'}`;
      const payload = {
        action: 'addNote',
        version: 6,
        params: {
          note: {
            deckName: 'Mark1::Pares_Craneales',
            modelName: 'Cloze',
            fields: {
              Text: clozeText,
              Extra: extraInfo,
            },
            options: { allowDuplicate: true },
            tags: ['Mark1', 'ParesCraneales', `Par_${activeCranialNerve.romanNumeral}`],
          },
        },
      };

      try {
        const res = await fetch('http://127.0.0.1:8765', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setAnkiStatus(`¡PAR ${activeCranialNerve.romanNumeral} ENVIADO A ANKI!`);
        setTimeout(() => setAnkiStatus(null), 3500);
      } catch {
        setAnkiStatus('Anki cerrado. Descargando .tsv compatible...');
        handleExportAnki();
        setTimeout(() => setAnkiStatus(null), 4000);
      }
      return;
    }

    const clozeText = `{{c1::${activeNode.name}}} (ID: {{c2::${activeNode.atlasId}}}) en lóbulo {{c3::${activeNode.lobe}}} irrigada por {{c4::${activeNode.bloodSupply}}}.<br><br><b>Fascículo Conectado:</b> {{c5::${currentTract.name}}}.<br><br><b>Correlación Clínica:</b> {{c6::${activeNode.clinicalCorrelation}}}.`;
    const extraInfo = `<b>Función Cognitiva Primaria:</b> ${activeNode.cognitiveFunction}<br><b>Desconexión:</b> ${currentTract.clinicalDisconnectionSummary}<br><b>Sistema Funcional:</b> ${activeNode.system}`;

    const payload = {
      action: 'addNote',
      version: 6,
      params: {
        note: {
          deckName: 'Mark1::Neuroanatomia_Glasser',
          modelName: 'Cloze',
          fields: {
            Text: clozeText,
            Extra: extraInfo,
          },
          options: {
            allowDuplicate: true,
          },
          tags: ['Mark1', 'Neuroanatomy', activeNode.system.replace(/\s+/g, '_')],
        },
      },
    };

    try {
      const res = await fetch('http://127.0.0.1:8765', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAnkiStatus('¡TARJETA ENVIADA A ANKI CON ÉXITO!');
      setTimeout(() => setAnkiStatus(null), 3500);
    } catch {
      setAnkiStatus('Anki cerrado (localhost:8765). Descargando .tsv compatible...');
      handleExportAnki();
      setTimeout(() => setAnkiStatus(null), 4000);
    }
  };

  const systems: FunctionalSystem[] = [
    'TODOS',
    'Lenguaje & Auditivo',
    'Motor / Somatosensorial',
    'Visual',
    'Límbico / Memoria',
    'Red Ejecutiva & Saliencia',
  ];

  // Filter nodes by active system & search query
  const filteredNodes = useMemo(() => {
    return GLASSER_NODES.filter((node) => {
      const matchesSystem = activeSystem === 'TODOS' || node.system === activeSystem;
      const matchesSearch =
        node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.atlasId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSystem && matchesSearch;
    });
  }, [activeSystem, searchQuery]);

  const effectiveConnectivity =
    ischemiaSeverity > 75
      ? 'Desconexión Severa'
      : ischemiaSeverity > 35
      ? 'Penumbra Isquémica'
      : activeNode.connectivityStatus;

  const effectiveFiringRate = Math.max(
    4.2,
    activeNode.baseFiringRate * (1 - (ischemiaSeverity / 100) * 0.78)
  );

  return (
    <div className="w-80 md:w-96 glass-panel rounded-xl p-4 border border-cyan-500/25 flex flex-col gap-3 shadow-2xl pointer-events-auto">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#38bdf8]" />
          <h2 className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-200">
            {showCranialNerves ? 'PARES CRANEALES & TALLO' : 'NEUROANATOMICAL STATE PANEL'}
          </h2>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 font-bold shadow-[0_0_8px_rgba(56,189,248,0.2)]">
          {showCranialNerves ? `PAR ${activeCranialNerve.romanNumeral}` : structureData.atlasId}
        </span>
      </div>

      {/* Mode Toggle Switch */}
      <div className="grid grid-cols-2 gap-1 p-0.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[10px] font-mono">
        <button
          onClick={() => setShowCranialNerves(false)}
          className={`py-1 rounded font-bold transition-all ${
            !showCranialNerves
              ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-200 shadow-[0_0_8px_rgba(56,189,248,0.25)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          CORTEZA GLASSER
        </button>
        <button
          onClick={() => setShowCranialNerves(true)}
          className={`py-1 rounded font-bold transition-all ${
            showCranialNerves
              ? 'bg-purple-500/25 border border-purple-400 text-purple-200 shadow-[0_0_8px_rgba(168,85,247,0.35)]'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          PARES CRANEALES (I-XII)
        </button>
      </div>

      {/* ========================================================= */}
      {/* 1. MODO PARES CRANEALES & SÍNDROMES DE TRONCO ENCEFÁLICO   */}
      {/* ========================================================= */}
      {showCranialNerves ? (
        <div className="flex flex-col gap-2.5">
          {/* Quick Roman Numeral Selector (6x2 Grid: All 12 nerves visible at a glance) */}
          <div className="grid grid-cols-6 gap-1 text-[9px] font-mono">
            {CRANIAL_NERVES_DB.map((cn) => {
              const isSel = cn.id === activeCranialNerve.id;
              return (
                <button
                  key={cn.id}
                  onClick={() => setSelectedCranialNerveId(cn.id)}
                  title={`${cn.name} (${cn.latinName})`}
                  className={`py-1 px-0.5 rounded transition-all text-center border font-bold ${
                    isSel
                      ? 'shadow-[0_0_8px_rgba(168,85,247,0.4)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  style={isSel ? { backgroundColor: `${cn.color}35`, borderColor: cn.color, color: cn.color } : {}}
                >
                  {cn.romanNumeral}
                </button>
              );
            })}
          </div>

          {/* Cranial Nerve Card */}
          <div className="glass-panel-subtle rounded-lg p-3 flex flex-col gap-2 border border-purple-500/30">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[9px] font-mono text-purple-300 font-bold tracking-wider uppercase">
                  PAR {activeCranialNerve.romanNumeral} • {activeCranialNerve.latinName}
                </span>
                <h3 className="text-sm font-bold text-white font-mono leading-tight mt-0.5">
                  {activeCranialNerve.name}
                </h3>
              </div>
              <span
                className="w-3.5 h-3.5 rounded-full mt-1 border border-white/20 shrink-0 shadow-sm"
                style={{ backgroundColor: activeCranialNerve.color, boxShadow: `0 0 8px ${activeCranialNerve.color}` }}
              />
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-1 mt-0.5">
              {activeCranialNerve.functionalCategory.map((cat) => (
                <span
                  key={cat}
                  className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-purple-950/80 border border-purple-500/40 text-purple-300 font-bold"
                >
                  {cat}
                </span>
              ))}
              {activeCranialNerve.functionalComponents.map((comp) => (
                <span
                  key={comp}
                  className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-slate-900/90 border border-slate-700 text-slate-300"
                >
                  {comp}
                </span>
              ))}
            </div>

            {/* Origins and Foramen Details */}
            <div className="flex flex-col gap-1 text-[10px] bg-slate-950/70 p-2 rounded border border-purple-500/20 font-mono">
              <div>
                <span className="text-purple-300 font-bold">Origen Real: </span>
                <span className="text-slate-200">{activeCranialNerve.realOrigin}</span>
              </div>
              <div>
                <span className="text-purple-300 font-bold">Origen Aparente: </span>
                <span className="text-slate-300">{activeCranialNerve.apparentOrigin}</span>
              </div>
              <div>
                <span className="text-cyan-300 font-bold">Foramen Cráneo: </span>
                <span className="text-cyan-200 font-semibold">{activeCranialNerve.skullForamen}</span>
              </div>
            </div>

            {/* Clinical Exploration & Reflexes */}
            <div className="text-[10px] font-sans leading-relaxed text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800">
              <strong className="text-emerald-400 font-mono text-[9px] block uppercase mb-0.5">
                Exploración Clínica & Reflejos:
              </strong>
              {activeCranialNerve.clinicalExploration}
            </div>

            {/* Clinical Deficit */}
            <div className="text-[10px] font-sans leading-relaxed text-slate-300 bg-rose-950/25 p-2 rounded border border-rose-500/30">
              <strong className="text-rose-400 font-mono text-[9px] block uppercase mb-0.5">
                Déficit Lesional / Semiología:
              </strong>
              {activeCranialNerve.clinicalDeficit}
            </div>
          </div>

          {/* Associated Brainstem Stroke Syndromes */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] font-mono uppercase text-slate-400 tracking-wider flex items-center justify-between">
              <span>SÍNDROMES ISQUÉMICOS DE TRONCO</span>
              <span className="text-amber-400 font-bold">{associatedSyndromes.length} ASOCIADOS</span>
            </span>

            {associatedSyndromes.length === 0 ? (
              <div className="p-2 rounded bg-slate-950/50 border border-slate-800 text-[10px] font-mono text-slate-400 text-center">
                Nervio de origen telencefálico / quiasmático sin síndrome de tronco primario directo.
              </div>
            ) : (
              associatedSyndromes.map((syndrome) => (
                <div
                  key={syndrome.id}
                  className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/40 flex flex-col gap-1 shadow"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-amber-300">
                      {syndrome.name}
                    </span>
                    <span className="text-[8px] font-mono px-1 py-0.5 rounded bg-amber-900/60 text-amber-200 border border-amber-500/50">
                      {syndrome.level}
                    </span>
                  </div>
                  <div className="text-[9px] font-mono text-slate-400">
                    <strong>Territorio:</strong> {syndrome.vascularTerritory}
                  </div>
                  <div className="text-[10px] font-sans text-slate-300 leading-snug">
                    {syndrome.clinicalPresentation}
                  </div>
                  <div className="mt-1 p-1 rounded bg-slate-950/80 border border-amber-500/30 text-[9px] font-mono text-amber-300 font-semibold">
                    ⚡ {syndrome.keySign}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* 2. MODO CORTEZA GLASSER & FASCÍCULOS DE ASOCIACIÓN         */
        /* ========================================================= */
        <div className="flex flex-col gap-3">
          {/* System Tabs Filter (Clean flex-wrap with area counters - No horizontal cutoffs) */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 uppercase tracking-wider">
              <span>SISTEMA FUNCIONAL</span>
              <span className="text-cyan-400 font-bold">{filteredNodes.length} / 180 ÁREAS</span>
            </div>
            <div className="flex flex-wrap gap-1 text-[9px] font-mono">
              {systems.map((sys) => {
                const count = sys === 'TODOS'
                  ? GLASSER_NODES.filter((n) => n.hemisphere === 'left').length
                  : GLASSER_NODES.filter((n) => n.system === sys && n.hemisphere === 'left').length;
                const isAct = activeSystem === sys;
                return (
                  <button
                    key={sys}
                    onClick={() => setActiveSystem(sys)}
                    className={`px-2 py-1 rounded transition-all border flex items-center gap-1 font-mono ${
                      isAct
                        ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 font-bold shadow-[0_0_8px_rgba(56,189,248,0.25)]'
                        : 'bg-slate-900/60 border-slate-700/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>{sys}</span>
                    <span className={`text-[8px] px-1 rounded ${isAct ? 'bg-cyan-400/30 text-white' : 'bg-slate-800 text-slate-400'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Input for Glasser Atlas with Clear Button */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar región (ej. Broca, V1, M1, Cíngulo, 44)..."
              className="w-full bg-[#070d16]/80 border border-slate-700/80 focus:border-cyan-400/80 rounded pl-8 pr-7 py-1.5 text-[11px] font-mono text-slate-200 placeholder-slate-500 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Glasser 180 Browser Controls (Cuadrícula vs. 22 Módulos) */}
          <div className="flex items-center justify-between bg-slate-950/80 p-1 rounded-lg border border-slate-800 text-[10px] font-mono">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setBrowserViewMode('grid')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all ${
                  browserViewMode === 'grid'
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-200 font-bold shadow-[0_0_6px_rgba(56,189,248,0.3)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Grid className="w-3 h-3" />
                <span>CUADRÍCULA (180)</span>
              </button>
              <button
                onClick={() => setBrowserViewMode('modules')}
                className={`flex items-center gap-1 px-2 py-0.5 rounded transition-all ${
                  browserViewMode === 'modules'
                    ? 'bg-purple-500/25 border border-purple-400 text-purple-200 font-bold shadow-[0_0_6px_rgba(168,85,247,0.3)]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FolderTree className="w-3 h-3" />
                <span>22 MÓDULOS</span>
              </button>
            </div>
            <span className="text-[9px] text-cyan-300 font-bold pr-1">
              {filteredNodes.length} REGIONES
            </span>
          </div>

          {/* Browser Container: Mode 1 - Compact 4-Column Grid with Smooth Vertical Scroll */}
          {browserViewMode === 'grid' && (
            <div className="max-h-44 overflow-y-auto pr-1 flex flex-col gap-1 border border-slate-800/80 rounded-lg p-1.5 bg-[#070d16]/70 scrollbar-thin scrollbar-thumb-cyan-500/30">
              <div className="grid grid-cols-4 gap-1">
                {filteredNodes.map((node) => {
                  const isSel = selectedNodeId === node.id;
                  const label = node.id.replace('GLASSER_', '').replace('R_', 'R.');
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      title={`${node.name} (${node.atlasId})\n${node.moduleName ? `Módulo: ${node.moduleName}` : ''}`}
                      className={`px-1.5 py-1 rounded text-center transition-all border text-[9px] font-mono flex items-center justify-center gap-1 truncate ${
                        isSel
                          ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 font-bold shadow-[0_0_8px_rgba(56,189,248,0.4)]'
                          : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:border-slate-600 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: node.color }}
                      />
                      <span className="truncate">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Browser Container: Mode 2 - 22 Cortical Modules Accordion */}
          {browserViewMode === 'modules' && (
            <div className="max-h-48 overflow-y-auto pr-1 flex flex-col gap-1 border border-slate-800/80 rounded-lg p-1.5 bg-[#070d16]/70 scrollbar-thin scrollbar-thumb-purple-500/30">
              {GLASSER_MODULES_22.map((mod) => {
                const isExpanded = expandedModuleNum === mod.num;
                const modAreas = GLASSER_NODES.filter((n) => mod.areaIds.includes(n.id));
                const hasActiveArea = modAreas.some((n) => n.id === selectedNodeId);
                return (
                  <div key={mod.num} className="flex flex-col border border-slate-800/90 rounded bg-slate-950/70 overflow-hidden">
                    <button
                      onClick={() => setExpandedModuleNum(isExpanded ? null : mod.num)}
                      className={`flex items-center justify-between p-1.5 text-[10px] font-mono transition-all ${
                        hasActiveArea ? 'bg-cyan-950/60 text-cyan-200' : 'text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: mod.color }} />
                        <span className="font-bold text-slate-400 shrink-0">{String(mod.num).padStart(2, '0')}.</span>
                        <span className="truncate font-semibold text-slate-200">{mod.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[9px] text-slate-400 shrink-0 ml-1">
                        <span>{mod.areasCount}</span>
                        {isExpanded ? <ChevronDown className="w-3 h-3 text-cyan-400" /> : <ChevronRight className="w-3 h-3 text-slate-500" />}
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="grid grid-cols-4 gap-1 p-1.5 bg-[#050b14] border-t border-slate-800">
                        {modAreas.map((node) => {
                          const isSel = selectedNodeId === node.id;
                          const label = node.id.replace('GLASSER_', '').replace('R_', 'R.');
                          return (
                            <button
                              key={node.id}
                              onClick={() => setSelectedNodeId(node.id)}
                              title={node.name}
                              className={`px-1.5 py-1 rounded text-center transition-all border text-[9px] font-mono flex items-center justify-center gap-1 truncate ${
                                isSel
                                  ? 'bg-cyan-500/30 border-cyan-400 text-cyan-200 font-bold shadow-[0_0_8px_rgba(56,189,248,0.4)]'
                                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-600 hover:text-white'
                              }`}
                            >
                              <span className="truncate">{label}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

      {/* Selected Structure / Node Details Card */}
      <div className="glass-panel-subtle rounded-lg p-3 flex flex-col gap-2.5 border border-cyan-500/30 shadow-xl">
        {/* 1. Insignia Prominente [LÓBULO // MNI: X, Y, Z] */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#071322] border border-cyan-400/60 text-[10px] uppercase font-mono tracking-wider text-cyan-200 font-bold shadow-[0_0_10px_rgba(0,229,255,0.2)]">
            <Compass className="w-3.5 h-3.5 text-cyan-400 shrink-0 animate-pulse" />
            <span>[{structureData.lobe.toUpperCase()} // MNI: {structureData.mniCoordinates[0]}, {structureData.mniCoordinates[1]}, {structureData.mniCoordinates[2]}]</span>
          </div>
          <span
            className="w-4 h-4 rounded-full border border-white/40 shrink-0 shadow-md"
            style={{ backgroundColor: structureData.color, boxShadow: `0 0 10px ${structureData.color}` }}
            title={structureData.name}
          />
        </div>

        {/* 2. Nombre Oficial de la Estructura / Región */}
        <div>
          <h3 className="text-sm font-bold text-white font-mono leading-snug">
            {structureData.name}
          </h3>
        </div>

        {/* 3. Equivalencia Clásica de Brodmann y Territorio Vascular */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {/* Insignia Brodmann */}
          <div className="bg-[#0c0d1e]/90 rounded p-1.5 border border-purple-500/40 flex items-center gap-1.5">
            <span className="text-[9px] font-mono uppercase text-purple-400 font-bold shrink-0">BRODMANN:</span>
            <span className="text-[10px] font-mono text-purple-200 font-bold truncate" title={structureData.brodmann}>
              {structureData.brodmann}
            </span>
          </div>

          {/* Insignia Territorio Arterial */}
          <div className="bg-[#1c0d12]/90 rounded p-1.5 border border-rose-500/40 flex items-center gap-1.5">
            <Droplet className="w-3 h-3 text-rose-400 shrink-0" />
            <span className="text-[9px] font-mono uppercase text-rose-400 font-bold shrink-0">IRRIGACIÓN:</span>
            <span className="text-[10px] font-mono text-rose-200 font-bold truncate" title={structureData.bloodSupply}>
              {structureData.bloodSupply.split('—')[0].trim()}
            </span>
          </div>
        </div>

        {/* Vital Metrics Grid */}
        <div className="grid grid-cols-2 gap-2 mt-0.5">
          {/* Firing Rate */}
          <div className="bg-[#070d16]/70 rounded p-2 border border-cyan-500/15">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span>DISPARO NEURONAL</span>
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-base font-bold font-mono text-cyan-300">
                {effectiveFiringRate.toFixed(1)}
              </span>
              <span className="text-[10px] font-mono text-slate-400">Hz (Gamma)</span>
            </div>
          </div>

          {/* Connectivity Status */}
          <div className="bg-[#070d16]/70 rounded p-2 border border-cyan-500/15">
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
              <Network className="w-3 h-3 text-teal-400" />
              <span>CONECTIVIDAD</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span
                className={`text-[11px] font-bold font-mono truncate ${
                  effectiveConnectivity === 'Nominal'
                    ? 'text-emerald-400'
                    : effectiveConnectivity === 'Penumbra Isquémica'
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {effectiveConnectivity}
              </span>
            </div>
          </div>
        </div>

        {/* Territorio Vascular / Irrigación Detallada */}
        <div className="bg-[#070d16]/70 rounded p-2 border border-rose-500/20 flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-[10px] text-rose-300 font-mono font-semibold">
            <Droplet className="w-3 h-3 text-rose-400" />
            <span className="uppercase">Territorio Vascular / Irrigación Detallada</span>
          </div>
          <span className="text-[11px] font-mono text-rose-200/95 leading-tight">
            {structureData.bloodSupply}
          </span>
        </div>

        {/* Función Cognitiva / Motora */}
        <div className="bg-[#070d16]/70 rounded p-2 border border-cyan-500/20 flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-[10px] text-cyan-300 font-mono font-semibold">
            <Zap className="w-3 h-3 text-cyan-400" />
            <span className="uppercase">Función Anatómica y Conectividad</span>
          </div>
          <p className="text-[11px] text-slate-200 leading-relaxed font-sans">
            {structureData.cognitiveFunction}
          </p>
        </div>

        {/* Clinical Correlation */}
        <div className="bg-[#140b10]/90 rounded p-2 border border-rose-500/30 flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-[10px] text-rose-400 font-mono font-bold">
            <Stethoscope className="w-3 h-3" />
            <span className="uppercase">Correlación Clínica // Lesión Focal</span>
          </div>
          <p className="text-[11px] text-rose-200 leading-relaxed font-sans">
            {structureData.clinicalCorrelation}
          </p>
        </div>
      </div>

      {/* Dynamic Associated Tract Card - Bound to Active Selected Region with Multi-Tract Cycling */}
      {currentTract && (
        <div className="glass-panel-subtle rounded-lg p-2.5 border border-teal-500/30 flex flex-col gap-1.5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-[10px] font-mono uppercase text-teal-300 font-bold tracking-wider">
                FASCÍCULO ASOCIADO (STREAMLINES)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {tractList.length > 1 && (
                <button
                  onClick={cycleNextTractForActiveNode}
                  className="flex items-center gap-1 text-[9px] font-mono px-1.5 py-0.5 rounded bg-teal-900/60 hover:bg-teal-800 text-teal-200 border border-teal-500/40 transition-colors"
                  title="Alternar entre fascículos conectados a esta región"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  <span>{(selectedTractIndex % tractList.length) + 1}/{tractList.length}</span>
                </button>
              )}
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-teal-950/90 text-teal-300 border border-teal-500/40">
                {currentTract.fibersCount} Fibras
              </span>
            </div>
          </div>
          <div className="text-xs font-mono font-semibold text-white">
            {currentTract.name}
          </div>
          <div className="text-[9px] font-mono text-teal-300/80 uppercase font-semibold">
            {currentTract.category}
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-300 bg-slate-950/40 rounded px-2 py-0.5 border border-slate-800/60">
            <span>Mielina: <strong className="text-teal-400">{currentTract.myelination}%</strong></span>
            <span>Velocidad: <strong className="text-cyan-400">{currentTract.conductionVelocity} m/s</strong></span>
          </div>
          <div className="text-[10px] text-slate-300/90 font-sans leading-relaxed italic border-t border-teal-500/20 pt-1.5 mt-0.5">
            <span className="text-rose-400/90 not-italic font-mono text-[9px] block uppercase font-bold mb-0.5">
              Desconexión Clínica:
            </span>
            {currentTract.clinicalDisconnectionSummary}
          </div>
          </div>
        )}
      </div>
      )}

      {/* Active Pharmacological / Neurochemical Profile Card */}
      {(showNeurochemistry || activeDrug.id !== 'DRUG_PHYSIOLOGICAL') && (
        <div className="rounded-lg p-2.5 bg-amber-950/30 border border-amber-500/40 flex flex-col gap-1.5 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-amber-300 font-mono text-[10px] font-bold uppercase">
              <FlaskConical className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>PERFIL FARMACOLÓGICO ACTIVO</span>
            </div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-900/60 border border-amber-500/50 text-amber-200">
              {activeDrug.class.split(' ')[0]}
            </span>
          </div>
          <div className="text-xs font-mono font-bold text-amber-100">
            {activeDrug.name}
          </div>
          <p className="text-[10px] text-amber-200/90 font-sans leading-relaxed">
            <strong>Mecanismo:</strong> {activeDrug.mechanismOfAction}
          </p>
          <div className="flex items-center justify-between text-[9px] font-mono bg-slate-950/60 p-1.5 rounded border border-amber-500/20">
            <span className="text-slate-400">Receptores: <strong className="text-amber-300">{activeDrug.targetReceptors.slice(0, 2).join(', ')}</strong></span>
            <span className="text-slate-400">Efecto: <strong className="text-emerald-400">{activeDrug.membraneEffect}</strong></span>
          </div>
          <p className="text-[9px] text-rose-300/90 font-sans leading-tight border-t border-amber-500/20 pt-1">
            <strong>Adversos:</strong> {activeDrug.neurologicalAdverseEffects}
          </p>
        </div>
      )}

      {/* AnkiConnect Toast Status Notification */}
      {ankiStatus && (
        <div className="p-2 rounded bg-cyan-950/90 border border-cyan-400 text-cyan-200 text-[10px] font-mono text-center shadow-[0_0_12px_rgba(56,189,248,0.4)] animate-pulse">
          {ankiStatus}
        </div>
      )}

      {/* Anki Flashcard Action Buttons (AnkiConnect + TSV fallback) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        <button
          onClick={handleSendAnkiConnect}
          title="Enviar nota directamente a Anki vía AnkiConnect (127.0.0.1:8765)"
          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-gradient-to-r from-amber-950/80 to-amber-900/70 border border-amber-500/50 hover:border-amber-400 text-amber-200 hover:text-white text-[10px] font-mono font-bold tracking-wider transition-all shadow-md group"
        >
          <Send className="w-3 h-3 text-amber-400 group-hover:scale-110 transition-transform" />
          <span>⚡ ENVIAR ANKI</span>
        </button>

        <button
          onClick={handleExportAnki}
          title="Descargar flashcard en archivo .tsv compatible con Cloze"
          className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg bg-gradient-to-r from-teal-950/70 to-cyan-950/70 border border-teal-500/40 hover:border-teal-400 text-teal-200 hover:text-white text-[10px] font-mono font-semibold tracking-wider transition-all shadow-md group"
        >
          {isCopied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-300 font-bold">¡DESCARGADO!</span>
            </>
          ) : (
            <>
              <Download className="w-3 h-3 text-teal-400 group-hover:scale-110 transition-transform" />
              <span>EXPORTAR .TSV</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
