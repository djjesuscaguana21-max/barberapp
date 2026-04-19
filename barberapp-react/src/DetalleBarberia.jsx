import { useNavigate, useSearchParams } from 'react-router-dom'

function DetalleBarberia() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const nombre = searchParams.get('nombre') || 'Barberia Alpha'

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh', padding: '32px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        <button onClick={() => window.history.back()} style={{ background: 'none', border: 'none', fontSize: '14px', color: '#888', cursor: 'pointer', marginBottom: '16px', padding: '0' }}>← Volver</button>

        <h2 style={{ marginBottom: '8px' }}>{nombre}</h2>
        <p style={{ color: '#888', marginBottom: '24px' }}>Diadema · SP</p>

        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e0e0e0', marginBottom: '16px' }}>
          <h3 style={{ marginBottom: '16px' }}>Servicios</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}
            onClick={() => navigate(`/agendar?barberia=${encodeURIComponent(nombre)}&servicio=Corte%20clasico`)}>
            <div>
              <p style={{ fontWeight: '500' }}>Corte clásico</p>
              <p style={{ fontSize: '12px', color: '#888' }}>~30 min</p>
            </div>
            <span style={{ fontWeight: '600' }}>R$35</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0', cursor: 'pointer' }}
            onClick={() => navigate(`/agendar?barberia=${encodeURIComponent(nombre)}&servicio=Corte%20%2B%20barba`)}>
            <div>
              <p style={{ fontWeight: '500' }}>Corte + barba</p>
              <p style={{ fontSize: '12px', color: '#888' }}>~50 min</p>
            </div>
            <span style={{ fontWeight: '600' }}>R$55</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', cursor: 'pointer' }}
            onClick={() => navigate(`/agendar?barberia=${encodeURIComponent(nombre)}&servicio=Degrade`)}>
            <div>
              <p style={{ fontWeight: '500' }}>Degradê</p>
              <p style={{ fontSize: '12px', color: '#888' }}>~40 min</p>
            </div>
            <span style={{ fontWeight: '600' }}>R$45</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DetalleBarberia