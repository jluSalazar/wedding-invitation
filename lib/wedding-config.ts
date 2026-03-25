export const weddingConfig = {
  couple: {
    name1: 'Silvana',
    name2: 'Javier',
    fullName1: 'Silvana Apellido',
    fullName2: 'Javier Apellido',
    initials: 'S&J',
  },
  event: {
    date: '2026-04-25',           // ISO — fuente de verdad
    displayDate: '25 de Abril, 2026',
    time: '15:30',
    timeDisplay: '3:30 PM',
    venue: 'Iglesia Matriz de San Pablo del Lago',
    address: 'Av. Mariscal Sucre y Av. Abdón Calderón, San Pablo del Lago',
    city: 'San Pablo del Lago',
    mapLink: 'https://maps.app.goo.gl/SpSQ57JNTXLH6ApN7',
    coordinates: { lat: 0, lng: 0 },
  },
  reception: {
    date: '2026-04-25',
    time: '17:00',
    timeDisplay: '5:00 PM',
    venue: 'El Encanto del Lago San Pablo',
    address: 'Av. Gran Colombia y Ascasubi, San Pablo del Lago',
    city: 'San Pablo del Lago',
    mapLink: 'https://maps.app.goo.gl/b53WGGQRd1MXXetY6',
    coordinates: { lat: 0, lng: 0 },
  },
  theme: {
    primary: '#3d4f60',
    accent: '#7a8fa3',
    bg: '#dce4ec',
  },
  family: {
    parents: {
      bride: [
        'Vicente Reyes',
        'Celina Morales',
      ],
      groom: [
        'Franco Chamba',
        'Magdalena Proaño',
      ],
    },
    godparents: {
      general: [
        'Vicente Reyes',
        'Celina Morales',
      ],
    },
  },
} as const;
