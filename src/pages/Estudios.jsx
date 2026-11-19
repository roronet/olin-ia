import PageHero from '../components/PageHero'
import EmptyState from '../components/EmptyState'
import { estudios } from '../data/estudios'

export default function Estudios() {
  return (
    <>
      <PageHero titulo="Estudios" imagen="/assets/images/2.jpg">
        <p>Estudios formales sobre logística inversa catalogados por el observatorio.</p>
      </PageHero>
      <section className="banda">
        <div className="banda__interior">
          {estudios.length === 0 && (
            <EmptyState titulo="Aún no hay contenido publicado en esta sección">
              Cuando el equipo catalogue estudios formales, aparecerán aquí con el mismo formato que las publicaciones.
            </EmptyState>
          )}
        </div>
      </section>
    </>
  )
}
