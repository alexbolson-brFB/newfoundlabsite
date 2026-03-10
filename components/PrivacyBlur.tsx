import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeOff, Lock } from 'lucide-react';

const PrivacyBlur: React.FC = () => {
  const [isBlurred, setIsBlurred] = useState(false);

  useEffect(() => {
    const handleMouseLeave = () => setIsBlurred(true);
    const handleMouseEnter = () => setIsBlurred(false);
    const handleBlur = () => setIsBlurred(true);   // Window lost focus
    const handleFocus = () => setIsBlurred(false); // Window regained focus

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return (
    <AnimatePresence>
      {isBlurred && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(12px) grayscale(100%)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[99999] bg-white/10 flex items-center justify-center pointer-events-none"
        >
            <div className="text-center">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-[#0f172a] p-6 rounded-full shadow-2xl border border-slate-700 inline-block mb-4"
                >
                    <Lock className="w-8 h-8 text-slate-400" />
                </motion.div>
                <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-2xl font-serif text-navy-900 bg-white/90 backdrop-blur px-6 py-2 rounded-sm shadow-sm"
                >
                    Session Protected
                </motion.h2>
                <motion.p 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-900 mt-3 bg-white/50 px-3 py-1 inline-block rounded-sm"
                >
                    Return to Resume
                </motion.p>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyBlur;
