# Plan de Implementare — RentCam (Arhitectură & Execuție Pas cu Pas)

## Size
L — Implementare Full-Stack modulară structurată în 4 etape clare: Frontend React cu mock-uri locale, Bază de date relațională MySQL (9 tabele în UTC) și Backend NestJS cu motoare de calcul și disponibilitate, Frontend integrat complet cu API-ul backend, și Serviciu media AWS S3 (Free Tier) la final cu suite de teste automate.

---

## Approach
Dezvoltare iterativă și decuplată, orientată pe prototipare rapidă și validare vizuală imediată înainte de cuplarea cu baza de date:
1. **Etapa 1 (Frontend Partea 1)**: Crearea structurii aplicației React + Vite + TypeScript, aplicarea temei calde de studio (#FFFDF9, accente roșu #E11D48, portocaliu #F97316, galben #F59E0B), implementarea primelor ecrane esențiale (Autentificare cu Demo Switcher, Catalog cu bară unică flex-wrap, Detalii Kit, Ghid & FAQ) izolate printr-un strat curat de servicii (`services/`) bazat pe mock-uri locale.
2. **Etapa 2 (Baza de date & Backend NestJS)**: Ridicarea containerului MySQL 8 prin Docker Compose, crearea migrațiilor pentru cele 9 tabele cu stocare exclusiv în UTC și referințe `image_key` pentru media, seed-ul cu date complete (utilizatori demo, modele foto/video/audio, unități fizice cu seriale, checklist-uri). Implementarea modulelor NestJS (`auth`, `equipment`, `bookings`, `operations`, `admin`), motorul de disponibilitate cu buffer automat de 2 ore pentru mentenanță/curățare senzor, motorul de calcul pe 4 paliere tarifare (oră, zi, weekend promo Vineri 16:00 – Luni 11:00, săptămână) și conectarea ecranelor din Etapa 1 la API.
3. **Etapa 3 (Frontend Partea 2)**: Conectarea fluxurilor complete de business — Coșul de rezervare și Contul Clientului cu istoricul comenzilor, Ghișeul Operatorului (predare fizică cu checklist, retur parțial pe seriale, raportare daune) și Panoul de Administrare.
4. **Etapa 4 (AWS S3 & Testare)**: Integrarea serviciului de stocare media Amazon AWS S3 (Free Tier) prin generarea de URL-uri presemnate securizate (PUT/GET) pentru imagini de echipamente și fotografii de constatare a daunelor, urmată de rularea testelor automate pentru regulile critice de business (disponibilitate, tarife, predare–retur).

---

## Knowledge used
Tabelul de trasabilitate a deciziilor și contractelor confirmate din ledger:

| ID | Titlu | Statut | Confirmare | Impact în Implementare |
|---|---|---|---|---|
| [D-001](file:///home/balici/Work/Proiect1-Web/docs/agents/DECISIONS.md#D-001) | Primary technology stack | approved | 2026-11-19 | Stack: React (Vite/TS), NestJS (Node.js), MySQL 8 (Docker). |
| [D-002](file:///home/balici/Work/Proiect1-Web/docs/agents/DECISIONS.md#D-002) | Two-tier inventory model | approved | 2026-11-19 | Separare Model Echipament (`equipment_models`) vs. Unitate Fizică (`physical_units`) cu număr de serie unic. |
| [D-003](file:///home/balici/Work/Proiect1-Web/docs/agents/DECISIONS.md#D-003) | Multi-tier pricing calculation | approved | 2026-11-19 | 4 paliere: oră, zi, weekend (Vin 16:00 – Lun 11:00 @ ~1.5x zi), săptămână (~4x zi). |
| [D-004](file:///home/balici/Work/Proiect1-Web/docs/agents/DECISIONS.md#D-004) | Role-based permissions (RBAC) | approved | 2026-11-19 | 3 roluri distincte: `client`, `operator`, `admin`. |
| [D-005](file:///home/balici/Work/Proiect1-Web/docs/agents/DECISIONS.md#D-005) | Partial returns & checklists | approved | 2026-11-19 | Retur parțial pe unități, checklist tactil accesorii, rapoarte de daună. |
| [D-006](file:///home/balici/Work/Proiect1-Web/docs/agents/DECISIONS.md#D-006) | External media storage S3 | approved | 2026-11-19 | Stocare imagini exclusiv în S3 via presigned URLs; în DB salvăm doar `image_key`. |
| [D-007](file:///home/balici/Work/Proiect1-Web/docs/agents/DECISIONS.md#D-007) | Light & vibrant studio theme | approved | 2026-11-25 | Alb-crem `#FFFDF9`, roșu `#E11D48`, portocaliu `#F97316`, galben `#F59E0B`, Hero cald mahon. |
| [D-008](file:///home/balici/Work/Proiect1-Web/docs/agents/DECISIONS.md#D-008) | Dedicated Rental Help section | approved | 2026-11-25 | Ecran dedicat de ghid, politică de weekend, garanții și FAQ (`DS-rent-help`). |

---

## Ordinea de Execuție (Etape Concrete)

### Etapa 1 — Frontend Partea 1 (React + Vite, date mock locale)
*Scop: Interfață vizuală funcțională, rapidă și independentă, gata de prezentare.*

1. **Inițializare aplicație client (`frontend/`)**:
   - Proiect React 18 + Vite + TypeScript + TailwindCSS / CSS variables.
   - Configurare tokens de design: fond alb-crem `#FFFDF9`, text antracit `#1C1917`, accente vibrante de studio (roșu `#E11D48`, portocaliu `#F97316`, galben `#F59E0B`).
   - Componente UI comune stilizate (fără butoane gri default): `.btn-primary`, `.btn-secondary`, `.badge`, `.card-clean`, bare de selecție.
2. **Strat de date izolat (`frontend/src/services/`)**:
   - `mockData.ts` populat cu utilizatorii demo (`client@rentcam.ro`, `operator@rentcam.ro`, `admin@rentcam.ro`) și echipamentele din `DATA.md` (Sony FX3, Canon R5, Sony 24-70 GM II, Aputure LS 600c, RØDEcaster Pro II, Shure SM7B).
   - Servicii de mock (`equipmentService.ts`, `authService.ts`) cu interfețe TypeScript identice cu viitorul API REST.
3. **Paginile etapei 1**:
   - **Autentificare (`/login`, `/register`)**: Card curat și aerisit, formular cu validare și modul **Quick Demo Switcher** (autentificare cu 1-click pentru Client `Andrei Ionescu • Studio Nord`, Operator Ghișeu sau Administrator).
   - **Catalog Echipamente (`/`)**:
     * Hero Banner cald cu gradient mahon-auriu (`#2C1316` → `#581C1C` → `#9A3412`) și carduri plutitoare.
     * Bară unică aerisită de filtrare (flex-wrap, zero scrollbar orizontal): 5 categorii simple („Toate”, „Foto”, „Video Cinema”, „Audio & Podcast”, „Kit-uri Complete”) + dropdown compact pentru montură + comutator rapid pentru tarife (1 Zi / Weekend -25% / 7 Zile).
     * Carduri de echipament cu efecte dedicate: colțuri de încadrare Viewfinder `[ + ]` la hover pe Foto, badge REC pulsant pe Video, VU-meter animat pe Audio.
     * Mini-bară de disponibilitate pe 14 zile pe fiecare card.
   - **Detalii Echipament & Kit (`/equipment/:id`)**:
     * Galerie foto, selector interval de închiriere cu calcul automat de weekend.
     * *Kit Inspector*: componentele incluse în geanta de transport (corp, baterii, încărcător, cabluri).
     * Secțiune de compatibilitate rig recomandat (obiective și accesorii compatibile).
   - **Ghid & FAQ (`/help`)**:
     * Ghid pas cu pas pentru închiriere, explicarea ofertei Weekend (Preluare Vineri 16:00 – Retur Luni 11:00), reguli de garanție și întrebări frecvente.

---

### Etapa 2 — Baza de date MySQL (9 tabele în UTC) & Backend NestJS
*Scop: Persistență sigură, integritate tranzacțională și servicii REST robuste.*

1. **Docker Compose & Baza de date MySQL 8**:
   - Serviciu `mysql` containerizat, setat pe `utf8mb4_unicode_ci` și timezone UTC.
   - Scripturi de migrare pentru cele **9 tabele relaționale**:
     1. `users` (id, email, password_hash, full_name, phone, role [client/operator/admin], customer_type, company_data, timestamps).
     2. `equipment_models` (id, category_code, category_name, name, manufacturer, description, specs JSON, image_key, deposit_amount, is_active).
     3. `pricing_tiers` (id, equipment_model_id, hourly_rate, daily_rate, weekend_rate, weekly_rate).
     4. `physical_units` (id, equipment_model_id, serial_number, barcode, status [available/rented/maintenance/decommissioned], condition_notes).
     5. `kit_checklist_items` (id, equipment_model_id, item_name, quantity, is_mandatory, serial_or_code).
     6. `rentals` (id, reservation_code, user_id, start_date_utc, end_date_utc, pricing_tier_applied, base_amount, deposit_amount, status, operator_checkout_id, operator_checkin_id).
     7. `rental_items` (id, rental_id, physical_unit_id, status [checked_out/returned/damaged], checked_out_at_utc, returned_at_utc).
     8. `damage_reports` (id, rental_item_id, physical_unit_id, reported_by_user_id, description, severity, repair_cost, photo_keys JSON, is_resolved).
     9. `maintenance_logs` (id, physical_unit_id, triggered_by, start_time_utc, end_time_utc, notes, is_completed).
   - Seed complet cu datele din `DATA.md` și utilizatorii demo prestabiliți.
2. **Backend NestJS (`backend/`)**:
   - Arhitectură modulară: `auth` (JWT + bcrypt), `equipment`, `bookings`, `operations`, `admin`.
   - Gărzi de securitate RBAC: `@Roles('client', 'operator', 'admin')`.
   - **Motorul de disponibilitate (`AvailabilityEngine`)**:
     * Verifică suprapunerile de intervale pe unitățile fizice dintr-un model.
     * Adaugă automat un **buffer de 2 ore de mentenanță/curățare senzor** după fiecare retur (`end_date_utc + 2h`).
   - **Motorul de prețuri (`PricingEngine`)**:
     * Recunoaște automat intervalul promoțional de Weekend (Vineri după ora 16:00 → Luni până la ora 11:00) și facturează la tariful de 1.5 zile.
     * Aplică tarife optime: oră (<24h), zi (24h–6 zile), săptămână (≥7 zile).
3. **Conectarea Frontend Etapa 1 la Backend**:
   - Comutarea serviciilor din `frontend/src/services/` de la mock-uri locale la apeluri reale `axios`/`fetch` către `/api/v1`.

---

### Etapa 3 — Frontend Partea 2 (Fluxuri complete de business)
*Scop: Închiderea tuturor fluxurilor pentru client, operator și administrator.*

1. **Coșul de rezervare & Finalizare comandă (`/cart`)**:
   - Calcul live perioadă, tarif optim de weekend, garanție returnabilă totală.
   - Precompletare date titular (`Andrei Ionescu • Studio Nord`, `client@rentcam.ro`), selectare modalitate de plată/garanție și trimitere rezervare către backend.
2. **Contul Clientului (`/my-rentals`)**:
   - Listare rezervări active, rezervări viitoare și istoric comenzi trecute.
   - Descărcare voucher/confirmare de rezervare, afișare status garanție.
3. **Ghișeul Operatorului (`/operator`)**:
   - **Dashboard**: Fluxul zilei (Preluări programate vs. Returnări așteptate).
   - **Predare (`/operator/checkout/:id`)**: Scanare/verificare număr de serie unitate, bifare checklist accesorii kit (baterii, încărcător, parasolar), semnare proces-verbal predare.
   - **Retur & Retur Parțial (`/operator/checkin/:id`)**: Marcarea unităților returnate individual din comenzi multi-item; eliberarea garanției aferente pieselor sosite.
   - **Raportare Daună (`/operator/damage-report/:id`)**: Formular constatare defecțiuni/zgârieturi, introducere cost estimat și blocarea imediată a unității fizice în mentenanță.
4. **Panoul de Administrare (`/admin`)**:
   - Management modele de echipamente și unități fizice (seriale, statusuri, blocare în service).
   - Rapoarte de utilizare a flotei și venituri pe categorii.

---

### Etapa 4 — AWS S3 (la final) & Testare automată
*Scop: Stocare scalabilă în cloud și asigurarea calității.*

1. **Integrare Amazon AWS S3 (Free Tier)**:
   - Configurare bucket S3 securizat (`rentcam-media-bucket`).
   - `MediaService` în NestJS folosind `@aws-sdk/client-s3` și `@aws-sdk/s3-request-presigner`.
   - Endpoint securizat `/api/v1/media/upload-url` (generează presigned PUT URL pentru încărcare directă din browser a pozelor de model și a fotografiilor de daună).
   - Endpoint `/api/v1/media/view-url` (generează presigned GET URL temporar).
   - Fallback local (mock/stocare statică locală) dacă variabilele AWS S3 nu sunt furnizate în mediul de dezvoltare.
2. **Suite de Teste Automate**:
   - **Backend Unit & E2E (Jest)**:
     * Teste pentru `PricingEngine`: verificarea aplicării corecte a reducerii de weekend (-25%) pentru intervalul Vineri 16:00 – Luni 11:00.
     * Teste pentru `AvailabilityEngine`: respingerea rezervărilor suprapuse și validarea buffer-ului de mentenanță de 2 ore.
     * Teste pentru fluxul de predare, retur parțial și raportare daună.
   - **Frontend Unit (Vitest)**:
     * Teste de randare componente, comutator de tarife și validare formulare.

---

## Files
Structura concretă de fișiere ce va fi generată în etapele următoare:

```text
├── docker-compose.yml
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/ (jwt, roles guard, decorators)
│   │   │   ├── equipment/ (models, physical units, checklist)
│   │   │   ├── bookings/ (pricing engine, availability engine)
│   │   │   ├── operations/ (checkout, checkin, damage reports)
│   │   │   ├── media/ (aws s3 presigner service)
│   │   │   └── admin/ (inventory management, reports)
│   │   ├── database/
│   │   │   ├── migrations/ (cele 9 tabele SQL)
│   │   │   └── seed/ (date demo foto/video/audio)
│   │   └── main.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/ (ui kit, header, footer, viewfinders, vu-meter)
│   │   ├── pages/ (auth, catalog, equipment-detail, cart, help, operator, admin)
│   │   ├── services/ (api client, equipmentService, bookingService, authService)
│   │   └── styles/ (tailwind, theme variables)
│   └── package.json
└── docs/
    └── IMPLEMENTATION_PLAN.md
```

---

## Tests
- `npm --prefix backend run test` — Teste unitare pentru calculul tarifar (oră, zi, weekend, săptămână) și buffer-ul de 2 ore.
- `npm --prefix backend run test:e2e` — Teste complete pentru ciclul de viață al unei închirieri: creare rezervare → disponibilitate blocată → predare operator → retur parțial → constatare daună.
- `npm --prefix frontend run test` — Teste unitare pentru formulare, calculul prețului în coș și comutatorul de roluri demo.

---

## Design
Conform [docs/design/DESIGN.md](file:///home/balici/Work/Proiect1-Web/docs/design/DESIGN.md) și prototipurilor statice din [docs/design/mocks/](file:///home/balici/Work/Proiect1-Web/docs/design/mocks/):
- **Fundal principal**: Alb-crem cald `#FFFDF9`.
- **Carduri și suprafețe**: Alb pur `#FFFFFF` cu borduri subtile crem `#F3E8D8`.
- **Accente de culoare**: Roșu-cinema `#E11D48`, portocaliu `#F97316`, galben `#F59E0B`.
- **Hero & accente de studio**: Gradient cald profund de mahon-auriu (`#2C1316` → `#581C1C` → `#9A3412`).
- **Efecte specifice domeniului**:
  - Foto: overlay interactiv tip Camera Viewfinder `[ + ]` cu parametri f/1.4, 85mm, 1/1000s, ISO 100.
  - Video: badge pulsant `● REC 4K/120p` și margini subtile de peliculă cinema.
  - Audio: VU-Meter dinamic cu 5 bare verticale animate pe microfoane și console.

---

## Risks
1. **Diferențe de fus orar la calculul de weekend**: Orele locale de Vineri 16:00 și Luni 11:00 pot crea decalaje dacă sunt procesate incorect. *Mitigare: Baza de date stochează exclusiv UTC, iar conversia se face strict la nivel de intrare/afișare cu timezone fix Europe/Bucharest.*
2. **Dependența de conexiunea AWS S3 în dezvoltare locală**: Lucrul fără credențiale S3 active poate bloca dezvoltatorii. *Mitigare: `MediaService` include un mod fallback transparent care servește URL-uri locale statice atunci când variabilele S3 lipsesc.*
3. **Concurența la rezervarea aceleiași unități fizice**: Doi clienți care rezervă simultan același echipament. *Mitigare: Verificarea disponibilității și alocarea unităților în interiorul unei tranzacții izolate cu blocare (`SELECT ... FOR UPDATE`).*

---

## Out of scope
- Procesator real de plăți cu cardul bancar (Netopia/Stripe) – înlocuit cu simulare realistă de plată și autorizare garanție pe card.
- Emiterea automată de facturi fiscale prin integrare cu ANAF/SmartBill – datele companiei și CUI-ul sunt colectate și stocate în baza de date, dar generarea facturii se limitează la un format PDF/voucher demo.
- Aplicație mobilă nativă (iOS/Android) – interfața web este 100% responsive și optimizată pentru terminale mobile și tablete de ghișeu.
