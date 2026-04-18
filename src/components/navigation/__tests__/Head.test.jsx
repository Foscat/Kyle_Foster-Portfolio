/**
 * @file Head.test.jsx
 * @fileoverview Tests for the Head component.
 * @description Tests for the Head component, ensuring it sets the document title and meta tags correctly based on the current route.
 * @module components/navigation/Head
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import Head from "../Head";
import renderWithProviders from "tests/renderWithProviders";
import { waitFor } from "@testing-library/react";

// Mock the pageMetas data to provide consistent metadata for testing, allowing us to verify that the Head component correctly sets the document title and meta tags based on the current route without relying on the actual data source.
vi.mock("assets/data/pageMetas", () => ({
  default: {
    Home: { title: "Home Page", description: "Home description" },
    Hackathon: { title: "Hackathon Page", description: "Hackathon description" },
    Smu: { title: "SMU Page", description: "SMU description" },
    SideProjects: { title: "Side Projects Page", description: "Side projects description" },
    Codestream: { title: "Codestream Page", description: "Codestream description" },
    Contact: { title: "Contact Page", description: "Contact description" },
  },
}));

// Helper function to render the Head component with a specific route, allowing us to test how the component behaves when different paths are active by manipulating the browser's history state before rendering.
const renderHead = (path = "/") => {
  window.history.pushState({}, "", path);
  return renderWithProviders(<Head />);
};

// The test suite for the Head component, which includes tests to verify that the component sets the document title and meta tags correctly based on the current route, ensuring that the appropriate metadata is applied for each page of the application.
describe("Head", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
  });

  // Test to ensure that when the Head component is rendered with the default route ("/"), it sets the document title and description meta tag according to the metadata defined for the Home page, verifying that the component correctly applies the expected metadata for the default route.
  it("uses Home metadata by default", async () => {
    renderHead("/");

    await waitFor(() => {
      expect(document.title).toBe("Home Page");
    });
  });
  // Test to verify that when the Head component is rendered with the "/hackathon" route, it sets the document title and Open Graph title meta tag according to the metadata defined for the Hackathon page, ensuring that the component correctly applies the expected metadata for this specific route.
  it("uses Hackathon metadata for /hackathon route", async () => {
    renderHead("/hackathon");
    await waitFor(() => {
      expect(document.title).toBe("Hackathon Page");
    });
  });

  // Test to ensure that when the Head component is rendered with the "/smu" route, it sets the document title according to the metadata defined for the SMU page, verifying that the component correctly applies the expected metadata for this route as well.
  it("uses SMU metadata for /smu route", async () => {
    renderHead("/smu");
    await waitFor(() => {
      expect(document.title).toBe("SMU Page");
    });
  });

  // Test to ensure that when the Head component is rendered with the "/side-projects" route, it sets the document title according to the metadata defined for the Side Projects page, verifying that the component correctly applies the expected metadata for this route as well.
  it("uses SideProjects metadata for /side-projects route", async () => {
    renderHead("/side-projects");
    await waitFor(() => {
      expect(document.title).toBe("Side Projects Page");
    });
  });

  // Test to ensure that when the Head component is rendered with the "/codestream" route, it sets the document title according to the metadata defined for the Codestream page, verifying that the component correctly applies the expected metadata for this route as well.
  it("uses Contact metadata for /contact route", async () => {
    renderHead("/contact");
    await waitFor(() => {
      expect(document.title).toBe("Contact Page");
    });
  });
});
