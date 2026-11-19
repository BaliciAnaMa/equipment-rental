# CONTEXT — Glosar de Termeni & Întrebări de Clarificare (RentCam)

<!-- graffino-agentic:begin v1 -->
> Termenii aprobați pentru proiectul RentCam. Utilizați fiecare termen exact așa cum este definit, cu partea de vorbire specificată. Nu folosiți sinonime neautorizate sau termenii din secțiunea _De evitat_.
<!-- graffino-agentic:end -->

## 1. Glosar de Termeni Aprobați

**Model de Echipament** (`Equipment Model` în cod/DB) (substantiv) — Definiția abstractă din catalog a unui produs, conținând denumirea comercială, producătorul, specificațiile tehnice, galeria foto și structura tarifară.
_De evitat_: tip de articol, șablon produs, device type

**Unitate Fizică** (`Physical Unit` în cod/DB) (substantiv) — Un exemplar hardware concret, identificabil în mod unic printr-un număr de serie (`serial_number`) și cod de inventar intern (`inventory_code`).
_De evitat_: bucată fizică, dispozitiv generic, copie

**Palier Tarifar** (`Pricing Tier` în cod/DB) (substantiv) — Interval de tarifare predefinit (orar, zilnic, pachet weekend, săptămânal) utilizat de motorul de calcul pentru a determina automat cel mai avantajos cost pentru client.
_De evitat_: plan de preț, categorie tarifară

**Închiriere** (`Rental` / `Reservation` în cod/DB) (substantiv) — Tranzacția și contractul activ prin care un client reține și utilizează echipamente pentru o perioadă determinată de timp.
_De evitat_: leasing, împrumut, comandă generică

**Client** (`Customer` / `User` în cod/DB) (substantiv) — Persoana fizică sau juridică care rezervă și închiriază echipamente.
_De evitat_: cumpărător, utilizator anonim, consumator

**Predare la Ghișeu** (`Check-Out` în cod/DB) (substantiv / verb) — Procedura operațională prin care operatorul de la ghișeu verifică identitatea clientului, asociază seriile fizice, inspectează checklist-ul de accesorii și predă echipamentele.
_De evitat_: livrare, expediere, eliberare marfă

**Recepție la Returnare** (`Check-In` în cod/DB) (substantiv / verb) — Procedura operațională prin care operatorul inspectează starea echipamentelor returnate, bifează prezența tuturor accesoriilor din kit și încheie contractul sau constată eventuale daune.
_De evitat_: primire, descărcare, drop-off

**Returnare Parțială** (`Partial Return` în cod/DB) (substantiv) — Situația în care clientul returnează doar o parte din unitățile fizice dintr-o rezervare cu multiple articole, celelalte rămânând active în custodie până la termen.
_De evitat_: retur fracționat, check-in incomplet

**Checklist Kit Accesorii** (`Kit Checklist` în cod/DB) (substantiv) — Lista obligatorie de componente și accesorii asociate unei unități fizice (baterii, încărcător, cabluri, capace, geantă), inspectată riguros atât la predare, cât și la recepție.
_De evitat_: listă piese, conținut pachet, packing list

**Fereastră de Mentenanță** (`Maintenance Window` în cod/DB) (substantiv) — Intervalul tampon obligatoriu de timp alocat între două închirieri consecutive ale aceleiași unități fizice, destinat curățării senzorilor, verificării tehnice și reîncărcării acumulatorilor.
_De evitat_: pauză tehnică, timp de curățare, cooldown

**Raport de Daună** (`Damage Report` în cod/DB) (substantiv) — Înregistrarea oficială a unui incident, întocmită de operator la recepție în caz de defecte funcționale, lovituri sau zgârieturi pe echipament, însoțită obligatoriu de fotografii doveditoare.
_De evitat_: fișă de avarie, proces-verbal de penalizare

**Garanție / Depozit** (`Deposit` în cod/DB) (substantiv) — Suma de bani blocată (sau reținută) temporar pe perioada închirierii pentru a acoperi eventualele daune, întârzieri neanunțate sau pierderi de accesorii.
_De evitat_: cauțiune, gaj, amanet

---

## 2. Întrebări Deschise pentru Discuția cu Clientul (Ies din Scope-ul Imediat)

> Toate aspectele de business ce depind de decizia clientului (prețuri finale, fotografii, politici de garanție/penalizare) rămân ca întrebări deschise `Q-` și sunt amânate până la întâlnirea oficială. Până atunci, dezvoltarea folosește datele demonstrative din `DATA.md` și mock-urile aprobate.

- **Q-005** · Care este lista reală de echipamente, categorii și numărul de unități fizice din depozit?
- **Q-006** · Cine furnizează fotografiile oficiale de produs și specificațiile tehnice pentru catalog?
- **Q-007** · Care sunt grilele exacte de prețuri, tarife orare/zilnice și reducerile de weekend/săptămână?
- **Q-008** · Care este formula de calcul și politica de blocare a garanției/depozitului?
- **Q-009** · Care sunt politicile de întârziere (perioadă de grație, penalități) și condițiile de anulare?
- **Q-010** · Care este fluxul exact de constatare, evaluare și facturare a daunelor sau pieselor lipsă?

*(Pentru detalii complete, blocaje și răspunsuri propuse, consultați registrul oficial [docs/agents/OPEN-QUESTIONS.md](file:///home/balici/Work/Proiect1-Web/docs/agents/OPEN-QUESTIONS.md)).*
