import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function AgendarCita() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const barberia = searchParams.get('barberia') || 'Barberia Alpha'
  const servicio = searchParams.get('servicio') || 'Corte clasico'
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null)
  const [horarios, setHorarios] = useState([])
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    fetch('https://barberapp-1-gudl.onrender.com/horarios/1')
      .then(res => res.json())
      .then(data => {
        const slots = generarSlots(data.hora_inicio, data.hora_fin)
        setHorarios(slots)
      })
      .catch(() => {
        setHorarios(generarSlots('09:00', '19:00'))
      })
  }, [])

  const generarSlots = (inicio, fin) => {
    const slots = []
    let [h, m] = inicio.split(':').map(Number)
    const [hFin, mFin] = fin.split(':').map(Number)
    while (h < hFin || (h === hFin && m < mFin)) {
      slots.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`)
      m += 30
      if (m >= 60) { m = 0; h++ }
    }
    return slots
  }

  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  const hoy = new Date()
  const dias = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(hoy)
    d.setDate(hoy.getDate() + i)
    return d
  })

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', paddingBottom: '32px' }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', padding: '20px 24px 28px' }}>
        <button onClick={() => window.history.back()} style={{ background: 'none', border: 'none', color: '#888', fontSize: '14px', cursor: 'pointer', padding: '0 0 12px' }}>← Volver</button>
        <h2 style={{ color: 'white', margin: 0, fontSize: '20px', fontWeight: '700' }}>Elegir horario</h2>
        <p style={{ color: '#888', margin: '4px 0 0', fontSize: '13px' }}>{barberia} · {servicio}</p>
      </div>

      <div style={{ padding: '20px 24px' }}>

        {/* Selector de fecha */}
        <p style={{ fontSize: '14px', fontWeight: '700', color: '#000', margin: '0 0 12px' }}>Selecciona un día</p>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }}>
          {dias.map((dia, i) => {
            const fechaStr = dia.toISOString().split('T')[0]
            const seleccionado = fechaStr === fechaSeleccionada
            return (
              <div key={i} onClick={() => setFechaSeleccionada(fechaStr)} style={{ flexShrink: 0, width: '56px', padding: '10px 0', borderRadius: '14px', textAlign: 'center', background: seleccionado ? '#000' : 'white', cursor: 'pointer', border: seleccionado ? 'none' : '1px solid #e0e0e0' }}>
                <p style={{ fontSize: '11px', color: seleccionado ? '#888' : '#aaa', margin: '0 0 4px', fontWeight: '500' }}>{diasSemana[dia.getDay()]}</p>
                <p style={{ fontSize: '18px', fontWeight: '700', color: seleccionado ? 'white' : '#000', margin: 0 }}>{dia.getDate()}</p>
              </div>
            )
          })}
        </div>

        {/* Horarios */}
        <p style={{ fontSize: '14px', fontWeight: '700', color: '#000', margin: '0 0 12px' }}>Horarios disponibles</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
          {horarios.map((hora) => (
            <button
              key={hora}
              onClick={() => setHorarioSeleccionado(hora)}
              style={{
                padding: '14px 0',
                borderRadius: '12px',
                border: horarioSeleccionado === hora ? 'none' : '1px solid #e0e0e0',
                background: horarioSeleccionado === hora ? '#000' : 'white',
                color: horarioSeleccionado === hora ? 'white' : '#1a1a1a',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}>
              {hora}
            </button>
          ))}
        </div>

        {horarioSeleccionado && (
          <div style={{ background: '#f0f0f0', borderRadius: '12px', padding: '12px 16px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: '13px', color: '#555' }}>Horario seleccionado</p>
            <p style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#000' }}>{fechaSeleccionada} · {horarioSeleccionado}</p>
          </div>
        )}

        <button
          onClick={() => navigate(`/confirmacion?hora=${horarioSeleccionado}&barberia=${encodeURIComponent(barberia)}&servicio=${encodeURIComponent(servicio)}&fecha=${fechaSeleccionada}`)}
          disabled={!horarioSeleccionado}
          style={{
            width: '100%',
            background: horarioSeleccionado ? '#000' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            padding: '16px',
            fontSize: '16px',
            fontWeight: '700',
            cursor: horarioSeleccionado ? 'pointer' : 'not-allowed'
          }}>
          Confirmar horario →
        </button>

      </div>
    </div>
  )
}

export default AgendarCita