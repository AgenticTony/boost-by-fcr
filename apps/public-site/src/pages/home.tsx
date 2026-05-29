import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Briefcase, Heart } from "lucide-react";
import { LatestNews } from "@/components/sections/latest-news";
import { ResilientImage } from "@/components/ui/resilient-image";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const colorMap = {
  teal: { bg: "bg-brand-teal", hover: "group-hover:border-brand-teal/30" },
  gold: { bg: "bg-brand-gold", hover: "group-hover:border-brand-gold/30" },
  emerald: { bg: "bg-success", hover: "group-hover:border-success/30" },
} as const;

function TrackCard({
  href,
  icon: Icon,
  label,
  headline,
  teaser,
  color,
  image,
  imageAlt,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  headline: string;
  teaser: string;
  color: keyof typeof colorMap;
  image: string;
  imageAlt: string;
}) {
  const c = colorMap[color];
  return (
    <Link
      to={href}
      className={`group relative bg-white rounded-2xl overflow-hidden border border-border/60 ${c.hover} hover:shadow-lg transition-all duration-200 hover:-translate-y-1`}
    >
      <div className="relative h-48 overflow-hidden">
        <ResilientImage
          src={image}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          fallbackClassName="absolute inset-0 w-full h-full flex items-center justify-center bg-muted/40 text-text-muted/30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <div
            className={`inline-flex items-center justify-center h-9 w-9 rounded-lg ${c.bg} text-white`}
          >
            <Icon className="h-4 w-4" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-xs font-body font-medium text-text-muted tracking-wider uppercase mb-2">
          {label}
        </p>
        <h3 className="font-display font-semibold text-xl text-text mb-3 leading-snug">
          {headline}
        </h3>
        <p className="text-sm text-text-muted leading-relaxed">{teaser}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-navy group-hover:gap-2.5 transition-all">
          Läs mer <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

const funders = [
  { alt: "EU Socialfonden", src: "/images/eu-logo-jordbruksfonden.png" },
  { alt: "Allmänna Arvsfonden", src: "/images/af-logo.png" },
  { alt: "Malmö Stad", src: "/images/malmostad-logo2013-inv.png" },
  { alt: "FC Rosengård", src: "/images/FCR_logo_2014_CMYK.png" },
];

function FunderLogoBar() {
  return (
    <section className="bg-brand-navy">
      <div className="container-page py-12">
        <p className="text-center text-sm font-body font-medium text-white/60 mb-8">
          Finansieras och stöds av
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {funders.map((funder) => (
            <div
              key={funder.alt}
              className="flex items-center justify-center px-8 py-4 rounded-xl bg-white/5 border border-white/10 opacity-80 grayscale hover:opacity-100 hover:grayscale-0 hover:bg-white/10 transition-all duration-200"
              role="img"
              aria-label={funder.alt}
            >
              <img
                src={funder.src}
                alt={funder.alt}
                className="h-20 max-w-[160px] w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-brand-teal/8 blur-3xl" />

        <div className="container-page relative py-16 md:py-20 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-7">
              <div className="flex items-center gap-3">
                <span className="h-1 w-8 rounded-full bg-brand-gold" />
                <p className="text-sm font-body font-medium text-brand-gold tracking-widest uppercase">
                  Sedan 2003
                </p>
              </div>
              <h1 className="text-[2.75rem] sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-display font-extrabold leading-[1.08] tracking-tight">
                Din väg.
                <br />
                Ditt tempo.
                <br />
                <span className="text-brand-gold">Din framtid.</span>
              </h1>
              <p className="text-lg leading-relaxed text-white/75 max-w-md">
                Sedan 2003 har vi hjälpt tusentals unga i Malmö att hitta sin
                plats på arbetsmarknaden — genom stöd, engagemang och tron på
                varje persons förmåga.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-display font-semibold rounded-cta px-8 h-12 text-base shadow-lg shadow-brand-gold/20"
                >
                  <Link to="/anmal-dig">Anmäl dig</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="border-2 border-white/50 text-white hover:bg-white/10 hover:border-white/70 rounded-cta px-8 h-12 text-base font-display bg-transparent"
                >
                  <Link to="#program">Se vad vi erbjuder</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/images/hero1.jpg"
                  alt="Unga deltagare utomhus på Boost"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-brand-navy/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact counter strip */}
      <section className="relative bg-brand-navy text-white border-t-2 border-brand-gold/30">
        <div className="container-page py-14 md:py-16">
          <div className="flex flex-wrap justify-around gap-8 md:gap-4 text-center">
            {[
              { number: "200–300", label: "Deltagare får jobb varje år" },
              { number: "100–150", label: "Börjar studera varje år" },
              { number: "8 av 10", label: "Deltagare är nöjda med oss" },
              { number: "2003", label: "Sedan starten" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl md:text-5xl font-display font-extrabold text-brand-gold tracking-tight whitespace-nowrap">
                  {stat.number}
                </p>
                <p className="mt-2 text-white/60 text-sm md:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Så här jobbar vi — white */}
      <ScrollReveal>
        <section className="py-16 md:py-20 bg-white">
          <div className="container-page">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <p className="text-sm font-body font-medium text-brand-teal tracking-widest uppercase mb-4">
                  Vårt arbetssätt
                </p>
                <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-6">
                  Ingen behandlas likadant.
                  <br />
                  Det är poängen.
                </h2>
                <div className="space-y-4 text-text-muted leading-relaxed border-l-2 border-brand-gold/40 pl-5">
                  <p>
                    Alla kommer till oss med olika bakgrund, olika drömmar och
                    olika utmaningar. Därför bygger vi inte ett program och
                    hoppas att det passar alla — vi lyssnar på dig och anpassar
                    stödet efter vad just du behöver.
                  </p>
                  <p>
                    När du börjar på Boost får du en personlig vägledare som
                    hjälper dig att sätta upp mål och lägga en plan. Du väljer
                    själv vilka insatser du vill ta del av. Vi pushar dig
                    framåt, men det är du som sitter i förarsätet.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                  <img
                    src="/images/Vaar_ide.jpg"
                    alt="Vägledare och deltagare i samtal"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Tre spår — tint */}
      <ScrollReveal>
        <section id="program" className="py-16 md:py-20 bg-muted/60">
          <div className="container-page">
            <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-4">
              Välj ditt spår
            </h2>
            <p className="text-text-muted mb-14 max-w-xl leading-relaxed">
              Oavsett om du vill komma ut i jobb, slutföra dina studier eller
              stärka din hälsa — vi har ett spår för dig. Och du behöver inte
              välja bara ett.
            </p>
            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              <TrackCard
                href="/studier"
                icon={BookOpen}
                label="Studier"
                headline="Lär dig i din egen takt"
                teaser="Legitimerade lärare, individuell studieplanering och vägledning hela vägen från betygsöversyn till skolstart."
                color="teal"
                image="/images/Studiespaaret.jpg"
                imageAlt="Deltagare i klassrum på Boost"
              />
              <TrackCard
                href="/arbetssokande"
                icon={Briefcase}
                label="Arbete"
                headline="Ta kontrollen över din karriär"
                teaser="CV-genomgång, intervjuträning, arbetsmarknadskunskap och ett brett nätverk av arbetsgivare som aktivt söker våra deltagare."
                color="gold"
                image="/images/Arbetsspaaret.jpg"
                imageAlt="Deltagare jobbar tillsammans vid dator"
              />
              <TrackCard
                href="/halsosparet"
                icon={Heart}
                label="Hälsa"
                headline="Kropp och knopp i balans"
                teaser="Fysisk träning, kostworkshops, sömnstöd och samtal om välmående. För att orka ta nästa steg behöver du må bra."
                color="emerald"
                image="/images/Haelsospaaret.jpeg"
                imageAlt="Deltagare tränar tillsammans"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Bridge by FCR — two-column navy band */}
      <ScrollReveal>
        <section className="bg-brand-navy text-white overflow-hidden">
          <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="container-page py-16 md:py-20">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="relative">
                <p className="text-xs font-body font-medium text-brand-gold tracking-widest uppercase mb-4">
                  ESF-projekt
                </p>
                <h2 className="text-2xl md:text-3xl font-display font-extrabold mb-5 leading-tight">
                  Är du 18–29 och inskriven på Arbetsförmedlingen?
                </h2>
                <p className="text-white/75 leading-relaxed mb-8">
                  Då kan du delta i Bridge by FCR — vårt ESF-finansierade
                  projekt som ger dig intensivt stöd mot arbete eller studier.
                  Vi samarbetar nära med Arbetsförmedlingen och Malmö stad, och
                  finns här för att fylla det glapp som annars är svårt att
                  navigera på egen hand.
                </p>
                <Button
                  asChild
                  className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-display font-semibold rounded-cta h-11"
                >
                  <Link to="/anmal-dig">
                    Anmäl dig till Bridge
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="hidden lg:flex flex-col justify-center gap-6">
                <div className="flex gap-3">
                  {[
                    { label: "18–29", sub: "år" },
                    { label: "ESF", sub: "finansierat" },
                    { label: "AF", sub: "samarbete" },
                  ].map((chip) => (
                    <div
                      key={chip.label}
                      className="flex-1 flex flex-col items-center justify-center py-4 rounded-xl bg-white/[0.07] border border-white/10"
                    >
                      <span className="text-2xl font-display font-extrabold text-brand-gold">
                        {chip.label}
                      </span>
                      <span className="text-xs text-white/50 mt-1">
                        {chip.sub}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/40 text-center">
                  Finansieras och stöds av
                </p>
                <div className="flex gap-4">
                  {[
                    {
                      alt: "EU Socialfonden",
                      src: "/images/eu-logo-jordbruksfonden.png",
                    },
                    {
                      alt: "Malmö Stad",
                      src: "/images/malmostad-logo2013-inv.png",
                    },
                    {
                      alt: "FC Rosengård",
                      src: "/images/FCR_logo_2014_CMYK.png",
                    },
                  ].map((logo) => (
                    <div
                      key={logo.alt}
                      className="flex-1 flex items-center justify-center py-5 px-4 rounded-xl bg-white/[0.07] border border-white/10"
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        className="h-14 max-w-[110px] w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Senaste från Boost — white */}
      <LatestNews />

      {/* FAQ — tint */}
      <ScrollReveal>
        <section className="py-16 md:py-20 bg-muted/60">
          <div className="container-page max-w-2xl">
            <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-10">
              Vanliga frågor
            </h2>
            <Accordion type="single" collapsible className="mb-10">
              <AccordionItem value="job-chance">
                <AccordionTrigger>
                  Hur stor är chansen att jag får jobb?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-text-muted leading-relaxed">
                    Stor. Vi har ett brett nätverk av arbetsgivare som aktivt
                    kontaktar oss när de ska rekrytera — och vi gör allt vi kan
                    för att lyfta fram de deltagare som är redo. Varje år går
                    200 till 300 av våra deltagare vidare till anställning.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="dont-know">
                <AccordionTrigger>
                  Vad händer om jag inte vet vad jag vill göra?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-text-muted leading-relaxed">
                    Det är vanligare än du tror — och precis det vi är bra på.
                    Tillsammans med din vägledare utforskar du olika vägar,
                    testar vad som känns rätt och bygger en plan utifrån det. Du
                    behöver inte ha svaren redan när du kliver in genom dörren.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="cost">
                <AccordionTrigger>Kostar det något?</AccordionTrigger>
                <AccordionContent>
                  <p className="text-text-muted leading-relaxed">
                    Ingenting. Alla våra program är gratis för deltagare. Vi
                    finansieras av EU:s Socialfond, Allmänna Arvsfonden, Malmö
                    stad och andra partners.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="choose-track">
                <AccordionTrigger>
                  Måste jag välja ett spår direkt?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-text-muted leading-relaxed">
                    Nej. Många deltagare börjar utan att veta exakt vad de vill
                    göra. Din personliga vägledare hjälper dig att utforska
                    olika vägar och hitta det som passar dig. Du kan också delta
                    i insatser från flera spår samtidigt.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <p>
              <Link
                to="/vanliga-fragor"
                className="text-brand-teal font-medium hover:underline inline-flex items-center gap-1.5 text-sm"
              >
                Fler frågor? Se alla svar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Funder logo bar */}
      <FunderLogoBar />
    </>
  );
}
