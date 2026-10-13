import React from 'react'
import { Sparkles, Music, VolumeX, LogOut } from 'lucide-react'

interface HeaderNavProps {
  currentStage: number
  totalStages: number
  isSoundPlaying: boolean
  onToggleSound: () => void
  onLogout: () => void
}

/**
 * Barra superior de navegación y estado con estética editorial sobria.
 *
 * @param {HeaderNavProps} props - Propiedades del encabezado.
 * @returns {JSX.Element} Barra de navegación fija con controles.
 */
export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentStage,
  totalStages,
  isSoundPlaying,
  onToggleSound,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#08090d]/80 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Monograma y título */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9e1c2e] to-[#250810] border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] text-xs font-serif font-bold">
            15
          </div>
          <div>
            <span className="font-display text-sm tracking-wider uppercase text-[#f5f2eb]">
              Juan Diego & Adina
            </span>
            <span className="hidden sm:inline-block text-[11px] text-[#d4af37]/70 ml-2 font-light">
              • 15º Aniversario
            </span>
          </div>
        </div>

        {/* Indicador de progreso de etapas */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {Array.from({ length: totalStages }).map((_, index) => {
            const stepNum = index + 1
            const isCompleted = stepNum < currentStage
            const isCurrent = stepNum === currentStage
            return (
              <div
                key={stepNum}
                title={`Etapa ${stepNum}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  isCompleted
                    ? 'w-5 sm:w-6 bg-[#d4af37]'
                    : isCurrent
                    ? 'w-8 sm:w-10 bg-[#9e1c2e]'
                    : 'w-2 sm:w-3 bg-white/10'
                }`}
              />
            )
          })}
          {currentStage > totalStages && (
            <span className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#d4af37] font-medium ml-1">
              <Sparkles className="w-3 h-3" />
              <span className="hidden sm:inline">El Regalo</span>
            </span>
          )}
        </div>

        {/* Acciones de sonido y cerrar sesión */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleSound}
            title={isSoundPlaying ? 'Pausar Stand by Me (Ben E. King)' : 'Reproducir Stand by Me (Ben E. King)'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition active:scale-95 cursor-pointer text-xs font-medium ${
              isSoundPlaying
                ? 'bg-[#d4af37]/15 border-[#d4af37]/50 text-[#f5d77f] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70'
            }`}
          >
            {isSoundPlaying ? (
              <>
                <Music className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
                <span className="hidden sm:inline text-[11px] text-[#f5dfb8] tracking-wide">
                  Stand by Me
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/40" />
                <span className="hidden sm:inline text-[11px] text-white/40">
                  Música
                </span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onLogout}
            title="Cerrar sesión"
            className="p-2 rounded-lg bg-white/5 hover:bg-[#3a1017] text-white/50 hover:text-[#ff7080] border border-white/5 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}
