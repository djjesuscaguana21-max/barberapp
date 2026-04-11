import { useNavigate } from 'react-router-dom'

function Confirmacion() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh', padding: '32px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        <button
          onClick={() => window.history.back()}
          style={{ background: 'none', border: 'none', fontSize: '14px', color: '#888', cursor: 'pointer', marginBottom: '16px', padding: '0' }}>
          ← Volver
        </button>

        <h2 style={{ marginBottom: '24px' }}>Confirmar cita</h2>

        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e0e0e0', marginBottom: '16px' }}>
          <h3 style={{ marginBottom: '16px' }}>Resumen</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ color: '#888' }}>Barbería</span>
            <span style={{ fontWeight: '600' }}>Barbería Alpha</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ color: '#888' }}>Servicio</span>
            <span style={{ fontWeight: '600' }}>Corte clásico</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ color: '#888' }}>Fecha</span>
            <span style={{ fontWeight: '600' }}>Hoy</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
            <span style={{ color: '#888' }}>Hora</span>
            <span style={{ fontWeight: '600' }}>10:30</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
            <span style={{ color: '#888' }}>Total</span>
            <span style={{ fontWeight: '700', fontSize: '18px' }}>R$35</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/exito')}
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
          Confirmar cita ✓
        </button>

      </div>
    </div>
  )
}export default Confirmacion