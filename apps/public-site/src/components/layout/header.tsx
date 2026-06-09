import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Briefcase,
  Heart,
  UsersRound,
  Layers,
  Newspaper,
  BriefcaseMedical,
  Clock,
  FileText,
  PenLine,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* Anna's requested nav order: Arbetssökande, Arbetsgivare, Skolor, Om oss, Mer */
const jobSeekerLinks = [
  {
    href: "/arbetssokande",
    label: "Arbetsspåret",
    icon: Briefcase,
    iconColor: "text-brand-navy",
  },
  {
    href: "/studier",
    label: "Studiespåret",
    icon: BookOpen,
    iconColor: "text-brand-red",
  },
  {
    href: "/halsosparet",
    label: "Hälsospåret",
    icon: Heart,
    iconColor: "text-brand-navy",
  },
  {
    href: "/bridge",
    label: "Bridge by FCR",
    icon: PenLine,
    iconColor: "text-brand-red",
  },
];

const aboutLinks = [
  {
    href: "/vem-vi-ar",
    label: "Om oss",
    icon: UsersRound,
    iconColor: "text-brand-navy",
  },
  {
    href: "/var-historia",
    label: "Vår historia",
    icon: Clock,
    iconColor: "text-brand-navy",
  },
  {
    href: "/press-media",
    label: "Press & media",
    icon: Newspaper,
    iconColor: "text-brand-red",
  },
  {
    href: "/lediga-tjanster",
    label: "Lediga tjänster",
    icon: BriefcaseMedical,
    iconColor: "text-brand-navy",
  },
];

/* "Mer" dropdown — Nyheter, Kontakt, Resurser */
const moreLinks = [
  {
    href: "/nyheter",
    label: "Nyheter",
    icon: Newspaper,
    iconColor: "text-brand-red",
  },
  {
    href: "/kontakt",
    label: "Kontakt",
    icon: Phone,
    iconColor: "text-brand-navy",
  },
  {
    href: "/resurser",
    label: "Resurser",
    icon: FileText,
    iconColor: "text-brand-red",
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  function handleDropdownKey(e: React.KeyboardEvent, dropdown: string) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    }
    if (e.key === "Escape") {
      setActiveDropdown(null);
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
      <a href="#main-content" className="skip-to-content">
        Hoppa till huvudinnehåll
      </a>
      <nav className="container-page flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/logo_boostbyfcr_dark.png"
            alt="Boost by FC Rosengård"
            className="h-8 md:h-10 w-auto"
          />
        </Link>

        {/* Desktop nav — Anna's requested order */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Arbetssökande — link + dropdown on hover */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("job-seeker")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="flex items-center">
              <Link
                to="/arbetssokande"
                className="px-1.5 py-2 text-sm font-medium text-text hover:text-brand-navy transition-colors rounded-md hover:bg-muted"
              >
                Arbetssökande
              </Link>
              <button
                className="px-1.5 py-2 text-text hover:text-brand-navy transition-colors"
                aria-expanded={activeDropdown === "job-seeker"}
                aria-haspopup="true"
                aria-label="Arbetssökande undermeny"
                onKeyDown={(e) => handleDropdownKey(e, "job-seeker")}
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <AnimatePresence>
              {activeDropdown === "job-seeker" && (
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-card shadow-lg border border-border p-2"
                >
                  {jobSeekerLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-muted transition-colors"
                    >
                      <link.icon className={`h-5 w-5 ${link.iconColor}`} />
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/foretag"
            className="px-3 py-2 text-sm font-medium text-text hover:text-brand-navy transition-colors rounded-md hover:bg-muted"
          >
            Arbetsgivare
          </Link>

          {/* Skolor och utbildningsanordnare — Anna's exact label */}
          <Link
            to="/studier"
            className="px-3 py-2 text-sm font-medium text-text hover:text-brand-navy transition-colors rounded-md hover:bg-muted"
          >
            Skolor och utbildningsanordnare
          </Link>

          {/* Vårt arbetssätt — Anna's requested top-level item */}
          <Link
            to="/vad-vi-gor"
            className="px-3 py-2 text-sm font-medium text-text hover:text-brand-navy transition-colors rounded-md hover:bg-muted"
          >
            Vårt arbetssätt
          </Link>

          {/* Om oss — link + dropdown on hover */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("about")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="flex items-center">
              <Link
                to="/vem-vi-ar"
                className="px-1.5 py-2 text-sm font-medium text-text hover:text-brand-navy transition-colors rounded-md hover:bg-muted"
              >
                Om oss
              </Link>
              <button
                className="px-1.5 py-2 text-text hover:text-brand-navy transition-colors"
                aria-expanded={activeDropdown === "about"}
                aria-haspopup="true"
                aria-label="Om oss undermeny"
                onKeyDown={(e) => handleDropdownKey(e, "about")}
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <AnimatePresence>
              {activeDropdown === "about" && (
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
                  className="absolute top-full left-0 mt-1 w-52 bg-white rounded-card shadow-lg border border-border p-2"
                >
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-muted transition-colors"
                    >
                      <link.icon className={`h-5 w-5 ${link.iconColor}`} />
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mer — dropdown with Nyheter, Kontakt, Resurser */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("more")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text hover:text-brand-navy transition-colors rounded-md hover:bg-muted"
              aria-expanded={activeDropdown === "more"}
              aria-haspopup="true"
              onKeyDown={(e) => handleDropdownKey(e, "more")}
            >
              Mer
              <ChevronDown className="h-4 w-4" />
            </button>
            <AnimatePresence>
              {activeDropdown === "more" && (
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
                  className="absolute top-full right-0 mt-1 w-52 bg-white rounded-card shadow-lg border border-border p-2"
                >
                  {moreLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-muted transition-colors"
                    >
                      <link.icon className={`h-5 w-5 ${link.iconColor}`} />
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Anmälan — top-level CTA as Anna requested */}
          <Button
            asChild
            className="hidden lg:inline-flex bg-brand-red text-white hover:bg-brand-red/90 font-display font-semibold rounded-cta px-6"
          >
            <Link to="/anmal-dig">Anmälan</Link>
          </Button>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-text hover:text-brand-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Stäng meny" : "Öppna meny"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={prefersReducedMotion ? false : { x: "-100%" }}
              animate={{ x: "0%" }}
              exit={prefersReducedMotion ? undefined : { x: "-100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                duration: prefersReducedMotion ? 0 : undefined,
              }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100dvh",
                width: "85%",
                maxWidth: 360,
                zIndex: 50,
                overflowY: "auto",
                backgroundColor: "white",
              }}
              role="dialog"
              aria-label="Navigeringsmeny"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <img
                    src="/images/logo_boostbyfcr_dark.png"
                    alt="Boost by FC Rosengård"
                    className="h-7 w-auto"
                  />
                  <button
                    onClick={() => setMobileOpen(false)}
                    aria-label="Stäng meny"
                  >
                    <X className="h-6 w-6 text-text" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Anmälan — top link in mobile */}
                  <div>
                    <Link
                      to="/anmal-dig"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-brand-red hover:bg-brand-red-light transition-colors"
                    >
                      <PenLine className="h-5 w-5 text-brand-red" />
                      Anmälan
                    </Link>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                      Arbetssökande
                    </p>
                    <div className="space-y-1">
                      {jobSeekerLinks.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-muted transition-colors"
                        >
                          <link.icon className={`h-5 w-5 ${link.iconColor}`} />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Link
                      to="/foretag"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md"
                    >
                      Arbetsgivare
                    </Link>
                  </div>

                  <div>
                    <Link
                      to="/studier"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md"
                    >
                      Skolor och utbildningsanordnare
                    </Link>
                  </div>

                  <div>
                    <Link
                      to="/vad-vi-gor"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md"
                    >
                      Vårt arbetssätt
                    </Link>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                      Om oss
                    </p>
                    <div className="space-y-1">
                      {aboutLinks.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-muted transition-colors"
                        >
                          <link.icon className={`h-5 w-5 ${link.iconColor}`} />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                      Mer
                    </p>
                    <div className="space-y-1">
                      {moreLinks.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-muted transition-colors"
                        >
                          <link.icon className={`h-5 w-5 ${link.iconColor}`} />
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <Button
                    asChild
                    className="w-full bg-brand-red text-white hover:bg-brand-red/90 font-display font-semibold rounded-cta"
                  >
                    <Link to="/anmal-dig" onClick={() => setMobileOpen(false)}>
                      Anmälan
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
