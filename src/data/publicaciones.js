// Artículos de opinión. Solo se registran los datos conocidos: lo que falta queda en null
// y la interfaz lo avisa en lugar de inventarlo.
export const publicaciones = [
  {
    codigo: 'OPINIÓN 001',
    autores: ['Liliana R. Agustini Paredes'],
    titulo: 'La preponderancia de la economía circular en la cadena de suministros',
    recepcion: '2024-10-12',
    publicacion: '2025-01-18',
    categoria: { n1: 'Impacto Ambiental y Social', n2: 'Eficiencia energética', n3: null },
    resumen: null,
    pdf: null,
    imagen: null,
  },
  {
    codigo: 'OPINIÓN 002',
    autores: ['Rosa Karol Moore Torres', 'Alfonso Chung Pinzás', 'Julio Salas Bacalla'],
    titulo:
      'La inteligencia artificial en la logística inversa y su impacto en las competencias técnicas en el sector textil',
    recepcion: '2024-10-12',
    publicacion: null,
    categoria: {
      n1: 'Impacto Ambiental y Social',
      n2: 'Colaboraciones con organizaciones sociales',
      n3: null,
    },
    resumen: null,
    pdf: null,
    imagen: null,
  },
  {
    // Registro duplicado de la OPINIÓN 002 en el Excel original (recibido el 2024-10-14).
    codigo: 'OPINIÓN 003',
    autores: ['Rosa Karol Moore Torres', 'Alfonso Chung Pinzás', 'Julio Salas Bacalla'],
    titulo:
      'La inteligencia artificial en la logística inversa y su impacto en las competencias técnicas en el sector textil',
    recepcion: '2024-10-14',
    publicacion: null,
    categoria: {
      n1: 'Impacto Ambiental y Social',
      n2: 'Colaboraciones con organizaciones sociales',
      n3: null,
    },
    resumen: null,
    pdf: null,
    imagen: null,
  },
  {
    codigo: 'OPINIÓN 004',
    autores: ['Marco Antonio Tello Miranda'],
    titulo: 'Calidad, economía circular: ¿dónde empezar?',
    recepcion: '2024-11-17',
    publicacion: null,
    categoria: null,
    resumen: null,
    pdf: null,
    imagen: null,
  },
  {
    codigo: 'OPINIÓN 005',
    autores: ['Henry Huamanchumo Venegas'],
    titulo: 'Responsabilidad de la industria textil al aplicar la logística inversa con IA en el Perú',
    recepcion: '2024-11-19',
    publicacion: null,
    categoria: null,
    resumen: null,
    pdf: null,
    imagen: null,
  },
  {
    codigo: 'OPINIÓN 006',
    autores: ['Yober J. Arteaga Irene', 'Oscar R. Tinoco Gómez'],
    titulo: 'El papel de la inteligencia artificial en la logística inversa',
    recepcion: '2024-10-08',
    publicacion: null,
    categoria: null,
    resumen: null,
    pdf: null,
    imagen: null,
  },
  {
    codigo: 'OPINIÓN 007',
    autores: ['Rosa Karol Moore Torres'],
    titulo:
      'Del residuo a la competitividad: una hoja de ruta estratégica para la circularidad textil en el Perú',
    recepcion: null,
    publicacion: null,
    categoria: { n1: 'Impacto Ambiental y Social', n2: 'Reducción de residuos', n3: null },
    resumen:
      'Ante la exigencia de circularidad de la Unión Europea para 2027 (Pasaporte Digital de Producto), el sector textil exportador peruano debe dejar de ver la logística inversa como un costo de gestión de residuos y convertirla en una red de generación de valor con cinco funciones clave: captura, consolidación y transporte de baja emisión, clasificación, valorización y retroalimentación al diseño. Propone una hoja de ruta empresarial de 24 meses en cuatro fases (diagnóstico, piloto, escalamiento y preparación internacional) y un set de métricas (KPIs operativos más un Índice de Experiencia Circular) para demostrar con datos el impacto ambiental y económico de cada prenda devuelta, como condición para mantener el acceso a mercados internacionales exigentes en trazabilidad.',
    pdf: null, // TODO: PDF de la OPINIÓN 007 (pendiente de entrega)
    imagen: '/assets/images/del-residuo-a-la-competitividad.jpg',
  },
]
