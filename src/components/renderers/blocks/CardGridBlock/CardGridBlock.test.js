/**
 * @file CardGridBlock.test.js
 * @fileoverview Tests for the CardGridBlock component.
 * @description Tests for the CardGridBlock component, ensuring it renders insight cards correctly when items are provided and returns nothing when there are no items.
 * @module components/renderers/blocks/CardGridBlock
 */

import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";

import CardGridBlock from "./index";
import renderWithProviders from "tests/renderWithProviders";

// Mock the CardGrid and InsightCard components from the UI library to simplify testing and focus on the CardGridBlock's functionality, allowing us to verify that the CardGridBlock renders the correct structure and content without relying on the actual implementation of these components.
vi.mock("components/ui", () => ({
  CardGrid: ({ children }) => <div>{children}</div>,
  InsightCard: ({ title, subtitle, content }) => (
    <article>
      <h3>{title}</h3>
      {subtitle ? <p>{subtitle}</p> : null}
      {content ? <div>{content}</div> : null}
    </article>
  ),
}));

// Mock the InfoSection component from the layout library to simplify testing and focus on the CardGridBlock's functionality, allowing us to verify that the CardGridBlock renders the correct structure and content without relying on the actual implementation of the InfoSection component.
vi.mock("components/layout", () => ({
  InfoSection: ({ title, children }) => (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  ),
}));

// Mock the useId hook from React to return a consistent ID during testing, allowing us to verify that the CardGridBlock generates the correct structure and content without relying on the actual implementation of the useId hook.
describe("CardGridBlock", () => {
  it("renders insight cards when items are provided", () => {
    renderWithProviders(
      <CardGridBlock
        block={{
          title: "Highlights",
          items: [
            { id: "one", title: "First card", subtitle: "One", content: "Alpha" },
            { id: "two", title: "Second card", subtitle: "Two", content: "Beta" },
          ],
        }}
      />
    );

    expect(screen.getByRole("heading", { name: /highlights/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /first card/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /second card/i })).toBeInTheDocument();
  });

  // Test that the CardGridBlock component returns nothing when there are no items, ensuring that it does not render any content or structure when the items array is empty. This verifies that the component handles the case of an empty items array correctly and does not produce any unintended output in this scenario.
  it("returns nothing when there are no items", () => {
    const { container } = renderWithProviders(
      <CardGridBlock block={{ title: "Empty", items: [] }} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
