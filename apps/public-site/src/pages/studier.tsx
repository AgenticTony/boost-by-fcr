import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  FileCheck,
  GraduationCap,
  MapPin,
  MessageSquare,
} from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "Betygsöversyn",
    body: "Vi går igenom dina betyg och hjälper dig förstå vad du saknar, vad som är möjligt att komplettera och hur du snabbast tar dig till nästa steg.",
  },
  {
    icon: GraduationCap,
    title: "Individuell studieplanering",
    body: "Tillsammans med en lärare lägger vi upp en plan som passar din situation — oavsett om du vill klara gymnasiet, läsa upp enstaka ämnen eller förbereda dig inför ett högskoleprov.",
  },
  {
    icon: MapPin,
    title: "Studiebesök och vägledning",
    body: "Osäker på vilken skola som passar dig? Vi följer med på studiebesök till Komvux, folkhögskolor och andra utbildningar så att du kan fatta ett välgrundat beslut.",
  },
  {
    icon: MessageSquare,
    title: "Språkförstärkande aktiviteter",
    body: "För dig som vill stärka din svenska erbjuder vi riktade aktiviteter som bygger på din vardag och dina mål — inte på ett generiskt kursupplägg.",
  },
];

export default function StudierPage() {
  return (
    <>
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <img
            src="/images/Studiespaaret.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="pointer-events-none absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-brand-teal/8 blur-3xl" />
        <div className="container-page relative py-20 md:py-28">
          <p className="text-xs font-body font-medium text-brand-teal tracking-widest uppercase mb-4">
            Studiespåret
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-tight mb-4">
            Studier på dina villkor
          </h1>
          <p className="text-lg text-white/75 max-w-lg leading-relaxed">
            Flexibelt, personligt och utan prestationsångest.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-page max-w-3xl">
          <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-6">
            Det här är inte som skolan
          </h2>
          <div className="space-y-5 text-text-muted leading-relaxed">
            <p>
              På Boost studerar du i din egen takt, med tätt stöd från
              legitimerade lärare som anpassar sig efter dig — inte tvärtom. Vi
              erbjuder inga klasser, inga klockor och inga krav på att hänga med
              alla andra. Vi börjar med var du faktiskt befinner dig, och jobbar
              därifrån.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-navy text-white">
        <div className="container-page py-10 md:py-12">
          <div className="grid grid-cols-3 gap-6 md:gap-8 text-center">
            {[
              { number: "100–150", label: "Börjar studera varje år" },
              { number: "Legitimerade", label: "Lärare" },
              { number: "Individuell", label: "Studieplan" },
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
        <div className="container-page">
          <h2 className="text-3xl font-display font-extrabold text-text mb-12">
            Det här kan vi hjälpa dig med
          </h2>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-6 md:p-8 border border-border/60"
              >
                <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-brand-teal text-white mb-5">
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
            Vi följer dig hela vägen
          </h2>
          <p className="text-text-muted leading-relaxed mb-8">
            Från den dag du börjar hos oss, till den dag du kliver in genom
            dörrarna på din nya skola — vi är med dig varje steg. Det är inte
            ett löfte vi tar lätt på.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-display font-semibold rounded-cta px-8 h-12 shadow-lg shadow-brand-gold/20"
          >
            <Link to="/anmal-dig">
              Börja din studieresa <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
