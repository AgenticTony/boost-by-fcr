import { useSeo } from "@/hooks/use-seo";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnmalDemoLayout } from "@/components/anmal-demo-layout";

/**
 * Live Anmälan page (/anmal-dig2) - embeds Anna's real Google Form via an
 * iframe. This is the ONLY approach that reliably delivers to the Google Form:
 * Google's own UI satisfies the built-in "E-post" collector and the reCAPTCHA
 * check that block programmatic POSTs (the native /anmal-dig form is rejected
 * with HTTP 400; see memory: dynamic-integrations-scope).
 *
 * Interim solution while the Supabase backend (/anmal-dig3) is wired up - all
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
      "Ta första steget - det tar tre minuter. Vi hör av oss inom en arbetsdag.",
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
            <div className="rounded-2xl border border-border/60 shadow-sm bg-white">
              {/*
                Height is hardcoded per breakpoint because the embed is
                cross-origin: Google does not postMessage its content height,
                so the iframe cannot size itself and any single fixed height
                either clips the form or leaves a large gap.

                Measured heights of the rendered form, by iframe width:
                  270px -> 3419   325px -> 3143   375px -> 2931
                  500px -> 2693   574px -> 2614   672px -> 2511
                The iframe is ~viewport-50px until the max-w-2xl container
                caps it at ~574px from the sm breakpoint up, hence three
                tiers. Values carry a small buffer over the measurement.

                scrolling is left at the default (auto) rather than "no": in
                the normal state these heights mean no scrollbar appears,
                which is the point, but if Google reflows the form (added
                question, or inline validation errors expanding fields) auto
                degrades to a scrollbar instead of silently clipping the
                submit button. If the form is edited, re-measure.
              */}
              <iframe
                src={GOOGLE_FORM_EMBED_URL}
                title="Anmälan till Bridge by FC Rosengård"
                className="w-full h-[3500px] xs:h-[3200px] sm:h-[2700px] border-0 bg-white"
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
