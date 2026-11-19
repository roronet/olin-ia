# Backend OLIN IA (registro de usuarios)

Node + Express + SQLite. Los usuarios deben confirmar su correo con un enlace enviado por email.

```bash
cd backend
npm install
copy .env.example .env   # completar SMTP_*; sin SMTP el enlace sale en consola
npm run dev              # http://localhost:3001
```

Endpoints: `POST /api/auth/registro | verificar | reenviar | ingresar | salir`, `GET /api/auth/yo`, `GET /api/salud`.

Base de datos: `backend/data/olin.db` (ignorada por git).

## Producción (PC como servidor)
1. `NODE_ENV=production`, `FRONTEND_URL` con el dominio real del frontend.
2. Mantener activo: `npm i -g pm2 && pm2 start src/server.js --name olin-api && pm2 save`.
3. Exponer con Cloudflare Tunnel: `cloudflared tunnel login`, `tunnel create olin-api`, enrutar `api.<dominio>` a `http://localhost:3001`, `cloudflared service install`.
4. En el frontend, compilar con `VITE_API_URL=https://api.<dominio>`.
