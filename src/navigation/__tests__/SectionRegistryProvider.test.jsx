import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  useSectionRegistry,
} from "../SectionRegistryProvider";

const wrapper = ({ children }) => (
  <SectionRegistryProvider>{children}</SectionRegistryProvider>
);

describe("SectionRegistryProvider", () => {
  beforeEach(() => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  it("registers and retrieves sections", () => {
    const { result } = renderHook(() => useSectionRegistry(), { wrapper });

    act(() => {
      result.current.registerSection("intro", {
        id: "intro",
        title: "Introduction",
      });
    });

    const sections = result.current.getSections();
    expect(sections).toHaveLength(1);
    expect(sections[0].id).toBe("intro");
  });

  it("prevents duplicate section ids", () => {
    const { result } = renderHook(() => useSectionRegistry(), { wrapper });

    act(() => {
      result.current.registerSection("dup", { id: "dup", title: "One" });
      result.current.registerSection("dup", { id: "dup", title: "Two" });
    });

    expect(result.current.getSections()).toHaveLength(1);
  });

  it("unregisters sections correctly", () => {
    const { result } = renderHook(() => useSectionRegistry(), { wrapper });

    act(() => {
      result.current.registerSection("a", { id: "a", title: "A" });
      result.current.unregisterSection("a");
    });

    expect(result.current.getSections()).toHaveLength(0);
  });

  it("throws if hook is used outside provider", () => {
    expect(() => renderHook(() => useSectionRegistry())).toThrow();
  });
});
