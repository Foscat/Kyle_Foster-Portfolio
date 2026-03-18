/**
 * @file index.jsx
 * @fileoverview Centralized export module for shared UI components. This file serves as a single point of import for all commonly used UI elements across the codebase, promoting modularity and ease of maintenance.
 *
 * Note: When adding new shared UI components, simply import them here and include them in the export statement.
 * @module components/ui
 */

import { lazy, Suspense } from "react";
const withSuspense = (LazyComponent, fallback = "Loading component...") => {
  const WrappedComponent = (props) => (
    <Suspense fallback={<div role="status">{fallback}</div>}>
      <LazyComponent {...props} />
    </Suspense>
  );

  return WrappedComponent;
};

const AccordionList = withSuspense(
  lazy(() => import("./AccordionList")),
  "Loading accordion..."
);
const Btn = withSuspense(
  lazy(() => import("./Btn")),
  "Loading button..."
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
  "Loading insight card..."
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
