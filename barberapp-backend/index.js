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
  fecha TEXT
)`)

const barberias = [
  { id: 1, nombre: 'Barberia Alpha', distancia: '0.3 km', estrellas: 4.9 },
  { id: 2, nombre: 'Barber Club', distancia: '0.8 km', estrellas: 4.6 },
  { id: 3, nombre: 'Studio Corte', distancia: '1.2 km', estrellas: 4.8 },
]

app.get('/barberias', (req, res) => {
  res.json(barberias)
})

app.get('/citas', async (req, res) => {
  const result = await pool.query('SELECT * FROM citas')
  res.json(result.rows)
})

app.post('/citas', async (req, res) => {
  const { barberia, servicio, hora, fecha } = req.body
  const result = await pool.query(
    'INSERT INTO citas (barberia, servicio, hora, fecha) VALUES ($1, $2, $3, $4) RETURNING *',
    [barberia, servicio, hora, fecha]
  )
  res.json({ mensaje: 'Cita guardada', cita: result.rows[0] })
})

app.listen(3000, () => {
  console.log('Servidor corriendo')
})