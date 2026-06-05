import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

const faqItems = [
  {
    q: "Jag vet inte vad jag vill göra. Kan ni hjälpa mig att komma på det?",
    a: "Absolut — och du är långt ifrån ensam om det. Att komma till oss utan en klar riktning är helt okej. Din vägledare hjälper dig att utforska vad du är bra på, vad som motiverar dig och vilka vägar som finns framåt. Vi har också workshops som är just för det här.",
  },
  {
    q: "Hur stor är chansen att jag får jobb om jag kommer till er?",
    a: "Stor. Vi har ett brett nätverk av arbetsgivare som aktivt kontaktar oss när de söker kandidater, och vi gör allt vi kan för att matcha rätt person med rätt tjänst. Varje år går 200 till 300 av våra deltagare vidare till anställning.",
  },
  {
    q: "Vad händer om jag hellre vill börja studera?",
    a: "Då hjälper vi dig med det. Hos oss finns legitimerade lärare och studie-/yrkesvägledare som stöttar dig med allt från enskilda ämnen som matte och svenska, till förberedelse inför högskoleprovet eller ansökan till Komvux och folkhögskola. Varje år lämnar 100 till 150 deltagare Boost för att börja studera.",
  },
  {
    q: "Hur hjälper ni mig mot mitt drömyrke?",
    a: "Vilken typ av hjälp du behöver beror på vad ditt mål är — men vi börjar alltid med att lyssna. Sedan hjälper vi dig lägga en konkret plan: vilken utbildning som passar, hur du bygger nätverk i rätt bransch och hur du hittar en praktikplats som öppnar dörrar.",
  },
  {
    q: "Samarbetar ni med Arbetsförmedlingen och kommunen?",
    a: "Ja. Vi jobbar nära både Arbetsförmedlingen och Malmö stad. De anvisar deltagare till oss och vi rapporterar regelbundet om hur det går — så att du alltid har rätt stöd runt dig.",
  },
  {
    q: "Är era deltagare nöjda?",
    a: "Det verkar så. I en oberoende utvärdering fick vi 8 av 10 på nöjdhetsskalan. Vi är stolta över det — och vi vill bli bättre. Vi lyssnar kontinuerligt på våra deltagare för att förstå vad vi kan göra annorlunda.",
  },
];

export default function ArbetssokandePage() {
  useSeo({
    title: "Arbetsspåret",
    description:
      "CV-genomgång, intervjuträning och ett brett nätverk av arbetsgivare som aktivt söker våra deltagare.",
  });

  return (
    <>
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <img
            src="/images/Arbetssoekande1.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="container-page relative py-20 md:py-28">
          <p className="text-xs font-body font-medium text-brand-gold tracking-widest uppercase mb-4">
            Arbetsspåret
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-tight mb-4">
            Väx på ditt sätt hos oss
          </h1>
          <p className="text-lg text-white/75 max-w-lg leading-relaxed mb-8">
            Du behöver inte ha allt klart för dig. Du behöver bara ta första
            steget.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-display font-semibold rounded-cta px-8 h-12 shadow-lg shadow-brand-gold/20"
          >
            <Link to="/anmal-dig">
              Anmäl dig här <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-page max-w-3xl">
          <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-6">
            Stöd som passar dig — inte tvärtom
          </h2>
          <div className="space-y-5 text-text-muted leading-relaxed">
            <p>
              På Boost möter vi dig där du är. Oavsett om du är nära ett jobb
              eller studier, eller om du fortfarande letar efter riktningen —
              hos oss finns utrymme för dig. Du väljer tempo, du väljer insatser
              och du sätter dina egna mål. Vi är här för att göra den resan
              möjlig.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-navy text-white">
        <div className="container-page py-10 md:py-12">
          <div className="grid grid-cols-3 gap-6 md:gap-8 text-center">
            {[
              { number: "200–300", label: "Till anställning varje år" },
              { number: "Brett", label: "Nätverk av arbetsgivare" },
              { number: "8 av 10", label: "Nöjda deltagare" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-display font-extrabold text-brand-gold tracking-tight">
                  {stat.number}
                </p>
                <p className="mt-1 text-white/60 text-xs md:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/60">
        <div className="container-page max-w-3xl">
          <h2 className="text-3xl font-display font-extrabold text-text mb-6">
            Personligt stöd från dag ett
          </h2>
          <div className="space-y-5 text-text-muted leading-relaxed">
            <p>
              När du börjar hos oss börjar vi med att lyssna. Du matchas med en
              personlig vägledare som hjälper dig att ta reda på var du befinner
              dig, vart du vill och hur vi bäst kan stötta dig på vägen dit.
            </p>
            <p>
              Du deltar i de aktiviteter som är relevanta för just dig — inget
              standardupplägg, inga onödiga moment. Som deltagare på Boost
              förväntas du ta ansvar och engagera dig, och vi förväntas ge dig
              det bästa vi har att erbjuda. Det är så vi jobbar.
            </p>
          </div>
        </div>
      </section>

      <section id="faq" className="py-12 md:py-16">
        <div className="container-page max-w-2xl">
          <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-10">
            Det du undrar över — svarat
          </h2>
          <div className="space-y-0">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className={i > 0 ? "border-t border-border pt-8 mt-8" : ""}
              >
                <h3 className="font-display font-semibold text-base md:text-lg text-text mb-3">
                  {item.q}
                </h3>
                <p className="text-text-muted leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
