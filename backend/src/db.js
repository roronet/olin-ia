import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const ruta = process.env.DB_PATH ? resolve(raiz, process.env.DB_PATH) : resolve(raiz, 'data/olin.db')
mkdirSync(dirname(ruta), { recursive: true })

const db = new Database(ruta)
db.pragma('journal_mode = WAL')
db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT NOT NULL UNIQUE,
    clave_hash TEXT NOT NULL,
    verificado INTEGER NOT NULL DEFAULT 0,
    token_hash TEXT,
    token_expira INTEGER,
    creado_en TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS sesiones (
    token_hash TEXT PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    expira INTEGER NOT NULL
  );
`)

export default db
