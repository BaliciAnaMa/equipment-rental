import React, { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import { obtineUtilizatorCurent } from './data/utilizatoriDemo'
import './styles/theme.css'

export default function App() {
  const [utilizatorCurent, setUtilizatorCurent] = useState(null)

  // Sincronizare stare utilizator la inițializare
  useEffect(() => {
    const utilizator = obtineUtilizatorCurent()
    if (utilizator) {
      setUtilizatorCurent(utilizator)
    }
  }, [])

  const handleLoginSuccess = (utilizator) => {
    setUtilizatorCurent(utilizator)
  }

  const handleLogout = () => {
    setUtilizatorCurent(null)
  }

  return (
    <div className="app-container">
      <Navbar utilizatorCurent={utilizatorCurent} onLogout={handleLogout} />

      <main className="main-content">
        <Routes>
          {/* Pagina principală — Placeholder curat pentru pasul următor */}
          <Route
            path="/"
            element={
              <div style={styles.catalogPlaceholder}>
                <div style={styles.placeholderCard}>
                  <div style={styles.badge}>Pasul 1.1 Finalizat</div>
                  <h2 style={styles.heading}>Catalog în lucru</h2>
                  <p style={styles.description}>
                    Zona de autentificare este funcțională. Echipamentele și filtrele de catalog vor fi implementate în pasul următor.
                  </p>
                  <div style={styles.statusBox}>
                    {utilizatorCurent ? (
                      <div>
                        Sunteți autentificat ca: <strong>{utilizatorCurent.nume}</strong> ({utilizatorCurent.email})
                      </div>
                    ) : (
                      <div>
                        Nu sunteți autentificat.{' '}
                        <Link to="/login" style={styles.loginLink}>
                          Mergi la Autentificare →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            }
          />

          {/* Pagina de Autentificare */}
          <Route
            path="/login"
            element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
          />
        </Routes>
      </main>
    </div>
  )
}

const styles = {
  catalogPlaceholder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px 16px'
  },
  placeholderCard: {
    maxWidth: '560px',
    width: '100%',
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '36px',
    textAlign: 'center',
    boxShadow: 'var(--shadow-card)'
  },
  badge: {
    display: 'inline-block',
    background: '#DCFCE7',
    color: '#15803D',
    border: '1px solid #BBF7D0',
    fontSize: '12px',
    fontWeight: '800',
    padding: '4px 12px',
    borderRadius: 'var(--radius-full)',
    marginBottom: '16px'
  },
  heading: {
    fontSize: '24px',
    fontWeight: '900',
    color: 'var(--color-text)',
    marginBottom: '8px'
  },
  description: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    lineHeight: 1.6,
    marginBottom: '24px'
  },
  statusBox: {
    background: '#FFFDF9',
    border: '1.5px dashed var(--color-border)',
    borderRadius: 'var(--radius-md)',
    padding: '16px',
    fontSize: '14px',
    color: 'var(--color-text)'
  },
  loginLink: {
    color: 'var(--color-primary)',
    fontWeight: '800',
    textDecoration: 'none'
  }
}
