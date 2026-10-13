import React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X } from 'lucide-react'

interface PhotoModalProps {
  photoUrl: string | null
  caption: string | null
  onClose: () => void
}

/**
 * Modal a pantalla completa para visualizar fotografías con su título.
 *
 * @param {PhotoModalProps} props - URL de la foto, pie de foto y función de cierre.
 * @returns {JSX.Element} Modal animado con fondo difuminado.
 */
export const PhotoModal: React.FC<PhotoModalProps> = ({ photoUrl, caption, onClose }) => {
  return (
    <AnimatePresence>
      {photoUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={photoUrl}
              alt={caption || 'Fotografía de recuerdo'}
              className="max-h-[75vh] w-auto object-contain rounded-xl shadow-2xl border border-white/10"
            />
            {caption && (
              <p className="font-display italic text-[#f5f2eb] text-sm sm:text-base mt-4 text-center">
                {caption}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
