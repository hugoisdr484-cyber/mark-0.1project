#!/usr/bin/env python3
"""
Generates the complete 180 Glasser Cortical Parcellation Database (HCP-MMP1.0)
using official FreeSurfer/HCP coordinates and taxonomy.
"""

import os
import json
import numpy as np

SCALE = 0.035
CENTER_MNI_Y = -17.85
CENTER_MNI_Z = 14.85

def mni_to_three(x, y, z):
    return [
        round(float(x * SCALE), 4),
        round(float((z - CENTER_MNI_Z) * SCALE), 4),
        round(float((y - CENTER_MNI_Y) * SCALE), 4)
    ]

# Load official MNI centroids
with open(os.path.join(os.path.dirname(__file__), 'glasser_180_real_mni.json'), 'r') as f:
    REAL_MNI = json.load(f)

# 22 Glasser Cortical Modules Specification
MODULES_SPEC = [
    {
        "num": 1,
        "name": "Corteza Visual Primaria",
        "system": "Visual",
        "color": "#8b5cf6",
        "lobe": "Occipital",
        "tract": ("TRACT_OPTIC_RADIATION", "Radiaciones Ópticas (Geniculocalcarinas / Asa de Meyer)", "Fibras de Proyección Talamocortical", 28000, 94, 62, "Hemianopsia o cuadrantanopsia homónima contralateral con respeto macular"),
        "blood": ("Arteria Cerebral Posterior (ACP - Rama Calcarina / P3)", "ACP"),
        "areas": [
            ("V1", "Área V1 (Corteza Visual Primaria / Estriada / BA 17)", "Recepción retinotópica primaria, detección de contornos, bordes y frecuencia espacial.", "Ceguera cortical focal, escotoma homónimo denso contralateral.")
        ]
    },
    {
        "num": 2,
        "name": "Corteza Visual Temprana",
        "system": "Visual",
        "color": "#a855f7",
        "lobe": "Occipital",
        "tract": ("TRACT_ILF", "Fascículo Longitudinal Inferior (ILF)", "Fascículo de Asociación Occipitotemporal", 18500, 88, 56, "Agnosia aperceptiva visual y defectos campimétricos cuadránticos"),
        "blood": ("Arteria Cerebral Posterior (ACP - Ramas Occipitales Laterales)", "ACP"),
        "areas": [
            ("V2", "Área V2 (Corteza Visual Secundaria / Área Parastriada)", "Procesamiento de estereopsis binocular, contornos ilusorios y segmentación figura-fondo.", "Agnosia visual de forma y pérdida de discriminación de profundidad estereoscópica."),
            ("V3", "Área V3 (Corteza Visual Terciaria)", "Análisis de patrones globales, movimiento coherente y orientación de flujo óptico.", "Defectos campimétricos en cuadrantes superiores contralaterales."),
            ("V4", "Área V4 (Corteza Visual del Color y Constancia Cromática)", "Percepción del color, constancia cromática e integración de curvatura visual.", "Acromatopsia cerebral hemi-espacial (visión en tonos de gris sin lesión retiniana).")
        ]
    },
    {
        "num": 3,
        "name": "Vía Visual Dorsal",
        "system": "Visual",
        "color": "#6366f1",
        "lobe": "Occipital",
        "tract": ("TRACT_SLF", "Fascículo Longitudinal Superior (SLF I/II)", "Fascículo de Asociación Frontoparietal", 24000, 90, 60, "Ataxia óptica, déficit de alcance visomotor y desorientación espacial"),
        "blood": ("Arteria Cerebral Media (ACM - M4 Parietooccipital) & ACP", "ACM"),
        "areas": [
            ("V3A", "Área V3A (Sensibilidad al Movimiento y Estereopsis)", "Integración de velocidad de movimiento binocular y disparidad retiniana absoluta.", "Incapacidad para calcular la velocidad de aproximación de objetos en el campo visual."),
            ("V3B", "Área V3B (Segregación de Contornos por Movimiento)", "Detección de bordes definidos exclusivamente por gradientes cinéticos y de textura.", "Dificultad para discernir objetos móviles camuflados sobre fondos homogéneos."),
            ("V6", "Área V6 (Flujo Óptico y Navegación Visoespacial)", "Codificación de la dirección del flujo óptico autoinducido durante la locomoción.", "Desorientación espacial topográfica e inestabilidad del rumbo visual en marcha."),
            ("V6A", "Área V6A (Coordinación Ojo-Mano y Alcance Visomotor)", "Transformación visomotora para el guiado preciso de la mano hacia blancos espaciales.", "Ataxia óptica (incapacidad para alcanzar objetos bajo control visual directo)."),
            ("V7", "Área V7 / IPS0 (Surco Intraparietal Posterior)", "Mapas de prioridad atencional espacial y memoria visoespacial a corto plazo.", "Negligencia atencional visoespacial y retraso en el anclaje de la mirada sacádica."),
            ("IPS1", "Área IPS1 (Surco Intraparietal Anterior 1)", "Representación de coordenadas espaciales retino-cefálicas para direccionamiento motor.", "Déficit en la redirección de movimientos de los miembros guiados por estímulos visuales.")
        ]
    },
    {
        "num": 4,
        "name": "Vía Visual Ventral",
        "system": "Visual",
        "color": "#ec4899",
        "lobe": "Temporal",
        "tract": ("TRACT_ILF", "Fascículo Longitudinal Inferior (ILF)", "Fascículo de Asociación Occipitotemporal", 22000, 89, 58, "Prosopagnosia y agnosia asociativa de objetos"),
        "blood": ("Arteria Cerebral Posterior (ACP - Ramas Temporal Anterior y Posterior)", "ACP"),
        "areas": [
            ("V8", "Área V8 (Corteza de Reconocimiento Cromático Superior)", "Clasificación cromática contextual y denominación léxica de tonalidades complejas.", "Anomia para los colores (discriminación preservada pero incapacidad para nombrarlos)."),
            ("VVC", "Área VVC (Complejo Ventral Visual)", "Extracción de invariancias morfológicas en objetos biológicos y herramientas.", "Agnosia visual de objetos (incapacidad para reconocer objetos cotidianos por la vista)."),
            ("PIT", "Área PIT (Corteza Temporal Inferior Posterior)", "Ensamblaje estructural jerárquico de características visuales intermedias.", "Dificultad en categorización visual rápida y reconocimiento de logotipos o símbolos."),
            ("FFC", "Área FFC (Complejo Fusiforme Facial / BA 37)", "Reconocimiento biométrico holístico facial y codificación de identidades individuales.", "Prosopagnosia pura (incapacidad para reconocer rostros familiares o el propio espejo)."),
            ("VMV1", "Área VMV1 (Corteza Ventromedial Visual 1)", "Mapeo visual de escenas naturales y cálculo de profundidad ambiental perspectival.", "Agnosia topográfica de paisajes y desorientación en entornos urbanos familiares."),
            ("VMV2", "Área VMV2 (Corteza Ventromedial Visual 2)", "Reconocimiento contextual de habitaciones, hitos arquitectónicos y edificios.", "Incapacidad para identificar hitos visuales cardinales arquitectónicos."),
            ("VMV3", "Área VMV3 (Corteza Ventromedial Visual Anterior)", "Conexión de información visual del entorno con redes de memoria parahipocámpicas.", "Amnesia visual para lugares y pérdida del mapa cognitivo de orientación geográfica.")
        ]
    },
    {
        "num": 5,
        "name": "Complejo Visual Lateral MT+",
        "system": "Visual",
        "color": "#d946ef",
        "lobe": "Occipital",
        "tract": ("TRACT_ILF", "Fascículo Longitudinal Inferior & Vía U-Fiber Perisylviana", "Fibras de Asociación Corto-Alcance", 16000, 87, 54, "Acinetopsia (ceguera al movimiento) y alteración de persecución ocular"),
        "blood": ("Arteria Cerebral Media (ACM - M4) y ACP (Rama Temporal Posterior)", "ACM"),
        "areas": [
            ("MT", "Área MT / V5 (Corteza Temporal Media)", "Percepción cardinal del movimiento visual y cálculo de velocidad vectorial.", "Acinetopsia cerebral (los objetos en movimiento se perciben como fotos estroboscópicas discontinuas)."),
            ("MST", "Área MST (Temporal Superior Medial)", "Análisis de expansión/rotación del flujo óptico y señales eferentes vestibulares.", "Pérdida de estabilidad de la imagen retiniana durante giros cefálicos rápidos."),
            ("FST", "Área FST (Fondo del Surco Temporal Superior)", "Integración de velocidad angular con movimientos oculares de persecución lenta.", "Pérdida de la persecución suave ocular con reemplazo por sacadas fragmentadas."),
            ("LO1", "Área LO1 (Lateral Occipital 1 - Orientación)", "Representación retinotópica de la orientación espacial de contornos.", "Déficit en alineación manual perceptiva con hendiduras u orientaciones oblicuas."),
            ("LO2", "Área LO2 (Lateral Occipital 2 - Siluetas)", "Detección de siluetas cerradas y discriminación de formas por oclusión.", "Incapacidad para separar figuras superpuestas en láminas de Poppelreuter."),
            ("LO3", "Área LO3 (Lateral Occipital 3 - Textura)", "Extracción de gradientes de sombreado tridimensional a partir de texturas monocromas.", "Pérdida de estimación de volumen volumétrico por iluminación y sombra."),
            ("V3CD", "Área V3CD (Visual 3 Cortical Dorsal)", "Interconexión occipital dorsal-lateral para segmentación dinámica de escenas.", "Retraso en la captación visual de eventos que irrumpen súbitamente en la periferia."),
            ("V4t", "Área V4t (Transición V4-MT)", "Coordinación entre la forma cromática del objeto y su trayectoria de desplazamiento.", "Pérdida de discriminación visual en seguimiento de blancos coloreados en movimiento.")
        ]
    },
    {
        "num": 6,
        "name": "Corteza Somatosensorial y Motora Primaria",
        "system": "Motor / Somatosensorial",
        "color": "#10b981",
        "lobe": "Frontal",
        "tract": ("TRACT_CORTICOSPINAL", "Tracto Corticoespinal & Vía Lemniscal Somatosensorial", "Fibras de Proyección Piramidal", 45000, 96, 75, "Hemiplejía contralateral espástica y anestesia somatosensorial profunda"),
        "blood": ("Arteria Cerebral Media (ACM - M4 Ramas Rolandica y Prerrolándica)", "ACM"),
        "areas": [
            ("4", "Área 4 (Giro Precentral - Corteza Motora Primaria M1)", "Ejecución motora voluntaria fraccionada y activación de neuronas piramidales de Betz.", "Hemiplejía o paresia motora pura contralateral grave con signo de Babinski y espasticidad."),
            ("3a", "Área 3a (Receptores Musculares Propioceptivos)", "Integración profunda de husos neuromusculares y receptores tendinosos de Golgi.", "Ataxia sensitiva contralateral, pérdida de propiocepción articular y pseudoatetosis."),
            ("3b", "Área 3b (Corteza Somatosensorial Primaria S1 - Mecanorreceptores)", "Percepción táctil discriminativa cutánea de alta resolución (discos de Merkel y Meissner).", "Anestesia táctil epicrítica contralateral con preservación grosera protopática espinotalámica."),
            ("1", "Área 1 (S1 - Análisis de Texturas Cutáneas)", "Discriminación de rugosidad, textura y separación de dos puntos espaciales.", "Astereognosia táctil (incapacidad para identificar objetos mediante palpación manual con ojos cerrados)."),
            ("2", "Área 2 (S1 - Discriminación de Tamaño y Forma Tridimensional)", "Integración táctil con ángulo articular para estereognosia de objetos tridimensionales.", "Morfognosia táctil abolida y pérdida del sentido de posición espacial de los dedos de la mano.")
        ]
    },
    {
        "num": 7,
        "name": "Lóbulo Paracentral y Cingular Medio",
        "system": "Motor / Somatosensorial",
        "color": "#059669",
        "lobe": "Parietal",
        "tract": ("TRACT_CINGULUM", "Fascículo del Cíngulo & Radiación Motora Medial", "Fascículo Límbico y Motor", 21000, 92, 64, "Paresia crural aislada (miembro inferior) e incontinencia esfinteriana"),
        "blood": ("Arteria Cerebral Anterior (ACA - A3 / Rama Callosomarginal)", "ACA"),
        "areas": [
            ("5m", "Área 5m (Lóbulo Paracentral Posterior / Parietal Medial)", "Representación propioceptiva del miembro inferior, pie y suelo pélvico.", "Hipoestesia y apraxia táctil del pie contralateral con alteración del paso en marcha."),
            ("5mv", "Área 5mv (Parietal Medial Ventral)", "Integración postural del tronco y coordinación axial bipedestada.", "Inestabilidad postural axial con lateropulsión del tronco hacia el lado contralateral."),
            ("5L", "Área 5L (Parietal Superior Medial)", "Esquema corporal somatosensorial somatotópico del hemicuerpo contralateral.", "Asomatognosia (el paciente desconoce o siente extraño su propio miembro contralateral)."),
            ("24dd", "Área 24dd (Área Motora Cingular Dorsal Anterior)", "Iniciación de conductas motoras con motivación intrínseca y esfuerzo volitivo.", "Mutismo acinético o abulia motora severa con falta de iniciativa espontánea."),
            ("24dv", "Área 24dv (Área Motora Cingular Ventral)", "Coordinación entre arousal autonómico, frecuencia cardíaca y selección motora.", "Labilidad emocional motora con respuestas afectivas inapropiadas al esfuerzo.")
        ]
    },
    {
        "num": 8,
        "name": "Corteza Premotora",
        "system": "Motor / Somatosensorial",
        "color": "#14b8a6",
        "lobe": "Frontal",
        "tract": ("TRACT_SLF", "Fascículo Longitudinal Superior (SLF I / Frontoparietal)", "Fascículo de Asociación Frontoparietal", 29000, 93, 68, "Apraxia ideomotora, alteración de secuencias complejas y desviación conjugada cefálica"),
        "blood": ("Arteria Cerebral Media (ACM - M4 Frontal Ascendente)", "ACM"),
        "areas": [
            ("6d", "Área 6d (Premotora Dorsal / Área Motora Suplementaria - SMA)", "Planificación y secuenciación temporal interna de movimientos complejos aprendidos.", "Síndrome de la Mano Extraña (Alien Hand) y apraxia de la marcha bilateral o unilateral."),
            ("6mp", "Área 6mp (Área Motora Suplementaria Propiamente Dicha)", "Iniciación del habla espontánea y secuencias bimanuales coordinadas.", "Afasia motora suplementaria transitoria con mutismo inicial seguido de recuperación fluida."),
            ("6v", "Área 6v (Premotora Ventral - Zona Orofaríngea y Braquial)", "Control premotor de la musculatura fonatoria, deglutoria y manipulación fina de dedos.", "Apraxia orofacial (apraxia bucolinguofacial para silbar, soplar o toser a la orden)."),
            ("6r", "Área 6r (Premotora Rostral / Opercular Inferior)", "Enlace entre observación de acciones motoras ajenas y reproducción propia.", "Déficit en aprendizaje motor imitativo y ejecución de praxias transitivas."),
            ("6a", "Área 6a (Premotora Caudomedial)", "Coordinación de la orientación cinemática cefálica respecto al blanco motor.", "Pérdida de rotación anticipatoria de ojos y cabeza previa a la acción del brazo."),
            ("FEF", "Área FEF (Campo Ocular Frontal / Frontal Eye Field)", "Generación voluntaria de sacadas oculares conjugadas horizontales al lado opuesto.", "Desviación conjugada de la mirada hacia el lado de la lesión ('el paciente mira a su lesión')."),
            ("PEF", "Área PEF (Campo Ocular Premotor)", "Integración entre comandos de sacadas rápidas y correcciones visuales de posición.", "Incapacidad para refrenar sacadas reflejas erróneas en paradigmas de antisacadas."),
            ("55b", "Área 55b (Corteza Premotora Laríngea del Lenguaje)", "Control premotor fino de cuerdas vocales, prosodia articulatoria y fluidez.", "Disartria apraxica y alteración grave de la entonación emocional del lenguaje."),
            ("6ma", "Área 6ma (Premotora Medial Anterior)", "Coordinación entre respiración inspiratoria profunda y preparación de marcha.", "Descoordinación motora anticipatoria diafragmática durante el esfuerzo físico."),
            ("SCEF", "Área SCEF (Campo Ocular Cingular y Suplementario)", "Control de sacadas intencionales basadas en recompensas y motivación volitiva.", "Hipometría sacádica en tareas que exigen búsqueda deliberada de blancos gratificantes.")
        ]
    },
    {
        "num": 9,
        "name": "Corteza Opercular Posterior",
        "system": "Motor / Somatosensorial",
        "color": "#0d9488",
        "lobe": "Parietal",
        "tract": ("TRACT_SLF", "Fascículo Longitudinal Superior (SLF III / Vía Opercular)", "Fibras de Asociación Perisilviana", 19500, 89, 58, "Ageusia focal, apraxia deglutoria y síndrome opercular posterior"),
        "blood": ("Arteria Cerebral Media (ACM - M3/M4 Ramas Operculares)", "ACM"),
        "areas": [
            ("43", "Área 43 (Corteza Gustativa Primaria Opercular)", "Discriminación química de los sabores básicos (dulce, salado, amargo, ácido, umami).", "Ageusia o hipogeusia gustativa contralateral con distorsión de la palatabilidad."),
            ("FOP1", "Área FOP1 (Opérculo Frontal 1)", "Sensorimotricidad laringofaringea y reflejos de deglución rítmica.", "Disfagia orofaríngea de origen cortical con riesgo elevado de broncoaspiración silente."),
            ("OP4", "Área OP4 (Opérculo Parietal 4 / SII Anterior)", "Integración sensoriomotora orofacial táctil y vibratoria somatosensorial secundaria.", "Hipoestesia peribucal y pérdida de propiocepción lingual durante la masticación."),
            ("OP1", "Área OP1 (Opérculo Parietal 1 / S2 Somatosensorial Secundaria)", "Procesamiento bilateral del dolor cutáneo y sensación térmica discriminativa.", "Asimbolia para el dolor (el paciente reconoce el pinchazo pero no le atribuye cualidad nociva)."),
            ("OP2-3", "Área OP2-3 (Opérculo Parietal 2-3)", "Percepción de vibración somestésica y reconocimiento del peso de objetos.", "Baragnosia (incapacidad para juzgar el peso relativo de dos objetos en la mano)."),
            ("PFcm", "Área PFcm (Giro Supramarginal Opercular Caudal)", "Coordinación vestibular-somatosensorial para balance cefálico durante fonación.", "Vértigo central posicional y disfonía vinculada a desorientación del plano sagital."),
            ("52", "Área 52 (Corteza Parainsular Retroauditoria)", "Acoplamiento temporoinsular para retroalimentación auditivo-fonatoria.", "Pérdida de la modulación fonatoria ante ruido ambiental elevado (efecto Lombard alterado).")
        ]
    },
    {
        "num": 10,
        "name": "Corteza Auditiva Temprana",
        "system": "Lenguaje & Auditivo",
        "color": "#06b6d4",
        "lobe": "Temporal",
        "tract": ("TRACT_THALAMIC_RADIATION", "Radiaciones Auditivas (Tracto Geniculotemporal)", "Fibras de Proyección Subcortical", 23000, 95, 68, "Sordera cortical, agnosia auditiva no verbal y pérdida de tonotopía"),
        "blood": ("Arteria Cerebral Media (ACM - M4 Rama Temporal Anterior / Heschl)", "ACM"),
        "areas": [
            ("A1", "Área A1 (Corteza Auditiva Primaria - Giro de Heschl / BA 41)", "Mapeo tonotópico estricto de frecuencias puras, onset sonoro y discriminación temporal.", "Sordera cortical bilateral (si afecta ambos giros de Heschl) o amusia aguda receptiva."),
            ("LBelt", "Área LBelt (Cinturón Auditivo Lateral)", "Análisis de sonidos complejos armónicos y formantes espectrales de la voz humana.", "Incapacidad para discriminar el timbre de instrumentos o voces de interlocutores conocidos."),
            ("MBelt", "Área MBelt (Cinturón Auditivo Medial)", "Procesamiento binaural de desfase interaural temporal para localización espacial.", "Incapacidad para localizar en el espacio de dónde proviene un sonido repentino."),
            ("PBelt", "Área PBelt (Cinturón Auditivo Posterior / Parabelt)", "Integración de secuencias acústicas fonológicas de alta tasa de repetición.", "Agnosia verbal pura (Word Deafness: se oye el habla como ruido extranjero incomprensible)."),
            ("RI", "Área RI (Giro Insular Retroauditivo)", "Conexión entre análisis acústico espectral y sistema límbico de sobresalto.", "Falta de reflejo de alerta o sobresalto ante alarmas estridentes.")
        ]
    },
    {
        "num": 11,
        "name": "Corteza Auditiva de Asociación",
        "system": "Lenguaje & Auditivo",
        "color": "#0284c7",
        "lobe": "Temporal",
        "tract": ("TRACT_ARCUATE", "Fascículo Arqueado & Fascículo Longitudinal Superior", "Fascículo de Asociación del Lenguaje", 32000, 95, 66, "Afasia de Wernicke clásica, jergafasia y anomia acústica"),
        "blood": ("Arteria Cerebral Media (ACM - M4 Rama Temporal Media / Wernicke)", "ACM"),
        "areas": [
            ("A4", "Área A4 (Temporal Superior Lateral - Análisis Fonológico)", "Decodificación fonémica de consonantes oclusivas y fricativas del lenguaje hablado.", "Afasia acústico-agnóstica con deformación de palabras y parafasias fonémicas múltiples."),
            ("A5", "Área A5 (Temporal Superior Anterior)", "Integración léxico-semántica de oraciones complejas y prosodia afectiva.", "Afasia semántica sensorial con comprensión rota del discurso fluido y prosodia neutra."),
            ("STSdp", "Área STSdp (Surco Temporal Superior Dorsal Posterior)", "Percepción de sincronía audiovisual entre movimiento labial y sonido vocal.", "Efecto McGurk abolido e incapacidad para leer los labios del interlocutor en ambientes ruidosos."),
            ("STSda", "Área STSda (Surco Temporal Superior Dorsal Anterior)", "Reconocimiento de la intencionalidad comunicativa en la voz del interlocutor.", "Dificultad para detectar sarcasmo, ironía o metáforas en comunicación hablada."),
            ("STSvp", "Área STSvp (Surco Temporal Superior Ventral Posterior)", "Análisis del movimiento biológico en rostros y gesticulación manual acompañante.", "Incapacidad para interpretar el lenguaje corporal o gestual de apoyo al habla."),
            ("STSva", "Área STSva (Surco Temporal Superior Ventral Anterior)", "Integración auditiva con centros parahipocámpicos de memoria autobiográfica de voces.", "Fonoagnosia (incapacidad para reconocer voces conocidas sin ver sus caras)."),
            ("TA2", "Área TA2 (Giro Temporal Superior Anterior Extremo)", "Procesamiento de coherencia sintáctica global de textos y narrativas extensas.", "Pérdida del hilo conductor temático en conversaciones largas y desinhibición comunicativa."),
            ("STGa", "Área STGa (Giro Temporal Superior Anterior)", "Procesamiento prosódico emocional y sintaxis oracional de alto nivel.", "Aprosodia receptiva afectiva (incapacidad para discernir enfado o alegría en la voz).")
        ]
    },
    {
        "num": 12,
        "name": "Corteza Insular y Frontal Opercular",
        "system": "Límbico / Memoria",
        "color": "#0ea5e9",
        "lobe": "Insular",
        "tract": ("TRACT_UNCINATE", "Fascículo Uncinado & Red Salience Hub Insular", "Fibras de Conexión Frontotemporal", 21000, 88, 55, "Pérdida de la empatía visceral, asimbolia para el dolor y labilidad autonómica"),
        "blood": ("Arteria Cerebral Media (ACM - Ramas Insulares M2 / Troncos Silvianos)", "ACM"),
        "areas": [
            ("PoI1", "Área PoI1 (Ínsula Posterior 1 - Termoalgesia e Interocepción)", "Mapa visceral interno de temperatura, taquicardia, respiración y dolor visceral.", "Pérdida de percepción del dolor visceral orgánico y desregulación autonómica cardíaca."),
            ("PoI2", "Área PoI2 (Ínsula Posterior 2)", "Integración de sensaciones de repleción gástrica, náusea y distensión esofágica.", "Abolición de sensación de saciedad gástrica o crisis de náusea epiléptica insular."),
            ("MI", "Área MI (Ínsula Media)", "Transición de propiocepción visceral hacia representación afectiva de la emoción.", "Labilidad emocional con risa o llanto inmotivado pseudobulbar de origen cortical."),
            ("AVI", "Área AVI (Ínsula Anterior Ventral - Hub de la Red de Saliencia)", "Evaluación subjetiva de sensaciones viscerales, empatía ante dolor ajeno y asco.", "Pérdida completa del asco conductual, tolerancia a sustancias nocivas y apatía empática."),
            ("AAIC", "Área AAIC (Corteza Agranular de la Ínsula Anterior)", "Control eferente del tono simpático-parasimpático cardíaco y presión arterial.", "Arritmias cardíacas centrales neurogénicas e inestabilidad hemodinámica post-ictus."),
            ("Pir", "Área Pir (Corteza Piriforme - Olfacción Primaria)", "Recepción consciente de estímulos odoríferos proyectados desde el bulbo olfatorio.", "Anosmia cortical, cacosmia paroxística (alucinaciones de olores pútridos en epilepsia mesial)."),
            ("FOP2", "Área FOP2 (Opérculo Frontal 2)", "Monitoreo sensoriomotor del esfuerzo vocal y corrección de tono de habla.", "Voz monótona, apagada y dificultad para autorregular volumen en ambientes silenciosos."),
            ("FOP3", "Área FOP3 (Opérculo Frontal 3)", "Coordinación entre respiración fonoarticulatoria y deglución.", "Descoordinación espiratoria al hablar con pausas inspiratorias inapropiadas."),
            ("FOP4", "Área FOP4 (Opérculo Frontal 4)", "Selección de planes articulatorios premotores para fonemas complejos.", "Apraxia fonética con tropiezos silábicos ante palabras polisilábicas complejas."),
            ("FOP5", "Área FOP5 (Opérculo Frontal 5)", "Transición de la ínsula hacia la pars triangularis de Broca.", "Enlentecimiento del acceso léxico y latencia incrementada al iniciar respuestas verbales."),
            ("Ig", "Área Ig (Ínsula Granular)", "Filtro sensorial táctil-visceral previo al procesamiento afectivo de la saliencia.", "Sensaciones cenestésicas anómalas o parestesias viscerales difusas abdominales."),
            ("PI", "Área PI (Corteza Parainsular)", "Integración quimiosensorial y termorregulación neurovegetativa.", "Termoanestesia visceral y alteración de sudoración gustativa reflexógena.")
        ]
    },
    {
        "num": 13,
        "name": "Corteza Temporal Medial",
        "system": "Límbico / Memoria",
        "color": "#f59e0b",
        "lobe": "Temporal",
        "tract": ("TRACT_FORNIX", "Fórnix & Fascículo de la Vía Perforante del Hipocampo", "Fibras Límbicas de Memoria", 17500, 86, 52, "Amnesia anterógrada pura (Síndrome Amnésico Clásico de Korsakoff/HM)"),
        "blood": ("Arteria Cerebral Posterior (ACP - Ramas Coroideas Posterolaterales y Temporales)", "ACP"),
        "areas": [
            ("H", "Área H (Complejo Hipocampal - CA1, CA2, CA3 y Subículo)", "Consolidación de nuevas memorias episódicas y espaciales en la memoria a largo plazo.", "Amnesia anterógrada severa (incapacidad total para retener nuevos hechos tras la lesión)."),
            ("PreS", "Área PreS (Presubículo - Células de Orientación de la Cabeza)", "Cálculo continuo del rumbo azimutal de la cabeza en el espacio tridimensional.", "Pérdida absoluta de orientación direccional en espacios abiertos o laberintos."),
            ("EC", "Área EC (Corteza Entorrinal - Células de Red / Grid Cells)", "Mapas de coordenadas métricas espaciales y puerta de entrada al hipocampo.", "Desorientación espacial topográfica temprana y pérdida del mapa métrico del entorno (Alzheimer)."),
            ("PeEc", "Área PeEc (Corteza Perientorrinal)", "Detección de novedad versus familiaridad en objetos visuales y rostros.", "Falsa sensación de familiaridad permanente (déjà vu patológico) o agnosia de familiaridad."),
            ("TF", "Área TF (Giro Parahipocámpico Lateral)", "Integración entre el 'qué' visual del objeto y el 'dónde' espacial del contexto.", "Dificultad para recordar en qué lugar exacto se produjo un evento autobiográfico."),
            ("PHA1", "Área PHA1 (Área Parahipocámpica 1)", "Almacenamiento de escenas visuales complejas y vistas panorámicas de lugares.", "Incapacidad para memorizar la distribución espacial de muebles o habitaciones nuevas."),
            ("PHA2", "Área PHA2 (Área Parahipocámpica 2)", "Fusión de información auditiva y espacial para la contextualización de recuerdos.", "Desconexión entre el contexto sonoro de una experiencia y su recuerdo espacial."),
            ("PHA3", "Área PHA3 (Área Parahipocámpica Posterior)", "Transición de la corteza parahipocámpica al polo visual ventromedial.", "Amnesia retrógrada focal para paisajes urbanos conocidos previamente a la lesión.")
        ]
    },
    {
        "num": 14,
        "name": "Corteza Temporal Lateral",
        "system": "Límbico / Memoria",
        "color": "#f97316",
        "lobe": "Temporal",
        "tract": ("TRACT_ILF", "Fascículo Longitudinal Inferior & Fascículo Uncinado", "Fibras de Asociación Occipitotemporal", 25000, 90, 58, "Demencia Semántica, anomia de nombres propios y pérdida del concepto de objetos"),
        "blood": ("Arteria Cerebral Media (ACM - M4 Temporal) & ACP", "ACM"),
        "areas": [
            ("TGd", "Área TGd (Polo Temporal Dorsal - Reconocimiento Social)", "Almacenamiento de conceptos semánticos sociales, normas culturales y biografías.", "Pérdida de empatía social, desinhibición conductual y demencia semántica focal."),
            ("TGv", "Área TGv (Polo Temporal Ventral)", "Memoria semántica abstracta de entidades animadas versus inanimadas.", "Déficit semántico específico de categoría (pérdida de palabras para animales o plantas)."),
            ("TE1a", "Área TE1a (Temporal Inferior Anterior)", "Almacén de significados léxicos para objetos manufacturados y herramientas de mano.", "Anomia semántica severa con circunloquios (se describe el uso pero no halla el nombre)."),
            ("TE1m", "Área TE1m (Temporal Media Media)", "Extracción de propiedades funcionales y táctiles de conceptos léxicos.", "Confusión semántica con sustitución de conceptos similares (p. ej. perro por caballo)."),
            ("TE1p", "Área TE1p (Temporal Inferior Posterior)", "Interfaz entre la forma visual del objeto y su etiqueta léxica de salida.", "Dificultad de denominación por confrontación visual con acceso intacto por tacto."),
            ("TE2a", "Área TE2a (Giro Temporal Medio Ventral Anterior)", "Procesamiento de adjetivos abstractos y relaciones conceptuales categóricas.", "Incapacidad para interpretar proverbios o metáforas conceptuales complejas."),
            ("TE2p", "Área TE2p (Giro Temporal Medio Ventral Posterior)", "Almacén semántico para verbos de acción y eventos narrativos dinámicos.", "Dificultad específica para evocar verbos en comparación con sustantivos comunes."),
            ("PHT", "Área PHT (Parieto-Hemi-Temporal)", "Transición de la vía visual ventral a la corteza angular semántica.", "Déficit en lectura comprensiva de textos técnicos o científicos abstractos."),
            ("PH", "Área PH (Temporal Posterior Profunda)", "Vínculo de memoria entre reconocimiento de objetos e hitos topográficos.", "Dificultad para localizar objetos dentro de una vitrina o estantería compleja.")
        ]
    },
    {
        "num": 15,
        "name": "Unión Temporo-Parieto-Occipital",
        "system": "Lenguaje & Auditivo",
        "color": "#38bdf8",
        "lobe": "Parietal",
        "tract": ("TRACT_ARCUATE", "Fascículo Arqueado (Vía Perisilviana Posterior)", "Fascículo Principal del Lenguaje", 35000, 96, 70, "Afasia de Conducción, alexia con agrafia y Síndrome de Gerstmann"),
        "blood": ("Arteria Cerebral Media (ACM - Rama Angular / M4)", "ACM"),
        "areas": [
            ("TPOJ1", "Área TPOJ1 (Unión Temporo-Parieto-Occipital 1)", "Integración multisensorial acústica-óptica para identificación de hablantes.", "Confusión en asignación de voces a personajes en pantalla o diálogos simultáneos."),
            ("TPOJ2", "Área TPOJ2 (Unión TPO 2 - Lectura Fonológica)", "Conversión grafema-fonema en lectura en voz alta de palabras nuevas o pseudopalabras.", "Alexia fonológica (lectura de palabras familiares intacta pero fallo en pseudopalabras)."),
            ("TPOJ3", "Área TPOJ3 (Unión TPO 3 - Comprensión Gramatical Compleja)", "Descodificación de relaciones espaciales gramaticales complejas ('el padre del hijo').", "Afasia semántica estructural con incomprensión de cláusulas sintácticas invertidas."),
            ("STV", "Área STV (Área Visual y del Lenguaje Temporal Superior)", "Integración de velocidad de lectura con comprensión semántica fluida.", "Lectura lenta, laboriosa, letra por letra con fatiga mental rápida."),
            ("PSL", "Área PSL (Área Perisilviana del Lenguaje / Wernicke Posterior)", "Nodo cardinal receptor del lenguaje hablado y decodificación léxica fonológica.", "Afasia de Wernicke clásica con lenguaje fluido incomprensible (ensalada de palabras) y anosognosia."),
            ("PCV", "Área PCV (Precúneo Visual Transicional)", "Coordinación entre la memoria visoespacial del texto y la velocidad sacádica ocular.", "Salto involuntario de líneas al leer textos justificados densos.")
        ]
    },
    {
        "num": 16,
        "name": "Corteza Parietal Superior",
        "system": "Red Ejecutiva & Saliencia",
        "color": "#84cc16",
        "lobe": "Parietal",
        "tract": ("TRACT_SLF", "Fascículo Longitudinal Superior (SLF I / Parieto-Frontal)", "Fascículo de Asociación Espacial", 26000, 91, 63, "Ataxia óptica, Síndrome de Bálint y apraxia constructiva"),
        "blood": ("Arteria Cerebral Media (ACM - M4) y ACA (Ramas Precuneales)", "ACM"),
        "areas": [
            ("7Pm", "Área 7Pm (Precúneo Medial Posterior)", "Representación espacial egocéntrica en primera persona y simulación mental de rutas.", "Pérdida de la perspectiva en primera persona en recuerdos y desorientación visoespacial."),
            ("7AL", "Área 7AL (Parietal Superior Anterolateral)", "Cálculo de postura de la extremidad superior respecto al tronco en reposo y acción.", "Ataxia óptica del miembro superior izquierdo/derecho con fallo grosero de puntería."),
            ("7Am", "Área 7Am (Parietal Superior Anteromedial)", "Coordinación visotáctil de ambas manos trabajando conjuntamente en espacio medio.", "Apraxia bimanual constructiva (incapacidad para abotonarse la camisa o manipular cubiertos)."),
            ("7PL", "Área 7PL (Parietal Superior Posterolateral)", "Filtro atencional espacial para ignorar distractores visuales en búsqueda activa.", "Hiperdistraibilidad espacial e incapacidad para localizar una figura oculta."),
            ("7PC", "Área 7PC (Parietal Superior Caudal)", "Transformación de coordenadas retinianas en coordenadas motoras para prensión.", "Apertura digital manual discordante con el tamaño del objeto que se desea agarrar."),
            ("LIPv", "Área LIPv (Área Intraparietal Lateral Ventral)", "Priorización atencional para programación de movimientos sacádicos visuales.", "Hipometría de las sacadas oculares hacia el campo contralateral con retraso atencional."),
            ("LIPd", "Área LIPd (Área Intraparietal Lateral Dorsal)", "Mapeo continuo del vector de error entre posición ocular y blanco espacial.", "Inestabilidad de fijación visual con microsacadas erráticas de búsqueda."),
            ("VIP", "Área VIP (Área Intraparietal Ventral - Espacio Peripersonal)", "Definición del espacio peripersonal defensivo alrededor del rostro y cabeza.", "Abolición de reflejos defensivos de parpadeo y retirada ante objetos que se acercan a la cara."),
            ("MIP", "Área MIP (Área Intraparietal Medial - Neuronas de Alcance)", "Planificación cinemática del vector de extensión del brazo hacia un objetivo.", "Dismetría en el alcance de objetos con correcciones múltiples en el trayecto de la mano."),
            ("AIP", "Área AIP (Área Intraparietal Anterior - Neuronas de Agarre / Grasp)", "Codificación de la forma del objeto para adaptar la postura de pinza manual.", "Incapacidad para configurar la pinza índice-pulgar adecuada antes de tocar el objeto.")
        ]
    },
    {
        "num": 17,
        "name": "Corteza Parietal Inferior",
        "system": "Red Ejecutiva & Saliencia",
        "color": "#22c55e",
        "lobe": "Parietal",
        "tract": ("TRACT_SLF", "Fascículo Longitudinal Superior (SLF II/III) & Arqueado", "Fascículo de Asociación Superior", 31000, 93, 67, "Síndrome de Gerstmann, apraxia ideomotora y hemi-negligencia espacial"),
        "blood": ("Arteria Cerebral Media (ACM - M4 Ramas Parietales Posteriores)", "ACM"),
        "areas": [
            ("PGp", "Área PGp (Giro Angular Posterior)", "Cálculo matemático abstracto y resolución de operaciones aritméticas simbólicas.", "Acalculia pura (pérdida de la capacidad de operar con números) en el Síndrome de Gerstmann."),
            ("PGs", "Área PGs (Giro Angular Superior)", "Discriminación derecha-izquierda y orientación espacial sobre el propio cuerpo.", "Desorientación derecha-izquierda (el paciente confunde su mano derecha con la izquierda)."),
            ("PGi", "Área PGi (Giro Angular Inferior - Semántica Léxica)", "Acceso a la ortografía de palabras durante escritura espontánea y dictado.", "Agrafia pura o alexia angular (incapacidad para escribir oraciones coherentes)."),
            ("PFm", "Área PFm (Giro Supramarginal Medial)", "Atención selectiva sostenida en el espacio extrapersonal hemisférico.", "Negligencia espacial unilateral hemiespacial grave con omisión del lado izquierdo/derecho."),
            ("PF", "Área PF (Giro Supramarginal Propiamente Dicho)", "Mapeo somatosensorial de los dedos de la mano para reconocimiento individual.", "Agnosia digital (incapacidad para nombrar, señalar o reconocer los propios dedos examinados)."),
            ("PFt", "Área PFt (Giro Supramarginal Transicional)", "Representación abstracta del uso de herramientas comunes (tijeras, martillo, llave).", "Apraxia ideomotora (se sabe qué hace la herramienta pero no se puede imitar su uso)."),
            ("PFop", "Área PFop (Giro Supramarginal Opercular)", "Planificación secuencial de gestos transitivos e intransitivos a la orden verbal.", "Incapacidad para hacer gestos simbólicos a la orden (p. ej. saludo militar o decir adiós)."),
            ("IP0", "Área IP0 (Surco Intraparietal Cero)", "Transformación temprana de señales visuales occipitales hacia coordenadas de acción.", "Retraso en la respuesta motora ante cambios repentinos de posición del blanco visual."),
            ("IP1", "Área IP1 (Surco Intraparietal 1)", "Estimación numérica no verbal y comparación intuitiva de magnitudes de conjuntos.", "Discalculia de magnitudes (incapacidad para juzgar cuál grupo de objetos es más numeroso)."),
            ("IP2", "Área IP2 (Surco Intraparietal 2)", "Fusión de información espacial con la red de control ejecutivo frontoparietal.", "Dificultad en resolución de rompecabezas tridimensionales o ensamblaje de bloques.")
        ]
    },
    {
        "num": 18,
        "name": "Corteza Cingular Posterior",
        "system": "Límbico / Memoria",
        "color": "#eab308",
        "lobe": "Límbico",
        "tract": ("TRACT_CINGULUM", "Fascículo del Cíngulo Posterior & Vía Parahipocámpica", "Fascículo Límbico Principal", 27000, 94, 65, "Pérdida de memoria autobiográfica episódica y desconexión de la DMN"),
        "blood": ("Arteria Cerebral Anterior (ACA - A3 pericallosa) & ACP (Ramas Espleniales)", "ACA"),
        "areas": [
            ("DVT", "Área DVT (Área Transicional Visual Dorsal)", "Interfaz entre corteza occipital visual medial y áreas cingular-parietales.", "Pérdida de nitidez visual en la evocación mental de recuerdos biográficos."),
            ("ProS", "Área ProS (Corteza Prostata / Istmo Cingular)", "Tránsito de información mnésica hipocámpica hacia el esplenio del cuerpo calloso.", "Amnesia retrógrada autobiográfica con conservación de memoria semántica genérica."),
            ("POS1", "Área POS1 (Surco Parietooccipital 1)", "Definición del límite posterior del precúneo para visualización mental espacial.", "Incapacidad para rotar mentalmente una imagen de un objeto en el espacio tridimensional."),
            ("POS2", "Área POS2 (Surco Parietooccipital 2)", "Filtro retinotópico de baja resolución de la periferia visual durante introspección.", "Desatención de estímulos periféricos cuando el sujeto se encuentra absorto en pensamientos."),
            ("RSC", "Área RSC (Corteza Retroesplenial - BA 29/30)", "Transformación entre marcos de referencia espaciales egocéntricos y alocéntricos.", "Desorientación topográfica alocéntrica pura (incapacidad de orientarse usando un mapa callejero)."),
            ("v23ab", "Área v23ab (Cingular Posterior Ventral - Hub Cardinal de DMN)", "Nodo central de la Red Neuronal por Defecto (DMN), ensoñación y autorreflexión.", "Deterioro precoz en enfermedad de Alzheimer con desconexión masiva de la red DMN."),
            ("d23ab", "Área d23ab (Cingular Posterior Dorsal)", "Monitoreo del balance metabólico entre atención interna focalizada y mundo exterior.", "Intrusión persistente de pensamientos distractores internos durante pruebas de atención externa."),
            ("31pv", "Área 31pv (Área Cingular 31 Posteroventral)", "Recuperación de detalles temporales de memorias de la infancia y eventos vitales.", "Sensación de despersonalización temporal respecto al propio pasado autobiográfico."),
            ("31pd", "Área 31pd (Área Cingular 31 Posterodorsal)", "Integración de juicios morales y empatía en toma de decisiones retrospectivas.", "Apatía moral y frialdad afectiva al recordar transgresiones éticas personales."),
            ("31a", "Área 31a (Área Cingular 31 Anterior)", "Transición de corteza cingular hacia corteza somatosensorial motora suplementaria.", "Enlentecimiento en el cambio de marcha motora guiada por introspección."),
            ("23c", "Área 23c (Cingular Media Caudal)", "Regulación del tono simpático cutáneo ante pensamientos emotivos de alarma.", "Abolición de respuesta galvánica cutánea emocional ante recuerdos estresantes."),
            ("23d", "Área 23d (Cingular Posterior Profunda)", "Conexión recíproca con núcleos talámicos mediodorsales y pulvinar.", "Confusión espacial transitoria y amnesia lacunar post-isquémica parietal medial."),
            ("7m", "Área 7m (Precúneo Medial Anterior)", "Construcción del self subjetivo y conciencia autoconsciente en estado de reposo.", "Estados confusionales agudos, delirios de inexistencia del yo (Síndrome de Cotard).")
        ]
    },
    {
        "num": 19,
        "name": "Corteza Cingular Anterior y Prefrontal Medial",
        "system": "Red Ejecutiva & Saliencia",
        "color": "#f43f5e",
        "lobe": "Frontal",
        "tract": ("TRACT_CINGULUM", "Fascículo del Cíngulo Anterior & Radiación Frontal Medial", "Fibras de Asociación Frontolímbica", 28000, 92, 62, "Mutismo acinético, abulia profunda y alteración del monitoreo de errores"),
        "blood": ("Arteria Cerebral Anterior (ACA - A2 pericallosa y callosomarginal)", "ACA"),
        "areas": [
            ("33pr", "Área 33pr (Área Cingular 33 Prerrolándica)", "Monitoreo del conflicto cognitivo y registro autonómico del dolor visceral.", "Indiferencia ante el error propio e incapacidad para modular la conducta tras una equivocación."),
            ("p24pr", "Área p24pr (Cingular 24 Posterior Prerrolándica)", "Iniciación del impulso motor voluntario para la acción física con esfuerzo.", "Abulia grave con parálisis de la voluntad para iniciar tareas físicas simples."),
            ("a24pr", "Área a24pr (Cingular 24 Anterior Prerrolándica)", "Resolución de interferencia cognitiva (detección del conflicto en prueba de Stroop).", "Efecto Stroop multiplicado con incapacidad para inhibir la lectura automática de la palabra."),
            ("p24", "Área p24 (Giro Cingular Anterior Caudal)", "Coordinación de respuestas afectivas de alerta y defensa vocal ante amenazas.", "Falta de respuesta vocal de socorro ante peligros inminentes."),
            ("a24", "Área a24 (Giro Cingular Anterior Rostral)", "Evaluación de costos versus beneficios en la motivación de conductas a largo plazo.", "Desinterés por metas a largo plazo con búsqueda inmediata de gratificaciones triviales."),
            ("p32pr", "Área p32pr (Corteza Paracingular Posterior)", "Procesamiento de recompensas inciertas y calibración de expectativa de éxito.", "Toma de decisiones extremadamente arriesgada con infravaloración de probabilidades de pérdida."),
            ("a32pr", "Área a32pr (Corteza Paracingular Anterior)", "Monitoreo continuo del feedback social de aprobación o rechazo en grupos.", "Inmunidad aparente al rechazo social con conductas desadaptadas en público."),
            ("d32", "Área d32 (Corteza Paracingular Dorsal)", "Representación abstracta del estatus jerárquico y reputación en interacciones.", "Conductas desafiantes inapropiadas ante figuras de autoridad o pérdida del sentido jerárquico."),
            ("p32", "Área p32 (Corteza Cingular Pregenual)", "Regulación del estado de ánimo basal y conexión con el eje hipotálamo-hipofisario.", "Depresión resistente al tratamiento, anhedonia profunda y tristeza refractaria."),
            ("s32", "Área s32 (Corteza Subgenual / Área 25 de Mayberg)", "Epicentro de la tristeza fisiológica y modulación de la respuesta autonómica depresógena.", "Hiperactividad patológica en depresión mayor melanchólica; diana para estimulación cerebral profunda."),
            ("8BM", "Área 8BM (Frontal Medial Superior / SMA Previa)", "Control cognitivo voluntario de selección de respuestas complejas no familiares.", "Perseveración motora y verbal con incapacidad para cambiar de criterio (falla de shifting)."),
            ("9m", "Área 9m (Prefrontal Medial Superior - Teoría de la Mente)", "Inferencia de estados mentales, creencias y deseos en otras personas (Mentalización).", "Pérdida de Teoría de la Mente (incomprensión de dobles intenciones o falsas creencias ajenas)."),
            ("10v", "Área 10v (Frontopolar Medial Ventral)", "Integración de juicios morales personales intuitivos y empatía compasiva.", "Sociopatía adquirida con falta de remordimiento y conducta utilitarista fría."),
            ("10r", "Área 10r (Frontopolar Medial Rostral)", "Planificación prospectiva del futuro propio (Memoria Prospectiva / 'Viaje en el tiempo mental').", "Incapacidad para recordar cumplir una instrucción pautada para más adelante en el día."),
            ("25", "Área 25 (Corteza Subcallosa de Broca)", "Modulación autonómica de frecuencia cardíaca y sudoración según el estado anímico.", "Bradicardia, hipotensión y llanto incontrolable en crisis disfóricas agudas.")
        ]
    },
    {
        "num": 20,
        "name": "Corteza Orbitofrontal y Polar",
        "system": "Red Ejecutiva & Saliencia",
        "color": "#fb7185",
        "lobe": "Frontal",
        "tract": ("TRACT_UNCINATE", "Fascículo Uncinado & Radiación Orbitofrontal", "Fibras de Conexión Frontolímbica", 24000, 89, 56, "Desinhibición frontal, impulsividad sociopática y Síndrome de Phineas Gage"),
        "blood": ("Arteria Cerebral Anterior (Ramas Orbitofrontales) & ACM", "ACA"),
        "areas": [
            ("47s", "Área 47s (Orbitofrontal Posterior Lateral)", "Evaluación del valor hedonista de recompensas gustativas, olfatorias y sexuales.", "Hiperoralidad, bulimia compulsiva y desinhibición sexual en Síndrome de Klüver-Bucy."),
            ("47m", "Área 47m (Orbitofrontal Media Lateral)", "Actualización del valor de una recompensa cuando se produce devaluación o saciedad.", "Insensibilidad a la devaluación (continuar consumiendo alimentos que ya no agradan)."),
            ("a47r", "Área a47r (Orbitofrontal Anterior Rostral)", "Inhibición activa de respuestas impulsivas inmediatas a favor de beneficios diferidos.", "Impulsividad patológica con juego patológico (ludopatía) y compras compulsivas."),
            ("11l", "Área 11l (Área 11 Lateral / Giro Recto Lateral)", "Aprendizaje de reversión (Reversal Learning): detectar cuándo una regla premiada cambia.", "Perseveración en conductas que ahora producen castigo económico o social."),
            ("13l", "Área 13l (Área 13 Lateral)", "Monitoreo de señales visceroceptivas asociadas al castigo (Marcador Somático de Damasio).", "Ausencia de intuición de riesgo; no se experimentan 'corazonadas' protectoras ante estafas."),
            ("OFC", "Área OFC (Corteza Orbitofrontal Propiamente Dicha)", "Codificación de la escala común de valor económico subjetivo entre opciones diversas.", "Incapacidad para elegir racionalmente entre opciones de naturaleza dispar (dinero vs tiempo)."),
            ("pOFC", "Área pOFC (Corteza Orbitofrontal Posterior)", "Conexión directa con la amígdala basolateral para evaluación de amenazas inmediatas.", "Extinción deficiente del miedo condicionado y ansiedad fóbica persistente."),
            ("10pp", "Área 10pp (Frontopolar Polo Anterior)", "Mantenimiento simultáneo de múltiples objetivos en mente con ramificación cognitiva (Branching).", "Incapacidad para alternar entre tareas complejas sin olvidar en cuál punto quedó la primera."),
            ("a10p", "Área a10p (Frontopolar Polar Anterior)", "Metacognición: evaluación reflexiva de la certeza sobre el conocimiento propio.", "Exceso de confianza no justificado o incapacidad para reconocer el propio desconocimiento."),
            ("p10p", "Área p10p (Frontopolar Polar Posterior)", "Prospección de escenarios hipotéticos contrafácticos ('lo que habría ocurrido si...').", "Incapacidad para experimentar arrepentimiento constructivo tras decisiones desacertadas."),
            ("10d", "Área 10d (Frontopolar Dorsal)", "Asignación jerárquica de recursos atencionales hacia metas de largo horizonte temporal.", "Déficit en planificación de proyectos vitales a medio y largo plazo (desorganización biográfica).")
        ]
    },
    {
        "num": 21,
        "name": "Corteza Frontal Inferior",
        "system": "Lenguaje & Auditivo",
        "color": "#00f0ff",
        "lobe": "Frontal",
        "tract": ("TRACT_ARCUATE", "Fascículo Arqueado & Fascículo Frontoccipital Inferior (IFOF)", "Fascículo Principal del Lenguaje", 38000, 97, 72, "Afasia de Broca clásica, agramatismo motor, apraxia del habla y anomia sintáctica"),
        "blood": ("Arteria Cerebral Media (ACM - M4 Rama Frontal Ascendente / Candelabro)", "ACM"),
        "areas": [
            ("44", "Área 44 (Pars Opercularis - Área de Broca Clásica)", "Codificación fonológica motora, ensamble morfosintáctico y secuenciación del habla.", "Afasia de Broca motora clásica (habla no fluida, trabajosa, agramática con comprensión preservada)."),
            ("45", "Área 45 (Pars Triangularis - Área de Broca Semántica)", "Selección semántica controlada activa entre alternativas léxicas concurrentes.", "Dificultad severa en recuperación de palabras con reducción drástica de fluidez verbal."),
            ("IFJp", "Área IFJp (Unión Frontal Inferior Posterior)", "Control de la atención ejecutiva para la alternancia entre conjuntos de reglas de tareas.", "Bloqueo mental y perseveración rígida al intentar cambiar de tarea en el test de Wisconsin."),
            ("IFJa", "Área IFJa (Unión Frontal Inferior Anterior)", "Mantenimiento activo en memoria de trabajo de instrucciones verbales de una tarea.", "Pérdida inmediata de las instrucciones de trabajo al presentarse una breve interrupción sonora."),
            ("IFSp", "Área IFSp (Surco Frontal Inferior Posterior)", "Inhibición de respuestas motoras automatizadas pero inapropiadas al contexto.", "Falla en tareas Go / No-Go con respuestas compulsivas e incapacidad de frenado motor."),
            ("IFSa", "Área IFSa (Surco Frontal Inferior Anterior)", "Integración entre gramática sintáctica y prosodia lingüística estructurada.", "Habla telegráfica monótona con omisión de artículos, preposiciones y flexiones verbales."),
            ("47l", "Área 47l (Pars Orbitalis Lateral - Selección Semántica)", "Recuperación semántica guiada por conceptos abstractos y resolución de ambigüedad.", "Pérdida de la habilidad para resolver analogías abstractas verbales complejas."),
            ("p47r", "Área p47r (Pars Orbitalis Rostral)", "Control ejecutivo sobre las redes temporales semánticas durante lectura comprensiva.", "Lectura superficial con imposibilidad de extraer la conclusión central de un párrafo largo.")
        ]
    },
    {
        "num": 22,
        "name": "Corteza Prefrontal Dorsolateral",
        "system": "Red Ejecutiva & Saliencia",
        "color": "#3b82f6",
        "lobe": "Frontal",
        "tract": ("TRACT_SLF", "Fascículo Longitudinal Superior (SLF II) & Vía Frontostriada", "Fibras de Asociación Ejecutiva", 36000, 96, 70, "Síndrome Disejecutivo Clásico (Wisconsin Alterado, desorganización, apatía y falta de flexibilidad)"),
        "blood": ("Arteria Cerebral Media (ACM - M4 Frontales Anteriores y Medias)", "ACM"),
        "areas": [
            ("8C", "Área 8C (Prefrontal Dorsolateral Caudal)", "Mapeo atencional de coordenadas motoras de selección entre estímulos espaciales múltiples.", "Déficit en atención dividida y lentificación en exploración visual de tableros de control."),
            ("8Av", "Área 8Av (Prefrontal Dorsolateral Intermedia Ventral)", "Memoria de trabajo espacial: retención de posiciones de objetivos visuales ausentes.", "Pérdida de memoria de trabajo espacial (olvido de dónde se vio ocultar un objeto segundos antes)."),
            ("i6-8", "Área i6-8 (Transición entre Premotora 6 y Área 8)", "Puente entre el plan motor de acción física y el control atencional superior.", "Descoordinación entre lo que el paciente decide ejecutar y el movimiento inicial de su mano."),
            ("s6-8", "Área s6-8 (Surco Frontal Superior Transicional)", "Coordinación entre postura del cuello y direccionamiento atencional voluntario.", "Torpeza al guiar la orientación cefálica hacia eventos inesperados del entorno."),
            ("SFL", "Área SFL (Giro Frontal Superior Lateral)", "Mantenimiento de reglas abstractas complejas durante largos períodos de espera.", "Abandono prematuro de actividades que requieren paciencia o demora de la gratificación."),
            ("8BL", "Área 8BL (Frontal Superior Dorsal Medial)", "Monitoreo del esfuerzo mental invertido en tareas cognitivas de alta dificultad.", "Fatiga mental patológica precoz tras minutos de concentración intelectual moderada."),
            ("9p", "Área 9p (Prefrontal Dorsolateral Superior Posterior)", "Manipulación y reordenamiento activo de ítems almacenados en la memoria de trabajo.", "Incapacidad para invertir números o deletrear palabras al revés en la prueba mental."),
            ("9a", "Área 9a (Prefrontal Dorsolateral Superior Anterior)", "Planificación estratégica de múltiples pasos ordenados para alcanzar una meta.", "Desorganización caótica en ejecución de la prueba de la Torre de Londres / Hanoi."),
            ("8Ad", "Área 8Ad (Frontal Superior Dorsal Lateral)", "Inhibición de patrones de respuesta habituales a favor de estrategias creativas nuevas.", "Perseveración en métodos ineficaces con incapacidad para innovar soluciones alternativas."),
            ("p9-46v", "Área p9-46v (DLPFC Ventrolateral Posterior - BA 46/9)", "Supervisión ejecutiva continua del desempeño en tiempo real y detección de desvíos.", "Síndrome disejecutivo puro con desvío constante respecto al objetivo principal de la tarea."),
            ("a9-46v", "Área a9-46v (DLPFC Ventrolateral Anterior)", "Resistencia a la interferencia proactiva de recuerdos antiguos sobre la tarea presente.", "Intrusión persistente de datos antiguos obsoletos que contaminan el trabajo actual."),
            ("46", "Área 46 (Corteza Prefrontal Dorsolateral Principal / BA 46)", "Epicentro cardinal de la memoria de trabajo, razonamiento lógico fluido y abstracción.", "Déficit severo de abstracción, pensamiento concreto infantil y fracaso total en Wisconsin."),
            ("9-46d", "Área 9-46d (DLPFC Dorsal - Centro Neurálgico Ejecutivo)", "Integración jerárquica de metas, inhibición motora y flexibilidad cognitiva fluida.", "Apatía severa alternada con desinhibición, síndrome prefrontal dorsolateral bilateral.")
        ]
    }
]

def main():
    total_areas = sum(len(m["areas"]) for m in MODULES_SPEC)
    print(f"Total modules: {len(MODULES_SPEC)}, Total areas: {total_areas}")

    modules_meta = []
    nodes_code = []

    for m in MODULES_SPEC:
        m_num = m["num"]
        m_name = m["name"]
        m_system = m["system"]
        m_color = m["color"]
        m_lobe = m["lobe"]
        m_tract = m["tract"]
        m_blood = m["blood"]

        tract_info = {
            "tractId": m_tract[0],
            "name": m_tract[1],
            "category": m_tract[2],
            "fibersCount": m_tract[3],
            "myelination": m_tract[4],
            "conductionVelocity": m_tract[5],
            "clinicalDisconnectionSummary": m_tract[6]
        }

        area_ids = []

        for area in m["areas"]:
            code_id = area[0]
            node_id = f"GLASSER_{code_id.replace('-', '_')}"
            area_ids.append(node_id)
            
            # Retrieve real MNI from FreeSurfer annot centroids
            if code_id in REAL_MNI:
                mni = REAL_MNI[code_id]
            else:
                print(f"Warning: {code_id} not in REAL_MNI!")
                mni = [-35.0, -15.0, 20.0]

            pos = mni_to_three(mni[0], mni[1], mni[2])
            full_name = area[1]
            cog = area[2]
            clin = area[3]

            node_dict = {
                "id": node_id,
                "name": full_name,
                "shortName": f"Área {code_id}",
                "atlasId": f"HCP-MMP1.0_L_{code_id}",
                "moduleNumber": m_num,
                "moduleName": m_name,
                "system": m_system,
                "hemisphere": "left",
                "lobe": m_lobe,
                "type": "cortical",
                "position": pos,
                "mniCoordinates": mni,
                "color": m_color,
                "baseFiringRate": round(36.0 + ((len(code_id) * 4.3 + m_num * 1.7) % 22.0), 1),
                "bloodSupply": m_blood[0],
                "arterialTerritoryId": m_blood[1],
                "cognitiveFunction": cog,
                "clinicalCorrelation": clin,
                "connectivityStatus": "Nominal",
                "associatedTract": tract_info,
                "associatedTracts": [tract_info]
            }
            nodes_code.append(node_dict)

        modules_meta.append({
            "num": m_num,
            "name": m_name,
            "system": m_system,
            "color": m_color,
            "lobe": m_lobe,
            "areasCount": len(area_ids),
            "areaIds": area_ids
        })

    # Write glasserFull180DB.ts
    output_lines = [
        "// Mark 1: Full 180 Glasser Cortical Parcellation Database (HCP-MMP1.0)",
        "// Generated automatically according to Glasser et al. (Nature 2016)",
        "import type { FunctionalSystem, AssociatedTractInfo } from './mockGlasserData';",
        "",
        "export interface Glasser180Module {",
        "  num: number;",
        "  name: string;",
        "  system: FunctionalSystem;",
        "  color: string;",
        "  lobe: 'Frontal' | 'Temporal' | 'Occipital' | 'Parietal' | 'Insular' | 'Límbico';",
        "  areasCount: number;",
        "  areaIds: string[];",
        "}",
        "",
        "export interface GlasserFullNode {",
        "  id: string;",
        "  name: string;",
        "  shortName: string;",
        "  atlasId: string;",
        "  moduleNumber: number;",
        "  moduleName: string;",
        "  system: FunctionalSystem;",
        "  hemisphere: 'left' | 'right' | 'bilateral' | 'subcortical';",
        "  lobe: 'Frontal' | 'Temporal' | 'Occipital' | 'Parietal' | 'Subcortical' | 'Insular' | 'Límbico' | 'Tronco Encefálico';",
        "  type: 'cortical' | 'subcortical';",
        "  position: [number, number, number];",
        "  mniCoordinates: [number, number, number];",
        "  color: string;",
        "  baseFiringRate: number;",
        "  bloodSupply: string;",
        "  arterialTerritoryId: string;",
        "  cognitiveFunction: string;",
        "  clinicalCorrelation: string;",
        "  connectivityStatus: 'Nominal' | 'Hiperactivo' | 'Penumbra Isquémica' | 'Desconexión Severa';",
        "  associatedTract: AssociatedTractInfo;",
        "  associatedTracts: AssociatedTractInfo[];",
        "}",
        "",
        f"export const GLASSER_MODULES_22: Glasser180Module[] = {json.dumps(modules_meta, indent=2, ensure_ascii=False)};",
        "",
        f"export const GLASSER_FULL_180_NODES: GlasserFullNode[] = {json.dumps(nodes_code, indent=2, ensure_ascii=False)};",
        ""
    ]

    target_ts = os.path.join(os.path.dirname(__file__), "..", "src", "data", "glasserFull180DB.ts")
    with open(target_ts, "w", encoding="utf-8") as f:
        f.write("\n".join(output_lines))
    print(f"[OK] Generated {target_ts} with {len(nodes_code)} nodes.")

    # Now compute vertex coloring mapping for Hemisphere_Left (10,242 vertices)
    import trimesh
    from scipy.spatial import cKDTree

    glb_path = os.path.join(os.path.dirname(__file__), "..", "public", "models", "brain_mni152.glb")
    scene = trimesh.load(glb_path)
    left_mesh = scene.geometry['Hemisphere_Left']
    vertices = left_mesh.vertices

    area_positions = np.array([n["position"] for n in nodes_code])
    tree = cKDTree(area_positions)
    _, vertex_area_indices = tree.query(vertices)

    def hex_to_rgb(h):
        h = h.lstrip('#')
        return [int(h[i:i+2], 16) / 255.0 for i in (0, 2, 4)]

    vertex_colors = []
    for idx in vertex_area_indices:
        hex_col = nodes_code[idx]["color"]
        rgb = hex_to_rgb(hex_col)
        vertex_colors.append([round(c, 3) for c in rgb])

    parcels_payload = {
        "vertexCount": len(vertices),
        "vertexAreaIndices": vertex_area_indices.tolist(),
        "vertexColors": vertex_colors,
        "areaNodesSummary": [
            {"id": n["id"], "name": n["name"], "color": n["color"], "position": n["position"]}
            for n in nodes_code
        ]
    }

    out_json = os.path.join(os.path.dirname(__file__), "..", "public", "models", "glasser_vertex_parcels.json")
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(parcels_payload, f)
    print(f"[OK] Generated {out_json} for 10242 vertices parcel mapping.")

if __name__ == "__main__":
    main()
