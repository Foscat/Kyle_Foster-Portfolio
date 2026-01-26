import { createPageTestSuite } from "../utils/pageTestTemplate.ts";
createPageTestSuite({
  name: "Hackathon page",
  route: "/hackathon",
  pageTitle: /Hackathon Projects and Ideas/i,
});
