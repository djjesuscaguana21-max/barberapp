import { useNavigate } from 'react-router-dom'

function Barberia({ nombre, distancia, estrellas }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/barberia?nombre=${encodeURIComponent(nombre)}`)}
      style={{
        background: 'white',
        border: '1px solid #f0f0f0',
        borderRadius: '16px',
        padding: '16px',
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>

      <div style={{
        width: '56px', height: '56px', background: '#000',
        borderRadius: '14px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: '24px', flexShrink: 0
      }}>
        ✂️
      </div>

      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: '700', fontSize: '15px', color: '#000', margin: '0 0 4px' }}>{nombre}</p>
        <p style={{ color: '#888', fontSize: '13px', margin: '0 0 4px' }}>📍 {distancia}</p>
        <p style={{ color: '#f0a500', fontSize: '12px', margin: 0 }}>★ {estrellas}</p>
      </div>

      <div style={{ textAlign: 'right' }}>
        <p style={{ fontSize: '12px', color: '#888', margin: '0 0 8px' }}>~10 min</p>
        <div style={{ background: '#000', color: 'white', borderRadius: '8px', padding: '6px 12px', fontSize: '12px', fontWeight: '600' }}>
          Agendar
        </div>
      </div>

    </div>
  )
}

export default Barberia