import { runPageTests } from "../utils/pageTestTemplate";

runPageTests({
  name: "Hackathon page",
  route: "/hackathon",
  snapshotName: "hackathon-page.png",
});
