import { Link } from "react-router-dom";
import { BookOpen, Briefcase, ArrowRight, Heart } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

/* Våra löften — Anna's custom icons, rendered large as she requested ("stora symboler") */
const promises = [
  {
    iconSrc: "/images/promise-inkluderande.png",
    iconAlt: "Inkludering — alla är välkomna",
    title: "Vi är inkluderande – alla är välkomna och alla kan",
    body: "Vi sätter individen i centrum och tror på varje människas inre kapacitet och vilja. Vi ser hela människan och ger alla en chans att utvecklas utifrån sina egna mål och drömmar.",
  },
  {
    iconSrc: "/images/promise-passionsdrivna.png",
    iconAlt: "Passion och värme",
    title: "Vi är passionsdrivna med ett varmt engagemang",
    body: "Med vår passion, glöd och värme skapar vi en gemenskap, en välkomnande och varm atmosfär. Vi förmedlar framtidstro och en kraft att förändra.",
  },
  {
    iconSrc: "/images/promise-handlingskraft.png",
    iconAlt: "Handlingskraft och varaktiga resultat",
    title: "Vi visar handlingskraft och skapar varaktiga resultat",
    body: "Vi är målinriktade, envisa, vi ger inte upp. Genom att vi ser lösningar istället för problem, genom vårt professionella driv och genom vår breda kompetens gör vi det möjligt för människor att växa och utvecklas.",
  },
  {
    iconSrc: "/images/promise-inspirerar.png",
    iconAlt: "Inspiration och nytänkande",
    title: "Vi inspirerar och tänker nytt",
    body: "Vi utmanar och förändrar genom nya perspektiv, annorlunda infallsvinklar, idérikedom och flexibilitet. Genom nytänkande lösningar växer modet och känslan av att allt är möjligt.",
  },
  {
    iconSrc: "/images/promise-kopplarsaman.png",
    iconAlt: "Samverkan och samarbete",
    title: "Vi kopplar samman och arbetar tätt ihop med andra",
    body: "Vi uppmuntrar till stärkt samverkan och att lära av varandra. Via vår flexibilitet och att vi samverkar i allt vi gör är vi en katalysator för samhällsförändring. Vi är ett viktigt komplement till det offentliga och en värdefull partner till det privata näringslivet.",
  },
];

/* Framgångsfaktorer — from Anna's Om oss doc */
const successFactors = [
  {
    title: "Vi bygger våra insatser på långsiktiga samarbeten",
    body: "Med Arbetsförmedlingen, kommuner och arbetsgivare. Genom partnerskapet med Arbetsförmedlingen kan vi nå personer som behöver stöd, även när de själva inte söker det aktivt. Det gör att vi kan arbeta mer träffsäkert och inkluderande. Samtidigt är arbetsgivarna helt avgörande. Utan deras engagemang skulle vår verksamhet stanna upp.",
  },
  {
    title:
      "Vi möter varje deltagare med ett inkluderande och välkomnande förhållningssätt",
    body: "Som del av civilsamhället har vi en annan ingång än myndigheter. Vi kompletterar deras arbete genom att skapa miljöer där människor kan landa, växa och pröva nytt. Hos oss ska det vara enkelt att kliva in — oavsett bakgrund, erfarenheter eller var man befinner sig i livet.",
  },
  {
    title: "Holistiskt – på riktigt",
    body: "Vi möter varje människa som individ, med respekt för hela hennes livssituation. För oss betyder holistiskt på riktigt att vi börjar där personen är, inte där vi tycker att hen borde vara. Vi lyssnar, stöttar och bygger möjligheter tillsammans.",
  },
  {
    title: "One-stop shop",
    body: "Hos oss finns allt samlat på ett ställe. Vi arbetar i tre spår som hänger ihop och gör det enkelt att snabbt växla mellan dem utifrån vad deltagaren behöver i stunden. Det betyder mindre krångel, kortare avstånd till rätt stöd och en smidigare väg framåt.",
  },
];

const stats = [
  { number: "7 500", label: "Unga som varit hos oss" },
  { number: "3 800", label: "Fått arbete eller studier" },
  { number: "8 av 10", label: "Nöjda deltagare" },
  { number: "2003", label: "Sedan starten" },
];

/* Team — Anna prefers avatars instead of photos */
const teamMembers = [
  {
    name: "Anna Nettrup",
    role: "Projektledare",
    email: "anna.nettrup@boostbyfcr.se",
  },
  {
    name: "Käthe Andersson",
    role: "Samarbetsansvarig",
    email: "kathe.andersson@boostbyfcr.se",
  },
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function VemViArPage() {
  useSeo({
    title: "Om oss",
    description:
      "Boost by FC Rosengård — idéburen organisation med bas i Malmö sedan 2003. Vi arbetar för att öka inkluderingen i samhället.",
    canonical: "/vem-vi-ar",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="pointer-events-none absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-white/5 blur-3xl" />
        <div className="container-page relative py-20 md:py-28">
          <p className="text-xs font-body font-medium text-brand-red tracking-widest uppercase mb-4">
            Om oss
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-tight mb-4">
            Vem vi är
          </h1>
          <p className="text-lg text-white/75 max-w-xl leading-relaxed">
            Boost by FC Rosengård är en idéburen organisation med bas i Malmö.
            Vi arbetar för att öka inkluderingen i samhället genom att stötta
            unga arbetssökande, närma oss arbetsgivare och skapa metoder som
            stöttar unga.
          </p>
        </div>
      </section>

      {/* Vem vi är intro — with heart-tree illustration */}
      <section className="py-12 md:py-16">
        <div className="container-page">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="max-w-3xl space-y-5 text-text-muted leading-relaxed">
              <p>
                Vi har sedan starten 2003 stöttat tusentals, framförallt unga,
                att börja arbeta eller studera.
              </p>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="rounded-2xl overflow-hidden bg-[#C0C7DA]/20 p-6">
                <img
                  src="/images/illustration-heart-tree.jpg"
                  alt="Hjärtträd med rötter — symbol för tillväxt, hälsa och gemenskap"
                  className="w-full h-auto rounded-xl object-contain max-h-56 mx-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Våra löften — Anna's custom icons rendered large ("stora symboler") */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container-page">
          <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-14 text-center">
            Våra löften
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {promises.map((p, i) => {
              const bgColors = [
                "bg-[#072D59]/5",
                "bg-[#C0C7DA]/25",
                "bg-[#C0C7DA]/20",
                "bg-[#072D59]/5",
                "bg-[#C0C7DA]/25",
              ];
              return (
                <div
                  key={p.title}
                  className={`${bgColors[i]} rounded-3xl p-8 md:p-10`}
                >
                  {/* Large custom icon — Anna's "stora symboler" from Therapist reference */}
                  <img
                    src={p.iconSrc}
                    alt={p.iconAlt}
                    className="h-20 w-20 md:h-24 md:w-24 object-contain mb-6"
                    loading="lazy"
                  decoding="async"
                  />
                  <h3 className="font-display font-bold text-lg text-text mb-3">
                    {p.title}
                  </h3>
                  <p className="text-text-muted leading-relaxed">{p.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats — Omniah-inspired prominent numbers */}
      <section className="bg-brand-navy text-white">
        <div className="container-page py-14 md:py-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold leading-tight mb-6">
                Resultaten talar för sig själva
              </h2>
              <p className="text-white/75 leading-relaxed max-w-md">
                Bakom varje siffra finns en människa som tagit ett steg framåt.
                Sedan 2003 har tusentals unga kommit till oss — och tusentals
                har gått vidare.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl md:text-4xl font-display font-extrabold text-brand-red tracking-tight">
                    {stat.number}
                  </p>
                  <p className="mt-1.5 text-white/60 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Det här gör vi */}
      <section className="py-12 md:py-16">
        <div className="container-page max-w-3xl">
          <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-6">
            Det här gör vi
          </h2>
          <div className="space-y-5 text-text-muted leading-relaxed">
            <p>
              Vi är en idéburen organisation med social inriktning och vår idé
              grundar sig i tanken att det finns ett glapp i det stöd som
              samhället ger till de som står utanför arbetsmarknaden. Det finns
              jobb och det finns utbildningar men utmaningen ligger i att
              förbereda och motivera arbetssökande så att de framgångsrikt kan
              navigera bland alla dessa möjligheter.
            </p>
            <p>
              På Boost lägger vi fokus på deltagarnas egna drivkrafter och
              ansvarstagande och har ett arbetssätt som präglas av engagemang
              och personligt bemötande. Genom att jobba med deltagarnas
              kompetenser och färdigheter, tillsammans med hälsa, motivation och
              framtidstro förbereder vi dem inför arbetslivet.
            </p>
          </div>
        </div>
      </section>

      {/* Våra spår — from Anna's Om oss doc */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container-page">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-4">
              Våra spår
            </h2>
            <p className="text-text-muted max-w-xl leading-relaxed mx-auto">
              Vi arbetar i tre spår som hänger ihop och gör det enkelt att
              snabbt växla mellan dem utifrån vad deltagaren behöver i stunden.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 md:gap-10">
            {[
              {
                href: "/studier",
                icon: BookOpen,
                headline: "Studiespåret",
                body: "På Boost erbjuder vi en flexibel och anpassningsbar studiemiljö som skiljer sig från skolan. Vi tittar på dina behov och erbjuder enskilda möten med pedagoger för att hjälpa dig gå igenom betyg, studieplanering och vägledning inom utbildningssystemet.",
                cardBg: "bg-[#072D59]/5",
                iconBg: "bg-[#072D59]/10",
                iconText: "text-brand-navy",
              },
              {
                href: "/arbetssokande",
                icon: Briefcase,
                headline: "Arbetsspåret",
                body: "Våra aktiviteter i arbetsspåret ger dig verktyg och kunskap för att navigera på arbetsmarknaden och utvecklas i din karriär. Finslipa ditt CV, behärska intervjuer och lär dig att söka arbete på ett kvalitativt sätt.",
                cardBg: "bg-[#ED1C24]/5",
                iconBg: "bg-[#ED1C24]/10",
                iconText: "text-brand-red",
              },
              {
                href: "/halsosparet",
                icon: Heart,
                headline: "Hälsospåret",
                body: "I hälsospåret arbetar vi för att främja din hälsa och välmående. Få hjälp att skapa goda rutiner, sätta mål och Boosta ditt självförtroende. Vi arbetar med alla sidor av hälsan — fysisk aktivitet, psykisk hälsa och kulturella aktiviteter.",
                cardBg: "bg-[#C0C7DA]/30",
                iconBg: "bg-[#C0C7DA]/50",
                iconText: "text-brand-navy",
              },
            ].map((track) => (
              <Link
                key={track.headline}
                to={track.href}
                className={`group ${track.cardBg} rounded-3xl p-8 md:p-10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`inline-flex items-center justify-center h-20 w-20 rounded-2xl ${track.iconBg} ${track.iconText} mb-6`}
                >
                  <track.icon className="h-10 w-10" />
                </div>
                <h3 className="font-display font-bold text-xl md:text-2xl text-text mb-3 leading-snug">
                  {track.headline}
                </h3>
                <p className="text-text-muted leading-relaxed mb-5">
                  {track.body}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy group-hover:gap-2.5 transition-all">
                  Läs mer <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Framgångsfaktorer */}
      <section className="py-12 md:py-16 bg-muted/60">
        <div className="container-page">
          <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-4">
            Framgångsfaktorer
          </h2>
          <p className="text-text-muted mb-12 max-w-2xl leading-relaxed">
            I våra projekt och initiativ arbetar vi hela tiden för att möta
            samhällets ständigt föränderliga behov och för att vässa vårt
            arbetssätt och metoder. Genom åren har vi, och oberoende
            utvärderare, kunnat peka på ett par faktorer som gör verksamheten
            framgångsrik:
          </p>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {successFactors.map((factor) => (
              <div
                key={factor.title}
                className="bg-white rounded-2xl p-6 md:p-8 border border-border/60"
              >
                <h3 className="font-display font-semibold text-lg text-text mb-3 italic">
                  {factor.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {factor.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team — avatars instead of photos, per Anna */}
      <section className="py-12 md:py-16">
        <div className="container-page">
          <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-4">
            Teamet bakom Boost
          </h2>
          <p className="text-text-muted mb-12 max-w-xl leading-relaxed">
            Ett litet team med stort engagemang.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl p-6 md:p-8 border border-border/60 text-center"
              >
                {/* Avatar with initials — Anna prefers this over photos */}
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-brand-navy text-white text-2xl font-display font-extrabold mb-5">
                  {getInitials(member.name)}
                </div>
                <h3 className="font-display font-semibold text-lg text-text mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-brand-red font-medium mb-3">
                  {member.role}
                </p>
                <a
                  href={`mailto:${member.email}`}
                  className="text-sm text-text-muted hover:text-brand-navy transition-colors"
                >
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agenda 2030 — Anna: "Boost och Agenda 2030 kan stå kvar" */}
      <section className="py-12 md:py-16 bg-muted/60">
        <div className="container-page">
          <p className="text-sm font-body font-medium text-brand-navy tracking-widest uppercase mb-4">
            Agenda 2030
          </p>
          <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-4">
            Boost och Agenda 2030
          </h2>
          <p className="text-text-muted mb-14 max-w-xl leading-relaxed">
            FN:s Agenda 2030 sätter ord på det vi gjort sedan dag ett. Här är
            hur vi bidrar.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Rättvis rekrytering",
                body: "Vi arbetar aktivt med att bryta rekryteringsnormer — så att namn och adress aldrig ska avgöra vem som får en chans.",
              },
              {
                title: "Utbildning för alla",
                body: "Vi stöttar unga vuxna att slutföra sin gymnasieutbildning och hitta rätt väg vidare — i sin egen takt.",
              },
              {
                title: "Hälsa som grund",
                body: "Vi vet att ohälsa och arbetslöshet förstärker varandra. Därför är hälsa inte ett sidospår hos oss — det är en kärninsats.",
              },
              {
                title: "Jämställdhet",
                body: "Vi utmanar normer kring vilka jobb kvinnor och män förväntas ta — och hjälper arbetsgivare att rekrytera mer rättvist.",
              },
              {
                title: "Inkludering",
                body: "Alla är välkomna hos oss. Oavsett bakgrund, språk eller erfarenhet — vi möter varje människa med öppenhet och respekt.",
              },
              {
                title: "Samverkan",
                body: "Inga förändringar sker ensamt. Vi samarbetar med Malmö stad, Arbetsförmedlingen, näringsliv och idéburen sektor.",
              },
            ].map((goal) => (
              <div
                key={goal.title}
                className="group bg-white rounded-2xl p-6 border border-border/60 hover:border-brand-navy/30 hover:shadow-md transition-all"
              >
                <h3 className="font-display font-semibold text-text mb-2">
                  {goal.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {goal.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
