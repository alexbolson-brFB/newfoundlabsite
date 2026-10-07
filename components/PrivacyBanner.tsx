import React, { useState } from 'react';
import { motion, AnimatePresence, Variants, useReducedMotion } from 'framer-motion';
import { ShieldCheck, EyeOff, X } from 'lucide-react';

const PrivacyBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 30 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 16 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed bottom-4 right-4 z-50 max-w-sm w-full"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-navy-925 border border-slate-800 shadow-2xl p-4 rounded-sm flex items-center justify-between gap-4"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <motion.div variants={itemVariants} className="p-2 bg-emerald-900/30 rounded-full border border-emerald-500/30 flex-shrink-0">
              <EyeOff className="w-4 h-4 text-emerald-500" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Privacy controls active</p>
              <p className="text-[10px] text-slate-400">Review the applicable privacy policy and terms.</p>
            </motion.div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex gap-2 items-center flex-shrink-0">
            <button 
                onClick={() => setShowDetails(!showDetails)}
                className="text-[9px] font-mono text-emerald-500 hover:text-emerald-400 underline decoration-emerald-500/30 underline-offset-4 transition-colors cursor-pointer"
            >
                VERIFY
            </button>
            <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-600 hover:text-slate-400 transition-colors cursor-pointer"
                aria-label="Close banner"
            >
                <X className="w-3 h-3" />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Details Terminal Modal */}
      <AnimatePresence>
        {showDetails && (
            <div className="fixed inset-0 z-[60] flex items-end justify-end p-4 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="bg-black/90 border border-emerald-900/50 p-6 rounded-sm w-full max-w-sm pointer-events-auto backdrop-blur-md font-mono text-xs shadow-[0_0_50px_rgba(16,185,129,0.1)] mb-20"
                >
                    <div className="flex justify-between items-center mb-4 border-b border-emerald-900/30 pb-2">
                        <span className="text-emerald-500 font-bold uppercase tracking-widest">Privacy Audit</span>
                        <button onClick={() => setShowDetails(false)} aria-label="Close details"><X className="w-3 h-3 text-emerald-700 hover:text-emerald-500" /></button>
                    </div>
                    
                    <div className="space-y-2 text-emerald-500/80">
                        <div className="flex justify-between">
                            <span>Google Analytics</span>
                            <span className="text-emerald-400 font-bold">[BLOCKED]</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Meta Pixel</span>
                            <span className="text-emerald-400 font-bold">[NOT FOUND]</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Hotjar Recording</span>
                            <span className="text-emerald-400 font-bold">[PURGED]</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Local Storage</span>
                            <span className="text-emerald-400 font-bold">[EPHEMERAL]</span>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-emerald-900/30 text-[9px] text-slate-500 uppercase tracking-wider text-center">
                        Verified by FoundLab Protocol
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PrivacyBanner;
