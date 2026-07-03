import { useSeo } from "@/hooks/use-seo";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnmalDemoLayout } from "@/components/anmal-demo-layout";

/**
 * Live Anmälan page (/anmal-dig2) — embeds Anna's real Google Form via an
 * iframe. This is the ONLY approach that reliably delivers to the Google Form:
 * Google's own UI satisfies the built-in "E-post" collector and the reCAPTCHA
 * check that block programmatic POSTs (the native /anmal-dig form is rejected
 * with HTTP 400; see memory: dynamic-integrations-scope).
 *
 * Interim solution while the Supabase backend (/anmal-dig3) is wired up — all
 * Anmälan CTAs route here. Trade-off: respondents see Google's form styling, not
 * the Boost brand. `embedded=true` strips Google's page chrome so only the form
 * renders. The surrounding page (hero, trust bar, steps) is shared via
 * AnmalDemoLayout.
 */
const GOOGLE_FORM_EMBED_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSeXgSD42m6JLWIna8yE7C03qD4h_I-6TdPC-Mr3MWpS5mZ8lQ/viewform?embedded=true";

export default function AnmalDig2Page() {
  useSeo({
    title: "Anmäl dig",
    description:
      "Ta första steget — det tar tre minuter. Vi hör av oss inom en arbetsdag.",
    canonical: "/anmal-dig2",
  });

  return (
    <AnmalDemoLayout>
      <section className="py-16 md:py-24 bg-white">
        <div className="container-page max-w-2xl">
          <ScrollReveal>
            <h2 className="text-3xl md:text-[2.75rem] font-display font-extrabold text-text mb-8">
              Fyll i dina uppgifter
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-border/60 shadow-sm overflow-hidden bg-white">
              <iframe
                src={GOOGLE_FORM_EMBED_URL}
                title="Anmälan till Bridge by FC Rosengård"
                className="w-full min-h-[1150px] border-0 bg-white"
                loading="lazy"
              >
                Laddar formuläret…
              </iframe>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </AnmalDemoLayout>
  );
}
