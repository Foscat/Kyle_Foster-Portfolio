/**
 * @file render-diagram-pngs.js
 * @description
 * Headless renderer that converts Mermaid diagram sources into PNG assets.
 *
 * This script uses Playwright (Chromium) to:
 * - Load Mermaid in a real browser environment
 * - Render diagrams exactly as Mermaid would in production
 * - Capture transparent PNG screenshots for documentation use
 *
 * Output:
 *   docs/diagrams/{diagram-id}.png
 *
 * Pipeline position:
 *   normalize → format → lint → render → build assets
 *
 * IMPORTANT:
 * - This script has filesystem side effects
 * - It requires a working Playwright/Chromium installation
 * - Failures here should block docs generation
 */

import fs from "fs";
import path from "path";
import mermaid from "mermaid";
import { chromium } from "playwright";
import diagrams from "../src/assets/data/diagrams.js";

/* -------------------------------------------------------------------------- */
/* Config                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Output directory for rendered PNG assets.
 *
 * This directory is expected to be committed or published
 * alongside generated documentation.
 */
const OUTPUT_DIR = "docs/diagrams";

/**
 * Fixed viewport ensures:
 * - Consistent diagram scaling
 * - Predictable text wrapping
 * - Stable screenshot output across environments
 */
const VIEWPORT = { width: 1600, height: 1200 };

/**
 * Renders all Mermaid diagram blocks to PNG images.
 *
 * Execution flow:
 * 1. Ensure output directory exists
 * 2. Launch headless Chromium
 * 3. Load Mermaid in an isolated HTML shell
 * 4. Inject diagram source one at a time
 * 5. Screenshot rendered output
 * 6. Close browser
 *
 * This function is intentionally sequential to:
 * - Avoid race conditions in Mermaid rendering
 * - Prevent memory pressure from concurrent pages
 *
 * @throws {Error}
 *   If Playwright fails to launch or rendering fails.
 */

async function render() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: VIEWPORT });

  /**
   * Inject a minimal HTML shell containing Mermaid.
   *
   * We use a real browser environment because:
   * - Mermaid relies on DOM APIs
   * - SVG rendering differs across JS-only environments
   * - Screenshot accuracy matters for documentation
   *
   * CDN usage is intentional here to mirror production
   * Mermaid behavior as closely as possible.
   */
  await page.setContent(`
    <html>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
        <style>
          body {
            margin: 0;
            background: transparent;
          }
          .mermaid {
            padding: 32px;
          }
        </style>
      </head>
      <body>
        <div id="diagram" class="mermaid"></div>
        <script>
          mermaid.initialize({
            startOnLoad: false,
            theme: "base",
            securityLevel: "loose"
          });
        </script>
      </body>
    </html>
  `);

  /**
   * Render each diagram independently.
   *
   * Each iteration:
   * - Replaces the diagram container contents
   * - Triggers Mermaid rendering
   * - Captures a screenshot
   *
   * Diagrams without a `diagram` field are skipped
   * defensively to support mixed block collections.
   */
  for (const block of diagrams) {
    const { id, diagram } = block;
    if (!diagram) continue;

    console.log(`🖼️  Rendering ${id}.png`);

    /**
     * Inject diagram source into the DOM and trigger Mermaid rendering.
     *
     * `mermaid.contentLoaded()` is required to force Mermaid
     * to process dynamically-inserted diagrams.
     *
     * This mirrors how Mermaid behaves on real page load.
     */
    await page.evaluate((diagramSource) => {
      const el = document.getElementById("diagram");
      el.innerHTML = diagramSource;
      mermaid.contentLoaded();
    }, diagram);

    const diagramEl = await page.$("#diagram");
    if (!diagramEl) continue;

    /**
     * Capture the rendered diagram as a PNG.
     *
     * - Background is omitted for transparency
     * - Output filename is derived from diagram ID
     *
     * Transparent PNGs allow diagrams to be embedded
     * cleanly in both light and dark documentation themes.
     */

    await diagramEl.screenshot({
      path: path.join(OUTPUT_DIR, `${id}.png`),
      omitBackground: true,
    });
  }

  await browser.close();
}

/**
 * Fail fast on rendering errors.
 *
 * Rendering failures indicate:
 * - Invalid Mermaid source
 * - Playwright/Chromium issues
 * - Environment misconfiguration
 *
 * This script is intended to fail CI rather than
 * silently produce missing or broken assets.
 */
render().catch((err) => {
  console.error("❌ Diagram PNG generation failed");
  console.error(err);
  process.exit(1);
});
