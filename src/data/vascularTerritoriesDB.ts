export interface AcuteStrokeProfile {
  id: string;
  syndromeName: string;
  culpritVessel: string;
  affectedRegionIds: string[];
  affectedTractIds: string[];
  neurologicalDeficits: {
    motor: string;
    sensory: string;
    language: string;
    visual: string;
    cognitiveAfective: string;
  };
  nihssScoreTypical: number;
  clinicalSummary: string;
  emergencyIntervention: string;
}

export interface VascularTerritoryRecord {
  id: string;
  name: string;
  arteryCategory: 'Circulación Anterior (Carotídea)' | 'Circulación Posterior (Vertebrobasilar)';
  vesselOrigin: string;
  anatomicBranches: string[];
  color: string;
  strokeProfile: AcuteStrokeProfile;
}

export const VASCULAR_TERRITORIES: Record<string, VascularTerritoryRecord> = {
  MCA_SUPERIOR: {
    id: 'MCA_SUPERIOR',
    name: 'Territorio de la División Superior de la Arteria Cerebral Media (ACM M2 Sup)',
    arteryCategory: 'Circulación Anterior (Carotídea)',
    vesselOrigin: 'Tronco principal de la ACM (M1) en la fisura de Silvio',
    anatomicBranches: ['Arteria Orbitofrontal Lateral', 'Arteria Prerrolándica de Duret', 'Arteria Rolándica', 'Arteria Parietal Anterior'],
    color: '#38bdf8',
    strokeProfile: {
      id: 'STROKE_MCA_SUPERIOR',
      syndromeName: 'Ictus Isquémico de la División Superior de la ACM Izquierda',
      culpritVessel: 'Arteria Cerebral Media Izquierda (División Superior M2)',
      affectedRegionIds: ['GLASSER_44', 'GLASSER_45', 'GLASSER_4', 'GLASSER_3B_1', 'GLASSER_FEF', 'GLASSER_55B', 'GLASSER_AVI'],
      affectedTractIds: ['TRACT_ARCUATE', 'TRACT_FAT', 'TRACT_CORTICOSPINAL', 'TRACT_SLF'],
      neurologicalDeficits: {
        motor: 'Hemiparesia faciobraquial contralateral severa (brazo y cara > pierna) con signo de Babinski y disartria piramidal.',
        sensory: 'Hemihipoestesia faciobraquial contralateral con asterognosia y pérdida de discriminación de dos puntos.',
        language: 'Afasia de Broca no fluida clásica (habla telegráfica, agramatismo, anomia densa, pero con comprensión semántica relativamente preservada).',
        visual: 'Desviación oculocefálica conjugada ipsilesional obligada (los ojos "miran hacia el lado del infarto").',
        cognitiveAfective: 'Frustración reactiva consciente y depresión aguda por preservación del insight.'
      },
      nihssScoreTypical: 16,
      clinicalSummary: 'Cuadro neurovascular emergente clásico. La preservación del lóbulo temporal posterior permite comprender preguntas, pero la destrucción del opérculo frontal imposibilita la articulación del habla y el movimiento de la mano contralateral.',
      emergencyIntervention: 'Trombectomía mecánica urgente (endovascular) si el tiempo ventana < 24h y rTPA intravenoso si < 4.5h sin contraindicaciones.'
    }
  },

  MCA_INFERIOR: {
    id: 'MCA_INFERIOR',
    name: 'Territorio de la División Inferior de la Arteria Cerebral Media (ACM M2 Inf)',
    arteryCategory: 'Circulación Anterior (Carotídea)',
    vesselOrigin: 'Tronco inferior de bifurcación de la ACM (M1/M2)',
    anatomicBranches: ['Arteria Temporal Anterior', 'Arteria Temporal Media', 'Arteria Temporal Posterior', 'Arteria Parietotemporal Posterior'],
    color: '#0284c7',
    strokeProfile: {
      id: 'STROKE_MCA_INFERIOR',
      syndromeName: 'Ictus Isquémico de la División Inferior de la ACM Izquierda',
      culpritVessel: 'Arteria Cerebral Media Izquierda (División Inferior M2)',
      affectedRegionIds: ['GLASSER_PSL', 'GLASSER_STV', 'GLASSER_MT_V5'],
      affectedTractIds: ['TRACT_ARCUATE', 'TRACT_OPTIC_RADIATION', 'TRACT_ILF'],
      neurologicalDeficits: {
        motor: 'Fuerza motora generalmente preservada (mínima torpeza faciobraquial transitoria).',
        sensory: 'Sensibilidad somatosensorial sin déficit franco.',
        language: 'Afasia de Wernicke severa (lenguaje verborreico, fluente, jergafasia con neologismos incomprensibles y anosognosia total).',
        visual: 'Cuadrantanopsia homónima superior derecha ("pie in the sky") por compromiso del Asa de Meyer en el lóbulo temporal.',
        cognitiveAfective: 'Anosognosia profunda: el paciente no tiene consciencia de que su discurso es ininteligible, mostrándose perplejo ante la falta de comprensión ajena.'
      },
      nihssScoreTypical: 11,
      clinicalSummary: 'Síndrome devastador de la comprensión lingüística sin plejia motora evidente, lo que con frecuencia retrasa el reconocimiento inicial de ictus en salas de urgencias por confundirse con estados psicóticos o confusión metabólica.',
      emergencyIntervention: 'Recanalización endovascular urgente y trombólisis química guiada por perfusión TC/RM.'
    }
  },

  MCA_LENTICULOSTRIATE: {
    id: 'MCA_LENTICULOSTRIATE',
    name: 'Territorio Perforante Lenticuloestriado (ACM M1 - Cápsula Interna)',
    arteryCategory: 'Circulación Anterior (Carotídea)',
    vesselOrigin: 'Porción esfenoidal proximal (M1) de la ACM antes de la bifurcación',
    anatomicBranches: ['Arterias Lenticuloestriadas Mediales y Laterales de Charcot'],
    color: '#8b5cf6',
    strokeProfile: {
      id: 'STROKE_LENTICULOSTRIATE',
      syndromeName: 'Infarto Lacunar Cápsulo-Estriatal Puro (Arteria de la Hemorragia de Charcot)',
      culpritVessel: 'Arterias Lenticuloestriadas Anterolaterales (Ramas profundas de ACM M1)',
      affectedRegionIds: ['SUBCORTICAL_STRIATUM', 'SUBCORTICAL_GP'],
      affectedTractIds: ['TRACT_CORTICOSPINAL'],
      neurologicalDeficits: {
        motor: 'Hemiplejia contralateral proporcional armónica facio-braquio-crural completa (pura, sin alteración cortical de lenguaje ni campos visuales).',
        sensory: 'Sensibilidad preservada o mínimo hipoestesia si roza el tálamo.',
        language: 'Lenguaje cortical intacto (ausencia de afasia), pero marcada disartria paralítica por parálisis de la musculatura orofaríngea contralateral.',
        visual: 'Campos visuales estrictamente normales.',
        cognitiveAfective: 'Estado de alerta y funciones ejecutivas corticales preservadas en fases agudas.'
      },
      nihssScoreTypical: 12,
      clinicalSummary: 'El infarto lacunar motor puro prototípico de Fisher. Una lesión isquémica minúscula (<15 mm) en la rodilla y brazo posterior de la cápsula interna destruye el embudo de fibras corticoespinales condensadas.',
      emergencyIntervention: 'Control tensional estricto, trombólisis IV en ventana (<4.5h), antiagregación dual precoz y rehabilitación neuromotora intensiva.'
    }
  },

  ACA_A2_A3: {
    id: 'ACA_A2_A3',
    name: 'Territorio de la Arteria Cerebral Anterior (ACA segmentos A2, A3 y Pericallosa)',
    arteryCategory: 'Circulación Anterior (Carotídea)',
    vesselOrigin: 'Bifurcación de la Carótida Interna por encima de la cisura óptica',
    anatomicBranches: ['Arteria Frontopolar', 'Arteria Callosomarginal', 'Arteria Pericallosa'],
    color: '#10b981',
    strokeProfile: {
      id: 'STROKE_ACA',
      syndromeName: 'Ictus de la Arteria Cerebral Anterior Izquierda (Cíngulo & Homúnculo Crural)',
      culpritVessel: 'Arteria Cerebral Anterior Izquierda (Segmento A2 / Tronco Calloso)',
      affectedRegionIds: ['GLASSER_6D_SMA', 'GLASSER_10R_PP', 'GLASSER_24DD_ACC', 'GLASSER_23D_PCC'],
      affectedTractIds: ['TRACT_CINGULUM', 'TRACT_FAT', 'TRACT_CORPUS_CALLOSUM'],
      neurologicalDeficits: {
        motor: 'Monoparesia o hemiparesia contralateral desproporcionada con afectación predominante del miembro inferior (pierna y pie > brazo y cara). Reflejos de prensión patológica (grasping reflex).',
        sensory: 'Hemihipoestesia predominante en extremidad inferior contralateral.',
        language: 'Afasia motora transcortical (repetición verbal milagrosamente intacta, pero con reducción drástica del habla espontánea).',
        visual: 'Conservados.',
        cognitiveAfective: 'Abulia severa, mutismo acinético, pérdida de motivación hedónica e incontinencia de esfínteres por daño del lóbulo paracentral medial.'
      },
      nihssScoreTypical: 14,
      clinicalSummary: 'La isquemia de la pared medial hemisférica desconecta el sistema cingular anterior motivacional y el área somatotópica de la pierna, dejando al paciente inmóvil y desinteresado de su entorno a pesar de conservar la visión y el lenguaje receptive.',
      emergencyIntervention: 'Trombectomía mecánica en A1/A2 proximal si oclusión de gran vaso accesible y trombolisis sistémica.'
    }
  },

  PCA_P3: {
    id: 'PCA_P3',
    name: 'Territorio Occipito-Calcarino de la Arteria Cerebral Posterior (ACP P3 / Calcarina)',
    arteryCategory: 'Circulación Posterior (Vertebrobasilar)',
    vesselOrigin: 'Bifurcación de la Arteria Basilar en la fosa interpeduncular',
    anatomicBranches: ['Arteria Calcarina', 'Arteria Parietooccipital', 'Arteria Occipitotemporal Lateral'],
    color: '#a855f7',
    strokeProfile: {
      id: 'STROKE_PCA_CALCARINE',
      syndromeName: 'Infarto Occipital Izquierdo & Síndrome de Déjerine (Alexia sin Agrafia)',
      culpritVessel: 'Arteria Cerebral Posterior Izquierda (Segmento P3 Calcarino y Esplenial)',
      affectedRegionIds: ['GLASSER_V1', 'GLASSER_V2_V3', 'GLASSER_V4', 'GLASSER_FFC'],
      affectedTractIds: ['TRACT_OPTIC_RADIATION', 'TRACT_CORPUS_CALLOSUM', 'TRACT_ILF'],
      neurologicalDeficits: {
        motor: 'Completamente conservado (sin déficit motor).',
        sensory: 'Normal.',
        language: 'Alexia sin Agrafia: el paciente escribe fluidamente al dictado o espontáneamente, pero es completamente incapaz de leer lo que acaba de escribir.',
        visual: 'Hemianopsia homónima derecha completa. Hemi-acromatopsia contralateral.',
        cognitiveAfective: 'Agnosia visual de objetos y colores con función mnésica y ejecutiva lúcida.'
      },
      nihssScoreTypical: 8,
      clinicalSummary: 'El ejemplo paradigmático de síndrome de desconexión cerebral descrito por Déjerine en 1892. El infarto destruye la corteza visual izquierda (V1) y las fibras comisurales del esplenio del cuerpo calloso, impidiendo que la información visual del hemisferio derecho alcance el centro del lenguaje en el hemisferio izquierdo.',
      emergencyIntervention: 'Trombectomía o recanalización intraarterial selectiva del segmento P1/P2/P3.'
    }
  },

  BASILAR_PICA: {
    id: 'BASILAR_PICA',
    name: 'Territorio Vertebrobasilar & PICA (Bulbo Lateral y Fosa Posterior)',
    arteryCategory: 'Circulación Posterior (Vertebrobasilar)',
    vesselOrigin: 'Arteria Vertebral intracraneal / Arteria Basilar',
    anatomicBranches: ['Arteria Cerebelosa Posteroinferior (PICA)', 'Arterias Circunferenciales Bulbares'],
    color: '#f59e0b',
    strokeProfile: {
      id: 'STROKE_WALLENBERG',
      syndromeName: 'Síndrome Bulbar Lateral (Síndrome de Wallenberg por Oclusión PICA)',
      culpritVessel: 'Arteria Cerebelosa Posteroinferior (PICA) o Arteria Vertebral Izquierda',
      affectedRegionIds: ['SUBCORTICAL_BRAINSTEM_NUC', 'SUBCORTICAL_SN'],
      affectedTractIds: ['TRACT_CEREBELLAR_PEDUNCLE', 'TRACT_THALAMIC_RADIATION'],
      neurologicalDeficits: {
        motor: 'Ausencia de plejia de extremidades; pero disfonía, disartria y parálisis velopalatina con disfagia severa por lesión del núcleo ambiguo (pares IX y X).',
        sensory: 'Sensibilidad cruzada clásica: hipoestesia termoalgésica facial ipsilesional (núcleo trigémino espinal) combinada con hipoestesia termoalgésica corporal contralateral (tracto espinotalámico).',
        language: 'Lenguaje cortical normal; habla ronca/velofaríngea.',
        visual: 'Síndrome de Horner ipsilesional (ptosis, miosis, enoftalmos y anhidrosis) por lesión de las fibras simpáticas descendentes.',
        cognitiveAfective: 'Vértigo rotatorio severo, vómitos intratables, nistagmo multidireccional e hipo intratable con ataxia de extremidades ipsilesional.'
      },
      nihssScoreTypical: 10,
      clinicalSummary: 'Uno de los cuadros de diagnóstico topográfico neurológico más exquisitos y ricos de la medicina clínica. La micro-isquemia del cuadrante dorsolateral del bulbo raquídeo genera la tríada de Horner + ataxia cerebelosa ipsilesional + pérdida sensorial cruzada.',
      emergencyIntervention: 'Manejo en Unidad de Ictus neurocrítico, monitorización respiratoria por riesgo de aspiración y broncoaspiración, trombólisis/trombectomía si arteria vertebral o basilar están ocluidas.'
    }
  }
};
