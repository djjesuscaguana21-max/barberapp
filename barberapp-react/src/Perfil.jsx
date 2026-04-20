import { useNavigate } from 'react-router-dom'

function Perfil() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', paddingBottom: '80px' }}>

      <div style={{ background: '#000', padding: '20px 24px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '64px', height: '64px', background: '#333', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>👤</div>
          <div>
            <h2 style={{ color: 'white', margin: 0, fontSize: '20px', fontWeight: '700' }}>Jesus Antonio</h2>
            <p style={{ color: '#888', margin: '4px 0 0', fontSize: '13px' }}>Cliente · Diadema, SP</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px' }}>

        <div style={{ background: 'white', borderRadius: '16px', marginBottom: '16px', overflow: 'hidden' }}>
          {[
            { icon: '📅', label: 'Mis citas', action: () => navigate('/miscitas') },
            { icon: '📍', label: 'Mis direcciones', action: () => {} },
            { icon: '⭐', label: 'Mis favoritos', action: () => {} },
            { icon: '💳', label: 'Métodos de pago', action: () => {} },
          ].map((item, i) => (
            <div key={i} onClick={item.action} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderBottom: i < 3 ? '1px solid #f0f0f0' : 'none', cursor: 'pointer' }}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <p style={{ margin: 0, fontWeight: '500', fontSize: '15px', flex: 1 }}>{item.label}</p>
              <span style={{ color: '#ccc' }}>›</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: '16px', marginBottom: '16px', overflow: 'hidden' }}>
          {[
            { icon: '🔔', label: 'Notificaciones' },
            { icon: '🔒', label: 'Privacidad' },
            { icon: '❓', label: 'Ayuda y soporte' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none', cursor: 'pointer' }}>
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <p style={{ margin: 0, fontWeight: '500', fontSize: '15px', flex: 1 }}>{item.label}</p>
              <span style={{ color: '#ccc' }}>›</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/login')}
          style={{ width: '100%', padding: '16px', borderRadius: '14px', border: '1px solid #f0f0f0', background: 'white', color: '#ff3b30', fontWeight: '600', fontSize: '15px', cursor: 'pointer' }}>
          Cerrar sesión
        </button>

      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'white', borderTop: '1px solid #f0f0f0', display: 'flex', padding: '12px 0 20px' }}>
        <div onClick={() => navigate('/')} style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>🏠</div>
          <p style={{ fontSize: '11px', color: '#888', margin: '4px 0 0' }}>Inicio</p>
        </div>
        <div onClick={() => navigate('/miscitas')} style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>📅</div>
          <p style={{ fontSize: '11px', color: '#888', margin: '4px 0 0' }}>Mis citas</p>
        </div>
        <div style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>💈</div>
          <p style={{ fontSize: '11px', color: '#888', margin: '4px 0 0' }}>A domicilio</p>
        </div>
        <div style={{ flex: 1, textAlign: 'center', cursor: 'pointer' }}>
          <div style={{ fontSize: '22px' }}>👤</div>
          <p style={{ fontSize: '11px', color: '#000', fontWeight: '600', margin: '4px 0 0' }}>Perfil</p>
        </div>
      </div>

    </div>
  )
}

export default Perfil