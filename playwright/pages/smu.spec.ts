import { runPageTests } from "../utils/pageTestTemplate";

runPageTests({
  name: "SMU page",
  route: "/smu",
  snapshotName: "smu-page.png",
});
