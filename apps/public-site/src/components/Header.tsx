import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Lock } from 'lucide-react';

const navLinks = [
  { label: 'Hem', path: '/' },
  { label: 'Nyheter', path: '/news' },
  { label: 'Projekt', path: '/projects' },
  { label: 'Tidslinje', path: '/timeline' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Arbetssätt', path: '/arbetssatt' },
  { label: 'Material', path: '/materials' },
  { label: 'Företag', path: '/companies' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-boost-navy/95 backdrop-blur-md shadow-lg'
            : 'bg-boost-navy/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 text-white font-bold text-xl tracking-tight hover:text-boost-gold transition-colors"
            >
              <span className="text-boost-gold">BOOST</span>
              <span className="hidden sm:inline text-white/80 text-sm font-normal">by FCR</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-boost-gold bg-white/10'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {/* Kontakt */}
              <Link
                to="/contact"
                className="px-3 py-2 rounded-md text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                Kontakt
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/registration"
                className="px-4 py-2 bg-boost-gold text-boost-navy font-semibold rounded-lg hover:bg-boost-gold/90 transition-colors text-sm"
              >
                Anmäl intresse
              </Link>
              <a
                href="https://boost-locked-area.pages.dev/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                <Lock className="w-4 h-4" />
                <span>Medlemsarea</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pb-6 pt-2 space-y-1 bg-boost-navy/95 backdrop-blur-md border-t border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-boost-gold bg-white/10'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile - Kontakt */}
            <Link
              to="/contact"
              className="block px-4 py-3 rounded-lg text-base font-medium text-white/80 hover:text-white hover:bg-white/5 transition-colors"
            >
              Kontakt
            </Link>
            <div className="pt-4 mt-4 border-t border-white/10 space-y-3">
              <Link
                to="/registration"
                className="block w-full text-center px-4 py-3 bg-boost-gold text-boost-navy font-semibold rounded-lg hover:bg-boost-gold/90 transition-colors"
              >
                Anmäl intresse
              </Link>
              <a
                href="https://boost-locked-area.pages.dev/login"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <Lock className="w-4 h-4" />
                <span>Medlemsarea</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16 lg:h-20" />
    </>
  );
}