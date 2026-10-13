import React from 'react'
import { Sparkles, Calendar, Clock, MapPin, Heart, QrCode } from 'lucide-react'
import type { ShowSession } from '../types'

interface GoldenTicketProps {
  session: ShowSession | null
}

/**
 * Entrada conmemorativa de gala para el musical "El Fantasma de la Ópera".
 * Diseñada como un ticket VIP dorado de teatro con detalles personalizados.
 *
 * @param {GoldenTicketProps} props - Sesión seleccionada por Adina.
 * @returns {JSX.Element} Pase digital conmemorativo.
 */
export const GoldenTicket: React.FC<GoldenTicketProps> = ({ session }) => {
  return (
    <div className="w-full max-w-2xl mx-auto my-8 relative select-none">
      {/* Resplandor exterior */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37]/30 via-[#9e1c2e]/40 to-[#d4af37]/30 rounded-2xl blur-lg opacity-70 pointer-events-none" />

      <div className="relative rounded-2xl bg-[#0e1017] border-2 border-[#d4af37]/60 p-6 sm:p-8 shadow-[0_15px_50px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Marca de agua decorativa */}
        <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none">
          <Heart className="w-64 h-64 text-[#d4af37]" />
        </div>

        {/* Franja superior */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#d4af37]/30 gap-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Pase de Honor • 15º Aniversario</span>
          </div>
          <span className="text-[11px] font-mono text-[#b0aba0]/80">
            VIP-TICKET-JD-ADINA-2026
          </span>
        </div>

        {/* Cuerpo del ticket */}
        <div className="py-6 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="text-left flex-1">
            <h4 className="text-xs uppercase tracking-widest text-[#d4af37]/90 font-medium mb-1">
              Espectáculo
            </h4>
            <h3 className="font-display text-2xl sm:text-3xl text-[#f5f2eb] font-normal leading-tight">
              El Fantasma de la Ópera
            </h3>
            <p className="text-xs text-[#b0aba0] mt-1 font-light">
              Producción oficial • Palacio de Congresos de Zaragoza
            </p>

            {/* Datos de la cita */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 pt-4 border-t border-white/5 text-xs text-[#dedad2]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>
                  <strong>Fecha:</strong> {session ? session.day : 'A elegir por ti'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>
                  <strong>Hora:</strong> {session ? session.time : '20:00 h'}
                </span>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>
                  <strong>Lugar:</strong> Palacio de Congresos de Zaragoza
                </span>
              </div>
            </div>
          </div>

          {/* Código QR decorativo y Butaca */}
          <div className="w-full md:w-36 flex flex-col items-center justify-center p-4 rounded-xl bg-[#08090d] border border-[#d4af37]/30 shrink-0 text-center">
            <QrCode className="w-16 h-16 text-[#d4af37]/90 mb-2" />
            <span className="text-[10px] tracking-widest uppercase text-[#b0aba0]">
              Butaca de Gala
            </span>
            <span className="text-xs font-serif font-bold text-[#f5f2eb]">
              Palco Especial
            </span>
          </div>
        </div>

        {/* Pie del ticket */}
        <div className="pt-4 border-t border-dashed border-[#d4af37]/30 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#b0aba0] gap-2">
          <div className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-[#9e1c2e] fill-current" />
            <span>Invitados de Honor: <strong>Adina & Juan Diego</strong></span>
          </div>
          <span className="italic font-serif text-[#d4af37]">
            «Por 15 años más de momentos inolvidables»
          </span>
        </div>
      </div>
    </div>
  )
}
