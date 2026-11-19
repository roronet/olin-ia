import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useEscape from '../hooks/useEscape'

const principales = [
  { a: '/temas', texto: 'Temas' },
  { a: '/insumos', texto: 'Insumos y Análisis' },
  { a: '/estudios', texto: 'Estudios' },
  { a: '/publicaciones', texto: 'Publicaciones' },
]

const menuCompleto = [
  { a: '/', texto: 'Inicio', fin: true },
  { a: '/quienes-somos', texto: '¿Quiénes somos?' },
  ...principales,
  { a: '/insumos/fuentes-de-datos', texto: 'Fuentes de datos abiertos', sub: true },
  { a: '/insumos/chatbots', texto: 'Chatbots de IA', sub: true },
]

export default function Header({ onBuscar }) {
  const [abierto, setAbierto] = useState(false)
  const cerrar = () => setAbierto(false)
  useEscape(cerrar, abierto)
  const contenedor = useRef(null)

  useEffect(() => {
    if (!abierto) return undefined
    const fuera = (e) => {
      if (contenedor.current && !contenedor.current.contains(e.target)) setAbierto(false)
    }
    document.addEventListener('pointerdown', fuera)
    return () => document.removeEventListener('pointerdown', fuera)
  }, [abierto])

  return (
    <header className="cabecera">
      <div className="cabecera__barra">
        <Link to="/" className="cabecera__logo" aria-label="OLIN IA, ir al inicio" onClick={cerrar}>
          <img src="/assets/images/olin-ia-logo.png" alt="OLIN IA – Observatorio de Logística Inversa utilizando Inteligencia Artificial" />
        </Link>

        <nav className="cabecera__nav" aria-label="Principal">
          {principales.map((l) => (
            <NavLink key={l.a} to={l.a} className="cabecera__enlace">
              {l.texto}
            </NavLink>
          ))}
        </nav>

        <button type="button" className="cabecera__icono" onClick={onBuscar} aria-label="Buscar en el observatorio">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="M15.5 15.5 21 21" />
          </svg>
        </button>

        <div className="cabecera__desplegable" ref={contenedor}>
          <button
            type="button"
            className="cabecera__icono"
            aria-expanded={abierto}
            aria-controls="menu-completo"
            aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setAbierto((v) => !v)}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
              {abierto ? <path d="M5 5l14 14M19 5 5 19" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
          <nav id="menu-completo" className="menu" aria-label="Menú completo" hidden={!abierto}>
            <ul>
              {menuCompleto.map((l) => (
                <li key={l.a} className={l.sub ? 'menu__sub' : undefined}>
                  <NavLink to={l.a} end={l.fin} onClick={cerrar}>
                    {l.texto}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
