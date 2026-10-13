import React, { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import confetti from 'canvas-confetti'
import { Sparkles, Clock, Check, Send, ExternalLink, Heart } from 'lucide-react'
import { SHOW_SESSIONS, JUAN_DIEGO_PHONE } from '../data/storyData'
import { GoldenTicket } from './GoldenTicket'
import type { ShowSession } from '../types'

interface OperaGrandRevealProps {
  onSessionSelect?: (session: ShowSession) => void
}

/**
 * Gran Revelación Teatral del Regalo:
 * El Fantasma de la Ópera en el Palacio de Congresos de Zaragoza.
 *
 * @param {OperaGrandRevealProps} props - Callbacks de selección.
 * @returns {JSX.Element} Vista del clímax y selector de fecha del musical.
 */
export const OperaGrandReveal: React.FC<OperaGrandRevealProps> = ({ onSessionSelect }) => {
  const [selectedSession, setSelectedSession] = useState<ShowSession>(SHOW_SESSIONS[0])


  // Disparar confeti de gala al montar el clímax
  useEffect(() => {
    try {
      const count = 200
      const defaults = {
        origin: { y: 0.6 },
        colors: ['#d4af37', '#9e1c2e', '#ffffff', '#e8c872'],
      }

      const fire = (particleRatio: number, opts: confetti.Options) => {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        })
      }

      fire(0.25, { spread: 26, startVelocity: 55 })
      fire(0.2, { spread: 60 })
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 })
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
      fire(0.1, { spread: 120, startVelocity: 45 })
    } catch {
      // Ignorar de forma defensiva si canvas no está disponible
    }
  }, [])

  const handleSelect = (session: ShowSession): void => {
    setSelectedSession(session)
    if (onSessionSelect) {
      onSessionSelect(session)
    }
  }

  // Enlace para WhatsApp con mensaje directo al chat de Juan Diego
  const whatsappMessage = encodeURIComponent(
    `¡Mi amor! Ya he resuelto las pistas de nuestro 15 aniversario 🎭🌹 Me encantaría que vayamos a ver El Fantasma de la Ópera el ${selectedSession.day} (${selectedSession.dateLabel}) a las ${selectedSession.time} en el Palacio de Congresos. ¡Saca nuestras entradas ya!`
  )
  const cleanPhone = JUAN_DIEGO_PHONE.trim().replace(/[^0-9]/g, '')
  const whatsappUrl = cleanPhone
    ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${whatsappMessage}`
    : `https://api.whatsapp.com/send?text=${whatsappMessage}`

  return (
    <section className="relative w-full max-w-4xl mx-auto my-16 px-4 sm:px-6 text-center select-none">
      {/* Fondo de resplandor teatral */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(158,28,46,0.25)_0%,rgba(8,9,13,0.95)_75%)] pointer-events-none rounded-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        {/* Antetítulo de celebración */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1b1c26] border border-[#d4af37]/40 text-xs sm:text-sm text-[#d4af37] font-semibold tracking-widest uppercase mb-6 shadow-lg">
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span>¡Misterio Resuelto! • Nuestro Regalo</span>
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
        </div>

        {/* Título y subtítulo */}
        <h2 className="font-display text-4xl sm:text-6xl text-[#f5f2eb] font-normal leading-tight mb-4">
          Nos Vamos Juntos a <br />
          <span className="italic text-[#d4af37]">El Fantasma de la Ópera</span>
        </h2>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#dedad2] font-light leading-relaxed mb-8">
          15 años de amor merecen una velada inolvidable. La legendaria obra de teatro musical llega al <strong className="text-[#f5f2eb]">Palacio de Congresos de Zaragoza</strong> esta misma semana, y tú decides qué día y sesión nos vestimos de gala.
        </p>

        {/* Muestra gráfica: Logotipo y Cartel */}
        <div className="max-w-md mx-auto mb-10 rounded-2xl overflow-hidden border border-[#d4af37]/30 bg-[#0e1017] shadow-2xl p-6 flex flex-col items-center">
          <img
            src="/photos/fantasma_logo.png"
            alt="Logotipo El Fantasma de la Ópera"
            className="h-14 sm:h-16 object-contain mb-4 filter drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]"
          />
          <div className="relative rounded-xl overflow-hidden w-full aspect-[16/9] border border-white/10 mb-3">
            <img
              src="/photos/fantasma_escena.jpg"
              alt="Escena del musical"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
              <span className="text-xs text-[#d4af37] font-serif">
                Con Daniel Diges • Palacio de Congresos de Zaragoza
              </span>
            </div>
          </div>
        </div>

        {/* Selector de Sesiones de esta semana */}
        <div className="text-left max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold">
              Elige tu función para esta semana (14 — 18 Octubre)
            </span>
            <span className="text-xs text-[#b0aba0]">
              Zaragoza
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SHOW_SESSIONS.map((session) => {
              const isSelected = selectedSession.id === session.id
              return (
                <button
                  key={session.id}
                  type="button"
                  onClick={() => handleSelect(session)}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#1e141c] border-[#d4af37] ring-1 ring-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                      : 'bg-[#0d0f16] border-white/10 hover:border-white/30 text-[#dedad2]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="font-medium text-sm text-[#f5f2eb]">
                        {session.day}
                      </div>
                      <div className="text-[11px] text-[#d4af37]/90 font-light">
                        {session.dateLabel}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#d4af37] text-black flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#b0aba0] mt-2 pt-2 border-t border-white/5">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span className="font-semibold text-[#f5f2eb]">{session.time}</span>
                    <span className="text-white/20">•</span>
                    <span className="truncate">Palacio Congresos</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Caja de Acción y Aviso Inmediato */}
        <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-[#1c1219] via-[#24131d] to-[#1c1219] border border-[#d4af37]/40 shadow-2xl mb-10 text-center">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-[#d4af37] font-bold mb-2">
            <Heart className="w-4 h-4 fill-current text-[#9e1c2e]" />
            <span>¡Tu Elección está Lista!</span>
          </div>

          <p className="text-sm text-[#f5f2eb] font-light leading-relaxed mb-6">
            Has seleccionado: <strong className="text-[#d4af37]">{selectedSession.day} a las {selectedSession.time}</strong>.<br />
            Confírmamelo ahora mismo para adquirir las entradas antes de que se agoten:
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white font-medium text-sm transition flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Confirmar con Juan Diego por WhatsApp</span>
            </a>

            <a
              href="https://www.musicalelfantasmadelaopera.com/zaragoza"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#d4af37] text-xs font-medium border border-white/10 transition flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Web Oficial del Musical</span>
            </a>
          </div>
        </div>

        {/* Entrada Digital Conmemorativa */}
        <GoldenTicket session={selectedSession} />
      </motion.div>
    </section>
  )
}
