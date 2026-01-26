import { createPageTestSuite } from "../utils/pageTestTemplate.ts";

createPageTestSuite({
  name: "Home page",
  route: "/",
  pageTitle: /Welcome to My Portfolio/i,
});
