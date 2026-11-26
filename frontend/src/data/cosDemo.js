// frontend/src/data/cosDemo.js — Gestiunea coșului de echipamente în localStorage

const CHEIE_STORAGE_COS = 'rentcam_cos_produse'
export const EVENIMENT_ACTUALIZARE_COS = 'rentcam:cos_actualizat'

// Citește lista de articole din coș
export function citesteCos() {
  try {
    const dateSalvate = localStorage.getItem(CHEIE_STORAGE_COS)
    return dateSalvate ? JSON.parse(dateSalvate) : []
  } catch (eroare) {
    console.error('Eroare la citirea coșului din localStorage:', eroare)
    return []
  }
}

// Salvează lista și notifică ascultătorii
export function salveazaCos(articole) {
  try {
    localStorage.setItem(CHEIE_STORAGE_COS, JSON.stringify(articole))
    window.dispatchEvent(new CustomEvent(EVENIMENT_ACTUALIZARE_COS, { detail: articole }))
  } catch (eroare) {
    console.error('Eroare la salvarea coșului în localStorage:', eroare)
  }
}

// Numărul total de produse din coș
export function numarProduseCos() {
  const cos = citesteCos()
  return cos.reduce((total, articol) => total + (articol.cantitate || 1), 0)
}

// Adaugă un echipament în coș (sau incrementează dacă există deja)
export function adaugaInCos(echipament, tipTarif = '1 Zi') {
  const cos = citesteCos()
  const indexExistent = cos.findIndex(item => item.id === echipament.id)

  if (indexExistent >= 0) {
    cos[indexExistent].cantitate = (cos[indexExistent].cantitate || 1) + 1
    cos[indexExistent].tipTarif = tipTarif
  } else {
    cos.push({
      id: echipament.id,
      nume: echipament.nume,
      categorie: echipament.categorie,
      montura: echipament.montura,
      pretZi: echipament.pretZi,
      pretWeekend: echipament.pretWeekend,
      pretSaptamana: echipament.pretSaptamana,
      garantie: echipament.garantie,
      tipTarif: tipTarif,
      cantitate: 1
    })
  }

  salveazaCos(cos)
  return cos
}

// Șterge un articol din coș
export function stergeDinCos(echipamentId) {
  const cos = citesteCos().filter(item => item.id !== echipamentId)
  salveazaCos(cos)
  return cos
}

// Golește complet coșul
export function golesteCos() {
  salveazaCos([])
}
