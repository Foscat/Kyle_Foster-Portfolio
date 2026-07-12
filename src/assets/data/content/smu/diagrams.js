/**
 * @file src\assets\data\content\smu\diagrams.js
 * @description src\assets\data\content\smu\diagrams module.
 * @module src\assets\data\content\smu\diagrams
 */

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
            text: "Search Interface input updates the Client State Manager, which sends an Async Fetch Request to the Giphy API. The response returns through the same request layer, updates client state, and drives the Dynamic Render Engine. Read the arrows as one request-and-render cycle rather than direct UI-to-API coupling.",
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
            text: "Stock Data API and Firebase Database feed the Central State Store, which supplies the Chart Interface. The Meme Generator writes user-created content to Firebase. The diagram separates external market data, application state, persistence, and presentation so each arrow shows which layer owns a read or write.",
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
            text: "Survey Response Data moves through Normalization, Feature Vector, Weight Matrix, and Compatibility Aggregator stages. The aggregate then feeds both the Ranking Resolver and Transparency Module. Follow the pipeline left to right: inputs become comparable features, receive explicit weights, and produce both an ordered result and its explanation.",
          },
        ],
      },
    ],
  },
};

export default diagrams;
export const diagramValues = Object.values(diagrams);
