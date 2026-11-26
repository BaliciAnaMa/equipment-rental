import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  citesteCos,
  actualizeazaCantitate,
  stergeDinCos,
  golesteCos,
  calculeazaPretUnitar,
  NUME_EVENIMENT_COS
} from '../data/cosDemo'
import { rezervariApi } from '../api/client'
import { adaugaRezervare } from '../data/rezervariDemo'

export default function CartPage({ utilizatorCurent }) {
  const navigate = useNavigate()
  const [articoleCos, setArticoleCos] = useState([])
  
  // Date formular rezervare
  const [dataRidicare, setDataRidicare] = useState('')
  const [dataPredare, setDataPredare] = useState('')
  const [observatii, setObservatii] = useState('')
  const [eroare, setEroare] = useState('')
  const [seTrimite, setSeTrimite] = useState(false)

  // Sincronizare la montare și la schimbări
  const actualizeazaStareCos = () => {
    setArticoleCos(citesteCos())
  }

  // Sincronizare la montare și protejare rută dacă utilizatorul nu este logat
  useEffect(() => {
    if (!utilizatorCurent) {
      navigate('/login')
      return
    }

    actualizeazaStareCos()

    // Valori inițiale default pentru date calendar
    const azi = new Date()
    const maine = new Date()
    maine.setDate(azi.getDate() + 2)

    setDataRidicare(azi.toISOString().split('T')[0])
    setDataPredare(maine.toISOString().split('T')[0])

    window.addEventListener(NUME_EVENIMENT_COS, actualizeazaStareCos)
    return () => {
      window.removeEventListener(NUME_EVENIMENT_COS, actualizeazaStareCos)
    }
  }, [utilizatorCurent, navigate])

  // Calcule totale
  const subtotalChirie = articoleCos.reduce((acc, item) => {
    return acc + calculeazaPretUnitar(item) * item.cantitate
  }, 0)

  const garantieTotala = articoleCos.reduce((acc, item) => {
    return acc + item.garantie * item.cantitate
  }, 0)

  // Modificare cantitate
  const handleSchimbaCantitate = (item, delta) => {
    actualizeazaCantitate(item.id, item.tipTarif, item.cantitate + delta)
  }

  // Ștergere articol
  const handleStergeArticol = (item) => {
    stergeDinCos(item.id, item.tipTarif)
  }

  // Trimite comanda de rezervare către API MySQL (cu fallback local dacă serverul nu răspunde)
  const handleFinalizeazaRezervare = async (e) => {
    e.preventDefault()
    setEroare('')

    if (!utilizatorCurent) {
      setEroare('Trebuie să fii autentificat ca să poți finaliza rezervarea.')
      return
    }

    if (!dataRidicare || !dataPredare) {
      setEroare('Te rugăm să alegi data de ridicare și data de predare.')
      return
    }

    setSeTrimite(true)

    // Pregătim datele pentru API
    const dateRezervareApi = {
      articole: articoleCos.map((item) => ({
        echipament_id: item.id,
        tip_tarif: item.tipTarif,
        cantitate: item.cantitate
      })),
      data_ridicare: dataRidicare,
      data_predare: dataPredare,
      observatii
    }

    try {
      await rezervariApi.trimite(dateRezervareApi)
      golesteCos()
      navigate('/rezervarile-mele')
    } catch (err) {
      console.warn('Eroare API la plasarea rezervării:', err.message)
      // Dacă backend-ul MySQL nu este accesibil pe portul 5000, salvăm și fallback-ul local
      try {
        adaugaRezervare({
          clientNume: utilizatorCurent.nume,
          clientEmail: utilizatorCurent.email,
          clientCompanie: utilizatorCurent.companie || '',
          dataRidicare,
          dataPredare,
          observatii,
          articole: articoleCos.map((item) => ({
            id: item.id,
            nume: item.nume,
            categorie: item.categorie,
            tipTarif: item.tipTarif,
            cantitate: item.cantitate,
            pretUnitar: calculeazaPretUnitar(item),
            garantie: item.garantie
          })),
          totalChirie: subtotalChirie,
          totalGarantie: garantieTotala
        })
        golesteCos()
        navigate('/rezervarile-mele')
      } catch (errFallback) {
        setEroare(err.message || 'Eroare la transmiterea rezervării.')
      }
    } finally {
      setSeTrimite(false)
    }
  }

  // Stare coș gol
  if (articoleCos.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <div style={styles.emptyCard}>
          <div style={styles.emptyIcon}>🛒</div>
          <h2 style={styles.emptyTitle}>Coșul tău de rezervare este gol</h2>
          <p style={styles.emptyText}>
            Explorează catalogul nostru de camere video cinema, obiective foto și echipamente de sunet pentru a începe.
          </p>
          <Link to="/" style={styles.backCatalogBtn}>
            Vezi Catalogul complet →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>
        <h1 style={styles.heading}>Coșul tău de echipamente</h1>
        <p style={styles.subheading}>
          Revizuiește selecția, alege datele de predare/retur și trimite solicitarea de rezervare.
        </p>
      </div>

      <div style={styles.layoutGrid}>
        {/* Coloana Stânga: Lista articolelor din coș + Formular interval */}
        <div style={styles.leftCol}>
          {/* Card articole */}
          <div style={styles.sectionCard}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>
                Articole selectate ({articoleCos.reduce((s, i) => s + i.cantitate, 0)})
              </h2>
              <button
                type="button"
                onClick={() => golesteCos()}
                style={styles.clearCartBtn}
              >
                Golește coșul
              </button>
            </div>

            <div style={styles.itemsList}>
              {articoleCos.map((item) => {
                const pretUnitar = calculeazaPretUnitar(item)
                const totalItem = pretUnitar * item.cantitate

                return (
                  <div key={`${item.id}-${item.tipTarif}`} style={styles.itemRow}>
                    <div style={styles.itemInfo}>
                      <div style={styles.itemBadgeRow}>
                        <span style={styles.itemCategory}>{item.categorie}</span>
                        <span style={styles.itemTierBadge}>{item.tipTarif}</span>
                      </div>
                      <Link to={`/equipment/${item.id}`} style={styles.itemTitleLink}>
                        <h3 style={styles.itemTitle}>{item.nume}</h3>
                      </Link>
                      <div style={styles.itemMeta}>
                        Garanție: {item.garantie} lei / buc • Montură: {item.montura}
                      </div>
                    </div>

                    <div style={styles.itemControls}>
                      {/* Control cantitate */}
                      <div style={styles.quantityBox}>
                        <button
                          type="button"
                          onClick={() => handleSchimbaCantitate(item, -1)}
                          style={styles.qtyBtn}
                        >
                          -
                        </button>
                        <span style={styles.qtyValue}>{item.cantitate}</span>
                        <button
                          type="button"
                          onClick={() => handleSchimbaCantitate(item, 1)}
                          style={styles.qtyBtn}
                        >
                          +
                        </button>
                      </div>

                      {/* Preț articol */}
                      <div style={styles.itemPriceCol}>
                        <div style={styles.itemTotalPrice}>{totalItem} lei</div>
                        <div style={styles.itemUnitPrice}>
                          {pretUnitar} lei × {item.cantitate}
                        </div>
                      </div>

                      {/* Buton eliminare */}
                      <button
                        type="button"
                        onClick={() => handleStergeArticol(item)}
                        style={styles.deleteBtn}
                        title="Elimină din coș"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Formular date ridicare / predare */}
          <div style={styles.sectionCard}>
            <h2 style={styles.sectionTitle}>Perioadă & Observații predare</h2>
            <div style={styles.datesGrid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Data ridicării de la hub</label>
                <input
                  type="date"
                  value={dataRidicare}
                  onChange={(e) => setDataRidicare(e.target.value)}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Data predării (retur)</label>
                <input
                  type="date"
                  value={dataPredare}
                  onChange={(e) => setDataPredare(e.target.value)}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Observații speciale pentru echipa tehnică (opțional)</label>
              <textarea
                rows="3"
                placeholder="Ex: Producție interviu la locație, avem nevoie de bateriile încărcate 100% și geantă de transport rezistentă."
                value={observatii}
                onChange={(e) => setObservatii(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Coloana Dreapta: Card sumar și finalizare */}
        <div style={styles.rightCol}>
          <div style={styles.summaryCard}>
            <h2 style={styles.summaryTitle}>Sumar rezervare</h2>

            <div style={styles.summaryRows}>
              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Subtotal chirie echipamente</span>
                <span style={styles.summaryVal}>{subtotalChirie} lei</span>
              </div>

              <div style={styles.summaryRow}>
                <span style={styles.summaryLabel}>Garanție returnabilă</span>
                <span style={styles.summaryValHighlight}>{garantieTotala} lei</span>
              </div>

              <div style={styles.divider} />

              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Total de achitat la ridicare:</span>
                <span style={styles.totalVal}>{subtotalChirie} lei</span>
              </div>
            </div>

            {/* Notificare garanție */}
            <div style={styles.infoBox}>
              <span style={styles.infoIcon}>🛡️</span>
              <div style={styles.infoText}>
                <strong>Politica RentCam:</strong> Garanția de {garantieTotala} lei se preautorizează la predarea echipamentelor și se restituie imediat la retur, după verificarea accesoriilor.
              </div>
            </div>

            {eroare && <div style={styles.errorBox}>{eroare}</div>}

            {/* Buton acțiune */}
            {utilizatorCurent ? (
              <button
                type="button"
                onClick={handleFinalizeazaRezervare}
                disabled={seTrimite}
                style={styles.submitBtn}
              >
                {seTrimite ? 'Se trimite rezervarea...' : 'Trimite rezervarea →'}
              </button>
            ) : (
              <Link to="/login" style={styles.loginRedirectBtn}>
                Autentifică-te pentru a rezerva →
              </Link>
            )}

            <div style={styles.securityPoints}>
              <div>✓ Contract electronic generat automat</div>
              <div>✓ Fără taxe ascunse sau comisioane de anulare</div>
              <div>✓ Verificare tehnică asistată de operator la hub</div>
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
    gap: '24px'
  },
  pageHeader: {
    marginBottom: '8px'
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
  layoutGrid: {
    display: 'grid',
    gridTemplateColumns: '1.25fr 0.75fr',
    gap: '28px',
    alignItems: 'start'
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  sectionCard: {
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '24px 28px',
    boxShadow: 'var(--shadow-card)'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '18px',
    paddingBottom: '12px',
    borderBottom: '1px solid var(--color-border-subtle)'
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: 'var(--color-text)'
  },
  clearCartBtn: {
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    color: 'var(--color-primary)',
    fontSize: '12px',
    fontWeight: '700',
    cursor: 'pointer',
    padding: '4px 8px'
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  itemRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    paddingBottom: '16px',
    borderBottom: '1px dashed var(--color-border)'
  },
  itemInfo: {
    flex: 1
  },
  itemBadgeRow: {
    display: 'flex',
    gap: '6px',
    marginBottom: '6px'
  },
  itemCategory: {
    fontSize: '10px',
    fontWeight: '800',
    textTransform: 'uppercase',
    background: '#FFF7ED',
    color: 'var(--color-accent-orange)',
    padding: '2px 6px',
    borderRadius: 'var(--radius-xs)',
    border: '1px solid #FDBA74'
  },
  itemTierBadge: {
    fontSize: '10px',
    fontWeight: '800',
    background: '#FEF3C7',
    color: '#B45309',
    padding: '2px 6px',
    borderRadius: 'var(--radius-xs)'
  },
  itemTitleLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  itemTitle: {
    fontSize: '16px',
    fontWeight: '800',
    color: 'var(--color-text)',
    marginBottom: '4px'
  },
  itemMeta: {
    fontSize: '12px',
    color: 'var(--color-text-light)'
  },
  itemControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  quantityBox: {
    display: 'inline-flex',
    alignItems: 'center',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    background: '#FFFDF9',
    overflow: 'hidden'
  },
  qtyBtn: {
    border: 'none',
    boxShadow: 'none',
    background: 'transparent',
    width: '32px',
    height: '32px',
    padding: 0,
    fontSize: '16px',
    fontWeight: '900',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  qtyValue: {
    fontSize: '13px',
    fontWeight: '800',
    minWidth: '24px',
    textAlign: 'center'
  },
  itemPriceCol: {
    textAlign: 'right',
    minWidth: '90px'
  },
  itemTotalPrice: {
    fontSize: '16px',
    fontWeight: '900',
    color: 'var(--color-text)'
  },
  itemUnitPrice: {
    fontSize: '11px',
    color: 'var(--color-text-muted)'
  },
  deleteBtn: {
    border: 'none',
    boxShadow: 'none',
    background: '#FFF1F2',
    color: 'var(--color-primary)',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    cursor: 'pointer',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: '900'
  },
  datesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '16px'
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
  rightCol: {
    position: 'sticky',
    top: '90px'
  },
  summaryCard: {
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '28px',
    boxShadow: 'var(--shadow-float)'
  },
  summaryTitle: {
    fontSize: '18px',
    fontWeight: '900',
    color: 'var(--color-text)',
    marginBottom: '18px',
    paddingBottom: '12px',
    borderBottom: '1.5px dashed var(--color-border)'
  },
  summaryRows: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px'
  },
  summaryLabel: {
    color: 'var(--color-text-muted)'
  },
  summaryVal: {
    fontWeight: '700',
    color: 'var(--color-text)'
  },
  summaryValHighlight: {
    fontWeight: '800',
    color: 'var(--color-primary)'
  },
  divider: {
    height: '1px',
    background: 'var(--color-border)',
    margin: '4px 0'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingTop: '6px'
  },
  totalLabel: {
    fontSize: '14px',
    fontWeight: '800',
    color: 'var(--color-text)'
  },
  totalVal: {
    fontSize: '24px',
    fontWeight: '900',
    color: 'var(--color-primary)',
    letterSpacing: '-0.5px'
  },
  infoBox: {
    background: '#FFFDF9',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    padding: '12px',
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },
  infoIcon: {
    fontSize: '18px',
    flexShrink: 0
  },
  infoText: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    lineHeight: 1.45
  },
  errorBox: {
    background: '#FFE4E6',
    border: '1px solid #FDA4AF',
    color: '#E11D48',
    padding: '10px 14px',
    borderRadius: 'var(--radius-md)',
    fontSize: '12px',
    fontWeight: '700',
    marginBottom: '16px'
  },
  submitBtn: {
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
    marginBottom: '16px'
  },
  loginRedirectBtn: {
    width: '100%',
    padding: '14px',
    background: 'var(--color-primary-gradient)',
    color: '#FFFFFF',
    borderRadius: 'var(--radius-md)',
    fontSize: '14px',
    fontWeight: '800',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    boxShadow: '0 4px 14px rgba(225, 29, 72, 0.3)',
    marginBottom: '16px'
  },
  securityPoints: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    fontSize: '12px',
    color: 'var(--color-text-muted)',
    fontWeight: '600'
  },
  emptyContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '60px 16px'
  },
  emptyCard: {
    maxWidth: '520px',
    width: '100%',
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '44px 32px',
    textAlign: 'center',
    boxShadow: 'var(--shadow-card)'
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '14px'
  },
  emptyTitle: {
    fontSize: '22px',
    fontWeight: '900',
    color: 'var(--color-text)',
    marginBottom: '8px'
  },
  emptyText: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    lineHeight: 1.6,
    marginBottom: '24px'
  },
  backCatalogBtn: {
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'var(--color-primary-gradient)',
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: '14px',
    padding: '12px 24px',
    borderRadius: 'var(--radius-md)',
    boxShadow: '0 4px 14px rgba(225, 29, 72, 0.25)'
  }
}
