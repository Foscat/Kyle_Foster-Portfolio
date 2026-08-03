# Mermaid Product-Story Enrichment Design

## Objective

Make every portfolio Mermaid diagram earn its place by communicating meaningful product behavior, system boundaries, decisions, feedback, or outcomes. Preserve portfolio-level readability instead of turning the diagrams into exhaustive infrastructure maps.

## Scope

Review and refine all 24 rendered diagrams in the six route registries:

- Home
- Hackathon
- CodeStream
- SMU
- Sanderson Technology Enterprises
- Side Projects

Both desktop and mobile variants are in scope. Diagram descriptions must remain consistent with the relationships shown in the visual.

## Content Standard

Each diagram should target approximately 7–12 meaningful nodes and communicate at least two of the following:

- Actor or ownership boundaries
- A decision with alternate outcomes
- A feedback, retry, or reconciliation path
- A transformation between stages
- A concrete product, user, or operational outcome

Complexity must come from truthful relationships already supported by the surrounding case-study content. Decorative nodes, invented capabilities, and repeated labels do not count as useful detail.

## Type-Aware Enrichment

### Journeys and workflows

Add entry actors, grouped stages, meaningful decisions, alternate outcomes, and a clear completion or follow-up state.

### Architecture and data flow

Show inputs, ownership boundaries, orchestration or transformation, persistence or external dependencies, and the user-facing result.

### State models and control loops

Show triggers, state evaluation, actions, validation, exceptional outcomes, and the reason the process returns to the next cycle.

### Sequence diagrams

Use Mermaid `alt`, `else`, and `opt` blocks where they clarify success, expiration, retry, or failure behavior.

## Responsive Design

Desktop diagrams should use left-to-right flow and labeled subgraphs when spatial grouping improves comprehension. Mobile diagrams should use top-to-bottom flow, shorter labels, and the same essential decisions and outcomes. Mobile variants may compress supporting nodes but must not remove the relationship that gives the diagram its value.

## Validation

- Keep every diagram compatible with the repository Mermaid formatter and linter.
- Preserve stable diagram IDs and route coverage.
- Regenerate derived diagram assets after source changes.
- Render every diagram on desktop and mobile viewports.
- Run diagram coverage, theme, snapshot, and route-level browser tests.
- Run formatting, linting, content tests, and the production build.

## Success Criteria

- No portfolio diagram is only a single uninterrupted line or a context-free loop.
- Each visual answers a distinct product or architecture question.
- Desktop and mobile variants remain legible without mid-word wrapping or excessive density.
- Surrounding descriptions accurately explain the enriched relationships.
- All diagram and application quality gates pass.
