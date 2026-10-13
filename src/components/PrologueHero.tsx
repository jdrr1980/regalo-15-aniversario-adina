import React from 'react'
import { motion } from 'motion/react'
import { Heart, ChevronDown, Sparkles } from 'lucide-react'
import { LOVE_LETTER } from '../data/storyData'
import { playChimeNote } from '../utils/audio'

interface PrologueHeroProps {
  onStartQuest: () => void
}

/**
 * Sección de prólogo y dedicatoria inicial de amor de Juan Diego a Adina.
 * Presenta la carta íntima de amor con tipografía de alta costura, reflejos dorados y llamada teatral.
 *
 * @param {PrologueHeroProps} props - Propiedades del componente con callback para iniciar.
 * @returns {JSX.Element} Sección hero emotiva y de diseño inmersivo.
 */
export const PrologueHero: React.FC<PrologueHeroProps> = ({ onStartQuest }) => {
  const handleClickStart = (): void => {
    playChimeNote(523.25, 0.8)
    setTimeout(() => playChimeNote(659.25, 1.2), 150)
    onStartQuest()
  }

  return (
    <section className="relative min-h-[92dvh] flex flex-col justify-center items-center px-4 sm:px-6 pt-12 pb-20 text-center overflow-hidden">
      {/* Fondo con halo teatral volumétrico */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(158,28,46,0.18)_0%,rgba(212,175,55,0.08)_40%,transparent_75%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center"
      >
        {/* Antetítulo con las fechas sagradas del 15 aniversario */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#110d14]/90 border border-[#d4af37]/40 text-xs sm:text-sm text-[#f5dfb8] font-medium tracking-[0.25em] uppercase mb-8 shadow-[0_4px_25px_rgba(212,175,55,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>{LOVE_LETTER.dateSpan}</span>
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
        </motion.div>

        {/* Gran titular escénico */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#fcf9f2] tracking-tight leading-[1.08] mb-8 drop-shadow-md">
          15 Años de Nuestro <br />
          <span className="italic bg-gradient-to-r from-[#ffeaa7] via-[#d4af37] to-[#f5c563] bg-clip-text text-transparent">
            Gran Viaje Juntos
          </span>
        </h1>

        {/* Saludo y Carta de Amor de Juan Diego */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full bg-gradient-to-b from-[#15101a]/90 via-[#0e0c14]/90 to-[#08070d]/95 backdrop-blur-xl border border-[#d4af37]/35 rounded-3xl p-7 sm:p-12 mb-10 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(158,28,46,0.15)] relative text-left sm:text-center"
        >
          {/* Sello monograma XV en la esquina superior */}
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-3">
            <Heart className="w-3 h-3 text-[#ff6b7b] fill-current" />
            <span>{LOVE_LETTER.salutation}</span>
          </div>

          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#faf6ee] leading-relaxed mb-8 font-normal tracking-wide">
            «{LOVE_LETTER.body}»
          </p>

          <div className="flex items-center justify-end sm:justify-center gap-2.5 text-sm sm:text-base text-[#d4af37] font-medium pt-4 border-t border-[#d4af37]/15">
            <Heart className="w-4 h-4 fill-current text-[#b6182b]" />
            <span>Con todo mi amor, {LOVE_LETTER.signature}</span>
          </div>
        </motion.div>

        {/* Llamada a la acción para abrir el juego de pistas */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          type="button"
          onClick={handleClickStart}
          className="
            px-9 py-4 sm:py-5 rounded-2xl
            bg-gradient-to-r from-[#851222] via-[#b81d33] to-[#851222]
            border border-[#d4af37]/50 text-[#fffbf2] font-medium text-sm sm:text-base tracking-widest uppercase
            shadow-[0_12px_40px_rgba(158,28,46,0.6)] hover:shadow-[0_15px_50px_rgba(212,175,55,0.35)]
            hover:brightness-110 transition-all flex items-center gap-3 cursor-pointer group
          "
        >
          <span>Abrir el Juego de Pistas y Recuerdos</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform text-[#ffd67a]" />
        </motion.button>
      </motion.div>
    </section>
  )
}
