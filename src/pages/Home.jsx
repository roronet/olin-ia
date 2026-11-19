import { Link } from 'react-router-dom'
import NewsCarousel from '../components/NewsCarousel'
import { taxonomia } from '../data/taxonomia'
import { publicaciones } from '../data/publicaciones'
import { videos } from '../data/videos'
import { imagenes } from '../data/imagenes'
import { formatoFecha } from '../data/categorias'
import { mision, vision } from '../data/institucional'

const accesos = [
  { a: '/temas', titulo: 'Temas', texto: 'Explora el árbol de categorías de Nivel 1, 2 y 3.', foto: '/assets/images/1.jpg' },
  { a: '/publicaciones', titulo: 'Publicaciones', texto: 'Artículos de opinión catalogados por el observatorio.', foto: '/assets/images/3.jpg' },
  { a: '/estudios', titulo: 'Estudios', texto: 'Estudios formales sobre logística inversa.', foto: '/assets/images/2.jpg' },
  { a: '/insumos', titulo: 'Insumos y Análisis', texto: 'Fuentes de datos abiertos y chatbots de IA para la investigación.', foto: '/assets/images/5.jpg' },
]

const pilares = [
  {
    titulo: 'Recuperar',
    texto: 'Productos, envases y residuos regresan desde el consumidor hacia la cadena de suministro.',
    imagen: '/assets/images/recuperar.png',
  },
  {
    titulo: 'Reciclar',
    texto: 'Los materiales, como las fibras textiles, se clasifican, reparan o transforman para tener una nueva vida.',
    imagen: '/assets/images/reciclar.png',
  },
  {
    titulo: 'Reintegrar',
    texto: 'Lo recuperado vuelve al mercado y cierra el ciclo de la economía circular.',
    imagen: '/assets/images/reintegrar.png',
  },
]

// Las publicaciones con fecha de publicación van primero; si faltan, completa con las más recientes recibidas.
function ultimasPublicaciones() {
  const clave = (p) => p.publicacion ?? p.recepcion ?? ''
  const ordenadas = [...publicaciones].sort((a, b) => clave(b).localeCompare(clave(a)))
  const conFecha = ordenadas.filter((p) => p.publicacion)
  return (conFecha.length >= 3 ? conFecha : [...conFecha, ...ordenadas.filter((p) => !p.publicacion)]).slice(0, 3)
}

export default function Home() {
  const estadisticas = [
    { n: taxonomia.length, etiqueta: 'grandes temas de estudio' },
    { n: publicaciones.length, etiqueta: 'publicaciones' },
    { n: videos.length, etiqueta: videos.length === 1 ? 'video' : 'videos' },
    { n: imagenes.length, etiqueta: imagenes.length === 1 ? 'imagen' : 'imágenes' },
  ].filter((e) => e.n > 0)

  return (
    <>
      <NewsCarousel />

      <section className="hero banda banda--profunda">
        <div className="banda__interior hero__interior">
          <div>
            <h1>Observatorio de Logística Inversa utilizando Inteligencia Artificial</h1>
            <p className="hero__texto">
              Reunimos, clasificamos y difundimos conocimiento sobre logística inversa, con énfasis en el sector textil, para
              impulsar cadenas de suministro más eficientes y sostenibles.
            </p>
            <div className="hero__botones">
              <Link className="boton" to="/temas">
                Explorar temas
              </Link>
              <Link className="boton boton--borde" to="/publicaciones">
                Ver publicaciones
              </Link>
            </div>
          </div>
          <dl className="cifras">
            {estadisticas.map((e) => (
              <div key={e.etiqueta}>
                <dd>{e.n}</dd>
                <dt>{e.etiqueta}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="banda" aria-labelledby="que-es">
        <div className="banda__interior">
          <div className="banda__cabecera que-es__cabecera">
            <h2 id="que-es">¿Qué es la logística inversa?</h2>
            <p>
              Es el flujo de regreso de bienes y materiales: del consumidor hacia el productor, para darles un nuevo uso en
              lugar de convertirlos en residuo.
            </p>
          </div>
          <div className="pilares">
            {pilares.map((p) => (
              <article className="pilar" key={p.titulo}>
                <img className="ilustracion" src={p.imagen} alt="" />
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="banda banda--profunda" aria-labelledby="mision-vision">
        <div className="banda__interior mv">
          <h2 id="mision-vision">Misión y Visión</h2>
          <div className="mv__bloques">
            <div>
              <h3>Misión</h3>
              <p>{mision}</p>
            </div>
            <div className="mv__der">
              <h3>Visión</h3>
              <p>{vision}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="banda" aria-labelledby="explora">
        <div className="banda__interior">
          <div className="banda__cabecera">
            <h2 id="explora">Explora el observatorio</h2>
          </div>
          <div className="accesos">
            {accesos.map((c) => (
              <Link key={c.a} to={c.a} className="acceso" style={{ '--foto': `url(${c.foto})` }}>
                <h3>{c.titulo}</h3>
                <p>{c.texto}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="banda banda--profunda" aria-labelledby="ultimas">
        <div className="banda__interior">
          <div className="banda__cabecera cabecera-fila">
            <h2 id="ultimas">Últimas publicaciones</h2>
            <Link to="/publicaciones" className="enlace-ver">
              Ver todas
            </Link>
          </div>
          <div className="publicaciones">
            {ultimasPublicaciones().map((p) => {
              const fecha = p.publicacion ? formatoFecha(p.publicacion) : null
              return (
                <article className="publicacion" key={p.codigo}>
                  <h3>
                    <Link to={`/publicaciones?ver=${encodeURIComponent(p.codigo)}`}>{p.titulo}</Link>
                  </h3>
                  <p className="publicacion__meta">
                    {p.autores.join(', ')}
                    {fecha && <span> · {fecha}</span>}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
