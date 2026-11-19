import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useEscape from '../hooks/useEscape'
import useSearch from '../hooks/useSearch'

export default function SearchOverlay({ onCerrar }) {
  const [consulta, setConsulta] = useState('')
  const resultados = useSearch(consulta)
  const entrada = useRef(null)
  useEscape(onCerrar)

  useEffect(() => {
    entrada.current?.focus()
    const previo = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previo
    }
  }, [])

  const grupos = resultados.reduce((acc, r) => {
    ;(acc[r.grupo] ||= []).push(r)
    return acc
  }, {})

  return (
    <div className="busqueda" role="dialog" aria-modal="true" aria-label="Buscar en el observatorio" onMouseDown={(e) => e.target === e.currentTarget && onCerrar()}>
      <div className="busqueda__panel">
        <div className="busqueda__campo">
          <label htmlFor="busqueda-entrada" className="solo-lectores">
            Buscar publicaciones, temas, fuentes y chatbots
          </label>
          <input
            id="busqueda-entrada"
            ref={entrada}
            type="search"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
            placeholder="Busca publicaciones, temas, fuentes o chatbots"
            autoComplete="off"
          />
          <button type="button" className="busqueda__cerrar" onClick={onCerrar} aria-label="Cerrar búsqueda">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
              <path d="M5 5l14 14M19 5 5 19" />
            </svg>
          </button>
        </div>

        <div className="busqueda__resultados" aria-live="polite">
          {!consulta.trim() && <p className="busqueda__ayuda">Escribe una palabra, por ejemplo «textil», «rutas» o «Perplexity».</p>}
          {consulta.trim() && resultados.length === 0 && (
            <p className="busqueda__ayuda">No encontramos resultados para «{consulta}». Prueba con otra palabra o menos términos.</p>
          )}
          {Object.entries(grupos).map(([grupo, lista]) => (
            <section key={grupo}>
              <h2>{grupo}</h2>
              <ul>
                {lista.map((r) => (
                  <li key={r.a}>
                    <Link to={r.a} onClick={onCerrar}>
                      <span>{r.titulo}</span>
                      <small>{r.detalle}</small>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
