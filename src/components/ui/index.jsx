/**
 * @file index.jsx
 * @fileoverview Centralized export module for shared UI components. This file serves as a single point of import for all commonly used UI elements across the codebase, promoting modularity and ease of maintenance.
 *
 * Note: When adding new shared UI components, simply import them here and include them in the export statement.
 * @module components/ui
 */

import { lazy, Suspense } from "react";
import Btn from "./Btn";

const withSuspense = (
  LazyComponent,
  fallback = "Loading component...",
  fallbackRole = "status"
) => {
  const WrappedComponent = (props) => (
    <Suspense fallback={<div role={fallbackRole}>{fallback}</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );

  return WrappedComponent;
};

const AccordionList = withSuspense(
  lazy(() => import("./AccordionList")),
  "Loading accordion..."
);
const ClickableImg = withSuspense(
  lazy(() => import("./ClickableImg")),
  "Loading image..."
);
const FrostedIcon = withSuspense(
  lazy(() => import("./FrostedIcon")),
  "Loading icon..."
);
const InsightCard = withSuspense(
  lazy(() => import("./InsightCard").then((module) => ({ default: module.InsightCard }))),
  "Loading insight card...",
  // Insight cards render directly inside a role=list grid, so their placeholder must remain a listitem.
  "listitem"
);
const CardGrid = withSuspense(
  lazy(() => import("./InsightCard").then((module) => ({ default: module.CardGrid }))),
  "Loading card grid..."
);
const ProjectCard = withSuspense(
  lazy(() => import("./ProjectCard")),
  "Loading project..."
);
const MermaidDiagram = withSuspense(
  lazy(() => import("./MermaidDiagram")),
  "Loading diagram..."
);

export {
  AccordionList,
  Btn,
  ClickableImg,
  FrostedIcon,
  InsightCard,
  CardGrid,
  ProjectCard,
  MermaidDiagram,
};
