/**
 * @file playwright\pages\smu.spec.ts
 * @description playwright\pages\smu.spec module.
 * @module playwright\pages\smu.spec
 */

import { createPageTestSuite } from "../utils/pageTestTemplate.ts";

createPageTestSuite({
  name: "SMU page",
  route: "/smu",
});
