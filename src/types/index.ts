/**
 * Definiciones de tipos e interfaces para la experiencia de 15 Aniversario.
 */

/** Representa una fotografía o recurso multimedia de un recuerdo */
export interface MemoryPhoto {
  url: string
  caption: string
  alt: string
}

/** Representa una etapa o capítulo de la historia interactiva */
export interface StoryStage {
  id: number
  year: string
  title: string
  subtitle: string
  description: string
  photos: MemoryPhoto[]
  clue: {
    prompt: string
    hint: string
    revealedText: string
  }
}

/** Representa una función disponible del musical */
export interface ShowSession {
  id: string
  day: string
  dateLabel: string
  time: string
  venue: string
}

/** Estado de la sesión del usuario */
export interface AuthState {
  isAuthenticated: boolean
  user: string
  loginTime?: number
}
