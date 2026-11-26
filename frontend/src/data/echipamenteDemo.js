// frontend/src/data/echipamenteDemo.js — Echipamente demonstrative pentru Catalogul RentCam

export const ECHIPAMENTE_DEMO = [
  {
    id: 'eq_fx3',
    nume: 'Sony FX3 Cinema Line',
    categorie: 'Video Cinema',
    montura: 'Sony E',
    disponibile: 3,
    pretZi: 350,
    pretWeekend: 525, // 1.5x preț zi
    pretSaptamana: 1400, // 4x preț zi
    garantie: 2500,
    descriereScurta: 'Cameră full-frame 4K 120p, 16-bit RAW HDMI, stabilizare pe 5 axe și mâner audio XLR inclus.',
    descriereLunga: 'Sony FX3 combină cele mai bune capabilități ale seriei Cinema Line cu portabilitatea extremă. Senzorul full-frame Exmor R de 12.1 MP asigură performanțe impresionante în condiții de lumină scăzută (ISO până la 409.600) și o dinamică de peste 15 trepte. Mânerul superior detașabil oferă două intrări XLR profesionale pentru sunet fără compromis.',
    specificatii: [
      { eticheta: 'Senzor', valoare: 'Full-frame 35mm Exmor R CMOS 12.1 MP' },
      { eticheta: 'Înregistrare video', valoare: '4K UHD până la 120 fps / FHD până la 240 fps' },
      { eticheta: 'Profiluri de culoare', valoare: 'S-Cinetone, S-Log3, HLG' },
      { eticheta: 'Ieșire RAW', valoare: '16-bit RAW pe HDMI către recorder Atomos' },
      { eticheta: 'Stabilizare', valoare: 'În corp pe 5 axe + Mod Activ' },
      { eticheta: 'Autofocus', valoare: 'Fast Hybrid AF cu Real-time Eye AF și Touch Tracking' }
    ],
    accesoriiIncluse: [
      'Corp cameră Sony FX3 cu capac senzor',
      'Mâner superior audio detașabil cu 2 intrări XLR/jack',
      '3x Acumulatori originali Sony NP-FZ100',
      'Încărcător dublu rapid cu cablu alimentare',
      'Card memorie Sony Tough V90 128GB',
      'Geantă de transport profesională căptușită'
    ]
  },
  {
    id: 'eq_r5c',
    nume: 'Canon EOS R5 C Cinema',
    categorie: 'Video Cinema',
    montura: 'Canon RF',
    disponibile: 2,
    pretZi: 380,
    pretWeekend: 570,
    pretSaptamana: 1520,
    garantie: 2800,
    descriereScurta: 'Hibrid cinema 8K 60p RAW intern, senzor 45MP full-frame, răcire activă integrată pentru filmări non-stop.',
    descriereLunga: 'Canon EOS R5 C este un hibrid revoluționar dotat cu un sistem de operare dublu: cameră Cinema EOS profesională la filmare și aparat foto de 45 MP de mare viteză. Ventilatorul de răcire intern activ permite înregistrarea video continuă 8K/60p în Cinema RAW Light pe 12 biți.',
    specificatii: [
      { eticheta: 'Senzor', valoare: 'Full-frame CMOS 45 MP (8192 x 5464)' },
      { eticheta: 'Rezoluție video', valoare: '8K la 60p RAW intern / 4K 120p' },
      { eticheta: 'Răcire', valoare: 'Ventilator activ intern (fără limită termică)' },
      { eticheta: 'Montură', valoare: 'Canon RF nativă (adaptabilă EF)' },
      { eticheta: 'Carduri', valoare: '1x CFexpress Type B + 1x SD UHS-II' },
      { eticheta: 'Autofocus', valoare: 'Dual Pixel CMOS AF II cu urmărire ochi/cap' }
    ],
    accesoriiIncluse: [
      'Corp cameră Canon EOS R5 C',
      '3x Acumulatori de mare capacitate Canon LP-E6NH',
      'Încărcător de birou original Canon',
      'Adaptor montură Canon EF-EOS R cu inel de control',
      'Card CFexpress Type B 256GB + Cititor USB-C',
      'Geantă transport rigidă impermeabilă'
    ]
  },
  {
    id: 'eq_sony_2470',
    nume: 'Sony FE 24-70mm f/2.8 GM II',
    categorie: 'Foto',
    montura: 'Sony E',
    disponibile: 4,
    pretZi: 150,
    pretWeekend: 225,
    pretSaptamana: 600,
    garantie: 1200,
    descriereScurta: 'Cel mai compact și performant zoom standard f/2.8 din seria G Master, autofocus ultra-rapid.',
    descriereLunga: 'A doua generație a legendarului 24-70mm f/2.8 este cu 22% mai ușoară și oferă o rezoluție optică excepțională de la colț la colț. Dotat cu patru motoare liniare XD, asigură un autofocus silențios și de o precizie chirurgicală atât la foto cât și la producții video.',
    specificatii: [
      { eticheta: 'Distanță focală', valoare: '24-70mm (zoom standard full-frame)' },
      { eticheta: 'Diafragmă', valoare: 'f/2.8 constantă pe toată plaja, 11 lame rotunjite' },
      { eticheta: 'Construcție optică', valoare: '20 elemente în 15 grupuri (2 XA, 3 asferice)' },
      { eticheta: 'Diametru filtru', valoare: '82 mm' },
      { eticheta: 'Greutate', valoare: '695 grame' },
      { eticheta: 'Comenzi pe corp', valoare: 'Inel de diafragmă cu click comutabil + comutator iris lock' }
    ],
    accesoriiIncluse: [
      'Obiectiv Sony FE 24-70mm f/2.8 GM II',
      'Parasolar original Sony cu fereastră de filtru polarizor',
      'Filtru protecție UV profesional B+W XS-Pro 82mm',
      'Capace originale față și spate',
      'Husă textilă de protecție căptușită'
    ]
  },
  {
    id: 'eq_canon_50',
    nume: 'Canon RF 50mm f/1.2L USM',
    categorie: 'Foto',
    montura: 'Canon RF',
    disponibile: 2,
    pretZi: 170,
    pretWeekend: 255,
    pretSaptamana: 680,
    garantie: 1400,
    descriereScurta: 'Obiectiv fix de referință cu diafragmă ultra-luminoasă f/1.2, bokeh cremos și claritate extremă de la margini.',
    descriereLunga: 'Canon RF 50mm f/1.2L stabilește noi standarde de performanță optică. Diafragma f/1.2 permite izolarea subiectului cu o separare dramatică a fundalului și performanță uimitoare în lumină scăzută fără zgomot de imagine.',
    specificatii: [
      { eticheta: 'Distanță focală', valoare: '50mm standard' },
      { eticheta: 'Diafragmă', valoare: 'f/1.2 până la f/16, 10 lame rotunjite' },
      { eticheta: 'Motor autofocus', valoare: 'Ring USM ultrasonic rapid și silențios' },
      { eticheta: 'Diametru filtru', valoare: '95 mm' },
      { eticheta: 'Construcție', valoare: 'Serie L cu etanșare completă la intemperii' },
      { eticheta: 'Inel de control', valoare: 'Personalizabil pentru diafragmă, ISO sau timp expunere' }
    ],
    accesoriiIncluse: [
      'Obiectiv Canon RF 50mm f/1.2L USM',
      'Parasolar dedicat Canon ES-83',
      'Filtru UV de înaltă rezoluție 95mm',
      'Capace față și spate Canon originale',
      'Husă din piele ecologică căptușită'
    ]
  },
  {
    id: 'eq_aputure_300d',
    nume: 'Aputure Light Storm LS 300d II',
    categorie: 'Video Cinema',
    montura: 'Universal',
    disponibile: 3,
    pretZi: 180,
    pretWeekend: 270,
    pretSaptamana: 720,
    garantie: 1100,
    descriereScurta: 'Proiector LED Daylight 5500K de 300W, montură Bowens, control prin telecomandă și aplicație Sidus Link.',
    descriereLunga: 'Aputure LS 300d II oferă o putere luminoasă impresionantă echivalentă unui reflector tungsten de 2000W, consumând doar 350W. Cu o redare impecabilă a culorilor (CRI 96+, TLCI 97+), este pilonul oricărui set de interviu sau producție de studio.',
    specificatii: [
      { eticheta: 'Temperatură de culoare', valoare: '5500K Daylight pur' },
      { eticheta: 'Acuratețe culori', valoare: 'CRI 96+, TLCI 97+, CQS 95' },
      { eticheta: 'Putere', valoare: '300W LED continuu (până la 80.000 lux la 1m cu Fresnel)' },
      { eticheta: 'Montură accesorii', valoare: 'Bowens standard (compatibil softbox, fresnel, snoot)' },
      { eticheta: 'Control', valoare: 'Unitate de control integrată, Telecomandă 2.4G, Sidus Link Bluetooth' },
      { eticheta: 'Alimentare', valoare: 'Priză 220V sau 2x acumulatori V-Mount' }
    ],
    accesoriiIncluse: [
      'Corp proiector LED Aputure 300d II',
      'Cutie de control All-in-One cu placă prindere stativ',
      'Reflector hiperbolic standard 55°',
      'Cablu de alimentare Neutrik 6m + cablu conexiune cap 3m',
      'Telecomandă wireless cu baterie inclusă',
      'Geantă căptușită rigidă pentru transport'
    ]
  },
  {
    id: 'eq_rodecaster',
    nume: 'RØDEcaster Pro II Production Studio',
    categorie: 'Audio & Podcast',
    montura: 'Universal',
    disponibile: 2,
    pretZi: 160,
    pretWeekend: 240,
    pretSaptamana: 640,
    garantie: 1000,
    descriereScurta: 'Consolă audio dedicată cu 4 intrări combo XLR/jack, preamplificatoare Revolution și pad-uri SMART programabile.',
    descriereLunga: 'RØDEcaster Pro II este soluția audio completă pentru podcasteri, muzicieni și streameri. Integrează 4 preamplificatoare Revolution cu zgomot redus de clasă mondială, procesare de studio APHEX integrată și interfață audio USB dublă.',
    specificatii: [
      { eticheta: 'Canale intrare', valoare: '4x Neutrik combo (microfon XLR sau linie jack 6.3mm)' },
      { eticheta: 'Preamplificatoare', valoare: 'Revolution Preamps cu gain de 76dB și -131.5dBV EIN' },
      { eticheta: 'Ieșiri căști', valoare: '4 ieșiri independente de monitorizare cu reglaj separat' },
      { eticheta: 'Procesare sunet', valoare: 'APHEX (Aural Exciter, Big Bottom, Compellor)' },
      { eticheta: 'Interfață USB', valoare: 'Dual audio interface (conectează 2 PC-uri simultan)' },
      { eticheta: 'Pad-uri SMART', valoare: '8 pad-uri cu bănci de memorie pentru sunete și efecte vocale' }
    ],
    accesoriiIncluse: [
      'Consolă audio RØDEcaster Pro II',
      'Alimentator original USB-C Power Delivery 30W',
      'Cablu profesional USB-C la USB-C ecranat 2m',
      'Card microSD SanDisk Extreme Pro 64GB',
      'Husă rigidă de transport cu spumă decupată'
    ]
  },
  {
    id: 'eq_shure_sm7b',
    nume: 'Shure SM7B Vocal Microphone',
    categorie: 'Audio & Podcast',
    montura: 'Universal',
    disponibile: 5,
    pretZi: 70,
    pretWeekend: 105,
    pretSaptamana: 280,
    garantie: 500,
    descriereScurta: 'Microfon dinamic legendar pentru podcast și voiceover, cu protecție electromagnetică și filtru pop integrat.',
    descriereLunga: 'Shure SM7B este cel mai popular microfon de voce din lume pentru transmisiuni radio, podcasturi și producție muzicală. Răspunsul în frecvență larg și neted păstrează căldura naturală a vocii, iar capsula dinamică cardioidă respinge eficient zgomotul din cameră.',
    specificatii: [
      { eticheta: 'Tip capsulă', valoare: 'Dinamică cardioidă cu amortizare internă' },
      { eticheta: 'Răspuns în frecvență', valoare: '50 Hz – 20.000 Hz' },
      { eticheta: 'Sensibilitate', valoare: '-59.0 dB (1.12 mV)' },
      { eticheta: 'Filtre integrate', valoare: 'Bass Rolloff și Mid-range Boost (Presence Boost)' },
      { eticheta: 'Ecranare electromagnetică', valoare: 'Optimizată împotriva interferențelor de la monitoare' },
      { eticheta: 'Conector', valoare: 'XLR profesional cu 3 pini tată' }
    ],
    accesoriiIncluse: [
      'Microfon dinamic Shure SM7B',
      'Burete standard de protecție la vânt',
      'Burete gros Shure A7WS pentru vorbire apropiată',
      'Adaptor filet stativ 5/8" la 3/8"',
      'Cablu profesional de microfon XLR 3m Mogami',
      'Husă originală Shure din piele ecologică'
    ]
  },
  {
    id: 'eq_dji_mic2',
    nume: 'DJI Mic 2 Wireless Dual Kit (2TX + 1RX)',
    categorie: 'Audio & Podcast',
    montura: 'Universal',
    disponibile: 4,
    pretZi: 110,
    pretWeekend: 165,
    pretSaptamana: 440,
    garantie: 800,
    descriereScurta: 'Sistem wireless portabil cu înregistrare internă 32-bit float, anulare activă a zgomotului și rază 250m.',
    descriereLunga: 'DJI Mic 2 este soluția ideală pentru vloggeri, jurnaliști și echipe restrânse de filmare. Transmițătoarele înregistrează intern în 32-bit float pentru a preveni orice distorsiune sau clipping de volum, iar carcasa metalică inteligentă asigură o autonomie totală de 18 ore.',
    specificatii: [
      { eticheta: 'Înregistrare internă', valoare: '32-bit Float pe 8GB memorie internă (până la 14 ore)' },
      { eticheta: 'Rază de acțiune', valoare: 'Până la 250 metri în linie dreaptă' },
      { eticheta: 'Reducere zgomot', valoare: 'Inteligentă cu AI Noise Cancelling' },
      { eticheta: 'Autonomie', valoare: '6 ore per transmițător / 18 ore cu carcasa de încărcare' },
      { eticheta: 'Compatibilitate', valoare: 'Camere foto/video (jack 3.5mm), smartphone (USB-C & Lightning)' },
      { eticheta: 'Conectare directă', valoare: 'Bluetooth direct cu telefoane sau camere compatibile' }
    ],
    accesoriiIncluse: [
      '2x Transmițătoare audio DJI Mic 2 cu microfon integrat',
      '1x Receptor cu display tactil OLED și rotiță navigare',
      'Carcasă metalică de încărcare și transport',
      'Adaptor montură patină rece pentru cameră',
      'Adaptoare telefon mobil: 1x USB-C și 1x Lightning',
      '2x Clipsuri magnetice de prindere pe haine',
      '2x Protecții tip deadcat pentru filmări exterioare',
      'Cablu spiralat TRS 3.5mm pentru conexiune la cameră'
    ]
  },
  {
    id: 'eq_kit_cinema',
    nume: 'Kit Cinema Solo Operator (Sony FX3 + 24-70mm GM II)',
    categorie: 'Kit-uri',
    montura: 'Sony E',
    disponibile: 2,
    pretZi: 460,
    pretWeekend: 690,
    pretSaptamana: 1840,
    garantie: 3500,
    descriereScurta: 'Pachet gata de filmare: corp Sony FX3 cu mâner XLR + zoom Sony 24-70mm GM II + 4 baterii + card V90 128GB.',
    descriereLunga: 'Kit conceput special pentru operatorii solo care au nevoie de cel mai versatil setup de imagine și sunet. Combină camera video de cinema Sony FX3 cu cel mai clar zoom standard Sony 24-70 GM II, asigurând autonomie completă pentru o zi lungă de filmare.',
    specificatii: [
      { eticheta: 'Cameră inclusă', valoare: 'Sony FX3 Cinema Line Full-Frame 4K 120p' },
      { eticheta: 'Obiectiv inclus', valoare: 'Sony FE 24-70mm f/2.8 GM II' },
      { eticheta: 'Înregistrare audio', valoare: 'Mâner superior detașabil cu 2 intrări XLR profesionale' },
      { eticheta: 'Stocare', valoare: '1x Card Sony Tough V90 128GB (300 MB/s)' },
      { eticheta: 'Autonomie', valoare: '4 acumulatori Sony NP-FZ100 + încărcător dublu simultan' }
    ],
    accesoriiIncluse: [
      'Cameră Sony FX3 cu mâner audio XLR montat',
      'Obiectiv Sony FE 24-70mm f/2.8 GM II cu filtru protecție UV',
      '4x Acumulatori Sony NP-FZ100',
      'Încărcător dublu rapid de birou',
      'Card SD Sony Tough V90 128GB + cititor USB-C',
      'Geantă troler profesională Nanuk cu spumă decupată la comandă'
    ]
  },
  {
    id: 'eq_kit_podcast',
    nume: 'Kit Podcast Complet 2 Persoane (RØDEcaster + 2x Shure SM7B)',
    categorie: 'Kit-uri',
    montura: 'Universal',
    disponibile: 2,
    pretZi: 280,
    pretWeekend: 420,
    pretSaptamana: 1120,
    garantie: 1800,
    descriereScurta: 'Tot ce ai nevoie pentru înregistrare la calitate radio: consolă RØDEcaster Pro II, 2 microfoane Shure SM7B și 2 căști.',
    descriereLunga: 'Setup-ul suprem pentru interviuri și podcasturi în 2 persoane. Oferă calitatea incontestabilă a microfoanelor Shure SM7B susținute de puterea de procesare automată și preamplificatoarele ultra-clare ale consolei RØDEcaster Pro II.',
    specificatii: [
      { eticheta: 'Mixer audio', valoare: 'RØDEcaster Pro II cu înregistrare multitrack' },
      { eticheta: 'Microfoane', valoare: '2x Shure SM7B dinamice cardioide' },
      { eticheta: 'Suport microfoane', valoare: '2x Brațe reglabile de birou RØDE PSA1 cu prindere menghină' },
      { eticheta: 'Monitorizare', valoare: '2x Căști profesionale de studio Audio-Technica ATH-M50x' },
      { eticheta: 'Cablare', valoare: '2x Cabluri XLR premium ecranate 3m' }
    ],
    accesoriiIncluse: [
      'Consolă audio RØDEcaster Pro II cu alimentator USB-C',
      '2x Microfoane dinamice Shure SM7B cu bureți antivânt',
      '2x Brațe de birou articulate RØDE PSA1',
      '2x Căști monitor Audio-Technica ATH-M50x',
      '2x Cabluri de microfon XLR 3m ecranate',
      'Card memorie microSD 64GB inclus',
      'Geantă mare de transport compartimentată pentru întregul set'
    ]
  }
]
