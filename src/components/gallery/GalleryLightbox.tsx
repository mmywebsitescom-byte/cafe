import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { GalleryImage } from '../../types/gallery';

interface GalleryLightboxProps {
  images: GalleryImage[];
  currentIndex: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < images.length;
  const currentImage = isOpen ? images[currentIndex] : null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0C0907]/95 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-6 right-6 z-20 text-[#A99B8C] hover:text-[#F8F3EC] p-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation controls */}
          <button
            type="button"
            onClick={onPrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 text-[#A99B8C] hover:text-[#F8F3EC] p-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition-all hover:scale-110"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={onNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 text-[#A99B8C] hover:text-[#F8F3EC] p-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition-all hover:scale-110"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Box */}
          <motion.div
            key={currentImage.id}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-sm overflow-hidden border border-[#C6A15B]/30 shadow-2xl bg-black">
              <img
                src={currentImage.image}
                alt={currentImage.caption || 'Khatti Cafe photo'}
                className="max-h-[72vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>

            {/* Bottom Info */}
            <div className="mt-4 text-center space-y-1 max-w-xl px-4">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
                <Sparkles className="w-3 h-3" />
                <span>{currentImage.category} Collection</span>
              </div>
              {currentImage.caption && (
                <p className="text-sm font-serif italic text-[#F8F3EC]/90">
                  &ldquo;{currentImage.caption}&rdquo;
                </p>
              )}
              <div className="text-[11px] text-[#A99B8C]">
                {currentIndex + 1} of {images.length}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
