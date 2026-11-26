import React, { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ECHIPAMENTE_DEMO } from '../data/echipamenteDemo'
import { adaugaInCos } from '../data/cosDemo'

const PALIERI_TARIF = [
  { id: '1 Zi', titlu: '1 Zi (24 ore)', detaliu: 'Standard' },
  { id: 'Weekend -25%', titlu: 'Pachet Weekend', detaliu: 'Vin 16:00 – Lun 11:00 (-25%)' },
  { id: '7 Zile', titlu: '7 Zile (Săptămână)', detaliu: 'Reducere volum' }
]

export default function EquipmentDetailPage({ utilizatorCurent }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tipTarifSelectat, setTipTarifSelectat] = useState('1 Zi')
  const [mesajAdaugat, setMesajAdaugat] = useState(false)

  // Căutare echipament după id
  const echipament = useMemo(() => {
    return ECHIPAMENTE_DEMO.find((item) => item.id === id)
  }, [id])

  // Cazul în care ID-ul nu există în baza de date locală
  if (!echipament) {
    return (
      <div style={styles.notFoundContainer}>
        <div style={styles.notFoundCard}>
          <div style={styles.notFoundIcon}>📦</div>
          <h2 style={styles.notFoundTitle}>Echipamentul nu a fost găsit</h2>
          <p style={styles.notFoundText}>
            Codul de produs căutat nu există sau a fost retras temporar din catalogul activ.
          </p>
          <Link to="/" style={styles.backBtn}>
            ← Înapoi la Catalog
          </Link>
        </div>
      </div>
    )
  }

  // Preț curent conform palierului ales
  const obtinePretCurent = () => {
    switch (tipTarifSelectat) {
      case 'Weekend -25%':
        return { valoare: echipament.pretWeekend, eticheta: 'lei / weekend promo' }
      case '7 Zile':
        return { valoare: echipament.pretSaptamana, eticheta: 'lei / 7 zile' }
      case '1 Zi':
      default:
        return { valoare: echipament.pretZi, eticheta: 'lei / 24 ore' }
    }
  }

  const pretCurent = obtinePretCurent()

  // Adăugare în coș cu feedback temporar sau redirecționare spre login dacă nu e logat
  const handleAdaugareInCos = () => {
    if (!utilizatorCurent) {
      navigate('/login')
      return
    }

    adaugaInCos(echipament, tipTarifSelectat)
    setMesajAdaugat(true)

    setTimeout(() => {
      setMesajAdaugat(false)
    }, 2000)
  }

  return (
    <div style={styles.container}>
      {/* Buton înapoi la catalog */}
      <div style={styles.topNav}>
        <Link to="/" style={styles.breadcrumbLink}>
          ← Înapoi la Catalogul complet
        </Link>
      </div>

      <div style={styles.mainGrid}>
        {/* Coloana Stânga: Detalii echipament, accesorii și specificații */}
        <div style={styles.leftCol}>
          {/* Card principal prezentare */}
          <div style={styles.overviewCard}>
            <div style={styles.badgesRow}>
              <span style={styles.categoryBadge}>{echipament.categorie}</span>
              <span style={styles.mountBadge}>Montură: {echipament.montura}</span>
              <span style={styles.availableBadge}>
                ● {echipament.disponibile} unități disponibile în depozit
              </span>
            </div>

            <h1 style={styles.equipmentTitle}>{echipament.nume}</h1>
            <p style={styles.descriptionText}>
              {echipament.descriereLunga || echipament.descriereScurta}
            </p>
          </div>

          {/* Secțiunea evidențiată: Ce primești în geantă */}
          <div style={styles.kitCard}>
            <div style={styles.kitHeader}>
              <div style={styles.kitTitle}>
                <span style={styles.kitIcon}>🎒</span> Ce primești în geanta de transport
              </div>
              <span style={styles.verifiedSeal}>✓ Verificat & Igienizat</span>
            </div>
            <p style={styles.kitSubtitle}>
              Toate accesoriile esențiale sunt incluse în cutie fără costuri suplimentare:
            </p>

            <div style={styles.kitGrid}>
              {echipament.accesoriiIncluse.map((articol, index) => (
                <div key={index} style={styles.kitItemCard}>
                  <div style={styles.kitCheckIcon}>✓</div>
                  <div style={styles.kitItemName}>{articol}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Specificații tehnice */}
          {echipament.specificatii && echipament.specificatii.length > 0 && (
            <div style={styles.specsCard}>
              <h2 style={styles.specsTitle}>Specificații tehnice de studio</h2>
              <div style={styles.specsTable}>
                {echipament.specificatii.map((spec, index) => (
                  <div
                    key={index}
                    style={{
                      ...styles.specsRow,
                      ...(index % 2 === 1 ? styles.specsRowAlt : {})
                    }}
                  >
                    <div style={styles.specLabel}>{spec.eticheta}</div>
                    <div style={styles.specValue}>{spec.valoare}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Coloana Dreapta: Card lateral de rezervare și calcul preț */}
        <div style={styles.rightCol}>
          <div style={styles.bookingCard}>
            <div style={styles.bookingHeader}>
              <div style={styles.bookingPriceLabel}>Tarif de închiriere</div>
              <div style={styles.bookingPriceValue}>
                {pretCurent.valoare} <span style={styles.priceCurrency}>lei</span>
              </div>
              <div style={styles.bookingPriceUnit}>{pretCurent.eticheta}</div>
            </div>

            {/* Selector de perioadă / palier tarifar */}
            <div style={styles.selectorSection}>
              <label style={styles.selectorLabel}>Alege intervalul tarifar:</label>
              <div style={styles.tiersList}>
                {PALIERI_TARIF.map((palier) => (
                  <button
                    key={palier.id}
                    type="button"
                    onClick={() => setTipTarifSelectat(palier.id)}
                    style={{
                      ...styles.tierOptionBtn,
                      ...(tipTarifSelectat === palier.id ? styles.tierOptionBtnActive : {})
                    }}
                  >
                    <div style={styles.tierOptionLeft}>
                      <div style={styles.tierOptionTitle}>{palier.titlu}</div>
                      <div style={styles.tierOptionDetail}>{palier.detaliu}</div>
                    </div>
                    <div style={styles.tierRadioCircle}>
                      {tipTarifSelectat === palier.id && <div style={styles.tierRadioDot} />}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sumar costuri și garanție */}
            <div style={styles.summarySection}>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Cost chirie ({tipTarifSelectat})</span>
                <span style={styles.summaryValue}>{pretCurent.valoare} lei</span>
              </div>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Garanție returnabilă</span>
                <span style={styles.summaryValueBold}>{echipament.garantie} lei</span>
              </div>

              <div style={styles.depositNotice}>
                <span style={styles.depositNoticeIcon}>ℹ️</span>
                <span>
                  Garanția se blochează temporar pe card la predare și se restituie integral la retur după verificarea tehnică a accesoriilor.
                </span>
              </div>
            </div>

            {/* Buton Adaugă în coș */}
            <button
              type="button"
              onClick={handleAdaugareInCos}
              style={{
                ...styles.submitCartBtn,
                ...(mesajAdaugat ? styles.submitCartBtnSuccess : {})
              }}
            >
              {mesajAdaugat ? '✓ Adăugat în coș!' : 'Adaugă în coș'}
            </button>

            {/* Asigurare & Suport */}
            <div style={styles.bookingFooterInfo}>
              <div>⚡ Preluare rapidă din hub în 15 minute</div>
              <div>🛡️ Echipament testat și acumulatori 100% încărcați</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  topNav: {
    marginBottom: '8px'
  },
  breadcrumbLink: {
    textDecoration: 'none',
    color: 'var(--color-primary)',
    fontWeight: '800',
    fontSize: '14px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1.25fr 0.75fr',
    gap: '28px',
    alignItems: 'start'
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  overviewCard: {
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '32px',
    boxShadow: 'var(--shadow-card)'
  },
  badgesRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '16px'
  },
  categoryBadge: {
    fontSize: '12px',
    fontWeight: '800',
    padding: '4px 10px',
    borderRadius: 'var(--radius-sm)',
    background: '#FFF7ED',
    color: 'var(--color-accent-orange)',
    border: '1px solid #FDBA74'
  },
  mountBadge: {
    fontSize: '12px',
    fontWeight: '700',
    padding: '4px 10px',
    borderRadius: 'var(--radius-sm)',
    background: '#FFFDF9',
    color: 'var(--color-text-muted)',
    border: '1px solid var(--color-border)'
  },
  availableBadge: {
    fontSize: '12px',
    fontWeight: '800',
    padding: '4px 10px',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--color-success-bg)',
    color: 'var(--color-success)'
  },
  equipmentTitle: {
    fontSize: '28px',
    fontWeight: '900',
    color: 'var(--color-text)',
    lineHeight: 1.25,
    marginBottom: '16px'
  },
  descriptionText: {
    fontSize: '15px',
    color: 'var(--color-text-muted)',
    lineHeight: 1.65
  },
  kitCard: {
    background: '#FFFDF9',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '28px',
    boxShadow: 'var(--shadow-sm)'
  },
  kitHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
    marginBottom: '8px'
  },
  kitTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: 'var(--color-text)',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  kitIcon: {
    fontSize: '20px'
  },
  verifiedSeal: {
    background: 'var(--color-success-bg)',
    color: 'var(--color-success)',
    border: '1px solid #BBF7D0',
    fontSize: '12px',
    fontWeight: '800',
    padding: '4px 12px',
    borderRadius: 'var(--radius-full)'
  },
  kitSubtitle: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginBottom: '16px'
  },
  kitGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '10px'
  },
  kitItemCard: {
    background: '#FFFFFF',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    padding: '12px 14px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: 'var(--shadow-sm)'
  },
  kitCheckIcon: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    background: '#DCFCE7',
    color: '#15803D',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '900',
    flexShrink: 0
  },
  kitItemName: {
    fontSize: '13px',
    fontWeight: '700',
    color: 'var(--color-text)'
  },
  specsCard: {
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '28px',
    boxShadow: 'var(--shadow-card)'
  },
  specsTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: 'var(--color-text)',
    marginBottom: '16px'
  },
  specsTable: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden'
  },
  specsRow: {
    display: 'grid',
    gridTemplateColumns: '180px 1fr',
    padding: '12px 16px',
    background: '#FFFFFF',
    fontSize: '13px',
    borderBottom: '1px solid var(--color-border-subtle)'
  },
  specsRowAlt: {
    background: '#FFFDF9'
  },
  specLabel: {
    fontWeight: '800',
    color: 'var(--color-text-muted)'
  },
  specValue: {
    fontWeight: '600',
    color: 'var(--color-text)'
  },
  rightCol: {
    position: 'sticky',
    top: '90px'
  },
  bookingCard: {
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '28px',
    boxShadow: 'var(--shadow-float)'
  },
  bookingHeader: {
    paddingBottom: '18px',
    borderBottom: '1.5px dashed var(--color-border)',
    marginBottom: '20px',
    textAlign: 'center'
  },
  bookingPriceLabel: {
    fontSize: '12px',
    fontWeight: '800',
    textTransform: 'uppercase',
    color: 'var(--color-accent-orange)',
    marginBottom: '4px'
  },
  bookingPriceValue: {
    fontSize: '36px',
    fontWeight: '900',
    color: 'var(--color-text)',
    letterSpacing: '-1px',
    lineHeight: 1.1
  },
  priceCurrency: {
    fontSize: '20px',
    fontWeight: '700'
  },
  bookingPriceUnit: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    fontWeight: '600',
    marginTop: '4px'
  },
  selectorSection: {
    marginBottom: '20px'
  },
  selectorLabel: {
    fontSize: '13px',
    fontWeight: '800',
    color: 'var(--color-text)',
    display: 'block',
    marginBottom: '10px'
  },
  tiersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  tierOptionBtn: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 'var(--radius-md)',
    border: '1.5px solid var(--color-border)',
    background: '#FFFDF9',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'all var(--motion-fast)'
  },
  tierOptionBtnActive: {
    borderColor: 'var(--color-accent-orange)',
    background: '#FFF7ED',
    boxShadow: '0 2px 8px rgba(249, 115, 22, 0.15)'
  },
  tierOptionLeft: {
    display: 'flex',
    flexDirection: 'column'
  },
  tierOptionTitle: {
    fontSize: '13px',
    fontWeight: '800',
    color: 'var(--color-text)'
  },
  tierOptionDetail: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  tierRadioCircle: {
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    border: '2px solid #FDBA74',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tierRadioDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'var(--color-primary)'
  },
  summarySection: {
    background: '#FFFDF9',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    padding: '16px',
    marginBottom: '20px'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '13px'
  },
  summaryLabel: {
    color: 'var(--color-text-muted)'
  },
  summaryValue: {
    fontWeight: '700',
    color: 'var(--color-text)'
  },
  summaryValueBold: {
    fontWeight: '900',
    color: 'var(--color-primary)'
  },
  depositNotice: {
    marginTop: '12px',
    paddingTop: '10px',
    borderTop: '1px dashed var(--color-border)',
    fontSize: '11px',
    color: 'var(--color-text-light)',
    lineHeight: 1.45,
    display: 'flex',
    gap: '6px'
  },
  depositNoticeIcon: {
    flexShrink: 0
  },
  submitCartBtn: {
    width: '100%',
    padding: '14px',
    background: 'var(--color-primary-gradient)',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    fontSize: '15px',
    fontWeight: '800',
    cursor: 'pointer',
    boxShadow: '0 4px 14px rgba(225, 29, 72, 0.3)',
    transition: 'all var(--motion-fast)',
    marginBottom: '16px'
  },
  submitCartBtnSuccess: {
    background: '#15803D',
    boxShadow: '0 4px 14px rgba(21, 128, 61, 0.35)'
  },
  bookingFooterInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    fontWeight: '600'
  },
  notFoundContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '60px 16px'
  },
  notFoundCard: {
    maxWidth: '480px',
    width: '100%',
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '36px',
    textAlign: 'center',
    boxShadow: 'var(--shadow-card)'
  },
  notFoundIcon: {
    fontSize: '40px',
    marginBottom: '14px'
  },
  notFoundTitle: {
    fontSize: '20px',
    fontWeight: '800',
    color: 'var(--color-text)',
    marginBottom: '8px'
  },
  notFoundText: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    marginBottom: '20px'
  },
  backBtn: {
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: '#FFF7ED',
    border: '1.5px solid #FDBA74',
    color: 'var(--color-primary)',
    fontWeight: '800',
    padding: '10px 20px',
    borderRadius: 'var(--radius-md)'
  }
}
