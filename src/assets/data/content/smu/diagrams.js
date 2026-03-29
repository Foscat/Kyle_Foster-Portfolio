import {
  diagramConfig,
  diagram,
} from "../../../../components/features/CustomDiagram/core/index.js";

const diagrams = {
  gifSystemFlow: {
    id: "diagram-gif-freak-system-flow",
    type: "diagram",
    title: "GIF Freak – Client/API Architecture",
    diagram: diagram(
      diagramConfig.FLOWCHART_INIT,
      `flowchart LR

subgraph Client[Client Layer]
  UI[Search Interface]
  State[Client State Manager]
  Renderer[Dynamic Render Engine]
end

subgraph Network[Network Layer]
  Fetch[Async Fetch Request]
end

subgraph External[External Service]
  API[Giphy API]
end

UI ==> State
State ==> Fetch
Fetch ==> API
API ==> Fetch
Fetch ==> State
State ==> Renderer`
    ),
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "GIF Freak models a reactive client that consumes a third-party API through an asynchronous request and render cycle.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "UI drives intent." },
              {
                type: "text",
                text: " Search interaction updates client state instead of directly mutating the view.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Network access is isolated." },
              {
                type: "text",
                text: " API communication lives behind an async fetch layer, keeping transport concerns separate from rendering concerns.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Rendering is state-driven." },
              {
                type: "text",
                text: " Once the response returns, the state manager becomes the single source of truth for what the interface renders next.",
              },
            ],
          },
        ],
      },
    ],
  },
  stockMemerFlow: {
    id: "diagram-stock-memer-architecture",
    type: "diagram",
    title: "Stock Memer – Multi-Service Architecture",
    mobile: {
      diagram: diagram(
        diagramConfig.MOBILE_FLOWCHART_INIT,
        `flowchart TB

StockAPI[Stock Data API]
Firebase[Firebase Database]
AppState[Central State Store]
ChartUI[Chart Interface]
MemeUI[Meme Generator]

StockAPI ==> AppState
Firebase ==> AppState
AppState ==> ChartUI
MemeUI ==> Firebase`
      ),
    },
    desktop: {
      diagram: diagram(
        diagramConfig.FLOWCHART_INIT,
        `flowchart LR

subgraph External[External Services]
  StockAPI[Stock Data\n API]
end

subgraph App[Application State]
  AppState[Central State\n Store]
end

subgraph Persistence[Persistence]
  Firebase[Firebase\n Database]
end

subgraph Presentation[Presentation Layer]
  ChartUI[Chart\n Interface]
  MemeUI[Meme\n Generator]
end

StockAPI ==> AppState
Firebase ==> AppState
AppState ==> ChartUI
MemeUI ==> Firebase`
      ),
    },
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "Stock Memer combines external market data with user-generated content through a layered frontend architecture that separates presentation, state management, and persistence.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "External market data feeds application state." },
              {
                type: "text",
                text: " Stock pricing and related inputs arrive from a third-party API and are normalized into the client state layer.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "State coordinates multiple UI surfaces." },
              {
                type: "text",
                text: " The charting and meme-generation experiences share a common application model instead of each managing disconnected data pipelines.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Persistence is selective." },
              {
                type: "text",
                text: " Firebase stores user-created artifacts and supports continuity between content creation and later retrieval.",
              },
            ],
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

subgraph Input[Input Domain]
  Survey[Survey Response Data]
end

subgraph Engine[Scoring Engine]
  Normalize[Normalization\n Module]
  Features[Feature\n Vector Model]
  Weighting[Weight\n Matrix]
  Aggregate[Compatibility Aggregator]
end

subgraph Output[Output Domain]
  Ranking[Ranking\n Resolver]
  Explanation[Transparency\n Module]
end

Survey ==> Normalize ==> Features ==> Weighting ==> Aggregate ==> Ranking
Aggregate ==> Explanation`
    ),
    description: [
      {
        type: "p",
        children: [
          {
            type: "text",
            text: "The compatibility engine is framed as a staged scoring pipeline that transforms raw survey answers into ranked outcomes and explanatory output.",
          },
        ],
      },
      {
        type: "ul",
        children: [
          {
            type: "li",
            children: [
              { type: "strong", text: "Normalization makes inputs comparable." },
              {
                type: "text",
                text: " Survey responses are standardized before scoring so heterogeneous answers can participate in the same downstream model.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Feature modeling and weighting remain explicit." },
              {
                type: "text",
                text: " The engine surfaces its scoring stages instead of collapsing them into a black-box function, which makes the logic easier to tune and explain.",
              },
            ],
          },
          {
            type: "li",
            children: [
              { type: "strong", text: "Output is both ranked and interpretable." },
              {
                type: "text",
                text: " A ranking resolver determines final ordering while a transparency layer provides reasoning context for the result.",
              },
            ],
          },
        ],
      },
    ],
  },
};

export default diagrams;
export const diagramValues = Object.values(diagrams);
