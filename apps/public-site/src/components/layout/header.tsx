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
  Users,
  UsersRound,
  Layers,
  Newspaper,
  BriefcaseMedical,
  Clock,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const forYouLinks = [
  {
    href: "/arbetssokande",
    label: "Arbetsspåret",
    icon: Briefcase,
    iconColor: "text-brand-gold",
  },
  {
    href: "/studier",
    label: "Studiespåret",
    icon: BookOpen,
    iconColor: "text-brand-teal",
  },
  {
    href: "/halsosparet",
    label: "Hälsospåret",
    icon: Heart,
    iconColor: "text-success",
  },
  {
    href: "/bridge",
    label: "Bridge by FCR",
    icon: Users,
    iconColor: "text-brand-gold",
  },
];

const aboutLinks = [
  {
    href: "/vem-vi-ar",
    label: "Vem vi är",
    icon: UsersRound,
    iconColor: "text-brand-teal",
  },
  {
    href: "/vad-vi-gor",
    label: "Vad vi gör",
    icon: Layers,
    iconColor: "text-brand-navy",
  },
  {
    href: "/var-historia",
    label: "Vår historia",
    icon: Clock,
    iconColor: "text-brand-gold",
  },
  {
    href: "/press-media",
    label: "Press & media",
    icon: Newspaper,
    iconColor: "text-brand-gold",
  },
  {
    href: "/lediga-tjanster",
    label: "Lediga tjänster",
    icon: BriefcaseMedical,
    iconColor: "text-brand-teal",
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
      <nav className="container-page flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/images/logo_boostbyfcr_dark.png"
            alt="Boost by FC Rosengård"
            className="h-8 md:h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {/* För dig — mega-menu trigger */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("for-you")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text hover:text-brand-navy transition-colors rounded-md hover:bg-muted"
              aria-expanded={activeDropdown === "for-you"}
              aria-haspopup="true"
              onKeyDown={(e) => handleDropdownKey(e, "for-you")}
            >
              För dig
              <ChevronDown className="h-4 w-4" />
            </button>
            <AnimatePresence>
              {activeDropdown === "for-you" && (
                <motion.div
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
                  className="absolute top-full left-0 mt-1 w-64 bg-white rounded-card shadow-lg border border-border p-2"
                >
                  {forYouLinks.map((link) => (
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
            För företag
          </Link>

          {/* Om Boost — dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("about")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-text hover:text-brand-navy transition-colors rounded-md hover:bg-muted"
              aria-expanded={activeDropdown === "about"}
              aria-haspopup="true"
              onKeyDown={(e) => handleDropdownKey(e, "about")}
            >
              Om Boost
              <ChevronDown className="h-4 w-4" />
            </button>
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

          <Link
            to="/nyheter"
            className="px-3 py-2 text-sm font-medium text-text hover:text-brand-navy transition-colors rounded-md hover:bg-muted"
          >
            Nyheter
          </Link>

          <Link
            to="/resurser"
            className="px-3 py-2 text-sm font-medium text-text hover:text-brand-navy transition-colors rounded-md hover:bg-muted"
          >
            Resurser
          </Link>

          <Link
            to="/kontakt"
            className="px-3 py-2 text-sm font-medium text-text hover:text-brand-navy transition-colors rounded-md hover:bg-muted"
          >
            Kontakt
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button
            asChild
            className="hidden lg:inline-flex bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-display font-semibold rounded-cta px-6"
          >
            <Link to="/anmal-dig">Anmäl dig</Link>
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
                  <div>
                    <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                      För dig
                    </p>
                    <div className="space-y-1">
                      {forYouLinks.map((link) => (
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
                      För företag
                    </Link>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-text-muted uppercase tracking-wider mb-3">
                      Om Boost
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

                  <div className="space-y-1">
                    <Link
                      to="/nyheter"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-muted transition-colors"
                    >
                      <Newspaper className="h-5 w-5 text-brand-gold" />
                      Nyheter
                    </Link>
                  </div>

                  <div className="space-y-1">
                    <Link
                      to="/resurser"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm hover:bg-muted transition-colors"
                    >
                      <FileText className="h-5 w-5 text-brand-teal" />
                      Resurser
                    </Link>
                  </div>

                  <div>
                    <Link
                      to="/kontakt"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 text-sm font-medium hover:bg-muted rounded-md"
                    >
                      Kontakt
                    </Link>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <Button
                    asChild
                    className="w-full bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-display font-semibold rounded-cta"
                  >
                    <Link to="/anmal-dig" onClick={() => setMobileOpen(false)}>
                      Anmäl dig
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
