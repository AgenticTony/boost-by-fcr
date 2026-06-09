import { Mail, Phone } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

export default function PressMediaPage() {
  useSeo({
    title: "Press & media",
    description:
      "Pressinformation och kontaktpersoner för Boost by FC Rosengård.",
    canonical: "/press-media",
  });

  return (
    <>
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="container-page relative py-20 md:py-28">
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-tight mb-4">
            Press & media
          </h1>
          <p className="text-lg text-white/75 max-w-lg leading-relaxed">
            Frågor om Boost? Vi berättar gärna mer om vad vi gör och varför.
          </p>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container-page max-w-3xl">
          <h2 className="text-3xl font-display font-extrabold text-text mb-6">
            Mediainformation — Boost by FC Rosengård
          </h2>
          <div className="space-y-5 text-text-muted leading-relaxed mb-10">
            <p>
              Boost by FC Rosengård är en idéburen organisation som sedan 2003
              har hjälpt tusentals unga i Malmö att hitta sin plats på
              arbetsmarknaden. Vi erbjuder stöd inom tre huvudsakliga spår —
              arbete, studier och hälsa — och finansieras bland annat av EU:s
              Socialfond, Allmänna Arvsfonden och Malmö stad.
            </p>
            <p>
              Vi samarbetar med Arbetsförmedlingen, Malmö stad och ett brett
              nätverk av arbetsgivare för att skapa reella möjligheter för varje
              individ.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-border/60">
              <h3 className="font-display font-semibold text-text mb-4">
                Presskontakt
              </h3>
              <div className="space-y-3">
                <p className="text-text-muted text-sm">
                  Anna Nettrup — Projektledare
                </p>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Mail className="h-4 w-4 text-brand-red" />
                  <a
                    href="mailto:anna.nettrup@boostbyfcr.se"
                    className="hover:text-brand-navy transition-colors"
                  >
                    anna.nettrup@boostbyfcr.se
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Phone className="h-4 w-4 text-brand-red" />
                  <a
                    href="tel:+46709921766"
                    className="hover:text-brand-navy transition-colors"
                  >
                    070-992 17 66
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-border/60">
              <h3 className="font-display font-semibold text-text mb-4">
                Samarbeten
              </h3>
              <div className="space-y-3">
                <p className="text-text-muted text-sm">
                  Käthe Andersson — Samarbetssansvarig
                </p>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Mail className="h-4 w-4 text-brand-red" />
                  <a
                    href="mailto:kathe.andersson@boostbyfcr.se"
                    className="hover:text-brand-navy transition-colors"
                  >
                    kathe.andersson@boostbyfcr.se
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Phone className="h-4 w-4 text-brand-red" />
                  <a
                    href="tel:+46721645345"
                    className="hover:text-brand-navy transition-colors"
                  >
                    072-164 53 45
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
