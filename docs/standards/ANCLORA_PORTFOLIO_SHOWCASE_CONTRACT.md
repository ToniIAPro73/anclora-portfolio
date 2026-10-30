# Anclora Portfolio / Showcase Contract

## Objetivo
Definir el contrato UX/UI para repos públicos de portfolio, landings de demostración y casos de estudio comerciales. Deben vender criterio, captación y ejecución, no comportarse como dashboards ni como experiencias ultra premium residenciales completas.

Ámbito:
- `anclora-portfolio`
- `anclora-azure-bay-landing`

## Logo y tier *(CHG-0014, 2026-09-25)*

- La familia `portfolio_showcase` gobierna tema, tipografía y narrativa; el **tier** gobierna el logo.
- **Aplicaciones de muestra** (`anclora-portfolio`, `anclora-azure-bay-landing`): usan el logo **Ultra Premium** dorado, el mismo que `anclora-private-estates`, con los nombres de archivo propios de cada repo. No usan el plateado de Entidad Matriz ni el cobre de Premium.
- **Showcases**: usan siempre el logo de su **aplicación de origen** (`derived_from` en `ecosystem-repos.json`), nunca el logo genérico de su tier ni uno propio.
  - `anclora-portfolio-showcase` → `anclora-portfolio` → Ultra Premium.
  - `anclora-energyscan-showcase` → `anclora-energyscan` → Premium.
  - `anclora-guesthub-showcase` → `anclora-guesthub` → Premium.
  - `anclora-shiftimport-showcase` → `anclora-shiftimport` → Premium.
  - `anclora-fiscal-showcase` → `anclora-fiscal` → Internal.
  - `anclora-advisor-ai-showcase` → `anclora-advisor-ai` → Internal.
- **Excepción:** `anclora-group-landing` es la landing corporativa de la Entidad Matriz y usa el logo de Group.
- Favicons, apple-touch, iconos PWA y medallones de lockups se derivan del logo de ese mismo tier.

## Piezas canónicas del design system

Las superficies `portfolio / showcase` deben apoyarse en `anclora-design-system` para:

- `tokens` y `themes` editoriales
- `foundations` de tipografía, spacing, media ratios y surface rhythm
- `components` de button, card, form field, dialog y media controls
- `patterns` de:
  - hero
  - section layout
  - gallery/lightbox
  - lead form
  - CTA strip
  - credibility blocks

Regla:
- una landing puede tener identidad propia, pero no puede inventar su propio mini design system al margen del repo canónico.

## Naturaleza del grupo
- Son superficies públicas de marca y conversión.
- Deben priorizar narrativa, credibilidad y CTA.
- Pueden compartir ADN visual con real estate premium, pero no deben imitar por completo la experiencia `Private Estates`.

## Invariantes de grupo

### 1. Estructura de página
- La pantalla principal debe leerse como landing o case study, no como app de workspace.
- El primer viewport debe comunicar:
  - activo o propuesta
  - promesa de valor
  - CTA principal
  - prueba visual suficiente
- La longitud de página puede ser grande, pero la jerarquía debe ser muy clara entre secciones.

### 2. Navegación
- La navegación debe ser ligera y orientada a scroll.
- El cambio de idioma debe estar visible y ser inmediato.
- Se permiten menús móviles simples, floating controls y accesos rápidos si no invaden la lectura.
- No introducir shells complejos ni menús de aplicación si el producto es una landing.

### 3. Botones
- Deben existir al menos estas familias:
  - `primary`
  - `secondary`
  - `ghost`
- La primaria debe apoyar conversión: dossier, contacto, reunión, descarga o exploración del activo.
- La secundaria debe ampliar contexto sin competir con la primaria.
- No usar múltiples primarias con el mismo peso visual dentro del mismo bloque.

### 4. Cards y bloques de contenido
- Las cards de features, unidades, inversión o credenciales deben compartir:
  - borde o separación clara
  - padding consistente
  - hover medido
  - legibilidad alta
- No se permiten grids con saltos de hover que rompan la composición.
- Las cards de pricing o producto hero pueden tener mayor presencia, pero deben seguir integradas en el sistema general.

### 5. Formularios de captación
- El formulario es una superficie crítica de conversión.
- Debe comunicar confianza y bajo riesgo.
- Requisitos:
  - labels claros
  - validación visible
  - privacidad legible
  - CTA inequívoco
  - feedback de envío claro
- La protección anti-spam o anti-bot debe integrarse sin romper el acabado visual.

### 6. Modales, lightboxes y galerías
- Se aplica `MODAL_CONTRACT.md`.
- En este grupo, el uso más frecuente es:
  - galería ampliada
  - visualización de media
  - detalle puntual de unidad
- Si el contenido principal de venta necesita demasiado espacio, debe vivir en una sección dedicada antes que en un modal pesado.

### 7. Motion
- Se aplica `UI_MOTION_CONTRACT.md`.
- Se permite un motion más emocional que en apps internas.
- Aun así:
  - el hero no debe secuestrar el tiempo del usuario
  - el CTA debe estar disponible sin esperar secuencias largas
  - las animaciones deben poder convivir con scroll real y conversión

### 8. Localización
- Se aplica `LOCALIZATION_CONTRACT.md`.
- Cobertura mínima del grupo:
  - `es`
  - `en`
- El selector de idioma debe ser visible.
- No se permite una landing con mitad del funnel en un idioma y el formulario en otro.
- Los dos idiomas deben mantener:
  - CTAs equivalentes
  - legal y privacidad equivalentes
  - emails o assets de entrega alineados con el idioma elegido

### 9. Tema
- No se exige toggle de tema.
- Lo normal en este grupo es un tema editorial único muy cuidado.
- Si existe un modo alternativo, debe sentirse diseñado y no degradar la dirección visual del caso de estudio.

## Reglas particulares por aplicación

### `anclora-portfolio`
- Es el blueprint técnico y comercial del grupo.
- Debe mostrar calidad de marca, modularidad y rigor de implementación.
- Puede usar estructura más componible y más cercana a una base reutilizable que a una landing monolítica.
- Debe seguir siendo bilingüe `es/en`.

### `anclora-azure-bay-landing`
- Caso de estudio comercial de captación inmobiliaria premium.
- Debe priorizar:
  - narrativa de inversión
  - descarga de dossier
  - lead capture
  - bilingüe `es/en`
- Su gramática debe ser la referencia más directa para landings inmobiliarias del grupo portfolio.

## Gate de aceptación

Una feature de este grupo no está lista si:
- parece un dashboard disfrazado
- entierra el CTA principal bajo exceso de narrativa
- usa un formulario que rompe confianza o claridad
- mezcla idiomas en navegación, formulario o assets de conversión
- introduce modales o galerías que dificultan la navegación del usuario
- rehace CTAs, forms, cards o bloques de hero fuera de las piezas y patterns compartidos cuando ya existen en `anclora-design-system`
