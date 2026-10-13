import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react'
import { Lock, KeyRound, Heart, Sparkles, AlertCircle, HelpCircle } from 'lucide-react'
import { playChimeNote } from '../utils/audio'

interface LockScreenProps {
  onUnlock: () => void
}

/**
 * Pantalla de acceso exclusivo con estética de Gran Teatro de la Ópera de París.
 * Incluye cortinajes de terciopelo carmesí animados, partículas de oro, emblema 3D interactivo
 * de la máscara del Fantasma y transición de apertura de telón teatral.
 *
 * @param {LockScreenProps} props - Propiedades del componente con callback onUnlock.
 * @returns {JSX.Element} Vista interactiva de la pantalla de bloqueo teatral.
 */
export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [showHint, setShowHint] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isCurtainOpening, setIsCurtainOpening] = useState<boolean>(false)

  // Valores para el efecto 3D Tilt de la tarjeta de invitación real
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 })

  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-7, 7])
  const glareX = useTransform(springX, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(springY, [-0.5, 0.5], ['0%', '100%'])

  // Partículas de polvo de oro deterministas para animación suave
  const goldParticles = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: (i % 3) + 1.5,
        duration: 6 + (i % 7),
        delay: (i % 5) * 0.8,
      })),
    []
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = (): void => {
    mouseX.set(0)
    mouseY.set(0)
  }

  const handleLogin = (e: React.FormEvent): void => {
    e.preventDefault()
    setErrorMsg(null)
    setIsSubmitting(true)

    try {
      const cleanUser = username.trim().toLowerCase().replace(/\s+/g, '')
      const cleanPass = password.trim().replace(/[\/\-\s\.]/g, '')

      const validUsers = ['jdyadina', 'juandiegoyadina', 'adina', 'jdadina']
      const validPasswords = ['14102011', '14112011', '141011', '141111']

      if (validUsers.includes(cleanUser) && validPasswords.includes(cleanPass)) {
        localStorage.setItem('auth_15_aniversario', 'true')
        playChimeNote(523.25, 0.8)
        setTimeout(() => playChimeNote(659.25, 1.2), 200)
        setTimeout(() => playChimeNote(783.99, 1.8), 450)
        setIsCurtainOpening(true)
        setTimeout(() => {
          setIsSubmitting(false)
          onUnlock()
        }, 1350)
      } else {
        setIsSubmitting(false)
        playChimeNote(311.13, 0.4)
        if (!validUsers.includes(cleanUser) && !validPasswords.includes(cleanPass)) {
          setErrorMsg('Las credenciales del palco real no coinciden. Consulta la pista secreta, mi amor.')
        } else if (!validUsers.includes(cleanUser)) {
          setErrorMsg('El nombre del palco no es correcto. Recuerda quiénes somos los dos...')
        } else {
          setErrorMsg('Esa no es nuestra fecha sagrada. Recuerda el día exacto en que empezó todo (DDMMAAAA).')
        }
      }
    } catch {
      setIsSubmitting(false)
      setErrorMsg('Ocurrió un error al verificar el sello real. Inténtalo nuevamente.')
    }
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-[100dvh] w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#050508] select-none"
      style={{ perspective: '1400px' }}
    >
      {/* Haces de luz volumétricos de teatro (Chandelier God Rays) */}
      <div className="
        absolute inset-0 pointer-events-none
        bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.16)_0%,rgba(158,28,46,0.15)_35%,rgba(5,5,8,0.98)_80%)]
      " />
      <motion.div
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="
          absolute -top-40 left-1/2 -translate-x-1/2 w-[750px] h-[550px] pointer-events-none
          bg-[conic-gradient(from_180deg_at_50%_0%,transparent_30%,rgba(212,175,55,0.12)_47%,rgba(255,235,160,0.22)_50%,rgba(212,175,55,0.12)_53%,transparent_70%)]
          blur-2xl
        "
      />

      {/* Telón de terciopelo izquierdo */}
      <motion.div
        animate={isCurtainOpening ? { x: '-105%', rotateZ: -4 } : { x: '0%', rotateZ: 0 }}
        transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
        className="
          fixed top-0 left-0 bottom-0 w-[18vw] sm:w-[22vw] z-20 pointer-events-none
          bg-[repeating-linear-gradient(90deg,#2a050c_0px,#5e0b19_28px,#1b0206_56px)]
          shadow-[25px_0_80px_rgba(0,0,0,0.95)] border-r border-[#d4af37]/30
          opacity-80 sm:opacity-95
        "
      />

      {/* Telón de terciopelo derecho */}
      <motion.div
        animate={isCurtainOpening ? { x: '105%', rotateZ: 4 } : { x: '0%', rotateZ: 0 }}
        transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
        className="
          fixed top-0 right-0 bottom-0 w-[18vw] sm:w-[22vw] z-20 pointer-events-none
          bg-[repeating-linear-gradient(90deg,#1b0206_0px,#5e0b19_28px,#2a050c_56px)]
          shadow-[-25px_0_80px_rgba(0,0,0,0.95)] border-l border-[#d4af37]/30
          opacity-80 sm:opacity-95
        "
      />

      {/* Partículas de polvo de oro flotando hacia la lámpara */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {goldParticles.map((p) => (
          <motion.span
            key={p.id}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -90, 0],
              x: [0, p.id % 2 === 0 ? 15 : -15, 0],
              opacity: [0.1, 0.85, 0.1],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
            className="absolute rounded-full bg-[#ffe28a] shadow-[0_0_10px_#d4af37]"
          />
        ))}
      </div>

      {/* Inscripción de fecha superior estilo arco escénico */}
      <motion.div
        animate={isCurtainOpening ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
        className="absolute top-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 px-5 py-1.5 rounded-full bg-[#0d070a]/90 border border-[#d4af37]/40 shadow-[0_0_25px_rgba(212,175,55,0.2)]"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-spin" style={{ animationDuration: '9s' }} />
        <span className="text-[11px] sm:text-xs tracking-[0.32em] uppercase text-[#f3dfb2] font-medium">
          XIV • X • MMXI — XIV • X • MMXXVI
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-spin" style={{ animationDuration: '9s' }} />
      </motion.div>

      {/* Tarjeta de Palco de Honor 3D con Tilt y Reflejo Especular */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={
          isCurtainOpening
            ? { opacity: 0, scale: 1.15, filter: 'blur(12px)' }
            : { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
        }
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="
          relative z-30 w-full max-w-md rounded-3xl p-8 sm:p-10 text-center
          bg-gradient-to-b from-[#170b10]/95 via-[#0e0d14]/95 to-[#09090f]/98
          backdrop-blur-2xl border border-[#d4af37]/40
          shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(158,28,46,0.25),inset_0_1px_1px_rgba(255,235,170,0.3)]
        "
      >
        {/* Brillo especular dinámico que sigue el cursor */}
        <motion.div
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${gx} ${gy}, rgba(212,175,55,0.16) 0%, transparent 65%)`
            ),
          }}
          className="absolute inset-0 rounded-3xl pointer-events-none"
        />

        {/* Ornamentos barrocos en las 4 esquinas */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#d4af37]/60 rounded-tl-md pointer-events-none" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#d4af37]/60 rounded-tr-md pointer-events-none" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#d4af37]/60 rounded-bl-md pointer-events-none" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#d4af37]/60 rounded-br-md pointer-events-none" />

        {/* Sello de Cera y Máscara Dorada del Fantasma en 3D */}
        <div
          style={{ transform: 'translateZ(40px)' }}
          className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center"
        >
          {/* Halo pulsante detrás del sello */}
          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#9e1c2e] via-[#d4af37] to-[#9e1c2e] blur-xl opacity-50"
          />

          {/* Medallón de Lacre Imperial y Oro */}
          <div className="relative w-24 h-24 rounded-full bg-[radial-gradient(circle_at_30%_30%,#3a0d16,#120508)] border-2 border-[#d4af37] shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_2px_10px_rgba(212,175,55,0.4)] flex items-center justify-center overflow-hidden">
            {/* Brillo diagonal periódico sobre la máscara */}
            <motion.div
              animate={{ x: ['-140%', '160%'] }}
              transition={{ duration: 3.8, repeat: Infinity, repeatDelay: 2 }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg]"
            />

            {/* SVG de la Máscara de la Ópera y Rosa Carmesí */}
            <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
              <defs>
                <linearGradient id="goldMaskGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff2b2" />
                  <stop offset="45%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#7a5c10" />
                </linearGradient>
              </defs>
              <path
                d="M22 22 C40 16, 62 20, 66 36 C69 50, 62 67, 48 77 C37 83, 24 76, 20 62 C17 48, 18 32, 22 22 Z"
                fill="url(#goldMaskGrad)"
                stroke="#fff6cc"
                strokeWidth="1.5"
              />
              <path
                d="M30 43 C36 38, 48 40, 52 45 C46 49, 35 48, 30 43 Z"
                fill="#0b070a"
              />
              <path
                d="M52 76 C64 68, 76 58, 84 48"
                stroke="#2e6f40"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="52" cy="76" r="7" fill="#b6182b" stroke="#ff6b7b" strokeWidth="1" />
              <path d="M49 74 C52 71, 56 75, 52 78" fill="none" stroke="#ffd1d6" strokeWidth="1.2" />
            </svg>
          </div>
        </div>

        <div style={{ transform: 'translateZ(28px)' }}>
          <span className="inline-block text-[10px] uppercase tracking-[0.35em] text-[#d4af37] font-semibold mb-1.5">
            Palco Real Privado • Acto XV
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#fcf8f2] tracking-tight mb-2 drop-shadow">
            Solo Para Ti, Adina
          </h1>
          <p className="text-xs sm:text-sm text-[#c4bfb4] font-light leading-relaxed mb-7">
            Quince años de amor merecen alzarse el telón como en las grandes óperas. Introduce nuestra llave secreta para abrir el escenario.
          </p>
        </div>

        {/* Formulario de acceso con profundidad Z */}
        <form
          onSubmit={handleLogin}
          style={{ transform: 'translateZ(20px)' }}
          className="space-y-4 text-left"
        >
          <div>
            <label className="block text-[11px] uppercase tracking-[0.2em] text-[#d4af37] mb-1.5 font-medium">
              Nombre del Palco (Usuario)
            </label>
            <div className="relative group">
              <input
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Quiénes somos tú y yo..."
                className="w-full bg-[#07070c]/90 border border-[#d4af37]/25 rounded-xl px-4 py-3.5 pl-11 text-sm text-[#f5f2eb] placeholder-white/25 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition"
                required
              />
              <KeyRound className="w-4 h-4 text-[#d4af37]/70 absolute left-3.5 top-4 group-focus-within:text-[#d4af37] transition" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.2em] text-[#d4af37] mb-1.5 font-medium">
              Cifra Sagrada (Contraseña)
            </label>
            <div className="relative group">
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="El día que empezó nuestra obra..."
                className="w-full bg-[#07070c]/90 border border-[#d4af37]/25 rounded-xl px-4 py-3.5 pl-11 text-sm text-[#f5f2eb] placeholder-white/25 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition"
                required
              />
              <Lock className="w-4 h-4 text-[#d4af37]/70 absolute left-3.5 top-4 group-focus-within:text-[#d4af37] transition" />
            </div>
          </div>

          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-start gap-2 p-3 rounded-xl bg-[#3a0d16]/90 border border-[#d4af37]/40 text-xs text-[#ffd0d6]"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-[#ff8090] mt-0.5" />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={isSubmitting || isCurtainOpening}
            className="
              relative overflow-hidden w-full mt-3 py-4 px-6 rounded-xl font-medium text-sm tracking-wider uppercase
              bg-gradient-to-r from-[#851222] via-[#b81d33] to-[#851222]
              border border-[#d4af37]/50 text-[#fdfaf2]
              shadow-[0_10px_30px_rgba(158,28,46,0.55)]
              hover:shadow-[0_12px_40px_rgba(212,175,55,0.35)] hover:brightness-110
              active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2.5
            "
          >
            {isSubmitting || isCurtainOpening ? (
              <span>Alzando el Gran Telón...</span>
            ) : (
              <>
                <span>Alzar el Telón de Nuestro 15 Aniversario</span>
                <Heart className="w-4 h-4 fill-current text-[#f5d77f]" />
              </>
            )}
          </button>
        </form>

        {/* Pista secreta desplegable */}
        <div className="mt-6 pt-5 border-t border-[#d4af37]/15 text-center">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="inline-flex items-center gap-1.5 text-xs text-[#c4bfb4]/80 hover:text-[#d4af37] transition cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{showHint ? 'Ocultar el libreto de pistas' : '¿Necesitas consultar el libreto de pistas?'}</span>
          </button>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-3 text-xs text-[#f3dfb2] bg-[#120b10]/95 p-3.5 rounded-xl border border-[#d4af37]/30 font-light leading-relaxed text-left"
              >
                <p className="mb-1.5">
                  🎭 <strong className="text-[#d4af37]">Palco (Usuario):</strong> Las iniciales de Juan Diego unidas a tu nombre (<code className="text-white">jdyadina</code>).
                </p>
                <p>
                  🌹 <strong className="text-[#d4af37]">Cifra (Contraseña):</strong> El día, mes y año en que comenzó nuestra historia de amor en 8 cifras continuas (<code className="text-white">14102011</code>).
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
