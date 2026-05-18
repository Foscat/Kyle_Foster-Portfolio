/**
 * @file playwright\pages\docs.spec.ts
 * @description playwright\pages\docs.spec module.
 * @module playwright\pages\docs.spec
 */

import { createPageTestSuite } from "../utils/pageTestTemplate.ts";

createPageTestSuite({
  name: "Docs page",
  route: "/docs",
});
