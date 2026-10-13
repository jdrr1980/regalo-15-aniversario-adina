import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Sparkles, CheckCircle2, Lock, ChevronRight, Image as ImageIcon } from 'lucide-react'
import type { StoryStage } from '../types'

interface StageCardProps {
  stage: StoryStage
  isUnlocked: boolean
  isCompleted: boolean
  onCompleteStage: (stageId: number) => void
  onSelectPhoto: (photoUrl: string, caption: string) => void
}

/**
 * Tarjeta interactiva para una etapa de la historia compartida.
 * Permite explorar fotografías y desvelar el enigma para avanzar.
 *
 * @param {StageCardProps} props - Propiedades de la etapa y callbacks.
 * @returns {JSX.Element} Tarjeta renderizada con estado desbloqueado o protegido.
 */
export const StageCard: React.FC<StageCardProps> = ({
  stage,
  isUnlocked,
  isCompleted,
  onCompleteStage,
  onSelectPhoto,
}) => {
  const [isClueOpen, setIsClueOpen] = useState<boolean>(isCompleted)

  /**
   * Revela la pista del enigma y completa la etapa.
   */
  const handleRevealClue = (): void => {
    setIsClueOpen(true)
    onCompleteStage(stage.id)
  }

  if (!isUnlocked) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 p-8 rounded-2xl bg-[#0c0d13]/60 border border-white/5 backdrop-blur-sm text-center opacity-60">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/5 flex items-center justify-center text-white/30">
          <Lock className="w-5 h-5" />
        </div>
        <span className="text-xs uppercase tracking-widest text-[#d4af37]/60 font-medium">
          Capítulo {stage.id} • {stage.year}
        </span>
        <h3 className="font-display text-xl text-[#f5f2eb]/40 mt-1">
          {stage.title}
        </h3>
        <p className="text-xs text-[#b0aba0]/40 mt-2">
          Resuelve la etapa anterior para desvelar este recuerdo.
        </p>
      </div>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7 }}
      className={`w-full max-w-4xl mx-auto my-10 p-6 sm:p-8 rounded-2xl border transition-all duration-500 relative ${
        isCompleted
          ? 'bg-[#11131a]/90 border-[#d4af37]/30 shadow-[0_10px_40px_rgba(0,0,0,0.6)]'
          : 'bg-[#141620] border-[#9e1c2e]/40 shadow-[0_10px_50px_rgba(158,28,46,0.15)] ring-1 ring-[#9e1c2e]/30'
      }`}
    >
      {/* Encabezado de la etapa */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-white/5">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Capítulo {stage.id} • {stage.year}</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl text-[#f5f2eb] font-normal">
            {stage.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#b0aba0] mt-0.5 font-light">
            {stage.subtitle}
          </p>
        </div>

        {isCompleted && (
          <div className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-xs text-[#d4af37] font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Recuerdo Desbloqueado</span>
          </div>
        )}
      </div>

      {/* Descripción narrativa */}
      <p className="text-sm sm:text-base text-[#dedad2] leading-relaxed mb-6 font-light max-w-3xl">
        {stage.description}
      </p>

      {/* Galería de fotos en mosaico bento */}
      <div className={`grid gap-4 mb-8 ${stage.photos.length > 2 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {stage.photos.map((photo, pIdx) => (
          <div
            key={pIdx}
            onClick={() => onSelectPhoto(photo.url, photo.caption)}
            className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-[#090a0f] border border-white/10 cursor-pointer shadow-md hover:border-[#d4af37]/60 transition-all duration-300"
          >
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
              <span className="text-xs text-[#f5f2eb] font-medium leading-snug drop-shadow-sm flex items-center gap-1.5">
                <ImageIcon className="w-3 h-3 text-[#d4af37] shrink-0" />
                <span className="truncate">{photo.caption}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Caja del Enigma / Pista */}
      <div className="rounded-xl bg-[#0a0b10] border border-[#d4af37]/25 p-5 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {!isClueOpen ? (
            <motion.div
              key="closed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-center sm:text-left"
            >
              <div>
                <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold block mb-0.5">
                  El Enigma de esta Etapa
                </span>
                <p className="text-xs text-[#b0aba0] font-light">
                  {stage.clue.hint}
                </p>
              </div>

              <button
                type="button"
                onClick={handleRevealClue}
                className="px-5 py-2.5 rounded-lg bg-[#9e1c2e] hover:bg-[#b62438] active:scale-95 text-white text-xs sm:text-sm font-medium transition cursor-pointer flex items-center justify-center gap-2 shadow-md shrink-0"
              >
                <span>{stage.clue.prompt}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
              className="text-left"
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Pista Revelada</span>
              </div>
              <p className="font-display italic text-sm sm:text-base text-[#f5f2eb] leading-relaxed">
                {stage.clue.revealedText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}
