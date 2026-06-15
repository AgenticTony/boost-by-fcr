import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { useSeo } from "./use-seo";

function renderWithHelmet(ui: React.ReactElement) {
  return render(<HelmetProvider>{ui}</HelmetProvider>);
}

function SeoTestPage(props: Parameters<typeof useSeo>[0]) {
  return <>{useSeo(props)}</>;
}

describe("useSeo", () => {
  it("renders title and description meta tags", () => {
    renderWithHelmet(
      <SeoTestPage title="Kontakt" description="Kontakta oss" />,
    );

    // Helmet renders into document head asynchronously
    // We check the helmet state via the rendered output
    const helmet = document.querySelector('meta[name="description"]');
    expect(helmet?.getAttribute("content")).toBe("Kontakta oss");
  });

  it("renders OpenGraph tags", () => {
    renderWithHelmet(
      <SeoTestPage title="Om oss" description="Om Boost" image="/og.png" />,
    );

    const ogTitle = document.querySelector('meta[property="og:title"]');
    expect(ogTitle?.getAttribute("content")).toContain("Om oss");

    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogImage?.getAttribute("content")).toBe("/og.png");

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    expect(ogLocale?.getAttribute("content")).toBe("sv_SE");
  });

  it("renders canonical URL when provided", () => {
    renderWithHelmet(
      <SeoTestPage title="Test" description="Test" canonical="/kontakt" />,
    );

    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute("href")).toBe(
      "https://boostbyfcr.se/kontakt",
    );
  });

  it("renders JSON-LD structured data", () => {
    renderWithHelmet(<SeoTestPage title="Test" description="Test" />);

    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    expect(scripts.length).toBeGreaterThanOrEqual(1);

    const parsed = JSON.parse(scripts[0].textContent || "{}");
    expect(parsed["@type"]).toBe("NGO");
    expect(parsed.name).toBe("Boost by FC Rosengård");
  });

  it("includes custom JSON-LD when provided", () => {
    renderWithHelmet(
      <SeoTestPage
        title="Test"
        description="Test"
        jsonLd={{ "@type": "WebPage", name: "Test Page" }}
      />,
    );

    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    expect(scripts.length).toBe(2);
  });
});
