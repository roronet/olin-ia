import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'

export default function Insumos() {
  return (
    <>
      <PageHero titulo="Insumos y Análisis" imagen="/assets/images/5.jpg">
        <p>Fuentes de datos abiertos y herramientas de IA que apoyan el trabajo del observatorio.</p>
      </PageHero>
      <section className="banda">
        <div className="banda__interior insumos">
          <Link to="/insumos/fuentes-de-datos" className="insumos__tarjeta">
            <img className="insumos__tarjeta-img" src="/assets/images/repositorio.png" alt="Repositorio de datos abiertos" />
            <h2>Fuentes de datos abiertos</h2>
            <p>Repositorios y catálogos públicos útiles para la investigación en logística inversa.</p>
            <span className="insumos__ir">Ver las 7 fuentes</span>
          </Link>
          <Link to="/insumos/chatbots" className="insumos__tarjeta">
            <img className="insumos__tarjeta-img" src="/assets/images/chatbot.png" alt="Chatbot de inteligencia artificial" />
            <h2>Chatbots de IA</h2>
            <p>Asistentes de inteligencia artificial para buscar, leer y analizar, ordenados por relevancia.</p>
            <span className="insumos__ir">Ver las 22 herramientas</span>
          </Link>
        </div>
      </section>
    </>
  )
}
