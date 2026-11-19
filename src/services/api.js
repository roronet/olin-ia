const BASE = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/$/, '')

async function pedir(ruta, { metodo = 'GET', cuerpo } = {}) {
  let res
  try {
    res = await fetch(`${BASE}/api${ruta}`, {
      method: metodo,
      credentials: 'include',
      headers: cuerpo ? { 'Content-Type': 'application/json' } : undefined,
      body: cuerpo ? JSON.stringify(cuerpo) : undefined,
    })
  } catch {
    throw Object.assign(new Error('No se pudo conectar con el servidor. Intenta más tarde.'), { red: true })
  }
  const datos = await res.json().catch(() => ({}))
  if (!res.ok) throw Object.assign(new Error(datos.error || 'Ocurrió un error.'), { estado: res.status, datos })
  return datos
}

export const api = {
  registro: (cuerpo) => pedir('/auth/registro', { metodo: 'POST', cuerpo }),
  verificar: (token) => pedir('/auth/verificar', { metodo: 'POST', cuerpo: { token } }),
  reenviar: (correo) => pedir('/auth/reenviar', { metodo: 'POST', cuerpo: { correo } }),
  ingresar: (cuerpo) => pedir('/auth/ingresar', { metodo: 'POST', cuerpo }),
  salir: () => pedir('/auth/salir', { metodo: 'POST' }),
  yo: () => pedir('/auth/yo'),
}
