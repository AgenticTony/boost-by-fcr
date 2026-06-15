import { describe, it, expect, vi } from "vitest";
import { createResilientAdapter } from "./client";
import type { ApiAdapter } from "./adapter";

/**
 * Minimal adapter stubs. The resilient wrapper only cares about WHICH adapter
 * ran, not the data shape, so returns are loosely cast.
 */
function fakeAdapter(overrides: Partial<ApiAdapter> = {}): ApiAdapter {
  return {
    fetchNews: async () => [],
    fetchNewsBySlug: async () => null,
    fetchTimeline: async () => [],
    fetchResources: async () => [],
    fetchResourcesByCategory: async () => [],
    submitRegistration: async () => ({ success: true }),
    submitContact: async () => ({ success: true }),
    ...overrides,
  };
}

describe("createResilientAdapter", () => {
  it("returns primary data when the primary succeeds", async () => {
    const primary = fakeAdapter({
      fetchNews: async () => [{ id: "from-primary" }] as never,
    });
    const fallback = fakeAdapter({
      fetchNews: async () => [{ id: "from-fallback" }] as never,
    });

    const result = await createResilientAdapter(primary, fallback).fetchNews();
    expect(result).toEqual([{ id: "from-primary" }]);
  });

  it("falls back to the fallback adapter and warns when the primary throws", async () => {
    const primary = fakeAdapter({
      fetchNews: async () => {
        throw new Error("network down");
      },
    });
    const fallback = fakeAdapter({
      fetchNews: async () => [{ id: "from-fallback" }] as never,
    });
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    const result = await createResilientAdapter(primary, fallback).fetchNews();

    expect(result).toEqual([{ id: "from-fallback" }]);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it("passes arguments through to the fallback", async () => {
    const primary = fakeAdapter({
      fetchNewsBySlug: async () => {
        throw new Error("boom");
      },
    });
    const fallback = fakeAdapter({
      fetchNewsBySlug: async (slug) => ({ id: slug }) as never,
    });
    vi.spyOn(console, "warn").mockImplementation(() => {});

    const result = await createResilientAdapter(
      primary,
      fallback,
    ).fetchNewsBySlug("my-slug");

    expect(result).toEqual({ id: "my-slug" });
    vi.restoreAllMocks();
  });

  it("does not fall back for form submissions — passes through to primary", async () => {
    const submitRegistration = vi
      .fn()
      .mockResolvedValue({ success: true, delivered: false });
    const primary = fakeAdapter({ submitRegistration });
    const fallbackSubmit = vi.fn();
    const fallback = fakeAdapter({ submitRegistration: fallbackSubmit });

    await createResilientAdapter(primary, fallback).submitRegistration(
      {} as never,
    );

    expect(submitRegistration).toHaveBeenCalledTimes(1);
    expect(fallbackSubmit).not.toHaveBeenCalled();
  });
});
