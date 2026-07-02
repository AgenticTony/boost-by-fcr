import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import VanligaFragorPage from "./vanliga-fragor";

function renderPage() {
  return render(
    <HelmetProvider>
      <MemoryRouter>
        <VanligaFragorPage />
      </MemoryRouter>
    </HelmetProvider>,
  );
}

describe("VanligaFragorPage (FAQ)", () => {
  it("renders the hero heading", () => {
    renderPage();
    expect(
      screen.getByRole("heading", { name: /^Vanliga frågor$/i }),
    ).toBeInTheDocument();
  });

  it("renders all three FAQ section headings", () => {
    renderPage();
    expect(
      screen.getByRole("heading", { name: "Om Boost" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Arbete & studier" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Praktiskt" }),
    ).toBeInTheDocument();
  });

  it("renders questions as accordion triggers", () => {
    renderPage();
    expect(
      screen.getByRole("button", {
        name: /Vad är Boost by FC Rosengård\?/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Hur anmäler jag mig\?/i }),
    ).toBeInTheDocument();
  });

  it("links to contact and registration from the bottom CTA", () => {
    renderPage();
    expect(screen.getByRole("link", { name: /Kontakta oss/i })).toHaveAttribute(
      "href",
      "/kontakt",
    );
    expect(screen.getByRole("link", { name: /Anmäl dig/i })).toHaveAttribute(
      "href",
      "/anmal-dig2",
    );
  });
});
