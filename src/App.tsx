import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { LockScreen } from './components/LockScreen'
import { HeaderNav } from './components/HeaderNav'
import { PrologueHero } from './components/PrologueHero'
import { StageCard } from './components/StageCard'
import { OperaGrandReveal } from './components/OperaGrandReveal'
import { PhotoModal } from './components/PhotoModal'
import { STORY_STAGES } from './data/storyData'
import { startAmbientMelody, stopAmbientMelody, playChimeNote } from './utils/audio'
import { Sparkles, Heart } from 'lucide-react'

/**
 * Componente principal de la experiencia de 15 Aniversario para Adina.
 * Orquesta la autenticación, la progresión gamificada, el hilo de oro 3D reactivo al scroll
 * y la revelación del musical 'El Fantasma de la Ópera'.
 *
 * @returns {JSX.Element} Aplicación completa renderizada.
 */
export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [completedStages, setCompletedStages] = useState<number[]>([])
  const [isSoundPlaying, setIsSoundPlaying] = useState<boolean>(false)
  const [modalPhoto, setModalPhoto] = useState<{ url: string; caption: string } | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 20 })

  // Transformaciones 3D ligadas al scroll para elementos escénicos flotantes
  const maskRotateY = useTransform(smoothProgress, [0, 1], [0, 360])
  const maskParallaxY = useTransform(smoothProgress, [0, 1], [-50, 400])
  const roseParallaxY = useTransform(smoothProgress, [0, 1], [100, -300])
  const romanParallaxY = useTransform(smoothProgress, [0, 1], [0, 250])

  // Recuperar sesión guardada de forma defensiva
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('auth_15_aniversario')
      if (savedAuth === 'true') {
        setIsAuthenticated(true)
      }
    } catch {
      // Manejo defensivo si localStorage está restringido
    }
  }, [])

  /**
   * Desbloquea la aplicación tras ingresar usuario y contraseña correctos.
   * Inicia automáticamente la banda sonora "Ben E. King - Stand by Me".
   */
  const handleUnlock = (): void => {
    setIsAuthenticated(true)
    playChimeNote(523.25, 1.2)
    startAmbientMelody().then((started) => {
      if (started) {
        setIsSoundPlaying(true)
      }
    })
  }

  /**
   * Cierra la sesión y vuelve a bloquear la pantalla.
   */
  const handleLogout = (): void => {
    try {
      localStorage.removeItem('auth_15_aniversario')
    } catch {
      // Ignorar de forma defensiva
    }
    setIsAuthenticated(false)
    stopAmbientMelody()
    setIsSoundPlaying(false)
  }

  /**
   * Alterna la reproducción de la melodía ambiental.
   */
  const handleToggleSound = (): void => {
    if (isSoundPlaying) {
      stopAmbientMelody()
      setIsSoundPlaying(false)
    } else {
      startAmbientMelody()
      setIsSoundPlaying(true)
    }
  }

  /**
   * Registra una etapa como completada y emite una nota armónica.
   *
   * @param {number} stageId - Identificador de la etapa resuelta.
   */
  const handleCompleteStage = (stageId: number): void => {
    if (!completedStages.includes(stageId)) {
      setCompletedStages((prev) => [...prev, stageId])
      playChimeNote(659.25, 1.5)
    }
  }

  /**
   * Desplaza la vista suavemente a la primera etapa de recuerdos.
   */
  const handleStartQuest = (): void => {
    const el = document.getElementById('stage-1')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Si no está autenticada, muestra la pantalla de acceso teatral
  if (!isAuthenticated) {
    return <LockScreen onUnlock={handleUnlock} />
  }

  // Determina si todas las pistas han sido resueltas
  const isGrandRevealUnlocked = completedStages.length >= STORY_STAGES.length

  return (
    <div
      ref={containerRef}
      className="min-h-[100dvh] bg-[#050609] text-[#e8e5de] flex flex-col justify-between selection:bg-[#9e1c2e] selection:text-white relative overflow-x-hidden"
    >
      {/* Hilo de Oro del Destino: Línea central 3D que se extiende con el scroll */}
      <div className="fixed top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] pointer-events-none z-0 hidden md:block">
        <div className="w-full h-full bg-gradient-to-b from-transparent via-[#d4af37]/10 to-transparent" />
        <motion.div
          style={{ scaleY: smoothProgress, transformOrigin: 'top' }}
          className="w-full h-full bg-gradient-to-b from-[#d4af37] via-[#ffeaa7] to-[#d4af37] shadow-[0_0_12px_#d4af37]"
        />
      </div>

      {/* Elemento 3D flotante con Parallax: Máscara Dorada del Fantasma */}
      <motion.div
        style={{
          y: maskParallaxY,
          rotateY: maskRotateY,
          perspective: 1000,
        }}
        className="fixed top-1/3 right-4 lg:right-16 pointer-events-none z-0 hidden xl:block opacity-25"
      >
        <svg viewBox="0 0 100 100" className="w-36 h-36 drop-shadow-[0_10px_25px_rgba(212,175,55,0.3)]">
          <defs>
            <linearGradient id="goldFloatMask" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff2b2" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#684e0e" />
            </linearGradient>
          </defs>
          <path
            d="M22 22 C40 16, 62 20, 66 36 C69 50, 62 67, 48 77 C37 83, 24 76, 20 62 C17 48, 18 32, 22 22 Z"
            fill="url(#goldFloatMask)"
            stroke="#fff9db"
            strokeWidth="1.2"
          />
          <path d="M30 43 C36 38, 48 40, 52 45 C46 49, 35 48, 30 43 Z" fill="#050609" />
        </svg>
      </motion.div>

      {/* Elemento 3D flotante con Parallax: Pétalos de Rosa Carmesí y Monograma XV */}
      <motion.div
        style={{
          y: romanParallaxY,
          perspective: 800,
        }}
        className="fixed top-1/2 left-4 lg:left-16 pointer-events-none z-0 hidden xl:block opacity-20 text-center"
      >
        <div className="font-serif text-8xl font-bold bg-gradient-to-b from-[#d4af37] to-transparent bg-clip-text text-transparent select-none">
          XV
        </div>
        <span className="text-[10px] tracking-[0.4em] uppercase text-[#d4af37]/60 block">
          AÑOS DE AMOR
        </span>
      </motion.div>

      {/* Rosa Carmesí flotante con Parallax en Z */}
      <motion.div
        style={{
          y: roseParallaxY,
          perspective: 600,
        }}
        className="fixed bottom-1/4 right-8 lg:right-24 pointer-events-none z-0 hidden xl:block opacity-25"
      >
        <div className="w-10 h-10 rounded-full bg-[#9e1c2e] blur-md shadow-[0_0_20px_#9e1c2e]" />
      </motion.div>

      {/* Barra de navegación superior con progreso y controles */}
      <HeaderNav
        currentStage={completedStages.length + 1}
        totalStages={STORY_STAGES.length}
        isSoundPlaying={isSoundPlaying}
        onToggleSound={handleToggleSound}
        onLogout={handleLogout}
      />

      <main className="flex-1 pb-16 relative z-10">
        {/* Prólogo con la carta de amor de Juan Diego */}
        <PrologueHero onStartQuest={handleStartQuest} />

        {/* Separador estético de la cronología */}
        <div className="max-w-xl mx-auto my-14 flex items-center justify-center gap-4 text-[#d4af37]/60 text-xs tracking-[0.3em] uppercase">
          <span className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#d4af37]/50" />
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-spin" style={{ animationDuration: '10s' }} />
          <span>Nuestra Historia en 4 Actos</span>
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-spin" style={{ animationDuration: '10s' }} />
          <span className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#d4af37]/50" />
        </div>

        {/* Las 4 Etapas del viaje de recuerdos */}
        <div className="space-y-6 px-4 sm:px-6">
          {STORY_STAGES.map((stage, index) => {
            const isUnlocked = index === 0 || completedStages.includes(STORY_STAGES[index - 1].id)
            const isCompleted = completedStages.includes(stage.id)

            return (
              <div key={stage.id} id={`stage-${stage.id}`}>
                <StageCard
                  stage={stage}
                  isUnlocked={isUnlocked}
                  isCompleted={isCompleted}
                  onCompleteStage={handleCompleteStage}
                  onSelectPhoto={(url, caption) => setModalPhoto({ url, caption })}
                />
              </div>
            )
          })}
        </div>

        {/* Sección de la Gran Revelación del Musical */}
        {isGrandRevealUnlocked ? (
          <OperaGrandReveal />
        ) : (
          <div className="max-w-md mx-auto my-20 p-8 rounded-3xl bg-gradient-to-b from-[#120d16]/90 to-[#08070e]/95 border border-[#d4af37]/30 text-center shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <Sparkles className="w-8 h-8 text-[#d4af37] mx-auto mb-3 animate-pulse" />
            <h4 className="font-serif text-xl text-[#faf6ee] font-normal">
              El Gran Regalo Aguarda
            </h4>
            <p className="text-xs text-[#b8b3a7] mt-1.5 mb-6 font-light leading-relaxed">
              Desvela los 4 recuerdos de nuestro viaje para descubrir la sorpresa que tenemos preparada para esta semana.
            </p>
            <button
              type="button"
              onClick={() => setCompletedStages([1, 2, 3, 4])}
              className="text-xs text-[#d4af37]/90 hover:text-[#ffeaa7] underline transition cursor-pointer font-medium"
            >
              ¿Quieres descubrir el regalo directamente? Toca aquí
            </button>
          </div>
        )}
      </main>

      {/* Modal para ver fotos ampliadas */}
      <PhotoModal
        photoUrl={modalPhoto ? modalPhoto.url : null}
        caption={modalPhoto ? modalPhoto.caption : null}
        onClose={() => setModalPhoto(null)}
      />

      {/* Pie de página conmemorativo */}
      <footer className="w-full py-10 border-t border-[#d4af37]/15 bg-[#040407] text-center text-xs text-[#b0aba0]/60 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-2 text-[#d4af37] font-medium tracking-wider">
          <Heart className="w-3.5 h-3.5 text-[#9e1c2e] fill-current" />
          <span>15 Años de Amor Verdadero • 2011 — 2026</span>
          <Heart className="w-3.5 h-3.5 text-[#9e1c2e] fill-current" />
        </div>
        <p className="font-light text-[#948f85]">
          Creado con todo el amor de Juan Diego para Adina
        </p>
      </footer>
    </div>
  )
}

export default App
