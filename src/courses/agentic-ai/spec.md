# Building Agentic AI Systems — Course (Spec)

**Status:** Design approved, ready to build
**Date:** 2026-06-07
**Owner:** Infosys Consulting
**Format:** HTML course (wrapper page + 20 standalone primers), TECHNICAL family
**Output location:** `docs/courses/agentic-ai/`

---

## 1. Scope

| Decision | Choice |
|---|---|
| **Topic** | Agentic AI — fundamentals through production through org transformation |
| **Audience** | Hands-on builders & engineers (staff engineers, agent-platform leads, tech-side change agents) |
| **Breadth** | Wide: agents + supporting stack (LLM basics, RAG, evals, safety, fine-tuning, cost) plus banking applications and org operating model |
| **Length** | 20 primers across 5 modules + 1 course wrapper page |
| **Per-primer length** | ~30–60 min reading; sidebar+content layout; code blocks; animations on 5 designated primers |
| **Family** | TECHNICAL (Fraunces display + IBM Plex Sans body + JetBrains Mono utility) |
| **Structure** | Hybrid — each primer standalone (cold-readable with "if you haven't read X, here's the gist" callout); course wrapper sequences them and the sidebar has prev/next |

## 2. Thesis (course spine)

> **Building an agent is easy. Building an agent function is hard.**
>
> Most teams can wire an LLM to a tool loop and demo something compelling. Few make it past evals, traces, cost, safety, and the operating-model work to actually deploy. This course is the path from prompt to platform — the patterns, the failure modes, and the org changes that separate a notebook from a function the bank runs on.

Each module advances the thesis: foundations get you to a working call; the agent module gets you to a working loop; production gets you to a deployable system; applied banking gets you to value; org gets you to scale.

## 3. Narrative arc — five modules

| Module | Primers | Purpose |
|---|---|---|
| I · Foundations | 1–4 | The substrate agents run on: model behavior, prompting, tools, retrieval. |
| II · The Agent | 5–9 | Loops, memory, planning, coordination, sub-agents. |
| III · Production | 10–14 | Evals, traces, safety, cost, adaptation — the demo-to-deploy gap. |
| IV · Applied Banking | 15–16 | Two concrete patterns (KYC/surveillance, code modernization) leaning on existing IC banking primers. |
| V · Agentic Organisation | 17–20 | Operating model, platform team, workforce, governance — the IC consulting tier. |

## 4. Primer-by-primer outline

Each title below is the *argument of the primer*, not its topic.

### Module I — Foundations

1. **LLM Mental Model for Builders.** Tokens, sampling, context windows, latency/cost frontier. What models can and can't do, framed for someone about to call one in a loop.
2. **Prompting & Context Engineering.** System prompts, roles, few-shot, structure. Context as a budget; the diff between prompting an answer and prompting a behavior.
3. **Tool Use & Structured Output.** Function calling mechanics, JSON Schemas, validation, retries. When to force a tool vs free text; common failure modes.
4. **Retrieval-Augmented Generation.** Embeddings, hybrid search, chunking, reranking. RAG vs long-context vs fine-tune decision tree. *Animated: chunk-overlap explorer.*

### Module II — The Agent

5. **The Agent Loop.** ReAct, the canonical read→decide→act cycle, termination, error recovery. The default loop you should reach for, and what to change when you outgrow it. *Animated: loop tick-through with state.*
6. **Memory & State.** Short-term context vs long-term stores; summarization, compaction, sliding windows; episodic vs semantic memory; when memory is the wrong abstraction.
7. **Planning & Task Decomposition.** Plan-then-execute vs incremental; task graphs; hierarchical agents; recovering from a bad plan.
8. **Multi-Agent Patterns.** Orchestrator/workers, debate, hand-off, swarms. When multi-agent is the wrong answer (most of the time). Communication cost, failure modes.
9. **Sub-Agents, Skills & Harnesses.** Code-level building blocks: tool registries, skill packages, sub-agent dispatch, harness loops. Builds on existing [claude-agent-sdk-ic.html](../../../docs/engineering-notes/claude-agent-sdk-ic.html) — extends with cross-SDK patterns.

### Module III — Production

10. **Evaluations for Agents.** Task suites, judge models, scoring rubrics, regression detection, eval-driven development. Extends existing [agentic-harness-evals-traces.html](../../../docs/engineering-notes/agentic-harness-evals-traces.html).
11. **Observability & Traces.** Span model, what to capture, debugging multi-turn runs, replay, anomaly detection. *Animated: trace viewer with drill-down.*
12. **Safety, Guardrails & Prompt Injection.** Input/output filters, tool authorization, refusal patterns, the lethal trifecta (data + tools + adversary), red-team playbook.
13. **Cost, Latency & Caching.** Prompt caching, batch API, model routing, streaming, token math worked examples, cost regressions.
14. **Fine-Tuning & Adaptation.** SFT, DPO, distillation, LoRA. When *not* to fine-tune — prompting, RAG, and tools usually win. Cost/benefit framework.

### Module IV — Applied Banking

15. **Agentic KYC & Surveillance.** Case packs, evidence chains, audit trails, the human-checkpoint pattern. Builds on existing [cdd-kyc-primer.html](../../../docs/primers/cdd-kyc-primer.html) and [trade-surveillance-primer.html](../../../docs/primers/trade-surveillance-primer.html).
16. **Code-Modernization Agents.** COBOL/SAS → Java/Python with verification, test generation, the human-at-the-seam pattern. Working example with traces.

### Module V — Agentic Organisation

17. **The Agentic Operating Model.** Humans-at-the-seam thesis; work redesign; where agents *own* vs *assist* vs *escalate*; the seam as a control point. *Animated: org-flow diagram with seam highlights.*
18. **Agent Platforms & Internal Tooling.** Central platform team responsibilities: model gateway, shared harnesses, eval infra, prompt registry, deployment gates. Build-vs-buy decisions.
19. **Workforce, Roles & Skills Transition.** New roles (agent engineer, eval engineer, agent ops, prompt librarian); upskilling paths; what shrinks; change-management patterns.
20. **Governance, Risk & Adoption.** AI/agent policy stack; risk tiering; model cards; audit trails; KPIs for agent ROI; the deploy-and-measure loop.

## 5. Course wrapper page

`docs/courses/agentic-ai/index.html` — the syllabus.

- **Cover band** — title, subtitle, edition metadata in cover-masthead style.
- **Course thesis** — section 2 above, as a hero pull quote.
- **Five module cards** — DEEP_BLUE chapter slab for each, expanded list of primers underneath. Each primer entry: title, one-line argument, estimated reading time, link.
- **How to read this course** — short note on the hybrid model: read in order, or treat as a reference; each primer is cold-readable.
- **Cross-links** — to the executive-tier [agentic-ai-banking-primer.html](../../../docs/primers/agentic-ai-banking-primer.html) (different audience: client-tier POV) and to the two engineering notes already in `docs/engineering-notes/` that Modules 9 + 10 extend.

## 6. Per-primer template

Every primer is the same shape so a reader's eye learns it once.

| Element | Content |
|---|---|
| **Masthead** | Course mark · Module N · Primer N. Cover-masthead pattern. |
| **Title band** | Title in Fraunces with one-line italic BLUE subtitle. |
| **Cold-start callout** | TINT_BLUE_BG note: "If you haven't read [previous primer], here's the gist: …" Three sentences max. Skippable. |
| **Sidebar TOC** | Sticky left, 280px. Sections auto-highlight on scroll. Prev/next primer at the bottom. |
| **Body** | Sectioned with DEEP_BLUE bands. Fraunces section heads. Plex Sans prose. JetBrains Mono code blocks with `LANG` tag. |
| **Hero diagram** | One headline figure per primer, BLUE-led, RULE-bordered, FIG. NN tag. |
| **Code blocks** | TINT_STONE_BG fill, 3px BLUE left rule, mono. Python by default; SDK choice noted per primer. |
| **Stat callouts** | Where a number is the point. Fraunces 40–84pt in BLUE. |
| **Pull quotes** | Fraunces italic, BLUE left rule. Used sparingly — one per primer. |
| **Footer** | Hairline RULE rule + mono "INFOSYS CONSULTING · BUILDING AGENTIC AI · MODULE N · PRIMER N / 20". |

Animations (HTML + CSS, no framework) on 4 designated primers: 4 (chunk-overlap), 5 (loop tick-through), 11 (trace viewer), 17 (org-flow). One animation per — not gratuitous.

## 7. Integration with existing artifacts

- **Existing executive primer** `docs/primers/agentic-ai-banking-primer.html` stays as the client-tier POV. Cross-linked from course wrapper and Module IV. Not duplicated.
- **Existing engineering notes** `claude-agent-sdk-ic.html` and `agentic-harness-evals-traces.html` are referenced from Modules 9 + 10 respectively. New course primers in those modules *extend* (cross-SDK patterns, eval-driven dev framework) rather than replace.
- **Existing financial-crime primers** (screening, TM, surveillance, CDD/KYC) are domain prerequisites for Module IV. Linked, not duplicated.
- **Landing page** `docs/index.html` gets a new section card for the course (sits alongside primers / engineering notes / decks).

## 8. Build order — vertical slice first

The "vertical slice" approach: build one primer per module + the course wrapper before filling in the rest. Validates the template, the cross-linking, and the wrapper UX at low cost.

| Phase | Primers | Purpose |
|---|---|---|
| **Slice** | Course wrapper, Primer 1 (Foundations), Primer 5 (Loop), Primer 10 (Evals), Primer 15 (KYC), Primer 17 (Operating Model) | Validate template, wrapper, hybrid structure, animation pattern (Primers 5 + 17). |
| **Fill Module I** | Primers 2, 3, 4 | Module I complete. |
| **Fill Module II** | Primers 6, 7, 8, 9 | Module II complete. |
| **Fill Module III** | Primers 11, 12, 13, 14 | Module III complete. |
| **Fill Module IV** | Primer 16 | Module IV complete. |
| **Fill Module V** | Primers 18, 19, 20 | Module V complete. Course done. |

Each phase ends with a landing-page update and a commit.

## 9. Hard constraints (from CLAUDE.md)

- No pure black (use PAVEMENT). DEEP_BLUE only in title bands + chapter slabs + cover masthead/colophon — never on headers, cards, charts, badges.
- BLUE is the working accent. LT_BLUE for secondary accents.
- TECHNICAL family throughout. Code blocks JetBrains Mono.
- All colors driven by token names from `tokens.js`.
- Each primer is HTML written directly under `docs/courses/agentic-ai/` — no build step.
- Add to `docs/index.html` after each phase.

## 10. Out of scope (for this course)

- Voice/multi-modal agents — possible future module, not v1.
- Specific vendor comparisons (OpenAI vs Anthropic vs Google) — patterns are vendor-neutral; vendor-specific code uses Claude SDK by default (consistent with existing engineering notes).
- Computer-use / browser agents — possible future primer, not v1.
- Reinforcement-learning agents from scratch — adjacent field; out of scope.
- Non-banking applications (healthcare, manufacturing, etc.) — banking-focused track only.
