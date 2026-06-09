import { Helmet } from "react-helmet-async";

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Boost by FC Rosengård",
  url: "https://boostfcrosengard.se",
  logo: "https://boostfcrosengard.se/images/boost-logo.svg",
  description:
    "Idéburen organisation med bas i Malmö sedan 2003. Vi arbetar för att öka inkluderingen i samhället.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Engelbrektsgatan 6",
    addressLocality: "Malmö",
    postalCode: "211 33",
    addressCountry: "SE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@boostfcrosengard.se",
    telephone: "+46-40-611-16-60",
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
  jsonLd?: Record<string, unknown>;
};

export function useSeo({ title, description, jsonLd }: SeoProps) {
  const structuredData = jsonLd ? [ORG_JSON_LD, jsonLd] : [ORG_JSON_LD];

  return (
    <Helmet>
      <title>{title} | Boost by FC Rosengård</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | Boost by FC Rosengård`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="sv_SE" />
      {structuredData.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
