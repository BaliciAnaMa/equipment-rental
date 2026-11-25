# DATA — Set de Date și Inventar Echipamente (RentCam)

> [!NOTE] Date Provizorii / Valori Informative Inspirate din Modelul Comercial F64 Rent
> Echipamentele, specificațiile tehnice, numerele de serie, kiturile de accesorii, grilele de prețuri și valorile de garanție prezentate în acest document sunt **date orientative de simulare și prototipare**, construite pe baza structurii comerciale practicate în industria foto/video (specific F64 Rent).
> Acestea sunt utilizate pentru proiectarea interfeței (mock-uri UI), testarea motorului de calcul tarifar optimizat și validarea schemei bazei de date relaționale. **Toate valorile finale vor fi confirmate și calibrate împreună cu clientul** înainte de lansarea în producție.

---

## 1. Categorii de Echipamente

| Cod Categorie | Denumire Categorie | Descriere |
|---|---|---|
| `CAT-CAM` | Camere Cinema & Video | Camere digitale profesionale Full-Frame și Super35 pentru producții cinema, publicitate, televiziune și evenimente |
| `CAT-LENS` | Obiective & Optică Cinema | Obiective fixe (prime), zoom-uri cine de înaltă rezoluție și optică anamorfică |
| `CAT-LIGHT` | Lumini & Modificatoare Studio | Panouri LED bicolore/RGBWW, spoturi COB de mare putere, softboxuri și fresnele profesionale |
| `CAT-AUDIO` | Microfoane & Înregistrare Sunet | Sisteme lavalieră wireless digitale, microfoane shotgun direcționale și recordere portabile multitrack de teren |
| `CAT-GRIP` | Gimbaluri, Trepiede & Suport | Stabilizatoare electronice pe 3 axe, trepiede profesionale din fibră de carbon cu cap fluid și cage-uri modulare |

---

## 2. Catalog Modele & Matrice Tarifară (1 Zi, Weekend, 7 Zile)

Conform modelului F64 Rent:
- **Tarif 1 Zi (24h)**: Baza de calcul pentru intervale standard de 24 ore.
- **Pachet Promoțional Weekend (Vineri 16:00 – Luni 11:00)**: Oferă clienților flexibilitate extinsă pe parcursul întregului sfârșit de săptămână la un tarif promoțional redus (calculat convențional la aprox. **1.5x tariful de 24h** în loc de 3 zile întregi). Preluarea se face vineri începând cu ora 16:00, iar predarea luni până la ora 11:00.
- **Pachet Săptămânal (7 Zile)**: Beneficiază de un discount substanțial de volum (calculat la nivelul a 4x tariful zilnic).
- **Garanție (Depozit Rambursabil)**: Sumă blocată/depusă cu titlu de garanție materială până la recepția și verificarea integrității echipamentului și a accesoriilor aferente.
- **Stocare Media**: Imaginile de prezentare ale modelelor și dovezile foto din rapoartele de daune sunt stocate în **Amazon AWS S3** (`https://rentcam-media.s3.eu-central-1.amazonaws.com/...`), baza de date stocând doar URL-ul securizat.

| ID Model | Denumire Model & Producător | Categorie | Tarif / 1 Zi | Tarif / Weekend (Vineri 16:00 - Luni 11:00) | Tarif / 7 Zile | Garanție (Depozit) | URL Imagine AWS S3 |
|---|---|---|---|---|---|---|---|
| `MOD-FX3` | **Sony FX3 Full-Frame Cinema Line** | `CAT-CAM` | 450 RON | 675 RON | 1.800 RON | 2.500 RON | `https://rentcam-media.s3.eu-central-1.amazonaws.com/models/cam-sony-fx3-main.webp` |
| `MOD-R5C` | **Canon EOS R5 C 8K Hybrid** | `CAT-CAM` | 480 RON | 720 RON | 1.920 RON | 2.500 RON | `https://rentcam-media.s3.eu-central-1.amazonaws.com/models/cam-canon-r5c-main.webp` |
| `MOD-BMPCC6K` | **Blackmagic Pocket Cinema Camera 6K Pro** | `CAT-CAM` | 320 RON | 480 RON | 1.280 RON | 1.800 RON | `https://rentcam-media.s3.eu-central-1.amazonaws.com/models/cam-bmpcc-6kpro-main.webp` |
| `MOD-GM2470` | **Sony FE 24-70mm f/2.8 GM II** | `CAT-LENS` | 180 RON | 270 RON | 720 RON | 1.200 RON | `https://rentcam-media.s3.eu-central-1.amazonaws.com/models/lens-sony-2470-gm2-main.webp` |
| `MOD-GM70200` | **Sony FE 70-200mm f/2.8 GM OSS II** | `CAT-LENS` | 220 RON | 330 RON | 880 RON | 1.500 RON | `https://rentcam-media.s3.eu-central-1.amazonaws.com/models/lens-sony-70200-gm2-main.webp` |
| `MOD-SIG1835` | **Sigma 18-35mm f/1.8 DC HSM Art (Canon EF)** | `CAT-LENS` | 110 RON | 165 RON | 440 RON | 600 RON | `https://rentcam-media.s3.eu-central-1.amazonaws.com/models/lens-sigma-1835-art-main.webp` |
| `MOD-AP600C` | **Aputure Light Storm 600c Pro RGBWW** | `CAT-LIGHT` | 380 RON | 570 RON | 1.520 RON | 2.000 RON | `https://rentcam-media.s3.eu-central-1.amazonaws.com/models/light-aputure-ls600c-main.webp` |
| `MOD-FS300B` | **Nanlite Forza 300B II Bi-Color LED** | `CAT-LIGHT` | 190 RON | 285 RON | 760 RON | 1.000 RON | `https://rentcam-media.s3.eu-central-1.amazonaws.com/models/light-nanlite-forza300b-main.webp` |
| `MOD-DJIMIC2` | **DJI Mic 2 (2 TX + 1 RX + Carcasă Încărcare)** | `CAT-AUDIO` | 95 RON | 145 RON | 380 RON | 500 RON | `https://rentcam-media.s3.eu-central-1.amazonaws.com/models/audio-dji-mic2-combo-main.webp` |
| `MOD-RS3PRO` | **DJI RS 3 Pro Combo Stabilizator Gimbal** | `CAT-GRIP` | 160 RON | 240 RON | 640 RON | 1.000 RON | `https://rentcam-media.s3.eu-central-1.amazonaws.com/models/grip-dji-rs3-pro-combo-main.webp` |

---

## 3. Unități Fizice Individuale (Exemple de Serii, Coduri de Bare & Kituri de Accesorii)

Fiecare unitate fizică dispune de un număr de serie atribuit la fabrică, cod intern de inventar RentCam, status operațional curent, lista accesoriilor incluse în kit (verificate la predare și recepție conform checklist-ului) și referințe media pe AWS S3.

### 1. `MOD-FX3` — Sony FX3 Full-Frame Cinema Line

- **Unitatea 1**:
  - **Cod Inventar**: `RC-CAM-001`
  - **Serie Fabrică**: `SN-FX3-4819201`
  - **Stare curentă**: `Disponibil` (available)
  - **Poză inspecție curentă**: `https://rentcam-media.s3.eu-central-1.amazonaws.com/units/rc-cam-001/inspection-latest.webp`
  - **Kit Accesorii Standard**:
    - [x] Corp cameră Sony FX3 cu capac de protecție senzor
    - [x] Mâner superior audio XLR demontabil (Top Handle)
    - [x] 2x Acumulatori originali Sony NP-FZ100
    - [x] Încărcător dual USB-C Sony BC-QZ1
    - [x] Cablu HDMI tip A de mare viteză
    - [x] Geantă semirigidă de protecție Manfrotto
- **Unitatea 2**:
  - **Cod Inventar**: `RC-CAM-002`
  - **Serie Fabrică**: `SN-FX3-4819288`
  - **Stare curentă**: `Închiriat` (rented - activ până la 23 Nov 2026)
  - **Poză inspecție curentă**: `https://rentcam-media.s3.eu-central-1.amazonaws.com/units/rc-cam-002/inspection-latest.webp`
  - **Kit Accesorii Standard**: Idem Unitatea 1 + Cage protecție SmallRig premontat.
- **Unitatea 3**:
  - **Cod Inventar**: `RC-CAM-003`
  - **Serie Fabrică**: `SN-FX3-5120334`
  - **Stare curentă**: `Disponibil` (available)
  - **Poză inspecție curentă**: `https://rentcam-media.s3.eu-central-1.amazonaws.com/units/rc-cam-003/inspection-latest.webp`
  - **Kit Accesorii Standard**: Idem Unitatea 1.

### 2. `MOD-R5C` — Canon EOS R5 C 8K Hybrid

- **Unitatea 1**:
  - **Cod Inventar**: `RC-CAM-004`
  - **Serie Fabrică**: `SN-R5C-2100492`
  - **Stare curentă**: `Disponibil` (available)
  - **Poză inspecție curentă**: `https://rentcam-media.s3.eu-central-1.amazonaws.com/units/rc-cam-004/inspection-latest.webp`
  - **Kit Accesorii Standard**:
    - [x] Corp cameră Canon EOS R5 C + capac montură RF
    - [x] 3x Acumulatori Canon LP-E6NH
    - [x] Adaptor montură Canon EF-EOS R cu inel de control
    - [x] Încărcător dual LC-E6E
    - [x] Curea de umăr și cablu alimentare USB-C PD

### 3. `MOD-BMPCC6K` — Blackmagic Pocket Cinema Camera 6K Pro

- **Unitatea 1**:
  - **Cod Inventar**: `RC-CAM-005`
  - **Serie Fabrică**: `SN-BM6K-7841103`
  - **Stare curentă**: `În mentenanță` (maintenance - curățare periodică senzor)
  - **Poză inspecție curentă**: `https://rentcam-media.s3.eu-central-1.amazonaws.com/units/rc-cam-005/inspection-latest.webp`
  - **Kit Accesorii Standard**:
    - [x] Corp cameră BMPCC 6K Pro + capac montură EF
    - [x] 3x Acumulatori Sony NP-F570
    - [x] Adaptor de alimentare 12V 30W cu mufă blocabilă
    - [x] Card SanDisk Extreme Pro CFast 2.0 512GB + Cititor USB-C

### 4. `MOD-GM2470` — Sony FE 24-70mm f/2.8 GM II

- **Unitatea 1**:
  - **Cod Inventar**: `RC-LNS-001`
  - **Serie Fabrică**: `SN-GM2470-302194`
  - **Stare curentă**: `Disponibil` (available)
  - **Poză inspecție curentă**: `https://rentcam-media.s3.eu-central-1.amazonaws.com/units/rc-lns-001/inspection-latest.webp`
  - **Kit Accesorii Standard**:
    - [x] Obiectiv Sony 24-70 GM II
    - [x] Parasolar original ALC-SH168
    - [x] Capac frontal 82mm + capac spate montură E
    - [x] Filtru de protecție B+W MRC Nano 82mm
    - [x] Husă textilă originală Sony
- **Unitatea 2**:
  - **Cod Inventar**: `RC-LNS-002`
  - **Serie Fabrică**: `SN-GM2470-302881`
  - **Stare curentă**: `Disponibil` (available)
  - **Poză inspecție curentă**: `https://rentcam-media.s3.eu-central-1.amazonaws.com/units/rc-lns-002/inspection-latest.webp`
  - **Kit Accesorii Standard**: Idem Unitatea 1.

### 5. `MOD-GM70200` — Sony FE 70-200mm f/2.8 GM OSS II

- **Unitatea 1**:
  - **Cod Inventar**: `RC-LNS-003`
  - **Serie Fabrică**: `SN-GM7020-194032`
  - **Stare curentă**: `Disponibil` (available)
  - **Poză inspecție curentă**: `https://rentcam-media.s3.eu-central-1.amazonaws.com/units/rc-lns-003/inspection-latest.webp`
  - **Kit Accesorii Standard**:
    - [x] Obiectiv Sony 70-200 GM II
    - [x] Colier rotativ pentru trepied (Tripod Collar)
    - [x] Parasolar original cu fereastră de reglaj filtru polarizare
    - [x] Capace de protecție față/spate
    - [x] Husă căptușită originală

### 6. `MOD-SIG1835` — Sigma 18-35mm f/1.8 DC HSM Art (Canon EF)

- **Unitatea 1**:
  - **Cod Inventar**: `RC-LNS-004`
  - **Serie Fabrică**: `SN-SG1835-502819`
  - **Stare curentă**: `Disponibil` (available)
  - **Poză inspecție curentă**: `https://rentcam-media.s3.eu-central-1.amazonaws.com/units/rc-lns-004/inspection-latest.webp`
  - **Kit Accesorii Standard**:
    - [x] Obiectiv Sigma 18-35mm montură Canon EF
    - [x] Parasolar tip lalea LH780-06
    - [x] Filtru UV 72mm + capace protecție față/spate

### 7. `MOD-AP600C` — Aputure Light Storm 600c Pro RGBWW

- **Unitatea 1**:
  - **Cod Inventar**: `RC-LGT-001`
  - **Serie Fabrică**: `SN-AP600C-001924`
  - **Stare curentă**: `Disponibil` (available)
  - **Poză inspecție curentă**: `https://rentcam-media.s3.eu-central-1.amazonaws.com/units/rc-lgt-001/inspection-latest.webp`
  - **Kit Accesorii Standard**:
    - [x] Lampă LED Aputure LS 600c Pro
    - [x] Cutie de control cu balast electronic încorporat
    - [x] Clemă rapidă de fixare pe stativ Lightning Clamp
    - [x] Cablu de conexiune cap-lampă rezistent la intemperii (7.5m)
    - [x] Cablu de alimentare rețea Neutrik powerCON TRUE1 (6m)
    - [x] Reflector hiperbolic montură Bowens
    - [x] Valiză rigidă pe roți pentru transport (Rolling Hard Case)

### 8. `MOD-FS300B` — Nanlite Forza 300B II Bi-Color LED

- **Unitatea 1**:
  - **Cod Inventar**: `RC-LGT-002`
  - **Serie Fabrică**: `SN-FZ300B-441029`
  - **Stare curentă**: `Disponibil` (available)
  - **Poză inspecție curentă**: `https://rentcam-media.s3.eu-central-1.amazonaws.com/units/rc-lgt-002/inspection-latest.webp`
  - **Kit Accesorii Standard**:
    - [x] Proiector LED Nanlite Forza 300B II
    - [x] Unitate de control cu plăcuțe V-Mount
    - [x] Reflector standard montură Bowens 55°
    - [x] Clemă mecanică de prindere pe stativ
    - [x] Cablu conexiune cap lampă (3m) + cablu rețea (4.5m)
    - [x] Geantă textilă compartimentată

### 9. `MOD-DJIMIC2` — DJI Mic 2 (2 TX + 1 RX + Carcasă Încărcare)

- **Unitatea 1**:
  - **Cod Inventar**: `RC-AUD-001`
  - **Serie Fabrică**: `SN-DJIM2-881920`
  - **Stare curentă**: `Disponibil` (available)
  - **Poză inspecție curentă**: `https://rentcam-media.s3.eu-central-1.amazonaws.com/units/rc-aud-001/inspection-latest.webp`
  - **Kit Accesorii Standard**:
    - [x] Carcasă inteligentă de încărcare și împerechere DJI Mic 2
    - [x] 1x Receptor (RX) cu ecran tactil OLED
    - [x] 2x Transmițătoare (TX) cu înregistrare internă pe 32 biți flotanți
    - [x] 2x Protecții antivânt din blană sintetică (Deadcat)
    - [x] 2x Cleme magnetice de fixare pe îmbrăcăminte
    - [x] Adaptor Lightning + Adaptor USB-C pentru telefoane mobile
    - [x] Cablu audio spiralat TRS 3.5mm pentru cameră
    - [x] Husă textilă de transport cu fermoar

### 10. `MOD-RS3PRO` — DJI RS 3 Pro Combo Stabilizator Gimbal

- **Unitatea 1**:
  - **Cod Inventar**: `RC-GRP-001`
  - **Serie Fabrică**: `SN-RS3P-990142`
  - **Stare curentă**: `Disponibil` (available)
  - **Poză inspecție curentă**: `https://rentcam-media.s3.eu-central-1.amazonaws.com/units/rc-grp-001/inspection-latest.webp`
  - **Kit Accesorii Standard**:
    - [x] Corp gimbal DJI RS 3 Pro cu brațe din fibră de carbon
    - [x] Mâner cu acumulator încorporat BG30 (autonomie până la 12 ore)
    - [x] Plăcuță cu eliberare rapidă compatibilă Arca-Swiss / Manfrotto
    - [x] Mini-trepied pliabil / mâner prelungitor
    - [x] Mâner pentru unghiuri joase tip servietă (Briefcase Handle)
    - [x] Motor extern de focalizare Focus Motor (2022) + tijă 12mm
    - [x] Curea dințată flexibilă pentru inelul de focalizare al obiectivului
    - [x] Transmițător video wireless Ronin RavenEye
    - [x] Set cabluri de control cameră (USB-C) și cutie de transport rigidă

---

## 4. Exemple de Dovezi Foto Rapoarte Daune (Stocare S3)

În caz de incidente sau deteriorări constatate la recepție (conform D-005 și D-006), operatorul încarcă dovezi foto directe în bucket-ul securizat AWS S3:
- Exemplu raport daună zgârietură element frontal obiectiv:
  `https://rentcam-media.s3.eu-central-1.amazonaws.com/damage-reports/dmg-202611-001/evidence-front-element-scratch.webp`
- Exemplu raport daună filet stativ lampă deformat:
  `https://rentcam-media.s3.eu-central-1.amazonaws.com/damage-reports/dmg-202611-002/evidence-clamp-mount-damage.webp`
