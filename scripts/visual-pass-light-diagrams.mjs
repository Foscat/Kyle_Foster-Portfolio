import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "@playwright/test";
import { DIAGRAM_ENTRIES } from "../playwright/fixtures/diagrams.js";

const baseURL = process.env.VISUAL_PASS_BASE_URL || "http://127.0.0.1:4173";
const outDir = join(process.cwd(), "playwright", "visual-pass-light");

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1600, height: 1400 },
  deviceScaleFactor: 1,
});

const routes = [...new Set(DIAGRAM_ENTRIES.map((entry) => entry.route))];

for (const route of routes) {
  await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    localStorage.setItem("portfolio-theme", "light");
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  });
  await page.reload({ waitUntil: "networkidle" });
  await page.evaluate(() => {
    localStorage.setItem("portfolio-theme", "light");
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  });
  await page.waitForTimeout(1000);

  for (const entry of DIAGRAM_ENTRIES.filter((item) => item.route === route)) {
    const diagram = page.locator(`#${entry.id}`);
    await diagram.waitFor({ state: "visible", timeout: 20000 });
    await diagram.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await diagram.locator(".mermaid-svg-host svg").waitFor({ state: "visible", timeout: 20000 });

    const filePath = join(outDir, `${entry.id}.png`);
    await diagram.screenshot({ path: filePath });
    console.log(filePath);
  }
}

await browser.close();
