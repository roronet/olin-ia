import { useEffect, useRef } from 'react'
import useEscape from '../hooks/useEscape'

// Ventana modal: se cierra con la X, Escape o un clic en el fondo; devuelve el foco al cerrar.
export default function Modal({ titulo, onCerrar, children }) {
  const cierre = useRef(null)
  useEscape(onCerrar)

  useEffect(() => {
    const previo = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    cierre.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      previo?.focus?.()
    }
  }, [])

  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onCerrar()}>
      <div className="modal__caja" role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
        <button ref={cierre} type="button" className="modal__cerrar" onClick={onCerrar} aria-label="Cerrar detalle">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
            <path d="M5 5l14 14M19 5 5 19" />
          </svg>
        </button>
        <h2 id="modal-titulo">{titulo}</h2>
        {children}
      </div>
    </div>
  )
}
