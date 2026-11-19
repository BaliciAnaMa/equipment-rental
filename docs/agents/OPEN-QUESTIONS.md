# Open questions — equipment-rental

<!-- graffino-agentic:begin v1 -->
> Unknowns. Work that depends on an open question is out of scope until it is
> answered. Only the user answers; an agent never answers by guessing. An agent may
> write a `Proposed answer` the evidence supports; the question stays
> `investigating` until the user confirms it.
> Answered entries stay, with the answer and date, and usually become a D- or PATTERN-.
<!-- graffino-agentic:end -->

## Index
- Q-001 · Ce comenzi exacte de instalare, rulare și dezvoltare locală vor fi configurate?
- Q-002 · Ce framework de testare și ce comenzi de rulare a testelor vor fi configurate?
- Q-003 · Ce comenzi de build, type-check și lint vor fi configurate?
- Q-004 · Cum vor fi capturate capturile automate de ecran pentru verificarea interfeței?
- Q-005 · Care este lista reală de echipamente, categorii și numărul de unități fizice din depozit?
- Q-006 · Cine furnizează fotografiile oficiale de produs și specificațiile tehnice pentru catalog?
- Q-007 · Care sunt grilele exacte de prețuri, tarife orare/zilnice și reducerile de weekend/săptămână?
- Q-008 · Care este formula de calcul și politica de blocare a garanției/depozitului?
- Q-009 · Care sunt politicile de întârziere (perioadă de grație, penalități) și condițiile de anulare?
- Q-010 · Care este fluxul exact de constatare, evaluare și facturare a daunelor sau pieselor lipsă?
- Q-011 · Ce procesator de plăți sau gateway online va fi integrat pentru preautorizarea depozitelor?
- Q-012 · Unde vor fi stocate fizic fișierele foto atașate la rapoartele de daune?

---

## Q-001 · Ce comenzi exacte de instalare, rulare și dezvoltare locală vor fi configurate?
- **Status:** open
- **Blocks:** Scripturile de execuție și dezvoltare din AGENTS.md secțiunea 2.
- **Who answers:** Developer / Repository owner
- **Proposed answer:** Comenzi Docker Compose (`docker compose up --build`) și scripturi npm odată ce codul de aplicație este inițializat.
- **Answer:** 
- **Recorded as:** 

## Q-002 · Ce framework de testare și ce comenzi de rulare a testelor vor fi configurate?
- **Status:** open
- **Blocks:** Pasul de testare automată din Definition of Done și AGENTS.md secțiunea 2.
- **Who answers:** Developer / Repository owner
- **Proposed answer:** Vitest sau Jest pentru frontend React și Jest pentru backend NestJS.
- **Answer:** 
- **Recorded as:** 

## Q-003 · Ce comenzi de build, type-check și lint vor fi configurate?
- **Status:** open
- **Blocks:** Verificarea automată în CI și Definition of Done din AGENTS.md secțiunea 6.
- **Who answers:** Developer / Repository owner
- **Proposed answer:** Scripturi standard npm (`npm run build`, `npm run lint`) în frontend și backend.
- **Answer:** 
- **Recorded as:** 

## Q-004 · Cum vor fi capturate capturile automate de ecran pentru verificarea interfeței?
- **Status:** open
- **Blocks:** Comanda de captură automată a ecranelor din AGENTS.md secțiunea 2.
- **Who answers:** Developer / Repository owner
- **Proposed answer:** Script headless Playwright pentru capturi automate light/dark mode.
- **Answer:** 
- **Recorded as:** 

## Q-005 · Care este lista reală de echipamente, categorii și numărul de unități fizice din depozit?
- **Status:** open
- **Blocks:** Popularea catalogului real de producție și configurarea numărului de exemplare fizice din depozit.
- **Who answers:** Partner company / Client (RentCam)
- **Proposed answer:** Clientul va furniza fișierul de inventar actualizat (Excel/CSV) conținând modelele reale, numerele de serie de fabrică și accesoriile incluse în kit. Până atunci se folosește dataset-ul demonstrativ din DATA.md.
- **Answer:** 
- **Recorded as:** 

## Q-006 · Cine furnizează fotografiile oficiale de produs și specificațiile tehnice pentru catalog?
- **Status:** open
- **Blocks:** Imaginile finale de înaltă rezoluție din interfață și specificațiile tehnice detaliate.
- **Who answers:** Partner company / Client (RentCam)
- **Proposed answer:** Preluarea unui set de fotografii profesionale pe fundal neutru de la client sau folosirea provizorie a randărilor/placeholderelor SVG din mock-uri.
- **Answer:** 
- **Recorded as:** 

## Q-007 · Care sunt grilele exacte de prețuri, tarife orare/zilnice și reducerile de weekend/săptămână?
- **Status:** open
- **Blocks:** Valorile definitive introduse în tabela `pricing_tiers` și regulile precise de calcul la închirieri de lungă durată.
- **Who answers:** Partner company / Client (RentCam)
- **Proposed answer:** Grilă cu tarif de 24h ca bază, 1.5x pentru pachet Weekend și reduceri progresive de 20-30% pentru contractele săptămânale. Până la confirmare se folosesc valorile din DATA.md.
- **Answer:** 
- **Recorded as:** 

## Q-008 · Care este formula de calcul și politica de blocare a garanției/depozitului?
- **Status:** open
- **Blocks:** Modulul de calcul al depozitului la checkout și fluxul financiar (preautorizare pe card vs. reținere la ghișeu).
- **Who answers:** Partner company / Client (RentCam)
- **Proposed answer:** Garanție fixă per echipament sau procent de 10-20% din valoarea de înlocuire, blocată temporar și deblocată pro-rata la restituirea unităților fizice.
- **Answer:** 
- **Recorded as:** 

## Q-009 · Care sunt politicile de întârziere (perioadă de grație, penalități) și condițiile de anulare?
- **Status:** open
- **Blocks:** Algoritmul automat de calculare a taxelor pentru retur întârziat și restituirea plăților la anulare.
- **Who answers:** Partner company / Client (RentCam)
- **Proposed answer:** Grație de 1 oră la returnare, urmată de taxare orară suplimentară sau tarif integral de 1 zi dacă depășește 3 ore; anulare gratuită cu 48h înainte.
- **Answer:** 
- **Recorded as:** 

## Q-010 · Care este fluxul exact de constatare, evaluare și facturare a daunelor sau pieselor lipsă?
- **Status:** open
- **Blocks:** Procedura exactă din interfața operatorului pentru reținerea sumelor din garanție și decontarea reparațiilor la service-ul autorizat.
- **Who answers:** Partner company / Client (RentCam)
- **Proposed answer:** Întocmire raport cu fotografii la recepție, reținere parțială sau totală a garanției până la devizul de reparație, restul sumei fiind restituită clientului.
- **Answer:** 
- **Recorded as:** 

## Q-011 · Ce procesator de plăți sau gateway online va fi integrat pentru preautorizarea depozitelor?
- **Status:** open
- **Blocks:** Integrarea online cu furnizorii de plăți bancare (Stripe, Netopia, etc.).
- **Who answers:** Partner company / Client (RentCam)
- **Proposed answer:** Simularea reținerii garanției la ghișeu sau plata la sediu până la furnizarea credențialelor de producție.
- **Answer:** 
- **Recorded as:** 

## Q-012 · Unde vor fi stocate fizic fișierele foto atașate la rapoartele de daune?
- **Status:** open
- **Blocks:** Configurația de stocare media a backend-ului în producție.
- **Who answers:** Developer / Architect
- **Proposed answer:** Volum Docker local în mediul de dezvoltare (`/uploads`), bucket compatibil S3 (AWS / MinIO) în producție.
- **Answer:** 
- **Recorded as:** 
