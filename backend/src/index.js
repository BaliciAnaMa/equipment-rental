// backend/src/index.js
// Serverul principal Node.js Express pentru API RentCam
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const echipamenteRoutes = require('./routes/echipamente');
const rezervariRoutes = require('./routes/rezervari');

const app = express();
const PORT = process.env.PORT || 5000;

// Configurare CORS pentru frontend
app.use(cors({
  origin: '*', // Permite accesul de la frontend Vite dev server (localhost:5173 / localhost:3000 etc.)
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rute API
app.use('/api/auth', authRoutes);
app.use('/api/echipamente', echipamenteRoutes);
app.use('/api/rezervari', rezervariRoutes);

// Endpoint de sănătate
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Pornire server
app.listen(PORT, () => {
  console.log(`RentCam Backend API rulează pe http://localhost:${PORT}`);
});
