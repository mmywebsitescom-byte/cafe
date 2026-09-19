import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#C6A15B] via-[#E6CA85] to-[#C6A15B] origin-left z-[100] shadow-[0_0_8px_rgba(198,161,91,0.6)] pointer-events-none"
      style={{ scaleX }}
    />
  );
};
