import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Handshake,
  Heart,
  Landmark,
  Sparkles,
  Quote,
  Users,
} from "lucide-react";
import { CountUp } from "@/components/ui/count-up";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { PromiseIcons } from "@/components/sections/promise-icons";
import { TreeRootsConnector } from "@/components/ui/tree-roots-connector";
import { LatestNews } from "@/components/sections/latest-news";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useSeo } from "@/hooks/use-seo";

/* ─── Wave divider (retained from previous version) ─── */
function WaveDivider({
  flip = false,
  color = "white",
  layered = false,
}: {
  flip?: boolean;
  color?: "white" | "navy" | string;
  layered?: boolean;
}) {
  const fill =
    color === "navy" ? "#072D59" : color === "white" ? "#FFFFFF" : color;
  return (
    <div
      className={`w-full leading-[0] ${flip ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        {layered && (
          <path
            d="M0 35C200 70 400 10 720 35C1040 60 1240 5 1440 35V80H0V35Z"
            fill={fill}
            opacity="0.3"
          />
        )}
        <path
          d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/* ─── Staggered word entrance for hero headline ─── */
function StaggeredLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return <>{children}</>;
  }
  return (
    <motion.span
      className="block"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.span>
  );
}

/* ─── Funder logo data — sized by optical weight ─── */
const funders = [
  {
    alt: "EU Socialfonden",
    src: "/images/eu-logo-jordbruksfonden.png",
    width: 140,
    height: 96,
    className: "h-20 md:h-24 max-w-[140px]",
  },
  {
    alt: "Allmänna Arvsfonden",
    src: "/images/af-logo.png",
    width: 210,
    height: 112,
    className: "h-24 md:h-28 max-w-[210px]",
  },
  {
    alt: "Malmö Stad",
    src: "/images/malmostad-logo2013-inv.png",
    width: 180,
    height: 96,
    className: "h-20 md:h-24 max-w-[180px]",
  },
  {
    alt: "FC Rosengård",
    src: "/images/FCR_logo_2014_CMYK.png",
    width: 140,
    height: 96,
    className: "h-20 md:h-24 max-w-[140px]",
  },
];

function FunderLogoBar() {
  return (
    <section className="bg-brand-navy/80 border-b-4 border-b-brand-red">
      <div className="container-page py-14 md:py-20">
        <p className="text-center text-sm md:text-base font-display font-semibold uppercase tracking-widest text-brand-red-bright mb-10">
          Finansieras och stöds av
        </p>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {funders.map((funder) => (
            <img
              key={funder.alt}
              src={funder.src}
              alt={funder.alt}
              width={funder.width}
              height={funder.height}
              className={`w-auto object-contain hover:scale-105 transition-transform duration-300 ${funder.className}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Track card variants (each unique) ─── */

function TrackCardWork() {
  return (
    <ScrollReveal delay={0}>
      <Link
        to="/arbetssokande"
        className="group block relative bg-brand-navy/[0.03] hover:bg-brand-navy/[0.06] rounded-[2rem] border-l-4 border-brand-navy overflow-hidden transition-all duration-300 cursor-pointer"
      >
        <span
          className="absolute top-4 right-8 md:right-12 font-display font-extrabold text-[6rem] md:text-[9rem] leading-none select-none pointer-events-none text-brand-navy/[0.07]"
          aria-hidden="true"
        >
          01
        </span>
        <div className="flex flex-col md:flex-row">
          {/* Photo */}
          <div className="relative w-full md:w-64 lg:w-72 flex-shrink-0">
            <img
              src="/images/Arbetsspaaret.jpg"
              alt="Två personer samarbetar vid en dator — arbetsspåret"
              className="w-full h-48 md:h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-navy/[0.03] md:block hidden" />
          </div>
          {/* Content */}
          <div className="px-8 py-10 md:px-12 md:py-14 flex-1">
            <div className="relative flex flex-col gap-6">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-brand-navy/10 text-brand-navy mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="h-7 w-7 md:h-8 md:w-8" />
                </div>
                <p className="text-xs font-display font-semibold uppercase tracking-widest text-brand-navy/50">
                  Karriär & arbetsmarknad
                </p>
              </div>
              <div className="flex-1 max-w-xl">
                <h3 className="text-2xl md:text-3xl lg:text-[2rem] font-display font-extrabold text-text leading-tight mb-4">
                  Arbetsspåret
                </h3>
                <p className="text-text-muted leading-relaxed mb-6 text-base">
                  Våra aktiviteter i arbetsspåret ger dig verktyg och kunskap
                  för att navigera på arbetsmarknaden. Finslipa ditt CV,
                  behärska intervjuer och lär dig att söka arbete på ett
                  kvalitativt sätt. Vi har också regelbundna träffar med
                  arbetsgivare.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy group-hover:gap-3 transition-all duration-300">
                  Läs mer om arbetsspåret
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

function TrackCardStudy() {
  return (
    <ScrollReveal delay={0.1}>
      <Link
        to="/studier"
        className="group block relative bg-brand-blue-light/20 hover:bg-brand-blue-light/30 rounded-4xl border-l-4 border-brand-blue-light overflow-hidden lg:ml-6 transition-all duration-300 cursor-pointer"
      >
        <span
          className="absolute top-4 left-8 md:left-12 font-display font-extrabold text-[6rem] md:text-[9rem] leading-none select-none pointer-events-none text-brand-blue-light/40"
          aria-hidden="true"
        >
          02
        </span>
        <div className="flex flex-col md:flex-row-reverse">
          {/* Photo */}
          <div className="relative w-full md:w-64 lg:w-72 shrink-0">
            <img
              src="/images/Studiespaaret.jpg"
              alt="Grupp i samarbetsmöte — studiespåret"
              className="w-full h-48 md:h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-brand-blue-light/10 md:block hidden" />
          </div>
          {/* Content */}
          <div className="px-8 py-10 md:pl-80 md:pr-12 md:py-14 flex-1">
            <div className="relative flex flex-col gap-6">
              <div className="shrink-0 pl-16 md:pl-0">
                <div className="inline-flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-brand-blue-light/30 text-brand-navy mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="h-7 w-7 md:h-8 md:w-8" />
                </div>
                <p className="text-xs font-display font-semibold uppercase tracking-widest text-brand-navy/40">
                  Lärande & vägledning
                </p>
              </div>
              <div className="flex-1 max-w-xl">
                <h3 className="text-2xl md:text-3xl lg:text-[2rem] font-display font-extrabold text-text leading-tight mb-4">
                  Studiespåret
                </h3>
                <p className="text-text-muted leading-relaxed mb-6 text-base">
                  Flexibel studiemiljö med enskilda möten med pedagoger. Gå
                  igenom betyg, studieplanering och vägledning. Två dagar i
                  veckan har vi studieverkstaden.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-navy group-hover:gap-3 transition-all duration-300">
                  Läs mer om studiespåret
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

function TrackCardHealth() {
  return (
    <ScrollReveal delay={0.2}>
      <Link
        to="/halsosparet"
        className="group block relative overflow-hidden rounded-4xl border-l-4 border-brand-red cursor-pointer"
      >
        <span
          className="absolute top-4 right-8 md:right-12 z-10 font-display font-extrabold text-[6rem] md:text-[9rem] leading-none select-none pointer-events-none text-brand-red/10"
          aria-hidden="true"
        >
          03
        </span>
        <div className="flex flex-col md:flex-row">
          {/* Photo — left side */}
          <div className="relative w-full md:w-64 lg:w-72 shrink-0">
            <img
              src="/images/fcr-sport.jpg"
              alt="Grupp spelar innebandy — hälsospåret"
              className="w-full h-48 md:h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
          {/* Content */}
          <div className="relative bg-brand-red/3 hover:bg-brand-red/6 px-8 py-10 md:px-12 md:py-14 flex-1 transition-colors duration-300">
            <div className="flex flex-col gap-6">
              <div className="shrink-0">
                <div className="inline-flex items-center justify-center h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-brand-red/10 text-brand-red mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-7 w-7 md:h-8 md:w-8" />
                </div>
                <p className="text-xs font-display font-semibold uppercase tracking-widest text-brand-red/80">
                  Välmående & självförtroende
                </p>
              </div>
              <div className="flex-1 max-w-xl">
                <h3 className="text-2xl md:text-3xl lg:text-[2rem] font-display font-extrabold text-text leading-tight mb-4">
                  Hälsospåret
                </h3>
                <p className="text-text-muted leading-relaxed mb-6 text-base">
                  Främja din hälsa och välmående. Skapa goda rutiner, sätta mål
                  och Boosta ditt självförtroende — fysisk aktivitet, psykisk
                  hälsa och kultur.
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red group-hover:gap-3 transition-all duration-300">
                  Läs mer om hälsospåret
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

/* ═══════════════════════════════════════════════════════════
   HOMEPAGE — 7 beats, each section unique
   ═══════════════════════════════════════════════════════════ */

export default function HomePage() {
  useSeo({
    title: "Hem",
    description:
      "Tillsammans bygger vi förutsättningar som ger unga möjlighet att utvecklas, hitta riktning och forma sin framtid.",
    canonical: "/",
  });

  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      {/* ─── BEAT 1: Hero — Asymmetric split + parallax ─── */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        {/* Visible decorative blob (opacity 0.12, not invisible) */}
        <div
          className="pointer-events-none absolute -top-20 right-0 w-[600px] h-[600px] rounded-full bg-brand-red/12 blur-[120px]"
          aria-hidden="true"
        />

        <div className="container-page relative py-12 md:py-16 lg:py-20">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-12 items-center">
            {/* Left: Text */}
            <div>
              <StaggeredLine delay={0}>
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="h-4 w-4 text-brand-red-bright" />
                  <p className="text-sm font-body font-medium text-brand-red-bright tracking-widest uppercase">
                    Sedan 2003
                  </p>
                </div>
              </StaggeredLine>

              <h1 className="text-[2.75rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] font-display font-extrabold leading-[0.95] tracking-tight mb-8">
                <StaggeredLine delay={0.15}>Tillsammans</StaggeredLine>
                <StaggeredLine delay={0.3}>
                  <span className="text-brand-red-bright">öppnar vi</span>
                </StaggeredLine>
                <StaggeredLine delay={0.45}>vägar framåt</StaggeredLine>
              </h1>

              <StaggeredLine delay={0.6}>
                <p className="text-lg md:text-xl leading-relaxed text-white/70 max-w-lg mb-10">
                  Vi bygger förutsättningar som ger unga möjlighet att
                  utvecklas, hitta riktning och forma sin framtid.
                </p>
              </StaggeredLine>

              <StaggeredLine delay={0.8}>
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-brand-red-bright text-white hover:bg-brand-red-bright/90 font-display font-semibold rounded-full px-10 h-14 text-base shadow-lg shadow-brand-red-bright/25 hover:shadow-brand-red-bright/40 hover:scale-[1.02] transition-all duration-300"
                  >
                    <Link to="/anmal-dig">Anmälan</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="text-white/80 hover:text-white hover:bg-white/10 rounded-full px-8 h-14 text-base font-display bg-transparent border border-white/20 hover:border-white/40 transition-all duration-300"
                  >
                    <a href="#program">Se vad vi erbjuder</a>
                  </Button>
                </div>
              </StaggeredLine>
            </div>

            {/* Right: Photo with parallax, bleeds to edge on desktop */}
            <div className="hidden lg:block relative">
              {prefersReducedMotion ? (
                <div className="relative aspect-[3/4] rounded-l-[2rem] overflow-hidden shadow-2xl ring-1 ring-white/10 max-w-[420px] ml-auto">
                  <img
                    src="/images/deltagare_boostbyfcr_pa_trappa-scaled.jpg"
                    alt="Unga deltagare utomhus på Boost"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/20 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-brand-navy/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-display font-bold text-sm shadow-lg">
                    Bli en del av Boost
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                  className="relative max-w-[420px] ml-auto"
                >
                  <ParallaxImage
                    src="/images/deltagare_boostbyfcr_pa_trappa-scaled.jpg"
                    alt="Unga deltagare utomhus på Boost"
                    speed={0.3}
                    className="aspect-[3/4] rounded-l-[2rem] shadow-2xl ring-1 ring-white/10"
                  />
                  <div className="absolute inset-0 rounded-l-[2rem] bg-gradient-to-t from-brand-navy/20 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-brand-navy/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-display font-bold text-sm shadow-lg">
                    Bli en del av Boost
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <WaveDivider color="navy" layered />
      </section>

      {/* ─── BEAT 2: Impact Stats — Count-up numbers ─── */}
      <section className="relative bg-brand-navy text-white py-6 md:py-10">
        <div className="container-page relative">
          <p className="text-center text-white/75 text-sm md:text-base font-body tracking-wide mb-6 md:mb-10">
            Bakom varje siffra finns en människa som tagit ett steg framåt
          </p>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto mb-8">
            {/* 7 500 */}
            <div className="text-center relative">
              {/* Bullseye circle behind number */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-52 md:h-52 rounded-full border-2 border-brand-red/20 pointer-events-none"
                aria-hidden="true"
              />
              <p className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tighter leading-none">
                <CountUp target={7500} duration={2} className="text-white" />
              </p>
              <div className="relative mt-3 h-px w-10 bg-brand-red/60 mx-auto mb-3" />
              <p className="relative text-white/70 text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                unga har varit hos oss sedan starten 2003
              </p>
            </div>

            {/* 3 800 */}
            <div className="text-center relative">
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-52 md:h-52 rounded-full border-2 border-white/10 pointer-events-none"
                aria-hidden="true"
              />
              <p className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tighter leading-none">
                <CountUp
                  target={3800}
                  duration={2}
                  className="text-brand-red-bright"
                />
              </p>
              <div className="relative mt-3 h-px w-10 bg-white/30 mx-auto mb-3" />
              <p className="relative text-white/70 text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                har gått vidare till arbete eller studier
              </p>
            </div>
          </div>

          {/* Supporting stats */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 text-white/75 text-sm">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-red/60" />8 av
              10 nöjda deltagare
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
              Verksamma sedan 2003
            </span>
          </div>
        </div>
      </section>

      <WaveDivider color="#072d59" flip layered />

      {/* ─── BEAT 3: Promise / Quote — Calm breather ─── */}
      <ScrollReveal>
        <section className="py-16 md:py-24 bg-surface">
          <div className="container-page">
            <div className="max-w-3xl mx-auto text-center">
              <Quote className="h-10 w-10 text-brand-red/20 mx-auto mb-6" />
              <blockquote className="text-2xl md:text-4xl lg:text-[2.75rem] font-display font-extrabold text-text leading-snug mb-8">
                Varje ung människa bär på en{" "}
                <span className="text-brand-red">unik potential</span> — det är
                vår uppgift att hjälpa dem att hitta den
              </blockquote>
              <div className="flex items-center justify-center gap-3 mb-12">
                <div className="h-px w-12 bg-brand-navy/20" />
                <p className="text-sm font-body font-medium text-text-muted">
                  Våra löften
                </p>
                <div className="h-px w-12 bg-brand-navy/20" />
              </div>
              <PromiseIcons />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── BEAT 4: Three Tracks — Each card unique ─── */}
      <section
        id="program"
        className="py-20 md:py-28 bg-white relative overflow-hidden"
      >
        <TreeRootsConnector />

        <div className="container-page relative">
          <div className="max-w-2xl mb-16 md:mb-20">
            <p className="text-sm font-body font-medium text-brand-red tracking-widest uppercase mb-4">
              Tre vägar framåt
            </p>
            <h2 className="text-3xl md:text-[2.75rem] font-display font-extrabold text-text leading-tight mb-5">
              Våra tre spår
            </h2>
            <p className="text-text-muted leading-relaxed text-lg">
              Som ett träd växer från en gemensam rot men sträcker sig åt olika
              håll, erbjuder vi tre spår som alla utgår från samma värdegrund —
              varje individs unika potential.
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            <TrackCardWork />
            <TrackCardStudy />
            <TrackCardHealth />
          </div>
        </div>
      </section>

      {/* ─── BEAT 5: Bridge by FCR — Floating glass card ─── */}
      <ScrollReveal direction="left">
        <section className="relative bg-brand-navy text-white overflow-hidden">
          {/* Visible red organic shape */}
          <div
            className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full bg-brand-red/15 blur-[80px]"
            aria-hidden="true"
          />

          <div className="container-page relative py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left: Text content */}
              <div>
                <p className="text-xs font-body font-medium text-brand-red tracking-widest uppercase mb-5">
                  ESF-projekt
                </p>
                <h2 className="text-2xl md:text-4xl font-display font-extrabold mb-3 leading-tight">
                  Är du mellan 18–29 år och inskriven på Arbetsförmedlingen?
                </h2>
                <p className="text-xl font-display font-semibold text-brand-blue-light mb-6">
                  Anmäl dig till Bridge by FC Rosengård
                </p>
                <div className="space-y-4 text-white/70 leading-relaxed">
                  <p>
                    Bridge by FC Rosengård är ett ESF‑finansierat projekt för
                    unga vuxna som vill hitta vägar vidare mot arbete eller
                    studier. Vi vet att det kan vara svårt att navigera bland
                    alla möjligheter, och därför erbjuder vi stöd som utgår från
                    dina mål och förutsättningar.
                  </p>
                  <p>
                    Med Boostmodellen som grund kombinerar vi vägledning, stöd i
                    studier, studiebesök, motivationshöjande insatser och
                    hälsofrämjande aktiviteter. Du får hjälp med allt som rör
                    arbetssökande — från CV och intervjuträning till att förstå
                    arbetsmarknaden.
                  </p>
                </div>
                <div className="mt-8">
                  <Button
                    asChild
                    className="bg-brand-red text-white hover:bg-brand-red/90 font-display font-semibold rounded-full h-12 px-8 shadow-lg shadow-brand-red/20 hover:shadow-brand-red/40 hover:scale-[1.02] transition-all duration-300"
                  >
                    <Link to="/anmal-dig">
                      Anmäl dig till Bridge
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right: Floating glass card */}
              <motion.div
                initial={
                  prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }
                }
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Fact chips — defined card panel */}
                <div className="rounded-2xl bg-white/6 backdrop-blur-sm border border-white/10 overflow-hidden">
                  {/* Red accent bar */}
                  <div className="h-1 bg-linear-to-r from-brand-red via-brand-red/60 to-transparent" />
                  <div className="grid grid-cols-3 gap-0 divide-x divide-white/10">
                    {[
                      {
                        icon: <Users className="h-5 w-5 text-brand-red" />,
                        value: "18–29",
                        sub: "år",
                      },
                      {
                        icon: <Landmark className="h-5 w-5 text-brand-red" />,
                        value: "ESF",
                        sub: "finansierat",
                      },
                      {
                        icon: <Handshake className="h-5 w-5 text-brand-red" />,
                        value: "AF",
                        sub: "samarbete",
                      },
                    ].map((chip, i) => (
                      <motion.div
                        key={chip.value}
                        initial={
                          prefersReducedMotion ? false : { opacity: 0, y: 10 }
                        }
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className="flex flex-col items-center justify-center py-6 px-3"
                      >
                        <div className="mb-2">{chip.icon}</div>
                        <span className="text-xl font-display font-extrabold text-white">
                          {chip.value}
                        </span>
                        <span className="text-xs text-white/60 mt-0.5">
                          {chip.sub}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Vision quote */}
                <div className="rounded-2xl bg-white/[0.06] backdrop-blur-sm p-6 border border-white/10 border-l-4 border-l-brand-red">
                  <p className="text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
                    Vår vision
                  </p>
                  <p className="text-white/75 leading-relaxed italic text-lg">
                    "En inkluderande arbetsmarknad som tar tillvara på alla
                    individers drömmar, kompetenser och vilja att bidra."
                  </p>
                </div>

                {/* Funder logos — credentials row */}
                <div className="rounded-2xl bg-white/8 backdrop-blur-sm border border-white/10 overflow-hidden">
                  <div className="h-1 bg-linear-to-r from-brand-red via-brand-red/60 to-transparent" />
                  <div className="p-5">
                    <p className="text-xs font-body font-medium text-white/50 text-center mb-4">
                      Finansieras och stöds av
                    </p>
                    <div className="flex items-center justify-center gap-8 md:gap-12">
                      {[
                        {
                          alt: "EU Socialfonden",
                          src: "/images/eu-logo-jordbruksfonden.png",
                          className: "h-16 md:h-20 max-w-[130px]",
                        },
                        {
                          alt: "Arbetsförmedlingen",
                          src: "/images/af-logo.png",
                          className: "h-22 md:h-[6.5rem] max-w-[180px]",
                        },
                        {
                          alt: "FC Rosengård",
                          src: "/images/FCR_logo_2014_CMYK.png",
                          className: "h-16 md:h-20 max-w-[130px]",
                        },
                      ].map((logo) => (
                        <img
                          key={logo.alt}
                          src={logo.src}
                          alt={logo.alt}
                          loading="lazy"
                          decoding="async"
                          className={`w-auto object-contain hover:scale-105 transition-transform duration-300 ${logo.className}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <WaveDivider color="#072d59" flip layered />

      {/* ─── BEAT 6: Om Boost + Inclusion ─── */}
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
                  Boost by FC Rosengård är en ideell förening som stöttar unga
                  att hitta vägar vidare mot arbete, studier och en hållbar
                  framtid. Vi kombinerar vägledning, aktiviteter och ett starkt
                  nätverk för att skapa konkreta möjligheter. Vårt arbetssätt
                  bygger på en helhetssyn där varje individ får stöd utifrån
                  sina egna mål och förutsättningar.
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
                  kapacitet och vilja. Hos oss ska det vara enkelt att kliva in
                  — oavsett bakgrund, erfarenheter eller var man befinner sig i
                  livet.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── BEAT 7: Progress / Selfmade & Strong ─── */}
      <section className="relative bg-gradient-to-b from-white via-white to-brand-blue-light/10 overflow-hidden">
        <div className="container-page py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <ScrollReveal>
              <div className="relative">
                <motion.div
                  className="relative"
                  initial={
                    prefersReducedMotion ? false : { scale: 0.95, opacity: 0 }
                  }
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <div className="absolute -inset-4 rounded-3xl bg-brand-red/10 -rotate-1" />
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-brand-blue-light/20" />
                  <img
                    src="/images/tree_selfmade.png"
                    alt="Selfmade & Strong — gruppvägledning för personlig utveckling"
                    className="relative w-full h-auto rounded-3xl shadow-lg"
                    loading="lazy"
                    decoding="async"
                  />
                </motion.div>
              </div>
            </ScrollReveal>

            <div className="lg:pl-24">
              <div className="mb-8">
                <p className="text-sm font-body font-medium text-brand-navy tracking-widest uppercase mb-3">
                  Allmänna Arvsfonden
                </p>
                <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-4">
                  Selfmade & Strong
                </h2>
                <p className="text-brand-red font-display font-semibold text-lg mb-4">
                  Progress by FCR
                </p>
                <div className="space-y-4 text-text-muted leading-relaxed">
                  <p>
                    Med stöd från <strong>Allmänna Arvsfonden</strong> driver vi
                    Progress by FCR, där vi tar fram en handbok i programmet{" "}
                    <strong>Selfmade & Strong</strong>. Programmet syftar till
                    att öka ungas motivation och förbättra deras hälsa.
                  </p>
                  <p>
                    Selfmade & Strong sker genom gruppvägledning och är anpassad
                    för unga med olika bakgrunder och utmaningar. Fokus ligger
                    på att stärka varje individ så att de kan växa utifrån sina
                    egna förutsättningar.
                  </p>
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    label: "Ökad motivation till arbete",
                  },
                  {
                    label: "Stärkt hälsomedvetenhet",
                  },
                  {
                    label: "Fler med tydliga framtidsmål",
                  },
                ].map((result) => (
                  <div
                    key={result.label}
                    className="flex items-start gap-2 text-sm text-text-muted"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-red shrink-0" />
                    {result.label}
                  </div>
                ))}
              </div>

              {/* Themes card */}
              <div className="rounded-4xl bg-brand-navy/3 p-8 border border-brand-navy/4">
                <h3 className="font-display font-semibold text-lg text-text mb-6">
                  Teman i programmet
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Förhållningssätt",
                    "Självkänsla & självförtroende",
                    "Motivation",
                    "Målsättning",
                    "Personligt ledarskap",
                  ].map((theme) => (
                    <div
                      key={theme}
                      className="flex items-center gap-2 text-sm text-text-muted"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-brand-navy/40 shrink-0" />
                      {theme}
                    </div>
                  ))}
                </div>
              </div>

              {/* Participant quote */}
              <div className="mt-8 pl-4 border-l-4 border-brand-red/40">
                <p className="text-text-muted italic leading-relaxed text-base">
                  "Jag tar med mig bättre självförtroende och en känsla av att
                  jag faktiskt kan påverka min egen framtid."
                </p>
                <p className="text-sm text-text-muted/60 mt-2 font-medium">
                  — Albin, deltagare
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Senaste från Boost ─── */}
      <LatestNews />

      {/* ─── Funder logo bar ─── */}
      <FunderLogoBar />
    </>
  );
}
