import { Helmet } from "react-helmet-async";

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Boost by FC Rosengård",
  url: "https://boostbyfcr.se",
  logo: "https://boostbyfcr.se/images/boost-logo.svg",
  description:
    "Idéburen organisation med bas i Malmö sedan 2003. Vi arbetar för att öka inkluderingen i samhället.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Norra Grängesbergsgatan 15",
    addressLocality: "Malmö",
    postalCode: "214 50",
    addressCountry: "SE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@boostbyfcr.se",
    telephone: "+46-70-992-17-66",
    contactType: "customer service",
  },
  foundingDate: "2003",
  sameAs: [
    "https://www.instagram.com/boostbyfcrosengard/",
    "https://www.linkedin.com/company/boost-by-fc-rosengard/",
    "https://www.facebook.com/boostbyfcrosengard/",
  ],
};

type SeoProps = {
  title: string;
  description: string;
  /** Relative path for canonical URL (e.g. "/kontakt"). Prepended with site origin. */
  canonical?: string;
  /** Full URL to the og:image for social sharing. */
  image?: string;
  jsonLd?: Record<string, unknown>;
};

/**
 * Renders page-specific <Helmet> meta tags and JSON-LD structured data.
 *
 * Despite the `use` prefix this is not a React hook — it returns JSX.
 * Kept as a function for backwards compatibility with existing page imports.
 *
 * @example
 *   useSeo({ title: "Kontakt", description: "..." })
 */
export function useSeo({
  title,
  description,
  canonical,
  image,
  jsonLd,
}: SeoProps) {
  const structuredData = jsonLd ? [ORG_JSON_LD, jsonLd] : [ORG_JSON_LD];
  const siteOrigin = "https://boostbyfcr.se";
  const defaultImage = `${siteOrigin}/images/boost-logo.svg`;

  return (
    <Helmet>
      <title>{title} | Boost by FC Rosengård</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | Boost by FC Rosengård`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="sv_SE" />
      <meta property="og:image" content={image || defaultImage} />
      {canonical && (
        <>
          <link rel="canonical" href={`${siteOrigin}${canonical}`} />
          <meta property="og:url" content={`${siteOrigin}${canonical}`} />
        </>
      )}
      {structuredData.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data).replace(/<\//g, "<\\/"),
          }}
        />
      ))}
    </Helmet>
  );
}
