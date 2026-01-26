import { createPageTestSuite } from "../utils/pageTestTemplate.ts";

createPageTestSuite({
  name: "Codestream page",
  route: "/codestream",
  pageTitle: /CodeStream: Collaborate on Code in Your IDE/i,
});
