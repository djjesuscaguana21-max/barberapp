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
  categoria TEXT,
  foto TEXT
)`)

pool.query(`CREATE TABLE IF NOT EXISTS barberos (
  id SERIAL PRIMARY KEY,
  nombre TEXT,
  especialidad TEXT,
  estrellas REAL,
  foto TEXT,
  direccion TEXT,
  bio TEXT,
  modo TEXT DEFAULT 'barberia',
  disponible BOOLEAN DEFAULT false
)`)

pool.query(`CREATE TABLE IF NOT EXISTS clientes (
  id SERIAL PRIMARY KEY,
  nombre TEXT,
  telefono TEXT,
  email TEXT,
  direccion TEXT,
  foto TEXT
)`)

pool.query(`
  INSERT INTO servicios (nombre, duracion, precio, categoria, foto)
  SELECT * FROM (VALUES
    ('Corte clasico', '30 min', 35, 'hombre', 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300'),
    ('Corte + barba', '50 min', 55, 'hombre', 'https://images.unsplash.com/photo-1621605815971-8a2a6c2b2f6b?w=300'),
    ('Degrade', '40 min', 45, 'hombre', 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=300'),
    ('Barba completa', '30 min', 30, 'hombre', 'https://images.unsplash.com/photo-1520897497135-d5f4eaeac3a8?w=300'),
    ('Corte navaja', '45 min', 50, 'hombre', 'https://images.unsplash.com/photo-1593702288056-7cc0e7b71cd5?w=300'),
    ('Corte feminino', '45 min', 55, 'mujer', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=300'),
    ('Escova', '40 min', 45, 'mujer', 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300'),
    ('Tintura', '90 min', 120, 'mujer', 'https://images.unsplash.com/photo-1519699852466-0b8b65f4be7b?w=300'),
    ('Hidratacao', '60 min', 80, 'mujer', 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=300'),
    ('Corte infantil', '20 min', 25, 'infantil', 'https://images.unsplash.com/photo-1519744346361-7a029b427a59?w=300')
  ) AS v(nombre, duracion, precio, categoria, foto)
  WHERE NOT EXISTS (SELECT 1 FROM servicios LIMIT 1)
`)

pool.query(`
  INSERT INTO barberos (nombre, especialidad, estrellas, foto, direccion, bio, modo)
  SELECT * FROM (VALUES
    ('Juan Ramirez', 'Especialista en degradê y cortes modernos', 4.9, 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300', 'Rua das Flores 123, Diadema SP', 'Barbero profesional con 5 años de experiencia. Especializado en cortes modernos y degradê.', 'barberia'),
    ('Miguel Ferreira', 'Experto en barba y cortes clásicos', 4.6, 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300', 'Av. Principal 456, Diadema SP', 'Barbero con 3 años de experiencia. Me especializo en cortes clásicos y arreglo de barba.', 'domicilio')
  ) AS v(nombre, especialidad, estrellas, foto, direccion, bio, modo)
  WHERE NOT EXISTS (SELECT 1 FROM barberos LIMIT 1)
`)

app.get('/barberias', (req, res) => res.json([
  { id: 1, nombre: 'Barberia Alpha', distancia: '0.3 km', estrellas: 4.9, direccion: 'Rua das Flores 123, Diadema SP', foto: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=300' },
  { id: 2, nombre: 'Barber Club', distancia: '0.8 km', estrellas: 4.6, direccion: 'Av. Principal 456, Diadema SP', foto: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300' },
  { id: 3, nombre: 'Studio Corte', distancia: '1.2 km', estrellas: 4.8, direccion: 'Rua Sao Paulo 789, Diadema SP', foto: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=300' },
]))

app.get('/servicios', async (req, res) => {
  const result = await pool.query('SELECT * FROM servicios ORDER BY categoria, precio')
  res.json(result.rows)
})

app.put('/servicios/:id', async (req, res) => {
  const { id } = req.params
  const { precio, nombre, duracion, foto } = req.body
  const result = await pool.query(
    'UPDATE servicios SET precio = COALESCE($1, precio), nombre = COALESCE($2, nombre), duracion = COALESCE($3, duracion), foto = COALESCE($4, foto) WHERE id = $5 RETURNING *',
    [precio, nombre, duracion, foto, id]
  )
  res.json({ mensaje: 'Servicio actualizado', servicio: result.rows[0] })
})

app.post('/servicios', async (req, res) => {
  const { nombre, duracion, precio, categoria, foto } = req.body
  const result = await pool.query(
    'INSERT INTO servicios (nombre, duracion, precio, categoria, foto) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nombre, duracion, precio || 0, categoria, foto || '']
  )
  res.json({ mensaje: 'Servicio agregado', servicio: result.rows[0] })
})

app.delete('/servicios/:id', async (req, res) => {
  await pool.query('DELETE FROM servicios WHERE id = $1', [req.params.id])
  res.json({ mensaje: 'Servicio eliminado' })
})

app.get('/barberos', async (req, res) => {
  const result = await pool.query('SELECT * FROM barberos')
  res.json(result.rows)
})

app.put('/barberos/:id', async (req, res) => {
  const { id } = req.params
  const { nombre, especialidad, direccion, bio, foto, disponible } = req.body
  const result = await pool.query(
    'UPDATE barberos SET nombre = COALESCE($1, nombre), especialidad = COALESCE($2, especialidad), direccion = COALESCE($3, direccion), bio = COALESCE($4, bio), foto = COALESCE($5, foto), disponible = COALESCE($6, disponible) WHERE id = $7 RETURNING *',
    [nombre, especialidad, direccion, bio, foto, disponible, id]
  )
  res.json({ mensaje: 'Barbero actualizado', barbero: result.rows[0] })
})

app.get('/clientes', async (req, res) => {
  const result = await pool.query('SELECT * FROM clientes')
  res.json(result.rows)
})

app.post('/clientes', async (req, res) => {
  const { nombre, telefono, email, direccion } = req.body
  const result = await pool.query(
    'INSERT INTO clientes (nombre, telefono, email, direccion) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre, telefono, email, direccion]
  )
  res.json({ mensaje: 'Cliente registrado', cliente: result.rows[0] })
})

app.put('/clientes/:id', async (req, res) => {
  const { id } = req.params
  const { nombre, telefono, email, direccion, foto } = req.body
  const result = await pool.query(
    'UPDATE clientes SET nombre = COALESCE($1, nombre), telefono = COALESCE($2, telefono), email = COALESCE($3, email), direccion = COALESCE($4, direccion), foto = COALESCE($5, foto) WHERE id = $6 RETURNING *',
    [nombre, telefono, email, direccion, foto, id]
  )
  res.json({ mensaje: 'Cliente actualizado', cliente: result.rows[0] })
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