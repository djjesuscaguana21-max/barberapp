import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', padding: '60px 24px 48px', textAlign: 'center' }}>
        <div style={{ fontSize: '56px', marginBottom: '16px' }}>✂️</div>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '800', margin: '0 0 12px', lineHeight: 1.2 }}>
          BarberApp
        </h1>
        <p style={{ color: '#888', fontSize: '16px', margin: '0 0 8px' }}>
          La app que tu barbería necesita
        </p>
        <p style={{ color: '#f0a500', fontSize: '14px', fontWeight: '600', margin: '0 0 32px' }}>
          ⭐ Gratis los primeros 3 meses
        </p>
        <button
          onClick={() => navigate('/')}
          style={{ background: 'white', color: '#000', border: 'none', borderRadius: '14px', padding: '16px 32px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginRight: '12px' }}>
          Ver demo →
        </button>
        <button
          onClick={() => navigate('/login')}
          style={{ background: 'transparent', color: 'white', border: '1px solid #444', borderRadius: '14px', padding: '16px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
          Soy barbero
        </button>
      </div>

      {/* Problema */}
      <div style={{ padding: '48px 24px', textAlign: 'center', background: '#f9f9f9' }}>
        <p style={{ color: '#f0a500', fontSize: '12px', fontWeight: '700', letterSpacing: '2px', margin: '0 0 12px' }}>EL PROBLEMA</p>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#000', margin: '0 0 16px', lineHeight: 1.3 }}>
          ¿Cuántas veces al día te llaman para preguntar el horario?
        </h2>
        <p style={{ color: '#888', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
          Tus clientes llegan sin cita, esperan sin saber cuánto falta, o se van a otra barbería. Tú tampoco tienes visibilidad real de tu día.
        </p>
      </div>

      {/* Solución */}
      <div style={{ padding: '48px 24px', maxWidth: '480px', margin: '0 auto' }}>
        <p style={{ color: '#000', fontSize: '12px', fontWeight: '700', letterSpacing: '2px', margin: '0 0 12px', textAlign: 'center' }}>LA SOLUCIÓN</p>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#000', margin: '0 0 32px', textAlign: 'center', lineHeight: 1.3 }}>
          BarberApp resuelve todo esto
        </h2>

        {[
          { icon: '📱', titulo: 'El cliente agenda solo', desc: 'Elige barbería, servicio y hora desde su celular. Sin llamadas, sin WhatsApp.' },
          { icon: '📅', titulo: 'Tú ves tu agenda en tiempo real', desc: 'Dashboard con todas tus citas del día, ingresos y clientes.' },
          { icon: '🏠', titulo: 'Modo domicilio on-demand', desc: 'Actívate como disponible y recibe solicitudes de clientes cercanos.' },
          { icon: '💰', titulo: 'Cobra más, organízate mejor', desc: 'Historial de ingresos, estadísticas y gestión de servicios.' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'flex-start' }}>
            <div style={{ width: '48px', height: '48px', background: '#f5f5f5', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0 }}>
              {item.icon}
            </div>
            <div>
              <p style={{ fontWeight: '700', fontSize: '15px', margin: '0 0 4px' }}>{item.titulo}</p>
              <p style={{ color: '#888', fontSize: '13px', margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Precio */}
      <div style={{ padding: '48px 24px', background: '#f9f9f9', textAlign: 'center' }}>
        <p style={{ color: '#000', fontSize: '12px', fontWeight: '700', letterSpacing: '2px', margin: '0 0 12px' }}>PRECIO</p>
        <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#000', margin: '0 0 8px' }}>Simple y justo</h2>
        <p style={{ color: '#888', fontSize: '14px', margin: '0 0 32px' }}>Tú pones tus precios, nosotros cobramos solo un % por cita</p>

        <div style={{ background: 'white', borderRadius: '20px', padding: '28px', maxWidth: '320px', margin: '0 auto 16px', border: '2px solid #000' }}>
          <p style={{ color: '#f0a500', fontSize: '13px', fontWeight: '700', margin: '0 0 8px' }}>🎁 OFERTA DE LANZAMIENTO</p>
          <p style={{ fontSize: '42px', fontWeight: '800', color: '#000', margin: '0 0 4px' }}>Gratis</p>
          <p style={{ color: '#888', fontSize: '13px', margin: '0 0 20px' }}>primeros 3 meses</p>
          {[
            'App para tus clientes',
            'Panel del barbero',
            'Modo domicilio',
            'Dashboard de ingresos',
            'Soporte directo',
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', textAlign: 'left' }}>
              <span style={{ color: '#155724', fontWeight: '700' }}>✓</span>
              <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>{f}</p>
            </div>
          ))}
          <button
            onClick={() => navigate('/login')}
            style={{ width: '100%', background: '#000', color: 'white', border: 'none', borderRadius: '14px', padding: '16px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', marginTop: '20px' }}>
            Registrar mi barbería →
          </button>
        </div>
        <p style={{ color: '#aaa', fontSize: '12px' }}>Después solo 8% por cita agendada. Sin mensualidad fija.</p>
      </div>

      {/* CTA final */}
      <div style={{ padding: '48px 24px', textAlign: 'center', background: '#000' }}>
        <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '800', margin: '0 0 12px' }}>
          ¿Listo para modernizar tu barbería?
        </h2>
        <p style={{ color: '#888', fontSize: '14px', margin: '0 0 28px' }}>
          Únete a las primeras barberías de Diadema en BarberApp
        </p>
        <button
          onClick={() => navigate('/')}
          style={{ background: 'white', color: '#000', border: 'none', borderRadius: '14px', padding: '16px 32px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px', display: 'block', width: '100%', maxWidth: '320px', margin: '0 auto 12px' }}>
          Ver la app en acción →
        </button>
        <p style={{ color: '#666', fontSize: '12px', margin: '16px 0 0' }}>
          BarberApp · Diadema, SP · 2026
        </p>
      </div>

    </div>
  )
}

export default Landing