import { createPageTestSuite } from "../utils/pageTestTemplate.ts";

createPageTestSuite({
  name: "Side Projects page",
  route: "/side-projects",
  pageTitle: /Side Projects and Personal Work/i,
});
