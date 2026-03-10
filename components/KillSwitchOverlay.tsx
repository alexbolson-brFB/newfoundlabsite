import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Power } from 'lucide-react';

const KillSwitchOverlay: React.FC<{ isOpen: boolean; onComplete: () => void }> = ({ isOpen, onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Sequence of destruction
      setTimeout(() => setStage(1), 100); // Glitch start
      setTimeout(() => setStage(2), 800); // White noise / Flash
      setTimeout(() => setStage(3), 1200); // Blackout
      setTimeout(() => setStage(4), 3000); // Message
      setTimeout(() => {
        setStage(0);
        onComplete();
      }, 6000); // Reset
    }
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden pointer-events-auto cursor-none">
      
      {/* Stage 1: Glitch Overlay */}
      {stage >= 1 && stage < 3 && (
        <div className="absolute inset-0 bg-white mix-blend-difference opacity-50 animate-pulse">
           <div className="absolute top-0 left-0 w-full h-2 bg-black animate-[scan_0.1s_infinite]"></div>
        </div>
      )}

      {/* Stage 2: White Flash */}
      <AnimatePresence>
        {stage === 2 && (
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white" 
            />
        )}
      </AnimatePresence>

      {/* Stage 3: Blackout */}
      {stage >= 3 && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
            {stage === 4 && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center font-mono text-emerald-500"
                >
                    <Power className="w-12 h-12 mx-auto mb-6 text-red-500" />
                    <h1 className="text-2xl tracking-[0.5em] uppercase mb-4 text-white">Session Purged</h1>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">
                        Zero Artifacts Remained on Disk.
                    </p>
                    <div className="mt-8 h-1 w-32 bg-slate-900 mx-auto rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-emerald-900"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2 }}
                        />
                    </div>
                </motion.div>
            )}
        </div>
      )}
    </div>
  );
};

export default KillSwitchOverlay;
