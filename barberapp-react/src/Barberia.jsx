import { useNavigate } from 'react-router-dom'

function Barberia({ nombre, distancia, estrellas, direccion, foto }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/barberia?nombre=${encodeURIComponent(nombre)}&direccion=${encodeURIComponent(direccion || 'Diadema, SP')}`)}
      style={{
        background: 'white',
        border: '1px solid #f0f0f0',
        borderRadius: '16px',
        marginBottom: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>

      {foto && (
        <img src={foto} alt={nombre} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
      )}

      <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontWeight: '700', fontSize: '15px', color: '#000', margin: '0 0 4px' }}>{nombre}</p>
          <p style={{ color: '#888', fontSize: '13px', margin: '0 0 4px' }}>📍 {distancia}</p>
          <p style={{ color: '#f0a500', fontSize: '12px', margin: 0 }}>★ {estrellas}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '12px', color: '#888', margin: '0 0 8px' }}>~10 min</p>
          <div style={{ background: '#000', color: 'white', borderRadius: '8px', padding: '8px 14px', fontSize: '12px', fontWeight: '600' }}>
            Agendar
          </div>
        </div>
      </div>
    </div>
  )
}

export default Barberia