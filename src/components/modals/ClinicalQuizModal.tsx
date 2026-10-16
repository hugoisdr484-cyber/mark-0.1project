import React, { useState } from 'react';
import { Stethoscope, X, CheckCircle, AlertTriangle, ChevronRight, Brain, Zap, HelpCircle } from 'lucide-react';
import { useNeuroStore } from '../../store/useNeuroStore';

interface ClinicalCase {
  id: string;
  title: string;
  patientProfile: string;
  vignette: string;
  examFindings: string[];
  targetRegionId: string;
  targetTractId: string;
  targetStrokeTerritory: string;
  correctAnswerText: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  pathophysiologySummary: string;
  keyPearl: string;
}

const CLINICAL_CASES: ClinicalCase[] = [
  {
    id: 'CASE_1',
    title: 'Caso 1: Alexia sin Agrafia tras Evento Cardioembólico',
    patientProfile: 'Varón de 62 años con fibrilación auricular no anticoagulada',
    vignette: 'El paciente es llevado a urgencias porque de manera súbita comenzó a quejarse de "no poder leer el periódico matutino". Al pedirle que escriba una nota a su esposa, escribe con caligrafía perfecta y coherencia: "Hoy hace frío". Sin embargo, segundos después es totalmente incapaz de leer lo que acaba de escribir. Su habla es espontánea y fluida.',
    examFindings: [
      'Hemianopsia homónima derecha con respeto macular parcial.',
      'Capacidad de escritura espontánea y al dictado perfectamente conservada.',
      'Incapacidad total de lectura (alexia pura).',
      'Hemi-acromatopsia en hemicampo visual derecho.'
    ],
    targetRegionId: 'GLASSER_V1',
    targetTractId: 'TRACT_CORPUS_CALLOSUM',
    targetStrokeTerritory: 'PCA_P3',
    correctAnswerText: 'Corteza Visual Izquierda (V1 Calcarina) + Esplenio del Cuerpo Calloso (Territorio ACP P3)',
    options: [
      {
        id: 'opt_1',
        text: 'Corteza Visual Izquierda (V1 Calcarina) + Esplenio del Cuerpo Calloso (ACP P3)',
        isCorrect: true,
        explanation: '¡Diagnóstico topográfico exacto! El infarto en territorio de la ACP izquierda destruye la corteza visual occipital izquierda y el esplenio calloso. La información visual del ojo izquierdo (procesada por el hemisferio derecho) no puede cruzar hacia el área del lenguaje en el hemisferio izquierdo (Síndrome de Déjerine).'
      },
      {
        id: 'opt_2',
        text: 'Área de Broca (44/45) y Fascículo Aslant Frontal (ACM M2 Superior)',
        isCorrect: false,
        explanation: 'Incorrecto. La lesión de Broca produce habla no fluida con agramatismo y apraxia del habla, no una alexia sin agrafia.'
      },
      {
        id: 'opt_3',
        text: 'Complejo de Wernicke (PSL/STV) y Giro Angular (ACM M2 Inferior)',
        isCorrect: false,
        explanation: 'Incorrecto. La lesión en giro angular causa Alexia CON Agrafia (Síndrome de Gerstmann) donde se pierde tanto la lectura como la escritura.'
      },
      {
        id: 'opt_4',
        text: 'Brazo Posterior de Cápsula Interna por Arterias Lenticuloestriadas',
        isCorrect: false,
        explanation: 'Incorrecto. La cápsula interna produce hemiplejia motora pura contralateral, sin defectos campimétricos ni alexia aislada.'
      }
    ],
    pathophysiologySummary: 'Doble lesión anatómica clave: 1) Destrucción de V1 izquierda genera hemianopsia homónima derecha. 2) Interrupción de las fibras comisurales del esplenio calloso impide que la corteza visual derecha transfiera las imágenes visuales hacia la corteza temporal izquierda del lenguaje.',
    keyPearl: 'Regla de Oro: Escritura preservada + Lectura destruida = Infarto de ACP Izquierda afectando Esplenio del Cuerpo Calloso.'
  },
  {
    id: 'CASE_2',
    title: 'Caso 2: Afasia No Fluida Aguda con Plejia Braquial',
    patientProfile: 'Mujer de 54 años con hipertensión arterial no controlada y tabaquismo',
    vignette: 'Presenta pérdida súbita de la fuerza en la mano y hemicara derechas. Al intentar comunicarse emite únicamente monosílabos entrecortados con gran esfuerzo articulatorio ("si... no... agua"). Cuando se le pide que señale objetos en la habitación o ejecute órdenes de dos pasos ("toque su nariz y cierre los ojos"), comprende y obedece de inmediato.',
    examFindings: [
      'Paresia faciobraquial derecha severa (fuerza 1/5 en brazo, 4/5 en pierna).',
      'Habla con gran esfuerzo articulatorio, telegráfica y agramática.',
      'Comprensión auditiva intacta para órdenes complejas.',
      'Desviación oculocefálica conjugada hacia la izquierda (los ojos miran al lado del infarto).'
    ],
    targetRegionId: 'GLASSER_44',
    targetTractId: 'TRACT_ARCUATE',
    targetStrokeTerritory: 'MCA_SUPERIOR',
    correctAnswerText: 'Área 44/45 de Broca & Corteza Motora M1 (División Superior de ACM Izquierda)',
    options: [
      {
        id: 'opt_1',
        text: 'Área 44/45 de Broca & Corteza Motora M1 (División Superior de ACM M2 Izquierda)',
        isCorrect: true,
        explanation: '¡Correcto! El territorio de la división superior de la ACM irriga tanto el opérculo frontal (Broca 44/45) como el área prerrolándica motora de cara y brazo, produciendo la afasia motora típica combinada con paresia faciobraquial contralateral.'
      },
      {
        id: 'opt_2',
        text: 'Área PSL de Wernicke y Radiaciones Acústicas (División Inferior ACM)',
        isCorrect: false,
        explanation: 'Incorrecto. La división inferior de la ACM afecta la comprensión auditiva (afasia fluida de Wernicke) y preserva la fuerza motora.'
      },
      {
        id: 'opt_3',
        text: 'Corteza Cingular Anterior (dACC) e Isquemia de ACA A2',
        isCorrect: false,
        explanation: 'Incorrecto. La isquemia de ACA produce debilidad predominante en la pierna contralateral (homúnculo crural), no en la cara y brazo.'
      },
      {
        id: 'opt_4',
        text: 'Tálamo Dorsal VPL y Radiación Talámica Somatosensorial',
        isCorrect: false,
        explanation: 'Incorrecto. El tálamo VPL produce pérdida sensorial pura contralateral (hemihipoestesia), sin afasia motora de Broca.'
      }
    ],
    pathophysiologySummary: 'Oclusión embólica en el tronco de la división superior de la ACM en el opérculo insular, interrumpiendo la perfusión de las ramas prerrolándicas y frontales ascendentes de Duret.',
    keyPearl: 'Afectación faciobraquial > crural + afasia no fluida = Territorio Superior de ACM Izquierda.'
  },
  {
    id: 'CASE_3',
    title: 'Caso 3: Síndrome Bulbar Lateral (Wallenberg)',
    patientProfile: 'Varón de 49 años con dolor cervical súbito tras manipulación quiropráctica',
    vignette: 'Comienza de forma aguda con vértigo rotatorio invalidante, vómitos, voz ronca apagada (disfonía) y dificultad extrema para deglutir su propia saliva. Al examen neurológico presenta marcha con lateropulsión izquierda.',
    examFindings: [
      'Síndrome de Horner izquierdo: ptosis palpebral, miosis y enoftalmos.',
      'Hipoestesia termoalgésica en hemicara izquierda (núcleo trigeminal espinal).',
      'Hipoestesia termoalgésica en hemicuerpo derecho tronco y extremidades (tracto espinotalámico lateral).',
      'Ataxia de extremidades y dismetría dedo-nariz en lado izquierdo.'
    ],
    targetRegionId: 'SUBCORTICAL_BRAINSTEM_NUC',
    targetTractId: 'TRACT_CEREBELLAR_PEDUNCLE',
    targetStrokeTerritory: 'BASILAR_PICA',
    correctAnswerText: 'Bulbo Raquídeo Dorsolateral Izquierdo / Arteria Cerebelosa Posteroinferior (PICA)',
    options: [
      {
        id: 'opt_1',
        text: 'Bulbo Raquídeo Dorsolateral Izquierdo / Arteria Cerebelosa Posteroinferior (PICA)',
        isCorrect: true,
        explanation: '¡Brillante deducción! Es el Síndrome de Wallenberg por disección de la arteria vertebral o trombosis de la PICA. El déficit sensitivo cruzado (cara ipsilateral + cuerpo contralateral) es patognomónico del bulbo lateral.'
      },
      {
        id: 'opt_2',
        text: 'Corteza Somatosensorial Primaria S1 y Lemnisco Medial Parietal',
        isCorrect: false,
        explanation: 'Incorrecto. Una lesión cortical de S1 produce pérdida sensorial hemicorporal completa contralateral (cara y cuerpo del mismo lado).'
      },
      {
        id: 'opt_3',
        text: 'Corteza Insular Anterior Ventral (AVI) y Fascículo Uncinado',
        isCorrect: false,
        explanation: 'Incorrecto. La ínsula modula la saliencia y la interocepción, no produce la tríada de Horner + ataxia + hipoestesia cruzada.'
      },
      {
        id: 'opt_4',
        text: 'Arteria Basilar Troncal en Puente Medio (Síndrome de Enclaustramiento)',
        isCorrect: false,
        explanation: 'Incorrecto. El puente anterior causa tetraplejia con preservación exclusiva del parpadeo vertical (locked-in syndrome).'
      }
    ],
    pathophysiologySummary: 'La isquemia del bulbo dorsolateral compromete simultáneamente: 1) Núcleo ambiguo (pares IX/X: disfagia/disfonía), 2) Núcleo espinal del V (cara ipsi), 3) Tracto espinotalámico (cuerpo contra), 4) Fibras simpáticas descendentes (Horner ipsi), y 5) Pedúnculo cerebeloso inferior (ataxia ipsi).',
    keyPearl: 'Hipoestesia cruzada (cara ipsilateral + cuerpo contralateral) = Lesión de tronco encefálico (Bulbo Lateral).'
  },
  {
    id: 'CASE_4',
    title: 'Caso 4: Afasia de Wernicke y Cuadrantanopsia Superior',
    patientProfile: 'Mujer de 71 años con prótesis valvular mitral mecánica',
    vignette: 'Encontrada por su familia conversando de forma acelerada pero incomprensible: "El tren de las flores vino cantando en el reloj de pan". No comprende preguntas sencillas como "¿Cuál es su nombre?", respondiendo con oraciones largas llenas de neologismos y parafasias. No presenta debilidad en las extremidades.',
    examFindings: [
      'Habla fluida, con entonación normal pero vacía de contenido semántico (jergafasia).',
      'Comprensión del lenguaje hablado y escrito severamente abolida.',
      'Pérdida del cuadrante visual superior derecho en campimetría por confrontación.',
      'Ausencia total de debilidad motora en hemicuerpo derecho.'
    ],
    targetRegionId: 'GLASSER_PSL',
    targetTractId: 'TRACT_OPTIC_RADIATION',
    targetStrokeTerritory: 'MCA_INFERIOR',
    correctAnswerText: 'Área PSL de Wernicke y Asa de Meyer Temporal (División Inferior de ACM Izquierda)',
    options: [
      {
        id: 'opt_1',
        text: 'Área PSL de Wernicke y Asa de Meyer Temporal (División Inferior de ACM Izquierda)',
        isCorrect: true,
        explanation: '¡Excelente! La división inferior de la ACM irriga la corteza temporal superior posterior (Wernicke) y las fibras profundas del Asa de Meyer que rodean el asta temporal, provocando afasia fluida combinada con cuadrantanopsia superior contralateral.'
      },
      {
        id: 'opt_2',
        text: 'Área Motora Suplementaria (6d/SMA) y Arteria Cerebral Anterior',
        isCorrect: false,
        explanation: 'Incorrecto. El área motora suplementaria se ubica en el lóbulo frontal medial y no compromete el lenguaje receptivo ni los campos visuales.'
      },
      {
        id: 'opt_3',
        text: 'Corteza Prefrontal Dorsolateral (9-46d) y SLF II',
        isCorrect: false,
        explanation: 'Incorrecto. La DLPFC afecta funciones ejecutivas (memoria de trabajo, planificación), sin jergafasia ni defectos campimétricos.'
      },
      {
        id: 'opt_4',
        text: 'Cuerpo Estriado y Cápsula Interna por Arteria de Charcot',
        isCorrect: false,
        explanation: 'Incorrecto. La cápsula interna produce parálisis motora densa sin alteración de la comprensión semántica.'
      }
    ],
    pathophysiologySummary: 'Infarto temporoparietal izquierdo que desestructura el lexicón fonológico receptivo y corta las fibras visuales geniculocalcarinas temporales anteriores.',
    keyPearl: 'Habla fluida pero incomprensible + Cuadrantanopsia superior = Territorio Inferior de ACM Izquierda.'
  },
  {
    id: 'CASE_5',
    title: 'Caso 5: Hemiplejia Motora Pura Lacunar',
    patientProfile: 'Varón de 65 años con diabetes mellitus tipo 2 e hipertensión de larga data',
    vignette: 'Despierta por la mañana con imposibilidad completa de mover el brazo y la pierna derechos, y la comisura labial derecha caída. Habla con fluidez y claridad mental perfecta, comprende todo sin dificultad y no tiene alteración de la visión ni de la sensibilidad.',
    examFindings: [
      'Paresia proporcional densa 0/5 en miembro superior y 0/5 en miembro inferior derecho.',
      'Paresia facial central derecha (afecta tercio inferior de la cara).',
      'Signo de Babinski derecho positivo con hiperreflexia rotuliana.',
      'Sensibilidad táctil, algésica y campos visuales totalmente normales. Ausencia de afasia.'
    ],
    targetRegionId: 'SUBCORTICAL_STRIATUM',
    targetTractId: 'TRACT_CORTICOSPINAL',
    targetStrokeTerritory: 'MCA_LENTICULOSTRIATE',
    correctAnswerText: 'Brazo Posterior de Cápsula Interna / Arterias Lenticuloestriadas de Charcot',
    options: [
      {
        id: 'opt_1',
        text: 'Brazo Posterior de Cápsula Interna / Arterias Lenticuloestriadas de Charcot',
        isCorrect: true,
        explanation: '¡Precisión clínica absoluta! Es el síndrome lacunar de Hemiplejia Motora Pura. Las arterias perforantes lenticuloestriadas de ACM M1 sufren lipohialinosis oclusiva, destruyendo el tracto corticoespinal condensado en el brazo posterior capsular sin tocar la corteza.'
      },
      {
        id: 'opt_2',
        text: 'Corteza Motora Primaria M1 Completa (ACM Cortical)',
        isCorrect: false,
        explanation: 'Incorrecto. La lesión cortical de M1 es desproporcionada (faciobraquial > crural) y casi siempre se acompaña de afasia o negligencia espacial cortical.'
      },
      {
        id: 'opt_3',
        text: 'Corteza Calcarina V1 y Radiaciones Ópticas (ACP P3)',
        isCorrect: false,
        explanation: 'Incorrecto. La corteza calcarina produce hemianopsia homónima visual, sin debilidad motora en ninguna extremidad.'
      },
      {
        id: 'opt_4',
        text: 'Pedúnculo Cerebeloso Medio y Vermis Cerebeloso',
        isCorrect: false,
        explanation: 'Incorrecto. El cerebelo produce ataxia y dismetría, jamás una hemiplejia piramidal espástica con signo de Babinski.'
      }
    ],
    pathophysiologySummary: 'Lipohialinosis microangiopática de una sola arteriola perforante lenticuloestriada (<200 µm de diámetro) que ocasiona necrosis coagulativa lacunar en la rodilla y brazo posterior de la cápsula interna.',
    keyPearl: 'Pérdida motora proporcional pura sin afasia ni déficit sensorial = Infarto Lacunar de Cápsula Interna.'
  }
];

export const ClinicalQuizModal: React.FC = () => {
  const isClinicalQuizOpen = useNeuroStore((state) => state.isClinicalQuizOpen);
  const setIsClinicalQuizOpen = useNeuroStore((state) => state.setIsClinicalQuizOpen);
  const setSelectedNodeId = useNeuroStore((state) => state.setSelectedNodeId);
  const setSelectedTractId = useNeuroStore((state) => state.setSelectedTractId);
  const setActiveStrokeId = useNeuroStore((state) => state.setActiveStrokeId);
  const setShowVasculature = useNeuroStore((state) => state.setShowVasculature);

  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  if (!isClinicalQuizOpen) return null;

  const currentCase = CLINICAL_CASES[currentCaseIndex];
  const selectedOption = currentCase.options.find((o) => o.id === selectedOptionId);

  const handleSelectOption = (optionId: string) => {
    setSelectedOptionId(optionId);
    setShowFeedback(true);
  };

  const handleNextCase = () => {
    setSelectedOptionId(null);
    setShowFeedback(false);
    setCurrentCaseIndex((prev) => (prev + 1) % CLINICAL_CASES.length);
  };

  const handleApplyTo3D = () => {
    // Sincronizar el visor 3D en tiempo real con este caso
    setSelectedNodeId(currentCase.targetRegionId);
    setSelectedTractId(currentCase.targetTractId);
    if (currentCase.targetStrokeTerritory) {
      setActiveStrokeId(currentCase.targetStrokeTerritory === 'MCA_SUPERIOR' ? 'STROKE_MCA_SUPERIOR' :
        currentCase.targetStrokeTerritory === 'MCA_INFERIOR' ? 'STROKE_MCA_INFERIOR' :
        currentCase.targetStrokeTerritory === 'MCA_LENTICULOSTRIATE' ? 'STROKE_LENTICULOSTRIATE' :
        currentCase.targetStrokeTerritory === 'PCA_P3' ? 'STROKE_PCA_CALCARINE' :
        currentCase.targetStrokeTerritory === 'BASILAR_PICA' ? 'STROKE_WALLENBERG' : null);
      setShowVasculature(true);
    }
    setIsClinicalQuizOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl glass-panel rounded-2xl border border-cyan-500/40 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-cyan-500/25 bg-[#091524]/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-300">
              <Stethoscope className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-900/50 text-cyan-300 border border-cyan-500/30">
                  CASO {currentCaseIndex + 1} DE {CLINICAL_CASES.length}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  DIAGNÓSTICO TOPOGRÁFICO NEUROLÓGICO
                </span>
              </div>
              <h2 className="text-sm font-mono font-bold text-white mt-0.5">
                {currentCase.title}
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsClinicalQuizOpen(false)}
            className="p-1.5 rounded-lg hover:bg-slate-800/60 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 text-xs font-mono">
          {/* Patient Profile & Clinical Vignette */}
          <div className="bg-[#0b1728]/70 rounded-xl p-3.5 border border-cyan-500/20 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-cyan-300 font-semibold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>PERFIL: {currentCase.patientProfile}</span>
            </div>
            <p className="text-slate-200 leading-relaxed font-sans text-xs">
              {currentCase.vignette}
            </p>
          </div>

          {/* Exam Findings Checklist */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              HALLAZGOS AL EXAMEN NEUROLÓGICO:
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {currentCase.examFindings.map((finding, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 rounded bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300 font-sans">
                  <span className="text-cyan-400 font-mono font-bold">•</span>
                  <span>{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Question / Options */}
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
            <span className="text-[11px] font-mono font-bold text-cyan-200 uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              ¿CUÁL ES LA ESTRUCTURA / VÍA ANATÓMICA Y EL TERRITORIO ARTERIAL AFECTADO?
            </span>

            <div className="grid grid-cols-1 gap-2">
              {currentCase.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                return (
                  <button
                    key={opt.id}
                    disabled={showFeedback}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-3 rounded-xl border text-left font-mono transition-all text-[11px] flex items-center justify-between ${
                      showFeedback
                        ? opt.isCorrect
                          ? 'bg-emerald-950/50 border-emerald-500 text-emerald-200'
                          : isSelected
                          ? 'bg-rose-950/50 border-rose-500 text-rose-200'
                          : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
                        : isSelected
                        ? 'bg-cyan-950/60 border-cyan-400 text-cyan-200'
                        : 'bg-[#081220]/70 hover:bg-[#0c1c30] border-cyan-500/20 text-slate-200 hover:border-cyan-500/50'
                    }`}
                  >
                    <span>{opt.text}</span>
                    {showFeedback && (
                      opt.isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      ) : isSelected ? (
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                      ) : null
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Pathophysiology Section */}
          {showFeedback && selectedOption && (
            <div className={`rounded-xl p-4 border flex flex-col gap-3 animate-fadeIn ${
              selectedOption.isCorrect
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
            }`}>
              <div className="flex items-center gap-2 font-bold text-xs">
                {selectedOption.isCorrect ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>¡CORRECTO! TOPOGRAFÍA LESIONAL CONFIRMADA</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>RESPUESTA INCORRECTA — REVISIÓN ANATÓMICA</span>
                  </>
                )}
              </div>

              <p className="text-[11px] leading-relaxed font-sans text-slate-200">
                {selectedOption.explanation}
              </p>

              <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80 flex flex-col gap-1 text-[11px]">
                <span className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  PERLA CLÍNICA:
                </span>
                <p className="text-slate-300 font-sans italic">
                  {currentCase.keyPearl}
                </p>
              </div>

              {/* Action: Enviar al Visor 3D y Siguiente Caso */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleApplyTo3D}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-mono font-bold text-[11px] transition-all shadow-lg"
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>VER ESTA LESIÓN EN EL VISOR 3D</span>
                </button>

                <button
                  onClick={handleNextCase}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-[11px] transition-all"
                >
                  <span>SIGUIENTE CASO</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
