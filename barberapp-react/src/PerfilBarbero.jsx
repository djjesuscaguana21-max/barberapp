import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function PerfilBarbero() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const nombreParam = searchParams.get('nombre') || 'Juan Ramirez'
  const [barbero, setBarbero] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [editando, setEditando] = useState(false)
  const [form, setForm] = useState({})

  useEffect(() => {
    fetch('https://barberapp-1-gudl.onrender.com/barberos')
      .then(res => res.json())
      .then(data => {
        const found = data.find(b => b.nombre === nombreParam) || data[0]
        setBarbero(found)
        setForm(found)
        setCargando(false)
      })
      .catch(() => {
        const def = { nombre: nombreParam, especialidad: 'Barbero profesional', estrellas: 4.9, foto: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300', direccion: 'Diadema, SP', bio: 'Barbero profesional con años de experiencia.', modo: 'domicilio' }
        setBarbero(def)
        setForm(def)
        setCargando(false)
      })
  }, [])

  const guardar = () => {
    fetch(`https://barberapp-1-gudl.onrender.com/barberos/${barbero.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => {
      setBarbero(form)
      setEditando(false)
    })
  }

  if (cargando) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><p>Cargando...</p></div>

  return (
    <div style={{ background: '#f7f7f7', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', paddingBottom: '40px' }}>

      {/* Header con foto */}
      <div style={{ position: 'relative' }}>
        <img src={editando ? form.foto : barbero.foto} alt={barbero.nombre} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 100%)' }} />
        <button onClick={() => window.history.back()} style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '20px', padding: '8px 16px', fontSize: '14px', cursor: 'pointer' }}>
          ← Volver
        </button>
        <button onClick={() => setEditando(!editando)} style={{ position: 'absolute', top: '20px', right: '20px', background: editando ? '#ff3b30' : 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', borderRadius: '20px', padding: '8px 16px', fontSize: '14px', cursor: 'pointer' }}>
          {editando ? '✕ Cancelar' : '✏️ Editar'}
        </button>
        <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
          {editando ? (
            <input value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} style={{ width: '100%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', borderRadius: '10px', padding: '10px 14px', fontSize: '20px', fontWeight: '700', marginBottom: '8px', boxSizing: 'border-box' }} />
          ) : (
            <h2 style={{ color: 'white', margin: '0 0 4px', fontSize: '26px', fontWeight: '800' }}>{barbero.nombre}</h2>
          )}
          <p style={{ color: 'rgba(255,255,255,0.8)', margin: '0 0 4px', fontSize: '14px' }}>{editando ? form.especialidad : barbero.especialidad}</p>
          <p style={{ color: '#f0a500', margin: 0, fontSize: '14px' }}>★ {barbero.estrellas} · 230 cortes</p>
        </div>
      </div>

      <div style={{ padding: '20px 20px' }}>

        {editando && (
          <div style={{ background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <p style={{ fontWeight: '700', fontSize: '15px', margin: '0 0 14px', color: '#000' }}>✏️ Editar perfil</p>
            <p style={{ fontSize: '12px', color: '#888', margin: '0 0 6px' }}>URL de foto de perfil</p>
            <input value={form.foto} onChange={e => setForm({...form, foto: e.target.value})} placeholder="https://..." style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e0e0e0', fontSize: '13px', marginBottom: '10px', boxSizing: 'border-box' }} />
            <p style={{ fontSize: '12px', color: '#888', margin: '0 0 6px' }}>Especialidad</p>
            <input value={form.especialidad} onChange={e => setForm({...form, especialidad: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e0e0e0', fontSize: '13px', marginBottom: '10px', boxSizing: 'border-box' }} />
          </div>
        )}

        {/* Sobre mi */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '36px', height: '36px', background: '#f5f5f5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>📝</div>
            <p style={{ fontWeight: '700', fontSize: '15px', margin: 0, color: '#000' }}>Sobre mí</p>
          </div>
          {editando ? (
            <textarea value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} rows={3} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e0e0e0', fontSize: '13px', resize: 'none', boxSizing: 'border-box' }} />
          ) : (
            <p style={{ color: '#555', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>{barbero.bio}</p>
          )}
        </div>

        {/* Direccion */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '36px', height: '36px', background: '#f5f5f5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>📍</div>
            <p style={{ fontWeight: '700', fontSize: '15px', margin: 0, color: '#000' }}>Dirección</p>
          </div>
          {editando ? (
            <input value={form.direccion} onChange={e => setForm({...form, direccion: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #e0e0e0', fontSize: '13px', boxSizing: 'border-box' }} />
          ) : (
            <p style={{ color: '#555', fontSize: '14px', margin: 0 }}>{barbero.direccion}</p>
          )}
        </div>

        {/* Modalidad */}
        <div style={{ background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
            <div style={{ width: '36px', height: '36px', background: '#f5f5f5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🏪</div>
            <p style={{ fontWeight: '700', fontSize: '15px', margin: 0, color: '#000' }}>Modalidad</p>
          </div>
          {editando ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => setForm({...form, modo: 'barberia'})} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: form.modo === 'barberia' ? '#000' : '#f5f5f5', color: form.modo === 'barberia' ? 'white' : '#555', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>🏪 Barbería</button>
              <button onClick={() => setForm({...form, modo: 'domicilio'})} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: form.modo === 'domicilio' ? '#000' : '#f5f5f5', color: form.modo === 'domicilio' ? 'white' : '#555', fontWeight: '600', fontSize: '13px', cursor: 'pointer' }}>🏠 Domicilio</button>
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ color: '#555', fontSize: '14px', margin: 0 }}>
                {barbero.modo === 'barberia' ? '🏪 Trabaja en barbería local' : '🏠 Servicio a domicilio'}
              </p>
              <span style={{ background: '#d4edda', color: '#155724', fontSize: '12px', fontWeight: '600', padding: '6px 12px', borderRadius: '20px' }}>Activo</span>
            </div>
          )}
        </div>

        {editando ? (
          <button onClick={guardar} style={{ width: '100%', background: '#000', color: 'white', border: 'none', borderRadius: '16px', padding: '16px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px' }}>
            💾 Guardar cambios
          </button>
        ) : (
          <>
            <button onClick={() => navigate(`/agendar?barberia=${encodeURIComponent(barbero.nombre)}&servicio=Corte%20clasico`)} style={{ width: '100%', background: '#000', color: 'white', border: 'none', borderRadius: '16px', padding: '16px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginBottom: '12px' }}>
              ✂️ Agendar cita
            </button>
            <button style={{ width: '100%', background: 'white', color: '#000', border: '1px solid #e0e0e0', borderRadius: '16px', padding: '16px', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>
              💬 Enviar mensaje
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default PerfilBarbero