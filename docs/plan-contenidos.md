# Plan de contenidos — Costa & Asociados

Fuente de verdad de la cola de contenido. **Este archivo es el que lee la rutina automática**
para saber qué nota escribir: toma el primer ítem en estado ⬜ de la cola y abre un PR.

- **Cadencia objetivo:** 4 notas/mes (1 por semana). Meta: 100 clicks/día orgánicos.
- **Estados:** `⬜` pendiente · `🟡` en PR abierto · `✅` publicado
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
4. Después: ascensores CABA (110/mes, CPC $1,35), consejo de propietarios (260/mes),
   registro público de administradores (320/mes), limpieza de tanques (30/mes pero **CPC
   $8,75**, el más alto del nicho, y es la query donde Ramos rankea #1).

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

## Cola

| # | Estado | Slug | Keyword objetivo | Cluster | Notas |
|---|---|---|---|---|---|
| 1 | ⬜ | `escala-salarial-encargados-de-edificio` (página, no post) | escala salarial encargados de edificio | Personal | ⬇️ **BAJADA DE PRIORIDAD (2026-08-24, dato medido).** El slug apunta a una keyword de **320/mes**; las grandes son "escala salarial suterh" (2.400) y "suterh" (14.800). Pero **la SERP de "escala salarial suterh" son 11 de 12 resultados de `suterh.org.ar`**: el sindicato la monopoliza. Si algún día se hace, la página tiene que girar sobre SUTERH como entidad y apuntar a las variantes que el sindicato no responde ("sueldo encargado de edificio 2026" 70, "aguinaldo encargado de edificio" 10), que casi no tienen volumen. Sigue bloqueada por la planilla FATERYH de Gabriel, pero ya no es el desbloqueo más valioso del plan |
| 2 | ✅ | `quien-paga-las-expensas-propietario-o-inquilino` | quién paga las expensas inquilino o propietario | Expensas | Publicada 2026-08-03. Ángulo diferencial: el criterio del art. 1209 es "gasto habitual", NO "ordinarias vs extraordinarias" (lo dice el propio texto). Vigencia post-DNU 70/2023 tratada como discusión abierta, no zanjada |
| 3 | ✅ | `expensas-ordinarias-y-extraordinarias-diferencias` | expensas extraordinarias quién las paga | Expensas | Publicada 2026-08-03. Ángulo: lo que define a la extraordinaria es la **resolución de la asamblea** (art. 2048), no el monto. Diferencial CABA: Ley 941 art. 10 inc. j) (texto Ley 5.983) obliga a liquidarlas separadas, art. 15 inc. d) lo hace infracción y art. 16 fija la escala de sanciones. Sin jurisprudencia citada (no se verificó ningún fallo en fuente oficial) |
| 4 | ✅ | `deuda-de-expensas-y-juicio-ejecutivo` | no pagar expensas consecuencias | Expensas | Publicada 2026-08-10. Ángulo: por qué la vía ejecutiva es tan rápida (certificado del art. 2048 CCyC + art. 524 CPCCN), defensas taxativas del art. 544 CPCCN (las quejas de gestión NO son defensa), prescripción 2 años (art. 2562 inc. c), privilegio especial (art. 2582 inc. a), el comprador hereda la deuda (art. 2049). Citas verificadas contra Infoleg |
| 5 | ✅ | `honorarios-del-administrador-de-consorcio` | cuánto cobra un administrador de consorcio | Administrador | Publicada 2026-08-17. Ángulo: no hay arancel oficial — art. 14 Ley 941 ("sin ninguna otra entidad o cámara que los regule", modificación solo por asamblea y en acta), art. 9º (detallar en acta qué incluye el honorario y qué va aparte), art. 10 (recibo con CUIT/matrícula en la liquidación). Sin tarifas propias ni de mercado. Citas verificadas contra CEDOM |
| 6 | ✅ | `asamblea-de-consorcio-quorum-y-mayorias` | quórum asamblea consorcio | Asambleas | Publicada 2026-08-24. **Pilar del cluster.** Ángulo: el art. 2059 se titula "Convocatoria y quórum" y no fija ningún número (el quórum sale del reglamento); lo decisivo es el art. 2060, mayoría absoluta sobre la **totalidad** con doble exigencia (unidades + partes indivisas). Diferencial CABA: Ley 941 art. 9º obliga a convocar **bajo pena de nulidad** con lugar, día, temario y **horario de comienzo y finalización**, más copia del acta anterior. Además arts. 2058 inc. b) (5% de partes indivisas somete temas), 2061 (conformidad expresa del titular), 2062 (actas y cotejo de firmas), 2063 (asamblea judicial, 10% del total, mayoría simple de presentes), 2064 inc. a). Citas verificadas contra Infoleg y CEDOM |
| 7 | ⬜ | `certificado-de-deuda-de-expensas-para-escriturar` | certificado de deuda de expensas | Expensas | Long-tail transaccional (escribanías, compradores). **Vol medido: 30/mes.** No debería ir antes del refuerzo del pilar |
| 8 | ⬜ | `como-verificar-la-matricula-rpa-de-tu-administrador` | **registro publico de administradores de consorcios** | Administrador | Buscador oficial del RPA. Refuerza E-E-A-T propio (RPA 8192). **Keyword corregida por dato medido:** "verificar matricula administrador consorcio" da 0; la que tiene volumen es **"registro publico de administradores de consorcios" (320/mes)**. Reenfocar la nota sobre el Registro, no sobre el verbo "verificar" |
| 9 | ⬜ | `funciones-del-consejo-de-propietarios` | consejo de propietarios | Asambleas | Público = nuestro comprador real. **Vol medido: 260/mes.** Sube: es de los mejores de la cola |
| 10 | ⬜ | `ley-257-caba-fachadas-y-balcones` | ley 257 fachadas CABA | Obligaciones CABA | **Pilar del cluster.** Vencimiento + multa = intención alta |
| 11 | ⬜ | `administrador-que-no-rinde-cuentas-que-hacer` | administrador no rinde cuentas | Administrador | Denuncia ante Defensa al Consumidor CABA |
| 12 | ⬜ | `fondo-de-reserva-del-consorcio` | fondo de reserva consorcio | Expensas | Ángulo contable propio = diferencial |
| 13 | ⬜ | `asamblea-autoconvocada-y-asamblea-judicial` | asamblea autoconvocada consorcio | Asambleas | CCyC art. 2059 / 2063 |
| 14 | ⬜ | `seguros-obligatorios-de-un-consorcio` | seguro obligatorio consorcio | Obligaciones CABA | Integral + ART + ascensores |
| 15 | ⬜ | `aguinaldo-y-vacaciones-del-encargado-de-edificio` | aguinaldo encargado de edificio | Personal | Estacional (junio/diciembre) → publicar antes de la liquidación |
| 16 | ⬜ | `mantenimiento-obligatorio-de-ascensores-en-caba` | mantenimiento de ascensores caba | Obligaciones CABA | Conservador matriculado + libro de ascensores. **Vol medido: 110/mes, competencia HIGH, CPC $1,35.** Sube bastante: es el mejor de los ítems de obligaciones |
| 17 | ⬜ | `como-leer-una-liquidacion-de-expensas` | liquidacion de expensas | Expensas | Con ejemplo desglosado. **Keyword corregida:** "como leer una liquidacion de expensas" da 0; "liquidacion de expensas" da **70/mes (MEDIUM, CPC $0,87)**. Ojo: parte de este tema se va a cubrir al ampliar el pilar, revisar canibalización antes de escribirla |
| 18 | ⬜ | `intereses-por-mora-en-expensas` | intereses por mora expensas | Expensas | Qué es legítimo y qué es abusivo. **Vol medido: 0.** El doc 07 la había subido porque iProfesional gana con contenido genérico; el volumen no lo justifica |
| 19 | ⬜ | `obras-en-el-edificio-que-mayorias-se-necesitan` | mayorías para obras en un consorcio | Asambleas | Innovaciones vs. reparaciones necesarias |
| 20 | ⬜ | `libro-de-actas-y-libro-de-administracion` | libro de actas consorcio | Administrador | Rubricación y qué exige la Ley 941 |
| 21 | ⬜ | `tanques-de-agua-limpieza-obligatoria-caba` | limpieza de tanques caba | Obligaciones CABA | Periodicidad + certificado. La norma es la **Ley 6040**, citarla. **Vol medido: 30/mes pero CPC $8,75, el más alto de todo el nicho** (intención comercial altísima), y es la query donde Ramos rankea #1 con 6 backlinks de spam: se gana con contenido |
| 22 | ⬜ | `matafuegos-y-habilitaciones-del-edificio` | matafuegos consorcio obligatorio | Obligaciones CABA | Cierra el cluster de obligaciones |
| 23 | ⬜ | `traspaso-de-la-cuenta-bancaria-del-consorcio` | cuenta bancaria a nombre del consorcio | Administrador | Cruza con "cambiar de administrador" |
| 24 | ⬜ | `que-hacer-si-el-encargado-se-enferma` | licencia encargado de edificio | Personal | Reemplazos, suplencias, cargas |

| 25 | ⬜ | `propiedad-horizontal-que-es-como-funciona` | propiedad horizontal | Nuevo cluster | **Alta prioridad por dato medido: 1.600-1.900/mes y no tenemos NADA apuntando ahí.** Sumar "reglamento de propiedad horizontal" (320/mes) como sección o nota aparte |
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
  - ⬜ Monte Castro · ⬜ Villa Pueyrredón · después el resto (Caballito, Belgrano, Palermo).
- **Al publicar una landing:** agregar el barrio a `coverageZones` y a `zoneHrefs` en
  `content/zones.ts` (el chip de la home se vuelve link solo), sumar la ruta a `STATIC_LASTMOD`
  en `app/sitemap.ts`, correr `npm run indexnow -- <ruta>` y pedir indexación manual en GSC.

## Track aparte: herramientas y plantillas

Imanes de backlinks y de emails. Cada una vale más que 3 notas en links entrantes:

- Calculadora de expensas por porcentual fiscal
- Modelo de acta de asamblea (descargable)
- Modelo de carta documento para remover al administrador
- Checklist de traspaso de administración
