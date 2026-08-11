/**
 * @file StickySectionNav.test.jsx
 * @description Contracts for the in-flow route section navigator.
 * @module components/navigation/StickySectionNav.test
 */

import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StickySectionNav from "../StickySectionNav";
import { BlockType } from "types/ui.types";
import renderWithProviders from "tests/renderWithProviders";

const markProgrammaticScroll = vi.fn(() => Promise.resolve(true));
const scrollSpyState = {
  activeLeafId: "section-1",
  activeChain: ["section-1"],
};

vi.mock("assets/hooks/useScrollSpy", () => ({
  buildSectionTree: (sections) => {
    const nodes = sections.flatMap((section) => {
      const children = (section.navItems || section.blocks || [])
        .filter((item) => item?.id)
        .map((item) => ({ id: item.id, parentId: section.id, type: "block" }));

      return [{ id: section.id, parentId: null, type: "section" }, ...children];
    });

    return { nodes, byId: new Map(nodes.map((node) => [node.id, node])) };
  },
  useScrollSpyWithHistory: () => ({
    activeLeafId: scrollSpyState.activeLeafId,
    activeChain: scrollSpyState.activeChain,
    markProgrammaticScroll,
  }),
}));

const sections = [
  { id: "section-1", title: "Introduction" },
  { id: "section-2", title: "Details" },
];

describe("StickySectionNav", () => {
  beforeEach(() => {
    scrollSpyState.activeLeafId = "section-1";
    scrollSpyState.activeChain = ["section-1"];
    markProgrammaticScroll.mockClear();
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    window.history.pushState(null, "", "/page");

    for (const section of sections) {
      const target = document.createElement("div");
      target.id = section.id;
      target.getBoundingClientRect = vi.fn(() => ({ top: 160 }));
      document.body.appendChild(target);
    }
  });

  it("uses one in-flow on-this-page command bar at desktop widths", () => {
    Object.defineProperty(window, "innerWidth", { value: 1440, configurable: true });

    renderWithProviders(<StickySectionNav sections={sections} pageUrl="/page" />);

    const navigation = screen.getByRole("navigation", { name: "On this page" });
    expect(navigation).toHaveClass("route-section-nav");
    expect(
      within(navigation).getByRole("button", {
        name: "Open section navigation: Introduction",
      })
    ).toBeVisible();
    expect(within(navigation).getByText("1 / 2")).toBeVisible();
    expect(document.documentElement).not.toHaveAttribute("data-has-mobile-section-nav");
  });

  it("uses the compact nav label and scroll-spy progress", () => {
    scrollSpyState.activeLeafId = "section-2";
    scrollSpyState.activeChain = ["section-2"];

    renderWithProviders(
      <StickySectionNav
        sections={[
          sections[0],
          {
            ...sections[1],
            title: "Detailed product architecture",
            navLabel: "Architecture",
          },
        ]}
        pageUrl="/page"
      />
    );

    expect(
      screen.getByRole("button", { name: "Open section navigation: Architecture" })
    ).toBeVisible();
    expect(screen.getByText("2 / 2")).toBeVisible();
  });

  it("navigates from the drawer and coordinates the URL and scroll spy", async () => {
    const user = userEvent.setup();
    renderWithProviders(<StickySectionNav sections={sections} pageUrl="/page" />);

    await user.click(screen.getByRole("button", { name: "Open section navigation: Introduction" }));
    const dialog = await screen.findByRole("dialog", { name: /page page/i });
    await user.click(within(dialog).getByRole("button", { name: "Details" }));

    await waitFor(() => {
      expect(window.location.hash).toBe("#section-2");
      expect(markProgrammaticScroll).toHaveBeenCalledWith("section-2");
      expect(window.scrollTo).toHaveBeenCalled();
    });
  });

  it("lands section targets below the measured unified navigation", async () => {
    const user = userEvent.setup();
    const navigationShell = document.createElement("header");
    navigationShell.dataset.testid = "unified-navigation";
    navigationShell.getBoundingClientRect = vi.fn(() => ({ height: 96 }));
    document.body.prepend(navigationShell);

    renderWithProviders(<StickySectionNav sections={sections} pageUrl="/page" />);
    await user.click(screen.getByRole("button", { name: "Open section navigation: Introduction" }));
    const dialog = await screen.findByRole("dialog", { name: /page page/i });
    await user.click(within(dialog).getByRole("button", { name: "Details" }));

    await waitFor(() => {
      expect(window.scrollTo).toHaveBeenCalledWith({ behavior: "smooth", top: 64 });
    });

    navigationShell.remove();
  });

  it("prefers explicit nav items and excludes link-list blocks", async () => {
    const user = userEvent.setup();
    const docs = document.createElement("div");
    docs.id = "docs";
    document.body.appendChild(docs);
    const components = document.createElement("div");
    components.id = "doc-components";
    document.body.appendChild(components);

    renderWithProviders(
      <StickySectionNav
        pageUrl="/docs"
        sections={[
          {
            id: "docs",
            title: "Docs",
            navItems: [{ id: "doc-components", title: "Components" }],
            blocks: [
              { id: "legacy-block", title: "Legacy block" },
              { id: "resource-links", title: "Resources", type: BlockType.LINKS },
            ],
          },
        ]}
      />
    );

    await user.click(screen.getByRole("button", { name: "Open section navigation: Docs" }));
    await user.click(screen.getByRole("button", { name: "Toggle Docs subsections" }));

    expect(screen.getByRole("button", { name: "Components" })).toBeVisible();
    expect(screen.queryByRole("button", { name: "Legacy block" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Resources" })).not.toBeInTheDocument();
  });

  it("does not hijack Tab when focus is outside the route navigator", () => {
    renderWithProviders(<StickySectionNav sections={sections} pageUrl="/page" />);
    const outsideButton = document.createElement("button");
    outsideButton.textContent = "Outside";
    document.body.appendChild(outsideButton);
    outsideButton.focus();

    fireEvent.keyDown(outsideButton, { key: "Tab" });

    expect(markProgrammaticScroll).not.toHaveBeenCalled();
    expect(window.location.hash).not.toBe("#section-2");
  });
});
