import type { StoryStage, ShowSession } from '../types'

/**
 * Mensaje principal de amor de Juan Diego para Adina
 */
export const LOVE_LETTER = {
  headline: '15 Años de Nuestro Gran Viaje',
  dateSpan: '14 de Octubre de 2011 — 14 de Octubre de 2026',
  salutation: 'Mi querida Adina,',
  body: 'Después de 15 años de vivir muchas cosas buenas y otras no tanto, hemos estado juntos todo este tiempo. Por muchos años más, disfrutando de los pequeños y grandes momentos, viajando y descubriendo nuevas experiencias juntos. ¡Te amo!',
  signature: 'Juan Diego',
}

/**
 * Número de teléfono móvil de Juan Diego (con prefijo internacional ej. 34600000000).
 * Se vincula directamente al botón de confirmación en WhatsApp.
 */
export const JUAN_DIEGO_PHONE = '34654827357'

/**
 * Etapas de la historia con pistas narrativas para desbloquear el regalo
 */
export const STORY_STAGES: StoryStage[] = [
  {
    id: 1,
    year: '2011',
    title: 'Donde Todo Comenzó',
    subtitle: 'Zaragoza, Fiestas del Pilar — 14 de Octubre de 2011',
    description: 'Entre las luces de la Plaza del Pilar y la emoción de esos días, dimos el primer paso de un viaje que hoy cumple 15 años. Quién nos iba a decir todo lo que estaba por llegar.',
    photos: [
      {
        url: '/photos/foto_01_pilar_2011.jpg',
        caption: 'Pilares 2011, nuestras miradas cómplices',
        alt: 'Juan Diego y Adina mirándose con amor en las fiestas del Pilar',
      },
      {
        url: '/photos/foto_02_pilar_2011.jpg',
        caption: 'Nuestras primeras sonrisas juntos',
        alt: 'Juan Diego y Adina abrazados y sonrientes en 2011',
      },
    ],
    clue: {
      prompt: 'Toca el sello para abrir el primer misterio...',
      hint: 'Una nota escrita con tinta dorada',
      revealedText: 'Pista 1: «Toda gran historia de amor tiene su melodía secreta. La nuestra empezó al compás del gentío en Zaragoza... pero el destino nos tenía reservado un escenario con telón de terciopelo.»',
    },
  },
  {
    id: 2,
    year: '2011 — 2012',
    title: 'Primeras Escapadas y Cómplices',
    subtitle: 'Teruel y Aventuras Compartidas',
    description: 'Nuestras primeras escapadas por carretera, las risas interminables y descubrir que cada viaje a tu lado confirmaba que estábamos hechos el uno para el otro.',
    photos: [
      {
        url: '/photos/foto_03_viaje_2012.jpg',
        caption: 'Escapada en la carretera juntos',
        alt: 'Juan Diego y Adina sonriendo juntos dentro del coche',
      },
      {
        url: '/photos/foto_04_teruel_2012.jpg',
        caption: 'Teruel es Enamorarte, Febrero 2012',
        alt: 'Juan Diego y Adina juntos frente al letrero de Teruel es Enamorarte',
      },
    ],
    clue: {
      prompt: 'Desvela el siguiente fragmento del enigma...',
      hint: 'Un viejo programa de mano teatral',
      revealedText: 'Pista 2: «Entre risas, maletas y caminos descubiertos, aprendimos a ser cómplices de cada paso. Pero hay una rosa roja que aguarda entre bastidores...»',
    },
  },
  {
    id: 3,
    year: '2013 — 2014',
    title: 'Cruzando Fronteras y Sumando Años',
    subtitle: 'Rumanía, Rosas y Crecimiento Mutuo',
    description: 'Viajar a tus raíces en Rumanía, conocer nuevos mundos y celebrar cada momento a tu lado. 15 años construidos paso a paso, superando retos y celebrando cada alegría juntos.',
    photos: [
      {
        url: '/photos/foto_08_rumania_2013.jpg',
        caption: 'Rumbo a Rumanía, despega la aventura',
        alt: 'Juan Diego y Adina sonrientes haciéndose un selfie en el aeropuerto',
      },
      {
        url: '/photos/foto_09_rosas_2013.jpg',
        caption: 'Entre rosas rojas en Rumanía, Agosto 2013',
        alt: 'Juan Diego y Adina juntos sonriendo frente a un jardín de rosas rojas',
      },
    ],
    clue: {
      prompt: 'Descubre el penúltimo secreto...',
      hint: 'El sonido de un acorde de órgano a lo lejos',
      revealedText: 'Pista 3: «El mundo es inmenso, pero solo hay una ciudad donde las luces brillan con la elegancia de una gran ópera... ¿recuerdas nuestro viaje a orillas del Sena?»',
    },
  },
  {
    id: 4,
    year: '2015',
    title: 'París y la Ciudad de la Luz',
    subtitle: 'Mayo de 2015 — El Misterio se Concreta',
    description: 'Pasear por París y Londres, sus grandes avenidas frente a los teatros y la legendaria Ópera Garnier. La ciudad de los misterios románticos que hoy cobra más sentido que nunca.',
    photos: [
      {
        url: '/photos/foto_05_paris_2015.jpg',
        caption: 'Juntos en nuestro viaje a París y Londres',
        alt: 'Juan Diego y Adina posando juntos y sonrientes',
      },
      {
        url: '/photos/foto_06_paris_2015.jpg',
        caption: 'Recorriendo juntos cada estación',
        alt: 'Juan Diego y Adina con chaquetas de cuero en el andén',
      },
      {
        url: '/photos/foto_07_paris_2015.jpg',
        caption: 'Frente al gran teatro musical',
        alt: 'Juan Diego y Adina en selfie de pareja frente a la marquesina teatral',
      },
    ],
    clue: {
      prompt: 'Toca la máscara para abrir el Gran Clímax...',
      hint: 'Una máscara blanca sobre una rosa carmesí',
      revealedText: '¡Enigma resuelto! «Bajo la lámpara de cristal y tras la máscara del misterio, la música de la noche nos espera. Esta semana, el mayor espectáculo del mundo llega a nuestra ciudad para celebrar nuestros 15 años.»',
    },
  },
]

/**
 * Funciones oficiales de "El Fantasma de la Ópera" en Zaragoza (Palacio de Congresos)
 */
export const SHOW_SESSIONS: ShowSession[] = [
  {
    id: 'miercoles-14-2000',
    day: 'Miércoles 14 de Octubre',
    dateLabel: '¡Hoy mismo, día de nuestro aniversario!',
    time: '20:00 h',
    venue: 'Palacio de Congresos de Zaragoza',
  },
  {
    id: 'jueves-15-2000',
    day: 'Jueves 15 de Octubre',
    dateLabel: 'Mañana por la tarde-noche',
    time: '20:00 h',
    venue: 'Palacio de Congresos de Zaragoza',
  },
  {
    id: 'viernes-16-1700',
    day: 'Viernes 16 de Octubre',
    dateLabel: 'Sesión de tarde',
    time: '17:00 h',
    venue: 'Palacio de Congresos de Zaragoza',
  },
  {
    id: 'viernes-16-2100',
    day: 'Viernes 16 de Octubre',
    dateLabel: 'Sesión de noche estelar',
    time: '21:00 h',
    venue: 'Palacio de Congresos de Zaragoza',
  },
  {
    id: 'sabado-17-1700',
    day: 'Sábado 17 de Octubre',
    dateLabel: 'Sábado tarde',
    time: '17:00 h',
    venue: 'Palacio de Congresos de Zaragoza',
  },
  {
    id: 'sabado-17-2100',
    day: 'Sábado 17 de Octubre',
    dateLabel: 'Sábado noche de gala',
    time: '21:00 h',
    venue: 'Palacio de Congresos de Zaragoza',
  },
  {
    id: 'domingo-18-1700',
    day: 'Domingo 18 de Octubre',
    dateLabel: 'Gran función de despedida',
    time: '17:00 h',
    venue: 'Palacio de Congresos de Zaragoza',
  },
]
