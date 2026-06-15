import { Heart } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

/** BEAT 6: Om Boost + Inclusion */
export function AboutBoostSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="grid lg:grid-cols-2 min-h-[50vh] lg:min-h-[60vh]">
        {/* Full-bleed video */}
        <div className="relative order-2 lg:order-1 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/images/illustration-hands-heart.jpg"
          >
            <source src="/images/hand-heart.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/60 lg:block hidden pointer-events-none" />
        </div>

        {/* Text card */}
        <ScrollReveal direction="right">
          <div className="order-1 lg:order-2 flex items-center py-16 md:py-24 px-8 md:px-16 lg:px-40">
            <div className="max-w-md">
              <p className="text-sm font-body font-medium text-brand-navy tracking-widest uppercase mb-4">
                Om Boost by FC Rosengård
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-extrabold text-text leading-tight mb-6">
                Vi skapar relationer som öppnar dörrar vidare
              </h2>
              <p className="text-text-muted leading-relaxed text-lg mb-8">
                Boost by FC Rosengård är en ideell förening som stöttar unga att
                hitta vägar vidare mot arbete, studier och en hållbar framtid.
                Vi kombinerar vägledning, aktiviteter och ett starkt nätverk för
                att skapa konkreta möjligheter. Vårt arbetssätt bygger på en
                helhetssyn där varje individ får stöd utifrån sina egna mål och
                förutsättningar.
              </p>

              <div className="h-px bg-border mb-8" />

              <div className="flex items-center gap-3 mb-4">
                <Heart className="h-5 w-5 text-brand-red" />
                <p className="text-sm font-body font-medium text-brand-red tracking-widest uppercase">
                  Inkludering
                </p>
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-extrabold text-text leading-tight mb-4">
                Ingen ska behöva stå utanför
              </h3>
              <p className="text-text-muted leading-relaxed text-lg">
                Vi sätter individen i centrum och tror på varje människas inre
                kapacitet och vilja. Hos oss ska det vara enkelt att kliva in —
                oavsett bakgrund, erfarenheter eller var man befinner sig i
                livet.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
