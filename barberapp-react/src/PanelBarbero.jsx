import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function PanelBarbero() {
  const navigate = useNavigate()
  const [modo, setModo] = useState('barberia')
  const [disponible, setDisponible] = useState(false)
  const [seccion, setSeccion] = useState('dashboard')

  const citas = [
    { id: 1, cliente: 'Carlos López', servicio: 'Corte clásico', hora: '10:30', estado: 'confirmada', precio: 35 },
    { id: 2, cliente: 'Miguel Silva', servicio: 'Corte + barba', hora: '11:30', estado: 'pendiente', precio: 55 },
    { id: 3, cliente: 'Rafael Santos', servicio: 'Degradê', hora: '14:00', estado: 'confirmada', precio: 45 },
    { id: 4, cliente: 'Lucas Oliveira', servicio: 'Corte clásico', hora: '15:00', estado: 'confirmada', precio: 35 },
  ]

  const servicios = [
    { nombre: 'Corte clásico', duracion: '30 min', precio: 35 },
    { nombre: 'Corte + barba', duracion: '50 min', precio: 55 },
    { nombre: 'Degradê', duracion: '40 min', precio: 45 },
    { nombre: 'Barba completa', duracion: '30 min', precio: 30 },
  ]

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', paddingBottom: '80px' }}>

      <div style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', padding: '20px 24px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>Panel del barbero</p>
            <h2 style={{ color: 'white', margin: '4px 0 0', fontSize: '20px', fontWeight: '700' }}>Juan Ramírez ✂️</h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: '#f0a500', fontSize: '12px', margin: 0 }}>★ 4.9</p>
            <p style={{ color: '#888', fontSize: '11px', margin: '2px 0 0' }}>230 cortes</p>
          </div>
        </div>
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '4px' }}>
          <button onClick={() => setModo('barberia')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: modo === 'barberia' ? 'white' : 'transparent', color: modo === 'barberia' ? '#000' : '#666', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
            🏪 Barbería
          </button>
          <button onClick={() => setModo('domicilio')} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: modo === 'domicilio' ? 'white' : 'transparent', color: modo === 'domicilio' ? '#000' : '#666', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>
            🏠 Domicilio
          </button>
        </div>
      </div>

      {modo === 'barberia' ? (
        <div>
          <div style={{ background: 'white', padding: '0 16px', display: 'flex', gap: '4px', borderBottom: '1px solid #f0f0f0', overflowX: 'auto' }}>
            {[
              { id: 'dashboard', label: '📊 Dashboard' },
              { id: 'agenda', label: '📅 Agenda' },
              { id: 'servicios', label: '✂️ Servicios' },
              { id: 'ingresos', label: '💰 Ingresos' },
            ].map(s => (
              <button key={s.id} onClick={() => setSeccion(s.id)} style={{ padding: '14px 12px', border: 'none', borderBottom: seccion === s.id ? '2px solid #000' : '2px solid transparent', background: 'transparent', fontWeight: seccion === s.id ? '700' : '400', fontSize: '13px', color: seccion === s.id ? '#000' : '#888', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {s.label}
              </button>
            ))}
          </div>

          <div style={{ padding: '20px 24px' }}>

            {seccion === 'dashboard' && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ background: 'white', borderRadius: '16px', padding: '16px' }}>
                    <p style={{ color: '#888', fontSize: '11px', margin: '0 0 6px', textTransform: 'uppercase' }}>Citas hoy</p>
                    <p style={{ fontSize: '28px', fontWeight: '700', color: '#000', margin: 0 }}>{citas.length}</p>
                  </div>
                  <div style={{ background: 'white', borderRadius: '16px', padding: '16px' }}>
                    <p style={{ color: '#888', fontSize: '11px', margin: '0 0 6px', textTransform: 'uppercase' }}>Ingresos hoy</p>
                    <p style={{ fontSize: '24px', fontWeight: '700', color: '#000', margin: 0 }}>R${citas.reduce((a, c) => a + c.precio, 0)}</p>
                  </div>
                  <div style={{ background: 'white', borderRadius: '16px', padding: '16px' }}>
                    <p style={{ color: '#888', fontSize: '11px', margin: '0 0 6px', textTransform: 'uppercase' }}>Pendientes</p>
                    <p style={{ fontSize: '28px', fontWeight: '700', color: '#856404', margin: 0 }}>{citas.filter(c => c.estado === 'pendiente').length}</p>
                  </div>
                  <div style={{ background: 'white', borderRadius: '16px', padding: '16px' }}>
                    <p style={{ color: '#888', fontSize: '11px', margin: '0 0 6px', textTransform: 'uppercase' }}>Rating</p>
                    <p style={{ fontSize: '24px', fontWeight: '700', color: '#f0a500', margin: 0 }}>★ 4.9</p>
                  </div>
                </div>
                <p style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>Próxima cita</p>
                <div style={{ background: 'white', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ background: '#000', borderRadius: '12px', padding: '10px 14px', textAlign: 'center' }}>
                    <p style={{ color: 'white', fontWeight: '700', fontSize: '14px', margin: 0 }}>{citas[0].hora}</p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '600', fontSize: '14px', margin: 0 }}>{citas[0].cliente}</p>
                    <p style={{ color: '#888', fontSize: '12px', margin: '4px 0 0' }}>{citas[0].servicio} · R${citas[0].precio}</p>
                  </div>
                  <button style={{ background: '#000', color: 'white', border: 'none', borderRadius: '10px', padding: '8px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                    Iniciar
                  </button>
                </div>
              </div>
            )}

            {seccion === 'agenda' && (
              <div>
                <p style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Agenda de hoy</p>
                {citas.map(cita => (
                  <div key={cita.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: '#000', borderRadius: '12px', padding: '10px 14px', textAlign: 'center', minWidth: '52px' }}>
                      <p style={{ color: 'white', fontWeight: '700', fontSize: '14px', margin: 0 }}>{cita.hora}</p>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: '600', fontSize: '14px', margin: 0 }}>{cita.cliente}</p>
                      <p style={{ color: '#888', fontSize: '12px', margin: '4px 0 0' }}>{cita.servicio} · R${cita.precio}</p>
                    </div>
                    <span style={{ background: cita.estado === 'confirmada' ? '#d4edda' : '#fff3cd', color: cita.estado === 'confirmada' ? '#155724' : '#856404', fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '20px' }}>
                      {cita.estado === 'confirmada' ? '✓' : '⏳'}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {seccion === 'servicios' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <p style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>Mis servicios</p>
                  <button style={{ background: '#000', color: 'white', border: 'none', borderRadius: '10px', padding: '8px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>+ Agregar</button>
                </div>
                {servicios.map((s, i) => (
                  <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '16px', marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontWeight: '600', fontSize: '14px', margin: 0 }}>{s.nombre}</p>
                      <p style={{ color: '#888', fontSize: '12px', margin: '4px 0 0' }}>⏱ {s.duracion}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: '700', fontSize: '16px', margin: 0 }}>R${s.precio}</p>
                      <p style={{ color: '#888', fontSize: '11px', margin: '4px 0 0', cursor: 'pointer' }}>Editar</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {seccion === 'ingresos' && (
              <div>
                <p style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Mis ingresos</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                  {[
                    { label: 'Hoy', valor: 'R$170' },
                    { label: 'Semana', valor: 'R$980' },
                    { label: 'Mes', valor: 'R$3.8k' },
                  ].map((item, i) => (
                    <div key={i} style={{ background: 'white', borderRadius: '14px', padding: '14px', textAlign: 'center' }}>
                      <p style={{ color: '#888', fontSize: '11px', margin: '0 0 6px' }}>{item.label}</p>
                      <p style={{ fontWeight: '700', fontSize: '16px', color: '#000', margin: 0 }}>{item.valor}</p>
                    </div>
                  ))}
                </div>
                {citas.map(cita => (
                  <div key={cita.id} style={{ background: 'white', borderRadius: '14px', padding: '14px 16px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: '600', fontSize: '13px', margin: 0 }}>{cita.cliente}</p>
                      <p style={{ color: '#888', fontSize: '11px', margin: '2px 0 0' }}>{cita.servicio} · {cita.hora}</p>
                    </div>
                    <p style={{ fontWeight: '700', fontSize: '15px', color: '#000', margin: 0 }}>R${cita.precio}</p>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      ) : (
        <div style={{ padding: '24px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '28px', textAlign: 'center', marginBottom: '16px' }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>{disponible ? '🟢' : '⚫'}</div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 8px' }}>
              {disponible ? 'Estás disponible' : 'Estás offline'}
            </h3>
            <p style={{ color: '#888', fontSize: '13px', margin: '0 0 24px', lineHeight: 1.5 }}>
              {disponible ? 'Recibirás solicitudes de clientes cercanos en tiempo real' : 'Activa para recibir solicitudes a domicilio'}
            </p>
            <button onClick={() => setDisponible(!disponible)} style={{ width: '100%', padding: '16px', borderRadius: '14px', border: 'none', background: disponible ? '#ff3b30' : '#000', color: 'white', fontWeight: '700', fontSize: '16px', cursor: 'pointer' }}>
              {disponible ? '🔴 Desconectarme' : '🟢 Ponerme disponible'}
            </button>
          </div>

          {disponible && (
            <div>
              <div style={{ background: '#d4edda', borderRadius: '16px', padding: '20px', textAlign: 'center', marginBottom: '16px' }}>
                <p style={{ fontSize: '20px', margin: '0 0 8px' }}>⏳</p>
                <p style={{ fontWeight: '600', fontSize: '14px', margin: 0, color: '#155724' }}>Esperando solicitudes cercanas...</p>
                <p style={{ color: '#155724', fontSize: '12px', margin: '4px 0 0' }}>Radio de 5 km activo</p>
              </div>
              <div style={{ background: 'white', borderRadius: '16px', padding: '16px' }}>
                <p style={{ fontWeight: '700', fontSize: '14px', margin: '0 0 12px' }}>📊 Stats de hoy</p>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: '700', fontSize: '20px', margin: 0 }}>3</p>
                    <p style={{ color: '#888', fontSize: '11px', margin: '4px 0 0' }}>Servicios</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: '700', fontSize: '20px', margin: 0 }}>R$165</p>
                    <p style={{ color: '#888', fontSize: '11px', margin: '4px 0 0' }}>Ganado</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: '700', fontSize: '20px', margin: 0 }}>4.9 ★</p>
                    <p style={{ color: '#888', fontSize: '11px', margin: '4px 0 0' }}>Rating</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #f0f0f0', display: 'flex', padding: '12px 0 20px' }}>
        <div style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>📅</div>
          <p style={{ fontSize: '10px', color: '#000', fontWeight: '700', margin: '3px 0 0' }}>Agenda</p>
        </div>
        <div style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>💰</div>
          <p style={{ fontSize: '10px', color: '#aaa', margin: '3px 0 0' }}>Ganancias</p>
        </div>
        <div style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>⭐</div>
          <p style={{ fontSize: '10px', color: '#aaa', margin: '3px 0 0' }}>Reseñas</p>
        </div>
        <div onClick={() => navigate('/login')} style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>👤</div>
          <p style={{ fontSize: '10px', color: '#aaa', margin: '3px 0 0' }}>Perfil</p>
        </div>
      </div>

    </div>
  )
}

export default PanelBarbero