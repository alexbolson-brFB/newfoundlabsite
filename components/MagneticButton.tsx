import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // How strong the pull is (default 0.5)
  onClick?: () => void;
  href?: string;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = "", 
  strength = 0.3,
  onClick,
  href
}) => {
  // Use HTMLElement to allow the ref to be used on both <a> and <div> elements via casting
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const isTouchDevice = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(hover: none)').matches || window.innerWidth < 768;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouchDevice()) return;

    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
    
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const Content = (
    <motion.div
      className={className}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
        <a 
            href={href}
            ref={ref as React.RefObject<HTMLAnchorElement>}
            onMouseMove={handleMouseMove}
            onMouseLeave={reset}
            onClick={onClick}
            className="inline-block"
        >
            {Content}
        </a>
    );
  }

  return (
    <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        onClick={onClick}
        className="inline-block cursor-pointer"
    >
        {Content}
    </div>
  );
};

export default MagneticButton;