import React from 'react';
import { Rating } from '../ui/Rating';
import { Review } from '../../types/review';
import { Quote } from 'lucide-react';
import { motion } from 'motion/react';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-[#F5EFE6] text-[#211A16] p-4 sm:p-5 rounded-sm shadow-md border border-[#E9DED0] flex flex-col justify-between space-y-3.5 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
    >
      {/* Subtle decorative watermark quote icon */}
      <Quote className="absolute top-3 right-3 w-8 h-8 text-[#211A16]/5 pointer-events-none" />

      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <Rating value={review.rating} size="sm" readOnly />
          <span className="text-[10px] font-sans text-[#211A16]/50 uppercase tracking-wider">
            Verified Guest
          </span>
        </div>

        <p className="text-xs sm:text-sm font-serif italic text-[#211A16]/85 leading-relaxed">
          &ldquo;{review.comment}&rdquo;
        </p>
      </div>

      <div className="pt-2.5 border-t border-[#211A16]/10 flex items-center justify-between text-xs">
        <div>
          <h4 className="font-sans font-bold text-xs text-[#211A16] tracking-wide">
            {review.name}
          </h4>
          <span className="text-[10px] text-[#211A16]/60">Verified Guest</span>
        </div>
        <span className="text-[10px] text-[#211A16]/50">{review.date}</span>
      </div>
    </motion.div>
  );
};
