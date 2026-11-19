import { useState } from 'react'
import { taxonomia } from '../data/taxonomia'

const igual = (a, b) => a.length === b.length && a.every((v, i) => v === b[i])

function Fila({ nivel, ruta, texto, abierto, hayHijos, seleccionada, onAlternar, onElegir }) {
  return (
    <div className={`arbol__fila arbol__fila--n${nivel}${seleccionada ? ' arbol__fila--activa' : ''}`}>
      {hayHijos ? (
        <button
          type="button"
          className="arbol__flecha"
          aria-expanded={abierto}
          aria-label={`${abierto ? 'Contraer' : 'Expandir'} ${texto}`}
          onClick={onAlternar}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      ) : (
        <span className="arbol__flecha arbol__flecha--hoja" aria-hidden="true" />
      )}
      <button type="button" className="arbol__nombre" aria-pressed={seleccionada} onClick={() => onElegir(ruta)}>
        {texto}
      </button>
    </div>
  )
}

// Espacio reservado para las publicaciones y estudios de un subtema.
function Marcador() {
  return (
    <div className="tema-detalle__marcador">
      <strong>Publicaciones y estudios</strong>
      <span>Próximamente: aquí aparecerán las publicaciones y estudios de este subtema.</span>
    </div>
  )
}

export default function TaxonomyTree({ seleccion, onElegir }) {
  // Se mantienen abiertos los nodos ancestros de la selección (p. ej. al llegar desde el buscador).
  const [abiertos, setAbiertos] = useState(() => {
    const s = new Set()
    for (let i = 2; i <= seleccion.length; i += 1) s.add(seleccion.slice(0, i).join('|'))
    return s
  })

  const alternar = (ruta) =>
    setAbiertos((prev) => {
      const clave = ruta.join('|')
      const sig = new Set(prev)
      if (sig.has(clave)) sig.delete(clave)
      else sig.add(clave)
      return sig
    })

  const abierto = (ruta) => abiertos.has(ruta.join('|'))
  const elegido = taxonomia.find((n) => n.nombre === seleccion[0])

  return (
    <>
      <div className="arbol" aria-label="Categorías del observatorio">
        {taxonomia.map((n1) => {
          const activa = elegido === n1
          return (
            <button
              type="button"
              key={n1.nombre}
              className={`arbol__rama arbol__rama--n1${activa ? ' arbol__rama--activa' : ''}`}
              aria-pressed={activa}
              onClick={() => onElegir([n1.nombre])}
            >
              <span className="arbol__portada">
                {n1.imagen ? (
                  <img src={n1.imagen} alt="" />
                ) : (
                  <span className="arbol__portada-vacia" aria-hidden="true">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="16" rx="2" />
                      <circle cx="9" cy="10" r="1.6" />
                      <path d="m21 16-5-5-9 9" />
                    </svg>
                  </span>
                )}
              </span>
              <span className="arbol__titulo">{n1.nombre}</span>
              <span className="arbol__conteo">
                {n1.hijos.length} {n1.hijos.length === 1 ? 'subtema' : 'subtemas'}
              </span>
            </button>
          )
        })}
      </div>

      {elegido && (
        <section className="tema-detalle" aria-labelledby="tema-detalle-titulo">
          <h2 id="tema-detalle-titulo">{elegido.nombre}</h2>
          <div className="arbol__hijos">
            {elegido.hijos.map((n2) => {
              const r2 = [elegido.nombre, n2.nombre]
              return (
                <div className="arbol__rama" key={n2.nombre}>
                  <Fila
                    nivel={2}
                    ruta={r2}
                    texto={n2.nombre}
                    abierto={abierto(r2)}
                    hayHijos
                    seleccionada={igual(seleccion, r2)}
                    onAlternar={() => alternar(r2)}
                    onElegir={onElegir}
                  />
                  {abierto(r2) && (
                    <div className="arbol__hijos">
                      {n2.hijos.map((n3) => {
                        const r3 = [elegido.nombre, n2.nombre, n3]
                        return (
                          <div className="arbol__rama" key={n3}>
                            <Fila
                              nivel={3}
                              ruta={r3}
                              texto={n3}
                              abierto={abierto(r3)}
                              hayHijos
                              seleccionada={igual(seleccion, r3)}
                              onAlternar={() => alternar(r3)}
                              onElegir={onElegir}
                            />
                            {abierto(r3) && <Marcador />}
                          </div>
                        )
                      })}
                      {n2.hijos.length === 0 && <Marcador />}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}
    </>
  )
}
