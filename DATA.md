# DATA — Set de Date și Inventar Echipamente (RentCam)

> [!NOTE] Date Provizorii / Valori Placeholder pentru Prototipare
> Echipamentele, specificațiile, numerele de serie, accesoriile din kituri și tarifele prezentate în acest document reprezintă **date fictive/provizorii**, utilizate exclusiv pentru proiectarea interfeței (mock-uri UI), testarea algoritmului de calcul tarifar optimizat și validarea schemei bazei de date. Acestea **urmează să fie revizuite și înlocuite integral cu inventarul și matricea tarifară reală** în urma discuției detaliate cu clientul (vezi întrebările deschise din `CONTEXT.md`).

---

## 1. Categorii de Echipamente

| Cod Categorie | Denumire Categorie | Descriere |
|---|---|---|
| `CAT-CAM` | Camere Cinema & Video | Camere digitale profesionale Full-Frame și Super35 pentru producții cinema, publicitate și evenimente |
| `CAT-LENS` | Obiective & Anamorfice | Obiective fixe (prime), zoom-uri de înaltă rezoluție și optică dedicată cinema |
| `CAT-LIGHT` | Lumini & Modificatoare | Panouri LED bicolore/RGB, spoturi COB de mare putere și softboxuri profesionale |
| `CAT-AUDIO` | Microfoane & Înregistrare Audio | Sisteme lavalieră wireless, microfoane de tip shotgun și recordere portabile multitrack |
| `CAT-GRIP` | Gimbaluri & Grip | Stabilizatoare electronice pe 3 axe, trepiede de carbon fluide și cage-uri modulare |

---

## 2. Catalog Modele & Matrice Tarifară Provizorie (Paliere: 1 Zi, Weekend, 1 Săptămână)

*Pachetul promoțional de Weekend acoperă intervalul standard: vineri ora 16:00 – luni ora 10:00 (calculat convențional la 1.5x tariful de 24h).*

| ID Model | Denumire Model & Producător | Categorie | Tarif / 1 Zi | Tarif / Weekend | Tarif / 1 Săpt. | Garanție (Depozit) |
|---|---|---|---|---|---|---|
| `MOD-FX3` | **Sony FX3 Full-Frame Cinema Line** | `CAT-CAM` | 450 RON | 650 RON | 1.800 RON | 2.500 RON |
| `MOD-R5C` | **Canon EOS R5 C 8K Hybrid** | `CAT-CAM` | 480 RON | 700 RON | 1.950 RON | 2.500 RON |
| `MOD-BMPCC6K` | **Blackmagic Pocket Cinema Camera 6K Pro** | `CAT-CAM` | 320 RON | 480 RON | 1.300 RON | 1.800 RON |
| `MOD-GM2470` | **Sony FE 24-70mm f/2.8 GM II** | `CAT-LENS` | 180 RON | 270 RON | 720 RON | 1.200 RON |
| `MOD-GM70200` | **Sony FE 70-200mm f/2.8 GM OSS II** | `CAT-LENS` | 220 RON | 330 RON | 880 RON | 1.500 RON |
| `MOD-SIG1835` | **Sigma 18-35mm f/1.8 DC HSM Art (Canon EF)** | `CAT-LENS` | 110 RON | 165 RON | 440 RON | 600 RON |
| `MOD-AP600C` | **Aputure Light Storm 600c Pro RGBWW** | `CAT-LIGHT` | 380 RON | 560 RON | 1.520 RON | 2.000 RON |
| `MOD-FS300B` | **Nanlite Forza 300B II Bi-Color LED** | `CAT-LIGHT` | 190 RON | 280 RON | 760 RON | 1.000 RON |
| `MOD-DJIMIC2` | **DJI Mic 2 (2 TX + 1 RX + Carcasă Încărcare)** | `CAT-AUDIO` | 95 RON | 140 RON | 380 RON | 500 RON |
| `MOD-RS3PRO` | **DJI RS 3 Pro Combo Stabilizator Gimbal** | `CAT-GRIP` | 160 RON | 240 RON | 640 RON | 1.000 RON |

---

## 3. Unități Fizice Individuale (Exemple de Serii, Coduri de Bare & Kituri de Accesorii)

Fiecare unitate fizică dispune de un număr de serie atribuit la fabrică, cod intern de inventar RentCam, status operațional curent și lista accesoriilor incluse în kit (verificate la predare și recepție).

### 1. `MOD-FX3` — Sony FX3 Full-Frame Cinema Line

- **Unitatea 1**:
  - **Cod Inventar**: `RC-CAM-001`
  - **Serie Fabrică**: `SN-FX3-4819201`
  - **Stare curentă**: `Disponibil` (available)
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
  - **Kit Accesorii Standard**: Idem Unitatea 1 + Cage protecție SmallRig premontat.
- **Unitatea 3**:
  - **Cod Inventar**: `RC-CAM-003`
  - **Serie Fabrică**: `SN-FX3-5120334`
  - **Stare curentă**: `Disponibil` (available)
  - **Kit Accesorii Standard**: Idem Unitatea 1.

### 2. `MOD-R5C` — Canon EOS R5 C 8K Hybrid

- **Unitatea 1**:
  - **Cod Inventar**: `RC-CAM-004`
  - **Serie Fabrică**: `SN-R5C-2100492`
  - **Stare curentă**: `Disponibil` (available)
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
  - **Kit Accesorii Standard**: Idem Unitatea 1.

### 5. `MOD-GM70200` — Sony FE 70-200mm f/2.8 GM OSS II

- **Unitatea 1**:
  - **Cod Inventar**: `RC-LNS-003`
  - **Serie Fabrică**: `SN-GM7020-194032`
  - **Stare curentă**: `Disponibil` (available)
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
  - **Kit Accesorii Standard**:
    - [x] Obiectiv Sigma 18-35mm montură Canon EF
    - [x] Parasolar tip lalea LH780-06
    - [x] Filtru UV 72mm + capace protecție față/spate

### 7. `MOD-AP600C` — Aputure Light Storm 600c Pro RGBWW

- **Unitatea 1**:
  - **Cod Inventar**: `RC-LGT-001`
  - **Serie Fabrică**: `SN-AP600C-001924`
  - **Stare curentă**: `Disponibil` (available)
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
