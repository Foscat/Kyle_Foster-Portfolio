# Mermaid Product-Story Enrichment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enrich all 24 portfolio Mermaid diagrams with moderate, truthful product-story detail while preserving readable desktop and mobile rendering.

**Architecture:** Keep diagram content in the six existing route registries. Add one source-level quality contract that inventories all registries and rejects underspecified flowcharts or sequence diagrams, then use the existing formatter, linter, asset builder, and Playwright suites for syntax and rendered verification.

**Tech Stack:** JavaScript, React content registries, Mermaid, Vitest, Playwright, Prettier, ESLint

## Global Constraints

- Target approximately 7–12 meaningful nodes per diagram.
- Every diagram must communicate at least two of: ownership boundaries, decisions, feedback, transformations, or outcomes.
- Do not invent capabilities unsupported by the surrounding case-study content.
- Desktop variants use spatial grouping where useful; mobile variants retain essential logic with shorter labels.
- Preserve all existing diagram IDs and route assignments.
- Work in the current dirty branch without committing or overwriting unrelated changes.

---

## File Responsibilities

- `src/assets/data/content/home/diagrams.js`: Personal process and CodeStream platform overview.
- `src/assets/data/content/hackathon/diagrams.js`: Hands-free repair system and per-command lifecycle.
- `src/assets/data/content/codestream/diagrams.js`: Editor, licensing, classroom, and curriculum product behavior.
- `src/assets/data/content/smu/diagrams.js`: GIF, Stock Memer, and compatibility-engine project architecture.
- `src/assets/data/content/sanderson-technology-enterprises/diagrams.js`: Public site, creator platform, Scrapyard, and shared interface system.
- `src/assets/data/content/side-projects/diagrams.js`: Library contracts, MERN template, greenhouse controller, and narrative domain model.
- `src/components/__tests__/diagram-content-quality.test.js`: Source-level inventory and moderate-detail regression contract.
- `docs/diagrams.json`: Generated diagram asset manifest; regenerate rather than hand-edit.

### Task 1: Add the source-level content-quality contract

**Files:**
- Create: `src/components/__tests__/diagram-content-quality.test.js`

**Interfaces:**
- Consumes: `diagramValues` from all six route registries.
- Produces: a 24-diagram inventory assertion plus per-variant flowchart/sequence richness assertions.

- [ ] Import all six registries and flatten them into route-tagged diagram entries.
- [ ] Add helpers that extract `diagram`, `desktop.diagram`, and `mobile.diagram`, remove Mermaid initialization blocks, count declared nodes/participants, and detect subgraphs, decisions, labeled branches, feedback edges, and sequence control blocks.
- [ ] Assert 24 unique IDs, at least seven declared nodes for every flowchart, at least four participants for every sequence diagram, and at least two meaningful structural signals per source.
- [ ] Run `npx.cmd vitest run src/components/__tests__/diagram-content-quality.test.js` and confirm the current single-line and simple-loop diagrams fail.

### Task 2: Enrich Home, Hackathon, and SMU diagrams

**Files:**
- Modify: `src/assets/data/content/home/diagrams.js`
- Modify: `src/assets/data/content/hackathon/diagrams.js`
- Modify: `src/assets/data/content/smu/diagrams.js`

**Diagram changes:**

- [ ] Engineering Process: group discovery, delivery, and learning; add feasibility alignment, release readiness, and observed feedback branches.
- [ ] Platform Architecture: add lesson content, code runtime, project persistence, grading/reporting, and license gating around the three primary platform surfaces.
- [ ] Hands-Free Repair Flow: add repair context lookup, confidence decision, clarification path, step confirmation, and completion/next-step outcomes.
- [ ] Voice Command Lifecycle: add low-confidence clarification and resolved-step confirmation using `alt`/`else` on desktop and equivalent decisions on mobile.
- [ ] GIF Freak: add query validation, loading/error outcomes, response normalization, empty-result handling, and render-state feedback.
- [ ] Stock Memer: add user inputs, market response normalization, saved meme retrieval, and failure/empty-state paths without inventing new services.
- [ ] Compatibility Engine: add survey validation, missing-data path, scoring threshold decision, ranked matches, explanation output, and review/refinement feedback.
- [ ] Update each affected description to explain the new decision or feedback path.
- [ ] Run the content-quality test and the three registry content tests.

### Task 3: Enrich CodeStream diagrams

**Files:**
- Modify: `src/assets/data/content/codestream/diagrams.js`

**Diagram changes:**

- [ ] Delivery Architecture: add edit/run decision, runtime diagnostics, save confirmation, retrieval, and teacher feedback loop.
- [ ] Organization and License Model: add role resolution, license-state decision, renewal path, classroom permissions, and preserved personal ownership.
- [ ] Classroom to Project Flow: add enrollment/permission decision, template availability, project initialization, submission, grade feedback, and revision loop.
- [ ] Curriculum Composition Model: add draft/publish state, validation, reusable resources, classroom assignment, learner project creation, and revision propagation boundaries.
- [ ] Keep desktop subgraphs and mirror essential branches in mobile variants.
- [ ] Update descriptions and run the content-quality plus CodeStream route tests.

### Task 4: Enrich Sanderson Technology Enterprises diagrams

**Files:**
- Modify: `src/assets/data/content/sanderson-technology-enterprises/diagrams.js`

**Diagram changes:**

- [ ] Public Site Client Journey: add prospect entry channels, service-fit decision, proof paths, contact validation, discovery qualification, and follow-up outcomes.
- [ ] Content Creator Platform: add creator configuration, public discovery, membership decision, protected-content delivery, engagement capture, and insight-driven content refinement.
- [ ] Scrapyard Commerce Loop: implement the approved intake, readiness, catalog, availability, fulfillment, notification, and reconciliation pattern rendered through Mermaid Chart.
- [ ] STE Interface System: add semantic contract, package ownership, token/configuration inputs, consumer integration, accessibility/responsive verification, lab proof, and release feedback.
- [ ] Update descriptions and run STE content, route, and diagram-render tests.

### Task 5: Enrich Side Projects diagrams

**Files:**
- Modify: `src/assets/data/content/side-projects/diagrams.js`

**Diagram changes:**

- [ ] Shared Interface Contract: add consumer markup, package contracts, composition checks, isolated-package adoption, integrated workbench validation, and release feedback.
- [ ] Interaction State Model: add input modality, enabled decision, focus/hover/pressed transitions, selected persistence, disabled exit, and reduced-motion/accessibility constraints.
- [ ] Token Resolution Flow: add consumer override entry, ordered fallback decision, validation, resolved base/state tokens, contrast verification, and safe-default recovery.
- [ ] UI Style Kit Token Flow: add theme/mode inputs, semantic resolution, component consumption, contrast decision, fallback adjustment, and published paint output.
- [ ] UI Bundle Layout Flow: expand mobile to retain layout primitives, container response, paint, states, accessibility check, and responsive output feedback.
- [ ] Authentication Lifecycle: add invalid credentials, refresh rejection, session termination, and successful queued-request retry paths.
- [ ] Single-Service Deployment Shape: add build output, static serving, API/auth routing, environment configuration, database/error paths, health checks, and browser response.
- [ ] Greenhouse Mental Model: add sensor validation, threshold/deadband decision, safe fallback, relay verification, and logged next-cycle feedback.
- [ ] Narrative Domain Architecture: add aggregate invariants, encounter resolution, state updates, progression gating, and campaign persistence.
- [ ] Update descriptions and run Side Projects content and route tests.

### Task 6: Regenerate and verify every diagram

**Files:**
- Regenerate: `docs/diagrams.json`

- [ ] Run `npm.cmd run diagrams:check` and repair any formatter or structural-lint failure.
- [ ] Run `npm.cmd run diagrams:assets` to regenerate derived diagram metadata.
- [ ] Run `npx.cmd vitest run src/components/__tests__/diagram-content-quality.test.js src/components/__tests__/diagrams.spec.test.js`.
- [ ] Run `npx.cmd playwright test playwright/diagrams.spec.ts playwright/diagram-coverage.spec.ts playwright/diagrams.theme.spec.ts playwright/diagram-snapshots.spec.ts` against the active local server.
- [ ] Run route-level Playwright specs for Home, Hackathon, CodeStream, SMU, STE, and Side Projects on desktop and mobile coverage already defined by the repository.
- [ ] Render representative enriched diagrams through Mermaid Chart to confirm the product-story density remains legible.
- [ ] Run `npm.cmd run lint`, `npm.cmd run lint:playwright`, `npm.cmd run prettier:check`, and `npm.cmd run build`.
- [ ] Run `git diff --check` and audit that all 24 stable IDs remain present and every diagram meets the approved success criteria.
