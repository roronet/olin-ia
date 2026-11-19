import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { fuentesDatos } from '../data/fuentesDatos'

export default function FuentesDatos() {
  return (
    <>
      <PageHero titulo="Fuentes de datos abiertos" imagen="/assets/images/5.jpg">
        <p>Repositorios y catálogos públicos útiles para la investigación en logística inversa.</p>
      </PageHero>
      <section className="banda">
        <div className="banda__interior">
          <Link to="/insumos" className="volver">
            Volver a Insumos y Análisis
          </Link>
          <p className="nota">
            Son repositorios externos, cada uno con sus propias condiciones de acceso. OLIN IA no aloja estos datos: cada
            tarjeta enlaza al sitio original, que se abre en una pestaña nueva.
          </p>

          <div className="fuentes">
            {fuentesDatos.map((f) => (
              <article className="fuente" id={f.id} key={f.id}>
                <span className="etiqueta">{f.categoria}</span>
                <h2>{f.nombre}</h2>
                <p>{f.ofrece}</p>
                {f.utilidad && (
                  <p>
                    <strong>Utilidad para OLIN IA:</strong> {f.utilidad}
                  </p>
                )}
                <p className="fuente__acceso">
                  <span className={`etiqueta${f.api ? ' etiqueta--lima' : ''}`}>
                    {f.api ? 'API pública usable desde el navegador' : 'Sin API usable desde el navegador'}
                  </span>
                  <span>
                    <strong>Acceso a datos:</strong> {f.acceso}
                  </span>
                </p>
                <a className="boton" href={f.url} target="_blank" rel="noopener noreferrer">
                  Visitar sitio
                  <span className="solo-lectores"> (se abre en una pestaña nueva)</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
