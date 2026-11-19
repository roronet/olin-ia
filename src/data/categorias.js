import { publicaciones } from './publicaciones'
import { videos } from './videos'
import { imagenes } from './imagenes'

// Contenido de cualquier tipo, con una etiqueta de tipo para mostrarlo junto.
export const contenido = [
  ...publicaciones.map((p) => ({ ...p, tipo: 'Publicación' })),
  ...videos.map((v) => ({ ...v, tipo: 'Video' })),
  ...imagenes.map((i) => ({ ...i, tipo: 'Imagen' })),
]

// Una categoría se identifica con la ruta [n1, n2?, n3?].
export function coincideCategoria(item, ruta) {
  const c = item.categoria
  if (!c || !ruta.length) return false
  const [n1, n2, n3] = ruta
  if (c.n1 !== n1) return false
  if (n2 && c.n2 !== n2) return false
  if (n3 && c.n3 !== n3) return false
  return true
}

export function contenidoDe(ruta) {
  return contenido.filter((item) => coincideCategoria(item, ruta))
}

export function formatoFecha(iso) {
  if (!iso) return null
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
