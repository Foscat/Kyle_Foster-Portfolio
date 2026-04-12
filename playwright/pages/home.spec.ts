/**
 * @file playwright\pages\home.spec.ts
 * @description playwright\pages\home.spec module.
 * @module playwright\pages\home.spec
 */

import { createPageTestSuite } from "../utils/pageTestTemplate.ts";

createPageTestSuite({
  name: "Home page",
  route: "/",
});
