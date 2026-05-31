# IC Collaterals — Working Contract

This folder produces **Infosys Consulting (IC)** branded collaterals. Across
five artifacts so far — a sales-enablement deck, a POV primer, an executive
one-pager, an engineering self-learning guide, and a design-reference page —
the system has converged on a clear set of choices. This file is the rule
book for what to do (and what not to do) when adding the next collateral.

## Canonical references — read these before producing any artifact

- **[tokens.js](tokens.js)** — machine-readable source of truth: color
  palette, three font families, layout scale. Reference tokens by semantic
  name (`light.text.accent`), not by raw hex.
- **[design-reference.html](design-reference.html)** — visual reference for
  the palette, type scales, and named visual components (chapter slab,
  eyebrow, pull quote, the seam, etc.). Open in a browser.

If a request can't be served by the current tokens or vocabulary, surface
the gap before drifting from the system.

## Hard rules — non-negotiable

These rules are duplicated here from `tokens.js` because they must hold from
the first turn, before any file is read:

1. **No burnt orange.** IC is blue-led. Warm accents are not used anywhere.
2. **No pure black** (`#000000`). Use `PAVEMENT #404040` for every "black"
   text, line, and outline. This applies to chart axes, table grids,
   everything.
3. **Deep Blue (`#182534`) is used ONLY in slide title bands and section
   separators.** Specifically forbidden, even though it might feel "branded":
   column or card headers, table header rows, swim-lane labels, callout
   fills, navigation/footer bands, chart series, icon fills, badge
   backgrounds. The cover slide's footer/metadata strip is a controlled
   exception — see "Visual vocabulary" below.
4. **BLUE (`#007CC3`) is the working accent.** Use it freely across slides
   for section heads, accent strokes, chart primary series, callouts, hero
   figures, and emphasized phrases. `LT_BLUE #3699DA` is its softer
   companion for secondary accents and fine separators.

## Three font families — pick by artifact type

| Family | Fonts | Use for |
|---|---|---|
| **SYSTEM** (Arial-led) | `Arial`, `Consolas` | Editable PPTX, DOCX, anything shared as a working document. Arial is pre-installed on every OS — the file looks identical everywhere with no embedding. |
| **EDITORIAL** | `Fraunces` (display) + `Newsreader` (body serif) + `JetBrains Mono` (utility) | POV primers, consulting decks, one-pagers, public-facing PDFs. Anything where the artifact IS the deliverable and design quality is part of the value. |
| **TECHNICAL** | `Fraunces` (display) + `IBM Plex Sans` (body sans) + `JetBrains Mono` (utility) | Engineering notes, self-learning guides, internal technical documentation, anything with code blocks. Plex Sans keeps long technical reading clean. |

Fraunces and JetBrains Mono are shared between Editorial and Technical — the
two families read as siblings.

**When in doubt:** if the recipient will edit the file in PowerPoint or
Word, use System. If the artifact is "finished" (deck, PDF, HTML primer),
use Editorial. If it contains code or is meant to teach a technical topic,
use Technical.

## Visual vocabulary — named components

The IC design system has crystallized a vocabulary. Each name below refers
to a specific recurring component; reuse them rather than reinvent.

### Always-present scaffolding

- **Title band** — thin (0.5in / 32–40px) DEEP_BLUE strip at the top of
  every content slide, with the title in Fraunces or Arial (system family).
- **Eyebrow** — mono uppercase + letter-spacing, BLUE, often prefixed with a
  small horizontal BLUE bar (3px tall × 28–36px wide). Used for chapter
  markers, section labels, figure tags, byline field labels. The bar is the
  recurring motif that signals "structural label."
- **Footer** — hairline RULE-colored rule + small mono "INFOSYS CONSULTING ·
  AGENTIC AI IN BANKING · § N / TOTAL" left, page number BLUE right.

### Composition elements

- **Chapter slab** — full-bleed DEEP_BLUE band used as a section separator.
  Contains chapter number (mono LT_BLUE), Fraunces title with italic BLUE
  emphasis on the key phrase, optional one-line deck below in stone-grey.
  Used between major sections in primers, before appendices in decks.
- **Cover masthead** — thin DEEP_BLUE band at the very top of a cover/title
  page, containing the IC wordmark + edition metadata in mono. Allowed
  exception to the DEEP_BLUE rule because the cover IS the master title.
- **Byline grid** — four-column metadata block at the bottom of cover pages
  (Practice / Edition / Audience / Distribution). Mono labels in stone,
  italic Fraunces values in pavement.
- **Cover colophon** — thin DEEP_BLUE strip at the very bottom of a cover
  page with mono metadata in stone. Same logic as the masthead.

### Inside the body

- **The seam** — a thin BLUE rule (1–2px) used as a recurring visual
  element: vertical SEAM dividers between Today/Redesigned panes in
  before/after diagrams, horizontal accent rules under hero quotes, small
  BLUE bars in eyebrows. The seam is named for the operating-model thesis
  ("humans at the seam") but the visual element is now part of the system.
- **Pull quote** — Fraunces italic, BLUE left rule, 22–32px depending on
  context. Breaks out of the column on wide layouts.
- **Drop cap** — BLUE Fraunces, optical-size 144, WONK variant, on chapter
  openers in primer-style artifacts. Editorial only; don't use in decks.
- **Roman numerals** — Fraunces italic in BLUE for enumerated pillars,
  principles, chapters. Lowercase Roman (i, ii, iii) for sub-lists.
- **Note / callout** — TINT_BLUE_BG fill with 2px BLUE left rule. Mono
  TAG line in BLUE, Fraunces italic head, Newsreader/Plex body.
- **Code block** (technical artifacts only) — TINT_STONE_BG fill with 3px
  BLUE left rule. JetBrains Mono. Small mono `LANG` tag in the top-right
  corner.
- **Figure** — bordered with 1px RULE, white background. Numbered
  `FIG. NN` in mono BLUE in the top-left corner. Italic Newsreader/Plex
  caption below.
- **Stat callout** — large Fraunces figure (40–84pt) in BLUE with a small
  `<small>` suffix in pavement, sitting above a short mono LABEL.

### Placeholder marker

- **`PLACEHOLDER` pill** — compact TINT_BLUE_BG rectangle with BLUE left
  rule, top-right of the slide body area. Mono text `PLACEHOLDER · Replace
  with ...`. Tight width (~3in / 240px), single line.

## Layout patterns — pick by reading mode

Two HTML layout patterns have stabilized:

- **Single-column reading** — primers, one-pagers. Centered column, max
  width ~660–720px. Generous side margins. Optional left gutter for chapter
  markers and sidenotes. Best for long-form prose that's read top-to-bottom.
- **Sidebar + content** — engineering notes, reference docs, anything
  meant to be jumped around in. Sticky left sidebar (280px) holds a TOC
  with active-section tracking; main content scrolls on the right. Section
  headers are DEEP_BLUE bands contained within the content column (not
  full-bleed across the sidebar). Best for reference and learning material.

For decks, the layout is fixed (1280×720 px, 16:9), and the page-level
patterns above don't apply — but the same visual vocabulary does.

## Producing collaterals

### By output format

- **Editable deck (PPTX)** → use the `pptx` skill with `python-pptx`. Use
  the SYSTEM font family. Drive all colors from `tokens.js`. Slide canvas
  is 1280×720 (16:9), 0.7in margins, 0.5in title band, RULE-color hairline
  footer at the bottom.
- **High-design deck (PPTX)** → same canvas and tooling, but switch to the
  EDITORIAL family (Fraunces / Newsreader / JetBrains Mono) and embed the
  fonts. The deck at `decks/agentic-ai-banking-pov/` is the reference.
- **Long-form primer / POV (HTML)** → EDITORIAL family, single-column
  layout. The primer at `primers/agentic-ai-banking-primer.html` is the
  reference.
- **One-pager (HTML, prints to A4)** → EDITORIAL family, single A4 sheet.
  See `one-pagers/agentic-ai-banking-one-pager.html`.
- **Engineering note / learning doc (HTML)** → TECHNICAL family, sidebar +
  content layout. See
  `engineering-notes/agentic-harness-evals-traces.html`.

### Cross-cutting

- **Charts.** Primary series BLUE. Secondary series LT_BLUE. Tertiary
  SLATE. Gridlines RULE. Axis labels SLATE in mono. No DEEP_BLUE in charts.
- **Tables.** Grid is RULE. Zebra rows use TINT_STONE_BG. Header row text
  is PAVEMENT, optionally with a BLUE bottom border for emphasis. NEVER a
  DEEP_BLUE header row.
- **Status badges** (RACI, severity, traffic lights). Pair each solid
  (`status.RED/AMBER/GREEN/GRAY`) with its `_BG` tint for the pill fill.

## Lessons learned — things to avoid

These are mistakes I've made building previous artifacts and corrected. Read
them before producing the next collateral.

- **Don't double up eyebrows.** If the title-band right side shows "Reframe
  · Our point of view," don't also add a standalone "OUR POINT OF VIEW"
  eyebrow under it. Pick one location.
- **Don't use TINT_BLUE_BG as a full-width band.** It feels banner-like
  and fights the hairline aesthetic. Use it as a small left-rule strip or
  inside a contained note/callout box.
- **Don't break titles mid-clause.** When using inline italic emphasis,
  make sure the italic portion is a complete phrase. `<em>The memo is
  generated</em>, not authored.` reads as a broken sentence when it wraps.
  Prefer `<em>The memo is generated, not authored.</em>` followed by a
  normal continuation.
- **Don't position rules near text by absolute coordinates without
  accounting for descenders.** Fraunces at large sizes has substantial
  descenders. A BLUE accent rule that "should be 0.3in below the title"
  may strike through the bottom of letters like 'p', 'g', 'y'. Pad
  generously, or omit the rule.
- **Don't anchor chart labels to individual bar heights.** When some bars
  are very tall (40%) and some very short (2%), per-bar label positioning
  (`y = bar_top - 0.65in`) makes the labels float at inconsistent heights.
  Use a shared label-row Y above the chart instead.
- **Don't put `<a>` around all grid children inside an `<li>`.** A grid
  defined on `<li>` only applies to its direct children — the `<a>`
  collapses into the first column, and its inner spans wrap one word per
  line. Either move the grid to `<a>`, or make spans direct children of
  `<li>`.

## Iteration policy

The design system is evolving and will keep evolving. When you encounter a
gap:

- Don't invent a new color or font silently. Either pick the closest
  existing token, or pause and surface the gap.
- When the user agrees to a token change, update `tokens.js` first, then
  mirror it into the inlined block in `design-reference.html`, then keep
  going. The visual reference must always render the current truth.
- Keep this CLAUDE.md in sync when a rule or component name changes. Hard
  rules are the things that must hold even before the source files are
  read; everything else can be referenced from `tokens.js` or the visual
  reference.
