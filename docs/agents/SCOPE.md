# Scope — Proiect P04: Închirieri de echipamente cu unități fizice

<!-- graffino-agentic:begin v1 -->
> Documentul de definire a anvergurii proiectului (Scope). Stabilește cerințele funcționale,
> fluxurile operaționale, rolurile de acces și delimitarea dintre ce este inclus și ce este exclus.
<!-- graffino-agentic:end -->

## 1. Prezentare generală
- **Denumire provizorie:** RentCam (vezi Q-005).
- **Domeniu de activitate:** Închiriere echipamente profesionale foto, video și audio (camere cinema/mirrorless, obiective, lumini de studio, microfoane, recordere și accesorii).
- **Arhitectură tehnică:** React (Frontend SPA), NestJS (Backend REST API), MySQL (Bază de date relațională), Docker & Docker Compose (vezi D-001).
- **Nucleu funcțional:** Urmărire riguroasă per unitate fizică individuală (serie, kit accesorii, istoric stări), tarifare optimă pe paliere oră/zi/weekend/săptămână, ferestre automate de mentenanță și inspecție la retur cu rapoarte de daună foto.

---

## 2. În Scope (Funcționalități confirmate)

### 2.1 Modelul de inventar pe două niveluri (Two-Tier Inventory) — D-002
1. **Model de echipament (Equipment Model):**
   - Date generale: denumire, categorie (Foto, Video, Obiective, Audio, Lumini), brand, specificații tehnice, imagini reprezentative.
   - Grilă tarifară pe paliere (oră, zi, weekend, săptămână).
   - Valoare de înlocuire și garanție de bază recomandată.
2. **Unitate fizică individuală (Physical Unit):**
   - Identificator unic: Număr de serie producător (Serial Number) și cod intern de inventar / barcode.
   - Stare operațională curentă: `disponibil`, `rezervat`, `închiriat`, `în mentenanță`, `deteriorat/scos din uz`.
   - Listă de verificare accesorii kit (baterii, alimentator/încărcător, cabluri, monturi, geantă de transport, capace protecție).
   - Istoric unitate: jurnal de închirieri, mentenanțe și rapoarte de avarie.

### 2.2 Motorul de tarifare și disponibilitate — D-003
1. **Paliere tarifare suportate:**
   - **Tarif orar:** pentru producții scurte sau depășiri parțiale.
   - **Tarif zilnic (24h):** unitatea de bază de calcul.
   - **Tarif weekend:** pachet promoțional standard în industria foto/video (ridicare vineri după-amiază, retur luni dimineață, facturat optim).
   - **Tarif săptămânal (7 zile):** discount de volum pentru producții lungi.
2. **Calcul optim automat:** sistemul calculează automat cea mai mică sumă tarifară aplicabilă pentru intervalul de timp selectat de client.
3. **Disponibilitate în timp real:** calendar interactiv care verifică disponibilitatea unităților fizice din modelul solicitat, respectând ferestrele de mentenanță (Q-010).

### 2.3 Garanții, penalizări și ferestre de mentenanță
1. **Garanție (Deposit):** calculată per rezervare/echipament; blocată sau încasată la predare și restituită după recepția calitativă la retur (Q-007).
2. **Taxe de întârziere (Late fees):** aplicate automat dacă returnarea depășește intervalul contractual agreat și marja de grație (Q-008).
3. **Fereastră de mentenanță (Turnover buffer):** blocare automată a unității returnate pentru o durată prestabilită (ex. 2 ore) înainte de a deveni din nou disponibilă pentru următorul client (curățare senzor/lentile, verificare kit, încărcare acumulatori) (vezi Q-010).

### 2.4 Operațiuni ghișeu/depozit (Check-out & Check-in) — D-005
1. **Check-out (Predare):**
   - Identificarea rezervării confirmate.
   - Alocarea unităților fizice specifice prin scanare/selectare serie.
   - Semnarea fișei de predare și validarea accesoriilor din kit.
2. **Check-in (Returnare):**
   - Bifarea fiecărui accesoriu din kitul unității returnate.
   - **Returnări parțiale:** posibilitatea clientului de a returna mai devreme doar o parte din echipamentele unei rezervări complexe; unitățile returnate reintră în fluxul de mentenanță/disponibilitate, iar celelalte rămân active până la scadență.
3. **Raport de daună cu poze (Damage Report):**
   - Înregistrare la retur în caz de lovituri, componente lipsă sau defecte tehnice.
   - Încărcare de fotografii doveditoare direct de către operator.
   - Reținerea parțială sau totală a garanției în baza gravității avariilor.

---

## 3. Roluri și permisiuni — D-004

| Rol | Responsabilități cheie | Acces ecrane |
|---|---|---|
| **Client** | Căutare/filtrare catalog, verificare disponibilitate pe interval, calculator preț și garanție, plasare rezervare online, istoric rezervări proprii. | Catalog public, Detaliu echipament, Coș/Rezervare, Cont client / Istoric comenzi |
| **Operator** | Preluare clienți la ghișeu, alocare serii și predare echipamente (check-out), recepție retur (check-in) cu bifare accesorii, procesare returnări parțiale, raportare daune cu fotografii, trimitere unități în mentenanță. | Dashboard zilnic predări/returnări, Ecran Check-out, Ecran Check-in (cu retur parțial), Formular Raport Daună, Tablou Mentenanță |
| **Admin** | Gestionare nomenclator modele și categorii, management unități fizice (adăugare serii noi, casare), configurare grile tarife și garanții, gestionare utilizatori și roluri, rapoarte financiare și de utilizare flotă. | Panou Administrare: CRUD Modele, CRUD Unități fizice, Setări Tarife & Garanții, Gestiune Utilizatori, Rapoarte & Statistici |

---

## 4. Ecrane ale aplicației (UI Registry)

### 4.1 Modul Client (Public & Autentificat)
- `DS-rent-catalog`: Catalog echipamente cu filtre (categorii, brand, interval date disponibilitate).
- `DS-rent-equipment-detail`: Pagină produs cu galerie foto, specificații, accesorii incluse și calculator dinamic de preț/garanție.
- `DS-rent-booking-cart`: Rezervare și sumar comandă (perioadă, calcul optim palier, total garanție).
- `DS-rent-customer-dashboard`: Contul clientului cu lista rezervărilor active, istorice și stadiul acestora.

### 4.2 Modul Operator (Depozit / Ghișeu)
- `DS-rent-op-dashboard`: Tablou de bord cu predările și returnările programate pentru ziua curentă.
- `DS-rent-op-checkout`: Ecran de predare comandă cu scanare serie unitate fizică și checklist accesorii.
- `DS-rent-op-checkin`: Ecran de recepție retur cu suport pentru returnări parțiale și verificare integritate.
- `DS-rent-op-damage-report`: Formular dedicat pentru constatare daune cu încărcare fotografii și reținere garanție.
- `DS-rent-op-maintenance`: Listă a unităților aflate în verificări/curățare și deblocare în starea disponibilă.

### 4.3 Modul Administrator
- `DS-rent-admin-models`: Gestiunea catalogului de modele de echipamente și a prețurilor pe paliere.
- `DS-rent-admin-units`: Gestiunea unităților fizice (adăugare serii, alocare accesorii kit, statusuri).
- `DS-rent-admin-reports`: Rapoarte de utilizare a flotei, statistici financiare și istoric daune.

---

## 5. Out of Scope (Exclus din faza inițială)
- Procesare plăți bancare 3D-Secure cu pre-autorizare pe card online (până la stabilirea procesatorului; vezi Q-011).
- Integrare cu softuri externe de contabilitate / e-Factura.
- Livrare prin curierat (operațiunile sunt gândite pentru ridicare/returnare directă la sediu).
- Închirieri peer-to-peer de la persoane fizice terțe.

---

## 6. Referințe ledger
- Decizii: [DECISIONS.md](DECISIONS.md) (`D-001`, `D-002`, `D-003`, `D-004`, `D-005`).
- Contracte: [CONTRACTS.md](CONTRACTS.md) (`C-001`).
- Întrebări deschise: [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md) (`Q-001` – `Q-012`).
