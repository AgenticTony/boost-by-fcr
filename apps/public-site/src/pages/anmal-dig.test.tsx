import { describe, it, expect } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import AnmalDigPage from "./anmal-dig";

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });

  return render(
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AnmalDigPage />
        </MemoryRouter>
      </QueryClientProvider>
    </HelmetProvider>,
  );
}

/** Submit the form directly via fireEvent to bypass jsdom native validation */
function submitForm() {
  const form = document.querySelector("form")!;
  fireEvent.submit(form);
}

describe("AnmalDigPage (Registration form)", () => {
  it("renders the form with all fields", () => {
    renderPage();
    expect(screen.getByLabelText(/Förnamn/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Efternamn/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-post/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Telefon/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Vilket spår/i)).toBeInTheDocument();
  });

  it("renders submit button", () => {
    renderPage();
    expect(
      screen.getByRole("button", { name: /Skicka anmälan/i }),
    ).toBeInTheDocument();
  });

  it("shows validation errors on empty submit", async () => {
    renderPage();

    submitForm();

    await waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      expect(alerts.length).toBeGreaterThanOrEqual(1);
    });
  });

  it("shows error for invalid email", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText(/Förnamn/i), "Anna");
    await user.type(screen.getByLabelText(/Efternamn/i), "Test");
    await user.type(screen.getByLabelText(/E-post/i), "not-an-email");
    await user.type(screen.getByLabelText(/Telefon/i), "0701234567");
    await user.selectOptions(
      screen.getByLabelText(/Vilket spår/i),
      "Arbetsspåret",
    );

    submitForm();

    await waitFor(() => {
      expect(screen.getByText(/giltig e-postadress/i)).toBeInTheDocument();
    });
  });

  it("shows error for short phone number", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText(/Telefon/i), "123");

    submitForm();

    await waitFor(() => {
      expect(screen.getByText(/giltigt telefonnummer/i)).toBeInTheDocument();
    });
  });

  it("shows success state after valid submission", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByLabelText(/Förnamn/i), "Anna");
    await user.type(screen.getByLabelText(/Efternamn/i), "Andersson");
    await user.type(screen.getByLabelText(/E-post/i), "anna@test.se");
    await user.type(screen.getByLabelText(/Telefon/i), "070-123 45 67");
    await user.selectOptions(
      screen.getByLabelText(/Vilket spår/i),
      "Arbetsspåret",
    );

    submitForm();

    await waitFor(
      () => {
        expect(
          screen.getByText(/Tack — vi hör av oss snart/i),
        ).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });

  it("has track options in select", () => {
    renderPage();
    const select = screen.getByLabelText(/Vilket spår/i) as HTMLSelectElement;

    expect(select).toBeInTheDocument();
    expect(screen.getByText("Arbetsspåret")).toBeInTheDocument();
    expect(screen.getByText("Studiespåret")).toBeInTheDocument();
    expect(screen.getByText("Hälsospåret")).toBeInTheDocument();
  });

  it("has honeypot field hidden from users", () => {
    renderPage();
    const honeypot = document.querySelector(
      'input[name="website"]',
    ) as HTMLInputElement;
    expect(honeypot).toBeInTheDocument();
    expect(honeypot.tabIndex).toBe(-1);
  });
});
