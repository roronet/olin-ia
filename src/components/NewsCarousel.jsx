import { noticias } from '../data/noticias'
import useCarousel from '../hooks/useCarousel'

const Flecha = ({ izquierda }) => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={izquierda ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
  </svg>
)

export default function NewsCarousel() {
  const { indice, ir, siguiente, anterior, setPausado, gestos } = useCarousel(noticias.length)

  return (
    <section
      className="carrusel"
      aria-roledescription="carrusel"
      aria-label="Últimas noticias de la industria"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
      {...gestos}
    >
      <div className="carrusel__pista" style={{ transform: `translateX(-${indice * 100}%)` }} aria-live="off">
        {noticias.map((n, i) => (
          <article
            key={n.id}
            className="carrusel__slide"
            role="group"
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${noticias.length}`}
            aria-hidden={i !== indice}
            style={n.imagen ? { '--slide-imagen': `url(${n.imagen})` } : undefined}
          >
            <div className="carrusel__texto">
              <span className="carrusel__etiqueta">Noticias de la industria</span>
              <h2>{n.titulo}</h2>
              <p>{n.descripcion}</p>
            </div>
          </article>
        ))}
      </div>

      <button type="button" className="carrusel__flecha carrusel__flecha--izq" onClick={anterior} aria-label="Noticia anterior">
        <Flecha izquierda />
      </button>
      <button type="button" className="carrusel__flecha carrusel__flecha--der" onClick={siguiente} aria-label="Noticia siguiente">
        <Flecha />
      </button>

      <div className="carrusel__puntos">
        {noticias.map((n, i) => (
          <button
            key={n.id}
            type="button"
            className={i === indice ? 'activo' : undefined}
            onClick={() => ir(i)}
            aria-label={`Ir a la noticia ${i + 1}`}
            aria-current={i === indice}
          />
        ))}
      </div>
    </section>
  )
}
