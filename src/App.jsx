import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import FertilityRisk from './pages/FertilityRisk'
import PreservationTechnique from './pages/PreservationTechnique.jsx'
import FAQ from './pages/FAQ'
import Centers from './pages/Centers'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fertility-risk" element={<FertilityRisk />} />
          <Route path="/preservation" element={<PreservationTechnique />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/centers" element={<Centers />} />
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>© 2024 SheCan — Empowering Cancer Warriors to Preserve Their Future</p>
          <p className="disclaimer">
            Disclaimer: This tool provides general guidance only. Always consult qualified medical professionals for personalized advice.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App