import React, { useState, useEffect } from 'react'
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
 * Orquesta la autenticación, la progresión gamificada y la revelación del musical.
 *
 * @returns {JSX.Element} Aplicación completa.
 */
export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [completedStages, setCompletedStages] = useState<number[]>([])
  const [isSoundPlaying, setIsSoundPlaying] = useState<boolean>(false)
  const [modalPhoto, setModalPhoto] = useState<{ url: string; caption: string } | null>(null)

  // Recuperar sesión guardada de forma defensiva
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem('auth_15_aniversario')
      if (savedAuth === 'true') {
        setIsAuthenticated(true)
      }
    } catch {
      // localStorage bloqueado o no disponible
    }
  }, [])

  /**
   * Desbloquea la aplicación tras ingresar usuario y contraseña correctos.
   */
  const handleUnlock = (): void => {
    setIsAuthenticated(true)
    playChimeNote(523.25, 1.2)
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

  // Si no está autenticada, muestra la pantalla de acceso con candado
  if (!isAuthenticated) {
    return <LockScreen onUnlock={handleUnlock} />
  }

  // Determina si todas las pistas han sido resueltas
  const isGrandRevealUnlocked = completedStages.length >= STORY_STAGES.length

  return (
    <div className="min-h-[100dvh] bg-[#08090d] text-[#e6e4df] flex flex-col justify-between selection:bg-[#9e1c2e] selection:text-white">
      {/* Barra de navegación superior con progreso y controles */}
      <HeaderNav
        currentStage={completedStages.length + 1}
        totalStages={STORY_STAGES.length}
        isSoundPlaying={isSoundPlaying}
        onToggleSound={handleToggleSound}
        onLogout={handleLogout}
      />

      <main className="flex-1 pb-16">
        {/* Prólogo con la carta de amor de Juan Diego */}
        <PrologueHero onStartQuest={handleStartQuest} />

        {/* Separador estético */}
        <div className="max-w-xl mx-auto my-12 flex items-center justify-center gap-4 text-[#d4af37]/40 text-xs tracking-widest uppercase">
          <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]/40" />
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Nuestra Historia en 4 Actos</span>
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]/40" />
        </div>

        {/* Las 4 Etapas del viaje de recuerdos */}
        <div className="space-y-4 px-4 sm:px-6">
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
          <div className="max-w-md mx-auto my-16 p-6 rounded-2xl bg-[#0d0f16] border border-white/5 text-center">
            <Sparkles className="w-8 h-8 text-[#d4af37]/40 mx-auto mb-3" />
            <h4 className="font-display text-lg text-[#f5f2eb]">
              El Gran Regalo Aguarda
            </h4>
            <p className="text-xs text-[#b0aba0] mt-1 mb-4 font-light">
              Desvela los 4 recuerdos para descubrir la sorpresa que tenemos preparada para esta semana.
            </p>
            <button
              type="button"
              onClick={() => setCompletedStages([1, 2, 3, 4])}
              className="text-xs text-[#d4af37]/80 hover:text-[#d4af37] underline transition cursor-pointer"
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
      <footer className="w-full py-8 border-t border-white/5 bg-[#06070a] text-center text-xs text-[#b0aba0]/60">
        <div className="flex items-center justify-center gap-1.5 mb-1.5 text-[#d4af37]/80 font-medium">
          <Heart className="w-3.5 h-3.5 text-[#9e1c2e] fill-current" />
          <span>15 Años de Amor Verdadero • 2011 — 2026</span>
          <Heart className="w-3.5 h-3.5 text-[#9e1c2e] fill-current" />
        </div>
        <p className="font-light">
          Creado con todo el amor de Juan Diego para Adina
        </p>
      </footer>
    </div>
  )
}

export default App
