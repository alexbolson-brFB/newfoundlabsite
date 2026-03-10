import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Shield, Lock, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Image Import
// import googleStructure from '../images/built_on_google.png';

const TechStackSection: React.FC = () => {
  const { t } = useLanguage();

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-7, 7]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section id="tech-stack" className="py-24 lg:py-32 bg-[#000000] text-white relative overflow-hidden perspective-2000 border-t border-navy-800">
      
      {/* --- Cinematic Environment --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0f172a_0%,#000000_80%,#000000_100%)]"></div>
      
      {/* Technical Grid Overlay - Rigid Style */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
             backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
             backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Volumetric Glow (NVIDIA Green Hint) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#76b900]/5 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* --- Header --- */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-navy-800"></div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-navy-900 border border-navy-800 rounded-full">
                <Lock className="w-3 h-3 text-[#76b900]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#76b900] font-mono">
                {t.techStack.eyebrow}
                </span>
            </div>
            <div className="h-px w-12 bg-navy-800"></div>
          </motion.div>
          
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight drop-shadow-2xl">
            {t.techStack.title}
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            {t.techStack.subtitle}
          </p>
        </div>

        {/* --- 3-COLUMN LAYOUT (Rigid Grid Enclave) --- */}
        <div className="border border-navy-800 bg-navy-950/50 backdrop-blur-sm">
            <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-navy-800">
                
                {/* COLUMN 1: THE CHALLENGE */}
                <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-3 order-2 lg:order-1 p-8 lg:p-10 flex flex-col justify-center"
                >
                    <div className="flex items-center gap-3 text-gold-500 mb-6">
                        <FileText className="w-5 h-5" />
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono">{t.techStack.challenge.title}</h3>
                    </div>
                    <p className="text-slate-300 font-light leading-relaxed text-sm border-l border-navy-700 pl-4">
                        {t.techStack.challenge.desc}
                    </p>
                </motion.div>

                {/* COLUMN 2: THE INTERACTIVE GRAPHIC */}
                <div className="lg:col-span-6 order-1 lg:order-2 p-8 lg:p-0 flex items-center justify-center relative min-h-[400px]">
                    <div 
                    className="relative w-full"
                    style={{ perspective: "1000px" }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    >
                        
                        {/* 1. Perimeter Shield (VPC-SC) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] md:w-[130%] md:h-[130%] border border-dashed border-slate-700 rounded-lg animate-[spin_120s_linear_infinite] pointer-events-none opacity-30"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[135%] h-[135%] md:w-[125%] md:h-[125%] border border-dashed border-slate-800 rounded-lg animate-[spin_120s_linear_infinite_reverse] pointer-events-none opacity-20"></div>
                        
                        {/* Perimeter Label */}
                        <div className="absolute top-[5%] left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-400 uppercase tracking-widest bg-[#020617] px-2 z-0">
                            Client's Secure VPC Perimeter
                        </div>

                        {/* 2. The Enclave Chassis (Tilt Layer) */}
                        <motion.div 
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="relative bg-[#020617] border border-slate-800 rounded-xl p-1 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden group/board aspect-square"
                        >
                            {/* Scanning Laser Effect (NVIDIA Green) */}
                            <motion.div
                                className="absolute top-0 bottom-0 w-[150px] bg-gradient-to-r from-transparent via-[#76b900]/10 to-transparent z-20 pointer-events-none skew-x-12"
                                animate={{ left: ['-20%', '120%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
                            />

                            {/* Inner Board */}
                            <div className="bg-navy-925 rounded-lg border border-slate-800 p-4 relative overflow-hidden h-full flex flex-col items-center justify-center transform-style-3d">
                                
                                {/* Circuit Pattern */}
                                <div className="absolute inset-0 opacity-[0.1]" 
                                    style={{ 
                                        backgroundImage: `
                                            radial-gradient(#76b900 1px, transparent 1px), 
                                            linear-gradient(to right, #1e293b 1px, transparent 1px)
                                        `, 
                                        backgroundSize: '20px 20px, 60px 60px' 
                                    }}>
                                </div>

                                {/* SVG DATA FLOW ANIMATION - Fixed Aspect Ratio */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                                    {/* Flow 1: Top to NIM */}
                                    <motion.path 
                                        d="M200 0 L200 110" 
                                        stroke="#76b900" 
                                        strokeWidth="2" 
                                        fill="none" 
                                        strokeDasharray="4 4"
                                        animate={{ strokeDashoffset: [0, -20] }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        opacity="0.5"
                                    />
                                    {/* Flow 2: NIM to CMEK */}
                                    <motion.path 
                                        d="M200 250 L200 300" 
                                        stroke="#c5a028" 
                                        strokeWidth="2" 
                                        fill="none" 
                                        strokeDasharray="4 4"
                                        animate={{ strokeDashoffset: [0, -20] }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        opacity="0.5"
                                    />
                                </svg>

                                {/* --- CENTERPIECE: NVIDIA NIM CONTAINER --- */}
                                <motion.div 
                                    className="relative z-30 mb-8"
                                    animate={{ y: [0, -5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    style={{ transformStyle: "preserve-3d" }}
                                >
                                    <div className="w-48 h-36 bg-[#0f172a] border-2 border-[#76b900] rounded-lg shadow-[0_0_40px_rgba(118,185,0,0.2)] flex flex-col items-center justify-center relative overflow-hidden">
                                         {/* Inner Glow */}
                                         <div className="absolute inset-0 bg-[#76b900]/10 animate-pulse"></div>
                                         
                                         {/* Logo Area */}
                                         <div className="bg-white px-3 py-1 rounded-sm mb-3 relative z-10">
                                             <div className="text-[#76b900] font-black italic tracking-tighter text-lg">NVIDIA</div>
                                         </div>
                                         
                                         <div className="text-white text-xs font-bold uppercase tracking-widest relative z-10">NIM Container</div>
                                         <div className="text-[9px] text-slate-400 font-mono mt-1 relative z-10">FoundLab Guardian AI</div>
                                    </div>
                                </motion.div>

                                {/* --- BOTTOM: CMEK CORE --- */}
                                <div className="relative z-20 flex flex-col items-center">
                                    <div className="w-16 h-16 rounded-full border border-gold-500/50 bg-[#080c14] flex items-center justify-center shadow-[0_0_20px_rgba(197,160,40,0.3)] relative">
                                         {/* Rotating Ring */}
                                         <div className="absolute inset-0 rounded-full border border-gold-500/30 border-t-transparent animate-spin"></div>
                                         <Lock className="w-6 h-6 text-gold-500" />
                                    </div>
                                    <div className="text-[9px] text-gold-500 font-mono mt-3 uppercase tracking-widest">CMEK Secured</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                    
                    {/* Footer Caption */}
                    <div className="text-center mt-6 text-[10px] uppercase tracking-widest text-[#76b900] flex items-center justify-center gap-2">
                        <Lock className="w-3 h-3" />
                        Data Never Leaves The Perimeter
                    </div>
                </div>

                {/* COLUMN 3: THE SOLUTION */}
                <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:col-span-3 order-3 p-8 lg:p-10 flex flex-col justify-center"
                >
                    <div className="flex items-center gap-3 text-emerald-400 mb-6">
                        <Shield className="w-5 h-5" />
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] font-mono">{t.techStack.solution.title}</h3>
                    </div>
                    <p className="text-slate-300 font-light leading-relaxed text-sm border-l border-navy-700 pl-4">
                        {t.techStack.solution.desc}
                    </p>

                    <ul className="space-y-4 mt-6">
                        <li className="flex items-start gap-3 text-xs text-slate-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#76b900] mt-1.5 shadow-[0_0_5px_#76b900]"></div>
                            <span>Real-time, sovereign inference within the Client's VPC.</span>
                        </li>
                        <li className="flex items-start gap-3 text-xs text-slate-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#76b900] mt-1.5 shadow-[0_0_5px_#76b900]"></div>
                            <span>Foundational to the 'Trust by Physics' paradigm.</span>
                        </li>
                    </ul>
                </motion.div>

            </div>
        </div>

        {/* --- Footer Quote --- */}
        <div className="mt-20 md:mt-32 text-center border-t border-slate-900 pt-12">
            <p className="font-serif text-xl md:text-2xl text-slate-300 italic max-w-4xl mx-auto">
                "{t.techStack.quote}"
            </p>
            <div className="mt-6 flex justify-center gap-2 text-sm font-bold text-[#76b900]">
                <span>POWERED BY</span>
                <span className="font-black italic">NVIDIA</span>
            </div>
        </div>

      </div>
    </section>
  );
};

export default TechStackSection;
