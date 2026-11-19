import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { api } from '../services/api'

export default function Registro() {
  const [form, setForm] = useState({ nombre: '', correo: '', clave: '', acepto: false })
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [listo, setListo] = useState(false)

  const cambiar = (e) => {
    const { name, type, checked, value } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const enviar = async (e) => {
    e.preventDefault()
    setError('')
    setEnviando(true)
    try {
      await api.registro({ nombre: form.nombre, correo: form.correo, clave: form.clave })
      setListo(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <>
      <PageHero titulo="Crear cuenta">
        <p>Regístrate con un correo electrónico real. Te enviaremos un enlace para confirmarlo.</p>
      </PageHero>
      <section className="auth">
        {listo ? (
          <div className="auth__tarjeta" role="status">
            <h2>Revisa tu correo</h2>
            <p>
              Enviamos un enlace de confirmación a <strong>{form.correo}</strong>. Vence en 24 horas. Si no lo ves, revisa la
              carpeta de spam.
            </p>
            <Link to="/ingresar" className="auth__boton">Ir a ingresar</Link>
          </div>
        ) : (
          <form className="auth__tarjeta" onSubmit={enviar} noValidate>
            <label>
              Nombre completo
              <input name="nombre" value={form.nombre} onChange={cambiar} autoComplete="name" required minLength={2} maxLength={80} />
            </label>
            <label>
              Correo electrónico
              <input name="correo" type="email" value={form.correo} onChange={cambiar} autoComplete="email" required />
            </label>
            <label>
              Contraseña (mínimo 8 caracteres)
              <input name="clave" type="password" value={form.clave} onChange={cambiar} autoComplete="new-password" required minLength={8} maxLength={128} />
            </label>
            <label className="auth__check">
              <input name="acepto" type="checkbox" checked={form.acepto} onChange={cambiar} required />
              <span>Acepto el tratamiento de mis datos personales (nombre y correo) para fines del observatorio.</span>
            </label>
            {error && <p className="auth__error" role="alert">{error}</p>}
            <button type="submit" className="auth__boton" disabled={enviando || !form.acepto}>
              {enviando ? 'Enviando…' : 'Registrarme'}
            </button>
            <p className="auth__pie">¿Ya tienes cuenta? <Link to="/ingresar">Ingresar</Link></p>
          </form>
        )}
      </section>
    </>
  )
}
