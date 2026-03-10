import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CursorSpotlight: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the spotlight so it feels "heavy/premium"
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    // Check if device is touch or small screen
    const checkTouch = () => {
      const hasTouch = window.matchMedia('(hover: none)').matches || window.innerWidth < 768;
      setIsTouch(hasTouch);
    };
    
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the width/height of the spotlight to center it
      mouseX.set(e.clientX - 200); 
      mouseY.set(e.clientY - 200);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isTouch]);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[50] w-[800px] h-[800px] rounded-full opacity-0 md:opacity-100"
      style={{
        x,
        y,
        background: `radial-gradient(circle, rgba(15, 23, 42, 0.06) 0%, rgba(15, 23, 42, 0.02) 40%, transparent 60%)`,
        mixBlendMode: "multiply", 
      }}
    />
  );
};

export default CursorSpotlight;
