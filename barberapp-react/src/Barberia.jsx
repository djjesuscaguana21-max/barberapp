import { useNavigate } from 'react-router-dom'

function Barberia({ nombre, distancia, estrellas }) {
  const navigate = useNavigate()

  return (
    <div style={{
      background: 'white',
      border: '1px solid #e0e0e0',
      borderRadius: '16px',
      padding: '20px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px'
    }}>
      <div>
        <h3>{nombre}</h3>
        <p style={{ color: '#888', fontSize: '13px' }}>{distancia}</p>
        <span style={{ color: '#f0a500', fontSize: '13px' }}>{estrellas}</span>
      </div>
      <button
        onClick={() => navigate(`/barberia?nombre=${encodeURIComponent(nombre)}`)}
        style={{
          background: '#1a1a1a',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          padding: '12px 24px',
          cursor: 'pointer'
        }}>
        Agendar
      </button>
    </div>
  )
}

export default Barberia