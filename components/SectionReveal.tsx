import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'none';
  amount?: number | 'some' | 'all';
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  amount = 0.12,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const getYOffset = () => {
    if (shouldReduceMotion || direction === 'none') return 0;
    return direction === 'up' ? 32 : -32;
  };

  const variants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: getYOffset(),
      filter: shouldReduceMotion ? 'none' : 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'none',
      transition: {
        duration: shouldReduceMotion ? 0 : 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: shouldReduceMotion ? 0 : delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px 0px -60px 0px', amount }}
      variants={variants}
      className={`will-change-[transform,opacity] ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;
