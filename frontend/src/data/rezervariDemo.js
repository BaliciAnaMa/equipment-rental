// frontend/src/data/rezervariDemo.js — Gestiunea rezervărilor clientului în localStorage

const CHEIE_STORAGE_REZERVARI = 'rentcam_rezervari_client'
export const NUME_EVENIMENT_REZERVARI = 'rezervariActualizate'

// Rezervare inițială demonstrativă pentru Andrei Ionescu • Studio Nord
const REZERVARI_INITSIALE = [
  {
    id: 'RC-2026-014',
    dataPlasare: '2026-11-20',
    dataRidicare: '2026-11-28',
    dataPredare: '2026-11-30',
    status: 'Confirmată', // 'În așteptare', 'Confirmată', 'Anulată', 'Finalizată'
    clientNume: 'Andrei Ionescu',
    clientEmail: 'client@rentcam.ro',
    clientCompanie: 'Studio Nord',
    observatii: 'Filmări clip muzical în studio. Vă rugăm să pregătiți acumulatorii încărcați la maxim.',
    articole: [
      {
        id: 'eq_fx3',
        nume: 'Sony FX3 Cinema Line',
        categorie: 'Video Cinema',
        tipTarif: 'Weekend -25%',
        cantitate: 1,
        pretUnitar: 525,
        garantie: 2500
      },
      {
        id: 'eq_sony_2470',
        nume: 'Sony FE 24-70mm f/2.8 GM II',
        categorie: 'Foto',
        tipTarif: 'Weekend -25%',
        cantitate: 1,
        pretUnitar: 225,
        garantie: 1200
      }
    ],
    totalChirie: 750,
    totalGarantie: 3700
  }
]

// Citește rezervările din localStorage (sau inițializează cu cele demo)
export function citesteRezervari() {
  try {
    const salvate = localStorage.getItem(CHEIE_STORAGE_REZERVARI)
    if (salvate) {
      return JSON.parse(salvate)
    }
    // Prima inițializare cu date demo
    localStorage.setItem(CHEIE_STORAGE_REZERVARI, JSON.stringify(REZERVARI_INITSIALE))
    return REZERVARI_INITSIALE
  } catch (eroare) {
    console.error('Eroare la citirea rezervărilor:', eroare)
    return REZERVARI_INITSIALE
  }
}

// Salvează lista de rezervări și emite notificare
export function salveazaRezervari(lista) {
  try {
    localStorage.setItem(CHEIE_STORAGE_REZERVARI, JSON.stringify(lista))
    window.dispatchEvent(new Event(NUME_EVENIMENT_REZERVARI))
  } catch (eroare) {
    console.error('Eroare la salvarea rezervărilor:', eroare)
  }
}

// Adaugă o rezervare nouă
export function adaugaRezervare(dateRezervare) {
  const rezervari = citesteRezervari()
  const numarAleator = Math.floor(100 + Math.random() * 900)
  const idNou = `RC-2026-${numarAleator}`

  const rezervareNoua = {
    id: idNou,
    dataPlasare: new Date().toISOString().split('T')[0],
    status: 'În așteptare',
    ...dateRezervare
  }

  rezervari.unshift(rezervareNoua)
  salveazaRezervari(rezervari)
  return rezervareNoua
}

// Anulează o rezervare aflată în așteptare
export function anuleazaRezervare(idRezervare) {
  const rezervari = citesteRezervari()
  const rezervare = rezervari.find(r => r.id === idRezervare)

  if (rezervare && rezervare.status === 'În așteptare') {
    rezervare.status = 'Anulată'
    salveazaRezervari(rezervari)
    return true
  }
  return false
}
