/**
 * @file InsightCard.test.jsx
 * @description Behavior tests for shared insight-card icon rendering.
 * @module components/ui/InsightCard/InsightCard.test
 */

import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import renderWithProviders from "tests/renderWithProviders";
import { InsightCard } from "./index.jsx";

describe("InsightCard", () => {
  it("renders a semantic UI Style Kit icon when iconName is provided", () => {
    renderWithProviders(
      <InsightCard
        title="Layout Style CSS"
        subtitle="Responsive structure"
        iconName="grid"
        content="Owns layout composition."
      />
    );

    const icon = screen.getByTestId("insight-card-semantic-icon");

    expect(icon).toHaveAttribute("name", "grid");
    expect(icon).toHaveAttribute("frame", "soft");
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });
});
