import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Barberia from './Barberia'
import Barbero from './Barbero'
import DetalleBarberia from './DetalleBarberia'
import AgendarCita from './AgendarCita'
import Confirmacion from './Confirmacion'
import Exito from './Exito'
import MisCitas from './MisCitas'
import Perfil from './Perfil'
import PanelBarbero from './PanelBarbero'
import Login from './Login'
import Landing from './Landing'
import PerfilBarbero from './PerfilBarbero'

function Inicio() {
  const navigate = useNavigate()
  const [barberias, setBarberias] = useState([])
  const [categoria, setCategoria] = useState('barberia')

  useEffect(() => {
    fetch('https://barberapp-1-gudl.onrender.com/barberias')
      .then(res => res.json())
      .then(data => setBarberias(data))
  }, [])

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', paddingBottom: '80px' }}>

      <div style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', padding: '20px 24px 16px', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>📍 Ubicación actual</p>
            <p style={{ color: 'white', fontSize: '18px', fontWeight: '700', margin: '2px 0 0' }}>Diadema, SP</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '20px', padding: '6px 12px', cursor: 'pointer' }}>
              <span style={{ color: 'white', fontSize: '12px', fontWeight: '500' }}>🔔</span>
            </div>
            <div onClick={() => navigate('/perfil')} style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #f0a500, #ff6b00)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>J</div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '14px', padding: '13px 16px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <span style={{ fontSize: '16px' }}>🔍</span>
          <span style={{ color: '#777', fontSize: '14px' }}>Buscar barbería o barbero...</span>
        </div>
      </div>

      <div style={{ padding: '20px 24px' }}>

        <div style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)', borderRadius: '20px', padding: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: '#f0a500', fontSize: '11px', fontWeight: '700', margin: 0, letterSpacing: '1px' }}>NUEVO EN DIADEMA</p>
            <p style={{ color: 'white', fontSize: '18px', fontWeight: '700', margin: '6px 0 4px', lineHeight: 1.2 }}>Agenda tu cita en segundos</p>
            <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>Sin esperas, sin llamadas</p>
          </div>
          <div style={{ fontSize: '52px' }}>✂️</div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          <button onClick={() => setCategoria('barberia')} style={{ flex: 1, padding: '14px 10px', borderRadius: '16px', border: 'none', background: categoria === 'barberia' ? '#1a1a1a' : '#f5f5f5', color: categoria === 'barberia' ? 'white' : '#555', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
            ✂️ Barbería
          </button>
          <button onClick={() => setCategoria('domicilio')} style={{ flex: 1, padding: '14px 10px', borderRadius: '16px', border: 'none', background: categoria === 'domicilio' ? '#1a1a1a' : '#f5f5f5', color: categoria === 'domicilio' ? 'white' : '#555', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
            🏠 Domicilio
          </button>
        </div>

        {categoria === 'barberia' ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <p style={{ fontSize: '17px', fontWeight: '700', color: '#000', margin: 0 }}>Cerca de ti</p>
              <p style={{ fontSize: '13px', color: '#888', margin: 0, cursor: 'pointer' }}>Ver todas →</p>
            </div>
            {barberias.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px', color: '#888' }}>
                <p style={{ fontSize: '24px' }}>⏳</p>
                <p style={{ fontSize: '13px' }}>Cargando barberías...</p>
              </div>
            ) : (
              barberias.map(b => (
                <Barberia key={b.id} nombre={b.nombre} distancia={b.distancia} estrellas={b.estrellas} direccion={b.direccion} foto={b.foto} />
              ))
            )}
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '17px', fontWeight: '700', color: '#000', marginBottom: '16px' }}>¿Dónde quieres el servicio?</p>
            <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '20px', border: '1px solid #f0f0f0' }}>
              <div style={{ background: 'white', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid #f5f5f5', cursor: 'pointer' }}>
                <div style={{ width: '40px', height: '40px', background: '#f0f0f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🏠</div>
                <div>
                  <p style={{ fontWeight: '600', fontSize: '14px', margin: 0 }}>Mi casa</p>
                  <p style={{ color: '#888', fontSize: '12px', margin: '2px 0 0' }}>Diadema, SP</p>
                </div>
                <span style={{ marginLeft: 'auto', color: '#ccc' }}>›</span>
              </div>
              <div style={{ background: 'white', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}>
                <div style={{ width: '40px', height: '40px', background: '#f0f0f0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>📍</div>
                <div>
                  <p style={{ fontWeight: '600', fontSize: '14px', margin: 0 }}>Otra ubicación</p>
                  <p style={{ color: '#888', fontSize: '12px', margin: '2px 0 0' }}>Ingresar dirección</p>
                </div>
                <span style={{ marginLeft: 'auto', color: '#ccc' }}>›</span>
              </div>
            </div>
            <p style={{ fontSize: '17px', fontWeight: '700', color: '#000', marginBottom: '16px' }}>Disponibles ahora</p>
            <Barbero nombre="Juan Ramirez" especialidad="Especialista en degradê y cortes modernos" estrellas="4.9" foto="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300" direccion="Rua das Flores 123, Diadema SP" />
            <Barbero nombre="Miguel Ferreira" especialidad="Experto en barba y cortes clasicos" estrellas="4.6" foto="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300" direccion="Av. Principal 456, Diadema SP" />
          </div>
        )}
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #f0f0f0', display: 'flex', padding: '10px 0 20px' }}>
        <div onClick={() => setCategoria('barberia')} style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>🏠</div>
          <p style={{ fontSize: '10px', color: categoria === 'barberia' ? '#000' : '#aaa', fontWeight: categoria === 'barberia' ? '700' : '400', margin: '3px 0 0' }}>Inicio</p>
        </div>
        <div onClick={() => navigate('/miscitas')} style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>📅</div>
          <p style={{ fontSize: '10px', color: '#aaa', margin: '3px 0 0' }}>Mis citas</p>
        </div>
        <div onClick={() => setCategoria('domicilio')} style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>💈</div>
          <p style={{ fontSize: '10px', color: categoria === 'domicilio' ? '#000' : '#aaa', fontWeight: categoria === 'domicilio' ? '700' : '400', margin: '3px 0 0' }}>Domicilio</p>
        </div>
        <div onClick={() => navigate('/perfil')} style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>👤</div>
          <p style={{ fontSize: '10px', color: '#aaa', margin: '3px 0 0' }}>Perfil</p>
        </div>
      </div>

    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/miscitas" element={<MisCitas />} />
        <Route path="/panelbarbero" element={<PanelBarbero />} />
        <Route path="/barberia" element={<DetalleBarberia />} />
        <Route path="/agendar" element={<AgendarCita />} />
        <Route path="/confirmacion" element={<Confirmacion />} />
        <Route path="/exito" element={<Exito />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/perfilbarbero" element={<PerfilBarbero />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App