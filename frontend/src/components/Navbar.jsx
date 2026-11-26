import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUtilizator } from '../data/utilizatoriDemo'

export default function Navbar({ utilizatorCurent, onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUtilizator()
    if (onLogout) onLogout()
    navigate('/login')
  }

  return (
    <header style={styles.header}>
      <div style={styles.navContainer}>
        {/* Logo RentCam */}
        <Link to="/" style={styles.logoLink}>
          <div style={styles.logoPill}>RC</div>
          <div>
            <div style={styles.logoText}>
              Rent<span style={styles.logoAccent}>Cam</span>
            </div>
            <div style={styles.logoSubtitle}>PRO RENTAL STUDIO</div>
          </div>
        </Link>

        {/* Linkuri de navigare */}
        <nav style={styles.navLinks}>
          <Link to="/" style={styles.navLink}>
            Catalog
          </Link>

          {utilizatorCurent ? (
            <div style={styles.userSection}>
              <div style={styles.userBadge}>
                <span style={styles.userAvatar}>
                  {utilizatorCurent.avatar || 'CL'}
                </span>
                <span style={styles.userName}>
                  {utilizatorCurent.nume}
                </span>
                {utilizatorCurent.companie && (
                  <span style={styles.companyTag}>
                    • {utilizatorCurent.companie}
                  </span>
                )}
              </div>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Ieșire
              </button>
            </div>
          ) : (
            <Link to="/login" style={styles.loginBtn}>
              Autentificare
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

const styles = {
  header: {
    backgroundColor: '#FFFFFF',
    borderBottom: '1.5px solid var(--color-border)',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    boxShadow: 'var(--shadow-sm)'
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px'
  },
  logoLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none'
  },
  logoPill: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'var(--color-primary-gradient)',
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(225, 29, 72, 0.25)'
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '900',
    color: 'var(--color-text)',
    letterSpacing: '-0.5px',
    lineHeight: 1.1
  },
  logoAccent: {
    color: 'var(--color-primary)'
  },
  logoSubtitle: {
    fontSize: '10px',
    fontWeight: '800',
    color: 'var(--color-accent-orange)',
    letterSpacing: '1px'
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  navLink: {
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '700',
    color: 'var(--color-text-muted)',
    padding: '8px 12px',
    borderRadius: 'var(--radius-sm)',
    transition: 'all var(--motion-fast)'
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  userBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#FFF7ED',
    border: '1.5px solid #FDBA74',
    padding: '6px 14px',
    borderRadius: 'var(--radius-full)'
  },
  userAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: 'var(--color-primary-gradient)',
    color: '#FFFFFF',
    fontSize: '11px',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  userName: {
    fontSize: '13px',
    fontWeight: '800',
    color: 'var(--color-text)'
  },
  companyTag: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--color-text-muted)'
  },
  logoutBtn: {
    padding: '7px 14px',
    fontSize: '13px'
  },
  loginBtn: {
    textDecoration: 'none',
    background: 'var(--color-primary-gradient)',
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: '14px',
    padding: '9px 18px',
    borderRadius: 'var(--radius-md)',
    boxShadow: '0 4px 12px rgba(225, 29, 72, 0.25)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}
