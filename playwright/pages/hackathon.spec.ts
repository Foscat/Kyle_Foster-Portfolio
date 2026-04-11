/**
 * @file playwright\pages\hackathon.spec.ts
 * @description playwright\pages\hackathon.spec module.
 * @module playwright\pages\hackathon.spec
 */

import { createPageTestSuite } from "../utils/pageTestTemplate.ts";
createPageTestSuite({
  name: "Hackathon page",
  route: "/hackathon",
});
