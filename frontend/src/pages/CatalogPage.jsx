import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ECHIPAMENTE_DEMO } from '../data/echipamenteDemo'
import { adaugaInCos } from '../data/cosDemo'

const CATEGORII = ['Toate', 'Foto', 'Video Cinema', 'Audio & Podcast', 'Kit-uri']
const MONTURI = ['Toate monturile', 'Sony E', 'Canon RF', 'Universal']
const TIPURI_TARIF = [
  { id: '1 Zi', eticheta: '1 Zi (24h)' },
  { id: 'Weekend -25%', eticheta: 'Weekend -25% (Vin-Lun)' },
  { id: '7 Zile', eticheta: '7 Zile (Săptămână)' }
]

export default function CatalogPage() {
  const [categorieSelectata, setCategorieSelectata] = useState('Toate')
  const [monturaSelectata, setMonturaSelectata] = useState('Toate monturile')
  const [tipTarif, setTipTarif] = useState('1 Zi')
  const [cautareText, setCautareText] = useState('')
  const [feedbackAdaugat, setFeedbackAdaugat] = useState({}) // { [id]: boolean }

  // Filtrare echipamente după text, categorie și montură
  const echipamenteFiltrate = useMemo(() => {
    return ECHIPAMENTE_DEMO.filter((echipament) => {
      const sePotrivesteText =
        echipament.nume.toLowerCase().includes(cautareText.toLowerCase()) ||
        echipament.descriereScurta.toLowerCase().includes(cautareText.toLowerCase())

      const sePotrivesteCategorie =
        categorieSelectata === 'Toate' || echipament.categorie === categorieSelectata

      const sePotrivesteMontura =
        monturaSelectata === 'Toate monturile' || echipament.montura === monturaSelectata

      return sePotrivesteText && sePotrivesteCategorie && sePotrivesteMontura
    })
  }, [cautareText, categorieSelectata, monturaSelectata])

  // Calculează prețul afișat în funcție de tariful selectat
  const obtinePretAfisat = (echipament) => {
    switch (tipTarif) {
      case 'Weekend -25%':
        return { valoare: echipament.pretWeekend, unitate: 'lei / weekend' }
      case '7 Zile':
        return { valoare: echipament.pretSaptamana, unitate: 'lei / săptămână' }
      case '1 Zi':
      default:
        return { valoare: echipament.pretZi, unitate: 'lei / zi' }
    }
  }

  // Adăugare în coș cu feedback temporar
  const handleAdaugaInCos = (echipament) => {
    adaugaInCos(echipament, tipTarif)
    setFeedbackAdaugat((prev) => ({ ...prev, [echipament.id]: true }))

    setTimeout(() => {
      setFeedbackAdaugat((prev) => ({ ...prev, [echipament.id]: false }))
    }, 1500)
  }

  return (
    <div style={styles.container}>
      {/* Hero Banner cald - Rubin / Mahon / Portocaliu */}
      <section style={styles.heroBanner}>
        <div style={styles.heroContent}>
          <div style={styles.heroPill}>
            <span>⚡</span> Ridicare expres din hub în 15 minute
          </div>
          <h1 style={styles.heroTitle}>
            Echipamente Cinema & Foto <br />
            <span style={styles.heroHighlight}>Pentru Creatorii Independenți</span>
          </h1>
          <p style={styles.heroDescription}>
            Camere full-frame, obiective premium, lumini de studio și kit-uri audio complete. 
            Curățate, verificate și gata de producție cu accesorii incluse.
          </p>

          {/* Căutare rapidă direct în Hero */}
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Caută cameră, obiectiv, microfon sau kit..."
              value={cautareText}
              onChange={(e) => setCautareText(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          {/* Beneficii cheie */}
          <div style={styles.benefitsRow}>
            <div style={styles.benefitItem}>
              <span>✨</span> Pachet Weekend: Vineri 16:00 – Luni 11:00 la preț promo
            </div>
            <div style={styles.benefitItem}>
              <span>🛡️</span> Garanție returnabilă rapid la verificare
            </div>
            <div style={styles.benefitItem}>
              <span>🎒</span> Genți de transport și acumulatori de rezervă incluși
            </div>
          </div>
        </div>
      </section>

      {/* Bară unică aerisită de filtrare */}
      <section style={styles.filtersBar}>
        {/* Butoane categorii */}
        <div style={styles.categoriesGroup}>
          {CATEGORII.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategorieSelectata(cat)}
              style={{
                ...styles.categoryBtn,
                ...(categorieSelectata === cat ? styles.categoryBtnActive : {})
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dropdown Montură */}
        <div style={styles.mountSelectGroup}>
          <select
            value={monturaSelectata}
            onChange={(e) => setMonturaSelectata(e.target.value)}
            style={styles.selectInput}
          >
            {MONTURI.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Comutator Tarif (1 Zi / Weekend / 7 Zile) */}
        <div style={styles.pricingSwitcher}>
          {TIPURI_TARIF.map((tarif) => (
            <button
              key={tarif.id}
              type="button"
              onClick={() => setTipTarif(tarif.id)}
              style={{
                ...styles.pricingBtn,
                ...(tipTarif === tarif.id ? styles.pricingBtnActive : {})
              }}
            >
              {tarif.eticheta}
            </button>
          ))}
        </div>
      </section>

      {/* Grid Echipamente */}
      {echipamenteFiltrate.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>🔍</div>
          <h3 style={styles.emptyTitle}>Nu am găsit echipamente</h3>
          <p style={styles.emptyText}>
            Încearcă să schimbi termenul de căutare sau filtrele de categorie/montură.
          </p>
          <button
            type="button"
            onClick={() => {
              setCautareText('')
              setCategorieSelectata('Toate')
              setMonturaSelectata('Toate monturile')
            }}
            style={styles.resetFiltersBtn}
          >
            Resetează filtrele
          </button>
        </div>
      ) : (
        <div style={styles.equipmentGrid}>
          {echipamenteFiltrate.map((echipament) => {
            const pret = obtinePretAfisat(echipament)
            const adaugat = feedbackAdaugat[echipament.id]

            return (
              <div key={echipament.id} style={styles.card}>
                {/* Header card cu badge-uri */}
                <div style={styles.cardHeader}>
                  <span style={styles.categoryBadge}>{echipament.categorie}</span>
                  <span style={styles.availabilityBadge}>
                    ● {echipament.disponibile} disponibile
                  </span>
                </div>

                {/* Titlu cu link spre pagina de detalii */}
                <Link to={`/equipment/${echipament.id}`} style={styles.cardTitleLink}>
                  <h3 style={styles.cardTitle}>{echipament.nume}</h3>
                </Link>

                <div style={styles.mountTag}>
                  Montură: <strong>{echipament.montura}</strong>
                </div>

                {/* Descriere */}
                <p style={styles.cardDescription}>{echipament.descriereScurta}</p>

                {/* Accesorii incluse preview */}
                <div style={styles.accessoriesPreview}>
                  <div style={styles.accessoriesTitle}>În geantă:</div>
                  <ul style={styles.accessoriesList}>
                    {echipament.accesoriiIncluse.slice(0, 3).map((item, idx) => (
                      <li key={idx} style={styles.accessoryItem}>
                        ✓ {item}
                      </li>
                    ))}
                    {echipament.accesoriiIncluse.length > 3 && (
                      <li style={styles.accessoryMore}>
                        + încă {echipament.accesoriiIncluse.length - 3} accesorii
                      </li>
                    )}
                  </ul>
                </div>

                {/* Zona de preț și acțiuni */}
                <div style={styles.cardFooter}>
                  <div>
                    <div style={styles.priceRow}>
                      <span style={styles.priceValue}>{pret.valoare}</span>
                      <span style={styles.priceUnit}>{pret.unitate}</span>
                    </div>
                    <div style={styles.depositLabel}>
                      Garanție: {echipament.garantie} lei
                    </div>
                  </div>

                  <div style={styles.actionsRow}>
                    <Link to={`/equipment/${echipament.id}`} style={styles.detailsBtn}>
                      Detalii
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleAdaugaInCos(echipament)}
                      style={{
                        ...styles.addToCartBtn,
                        ...(adaugat ? styles.addToCartBtnSuccess : {})
                      }}
                    >
                      {adaugat ? '✓' : 'Adaugă'}
                    </button>
                  </div>
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
  heroBanner: {
    background: 'linear-gradient(135deg, #2C1316 0%, #581C1C 55%, #9A3412 100%)',
    border: '1.5px solid #78350F',
    borderRadius: 'var(--radius-xl)',
    padding: '40px 32px',
    color: '#FFFDF9',
    boxShadow: '0 16px 36px -10px rgba(88, 28, 28, 0.45)',
    position: 'relative',
    overflow: 'hidden'
  },
  heroContent: {
    maxWidth: '780px'
  },
  heroPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: 'rgba(44, 19, 22, 0.75)',
    border: '1px solid rgba(251, 146, 60, 0.45)',
    color: '#FDBA74',
    fontSize: '13px',
    fontWeight: '800',
    padding: '6px 14px',
    borderRadius: 'var(--radius-full)',
    marginBottom: '16px'
  },
  heroTitle: {
    fontSize: '34px',
    lineHeight: 1.2,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: '-0.6px',
    marginBottom: '14px'
  },
  heroHighlight: {
    background: 'linear-gradient(135deg, #FDE68A 0%, #F97316 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  },
  heroDescription: {
    fontSize: '15px',
    color: '#FED7AA',
    lineHeight: 1.6,
    marginBottom: '22px'
  },
  searchBox: {
    position: 'relative',
    maxWidth: '540px',
    marginBottom: '20px'
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '16px',
    color: 'var(--color-accent-orange)'
  },
  searchInput: {
    width: '100%',
    padding: '13px 18px 13px 44px',
    borderRadius: 'var(--radius-full)',
    border: '2px solid rgba(251, 146, 60, 0.5)',
    background: '#FFFFFF',
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--color-text)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
  },
  benefitsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
    fontSize: '13px',
    color: '#FFEDD5',
    fontWeight: '600'
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  filtersBar: {
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '14px 18px',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '14px'
  },
  categoriesGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  categoryBtn: {
    padding: '7px 14px',
    fontSize: '13px',
    fontWeight: '700',
    borderRadius: 'var(--radius-full)',
    border: '1.5px solid var(--color-border)',
    background: '#FFFDF9',
    color: 'var(--color-text-muted)'
  },
  categoryBtnActive: {
    background: 'var(--color-primary-gradient)',
    color: '#FFFFFF',
    borderColor: 'transparent',
    boxShadow: '0 3px 10px rgba(225, 29, 72, 0.25)'
  },
  mountSelectGroup: {
    minWidth: '160px'
  },
  selectInput: {
    padding: '8px 14px',
    fontSize: '13px',
    fontWeight: '700',
    borderRadius: 'var(--radius-md)'
  },
  pricingSwitcher: {
    display: 'flex',
    gap: '4px',
    background: '#FFF7ED',
    padding: '4px',
    borderRadius: 'var(--radius-full)',
    border: '1.5px solid #FDBA74'
  },
  pricingBtn: {
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: '800',
    border: 'none',
    boxShadow: 'none',
    background: 'transparent',
    color: 'var(--color-text-muted)',
    borderRadius: 'var(--radius-full)'
  },
  pricingBtnActive: {
    background: '#FFFFFF',
    color: 'var(--color-primary)',
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
  },
  equipmentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px'
  },
  card: {
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '22px',
    boxShadow: 'var(--shadow-card)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'all var(--motion-fast)'
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
    marginBottom: '10px'
  },
  categoryBadge: {
    fontSize: '11px',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: '4px 9px',
    borderRadius: 'var(--radius-sm)',
    background: '#FFF7ED',
    color: 'var(--color-accent-orange)',
    border: '1px solid #FDBA74'
  },
  availabilityBadge: {
    fontSize: '12px',
    fontWeight: '800',
    color: 'var(--color-success)',
    background: 'var(--color-success-bg)',
    padding: '3px 8px',
    borderRadius: 'var(--radius-full)'
  },
  cardTitleLink: {
    textDecoration: 'none',
    color: 'inherit'
  },
  cardTitle: {
    fontSize: '17px',
    fontWeight: '800',
    color: 'var(--color-text)',
    marginBottom: '4px',
    transition: 'color var(--motion-fast)'
  },
  mountTag: {
    fontSize: '12px',
    color: 'var(--color-text-light)',
    marginBottom: '12px'
  },
  cardDescription: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    lineHeight: 1.5,
    marginBottom: '14px'
  },
  accessoriesPreview: {
    background: '#FFFDF9',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: '10px 12px',
    marginBottom: '16px'
  },
  accessoriesTitle: {
    fontSize: '11px',
    fontWeight: '800',
    textTransform: 'uppercase',
    color: 'var(--color-text-muted)',
    marginBottom: '6px'
  },
  accessoriesList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: 0,
    margin: 0
  },
  accessoryItem: {
    fontSize: '12px',
    color: 'var(--color-text)',
    fontWeight: '600'
  },
  accessoryMore: {
    fontSize: '11px',
    color: 'var(--color-accent-orange)',
    fontWeight: '700',
    marginTop: '2px'
  },
  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    paddingTop: '14px',
    borderTop: '1.5px dashed var(--color-border)'
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '4px'
  },
  priceValue: {
    fontSize: '20px',
    fontWeight: '900',
    color: 'var(--color-text)',
    letterSpacing: '-0.5px'
  },
  priceUnit: {
    fontSize: '12px',
    fontWeight: '700',
    color: 'var(--color-text-muted)'
  },
  depositLabel: {
    fontSize: '11px',
    fontWeight: '600',
    color: 'var(--color-text-light)'
  },
  actionsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  detailsBtn: {
    textDecoration: 'none',
    padding: '8px 12px',
    fontSize: '12px',
    fontWeight: '800',
    borderRadius: 'var(--radius-md)',
    background: '#FFFDF9',
    color: 'var(--color-text)',
    border: '1.5px solid var(--color-border)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all var(--motion-fast)'
  },
  addToCartBtn: {
    background: 'var(--color-primary-gradient)',
    color: '#FFFFFF',
    border: 'none',
    padding: '9px 14px',
    fontSize: '13px',
    fontWeight: '800',
    borderRadius: 'var(--radius-md)',
    boxShadow: '0 3px 10px rgba(225, 29, 72, 0.25)',
    transition: 'all var(--motion-fast)'
  },
  addToCartBtnSuccess: {
    background: '#15803D',
    boxShadow: '0 3px 10px rgba(21, 128, 61, 0.3)'
  },
  emptyState: {
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '48px 24px',
    textAlign: 'center',
    boxShadow: 'var(--shadow-card)'
  },
  emptyIcon: {
    fontSize: '36px',
    marginBottom: '12px'
  },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: '800',
    color: 'var(--color-text)',
    marginBottom: '6px'
  },
  emptyText: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginBottom: '16px'
  },
  resetFiltersBtn: {
    padding: '8px 16px',
    fontSize: '13px'
  }
}
