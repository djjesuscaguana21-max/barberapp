import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Login() {
  const navigate = useNavigate()
  const [tipo, setTipo] = useState('cliente')

  return (
    <div style={{ background: '#000', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>

      <div style={{ marginBottom: '48px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '12px' }}>✂️</div>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '800', margin: 0 }}>BarberApp</h1>
        <p style={{ color: '#666', fontSize: '14px', margin: '8px 0 0' }}>Tu barbería, a un clic de distancia</p>
      </div>

      <div style={{ width: '100%', maxWidth: '360px' }}>

        <div style={{ display: 'flex', background: '#111', borderRadius: '14px', padding: '4px', marginBottom: '28px' }}>
          <button onClick={() => setTipo('cliente')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: tipo === 'cliente' ? 'white' : 'transparent', color: tipo === 'cliente' ? '#000' : '#666', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
            👤 Cliente
          </button>
          <button onClick={() => setTipo('barbero')} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: tipo === 'barbero' ? 'white' : 'transparent', color: tipo === 'barbero' ? '#000' : '#666', fontWeight: '600', fontSize: '14px', cursor: 'pointer' }}>
            ✂️ Barbero
          </button>
        </div>

        <input placeholder="Tu nombre" style={{ width: '100%', padding: '16px', borderRadius: '14px', border: 'none', background: '#111', color: 'white', fontSize: '15px', marginBottom: '12px', boxSizing: 'border-box' }} />

        <input placeholder="Teléfono o email" style={{ width: '100%', padding: '16px', borderRadius: '14px', border: 'none', background: '#111', color: 'white', fontSize: '15px', marginBottom: '24px', boxSizing: 'border-box' }} />

        <button
          onClick={() => tipo === 'cliente' ? navigate('/') : navigate('/panelbarbero')}
          style={{ width: '100%', padding: '16px', borderRadius: '14px', border: 'none', background: 'white', color: '#000', fontWeight: '700', fontSize: '16px', cursor: 'pointer', marginBottom: '16px' }}>
          {tipo === 'cliente' ? 'Entrar como cliente' : 'Entrar como barbero'}
        </button>

        <p style={{ color: '#444', fontSize: '13px', textAlign: 'center' }}>
          Al continuar aceptas los términos de uso de BarberApp
        </p>

      </div>
    </div>
  )
}

export default Login