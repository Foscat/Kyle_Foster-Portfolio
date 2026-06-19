/**
 * @file scripts/docs/generate-react-jsdoc-reference.node-test.mjs
 * @description Tests React JSDoc reference generator source discovery.
 * @module scripts/docs/generate-react-jsdoc-reference.node-test
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  collectSourceFiles,
  generateReactJSDocReference,
  resolveSectionSourcePaths,
} from "./generate-react-jsdoc-reference.mjs";

test("collectSourceFiles keeps production source files and skips generated or test paths", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-docs-"));
  const sourceRoot = path.join(root, "src", "components");
  const files = [
    path.join(sourceRoot, "ProjectCard.jsx"),
    path.join(sourceRoot, "__tests__", "ProjectCard.test.jsx"),
    path.join(sourceRoot, "ProjectCard.spec.jsx"),
    path.join(sourceRoot, "ProjectCard.d.ts"),
    path.join(root, "docs", "generated.js"),
  ];

  for (const file of files) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, "/** @module sample */\n", "utf8");
  }

  const collected = collectSourceFiles([sourceRoot, path.join(root, "docs")]).map((file) =>
    path.relative(root, file).replaceAll("\\", "/")
  );

  assert.deepEqual(collected, ["src/components/ProjectCard.jsx"]);
  fs.rmSync(root, { recursive: true, force: true });
});

test("resolveSectionSourcePaths accepts file and directory section entries", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-doc-paths-"));
  const directoryPath = path.join(root, "src", "assets", "hooks");
  const filePath = path.join(root, "src", "assets", "utils.js");

  fs.mkdirSync(directoryPath, { recursive: true });
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, "/** @module utils */\n", "utf8");

  const resolved = resolveSectionSourcePaths(root, {
    sourceDirs: ["src/assets/hooks", "src/assets/utils.js", "missing"],
  }).map((file) => path.relative(root, file).replaceAll("\\", "/"));

  assert.deepEqual(resolved, ["src/assets/hooks", "src/assets/utils.js"]);
  fs.rmSync(root, { recursive: true, force: true });
});

test("generateReactJSDocReference writes fallback docs for files JSDoc ignores", async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "portfolio-doc-empty-input-"));
  const scriptPath = path.join(root, "scripts", "utility.mjs");

  fs.mkdirSync(path.dirname(scriptPath), { recursive: true });
  fs.writeFileSync(scriptPath, "export const utility = true;\n", "utf8");

  const summaries = await generateReactJSDocReference({
    root,
    skipIndex: true,
    sections: [
      {
        key: "scripts",
        title: "Scripts",
        sourceDirs: ["scripts"],
        aggregateFile: "docs/scripts.md",
        referenceDir: "docs/reference/tooling/scripts",
        docSuffix: "Script",
        group: "tooling",
      },
    ],
  });

  const generatedDoc = fs.readFileSync(
    path.join(root, "docs", "reference", "tooling", "scripts", "utilityScript.md"),
    "utf8"
  );

  assert.deepEqual(summaries, [{ key: "scripts", title: "Scripts", count: 1, group: "tooling" }]);
  assert.match(generatedDoc, /No public JSDoc entries were found\./u);
  fs.rmSync(root, { recursive: true, force: true });
});
