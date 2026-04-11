import { useNavigate } from 'react-router-dom'

function AgendarCita() {
  const navigate = useNavigate()

  const horarios = [
    { hora: '09:00', disponible: false },
    { hora: '09:30', disponible: false },
    { hora: '10:00', disponible: true },
    { hora: '10:30', disponible: true },
    { hora: '11:00', disponible: true },
    { hora: '11:30', disponible: false },
    { hora: '14:00', disponible: true },
    { hora: '14:30', disponible: true },
    { hora: '15:00', disponible: true },
  ]

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh', padding: '32px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        <button
          onClick={() => window.history.back()}
          style={{ background: 'none', border: 'none', fontSize: '14px', color: '#888', cursor: 'pointer', marginBottom: '16px', padding: '0' }}>
          ← Volver
        </button>

        <h2 style={{ marginBottom: '8px' }}>Elegir horario</h2>
        <p style={{ color: '#888', marginBottom: '24px' }}>Barbería Alpha · Corte clásico</p>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #e0e0e0',
          marginBottom: '16px'
        }}>
          <h3 style={{ marginBottom: '16px' }}>Horarios disponibles</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {horarios.map((h) => (
              <button
                key={h.hora}
                disabled={!h.disponible}
                style={{
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #e0e0e0',
                  background: h.disponible ? 'white' : '#f5f5f5',
                  color: h.disponible ? '#1a1a1a' : '#bbbbbb',
                  cursor: h.disponible ? 'pointer' : 'not-allowed',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                {h.hora}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate('/confirmacion')}
          style={{
            width: '100%',
            background: '#1a1a1a',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            padding: '16px',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
          Confirmar horario →
        </button>

      </div>
    </div>
  )
}export default AgendarCita