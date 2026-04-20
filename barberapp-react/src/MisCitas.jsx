import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function MisCitas() {
  const navigate = useNavigate()
  const [citas, setCitas] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    fetch('https://barberapp-1-gudl.onrender.com/citas')
      .then(res => res.json())
      .then(data => {
        setCitas(data)
        setCargando(false)
      })
  }, [])

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh', fontFamily: 'sans-serif', paddingBottom: '80px' }}>

      <div style={{ background: '#000', padding: '20px 24px' }}>
        <h2 style={{ color: 'white', margin: 0, fontSize: '20px', fontWeight: '700' }}>Mis citas</h2>
      </div>

      <div style={{ padding: '24px' }}>
        {cargando ? (
          <p style={{ textAlign: 'center', color: '#888' }}>Cargando...</p>
        ) : citas.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
            <p style={{ fontWeight: '600', fontSize: '16px', color: '#000' }}>No tienes citas aún</p>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>Agenda tu primera cita en una barbería</p>
            <button onClick={() => navigate('/')} style={{ background: '#000', color: 'white', border: 'none', borderRadius: '14px', padding: '14px 28px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              Buscar barbería
            </button>
          </div>
        ) : (
          citas.map(cita => (
            <div key={cita.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <p style={{ fontWeight: '700', fontSize: '15px', margin: 0 }}>{cita.barberia}</p>
                <span style={{ background: '#d4edda', color: '#155724', fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px' }}>Confirmada</span>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>✂️ {cita.servicio}</p>
                <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>🕐 {cita.hora}</p>
                <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>📅 {cita.fecha}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #f0f0f0', display: 'flex', padding: '12px 0 20px' }}>
        <div onClick={() => navigate('/')} style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>🏠</div>
          <p style={{ fontSize: '11px', color: '#888', margin: '4px 0 0' }}>Inicio</p>
        </div>
        <div style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>📅</div>
          <p style={{ fontSize: '11px', color: '#000', fontWeight: '600', margin: '4px 0 0' }}>Mis citas</p>
        </div>
        <div onClick={() => navigate('/')} style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>💈</div>
          <p style={{ fontSize: '11px', color: '#888', margin: '4px 0 0' }}>A domicilio</p>
        </div>
        <div style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>👤</div>
          <p style={{ fontSize: '11px', color: '#888', margin: '4px 0 0' }}>Perfil</p>
        </div>
      </div>

    </div>
  )
}

export default MisCitas