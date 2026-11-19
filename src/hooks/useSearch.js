import { useMemo } from 'react'
import { publicaciones } from '../data/publicaciones'
import { taxonomia } from '../data/taxonomia'
import { fuentesDatos } from '../data/fuentesDatos'
import { chatbots } from '../data/chatbots'

export const normalizar = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

// Índice plano construido una sola vez a partir de los datos del sitio.
function construirIndice() {
  const items = []

  publicaciones.forEach((p) =>
    items.push({
      grupo: 'Publicaciones',
      titulo: p.titulo,
      detalle: p.autores.join(', '),
      a: `/publicaciones?ver=${encodeURIComponent(p.codigo)}`,
      texto: [p.titulo, p.autores.join(' '), p.codigo, p.resumen].join(' '),
    }),
  )

  taxonomia.forEach((n1) => {
    items.push({
      grupo: 'Temas',
      titulo: n1.nombre,
      detalle: 'Tema de Nivel 1',
      a: `/temas?cat=${encodeURIComponent(n1.nombre)}`,
      texto: n1.nombre,
    })
    n1.hijos.forEach((n2) => {
      items.push({
        grupo: 'Temas',
        titulo: n2.nombre,
        detalle: n1.nombre,
        a: `/temas?cat=${encodeURIComponent([n1.nombre, n2.nombre].join('|'))}`,
        texto: n2.nombre,
      })
      n2.hijos.forEach((n3) =>
        items.push({
          grupo: 'Temas',
          titulo: n3,
          detalle: `${n1.nombre} / ${n2.nombre}`,
          a: `/temas?cat=${encodeURIComponent([n1.nombre, n2.nombre, n3].join('|'))}`,
          texto: n3,
        }),
      )
    })
  })

  fuentesDatos.forEach((f) =>
    items.push({
      grupo: 'Fuentes de datos abiertos',
      titulo: f.nombre,
      detalle: f.categoria,
      a: `/insumos/fuentes-de-datos#${f.id}`,
      texto: [f.nombre, f.ofrece, f.categoria].join(' '),
    }),
  )

  chatbots.forEach((c) =>
    items.push({
      grupo: 'Chatbots de IA',
      titulo: c.nombre,
      detalle: c.tipologia,
      a: `/insumos/chatbots#bot-${c.rank}`,
      texto: [c.nombre, c.tipologia, c.funciones.join(' ')].join(' '),
    }),
  )

  return items.map((it) => ({ ...it, clave: normalizar(it.texto) }))
}

export default function useSearch(consulta) {
  const indice = useMemo(() => construirIndice(), [])
  return useMemo(() => {
    const terminos = normalizar(consulta).split(/\s+/).filter(Boolean)
    if (!terminos.length) return []
    return indice.filter((it) => terminos.every((t) => it.clave.includes(t))).slice(0, 30)
  }, [consulta, indice])
}
