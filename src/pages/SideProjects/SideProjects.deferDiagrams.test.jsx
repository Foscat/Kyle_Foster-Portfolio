/**
 * @file src\pages\SideProjects\SideProjects.deferDiagrams.test.jsx
 * @description src\pages\SideProjects\SideProjects.deferDiagrams.test module.
 * @module src\pages\SideProjects\SideProjects.deferDiagrams.test
 */

import React from "react";
import { screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import renderWithProviders from "tests/renderWithProviders";

const {
  restoreScrollPosition,
  sectionRendererCalls,
  mockSections,
  customSectionFilter,
  sectionDeferResolver,
  throwingSectionDeferResolver,
} = vi.hoisted(() => {
  const customSectionFilter = vi.fn(() => true);
  const sectionDeferResolver = vi.fn(() => ({ startAt: 3, maxDeferred: 1 }));
  const throwingSectionDeferResolver = vi.fn(() => {
    throw new Error("resolver failure");
  });

  return {
    restoreScrollPosition: vi.fn(),
    sectionRendererCalls: vi.fn(),
    customSectionFilter,
    sectionDeferResolver,
    throwingSectionDeferResolver,
    mockSections: [
      { id: "overview", title: "Overview", deferDiagrams: false, blocks: [] },
      { id: "boolean-enabled", title: "Boolean Enabled", deferDiagrams: true, blocks: [] },
      {
        id: "interactive-surface-css",
        title: "Interactive Surface CSS",
        deferDiagrams: {
          startAt: 0,
          maxDeferred: 1,
          fallbackDelayMs: 800,
          placeholderMinHeight: "280px",
        },
        blocks: [],
      },
      {
        id: "custom-filter",
        title: "Custom Filter",
        deferDiagrams: {
          filter: customSectionFilter,
          startAt: 2,
        },
        blocks: [],
      },
      {
        id: "function-derived",
        title: "Function Derived",
        deferDiagrams: sectionDeferResolver,
        blocks: [],
      },
      {
        id: "function-throws",
        title: "Function Throws",
        deferDiagrams: throwingSectionDeferResolver,
        blocks: [],
      },
      {
        id: "invalid-filter",
        title: "Invalid Filter",
        deferDiagrams: {
          filter: "not-a-function",
          startAt: 4,
          maxDeferred: 1,
        },
        blocks: [],
      },
      {
        id: "implicit-default",
        title: "Implicit Default",
        blocks: [],
      },
    ],
  };
});

vi.mock("assets/context/SectionRegistryProvider", () => ({
  default: ({ children }) => children,
}));

vi.mock("assets/data/pageMetas.js", () => ({
  default: {
    SideProjects: {
      title: "Side Projects",
      description: "Mock description",
      jobTitle: "Engineer",
      timespan: "2026",
      tech: "React",
      url: "/side-projects",
      sections: mockSections,
    },
  },
}));

vi.mock("components/layout", () => ({
  PageHeader: ({ title }) => <h1>{title}</h1>,
}));

vi.mock("components/navigation", () => ({
  StickyNav: () => <nav aria-label="primary navigation" />,
  StickySectionNav: () => <nav aria-label="section navigation" />,
  Footer: () => <footer>Footer</footer>,
  helpers: {
    restoreScrollPosition,
  },
}));

vi.mock("components/renderers", () => ({
  SectionRenderer: (props) => {
    sectionRendererCalls(props);
    return <section data-testid={`section-${props.section.id}`} />;
  },
}));

import SideProjects from "pages/SideProjects";

describe("SideProjects diagram deferral", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("passes deferDiagrams to every section renderer", () => {
    renderWithProviders(<SideProjects />);

    expect(screen.getByRole("heading", { level: 1, name: "Side Projects" })).toBeInTheDocument();
    expect(sectionRendererCalls).toHaveBeenCalledTimes(mockSections.length);

    const calledWithDefer = sectionRendererCalls.mock.calls.map(([props]) => props.deferDiagrams);

    calledWithDefer.forEach((config) => {
      expect(config).toMatchObject({
        rootMargin: "480px 0px",
        threshold: 0.01,
      });
      expect(config.filter).toEqual(expect.any(Function));
    });

    const [
      overviewConfig,
      booleanEnabledConfig,
      projectConfig,
      customFilterConfig,
      functionConfig,
      throwingFunctionConfig,
      invalidFilterConfig,
      implicitDefaultConfig,
    ] = calledWithDefer;

    expect(overviewConfig).toMatchObject({
      enabled: false,
      rootMargin: "480px 0px",
      threshold: 0.01,
      placeholderMinHeight: "240px",
      fallbackDelayMs: 1200,
      startAt: 1,
      maxDeferred: 2,
    });
    expect(overviewConfig.filter(null, { section: { id: "overview", deferDiagrams: false } })).toBe(
      false
    );

    expect(booleanEnabledConfig).toMatchObject({
      enabled: true,
      rootMargin: "480px 0px",
      threshold: 0.01,
      placeholderMinHeight: "240px",
      fallbackDelayMs: 1200,
      startAt: 1,
      maxDeferred: 2,
    });
    expect(booleanEnabledConfig.filter(null, { section: { id: "boolean-enabled" } })).toBe(true);

    expect(projectConfig).toMatchObject({
      rootMargin: "480px 0px",
      threshold: 0.01,
      placeholderMinHeight: "280px",
      fallbackDelayMs: 800,
      startAt: 0,
      maxDeferred: 1,
    });
    expect(projectConfig.filter(null, { section: { id: "interactive-surface-css" } })).toBe(true);
    expect(projectConfig.filter(null, {})).toBe(true);

    expect(customFilterConfig).toMatchObject({
      rootMargin: "480px 0px",
      threshold: 0.01,
      placeholderMinHeight: "240px",
      fallbackDelayMs: 1200,
      startAt: 2,
      maxDeferred: 2,
    });
    expect(customFilterConfig.filter).toBe(customSectionFilter);

    expect(sectionDeferResolver).toHaveBeenCalledWith(
      expect.objectContaining({ id: "function-derived" }),
      4,
      8,
      expect.objectContaining({
        section: expect.objectContaining({ id: "function-derived" }),
        sectionIndex: 4,
        totalSections: 8,
        defaults: expect.objectContaining({
          rootMargin: "480px 0px",
          threshold: 0.01,
          startAt: 1,
          maxDeferred: 2,
        }),
      })
    );
    expect(functionConfig).toMatchObject({
      rootMargin: "480px 0px",
      threshold: 0.01,
      placeholderMinHeight: "240px",
      fallbackDelayMs: 1200,
      startAt: 3,
      maxDeferred: 1,
    });
    expect(functionConfig.filter).toEqual(expect.any(Function));

    expect(throwingSectionDeferResolver).toHaveBeenCalledWith(
      expect.objectContaining({ id: "function-throws" }),
      5,
      8,
      expect.objectContaining({
        section: expect.objectContaining({ id: "function-throws" }),
        sectionIndex: 5,
        totalSections: 8,
      })
    );
    expect(throwingFunctionConfig).toMatchObject({
      rootMargin: "480px 0px",
      threshold: 0.01,
      placeholderMinHeight: "240px",
      fallbackDelayMs: 1200,
      startAt: 1,
      maxDeferred: 2,
    });
    expect(throwingFunctionConfig.filter).toEqual(expect.any(Function));

    expect(invalidFilterConfig).toMatchObject({
      rootMargin: "480px 0px",
      threshold: 0.01,
      startAt: 4,
      maxDeferred: 1,
    });
    expect(invalidFilterConfig.filter).toEqual(expect.any(Function));
    expect(invalidFilterConfig.filter(null, { section: { id: "invalid-filter" } })).toBe(true);

    expect(implicitDefaultConfig).toMatchObject({
      rootMargin: "480px 0px",
      threshold: 0.01,
      placeholderMinHeight: "240px",
      fallbackDelayMs: 1200,
      startAt: 1,
      maxDeferred: 2,
    });
    expect(implicitDefaultConfig.filter).toEqual(expect.any(Function));
    expect(implicitDefaultConfig.filter(null, { section: { id: "implicit-default" } })).toBe(true);

    expect(throwingFunctionConfig).not.toBe(implicitDefaultConfig);
  });

  it("restores scroll position on mount", () => {
    renderWithProviders(<SideProjects />);
    expect(restoreScrollPosition).toHaveBeenCalledTimes(1);
  });
});
