import { formatoFecha } from '../data/categorias'
import EmptyState from './EmptyState'

// Lista de contenido (publicaciones, videos, imágenes) vinculado a una categoría.
export default function ContenidoEtiquetado({ nombre, items }) {
  return (
    <section className="etiquetado" aria-live="polite" aria-labelledby="etiquetado-titulo">
      <h2 id="etiquetado-titulo">Contenido etiquetado con «{nombre}»</h2>
      {items.length === 0 ? (
        <EmptyState titulo="Aún no hay contenido en esta categoría">
          Elige otra categoría o revisa las publicaciones del observatorio.
        </EmptyState>
      ) : (
        <ul className="etiquetado__lista">
          {items.map((it) => (
            <li key={it.codigo}>
              <span className="etiqueta etiqueta--lima">{it.tipo}</span>
              <h3>{it.titulo}</h3>
              <p>
                {it.autores.join(', ')}
                {(it.publicacion || it.recepcion) && (
                  <>
                    {' · '}
                    {it.publicacion ? `Publicado el ${formatoFecha(it.publicacion)}` : `Recibido el ${formatoFecha(it.recepcion)}`}
                  </>
                )}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
