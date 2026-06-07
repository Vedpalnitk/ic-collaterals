# Building Agentic AI Systems — Phase 1 (Vertical Slice) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the vertical slice of the agentic-AI course — course wrapper page + 5 representative primers (one per module) — to validate the template, hybrid structure, animation pattern, and cross-linking before filling the remaining 15 primers.

**Architecture:** All deliverables are static HTML written directly under `docs/courses/agentic-ai/` (per `CLAUDE.md` folder layout). Each primer is a single self-contained `.html` file with inlined CSS (matching the established primer pattern from `docs/primers/cdd-kyc-primer.html` and `docs/engineering-notes/agentic-harness-evals-traces.html`). Tokens are inlined as CSS custom properties but their values come from `tokens.js`. No build step. Two primers (5 and 17) carry a CSS-only animation. Landing page (`docs/index.html`) gets a new "Courses" section card linking to the wrapper.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, scroll-snap, prefers-reduced-motion), vanilla JS for scroll-spy TOC and reading-progress bar, no framework. Fonts: Fraunces + IBM Plex Sans + JetBrains Mono via Google Fonts. Verification via Playwright MCP for visual screenshots + browser console checks.

**Scope note:** This plan covers Phase 1 (Slice) ONLY — 7 deliverables. Phases 2–6 (filling the remaining 15 primers, module by module) are out of scope and will get their own plans once the slice is validated and approved.

**Spec:** [src/courses/agentic-ai/spec.md](spec.md)

---

## File structure

After Phase 1, the repo gains:

```
docs/courses/agentic-ai/
├── index.html              # course syllabus / wrapper (Task 1)
├── 01-llm-mental-model.html       # Module I primer (Task 2)
├── 05-agent-loop.html             # Module II primer w/ animation (Task 3)
├── 10-evaluations-for-agents.html # Module III primer (Task 4)
├── 15-agentic-kyc-surveillance.html # Module IV primer (Task 5)
└── 17-agentic-operating-model.html  # Module V primer w/ animation (Task 6)

docs/index.html             # landing page — new "Courses" card added (Task 7)
```

Filename convention: `NN-kebab-slug.html` where `NN` is the primer's number in the 20-primer sequence. This leaves clean room for primers 2, 3, 4, 6, 7, 8, 9, 11, 12, 13, 14, 16, 18, 19, 20 in later phases.

Each primer file is self-contained: inlined CSS, inlined SVG/animation, inlined JS for scroll-spy. ~1500–3500 lines per primer (mostly content). No shared CSS file — each primer is portable. (We accept the duplication; the published artifacts must each render alone, and the existing primers already follow this pattern.)

---

## Shared primer template — reference implementation

Every primer follows the same shell. Build this once mentally before starting Task 2; reuse verbatim across Tasks 2–6.

**Inlined CSS token block (paste at the top of each primer's `<style>`):**

```css
:root {
  /* colors — from tokens.js */
  --white:      #FFFFFF;
  --deep:       #182534;
  --pavement:   #404040;
  --blue:       #007CC3;
  --lt-blue:    #3699DA;
  --slate:      #6D6E71;
  --stone:      #A7A9AC;
  --tint-blue:  #E6F2FA;
  --tint-stone: #F2F2F3;
  --rule:       #E2E4E7;
  /* status — used in Module III primers */
  --red:    #C7372F;  --red-bg:    #FBE9E8;
  --amber:  #C77A1A;  --amber-bg:  #FCF1E2;
  --green:  #2F8F4E;  --green-bg:  #E8F5EC;
  --gray:   #6D6E71;  --gray-bg:   #F2F2F3;

  /* type */
  --display: 'Fraunces', 'Times New Roman', serif;
  --body:    'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif;
  --mono:    'JetBrains Mono', 'SF Mono', Consolas, monospace;

  /* layout */
  --sidebar-w: 280px;
  --content-max: 760px;
}
```

**HTML skeleton:**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>{{Primer title}} · Building Agentic AI Systems · Infosys Consulting</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..900,0..100,0..1;1,9..144,300..900,0..100,0..1&family=IBM+Plex+Sans:ital,wght@0,300..700;1,300..700&family=JetBrains+Mono:ital,wght@0,300..700;1,300..700&display=swap" rel="stylesheet" />
  <style>/* tokens + page CSS — see below */</style>
</head>
<body>
  <div class="progress" aria-hidden="true"></div>

  <!-- MASTHEAD: thin DEEP_BLUE strip with course mark + module/primer metadata -->
  <header class="masthead">
    <div class="masthead-left">
      <span class="mono-tag">INFOSYS CONSULTING · BUILDING AGENTIC AI</span>
    </div>
    <div class="masthead-right">
      <span class="mono-tag">MODULE {{N}} · PRIMER {{NN}} / 20</span>
    </div>
  </header>

  <!-- TITLE BAND: Fraunces title + italic BLUE subtitle -->
  <section class="title-band">
    <h1 class="title">{{Title}}</h1>
    <p class="subtitle"><em>{{One-line argument of the primer.}}</em></p>
  </section>

  <!-- COLD-START CALLOUT (skippable) -->
  <aside class="cold-start" aria-label="Cold-start summary">
    <span class="cold-tag">IF YOU HAVEN'T READ {{previous primer title}}</span>
    <p>{{Three-sentence gist of prerequisite primer.}}</p>
  </aside>

  <!-- LAYOUT: sticky sidebar + content -->
  <div class="layout">
    <nav class="sidebar" aria-label="Table of contents">
      <div class="sidebar-eyebrow"><span class="bar"></span><span>ON THIS PAGE</span></div>
      <ol class="toc">
        <li><a href="#s1" class="toc-link">{{Section 1 title}}</a></li>
        <li><a href="#s2" class="toc-link">{{Section 2 title}}</a></li>
        <!-- ... -->
      </ol>
      <div class="sidebar-nav">
        <a class="nav-link prev" href="{{prev}}">&larr; Previous primer</a>
        <a class="nav-link next" href="{{next}}">Next primer &rarr;</a>
      </div>
    </nav>

    <main class="content">
      <section id="s1">
        <h2 class="section-head">{{Section 1 title}}</h2>
        <!-- prose, figures, code blocks, callouts -->
      </section>
      <!-- ... -->
    </main>
  </div>

  <!-- FOOTER -->
  <footer class="footer">
    <span class="mono-tag">INFOSYS CONSULTING · BUILDING AGENTIC AI · MODULE {{N}} · PRIMER {{NN}} / 20</span>
    <a class="footer-link" href="index.html">&larr; Course syllabus</a>
  </footer>

  <script>/* scroll-spy + reading-progress — see Task 2 step 4 */</script>
</body>
</html>
```

**Page CSS (paste below the token block):**

```css
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; font-family: var(--body); font-size: 17px; line-height: 1.65; color: var(--pavement); background: var(--white); -webkit-font-smoothing: antialiased; }
::selection { background: var(--deep); color: var(--white); }
a { color: var(--blue); text-decoration: none; }
a:hover { text-decoration: underline; text-underline-offset: 3px; }
p { margin: 0 0 18px; }

.progress { position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 1000; pointer-events: none; }
.progress::before { content: ''; display: block; height: 100%; width: var(--p, 0%); background: var(--blue); transition: width 80ms linear; }

.masthead { background: var(--deep); color: var(--white); padding: 12px 32px; display: flex; justify-content: space-between; align-items: center; }
.mono-tag { font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--stone); }

.title-band { padding: 48px 32px 32px; max-width: 1080px; margin: 0 auto; }
.title { font-family: var(--display); font-weight: 500; font-size: 56px; line-height: 1.1; color: var(--pavement); margin: 0 0 12px; }
.subtitle { font-family: var(--display); font-style: italic; font-size: 22px; color: var(--blue); margin: 0; }

.cold-start { max-width: 1080px; margin: 0 auto 24px; padding: 16px 20px; background: var(--tint-blue); border-left: 2px solid var(--blue); }
.cold-tag { display: block; font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--blue); margin-bottom: 6px; }
.cold-start p { margin: 0; font-size: 15px; color: var(--pavement); }

.layout { display: grid; grid-template-columns: var(--sidebar-w) 1fr; gap: 48px; max-width: 1080px; margin: 0 auto; padding: 32px; }
@media (max-width: 900px) { .layout { grid-template-columns: 1fr; } .sidebar { position: static; } }

.sidebar { position: sticky; top: 32px; align-self: start; max-height: calc(100vh - 64px); overflow-y: auto; padding-right: 16px; border-right: 1px solid var(--rule); }
.sidebar-eyebrow { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--blue); margin-bottom: 16px; }
.sidebar-eyebrow .bar { display: inline-block; width: 28px; height: 3px; background: var(--blue); }
.toc { list-style: none; padding: 0; margin: 0 0 32px; }
.toc li { margin: 8px 0; font-size: 14px; }
.toc-link { color: var(--slate); }
.toc-link.active { color: var(--blue); font-weight: 500; }
.sidebar-nav { display: flex; flex-direction: column; gap: 8px; padding-top: 16px; border-top: 1px solid var(--rule); }
.nav-link { font-family: var(--mono); font-size: 11px; letter-spacing: 0.05em; color: var(--blue); }

.content { max-width: var(--content-max); }
.section-head { font-family: var(--display); font-weight: 500; font-size: 36px; line-height: 1.2; color: var(--pavement); margin: 48px 0 16px; padding-top: 16px; border-top: 1px solid var(--rule); }
.section-head:first-child { border-top: none; padding-top: 0; }

/* note / callout */
.note { background: var(--tint-blue); border-left: 2px solid var(--blue); padding: 16px 20px; margin: 20px 0; }
.note-tag { font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; color: var(--blue); text-transform: uppercase; }
.note-head { font-family: var(--display); font-style: italic; font-size: 18px; color: var(--pavement); margin: 4px 0 8px; }

/* code block */
.code { background: var(--tint-stone); border-left: 3px solid var(--blue); padding: 16px 20px; margin: 20px 0; font-family: var(--mono); font-size: 13px; line-height: 1.6; overflow-x: auto; position: relative; }
.code-tag { position: absolute; top: 8px; right: 12px; font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; color: var(--slate); text-transform: uppercase; }
.code pre { margin: 0; }

/* figure */
.figure { border: 1px solid var(--rule); padding: 24px; margin: 24px 0; background: var(--white); position: relative; }
.figure-tag { position: absolute; top: 8px; left: 12px; font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; color: var(--blue); }
.figure-caption { font-family: var(--display); font-style: italic; font-size: 14px; color: var(--slate); margin-top: 12px; }

/* pull quote */
.pull { font-family: var(--display); font-style: italic; font-size: 26px; line-height: 1.35; color: var(--pavement); border-left: 2px solid var(--blue); padding-left: 24px; margin: 32px 0; }

/* stat callout */
.stat { font-family: var(--display); font-size: 64px; font-weight: 400; color: var(--blue); line-height: 1; }
.stat small { font-family: var(--display); font-size: 18px; color: var(--pavement); margin-left: 4px; }
.stat-label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; color: var(--slate); text-transform: uppercase; margin-top: 4px; }

/* footer */
.footer { display: flex; justify-content: space-between; align-items: center; padding: 24px 32px; border-top: 1px solid var(--rule); max-width: 1080px; margin: 64px auto 0; }
.footer-link { font-family: var(--mono); font-size: 11px; letter-spacing: 0.05em; color: var(--blue); }

/* respect reduced motion */
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } .progress::before { transition: none; } }
```

**Inline JS (scroll-spy + reading progress, paste in `<script>`):**

```javascript
(function () {
  const sections = document.querySelectorAll('main.content section[id]');
  const links = document.querySelectorAll('.toc-link');
  const progress = document.querySelector('.progress');

  function onScroll() {
    const h = document.documentElement;
    const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
    progress.style.setProperty('--p', (scrolled * 100).toFixed(1) + '%');

    let current = sections[0]?.id;
    sections.forEach(s => {
      if (s.getBoundingClientRect().top < 120) current = s.id;
    });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
```

Pause to verify the template renders before authoring content: write a throwaway primer with three placeholder sections, open in browser via Playwright MCP, confirm masthead/title-band/sidebar/footer all render, scroll-spy highlights active section, reading-progress bar advances. (This verification is Task 1 step 4.)

---

## Task 1 — Course wrapper page (`index.html`)

**Files:**
- Create: `docs/courses/agentic-ai/index.html`

The wrapper is the syllabus. Layout: full-bleed cover band → course thesis → "how to read this" note → five module sections, each a chapter slab + primer list. No sidebar (single-column reading).

- [ ] **Step 1: Create directory and scaffold the file**

```bash
mkdir -p docs/courses/agentic-ai
```

Create `docs/courses/agentic-ai/index.html` with the shared token block and a stripped-down page CSS (no sidebar styles needed; add `.cover`, `.chapter-slab`, `.primer-card` styles instead — see step 2).

Use the standard HTML5 boilerplate + Google Fonts preconnect from the template above. `<title>Building Agentic AI Systems · A course for builders · Infosys Consulting</title>`.

- [ ] **Step 2: Add cover band, thesis, and module sections**

Wrapper-specific CSS additions (append after the shared token block + base CSS):

```css
.cover { background: var(--deep); color: var(--white); padding: 80px 48px 64px; }
.cover-masthead { display: flex; justify-content: space-between; font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; color: var(--stone); margin-bottom: 64px; }
.cover-title { font-family: var(--display); font-weight: 400; font-size: 80px; line-height: 1; margin: 0 0 16px; max-width: 900px; }
.cover-title em { color: var(--lt-blue); font-style: italic; }
.cover-subtitle { font-family: var(--display); font-style: italic; font-size: 26px; color: var(--lt-blue); margin: 0 0 48px; max-width: 700px; }
.cover-byline { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; margin-top: 80px; max-width: 1000px; }
.byline-label { font-family: var(--mono); font-size: 10px; letter-spacing: 0.1em; color: var(--stone); text-transform: uppercase; margin-bottom: 6px; }
.byline-value { font-family: var(--display); font-style: italic; font-size: 16px; color: var(--white); }

.thesis { max-width: 800px; margin: 80px auto; padding: 0 32px; }
.thesis-pull { font-family: var(--display); font-style: italic; font-size: 32px; line-height: 1.3; color: var(--pavement); border-left: 2px solid var(--blue); padding-left: 32px; margin: 0 0 24px; }
.thesis p { font-size: 18px; }

.how-to-read { max-width: 800px; margin: 0 auto 80px; padding: 0 32px; }
.eyebrow { display: flex; align-items: center; gap: 8px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; color: var(--blue); text-transform: uppercase; margin-bottom: 12px; }
.eyebrow .bar { display: inline-block; width: 28px; height: 3px; background: var(--blue); }

.chapter-slab { background: var(--deep); color: var(--white); padding: 56px 48px; margin: 64px 0 32px; }
.chapter-num { font-family: var(--mono); font-size: 12px; letter-spacing: 0.12em; color: var(--lt-blue); text-transform: uppercase; }
.chapter-title { font-family: var(--display); font-weight: 400; font-size: 48px; line-height: 1.1; margin: 8px 0 12px; max-width: 800px; }
.chapter-title em { color: var(--lt-blue); font-style: italic; }
.chapter-deck { font-family: var(--display); font-style: italic; font-size: 18px; color: var(--stone); margin: 0; max-width: 700px; }

.primer-list { max-width: 1000px; margin: 0 auto; padding: 0 32px; }
.primer-card { display: grid; grid-template-columns: 56px 1fr 100px; gap: 24px; padding: 24px 0; border-bottom: 1px solid var(--rule); align-items: baseline; }
.primer-card:hover { background: var(--tint-stone); }
.primer-card a { display: contents; color: inherit; }
.primer-num { font-family: var(--mono); font-size: 14px; color: var(--blue); font-weight: 500; }
.primer-body { display: flex; flex-direction: column; gap: 4px; }
.primer-title { font-family: var(--display); font-size: 20px; color: var(--pavement); margin: 0; }
.primer-arg { font-size: 14px; color: var(--slate); margin: 0; }
.primer-meta { font-family: var(--mono); font-size: 11px; letter-spacing: 0.05em; color: var(--slate); text-align: right; }
.primer-card.placeholder { opacity: 0.55; pointer-events: none; }
.primer-card.placeholder .primer-meta::after { content: ' · soon'; color: var(--stone); }

.colophon { background: var(--deep); color: var(--stone); padding: 24px 48px; font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; display: flex; justify-content: space-between; margin-top: 96px; }
```

Body markup, in order:

1. `<header class="cover">` containing `.cover-masthead` (left: "INFOSYS CONSULTING · COURSE", right: "EDITION 2026.06 · BUILDER TRACK"), `.cover-title` ("Building <em>Agentic AI</em> Systems"), `.cover-subtitle` ("A course for engineers building agents that actually deploy."), `.cover-byline` (4 fields: Audience / Track / Modules / Distribution → values: "Builders & engineers" / "Technical, hands-on" / "5 modules · 20 primers" / "Public").
2. `<section class="thesis">` — exact copy of the course thesis from spec §2: pull quote ("Building an agent is easy. Building an agent function is hard.") + the supporting paragraph.
3. `<section class="how-to-read">` — eyebrow "HOW TO READ THIS COURSE" + ~80 words on the hybrid model (read in order, or treat as reference; each primer is cold-readable with a short callout; designated animation primers; estimated reading times).
4. **Five module blocks**, each: `<section class="chapter-slab">` (chapter number, title with italic emphasis on the noun phrase, one-line deck) + `<ol class="primer-list">` with one `<li class="primer-card">` per primer.

Module heading copy:
- I — `<em>Foundations</em>` · deck: "The substrate agents run on."
- II — `The <em>Agent</em>` · deck: "Loops, memory, planning, coordination."
- III — `<em>Production</em>` · deck: "Evals, traces, safety, cost — the demo-to-deploy gap."
- IV — `Applied in <em>Banking</em>` · deck: "Two concrete patterns leaning on existing IC primers."
- V — `Building an Agentic <em>Organisation</em>` · deck: "Operating model, platform, people, governance."

Primer cards: number (e.g. "01"), title, one-line argument from spec §4, estimated read time. Cards for primers being shipped in this slice link to their files (e.g. `01-llm-mental-model.html`). Cards for primers in later phases get `class="primer-card placeholder"` (no link, dimmed, " · soon" suffix). Reading times: estimate 5 minutes per 1000 words; assume ~3500 words per primer → "~18 min" baseline. Adjust for animations (+5 min).

5. `<footer class="colophon">` — left: "INFOSYS CONSULTING · BUILDING AGENTIC AI · EDITION 2026.06", right: link "← Back to collection" pointing to `../../index.html`.

- [ ] **Step 3: Verify the page renders correctly**

Start a local server and screenshot.

```bash
cd /Users/advtryn/Documents/GitHub/ic-portfolio/ic-collaterals && python3 -m http.server 8765 --directory docs &
```

Use the Playwright MCP `browser_navigate` to `http://localhost:8765/courses/agentic-ai/index.html`, then `browser_take_screenshot` (full page). Check:

- Cover is DEEP_BLUE, title is white, italic emphasis is LT_BLUE.
- Cover masthead and byline align correctly.
- Thesis pull quote has BLUE left rule.
- Each chapter slab is full-bleed DEEP_BLUE with LT_BLUE italic emphasis in the title.
- Primer cards align on number / title+arg / meta columns; placeholder cards are dimmed with "· soon" suffix.
- No console errors. No 404s on fonts.

Stop the server when done (`kill %1` or fg/Ctrl-C).

- [ ] **Step 4: Verify constraints**

Hard-check by inspecting the HTML/CSS:

- No `#000000` anywhere — only PAVEMENT (`var(--pavement)`) for "black" text.
- DEEP_BLUE used only in: cover, chapter slabs, colophon. Not in primer cards, not in eyebrows, not in body text.
- BLUE used for: accent bars, pull-quote rule, primer numbers, links, "soon" indicator can stay LT_BLUE if preferred.
- Fonts loaded from Google Fonts: Fraunces + IBM Plex Sans + JetBrains Mono.

- [ ] **Step 5: Commit**

```bash
git add docs/courses/agentic-ai/index.html
git commit -m "Add agentic AI course wrapper (syllabus)"
```

---

## Task 2 — Primer 1: LLM Mental Model for Builders

**Files:**
- Create: `docs/courses/agentic-ai/01-llm-mental-model.html`

**Argument of the primer:** What you need to know about how an LLM behaves *before* you wire it into a loop. Tokens, sampling, context windows, the cost/latency frontier — framed for someone about to call one in a loop, not for someone training one.

**Sections (each gets an `<h2 class="section-head">` and an entry in the sidebar TOC):**

| # | id | Title | Argument |
|---|---|---|---|
| 1 | s1 | The model as a sampler | An LLM is a conditional probability distribution over tokens. Every "answer" is one sampled trajectory through that distribution. |
| 2 | s2 | Tokens, not words | Tokenization is non-uniform — JSON, code, and rare languages cost more than prose. Practical token math. |
| 3 | s3 | The context window is a budget | Inputs + outputs + tool definitions + system prompt all draw from the same pool. Cache once, reuse many. |
| 4 | s4 | Sampling: temperature, top-p, schema | What each knob actually controls. When to constrain (structured output) and when to let it breathe. |
| 5 | s5 | The cost/latency frontier | Per-token cost × tokens × turns. Prompt caching as a multiplier. Streaming as a perceived-latency lever. |
| 6 | s6 | What models can and can't do | Strengths (language, structure, planning short horizons) vs failure modes (arithmetic, long-horizon consistency, knowledge cutoffs). |

**Sidebar nav (prev/next):**
- Prev: "← Course syllabus" → `index.html`
- Next: "Primer 5 — The Agent Loop →" → `05-agent-loop.html` *(skipping intermediate primers since they don't exist yet — note that this will be updated to point to 02 once Phase 2 ships)*

**Cold-start callout:** "If you haven't read [the course intro] — this is the first primer; no prerequisites. You should know what an HTTP API is and have called one before."

- [ ] **Step 1: Scaffold the primer file**

Create `docs/courses/agentic-ai/01-llm-mental-model.html` using the shared template from the "Shared primer template" section above. Fill in:

- `<title>`: "Primer 1 — LLM Mental Model for Builders · Building Agentic AI Systems · Infosys Consulting"
- Masthead right: "MODULE I · PRIMER 01 / 20"
- Title-band title: "LLM Mental Model for Builders"
- Title-band subtitle: "*What you need to know about how a model behaves before you wire it into a loop.*"
- Cold-start callout: as above.
- Sidebar TOC: 6 entries linking to `#s1`–`#s6`.
- Sidebar prev/next: as above.
- 6 `<section id="sN">` blocks, each with the section title from the table and a placeholder paragraph.
- Footer mono tag: "INFOSYS CONSULTING · BUILDING AGENTIC AI · MODULE I · PRIMER 01 / 20"

- [ ] **Step 2: Write Section 1 — "The model as a sampler"**

~400 words. Open with the framing: an LLM is a function from a token sequence to a probability distribution over the next token. "Generation" is just repeated sampling. Three concrete consequences for builders:

1. Same prompt, different answers (temperature > 0).
2. Self-consistency techniques (sample N times, vote) work because of this.
3. "Hallucinations" are not a bug — they're the model sampling from a low-probability region of its distribution. Mitigation is about narrowing the distribution (better prompts, structured output, RAG), not about debugging.

Include one **figure**:

```html
<div class="figure">
  <span class="figure-tag">FIG. 01</span>
  <!-- inline SVG: a token sequence (input) feeding into a probability bar chart for "next token" candidates -->
  <svg viewBox="0 0 600 200" role="img" aria-label="Diagram: input tokens map to a probability distribution over next tokens">
    <!-- ... draw 5 input token boxes feeding into 5 candidate next-token bars with descending heights ... -->
  </svg>
  <p class="figure-caption">A model is a function from a token sequence to a probability distribution over the next token. Generation is repeated sampling.</p>
</div>
```

Draw the SVG inline. Token boxes in BLUE outline on white, probability bars in BLUE filled. Axis labels in PAVEMENT mono.

- [ ] **Step 3: Write Section 2 — "Tokens, not words"**

~400 words. Cover: BPE in one paragraph (don't go deep); rule of thumb (~4 chars per token for English prose); JSON and code are 2–3× more expensive per "unit of meaning"; rare scripts (Hindi, Arabic, Chinese for older tokenizers) can be 3–5× worse.

Include a **stat callout**:

```html
<div class="stat">~4<small> chars/token</small></div>
<div class="stat-label">ENGLISH PROSE, GPT-CLASS TOKENIZER</div>
```

Include a **code block** showing a tiny `tiktoken` or `anthropic.count_tokens` example:

```html
<div class="code">
  <span class="code-tag">PYTHON</span>
  <pre>from anthropic import Anthropic
client = Anthropic()
client.messages.count_tokens(
    model="claude-sonnet-4-6",
    messages=[{"role": "user", "content": "Hello world"}],
)
# → InputTokens(input_tokens=10)</pre>
</div>
```

Note: use a current Claude model id per the project's `claude-api` skill convention. If unsure, check `tokens.js` is unrelated — the relevant reference is the system prompt's "most recent Claude model family" note.

- [ ] **Step 4: Write Section 3 — "The context window is a budget"**

~500 words. Cover the budget metaphor: window = inputs + system prompt + tool definitions + few-shot examples + assistant outputs (in multi-turn). Everything draws from the same pool. Prompt caching is the single biggest lever for cost when you reuse system prompts or tool defs across many calls.

Include a **note callout**:

```html
<div class="note">
  <span class="note-tag">TAG · CACHING</span>
  <p class="note-head"><em>Cache the parts that don't change.</em></p>
  <p>System prompts, tool definitions, retrieved docs that repeat across turns — all of these should be cache-marked. With Anthropic's prompt caching, cached tokens cost ~10% of normal at read time, with a 5-minute TTL. For agents that loop, this is a 5–10× cost reduction.</p>
</div>
```

- [ ] **Step 5: Write Section 4 — "Sampling: temperature, top-p, schema"**

~400 words. Cover:
- Temperature 0 ≠ deterministic (kernel-level ties still vary), but close.
- top-p / top-k as alternative truncation strategies.
- Structured output (JSON schema, tool-use forcing) as the strongest form of constraint — most reliable way to get parseable output.
- Decision: free text for prose, schema for anything you'll parse.

Include a small comparison table (HTML, not figure):

```html
<table class="cmp">
  <thead><tr><th>Setting</th><th>Use for</th><th>Failure mode</th></tr></thead>
  <tbody>
    <tr><td>Temp 0.0</td><td>Structured extraction, classification</td><td>Repetitive on long generations</td></tr>
    <tr><td>Temp 0.7</td><td>Drafting, summaries, prose</td><td>Occasional drift</td></tr>
    <tr><td>Forced schema</td><td>Anything you'll JSON-parse</td><td>Schema validation failures (retry)</td></tr>
  </tbody>
</table>
```

Add table CSS to the page block:

```css
.cmp { border-collapse: collapse; width: 100%; margin: 16px 0 24px; font-size: 14px; }
.cmp th, .cmp td { padding: 10px 12px; text-align: left; border-bottom: 1px solid var(--rule); }
.cmp thead th { border-bottom: 2px solid var(--blue); font-family: var(--mono); font-size: 11px; letter-spacing: 0.08em; color: var(--pavement); text-transform: uppercase; }
.cmp tbody tr:nth-child(even) { background: var(--tint-stone); }
```

- [ ] **Step 6: Write Section 5 — "The cost/latency frontier"**

~500 words. Cover the components of cost: per-token input/output rates × token count × number of turns. Worked example: a 10-turn agent loop with a 20K-token system+tools, 1K-token user msg, 500-token output per turn. Compute without and with caching. Show the math.

Include a **pull quote**:

```html
<blockquote class="pull">In agents, the system prompt is read once per turn but rarely changes. Cache it.</blockquote>
```

Include one more **stat callout**:

```html
<div class="stat">~10%<small> of normal</small></div>
<div class="stat-label">CACHED INPUT TOKEN COST (ANTHROPIC)</div>
```

- [ ] **Step 7: Write Section 6 — "What models can and can't do"**

~500 words. Two-column conceptual map (use a CSS grid):

```html
<div class="twocol">
  <div>
    <h3 class="col-head">Strong at</h3>
    <ul>
      <li>Language: paraphrase, summarize, translate, style transfer</li>
      <li>Structure: extract, classify, route, format</li>
      <li>Short-horizon planning and tool selection</li>
      <li>Generating code in well-represented languages</li>
    </ul>
  </div>
  <div>
    <h3 class="col-head">Weak at</h3>
    <ul>
      <li>Arithmetic past a few digits (use a tool)</li>
      <li>Long-horizon consistency across many turns</li>
      <li>Knowledge after the cutoff date</li>
      <li>Tasks requiring persistent state without memory</li>
    </ul>
  </div>
</div>
```

```css
.twocol { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin: 24px 0; }
.col-head { font-family: var(--display); font-style: italic; font-size: 20px; color: var(--blue); margin: 0 0 8px; }
@media (max-width: 700px) { .twocol { grid-template-columns: 1fr; } }
```

Close the section with a sentence that bridges to Primer 5 ("This is why agent loops work — they let a strong-at-short-horizons model accumulate work across many turns.")

- [ ] **Step 8: Verify the primer renders correctly**

Start a local server (or reuse from Task 1). Use Playwright MCP to navigate to `http://localhost:8765/courses/agentic-ai/01-llm-mental-model.html`. Take a full-page screenshot.

Check visually:
- Masthead present, DEEP_BLUE, white text.
- Title band: Fraunces 56px title, BLUE italic subtitle below.
- Cold-start callout: TINT_BLUE_BG, 2px BLUE left rule.
- Sidebar: sticky, eyebrow with BLUE bar, TOC with 6 entries.
- Section heads: Fraunces 36px, hairline RULE top border.
- All callouts use the correct styling.
- Footer: hairline rule + mono tag + syllabus link.

Test interactive behavior via Playwright MCP `browser_evaluate`:
- Scroll to s3; verify `.toc-link.active` is set on the s3 link.
- Verify `.progress::before { width: var(--p) }` is being updated (check the inline style on `.progress`).
- Click prev/next links and verify they navigate.

- [ ] **Step 9: Verify constraints**

Inspect the HTML for hard-rule compliance:
- No `#000000` literals. PAVEMENT `#404040` for body text.
- DEEP_BLUE used only in masthead and footer mono tag bg if any. No DEEP_BLUE on cards or callouts.
- All fonts loaded from Google Fonts link.
- All colors via CSS custom property (no inline hex except in token block).

- [ ] **Step 10: Commit**

```bash
git add docs/courses/agentic-ai/01-llm-mental-model.html
git commit -m "Add primer 1: LLM mental model for builders"
```

---

## Task 3 — Primer 5: The Agent Loop *(includes animation)*

**Files:**
- Create: `docs/courses/agentic-ai/05-agent-loop.html`

**Argument of the primer:** The canonical read→decide→act loop is the default scaffold to reach for. Understand its mechanics, its termination, its failure modes, and when to change it.

**Sections:**

| # | id | Title | Argument |
|---|---|---|---|
| 1 | s1 | What an agent loop is | A while-loop around an LLM call that can request tools. The model decides; the harness executes. |
| 2 | s2 | The canonical tick *(animated)* | Step through one tick: read state → model call → parse tool calls → execute → append → repeat. |
| 3 | s3 | Tool definitions and parsing | Schemas, validation, what the harness does when the model returns malformed calls. |
| 4 | s4 | Termination | When the loop ends. Max-iteration safeguards. Detecting stuck loops. |
| 5 | s5 | State and history | What you carry forward. Why you can't carry everything. Summarization. |
| 6 | s6 | Failure modes | Loops that won't terminate, model that won't use tools, tool errors the model can't recover from. |
| 7 | s7 | When to outgrow the canonical loop | Multi-agent, planner+executor, hierarchical — pointers to Primers 7 and 8. |

**Cold-start callout:** "If you haven't read Primer 1 — an LLM samples one token at a time from a probability distribution; tool use means the model emits a structured call that your code executes. That's everything you need."

**Sidebar nav:** Prev → "Primer 1 — LLM Mental Model" (`01-llm-mental-model.html`); Next → "Primer 10 — Evaluations for Agents" (`10-evaluations-for-agents.html`). *(Will be re-pointed at Primer 6 in Phase 3.)*

- [ ] **Step 1: Scaffold the primer**

Same shared template. Fill in metadata: `<title>` "Primer 5 — The Agent Loop ..."; masthead "MODULE II · PRIMER 05 / 20"; title "The Agent Loop"; subtitle "*A while-loop around an LLM, and what makes that simple idea harden into something real.*"; footer mono "MODULE II · PRIMER 05 / 20".

- [ ] **Step 2: Write Section 1 — "What an agent loop is"**

~400 words. Define: a loop that (a) presents the model with current state and available tools, (b) parses the model's response for tool calls, (c) executes the tools, (d) appends results to the message history, (e) repeats until the model emits a terminal response. The model is the decider; the harness is the executor.

Include a **figure** (static SVG, separate from the Section 2 animation): the loop as a cycle diagram. State → Model → Tool calls → Tools → New state → loop back. Use BLUE arrows on a white background, with a 1px RULE border around the whole figure. `FIG. 01`.

- [ ] **Step 3: Write Section 2 — "The canonical tick" — with animation**

This is the primer's marquee element. ~300 words of prose + a CSS-only animation that ticks through one full iteration of the loop, highlighting the active node and showing the data flowing.

Animation spec:
- 5-stage cycle, each stage ~1.5s, total loop ~7.5s, infinite repeat.
- Stages: (1) State block highlighted, label "READ", (2) Model node highlighted with three thought-bubble labels appearing, "DECIDE", (3) Tool-call object appears with a typewriter effect, "EMIT", (4) Tool node highlighted, label "EXECUTE", (5) Result appended to state block, label "APPEND".
- Implementation: SVG with CSS `@keyframes` animating opacity / fill / stroke on each node and `stroke-dashoffset` on the connecting arrows. Use `prefers-reduced-motion: reduce` to disable the animation and show the static end-of-cycle frame.
- Controls: a tiny "PAUSE / PLAY" button under the figure (mono tag styling), toggling a class on the SVG that sets `animation-play-state: paused`.

Markup template:

```html
<div class="figure animated-figure">
  <span class="figure-tag">FIG. 02 · ANIMATED</span>
  <svg viewBox="0 0 800 320" class="loop-anim" role="img" aria-label="Animated loop showing one full read-decide-act tick">
    <!-- nodes: state-block, model, tool-call, tool, result -->
    <!-- arrows connecting them in a cycle -->
    <!-- each node has a class that animates per its stage -->
  </svg>
  <button class="anim-toggle mono-tag" type="button" aria-pressed="false">PAUSE</button>
  <p class="figure-caption">One tick of the canonical loop. Each stage holds for ~1.5s before passing to the next.</p>
</div>

<style>
  @keyframes stage1 { 0%,15% { fill: var(--blue); } 16%,100% { fill: var(--rule); } }
  @keyframes stage2 { 0%,15% { fill: var(--rule); } 16%,35% { fill: var(--blue); } 36%,100% { fill: var(--rule); } }
  /* etc for stages 3, 4, 5 — each 20% of the timeline */
  .loop-anim .node-state { animation: stage1 7.5s infinite; }
  .loop-anim .node-model { animation: stage2 7.5s infinite; }
  /* etc */
  .loop-anim.paused * { animation-play-state: paused !important; }
  @media (prefers-reduced-motion: reduce) {
    .loop-anim * { animation: none; }
  }
  .anim-toggle { background: var(--white); border: 1px solid var(--rule); padding: 4px 10px; cursor: pointer; margin-top: 8px; }
</style>

<script>
  document.querySelectorAll('.anim-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const svg = btn.previousElementSibling.previousElementSibling ?? btn.parentElement.querySelector('svg');
      const paused = svg.classList.toggle('paused');
      btn.textContent = paused ? 'PLAY' : 'PAUSE';
      btn.setAttribute('aria-pressed', String(paused));
    });
  });
</script>
```

(Embed the script with the page's main inline JS, not as a separate `<script>` block. Wire all `.anim-toggle` buttons in one go.)

- [ ] **Step 4: Write Section 3 — "Tool definitions and parsing"**

~400 words. Show a Python snippet with the Anthropic SDK's tool-call shape:

```html
<div class="code">
  <span class="code-tag">PYTHON</span>
  <pre>from anthropic import Anthropic

tools = [{
    "name": "get_weather",
    "description": "Get current weather for a city.",
    "input_schema": {
        "type": "object",
        "properties": {"city": {"type": "string"}},
        "required": ["city"],
    },
}]

resp = Anthropic().messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "What's the weather in Bengaluru?"}],
)

for block in resp.content:
    if block.type == "tool_use":
        print(block.name, block.input)  # → get_weather {'city': 'Bengaluru'}</pre>
</div>
```

Cover schema validation (the model can return invalid types — the harness re-asks), and the harness's responsibility for actually *running* the tool (sandboxing, timeouts, retries).

- [ ] **Step 5: Write Section 4 — "Termination"**

~300 words. Three termination conditions: (1) model emits no tool calls (it's done), (2) max-iteration safeguard (10–25 typical), (3) explicit "finish" tool the model can call. Why max-iterations is non-negotiable: cost runaways and stuck loops.

Include a **note callout**:

```html
<div class="note">
  <span class="note-tag">TAG · SAFETY</span>
  <p class="note-head"><em>Always cap iterations.</em></p>
  <p>A loop without a cap is a loop that will sometimes spin forever — running up cost, holding open tool connections, and producing nothing. 20 iterations is a reasonable default for most tasks. If you legitimately need more, surface it as a config knob, not a removed cap.</p>
</div>
```

- [ ] **Step 6: Write Section 5 — "State and history"**

~400 words. The message history grows linearly per turn. Two pressures: context-window cost (every turn re-sends everything) and signal-to-noise (old tool results crowd out the current task). Strategies:
- Full history (fine for ≤5 turns)
- Sliding window (last N turns)
- Summarized prefix + recent window
- Tool-result compression (replace verbose API responses with structured summaries)

Reference Primer 6 for the full memory treatment.

- [ ] **Step 7: Write Section 6 — "Failure modes"**

~400 words. Three concrete failure modes with diagnostics:
1. Loop won't terminate — model keeps calling the same tool. Cause: tool returns ambiguous output, model retries. Fix: structure tool output, add explicit "you have what you need" signal.
2. Model won't use tools — text-only responses despite tools being available. Cause: weak prompting or tools that overlap with the model's prior knowledge. Fix: explicit instruction, `tool_choice: "any"`.
3. Cascade failures — one tool error throws the loop into a recovery spiral. Fix: tool harness returns errors *to the model* as structured messages, not exceptions.

- [ ] **Step 8: Write Section 7 — "When to outgrow the canonical loop"**

~300 words. Signs the canonical loop is the wrong shape: tasks that require parallel exploration (→ multi-agent, Primer 8), tasks with a clear plan-then-execute structure (→ Primer 7), tasks where one agent can't hold all the context (→ sub-agents, Primer 9). Close with a callout: don't outgrow the canonical loop until you've actually felt the pain.

- [ ] **Step 9: Verify the primer**

Server + Playwright MCP as in Task 2 step 8. Additionally:
- Animation runs and cycles through 5 stages.
- PAUSE button toggles to PLAY and back; SVG stops mid-cycle when paused.
- `prefers-reduced-motion: reduce` (set via DevTools or Playwright `emulateMedia`) disables the animation.

- [ ] **Step 10: Verify constraints (same checks as Task 2 step 9). Commit:**

```bash
git add docs/courses/agentic-ai/05-agent-loop.html
git commit -m "Add primer 5: the agent loop (with animated tick-through)"
```

---

## Task 4 — Primer 10: Evaluations for Agents

**Files:**
- Create: `docs/courses/agentic-ai/10-evaluations-for-agents.html`

**Argument of the primer:** Agents that ship are agents that have evals. Task suites, judge models, regression detection, eval-driven development. Builds on existing `agentic-harness-evals-traces.html`.

**Sections:**

| # | id | Title | Argument |
|---|---|---|---|
| 1 | s1 | Why agent evals are different | Unit tests don't transfer. A single trajectory isn't enough. You're evaluating a distribution. |
| 2 | s2 | The task suite | What a good suite looks like: representative, balanced, growing. Adding the bug as a test case. |
| 3 | s3 | Judges: rules, models, humans | When each fits. The judge-the-judge problem. |
| 4 | s4 | Scoring rubrics | Pass/fail vs graded. Calibration. Inter-judge agreement. |
| 5 | s5 | Eval-driven development | The TDD analog. Run on every change. Block merges on regressions. |
| 6 | s6 | Regression detection | Diff against a baseline. Statistical significance with small N. Flake handling. |
| 7 | s7 | What this connects to | Sub-skill: traces (Primer 11), safety evals (Primer 12). Pointer to existing engineering note. |

**Cold-start callout:** "If you haven't read Primer 5 — an agent loop is a while-loop that lets a model call tools. The model decides; your harness executes. Evals measure whether the *behavior* of that loop is what you want."

**Sidebar nav:** Prev → "Primer 5 — The Agent Loop"; Next → "Primer 15 — Agentic KYC & Surveillance" *(re-pointed at Primer 11 in Phase 4)*.

- [ ] **Step 1: Scaffold the primer** — same template.

Metadata: `<title>` "Primer 10 — Evaluations for Agents ..."; masthead "MODULE III · PRIMER 10 / 20"; title "Evaluations for Agents"; subtitle "*The TDD of agentic systems — measure the behavior, not the trajectory.*"

- [ ] **Step 2: Write Section 1 — "Why agent evals are different"**

~400 words. Unit tests check `function(input) == expected`. Agents are non-deterministic, multi-step, and tool-mediated. You're not checking one output — you're sampling from a distribution of possible trajectories and asking whether enough of them succeed.

Pull quote:

```html
<blockquote class="pull">Don't ask "did it answer correctly once." Ask "what fraction of the time does it answer correctly, and is that fraction stable?"</blockquote>
```

- [ ] **Step 3: Write Section 2 — "The task suite"**

~500 words. A good suite:
- **Representative** — sampled from real user queries, not synthesized.
- **Balanced** — covers easy, medium, hard; covers each tool path; covers refusals.
- **Growing** — every production bug becomes a test case ("the bug is now a fixture").

Code block showing a tiny pytest-style task definition:

```html
<div class="code">
  <span class="code-tag">PYTHON</span>
  <pre>EVAL_TASKS = [
    {
        "id": "kyc-001-clean-pep-match",
        "prompt": "Run KYC on customer ID 88312. PEP screening only.",
        "rubric": {
            "must_call_tool": "screen_pep",
            "must_attach_evidence": True,
            "max_iterations": 6,
        },
    },
    # ...
]</pre>
</div>
```

- [ ] **Step 4: Write Section 3 — "Judges: rules, models, humans"**

~500 words. Three judge classes:
- **Rule-based** — exact-match, schema validation, "did it call this tool". Cheap, deterministic, narrow.
- **Model-as-judge** — LLM scores the output against a rubric. Cheap-ish, broad, requires calibration.
- **Human** — gold standard, slow, expensive. Use sparingly to calibrate model judges.

The judge-the-judge problem: how do you know your model judge is right? Answer: hold out a small (50–100) human-labeled set, compute judge agreement with humans, accept the model judge only if agreement is high (κ > 0.7).

- [ ] **Step 5: Write Section 4 — "Scoring rubrics"**

~400 words. Pass/fail is simple and frustrating — it hides progress. Graded rubrics (0–4 scale on each of: correctness, completeness, citation, latency) reveal direction. Aggregate to a single score for the CI gate, but report the components on the dashboard.

Include a comparison table (use the `.cmp` style from Task 2 step 5).

- [ ] **Step 6: Write Section 5 — "Eval-driven development"**

~400 words. The TDD analog: write the eval first, run it (red), implement, run it (green). What makes this work for agents:
- Evals run on every PR (CI gate).
- A "shadow" eval set the team hasn't seen — guards against overfitting to known examples.
- Diff-style results: which tasks pass on main, fail on PR; which fail on main, pass on PR.

Note callout:

```html
<div class="note">
  <span class="note-tag">TAG · DISCIPLINE</span>
  <p class="note-head"><em>The shadow set is what keeps you honest.</em></p>
  <p>If every developer sees every eval task, the team will (consciously or not) overfit prompts to them. Hold out 20–30% of tasks as a shadow set that only runs in CI and only management sees pass rates for. Treat divergence between visible and shadow scores as a leading indicator of overfitting.</p>
</div>
```

- [ ] **Step 7: Write Section 6 — "Regression detection"**

~400 words. With small N (often 50–200 tasks), single-point pass-rate comparisons are noisy. Use:
- Confidence intervals on pass rate (Wilson interval).
- Per-task diff: which specific tasks regressed.
- Flake handling: rerun failures 2–3× before declaring a regression (small temperature > 0 means natural variance).

- [ ] **Step 8: Write Section 7 — "What this connects to"**

~250 words. Pointers:
- Traces (Primer 11) — when an eval fails, the trace is where you go to understand why.
- Safety evals (Primer 12) — red-team and adversarial evals are a separate suite.
- The existing engineering note [agentic-harness-evals-traces.html](../engineering-notes/agentic-harness-evals-traces.html) covers the runtime infrastructure.

Use a relative path `../engineering-notes/agentic-harness-evals-traces.html` for the cross-link.

- [ ] **Step 9: Verify + commit** (same pattern as Tasks 2 & 3 — render in browser, check constraints, commit).

```bash
git add docs/courses/agentic-ai/10-evaluations-for-agents.html
git commit -m "Add primer 10: evaluations for agents"
```

---

## Task 5 — Primer 15: Agentic KYC & Surveillance

**Files:**
- Create: `docs/courses/agentic-ai/15-agentic-kyc-surveillance.html`

**Argument of the primer:** Two banking-side applications where agentic AI provably moves the needle. Concrete pattern: case-pack assembly + evidence chain + human checkpoint. Audit trail is the load-bearing requirement.

**Sections:**

| # | id | Title | Argument |
|---|---|---|---|
| 1 | s1 | Why KYC and surveillance are the canonical first deployments | High volume, high cost, narrow scope, auditable outcome. |
| 2 | s2 | The case-pack pattern | Agent assembles a structured artifact (the case pack) that a human reviews. The agent is doing the *gather* work, not the *decide*. |
| 3 | s3 | Evidence chains | Every claim in the case pack must link to a source. The audit log is the deliverable. |
| 4 | s4 | The human checkpoint | Where humans sit, what they see, what they confirm or override. The seam. |
| 5 | s5 | Risk tiering | Not every case needs the same depth. Low-risk auto-route, mid-risk to a junior, high-risk to a specialist. |
| 6 | s6 | Failure modes specific to FS | False confidence, regulator-visible hallucinations, model drift across geographies. |
| 7 | s7 | What this connects to | Domain depth: existing primers. Engineering depth: harness/evals/traces. |

**Cold-start callout:** "If you haven't read Primers 5 and 10 — an agent loop calls tools and is evaluated against a task suite. Both are prerequisites here. The financial-crime context is covered in detail by the linked domain primers."

**Sidebar nav:** Prev → "Primer 10 — Evaluations"; Next → "Primer 17 — The Agentic Operating Model".

- [ ] **Step 1: Scaffold** — same template. Title "Agentic KYC & Surveillance". Subtitle "*Two banking applications where agents are doing the gather, and humans are doing the judge.*" Masthead/footer: "MODULE IV · PRIMER 15 / 20".

- [ ] **Step 2: Write Section 1 — "Why KYC and surveillance are the canonical first deployments"**

~400 words. KYC: high-volume (millions of customers), expensive per case (analyst hours), narrow output (KYC decision + memo), and regulator-auditable. Surveillance: same shape — millions of alerts, hours per investigation, narrow output (escalate or close + narrative). These properties make them ideal: enough volume to matter, narrow enough to scope, auditable enough to deploy safely.

Cross-link to existing primers:
- [CDD/KYC primer](../primers/cdd-kyc-primer.html)
- [Trade surveillance primer](../primers/trade-surveillance-primer.html)
- [Transaction monitoring primer](../primers/transaction-monitoring-primer.html)
- [Screening primer](../primers/screening-primer.html)

- [ ] **Step 3: Write Section 2 — "The case-pack pattern"**

~500 words. The case pack is a structured document the agent assembles: customer summary, screening results, risk factors, comparable cases, recommended decision. The agent is the **paralegal**, not the **judge**. The human reads the case pack and confirms or overrides.

Include a **figure** showing the case-pack structure (inline SVG): a stacked card with sections (Header, Screening, Risk Factors, Recommendation), each section showing which tool produced it. `FIG. 01`.

- [ ] **Step 4: Write Section 3 — "Evidence chains"**

~500 words. Every claim must be sourced. The agent's job is not just to produce the case pack but to maintain a parallel evidence log linking each claim to a tool call, a document, a query result. The audit log is the deliverable for the regulator. If the agent can't cite, it shouldn't claim.

Code block showing a structured evidence record:

```html
<div class="code">
  <span class="code-tag">JSON</span>
  <pre>{
  "claim": "Customer is not on OFAC SDN list as of 2026-06-07",
  "tool_call": {
    "tool": "screen_sanctions",
    "input": {"customer_id": "88312", "list": "OFAC_SDN"},
    "ts": "2026-06-07T14:32:19Z"
  },
  "result_ref": "evidence_store/sanctions/88312/2026-06-07/result.json",
  "confidence": "high"
}</pre>
</div>
```

- [ ] **Step 5: Write Section 4 — "The human checkpoint"**

~400 words. Where the human sits, what they see (the case pack + evidence log), what they do (confirm, override with reason, escalate, request more). The seam is a *control point*, not a rubber stamp.

Pull quote:

```html
<blockquote class="pull">The agent's job is to make the human's job easy. The human's job is to make the agent's job accountable.</blockquote>
```

- [ ] **Step 6: Write Section 5 — "Risk tiering"**

~400 words. Not every case is the same shape. Low-risk (clean screen, no PEP hits, established customer) → auto-route with periodic sampling. Mid-risk → standard human review. High-risk (PEP match, complex structure, jurisdiction concerns) → senior specialist.

Tiering is a policy, not a model output. The agent flags risk signals; the policy decides routing.

Comparison table for risk tiers with associated actions.

- [ ] **Step 7: Write Section 6 — "Failure modes specific to FS"**

~400 words. Three banking-specific failure modes:
1. **False confidence** — agent says "no concerns" with high confidence on a case it actually got wrong. Mitigation: confidence calibration + sampling.
2. **Regulator-visible hallucinations** — agent fabricates a citation. Mitigation: enforced evidence linking; no claim without a verifiable source.
3. **Geographic drift** — model trained on US data performs worse on EU/APAC cases. Mitigation: per-geography eval suites.

- [ ] **Step 8: Write Section 7 — "What this connects to"**

~250 words. Domain depth: link to the four financial-crime primers (full paths in step 2). Engineering depth: link to `../engineering-notes/agentic-harness-evals-traces.html`. Operating model: link forward to Primer 17.

- [ ] **Step 9: Verify + commit**

```bash
git add docs/courses/agentic-ai/15-agentic-kyc-surveillance.html
git commit -m "Add primer 15: agentic KYC and surveillance"
```

---

## Task 6 — Primer 17: The Agentic Operating Model *(includes animation)*

**Files:**
- Create: `docs/courses/agentic-ai/17-agentic-operating-model.html`

**Argument of the primer:** Building agents isn't the hard part. Reshaping the org to operate alongside them is. Humans-at-the-seam thesis, work redesign, the seam as a control point.

**Sections:**

| # | id | Title | Argument |
|---|---|---|---|
| 1 | s1 | The operating-model problem | You can ship agents into the old workflow, or you can rebuild the workflow around them. One scales; one doesn't. |
| 2 | s2 | Humans at the seam | The thesis: humans don't disappear, they concentrate at decision points where agents pass work to other agents or to systems of record. |
| 3 | s3 | Own / assist / escalate *(animated)* | Three modes an agent operates in. Animated diagram showing work flowing through each mode. |
| 4 | s4 | Work redesign | The unit of work changes. From "tasks" to "outcomes." Roles atomize and re-bundle. |
| 5 | s5 | Control points | Where the human seam goes: high-risk decisions, regulatory checkpoints, novel situations. |
| 6 | s6 | Measuring an agentic function | KPIs that matter: throughput, escalation rate, override rate, audit findings, agent ROI. |
| 7 | s7 | The change-management curve | Adoption stages, the dip, what actually moves teams through it. |

**Cold-start callout:** "If you haven't read Primer 15 — agents in banking compliance do the *gather* work and humans do the *judge* work, with a strict evidence chain. This primer generalizes that pattern across the org."

**Sidebar nav:** Prev → "Primer 15 — Agentic KYC & Surveillance"; Next → "Course syllabus" (back to `index.html`).

- [ ] **Step 1: Scaffold** — same template. Title: "The Agentic Operating Model". Subtitle: "*Humans don't disappear. They concentrate at the seams.*" Masthead/footer: "MODULE V · PRIMER 17 / 20".

- [ ] **Step 2: Write Section 1 — "The operating-model problem"**

~400 words. The pilot-plateau pattern (echo of the IC banking POV deck thesis but generalized): teams ship agents into existing workflows, the agent inherits the friction, value caps below 2×. Teams that break out redesign the work *around* what an agent can actually do.

Cross-link to the executive [agentic-ai-banking-primer.html](../primers/agentic-ai-banking-primer.html) for the client-facing version of this argument.

- [ ] **Step 3: Write Section 2 — "Humans at the seam"**

~500 words. The thesis. Pre-agent, work flowed through handoffs between humans. Post-agent, work flows through handoffs between agents — but at certain points it must pass through a human seam: a regulatory checkpoint, a novel-situation review, a high-risk approval. The humans don't disappear; they concentrate at the seams. Their job changes from doing the work to authorizing it.

Pull quote:

```html
<blockquote class="pull">The future of work is not fewer humans. It's humans at the seams between agents.</blockquote>
```

- [ ] **Step 4: Write Section 3 — "Own / assist / escalate" — with animation**

~400 words + animated diagram.

The three modes:
- **Own** — agent executes end-to-end, no human in the path. Used for: well-bounded, high-volume, low-risk work.
- **Assist** — agent prepares the work; human reviews + decides. Used for: moderate-risk, high-stakes decisions.
- **Escalate** — agent flags but doesn't act; routes to human or specialist agent. Used for: novel, high-risk, or low-confidence cases.

**Animation** — `FIG. 03 · ANIMATED`. SVG showing three work streams (rows) flowing left-to-right. Each row labeled with one mode. Tokens (small circles) flow along each stream:
- Own row: tokens flow straight through, BLUE, fast.
- Assist row: tokens pause at a human-icon seam mid-stream, change color to LT_BLUE briefly, then continue.
- Escalate row: tokens hit a seam and *branch* — most fall away (closed cases), one continues to a specialist icon.

CSS keyframe animation, ~6-second loop, with `animation-play-state` toggle button (reuse the `.anim-toggle` pattern from Task 3).

Implementation note: Use `transform: translateX()` keyframes on `<circle>` elements with staggered `animation-delay`. Keep the SVG to ~600x320.

- [ ] **Step 5: Write Section 4 — "Work redesign"**

~500 words. The unit-of-work shift: from tasks (do this thing) to outcomes (achieve this state). Roles atomize (separating "the analyst who gathers" from "the analyst who decides") and re-bundle (the new senior role oversees a portfolio of agent-driven workstreams).

What shrinks: hand-aggregation, routine routing, narrative drafting, status reporting. What grows: judgment, exception handling, evals + QA, change management.

- [ ] **Step 6: Write Section 5 — "Control points"**

~400 words. Where the seam goes is a policy decision, not a technical one. Default seam locations:
- Regulatory checkpoints (KYC sign-off, suitability review)
- Customer-impacting decisions (credit, denial of service)
- Material-amount transactions
- Novel situations (low model confidence, no prior example)

Anti-patterns: seams everywhere (defeats the purpose), seams nowhere (regulator finding waiting to happen).

- [ ] **Step 7: Write Section 6 — "Measuring an agentic function"**

~500 words. KPIs:
- **Throughput** — cases handled per unit time. Should go up.
- **Cost-per-case** — should go down, but not at the expense of audit findings.
- **Escalation rate** — too high means the agent's scope is wrong; too low (with rising audit findings) means humans aren't catching what they should.
- **Override rate** — humans changing the agent's recommendation. Track per-mode; a rising override rate is a leading indicator of model drift.
- **Audit findings** — quarterly review. The lagging indicator that matters most.
- **Agent ROI** — cost saved minus platform cost minus risk capital. Be honest about the denominator.

- [ ] **Step 8: Write Section 7 — "The change-management curve"**

~400 words. Adoption stages: enthusiasm (pilots), skepticism (after the first failure), pragmatism (with evals), institutionalization. The dip is real and predictable. What moves teams through:
- Clear seam ownership (who is accountable for the human-side checks).
- Visible metrics dashboards.
- Training on the new role, not just the new tool.
- Career paths for the people whose old roles atomized.

Closing pull quote:

```html
<blockquote class="pull">You don't deploy agents. You deploy an agentic function — and a function has people in it.</blockquote>
```

- [ ] **Step 9: Verify the primer**

Same as Tasks 2 & 3, plus verify the second animation:
- Three streams animate with staggered tokens.
- Own stream is straight-through.
- Assist stream pauses at the seam icon.
- Escalate stream branches at the seam.
- PAUSE/PLAY button works.
- `prefers-reduced-motion` disables animation.

- [ ] **Step 10: Verify constraints + commit**

```bash
git add docs/courses/agentic-ai/17-agentic-operating-model.html
git commit -m "Add primer 17: the agentic operating model (with animated seam diagram)"
```

---

## Task 7 — Landing page update + final cross-link pass

**Files:**
- Modify: `docs/index.html`
- Modify: `docs/courses/agentic-ai/index.html` (verify all card links resolve)

The slice is now 6 files. Surface it on the landing page and verify all cross-links.

- [ ] **Step 1: Read the current landing page**

Use Read on `docs/index.html` to understand the existing card pattern (recent commit "Redesign landing page: collection-first, declutter" suggests it has a specific structure).

- [ ] **Step 2: Add a "Courses" section card**

Following the existing card pattern, add a new section (or extend an existing section grouping) for Courses. The card links to `docs/courses/agentic-ai/index.html`. Card content:

- Eyebrow: "COURSE · IC TECHNICAL"
- Title: "Building Agentic AI Systems"
- Description: ~25 words: "A 20-primer course for engineers building agents that deploy. Foundations, agent internals, production concerns, banking applications, and operating model. Vertical slice live."
- Footnote: "5 of 20 primers + syllabus available"

Match the existing card's spacing, typography, and color use.

- [ ] **Step 3: Verify all cross-links resolve**

Start the server. Use Playwright MCP to navigate to each page and check:

- `docs/index.html` → "Courses" card link → `docs/courses/agentic-ai/index.html` ✓
- `docs/courses/agentic-ai/index.html` → each "live" primer card → its `.html` file ✓
- Each primer's sidebar prev/next → resolves to a real file (or back to syllabus)
- Each primer's cross-links (existing engineering notes, existing primers) → resolve to real files
- Each primer's footer "← Course syllabus" → `index.html`

Use `browser_console_messages` after each navigation to catch 404s.

- [ ] **Step 4: Do a constraint sweep across all 6 new files**

For each new file, grep for hard-rule violations:

```bash
grep -E '#000000|#000\b' docs/courses/agentic-ai/*.html
# expected: no matches

grep -c '#182534' docs/courses/agentic-ai/*.html
# expected: each file has DEEP_BLUE only in token block + masthead/title-band/colophon (3–5 occurrences max)
```

Spot-check a primer at full size in the browser: section heads, callouts, code blocks all render in correct colors; no fillerless gaps.

- [ ] **Step 5: Final screenshots for the record**

Take a full-page screenshot of each of the 6 new pages using Playwright MCP. Save under `src/courses/agentic-ai/slice-screenshots/` (dev artifact, not published). These are the "this is what shipped" record.

```bash
mkdir -p src/courses/agentic-ai/slice-screenshots
# screenshots saved by Playwright with filenames like wrapper.png, primer-01.png, ...
```

- [ ] **Step 6: Commit landing page + close out the slice**

```bash
git add docs/index.html src/courses/agentic-ai/slice-screenshots/
git commit -m "Surface agentic AI course on landing page; slice screenshots"
```

- [ ] **Step 7: Slice retrospective**

Append a short retrospective section to `src/courses/agentic-ai/spec.md` (or write a separate `slice-retro.md` under `src/courses/agentic-ai/`) capturing:
- What worked in the template (keep for Phase 2+).
- What didn't (revise before Phase 2).
- Per-primer authoring time (informs Phase 2+ estimates).
- Any new tokens, components, or patterns introduced (mirror into `tokens.js` or `design-reference.html` if persistent).

Commit:

```bash
git add src/courses/agentic-ai/
git commit -m "Slice retrospective for agentic AI course"
```

---

## Definition of done

- All 6 deliverables (1 wrapper + 5 primers) live under `docs/courses/agentic-ai/`.
- Each primer renders without console errors, scroll-spy works, reading-progress bar updates.
- Both designated animations (Primers 5 and 17) animate, can be paused, respect `prefers-reduced-motion`.
- Landing page surfaces the course.
- All cross-links resolve (no 404s).
- Hard-rule check passes: no `#000000`, DEEP_BLUE confined to designated components, BLUE drives all accents.
- Slice retrospective captured in `src/courses/agentic-ai/`.
- 7 commits on `main` (one per task).

---

## Out of scope (Phase 1)

The following are intentionally NOT in this plan. They are in scope for later phases:

- Primers 2, 3, 4 (Module I — Phase 2)
- Primers 6, 7, 8, 9 (Module II — Phase 3)
- Primers 11, 12, 13, 14 (Module III — Phase 4)
- Primer 16 (Module IV — Phase 5)
- Primers 18, 19, 20 (Module V — Phase 6)
- A consolidated shared CSS file (each primer remains self-contained per the established repo pattern)
- A search box on the syllabus (sidebar TOC + landing page card is sufficient for 5–20 primers)
- Print stylesheets (primers are web-only; one-pagers are the print-friendly format in this repo)
