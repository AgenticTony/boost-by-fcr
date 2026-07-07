import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function Header() {
  const { logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  if (location.pathname === '/login') return null;

  const navLinks = [
    { path: "/", label: "Bibliotek" },
    { path: "/resources", label: "Resurser" },
    { path: "/knowledge", label: "Kunskapsbanken" },
    { path: "/handbook", label: "Handböcker" },
  ];

  return (
    <header style={{ 
      position: 'sticky', 
      top: 0, 
      zIndex: 9999,
      backgroundColor: '#0a1f3d',
      borderBottom: '1px solid #1a4a7a',
      padding: '0 24px'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        maxWidth: '1280px',
        margin: '0 auto',
        height: '64px'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <img 
            src="/logo_boostbyfcr_dark.png" 
            alt="Boost by FC Rosengård" 
            style={{ height: '32px', width: 'auto' }}
          />
        </Link>
        
        {/* Desktop Nav */}
        <nav style={{ display: 'flex', gap: '4px' }}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                textDecoration: 'none',
                color: isActive(link.path) ? '#D4AF37' : '#C0C7DA',
                backgroundColor: isActive(link.path) ? 'rgba(212,175,55,0.1)' : 'transparent',
                transition: 'all 0.2s'
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Admin + Logout */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link
            to="/admin/approvals"
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'none',
              color: isActive("/admin") ? '#D4AF37' : '#C0C7DA',
              backgroundColor: isActive("/admin") ? 'rgba(212,175,55,0.1)' : 'transparent'
            }}
          >
            Admin
          </Link>
          <button 
            onClick={logout}
            style={{ 
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 500,
              background: 'none',
              border: '1px solid #C93320',
              color: '#F04D38',
              cursor: 'pointer'
            }}
          >
            Logga ut
          </button>
        </div>
      </div>
    </header>
  );
}