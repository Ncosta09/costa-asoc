# Plan de contenidos — Costa & Asociados

Fuente de verdad de la cola de contenido. **Este archivo es el que lee la rutina automática**
para saber qué nota escribir: toma el primer ítem en estado ⬜ de la cola y abre un PR.

- **Cadencia objetivo:** 4 notas/mes (1 por semana). Meta: 100 clicks/día orgánicos.
- **Estados:** `⬜` pendiente · `🟡` en PR abierto · `✅` publicado · `🗄️` archivada por falta de volumen medido
- **Al publicar:** marcar ✅ con la fecha real y correr `npm run indexnow -- /blog/<slug>`.

---

## Reglas de redacción

No negociables, valen igual para Nico y para el agente:

1. **Autoría: Gabriel A. Costa** (Contador Público, RPA 8192). El contenido tiene que sostener
   esa firma: nada de generalidades que pueda escribir cualquiera.
2. **Público: consorcistas, propietarios y consejos de administración.** No administradores.
   Segunda persona del plural formal ("ustedes"), español rioplatense, cero tecnicismos gratuitos.
3. **Todo dato normativo se cita con fuente oficial linkeada.** CEDOM para leyes CABA, Infoleg
   para el CCyC, buscador del RPA para matrículas. Si no se puede verificar, no se afirma.
4. **Nunca inventar montos, plazos ni jurisprudencia.** Los números (salarios, multas, aranceles)
   salen de la planilla o del boletín oficial. Si no está a mano, la nota sale sin el número.
5. **Estructura:** H2 en forma de pregunta (matchean queries), 1.200–2.200 palabras, tablas donde
   ayuden, `faq` en el frontmatter (4–6 entradas → renderiza FAQ visible + `FAQPage` JSON-LD).
   El techo es orientativo: nunca recortes detalle normativo verificado (inciso, plazo, escala de
   sanciones) para entrar en el rango. Sí recortá relleno.
6. **Verificación:** `npm ci && npm run build && npm run typecheck`, **en ese orden**. `next-env.d.ts`
   está gitignoreado y lo genera `next build`; correr `typecheck` antes falla con TS2307 en los
   imports de `.png` de `logo.tsx` y `hero-mark.tsx` en cualquier clon limpio, sin que tenga nada
   que ver con el contenido.
7. **Frontmatter obligatorio:** `title`, `description`, `date`, `updated`, `author`, `tags`,
   `cover`, `coverAlt`, `draft: false`, `faq`. **Al editar una nota vieja, tocar `updated`** — sin
   eso el sitemap le informa a Google una fecha anterior al último crawl y no vuelve a pasar.
   La `cover` va de `images.unsplash.com` (único dominio remoto habilitado en `next.config.ts`),
   verificada con `curl -I`, y que no esté ya usada en otra nota **ni en la home**.
8. **Links internos:** mínimo 2 a otras notas del mismo cluster + 1 a `/servicios` + CTA a
   `/contacto`. Anchor text descriptivo con la keyword, nunca "hacé click acá".
9. **Sin promesas de resultado ni asesoramiento legal individual.** Explicamos el marco, no
   dictaminamos sobre el caso de nadie.
10. **Sin em-dashes (—) en ningún texto.** Regla de estilo dura (2026-08-17): los incisos van
    entre paréntesis, con comas o con dos puntos. Vale para el cuerpo, el frontmatter
    (`title`/`description`/`faq`) y cualquier copy. El sitio entero ya se limpió en el commit
    `dbe9755`; una nota nueva con em-dashes no se publica hasta reescribirlos.

---

## Clusters

| Cluster | Pilar | Estado |
|---|---|---|
| Expensas | `/blog/expensas-consorcio-que-son-como-se-liquidan` | ✅ publicado |
| Administrador y normativa | `/blog/ley-941-obligaciones-administrador-consorcios` | ✅ publicado |
| Asambleas y consejo | `/blog/asamblea-de-consorcio-quorum-y-mayorias` | ✅ publicado |
| Personal del edificio | `/escala-salarial-encargados-de-edificio` (página viva) | ⬜ ítem 1 |
| Obligaciones del edificio en CABA | — | falta pilar (ítem 10) |
| Propiedad horizontal | `/blog/propiedad-horizontal-que-es-como-funciona` | ✅ publicado |
| Local / money pages | `/servicios` | track aparte, ver abajo |

---

## Prioridad medida (2026-08-24)

Hasta hoy la cola se priorizaba por inspección manual de SERPs. El 2026-08-24 se midió
volumen real con DataForSEO (Argentina, mensual) y **la mitad de la cola quedó en duda**.

**Regla nueva y no negociable: no se escribe una nota sin chequear el volumen de su keyword
objetivo.** Varios ítems de abajo apuntan a keywords de 0 a 30 búsquedas/mes. Que Google Ads
reporte 0 no significa cero tráfico (es "bajo el umbral de reporte", y esas notas igual traen
impresiones en GSC), pero sí significa que no pueden ir antes que un tema de 1.000+.

### Lo que hay que hacer, en orden

1. **Ampliar el pilar de expensas** (`expensas-consorcio-que-son-como-se-liquidan`). El cluster
   definicional suma **~16.600 búsquedas/mes con dificultad 0**: "expensas" 4.400, "que es
   expensas" 2.400, "que son expensas" 2.400, "qué son las expensas" 2.400, "que son las
   expensas" 1.900, "qué son expensas" 1.900, "expensas que son" 1.000, "que significa
   expensas" 210. El pilar está en **pos 21-28 con 1.233 palabras, el post más corto del
   sitio**, y hasta Liga del Consorcista está solo en pos 13-17. Es la acción de mejor retorno
   de todo el proyecto, por lejos.
2. **Cubrir "propiedad horizontal"** (1.600-1.900/mes). Hueco total: no hay nada del sitio
   apuntando ahí. Sumar también "reglamento de propiedad horizontal" (320).
3. **GBP** (no es contenido, es de Nico). Tres pruebas independientes el 2026-08-24: la SERP
   comercial principal tiene local_pack, "campana 4710" (nuestra propia dirección) rankea a
   pos 14,8, y ningún competidor del nicho tiene backlinks reales, así que lo que nos separa
   de ellos es entidad local, no autoridad de links.
4. Después, en este orden (fijado el 2026-09-04): consejo de propietarios (260/mes, nuestro
   comprador, fuentes ya verificadas), registro público de administradores (320/mes), ascensores
   CABA (110/mes, CPC $1,35, requiere verificar la normativa local), limpieza de tanques (30/mes
   pero **CPC $8,75**, el más alto del nicho, y es la query donde Ramos rankea #1).

### Lo que baja de prioridad, con el motivo

- **Ítem 1, escala salarial (era "máximo volumen del nicho"): BAJA.** Dos problemas. El slug
  apunta a "escala salarial encargados de edificio" = **320/mes**, cuando "escala salarial
  suterh" es 2.400 y "suterh" solo es 14.800. Pero lo decisivo: **la SERP de "escala salarial
  suterh" son 11 de 12 resultados de `suterh.org.ar`**. El sindicato la tiene monopolizada y
  no entra nadie. El doc 07 del vault suponía lo contrario. **La planilla de Gabriel dejó de
  ser el desbloqueo más valioso del plan.**
- **Landings por barrio: siguen, pero como jugada de conversión, no de clicks.** "administracion
  de consorcios villa devoto" y "villa del parque" dan **0** en Ads; Caballito 30, Belgrano 30,
  Palermo 20. Ojo con la ironía: el orden del doc 07 (los barrios que rodean la oficina) apunta
  justo a los de menos volumen. No sacarle presupuesto al contenido.
- **La página `/servicios/administracion-de-consorcios`: NO hacerla.** Ver el track de money
  pages más abajo.

## Medición del 2026-09-09 (DataForSEO, cuenta propia, costó $0,098 de $1)

Segunda medición del nicho. La primera (24-08) cubrió el núcleo comercial y el cluster de
expensas; esta cubrió **los ítems de la cola que nunca se habían medido** más dos SERPs en vivo.

### Lo que cambia la cola

- **Fachadas (ítem 10) es el mejor tema sin escribir:** 240/mes sumando variantes y con los CPC
  más altos del nicho después de los tanques ($1,48 a $1,77). Un consorcio que busca eso tiene
  que contratar a alguien. Sube al segundo puesto, detrás del 8.
- **Cuatro ítems eran humo y se archivaron:** obras y mayorías (19), matafuegos (22), traspaso de
  cuenta bancaria (23) y licencia del encargado (24). Volumen 0 a 10 en todas sus variantes.
  Escribirlas habría sido un mes de trabajo para nadie.
- **El cluster del consejo de propietarios es más grande de lo que decía la cola:** 410/mes, no
  260. Suma "consejo de administracion consorcio" (110) y "funciones del consejo de propietarios"
  (40). La nota del ítem 9 ya está publicada, pero **no usa la formulación "consejo de
  administración" en ningún H2**, y ese es el 27% del cluster. Vale una edición chica.
- **Keyword comercial nueva que no estaba en el radar: "administracion de edificios" 170/mes,
  competencia HIGH, CPC $1,51.** Es el CPC más alto de todo el núcleo comercial (el resto está en
  $0,58 a $0,78). Con su variante CABA (40) suma 210/mes de intención de contratar. **Hay que
  sumarla a Ads y evaluar cubrirla en `/servicios`.**
- **"administradores de consorcios caba" (plural) da 390/mes**, CPC $0,78. Es distinta de
  "administrador de consorcios caba" (720) que ya teníamos. Sumar la variante plural en Ads.
- Confirmado que **Villa Pueyrredón da 0**, igual que Devoto y Villa del Parque. La landing sigue
  teniendo sentido como jugada de conversión, no de tráfico.

### ⚠️ Veredicto del cluster definicional de expensas: la tesis se cae

Era la apuesta principal del proyecto desde el 24-08 ("~16.600 búsquedas/mes con dificultad 0").
Se amplió el pilar el 24-08 y **desde entonces cayó de posición 21-28 a 44**, con 0 clicks.
La SERP en vivo de "que son las expensas" explica por qué, y no es falta de profundidad:

1. **Hay AI Overview.** En una query definicional, el bloque de IA responde la pregunta arriba de
   todo y se come el click. La dificultad nominal 0 no mide eso.
2. **El top 10 es autoridad pura, no contenido del nicho:** Zonaprop #1, vivienda.buenosaires.gob.ar
   #2, CAPHAI #3, argentina.gob.ar #4, Facebook #5, Instagram #7, Mercado Libre #14, Naranja X #13,
   la Defensoría #12 y hasta la RAE #17. Administraciones reales solo Ramos (#10) y Monclair (#8).

Contra eso no se gana con una nota mejor escrita. **Dejar de invertir en ampliar el cluster
definicional.** Las notas ya publicadas se quedan como están (traen impresiones y sostienen el
cluster interno), pero no se escriben más notas apuntadas a "qué es / qué son" y no se vuelve a
ampliar el pilar. El presupuesto de contenido va a las queries con CPC, que son las que tienen
intención de contratar: fachadas, ascensores, tanques, seguros.

### La SERP comercial confirma el GBP como crítico #1, ahora con números

La SERP de "administracion de consorcios caba" (720/mes) tiene **local pack de 3, y los tres
perfiles tienen rating 5 con 23, 58 y 35 reseñas**. Ese bloque se lleva el click comercial y
nosotros no estamos porque la ficha no está verificada.

Y una corrección importante al análisis del 24-08: **la variante CABA sí es una SERP comercial**,
a diferencia de la head pelada. En el top 20 hay **ocho administraciones reales** (Ramos #5,
Saettone #9, ADSR #10, ELES #11, Fromo #14, DOMUS #15, Vitró #17, Consorcios de Buenos Aires #20).
Nosotros no aparecemos. O sea que es atacable orgánicamente, no solo con Ads. Sigue habiendo ruido
de cursos (CAPHAI #6, Liga #12, Facebook #16, Instagram #19), que es justo lo que bloquean las
negativas del plan de Ads.

---

## Cola

> **Para la rutina automática y para quien retome esto:** el orden de las filas ES la prioridad.
> Se toma el primer ítem en `⬜` cuya columna Notas no diga **Bloqueada**. Los números son IDs
> estables, no orden: si algo cambia de prioridad se mueve la fila, no se renumera.
> **Próximo a escribir: el ítem 8 (registro público de administradores, 320/mes), después el 10 (fachadas, 240/mes con CPC $1,48 a $1,77), el 16 (ascensores, 110/mes), el 12 (fondo de reserva, 100/mes) y el 14 (seguros, 90/mes).** Reordenado el 2026-09-09 con la medición nueva de DataForSEO. El 9 se publicó el 2026-09-07. El 7 (30/mes) tiene un borrador sin citas verificadas en el log de la corrida del 31-08, sirve como spec cuando le toque. **Los ítems 19, 22, 23 y 24 se archivaron: volumen medido 0 a 10 en todas sus variantes.**


| # | Estado | Slug | Keyword objetivo | Cluster | Notas |
|---|---|---|---|---|---|
| 1 | ⬜ | `escala-salarial-encargados-de-edificio` (página, no post) | escala salarial encargados de edificio | Personal | ⬇️ **BAJADA DE PRIORIDAD (2026-08-24, dato medido).** El slug apunta a una keyword de **320/mes**; las grandes son "escala salarial suterh" (2.400) y "suterh" (14.800). Pero **la SERP de "escala salarial suterh" son 11 de 12 resultados de `suterh.org.ar`**: el sindicato la monopoliza. Si algún día se hace, la página tiene que girar sobre SUTERH como entidad y apuntar a las variantes que el sindicato no responde ("sueldo encargado de edificio 2026" 70, "aguinaldo encargado de edificio" 10), que casi no tienen volumen. **Bloqueada:** sigue necesitando la planilla oficial FATERYH que Gabriel liquida cada mes, pero ya no es el desbloqueo más valioso del plan |
| 2 | ✅ | `quien-paga-las-expensas-propietario-o-inquilino` | quién paga las expensas inquilino o propietario | Expensas | Publicada 2026-08-03. Ángulo diferencial: el criterio del art. 1209 es "gasto habitual", NO "ordinarias vs extraordinarias" (lo dice el propio texto). Vigencia post-DNU 70/2023 tratada como discusión abierta, no zanjada |
| 3 | ✅ | `expensas-ordinarias-y-extraordinarias-diferencias` | expensas extraordinarias quién las paga | Expensas | Publicada 2026-08-03. Ángulo: lo que define a la extraordinaria es la **resolución de la asamblea** (art. 2048), no el monto. Diferencial CABA: Ley 941 art. 10 inc. j) (texto Ley 5.983) obliga a liquidarlas separadas, art. 15 inc. d) lo hace infracción y art. 16 fija la escala de sanciones. Sin jurisprudencia citada (no se verificó ningún fallo en fuente oficial) |
| 4 | ✅ | `deuda-de-expensas-y-juicio-ejecutivo` | no pagar expensas consecuencias | Expensas | Publicada 2026-08-10. Ángulo: por qué la vía ejecutiva es tan rápida (certificado del art. 2048 CCyC + art. 524 CPCCN), defensas taxativas del art. 544 CPCCN (las quejas de gestión NO son defensa), prescripción 2 años (art. 2562 inc. c), privilegio especial (art. 2582 inc. a), el comprador hereda la deuda (art. 2049). Citas verificadas contra Infoleg |
| 5 | ✅ | `honorarios-del-administrador-de-consorcio` | cuánto cobra un administrador de consorcio | Administrador | Publicada 2026-08-17. Ángulo: no hay arancel oficial — art. 14 Ley 941 ("sin ninguna otra entidad o cámara que los regule", modificación solo por asamblea y en acta), art. 9º (detallar en acta qué incluye el honorario y qué va aparte), art. 10 (recibo con CUIT/matrícula en la liquidación). Sin tarifas propias ni de mercado. Citas verificadas contra CEDOM |
| 6 | ✅ | `asamblea-de-consorcio-quorum-y-mayorias` | quórum asamblea consorcio | Asambleas | Publicada 2026-08-24. **Pilar del cluster.** Ángulo: el art. 2059 se titula "Convocatoria y quórum" y no fija ningún número (el quórum sale del reglamento); lo decisivo es el art. 2060, mayoría absoluta sobre la **totalidad** con doble exigencia (unidades + partes indivisas). Diferencial CABA: Ley 941 art. 9º obliga a convocar **bajo pena de nulidad** con lugar, día, temario y **horario de comienzo y finalización**, más copia del acta anterior. Además arts. 2058 inc. b) (5% de partes indivisas somete temas), 2061 (conformidad expresa del titular), 2062 (actas y cotejo de firmas), 2063 (asamblea judicial, 10% del total, mayoría simple de presentes), 2064 inc. a). Citas verificadas contra Infoleg y CEDOM |
| 25 | ✅ | `propiedad-horizontal-que-es-como-funciona` | propiedad horizontal | Propiedad horizontal | Publicada 2026-08-31 (fecha de su corrida; subida el 04-09). **Pilar del cluster nuevo.** Ángulo: el régimen artículo por artículo (CCyC 2037-2045, 2056-2057, 2058, 2064-2066, 2068-2069) con la lectura contable: los incisos f) y g) del art. 2056 (parte indivisa vs. proporción de expensas, que pueden no coincidir) más la eximición parcial del art. 2049 son la base de cada liquidación; el consorcio es persona jurídica (art. 2044) con CUIT y cuenta propia; en CABA el administrador voluntario también debe inscribirse (Ley 941 arts. 2º y 3º). Cubre "reglamento de propiedad horizontal" (320/mes) como sección. Ley 13.512 derogada por art. 3º inc. a) Ley 26.994. Todas las citas leídas del texto oficial. **Ojo:** la rutina del 31-08 NO escribió esta nota sino la 7 (su contenedor tiene la cola vieja, no hace fetch de origin) |
| 9 | ✅ | `funciones-del-consejo-de-propietarios` | consejo de propietarios | Asambleas | Publicada 2026-09-07 (fecha de su corrida; subida el 09-09). Público = nuestro comprador real. **Vol medido: 260/mes.** Ángulo: las 4 atribuciones del art. 2064 en cuadro + el límite expreso del último párrafo (no sustituye al administrador); el inciso b (control económico y financiero) traducido a un cruce mensual de 5 puntos apoyado en Ley 941 arts. 9º y 10; certificado de deuda aprobado por el consejo = título ejecutivo (art. 2048); fondo de reserva visto desde 2064 inc. c y 2067 inc. d; entrega de libros AL CONSEJO en 15 días hábiles (2067 inc. j) y vacancia con 30 días para convocar (2064 inc. d) cruzada con la inscripción obligatoria de la Ley 941 arts. 2º y 3º. Dato verificado: **la Ley 941 no menciona al consejo ni una vez.** Todas las citas leídas del texto oficial |
| 8 | ⬜ | `como-verificar-la-matricula-rpa-de-tu-administrador` | **registro publico de administradores de consorcios** | Administrador | Buscador oficial del RPA. Refuerza E-E-A-T propio (RPA 8192). **Keyword corregida por dato medido:** "verificar matricula administrador consorcio" da 0; la que tiene volumen es **"registro publico de administradores de consorcios" (320/mes)**. Reenfocar la nota sobre el Registro, no sobre el verbo "verificar" |
| 16 | ⬜ | `mantenimiento-obligatorio-de-ascensores-en-caba` | mantenimiento de ascensores caba | Obligaciones CABA | Conservador matriculado + libro de ascensores. **Vol medido: 110/mes, competencia HIGH, CPC $1,35.** Sube bastante: es el mejor de los ítems de obligaciones |
| 7 | ⬜ | `certificado-de-deuda-de-expensas-para-escriturar` | certificado de deuda de expensas | Expensas | Long-tail transaccional (escribanías, compradores). **Vol medido: 30/mes.** No debería ir antes del refuerzo del pilar |
| 10 | ⬜ | `ley-257-caba-fachadas-y-balcones` | **conservacion de fachadas caba** | Obligaciones CABA | **Pilar del cluster. SUBE al segundo puesto (medido 2026-09-09).** El cluster suma **240/mes**: "conservacion de fachadas caba" 110 (MEDIUM, **CPC $1,62**), "ley 257 caba" 90 (MEDIUM, $1,48), "ley de fachadas caba" 40 ($1,77). Los CPC más altos del nicho después de tanques: intención comercial real, es un gasto que el consorcio tiene que contratar. **Keyword objetivo corregida:** apuntar a "conservación de fachadas", no a "ley 257" pelada. Ojo: "fachadas y balcones caba" e "informe tecnico de fachadas" dan 0, no usarlas de eje |
| 11 | ⬜ | `administrador-que-no-rinde-cuentas-que-hacer` | administrador no rinde cuentas | Administrador | Denuncia ante Defensa al Consumidor CABA |
| 12 | ⬜ | `fondo-de-reserva-del-consorcio` | fondo de reserva consorcio | Expensas | Ángulo contable propio = diferencial. **Vol medido 2026-09-09: 100/mes** entre "fondo de reserva consorcio" 50, "fondo de reserva expensas" 30 y "que es el fondo de reserva" 20. Sin CPC (no es query comercial), pero el tema ya está tratado de costado en la nota del consejo (art. 2064 inc. c y 2067 inc. d): revisar canibalización y enfocarla en el cálculo y la contabilización |
| 13 | ⬜ | `asamblea-autoconvocada-y-asamblea-judicial` | asamblea autoconvocada consorcio | Asambleas | CCyC art. 2059 / 2063. **Vol medido 2026-09-09: 60/mes** ("autoconvocatoria asamblea consorcio" 40, "asamblea autoconvocada consorcio" 20, "asamblea judicial consorcio" 20). Ya cubierto de costado en el pilar de asambleas y en la nota del consejo: verificar canibalización antes de escribir |
| 14 | ⬜ | `seguros-obligatorios-de-un-consorcio` | **seguro integral de consorcio** | Obligaciones CABA | Integral + ART + ascensores. **Vol medido 2026-09-09: 90/mes** con CPC comercial: "seguro integral de consorcio" 50 (MEDIUM, **$0,82**), "seguro de consorcio" 40 (MEDIUM, **$1,63**), "seguro obligatorio consorcio" 10. **Keyword objetivo corregida** a "seguro integral", que es como lo nombra el art. 2067 inc. h) del CCyC. "poliza de consorcio" da 0 |
| 15 | ⬜ | `aguinaldo-y-vacaciones-del-encargado-de-edificio` | aguinaldo encargado de edificio | Personal | Estacional (junio/diciembre) → publicar antes de la liquidación |
| 17 | ⬜ | `como-leer-una-liquidacion-de-expensas` | liquidacion de expensas | Expensas | Con ejemplo desglosado. **Keyword corregida:** "como leer una liquidacion de expensas" da 0; "liquidacion de expensas" da **70/mes (MEDIUM, CPC $0,87)**. Ojo: parte de este tema se va a cubrir al ampliar el pilar, revisar canibalización antes de escribirla |
| 18 | ⬜ | `intereses-por-mora-en-expensas` | intereses por mora expensas | Expensas | Qué es legítimo y qué es abusivo. **Vol medido: 0.** El doc 07 la había subido porque iProfesional gana con contenido genérico; el volumen no lo justifica |
| 19 | 🗄️ | `obras-en-el-edificio-que-mayorias-se-necesitan` | mayorías para obras en un consorcio | Asambleas | **ARCHIVADA 2026-09-09: volumen 0** en las tres variantes medidas ("mayorias para obras en un consorcio", "obras en el consorcio", "innovaciones consorcio"). El tema ya está cubierto en el pilar de asambleas (arts. 2051 a 2053). No escribir |
| 20 | ⬜ | `libro-de-actas-y-libro-de-administracion` | libro de actas consorcio | Administrador | Rubricación y qué exige la Ley 941. **Vol medido 2026-09-09: 50/mes** ("libro de actas consorcio" 30, "libros obligatorios consorcio" 20). "rubrica de libros consorcio" da 0 |
| 21 | ⬜ | `tanques-de-agua-limpieza-obligatoria-caba` | limpieza de tanques caba | Obligaciones CABA | Periodicidad + certificado. La norma es la **Ley 6040**, citarla. **Vol medido: 30/mes pero CPC $8,75, el más alto de todo el nicho** (intención comercial altísima), y es la query donde Ramos rankea #1 con 6 backlinks de spam: se gana con contenido |
| 22 | 🗄️ | `matafuegos-y-habilitaciones-del-edificio` | matafuegos consorcio obligatorio | Obligaciones CABA | **ARCHIVADA 2026-09-09: volumen 0** en las tres variantes ("matafuegos consorcio", "matafuegos obligatorio edificio", "habilitacion matafuegos caba"). Si algún día se cubre, que sea como sección dentro de la nota de seguros o de obligaciones, no como nota propia |
| 23 | 🗄️ | `traspaso-de-la-cuenta-bancaria-del-consorcio` | cuenta bancaria a nombre del consorcio | Administrador | **ARCHIVADA 2026-09-09: 10/mes** en la mejor variante ("cuenta bancaria consorcio"), 0 en "cuenta a nombre del consorcio". Dato lateral útil: "banco ciudad consorcios" da **50/mes**, así que si se retoma, el eje es el Banco Ciudad y la gratuidad de la cuenta, no el traspaso |
| 24 | 🗄️ | `que-hacer-si-el-encargado-se-enferma` | licencia encargado de edificio | Personal | **ARCHIVADA 2026-09-09: volumen 0** en "licencia encargado de edificio" y "reemplazo encargado de edificio"; "suplente encargado de edificio" da 10. No escribir |

| 26 | ⬜ | `retiro-de-escombros-en-caba-obras-del-consorcio` | retiro de escombros caba | Obligaciones CABA | **1.900/mes.** Lo detectamos mirando qué rankea Liga del Consorcista (está en pos 5). Necesidad operativa real de un consorcio en obra y **nadie del rubro la cubre**. Verificar la normativa de CABA antes de escribir |
| 27 | ⬜ | (actualizar nota existente, no nota nueva) | que son las expensas en un alquiler | Expensas | **930/mes entre las dos variantes**, dificultad 0. La nota `quien-paga-las-expensas-propietario-o-inquilino` ya cubre el tema pero no ataca esa formulación. Es una edición, no una nota: tocar `updated` al hacerlo |

---

## Track aparte: money pages (no van en la cola del blog)

Estas traen **leads**, no clicks. Se hacen en tandas, no de a una, y las escribo con Nico:

- ~~`/servicios/administracion-de-consorcios`~~ **DESCARTADA (2026-08-24, dato medido).** La keyword
  "administracion de consorcios" tiene 4.400/mes, pero **su SERP es formativa, no comercial**: el
  top 12 son registros públicos oficiales (buenosaires.gob.ar #1, gba.gob.ar #2), cursos y
  diplomaturas (CAPHAI #4, UNLZ #6, capacitarte #8, UBA #11) y Liga #3. La única administración
  real es Ramos en pos 7. Atacarla traería gente que quiere **ser** administrador, que es
  exactamente el problema que ya tiene la nota de honorarios (le llegan "curso de administracion
  de consorcios", "donde estudiar administración de consorcios gratis"). La keyword comercial de
  verdad es **"administracion de consorcios caba" (720/mes, HIGH, CPC $0,58)** más el
  **local_pack**, y eso se gana con GBP, no con una página nueva.
- Landings por barrio. Orden según `07 — Estrategia competitiva SEO` del vault: los barrios que
  rodean la oficina, que son donde juega el único competidor local real y donde la SERP es débil.
  Contenido real por zona, no plantilla clonada: si son iguales, Google las trata como thin
  content y no indexa ninguna. **Control: al publicar una, medir el solapamiento de 8-gramas
  contra las anteriores** (Devoto vs Villa del Parque dio 17,7%, y ese resto es header y footer).
  - ✅ **Villa Devoto** (2026-08-17), ángulo: oficina real en el barrio, edificios chicos y PH.
  - ✅ **Villa del Parque** (2026-08-24), ángulo: conviven dos parques edilicios (PH de 1930-1960
    y más de 50 obras nuevas), y el art. 13 de la Ley 941 le pone fecha a la primera asamblea de
    un edificio nuevo, donde cesa el administrador que puso la desarrolladora si no lo ratifican.
  - ✅ **Monte Castro** (2026-09-04), ángulo: barrio de casas y PH de pocas unidades, muchas veces
    administrados por un vecino sin cobrar: la Ley 941 (arts. 2º, 3º y 4º) obliga a inscribir también al
    administrador voluntario, y el art. 2067 CCyC le impone las mismas obligaciones. Segundo eje: edificios
    con local en planta baja sobre Álvarez Jonte (art. 2056 incs. f y g + eximición parcial del art. 2049).
    Foto de Wikimedia Commons (Gobonobo, CC BY-SA 3.0).
  - ⬜ Villa Pueyrredón · después el resto (Caballito, Belgrano, Palermo).
- **Al publicar una landing:** agregar el barrio a `coverageZones` y a `zoneHrefs` en
  `content/zones.ts` (el chip de la home se vuelve link solo), sumar la ruta a `STATIC_LASTMOD`
  en `app/sitemap.ts`, correr `npm run indexnow -- <ruta>` y pedir indexación manual en GSC.

## Track aparte: herramientas y plantillas

Imanes de backlinks y de emails. Cada una vale más que 3 notas en links entrantes:

- Calculadora de expensas por porcentual fiscal
- Modelo de acta de asamblea (descargable)
- Modelo de carta documento para remover al administrador
- Checklist de traspaso de administración
