import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginClientDemo, seteazaUtilizatorCurent } from '../data/utilizatoriDemo'

export default function LoginPage({ onLoginSuccess }) {
  const navigate = useNavigate()
  const [tabActiv, setTabActiv] = useState('login') // 'login' sau 'register'
  
  // Stare formular
  const [email, setEmail] = useState('')
  const [parola, setParola] = useState('')
  const [nume, setNume] = useState('')
  const [companie, setCompanie] = useState('')
  const [mesaj, setMesaj] = useState('')

  // Autentificare prin formular clasic
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !parola) {
      setMesaj('Te rugăm să completezi emailul și parola.')
      return
    }

    if (tabActiv === 'register' && !nume) {
      setMesaj('Te rugăm să introduci numele tău complet.')
      return
    }

    const utilizatorNou = {
      id: 'usr_' + Date.now(),
      nume: tabActiv === 'register' ? nume : (email.split('@')[0] || 'Client'),
      companie: companie || 'Producție Independentă',
      email: email,
      rol: 'client',
      avatar: (nume ? nume.substring(0, 2) : 'CL').toUpperCase()
    }

    seteazaUtilizatorCurent(utilizatorNou)
    if (onLoginSuccess) onLoginSuccess(utilizatorNou)
    navigate('/')
  }

  // Buton rapid Demo Client
  const handleDemoClient = () => {
    const client = loginClientDemo()
    if (onLoginSuccess) onLoginSuccess(client)
    navigate('/')
  }

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.card}>
        {/* Header cu logo cald */}
        <div style={styles.header}>
          <div style={styles.logoPill}>RC</div>
          <h1 style={styles.title}>
            {tabActiv === 'login' ? 'Bine ai revenit' : 'Creează cont client'}
          </h1>
          <p style={styles.subtitle}>
            Platformă dedicată cineaștilor, fotografilor și studiourilor independente
          </p>
        </div>

        {/* Tab-uri Login / Înregistrare */}
        <div style={styles.tabsNav}>
          <button
            type="button"
            onClick={() => { setTabActiv('login'); setMesaj(''); }}
            style={{
              ...styles.tabBtn,
              ...(tabActiv === 'login' ? styles.tabBtnActive : {})
            }}
          >
            Autentificare
          </button>
          <button
            type="button"
            onClick={() => { setTabActiv('register'); setMesaj(''); }}
            style={{
              ...styles.tabBtn,
              ...(tabActiv === 'register' ? styles.tabBtnActive : {})
            }}
          >
            Creează cont
          </button>
        </div>

        {mesaj && <div style={styles.errorBanner}>{mesaj}</div>}

        {/* Formular de autentificare / înregistrare */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {tabActiv === 'register' && (
            <>
              <div style={styles.formGroup}>
                <label style={styles.label}>Nume complet</label>
                <input
                  type="text"
                  placeholder="Ex: Andrei Ionescu"
                  value={nume}
                  onChange={(e) => setNume(e.target.value)}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Studio / Companie (opțional)</label>
                <input
                  type="text"
                  placeholder="Ex: Studio Nord SRL"
                  value={companie}
                  onChange={(e) => setCompanie(e.target.value)}
                />
              </div>
            </>
          )}

          <div style={styles.formGroup}>
            <label style={styles.label}>Adresă de email</label>
            <input
              type="email"
              placeholder="nume@studio.ro"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Parolă</label>
            <input
              type="password"
              placeholder="••••••••"
              value={parola}
              onChange={(e) => setParola(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-primary" style={styles.submitBtn}>
            {tabActiv === 'login' ? 'Intră în cont' : 'Finalizează contul'}
          </button>
        </form>

        {/* Buton rapid Demo Client */}
        <div style={styles.demoSection}>
          <div style={styles.demoTitle}>Acces Rapid Demonstrativ</div>
          <button
            type="button"
            onClick={handleDemoClient}
            style={styles.demoBtn}
          >
            <span style={styles.demoBtnIcon}>🎬</span>
            <div>
              <div style={styles.demoBtnName}>Intră ca Client Demo (Andrei Ionescu)</div>
              <div style={styles.demoBtnEmail}>client@rentcam.ro • Studio Nord</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  pageWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px 16px'
  },
  card: {
    maxWidth: '480px',
    width: '100%',
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '36px 32px',
    boxShadow: 'var(--shadow-float)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px'
  },
  logoPill: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'var(--color-primary-gradient)',
    color: '#FFFFFF',
    fontSize: '22px',
    fontWeight: '900',
    marginBottom: '14px',
    boxShadow: '0 4px 14px rgba(225, 29, 72, 0.3)'
  },
  title: {
    fontSize: '22px',
    fontWeight: '900',
    color: 'var(--color-text)',
    marginBottom: '6px'
  },
  subtitle: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    lineHeight: 1.45
  },
  tabsNav: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '8px',
    background: '#FFF7ED',
    padding: '4px',
    borderRadius: 'var(--radius-md)',
    marginBottom: '20px'
  },
  tabBtn: {
    border: 'none',
    boxShadow: 'none',
    background: 'transparent',
    color: 'var(--color-text-muted)',
    padding: '8px 12px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '13px',
    fontWeight: '800'
  },
  tabBtnActive: {
    background: '#FFFFFF',
    color: 'var(--color-primary)',
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '13px',
    fontWeight: '800',
    color: 'var(--color-text)'
  },
  submitBtn: {
    width: '100%',
    padding: '12px',
    marginTop: '6px',
    fontSize: '14px',
    fontWeight: '800'
  },
  errorBanner: {
    backgroundColor: '#FFE4E6',
    border: '1.5px solid #FDA4AF',
    color: '#E11D48',
    padding: '10px 14px',
    borderRadius: 'var(--radius-md)',
    fontSize: '13px',
    fontWeight: '700',
    marginBottom: '16px'
  },
  demoSection: {
    marginTop: '28px',
    paddingTop: '20px',
    borderTop: '1.5px dashed var(--color-border)'
  },
  demoTitle: {
    fontSize: '12px',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    color: 'var(--color-accent-orange)',
    textAlign: 'center',
    marginBottom: '12px'
  },
  demoBtn: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    border: '1.5px solid #FDBA74',
    background: '#FFF7ED',
    color: 'var(--color-text)',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textAlign: 'left',
    cursor: 'pointer',
    transition: 'all var(--motion-fast)'
  },
  demoBtnIcon: {
    fontSize: '24px'
  },
  demoBtnName: {
    fontSize: '13px',
    fontWeight: '800',
    color: 'var(--color-primary)'
  },
  demoBtnEmail: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    fontWeight: '600'
  }
}
