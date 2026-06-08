import { describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";

import FIELD_TYPES from "types/field.types.js";
import FormBlock from "./index.jsx";
import renderWithProviders from "tests/renderWithProviders";

vi.mock("rsuite", async () => {
  const actual = await vi.importActual("rsuite");
  return {
    ...actual,
    Panel: ({ children, header }) => (
      <section>
        {header ? <h2>{header}</h2> : null}
        {children}
      </section>
    ),
  };
});

describe("FormBlock", () => {
  it("forwards required schema fields to rendered controls", () => {
    renderWithProviders(
      <FormBlock
        schema={{
          title: "Contact",
          fields: [
            {
              name: "fullName",
              type: FIELD_TYPES.TEXT,
              label: "Full Name",
              required: true,
            },
            {
              name: "message",
              type: FIELD_TYPES.TEXTAREA,
              label: "Project details",
              required: true,
            },
          ],
        }}
      />
    );

    expect(screen.getByRole("textbox", { name: /full name/i })).toBeRequired();
    expect(screen.getByRole("textbox", { name: /project details/i })).toBeRequired();
  });
});
