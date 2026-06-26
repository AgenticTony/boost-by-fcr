import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: '#0A1929',
      padding: '1rem',
      zIndex: 50,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '1.5rem', textDecoration: 'none' }}>
          BOOST <span style={{ color: 'white', fontSize: '0.875rem' }}>by FCR</span>
        </Link>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/" style={{ color: isActive("/") ? '#D4AF37' : 'white', textDecoration: 'none' }}>
            Bibliotek
          </Link>
          <Link to="/resources" style={{ color: isActive("/resources") ? '#D4AF37' : 'white', textDecoration: 'none' }}>
            Resurser
          </Link>
          <Link to="/handbook" style={{ color: isActive("/handbook") ? '#D4AF37' : 'white', textDecoration: 'none' }}>
            Handbok
          </Link>
          <Link to="/knowledge" style={{ color: isActive("/knowledge") ? '#D4AF37' : 'white', textDecoration: 'none' }}>
            Kunskap
          </Link>
        </div>

        {isAuthenticated && (
          <button
            onClick={logout}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Logga ut
          </button>
        )}
      </div>
    </header>
  );
}
