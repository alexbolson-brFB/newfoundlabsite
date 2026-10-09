import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const { language } = useLanguage();
  const { scrollYProgress } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  const isPt = language === 'pt';
  const label = isPt ? 'Voltar ao topo' : 'Back to top';

  useEffect(() => {
    const checkScroll = () => {
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Visible when user has scrolled past the hero section
        setIsVisible(rect.bottom <= 80);
      } else {
        // Fallback for static subpages without a hero element
        setIsVisible(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });
    checkScroll();

    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40"
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.08, y: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
            aria-label={label}
            title={label}
            className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-navy-950/90 text-white shadow-xl backdrop-blur-md border border-slate-700/60 hover:border-cyan-500/60 hover:shadow-[0_0_22px_rgba(34,211,238,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-colors cursor-pointer"
          >
            {/* Scroll Progress Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
              viewBox="0 0 36 36"
              aria-hidden="true"
            >
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                className="stroke-slate-800/80"
                strokeWidth="2"
              />
              <motion.circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                className="stroke-cyan-400"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ pathLength: scrollYProgress }}
              />
            </svg>

            {/* Center Arrow Icon */}
            <ArrowUp
              className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-200 group-hover:text-cyan-300 group-hover:-translate-y-0.5 transition-all duration-200"
              aria-hidden="true"
            />

            {/* Screen Reader Label */}
            <span className="sr-only">{label}</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
