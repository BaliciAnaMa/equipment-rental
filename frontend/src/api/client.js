// frontend/src/api/client.js
// Client API centralizat pentru comunicarea cu backend-ul Express

const API_BASE_URL = 'http://localhost:5000/api';
const CHEIE_STORAGE_TOKEN = 'rentcam_jwt_token';
const CHEIE_STORAGE_UTILIZATOR = 'rentcam_utilizator_curent';

// Obține tokenul stocat
export function obtineToken() {
  return localStorage.getItem(CHEIE_STORAGE_TOKEN);
}

// Salvează tokenul JWT
export function seteazaToken(token) {
  if (token) {
    localStorage.setItem(CHEIE_STORAGE_TOKEN, token);
  } else {
    localStorage.removeItem(CHEIE_STORAGE_TOKEN);
  }
}

// Funcție generică pentru apeluri HTTP către backend
export async function cerereApi(endpoint, optiuni = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = obtineToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(optiuni.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const raspuns = await fetch(url, {
    ...optiuni,
    headers
  });

  const date = await raspuns.json().catch(() => ({}));

  if (!raspuns.ok) {
    const mesajEroare = date.mesaj || `Eroare HTTP ${raspuns.status}`;
    const eroare = new Error(mesajEroare);
    eroare.status = raspuns.status;
    eroare.date = date;
    throw eroare;
  }

  return date;
}

// Servicii API: Autentificare
export const authApi = {
  async register(dateCont) {
    const res = await cerereApi('/auth/register', {
      method: 'POST',
      body: JSON.stringify(dateCont)
    });
    if (res.token) {
      seteazaToken(res.token);
    }
    return res;
  },

  async login(email, parola) {
    const res = await cerereApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, parola })
    });
    if (res.token) {
      seteazaToken(res.token);
    }
    return res;
  },

  async me() {
    return await cerereApi('/auth/me');
  },

  logout() {
    seteazaToken(null);
    localStorage.removeItem(CHEIE_STORAGE_UTILIZATOR);
  }
};

// Servicii API: Echipamente
export const echipamenteApi = {
  async listeaza({ categorie, q } = {}) {
    const params = new URLSearchParams();
    if (categorie && categorie !== 'Toate') params.append('categorie', categorie);
    if (q && q.trim()) params.append('q', q.trim());
    const querystring = params.toString() ? `?${params.toString()}` : '';
    return await cerereApi(`/echipamente${querystring}`);
  },

  async detalii(id) {
    return await cerereApi(`/echipamente/${id}`);
  }
};

// Servicii API: Rezervări
export const rezervariApi = {
  async mele() {
    return await cerereApi('/rezervari/mele');
  },

  async trimite(dateRezervare) {
    return await cerereApi('/rezervari', {
      method: 'POST',
      body: JSON.stringify(dateRezervare)
    });
  },

  async anuleaza(id) {
    return await cerereApi(`/rezervari/${id}/anulare`, {
      method: 'PATCH'
    });
  }
};
