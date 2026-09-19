import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Review } from '../../types/review';
import { Rating } from '../ui/Rating';
import { Quote } from 'lucide-react';

interface ContinuousReviewCarouselProps {
  reviews: Review[];
  speed?: number; // seconds per full rotation
}

export const ContinuousReviewCarousel: React.FC<ContinuousReviewCarouselProps> = ({
  reviews,
  speed = 38,
}) => {
  const [isPaused, setIsPaused] = useState(false);

  // Repeat reviews so the scroll loop is uninterrupted and smooth
  const items = [...reviews, ...reviews, ...reviews, ...reviews];

  return (
    <div
      className="relative w-full overflow-hidden py-4 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Edge gradient fade masks for smooth seamless blending */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#1D1612] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#1D1612] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-5 sm:gap-6 will-change-transform"
        animate={{
          // Left to right movement: starts shifted left and moves to the right
          x: ['-50%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
        style={{
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {items.map((rev, idx) => (
          <div
            key={`${rev.id}-${idx}`}
            className="w-[300px] sm:w-[360px] shrink-0 bg-[#F5EFE6] text-[#211A16] p-5 rounded-sm shadow-lg border border-[#E9DED0] flex flex-col justify-between space-y-3.5 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
          >
            {/* Subtle decorative watermark quote icon */}
            <Quote className="absolute top-3 right-3 w-8 h-8 text-[#211A16]/5 pointer-events-none" />

            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <Rating value={rev.rating} size="sm" readOnly />
                <span className="text-[10px] font-sans text-[#211A16]/55 uppercase tracking-wider font-semibold">
                  Verified Guest
                </span>
              </div>

              <p className="text-xs sm:text-sm font-serif italic text-[#211A16]/90 leading-relaxed line-clamp-4">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-[#211A16]/10 flex items-center justify-between text-xs">
              <div>
                <h4 className="font-sans font-bold text-xs text-[#211A16] tracking-wide">
                  {rev.name}
                </h4>
                <span className="text-[10px] text-[#211A16]/65">Verified Guest</span>
              </div>
              <span className="text-[10px] text-[#211A16]/50">{rev.date}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
