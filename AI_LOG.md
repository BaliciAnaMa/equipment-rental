# AI_LOG — Jurnal Asistență AI & Istoric Decizii (RentCam)

> Jurnal de trasabilitate pentru intervențiile, rafinările de design, configurările de ledger și planificarea arhitecturală realizate cu ajutorul asistentului AI.

---

## 2026-11-18 — Etapa 1: Inițializare Structură, Ledger & Mock-uri UI
- **Activități**:
  - Crearea structurii de guvernanță pentru agenți sub `docs/agents/` conform metodologiei Graffino (`DECISIONS.md`, `PATTERNS.md`, `CONTRACTS.md`, `OPEN-QUESTIONS.md`, `SCOPE.md`, `ARCHITECTURE.md`).
  - Formularea deciziilor inițiale arhitecturale fundamentale `D-001` (Stack: React, NestJS, MySQL, Docker), `D-002` (Catalog pe două niveluri: Model vs. Unitate fizică cu seriale unice), `D-003` (Paliere de preț: oră, zi, weekend, săptămână), `D-004` (Roluri RBAC: Client, Operator, Admin), `D-005` (Retur parțial, checklist kit accesorii și rapoarte de daune cu fotografii).
  - Crearea design tokens și registru ecrane `docs/design/registry.yaml`.
  - Elaborarea mock-urilor HTML responsive pentru toate ecranele din fluxul de închiriere (`DS-rent-catalog`, `DS-rent-equipment-detail`, `DS-rent-booking-cart`, `DS-rent-op-*`, `DS-rent-admin-*`).
  - Verificare inițială cu utilitarul `docs/agents/tools/ledger-lint.py` (0 erori).

---

## 2026-11-19 — Etapa 2: Rafinare Mock UI, Documente de Bază & Plan Tehnic
- **Activități**:
  - **Rafinare UI (`DS-rent-catalog.html`)**:
    - Ascunderea completă a barei de derulare native orizontale la secțiunea de categorii (`scrollbar-width: none` și `::-webkit-scrollbar { display: none; }`).
    - Adăugarea scriptului interactiv pentru derulare fluidă prin mouse wheel (`wheel -> scrollLeft`) și prin click-and-drag.
    - Integrarea săgeților de navigare stânga/dreapta vizibile discret la hover pe wrapper-ul de categorii.
    - Aprobarea ecranului `DS-rent-catalog` în `docs/design/registry.yaml` (`status: approved`).
  - **Completare `README.md`**:
    - Detalierea scope-ului proiectului RentCam, arhitecturii (React, NestJS, MySQL, Docker), configurării variabilelor de mediu (`.env`) și profilului clientului/dataset-ului de închirieri foto-video.
  - **Creare `DATA.md`**:
    - Definirea unui dataset complet și realist cu 10 modele din categoriile Camere Cinema, Obiective, Lumini, Audio și Grip.
    - Alocarea numerelor de serie unice (`serial_number`), codurilor de bare, matricii de prețuri pe paliere (1 zi, weekend promo, 1 săptămână) și a listelor de accesorii incluse în kit.
  - **Completare `CONTEXT.md`**:
    - Extinderea glosarului de termeni aprobați (Equipment Model, Physical Unit, Pricing Tier, Check-Out, Check-In, Partial Return, Kit Checklist, Deposit, Damage Report) și regulilor terminologice.
    - Includerea întrebărilor de clarificare `Q-001` - `Q-004` referitoare la scripturile de build/test/run și screenshot-uri.
  - **Elaborare Plan Tehnic (`docs/IMPLEMENTATION_PLAN.md`)**:
    - Diagrame arhitecturale și entitate-relație (Mermaid).
    - Schema relațională exhaustivă MySQL cu 9 tabele: `users`, `equipment_categories`, `equipment_models`, `pricing_tiers`, `equipment_units`, `reservations`, `reservation_items`, `check_logs`, `damage_reports`.
    - Structura arborescentă a directoarelor pentru viitoarea aplicație (`backend/`, `frontend/`, `docker-compose.yml`).
    - Faze de implementare etapizate.
  - **Validare Ledger**:
    - Rularea `python3 docs/agents/tools/ledger-lint.py` confirmând conformitatea ledger-ului cu zero erori.

---

## 2026-11-25 — Etapa 4: Plan Arhitectural & Implementare End-to-End RentCam (Full-Stack)
- **Status Plan**: Aprobat de utilizator (Ready for Implementation)
- **Activități**:
  - Elaborarea planului complet end-to-end conform metodologiei `/plan`:
    - **Dimensiune (Size: L)**: Acoperire completă Full-Stack (MySQL 8, AWS S3 Free Tier media service, NestJS REST API cu RBAC, React SPA cu Light & Vibrant Studio Theme, Docker Compose și suite automate de testare).
    - **Schema Bazei de Date**: 9 tabele relaționale (`users`, `equipment_models`, `pricing_tiers`, `physical_units`, `kit_checklist_items`, `rentals`, `rental_items`, `damage_reports`, `maintenance_logs`), cu chei străine, integritate referențială, stocare exclusivă în UTC și referințe media strict prin chei/URL-uri S3 (fără BLOB-uri).
    - **AWS S3 Media Integration**: Serviciu NestJS pentru generarea URL-urilor presemnate (PUT/GET) destinate încărcării sigure a fotografiilor de echipament și dovezilor de daune, cu mecanism fallback mock local pentru dezvoltare offline.
    - **NestJS Domain Engines**: RBAC cu gărzi (`client`, `operator`, `admin`), motor de disponibilitate calendaristică cu buffer automat de mentenanță de 2 ore, motor de calcul tarifar optimizat pe 4 paliere F64 (orar, zilnic, pachet weekend vineri 16:00 - luni 11:00 @ ~1.5x, pachet 7 zile) și flux operațional de ghișeu cu retur parțial și inspecție checklist kit accesorii.
    - **React Frontend**: Implementarea identității vizuale Light & Vibrant Studio Theme inspirată de F64 Rent (`#FFFDF9` cream-white, `#E11D48` studio red, `#F97316` orange, `#F59E0B` amber), acoperind modulul Client (catalog, coș, cont client), Dispecerat Operator (predare, retur parțial, daune cu poze S3, mentenanță), Administrare (modele, unități fizice, rapoarte), Autentificare & Demo Switcher (`DS-rent-auth`) și Ghid & FAQ Închiriere (`DS-rent-help`).
  - **Structurarea concretă a ordinii de execuție în `docs/IMPLEMENTATION_PLAN.md`**:
    - **Etapa 1**: Frontend Partea 1 (React + Vite, date mock locale, pagini Auth + Quick Demo Switcher, Catalog cu bară unică flex-wrap, Detalii Kit, Ghid & FAQ).
    - **Etapa 2**: Bază de date MySQL 8 (Docker Compose, 9 tabele în UTC, seed complet) & Backend NestJS (module REST, disponibilitate + buffer 2h, tarife oră/zi/weekend/săptămână, conectare pagini din Etapa 1).
    - **Etapa 3**: Frontend Partea 2 (Coș de rezervare, Cont Client, Ghișeu Operator cu predare/retur parțial/daune și Panou Admin conectate la API).
    - **Etapa 4**: AWS S3 Free Tier (presigned URLs) & Testare automată end-to-end.
  - Verificare ledger cu `python3 docs/agents/tools/ledger-lint.py` (succes).
    - **Docker Compose & Testare**: Orchestrat multi-container cu migrații și seed automat din `DATA.md`, teste unitare/integrare Jest & Vitest și capturi Playwright.
  - Confirmarea explicită a tuturor intrărilor din tabelul de cunoștințe: `D-001`, `D-002`, `D-003`, `D-004`, `D-005`, `D-006`, `D-007`, `D-008`, `C-001`, `PATTERN-001`, `Q-001`, `Q-002`, `Q-003`, `Q-004`.
  - Copierea planului aprobat în `docs/IMPLEMENTATION_PLAN.md`.
  - Verificarea integrității ledger-ului prin `python3 docs/agents/tools/ledger-lint.py` (0 erori).
  - Oprire la faza de planificare conform cerinței (fără redactare cod de producție backend/frontend).
