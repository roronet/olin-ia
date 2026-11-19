import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import QuienesSomos from './pages/QuienesSomos'
import Temas from './pages/Temas'
import Publicaciones from './pages/Publicaciones'
import Estudios from './pages/Estudios'
import Insumos from './pages/Insumos'
import FuentesDatos from './pages/FuentesDatos'
import Chatbots from './pages/Chatbots'
import Registro from './pages/Registro'
import Ingresar from './pages/Ingresar'
import VerificarCorreo from './pages/VerificarCorreo'
import Cuenta from './pages/Cuenta'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="quienes-somos" element={<QuienesSomos />} />
        <Route path="temas" element={<Temas />} />
        <Route path="publicaciones" element={<Publicaciones />} />
        <Route path="estudios" element={<Estudios />} />
        <Route path="insumos" element={<Insumos />} />
        <Route path="insumos/fuentes-de-datos" element={<FuentesDatos />} />
        <Route path="insumos/chatbots" element={<Chatbots />} />
        <Route path="registro" element={<Registro />} />
        <Route path="ingresar" element={<Ingresar />} />
        <Route path="verificar-correo" element={<VerificarCorreo />} />
        <Route path="cuenta" element={<Cuenta />} />
        <Route path="*"element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
