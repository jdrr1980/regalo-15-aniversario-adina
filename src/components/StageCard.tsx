import React, { useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'
import { Sparkles, CheckCircle2, Lock, ChevronRight, Film, Heart } from 'lucide-react'
import type { StoryStage } from '../types'
import { playChimeNote } from '../utils/audio'

interface StageCardProps {
  stage: StoryStage
  isUnlocked: boolean
  isCompleted: boolean
  onCompleteStage: (stageId: number) => void
  onSelectPhoto: (photoUrl: string, caption: string) => void
}

interface CinematicPhotoProps {
  url: string
  alt: string
  caption: string
  index: number
  onSelect: () => void
}

/**
 * Fotografía viva con efecto de vídeo cinematográfico ("Living Photo").
 * Incorpora paneo/zoom continuo estilo documental (Ken Burns), física 3D reactiva al cursor,
 * viñeteado, polvo suspendido y reflejo especular.
 *
 * @param {CinematicPhotoProps} props - Propiedades de la fotografía cinemática.
 * @returns {JSX.Element} Elemento renderizado con efecto vídeo 3D.
 */
const CinematicVideoPhoto: React.FC<CinematicPhotoProps> = ({
  url,
  alt,
  caption,
  index,
  onSelect,
}) => {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 140, damping: 20 })
  const sy = useSpring(my, { stiffness: 140, damping: 20 })

  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8])
  const glareX = useTransform(sx, [-0.5, 0.5], ['0%', '100%'])
  const glareY = useTransform(sy, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleMouseLeave = (): void => {
    mx.set(0)
    my.set(0)
  }

  // Trayectorias Ken Burns orgánicas y desfasadas para dar vida de vídeo
  const kenBurnsMotion =
    index % 2 === 0
      ? {
          scale: [1.02, 1.15, 1.07, 1.02],
          x: ['0%', '-3%', '2%', '0%'],
          y: ['0%', '-2%', '1.5%', '0%'],
          rotate: [0, -0.6, 0.5, 0],
        }
      : {
          scale: [1.14, 1.03, 1.12, 1.14],
          x: ['-2%', '3%', '-1%', '-2%'],
          y: ['1.5%', '-2%', '1%', '1.5%'],
          rotate: [0.4, -0.5, 0.3, 0.4],
        }

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className="
        group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#07080d]
        border border-[#d4af37]/30 cursor-pointer
        shadow-[0_15px_35px_rgba(0,0,0,0.8)]
        hover:border-[#d4af37] hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)]
        transition-colors duration-300
      "
    >
      {/* Secuencia Ken Burns ("Efecto Vídeo" orgánico continuo) */}
      <motion.img
        src={url}
        alt={alt}
        loading="lazy"
        animate={kenBurnsMotion}
        transition={{
          duration: 16 + index * 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-full h-full object-cover will-change-transform filter contrast-[1.05] saturate-[1.08]"
      />

      {/* Haz de luz de celuloide / proyector de cine que barre suavemente */}
      <motion.div
        animate={{ x: ['-130%', '170%'], opacity: [0, 0.3, 0] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatDelay: 2.5 + index * 1.5,
          ease: 'easeInOut',
        }}
        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-[#fff2cc]/25 to-transparent skew-x-[-25deg] pointer-events-none"
      />

      {/* Reflejo especular que sigue el cursor */}
      <motion.div
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx} ${gy}, rgba(255,235,170,0.18) 0%, transparent 60%)`
          ),
        }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Partículas suspendidas de ensueño */}
      <motion.span
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 4.5 + index, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/3 w-1.5 h-1.5 rounded-full bg-[#ffe89e] shadow-[0_0_8px_#d4af37] pointer-events-none"
      />

      {/* Viñeta cinematográfica y texto al pie */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs sm:text-sm text-[#f7f4ee] font-medium leading-snug drop-shadow truncate">
            {caption}
          </span>
          <span className="shrink-0 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#d4af37] bg-black/60 px-2 py-0.5 rounded-full border border-[#d4af37]/30">
            <Film className="w-2.5 h-2.5 text-[#d4af37]" />
            <span>Vídeo</span>
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Tarjeta interactiva para una etapa de la historia compartida con profundidad 3D.
 * Integra fotografías vivas con efecto de vídeo y desbloqueo del misterio de la ópera.
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

  const handleRevealClue = (): void => {
    setIsClueOpen(true)
    playChimeNote(659.25, 0.8)
    setTimeout(() => playChimeNote(880, 1.2), 150)
    onCompleteStage(stage.id)
  }

  // Números romanos para la marca de agua teatral de fondo
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V']
  const roman = romanNumerals[stage.id - 1] || `${stage.id}`

  if (!isUnlocked) {
    return (
      <div className="w-full max-w-4xl mx-auto my-12 p-8 rounded-3xl bg-[#0a0a10]/50 border border-[#d4af37]/15 backdrop-blur-md text-center opacity-55">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37]/50 border border-[#d4af37]/20">
          <Lock className="w-5 h-5" />
        </div>
        <span className="text-[11px] uppercase tracking-[0.25em] text-[#d4af37]/70 font-semibold">
          Capítulo {stage.id} • {stage.year}
        </span>
        <h3 className="font-serif text-2xl text-[#f5f2eb]/40 mt-1">
          {stage.title}
        </h3>
        <p className="text-xs text-[#b0aba0]/50 mt-2 font-light">
          Abre la etapa anterior para desvelar este recuerdo de nuestro amor.
        </p>
      </div>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 35, rotateX: 6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full max-w-4xl mx-auto my-14 p-6 sm:p-10 rounded-3xl border transition-all duration-500 relative overflow-hidden backdrop-blur-xl ${
        isCompleted
          ? 'bg-gradient-to-b from-[#131018]/95 via-[#0d0d14]/95 to-[#09080e]/98 border-[#d4af37]/40 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(212,175,55,0.15)]'
          : 'bg-gradient-to-b from-[#1a0a12]/95 via-[#11080e]/95 to-[#090508]/98 border-[#9e1c2e]/50 shadow-[0_25px_80px_rgba(158,28,46,0.25)] ring-1 ring-[#9e1c2e]/40'
      }`}
      style={{ perspective: '1200px' }}
    >
      {/* Marca de agua romana en 3D de fondo */}
      <div className="absolute top-2 right-6 font-serif text-[110px] sm:text-[140px] font-bold text-[#d4af37]/[0.04] pointer-events-none select-none leading-none">
        {roman}
      </div>

      {/* Encabezado del capítulo */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7 pb-6 border-b border-[#d4af37]/15">
        <div>
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Capítulo {stage.id} • {stage.year}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#faf6ee] font-normal tracking-tight">
            {stage.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#c7c2b6] mt-1 font-light">
            {stage.subtitle}
          </p>
        </div>

        {isCompleted && (
          <div className="self-start sm:self-center inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 text-xs text-[#f5d77f] font-medium shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Recuerdo Desvelado</span>
          </div>
        )}
      </div>

      {/* Relato poético de la etapa */}
      <p className="relative z-10 text-sm sm:text-base text-[#e8e4dc] leading-relaxed mb-8 font-light max-w-3xl">
        {stage.description}
      </p>

      {/* Galería de Fotografías Vivas con Efecto Vídeo Cinematográfico */}
      <div
        className={`relative z-10 grid gap-5 mb-8 ${
          stage.photos.length > 2 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'
        }`}
      >
        {stage.photos.map((photo, pIdx) => (
          <CinematicVideoPhoto
            key={pIdx}
            url={photo.url}
            alt={photo.alt}
            caption={photo.caption}
            index={pIdx}
            onSelect={() => onSelectPhoto(photo.url, photo.caption)}
          />
        ))}
      </div>

      {/* Caja del Enigma Teatral / Pista de la Ópera */}
      <div className="relative z-10 rounded-2xl bg-[#09080e]/95 border border-[#d4af37]/35 p-6 shadow-[inset_0_1px_1px_rgba(255,235,170,0.15)]">
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
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#d4af37] font-semibold block mb-1">
                  Enigma Oculto del Capítulo
                </span>
                <p className="text-xs text-[#c4bfb4] font-light">
                  {stage.clue.hint}
                </p>
              </div>

              <button
                type="button"
                onClick={handleRevealClue}
                className="
                  inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                  bg-gradient-to-r from-[#851222] to-[#b81d33] border border-[#d4af37]/50
                  text-xs uppercase tracking-wider text-[#faf5ea] font-medium
                  shadow-[0_4px_20px_rgba(158,28,46,0.45)] hover:brightness-110 active:scale-95
                  transition-all cursor-pointer shrink-0
                "
              >
                <span>{stage.clue.prompt}</span>
                <ChevronRight className="w-4 h-4 text-[#d4af37]" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold">
                <Heart className="w-3.5 h-3.5 text-[#ff6b7b] fill-current" />
                <span>Pista del Destino Desvelada</span>
              </div>
              <p className="font-serif italic text-sm sm:text-base text-[#f7e8ba] leading-relaxed pl-3 border-l-2 border-[#d4af37]">
                {stage.clue.revealedText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  )
}
