import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function DetalleBarberia() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const nombre = searchParams.get('nombre') || 'Barberia Alpha'
  const [servicios, setServicios] = useState([])
  const [categoria, setCategoria] = useState('hombre')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch('https://barberapp-1-gudl.onrender.com/servicios')
      .then(res => res.json())
      .then(data => {
        setServicios(data)
        setCargando(false)
      })
      .catch(() => {
        setServicios([
          { id: 1, nombre: 'Corte clasico', duracion: '30 min', precio: 35, categoria: 'hombre' },
          { id: 2, nombre: 'Corte + barba', duracion: '50 min', precio: 55, categoria: 'hombre' },
          { id: 3, nombre: 'Degrade', duracion: '40 min', precio: 45, categoria: 'hombre' },
          { id: 4, nombre: 'Corte feminino', duracion: '45 min', precio: 55, categoria: 'mujer' },
          { id: 5, nombre: 'Escova', duracion: '40 min', precio: 45, categoria: 'mujer' },
          { id: 6, nombre: 'Corte infantil', duracion: '20 min', precio: 25, categoria: 'infantil' },
        ])
        setCargando(false)
      })
  }, [])

  const serviciosFiltrados = servicios.filter(s => s.categoria === categoria)

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', paddingBottom: '32px' }}>

      <div style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', padding: '20px 24px 28px' }}>
        <button onClick={() => window.history.back()} style={{ background: 'none', border: 'none', color: '#888', fontSize: '14px', cursor: 'pointer', padding: '0 0 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          ← Volver
        </button>
        <h2 style={{ color: 'white', margin: 0, fontSize: '22px', fontWeight: '700' }}>{nombre}</h2>
        <p style={{ color: '#888', margin: '4px 0 0', fontSize: '13px' }}>📍 Diadema, SP · ★ 4.9</p>
      </div>

      <div style={{ padding: '20px 24px' }}>

        {/* Categorias */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {['hombre', 'mujer', 'infantil'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              style={{
                padding: '10px 16px', borderRadius: '20px', border: 'none',
                background: categoria === cat ? '#000' : '#f0f0f0',
                color: categoria === cat ? 'white' : '#555',
                fontWeight: '600', fontSize: '13px', cursor: 'pointer'
              }}>
              {cat === 'hombre' ? '👨 Hombre' : cat === 'mujer' ? '👩 Mujer' : '👦 Infantil'}
            </button>
          ))}
        </div>

        {/* Servicios */}
        <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px' }}>
          {cargando ? (
            <p style={{ textAlign: 'center', padding: '24px', color: '#888' }}>Cargando servicios...</p>
          ) : serviciosFiltrados.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '24px', color: '#888' }}>No hay servicios disponibles</p>
          ) : (
            serviciosFiltrados.map((s, i) => (
              <div
                key={s.id}
                onClick={() => navigate(`/agendar?barberia=${encodeURIComponent(nombre)}&servicio=${encodeURIComponent(s.nombre)}`)}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '16px', borderBottom: i < serviciosFiltrados.length - 1 ? '1px solid #f5f5f5' : 'none',
                  cursor: 'pointer'
                }}>
                <div>
                  <p style={{ fontWeight: '600', fontSize: '15px', margin: 0 }}>{s.nombre}</p>
                  <p style={{ color: '#888', fontSize: '12px', margin: '4px 0 0' }}>⏱ {s.duracion}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: '700', fontSize: '16px', margin: 0 }}>R${s.precio}</p>
                  <p style={{ color: '#888', fontSize: '11px', margin: '4px 0 0' }}>Agendar →</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default DetalleBarberia