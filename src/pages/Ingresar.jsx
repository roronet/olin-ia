import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

export default function Ingresar() {
  const { usuario, ingresar } = useAuth()
  const navegar = useNavigate()
  const [form, setForm] = useState({ correo: '', clave: '' })
  const [error, setError] = useState('')
  const [noVerificado, setNoVerificado] = useState(false)
  const [aviso, setAviso] = useState('')
  const [enviando, setEnviando] = useState(false)

  if (usuario) return <Navigate to="/cuenta" replace />

  const cambiar = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const enviar = async (e) => {
    e.preventDefault()
    setError('')
    setAviso('')
    setNoVerificado(false)
    setEnviando(true)
    try {
      await ingresar(form)
      navegar('/cuenta')
    } catch (err) {
      setError(err.message)
      setNoVerificado(Boolean(err.datos?.noVerificado))
    } finally {
      setEnviando(false)
    }
  }

  const reenviar = async () => {
    try {
      const d = await api.reenviar(form.correo)
      setAviso(d.mensaje)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <>
      <PageHero titulo="Ingresar">
        <p>Accede con tu correo confirmado.</p>
      </PageHero>
      <section className="auth">
        <form className="auth__tarjeta" onSubmit={enviar}>
          <label>
            Correo electrónico
            <input name="correo" type="email" value={form.correo} onChange={cambiar} autoComplete="email" required />
          </label>
          <label>
            Contraseña
            <input name="clave" type="password" value={form.clave} onChange={cambiar} autoComplete="current-password" required />
          </label>
          {error && <p className="auth__error" role="alert">{error}</p>}
          {noVerificado && (
            <button type="button" className="auth__enlace" onClick={reenviar}>Reenviar correo de confirmación</button>
          )}
          {aviso && <p className="auth__ok" role="status">{aviso}</p>}
          <button type="submit" className="auth__boton" disabled={enviando}>
            {enviando ? 'Ingresando…' : 'Ingresar'}
          </button>
          <p className="auth__pie">¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
        </form>
      </section>
    </>
  )
}
