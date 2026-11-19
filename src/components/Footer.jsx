import { Link } from 'react-router-dom'
const instituciones = '/assets/images/unmsm-logo.png'

const anio = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="pie">
      <div className="pie__fila">
        <img
          className="pie__logos"
          src={instituciones}
          alt="Universidad Nacional Mayor de San Marcos, Facultad de Ingeniería Industrial y Grupo de Investigación Producción Más Limpia"
        />
        <div className="pie__legal">
          <p>
            <strong>OLIN IA</strong> – Observatorio de Logística Inversa utilizando Inteligencia Artificial.
          </p>
          <p>
            Grupo de investigación Producción más Limpia · Facultad de Ingeniería Industrial · UNMSM, Lima, Perú.
          </p>
          <p>
            © {anio} OLIN IA. Todos los derechos reservados. · <Link to="/quienes-somos">Conoce al observatorio</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
