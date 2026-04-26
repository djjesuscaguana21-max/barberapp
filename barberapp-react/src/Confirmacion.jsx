import { useNavigate, useSearchParams } from 'react-router-dom'

function Confirmacion() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const hora = searchParams.get('hora') || '10:30'
  const barberia = searchParams.get('barberia') || 'Barberia Alpha'
  const servicio = searchParams.get('servicio') || 'Corte clasico'
  const fecha = searchParams.get('fecha') || new Date().toISOString().split('T')[0]

  const confirmarCita = () => {
    fetch('https://barberapp-1-gudl.onrender.com/citas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ barberia, servicio, hora, fecha, cliente: 'Cliente' })
    })
    .then(res => res.json())
    .then(() => navigate(`/exito?hora=${hora}&barberia=${encodeURIComponent(barberia)}&servicio=${encodeURIComponent(servicio)}&fecha=${fecha}`))
  }

  const fechaFormateada = new Date(fecha + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', paddingBottom: '32px' }}>

      <div style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', padding: '20px 24px 28px' }}>
        <button onClick={() => window.history.back()} style={{ background: 'none', border: 'none', color: '#888', fontSize: '14px', cursor: 'pointer', padding: '0 0 12px' }}>← Volver</button>
        <h2 style={{ color: 'white', margin: 0, fontSize: '20px', fontWeight: '700' }}>Confirmar cita</h2>
        <p style={{ color: '#888', margin: '4px 0 0', fontSize: '13px' }}>Revisa los detalles antes de confirmar</p>
      </div>

      <div style={{ padding: '24px' }}>

        <div style={{ background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <p style={{ fontWeight: '700', fontSize: '15px', margin: '0 0 16px', color: '#000' }}>Resumen de tu cita</p>
          
          {[
            { icon: '✂️', label: 'Barbería', value: barberia },
            { icon: '💈', label: 'Servicio', value: servicio },
            { icon: '📅', label: 'Fecha', value: fechaFormateada },
            { icon: '🕐', label: 'Hora', value: hora },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: i < 3 ? '1px solid #f5f5f5' : 'none' }}>
              <div style={{ width: '36px', height: '36px', background: '#f5f5f5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#888', fontSize: '11px', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</p>
                <p style={{ fontWeight: '600', fontSize: '14px', margin: '2px 0 0', color: '#000' }}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#f0f0f0', borderRadius: '14px', padding: '14px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '16px' }}>🔔</span>
          <p style={{ color: '#555', fontSize: '13px', margin: 0 }}>Recibirás un recordatorio antes de tu cita</p>
        </div>

        <button
          onClick={confirmarCita}
          style={{ width: '100%', background: '#000', color: 'white', border: 'none', borderRadius: '16px', padding: '16px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>
          ✓ Confirmar cita
        </button>

      </div>
    </div>
  )
}

export default Confirmacion