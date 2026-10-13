/**
 * Utilidad de audio atmosférico y banda sonora para el 15 Aniversario.
 * Incorpora la reproducción de "Ben E. King - Stand by Me" y efectos sonoros con Web Audio API.
 */

let audioCtx: AudioContext | null = null
let standByMeAudio: HTMLAudioElement | null = null

/**
 * Obtiene o inicializa el contexto de audio del navegador de forma defensiva.
 *
 * @returns {AudioContext | null} Contexto de audio listo para usar.
 */
function getAudioContext(): AudioContext | null {
  try {
    if (!audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtx = new AudioContextClass()
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume()
    }
    return audioCtx
  } catch {
    return null
  }
}

/**
 * Toca una nota suave tipo caja de música o arpa teatral.
 *
 * @param {number} freq - Frecuencia en Hercios.
 * @param {number} duration - Duración en segundos.
 */
export function playChimeNote(freq: number, duration: number = 1.2): void {
  const ctx = getAudioContext()
  if (!ctx) return

  try {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)

    gain.gain.setValueAtTime(0.001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + duration)
  } catch {
    // Manejo defensivo en caso de bloqueo de audio del navegador
  }
}

/**
 * Obtiene o inicializa la pista de audio de "Ben E. King - Stand by Me".
 *
 * @returns {HTMLAudioElement | null} Elemento de audio preparado.
 */
function getStandByMeAudio(): HTMLAudioElement | null {
  try {
    if (!standByMeAudio && typeof Audio !== 'undefined') {
      standByMeAudio = new Audio('/audio/stand_by_me.mp3')
      standByMeAudio.loop = true
      standByMeAudio.volume = 0.65
      standByMeAudio.preload = 'auto'
    }
    return standByMeAudio
  } catch {
    return null
  }
}

/**
 * Inicia la reproducción de "Ben E. King - Stand by Me" como banda sonora romántica.
 *
 * @returns {Promise<boolean>} Indica si la reproducción inició con éxito.
 */
export async function startAmbientMelody(): Promise<boolean> {
  const audio = getStandByMeAudio()
  if (!audio) return false

  try {
    audio.currentTime = 0
    await audio.play()
    return true
  } catch {
    // Si el navegador bloquea autoplay sin gesto previo, capturamos limpiamente
    return false
  }
}

/**
 * Detiene la reproducción de "Stand by Me".
 */
export function stopAmbientMelody(): void {
  const audio = getStandByMeAudio()
  if (audio) {
    try {
      audio.pause()
    } catch {
      // Ignorar de forma defensiva
    }
  }
}

/**
 * Alterna la reproducción de la música.
 *
 * @param {boolean} currentlyPlaying - Estado actual de reproducción.
 * @returns {Promise<boolean>} Nuevo estado de reproducción.
 */
export async function toggleAmbientMelody(currentlyPlaying: boolean): Promise<boolean> {
  if (currentlyPlaying) {
    stopAmbientMelody()
    return false
  }
  const started = await startAmbientMelody()
  return started
}
