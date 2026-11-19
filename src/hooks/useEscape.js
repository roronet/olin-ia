import { useEffect } from 'react'

// Llama a `alCerrar` con la tecla Escape mientras `activo` sea true.
export default function useEscape(alCerrar, activo = true) {
  useEffect(() => {
    if (!activo) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') alCerrar()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [alCerrar, activo])
}
