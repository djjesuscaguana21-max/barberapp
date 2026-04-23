const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const app = express()
app.use(cors())
app.use(express.json())

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
})

pool.query(`CREATE TABLE IF NOT EXISTS citas (
  id SERIAL PRIMARY KEY,
  barberia TEXT,
  servicio TEXT,
  hora TEXT,
  fecha TEXT,
  cliente TEXT,
  estado TEXT DEFAULT 'confirmada'
)`)

pool.query(`CREATE TABLE IF NOT EXISTS servicios (
  id SERIAL PRIMARY KEY,
  nombre TEXT,
  duracion TEXT,
  precio INTEGER,
  categoria TEXT
)`)

pool.query(`
  INSERT INTO servicios (nombre, duracion, precio, categoria)
  SELECT * FROM (VALUES
    ('Corte clasico', '30 min', 35, 'hombre'),
    ('Corte + barba', '50 min', 55, 'hombre'),
    ('Degrade', '40 min', 45, 'hombre'),
    ('Barba completa', '30 min', 30, 'hombre'),
    ('Corte navaja', '45 min', 50, 'hombre'),
    ('Corte feminino', '45 min', 55, 'mujer'),
    ('Escova', '40 min', 45, 'mujer'),
    ('Tintura', '90 min', 120, 'mujer'),
    ('Hidratacao', '60 min', 80, 'mujer'),
    ('Corte infantil', '20 min', 25, 'infantil')
  ) AS v(nombre, duracion, precio, categoria)
  WHERE NOT EXISTS (SELECT 1 FROM servicios LIMIT 1)
`)

const barberias = [
  { id: 1, nombre: 'Barberia Alpha', distancia: '0.3 km', estrellas: 4.9 },
  { id: 2, nombre: 'Barber Club', distancia: '0.8 km', estrellas: 4.6 },
  { id: 3, nombre: 'Studio Corte', distancia: '1.2 km', estrellas: 4.8 },
]

app.get('/barberias', (req, res) => res.json(barberias))

app.get('/servicios', async (req, res) => {
  const result = await pool.query('SELECT * FROM servicios ORDER BY categoria, precio')
  res.json(result.rows)
})

app.put('/servicios/:id', async (req, res) => {
  const { id } = req.params
  const { precio, nombre, duracion } = req.body
  const result = await pool.query(
    'UPDATE servicios SET precio = COALESCE($1, precio), nombre = COALESCE($2, nombre), duracion = COALESCE($3, duracion) WHERE id = $4 RETURNING *',
    [precio, nombre, duracion, id]
  )
  res.json({ mensaje: 'Servicio actualizado', servicio: result.rows[0] })
})

app.post('/servicios', async (req, res) => {
  const { nombre, duracion, precio, categoria } = req.body
  const result = await pool.query(
    'INSERT INTO servicios (nombre, duracion, precio, categoria) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre, duracion, precio, categoria]
  )
  res.json({ mensaje: 'Servicio agregado', servicio: result.rows[0] })
})

app.delete('/servicios/:id', async (req, res) => {
  await pool.query('DELETE FROM servicios WHERE id = $1', [req.params.id])
  res.json({ mensaje: 'Servicio eliminado' })
})

app.get('/citas', async (req, res) => {
  const result = await pool.query('SELECT * FROM citas ORDER BY fecha DESC, hora ASC')
  res.json(result.rows)
})

app.post('/citas', async (req, res) => {
  const { barberia, servicio, hora, fecha, cliente } = req.body
  const result = await pool.query(
    'INSERT INTO citas (barberia, servicio, hora, fecha, cliente, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [barberia, servicio, hora, fecha, cliente || 'Cliente', 'confirmada']
  )
  res.json({ mensaje: 'Cita guardada', cita: result.rows[0] })
})

app.put('/citas/:id', async (req, res) => {
  const { id } = req.params
  const { estado } = req.body
  const result = await pool.query(
    'UPDATE citas SET estado = $1 WHERE id = $2 RETURNING *',
    [estado, id]
  )
  res.json({ mensaje: 'Cita actualizada', cita: result.rows[0] })
})

app.delete('/citas/:id', async (req, res) => {
  await pool.query('DELETE FROM citas WHERE id = $1', [req.params.id])
  res.json({ mensaje: 'Cita cancelada' })
})

app.listen(3000, () => console.log('Servidor corriendo'))