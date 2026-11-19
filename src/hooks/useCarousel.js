import { useCallback, useEffect, useRef, useState } from 'react'

// Carrusel circular con avance automático, pausa y gesto de deslizar.
export default function useCarousel(total, { intervalo = 5000 } = {}) {
  const [indice, setIndice] = useState(0)
  const [pausado, setPausado] = useState(false)
  const inicioX = useRef(null)

  const ir = useCallback((i) => setIndice(((i % total) + total) % total), [total])
  const siguiente = useCallback(() => setIndice((i) => (i + 1) % total), [total])
  const anterior = useCallback(() => setIndice((i) => (i - 1 + total) % total), [total])

  useEffect(() => {
    if (pausado || total < 2) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const id = setTimeout(siguiente, intervalo)
    return () => clearTimeout(id)
  }, [indice, pausado, total, intervalo, siguiente])

  const gestos = {
    onTouchStart: (e) => {
      inicioX.current = e.touches[0].clientX
      setPausado(true)
    },
    onTouchEnd: (e) => {
      const dx = e.changedTouches[0].clientX - (inicioX.current ?? 0)
      if (Math.abs(dx) > 40) (dx < 0 ? siguiente : anterior)()
      inicioX.current = null
      setPausado(false)
    },
  }

  return { indice, ir, siguiente, anterior, setPausado, gestos }
}
