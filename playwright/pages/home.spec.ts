import { runPageTests } from "../utils/pageTestTemplate";

runPageTests({
  name: "Home page",
  route: "/",
  snapshotName: "home-page.png",
});
