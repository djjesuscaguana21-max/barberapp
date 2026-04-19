import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Barberia from './Barberia'
import Barbero from './Barbero'
import DetalleBarberia from './DetalleBarberia'
import AgendarCita from './AgendarCita'
import Confirmacion from './Confirmacion'
import Exito from './Exito'

function Inicio() {
  const [barberias, setBarberias] = useState([])
  const [categoria, setCategoria] = useState('barberia')

  useEffect(() => {
    fetch('https://barberapp-1-gudl.onrender.com/barberias')
      .then(res => res.json())
      .then(data => setBarberias(data))
  }, [])

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>

      {/* Header */}
      <div style={{ background: '#000', padding: '20px 24px 16px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>Ubicación actual</p>
            <p style={{ color: 'white', fontSize: '16px', fontWeight: '600', margin: 0 }}>📍 Diadema, SP</p>
          </div>
          <div style={{ width: '36px', height: '36px', background: '#222', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '600' }}>J</div>
        </div>
        <div style={{ background: '#111', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '16px' }}>🔍</span>
          <span style={{ color: '#666', fontSize: '14px' }}>Buscar barbería...</span>
        </div>
      </div>

      <div style={{ padding: '24px' }}>

        {/* Categorias */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
          <button
            onClick={() => setCategoria('barberia')}
            style={{
              flex: 1, padding: '14px', borderRadius: '14px', border: 'none',
              background: categoria === 'barberia' ? '#000' : '#f5f5f5',
              color: categoria === 'barberia' ? 'white' : '#333',
              fontWeight: '600', fontSize: '14px', cursor: 'pointer'
            }}>
            ✂️ Ir a la barbería
          </button>
          <button
            onClick={() => setCategoria('domicilio')}
            style={{
              flex: 1, padding: '14px', borderRadius: '14px', border: 'none',
              background: categoria === 'domicilio' ? '#000' : '#f5f5f5',
              color: categoria === 'domicilio' ? 'white' : '#333',
              fontWeight: '600', fontSize: '14px', cursor: 'pointer'
            }}>
            🏠 A domicilio
          </button>
        </div>

        {/* Lista */}
        {categoria === 'barberia' ? (
          <div>
            <p style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#000' }}>Cerca de ti</p>
            {barberias.map(b => (
              <Barberia key={b.id} nombre={b.nombre} distancia={b.distancia} estrellas={b.estrellas} />
            ))}
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: '#000' }}>Disponibles ahora</p>
            <Barbero nombre="Juan Ramírez" especialidad="Barbero profesional · 5 años" estrellas="★★★★★ 4.9" />
            <Barbero nombre="Miguel Ferreira" especialidad="Especialista en degradê · 3 años" estrellas="★★★★☆ 4.6" />
          </div>
        )}

      </div>

      {/* Bottom nav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #f0f0f0', display: 'flex', padding: '12px 0' }}>
        <div style={{ flex: 1, textAlign: 'center', fontSize: '20px' }}>🏠</div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: '20px' }}>📅</div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: '20px' }}>👤</div>
      </div>

    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/barberia" element={<DetalleBarberia />} />
        <Route path="/agendar" element={<AgendarCita />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/exito" element={<Exito />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App