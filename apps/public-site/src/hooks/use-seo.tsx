import { Helmet } from "react-helmet-async";

export function useSeo({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Helmet>
      <title>{title} | Boost by FC Rosengård</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | Boost by FC Rosengård`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="sv_SE" />
    </Helmet>
  );
}
