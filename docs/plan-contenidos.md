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

---

## Clusters

| Cluster | Pilar | Estado |
|---|---|---|
| Expensas | `/blog/expensas-consorcio-que-son-como-se-liquidan` | ✅ publicado |
| Administrador y normativa | `/blog/ley-941-obligaciones-administrador-consorcios` | ✅ publicado |
| Asambleas y consejo | — | falta pilar (ítem 6) |
| Personal del edificio | `/escala-salarial-encargados-de-edificio` (página viva) | ⬜ ítem 1 |
| Obligaciones del edificio en CABA | — | falta pilar (ítem 10) |
| Local / money pages | `/servicios` | track aparte, ver abajo |

---

## Cola

| # | Estado | Slug | Keyword objetivo | Cluster | Notas |
|---|---|---|---|---|---|
| 1 | ⬜ | `escala-salarial-encargados-de-edificio` (página, no post) | escala salarial encargados de edificio | Personal | **Máximo volumen del nicho.** Página viva actualizada por paritaria, no nota. **Bloqueada: necesita la planilla oficial FATERYH que Gabriel liquida cada mes.** Acuerdo vigente jul-ago-sep 2026 firmado 27-jul-2026 |
| 2 | ✅ | `quien-paga-las-expensas-propietario-o-inquilino` | quién paga las expensas inquilino o propietario | Expensas | Publicada 2026-08-03. Ángulo diferencial: el criterio del art. 1209 es "gasto habitual", NO "ordinarias vs extraordinarias" (lo dice el propio texto). Vigencia post-DNU 70/2023 tratada como discusión abierta, no zanjada |
| 3 | ✅ | `expensas-ordinarias-y-extraordinarias-diferencias` | expensas extraordinarias quién las paga | Expensas | Publicada 2026-08-03. Ángulo: lo que define a la extraordinaria es la **resolución de la asamblea** (art. 2048), no el monto. Diferencial CABA: Ley 941 art. 10 inc. j) (texto Ley 5.983) obliga a liquidarlas separadas, art. 15 inc. d) lo hace infracción y art. 16 fija la escala de sanciones. Sin jurisprudencia citada (no se verificó ningún fallo en fuente oficial) |
| 4 | ⬜ | `deuda-de-expensas-y-juicio-ejecutivo` | no pagar expensas consecuencias | Expensas | CCyC art. 2048/2049. Vía ejecutiva |
| 5 | ⬜ | `honorarios-del-administrador-de-consorcio` | cuánto cobra un administrador de consorcio | Administrador | **Intención comercial alta** → link fuerte a `/servicios`. Sin publicar tarifas propias |
| 6 | ⬜ | `asamblea-de-consorcio-quorum-y-mayorias` | quórum asamblea consorcio | Asambleas | **Pilar del cluster.** CCyC arts. 2058-2062 |
| 7 | ⬜ | `certificado-de-deuda-de-expensas-para-escriturar` | certificado de deuda de expensas | Expensas | Long-tail transaccional (escribanías, compradores) |
| 8 | ⬜ | `como-verificar-la-matricula-rpa-de-tu-administrador` | verificar matrícula administrador consorcio | Administrador | Buscador oficial del RPA. Refuerza E-E-A-T propio (RPA 8192) |
| 9 | ⬜ | `funciones-del-consejo-de-propietarios` | consejo de propietarios funciones | Asambleas | Público = nuestro comprador real |
| 10 | ⬜ | `ley-257-caba-fachadas-y-balcones` | ley 257 fachadas CABA | Obligaciones CABA | **Pilar del cluster.** Vencimiento + multa = intención alta |
| 11 | ⬜ | `administrador-que-no-rinde-cuentas-que-hacer` | administrador no rinde cuentas | Administrador | Denuncia ante Defensa al Consumidor CABA |
| 12 | ⬜ | `fondo-de-reserva-del-consorcio` | fondo de reserva consorcio | Expensas | Ángulo contable propio = diferencial |
| 13 | ⬜ | `asamblea-autoconvocada-y-asamblea-judicial` | asamblea autoconvocada consorcio | Asambleas | CCyC art. 2059 / 2063 |
| 14 | ⬜ | `seguros-obligatorios-de-un-consorcio` | seguro obligatorio consorcio | Obligaciones CABA | Integral + ART + ascensores |
| 15 | ⬜ | `aguinaldo-y-vacaciones-del-encargado-de-edificio` | aguinaldo encargado de edificio | Personal | Estacional (junio/diciembre) → publicar antes de la liquidación |
| 16 | ⬜ | `mantenimiento-obligatorio-de-ascensores-en-caba` | mantenimiento ascensores obligatorio CABA | Obligaciones CABA | Conservador matriculado + libro de ascensores |
| 17 | ⬜ | `como-leer-una-liquidacion-de-expensas` | cómo leer la liquidación de expensas | Expensas | Con ejemplo desglosado. Refuerza el pilar |
| 18 | ⬜ | `intereses-por-mora-en-expensas` | intereses por mora expensas | Expensas | Qué es legítimo y qué es abusivo |
| 19 | ⬜ | `obras-en-el-edificio-que-mayorias-se-necesitan` | mayorías para obras en un consorcio | Asambleas | Innovaciones vs. reparaciones necesarias |
| 20 | ⬜ | `libro-de-actas-y-libro-de-administracion` | libro de actas consorcio | Administrador | Rubricación y qué exige la Ley 941 |
| 21 | ⬜ | `tanques-de-agua-limpieza-obligatoria-caba` | limpieza de tanques obligatoria CABA | Obligaciones CABA | Periodicidad + certificado |
| 22 | ⬜ | `matafuegos-y-habilitaciones-del-edificio` | matafuegos consorcio obligatorio | Obligaciones CABA | Cierra el cluster de obligaciones |
| 23 | ⬜ | `traspaso-de-la-cuenta-bancaria-del-consorcio` | cuenta bancaria a nombre del consorcio | Administrador | Cruza con "cambiar de administrador" |
| 24 | ⬜ | `que-hacer-si-el-encargado-se-enferma` | licencia encargado de edificio | Personal | Reemplazos, suplencias, cargas |

---

## Track aparte: money pages (no van en la cola del blog)

Estas traen **leads**, no clicks. Se hacen en tandas, no de a una, y las escribo con Nico:

- `/servicios/administracion-de-consorcios` — página dedicada al servicio principal
- Landings por barrio: Villa Devoto, Villa del Parque, Caballito, Belgrano, Palermo, Microcentro
  (foco oficinas). Contenido real por zona, no plantilla clonada — si son iguales, Google las
  trata como thin content y no indexa ninguna.

## Track aparte: herramientas y plantillas

Imanes de backlinks y de emails. Cada una vale más que 3 notas en links entrantes:

- Calculadora de expensas por porcentual fiscal
- Modelo de acta de asamblea (descargable)
- Modelo de carta documento para remover al administrador
- Checklist de traspaso de administración
