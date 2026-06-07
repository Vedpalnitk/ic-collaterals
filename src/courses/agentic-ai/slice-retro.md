# Phase 1 vertical-slice retrospective

**Course:** Building Agentic AI Systems
**Slice scope:** Syllabus wrapper + 5 representative primers (1, 5, 10, 15, 17),
covering one primer from each of the five course modules. Two primers carry
interactive animations (5: agent loop; 17: operating-model reframe).
**Completed:** 2026-06-07.

The slice exists to stress-test the per-primer template before committing
to the remaining 15 primers. This note records what proved out and what to
adjust before Phase 2.

## What worked

- **The shared CSS block with HTML-comment replacement markers.** Every
  primer reuses the same ~600 lines of CSS for layout, sidebar, eyebrow,
  pull-quote, callout, code-block, footer. Per-primer customization is
  confined to body content plus a small `/* PER-PRIMER REPLACE */` block.
  This kept stylistic drift to near zero across all five files.
- **rAF-throttled scroll-spy.** The sidebar TOC active-state and the
  reading-progress bar both use a single `requestAnimationFrame`-throttled
  scroll handler. It stays smooth on the longest primer (15, ~13k words of
  rendered prose) and survives the rapid in-page anchor jumps the syllabus
  encourages.
- **`data-target` pattern for animation toggles.** After Primer 5's first
  toggle handler turned out to be fragile (it used
  `parentElement.querySelector` to find the controlled SVG), we replaced it
  with `<button class="anim-toggle" data-target="#loop-anim">`. The handler
  now reads the explicit selector. Primer 17 reused this verbatim and it
  worked first try.
- **Hide the toggle entirely under `prefers-reduced-motion`.** Animations
  start paused for reduced-motion users, and the toggle button itself is
  hidden via CSS — there's nothing to click that would imply something is
  happening. The animated SVG falls back to a labeled static state.
- **Sidebar + content layout for course primers.** Self-learning material
  is read non-linearly. The sticky TOC plus prev/next footer nav made the
  course feel like one document rather than five disconnected files.

## What didn't

- **Word counts overshot the spec.** Every primer ended up 15–40% longer
  than the spec target. The longest (Primer 15, agentic KYC/surveillance)
  is roughly 2× the planned length because the worked case study had to
  cover both KYC and trade surveillance in enough detail to be credible.
  The spec's word-budget per primer needs revising — the current numbers
  are aspirational fiction.
- **First animation toggle was fragile.** Initial Primer 5 toggle used
  `e.target.parentElement.querySelector('svg')` to locate the controlled
  element. This broke the moment Primer 17 nested the button differently.
  Caught in review, replaced with explicit `data-target` (see above).
- **Primer 1 had a `display:contents` accessibility issue.** A wrapper used
  `display:contents` to flatten layout — but `display:contents` strips the
  element from the accessibility tree in some browsers. Replaced with an
  explicit grid container.
- **Primer 10 missed hyperlinking forward references.** The primer mentioned
  Primer 11 (observability) and Primer 12 (guardrails) in prose without
  links. Added `<a href="11-...">` even though those files don't exist yet
  — the eventual 404 is a clearer signal than silent prose.
- **Primer 15 had an SVG viewBox clipping issue.** The case-study flow
  diagram's viewBox was set before the final layout was decided; the
  bottom of the flowchart got clipped at narrow widths. Fixed by widening
  viewBox and adding `preserveAspectRatio="xMidYMid meet"`.

## New patterns / components

- **`.anim-toggle` button + `data-target` attribute** — for any primer with
  an animation that the reader can pause/play. Listed in the visual
  vocabulary now; reusable for future technical artifacts.
- **Per-primer-replacement HTML comments** — `<!-- PER-PRIMER REPLACE: title
  band -->`, `<!-- PER-PRIMER REPLACE: TOC -->`, etc. Made the next primer
  measurably faster to start; should be promoted to a template file before
  Phase 2.
- **`prefers-reduced-motion` hides animation controls entirely** — not just
  pauses the animation. New rule worth adding to CLAUDE.md.
- **Course-scoped DEEP_BLUE rule** — the course primers extend DEEP_BLUE
  use to the chapter-slab section dividers (the syllabus and Primer 17 use
  this). Scoped to the course; doesn't affect other artifacts.

## Recommended changes before Phase 2

1. **Extract a shared `course-primer.css`.** Inlining the ~600 lines of
   shared CSS in every file made the slice ship faster (one self-contained
   file per primer, no build step), but it will bite at 20 files. Extract
   to `docs/courses/agentic-ai/_primer.css` and `<link>` it from each
   primer. Trade-off: harder to share a single primer via copy-paste.
2. **Same for the scroll-spy + reading-progress JS.** Currently inlined as
   a ~50-line `<script>` at the bottom of each primer. Move to
   `_primer.js`. Animation-specific scripts stay inline (they're
   per-primer).
3. **Revise the word-count targets in `spec.md`.** Use the actuals from
   primers 1, 5, 10, 15, 17 as the new baseline. Long-form primers run
   ~5–8k words; shorter ones ~3–4k.
4. **Promote the `<!-- PER-PRIMER REPLACE -->` skeleton to a real template
   file** at `src/courses/agentic-ai/_primer-template.html`. Phase 2
   primers start by copying this file.
5. **Add a "Coming soon" indicator on the syllabus** for primers 2–4, 6–9,
   11–14, 16, 18–20. Currently they're listed without distinguishing live
   vs. forthcoming, which will read as broken links once readers start
   clicking.
6. **Sweep forward-reference hyperlinks.** Phase 1 primers 5 and 10 link
   to non-existent primers (06, 07, 08, 09, 11, 12). This is intentional —
   the links light up as Phase 2 lands — but worth flagging in the course
   readme.
7. **Pin a single keyframe-naming convention.** Primer 5 used positional
   names (`stage1`, `stage2`, `stagelabel`); Primer 17 used behavior names
   (`flowAcross`, `flowThroughSeam`, `seamPulse`). Both work but the next
   animated primer will copy whichever it cribs from. Behavior-named is
   the better default (survives refactor, reads correctly in DevTools).
   Document this in the spec alongside the animation toggle pattern.
8. **Pin the `prefers-reduced-motion` block shape.** Primer 5 and Primer
   17 both handle it correctly but with different declaration order and
   one with an explicit fallback rule. Pick one canonical shape (Primer 5
   is the more defensive of the two) and document it.
