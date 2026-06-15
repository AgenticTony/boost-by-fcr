import type { ReactNode } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import AnmalDigPage from "./anmal-dig";
import KontaktPage from "./kontakt";

// Mock the submit functions so we can drive the forms into the failure path
// (the real adapter always succeeds).
vi.mock("@/api/client", () => ({
  submitRegistration: vi.fn(),
  submitContact: vi.fn(),
}));

import * as api from "@/api/client";

function renderPage(node: ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });
  return render(
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>{node}</MemoryRouter>
      </QueryClientProvider>
    </HelmetProvider>,
  );
}

const submitForm = () => fireEvent.submit(document.querySelector("form")!);

async function fillAnmalDig(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/Förnamn/i), "Anna");
  await user.type(screen.getByLabelText(/Efternamn/i), "Andersson");
  await user.type(screen.getByLabelText(/E-post/i), "anna@test.se");
  await user.type(screen.getByLabelText(/Telefon/i), "070-123 45 67");
  await user.selectOptions(
    screen.getByLabelText(/Vilket spår/i),
    "Arbetsspåret",
  );
}

async function fillKontakt(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^Namn/i), "Anna Andersson");
  await user.type(screen.getByLabelText(/E-post/i), "anna@test.se");
  await user.selectOptions(screen.getByLabelText(/Ämne/i), "Allmän fråga");
  await user.type(screen.getByLabelText(/Meddelande/i), "Hej!");
}

describe("forms — server failure path", () => {
  it("anmal-dig shows an error when submission throws", async () => {
    const user = userEvent.setup();
    vi.mocked(api.submitRegistration).mockRejectedValue(
      new Error("server down"),
    );
    renderPage(<AnmalDigPage />);
    await fillAnmalDig(user);
    submitForm();
    await waitFor(() =>
      expect(screen.getByText(/Något gick fel/i)).toBeInTheDocument(),
    );
  });

  it("anmal-dig shows an error when the backend rejects (success:false)", async () => {
    const user = userEvent.setup();
    vi.mocked(api.submitRegistration).mockResolvedValue({
      success: false,
      delivered: false,
    });
    renderPage(<AnmalDigPage />);
    await fillAnmalDig(user);
    submitForm();
    await waitFor(() =>
      expect(screen.getByText(/Något gick fel/i)).toBeInTheDocument(),
    );
  });

  it("kontakt shows an error when submission throws", async () => {
    const user = userEvent.setup();
    vi.mocked(api.submitContact).mockRejectedValue(new Error("server down"));
    renderPage(<KontaktPage />);
    await fillKontakt(user);
    submitForm();
    await waitFor(() =>
      expect(screen.getByText(/Något gick fel/i)).toBeInTheDocument(),
    );
  });
});
