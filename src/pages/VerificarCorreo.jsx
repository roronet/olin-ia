import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { api } from '../services/api'

export default function VerificarCorreo() {
  const [params] = useSearchParams()
  const token = params.get('token')
  const [estado, setEstado] = useState(token ? 'cargando' : 'error')
  const [mensaje, setMensaje] = useState(token ? '' : 'Enlace inválido.')
  const lanzado = useRef(false)

  useEffect(() => {
    if (!token || lanzado.current) return
    lanzado.current = true // el token es de un solo uso: evita doble llamada en StrictMode
    api
      .verificar(token)
      .then(() => setEstado('ok'))
      .catch((err) => {
        setEstado('error')
        setMensaje(err.message)
      })
  }, [token])

  return (
    <>
      <PageHero titulo="Confirmación de correo" />
      <section className="auth">
        <div className="auth__tarjeta" role="status">
          {estado === 'cargando' && <p>Confirmando tu correo…</p>}
          {estado === 'ok' && (
            <>
              <h2>¡Correo confirmado!</h2>
              <p>Tu cuenta está activa.</p>
              <Link to="/ingresar" className="auth__boton">Ingresar</Link>
            </>
          )}
          {estado === 'error' && (
            <>
              <h2>No se pudo confirmar</h2>
              <p className="auth__error">{mensaje}</p>
              <Link to="/ingresar" className="auth__boton">Ir a ingresar</Link>
            </>
          )}
        </div>
      </section>
    </>
  )
}
