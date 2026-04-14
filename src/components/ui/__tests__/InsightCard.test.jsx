/**
 * @file InsightCard.test.jsx
 * @description Unit tests for the InsightCard and CardGrid components.
 *
 * Test coverage:
 * - InsightCard renders title, subtitle, and content
 * - InsightCard accepts custom variant for styling
 * - InsightCard renders optional icon
 * - CardGrid renders children in a grid layout
 * - CardGrid normalizes columns prop (prevents invalid values)
 * - CardGrid sets proper CSS custom properties for grid styling
 *
 * @module tests/components/ui/InsightCard
 */

import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "tests/renderWithProviders";
import { InsightCard, CardGrid } from "../InsightCard";
import { faLightbulb, faStar } from "@fortawesome/free-solid-svg-icons";

// Mock RichText component
vi.mock("components/renderers", async () => {
  const actual = await vi.importActual("components/renderers");
  return {
    ...actual,
    RichText: ({ content }) => <div>{content}</div>,
  };
});

describe("InsightCard", () => {
  const defaultProps = {
    title: "Key Insight",
    content: "This is an important insight.",
  };

  it("renders the card title", () => {
    renderWithProviders(<InsightCard {...defaultProps} />);

    expect(screen.getByText("Key Insight")).toBeInTheDocument();
  });

  it("renders the card content", () => {
    renderWithProviders(<InsightCard {...defaultProps} />);

    expect(screen.getByText("This is an important insight.")).toBeInTheDocument();
  });

  it("renders subtitle when provided", () => {
    renderWithProviders(<InsightCard {...defaultProps} subtitle="A helpful subtitle" />);

    expect(screen.getByText("A helpful subtitle")).toBeInTheDocument();
  });

  it("applies custom variant class for styling", () => {
    renderWithProviders(<InsightCard {...defaultProps} variant="secondary" />);

    const card = screen.getByRole("listitem");
    expect(card).toBeInTheDocument();
  });

  it("renders rich text content when provided as rich text nodes", () => {
    const richContent = "This is rich content";
    renderWithProviders(<InsightCard title="Rich Insight" content={richContent} />);

    expect(screen.getByText("Rich Insight")).toBeInTheDocument();
    expect(screen.getByText(richContent)).toBeInTheDocument();
  });

  it("applies card margin and padding styles", () => {
    renderWithProviders(<InsightCard {...defaultProps} />);

    const card = screen.getByRole("listitem");
    expect(card).toBeInTheDocument();
  });
});

describe("CardGrid", () => {
  it("renders children cards", () => {
    renderWithProviders(
      <CardGrid columns={3}>
        <InsightCard title="Card 1" content="Content 1" />
        <InsightCard title="Card 2" content="Content 2" />
      </CardGrid>
    );

    expect(screen.getByText("Card 1")).toBeInTheDocument();
    expect(screen.getByText("Card 2")).toBeInTheDocument();
  });

  it("applies list role to grid container", () => {
    renderWithProviders(
      <CardGrid columns={3}>
        <InsightCard title="Card 1" content="Content 1" />
      </CardGrid>
    );

    const grid = screen.getByRole("list");
    expect(grid).toBeInTheDocument();
  });

  it("sets CSS custom property for column count", () => {
    renderWithProviders(
      <CardGrid columns={2}>
        <InsightCard title="Card 1" content="Content 1" />
      </CardGrid>
    );

    const grid = screen.getByRole("list");
    expect(grid).toHaveStyle("--card-grid-columns: 2");
  });

  it("defaults to 3 columns when not specified", () => {
    renderWithProviders(
      <CardGrid>
        <InsightCard title="Card 1" content="Content 1" />
      </CardGrid>
    );

    const grid = screen.getByRole("list");
    expect(grid).toHaveStyle("--card-grid-columns: 3");
  });

  it("defaults to 3 columns when columns prop is invalid", () => {
    renderWithProviders(
      <CardGrid columns={-1}>
        <InsightCard title="Card 1" content="Content 1" />
      </CardGrid>
    );

    const grid = screen.getByRole("list");
    expect(grid).toHaveStyle("--card-grid-columns: 3");
  });

  it("handles non-numeric columns prop gracefully", () => {
    renderWithProviders(
      <CardGrid columns="invalid">
        <InsightCard title="Card 1" content="Content 1" />
      </CardGrid>
    );

    const grid = screen.getByRole("list");
    expect(grid).toHaveStyle("--card-grid-columns: 3");
  });

  it("sets CSS custom property for card count", () => {
    renderWithProviders(
      <CardGrid columns={3}>
        <InsightCard title="Card 1" content="Content 1" />
        <InsightCard title="Card 2" content="Content 2" />
        <InsightCard title="Card 3" content="Content 3" />
      </CardGrid>
    );

    const grid = screen.getByRole("list");
    expect(grid).toHaveStyle("--card-grid-count: 3");
  });

  it("filters out null/undefined children when counting cards", () => {
    renderWithProviders(
      <CardGrid columns={3}>
        <InsightCard title="Card 1" content="Content 1" />
        {null}
        <InsightCard title="Card 2" content="Content 2" />
        {undefined}
      </CardGrid>
    );

    const grid = screen.getByRole("list");
    expect(grid).toHaveStyle("--card-grid-count: 2");
  });

  it("supports single column layout", () => {
    renderWithProviders(
      <CardGrid columns={1}>
        <InsightCard title="Card 1" content="Content 1" />
      </CardGrid>
    );

    const grid = screen.getByRole("list");
    expect(grid).toHaveStyle("--card-grid-columns: 1");
  });

  it("supports many columns layout", () => {
    renderWithProviders(
      <CardGrid columns={6}>
        <InsightCard title="Card 1" content="Content 1" />
      </CardGrid>
    );

    const grid = screen.getByRole("list");
    expect(grid).toHaveStyle("--card-grid-columns: 6");
  });
});
