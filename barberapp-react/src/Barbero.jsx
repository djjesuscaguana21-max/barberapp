import { useNavigate } from 'react-router-dom'

function Barbero({ nombre, especialidad, estrellas, foto, direccion }) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/perfilbarbero?nombre=${encodeURIComponent(nombre)}`)}
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

      <img
        src={foto || 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100'}
        alt={nombre}
        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      />

      <div style={{ flex: 1 }}>
        <p style={{ fontWeight: '700', fontSize: '15px', color: '#000', margin: '0 0 4px' }}>{nombre}</p>
        <p style={{ color: '#888', fontSize: '13px', margin: '0 0 4px' }}>{especialidad}</p>
        <p style={{ color: '#f0a500', fontSize: '12px', margin: 0 }}>★ {estrellas}</p>
      </div>

      <div style={{ textAlign: 'right' }}>
        <p style={{ fontSize: '12px', color: '#888', margin: '0 0 8px' }}>A domicilio</p>
        <div style={{ background: '#000', color: 'white', borderRadius: '8px', padding: '8px 14px', fontSize: '12px', fontWeight: '600' }}>
          Solicitar
        </div>
      </div>

    </div>
  )
}

export default Barbero