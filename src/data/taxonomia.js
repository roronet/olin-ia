// Taxonomía de tres niveles del observatorio (fuente: "Estructura de temas.xlsx").
export const taxonomia = [
  {
    nombre: 'Infraestructura y Logística',
    imagen: '/assets/images/Infraestructura%20logistica.png',
    hijos: [
      {
        nombre: 'Puntos de recolección',
        hijos: [
          'Número total de puntos de recolección (físicos y virtuales)',
          'Ubicación geográfica detallada (mapas, direcciones)',
          'Tipo de establecimiento (tiendas propias, franquicias, contenedores urbanos, etc.)',
          'Horarios de funcionamiento',
          'Accesibilidad para personas con movilidad reducida',
        ],
      },
      {
        nombre: 'Rutas de recolección',
        hijos: [
          'Frecuencia de recolección en cada punto',
          'Rutas optimizadas para minimizar costos y emisiones',
          'Uso de tecnología para seguimiento de rutas y vehículos',
        ],
      },
      {
        nombre: 'Capacidad de almacenamiento',
        hijos: [
          'Tamaño de los almacenes o centros de clasificación',
          'Capacidad de almacenamiento de diferentes tipos de textiles',
          'Sistemas de gestión de inventario',
        ],
      },
    ],
  },
  {
    nombre: 'Procesos de Recolección',
    imagen: '/assets/images/Procesos%20de%20recoleccion.png',
    hijos: [
      {
        nombre: 'Comunicación con los consumidores',
        hijos: [
          'Canales de comunicación (app, web, redes sociales, folletos)',
          'Mensajes clave para incentivar la participación',
          'Programas de fidelización o recompensas',
        ],
      },
      {
        nombre: 'Criterios de aceptación de prendas',
        hijos: [
          'Condiciones de las prendas (limpieza, estado, tipo de material)',
          'Procedimiento de clasificación y selección',
          'Gestión de prendas no aceptadas',
        ],
      },
      {
        nombre: 'Gestión de residuos',
        hijos: [
          'Procedimientos para la separación y eliminación de residuos textiles',
          'Alianzas con empresas de reciclaje o valorización energética',
        ],
      },
    ],
  },
  {
    nombre: 'Tecnología y Digitalización',
    imagen: '/assets/images/Tecnologia%20y%20digitalizacion.png',
    hijos: [
      {
        nombre: 'Plataforma digital',
        hijos: [
          'Funcionalidades de la plataforma (registro de usuarios, seguimiento de donaciones, información sobre el proceso)',
          'Integración con sistemas de gestión de inventario y logística',
        ],
      },
      {
        nombre: 'Aplicaciones móviles',
        hijos: [
          'Disponibilidad de una app para facilitar la donación',
          'Funcionalidades de geolocalización y búsqueda de puntos de recolección',
        ],
      },
      {
        nombre: 'Análisis de datos',
        hijos: [
          'Uso de datos para optimizar rutas, mejorar la eficiencia y tomar decisiones estratégicas',
          'Indicadores clave de rendimiento (KPI) para medir el éxito del proceso',
        ],
      },
    ],
  },
  {
    nombre: 'Impacto Ambiental y Social',
    imagen: '/assets/images/Impacto%20ambiental%20y%20social.png',
    hijos: [
      {
        nombre: 'Reducción de residuos',
        hijos: [
          'Cantidad de textiles recolectados y desviados de los vertederos',
          'Porcentaje de textiles reutilizados, reciclados o valorizados',
        ],
      },
      {
        nombre: 'Eficiencia energética',
        hijos: [
          'Medidas adoptadas para reducir el consumo energético en los procesos de recolección y clasificación',
        ],
      },
      {
        nombre: 'Colaboraciones con organizaciones sociales',
        hijos: [
          'Alianzas con entidades sin ánimo de lucro para generar un impacto social positivo',
        ],
      },
    ],
  },
]
