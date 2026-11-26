import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  citesteRezervari,
  anuleazaRezervare,
  NUME_EVENIMENT_REZERVARI
} from '../data/rezervariDemo'

export default function MyBookingsPage({ utilizatorCurent }) {
  const navigate = useNavigate()
  const [rezervari, setRezervari] = useState([])
  const [mesajNotificare, setMesajNotificare] = useState('')

  const actualizeazaLista = () => {
    setRezervari(citesteRezervari())
  }

  useEffect(() => {
    if (!utilizatorCurent) {
      navigate('/login')
      return
    }

    actualizeazaLista()
    window.addEventListener(NUME_EVENIMENT_REZERVARI, actualizeazaLista)
    return () => {
      window.removeEventListener(NUME_EVENIMENT_REZERVARI, actualizeazaLista)
    }
  }, [utilizatorCurent, navigate])

  const handleAnuleaza = (idRezervare) => {
    if (window.confirm(`Sigur dorești să anulezi rezervarea ${idRezervare}?`)) {
      const reusit = anuleazaRezervare(idRezervare)
      if (reusit) {
        setMesajNotificare(`Rezervarea ${idRezervare} a fost anulată.`)
        setTimeout(() => setMesajNotificare(''), 3000)
      }
    }
  }

  // Obține clasa de stil pentru status
  const obtineBadgeStatus = (status) => {
    switch (status) {
      case 'Confirmată':
        return {
          background: 'var(--color-success-bg)',
          color: 'var(--color-success)',
          border: '1px solid #BBF7D0'
        }
      case 'În așteptare':
        return {
          background: '#FEF3C7',
          color: '#B45309',
          border: '1px solid #FDE68A'
        }
      case 'Anulată':
        return {
          background: '#FFE4E6',
          color: '#E11D48',
          border: '1px solid #FDA4AF'
        }
      default:
        return {
          background: '#F3F4F6',
          color: '#4B5563',
          border: '1px solid #E5E7EB'
        }
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.heading}>Rezervările mele</h1>
          <p style={styles.subheading}>
            Urmărește statusul echipamentelor închiriate și istoricul comenzilor tale RentCam.
          </p>
        </div>
        <Link to="/" style={styles.newBookingBtn}>
          + Închiriază echipament
        </Link>
      </div>

      {mesajNotificare && (
        <div style={styles.notificationBanner}>{mesajNotificare}</div>
      )}

      {rezervari.length === 0 ? (
        <div style={styles.emptyCard}>
          <div style={styles.emptyIcon}>📋</div>
          <h3 style={styles.emptyTitle}>Nu ai nicio rezervare activă</h3>
          <p style={styles.emptyText}>
            Alege camere foto, video sau kit-uri audio din catalogul nostru și trimite prima ta comandă.
          </p>
          <Link to="/" style={styles.catalogBtn}>
            Vezi Catalogul →
          </Link>
        </div>
      ) : (
        <div style={styles.bookingsList}>
          {rezervari.map((rez) => {
            const stilBadge = obtineBadgeStatus(rez.status)

            return (
              <div key={rez.id} style={styles.bookingCard}>
                {/* Header card rezervare */}
                <div style={styles.cardHeader}>
                  <div style={styles.cardHeaderLeft}>
                    <div style={styles.bookingCode}>{rez.id}</div>
                    <div style={styles.orderDate}>
                      Plasată pe: <strong>{rez.dataPlasare}</strong>
                    </div>
                  </div>

                  <div style={{ ...styles.statusBadge, ...stilBadge }}>
                    ● {rez.status}
                  </div>
                </div>

                {/* Detalii calendar predare/primire */}
                <div style={styles.scheduleRow}>
                  <div style={styles.scheduleBox}>
                    <div style={styles.scheduleLabel}>📅 Data Ridicării (Hub RentCam)</div>
                    <div style={styles.scheduleDate}>{rez.dataRidicare}</div>
                  </div>
                  <div style={styles.scheduleBox}>
                    <div style={styles.scheduleLabel}>🔄 Data Returnării</div>
                    <div style={styles.scheduleDate}>{rez.dataPredare}</div>
                  </div>
                </div>

                {/* Lista articolelor închiriate */}
                <div style={styles.itemsSection}>
                  <div style={styles.itemsHeading}>Echipamente incluse:</div>
                  <div style={styles.itemsGrid}>
                    {rez.articole.map((articol, idx) => (
                      <div key={idx} style={styles.itemRow}>
                        <div style={styles.itemBullet}>✓</div>
                        <div style={styles.itemDetails}>
                          <div style={styles.itemName}>
                            {articol.nume} {articol.cantitate > 1 && `(×${articol.cantitate})`}
                          </div>
                          <div style={styles.itemMeta}>
                            Tarif: {articol.tipTarif} • {articol.pretUnitar} lei / buc
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {rez.observatii && (
                  <div style={styles.notesBox}>
                    <strong>Observații:</strong> {rez.observatii}
                  </div>
                )}

                {/* Footer card: totaluri și acțiuni */}
                <div style={styles.cardFooter}>
                  <div style={styles.totalsGroup}>
                    <div>
                      <span style={styles.totalLabel}>Total Chirie: </span>
                      <strong style={styles.totalVal}>{rez.totalChirie} lei</strong>
                    </div>
                    <div>
                      <span style={styles.totalLabel}>Garanție Returnabilă: </span>
                      <strong style={styles.depositVal}>{rez.totalGarantie} lei</strong>
                    </div>
                  </div>

                  {rez.status === 'În așteptare' && (
                    <button
                      type="button"
                      onClick={() => handleAnuleaza(rez.id)}
                      style={styles.cancelBtn}
                    >
                      Anulează rezervarea
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '4px'
  },
  heading: {
    fontSize: '28px',
    fontWeight: '900',
    color: 'var(--color-text)',
    marginBottom: '4px'
  },
  subheading: {
    fontSize: '14px',
    color: 'var(--color-text-muted)'
  },
  newBookingBtn: {
    textDecoration: 'none',
    background: 'var(--color-primary-gradient)',
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: '13px',
    padding: '10px 18px',
    borderRadius: 'var(--radius-md)',
    boxShadow: '0 3px 10px rgba(225, 29, 72, 0.25)'
  },
  notificationBanner: {
    background: '#DCFCE7',
    border: '1px solid #BBF7D0',
    color: '#15803D',
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    fontSize: '13px',
    fontWeight: '800'
  },
  bookingsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  bookingCard: {
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '28px',
    boxShadow: 'var(--shadow-card)'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '16px',
    borderBottom: '1.5px dashed var(--color-border)',
    marginBottom: '18px'
  },
  cardHeaderLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  bookingCode: {
    fontSize: '18px',
    fontWeight: '900',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-mono)'
  },
  orderDate: {
    fontSize: '12px',
    color: 'var(--color-text-light)'
  },
  statusBadge: {
    fontSize: '12px',
    fontWeight: '800',
    padding: '5px 12px',
    borderRadius: 'var(--radius-full)'
  },
  scheduleRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '20px'
  },
  scheduleBox: {
    background: '#FFFDF9',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    padding: '12px 16px'
  },
  scheduleLabel: {
    fontSize: '11px',
    fontWeight: '800',
    textTransform: 'uppercase',
    color: 'var(--color-accent-orange)',
    marginBottom: '4px'
  },
  scheduleDate: {
    fontSize: '15px',
    fontWeight: '800',
    color: 'var(--color-text)'
  },
  itemsSection: {
    marginBottom: '16px'
  },
  itemsHeading: {
    fontSize: '13px',
    fontWeight: '800',
    color: 'var(--color-text)',
    marginBottom: '10px'
  },
  itemsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '10px'
  },
  itemRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: '#FFFDF9',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: '10px 12px'
  },
  itemBullet: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    background: '#DCFCE7',
    color: '#15803D',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: '900',
    flexShrink: 0
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column'
  },
  itemName: {
    fontSize: '13px',
    fontWeight: '800',
    color: 'var(--color-text)'
  },
  itemMeta: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  notesBox: {
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    background: '#FFF7ED',
    border: '1px solid #FDBA74',
    padding: '10px 14px',
    borderRadius: 'var(--radius-md)',
    marginBottom: '16px'
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '16px',
    borderTop: '1px solid var(--color-border)',
    flexWrap: 'wrap',
    gap: '12px'
  },
  totalsGroup: {
    display: 'flex',
    gap: '20px',
    fontSize: '14px'
  },
  totalLabel: {
    color: 'var(--color-text-muted)'
  },
  totalVal: {
    color: 'var(--color-primary)',
    fontWeight: '900'
  },
  depositVal: {
    color: 'var(--color-text)',
    fontWeight: '800'
  },
  cancelBtn: {
    background: '#FFF1F2',
    color: 'var(--color-primary)',
    border: '1.5px solid #FDA4AF',
    padding: '8px 14px',
    fontSize: '12px',
    fontWeight: '800',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer'
  },
  emptyCard: {
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '48px 24px',
    textAlign: 'center',
    boxShadow: 'var(--shadow-card)'
  },
  emptyIcon: {
    fontSize: '44px',
    marginBottom: '14px'
  },
  emptyTitle: {
    fontSize: '20px',
    fontWeight: '900',
    color: 'var(--color-text)',
    marginBottom: '8px'
  },
  emptyText: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    marginBottom: '20px'
  },
  catalogBtn: {
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    background: 'var(--color-primary-gradient)',
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: '14px',
    padding: '10px 20px',
    borderRadius: 'var(--radius-md)',
    boxShadow: '0 4px 12px rgba(225, 29, 72, 0.25)'
  }
}
