import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Megaphone,
  ClipboardList,
  Users,
  CheckCircle,
  Phone,
  Mic,
  Network,
  ArrowRight,
} from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

const offerings = [
  {
    icon: Mic,
    title: "Föreläsningar",
    body: "Inspirerande föreläsningar om inkludering, normer på arbetsmarknaden och psykisk hälsa.",
  },
  {
    icon: Users,
    title: "Workshops & utbildning",
    body: "Interaktiva workshops med konkreta verktyg — från rekrytering utan fördomar till dialog om välmående.",
  },
  {
    icon: Network,
    title: "Nätverk & samverkan",
    body: "Bli del av ett nätverk av arbetsgivare som vill bidra till ett mer inkluderande Malmö.",
  },
];

const steps = [
  {
    icon: MessageSquare,
    label: "Inledning",
    body: "Vi sätter oss ner med dig och lyssnar. Vilken tjänst gäller det? Vad söker du i en kandidat? Vilka värderingar är viktiga för er? Det här samtalet är grunden för allt som följer.",
  },
  {
    icon: Megaphone,
    label: "Annonsering",
    body: "Utifrån din kravprofil tar vi fram en skräddarsydd annons och söker aktivt bland våra deltagare. Vi känner dem — det är en stor fördel.",
  },
  {
    icon: ClipboardList,
    label: "Urval",
    body: "Vi gör en grundlig screening och presenterar ett hanterbart urval av kandidater. Du slipper sållaprocessen — vi gör den åt dig.",
  },
  {
    icon: Users,
    label: "Intervju",
    body: "Du intervjuar slutkandidaterna, hos oss eller hos er. Vi finns med som stöd om du vill det, och håller oss i bakgrunden om du föredrar det.",
  },
  {
    icon: CheckCircle,
    label: "Beslut",
    body: "När du valt ser vi till att onboardingprocessen sätts igång smidigt — inklusive eventuell kontakt med Arbetsförmedlingen och upprättande av praktikavtal.",
  },
  {
    icon: Phone,
    label: "Uppföljning",
    body: "Grattis till din nya medarbetare. Vi följer upp regelbundet under de första månaderna för att säkerställa att allt fungerar — för er båda.",
  },
];

export default function ForetagPage() {
  useSeo({
    title: "För företag",
    description:
      "Samarbeta med Boost — föreläsningar, workshops och inkluderande rekrytering för arbetsgivare som vill göra skillnad.",
  });

  return (
    <>
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <img
            src="/images/hero-foretag.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 bg-brand-gold/10 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="container-page relative py-20 md:py-28">
          <p className="text-xs font-body font-medium text-brand-gold tracking-widest uppercase mb-4">
            För företag och organisationer
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-tight mb-4">
            Bygg något meningsfullt med oss
          </h1>
          <p className="text-lg text-white/75 max-w-xl leading-relaxed">
            Vi samarbetar med arbetsgivare och organisationer som vill göra
            skillnad — genom föreläsningar, nätverk, workshops och inkluderande
            rekrytering.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-page">
          <p className="text-xs font-body font-medium text-brand-teal tracking-widest uppercase mb-4">
            Vårt erbjudande
          </p>
          <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-4">
            Mer än rekrytering — ett partnerskap med mening
          </h2>
          <p className="text-text-muted leading-relaxed mb-12 max-w-2xl">
            Att samarbeta med Boost handlar inte bara om att hitta rätt
            kandidat. Det är ett sätt att aktivt bidra till ett mer rättvist
            Malmö.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {offerings.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 md:p-8 border border-border/60"
              >
                <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-brand-gold text-brand-navy mb-5">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold text-lg text-text mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button
              asChild
              className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-display font-semibold rounded-cta h-12"
            >
              <Link to="/kontakt?amne=foretag">
                Berätta om ert uppdrag <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/60">
        <div className="container-page">
          <p className="text-xs font-body font-medium text-brand-teal tracking-widest uppercase mb-4">
            Rekrytering
          </p>
          <h2 className="text-3xl font-display font-extrabold text-text mb-12">
            Hitta din nästa medarbetare
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {steps.map((step, i) => (
              <div
                key={step.label}
                className="relative bg-white rounded-2xl p-6 md:p-8 border border-border/60"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex items-center justify-center h-12 w-12 rounded-full bg-brand-gold text-brand-navy font-display font-extrabold text-lg">
                    {i + 1}
                  </span>
                  <div className="h-11 w-11 rounded-xl bg-brand-navy text-white flex items-center justify-center">
                    <step.icon className="h-5 w-5" />
                  </div>
                </div>
                <h3 className="font-display font-semibold text-lg text-text mb-2">
                  {step.label}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy text-white">
        <div className="container-page py-12 md:py-16 max-w-3xl">
          <div className="bg-white/5 rounded-2xl p-6 md:p-8 border-l-4 border-l-brand-gold border border-white/10">
            <p className="font-display font-semibold text-white text-lg mb-1">
              Kontakta Käthe för att prata samarbete
            </p>
            <p className="text-sm text-white/70 mb-6">
              Käthe Andersson — kathe.andersson@boostbyfcr.se — 072-164 53 45
            </p>
            <a
              href="mailto:kathe.andersson@boostbyfcr.se"
              className="inline-flex items-center gap-2 bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-display font-semibold rounded-cta px-8 h-12 text-sm transition-colors"
            >
              Skicka ett mejl <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
