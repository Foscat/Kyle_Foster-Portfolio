/**
 * @file src\components\features\CustomDiagram\examples\greenhouse.arch.js
 * @description src\components\features\CustomDiagram\examples\greenhouse.arch module.
 * @module src\components\features\CustomDiagram\examples\greenhouse.arch
 */

import { registerDiagram } from "./index.js";

registerDiagram("greenhouse-architecture", {
  type: "architecture",
  title: "Greenhouse Controller Architecture",
  description: "Control loop reads sensor data and drives environment devices via GPIO relays.",
  config: {
    direction: "LR",
    legend: false,

    layers: [
      {
        key: "presentation",
        nodes: [{ id: "UI", label: "Monitoring Dashboard", type: "component" }],
      },
      {
        key: "application",
        nodes: [
          { id: "Loop", label: "Control Loop", type: "service", core: true },
          { id: "Eval", label: "Threshold Evaluator", type: "service" },
        ],
      },
      {
        key: "infrastructure",
        nodes: [{ id: "GPIO", label: "GPIO Relay Board", type: "component" }],
      },
      {
        key: "external",
        nodes: [
          { id: "Sensor", label: "DHT11 Sensor", type: "external" },
          { id: "Devices", label: "Fans / Heater / Humidifier", type: "external" },
        ],
      },
    ],

    edges: [
      { from: "Sensor", to: "Loop", label: "temp + humidity", style: "data" },
      { from: "Loop", to: "Eval", label: "evaluate", style: "sync" },
      { from: "Eval", to: "GPIO", label: "activate", style: "event" },
      { from: "GPIO", to: "Devices", label: "power", style: "event" },
    ],

    // Optional mobile overrides:
    mobile: {
      direction: "TB",
      // You can also override layers/edges if needed:
      // layers: [...],
      // edges: [...],
      legend: false,
    },
  },
});
