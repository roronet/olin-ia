import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import PublicationCard from '../components/PublicationCard'
import Modal from '../components/Modal'
import EmptyState from '../components/EmptyState'
import { publicaciones } from '../data/publicaciones'
import { formatoFecha } from '../data/categorias'

export default function Publicaciones() {
  const [params, setParams] = useSearchParams()
  const [categoria, setCategoria] = useState('')
  const abierta = publicaciones.find((p) => p.codigo === params.get('ver')) ?? null

  const categorias = useMemo(
    () => [...new Set(publicaciones.filter((p) => p.categoria).map((p) => p.categoria.n2 ?? p.categoria.n1))],
    [],
  )
  const visibles = categoria
    ? publicaciones.filter((p) => p.categoria && (p.categoria.n2 ?? p.categoria.n1) === categoria)
    : publicaciones

  const ver = (p) => setParams({ ver: p.codigo })
  const cerrar = () => setParams({})

  return (
    <>
      <PageHero titulo="Publicaciones" imagen="/assets/images/3.jpg">
        <p>Artículos de opinión catalogados por el observatorio.</p>
      </PageHero>

      <section className="banda">
        <div className="banda__interior">
          <div className="filtro">
            <label htmlFor="filtro-categoria">Filtrar por categoría</label>
            <select id="filtro-categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="">Todas las categorías</option>
              {categorias.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <p className="filtro__conteo" aria-live="polite">
              {visibles.length} {visibles.length === 1 ? 'publicación' : 'publicaciones'}
            </p>
          </div>

          {visibles.length === 0 ? (
            <EmptyState titulo="Aún no hay contenido en esta categoría">Prueba con otra categoría.</EmptyState>
          ) : (
            <div className="publicaciones">
              {visibles.map((p) => (
                <PublicationCard key={p.codigo} publicacion={p} onVer={ver} />
              ))}
            </div>
          )}
        </div>
      </section>

      {abierta && (
        <Modal titulo={abierta.titulo} onCerrar={cerrar}>
          <dl className="detalle__meta">
            <div>
              <dt>Código</dt>
              <dd>{abierta.codigo}</dd>
            </div>
            <div>
              <dt>{abierta.autores.length > 1 ? 'Autores' : 'Autor'}</dt>
              <dd>{abierta.autores.join('; ')}</dd>
            </div>
            {abierta.recepcion && (
              <div>
                <dt>Recepción</dt>
                <dd>{formatoFecha(abierta.recepcion)}</dd>
              </div>
            )}
            {abierta.publicacion && (
              <div>
                <dt>Publicación</dt>
                <dd>{formatoFecha(abierta.publicacion)}</dd>
              </div>
            )}
            {abierta.categoria && (
              <div>
                <dt>Categoría</dt>
                <dd>{[abierta.categoria.n1, abierta.categoria.n2, abierta.categoria.n3].filter(Boolean).join(' / ')}</dd>
              </div>
            )}
          </dl>

          {abierta.imagen && <img className="detalle__imagen" src={abierta.imagen} alt="" />}

          <h3>Resumen</h3>
          <p>{abierta.resumen ?? 'Resumen no disponible por el momento.'}</p>

          {abierta.pdf ? (
            <a className="boton" href={abierta.pdf} download>
              Descargar PDF
            </a>
          ) : (
            <button type="button" className="boton" disabled>
              PDF no disponible
            </button>
          )}
        </Modal>
      )}
    </>
  )
}
