/**
 * Mermaid Diagram PNG Generator
 * ============================================================================
 * Renders Mermaid diagrams to PNG using Playwright (headless Chromium).
 *
 * Output:
 *   docs/assets/diagrams/{diagram-id}.png
 */

import fs from "fs";
import path from "path";
import mermaid from "mermaid";
import { chromium } from "playwright";
import diagrams from "../src/assets/data/diagrams.js";

/* -------------------------------------------------------------------------- */
/* Config                                                                     */
/* -------------------------------------------------------------------------- */

const OUTPUT_DIR = "docs/diagrams";
const VIEWPORT = { width: 1600, height: 1200 };

/* -------------------------------------------------------------------------- */

async function render() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: VIEWPORT });

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

  for (const block of diagrams) {
    const { id, diagram } = block;
    if (!diagram) continue;

    console.log(`🖼️  Rendering ${id}.png`);

    await page.evaluate((diagramSource) => {
      const el = document.getElementById("diagram");
      el.innerHTML = diagramSource;
      mermaid.contentLoaded();
    }, diagram);

    const diagramEl = await page.$("#diagram");
    if (!diagramEl) continue;

    await diagramEl.screenshot({
      path: path.join(OUTPUT_DIR, `${id}.png`),
      omitBackground: true,
    });
  }

  await browser.close();
}

render().catch((err) => {
  console.error("❌ Diagram PNG generation failed");
  console.error(err);
  process.exit(1);
});
