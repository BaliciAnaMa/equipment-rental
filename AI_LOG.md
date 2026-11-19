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

## 2026-11-19 — Etapa 3: Revizuire și Aprobare Plan Tehnic (IMPLEMENTATION_PLAN.md)
- **Status Plan**: Aprobat (Ready for Implementation)
- **Activități**:
  - Aprobarea formală de către utilizator a planului pentru schema bazei de date și migrațiile inițiale MySQL (conform skill-ului `/plan`).
  - Confirmarea explicită a tuturor intrărilor din tabelul de cunoștințe utilizate: `D-001`, `D-002`, `D-003`, `D-004`, `D-005`, `PATTERN-001`, `C-001`, `Q-005`, `Q-007`, `Q-012`. Marcarea liniei `- **Confirmed:** 2026-11-19` în `DECISIONS.md` și `PATTERNS.md`.
  - Copierea planului aprobat în `docs/IMPLEMENTATION_PLAN.md`, conținând secțiunile obligatorii (Size, Approach, Files, Tests, Design, Sequencing, Risks, Out of scope, Knowledge used) și specificația DDL completă în UTC pentru cele 9 tabele relaționale (`users`, `equipment_categories`, `equipment_models`, `equipment_units`, `pricing_tiers`, `reservations`, `reservation_items`, `check_logs`, `damage_reports`).
  - Verificarea integrității ledger-ului prin rularea `python3 docs/agents/tools/ledger-lint.py` (0 erori).
  - Stop conform instrucțiunilor (fără inițiere cod de implementare backend/frontend).
