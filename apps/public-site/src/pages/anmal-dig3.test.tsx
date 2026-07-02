import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import AnmalDig3Page from "./anmal-dig3";

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return render(
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AnmalDig3Page />
        </MemoryRouter>
      </QueryClientProvider>
    </HelmetProvider>,
  );
}

function submitForm() {
  fireEvent.submit(document.querySelector("form")!);
}

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/För- och efternamn/i), "Anna Andersson");
  await user.type(screen.getByLabelText(/Personnummer/i), "990101-1234");
  await user.type(screen.getByLabelText(/^Telefonnummer$/i), "070-123 45 67");
  await user.type(screen.getByLabelText(/Mejladress/i), "anna@test.se");
  await user.type(screen.getByLabelText(/Handläggare, namn/i), "Maria Vägledare");
  await user.type(screen.getByLabelText(/Handläggare, mejl/i), "maria@boostbyfcr.se");
  await user.selectOptions(
    screen.getByLabelText(/inskrivningsmöte/i),
    "4 september kl 9:00",
  );
  await user.click(screen.getByLabelText(/godkänner behandling/i));
}

describe("AnmalDig3Page (Anmälan → /api/submit → Supabase)", () => {
  // Configurable response for the POST /api/submit call. /api/slots is stubbed
  // to empty so the page keeps its fallback slots.
  let submitResponse: Record<string, unknown>;
  let submitCalls: { url: string; body: unknown }[];
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    submitResponse = { ok: true, delivered: true };
    submitCalls = [];
    fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      const u = String(url);
      if (u.includes("/api/slots")) {
        return { ok: true, json: () => Promise.resolve({ slots: [] }) };
      }
      if (u.includes("/api/submit")) {
        submitCalls.push({ url: u, body: init?.body ? JSON.parse(String(init.body)) : null });
        return { ok: true, json: () => Promise.resolve(submitResponse) };
      }
      return { ok: true, json: () => Promise.resolve({}) };
    });
    vi.stubGlobal("fetch", fetchMock);
  });
  afterEach(() => vi.unstubAllGlobals());

  it("renders the on-brand form and the Supabase demo banner", () => {
    renderPage();
    expect(
      screen.getByRole("button", { name: /Skicka anmälan/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Lösning B · Supabase-backend/i)).toBeInTheDocument();
  });

  it("shows green success when /api/submit reports delivered", async () => {
    const user = userEvent.setup();
    renderPage();
    await fillValidForm(user);
    submitForm();
    await waitFor(() =>
      expect(screen.getByText(/din anmälan är mottagen/i)).toBeInTheDocument(),
    );
    // Posted to our own endpoint, not Google.
    expect(submitCalls).toHaveLength(1);
    expect(submitCalls[0].url).toContain("/api/submit");
  });

  it("shows the honest demo-mode notice when Supabase is not configured", async () => {
    submitResponse = { ok: true, delivered: false, demoMode: true };
    const user = userEvent.setup();
    renderPage();
    await fillValidForm(user);
    submitForm();
    await waitFor(() =>
      expect(screen.getByText(/Demoläge: Supabase inte ansluten/i)).toBeInTheDocument(),
    );
  });

  it("shows an inline error when /api/submit returns ok:false", async () => {
    submitResponse = { ok: false, error: "Kunde inte spara anmälan just nu." };
    const user = userEvent.setup();
    renderPage();
    await fillValidForm(user);
    submitForm();
    await waitFor(() =>
      expect(screen.getByText(/Kunde inte spara anmälan/i)).toBeInTheDocument(),
    );
    // Form should still be visible (no success screen).
    expect(screen.getByRole("button", { name: /Skicka anmälan/i })).toBeInTheDocument();
  });

  it("blocks an invalid submit and never calls /api/submit", async () => {
    renderPage();
    submitForm();
    await waitFor(() => {
      expect(screen.getAllByRole("alert").length).toBeGreaterThanOrEqual(1);
    });
    expect(submitCalls).toHaveLength(0);
  });

  it("forwards the consent flag and meeting time to the backend", async () => {
    const user = userEvent.setup();
    renderPage();
    await fillValidForm(user);
    submitForm();
    await waitFor(() =>
      expect(screen.getByText(/din anmälan är mottagen/i)).toBeInTheDocument(),
    );
    const body = submitCalls[0].body as Record<string, unknown>;
    expect(body.consent).toBe(true);
    expect(body.meetingTime).toBe("4 september kl 9:00");
  });
});
