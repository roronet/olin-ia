import { Navigate, useNavigate } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { useAuth } from '../context/AuthContext'

export default function Cuenta() {
  const { usuario, salir } = useAuth()
  const navegar = useNavigate()
  if (!usuario) return <Navigate to="/ingresar" replace />

  return (
    <>
      <PageHero titulo="Mi cuenta" />
      <section className="auth">
        <div className="auth__tarjeta">
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Correo:</strong> {usuario.correo}</p>
          <p>Todo el contenido del observatorio es de acceso público; tu cuenta no modifica la plataforma.</p>
          <button type="button" className="auth__boton" onClick={async () => { await salir(); navegar('/') }}>
            Cerrar sesión
          </button>
        </div>
      </section>
    </>
  )
}
