export interface NeurochemicalPathway {
  id: string;
  name: string;
  system: 'DA' | '5HT' | 'NE' | 'ACH' | 'GABA_GLU';
  systemName: string;
  originNucleus: string;
  targetRegions: string[];
  color: string;
  particleSpeed: number;
  particleDensity: number;
  controlPoints: [number, number, number][];
  physiologicalRole: string;
  clinicalSignificance: string;
}

export interface PharmacologicalAgent {
  id: string;
  name: string;
  class: string;
  primarySystem: 'DA' | '5HT' | 'NE' | 'ACH' | 'GABA_GLU' | 'NONE';
  mechanismOfAction: string;
  targetReceptors: string[];
  membraneEffect: 'EPSP' | 'IPSP' | 'ESTABILIZADOR' | 'FISIOLÓGICO';
  membraneDeltaMv: number;       // e.g. -12 mV for GABA hyperpolarization, +8 mV for Glutamate/DA
  firingRateMultiplier: number;  // e.g. 0.4 for Haloperidol / Diazepam, 1.6 for Levodopa
  pathwaySpeedMultiplier: number;
  clinicalIndications: string[];
  neurologicalAdverseEffects: string;
  pearl: string;
}

// 5 Great Neurochemical Projection Systems (3D coordinates in Three.js MNI space)
export const NEUROCHEMICAL_PATHWAYS: NeurochemicalPathway[] = [
  // ==========================================
  // 1. SISTEMA DOPAMINÉRGICO (DA - AMBER/GOLD)
  // ==========================================
  {
    id: 'DA_NIGROSTRIATAL',
    name: 'Vía Dopaminérgica Nigroestriada',
    system: 'DA',
    systemName: 'Sistema Dopaminérgico (DA)',
    originNucleus: 'Sustancia Negra Pars Compacta (SNc - Mesencéfalo)',
    targetRegions: ['Caudado / Putamen (Estriado Dorsal)', 'Globo Pálido'],
    color: '#f59e0b', // Amber
    particleSpeed: 1.0,
    particleDensity: 28,
    controlPoints: [
      [-0.35, -0.65, -0.05], // SNc mesencefálica
      [-0.55, -0.25, 0.15],
      [-0.70, 0.28, 0.35]    // Estriado / Putamen
    ],
    physiologicalRole: 'Control fino del inicio del movimiento motor voluntario y modulación de la vía directa/indirecta de los ganglios basales.',
    clinicalSignificance: 'Degeneración de más del 70% de sus somas causa Enfermedad de Parkinson (temblor en reposo, rigidez en rueda dentada, bradicinesia). Su bloqueo produce extrapiramidalismo agudo.'
  },
  {
    id: 'DA_MESOLIMBIC',
    name: 'Vía Dopaminérgica Mesolímbica',
    system: 'DA',
    systemName: 'Sistema Dopaminérgico (DA)',
    originNucleus: 'Área Tegmental Ventral (VTA - Mesencéfalo medial)',
    targetRegions: ['Núcleo Accumbens (Estriado Ventral)', 'Amígdala', 'Hipocampo'],
    color: '#fbbf24', // Amber light
    particleSpeed: 1.15,
    particleDensity: 24,
    controlPoints: [
      [-0.14, -0.58, -0.15], // VTA
      [-0.32, -0.20, -0.10],
      [-0.48, 0.42, 0.12]    // Núcleo Accumbens ventral
    ],
    physiologicalRole: 'Procesamiento de recompensa, refuerzo positivo, prominencia de incentivo y motivación hedónica.',
    clinicalSignificance: 'Hiperactividad dopaminérgica D2 subcortical en esta vía produce síntomas positivos de la esquizofrenia (delirios y alucinaciones). Es el eje central del circuito de adicción.'
  },
  {
    id: 'DA_MESOCORTICAL',
    name: 'Vía Dopaminérgica Mesocortical',
    system: 'DA',
    systemName: 'Sistema Dopaminérgico (DA)',
    originNucleus: 'Área Tegmental Ventral (VTA)',
    targetRegions: ['Corteza Prefrontal Dorsolateral (DLPFC)', 'Corteza Cingulada Anterior'],
    color: '#f97316', // Orange
    particleSpeed: 1.25,
    particleDensity: 26,
    controlPoints: [
      [-0.14, -0.58, -0.15], // VTA
      [-0.45, 0.25, 0.45],
      [-1.47, 1.26, 1.48]    // DLPFC (Área 9-46d)
    ],
    physiologicalRole: 'Funciones ejecutivas superiores, memoria de trabajo, cognición y flexibilidad atencional.',
    clinicalSignificance: 'Hipoactividad dopaminérgica en receptores D1 prefrontales explica los síntomas negativos y cognitivos de la esquizofrenia (apatía, abulia, aplanamiento afectivo).'
  },
  {
    id: 'DA_TUBEROINFUNDIBULAR',
    name: 'Vía Dopaminérgica Tuberoinfundibular',
    system: 'DA',
    systemName: 'Sistema Dopaminérgico (DA)',
    originNucleus: 'Núcleo Arqueado / Periventricular del Hipotálamo',
    targetRegions: ['Eminencia Media / Lóbulo Anterior de Hipófisis (Adenohipófisis)'],
    color: '#eab308', // Gold
    particleSpeed: 0.8,
    particleDensity: 16,
    controlPoints: [
      [-0.12, -0.15, -0.25], // Hipotálamo
      [-0.08, -0.42, -0.40],
      [-0.05, -0.65, -0.52]  // Tallo hipofisario
    ],
    physiologicalRole: 'Inhibición tónica de la secreción de prolactina por las células lactotropas hipofisarias mediante receptores D2.',
    clinicalSignificance: 'El bloqueo de D2 por antipsicóticos típicos produce hiperprolactinemia sintomática (galactorrea, amenorrea, ginecomastia y disfunción sexual).'
  },

  // ==========================================
  // 2. SISTEMA SEROTONINÉRGICO (5-HT - MAGENTA)
  // ==========================================
  {
    id: 'SEROTONIN_DORSAL_RAPHE',
    name: 'Vía Serotoninérgica Ascendente del Rafe',
    system: '5HT',
    systemName: 'Sistema Serotoninérgico (5-HT)',
    originNucleus: 'Núcleo Dorsal del Rafe (Mesencéfalo y Protuberancia)',
    targetRegions: ['Corteza Prefrontal', 'Amígdala', 'Ganglios Basales', 'Hipotálamo'],
    color: '#d946ef', // Fuchsia
    particleSpeed: 0.95,
    particleDensity: 30,
    controlPoints: [
      [0.0, -0.98, -0.55],   // Rafe troncoencefálico
      [-0.25, -0.45, -0.10],
      [-0.75, 0.45, 0.45],
      [-1.47, 1.26, 1.48]    // Corteza prefrontal
    ],
    physiologicalRole: 'Regulación del estado de ánimo, afecto, modulación del dolor, impulsividad, apetito y ritmos circadianos.',
    clinicalSignificance: 'Diana terapéutica primaria de los ISRS (Fluoxetina, Sertralina) en depresión mayor y trastornos de ansiedad. Su exceso agudo precipita el Síndrome Serotoninérgico potencialmente letal.'
  },

  // ==========================================
  // 3. SISTEMA NORADRENÉRGICO (NE - CYAN)
  // ==========================================
  {
    id: 'NE_LOCUS_COERULEUS',
    name: 'Vía Noradrenérgica del Locus Coeruleus',
    system: 'NE',
    systemName: 'Sistema Noradrenérgico (NE)',
    originNucleus: 'Locus Coeruleus (Tegmento Pontino Dorsal)',
    targetRegions: ['Toda la Neocorteza', 'Tálamo', 'Amígdala', 'Médula Espinal'],
    color: '#06b6d4', // Cyan
    particleSpeed: 1.35,
    particleDensity: 32,
    controlPoints: [
      [-0.21, -1.19, -0.48], // Locus Coeruleus
      [-0.35, -0.55, -0.05],
      [-0.85, 0.15, 0.65],
      [-1.33, 0.95, 1.20]    // Proyección cortical difusa
    ],
    physiologicalRole: 'Sistema de alerta máxima, vigilancia, orientación sensorial, respuesta de estrés ("lucha o huida") y fijación de memoria.',
    clinicalSignificance: 'Hiperreactividad vinculada a Trastorno por Estrés Postraumático (TEPT) y ataques de pánico. Los agonistas alfa-2 (Clonidina) atenúan el hipertono autonómico central en abstinencia.'
  },

  // ==========================================
  // 4. SISTEMA COLINÉRGICO (ACh - ESMERALDA)
  // ==========================================
  {
    id: 'ACH_MEYNERT',
    name: 'Vía Colinérgica Basal de Meynert',
    system: 'ACH',
    systemName: 'Sistema Colinérgico (ACh)',
    originNucleus: 'Núcleo Basal de Meynert (Sustancia Innominada del Prosencéfalo Basal)',
    targetRegions: ['Toda la Neocorteza', 'Hipocampo', 'Amígdala'],
    color: '#10b981', // Emerald
    particleSpeed: 0.9,
    particleDensity: 28,
    controlPoints: [
      [-0.49, -0.07, -0.21], // Núcleo Basal de Meynert
      [-0.75, -0.45, 0.05],
      [-0.91, -1.01, -0.14], // Hipocampo
      [-1.45, 0.35, 0.85]    // Corteza asociativa
    ],
    physiologicalRole: 'Atención selectiva sostenida, codificación de memoria a largo plazo, neuroplasticidad y desincronización cortical electroencefalográfica.',
    clinicalSignificance: 'La pérdida masiva (>80%) de neuronas colinérgicas en el Núcleo de Meynert es el sustrato patológico central en la Enfermedad de Alzheimer. Mejorado por inhibidores de acetilcolinesterasa (Donepezilo).'
  },

  // ==========================================
  // 5. SISTEMA GABA / GLUTAMATO (BALANCE EXCITADOR/INHIBIDOR)
  // ==========================================
  {
    id: 'GABA_STRIATAL_INTERNEURONS',
    name: 'Red Cortico-Estriatal GABA / Glutamato',
    system: 'GABA_GLU',
    systemName: 'Balance Glutamato (NMDA/AMPA) / GABA (GABA_A/GABA_B)',
    originNucleus: 'Interneuronas GABAérgicas Corticales y Talamocorticales Glutamatérgicas',
    targetRegions: ['Corteza Somatosensorial / Motora', 'Tálamo'],
    color: '#8b5cf6', // Violet
    particleSpeed: 1.05,
    particleDensity: 30,
    controlPoints: [
      [-0.42, -0.63, 0.08],  // Tálamo VPL/VL
      [-0.85, -0.25, 0.75],
      [-1.47, -0.91, 1.28]   // S1 / M1 Corteza
    ],
    physiologicalRole: 'Mantenimiento del umbral crítico de disparo epileptiforme y modulación de la plasticidad sináptica por balance excitation/inhibition (E/I).',
    clinicalSignificance: 'La apertura del canal de Cloro por modulación alostérica positiva de GABA_A previene la propagación de crisis comiciales y produce sedación/ansiólisis profunda.'
  }
];

// Clinical Pharmacological Agents
export const PHARMACOLOGICAL_AGENTS: PharmacologicalAgent[] = [
  {
    id: 'DRUG_PHYSIOLOGICAL',
    name: 'Fisiológico Basal (Sin Fármaco)',
    class: 'Homeostasis Endógena',
    primarySystem: 'NONE',
    mechanismOfAction: 'Tono neuroquímico endógeno basal sin intervención farmacológica exógena.',
    targetReceptors: ['Todos los receptores en estado de equilibrio fisiológico'],
    membraneEffect: 'FISIOLÓGICO',
    membraneDeltaMv: 0,
    firingRateMultiplier: 1.0,
    pathwaySpeedMultiplier: 1.0,
    clinicalIndications: ['Estado fisiológico de reposo'],
    neurologicalAdverseEffects: 'Ninguno.',
    pearl: 'El potencial de reposo normal oscila entre -65 mV y -70 mV mantenido por la bomba Na+/K+ ATPasa.'
  },
  {
    id: 'DRUG_LEVODOPA',
    name: 'Levodopa / Carbidopa',
    class: 'Precursor Dopaminérgico Central + Inhibidor DDC Periférico',
    primarySystem: 'DA',
    mechanismOfAction: 'Cruza la barrera hematoencefálica mediante el transportador LAT1 y se descarboxila a Dopamina en las terminales presinápticas nigroestriadas remanentes.',
    targetReceptors: ['D1 (acoplado a Gs - estimula adenilato ciclasa)', 'D2 (acoplado a Gi - inhibe adenilato ciclasa)'],
    membraneEffect: 'EPSP',
    membraneDeltaMv: 6.5,
    firingRateMultiplier: 1.45,
    pathwaySpeedMultiplier: 1.6,
    clinicalIndications: ['Enfermedad de Parkinson (Gold Standard)', 'Parkinsonismos sensibles a dopamina'],
    neurologicalAdverseEffects: 'Discinesias coreicas inducidas por pico de dosis, fluctuaciones motoras ("on-off"), alucinaciones visuales y psicosis por hiperactividad mesolímbica.',
    pearl: 'La carbidopa periférica no cruza la BHE y previene la conversión sistémica a dopamina, evitando náuseas intensas y arritmias cardíacas.'
  },
  {
    id: 'DRUG_HALOPERIDOL',
    name: 'Haloperidol',
    class: 'Antipsicótico Típico de Alta Potencia (Butirofenona)',
    primarySystem: 'DA',
    mechanismOfAction: 'Bloqueo antagonista competitivo potente de alta afinidad de los receptores dopaminérgicos D2 postsinápticos en las vías mesolímbica y nigroestriada.',
    targetReceptors: ['D2 (afinidad nanomolar)', 'Alfa-1 adrenérgico (débil)', 'H1 (muy débil)'],
    membraneEffect: 'IPSP',
    membraneDeltaMv: -7.0,
    firingRateMultiplier: 0.55,
    pathwaySpeedMultiplier: 0.45,
    clinicalIndications: ['Psicosis aguda', 'Agitación psicomotriz', 'Esquizofrenia (síntomas positivos)', 'Corea de Huntington', 'Síndrome de Tourette'],
    neurologicalAdverseEffects: 'Síndrome extrapiramidal agudo (distonía aguda, acatisia, parkinsonismo farmacológico), discinesia tardía irreversible y riesgo de Síndrome Neuroléptico Maligno (rigidez cérea, hipertermia, elevación de CPK).',
    pearl: 'La distonía aguda laríngea o de cuello por haloperidol se revierte de inmediato con Biperideno o Difenhidramina parenteral (anticolinérgicos).'
  },
  {
    id: 'DRUG_CLOZAPINE',
    name: 'Clozapina / Risperidona',
    class: 'Antipsicótico Atípico (Antagonista 5-HT2A / D2)',
    primarySystem: '5HT',
    mechanismOfAction: 'Antagonismo dual de alta afinidad por receptores 5-HT2A corticales con modulación D2 rápida y transitoria. Promueve liberación de dopamina en corteza prefrontal mitigando síntomas negativos.',
    targetReceptors: ['5-HT2A', 'D2 (baja afinidad/disociación rápida)', 'H1', 'Alfa-1', 'M1-M5'],
    membraneEffect: 'ESTABILIZADOR',
    membraneDeltaMv: -3.5,
    firingRateMultiplier: 0.85,
    pathwaySpeedMultiplier: 0.8,
    clinicalIndications: ['Esquizofrenia resistente a tratamiento', 'Psicosis en Enfermedad de Parkinson', 'Conducta suicida recurrente en esquizofrenia'],
    neurologicalAdverseEffects: 'Disminución del umbral convulsivo (crisis comiciales dosis-dependientes), agranulocitosis (requiere biometría hemática obligatoria), miocarditis y sedación extrema.',
    pearl: 'Es el antipsicótico más eficaz de la historia y el único con evidencia sólida en reducir la tasa de suicidio en pacientes con psicosis resistente.'
  },
  {
    id: 'DRUG_SERTRALINE',
    name: 'Sertralina / Fluoxetina',
    class: 'ISRS (Inhibidor Selectivo de la Recaptación de Serotonina)',
    primarySystem: '5HT',
    mechanismOfAction: 'Inhibición selectiva del transportador presináptico de serotonina (SERT), aumentando la biodisponibilidad de 5-HT en la hendidura sináptica y promoviendo la neurogénesis en el giro dentado hipocampal mediante BDNF.',
    targetReceptors: ['SERT (Transportador de serotonina)', 'Receptor Sigma-1 (Sertralina)'],
    membraneEffect: 'ESTABILIZADOR',
    membraneDeltaMv: 2.5,
    firingRateMultiplier: 1.15,
    pathwaySpeedMultiplier: 1.3,
    clinicalIndications: ['Trastorno Depresivo Mayor', 'Trastorno de Ansiedad Generalizada', 'Trastorno Obsesivo-Compulsivo (TOC)', 'Crisis de Angustia (Pánico)'],
    neurologicalAdverseEffects: 'Ansiedad paradójica inicial, cefalea, temblor fino distal, acatisia leve, disfunción sexual (anorgasmia) y riesgo de síndrome serotoninérgico si se asocia con IMAO o Tramadol.',
    pearl: 'El retraso terapéutico de 2 a 4 semanas se debe a la desensibilización necesaria de los autorreceptores inhibitorios presinápticos 5-HT1A en el Rafe.'
  },
  {
    id: 'DRUG_DIAZEPAM',
    name: 'Diazepam / Lorazepam',
    class: 'Benzodiazepina (Modulador Alostérico Positivo de GABA_A)',
    primarySystem: 'GABA_GLU',
    mechanismOfAction: 'Se une a la interfase subunidades Alfa-Gamma del receptor GABA_A ionotrópico, aumentando la frecuencia de apertura del canal de Cloro e hiperpolarizando la membrana neuronal.',
    targetReceptors: ['GABA_A (Subtipo alfa-1: sedación/anticonvulsivante; subtipo alfa-2/3: ansiólisis)'],
    membraneEffect: 'IPSP',
    membraneDeltaMv: -13.5, // Fuerte hiperpolarización Cl-
    firingRateMultiplier: 0.35,
    pathwaySpeedMultiplier: 0.4,
    clinicalIndications: ['Status Epilepticus (Primera línea)', 'Crisis de pánico agudas', 'Abstinencia alcohólica (Escala CIWA-Ar)', 'Espasticidad muscular'],
    neurologicalAdverseEffects: 'Sedación profunda, ataxia, amnesia anterógrada lacunar, depresión respiratoria (potenciada con opioides/alcohol), tolerancia y síndrome de abstinencia potencialmente fatal.',
    pearl: 'Su antídoto de rescate específico en intoxicación pura es el Flumazenil (antagonista competitivo del sitio de benzodiazepinas en GABA_A).'
  },
  {
    id: 'DRUG_DONEPEZIL',
    name: 'Donepezilo',
    class: 'Inhibidor Reversible Selectivo de la Acetilcolinesterasa (AChEI)',
    primarySystem: 'ACH',
    mechanismOfAction: 'Inhibe reversiblemente la enzima acetilcolinesterasa en las hendiduras sinápticas neocorticales e hipocampales, prolongando la acción de la acetilcolina liberada por las neuronas basales de Meynert remanentes.',
    targetReceptors: ['Acetilcolinesterasa (AChE)', 'Receptores Nicotínicos (alfa-7) y Muscarínicos (M1)'],
    membraneEffect: 'EPSP',
    membraneDeltaMv: 4.8,
    firingRateMultiplier: 1.25,
    pathwaySpeedMultiplier: 1.35,
    clinicalIndications: ['Enfermedad de Alzheimer (Leve, moderada y severa)', 'Demencia por Cuerpos de Lewy'],
    neurologicalAdverseEffects: 'Insomnio con pesadillas vívidas (tomar por la mañana), temblor, calambres musculares y efectos parasimpáticos periféricos (bradicardia sinusal, síncope, diarrea y náusea).',
    pearl: 'Antes de iniciar Donepezilo es mandatorio realizar un electrocardiograma para descartar bloqueo aurículo-ventricular o síndrome del seno enfermo.'
  }
];
