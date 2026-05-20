/**
 * @file scripts/quality/check-route-test-mapping.mjs
 * @description Verifies that every active App route has explicit direct test coverage mapping.
 * @module scripts/quality/check-route-test-mapping
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { ROUTE_TEST_MAPPING } from "./route-test-mapping.config.mjs";

const ROOT = process.cwd();
const APP_FILE = "src/App.jsx";
const APP_ROUTE_PATTERN = /<Route\s+path="([^"]+)"/g;
const TEST_KINDS = ["vitest", "playwright"];

const absPath = (relativePath) => path.join(ROOT, relativePath);
const readText = (relativePath) => fs.readFileSync(absPath(relativePath), "utf8");

const normalizeRoute = (routePath) => routePath.trim();

const extractActiveRoutes = () => {
  const source = readText(APP_FILE);
  const routes = new Set();

  let match;
  while ((match = APP_ROUTE_PATTERN.exec(source)) !== null) {
    const routePath = normalizeRoute(match[1] || "");
    if (!routePath.startsWith("/")) {
      continue;
    }
    routes.add(routePath);
  }

  return [...routes].sort((left, right) => left.localeCompare(right));
};

const normalizeMappingEntry = (entry) => {
  if (typeof entry === "string") {
    return { file: entry, mustInclude: [] };
  }

  return {
    file: entry?.file || "",
    mustInclude: Array.isArray(entry?.mustInclude) ? entry.mustInclude : [],
  };
};

const sourceCache = new Map();

const getSource = (relativePath) => {
  if (!sourceCache.has(relativePath)) {
    sourceCache.set(relativePath, readText(relativePath));
  }
  return sourceCache.get(relativePath);
};

const addRouteCoverageErrors = (errors, routePath, mapping) => {
  for (const testKind of TEST_KINDS) {
    const entries = mapping[testKind];

    if (!Array.isArray(entries) || entries.length === 0) {
      errors.push(`${routePath}: missing ${testKind} direct test mapping.`);
      continue;
    }

    for (const rawEntry of entries) {
      const entry = normalizeMappingEntry(rawEntry);
      if (!entry.file) {
        errors.push(`${routePath}: ${testKind} mapping contains an empty file path.`);
        continue;
      }

      const entryPath = absPath(entry.file);
      if (!fs.existsSync(entryPath)) {
        errors.push(`${routePath}: mapped ${testKind} file does not exist: ${entry.file}`);
        continue;
      }

      if (!entry.mustInclude.length) {
        continue;
      }

      const source = getSource(entry.file);
      for (const expectedSnippet of entry.mustInclude) {
        if (!source.includes(expectedSnippet)) {
          errors.push(
            `${routePath}: mapped ${testKind} file ${entry.file} is missing required snippet: ${expectedSnippet}`
          );
        }
      }
    }
  }
};

const main = () => {
  const activeRoutes = extractActiveRoutes();
  const mappedRoutes = Object.keys(ROUTE_TEST_MAPPING).sort((left, right) =>
    left.localeCompare(right)
  );

  const missingMappings = activeRoutes.filter((routePath) => !ROUTE_TEST_MAPPING[routePath]);
  const staleMappings = mappedRoutes.filter((routePath) => !activeRoutes.includes(routePath));

  const errors = [];

  if (missingMappings.length > 0) {
    errors.push(`Routes missing explicit test mapping: ${missingMappings.join(", ")}`);
  }
  if (staleMappings.length > 0) {
    errors.push(`Mapped routes no longer present in ${APP_FILE}: ${staleMappings.join(", ")}`);
  }

  for (const routePath of activeRoutes) {
    const mapping = ROUTE_TEST_MAPPING[routePath];
    if (!mapping) {
      continue;
    }
    addRouteCoverageErrors(errors, routePath, mapping);
  }

  if (errors.length > 0) {
    console.error("Route-to-test mapping check failed:");
    for (const error of errors) {
      console.error(` - ${error}`);
    }
    process.exit(1);
  }

  const totalMappedTests = mappedRoutes.reduce((count, routePath) => {
    const mapping = ROUTE_TEST_MAPPING[routePath];
    if (!mapping) return count;
    const vitestCount = Array.isArray(mapping.vitest) ? mapping.vitest.length : 0;
    const playwrightCount = Array.isArray(mapping.playwright) ? mapping.playwright.length : 0;
    return count + vitestCount + playwrightCount;
  }, 0);

  console.log(
    `Route-to-test mapping check passed: ${activeRoutes.length} route(s), ${totalMappedTests} mapped direct test reference(s).`
  );
};

main();
