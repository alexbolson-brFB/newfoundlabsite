import React, { useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Network, FileSearch, ShieldCheck, BrainCircuit, Server, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ArchitectureSection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  
  // Optimized mouse tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 40, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 40, damping: 30 });

  // Map values to translate ranges
  const moveX = useTransform(mouseXSpring, [-0.5, 0.5], [30, -30]);
  const moveY = useTransform(mouseYSpring, [-0.5, 0.5], [30, -30]);

  // Interactive Styles
  const gradientColor = useTransform(mouseXSpring, [-0.5, 0.5], [
      "rgba(219, 234, 254, 0.4)", // Blue 100
      "rgba(224, 242, 254, 0.4)"  // Sky 100
  ]);

  const handleMouseMove = (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Throttle/Optimize updates
      x.set((mouseX / width) - 0.5);
      y.set((mouseY / height) - 0.5);
  };

  const icons = [Network, FileSearch, ShieldCheck, BrainCircuit, Server, Lock];

  return (
    <section 
        id="architecture" 
        ref={ref}
        onMouseMove={handleMouseMove}
        className="py-24 lg:py-32 bg-white relative overflow-hidden border-t border-slate-200"
    >
        {/* Rigid Grid Background */}
        <motion.div 
            className="absolute inset-0 pointer-events-none will-change-transform opacity-[0.03]"
            style={{ 
                x: moveX, 
                y: moveY, 
            }}
        >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </motion.div>
        
        {/* Subtle Gradient Spot */}
        <motion.div
             className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none opacity-40 mix-blend-multiply"
             style={{ 
                 x: useTransform(mouseXSpring, [-0.5, 0.5], ['-60%', '-40%']), 
                 y: useTransform(mouseYSpring, [-0.5, 0.5], ['-60%', '-40%']),
                 backgroundColor: gradientColor
             }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
          
          <div className="max-w-3xl mb-24">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full mb-6"
                >
                   <span className="w-1.5 h-1.5 rounded-full bg-navy-900" />
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-900">
                     {t.architecture.eyebrow}
                   </span>
                </motion.div>

                <motion.h2 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   className="font-serif text-4xl md:text-6xl text-navy-900 leading-[1.05] tracking-tight mb-6"
                >
                    {t.architecture.title}
                </motion.h2>

                <motion.p
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 }}
                   className="text-slate-600 text-lg md:text-xl font-light leading-relaxed text-pretty"
                >
                    {t.architecture.subtitle}
                </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {t.architecture.products.map((product, index) => {
                 const Icon = icons[index];
                 return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative bg-white border border-slate-200 p-8 flex flex-col justify-between hover:border-gold-500/30 hover:shadow-lg transition-all duration-300"
                    >
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-navy-900 to-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-slate-50 rounded-sm text-navy-900 group-hover:bg-navy-900 group-hover:text-gold-400 transition-colors duration-300">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <span className="font-mono text-xs text-slate-300 group-hover:text-gold-500/50 transition-colors">0{index + 1}</span>
                            </div>

                            <div className="mb-4">
                                <span className="text-[9px] font-bold uppercase tracking-widest text-gold-600 block mb-2">{product.tag}</span>
                                <h3 className="font-serif text-2xl text-navy-900 leading-tight">{product.title}</h3>
                                <div className="text-xs font-mono text-slate-400 mt-1 uppercase tracking-wider">{product.subtitle}</div>
                            </div>

                            <p className="text-sm text-slate-600 font-light leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    </motion.div>
                 );
             })}
          </div>
        </div>
    </section>
  );
};

export default ArchitectureSection;
