import { useNavigate, useSearchParams } from 'react-router-dom'

function Exito() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const hora = searchParams.get('hora') || '10:30'
  const barberia = searchParams.get('barberia') || 'Barberia Alpha'
  const servicio = searchParams.get('servicio') || 'Corte clasico'

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '400px', width: '100%', textAlign: 'center', padding: '32px' }}>

        <div style={{ width: '80px', height: '80px', background: '#d4edda', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '36px' }}>
          ✓
        </div>

        <h2 style={{ marginBottom: '8px' }}>¡Cita confirmada!</h2>
        <p style={{ color: '#888', marginBottom: '32px', lineHeight: '1.6' }}>
          Tu cita en {barberia} fue agendada para hoy a las {hora}.
        </p>

        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', border: '1px solid #e0e0e0', marginBottom: '24px', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ color: '#888' }}>Barbería</span>
            <span style={{ fontWeight: '600' }}>{barberia}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ color: '#888' }}>Servicio</span>
            <span style={{ fontWeight: '600' }}>{servicio}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
            <span style={{ color: '#888' }}>Hora</span>
            <span style={{ fontWeight: '600' }}>{hora}</span>
          </div>
        </div>

        <button onClick={() => navigate('/')} style={{ width: '100%', background: '#1a1a1a', color: 'white', border: 'none', borderRadius: '16px', padding: '16px', fontSize: '16px', cursor: 'pointer' }}>
          Volver al inicio
        </button>

      </div>
    </div>
  )
}

export default Exito