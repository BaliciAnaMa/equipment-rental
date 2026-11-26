import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { rezervariApi } from '../api/client'

export default function OperatorDashboardPage({ utilizatorCurent }) {
  const navigate = useNavigate()

  // Stare date rezervări
  const [rezervari, setRezervari] = useState([])
  const [seIncarca, setSeIncarca] = useState(true)
  const [eroare, setEroare] = useState('')
  const [mesajSucces, setMesajSucces] = useState('')

  // Filtre
  const [filtruStatus, setFiltruStatus] = useState('toate')
  const [termenCautare, setTermenCautare] = useState('')

  // Modal detalii rezervare
  const [rezervareSelectata, setRezervareSelectata] = useState(null)
  const [seProceseazaId, setSeProceseazaId] = useState(null)

  // Verificare rol de acces
  useEffect(() => {
    if (!utilizatorCurent) {
      navigate('/login')
      return
    }
    if (utilizatorCurent.rol !== 'operator' && utilizatorCurent.rol !== 'admin') {
      navigate('/')
    }
  }, [utilizatorCurent, navigate])

  // Încărcare rezervări din backend API
  const incarcaRezervari = async () => {
    try {
      setSeIncarca(true)
      setEroare('')
      const raspuns = await rezervariApi.toate()
      if (raspuns && Array.isArray(raspuns.rezervari)) {
        setRezervari(raspuns.rezervari)
      } else {
        setRezervari([])
      }
    } catch (err) {
      console.error('Eroare la încărcarea rezervărilor pentru operator:', err)
      setEroare(err.message || 'Nu s-au putut încărca rezervările din baza de date.')
    } finally {
      setSeIncarca(false)
    }
  }

  useEffect(() => {
    if (utilizatorCurent && (utilizatorCurent.rol === 'operator' || utilizatorCurent.rol === 'admin')) {
      incarcaRezervari()
    }
  }, [utilizatorCurent])

  // Acțiune schimbare status (confirmare sau anulare)
  const handleSchimbaStatus = async (rezervareId, statusNou, codRezervare) => {
    const actiuneText = statusNou === 'confirmata' ? 'confirmi' : 'respingi (anulezi)'
    if (!window.confirm(`Ești sigur că vrei să ${actiuneText} rezervarea ${codRezervare}?`)) {
      return
    }

    try {
      setSeProceseazaId(rezervareId)
      await rezervariApi.actualizeazaStatus(rezervareId, statusNou)
      setMesajSucces(`Rezervarea ${codRezervare} a fost actualizată la statusul '${statusNou}'.`)
      await incarcaRezervari()
      if (rezervareSelectata && rezervareSelectata.id === rezervareId) {
        setRezervareSelectata(prev => prev ? { ...prev, status: statusNou } : null)
      }
      setTimeout(() => setMesajSucces(''), 4000)
    } catch (err) {
      alert(`Eroare la actualizarea rezervării: ${err.message}`)
    } finally {
      setSeProceseazaId(null)
    }
  }

  // Calcul KPI pe baza întregului set de rezervări
  const kpiStats = {
    in_asteptare: rezervari.filter(r => r.status === 'in_asteptare').length,
    confirmata: rezervari.filter(r => r.status === 'confirmata').length,
    predata: rezervari.filter(r => r.status === 'predata').length,
    returnata: rezervari.filter(r => r.status === 'returnata').length
  }

  // Filtrare și căutare client-side
  const rezervariFiltrate = rezervari.filter(r => {
    const potrivesteStatus = filtruStatus === 'toate' || r.status === filtruStatus

    const q = termenCautare.trim().toLowerCase()
    if (!q) return potrivesteStatus

    const cod = (r.cod_rezervare || '').toLowerCase()
    const numeClient = (r.client_nume || '').toLowerCase()
    const telefonClient = (r.client_telefon || '').toLowerCase()
    const emailClient = (r.client_email || '').toLowerCase()

    const potrivesteCautare =
      cod.includes(q) ||
      numeClient.includes(q) ||
      telefonClient.includes(q) ||
      emailClient.includes(q)

    return potrivesteStatus && potrivesteCautare
  })

  // Formatare etichetă status și culori
  const obtineBadgeStatus = (status) => {
    switch (status) {
      case 'in_asteptare':
        return { label: 'În așteptare', bg: '#FEF3C7', color: '#D97706', border: '#FDE68A' }
      case 'confirmata':
        return { label: 'Confirmată', bg: '#DCFCE7', color: '#16A34A', border: '#BBF7D0' }
      case 'predata':
        return { label: 'Predată (Activă)', bg: '#E0F2FE', color: '#0284C7', border: '#BAE6FD' }
      case 'returnata':
        return { label: 'Returnată', bg: '#F1F5F9', color: '#475569', border: '#E2E8F0' }
      case 'anulata':
        return { label: 'Anulată', bg: '#FEE2E2', color: '#DC2626', border: '#FECACA' }
      default:
        return { label: status, bg: '#F3F4F6', color: '#6B7280', border: '#E5E7EB' }
    }
  }

  // Formatare date calendaristice
  const formateazaData = (valoareData) => {
    if (!valoareData) return '-'
    const d = new Date(valoareData)
    return d.toLocaleDateString('ro-RO', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  // Formatare tip tarif
  const formateazaTarif = (tip) => {
    if (tip === 'weekend') return 'Weekend'
    if (tip === '7_zile') return '7 Zile'
    return '1 Zi'
  }

  return (
    <div style={styles.page}>
      {/* 1. Header panou & sub-navigație ghișeu */}
      <div style={styles.headerCard}>
        <div style={styles.headerMain}>
          <div>
            <div style={styles.headerOverline}>
              <span>RENTAL DESK OPERATIONS</span>
              <span style={styles.headerDot}>•</span>
              <span style={styles.roleTag}>ROL: {utilizatorCurent?.rol?.toUpperCase() || 'OPERATOR'}</span>
            </div>
            <h1 style={styles.headerTitle}>Gestiune Ghișeu & Validare</h1>
            <p style={styles.headerSubtitle}>
              Panou operațional pentru procesarea rezervărilor, confirmarea comenzilor și fluxul de predare/retur.
            </p>
          </div>

          <button onClick={incarcaRezervari} style={styles.refreshBtn} title="Reîmprospătează datele">
            <span style={styles.refreshIcon}>🔄</span>
            <span>Actualizează</span>
          </button>
        </div>

        {/* Sub-navigație superioară conform cerinței (Pregătită pentru cele 3 etape de operator) */}
        <div style={styles.subnavContainer}>
          <button style={{ ...styles.subnavTab, ...styles.subnavTabActive }}>
            <span style={styles.tabStepNumber}>1</span>
            <span>Rezervări & Validare</span>
          </button>
          <button
            style={styles.subnavTabDisabled}
            disabled
            title="Va fi activat în Pasul 3.1b"
          >
            <span style={styles.tabStepNumber}>2</span>
            <span>Predare & Retur Ghișeu (În curând)</span>
          </button>
          <button
            style={styles.subnavTabDisabled}
            disabled
            title="Va fi activat în Pasul 3.1c"
          >
            <span style={styles.tabStepNumber}>3</span>
            <span>Gestiune Stocuri & Serii (În curând)</span>
          </button>
        </div>
      </div>

      {mesajSucces && (
        <div style={styles.successBanner}>
          <span style={styles.bannerIcon}>✅</span>
          <span>{mesajSucces}</span>
        </div>
      )}

      {eroare && (
        <div style={styles.errorBanner}>
          <span style={styles.bannerIcon}>⚠️</span>
          <span>{eroare}</span>
        </div>
      )}

      {/* 2. Carduri KPI sus */}
      <div style={styles.kpiGrid}>
        <div
          style={{
            ...styles.kpiCard,
            borderColor: filtruStatus === 'in_asteptare' ? '#F59E0B' : '#FDE68A',
            backgroundColor: filtruStatus === 'in_asteptare' ? '#FFFBEB' : '#FFFFFF'
          }}
          onClick={() => setFiltruStatus(filtruStatus === 'in_asteptare' ? 'toate' : 'in_asteptare')}
        >
          <div style={styles.kpiHeader}>
            <span style={styles.kpiTitle}>De validat</span>
            <span style={{ ...styles.kpiBadge, background: '#FEF3C7', color: '#D97706' }}>
              in_asteptare
            </span>
          </div>
          <div style={{ ...styles.kpiValue, color: '#D97706' }}>
            {kpiStats.in_asteptare}
          </div>
          <div style={styles.kpiFooter}>Necesită verificare și confirmare de la ghișeu</div>
        </div>

        <div
          style={{
            ...styles.kpiCard,
            borderColor: filtruStatus === 'confirmata' ? '#10B981' : '#BBF7D0',
            backgroundColor: filtruStatus === 'confirmata' ? '#F0FDF4' : '#FFFFFF'
          }}
          onClick={() => setFiltruStatus(filtruStatus === 'confirmata' ? 'toate' : 'confirmata')}
        >
          <div style={styles.kpiHeader}>
            <span style={styles.kpiTitle}>Confirmate</span>
            <span style={{ ...styles.kpiBadge, background: '#DCFCE7', color: '#16A34A' }}>
              confirmata
            </span>
          </div>
          <div style={{ ...styles.kpiValue, color: '#16A34A' }}>
            {kpiStats.confirmata}
          </div>
          <div style={styles.kpiFooter}>Rezervări aprobate gata pentru alocare și predare</div>
        </div>

        <div
          style={{
            ...styles.kpiCard,
            borderColor: filtruStatus === 'predata' ? '#0284C7' : '#BAE6FD',
            backgroundColor: filtruStatus === 'predata' ? '#F0F9FF' : '#FFFFFF'
          }}
          onClick={() => setFiltruStatus(filtruStatus === 'predata' ? 'toate' : 'predata')}
        >
          <div style={styles.kpiHeader}>
            <span style={styles.kpiTitle}>Predate</span>
            <span style={{ ...styles.kpiBadge, background: '#E0F2FE', color: '#0284C7' }}>
              predata
            </span>
          </div>
          <div style={{ ...styles.kpiValue, color: '#0284C7' }}>
            {kpiStats.predata}
          </div>
          <div style={styles.kpiFooter}>Echipamente aflate în custodia clienților</div>
        </div>

        <div
          style={{
            ...styles.kpiCard,
            borderColor: filtruStatus === 'returnata' ? '#64748B' : '#E2E8F0',
            backgroundColor: filtruStatus === 'returnata' ? '#F8FAFC' : '#FFFFFF'
          }}
          onClick={() => setFiltruStatus(filtruStatus === 'returnata' ? 'toate' : 'returnata')}
        >
          <div style={styles.kpiHeader}>
            <span style={styles.kpiTitle}>Returnate</span>
            <span style={{ ...styles.kpiBadge, background: '#F1F5F9', color: '#475569' }}>
              returnata
            </span>
          </div>
          <div style={{ ...styles.kpiValue, color: '#475569' }}>
            {kpiStats.returnata}
          </div>
          <div style={styles.kpiFooter}>Contracte finalizate și echipamente recepționate</div>
        </div>
      </div>

      {/* 3. Filtre și Bara de Căutare */}
      <div style={styles.filterBar}>
        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Caută după cod rezervare (ex: RC-2026), nume client, telefon sau email..."
            value={termenCautare}
            onChange={(e) => setTermenCautare(e.target.value)}
            style={styles.searchInput}
          />
          {termenCautare && (
            <button
              onClick={() => setTermenCautare('')}
              style={styles.clearSearchBtn}
              title="Șterge căutarea"
            >
              ✕
            </button>
          )}
        </div>

        <div style={styles.statusButtonsGroup}>
          <span style={styles.filterLabel}>Filtru Status:</span>
          {[
            { id: 'toate', label: 'Toate' },
            { id: 'in_asteptare', label: 'De validat' },
            { id: 'confirmata', label: 'Confirmate' },
            { id: 'predata', label: 'Predate' },
            { id: 'returnata', label: 'Returnate' },
            { id: 'anulata', label: 'Anulate' }
          ].map((item) => {
            const esteActiv = filtruStatus === item.id
            return (
              <button
                key={item.id}
                onClick={() => setFiltruStatus(item.id)}
                style={{
                  ...styles.filterBtn,
                  ...(esteActiv ? styles.filterBtnActive : {})
                }}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* 4. Tabel / Listă de Rezervări */}
      <div style={styles.tableCard}>
        <div style={styles.tableHeaderInfo}>
          <div style={styles.tableCount}>
            Afișate: <strong>{rezervariFiltrate.length}</strong> din <strong>{rezervari.length}</strong> rezervări
            {filtruStatus !== 'toate' && <span style={styles.activeFilterTag}> (Filtru: {filtruStatus})</span>}
          </div>
        </div>

        {seIncarca ? (
          <div style={styles.loadingContainer}>
            <div style={styles.spinner}></div>
            <p style={styles.loadingText}>Se încarcă rezervările din baza de date MySQL...</p>
          </div>
        ) : rezervariFiltrate.length === 0 ? (
          <div style={styles.emptyContainer}>
            <div style={styles.emptyIcon}>📦</div>
            <h3 style={styles.emptyTitle}>Nu a fost găsită nicio rezervare</h3>
            <p style={styles.emptySubtitle}>
              Încearcă să schimbi filtrul de status sau termenul de căutare.
            </p>
            {filtruStatus !== 'toate' && (
              <button
                onClick={() => { setFiltruStatus('toate'); setTermenCautare(''); }}
                style={styles.resetFiltersBtn}
              >
                Resetează filtrele
              </button>
            )}
          </div>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeadRow}>
                  <th style={styles.th}>Cod & Dată Plasare</th>
                  <th style={styles.th}>Client & Contact</th>
                  <th style={styles.th}>Perioadă Închiriere</th>
                  <th style={styles.th}>Articole Solicitate</th>
                  <th style={styles.th}>Totaluri (Chirie / Garanție)</th>
                  <th style={styles.th}>Status</th>
                  <th style={{ ...styles.th, textAlign: 'right' }}>Acțiuni Validare</th>
                </tr>
              </thead>
              <tbody>
                {rezervariFiltrate.map((rez) => {
                  const badge = obtineBadgeStatus(rez.status)
                  const esteInAsteptare = rez.status === 'in_asteptare'
                  const esteInProcesare = seProceseazaId === rez.id

                  return (
                    <tr key={rez.id} style={styles.tableRow}>
                      {/* Cod & Dată */}
                      <td style={styles.td}>
                        <div style={styles.codRezervare}>{rez.cod_rezervare}</div>
                        <div style={styles.dataPlasare}>
                          Plasată: {formateazaData(rez.creat_la)}
                        </div>
                      </td>

                      {/* Detalii Client */}
                      <td style={styles.td}>
                        <div style={styles.clientNume}>
                          {rez.client_nume || 'Client RentCam'}
                        </div>
                        {rez.client_companie && (
                          <div style={styles.clientCompanie}>
                            🏢 {rez.client_companie}
                          </div>
                        )}
                        <div style={styles.clientContact}>
                          <span>📞 {rez.client_telefon || 'Fără telefon'}</span>
                          <span>✉️ {rez.client_email}</span>
                        </div>
                      </td>

                      {/* Perioadă */}
                      <td style={styles.td}>
                        <div style={styles.perioadaBox}>
                          <div style={styles.perioadaRand}>
                            <span style={styles.perioadaLabel}>Ridicare:</span>
                            <span style={styles.perioadaValoare}>{formateazaData(rez.data_ridicare)}</span>
                          </div>
                          <div style={styles.perioadaRand}>
                            <span style={styles.perioadaLabel}>Predare:</span>
                            <span style={styles.perioadaValoare}>{formateazaData(rez.data_predare)}</span>
                          </div>
                        </div>
                      </td>

                      {/* Articole */}
                      <td style={styles.td}>
                        <div style={styles.articoleList}>
                          {(rez.articole || []).map((art, idx) => (
                            <div key={idx} style={styles.articolRow}>
                              <span style={styles.articolDot}>•</span>
                              <span style={styles.articolNume}>
                                {art.echipament_nume}
                              </span>
                              <span style={styles.articolMeta}>
                                x{art.cantitate} ({formateazaTarif(art.tip_tarif)})
                              </span>
                            </div>
                          ))}
                          {(!rez.articole || rez.articole.length === 0) && (
                            <span style={styles.faraArticole}>Fără articole înregistrate</span>
                          )}
                        </div>
                      </td>

                      {/* Totaluri */}
                      <td style={styles.td}>
                        <div style={styles.chirieTotal}>
                          {Number(rez.total_chirie).toLocaleString('ro-RO')} lei
                        </div>
                        <div style={styles.garantieTotal}>
                          Garanție: {Number(rez.total_garantie).toLocaleString('ro-RO')} lei
                        </div>
                      </td>

                      {/* Status */}
                      <td style={styles.td}>
                        <span
                          style={{
                            ...styles.statusBadge,
                            backgroundColor: badge.bg,
                            color: badge.color,
                            borderColor: badge.border
                          }}
                        >
                          {badge.label}
                        </span>
                      </td>

                      {/* Acțiuni */}
                      <td style={{ ...styles.td, textAlign: 'right' }}>
                        <div style={styles.actionButtons}>
                          <button
                            onClick={() => setRezervareSelectata(rez)}
                            style={styles.detailsBtn}
                            title="Vizualizează detaliile complete ale rezervării"
                          >
                            👁️ Detalii
                          </button>

                          {esteInAsteptare && (
                            <>
                              <button
                                onClick={() => handleSchimbaStatus(rez.id, 'confirmata', rez.cod_rezervare)}
                                style={styles.confirmBtn}
                                disabled={esteInProcesare}
                                title="Confirmă rezervarea și blochează echipamentele"
                              >
                                {esteInProcesare ? '...' : '✓ Confirmă'}
                              </button>

                              <button
                                onClick={() => handleSchimbaStatus(rez.id, 'anulata', rez.cod_rezervare)}
                                style={styles.rejectBtn}
                                disabled={esteInProcesare}
                                title="Respinge rezervarea și eliberează stocurile"
                              >
                                ✕ Respinge
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. Modal Detalii Rezervare */}
      {rezervareSelectata && (
        <div style={styles.modalOverlay} onClick={() => setRezervareSelectata(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div>
                <span style={styles.modalSub}>FIȘĂ REZERVARE</span>
                <h2 style={styles.modalTitle}>{rezervareSelectata.cod_rezervare}</h2>
              </div>
              <button
                onClick={() => setRezervareSelectata(null)}
                style={styles.modalCloseBtn}
              >
                ✕
              </button>
            </div>

            <div style={styles.modalBody}>
              {/* Informații Client */}
              <div style={styles.modalSection}>
                <h4 style={styles.modalSectionTitle}>👤 Informații Client</h4>
                <div style={styles.modalInfoGrid}>
                  <div>
                    <span style={styles.infoLabel}>Nume complet:</span>
                    <div style={styles.infoValue}>{rezervareSelectata.client_nume || 'Client RentCam'}</div>
                  </div>
                  <div>
                    <span style={styles.infoLabel}>Companie / Studio:</span>
                    <div style={styles.infoValue}>{rezervareSelectata.client_companie || 'Persoană fizică'}</div>
                  </div>
                  <div>
                    <span style={styles.infoLabel}>Telefon:</span>
                    <div style={styles.infoValue}>{rezervareSelectata.client_telefon || '-'}</div>
                  </div>
                  <div>
                    <span style={styles.infoLabel}>Email:</span>
                    <div style={styles.infoValue}>{rezervareSelectata.client_email || '-'}</div>
                  </div>
                </div>
              </div>

              {/* Date și Observații */}
              <div style={styles.modalSection}>
                <h4 style={styles.modalSectionTitle}>📅 Perioadă & Observații</h4>
                <div style={styles.modalInfoGrid}>
                  <div>
                    <span style={styles.infoLabel}>Data Ridicare:</span>
                    <div style={styles.infoValue}>{formateazaData(rezervareSelectata.data_ridicare)}</div>
                  </div>
                  <div>
                    <span style={styles.infoLabel}>Data Predare:</span>
                    <div style={styles.infoValue}>{formateazaData(rezervareSelectata.data_predare)}</div>
                  </div>
                  <div>
                    <span style={styles.infoLabel}>Status curent:</span>
                    <div style={styles.infoValue}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          ...obtineBadgeStatus(rezervareSelectata.status)
                        }}
                      >
                        {obtineBadgeStatus(rezervareSelectata.status).label}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span style={styles.infoLabel}>Plasată la:</span>
                    <div style={styles.infoValue}>{formateazaData(rezervareSelectata.creat_la)}</div>
                  </div>
                </div>

                {rezervareSelectata.observatii && (
                  <div style={styles.observatiiBox}>
                    <span style={styles.infoLabel}>Observații client / Note:</span>
                    <p style={styles.observatiiText}>{rezervareSelectata.observatii}</p>
                  </div>
                )}
              </div>

              {/* Articole Rezervate */}
              <div style={styles.modalSection}>
                <h4 style={styles.modalSectionTitle}>📦 Articole Rezervate</h4>
                <div style={styles.modalArticoleTable}>
                  <div style={styles.modalArticolHeader}>
                    <span>Echipament</span>
                    <span>Tarif</span>
                    <span>Cantitate</span>
                    <span style={{ textAlign: 'right' }}>Preț Chirie</span>
                    <span style={{ textAlign: 'right' }}>Garanție</span>
                  </div>
                  {(rezervareSelectata.articole || []).map((art, idx) => (
                    <div key={idx} style={styles.modalArticolRow}>
                      <span style={{ fontWeight: '700', color: 'var(--color-text)' }}>
                        {art.echipament_nume}
                      </span>
                      <span>{formateazaTarif(art.tip_tarif)}</span>
                      <span>{art.cantitate} buc.</span>
                      <span style={{ textAlign: 'right', fontWeight: '700' }}>
                        {Number(art.pret_unitar * art.cantitate).toLocaleString('ro-RO')} lei
                      </span>
                      <span style={{ textAlign: 'right', color: 'var(--color-text-muted)' }}>
                        {Number(art.garantie_unitara * art.cantitate).toLocaleString('ro-RO')} lei
                      </span>
                    </div>
                  ))}
                </div>

                <div style={styles.modalTotals}>
                  <div style={styles.modalTotalRow}>
                    <span>Total Valoare Chirie:</span>
                    <strong style={{ fontSize: '18px', color: 'var(--color-primary)' }}>
                      {Number(rezervareSelectata.total_chirie).toLocaleString('ro-RO')} lei
                    </strong>
                  </div>
                  <div style={styles.modalTotalRow}>
                    <span>Total Garanție de reținut la ghișeu:</span>
                    <strong>{Number(rezervareSelectata.total_garantie).toLocaleString('ro-RO')} lei</strong>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.modalFooter}>
              {rezervareSelectata.status === 'in_asteptare' ? (
                <>
                  <button
                    onClick={() => handleSchimbaStatus(rezervareSelectata.id, 'anulata', rezervareSelectata.cod_rezervare)}
                    style={styles.modalRejectBtn}
                    disabled={seProceseazaId === rezervareSelectata.id}
                  >
                    Respinge Rezervarea
                  </button>
                  <button
                    onClick={() => handleSchimbaStatus(rezervareSelectata.id, 'confirmata', rezervareSelectata.cod_rezervare)}
                    style={styles.modalConfirmBtn}
                    disabled={seProceseazaId === rezervareSelectata.id}
                  >
                    Confirmă și Aprobă Rezervarea
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setRezervareSelectata(null)}
                  style={styles.modalCloseFooterBtn}
                >
                  Închide fereastra
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  page: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '28px 24px 60px'
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    padding: '24px 28px',
    boxShadow: 'var(--shadow-sm)',
    marginBottom: '24px'
  },
  headerMain: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '20px'
  },
  headerOverline: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '11px',
    fontWeight: '800',
    color: 'var(--color-accent-orange)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    marginBottom: '6px'
  },
  headerDot: {
    color: 'var(--color-border)'
  },
  roleTag: {
    backgroundColor: '#FEF2F2',
    color: '#B91C1C',
    padding: '2px 8px',
    borderRadius: 'var(--radius-full)',
    border: '1px solid #FECACA',
    fontSize: '10px'
  },
  headerTitle: {
    fontSize: '24px',
    fontWeight: '900',
    color: 'var(--color-text)',
    letterSpacing: '-0.5px',
    marginBottom: '4px'
  },
  headerSubtitle: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    lineHeight: 1.4
  },
  refreshBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    backgroundColor: '#FFF7ED',
    border: '1.5px solid #FDBA74',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text)',
    fontWeight: '700',
    fontSize: '13px',
    cursor: 'pointer'
  },
  refreshIcon: {
    fontSize: '14px'
  },
  subnavContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    borderTop: '1.5px solid #F1F5F9',
    paddingTop: '16px'
  },
  subnavTab: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    borderRadius: 'var(--radius-md)',
    border: '1.5px solid transparent',
    fontSize: '13px',
    fontWeight: '800',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: 'var(--color-text-muted)'
  },
  subnavTabActive: {
    backgroundColor: '#FFF1F2',
    borderColor: '#FECDD3',
    color: 'var(--color-primary)'
  },
  subnavTabDisabled: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    borderRadius: 'var(--radius-md)',
    border: '1px dashed #E2E8F0',
    fontSize: '13px',
    fontWeight: '700',
    cursor: 'not-allowed',
    backgroundColor: '#F8FAFC',
    color: '#94A3B8'
  },
  tabStepNumber: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0,0,0,0.06)',
    fontSize: '11px',
    fontWeight: '900'
  },
  successBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#DCFCE7',
    border: '1.5px solid #86EFAC',
    color: '#15803D',
    padding: '12px 18px',
    borderRadius: 'var(--radius-md)',
    fontSize: '13px',
    fontWeight: '700',
    marginBottom: '20px'
  },
  errorBanner: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#FEE2E2',
    border: '1.5px solid #FCA5A5',
    color: '#B91C1C',
    padding: '12px 18px',
    borderRadius: 'var(--radius-md)',
    fontSize: '13px',
    fontWeight: '700',
    marginBottom: '20px'
  },
  bannerIcon: {
    fontSize: '16px'
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px'
  },
  kpiCard: {
    borderRadius: 'var(--radius-lg)',
    border: '1.5px solid var(--color-border)',
    padding: '18px 20px',
    boxShadow: 'var(--shadow-sm)',
    cursor: 'pointer',
    transition: 'all var(--motion-fast)'
  },
  kpiHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px'
  },
  kpiTitle: {
    fontSize: '13px',
    fontWeight: '800',
    color: 'var(--color-text)'
  },
  kpiBadge: {
    fontSize: '10px',
    fontWeight: '800',
    padding: '2px 8px',
    borderRadius: 'var(--radius-full)'
  },
  kpiValue: {
    fontSize: '30px',
    fontWeight: '900',
    letterSpacing: '-1px',
    lineHeight: 1.1,
    marginBottom: '6px'
  },
  kpiFooter: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    lineHeight: 1.3
  },
  filterBar: {
    backgroundColor: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    padding: '16px 20px',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  searchWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    fontSize: '15px',
    color: 'var(--color-text-muted)'
  },
  searchInput: {
    width: '100%',
    padding: '10px 40px 10px 40px',
    borderRadius: 'var(--radius-md)',
    border: '1.5px solid var(--color-border)',
    fontSize: '13px',
    fontWeight: '600',
    backgroundColor: '#FFFDF9'
  },
  clearSearchBtn: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    color: 'var(--color-text-muted)',
    cursor: 'pointer',
    fontWeight: '800',
    fontSize: '14px'
  },
  statusButtonsGroup: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '8px'
  },
  filterLabel: {
    fontSize: '12px',
    fontWeight: '800',
    color: 'var(--color-text-muted)',
    marginRight: '6px'
  },
  filterBtn: {
    padding: '6px 14px',
    borderRadius: 'var(--radius-full)',
    border: '1.5px solid var(--color-border)',
    backgroundColor: '#FFFFFF',
    fontSize: '12px',
    fontWeight: '700',
    color: 'var(--color-text-muted)',
    cursor: 'pointer'
  },
  filterBtnActive: {
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-primary)',
    color: '#FFFFFF'
  },
  tableCard: {
    backgroundColor: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-sm)',
    overflow: 'hidden'
  },
  tableHeaderInfo: {
    padding: '16px 24px',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: '#FFFDF9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  tableCount: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  activeFilterTag: {
    color: 'var(--color-primary)',
    fontWeight: '700'
  },
  loadingContainer: {
    padding: '60px 20px',
    textAlign: 'center'
  },
  spinner: {
    width: '32px',
    height: '32px',
    margin: '0 auto 14px',
    borderRadius: '50%',
    border: '3px solid #F3F4F6',
    borderTopColor: 'var(--color-primary)',
    animation: 'spin 0.8s linear infinite'
  },
  loadingText: {
    fontSize: '13px',
    color: 'var(--color-text-muted)'
  },
  emptyContainer: {
    padding: '60px 20px',
    textAlign: 'center'
  },
  emptyIcon: {
    fontSize: '40px',
    marginBottom: '12px'
  },
  emptyTitle: {
    fontSize: '16px',
    fontWeight: '800',
    color: 'var(--color-text)',
    marginBottom: '6px'
  },
  emptySubtitle: {
    fontSize: '13px',
    color: 'var(--color-text-muted)',
    marginBottom: '16px'
  },
  resetFiltersBtn: {
    padding: '8px 16px',
    fontSize: '12px',
    fontWeight: '700',
    backgroundColor: '#FFF7ED',
    border: '1.5px solid #FDBA74',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text)',
    cursor: 'pointer'
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left'
  },
  tableHeadRow: {
    borderBottom: '1.5px solid var(--color-border)',
    backgroundColor: '#F8FAFC'
  },
  th: {
    padding: '14px 18px',
    fontSize: '11px',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    color: 'var(--color-text-muted)',
    whiteSpace: 'nowrap'
  },
  tableRow: {
    borderBottom: '1px solid #F1F5F9',
    transition: 'background-color 0.15s ease'
  },
  td: {
    padding: '16px 18px',
    fontSize: '13px',
    verticalAlign: 'top'
  },
  codRezervare: {
    fontWeight: '900',
    color: 'var(--color-primary)',
    fontSize: '14px'
  },
  dataPlasare: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    marginTop: '3px'
  },
  clientNume: {
    fontWeight: '800',
    color: 'var(--color-text)',
    fontSize: '13px'
  },
  clientCompanie: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--color-accent-orange)',
    marginTop: '2px'
  },
  clientContact: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    marginTop: '4px'
  },
  perioadaBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  perioadaRand: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px'
  },
  perioadaLabel: {
    color: 'var(--color-text-muted)',
    fontSize: '11px',
    fontWeight: '600',
    width: '50px'
  },
  perioadaValoare: {
    fontWeight: '700',
    color: 'var(--color-text)'
  },
  articoleList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    maxWidth: '280px'
  },
  articolRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px',
    fontSize: '12px'
  },
  articolDot: {
    color: 'var(--color-accent-orange)',
    fontWeight: '900'
  },
  articolNume: {
    fontWeight: '700',
    color: 'var(--color-text)'
  },
  articolMeta: {
    color: 'var(--color-text-muted)',
    fontSize: '11px',
    whiteSpace: 'nowrap'
  },
  faraArticole: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    fontStyle: 'italic'
  },
  chirieTotal: {
    fontWeight: '900',
    color: 'var(--color-text)',
    fontSize: '14px'
  },
  garantieTotal: {
    fontSize: '11px',
    color: 'var(--color-text-muted)',
    marginTop: '2px'
  },
  statusBadge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: 'var(--radius-full)',
    border: '1px solid',
    fontSize: '11px',
    fontWeight: '800',
    whiteSpace: 'nowrap'
  },
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '6px'
  },
  detailsBtn: {
    padding: '6px 10px',
    fontSize: '12px',
    fontWeight: '700',
    backgroundColor: '#F8FAFC',
    border: '1px solid #CBD5E1',
    borderRadius: 'var(--radius-sm)',
    color: '#334155',
    cursor: 'pointer'
  },
  confirmBtn: {
    padding: '6px 12px',
    fontSize: '12px',
    fontWeight: '800',
    backgroundColor: '#DCFCE7',
    border: '1.5px solid #86EFAC',
    borderRadius: 'var(--radius-sm)',
    color: '#15803D',
    cursor: 'pointer'
  },
  rejectBtn: {
    padding: '6px 10px',
    fontSize: '12px',
    fontWeight: '800',
    backgroundColor: '#FEE2E2',
    border: '1.5px solid #FCA5A5',
    borderRadius: 'var(--radius-sm)',
    color: '#B91C1C',
    cursor: 'pointer'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 'var(--radius-xl)',
    maxWidth: '640px',
    width: '100%',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--shadow-float)',
    overflow: 'hidden'
  },
  modalHeader: {
    padding: '20px 24px',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFDF9'
  },
  modalSub: {
    fontSize: '10px',
    fontWeight: '800',
    letterSpacing: '1px',
    color: 'var(--color-accent-orange)'
  },
  modalTitle: {
    fontSize: '20px',
    fontWeight: '900',
    color: 'var(--color-primary)'
  },
  modalCloseBtn: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: 'var(--color-text-muted)',
    padding: '4px 8px'
  },
  modalBody: {
    padding: '24px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  modalSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  modalSectionTitle: {
    fontSize: '13px',
    fontWeight: '800',
    color: 'var(--color-text)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  modalInfoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    backgroundColor: '#F8FAFC',
    padding: '14px',
    borderRadius: 'var(--radius-md)',
    border: '1px solid #E2E8F0'
  },
  infoLabel: {
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--color-text-muted)',
    display: 'block',
    marginBottom: '2px'
  },
  infoValue: {
    fontSize: '13px',
    fontWeight: '700',
    color: 'var(--color-text)'
  },
  observatiiBox: {
    marginTop: '6px',
    padding: '12px',
    backgroundColor: '#FFFBEB',
    borderRadius: 'var(--radius-md)',
    border: '1px solid #FDE68A'
  },
  observatiiText: {
    fontSize: '12px',
    color: '#92400E',
    marginTop: '4px',
    lineHeight: 1.4
  },
  modalArticoleTable: {
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    overflow: 'hidden'
  },
  modalArticolHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1.2fr 1.2fr',
    padding: '8px 12px',
    backgroundColor: '#F1F5F9',
    fontSize: '11px',
    fontWeight: '800',
    color: 'var(--color-text-muted)'
  },
  modalArticolRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1.2fr 1.2fr',
    padding: '10px 12px',
    borderTop: '1px solid #F1F5F9',
    fontSize: '12px',
    alignItems: 'center'
  },
  modalTotals: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    marginTop: '10px',
    padding: '12px 14px',
    backgroundColor: '#FFF7ED',
    borderRadius: 'var(--radius-md)',
    border: '1px solid #FDBA74'
  },
  modalTotalRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: 'var(--color-text)'
  },
  modalFooter: {
    padding: '16px 24px',
    borderTop: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '12px',
    backgroundColor: '#F8FAFC'
  },
  modalRejectBtn: {
    padding: '10px 18px',
    fontSize: '13px',
    fontWeight: '800',
    backgroundColor: '#FEE2E2',
    border: '1.5px solid #FCA5A5',
    borderRadius: 'var(--radius-md)',
    color: '#B91C1C',
    cursor: 'pointer'
  },
  modalConfirmBtn: {
    padding: '10px 20px',
    fontSize: '13px',
    fontWeight: '800',
    backgroundColor: '#16A34A',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    color: '#FFFFFF',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(22, 163, 74, 0.3)'
  },
  modalCloseFooterBtn: {
    padding: '10px 18px',
    fontSize: '13px',
    fontWeight: '700',
    backgroundColor: '#FFFFFF',
    border: '1.5px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--color-text)',
    cursor: 'pointer'
  }
}
