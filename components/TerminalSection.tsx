import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, ShieldCheck, AlertOctagon, Lock, BrainCircuit } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const bulletIcons = [ShieldCheck, AlertOctagon, Lock];

const TypingLine: React.FC<{ 
  text: string; 
  lineNumber: number;
  onComplete: () => void;
}> = ({ text, lineNumber, onComplete }) => {
  const characters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.015 },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onAnimationComplete={onComplete}
      className={`
        ${(text || '').includes('ERROR') || (text || '').includes('ACCESS DENIED') ? 'text-red-400 font-bold' : ''}
        ${(text || '').includes('SUCCESS') || (text || '').includes('GRANTED') || (text || '').includes('VERIFIED') ? 'text-emerald-400 font-bold' : ''}
        ${(text || '').includes('WARN') ? 'text-yellow-400' : ''}
        ${(text || '').startsWith('>') ? 'text-white mt-4 block font-bold' : ''}
      `}
    >
      <span className="opacity-30 mr-3 select-none">
        {lineNumber.toString().padStart(3, '0')}
      </span>
      {characters.map((char, index) => (
        <motion.span key={index} variants={charVariants} className="inline-block">
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const TerminalSection: React.FC = () => {
  const { t } = useLanguage();
  const terminalCopy = t.terminal;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [completedLogs, setCompletedLogs] = useState<string[]>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const logSequence = terminalCopy.logSequence;
  const logsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logsContainerRef.current) {
      const { scrollHeight } = logsContainerRef.current;
      logsContainerRef.current.scrollTo({
        top: scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [completedLogs, isTyping]);
  
  useEffect(() => {
    if (isInView) {
      setCompletedLogs([]);
      setCurrentLogIndex(0);
    }
  }, [isInView]);

  useEffect(() => {
    if (isInView && currentLogIndex < logSequence.length) {
      const randomDelay = currentLogIndex === 0 ? 0 : 80 + Math.random() * 100;
      const timeout = setTimeout(() => {
        const timestamp = new Date().toISOString();
        const reqId = Math.random().toString(36).substring(7).toUpperCase();
        const rawLog = logSequence[currentLogIndex];
        const cleanLog = rawLog.replace(/^>\s*/, '');
        const fullLog = `[${timestamp}] [REQ-${reqId}] ${cleanLog}`;
        setCompletedLogs(prev => [...prev, fullLog]);
      }, randomDelay);
      return () => clearTimeout(timeout);
    }
  }, [isInView, currentLogIndex, logSequence]);

  const handleLineComplete = () => {
    if (currentLogIndex < logSequence.length - 1) {
      setCurrentLogIndex(prev => prev + 1);
    }
  };


  return (
    <section ref={ref} className="py-24 lg:py-32 bg-navy-950 relative overflow-hidden border-t border-navy-800">
      
      {/* Technical Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
             backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left: Explanation */}
        <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
        >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy-900 border border-navy-700 rounded-full mb-8">
                <Terminal className="w-3 h-3 text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500 font-mono">
                  {terminalCopy.eyebrow}
                </span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">
                {terminalCopy.title.line1.pre}{' '}
                <span className="text-emerald-400 border-b-2 border-emerald-500/30 pb-1">{terminalCopy.title.line1.highlight}</span>
                {terminalCopy.title.line1.post}<br/>
                {terminalCopy.title.line2.pre}{' '}
                <span className="text-emerald-400 border-b-2 border-emerald-500/30 pb-1">{terminalCopy.title.line2.highlight}</span>
                {terminalCopy.title.line2.post}
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-10 font-light border-l-2 border-navy-800 pl-6">
                {terminalCopy.description.pre}{' '}
                <strong className="text-white font-semibold">
                  {terminalCopy.description.strong}
                </strong>{' '}
                {terminalCopy.description.post}
            </p>

            <ul className="space-y-6">
                {terminalCopy.bullets.map((bullet, index) => {
                  const Icon = bulletIcons[index] ?? ShieldCheck;
                  return (
                    <li key={index} className="flex items-start gap-4 text-slate-300 group">
                      <div className="mt-1 p-1.5 bg-navy-900 border border-navy-700 rounded-sm group-hover:border-emerald-500/50 transition-colors">
                         <Icon className="w-4 h-4 text-emerald-500" />
                      </div>
                      <span className="font-mono text-sm leading-relaxed pt-1">{bullet}</span>
                    </li>
                  );
                })}
            </ul>
        </motion.div>

        {/* Right: The Terminal Visual */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
        >
            {/* Window Frame - Rigid Technical Style */}
            <div className="bg-navy-925 border border-slate-700 shadow-2xl font-mono text-xs md:text-sm relative group">
                
                {/* Decoration Border Glow */}
                <div className="absolute inset-0 border border-emerald-500/0 group-hover:border-emerald-500/20 transition-colors pointer-events-none z-20"></div>

                {/* Title Bar */}
                <div className="bg-slate-900/50 px-4 py-3 flex items-center justify-between border-b border-slate-800 backdrop-blur-sm select-none">
                    <div className="flex gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600 hover:bg-red-500 transition-colors shadow-inner"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600 hover:bg-yellow-500 transition-colors shadow-inner"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600 hover:bg-emerald-500 transition-colors shadow-inner"></div>
                    </div>
                    <div className="text-slate-500 uppercase tracking-widest text-[9px] font-bold font-mono">root@guardian-ai-node-01:~</div>
                    <div className="text-[9px] text-emerald-500/50 font-mono">BASH</div>
                </div>

                {/* Terminal Content */}
                <div 
                  ref={logsContainerRef}
                  className="p-6 md:p-8 h-[400px] text-slate-300 overflow-y-auto relative scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
                >
                    {/* Scanline Effect - Optimized */}
                    <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>

                    <div className="space-y-2 relative z-0">
                        {completedLogs.slice(0, -1).map((log, i) => (
                          <div
                            key={i}
                            className={`
                              ${(log || '').includes('ERROR') || (log || '').includes('ACCESS DENIED') ? 'text-red-400 font-bold' : ''}
                              ${(log || '').includes('SUCCESS') || (log || '').includes('GRANTED') || (log || '').includes('VERIFIED') ? 'text-emerald-400 font-bold' : ''}
                              ${(log || '').includes('WARN') ? 'text-yellow-400' : ''}
                              ${(log || '').startsWith('>') ? 'text-white mt-4 block font-bold' : ''}
                            `}
                          >
                             <span className="opacity-30 mr-3 select-none">
                                {(i + 1).toString().padStart(3, '0')}
                            </span>
                            {log}
                          </div>
                        ))}

                        {completedLogs.length > 0 && (
                          <TypingLine 
                            key={currentLogIndex}
                            text={completedLogs[completedLogs.length - 1]}
                            lineNumber={completedLogs.length}
                            onComplete={handleLineComplete}
                          />
                        )}

                        {currentLogIndex >= logSequence.length -1 && (
                           <motion.div 
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ repeat: Infinity, duration: 0.8 }}
                              className="inline-block w-2 h-4 bg-emerald-500 align-middle ml-1"
                          />
                        )}
                    </div>
                </div>
                
                {/* Status Footer */}
                <div className="border-t border-slate-800 bg-navy-950 px-4 py-2 flex justify-between items-center text-[9px] text-slate-500 uppercase tracking-wider">
                    <div>
                        Connection: <span className="text-emerald-500">Secure (TLS 1.3)</span>
                    </div>
                    <div>
                        Latency: <span className="text-emerald-500">12ms</span>
                    </div>
                </div>
            </div>
            
            {/* Decorative "Cables" behind */}
            <div className="absolute -z-10 -bottom-10 -right-10 w-full h-full border-r border-b border-emerald-500/10 rounded-br-3xl"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalSection;
