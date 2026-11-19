# RentCam — Platformă de Închiriere Echipamente Foto, Video & Audio

> Aplicație web completă dedicată companiilor de producție, cineaștilor independenți, fotografilor și creatorilor de conținut pentru rezervarea, gestionarea și urmărirea inventarului de echipamente profesionale.

---

## 1. Scope & Obiective

**RentCam** rezolvă provocările operaționale din industria închirierilor foto/video:
- **Catalog dinamic cu calcul tarifar optimizat**: Clienții pot verifica disponibilitatea în timp real în funcție de intervalul orar dorit, beneficiind de aplicarea automată a celui mai avantajos palier tarifar (1 oră, 1 zi, pachet weekend sau 1 săptămână).
- **Gestiune pe două niveluri (Model vs. Unitate Fizică)**: Separarea catalogului de modele de urmărirea fiecărei unități hardware fizice unice prin număr de serie (`serial_number`), stare operațională și cod de bare.
- **Workflow securizat de check-out / check-in la ghișeu**: Verificarea checklist-ului de accesorii incluse (baterii, încărcătoare, cabluri, capace, cutie de transport), recepție cu retur parțial și documentarea daunelor prin rapoarte cu atașamente foto înainte de eliberarea garanției.
- **Trei roluri de acces (RBAC)**:
  - **Client**: Căutare, verificare calendar disponibilitate, coș de rezervare, istoric comenzi.
  - **Operator (Ghișeu)**: Dashboard preluări/returnări, scanare serie, inspecție kit accesorii, creare raport daune, blocare unități în mentenanță/curățare.
  - **Admin**: Nomenclator modele, gestiune unități fizice și numere de serie, definire paliere de preț, audit utilizatori și rapoarte de utilizare/venituri.

---

## 2. Stack Tehnologic

- **Frontend**: [React 18+](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/) + [Tailwind CSS](https://tailwindcss.com/) / Vanilla CSS Tokens
- **Backend**: [NestJS](https://nestjs.com/) (Node.js framework modular) + [TypeScript](https://www.typescriptlang.org/)
- **Bază de date**: [MySQL 8.0+](https://www.mysql.com/) (ACID compliant, relațională)
- **Containerizare & Orchetrare**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

---

## 3. Identificare Client & Dataset

- **Profil client**: Casă de închiriere echipamente profesionale cinematografice, broadcast și foto (*RentCam Studio Gear S.R.L.*).
- **Natura dataset-ului**: Echipamente reale din gamele Sony Cinema Line, Canon Cinema EOS, RED Digital Cinema, Blackmagic Design, obiective anamorfice și zoom Sony G Master / Sigma Art, kituri de lumini LED Nanlite/Aputure, microfoane Sennheiser/Rode, sisteme wireless DJI Mic și suport grip/trepiede Manfrotto.
- **Specificații inventar detaliat**: Vezi [DATA.md](file:///home/balici/Work/Proiect1-Web/DATA.md) pentru inventarul complet cu 10 modele reale, numere de serie exemplificative, kituri de accesorii și matrice de tarife.

---

## 4. Variabile de Mediu Necesare (`.env`)

Creați un fișier `.env` în rădăcina proiectului (sau consultați `.env.example` odată ce codul de aplicație este inițializat):

```bash
# ==========================================
# Configurare Bază de Date MySQL
# ==========================================
MYSQL_ROOT_PASSWORD=rentcam_root_secure_pass
MYSQL_DATABASE=rentcam_db
MYSQL_USER=rentcam_app
MYSQL_PASSWORD=rentcam_app_secure_pass
MYSQL_HOST=mysql
MYSQL_PORT=3306

# ==========================================
# Configurare Backend API (NestJS)
# ==========================================
PORT=4000
NODE_ENV=development
JWT_SECRET=super_secret_jwt_key_rentcam_change_in_production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000

# ==========================================
# Configurare Frontend (React / Vite)
# ==========================================
VITE_API_URL=http://localhost:4000/api
VITE_APP_TITLE=RentCam - Închiriere Echipamente Foto Video
```

---

## 5. Structură Repo & Ghiduri

- `docs/agents/` — Registru formal de decizii arhitecturale ([DECISIONS.md](file:///home/balici/Work/Proiect1-Web/docs/agents/DECISIONS.md)), contracte API ([CONTRACTS.md](file:///home/balici/Work/Proiect1-Web/docs/agents/CONTRACTS.md)), întrebări deschise ([OPEN-QUESTIONS.md](file:///home/balici/Work/Proiect1-Web/docs/agents/OPEN-QUESTIONS.md)) și reguli de lucru.
- `docs/design/` — Sistemul de design, token-uri CSS și mock-uri UI interactive ([DESIGN.md](file:///home/balici/Work/Proiect1-Web/docs/design/DESIGN.md), [registry.yaml](file:///home/balici/Work/Proiect1-Web/docs/design/registry.yaml)).
- `docs/IMPLEMENTATION_PLAN.md` — Schema relațională completă MySQL, structura de foldere și pașii tehnici de execuție.
- `CONTEXT.md` — Glosarul termenilor autorizați și întrebările de clarificare.
- `DATA.md` — Setul de date demonstrativ cu echipamente reale, numere de serie și tarife.
- `AI_LOG.md` — Jurnalul cronologic de asistență AI și trasabilitate decizională.
