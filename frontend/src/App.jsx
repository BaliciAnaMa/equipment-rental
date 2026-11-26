import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CatalogPage from './pages/CatalogPage'
import EquipmentDetailPage from './pages/EquipmentDetailPage'
import LoginPage from './pages/LoginPage'
import { obtineUtilizatorCurent } from './data/utilizatoriDemo'
import './styles/theme.css'

export default function App() {
  const [utilizatorCurent, setUtilizatorCurent] = useState(null)

  // Sincronizare stare utilizator la inițializare
  useEffect(() => {
    const utilizator = obtineUtilizatorCurent()
    if (utilizator) {
      setUtilizatorCurent(utilizator)
    }
  }, [])

  const handleLoginSuccess = (utilizator) => {
    setUtilizatorCurent(utilizator)
  }

  const handleLogout = () => {
    setUtilizatorCurent(null)
  }

  return (
    <div className="app-container">
      <Navbar utilizatorCurent={utilizatorCurent} onLogout={handleLogout} />

      <main className="main-content">
        <Routes>
          {/* Pagina principală — Catalogul interactiv de echipamente */}
          <Route path="/" element={<CatalogPage />} />

          {/* Pagina de Detalii Echipament */}
          <Route path="/equipment/:id" element={<EquipmentDetailPage />} />

          {/* Pagina de Autentificare */}
          <Route
            path="/login"
            element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
          />
        </Routes>
      </main>
    </div>
  )
}
