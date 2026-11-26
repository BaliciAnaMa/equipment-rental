// frontend/src/data/utilizatoriDemo.js — Gestiune sesiune utilizator în localStorage

const CHEIE_STORAGE_UTILIZATOR = 'rentcam_utilizator_curent'

// Datele demonstrative pentru contul de Client
export const CLIENT_DEMO = {
  id: 'usr_client_01',
  nume: 'Andrei Ionescu',
  companie: 'Studio Nord',
  email: 'client@rentcam.ro',
  telefon: '+40 722 000 111',
  rol: 'client',
  avatar: 'AI'
}

// Citește utilizatorul logat din localStorage
export function obtineUtilizatorCurent() {
  try {
    const salvat = localStorage.getItem(CHEIE_STORAGE_UTILIZATOR)
    return salvat ? JSON.parse(salvat) : null
  } catch (eroare) {
    console.error('Eroare la citirea utilizatorului din localStorage:', eroare)
    return null
  }
}

// Salvează sesiunea utilizatorului în localStorage
export function seteazaUtilizatorCurent(utilizator) {
  try {
    if (utilizator) {
      localStorage.setItem(CHEIE_STORAGE_UTILIZATOR, JSON.stringify(utilizator))
    } else {
      localStorage.removeItem(CHEIE_STORAGE_UTILIZATOR)
    }
  } catch (eroare) {
    console.error('Eroare la salvarea utilizatorului în localStorage:', eroare)
  }
}

// Autentificare rapidă cu contul Client Demo
export function loginClientDemo() {
  seteazaUtilizatorCurent(CLIENT_DEMO)
  return CLIENT_DEMO
}

// Deconectare
export function logoutUtilizator() {
  seteazaUtilizatorCurent(null)
}
