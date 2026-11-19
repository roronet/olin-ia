import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { chatbots, chatbotsNota } from '../data/chatbots'

export default function Chatbots() {
  return (
    <>
      <PageHero titulo="Chatbots de IA para la investigación" imagen="/assets/images/5.jpg">
        <p>Asistentes de inteligencia artificial útiles para buscar, leer y analizar información académica, ordenados por relevancia.</p>
      </PageHero>
      <section className="banda">
        <div className="banda__interior">
          <Link to="/insumos" className="volver">
            Volver a Insumos y Análisis
          </Link>
          <p className="nota">{chatbotsNota}</p>

          <div className="tabla-envoltorio">
            <table className="tabla">
              <caption className="solo-lectores">Chatbots y herramientas de IA para la investigación, ordenados por relevancia</caption>
              <thead>
                <tr>
                  <th scope="col">N.º</th>
                  <th scope="col">Herramienta</th>
                  <th scope="col">Tipología</th>
                  <th scope="col">Funcionalidades principales</th>
                  <th scope="col">Costo (USD)</th>
                  <th scope="col">Idioma</th>
                </tr>
              </thead>
              <tbody>
                {chatbots.map((c) => (
                  <tr key={c.rank} id={`bot-${c.rank}`}>
                    <td data-etiqueta="N.º">{c.rank}</td>
                    <th scope="row" data-etiqueta="Herramienta">
                      <a href={c.url} target="_blank" rel="noopener noreferrer">
                        {c.nombre}
                        <span className="solo-lectores"> (se abre en una pestaña nueva)</span>
                      </a>
                    </th>
                    <td data-etiqueta="Tipología">{c.tipologia}</td>
                    <td data-etiqueta="Funcionalidades">
                      <ul>
                        {c.funciones.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    </td>
                    <td data-etiqueta="Costo">{c.costo}</td>
                    <td data-etiqueta="Idioma">{c.idioma}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
