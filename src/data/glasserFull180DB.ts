// Mark 1: Full 180 Glasser Cortical Parcellation Database (HCP-MMP1.0)
// Generated automatically according to Glasser et al. (Nature 2016)
import type { FunctionalSystem, AssociatedTractInfo } from './mockGlasserData';

export interface Glasser180Module {
  num: number;
  name: string;
  system: FunctionalSystem;
  color: string;
  lobe: 'Frontal' | 'Temporal' | 'Occipital' | 'Parietal' | 'Insular' | 'Límbico';
  areasCount: number;
  areaIds: string[];
}

export interface GlasserFullNode {
  id: string;
  name: string;
  shortName: string;
  atlasId: string;
  moduleNumber: number;
  moduleName: string;
  system: FunctionalSystem;
  hemisphere: 'left' | 'right' | 'bilateral' | 'subcortical';
  lobe: 'Frontal' | 'Temporal' | 'Occipital' | 'Parietal' | 'Subcortical' | 'Insular' | 'Límbico' | 'Tronco Encefálico';
  type: 'cortical' | 'subcortical';
  position: [number, number, number];
  mniCoordinates: [number, number, number];
  color: string;
  baseFiringRate: number;
  bloodSupply: string;
  arterialTerritoryId: string;
  cognitiveFunction: string;
  clinicalCorrelation: string;
  connectivityStatus: 'Nominal' | 'Hiperactivo' | 'Penumbra Isquémica' | 'Desconexión Severa';
  associatedTract: AssociatedTractInfo;
  associatedTracts: AssociatedTractInfo[];
}

export const GLASSER_MODULES_22: Glasser180Module[] = [
  {
    "num": 1,
    "name": "Corteza Visual Primaria",
    "system": "Visual",
    "color": "#8b5cf6",
    "lobe": "Occipital",
    "areasCount": 1,
    "areaIds": [
      "GLASSER_V1"
    ]
  },
  {
    "num": 2,
    "name": "Corteza Visual Temprana",
    "system": "Visual",
    "color": "#a855f7",
    "lobe": "Occipital",
    "areasCount": 3,
    "areaIds": [
      "GLASSER_V2",
      "GLASSER_V3",
      "GLASSER_V4"
    ]
  },
  {
    "num": 3,
    "name": "Vía Visual Dorsal",
    "system": "Visual",
    "color": "#6366f1",
    "lobe": "Occipital",
    "areasCount": 6,
    "areaIds": [
      "GLASSER_V3A",
      "GLASSER_V3B",
      "GLASSER_V6",
      "GLASSER_V6A",
      "GLASSER_V7",
      "GLASSER_IPS1"
    ]
  },
  {
    "num": 4,
    "name": "Vía Visual Ventral",
    "system": "Visual",
    "color": "#ec4899",
    "lobe": "Temporal",
    "areasCount": 7,
    "areaIds": [
      "GLASSER_V8",
      "GLASSER_VVC",
      "GLASSER_PIT",
      "GLASSER_FFC",
      "GLASSER_VMV1",
      "GLASSER_VMV2",
      "GLASSER_VMV3"
    ]
  },
  {
    "num": 5,
    "name": "Complejo Visual Lateral MT+",
    "system": "Visual",
    "color": "#d946ef",
    "lobe": "Occipital",
    "areasCount": 8,
    "areaIds": [
      "GLASSER_MT",
      "GLASSER_MST",
      "GLASSER_FST",
      "GLASSER_LO1",
      "GLASSER_LO2",
      "GLASSER_LO3",
      "GLASSER_V3CD",
      "GLASSER_V4t"
    ]
  },
  {
    "num": 6,
    "name": "Corteza Somatosensorial y Motora Primaria",
    "system": "Motor / Somatosensorial",
    "color": "#10b981",
    "lobe": "Frontal",
    "areasCount": 5,
    "areaIds": [
      "GLASSER_4",
      "GLASSER_3a",
      "GLASSER_3b",
      "GLASSER_1",
      "GLASSER_2"
    ]
  },
  {
    "num": 7,
    "name": "Lóbulo Paracentral y Cingular Medio",
    "system": "Motor / Somatosensorial",
    "color": "#059669",
    "lobe": "Parietal",
    "areasCount": 5,
    "areaIds": [
      "GLASSER_5m",
      "GLASSER_5mv",
      "GLASSER_5L",
      "GLASSER_24dd",
      "GLASSER_24dv"
    ]
  },
  {
    "num": 8,
    "name": "Corteza Premotora",
    "system": "Motor / Somatosensorial",
    "color": "#14b8a6",
    "lobe": "Frontal",
    "areasCount": 10,
    "areaIds": [
      "GLASSER_6d",
      "GLASSER_6mp",
      "GLASSER_6v",
      "GLASSER_6r",
      "GLASSER_6a",
      "GLASSER_FEF",
      "GLASSER_PEF",
      "GLASSER_55b",
      "GLASSER_6ma",
      "GLASSER_SCEF"
    ]
  },
  {
    "num": 9,
    "name": "Corteza Opercular Posterior",
    "system": "Motor / Somatosensorial",
    "color": "#0d9488",
    "lobe": "Parietal",
    "areasCount": 7,
    "areaIds": [
      "GLASSER_43",
      "GLASSER_FOP1",
      "GLASSER_OP4",
      "GLASSER_OP1",
      "GLASSER_OP2_3",
      "GLASSER_PFcm",
      "GLASSER_52"
    ]
  },
  {
    "num": 10,
    "name": "Corteza Auditiva Temprana",
    "system": "Lenguaje & Auditivo",
    "color": "#06b6d4",
    "lobe": "Temporal",
    "areasCount": 5,
    "areaIds": [
      "GLASSER_A1",
      "GLASSER_LBelt",
      "GLASSER_MBelt",
      "GLASSER_PBelt",
      "GLASSER_RI"
    ]
  },
  {
    "num": 11,
    "name": "Corteza Auditiva de Asociación",
    "system": "Lenguaje & Auditivo",
    "color": "#0284c7",
    "lobe": "Temporal",
    "areasCount": 8,
    "areaIds": [
      "GLASSER_A4",
      "GLASSER_A5",
      "GLASSER_STSdp",
      "GLASSER_STSda",
      "GLASSER_STSvp",
      "GLASSER_STSva",
      "GLASSER_TA2",
      "GLASSER_STGa"
    ]
  },
  {
    "num": 12,
    "name": "Corteza Insular y Frontal Opercular",
    "system": "Límbico / Memoria",
    "color": "#0ea5e9",
    "lobe": "Insular",
    "areasCount": 12,
    "areaIds": [
      "GLASSER_PoI1",
      "GLASSER_PoI2",
      "GLASSER_MI",
      "GLASSER_AVI",
      "GLASSER_AAIC",
      "GLASSER_Pir",
      "GLASSER_FOP2",
      "GLASSER_FOP3",
      "GLASSER_FOP4",
      "GLASSER_FOP5",
      "GLASSER_Ig",
      "GLASSER_PI"
    ]
  },
  {
    "num": 13,
    "name": "Corteza Temporal Medial",
    "system": "Límbico / Memoria",
    "color": "#f59e0b",
    "lobe": "Temporal",
    "areasCount": 8,
    "areaIds": [
      "GLASSER_H",
      "GLASSER_PreS",
      "GLASSER_EC",
      "GLASSER_PeEc",
      "GLASSER_TF",
      "GLASSER_PHA1",
      "GLASSER_PHA2",
      "GLASSER_PHA3"
    ]
  },
  {
    "num": 14,
    "name": "Corteza Temporal Lateral",
    "system": "Límbico / Memoria",
    "color": "#f97316",
    "lobe": "Temporal",
    "areasCount": 9,
    "areaIds": [
      "GLASSER_TGd",
      "GLASSER_TGv",
      "GLASSER_TE1a",
      "GLASSER_TE1m",
      "GLASSER_TE1p",
      "GLASSER_TE2a",
      "GLASSER_TE2p",
      "GLASSER_PHT",
      "GLASSER_PH"
    ]
  },
  {
    "num": 15,
    "name": "Unión Temporo-Parieto-Occipital",
    "system": "Lenguaje & Auditivo",
    "color": "#38bdf8",
    "lobe": "Parietal",
    "areasCount": 6,
    "areaIds": [
      "GLASSER_TPOJ1",
      "GLASSER_TPOJ2",
      "GLASSER_TPOJ3",
      "GLASSER_STV",
      "GLASSER_PSL",
      "GLASSER_PCV"
    ]
  },
  {
    "num": 16,
    "name": "Corteza Parietal Superior",
    "system": "Red Ejecutiva & Saliencia",
    "color": "#84cc16",
    "lobe": "Parietal",
    "areasCount": 10,
    "areaIds": [
      "GLASSER_7Pm",
      "GLASSER_7AL",
      "GLASSER_7Am",
      "GLASSER_7PL",
      "GLASSER_7PC",
      "GLASSER_LIPv",
      "GLASSER_LIPd",
      "GLASSER_VIP",
      "GLASSER_MIP",
      "GLASSER_AIP"
    ]
  },
  {
    "num": 17,
    "name": "Corteza Parietal Inferior",
    "system": "Red Ejecutiva & Saliencia",
    "color": "#22c55e",
    "lobe": "Parietal",
    "areasCount": 10,
    "areaIds": [
      "GLASSER_PGp",
      "GLASSER_PGs",
      "GLASSER_PGi",
      "GLASSER_PFm",
      "GLASSER_PF",
      "GLASSER_PFt",
      "GLASSER_PFop",
      "GLASSER_IP0",
      "GLASSER_IP1",
      "GLASSER_IP2"
    ]
  },
  {
    "num": 18,
    "name": "Corteza Cingular Posterior",
    "system": "Límbico / Memoria",
    "color": "#eab308",
    "lobe": "Límbico",
    "areasCount": 13,
    "areaIds": [
      "GLASSER_DVT",
      "GLASSER_ProS",
      "GLASSER_POS1",
      "GLASSER_POS2",
      "GLASSER_RSC",
      "GLASSER_v23ab",
      "GLASSER_d23ab",
      "GLASSER_31pv",
      "GLASSER_31pd",
      "GLASSER_31a",
      "GLASSER_23c",
      "GLASSER_23d",
      "GLASSER_7m"
    ]
  },
  {
    "num": 19,
    "name": "Corteza Cingular Anterior y Prefrontal Medial",
    "system": "Red Ejecutiva & Saliencia",
    "color": "#f43f5e",
    "lobe": "Frontal",
    "areasCount": 15,
    "areaIds": [
      "GLASSER_33pr",
      "GLASSER_p24pr",
      "GLASSER_a24pr",
      "GLASSER_p24",
      "GLASSER_a24",
      "GLASSER_p32pr",
      "GLASSER_a32pr",
      "GLASSER_d32",
      "GLASSER_p32",
      "GLASSER_s32",
      "GLASSER_8BM",
      "GLASSER_9m",
      "GLASSER_10v",
      "GLASSER_10r",
      "GLASSER_25"
    ]
  },
  {
    "num": 20,
    "name": "Corteza Orbitofrontal y Polar",
    "system": "Red Ejecutiva & Saliencia",
    "color": "#fb7185",
    "lobe": "Frontal",
    "areasCount": 11,
    "areaIds": [
      "GLASSER_47s",
      "GLASSER_47m",
      "GLASSER_a47r",
      "GLASSER_11l",
      "GLASSER_13l",
      "GLASSER_OFC",
      "GLASSER_pOFC",
      "GLASSER_10pp",
      "GLASSER_a10p",
      "GLASSER_p10p",
      "GLASSER_10d"
    ]
  },
  {
    "num": 21,
    "name": "Corteza Frontal Inferior",
    "system": "Lenguaje & Auditivo",
    "color": "#00f0ff",
    "lobe": "Frontal",
    "areasCount": 8,
    "areaIds": [
      "GLASSER_44",
      "GLASSER_45",
      "GLASSER_IFJp",
      "GLASSER_IFJa",
      "GLASSER_IFSp",
      "GLASSER_IFSa",
      "GLASSER_47l",
      "GLASSER_p47r"
    ]
  },
  {
    "num": 22,
    "name": "Corteza Prefrontal Dorsolateral",
    "system": "Red Ejecutiva & Saliencia",
    "color": "#3b82f6",
    "lobe": "Frontal",
    "areasCount": 13,
    "areaIds": [
      "GLASSER_8C",
      "GLASSER_8Av",
      "GLASSER_i6_8",
      "GLASSER_s6_8",
      "GLASSER_SFL",
      "GLASSER_8BL",
      "GLASSER_9p",
      "GLASSER_9a",
      "GLASSER_8Ad",
      "GLASSER_p9_46v",
      "GLASSER_a9_46v",
      "GLASSER_46",
      "GLASSER_9_46d"
    ]
  }
];

export const GLASSER_FULL_180_NODES: GlasserFullNode[] = [
  {
    "id": "GLASSER_V1",
    "name": "Área V1 (Corteza Visual Primaria / Estriada / BA 17)",
    "shortName": "Área V1",
    "atlasId": "HCP-MMP1.0_L_V1",
    "moduleNumber": 1,
    "moduleName": "Corteza Visual Primaria",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Occipital",
    "type": "cortical",
    "position": [
      -0.42,
      -0.4708,
      -2.2593
    ],
    "mniCoordinates": [
      -12.0,
      -82.4,
      1.4
    ],
    "color": "#8b5cf6",
    "baseFiringRate": 46.3,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Rama Calcarina / P3)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Recepción retinotópica primaria, detección de contornos, bordes y frecuencia espacial.",
    "clinicalCorrelation": "Ceguera cortical focal, escotoma homónimo denso contralateral.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_OPTIC_RADIATION",
      "name": "Radiaciones Ópticas (Geniculocalcarinas / Asa de Meyer)",
      "category": "Fibras de Proyección Talamocortical",
      "fibersCount": 28000,
      "myelination": 94,
      "conductionVelocity": 62,
      "clinicalDisconnectionSummary": "Hemianopsia o cuadrantanopsia homónima contralateral con respeto macular"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_OPTIC_RADIATION",
        "name": "Radiaciones Ópticas (Geniculocalcarinas / Asa de Meyer)",
        "category": "Fibras de Proyección Talamocortical",
        "fibersCount": 28000,
        "myelination": 94,
        "conductionVelocity": 62,
        "clinicalDisconnectionSummary": "Hemianopsia o cuadrantanopsia homónima contralateral con respeto macular"
      }
    ]
  },
  {
    "id": "GLASSER_V2",
    "name": "Área V2 (Corteza Visual Secundaria / Área Parastriada)",
    "shortName": "Área V2",
    "atlasId": "HCP-MMP1.0_L_V2",
    "moduleNumber": 2,
    "moduleName": "Corteza Visual Temprana",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Occipital",
    "type": "cortical",
    "position": [
      -0.4165,
      -0.4358,
      -2.1787
    ],
    "mniCoordinates": [
      -11.9,
      -80.1,
      2.4
    ],
    "color": "#a855f7",
    "baseFiringRate": 48.0,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Ramas Occipitales Laterales)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Procesamiento de estereopsis binocular, contornos ilusorios y segmentación figura-fondo.",
    "clinicalCorrelation": "Agnosia visual de forma y pérdida de discriminación de profundidad estereoscópica.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior (ILF)",
      "category": "Fascículo de Asociación Occipitotemporal",
      "fibersCount": 18500,
      "myelination": 88,
      "conductionVelocity": 56,
      "clinicalDisconnectionSummary": "Agnosia aperceptiva visual y defectos campimétricos cuadránticos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior (ILF)",
        "category": "Fascículo de Asociación Occipitotemporal",
        "fibersCount": 18500,
        "myelination": 88,
        "conductionVelocity": 56,
        "clinicalDisconnectionSummary": "Agnosia aperceptiva visual y defectos campimétricos cuadránticos"
      }
    ]
  },
  {
    "id": "GLASSER_V3",
    "name": "Área V3 (Corteza Visual Terciaria)",
    "shortName": "Área V3",
    "atlasId": "HCP-MMP1.0_L_V3",
    "moduleNumber": 2,
    "moduleName": "Corteza Visual Temprana",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Occipital",
    "type": "cortical",
    "position": [
      -0.6475,
      -0.4007,
      -2.3678
    ],
    "mniCoordinates": [
      -18.5,
      -85.5,
      3.4
    ],
    "color": "#a855f7",
    "baseFiringRate": 48.0,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Ramas Occipitales Laterales)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Análisis de patrones globales, movimiento coherente y orientación de flujo óptico.",
    "clinicalCorrelation": "Defectos campimétricos en cuadrantes superiores contralaterales.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior (ILF)",
      "category": "Fascículo de Asociación Occipitotemporal",
      "fibersCount": 18500,
      "myelination": 88,
      "conductionVelocity": 56,
      "clinicalDisconnectionSummary": "Agnosia aperceptiva visual y defectos campimétricos cuadránticos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior (ILF)",
        "category": "Fascículo de Asociación Occipitotemporal",
        "fibersCount": 18500,
        "myelination": 88,
        "conductionVelocity": 56,
        "clinicalDisconnectionSummary": "Agnosia aperceptiva visual y defectos campimétricos cuadránticos"
      }
    ]
  },
  {
    "id": "GLASSER_V4",
    "name": "Área V4 (Corteza Visual del Color y Constancia Cromática)",
    "shortName": "Área V4",
    "atlasId": "HCP-MMP1.0_L_V4",
    "moduleNumber": 2,
    "moduleName": "Corteza Visual Temprana",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Occipital",
    "type": "cortical",
    "position": [
      -1.0325,
      -0.6143,
      -2.2943
    ],
    "mniCoordinates": [
      -29.5,
      -83.4,
      -2.7
    ],
    "color": "#a855f7",
    "baseFiringRate": 48.0,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Ramas Occipitales Laterales)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Percepción del color, constancia cromática e integración de curvatura visual.",
    "clinicalCorrelation": "Acromatopsia cerebral hemi-espacial (visión en tonos de gris sin lesión retiniana).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior (ILF)",
      "category": "Fascículo de Asociación Occipitotemporal",
      "fibersCount": 18500,
      "myelination": 88,
      "conductionVelocity": 56,
      "clinicalDisconnectionSummary": "Agnosia aperceptiva visual y defectos campimétricos cuadránticos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior (ILF)",
        "category": "Fascículo de Asociación Occipitotemporal",
        "fibersCount": 18500,
        "myelination": 88,
        "conductionVelocity": 56,
        "clinicalDisconnectionSummary": "Agnosia aperceptiva visual y defectos campimétricos cuadránticos"
      }
    ]
  },
  {
    "id": "GLASSER_V3A",
    "name": "Área V3A (Sensibilidad al Movimiento y Estereopsis)",
    "shortName": "Área V3A",
    "atlasId": "HCP-MMP1.0_L_V3A",
    "moduleNumber": 3,
    "moduleName": "Vía Visual Dorsal",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Occipital",
    "type": "cortical",
    "position": [
      -0.5985,
      0.2923,
      -2.5147
    ],
    "mniCoordinates": [
      -17.1,
      -89.7,
      23.2
    ],
    "color": "#6366f1",
    "baseFiringRate": 54.0,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Parietooccipital) & ACP",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Integración de velocidad de movimiento binocular y disparidad retiniana absoluta.",
    "clinicalCorrelation": "Incapacidad para calcular la velocidad de aproximación de objetos en el campo visual.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I/II)",
      "category": "Fascículo de Asociación Frontoparietal",
      "fibersCount": 24000,
      "myelination": 90,
      "conductionVelocity": 60,
      "clinicalDisconnectionSummary": "Ataxia óptica, déficit de alcance visomotor y desorientación espacial"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I/II)",
        "category": "Fascículo de Asociación Frontoparietal",
        "fibersCount": 24000,
        "myelination": 90,
        "conductionVelocity": 60,
        "clinicalDisconnectionSummary": "Ataxia óptica, déficit de alcance visomotor y desorientación espacial"
      }
    ]
  },
  {
    "id": "GLASSER_V3B",
    "name": "Área V3B (Segregación de Contornos por Movimiento)",
    "shortName": "Área V3B",
    "atlasId": "HCP-MMP1.0_L_V3B",
    "moduleNumber": 3,
    "moduleName": "Vía Visual Dorsal",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Occipital",
    "type": "cortical",
    "position": [
      -0.9625,
      0.0472,
      -2.1858
    ],
    "mniCoordinates": [
      -27.5,
      -80.3,
      16.2
    ],
    "color": "#6366f1",
    "baseFiringRate": 54.0,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Parietooccipital) & ACP",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Detección de bordes definidos exclusivamente por gradientes cinéticos y de textura.",
    "clinicalCorrelation": "Dificultad para discernir objetos móviles camuflados sobre fondos homogéneos.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I/II)",
      "category": "Fascículo de Asociación Frontoparietal",
      "fibersCount": 24000,
      "myelination": 90,
      "conductionVelocity": 60,
      "clinicalDisconnectionSummary": "Ataxia óptica, déficit de alcance visomotor y desorientación espacial"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I/II)",
        "category": "Fascículo de Asociación Frontoparietal",
        "fibersCount": 24000,
        "myelination": 90,
        "conductionVelocity": 60,
        "clinicalDisconnectionSummary": "Ataxia óptica, déficit de alcance visomotor y desorientación espacial"
      }
    ]
  },
  {
    "id": "GLASSER_V6",
    "name": "Área V6 (Flujo Óptico y Navegación Visoespacial)",
    "shortName": "Área V6",
    "atlasId": "HCP-MMP1.0_L_V6",
    "moduleNumber": 3,
    "moduleName": "Vía Visual Dorsal",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Occipital",
    "type": "cortical",
    "position": [
      -0.4865,
      0.4288,
      -2.0808
    ],
    "mniCoordinates": [
      -13.9,
      -77.3,
      27.1
    ],
    "color": "#6366f1",
    "baseFiringRate": 49.7,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Parietooccipital) & ACP",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Codificación de la dirección del flujo óptico autoinducido durante la locomoción.",
    "clinicalCorrelation": "Desorientación espacial topográfica e inestabilidad del rumbo visual en marcha.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I/II)",
      "category": "Fascículo de Asociación Frontoparietal",
      "fibersCount": 24000,
      "myelination": 90,
      "conductionVelocity": 60,
      "clinicalDisconnectionSummary": "Ataxia óptica, déficit de alcance visomotor y desorientación espacial"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I/II)",
        "category": "Fascículo de Asociación Frontoparietal",
        "fibersCount": 24000,
        "myelination": 90,
        "conductionVelocity": 60,
        "clinicalDisconnectionSummary": "Ataxia óptica, déficit de alcance visomotor y desorientación espacial"
      }
    ]
  },
  {
    "id": "GLASSER_V6A",
    "name": "Área V6A (Coordinación Ojo-Mano y Alcance Visomotor)",
    "shortName": "Área V6A",
    "atlasId": "HCP-MMP1.0_L_V6A",
    "moduleNumber": 3,
    "moduleName": "Vía Visual Dorsal",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Occipital",
    "type": "cortical",
    "position": [
      -0.6615,
      0.8348,
      -2.3432
    ],
    "mniCoordinates": [
      -18.9,
      -84.8,
      38.7
    ],
    "color": "#6366f1",
    "baseFiringRate": 54.0,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Parietooccipital) & ACP",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Transformación visomotora para el guiado preciso de la mano hacia blancos espaciales.",
    "clinicalCorrelation": "Ataxia óptica (incapacidad para alcanzar objetos bajo control visual directo).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I/II)",
      "category": "Fascículo de Asociación Frontoparietal",
      "fibersCount": 24000,
      "myelination": 90,
      "conductionVelocity": 60,
      "clinicalDisconnectionSummary": "Ataxia óptica, déficit de alcance visomotor y desorientación espacial"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I/II)",
        "category": "Fascículo de Asociación Frontoparietal",
        "fibersCount": 24000,
        "myelination": 90,
        "conductionVelocity": 60,
        "clinicalDisconnectionSummary": "Ataxia óptica, déficit de alcance visomotor y desorientación espacial"
      }
    ]
  },
  {
    "id": "GLASSER_V7",
    "name": "Área V7 / IPS0 (Surco Intraparietal Posterior)",
    "shortName": "Área V7",
    "atlasId": "HCP-MMP1.0_L_V7",
    "moduleNumber": 3,
    "moduleName": "Vía Visual Dorsal",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Occipital",
    "type": "cortical",
    "position": [
      -0.8645,
      0.3938,
      -2.2488
    ],
    "mniCoordinates": [
      -24.7,
      -82.1,
      26.1
    ],
    "color": "#6366f1",
    "baseFiringRate": 49.7,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Parietooccipital) & ACP",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Mapas de prioridad atencional espacial y memoria visoespacial a corto plazo.",
    "clinicalCorrelation": "Negligencia atencional visoespacial y retraso en el anclaje de la mirada sacádica.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I/II)",
      "category": "Fascículo de Asociación Frontoparietal",
      "fibersCount": 24000,
      "myelination": 90,
      "conductionVelocity": 60,
      "clinicalDisconnectionSummary": "Ataxia óptica, déficit de alcance visomotor y desorientación espacial"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I/II)",
        "category": "Fascículo de Asociación Frontoparietal",
        "fibersCount": 24000,
        "myelination": 90,
        "conductionVelocity": 60,
        "clinicalDisconnectionSummary": "Ataxia óptica, déficit de alcance visomotor y desorientación espacial"
      }
    ]
  },
  {
    "id": "GLASSER_IPS1",
    "name": "Área IPS1 (Surco Intraparietal Anterior 1)",
    "shortName": "Área IPS1",
    "atlasId": "HCP-MMP1.0_L_IPS1",
    "moduleNumber": 3,
    "moduleName": "Vía Visual Dorsal",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Occipital",
    "type": "cortical",
    "position": [
      -0.8295,
      0.6282,
      -1.8987
    ],
    "mniCoordinates": [
      -23.7,
      -72.1,
      32.8
    ],
    "color": "#6366f1",
    "baseFiringRate": 36.3,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Parietooccipital) & ACP",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Representación de coordenadas espaciales retino-cefálicas para direccionamiento motor.",
    "clinicalCorrelation": "Déficit en la redirección de movimientos de los miembros guiados por estímulos visuales.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I/II)",
      "category": "Fascículo de Asociación Frontoparietal",
      "fibersCount": 24000,
      "myelination": 90,
      "conductionVelocity": 60,
      "clinicalDisconnectionSummary": "Ataxia óptica, déficit de alcance visomotor y desorientación espacial"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I/II)",
        "category": "Fascículo de Asociación Frontoparietal",
        "fibersCount": 24000,
        "myelination": 90,
        "conductionVelocity": 60,
        "clinicalDisconnectionSummary": "Ataxia óptica, déficit de alcance visomotor y desorientación espacial"
      }
    ]
  },
  {
    "id": "GLASSER_V8",
    "name": "Área V8 (Corteza de Reconocimiento Cromático Superior)",
    "shortName": "Área V8",
    "atlasId": "HCP-MMP1.0_L_V8",
    "moduleNumber": 4,
    "moduleName": "Vía Visual Ventral",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.1165,
      -1.0728,
      -1.9058
    ],
    "mniCoordinates": [
      -31.9,
      -72.3,
      -15.8
    ],
    "color": "#ec4899",
    "baseFiringRate": 51.4,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Ramas Temporal Anterior y Posterior)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Clasificación cromática contextual y denominación léxica de tonalidades complejas.",
    "clinicalCorrelation": "Anomia para los colores (discriminación preservada pero incapacidad para nombrarlos).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior (ILF)",
      "category": "Fascículo de Asociación Occipitotemporal",
      "fibersCount": 22000,
      "myelination": 89,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Prosopagnosia y agnosia asociativa de objetos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior (ILF)",
        "category": "Fascículo de Asociación Occipitotemporal",
        "fibersCount": 22000,
        "myelination": 89,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Prosopagnosia y agnosia asociativa de objetos"
      }
    ]
  },
  {
    "id": "GLASSER_VVC",
    "name": "Área VVC (Complejo Ventral Visual)",
    "shortName": "Área VVC",
    "atlasId": "HCP-MMP1.0_L_VVC",
    "moduleNumber": 4,
    "moduleName": "Vía Visual Ventral",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.057,
      -1.2303,
      -1.1883
    ],
    "mniCoordinates": [
      -30.2,
      -51.8,
      -20.3
    ],
    "color": "#ec4899",
    "baseFiringRate": 55.7,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Ramas Temporal Anterior y Posterior)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Extracción de invariancias morfológicas en objetos biológicos y herramientas.",
    "clinicalCorrelation": "Agnosia visual de objetos (incapacidad para reconocer objetos cotidianos por la vista).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior (ILF)",
      "category": "Fascículo de Asociación Occipitotemporal",
      "fibersCount": 22000,
      "myelination": 89,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Prosopagnosia y agnosia asociativa de objetos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior (ILF)",
        "category": "Fascículo de Asociación Occipitotemporal",
        "fibersCount": 22000,
        "myelination": 89,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Prosopagnosia y agnosia asociativa de objetos"
      }
    ]
  },
  {
    "id": "GLASSER_PIT",
    "name": "Área PIT (Corteza Temporal Inferior Posterior)",
    "shortName": "Área PIT",
    "atlasId": "HCP-MMP1.0_L_PIT",
    "moduleNumber": 4,
    "moduleName": "Vía Visual Ventral",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.477,
      -1.0413,
      -2.1473
    ],
    "mniCoordinates": [
      -42.2,
      -79.2,
      -14.9
    ],
    "color": "#ec4899",
    "baseFiringRate": 55.7,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Ramas Temporal Anterior y Posterior)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Ensamblaje estructural jerárquico de características visuales intermedias.",
    "clinicalCorrelation": "Dificultad en categorización visual rápida y reconocimiento de logotipos o símbolos.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior (ILF)",
      "category": "Fascículo de Asociación Occipitotemporal",
      "fibersCount": 22000,
      "myelination": 89,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Prosopagnosia y agnosia asociativa de objetos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior (ILF)",
        "category": "Fascículo de Asociación Occipitotemporal",
        "fibersCount": 22000,
        "myelination": 89,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Prosopagnosia y agnosia asociativa de objetos"
      }
    ]
  },
  {
    "id": "GLASSER_FFC",
    "name": "Área FFC (Complejo Fusiforme Facial / BA 37)",
    "shortName": "Área FFC",
    "atlasId": "HCP-MMP1.0_L_FFC",
    "moduleNumber": 4,
    "moduleName": "Vía Visual Ventral",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.477,
      -1.2303,
      -1.3458
    ],
    "mniCoordinates": [
      -42.2,
      -56.3,
      -20.3
    ],
    "color": "#ec4899",
    "baseFiringRate": 55.7,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Ramas Temporal Anterior y Posterior)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Reconocimiento biométrico holístico facial y codificación de identidades individuales.",
    "clinicalCorrelation": "Prosopagnosia pura (incapacidad para reconocer rostros familiares o el propio espejo).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior (ILF)",
      "category": "Fascículo de Asociación Occipitotemporal",
      "fibersCount": 22000,
      "myelination": 89,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Prosopagnosia y agnosia asociativa de objetos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior (ILF)",
        "category": "Fascículo de Asociación Occipitotemporal",
        "fibersCount": 22000,
        "myelination": 89,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Prosopagnosia y agnosia asociativa de objetos"
      }
    ]
  },
  {
    "id": "GLASSER_VMV1",
    "name": "Área VMV1 (Corteza Ventromedial Visual 1)",
    "shortName": "Área VMV1",
    "atlasId": "HCP-MMP1.0_L_VMV1",
    "moduleNumber": 4,
    "moduleName": "Vía Visual Ventral",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -0.6895,
      -0.8208,
      -1.2198
    ],
    "mniCoordinates": [
      -19.7,
      -52.7,
      -8.6
    ],
    "color": "#ec4899",
    "baseFiringRate": 38.0,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Ramas Temporal Anterior y Posterior)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Mapeo visual de escenas naturales y cálculo de profundidad ambiental perspectival.",
    "clinicalCorrelation": "Agnosia topográfica de paisajes y desorientación en entornos urbanos familiares.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior (ILF)",
      "category": "Fascículo de Asociación Occipitotemporal",
      "fibersCount": 22000,
      "myelination": 89,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Prosopagnosia y agnosia asociativa de objetos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior (ILF)",
        "category": "Fascículo de Asociación Occipitotemporal",
        "fibersCount": 22000,
        "myelination": 89,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Prosopagnosia y agnosia asociativa de objetos"
      }
    ]
  },
  {
    "id": "GLASSER_VMV2",
    "name": "Área VMV2 (Corteza Ventromedial Visual 2)",
    "shortName": "Área VMV2",
    "atlasId": "HCP-MMP1.0_L_VMV2",
    "moduleNumber": 4,
    "moduleName": "Vía Visual Ventral",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -0.966,
      -0.7998,
      -1.2268
    ],
    "mniCoordinates": [
      -27.6,
      -52.9,
      -8.0
    ],
    "color": "#ec4899",
    "baseFiringRate": 38.0,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Ramas Temporal Anterior y Posterior)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Reconocimiento contextual de habitaciones, hitos arquitectónicos y edificios.",
    "clinicalCorrelation": "Incapacidad para identificar hitos visuales cardinales arquitectónicos.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior (ILF)",
      "category": "Fascículo de Asociación Occipitotemporal",
      "fibersCount": 22000,
      "myelination": 89,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Prosopagnosia y agnosia asociativa de objetos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior (ILF)",
        "category": "Fascículo de Asociación Occipitotemporal",
        "fibersCount": 22000,
        "myelination": 89,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Prosopagnosia y agnosia asociativa de objetos"
      }
    ]
  },
  {
    "id": "GLASSER_VMV3",
    "name": "Área VMV3 (Corteza Ventromedial Visual Anterior)",
    "shortName": "Área VMV3",
    "atlasId": "HCP-MMP1.0_L_VMV3",
    "moduleNumber": 4,
    "moduleName": "Vía Visual Ventral",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -0.9975,
      -0.9048,
      -1.4788
    ],
    "mniCoordinates": [
      -28.5,
      -60.1,
      -11.0
    ],
    "color": "#ec4899",
    "baseFiringRate": 38.0,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Ramas Temporal Anterior y Posterior)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Conexión de información visual del entorno con redes de memoria parahipocámpicas.",
    "clinicalCorrelation": "Amnesia visual para lugares y pérdida del mapa cognitivo de orientación geográfica.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior (ILF)",
      "category": "Fascículo de Asociación Occipitotemporal",
      "fibersCount": 22000,
      "myelination": 89,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Prosopagnosia y agnosia asociativa de objetos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior (ILF)",
        "category": "Fascículo de Asociación Occipitotemporal",
        "fibersCount": 22000,
        "myelination": 89,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Prosopagnosia y agnosia asociativa de objetos"
      }
    ]
  },
  {
    "id": "GLASSER_MT",
    "name": "Área MT / V5 (Corteza Temporal Media)",
    "shortName": "Área MT",
    "atlasId": "HCP-MMP1.0_L_MT",
    "moduleNumber": 5,
    "moduleName": "Complejo Visual Lateral MT+",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Occipital",
    "type": "cortical",
    "position": [
      -1.603,
      -0.3133,
      -1.9128
    ],
    "mniCoordinates": [
      -45.8,
      -72.5,
      5.9
    ],
    "color": "#d946ef",
    "baseFiringRate": 53.1,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4) y ACP (Rama Temporal Posterior)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Percepción cardinal del movimiento visual y cálculo de velocidad vectorial.",
    "clinicalCorrelation": "Acinetopsia cerebral (los objetos en movimiento se perciben como fotos estroboscópicas discontinuas).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior & Vía U-Fiber Perisylviana",
      "category": "Fibras de Asociación Corto-Alcance",
      "fibersCount": 16000,
      "myelination": 87,
      "conductionVelocity": 54,
      "clinicalDisconnectionSummary": "Acinetopsia (ceguera al movimiento) y alteración de persecución ocular"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior & Vía U-Fiber Perisylviana",
        "category": "Fibras de Asociación Corto-Alcance",
        "fibersCount": 16000,
        "myelination": 87,
        "conductionVelocity": 54,
        "clinicalDisconnectionSummary": "Acinetopsia (ceguera al movimiento) y alteración de persecución ocular"
      }
    ]
  },
  {
    "id": "GLASSER_MST",
    "name": "Área MST (Temporal Superior Medial)",
    "shortName": "Área MST",
    "atlasId": "HCP-MMP1.0_L_MST",
    "moduleNumber": 5,
    "moduleName": "Complejo Visual Lateral MT+",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Occipital",
    "type": "cortical",
    "position": [
      -1.505,
      -0.3693,
      -1.7203
    ],
    "mniCoordinates": [
      -43.0,
      -67.0,
      4.3
    ],
    "color": "#d946ef",
    "baseFiringRate": 57.4,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4) y ACP (Rama Temporal Posterior)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Análisis de expansión/rotación del flujo óptico y señales eferentes vestibulares.",
    "clinicalCorrelation": "Pérdida de estabilidad de la imagen retiniana durante giros cefálicos rápidos.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior & Vía U-Fiber Perisylviana",
      "category": "Fibras de Asociación Corto-Alcance",
      "fibersCount": 16000,
      "myelination": 87,
      "conductionVelocity": 54,
      "clinicalDisconnectionSummary": "Acinetopsia (ceguera al movimiento) y alteración de persecución ocular"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior & Vía U-Fiber Perisylviana",
        "category": "Fibras de Asociación Corto-Alcance",
        "fibersCount": 16000,
        "myelination": 87,
        "conductionVelocity": 54,
        "clinicalDisconnectionSummary": "Acinetopsia (ceguera al movimiento) y alteración de persecución ocular"
      }
    ]
  },
  {
    "id": "GLASSER_FST",
    "name": "Área FST (Fondo del Surco Temporal Superior)",
    "shortName": "Área FST",
    "atlasId": "HCP-MMP1.0_L_FST",
    "moduleNumber": 5,
    "moduleName": "Complejo Visual Lateral MT+",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Occipital",
    "type": "cortical",
    "position": [
      -1.666,
      -0.5827,
      -1.6678
    ],
    "mniCoordinates": [
      -47.6,
      -65.5,
      -1.8
    ],
    "color": "#d946ef",
    "baseFiringRate": 57.4,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4) y ACP (Rama Temporal Posterior)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Integración de velocidad angular con movimientos oculares de persecución lenta.",
    "clinicalCorrelation": "Pérdida de la persecución suave ocular con reemplazo por sacadas fragmentadas.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior & Vía U-Fiber Perisylviana",
      "category": "Fibras de Asociación Corto-Alcance",
      "fibersCount": 16000,
      "myelination": 87,
      "conductionVelocity": 54,
      "clinicalDisconnectionSummary": "Acinetopsia (ceguera al movimiento) y alteración de persecución ocular"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior & Vía U-Fiber Perisylviana",
        "category": "Fibras de Asociación Corto-Alcance",
        "fibersCount": 16000,
        "myelination": 87,
        "conductionVelocity": 54,
        "clinicalDisconnectionSummary": "Acinetopsia (ceguera al movimiento) y alteración de persecución ocular"
      }
    ]
  },
  {
    "id": "GLASSER_LO1",
    "name": "Área LO1 (Lateral Occipital 1 - Orientación)",
    "shortName": "Área LO1",
    "atlasId": "HCP-MMP1.0_L_LO1",
    "moduleNumber": 5,
    "moduleName": "Complejo Visual Lateral MT+",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Occipital",
    "type": "cortical",
    "position": [
      -1.365,
      -0.4183,
      -2.3468
    ],
    "mniCoordinates": [
      -39.0,
      -84.9,
      2.9
    ],
    "color": "#d946ef",
    "baseFiringRate": 57.4,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4) y ACP (Rama Temporal Posterior)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Representación retinotópica de la orientación espacial de contornos.",
    "clinicalCorrelation": "Déficit en alineación manual perceptiva con hendiduras u orientaciones oblicuas.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior & Vía U-Fiber Perisylviana",
      "category": "Fibras de Asociación Corto-Alcance",
      "fibersCount": 16000,
      "myelination": 87,
      "conductionVelocity": 54,
      "clinicalDisconnectionSummary": "Acinetopsia (ceguera al movimiento) y alteración de persecución ocular"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior & Vía U-Fiber Perisylviana",
        "category": "Fibras de Asociación Corto-Alcance",
        "fibersCount": 16000,
        "myelination": 87,
        "conductionVelocity": 54,
        "clinicalDisconnectionSummary": "Acinetopsia (ceguera al movimiento) y alteración de persecución ocular"
      }
    ]
  },
  {
    "id": "GLASSER_LO2",
    "name": "Área LO2 (Lateral Occipital 2 - Siluetas)",
    "shortName": "Área LO2",
    "atlasId": "HCP-MMP1.0_L_LO2",
    "moduleNumber": 5,
    "moduleName": "Complejo Visual Lateral MT+",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Occipital",
    "type": "cortical",
    "position": [
      -1.5505,
      -0.7613,
      -2.2278
    ],
    "mniCoordinates": [
      -44.3,
      -81.5,
      -6.9
    ],
    "color": "#d946ef",
    "baseFiringRate": 57.4,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4) y ACP (Rama Temporal Posterior)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Detección de siluetas cerradas y discriminación de formas por oclusión.",
    "clinicalCorrelation": "Incapacidad para separar figuras superpuestas en láminas de Poppelreuter.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior & Vía U-Fiber Perisylviana",
      "category": "Fibras de Asociación Corto-Alcance",
      "fibersCount": 16000,
      "myelination": 87,
      "conductionVelocity": 54,
      "clinicalDisconnectionSummary": "Acinetopsia (ceguera al movimiento) y alteración de persecución ocular"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior & Vía U-Fiber Perisylviana",
        "category": "Fibras de Asociación Corto-Alcance",
        "fibersCount": 16000,
        "myelination": 87,
        "conductionVelocity": 54,
        "clinicalDisconnectionSummary": "Acinetopsia (ceguera al movimiento) y alteración de persecución ocular"
      }
    ]
  },
  {
    "id": "GLASSER_LO3",
    "name": "Área LO3 (Lateral Occipital 3 - Textura)",
    "shortName": "Área LO3",
    "atlasId": "HCP-MMP1.0_L_LO3",
    "moduleNumber": 5,
    "moduleName": "Complejo Visual Lateral MT+",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Occipital",
    "type": "cortical",
    "position": [
      -1.6065,
      -0.1803,
      -2.1578
    ],
    "mniCoordinates": [
      -45.9,
      -79.5,
      9.7
    ],
    "color": "#d946ef",
    "baseFiringRate": 57.4,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4) y ACP (Rama Temporal Posterior)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Extracción de gradientes de sombreado tridimensional a partir de texturas monocromas.",
    "clinicalCorrelation": "Pérdida de estimación de volumen volumétrico por iluminación y sombra.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior & Vía U-Fiber Perisylviana",
      "category": "Fibras de Asociación Corto-Alcance",
      "fibersCount": 16000,
      "myelination": 87,
      "conductionVelocity": 54,
      "clinicalDisconnectionSummary": "Acinetopsia (ceguera al movimiento) y alteración de persecución ocular"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior & Vía U-Fiber Perisylviana",
        "category": "Fibras de Asociación Corto-Alcance",
        "fibersCount": 16000,
        "myelination": 87,
        "conductionVelocity": 54,
        "clinicalDisconnectionSummary": "Acinetopsia (ceguera al movimiento) y alteración de persecución ocular"
      }
    ]
  },
  {
    "id": "GLASSER_V3CD",
    "name": "Área V3CD (Visual 3 Cortical Dorsal)",
    "shortName": "Área V3CD",
    "atlasId": "HCP-MMP1.0_L_V3CD",
    "moduleNumber": 5,
    "moduleName": "Complejo Visual Lateral MT+",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Occipital",
    "type": "cortical",
    "position": [
      -1.2285,
      -0.1522,
      -2.3888
    ],
    "mniCoordinates": [
      -35.1,
      -86.1,
      10.5
    ],
    "color": "#d946ef",
    "baseFiringRate": 39.7,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4) y ACP (Rama Temporal Posterior)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Interconexión occipital dorsal-lateral para segmentación dinámica de escenas.",
    "clinicalCorrelation": "Retraso en la captación visual de eventos que irrumpen súbitamente en la periferia.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior & Vía U-Fiber Perisylviana",
      "category": "Fibras de Asociación Corto-Alcance",
      "fibersCount": 16000,
      "myelination": 87,
      "conductionVelocity": 54,
      "clinicalDisconnectionSummary": "Acinetopsia (ceguera al movimiento) y alteración de persecución ocular"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior & Vía U-Fiber Perisylviana",
        "category": "Fibras de Asociación Corto-Alcance",
        "fibersCount": 16000,
        "myelination": 87,
        "conductionVelocity": 54,
        "clinicalDisconnectionSummary": "Acinetopsia (ceguera al movimiento) y alteración de persecución ocular"
      }
    ]
  },
  {
    "id": "GLASSER_V4t",
    "name": "Área V4t (Transición V4-MT)",
    "shortName": "Área V4t",
    "atlasId": "HCP-MMP1.0_L_V4t",
    "moduleNumber": 5,
    "moduleName": "Complejo Visual Lateral MT+",
    "system": "Visual",
    "hemisphere": "left",
    "lobe": "Occipital",
    "type": "cortical",
    "position": [
      -1.554,
      -0.6003,
      -2.0493
    ],
    "mniCoordinates": [
      -44.4,
      -76.4,
      -2.3
    ],
    "color": "#d946ef",
    "baseFiringRate": 57.4,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4) y ACP (Rama Temporal Posterior)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Coordinación entre la forma cromática del objeto y su trayectoria de desplazamiento.",
    "clinicalCorrelation": "Pérdida de discriminación visual en seguimiento de blancos coloreados en movimiento.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior & Vía U-Fiber Perisylviana",
      "category": "Fibras de Asociación Corto-Alcance",
      "fibersCount": 16000,
      "myelination": 87,
      "conductionVelocity": 54,
      "clinicalDisconnectionSummary": "Acinetopsia (ceguera al movimiento) y alteración de persecución ocular"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior & Vía U-Fiber Perisylviana",
        "category": "Fibras de Asociación Corto-Alcance",
        "fibersCount": 16000,
        "myelination": 87,
        "conductionVelocity": 54,
        "clinicalDisconnectionSummary": "Acinetopsia (ceguera al movimiento) y alteración de persecución ocular"
      }
    ]
  },
  {
    "id": "GLASSER_4",
    "name": "Área 4 (Giro Precentral - Corteza Motora Primaria M1)",
    "shortName": "Área 4",
    "atlasId": "HCP-MMP1.0_L_4",
    "moduleNumber": 6,
    "moduleName": "Corteza Somatosensorial y Motora Primaria",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.008,
      1.3177,
      -0.0682
    ],
    "mniCoordinates": [
      -28.8,
      -19.8,
      52.5
    ],
    "color": "#10b981",
    "baseFiringRate": 50.5,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Ramas Rolandica y Prerrolándica)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Ejecución motora voluntaria fraccionada y activación de neuronas piramidales de Betz.",
    "clinicalCorrelation": "Hemiplejía o paresia motora pura contralateral grave con signo de Babinski y espasticidad.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CORTICOSPINAL",
      "name": "Tracto Corticoespinal & Vía Lemniscal Somatosensorial",
      "category": "Fibras de Proyección Piramidal",
      "fibersCount": 45000,
      "myelination": 96,
      "conductionVelocity": 75,
      "clinicalDisconnectionSummary": "Hemiplejía contralateral espástica y anestesia somatosensorial profunda"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CORTICOSPINAL",
        "name": "Tracto Corticoespinal & Vía Lemniscal Somatosensorial",
        "category": "Fibras de Proyección Piramidal",
        "fibersCount": 45000,
        "myelination": 96,
        "conductionVelocity": 75,
        "clinicalDisconnectionSummary": "Hemiplejía contralateral espástica y anestesia somatosensorial profunda"
      }
    ]
  },
  {
    "id": "GLASSER_3a",
    "name": "Área 3a (Receptores Musculares Propioceptivos)",
    "shortName": "Área 3a",
    "atlasId": "HCP-MMP1.0_L_3a",
    "moduleNumber": 6,
    "moduleName": "Corteza Somatosensorial y Motora Primaria",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.204,
      0.9748,
      -0.1313
    ],
    "mniCoordinates": [
      -34.4,
      -21.6,
      42.7
    ],
    "color": "#10b981",
    "baseFiringRate": 54.8,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Ramas Rolandica y Prerrolándica)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Integración profunda de husos neuromusculares y receptores tendinosos de Golgi.",
    "clinicalCorrelation": "Ataxia sensitiva contralateral, pérdida de propiocepción articular y pseudoatetosis.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CORTICOSPINAL",
      "name": "Tracto Corticoespinal & Vía Lemniscal Somatosensorial",
      "category": "Fibras de Proyección Piramidal",
      "fibersCount": 45000,
      "myelination": 96,
      "conductionVelocity": 75,
      "clinicalDisconnectionSummary": "Hemiplejía contralateral espástica y anestesia somatosensorial profunda"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CORTICOSPINAL",
        "name": "Tracto Corticoespinal & Vía Lemniscal Somatosensorial",
        "category": "Fibras de Proyección Piramidal",
        "fibersCount": 45000,
        "myelination": 96,
        "conductionVelocity": 75,
        "clinicalDisconnectionSummary": "Hemiplejía contralateral espástica y anestesia somatosensorial profunda"
      }
    ]
  },
  {
    "id": "GLASSER_3b",
    "name": "Área 3b (Corteza Somatosensorial Primaria S1 - Mecanorreceptores)",
    "shortName": "Área 3b",
    "atlasId": "HCP-MMP1.0_L_3b",
    "moduleNumber": 6,
    "moduleName": "Corteza Somatosensorial y Motora Primaria",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.302,
      1.2792,
      -0.1872
    ],
    "mniCoordinates": [
      -37.2,
      -23.2,
      51.4
    ],
    "color": "#10b981",
    "baseFiringRate": 54.8,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Ramas Rolandica y Prerrolándica)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Percepción táctil discriminativa cutánea de alta resolución (discos de Merkel y Meissner).",
    "clinicalCorrelation": "Anestesia táctil epicrítica contralateral con preservación grosera protopática espinotalámica.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CORTICOSPINAL",
      "name": "Tracto Corticoespinal & Vía Lemniscal Somatosensorial",
      "category": "Fibras de Proyección Piramidal",
      "fibersCount": 45000,
      "myelination": 96,
      "conductionVelocity": 75,
      "clinicalDisconnectionSummary": "Hemiplejía contralateral espástica y anestesia somatosensorial profunda"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CORTICOSPINAL",
        "name": "Tracto Corticoespinal & Vía Lemniscal Somatosensorial",
        "category": "Fibras de Proyección Piramidal",
        "fibersCount": 45000,
        "myelination": 96,
        "conductionVelocity": 75,
        "clinicalDisconnectionSummary": "Hemiplejía contralateral espástica y anestesia somatosensorial profunda"
      }
    ]
  },
  {
    "id": "GLASSER_1",
    "name": "Área 1 (S1 - Análisis de Texturas Cutáneas)",
    "shortName": "Área 1",
    "atlasId": "HCP-MMP1.0_L_1",
    "moduleNumber": 6,
    "moduleName": "Corteza Somatosensorial y Motora Primaria",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.5225,
      1.4473,
      -0.2888
    ],
    "mniCoordinates": [
      -43.5,
      -26.1,
      56.2
    ],
    "color": "#10b981",
    "baseFiringRate": 50.5,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Ramas Rolandica y Prerrolándica)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Discriminación de rugosidad, textura y separación de dos puntos espaciales.",
    "clinicalCorrelation": "Astereognosia táctil (incapacidad para identificar objetos mediante palpación manual con ojos cerrados).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CORTICOSPINAL",
      "name": "Tracto Corticoespinal & Vía Lemniscal Somatosensorial",
      "category": "Fibras de Proyección Piramidal",
      "fibersCount": 45000,
      "myelination": 96,
      "conductionVelocity": 75,
      "clinicalDisconnectionSummary": "Hemiplejía contralateral espástica y anestesia somatosensorial profunda"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CORTICOSPINAL",
        "name": "Tracto Corticoespinal & Vía Lemniscal Somatosensorial",
        "category": "Fibras de Proyección Piramidal",
        "fibersCount": 45000,
        "myelination": 96,
        "conductionVelocity": 75,
        "clinicalDisconnectionSummary": "Hemiplejía contralateral espástica y anestesia somatosensorial profunda"
      }
    ]
  },
  {
    "id": "GLASSER_2",
    "name": "Área 2 (S1 - Discriminación de Tamaño y Forma Tridimensional)",
    "shortName": "Área 2",
    "atlasId": "HCP-MMP1.0_L_2",
    "moduleNumber": 6,
    "moduleName": "Corteza Somatosensorial y Motora Primaria",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.2565,
      1.2828,
      -0.6038
    ],
    "mniCoordinates": [
      -35.9,
      -35.1,
      51.5
    ],
    "color": "#10b981",
    "baseFiringRate": 50.5,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Ramas Rolandica y Prerrolándica)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Integración táctil con ángulo articular para estereognosia de objetos tridimensionales.",
    "clinicalCorrelation": "Morfognosia táctil abolida y pérdida del sentido de posición espacial de los dedos de la mano.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CORTICOSPINAL",
      "name": "Tracto Corticoespinal & Vía Lemniscal Somatosensorial",
      "category": "Fibras de Proyección Piramidal",
      "fibersCount": 45000,
      "myelination": 96,
      "conductionVelocity": 75,
      "clinicalDisconnectionSummary": "Hemiplejía contralateral espástica y anestesia somatosensorial profunda"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CORTICOSPINAL",
        "name": "Tracto Corticoespinal & Vía Lemniscal Somatosensorial",
        "category": "Fibras de Proyección Piramidal",
        "fibersCount": 45000,
        "myelination": 96,
        "conductionVelocity": 75,
        "clinicalDisconnectionSummary": "Hemiplejía contralateral espástica y anestesia somatosensorial profunda"
      }
    ]
  },
  {
    "id": "GLASSER_5m",
    "name": "Área 5m (Lóbulo Paracentral Posterior / Parietal Medial)",
    "shortName": "Área 5m",
    "atlasId": "HCP-MMP1.0_L_5m",
    "moduleNumber": 7,
    "moduleName": "Lóbulo Paracentral y Cingular Medio",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -0.217,
      1.5698,
      -0.7752
    ],
    "mniCoordinates": [
      -6.2,
      -40.0,
      59.7
    ],
    "color": "#059669",
    "baseFiringRate": 56.5,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A3 / Rama Callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Representación propioceptiva del miembro inferior, pie y suelo pélvico.",
    "clinicalCorrelation": "Hipoestesia y apraxia táctil del pie contralateral con alteración del paso en marcha.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo & Radiación Motora Medial",
      "category": "Fascículo Límbico y Motor",
      "fibersCount": 21000,
      "myelination": 92,
      "conductionVelocity": 64,
      "clinicalDisconnectionSummary": "Paresia crural aislada (miembro inferior) e incontinencia esfinteriana"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo & Radiación Motora Medial",
        "category": "Fascículo Límbico y Motor",
        "fibersCount": 21000,
        "myelination": 92,
        "conductionVelocity": 64,
        "clinicalDisconnectionSummary": "Paresia crural aislada (miembro inferior) e incontinencia esfinteriana"
      }
    ]
  },
  {
    "id": "GLASSER_5mv",
    "name": "Área 5mv (Parietal Medial Ventral)",
    "shortName": "Área 5mv",
    "atlasId": "HCP-MMP1.0_L_5mv",
    "moduleNumber": 7,
    "moduleName": "Lóbulo Paracentral y Cingular Medio",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -0.504,
      1.1463,
      -0.6423
    ],
    "mniCoordinates": [
      -14.4,
      -36.2,
      47.6
    ],
    "color": "#059669",
    "baseFiringRate": 38.8,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A3 / Rama Callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Integración postural del tronco y coordinación axial bipedestada.",
    "clinicalCorrelation": "Inestabilidad postural axial con lateropulsión del tronco hacia el lado contralateral.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo & Radiación Motora Medial",
      "category": "Fascículo Límbico y Motor",
      "fibersCount": 21000,
      "myelination": 92,
      "conductionVelocity": 64,
      "clinicalDisconnectionSummary": "Paresia crural aislada (miembro inferior) e incontinencia esfinteriana"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo & Radiación Motora Medial",
        "category": "Fascículo Límbico y Motor",
        "fibersCount": 21000,
        "myelination": 92,
        "conductionVelocity": 64,
        "clinicalDisconnectionSummary": "Paresia crural aislada (miembro inferior) e incontinencia esfinteriana"
      }
    ]
  },
  {
    "id": "GLASSER_5L",
    "name": "Área 5L (Parietal Superior Medial)",
    "shortName": "Área 5L",
    "atlasId": "HCP-MMP1.0_L_5L",
    "moduleNumber": 7,
    "moduleName": "Lóbulo Paracentral y Cingular Medio",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -0.4655,
      1.8918,
      -0.9748
    ],
    "mniCoordinates": [
      -13.3,
      -45.7,
      68.9
    ],
    "color": "#059669",
    "baseFiringRate": 56.5,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A3 / Rama Callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Esquema corporal somatosensorial somatotópico del hemicuerpo contralateral.",
    "clinicalCorrelation": "Asomatognosia (el paciente desconoce o siente extraño su propio miembro contralateral).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo & Radiación Motora Medial",
      "category": "Fascículo Límbico y Motor",
      "fibersCount": 21000,
      "myelination": 92,
      "conductionVelocity": 64,
      "clinicalDisconnectionSummary": "Paresia crural aislada (miembro inferior) e incontinencia esfinteriana"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo & Radiación Motora Medial",
        "category": "Fascículo Límbico y Motor",
        "fibersCount": 21000,
        "myelination": 92,
        "conductionVelocity": 64,
        "clinicalDisconnectionSummary": "Paresia crural aislada (miembro inferior) e incontinencia esfinteriana"
      }
    ]
  },
  {
    "id": "GLASSER_24dd",
    "name": "Área 24dd (Área Motora Cingular Dorsal Anterior)",
    "shortName": "Área 24dd",
    "atlasId": "HCP-MMP1.0_L_24dd",
    "moduleNumber": 7,
    "moduleName": "Lóbulo Paracentral y Cingular Medio",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -0.259,
      1.1463,
      0.0158
    ],
    "mniCoordinates": [
      -7.4,
      -17.4,
      47.6
    ],
    "color": "#059669",
    "baseFiringRate": 43.1,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A3 / Rama Callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Iniciación de conductas motoras con motivación intrínseca y esfuerzo volitivo.",
    "clinicalCorrelation": "Mutismo acinético o abulia motora severa con falta de iniciativa espontánea.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo & Radiación Motora Medial",
      "category": "Fascículo Límbico y Motor",
      "fibersCount": 21000,
      "myelination": 92,
      "conductionVelocity": 64,
      "clinicalDisconnectionSummary": "Paresia crural aislada (miembro inferior) e incontinencia esfinteriana"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo & Radiación Motora Medial",
        "category": "Fascículo Límbico y Motor",
        "fibersCount": 21000,
        "myelination": 92,
        "conductionVelocity": 64,
        "clinicalDisconnectionSummary": "Paresia crural aislada (miembro inferior) e incontinencia esfinteriana"
      }
    ]
  },
  {
    "id": "GLASSER_24dv",
    "name": "Área 24dv (Área Motora Cingular Ventral)",
    "shortName": "Área 24dv",
    "atlasId": "HCP-MMP1.0_L_24dv",
    "moduleNumber": 7,
    "moduleName": "Lóbulo Paracentral y Cingular Medio",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -0.308,
      1.0028,
      0.5513
    ],
    "mniCoordinates": [
      -8.8,
      -2.1,
      43.5
    ],
    "color": "#059669",
    "baseFiringRate": 43.1,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A3 / Rama Callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Coordinación entre arousal autonómico, frecuencia cardíaca y selección motora.",
    "clinicalCorrelation": "Labilidad emocional motora con respuestas afectivas inapropiadas al esfuerzo.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo & Radiación Motora Medial",
      "category": "Fascículo Límbico y Motor",
      "fibersCount": 21000,
      "myelination": 92,
      "conductionVelocity": 64,
      "clinicalDisconnectionSummary": "Paresia crural aislada (miembro inferior) e incontinencia esfinteriana"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo & Radiación Motora Medial",
        "category": "Fascículo Límbico y Motor",
        "fibersCount": 21000,
        "myelination": 92,
        "conductionVelocity": 64,
        "clinicalDisconnectionSummary": "Paresia crural aislada (miembro inferior) e incontinencia esfinteriana"
      }
    ]
  },
  {
    "id": "GLASSER_6d",
    "name": "Área 6d (Premotora Dorsal / Área Motora Suplementaria - SMA)",
    "shortName": "Área 6d",
    "atlasId": "HCP-MMP1.0_L_6d",
    "moduleNumber": 8,
    "moduleName": "Corteza Premotora",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.183,
      1.7203,
      0.1733
    ],
    "mniCoordinates": [
      -33.8,
      -12.9,
      64.0
    ],
    "color": "#14b8a6",
    "baseFiringRate": 36.2,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontal Ascendente)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Planificación y secuenciación temporal interna de movimientos complejos aprendidos.",
    "clinicalCorrelation": "Síndrome de la Mano Extraña (Alien Hand) y apraxia de la marcha bilateral o unilateral.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
      "category": "Fascículo de Asociación Frontoparietal",
      "fibersCount": 29000,
      "myelination": 93,
      "conductionVelocity": 68,
      "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
        "category": "Fascículo de Asociación Frontoparietal",
        "fibersCount": 29000,
        "myelination": 93,
        "conductionVelocity": 68,
        "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
      }
    ]
  },
  {
    "id": "GLASSER_6mp",
    "name": "Área 6mp (Área Motora Suplementaria Propiamente Dicha)",
    "shortName": "Área 6mp",
    "atlasId": "HCP-MMP1.0_L_6mp",
    "moduleNumber": 8,
    "moduleName": "Corteza Premotora",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.4515,
      1.8428,
      0.1243
    ],
    "mniCoordinates": [
      -12.9,
      -14.3,
      67.5
    ],
    "color": "#14b8a6",
    "baseFiringRate": 40.5,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontal Ascendente)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Iniciación del habla espontánea y secuencias bimanuales coordinadas.",
    "clinicalCorrelation": "Afasia motora suplementaria transitoria con mutismo inicial seguido de recuperación fluida.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
      "category": "Fascículo de Asociación Frontoparietal",
      "fibersCount": 29000,
      "myelination": 93,
      "conductionVelocity": 68,
      "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
        "category": "Fascículo de Asociación Frontoparietal",
        "fibersCount": 29000,
        "myelination": 93,
        "conductionVelocity": 68,
        "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
      }
    ]
  },
  {
    "id": "GLASSER_6v",
    "name": "Área 6v (Premotora Ventral - Zona Orofaríngea y Braquial)",
    "shortName": "Área 6v",
    "atlasId": "HCP-MMP1.0_L_6v",
    "moduleNumber": 8,
    "moduleName": "Corteza Premotora",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -2.0685,
      0.5968,
      0.7123
    ],
    "mniCoordinates": [
      -59.1,
      2.5,
      31.9
    ],
    "color": "#14b8a6",
    "baseFiringRate": 36.2,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontal Ascendente)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Control premotor de la musculatura fonatoria, deglutoria y manipulación fina de dedos.",
    "clinicalCorrelation": "Apraxia orofacial (apraxia bucolinguofacial para silbar, soplar o toser a la orden).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
      "category": "Fascículo de Asociación Frontoparietal",
      "fibersCount": 29000,
      "myelination": 93,
      "conductionVelocity": 68,
      "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
        "category": "Fascículo de Asociación Frontoparietal",
        "fibersCount": 29000,
        "myelination": 93,
        "conductionVelocity": 68,
        "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
      }
    ]
  },
  {
    "id": "GLASSER_6r",
    "name": "Área 6r (Premotora Rostral / Opercular Inferior)",
    "shortName": "Área 6r",
    "atlasId": "HCP-MMP1.0_L_6r",
    "moduleNumber": 8,
    "moduleName": "Corteza Premotora",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.813,
      0.0578,
      0.8558
    ],
    "mniCoordinates": [
      -51.8,
      6.6,
      16.5
    ],
    "color": "#14b8a6",
    "baseFiringRate": 36.2,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontal Ascendente)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Enlace entre observación de acciones motoras ajenas y reproducción propia.",
    "clinicalCorrelation": "Déficit en aprendizaje motor imitativo y ejecución de praxias transitivas.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
      "category": "Fascículo de Asociación Frontoparietal",
      "fibersCount": 29000,
      "myelination": 93,
      "conductionVelocity": 68,
      "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
        "category": "Fascículo de Asociación Frontoparietal",
        "fibersCount": 29000,
        "myelination": 93,
        "conductionVelocity": 68,
        "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
      }
    ]
  },
  {
    "id": "GLASSER_6a",
    "name": "Área 6a (Premotora Caudomedial)",
    "shortName": "Área 6a",
    "atlasId": "HCP-MMP1.0_L_6a",
    "moduleNumber": 8,
    "moduleName": "Corteza Premotora",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.868,
      1.3388,
      0.5128
    ],
    "mniCoordinates": [
      -24.8,
      -3.2,
      53.1
    ],
    "color": "#14b8a6",
    "baseFiringRate": 36.2,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontal Ascendente)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Coordinación de la orientación cinemática cefálica respecto al blanco motor.",
    "clinicalCorrelation": "Pérdida de rotación anticipatoria de ojos y cabeza previa a la acción del brazo.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
      "category": "Fascículo de Asociación Frontoparietal",
      "fibersCount": 29000,
      "myelination": 93,
      "conductionVelocity": 68,
      "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
        "category": "Fascículo de Asociación Frontoparietal",
        "fibersCount": 29000,
        "myelination": 93,
        "conductionVelocity": 68,
        "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
      }
    ]
  },
  {
    "id": "GLASSER_FEF",
    "name": "Área FEF (Campo Ocular Frontal / Frontal Eye Field)",
    "shortName": "Área FEF",
    "atlasId": "HCP-MMP1.0_L_FEF",
    "moduleNumber": 8,
    "moduleName": "Corteza Premotora",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.4,
      1.1883,
      0.4393
    ],
    "mniCoordinates": [
      -40.0,
      -5.3,
      48.8
    ],
    "color": "#14b8a6",
    "baseFiringRate": 40.5,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontal Ascendente)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Generación voluntaria de sacadas oculares conjugadas horizontales al lado opuesto.",
    "clinicalCorrelation": "Desviación conjugada de la mirada hacia el lado de la lesión ('el paciente mira a su lesión').",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
      "category": "Fascículo de Asociación Frontoparietal",
      "fibersCount": 29000,
      "myelination": 93,
      "conductionVelocity": 68,
      "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
        "category": "Fascículo de Asociación Frontoparietal",
        "fibersCount": 29000,
        "myelination": 93,
        "conductionVelocity": 68,
        "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
      }
    ]
  },
  {
    "id": "GLASSER_PEF",
    "name": "Área PEF (Campo Ocular Premotor)",
    "shortName": "Área PEF",
    "atlasId": "HCP-MMP1.0_L_PEF",
    "moduleNumber": 8,
    "moduleName": "Corteza Premotora",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.6625,
      0.7857,
      0.6388
    ],
    "mniCoordinates": [
      -47.5,
      0.4,
      37.3
    ],
    "color": "#14b8a6",
    "baseFiringRate": 40.5,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontal Ascendente)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Integración entre comandos de sacadas rápidas y correcciones visuales de posición.",
    "clinicalCorrelation": "Incapacidad para refrenar sacadas reflejas erróneas en paradigmas de antisacadas.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
      "category": "Fascículo de Asociación Frontoparietal",
      "fibersCount": 29000,
      "myelination": 93,
      "conductionVelocity": 68,
      "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
        "category": "Fascículo de Asociación Frontoparietal",
        "fibersCount": 29000,
        "myelination": 93,
        "conductionVelocity": 68,
        "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
      }
    ]
  },
  {
    "id": "GLASSER_55b",
    "name": "Área 55b (Corteza Premotora Laríngea del Lenguaje)",
    "shortName": "Área 55b",
    "atlasId": "HCP-MMP1.0_L_55b",
    "moduleNumber": 8,
    "moduleName": "Corteza Premotora",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.68,
      1.1113,
      0.6248
    ],
    "mniCoordinates": [
      -48.0,
      0.0,
      46.6
    ],
    "color": "#14b8a6",
    "baseFiringRate": 40.5,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontal Ascendente)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Control premotor fino de cuerdas vocales, prosodia articulatoria y fluidez.",
    "clinicalCorrelation": "Disartria apraxica y alteración grave de la entonación emocional del lenguaje.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
      "category": "Fascículo de Asociación Frontoparietal",
      "fibersCount": 29000,
      "myelination": 93,
      "conductionVelocity": 68,
      "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
        "category": "Fascículo de Asociación Frontoparietal",
        "fibersCount": 29000,
        "myelination": 93,
        "conductionVelocity": 68,
        "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
      }
    ]
  },
  {
    "id": "GLASSER_6ma",
    "name": "Área 6ma (Premotora Medial Anterior)",
    "shortName": "Área 6ma",
    "atlasId": "HCP-MMP1.0_L_6ma",
    "moduleNumber": 8,
    "moduleName": "Corteza Premotora",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.5985,
      1.8008,
      0.7718
    ],
    "mniCoordinates": [
      -17.1,
      4.2,
      66.3
    ],
    "color": "#14b8a6",
    "baseFiringRate": 40.5,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontal Ascendente)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Coordinación entre respiración inspiratoria profunda y preparación de marcha.",
    "clinicalCorrelation": "Descoordinación motora anticipatoria diafragmática durante el esfuerzo físico.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
      "category": "Fascículo de Asociación Frontoparietal",
      "fibersCount": 29000,
      "myelination": 93,
      "conductionVelocity": 68,
      "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
        "category": "Fascículo de Asociación Frontoparietal",
        "fibersCount": 29000,
        "myelination": 93,
        "conductionVelocity": 68,
        "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
      }
    ]
  },
  {
    "id": "GLASSER_SCEF",
    "name": "Área SCEF (Campo Ocular Cingular y Suplementario)",
    "shortName": "Área SCEF",
    "atlasId": "HCP-MMP1.0_L_SCEF",
    "moduleNumber": 8,
    "moduleName": "Corteza Premotora",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.2065,
      1.4053,
      0.7403
    ],
    "mniCoordinates": [
      -5.9,
      3.3,
      55.0
    ],
    "color": "#14b8a6",
    "baseFiringRate": 44.8,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontal Ascendente)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Control de sacadas intencionales basadas en recompensas y motivación volitiva.",
    "clinicalCorrelation": "Hipometría sacádica en tareas que exigen búsqueda deliberada de blancos gratificantes.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
      "category": "Fascículo de Asociación Frontoparietal",
      "fibersCount": 29000,
      "myelination": 93,
      "conductionVelocity": 68,
      "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Frontoparietal)",
        "category": "Fascículo de Asociación Frontoparietal",
        "fibersCount": 29000,
        "myelination": 93,
        "conductionVelocity": 68,
        "clinicalDisconnectionSummary": "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"
      }
    ]
  },
  {
    "id": "GLASSER_43",
    "name": "Área 43 (Corteza Gustativa Primaria Opercular)",
    "shortName": "Área 43",
    "atlasId": "HCP-MMP1.0_L_43",
    "moduleNumber": 9,
    "moduleName": "Corteza Opercular Posterior",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -2.002,
      -0.2538,
      0.5828
    ],
    "mniCoordinates": [
      -57.2,
      -1.2,
      7.6
    ],
    "color": "#0d9488",
    "baseFiringRate": 37.9,
    "bloodSupply": "Arteria Cerebral Media (ACM - M3/M4 Ramas Operculares)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Discriminación química de los sabores básicos (dulce, salado, amargo, ácido, umami).",
    "clinicalCorrelation": "Ageusia o hipogeusia gustativa contralateral con distorsión de la palatabilidad.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF III / Vía Opercular)",
      "category": "Fibras de Asociación Perisilviana",
      "fibersCount": 19500,
      "myelination": 89,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Ageusia focal, apraxia deglutoria y síndrome opercular posterior"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF III / Vía Opercular)",
        "category": "Fibras de Asociación Perisilviana",
        "fibersCount": 19500,
        "myelination": 89,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Ageusia focal, apraxia deglutoria y síndrome opercular posterior"
      }
    ]
  },
  {
    "id": "GLASSER_FOP1",
    "name": "Área FOP1 (Opérculo Frontal 1)",
    "shortName": "Área FOP1",
    "atlasId": "HCP-MMP1.0_L_FOP1",
    "moduleNumber": 9,
    "moduleName": "Corteza Opercular Posterior",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.7535,
      -0.4323,
      0.7088
    ],
    "mniCoordinates": [
      -50.1,
      2.4,
      2.5
    ],
    "color": "#0d9488",
    "baseFiringRate": 46.5,
    "bloodSupply": "Arteria Cerebral Media (ACM - M3/M4 Ramas Operculares)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Sensorimotricidad laringofaringea y reflejos de deglución rítmica.",
    "clinicalCorrelation": "Disfagia orofaríngea de origen cortical con riesgo elevado de broncoaspiración silente.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF III / Vía Opercular)",
      "category": "Fibras de Asociación Perisilviana",
      "fibersCount": 19500,
      "myelination": 89,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Ageusia focal, apraxia deglutoria y síndrome opercular posterior"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF III / Vía Opercular)",
        "category": "Fibras de Asociación Perisilviana",
        "fibersCount": 19500,
        "myelination": 89,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Ageusia focal, apraxia deglutoria y síndrome opercular posterior"
      }
    ]
  },
  {
    "id": "GLASSER_OP4",
    "name": "Área OP4 (Opérculo Parietal 4 / SII Anterior)",
    "shortName": "Área OP4",
    "atlasId": "HCP-MMP1.0_L_OP4",
    "moduleNumber": 9,
    "moduleName": "Corteza Opercular Posterior",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -2.051,
      -0.0542,
      0.1383
    ],
    "mniCoordinates": [
      -58.6,
      -13.9,
      13.3
    ],
    "color": "#0d9488",
    "baseFiringRate": 42.2,
    "bloodSupply": "Arteria Cerebral Media (ACM - M3/M4 Ramas Operculares)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Integración sensoriomotora orofacial táctil y vibratoria somatosensorial secundaria.",
    "clinicalCorrelation": "Hipoestesia peribucal y pérdida de propiocepción lingual durante la masticación.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF III / Vía Opercular)",
      "category": "Fibras de Asociación Perisilviana",
      "fibersCount": 19500,
      "myelination": 89,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Ageusia focal, apraxia deglutoria y síndrome opercular posterior"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF III / Vía Opercular)",
        "category": "Fibras de Asociación Perisilviana",
        "fibersCount": 19500,
        "myelination": 89,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Ageusia focal, apraxia deglutoria y síndrome opercular posterior"
      }
    ]
  },
  {
    "id": "GLASSER_OP1",
    "name": "Área OP1 (Opérculo Parietal 1 / S2 Somatosensorial Secundaria)",
    "shortName": "Área OP1",
    "atlasId": "HCP-MMP1.0_L_OP1",
    "moduleNumber": 9,
    "moduleName": "Corteza Opercular Posterior",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.631,
      0.0542,
      -0.1663
    ],
    "mniCoordinates": [
      -46.6,
      -22.6,
      16.4
    ],
    "color": "#0d9488",
    "baseFiringRate": 42.2,
    "bloodSupply": "Arteria Cerebral Media (ACM - M3/M4 Ramas Operculares)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Procesamiento bilateral del dolor cutáneo y sensación térmica discriminativa.",
    "clinicalCorrelation": "Asimbolia para el dolor (el paciente reconoce el pinchazo pero no le atribuye cualidad nociva).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF III / Vía Opercular)",
      "category": "Fibras de Asociación Perisilviana",
      "fibersCount": 19500,
      "myelination": 89,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Ageusia focal, apraxia deglutoria y síndrome opercular posterior"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF III / Vía Opercular)",
        "category": "Fibras de Asociación Perisilviana",
        "fibersCount": 19500,
        "myelination": 89,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Ageusia focal, apraxia deglutoria y síndrome opercular posterior"
      }
    ]
  },
  {
    "id": "GLASSER_OP2_3",
    "name": "Área OP2-3 (Opérculo Parietal 2-3)",
    "shortName": "Área OP2-3",
    "atlasId": "HCP-MMP1.0_L_OP2-3",
    "moduleNumber": 9,
    "moduleName": "Corteza Opercular Posterior",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.379,
      0.0403,
      0.0263
    ],
    "mniCoordinates": [
      -39.4,
      -17.1,
      16.0
    ],
    "color": "#0d9488",
    "baseFiringRate": 50.8,
    "bloodSupply": "Arteria Cerebral Media (ACM - M3/M4 Ramas Operculares)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Percepción de vibración somestésica y reconocimiento del peso de objetos.",
    "clinicalCorrelation": "Baragnosia (incapacidad para juzgar el peso relativo de dos objetos en la mano).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF III / Vía Opercular)",
      "category": "Fibras de Asociación Perisilviana",
      "fibersCount": 19500,
      "myelination": 89,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Ageusia focal, apraxia deglutoria y síndrome opercular posterior"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF III / Vía Opercular)",
        "category": "Fibras de Asociación Perisilviana",
        "fibersCount": 19500,
        "myelination": 89,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Ageusia focal, apraxia deglutoria y síndrome opercular posterior"
      }
    ]
  },
  {
    "id": "GLASSER_PFcm",
    "name": "Área PFcm (Giro Supramarginal Opercular Caudal)",
    "shortName": "Área PFcm",
    "atlasId": "HCP-MMP1.0_L_PFcm",
    "moduleNumber": 9,
    "moduleName": "Corteza Opercular Posterior",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.778,
      0.1453,
      -0.5163
    ],
    "mniCoordinates": [
      -50.8,
      -32.6,
      19.0
    ],
    "color": "#0d9488",
    "baseFiringRate": 46.5,
    "bloodSupply": "Arteria Cerebral Media (ACM - M3/M4 Ramas Operculares)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Coordinación vestibular-somatosensorial para balance cefálico durante fonación.",
    "clinicalCorrelation": "Vértigo central posicional y disfonía vinculada a desorientación del plano sagital.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF III / Vía Opercular)",
      "category": "Fibras de Asociación Perisilviana",
      "fibersCount": 19500,
      "myelination": 89,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Ageusia focal, apraxia deglutoria y síndrome opercular posterior"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF III / Vía Opercular)",
        "category": "Fibras de Asociación Perisilviana",
        "fibersCount": 19500,
        "myelination": 89,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Ageusia focal, apraxia deglutoria y síndrome opercular posterior"
      }
    ]
  },
  {
    "id": "GLASSER_52",
    "name": "Área 52 (Corteza Parainsular Retroauditoria)",
    "shortName": "Área 52",
    "atlasId": "HCP-MMP1.0_L_52",
    "moduleNumber": 9,
    "moduleName": "Corteza Opercular Posterior",
    "system": "Motor / Somatosensorial",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.358,
      -0.5373,
      -0.1557
    ],
    "mniCoordinates": [
      -38.8,
      -22.3,
      -0.5
    ],
    "color": "#0d9488",
    "baseFiringRate": 37.9,
    "bloodSupply": "Arteria Cerebral Media (ACM - M3/M4 Ramas Operculares)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Acoplamiento temporoinsular para retroalimentación auditivo-fonatoria.",
    "clinicalCorrelation": "Pérdida de la modulación fonatoria ante ruido ambiental elevado (efecto Lombard alterado).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF III / Vía Opercular)",
      "category": "Fibras de Asociación Perisilviana",
      "fibersCount": 19500,
      "myelination": 89,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Ageusia focal, apraxia deglutoria y síndrome opercular posterior"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF III / Vía Opercular)",
        "category": "Fibras de Asociación Perisilviana",
        "fibersCount": 19500,
        "myelination": 89,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Ageusia focal, apraxia deglutoria y síndrome opercular posterior"
      }
    ]
  },
  {
    "id": "GLASSER_A1",
    "name": "Área A1 (Corteza Auditiva Primaria - Giro de Heschl / BA 41)",
    "shortName": "Área A1",
    "atlasId": "HCP-MMP1.0_L_A1",
    "moduleNumber": 10,
    "moduleName": "Corteza Auditiva Temprana",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.5295,
      -0.1417,
      -0.2467
    ],
    "mniCoordinates": [
      -43.7,
      -24.9,
      10.8
    ],
    "color": "#06b6d4",
    "baseFiringRate": 39.6,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Temporal Anterior / Heschl)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Mapeo tonotópico estricto de frecuencias puras, onset sonoro y discriminación temporal.",
    "clinicalCorrelation": "Sordera cortical bilateral (si afecta ambos giros de Heschl) o amusia aguda receptiva.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_THALAMIC_RADIATION",
      "name": "Radiaciones Auditivas (Tracto Geniculotemporal)",
      "category": "Fibras de Proyección Subcortical",
      "fibersCount": 23000,
      "myelination": 95,
      "conductionVelocity": 68,
      "clinicalDisconnectionSummary": "Sordera cortical, agnosia auditiva no verbal y pérdida de tonotopía"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_THALAMIC_RADIATION",
        "name": "Radiaciones Auditivas (Tracto Geniculotemporal)",
        "category": "Fibras de Proyección Subcortical",
        "fibersCount": 23000,
        "myelination": 95,
        "conductionVelocity": 68,
        "clinicalDisconnectionSummary": "Sordera cortical, agnosia auditiva no verbal y pérdida de tonotopía"
      }
    ]
  },
  {
    "id": "GLASSER_LBelt",
    "name": "Área LBelt (Cinturón Auditivo Lateral)",
    "shortName": "Área LBelt",
    "atlasId": "HCP-MMP1.0_L_LBelt",
    "moduleNumber": 10,
    "moduleName": "Corteza Auditiva Temprana",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.6065,
      -0.2643,
      -0.3658
    ],
    "mniCoordinates": [
      -45.9,
      -28.3,
      7.3
    ],
    "color": "#06b6d4",
    "baseFiringRate": 52.5,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Temporal Anterior / Heschl)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Análisis de sonidos complejos armónicos y formantes espectrales de la voz humana.",
    "clinicalCorrelation": "Incapacidad para discriminar el timbre de instrumentos o voces de interlocutores conocidos.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_THALAMIC_RADIATION",
      "name": "Radiaciones Auditivas (Tracto Geniculotemporal)",
      "category": "Fibras de Proyección Subcortical",
      "fibersCount": 23000,
      "myelination": 95,
      "conductionVelocity": 68,
      "clinicalDisconnectionSummary": "Sordera cortical, agnosia auditiva no verbal y pérdida de tonotopía"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_THALAMIC_RADIATION",
        "name": "Radiaciones Auditivas (Tracto Geniculotemporal)",
        "category": "Fibras de Proyección Subcortical",
        "fibersCount": 23000,
        "myelination": 95,
        "conductionVelocity": 68,
        "clinicalDisconnectionSummary": "Sordera cortical, agnosia auditiva no verbal y pérdida de tonotopía"
      }
    ]
  },
  {
    "id": "GLASSER_MBelt",
    "name": "Área MBelt (Cinturón Auditivo Medial)",
    "shortName": "Área MBelt",
    "atlasId": "HCP-MMP1.0_L_MBelt",
    "moduleNumber": 10,
    "moduleName": "Corteza Auditiva Temprana",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.526,
      -0.4358,
      -0.0052
    ],
    "mniCoordinates": [
      -43.6,
      -18.0,
      2.4
    ],
    "color": "#06b6d4",
    "baseFiringRate": 52.5,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Temporal Anterior / Heschl)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Procesamiento binaural de desfase interaural temporal para localización espacial.",
    "clinicalCorrelation": "Incapacidad para localizar en el espacio de dónde proviene un sonido repentino.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_THALAMIC_RADIATION",
      "name": "Radiaciones Auditivas (Tracto Geniculotemporal)",
      "category": "Fibras de Proyección Subcortical",
      "fibersCount": 23000,
      "myelination": 95,
      "conductionVelocity": 68,
      "clinicalDisconnectionSummary": "Sordera cortical, agnosia auditiva no verbal y pérdida de tonotopía"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_THALAMIC_RADIATION",
        "name": "Radiaciones Auditivas (Tracto Geniculotemporal)",
        "category": "Fibras de Proyección Subcortical",
        "fibersCount": 23000,
        "myelination": 95,
        "conductionVelocity": 68,
        "clinicalDisconnectionSummary": "Sordera cortical, agnosia auditiva no verbal y pérdida de tonotopía"
      }
    ]
  },
  {
    "id": "GLASSER_PBelt",
    "name": "Área PBelt (Cinturón Auditivo Posterior / Parabelt)",
    "shortName": "Área PBelt",
    "atlasId": "HCP-MMP1.0_L_PBelt",
    "moduleNumber": 10,
    "moduleName": "Corteza Auditiva Temprana",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.89,
      -0.3098,
      -0.2467
    ],
    "mniCoordinates": [
      -54.0,
      -24.9,
      6.0
    ],
    "color": "#06b6d4",
    "baseFiringRate": 52.5,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Temporal Anterior / Heschl)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Integración de secuencias acústicas fonológicas de alta tasa de repetición.",
    "clinicalCorrelation": "Agnosia verbal pura (Word Deafness: se oye el habla como ruido extranjero incomprensible).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_THALAMIC_RADIATION",
      "name": "Radiaciones Auditivas (Tracto Geniculotemporal)",
      "category": "Fibras de Proyección Subcortical",
      "fibersCount": 23000,
      "myelination": 95,
      "conductionVelocity": 68,
      "clinicalDisconnectionSummary": "Sordera cortical, agnosia auditiva no verbal y pérdida de tonotopía"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_THALAMIC_RADIATION",
        "name": "Radiaciones Auditivas (Tracto Geniculotemporal)",
        "category": "Fibras de Proyección Subcortical",
        "fibersCount": 23000,
        "myelination": 95,
        "conductionVelocity": 68,
        "clinicalDisconnectionSummary": "Sordera cortical, agnosia auditiva no verbal y pérdida de tonotopía"
      }
    ]
  },
  {
    "id": "GLASSER_RI",
    "name": "Área RI (Giro Insular Retroauditivo)",
    "shortName": "Área RI",
    "atlasId": "HCP-MMP1.0_L_RI",
    "moduleNumber": 10,
    "moduleName": "Corteza Auditiva Temprana",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.386,
      0.0578,
      -0.5617
    ],
    "mniCoordinates": [
      -39.6,
      -33.9,
      16.5
    ],
    "color": "#06b6d4",
    "baseFiringRate": 39.6,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Temporal Anterior / Heschl)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Conexión entre análisis acústico espectral y sistema límbico de sobresalto.",
    "clinicalCorrelation": "Falta de reflejo de alerta o sobresalto ante alarmas estridentes.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_THALAMIC_RADIATION",
      "name": "Radiaciones Auditivas (Tracto Geniculotemporal)",
      "category": "Fibras de Proyección Subcortical",
      "fibersCount": 23000,
      "myelination": 95,
      "conductionVelocity": 68,
      "clinicalDisconnectionSummary": "Sordera cortical, agnosia auditiva no verbal y pérdida de tonotopía"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_THALAMIC_RADIATION",
        "name": "Radiaciones Auditivas (Tracto Geniculotemporal)",
        "category": "Fibras de Proyección Subcortical",
        "fibersCount": 23000,
        "myelination": 95,
        "conductionVelocity": 68,
        "clinicalDisconnectionSummary": "Sordera cortical, agnosia auditiva no verbal y pérdida de tonotopía"
      }
    ]
  },
  {
    "id": "GLASSER_A4",
    "name": "Área A4 (Temporal Superior Lateral - Análisis Fonológico)",
    "shortName": "Área A4",
    "atlasId": "HCP-MMP1.0_L_A4",
    "moduleNumber": 11,
    "moduleName": "Corteza Auditiva de Asociación",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -2.24,
      -0.3202,
      -0.1522
    ],
    "mniCoordinates": [
      -64.0,
      -22.2,
      5.7
    ],
    "color": "#0284c7",
    "baseFiringRate": 41.3,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Temporal Media / Wernicke)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Decodificación fonémica de consonantes oclusivas y fricativas del lenguaje hablado.",
    "clinicalCorrelation": "Afasia acústico-agnóstica con deformación de palabras y parafasias fonémicas múltiples.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado & Fascículo Longitudinal Superior",
      "category": "Fascículo de Asociación del Lenguaje",
      "fibersCount": 32000,
      "myelination": 95,
      "conductionVelocity": 66,
      "clinicalDisconnectionSummary": "Afasia de Wernicke clásica, jergafasia y anomia acústica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado & Fascículo Longitudinal Superior",
        "category": "Fascículo de Asociación del Lenguaje",
        "fibersCount": 32000,
        "myelination": 95,
        "conductionVelocity": 66,
        "clinicalDisconnectionSummary": "Afasia de Wernicke clásica, jergafasia y anomia acústica"
      }
    ]
  },
  {
    "id": "GLASSER_A5",
    "name": "Área A5 (Temporal Superior Anterior)",
    "shortName": "Área A5",
    "atlasId": "HCP-MMP1.0_L_A5",
    "moduleNumber": 11,
    "moduleName": "Corteza Auditiva de Asociación",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -2.198,
      -0.6458,
      0.0193
    ],
    "mniCoordinates": [
      -62.8,
      -17.3,
      -3.6
    ],
    "color": "#0284c7",
    "baseFiringRate": 41.3,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Temporal Media / Wernicke)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Integración léxico-semántica de oraciones complejas y prosodia afectiva.",
    "clinicalCorrelation": "Afasia semántica sensorial con comprensión rota del discurso fluido y prosodia neutra.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado & Fascículo Longitudinal Superior",
      "category": "Fascículo de Asociación del Lenguaje",
      "fibersCount": 32000,
      "myelination": 95,
      "conductionVelocity": 66,
      "clinicalDisconnectionSummary": "Afasia de Wernicke clásica, jergafasia y anomia acústica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado & Fascículo Longitudinal Superior",
        "category": "Fascículo de Asociación del Lenguaje",
        "fibersCount": 32000,
        "myelination": 95,
        "conductionVelocity": 66,
        "clinicalDisconnectionSummary": "Afasia de Wernicke clásica, jergafasia y anomia acústica"
      }
    ]
  },
  {
    "id": "GLASSER_STSdp",
    "name": "Área STSdp (Surco Temporal Superior Dorsal Posterior)",
    "shortName": "Área STSdp",
    "atlasId": "HCP-MMP1.0_L_STSdp",
    "moduleNumber": 11,
    "moduleName": "Corteza Auditiva de Asociación",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.8305,
      -0.5933,
      -0.5792
    ],
    "mniCoordinates": [
      -52.3,
      -34.4,
      -2.1
    ],
    "color": "#0284c7",
    "baseFiringRate": 54.2,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Temporal Media / Wernicke)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Percepción de sincronía audiovisual entre movimiento labial y sonido vocal.",
    "clinicalCorrelation": "Efecto McGurk abolido e incapacidad para leer los labios del interlocutor en ambientes ruidosos.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado & Fascículo Longitudinal Superior",
      "category": "Fascículo de Asociación del Lenguaje",
      "fibersCount": 32000,
      "myelination": 95,
      "conductionVelocity": 66,
      "clinicalDisconnectionSummary": "Afasia de Wernicke clásica, jergafasia y anomia acústica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado & Fascículo Longitudinal Superior",
        "category": "Fascículo de Asociación del Lenguaje",
        "fibersCount": 32000,
        "myelination": 95,
        "conductionVelocity": 66,
        "clinicalDisconnectionSummary": "Afasia de Wernicke clásica, jergafasia y anomia acústica"
      }
    ]
  },
  {
    "id": "GLASSER_STSda",
    "name": "Área STSda (Surco Temporal Superior Dorsal Anterior)",
    "shortName": "Área STSda",
    "atlasId": "HCP-MMP1.0_L_STSda",
    "moduleNumber": 11,
    "moduleName": "Corteza Auditiva de Asociación",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.918,
      -0.9573,
      0.2503
    ],
    "mniCoordinates": [
      -54.8,
      -10.7,
      -12.5
    ],
    "color": "#0284c7",
    "baseFiringRate": 54.2,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Temporal Media / Wernicke)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Reconocimiento de la intencionalidad comunicativa en la voz del interlocutor.",
    "clinicalCorrelation": "Dificultad para detectar sarcasmo, ironía o metáforas en comunicación hablada.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado & Fascículo Longitudinal Superior",
      "category": "Fascículo de Asociación del Lenguaje",
      "fibersCount": 32000,
      "myelination": 95,
      "conductionVelocity": 66,
      "clinicalDisconnectionSummary": "Afasia de Wernicke clásica, jergafasia y anomia acústica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado & Fascículo Longitudinal Superior",
        "category": "Fascículo de Asociación del Lenguaje",
        "fibersCount": 32000,
        "myelination": 95,
        "conductionVelocity": 66,
        "clinicalDisconnectionSummary": "Afasia de Wernicke clásica, jergafasia y anomia acústica"
      }
    ]
  },
  {
    "id": "GLASSER_STSvp",
    "name": "Área STSvp (Surco Temporal Superior Ventral Posterior)",
    "shortName": "Área STSvp",
    "atlasId": "HCP-MMP1.0_L_STSvp",
    "moduleNumber": 11,
    "moduleName": "Corteza Auditiva de Asociación",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.9075,
      -0.7053,
      -0.6282
    ],
    "mniCoordinates": [
      -54.5,
      -35.8,
      -5.3
    ],
    "color": "#0284c7",
    "baseFiringRate": 54.2,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Temporal Media / Wernicke)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Análisis del movimiento biológico en rostros y gesticulación manual acompañante.",
    "clinicalCorrelation": "Incapacidad para interpretar el lenguaje corporal o gestual de apoyo al habla.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado & Fascículo Longitudinal Superior",
      "category": "Fascículo de Asociación del Lenguaje",
      "fibersCount": 32000,
      "myelination": 95,
      "conductionVelocity": 66,
      "clinicalDisconnectionSummary": "Afasia de Wernicke clásica, jergafasia y anomia acústica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado & Fascículo Longitudinal Superior",
        "category": "Fascículo de Asociación del Lenguaje",
        "fibersCount": 32000,
        "myelination": 95,
        "conductionVelocity": 66,
        "clinicalDisconnectionSummary": "Afasia de Wernicke clásica, jergafasia y anomia acústica"
      }
    ]
  },
  {
    "id": "GLASSER_STSva",
    "name": "Área STSva (Surco Temporal Superior Ventral Anterior)",
    "shortName": "Área STSva",
    "atlasId": "HCP-MMP1.0_L_STSva",
    "moduleNumber": 11,
    "moduleName": "Corteza Auditiva de Asociación",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.8445,
      -1.0903,
      0.1383
    ],
    "mniCoordinates": [
      -52.7,
      -13.9,
      -16.3
    ],
    "color": "#0284c7",
    "baseFiringRate": 54.2,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Temporal Media / Wernicke)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Integración auditiva con centros parahipocámpicos de memoria autobiográfica de voces.",
    "clinicalCorrelation": "Fonoagnosia (incapacidad para reconocer voces conocidas sin ver sus caras).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado & Fascículo Longitudinal Superior",
      "category": "Fascículo de Asociación del Lenguaje",
      "fibersCount": 32000,
      "myelination": 95,
      "conductionVelocity": 66,
      "clinicalDisconnectionSummary": "Afasia de Wernicke clásica, jergafasia y anomia acústica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado & Fascículo Longitudinal Superior",
        "category": "Fascículo de Asociación del Lenguaje",
        "fibersCount": 32000,
        "myelination": 95,
        "conductionVelocity": 66,
        "clinicalDisconnectionSummary": "Afasia de Wernicke clásica, jergafasia y anomia acústica"
      }
    ]
  },
  {
    "id": "GLASSER_TA2",
    "name": "Área TA2 (Giro Temporal Superior Anterior Extremo)",
    "shortName": "Área TA2",
    "atlasId": "HCP-MMP1.0_L_TA2",
    "moduleNumber": 11,
    "moduleName": "Corteza Auditiva de Asociación",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.771,
      -0.7788,
      0.6073
    ],
    "mniCoordinates": [
      -50.6,
      -0.5,
      -7.4
    ],
    "color": "#0284c7",
    "baseFiringRate": 45.6,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Temporal Media / Wernicke)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Procesamiento de coherencia sintáctica global de textos y narrativas extensas.",
    "clinicalCorrelation": "Pérdida del hilo conductor temático en conversaciones largas y desinhibición comunicativa.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado & Fascículo Longitudinal Superior",
      "category": "Fascículo de Asociación del Lenguaje",
      "fibersCount": 32000,
      "myelination": 95,
      "conductionVelocity": 66,
      "clinicalDisconnectionSummary": "Afasia de Wernicke clásica, jergafasia y anomia acústica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado & Fascículo Longitudinal Superior",
        "category": "Fascículo de Asociación del Lenguaje",
        "fibersCount": 32000,
        "myelination": 95,
        "conductionVelocity": 66,
        "clinicalDisconnectionSummary": "Afasia de Wernicke clásica, jergafasia y anomia acústica"
      }
    ]
  },
  {
    "id": "GLASSER_STGa",
    "name": "Área STGa (Giro Temporal Superior Anterior)",
    "shortName": "Área STGa",
    "atlasId": "HCP-MMP1.0_L_STGa",
    "moduleNumber": 11,
    "moduleName": "Corteza Auditiva de Asociación",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.8025,
      -1.1253,
      0.9958
    ],
    "mniCoordinates": [
      -51.5,
      10.6,
      -17.3
    ],
    "color": "#0284c7",
    "baseFiringRate": 49.9,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Temporal Media / Wernicke)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Procesamiento prosódico emocional y sintaxis oracional de alto nivel.",
    "clinicalCorrelation": "Aprosodia receptiva afectiva (incapacidad para discernir enfado o alegría en la voz).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado & Fascículo Longitudinal Superior",
      "category": "Fascículo de Asociación del Lenguaje",
      "fibersCount": 32000,
      "myelination": 95,
      "conductionVelocity": 66,
      "clinicalDisconnectionSummary": "Afasia de Wernicke clásica, jergafasia y anomia acústica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado & Fascículo Longitudinal Superior",
        "category": "Fascículo de Asociación del Lenguaje",
        "fibersCount": 32000,
        "myelination": 95,
        "conductionVelocity": 66,
        "clinicalDisconnectionSummary": "Afasia de Wernicke clásica, jergafasia y anomia acústica"
      }
    ]
  },
  {
    "id": "GLASSER_PoI1",
    "name": "Área PoI1 (Ínsula Posterior 1 - Termoalgesia e Interocepción)",
    "shortName": "Área PoI1",
    "atlasId": "HCP-MMP1.0_L_PoI1",
    "moduleNumber": 12,
    "moduleName": "Corteza Insular y Frontal Opercular",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Insular",
    "type": "cortical",
    "position": [
      -1.386,
      -0.7473,
      0.2048
    ],
    "mniCoordinates": [
      -39.6,
      -12.0,
      -6.5
    ],
    "color": "#0ea5e9",
    "baseFiringRate": 51.6,
    "bloodSupply": "Arteria Cerebral Media (ACM - Ramas Insulares M2 / Troncos Silvianos)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Mapa visceral interno de temperatura, taquicardia, respiración y dolor visceral.",
    "clinicalCorrelation": "Pérdida de percepción del dolor visceral orgánico y desregulación autonómica cardíaca.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Red Salience Hub Insular",
      "category": "Fibras de Conexión Frontotemporal",
      "fibersCount": 21000,
      "myelination": 88,
      "conductionVelocity": 55,
      "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Red Salience Hub Insular",
        "category": "Fibras de Conexión Frontotemporal",
        "fibersCount": 21000,
        "myelination": 88,
        "conductionVelocity": 55,
        "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
      }
    ]
  },
  {
    "id": "GLASSER_PoI2",
    "name": "Área PoI2 (Ínsula Posterior 2)",
    "shortName": "Área PoI2",
    "atlasId": "HCP-MMP1.0_L_PoI2",
    "moduleNumber": 12,
    "moduleName": "Corteza Insular y Frontal Opercular",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Insular",
    "type": "cortical",
    "position": [
      -1.428,
      -0.6143,
      0.4708
    ],
    "mniCoordinates": [
      -40.8,
      -4.4,
      -2.7
    ],
    "color": "#0ea5e9",
    "baseFiringRate": 51.6,
    "bloodSupply": "Arteria Cerebral Media (ACM - Ramas Insulares M2 / Troncos Silvianos)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Integración de sensaciones de repleción gástrica, náusea y distensión esofágica.",
    "clinicalCorrelation": "Abolición de sensación de saciedad gástrica o crisis de náusea epiléptica insular.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Red Salience Hub Insular",
      "category": "Fibras de Conexión Frontotemporal",
      "fibersCount": 21000,
      "myelination": 88,
      "conductionVelocity": 55,
      "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Red Salience Hub Insular",
        "category": "Fibras de Conexión Frontotemporal",
        "fibersCount": 21000,
        "myelination": 88,
        "conductionVelocity": 55,
        "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
      }
    ]
  },
  {
    "id": "GLASSER_MI",
    "name": "Área MI (Ínsula Media)",
    "shortName": "Área MI",
    "atlasId": "HCP-MMP1.0_L_MI",
    "moduleNumber": 12,
    "moduleName": "Corteza Insular y Frontal Opercular",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Insular",
    "type": "cortical",
    "position": [
      -1.295,
      -0.4218,
      0.9538
    ],
    "mniCoordinates": [
      -37.0,
      9.4,
      2.8
    ],
    "color": "#0ea5e9",
    "baseFiringRate": 43.0,
    "bloodSupply": "Arteria Cerebral Media (ACM - Ramas Insulares M2 / Troncos Silvianos)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Transición de propiocepción visceral hacia representación afectiva de la emoción.",
    "clinicalCorrelation": "Labilidad emocional con risa o llanto inmotivado pseudobulbar de origen cortical.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Red Salience Hub Insular",
      "category": "Fibras de Conexión Frontotemporal",
      "fibersCount": 21000,
      "myelination": 88,
      "conductionVelocity": 55,
      "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Red Salience Hub Insular",
        "category": "Fibras de Conexión Frontotemporal",
        "fibersCount": 21000,
        "myelination": 88,
        "conductionVelocity": 55,
        "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
      }
    ]
  },
  {
    "id": "GLASSER_AVI",
    "name": "Área AVI (Ínsula Anterior Ventral - Hub de la Red de Saliencia)",
    "shortName": "Área AVI",
    "atlasId": "HCP-MMP1.0_L_AVI",
    "moduleNumber": 12,
    "moduleName": "Corteza Insular y Frontal Opercular",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Insular",
    "type": "cortical",
    "position": [
      -1.0815,
      -0.6318,
      1.4683
    ],
    "mniCoordinates": [
      -30.9,
      24.1,
      -3.2
    ],
    "color": "#0ea5e9",
    "baseFiringRate": 47.3,
    "bloodSupply": "Arteria Cerebral Media (ACM - Ramas Insulares M2 / Troncos Silvianos)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Evaluación subjetiva de sensaciones viscerales, empatía ante dolor ajeno y asco.",
    "clinicalCorrelation": "Pérdida completa del asco conductual, tolerancia a sustancias nocivas y apatía empática.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Red Salience Hub Insular",
      "category": "Fibras de Conexión Frontotemporal",
      "fibersCount": 21000,
      "myelination": 88,
      "conductionVelocity": 55,
      "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Red Salience Hub Insular",
        "category": "Fibras de Conexión Frontotemporal",
        "fibersCount": 21000,
        "myelination": 88,
        "conductionVelocity": 55,
        "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
      }
    ]
  },
  {
    "id": "GLASSER_AAIC",
    "name": "Área AAIC (Corteza Agranular de la Ínsula Anterior)",
    "shortName": "Área AAIC",
    "atlasId": "HCP-MMP1.0_L_AAIC",
    "moduleNumber": 12,
    "moduleName": "Corteza Insular y Frontal Opercular",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Insular",
    "type": "cortical",
    "position": [
      -1.2005,
      -1.0098,
      1.0973
    ],
    "mniCoordinates": [
      -34.3,
      13.5,
      -14.0
    ],
    "color": "#0ea5e9",
    "baseFiringRate": 51.6,
    "bloodSupply": "Arteria Cerebral Media (ACM - Ramas Insulares M2 / Troncos Silvianos)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Control eferente del tono simpático-parasimpático cardíaco y presión arterial.",
    "clinicalCorrelation": "Arritmias cardíacas centrales neurogénicas e inestabilidad hemodinámica post-ictus.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Red Salience Hub Insular",
      "category": "Fibras de Conexión Frontotemporal",
      "fibersCount": 21000,
      "myelination": 88,
      "conductionVelocity": 55,
      "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Red Salience Hub Insular",
        "category": "Fibras de Conexión Frontotemporal",
        "fibersCount": 21000,
        "myelination": 88,
        "conductionVelocity": 55,
        "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
      }
    ]
  },
  {
    "id": "GLASSER_Pir",
    "name": "Área Pir (Corteza Piriforme - Olfacción Primaria)",
    "shortName": "Área Pir",
    "atlasId": "HCP-MMP1.0_L_Pir",
    "moduleNumber": 12,
    "moduleName": "Corteza Insular y Frontal Opercular",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Insular",
    "type": "cortical",
    "position": [
      -1.092,
      -1.2023,
      0.7718
    ],
    "mniCoordinates": [
      -31.2,
      4.2,
      -19.5
    ],
    "color": "#0ea5e9",
    "baseFiringRate": 47.3,
    "bloodSupply": "Arteria Cerebral Media (ACM - Ramas Insulares M2 / Troncos Silvianos)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Recepción consciente de estímulos odoríferos proyectados desde el bulbo olfatorio.",
    "clinicalCorrelation": "Anosmia cortical, cacosmia paroxística (alucinaciones de olores pútridos en epilepsia mesial).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Red Salience Hub Insular",
      "category": "Fibras de Conexión Frontotemporal",
      "fibersCount": 21000,
      "myelination": 88,
      "conductionVelocity": 55,
      "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Red Salience Hub Insular",
        "category": "Fibras de Conexión Frontotemporal",
        "fibersCount": 21000,
        "myelination": 88,
        "conductionVelocity": 55,
        "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
      }
    ]
  },
  {
    "id": "GLASSER_FOP2",
    "name": "Área FOP2 (Opérculo Frontal 2)",
    "shortName": "Área FOP2",
    "atlasId": "HCP-MMP1.0_L_FOP2",
    "moduleNumber": 12,
    "moduleName": "Corteza Insular y Frontal Opercular",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Insular",
    "type": "cortical",
    "position": [
      -1.428,
      -0.0788,
      0.4778
    ],
    "mniCoordinates": [
      -40.8,
      -4.2,
      12.6
    ],
    "color": "#0ea5e9",
    "baseFiringRate": 51.6,
    "bloodSupply": "Arteria Cerebral Media (ACM - Ramas Insulares M2 / Troncos Silvianos)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Monitoreo sensoriomotor del esfuerzo vocal y corrección de tono de habla.",
    "clinicalCorrelation": "Voz monótona, apagada y dificultad para autorregular volumen en ambientes silenciosos.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Red Salience Hub Insular",
      "category": "Fibras de Conexión Frontotemporal",
      "fibersCount": 21000,
      "myelination": 88,
      "conductionVelocity": 55,
      "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Red Salience Hub Insular",
        "category": "Fibras de Conexión Frontotemporal",
        "fibersCount": 21000,
        "myelination": 88,
        "conductionVelocity": 55,
        "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
      }
    ]
  },
  {
    "id": "GLASSER_FOP3",
    "name": "Área FOP3 (Opérculo Frontal 3)",
    "shortName": "Área FOP3",
    "atlasId": "HCP-MMP1.0_L_FOP3",
    "moduleNumber": 12,
    "moduleName": "Corteza Insular y Frontal Opercular",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Insular",
    "type": "cortical",
    "position": [
      -1.246,
      -0.1242,
      0.7368
    ],
    "mniCoordinates": [
      -35.6,
      3.2,
      11.3
    ],
    "color": "#0ea5e9",
    "baseFiringRate": 51.6,
    "bloodSupply": "Arteria Cerebral Media (ACM - Ramas Insulares M2 / Troncos Silvianos)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Coordinación entre respiración fonoarticulatoria y deglución.",
    "clinicalCorrelation": "Descoordinación espiratoria al hablar con pausas inspiratorias inapropiadas.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Red Salience Hub Insular",
      "category": "Fibras de Conexión Frontotemporal",
      "fibersCount": 21000,
      "myelination": 88,
      "conductionVelocity": 55,
      "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Red Salience Hub Insular",
        "category": "Fibras de Conexión Frontotemporal",
        "fibersCount": 21000,
        "myelination": 88,
        "conductionVelocity": 55,
        "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
      }
    ]
  },
  {
    "id": "GLASSER_FOP4",
    "name": "Área FOP4 (Opérculo Frontal 4)",
    "shortName": "Área FOP4",
    "atlasId": "HCP-MMP1.0_L_FOP4",
    "moduleNumber": 12,
    "moduleName": "Corteza Insular y Frontal Opercular",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Insular",
    "type": "cortical",
    "position": [
      -1.33,
      -0.3027,
      1.0728
    ],
    "mniCoordinates": [
      -38.0,
      12.8,
      6.2
    ],
    "color": "#0ea5e9",
    "baseFiringRate": 51.6,
    "bloodSupply": "Arteria Cerebral Media (ACM - Ramas Insulares M2 / Troncos Silvianos)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Selección de planes articulatorios premotores para fonemas complejos.",
    "clinicalCorrelation": "Apraxia fonética con tropiezos silábicos ante palabras polisilábicas complejas.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Red Salience Hub Insular",
      "category": "Fibras de Conexión Frontotemporal",
      "fibersCount": 21000,
      "myelination": 88,
      "conductionVelocity": 55,
      "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Red Salience Hub Insular",
        "category": "Fibras de Conexión Frontotemporal",
        "fibersCount": 21000,
        "myelination": 88,
        "conductionVelocity": 55,
        "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
      }
    ]
  },
  {
    "id": "GLASSER_FOP5",
    "name": "Área FOP5 (Opérculo Frontal 5)",
    "shortName": "Área FOP5",
    "atlasId": "HCP-MMP1.0_L_FOP5",
    "moduleNumber": 12,
    "moduleName": "Corteza Insular y Frontal Opercular",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Insular",
    "type": "cortical",
    "position": [
      -1.197,
      -0.3727,
      1.5278
    ],
    "mniCoordinates": [
      -34.2,
      25.8,
      4.2
    ],
    "color": "#0ea5e9",
    "baseFiringRate": 51.6,
    "bloodSupply": "Arteria Cerebral Media (ACM - Ramas Insulares M2 / Troncos Silvianos)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Transición de la ínsula hacia la pars triangularis de Broca.",
    "clinicalCorrelation": "Enlentecimiento del acceso léxico y latencia incrementada al iniciar respuestas verbales.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Red Salience Hub Insular",
      "category": "Fibras de Conexión Frontotemporal",
      "fibersCount": 21000,
      "myelination": 88,
      "conductionVelocity": 55,
      "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Red Salience Hub Insular",
        "category": "Fibras de Conexión Frontotemporal",
        "fibersCount": 21000,
        "myelination": 88,
        "conductionVelocity": 55,
        "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
      }
    ]
  },
  {
    "id": "GLASSER_Ig",
    "name": "Área Ig (Ínsula Granular)",
    "shortName": "Área Ig",
    "atlasId": "HCP-MMP1.0_L_Ig",
    "moduleNumber": 12,
    "moduleName": "Corteza Insular y Frontal Opercular",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Insular",
    "type": "cortical",
    "position": [
      -1.2775,
      -0.0542,
      0.0753
    ],
    "mniCoordinates": [
      -36.5,
      -15.7,
      13.3
    ],
    "color": "#0ea5e9",
    "baseFiringRate": 43.0,
    "bloodSupply": "Arteria Cerebral Media (ACM - Ramas Insulares M2 / Troncos Silvianos)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Filtro sensorial táctil-visceral previo al procesamiento afectivo de la saliencia.",
    "clinicalCorrelation": "Sensaciones cenestésicas anómalas o parestesias viscerales difusas abdominales.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Red Salience Hub Insular",
      "category": "Fibras de Conexión Frontotemporal",
      "fibersCount": 21000,
      "myelination": 88,
      "conductionVelocity": 55,
      "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Red Salience Hub Insular",
        "category": "Fibras de Conexión Frontotemporal",
        "fibersCount": 21000,
        "myelination": 88,
        "conductionVelocity": 55,
        "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
      }
    ]
  },
  {
    "id": "GLASSER_PI",
    "name": "Área PI (Corteza Parainsular)",
    "shortName": "Área PI",
    "atlasId": "HCP-MMP1.0_L_PI",
    "moduleNumber": 12,
    "moduleName": "Corteza Insular y Frontal Opercular",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Insular",
    "type": "cortical",
    "position": [
      -1.5155,
      -1.0308,
      0.4183
    ],
    "mniCoordinates": [
      -43.3,
      -5.9,
      -14.6
    ],
    "color": "#0ea5e9",
    "baseFiringRate": 43.0,
    "bloodSupply": "Arteria Cerebral Media (ACM - Ramas Insulares M2 / Troncos Silvianos)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Integración quimiosensorial y termorregulación neurovegetativa.",
    "clinicalCorrelation": "Termoanestesia visceral y alteración de sudoración gustativa reflexógena.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Red Salience Hub Insular",
      "category": "Fibras de Conexión Frontotemporal",
      "fibersCount": 21000,
      "myelination": 88,
      "conductionVelocity": 55,
      "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Red Salience Hub Insular",
        "category": "Fibras de Conexión Frontotemporal",
        "fibersCount": 21000,
        "myelination": 88,
        "conductionVelocity": 55,
        "clinicalDisconnectionSummary": "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"
      }
    ]
  },
  {
    "id": "GLASSER_H",
    "name": "Área H (Complejo Hipocampal - CA1, CA2, CA3 y Subículo)",
    "shortName": "Área H",
    "atlasId": "HCP-MMP1.0_L_H",
    "moduleNumber": 13,
    "moduleName": "Corteza Temporal Medial",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.078,
      -1.0377,
      -0.3027
    ],
    "mniCoordinates": [
      -30.8,
      -26.5,
      -14.8
    ],
    "color": "#f59e0b",
    "baseFiringRate": 40.4,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Ramas Coroideas Posterolaterales y Temporales)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Consolidación de nuevas memorias episódicas y espaciales en la memoria a largo plazo.",
    "clinicalCorrelation": "Amnesia anterógrada severa (incapacidad total para retener nuevos hechos tras la lesión).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_FORNIX",
      "name": "Fórnix & Fascículo de la Vía Perforante del Hipocampo",
      "category": "Fibras Límbicas de Memoria",
      "fibersCount": 17500,
      "myelination": 86,
      "conductionVelocity": 52,
      "clinicalDisconnectionSummary": "Amnesia anterógrada pura (Síndrome Amnésico Clásico de Korsakoff/HM)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_FORNIX",
        "name": "Fórnix & Fascículo de la Vía Perforante del Hipocampo",
        "category": "Fibras Límbicas de Memoria",
        "fibersCount": 17500,
        "myelination": 86,
        "conductionVelocity": 52,
        "clinicalDisconnectionSummary": "Amnesia anterógrada pura (Síndrome Amnésico Clásico de Korsakoff/HM)"
      }
    ]
  },
  {
    "id": "GLASSER_PreS",
    "name": "Área PreS (Presubículo - Células de Orientación de la Cabeza)",
    "shortName": "Área PreS",
    "atlasId": "HCP-MMP1.0_L_PreS",
    "moduleNumber": 13,
    "moduleName": "Corteza Temporal Medial",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -0.6615,
      -0.9083,
      -0.4917
    ],
    "mniCoordinates": [
      -18.9,
      -31.9,
      -11.1
    ],
    "color": "#f59e0b",
    "baseFiringRate": 53.3,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Ramas Coroideas Posterolaterales y Temporales)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Cálculo continuo del rumbo azimutal de la cabeza en el espacio tridimensional.",
    "clinicalCorrelation": "Pérdida absoluta de orientación direccional en espacios abiertos o laberintos.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_FORNIX",
      "name": "Fórnix & Fascículo de la Vía Perforante del Hipocampo",
      "category": "Fibras Límbicas de Memoria",
      "fibersCount": 17500,
      "myelination": 86,
      "conductionVelocity": 52,
      "clinicalDisconnectionSummary": "Amnesia anterógrada pura (Síndrome Amnésico Clásico de Korsakoff/HM)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_FORNIX",
        "name": "Fórnix & Fascículo de la Vía Perforante del Hipocampo",
        "category": "Fibras Límbicas de Memoria",
        "fibersCount": 17500,
        "myelination": 86,
        "conductionVelocity": 52,
        "clinicalDisconnectionSummary": "Amnesia anterógrada pura (Síndrome Amnésico Clásico de Korsakoff/HM)"
      }
    ]
  },
  {
    "id": "GLASSER_EC",
    "name": "Área EC (Corteza Entorrinal - Células de Red / Grid Cells)",
    "shortName": "Área EC",
    "atlasId": "HCP-MMP1.0_L_EC",
    "moduleNumber": 13,
    "moduleName": "Corteza Temporal Medial",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -0.6895,
      -1.5383,
      0.2013
    ],
    "mniCoordinates": [
      -19.7,
      -12.1,
      -29.1
    ],
    "color": "#f59e0b",
    "baseFiringRate": 44.7,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Ramas Coroideas Posterolaterales y Temporales)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Mapas de coordenadas métricas espaciales y puerta de entrada al hipocampo.",
    "clinicalCorrelation": "Desorientación espacial topográfica temprana y pérdida del mapa métrico del entorno (Alzheimer).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_FORNIX",
      "name": "Fórnix & Fascículo de la Vía Perforante del Hipocampo",
      "category": "Fibras Límbicas de Memoria",
      "fibersCount": 17500,
      "myelination": 86,
      "conductionVelocity": 52,
      "clinicalDisconnectionSummary": "Amnesia anterógrada pura (Síndrome Amnésico Clásico de Korsakoff/HM)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_FORNIX",
        "name": "Fórnix & Fascículo de la Vía Perforante del Hipocampo",
        "category": "Fibras Límbicas de Memoria",
        "fibersCount": 17500,
        "myelination": 86,
        "conductionVelocity": 52,
        "clinicalDisconnectionSummary": "Amnesia anterógrada pura (Síndrome Amnésico Clásico de Korsakoff/HM)"
      }
    ]
  },
  {
    "id": "GLASSER_PeEc",
    "name": "Área PeEc (Corteza Perientorrinal)",
    "shortName": "Área PeEc",
    "atlasId": "HCP-MMP1.0_L_PeEc",
    "moduleNumber": 13,
    "moduleName": "Corteza Temporal Medial",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.022,
      -1.7203,
      0.2363
    ],
    "mniCoordinates": [
      -29.2,
      -11.1,
      -34.3
    ],
    "color": "#f59e0b",
    "baseFiringRate": 53.3,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Ramas Coroideas Posterolaterales y Temporales)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Detección de novedad versus familiaridad en objetos visuales y rostros.",
    "clinicalCorrelation": "Falsa sensación de familiaridad permanente (déjà vu patológico) o agnosia de familiaridad.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_FORNIX",
      "name": "Fórnix & Fascículo de la Vía Perforante del Hipocampo",
      "category": "Fibras Límbicas de Memoria",
      "fibersCount": 17500,
      "myelination": 86,
      "conductionVelocity": 52,
      "clinicalDisconnectionSummary": "Amnesia anterógrada pura (Síndrome Amnésico Clásico de Korsakoff/HM)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_FORNIX",
        "name": "Fórnix & Fascículo de la Vía Perforante del Hipocampo",
        "category": "Fibras Límbicas de Memoria",
        "fibersCount": 17500,
        "myelination": 86,
        "conductionVelocity": 52,
        "clinicalDisconnectionSummary": "Amnesia anterógrada pura (Síndrome Amnésico Clásico de Korsakoff/HM)"
      }
    ]
  },
  {
    "id": "GLASSER_TF",
    "name": "Área TF (Giro Parahipocámpico Lateral)",
    "shortName": "Área TF",
    "atlasId": "HCP-MMP1.0_L_TF",
    "moduleNumber": 13,
    "moduleName": "Corteza Temporal Medial",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.407,
      -1.5313,
      -0.1802
    ],
    "mniCoordinates": [
      -40.2,
      -23.0,
      -28.9
    ],
    "color": "#f59e0b",
    "baseFiringRate": 44.7,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Ramas Coroideas Posterolaterales y Temporales)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Integración entre el 'qué' visual del objeto y el 'dónde' espacial del contexto.",
    "clinicalCorrelation": "Dificultad para recordar en qué lugar exacto se produjo un evento autobiográfico.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_FORNIX",
      "name": "Fórnix & Fascículo de la Vía Perforante del Hipocampo",
      "category": "Fibras Límbicas de Memoria",
      "fibersCount": 17500,
      "myelination": 86,
      "conductionVelocity": 52,
      "clinicalDisconnectionSummary": "Amnesia anterógrada pura (Síndrome Amnésico Clásico de Korsakoff/HM)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_FORNIX",
        "name": "Fórnix & Fascículo de la Vía Perforante del Hipocampo",
        "category": "Fibras Límbicas de Memoria",
        "fibersCount": 17500,
        "myelination": 86,
        "conductionVelocity": 52,
        "clinicalDisconnectionSummary": "Amnesia anterógrada pura (Síndrome Amnésico Clásico de Korsakoff/HM)"
      }
    ]
  },
  {
    "id": "GLASSER_PHA1",
    "name": "Área PHA1 (Área Parahipocámpica 1)",
    "shortName": "Área PHA1",
    "atlasId": "HCP-MMP1.0_L_PHA1",
    "moduleNumber": 13,
    "moduleName": "Corteza Temporal Medial",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -0.7525,
      -1.1463,
      -0.6352
    ],
    "mniCoordinates": [
      -21.5,
      -36.0,
      -17.9
    ],
    "color": "#f59e0b",
    "baseFiringRate": 53.3,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Ramas Coroideas Posterolaterales y Temporales)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Almacenamiento de escenas visuales complejas y vistas panorámicas de lugares.",
    "clinicalCorrelation": "Incapacidad para memorizar la distribución espacial de muebles o habitaciones nuevas.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_FORNIX",
      "name": "Fórnix & Fascículo de la Vía Perforante del Hipocampo",
      "category": "Fibras Límbicas de Memoria",
      "fibersCount": 17500,
      "myelination": 86,
      "conductionVelocity": 52,
      "clinicalDisconnectionSummary": "Amnesia anterógrada pura (Síndrome Amnésico Clásico de Korsakoff/HM)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_FORNIX",
        "name": "Fórnix & Fascículo de la Vía Perforante del Hipocampo",
        "category": "Fibras Límbicas de Memoria",
        "fibersCount": 17500,
        "myelination": 86,
        "conductionVelocity": 52,
        "clinicalDisconnectionSummary": "Amnesia anterógrada pura (Síndrome Amnésico Clásico de Korsakoff/HM)"
      }
    ]
  },
  {
    "id": "GLASSER_PHA2",
    "name": "Área PHA2 (Área Parahipocámpica 2)",
    "shortName": "Área PHA2",
    "atlasId": "HCP-MMP1.0_L_PHA2",
    "moduleNumber": 13,
    "moduleName": "Corteza Temporal Medial",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.0955,
      -1.0588,
      -0.6703
    ],
    "mniCoordinates": [
      -31.3,
      -37.0,
      -15.4
    ],
    "color": "#f59e0b",
    "baseFiringRate": 53.3,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Ramas Coroideas Posterolaterales y Temporales)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Fusión de información auditiva y espacial para la contextualización de recuerdos.",
    "clinicalCorrelation": "Desconexión entre el contexto sonoro de una experiencia y su recuerdo espacial.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_FORNIX",
      "name": "Fórnix & Fascículo de la Vía Perforante del Hipocampo",
      "category": "Fibras Límbicas de Memoria",
      "fibersCount": 17500,
      "myelination": 86,
      "conductionVelocity": 52,
      "clinicalDisconnectionSummary": "Amnesia anterógrada pura (Síndrome Amnésico Clásico de Korsakoff/HM)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_FORNIX",
        "name": "Fórnix & Fascículo de la Vía Perforante del Hipocampo",
        "category": "Fibras Límbicas de Memoria",
        "fibersCount": 17500,
        "myelination": 86,
        "conductionVelocity": 52,
        "clinicalDisconnectionSummary": "Amnesia anterógrada pura (Síndrome Amnésico Clásico de Korsakoff/HM)"
      }
    ]
  },
  {
    "id": "GLASSER_PHA3",
    "name": "Área PHA3 (Área Parahipocámpica Posterior)",
    "shortName": "Área PHA3",
    "atlasId": "HCP-MMP1.0_L_PHA3",
    "moduleNumber": 13,
    "moduleName": "Corteza Temporal Medial",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.1235,
      -1.1358,
      -0.6948
    ],
    "mniCoordinates": [
      -32.1,
      -37.7,
      -17.6
    ],
    "color": "#f59e0b",
    "baseFiringRate": 53.3,
    "bloodSupply": "Arteria Cerebral Posterior (ACP - Ramas Coroideas Posterolaterales y Temporales)",
    "arterialTerritoryId": "ACP",
    "cognitiveFunction": "Transición de la corteza parahipocámpica al polo visual ventromedial.",
    "clinicalCorrelation": "Amnesia retrógrada focal para paisajes urbanos conocidos previamente a la lesión.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_FORNIX",
      "name": "Fórnix & Fascículo de la Vía Perforante del Hipocampo",
      "category": "Fibras Límbicas de Memoria",
      "fibersCount": 17500,
      "myelination": 86,
      "conductionVelocity": 52,
      "clinicalDisconnectionSummary": "Amnesia anterógrada pura (Síndrome Amnésico Clásico de Korsakoff/HM)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_FORNIX",
        "name": "Fórnix & Fascículo de la Vía Perforante del Hipocampo",
        "category": "Fibras Límbicas de Memoria",
        "fibersCount": 17500,
        "myelination": 86,
        "conductionVelocity": 52,
        "clinicalDisconnectionSummary": "Amnesia anterógrada pura (Síndrome Amnésico Clásico de Korsakoff/HM)"
      }
    ]
  },
  {
    "id": "GLASSER_TGd",
    "name": "Área TGd (Polo Temporal Dorsal - Reconocimiento Social)",
    "shortName": "Área TGd",
    "atlasId": "HCP-MMP1.0_L_TGd",
    "moduleNumber": 14,
    "moduleName": "Corteza Temporal Lateral",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.358,
      -1.6433,
      0.9433
    ],
    "mniCoordinates": [
      -38.8,
      9.1,
      -32.1
    ],
    "color": "#f97316",
    "baseFiringRate": 50.7,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Temporal) & ACP",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Almacenamiento de conceptos semánticos sociales, normas culturales y biografías.",
    "clinicalCorrelation": "Pérdida de empatía social, desinhibición conductual y demencia semántica focal.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior & Fascículo Uncinado",
      "category": "Fibras de Asociación Occipitotemporal",
      "fibersCount": 25000,
      "myelination": 90,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior & Fascículo Uncinado",
        "category": "Fibras de Asociación Occipitotemporal",
        "fibersCount": 25000,
        "myelination": 90,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"
      }
    ]
  },
  {
    "id": "GLASSER_TGv",
    "name": "Área TGv (Polo Temporal Ventral)",
    "shortName": "Área TGv",
    "atlasId": "HCP-MMP1.0_L_TGv",
    "moduleNumber": 14,
    "moduleName": "Corteza Temporal Lateral",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.3685,
      -2.0423,
      0.5268
    ],
    "mniCoordinates": [
      -39.1,
      -2.8,
      -43.5
    ],
    "color": "#f97316",
    "baseFiringRate": 50.7,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Temporal) & ACP",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Memoria semántica abstracta de entidades animadas versus inanimadas.",
    "clinicalCorrelation": "Déficit semántico específico de categoría (pérdida de palabras para animales o plantas).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior & Fascículo Uncinado",
      "category": "Fibras de Asociación Occipitotemporal",
      "fibersCount": 25000,
      "myelination": 90,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior & Fascículo Uncinado",
        "category": "Fibras de Asociación Occipitotemporal",
        "fibersCount": 25000,
        "myelination": 90,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"
      }
    ]
  },
  {
    "id": "GLASSER_TE1a",
    "name": "Área TE1a (Temporal Inferior Anterior)",
    "shortName": "Área TE1a",
    "atlasId": "HCP-MMP1.0_L_TE1a",
    "moduleNumber": 14,
    "moduleName": "Corteza Temporal Lateral",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -2.1315,
      -1.2828,
      0.2258
    ],
    "mniCoordinates": [
      -60.9,
      -11.4,
      -21.8
    ],
    "color": "#f97316",
    "baseFiringRate": 55.0,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Temporal) & ACP",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Almacén de significados léxicos para objetos manufacturados y herramientas de mano.",
    "clinicalCorrelation": "Anomia semántica severa con circunloquios (se describe el uso pero no halla el nombre).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior & Fascículo Uncinado",
      "category": "Fibras de Asociación Occipitotemporal",
      "fibersCount": 25000,
      "myelination": 90,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior & Fascículo Uncinado",
        "category": "Fibras de Asociación Occipitotemporal",
        "fibersCount": 25000,
        "myelination": 90,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"
      }
    ]
  },
  {
    "id": "GLASSER_TE1m",
    "name": "Área TE1m (Temporal Media Media)",
    "shortName": "Área TE1m",
    "atlasId": "HCP-MMP1.0_L_TE1m",
    "moduleNumber": 14,
    "moduleName": "Corteza Temporal Lateral",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -2.1805,
      -1.1358,
      -0.3938
    ],
    "mniCoordinates": [
      -62.3,
      -29.1,
      -17.6
    ],
    "color": "#f97316",
    "baseFiringRate": 55.0,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Temporal) & ACP",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Extracción de propiedades funcionales y táctiles de conceptos léxicos.",
    "clinicalCorrelation": "Confusión semántica con sustitución de conceptos similares (p. ej. perro por caballo).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior & Fascículo Uncinado",
      "category": "Fibras de Asociación Occipitotemporal",
      "fibersCount": 25000,
      "myelination": 90,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior & Fascículo Uncinado",
        "category": "Fibras de Asociación Occipitotemporal",
        "fibersCount": 25000,
        "myelination": 90,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"
      }
    ]
  },
  {
    "id": "GLASSER_TE1p",
    "name": "Área TE1p (Temporal Inferior Posterior)",
    "shortName": "Área TE1p",
    "atlasId": "HCP-MMP1.0_L_TE1p",
    "moduleNumber": 14,
    "moduleName": "Corteza Temporal Lateral",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -2.1385,
      -0.9433,
      -0.9607
    ],
    "mniCoordinates": [
      -61.1,
      -45.3,
      -12.1
    ],
    "color": "#f97316",
    "baseFiringRate": 55.0,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Temporal) & ACP",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Interfaz entre la forma visual del objeto y su etiqueta léxica de salida.",
    "clinicalCorrelation": "Dificultad de denominación por confrontación visual con acceso intacto por tacto.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior & Fascículo Uncinado",
      "category": "Fibras de Asociación Occipitotemporal",
      "fibersCount": 25000,
      "myelination": 90,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior & Fascículo Uncinado",
        "category": "Fibras de Asociación Occipitotemporal",
        "fibersCount": 25000,
        "myelination": 90,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"
      }
    ]
  },
  {
    "id": "GLASSER_TE2a",
    "name": "Área TE2a (Giro Temporal Medio Ventral Anterior)",
    "shortName": "Área TE2a",
    "atlasId": "HCP-MMP1.0_L_TE2a",
    "moduleNumber": 14,
    "moduleName": "Corteza Temporal Lateral",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.897,
      -1.6013,
      -0.2047
    ],
    "mniCoordinates": [
      -54.2,
      -23.7,
      -30.9
    ],
    "color": "#f97316",
    "baseFiringRate": 55.0,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Temporal) & ACP",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Procesamiento de adjetivos abstractos y relaciones conceptuales categóricas.",
    "clinicalCorrelation": "Incapacidad para interpretar proverbios o metáforas conceptuales complejas.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior & Fascículo Uncinado",
      "category": "Fibras de Asociación Occipitotemporal",
      "fibersCount": 25000,
      "myelination": 90,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior & Fascículo Uncinado",
        "category": "Fibras de Asociación Occipitotemporal",
        "fibersCount": 25000,
        "myelination": 90,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"
      }
    ]
  },
  {
    "id": "GLASSER_TE2p",
    "name": "Área TE2p (Giro Temporal Medio Ventral Posterior)",
    "shortName": "Área TE2p",
    "atlasId": "HCP-MMP1.0_L_TE2p",
    "moduleNumber": 14,
    "moduleName": "Corteza Temporal Lateral",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.638,
      -1.3353,
      -0.8242
    ],
    "mniCoordinates": [
      -46.8,
      -41.4,
      -23.3
    ],
    "color": "#f97316",
    "baseFiringRate": 55.0,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Temporal) & ACP",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Almacén semántico para verbos de acción y eventos narrativos dinámicos.",
    "clinicalCorrelation": "Dificultad específica para evocar verbos en comparación con sustantivos comunes.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior & Fascículo Uncinado",
      "category": "Fibras de Asociación Occipitotemporal",
      "fibersCount": 25000,
      "myelination": 90,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior & Fascículo Uncinado",
        "category": "Fibras de Asociación Occipitotemporal",
        "fibersCount": 25000,
        "myelination": 90,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"
      }
    ]
  },
  {
    "id": "GLASSER_PHT",
    "name": "Área PHT (Parieto-Hemi-Temporal)",
    "shortName": "Área PHT",
    "atlasId": "HCP-MMP1.0_L_PHT",
    "moduleNumber": 14,
    "moduleName": "Corteza Temporal Lateral",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -2.0405,
      -0.5548,
      -1.4018
    ],
    "mniCoordinates": [
      -58.3,
      -57.9,
      -1.0
    ],
    "color": "#f97316",
    "baseFiringRate": 50.7,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Temporal) & ACP",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Transición de la vía visual ventral a la corteza angular semántica.",
    "clinicalCorrelation": "Déficit en lectura comprensiva de textos técnicos o científicos abstractos.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior & Fascículo Uncinado",
      "category": "Fibras de Asociación Occipitotemporal",
      "fibersCount": 25000,
      "myelination": 90,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior & Fascículo Uncinado",
        "category": "Fibras de Asociación Occipitotemporal",
        "fibersCount": 25000,
        "myelination": 90,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"
      }
    ]
  },
  {
    "id": "GLASSER_PH",
    "name": "Área PH (Temporal Posterior Profunda)",
    "shortName": "Área PH",
    "atlasId": "HCP-MMP1.0_L_PH",
    "moduleNumber": 14,
    "moduleName": "Corteza Temporal Lateral",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Temporal",
    "type": "cortical",
    "position": [
      -1.6065,
      -0.8803,
      -1.5348
    ],
    "mniCoordinates": [
      -45.9,
      -61.7,
      -10.3
    ],
    "color": "#f97316",
    "baseFiringRate": 46.4,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Temporal) & ACP",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Vínculo de memoria entre reconocimiento de objetos e hitos topográficos.",
    "clinicalCorrelation": "Dificultad para localizar objetos dentro de una vitrina o estantería compleja.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ILF",
      "name": "Fascículo Longitudinal Inferior & Fascículo Uncinado",
      "category": "Fibras de Asociación Occipitotemporal",
      "fibersCount": 25000,
      "myelination": 90,
      "conductionVelocity": 58,
      "clinicalDisconnectionSummary": "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ILF",
        "name": "Fascículo Longitudinal Inferior & Fascículo Uncinado",
        "category": "Fibras de Asociación Occipitotemporal",
        "fibersCount": 25000,
        "myelination": 90,
        "conductionVelocity": 58,
        "clinicalDisconnectionSummary": "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"
      }
    ]
  },
  {
    "id": "GLASSER_TPOJ1",
    "name": "Área TPOJ1 (Unión Temporo-Parieto-Occipital 1)",
    "shortName": "Área TPOJ1",
    "atlasId": "HCP-MMP1.0_L_TPOJ1",
    "moduleNumber": 15,
    "moduleName": "Unión Temporo-Parieto-Occipital",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.869,
      -0.2677,
      -1.0028
    ],
    "mniCoordinates": [
      -53.4,
      -46.5,
      7.2
    ],
    "color": "#38bdf8",
    "baseFiringRate": 39.0,
    "bloodSupply": "Arteria Cerebral Media (ACM - Rama Angular / M4)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Integración multisensorial acústica-óptica para identificación de hablantes.",
    "clinicalCorrelation": "Confusión en asignación de voces a personajes en pantalla o diálogos simultáneos.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado (Vía Perisilviana Posterior)",
      "category": "Fascículo Principal del Lenguaje",
      "fibersCount": 35000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Afasia de Conducción, alexia con agrafia y Síndrome de Gerstmann"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado (Vía Perisilviana Posterior)",
        "category": "Fascículo Principal del Lenguaje",
        "fibersCount": 35000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Afasia de Conducción, alexia con agrafia y Síndrome de Gerstmann"
      }
    ]
  },
  {
    "id": "GLASSER_TPOJ2",
    "name": "Área TPOJ2 (Unión TPO 2 - Lectura Fonológica)",
    "shortName": "Área TPOJ2",
    "atlasId": "HCP-MMP1.0_L_TPOJ2",
    "moduleNumber": 15,
    "moduleName": "Unión Temporo-Parieto-Occipital",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.7115,
      -0.1453,
      -1.5278
    ],
    "mniCoordinates": [
      -48.9,
      -61.5,
      10.7
    ],
    "color": "#38bdf8",
    "baseFiringRate": 39.0,
    "bloodSupply": "Arteria Cerebral Media (ACM - Rama Angular / M4)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Conversión grafema-fonema en lectura en voz alta de palabras nuevas o pseudopalabras.",
    "clinicalCorrelation": "Alexia fonológica (lectura de palabras familiares intacta pero fallo en pseudopalabras).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado (Vía Perisilviana Posterior)",
      "category": "Fascículo Principal del Lenguaje",
      "fibersCount": 35000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Afasia de Conducción, alexia con agrafia y Síndrome de Gerstmann"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado (Vía Perisilviana Posterior)",
        "category": "Fascículo Principal del Lenguaje",
        "fibersCount": 35000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Afasia de Conducción, alexia con agrafia y Síndrome de Gerstmann"
      }
    ]
  },
  {
    "id": "GLASSER_TPOJ3",
    "name": "Área TPOJ3 (Unión TPO 3 - Comprensión Gramatical Compleja)",
    "shortName": "Área TPOJ3",
    "atlasId": "HCP-MMP1.0_L_TPOJ3",
    "moduleNumber": 15,
    "moduleName": "Unión Temporo-Parieto-Occipital",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.5365,
      -0.0088,
      -1.8148
    ],
    "mniCoordinates": [
      -43.9,
      -69.7,
      14.6
    ],
    "color": "#38bdf8",
    "baseFiringRate": 39.0,
    "bloodSupply": "Arteria Cerebral Media (ACM - Rama Angular / M4)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Descodificación de relaciones espaciales gramaticales complejas ('el padre del hijo').",
    "clinicalCorrelation": "Afasia semántica estructural con incomprensión de cláusulas sintácticas invertidas.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado (Vía Perisilviana Posterior)",
      "category": "Fascículo Principal del Lenguaje",
      "fibersCount": 35000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Afasia de Conducción, alexia con agrafia y Síndrome de Gerstmann"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado (Vía Perisilviana Posterior)",
        "category": "Fascículo Principal del Lenguaje",
        "fibersCount": 35000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Afasia de Conducción, alexia con agrafia y Síndrome de Gerstmann"
      }
    ]
  },
  {
    "id": "GLASSER_STV",
    "name": "Área STV (Área Visual y del Lenguaje Temporal Superior)",
    "shortName": "Área STV",
    "atlasId": "HCP-MMP1.0_L_STV",
    "moduleNumber": 15,
    "moduleName": "Unión Temporo-Parieto-Occipital",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -2.1315,
      -0.0438,
      -1.0553
    ],
    "mniCoordinates": [
      -60.9,
      -48.0,
      13.6
    ],
    "color": "#38bdf8",
    "baseFiringRate": 52.4,
    "bloodSupply": "Arteria Cerebral Media (ACM - Rama Angular / M4)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Integración de velocidad de lectura con comprensión semántica fluida.",
    "clinicalCorrelation": "Lectura lenta, laboriosa, letra por letra con fatiga mental rápida.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado (Vía Perisilviana Posterior)",
      "category": "Fascículo Principal del Lenguaje",
      "fibersCount": 35000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Afasia de Conducción, alexia con agrafia y Síndrome de Gerstmann"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado (Vía Perisilviana Posterior)",
        "category": "Fascículo Principal del Lenguaje",
        "fibersCount": 35000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Afasia de Conducción, alexia con agrafia y Síndrome de Gerstmann"
      }
    ]
  },
  {
    "id": "GLASSER_PSL",
    "name": "Área PSL (Área Perisilviana del Lenguaje / Wernicke Posterior)",
    "shortName": "Área PSL",
    "atlasId": "HCP-MMP1.0_L_PSL",
    "moduleNumber": 15,
    "moduleName": "Unión Temporo-Parieto-Occipital",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -2.0195,
      0.2328,
      -0.9642
    ],
    "mniCoordinates": [
      -57.7,
      -45.4,
      21.5
    ],
    "color": "#38bdf8",
    "baseFiringRate": 52.4,
    "bloodSupply": "Arteria Cerebral Media (ACM - Rama Angular / M4)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Nodo cardinal receptor del lenguaje hablado y decodificación léxica fonológica.",
    "clinicalCorrelation": "Afasia de Wernicke clásica con lenguaje fluido incomprensible (ensalada de palabras) y anosognosia.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado (Vía Perisilviana Posterior)",
      "category": "Fascículo Principal del Lenguaje",
      "fibersCount": 35000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Afasia de Conducción, alexia con agrafia y Síndrome de Gerstmann"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado (Vía Perisilviana Posterior)",
        "category": "Fascículo Principal del Lenguaje",
        "fibersCount": 35000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Afasia de Conducción, alexia con agrafia y Síndrome de Gerstmann"
      }
    ]
  },
  {
    "id": "GLASSER_PCV",
    "name": "Área PCV (Precúneo Visual Transicional)",
    "shortName": "Área PCV",
    "atlasId": "HCP-MMP1.0_L_PCV",
    "moduleNumber": 15,
    "moduleName": "Unión Temporo-Parieto-Occipital",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -0.2205,
      1.1428,
      -1.1603
    ],
    "mniCoordinates": [
      -6.3,
      -51.0,
      47.5
    ],
    "color": "#38bdf8",
    "baseFiringRate": 52.4,
    "bloodSupply": "Arteria Cerebral Media (ACM - Rama Angular / M4)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Coordinación entre la memoria visoespacial del texto y la velocidad sacádica ocular.",
    "clinicalCorrelation": "Salto involuntario de líneas al leer textos justificados densos.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado (Vía Perisilviana Posterior)",
      "category": "Fascículo Principal del Lenguaje",
      "fibersCount": 35000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Afasia de Conducción, alexia con agrafia y Síndrome de Gerstmann"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado (Vía Perisilviana Posterior)",
        "category": "Fascículo Principal del Lenguaje",
        "fibersCount": 35000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Afasia de Conducción, alexia con agrafia y Síndrome de Gerstmann"
      }
    ]
  },
  {
    "id": "GLASSER_7Pm",
    "name": "Área 7Pm (Precúneo Medial Posterior)",
    "shortName": "Área 7Pm",
    "atlasId": "HCP-MMP1.0_L_7Pm",
    "moduleNumber": 16,
    "moduleName": "Corteza Parietal Superior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -0.2135,
      1.1743,
      -1.6468
    ],
    "mniCoordinates": [
      -6.1,
      -64.9,
      48.4
    ],
    "color": "#84cc16",
    "baseFiringRate": 54.1,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4) y ACA (Ramas Precuneales)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Representación espacial egocéntrica en primera persona y simulación mental de rutas.",
    "clinicalCorrelation": "Pérdida de la perspectiva en primera persona en recuerdos y desorientación visoespacial.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
      "category": "Fascículo de Asociación Espacial",
      "fibersCount": 26000,
      "myelination": 91,
      "conductionVelocity": 63,
      "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
        "category": "Fascículo de Asociación Espacial",
        "fibersCount": 26000,
        "myelination": 91,
        "conductionVelocity": 63,
        "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
      }
    ]
  },
  {
    "id": "GLASSER_7AL",
    "name": "Área 7AL (Parietal Superior Anterolateral)",
    "shortName": "Área 7AL",
    "atlasId": "HCP-MMP1.0_L_7AL",
    "moduleNumber": 16,
    "moduleName": "Corteza Parietal Superior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -0.672,
      1.7203,
      -1.2232
    ],
    "mniCoordinates": [
      -19.2,
      -52.8,
      64.0
    ],
    "color": "#84cc16",
    "baseFiringRate": 54.1,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4) y ACA (Ramas Precuneales)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Cálculo de postura de la extremidad superior respecto al tronco en reposo y acción.",
    "clinicalCorrelation": "Ataxia óptica del miembro superior izquierdo/derecho con fallo grosero de puntería.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
      "category": "Fascículo de Asociación Espacial",
      "fibersCount": 26000,
      "myelination": 91,
      "conductionVelocity": 63,
      "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
        "category": "Fascículo de Asociación Espacial",
        "fibersCount": 26000,
        "myelination": 91,
        "conductionVelocity": 63,
        "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
      }
    ]
  },
  {
    "id": "GLASSER_7Am",
    "name": "Área 7Am (Parietal Superior Anteromedial)",
    "shortName": "Área 7Am",
    "atlasId": "HCP-MMP1.0_L_7Am",
    "moduleNumber": 16,
    "moduleName": "Corteza Parietal Superior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -0.2905,
      1.5593,
      -1.4018
    ],
    "mniCoordinates": [
      -8.3,
      -57.9,
      59.4
    ],
    "color": "#84cc16",
    "baseFiringRate": 54.1,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4) y ACA (Ramas Precuneales)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Coordinación visotáctil de ambas manos trabajando conjuntamente en espacio medio.",
    "clinicalCorrelation": "Apraxia bimanual constructiva (incapacidad para abotonarse la camisa o manipular cubiertos).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
      "category": "Fascículo de Asociación Espacial",
      "fibersCount": 26000,
      "myelination": 91,
      "conductionVelocity": 63,
      "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
        "category": "Fascículo de Asociación Espacial",
        "fibersCount": 26000,
        "myelination": 91,
        "conductionVelocity": 63,
        "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
      }
    ]
  },
  {
    "id": "GLASSER_7PL",
    "name": "Área 7PL (Parietal Superior Posterolateral)",
    "shortName": "Área 7PL",
    "atlasId": "HCP-MMP1.0_L_7PL",
    "moduleNumber": 16,
    "moduleName": "Corteza Parietal Superior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -0.455,
      1.2757,
      -1.9198
    ],
    "mniCoordinates": [
      -13.0,
      -72.7,
      51.3
    ],
    "color": "#84cc16",
    "baseFiringRate": 54.1,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4) y ACA (Ramas Precuneales)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Filtro atencional espacial para ignorar distractores visuales en búsqueda activa.",
    "clinicalCorrelation": "Hiperdistraibilidad espacial e incapacidad para localizar una figura oculta.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
      "category": "Fascículo de Asociación Espacial",
      "fibersCount": 26000,
      "myelination": 91,
      "conductionVelocity": 63,
      "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
        "category": "Fascículo de Asociación Espacial",
        "fibersCount": 26000,
        "myelination": 91,
        "conductionVelocity": 63,
        "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
      }
    ]
  },
  {
    "id": "GLASSER_7PC",
    "name": "Área 7PC (Parietal Superior Caudal)",
    "shortName": "Área 7PC",
    "atlasId": "HCP-MMP1.0_L_7PC",
    "moduleNumber": 16,
    "moduleName": "Corteza Parietal Superior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.218,
      1.5348,
      -1.0868
    ],
    "mniCoordinates": [
      -34.8,
      -48.9,
      58.7
    ],
    "color": "#84cc16",
    "baseFiringRate": 54.1,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4) y ACA (Ramas Precuneales)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Transformación de coordenadas retinianas en coordenadas motoras para prensión.",
    "clinicalCorrelation": "Apertura digital manual discordante con el tamaño del objeto que se desea agarrar.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
      "category": "Fascículo de Asociación Espacial",
      "fibersCount": 26000,
      "myelination": 91,
      "conductionVelocity": 63,
      "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
        "category": "Fascículo de Asociación Espacial",
        "fibersCount": 26000,
        "myelination": 91,
        "conductionVelocity": 63,
        "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
      }
    ]
  },
  {
    "id": "GLASSER_LIPv",
    "name": "Área LIPv (Área Intraparietal Lateral Ventral)",
    "shortName": "Área LIPv",
    "atlasId": "HCP-MMP1.0_L_LIPv",
    "moduleNumber": 16,
    "moduleName": "Corteza Parietal Superior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.0045,
      1.2968,
      -1.3703
    ],
    "mniCoordinates": [
      -28.7,
      -57.0,
      51.9
    ],
    "color": "#84cc16",
    "baseFiringRate": 36.4,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4) y ACA (Ramas Precuneales)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Priorización atencional para programación de movimientos sacádicos visuales.",
    "clinicalCorrelation": "Hipometría de las sacadas oculares hacia el campo contralateral con retraso atencional.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
      "category": "Fascículo de Asociación Espacial",
      "fibersCount": 26000,
      "myelination": 91,
      "conductionVelocity": 63,
      "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
        "category": "Fascículo de Asociación Espacial",
        "fibersCount": 26000,
        "myelination": 91,
        "conductionVelocity": 63,
        "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
      }
    ]
  },
  {
    "id": "GLASSER_LIPd",
    "name": "Área LIPd (Área Intraparietal Lateral Dorsal)",
    "shortName": "Área LIPd",
    "atlasId": "HCP-MMP1.0_L_LIPd",
    "moduleNumber": 16,
    "moduleName": "Corteza Parietal Superior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.0255,
      0.9223,
      -1.3003
    ],
    "mniCoordinates": [
      -29.3,
      -55.0,
      41.2
    ],
    "color": "#84cc16",
    "baseFiringRate": 36.4,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4) y ACA (Ramas Precuneales)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Mapeo continuo del vector de error entre posición ocular y blanco espacial.",
    "clinicalCorrelation": "Inestabilidad de fijación visual con microsacadas erráticas de búsqueda.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
      "category": "Fascículo de Asociación Espacial",
      "fibersCount": 26000,
      "myelination": 91,
      "conductionVelocity": 63,
      "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
        "category": "Fascículo de Asociación Espacial",
        "fibersCount": 26000,
        "myelination": 91,
        "conductionVelocity": 63,
        "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
      }
    ]
  },
  {
    "id": "GLASSER_VIP",
    "name": "Área VIP (Área Intraparietal Ventral - Espacio Peripersonal)",
    "shortName": "Área VIP",
    "atlasId": "HCP-MMP1.0_L_VIP",
    "moduleNumber": 16,
    "moduleName": "Corteza Parietal Superior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -0.7525,
      1.5557,
      -1.6293
    ],
    "mniCoordinates": [
      -21.5,
      -64.4,
      59.3
    ],
    "color": "#84cc16",
    "baseFiringRate": 54.1,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4) y ACA (Ramas Precuneales)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Definición del espacio peripersonal defensivo alrededor del rostro y cabeza.",
    "clinicalCorrelation": "Abolición de reflejos defensivos de parpadeo y retirada ante objetos que se acercan a la cara.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
      "category": "Fascículo de Asociación Espacial",
      "fibersCount": 26000,
      "myelination": 91,
      "conductionVelocity": 63,
      "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
        "category": "Fascículo de Asociación Espacial",
        "fibersCount": 26000,
        "myelination": 91,
        "conductionVelocity": 63,
        "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
      }
    ]
  },
  {
    "id": "GLASSER_MIP",
    "name": "Área MIP (Área Intraparietal Medial - Neuronas de Alcance)",
    "shortName": "Área MIP",
    "atlasId": "HCP-MMP1.0_L_MIP",
    "moduleNumber": 16,
    "moduleName": "Corteza Parietal Superior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -0.777,
      0.9748,
      -1.6398
    ],
    "mniCoordinates": [
      -22.2,
      -64.7,
      42.7
    ],
    "color": "#84cc16",
    "baseFiringRate": 54.1,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4) y ACA (Ramas Precuneales)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Planificación cinemática del vector de extensión del brazo hacia un objetivo.",
    "clinicalCorrelation": "Dismetría en el alcance de objetos con correcciones múltiples en el trayecto de la mano.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
      "category": "Fascículo de Asociación Espacial",
      "fibersCount": 26000,
      "myelination": 91,
      "conductionVelocity": 63,
      "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
        "category": "Fascículo de Asociación Espacial",
        "fibersCount": 26000,
        "myelination": 91,
        "conductionVelocity": 63,
        "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
      }
    ]
  },
  {
    "id": "GLASSER_AIP",
    "name": "Área AIP (Área Intraparietal Anterior - Neuronas de Agarre / Grasp)",
    "shortName": "Área AIP",
    "atlasId": "HCP-MMP1.0_L_AIP",
    "moduleNumber": 16,
    "moduleName": "Corteza Parietal Superior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.2635,
      0.9013,
      -0.8277
    ],
    "mniCoordinates": [
      -36.1,
      -41.5,
      40.6
    ],
    "color": "#84cc16",
    "baseFiringRate": 54.1,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4) y ACA (Ramas Precuneales)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Codificación de la forma del objeto para adaptar la postura de pinza manual.",
    "clinicalCorrelation": "Incapacidad para configurar la pinza índice-pulgar adecuada antes de tocar el objeto.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
      "category": "Fascículo de Asociación Espacial",
      "fibersCount": 26000,
      "myelination": 91,
      "conductionVelocity": 63,
      "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)",
        "category": "Fascículo de Asociación Espacial",
        "fibersCount": 26000,
        "myelination": 91,
        "conductionVelocity": 63,
        "clinicalDisconnectionSummary": "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"
      }
    ]
  },
  {
    "id": "GLASSER_PGp",
    "name": "Área PGp (Giro Angular Posterior)",
    "shortName": "Área PGp",
    "atlasId": "HCP-MMP1.0_L_PGp",
    "moduleNumber": 17,
    "moduleName": "Corteza Parietal Inferior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.4385,
      0.2258,
      -2.2138
    ],
    "mniCoordinates": [
      -41.1,
      -81.1,
      21.3
    ],
    "color": "#22c55e",
    "baseFiringRate": 55.8,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Ramas Parietales Posteriores)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Cálculo matemático abstracto y resolución de operaciones aritméticas simbólicas.",
    "clinicalCorrelation": "Acalculia pura (pérdida de la capacidad de operar con números) en el Síndrome de Gerstmann.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
      "category": "Fascículo de Asociación Superior",
      "fibersCount": 31000,
      "myelination": 93,
      "conductionVelocity": 67,
      "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
        "category": "Fascículo de Asociación Superior",
        "fibersCount": 31000,
        "myelination": 93,
        "conductionVelocity": 67,
        "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
      }
    ]
  },
  {
    "id": "GLASSER_PGs",
    "name": "Área PGs (Giro Angular Superior)",
    "shortName": "Área PGs",
    "atlasId": "HCP-MMP1.0_L_PGs",
    "moduleNumber": 17,
    "moduleName": "Corteza Parietal Inferior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.449,
      0.6948,
      -1.9093
    ],
    "mniCoordinates": [
      -41.4,
      -72.4,
      34.7
    ],
    "color": "#22c55e",
    "baseFiringRate": 55.8,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Ramas Parietales Posteriores)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Discriminación derecha-izquierda y orientación espacial sobre el propio cuerpo.",
    "clinicalCorrelation": "Desorientación derecha-izquierda (el paciente confunde su mano derecha con la izquierda).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
      "category": "Fascículo de Asociación Superior",
      "fibersCount": 31000,
      "myelination": 93,
      "conductionVelocity": 67,
      "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
        "category": "Fascículo de Asociación Superior",
        "fibersCount": 31000,
        "myelination": 93,
        "conductionVelocity": 67,
        "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
      }
    ]
  },
  {
    "id": "GLASSER_PGi",
    "name": "Área PGi (Giro Angular Inferior - Semántica Léxica)",
    "shortName": "Área PGi",
    "atlasId": "HCP-MMP1.0_L_PGi",
    "moduleNumber": 17,
    "moduleName": "Corteza Parietal Inferior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.54,
      0.2328,
      -1.4613
    ],
    "mniCoordinates": [
      -44.0,
      -59.6,
      21.5
    ],
    "color": "#22c55e",
    "baseFiringRate": 55.8,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Ramas Parietales Posteriores)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Acceso a la ortografía de palabras durante escritura espontánea y dictado.",
    "clinicalCorrelation": "Agrafia pura o alexia angular (incapacidad para escribir oraciones coherentes).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
      "category": "Fascículo de Asociación Superior",
      "fibersCount": 31000,
      "myelination": 93,
      "conductionVelocity": 67,
      "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
        "category": "Fascículo de Asociación Superior",
        "fibersCount": 31000,
        "myelination": 93,
        "conductionVelocity": 67,
        "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
      }
    ]
  },
  {
    "id": "GLASSER_PFm",
    "name": "Área PFm (Giro Supramarginal Medial)",
    "shortName": "Área PFm",
    "atlasId": "HCP-MMP1.0_L_PFm",
    "moduleNumber": 17,
    "moduleName": "Corteza Parietal Inferior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.722,
      0.8488,
      -1.3668
    ],
    "mniCoordinates": [
      -49.2,
      -56.9,
      39.1
    ],
    "color": "#22c55e",
    "baseFiringRate": 55.8,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Ramas Parietales Posteriores)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Atención selectiva sostenida en el espacio extrapersonal hemisférico.",
    "clinicalCorrelation": "Negligencia espacial unilateral hemiespacial grave con omisión del lado izquierdo/derecho.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
      "category": "Fascículo de Asociación Superior",
      "fibersCount": 31000,
      "myelination": 93,
      "conductionVelocity": 67,
      "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
        "category": "Fascículo de Asociación Superior",
        "fibersCount": 31000,
        "myelination": 93,
        "conductionVelocity": 67,
        "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
      }
    ]
  },
  {
    "id": "GLASSER_PF",
    "name": "Área PF (Giro Supramarginal Propiamente Dicho)",
    "shortName": "Área PF",
    "atlasId": "HCP-MMP1.0_L_PF",
    "moduleNumber": 17,
    "moduleName": "Corteza Parietal Inferior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -2.002,
      0.7298,
      -0.7578
    ],
    "mniCoordinates": [
      -57.2,
      -39.5,
      35.7
    ],
    "color": "#22c55e",
    "baseFiringRate": 51.5,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Ramas Parietales Posteriores)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Mapeo somatosensorial de los dedos de la mano para reconocimiento individual.",
    "clinicalCorrelation": "Agnosia digital (incapacidad para nombrar, señalar o reconocer los propios dedos examinados).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
      "category": "Fascículo de Asociación Superior",
      "fibersCount": 31000,
      "myelination": 93,
      "conductionVelocity": 67,
      "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
        "category": "Fascículo de Asociación Superior",
        "fibersCount": 31000,
        "myelination": 93,
        "conductionVelocity": 67,
        "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
      }
    ]
  },
  {
    "id": "GLASSER_PFt",
    "name": "Área PFt (Giro Supramarginal Transicional)",
    "shortName": "Área PFt",
    "atlasId": "HCP-MMP1.0_L_PFt",
    "moduleNumber": 17,
    "moduleName": "Corteza Parietal Inferior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.757,
      0.7578,
      -0.3867
    ],
    "mniCoordinates": [
      -50.2,
      -28.9,
      36.5
    ],
    "color": "#22c55e",
    "baseFiringRate": 55.8,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Ramas Parietales Posteriores)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Representación abstracta del uso de herramientas comunes (tijeras, martillo, llave).",
    "clinicalCorrelation": "Apraxia ideomotora (se sabe qué hace la herramienta pero no se puede imitar su uso).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
      "category": "Fascículo de Asociación Superior",
      "fibersCount": 31000,
      "myelination": 93,
      "conductionVelocity": 67,
      "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
        "category": "Fascículo de Asociación Superior",
        "fibersCount": 31000,
        "myelination": 93,
        "conductionVelocity": 67,
        "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
      }
    ]
  },
  {
    "id": "GLASSER_PFop",
    "name": "Área PFop (Giro Supramarginal Opercular)",
    "shortName": "Área PFop",
    "atlasId": "HCP-MMP1.0_L_PFop",
    "moduleNumber": 17,
    "moduleName": "Corteza Parietal Inferior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -2.1455,
      0.3833,
      -0.1942
    ],
    "mniCoordinates": [
      -61.3,
      -23.4,
      25.8
    ],
    "color": "#22c55e",
    "baseFiringRate": 38.1,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Ramas Parietales Posteriores)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Planificación secuencial de gestos transitivos e intransitivos a la orden verbal.",
    "clinicalCorrelation": "Incapacidad para hacer gestos simbólicos a la orden (p. ej. saludo militar o decir adiós).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
      "category": "Fascículo de Asociación Superior",
      "fibersCount": 31000,
      "myelination": 93,
      "conductionVelocity": 67,
      "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
        "category": "Fascículo de Asociación Superior",
        "fibersCount": 31000,
        "myelination": 93,
        "conductionVelocity": 67,
        "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
      }
    ]
  },
  {
    "id": "GLASSER_IP0",
    "name": "Área IP0 (Surco Intraparietal Cero)",
    "shortName": "Área IP0",
    "atlasId": "HCP-MMP1.0_L_IP0",
    "moduleNumber": 17,
    "moduleName": "Corteza Parietal Inferior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.0675,
      0.3308,
      -2.0423
    ],
    "mniCoordinates": [
      -30.5,
      -76.2,
      24.3
    ],
    "color": "#22c55e",
    "baseFiringRate": 55.8,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Ramas Parietales Posteriores)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Transformación temprana de señales visuales occipitales hacia coordenadas de acción.",
    "clinicalCorrelation": "Retraso en la respuesta motora ante cambios repentinos de posición del blanco visual.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
      "category": "Fascículo de Asociación Superior",
      "fibersCount": 31000,
      "myelination": 93,
      "conductionVelocity": 67,
      "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
        "category": "Fascículo de Asociación Superior",
        "fibersCount": 31000,
        "myelination": 93,
        "conductionVelocity": 67,
        "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
      }
    ]
  },
  {
    "id": "GLASSER_IP1",
    "name": "Área IP1 (Surco Intraparietal 1)",
    "shortName": "Área IP1",
    "atlasId": "HCP-MMP1.0_L_IP1",
    "moduleNumber": 17,
    "moduleName": "Corteza Parietal Inferior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.05,
      0.8838,
      -1.7098
    ],
    "mniCoordinates": [
      -30.0,
      -66.7,
      40.1
    ],
    "color": "#22c55e",
    "baseFiringRate": 55.8,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Ramas Parietales Posteriores)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Estimación numérica no verbal y comparación intuitiva de magnitudes de conjuntos.",
    "clinicalCorrelation": "Discalculia de magnitudes (incapacidad para juzgar cuál grupo de objetos es más numeroso).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
      "category": "Fascículo de Asociación Superior",
      "fibersCount": 31000,
      "myelination": 93,
      "conductionVelocity": 67,
      "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
        "category": "Fascículo de Asociación Superior",
        "fibersCount": 31000,
        "myelination": 93,
        "conductionVelocity": 67,
        "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
      }
    ]
  },
  {
    "id": "GLASSER_IP2",
    "name": "Área IP2 (Surco Intraparietal 2)",
    "shortName": "Área IP2",
    "atlasId": "HCP-MMP1.0_L_IP2",
    "moduleNumber": 17,
    "moduleName": "Corteza Parietal Inferior",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Parietal",
    "type": "cortical",
    "position": [
      -1.3755,
      0.8488,
      -1.1567
    ],
    "mniCoordinates": [
      -39.3,
      -50.9,
      39.1
    ],
    "color": "#22c55e",
    "baseFiringRate": 55.8,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Ramas Parietales Posteriores)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Fusión de información espacial con la red de control ejecutivo frontoparietal.",
    "clinicalCorrelation": "Dificultad en resolución de rompecabezas tridimensionales o ensamblaje de bloques.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
      "category": "Fascículo de Asociación Superior",
      "fibersCount": 31000,
      "myelination": 93,
      "conductionVelocity": 67,
      "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II/III) & Arqueado",
        "category": "Fascículo de Asociación Superior",
        "fibersCount": 31000,
        "myelination": 93,
        "conductionVelocity": 67,
        "clinicalDisconnectionSummary": "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"
      }
    ]
  },
  {
    "id": "GLASSER_DVT",
    "name": "Área DVT (Área Transicional Visual Dorsal)",
    "shortName": "Área DVT",
    "atlasId": "HCP-MMP1.0_L_DVT",
    "moduleNumber": 18,
    "moduleName": "Corteza Cingular Posterior",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Límbico",
    "type": "cortical",
    "position": [
      -0.623,
      0.4848,
      -1.8812
    ],
    "mniCoordinates": [
      -17.8,
      -71.6,
      28.7
    ],
    "color": "#eab308",
    "baseFiringRate": 57.5,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A3 pericallosa) & ACP (Ramas Espleniales)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Interfaz entre corteza occipital visual medial y áreas cingular-parietales.",
    "clinicalCorrelation": "Pérdida de nitidez visual en la evocación mental de recuerdos biográficos.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
      "category": "Fascículo Límbico Principal",
      "fibersCount": 27000,
      "myelination": 94,
      "conductionVelocity": 65,
      "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
        "category": "Fascículo Límbico Principal",
        "fibersCount": 27000,
        "myelination": 94,
        "conductionVelocity": 65,
        "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
      }
    ]
  },
  {
    "id": "GLASSER_ProS",
    "name": "Área ProS (Corteza Prostata / Istmo Cingular)",
    "shortName": "Área ProS",
    "atlasId": "HCP-MMP1.0_L_ProS",
    "moduleNumber": 18,
    "moduleName": "Corteza Cingular Posterior",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Límbico",
    "type": "cortical",
    "position": [
      -0.714,
      -0.4567,
      -1.3493
    ],
    "mniCoordinates": [
      -20.4,
      -56.4,
      1.8
    ],
    "color": "#eab308",
    "baseFiringRate": 39.8,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A3 pericallosa) & ACP (Ramas Espleniales)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Tránsito de información mnésica hipocámpica hacia el esplenio del cuerpo calloso.",
    "clinicalCorrelation": "Amnesia retrógrada autobiográfica con conservación de memoria semántica genérica.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
      "category": "Fascículo Límbico Principal",
      "fibersCount": 27000,
      "myelination": 94,
      "conductionVelocity": 65,
      "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
        "category": "Fascículo Límbico Principal",
        "fibersCount": 27000,
        "myelination": 94,
        "conductionVelocity": 65,
        "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
      }
    ]
  },
  {
    "id": "GLASSER_POS1",
    "name": "Área POS1 (Surco Parietooccipital 1)",
    "shortName": "Área POS1",
    "atlasId": "HCP-MMP1.0_L_POS1",
    "moduleNumber": 18,
    "moduleName": "Corteza Cingular Posterior",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Límbico",
    "type": "cortical",
    "position": [
      -0.392,
      -0.1103,
      -1.4753
    ],
    "mniCoordinates": [
      -11.2,
      -60.0,
      11.7
    ],
    "color": "#eab308",
    "baseFiringRate": 39.8,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A3 pericallosa) & ACP (Ramas Espleniales)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Definición del límite posterior del precúneo para visualización mental espacial.",
    "clinicalCorrelation": "Incapacidad para rotar mentalmente una imagen de un objeto en el espacio tridimensional.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
      "category": "Fascículo Límbico Principal",
      "fibersCount": 27000,
      "myelination": 94,
      "conductionVelocity": 65,
      "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
        "category": "Fascículo Límbico Principal",
        "fibersCount": 27000,
        "myelination": 94,
        "conductionVelocity": 65,
        "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
      }
    ]
  },
  {
    "id": "GLASSER_POS2",
    "name": "Área POS2 (Surco Parietooccipital 2)",
    "shortName": "Área POS2",
    "atlasId": "HCP-MMP1.0_L_POS2",
    "moduleNumber": 18,
    "moduleName": "Corteza Cingular Posterior",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Límbico",
    "type": "cortical",
    "position": [
      -0.35,
      0.6807,
      -1.8462
    ],
    "mniCoordinates": [
      -10.0,
      -70.6,
      34.3
    ],
    "color": "#eab308",
    "baseFiringRate": 39.8,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A3 pericallosa) & ACP (Ramas Espleniales)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Filtro retinotópico de baja resolución de la periferia visual durante introspección.",
    "clinicalCorrelation": "Desatención de estímulos periféricos cuando el sujeto se encuentra absorto en pensamientos.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
      "category": "Fascículo Límbico Principal",
      "fibersCount": 27000,
      "myelination": 94,
      "conductionVelocity": 65,
      "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
        "category": "Fascículo Límbico Principal",
        "fibersCount": 27000,
        "myelination": 94,
        "conductionVelocity": 65,
        "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
      }
    ]
  },
  {
    "id": "GLASSER_RSC",
    "name": "Área RSC (Corteza Retroesplenial - BA 29/30)",
    "shortName": "Área RSC",
    "atlasId": "HCP-MMP1.0_L_RSC",
    "moduleNumber": 18,
    "moduleName": "Corteza Cingular Posterior",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Límbico",
    "type": "cortical",
    "position": [
      -0.1575,
      0.1663,
      -0.6282
    ],
    "mniCoordinates": [
      -4.5,
      -35.8,
      19.6
    ],
    "color": "#eab308",
    "baseFiringRate": 57.5,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A3 pericallosa) & ACP (Ramas Espleniales)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Transformación entre marcos de referencia espaciales egocéntricos y alocéntricos.",
    "clinicalCorrelation": "Desorientación topográfica alocéntrica pura (incapacidad de orientarse usando un mapa callejero).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
      "category": "Fascículo Límbico Principal",
      "fibersCount": 27000,
      "myelination": 94,
      "conductionVelocity": 65,
      "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
        "category": "Fascículo Límbico Principal",
        "fibersCount": 27000,
        "myelination": 94,
        "conductionVelocity": 65,
        "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
      }
    ]
  },
  {
    "id": "GLASSER_v23ab",
    "name": "Área v23ab (Cingular Posterior Ventral - Hub Cardinal de DMN)",
    "shortName": "Área v23ab",
    "atlasId": "HCP-MMP1.0_L_v23ab",
    "moduleNumber": 18,
    "moduleName": "Corteza Cingular Posterior",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Límbico",
    "type": "cortical",
    "position": [
      -0.119,
      0.1033,
      -1.3317
    ],
    "mniCoordinates": [
      -3.4,
      -55.9,
      17.8
    ],
    "color": "#eab308",
    "baseFiringRate": 44.1,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A3 pericallosa) & ACP (Ramas Espleniales)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Nodo central de la Red Neuronal por Defecto (DMN), ensoñación y autorreflexión.",
    "clinicalCorrelation": "Deterioro precoz en enfermedad de Alzheimer con desconexión masiva de la red DMN.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
      "category": "Fascículo Límbico Principal",
      "fibersCount": 27000,
      "myelination": 94,
      "conductionVelocity": 65,
      "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
        "category": "Fascículo Límbico Principal",
        "fibersCount": 27000,
        "myelination": 94,
        "conductionVelocity": 65,
        "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
      }
    ]
  },
  {
    "id": "GLASSER_d23ab",
    "name": "Área d23ab (Cingular Posterior Dorsal)",
    "shortName": "Área d23ab",
    "atlasId": "HCP-MMP1.0_L_d23ab",
    "moduleNumber": 18,
    "moduleName": "Corteza Cingular Posterior",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Límbico",
    "type": "cortical",
    "position": [
      -0.056,
      0.5617,
      -0.7752
    ],
    "mniCoordinates": [
      -1.6,
      -40.0,
      30.9
    ],
    "color": "#eab308",
    "baseFiringRate": 44.1,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A3 pericallosa) & ACP (Ramas Espleniales)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Monitoreo del balance metabólico entre atención interna focalizada y mundo exterior.",
    "clinicalCorrelation": "Intrusión persistente de pensamientos distractores internos durante pruebas de atención externa.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
      "category": "Fascículo Límbico Principal",
      "fibersCount": 27000,
      "myelination": 94,
      "conductionVelocity": 65,
      "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
        "category": "Fascículo Límbico Principal",
        "fibersCount": 27000,
        "myelination": 94,
        "conductionVelocity": 65,
        "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
      }
    ]
  },
  {
    "id": "GLASSER_31pv",
    "name": "Área 31pv (Área Cingular 31 Posteroventral)",
    "shortName": "Área 31pv",
    "atlasId": "HCP-MMP1.0_L_31pv",
    "moduleNumber": 18,
    "moduleName": "Corteza Cingular Posterior",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Límbico",
    "type": "cortical",
    "position": [
      -0.2905,
      0.6213,
      -0.9992
    ],
    "mniCoordinates": [
      -8.3,
      -46.4,
      32.6
    ],
    "color": "#eab308",
    "baseFiringRate": 39.8,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A3 pericallosa) & ACP (Ramas Espleniales)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Recuperación de detalles temporales de memorias de la infancia y eventos vitales.",
    "clinicalCorrelation": "Sensación de despersonalización temporal respecto al propio pasado autobiográfico.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
      "category": "Fascículo Límbico Principal",
      "fibersCount": 27000,
      "myelination": 94,
      "conductionVelocity": 65,
      "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
        "category": "Fascículo Límbico Principal",
        "fibersCount": 27000,
        "myelination": 94,
        "conductionVelocity": 65,
        "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
      }
    ]
  },
  {
    "id": "GLASSER_31pd",
    "name": "Área 31pd (Área Cingular 31 Posterodorsal)",
    "shortName": "Área 31pd",
    "atlasId": "HCP-MMP1.0_L_31pd",
    "moduleNumber": 18,
    "moduleName": "Corteza Cingular Posterior",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Límbico",
    "type": "cortical",
    "position": [
      -0.3675,
      0.6738,
      -1.1707
    ],
    "mniCoordinates": [
      -10.5,
      -51.3,
      34.1
    ],
    "color": "#eab308",
    "baseFiringRate": 39.8,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A3 pericallosa) & ACP (Ramas Espleniales)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Integración de juicios morales y empatía en toma de decisiones retrospectivas.",
    "clinicalCorrelation": "Apatía moral y frialdad afectiva al recordar transgresiones éticas personales.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
      "category": "Fascículo Límbico Principal",
      "fibersCount": 27000,
      "myelination": 94,
      "conductionVelocity": 65,
      "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
        "category": "Fascículo Límbico Principal",
        "fibersCount": 27000,
        "myelination": 94,
        "conductionVelocity": 65,
        "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
      }
    ]
  },
  {
    "id": "GLASSER_31a",
    "name": "Área 31a (Área Cingular 31 Anterior)",
    "shortName": "Área 31a",
    "atlasId": "HCP-MMP1.0_L_31a",
    "moduleNumber": 18,
    "moduleName": "Corteza Cingular Posterior",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Límbico",
    "type": "cortical",
    "position": [
      -0.1715,
      0.9853,
      -0.6738
    ],
    "mniCoordinates": [
      -4.9,
      -37.1,
      43.0
    ],
    "color": "#eab308",
    "baseFiringRate": 57.5,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A3 pericallosa) & ACP (Ramas Espleniales)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Transición de corteza cingular hacia corteza somatosensorial motora suplementaria.",
    "clinicalCorrelation": "Enlentecimiento en el cambio de marcha motora guiada por introspección.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
      "category": "Fascículo Límbico Principal",
      "fibersCount": 27000,
      "myelination": 94,
      "conductionVelocity": 65,
      "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
        "category": "Fascículo Límbico Principal",
        "fibersCount": 27000,
        "myelination": 94,
        "conductionVelocity": 65,
        "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
      }
    ]
  },
  {
    "id": "GLASSER_23c",
    "name": "Área 23c (Cingular Media Caudal)",
    "shortName": "Área 23c",
    "atlasId": "HCP-MMP1.0_L_23c",
    "moduleNumber": 18,
    "moduleName": "Corteza Cingular Posterior",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Límbico",
    "type": "cortical",
    "position": [
      -0.406,
      0.9748,
      -0.3517
    ],
    "mniCoordinates": [
      -11.6,
      -27.9,
      42.7
    ],
    "color": "#eab308",
    "baseFiringRate": 57.5,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A3 pericallosa) & ACP (Ramas Espleniales)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Regulación del tono simpático cutáneo ante pensamientos emotivos de alarma.",
    "clinicalCorrelation": "Abolición de respuesta galvánica cutánea emocional ante recuerdos estresantes.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
      "category": "Fascículo Límbico Principal",
      "fibersCount": 27000,
      "myelination": 94,
      "conductionVelocity": 65,
      "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
        "category": "Fascículo Límbico Principal",
        "fibersCount": 27000,
        "myelination": 94,
        "conductionVelocity": 65,
        "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
      }
    ]
  },
  {
    "id": "GLASSER_23d",
    "name": "Área 23d (Cingular Posterior Profunda)",
    "shortName": "Área 23d",
    "atlasId": "HCP-MMP1.0_L_23d",
    "moduleNumber": 18,
    "moduleName": "Corteza Cingular Posterior",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Límbico",
    "type": "cortical",
    "position": [
      -0.063,
      0.8067,
      -0.0752
    ],
    "mniCoordinates": [
      -1.8,
      -20.0,
      37.9
    ],
    "color": "#eab308",
    "baseFiringRate": 57.5,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A3 pericallosa) & ACP (Ramas Espleniales)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Conexión recíproca con núcleos talámicos mediodorsales y pulvinar.",
    "clinicalCorrelation": "Confusión espacial transitoria y amnesia lacunar post-isquémica parietal medial.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
      "category": "Fascículo Límbico Principal",
      "fibersCount": 27000,
      "myelination": 94,
      "conductionVelocity": 65,
      "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
        "category": "Fascículo Límbico Principal",
        "fibersCount": 27000,
        "myelination": 94,
        "conductionVelocity": 65,
        "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
      }
    ]
  },
  {
    "id": "GLASSER_7m",
    "name": "Área 7m (Precúneo Medial Anterior)",
    "shortName": "Área 7m",
    "atlasId": "HCP-MMP1.0_L_7m",
    "moduleNumber": 18,
    "moduleName": "Corteza Cingular Posterior",
    "system": "Límbico / Memoria",
    "hemisphere": "left",
    "lobe": "Límbico",
    "type": "cortical",
    "position": [
      -0.147,
      0.6773,
      -1.5068
    ],
    "mniCoordinates": [
      -4.2,
      -60.9,
      34.2
    ],
    "color": "#eab308",
    "baseFiringRate": 53.2,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A3 pericallosa) & ACP (Ramas Espleniales)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Construcción del self subjetivo y conciencia autoconsciente en estado de reposo.",
    "clinicalCorrelation": "Estados confusionales agudos, delirios de inexistencia del yo (Síndrome de Cotard).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
      "category": "Fascículo Límbico Principal",
      "fibersCount": 27000,
      "myelination": 94,
      "conductionVelocity": 65,
      "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Posterior & Vía Parahipocámpica",
        "category": "Fascículo Límbico Principal",
        "fibersCount": 27000,
        "myelination": 94,
        "conductionVelocity": 65,
        "clinicalDisconnectionSummary": "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"
      }
    ]
  },
  {
    "id": "GLASSER_33pr",
    "name": "Área 33pr (Área Cingular 33 Prerrolándica)",
    "shortName": "Área 33pr",
    "atlasId": "HCP-MMP1.0_L_33pr",
    "moduleNumber": 19,
    "moduleName": "Corteza Cingular Anterior y Prefrontal Medial",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.0735,
      0.4813,
      1.0133
    ],
    "mniCoordinates": [
      -2.1,
      11.1,
      28.6
    ],
    "color": "#f43f5e",
    "baseFiringRate": 41.5,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A2 pericallosa y callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Monitoreo del conflicto cognitivo y registro autonómico del dolor visceral.",
    "clinicalCorrelation": "Indiferencia ante el error propio e incapacidad para modular la conducta tras una equivocación.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
      "category": "Fibras de Asociación Frontolímbica",
      "fibersCount": 28000,
      "myelination": 92,
      "conductionVelocity": 62,
      "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
        "category": "Fibras de Asociación Frontolímbica",
        "fibersCount": 28000,
        "myelination": 92,
        "conductionVelocity": 62,
        "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
      }
    ]
  },
  {
    "id": "GLASSER_p24pr",
    "name": "Área p24pr (Cingular 24 Posterior Prerrolándica)",
    "shortName": "Área p24pr",
    "atlasId": "HCP-MMP1.0_L_p24pr",
    "moduleNumber": 19,
    "moduleName": "Corteza Cingular Anterior y Prefrontal Medial",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.0945,
      0.8488,
      0.5863
    ],
    "mniCoordinates": [
      -2.7,
      -1.1,
      39.1
    ],
    "color": "#f43f5e",
    "baseFiringRate": 45.8,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A2 pericallosa y callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Iniciación del impulso motor voluntario para la acción física con esfuerzo.",
    "clinicalCorrelation": "Abulia grave con parálisis de la voluntad para iniciar tareas físicas simples.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
      "category": "Fibras de Asociación Frontolímbica",
      "fibersCount": 28000,
      "myelination": 92,
      "conductionVelocity": 62,
      "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
        "category": "Fibras de Asociación Frontolímbica",
        "fibersCount": 28000,
        "myelination": 92,
        "conductionVelocity": 62,
        "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
      }
    ]
  },
  {
    "id": "GLASSER_a24pr",
    "name": "Área a24pr (Cingular 24 Anterior Prerrolándica)",
    "shortName": "Área a24pr",
    "atlasId": "HCP-MMP1.0_L_a24pr",
    "moduleNumber": 19,
    "moduleName": "Corteza Cingular Anterior y Prefrontal Medial",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.161,
      0.5968,
      1.2478
    ],
    "mniCoordinates": [
      -4.6,
      17.8,
      31.9
    ],
    "color": "#f43f5e",
    "baseFiringRate": 45.8,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A2 pericallosa y callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Resolución de interferencia cognitiva (detección del conflicto en prueba de Stroop).",
    "clinicalCorrelation": "Efecto Stroop multiplicado con incapacidad para inhibir la lectura automática de la palabra.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
      "category": "Fibras de Asociación Frontolímbica",
      "fibersCount": 28000,
      "myelination": 92,
      "conductionVelocity": 62,
      "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
        "category": "Fibras de Asociación Frontolímbica",
        "fibersCount": 28000,
        "myelination": 92,
        "conductionVelocity": 62,
        "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
      }
    ]
  },
  {
    "id": "GLASSER_p24",
    "name": "Área p24 (Giro Cingular Anterior Caudal)",
    "shortName": "Área p24",
    "atlasId": "HCP-MMP1.0_L_p24",
    "moduleNumber": 19,
    "moduleName": "Corteza Cingular Anterior y Prefrontal Medial",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.098,
      0.0297,
      1.8743
    ],
    "mniCoordinates": [
      -2.8,
      35.7,
      15.7
    ],
    "color": "#f43f5e",
    "baseFiringRate": 37.2,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A2 pericallosa y callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Coordinación de respuestas afectivas de alerta y defensa vocal ante amenazas.",
    "clinicalCorrelation": "Falta de respuesta vocal de socorro ante peligros inminentes.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
      "category": "Fibras de Asociación Frontolímbica",
      "fibersCount": 28000,
      "myelination": 92,
      "conductionVelocity": 62,
      "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
        "category": "Fibras de Asociación Frontolímbica",
        "fibersCount": 28000,
        "myelination": 92,
        "conductionVelocity": 62,
        "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
      }
    ]
  },
  {
    "id": "GLASSER_a24",
    "name": "Área a24 (Giro Cingular Anterior Rostral)",
    "shortName": "Área a24",
    "atlasId": "HCP-MMP1.0_L_a24",
    "moduleNumber": 19,
    "moduleName": "Corteza Cingular Anterior y Prefrontal Medial",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.1295,
      -0.5583,
      2.0248
    ],
    "mniCoordinates": [
      -3.7,
      40.0,
      -1.1
    ],
    "color": "#f43f5e",
    "baseFiringRate": 37.2,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A2 pericallosa y callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Evaluación de costos versus beneficios en la motivación de conductas a largo plazo.",
    "clinicalCorrelation": "Desinterés por metas a largo plazo con búsqueda inmediata de gratificaciones triviales.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
      "category": "Fibras de Asociación Frontolímbica",
      "fibersCount": 28000,
      "myelination": 92,
      "conductionVelocity": 62,
      "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
        "category": "Fibras de Asociación Frontolímbica",
        "fibersCount": 28000,
        "myelination": 92,
        "conductionVelocity": 62,
        "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
      }
    ]
  },
  {
    "id": "GLASSER_p32pr",
    "name": "Área p32pr (Corteza Paracingular Posterior)",
    "shortName": "Área p32pr",
    "atlasId": "HCP-MMP1.0_L_p32pr",
    "moduleNumber": 19,
    "moduleName": "Corteza Cingular Anterior y Prefrontal Medial",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.322,
      0.7963,
      1.1323
    ],
    "mniCoordinates": [
      -9.2,
      14.5,
      37.6
    ],
    "color": "#f43f5e",
    "baseFiringRate": 45.8,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A2 pericallosa y callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Procesamiento de recompensas inciertas y calibración de expectativa de éxito.",
    "clinicalCorrelation": "Toma de decisiones extremadamente arriesgada con infravaloración de probabilidades de pérdida.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
      "category": "Fibras de Asociación Frontolímbica",
      "fibersCount": 28000,
      "myelination": 92,
      "conductionVelocity": 62,
      "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
        "category": "Fibras de Asociación Frontolímbica",
        "fibersCount": 28000,
        "myelination": 92,
        "conductionVelocity": 62,
        "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
      }
    ]
  },
  {
    "id": "GLASSER_a32pr",
    "name": "Área a32pr (Corteza Paracingular Anterior)",
    "shortName": "Área a32pr",
    "atlasId": "HCP-MMP1.0_L_a32pr",
    "moduleNumber": 19,
    "moduleName": "Corteza Cingular Anterior y Prefrontal Medial",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.336,
      0.4253,
      1.6503
    ],
    "mniCoordinates": [
      -9.6,
      29.3,
      27.0
    ],
    "color": "#f43f5e",
    "baseFiringRate": 45.8,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A2 pericallosa y callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Monitoreo continuo del feedback social de aprobación o rechazo en grupos.",
    "clinicalCorrelation": "Inmunidad aparente al rechazo social con conductas desadaptadas en público.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
      "category": "Fibras de Asociación Frontolímbica",
      "fibersCount": 28000,
      "myelination": 92,
      "conductionVelocity": 62,
      "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
        "category": "Fibras de Asociación Frontolímbica",
        "fibersCount": 28000,
        "myelination": 92,
        "conductionVelocity": 62,
        "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
      }
    ]
  },
  {
    "id": "GLASSER_d32",
    "name": "Área d32 (Corteza Paracingular Dorsal)",
    "shortName": "Área d32",
    "atlasId": "HCP-MMP1.0_L_d32",
    "moduleNumber": 19,
    "moduleName": "Corteza Cingular Anterior y Prefrontal Medial",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.294,
      0.2467,
      2.0038
    ],
    "mniCoordinates": [
      -8.4,
      39.4,
      21.9
    ],
    "color": "#f43f5e",
    "baseFiringRate": 37.2,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A2 pericallosa y callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Representación abstracta del estatus jerárquico y reputación en interacciones.",
    "clinicalCorrelation": "Conductas desafiantes inapropiadas ante figuras de autoridad o pérdida del sentido jerárquico.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
      "category": "Fibras de Asociación Frontolímbica",
      "fibersCount": 28000,
      "myelination": 92,
      "conductionVelocity": 62,
      "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
        "category": "Fibras de Asociación Frontolímbica",
        "fibersCount": 28000,
        "myelination": 92,
        "conductionVelocity": 62,
        "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
      }
    ]
  },
  {
    "id": "GLASSER_p32",
    "name": "Área p32 (Corteza Cingular Pregenual)",
    "shortName": "Área p32",
    "atlasId": "HCP-MMP1.0_L_p32",
    "moduleNumber": 19,
    "moduleName": "Corteza Cingular Anterior y Prefrontal Medial",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.3535,
      -0.5653,
      2.2383
    ],
    "mniCoordinates": [
      -10.1,
      46.1,
      -1.3
    ],
    "color": "#f43f5e",
    "baseFiringRate": 37.2,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A2 pericallosa y callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Regulación del estado de ánimo basal y conexión con el eje hipotálamo-hipofisario.",
    "clinicalCorrelation": "Depresión resistente al tratamiento, anhedonia profunda y tristeza refractaria.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
      "category": "Fibras de Asociación Frontolímbica",
      "fibersCount": 28000,
      "myelination": 92,
      "conductionVelocity": 62,
      "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
        "category": "Fibras de Asociación Frontolímbica",
        "fibersCount": 28000,
        "myelination": 92,
        "conductionVelocity": 62,
        "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
      }
    ]
  },
  {
    "id": "GLASSER_s32",
    "name": "Área s32 (Corteza Subgenual / Área 25 de Mayberg)",
    "shortName": "Área s32",
    "atlasId": "HCP-MMP1.0_L_s32",
    "moduleNumber": 19,
    "moduleName": "Corteza Cingular Anterior y Prefrontal Medial",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.21,
      -0.9958,
      1.8358
    ],
    "mniCoordinates": [
      -6.0,
      34.6,
      -13.6
    ],
    "color": "#f43f5e",
    "baseFiringRate": 37.2,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A2 pericallosa y callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Epicentro de la tristeza fisiológica y modulación de la respuesta autonómica depresógena.",
    "clinicalCorrelation": "Hiperactividad patológica en depresión mayor melanchólica; diana para estimulación cerebral profunda.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
      "category": "Fibras de Asociación Frontolímbica",
      "fibersCount": 28000,
      "myelination": 92,
      "conductionVelocity": 62,
      "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
        "category": "Fibras de Asociación Frontolímbica",
        "fibersCount": 28000,
        "myelination": 92,
        "conductionVelocity": 62,
        "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
      }
    ]
  },
  {
    "id": "GLASSER_8BM",
    "name": "Área 8BM (Frontal Medial Superior / SMA Previa)",
    "shortName": "Área 8BM",
    "atlasId": "HCP-MMP1.0_L_8BM",
    "moduleNumber": 19,
    "moduleName": "Corteza Cingular Anterior y Prefrontal Medial",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.161,
      0.9713,
      1.6888
    ],
    "mniCoordinates": [
      -4.6,
      30.4,
      42.6
    ],
    "color": "#f43f5e",
    "baseFiringRate": 37.2,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A2 pericallosa y callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Control cognitivo voluntario de selección de respuestas complejas no familiares.",
    "clinicalCorrelation": "Perseveración motora y verbal con incapacidad para cambiar de criterio (falla de shifting).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
      "category": "Fibras de Asociación Frontolímbica",
      "fibersCount": 28000,
      "myelination": 92,
      "conductionVelocity": 62,
      "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
        "category": "Fibras de Asociación Frontolímbica",
        "fibersCount": 28000,
        "myelination": 92,
        "conductionVelocity": 62,
        "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
      }
    ]
  },
  {
    "id": "GLASSER_9m",
    "name": "Área 9m (Prefrontal Medial Superior - Teoría de la Mente)",
    "shortName": "Área 9m",
    "atlasId": "HCP-MMP1.0_L_9m",
    "moduleNumber": 19,
    "moduleName": "Corteza Cingular Anterior y Prefrontal Medial",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.21,
      0.2642,
      2.4308
    ],
    "mniCoordinates": [
      -6.0,
      51.6,
      22.4
    ],
    "color": "#f43f5e",
    "baseFiringRate": 54.9,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A2 pericallosa y callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Inferencia de estados mentales, creencias y deseos en otras personas (Mentalización).",
    "clinicalCorrelation": "Pérdida de Teoría de la Mente (incomprensión de dobles intenciones o falsas creencias ajenas).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
      "category": "Fibras de Asociación Frontolímbica",
      "fibersCount": 28000,
      "myelination": 92,
      "conductionVelocity": 62,
      "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
        "category": "Fibras de Asociación Frontolímbica",
        "fibersCount": 28000,
        "myelination": 92,
        "conductionVelocity": 62,
        "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
      }
    ]
  },
  {
    "id": "GLASSER_10v",
    "name": "Área 10v (Frontopolar Medial Ventral)",
    "shortName": "Área 10v",
    "atlasId": "HCP-MMP1.0_L_10v",
    "moduleNumber": 19,
    "moduleName": "Corteza Cingular Anterior y Prefrontal Medial",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.1015,
      -1.2058,
      2.3328
    ],
    "mniCoordinates": [
      -2.9,
      48.8,
      -19.6
    ],
    "color": "#f43f5e",
    "baseFiringRate": 37.2,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A2 pericallosa y callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Integración de juicios morales personales intuitivos y empatía compasiva.",
    "clinicalCorrelation": "Sociopatía adquirida con falta de remordimiento y conducta utilitarista fría.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
      "category": "Fibras de Asociación Frontolímbica",
      "fibersCount": 28000,
      "myelination": 92,
      "conductionVelocity": 62,
      "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
        "category": "Fibras de Asociación Frontolímbica",
        "fibersCount": 28000,
        "myelination": 92,
        "conductionVelocity": 62,
        "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
      }
    ]
  },
  {
    "id": "GLASSER_10r",
    "name": "Área 10r (Frontopolar Medial Rostral)",
    "shortName": "Área 10r",
    "atlasId": "HCP-MMP1.0_L_10r",
    "moduleNumber": 19,
    "moduleName": "Corteza Cingular Anterior y Prefrontal Medial",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.224,
      -0.8138,
      2.3047
    ],
    "mniCoordinates": [
      -6.4,
      48.0,
      -8.4
    ],
    "color": "#f43f5e",
    "baseFiringRate": 37.2,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A2 pericallosa y callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Planificación prospectiva del futuro propio (Memoria Prospectiva / 'Viaje en el tiempo mental').",
    "clinicalCorrelation": "Incapacidad para recordar cumplir una instrucción pautada para más adelante en el día.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
      "category": "Fibras de Asociación Frontolímbica",
      "fibersCount": 28000,
      "myelination": 92,
      "conductionVelocity": 62,
      "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
        "category": "Fibras de Asociación Frontolímbica",
        "fibersCount": 28000,
        "myelination": 92,
        "conductionVelocity": 62,
        "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
      }
    ]
  },
  {
    "id": "GLASSER_25",
    "name": "Área 25 (Corteza Subcallosa de Broca)",
    "shortName": "Área 25",
    "atlasId": "HCP-MMP1.0_L_25",
    "moduleNumber": 19,
    "moduleName": "Corteza Cingular Anterior y Prefrontal Medial",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.1155,
      -0.9853,
      1.4333
    ],
    "mniCoordinates": [
      -3.3,
      23.1,
      -13.3
    ],
    "color": "#f43f5e",
    "baseFiringRate": 54.9,
    "bloodSupply": "Arteria Cerebral Anterior (ACA - A2 pericallosa y callosomarginal)",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Modulación autonómica de frecuencia cardíaca y sudoración según el estado anímico.",
    "clinicalCorrelation": "Bradicardia, hipotensión y llanto incontrolable en crisis disfóricas agudas.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_CINGULUM",
      "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
      "category": "Fibras de Asociación Frontolímbica",
      "fibersCount": 28000,
      "myelination": 92,
      "conductionVelocity": 62,
      "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_CINGULUM",
        "name": "Fascículo del Cíngulo Anterior & Radiación Frontal Medial",
        "category": "Fibras de Asociación Frontolímbica",
        "fibersCount": 28000,
        "myelination": 92,
        "conductionVelocity": 62,
        "clinicalDisconnectionSummary": "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"
      }
    ]
  },
  {
    "id": "GLASSER_47s",
    "name": "Área 47s (Orbitofrontal Posterior Lateral)",
    "shortName": "Área 47s",
    "atlasId": "HCP-MMP1.0_L_47s",
    "moduleNumber": 20,
    "moduleName": "Corteza Orbitofrontal y Polar",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.1305,
      -1.1603,
      1.3108
    ],
    "mniCoordinates": [
      -32.3,
      19.6,
      -18.3
    ],
    "color": "#fb7185",
    "baseFiringRate": 38.9,
    "bloodSupply": "Arteria Cerebral Anterior (Ramas Orbitofrontales) & ACM",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Evaluación del valor hedonista de recompensas gustativas, olfatorias y sexuales.",
    "clinicalCorrelation": "Hiperoralidad, bulimia compulsiva y desinhibición sexual en Síndrome de Klüver-Bucy.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Radiación Orbitofrontal",
      "category": "Fibras de Conexión Frontolímbica",
      "fibersCount": 24000,
      "myelination": 89,
      "conductionVelocity": 56,
      "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Radiación Orbitofrontal",
        "category": "Fibras de Conexión Frontolímbica",
        "fibersCount": 24000,
        "myelination": 89,
        "conductionVelocity": 56,
        "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
      }
    ]
  },
  {
    "id": "GLASSER_47m",
    "name": "Área 47m (Orbitofrontal Media Lateral)",
    "shortName": "Área 47m",
    "atlasId": "HCP-MMP1.0_L_47m",
    "moduleNumber": 20,
    "moduleName": "Corteza Orbitofrontal y Polar",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.246,
      -1.0483,
      1.7273
    ],
    "mniCoordinates": [
      -35.6,
      31.5,
      -15.1
    ],
    "color": "#fb7185",
    "baseFiringRate": 38.9,
    "bloodSupply": "Arteria Cerebral Anterior (Ramas Orbitofrontales) & ACM",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Actualización del valor de una recompensa cuando se produce devaluación o saciedad.",
    "clinicalCorrelation": "Insensibilidad a la devaluación (continuar consumiendo alimentos que ya no agradan).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Radiación Orbitofrontal",
      "category": "Fibras de Conexión Frontolímbica",
      "fibersCount": 24000,
      "myelination": 89,
      "conductionVelocity": 56,
      "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Radiación Orbitofrontal",
        "category": "Fibras de Conexión Frontolímbica",
        "fibersCount": 24000,
        "myelination": 89,
        "conductionVelocity": 56,
        "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
      }
    ]
  },
  {
    "id": "GLASSER_a47r",
    "name": "Área a47r (Orbitofrontal Anterior Rostral)",
    "shortName": "Área a47r",
    "atlasId": "HCP-MMP1.0_L_a47r",
    "moduleNumber": 20,
    "moduleName": "Corteza Orbitofrontal y Polar",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.3895,
      -0.8942,
      2.2523
    ],
    "mniCoordinates": [
      -39.7,
      46.5,
      -10.7
    ],
    "color": "#fb7185",
    "baseFiringRate": 43.2,
    "bloodSupply": "Arteria Cerebral Anterior (Ramas Orbitofrontales) & ACM",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Inhibición activa de respuestas impulsivas inmediatas a favor de beneficios diferidos.",
    "clinicalCorrelation": "Impulsividad patológica con juego patológico (ludopatía) y compras compulsivas.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Radiación Orbitofrontal",
      "category": "Fibras de Conexión Frontolímbica",
      "fibersCount": 24000,
      "myelination": 89,
      "conductionVelocity": 56,
      "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Radiación Orbitofrontal",
        "category": "Fibras de Conexión Frontolímbica",
        "fibersCount": 24000,
        "myelination": 89,
        "conductionVelocity": 56,
        "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
      }
    ]
  },
  {
    "id": "GLASSER_11l",
    "name": "Área 11l (Área 11 Lateral / Giro Recto Lateral)",
    "shortName": "Área 11l",
    "atlasId": "HCP-MMP1.0_L_11l",
    "moduleNumber": 20,
    "moduleName": "Corteza Orbitofrontal y Polar",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.8925,
      -1.0342,
      2.1718
    ],
    "mniCoordinates": [
      -25.5,
      44.2,
      -14.7
    ],
    "color": "#fb7185",
    "baseFiringRate": 38.9,
    "bloodSupply": "Arteria Cerebral Anterior (Ramas Orbitofrontales) & ACM",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Aprendizaje de reversión (Reversal Learning): detectar cuándo una regla premiada cambia.",
    "clinicalCorrelation": "Perseveración en conductas que ahora producen castigo económico o social.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Radiación Orbitofrontal",
      "category": "Fibras de Conexión Frontolímbica",
      "fibersCount": 24000,
      "myelination": 89,
      "conductionVelocity": 56,
      "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Radiación Orbitofrontal",
        "category": "Fibras de Conexión Frontolímbica",
        "fibersCount": 24000,
        "myelination": 89,
        "conductionVelocity": 56,
        "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
      }
    ]
  },
  {
    "id": "GLASSER_13l",
    "name": "Área 13l (Área 13 Lateral)",
    "shortName": "Área 13l",
    "atlasId": "HCP-MMP1.0_L_13l",
    "moduleNumber": 20,
    "moduleName": "Corteza Orbitofrontal y Polar",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.798,
      -1.2092,
      1.5733
    ],
    "mniCoordinates": [
      -22.8,
      27.1,
      -19.7
    ],
    "color": "#fb7185",
    "baseFiringRate": 38.9,
    "bloodSupply": "Arteria Cerebral Anterior (Ramas Orbitofrontales) & ACM",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Monitoreo de señales visceroceptivas asociadas al castigo (Marcador Somático de Damasio).",
    "clinicalCorrelation": "Ausencia de intuición de riesgo; no se experimentan 'corazonadas' protectoras ante estafas.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Radiación Orbitofrontal",
      "category": "Fibras de Conexión Frontolímbica",
      "fibersCount": 24000,
      "myelination": 89,
      "conductionVelocity": 56,
      "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Radiación Orbitofrontal",
        "category": "Fibras de Conexión Frontolímbica",
        "fibersCount": 24000,
        "myelination": 89,
        "conductionVelocity": 56,
        "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
      }
    ]
  },
  {
    "id": "GLASSER_OFC",
    "name": "Área OFC (Corteza Orbitofrontal Propiamente Dicha)",
    "shortName": "Área OFC",
    "atlasId": "HCP-MMP1.0_L_OFC",
    "moduleNumber": 20,
    "moduleName": "Corteza Orbitofrontal y Polar",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.3745,
      -1.3528,
      1.6713
    ],
    "mniCoordinates": [
      -10.7,
      29.9,
      -23.8
    ],
    "color": "#fb7185",
    "baseFiringRate": 38.9,
    "bloodSupply": "Arteria Cerebral Anterior (Ramas Orbitofrontales) & ACM",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Codificación de la escala común de valor económico subjetivo entre opciones diversas.",
    "clinicalCorrelation": "Incapacidad para elegir racionalmente entre opciones de naturaleza dispar (dinero vs tiempo).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Radiación Orbitofrontal",
      "category": "Fibras de Conexión Frontolímbica",
      "fibersCount": 24000,
      "myelination": 89,
      "conductionVelocity": 56,
      "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Radiación Orbitofrontal",
        "category": "Fibras de Conexión Frontolímbica",
        "fibersCount": 24000,
        "myelination": 89,
        "conductionVelocity": 56,
        "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
      }
    ]
  },
  {
    "id": "GLASSER_pOFC",
    "name": "Área pOFC (Corteza Orbitofrontal Posterior)",
    "shortName": "Área pOFC",
    "atlasId": "HCP-MMP1.0_L_pOFC",
    "moduleNumber": 20,
    "moduleName": "Corteza Orbitofrontal y Polar",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.469,
      -1.2268,
      1.0658
    ],
    "mniCoordinates": [
      -13.4,
      12.6,
      -20.2
    ],
    "color": "#fb7185",
    "baseFiringRate": 43.2,
    "bloodSupply": "Arteria Cerebral Anterior (Ramas Orbitofrontales) & ACM",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Conexión directa con la amígdala basolateral para evaluación de amenazas inmediatas.",
    "clinicalCorrelation": "Extinción deficiente del miedo condicionado y ansiedad fóbica persistente.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Radiación Orbitofrontal",
      "category": "Fibras de Conexión Frontolímbica",
      "fibersCount": 24000,
      "myelination": 89,
      "conductionVelocity": 56,
      "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Radiación Orbitofrontal",
        "category": "Fibras de Conexión Frontolímbica",
        "fibersCount": 24000,
        "myelination": 89,
        "conductionVelocity": 56,
        "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
      }
    ]
  },
  {
    "id": "GLASSER_10pp",
    "name": "Área 10pp (Frontopolar Polo Anterior)",
    "shortName": "Área 10pp",
    "atlasId": "HCP-MMP1.0_L_10pp",
    "moduleNumber": 20,
    "moduleName": "Corteza Orbitofrontal y Polar",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.455,
      -1.0833,
      2.6968
    ],
    "mniCoordinates": [
      -13.0,
      59.2,
      -16.1
    ],
    "color": "#fb7185",
    "baseFiringRate": 43.2,
    "bloodSupply": "Arteria Cerebral Anterior (Ramas Orbitofrontales) & ACM",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Mantenimiento simultáneo de múltiples objetivos en mente con ramificación cognitiva (Branching).",
    "clinicalCorrelation": "Incapacidad para alternar entre tareas complejas sin olvidar en cuál punto quedó la primera.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Radiación Orbitofrontal",
      "category": "Fibras de Conexión Frontolímbica",
      "fibersCount": 24000,
      "myelination": 89,
      "conductionVelocity": 56,
      "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Radiación Orbitofrontal",
        "category": "Fibras de Conexión Frontolímbica",
        "fibersCount": 24000,
        "myelination": 89,
        "conductionVelocity": 56,
        "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
      }
    ]
  },
  {
    "id": "GLASSER_a10p",
    "name": "Área a10p (Frontopolar Polar Anterior)",
    "shortName": "Área a10p",
    "atlasId": "HCP-MMP1.0_L_a10p",
    "moduleNumber": 20,
    "moduleName": "Corteza Orbitofrontal y Polar",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.8855,
      -0.6668,
      2.5708
    ],
    "mniCoordinates": [
      -25.3,
      55.6,
      -4.2
    ],
    "color": "#fb7185",
    "baseFiringRate": 43.2,
    "bloodSupply": "Arteria Cerebral Anterior (Ramas Orbitofrontales) & ACM",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Metacognición: evaluación reflexiva de la certeza sobre el conocimiento propio.",
    "clinicalCorrelation": "Exceso de confianza no justificado o incapacidad para reconocer el propio desconocimiento.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Radiación Orbitofrontal",
      "category": "Fibras de Conexión Frontolímbica",
      "fibersCount": 24000,
      "myelination": 89,
      "conductionVelocity": 56,
      "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Radiación Orbitofrontal",
        "category": "Fibras de Conexión Frontolímbica",
        "fibersCount": 24000,
        "myelination": 89,
        "conductionVelocity": 56,
        "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
      }
    ]
  },
  {
    "id": "GLASSER_p10p",
    "name": "Área p10p (Frontopolar Polar Posterior)",
    "shortName": "Área p10p",
    "atlasId": "HCP-MMP1.0_L_p10p",
    "moduleNumber": 20,
    "moduleName": "Corteza Orbitofrontal y Polar",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.8155,
      -0.3798,
      2.6723
    ],
    "mniCoordinates": [
      -23.3,
      58.5,
      4.0
    ],
    "color": "#fb7185",
    "baseFiringRate": 43.2,
    "bloodSupply": "Arteria Cerebral Anterior (Ramas Orbitofrontales) & ACM",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Prospección de escenarios hipotéticos contrafácticos ('lo que habría ocurrido si...').",
    "clinicalCorrelation": "Incapacidad para experimentar arrepentimiento constructivo tras decisiones desacertadas.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Radiación Orbitofrontal",
      "category": "Fibras de Conexión Frontolímbica",
      "fibersCount": 24000,
      "myelination": 89,
      "conductionVelocity": 56,
      "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Radiación Orbitofrontal",
        "category": "Fibras de Conexión Frontolímbica",
        "fibersCount": 24000,
        "myelination": 89,
        "conductionVelocity": 56,
        "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
      }
    ]
  },
  {
    "id": "GLASSER_10d",
    "name": "Área 10d (Frontopolar Dorsal)",
    "shortName": "Área 10d",
    "atlasId": "HCP-MMP1.0_L_10d",
    "moduleNumber": 20,
    "moduleName": "Corteza Orbitofrontal y Polar",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.3605,
      -0.1872,
      2.8543
    ],
    "mniCoordinates": [
      -10.3,
      63.7,
      9.5
    ],
    "color": "#fb7185",
    "baseFiringRate": 38.9,
    "bloodSupply": "Arteria Cerebral Anterior (Ramas Orbitofrontales) & ACM",
    "arterialTerritoryId": "ACA",
    "cognitiveFunction": "Asignación jerárquica de recursos atencionales hacia metas de largo horizonte temporal.",
    "clinicalCorrelation": "Déficit en planificación de proyectos vitales a medio y largo plazo (desorganización biográfica).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_UNCINATE",
      "name": "Fascículo Uncinado & Radiación Orbitofrontal",
      "category": "Fibras de Conexión Frontolímbica",
      "fibersCount": 24000,
      "myelination": 89,
      "conductionVelocity": 56,
      "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_UNCINATE",
        "name": "Fascículo Uncinado & Radiación Orbitofrontal",
        "category": "Fibras de Conexión Frontolímbica",
        "fibersCount": 24000,
        "myelination": 89,
        "conductionVelocity": 56,
        "clinicalDisconnectionSummary": "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"
      }
    ]
  },
  {
    "id": "GLASSER_44",
    "name": "Área 44 (Pars Opercularis - Área de Broca Clásica)",
    "shortName": "Área 44",
    "atlasId": "HCP-MMP1.0_L_44",
    "moduleNumber": 21,
    "moduleName": "Corteza Frontal Inferior",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.8025,
      -0.1172,
      1.1638
    ],
    "mniCoordinates": [
      -51.5,
      15.4,
      11.5
    ],
    "color": "#00f0ff",
    "baseFiringRate": 36.3,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Frontal Ascendente / Candelabro)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Codificación fonológica motora, ensamble morfosintáctico y secuenciación del habla.",
    "clinicalCorrelation": "Afasia de Broca motora clásica (habla no fluida, trabajosa, agramática con comprensión preservada).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado & Fascículo Frontoccipital Inferior (IFOF)",
      "category": "Fascículo Principal del Lenguaje",
      "fibersCount": 38000,
      "myelination": 97,
      "conductionVelocity": 72,
      "clinicalDisconnectionSummary": "Afasia de Broca clásica, agramatismo motor, apraxia del habla y anomia sintáctica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado & Fascículo Frontoccipital Inferior (IFOF)",
        "category": "Fascículo Principal del Lenguaje",
        "fibersCount": 38000,
        "myelination": 97,
        "conductionVelocity": 72,
        "clinicalDisconnectionSummary": "Afasia de Broca clásica, agramatismo motor, apraxia del habla y anomia sintáctica"
      }
    ]
  },
  {
    "id": "GLASSER_45",
    "name": "Área 45 (Pars Triangularis - Área de Broca Semántica)",
    "shortName": "Área 45",
    "atlasId": "HCP-MMP1.0_L_45",
    "moduleNumber": 21,
    "moduleName": "Corteza Frontal Inferior",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.687,
      -0.4358,
      1.5558
    ],
    "mniCoordinates": [
      -48.2,
      26.6,
      2.4
    ],
    "color": "#00f0ff",
    "baseFiringRate": 36.3,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Frontal Ascendente / Candelabro)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Selección semántica controlada activa entre alternativas léxicas concurrentes.",
    "clinicalCorrelation": "Dificultad severa en recuperación de palabras con reducción drástica de fluidez verbal.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado & Fascículo Frontoccipital Inferior (IFOF)",
      "category": "Fascículo Principal del Lenguaje",
      "fibersCount": 38000,
      "myelination": 97,
      "conductionVelocity": 72,
      "clinicalDisconnectionSummary": "Afasia de Broca clásica, agramatismo motor, apraxia del habla y anomia sintáctica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado & Fascículo Frontoccipital Inferior (IFOF)",
        "category": "Fascículo Principal del Lenguaje",
        "fibersCount": 38000,
        "myelination": 97,
        "conductionVelocity": 72,
        "clinicalDisconnectionSummary": "Afasia de Broca clásica, agramatismo motor, apraxia del habla y anomia sintáctica"
      }
    ]
  },
  {
    "id": "GLASSER_IFJp",
    "name": "Área IFJp (Unión Frontal Inferior Posterior)",
    "shortName": "Área IFJp",
    "atlasId": "HCP-MMP1.0_L_IFJp",
    "moduleNumber": 21,
    "moduleName": "Corteza Frontal Inferior",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.386,
      0.4567,
      0.7543
    ],
    "mniCoordinates": [
      -39.6,
      3.7,
      27.9
    ],
    "color": "#00f0ff",
    "baseFiringRate": 44.9,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Frontal Ascendente / Candelabro)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Control de la atención ejecutiva para la alternancia entre conjuntos de reglas de tareas.",
    "clinicalCorrelation": "Bloqueo mental y perseveración rígida al intentar cambiar de tarea en el test de Wisconsin.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado & Fascículo Frontoccipital Inferior (IFOF)",
      "category": "Fascículo Principal del Lenguaje",
      "fibersCount": 38000,
      "myelination": 97,
      "conductionVelocity": 72,
      "clinicalDisconnectionSummary": "Afasia de Broca clásica, agramatismo motor, apraxia del habla y anomia sintáctica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado & Fascículo Frontoccipital Inferior (IFOF)",
        "category": "Fascículo Principal del Lenguaje",
        "fibersCount": 38000,
        "myelination": 97,
        "conductionVelocity": 72,
        "clinicalDisconnectionSummary": "Afasia de Broca clásica, agramatismo motor, apraxia del habla y anomia sintáctica"
      }
    ]
  },
  {
    "id": "GLASSER_IFJa",
    "name": "Área IFJa (Unión Frontal Inferior Anterior)",
    "shortName": "Área IFJa",
    "atlasId": "HCP-MMP1.0_L_IFJa",
    "moduleNumber": 21,
    "moduleName": "Corteza Frontal Inferior",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.393,
      0.3693,
      1.0308
    ],
    "mniCoordinates": [
      -39.8,
      11.6,
      25.4
    ],
    "color": "#00f0ff",
    "baseFiringRate": 44.9,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Frontal Ascendente / Candelabro)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Mantenimiento activo en memoria de trabajo de instrucciones verbales de una tarea.",
    "clinicalCorrelation": "Pérdida inmediata de las instrucciones de trabajo al presentarse una breve interrupción sonora.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado & Fascículo Frontoccipital Inferior (IFOF)",
      "category": "Fascículo Principal del Lenguaje",
      "fibersCount": 38000,
      "myelination": 97,
      "conductionVelocity": 72,
      "clinicalDisconnectionSummary": "Afasia de Broca clásica, agramatismo motor, apraxia del habla y anomia sintáctica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado & Fascículo Frontoccipital Inferior (IFOF)",
        "category": "Fascículo Principal del Lenguaje",
        "fibersCount": 38000,
        "myelination": 97,
        "conductionVelocity": 72,
        "clinicalDisconnectionSummary": "Afasia de Broca clásica, agramatismo motor, apraxia del habla y anomia sintáctica"
      }
    ]
  },
  {
    "id": "GLASSER_IFSp",
    "name": "Área IFSp (Surco Frontal Inferior Posterior)",
    "shortName": "Área IFSp",
    "atlasId": "HCP-MMP1.0_L_IFSp",
    "moduleNumber": 21,
    "moduleName": "Corteza Frontal Inferior",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.568,
      0.2467,
      1.3668
    ],
    "mniCoordinates": [
      -44.8,
      21.2,
      21.9
    ],
    "color": "#00f0ff",
    "baseFiringRate": 44.9,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Frontal Ascendente / Candelabro)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Inhibición de respuestas motoras automatizadas pero inapropiadas al contexto.",
    "clinicalCorrelation": "Falla en tareas Go / No-Go con respuestas compulsivas e incapacidad de frenado motor.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado & Fascículo Frontoccipital Inferior (IFOF)",
      "category": "Fascículo Principal del Lenguaje",
      "fibersCount": 38000,
      "myelination": 97,
      "conductionVelocity": 72,
      "clinicalDisconnectionSummary": "Afasia de Broca clásica, agramatismo motor, apraxia del habla y anomia sintáctica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado & Fascículo Frontoccipital Inferior (IFOF)",
        "category": "Fascículo Principal del Lenguaje",
        "fibersCount": 38000,
        "myelination": 97,
        "conductionVelocity": 72,
        "clinicalDisconnectionSummary": "Afasia de Broca clásica, agramatismo motor, apraxia del habla y anomia sintáctica"
      }
    ]
  },
  {
    "id": "GLASSER_IFSa",
    "name": "Área IFSa (Surco Frontal Inferior Anterior)",
    "shortName": "Área IFSa",
    "atlasId": "HCP-MMP1.0_L_IFSa",
    "moduleNumber": 21,
    "moduleName": "Corteza Frontal Inferior",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.5435,
      -0.0788,
      1.7133
    ],
    "mniCoordinates": [
      -44.1,
      31.1,
      12.6
    ],
    "color": "#00f0ff",
    "baseFiringRate": 44.9,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Frontal Ascendente / Candelabro)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Integración entre gramática sintáctica y prosodia lingüística estructurada.",
    "clinicalCorrelation": "Habla telegráfica monótona con omisión de artículos, preposiciones y flexiones verbales.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado & Fascículo Frontoccipital Inferior (IFOF)",
      "category": "Fascículo Principal del Lenguaje",
      "fibersCount": 38000,
      "myelination": 97,
      "conductionVelocity": 72,
      "clinicalDisconnectionSummary": "Afasia de Broca clásica, agramatismo motor, apraxia del habla y anomia sintáctica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado & Fascículo Frontoccipital Inferior (IFOF)",
        "category": "Fascículo Principal del Lenguaje",
        "fibersCount": 38000,
        "myelination": 97,
        "conductionVelocity": 72,
        "clinicalDisconnectionSummary": "Afasia de Broca clásica, agramatismo motor, apraxia del habla y anomia sintáctica"
      }
    ]
  },
  {
    "id": "GLASSER_47l",
    "name": "Área 47l (Pars Orbitalis Lateral - Selección Semántica)",
    "shortName": "Área 47l",
    "atlasId": "HCP-MMP1.0_L_47l",
    "moduleNumber": 21,
    "moduleName": "Corteza Frontal Inferior",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.582,
      -0.8978,
      1.6853
    ],
    "mniCoordinates": [
      -45.2,
      30.3,
      -10.8
    ],
    "color": "#00f0ff",
    "baseFiringRate": 40.6,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Frontal Ascendente / Candelabro)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Recuperación semántica guiada por conceptos abstractos y resolución de ambigüedad.",
    "clinicalCorrelation": "Pérdida de la habilidad para resolver analogías abstractas verbales complejas.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado & Fascículo Frontoccipital Inferior (IFOF)",
      "category": "Fascículo Principal del Lenguaje",
      "fibersCount": 38000,
      "myelination": 97,
      "conductionVelocity": 72,
      "clinicalDisconnectionSummary": "Afasia de Broca clásica, agramatismo motor, apraxia del habla y anomia sintáctica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado & Fascículo Frontoccipital Inferior (IFOF)",
        "category": "Fascículo Principal del Lenguaje",
        "fibersCount": 38000,
        "myelination": 97,
        "conductionVelocity": 72,
        "clinicalDisconnectionSummary": "Afasia de Broca clásica, agramatismo motor, apraxia del habla y anomia sintáctica"
      }
    ]
  },
  {
    "id": "GLASSER_p47r",
    "name": "Área p47r (Pars Orbitalis Rostral)",
    "shortName": "Área p47r",
    "atlasId": "HCP-MMP1.0_L_p47r",
    "moduleNumber": 21,
    "moduleName": "Corteza Frontal Inferior",
    "system": "Lenguaje & Auditivo",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.505,
      -0.4848,
      2.0388
    ],
    "mniCoordinates": [
      -43.0,
      40.4,
      1.0
    ],
    "color": "#00f0ff",
    "baseFiringRate": 44.9,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Rama Frontal Ascendente / Candelabro)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Control ejecutivo sobre las redes temporales semánticas durante lectura comprensiva.",
    "clinicalCorrelation": "Lectura superficial con imposibilidad de extraer la conclusión central de un párrafo largo.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_ARCUATE",
      "name": "Fascículo Arqueado & Fascículo Frontoccipital Inferior (IFOF)",
      "category": "Fascículo Principal del Lenguaje",
      "fibersCount": 38000,
      "myelination": 97,
      "conductionVelocity": 72,
      "clinicalDisconnectionSummary": "Afasia de Broca clásica, agramatismo motor, apraxia del habla y anomia sintáctica"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_ARCUATE",
        "name": "Fascículo Arqueado & Fascículo Frontoccipital Inferior (IFOF)",
        "category": "Fascículo Principal del Lenguaje",
        "fibersCount": 38000,
        "myelination": 97,
        "conductionVelocity": 72,
        "clinicalDisconnectionSummary": "Afasia de Broca clásica, agramatismo motor, apraxia del habla y anomia sintáctica"
      }
    ]
  },
  {
    "id": "GLASSER_8C",
    "name": "Área 8C (Prefrontal Dorsolateral Caudal)",
    "shortName": "Área 8C",
    "atlasId": "HCP-MMP1.0_L_8C",
    "moduleNumber": 22,
    "moduleName": "Corteza Prefrontal Dorsolateral",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.4385,
      0.7263,
      1.1708
    ],
    "mniCoordinates": [
      -41.1,
      15.6,
      35.6
    ],
    "color": "#3b82f6",
    "baseFiringRate": 38.0,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontales Anteriores y Medias)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Mapeo atencional de coordenadas motoras de selección entre estímulos espaciales múltiples.",
    "clinicalCorrelation": "Déficit en atención dividida y lentificación en exploración visual de tableros de control.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
      "category": "Fibras de Asociación Ejecutiva",
      "fibersCount": 36000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
        "category": "Fibras de Asociación Ejecutiva",
        "fibersCount": 36000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
      }
    ]
  },
  {
    "id": "GLASSER_8Av",
    "name": "Área 8Av (Prefrontal Dorsolateral Intermedia Ventral)",
    "shortName": "Área 8Av",
    "atlasId": "HCP-MMP1.0_L_8Av",
    "moduleNumber": 22,
    "moduleName": "Corteza Prefrontal Dorsolateral",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.323,
      1.2092,
      1.2303
    ],
    "mniCoordinates": [
      -37.8,
      17.3,
      49.4
    ],
    "color": "#3b82f6",
    "baseFiringRate": 42.3,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontales Anteriores y Medias)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Memoria de trabajo espacial: retención de posiciones de objetivos visuales ausentes.",
    "clinicalCorrelation": "Pérdida de memoria de trabajo espacial (olvido de dónde se vio ocultar un objeto segundos antes).",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
      "category": "Fibras de Asociación Ejecutiva",
      "fibersCount": 36000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
        "category": "Fibras de Asociación Ejecutiva",
        "fibersCount": 36000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
      }
    ]
  },
  {
    "id": "GLASSER_i6_8",
    "name": "Área i6-8 (Transición entre Premotora 6 y Área 8)",
    "shortName": "Área i6-8",
    "atlasId": "HCP-MMP1.0_L_i6-8",
    "moduleNumber": 22,
    "moduleName": "Corteza Prefrontal Dorsolateral",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.071,
      1.3528,
      0.8838
    ],
    "mniCoordinates": [
      -30.6,
      7.4,
      53.5
    ],
    "color": "#3b82f6",
    "baseFiringRate": 46.6,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontales Anteriores y Medias)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Puente entre el plan motor de acción física y el control atencional superior.",
    "clinicalCorrelation": "Descoordinación entre lo que el paciente decide ejecutar y el movimiento inicial de su mano.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
      "category": "Fibras de Asociación Ejecutiva",
      "fibersCount": 36000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
        "category": "Fibras de Asociación Ejecutiva",
        "fibersCount": 36000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
      }
    ]
  },
  {
    "id": "GLASSER_s6_8",
    "name": "Área s6-8 (Surco Frontal Superior Transicional)",
    "shortName": "Área s6-8",
    "atlasId": "HCP-MMP1.0_L_s6-8",
    "moduleNumber": 22,
    "moduleName": "Corteza Prefrontal Dorsolateral",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.8155,
      1.4228,
      1.3913
    ],
    "mniCoordinates": [
      -23.3,
      21.9,
      55.5
    ],
    "color": "#3b82f6",
    "baseFiringRate": 46.6,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontales Anteriores y Medias)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Coordinación entre postura del cuello y direccionamiento atencional voluntario.",
    "clinicalCorrelation": "Torpeza al guiar la orientación cefálica hacia eventos inesperados del entorno.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
      "category": "Fibras de Asociación Ejecutiva",
      "fibersCount": 36000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
        "category": "Fibras de Asociación Ejecutiva",
        "fibersCount": 36000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
      }
    ]
  },
  {
    "id": "GLASSER_SFL",
    "name": "Área SFL (Giro Frontal Superior Lateral)",
    "shortName": "Área SFL",
    "atlasId": "HCP-MMP1.0_L_SFL",
    "moduleNumber": 22,
    "moduleName": "Corteza Prefrontal Dorsolateral",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.28,
      1.6538,
      1.2338
    ],
    "mniCoordinates": [
      -8.0,
      17.4,
      62.1
    ],
    "color": "#3b82f6",
    "baseFiringRate": 42.3,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontales Anteriores y Medias)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Mantenimiento de reglas abstractas complejas durante largos períodos de espera.",
    "clinicalCorrelation": "Abandono prematuro de actividades que requieren paciencia o demora de la gratificación.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
      "category": "Fibras de Asociación Ejecutiva",
      "fibersCount": 36000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
        "category": "Fibras de Asociación Ejecutiva",
        "fibersCount": 36000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
      }
    ]
  },
  {
    "id": "GLASSER_8BL",
    "name": "Área 8BL (Frontal Superior Dorsal Medial)",
    "shortName": "Área 8BL",
    "atlasId": "HCP-MMP1.0_L_8BL",
    "moduleNumber": 22,
    "moduleName": "Corteza Prefrontal Dorsolateral",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.4095,
      1.3003,
      1.9023
    ],
    "mniCoordinates": [
      -11.7,
      36.5,
      52.0
    ],
    "color": "#3b82f6",
    "baseFiringRate": 42.3,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontales Anteriores y Medias)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Monitoreo del esfuerzo mental invertido en tareas cognitivas de alta dificultad.",
    "clinicalCorrelation": "Fatiga mental patológica precoz tras minutos de concentración intelectual moderada.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
      "category": "Fibras de Asociación Ejecutiva",
      "fibersCount": 36000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
        "category": "Fibras de Asociación Ejecutiva",
        "fibersCount": 36000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
      }
    ]
  },
  {
    "id": "GLASSER_9p",
    "name": "Área 9p (Prefrontal Dorsolateral Superior Posterior)",
    "shortName": "Área 9p",
    "atlasId": "HCP-MMP1.0_L_9p",
    "moduleNumber": 22,
    "moduleName": "Corteza Prefrontal Dorsolateral",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.6545,
      0.8173,
      2.1753
    ],
    "mniCoordinates": [
      -18.7,
      44.3,
      38.2
    ],
    "color": "#3b82f6",
    "baseFiringRate": 38.0,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontales Anteriores y Medias)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Manipulación y reordenamiento activo de ítems almacenados en la memoria de trabajo.",
    "clinicalCorrelation": "Incapacidad para invertir números o deletrear palabras al revés en la prueba mental.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
      "category": "Fibras de Asociación Ejecutiva",
      "fibersCount": 36000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
        "category": "Fibras de Asociación Ejecutiva",
        "fibersCount": 36000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
      }
    ]
  },
  {
    "id": "GLASSER_9a",
    "name": "Área 9a (Prefrontal Dorsolateral Superior Anterior)",
    "shortName": "Área 9a",
    "atlasId": "HCP-MMP1.0_L_9a",
    "moduleNumber": 22,
    "moduleName": "Corteza Prefrontal Dorsolateral",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.714,
      0.3623,
      2.5183
    ],
    "mniCoordinates": [
      -20.4,
      54.1,
      25.2
    ],
    "color": "#3b82f6",
    "baseFiringRate": 38.0,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontales Anteriores y Medias)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Planificación estratégica de múltiples pasos ordenados para alcanzar una meta.",
    "clinicalCorrelation": "Desorganización caótica en ejecución de la prueba de la Torre de Londres / Hanoi.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
      "category": "Fibras de Asociación Ejecutiva",
      "fibersCount": 36000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
        "category": "Fibras de Asociación Ejecutiva",
        "fibersCount": 36000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
      }
    ]
  },
  {
    "id": "GLASSER_8Ad",
    "name": "Área 8Ad (Frontal Superior Dorsal Lateral)",
    "shortName": "Área 8Ad",
    "atlasId": "HCP-MMP1.0_L_8Ad",
    "moduleNumber": 22,
    "moduleName": "Corteza Prefrontal Dorsolateral",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.84,
      0.9328,
      1.5033
    ],
    "mniCoordinates": [
      -24.0,
      25.1,
      41.5
    ],
    "color": "#3b82f6",
    "baseFiringRate": 42.3,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontales Anteriores y Medias)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Inhibición de patrones de respuesta habituales a favor de estrategias creativas nuevas.",
    "clinicalCorrelation": "Perseveración en métodos ineficaces con incapacidad para innovar soluciones alternativas.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
      "category": "Fibras de Asociación Ejecutiva",
      "fibersCount": 36000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
        "category": "Fibras de Asociación Ejecutiva",
        "fibersCount": 36000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
      }
    ]
  },
  {
    "id": "GLASSER_p9_46v",
    "name": "Área p9-46v (DLPFC Ventrolateral Posterior - BA 46/9)",
    "shortName": "Área p9-46v",
    "atlasId": "HCP-MMP1.0_L_p9-46v",
    "moduleNumber": 22,
    "moduleName": "Corteza Prefrontal Dorsolateral",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.54,
      0.4323,
      1.6433
    ],
    "mniCoordinates": [
      -44.0,
      29.1,
      27.2
    ],
    "color": "#3b82f6",
    "baseFiringRate": 55.2,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontales Anteriores y Medias)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Supervisión ejecutiva continua del desempeño en tiempo real y detección de desvíos.",
    "clinicalCorrelation": "Síndrome disejecutivo puro con desvío constante respecto al objetivo principal de la tarea.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
      "category": "Fibras de Asociación Ejecutiva",
      "fibersCount": 36000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
        "category": "Fibras de Asociación Ejecutiva",
        "fibersCount": 36000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
      }
    ]
  },
  {
    "id": "GLASSER_a9_46v",
    "name": "Área a9-46v (DLPFC Ventrolateral Anterior)",
    "shortName": "Área a9-46v",
    "atlasId": "HCP-MMP1.0_L_a9-46v",
    "moduleNumber": 22,
    "moduleName": "Corteza Prefrontal Dorsolateral",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.3195,
      -0.2013,
      2.3083
    ],
    "mniCoordinates": [
      -37.7,
      48.1,
      9.1
    ],
    "color": "#3b82f6",
    "baseFiringRate": 55.2,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontales Anteriores y Medias)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Resistencia a la interferencia proactiva de recuerdos antiguos sobre la tarea presente.",
    "clinicalCorrelation": "Intrusión persistente de datos antiguos obsoletos que contaminan el trabajo actual.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
      "category": "Fibras de Asociación Ejecutiva",
      "fibersCount": 36000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
        "category": "Fibras de Asociación Ejecutiva",
        "fibersCount": 36000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
      }
    ]
  },
  {
    "id": "GLASSER_46",
    "name": "Área 46 (Corteza Prefrontal Dorsolateral Principal / BA 46)",
    "shortName": "Área 46",
    "atlasId": "HCP-MMP1.0_L_46",
    "moduleNumber": 22,
    "moduleName": "Corteza Prefrontal Dorsolateral",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -1.281,
      0.5128,
      1.8848
    ],
    "mniCoordinates": [
      -36.6,
      36.0,
      29.5
    ],
    "color": "#3b82f6",
    "baseFiringRate": 38.0,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontales Anteriores y Medias)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Epicentro cardinal de la memoria de trabajo, razonamiento lógico fluido y abstracción.",
    "clinicalCorrelation": "Déficit severo de abstracción, pensamiento concreto infantil y fracaso total en Wisconsin.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
      "category": "Fibras de Asociación Ejecutiva",
      "fibersCount": 36000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
        "category": "Fibras de Asociación Ejecutiva",
        "fibersCount": 36000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
      }
    ]
  },
  {
    "id": "GLASSER_9_46d",
    "name": "Área 9-46d (DLPFC Dorsal - Centro Neurálgico Ejecutivo)",
    "shortName": "Área 9-46d",
    "atlasId": "HCP-MMP1.0_L_9-46d",
    "moduleNumber": 22,
    "moduleName": "Corteza Prefrontal Dorsolateral",
    "system": "Red Ejecutiva & Saliencia",
    "hemisphere": "left",
    "lobe": "Frontal",
    "type": "cortical",
    "position": [
      -0.9975,
      0.2678,
      2.1158
    ],
    "mniCoordinates": [
      -28.5,
      42.6,
      22.5
    ],
    "color": "#3b82f6",
    "baseFiringRate": 50.9,
    "bloodSupply": "Arteria Cerebral Media (ACM - M4 Frontales Anteriores y Medias)",
    "arterialTerritoryId": "ACM",
    "cognitiveFunction": "Integración jerárquica de metas, inhibición motora y flexibilidad cognitiva fluida.",
    "clinicalCorrelation": "Apatía severa alternada con desinhibición, síndrome prefrontal dorsolateral bilateral.",
    "connectivityStatus": "Nominal",
    "associatedTract": {
      "tractId": "TRACT_SLF",
      "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
      "category": "Fibras de Asociación Ejecutiva",
      "fibersCount": 36000,
      "myelination": 96,
      "conductionVelocity": 70,
      "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
    },
    "associatedTracts": [
      {
        "tractId": "TRACT_SLF",
        "name": "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada",
        "category": "Fibras de Asociación Ejecutiva",
        "fibersCount": 36000,
        "myelination": 96,
        "conductionVelocity": 70,
        "clinicalDisconnectionSummary": "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"
      }
    ]
  }
];
