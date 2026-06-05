import { Heart, Flame, Target, Lightbulb, Handshake } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

const promises = [
  {
    icon: Heart,
    title: "Vi är inkluderande",
    body: "Alla är välkomna. Oavsett bakgrund, erfarenhet eller var du befinner dig i livet — vi ser dig som en hel människa med en inre kapacitet som det är vår uppgift att hjälpa dig ta fram.",
  },
  {
    icon: Flame,
    title: "Vi brinner för det vi gör",
    body: "Det finns ett engagemang hos oss som inte går att spela. Vi är här för att vi tror på det vi gör — och det märks i varje möte, varje workshop och varje telefonsamtal.",
  },
  {
    icon: Target,
    title: "Vi levererar på riktigt",
    body: "Vi är målinriktade och vi ger inte upp. Varje person som går från Boost till ett jobb eller en utbildning är ett bevis på att det vi gör faktiskt fungerar. Det driver oss att göra det ännu bättre.",
  },
  {
    icon: Lightbulb,
    title: "Vi tänker nytt",
    body: "Vi utmanar det som tas för givet — i rekrytering, i skolan, i synen på unga. Nytänkande är inte ett modeord för oss, det är en förutsättning.",
  },
  {
    icon: Handshake,
    title: "Vi är starkare tillsammans",
    body: "Vi samarbetar med alla — offentlig sektor, näringsliv och andra idéburna organisationer. Förändring kräver att vi drar åt samma håll.",
  },
];

const stats = [
  { number: "200–300", label: "Deltagare får jobb varje år" },
  { number: "100–150", label: "Börjar studera varje år" },
  { number: "8 av 10", label: "Nöjda deltagare" },
  { number: "20+", label: "År i verksamhet" },
];

const teamMembers = [
  {
    name: "Anna Nettrup",
    role: "Projektledare",
    email: "anna.nettrup@boostbyfcr.se",
    image: undefined,
  },
  {
    name: "Käthe Andersson",
    role: "Samarbetsansvarig",
    email: "kathe.andersson@boostbyfcr.se",
    image: "/images/KaetheAndersson.jpg",
  },
];

const sustainabilityGoals = [
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
    title: "Vem vi är",
    description:
      "Idéburen organisation i Malmö sedan 2003. Vi tror på varje persons förmåga.",
  });

  return (
    <>
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="pointer-events-none absolute -bottom-48 -left-48 h-[500px] w-[500px] rounded-full bg-brand-teal/8 blur-3xl" />
        <div className="container-page relative py-20 md:py-28">
          <p className="text-xs font-body font-medium text-brand-teal tracking-widest uppercase mb-4">
            Om Boost
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-tight mb-4">
            Vi tror på varje persons förmåga
          </h1>
          <p className="text-lg text-white/75 max-w-lg leading-relaxed">
            Idéburen organisation med bas i Malmö. Sedan 2003.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-page max-w-3xl">
          <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-6">
            Boost by FC Rosengård — vilka vi är
          </h2>
          <div className="space-y-5 text-text-muted leading-relaxed">
            <p>
              Vi är en idéburen organisation som sedan starten 2003 har hjälpt
              tusentals unga att ta sig in på arbetsmarknaden eller börja
              studera. Vi har inga vinstintressen och inga aktieägare att
              redovisa för. Det enda vi är satta att göra är att skapa reella
              möjligheter för de människor som kommer till oss.
            </p>
            <p>
              Vi finns i Malmö — en stad vi känner och älskar, med alla dess
              kontraster och möjligheter. Det är här vi verkar, det är härifrån
              vi hämtar vår drivkraft.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-navy text-white">
        <div className="container-page py-14 md:py-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold leading-tight mb-6">
                Vad vi åstadkommer
              </h2>
              <p className="text-white/75 leading-relaxed max-w-md">
                Bakom varje siffra finns en människa som tagit ett steg framåt.
                Det är det som driver oss — inte statistiken, utan resultaten i
                människors liv.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl md:text-4xl font-display font-extrabold text-brand-gold tracking-tight">
                    {stat.number}
                  </p>
                  <p className="mt-1.5 text-white/60 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/60">
        <div className="container-page">
          <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-12">
            Det lovar vi dig
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {promises.map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-2xl p-6 md:p-8 border border-border/60"
              >
                <div className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-brand-gold/10 text-brand-gold mb-5">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold text-lg text-text mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-page">
          <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-4">
            Möt teamet bakom Boost
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
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-brand-navy text-white text-2xl font-display font-extrabold mb-5 overflow-hidden">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    getInitials(member.name)
                  )}
                </div>
                <h3 className="font-display font-semibold text-lg text-text mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-brand-gold font-medium mb-3">
                  {member.role}
                </p>
                <a
                  href={`mailto:${member.email}`}
                  className="text-sm text-text-muted hover:text-brand-teal transition-colors"
                >
                  {member.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-muted/60">
        <div className="container-page">
          <p className="text-sm font-body font-medium text-brand-teal tracking-widest uppercase mb-4">
            Hållbarhet
          </p>
          <h2 className="text-3xl md:text-[2.5rem] font-display font-extrabold text-text leading-tight mb-4">
            Vi jobbar för ett rättvisare samhälle
          </h2>
          <p className="text-text-muted mb-14 max-w-xl leading-relaxed">
            FN:s Agenda 2030 sätter ord på det vi gjort sedan dag ett. Här är
            hur vi bidrar.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sustainabilityGoals.map((goal) => (
              <div
                key={goal.title}
                className="group bg-white rounded-2xl p-6 border border-border/60 hover:border-brand-teal/30 hover:shadow-md transition-all"
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
