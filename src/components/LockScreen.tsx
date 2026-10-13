import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Lock, KeyRound, Heart, Sparkles, AlertCircle, HelpCircle } from 'lucide-react'

interface LockScreenProps {
  onUnlock: () => void
}

/**
 * Pantalla de acceso exclusivo y seguro para Adina.
 * Valida las credenciales secretas (usuario: jdyadina / contraseña: 14102011).
 *
 * @param {LockScreenProps} props - Propiedades del componente con callback de desbloqueo.
 * @returns {JSX.Element} Vista de la pantalla de bloqueo con diseño teatral y romántico.
 */
export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [showHint, setShowHint] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  /**
   * Maneja el intento de inicio de sesión con validación defensiva.
   *
   * @param {React.FormEvent} e - Evento de envío del formulario.
   */
  const handleLogin = (e: React.FormEvent): void => {
    e.preventDefault()
    setErrorMsg(null)
    setIsSubmitting(true)

    try {
      const cleanUser = username.trim().toLowerCase()
      const cleanPass = password.trim()

      // Comprobación de credenciales
      if (cleanUser === 'jdyadina' && cleanPass === '14102011') {
        localStorage.setItem('auth_15_aniversario', 'true')
        setTimeout(() => {
          setIsSubmitting(false)
          onUnlock()
        }, 400)
      } else {
        setIsSubmitting(false)
        if (cleanUser !== 'jdyadina' && cleanPass !== '14102011') {
          setErrorMsg('Usuario y clave no coinciden. Revisa la pista si tienes dudas, amor.')
        } else if (cleanUser !== 'jdyadina') {
          setErrorMsg('El usuario no es correcto. Recuerda quiénes somos los dos...')
        } else {
          setErrorMsg('Esa no es nuestra fecha secreta. Recuerda el día que empezó todo (DDMMAAAA).')
        }
      }
    } catch (err) {
      setIsSubmitting(false)
      setErrorMsg('Ocurrió un error al verificar los datos. Inténtalo nuevamente.')
    }
  }

  return (
    <div className="min-h-[100dvh] w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#08090d] select-none">
      {/* Fondo con halo teatral suave */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(158,28,46,0.18)_0%,rgba(8,9,13,0.98)_75%)] pointer-events-none" />

      {/* Partículas o destellos decorativos */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[#d4af37]/60 text-xs tracking-[0.3em] uppercase font-light">
        <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
        <span>14 • 10 • 2011 — 14 • 10 • 2026</span>
        <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md bg-[#11131a]/85 backdrop-blur-xl border border-[#d4af37]/25 rounded-2xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-center"
      >
        {/* Emblema superior */}
        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-b from-[#2a1219] to-[#12131a] border border-[#d4af37]/40 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(158,28,46,0.3)]">
          <Heart className="w-7 h-7 text-[#d4af37] animate-pulse" />
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-normal text-[#f5f2eb] tracking-tight mb-2">
          Solo Para Ti, Adina
        </h1>

        <p className="text-sm text-[#b0aba0] font-light leading-relaxed mb-8">
          Un regalo preparado con todo mi amor para celebrar nuestros <span className="text-[#d4af37] font-medium">15 años juntos</span>. Introduce la llave secreta para descubrirlo.
        </p>

        {/* Formulario de acceso */}
        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d4af37]/90 mb-1.5 font-medium">
              Usuario
            </label>
            <div className="relative">
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuario secreto..."
                className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-4 py-3 pl-11 text-sm text-[#f5f2eb] placeholder-white/20 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition"
                required
              />
              <KeyRound className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#d4af37]/90 mb-1.5 font-medium">
              Contraseña
            </label>
            <div className="relative">
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="La fecha de nuestro inicio..."
                className="w-full bg-[#0a0b10] border border-white/10 rounded-xl px-4 py-3 pl-11 text-sm text-[#f5f2eb] placeholder-white/20 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition"
                required
              />
              <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {/* Mensaje de error defensivo */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-start gap-2 p-3 rounded-lg bg-[#3a1017]/80 border border-[#9e1c2e]/50 text-xs text-[#ffb8c0]"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-[#ff7080] mt-0.5" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón de acceso con tactile feedback */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3.5 px-6 rounded-xl font-medium text-sm tracking-wide bg-gradient-to-r from-[#9e1c2e] via-[#b62438] to-[#9e1c2e] text-white shadow-[0_4px_20px_rgba(158,28,46,0.4)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Abriendo el telón...</span>
            ) : (
              <>
                <span>Desbloquear Nuestro Regalo</span>
                <Heart className="w-4 h-4 fill-current" />
              </>
            )}
          </button>
        </form>

        {/* Pista desplegable */}
        <div className="mt-6 pt-5 border-t border-white/5 text-center">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="inline-flex items-center gap-1.5 text-xs text-[#b0aba0]/70 hover:text-[#d4af37] transition cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHint ? 'Ocultar pista' : '¿Necesitas una pista?'}</span>
          </button>

          <AnimatePresence>
            {showHint && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="mt-3 text-xs text-[#d4af37]/90 bg-[#161822] p-3 rounded-lg border border-[#d4af37]/20 font-light leading-relaxed"
              >
                💡 <strong>Usuario:</strong> Las iniciales de Juan Diego y tu nombre juntos (sin espacios).<br />
                💡 <strong>Contraseña:</strong> El día, mes y año exacto en que empezó nuestra historia de amor en formato continuo: 8 cifras (DDMMAAAA).
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
