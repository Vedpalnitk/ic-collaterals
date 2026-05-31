# Agentic AI in Banking — POV Deck (Spec)

**Status:** Design approved, ready to build
**Date:** 2026-05-30
**Owner:** Infosys Consulting
**Format:** PowerPoint (.pptx), 23 slides, 16:9 (1280×720)

---

## 1. Scope

| Decision | Choice |
|---|---|
| **Topic** | Agentic AI in Financial Services |
| **Sub-vertical** | Banking (retail + commercial; light coverage of payments) |
| **Primary use** | Sales enablement / internal asset for IC partners & pursuit teams |
| **Length** | 23 slides (22 narrative + 1 sources appendix) |
| **Audience read** | IC partners briefing CXO buyers at named banks |
| **Format** | Editable PowerPoint (`.pptx`) |

## 2. Thesis (the spine)

> **Banks have been adding agents to processes. The next decade is about redesigning processes around agents.**
>
> Pilots plateau because the agent inherits the friction of the workflow it joined: the handoffs, the data silos, the compliance choke-points, the human approvals built for a slower world. The teams who break out aren't the ones with better models — they're the ones who redrew the process around what an agent can actually do, and rebuilt the operating model (control, risk, talent) to match.

Every slide either sets this up, states it, proves it, paths to it, or sells around it.

## 3. Narrative arc — six acts

| Act | Slides | Purpose |
|---|---|---|
| 1 · Setup | 1–4 | Title; exec summary; what changed in 18 months; the pilot-plateau trap. |
| 2 · Reframe | 5–7 | The thesis; what "agent-native" means; the bank, redrawn. |
| 3 · Proof | 8–11 | Three redesigned process patterns + synthesis. |
| 4 · Maturity & path | 12–15 | Maturity model; where banks are; 0–24-month value path; five no-regret moves. |
| 5 · How IC helps | 16–20 | Capability map; stack view; qualifying questions; objection handling; case-study cards. |
| 6 · Close | 21–23 | Bottom line; next steps + contact; sources appendix. |

## 4. Slide-by-slide outline

Each title below is the *argument of the slide*, not its topic.

### Act 1 — Setup

1. **Title.** "Agents that change the work, not just the worker." Subtitle: *A point of view on agentic AI in banking.* IC mark, date, *Sales enablement — Internal use* footnote.
2. **Executive summary.** Three-bullet TL;DR: the trap, the reframe, the path. No chart.
3. **Why now: three things changed in the last 18 months.** Three columns — capability (frontier-model reliability + cost), tooling (orchestration, evals, observability), banking maturity (pilot footprint, infra spend). One stat per column.
4. **The trap: 40+ pilots, value concentrating in 2-3.** Long-tail bar of pilot count vs. realized value per use case. The headline is the gap.

### Act 2 — Reframe

5. **The thesis** (hero quote slide). BLUE accent rule under the line + one supporting paragraph.
6. **What "agent-native" means.** 2×3 grid of six pillars: control plane, agent roles, human-in-the-loop, observability, governance, talent. One line each.
7. **The bank, redrawn.** Simplified front/middle/back-office map with agent-native redesign points highlighted (heat-map style).

### Act 3 — Proof

8. **Pattern 1 · Onboarding & KYC.** Before/after. Today: ~14 systems, 11 handoffs, 9-day TAT. Redesigned: orchestrated agent flow with risk-tiered human checkpoint. Three redesign principles called out.
9. **Pattern 2 · Credit underwriting & decisioning.** Before/after. Today: analyst-memo cycle, ratio-sheet review, multi-week. Redesigned: research agent + decision-support agent + reviewer at the seam.
10. **Pattern 3 · Dispute handling & servicing.** Before/after. Today: 25-day cycle, customer re-tells story. Redesigned: single agent-driven journey, ledger-first.
11. **What these three patterns share.** Five recurring redesign principles (e.g., *events not handoffs*, *verify don't trust*, *humans at the seam not the start*, *ledger-first not screen-first*, *one agent, many tools*).

### Act 4 — Maturity & path

12. **The agentic maturity model.** 4 stages: Pilots → Patterned use cases → Agent-native processes → Agent-native bank. Stage labels + one-line characterizations.
13. **Where most banks are vs. where leaders are.** Population-distribution visual across the four stages. The gap is the message.
14. **The path to value.** 0–3 / 3–12 / 12–24 months in three columns — the work, the artifacts, the value milestones.
15. **Five no-regret moves to start now.** Numbered list. Each line: the move + one-sentence why-now.

### Act 5 — How IC helps

16. **IC capability map.** Strategy / Design / Build / Run columns; one-line offer per cell. **\[PLACEHOLDER]** — needs IC official wording.
17. **Where IC plays in the agentic stack.** Layered diagram (foundation models → tooling → agent design → integration → ops → governance → change). IC's plays highlighted. **\[PLACEHOLDER]** — needs IC positioning.
18. **Qualifying questions for client conversations.** 8–10 sharp questions, grouped: ambition / current state / risk appetite / operating-model readiness.
19. **Common objections & how to answer them.** Five-row table — objection / underlying concern / IC response.
20. **Illustrative case studies.** Three card slides (situation / what changed / measured outcome). **\[PLACEHOLDER]** — needs real IC engagements; illustrative versions to be replaced.

### Act 6 — Close

21. **The bottom line.** Single-sentence thesis restated + three takeaways.
22. **Next steps & contact.** Suggested workshop format, follow-up assets, contact block. **\[PLACEHOLDER]** — contact details.
23. **Sources & references.** Appendix slide listing every data point with its source.

## 5. Visual treatment

Per [CLAUDE.md](../../CLAUDE.md) and [tokens.js](../../tokens.js):

- Canvas 1280×720 (16:9). Safe-area margin 48 px.
- **Title band** 64 px tall, DEEP_BLUE `#182534` fill, WHITE Arial 24 pt title text. One band per slide — this is the only place DEEP_BLUE appears.
- **No full-bleed section-divider slides** in this deck. The act structure lives in the spec; in the deck itself the narrative flows continuously to keep the partner's pitch tight. This is a deliberate use of DEEP_BLUE "very sparingly."
- **Body** Arial 14 pt PAVEMENT on WHITE.
- **Section heads** within slide: Arial 18 pt semibold, BLUE.
- **One BLUE accent per slide** — hero figure, callout, key phrase. LT_BLUE for secondary accents.
- **Tables** use RULE `#E2E4E7` grid, TINT_STONE_BG zebra rows, optional BLUE bottom border on header row.
- **Charts** primary series BLUE, secondary LT_BLUE, tertiary SLATE; gridlines RULE; axis labels SLATE. No DEEP_BLUE in charts.
- **Status colors** for maturity stages, risk indicators, dispute-state pills.
- **\[PLACEHOLDER]** blocks are rendered as TINT_BLUE_BG callouts with a BLUE left rule and the text `[PLACEHOLDER — what to fill in]` so the IC partner can spot them at a glance.

No DEEP_BLUE fills outside title bands and dividers. No pure black anywhere. No burnt orange.

## 6. Content policy

- **Data points:** real, public figures cited inline by short tag (e.g., *McKinsey 2024*, *Gartner 2024*, *JPM 10-K*). The full citation list lives on the appendix sources slide (23).
- **IC-specific content:** marked as **\[PLACEHOLDER]** on slides 16, 17, 20, 22. The IC team fills these before client use.
- **Examples / case studies:** all illustrative on slide 20, clearly tagged as such. To be replaced with redacted real engagements.
- **Tone:** consulting-house style. Slide titles are full-sentence arguments. Body copy is terse and declarative. No marketing adjectives.

## 7. File layout

```
ic-collaterals/
├── CLAUDE.md
├── tokens.js
├── design-reference.html
└── decks/
    └── agentic-ai-banking-pov/
        ├── spec.md            ← this file
        └── agentic-ai-banking-pov.pptx   ← to be built next
```

## 8. Build approach

Use the `pptx` skill (python-pptx under the hood). Drive all colors and font choices from `tokens.js` — no raw hex literals in the build script except where pulled from the tokens module. Build in a single pass, then open the file to visually verify the title band, accent placement, and Arial rendering before declaring done.
