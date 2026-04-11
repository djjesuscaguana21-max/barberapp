import { useNavigate } from 'react-router-dom'

 function DetalleBarberia() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh', padding: '32px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        <button
          onClick={() => window.history.back()}
          style={{ background: 'none', border: 'none', fontSize: '14px', color: '#888', cursor: 'pointer', marginBottom: '16px', padding: '0' }}>
          ← Volver
        </button>

        <h2 style={{ marginBottom: '8px' }}>Barbería Alpha</h2>
        <p style={{ color: '#888', marginBottom: '24px' }}>0.3 km · Diadema</p>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid #e0e0e0',
          marginBottom: '16px'
        }}>
          <h3 style={{ marginBottom: '16px' }}>Servicios</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
            <span>Corte clásico</span>
            <span style={{ fontWeight: '600' }}>R$35</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
            <span>Corte + barba</span>
            <span style={{ fontWeight: '600' }}>R$55</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
            <span>Degradê</span>
            <span style={{ fontWeight: '600' }}>R$45</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/agendar')}
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
          Agendar cita →
        </button>

      </div>
    </div>
  )
}

export default DetalleBarberia