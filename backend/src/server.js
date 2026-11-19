import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import db from './db.js'
import auth from './routes/auth.js'

const app = express()
const PORT = Number(process.env.PORT) || 3001
const origenes = (process.env.FRONTEND_URL || 'http://localhost:5173').split(',').map((s) => s.trim().replace(/\/$/, ''))

app.set('trust proxy', 1) // detrás de Cloudflare Tunnel
app.use(helmet())
app.use(cors({ origin: origenes, credentials: true }))
app.use(express.json({ limit: '10kb' }))
app.use(cookieParser())

app.get('/api/salud', (_req, res) => res.json({ ok: true }))
app.use('/api/auth', auth)

app.use((_req, res) => res.status(404).json({ error: 'No encontrado' }))

// Limpieza periódica de sesiones vencidas
setInterval(() => db.prepare('DELETE FROM sesiones WHERE expira < ?').run(Date.now()), 60 * 60 * 1000).unref()

app.listen(PORT, () => console.log(`API OLIN IA en http://localhost:${PORT}`))
