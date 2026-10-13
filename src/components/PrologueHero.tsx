import React from 'react'
import { motion } from 'motion/react'
import { Heart, ChevronDown } from 'lucide-react'
import { LOVE_LETTER } from '../data/storyData'

interface PrologueHeroProps {
  onStartQuest: () => void
}

/**
 * Sección de prólogo y dedicatoria inicial de amor de Juan Diego a Adina.
 *
 * @param {PrologueHeroProps} props - Propiedades del componente con callback para iniciar.
 * @returns {JSX.Element} Sección hero emotiva con diseño editorial.
 */
export const PrologueHero: React.FC<PrologueHeroProps> = ({ onStartQuest }) => {
  return (
    <section className="relative min-h-[90dvh] flex flex-col justify-center items-center px-4 sm:px-6 pt-12 pb-16 text-center">
      {/* Fondo con halo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(158,28,46,0.12)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 max-w-3xl mx-auto flex flex-col items-center"
      >
        {/* Antetítulo con las fechas de aniversario */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1b1c26] border border-[#d4af37]/30 text-xs sm:text-sm text-[#d4af37] font-medium tracking-widest uppercase mb-8 shadow-sm">
          <span>{LOVE_LETTER.dateSpan}</span>
        </div>

        {/* Gran titular editorial */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-normal text-[#f5f2eb] tracking-tight leading-[1.1] mb-6">
          15 Años de Nuestro <br className="hidden sm:inline" />
          <span className="italic text-[#d4af37]">Gran Viaje Juntos</span>
        </h1>

        {/* Saludo y Carta de Amor de Juan Diego */}
        <div className="w-full bg-[#11131a]/70 backdrop-blur-md border border-white/5 rounded-2xl p-6 sm:p-10 mb-8 shadow-2xl relative text-left sm:text-center">
          <div className="text-xs uppercase tracking-widest text-[#d4af37]/80 font-medium mb-3">
            {LOVE_LETTER.salutation}
          </div>

          <p className="font-display italic text-lg sm:text-2xl text-[#f0ede6] leading-relaxed mb-6 font-normal">
            «{LOVE_LETTER.body}»
          </p>

          <div className="flex items-center justify-end sm:justify-center gap-2 text-sm text-[#d4af37] font-medium">
            <Heart className="w-4 h-4 fill-current text-[#9e1c2e]" />
            <span>Con todo mi corazón, {LOVE_LETTER.signature}</span>
          </div>
        </div>

        {/* Llamada a la acción para iniciar el juego de pistas */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onStartQuest}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#9e1c2e] via-[#c2283e] to-[#9e1c2e] text-white font-medium text-sm sm:text-base tracking-wide shadow-[0_8px_30px_rgba(158,28,46,0.45)] hover:brightness-110 transition flex items-center gap-3 cursor-pointer group"
        >
          <span>Abrir el Juego de Pistas y Recuerdos</span>
          <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition" />
        </motion.button>
      </motion.div>
    </section>
  )
}
