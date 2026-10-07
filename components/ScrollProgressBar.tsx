import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 35,
    restDelta: 0.0001,
  });

  const scaleX = shouldReduceMotion ? scrollYProgress : smoothProgress;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[70] h-[3px] pointer-events-none bg-transparent"
    >
      <motion.div
        className="h-full w-full bg-gold-400 origin-left shadow-[0_0_8px_rgba(212,175,55,0.5)]"
        style={{ scaleX }}
      />
    </div>
  );
};

export default ScrollProgressBar;
