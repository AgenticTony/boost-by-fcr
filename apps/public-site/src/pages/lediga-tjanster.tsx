import { Mail } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

export default function LedigaTjansterPage() {
  useSeo({
    title: "Lediga tjänster",
    description:
      "Jobba hos oss — vi söker människor som tror på vad vi tror på.",
  });

  return (
    <>
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="container-page relative py-20 md:py-28">
          <h1 className="text-4xl md:text-5xl font-display font-extrabold leading-tight mb-4">
            Jobba hos oss
          </h1>
          <p className="text-lg text-white/75 max-w-lg leading-relaxed">
            Vi söker människor som tror på vad vi tror på.
          </p>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container-page max-w-3xl">
          <h2 className="text-3xl font-display font-extrabold text-text mb-6">
            Bli en del av Boost
          </h2>
          <div className="space-y-5 text-text-muted leading-relaxed mb-10">
            <p>
              Att jobba på Boost är inte ett vanligt jobb. Det är ett val. Du
              möter människor i verkliga utmaningar och du ser verkliga resultat
              — i form av ett nytt jobb, ett nytt betyg, eller ett leende från
              någon som hittat sin riktning.
            </p>
            <p>
              Vi söker engagerade, ödmjuka och handlingskraftiga människor som
              vill vara en del av det arbetet. Har du rätt inställning och rätt
              kompetens, vill vi gärna träffa dig.
            </p>
          </div>
          <h3 className="font-display font-semibold text-text text-lg mb-6">
            Aktuella tjänster
          </h3>
          <div className="bg-muted/60 rounded-2xl p-8 text-center border border-border/60">
            <p className="text-text-muted leading-relaxed">
              Just nu har vi inga lediga tjänster, men vi tar emot
              spontanansökningar.
            </p>
            <p className="text-text-muted text-sm mt-4">
              Skicka ditt CV och ett kort personligt brev till{" "}
              <a
                href="mailto:info@boostbyfcr.se"
                className="text-brand-teal hover:underline font-medium"
              >
                info@boostbyfcr.se
              </a>
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-text-muted">
              <Mail className="h-4 w-4 text-brand-gold" />
              <a
                href="mailto:info@boostbyfcr.se"
                className="text-brand-teal hover:underline font-medium"
              >
                info@boostbyfcr.se
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
