import { ScrollReveal } from "@/components/ui/scroll-reveal";

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

export function TeamSection() {
  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="container-page">
        <ScrollReveal>
          <h2 className="text-3xl md:text-[2.75rem] font-display font-extrabold text-text leading-tight mb-4">
            Teamet bakom Boost
          </h2>
          <p className="text-text-muted mb-12 max-w-xl leading-relaxed">
            Ett litet team med stort engagemang.
          </p>
        </ScrollReveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {teamMembers.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-border/60 text-center hover:shadow-lg transition-all duration-300">
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
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
