import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { BarChart2, Printer, ChevronDown, Building, User, Calendar } from 'lucide-react';

// --- BASE DE DATOS (Extraída de la Rúbrica ARALECTO) ---
const rawText = `
1. CONTEXTUALIZACIÓN
Valoración
Fortalezas
Ítem 1.a. Describe el centro educativo y su diversidad curricular
☐ La contextualización del centro es detallada e incluye datos relevantes (alumnado, profesorado, entorno sociocultural, lenguas vehiculares, etc.).
☐ Se contemplan las necesidades específicas del alumnado en relación con la competencia lectora (NEAE, diversidad lingüística, etc.).
☐ Se establece una relación clara entre el contexto del centro y el diseño del Plan de Lectura.
☐ Se tiene en cuenta la participación de las familias y agentes externos.
☐ Se reconoce la lectura como eje transversal del aprendizaje en todas las áreas.
Ítem 1.b. Indica la importancia de un enfoque transversal para la lectura
☐ Se justifica su contribución al desarrollo competencial del alumnado.
☐ Existe coherencia con el proyecto educativo de centro y la normativa vigente.
☐ Se promueve una visión compartida de la lectura por parte del profesorado.
Aspectos de mejora
Ítem 1.a. Describe el centro educativo y su diversidad curricular
☐ La descripción del centro es general o incompleta.
☐ No se contemplan aspectos relevantes del contexto (diversidad lingüística, NEAE, entorno sociocultural, etc.).
☐ Falta relación entre el análisis del contexto y las decisiones del plan.
☐ La contextualización no se utiliza como base para la planificación.
Ítem 1.b. Indica la importancia de un enfoque transversal para la lectura
☐ La transversalidad de la lectura se menciona, pero no se concreta en la práctica.
☐ No se evidencia su integración en todas las áreas o materias.
☐ Falta fundamentación pedagógica o normativa.
☐ La lectura se percibe como responsabilidad limitada a determinadas áreas.
Orientaciones (asesoramiento)
Ítem 1.a. Describe el centro educativo y su diversidad curricular
☐ Incorporar datos concretos del centro (características del alumnado, contexto sociocultural, diversidad lingüística, etc.).
☐ Analizar las necesidades específicas del alumnado en relación con la competencia lectora.
☐ Vincular explícitamente la contextualización con las decisiones del plan.
☐ Incluir la participación de familias y agentes externos en el diseño del plan.
Ítem 1.b. Indica la importancia de un enfoque transversal para la lectura
☐ Diseñar estrategias para integrar la lectura en todas las áreas del currículo.
☐ Proponer ejemplos concretos de trabajo lector en distintas materias.
☐ Reforzar la consideración de la lectura como competencia compartida por todo el claustro.
☐ Vincular el enfoque transversal con el proyecto de centro y la normativa vigente.

Fortalezas
Ítem 2.a. Establece las líneas generales de actuación de la competencia lectora
☐ Los objetivos están claramente diferenciados en corto, medio y largo plazo.☐ Existe coherencia entre los objetivos de los distintos plazos.☐ Se presenta un cronograma claro, estructurado y fácil de interpretar.☐ La planificación temporal es realista y viable en el contexto del centro.☐ Los objetivos muestran una progresión lógica hacia la mejora de la competencia lectora.☐ Existe alineación entre los objetivos y las líneas de actuación del plan.☐ El cronograma facilita el seguimiento y la evaluación del plan.
☐ La evaluación está definida con criterios claros y vinculada a las líneas de actuación.
Ítem 2.b. Objetivos específicos referidos a los estudiantes
☐ Los objetivos están claramente formulados y son específicos para el alumnado.
☐ Los objetivos son medibles, alcanzables y relevantes.
☐ Se orientan al desarrollo de la competencia lectora (comprensión, expresión, lectura crítica, etc.).
☐ Se contempla la lectura en diferentes áreas y contextos de aprendizaje.
☐ Se promueve el desarrollo de habilidades como la reflexión, la creatividad y el pensamiento crítico.
☐ Se tienen en cuenta los intereses y motivaciones del alumnado.
☐ Se fomenta la participación del alumnado en actividades lectoras.
☐ Se atiende a la diversidad del alumnado (niveles, necesidades específicas, contextos lingüísticos, etc.).
Ítem 2.c Objetivos específicos referidos a los docentes
☐ Los objetivos son concretos, evaluables y orientados a la práctica docente.
☐ Se promueve la integración de la lectura en todas las áreas del currículo.
☐ Se contempla el trabajo sistemático de los géneros discursivos propios de las distintas áreas.
☐ Se contemplan estrategias específicas de enseñanza de la lectura en las distintas materias.
☐ Se fomenta la coordinación entre docentes y departamentos.
☐ Se incluye la selección y recomendación de lecturas adecuadas al alumnado.
☐ Se incorporan acciones de formación o actualización metodológica del profesorado.
☐ Se observa el diseño de actividades que desarrollan la comprensión lectora.
Ítem 2.d Objetivos específicos referidos a las familias
☐ Se promueve la participación de las familias en el desarrollo del hábito lector.
☐ Se fomenta el acompañamiento familiar en el proceso lector del alumnado.
☐ Se incluyen acciones para implicar a las familias en actividades del centro (talleres, lecturas compartidas, etc.).
☐ Se reconoce la importancia del entorno familiar en el desarrollo de la competencia lectora.
Ítem 2.e Objetivos específicos referidos al centro escolar
☐ No se contemplan tiempos o espacios específicos para la lectura.
☐ La biblioteca escolar no se integra como elemento central del plan.
☐ No se incluyen acciones de dinamización de la lectura a nivel de centro.
☐ No se evidencia la integración de la lectura en todas las áreas.
☐ La implicación de la comunidad educativa es limitada o poco definida.
☐ No se prevé la evaluación o seguimiento del plan.
☐ Falta coordinación organizativa para el desarrollo del plan.
Mejoras
Ítem 2.a. Establece las líneas generales de actuación de la competencia lectora
☐ No se diferencian claramente los objetivos según el plazo (corto, medio y largo).☐ Los objetivos aparecen desordenados o sin una secuencia temporal clara.☐ No se incluye un cronograma o este es poco claro.☐ La planificación temporal es poco realista o difícilmente aplicable.☐ No se aprecia una progresión lógica en el desarrollo del plan.☐ Los objetivos no están claramente vinculados con las actuaciones o la evaluación.☐ El cronograma no permite visualizar el seguimiento del plan.
Ítem 2.b. Objetivos específicos referidos a los estudiantes
☐ Los objetivos son demasiado generales o poco concretos.
☐ No son claramente medibles ni evaluables.
☐ Se centran de forma limitada en la competencia lectora.
☐ No contemplan la lectura en distintas áreas o contextos.
☐ No se tienen en cuenta los intereses o motivaciones del alumnado.
☐ No se aborda la diversidad del alumnado ni sus necesidades específicas.
☐ Los objetivos no promueven la participación del alumnado.
☐ Existe una desconexión entre los objetivos y las actividades propuestas.
Ítem 2.c Objetivos específicos referidos a los docentes
☐ Los objetivos son demasiado generales o poco concretos.☐ No se orientan claramente a la práctica docente.☐ No se evidencia la integración de la lectura en todas las áreas.
☐ No se contempla el trabajo sistemático de los distintos géneros discursivos propios de las áreas.☐ No se contemplan estrategias específicas de enseñanza de la lectura.☐ Falta coordinación entre docentes o departamentos.☐ No se aborda la formación del profesorado en competencia lectora.☐ No se relacionan los objetivos con actividades concretas.
Ítem 2.d Objetivos específicos referidos a las familias
☐ No se contemplan acciones concretas para el acompañamiento lector en el hogar.
☐ No se establecen vínculos entre el centro y el entorno familiar.
☐ No se reconoce el papel de las familias en el desarrollo de la competencia lectora.
Ítem 2.e Objetivos específicos referidos al centro escolar
☐ Se justifica su contribución al desarrollo competencial del alumnado.
☐ Existe coherencia con el proyecto educativo de centro y la normativa vigente.
☐ Se promueve una visión compartida de la lectura por parte del profesorado
Orientaciones (asesoramiento)
Ítem 2.a. Establece las líneas generales de actuación de la competencia lectora
☐ Organizar los objetivos diferenciando claramente corto, medio y largo plazo.☐ Elaborar un cronograma que recoja de forma visual la secuencia temporal del plan.☐ Asegurar la coherencia entre los objetivos de los distintos plazos.☐ Ajustar la planificación temporal a las posibilidades reales del centro.☐ Vincular los objetivos con las líneas de actuación y los instrumentos de evaluación.☐ Incorporar hitos o momentos clave que faciliten el seguimiento del plan.☐ Utilizar herramientas visuales (tablas, calendarios) para mejorar la claridad del cronograma.
Ítem 2.b. Objetivos específicos referidos a los estudiantes
☐ Formular objetivos claros, concretos y evaluables (qué se quiere lograr y cómo se evidenciará).
☐ Incorporar distintas dimensiones de la competencia lectora (comprensión, análisis, interpretación, expresión).
☐ Tener en cuenta los intereses del alumnado en la selección de objetivos y actividades.
☐ Incorporar medidas de atención a la diversidad (adaptaciones, lectura guiada, apoyos específicos, etc.).
☐ Favorecer la participación del alumnado en el proceso lector.
Ítem 2.c Objetivos específicos referidos a los docentes
☐ Alinear los objetivos docentes con las líneas de actuación y la evaluación del plan.☐ Incorporar estrategias de lectura propias de cada área o materia.
☐ Elaborar un mapa de géneros discursivos por áreas que oriente el trabajo lector del alumnado☐ Promover la coordinación docente para el desarrollo de proyectos lectores interdisciplinares.☐ Incluir acciones de formación del profesorado en metodologías de fomento de la lectura.☐ Establecer criterios para la selección de lecturas adecuadas al alumnado.
Ítem 2.d Objetivos específicos referidos a las familias
☐ Proponer actividades que favorezcan la participación de las familias (talleres, clubes de lectura, etc.).
☐ Establecer canales de comunicación eficaces entre el centro y las familias.
☐ Vincular las actuaciones del centro con el entorno familiar.
Ítem 2.e Objetivos específicos referidos al centro escolar
☐ Potenciar la biblioteca escolar como eje pedagógico del Plan de Lectura.
☐ Diseñar acciones de dinamización lectora a nivel de centro (campañas, actividades, etc.).
☐ Favorecer la integración de la lectura en todas las áreas y etapas.
☐ Impulsar la participación de toda la comunidad educativa.
☐ Establecer mecanismos de coordinación para el desarrollo del plan.
☐ Definir procedimientos de evaluación y seguimiento del Plan de Lectura.

Fortalezas
Ítem 3.a. Evaluación inicial
☐ Se realiza una evaluación inicial completa de la competencia lectora del alumnado.☐ Se utilizan instrumentos variados y adecuados (pruebas, cuestionarios, observación, etc.).
☐ Se tiene en cuenta la actitud del alumnado hacia la lectura en diferentes materias.
☐ Se identifican fortalezas y debilidades del alumnado en relación con la lectura.
Ítem 3.b. Diagnóstico por áreas
☐ Se analiza el uso de la lectura en las distintas áreas o materias.☐ Se identifican los tipos de textos trabajados en cada área.☐ Existe coherencia entre el diagnóstico por áreas y las programaciones didácticas.
☐ Se hace referencia al análisis de prácticas letradas en las programaciones
Ítem 3.c Identificación de necesidades
☐ Se identifican de forma clara las necesidades del centro en relación con la competencia lectora.
☐ Se contemplan diferentes ámbitos (alumnado, profesorado, recursos, organización).
☐ Las necesidades están orientadas a la mejora del Plan de Lectura.
Mejoras 
Ítem 3.a. Evaluación inicial
☐ La evaluación inicial es superficial o poco desarrollada.
☐ Se utilizan pocos instrumentos o poco adecuados.
☐ No se considera la actitud del alumnado hacia la lectura.
☐ No se identifican claramente fortalezas y debilidades del alumnado.
Ítem 3.b. Diagnóstico por áreas
☐ No se realiza un análisis claro del uso de la lectura en las distintas áreas.
☐ El diagnóstico por áreas es general o poco sistemático.
☐ No se identifican los tipos de textos trabajados en las materias.
☐ No existe relación con las programaciones didácticas.
Ítem 3.c Identificación de necesidades
☐ Las necesidades están poco definidas o son muy generales.
☐ No están claramente fundamentadas en el diagnóstico.
☐ No abarcan todos los ámbitos relevantes (alumnado, profesorado, centro).
☐ No se orientan a la mejora real del plan.
Orientaciones (asesoramiento)
Ítem 3.a. Evaluación inicial
☐ Diseñar una evaluación inicial que permita analizar la competencia lectora del alumnado de forma objetiva.
☐ Incorporar instrumentos variados (pruebas específicas, cuestionarios, observación, entrevistas).
☐ Analizar la actitud del alumnado hacia la lectura en distintas materias.
Ítem 3.b. Diagnóstico por áreas
☐ Analizar tanto el rendimiento del alumnado como las prácticas docentes.
☐ Realizar un diagnóstico por áreas que incluya el uso de la lectura en cada materia.
☐ Identificar los géneros discursivos y tipos de textos trabajados en cada área.
☐ Vincular el diagnóstico con las programaciones didácticas.
Ítem 3.c. Identificación de necesidades
☐ Definir necesidades claras a partir del análisis realizado.
☐ Incluir necesidades relacionadas con alumnado, profesorado, organización y recursos.
☐ Vincular las necesidades con los objetivos y las líneas de actuación del plan.

Fortalezas
Ítem 4-5.a. Fomento del hábito lector y comprensión (puntos 1, 2, 5)
☐ Se incluyen actividades variadas para el fomento del hábito lector.
☐ Se trabajan distintas dimensiones de la lectura (aprender a leer, leer para aprender, leer para disfrutar).
☐ Se incorporan metodologías activas (tertulias dialógicas, clubes de lectura, lectura compartida, etc.).
☐ Se proponen actividades motivadoras y significativas para el alumnado.
☐ Las actividades están alineadas con los objetivos del Plan de Lectura.
☐ Se promueve la lectura como experiencia compartida y social.
Ítem 4-5.b. Integración de la lectura en todas las materias: mapa de géneros discursivos
☐ Se integra la lectura en todas las áreas del currículo.
☐ Se identifican los géneros discursivos propios de las distintas materias.
☐ Se contempla la lectura con distintas finalidades (aprender a leer, leer para aprender, leer para disfrutar).
Ítem 4-5.c. Biblioteca escolar como eje pedagógico 
☐ La biblioteca escolar se concibe como eje del Plan de Lectura.
☐ Se utiliza como recurso pedagógico integrado en el currículo.
☐ Se planifican actividades de dinamización lectora desde la biblioteca.
☐ Se contempla la organización y gestión de la biblioteca (fondos, espacios, horarios).
☐ Se promueve el acceso a distintos tipos de recursos (impresos, digitales, etc.).
☐ Se favorece el uso de la biblioteca por parte de alumnado, profesorado y familias.
☐ Se vincula la biblioteca con las actividades del plan y las áreas curriculares.
☐ Se promueve la biblioteca como espacio de aprendizaje autónomo e investigación.
☐ Se contempla la actualización y adecuación de los fondos a las necesidades del alumnado.
☐ Se fomenta la colaboración con otras bibliotecas o agentes externos.
Ítem 4-5.d. Innovación pedagógica y recursos digitales 
☐ Se incorporan metodologías innovadoras en el desarrollo de la competencia lectora.
☐ Se utilizan recursos digitales para fomentar la lectura en diferentes áreas del currículo.
☐ Se proponen actividades como pódcast, radio escolar o proyectos interdisciplinares.
☐ Se promueve la creatividad y la expresión del alumnado.
☐ Se favorece el uso crítico y responsable de la información.
Mejoras 
Ítem 4-5.a. Fomento del hábito lector y comprensión (puntos 1, 2, 5)
☐ Las actividades son escasas o poco variadas.
☐ Se centran en una visión limitada de la lectura (por ejemplo, tendencia a la lectura para disfrutar, olvidando aspectos claves como aprender a leer o leer para aprender).
☐ No se trabajan todas las dimensiones de la competencia lectora.
☐ Falta planificación o continuidad en las actuaciones.
☐ Las actividades son poco motivadoras o poco participativas.
☐ No existe una clara relación con los objetivos del plan.
☐ Las actuaciones aparecen como acciones aisladas sin coordinación.
Ítem 4-5.b. Integración de la lectura en todas las materias: mapa de géneros discursivos
☐ No se identifican los géneros discursivos propios de cada área.
☐ No se diferencian las funciones de la lectura (aprender, comprender, disfrutar).
☐ No existe un mapa de géneros discursivos.
Ítem 4-5.c. Biblioteca escolar como eje pedagógico 
☐ La biblioteca no se integra claramente en el Plan de Lectura.
☐ No se planifican actividades de dinamización lectora desde la biblioteca.
☐ No se promueve su uso como espacio de aprendizaje e investigación.
☐ No se vincula con las áreas curriculares ni con las actividades del plan.
☐ No se contempla la participación de la comunidad educativa.
☐ No se contempla la actualización de los fondos.
☐ No existe coordinación con otros recursos o bibliotecas del entorno.
Ítem 4-5.d. Innovación pedagógica y recursos digitales 
☐ No se incorporan metodologías innovadoras en el desarrollo de la competencia lectora.
☐ El uso de recursos digitales para fomentar la lectura es escaso o inexistente en las distintas áreas del currículo.
☐ No se proponen actividades como pódcast, radio escolar o proyectos interdisciplinares.
☐ No se promueve suficientemente la creatividad ni la expresión del alumnado.
☐ No se favorece el uso crítico y responsable de la información.
Orientaciones (asesoramiento)
Ítem 4-5.a. Fomento del hábito lector y comprensión (puntos 1, 2, 5)
☐ Diseñar actividades variadas que aborden distintas dimensiones de la lectura (aprender a leer, leer para aprender, leer para disfrutar).
☐ Incorporar metodologías activas (tertulias dialógicas, clubes de lectura, lectura compartida, entre lineas).
☐ Fomentar la participación del alumnado en las actividades lectoras.
☐ Planificar las actuaciones con continuidad a lo largo del curso.
☐ Vincular las actividades con los objetivos del plan y su evaluación.
☐ Incorporar propuestas motivadoras que favorezcan el hábito lector.
☐ Integrar actividades de comprensión lectora en diferentes contextos y áreas.
Ítem 4-5.b. Integración de la lectura en todas las materias: mapa de géneros discursivos
☐ Favorecer la coordinación docente para garantizar coherencia en el tratamiento de la lectura.
☐ Diseñar un mapa de géneros discursivos por áreas del currículo.
☐ Identificar los tipos de textos propios de cada materia.
☐ Diferenciar las funciones de la lectura: aprender a leer, leer para aprender y leer para disfrutar.
☐ Integrar la lectura de forma sistemática en todas las áreas.
Ítem 4-5.c. Biblioteca escolar como eje pedagógico 
☐ Integrar la biblioteca escolar como eje central del Plan de Lectura.
☐ Diseñar actividades de dinamización lectora vinculadas a la biblioteca.
☐ Utilizar la biblioteca como recurso didáctico en las distintas áreas.
☐ Organizar y gestionar adecuadamente los espacios, fondos y horarios.
☐ Garantizar el acceso a toda la comunidad educativa.
☐ Fomentar el uso de la biblioteca como espacio de investigación y aprendizaje autónomo.
☐ Establecer colaboración con bibliotecas públicas y otros agentes externos.
Ítem 4-5.d. Innovación pedagógica y recursos digitales 
☐ Incorporar metodologías innovadoras en el desarrollo de la competencia lectora.
☐ Integrar recursos digitales para fomentar la lectura en diferentes áreas del currículo.
☐ Diseñar actividades como pódcast, radio escolar o proyectos interdisciplinares.
☐ Promover la creatividad y la expresión del alumnado a través de la lectura.
☐ Fomentar el uso crítico y responsable de la información.

Fortalezas
Ítem 6.a. Adecuación y diversidad para la motivación del alumnado
☐ Las lecturas están adecuadas a la edad y nivel del alumnado.
☐ Se combinan obras clásicas y de literatura infantil y juvenil.
☐ Se tiene en cuenta la diversidad de intereses del alumnado.
☐ Se incluyen distintos géneros (narrativa, poesía, teatro, divulgación, etc.).
☐ Se incorporan diferentes formatos (libros, cómic, textos digitales, etc.) 
☐ Se compagina la lectura ficcional con la no ficcional.
☐ Se promueve la motivación y curiosidad hacia la lectura.
Ítem 6.b. Perspectiva inclusiva y de brecha de género en la comprensión lectora
☐ Se tienen en cuenta las diferencias individuales en la competencia lectora del alumnado.
☐ Se contemplan medidas de atención a la diversidad en la comprensión lectora.
☐ Se considera la brecha de género en la competencia lectora.
☐ Se adaptan las lecturas y actividades a distintos niveles y necesidades.
☐ Se promueve la equidad en el acceso y desarrollo de la lectura.
Mejoras
Ítem 6.a. Adecuación y diversidad para la motivación del alumnado
☐ Las lecturas no están suficientemente adaptadas al alumnado.
☐ La selección es poco variada en géneros o formatos.
☐ No se tienen en cuenta los intereses del alumnado.
☐ Las propuestas resultan poco motivadoras.
☐ No existe equilibrio entre distintos tipos de lecturas.
Ítem 6.b. Perspectiva inclusiva y de brecha de género en la comprensión lectora
☐ No se tienen en cuenta las diferencias en la competencia lectora del alumnado.
☐ La atención a la diversidad es general o poco concreta.
☐ No se identifican desigualdades en el rendimiento lector.
☐ No se contempla la posible brecha de género.
☐ No se adaptan las lecturas a distintos niveles o necesidades.
☐ No se promueve la equidad en el desarrollo de la competencia lectora.
Orientaciones (asesoramiento)
Ítem 6.a. Adecuación y diversidad para la motivación del alumnado
☐ Seleccionar lecturas adecuadas a la edad, nivel e intereses del alumnado.
☐ Incorporar variedad de géneros y formatos.
☐ Combinar lecturas clásicas y actuales.
☐ Dar participación al alumnado en la elección de lecturas.
☐ Diseñar propuestas que aumenten la motivación lectora.
Ítem 6.b. Perspectiva inclusiva y de brecha de género en la comprensión lectora
☐ Incluir estrategias para atender las diferencias individuales en la competencia lectora del alumnado.
☐ Plantear ideas para atender a la brecha de género en la competencia lectora.
☐ Proponer lecturas y actividades a distintos niveles y necesidades.
☐ Promover la equidad en el acceso y desarrollo de la lectura.

Fortalezas
Ítem 7.a. Distribución del tiempo para la lectura 
☐ Se garantiza un tiempo específico para la lectura en el horario escolar.
☐ La lectura está integrada de forma habitual en las distintas áreas.
☐ Existe una planificación sistemática del tiempo de lectura.
☐ El tiempo dedicado a la lectura es suficiente y equilibrado.
Ítem 7.b. Temporalización de proyectos
☐ Se planifican proyectos interdisciplinares.
☐ Existe un calendario de actividades y proyectos lectores.
☐ Se identifican responsables y participantes.
☐ Se favorece la coordinación entre áreas.
Mejoras
Ítem 7.a. Distribución del tiempo para la lectura 
☐ No se define claramente el tiempo dedicado a la lectura.
☐ La lectura no está integrada en todas las áreas.
☐ El tiempo de lectura es insuficiente o irregular.
☐ La planificación del tiempo es poco sistemática.
Ítem 7.b. Temporalización de proyectos
☐ No se incluyen proyectos interdisciplinares. 
☐ No existe un calendario claro de actividades.
☐ No se identifican responsables o participantes.
☐ Falta coordinación entre áreas.
Orientaciones (asesoramiento)
Ítem 7.a. Distribución del tiempo para la lectura 
☐ Establecer un tiempo específico de lectura en todas las áreas.
☐ Integrar la lectura en la práctica habitual del aula.
☐ Garantizar una distribución equilibrada del tiempo lector.
☐ Planificar de forma sistemática el tiempo dedicado a la lectura.
Ítem 7.b. Temporalización de proyectos
☐ Diseñar proyectos interdisciplinares.
☐ Elaborar un calendario de actividades lectoras.
☐ Definir responsables y participantes.
☐ Fomentar la coordinación entre áreas.

Fortalezas 
Ítem 8.a. Diseño del sistema de evaluación del Plan de Lectura 
☐ Se contemplan distintos ámbitos de evaluación (alumnado, actividades, organización, etc.).
☐ Se utilizan instrumentos variados (pruebas, cuestionarios, observación, etc.).
☐ Los instrumentos son adecuados para evaluar la competencia lectora.
☐ Los indicadores están alineados con los objetivos y las líneas de actuación.
Ítem 8.b. Seguimiento, autoevaluación y mejora del plan 
☐ Se establecen momentos de seguimiento del Plan de Lectura.
☐ Se realiza evaluación periódica del plan (trimestral, anual, etc.).
☐ Se implican distintos agentes (profesorado, alumnado, familias, etc.).
☐ Se analizan los resultados obtenidos.
☐ Se utilizan los resultados para mejorar el plan.
☐ Existe una cultura de mejora continua.
Mejoras
Ítem 8.a. Diseño del sistema de evaluación del Plan de Lectura 
☐ No se evalúan los diferentes ámbitos que participan en el plan (alumnado, actividades, organización, etc.).
☐ Los instrumentos son escasos o poco variados lo que puede dificultar la comprensión de la situación para la mejora de la competencia lectora.
☐ Los instrumentos no son adecuados para evaluar la competencia lectora.
☐ Los indicadores no están alineados con los objetivos del plan.
Ítem 8.b. Seguimiento, autoevaluación y mejora del plan 
☐ No se definen momentos de seguimiento.
☐ La evaluación del plan es puntual o inexistente.
☐ No participan los diferentes agentes que están implicados en la mejora de la competencia lectora.
☐ No se observa que los resultados estén vinculados a la mejorar del plan.
Orientaciones (asesoramiento)
Ítem 8.a. Diseño del sistema de evaluación del Plan de Lectura 
☐ Incorporar distintos ámbitos de evaluación (alumnado, organización, actividades).
☐ Utilizar instrumentos variados (pruebas, cuestionarios, observación, etc.).
☐ Alinear los indicadores con los objetivos y las actuaciones.
☐ Definir indicadores claros y medibles del Plan de Lectura.
Ítem 8.b. Seguimiento, autoevaluación y mejora del plan 
☐ Establecer momentos periódicos de seguimiento del plan.
☐ Definir procedimientos de evaluación continua.
☐ Implicar a distintos agentes en la evaluación.
☐ Utilizar los resultados para la mejora del Plan de Lectura.

Fortalezas
Ítem 9.a. Recursos humanos para coordinación del plan de lectura 
☐ Se identifica claramente la figura de coordinación del Plan de Lectura.
☐ Existe una organización clara del equipo de trabajo.
☐ Se definen funciones y responsabilidades del profesorado implicado.
☐ Se favorece la coordinación entre los distintos agentes educativos.
☐ Se implica a diferentes miembros de la comunidad educativa.
Ítem 9.b. Formación continua 
☐ La biblioteca escolar se concibe como eje del Plan de Lectura.
☐ Se utiliza como recurso pedagógico integrado en el currículo.
☐ Se planifican actividades de dinamización lectora desde la biblioteca.
☐ Se contempla la organización y gestión de la biblioteca (fondos, espacios, horarios).
☐ Se promueve el acceso a distintos tipos de recursos (impresos, digitales, etc.).
☐ Se favorece el uso de la biblioteca por parte de alumnado, profesorado y familias.
☐ Se vincula la biblioteca con las actividades del plan y las áreas curriculares.
☐ Se promueve la biblioteca como espacio de aprendizaje autónomo e investigación.
☐ Se contempla la actualización y adecuación de los fondos a las necesidades del alumnado.
☐ Se fomenta la colaboración con otras bibliotecas o agentes externos.
Ítem 9.c. Recursos materiales 
☐ Se incluyen materiales variados (libros, recursos digitales, etc.).
☐ Los recursos son adecuados al alumnado.
☐ Se contempla el uso de recursos digitales.
☐ Se identifican los recursos materiales necesarios.
Mejoras 
Ítem 9.a. Recursos humanos para coordinación del plan de lectura
☐ No se define claramente la coordinación del plan.
☐ Las funciones del profesorado no están especificadas.
☐ Falta organización en los recursos humanos.
☐ La coordinación entre agentes es limitada.
Ítem 9.b. Formación continua 
☐ Se contempla la formación del profesorado en competencia lectora.
☐ Se incluyen acciones formativas relacionadas con metodologías de lectura.
☐ La formación está alineada con las necesidades del centro.
☐ Se promueve la actualización pedagógica del profesorado.
Ítem 9.c. Recursos materiales 
☐ No se identifican claramente los recursos materiales.
☐ Los materiales no se adaptan a las necesidades del alumnado.
☐ No se contempla el uso de recursos digitales.
☐ No se propone solventar el déficit de los recursos materiales necesarios.
Orientaciones (asesoramiento)
Ítem 9.a. Recursos humanos para coordinación del plan de lectura 
☐ Definir la figura responsable de la coordinación del plan.
☐ Establecer funciones claras para los distintos agentes implicados.
☐ Organizar un equipo de trabajo para el desarrollo del plan.
☐ Favorecer la coordinación entre profesorado y otros agentes.
Ítem 9.b. Formación continua 
☐ Promover la formación continua del profesorado.
☐ Ajustar la formación a las necesidades detectadas.
☐ Diseñar un plan de formación vinculado al Plan de Lectura.
☐ Incorporar formación en metodologías y estrategias lectoras.
Ítem 9.c. Recursos materiales 
☐ Identificar los recursos materiales necesarios para el plan.
☐ Incorporar variedad de materiales (impresos y digitales).
☐ Adaptar los recursos al alumnado.
☐ Garantizar el acceso y disponibilidad de los materiales.

Fortalezas 
Ítem 10.a. Mecanismos de comunicación interna: centro educativo 
☐ Se establecen mecanismos de comunicación interna del plan.
☐ El Plan de Lectura se difunde entre el profesorado.
☐ Se utilizan distintos canales (reuniones, plataformas, tablones, etc.).
☐ Existe seguimiento y actualización de la información.
Ítem 10.b. Mecanismos de proyección externa: familia y entorno escolar 
☐ Se difunden las actividades y logros del plan.
☐ Se establecen mecanismos de comunicación con las familias.
☐ Se informa sobre el Plan de Lectura al inicio del curso.
☐ Se promueve la participación de las familias en actividades lectoras.
☐ Se utilizan canales de comunicación externos (web, redes, boletines, etc.).
☐ Se colabora con agentes del entorno (bibliotecas, asociaciones, etc.).
Mejoras
Ítem 10.a. Mecanismos de comunicación interna: centro educativo 
☐ No se definen mecanismos claros de comunicación interna.
☐ La difusión del plan es limitada.
☐ Se utilizan pocos canales de comunicación.
☐ No se realiza seguimiento de la información.
Ítem 10.b. Mecanismos de proyección externa: familia y entorno escolar 
☐ No se contemplan mecanismos de comunicación externa.
☐ La información a las familias es limitada.
☐ Se utilizan pocos canales de difusión.
☐ No existe relación con el entorno.
Orientaciones (asesoramiento)
Ítem 10.a. Mecanismos de comunicación interna: centro educativo 
☐ Difundir el Plan de Lectura entre todo el profesorado.
☐ Favorecer la coordinación entre equipos docentes.
☐ Establecer canales claros de comunicación interna.
☐ Utilizar diferentes herramientas (reuniones, plataformas digitales, etc.).
☐ Garantizar el seguimiento y actualización del plan.
Ítem 10.b. Mecanismos de proyección externa: familia y entorno escolar 
☐ Establecer mecanismos de comunicación con las familias.
☐ Informar sobre el Plan de Lectura al inicio del curso.
☐ Utilizar canales de difusión externos (web, redes, etc.).
☐ Fomentar la colaboración con el entorno cultural.
☐ Visibilizar las actividades y resultados del plan.

Fortalezas
Ítem 11.a. Reflexión final desde el compromiso colectivo
☐ Se incluye una reflexión final sobre la importancia de la lectura.
☐ Se reconoce la lectura como eje transversal del aprendizaje.
☐ Se evidencia el compromiso del claustro con el Plan de Lectura.
☐ El plan cuenta con aprobación o validación por parte del profesorado.
☐ Se implica a la comunidad educativa (familias, AMPA, etc.).
☐ Se refleja un compromiso colectivo con el desarrollo del plan.
Mejoras
Ítem 11.a. Reflexión final desde el compromiso colectivo
☐ La reflexión final es general o poco relevante.
☐ No se evidencia el compromiso del profesorado.
☐ No consta la aprobación del claustro.
☐ No se contempla la participación de la comunidad educativa.
☐ El compromiso aparece de forma implícita o poco clara.
Orientaciones (asesoramiento)
Ítem 11.a. Reflexión final desde el compromiso colectivo
☐ Elaborar una reflexión final coherente con el Plan de Lectura.
☐ Reforzar la consideración de la lectura como eje transversal.
☐ Visibilizar el compromiso colectivo en el documento.
☐ Formalizar la aprobación del plan por parte del claustro.
☐ Implicar a la comunidad educativa en el compromiso con el plan (familias, AMPA, etc.).
`;

const itemsList = [
  { id: "1.a", title: "Describe el centro educativo y su diversidad curricular" },
  { id: "1.b", title: "Indica la importancia de un enfoque transversal para la lectura" },
  { id: "2.a", title: "Objetivos generales del plan de lectura" },
  { id: "2.b", title: "Objetivos específicos referidos al alumnado" },
  { id: "2.c", title: "Objetivos específicos referidos al profesorado" },
  { id: "2.d", title: "Objetivos específicos referidos a las familias" },
  { id: "2.e", title: "Objetivos específicos referidos al centro escolar" },
  { id: "3.a", title: "Evaluación inicial" },
  { id: "3.b", title: "Diagnóstico por áreas" },
  { id: "3.c", title: "Identificación de necesidades" },
  { id: "4-5.a", title: "Actividades para el fomento del hábito lector y comprensión" },
  { id: "4-5.b", title: "Integración de la lectura en todas las materias: mapa de géneros discursivos" },
  { id: "4-5.c", title: "Biblioteca escolar como eje pedagógico" },
  { id: "4-5.d", title: "Metodologías para el desarrollo de la competencia lectora" },
  { id: "6.a", title: "Adecuación y diversidad para la motivación del alumnado" },
  { id: "6.b", title: "Perspectiva inclusiva y de brecha de género en la comprensión lectora" },
  { id: "7.a", title: "Distribución del tiempo para la lectura en el aula y su temporalización" },
  { id: "7.b", title: "Temporalización de proyectos" },
  { id: "8.a", title: "Diseño del sistema de evaluación del Plan de Lectura" },
  { id: "8.b", title: "Seguimiento, autoevaluación y mejora del plan" },
  { id: "9.a", title: "Recursos humanos para coordinación del plan de lectura" },
  { id: "9.b", title: "Formación continua" },
  { id: "9.c", title: "Recursos materiales" },
  { id: "10.a", title: "Mecanismos de comunicación interna: centro educativo" },
  { id: "10.b", title: "Mecanismos de proyección externa: familia y entorno escolar" },
  { id: "11.a", title: "Reflexión final desde el compromiso colectivo" }
];

const SECTION_TITLES = {
  "1": "1. CONTEXTUALIZACIÓN",
  "2": "2. OBJETIVOS",
  "3": "3. ANÁLISIS INICIAL: DIAGNÓSTICO",
  "4-5": "4-5. PRINCIPALES ACTIVIDADES Y LÍNEAS DE ACTUACIÓN",
  "6": "6. SELECCIÓN DE LECTURAS",
  "7": "7. ORGANIZACIÓN Y TEMPORALIZACIÓN",
  "8": "8. EVALUACIÓN Y SEGUIMIENTO DEL PLAN DE LECTURA DEL CENTRO",
  "9": "9. RECURSOS",
  "10": "10. COMUNICACIÓN",
  "11": "11. CONCLUSIÓN"
};

// Parser interno para convertir el texto en objetos
const parseData = () => {
  const sections = { Fortalezas: {}, Mejoras: {}, Orientaciones: {} };
  let currentSection = null;
  let currentItem = null;

  const lines = rawText.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const lowerLine = trimmed.toLowerCase();

    if (lowerLine.includes("fortalezas") && lowerLine.length < 20) {
      currentSection = "Fortalezas"; continue;
    } else if ((lowerLine.includes("mejoras") || lowerLine.includes("aspectos de mejora")) && lowerLine.length < 30) {
      currentSection = "Mejoras"; continue;
    } else if (lowerLine.includes("orientaciones") && lowerLine.length < 40) {
      currentSection = "Orientaciones"; continue;
    }

    const match = trimmed.match(/Ítem\s*([\d\-]+\.[a-z])/);
    if (match) {
      currentItem = match[1];
      if (!sections.Fortalezas[currentItem]) {
        sections.Fortalezas[currentItem] = [];
        sections.Mejoras[currentItem] = [];
        sections.Orientaciones[currentItem] = [];
      }
      continue;
    }

    if (trimmed.startsWith("☐")) {
      const parts = trimmed.split("☐").map(p => p.trim()).filter(p => p);
      for (const part of parts) {
        if (currentSection && currentItem && sections[currentSection][currentItem]) {
          sections[currentSection][currentItem].push(part);
        }
      }
    }
  }
  return sections;
};

const rubricData = parseData();

const SCORE_LABELS = {
  1: "Mejorable",
  2: "Aceptable",
  3: "Bueno",
  4: "Excelente"
};

const SCORE_COLORS = {
  1: "bg-red-100 text-red-800 border-red-200",
  2: "bg-orange-100 text-orange-800 border-orange-200",
  3: "bg-yellow-100 text-yellow-800 border-yellow-200",
  4: "bg-green-100 text-green-800 border-green-200"
};

// Componente para desplegable múltiple (Checkboxes)
const MultiSelectDropdown = ({ title, options = [], selected = [], onChange, colorClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef(null); // Novedad: Referencia para saber dónde hacemos clic

  // Novedad: Función para cerrar si se hace clic fuera
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    // Escucha cada clic que ocurre en el documento
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleOption = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="relative mb-2" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between items-center px-4 py-2 text-sm border rounded-md shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        <span className="truncate flex-1 text-left">
          {selected.length === 0 ? `Seleccionar ${title}...` : `${selected.length} seleccionados`}
        </span>
        {/* Novedad: Flecha que rota 180 grados si está abierto, con una transición suave */}
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-500">No hay opciones definidas.</div>
          ) : (
            options.map((opt, idx) => (
              <label key={idx} className="flex items-start px-4 py-2 hover:bg-blue-50 cursor-pointer">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    checked={selected.includes(opt)}
                    onChange={() => toggleOption(opt)}
                  />
                </div>
                <div className="ml-3 text-sm text-gray-700 leading-tight">
                  {opt}
                </div>
              </label>
            ))
          )}
        </div>
      )}
      
      {/* Selected tags display */}
      {selected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {selected.map((s, i) => (
            <span key={i} className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${colorClass}`}>
              <span className="truncate max-w-[200px]">{s}</span>
              <button onClick={() => toggleOption(s)} className="ml-1 text-gray-500 hover:text-gray-700 font-bold">&times;</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('evaluation');
  const [evaluations, setEvaluations] = useState({});
  
  // Novedad: Estado para los datos generales del informe
  const [metaData, setMetaData] = useState({ centro: '', asesor: '', fecha: '' });

  const updateMeta = (field, value) => {
    setMetaData(prev => ({ ...prev, [field]: value }));
  };

  const updateEval = (itemId, field, value) => {
    setEvaluations(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value
      }
    }));
  };

  const getScoreDataForChart = () => {
    return itemsList.map(item => ({
      name: item.id,
      puntuacion: evaluations[item.id]?.score || 0,
      fullTitle: item.title
    }));
  };

  const handlePrint = () => {
    setActiveTab('dashboard'); // Force switch to dashboard before print
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Print styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-full { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important;}
          body { background-color: white; }
          .break-inside-avoid { page-break-inside: avoid; }
        }
      `}</style>

      {/* Novedad: Header blanco para favorecer los logos con borde inferior azul */}
      <header className="bg-white border-b-4 border-blue-800 shadow-md no-print sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Si no has subido la imagen, no se romperá, simplemente no se mostrará */}
            <img 
              src="/banner.png" 
              alt="Logos ARALECTO" 
              className="h-14 sm:h-16 w-auto object-contain" 
              onError={(e) => { e.target.style.display = 'none'; }} 
            />
            <h1 className="text-xl font-bold text-blue-900 ml-2">Evaluación ARALECTO</h1>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-0">
            <button 
              onClick={() => setActiveTab('evaluation')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${activeTab === 'evaluation' ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Evaluación
            </button>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <BarChart2 size={18} /> Informe
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 sm:p-6 print-full">
        
        {/* EVALUATION TAB */}
        {activeTab === 'evaluation' && (
          <div className="space-y-6">
            
            {/* Novedad: Tarjeta de Datos Generales */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 border-l-4 border-l-blue-600">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Datos Generales de la Evaluación</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Building size={16} className="text-blue-600"/> Centro Evaluado
                  </label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2.5 outline-none transition-all" 
                    placeholder="Ej: CEIP San Jorge" 
                    value={metaData.centro} 
                    onChange={(e) => updateMeta('centro', e.target.value)} 
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <User size={16} className="text-blue-600"/> Asesor/a de referencia
                  </label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2.5 outline-none transition-all" 
                    placeholder="Nombre completo" 
                    value={metaData.asesor} 
                    onChange={(e) => updateMeta('asesor', e.target.value)} 
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                    <Calendar size={16} className="text-blue-600"/> Fecha de evaluación
                  </label>
                  <input 
                    type="date" 
                    className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2.5 outline-none transition-all" 
                    value={metaData.fecha} 
                    onChange={(e) => updateMeta('fecha', e.target.value)} 
                  />
                </div>
              </div>
            </div>

            {itemsList.map((item, index) => {
              const sectionPrefix = item.id.split('.')[0];
              const previousPrefix = index > 0 ? itemsList[index - 1].id.split('.')[0] : null;
              const isNewSection = sectionPrefix !== previousPrefix;

              const currentEval = evaluations[item.id] || { score: null, fortalezas: [], mejoras: [], orientaciones: [] };
              const fOptions = rubricData.Fortalezas[item.id] || [];
              const mOptions = rubricData.Mejoras[item.id] || [];
              const oOptions = rubricData.Orientaciones[item.id] || [];

              return (
                <React.Fragment key={item.id}>
                  {isNewSection && (
                    <div className="mt-8 mb-2 pb-2 border-b-2 border-blue-800">
                      <h3 className="text-xl font-bold text-blue-900 uppercase tracking-wide">
                        {SECTION_TITLES[sectionPrefix]}
                      </h3>
                    </div>
                  )}
                  {/* Aquí se eliminó el overflow-hidden para que los menús floten */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-t-lg">
                      <div>
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded mb-2">Ítem {item.id}</span>
                        <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                      </div>
                      
                      {/* Score Buttons */}
                      <div className="flex gap-2 shrink-0">
                        {[1, 2, 3, 4].map(num => (
                          <button
                            key={num}
                            onClick={() => updateEval(item.id, 'score', num)}
                            className={`w-10 h-10 rounded-full font-bold transition-all border-2 
                              ${currentEval.score === num 
                                ? SCORE_COLORS[num] + ' ring-2 ring-offset-2 ring-gray-300' 
                                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'}`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 rounded-b-lg">
                      <div>
                        <h4 className="text-sm font-semibold text-green-700 mb-2 uppercase">Fortalezas</h4>
                        <MultiSelectDropdown 
                          title="Fortalezas" 
                          options={fOptions} 
                          selected={currentEval.fortalezas} 
                          onChange={(vals) => updateEval(item.id, 'fortalezas', vals)}
                          colorClass="bg-green-100 text-green-800 border-green-200"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-orange-700 mb-2 uppercase">Áreas de Mejora</h4>
                        <MultiSelectDropdown 
                          title="Mejoras" 
                          options={mOptions} 
                          selected={currentEval.mejoras} 
                          onChange={(vals) => updateEval(item.id, 'mejoras', vals)}
                          colorClass="bg-orange-100 text-orange-800 border-orange-200"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-blue-700 mb-2 uppercase">Orientaciones</h4>
                        <MultiSelectDropdown 
                          title="Orientaciones" 
                          options={oOptions} 
                          selected={currentEval.orientaciones} 
                          onChange={(vals) => updateEval(item.id, 'orientaciones', vals)}
                          colorClass="bg-blue-100 text-blue-800 border-blue-200"
                        />
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}

        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 print-full">
            
            {/* Novedad: Cabecera que SOLO aparece al imprimir */}
            <div className="hidden print:block mb-8 text-center border-b-2 border-blue-800 pb-4">
               <img 
                  src="/banner.png" 
                  alt="Logos ARALECTO" 
                  className="w-full h-auto max-h-32 object-contain" 
                  onError={(e) => { e.target.style.display = 'none'; }}
               />
            </div>

            <div className="flex justify-between items-end border-b pb-4 print:hidden">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Informe de Evaluación</h2>
                <p className="text-gray-500 mt-1">Plan de Lectura - Programa ARALECTO</p>
              </div>
              <button 
                onClick={handlePrint}
                className="no-print flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded shadow hover:bg-gray-700 transition"
              >
                <Printer size={18} /> Imprimir / PDF
              </button>
            </div>

            {/* Novedad: Recuadro con los datos generales en el informe */}
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 mb-6 grid grid-cols-1 sm:grid-cols-[2fr_2fr_1fr] print:grid-cols-[2fr_2fr_1fr] gap-6 break-inside-avoid">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-200 rounded-full text-blue-800 shrink-0"><Building size={20} /></div>
                  <div className="min-w-0">
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Centro Evaluado</p>
                    <p className="text-lg font-bold text-gray-900 truncate" title={metaData.centro}>{metaData.centro || <span className="text-gray-400 italic font-normal">Sin especificar</span>}</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-200 rounded-full text-blue-800 shrink-0"><User size={20} /></div>
                  <div className="min-w-0">
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Asesor/a</p>
                    <p className="text-lg font-bold text-gray-900 truncate" title={metaData.asesor}>{metaData.asesor || <span className="text-gray-400 italic font-normal">Sin especificar</span>}</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-200 rounded-full text-blue-800 shrink-0"><Calendar size={20} /></div>
                  <div className="min-w-0">
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Fecha</p>
                    <p className="text-lg font-bold text-gray-900 truncate">
                      {metaData.fecha ? new Date(metaData.fecha).toLocaleDateString('es-ES') : <span className="text-gray-400 italic font-normal">Sin especificar</span>}
                    </p>
                  </div>
               </div>
            </div>

            {/* Novedad: Texto introductorio del programa ARALECTO con Título */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 break-inside-avoid">
              {/* Aquí añadimos el nuevo título con el estilo azul de las etiquetas */}
              <h3 className="text-lg text-blue-600 font-bold uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                INFORME DE EVALUACIÓN Y ASESORAMIENTO DE PLAN DE LECTURA
              </h3>
              <div className="text-gray-700 text-sm leading-relaxed text-justify space-y-4">
                <p>
                  El objetivo fundamental del primer año del programa de ARALECTO es facilitar a los centros participantes los instrumentos necesarios, tanto formativos como de acompañamiento especializado, para el diseño de un plan de lectura adaptado a sus necesidades. Este proceso incluye no solo la elaboración del plan, sino también su evaluación continua y el asesoramiento pedagógico para garantizar su eficacia.
                </p>
                <p>
                  En esta fase inicial, el centro desarrollará un plan de lectura estructurado que establezca metas claras a corto y medio plazo en relación con la mejora de la competencia lectora del alumnado. Dicho plan será un documento consensuado que recogerá los acuerdos del centro en torno al fomento de la lectura (objetivos, estrategias metodológicas, propuestas didácticas, criterios de evaluación y seguimiento), integrando todas las etapas educativas y áreas curriculares.
                </p>
                <p>
                  A partir de este diseño, y con el apoyo del equipo de asesoramiento de ARALECTO, los centros estarán en disposición de implementar y ajustar sus prácticas educativas, promoviendo el desarrollo de hábitos lectores y competencias de comprensión desde un enfoque transversal. Este proceso incluye la evaluación sistemática del impacto del plan y la toma de decisiones informadas para su mejora continua, asegurando así una intervención coherente, sostenible y contextualizada.
                </p>
              </div>
            </div>

            {/* CHART */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 break-inside-avoid">
              <h3 className="text-lg font-bold text-gray-800 mb-6 text-center">Visión General de Puntuaciones</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getScoreDataForChart()} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{fontSize: 12}} interval={0} angle={-45} textAnchor="end" height={60}/>
                    <YAxis domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} />
                    <Tooltip 
                      formatter={(value, name, props) => [`${value} - ${SCORE_LABELS[value] || 'Sin evaluar'}`, 'Puntuación']}
                      labelFormatter={(label, payload) => payload?.[0]?.payload?.fullTitle || label}
                    />
                    <Bar dataKey="puntuacion" radius={[4, 4, 0, 0]}>
                      {getScoreDataForChart().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={
                          entry.puntuacion === 4 ? '#22c55e' : 
                          entry.puntuacion === 3 ? '#eab308' : 
                          entry.puntuacion === 2 ? '#f97316' : 
                          entry.puntuacion === 1 ? '#ef4444' : '#e5e7eb'
                        } />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* DETAILED TABLE */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-blue-800 text-white uppercase font-semibold text-xs">
                    <tr>
                      <th className="px-4 py-3 w-16">ID</th>
                      <th className="px-4 py-3 w-1/4">Criterio Evaluado</th>
                      <th className="px-4 py-3 w-24 text-center">Nivel</th>
                      <th className="px-4 py-3 w-1/5">Fortalezas</th>
                      <th className="px-4 py-3 w-1/5">Mejoras</th>
                      <th className="px-4 py-3 w-1/5">Orientaciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {itemsList.map((item, index) => {
                      const sectionPrefix = item.id.split('.')[0];
                      const previousPrefix = index > 0 ? itemsList[index - 1].id.split('.')[0] : null;
                      const isNewSection = sectionPrefix !== previousPrefix;

                      const ev = evaluations[item.id];
                      const score = ev?.score;
                      return (
                        <React.Fragment key={item.id}>
                          {isNewSection && (
                            <tr className="bg-blue-50 border-y-2 border-blue-200 break-inside-avoid">
                              <td colSpan="6" className="px-4 py-3 font-bold text-blue-900 uppercase text-sm">
                                {SECTION_TITLES[sectionPrefix]}
                              </td>
                            </tr>
                          )}
                          <tr className="hover:bg-gray-50 break-inside-avoid">
                            <td className="px-4 py-3 font-bold text-gray-700 align-top">{item.id}</td>
                            <td className="px-4 py-3 font-medium text-gray-900 align-top">{item.title}</td>
                            <td className="px-4 py-3 text-center align-top">
                              {score ? (
                                <span className={`inline-block px-2 py-1 rounded text-xs font-bold border ${SCORE_COLORS[score]}`}>
                                  {score} - {SCORE_LABELS[score]}
                                </span>
                              ) : (
                                <span className="text-gray-400 italic">-</span>
                              )}
                            </td>
                            <td className="px-4 py-3 align-top text-gray-600">
                              {ev?.fortalezas?.length > 0 ? (
                                <ul className="list-disc pl-4 space-y-1">
                                  {ev.fortalezas.map((f, i) => <li key={i}>{f}</li>)}
                                </ul>
                              ) : '-'}
                            </td>
                            <td className="px-4 py-3 align-top text-gray-600">
                              {ev?.mejoras?.length > 0 ? (
                                <ul className="list-disc pl-4 space-y-1">
                                  {ev.mejoras.map((m, i) => <li key={i}>{m}</li>)}
                                </ul>
                              ) : '-'}
                            </td>
                            <td className="px-4 py-3 align-top text-gray-600">
                              {ev?.orientaciones?.length > 0 ? (
                                <ul className="list-disc pl-4 space-y-1">
                                  {ev.orientaciones.map((o, i) => <li key={i}>{o}</li>)}
                                </ul>
                              ) : '-'}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            
          </div>
        )}
      </main>
    </div>
  );
}