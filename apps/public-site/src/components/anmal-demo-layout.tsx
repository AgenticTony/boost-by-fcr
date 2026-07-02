import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Clock, Shield, MessageCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { WaveDivider } from "@/components/ui/wave-divider";

const steps = [
  "Vi läser din anmälan",
  "En vägledare kontaktar dig",
  "Vi bokar ett första möte",
];

/**
 * Shared chrome for the Anmälan demo variants (/anmal-dig2, /anmal-dig3) so the
 * team can compare submission strategies side by side. Renders the same hero,
 * trust bar, and "Vad händer sen?" sections as the live /anmal-dig page, with a
 * clearly-labelled demo banner identifying which solution the page demonstrates.
 *
 * The form itself is passed as `children`, so each variant controls its own
 * submission mechanism while the surrounding page stays identical.
 *
 * NOTE: deliberately does NOT touch apps/public-site/src/pages/anmal-dig.tsx.
 */
export function AnmalDemoLayout({
  solutionLabel,
  solutionNote,
  children,
}: {
  solutionLabel: string;
  solutionNote: string;
  children: ReactNode;
}) {
  return (
    <>
      {/* Demo banner — makes the variant obvious when comparing */}
      <section className="bg-amber-50 border-b border-amber-200">
        <div className="container-page py-2.5 text-center text-sm text-amber-900">
          <span className="font-semibold">Demovariant:</span> {solutionLabel} —{" "}
          {solutionNote}{" "}
          <Link
            to="/anmal-dig"
            className="font-semibold underline hover:text-amber-700"
          >
            nuvarande /anmal-dig
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-navy/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-brand-red/10 blur-3xl" />
        <div className="container-page relative py-20 md:py-28">
          <ScrollReveal>
            <p className="text-xs font-body font-medium text-brand-red-bright tracking-widest uppercase mb-4">
              Kom igång
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-tight mb-4">
              Ta första steget.
            </h1>
            <p className="text-lg text-white/75 max-w-lg leading-relaxed">
              Det tar ungefär tre minuter. Du behöver inte ha allt klart — bara
              vara redo att börja.
            </p>
          </ScrollReveal>
        </div>
        <WaveDivider color="navy" layered />
      </section>

      {/* Trust bar */}
      <section className="py-8 bg-surface">
        <div className="container-page">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Clock, label: "Tar 3 minuter" },
              { icon: Shield, label: "Dina uppgifter är trygga" },
              { icon: MessageCircle, label: "Vi hör av oss inom en arbetsdag" },
            ].map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.1}>
                <div className="flex flex-col items-center gap-2">
                  <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-brand-navy text-white">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-text">
                    {item.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Form variant (children) */}
      {children}

      {/* Steps — glass on navy */}
      <section className="bg-brand-navy text-white overflow-hidden">
        <WaveDivider color="white" flip layered />
        <div className="container-page py-16 md:py-24">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-center mb-12">
              Vad händer sen?
            </h2>
          </ScrollReveal>
          <div className="relative max-w-3xl mx-auto">
            <div className="hidden md:block absolute top-6 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-0.5 bg-brand-red-bright/40" />
            <div className="grid md:grid-cols-3 gap-8 md:gap-6">
              {steps.map((step, i) => (
                <ScrollReveal key={step} delay={i * 0.15}>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-brand-red-bright text-white font-display font-extrabold text-lg mb-4 relative z-10 shadow-lg shadow-brand-red-bright/25">
                      {i + 1}
                    </div>
                    <p className="text-white/90 font-medium">{step}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
        <WaveDivider color="navy" layered />
      </section>
    </>
  );
}
