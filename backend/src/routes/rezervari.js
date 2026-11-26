// backend/src/routes/rezervari.js
// Rute rezervări client: listare rezervări proprii, creare rezervare nouă și anulare
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { verificaToken } = require('../middleware/auth');

// Toate rutele de rezervări necesită autentificare
router.use(verificaToken);

// Middleware verificare rol operator sau admin
function verificaRolOperator(req, res, next) {
  if (req.utilizator && (req.utilizator.rol === 'operator' || req.utilizator.rol === 'admin')) {
    return next();
  }
  return res.status(403).json({ mesaj: 'Acces restricționat. Necesită rol de operator sau admin.' });
}

// GET /api/rezervari/toate — Returnează toate rezervările pentru panoul operatorului (cu detalii client și articole)
router.get('/toate', verificaRolOperator, async (req, res) => {
  try {
    const { status, q } = req.query;

    let querySql = `
      SELECT r.*, 
             u.nume_complet AS client_nume, 
             u.nume_companie AS client_companie, 
             u.email AS client_email, 
             u.telefon AS client_telefon
      FROM rezervari r
      JOIN utilizatori u ON r.utilizator_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (status && status !== 'toate') {
      querySql += ' AND r.status = ?';
      params.push(status);
    }

    if (q && q.trim()) {
      querySql += ' AND (r.cod_rezervare LIKE ? OR u.nume_complet LIKE ? OR u.telefon LIKE ? OR u.email LIKE ?)';
      const cautare = `%${q.trim()}%`;
      params.push(cautare, cautare, cautare, cautare);
    }

    querySql += ' ORDER BY r.creat_la DESC, r.id DESC';

    const [rezervari] = await pool.query(querySql, params);

    if (rezervari.length === 0) {
      return res.json({ rezervari: [] });
    }

    const rezervareIds = rezervari.map((r) => r.id);
    const [articole] = await pool.query(
      `SELECT ar.*, e.nume AS echipament_nume, e.cod_echipament, e.categorie, e.imagine_url
       FROM articole_rezervare ar
       JOIN echipamente e ON ar.echipament_id = e.id
       WHERE ar.rezervare_id IN (?)`,
      [rezervareIds]
    );

    const mapArticole = {};
    for (const a of articole) {
      if (!mapArticole[a.rezervare_id]) {
        mapArticole[a.rezervare_id] = [];
      }
      mapArticole[a.rezervare_id].push(a);
    }

    const rezultat = rezervari.map((r) => ({
      ...r,
      articole: mapArticole[r.id] || []
    }));

    return res.json({ rezervari: rezultat });
  } catch (err) {
    console.error('Eroare la citirea tuturor rezervărilor:', err);
    return res.status(500).json({ mesaj: 'Eroare internă la citirea rezervărilor.' });
  }
});

// PATCH /api/rezervari/:id/status — Schimbă statusul unei rezervări de către operator (confirmata, anulata etc.)
router.patch('/:id/status', verificaRolOperator, async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const { id } = req.params;
    const { statusNou } = req.body;

    const statusuriPermise = ['in_asteptare', 'confirmata', 'predata', 'returnata', 'anulata'];
    if (!statusuriPermise.includes(statusNou)) {
      connection.release();
      return res.status(400).json({ mesaj: `Status invalid. Valori permise: ${statusuriPermise.join(', ')}` });
    }

    await connection.beginTransaction();

    let querySelect = 'SELECT * FROM rezervari WHERE id = ? FOR UPDATE';
    let paramsSelect = [id];
    if (isNaN(id)) {
      querySelect = 'SELECT * FROM rezervari WHERE cod_rezervare = ? FOR UPDATE';
      paramsSelect = [id];
    }

    const [rezervari] = await connection.query(querySelect, paramsSelect);
    if (rezervari.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({ mesaj: 'Rezervarea nu a fost găsită.' });
    }

    const rez = rezervari[0];
    const statusVechi = rez.status;

    // Dacă comutăm pe 'anulata' și nu era deja anulată, refacem stocurile
    if (statusNou === 'anulata' && statusVechi !== 'anulata') {
      const [articole] = await connection.query(
        'SELECT echipament_id, cantitate FROM articole_rezervare WHERE rezervare_id = ?',
        [rez.id]
      );
      for (const art of articole) {
        await connection.query(
          `UPDATE echipamente 
           SET stoc_disponibil = stoc_disponibil + ?,
               status = 'disponibil'
           WHERE id = ?`,
          [art.cantitate, art.echipament_id]
        );
      }
    }

    // Dacă o rezervare anterior anulată este reactivată/confirmată, scădem din nou stocul
    if (statusVechi === 'anulata' && statusNou !== 'anulata') {
      const [articole] = await connection.query(
        'SELECT echipament_id, cantitate FROM articole_rezervare WHERE rezervare_id = ?',
        [rez.id]
      );
      for (const art of articole) {
        const [echipamente] = await connection.query(
          'SELECT stoc_disponibil FROM echipamente WHERE id = ? FOR UPDATE',
          [art.echipament_id]
        );
        if (echipamente.length > 0 && echipamente[0].stoc_disponibil < art.cantitate) {
          await connection.rollback();
          connection.release();
          return res.status(400).json({ mesaj: 'Stoc insuficient pentru reactivarea rezervării.' });
        }
        await connection.query(
          `UPDATE echipamente 
           SET stoc_disponibil = stoc_disponibil - ?,
               status = IF(stoc_disponibil - ? <= 0, 'indisponibil', status)
           WHERE id = ?`,
          [art.cantitate, art.cantitate, art.echipament_id]
        );
      }
    }

    await connection.query(
      'UPDATE rezervari SET status = ? WHERE id = ?',
      [statusNou, rez.id]
    );

    await connection.commit();
    connection.release();

    return res.json({
      mesaj: `Statusul rezervării ${rez.cod_rezervare} a fost actualizat la '${statusNou}'.`,
      rezervare_id: rez.id,
      status: statusNou
    });
  } catch (err) {
    await connection.rollback();
    connection.release();
    console.error('Eroare la actualizarea statusului rezervării:', err);
    return res.status(500).json({ mesaj: 'Eroare internă la actualizarea statusului.' });
  }
});

// GET /api/rezervari/mele — returnează rezervările utilizatorului logat cu articole_rezervare și detaliile echipamentelor
router.get('/mele', async (req, res) => {
  try {
    const utilizatorId = req.utilizator.id;

    const [rezervari] = await pool.query(
      `SELECT r.*
       FROM rezervari r
       WHERE r.utilizator_id = ?
       ORDER BY r.creat_la DESC, r.id DESC`,
      [utilizatorId]
    );

    if (rezervari.length === 0) {
      return res.json({ rezervari: [] });
    }

    const rezervareIds = rezervari.map((r) => r.id);
    const [articole] = await pool.query(
      `SELECT ar.*, e.nume AS echipament_nume, e.cod_echipament, e.categorie, e.imagine_url
       FROM articole_rezervare ar
       JOIN echipamente e ON ar.echipament_id = e.id
       WHERE ar.rezervare_id IN (?)`,
      [rezervareIds]
    );

    // Grupăm articolele pe rezervări
    const mapArticole = {};
    for (const a of articole) {
      if (!mapArticole[a.rezervare_id]) {
        mapArticole[a.rezervare_id] = [];
      }
      mapArticole[a.rezervare_id].push(a);
    }

    const rezultat = rezervari.map((r) => ({
      ...r,
      articole: mapArticole[r.id] || []
    }));

    return res.json({ rezervari: rezultat });
  } catch (err) {
    console.error('Eroare la citirea rezervărilor:', err);
    return res.status(500).json({ mesaj: 'Eroare internă la citirea rezervărilor.' });
  }
});

// POST /api/rezervari — primește articole din coș, date, observatii; scade stoc_disponibil într-o tranzacție
router.post('/', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const utilizatorId = req.utilizator.id;
    const { articole, data_ridicare, data_predare, observatii } = req.body;

    if (!Array.isArray(articole) || articole.length === 0) {
      connection.release();
      return res.status(400).json({ mesaj: 'Coșul de rezervare este gol.' });
    }

    if (!data_ridicare || !data_predare) {
      connection.release();
      return res.status(400).json({ mesaj: 'Data de ridicare și data de predare sunt obligatorii.' });
    }

    await connection.beginTransaction();

    let totalChirie = 0;
    let totalGarantie = 0;
    const articoleDeInserat = [];

    for (const art of articole) {
      const cantitate = parseInt(art.cantitate || 1, 10);
      if (cantitate <= 0) {
        await connection.rollback();
        connection.release();
        return res.status(400).json({ mesaj: 'Cantitatea trebuie să fie cel puțin 1.' });
      }

      // Format tip_tarif: poate veni ca '1_zi', 'weekend', '7_zile' sau variante frontend '1 Zi', 'Weekend -25%', '7 Zile'
      let tipTarifSql = '1_zi';
      if (art.tip_tarif === 'weekend' || art.tipTarif === 'Weekend -25%' || art.tip_tarif === 'Weekend -25%') {
        tipTarifSql = 'weekend';
      } else if (art.tip_tarif === '7_zile' || art.tipTarif === '7 Zile' || art.tip_tarif === '7 Zile') {
        tipTarifSql = '7_zile';
      }

      // Verificăm și blocăm echipamentul pentru stoc
      let echipamentId = art.echipament_id || art.id;
      let querySelect = 'SELECT * FROM echipamente WHERE id = ? FOR UPDATE';
      let paramSelect = [echipamentId];

      if (isNaN(echipamentId)) {
        querySelect = 'SELECT * FROM echipamente WHERE cod_echipament = ? FOR UPDATE';
        paramSelect = [echipamentId];
      }

      const [echipamente] = await connection.query(querySelect, paramSelect);

      if (echipamente.length === 0) {
        await connection.rollback();
        connection.release();
        return res.status(404).json({ mesaj: `Echipamentul ${echipamentId} nu a fost găsit.` });
      }

      const eq = echipamente[0];

      if (eq.stoc_disponibil < cantitate || eq.status === 'indisponibil') {
        await connection.rollback();
        connection.release();
        return res.status(400).json({
          mesaj: `Stoc insuficient pentru "${eq.nume}". Disponibil: ${eq.stoc_disponibil}, solicitat: ${cantitate}.`
        });
      }

      // Determinăm prețul unitar și garanția conform tip_tarif
      let pretUnitar = eq.pret_1_zi;
      if (tipTarifSql === 'weekend') {
        pretUnitar = eq.pret_weekend;
      } else if (tipTarifSql === '7_zile') {
        pretUnitar = eq.pret_7_zile;
      }

      const garantieUnitara = eq.garantie;

      totalChirie += Number(pretUnitar) * cantitate;
      totalGarantie += Number(garantieUnitara) * cantitate;

      // Scădem stoc_disponibil
      const nouStoc = eq.stoc_disponibil - cantitate;
      const nouStatus = nouStoc === 0 ? 'indisponibil' : eq.status;

      await connection.query(
        'UPDATE echipamente SET stoc_disponibil = ?, status = ? WHERE id = ?',
        [nouStoc, nouStatus, eq.id]
      );

      articoleDeInserat.push({
        echipament_id: eq.id,
        tip_tarif: tipTarifSql,
        cantitate,
        pret_unitar: pretUnitar,
        garantie_unitara: garantieUnitara
      });
    }

    // Generăm cod_rezervare unic, ex: RC-2026-XXX
    const codUnic = `RC-2026-${Math.floor(100 + Math.random() * 900)}`;

    const [rezultatRezervare] = await connection.query(
      `INSERT INTO rezervari (cod_rezervare, utilizator_id, data_ridicare, data_predare, observatii, total_chirie, total_garantie, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'in_asteptare')`,
      [codUnic, utilizatorId, data_ridicare, data_predare, observatii || null, totalChirie, totalGarantie]
    );

    const rezervareId = rezultatRezervare.insertId;

    for (const artIns of articoleDeInserat) {
      await connection.query(
        `INSERT INTO articole_rezervare (rezervare_id, echipament_id, tip_tarif, cantitate, pret_unitar, garantie_unitara)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [rezervareId, artIns.echipament_id, artIns.tip_tarif, artIns.cantitate, artIns.pret_unitar, artIns.garantie_unitara]
      );
    }

    await connection.commit();
    connection.release();

    return res.status(201).json({
      mesaj: 'Rezervarea a fost creată cu succes.',
      rezervare: {
        id: rezervareId,
        cod_rezervare: codUnic,
        total_chirie: totalChirie,
        total_garantie: totalGarantie,
        status: 'in_asteptare',
        data_ridicare,
        data_predare
      }
    });
  } catch (err) {
    await connection.rollback();
    connection.release();
    console.error('Eroare la crearea rezervării:', err);
    return res.status(500).json({ mesaj: 'Eroare internă la crearea rezervării.' });
  }
});

// PATCH /api/rezervari/:id/anulare — permite clientului să anuleze o rezervare 'in_asteptare' și reface stocul
router.patch('/:id/anulare', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const utilizatorId = req.utilizator.id;
    const { id } = req.params;

    await connection.beginTransaction();

    let queryRez = 'SELECT * FROM rezervari WHERE id = ? FOR UPDATE';
    let paramRez = [id];

    if (isNaN(id)) {
      queryRez = 'SELECT * FROM rezervari WHERE cod_rezervare = ? FOR UPDATE';
      paramRez = [id];
    }

    const [rezervari] = await connection.query(queryRez, paramRez);

    if (rezervari.length === 0) {
      await connection.rollback();
      connection.release();
      return res.status(404).json({ mesaj: 'Rezervarea nu a fost găsită.' });
    }

    const rez = rezervari[0];

    // Verificăm că rezervarea aparține clientului logat (sau are rol admin/operator)
    if (rez.utilizator_id !== utilizatorId && req.utilizator.rol === 'client') {
      await connection.rollback();
      connection.release();
      return res.status(403).json({ mesaj: 'Nu ai permisiunea de a anula această rezervare.' });
    }

    if (rez.status !== 'in_asteptare') {
      await connection.rollback();
      connection.release();
      return res.status(400).json({
        mesaj: `Doar rezervările cu statusul 'in_asteptare' pot fi anulate. Status curent: ${rez.status}`
      });
    }

    // Refacem stocul echipamentelor din rezervare
    const [articole] = await connection.query(
      'SELECT echipament_id, cantitate FROM articole_rezervare WHERE rezervare_id = ?',
      [rez.id]
    );

    for (const art of articole) {
      await connection.query(
        `UPDATE echipamente 
         SET stoc_disponibil = stoc_disponibil + ?,
             status = 'disponibil'
         WHERE id = ?`,
        [art.cantitate, art.echipament_id]
      );
    }

    // Actualizăm statusul rezervării la 'anulata'
    await connection.query(
      "UPDATE rezervari SET status = 'anulata' WHERE id = ?",
      [rez.id]
    );

    await connection.commit();
    connection.release();

    return res.json({
      mesaj: 'Rezervarea a fost anulată cu succes, iar stocurile au fost restabilite.',
      rezervare_id: rez.id,
      status: 'anulata'
    });
  } catch (err) {
    await connection.rollback();
    connection.release();
    console.error('Eroare la anularea rezervării:', err);
    return res.status(500).json({ mesaj: 'Eroare internă la anularea rezervării.' });
  }
});

module.exports = router;
