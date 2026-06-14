import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dumbbell, Apple, Moon, Brain } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

const features = [
  {
    icon: Dumbbell,
    title: "Fysisk träning",
    body: "Gymträning, klättring, thaiboxning och mer. Du provar aktiviteter du kanske aldrig testat, utmanar dig fysiskt och märker snabbt vad kroppen klarar av — och tycker om.",
  },
  {
    icon: Apple,
    title: "Kost och näring",
    body: "Vi håller workshops om vad du äter och hur det påverkar din energi, koncentration och humör. Inga dieter, inga pekpinnar — bara faktabaserad kunskap du faktiskt kan använda.",
  },
  {
    icon: Moon,
    title: "Sömn och återhämtning",
    body: "Sömnbrist påverkar allt — från motivation till minnesfunktion. Vi pratar om varför sömn är avgörande och ger dig konkreta verktyg för att förbättra den.",
  },
  {
    icon: Brain,
    title: "Psykiskt välmående",
    body: "I öppna samtal och workshops pratar vi om stress, självförtroende, motivation och hur träning påverkar ditt mående. Du är inte ensam om det du känner — och det ska du inte behöva vara.",
  },
];

export default function HalsosparetPage() {
  useSeo({
    title: "Hälsospåret",
    description:
      "Fysisk träning, kostworkshops, sömnstöd och samtal om välmående. För att orka ta nästa steg måste du må bra.",
  });

  return (
    <>
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <img
            src="/images/Haelsospaaret3.jpeg"
            alt="Hälsa och rörelse — deltagare tränar tillsammans"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-brand-navy/10 blur-3xl" />
        <div className="container-page relative py-20 md:py-28">
          <p className="text-xs font-body font-medium text-brand-navy tracking-widest uppercase mb-4">
            Hälsospåret
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-tight mb-4">
            Kropp och knopp i balans
          </h1>
          <p className="text-lg text-white/75 max-w-lg leading-relaxed">
            För att orka ta nästa steg måste du må bra. Vi hjälper dig dit.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-6">
                Hälsa är inte ett sidospår — det är grunden
              </h2>
              <div className="space-y-5 text-text-muted leading-relaxed">
                <p>
                  Forskningen är tydlig: ohälsa och arbetslöshet förstärker
                  varandra i en negativ spiral. Det vet vi på Boost — och det är
                  varför hälsa är en lika stor del av vår verksamhet som studier
                  och jobbsökning. Hälsospåret är för dig som vill röra på
                  kroppen, äta bättre, sova bättre eller bara hitta ett
                  sammanhang där du trivs.
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="rounded-2xl overflow-hidden bg-[#C0C7DA]/20 p-6">
                <img
                  src="/images/illustration-tree-of-life.jpg"
                  alt="Livets träd — symbol för hälsa, tillväxt och rötter"
                  className="w-full h-auto rounded-xl object-contain max-h-72 mx-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-navy text-white">
        <div className="container-page py-10 md:py-12">
          <div className="grid grid-cols-3 gap-6 md:gap-8 text-center">
            {[
              { number: "Fysisk", label: "Träning ingår" },
              { number: "Kost", label: "Workshops" },
              { number: "Samtal", label: "Om välmående" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-display font-extrabold text-brand-red tracking-tight">
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
        <div className="container-page">
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-[#072D59]/5 rounded-3xl p-8 md:p-10"
              >
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-brand-navy text-white mb-5">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold text-lg text-text mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-page max-w-3xl">
          <h2 className="text-3xl font-display font-extrabold text-text mb-5">
            En trygg plats att börja från
          </h2>
          <p className="text-text-muted leading-relaxed mb-8">
            Hälsospåret är inte ett program du måste prestera i. Det är en plats
            att hitta energi, gemenskap och tron på att du kan. Välkommen som du
            är.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-brand-navy text-white hover:bg-brand-navy/90 font-display font-semibold rounded-cta px-8 h-12"
          >
            <Link to="/anmal-dig">
              Börja din resa <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
