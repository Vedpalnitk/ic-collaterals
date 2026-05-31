# IC Collaterals

A working library of Infosys Consulting branded collaterals — decks, primers,
one-pagers, and engineering notes — all built from a shared design system.

**Live site:** [vedpalnitk.github.io/ic-collaterals](https://vedpalnitk.github.io/ic-collaterals/)

---

## What's in here

| Type | What it is | Where |
|---|---|---|
| **Deck** | Agentic AI in Banking — 25-slide POV deck (PPTX + PDF) | [`decks/agentic-ai-banking-pov/`](decks/agentic-ai-banking-pov/) |
| **Primer** | Long-form HTML companion to the deck | [`primers/agentic-ai-banking-primer.html`](primers/agentic-ai-banking-primer.html) |
| **One-pager** | Single A4 sheet — printable exec summary | [`one-pagers/agentic-ai-banking-one-pager.html`](one-pagers/agentic-ai-banking-one-pager.html) |
| **Engineering note** | Agentic harness, evals & traces — self-learning guide with interactive animations | [`engineering-notes/agentic-harness-evals-traces.html`](engineering-notes/agentic-harness-evals-traces.html) |
| **Engineering note** | The Claude Agent SDK — annotated explainer | [`engineering-notes/claude-agent-sdk-ic.html`](engineering-notes/claude-agent-sdk-ic.html) |

The [landing page](index.html) wires them all together.

---

## The design system

Every artifact is built from a shared set of tokens (palette, three font
families, named visual components, two layout patterns).

- **[`tokens.js`](tokens.js)** — machine-readable source of truth (colors,
  fonts, layout scale).
- **[`design-reference.html`](design-reference.html)** — visual style guide.
  Shows the palette, all three font families, named components (chapter slab,
  eyebrow, pull quote, the seam, etc.), layout patterns, and the lessons
  learned from earlier artifacts. Has a light/dark toggle.
- **[`CLAUDE.md`](CLAUDE.md)** — the rule book. Auto-loaded into every Claude
  Code session in this folder. Documents the hard rules (no burnt orange, no
  pure black, DEEP_BLUE only in title bands and section separators) plus the
  named visual vocabulary, layout patterns, and per-format production guidance.

### Three font families

Pick by artifact type, not by personal preference:

| Family | Fonts | Use for |
|---|---|---|
| **System** | Arial, Consolas | Editable PPTX, DOCX — anything shared as a working document. Universally installed, renders identically everywhere. |
| **Editorial** | Fraunces + Newsreader + JetBrains Mono | POVs, decks, primers, one-pagers — where the artifact IS the deliverable. |
| **Technical** | Fraunces + IBM Plex Sans + JetBrains Mono | Engineering notes, self-learning guides, anything with code blocks. |

All non-system fonts are open-source (OFL).

---

## Folder structure

```
ic-collaterals/
├── index.html                 # The landing page
├── README.md                  # This file
├── CLAUDE.md                  # Rule book (auto-loaded in Claude Code)
├── tokens.js                  # Canonical tokens
├── design-reference.html      # Visual style guide
│
├── decks/
│   └── agentic-ai-banking-pov/
│       ├── agentic-ai-banking-pov.pptx
│       ├── agentic-ai-banking-pov.pdf
│       ├── spec.md            # Design spec for the deck
│       └── build.py           # python-pptx build script
│
├── primers/
│   └── agentic-ai-banking-primer.html
│
├── one-pagers/
│   └── agentic-ai-banking-one-pager.html
│
└── engineering-notes/
    ├── agentic-harness-evals-traces.html
    └── claude-agent-sdk-ic.html
```

---

## Working with the project

### Viewing the HTML artifacts

Open any `.html` file in a browser. All HTML artifacts are self-contained
(fonts loaded from Google Fonts; no build step required to view).

### Rebuilding the deck

The PPTX is generated from `build.py` via [python-pptx](https://python-pptx.readthedocs.io/).

```bash
python3 -m venv .venv
.venv/bin/pip install python-pptx
.venv/bin/python decks/agentic-ai-banking-pov/build.py
```

The build script reads tokens from a mirrored copy at the top of the file
(kept in sync with `tokens.js`). Fonts must be installed locally for accurate
PDF rendering (Fraunces, Newsreader, JetBrains Mono — all on Google Fonts).

### Adding a new collateral

Read `CLAUDE.md` first. It documents:

- Which font family to use (System / Editorial / Technical) for which artifact type
- The named visual components (chapter slab, eyebrow, pull quote, etc.) to reuse
- The layout patterns (single-column reading vs. sidebar + content)
- The hard rules and the lessons learned

Then check `design-reference.html` for live specimens of every component.

---

## Status

Spring 2026 · Working library · 6 artifacts.

The design system is current — three font families documented, named visual
vocabulary stabilized, layout patterns established. Each new artifact stress-tests
the system; gaps get folded back into the rule book.

---

## License

Internal use within Infosys Consulting. Content references public figures
(JPMorgan, Bank of America, Citi, Goldman, BCG, McKinsey, etc.) only via
publicly available disclosures and research. IC-specific blocks in each
artifact are marked `[PLACEHOLDER]` and intended to be replaced before
external use.
