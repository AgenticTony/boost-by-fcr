import { Mail } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { WaveDivider } from "@/components/ui/wave-divider";

export default function LedigaTjansterPage() {
  useSeo({
    title: "Lediga tjänster",
    description:
      "Jobba hos oss — vi söker människor som tror på vad vi tror på.",
    canonical: "/lediga-tjanster",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-brand-navy/10 blur-3xl" />
        <div className="container-page relative py-20 md:py-28">
          <ScrollReveal>
            <p className="text-xs font-body font-medium text-brand-red-bright tracking-widest uppercase mb-4">
              Karriär
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-tight mb-4">
              Jobba hos oss
            </h1>
            <p className="text-lg text-white/75 max-w-lg leading-relaxed">
              Vi söker människor som tror på vad vi tror på.
            </p>
          </ScrollReveal>
        </div>
        <WaveDivider color="navy" layered />
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-page max-w-3xl">
          <ScrollReveal>
            <h2 className="text-3xl md:text-[2.75rem] font-display font-extrabold text-text mb-6">
              Bli en del av Boost
            </h2>
            <div className="space-y-5 text-text-muted leading-relaxed mb-10">
              <p>
                Att jobba på Boost är inte ett vanligt jobb. Det är ett val. Du
                möter människor i verkliga utmaningar och du ser verkliga
                resultat — i form av ett nytt jobb, ett nytt betyg, eller ett
                leende från någon som hittat sin riktning.
              </p>
              <p>
                Vi söker engagerade, ödmjuka och handlingskraftiga människor som
                vill vara en del av det arbetet. Har du rätt inställning och
                rätt kompetens, vill vi gärna träffa dig.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h3 className="font-display font-semibold text-text text-lg mb-6">
              Aktuella tjänster
            </h3>
            <div className="bg-surface rounded-2xl p-8 md:p-10 text-center border border-border/60">
              <p className="text-text-muted leading-relaxed">
                Just nu har vi inga lediga tjänster, men vi tar emot
                spontanansökningar.
              </p>
              <p className="text-text-muted text-sm mt-4">
                Skicka ditt CV och ett kort personligt brev till{" "}
                <a
                  href="mailto:info@boostbyfcr.se"
                  className="text-brand-navy hover:underline font-medium"
                >
                  info@boostbyfcr.se
                </a>
              </p>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-text-muted">
                <Mail className="h-4 w-4 text-brand-red" />
                <a
                  href="mailto:info@boostbyfcr.se"
                  className="text-brand-navy hover:underline font-medium"
                >
                  info@boostbyfcr.se
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
