import { GLASSER_ATLAS_36 } from './glasserAtlasDB';
import type { GlasserRegionRecord } from './glasserAtlasDB';
import { WHITE_MATTER_TRACTS_14 } from './whiteMatterTractsDB';
import type { WhiteMatterTractRecord } from './whiteMatterTractsDB';
import { GLASSER_FULL_180_NODES } from './glasserFull180DB';
import type { GlasserFullNode } from './glasserFull180DB';

export type FunctionalSystem =
  | 'TODOS'
  | 'Lenguaje & Auditivo'
  | 'Motor / Somatosensorial'
  | 'Visual'
  | 'Límbico / Memoria'
  | 'Red Ejecutiva & Saliencia';

export interface AssociatedTractInfo {
  tractId?: string;
  name: string;
  category: string;
  fibersCount: number;
  myelination: number; // %
  conductionVelocity: number; // m/s
  clinicalDisconnectionSummary: string;
}

export interface GlasserNode {
  id: string;
  name: string;
  shortName: string;
  atlasId: string;
  moduleNumber?: number;
  moduleName?: string;
  system: FunctionalSystem;
  hemisphere: 'left' | 'right' | 'bilateral' | 'subcortical';
  lobe: 'Frontal' | 'Temporal' | 'Occipital' | 'Parietal' | 'Subcortical' | 'Insular' | 'Límbico' | 'Tronco Encefálico';
  type: 'cortical' | 'subcortical';
  position: [number, number, number];
  mniCoordinates: [number, number, number];
  vertexIndex?: number;
  surfaceNormal?: [number, number, number];
  color: string;
  baseFiringRate: number; // Hz
  bloodSupply: string;
  arterialTerritoryId?: string;
  cognitiveFunction: string;
  clinicalCorrelation: string;
  connectivityStatus: 'Nominal' | 'Hiperactivo' | 'Penumbra Isquémica' | 'Desconexión Severa';
  calloutTag?: string;
  calloutBadge?: string;
  calloutVariant?: 'critical' | 'warning' | 'nominal';
  radius?: number;
  associatedTract: AssociatedTractInfo;
  associatedTracts: AssociatedTractInfo[];
}

export interface WhiteMatterTract {
  id: string;
  name: string;
  latinName?: string;
  system: FunctionalSystem;
  classification: 'Fascículo de Asociación' | 'Fibras Comisurales' | 'Fibras de Proyección';
  dtiDirection?: string;
  sourceId: string;
  targetId: string;
  connectedNodeIds?: string[];
  color: string;
  controlPoints: [number, number, number][];
  myelination: number; // %
  baseSpeed: number;   // m/s
  streamlineCount: number;
  spreadRadius: number;
  clinicalNote: string;
}

// Atlas 36 lookup dictionary for key landmark badges
const ATLAS_36_MAP = new Map<string, GlasserRegionRecord>();
GLASSER_ATLAS_36.forEach((rec) => {
  ATLAS_36_MAP.set(rec.id, rec);
});

function getCleanArterialBadge(bloodSupply: string, territoryId?: string): string {
  if (territoryId === 'MCA_SUPERIOR') return 'ACM M4 SUP';
  if (territoryId === 'MCA_INFERIOR') return 'ACM M4 INF';
  if (territoryId === 'ACA_TRUNK') return 'ACA A2';
  if (territoryId === 'PCA_OCCIPITAL') return 'ACP P2';
  if (territoryId === 'BASILAR_PICA') return 'PICA / BASILAR';
  
  if (bloodSupply.includes('ACM') && bloodSupply.includes('ACP')) return 'ACM M4 / ACP';
  if (bloodSupply.includes('ACM') && bloodSupply.includes('ACA')) return 'ACM / ACA';
  if (bloodSupply.includes('ACM')) return 'ACM M4';
  if (bloodSupply.includes('ACA')) return 'ACA A2';
  if (bloodSupply.includes('ACP')) return 'ACP P2-P3';
  if (bloodSupply.includes('PICA')) return 'PICA';
  return 'ACM M4';
}

// Map 180 canonical HCP-MMP1.0 Glasser areas into GlasserNode format
const FULL_180_MAPPED: GlasserNode[] = GLASSER_FULL_180_NODES.map((n: GlasserFullNode) => {
  const customOverride = ATLAS_36_MAP.get(n.id);
  return {
    id: n.id,
    name: n.name,
    shortName: n.shortName,
    atlasId: n.atlasId,
    moduleNumber: n.moduleNumber,
    moduleName: n.moduleName,
    system: n.system,
    hemisphere: n.hemisphere,
    lobe: n.lobe,
    type: n.type,
    position: customOverride?.position || n.position,
    mniCoordinates: n.mniCoordinates,
    vertexIndex: customOverride?.vertexIndex,
    surfaceNormal: customOverride?.surfaceNormal,
    color: n.color,
    baseFiringRate: n.baseFiringRate,
    bloodSupply: n.bloodSupply,
    arterialTerritoryId: n.arterialTerritoryId,
    cognitiveFunction: n.cognitiveFunction,
    clinicalCorrelation: n.clinicalCorrelation,
    connectivityStatus: n.connectivityStatus,
    calloutTag: customOverride?.calloutTag || `[${n.shortName.toUpperCase()}]`,
    calloutBadge: customOverride?.calloutBadge || getCleanArterialBadge(n.bloodSupply, n.arterialTerritoryId),
    calloutVariant: customOverride?.calloutVariant || 'nominal',
    radius: customOverride?.radius || 0.075,
    associatedTract: customOverride?.associatedTracts?.[0] || n.associatedTract,
    associatedTracts: customOverride?.associatedTracts || n.associatedTracts
  };
});

// Append contralateral right hemisphere landmarks (M1 Der, V1 Der, A1 Der) if not already in list
const RIGHT_LANDMARKS: GlasserNode[] = GLASSER_ATLAS_36
  .filter((r) => r.hemisphere === 'right')
  .map((rec) => ({
    id: rec.id,
    name: rec.name,
    shortName: rec.shortName,
    atlasId: rec.atlasId,
    system: rec.system,
    hemisphere: rec.hemisphere,
    lobe: rec.lobe,
    type: rec.type,
    position: rec.position,
    mniCoordinates: rec.mniCoordinates,
    vertexIndex: rec.vertexIndex,
    surfaceNormal: rec.surfaceNormal,
    color: rec.color,
    baseFiringRate: rec.baseFiringRate,
    bloodSupply: rec.bloodSupply,
    arterialTerritoryId: rec.arterialTerritoryId,
    cognitiveFunction: rec.cognitiveFunction,
    clinicalCorrelation: rec.clinicalCorrelation,
    connectivityStatus: rec.connectivityStatus,
    calloutTag: rec.calloutTag,
    calloutBadge: rec.calloutBadge,
    calloutVariant: rec.calloutVariant,
    radius: rec.radius,
    associatedTract: rec.associatedTracts[0] || {
      name: 'Fascículo Comisural / Proyección',
      category: 'Proyección',
      fibersCount: 30,
      myelination: 90,
      conductionVelocity: 50.0,
      clinicalDisconnectionSummary: 'Desconexión hemisférica.'
    },
    associatedTracts: rec.associatedTracts
  }));

export const GLASSER_NODES: GlasserNode[] = [...FULL_180_MAPPED, ...RIGHT_LANDMARKS];

// Convert WHITE_MATTER_TRACTS_14 to WhiteMatterTract format
export const WHITE_MATTER_TRACTS: WhiteMatterTract[] = WHITE_MATTER_TRACTS_14.map((t: WhiteMatterTractRecord) => ({
  id: t.id,
  name: t.name,
  latinName: t.latinName,
  system: t.system,
  classification: t.classification,
  dtiDirection: t.dtiDirection,
  sourceId: t.sourceId,
  targetId: t.targetId,
  connectedNodeIds: t.connectedNodeIds,
  color: t.color,
  controlPoints: t.controlPoints,
  myelination: t.myelination,
  baseSpeed: t.baseSpeed,
  streamlineCount: t.streamlineCount,
  spreadRadius: t.spreadRadius,
  clinicalNote: t.clinicalNote
}));

export { GLASSER_ATLAS_36 } from './glasserAtlasDB';
export { WHITE_MATTER_TRACTS_14 } from './whiteMatterTractsDB';
export { VASCULAR_TERRITORIES } from './vascularTerritoriesDB';
export type { AcuteStrokeProfile, VascularTerritoryRecord } from './vascularTerritoriesDB';
export { GLASSER_FULL_180_NODES, GLASSER_MODULES_22 } from './glasserFull180DB';
export type { GlasserFullNode, Glasser180Module } from './glasserFull180DB';

