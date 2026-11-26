// frontend/src/data/utilizatoriDemo.js — Gestiune sesiune utilizator în localStorage
import { authApi } from '../api/client';

const CHEIE_STORAGE_UTILIZATOR = 'rentcam_utilizator_curent';

// Citește utilizatorul logat din localStorage
export function obtineUtilizatorCurent() {
  try {
    const salvat = localStorage.getItem(CHEIE_STORAGE_UTILIZATOR);
    return salvat ? JSON.parse(salvat) : null;
  } catch (eroare) {
    console.error('Eroare la citirea utilizatorului din localStorage:', eroare);
    return null;
  }
}

// Salvează sesiunea utilizatorului în localStorage
export function seteazaUtilizatorCurent(utilizator) {
  try {
    if (utilizator) {
      // Formatăm proprietățile pentru consistență frontend (nume, companie, avatar)
      const utilizatorFormatat = {
        ...utilizator,
        nume: utilizator.nume || utilizator.nume_complet || 'Utilizator',
        companie: utilizator.companie || utilizator.nume_companie || '',
        avatar: (utilizator.nume || utilizator.nume_complet || 'CL').substring(0, 2).toUpperCase()
      };
      localStorage.setItem(CHEIE_STORAGE_UTILIZATOR, JSON.stringify(utilizatorFormatat));
    } else {
      localStorage.removeItem(CHEIE_STORAGE_UTILIZATOR);
    }
  } catch (eroare) {
    console.error('Eroare la salvarea utilizatorului în localStorage:', eroare);
  }
}

// Deconectare
export function logoutUtilizator() {
  authApi.logout();
  seteazaUtilizatorCurent(null);
}
