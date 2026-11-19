export const fuentesDatos = [
  {
    id: 'rediam',
    categoria: 'Fuente nacional – Perú',
    nombre: 'REDIAM – Repositorio Digital del Ministerio del Ambiente (MINAM)',
    ofrece:
      'Más de 500 publicaciones técnicas del MINAM: guías sobre manejo de residuos sólidos, economía circular y calidad ambiental.',
    utilidad: 'Alinear la investigación con las normativas y políticas peruanas.',
    api: false,
    acceso: 'Sin API pública. El sitio respondió con error 503 en pruebas automatizadas.',
    url: 'https://www.minam.gob.pe/atencion-a-la-ciudadania/repositorio-digital-del-ministerio-del-ambiente-rediam/',
  },
  {
    id: 'onia',
    categoria: 'Fuente nacional – Perú',
    nombre: 'ONIA – Repositorio de Investigaciones del MINAM',
    ofrece:
      'Producción científica y estudios técnicos de institutos públicos del sector ambiente y de universidades.',
    utilidad: null,
    api: false,
    acceso: 'Sin API pública.',
    url: 'https://investigacion.minam.gob.pe/',
  },
  {
    id: 'unep-kr',
    categoria: 'Fuente internacional – Sistema ONU',
    nombre: 'UNEP Knowledge Repository (PNUMA)',
    ofrece:
      'Acceso abierto a directrices globales, el Emissions Gap Report y estrategias de economía circular (más de 11 000 publicaciones).',
    utilidad: null,
    api: false,
    acceso: 'Sin API confirmada.',
    url: 'https://wedocs.unep.org/',
  },
  {
    id: 'wesr',
    categoria: 'Fuente internacional – Sistema ONU',
    nombre: 'World Environment Situation Room (WESR) – PNUMA',
    ofrece:
      'Datos, información geoespacial e indicadores sobre el estado del medio ambiente y los riesgos climáticos.',
    utilidad: 'Alimentar tableros con métricas macroambientales.',
    api: false,
    acceso: 'La descarga de datos requiere iniciar sesión.',
    url: 'https://wesr.unep.org/',
  },
  {
    id: 'unsd',
    categoria: 'Fuente internacional – Sistema ONU',
    nombre: 'UNSD Environmental Indicators (División de Estadística de la ONU)',
    ofrece: 'Estadísticas globales de residuos, agua y flujos de materiales.',
    utilidad: null,
    api: false,
    acceso:
      'Tiene API REST (UNSD SDG API) y SDMX, pero sin CORS confirmado para uso directo desde el navegador.',
    url: 'https://unstats.un.org/',
  },
  {
    id: 'cepal',
    categoria: 'Organismo multilateral – América Latina y global',
    nombre: 'CEPAL – Repositorio Digital',
    ofrece:
      'Documentos de investigación económica, social y ambiental de la región: desarrollo sostenible, transición verde, logística comercial y cadenas de valor.',
    utilidad: null,
    api: false,
    acceso: 'OAI-PMH confirmado, pero sin CORS.',
    url: 'https://repositorio.cepal.org/',
  },
  {
    id: 'banco-mundial',
    categoria: 'Organismo multilateral – América Latina y global',
    nombre: 'Banco Mundial – Open Knowledge Repository (OKR) y Data Catalog',
    ofrece:
      'El mayor repositorio abierto de estudios de desarrollo, más el catálogo de indicadores mundiales, con desempeño logístico e industrial por país.',
    utilidad: null,
    api: true,
    acceso:
      'Es la única de las siete con API REST pública: JSON, sin API key y con CORS abierto, usable directo desde el navegador.',
    url: 'https://openknowledge.worldbank.org/',
  },
]
