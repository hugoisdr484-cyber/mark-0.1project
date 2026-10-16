/**
 * Base de datos de información anatómica para estructuras disecables que NO son un nodo de Glasser
 * (giros corticales, subcorticales, núcleos talámicos, subtálamo y tronco encefálico).
 * Alimenta la cabecera del panel izquierdo cuando se selecciona una pieza 3D.
 */
export interface StructureInfo {
  /** Lóbulo / región (para la insignia [LÓBULO // MNI]) */
  lobe: string;
  /** Coordenada MNI aproximada del centroide (hemisferio izquierdo; x se refleja para el derecho) */
  mni: [number, number, number];
  /** Equivalencia clásica de Brodmann (o "—" si no aplica) */
  brodmann: string;
  /** Territorio arterial */
  artery: string;
  /** Función principal */
  func: string;
  /** Correlato clínico breve */
  clinical: string;
}

const G = (
  lobe: string,
  mni: [number, number, number],
  brodmann: string,
  artery: string,
  func: string,
  clinical: string
): StructureInfo => ({ lobe, mni, brodmann, artery, func, clinical });

export const STRUCTURE_INFO: Record<string, StructureInfo> = {
  // ---------------- Giros corticales ----------------
  Cortex_Precentral: G('Frontal', [-38, -14, 56], 'BA 4 (M1)', 'ACM — ramas precentral y central (candelabro)', 'Ejecución del movimiento voluntario contralateral (homúnculo motor).', 'Hemiparesia/monoparesia contralateral por infarto de ACM superior o ACA.'),
  Cortex_Postcentral: G('Parietal', [-42, -30, 54], 'BA 3, 1, 2 (S1)', 'ACM — ramas parietal anterior y central', 'Somatosensación discriminativa: tacto fino, propiocepción, estereognosia.', 'Hipoestesia cortical contralateral, astereognosia.'),
  Cortex_Frontal_Sup: G('Frontal', [-18, 34, 48], 'BA 6 (AMS) / BA 8', 'ACA y ACM (ramas frontales)', 'Planificación motora y área motora suplementaria.', 'Síndrome de AMS: mutismo transitorio, acinesia contralateral.'),
  Cortex_Frontal_Mid: G('Frontal', [-38, 28, 32], 'BA 9 / BA 46 (DLPFC)', 'ACM — rama prefrontal', 'Memoria de trabajo y control ejecutivo.', 'Síndrome disejecutivo, perseveración.'),
  Cortex_Broca: G('Frontal', [-50, 15, 11], 'BA 44 / BA 45', 'ACM — rama opercular / prefrontal (división superior)', 'Producción del lenguaje y secuenciación fonológica.', 'Afasia de Broca (motora, no fluente).'),
  Cortex_Orbitofrontal: G('Frontal', [-24, 34, -16], 'BA 11 / BA 47', 'ACA (orbitofrontal) y ACM inferior', 'Valoración de recompensa y toma de decisiones.', 'Desinhibición, cambios de personalidad.'),
  Cortex_Frontopolar: G('Frontal', [-10, 60, 4], 'BA 10', 'ACA — arteria frontopolar', 'Cognición de orden superior y multitarea.', 'Apatía y pérdida de iniciativa.'),
  Cortex_Parietal_Sup: G('Parietal', [-24, -60, 52], 'BA 5 / BA 7', 'ACM (rama parietal posterior), ACA y ACP', 'Integración visuoespacial y atención espacial.', 'Ataxia óptica, apraxia, negligencia (derecho).'),
  Cortex_Supramarginal: G('Parietal', [-52, -40, 34], 'BA 40', 'ACM — rama parietal posterior', 'Bucle fonológico y praxis.', 'Afasia de conducción, apraxia ideomotora.'),
  Cortex_Angular: G('Parietal', [-46, -62, 30], 'BA 39', 'ACM — rama angular', 'Lectura, cálculo e integración semántica.', 'Síndrome de Gerstmann.'),
  Cortex_Temporal_Sup: G('Temporal', [-56, -18, 4], 'BA 22 / BA 41 / BA 42', 'ACM — ramas temporales (división inferior)', 'Audición primaria y comprensión del lenguaje (Wernicke).', 'Afasia de Wernicke (sensitiva, fluente).'),
  Cortex_Temporal_Mid: G('Temporal', [-58, -28, -6], 'BA 21', 'ACM temporal media y ACP', 'Memoria semántica y movimiento visual (MT).', 'Anomia, déficit semántico.'),
  Cortex_Temporal_Inf: G('Temporal', [-52, -34, -20], 'BA 20', 'ACP — ramas temporales inferiores', 'Vía visual ventral: reconocimiento de objetos.', 'Agnosia visual de objetos.'),
  Cortex_Temporal_Pole: G('Temporal', [-40, 10, -30], 'BA 38', 'ACM — rama temporopolar', 'Procesamiento emocional y semántico social.', 'Demencia semántica (variante temporal de DFT).'),
  Cortex_Occipital: G('Occipital', [-14, -92, 6], 'BA 17 / BA 18 / BA 19', 'ACP — rama calcarina', 'Visión primaria y asociativa (V1–V3).', 'Hemianopsia homónima contralateral con respeto macular.'),
  Cortex_Fusiform: G('Occipitotemporal', [-36, -52, -18], 'BA 37', 'ACP — ramas temporales inferiores', 'Reconocimiento de rostros y palabras (FFA / VWFA).', 'Prosopagnosia, alexia pura.'),
  Cortex_Cingulate: G('Límbico', [-4, -8, 38], 'BA 23, 24, 25, 29–33', 'ACA — arterias pericallosa y callosomarginal', 'Motivación, dolor afectivo y monitorización de conflicto.', 'Mutismo acinético (bilateral).'),
  Cortex_Insula: G('Insular', [-38, -4, 2], 'BA 13–16', 'ACM — ramas insulares (segmento M2)', 'Interocepción, gusto, dolor y saliencia.', 'Alteraciones autonómicas, disgeusia, asimbolia al dolor.'),
  Cortex_Medial: G('Límbico', [-18, -34, -12], 'BA 27 / 28 / 35 / 36', 'ACP — ramas temporales mediales', 'Memoria episódica (circuito parahipocámpico).', 'Amnesia anterógrada.'),

  // ---------------- Estructuras subcorticales ----------------
  Corpus_Callosum: G('Comisura', [0, -18, 20], '—', 'ACA (pericallosa) y ACP (esplenial)', 'Comunicación interhemisférica.', 'Síndrome de desconexión callosa, mano ajena.'),
  Fornix: G('Límbico', [0, -10, 12], '—', 'ACoA, coroidea anterior', 'Vía eferente del hipocampo hacia cuerpos mamilares.', 'Amnesia por lesión fornical.'),
  Thalamus: G('Diencéfalo', [-10, -19, 6], '—', 'Tuberotalámica, paramediana, talamogeniculada y coroidea posterior', 'Relevo sensitivo-motor hacia la corteza.', 'Síndrome de Dejerine-Roussy.'),
  Caudate: G('Ganglios Basales', [-13, 12, 10], '—', 'Arterias lenticuloestriadas (ACM) y arteria de Heubner (ACA)', 'Aprendizaje, cognición y control motor (estriado).', 'Corea de Huntington.'),
  Putamen: G('Ganglios Basales', [-25, 2, 0], '—', 'Arterias lenticuloestriadas laterales (ACM)', 'Control motor y aprendizaje de hábitos.', 'Parkinsonismo, distonía.'),
  Pallidum: G('Ganglios Basales', [-19, -4, -1], '—', 'Coroidea anterior y lenticuloestriadas', 'Salida inhibitoria GABAérgica de los ganglios basales.', 'Distonía, DBS pálido interno.'),
  Hippocampus: G('Temporal Medial', [-26, -22, -14], '—', 'ACP y coroidea anterior', 'Consolidación de memoria episódica y navegación espacial.', 'Esclerosis mesial temporal, amnesia.'),
  Amygdala: G('Temporal Medial', [-23, -4, -20], '—', 'Coroidea anterior, ACM (ramas perforantes)', 'Procesamiento emocional y miedo.', 'Síndrome de Klüver-Bucy.'),
  Ventricles: G('Sistema Ventricular', [-10, -10, 20], '—', 'Plexos coroideos (coroidea anterior y posterior)', 'Producción y circulación de LCR.', 'Hidrocefalia.'),

  // ---------------- Núcleos talámicos ----------------
  Thal_ATN: G('Tálamo', [-5, -6, 11], '—', 'Arteria tuberotalámica (polar) — comunicante posterior', 'Circuito de Papez: memoria episódica (fórnix → cuerpos mamilares → ATN → cíngulo).', 'Amnesia diencefálica, síndrome de Korsakoff.'),
  Thal_MD: G('Tálamo', [-6, -18, 8], '—', 'Tuberotalámica y talamoperforantes paramedianas', 'Relevo hacia la corteza prefrontal: emoción, memoria y ejecutivo.', 'Infarto paramediano: hipersomnia, abulia, amnesia.'),
  Thal_VA: G('Tálamo', [-10, -8, 6], '—', 'Arteria tuberotalámica', 'Relevo motor del globo pálido hacia premotor / AMS (vía indirecta e inicio del movimiento).', 'Acinesia y alteración del inicio motor.'),
  Thal_VL: G('Tálamo', [-14, -15, 4], '—', 'Tuberotalámica y talamogeniculada', 'Relevo motor cerebeloso (dentado) y pálido hacia M1 (diana de DBS en temblor).', 'Temblor y ataxia contralateral.'),
  Thal_VPL: G('Tálamo', [-17, -24, 2], '—', 'Arteria talamogeniculada (ACP, P2)', 'Relevo somatosensitivo del cuerpo (lemnisco medial y espinotalámico).', 'Síndrome de Dejerine-Roussy (hemianestesia + dolor central).'),
  Thal_VPM: G('Tálamo', [-9, -24, 0], '—', 'Arteria talamogeniculada (ACP, P2)', 'Relevo somatosensitivo y gustativo de la cara (trigémino).', 'Hemianestesia facial contralateral.'),
  Thal_LGN: G('Tálamo', [-22, -28, -3], '—', 'Coroidea anterior (hilio) y talamogeniculada', 'Vía visual: relevo retina → radiación óptica → V1.', 'Cuadrantanopsia / hemianopsia en sector (coroidea anterior).'),
  Thal_MGN: G('Tálamo', [-14, -29, -3], '—', 'Arteria talamogeniculada y coroidea posterior', 'Vía auditiva: relevo del colículo inferior hacia A1 (BA 41).', 'Hipoacusia central, agnosia auditiva.'),
  Thal_Pulvinar: G('Tálamo', [-14, -31, 7], '—', 'Coroidea posterior lateral y talamogeniculada', 'Atención visual y asociación multimodal parietotemporal.', 'Negligencia visual, déficit atencional.'),

  // ---------------- Subtálamo ----------------
  STN: G('Subtálamo', [-10, -13, -5], '—', 'Coroidea posterior medial y perforantes de la comunicante posterior / ACP', 'Núcleo glutamatérgico excitador de la vía indirecta (→ GPi/SNr); diana de DBS en Parkinson.', 'Hemibalismo contralateral por infarto del STN.'),
  ZI: G('Subtálamo', [-13, -13, 0], '—', 'Perforantes de la comunicante posterior y ACP', 'Integración motora y nociceptiva; conecta con globo pálido y vía indirecta motora.', 'Diana de DBS en temblor (zona incerta caudal).'),
  SN: G('Subtálamo / Mesencéfalo', [-10, -17, -11], '—', 'Perforantes de ACP y coroidea anterior', 'Pars compacta: dopamina nigroestriatal; pars reticulata: salida GABAérgica.', 'Pérdida dopaminérgica en la enfermedad de Parkinson.'),

  // ---------------- Bulbo raquídeo ----------------
  Medulla: G('Bulbo', [0, -36, -52], '—', 'Arteria espinal anterior/posterior, PICA y ramas vertebrales', 'Centros cardiorrespiratorios, núcleos de IX–XII y tractos ascendentes/descendentes.', 'Síndrome de Wallenberg (bulbar lateral) y síndrome de Dejerine (bulbar medial).'),
  Pons: G('Protuberancia', [0, -30, -30], '—', 'Arteria basilar (paramedianas y circunferenciales)', 'Relevo corticopontocerebeloso; núcleos de V, VI, VII y VIII.', 'Síndrome de locked-in, oftalmoplejía internuclear.'),
  Midbrain: G('Mesencéfalo', [0, -28, -10], '—', 'ACP, cerebelosa superior y coroidea anterior', 'Pedúnculos cerebrales, colículos y núcleos de III y IV.', 'Síndrome de Weber, Benedikt y Parinaud.'),
  Medulla_Pyramid: G('Bulbo', [-3, -34, -50], '—', 'Arteria espinal anterior', 'Haces corticoespinales descendentes (motilidad voluntaria).', 'Síndrome medular medial (Dejerine): hemiparesia contralateral.'),
  Medulla_Decussation: G('Bulbo', [0, -36, -66], '—', 'Arteria espinal anterior', 'Decusación piramidal: cruce del ~85-90 % de las fibras corticoespinales.', 'Lesión cruzada: déficit motor cruzado a nivel cervical alto.'),
  Medulla_Olive: G('Bulbo', [-8, -33, -49], '—', 'PICA y ramas bulbares de la arteria vertebral', 'Núcleo olivar inferior: aprendizaje motor cerebeloso (fibras trepadoras).', 'Síndrome de Wallenberg (PICA); temblor palatino por hipertrofia olivar.'),
  Medulla_PreolivarGroove: G('Bulbo', [-5.6, -34, -50], '—', 'Arteria espinal anterior', 'Surco preolivar (anterolateral): emergencia de las raicillas del XII par (hipogloso).', 'Parálisis lingual ipsilateral.'),
  Medulla_RetroolivarGroove: G('Bulbo', [-11, -36, -50], '—', 'PICA', 'Surco retroolivar (posterolateral): emergencia de IX, X y XI.', 'Disfagia, disfonía y paresia del trapecio.'),
  Medulla_Gracile: G('Bulbo', [-2.6, -48, -58], '—', 'Arteria espinal posterior', 'Tubérculo grácil (núcleo de Goll): columna posterior, miembro inferior.', 'Pérdida de propiocepción de las piernas.'),
  Medulla_Cuneate: G('Bulbo', [-6.4, -46, -55], '—', 'Arteria espinal posterior y PICA', 'Tubérculo cuneiforme (núcleo de Burdach): columna posterior, miembro superior.', 'Pérdida de propiocepción de los brazos.'),

  // ---------------- Protuberancia y mesencéfalo ----------------
  Pons_BasilarGroove: G('Protuberancia', [0, -22, -31], '—', 'Arteria basilar (ramas paramedianas y circunferenciales)', 'Surco basilar: alberga la arteria basilar sobre la base pontina.', 'Trombosis basilar: síndrome de enclaustramiento (locked-in).'),
  Midbrain_Peduncle: G('Mesencéfalo', [-8.5, -26, -12], '—', 'Perforantes de ACP y coroidea anterior', 'Pedúnculos cerebrales: haces corticoespinal, corticobulbar y corticopontino.', 'Síndrome de Weber (III ipsilateral + hemiplejía contralateral).'),
  Midbrain_SC: G('Mesencéfalo', [-4.2, -34, -3], '—', 'Arterias cuadrigeminales (ACP / cerebelosa superior)', 'Colículo superior: orientación visual y sacadas oculares.', 'Síndrome de Parinaud (mirada vertical).'),
  Midbrain_IC: G('Mesencéfalo', [-4.8, -35, -10], '—', 'Arterias cuadrigeminales (ACP / cerebelosa superior)', 'Colículo inferior: relevo auditivo hacia el CGM.', 'Hipoacusia central.'),

  // ---------------- Sistema Vascular / Polígono de Willis ----------------
  ICA: G('Vasculatura', [-18, -12, -20], '—', 'Tronco Carotídeo Interno (C4-C7)', 'Aporte arterial principal a la circulación cerebral anterior (ACM y ACA).', 'Oclusión carotídea: ictus hemisférico mayor, amaurosis fugaz.'),
  ACA: G('Vasculatura', [-4, 18, 14], '—', 'Segmentos A1-A4 (Pericallosa y Callosomarginal)', 'Irrigación de la cara medial de los lóbulos frontal y parietal (miembro inferior).', 'Ictus ACA: paraparesia/monoparesia crural contralateral, abulia.'),
  ACOA: G('Vasculatura', [0, 14, -8], '—', 'Puente comunicante anterior', 'Anastomosis interhemisférica entre ambas arterias cerebrales anteriores.', 'Aneurismas de la ACoA: hemorragia subaracnoidea, déficit del lóbulo frontal.'),
  MCA: G('Vasculatura', [-38, -6, 2], '—', 'Segmentos M1-M4 (Tronco principal, ínsula y ramas corticales)', 'Irriga la cara convexa de los hemisferios (lenguaje, cara y brazo).', 'Ictus ACM: hemiplejía faciobraquial contralateral, afasia (izq), negligencia (der).'),
  PCOMA: G('Vasculatura', [-16, -14, -14], '—', 'Puente anastomótico carótido-vertebrobasilar', 'Conecta la arteria carótida interna con la arteria cerebral posterior.', 'Aneurisma de PCoA: compresión y parálisis del III par con midriasis.'),
  BASILAR: G('Vasculatura', [0, -22, -32], '—', 'Tronco basilar pontino ventral', 'Aporte arterial al tronco encefálico, cerebelo y lóbulos occipitales.', 'Trombosis basilar: síndrome de enclaustramiento (locked-in), coma.'),
  VA: G('Vasculatura', [-14, -38, -48], '—', 'Segmento V4 intracraneal de arterias vertebrales', 'Convergencia en la arteria basilar; ramas a la espinal anterior y PICA.', 'Disección vertebral: síndrome de Wallenberg, ictus cerebeloso.'),
  PICA: G('Vasculatura', [-18, -38, -42], '—', 'Arteria cerebelosa posteroinferior', 'Irriga el bulbo dorsolateral y la cara inferior del cerebelo.', 'Infarto de PICA: Síndrome de Wallenberg (ataxia, Horner, termoalgesia cruzada).'),
  AICA: G('Vasculatura', [-22, -28, -36], '—', 'Arteria cerebelosa anteroinferior', 'Irriga el ángulo pontocerebeloso, puente lateral y laberinto auditivo.', 'Ictus AICA: hipoacusia súbita, parálisis facial periférica, ataxia.'),
  SCA: G('Vasculatura', [-18, -24, -16], '—', 'Arteria cerebelosa superior', 'Irriga la cara superior del cerebelo y núcleos profundos cerebelosos.', 'Ictus SCA: ataxia de la marcha severa y dismetría ipsilateral.'),
  PCA: G('Vasculatura', [-16, -26, -6], '—', 'Segmentos P1-P4 (ramas calcarina y parietooccipital)', 'Irriga los lóbulos occipitales, corteza visual V1 y cara inferior temporal.', 'Ictus PCA: hemianopsia homónima contralateral con respeto macular, alexia.'),
  Lenticulostriate: G('Vasculatura', [-16, 4, 2], '—', 'Arterias perforantes anterolaterales de la ACM', 'Irrigan el brazo posterior de la cápsula interna y núcleos lenticulares.', 'Infarto lacunar capsular: ictus motor puro o sensitivo-motor.'),

  // ---------------- Pares Craneales (I - XII) ----------------
  cn1: G('Par Craneal I', [-6, 32, -14], '—', 'Nervio Olfatorio (Bulbo y cintilla olfatoria)', 'Transmisión sensorial del olfato desde la mucosa nasal hacia corteza entorrinal.', 'Anosmia traumática o compresión por meningioma del surco olfatorio.'),
  cn2: G('Par Craneal II', [-8, 4, -8], '—', 'Nervio Óptico y Quiasma Óptico', 'Transmisión de los estímulos visuales retinianos hacia el tálamo (CGL).', 'Neuritis óptica, hemianopsia bitemporal por adenoma hipofisario.'),
  cn3: G('Par Craneal III', [-4, -18, -12], '—', 'Nervio Oculomotor / Motor Ocular Común', 'Motilidad ocular extrínseca (rectos sup/inf/medial, oblicuo menor) y constricción pupilar.', 'Ptosis palpebral, midriasis fija y ojo desviado "hacia abajo y afuera".'),
  cn4: G('Par Craneal IV', [-16, -24, -14], '—', 'Nervio Troclear / Patético', 'Inervación del músculo oblicuo superior del ojo (depresión en aducción).', 'Diplopía vertical al bajar escaleras; inclinación compensatoria de cabeza.'),
  cn5: G('Par Craneal V', [-24, -20, -22], '—', 'Nervio Trigémino (V1 Oftálmica, V2 Maxilar, V3 Mandibular)', 'Sensibilidad general de la cara, córnea y cavidades; motilidad masticatoria.', 'Neuralgia del trigémino (dolor lancinante paroxístico), anestesia facial.'),
  cn6: G('Par Craneal VI', [-6, -28, -34], '—', 'Nervio Abducens / Motor Ocular Externo', 'Inervación del músculo recto lateral (abducción del globo ocular).', 'Diplopía horizontal en la mirada lateral ipsilateral; signo precoz de HIC.'),
  cn7: G('Par Craneal VII', [-26, -30, -32], '—', 'Nervio Facial e Intermediario de Wrisberg', 'Músculos de la mímica facial, gusto en los dos tercios anteriores de la lengua, lagrimeo.', 'Parálisis facial periférica de Bell, pérdida de arrugas frontales y cierre palpebral.'),
  cn8: G('Par Craneal VIII', [-30, -32, -32], '—', 'Nervio Vestibulococlear / Auditivo', 'Audición (porción coclear) y equilibrio espacial / aceleración (porción vestibular).', 'Hipoacusia neurosensorial, acúfenos, vértigo periférico, neurinoma del acústico.'),
  cn9: G('Par Craneal IX', [-20, -36, -42], '—', 'Nervio Glosofaríngeo', 'Sensibilidad faríngea, reflejo nauseoso, gusto en el tercio posterior de la lengua.', 'Neuralgia del glosofaríngeo, pérdida del reflejo faríngeo ipsilateral.'),
  cn10: G('Par Craneal X', [-18, -38, -44], '—', 'Nervio Vago / Neumogástrico', 'Inervación parasimpática toracoabdominal, cuerdas vocales (laríngeo recurrente) y paladar.', 'Disfonía, parálisis de cuerda vocal, disfagia, desviación de la úvula.'),
  cn11: G('Par Craneal XI', [-16, -42, -52], '—', 'Nervio Accesorio / Espinal', 'Inervación motora de los músculos esternocleidomastoideo y trapecio.', 'Dificultad para encoger el hombro y girar la cabeza hacia el lado opuesto.'),
  cn12: G('Par Craneal XII', [-10, -36, -48], '—', 'Nervio Hipogloso', 'Inervación motora de la musculatura intrínseca y extrínseca de la lengua.', 'Desviación de la lengua hacia el lado parético al protruirla, atrofia y fasciculaciones.'),

  // ---------------- Capa Meníngea ----------------
  Falx_Cerebri: G('Meninges', [0, -8, 28], '—', 'Hoz del Cerebro (Repliegue dural sagital)', 'Separa ambos hemisferios cerebrales; contiene el seno sagital superior e inferior.', 'Herniación subfalcina (del cíngulo) por masa supratentorial unilateral.'),
  Tentorium_Cerebelli: G('Meninges', [0, -52, -4], '—', 'Tienda del Cerebelo (Septo tentorial)', 'Separa los lóbulos occipitales del cerebelo; delimita fosa posterior.', 'Herniación uncal / transtentorial con compresión del mesencéfalo y III par.'),
  Sinus_Sagittal_Sup: G('Meninges', [0, -18, 48], '—', 'Seno Sagital Superior (Seno dural)', 'Drenaje venoso de las venas corticales emisarias de ambos hemisferios hacia la tórcula.', 'Trombosis venosa cerebral dural (cefalea, papiledema, crisis epilépticas).'),
  Sinus_Rectus: G('Meninges', [0, -48, 12], '—', 'Seno Recto (Unión de hoz y tienda)', 'Recibe la vena de Galeno y el seno sagital inferior drenando hacia la confluencia.', 'Trombosis del seno recto con congestión diencefálica y talámica profunda.'),
  Sinus_Transverse: G('Meninges', [-44, -58, -8], '—', 'Seno Transverso Bilateral', 'Conduce el flujo venoso desde la tórcula de Herófilo hacia los senos sigmoideos.', 'Trombosis del seno transverso; hipertensión intracraneal idiopática.'),
};

/** Quita el sufijo de lateralidad _L / _R / _a / _b para localizar la ficha base. */
export function getStructureInfo(id: string | null): { info: StructureInfo; side: 'L' | 'R' | null; baseId: string } | null {
  if (!id) return null;
  const m = id.match(/^(.*?)(?:_([LR]))?$/);
  const baseId = m?.[1] ?? id;
  const side = (m?.[2] as 'L' | 'R' | undefined) ?? null;
  let info = STRUCTURE_INFO[baseId];
  if (!info) {
    const alt = baseId.replace(/_[ab]$/, '');
    info = STRUCTURE_INFO[alt];
  }
  if (!info) return null;
  return { info, side, baseId };
}

/** Coordenadas MNI mostradas: refleja x para el hemisferio derecho. */
export function mniForSide(info: StructureInfo, side: 'L' | 'R' | null): [number, number, number] {
  const [x, y, z] = info.mni;
  const flip = side === 'R' ? -1 : 1;
  return [Math.round(x * flip * 10) / 10, y, z];
}

/** Equivalencia citoarquitectónica de Brodmann para áreas del atlas de Glasser (HCP-MMP1.0). */
const GLASSER_BA: Record<string, string> = {
  V1: 'BA 17', V2: 'BA 18', V3: 'BA 19', V4: 'BA 19', V3A: 'BA 19', V3B: 'BA 19', V6: 'BA 19', V7: 'BA 19',
  A1: 'BA 41', LBelt: 'BA 42', MBelt: 'BA 42', PBelt: 'BA 42', RI: 'BA 41/42', A4: 'BA 22', A5: 'BA 22',
  '4': 'BA 4', '3a': 'BA 3', '3b': 'BA 3', '1': 'BA 1', '2': 'BA 2', '6d': 'BA 6', '6v': 'BA 6', '6mp': 'BA 6',
  '6ma': 'BA 6', '55b': 'BA 6/8', FEF: 'BA 8', '8Av': 'BA 8', '8BL': 'BA 8', '9m': 'BA 9', '9p': 'BA 9', '46': 'BA 46',
  '44': 'BA 44', '45': 'BA 45', '47l': 'BA 47', '47s': 'BA 47', '47m': 'BA 47', '10r': 'BA 10', '10v': 'BA 10',
  '10pp': 'BA 10', '11l': 'BA 11', '13l': 'BA 11', '25': 'BA 25', '24dd': 'BA 24', '24dv': 'BA 24', p24: 'BA 24',
  a24: 'BA 24', '23c': 'BA 23', '23d': 'BA 23', '31pd': 'BA 31', '31pv': 'BA 31', '7m': 'BA 7', '7Am': 'BA 7',
  '7PC': 'BA 7', '5m': 'BA 5', '5L': 'BA 5', '5mv': 'BA 5', '7AL': 'BA 7', '7Pl': 'BA 7', '7Pm': 'BA 7',
  PF: 'BA 40', PFm: 'BA 40', PFop: 'BA 40', PFt: 'BA 40', PGi: 'BA 39', PGs: 'BA 39', PGp: 'BA 39', STV: 'BA 22',
  PSL: 'BA 22/40', MT: 'BA 19/37', MST: 'BA 19/37', FST: 'BA 37', PIT: 'BA 37', FFC: 'BA 37', PHT: 'BA 37',
  TE1a: 'BA 21', TE1m: 'BA 21', TE1p: 'BA 21', TE2a: 'BA 20', TE2p: 'BA 20', TGd: 'BA 38', TGv: 'BA 38',
  EC: 'BA 28', PeEc: 'BA 36', PreS: 'BA 27', H: 'Hipocampo', PHA1: 'BA 36', PHA2: 'BA 36', PHA3: 'BA 36',
  Ig: 'BA 13', AAIC: 'BA 13', MI: 'BA 13', PoI1: 'BA 13', PoI2: 'BA 13', FOP1: 'BA 13/44',
};

export function glasserBrodmannLabel(atlasId: string, name: string): string {
  const key = atlasId.replace(/^Area\s+/i, '').replace(/^Área\s+/i, '').replace(/^L_|_ROI$/g, '').trim();
  if (GLASSER_BA[key]) return GLASSER_BA[key];
  const m = `${atlasId} ${name}`.match(/(?:BA|Brodmann|Área|Area)\s?(\d{1,2}[a-z]?)/i);
  if (m) return `BA ${m[1]}`;
  return 'Sin equivalente clásico directo';
}
