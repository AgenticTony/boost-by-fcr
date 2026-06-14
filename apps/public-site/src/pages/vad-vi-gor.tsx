import { Factory, GraduationCap, FlaskConical } from "lucide-react";
import { useSeo } from "@/hooks/use-seo";

const branches = [
  {
    icon: Factory,
    title: "Fabriken",
    body: "Här levererar vi beprövade lösningar till offentlig sektor. Det kan handla om upphandlade arbetsmarknadstjänster, samverkansformer som IOP, eller projekt där vi jobbar med etablerade metoder som vi vet fungerar.",
  },
  {
    icon: GraduationCap,
    title: "Akademin",
    body: "Här delar vi med oss av allt vi lärt oss under tjugo år i branschen. Vi håller föreläsningar och workshops, stöttar andra organisationer med projektplanering och ansökningsskrivande, och erbjuder projektadministration och redovisningstjänster.",
  },
  {
    icon: FlaskConical,
    title: "Labbet",
    body: "Här testar vi nytt. Labbet är platsen för innovation — nya metoder, nya samarbeten, nya målgrupper. Det är här vi hittar morgondagens lösningar, ofta i projektform och alltid i nära samverkan med andra.",
  },
];

export default function VadViGorPage() {
  useSeo({
    title: "Vad vi gör",
    description:
      "En organisation — tre sätt att skapa förändring. Fabriken, Akademin och Labbet.",
    canonical: "/vad-vi-gor",
  });

  return (
    <>
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-red/10 blur-3xl" />
        <div className="container-page relative py-20 md:py-28">
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold leading-tight mb-4">
            En organisation — tre sätt att skapa förändring
          </h1>
          <p className="text-lg text-white/75 max-w-lg leading-relaxed">
            Vi delar in vår verksamhet i tre grenar — alla med samma mål, olika
            metoder.
          </p>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="container-page">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {branches.map((branch) => (
              <div
                key={branch.title}
                className="bg-[#072D59]/5 rounded-3xl p-8 md:p-10"
              >
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-brand-red text-brand-navy mb-6">
                  <branch.icon className="h-6 w-6" />
                </div>
                <h2 className="font-display font-bold text-2xl text-text mb-3">
                  {branch.title}
                </h2>
                <p className="text-text-muted leading-relaxed">{branch.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
