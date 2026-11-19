import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchOverlay from '../components/SearchOverlay'

export default function MainLayout() {
  const { pathname, search } = useLocation()
  const [buscando, setBuscando] = useState(false)

  // Cada ruta nueva abre arriba; los enlaces con query (?ver=, ?cat=) los resuelve la propia página.
  useEffect(() => {
    if (!search) window.scrollTo(0, 0)
  }, [pathname, search])

  return (
    <>
      <a className="saltar" href="#contenido">
        Saltar al contenido
      </a>
      <Header onBuscar={() => setBuscando(true)} />
      <main id="contenido" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      {buscando && <SearchOverlay onCerrar={() => setBuscando(false)} />}
    </>
  )
}
