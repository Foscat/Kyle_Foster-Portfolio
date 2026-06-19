/**
 * @file src/components/renderers/blocks/MarkdownDocs.Block/MarkdownDocs.Block.test.jsx
 * @description Regression tests for MarkdownDocsBlock loading stability.
 * @module components/renderers/blocks/MarkdownDocs.Block/MarkdownDocs.Block.test
 */
import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import MarkdownDocsBlock from "./index.jsx";
import { getPortfolioDocsByCriteria } from "../../../../assets/data/content/portfolioDocs";
import renderWithProviders from "tests/renderWithProviders";

vi.mock("../../../../assets/data/content/portfolioDocs", () => ({
  getPortfolioDocs: vi.fn(() => Promise.resolve([])),
  getPortfolioDocsByCriteria: vi.fn(() =>
    Promise.resolve([
      {
        id: "reference-client-components-example",
        slug: "reference-client-components-example",
        title: "Example Component",
        summary: "Example generated doc.",
        category: "Client Components",
        content: "# Example Component\n\nGenerated component docs.",
      },
    ])
  ),
}));

describe("MarkdownDocsBlock", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("loads path-filtered docs once when optional filter arrays are omitted", async () => {
    renderWithProviders(
      <MarkdownDocsBlock
        block={{
          id: "docs-reference-components",
          title: "Component Reference",
          docPathPrefixes: ["reference/client/components/"],
          selectMode: "single",
        }}
      />
    );

    expect(await screen.findByText("Generated component docs.")).toBeInTheDocument();

    await new Promise((resolve) => {
      setTimeout(resolve, 120);
    });

    expect(getPortfolioDocsByCriteria).toHaveBeenCalledTimes(1);
  });
});
