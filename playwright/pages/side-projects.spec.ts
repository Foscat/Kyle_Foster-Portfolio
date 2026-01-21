import { runPageTests } from "../utils/pageTestTemplate";

runPageTests({
  name: "Side Projects page",
  route: "/side-projects",
  snapshotName: "side-projects-page.png",
});
