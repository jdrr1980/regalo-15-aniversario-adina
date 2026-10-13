/**
 * Utilidad de audio atmosférico y efectos sonoros mediante Web Audio API nativa.
 * No depende de descargas externas y garantiza compatibilidad en navegadores móviles.
 */

let audioCtx: AudioContext | null = null
let melodyInterval: number | null = null

/**
 * Obtiene o inicializa el contexto de audio del navegador de forma defensiva.
 *
 * @returns {AudioContext | null} Contexto de audio listo para usar.
 */
function getAudioContext(): AudioContext | null {
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
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
 * Inicia una melodía suave y continua de fondo (caja de música romántica).
 */
export function startAmbientMelody(): void {
  stopAmbientMelody()
  const ctx = getAudioContext()
  if (!ctx) return

  // Notas mágicas tipo arpa / caja de música (A minor / Pentatónica mágica)
  const notes = [440, 523.25, 659.25, 783.99, 880, 659.25, 523.25, 587.33]
  let step = 0

  playChimeNote(notes[0], 1.5)
  melodyInterval = window.setInterval(() => {
    step = (step + 1) % notes.length
    playChimeNote(notes[step], 1.4)
  }, 1200)
}

/**
 * Detiene la música ambiental.
 */
export function stopAmbientMelody(): void {
  if (melodyInterval !== null) {
    clearInterval(melodyInterval)
    melodyInterval = null
  }
}
