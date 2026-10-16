export interface BrainstemSyndrome {
  id: string;
  name: string;
  level: 'Mesencéfalo' | 'Puente' | 'Bulbo Raquídeo';
  vascularTerritory: string;
  affectedStructures: string[];
  clinicalPresentation: string;
  keySign: string;
}

export interface CranialNerve {
  id: string;
  romanNumeral: string;
  name: string;
  latinName: string;
  functionalCategory: ('Sensitivo' | 'Motor' | 'Mixto' | 'Parasimpático')[];
  functionalComponents: string[]; // e.g. ['ASG', 'AVE', 'ESG', 'EVE']
  realOrigin: string; // Núcleos de origen real en tronco encefálico o telencéfalo
  apparentOrigin: string; // Origen aparente macroscópico
  skullForamen: string; // Agujero o fisura de salida en la base de cráneo
  clinicalExploration: string; // Maniobra semiótica / reflejo clínico
  clinicalDeficit: string; // Hallazgo patológico ante lesión (parálisis, anosmia, etc.)
  associatedSyndromes: string[]; // IDs de síndromes de tronco
  color: string;
  leftPoints: [number, number, number][]; // 3D path coordinates in Three.js space
  rightPoints: [number, number, number][];
  nucleusCenter: [number, number, number]; // 3D center of deep origin nucleus
}

export const BRAINSTEM_SYNDROMES: BrainstemSyndrome[] = [
  {
    id: 'weber',
    name: 'Síndrome de Weber (Mesencefálico Paramediano Anterior)',
    level: 'Mesencéfalo',
    vascularTerritory: 'Ramas paramedianas de la Arteria Cerebral Posterior (ACP) y basilar de la cúspide',
    affectedStructures: [
      'Fascículo del III par craneal (N. Oculomotor)',
      'Pedúnculo cerebral anterior (Vía Piramidal Corticoespinal / Corticobulbar)'
    ],
    clinicalPresentation: 'Oftalmoplejía ipsilateral completa (midriasis, ptosis, ojo desviado abajo y afuera) asociada a hemiplejía motora facio-braquio-crural contralateral.',
    keySign: 'Parálisis del III par ipsilateral + Hemiplejía espástica contralateral'
  },
  {
    id: 'benedikt',
    name: 'Síndrome de Benedikt (Mesencefálico Tegmental / Paramediano Central)',
    level: 'Mesencéfalo',
    vascularTerritory: 'Ramas perforantes interpedunculares de la bifurcación basilar / ACP',
    affectedStructures: [
      'Fascículo del III par craneal',
      'Núcleo Rojo (vía rubroespinal y cerebelo-tálamo-cortical)',
      'Lemnisco medial (lemnisco medial contralateral)'
    ],
    clinicalPresentation: 'Parálisis oculomotora ipsilateral (III) con ataxia, temblor intencional/rubral rúbrico contralateral y coreoatetosis de extremidades contralaterales.',
    keySign: 'III par ipsilateral + Hemitremor/coreoatetosis contralateral'
  },
  {
    id: 'millard_gubler',
    name: 'Síndrome de Millard-Gubler (Pontino Ventrolateral Inferior)',
    level: 'Puente',
    vascularTerritory: 'Ramas circunferenciales cortas de la Arteria Basilar / AICA',
    affectedStructures: [
      'Fascículo del VI par craneal (N. Abducens)',
      'Fascículo del VII par craneal (N. Facial periférico)',
      'Tracto corticoespinal descendente'
    ],
    clinicalPresentation: 'Parálisis periférica del facial ipsilateral (afecta frente y boca), parálisis del recto lateral ipsilateral (estrabismo convergente) y hemiplejía piramidal contralateral respetando la cara.',
    keySign: 'VI y VII pares periféricos ipsilaterales + Hemiplejía contralateral'
  },
  {
    id: 'foville',
    name: 'Síndrome de Foville (Pontino Caudal / PPRF)',
    level: 'Puente',
    vascularTerritory: 'Arterias perforantes pontinas medianas y paramedianas basilares',
    affectedStructures: [
      'Formación Reticular Paramediana Pontina (PPRF / centro de mirada horizontal)',
      'Núcleo del VI par craneal',
      'Fascículo corticoespinal contralateral'
    ],
    clinicalPresentation: 'Parálisis de la mirada conjugada horizontal hacia el lado de la lesión (el paciente mira a su hemiplejía contralateral) con hemiplejía braquiocrural contralateral.',
    keySign: 'Desviación conjugada de la mirada al lado opuesto + Hemiplejía contralateral'
  },
  {
    id: 'wallenberg',
    name: 'Síndrome de Wallenberg (Bulbar Lateral / Síndrome de PICA)',
    level: 'Bulbo Raquídeo',
    vascularTerritory: 'Arteria Cerebelosa Posteroinferior (PICA) o Arteria Vertebral ipsilateral',
    affectedStructures: [
      'Núcleo ambiguo (IX y X pares craneales - deglución y fonación)',
      'Tracto espinal y núcleo del V par (dolor/temperatura facial)',
      'Tracto espinotalámico lateral (dolor/temperatura corporal)',
      'Vía simpática descendente (hipotálamo-espinal)',
      'Pedúnculo cerebeloso inferior (cuerpo restiforme)'
    ],
    clinicalPresentation: 'Disfagia aguda, disfonía/voz bitonal, hipoestesia termoalgésica facial ipsilateral pero hemicorporal contralateral (sensibilidad cruzada), Síndrome de Horner ipsilateral (ptosis, miosis, anhidrosis), vértigo y ataxia cerebelosa ipsilateral. Respeto absoluto de la fuerza motora piramidal.',
    keySign: 'Disfagia + Hemihipoestesia facial ipsilateral / corporal contralateral + Horner ipsilateral'
  },
  {
    id: 'dejerine',
    name: 'Síndrome de Dejerine (Bulbar Medial Anterior)',
    level: 'Bulbo Raquídeo',
    vascularTerritory: 'Arteria Espinal Anterior (rama vertebral directa)',
    affectedStructures: [
      'Núcleo o fascículo del XII par (N. Hipogloso)',
      'Pirámide bulbar (Tracto Corticoespinal)',
      'Lemnisco Medial'
    ],
    clinicalPresentation: 'Parálisis lingual ipsilateral flácida (al protruir, la lengua se desvía hacia el lado lesionado con fasciculaciones y atrofia tardía), hemiplejía contralateral con respeto facial y pérdida de la propiocepción/vibración contralateral.',
    keySign: 'Parálisis lingual ipsilateral + Hemiplejía contralateral + Pérdida propioceptiva contralateral'
  }
];

export const CRANIAL_NERVES_DB: CranialNerve[] = [
  {
    id: 'cn1',
    romanNumeral: 'I',
    name: 'Nervio Olfatorio',
    latinName: 'Nervus olfactorius',
    functionalCategory: ['Sensitivo'],
    functionalComponents: ['AVE (Aferente Visceral Especial)'],
    realOrigin: 'Células bipolares de la mucosa pituitaria olfatoria (Techo de la cavidad nasal)',
    apparentOrigin: 'Bulbo olfatorio y estrías olfatorias sobre la lámina cribosa del etmoides',
    skullForamen: 'Lámina cribosa del hueso etmoides',
    clinicalExploration: 'Oclusión uninarina con ojos cerrados. Identificación de sustancias odoríferas no irritantes (café, vainilla, menta). Evitar amoníaco (estimula el V par).',
    clinicalDeficit: 'Anosmia o hiposmia unilateral/bilateral. Frecuente en fracturas de base de cráneo anterior, Síndrome de Foster Kennedy (meningioma del surco olfatorio).',
    associatedSyndromes: [],
    color: '#34d399', // Esmeralda / menta
    leftPoints: [
      [-0.18, -0.68, 0.40],
      [-0.20, -0.69, 0.70],
      [-0.22, -0.70, 0.98],
      [-0.22, -0.73, 1.25]
    ],
    rightPoints: [
      [0.18, -0.68, 0.40],
      [0.20, -0.69, 0.70],
      [0.22, -0.70, 0.98],
      [0.22, -0.73, 1.25]
    ],
    nucleusCenter: [0, -0.68, 0.45]
  },
  {
    id: 'cn2',
    romanNumeral: 'II',
    name: 'Nervio Óptico',
    latinName: 'Nervus opticus',
    functionalCategory: ['Sensitivo'],
    functionalComponents: ['ASE (Aferente Somática Especial)'],
    realOrigin: 'Células ganglionares de la retina (capa neurosensorial retiniana)',
    apparentOrigin: 'Quiasma óptico anteromedial en el suelo del diencéfalo',
    skullForamen: 'Conducto óptico (Canal óptico del esfenoides)',
    clinicalExploration: 'Agudeza visual (Tabla de Snellen), campimetría por confrontación directa, visión de colores (Test de Ishihara) y reflejo fotomotor aferente.',
    clinicalDeficit: 'Amaurosis ipsilateral (lesión prequiasmática), hemianopsia bitemporal heterónima (quiasma por adenoma hipofisario), defecto pupilar aferente relativo (Pupila de Marcus Gunn).',
    associatedSyndromes: [],
    color: '#60a5fa', // Azul cielo
    leftPoints: [
      [0.0, -0.78, 0.36],
      [-0.15, -0.76, 0.50],
      [-0.35, -0.72, 0.75],
      [-0.52, -0.68, 1.05]
    ],
    rightPoints: [
      [0.0, -0.78, 0.36],
      [0.15, -0.76, 0.50],
      [0.35, -0.72, 0.75],
      [0.52, -0.68, 1.05]
    ],
    nucleusCenter: [0.0, -0.78, 0.36]
  },
  {
    id: 'cn3',
    romanNumeral: 'III',
    name: 'Nervio Oculomotor (Motor Ocular Común)',
    latinName: 'Nervus oculomotorius',
    functionalCategory: ['Motor', 'Parasimpático'],
    functionalComponents: ['ESG (M. extrínsecos)', 'EVG (M. esfínter pupilar y ciliar)'],
    realOrigin: 'Núcleo Oculomotor somático y Núcleo accesorio de Edinger-Westphal (Tegmento mesencefálico, a nivel de los colículos superiores)',
    apparentOrigin: 'Fosa interpeduncular (borde interno del pedúnculo cerebral mesencefálico)',
    skullForamen: 'Fisura Orbitaria Superior (Hendidura Esfenoidal)',
    clinicalExploration: 'Motilidad ocular extrínseca (recto superior, medial, inferior y oblicuo menor), reflejo fotomotor pupilar directo/consensual y reflejo de acomodación.',
    clinicalDeficit: 'Ptosis palpebral completa, globo ocular divergente en "ojo abajo y afuera" (acción sin oposición del IV y VI), diplopía vertical/horizontal y midriasis arreactiva unilateral.',
    associatedSyndromes: ['weber', 'benedikt'],
    color: '#fbbf24', // Ámbar / Dorado
    leftPoints: [
      [-0.10, -0.84, 0.22],
      [-0.18, -0.85, 0.40],
      [-0.30, -0.82, 0.65],
      [-0.42, -0.78, 0.90]
    ],
    rightPoints: [
      [0.10, -0.84, 0.22],
      [0.18, -0.85, 0.40],
      [0.30, -0.82, 0.65],
      [0.42, -0.78, 0.90]
    ],
    nucleusCenter: [0.0, -0.82, -0.05]
  },
  {
    id: 'cn4',
    romanNumeral: 'IV',
    name: 'Nervio Troclear (Patético)',
    latinName: 'Nervus trochlearis',
    functionalCategory: ['Motor'],
    functionalComponents: ['ESG (M. oblicuo superior / oblicuo mayor)'],
    realOrigin: 'Núcleo del nervio troclear en el mesencéfalo caudal (colículo inferior)',
    apparentOrigin: 'Cara posterior / dorsal del mesencéfalo, inferior al frenillo del velo medular superior (único nervio con origen dorsal y decusación completa)',
    skullForamen: 'Fisura Orbitaria Superior (por fuera del anillo tendinoso común de Zinn)',
    clinicalExploration: 'Inspección de la mirada hacia abajo y adentro (lectura, descenso de escaleras). Inclinación cefálica compensatoria al hombro opuesto (Signo de Bielschowsky).',
    clinicalDeficit: 'Diplopía vertical torsional acentuada al mirar hacia abajo y adentro. El paciente inclina la cabeza hacia el hombro sano para neutralizar el desfasaje visual.',
    associatedSyndromes: [],
    color: '#f59e0b', // Ámbar intenso
    leftPoints: [
      [-0.12, -0.82, -0.38],
      [-0.36, -0.84, -0.20],
      [-0.44, -0.88, 0.15],
      [-0.40, -0.83, 0.60],
      [-0.38, -0.78, 0.88]
    ],
    rightPoints: [
      [0.12, -0.82, -0.38],
      [0.36, -0.84, -0.20],
      [0.44, -0.88, 0.15],
      [0.40, -0.83, 0.60],
      [0.38, -0.78, 0.88]
    ],
    nucleusCenter: [0.0, -0.82, -0.15]
  },
  {
    id: 'cn5',
    romanNumeral: 'V',
    name: 'Nervio Trigémino',
    latinName: 'Nervus trigeminus',
    functionalCategory: ['Mixto'],
    functionalComponents: ['ASG (Sensibilidad de cara, córnea, dientes)', 'EVE (M. masticadores)'],
    realOrigin: 'Ganglio de Gasser / Trigeminal sensorial y Núcleo Motor Masticador en el tegmento póntico medial',
    apparentOrigin: 'Cara anterolateral del puente (unión del tercio medio y superior)',
    skullForamen: 'V1: Fisura Orbitaria Superior | V2: Foramen Redondo | V3: Foramen Oval',
    clinicalExploration: 'Sensibilidad táctil y termoalgésica en 3 territorios (oftálmico, maxilar, mandibular). Reflejo corneal (rama aferente V1 + eferente VII). Fuerza de músculos masetero y temporal.',
    clinicalDeficit: 'Neuralgia del trigémino (dolor lancinante en paroxismos desencadenado por gatillos), hipoestesia facial ipsilateral, abolición del reflejo corneal y desviación de mandíbula hacia el lado lesionado.',
    associatedSyndromes: ['wallenberg'],
    color: '#ec4899', // Rosa vibrante
    leftPoints: [
      [-0.34, -1.04, 0.18],
      [-0.46, -1.06, 0.32],
      [-0.58, -1.08, 0.50],
      [-0.68, -1.05, 0.72]
    ],
    rightPoints: [
      [0.34, -1.04, 0.18],
      [0.46, -1.06, 0.32],
      [0.58, -1.08, 0.50],
      [0.68, -1.05, 0.72]
    ],
    nucleusCenter: [-0.22, -1.05, 0.05]
  },
  {
    id: 'cn6',
    romanNumeral: 'VI',
    name: 'Nervio Abducens (Motor Ocular Externo)',
    latinName: 'Nervus abducens',
    functionalCategory: ['Motor'],
    functionalComponents: ['ESG (M. recto lateral / externo ocular)'],
    realOrigin: 'Núcleo del abducens en la fosa romboidea del suelo del IV ventrículo (colículo facial del puente)',
    apparentOrigin: 'Surco pontobulbar / bulbopontino, medialmente por encima de las pirámides bulbares',
    skullForamen: 'Fisura Orbitaria Superior (a través del anillo de Zinn)',
    clinicalExploration: 'Mirada conjugada lateral horizontal (abducción ocular externa bilateral).',
    clinicalDeficit: 'Estrabismo convergente ipsilateral e incapacidad de abducción del ojo afectado; diplopía horizontal homónima binocular al mirar hacia el lado de la lesión.',
    associatedSyndromes: ['millard_gubler', 'foville'],
    color: '#eab308', // Amarillo ámbar
    leftPoints: [
      [-0.14, -1.28, 0.22],
      [-0.20, -1.22, 0.42],
      [-0.28, -1.10, 0.65],
      [-0.35, -0.92, 0.88]
    ],
    rightPoints: [
      [0.14, -1.28, 0.22],
      [0.20, -1.22, 0.42],
      [0.28, -1.10, 0.65],
      [0.35, -0.92, 0.88]
    ],
    nucleusCenter: [-0.10, -1.24, -0.05]
  },
  {
    id: 'cn7',
    romanNumeral: 'VII',
    name: 'Nervio Facial',
    latinName: 'Nervus facialis',
    functionalCategory: ['Mixto', 'Parasimpático'],
    functionalComponents: ['EVE (M. mímica)', 'EVG (Glándulas submandibular/lagrimal)', 'AVE (Gusto 2/3 anteriores lengua)'],
    realOrigin: 'Núcleo motor del facial (tegmento pontino caudal), Núcleo Salivatorio Superior y Núcleo del Tracto Solitario',
    apparentOrigin: 'Surco pontobulbar en la fosita supraolivar / ángulo pontocerebeloso medial al VIII',
    skullForamen: 'Conducto Auditivo Interno -> Canal facial -> Foramen Estilomastoideo',
    clinicalExploration: 'Gesticulación mímica: arrugar la frente, cerrar los ojos con fuerza contra resistencia, sonreír, inflar mejillas. Gusto en los 2/3 anteriores linguales con tiras de glucosa/sal.',
    clinicalDeficit: 'Parálisis facial periférica de Bell (afecta hemi-cara completa ipsilateral incluyendo la frente con signo de Bell e hiperacusia) vs parálisis central (respeta frente contralateral por inervación bi-hemisférica).',
    associatedSyndromes: ['millard_gubler'],
    color: '#f97316', // Naranja clínico
    leftPoints: [
      [-0.38, -1.30, 0.16],
      [-0.48, -1.32, 0.28],
      [-0.60, -1.34, 0.45],
      [-0.72, -1.38, 0.62]
    ],
    rightPoints: [
      [0.38, -1.30, 0.16],
      [0.48, -1.32, 0.28],
      [0.60, -1.34, 0.45],
      [0.72, -1.38, 0.62]
    ],
    nucleusCenter: [-0.26, -1.28, -0.02]
  },
  {
    id: 'cn8',
    romanNumeral: 'VIII',
    name: 'Nervio Vestibulococlear (Auditivo)',
    latinName: 'Nervus vestibulocochlearis',
    functionalCategory: ['Sensitivo'],
    functionalComponents: ['ASE (Audición y equilibrio espacial vestibular)'],
    realOrigin: 'Ganglio espiral de Corti (coclear) y Ganglio vestibular de Scarpa en el oído interno',
    apparentOrigin: 'Surco bulbopontino lateral, en el ángulo pontocerebeloso',
    skullForamen: 'Conducto Auditivo Interno (Hueso Temporal petroso)',
    clinicalExploration: 'Acumetría clínica con diapasón (Test de Weber y Test de Rinne). Maniobra de Dix-Hallpike para VPPB, prueba de Romberg e impulso cefálico de Halmagyi.',
    clinicalDeficit: 'Hipoacusia neurosensorial ipsilateral, acúfenos pulsátiles o continuos, nistagmo vestibular unidireccional y vértigo rotatorio severo con náuseas (común en Schwannoma vestibular / neurinoma del acústico).',
    associatedSyndromes: ['wallenberg'],
    color: '#06b6d4', // Cian brillante
    leftPoints: [
      [-0.44, -1.33, 0.12],
      [-0.56, -1.35, 0.24],
      [-0.70, -1.38, 0.38],
      [-0.82, -1.40, 0.54]
    ],
    rightPoints: [
      [0.44, -1.33, 0.12],
      [0.56, -1.35, 0.24],
      [0.70, -1.38, 0.38],
      [0.82, -1.40, 0.54]
    ],
    nucleusCenter: [-0.32, -1.32, -0.08]
  },
  {
    id: 'cn9',
    romanNumeral: 'IX',
    name: 'Nervio Glosofaríngeo',
    latinName: 'Nervus glossopharyngeus',
    functionalCategory: ['Mixto', 'Parasimpático'],
    functionalComponents: ['EVE (M. estilofaríngeo)', 'EVG (Glándula parótida)', 'AVE (Gusto 1/3 posterior)', 'AVG (Barorreceptores carotídeos)'],
    realOrigin: 'Núcleo Ambiguo, Núcleo Salivatorio Inferior y Núcleo del Tracto Solitario en el bulbo raquídeo',
    apparentOrigin: 'Surco retroolivar / postero-lateral del bulbo raquídeo (porción superior)',
    skullForamen: 'Foramen Yugular (Agujero Rasgado Posterior)',
    clinicalExploration: 'Sensibilidad gustativa en el tercio posterior de la lengua, reflejo nauseoso (rama aferente sensitiva), elevación simétrica del velo del paladar al fonar "ah".',
    clinicalDeficit: 'Pérdida del reflejo nauseoso ipsilateral, disfagia a sólidos y neuralgia del glosofaríngeo (dolor faríngeo intenso desencadenado por la deglución).',
    associatedSyndromes: ['wallenberg'],
    color: '#8b5cf6', // Violeta
    leftPoints: [
      [-0.30, -1.42, 0.08],
      [-0.42, -1.45, 0.18],
      [-0.54, -1.50, 0.30],
      [-0.64, -1.55, 0.44]
    ],
    rightPoints: [
      [0.30, -1.42, 0.08],
      [0.42, -1.45, 0.18],
      [0.54, -1.50, 0.30],
      [0.64, -1.55, 0.44]
    ],
    nucleusCenter: [-0.22, -1.40, -0.06]
  },
  {
    id: 'cn10',
    romanNumeral: 'X',
    name: 'Nervio Vago (Neumogástrico)',
    latinName: 'Nervus vagus',
    functionalCategory: ['Mixto', 'Parasimpático'],
    functionalComponents: ['EVE (M. laríngeos/faríngeos)', 'EVG (Inervación toracoabdominal)', 'AVE (Epiglotis)', 'AVG (Visceropercepción)'],
    realOrigin: 'Núcleo Ambiguo, Núcleo Dorsal Motor del Vago y Núcleo Solitario en el bulbo raquídeo',
    apparentOrigin: 'Surco retroolivar del bulbo raquídeo (inmediatamente inferior al IX par)',
    skullForamen: 'Foramen Yugular (Agujero Rasgado Posterior)',
    clinicalExploration: 'Reflejo nauseoso (rama eferente motora), fonación (ausencia de voz bitonal o disfonía), inspección de úvula (la úvula se desvía hacia el lado contralateral sano).',
    clinicalDeficit: 'Disfonía por parálisis de cuerda vocal, disfagia grave con broncoaspiración, parálisis unilateral del paladar blando y arritmias autonómicas por denervación vagal parasimpática.',
    associatedSyndromes: ['wallenberg'],
    color: '#a855f7', // Púrpura brillante
    leftPoints: [
      [-0.28, -1.50, 0.04],
      [-0.38, -1.54, 0.14],
      [-0.48, -1.62, 0.25],
      [-0.58, -1.72, 0.36]
    ],
    rightPoints: [
      [0.28, -1.50, 0.04],
      [0.38, -1.54, 0.14],
      [0.48, -1.62, 0.25],
      [0.58, -1.72, 0.36]
    ],
    nucleusCenter: [-0.18, -1.48, -0.06]
  },
  {
    id: 'cn11',
    romanNumeral: 'XI',
    name: 'Nervio Accesorio (Espinal)',
    latinName: 'Nervus accessorius',
    functionalCategory: ['Motor'],
    functionalComponents: ['EVE / ESG (M. Esternocleidomastoideo y Trapecio)'],
    realOrigin: 'Asta anterior de los primeros 5 segmentos medulares cervicales (C1-C5) y raíz bulbar desde el Núcleo Ambiguo',
    apparentOrigin: 'Surco retroolivar inferior y cordón lateral de médula cervical superior',
    skullForamen: 'Foramen Yugular (asciende a través del foramen magno y egresa por el foramen yugular)',
    clinicalExploration: 'Elevación forzada de hombros contra resistencia (M. trapecio) y rotación cefálica lateral contra resistencia (M. esternocleidomastoideo contralateral).',
    clinicalDeficit: 'Caída del hombro ipsilateral, escápula alada débil y dificultad para girar la cabeza hacia el lado opuesto al de la lesión.',
    associatedSyndromes: ['wallenberg'],
    color: '#c084fc', // Violeta claro
    leftPoints: [
      [-0.24, -1.60, 0.00],
      [-0.32, -1.68, 0.08],
      [-0.42, -1.78, 0.18],
      [-0.52, -1.90, 0.28]
    ],
    rightPoints: [
      [0.24, -1.60, 0.00],
      [0.32, -1.68, 0.08],
      [0.42, -1.78, 0.18],
      [0.52, -1.90, 0.28]
    ],
    nucleusCenter: [-0.16, -1.62, -0.04]
  },
  {
    id: 'cn12',
    romanNumeral: 'XII',
    name: 'Nervio Hipogloso',
    latinName: 'Nervus hypoglossus',
    functionalCategory: ['Motor'],
    functionalComponents: ['ESG (M. intrínsecos y extrínsecos de la lengua salvo palatogloso)'],
    realOrigin: 'Núcleo del hipogloso en el trígono del hipogloso del suelo del IV ventrículo (bulbo paramediano)',
    apparentOrigin: 'Surco preolivar del bulbo raquídeo (entre la pirámide y la oliva bulbar)',
    skullForamen: 'Conducto del hipogloso (Canal condíleo anterior del hueso occipital)',
    clinicalExploration: 'Protrusión lingual en línea media. Inspección de atrofia, surcos y fasciculaciones. Fuerza lingual contra la mejilla examinada externamente.',
    clinicalDeficit: 'Al protruir la lengua, esta se desvía hacia el lado lesionado ("la lengua apunta a la lesión") debido al predominio del músculo geniogloso sano contralateral; atrofia y fasciculaciones ipsilaterales.',
    associatedSyndromes: ['dejerine'],
    color: '#10b981', // Verde esmeralda
    leftPoints: [
      [-0.15, -1.52, 0.14],
      [-0.24, -1.56, 0.22],
      [-0.35, -1.62, 0.32],
      [-0.45, -1.68, 0.44]
    ],
    rightPoints: [
      [0.15, -1.52, 0.14],
      [0.24, -1.56, 0.22],
      [0.35, -1.62, 0.32],
      [0.45, -1.68, 0.44]
    ],
    nucleusCenter: [-0.08, -1.50, 0.02]
  }
];
