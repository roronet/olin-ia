# OLIN IA – Observatorio de Logística Inversa con IA

Sitio web del observatorio (Facultad de Ingeniería Industrial, UNMSM).
Frontend: React 19 + Vite + React Router. Backend de registro: `backend/` (Node + Express + SQLite).

## Desarrollo
```bash
npm install
npm run dev        # http://localhost:5173
npm run lint
npm run build      # genera dist/
npm run preview
```

## Despliegue
- Subir el contenido de `dist/` a un hosting Apache (incluye `.htaccess` con fallback SPA).
- Copiar `.env.example` a `.env` y definir `VITE_API_URL` antes de `npm run build`.

## Backend de registro
Ver `backend/README.md`.
