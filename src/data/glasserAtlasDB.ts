export type FunctionalSystem =
  | 'TODOS'
  | 'Lenguaje & Auditivo'
  | 'Motor / Somatosensorial'
  | 'Visual'
  | 'Límbico / Memoria'
  | 'Red Ejecutiva & Saliencia';

export interface AssociatedTractReference {
  tractId: string;
  name: string;
  category: string;
  fibersCount: number;
  myelination: number; // %
  conductionVelocity: number; // m/s
  clinicalDisconnectionSummary: string;
}

export interface GlasserRegionRecord {
  id: string;
  name: string;
  shortName: string;
  atlasId: string;
  system: FunctionalSystem;
  hemisphere: 'left' | 'right' | 'bilateral' | 'subcortical';
  lobe: 'Frontal' | 'Temporal' | 'Occipital' | 'Parietal' | 'Subcortical' | 'Insular' | 'Límbico' | 'Tronco Encefálico';
  type: 'cortical' | 'subcortical';
  position: [number, number, number];       // Exact snapped Three.js coordinates
  mniCoordinates: [number, number, number]; // Real MNI-152 [X, Y, Z]
  vertexIndex?: number;                     // fsaverage5 surface vertex index
  surfaceNormal?: [number, number, number]; // Unit surface normal
  color: string;
  baseFiringRate: number; // Hz
  bloodSupply: string;
  arterialTerritoryId: string; // Key in vascularTerritoriesDB
  cognitiveFunction: string;
  clinicalCorrelation: string;
  connectivityStatus: 'Nominal' | 'Hiperactivo' | 'Penumbra Isquémica' | 'Desconexión Severa';
  calloutTag: string;
  calloutBadge: string;
  calloutVariant?: 'critical' | 'warning' | 'nominal';
  radius: number;
  associatedTracts: AssociatedTractReference[]; // Multiple connected tracts!
}

export const GLASSER_ATLAS_36: GlasserRegionRecord[] = [
  // ==========================================
  // 1. SISTEMA DEL LENGUAJE & AUDITIVO (7 pares)
  // ==========================================
  {
    id: 'GLASSER_44',
    name: 'Área 44 (Pars Opercularis - Área de Broca)',
    shortName: 'Area 44 [Broca Opercular]',
    atlasId: 'HCP-MMP1.0_L_44',
    system: 'Lenguaje & Auditivo',
    hemisphere: 'left',
    lobe: 'Frontal',
    type: 'cortical',
    mniCoordinates: [-50, 18, 16],
    position: [-1.2661, -0.0161, 0.8805],
    vertexIndex: 6685,
    surfaceNormal: [-0.5174, -0.8556, -0.0149],
    color: '#00f0ff',
    baseFiringRate: 48.2,
    bloodSupply: 'Arteria Cerebral Media Izquierda (ACM M4 - Rama Frontal Ascendente / Candelabro)',
    arterialTerritoryId: 'MCA_SUPERIOR',
    cognitiveFunction: 'Codificación fonológica motora, ensamble morfosintáctico, programación articulatoria del habla.',
    clinicalCorrelation: 'Afasia de Broca clásica (habla no fluida, agramatismo, apraxia del habla, anomia con comprensión auditiva relativamente preservada).',
    connectivityStatus: 'Nominal',
    calloutTag: '[ÁREA 44 / BROCA]',
    calloutBadge: 'ACM M4 SUP',
    calloutVariant: 'critical',
    radius: 0.08,
    associatedTracts: [
      {
        tractId: 'TRACT_ARCUATE',
        name: 'Fascículo Arqueado (Vía Dorsal del Lenguaje - Segmento Directo)',
        category: 'Fascículo de Asociación Perisilviano',
        fibersCount: 42,
        myelination: 95,
        conductionVelocity: 62.0,
        clinicalDisconnectionSummary: 'Desconexión frontotemporal profunda causa Afasia de Conducción con alteración severa de la repetición verbal.'
      },
      {
        tractId: 'TRACT_FAT',
        name: 'Fascículo Aslant Frontal (FAT - Conexión SMA a Broca)',
        category: 'Fascículo de Asociación Frontal Corto',
        fibersCount: 32,
        myelination: 92,
        conductionVelocity: 56.4,
        clinicalDisconnectionSummary: 'La interrupción del tracto FAT produce mutismo transitorio posquirúrgico y tartamudez neurogénica adquirida.'
      },
      {
        tractId: 'TRACT_SLF',
        name: 'Fascículo Longitudinal Superior III (SLF III Opercular)',
        category: 'Fascículo de Asociación Frontoparietal',
        fibersCount: 36,
        myelination: 91,
        conductionVelocity: 54.0,
        clinicalDisconnectionSummary: 'Déficit en memoria de trabajo fonológica y apraxia ideomotora orofacial.'
      }
    ]
  },
  {
    id: 'GLASSER_45',
    name: 'Área 45 (Pars Triangularis - Área de Broca Anterior)',
    shortName: 'Area 45 [Broca Triangular]',
    atlasId: 'HCP-MMP1.0_L_45',
    system: 'Lenguaje & Auditivo',
    hemisphere: 'left',
    lobe: 'Frontal',
    type: 'cortical',
    mniCoordinates: [-48, 28, 6],
    position: [-1.1286, -0.2038, 1.0559],
    vertexIndex: 6699,
    surfaceNormal: [0.0187, -0.7436, -0.6684],
    color: '#06b6d4',
    baseFiringRate: 44.0,
    bloodSupply: 'Arteria Cerebral Media Izquierda (ACM M4 - Rama Prefrontal Anterior)',
    arterialTerritoryId: 'MCA_SUPERIOR',
    cognitiveFunction: 'Selección léxico-semántica controlada, recuperación activa de conceptos y memoria semántica ejecutiva.',
    clinicalCorrelation: 'Anomia de selección semántica, pérdida de fluidez verbal categorial y parafasias semánticas.',
    connectivityStatus: 'Nominal',
    calloutTag: '[ÁREA 45 / SEMÁNTICA]',
    calloutBadge: 'ACM M4 PREFRONTAL',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_IFOF',
        name: 'Fascículo Fronto-Occipital Inferior (IFOF - Vía Ventral Semántica)',
        category: 'Fascículo de Asociación Ventral',
        fibersCount: 38,
        myelination: 90,
        conductionVelocity: 52.5,
        clinicalDisconnectionSummary: 'Su sección produce afasia semántica pura: comprensión auditiva severamente deteriorada con fluidez articulatoria preservada.'
      },
      {
        tractId: 'TRACT_UNCINATE',
        name: 'Fascículo Uncinado (Polo Temporal a Prefrontal Inferior)',
        category: 'Fascículo Límbico / Asociación Ventral',
        fibersCount: 28,
        myelination: 87,
        conductionVelocity: 48.0,
        clinicalDisconnectionSummary: 'Dificultad en recuperación de nombres propios y memoria semántica multimodal integrada.'
      }
    ]
  },
  {
    id: 'GLASSER_PSL',
    name: 'Área PSL (Perisylvian Language Area - Wernicke Posterior)',
    shortName: 'Area PSL [Wernicke]',
    atlasId: 'HCP-MMP1.0_L_PSL',
    system: 'Lenguaje & Auditivo',
    hemisphere: 'left',
    lobe: 'Temporal',
    type: 'cortical',
    mniCoordinates: [-56, -40, 14],
    position: [-1.3548, 0.1125, -0.4884],
    vertexIndex: 6781,
    surfaceNormal: [-0.0479, 0.7835, 0.6196],
    color: '#38bdf8',
    baseFiringRate: 53.4,
    bloodSupply: 'Arteria Cerebral Media Izquierda (ACM M4 - Rama Parietotemporal Posterior)',
    arterialTerritoryId: 'MCA_INFERIOR',
    cognitiveFunction: 'Decodificación auditivo-fonológica receptiva, acceso al lexicón mental y comprensión del habla.',
    clinicalCorrelation: 'Afasia de Wernicke (habla fluida parafásica, jergafasia, anosognosia severa y pérdida total de la comprensión auditiva).',
    connectivityStatus: 'Nominal',
    calloutTag: '[ÁREA PSL / WERNICKE]',
    calloutBadge: 'ACM M4 INF',
    calloutVariant: 'warning',
    radius: 0.08,
    associatedTracts: [
      {
        tractId: 'TRACT_ARCUATE',
        name: 'Fascículo Arqueado (Vía Dorsal del Lenguaje)',
        category: 'Fascículo de Asociación Perisilviano',
        fibersCount: 42,
        myelination: 95,
        conductionVelocity: 62.0,
        clinicalDisconnectionSummary: 'Desconexión hacia Broca impide la repetición verbal e inhibición fonológica.'
      },
      {
        tractId: 'TRACT_ILF',
        name: 'Fascículo Longitudinal Inferior (ILF - Occipitotemporal)',
        category: 'Fascículo de Asociación Ventral',
        fibersCount: 36,
        myelination: 92,
        conductionVelocity: 55.0,
        clinicalDisconnectionSummary: 'Desconexión léxico-visual: alexia visual y agnosia para palabras escritas.'
      }
    ]
  },
  {
    id: 'GLASSER_STV',
    name: 'Área STV (Superior Temporal Visual & Language Area)',
    shortName: 'Area STV [Temporal Sup]',
    atlasId: 'HCP-MMP1.0_L_STV',
    system: 'Lenguaje & Auditivo',
    hemisphere: 'left',
    lobe: 'Temporal',
    type: 'cortical',
    mniCoordinates: [-54, -48, 16],
    position: [-1.2963, 0.0064, -0.8025],
    vertexIndex: 768,
    surfaceNormal: [0.1618, -0.755, -0.6354],
    color: '#0ea5e9',
    baseFiringRate: 49.0,
    bloodSupply: 'Arteria Cerebral Media Izquierda (ACM M4 - Ramas Temporales Posteriores)',
    arterialTerritoryId: 'MCA_INFERIOR',
    cognitiveFunction: 'Integración multisensorial audiovisual para habla y lectura labiofacial.',
    clinicalCorrelation: 'Sordera verbal pura y desconexión visuoauditiva del discurso.',
    connectivityStatus: 'Nominal',
    calloutTag: '[ÁREA STV / AUDIOVISUAL]',
    calloutBadge: 'ACM M4 TEMPORAL',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_ARCUATE',
        name: 'Fascículo Arqueado (Segmento Posterior)',
        category: 'Fascículo de Asociación Perisilviano',
        fibersCount: 38,
        myelination: 93,
        conductionVelocity: 58.0,
        clinicalDisconnectionSummary: 'Imposibilidad de emparejar fonemas con grafemas en lectura rápida.'
      }
    ]
  },
  {
    id: 'GLASSER_A1',
    name: 'Área A1 (Corteza Auditiva Primaria - Giro Transverso de Heschl)',
    shortName: 'Area A1 [Heschl Auditiva]',
    atlasId: 'HCP-MMP1.0_L_A1',
    system: 'Lenguaje & Auditivo',
    hemisphere: 'left',
    lobe: 'Temporal',
    type: 'cortical',
    mniCoordinates: [-44, -20, 8],
    position: [-1.0451, -0.1088, -0.044],
    vertexIndex: 1172,
    surfaceNormal: [0.4699, 0.493, 0.7323],
    color: '#22d3ee',
    baseFiringRate: 68.0,
    bloodSupply: 'Arteria Cerebral Media Izquierda (ACM M3 - Ramas del Opérculo Temporal)',
    arterialTerritoryId: 'MCA_SUPERIOR',
    cognitiveFunction: 'Mapeo tonotópico primario de frecuencias audibles y procesamiento temporal microsegundo.',
    clinicalCorrelation: 'Agnosia auditiva cortical, déficit en localización espacial del sonido (afectación bilateral genera sordera cortical).',
    connectivityStatus: 'Nominal',
    calloutTag: '[CORTEZA AUDITIVA A1]',
    calloutBadge: 'GIRO DE HESCHL',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_THALAMIC_RADIATION',
        name: 'Radiación Talámica Acústica (Cuerpo Geniculado Medial a A1)',
        category: 'Fibras de Proyección Talamocortical',
        fibersCount: 34,
        myelination: 98,
        conductionVelocity: 68.0,
        clinicalDisconnectionSummary: 'Lesión interrumpe la entrada sensorial auditiva desde el tallo cerebral hacia la corteza consciente.'
      }
    ]
  },
  {
    id: 'GLASSER_PBELT',
    name: 'Área PBelt / MBelt (Cinturón Auditivo Asociativo)',
    shortName: 'Area PBelt [Parabelt]',
    atlasId: 'HCP-MMP1.0_L_PBelt',
    system: 'Lenguaje & Auditivo',
    hemisphere: 'left',
    lobe: 'Temporal',
    type: 'cortical',
    mniCoordinates: [-52, -22, 6],
    position: [-1.2405, -0.1484, -0.1266],
    vertexIndex: 4957,
    surfaceNormal: [-0.7606, 0.1767, -0.6248],
    color: '#67e8f9',
    baseFiringRate: 46.2,
    bloodSupply: 'Arteria Cerebral Media Izquierda (ACM M3/M4)',
    arterialTerritoryId: 'MCA_SUPERIOR',
    cognitiveFunction: 'Extracción de formantes acústicos, prosodia lingüística y patrones espectro-temporales complejos.',
    clinicalCorrelation: 'Amusia cortical y déficit en discriminación de fonemas en ambientes ruidosos.',
    connectivityStatus: 'Nominal',
    calloutTag: '[ÁREA PBELT / BELT]',
    calloutBadge: 'ACM M3/M4',
    calloutVariant: 'nominal',
    radius: 0.07,
    associatedTracts: [
      {
        tractId: 'TRACT_ARCUATE',
        name: 'Fascículo Arqueado (Vía Dorsal)',
        category: 'Fascículo de Asociación Perisilviano',
        fibersCount: 38,
        myelination: 92,
        conductionVelocity: 57.0,
        clinicalDisconnectionSummary: 'Desconexión con el opérculo frontal altera la repetición de palabras complejas.'
      }
    ]
  },
  {
    id: 'GLASSER_55B',
    name: 'Área 55b (Área Premotora del Lenguaje - Sulcus Frontal Superior)',
    shortName: 'Area 55b [Premotora]',
    atlasId: 'HCP-MMP1.0_L_55b',
    system: 'Lenguaje & Auditivo',
    hemisphere: 'left',
    lobe: 'Frontal',
    type: 'cortical',
    mniCoordinates: [-42, 6, 44],
    position: [-0.9997, 0.7604, 0.5545],
    vertexIndex: 2921,
    surfaceNormal: [-0.2746, -0.1819, 0.9442],
    color: '#2dd4bf',
    baseFiringRate: 42.0,
    bloodSupply: 'Arteria Cerebral Media Izquierda (ACM M2/M3 - Rama Prerrolándica Superior)',
    arterialTerritoryId: 'MCA_SUPERIOR',
    cognitiveFunction: 'Control y modulación laringea motora para la fonación y producción prosódica.',
    clinicalCorrelation: 'Apraxia laringea focal, habla entrecortada y pérdida de entonación vocal voluntaria.',
    connectivityStatus: 'Nominal',
    calloutTag: '[ÁREA 55B / LARÍNGEA]',
    calloutBadge: 'PRERROLÁNDICA SUP',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_FAT',
        name: 'Fascículo Aslant Frontal (FAT)',
        category: 'Fascículo de Asociación Frontal Corto',
        fibersCount: 30,
        myelination: 91,
        conductionVelocity: 54.0,
        clinicalDisconnectionSummary: 'Desconexión entre el área motora suplementaria y el córtex laríngeo genera mutismo acinético focal del habla.'
      }
    ]
  },

  // ==========================================
  // 2. SISTEMA MOTOR & SOMATOSENSORIAL (5 pares)
  // ==========================================
  {
    id: 'GLASSER_4',
    name: 'Área 4 (Corteza Motora Primaria / M1 - Giro Precentral)',
    shortName: 'Area 4 [M1 Primaria]',
    atlasId: 'HCP-MMP1.0_L_4',
    system: 'Motor / Somatosensorial',
    hemisphere: 'left',
    lobe: 'Frontal',
    type: 'cortical',
    mniCoordinates: [-38, -20, 54],
    position: [-0.9492, 1.0174, -0.0398],
    vertexIndex: 646,
    surfaceNormal: [-0.9116, -0.4054, 0.0672],
    color: '#10b981',
    baseFiringRate: 64.0,
    bloodSupply: 'Arteria Cerebral Media Izquierda (ACM M3 - Arteria Prerrolándica de Duret)',
    arterialTerritoryId: 'MCA_SUPERIOR',
    cognitiveFunction: 'Generación somatotópica de comandos motores piramidales (homúnculo motor de Penfield).',
    clinicalCorrelation: 'Hemiparesia contralateral espástica (faciobraquiocrural), hiperreflexia tendinosa y signo de Babinski positivo.',
    connectivityStatus: 'Nominal',
    calloutTag: '[CORTEZA MOTORA M1]',
    calloutBadge: 'PRERROLÁNDICA',
    calloutVariant: 'critical',
    radius: 0.08,
    associatedTracts: [
      {
        tractId: 'TRACT_CORTICOSPINAL',
        name: 'Tracto Corticoespinal & Corticobulbar (Vía Piramidal Descendente)',
        category: 'Fibras de Proyección Motora Descendente',
        fibersCount: 48,
        myelination: 98,
        conductionVelocity: 68.0,
        clinicalDisconnectionSummary: 'Interrupción en la cápsula interna produce hemiplejia contralateral faciobraquiocrural densa y espasticidad piramidal.'
      },
      {
        tractId: 'TRACT_CORPUS_CALLOSUM',
        name: 'Cuerpo Calloso (Tronco Central - Fibras Motoras Transcallosas)',
        category: 'Fibras Comisurales Interhemisféricas',
        fibersCount: 36,
        myelination: 93,
        conductionVelocity: 58.0,
        clinicalDisconnectionSummary: 'Pérdida de inhibición transcallosa bimanual con movimientos en espejo involuntarios.'
      }
    ]
  },
  {
    id: 'GLASSER_6D_SMA',
    name: 'Área 6d & SMA (Corteza Premotora Dorsal y Área Motora Suplementaria)',
    shortName: 'Area 6d [Premotora/SMA]',
    atlasId: 'HCP-MMP1.0_L_6d',
    system: 'Motor / Somatosensorial',
    hemisphere: 'left',
    lobe: 'Frontal',
    type: 'cortical',
    mniCoordinates: [-26, -6, 58],
    position: [-0.5289, 1.104, 0.2353],
    vertexIndex: 4065,
    surfaceNormal: [-0.9799, 0.1911, 0.0564],
    color: '#059669',
    baseFiringRate: 52.0,
    bloodSupply: 'Arteria Cerebral Anterior Izquierda (ACA A3 - Rama Callosomarginal)',
    arterialTerritoryId: 'ACA_A2_A3',
    cognitiveFunction: 'Planificación motora endógena, secuenciación de actos motores bimanuales y coordinación anticipatoria.',
    clinicalCorrelation: 'Síndrome del Área Motora Suplementaria (mutismo y acinesia global transitoria con rápida recuperación contralateral).',
    connectivityStatus: 'Nominal',
    calloutTag: '[ÁREA 6D / SMA]',
    calloutBadge: 'ACA A3 CALLOSOMARGINAL',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_FAT',
        name: 'Fascículo Aslant Frontal (FAT - Conexión SMA a Broca)',
        category: 'Fascículo de Asociación Frontal Corto',
        fibersCount: 32,
        myelination: 92,
        conductionVelocity: 56.4,
        clinicalDisconnectionSummary: 'Interrupción del eje SMA-Broca ocasiona bloqueo del inicio verbal y apraxia del habla.'
      },
      {
        tractId: 'TRACT_CORTICOSPINAL',
        name: 'Tracto Corticoespinal (Fibras Parapiramidales Premotoras)',
        category: 'Fibras de Proyección Motora Descendente',
        fibersCount: 34,
        myelination: 94,
        conductionVelocity: 62.0,
        clinicalDisconnectionSummary: 'Torpeza motora de miembros distales y alteración en secuenciación rápida.'
      }
    ]
  },
  {
    id: 'GLASSER_FEF',
    name: 'Área FEF / 8Ad (Campos Oculares Frontales - Giro Frontal Medio)',
    shortName: 'Area FEF [8Ad Ocular]',
    atlasId: 'HCP-MMP1.0_L_FEF',
    system: 'Motor / Somatosensorial',
    hemisphere: 'left',
    lobe: 'Frontal',
    type: 'cortical',
    mniCoordinates: [-32, 2, 52],
    position: [-0.7225, 0.983, 0.4355],
    vertexIndex: 3982,
    surfaceNormal: [0.1809, 0.6009, -0.7786],
    color: '#34d399',
    baseFiringRate: 46.0,
    bloodSupply: 'Arteria Cerebral Media Izquierda (ACM M3 - Ramas Prefrontales Dorsales)',
    arterialTerritoryId: 'MCA_SUPERIOR',
    cognitiveFunction: 'Generación voluntaria de movimientos sacádicos oculares y modulación atencional visoespacial top-down.',
    clinicalCorrelation: 'Desviación conjugada de la mirada ipsilesional (los ojos "miran hacia la lesión") y apraxia oculomotora contralateral.',
    connectivityStatus: 'Nominal',
    calloutTag: '[ÁREA FEF / OCULAR]',
    calloutBadge: 'ACM M3 PREFRONTAL',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_SLF',
        name: 'Fascículo Longitudinal Superior I/II (Vía Sacádica Frontoparietal)',
        category: 'Fascículo de Asociación Dorsal',
        fibersCount: 34,
        myelination: 91,
        conductionVelocity: 55.0,
        clinicalDisconnectionSummary: 'Pérdida del direccionamiento sacádico guiado visualmente hacia el hemicampo contralateral y apraxia oculomotora.'
      }
    ]
  },
  {
    id: 'GLASSER_3B_1',
    name: 'Área 3b & 1 (Corteza Somatosensorial Primaria / S1 - Giro Postcentral)',
    shortName: 'Area 3b/1 [S1 Sensorial]',
    atlasId: 'HCP-MMP1.0_L_3b',
    system: 'Motor / Somatosensorial',
    hemisphere: 'left',
    lobe: 'Parietal',
    type: 'cortical',
    mniCoordinates: [-42, -26, 52],
    position: [-0.9757, 0.9703, -0.1749],
    vertexIndex: 2770,
    surfaceNormal: [0.6976, 0.2379, 0.6758],
    color: '#14b8a6',
    baseFiringRate: 58.5,
    bloodSupply: 'Arteria Cerebral Media Izquierda (ACM M3 - Arteria Parietal Anterior / Postrolándica)',
    arterialTerritoryId: 'MCA_SUPERIOR',
    cognitiveFunction: 'Procesamiento tálamo-cortical de tacto discriminativo fino, propiocepción consciente y dolor somatotópico.',
    clinicalCorrelation: 'Hemihipoestesia contralateral, asterognosia, agrafoestesia y pérdida de la discriminación entre dos puntos.',
    connectivityStatus: 'Nominal',
    calloutTag: '[CORTEZA SENSORIAL S1]',
    calloutBadge: 'POSTROLÁNDICA',
    calloutVariant: 'nominal',
    radius: 0.08,
    associatedTracts: [
      {
        tractId: 'TRACT_THALAMIC_RADIATION',
        name: 'Radiación Talámica Superior & Lemnisco Medial',
        category: 'Fibras de Proyección Talamocortical Ascendente',
        fibersCount: 40,
        myelination: 96,
        conductionVelocity: 64.0,
        clinicalDisconnectionSummary: 'Desconexión con el tálamo somatosensorial (VPL) provoca anestesia contralateral profunda y hemiataxia sensorial.'
      },
      {
        tractId: 'TRACT_SLF',
        name: 'Fascículo Longitudinal Superior II (SLF II)',
        category: 'Fascículo de Asociación Frontoparietal',
        fibersCount: 36,
        myelination: 91,
        conductionVelocity: 54.0,
        clinicalDisconnectionSummary: 'Déficit en retroalimentación sensorial motora y apraxia táctil.'
      }
    ]
  },
  {
    id: 'GLASSER_5M_7AL',
    name: 'Área 5m & 7AL (Corteza Parietal Posterior - Integración Sensoriomotora)',
    shortName: 'Area 5m/7AL [Parietal Sup]',
    atlasId: 'HCP-MMP1.0_L_5m',
    system: 'Motor / Somatosensorial',
    hemisphere: 'left',
    lobe: 'Parietal',
    type: 'cortical',
    mniCoordinates: [-18, -48, 62],
    position: [-0.4802, 1.1923, -0.7463],
    vertexIndex: 7536,
    surfaceNormal: [-0.7456, 0.2226, -0.6281],
    color: '#0d9488',
    baseFiringRate: 45.0,
    bloodSupply: 'Arteria Cerebral Media y Anterior (ACM M4 / ACA A4 - Ramas Parietales Superiores)',
    arterialTerritoryId: 'MCA_SUPERIOR',
    cognitiveFunction: 'Transformación visuo-motora para prensión (reaching & grasping), esquema corporal espacial.',
    clinicalCorrelation: 'Ataxia óptica (componente del Síndrome de Bálint) y apraxia visuoespacial de construcción.',
    connectivityStatus: 'Nominal',
    calloutTag: '[ÁREA 5M/7AL / PARIETAL]',
    calloutBadge: 'ACM/ACA PARIETAL',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_SLF',
        name: 'Fascículo Longitudinal Superior I (SLF I - Vía Parietal Dorsal)',
        category: 'Fascículo de Asociación Frontoparietal Dorsal',
        fibersCount: 34,
        myelination: 92,
        conductionVelocity: 56.0,
        clinicalDisconnectionSummary: 'Desconexión produce dismetría guiada por la visión (ataxia óptica).'
      }
    ]
  },

  // ==========================================
  // 3. SISTEMA VISUAL (5 pares)
  // ==========================================
  {
    id: 'GLASSER_V1',
    name: 'Área V1 / Área 17 (Corteza Visual Primaria - Cisura Calcarina)',
    shortName: 'Area V1 [Visual Primaria]',
    atlasId: 'HCP-MMP1.0_L_V1',
    system: 'Visual',
    hemisphere: 'left',
    lobe: 'Occipital',
    type: 'cortical',
    mniCoordinates: [-12, -88, 2],
    position: [-0.2599, -0.2459, -1.7046],
    vertexIndex: 6096,
    surfaceNormal: [0.9788, 0.0763, -0.1903],
    color: '#a855f7',
    baseFiringRate: 36.4,
    bloodSupply: 'Arteria Cerebral Posterior Izquierda (ACP P3 - Arteria Calcarina)',
    arterialTerritoryId: 'PCA_P3',
    cognitiveFunction: 'Mapeo retinotópico estriado primario: contraste de luminancia, orientación espacial y frecuencia.',
    clinicalCorrelation: 'Hemianopsia homónima contralateral congruente con respeto o compromiso macular (dependiendo de la circulación colateral de ACM).',
    connectivityStatus: 'Nominal',
    calloutTag: '[CORTEZA VISUAL V1]',
    calloutBadge: 'ACP P3 CALCARINA',
    calloutVariant: 'critical',
    radius: 0.08,
    associatedTracts: [
      {
        tractId: 'TRACT_OPTIC_RADIATION',
        name: 'Radiaciones Ópticas (Tracto Geniculocalcarino / Asa de Meyer & Haz Parietal)',
        category: 'Fibras de Proyección Talamocortical Visual',
        fibersCount: 44,
        myelination: 97,
        conductionVelocity: 66.0,
        clinicalDisconnectionSummary: 'Cuadrantanopsia superior contralateral ("pie in the sky") en lesión del Asa de Meyer temporal, o hemianopsia homónima completa en lesión del haz parietal/calcarino.'
      },
      {
        tractId: 'TRACT_CORPUS_CALLOSUM',
        name: 'Cuerpo Calloso (Esplenio / Fórceps Mayor Visual)',
        category: 'Fibras Comisurales Occipitales',
        fibersCount: 36,
        myelination: 89,
        conductionVelocity: 50.0,
        clinicalDisconnectionSummary: 'La desconexión del esplenio occipital izquierdo causa Alexia sin Agrafia clásica de Déjerine.'
      }
    ]
  },
  {
    id: 'GLASSER_V2_V3',
    name: 'Áreas V2 & V3 (Corteza Visual Secundaria & Terciaria Extraestriada)',
    shortName: 'Area V2/V3 [Extraestriada]',
    atlasId: 'HCP-MMP1.0_L_V2',
    system: 'Visual',
    hemisphere: 'left',
    lobe: 'Occipital',
    type: 'cortical',
    mniCoordinates: [-16, -92, 14],
    position: [-0.4595, 0.1313, -1.7528],
    vertexIndex: 6021,
    surfaceNormal: [-0.6553, 0.7545, -0.0351],
    color: '#9333ea',
    baseFiringRate: 38.0,
    bloodSupply: 'Arteria Cerebral Posterior Izquierda (ACP P3 - Ramas Occipitales Mediales)',
    arterialTerritoryId: 'PCA_P3',
    cognitiveFunction: 'Segregación figura-fondo, profundidad por disparidad binocular estereoscópica e ilusiones de contorno.',
    clinicalCorrelation: 'Escotomas paracentrales y cuadrantanopsias incompletas relativas.',
    connectivityStatus: 'Nominal',
    calloutTag: '[ÁREAS V2/V3]',
    calloutBadge: 'ACP P3 MEDIAL',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_ILF',
        name: 'Fascículo Longitudinal Inferior (ILF)',
        category: 'Fascículo de Asociación Ventral',
        fibersCount: 36,
        myelination: 92,
        conductionVelocity: 55.0,
        clinicalDisconnectionSummary: 'Déficit en la transmisión temprana del reconocimiento de objetos hacia la vía ventral.'
      }
    ]
  },
  {
    id: 'GLASSER_V4',
    name: 'Área V4 (Corteza Visual de Color y Forma Compleja - Giro Lingual/Fusiforme)',
    shortName: 'Area V4 [Cromática]',
    atlasId: 'HCP-MMP1.0_L_V4',
    system: 'Visual',
    hemisphere: 'left',
    lobe: 'Occipital',
    type: 'cortical',
    mniCoordinates: [-28, -78, -12],
    position: [-0.664, -0.551, -1.4466],
    vertexIndex: 7994,
    surfaceNormal: [0.912, -0.4071, -0.05],
    color: '#c084fc',
    baseFiringRate: 35.0,
    bloodSupply: 'Arteria Cerebral Posterior Izquierda (ACP P2/P3 - Rama Temporooccipital)',
    arterialTerritoryId: 'PCA_P3',
    cognitiveFunction: 'Constancia cromática perceptual, análisis de color y curvatura espacial compleja.',
    clinicalCorrelation: 'Acromatopsia cerebral (visión en tonos de gris en el hemicampo contralateral) y hemiacromatopsia.',
    connectivityStatus: 'Nominal',
    calloutTag: '[ÁREA V4 / COLOR]',
    calloutBadge: 'ACP P2/P3 LINGUAL',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_ILF',
        name: 'Fascículo Longitudinal Inferior (ILF - Vía Ventral)',
        category: 'Fascículo de Asociación Ventral',
        fibersCount: 36,
        myelination: 92,
        conductionVelocity: 55.0,
        clinicalDisconnectionSummary: 'Agnosia para el color y desconexión entre la percepción cromática y la denominación léxica.'
      }
    ]
  },
  {
    id: 'GLASSER_MT_V5',
    name: 'Área MT / V5 (Complejo Temporal Medio - Percepción del Movimiento Visual)',
    shortName: 'Area MT/V5 [Movimiento]',
    atlasId: 'HCP-MMP1.0_L_MT',
    system: 'Visual',
    hemisphere: 'left',
    lobe: 'Temporal',
    type: 'cortical',
    mniCoordinates: [-46, -68, 4],
    position: [-1.0761, -0.1714, -1.2396],
    vertexIndex: 2296,
    surfaceNormal: [-0.5512, -0.7404, 0.3848],
    color: '#e879f9',
    baseFiringRate: 52.0,
    bloodSupply: 'Arteria Cerebral Media Izquierda (ACM M4 - Rama Temporooccipital Posterior)',
    arterialTerritoryId: 'MCA_INFERIOR',
    cognitiveFunction: 'Detección de flujo óptico, velocidad y dirección del movimiento visual (vía dorsal "dónde/cómo").',
    clinicalCorrelation: 'Acinetopsia cerebral (visión congelada en diapositivas estáticas, incapacidad de percibir movimiento continuo).',
    connectivityStatus: 'Nominal',
    calloutTag: '[ÁREA MT / V5 CINETOPSIA]',
    calloutBadge: 'ACM M4 TEMPOROOCCIPITAL',
    calloutVariant: 'warning',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_SLF',
        name: 'Fascículo Longitudinal Superior II/III (Vía Dorsal)',
        category: 'Fascículo de Asociación Frontoparietal',
        fibersCount: 36,
        myelination: 92,
        conductionVelocity: 56.0,
        clinicalDisconnectionSummary: 'Pérdida del acoplamiento entre la percepción de movimiento y el control motor ocular sacádico.'
      }
    ]
  },
  {
    id: 'GLASSER_FFC',
    name: 'Área FFC (Fusiform Face Complex - Área Fusiforme Facial)',
    shortName: 'Area FFC [Fusiforme Facial]',
    atlasId: 'HCP-MMP1.0_L_FFC',
    system: 'Visual',
    hemisphere: 'left',
    lobe: 'Temporal',
    type: 'cortical',
    mniCoordinates: [-38, -54, -18],
    position: [-0.8395, -0.7812, -0.8926],
    vertexIndex: 3936,
    surfaceNormal: [0.4176, -0.8891, -0.1873],
    color: '#d946ef',
    baseFiringRate: 42.0,
    bloodSupply: 'Arteria Cerebral Posterior Izquierda (ACP P2 - Arteria Temporooccipital Lateral)',
    arterialTerritoryId: 'PCA_P3',
    cognitiveFunction: 'Procesamiento holístico de rostros humanos, reconocimiento de identidad individual y tipografía compleja.',
    clinicalCorrelation: 'Prosopagnosia (incapacidad de reconocer rostros familiares) y agnosia para categorías visuales específicas.',
    connectivityStatus: 'Nominal',
    calloutTag: '[ÁREA FFC / FACIAL]',
    calloutBadge: 'ACP P2 FUSIFORME',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_ILF',
        name: 'Fascículo Longitudinal Inferior (ILF)',
        category: 'Fascículo de Asociación Ventral',
        fibersCount: 38,
        myelination: 92,
        conductionVelocity: 55.0,
        clinicalDisconnectionSummary: 'Desconexión temporo-occipital ventral produce prosopagnosia asociativa severa.'
      },
      {
        tractId: 'TRACT_IFOF',
        name: 'Fascículo Fronto-Occipital Inferior (IFOF)',
        category: 'Fascículo de Asociación Ventral Largo',
        fibersCount: 36,
        myelination: 90,
        conductionVelocity: 52.0,
        clinicalDisconnectionSummary: 'Déficit en acceso conceptual rápido desde estímulos visuales faciales.'
      }
    ]
  },

  // ==========================================
  // 4. SISTEMA EJECUTIVO, PREFRONTAL & SALIENCIA (5 pares)
  // ==========================================
  {
    id: 'GLASSER_DLPFC',
    name: 'Área 9-46d (Corteza Prefrontal Dorsolateral - DLPFC)',
    shortName: 'Area 9-46d [DLPFC]',
    atlasId: 'HCP-MMP1.0_L_9-46d',
    system: 'Red Ejecutiva & Saliencia',
    hemisphere: 'left',
    lobe: 'Frontal',
    type: 'cortical',
    mniCoordinates: [-42, 36, 30],
    position: [-1.0342, 0.452, 1.3047],
    vertexIndex: 2812,
    surfaceNormal: [-0.6864, 0.715, 0.133],
    color: '#f43f5e',
    baseFiringRate: 44.5,
    bloodSupply: 'Arteria Cerebral Anterior y Media (ACA A3 / ACM M4)',
    arterialTerritoryId: 'MCA_SUPERIOR',
    cognitiveFunction: 'Memoria de trabajo operativa n-back, flexibilidad cognitiva, razonamiento abstracto y control inhibitorio.',
    clinicalCorrelation: 'Síndrome disejecutivo prefrontal clásico (apatía, perseveración, pérdida de capacidad de planificación y déficit de memoria operativa).',
    connectivityStatus: 'Nominal',
    calloutTag: '[PREFRONTAL DLPFC]',
    calloutBadge: 'CONTROL EJECUTIVO',
    calloutVariant: 'nominal',
    radius: 0.08,
    associatedTracts: [
      {
        tractId: 'TRACT_SLF',
        name: 'Fascículo Longitudinal Superior II (SLF II) & Fronto-Occipital Superior',
        category: 'Fascículo de Asociación Frontoparietal',
        fibersCount: 40,
        myelination: 91,
        conductionVelocity: 55.0,
        clinicalDisconnectionSummary: 'Desconexión frontoparietal produce deterioro severo en memoria de trabajo espacial y desatención ejecutiva central.'
      },
      {
        tractId: 'TRACT_CORPUS_CALLOSUM',
        name: 'Cuerpo Calloso (Fórceps Menor / Rodilla Anterior)',
        category: 'Fibras Comisurales Frontales',
        fibersCount: 38,
        myelination: 90,
        conductionVelocity: 51.0,
        clinicalDisconnectionSummary: 'Incoordinación interhemisférica en tareas ejecutivas complejas bimanuales.'
      }
    ]
  },
  {
    id: 'GLASSER_10R_PP',
    name: 'Área 10r & 10pp (Corteza Frontopolar / Polo Anterior)',
    shortName: 'Area 10 [Frontopolar]',
    atlasId: 'HCP-MMP1.0_L_10r',
    system: 'Red Ejecutiva & Saliencia',
    hemisphere: 'left',
    lobe: 'Frontal',
    type: 'cortical',
    mniCoordinates: [-24, 56, 12],
    position: [-0.6367, -0.059, 1.7604],
    vertexIndex: 176,
    surfaceNormal: [-0.9161, -0.3416, -0.2099],
    color: '#fb7185',
    baseFiringRate: 38.0,
    bloodSupply: 'Arteria Cerebral Anterior Izquierda (ACA A3 - Rama Frontopolar)',
    arterialTerritoryId: 'ACA_A2_A3',
    cognitiveFunction: 'Ramificación de metas simultáneas (cognitive branching), prospección futura y metacognición reflexiva.',
    clinicalCorrelation: 'Pérdida de iniciativa estratégica a largo plazo, anosognosia y desinhibición de juicios morales complejos.',
    connectivityStatus: 'Nominal',
    calloutTag: '[ÁREA 10 / FRONTOPOLAR]',
    calloutBadge: 'ACA A3 FRONTOPOLAR',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_CORPUS_CALLOSUM',
        name: 'Cuerpo Calloso (Fórceps Menor)',
        category: 'Fibras Comisurales Frontales',
        fibersCount: 34,
        myelination: 89,
        conductionVelocity: 49.0,
        clinicalDisconnectionSummary: 'Afecta la sincronía prefrontal rostral bilateral para monitoreo metacognitivo.'
      }
    ]
  },
  {
    id: 'GLASSER_47L_OFC',
    name: 'Área 47l & OFC (Corteza Orbitofrontal Lateral y Ventrolateral)',
    shortName: 'Area 47l [Orbitofrontal]',
    atlasId: 'HCP-MMP1.0_L_47l',
    system: 'Red Ejecutiva & Saliencia',
    hemisphere: 'left',
    lobe: 'Frontal',
    type: 'cortical',
    mniCoordinates: [-36, 32, -10],
    position: [-0.8664, -0.5926, 1.2168],
    vertexIndex: 2185,
    surfaceNormal: [0.11, -0.7613, 0.639],
    color: '#fda4af',
    baseFiringRate: 40.0,
    bloodSupply: 'Arteria Cerebral Media y Anterior (ACM M2 / ACA A2 - Ramas Orbitofrontales)',
    arterialTerritoryId: 'MCA_SUPERIOR',
    cognitiveFunction: 'Evaluación del valor subjetivo de recompensas, castigo y adaptación social-emocional.',
    clinicalCorrelation: 'Síndrome pseudopsicopático orbitofrontal (impulsividad desinhibida, labilidad afectiva, jocosidad mórbida de Witzelsucht).',
    connectivityStatus: 'Nominal',
    calloutTag: '[ÁREA 47L / ORBITOFRONTAL]',
    calloutBadge: 'ORBITOFRONTAL',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_UNCINATE',
        name: 'Fascículo Uncinado (Lóbulo Temporal a Orbitofrontal)',
        category: 'Fascículo Límbico / Asociación Ventral',
        fibersCount: 32,
        myelination: 87,
        conductionVelocity: 48.0,
        clinicalDisconnectionSummary: 'Desconexión límbica que perturba el control inhibitorio emocional y la evaluación de riesgos.'
      }
    ]
  },
  {
    id: 'GLASSER_AVI',
    name: 'Área AVI / AAIC (Corteza Insular Anterior Ventral - Nodo de Saliencia)',
    shortName: 'Area AVI [Ínsula Ant]',
    atlasId: 'HCP-MMP1.0_L_AVI',
    system: 'Red Ejecutiva & Saliencia',
    hemisphere: 'left',
    lobe: 'Insular',
    type: 'cortical',
    mniCoordinates: [-34, 18, 2],
    position: [-0.8289, -0.2023, 0.8593],
    vertexIndex: 6750,
    surfaceNormal: [-0.7176, 0.6958, 0.0305],
    color: '#eab308',
    baseFiringRate: 49.3,
    bloodSupply: 'Arteria Cerebral Media Izquierda (ACM M2 - Ramas Insulares Cortas)',
    arterialTerritoryId: 'MCA_SUPERIOR',
    cognitiveFunction: 'Hub central de la Red de Saliencia (Salience Network): integración interoceptiva-afectiva y conmutación entre DMN y Red Ejecutiva.',
    clinicalCorrelation: 'Asimbolia al dolor, despersonalización interoceptiva, pérdida del asco y apatía autonómica.',
    connectivityStatus: 'Nominal',
    calloutTag: '[ÍNSULA AVI / SALIENCIA]',
    calloutBadge: 'ACM M2 INSULAR',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_IFOF',
        name: 'Fascículo Fronto-Occipital Inferior (IFOF) & Vía Insular Frontal',
        category: 'Fascículo de Asociación Ventral',
        fibersCount: 34,
        myelination: 89,
        conductionVelocity: 50.0,
        clinicalDisconnectionSummary: 'Falla en la conmutación atencional hacia eventos externos de alta relevancia biológica.'
      }
    ]
  },
  {
    id: 'GLASSER_POI1',
    name: 'Área PoI1 (Corteza Insular Posterior - Interocepción Primaria)',
    shortName: 'Area PoI1 [Ínsula Post]',
    atlasId: 'HCP-MMP1.0_L_PoI1',
    system: 'Red Ejecutiva & Saliencia',
    hemisphere: 'left',
    lobe: 'Insular',
    type: 'cortical',
    mniCoordinates: [-38, -14, 12],
    position: [-0.9456, 0.016, 0.0682],
    vertexIndex: 2249,
    surfaceNormal: [-0.7781, 0.6019, 0.1797],
    color: '#ca8a04',
    baseFiringRate: 46.0,
    bloodSupply: 'Arteria Cerebral Media Izquierda (ACM M2 - Arterias Insulares Largas Posteriores)',
    arterialTerritoryId: 'MCA_SUPERIOR',
    cognitiveFunction: 'Corteza interoceptiva primaria: monitorización de frecuencia cardíaca, tono gastrointestinal, dolor visceral y temperatura corporal.',
    clinicalCorrelation: 'Pérdida de la consciencia visceral, hipoalgesia térmica y taquiarritmias secundarias a disautonomía.',
    connectivityStatus: 'Nominal',
    calloutTag: '[ÍNSULA POI1 / INTEROCEPCIÓN]',
    calloutBadge: 'ACM M2 POSTERIOR',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_THALAMIC_RADIATION',
        name: 'Radiación Talámica Posterior & Fibras Espinotalámicas Insulares',
        category: 'Fibras de Proyección Talamocortical',
        fibersCount: 32,
        myelination: 94,
        conductionVelocity: 60.0,
        clinicalDisconnectionSummary: 'Anestesia visceral profunda e incapacidad para sentir el dolor quemante termoalgésico.'
      }
    ]
  },

  // ==========================================
  // 5. SISTEMA LÍMBICO & DEFAULT MODE NETWORK (5 pares)
  // ==========================================
  {
    id: 'GLASSER_24DD_ACC',
    name: 'Área 24dd / dACC (Corteza Cingular Anterior Dorsal)',
    shortName: 'Area 24dd [dACC Cíngulo]',
    atlasId: 'HCP-MMP1.0_L_24dd',
    system: 'Límbico / Memoria',
    hemisphere: 'left',
    lobe: 'Límbico',
    type: 'cortical',
    mniCoordinates: [-6, 16, 36],
    position: [-0.244, 0.702, 1.165],
    vertexIndex: 2173,
    surfaceNormal: [-0.15, 0.55, 0.82],
    color: '#84cc16',
    baseFiringRate: 42.0,
    bloodSupply: 'Arteria Cerebral Anterior Izquierda (ACA A2 - Arteria Pericallosa)',
    arterialTerritoryId: 'ACA_A2_A3',
    cognitiveFunction: 'Monitorización de conflictos cognitivos, señalización de error, esfuerzo volitivo y motivación intrínseca.',
    clinicalCorrelation: 'Mutismo acinético severo (lesión bilateral), abulia profunda y síndrome de desgano.',
    connectivityStatus: 'Nominal',
    calloutTag: '[CÍNGULO DORSAL 24DD]',
    calloutBadge: 'ACA A2 PERICALLOSA',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_CINGULUM',
        name: 'Fascículo del Cíngulo (Cingulum Bundle - Arco Pericalloso)',
        category: 'Fascículo de Asociación Límbico',
        fibersCount: 38,
        myelination: 93,
        conductionVelocity: 54.0,
        clinicalDisconnectionSummary: 'Ruptura del circuito límbico pericalloso genera apatía refractaria y pérdida de reactividad emocional.'
      }
    ]
  },
  {
    id: 'GLASSER_23D_PCC',
    name: 'Área 23d & 31pv (Corteza Cingular Posterior & Precúneo - Hub de la DMN)',
    shortName: 'Area 23d [PCC/Precúneo]',
    atlasId: 'HCP-MMP1.0_L_23d',
    system: 'Límbico / Memoria',
    hemisphere: 'left',
    lobe: 'Límbico',
    type: 'cortical',
    mniCoordinates: [-8, -52, 28],
    position: [-0.302, 0.503, -1.233],
    vertexIndex: 6946,
    surfaceNormal: [-0.22, 0.45, -0.86],
    color: '#65a30d',
    baseFiringRate: 48.0,
    bloodSupply: 'Arteria Cerebral Anterior y Posterior (ACA A3 Pericallosa Posterior / ACP P3)',
    arterialTerritoryId: 'ACA_A2_A3',
    cognitiveFunction: 'Epicentro metabólico de la Red Neuronal por Defecto (Default Mode Network - DMN): introspección, memoria autobiográfica y simulación mental.',
    clinicalCorrelation: 'Pérdida de consciencia introspectiva autorreferencial, amnesia retrógrada y desorientación temporal.',
    connectivityStatus: 'Nominal',
    calloutTag: '[PCC / NODO DMN]',
    calloutBadge: 'RED POR DEFECTO',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_CINGULUM',
        name: 'Fascículo del Cíngulo (Porción Posterior y Parahipocampal)',
        category: 'Fascículo de Asociación Límbico',
        fibersCount: 38,
        myelination: 93,
        conductionVelocity: 54.0,
        clinicalDisconnectionSummary: 'Desconexión entre el precúneo y el hipocampo bloquea la recuperación autobiográfica episódica.'
      }
    ]
  },
  {
    id: 'GLASSER_HIPPOCAMPUS',
    name: 'Complejo Hipocampal & Subículo (Sectores CA1-CA3, Giro Dentado)',
    shortName: 'Hipocampo [CA1-CA3]',
    atlasId: 'HCP-MMP1.0_L_Hipp',
    system: 'Límbico / Memoria',
    hemisphere: 'left',
    lobe: 'Límbico',
    type: 'subcortical',
    mniCoordinates: [-26, -22, -14],
    position: [-0.624, -0.672, -0.048],
    color: '#14b8a6',
    baseFiringRate: 38.0,
    bloodSupply: 'Arteria Cerebral Posterior Izquierda (ACP P2 - Arteria Hipocampal y Coroidea Anterior)',
    arterialTerritoryId: 'PCA_P1_P2',
    cognitiveFunction: 'Consolidación de memoria declarativa episódica a largo plazo y navegación topográfica espacial.',
    clinicalCorrelation: 'Amnesia anterógrada densa irreversible (caso clásico H.M.), incapacidad total de fijar nuevos recuerdos conscientes.',
    connectivityStatus: 'Nominal',
    calloutTag: '[COMPLEJO HIPOCAMPAL]',
    calloutBadge: 'ACP P2 HIPOCAMPO',
    calloutVariant: 'critical',
    radius: 0.08,
    associatedTracts: [
      {
        tractId: 'TRACT_FORNIX',
        name: 'Fórnix (Columnas, Cuerpo y Pilares - Circuito de Papez)',
        category: 'Vía de Proyección Límbica Principal',
        fibersCount: 36,
        myelination: 93,
        conductionVelocity: 51.0,
        clinicalDisconnectionSummary: 'Lesión del fórnix causa amnesia diencefálica anterógrada pura con preservación de la memoria procesual implícita.'
      },
      {
        tractId: 'TRACT_CINGULUM',
        name: 'Fascículo del Cíngulo Parahipocampal',
        category: 'Fascículo de Asociación Límbico',
        fibersCount: 34,
        myelination: 91,
        conductionVelocity: 52.0,
        clinicalDisconnectionSummary: 'Interrupción de aferencias corticales hacia la formación hipocampal.'
      }
    ]
  },
  {
    id: 'GLASSER_AMYGDALA',
    name: 'Complejo Amigdalino (Núcleos Basolateral y Central)',
    shortName: 'Amígdala [Basolateral]',
    atlasId: 'SUBCORTICAL_AMYGDALA_L',
    system: 'Límbico / Memoria',
    hemisphere: 'left',
    lobe: 'Límbico',
    type: 'subcortical',
    mniCoordinates: [-22, -6, -18],
    position: [-0.528, -0.72, 0.288],
    color: '#10b981',
    baseFiringRate: 34.0,
    bloodSupply: 'Arteria Coroidea Anterior (Rama de Carótida Interna C4) y Ramas de ACP P2',
    arterialTerritoryId: 'PCA_P1_P2',
    cognitiveFunction: 'Condicionamiento pavloviano al miedo, detección de amenazas biológicas y valencia emocional saliente.',
    clinicalCorrelation: 'Síndrome de Klüver-Bucy (lesión bilateral: hiperoralidad, docilidad apacible sin miedo, hipersexualidad y agnosia psíquica).',
    connectivityStatus: 'Nominal',
    calloutTag: '[COMPLEJO AMIGDALINO]',
    calloutBadge: 'COROIDEA ANTERIOR',
    calloutVariant: 'warning',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_UNCINATE',
        name: 'Fascículo Uncinado (Conexión Amígdala/Polo Temporal a Prefrontal Ventral)',
        category: 'Fascículo Límbico / Asociación Ventral',
        fibersCount: 30,
        myelination: 88,
        conductionVelocity: 48.0,
        clinicalDisconnectionSummary: 'Falta de modulación inhibitoria prefrontal sobre la reactividad ansiosa y miedo desregulado.'
      }
    ]
  },
  {
    id: 'GLASSER_ENTORHINAL',
    name: 'Corteza Entorrinal (Puerta de Entrada a la Formación Hipocampal)',
    shortName: 'Corteza Entorrinal',
    atlasId: 'HCP-MMP1.0_L_EC',
    system: 'Límbico / Memoria',
    hemisphere: 'left',
    lobe: 'Temporal',
    type: 'cortical',
    mniCoordinates: [-20, -10, -28],
    position: [-0.48, -0.912, 0.192],
    color: '#059669',
    baseFiringRate: 36.0,
    bloodSupply: 'Arteria Cerebral Posterior (ACP P2 - Arteria Temporooccipital Medial)',
    arterialTerritoryId: 'PCA_P1_P2',
    cognitiveFunction: 'Células de red (grid cells) para mapeo métrico del espacio y transmisión al hipocampo (vía perforante).',
    clinicalCorrelation: 'Primera estructura diana en la patología tau de la enfermedad de Alzheimer (Braak I-II), produciendo amnesia espacial temprana.',
    connectivityStatus: 'Nominal',
    calloutTag: '[CORTEZA ENTORRINAL]',
    calloutBadge: 'VÍA PERFORANTE',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_FORNIX',
        name: 'Vía Perforante & Alvéolo Hipocampal',
        category: 'Fibras de Proyección Límbica',
        fibersCount: 32,
        myelination: 90,
        conductionVelocity: 49.0,
        clinicalDisconnectionSummary: 'Aislamiento de la corteza cerebral respecto al hipocampo con colapso de la memoria autobiográfica.'
      }
    ]
  },

  // ==========================================
  // 6. NÚCLEOS SUBCORTICALES & RELÉS DEL TRONCO (6 entidades)
  // ==========================================
  {
    id: 'SUBCORTICAL_THALAMUS',
    name: 'Tálamo Dorsal (Complejo Nuclear VPL, VPM, VL, VA, LGN, MGN, Pulvinar)',
    shortName: 'Tálamo Dorsal',
    atlasId: 'SUBCORTICAL_THAL_DORSAL',
    system: 'Motor / Somatosensorial',
    hemisphere: 'subcortical',
    lobe: 'Subcortical',
    type: 'subcortical',
    mniCoordinates: [-12, -18, 8],
    position: [-0.420, -0.240, -0.005],
    color: '#f59e0b',
    baseFiringRate: 75.3,
    bloodSupply: 'Arterias Talamoperforantes y Talamogeniculadas (Ramas de ACP P1 y Arteria Basilar)',
    arterialTerritoryId: 'PCA_P1_P2',
    cognitiveFunction: 'Compuerta sensorial obligada de todas las modalidades (excepto olfato), relé de bucles motores y sincronizador oscilatorio cortical.',
    clinicalCorrelation: 'Síndrome de Déjerine-Roussy (dolor talámico central hiperpatológico), hemiataxia sensorial profunda y disritmia talamocortical.',
    connectivityStatus: 'Nominal',
    calloutTag: '[RELÉ TALÁMICO VPL]',
    calloutBadge: 'TALAMOPERFORANTES',
    calloutVariant: 'critical',
    radius: 0.08,
    associatedTracts: [
      {
        tractId: 'TRACT_THALAMIC_RADIATION',
        name: 'Pedúnculos Talámicos Anterior, Superior y Posterior (Cápsula Interna)',
        category: 'Fibras de Proyección Talamocortical Recíproca',
        fibersCount: 46,
        myelination: 97,
        conductionVelocity: 66.0,
        clinicalDisconnectionSummary: 'Desconexión tálamo-cortical masiva induce coma, disritmia cortical y pérdida completa de las aferencias sensoriales somatovisuales.'
      },
      {
        tractId: 'TRACT_OPTIC_RADIATION',
        name: 'Radiaciones Ópticas (Emergentes del LGN)',
        category: 'Fibras de Proyección Visual',
        fibersCount: 44,
        myelination: 97,
        conductionVelocity: 66.0,
        clinicalDisconnectionSummary: 'Hemianopsia homónima contralateral.'
      }
    ]
  },
  {
    id: 'SUBCORTICAL_STRIATUM',
    name: 'Cuerpo Estriado (Núcleo Caudado & Putamen / Entrada de Ganglios Basales)',
    shortName: 'Cuerpo Estriado',
    atlasId: 'SUBCORTICAL_STRIATUM_BG',
    system: 'Motor / Somatosensorial',
    hemisphere: 'subcortical',
    lobe: 'Subcortical',
    type: 'subcortical',
    mniCoordinates: [-20, 8, 4],
    position: [-0.700, -0.380, 0.905],
    color: '#8b5cf6',
    baseFiringRate: 68.0,
    bloodSupply: 'Arterias Lenticuloestriadas Anterolaterales (Ramas perforantes profundas de ACM M1)',
    arterialTerritoryId: 'MCA_LENTICULOSTRIATE',
    cognitiveFunction: 'Filtrado de patrones motores, refuerzo dopaminérgico y selección de hábitos comportamentales.',
    clinicalCorrelation: 'Corea (lesión del caudado en Huntington), distonía focal y hemi-balismo secundario a isquemia estriatal.',
    connectivityStatus: 'Nominal',
    calloutTag: '[ESTRIADO / PUTAMEN]',
    calloutBadge: 'ACM M1 LENTICULOESTRIADA',
    calloutVariant: 'nominal',
    radius: 0.08,
    associatedTracts: [
      {
        tractId: 'TRACT_CORTICOSPINAL',
        name: 'Fibras Corticoestriatales & Brazo Anterior de Cápsula Interna',
        category: 'Fibras de Proyección Subcortical Extrapiramidal',
        fibersCount: 38,
        myelination: 94,
        conductionVelocity: 59.0,
        clinicalDisconnectionSummary: 'Ruptura del asa corticoestriatal produce rigidez extrapiramidal por pérdida de desinhibición GABAérgica.'
      }
    ]
  },
  {
    id: 'SUBCORTICAL_GP',
    name: 'Globo Pálido Interno & Externo (GPi / GPe)',
    shortName: 'Globo Pálido [GPi/GPe]',
    atlasId: 'SUBCORTICAL_GP_L',
    system: 'Motor / Somatosensorial',
    hemisphere: 'subcortical',
    lobe: 'Subcortical',
    type: 'subcortical',
    mniCoordinates: [-18, -4, 0],
    position: [-0.630, -0.520, 0.485],
    color: '#7c3aed',
    baseFiringRate: 62.0,
    bloodSupply: 'Arteria Coroidea Anterior y Arterias Lenticuloestriadas Mediales',
    arterialTerritoryId: 'MCA_LENTICULOSTRIATE',
    cognitiveFunction: 'Principal nodo de salida inhibitorio (GABAérgico) de los ganglios basales hacia el tálamo motor (VL/VA).',
    clinicalCorrelation: 'Bradicinesia parkinsoniana (por hiperactividad del GPi) o distonía generalizada (diana para Deep Brain Stimulation DBS).',
    connectivityStatus: 'Nominal',
    calloutTag: '[GLOBO PÁLIDO GPI]',
    calloutBadge: 'DIANA DBS',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_THALAMIC_RADIATION',
        name: 'Asa Lenticular & Fascículo Talámico (Campos de Forel H1/H2)',
        category: 'Fibras de Proyección Subcortical',
        fibersCount: 34,
        myelination: 95,
        conductionVelocity: 61.0,
        clinicalDisconnectionSummary: 'Bloqueo del freno de los ganglios basales sobre el tálamo motor con acinesia severa.'
      }
    ]
  },
  {
    id: 'SUBCORTICAL_STN',
    name: 'Núcleo Subtalámico de Luys (STN - Marcapasos Motor)',
    shortName: 'Núcleo Subtalámico [STN]',
    atlasId: 'SUBCORTICAL_STN_L',
    system: 'Motor / Somatosensorial',
    hemisphere: 'subcortical',
    lobe: 'Subcortical',
    type: 'subcortical',
    mniCoordinates: [-11, -14, -6],
    position: [-0.385, -0.730, 0.135],
    color: '#a855f7',
    baseFiringRate: 55.0,
    bloodSupply: 'Ramas Posterolaterales de la Arteria Comunicante Posterior y ACP P1',
    arterialTerritoryId: 'PCA_P1_P2',
    cognitiveFunction: 'Freno global hiperdirecto del movimiento y diana quirúrgica de estimulación cerebral profunda en Parkinson.',
    clinicalCorrelation: 'Hemibalismo contralateral violento e incontrolable tras infarto lacunar del núcleo de Luys.',
    connectivityStatus: 'Nominal',
    calloutTag: '[NÚCLEO SUBTALÁMICO]',
    calloutBadge: 'MARCAPASOS DBS',
    calloutVariant: 'critical',
    radius: 0.07,
    associatedTracts: [
      {
        tractId: 'TRACT_CORTICOSPINAL',
        name: 'Vía Hiperdirecta Cortico-Subtalámica',
        category: 'Fibras de Proyección Motora',
        fibersCount: 32,
        myelination: 96,
        conductionVelocity: 65.0,
        clinicalDisconnectionSummary: 'Pérdida súbita del freno motor con movimientos coreiformes balísticos violentos e involuntarios.'
      }
    ]
  },
  {
    id: 'SUBCORTICAL_SN',
    name: 'Sustancia Negra (Pars Compacta SNc & Pars Reticulata SNr)',
    shortName: 'Sustancia Negra [SNc]',
    atlasId: 'SUBCORTICAL_SN_L',
    system: 'Motor / Somatosensorial',
    hemisphere: 'subcortical',
    lobe: 'Tronco Encefálico',
    type: 'subcortical',
    mniCoordinates: [-10, -20, -10],
    position: [-0.350, -0.870, -0.075],
    color: '#6366f1',
    baseFiringRate: 40.0,
    bloodSupply: 'Ramas Pedunculares y Talamoperforantes de ACP P1 y Arteria Basilar',
    arterialTerritoryId: 'BASILAR_PICA',
    cognitiveFunction: 'Producción dopaminérgica nigroestriatal (SNc) para facilitación del movimiento y refuerzo hedónico.',
    clinicalCorrelation: 'Enfermedad de Parkinson clásica (pérdida >70% de neuronas dopaminérgicas pigmentadas neuromelanina: temblor de reposo, rigidez y bradicinesia).',
    connectivityStatus: 'Nominal',
    calloutTag: '[SUSTANCIA NEGRA SNC]',
    calloutBadge: 'DOPAMINA NIGROESTRIATAL',
    calloutVariant: 'critical',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_CORTICOSPINAL',
        name: 'Haz Nigroestriatal & Pedúnculo Cerebral Mesencefálico',
        category: 'Vía Dopaminérgica de Proyección Ascendente',
        fibersCount: 34,
        myelination: 90,
        conductionVelocity: 50.0,
        clinicalDisconnectionSummary: 'Desdopaminización estriatal masiva causante de temblor en cuenta de monedas y acinesia.'
      }
    ]
  },
  {
    id: 'SUBCORTICAL_BRAINSTEM_NUC',
    name: 'Tronco Encefálico (Núcleo Locus Coeruleus / Núcleos del Rafe)',
    shortName: 'Locus Coeruleus / Rafe',
    atlasId: 'SUBCORTICAL_LC_RAPHE',
    system: 'Límbico / Memoria',
    hemisphere: 'subcortical',
    lobe: 'Tronco Encefálico',
    type: 'subcortical',
    mniCoordinates: [0, -32, -22],
    position: [0.000, -1.290, -0.495],
    color: '#3b82f6',
    baseFiringRate: 30.0,
    bloodSupply: 'Arterias Circunferenciales Cortas y Largas de la Arteria Basilar',
    arterialTerritoryId: 'BASILAR_PICA',
    cognitiveFunction: 'Marcapasos noradrenérgico (LC) y serotoninérgico (Rafe) regulador del ciclo sueño-vigilia, alerta atencional y tono de ánimo.',
    clinicalCorrelation: 'Coma profundo por disfunción del Sistema Reticular Activador Ascendente (SARA) y depresión mayor resistente.',
    connectivityStatus: 'Nominal',
    calloutTag: '[TRONCO / SARA]',
    calloutBadge: 'NORADRENALINA/SEROTONINA',
    calloutVariant: 'critical',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_CEREBELLAR_PEDUNCLE',
        name: 'Pedúnculo Cerebeloso Medio & Vía Pontocerebelosa',
        category: 'Fibras de Proyección Troncoencefálica',
        fibersCount: 42,
        myelination: 96,
        conductionVelocity: 64.0,
        clinicalDisconnectionSummary: 'Ataxia de la marcha severa y dismetría troncal.'
      }
    ]
  },

  // ==========================================
  // 7. HOMÓLOGOS DERECHOS CLAVE (4 áreas)
  // ==========================================
  {
    id: 'GLASSER_R_44',
    name: 'Área 44 Derecha (Pars Opercularis Homóloga - Prosodia Emocional)',
    shortName: 'Area 44 Der [Prosodia]',
    atlasId: 'HCP-MMP1.0_R_44',
    system: 'Lenguaje & Auditivo',
    hemisphere: 'right',
    lobe: 'Frontal',
    type: 'cortical',
    mniCoordinates: [50, 18, 16],
    position: [1.379, -0.0452, 1.0616],
    vertexIndex: 9055,
    surfaceNormal: [0.9386, 0.0025, 0.345],
    color: '#00f0ff',
    baseFiringRate: 41.0,
    bloodSupply: 'Arteria Cerebral Media Derecha (ACM M4)',
    arterialTerritoryId: 'MCA_SUPERIOR',
    cognitiveFunction: 'Generación y modulación de la prosodia emocional, entonación melódica y pragmática afectiva del discurso.',
    clinicalCorrelation: 'Aprosodia motora (voz monótona, plana, sin inflexiones afectivas, similar a un robot).',
    connectivityStatus: 'Nominal',
    calloutTag: '[ÁREA 44 DER / PROSODIA]',
    calloutBadge: 'ACM DERECHA',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_CORPUS_CALLOSUM',
        name: 'Cuerpo Calloso (Fórceps Menor Frontal)',
        category: 'Fibras Comisurales Interhemisféricas',
        fibersCount: 36,
        myelination: 91,
        conductionVelocity: 51.0,
        clinicalDisconnectionSummary: 'Desconexión transcallosa anterior impide coordinar la tonalidad prosódica derecha con la sintaxis izquierda.'
      }
    ]
  },
  {
    id: 'GLASSER_R_4',
    name: 'Área 4 Derecha (Corteza Motora Primaria Derecha - Hemicuerpo Izquierdo)',
    shortName: 'Area 4 Der [M1]',
    atlasId: 'HCP-MMP1.0_R_4',
    system: 'Motor / Somatosensorial',
    hemisphere: 'right',
    lobe: 'Frontal',
    type: 'cortical',
    mniCoordinates: [38, -20, 54],
    position: [1.152, 1.1847, -0.0778],
    vertexIndex: 377,
    surfaceNormal: [0.4649, 0.8289, 0.3113],
    color: '#10b981',
    baseFiringRate: 61.2,
    bloodSupply: 'Arteria Cerebral Media Derecha (ACM M3)',
    arterialTerritoryId: 'MCA_SUPERIOR',
    cognitiveFunction: 'Control somatomotor voluntario contralateral izquierdo (cara, miembro superior e inferior izquierdos).',
    clinicalCorrelation: 'Hemiplejia espástica izquierda, hiperreflexia tendinosa y clonus en hemicuerpo izquierdo.',
    connectivityStatus: 'Nominal',
    calloutTag: '[M1 DERECHA]',
    calloutBadge: 'ACM DERECHA M3',
    calloutVariant: 'nominal',
    radius: 0.08,
    associatedTracts: [
      {
        tractId: 'TRACT_CORTICOSPINAL',
        name: 'Tracto Corticoespinal Derecho (Vía Piramidal)',
        category: 'Fibras de Proyección Descendente',
        fibersCount: 48,
        myelination: 98,
        conductionVelocity: 68.0,
        clinicalDisconnectionSummary: 'Hemiplejia contralateral izquierda densa.'
      }
    ]
  },
  {
    id: 'GLASSER_R_V1',
    name: 'Área V1 Derecha (Corteza Visual Primaria Derecha - Hemicampo Izquierdo)',
    shortName: 'Area V1 Der [Visual]',
    atlasId: 'HCP-MMP1.0_R_V1',
    system: 'Visual',
    hemisphere: 'right',
    lobe: 'Occipital',
    type: 'cortical',
    mniCoordinates: [12, -88, 2],
    position: [0.4089, -0.3883, -2.0601],
    vertexIndex: 3895,
    surfaceNormal: [0.1547, -0.109, -0.9819],
    color: '#a855f7',
    baseFiringRate: 35.8,
    bloodSupply: 'Arteria Cerebral Posterior Derecha (ACP P3)',
    arterialTerritoryId: 'PCA_P3',
    cognitiveFunction: 'Mapeo retinotópico de hemicampo visual contralateral izquierdo.',
    clinicalCorrelation: 'Hemianopsia homónima izquierda.',
    connectivityStatus: 'Nominal',
    calloutTag: '[V1 DERECHA]',
    calloutBadge: 'ACP DERECHA P3',
    calloutVariant: 'nominal',
    radius: 0.08,
    associatedTracts: [
      {
        tractId: 'TRACT_CORPUS_CALLOSUM',
        name: 'Cuerpo Calloso (Fórceps Mayor Esplenial)',
        category: 'Fibras Comisurales Occipitales',
        fibersCount: 36,
        myelination: 89,
        conductionVelocity: 50.0,
        clinicalDisconnectionSummary: 'Desconexión entre corteza visual derecha y áreas del lenguaje en el hemisferio izquierdo.'
      }
    ]
  },
  {
    id: 'GLASSER_R_A1',
    name: 'Área A1 Derecha (Corteza Auditiva Primaria Derecha - Tonalidad Musical)',
    shortName: 'Area A1 Der [Auditiva]',
    atlasId: 'HCP-MMP1.0_R_A1',
    system: 'Lenguaje & Auditivo',
    hemisphere: 'right',
    lobe: 'Temporal',
    type: 'cortical',
    mniCoordinates: [44, -20, 8],
    position: [1.6376, -0.2674, -0.0545],
    vertexIndex: 5369,
    surfaceNormal: [0.8914, -0.4135, 0.1854],
    color: '#22d3ee',
    baseFiringRate: 64.0,
    bloodSupply: 'Arteria Cerebral Media Derecha (ACM M3)',
    arterialTerritoryId: 'MCA_SUPERIOR',
    cognitiveFunction: 'Procesamiento de altura tonal musical, timbre, armonía y localización auditiva espacial en hemiespacio izquierdo.',
    clinicalCorrelation: 'Amusia aperceptiva (incapacidad de reconocer melodías) y negligencia auditiva izquierda.',
    connectivityStatus: 'Nominal',
    calloutTag: '[A1 DERECHA / TIMBRE]',
    calloutBadge: 'HESCHL DERECHO',
    calloutVariant: 'nominal',
    radius: 0.075,
    associatedTracts: [
      {
        tractId: 'TRACT_THALAMIC_RADIATION',
        name: 'Radiación Talámica Auditiva Derecha',
        category: 'Fibras de Proyección Talamocortical',
        fibersCount: 34,
        myelination: 98,
        conductionVelocity: 68.0,
        clinicalDisconnectionSummary: 'Pérdida de aferencias tonales desde el colículo inferior hacia la corteza temporal derecha.'
      }
    ]
  }
];
