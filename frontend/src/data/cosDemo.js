// frontend/src/data/cosDemo.js — Gestiunea coșului de echipamente în localStorage

const CHEIE_STORAGE_COS = 'rentcam_cos_produse'
export const NUME_EVENIMENT_COS = 'cosActualizat'

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

// Salvează lista curată în localStorage și emite evenimentul standard
export function salveazaCos(articole) {
  try {
    const listaCurata = Array.isArray(articole) ? articole : []
    localStorage.setItem(CHEIE_STORAGE_COS, JSON.stringify(listaCurata))
    window.dispatchEvent(new Event(NUME_EVENIMENT_COS))
  } catch (eroare) {
    console.error('Eroare la salvarea coșului în localStorage:', eroare)
  }
}

// Numărul total de unități din coș
export function numarProduseCos() {
  const cos = citesteCos()
  return cos.reduce((total, articol) => total + (articol.cantitate || 1), 0)
}

// Calculează prețul unitar în funcție de palierul tarifar
export function calculeazaPretUnitar(articol) {
  switch (articol.tipTarif) {
    case 'Weekend -25%':
      return articol.pretWeekend
    case '7 Zile':
      return articol.pretSaptamana
    case '1 Zi':
    default:
      return articol.pretZi
  }
}

// Adaugă un echipament în coș (dacă există același echipament cu același tarif, crește cantitatea)
export function adaugaInCos(echipament, tipTarif = '1 Zi') {
  const cos = citesteCos()
  const indexExistent = cos.findIndex(
    item => item.id === echipament.id && item.tipTarif === tipTarif
  )

  if (indexExistent >= 0) {
    cos[indexExistent].cantitate = (cos[indexExistent].cantitate || 1) + 1
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

// Modifică cantitatea unui produs (dacă e <= 0, îl elimină complet)
export function actualizeazaCantitate(echipamentId, tipTarif, nouaCantitate) {
  let cos = citesteCos()

  if (nouaCantitate <= 0) {
    cos = cos.filter(
      item => !(item.id === echipamentId && item.tipTarif === tipTarif)
    )
  } else {
    const index = cos.findIndex(
      item => item.id === echipamentId && item.tipTarif === tipTarif
    )
    if (index >= 0) {
      cos[index].cantitate = nouaCantitate
    }
  }

  salveazaCos(cos)
  return cos
}

// Șterge complet un articol din coș după id și tarif
export function stergeDinCos(echipamentId, tipTarif) {
  const cos = citesteCos()
  const cosFiltrat = tipTarif
    ? cos.filter(item => !(item.id === echipamentId && item.tipTarif === tipTarif))
    : cos.filter(item => item.id !== echipamentId)

  salveazaCos(cosFiltrat)
  return cosFiltrat
}

// Golește complet coșul
export function golesteCos() {
  salveazaCos([])
}
