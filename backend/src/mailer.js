import nodemailer from 'nodemailer'

let transporte = null
function obtener() {
  if (transporte) return transporte
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null
  transporte = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 465,
    secure: (Number(SMTP_PORT) || 465) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
  return transporte
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export async function enviarVerificacion({ nombre, correo, enlace }) {
  const t = obtener()
  if (!t) {
    // Sin SMTP configurado (desarrollo): se muestra el enlace en consola.
    console.log(`[correo simulado] Para ${correo}: ${enlace}`)
    return
  }
  await t.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: correo,
    subject: 'Confirma tu correo – OLIN IA',
    text: `Hola ${nombre}, confirma tu correo en: ${enlace}\nEl enlace vence en 24 horas.`,
    html: `<p>Hola ${esc(nombre)},</p><p>Confirma tu correo para activar tu cuenta en OLIN IA:</p>
<p><a href="${esc(enlace)}">Confirmar correo</a></p><p>El enlace vence en 24 horas. Si no fuiste tú, ignora este mensaje.</p>`,
  })
}
