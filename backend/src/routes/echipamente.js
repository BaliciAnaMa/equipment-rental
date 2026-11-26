// backend/src/routes/echipamente.js
// Rute echipamente: listare cu filtrare/căutare și detalii echipament
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/echipamente — listează echipamentele din `echipamente` (suport categorie și căutare q)
router.get('/', async (req, res) => {
  try {
    const { categorie, q } = req.query;
    let query = 'SELECT * FROM echipamente WHERE 1=1';
    const params = [];

    if (categorie && categorie !== 'Toate') {
      query += ' AND categorie = ?';
      params.push(categorie);
    }

    if (q && q.trim()) {
      query += ' AND (nume LIKE ? OR descriere LIKE ? OR marca LIKE ?)';
      const term = `%${q.trim()}%`;
      params.push(term, term, term);
    }

    query += ' ORDER BY id ASC';

    const [echipamente] = await pool.query(query, params);
    return res.json({ echipamente });
  } catch (err) {
    console.error('Eroare la obținere echipamente:', err);
    return res.status(500).json({ mesaj: 'Eroare internă la citirea echipamentelor.' });
  }
});

// GET /api/echipamente/:id — returnează detaliile unui singur echipament
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let query = 'SELECT * FROM echipamente WHERE id = ?';
    let params = [id];

    // Dacă id-ul este numeric căutăm după id, altfel și după cod_echipament
    if (isNaN(id)) {
      query = 'SELECT * FROM echipamente WHERE cod_echipament = ?';
      params = [id];
    }

    const [echipamente] = await pool.query(query, params);

    if (echipamente.length === 0) {
      return res.status(404).json({ mesaj: 'Echipamentul căutat nu există.' });
    }

    return res.json({ echipament: echipamente[0] });
  } catch (err) {
    console.error('Eroare la citirea echipamentului:', err);
    return res.status(500).json({ mesaj: 'Eroare internă la citirea detaliilor echipamentului.' });
  }
});

module.exports = router;
