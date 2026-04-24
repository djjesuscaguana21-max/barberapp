
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function PanelBarbero() {
  const navigate = useNavigate()
  const [modo, setModo] = useState('barberia')
  const [disponible, setDisponible] = useState(false)
  const [seccion, setSeccion] = useState('dashboard')
  const [citas, setCitas] = useState([])
  const [servicios, setServicios] = useState([])
  const [nuevoServicio, setNuevoServicio] = useState({ nombre: '', duracion: '', precio: '', categoria: 'hombre' })
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  useEffect(() => {
    fetch('https://barberapp-1-gudl.onrender.com/citas')
      .then(res => res.json())
      .then(data => setCitas(data))
    fetch('https://barberapp-1-gudl.onrender.com/servicios')
      .then(res => res.json())
      .then(data => setServicios(data))
  }, [])

  const cancelarCita = (id) => {
    fetch(`https://barberapp-1-gudl.onrender.com/citas/${id}`, { method: 'DELETE' })
      .then(() => setCitas(citas.filter(c => c.id !== id)))
  }

  const actualizarPrecio = (id, nuevoPrecio) => {
    fetch(`https://barberapp-1-gudl.onrender.com/servicios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ precio: parseInt(nuevoPrecio) })
    }).then(() => {
      setServicios(prev => prev.map(s => s.id === id ? { ...s, precio: parseInt(nuevoPrecio) } : s))
    })
  }

  const agregarServicio = () => {
    if (!nuevoServicio.nombre || !nuevoServicio.precio) return
    fetch('https://barberapp-1-gudl.onrender.com/servicios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoServicio)
    })
      .then(res => res.json())
      .then(data => {
        setServicios([...servicios, data.servicio])
        setNuevoServicio({ nombre: '', duracion: '', precio: '', categoria: 'hombre' })
        setMostrarFormulario(false)
      })
  }

  const eliminarServicio = (id) => {
    fetch(`https://barberapp-1-gudl.onrender.com/servicios/${id}`, { method: 'DELETE' })
      .then(() => setServicios(servicios.filter(s => s.id !== id)))
  }

  const ingresoTotal = citas.reduce((a, c) => {
    const servicio = servicios.find(s => s.nombre === c.servicio)
    return a + (servicio ? servicio.precio : 0)
  }, 0)

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
                    <p style={{ color: '#888', fontSize: '11px', margin: '0 0 6px', textTransform: 'uppercase' }}>Citas totales</p>
                    <p style={{ fontSize: '28px', fontWeight: '700', color: '#000', margin: 0 }}>{citas.length}</p>
                  </div>
                  <div style={{ background: 'white', borderRadius: '16px', padding: '16px' }}>
                    <p style={{ color: '#888', fontSize: '11px', margin: '0 0 6px', textTransform: 'uppercase' }}>Ingresos est.</p>
                    <p style={{ fontSize: '22px', fontWeight: '700', color: '#000', margin: 0 }}>R${ingresoTotal}</p>
                  </div>
                  <div style={{ background: 'white', borderRadius: '16px', padding: '16px' }}>
                    <p style={{ color: '#888', fontSize: '11px', margin: '0 0 6px', textTransform: 'uppercase' }}>Confirmadas</p>
                    <p style={{ fontSize: '28px', fontWeight: '700', color: '#155724', margin: 0 }}>{citas.filter(c => c.estado === 'confirmada').length}</p>
                  </div>
                  <div style={{ background: 'white', borderRadius: '16px', padding: '16px' }}>
                    <p style={{ color: '#888', fontSize: '11px', margin: '0 0 6px', textTransform: 'uppercase' }}>Rating</p>
                    <p style={{ fontSize: '24px', fontWeight: '700', color: '#f0a500', margin: 0 }}>★ 4.9</p>
                  </div>
                </div>
                {citas.length > 0 && (
                  <div>
                    <p style={{ fontSize: '16px', fontWeight: '700', marginBottom: '12px' }}>Próxima cita</p>
                    <div style={{ background: 'white', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ background: '#000', borderRadius: '12px', padding: '10px 14px', textAlign: 'center' }}>
                        <p style={{ color: 'white', fontWeight: '700', fontSize: '14px', margin: 0 }}>{citas[0].hora}</p>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: '600', fontSize: '14px', margin: 0 }}>{citas[0].cliente || 'Cliente'}</p>
                        <p style={{ color: '#888', fontSize: '12px', margin: '4px 0 0' }}>{citas[0].servicio} · {citas[0].barberia}</p>
                      </div>
                      <button style={{ background: '#000', color: 'white', border: 'none', borderRadius: '10px', padding: '8px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                        Iniciar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {seccion === 'agenda' && (
              <div>
                <p style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Todas las citas</p>
                {citas.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '32px', color: '#888' }}>
                    <p style={{ fontSize: '32px' }}>📅</p>
                    <p>No hay citas aún</p>
                  </div>
                ) : (
                  citas.map(cita => (
                    <div key={cita.id} style={{ background: 'white', borderRadius: '16px', padding: '16px', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ background: '#000', borderRadius: '12px', padding: '10px 14px', textAlign: 'center', minWidth: '52px' }}>
                          <p style={{ color: 'white', fontWeight: '700', fontSize: '14px', margin: 0 }}>{cita.hora}</p>
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: '600', fontSize: '14px', margin: 0 }}>{cita.cliente || 'Cliente'}</p>
                          <p style={{ color: '#888', fontSize: '12px', margin: '4px 0 0' }}>{cita.servicio} · {cita.fecha}</p>
                          <p style={{ color: '#888', fontSize: '12px', margin: '2px 0 0' }}>{cita.barberia}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                          <span style={{ background: '#d4edda', color: '#155724', fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '20px' }}>
                            ✓ {cita.estado}
                          </span>
                          <button onClick={() => cancelarCita(cita.id)} style={{ background: '#fff0f0', color: '#ff3b30', border: 'none', borderRadius: '8px', padding: '4px 10px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}>
                            Cancelar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {seccion === 'servicios' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <p style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>Mis servicios</p>
                  <button onClick={() => setMostrarFormulario(!mostrarFormulario)} style={{ background: '#000', color: 'white', border: 'none', borderRadius: '10px', padding: '8px 14px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                    {mostrarFormulario ? 'Cancelar' : '+ Agregar'}
                  </button>
                </div>

                {mostrarFormulario && (
                  <div style={{ background: 'white', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
                    <p style={{ fontWeight: '700', fontSize: '14px', margin: '0 0 12px' }}>Nuevo servicio</p>
                    <input placeholder="Nombre del servicio" value={nuevoServicio.nombre} onChange={e => setNuevoServicio({...nuevoServicio, nombre: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e0e0e0', fontSize: '14px', marginBottom: '8px', boxSizing: 'border-box' }} />
                    <input placeholder="Duración (ej: 30 min)" value={nuevoServicio.duracion} onChange={e => setNuevoServicio({...nuevoServicio, duracion: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e0e0e0', fontSize: '14px', marginBottom: '8px', boxSizing: 'border-box' }} />
                    <input type="number" placeholder="Precio en R$" value={nuevoServicio.precio} onChange={e => setNuevoServicio({...nuevoServicio, precio: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e0e0e0', fontSize: '14px', marginBottom: '8px', boxSizing: 'border-box' }} />
                    <select value={nuevoServicio.categoria} onChange={e => setNuevoServicio({...nuevoServicio, categoria: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e0e0e0', fontSize: '14px', marginBottom: '12px', boxSizing: 'border-box' }}>
                      <option value="hombre">👨 Hombre</option>
                      <option value="mujer">👩 Mujer</option>
                      <option value="infantil">👦 Infantil</option>
                    </select>
                    <button onClick={agregarServicio} style={{ width: '100%', background: '#000', color: 'white', border: 'none', borderRadius: '12px', padding: '12px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                      Guardar servicio
                    </button>
                  </div>
                )}

                {['hombre', 'mujer', 'infantil'].map(cat => (
                  <div key={cat}>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: '#888', textTransform: 'uppercase', margin: '16px 0 8px' }}>
                      {cat === 'hombre' ? '👨 Hombre' : cat === 'mujer' ? '👩 Mujer' : '👦 Infantil'}
                    </p>
                    {servicios.filter(s => s.categoria === cat).map((s) => (
                      <div key={s.id} style={{ background: 'white', borderRadius: '14px', padding: '14px 16px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontWeight: '600', fontSize: '14px', margin: 0 }}>{s.nombre}</p>
                          <p style={{ color: '#888', fontSize: '12px', margin: '4px 0 0' }}>⏱ {s.duracion}</p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#888', fontSize: '12px' }}>R$</span>
                          <input
                            type="number"
                            defaultValue={s.precio}
                            style={{ width: '65px', padding: '6px 8px', borderRadius: '8px', border: '1px solid #e0e0e0', fontSize: '14px', fontWeight: '700', textAlign: 'center' }}
                            onBlur={(e) => actualizarPrecio(s.id, e.target.value)}
                          />
                          <button onClick={() => eliminarServicio(s.id)} style={{ background: '#fff0f0', color: '#ff3b30', border: 'none', borderRadius: '8px', padding: '6px 8px', fontSize: '12px', cursor: 'pointer' }}>🗑</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {seccion === 'ingresos' && (
              <div>
                <p style={{ fontSize: '16px', fontWeight: '700', marginBottom: '16px' }}>Mis ingresos</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                  {[
                    { label: 'Total', valor: `R$${ingresoTotal}` },
                    { label: 'Citas', valor: citas.length },
                    { label: 'Rating', valor: '4.9 ★' },
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
                      <p style={{ fontWeight: '600', fontSize: '13px', margin: 0 }}>{cita.cliente || 'Cliente'}</p>
                      <p style={{ color: '#888', fontSize: '11px', margin: '2px 0 0' }}>{cita.servicio} · {cita.hora}</p>
                    </div>
                    <p style={{ fontWeight: '700', fontSize: '15px', color: '#000', margin: 0 }}>
                      R${servicios.find(s => s.nombre === cita.servicio)?.precio || '?'}
                    </p>
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
                    <p style={{ fontWeight: '700', fontSize: '20px', margin: 0 }}>{citas.length}</p>
                    <p style={{ color: '#888', fontSize: '11px', margin: '4px 0 0' }}>Servicios</p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontWeight: '700', fontSize: '20px', margin: 0 }}>R${ingresoTotal}</p>
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