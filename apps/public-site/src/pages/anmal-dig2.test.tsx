import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import AnmalDig2Page from "./anmal-dig2";

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return render(
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AnmalDig2Page />
        </MemoryRouter>
      </QueryClientProvider>
    </HelmetProvider>,
  );
}

describe("AnmalDig2Page (Anmälan → embedded Google Form iframe)", () => {
  beforeEach(() => {
    // /anmal-dig2 does not fetch slots, but the layout is harmless without it.
    vi.stubGlobal("fetch", vi.fn());
  });
  afterEach(() => vi.unstubAllGlobals());

  it("renders the Google Form iframe with the embedded=true URL", () => {
    renderPage();
    const iframe = screen.getByTitle(
      /Anmälan till Bridge by FC Rosengård/i,
    ) as HTMLIFrameElement;
    expect(iframe).toBeInTheDocument();
    expect(iframe.src).toContain("docs.google.com/forms");
    expect(iframe.src).toContain("embedded=true");
  });

  it("keeps the shared page chrome (hero + steps heading)", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: /Ta första steget/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Vad händer sen/i })).toBeInTheDocument();
  });
});
