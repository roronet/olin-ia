import { Router } from 'express'
import argon2 from 'argon2'
import { createHash, randomBytes } from 'node:crypto'
import rateLimit from 'express-rate-limit'
import { z } from 'zod'
import db from '../db.js'
import { enviarVerificacion } from '../mailer.js'

const router = Router()
const COOKIE = 'olin_sesion'
const DIA = 24 * 60 * 60 * 1000
const hash = (t) => createHash('sha256').update(t).digest('hex')
const nuevoToken = () => randomBytes(32).toString('base64url')

const limite = (max) =>
  rateLimit({ windowMs: 15 * 60 * 1000, limit: max, standardHeaders: true, legacyHeaders: false, message: { error: 'Demasiados intentos. Intenta más tarde.' } })

const esquemaRegistro = z.object({
  nombre: z.string().trim().min(2).max(80),
  correo: z.string().trim().toLowerCase().email().max(254),
  clave: z.string().min(8).max(128),
})

const opcionesCookie = () => {
  const prod = process.env.NODE_ENV === 'production'
  return { httpOnly: true, secure: prod, sameSite: prod ? 'none' : 'lax', maxAge: 7 * DIA, path: '/' }
}

async function emitirVerificacion(usuario) {
  const token = nuevoToken()
  db.prepare('UPDATE usuarios SET token_hash = ?, token_expira = ? WHERE id = ?').run(hash(token), Date.now() + DIA, usuario.id)
  const base = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '')
  await enviarVerificacion({ nombre: usuario.nombre, correo: usuario.correo, enlace: `${base}/verificar-correo?token=${token}` })
}

const RESPUESTA_REGISTRO = { ok: true, mensaje: 'Revisa tu correo para confirmar tu cuenta.' }

router.post('/registro', limite(10), async (req, res) => {
  const r = esquemaRegistro.safeParse(req.body)
  if (!r.success) return res.status(400).json({ error: 'Datos inválidos. La contraseña requiere al menos 8 caracteres.' })
  const { nombre, correo, clave } = r.data
  try {
    const existente = db.prepare('SELECT * FROM usuarios WHERE correo = ?').get(correo)
    if (existente) {
      // Respuesta genérica para no revelar si el correo ya existe.
      if (!existente.verificado) await emitirVerificacion(existente)
      return res.json(RESPUESTA_REGISTRO)
    }
    const clave_hash = await argon2.hash(clave, { type: argon2.argon2id })
    const info = db.prepare('INSERT INTO usuarios (nombre, correo, clave_hash) VALUES (?, ?, ?)').run(nombre, correo, clave_hash)
    await emitirVerificacion({ id: info.lastInsertRowid, nombre, correo })
    res.json(RESPUESTA_REGISTRO)
  } catch (e) {
    console.error('registro:', e)
    res.status(500).json({ error: 'No se pudo completar el registro. Intenta de nuevo.' })
  }
})

router.post('/verificar', limite(30), (req, res) => {
  const token = typeof req.body?.token === 'string' ? req.body.token : ''
  if (!token) return res.status(400).json({ error: 'Enlace inválido.' })
  const u = db.prepare('SELECT id, token_expira FROM usuarios WHERE token_hash = ?').get(hash(token))
  if (!u || u.token_expira < Date.now()) return res.status(400).json({ error: 'El enlace es inválido o venció. Solicita uno nuevo.' })
  db.prepare('UPDATE usuarios SET verificado = 1, token_hash = NULL, token_expira = NULL WHERE id = ?').run(u.id)
  res.json({ ok: true })
})

router.post('/reenviar', limite(5), async (req, res) => {
  const correo = z.string().trim().toLowerCase().email().safeParse(req.body?.correo)
  if (correo.success) {
    const u = db.prepare('SELECT * FROM usuarios WHERE correo = ? AND verificado = 0').get(correo.data)
    if (u) await emitirVerificacion(u).catch((e) => console.error('reenviar:', e))
  }
  res.json(RESPUESTA_REGISTRO)
})

router.post('/ingresar', limite(20), async (req, res) => {
  const r = z.object({ correo: z.string().trim().toLowerCase().email(), clave: z.string().min(1).max(128) }).safeParse(req.body)
  if (!r.success) return res.status(400).json({ error: 'Correo o contraseña incorrectos.' })
  const u = db.prepare('SELECT * FROM usuarios WHERE correo = ?').get(r.data.correo)
  const ok = u ? await argon2.verify(u.clave_hash, r.data.clave).catch(() => false) : false
  if (!ok) return res.status(401).json({ error: 'Correo o contraseña incorrectos.' })
  if (!u.verificado) return res.status(403).json({ error: 'Debes confirmar tu correo antes de ingresar.', noVerificado: true })
  const token = nuevoToken()
  db.prepare('INSERT INTO sesiones (token_hash, usuario_id, expira) VALUES (?, ?, ?)').run(hash(token), u.id, Date.now() + 7 * DIA)
  res.cookie(COOKIE, token, opcionesCookie()).json({ usuario: { nombre: u.nombre, correo: u.correo } })
})

router.get('/yo', (req, res) => {
  const token = req.cookies?.[COOKIE]
  if (!token) return res.json({ usuario: null })
  const u = db
    .prepare('SELECT u.nombre, u.correo FROM sesiones s JOIN usuarios u ON u.id = s.usuario_id WHERE s.token_hash = ? AND s.expira > ?')
    .get(hash(token), Date.now())
  res.json({ usuario: u || null })
})

router.post('/salir', (req, res) => {
  const token = req.cookies?.[COOKIE]
  if (token) db.prepare('DELETE FROM sesiones WHERE token_hash = ?').run(hash(token))
  const { maxAge: _maxAge, ...resto } = opcionesCookie()
  res.clearCookie(COOKIE, resto).json({ ok: true })
})

export default router
