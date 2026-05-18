/**
 * @file scripts/quality/check-bundle-budgets.mjs
 * @description Enforces aggregate and per-asset JS/CSS/image budgets for dist assets.
 * @module scripts/quality/check-bundle-budgets
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const DIST_ASSETS_DIR = path.join(ROOT, "dist", "assets");

const EXTENSION_TO_BUCKET = Object.freeze({
  ".js": "js",
  ".mjs": "js",
  ".css": "css",
  ".png": "image",
  ".jpg": "image",
  ".jpeg": "image",
  ".gif": "image",
  ".svg": "image",
  ".webp": "image",
  ".avif": "image",
});

const BUDGET_STAGES_KB = Object.freeze({
  1: Object.freeze({
    total: Object.freeze({
      js: 6000,
      css: 620,
      image: 8000,
    }),
    maxAsset: Object.freeze({
      js: 650,
      css: 220,
      image: 620,
    }),
  }),
  2: Object.freeze({
    total: Object.freeze({
      js: 5600,
      css: 560,
      image: 7400,
    }),
    maxAsset: Object.freeze({
      js: 610,
      css: 195,
      image: 560,
    }),
  }),
  3: Object.freeze({
    total: Object.freeze({
      js: 5300,
      css: 520,
      image: 7000,
    }),
    maxAsset: Object.freeze({
      js: 575,
      css: 175,
      image: 520,
    }),
  }),
});

const resolveBudgetStage = () => {
  const requestedStage = process.env.BUNDLE_BUDGET_STAGE;
  if (requestedStage === "2" || requestedStage === "3") {
    return requestedStage;
  }
  return "1";
};

const ACTIVE_BUDGET_STAGE = resolveBudgetStage();
const BUDGETS_KB = BUDGET_STAGES_KB[ACTIVE_BUDGET_STAGE];

const toKb = (bytes) => bytes / 1024;
const round = (value) => Number(value.toFixed(1));

const walkFiles = (directory) => {
  const output = [];
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      output.push(...walkFiles(fullPath));
      continue;
    }
    output.push(fullPath);
  }

  return output;
};

const createBucketSummary = () => ({
  totalBytes: 0,
  maxAssetBytes: 0,
  maxAssetName: "",
});

const summarizeAssets = () => {
  const summary = {
    js: createBucketSummary(),
    css: createBucketSummary(),
    image: createBucketSummary(),
  };

  const files = walkFiles(DIST_ASSETS_DIR);
  for (const filePath of files) {
    const extension = path.extname(filePath).toLowerCase();
    const bucket = EXTENSION_TO_BUCKET[extension];
    if (!bucket) {
      continue;
    }

    const stat = fs.statSync(filePath);
    const bytes = stat.size;
    const relativeName = path.relative(ROOT, filePath).replaceAll("\\", "/");
    const bucketSummary = summary[bucket];

    bucketSummary.totalBytes += bytes;
    if (bytes > bucketSummary.maxAssetBytes) {
      bucketSummary.maxAssetBytes = bytes;
      bucketSummary.maxAssetName = relativeName;
    }
  }

  return summary;
};

const main = () => {
  if (!fs.existsSync(DIST_ASSETS_DIR)) {
    console.error(`Bundle budgets check failed: ${DIST_ASSETS_DIR} was not found.`);
    console.error("Run `npm run build` before checking bundle budgets.");
    process.exit(1);
  }

  const summary = summarizeAssets();
  const errors = [];

  for (const bucket of Object.keys(BUDGETS_KB.total)) {
    const totalKb = round(toKb(summary[bucket].totalBytes));
    const maxAssetKb = round(toKb(summary[bucket].maxAssetBytes));
    const totalBudget = BUDGETS_KB.total[bucket];
    const maxAssetBudget = BUDGETS_KB.maxAsset[bucket];

    if (totalKb > totalBudget) {
      errors.push(
        `[stage ${ACTIVE_BUDGET_STAGE}] ${bucket.toUpperCase()} total budget exceeded: ${totalKb}KB > ${totalBudget}KB.`
      );
    }
    if (maxAssetKb > maxAssetBudget) {
      errors.push(
        `[stage ${ACTIVE_BUDGET_STAGE}] ${bucket.toUpperCase()} single-asset budget exceeded (${summary[bucket].maxAssetName}): ${maxAssetKb}KB > ${maxAssetBudget}KB.`
      );
    }
  }

  for (const bucket of ["js", "css", "image"]) {
    const totalKb = round(toKb(summary[bucket].totalBytes));
    const maxAssetKb = round(toKb(summary[bucket].maxAssetBytes));
    const totalBudget = BUDGETS_KB.total[bucket];
    const maxAssetBudget = BUDGETS_KB.maxAsset[bucket];
    const maxAssetName = summary[bucket].maxAssetName || "(none)";

    console.log(
      `[stage ${ACTIVE_BUDGET_STAGE}] ${bucket.toUpperCase()} total ${totalKb}KB / ${totalBudget}KB | largest ${maxAssetKb}KB / ${maxAssetBudget}KB (${maxAssetName})`
    );
  }

  if (errors.length > 0) {
    console.error("Bundle budgets check failed:");
    for (const error of errors) {
      console.error(` - ${error}`);
    }
    process.exit(1);
  }

  console.log(`[stage ${ACTIVE_BUDGET_STAGE}] Bundle budgets check passed.`);
};

main();
