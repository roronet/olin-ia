import PageHero from '../components/PageHero'
import facultad from '../assets/img/Facultad.jpg'
import { presentacion, mision, vision, valores, quehacemos } from '../data/institucional'

export default function QuienesSomos() {
  return (
    <>
      <PageHero titulo="¿Quiénes somos?" imagen="/assets/images/4.jpg">
        <p>Conoce al equipo, la misión y los valores detrás del Observatorio de Logística Inversa utilizando Inteligencia Artificial.</p>
      </PageHero>

      <section className="banda">
        <div className="banda__interior institucional">
          <img className="institucional__foto" src={facultad} alt="Edificio de la Facultad de Ingeniería Industrial, UNMSM" />
          <p className="institucional__texto">{presentacion}</p>
        </div>
      </section>

      <section className="banda banda--profunda" aria-label="Misión y visión">
        <div className="banda__interior mision-vision">
          <article>
            <img className="ilustracion" src="/assets/images/mision.png" alt="" />
            <h2>Misión</h2>
            <p>{mision}</p>
          </article>
          <article>
            <img className="ilustracion" src="/assets/images/vision.png" alt="" />
            <h2>Visión</h2>
            <p>{vision}</p>
          </article>
        </div>
      </section>

      <section className="banda" aria-labelledby="valores">
        <div className="banda__interior">
          <h2 id="valores">Nuestros valores</h2>
          <ul className="valores">
            {valores.map((v) => (
              <li key={v.nombre}>
                <h3>{v.nombre}</h3>
                <p>{v.texto}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="banda banda--profunda" aria-labelledby="que-hacemos">
        <div className="banda__interior">
          <h2 id="que-hacemos">¿Qué hacemos?</h2>
          <ol className="pasos">
            {quehacemos.map((p) => (
              <li key={p.nombre}>
                <h3>{p.nombre}</h3>
                <p>{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="afiliacion">
        <img src="/assets/images/olin-ia-logo.png" alt="OLIN IA" />
        <p>
          Una iniciativa del grupo de investigación Producción más Limpia, Facultad de Ingeniería Industrial, Universidad
          Nacional Mayor de San Marcos.
        </p>
        <img src="/assets/images/unmsm-logo.png" alt="Universidad Nacional Mayor de San Marcos, Facultad de Ingeniería Industrial y Grupo de Investigación Producción Más Limpia" />
      </section>
    </>
  )
}
