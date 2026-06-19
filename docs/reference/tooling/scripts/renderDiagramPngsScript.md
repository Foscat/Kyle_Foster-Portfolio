# renderDiagramPngsScript

- Source: `scripts/diagrams/render-diagram-pngs.js`

# renderDiagramPngsScript

## OUTPUT\_DIR

Output directory for rendered PNG assets. This directory is expected to be committed or published alongside generated documentation. /

## VIEWPORT

Fixed viewport ensures: - Consistent diagram scaling - Predictable text wrapping - Stable screenshot output across environments /

## render()

Renders all Mermaid diagram blocks to PNG images.

Execution flow:
1. Ensure output directory exists
2. Launch headless Chromium
3. Load Mermaid in an isolated HTML shell
4. Inject diagram source one at a time
5. Screenshot rendered output
6. Close browser

This function is intentionally sequential to:
- Avoid race conditions in Mermaid rendering
- Prevent memory pressure from concurrent pages

**Throws**

- `Error` - If Playwright fails to launch or rendering fails.
