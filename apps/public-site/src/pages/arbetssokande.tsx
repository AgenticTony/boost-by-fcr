import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

const faqItems = [
  {
    q: "Om jag vill plugga?",
    a: "På Boost har vi både pedagoger och studie- och yrkesvägledare som du kan träffa hos oss. Du kan få både hjälp med att studera enskilda ämnen som matte eller svenska, förbereda dig inför högskoleprovet eller söka till utbildningar. Visste du att vi också har körkortsteori på Boost?",
  },
  {
    q: "Är era deltagare nöjda?",
    a: "Vi hoppas det! I en enkät som en extern utvärderare gjorde fick vi 8 av 10 på en nöjdhetsskala. Vi lyssnar hela tiden på våra deltagare och försöker att anpassa vad vi gör och erbjuder för att det ska passa våra deltagare.",
  },
  {
    q: "Om jag inte vet vad jag vill göra i framtiden, kan ni hjälpa mig?",
    a: "Absolut! Det är vanligt att deltagare som kommer till oss är osäkra på vad de vill jobba med. När du träffar din vägledare eller någon här på Boost kan du diskutera olika möjligheter och vägar. Vi har också workshops som handlar om just att få dig att komma på vad du vill.",
  },
  {
    q: "Samarbetar ni med Arbetsförmedlingen?",
    a: "Vi samarbetar nära med arbetsförmedlingen. De anvisar dig som arbetssökande till oss så att vi kan ge dig stöd. Våra vägledare ger sedan återkoppling till dem om hur det går för dig. Om du behöver stöd i kontakten med exempelvis kommunen så finns vi med dig.",
  },
];

export default function ArbetssokandePage() {
  useSeo({
    title: "Arbetssökande",
    description:
      "På Boost hjälper vi dig att stärka dig själv och din kompetens så att du lättare kommer in på arbetsmarknaden.",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <img
            src="/images/Arbetssoekande1.jpg"
            alt="Person som tar steget in i arbetslivet med stöd från Boost"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl" />
        <div className="container-page relative py-20 md:py-28">
          <p className="text-xs font-body font-medium text-brand-red tracking-widest uppercase mb-4">
            För arbetssökande
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-tight mb-4">
            Väx på ditt sätt hos oss
          </h1>
          <p className="text-lg text-white/75 max-w-lg leading-relaxed mb-8">
            På Boost hjälper vi dig att stärka dig själv och din kompetens så
            att du lättare kommer in på arbetsmarknaden. Oavsett om du vill
            jobba eller studera anpassar vi våra insatser efter dina mål och
            behov.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-brand-red text-white hover:bg-brand-red/90 font-display font-semibold rounded-cta px-8 h-12 shadow-lg shadow-brand-red/20"
          >
            <Link to="/anmal-dig">
              Anmäl dig här <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Vårt arbetssätt — Anna's new copy */}
      <section className="py-12 md:py-16">
        <div className="container-page max-w-3xl">
          <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-6">
            Vårt arbetssätt
          </h2>
          <div className="space-y-5 text-text-muted leading-relaxed">
            <p>
              Alla är bra på olika saker och har olika mål i livet. Därför går
              det inte heller att behandla alla samma på samma sätt. Det är vi
              medvetna om på Boost. När du kommer till oss väljer du vilket stöd
              du vill ha så att de aktiviteter du deltar i anpassade för just
              dig. Du får en personlig vägledare som hjälper dig att göra en
              plan för din tid hos oss, och att sätta upp mål för framtiden.
            </p>
            <p>
              Som deltagare i Boost får du själv vara med och ta ett stort
              ansvar för vad du gör när du är här. Du får också utveckla din
              förmåga att se möjligheter, ta initiativ, lösa problem och göra
              handling av dina idéer. Till din hjälp har du våra vägledare,
              pedagoger och all annan personal hos oss som peppar och pushar dig
              mot dina mål.
            </p>
            <p>
              Våra insatser finns inom tre spår: <strong>arbete</strong>,{" "}
              <strong>studier</strong> och <strong>hälsa</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ — Anna's specific questions */}
      <section id="faq" className="py-12 md:py-16 bg-muted/60">
        <div className="container-page max-w-2xl">
          <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-10">
            Vanliga frågor
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
