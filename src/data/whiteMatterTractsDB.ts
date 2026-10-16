import type { FunctionalSystem } from './glasserAtlasDB';

export interface WhiteMatterTractRecord {
  id: string;
  name: string;
  latinName: string;
  system: FunctionalSystem;
  classification: 'Fascículo de Asociación' | 'Fibras Comisurales' | 'Fibras de Proyección';
  dtiDirection: 'Anterior-Posterior (Verde)' | 'Izquierda-Derecha (Rojo)' | 'Supero-Inferior (Azul)';
  color: string; // DTI tensor standard
  sourceId: string;
  targetId: string;
  connectedNodeIds: string[]; // All regions linked by this tract
  controlPoints: [number, number, number][];
  myelination: number; // %
  baseSpeed: number;   // m/s
  streamlineCount: number;
  spreadRadius: number;
  clinicalNote: string;
}

export const WHITE_MATTER_TRACTS_14: WhiteMatterTractRecord[] = [
  // ==========================================
  // 1a. FASCÍCULO ARQUEADO IZQUIERDO (Arcuate Fasciculus - Lenguaje)
  // Asociación / A-P -> DTI Verde
  // Confinado estrictamente intra-cerebral (X in [-1.10, -1.22])
  // Extremos a 2.5 mm debajo de la superficie pial
  // ==========================================
  {
    id: 'TRACT_ARCUATE',
    name: 'Fascículo Arqueado Izquierdo (Vía Dorsal del Lenguaje - Segmentos de Catani)',
    latinName: 'Fasciculus arcuatus sinister',
    system: 'Lenguaje & Auditivo',
    classification: 'Fascículo de Asociación',
    dtiDirection: 'Anterior-Posterior (Verde)',
    color: '#10b981', // DTI Verde
    sourceId: 'GLASSER_PSL',
    targetId: 'GLASSER_44',
    connectedNodeIds: ['GLASSER_PSL', 'GLASSER_STV', 'GLASSER_44', 'GLASSER_45', 'GLASSER_PBELT'],
    controlPoints: [
      [-1.22, 0.08, -0.45], // PSL / Wernicke cara profunda (2.5 mm bajo corteza)
      [-1.18, 0.22, -0.15], // Rama vertical temporal posterior
      [-1.12, 0.42, 0.35],  // Arco perisilviano profundo
      [-1.10, 0.25, 0.65],  // Opérculo frontoparietal profundo
      [-1.16, -0.02, 0.82]  // Broca Área 44 cara profunda (2.5 mm bajo corteza)
    ],
    myelination: 95,
    baseSpeed: 62.0,
    streamlineCount: 44,
    spreadRadius: 0.028,
    clinicalNote: 'Arco en "C" intra-cerebral en la profundidad de la cisura de Silvio izquierda. Conecta el giro temporal superior con el opérculo frontal. Su sección lesional causa la Afasia de Conducción clásica con severo déficit de repetición.'
  },

  // ==========================================
  // 1b. FASCÍCULO ARQUEADO DERECHO (Right Arcuate - Vía de la Prosodia)
  // Asociación / A-P -> DTI Verde
  // Espejo exacto intra-cerebral en hemisferio derecho (X in [1.10, 1.22])
  // ==========================================
  {
    id: 'TRACT_ARCUATE_RIGHT',
    name: 'Fascículo Arqueado Derecho (Vía de la Prosodia y Entonación Afectiva)',
    latinName: 'Fasciculus arcuatus dexter',
    system: 'Lenguaje & Auditivo',
    classification: 'Fascículo de Asociación',
    dtiDirection: 'Anterior-Posterior (Verde)',
    color: '#10b981', // DTI Verde
    sourceId: 'GLASSER_R_A1',
    targetId: 'GLASSER_R_44',
    connectedNodeIds: ['GLASSER_R_A1', 'GLASSER_R_44', 'GLASSER_R_4'],
    controlPoints: [
      [1.22, 0.08, -0.45], // Temporal homólogo profundo
      [1.18, 0.22, -0.15], // Rama vertical temporal posterior derecha
      [1.12, 0.42, 0.35],  // Arco perisilviano derecho profundo
      [1.10, 0.25, 0.65],  // Opérculo frontoparietal derecho
      [1.16, -0.02, 0.82]  // Área 44 Derecha profunda (Prosodia)
    ],
    myelination: 94,
    baseSpeed: 60.0,
    streamlineCount: 40,
    spreadRadius: 0.028,
    clinicalNote: 'Haz homólogo derecho del fascículo arqueado situado íntegramente en el tejido blanco del hemisferio derecho. Conecta áreas temporales derechas con el área 44 derecha para modular la prosodia afectiva y la musicalidad del habla.'
  },

  // ==========================================
  // 2. FASCÍCULO LONGITUDINAL SUPERIOR (SLF I, II, III)
  // Asociación / A-P -> DTI Verde
  // Confinado a centro semioval izquierdo
  // ==========================================
  {
    id: 'TRACT_SLF',
    name: 'Fascículo Longitudinal Superior (SLF I, II, III - Red Frontoparietal)',
    latinName: 'Fasciculus longitudinalis superior',
    system: 'Motor / Somatosensorial',
    classification: 'Fascículo de Asociación',
    dtiDirection: 'Anterior-Posterior (Verde)',
    color: '#22c55e', // DTI Verde
    sourceId: 'GLASSER_3B_1',
    targetId: 'GLASSER_DLPFC',
    connectedNodeIds: ['GLASSER_3B_1', 'GLASSER_5M_7AL', 'GLASSER_FEF', 'GLASSER_DLPFC', 'GLASSER_44'],
    controlPoints: [
      [-1.15, 1.15, -0.20], // S1 cara profunda
      [-1.18, 1.05, 0.38],  // Lóbulo parietal superior profundo
      [-1.16, 0.82, 1.05],  // Transición frontoparietal profunda
      [-1.12, 0.52, 1.45]   // DLPFC cara profunda
    ],
    myelination: 92,
    baseSpeed: 55.0,
    streamlineCount: 42,
    spreadRadius: 0.026,
    clinicalNote: 'Comunica el córtex somatosensorial y parietal posterior con áreas prefrontales dorsolaterales y campos oculares (FEF) para el control de la atención espacial y la memoria de trabajo.'
  },

  // ==========================================
  // 3. FASCÍCULO LONGITUDINAL INFERIOR (ILF)
  // Asociación / A-P -> DTI Verde
  // ==========================================
  {
    id: 'TRACT_ILF',
    name: 'Fascículo Longitudinal Inferior (ILF - Vía Ventral Occipitotemporal)',
    latinName: 'Fasciculus longitudinalis inferior',
    system: 'Visual',
    classification: 'Fascículo de Asociación',
    dtiDirection: 'Anterior-Posterior (Verde)',
    color: '#14b8a6', // DTI Verde-Teal
    sourceId: 'GLASSER_V1',
    targetId: 'GLASSER_FFC',
    connectedNodeIds: ['GLASSER_V1', 'GLASSER_V2_V3', 'GLASSER_V4', 'GLASSER_FFC', 'GLASSER_PSL'],
    controlPoints: [
      [-0.38, -0.42, -2.25], // V1 Calcarina profunda
      [-0.75, -0.65, -1.85], // Occipital ventral profundo
      [-1.02, -0.85, -1.35], // FFC fusiforme profundo
      [-1.12, -0.95, -0.85], // Giro temporal inferior profundo
      [-1.15, -0.75, -0.45]  // Polo temporal ventral profundo
    ],
    myelination: 92,
    baseSpeed: 55.0,
    streamlineCount: 38,
    spreadRadius: 0.026,
    clinicalNote: 'Conecta la corteza visual occipital con el polo temporal anterior a lo largo del giro fusiforme. Su desconexión ocasiona prosopagnosia asociativa, agnosia visual de objetos y alexia pura.'
  },

  // ==========================================
  // 4. FASCÍCULO FRONTO-OCCIPITAL INFERIOR (IFOF)
  // Asociación / A-P -> DTI Verde-Azulado
  // ==========================================
  {
    id: 'TRACT_IFOF',
    name: 'Fascículo Fronto-Occipital Inferior (IFOF - Vía Semántica Ventral)',
    latinName: 'Fasciculus fronto-occipitalis inferior',
    system: 'Lenguaje & Auditivo',
    classification: 'Fascículo de Asociación',
    dtiDirection: 'Anterior-Posterior (Verde)',
    color: '#059669', // DTI Verde Esmeralda
    sourceId: 'GLASSER_V1',
    targetId: 'GLASSER_45',
    connectedNodeIds: ['GLASSER_V1', 'GLASSER_V4', 'GLASSER_AVI', 'GLASSER_45', 'GLASSER_47L_OFC'],
    controlPoints: [
      [-0.38, -0.42, -2.25], // V1 occipital profundo
      [-0.72, -0.25, -1.35], // Cápsula interna posterior profunda
      [-0.98, -0.20, -0.25], // Istmo insular / cápsula externa profunda
      [-1.08, -0.28, 0.75],  // Vía subinsular frontal
      [-1.12, -0.35, 1.25]   // Broca Pars Triangularis profunda
    ],
    myelination: 91,
    baseSpeed: 53.0,
    streamlineCount: 40,
    spreadRadius: 0.026,
    clinicalNote: 'El tracto de asociación más largo del cerebro humano; atraviesa el piso de la ínsula externa. Su lesión o estimulación eléctrica intraoperatoria provoca paraphasias semánticas irreversibles.'
  },

  // ==========================================
  // 5. FASCÍCULO UNCINADO (Uncinate Fasciculus)
  // Asociación / A-P -> DTI Verde Lima
  // ==========================================
  {
    id: 'TRACT_UNCINATE',
    name: 'Fascículo Uncinado (Polo Temporal a Corteza Orbitofrontal)',
    latinName: 'Fasciculus uncinatus',
    system: 'Red Ejecutiva & Saliencia',
    classification: 'Fascículo de Asociación',
    dtiDirection: 'Anterior-Posterior (Verde)',
    color: '#84cc16', // DTI Verde Lima
    sourceId: 'GLASSER_AMYGDALA',
    targetId: 'GLASSER_47L_OFC',
    connectedNodeIds: ['GLASSER_AMYGDALA', 'GLASSER_HIPPOCAMPUS', 'GLASSER_47L_OFC', 'GLASSER_45'],
    controlPoints: [
      [-0.68, -1.05, 0.35], // Complejo amigdalino
      [-0.95, -0.80, 0.55], // Gancho uncinado (limen insulae profundo)
      [-1.05, -0.65, 0.95], // Cara anterior de cápsula externa
      [-1.08, -0.85, 1.35]  // Corteza orbitofrontal 47l cara profunda
    ],
    myelination: 88,
    baseSpeed: 48.0,
    streamlineCount: 32,
    spreadRadius: 0.025,
    clinicalNote: 'Fascículo en forma de gancho que curva alrededor del limen de la ínsula. Su lesión interrumpe la regulación prefrontal de la amígdala, desinhibiendo conductas impulsivas y reactividad afectiva.'
  },

  // ==========================================
  // 6. FASCÍCULO DEL CÍNGULO (Cingulum Bundle)
  // Asociación / A-P -> DTI Verde Olivo
  // ==========================================
  {
    id: 'TRACT_CINGULUM',
    name: 'Fascículo del Cíngulo (Arco Límbico Pericalloso y Parahipocampal)',
    latinName: 'Cingulum',
    system: 'Límbico / Memoria',
    classification: 'Fascículo de Asociación',
    dtiDirection: 'Anterior-Posterior (Verde)',
    color: '#65a30d', // DTI Verde Olivo
    sourceId: 'GLASSER_24DD_ACC',
    targetId: 'GLASSER_HIPPOCAMPUS',
    connectedNodeIds: ['GLASSER_24DD_ACC', 'GLASSER_23D_PCC', 'GLASSER_HIPPOCAMPUS', 'GLASSER_ENTORHINAL'],
    controlPoints: [
      [-0.244, 0.702, 1.165],  // dACC
      [-0.28, 0.95, 0.35],     // Cíngulo medio sobre cuerpo calloso
      [-0.302, 0.503, -1.233], // PCC / Precúneo
      [-0.55, -0.15, -1.15],   // Istmo del cíngulo
      [-0.82, -0.75, -0.45],   // Giro parahipocampal
      [-0.910, -1.010, -0.145] // Hipocampo
    ],
    myelination: 93,
    baseSpeed: 54.0,
    streamlineCount: 38,
    spreadRadius: 0.025,
    clinicalNote: 'Arco medial que rodea por completo el cuerpo calloso. Circuito fundamental de Papez para la memoria episódica, la autorregulación emocional y la red DMN.'
  },

  // ==========================================
  // 7. FASCÍCULO ASLANT FRONTAL (FAT)
  // Asociación / A-P & Oblicuo -> DTI Verde Claro
  // ==========================================
  {
    id: 'TRACT_FAT',
    name: 'Fascículo Aslant Frontal (FAT - Eje SMA a Broca)',
    latinName: 'Tractus frontalis aslant',
    system: 'Lenguaje & Auditivo',
    classification: 'Fascículo de Asociación',
    dtiDirection: 'Anterior-Posterior (Verde)',
    color: '#2dd4bf', // DTI Verde Aqua
    sourceId: 'GLASSER_6D_SMA',
    targetId: 'GLASSER_44',
    connectedNodeIds: ['GLASSER_6D_SMA', 'GLASSER_55B', 'GLASSER_44'],
    controlPoints: [
      [-0.72, 1.35, 0.35],  // SMA cara profunda
      [-0.92, 1.05, 0.55],  // Sustancia blanca frontal oblicua
      [-1.05, 0.55, 0.75],  // Corona radiada frontal anterior
      [-1.16, -0.02, 0.82]  // Broca 44 cara profunda
    ],
    myelination: 92,
    baseSpeed: 56.4,
    streamlineCount: 34,
    spreadRadius: 0.025,
    clinicalNote: 'Tracto oblicuo frontal intra-cerebral. Su preservación es crítica en resecciones de gliomas frontales para evitar mutismo motor transcortical posoperatorio.'
  },

  // ==========================================
  // 8. FÓRNIX (Fornix)
  // Asociación / Proyección Límbica -> DTI Verde-Azul
  // ==========================================
  {
    id: 'TRACT_FORNIX',
    name: 'Fórnix (Columnas, Cuerpo y Pilares del Trígono Cerebral)',
    latinName: 'Fornix',
    system: 'Límbico / Memoria',
    classification: 'Fibras de Proyección',
    dtiDirection: 'Anterior-Posterior (Verde)',
    color: '#06b6d4', // DTI Cyan Límbico
    sourceId: 'GLASSER_HIPPOCAMPUS',
    targetId: 'SUBCORTICAL_THALAMUS',
    connectedNodeIds: ['GLASSER_HIPPOCAMPUS', 'GLASSER_ENTORHINAL', 'SUBCORTICAL_THALAMUS'],
    controlPoints: [
      [-0.75, -0.95, -0.15], // Hipocampo (Fimbria)
      [-0.52, -0.42, -0.65], // Pilar posterior
      [-0.15, 0.12, -0.40],  // Cuerpo del fórnix bajo el calloso
      [-0.08, 0.22, 0.20],   // Columnas anteriores
      [-0.22, -0.12, 0.12]   // Hacia cuerpos mamilares y tálamo anterior
    ],
    myelination: 93,
    baseSpeed: 51.0,
    streamlineCount: 36,
    spreadRadius: 0.025,
    clinicalNote: 'La principal eferencia de la formación hipocampal hacia los núcleos mamilares y el tálamo anterior. Su transección quirúrgica inadvertida causa amnesia anterógrada pura irreversible.'
  },

  // ==========================================
  // 9. CUERPO CALLOSO (Corpus Callosum)
  // Comisural / L-R -> DTI Rojo
  // ==========================================
  {
    id: 'TRACT_CORPUS_CALLOSUM',
    name: 'Cuerpo Calloso (Fórceps Menor, Tronco y Fórceps Mayor)',
    latinName: 'Corpus callosum',
    system: 'Red Ejecutiva & Saliencia',
    classification: 'Fibras Comisurales',
    dtiDirection: 'Izquierda-Derecha (Rojo)',
    color: '#ef4444', // DTI Rojo Comisural
    sourceId: 'GLASSER_44',
    targetId: 'GLASSER_R_44',
    connectedNodeIds: ['GLASSER_44', 'GLASSER_R_44', 'GLASSER_4', 'GLASSER_R_4', 'GLASSER_V1', 'GLASSER_R_V1', 'GLASSER_DLPFC'],
    controlPoints: [
      [-1.16, 0.10, 0.95], // Centro semioval frontal izquierdo
      [-0.72, 0.42, 1.05], // Corona radiada comisural izquierda
      [0.0, 0.55, 1.08],   // Rodilla del calloso (línea media)
      [0.72, 0.42, 1.05],  // Corona radiada comisural derecha
      [1.16, 0.10, 0.95]   // Centro semioval frontal derecho
    ],
    myelination: 92,
    baseSpeed: 56.0,
    streamlineCount: 32,
    spreadRadius: 0.030,
    clinicalNote: 'El mayor haz comisural con más de 200 millones de axones uniendo ambos hemisferios. Su sección en callosotomía para epilepsia genera el clásico síndrome de desconexión callosa (split-brain).'
  },

  // ==========================================
  // 10. COMISURA ANTERIOR (Anterior Commissure)
  // Comisural / L-R -> DTI Rojo Oscuro
  // ==========================================
  {
    id: 'TRACT_ANTERIOR_COMMISSURE',
    name: 'Comisura Anterior (Fibras Intertemporales y Olfatorias)',
    latinName: 'Commissura anterior',
    system: 'Límbico / Memoria',
    classification: 'Fibras Comisurales',
    dtiDirection: 'Izquierda-Derecha (Rojo)',
    color: '#dc2626', // DTI Rojo Oscuro
    sourceId: 'GLASSER_AMYGDALA',
    targetId: 'GLASSER_47L_OFC',
    connectedNodeIds: ['GLASSER_AMYGDALA', 'GLASSER_47L_OFC', 'GLASSER_ENTORHINAL'],
    controlPoints: [
      [-0.72, -1.05, 0.35], // Amígdala Izquierda
      [-0.42, -0.80, 0.32],
      [0.0, -0.52, 0.36],   // Cruce anterior en lámina terminal
      [0.42, -0.80, 0.32],
      [0.72, -1.05, 0.35]   // Amígdala Derecha
    ],
    myelination: 90,
    baseSpeed: 50.0,
    streamlineCount: 30,
    spreadRadius: 0.025,
    clinicalNote: 'Une los polos temporales, los complejos amigdalinos y los bulbos olfatorios a través de la lámina terminal por delante de las columnas del fórnix.'
  },

  // ==========================================
  // 11. TRACTO CORTICOESPINAL Y CORTICOBULBAR (CST)
  // Proyección / S-I -> DTI Azul
  // ==========================================
  {
    id: 'TRACT_CORTICOSPINAL',
    name: 'Tracto Corticoespinal & Corticobulbar (Vía Piramidal Motora)',
    latinName: 'Tractus corticospinalis',
    system: 'Motor / Somatosensorial',
    classification: 'Fibras de Proyección',
    dtiDirection: 'Supero-Inferior (Azul)',
    color: '#0284c7', // DTI Azul Proyección
    sourceId: 'GLASSER_4',
    targetId: 'SUBCORTICAL_BRAINSTEM_NUC',
    connectedNodeIds: ['GLASSER_4', 'GLASSER_6D_SMA', 'SUBCORTICAL_STRIATUM', 'SUBCORTICAL_SN', 'SUBCORTICAL_BRAINSTEM_NUC'],
    controlPoints: [
      [-1.15, 1.22, -0.06], // M1 cara profunda (2.5 mm bajo corteza motora)
      [-0.85, 0.82, -0.05], // Corona radiada motora
      [-0.62, 0.35, -0.02], // Brazo posterior de la cápsula interna
      [-0.40, -0.25, -0.15], // Pedúnculo cerebral mesencefálico
      [-0.25, -0.85, -0.45], // Fascículo pontino longitudinal
      [-0.08, -1.55, -0.75]  // Pirámides bulbares y decusación
    ],
    myelination: 98,
    baseSpeed: 68.0,
    streamlineCount: 48,
    spreadRadius: 0.028,
    clinicalNote: 'La vía motora primaria del control voluntario somático. Desciende condensándose en el brazo posterior de la cápsula interna hacia las pirámides bulbares, donde el 85-90% de fibras decusan en la unión bulbomedular.'
  },

  // ==========================================
  // 12. RADIACIONES TALÁMICAS Y LEMNISCO MEDIAL
  // Proyección / S-I -> DTI Azul Cobalto
  // ==========================================
  {
    id: 'TRACT_THALAMIC_RADIATION',
    name: 'Radiaciones Talámicas (Superior/Anterior/Posterior) & Lemnisco Medial',
    latinName: 'Radiationes thalamicae',
    system: 'Motor / Somatosensorial',
    classification: 'Fibras de Proyección',
    dtiDirection: 'Supero-Inferior (Azul)',
    color: '#2563eb', // DTI Azul Cobalto
    sourceId: 'SUBCORTICAL_THALAMUS',
    targetId: 'GLASSER_3B_1',
    connectedNodeIds: ['SUBCORTICAL_THALAMUS', 'GLASSER_3B_1', 'GLASSER_A1', 'GLASSER_POI1', 'GLASSER_DLPFC'],
    controlPoints: [
      [-0.05, -1.65, -0.85], // Lemnisco medial en bulbo
      [-0.25, -0.95, -0.45], // Tegmento pontomesencefálico
      [-0.40, -0.24, -0.005],// Tálamo VPL/VPM
      [-0.75, 0.52, -0.12],  // Cápsula interna posterior
      [-1.15, 1.18, -0.22]   // S1 cara profunda
    ],
    myelination: 96,
    baseSpeed: 64.0,
    streamlineCount: 42,
    spreadRadius: 0.026,
    clinicalNote: 'Vía somatosensorial epicrítica y propioceptiva que asciende desde los núcleos de Goll y Burdach al tálamo VPL y de allí irradia a S1 en el giro postcentral.'
  },

  // ==========================================
  // 13. RADIACIONES ÓPTICAS (Geniculocalcarinas / Asa de Meyer)
  // Proyección / S-I -> DTI Azul Real
  // ==========================================
  {
    id: 'TRACT_OPTIC_RADIATION',
    name: 'Radiaciones Ópticas (Tracto Geniculocalcarino & Asa de Meyer)',
    latinName: 'Radiatio optica',
    system: 'Visual',
    classification: 'Fibras de Proyección',
    dtiDirection: 'Supero-Inferior (Azul)',
    color: '#3b82f6', // DTI Azul Real
    sourceId: 'SUBCORTICAL_THALAMUS',
    targetId: 'GLASSER_V1',
    connectedNodeIds: ['SUBCORTICAL_THALAMUS', 'GLASSER_V1', 'GLASSER_V2_V3'],
    controlPoints: [
      [-0.40, -0.24, -0.005], // Cuerpo geniculado lateral (LGN)
      [-0.78, -0.35, -0.55],  // Asa de Meyer (bucle temporal)
      [-0.88, -0.40, -1.45],  // Pared lateral del ventrículo lateral
      [-0.38, -0.42, -2.25]   // V1 Labios de la cisura calcarina cara profunda
    ],
    myelination: 97,
    baseSpeed: 66.0,
    streamlineCount: 44,
    spreadRadius: 0.026,
    clinicalNote: 'Las fibras inferiores arquean hacia adelante sobre el asta temporal del ventrículo lateral formando el Asa de Meyer (Meyer’s loop). Su lesión en lobectomías temporales produce cuadrantanopsia homónima superior contralateral ("pie in the sky").'
  },

  // ==========================================
  // 14. PEDÚNCULOS CEREBELOSOS (Superior, Medio, Inferior)
  // Proyección / S-I -> DTI Azul Oscuro
  // ==========================================
  {
    id: 'TRACT_CEREBELLAR_PEDUNCLE',
    name: 'Pedúnculos Cerebelosos (Superior, Medio e Inferior / Braquium Pontis)',
    latinName: 'Pedunculi cerebellares',
    system: 'Motor / Somatosensorial',
    classification: 'Fibras de Proyección',
    dtiDirection: 'Supero-Inferior (Azul)',
    color: '#1d4ed8', // DTI Azul Marino
    sourceId: 'SUBCORTICAL_BRAINSTEM_NUC',
    targetId: 'SUBCORTICAL_THALAMUS',
    connectedNodeIds: ['SUBCORTICAL_BRAINSTEM_NUC', 'SUBCORTICAL_THALAMUS', 'GLASSER_4'],
    controlPoints: [
      [-0.65, -1.25, -1.75],  // Hemisferio cerebeloso profundo
      [-0.42, -1.10, -1.20],  // Núcleo dentado
      [-0.25, -0.82, -0.82],  // Pedúnculo cerebeloso medio/superior
      [-0.15, -0.55, -0.35],  // Decusación de Wernekinck en mesencéfalo
      [-0.38, -0.24, -0.005]  // Tálamo motor VL
    ],
    myelination: 96,
    baseSpeed: 64.0,
    streamlineCount: 42,
    spreadRadius: 0.026,
    clinicalNote: 'Comunica el cerebelo con el tronco y el tálamo motor. Su interrupción genera dismetría, adiadococinesia, temblor intencional cinético y ataxia de extremidades.'
  }
];
