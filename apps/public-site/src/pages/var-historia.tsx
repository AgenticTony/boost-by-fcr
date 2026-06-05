import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTimeline } from "@/hooks/use-timeline";
import { useSeo } from "@/hooks/use-seo";

export default function VarHistoriaPage() {
  const { data: timeline = [], isLoading: loading, error } = useTimeline();
  const errorMsg = error ? "Kunde inte ladda tidslinjen." : null;

  useSeo({
    title: "Vår historia",
    description:
      "Över 20 år av att skapa förändring — från en idé i Rosengård till en organisation som hjälper hundratals unga varje år.",
  });

  return (
    <>
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="pointer-events-none absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-brand-gold/8 blur-3xl" />
        <div className="container-page relative py-20 md:py-28">
          <p className="text-xs font-body font-medium text-brand-gold tracking-widest uppercase mb-4">
            Vår historia
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-tight mb-4">
            Över 20 år av att skapa förändring
          </h1>
          <p className="text-lg text-white/75 max-w-lg leading-relaxed">
            Från en idé i Rosengård till en organisation som hjälper hundratals
            unga varje år.
          </p>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container-page max-w-3xl">
          <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-12">
            Vår resa i korthet
          </h2>
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-border" />
            <div className="space-y-10">
              {loading && (
                <p className="text-text-muted pl-12">Laddar tidslinje…</p>
              )}
              {errorMsg && <p className="text-destructive pl-12">{errorMsg}</p>}
              {!loading &&
                !errorMsg &&
                timeline.map((entry) => (
                  <div key={entry.id} className="relative pl-12">
                    <div className="absolute left-0 top-1.5 h-10 w-10 rounded-full bg-brand-gold flex items-center justify-center">
                      <span className="text-xs font-display font-extrabold text-brand-navy">
                        {entry.year}
                      </span>
                    </div>
                    <h3 className="font-display font-semibold text-lg text-text mb-2">
                      {entry.projectName}
                    </h3>
                    <p className="text-text-muted leading-relaxed text-sm">
                      {entry.description}
                    </p>
                    {entry.funder && (
                      <span className="inline-block mt-2 px-3 py-1 bg-muted text-text-muted text-xs rounded-full">
                        {entry.funder}
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 bg-muted/60">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-3xl font-display font-extrabold text-text mb-5">
            Vill du vara en del av nästa kapitel?
          </h2>
          <p className="text-text-muted leading-relaxed mb-8 max-w-lg mx-auto">
            Vi letar alltid efter människor som vill bidra — som deltagare,
            samarbetspartner eller kollega.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-display font-semibold rounded-cta px-8 h-12 shadow-lg shadow-brand-gold/20"
            >
              <Link to="/anmal-dig">
                Anmäl dig <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white rounded-cta px-8 h-12 font-display bg-transparent"
            >
              <Link to="/kontakt">Kontakta oss</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
