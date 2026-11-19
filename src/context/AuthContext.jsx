/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  // Si el backend no responde, el sitio sigue funcionando sin sesión.
  useEffect(() => {
    api.yo().then((d) => setUsuario(d.usuario)).catch(() => setUsuario(null))
  }, [])

  const ingresar = useCallback(async (datos) => {
    const d = await api.ingresar(datos)
    setUsuario(d.usuario)
  }, [])

  const salir = useCallback(async () => {
    await api.salir().catch(() => {})
    setUsuario(null)
  }, [])

  const valor = useMemo(() => ({ usuario, ingresar, salir }), [usuario, ingresar, salir])
  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
