/**
 * @file diagrams.js
 * @description Product-story diagrams for projects completed through SMU.
 * @module assets/data/content/smu/diagrams
 */

import {
  diagramConfig,
  diagram,
} from "../../../../components/features/CustomDiagram/core/index.js";

const diagrams = {
  gifSystemFlow: {
    id: "diagram-gif-freak-system-flow",
    type: "diagram",
    title: "GIF Freak - Search and Render Lifecycle",
    diagram: diagram(
      diagramConfig.FLOWCHART_INIT,
      `flowchart LR

subgraph Input[Search Input]
  User([User])
  Query[Search Query]
  Valid{Query Valid?}
  Prompt[Show Input Guidance]
end

subgraph Request[Request + Transformation]
  Loading[Set Loading State]
  Fetch[Async Fetch Request]
  API[Giphy API]
  Normalize[Normalize Response]
end

subgraph Result[Result State]
  Found{Results Found?}
  Gallery[Render GIF Gallery]
  Empty[Show Empty State]
  Failure[Show Request Error]
end

User ==> Query ==> Valid
Valid ==>|No| Prompt -. revise query .-> Query
Valid ==>|Yes| Loading ==> Fetch ==> API
API ==>|Success| Normalize ==> Found
API ==>|Failure| Failure -. retry .-> Query
Found ==>|Yes| Gallery
Found ==>|No| Empty -. refine search .-> Query`
    ),
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "GIF Freak treats search as a stateful lifecycle rather than a direct UI-to-API line. The client validates input, exposes loading state, normalizes a successful Giphy response, and gives empty or failed requests explicit recovery paths before rendering the gallery.",
          },
        ],
      },
    ],
  },
  stockMemerFlow: {
    id: "diagram-stock-memer-architecture",
    type: "diagram",
    title: "Stock Memer - Market and Meme Flow",
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

User([User])
Ticker[Stock Symbol Input]
StockAPI[Stock Data API]
Normalize[Normalize Market Response]
Market{Market Data Available?}
AppState[Central State Store]
Chart[Chart Interface]
Meme[Meme Composition]
Valid{Meme Ready to Save?}
Firebase[(Firebase Database)]
Saved[Saved Meme Gallery]
Recovery[Input or Request Guidance]

User ==> Ticker ==> StockAPI ==> Normalize ==> Market
Market ==>|Yes| AppState ==> Chart ==> Meme ==> Valid
Market ==>|No| Recovery -. retry .-> Ticker
Valid ==>|Yes| Firebase ==> Saved
Valid ==>|No| Meme
Saved -. reopen .-> AppState`
      ),
    },
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

User([User])

subgraph Market[Market Data]
  Ticker[Stock Symbol Input]
  StockAPI[Stock Data API]
  Normalize[Normalize Market Response]
  Available{Market Data Available?}
  Recovery[Input or Request Guidance]
end

subgraph Application[Application Experience]
  AppState[Central State Store]
  Chart[Chart Interface]
  Meme[Meme Composition]
  Valid{Meme Ready to Save?}
end

subgraph Persistence[Saved Content]
  Firebase[(Firebase Database)]
  Saved[Saved Meme Gallery]
end

User ==> Ticker ==> StockAPI ==> Normalize ==> Available
Available ==>|Yes| AppState ==> Chart ==> Meme ==> Valid
Available ==>|No| Recovery -. retry .-> Ticker
Valid ==>|Yes| Firebase ==> Saved
Valid ==>|No| Meme
Saved -. reopen .-> AppState`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "Stock Memer combines two related flows: market data is validated and normalized for the chart experience, while the resulting context feeds meme composition and persistence. Missing market data returns to the input path, and saved memes can be reopened through the central application state.",
          },
        ],
      },
    ],
  },
  matchFlow: {
    id: "diagram-scion-algorithm-flow",
    type: "diagram",
    title: "Compatibility Engine Architecture",
    diagram: diagram(
      diagramConfig.FLOWCHART_INIT,
      `flowchart LR

subgraph Intake[Survey Intake]
  Survey[Survey Response Data]
  Validate{Required Answers Present?}
  Missing[Request Missing Answers]
end

subgraph Engine[Scoring Engine]
  Normalize[Normalization Module]
  Features[Feature Vector Model]
  Weighting[Weight Matrix]
  Aggregate[Compatibility Aggregator]
  Threshold{Meets Match Threshold?}
end

subgraph Output[Transparent Results]
  Ranking[Ranked Matches]
  Explanation[Score Explanation]
  Review[Human Review]
  Refine[Refine Survey Inputs]
end

Survey ==> Validate
Validate ==>|No| Missing -. complete survey .-> Survey
Validate ==>|Yes| Normalize ==> Features ==> Weighting ==> Aggregate ==> Threshold
Aggregate ==> Explanation
Threshold ==>|Yes| Ranking ==> Review
Threshold ==>|No| Review
Review -. needs refinement .-> Refine -. update .-> Survey`
    ),
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "The compatibility engine validates survey completeness before normalizing responses into weighted features. Its aggregate produces both ranked candidates and an explanation, while threshold and human-review paths make weak matches visible and allow the underlying survey inputs to be refined.",
          },
        ],
      },
    ],
  },
};

export default diagrams;
export const diagramValues = Object.values(diagrams);
