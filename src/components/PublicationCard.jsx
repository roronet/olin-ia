import { formatoFecha } from '../data/categorias'

export default function PublicationCard({ publicacion: p, onVer }) {
  const fecha = p.publicacion
    ? `Publicado el ${formatoFecha(p.publicacion)}`
    : p.recepcion
      ? `Recibido el ${formatoFecha(p.recepcion)}`
      : null

  return (
    <article className="publicacion">
      <p className="publicacion__codigo">{p.codigo}</p>
      <h3>{p.titulo}</h3>
      <p className="publicacion__meta">
        {p.autores.join(', ')}
        {fecha && <span> · {fecha}</span>}
      </p>
      {p.categoria && (
        <p>
          <span className="etiqueta">{p.categoria.n2 ?? p.categoria.n1}</span>
        </p>
      )}
      <button type="button" className="boton boton--borde" onClick={() => onVer(p)}>
        Ver detalle
      </button>
    </article>
  )
}
