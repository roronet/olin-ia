import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import TaxonomyTree from '../components/TaxonomyTree'

export default function Temas() {
  const [params, setParams] = useSearchParams()
  const seleccion = useMemo(() => (params.get('cat') ? params.get('cat').split('|') : []), [params])

  const elegir = (ruta) => setParams({ cat: ruta.join('|') }, { replace: true, preventScrollReset: true })

  return (
    <>
      <PageHero titulo="Temas" imagen="/assets/images/1.jpg">
        <p>
          Explora las categorías del observatorio, de Nivel 1 (grandes temas) a Nivel 3 (indicadores específicos).
          Elige un tema para ver sus subtemas y, dentro de cada uno, las publicaciones y estudios relacionados.
        </p>
      </PageHero>

      <section className="banda">
        <div className="banda__interior">
          <TaxonomyTree seleccion={seleccion} onElegir={elegir} />
        </div>
      </section>
    </>
  )
}
