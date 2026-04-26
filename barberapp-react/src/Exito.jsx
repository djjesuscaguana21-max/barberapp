import { useNavigate, useSearchParams } from 'react-router-dom'

function Exito() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const hora = searchParams.get('hora') || '10:30'
  const barberia = searchParams.get('barberia') || 'Barberia Alpha'
  const servicio = searchParams.get('servicio') || 'Corte clasico'
  const fecha = searchParams.get('fecha') || new Date().toISOString().split('T')[0]

  const fechaFormateada = new Date(fecha + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>

      <div style={{ width: '80px', height: '80px', background: '#d4edda', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', marginBottom: '20px' }}>✓</div>

      <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#000', margin: '0 0 8px', textAlign: 'center' }}>¡Cita confirmada!</h2>
      <p style={{ color: '#888', fontSize: '14px', margin: '0 0 32px', textAlign: 'center' }}>Tu cita ha sido agendada exitosamente</p>

      <div style={{ background: 'white', borderRadius: '20px', padding: '20px', width: '100%', maxWidth: '360px', marginBottom: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
        {[
          { icon: '✂️', label: 'Barbería', value: barberia },
          { icon: '💈', label: 'Servicio', value: servicio },
          { icon: '📅', label: 'Fecha', value: fechaFormateada },
          { icon: '🕐', label: 'Hora', value: hora },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < 3 ? '1px solid #f5f5f5' : 'none' }}>
            <div style={{ width: '32px', height: '32px', background: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 }}>
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: '#888', fontSize: '11px', margin: 0, textTransform: 'uppercase' }}>{item.label}</p>
              <p style={{ fontWeight: '600', fontSize: '14px', margin: '2px 0 0', color: '#000' }}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => navigate('/')} style={{ width: '100%', maxWidth: '360px', background: '#000', color: 'white', border: 'none', borderRadius: '16px', padding: '16px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px' }}>
        Volver al inicio
      </button>

      <button onClick={() => navigate('/miscitas')} style={{ width: '100%', maxWidth: '360px', background: 'white', color: '#000', border: '1px solid #e0e0e0', borderRadius: '16px', padding: '16px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
        Ver mis citas
      </button>

    </div>
  )
}

export default Exito