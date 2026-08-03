/**
 * @file SandersonTechnologyEnterprises.test.jsx
 * @description Page-level tests for the Sanderson Technology Enterprises case study.
 * @module pages/SandersonTechnologyEnterprises/SandersonTechnologyEnterprises.test
 */

import SandersonTechnologyEnterprises from "./index.jsx";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import pageSummaryMetas from "assets/data/pageSummaryMetas";
import sandersonTechnologyEnterprisesSections from "assets/data/content/sanderson-technology-enterprises";
import { PageRoute } from "types/navigation.types";
import { createPageTests } from "tests/helpers/createPageTests.jsx";
import renderWithProviders from "tests/renderWithProviders";

createPageTests({
  PageComponent: SandersonTechnologyEnterprises,
  sections: sandersonTechnologyEnterprisesSections,
  pageRoute: PageRoute.SANDERSON_TECHNOLOGY_ENTERPRISES,
  pageName: "Sanderson Technology Enterprises",
});

describe("Sanderson Technology Enterprises header", () => {
  it("uses concise hero copy and a focus-area label", async () => {
    renderWithProviders(<SandersonTechnologyEnterprises />);

    expect(
      await screen.findByText(
        "Public-safe case study for STE website delivery, early platform products, and a reusable interface system."
      )
    ).toBeInTheDocument();
    expect(
      screen.queryByText(pageSummaryMetas.SandersonTechnologyEnterprises.description)
    ).not.toBeInTheDocument();
    expect(
      screen.getByText((_, node) => node?.classList.contains("tech-used") === true)
    ).toHaveTextContent("Focus Areas: React Architecture");
  });
});
