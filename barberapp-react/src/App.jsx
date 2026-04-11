import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Barberia from './Barberia'
import Barbero from './Barbero'
import DetalleBarberia from './DetalleBarberia'

function Inicio() {
  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh', padding: '32px' }}>

      <header style={{
        background: '#1a1a1a',
        color: 'white',
        padding: '32px',
        textAlign: 'center',
        borderRadius: '16px',
        marginBottom: '32px'
      }}>
        <h1>BarberApp</h1>
        <p style={{ color: '#aaa' }}>Tu barbería, a un clic de distancia</p>
      </header>

      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
        Barberías cerca de ti
      </h2>

      <div style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}>
        <Barberia nombre="Barbería Alpha" distancia="0.3 km · Diadema" estrellas="★★★★★ 4.9" />
        <Barberia nombre="Barber Club" distancia="0.8 km · Diadema" estrellas="★★★★☆ 4.6" />
        <Barberia nombre="Studio Corte" distancia="1.2 km · Diadema" estrellas="★★★★★ 4.8" />
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
        Barberos a domicilio
      </h2>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Barbero nombre="Juan Ramírez" especialidad="Barbero profesional · 5 años" estrellas="★★★★★ 4.9" />
        <Barbero nombre="Miguel Ferreira" especialidad="Especialista en degradê · 3 años" estrellas="★★★★☆ 4.6" />
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
      </Routes>
    </BrowserRouter>
  )
}

export default App