import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface ScrollingMarqueeProps {
  items?: string[];
  reverse?: boolean;
  speed?: number;
  className?: string;
}

const DEFAULT_ITEMS = [
  'Freshly Roasted Arabica Coffee',
  'Artisanal Stone-Baked Pizzas',
  'Authentic Claypot Kulhad Chai',
  'Handcrafted Gourmet Burgers',
  'Purnima Foods Culinary Heritage',
  'Warm & Cozy Evening Ambience',
  'Freshly Steamed Dimsums & Bites',
  'Handcrafted Smoothies & Shakes',
];

export const ScrollingMarquee: React.FC<ScrollingMarqueeProps> = ({
  items = DEFAULT_ITEMS,
  reverse = false,
  className = '',
}) => {
  return (
    <div
      className={`relative w-full overflow-hidden bg-[#1E1713] border-y border-[#C6A15B]/20 py-3 select-none ${className}`}
    >
      {/* Subtle fade masks at left and right */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#17120F] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#17120F] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        animate={{
          x: reverse ? ['-50%', '0%'] : ['0%', '-50%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 32,
        }}
      >
        {/* Render repeated list for seamless endless looping */}
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-4 px-6 text-xs sm:text-sm font-serif tracking-widest uppercase text-[#D8BC82]/85 hover:text-[#F8F3EC] transition-colors"
          >
            <span>{item}</span>
            <Sparkles className="w-3 h-3 text-[#C6A15B]/70 shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
