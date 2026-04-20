import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function PanelBarbero() {
  const navigate = useNavigate()
  const [modo, setModo] = useState('barberia')
  const [disponible, setDisponible] = useState(false)

  const citas = [
    { id: 1, cliente: 'Carlos López', servicio: 'Corte clásico', hora: '10:30', estado: 'confirmada' },
    { id: 2, cliente: 'Miguel Silva', servicio: 'Corte + barba', hora: '11:30', estado: 'pendiente' },
    { id: 3, cliente: 'Rafael Santos', servicio: 'Degradê', hora: '14:00', estado: 'confirmada' },
  ]

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', paddingBottom: '80px' }}>

      <div style={{ background: '#000', padding: '20px 24px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>Panel del barbero</p>
            <h2 style={{ color: 'white', margin: '4px 0 0', fontSize: '20px', fontWeight: '700' }}>Juan Ramírez ✂️</h2>
          </div>
          <div style={{ width: '44px', height: '44px', background: '#222', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>✂️</div>
        </div>

        <div style={{ display: 'flex', background: '#111', borderRadius: '12px', padding: '4px' }}>
          <button onClick={() => setModo('barberia')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: modo === 'barberia' ? 'white' : 'transparent', color: modo === 'barberia' ? '#000' : '#666', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
            🏪 Modo Barbería
          </button>
          <button onClick={() => setModo('domicilio')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: modo === 'domicilio' ? 'white' : 'transparent', color: modo === 'domicilio' ? '#000' : '#666', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
            🏠 Modo Domicilio
          </button>
        </div>
      </div>

      <div style={{ padding: '24px' }}>

        {modo === 'barberia' ? (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: 'white', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#000', margin: 0 }}>8</p>
                <p style={{ color: '#888', fontSize: '12px', margin: '4px 0 0' }}>Citas hoy</p>
              </div>
              <div style={{ background: 'white', borderRadius: '14px', padding: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#000', margin: 0 }}>R$320</p>
                <p style={{ color: '#888', fontSize: '12px', margin: '4px 0 0' }}>Ganancia hoy</p>
              </div>
            </div>

            <p style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px', color: '#000' }}>Próximas citas</p>

            {citas.map(cita => (
              <div key={cita.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: '#000', borderRadius: '12px', padding: '10px 14px', textAlign: 'center', minWidth: '52px' }}>
                  <p style={{ color: 'white', fontWeight: '700', fontSize: '14px', margin: 0 }}>{cita.hora}</p>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '600', fontSize: '14px', margin: 0 }}>{cita.cliente}</p>
                  <p style={{ color: '#888', fontSize: '12px', margin: '4px 0 0' }}>{cita.servicio}</p>
                </div>
                <span style={{ background: cita.estado === 'confirmada' ? '#d4edda' : '#fff3cd', color: cita.estado === 'confirmada' ? '#155724' : '#856404', fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '20px' }}>
                  {cita.estado === 'confirmada' ? 'Confirmada' : 'Pendiente'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div style={{ background: 'white', borderRadius: '20px', padding: '28px', textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{disponible ? '🟢' : '⚫'}</div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 8px' }}>
                {disponible ? 'Estás disponible' : 'Estás desconectado'}
              </h3>
              <p style={{ color: '#888', fontSize: '13px', margin: '0 0 24px' }}>
                {disponible ? 'Recibirás solicitudes de clientes cercanos' : 'Activa para recibir solicitudes a domicilio'}
              </p>
              <button
                onClick={() => setDisponible(!disponible)}
                style={{ width: '100%', padding: '16px', borderRadius: '14px', border: 'none', background: disponible ? '#ff3b30' : '#000', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
                {disponible ? 'Desconectarme' : 'Ponerme disponible'}
              </button>
            </div>

            {disponible && (
              <div style={{ background: '#d4edda', borderRadius: '16px', padding: '20px', textAlign: 'center' }}>
                <p style={{ fontSize: '20px', margin: '0 0 8px' }}>⏳</p>
                <p style={{ fontWeight: '600', fontSize: '14px', margin: 0, color: '#155724' }}>Esperando solicitudes...</p>
                <p style={{ color: '#155724', fontSize: '12px', margin: '4px 0 0' }}>Los clientes cercanos pueden solicitarte</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #f0f0f0', display: 'flex', padding: '12px 0 20px' }}>
        <div style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>📅</div>
          <p style={{ fontSize: '11px', color: '#000', fontWeight: '600', margin: '4px 0 0' }}>Agenda</p>
        </div>
        <div style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>💰</div>
          <p style={{ fontSize: '11px', color: '#888', margin: '4px 0 0' }}>Ganancias</p>
        </div>
        <div style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>⭐</div>
          <p style={{ fontSize: '11px', color: '#888', margin: '4px 0 0' }}>Reseñas</p>
        </div>
        <div onClick={() => navigate('/login')} style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>👤</div>
          <p style={{ fontSize: '11px', color: '#888', margin: '4px 0 0' }}>Perfil</p>
        </div>
      </div>

    </div>
  )
}

export default PanelBarbero