import { createPageTestSuite } from "../utils/pageTestTemplate.ts";

createPageTestSuite({
  name: "SMU page",
  route: "/smu",
  pageTitle: /SMU Projects and Ideas/i,
});
