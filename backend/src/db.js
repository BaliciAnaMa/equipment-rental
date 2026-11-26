// backend/src/db.js
// Conexiune MySQL cu pool de conexiuni folosind mysql2/promise
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3307', 10),
  user: process.env.DB_USER || 'rentcam_user',
  password: process.env.DB_PASSWORD || 'rentcam_pass',
  database: process.env.DB_NAME || 'rentcam_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  decimalNumbers: true
});

module.exports = pool;
