import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function DetalleBarberia() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const nombre = searchParams.get('nombre') || 'Barberia Alpha'
  const direccion = searchParams.get('direccion') || 'Diadema, SP'
  const [servicios, setServicios] = useState([])
  const [categoria, setCategoria] = useState('hombre')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch('https://barberapp-1-gudl.onrender.com/servicios')
      .then(res => res.json())
      .then(data => { setServicios(data); setCargando(false) })
      .catch(() => setCargando(false))
  }, [])

  const serviciosFiltrados = servicios.filter(s => s.categoria === categoria)

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', paddingBottom: '32px' }}>

      <div style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', padding: '20px 24px 28px' }}>
        <button onClick={() => window.history.back()} style={{ background: 'none', border: 'none', color: '#888', fontSize: '14px', cursor: 'pointer', padding: '0 0 12px' }}>← Volver</button>
        <h2 style={{ color: 'white', margin: 0, fontSize: '22px', fontWeight: '700' }}>{nombre}</h2>
        <p style={{ color: '#888', margin: '4px 0 0', fontSize: '13px' }}>📍 {direccion}</p>
        <p style={{ color: '#f0a500', margin: '4px 0 0', fontSize: '13px' }}>★ 4.9 · Abierto ahora</p>
      </div>

      <div style={{ padding: '20px 24px' }}>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {['hombre', 'mujer', 'infantil'].map(cat => (
            <button key={cat} onClick={() => setCategoria(cat)} style={{ padding: '10px 16px', borderRadius: '20px', border: 'none', background: categoria === cat ? '#000' : '#f0f0f0', color: categoria === cat ? 'white' : '#555', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
              {cat === 'hombre' ? '👨 Hombre' : cat === 'mujer' ? '👩 Mujer' : '👦 Infantil'}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          {cargando ? (
            <p style={{ textAlign: 'center', padding: '24px', color: '#888' }}>Cargando servicios...</p>
          ) : serviciosFiltrados.map((s) => (
            <div key={s.id} onClick={() => navigate(`/agendar?barberia=${encodeURIComponent(nombre)}&servicio=${encodeURIComponent(s.nombre)}`)}
              style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              {s.foto && (
                <img src={s.foto} alt={s.nombre} style={{ width: '90px', height: '90px', objectFit: 'cover', flexShrink: 0 }} />
              )}
              <div style={{ padding: '14px 16px', flex: 1 }}>
                <p style={{ fontWeight: '700', fontSize: '15px', margin: 0 }}>{s.nombre}</p>
                <p style={{ color: '#888', fontSize: '12px', margin: '4px 0 8px' }}>⏱ {s.duracion}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ fontWeight: '700', fontSize: '16px', margin: 0 }}>R${s.precio}</p>
                  <span style={{ background: '#000', color: 'white', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: '600' }}>Agendar →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DetalleBarberia