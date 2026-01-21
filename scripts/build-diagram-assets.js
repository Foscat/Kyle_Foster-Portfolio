import fs from "fs";
import path from "path";
import diagrams from "../src/assets/data/diagrams.js";
import { normalizeDiagrams } from "./normalize-diagrams.js";

const OUTPUT = path.resolve("docs/diagrams.json");

function run() {
  const normalized = normalizeDiagrams(diagrams);

  const output = normalized.map(
    ({ ...rest }) => rest // strip runtime-only fields
  );

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2));

  console.log(`📦 Diagram assets written → ${OUTPUT}`);
}

run();
