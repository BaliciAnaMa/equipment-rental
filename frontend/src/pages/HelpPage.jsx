import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

const INTREBARI_FAQ = [
  {
    id: 1,
    intrebare: 'Ce documente sunt necesare la prima închiriere?',
    raspuns: 'Pentru persoane fizice este necesar actul de identitate (CI/pașaport original). Pentru persoane juridice (SRL/PFA), sunt necesare certificatul de înregistrare fiscală (CUI), o împuternicire semnată din partea administratorului și actul de identitate al delegatului care ridică echipamentul.'
  },
  {
    id: 2,
    intrebare: 'Cum și când se plătește garanția (depozitul)?',
    raspuns: 'Garanția se blochează temporar (preautorizare pe card bancar sau depunere la ghișeu) în momentul semnării procesului-verbal de predare. Imediat după verificarea tehnică la returnare, preautorizarea este deblocată în totalitate. Nu reținem comisioane de blocare.'
  },
  {
    id: 3,
    intrebare: 'Care sunt intervalele orare exacte pentru Pachetul Weekend promo?',
    raspuns: 'Pachetul Weekend îți oferă 2 zile de producție la preț promoțional de doar 1.5 zile! Poți ridica echipamentele vineri începând cu ora 16:00 și le poți returna luni dimineață până la ora 11:00.'
  },
  {
    id: 4,
    intrebare: 'Ce se întâmplă dacă un echipament suferă o avarie accidentală pe set?',
    raspuns: 'Toate echipamentele noastre sunt verificate și testate împreună cu tine la predare. Dacă intervine o problemă pe parcursul filmării, anunță imediat dispeceratul RentCam. La retur, operatorul va întocmi o fișă de constatare cu fotografii detaliate, iar costul reparației autorizate va fi dedus transparent din garanție, diferența fiind deblocată imediat.'
  },
  {
    id: 5,
    intrebare: 'Primesc baterii și accesorii suficiente în geanta de transport?',
    raspuns: 'Da! Fiecare cameră vine însoțită de geantă profesională dedicată, cel puțin 3 acumulatori originali, încărcător dublu rapid și cabluri de conexiune. Poți verifica lista completă a accesoriilor din geantă pe pagina fiecărui produs, în secțiunea „Ce primești în geantă”.'
  },
  {
    id: 6,
    intrebare: 'Pot prelungi perioada de închiriere în timp ce am deja echipamentul?',
    raspuns: 'Da, cu condiția ca echipamentul să nu fie rezervat de un alt client pentru ziua următoare. Te rugăm să ne contactezi cu cel puțin 4 ore înainte de expirarea contractului pentru a prelungi comanda.'
  }
]

export default function HelpPage() {
  const [tabActiv, setTabActiv] = useState('pasi') // 'pasi', 'weekend', 'garantie', 'faq'
  const [cautareFaq, setCautareFaq] = useState('')
  const [faqDeschis, setFaqDeschis] = useState({ 1: true }) // Primul deschis implicit

  // Filtrare FAQ după text căutat
  const intrebariFiltrate = useMemo(() => {
    if (!cautareFaq.trim()) return INTREBARI_FAQ
    const text = cautareFaq.toLowerCase()
    return INTREBARI_FAQ.filter(
      (item) =>
        item.intrebare.toLowerCase().includes(text) ||
        item.raspuns.toLowerCase().includes(text)
    )
  }, [cautareFaq])

  const toggleFaq = (id) => {
    setFaqDeschis((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div style={styles.container}>
      {/* Hero Banner Suport & Resurse */}
      <section style={styles.heroBanner}>
        <div style={styles.heroPill}>
          <span>💡</span> Centru de Suport & Resurse Client
        </div>
        <h1 style={styles.heroTitle}>Cum funcționează închirierea la RentCam?</h1>
        <p style={styles.heroSubtitle}>
          Tot ce trebuie să știi despre rezervare online, ridicarea de la ghișeu, 
          oferta de weekend și politica clară de garanție returnabilă.
        </p>

        {/* Căutare rapidă în FAQ */}
        <div style={styles.searchBox}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Caută în întrebările frecvente (ex: garanție, weekend, acte, avarii)..."
            value={cautareFaq}
            onChange={(e) => {
              setCautareFaq(e.target.value)
              if (e.target.value.trim()) {
                setTabActiv('faq')
              }
            }}
            style={styles.searchInput}
          />
        </div>
      </section>

      {/* Bară de navigare tab-uri */}
      <nav style={styles.tabsNav}>
        <button
          type="button"
          onClick={() => setTabActiv('pasi')}
          style={{
            ...styles.tabBtn,
            ...(tabActiv === 'pasi' ? styles.tabBtnActive : {})
          }}
        >
          <span>📋</span> Închirierea în 4 Pași
        </button>

        <button
          type="button"
          onClick={() => setTabActiv('weekend')}
          style={{
            ...styles.tabBtn,
            ...(tabActiv === 'weekend' ? styles.tabBtnActive : {})
          }}
        >
          <span>⚡</span> Pachet Weekend Promo
        </button>

        <button
          type="button"
          onClick={() => setTabActiv('garantie')}
          style={{
            ...styles.tabBtn,
            ...(tabActiv === 'garantie' ? styles.tabBtnActive : {})
          }}
        >
          <span>🛡️</span> Garanție & Recepție Ghișeu
        </button>

        <button
          type="button"
          onClick={() => setTabActiv('faq')}
          style={{
            ...styles.tabBtn,
            ...(tabActiv === 'faq' ? styles.tabBtnActive : {})
          }}
        >
          <span>❓</span> Întrebări Frecvente (FAQ)
        </button>
      </nav>

      {/* Conținut Tab 1: Închirierea în 4 Pași */}
      {tabActiv === 'pasi' && (
        <section style={styles.sectionPane}>
          <div style={styles.sectionHeadingBox}>
            <h2 style={styles.sectionTitle}>Flux simplu și rapid în 4 pași</h2>
            <p style={styles.sectionSubtitle}>
              Am optimizat întregul proces de la selecție până la predare, astfel încât să poți pleca la filmare în doar 15 minute.
            </p>
          </div>

          <div style={styles.stepsGrid}>
            <div style={styles.stepCard}>
              <div style={styles.stepNumber}>1</div>
              <h3 style={styles.stepTitle}>Alegi Echipamentul</h3>
              <p style={styles.stepText}>
                Explorezi camerele, obiectivele și luminile din catalog, compari monturile și verifici accesoriile incluse în fiecare geantă.
              </p>
            </div>

            <div style={styles.stepCard}>
              <div style={styles.stepNumber}>2</div>
              <h3 style={styles.stepTitle}>Rezervi Online</h3>
              <p style={styles.stepText}>
                Selectezi perioada dorită (zi, weekend sau săptămână) și trimiți rezervarea direct din coș cu datele tale de studio.
              </p>
            </div>

            <div style={styles.stepCard}>
              <div style={styles.stepNumber}>3</div>
              <h3 style={styles.stepTitle}>Preluare la Ghișeu</h3>
              <p style={styles.stepText}>
                Vii la hub-ul RentCam, inspectezi echipamentul împreună cu operatorul tehnic, semnezi procesul-verbal și preiei geanta sigilată.
              </p>
            </div>

            <div style={styles.stepCard}>
              <div style={styles.stepNumber}>4</div>
              <h3 style={styles.stepTitle}>Returnare & Deblocare</h3>
              <p style={styles.stepText}>
                Aduci echipamentul la finalul contractului, operatorul bifează accesoriile din checklist, iar garanția ți se deblochează pe loc.
              </p>
            </div>
          </div>

          <div style={styles.ctaBox}>
            <div>
              <div style={styles.ctaTitle}>Gata de producție?</div>
              <div style={styles.ctaSubtitle}>Alege camerele și obiectivele potrivite pentru proiectul tău.</div>
            </div>
            <Link to="/" style={styles.ctaBtn}>
              Explorează Catalogul →
            </Link>
          </div>
        </section>
      )}

      {/* Conținut Tab 2: Pachet Weekend */}
      {tabActiv === 'weekend' && (
        <section style={styles.sectionPane}>
          <div style={styles.sectionHeadingBox}>
            <h2 style={styles.sectionTitle}>Regulamentul Pachetului Promoțional Weekend</h2>
            <p style={styles.sectionSubtitle}>
              Filmezi tot weekendul cu reducere automată de 25%: plătești doar 1.5 zile în loc de 2 zile întregi.
            </p>
          </div>

          <div style={styles.weekendCard}>
            <div style={styles.weekendHeroRow}>
              <div style={styles.weekendBadge}>Ofertă Specială de Weekend</div>
              <div style={styles.weekendFormula}>Vineri 16:00 → Luni 11:00 = Doar 1.5× Tariful de Zi</div>
            </div>

            <div style={styles.timelineGrid}>
              <div style={styles.timelineItem}>
                <div style={styles.timelineTime}>Vineri după ora 16:00</div>
                <div style={styles.timelineHeading}>Ridicarea echipamentelor</div>
                <div style={styles.timelineDesc}>
                  Preluare de la ghișeu, verificare funcțională și semnare contract fără grabă.
                </div>
              </div>

              <div style={styles.timelineItemHighlight}>
                <div style={styles.timelineTime}>Sâmbătă & Duminică</div>
                <div style={styles.timelineHeading}>Zile complete de filmare</div>
                <div style={styles.timelineDesc}>
                  Ai libertate deplină la filmări sau evenimente, cu acumulatori de rezervă pregătiți.
                </div>
              </div>

              <div style={styles.timelineItem}>
                <div style={styles.timelineTime}>Luni până la ora 11:00</div>
                <div style={styles.timelineHeading}>Returnare fără stres</div>
                <div style={styles.timelineDesc}>
                  Aduci echipamentul la hub pentru recepția tehnică și deblocarea imediată a garanției.
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Conținut Tab 3: Garanție & Recepție Ghișeu */}
      {tabActiv === 'garantie' && (
        <section style={styles.sectionPane}>
          <div style={styles.sectionHeadingBox}>
            <h2 style={styles.sectionTitle}>Garanție Returnabilă & Procedura la Ghișeu</h2>
            <p style={styles.sectionSubtitle}>
              Transparență totală: cum funcționează garanția, ce verificăm la recepție și ce documente sunt necesare.
            </p>
          </div>

          <div style={styles.cardsTwoCol}>
            <div style={styles.infoCard}>
              <div style={styles.cardIcon}>🛡️</div>
              <h3 style={styles.cardTitle}>Politica de Garanție (Depozit)</h3>
              <p style={styles.cardText}>
                Garanția reprezintă o măsură de siguranță pentru echipamentele profesionale și <strong>se blochează doar temporar</strong> prin preautorizare pe card bancar sau depozit la ghișeu.
              </p>
              <ul style={styles.cardChecklist}>
                <li>✓ Nu se debitează banii din cont, ci doar se blochează suma pe perioada închirierii</li>
                <li>✓ Se deblochează integral pe loc la retur, după verificarea senzorilor și a carcasei</li>
                <li>✓ În caz de avarie constatată, se reține exclusiv contravaloarea reparației oficiale</li>
              </ul>
            </div>

            <div style={styles.infoCard}>
              <div style={styles.cardIcon}>🎒</div>
              <h3 style={styles.cardTitle}>Checklist la Ghișeu</h3>
              <p style={styles.cardText}>
                Operatorul RentCam trece prin fiecare punct împreună cu tine atât la plecare, cât și la sosire:
              </p>
              <ul style={styles.cardChecklist}>
                <li>✓ Inspecție optică senzor cameră și elemente lentile împotriva zgârieturilor</li>
                <li>✓ Verificare stare acumulatori, cabluri de conexiune și încărcător dedicat</li>
                <li>✓ Testare rapidă pornire, înregistrare pe card și autofocalizare</li>
                <li>✓ Semnare proces-verbal digital cu generare automată de exemplar pe email</li>
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Conținut Tab 4: Întrebări Frecvente (FAQ) */}
      {tabActiv === 'faq' && (
        <section style={styles.sectionPane}>
          <div style={styles.sectionHeadingBox}>
            <h2 style={styles.sectionTitle}>Întrebări Frecvente (FAQ)</h2>
            <p style={styles.sectionSubtitle}>
              Răspunsuri prompte la cele mai comune întrebări adresate de comunitatea cineaștilor și fotografilor RentCam.
            </p>
          </div>

          {intrebariFiltrate.length === 0 ? (
            <div style={styles.emptyFaq}>
              <div style={styles.emptyFaqIcon}>🔍</div>
              <div style={styles.emptyFaqTitle}>Nicio întrebare nu se potrivește căutării tale</div>
              <div style={styles.emptyFaqDesc}>Încearcă să folosești alți termeni sau curăță căutarea.</div>
              <button
                type="button"
                onClick={() => setCautareFaq('')}
                style={styles.resetSearchBtn}
              >
                Arată toate întrebările
              </button>
            </div>
          ) : (
            <div style={styles.faqAccordion}>
              {intrebariFiltrate.map((faq) => {
                const esteDeschis = faqDeschis[faq.id]

                return (
                  <div key={faq.id} style={styles.faqCard}>
                    <button
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      style={styles.faqQuestionBtn}
                    >
                      <span style={styles.faqQuestionText}>{faq.intrebare}</span>
                      <span style={styles.faqChevron}>
                        {esteDeschis ? '▲' : '▼'}
                      </span>
                    </button>

                    {esteDeschis && (
                      <div style={styles.faqAnswerBox}>
                        <p style={styles.faqAnswerText}>{faq.raspuns}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </section>
      )}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '28px'
  },
  heroBanner: {
    background: 'radial-gradient(120% 120% at 85% 20%, #FFF1E6 0%, #FFFDF9 60%, #FEF3C7 100%)',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '44px 32px',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(249, 115, 22, 0.05)',
    position: 'relative'
  },
  heroPill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    background: '#FFFFFF',
    border: '1.5px solid #FDBA74',
    color: 'var(--color-primary)',
    fontSize: '13px',
    fontWeight: '800',
    padding: '6px 16px',
    borderRadius: 'var(--radius-full)',
    marginBottom: '16px',
    boxShadow: 'var(--shadow-sm)'
  },
  heroTitle: {
    fontSize: '34px',
    fontWeight: '900',
    color: 'var(--color-text)',
    letterSpacing: '-0.8px',
    marginBottom: '12px',
    lineHeight: 1.2
  },
  heroSubtitle: {
    fontSize: '15px',
    color: 'var(--color-text-muted)',
    maxWidth: '680px',
    margin: '0 auto 24px',
    lineHeight: 1.6
  },
  searchBox: {
    position: 'relative',
    maxWidth: '600px',
    margin: '0 auto'
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '16px',
    color: 'var(--color-accent-orange)'
  },
  searchInput: {
    width: '100%',
    padding: '14px 20px 14px 46px',
    borderRadius: 'var(--radius-full)',
    border: '1.5px solid var(--color-border)',
    background: '#FFFFFF',
    fontSize: '14px',
    color: 'var(--color-text)',
    boxShadow: 'var(--shadow-sm)'
  },
  tabsNav: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  tabBtn: {
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-full)',
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: '800',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all var(--motion-fast)'
  },
  tabBtnActive: {
    background: 'var(--color-primary-gradient)',
    color: '#FFFFFF',
    borderColor: 'transparent',
    boxShadow: '0 4px 14px rgba(225, 29, 72, 0.25)'
  },
  sectionPane: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  sectionHeadingBox: {
    textAlign: 'center',
    maxWidth: '720px',
    margin: '0 auto'
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '900',
    color: 'var(--color-text)',
    marginBottom: '8px'
  },
  sectionSubtitle: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    lineHeight: 1.6
  },
  stepsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px'
  },
  stepCard: {
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '28px 24px',
    boxShadow: 'var(--shadow-card)',
    textAlign: 'center'
  },
  stepNumber: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'var(--color-primary-gradient)',
    color: '#FFFFFF',
    fontSize: '18px',
    fontWeight: '900',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 16px',
    boxShadow: '0 4px 10px rgba(225, 29, 72, 0.3)'
  },
  stepTitle: {
    fontSize: '17px',
    fontWeight: '800',
    color: 'var(--color-text)',
    marginBottom: '8px'
  },
  stepText: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    lineHeight: 1.6
  },
  ctaBox: {
    background: '#FFF7ED',
    border: '1.5px solid #FDBA74',
    borderRadius: 'var(--radius-xl)',
    padding: '24px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  },
  ctaTitle: {
    fontSize: '18px',
    fontWeight: '900',
    color: 'var(--color-text)'
  },
  ctaSubtitle: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginTop: '4px'
  },
  ctaBtn: {
    textDecoration: 'none',
    background: 'var(--color-primary-gradient)',
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: '14px',
    padding: '10px 22px',
    borderRadius: 'var(--radius-md)',
    boxShadow: '0 4px 12px rgba(225, 29, 72, 0.25)'
  },
  weekendCard: {
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '32px',
    boxShadow: 'var(--shadow-card)'
  },
  weekendHeroRow: {
    textAlign: 'center',
    marginBottom: '28px',
    paddingBottom: '20px',
    borderBottom: '1.5px dashed var(--color-border)'
  },
  weekendBadge: {
    display: 'inline-block',
    background: '#FEF3C7',
    color: '#B45309',
    fontSize: '12px',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    padding: '4px 12px',
    borderRadius: 'var(--radius-full)',
    marginBottom: '10px'
  },
  weekendFormula: {
    fontSize: '22px',
    fontWeight: '900',
    color: 'var(--color-primary)'
  },
  timelineGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px'
  },
  timelineItem: {
    background: '#FFFDF9',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    padding: '20px'
  },
  timelineItemHighlight: {
    background: '#FFF7ED',
    border: '1.5px solid #FDBA74',
    borderRadius: 'var(--radius-lg)',
    padding: '20px'
  },
  timelineTime: {
    fontSize: '11px',
    fontWeight: '800',
    textTransform: 'uppercase',
    color: 'var(--color-accent-orange)',
    marginBottom: '6px'
  },
  timelineHeading: {
    fontSize: '16px',
    fontWeight: '800',
    color: 'var(--color-text)',
    marginBottom: '6px'
  },
  timelineDesc: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    lineHeight: 1.55
  },
  cardsTwoCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px'
  },
  infoCard: {
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '28px',
    boxShadow: 'var(--shadow-card)'
  },
  cardIcon: {
    fontSize: '32px',
    marginBottom: '12px'
  },
  cardTitle: {
    fontSize: '18px',
    fontWeight: '900',
    color: 'var(--color-text)',
    marginBottom: '10px'
  },
  cardText: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    lineHeight: 1.6,
    marginBottom: '16px'
  },
  cardChecklist: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: 0,
    fontSize: '13px',
    color: 'var(--color-text)',
    fontWeight: '600'
  },
  faqAccordion: {
    maxWidth: '860px',
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  faqCard: {
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-sm)'
  },
  faqQuestionBtn: {
    width: '100%',
    padding: '16px 20px',
    background: '#FFFFFF',
    border: 'none',
    boxShadow: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
    cursor: 'pointer',
    gap: '12px'
  },
  faqQuestionText: {
    fontSize: '15px',
    fontWeight: '800',
    color: 'var(--color-text)'
  },
  faqChevron: {
    fontSize: '11px',
    color: 'var(--color-accent-orange)'
  },
  faqAnswerBox: {
    padding: '0 20px 18px',
    background: '#FFFFFF'
  },
  faqAnswerText: {
    fontSize: '14px',
    color: 'var(--color-text-muted)',
    lineHeight: 1.65,
    borderTop: '1px dashed var(--color-border-subtle)',
    paddingTop: '12px'
  },
  emptyFaq: {
    background: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '40px 24px',
    textAlign: 'center',
    maxWidth: '540px',
    margin: '0 auto'
  },
  emptyFaqIcon: {
    fontSize: '36px',
    marginBottom: '10px'
  },
  emptyFaqTitle: {
    fontSize: '16px',
    fontWeight: '800',
    color: 'var(--color-text)',
    marginBottom: '6px'
  },
  emptyFaqDesc: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginBottom: '16px'
  },
  resetSearchBtn: {
    padding: '8px 16px',
    fontSize: '13px'
  }
}
