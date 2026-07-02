import { Helmet } from "react-helmet-async";
import { useSeo } from "@/hooks/use-seo";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnmalDemoLayout } from "@/components/anmal-demo-layout";

/**
 * DEMO variant (/anmal-dig2) — "Lösning A": embed Anna's real Google Form via
 * an iframe. This is the ONLY approach that reliably delivers to the Google
 * Form, because Google's own UI satisfies the built-in "E-post" collector and
 * the reCAPTCHA check that block programmatic POSTs (the live /anmal-dig posts
 * are rejected with HTTP 400; see memory: dynamic-integrations-scope).
 *
 * Trade-off vs the on-brand form: the respondent sees Google's form styling,
 * not the Boost brand. The surrounding page (hero, trust bar, steps) is
 * identical to /anmal-dig.
 *
 * `embedded=true` strips Google's page chrome so only the form renders.
 */
const GOOGLE_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeXgSD42m6JLWIna8yE7C03qD4h_I-6TdPC-Mr3MWpS5mZ8lQ/viewform?embedded=true";

export default function AnmalDig2Page() {
  // noindex — this is a team demo route, not a public landing page.
  useSeo({
    title: "Anmäl dig (demo — Google Formulär)",
    description:
      "Demovariant: inbäddat Google-formulär. Anmälan landar i Annas Google Form via Googles eget gränssnitt.",
    canonical: "/anmal-dig2",
  });

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AnmalDemoLayout
        solutionLabel="Lösning A · Inbäddat Google-formulär"
        solutionNote="Anna får anmälningarna i sin Google Form — pålitligt, men med Googles utseende">
        <section className="py-16 md:py-24 bg-white">
          <div className="container-page max-w-2xl">
            <ScrollReveal>
              <h2 className="text-3xl md:text-[2.75rem] font-display font-extrabold text-text mb-4">
                Fyll i dina uppgifter
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl border border-border/60 shadow-sm overflow-hidden bg-white">
                <iframe
                  src={GOOGLE_FORM_EMBED_URL}
                  title="Anmälan till Bridge by FC Rosengård"
                  className="w-full min-h-[1150px] border-0 bg-white"
                  loading="lazy">
                  Laddar formuläret…
                </iframe>
              </div>
              <p className="mt-4 text-xs text-text-muted leading-relaxed">
                <span className="font-semibold">Om den här demon:</span>{" "}
                formuläret nedan är Annas riktiga Google Formulär, inbäddat i en
                ram. Det skickar allting direkt till hennes kalkylblad —
                inklusive den inbyggda e-postkontrollen och reCAPTCHA som Google
                hanterar automatiskt. Du märker att utseendet är Googles, inte
                Boosts.
              </p>
            </ScrollReveal>
          </div>
        </section>
      </AnmalDemoLayout>
    </>
  );
}
