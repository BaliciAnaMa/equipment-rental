-- backend/db/02_seed.sql
-- Date demonstrative pentru RentCam (utilizatori, catalog echipamente și rezervări demo)

SET NAMES utf8mb4;

-- 1. Utilizatori demo (parole demo bcrypt corespunzătoare 'parola123' sau hash placeholder standard)
-- client: Andrei Ionescu (Studio Nord)
-- operator: Operator Ghiseu (RentCam Dispatch)
-- admin: Admin Sistem (RentCam Admin)
INSERT INTO `utilizatori` (`id`, `nume_complet`, `nume_companie`, `email`, `telefon`, `parola_hash`, `rol`, `creat_la`) VALUES
(1, 'Andrei Ionescu', 'Studio Nord', 'client@rentcam.ro', '+40 722 000 111', '$2b$10$wE/qM2Oiq383jGskN4W.3ONmNnUu7wLgL7F1hO97g2gK1pA4XyP4S', 'client', NOW()),
(2, 'Operator Ghiseu', 'RentCam SRL', 'operator@rentcam.ro', '+40 722 000 222', '$2b$10$wE/qM2Oiq383jGskN4W.3ONmNnUu7wLgL7F1hO97g2gK1pA4XyP4S', 'operator', NOW()),
(3, 'Admin Sistem', 'RentCam SRL', 'admin@rentcam.ro', '+40 722 000 333', '$2b$10$wE/qM2Oiq383jGskN4W.3ONmNnUu7wLgL7F1hO97g2gK1pA4XyP4S', 'admin', NOW());

-- 2. Catalog echipamente foto/video/audio (preluat din frontend/src/data/echipamenteDemo.js)
INSERT INTO `echipamente` (`id`, `cod_echipament`, `nume`, `categorie`, `marca`, `descriere`, `imagine_url`, `pret_1_zi`, `pret_weekend`, `pret_7_zile`, `garantie`, `stoc_total`, `stoc_disponibil`, `status`) VALUES
(1, 'eq_fx3', 'Sony FX3 Cinema Line', 'Video Cinema', 'Sony', 'Camera full-frame 4K 120p, 16-bit RAW HDMI, stabilizare pe 5 axe si maner audio XLR inclus.', '/imagini/echipamente/sony-fx3.jpg', 350.00, 525.00, 1400.00, 2500.00, 3, 3, 'disponibil'),
(2, 'eq_r5c', 'Canon EOS R5 C Cinema', 'Video Cinema', 'Canon', 'Hibrid cinema 8K 60p RAW intern, senzor 45MP full-frame, racire activa integrata pentru filmari non-stop.', '/imagini/echipamente/canon-r5c.jpg', 380.00, 570.00, 1520.00, 2800.00, 2, 2, 'disponibil'),
(3, 'eq_sony_2470', 'Sony FE 24-70mm f/2.8 GM II', 'Foto', 'Sony', 'Cel mai compact si performant zoom standard f/2.8 din seria G Master, autofocus ultra-rapid.', '/imagini/echipamente/sony-24-70.jpg', 150.00, 225.00, 600.00, 1200.00, 4, 4, 'disponibil'),
(4, 'eq_canon_50', 'Canon RF 50mm f/1.2L USM', 'Foto', 'Canon', 'Obiectiv fix de referinta cu diafragma ultra-luminoasa f/1.2, bokeh cremos si claritate extrema.', '/imagini/echipamente/canon-50.jpg', 170.00, 255.00, 680.00, 1400.00, 2, 2, 'disponibil'),
(5, 'eq_aputure_300d', 'Aputure Light Storm LS 300d II', 'Video Cinema', 'Aputure', 'Proiector LED Daylight 5500K de 300W, montura Bowens, control prin telecomanda si aplicatie Sidus Link.', '/imagini/echipamente/aputure-300d.jpg', 180.00, 270.00, 720.00, 1100.00, 3, 3, 'disponibil'),
(6, 'eq_rodecaster', 'RODEcaster Pro II Production Studio', 'Audio & Podcast', 'RODE', 'Consola audio dedicata cu 4 intrari combo XLR/jack, preamplificatoare Revolution si pad-uri SMART programabile.', '/imagini/echipamente/rodecaster-pro-2.jpg', 160.00, 240.00, 640.00, 1000.00, 2, 2, 'disponibil'),
(7, 'eq_shure_sm7b', 'Shure SM7B Vocal Microphone', 'Audio & Podcast', 'Shure', 'Microfon dinamic legendar pentru podcast si voiceover, cu protectie electromagnetica si filtru pop integrat.', '/imagini/echipamente/shure-sm7b.jpg', 70.00, 105.00, 280.00, 500.00, 5, 5, 'disponibil'),
(8, 'eq_dji_mic2', 'DJI Mic 2 Wireless Dual Kit (2TX + 1RX)', 'Audio & Podcast', 'DJI', 'Sistem wireless portabil cu inregistrare interna 32-bit float, anulare activa a zgomotului si raza 250m.', '/imagini/echipamente/dji-mic-2.jpg', 110.00, 165.00, 440.00, 800.00, 4, 4, 'disponibil'),
(9, 'eq_kit_cinema', 'Kit Cinema Solo Operator (Sony FX3 + 24-70mm GM II)', 'Kit-uri', 'Sony', 'Pachet gata de filmare: corp Sony FX3 cu maner XLR + zoom Sony 24-70mm GM II + 4 baterii + card V90 128GB.', '/imagini/echipamente/kit-cinema.jpg', 460.00, 690.00, 1840.00, 3500.00, 2, 2, 'disponibil'),
(10, 'eq_kit_podcast', 'Kit Podcast Complet 2 Persoane (RODEcaster + 2x Shure SM7B)', 'Kit-uri', 'Multi-brand', 'Tot ce ai nevoie pentru inregistrare la calitate radio: consola RODEcaster Pro II, 2 microfoane Shure SM7B si 2 casti.', '/imagini/echipamente/kit-podcast.jpg', 280.00, 420.00, 1120.00, 1800.00, 2, 2, 'disponibil');

-- 3. Rezervări demo
-- Rezervarea 1: RC-2026-014 (Andrei Ionescu, pachet weekend Sony FX3 + 24-70mm GM II)
INSERT INTO `rezervari` (`id`, `cod_rezervare`, `utilizator_id`, `data_ridicare`, `data_predare`, `observatii`, `total_chirie`, `total_garantie`, `status`, `creat_la`) VALUES
(1, 'RC-2026-014', 1, '2026-11-28', '2026-11-30', 'Filmari clip muzical in studio. Va rugam sa pregatiti acumulatorii incarcati la maxim.', 750.00, 3700.00, 'confirmata', '2026-11-20 10:30:00'),
(2, 'RC-2026-025', 1, '2026-12-05', '2026-12-06', 'Interviu podcast in deplasare. Avem nevoie de kit-ul de podcast si lumina Aputure.', 460.00, 2900.00, 'in_asteptare', NOW());

-- 4. Articole rezervare
-- Pentru Rezervarea 1 (RC-2026-014)
INSERT INTO `articole_rezervare` (`rezervare_id`, `echipament_id`, `tip_tarif`, `cantitate`, `pret_unitar`, `garantie_unitara`) VALUES
(1, 1, 'weekend', 1, 525.00, 2500.00),
(1, 3, 'weekend', 1, 225.00, 1200.00);

-- Pentru Rezervarea 2 (RC-2026-025)
INSERT INTO `articole_rezervare` (`rezervare_id`, `echipament_id`, `tip_tarif`, `cantitate`, `pret_unitar`, `garantie_unitara`) VALUES
(2, 10, '1_zi', 1, 280.00, 1800.00),
(2, 5, '1_zi', 1, 180.00, 1100.00);
