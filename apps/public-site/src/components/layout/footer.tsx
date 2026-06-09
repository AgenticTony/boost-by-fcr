import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerSections = [
  {
    heading: "Arbetssökande",
    links: [
      { href: "/arbetssokande", label: "Arbetsspåret" },
      { href: "/studier", label: "Studiespåret" },
      { href: "/halsosparet", label: "Hälsospåret" },
      { href: "/bridge", label: "Bridge by FCR" },
    ],
  },
  {
    heading: "Arbetsgivare",
    links: [
      { href: "/foretag", label: "Samarbeta med oss" },
      { href: "/anmal-dig", label: "Anmälan" },
    ],
  },
  {
    heading: "Om oss",
    links: [
      { href: "/vem-vi-ar", label: "Vem vi är" },
      { href: "/vad-vi-gor", label: "Vårt arbetssätt" },
      { href: "/var-historia", label: "Vår historia" },
      { href: "/press-media", label: "Press & media" },
      { href: "/lediga-tjanster", label: "Lediga tjänster" },
    ],
  },
  {
    heading: "Övrigt",
    links: [
      { href: "/kontakt", label: "Kontakt" },
      { href: "/resurser", label: "Resurser" },
      { href: "/dataskyddspolicy", label: "Dataskyddspolicy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-surface-dark text-white">
      <div className="container-page py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.heading}>
              <h3 className="font-display font-semibold text-sm uppercase tracking-wider text-brand-red mb-4">
                {section.heading}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact block */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <p className="text-sm text-white/70 mb-4 max-w-md">
              Boost by FC Rosengård — vi skapar förutsättningar för att alla ska
              kunna ta sig in på arbetsmarknaden.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <MapPin className="h-4 w-4 text-brand-red" />
                Norra Grängesbergsgatan 15, 214 50 Malmö
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="h-4 w-4 text-brand-red" />
                070-992 17 66
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="h-4 w-4 text-brand-red" />
                info@boostbyfcr.se
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-white/70 mb-2">Projektledare</p>
            <p className="text-sm text-white">Anna Nettrup</p>
            <p className="text-sm text-white/70">anna.nettrup@boostbyfcr.se</p>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        {/* Copyright */}
        <p className="text-center text-xs text-white/70">
          &copy; {`${new Date().getFullYear()}`} Boost by FC Rosengård. Alla
          rättigheter förbehållna.
        </p>
      </div>
    </footer>
  );
}
