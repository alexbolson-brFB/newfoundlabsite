
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface TooltipProps {
  term: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ term, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  // Safely access glossary with type safety
  const definition = t.glossary[term] || "Definition not available.";

  return (
    <span 
      className="relative inline-block cursor-help group"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)} // Mobile support
    >
      <span className="border-b border-dashed border-navy-900/40 group-hover:border-navy-900 group-hover:bg-navy-50 transition-colors">
        {children}
      </span>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-72 p-4 bg-navy-900 text-white text-sm font-light rounded-sm shadow-xl z-[60] pointer-events-none"
          >
            <div className="font-bold uppercase tracking-wider text-[10px] text-gold-500 mb-2">
              {term}
            </div>
            <div className="leading-relaxed whitespace-normal">
              {definition}
            </div>
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-8 border-transparent border-t-navy-900"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default Tooltip;
