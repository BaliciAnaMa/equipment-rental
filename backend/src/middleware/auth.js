// backend/src/middleware/auth.js
// Middleware pentru verificare token JWT
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'rentcam_secret_jwt_cheie_sigura_2026';

function verificaToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ mesaj: 'Lipsește header-ul de autorizare' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ mesaj: 'Format token invalid. Folosește Bearer <token>' });
  }

  const token = parts[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.utilizator = payload;
    next();
  } catch (err) {
    return res.status(401).json({ mesaj: 'Token expirat sau invalid' });
  }
}

module.exports = {
  verificaToken,
  JWT_SECRET
};
